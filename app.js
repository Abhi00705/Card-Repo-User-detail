const express=require('express');
const app=express();
const path=require('path');
const users=require("./models/Users.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    res.render("index");
})

app.post("/create", async (req, res)=>{
    const{ name, email, image}=req.body;
    const user= await users.create({
      name, email, image
    });
    res.send(user);
})

app.get("/read", async(req, res)=>{
    const all_user= await users.find();
    // console.log(all_user);
    res.render("read", {all_user});
})

app.get("/edit", async (req, res)=>{
    const {email}=req.query;
    const userDetail = await users.findOne({email: email});
    res.render("edit", {userDetail});
})

app.post("/edited", async (req, res)=>{
    const {name, email, image}=req.body;
    const updatedUser=await users.findOneAndUpdate({email: email}, {
        $set: {
            name: name,
            email: email,
            image: image
        }
    },
    {new: true})
    console.log("updated user: --------------"+updatedUser);
    res.redirect('/read')
})

app.get("/delete", async (req, res)=>{
    const{email}=req.query;
    const del_user=await users.findOneAndDelete({email});
    res.redirect('/read');
})

app.listen(4000, ()=>{
    console.log("server running on 4000");
})