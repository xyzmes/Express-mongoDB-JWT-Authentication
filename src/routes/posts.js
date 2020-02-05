const express = require("express");
const router = express.Router();
const auth = require('../middleware/verifyToken')

//localhost:3000/api/
router.get("/", auth, (req, res, next) => {
    
    res.send('HELLO KITTY! SECURED BY JWT');

});


module.exports = router
