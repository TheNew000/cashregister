var cashRegisterApp = angular.module("cashRegisterApp", []);
cashRegisterApp.controller('registerController', function($scope, $filter){

    var purse = {
        dollar: {
            name: "Dollar Coin",
            value: 1,
            image: "dollar.png"
        },
        quarter: {
            name: "quarter",
            value: .25,
            image: "quarter-front.png"
        },
        dime: {
            name: "dime",
            value: .10,
            image: "dime-front.png"
        },
        nickel: {
            name: "nickel",
            value: .05,
            image: "nickle-front.png"
        },
        penny: {
            name: "penny",
            value: .01,
            image: "penny-front.png"
        }
    };

    var changeArr = [];
    $scope.changeArr = changeArr;

    $scope.makeChange = function(){
        var leftOver = $filter('number')($scope.paid - $scope.total, '2');
        $scope.totalDue = $filter('currency')(leftOver, '$', '2');
        for(coin in purse){
            while(purse[coin].value <= leftOver){
                changeArr.push(purse[coin]);
                leftOver -= purse[coin].value;
            }
        }
        sortThroughCoins(changeArr);
    }

    function sortThroughCoins(arr){
        var coinAmountArr = [];
        var current = null;
        var count = 0;
        arr.sort(function (a, b){
            if(a.value > b.value){
                return -1;
            }if (a.value < b.value) {
                return 1;
            }
                return 0;
            });
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] != current){
                if(count > 0 && count > 1){
                    coinAmountArr.push("You have " + count + " " + current.name + "'s");
                }else if(count > 0){
                    coinAmountArr.push("You have " + count + " " + current.name);
                }
                current = arr[i];
                count = 1;
            }else{
                count++;
            }
        }
        if(count > 0 && count > 1){
            coinAmountArr.push("You have " + count + " " + current.name + "'s");
        }else if(count > 0){
            coinAmountArr.push("You have " + count + " " + current.name);
        }
        $scope.coinAmount = coinAmountArr;
    }
});
