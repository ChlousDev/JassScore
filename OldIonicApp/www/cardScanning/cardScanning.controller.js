(function () {
    'use strict';

    var controllerId = 'CardScanningController';
    angular
        .module('jassScore.cardScanning')
        .controller(controllerId, CardScanningControllerFactory);

    CardScanningControllerFactory.$inject = ['$scope', '$state', '$translate', '$filter', 'cardScanningService', 'cardScoreService', 'currentSettingsService'];

    function CardScanningControllerFactory($scope, $state, $translate, $filter, cardScanningService, cardScoreService, currentSettingsService) {

        var vm = this;

        vm.mode = null;
        vm.trumpColor = null;
        vm.start = null;
        vm.scanCards = scanCards;
        vm.modeOptions = null;
        vm.trumpOptions = null;
        vm.startOptions = null;
        vm.lastRound = false;
        vm.match = false;
        vm.multiplicator = null;
        vm.multiplicatorOptions = null;
        vm.showTrumpSelection = function () {
            return (!vm.match) && (vm.mode === "trump");
        };
        vm.showStartSelection = function () {
            return (!vm.match) && ((vm.mode === "slalom") || (vm.mode === "fiveFour"));
        };
        vm.showModeSelection = function () {
            return !vm.match;
        };
        vm.showLastRound = function () {
            return !vm.match;
        };


        init();

        function init() {
            $translate.use(currentSettingsService.getLanguage()).then(function (data) {

                vm.mode = 'trump';
                vm.trumpColor = 'Herz';
                vm.start = 'topDown';
                vm.multiplicator=1;

                vm.multiplicatorOptions = [
                    {"name": "1", "value": 1},
                    {"name": "2", "value": 2},
                    {"name": "3", "value": 3},
                    {"name": "4", "value": 4},
                    {"name": "5", "value": 5},
                    {"name": "6", "value": 6},
                    {"name": "7", "value": 7},
                    {"name": "8", "value": 8},
                    {"name": "9", "value": 9},
                    {"name": "10", "value": 10}];

                vm.modeOptions = [
                    {"name": $filter('translate')('cardScanning.MODE_TRUMP'), "code": "trump"},
                    {"name": $filter('translate')('cardScanning.MODE_TOPDOWN'), "code": "topDown"},
                    {"name": $filter('translate')('cardScanning.MODE_BOTTOMUP'), "code": "bottomUp"},
                    {"name": $filter('translate')('cardScanning.MODE_SLALOM'), "code": "slalom"},
                    {"name": $filter('translate')('cardScanning.MODE_FIVEFOUR'), "code": "fiveFour"},
                    {"name": $filter('translate')('cardScanning.MODE_MISERE'), "code": "misere"}];

                vm.startOptions = [
                    {"name": $filter('translate')('cardScanning.START_TOP'), "code": "topDown"},
                    {"name": $filter('translate')('cardScanning.START_BOTTOM'), "code": "bottomUp"}];

                if (currentSettingsService.getDeckType() === 'de') {
                    vm.trumpOptions = [
                        {"name": $filter('translate')('cardScanning.TRUMP_ROSEN'), "code": "Herz"},
                        {"name": $filter('translate')('cardScanning.TRUMP_SCHILTEN'), "code": "Pik"},
                        {"name": $filter('translate')('cardScanning.TRUMP_SCHELLEN'), "code": "Karo"},
                        {"name": $filter('translate')('cardScanning.TRUMP_EICHEL'), "code": "Kreuz"}];
                }
                else {
                    vm.trumpOptions = [
                        {"name": $filter('translate')('cardScanning.TRUMP_HERZ'), "code": "Herz"},
                        {"name": $filter('translate')('cardScanning.TRUMP_PIK'), "code": "Pik"},
                        {"name": $filter('translate')('cardScanning.TRUMP_KARO'), "code": "Karo"},
                        {"name": $filter('translate')('cardScanning.TRUMP_KREUZ'), "code": "Kreuz"}
                    ];
                }
            });
        }

        function scanCards() {
            try {
                if (vm.match) {
                    $state.go('jassScore.scoreResult', {"score": 257, "multiplicationFactor": vm.multiplicator});
                }
                else {
                    var scoreFunction = cardScoreService.topDownScore;
                    if (vm.mode === "trump") {
                        scoreFunction = cardScoreService.trumpScore(vm.trumpColor);
                    }
                    if ((vm.mode === "bottomUp") ||(((vm.mode === "slalom") || (vm.mode === "fiveFour")) && (vm.start === "bottomUp"))) {
                        scoreFunction = cardScoreService.bottomUp;
                    }
                    cardScanningService.scanCards(scoreFunction).then(function (totalScore) {
                        if (vm.lastRound) {
                            totalScore = totalScore + 5;
                        }
                        $state.go('jassScore.scoreResult', {
                            "score": totalScore,
                            "multiplicationFactor": vm.multiplicator
                        });
                    });
                }
            }
            catch (ex) {
                alert(ex);
            }
        };

    }
})();