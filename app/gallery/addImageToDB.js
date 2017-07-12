module.exports = function AddImageToDB(){

	//var that = this;

	this.addImage = function(objectStore, arrayFiles, lastId) {

		//var transaction = db.transaction([nameBase], "readwrite");
		//transaction.oncomplete = function(event) {
		//	console.log("All done!");
		//};
		//transaction.onerror = function(event) {
		//	console.log("ERROR in adding");
		//};
		//var objectStore = transaction.objectStore(nameBase);
		var id = lastId + 1;
		for (var i = 0; i < arrayFiles.length; i++) {
			var request = objectStore.add({
				id: id,
				blob: arrayFiles[i],
				like: 0,
				dislike: 0
			});
			id++;
			console.log(arrayFiles[i]);
			request.onsuccess = function (event){
				console.log("Success !");
			}

		}

	};



};
