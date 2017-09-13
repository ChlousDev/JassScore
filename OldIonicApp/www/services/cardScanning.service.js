(function () {
    'use strict';

    var serviceId = 'cardScanningService';
    angular
        .module('jassScore.services')
        .service(serviceId, CardScanningServiceFactory);

    CardScanningServiceFactory.$inject = ['$cordovaBarcodeScanner', '$q', '$ionicPlatform'];

    function CardScanningServiceFactory($cordovaBarcodeScanner, $q, $ionicPlatform) {
        var service = {
            scanCards: scanCards
        };

        function scanCards(scoreFunction) {
            var deferred = $q.defer();
            try {
                scanCard('', scoreFunction, 0, deferred);
            }
            catch (ex) {
                alert(ex);
            }
            return deferred.promise;
        };

        function scanCard(alreadyScannedCards, scoreFunction, totalScore, deferred) {
            try {
                $ionicPlatform.ready(function () {

                    $cordovaBarcodeScanner.scan().then(function (imageData) {
                        if (imageData.cancelled) {
                            deferred.resolve(totalScore);
                        } else {
                            if (alreadyScannedCards.indexOf(imageData.text) < 0) {
                                if (alreadyScannedCards.length > 0) {
                                    alreadyScannedCards = alreadyScannedCards + ',';
                                }
                                alreadyScannedCards = alreadyScannedCards + imageData.text;
                                totalScore = totalScore + scoreFunction(imageData.text);
                            }
                            scanCard(alreadyScannedCards, scoreFunction, totalScore, deferred);
                        }
                    }, function (error) {
                        console.log("An error happened -> " + error);
                        deferred.resolve(totalScore);
                    });
                });
            }
            catch (ex) {
                alert(ex);
            }
        };

        return service;
    }

})();