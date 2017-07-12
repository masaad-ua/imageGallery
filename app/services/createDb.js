'use strict';

module.exports = function CreateDb() {

	var that = this;
	that.db = null;
	var images =[
		{
			id: 1,
			blob: "localhost/1",
			like: 0,
			dislike: 0
		},
		{
			id: 2,
			blob: "localhost/2",
			like: 1,
			dislike: 2
		},
		{
			id: 3,
			blob: "localhost/1",
			like: 0,
			dislike: 0
		},
		{
			id: 4,
			blob: "localhost/2",
			like: 0,
			dislike: 0
		}
	];

	this.createDB = function(){
		console.log("openDb ...");
		var request = indexedDB.open("imageGallery", 1);

		request.onsuccess = function(event) {
			that.db = request.result;
			//db = event.target.result;
		};
		request.onerror = function(event) {
			alert("Почему Вы не позволяете моему веб-приложению использовать IndexedDB?!");
		};
		request.onupgradeneeded = function(event) {
			console.log("openDb.onupgradeneeded");
			var thisDB = event.target.result;
			var objectStore = thisDB.createObjectStore("images", { keyPath: "id" });

			// Create an index to search customers by name. We may have duplicates
			// so we can't use a unique index.
			//objectStore.createIndex("name", "name", { unique: false });

			// Create an index to search customers by email. We want to ensure that
			// no two customers have the same email, so use a unique index.
			//objectStore.createIndex("email", "email", { unique: true });

			// Store values in the newly created objectStore.
			for(var i in images) {
				objectStore.add(images[i]);
			}
		};
		//callBack();

	};



};
