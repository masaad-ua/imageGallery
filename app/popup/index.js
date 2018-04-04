"use strict";

module.exports = function(app){

	app.service('AddCommentToDB', require('./addCommentToDB'));
	app.service('GetCommentsFromDB', require('./getCommentsFromDB'));
	app.service('AddLikeDislikeToDB', require('./addLikeDislikeToDB'));

	app.directive('galleryPopup', require('./galleryPopupDirective'));

};