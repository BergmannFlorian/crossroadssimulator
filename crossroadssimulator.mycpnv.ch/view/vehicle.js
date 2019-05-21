//Filename : index.html
//Crator : Bergmann Florian
//Last update : 17.05.2019

"use strict";

var Vehicle = function(){
    var _this = this;
    this.e = {};
	var typeLs = ["car", "bike", "truck"];
	
	//method to build a vehicle
	this.buildVehicle = function(speed, number, road, maxRoad, positionX, positionY, degree){
		//set parameters of vehicle
		_this.type = typeLs[getRandomInt(0, typeLs.length - 1)];
		_this.colorR = getRandomInt(0, 255);
		_this.colorG = getRandomInt(0, 255);
		_this.colorB = getRandomInt(0, 255);
		_this.speed = speed;
		_this.number = number;
		_this.Target = getRandomInt(1, maxRoad);
		
		//draw vehicle
		_this.e.divSimulation = document.getElementById("contentSimulation");
		_this.e.imgVehicle = buildElement("img", "vehicle "+_this.type, _this.e.divSimulation);
		
		_this.e.imgVehicle.style.backgroundColor = "rgb("+_this.colorR+","+_this.colorG+","+_this.colorB+")";
		_this.e.imgVehicle.src = "/asset/vehicles/"+_this.type+".png";
		
		_this.placeVehicle(positionX, positionY, degree);
	}
	
	//method to place vehicle
	this.placeVehicle = function(positionX, positionY, degree){
		_this.e.imgVehicle.style.left = positionX;
		_this.e.imgVehicle.style.top = positionY;
		_this.e.imgVehicle.style.transform = "rotate("+degree+"deg)";
	}
}