const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.set('strictQuery', false)
mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected to db")
    }
})
const userSchema = new mongoose.Schema({
    name: String,
    branch:String,
    password: String
})

let User = mongoose.model('detail', userSchema);

router.post("/userRegister", (req, res) => {
    console.log(req.body.name);
    User.findOne({ name: req.body.name }, (err, user) => {
        if (user) {
            res.send({ message: `user with the username ${req.body.name} already exists` })
        }
        else {
            let newuser = new User({ name: req.body.name,branch:req.body.branch, password: req.body.password });
            newuser.save((err) => {
                if (err) {
                    console.log("error occured");
                }
                else {
                    console.log("user added");
                    res.send({ message: `${req.body.name} registered successfully`});
                }
            });
        }
    })
})
router.get("/getUsers",(req,res)=>{
    User.find({},(err,users)=>{
        if(err){
            res.send({message:"could not get users"});
        }
        if(users){
            console.log(users);
            res.send(users);
        }
    })
})

module.exports = router;