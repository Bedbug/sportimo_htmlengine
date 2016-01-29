'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


/* ================================
 *       Publication
 * ==============================*/
var publication = new mongoose.Schema({
    id: { type: String, index: { unique: true }},
    type: String,
    matchId: String,
    seasonId: String,
    teamId: String,
    views: String,
    publishDate: String,
    publicationLanguagesHTML: mongoose.Schema.Types.Mixed,
    publicationLanguages: mongoose.Schema.Types.Mixed,
    photo: String
});

module.exports = mongoose.model("Publication", publication);





