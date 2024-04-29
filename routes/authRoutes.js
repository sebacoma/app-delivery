const { Router, request, response } = require("express");



const router = Router();



router.post('/login', (req = request, res = response) =>{
    res.status(200).json({
        msg: 'desde login'
    });
});




module.exports = router;