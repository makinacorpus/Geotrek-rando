var utils = require('./test_utils.js');

utils.setUp();


casper.test.begin('Treks can be filtered by duration', function(test) {

    var home_url = casper.cli.options['url-base'] + '/fr/';

    casper.start(home_url, function () {
        test.assertSelectorHasText('#tab-results span.badge', 3,
                                   'Test catalog has 3 treks');
    });

    casper.then(function () {
        utils.assertFilterResults(test, 'duration', 0, 0, [2849]);
    });

    casper.then(function () {
        utils.assertFilterResults(test, 'duration', 1, 1, [2]);
    });

    casper.then(function () {
        utils.assertFilterResults(test, 'duration', 2, 2, [2851]);
    });

    casper.then(function () {
        utils.assertFilterResults(test, 'duration', 0, 2, [2849, 2, 2851]);
    });

    casper.then(function () {
        utils.assertFilterResults(test, 'duration', 0, 1, [2849, 2]);
    });

    casper.then(function () {
        utils.assertFilterResults(test, 'duration', 1, 2, [2, 2851]);
    });

    utils.done(test);

});
