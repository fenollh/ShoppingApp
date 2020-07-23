package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var users []string

func GetAll(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode(users)
	return
}
func GetWithID(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	index, _ := strconv.Atoi(params["id"])
	json.NewEncoder(w).Encode(users[index])
	return
}
func main() {
	fmt.Printf("Server listening in port 3000")
	router := mux.NewRouter()
	users = append(users, "user0", "user1", "user2", "user3", "user4")

	router.HandleFunc("/all", GetAll).Methods("GET")
	router.HandleFunc("/{id}", GetWithID).Methods("GET")

	log.Fatal(http.ListenAndServe(":3000", router))
}
