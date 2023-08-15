// houses our API routes (RESTful)
const router = require('express').Router();
const db = require('../db/db');

// Endpoint: /api/notes will be used for the following routes
router.get('/notes', (req, res) => {
    db 
        .getData()
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => res.status(500).json(err));
});


router.post('/notes', (req,res) => {
    // gotta remember req.body
    db
        .addData(req.body)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
});