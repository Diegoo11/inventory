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
    res.render('category_detail', {
      title: 'Category Detail',
      category: results.category,
      category_items: results.category_items
    })
  })
};

exports.category_create_get = function(req, res, next) {
  res.render('category_create', {title: 'Category Create'})
};

exports.category_create_post = [
  body('name').trim().isLength({min:1}).escape(),
  body('description').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description
    })

    if(!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Category Create',
        category: category,
        errors: errors.array()
      })
    }
    else {
      category.save(function (err) {
        if(err) {return next(err)}
        res.redirect(category.url)
      })
    }
  }
]

exports.category_upgrate_get = function(req, res, next) {
  Category.findById(req.params.id).exec(function (err, category) {
    if(err) {return next(err)}
    if(category === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err)
    }
    res.render('category_create', {title: 'Category Update', category: category})
  })
};

exports.category_upgrate_post = [
  body('name').trim().isLength({min:1}).escape(),
  body('description').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.name
    })

    if(!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Category Update',
        category: category,
        errors: errors.array()
      })
    }
    else {
      Category.findByIdAndUpdate(req.params.id, category, {}, function(err, thecategory) {
        if(err) {return next(err)}
        res.redirect(thecategory.url)
      })
    }
  }
]

exports.category_delete_get = function(req, res, next) {
  async.parallel({
    category: function(callback) {
      Category.findById(req.params.id).exec(callback);
    },
    category_items: function(callback) {
      Item.find({ 'category': req.params.id }).exec(callback)
    }
  }, function(err, results) {
    if(err) {return next(err)};
    if(results.category == null) {
      res.redirect('/catalog/categories');
    }
    res.render('category_delete', {
      title: 'Category Delete: ' + results.category.name,
      category: results.category,
      category_items: results.category_items
    })
  })
};

exports.category_delete_post = function(req, res, next) {
  async.parallel({
    category: function(callback) {
      Category.findById(req.body.categoryid)
    },
    category_items: function(callback) {
      Item.find({'category': req.params.id}).exec(callback)
    }
  }, function(err, results) {
    if(err) {return next(err)}
    if(results.category_items.length > 0){
      res.render('category_delete', {
        title: 'Category Delete: ' + results.category.name,
        category: results.category,
        category_items: results.category_items
      })
      return
    }
    else {
      Category.findByIdAndRemove(req.body.categoryid, function deleteCategory(err) {
        if(err) {return next(err)}
        res.redirect('/catalog/categories')
      })
    }
  })
};