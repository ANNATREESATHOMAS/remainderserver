const express= require('express')
const dataServices=require('./services/data.services')
const jwt=require('jsonwebtoken')
const cors= require('cors')
const app=express()

app.use(cors({
    origin:'http://localhost:4200'
}))
app.use(express.json())
const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        const data=jwt.verify(token,'supersecretkey123')
        req.currentIdd=data.currentIdd
        next()
    }catch{
        res.json({
            statusCode:401,
            status:false,
            message:"please login first"
        })
    }
}
app.post('/register',(req,res)=>{
    dataServices.register(req.body.id,req.body.uname,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/login',(req,res)=>{
    dataServices.login(req.body.id,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/event',jwtMiddleware,(req,res)=>{
    dataServices.event(req,req.body.eventName, req.body.eventDate).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/eventHistory',jwtMiddleware,(req,res)=>{
    dataServices.eventHistory(req).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/deleteevent',jwtMiddleware,(req,res)=>{
    dataServices.deleteevent(req,req.body.eventName, req.body.eventDate).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.delete('/deleteAcc/:id', jwtMiddleware, (req, res) => {
    dataServices.deleteAcc(req.params.id)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})









app.listen(3000,()=>{
    console.log("hai")
})