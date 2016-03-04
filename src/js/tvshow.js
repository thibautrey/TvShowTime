var UI = require('ui');
var assets = require('assets');
var inter = require('internationalization');

this.exports.display = display;

var loading;
var id_show;

function display(data){
	if(typeof(data) == "object"){
		displayList(data);
	}else{
		loadData(data);
	}
}

function loadData(id){
	id_show = id;
	
	assets.displayCard(inter.show('Loading'), inter.show('Retrieving the tv show data, please wait ...'), true, function(cardObject){
		loading = cardObject;
	});
	
	assets.apiCall("show", {
		success: function(data){
			loading.hide();
			if(data.result=="OK"){
				displayList(data.show);
			}
		},
		error: function(error){
			assets.displayCard(inter.show("Error"), inter.show("An error occured while trying to fetch the show. Please try again later."), true);
			loading.hide();
		}
	}, "get", "&show_id="+id_show);
}

function displayList(data){
	if(typeof(loading) != "undefined"){
		loading.hide();
	}
	var menu = new UI.Menu({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		sections: [titleSection(data), /*actionsSection(data), seasonsSection(data),*/ infosSection(data)]
	});
	
	menu.show();
}

function titleSection(data){
	return {
		items: [{
			title: data.name
		}]
	};
}

function actionsSection(data){
	return {
			title: inter.show("Actions"),
			items: [{
				title: inter.show("Archive")
			}, {
				title: inter.show("Next episode aired"),
				subtitle: "S02E15"
			}, {
				title: inter.show("Last watched"),
				subtitle: "S02E14"
			}]
		};
}

function seasonsSection(data){
	return {
		title: inter.show("Seasons"), 
		items: [{
			title: inter.show("Seasons")
		}]
	};
}

function infosSection(data){
	return {
		title: inter.show("Info"), 
		items: [{
			title: inter.show("Followers"), 
			subtitle: data.nb_followers
		}, {
			title: inter.show("Status"), 
			subtitle: data.status
		}, {
			title: inter.show("Runtime"), 
			subtitle: data.runtime
		}, {
			title: inter.show("Seasons"),
			subtitle: data.number_of_seasons
		}, {
			title: inter.show("Episodes aired"),
			subtitle: data.aired_episodes
			}, {
			title: inter.show("Episodes seen"),
			subtitle: data.seen_episodes
			}]
	};
}