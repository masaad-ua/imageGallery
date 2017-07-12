"use strict";

module.exports = function(app){
	app.service('AddImageToDB', require('./addImageToDB'));

	app.directive('gallery', require('./galleryDirective'));
	app.directive('galleryImages', require('./galleryImagesDirective'));
	app.directive('dragItem', require('./dragItemDirective'));

};