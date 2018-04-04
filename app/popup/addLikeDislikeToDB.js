module.exports = function AddLikeDislikeToDB($q){

	this.addingLikeDislike = function(idImage, choose, amount ){
		var vm = this;
		return $q(function(resolve, reject) {

			var getRequest = vm.objectStore.get(idImage);
			getRequest.onsuccess = function(){
				var obj = getRequest.result;
				choose === "like" ? obj.like = amount : obj.dislike = amount;
				var putRequest = vm.objectStore.put(obj);
				putRequest.onsuccess = function(){

					resolve(obj);
				}
			};

		});


	};




};



