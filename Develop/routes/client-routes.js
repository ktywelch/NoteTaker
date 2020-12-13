const router = require("express").Router();
const path = require("path");

router.get("/", (req,res) => {
   res.sendFile(path.join(__dirname, "../public/index.html"));
   console.log("hit Index.html");

})

router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    console.log("hit notes");
 
 })
 router.get("/js/index.js", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
    console.log("whaat");
 
 })

 router.get("/assets/css/styles.css", (req,res) => {
   res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
   console.log("whaat");

})
module.exports = router;