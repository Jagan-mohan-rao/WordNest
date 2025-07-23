const userauthor = require('../models/userAuthorModel');

async function createUserOrAuthor(req,res) {
    //GET USER OR AUTHOR OBJECT FROM DATABASE
    const newUserauthor=req.body;
    //get user by  email 
    const userinDb= await userauthor.findOne({email:newUserauthor.email}) 
    //if user or author existed
    if(userinDb!=null){
        //check with role   
        if(userinDb.role===newUserauthor.role){
            res.status(200).send({message:newUserauthor.role,payload:userinDb})
        }else{
            res.status(200).send({message:"invalid user"})
        }
    }
    else{
        let newuser=new userauthor(newUserauthor);
        let newuserorauthordoc=await newuser.save();
        res.status(201).send({message:newuserorauthordoc.role,payload:newuserorauthordoc})

    }



 
    
}
//export
module.exports = createUserOrAuthor;