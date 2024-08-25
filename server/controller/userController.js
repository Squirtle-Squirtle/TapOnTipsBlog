import User from "../mddel/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from "../mddel/token.js";
dotenv.config();
export const signupUser = async (request, response) => {
    try {
        // const salt= await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(request.body.password, 10);
        const user = { username: request.body.username, name: request.body.name, password: hashedPass };
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error While Signup' });
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accesstoken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRETKEY, { expiresIn: '15m' });
            const refreshtoken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRETKEY);
            const newToken = new Token({ token: refreshtoken });
            await newToken.save();
            return response.status(200).json({ accesstoken: accesstoken, refreshtoken: refreshtoken, name: user.name, username: user.username });
        } else {
            return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while user login' });
    }
}