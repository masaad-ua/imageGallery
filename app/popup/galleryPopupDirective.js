module.exports = function($q, CreateDb, CreateTransactionDB, GetLastIdDB, AddCommentToDB, GetCommentsFromDB, AddToLocalStorage, AddLikeDislikeToDB){
	return{
		restrict: 'E',
		scope:{
			popupImage: "=popupImage",
			popupActive: "=popupActive",
			amountOfComments: "=amountOfComments",
			listOfImages: "=listOfImages"
		},
		template: require('./views/galleryPopupTemplate.html'),
		link: function(scope){

			function createComments(){
				var dateNow = new Date();
				var objectStore3 = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readonly");
				var promise3 =  GetCommentsFromDB.getComments.call(objectStore3, scope.popupImage.id, dateNow);
				promise3.then(function(result){
					scope.comments = result;
				})
			}
			createComments();

			scope.closePopup = function(){
				scope.popupActive = false;
			};
			scope.form = {
				nickname: "",
				comment: ""
			};
			scope.activeDislike = false;
			scope.activeLike = false;

			scope.submitComment = function(event){
				event.preventDefault();
				if(scope.form.comment){

					var objectStore = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readwrite");
					var promise =  GetLastIdDB.getLastId.call(objectStore);
					promise
						.then(function(lastId){
								var objComment = {
									id: lastId + 1,
									idImage: scope.popupImage.id,
									nickname: "by "+  scope.form.nickname,
									comment: scope.form.comment,
									date: +new Date()
								};

								scope.comments.push({
									nickname: "by "+  scope.form.nickname,
									comment: scope.form.comment,
									day: GetCommentsFromDB.getDay(new Date(), +new Date()),
									time: GetCommentsFromDB.get12HourClock( +new Date())
								});

								scope.amountOfComments[scope.popupImage.id] = scope.comments.length;
								AddToLocalStorage.addingToLocal(scope.amountOfComments);
								var objectStore2 = new CreateTransactionDB.createTransaction(CreateDb.db,"comments","readwrite");
								return AddCommentToDB.addComment.call(objectStore2, objComment);
						},
						function(){
							console.log("Error with definition id");
						})

				}
			};


			scope.addLikeDislike = function(event){
				var amount,
				objectStore4 = new CreateTransactionDB.createTransaction(CreateDb.db, "images", "readwrite");
				if(event.currentTarget.dataset.choose === "like"){
					amount = ++scope.popupImage.like;
					scope.activeLike = true;
					scope.activeDislike = false;
				}
				else {
					amount = ++scope.popupImage.dislike;
					scope.activeLike = false;
					scope.activeDislike = true;

				}
				var promise = AddLikeDislikeToDB.addingLikeDislike.call(objectStore4, scope.popupImage.id, event.target.dataset.choose, amount);
				promise.then(function(obj){
						console.log(obj);
						for(var i = 0; i < scope.listOfImages.length; i++){
							for (var j = 0; j < scope.listOfImages[i].length; j++){
								if(scope.listOfImages[i][j].id === scope.popupImage.id){
									scope.listOfImages[i][j].like = obj.like;
									scope.listOfImages[i][j].dislike = obj.dislike;

								}
							}
						}

				})


			}

		}

	}
};
