'use strict';

function settingsFactory(globalSettings) {

    // PRIVATE VAR
    //
    var _activeLang = globalSettings.DEFAULT_LANGUAGE;


    // PUBLIC VAR
    //
    var treksUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.TREKS_FILE,
        trekUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.TREKS_DIR + '/',
        poisUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.POI_FILE,
        servicesUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.SERVICES_FILE,
        eventsUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.TOURISTIC_EVENTS_FILE,
        touristicUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.TOURISTIC_CONTENTS_FILE,
        diveUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.DIVES_DIR + '/',
        divesUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.DIVES_FILE,
        flatUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.FLAT_FILE,
        warningCategoriesUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.WARNING_CAT_DIR + '/' + globalSettings.WARNING_CAT_FILE,
        warningOptionsUrl =  globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.WARNING_CAT_DIR + '/' + globalSettings.WARNING_OPT_FILE,
        warningSubmitUrl =  globalSettings.BACKOFFICE_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.WARNING_SUBMIT_URL,
        stylesConfigUrl = globalSettings.BACKOFFICE_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.STYLES_CONFIG_FILE,
        sensitiveUrl = globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.SENSITIVE_FILE,
        infrastructuresUrl = globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.INFRASTRUCTURES_FILE,
        signagesUrl = globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/' + globalSettings.SIGNAGES_FILE,
        trekSensitiveUrl = globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/treks/',
        diveSensitiveUrl = globalSettings.API_URL + '/' + globalSettings.API_DIR + '/$lang/dives/',
        parametersURL = globalSettings.API_URL + '/' + globalSettings.API_DIR + '/' + 'parameters.json';

    //PUBLIC METHODS
    //
    var setLang = function setLang (newLang) {
        _activeLang = newLang;
        return true;
    };

    var getLang = function getLang () {
        return _activeLang;
    };



    return {

        //PUBLIC VAR
        treksUrl: treksUrl,
        trekUrl: trekUrl,
        poisUrl: poisUrl,
        servicesUrl: servicesUrl,
        eventsUrl: eventsUrl,
        touristicUrl: touristicUrl,
        diveUrl: diveUrl,
        divesUrl: divesUrl,
        flatUrl: flatUrl,
        warningCategoriesUrl: warningCategoriesUrl,
        warningOptionsUrl: warningOptionsUrl,
        warningSubmitUrl: warningSubmitUrl,
        stylesConfigUrl: stylesConfigUrl,
        sensitiveUrl: sensitiveUrl,
        infrastructuresUrl: infrastructuresUrl,
        signagesUrl: signagesUrl,
        trekSensitiveUrl: trekSensitiveUrl,
        diveSensitiveUrl: diveSensitiveUrl,
        parametersURL: parametersURL,

        //METHODS
        setLang: setLang,
        getLang: getLang

    };

}

module.exports = {
    settingsFactory: settingsFactory
};