var cashRegisterApp = angular.module("crApp", []);
cashRegisterApp.controller('crCtrl', function($scope, $filter){
    // Declare the coin objects with value, image, and name

    var purse = {
        dollar: {
            name: "Dollar Coin",
            value: 1.00,
            image: "css/img/dollar.png"
        },
        quarter: {
            name: "Quarter",
            value: 0.25,
            image: "css/img/quarter-front.png"
        },
        dime: {
            name: "Dime",
            value: 0.10,
            image: "css/img/dime-front.png"
        },
        nickel: {
            name: "Nickel",
            value: 0.05,
            image: "css/img/nickle-front.png"
        },
        penny: {
            name: "Penny",
            value: 0.01,
            image: "css/img/penny-front.png"
        }
    };
    
    // Function that figures out the amount of change due and then loops through that amount with the types of coins available
    $scope.makeChange = function(){
        // Declaring an array that will be populated with the change and ng-repeat will iterate through it and populate the page simultaneously it clears the previous data
        var changeArr = [];
        $scope.changeArr = changeArr;
        var leftOver = $filter('number')($scope.paid - $scope.total, '2');
        $scope.totalDue = $filter('currency')(leftOver, '$', '2');
        // Great for loop that compares the coin amount to the change total and then subtracts that amount from what is left
        for(coin in purse){
            while(purse[coin].value <= leftOver){
                $filter('number')(purse[coin].value, '2');
                changeArr.push(purse[coin]);
                leftOver -= purse[coin].value;
                leftOver = $filter('number')(leftOver, '2');
            }
        }
        sortThroughCoins(changeArr);
    }


    // Sorts through the coins in the changeArr and puts them in order from highest value to lowest in order to iterate through the array and display the count for each type of coin

    function sortThroughCoins(arr){
        var coinAmountArr = [];
        var current = null;
        var count = 0;
        // Actually sorts the array by object's value property
        arr.sort(function (a, b){
            if(a.value > b.value){
                return -1;
            }else if (a.value < b.value) {
                return 1;
            }else{
                return 0;
            }
        });

        // Pushes amount of each type of coin to array for population on the page
        for (var i = 0; i <= arr.length; i++) {
            // if the preceeding item in the array doesn't share the same value as the current item then you're on to the next coin and it's time to push how many of the current coin we have
            if(arr[i] != current){
                if(count > 1){
                    coinAmountArr.push("You have " + count + " " + current.name + "'s");
                }else if(count == 1){
                    coinAmountArr.push("You have " + count + " " + current.name);
                }
                current = arr[i];
                count = 1;
            }else{
                count++;
            }
        }
        $scope.coinAmount = coinAmountArr;
    }
});

cashRegisterApp.directive('carousel', function($timeout) {
 return {
    restrict: 'E',
    scope: {
      links: '='
    },
    templateUrl: 'carousel.html',
    link: function(scope, element) {
      $timeout(function() {
        $('.carousel-indicators li',element).first().addClass('active');
        $('.carousel-inner .item',element).first().addClass('active');
      });
    }
 }
});
