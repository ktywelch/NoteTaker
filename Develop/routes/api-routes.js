const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");
const db = path.join(__dirname, "../db/db.json");

// Createing a delnotes promise that will delete the note using promise - did not work will try to figure it out
const delNotes = async(search) => {
return new Promise((res,rjct) => {
    fs.readFile(db,'utf8', (err,data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].id === search) {
                let removed = allNotes.splice(i, 1) 
                fs.writeFile(db, JSON.stringify(allNotes), (err) => {
                    if (err) throw err;
                    res([true,`removed ${removed}`])
                  });
                
            }
        }
         rjct([false, `attempted route: ${search}`])
    })
})
}
    
// /api/notes
router.get("/notes", (req, res) => {
    //console.log(db);
    fs.readFile(db, "utf8", (err, data) => {
      if (err) throw err;
      //console.log(data);
      return res.json(JSON.parse(data));
   
    });
  });


router.get("/notes/:id", (req, res) => { 
    console.log(req.params);  
    const search = req.params.id;
    fs.readFile(db,'utf8', (err,data) => {
      if (err) throw err;
      const allNotes = JSON.parse(data);
      for (let i = 0; i < allNotes.length; i++) {
          if (allNotes[i].id === search) {
            res.json(allNotes[i])
          }
        }
    })
}) 



router.delete("/notes/:id", (req, res) => { 
    console.log(req.params);  
    const search = req.params.id;
    fs.readFile(db,'utf8', (err,data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].id === search) {
                //Splice from the current array spot for one element
                let removed = allNotes.splice(i, 1) 
                fs.writeFile(db, JSON.stringify(allNotes), (err) => {
                    if (err) throw err;
                    res.json({msg: 'note removed from database'})
                  });
                
            }
        }
     })
    })    


router.post('/notes', (req,res) => {
    console.log(req.body)
    let noteid;
    let allNotes;
    fs.readFile(db,'utf8', (err,data) => {
    if (err) throw err;
     allNotes = JSON.parse(data);
     let formNoteID = req.body.id;
     //if there is a form id remove it from the array
            if(formNoteID){
              for (let i = 0; i < allNotes.length; i++) {
                if (allNotes[i].id === formNoteID) {
                 allNotes.splice(i, 1) 
                 }
               }
         }     

    // note is not in the array 
          if (formNoteID){ noteid =  formNoteID //using same id although I now think the issue is with the render
        } else {
          noteid = nanoid(10); //some random number generator; 
          }
          console.log("FormID",formNoteID,"noteid",noteid);
            newNote = {
                "id": noteid,
                "title": req.body.title,
                "text": req.body.text,
            };
            allNotes.push(newNote); 

            fs.writeFile(db, JSON.stringify(allNotes), (err) => {
                if (err) throw err;
             
            });
    })
    res.json({msg: 'new note added to database'})
})

    

module.exports = router;