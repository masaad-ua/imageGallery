'use strict';

module.exports = function AddToLocalStorage(){

	this.addingToLocal = function(obj, key){
		var serialObj = JSON.stringify(obj);
		localStorage.setItem(key, serialObj);
	}

};
