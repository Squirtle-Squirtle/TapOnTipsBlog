import User from "../mddel/user.js";

export const signupUser=async (request,response)=>
{
    try
    {   
        const user=request.body;
        const newuser=new User(user);
        await newuser.save();
        return response.status(200).json({msg: "signup successful"});
    }
    catch(error)
    {
        return response.status(200).json({msg:"Error While Signup"});
    }
}