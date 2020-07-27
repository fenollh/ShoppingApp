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
	USERNAME string `json:"username"`
	PASSWORD string `json:"password"`
}

//GetAll d
func GetAll(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode(users)
	return
}

//GetWithID d
func GetWithUsername(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	user, _ := params["username"]
	// data = select * from users where username=user
	json.NewEncoder(w).Encode(user)
	return
}

//CreateUser receive the userjson object and upload it to the DB
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	users = append(users, user)
	json.NewEncoder(w).Encode(users)
	return
}

func main() {
	fmt.Printf("Server listening in port 3001")
	router := mux.NewRouter()

	router.HandleFunc("/all", GetAll).Methods("GET")
	router.HandleFunc("/username/{id}", GetWithUsername).Methods("GET")
	router.HandleFunc("/new", CreateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
}
