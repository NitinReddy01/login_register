const express=require('express');
const cors=require('cors');
var app=express();
const userRoutes=require("./routes/userRoutes");

// cors allows to send request and response between origins in this case from client(3000) to server(4000)
app.use(cors());
app.use(express.json()); // parses incoming requests JSON payloads
app.use('',userRoutes);

app.listen(4000,()=>{
    console.log("server is listening on port 4000");
});