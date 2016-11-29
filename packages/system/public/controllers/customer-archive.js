
angular.module('mean.system').controller('CustomerArchiveController', ['$scope','$http','$location', '$rootScope', 'Global', 'Menus','$stateParams',
  function($scope,$http,$location,$rootScope, Global, Menus,$stateParams) {

	  $http.get('/customerarchived')
.success(function(response){
for (var i=0; i<response.length; i++) {
	var re = /(?:\.([^.]+))?$/;

var ext = re.exec(response[i].document_added)[1]; 
	if(ext=='txt'){
		response[i].filetype='txt.png';
		}
	else if(ext=='doc'){
		response[i].filetype='doc.png';
		}
	else if(ext=='dotx'){
		response[i].filetype='dotx.png';
		}
	else if(ext=='docx'){
		response[i].filetype='dotx.png';
		}	
	else if(ext=='gif'){
		response[i].filetype='gif.png';
		}	
	else if(ext=='jpg'){
		response[i].filetype='jpg.png';
		}
	else if(ext=='pdf'){
		response[i].filetype='pdf.png';
		}
	else if(ext=='png'){
		response[i].filetype='png.png';
		}
							
		else{
			
		response[i].filetype='_blank.png';	
			}
 
}
$scope.sinvoices=response;
});

	  $scope.restore=function(id){
		  
		  $http.get('/customerinvoice/restore/'+id)
		.success(function(response){
		//$scope.sinvoices=response;
		 location.reload();
		
		});
		  }
	
	$scope.remove=function(id){
		
		$http.get('/customerinvoice/remove/'+id)
		.success(function(response){
		//$scope.sinvoices=response;
		 location.reload();
		
		});
		} 	  
		  
    $scope.global = Global;
    $scope.menus = {};

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
