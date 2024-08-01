import mongoose from 'mongoose'


const connection=async (username,password)=>
{
    const URL=`mongodb+srv://${username}:${password}@blogapplication.roiygcr.mongodb.net/?retryWrites=true&w=majority&appName=blogApplication`;
    try{
        //Async function
        await mongoose.connect(URL);
        console.log(`DataBase connection successful`);
    }
    catch(error)
    {
        console.log(`Database connection fail with error ${error}`);
    }
}

export default connection; 