/*! Mao by Adam Timberlake created on 2013-09-01 */
!function(a){"use strict";a.mao=angular.module("maoApp",[])}(window),function(a){"use strict";a.controller("CategoriesController",["$scope","$http",function(a,b){a.categories=[];var c=b({method:"GET",url:"/Magento-on-Angular/api/public/categories"});c.success(function(b){a.categories=b})}])}(window.mao),function(a){"use strict";a.controller("ProductsController",["$scope","$http",function(a,b){a.products=[];var c=b({method:"GET",url:"/Magento-on-Angular/api/public/products"});c.success(function(b){a.products=b})}])}(window.mao);