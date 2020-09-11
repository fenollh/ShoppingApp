package main

//User a class
type User struct {
	USERMAIL string `json:"usermail"`
	USERNAME string `json:"username"`
	PASSWORD string `json:"password"`
	NAME     string `json:"name"`
	AGE      string `json:"age"`
	IMAGE    string `json:"image"`
}

//Shop class
type Shop struct {
	SHOPMAIL string `json:"shopmail"`
	SHOPNAME string `json:"username"`
	PASSWORD string `json:"password"`
	NAME     string `json:"name"`
	SHOPTYPE string `json:"accountType"`
	IMAGE    string `json:"image"`
}

//OutputObject the data that is sent to the client
type OutputObject struct {
	SESSID      int    `json:"sessID"`
	ACCOUNTTYPE string `json:"accountType"`
}
