module.exports = function AddImageToDB($q){

	this.addImage = function(arrayFiles, lastId) {
		var vm = this;
		return $q(function(resolve, reject) {
		var id = lastId + 1;
		for (var i = 0; i < arrayFiles.length; i++) {
			var request = vm.objectStore.add({
				id: id,
				blob: arrayFiles[i],
				like: 0,
				dislike: 0
			});
			id++;
			request.onsuccess = function(event){
				resolve(id - 1);
				console.log("Success ! in added");
				}
			}
		})
	};


};
