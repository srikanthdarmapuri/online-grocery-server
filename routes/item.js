var express = require('express');
var itemRouter = express.Router();
var itemModel = require('../models/item');

itemRouter.route('/')
    .post(function (req, res) {
        try {
            var item = new itemModel();
            item.title = req.body.title;
            item.notes = req.body.notes;
            item.save(function (err, item) {
                if (err)
                    res.json({ status: 0, err: err, message:'There is an error creating item, please try again later!' });
                else
                    res.json({ status: 1, message: 'Item Saved Successfully.', data : item });
            });
        }
        catch (e) {
            res.json({ status: 0, err: e, message:'There is an error creating item, please try again later!'});
        }
    })
    .get(function (req, res) {
        try {
            var query = {};
            itemModel.find(query, function (err, items) {
                if (err)
                    res.json({ status: 0, err: err, message:'There is an error while fetching data, please try again later!'});
                else
                    res.json({status : 1, data : items });
            });
        }
        catch (e) {
            res.json({ status: 0, err: e, message:'There is an error while fetching data, please try again later!'});
        }
    });

itemRouter.route('/:item_id')
    .get(function (req, res) {
        try {
            itemModel.findById(req.params.item_id, function (err, item) {
                if (err)
                    res.json({ status: 0, err: err, message:'There is an error while fetching data, please try again later!'   });
                else if(!item)
                    res.json({ status: 0, err: err, message:'No data found.'}); 
                else                   
                    res.json({ status : 1, data : item});
            });
        }
        catch (e) {
            res.json({ status: 0, err: e, message:'There is an error while fetching data, please try again later!'   });
        }
    })
    .put(function (req, res) {
        try {
            itemModel.findById(req.params.item_id, function (err, item) {
                if (err)
                    res.json({ status: 0, err: err, message:'There is no item with this Item Id.' });
                item.title = req.body.title;
                item.notes = req.body.notes;
                item.purchased = req.body.purchased;
                item.save(function (err, item) {
                    if (err)
                        res.json({ status: 0, err: err, message:'There is an error updating data, please try again later!'});
                    else
                        res.json({status : 1, message: 'Item Updated Successfully', data: item });
                });
            });
        }
        catch (e) {
            res.json({ status: 0, err: e, message:'There is an error updating data, please try again later!'   });
        }
    })
    .delete(function (req, res) {
        try {
            itemModel.remove({
                _id: req.params.item_id
            }, function (err, item) {
                if (err)
                    res.json({ status: 0, err: err, message:'There is an error deleting data, please try again later!'});
                else
                    res.json({status: 1, message: 'Item Deleted Successfully' });
            });
        }
        catch (e) {
            res.json({ status: 0, err: e, message:'There is an error deleting data, please try again later!'   });
        }
    });

module.exports = itemRouter;