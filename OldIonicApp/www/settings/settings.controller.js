(function () {
    'use strict';

    var controllerId = 'SettingsController';
    angular
        .module('jassScore.settings')
        .controller(controllerId, SettingsControllerFactory);

    SettingsControllerFactory.$inject = ['$scope', '$translate', 'currentSettingsService', '$filter'];

    function SettingsControllerFactory($scope, $translate, currentSettingsService, $filter) {

        var vm = this;

        vm.language = 'de';
        vm.deckType = 'fr';
        vm.languageOptions = null;
        vm.deckTypeOptions = null;
        vm.saveSettings = saveSettings;

        init();

        function CreateDeckTypeOptions() {
            vm.deckTypeOptions = [
                {"name": $filter('translate')('settings.DECKTYPE_DE'), "code": "de"},
                {"name": $filter('translate')('settings.DECKTYPE_FR'), "code": "fr"}];
        }

        function init() {
            vm.language = currentSettingsService.getLanguage();
            vm.deckType = currentSettingsService.getDeckType(vm.deckType);

            vm.languageOptions = [
                {"name": "Deutsch", "code": "de"},
                {"name": "Französisch", "code": "fr"},
                {"name": "Italienisch", "code": "it"}];
            CreateDeckTypeOptions();
        }

        function saveSettings() {
            currentSettingsService.setLanguage(vm.language);
            currentSettingsService.setDeckType(vm.deckType);
            $translate.use(vm.language).then(function (data) {
                CreateDeckTypeOptions();
            });
        }

    }
})();