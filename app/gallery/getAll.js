module.exports = function GetAll($q){

	this.getAllItems = function(oldLengthOfImagesArr) {
		var vm = this;
		return $q(function(resolve, reject){
			var request = vm.objectStore.getAll();
			request.onerror = function(event) {
				// Handle errors!
			};
			request.onsuccess = function(event) {
				resolve(event.target.result.slice(oldLengthOfImagesArr))
			};
		});

	};

};

