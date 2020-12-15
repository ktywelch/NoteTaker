const request = require("supertest");
const express = require("express");
const app = express();
const apiRoutes = require("../routes/api-routes")
const clientRoutes = require("../routes/client-routes")

app.use(express.urlencoded({ extended: false }));
app.use("/api",apiRoutes)
app.use("/", clientRoutes)

test("index route works", done => {
   request(app)
     .get("/")
     .expect("Content-Type", /text\/html; charset=UTF-8/)
     .expect(200, done);
 });



test("Posting of the Balance accouts test", done => {
  request(app)
    .post("/api/notes")
    .type("form")
    .send({id: "9999",
          title: "Balance accounts",
          text: "Balance account books by end of day Monday"})
    .expect({ msg: "new note added to database" }, done);
    });



    test("Testing if the note is there", done => {
      request(app)
        .get("/api/notes/9999")
        .expect({id: "9999",
        title: "Balance accounts",
        text: "Balance account books by end of day Monday"}, done);
        });
    

