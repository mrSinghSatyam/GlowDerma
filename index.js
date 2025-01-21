import express from 'express';

const app = express();

let PORT = process.env.Deploy || 6000
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Home Page</h1>")
})
app.get("/About",(req,res)=>{
    res.send("<h1>Welcome to About Page</h1>")
})

app.get("/Contact",(req,res)=>{
    res.send("<h1>Welcome to Contact Page</h1>")
})
app.get("/products",(req,res)=>{
    res.send("<h1>Welcome to Product Page</h1>")
})

app.get("*",(req,res)=>{
    res.status(200).json({
        "error": "Route not found"
      })
})


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})