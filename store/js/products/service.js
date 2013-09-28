(function($m) {

    "use strict";

    /**
     * @factory $productsService
     * @contributors Adam Timberlake
     */
    $m.factory('$productsService',

        ['$rootScope', '$http', '$request', '$crossfilter',

        function ProductHelper($rootScope, $http, $request, $crossfilter) {

            var $service = {};

            /**
             * @property products
             * @type {Array}
             */
            $service.products = [];

            /**
             * @method hasLoaded
             * @return {Boolean}
             */
            $service.hasLoaded = function hasLoaded() {
                return Boolean($crossfilter.crossfilters.master);
            };

            /**
             * @method sortBy
             * @param property {String}
             * @param ascending {Boolean}
             */
            $service.sortBy = $crossfilter.sortBy;

            /**
             * @method getProducts
             * @return {Array}
             */
            $service.getProducts = function getProducts() {

                if ($crossfilter.crossfilters.master) {
                    return $crossfilter.getContent();
                }

                return $request.getContent('products', function(response) {
                    $service.products = response;
                    $crossfilter.create(response);
                    $rootScope.$broadcast('mao/products/loaded', response);
                });

            };

            /**
             * @method set
             * @param property {Object}
             * @param category {Object}
             * Responsible for filtering by a property on the products.
             * @return {Object}
             */
            $service.set = function set(property, category) {
                $crossfilter.setCategory(category);
                return category;
            };

            /**
             * @property pluck
             * @param value {Number|String|Boolean}
             * @param property {String}
             * Responsible for plucking products from the array whilst ignoring
             * any other filters applied.
             * @return {Object|Array}
             */
            $service.pluck = function pluck(value, property) {
                return $crossfilter.pluck({ property: property || 'id', value: value});
            };

            return $service;

    }]);

})(window.mao);