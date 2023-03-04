const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://nitingogula:nitin1023@cluster0.vtyfuhx.mongodb.net/Users?retryWrites=true&w=majority", {
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
    branch: String,
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
            let newuser = new User({ name: req.body.name, branch: req.body.branch, password: req.body.password });
            newuser.save((err) => {
                if (err) {
                    console.log("error occured");
                }
                else {
                    console.log("user added");
                    res.send({ message: `${req.body.name} registered successfully` });
                }
            });
        }
    })
})
router.post("/userLogin", (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => {
        if (user) {
            if (req.body.password === user.password) {
                res.send({ message: `User ${req.body.name} login successfull`, user: user })
            }
            else {
                res.send({ message: `Incorrect Password` });
            }
        }
        else {
            res.send({ message: `User ${req.body.name} not found. Please Register` })
        }
    })
})
router.get("/getUsers", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send({ message: "could not get users" });
        }
        if (users) {
            console.log(users);
            res.send(users);
        }
    })
})
router.delete("/delUser/:id", (req, res) => {
    console.log(req.params.id);
    let i = req.params.id;
    User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ message: `user ${user.name} deleted` })
        }
    })
})
router.get("/getUser/:id",(req,res)=>{
    User.findById({_id:req.params.id},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(user);
        }
    })
})
router.post("/updateUser/:id",(req,res)=>{
    console.log(req.body);
    User.updateOne({_id:req.params.id},{ name: req.body.name, branch: req.body.branch, password: req.body.password },(err,usr)=>{
        if(err){
            console.log(err);r
        }
        else{
            res.send({message:`user ${req.body.name} updated`});
        }
    })
})


module.exports = router;