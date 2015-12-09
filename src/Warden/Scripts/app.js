﻿(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];
    angular.module('wardenapp', ['ngRoute', 'siteService']).config(config);

    function config($routeProvider, $locationProvider) {        
        $routeProvider.when('/', {
                          templateUrl: '/pages/home.html'
                      })
                      .when('/about', {
                          templateUrl: '/pages/about.html'
                      })
                       .when('/contact', {
                           templateUrl: '/pages/contact.html'
                       })
                      .when('/viewsites', {
                          templateUrl: '/pages/sites.html',
                          controller: 'SiteQueryController',
                          controllerAs : 'siteQueryController'
                      })
                       .otherwise({
                           redirectTo: "/"
                       });


        $locationProvider.html5Mode(true);
    }

})();