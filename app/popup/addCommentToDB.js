module.exports = function AddCommentToDB($q){


	this.addComment = function(obj) {
		var vm = this;
		return $q(function(resolve, reject) {

			var request = vm.objectStore.add(obj);
			request.onsuccess = function(event){
				resolve(obj);
				console.log("Success! in added comment");
			}

		})
	};


};

