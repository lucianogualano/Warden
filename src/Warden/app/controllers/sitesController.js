﻿(function () {
    'use strict';

    angular
        .module('wardenapp')
        .controller('SiteQueryController', SiteQueryController);

    //-----------------------------------------------
    // Query Controller
    //-----------------------------------------------
    SiteQueryController.$inject = ['siteService', '$log', '$window','$scope'];

    function SiteQueryController(siteService, $log, $window, $scope) {
        var vm = this;
       
        // Store new site details
        vm.newSite = {};

        // Remove this at a later state
        vm.newSite.Id = "00000000-0000-0000-0000-000000000000";        
        vm.sites = {};

        // Delete the site row from the grid and send message to server
        $scope.Delete = function (row) {
            $log.debug("'Deleting row " + row);
            vm.deleteSite(row);
        };

        vm.gridOptions = {
            //data: 'sites',
            columnDefs: [
                {
                    field: 'Id', name: '',
                    cellTemplate: 'pages/edit-button.html', width: 34, enableFiltering: false
                },
                { field: 'Name', displayName: 'Name' },
                { field: 'Address', displayName: 'Address' },
                {
                    name: 'Action',
                    cellEditableCondition: false,
                    cellTemplate: '<button class ="btn btn-danger" ng-click="grid.appScope.Delete(row)">Delete</button>', enableFiltering: false
                }
            ],
            multiSelect: false,
            enableFiltering: true,
            showColumnMenu: false
        };


        vm.isEditVisible = false;

        // Set the create new site visiblity state
        vm.showEdit = function()
        {
            vm.isEditVisible = true;
        }
        
        // Add new site if it is valid
        vm.addNewSite = function(site)
        {
            vm.isEditVisible = false;
            vm.insertSite(vm.newSite);
            vm.newSite = {};
        }

        // Delete site
        vm.deleteSite = function(row)
        {
            // Use the site service to get all the sites
            siteService.deleteSite(row.entity.Id)
            .then(function (results) {
                var index = vm.gridOptions.data.indexOf(row.entity);
                vm.gridOptions.data.splice(index, 1);
                // Remove from sites.
            }, function (error) {
                $window.alert(error.message);
            });
        }
        // Get all 
        vm.getSites = function () {
            $log.message = "get all sites";

            // Use the site service to get all the sites
            siteService.getSites()
            .then(function (results) {
                vm.gridOptions.data = results.data;
                vm.sites = results.data;
            }, function (error) {
                $window.alert(error.message);
            });
        };

        // Insert the new site
        vm.insertSite = function (site) {
            $log.message = "insert new site " + site.Name;

            // Validate on clide side?            

            // Insert the new side on the server side.
            // Check if validation error occurs?
            siteService.insertSite(site);

            // Add the new site to the client side collection
            vm.sites.push(site);
        }

         // Initialise the controller
        function init() {
            // Get all the sites
            vm.getSites();
        }
           
        init();
    }  
})();
