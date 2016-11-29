'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
	      var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'system/views/index.html'
      })
	  .state('overview', {
        url: '/overview',
        templateUrl: 'system/views/index.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('customer-invoice', {
        url: '/customer-invoice',
        templateUrl: 'system/views/customer-invoice.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('customer-invoice-archived', {
        url: '/customer-invoice-archived',
        templateUrl: 'system/views/customer-invoice-archived.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('customer-invoice-form', {
        url: '/add-customer-invoice',
        templateUrl: 'system/views/customer-invoice-form.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('edit customer-invoice', {
        url: '/add-customer-invoice/:id',
        templateUrl: 'system/views/customer-invoice-form.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('supplier-invoice', {
        url: '/supplier-invoice',
        templateUrl: 'system/views/supplier-invoice.html',
        resolve: {
          loggedin: checkLoggedin
        }
      }) 
	  .state('supplier-invoice-archived', {
        url: '/supplier-invoice-archived',
        templateUrl: 'system/views/supplier-invoice-archived.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('supplier-invoice-form', {
        url: '/add-supplier-invoice',
        templateUrl: 'system/views/supplier-invoice-form.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  
	   .state('edit supplier-invoice', {
        url: '/add-supplier-invoice/:id',
        templateUrl: 'system/views/supplier-invoice-form.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('supplier-invoice-form-image', {
        url: '/add-supplier-invoiceadd',
        templateUrl: 'system/views/supplier-invoice-form-image.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('expenses', {
        url: '/expenses',
        templateUrl: 'system/views/expenses.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('reports', {
        url: '/reports',
        templateUrl: 'system/views/reports.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('salary', {
        url: '/salary',
        templateUrl: 'system/views/salary.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('taxes', {
        url: '/taxes',
        templateUrl: 'system/views/taxes.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
	  .state('banking', {
        url: '/banking',
        templateUrl: 'system/views/banking.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
