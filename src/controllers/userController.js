import User from "../models/usermodel.js"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"


export const usercreate = async (req, res) => {
    try {
       
        const userdata = new User(req.body)
    
        const { email } = userdata
        const userexist = await User.findOne({ email })
        
  
        if (userexist) {
            return res
                .status(400)
                .json({ message: "⚠️ user already exists " })
        }
        

        await userdata.save();

        
        res.status(201).json({
            message: "✔️ User created succesfully"
        });
    } catch (error) {

        console.error(error);  

        res.status(500).json({
            message: "❌ interal error",
            error: error.message  
        });
    }
}


export const userget = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(204).json({ message: "❌ There are no registered users." });
        }

        // Crear un arreglo de respuestas con cada usuario más detallado
        const userList = users.map((user, index) => {
            return {
                userNumber: `${index + 1}️⃣`,
                userId: `🆔 ID: ${user._id}`,
                name: `👤 Names: ${user.name} 👪 ${user.lastname}`,
                email: `📧 Email: ${user.email}`,
                age: `🎂 age: ${user.age}`,
                registrationDate: `🕒 Record: ${new Date(user.registrationDate).toLocaleDateString()}`,
            };
        });

        // Decorar
        return res.status(200).json({
            message: "🎉 -List Of Users- 👥",
            totalUsers: `📌 Total Users: ${users.length}`,
            users: userList,
        });

    } catch (error) {
        return res.status(500).json({ message: "🚨 internal server error", error: error.message });
    }
};;


export const deleteuser = async (req, res ) =>{
    try {
       
        const _id =  req.params.id;
        //validar si existe, se hace un llamado
        const userExist= await User.findOne({ _id})

        
        

        if(!userExist){
            return res.status(404).json({message: "❌ user not found"})

        }

       await User.findByIdAndDelete(_id)
        return res.status(200).json({message:"✔️ user delete succesfully"});
    } catch (error) {
        res.status(500).json({ error:" 🚨 internal server error", error});
    }
}

export const updateUsers = async(req, res) =>{
    try {
        
    
  const _id= req.params.id; 

  const userExist= await User.findOne({ _id })
  if(!userExist){
    return res.status(404).json({message: "❌ user not found"})
  }

  
  const updatedUser = await User.findByIdAndUpdate({ _id}, req.body,{
    new:true, //tener los datos actualizados 
  } );
 

return res.status(201).json({updatedUser})
}  catch (error) {
     return res.status(500).json({error:" 🚨 internal server error", error})  
  }
};

export const validate = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        if (!(req.body.email && req.body.password)) {
            return res.status(400).json({ message: " ⚠️ Email and password are required" });
        }

        const userFound = await User.findOne({ email: req.body.email });
        console.log("User found:", userFound);

        if (!userFound) {
            return res.status(200).json({ message: " ❌ Email or password are wrong" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, userFound.password);
        console.log("Password correct:", isPasswordCorrect);

        if (isPasswordCorrect) {
            const payload = {
                userID: userFound._id,
                userEmail: userFound.email,
            };

            const token = jwt.sign(payload, "secret", { expiresIn: "1h" });

            console.log("Session before setting token:", req.session);

            req.session.token = token;

            console.log("Session after setting token:", req.session);

            return res.status(200).json({ message: "logged in", token });
        } else {
            return res.status(400).json({ message: "❌ user or password is incorrect" });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: "  🚨 internal server error", details: error.message });
    }
};