"use strict";
var app = angular.module("imageGallery", ["ui.router","ngSanitize"]);


//services
app.service('Auth', require('./services/auth'));
app.service('CreateDb', require('./services/createDb'));
app.service('WorkWithDB', require('./services/workWithDB'));
// common


// modules
require('./gallery')(app);