package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type food struct {
	Money    int    `json:"money"`
	Income   bool   `json:"income"`
	Image    string `json:"image"`
	Have_ima bool   `json:"have_ima"`
	Event    string `json:"event"`
}

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
	{Pocket_name: "แต่งรถ", Money: 3000, Have_target: false, Target: 0, Image: "https://i.pinimg.com/originals/12/5a/80/125a80c3e0ac8fe910173c05476add4b.jpg"},
	{Pocket_name: "ค่าน้ำมัน", Money: 100, Have_target: false, Target: 0, Image: "https://blog.carro.co/wp-content/uploads/2022/08/10-Items-For-Racing-Pickup-1.jpg"},
	{Pocket_name: "food", Money: 2000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "saving", Money: 3000, Have_target: true, Target: 5000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "car", Money: 10000, Have_target: true, Target: 20000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ="},
	{Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ="},
	{Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ="},
	{Pocket_name: "แต่งรถ", Money: 3000, Have_target: false, Target: 0, Image: "https://i.pinimg.com/originals/12/5a/80/125a80c3e0ac8fe910173c05476add4b.jpg"},
	{Pocket_name: "ค่าน้ำมัน", Money: 100, Have_target: false, Target: 0, Image: "https://blog.carro.co/wp-content/uploads/2022/08/10-Items-For-Racing-Pickup-1.jpg"},
}

var foods = []food{
	{Money: -2000, Income: false, Event: "ตีdot", Have_ima: true, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Money: +3000, Income: true, Event: "", Have_ima: true, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Money: +3000, Income: true, Event: "", Have_ima: true, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Money: +3000, Income: true, Event: "แทงบอล", Have_ima: false, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
}

func getPockets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, pockets)
}

func getfood(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, foods)
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/pockets", getPockets)
	router.GET("/foods", getfood)
	router.Run("0.0.0.0:8080")
}
