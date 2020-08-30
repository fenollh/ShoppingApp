package main

import "fmt"

func authenticate(usermail string, sessionID string) bool {
	var expectedSessionID string
	SeSesErr := db.QueryRow("SELECT sessionID FROM sessions WHERE usermail=?", usermail).Scan(&expectedSessionID)
	if SeSesErr != nil {
		fmt.Println(SeSesErr)
		return false
	}
	if sessionID != expectedSessionID {
		return false
	}
	return true
}
