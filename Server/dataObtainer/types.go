package main

//Credentials the data needed for authentication
type Credentials struct {
	SESSIONID string `json:"sessionID"`
	USERMAIL  string `json:"usermail"`
}

//ShopData all the data from a shop is public except for the password
type ShopData struct {
	SHOPNAME    string `json:"name"`
	SHOPMAIL    string `json:"email"`
	MANAGERNAME string `json:"managerName"`
	LOCATION    string `json:"location"`
	SCHEDULE    string `json:"schedule"`
	DETAILS     string `json:"details"`
	STARS       int    `json:"stars"`
	DESCRIPTION string `json:"description"`
	IMAGE       string `json:"image"`
	TAGS        string `json:"tags"`
	CATEGORIES  string `json:"categories"`
	STOCK       string `json:"stock"`
	SHOPTYPE    string `json:"shopType"`
}

//PublicUserData the user data that doesn't need authentication to be accesed
type PublicUserData struct {
	USERNAME    string `json:"username"`
	NAME        string `json:"name"`
	DESCRIPTION string `json:"description"`
	IMAGE       string `json:"image"`
	STARS       int    `json:"stars"`
}

//PrivateUserData the user data that needs authentication to be accesed
type PrivateUserData struct {
	USERMAIL     string `json:"usermail"`
	AGE          int    `json:"age"`
	SHOPPINGLIST string `json:"shoppingList"`
	FAVSHOPSLIST string `json:"favShopsList"`
	ACCOUNTTYPE  string `json:"accountType"`
	USERNAME     string `json:"username"`
	NAME         string `json:"name"`
	DESCRIPTION  string `json:"description"`
	IMAGE        string `json:"image"`
	STARS        int    `json:"stars"`
}
