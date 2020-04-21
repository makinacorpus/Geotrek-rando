'use strict';

function WarningPanelController($scope, $rootScope, $q, resultsService, WarningService, WarningMapService, utilsFactory, globalSettings) {

    var onMap = false;

    function updateMapWithDetails(forceRefresh) {
        var deferred = $q.defer();

        var promise;
        if (!forceRefresh) {
            promise = resultsService.getAResultBySlug($stateParams.slug, $stateParams.catSlug, forceRefresh);
        } else {
            promise = resultsService.getAResultByID($scope.result.id, $scope.result.properties.category.id, forceRefresh);
        }

        deferred.resolve(
            promise
                .then(
                    function (data) {
                        $scope.result = data;
                        WarningMapService.displayDetail($scope.result, forceRefresh);
                        $rootScope.elementsLoading --;
                    }, function () {
                        $rootScope.elementsLoading --;
                    }
                )
        );

        return deferred.promise;
    }


    $scope.initWarningPanel = function initWarningPanel () {
        $scope.showWarningPanel = true;
        if ($rootScope.mapIsShown) {
            onMap = true;
            $rootScope.mapIsShown = false;
        } else {
            onMap = false;
        }
    };

    function updateLocation(newLocation) {
        $scope.warning.location = newLocation;
    }

    $scope.close = function close () {
        if (onMap) {
            $rootScope.mapIsShown = true;
        }
        $scope.showWarningPanel = false;
        WarningMapService.removeMap();
        $scope.warning = null;
    };

    $scope.sendWarning = function sendWarning () {
        if ($scope.warningForm.$valid) {
            WarningService.sendWarning($scope.warning)
                .then(function (answer) {
                    $scope.warningStatus = 'success';
                })
                .catch(function (err) {
                    $scope.warningStatus = 'error';
                });
        }
    };

    $scope.sendWarningPictures = function sendWarningPictures () {
        if ($scope.warningForm.$valid) {
            WarningService.sendWarningPictures($scope.warning)
                .then(function (answer) {
                    $scope.warningStatus = 'success';
                })
                .catch(function (err) {
                    $scope.warningStatus = 'error';
                });
        }
    };
    var rootScopeEvents = [];

    rootScopeEvents.push(
        $rootScope.$on('showWarningPanel', function (event, args) {
            $scope.result = args.result;
            $scope.warningStatus = null;
            $scope.warning = {};
            $scope.warning.location = utilsFactory.getStartPoint($scope.result);
            WarningService.getWarningCategories()
                .then(function (categories) {
                    $scope.hasAllOptions = categories.hasOwnProperty('activities')
                    if ($scope.hasAllOptions) {
                        $scope.warningCategories = categories.categories;
                        $scope.warning.category = categories.categories[0].id.toString();
                        $scope.warningActivities = categories.activities;
                        if (categories.activities.length !== 0) {
                            $scope.warning.activity = categories.activities[0].id.toString();
                        }
                        $scope.warningMagnitudeProblems = categories.magnitudeProblems;
                        if (categories.magnitudeProblems.length !== 0) {
                            $scope.warning.magnitudeProblem = categories.magnitudeProblems[0].id.toString();
                        }
                    } else {
                        $scope.warningCategories = categories;
                        $scope.warning.category = categories[0].id.toString();
                    }
                    WarningMapService.getMap('warning-map', $scope.result);
                    WarningMapService.addCallback(updateLocation);
                    updateMapWithDetails(true);
                })
                .catch(function (err) {
                    console.error(err);
                });
            $scope.initWarningPanel();
        }),
        $scope.close
    );

    $scope.$on('$destroy', function () { rootScopeEvents.forEach(function (dereg) { dereg(); }); });

}

module.exports = {
    WarningPanelController: WarningPanelController
};
