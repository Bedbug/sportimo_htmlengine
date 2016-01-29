'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

/* ================================
 *       Interviews Endpoint
 * ==============================*/
var interviewSchena = new mongoose.Schema({
    title: String,
    image: String,
    text: String,
    date: Date,
    matchid: Number
});
module.exports = mongoose.model("Interviews", interviewSchena);

