//Filename : vehicle.js
//Crator : Bergmann Florian
//Last update : 04.06.2019

"use strict";
//Class for all vehicles
var Vehicle = function(){
	//properties for the vehicle
    var _this = this;
    this.e = {};
	var typeLs = ["car", "bike", "truck"];
	this.hightPriority = 1;
	this.mediumPriority = 2;
	this.lowPriority = 3;
	
	//method to build a vehicle
	this.buildVehicle = function(speed, number, road, maxRoad, contentVehicles){
		//set properties of vehicle
		_this.type = typeLs[getRandomInt(0, typeLs.length - 1)];
		_this.colorR = getRandomInt(0, 255);
		_this.colorG = getRandomInt(0, 255);
		_this.colorB = getRandomInt(0, 255);
		_this.speed = speed;
		_this.road = road;
		_this.number = number;
		_this.maxRoad = maxRoad;
		
		//select an target
		do{
			_this.target = getRandomInt(1, _this.maxRoad);
		}while(_this.target == _this.road);
		//define level of priority
		if(_this.road == 1 && _this.target == _this.maxRoad){
			_this.priority = _this.hightPriority;
			if(_this.maxRoad == 3)_this.priority = _this.mediumPriority;
		}else if(_this.road == _this.maxRoad && _this.target == 1){
			_this.priority = _this.lowPriority;
			if(_this.maxRoad == 3)_this.priority = _this.mediumPriority;
		}else if(_this.target == _this.road - 1){
			_this.priority = _this.hightPriority;
		}else if(_this.target == _this.road + 1){
			_this.priority = _this.lowPriority;
		}else{
			_this.priority = _this.mediumPriority;
		}
		//build vehicle
		_this.e.imgVehicle = buildElement("img", "vehicle "+_this.type, contentVehicles);
		_this.e.imgVehicle.style.backgroundColor = "rgb("+_this.colorR+","+_this.colorG+","+_this.colorB+")";
		_this.e.imgVehicle.src = "./asset/vehicles/"+_this.type+".png";
		_this.e.imgVehicle.id = "vehicle" + _this.number;
	}
	
	//method to place vehicle
	this.placeVehicle = function(positionX, positionY, degree){
		//_this.e.imgVehicle.style.transition = 'left 0.5s linear, top 0.5s linear';
		_this.e.imgVehicle.style.left = positionX;
		_this.e.imgVehicle.style.top = positionY;
		_this.e.imgVehicle.style.transform = "rotate("+degree+"deg)";
	}
	//method to path for vehicle
	this.getNextZones = function(){
		var nextZones = [];
		//by priority, turn left use the turn right, and go forward use the two
		switch(_this.priority){
			//if vehicle go forward
			case _this.mediumPriority:
				//add zone forward the start
				nextZones.push((_this.road*10+1));
				//add zone next the start
				var nextRoad = (_this.road-1);
				if(nextRoad == 0)nextRoad = _this.maxRoad;
				nextZones.push((nextRoad*10+2),(nextRoad*10+3));
				//add zone before the target
				var nextRoad = (_this.target+1);
				if(nextRoad > _this.maxRoad)nextRoad = 1;
				nextZones.push((nextRoad*10+3),(nextRoad*10+1));
				//add zone forward the target
				nextZones.push((_this.target*10+2));
				break;
			//if vehicle turn left
			case _this.lowPriority:
				nextZones.push((_this.road*10+3),(_this.target*10+3));
			//if vehicle turn right
			case _this.hightPriority:
				nextZones.push((_this.road*10+1),(_this.target*10+2));
				break;
		}
		return nextZones;
	}
	//method to get result for this vehicle
	this.textResult = function(crossroadType, inOut){
		var text = "";
		//get name of type of vehicle in french
		if(_this.type == "car")text = "la voiture ";
		if(_this.type == "bike")text = "la moto ";
		if(_this.type == "truck")text = "le camion ";
		//add number of vehicle
		text += _this.number + " ";
		if(crossroadType == "giratory"){
			if(inOut == "in"){
				text += "rentre dans le giratoire"
			}
			if(inOut == "out"){
				text += "sort à la sortie " + _this.target;
			}
		}else{
			//add road of the vehicle
			text += "sur la route " + _this.road + " ";
			//add action
			if(_this.priority == _this.hightPriority)text += "tourne à droite ";
			if(_this.priority == _this.lowPriority)text += "tourne à gauche ";
			if(_this.priority == _this.mediumPriority)text += "va ";
			//add road
			text += "sur la route " + _this.target;
		}
		return text;
	}
}