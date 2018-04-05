'use strict';

module.exports = function DeleteDb(){
	this.deleteDB =  function(){
		indexedDB.deleteDatabase("imageGallery");
		console.log("db was deleted");
	};

};