const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.index = function(req, res, next) {
  res.render('index')
};

exports.item_list = function(req, res, next) {
  Item.find().exec(function(err, item) {
    if(err) {return next(err)};
    res.render('item_list', {
      title: 'Item List',
      item: item
    })
  })
};

exports.item_detail = function(req, res, next) {
  Item.findById(req.params.id).populate('category').exec(function (err, item) {
    if(err) {return next(err)};
    if(item === null) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    };
    res.render('item_detail', {
      title: item.category.name,
      item: item
    });
  });
};

exports.item_create_get = function(req, res, next) {
  Category.find().exec(function(err, category) {
    if(err) {return next(err)}
    res.render('item_create', {
      title: 'Create Item',
      category: category
    })
  })
};

exports.item_create_post = [
  body('name').trim().isLength({min:1}).escape(),
  body('description').trim().isLength({min:1}).escape(),
  body('cost').trim().isLength({min:1}).escape(),
  body('isbn').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      isbn: req.body.isbn,
      category: req.body.category,
      img: req.body.img
    })

    if(!errors.isEmpty()) {
      Category.find().exec(function(err, category) {
        if(err) {return next(err)}
        res.render('item_create', {
          title: 'Create Item',
          item: item,
          category: category,
          errors: errors.array()
        })
      })
      return
    }
    else {
      item.save(function(err) {
        if(err) {return next(err)}
        res.redirect(item.url)
      })
    }
  }
]

exports.item_update_get = function(req, res, next) {
  Item.findById(req.params.id).populate('category').exec(function (err, item) {
    if(err) {return next(err)};
    if(item === null) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    };
    res.render('item_create', {
      title: 'Item Update',
      item: item
    })
  })
};

exports.item_update_post = [
  body('name').trim().isLength({min:1}).escape(),
  body('description').trim().isLength({min:1}).escape(),
  body('cost').trim().isLength({min:1}).escape(),
  body('isbn').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      isbn: req.body.isbn,
      category: req.body.category,
      img: req.body.img,
      _id: req.params.id
    })

    if(!errors.isEmpty()) {
      Category.find().exec(function(err, category) {
        if(err) {return next(err)}
        res.render('item_update', {
          title: 'Create Item',
          item: item,
          category: category,
          errors: errors.array()
        })
      })
      return
    }
    else {
      Item.findByIdAndUpdate(req.params.id, item, {}, function(err, theitem) {
        if(err) {return next(err)};
        res.redirect(theitem.url);
      })
    }
  }
]

exports.item_delete_get = function(req, res, next) {
  Item.findById(req.params.id).populate('category').exec(function(err, item) {
    if(err) {return next(err)};
    if(item === null) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    };
    res.render('item_delete', {
      title: 'Delete Item: ' + item.name,
      item: item
    })
  })
};

exports.item_delete_post = function(req, res, next) {
  Item.findByIdAndRemove(req.body.itemid, function(err) {
    if(err) {return next(err)};
    res.redirect('/home/items')
  })
};
