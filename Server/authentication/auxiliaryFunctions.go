package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

//HandleSession create a sesID and return it
func HandleSession(usermail string) int {
	rand.Seed(time.Now().UnixNano())
	_, DelErr := db.Query("DELETE FROM sessions WHERE usermail='" + usermail + "';")
	if DelErr != nil {
		fmt.Println(DelErr)
	}
	var newSesID = rand.Intn(100000)
	if newSesID == 0 {
		newSesID = 1
	}
	var data string = "(" + "'" + usermail + "'" + ", " + strconv.Itoa(newSesID) + ");"
	_, InsErr := db.Query("INSERT INTO sessions VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
	}
	return newSesID
}

//CheckUsermail comproves if the username is in use
func CheckUsermail(usertype string, usermail string) bool {
	var insertQuery string
	var deleteQuery string
	if usertype == "shop" {
		insertQuery = "INSERT INTO users (usermail, username, name, age, stars, password) VALUES ('" + usermail + "', 'f', 'f', '1', '1', '1');"
		deleteQuery = "DELETE FROM users WHERE usermail='" + usermail + "';"
	} else {
		insertQuery = "INSERT INTO shops (username, usermail, name, stars, accountType, password) VALUES ('n', '" + usermail + "', 'm', '1', 's', 'p');"
		deleteQuery = "DELETE FROM shops WHERE usermail='" + usermail + "';"
	}
	_, InsErr := db.Query(insertQuery)
	if InsErr != nil {
		fmt.Println(InsErr)
		return false
	}
	_, DeErr := db.Query(deleteQuery)
	if DeErr != nil {
		fmt.Println(DeErr)
		return false
	}
	return true
}
