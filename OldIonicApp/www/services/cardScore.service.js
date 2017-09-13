(function () {
    'use strict';

    var serviceId = 'cardScoreService';
    angular
        .module('jassScore.services')
        .service(serviceId, CardScoreServiceFactory);

    CardScoreServiceFactory.$inject = [];

    function CardScoreServiceFactory() {
        var service = {
            trumpScore: trumpScore,
            topDownScore: topDownScore,
            bottomUp: bottomUp,
        };

        function trumpScore(trumpColor) {
            return function(card)
            {
                var score =0;
                if(card.indexOf('Ass') >= 0)
                {
                    score=11;
                }
                if(card.indexOf('Koenig') >= 0)
                {
                    score=4;
                }
                if(card.indexOf('Dame') >= 0)
                {
                    score=3;
                }
                if(card.indexOf('Bube') >= 0)
                {
                    score=2;
                }
                if(card.indexOf('10') >= 0)
                {
                    score=10;
                }
                if(card.indexOf(trumpColor) === 0)
                {
                    if(card.indexOf('Bube') >= 0)
                    {
                        score=20;
                    }
                    if(card.indexOf('9') >= 0)
                    {
                        score=14;
                    }
                }
                return score;
            }
        };

        function topDownScore(card) {
            var score = 0;
            if (card.indexOf('Ass') >= 0) {
                score = 11;
            }
            if (card.indexOf('Koenig') >= 0) {
                score = 4;
            }
            if (card.indexOf('Dame') >= 0) {
                score = 3;
            }
            if (card.indexOf('Bube') >= 0) {
                score = 2;
            }
            if (card.indexOf('10') >= 0) {
                score = 10;
            }
            if (card.indexOf('8') >= 0) {
                score = 8;
            }
            return score;
        };

        function bottomUp(card) {
            var score = 0;

            if (card.indexOf('Koenig') >= 0) {
                score = 4;
            }
            if (card.indexOf('Dame') >= 0) {
                score = 3;
            }
            if (card.indexOf('Bube') >= 0) {
                score = 2;
            }
            if (card.indexOf('10') >= 0) {
                score = 10;
            }
            if (card.indexOf('8') >= 0) {
                score = 8;
            }
            if (card.indexOf('6') >= 0) {
                score = 11;
            }
            return score;
        };

        return service;
    }

})();