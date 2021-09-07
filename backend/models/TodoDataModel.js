var mongoose = require("mongoose");

var TodoDatSchema = new mongoose.Schema({
	todoId: {type: mongoose.Schema.Types.ObjectId, required: true, index: true},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true, index: true},
	data: {type: String, required: true},
	checked: {type: Boolean, required: true, default: false},
	order: {type: Number, required: true },
	
}, {timestamps: true});

//TodoDatSchema.index({ userId: 1, todoId: 1, order: 1 }, { unique: false })
module.exports = mongoose.model("TodoData", TodoDatSchema);