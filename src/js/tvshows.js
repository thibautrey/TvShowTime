var UI = require('ui');
var tvshow = require('tvshow');
var assets = require('assets');
var inter = require('internationalization');

this.exports.display = display;

var loading;
var data;

function display(){
	assets.displayCard(inter.show("Loading"), "Retrieving the list of shows, please wait ...", true, function(cardObject){
		loading = cardObject;
	});
	
	if(typeof(data) != "undefined"){
		displayList(data);
		loading.hide();
	}else{
		assets.apiCall('library', {
			success: function(dataFromServer){
				loading.hide();
				if(dataFromServer.result == "OK"){
					data = dataFromServer;
					displayList(dataFromServer);
				}else{
					assets.displayCard(inter.show('Error'), inter.show("An error occured while trying to fetcht the list of shows. Please try again later"), true);
				}
			},
			error: function(){
				assets.displayCard(inter.show('Error'), inter.show("An error occured while trying to fetcht the list of shows. Please try again later"), true);
				loading.hide();
			}
		}, "get", "&limit=50");	
	}
}

function displayList(data){
	var shows = Array();
	
	for(var i = 0; i < data.shows.length; i++){
		var currentShow = data.shows[i];
		shows.push({
			title: assets.removeAccent(currentShow.name),
			icon: "images/"+assets.tvShowIdToImagePath(currentShow.id)
		});
	}
	
	var menu = new UI.Menu(assets.elementSettingsByPlatform({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		sections: [{
			items: shows
		}]
	}));
	
	menu.show();
	
	menu.on('select', function(e){
		tvshow.display(data.shows[e.itemIndex]);
	});
}