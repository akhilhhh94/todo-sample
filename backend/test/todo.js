const { chai, server, should } = require("./testConfig");
const UserModel = require("../models/UserModel");

/**
 * Test cases to test all the authentication APIs
 * Covered Routes:
 * (1) Get todo
 */

describe("Todo", () => {

	// Before each test we empty the database
	before((done) => {
		UserModel.deleteMany({}, (err) => {
			console.log(err);
			done();
		});
	});

	// Prepare data for testing
	const testData = {
		"firstName": "test",
		"lastName": "testing",
		"password": "123456",
		"email": "test@test.com"
	};

	const tododata = {
		name: "test"
	};

	describe("/POST Register", () => {
		it("It should Register user", (done) => {
			chai.request(server)
				.post("/api/auth/register")
				.send(testData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Registration Success.");
					testData._id = res.body.data._id;
					done();
				});
		});
	});

	/*
  * Test the /POST route
  */
	describe("/POST Login", () => {
		it("it should Send account not confirm notice.", (done) => {
			chai.request(server)
				.post("/api/auth/login")
				.send({"email": testData.email, "password": testData.password})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Login Success.");
					testData.token = res.body.data.token;
					done();
				});
		});
	});
	describe("/POST add todo", () => {
		it("It should add a new todo", (done) => {
			chai.request(server)
				.post("/api/todo")
				.send()
				.set("Authorization", "Bearer "+ testData.token)
				.end((err, res) => {
					res.should.have.status(200);
					tododata.id = res.body.data._id;
					done();
				});
		});
	});
	describe("/POST get todos", () => {
		it("It should get the todos", (done) => {
			chai.request(server)
				.post("/api/todo")
				.send()
				.set("Authorization", "Bearer "+ testData.token)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
	describe("/PUT update todos", () => {
		it("It should update the  todo", (done) => {
			chai.request(server)
				.put(`/api/todo/${tododata.id}`)
				.send({ title: tododata.name})
				.set("Authorization", "Bearer "+ testData.token)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
	describe("/DELETE update todos", () => {
		it("It should update the  todo", (done) => {
			chai.request(server)
				.delete(`/api/todo/${tododata.id}`)
				.send()
				.set("Authorization", "Bearer "+ testData.token)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});




