'use strict';

function stylesConfigService($http, $filter, settingsFactory, translationService, globalSettings) {

    // Variable to test if Json file is available - for development
    // Set to false if API dosn't send this file.
    this.isConfigAvailable = globalSettings.USE_CATEGORIES_COLORS_API;
    var defaultConfig = {
        "colors": {
            "main": "#f39400",
            "categories": {
                "T1": "#111",
                "T2": "#1d1d1d",
                "T3": "#222",
                "E" : "#2d2d2d",
                "C1": "#333",
                "C2": "#3d3d3d",
                "C3": "#444",
                "C4": "#4d4d4d",
                "C5": "#555",
                "C6": "#5d5d5d",
                "C7": "#666",
                "C8": "#6d6d6d"
            }
        }
    };

    this.getCustomConfig = function getCustomConfig() {
        var currentLang = translationService.getCurrentLang(),
            url = settingsFactory.parametersURL;

        return $http({url: url})
            .then(function (response) {
                return angular.fromJson(response.data);
            }, function() {
                return defaultConfig;
            });
    };


    this.generateColorsStyle = function getCustomConfig(colors) {
        var styles = '';
        var tinycolor = require("tinycolor2");

        if (colors.main) {
            var darkenPrimary = tinycolor(colors.main).darken(5);

            var mainCSS =  [
                {
                    selector: '.primary-c, .primary-hover-c:hover, .primary-before-c::before, a, .header-links a:hover, .header-links:focus, header-links a:hover > .glyphicon, header-links a:hover > .fa, header-links a:focus > .glyphicon, header-links a:focus > .fa',
                    rules: ['color:' + colors.main]
                },
                {
                    selector: 'a:hover, a:focus, a:active',
                    rules: ['color:' + darkenPrimary]
                },
                {
                    selector: '.primary-bg',
                    rules: ['background-color:' + colors.main]
                },
                {
                    selector: '.primary-border-l',
                    rules: ['border-left-color:' + colors.main]
                },
                {
                    selector: '.primary-fill',
                    rules: ['fill:' + colors.main]
                }
            ];

            _.forEach(mainCSS, function(CSS) {
                styles += CSS.selector + '{' + CSS.rules.join(';') + '} ';
            });
        }

        if (colors.categories) {
            _.forIn(colors.categories, function(color, category) {

                var opacity05 = tinycolor(color).setAlpha(0.5).toRgbString();
                var lightenDesaturate = tinycolor(color).lighten(20).desaturate(20);
                var darken = tinycolor(color).darken(25);

                var categoriesCSS =  [
                    {
                        selector: '.category-' + category + '-c',
                        rules: ['color:' + color]
                    },
                    {
                        selector: '.category-' + category + '-border',
                        rules: ['border-color:' + color]
                    },
                    {
                        selector: '.category-' + category + '-bg, .category-' + category + '-bg-ld:hover',
                        rules: ['background-color:' + color]
                    },
                    {
                        selector: '.category-' + category + '-bgo',
                        rules: ['background-color:' + opacity05]
                    },
                    {
                        selector: '.category-' + category + '-stroke',
                        rules: ['stroke:' + color]
                    },
                    {
                        selector: '.category-' + category + ' .marker .base',
                        rules: ['fill:' + color]
                    },
                    {
                        selector: '.category-' + category + '-bg-ld',
                        rules: ['background-color:' + lightenDesaturate]
                    },
                    {
                        selector: '.category-' + category + '-fill-darken',
                        rules: ['color:' + darken]
                    }
                ];

                _.forEach(categoriesCSS, function(CSS) {
                    styles += CSS.selector + '{' + CSS.rules.join(';') + '} ';
                });
            });
        }

        return styles;
    };
}

module.exports = {
    stylesConfigService: stylesConfigService
};
