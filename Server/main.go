package main

import (
	"fmt"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)
var users [5]string

func GetAll(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(users)

}
func GetWithID(w http.ResponseWriter, req *http.Request){
}


func main()  {
	fmt.Printf("Server listening in port 3000")
	router := mux.NewRouter()
	users[0] = "user0"
	users[1] = "user1"

	router.HandleFunc("/all", GetAll).Methods("GET")
	router.HandleFunc("/{id}", GetWithID).Methods("GET")

	log.Fatal(http.ListenAndServe(":3000", router))
}