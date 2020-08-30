package main

// UserDataEdition where the data about the edition is stores
type UserDataEdition struct {
	COLUMN  string `json:"column"`
	PAYLOAD string `json:"payload"`
}

//Credentials the data needed for authentication
type Credentials struct {
	SESSIONID string `json:"sessionID"`
	USERMAIL  string `json:"usermail"`
}
