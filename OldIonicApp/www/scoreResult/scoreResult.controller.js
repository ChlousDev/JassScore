(function () {
    'use strict';

    var controllerId = 'ScoreResultController';
    angular
        .module('jassScore.scoreResult')
        .controller(controllerId, ScoreResultControllerFactory);

    ScoreResultControllerFactory.$inject = ['$scope', '$stateParams'];

    function ScoreResultControllerFactory($scope, $stateParams) {

        var vm = this;

        vm.score = 0;
        vm.multipliedScore = 0;
        vm.oponentScore = 0;
        vm.oponentMultipliedScore = 0;
        vm.multiplicationFactor=0;
        vm.showMultiplication=false;

        init();

        function init() {
            vm.score = parseInt($stateParams.score);
            vm.multiplicationFactor = parseInt($stateParams.multiplicationFactor);
            vm.multipliedScore = vm.score * vm.multiplicationFactor;
            vm.oponentScore = 157 - vm.score;
            if (vm.oponentScore < 0) {
                vm.oponentScore = 0;
            }
            vm.oponentMultipliedScore = vm.oponentScore * vm.multiplicationFactor;
            vm.showMultiplication=vm.multiplicationFactor>1;
        }

    }
})();