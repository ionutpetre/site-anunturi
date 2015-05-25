var app = angular.module("anunturiApp", [
    "ui.router",
    "anunturiControllers"
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/anunturi");
    $stateProvider
        .state("home", {
            url: "/anunturi",
            templateUrl: "partials/home.html",
            controller: "anunturiController"
        });
});