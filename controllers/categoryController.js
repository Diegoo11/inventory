const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.category_list = function(req, res, next) {
  Category.find().exec(function(err, categories) {
    if(err) {return next(err)}
    res.render('category_list', {
      title: 'Categories',
      categories: categories
    })
  })
};

exports.category_detail = function(req, res, next) {
  async.parallel({
    category: function(callback) {
      Category.findById(req.params.id).exec(callback)
    },
    category_items: function(callback) {
      Item.find({ 'category': req.params.id }).exec(callback)
    }
  }, function(err, results) {
    if(err) {return next(err)}
    if(results === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err)
    }
    res.render('')
  })
};

exports.category_create_get = function(req, res, next) {

};

exports.category_create_post = function(req, res, next) {

};

exports.category_upgrate_get = function(req, res, next) {

};

exports.category_upgrate_post = function(req, res, next) {

};

exports.category_delete_get = function(req, res, next) {

};

exports.category_delete_post = function(req, res, next) {

};