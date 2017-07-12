module.exports = function (CreateDb, WorkWithDB){
	return{
		restrict: 'E',
		scope:{},
		template: require('./views/galleryImagesTemplate.html'),
		link: function(scope, element, attr){
			CreateDb.createDB();

			scope.tut = 2;
			//console.log(scope.hui);
			//setTimeout(function(){
			//	console.log(CreateDb.db);
			//},1000);

			//scope.db = CreateDb.db;
			//console.log(scope);
		}
	}
};
