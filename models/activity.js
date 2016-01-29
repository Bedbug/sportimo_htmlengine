'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

/* ================================
 *       Activities Schema
 * ==============================*/
var activitySchena = new mongoose.Schema({
    title: String,
    image: String,
    text: String,
    date: Date,
    matchid: Number
});

module.exports = mongoose.model("Activities", activitySchena);