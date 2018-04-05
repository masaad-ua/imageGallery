"use strict";
var app = angular.module("imageGallery", ["ui.router","ngSanitize"]);


//services
app.service('CreateDb', require('./services/createDb'));
app.service('DeleteDb', require('./services/deleteDb'));
app.service('CreateTransactionDB', require('./services/createTransactionDB'));
app.service('GetLastIdDB', require('./services/getLastIdDB'));

app.service('GetFromLocalStorage', require('./services/getFromLocalStorage'));
app.service('AddToLocalStorage', require('./services/addToLocalStorage'));
app.service('DeleteLocalStorage', require('./services/deleteLocalStorage'));

// common


// modules
require('./gallery')(app);
require('./popup')(app);