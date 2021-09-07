const Todo = require("../models/UserModel");
const TodoData = require("../models/TodoDataModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


/**
 * User Todo List.
 * 
 * @returns {Object}
 */
exports.getList = [
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			var collection = {};
			var pagination = 20;
			var limit = parseInt(req.query.limit);
			if (!limit || limit < pagination) {
				limit = pagination
			}
			await Todo.findOne({ _id: req.user._id }).sort({ 'todos.updatedAt': -1 }).then(async (Todoss) => {
				if (Todoss) {
					if (Todoss.todos && Todoss.todos.length > 0) {
						Todoss.todos.sort(function (a, b) {
							return new Date(b.updatedAt) - new Date(a.updatedAt);
						});
						Todoss = Todoss.todos.slice(0, limit);
						for (let index = 0; index < Todoss.length; index++) {
							var out = await TodoData.find({ 'todoId': Todoss[index]._id }).sort({ createdAt: 1 })
							collection[Todoss[index]._id] = out;
						}
						return apiResponse.successResponseWithData(res, "Operation success!", { Todoss, collection });
					} else {
						Todoss = Todoss.todos;
						return apiResponse.successResponseWithData(res, "Operation success", { Todoss, collection: [] });
					}
				} else {
					return apiResponse.ErrorResponse(res, 'Unable to find the user');
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Todo store.
 * 
 * @param {string}      title 
 * 
 * @returns {Object}
 */
exports.todoStore = [
	sanitizeBody("*").escape(),
	async (req, res) => {
		try {
			const todoSelected = await Todo.findOne({ '_id': req.user._id });
			todoSelected.todos.push({
				name: `List ${todoSelected.todos.length + 1}`
			});
			const updated = await todoSelected.save();
			return apiResponse.successResponseWithData(res, "Todo Added", updated.todos.slice(-1)[0]);

		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Todo update.
 * 
 * @param {string}      title 
 * 
 * @returns {Object}
 */
exports.todoUpdate = [
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("title", "Title character limit exceeded.").isLength({ max: 20 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			Todo.findOneAndUpdate(
				{ "_id": req.user._id, "todos._id": req.params.id },
				{
					"$set": {
						"todos.$.name": req.body.title
					}
				},
				{ new: true },
				function (err, doc) {
					if (!doc) {
						return apiResponse.ErrorResponse(res, "No todo exist with same");
					}
					var updatedData = {};
					for (let index = 0; index < doc.todos.length; index++) {
						if (doc.todos[index]['_id'] == req.params.id) {
							updatedData = doc.todos[index];
						}
					}
					return apiResponse.successResponseWithData(res, "Todo updated!", updatedData);
				}
			);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


/**
 * Todo delete.
 * 
 * @param {string}      id 
 * 
 * @returns {Object}
 */
exports.todoDelete = [
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			Todo.countDocuments({
				'_id': req.user._id,
				'todos.name': req.body.title,
			}).exec(async (err, count) => {
				if (err) {
					return apiResponse.ErrorResponse(res, "Failed to update");
				} else if (count) {
					return apiResponse.validationErrorWithData(res, "Todo already exist with same name", "Title already exist");
				} else {
					Todo.findOneAndUpdate(
						{ "_id": req.user._id, "todos._id": req.params.id },
						{ $pull: { todos: { _id: req.params.id } } },
						{ new: true },
						function (err, doc) {
							if (!doc) {
								return apiResponse.notFoundResponse(res, "Todo not exists with this id");
							}
							return apiResponse.successResponseWithData(res, "Todo removed", doc);
						}
					);
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];