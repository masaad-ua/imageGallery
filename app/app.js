"use strict";
var app = angular.module("imageGallery", ["ui.router","ngSanitize"]);


//services
app.service('CreateDb', require('./services/createDb'));
app.service('CreateTransactionDB', require('./services/createTransactionDB'));
app.service('GetLastIdDB', require('./services/getLastIdDB'));

app.service('GetFromLocalStorage', require('./services/getFromLocalStorage'));
app.service('AddToLocalStorage', require('./services/addToLocalStorage'));

// common


// modules
require('./gallery')(app);
require('./popup')(app);