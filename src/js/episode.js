var UI = require('ui');
var assets = require('assets');
var inter = require('internationalization');
var Vibe = require('ui/vibe');

this.exports.display = display;

var loading;
var callbackForWatched;
var episode_id;
var watched;

function display(id, callback){
	callbackForWatched = callback;
	episode_id = id;
	
	assets.displayCard(inter.show("Loading"), inter.show("We are fetching the episode data, please wait."), true, function(cardObject){
		loading = cardObject;
	});
	
	assets.apiCall("episode", {
		success: function(data){
			if(data.result == "OK"){
				displayData(data);
				console.log(JSON.stringify(data));
			}else{
				loading.hide();
				assets.displayCard(inter.show('Error'), inter.show("An error occured while trying to fetch the episode data. Please try again later."), true);
			}
		},
		error: function(error){
			loading.hide();
			assets.displayCard(inter.show('Error'), inter.show("An error occured while trying to fetch the episode data. Please try again later."), true);
		}
	}, "get", "&episode_id="+id);
}

function displayData(data){
	var monthNames = inter.show("monthsNames");
	
	loading.hide();
		
	var episode = data.episode;

	var date = new Date(episode.air_date);
	var title = episode.name;
	var airdate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
	var overview = episode.overview;

	var watchedText = inter.show("Mark as Watched");
	watched = episode.seen;
	if(episode.seen){
		watchedText = inter.show("Mark unwatched");
	}
	
	var menu = new UI.Menu(assets.elementSettingsByPlatform({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		sections: [{
			items: [{
				title: assets.removeAccent(episode.show.name),
				subtitle: inter.show("Season ") + episode.season_number + inter.show(" Episode ") + episode.number
			}]
		},{
			title: inter.show("Actions"),
			items: [{
				title: watchedText
			}]
		}, {
			title: inter.show("Infos"),
			items: [{
				title: inter.show("Title"),
				subtitle: title
			},{
				title: inter.show("Air date"),
				subtitle: airdate
			}, {
				title: inter.show("Overview"),
				subtitle: overview
			}]
		}]
	}));

	menu.show();

	menu.on('select', function(e){
		switch(e.sectionIndex){
			case 1:
				Vibe.vibrate('short');
				
				// Set watched/unwatched
				var watchedText = inter.show("Mark as Watched");
				watched = !watched;
				if(watched){
					watchedText = inter.show("Mark unwatched");
				}
				menu.item(1, 0, {
					title: watchedText
				});
				
				if(watched){
					var facebookPost = 0;
					if(assets.statusPostFacebook()){
						facebookPost = 1;
					}
					
					var twitterPost = 0;
					if(assets.statusPostTwitter()){
						facebookPost = 1;
					}
					
					assets.apiCall('checkin', {}, 'post', {episode_id:episode_id, publish_on_ticker:facebookPost, publish_on_twitter:twitterPost});
					displayVote();
					menu.hide();
				}else{
					assets.apiCall('checkout', {}, 'post',  {episode_id:episode_id});
				}
				
				if(typeof(callbackForWatched) != "undefined"){
					callbackForWatched(episode_id, watched);
				}
				break;

			case 2: {
				switch(e.itemIndex){
					case 0: // Title
						assets.displayCard(inter.show("Title"), title, true);
						break;

					case 1: // Airdate
						//assets.displayCard("Air date", airdate, true);
						break;

					case 2: // Overview
						assets.displayCard(inter.show("Overview"), overview, true);
						break;
				}
			}
				break;
		}
	});
}

function displayVote(){
	var selectedEmotions = Array();
	
	var items = Array();
	items.push({
				title: "Good", 
				icon: "images/good.png",
				id: 1
			});
	
	items.push({
				title: "Fun", 
				icon: "images/fun.png",
				id: 2
			});
	
	items.push({
				title: "Wow", 
				icon: "images/wow.png",
				id: 3
			});
	
	items.push({
				title: "Sad", 
				icon: "images/sad.png",
				id: 4
			});
	
	items.push({
				title: "SoSo", 
				icon: "images/soso.png",
				id: 6
			});
	
	items.push({
				title: "Bad", 
				icon: "images/bad.png",
				id: 7
			});
	
	var menu = new UI.Menu(assets.elementSettingsByPlatform({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		sections: [{
			items: [{
				title: inter.show('Close')
			}]
		}, {
			title: inter.show("Vote"),
			items: items
		}]
	}));
	
	menu.show();
	
	menu.on('select', function(e){
		switch(e.sectionIndex){
			case 0: // Confirm
				sendEmotion();
				break;
				
			case 1: // Select emotion
				if(selectedEmotions.indexOf(e.itemIndex) == -1){
					selectedEmotions = Array();
					selectedEmotions.push(e.itemIndex);
				}else{
					selectedEmotions.splice(selectedEmotions.indexOf(e.itemIndex), 1);
				}
				
				for(var i = 0; i < items.length; i++){
					if(selectedEmotions.indexOf(i) == -1){
						menu.item(1, i, {
							title: items[i].title,
							icon: items[i].icon,
							subtitle: ""
						});
					}else{
						menu.item(1, i, {
							title: items[i].title,
							icon: items[i].icon,
							subtitle: "Selected"
						});
					}
				}
						
				if(selectedEmotions.length){
					menu.item(0, 0, {
						title: inter.show('Confirm')
					});
				}else{
					menu.item(0, 0, {
						title: inter.show('Close')
					});
				}
		}
	});
	
	function sendEmotion(){
		menu.item(0, 0, {
			title: inter.show('Saving')
		});
		
		for(var i = 0; i < selectedEmotions.length; i++){
			var emotionValue = items[selectedEmotions[i]].id;
			assets.apiCall('emotion', {}, "post", {episode_id: episode_id, emotion_id: emotionValue});
		}
		
		menu.hide();
	}
}