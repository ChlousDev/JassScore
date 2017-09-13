(function () {
    'use strict';

    var serviceId = 'currentSettingsService';
    angular
        .module('jassScore.services')
        .service(serviceId, CurrentSettingsServiceFactory);

    CurrentSettingsServiceFactory.$inject = ['$localStorage'];

    function CurrentSettingsServiceFactory($localStorage) {
        var service = {
            getLanguage: getLanguage,
            setLanguage: setLanguage,
            getDeckType: getDeckType,
            setDeckType: setDeckType
        };

        function getLanguage() {
            var lang = 'de';
            if ($localStorage.language) {
                lang = $localStorage.language;
            }
            return lang;
        }

        function setLanguage(lang) {
            $localStorage.language = lang;
        }

        function getDeckType() {
            var deckType = 'fr';
            if ($localStorage.deckType) {
                deckType = $localStorage.deckType;
            }
            return deckType;
        }

        function setDeckType(deckType) {
            $localStorage.deckType = deckType;
        }

        return service;

    }

})();