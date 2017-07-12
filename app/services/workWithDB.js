'use strict';

module.exports = function WorkWithDB($q){
	var that = this;
	this.transaction = null;
	this.objectStore =  null;
	this.arrayOfKeys =[];
	this.lastId = 0;

	function asa(objectStore){
		objectStore.openCursor().onsuccess = function(event) {
			that.lastId = that.arrayOfKeys.length;
			console.log(that.lastId);
			var cursor = event.target.result;
			if (cursor) {
				that.arrayOfKeys.push(cursor.key);
				cursor.continue();
			}
			else {
				console.log("No more entries!");
			}
		};
	}


	this.createTransaction = function(db, nameOfTable, levelEditing, callBack, arg1, arg2){
		//
		//return $q(function(resolve, reject) {
		//	that.transaction = db.transaction([nameOfTable], levelEditing);
		//	that.objectStore = that.transaction.objectStore(nameOfTable);
		//	that.transaction.oncomplete = function(event) {
		//		console.log("Operation with " + nameOfTable + " is successfully" );
		//	};
		//	that.transaction.onerror = function(event) {
		//		console.log("Error! with editing " + nameOfTable);
		//	};
		//
		//	if (gettingTransaction) {
		//		resolve(gettingTransaction);
		//	} else {
		//		reject("Error!");
		//	}
		//});


		that.transaction = db.transaction([nameOfTable], levelEditing);
		that.transaction.oncomplete = function(event) {
			console.log("Operation with " + nameOfTable + " is successfully");
		};
		that.transaction.onerror = function(event) {
			console.log("Error! with editing " + nameOfTable);
		};
		that.objectStore = this.transaction.objectStore(nameOfTable);
		if(callBack){
			console.log("callBack - Work!");
			return callBack(that.objectStore, arg1, arg2);
		}
	};


	this.getLastId = function(objectStore){

		return $q(function(resolve, reject) {
			that.objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					that.arrayOfKeys.push(cursor.key);
					cursor.continue();
				}
				else {
					if(that.arrayOfKeys.length){
						console.log(that.arrayOfKeys.length);
						resolve(that.arrayOfKeys.length);
						that.arrayOfKeys =[];
					}else {
						reject(that.lastId)
					}
				}
			};
		});

		//objectStore.openCursor().onsuccess = function(event) {
		//	var cursor = event.target.result;
		//	if (cursor) {
		//		that.arrayOfKeys.push(cursor.key);
		//		cursor.continue();
		//	}
		//	else {
		//		that.lastId = that.arrayOfKeys.length;
		//		console.log(that.lastId);
		//	}
		//};
	}
};

