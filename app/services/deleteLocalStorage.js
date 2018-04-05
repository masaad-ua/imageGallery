'use strict';

module.exports = function DeleteLocalStorage(){
	this.deletingFromLocalStorage = function(key){
		localStorage.removeItem(key);
	}
};