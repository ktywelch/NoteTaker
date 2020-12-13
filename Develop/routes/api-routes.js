const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");
const db = path.join(__dirname, "../db/db.json");

// router.get("/", (req, res) => {
//     console.log("We have been hit");
//     res.json({msg: "success"});

// });


// /api/notes
router.get("/notes", (req, res) => {
    console.log(db);
    fs.readFile(db, "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);
      return res.json(JSON.parse(data));
   
    });
  });


router.get("/notes/:id", (req, res) => {
    //console.log(req.params.routename); 
    //res.json({msg: "success"});
    fs.readFile('../db/db.json','utf8', (err,data) => {
        if (err) throw err;
        //console.log(data);
        const allNotes = JSON.parse(data);
        const search = req.params.id;

        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].routeName === search) {
                return res.json(allNotes[i])
            }
        }
        return res.json({
            msg: "the character you are searching for does not exist",
            error: `attempted route: ${req.params.id}`
        })
    })
})


router.post('/notes', (req,res) => {
    //console.log(req.body)
    fs.readFile(db,'utf8', (err,data) => {
     if (err) throw err;
      const allNotes = JSON.parse(data);
    let noteid = nanoid(10); //some random number generator; 

    newNote = {
        "id": noteid,
        "title": req.body.title,
        "text": req.body.text,
    };

     allNotes.push(newNote); 

    fs.writeFile(db, JSON.stringify(allNotes), (err) => {
        if (err) throw err;
        res.json({msg: 'new note added to database'})
      });
    })
})

module.exports =router;