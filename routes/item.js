var express = require('express');
var itemRouter = express.Router();
var itemModel = require('../models/item');

itemRouter.route('/')
	.post(function (req, res) {
		var item = new itemModel();
		item.title = req.body.title;
		item.notes = req.body.notes;
		item.save(function (err) {
			if (err)
				res.send(err);
			res.json({ message: 'Item Saved Successfully.' });
		});
	})
	.get(function (req, res) {
        var query = {};
		itemModel.find(query, function (err, items) {
			if (err)
				res.send(err);
			res.json(items);
		});
	});

itemRouter.route('/:item_id')
	.get(function (req, res) {
		itemModel.findById(req.params.item_id, function (err, item) {
			if (err)
				res.send(err);
			res.json(item);
		});
	})
	.put(function (req, res) {
		itemModel.findById(req.params.item_id, function (err, item) {
			if (err)
                res.send(err);
            item.title = req.body.title; 
			item.notes = req.body.notes;
			item.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'Item Updated Successfully' });
			});
		});
	})
	.delete(function (req, res) {
		itemModel.remove({
			_id: req.params.item_id
		}, function (err, item) {
			if (err)
				res.send(err);

			res.json({ message: 'Item Deleted Successfully' });
		});
	});

module.exports = itemRouter;