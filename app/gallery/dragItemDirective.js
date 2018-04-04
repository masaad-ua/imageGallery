module.exports = function($q, CreateDb, CreateTransactionDB, GetLastIdDB, AddImageToDB, GetAll, AddToLocalStorage, $rootScope){
	return{
		restrict: 'A',
		scope:{
			list: "=list",
			amountOfComments: "=amountOfComments",
			dragItemStyle: "=dragItemStyle"
		},
		link: function(scope, element, attr){
			var lastId = 0;

			function stopEvent(event){
				event.stopPropagation();
				event.preventDefault();
			}

			element[0].addEventListener("dragenter",stopEvent);
			element[0].addEventListener("dragover",stopEvent);

			element[0].addEventListener("drop", function(event){
				// Подавить событие перетаскивания файла
				event.stopPropagation();
				event.preventDefault();

				var dt = event.dataTransfer;
				if(!dt && !dt.files) { return false ; }

				// Получить список загружаемых файлов
				var files = dt.files;

				var objectStore = new CreateTransactionDB.createTransaction(CreateDb.db,"images","readwrite");
				var promise =  GetLastIdDB.getLastId.call(objectStore);
				promise
					.then(function(id){
						var objectStore2 = new CreateTransactionDB.createTransaction(CreateDb.db,"images","readwrite");

						Object.keys(files).forEach(function(index, element, arr){
							scope.amountOfComments[(id + 1) + ( +index )] = 0
						});
						AddToLocalStorage.addingToLocal(scope.amountOfComments,"amountOfComments");
						return AddImageToDB.addImage.call(objectStore2, files, id);
						},
						function(){
							console.log("Error with definition id");
						})
					.then(function(newId){
						lastId = newId;
						var currentLength = (function(){
							var length = [];
							for(var i = 0; i < scope.list.length; i++){
								length = length.concat(scope.list[i]);
							}
							return length.length;
						})();
						//console.log(currentLength);
						var objectStore = new CreateTransactionDB.createTransaction(CreateDb.db,"images","readwrite");
						return GetAll.getAllItems.call(objectStore, currentLength);
						})
					.then(function(array){
							function pushItem(element){
								scope.list[scope.list.length - 1].push({
									id: element.id,
									blob:  window.URL.createObjectURL(element.blob),
									like: element.like,
									dislike: element.dislike
								});
							}
							array.forEach(function(element, index, arr){
								if(scope.list.length === 0 || scope.list[scope.list.length - 1].length === 9){
									scope.list.push([]);
									pushItem(element);
								}else {
									pushItem(element);
								}
							});
							return scope.list;
						})
					.then(function(newArray){
							var amountOfContainer = 0,
								amountOfItem = newArray[newArray.length - 1].length;
							if(newArray.length > 1){
								amountOfContainer = newArray.length - 1;
								amountOfItem = (amountOfContainer * 9) + newArray[newArray.length - 1].length;
							}

							setTimeout(function(){
								var lastElemFromList = document.querySelector("#item" + amountOfItem),
									widthLastElem = lastElemFromList.offsetWidth,
									offsetTopLastElem = lastElemFromList.offsetTop,
									offsetLeftLastElem = lastElemFromList.offsetLeft + lastElemFromList.offsetParent.offsetLeft;
								scope.dragItemStyle = {
									transform: "translate3d(" + (offsetLeftLastElem + widthLastElem + 10) +"px, " + offsetTopLastElem + "px, 0px)"
								};
								AddToLocalStorage.addingToLocal(scope.dragItemStyle, "dragItemStyle");
								$rootScope.$digest();
							},0);
						});

				return false;
			});



		}
	}
};
