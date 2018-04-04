'use strict';

module.exports = function CreateTransactionDB(){

	this.createTransaction = function(db, nameOfStore, levelEditing){
		this.objectStore = db.transaction([nameOfStore], levelEditing).objectStore(nameOfStore);
		this.objectStore.oncomplete = function(event) {
			console.log("Operation with " + nameOfStore + " is successfully");
		};
		this.objectStore.onerror = function(eent) {
			console.log("Error! with editing " + nameOfStore);
		};
	};

};


