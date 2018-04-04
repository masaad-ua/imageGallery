'use strict';

module.exports = function GetFromLocalStorage(){

	this.gettingFromLocal = function(key){
	 	return JSON.parse(localStorage.getItem(key));
	}


};
