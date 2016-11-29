'use strict';

angular.module('mean.system').controller('OverviewController', ['$scope','$http', '$rootScope', 'Global', 'Menus',
  function($scope,$http, $rootScope, Global, Menus) {
	  
 $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchMaterial   = '';     // set the default search/filter term
  
  // create the list of sushi rolls 
  
	  
    $scope.global = Global;
    $scope.menus = {};
var sinl=0;
var cinl=0;
$scope.totaltaxes=12;
//$scope.totalcinvoices=10;
$scope.totalsalary=14;
$scope.totalbanking=16;
$scope.totalexpenses=11;
$scope.totalloans=18;
  $scope.materials  = [];
   $http.get('/supplierinvoice')
.success(function(response){
	
	
$scope.totalsinvoices=response.length;
sinl=response.length;

  $http.get('/customerinvoice')
.success(function(response){
$scope.totalcinvoices=response.length;
cinl=response.length;
$scope.totalmaterial=sinl+12+cinl+14+16+11+18;

$scope.materials = [
    { sr:1,name: 'Supplier Invoice', count:sinl, material: 'Material',tick:'glyphicon-ok',ready:'Ready' },
    {sr:2, name: 'Taxes', count:12, material: 'Material',tick:'glyphicon-remove',ready:'Not Ready' },
    {sr:3, name: 'Customer Invoice', count:cinl, material: 'Material',tick:'glyphicon-ok',ready:'Ready' },
    { sr:4,name: 'Salary', count:14, material: 'Material',tick:'glyphicon-ok',ready:'Ready' },
	 { sr:5,name: 'Banking', count:16, material: 'Material',tick:'glyphicon-ok',ready:'Ready' },
	 { sr:6,name: 'Expenses', count:11, material: 'Material',tick:'glyphicon-ok',ready:'Ready' },
	 {sr:7, name: 'Loans', count:18, material: 'Material',tick:'glyphicon-ok',ready:'Ready' },
	 {sr:'', name: 'Total', count:$scope.totalmaterial, material: 'Material',tick:'glyphicon-ok',ready:'Ready' }

  ];

});
//$scope.sinvoices=response;
//alert(sinl);

});

	  
	  


    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function(menu) {
        $scope.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {

      queryMenu('main', defaultMainMenu);

      $scope.global = {
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

  }
]);
