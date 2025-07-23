const exp = require('express');
const { default: mongoose } = require('mongoose');
const userApp = require('./APIs/userApi');
const authorApp = require('./APIs/authorApi');
const adminApp = require('./APIs/adminApi');
const app = exp();
require('dotenv').config();// process .env
const cors = require('cors');
app.use(cors())

const port = process.env.PORT || 4000;

//db connnection
mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
    console.log("db connection success")
})
.catch(err=>console.log("error occured",err))


//body parser middleware (it is main to run req)
app.use(exp.json())
//connect routes api
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)


//error handler middleware
app.use((err,req,res,next)=>{
    console.log("error in the express handler middleware")
    res.send({message:err.message})
})










