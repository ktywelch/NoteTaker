// Tests the api and the client routes to ensure they are working correctly
const request = require("supertest");
const express = require("express");
const app = express();
const apiRoutes = require("../routes/api-routes")
const clientRoutes = require("../routes/client-routes")
//changing timeout to 10 seconds 
jest.setTimeout(10000);

app.use(express.urlencoded({ extended: false }));
app.use("/api",apiRoutes)
app.use("/", clientRoutes)

test("index route works", done => {
   request(app)
     .get("/")
     .expect("Content-Type", /text\/html; charset=UTF-8/)
     .expect(200, done);
 })

test("Posting of the Balance accouts test", done => {
  request(app)
    .post("/api/notes")
    .type("form")
    .send({id: "9999",
          title: "Balance accounts",
          text: "Balance account books by end of day Monday"})
    .expect({ msg: "new note added to database" }, done);
    })

  test("Testing if the test note is there", done => {
      request(app)
        .get("/api/notes/9999")
        .expect({id: "9999",
        title: "Balance accounts",
        text: "Balance account books by end of day Monday"}, done);
        })   

test("Testing the delete function", done => {
  request(app)
    .delete("/api/notes/9999")
    .expect({msg: "note removed from database"}, done);
    });

// test("Testing post delete - we should get a not found", done => {
//   request(app)
//     .get("/api/notes/9999")
//     .expect({id: "9999",
//     title: "Balance accounts",
//     text: "Balance account books by end of day Monday"}, done);
//     });






