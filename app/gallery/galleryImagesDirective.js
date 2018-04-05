module.exports = function (CreateDb,
                           DeleteDb,
                           CreateTransactionDB,
                           GetImagesFromDB,
                           GetCommentsFromDB,
                           GetFromLocalStorage,
                           DeleteLocalStorage){
	return{
		restrict: 'E',
		scope:{
			openPopup: "&",
			amountOfComments: "=amountOfComments",
			listOfImages: "=listOfImages"
		},
		template: require('./views/galleryImagesTemplate.html'),

		link: function(scope, element, attr){

			scope.dragItemStyle = GetFromLocalStorage.gettingFromLocal("dragItemStyle");
			scope.amountOfComments = GetFromLocalStorage.gettingFromLocal("amountOfComments") || {};


			scope.addWidth = {};
			scope.amountOfList = function(index){
				scope.counttlist = index;
			};
			var indexList = 0;

			scope.changeWidth = function(fifthItem){
				if(fifthItem === 4){
					scope.addWidth[scope.counttlist] = true
				}
				else if(fifthItem === 0){
					scope.addWidth[indexList] = false;
					indexList = scope.counttlist;
				}
			};


			scope.getAmountOfComments = function(idImage){
				var objectStore2 = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readonly");
				GetCommentsFromDB.getComments.call(objectStore2, idImage, new Date);

				var promise2 = GetCommentsFromDB.getComments.call(objectStore2, idImage, new Date);
				promise2.then(
					function(arr){

					}
				)

			};

			var promise = CreateDb.createDB();
			promise.then(function(db){
				var objectStore = new CreateTransactionDB.createTransaction(db, "images", "readonly");
				return GetImagesFromDB.getImagesFrom.call(objectStore);
			},function(arg){
				//console.log(arg);
			}).then(
				function(arq){
					scope.listOfImages = arq;
					setTimeout(function(){
						element[0].scrollLeft = element[0].scrollWidth - element[0].clientWidth;
					},0);

				}
			);
			//window.addEventListener("unload", function(e){
			//	DeleteDb.deleteDB();
			//	GetFromLocalStorage.gettingFromLocal("dragItemStyle") && DeleteLocalStorage.deletingFromLocalStorage("dragItemStyle");
			//	GetFromLocalStorage.gettingFromLocal("amountOfComments") && DeleteLocalStorage.deletingFromLocalStorage("amountOfComments");
			//});
		}
	}
};
