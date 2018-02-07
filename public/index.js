    var app = angular.module('myAPP',['ui.router']);
    //var URL = "http://localhost:3000/api/";
    var URL = "https://todo-app-angular.herokuapp.com/api/";

    app.config(function($stateProvider) {
        var homeState = {
            name: 'home',
            url: '/home',
            template: '<h3>Welcome to todo app!</h3>'
          }
        var todoState = {
          name: 'todo',
          url: '/todo',
          templateUrl: 'todo.html',
          controller:'todoController'
        }      
        var aboutState = {
          name: 'about',
          url: '/about',
          template: '<h3>Its about app!</h3>'
        }
        
        $stateProvider.state(homeState);
        $stateProvider.state(todoState);
        $stateProvider.state(aboutState);
      });



