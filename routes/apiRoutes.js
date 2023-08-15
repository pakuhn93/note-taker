// houses our API routes (RESTful)
const router = require('express').Router();
const db = require('../db/db');

// Endpoint: /api/notes will be used for the following routes ...
// get all notes from our database
router.get('/notes', (req, res) => {
    db 
        .getNotes()
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => res.status(500).json(err));
});


// post a single note to our database
router.post('/notes', (req,res) => {
    // remember req.body when posting
    db
        .addNote(req.body)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;