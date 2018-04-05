/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var app = angular.module("imageGallery", ["ui.router", "ngSanitize"]);

	//services
	app.service('CreateDb', __webpack_require__(1));
	app.service('DeleteDb', __webpack_require__(2));
	app.service('CreateTransactionDB', __webpack_require__(3));
	app.service('GetLastIdDB', __webpack_require__(4));

	app.service('GetFromLocalStorage', __webpack_require__(5));
	app.service('AddToLocalStorage', __webpack_require__(6));
	app.service('DeleteLocalStorage', __webpack_require__(7));

	// common

	// modules
	__webpack_require__(8)(app);
	__webpack_require__(17)(app);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function CreateDb($q) {

		var that = this;
		that.db = null;
		var images = [];

		that.createDB = function () {
			return $q(function (resolve, reject) {
				console.log("openDb ...");
				var request = indexedDB.open("imageGallery", 1);

				request.onsuccess = function (event) {
					resolve(that.db = request.result);
					console.log("Request was created!");
				};
				request.onerror = function (event) {
					alert("Почему Вы не позволяете моему веб-приложению использовать IndexedDB?!");
					reject("Почему Вы не позволяете моему веб-приложению использовать IndexedDB?!");
				};
				request.onupgradeneeded = function (event) {
					console.log("openDb.onupgradeneeded");
					var thisDB = event.target.result;
					var objectStore = thisDB.createObjectStore("images", { keyPath: "id" });
					var objectStore2 = thisDB.createObjectStore("comments", { keyPath: "id" });
				};
			});
		};
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function DeleteDb() {
		this.deleteDB = function () {
			indexedDB.deleteDatabase("imageGallery");
			console.log("db was deleted");
		};
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function CreateTransactionDB() {

		this.createTransaction = function (db, nameOfStore, levelEditing) {
			this.objectStore = db.transaction([nameOfStore], levelEditing).objectStore(nameOfStore);
			this.objectStore.oncomplete = function (event) {
				console.log("Operation with " + nameOfStore + " is successfully");
			};
			this.objectStore.onerror = function (eent) {
				console.log("Error! with editing " + nameOfStore);
			};
		};
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function GetLastIdDB($q) {
		var that = this;
		that.arrayOfKeys = [];

		this.getLastId = function () {
			var vm = this;
			return $q(function (resolve, reject) {
				vm.objectStore.openCursor().onsuccess = function (event) {
					var cursor = event.target.result;
					if (cursor) {
						that.arrayOfKeys.push(cursor.key);
						cursor["continue"]();
					} else {
						if (that.arrayOfKeys.length >= 0) {
							//console.log(that.arrayOfKeys.length);
							resolve(that.arrayOfKeys.length);
							that.arrayOfKeys = [];
						} else {
							reject("Error in getLastId");
						}
					}
				};
			});
		};
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function GetFromLocalStorage() {
		this.gettingFromLocal = function (key) {
			return JSON.parse(localStorage.getItem(key));
		};
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function AddToLocalStorage() {

		this.addingToLocal = function (obj, key) {
			var serialObj = JSON.stringify(obj);
			localStorage.setItem(key, serialObj);
		};
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function DeleteLocalStorage() {
		this.deletingFromLocalStorage = function (key) {
			localStorage.removeItem(key);
		};
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (app) {

		app.service('GetImagesFromDB', __webpack_require__(9));
		app.service('GetAll', __webpack_require__(10));
		app.service('AddImageToDB', __webpack_require__(11));

		app.directive('gallery', __webpack_require__(12));
		app.directive('galleryImages', __webpack_require__(14));
		app.directive('dragItem', __webpack_require__(16));
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function GetImagesFromDB($q) {

		this.getImagesFrom = function () {
			var listOfImages = [];
			var vm = this;
			return $q(function (resolve, reject) {

				vm.objectStore.openCursor().onsuccess = function (event) {
					var cursor = event.target.result;
					if (cursor) {
						var pushItem = function pushItem() {
							listOfImages[listOfImages.length - 1].push({
								id: cursor.value.id,
								blob: window.URL.createObjectURL(cursor.value.blob),
								like: cursor.value.like,
								dislike: cursor.value.dislike
							});
						};

						if (listOfImages.length === 0 || listOfImages[listOfImages.length - 1].length === 9) {
							listOfImages.push([]);
							pushItem();
						} else {
							pushItem();
						}

						cursor["continue"]();
					} else {
						//console.log(listOfImages);
						resolve(listOfImages);
					}
				};
			});
		};
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function GetAll($q) {

		this.getAllItems = function (oldLengthOfImagesArr) {
			var vm = this;
			return $q(function (resolve, reject) {
				var request = vm.objectStore.getAll();
				request.onerror = function (event) {
					// Handle errors!
				};
				request.onsuccess = function (event) {
					resolve(event.target.result.slice(oldLengthOfImagesArr));
				};
			});
		};
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function AddImageToDB($q) {

		this.addImage = function (arrayFiles, lastId) {
			var vm = this;
			return $q(function (resolve, reject) {
				var id = lastId + 1;
				for (var i = 0; i < arrayFiles.length; i++) {
					var request = vm.objectStore.add({
						id: id,
						blob: arrayFiles[i],
						like: 0,
						dislike: 0
					});
					id++;
					request.onsuccess = function (event) {
						resolve(id - 1);
						console.log("Success ! in added");
					};
				}
			});
		};
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function () {
		return {
			restrict: 'E',
			scope: {},
			template: __webpack_require__(13),
			bindToController: true,
			controller: function controller() {
				this.title = "WELCOME TO VISEVEN <span class='another-colour'>IMAGESTOCK</span>";

				this.popupImage = null;
				this.amountOfComments = {};
				this.listOfImages = [];

				this.popupActive = false;
				this.openPopup = function (obj) {
					this.popupActive = true;
					this.popupImage = obj;
				};
			},
			controllerAs: "gall"

		};
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = "<h1 class=\"title-h1\"  ng-bind-html=\"gall.title\"></h1>\r\n<gallery-images class=\"gallery-wrapper\" open-popup=\"gall.openPopup(obj)\" amount-of-comments=\"gall.amountOfComments\" list-of-images=\"listOfImages\"></gallery-images>\r\n<gallery-popup class=\"popup-container\" ng-if=\"gall.popupActive\" popup-image=\"gall.popupImage\" popup-active=\"gall.popupActive\" amount-of-comments=\"gall.amountOfComments\" list-of-images=\"listOfImages\"></gallery-popup>\r\n\r\n\r\n";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (CreateDb, DeleteDb, CreateTransactionDB, GetImagesFromDB, GetCommentsFromDB, GetFromLocalStorage, DeleteLocalStorage) {
		return {
			restrict: 'E',
			scope: {
				openPopup: "&",
				amountOfComments: "=amountOfComments",
				listOfImages: "=listOfImages"
			},
			template: __webpack_require__(15),

			link: function link(scope, element, attr) {

				scope.dragItemStyle = GetFromLocalStorage.gettingFromLocal("dragItemStyle");
				scope.amountOfComments = GetFromLocalStorage.gettingFromLocal("amountOfComments") || {};

				scope.addWidth = {};
				scope.amountOfList = function (index) {
					scope.counttlist = index;
				};
				var indexList = 0;

				scope.changeWidth = function (fifthItem) {
					if (fifthItem === 4) {
						scope.addWidth[scope.counttlist] = true;
					} else if (fifthItem === 0) {
						scope.addWidth[indexList] = false;
						indexList = scope.counttlist;
					}
				};

				scope.getAmountOfComments = function (idImage) {
					var objectStore2 = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readonly");
					GetCommentsFromDB.getComments.call(objectStore2, idImage, new Date());

					var promise2 = GetCommentsFromDB.getComments.call(objectStore2, idImage, new Date());
					promise2.then(function (arr) {});
				};

				var promise = CreateDb.createDB();
				promise.then(function (db) {
					var objectStore = new CreateTransactionDB.createTransaction(db, "images", "readonly");
					return GetImagesFromDB.getImagesFrom.call(objectStore);
				}, function (arg) {
					//console.log(arg);
				}).then(function (arq) {
					scope.listOfImages = arq;
					setTimeout(function () {
						element[0].scrollLeft = element[0].scrollWidth - element[0].clientWidth;
					}, 0);
				});
				//window.addEventListener("unload", function(e){
				//	DeleteDb.deleteDB();
				//	GetFromLocalStorage.gettingFromLocal("dragItemStyle") && DeleteLocalStorage.deletingFromLocalStorage("dragItemStyle");
				//	GetFromLocalStorage.gettingFromLocal("amountOfComments") && DeleteLocalStorage.deletingFromLocalStorage("amountOfComments");
				//});
			}
		};
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"gallery flexible row\">\r\n\r\n\r\n\t<div ng-repeat=\"list in listOfImages\" class=\"items-container\" ng-class=\"{'add-width' : addWidth[$index]}\" ng-init=\"amountOfList($index)\">\r\n\r\n\t\t<div ng-repeat=\"item in list\" class=\"item square\" ng-click=\"openPopup({obj:{id: item.id, blob: item.blob, like: item.like, dislike: item.dislike}})\" id=\"item{{item.id}}\" ng-init=\"changeWidth($index)\" >\r\n\t\t\t<img ng-src=\"{{item.blob}}\"  alt=\"\" class=\"square\" >\r\n\t\t\t<div class=\"info-panel-container flexible row\">\r\n\t\t\t\t<div class=\"info-comments info\">\r\n\t\t\t\t\t<p class=\"info-text\" ng-bind=\"amountOfComments[item.id]\"></p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info-dislike info\">\r\n\t\t\t\t\t<p class=\"info-text\" ng-bind=\"item.dislike\"></p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info-like info\">\r\n\t\t\t\t\t<p class=\"info-text\" ng-bind=\"item.like\"></p>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\r\n\t<div  class=\"placeholder\" drag-item list=\"listOfImages\" amount-of-comments=\"amountOfComments\" ng-style=\"dragItemStyle\" drag-item-style=\"dragItemStyle\">\r\n\t\t<div class=\"plus\"></div>\r\n\t\t<p>Drop your<br/>picture here</p>\r\n\t\t<!--<p>Add your<br/>Picture</p>-->\r\n\t</div>\r\n</div>\r\n\r\n\r\n\r\n";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function ($q, CreateDb, CreateTransactionDB, GetLastIdDB, AddImageToDB, GetAll, AddToLocalStorage, $rootScope) {
		return {
			restrict: 'A',
			scope: {
				list: "=list",
				amountOfComments: "=amountOfComments",
				dragItemStyle: "=dragItemStyle"
			},
			link: function link(scope, element, attr) {
				var lastId = 0;

				function stopEvent(event) {
					event.stopPropagation();
					event.preventDefault();
				}

				element[0].addEventListener("dragenter", stopEvent);
				element[0].addEventListener("dragover", stopEvent);

				element[0].addEventListener("drop", function (event) {
					// Подавить событие перетаскивания файла
					event.stopPropagation();
					event.preventDefault();

					var dt = event.dataTransfer;
					if (!dt && !dt.files) {
						return false;
					}

					// Получить список загружаемых файлов
					var files = dt.files;

					var objectStore = new CreateTransactionDB.createTransaction(CreateDb.db, "images", "readwrite");
					var promise = GetLastIdDB.getLastId.call(objectStore);
					promise.then(function (id) {
						var objectStore2 = new CreateTransactionDB.createTransaction(CreateDb.db, "images", "readwrite");

						Object.keys(files).forEach(function (index, element, arr) {
							scope.amountOfComments[id + 1 + +index] = 0;
						});
						AddToLocalStorage.addingToLocal(scope.amountOfComments, "amountOfComments");
						return AddImageToDB.addImage.call(objectStore2, files, id);
					}, function () {
						console.log("Error with definition id");
					}).then(function (newId) {
						lastId = newId;
						var currentLength = (function () {
							var length = [];
							for (var i = 0; i < scope.list.length; i++) {
								length = length.concat(scope.list[i]);
							}
							return length.length;
						})();
						//console.log(currentLength);
						var objectStore = new CreateTransactionDB.createTransaction(CreateDb.db, "images", "readwrite");
						return GetAll.getAllItems.call(objectStore, currentLength);
					}).then(function (array) {
						function pushItem(element) {
							scope.list[scope.list.length - 1].push({
								id: element.id,
								blob: window.URL.createObjectURL(element.blob),
								like: element.like,
								dislike: element.dislike
							});
						}
						array.forEach(function (element, index, arr) {
							if (scope.list.length === 0 || scope.list[scope.list.length - 1].length === 9) {
								scope.list.push([]);
								pushItem(element);
							} else {
								pushItem(element);
							}
						});
						return scope.list;
					}).then(function (newArray) {
						var amountOfContainer = 0,
						    amountOfItem = newArray[newArray.length - 1].length;
						if (newArray.length > 1) {
							amountOfContainer = newArray.length - 1;
							amountOfItem = amountOfContainer * 9 + newArray[newArray.length - 1].length;
						}

						setTimeout(function () {
							var lastElemFromList = document.querySelector("#item" + amountOfItem),
							    widthLastElem = lastElemFromList.offsetWidth,
							    offsetTopLastElem = lastElemFromList.offsetTop,
							    offsetLeftLastElem = lastElemFromList.offsetLeft + lastElemFromList.offsetParent.offsetLeft;
							scope.dragItemStyle = {
								transform: "translate3d(" + (offsetLeftLastElem + widthLastElem + 10) + "px, " + offsetTopLastElem + "px, 0px)"
							};
							AddToLocalStorage.addingToLocal(scope.dragItemStyle, "dragItemStyle");
							$rootScope.$digest();
						}, 0);
					});

					return false;
				});
			}
		};
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (app) {

		app.service('AddCommentToDB', __webpack_require__(18));
		app.service('GetCommentsFromDB', __webpack_require__(19));
		app.service('AddLikeDislikeToDB', __webpack_require__(20));

		app.directive('galleryPopup', __webpack_require__(21));
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function AddCommentToDB($q) {

		this.addComment = function (obj) {
			var vm = this;
			return $q(function (resolve, reject) {

				var request = vm.objectStore.add(obj);
				request.onsuccess = function (event) {
					resolve(obj);
					console.log("Success! in added comment");
				};
			});
		};
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function GetCommentsFromDB($q) {
		var that = this;
		this.getDay = function (dateNow, dateDB) {

			var dateOld = new Date(dateDB),
			    dayNow = dateNow.getDate(),
			    dayOld = dateOld.getDate(),
			    result;

			switch (true) {
				case dayNow === dayOld:
					result = "Today";
					break;
				case dayNow - dayOld === 1:
					result = "Yesterday";
					break;
				case dayNow - dayOld > 1:
					result = dayNow - dayOld + " days ago";
					break;
			}
			return result;
		};

		this.get12HourClock = function (dateDB) {
			var dateOld = new Date(dateDB),
			    hour = dateOld.getHours(),
			    minutes = dateOld.getMinutes(),
			    result;
			if (hour < 13) {
				result = hour + ":" + (minutes > 10 ? minutes : "0" + minutes) + " AM";
			} else {
				result = hour - 12 + ":" + (minutes > 10 ? minutes : "0" + minutes) + " PM";
			}
			return result;
		};

		this.getComments = function (idImage, dateNow) {
			var listOfComments = [];
			var vm = this;
			return $q(function (resolve, reject) {
				vm.objectStore.openCursor().onsuccess = function (event) {
					var cursor = event.target.result;
					if (cursor) {
						if (cursor.value.idImage === idImage) {
							listOfComments.push({
								nickname: cursor.value.nickname,
								comment: cursor.value.comment,
								day: that.getDay(dateNow, cursor.value.date),
								time: that.get12HourClock(cursor.value.date)
							});
						}
						cursor["continue"]();
					} else {
						console.log(listOfComments);
						resolve(listOfComments);
					}
				};
			});
		};
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function AddLikeDislikeToDB($q) {

		this.addingLikeDislike = function (idImage, choose, amount) {
			var vm = this;
			return $q(function (resolve, reject) {

				var getRequest = vm.objectStore.get(idImage);
				getRequest.onsuccess = function () {
					var obj = getRequest.result;
					choose === "like" ? obj.like = amount : obj.dislike = amount;
					var putRequest = vm.objectStore.put(obj);
					putRequest.onsuccess = function () {

						resolve(obj);
					};
				};
			});
		};
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function ($q, CreateDb, CreateTransactionDB, GetLastIdDB, AddCommentToDB, GetCommentsFromDB, AddToLocalStorage, AddLikeDislikeToDB) {
		return {
			restrict: 'E',
			scope: {
				popupImage: "=popupImage",
				popupActive: "=popupActive",
				amountOfComments: "=amountOfComments",
				listOfImages: "=listOfImages"
			},
			template: __webpack_require__(22),
			link: function link(scope) {

				function createComments() {
					var dateNow = new Date();
					var objectStore3 = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readonly");
					var promise3 = GetCommentsFromDB.getComments.call(objectStore3, scope.popupImage.id, dateNow);
					promise3.then(function (result) {
						scope.comments = result;
					});
				}
				createComments();

				scope.closePopup = function () {
					scope.popupActive = false;
				};
				scope.form = {
					nickname: "",
					comment: ""
				};
				scope.activeDislike = false;
				scope.activeLike = false;

				scope.submitComment = function (event) {
					event.preventDefault();
					if (scope.form.comment) {

						var objectStore = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readwrite");
						var promise = GetLastIdDB.getLastId.call(objectStore);
						promise.then(function (lastId) {
							var objComment = {
								id: lastId + 1,
								idImage: scope.popupImage.id,
								nickname: "by " + scope.form.nickname,
								comment: scope.form.comment,
								date: +new Date()
							};

							scope.comments.push({
								nickname: "by " + scope.form.nickname,
								comment: scope.form.comment,
								day: GetCommentsFromDB.getDay(new Date(), +new Date()),
								time: GetCommentsFromDB.get12HourClock(+new Date())
							});

							scope.amountOfComments[scope.popupImage.id] = scope.comments.length;
							AddToLocalStorage.addingToLocal(scope.amountOfComments, "amountOfComments");
							var objectStore2 = new CreateTransactionDB.createTransaction(CreateDb.db, "comments", "readwrite");
							return AddCommentToDB.addComment.call(objectStore2, objComment);
						}, function () {
							console.log("Error with definition id");
						});
					}
				};

				scope.addLikeDislike = function (event) {
					var amount,
					    objectStore4 = new CreateTransactionDB.createTransaction(CreateDb.db, "images", "readwrite");
					if (event.currentTarget.dataset.choose === "like") {
						amount = ++scope.popupImage.like;
						scope.activeLike = true;
						scope.activeDislike = false;
					} else {
						amount = ++scope.popupImage.dislike;
						scope.activeLike = false;
						scope.activeDislike = true;
					}
					var promise = AddLikeDislikeToDB.addingLikeDislike.call(objectStore4, scope.popupImage.id, event.target.dataset.choose, amount);
					promise.then(function (obj) {
						console.log(obj);
						for (var i = 0; i < scope.listOfImages.length; i++) {
							for (var j = 0; j < scope.listOfImages[i].length; j++) {
								if (scope.listOfImages[i][j].id === scope.popupImage.id) {
									scope.listOfImages[i][j].like = obj.like;
									scope.listOfImages[i][j].dislike = obj.dislike;
								}
							}
						}
					});
				};
			}

		};
	};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"popup-wrapper flexible row space-between\">\r\n\t<div class=\"full-width-image-wrapper\">\r\n\t\t<img ng-src=\"{{popupImage.blob}}\" alt=\"\">\r\n\t\t<div class=\"info-panel-container second flexible row\">\r\n\t\t\t<div class=\"info-dislike edit\" ng-click=\"addLikeDislike($event)\" data-choose=\"dislike\" ng-class=\"{active: activeDislike}\">\r\n\t\t\t\t<p class=\"info-text\" ng-bind=\"popupImage.dislike\"></p>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"info-like edit\" ng-click=\"addLikeDislike($event)\" data-choose=\"like\" ng-class=\"{active: activeLike}\">\r\n\t\t\t\t<p class=\"info-text\" ng-bind=\"popupImage.like\"></p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"comments-container\">\r\n\t\t<p class=\"comments-amount\">Comments: <span ng-bind=\"amountOfComments[popupImage.id]\"></span></p>\r\n\t\t<div class=\"comments-wrapper\">\r\n\r\n\t\t\t<div class=\"comment-container\" ng-repeat=\"comm in comments\">\r\n\t\t\t\t<div class=\"comment-info flexible row space-between\">\r\n\t\t\t\t\t<p class=\"\" ng-bind=\"comm.nickname\"></p>\r\n\t\t\t\t\t<p class=\"\" ng-bind=\"comm.day +' ' + comm.time\"></p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<p class=\"comment\" ng-bind=\"comm.comment\"></p>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<form action=\"\" name=\"form-comment\" class=\"form-container\" ng-submit=\"submitComment($event)\">\r\n\t\t\t<input type=\"text\" name=\"nickName\" placeholder=\"Type your nickname here...\" class=\"nick-name\" maxlength=\"20\" ng-model=\"form.nickname\">\r\n\t\t\t<div class=\"textarea-wrapper\">\r\n\t\t\t\t<textarea type=\"text\" placeholder=\"Write your comment here...\" class=\"textarea\" rows=\"25\" cols=\"5\" ng-model=\"form.comment\"></textarea>\r\n\t\t\t\t<input type=\"image\" name=\"submit\" class=\"submit\" value=\"\" >\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n\r\n\r\n\t<div class=\"close-button\" ng-click=\"closePopup()\"></div>\r\n</div>";

/***/ })
/******/ ]);