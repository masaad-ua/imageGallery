module.exports = function(){
	return{
		restrict: 'E',
		scope:{},
		template: require('./views/galleryTemplate.html'),
		bindToController: true,
		controller:function(){
			this.title = "WELCOME TO VISEVEN <span class='another-colour'>IMAGESTOCK</span>";
			this.change = function(){
				console.log("brrr")
			}
		},
		controllerAs: "gall"

	}
};