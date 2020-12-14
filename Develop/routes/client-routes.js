const router = require("express").Router();
const path = require("path");

router.get("/", (req,res) => {
   res.sendFile(path.join(__dirname, "../public/index.html"));
   console.log("Index.html");

})

router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    console.log("notes");
 
 })
 router.get("/js/index.js", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
    console.log("Index.js");
 
 })

 router.get("/assets/css/styles.css", (req,res) => {
   res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
   console.log("StyleSheet");

})
module.exports = router;