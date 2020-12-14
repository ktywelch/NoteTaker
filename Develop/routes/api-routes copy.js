const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");
const db = path.join(__dirname, "../db/db.json");

// Createing a delnotes promise that will delete the note using promise this did not work ... 
// but maybe can figure out how to make it work ....
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


router.delete("/notes/:id", (req, res) => { 
    console.log(req.params);  
    const search = req.params.id;
    delNotes(search)
    .then(checkDel => {

        console.log("returned from del",checkDel)
        if (checkDel[0]){ 
        
        return res.json({msg: `removed ${removed}`})
        } else {
        return res.json({
            msg: "the note does not exist",
            error: `attempted route: ${search}`
           })
        }
      
    })
    .catch(err => console.log(err))
})

router.post('/notes', (req,res) => {
    let noteid;
    console.log(req.body)
    fs.readFile(db,'utf8', (err,data) => {
     if (err) throw err;
      const allNotes = JSON.parse(data);
    let formNoteID = req.body.id;
    console.log(formNoteID);
    if(formNoteID){
        //noteid = formNoteID;
        delNotes(noteid)  
        .then(checkDel => {
            console.log("returned from del",checkDel)
            if (checkDel[0]){ 
            return res.json({msg: `removed ${removed}`})
            } else {
            return res.json({
                msg: "the note does not exist",
                error: `attempted route: ${req.params.id}`
               })
            }
          
        })
        .catch(err => console.log(err))
        
    }   
          noteid = nanoid(10); //some random number generator; 
    
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