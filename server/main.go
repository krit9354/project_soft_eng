package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type pocket struct {
	Pocket_name string `json:"pocket_name"`
	Money       int    `json:"money"`
	Have_target bool   `json:"have_target"`
	Target      int    `json:"target"`
}

var pockets = []pocket{
	{Pocket_name: "food", Money: 2000, Have_target: false, Target: 0},
	{Pocket_name: "saving", Money: 3000, Have_target: true, Target: 5000},
	{Pocket_name: "car", Money: 10000, Have_target: true, Target: 20000},
	{Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0},
	{Pocket_name: "snack", Money: 100, Have_target: false, Target: 0},
	{Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0},
	{Pocket_name: "snack", Money: 100, Have_target: false, Target: 0},
}

func getPockets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, pockets)
}

func main() {
	router := gin.Default()
	router.GET("/albums", getPockets)
	router.Run("localhost:8080")
}
