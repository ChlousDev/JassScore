// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('jassScore', [
    'ionic',
    'ngCordova',
    'pascalprecht.translate',
    'ngResource',
    'jassScore.services',
    'jassScore.cardScanning',
    'jassScore.scoreResult',
    'jassScore.settings'
])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(configRoute)
    .config(configLang)


configRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
function configRoute($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('jassScore', {
            url: "/jassScore",
            abstract: true,
            templateUrl: "index.html"
        })

        .state('jassScore.cardScanning', {
            cache: false,
            url: "/cardScanning",
            templateUrl: "cardScanning/cardScanning.html",
            controller: 'CardScanningController as vm',
        })

        .state('jassScore.scoreResult', {
            cache: false,
            url: "/scoreResult/:score/:multiplicationFactor",
            templateUrl: "scoreResult/scoreResult.html",
            controller: 'ScoreResultController as vm',
        })

        .state('jassScore.settings', {
            cache: false,
            url: "/settings",
            templateUrl: "settings/settings.html",
            controller: 'SettingsController as vm',
        })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/jassScore/cardScanning');
}

configLang.$inject = ['$translateProvider', '$translatePartialLoaderProvider'];
function configLang($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/lang/{part}.lang.{lang}.json'
        }
    );
    $translatePartialLoaderProvider.addPart('settings');
    $translatePartialLoaderProvider.addPart('cardScanning');
    $translatePartialLoaderProvider.addPart('scoreResult');

}