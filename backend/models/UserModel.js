var mongoose = require("mongoose");

var TodoSchema = new mongoose.Schema({
	name: {type: String, required: true},
  },  {timestamps: true});

var UserSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, select: false, required: true},
	todos: [{
		type: TodoSchema,
		required : false
	}],
}, {timestamps: true});

// Virtual for user's full name
UserSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

module.exports = mongoose.model("User", UserSchema);