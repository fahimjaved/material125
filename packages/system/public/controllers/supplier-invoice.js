'use strict';
angular.module('mean.system').directive('showErrors', function ($timeout, showErrorsConfig) {
      var getShowSuccess, linkFn;
      getShowSuccess = function (options) {
        var showSuccess;
        showSuccess = showErrorsConfig.showSuccess;
        if (options && options.showSuccess != null) {
          showSuccess = options.showSuccess;
        }
        return showSuccess;
      };
      linkFn = function (scope, el, attrs, formCtrl) {
        var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses;
        blurred = false;
        options = scope.$eval(attrs.showErrors);
        showSuccess = getShowSuccess(options);
        inputEl = el[0].querySelector('[name]');
        inputNgEl = angular.element(inputEl);
        inputName = inputNgEl.attr('name');
        if (!inputName) {
          throw 'show-errors element has no child input elements with a \'name\' attribute';
        }
        inputNgEl.bind('blur', function () {
          blurred = true;
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function (invalid) {
          if (!blurred) {
            return;
          }
          return toggleClasses(invalid);
        });
        scope.$on('show-errors-check-validity', function () {
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$on('show-errors-reset', function () {
          return $timeout(function () {
            el.removeClass('has-error');
            el.removeClass('has-success');
            return blurred = false;
          }, 0, false);
        });
        return toggleClasses = function (invalid) {
          el.toggleClass('has-error', invalid);
          if (showSuccess) {
            return el.toggleClass('has-success', !invalid);
          }
        };
      };
      return {
        restrict: 'A',
        require: '^form',
        compile: function (elem, attrs) {
          if (!elem.hasClass('form-group')) {
            throw 'show-errors element does not have the \'form-group\' class';
          }
          return linkFn;
        }
      };
    }
  );
  
  angular.module('mean.system').provider('showErrorsConfig', function () {
    var _showSuccess;
    _showSuccess = false;
    this.showSuccess = function (showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.$get = function () {
      return { showSuccess: _showSuccess };
    };
  });
angular.module('mean.system').controller('SupplierInvoiceController', ['$scope','$http','$location', '$rootScope', 'Global', 'Menus','$stateParams',
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
		   $http.get('/supplierinvoice/'+param1)
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
	  $http.post('/supplierinvoice/invoice/edit/'+param1,$scope.user)
.success(function(response){

//alert("Added");

});
	  
	 $location.path('supplier-invoice');  
     
    }
  };	  
	  
	  $http.get('/supplierinvoice')
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
	  
	  $http.post('/supplierinvoice/invoice',$scope.user)
.success(function(response){

//alert("Added");

});
	  

	 /* $http.get('/supplierinvoice/'+$scope.user.name+'/2016-4-8/test.doc/'+$scope.user.ready+'/create')
.success(function(response){

//alert("Added");

});*/
// $scope.reset();
	 $location.path('supplier-invoice');  
     
    }
  };


 $scope.save_image = function() {
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.userForm.$valid) {
	  $http.post('/supplierinvoice/invoiceadd',$scope.user)
.success(function(response){
});
	 $location.path('supplier-invoice');  
     
    }
  };

	
  
  
	$scope.remove=function(id){
		
		$http.get('/supplierinvoice/remove/'+id)
		.success(function(response){
		//$scope.sinvoices=response;
		 location.reload();
		
		});
		} 
	
	  $scope.archive=function(id){
		  
		  $http.get('/supplierinvoice/archive/'+id)
		.success(function(response){
		//$scope.sinvoices=response;
		 location.reload();
		
		});
		  }
	
	$scope.OpenForm=function(){
		$location.path('add-supplier-invoice');  
		
		} 	
	$scope.OpenArchived=function(){
		$location.path('supplier-invoice-archived');  
		
		} 	
		
		
		$scope.edit=function(id){
			
			$location.path('add-supplier-invoice/'+id); 
			
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
