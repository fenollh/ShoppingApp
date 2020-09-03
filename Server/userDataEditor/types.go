package main

// UserDataEdition where the data about the edition is stores
type UserDataEdition struct {
	COLUMN    string `json:"column"`
	PAYLOAD   string `json:"payload"`
	SESSIONID string `json:"sessionID"`
	USERMAIL  string `json:"usermail"`
}

//Credentials the data needed for authentication
type Credentials struct {
}
