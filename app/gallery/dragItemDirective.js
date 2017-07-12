module.exports = function($q, CreateDb, WorkWithDB, AddImageToDB){
	return{
		restrict: 'A',
		scope: true,
		link: function(scope, element, attr){
			var lastIdImages = 0;

			function stopEvent(event){
				event.stopPropagation();
				event.preventDefault();
			}

			element[0].addEventListener("dragenter",stopEvent);
			element[0].addEventListener("dragover",stopEvent);

			element[0].addEventListener("drop", function(event){
				event.stopPropagation();
				event.preventDefault();

				var dt = event.dataTransfer;
				if(!dt && !dt.files) { return false ; }

				// Получить список загружаемых файлов
				var files = dt.files;
				console.log(files);

				//var workWithDB2 = new WorkWithDB.createTransaction(CreateDb.db,"images","readwrite");
				//var promise =  WorkWithDB.getLastId.call(workWithDB2);
				var promise = WorkWithDB.createTransaction(CreateDb.db, "images","readwrite", WorkWithDB.getLastId);

				promise.then(function(arg){
					//console.log(arg);
					//lastIdImages = arg;
					WorkWithDB.createTransaction(CreateDb.db,"images","readwrite", AddImageToDB.addImage, files, arg)
					//var workWithDB = new WorkWithDB.createTransaction(CreateDb.db,"images","readwrite");
					//AddImageToDB.addImage.call(workWithDB, files, arg);

				}, function(arg){
					console.log("Error WTF!");
				});
				//console.log(promise);

				//WorkWithDB.getLastId(WorkWithDB.objectStore);
				//WorkWithDB.createTransaction(CreateDb.db, "images","readwrite");
				//setTimeout(function(){
				//	console.log(WorkWithDB.lastId)
				//},1000);

				//addData.add(CreateDb.db,"images",files[0]);

				//for (var i = 0; i < files.length; i++) {
				//	if (files[i].size < 15000000 ) {
				//
				//		//var reader = new FileReader;
				//		//var file = files[i];
				//		//
				//		//reader.onloadend = function() {
				//		//	console.log('RESULT', reader.result)
				//		//};
				//		////reader.readAsArrayBuffer(file);
				//		////reader.readAsBinaryString(file);
				//		//reader.readAsDataURL(file);
				//
				//	}
				//	else {
				//		alert('Размер файла превышает допустимое значение');
				//	}
				//}
				// Подавить событие перетаскивания файла
				return false;
			});



		}
	}
};
