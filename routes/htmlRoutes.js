// houses our HTML routes (which page to display)
const path = require('path');
const router = require('express').Router();

// Endpoint: /notes
// sends the right file to be displayed when the endpoint is /notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});


// Endpoint: /{anythingElse}
// uses a wildcard to display the index if an invalid endpoint is declared
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;