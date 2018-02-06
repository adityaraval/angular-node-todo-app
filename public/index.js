    var app = angular.module('myAPP',[]);
    //var URL = "http://localhost:3000/api/todo/";
    var URL = "https://todo-app-angular.herokuapp.com/api/todo/";


    app.controller('todoCtrl',function($scope,$http){
        //$scope.todoList = [{text:"Learn NG",completed:false},{text:"Learn Node",completed:false},{text:"Learn React",completed:false}];

        $scope.addTodo = function(){
            //$scope.todoList.push({text:$scope.todoInput,completed:false});
            var postTodo = JSON.stringify({title:$scope.todoTitle,text:$scope.todoText,completed:false});
            $http.post(URL, postTodo)
            .then(
                function(response){
                    // success callback
                    $scope.todoList.push(response.data.data[0]);
                    $scope.showForm = false;
                    swal("Good job!", "New todo is added to the list!", "success");
                }, 
                function(response){
                    // failure callback
                }
                );   
        }

        $scope.removeTodo = function(todoID){

            $http.delete(URL+todoID).then(function(response) {
                var todoList = $scope.todoList;
                todoList = todoList.filter(item => item._id !== todoID);
                $scope.todoList = todoList;
                swal("Good job!", "You deleted the todo!", "success");
            });
        }

        $scope.editTodo = function(todoID){
            $scope.editableTodo = todoID;
        }

        $scope.updateTodo = function(todoID,title,text,completed){
         var updateTodo = JSON.stringify({title:title,text:text,completed:completed});
         $http.put(URL+todoID, updateTodo)
            .then(
                function(response){
                    // success callback
                    var updatedList = $scope.todoList;
                    var foundIndex = updatedList.findIndex(x => x._id == todoID);
                    console.log(foundIndex);
                    $scope.todoList[foundIndex]= response.data.data[0];
                    //updatedList[foundIndex] = updateTodo;
                    //$scope.todoList = updatedList;
                    $scope.editableTodo = undefined;
                    swal("Good job!", "You just updated a todo!", "success");

                }, 
                function(response){
                    // failure callback
                }
                );   
         
        }

        $scope.stateChanged = function (todoID,completed) {
            if(todoID){ //If it is checked
                var completedTodo = JSON.stringify({completed:completed});
                $http.patch(URL+todoID, completedTodo)
            .then(
                function(response){
                    // success callback
                    if(completed){
                        swal("Good job!", "You maked the todo as complete!", "success");
                    }else{
                        swal("Oh!", "You maked the todo as incomplete!", "error");
                    }
                }, 
                function(response){
                    // failure callback
                }
                ); 
            }
         }

        $http.get(URL).then(function(response) {
                $scope.todoList = response.data.data;
        });

        $scope.displayForm = function(){
            $scope.showForm = true;
            $scope.todoTitle = "";
            $scope.todoText = "";
        }
    });
