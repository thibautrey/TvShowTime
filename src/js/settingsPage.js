var UI = require('ui');
var assets = require('assets');
var inter = require('internationalization');

this.exports.display = display;

function display(){
	var strings = {
		true: inter.show('Activated'), 
		false: inter.show('Deactivated')
	};
	
	var menu = new UI.Menu({
		sections: [{
			title: inter.show("When episode watched"),
			items: [{
				title: "Post on Facebook",
				subtitle: strings[assets.statusPostFacebook()]
			}, {
				title: "Post on Twitter",
				subtitle: strings[assets.statusPostTwitter()]
			}]
		}]
	});
	
	menu.show();
	
	menu.on('select', function(e){
		switch(e.sectionIndex){
			case 0:
				switch(e.itemIndex){
					case 0: // Post on Facebook
						assets.statusPostFacebookToggle();
						menu.item(0, 0, {
							title: "Post on Facebook",
							subtitle: strings[assets.statusPostFacebook()]
						});
						break;
						
					case 1: // Post on Twitter
						assets.statusPostTwitterToggle();
						menu.item(0, 1, {
							title: "Post on Twitter",
							subtitle: strings[assets.statusPostTwitter()]
						});
						break;
				}
				break;
		}
	});
}