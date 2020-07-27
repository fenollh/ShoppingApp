package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var users []User

//User a class
type User struct {
	USERMAIL string `json:"usermail"`
	USERNAME string `json:"username"`
	PASSWORD string `json:"password"`
	NAME     string `json:"name"`
	AGE      string `json:"age"`
	IMAGE    string `json:"image"`
}

//GetAll just for test porpuses
func GetAll(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode(users)
	return
}

//GetWithUsername just for test porpuses
func GetWithUsername(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	user, _ := params["username"]
	// var data = select * from users where username=user
	json.NewEncoder(w).Encode(user)
	return
}

//CreateUser receive the user json object and upload it to the DB
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	// insert into users (usermail, username, name, age, image) values (user.usermail, user.username, user.name, user.age, user.image)
	users = append(users, user)
	json.NewEncoder(w).Encode(users)
	return
}

//Login g
func Login(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	/*
		var expectedPass = select password from users where usermail=user.usermail
		if(expectedPass === user.password){
			json.NewEncoder(w).Encode(true)
		}
	*/
	json.NewEncoder(w).Encode(user)
}

func main() {
	fmt.Printf("Server listening in port 3001")
	router := mux.NewRouter()

	router.HandleFunc("/all", GetAll).Methods("GET")
	router.HandleFunc("/username/{username}", GetWithUsername).Methods("GET")
	router.HandleFunc("/newuser", CreateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
}
