const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String,require: true ,maxlength: 255},
    description: {type: String, maxlength: 600},
    image: {type: String, maxlength: 255},
    videoID: {type: String,require: true, maxlength: 255},
    level: {type: String, maxlength: 255},
    slug: { type: String, slug: 'name', unique: true }, //tồn tại duy nhất 
  }, {timestamps: true});

  //add plugin
  mongoose.plugin(slug);
  Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'});

  module.exports = mongoose.model('Course', Course);
