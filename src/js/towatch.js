var UI = require('ui');
var episode = require('episode');
var assets = require('assets');
var inter = require('internationalization');

this.exports.display = display;

var loading;
var data;

function display(){
	assets.displayCard(inter.show('Loading'), inter.show('Retrieving the list of episode to watch, please wait ...'), true, function(cardObject){
		loading = cardObject;
	});
	
	/*if(typeof(data) != "undefined"){
		loading.hide();
		displayList(data);
	}else{*/
		loadData(function(dataFromServer){
			loading.hide();
			if(typeof(dataFromServer) == "undefined"){
				assets.displayCard(inter.show('Error'), inter.show('An error occured while trying to retrieve the list of episode. Please try again later.'), true);
			}else{
				data = dataFromServer;
				displayList(data);
			}
		});
	//}
}

function loadData(callback, page){
	var pageToGo = 0;
	if(page){
		pageToGo = page;
	}
	
	var dataToReturn = Array();
	assets.apiCall("to_watch", {
		success: function(data){
			if(data.result == "OK"){
				dataToReturn = dataToReturn.concat(data.episodes);
				callback(dataToReturn);
			}
		},
		error: function(error){
			console.log(JSON.stringify(error));
			callback(undefined);
		}
	}, "get", "&page="+pageToGo+"&limit=50");
}

function displayList(data){
	var tvshows = Array();
	var shouldHide = Array();
	
	function generateList(){
		tvshows = Array();
		for(var i = 0; i < data.length; i++){
			var currentEpisode = data[i];
			if(shouldHide.indexOf(currentEpisode.id)==-1){ // Not to hide
				tvshows.push({
					id: currentEpisode.id,
					title: currentEpisode.show.name,
					items: [{
						title: assets.removeAccent(currentEpisode.name),
						icon: "images/"+assets.tvShowIdToImagePath(currentEpisode.show.id),
						subtitle: inter.show("S ") + currentEpisode.season_number + inter.show(" Epsd ") + currentEpisode.number
					}]
				});
			}
		}
	}	
	
	generateList();
	
	var menu = new UI.Menu(assets.elementSettingsByPlatform({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		sections: tvshows
	}));
	
	menu.show();
	
	menu.on('select', function(e){
		episode.display(tvshows[e.sectionIndex].id, function(idEpisode, statusWatch){
			/*for(var j = 0; j < tvshows.length; j++){
				if(tvshows.id==idEpisode){
					if(statusWatch){
						data = undefined;
						if(shouldHide.indexOf(idEpisode) == -1){
							shouldHide.push(idEpisode);
						}
					}else{
						shouldHide.splice(shouldHide.indexOf(idEpisode), 1);
					}
				}
			}
			
			generateList();
			
			for(var k = 0; k < tvshows.length; k++){
				menu.section(k, tvshows[k]);
			}*/
			menu.hide();
		});
	});
}