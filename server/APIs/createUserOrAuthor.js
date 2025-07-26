const userauthor = require('../models/userAuthorModel');
const admin =require('../models/adminModel');

async function createUserOrAuthor(req,res) {
    //GET USER OR AUTHOR OBJECT FROM DATABASE
    const newUserauthor=req.body;
    //1.check  user by  email  exists?
    const userinDb= await userauthor.findOne({email:newUserauthor.email}) 
    // 2. Check if email exists in the admin collection
    const userInAdminDb = await admin.findOne({ email: newUserauthor.email });
    //if user or author existed
    if(userinDb!=null){
        //check with role   
        if(userinDb.role===newUserauthor.role){
            res.status(200).send({message:newUserauthor.role,payload:userinDb})
        }else{
            res.status(200).send({message:"invalid user"})
        }
    }
    // Scenario 2: User exists in the admin collection
    else if (userInAdminDb) {
        // If the email is found in the admin collection, it should NOT be created in userauthor.
        // It also means an admin is trying to select 'user' or 'author' role.
        if (newUserauthor.role === 'admin') {
            // This case should ideally be handled by the /admin-api/login route, but as a fallback:
            res.status(200).send({ message: "admin", payload: userInAdminDb });
        } else {
            // An admin is trying to create a user/author account with their admin email.
            // This is the core issue you want to prevent.
            res.status(400).send({ message: "This email is already registered as an admin. Cannot create another account." });
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