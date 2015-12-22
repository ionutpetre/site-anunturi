angular
    .module('anunturiApp')
    .controller('anunturiController', anunturiController);

anunturiController.$inject = ['$scope', '$state', '$http'];

function anunturiController($scope, $state, $http) {
    $scope.creareCategorie = function(categorie) {
        $http.post("/categorie", categorie)
            .success(function() {
                console.log("Categorie creata!");
                $state.go($state.current, {}, {
                    reload: true
                });
            })
            .error(function() {
                console.log("Categoria nu a fost creata!");
            });
    }
    $scope.creareAnunt = function(anunt) {
        $http.post("/anunt", anunt)
            .success(function() {
                console.log("Anunt creat!");
                $state.go($state.current, {}, {
                    reload: true
                });
            })
            .error(function() {
                console.log("Anuntul nu a fost creat!");
            });
    }
    $scope.afisareCategorii = function() {
        $http.get("/categorii")
            .success(function(data) {
                $scope.categorii = data;
            }).error(function(data, status) {});
    }
    $scope.afisareAnunturi = function() {
        $http.get("/anunturi")
            .success(function(data) {
                $scope.anunturi = data;
            }).error(function(data, status) {});
    }
    $scope.afisareCategorie = function(id) {
        $http.get("/categorie/" + id)
            .success(function(data) {
                $scope.categorie = data;
            }).error(function(data, status) {});
    }
    $scope.afisareAnunt = function(id) {
        $http.get("/anunt/" + id)
            .success(function(data) {
                $scope.anunt = data;
            }).error(function(data, status) {});
    }
    $scope.modificareCategorie = function(id, nume) {
        var categorie = new Object();
        categorie.nume = nume;
        $http.put("/categorie/" + id, categorie)
            .success(function() {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .error(function() {});
    }
    $scope.modificareAnunt = function(id, nume, autor, descriere, categorieId) {
        var anunt = new Object();
        anunt.nume = nume;
        anunt.autor = autor;
        anunt.descriere = descriere;
        //anunt.categorieId = categorieId;
        $http.put("/anunt/" + id, anunt)
            .success(function() {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .error(function() {});
    }
    $scope.stergereCategorie = function(id) {
        $http.delete("/categorie/" + id)
            .success(function() {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .error(function() {})
    }
    $scope.stergereAnunt = function(id) {
        $http.delete("/anunt/" + id)
            .success(function() {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .error(function() {})
    }
}
