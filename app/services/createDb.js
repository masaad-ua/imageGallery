'use strict';

module.exports = function CreateDb($q){

	var that = this;
	that.db = null;
	var images =[];

	that.createDB = function (){
		return $q(function(resolve, reject) {
			console.log("openDb ...");
			var request = indexedDB.open("imageGallery", 1);

			request.onsuccess = function(event) {
				resolve(that.db = request.result);
				//db = event.target.result;
				console.log("Request was created!");
			};
			request.onerror = function(event) {
				alert("Почему Вы не позволяете моему веб-приложению использовать IndexedDB?!");
				reject("Почему Вы не позволяете моему веб-приложению использовать IndexedDB?!");

			};
			request.onupgradeneeded = function(event) {
				console.log("openDb.onupgradeneeded");
				var thisDB = event.target.result;
				var objectStore = thisDB.createObjectStore("images", { keyPath: "id" });
				var objectStore2 = thisDB.createObjectStore("comments", { keyPath: "id" });
			};

		});

		}



};
