module.exports = function GetCommentsFromDB($q){
	var that = this;
	this.getDay = function(dateNow, dateDB){

		var dateOld = new Date(dateDB),
			dayNow = dateNow.getDate(),
			dayOld = dateOld.getDate(),
			result;

		switch(true){
			case dayNow === dayOld:
				result = "Today";
				break;
			case (dayNow - dayOld) === 1:
				result = "Yesterday";
				break;
			case (dayNow - dayOld) > 1 :
				result = dayNow - dayOld + " days ago";
				break;
		}
		return result;
	};

	this.get12HourClock = function(dateDB){
		var dateOld = new Date(dateDB),
			hour = dateOld.getHours(),
			minutes = dateOld.getMinutes(),
			result;
		if(hour < 13){
			result = hour + ":" + ((minutes > 10) ?minutes : "0" + minutes) + " AM";
		}
		else{
			result = (hour - 12) + ":" + ((minutes > 10) ?minutes : "0" + minutes) + " PM";
		}
		return result;
	};

	this.getComments = function(idImage, dateNow) {
		var listOfComments = [];
		var vm = this;
		return $q(function(resolve, reject) {
			vm.objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if(cursor.value.idImage === idImage) {
						listOfComments.push({
							nickname: cursor.value.nickname,
							comment: cursor.value.comment,
							day: that.getDay(dateNow, cursor.value.date),
							time: that.get12HourClock(cursor.value.date)
						});
					}
					cursor.continue();
				}
				else {
					console.log(listOfComments);
					resolve(listOfComments);
				}
			};
		});

	};
};



