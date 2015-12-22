angular
    .module('anunturiApp', ['ui.router'])
    .config(appConfig);

function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/anunturi',
        templateUrl: 'views/home.html',
        controller: 'anunturiController'
    });
    $urlRouterProvider.otherwise('/anunturi');
}
