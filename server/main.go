package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type pocket struct {
	Pocket_name string `json:"pocket_name"`
	Money       int    `json:"money"`
	Have_target bool   `json:"have_target"`
	Target      int    `json:"target"`
	Image       string `json:"image"`
}

var pockets = []pocket{
	{Pocket_name: "food", Money: 2000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "saving", Money: 3000, Have_target: true, Target: 5000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "car", Money: 10000, Have_target: true, Target: 20000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ="},
	{Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ="},
	{Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ="},
}

func getPockets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, pockets)
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/pockets", getPockets)
	router.Run("0.0.0.0:8080")
}
