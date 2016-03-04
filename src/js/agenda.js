var UI = require('ui');
var assets = require('assets');
var episode = require('episode');
var inter = require('internationalization');

this.exports.display = display;

var loading;

function display(){
	assets.displayCard(inter.show('Loading'), inter.show('Please wait while we retrieve your data ...'), true, function(cardObject){
		loading = cardObject;
	});
	
	loadData();
}

function loadData(){
	assets.apiCall('agenda', {
		success: function(data){
			loading.hide();
			if(data.result == "OK"){
				displayMenu(data);
			}else{
				assets.displayCard(inter.show('Error'), inter.show("An error occured while trying to fetch your data. Please try again later."), true);
			}
		},
		error: function(){
			loading.hide();
			assets.displayCard(inter.show('Error'), inter.show("An error occured while trying to fetch your data. Please try again later."), true);
		}
	}, "get", "&limit=30");
}

function displayMenu(data){
	var monthNames = inter.show("monthsNames");
	
	var days = {};
	var currentDate = new Date();
	
	for(var i = 0; i < data.episodes.length; i++){
		var currentEpisode = data.episodes[i];
		var dateOfEpisode = new Date(currentEpisode.air_date);
		if(dateOfEpisode.getTime()+86400000>=(currentDate.getTime())){ // We want only the episodes in the future or now
			var dateStringHash = "" + dateOfEpisode.getMonth() + dateOfEpisode.getDate();
			if(typeof(days[dateStringHash]) == "undefined"){
				days[dateStringHash] = {
					data: Array(),
					title: "" + dateOfEpisode.getDate() + " " + monthNames[dateOfEpisode.getMonth()] + " " + dateOfEpisode.getFullYear()
				}; 
			}
			
			days[dateStringHash].data.push({
				title: assets.removeAccent(currentEpisode.show.name),
				subtitle: inter.show("S ") + currentEpisode.season_number + inter.show(" Epsd ") + currentEpisode.number,
				id: currentEpisode.id,
				icon: "images/"+assets.tvShowIdToImagePath(currentEpisode.show.id)
			});
		}
	}
	
	var sections = Array();
	
	var keys = Object.keys(days).sort();
	for(var j = 0; j < keys.length; j++){
		var currentData = days[keys[j]];
		sections.push({
			title: assets.removeAccent(currentData.title),
			items: currentData.data
		});
	}
	
	var menu = new UI.Menu(assets.elementSettingsByPlatform({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		sections: sections
	}));
	
	menu.show();
	
	menu.on('select', function(e){
		var selectedEpisodeId = days[keys[e.sectionIndex]].data[e.itemIndex].id;
		episode.display(selectedEpisodeId);
	});
}