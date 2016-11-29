'use strict';
angular.module('mean.system').controller('CustomerInvoiceController', ['$scope','$http','$location', '$rootScope', 'Global', 'Menus','$stateParams',
  function($scope,$http,$location,$rootScope, Global, Menus,$stateParams) {
	  

	  var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute;  
//document.write(dateTime);
	    
	  
	   var param1 = $stateParams.id;
	   if (typeof param1 != 'undefined')
	   {
		   $scope.editit=true;
		   $http.get('/customerinvoice/'+param1)
		.success(function(response){
		//	alert(response.material_name);
 $scope.user = {edit_id:param1,date_added:response.date_added,material_name:response.material_name,ready_state:response.ready_state,document_added:response.document_added};
		//$scope.sinvoices=response;
		 //location.reload();
		
		});
		   
		  // alert(param1);
		   
		   }
	else{
		 $scope.editit=false;
		$scope.user = {date_added:dateTime,ready_state:'Ready'};
		}
	   
  $scope.edit_invoice = function() {
    $scope.$broadcast('show-errors-check-validity');
    
    if ($scope.userForm.$valid) {
		//alert($scope.user.name);
		//alert($scope.user.date_picker);
		//alert($scope.user.file_uploaded);
		//alert($scope.user.ready);
  //   alert($scope.user.document_added);
	// alert($scope.user.document_present);
	  if($scope.user.document_added == 'undefined'){
		  $scope.user.document_added=$scope.user.document_present;
		  
		  }
		//  alert($scope.user.date_added);
	  $http.post('/customerinvoice/invoice/edit/'+param1,$scope.user)
.success(function(response){

//alert("Added");

});
	  
	 $location.path('customer-invoice');  
     
    }
  };	  
	  
	  $http.get('/customerinvoice')
.success(function(response){
//alert(response);
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
	  
	  

	  $scope.save = function() {
    $scope.$broadcast('show-errors-check-validity');
    
    if ($scope.userForm.$valid) {
		//alert($scope.user.name);
		//alert($scope.user.date_picker);
		//alert($scope.user.file_uploaded);
		//alert($scope.user.ready);
      //alert('User saved');
	 // var date_added = encodeURIComponent($scope.user.date_picker);
	  //var file_path = encodeURIComponent($scope.user.file_uploaded);
	  
	  $http.post('/customerinvoice/invoice',$scope.user)
.success(function(response){

//alert("Added");

});
	  

	 /* $http.get('/supplierinvoice/'+$scope.user.name+'/2016-4-8/test.doc/'+$scope.user.ready+'/create')
.success(function(response){

//alert("Added");

});*/
// $scope.reset();
	 $location.path('customer-invoice');  
     
    }
  };


 $scope.save_image = function() {
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.userForm.$valid) {
	  $http.post('/customerinvoice/invoiceadd',$scope.user)
.success(function(response){
});
	 $location.path('customer-invoice');  
     
    }
  };

	
  
  
	$scope.remove=function(id){
		
		$http.get('/customerinvoice/remove/'+id)
		.success(function(response){
		//$scope.sinvoices=response;
		 location.reload();
		
		});
		} 
	
	  $scope.archive=function(id){
		  
		  $http.get('/customerinvoice/archive/'+id)
		.success(function(response){
		//$scope.sinvoices=response;
		 location.reload();
		
		});
		  }
	
	$scope.OpenForm=function(){
		$location.path('add-customer-invoice');  
		
		} 	
	$scope.OpenArchived=function(){
		$location.path('customer-invoice-archived');  
		
		} 	
		
		
		$scope.edit=function(id){
			
			$location.path('add-customer-invoice/'+id); 
			
			 }	
		 
  $scope.reset = function() {
    $scope.$broadcast('show-errors-reset');
    $scope.user = { name: '', email: '' };
	var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute;  
//document.write(dateTime);
	    $scope.user = {date_added:dateTime};
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
