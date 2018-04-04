module.exports = function GetImagesFromDB($q){

	this.getImagesFrom = function() {
		var listOfImages = [];
		var vm = this;
		return $q(function(resolve, reject) {

			vm.objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					function pushItem(){
						listOfImages[listOfImages.length - 1].push({
							id: cursor.value.id,
							blob:  window.URL.createObjectURL(cursor.value.blob),
							like: cursor.value.like,
							dislike: cursor.value.dislike
						});
					}

					if(listOfImages.length === 0 || listOfImages[listOfImages.length - 1].length === 9){
						listOfImages.push([]);
						pushItem();
					}else {
						pushItem();
					}

					cursor.continue();
				}
				else {
					//console.log(listOfImages);
					resolve(listOfImages);
				}
			};
		});

	};
};


