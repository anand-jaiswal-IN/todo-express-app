const express = require('express');

const usersRouter = require("./users");
const taskRouter = require("./task");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/task", taskRouter);

router.get('/', (req, res)=>{
    let context = {
        pageTitle : "Home Page",
        user : req.session.user
    }
    console.log(req.session.user);
    res.render('index', context);
});



router.get('*', (req, res)=>{
    res.render('404Error', {pageTitle : "Error"});
});
 

module.exports = router;