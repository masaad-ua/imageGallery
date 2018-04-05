'use strict';

module.exports = function GetLastIdDB($q){
	var that = this;
	that.arrayOfKeys =[];

	this.getLastId = function(){
		var vm = this;
		return $q(function(resolve, reject) {
			vm.objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					that.arrayOfKeys.push(cursor.key);
					cursor.continue();
				}
				else {
					if(that.arrayOfKeys.length >= 0){
						//console.log(that.arrayOfKeys.length);
						resolve(that.arrayOfKeys.length);
						that.arrayOfKeys =[];
					}else {
						reject("Error in getLastId")
					}
				}
			};
		});
	}
};
