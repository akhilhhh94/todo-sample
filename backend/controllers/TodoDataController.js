const TodoData = require("../models/TodoDataModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

/**
 * User Todo Data List.
 * 
 * @returns {Object}
 */
exports.getList = [
	body("id", "id must not be empty.").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				return apiResponse.ErrorResponse(res, "invalid todoId");
			}
			TodoData.find({ userId: req.user._id, todoId: req.body.id }).then((tododata) => {
				if (tododata.length > 0) {
					return apiResponse.successResponseWithData(res, "Operation success", tododata);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Todo data store.
 * 
 * @param {string}      title 
 * 
 * @returns {Object}
 */
exports.todoStore = [
	body("data", "data must not be empty.").isLength({ min: 1 }).trim(),
	body("id", "id must not be empty.").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			var newTodoData = new TodoData(
				{
					todoId: req.body.id,
					userId: req.user._id,
					data: req.body.data,
					order: req.body.order
				}
			);
			await newTodoData.save(function (err, data) {
				if (err) {
					return apiResponse.ErrorResponse(res, "OPeration failed!");
				} else {
					TodoData.find({ userId: req.user._id, todoId: req.body.id }).sort({ createdAt: 1 }).then((tododata) => {
						return apiResponse.successResponseWithData(res, "Todo Data Added", tododata);
					});
				}
			});

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
	body("id", "id must not be empty.").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			var dataToupdate = {};
			if (req.body.data) {
				dataToupdate.data = req.body.data;
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				return apiResponse.ErrorResponse(res, "invalid todoID");
			}
			if (req.body.checked) {
				dataToupdate.checked = (req.body.checked == 'true');
			}
			if (Object.keys(dataToupdate).length === 0) {
				return apiResponse.ErrorResponse(res, "Please add data/checked in body");
			}
			TodoData.findOneAndUpdate(
				{ "_id": req.params.id, "userId": req.user._id },
				{
					"$set": dataToupdate
				},
				{ new: true },
				function (err, doc) {
					if (err || !doc) {
						return apiResponse.ErrorResponse(res, "Unabe to update");
					}
					TodoData.find({ userId: req.user._id, todoId: req.body.id }).sort({ createdAt: 1 }).then((tododata) => {
						return apiResponse.successResponseWithData(res, "Todo Data updated", tododata);
					});
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
			TodoData.findOneAndDelete({ "_id": req.params.id, "userId": req.user._id }, function (err, docs) {
				if (err || !docs) {
					return apiResponse.ErrorResponse(res, "Failed to deletedata");
				} else {
					TodoData.find({ userId: req.user._id, todoId: req.params.todoId }).sort({ createdAt: 1 }).then((tododata) => {
						return apiResponse.successResponseWithData(res, "Todo Data deleted", tododata);
					});
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];