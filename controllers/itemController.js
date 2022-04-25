const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.index = function(req, res, next) {
  res.send('hola mundo xd')
};

exports.item_list = function(req, res, next) {

};

exports.item_detail = function(req, res, next) {

};

exports.item_create_get = function(req, res, next) {

};

exports.item_create_post = function(req, res, next) {

};

exports.item_delete_get = function(req, res, next) {

};

exports.item_delete_post = function(req, res, next) {

};

exports.item_update_get = function(req, res, next) {

};

exports.item_update_post = function(req, res, next) {

};
