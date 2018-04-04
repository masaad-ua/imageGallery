module.exports = function(){
	return{
		restrict: 'E',
		scope:{},
		template: require('./views/galleryTemplate.html'),
		bindToController: true,
		controller:function(){
			this.title = "WELCOME TO VISEVEN <span class='another-colour'>IMAGESTOCK</span>";

			this.popupImage = null;
			this.amountOfComments = {};
			this.listOfImages = [];

			this.popupActive = false;
			this.openPopup = function(obj){
				this.popupActive = true;
				this.popupImage = obj;

			};



		},
		controllerAs: "gall"

	}
};