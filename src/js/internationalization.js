var assets = require('assets');

this.exports.show = show;

var strings = {
	"To Watch":{
		default: "To Watch",
		en_US: "To Watch",
		fr_FR: "A voir"
	},
	"Agenda":{
		default: "Agenda",
		en_US: "Agenda",
		fr_FR: "Agenda",
	},
	"My Shows":{
		default: "My Shows",
		en_US: "My Shows",
		fr_FR: "Mes séries"
	},
	"Login":{
		default: "Login",
		en_US: "Login",
		fr_FR: "Connexion"
	},
	"Please login on your phone (using the Pebble app) before opening this app.":{
		default: "Please login on your phone (using the Pebble app) before opening this app.",
		en_US: "Please login on your phone (using the Pebble app) before opening this app.",
		fr_FR: "Veuillez vous connecter sur votre téléphone (en utilisant l'application Pebble') avant d'utiliser l'application."
	},"Loading":{
		default: "Loading",
		en_US: "Loading",
		fr_FR: "Chargement"
	},
	"Please wait while we retrieve your data ...": {
		default: "Please wait while we retrieve your data ...",
		en_US: "Please wait while we retrieve your data ...",
		fr_FR: "Veuillez patienter pendant que nous récupérons vos informations ..."
	},"Error":{
		default: "Error",
		en_US: "Error",
		fr_FR: "Erreur"
	},
	"An error occured while trying to fetch your data. Please try again later.":{
		default: "An error occured while trying to fetch your data. Please try again later.",
		en_US: "An error occured while trying to fetch your data. Please try again later.",
		fr_FR: "Une erreur est survenue pendant la récupération de vos informations. Veuillez réessayer plus tard."
	},
	"monthsNames":{
		default: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		en_US: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		fr_FR: [ "Jan", "Fev", "Mar", "Avr", "Mai", "Jui",
    "Juil", "Aou", "Sep", "Oct", "Nov", "Dec" ]
	},
	"Season ":{
		default: "Season ",
		en_US: "Season ",
		fr_FR: "Saison "
	},
	"S ":{
		default: "S ",
		en_US: "S ",
		fr_FR: "S "
	},
	" Episode ":{
		default: " Episode ",
		en_US: " Episode ",
		fr_FR: " Episode "
	},
	" Epsd ":{
		default: " Epsd ",
		en_US: " Epsd ",
		fr_FR: " Epsd "
	},
	"We are fetching the episode data, please wait.":{
		default: "We are fetching the episode data, please wait.",
		en_US: "We are fetching the episode data, please wait.",
		fr_FR: "Récupération des informations de l'épisode, veuillez patienter."
	},
	"An error occured while trying to fetch the episode data. Please try again later.":{
		default: "An error occured while trying to fetch the episode data. Please try again later.",
		en_US: "An error occured while trying to fetch the episode data. Please try again later.",
		fr_FR: "Une erreur est survenue pendant la récupération des informations de l'episode. Veuillez réessayer plus tard."
	},
	"Mark as Watched":{
		default: "Mark as Watched",
		en_US: "Mark as Watched",
		fr_FR: "Marquer vu"
	},
	"Mark unwatched":{
		default: "Mark unwatched",
		en_US: "Mark unwatched",
		fr_FR: "Marquer non-vu"
	},
	"Actions":{
		default: "Actions",
		en_US: "Actions",
		fr_FR: "Actions"
	},
	"Infos":{
		default: "Infos",
		en_US: "Infos",
		fr_FR: "Infos"
	},
	"Title":{
		default: "Title",
		en_US: "Title",
		fr_FR: "Titre"
	},
	"Air date":{
		default: "Air date",
		en_US: "Air date",
		fr_FR: "Date diffusion"
	},
	"Overview":{
		default: "Overview",
		en_US: "Overview",
		fr_FR: "Description"
	},
	"Retrieving the list of episode to watch, please wait ...":{
		default: "Retrieving the list of episode to watch, please wait ...",
		en_US: "Retrieving the list of episode to watch, please wait ...",
		fr_FR: "Chargement de la liste des épisodes à voir, veuillez patienter ..."
	},
	"An error occured while trying to retrieve the list of episode. Please try again later.": {
		default: "An error occured while trying to retrieve the list of episode. Please try again later.",
		en_US: "An error occured while trying to retrieve the list of episode. Please try again later.",
		fr_FR: "Une erreur est survenue pendant la récupération des épisodes à voir. Veuillez réesayer plus tard."
	},
	"Retrieving the tv show data, please wait ...":{
		default: "Retrieving the tv show data, please wait ...",
		en_US: "Retrieving the tv show data, please wait ...",
		fr_FR: "Récupération des information de la série, veuillez patienter ..."
	},
	"An error occured while trying to fetch the show. Please try again later.":{
		default: "An error occured while trying to fetch the show. Please try again later.",
		en_US: "An error occured while trying to fetch the show. Please try again later.",
		fr_FR: "Une erreur est survenue pendant la récupération des informations de la série. Veuillez réessayer plus tard.",
	},
	"Archive":{
		default: "Archive",
		en_US: "Archive",
		fr_FR: "Archiver"
	},
	"Next episode aired":{
		default: "Next episode aired",
		en_US: "Next episode aired",
		fr_FR: "Date prochain épisode"
	},
	"Last watched":{
		default: "Last watched",
		en_US: "Last watched",
		fr_FR: "Dernier vus"
	},
	"Seasons":{
		default: "Seasons",
		en_US: "Seasons",
		fr_FR: "Saison"
	},
	"Followers": {
		default: "Followers",
		en_US: "Followers",
		fr_FR: "Fans"
	},
	"Status": {
		default: "Status",
		en_US: "Status",
		fr_FR: "Status"
	},
	"Runtime": {
		default: "Runtime",
		en_US: "Runtime",
		fr_FR: "Durée épisode"
	},
	"Episodes aired": {
		default: "Episodes aired",
		en_US: "Episodes aired",
		fr_FR: "Episodes diffusés"
	},
	"Episodes seen": {
		default: "Episodes seen",
		en_US: "Episodes seen",
		fr_FR: "Episodes vus"
	},
	"An error occured while trying to fetcht the list of shows. Please try again later": {
		default: "An error occured while trying to fetch the list of shows. Please try again later",
		en_US: "An error occured while trying to fetch the list of shows. Please try again later",
		fr_FR: "Une erreur est survenue pendant le chargement de la liste des séries tv. Veuillez réessayer plus tard."
	},
	"Confirm": {
		default: "Confirm",
		en_US: "Confirm",
		fr_FR: "Confirmer"
	},
	"Vote": {
		default: "Vote",
		en_US: "Vote",
		fr_FR: "Voter"
	},
	"Close": {
		default: "Close",
		en_US: "Close",
		fr_FR: "Fermer"
	},
	"Saving": {
		default: "Saving",
		en_US: "Saving",
		fr_FR: "Enregistrement"
	},
	"Settings": {
		default: "Settings",
		en_US: "Settings",
		fr_FR: "Paramètres"
	},
	"When episode watched": {
		default: "When episode watched",
		en_US: "When episode watched",
		fr_FR: "Quand épisode vu"
	},
	"Activated": {
		default: "Activated",
		en_US: "Activated",
		fr_FR: "Activé"
	},
	"Deactivated": {
		default: "Deactivated",
		en_US: "Deactivated",
		fr_FR: "Désactivé"
	}
};

function show(string){
	if(typeof(strings[string]) != "undefined"){
		if(typeof(strings[string][assets.lang()]) != "undefined"){
			return strings[string][assets.lang()];
		}else{
			return strings[string].default;
		}
	}else{
		return "";
	}
}