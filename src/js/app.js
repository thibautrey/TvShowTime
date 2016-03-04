var UI = require('ui');
var towatch = require('towatch');
var agenda = require('agenda');
var tvshows = require('tvshows');
var Settings = require('settings');
var settingsPage = require('settingsPage');
var assets = require('assets');
var inter = require('internationalization');
var wasDisplayingLogin = false;

init();
function init(){
	if(assets.token()){
		displayApp();
	}else{
		displayLogin();
		wasDisplayingLogin = true;
	}
}

function displayApp(){
	var menu = new UI.Menu(assets.elementSettingsByPlatform({
		backgroundColor : "darkGray",
		textColor : "white",
		highlightBackgroundColor : "black",
		highlightTextColor : "white",
		fullscreen: false,
		sections: [
			{
				items: [{
					title: inter.show("To Watch"),
					icon: "images/towatch.png"
				}, {
					title: inter.show("Agenda"),
					icon: "images/calendar.png"
				}, {
					title: inter.show("My Shows"),
					icon: "images/myshows.png"
				}]
			}
		]
	}));

	menu.show();

	menu.on('select', function(e){
		switch(e.itemIndex){
			case 0:
				towatch.display();
				break;

			case 1:
				agenda.display();
				break;

			case 2:
				tvshows.display();
				break;

			case 3:
				settingsPage.display();
				break;
		}
	});
}

var loginCard;
function displayLogin(){
	assets.displayCard(inter.show("Login"), inter.show("Please login on your phone (using the Pebble app) before opening this app."), true, function(card){
		loginCard = card;
	});
}

Settings.config(
	{ url: 'https://tvshowtime.parseapp.com/authorize' },
  function(e) {
		// Launching settings
  },
  function(e) {
		if(typeof(e.options.token) != "undefined"){
			assets.setToken(e.options.token);
			if(wasDisplayingLogin){
				loginCard.hide();
				displayApp();
			}
		}
  }
);
