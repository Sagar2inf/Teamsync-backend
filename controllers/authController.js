import User from "../models/User.js";
import Session from "../models/sessions.js";
import bcrypt from "bcrypt";
import {generateJWT, generateRefreshToken} from "../utils/generateToken.js";
// import e from "cors";

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({status: "Error", message: "Invalid email or password"});
        }
        const checkpass = await bcrypt.compare(password, user.password);
        if(!checkpass){
            return res.status(400).json({status: "Error", message: "Invalid Email ID or Password"});
        }
        const accessToken = generateJWT(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7*24*60*60*1000), // 7 days
            device: req.headers["user-agent"],
            ipAddress: req.ip
        });
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            status: "Success",
            message: `Welcome back ${user.name}`,
            accessToken,
            user: {id: user._id, name: user.name, email: user.email},
        });
    } catch (e){
        res.status(500).json({status: "Error", message: e.message});
    }
};

export const refresh = async(req, res) => {
    try{
        // const {refreshToken} = req.body;
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if(!refreshToken){
            return res.status(400).json({status: "Error", message: "Refresh Token is required"});
        }
        const session = await Session.findOne({refreshToken});
        if(!session){
            return res.status(403).json({status: "Error", message: "Invalid Refresh Token"});
        }
        if(session.expiresAt < new Date()){
            await Session.deleteOne({refreshToken});
            return res.status(403).json({status: "Error", message: "Refresh Token has expired. Please login again."});
        }
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateJWT(decode.userID);
        res.json({accessToken: accessToken});
    } catch(e){
        res.status(500).json({status: "Error", message: e.message});
    }
};
export const logout = async(req, res) => {
    try{
        const refreshToken =  req.cookies.refreshToken || req.body.refreshToken;
        if(refreshToken){
            await Session.deleteOne({refreshToken});
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });
        res.status(200).json({message: "Logged out successfully"});
    }catch (e) {
        res.status(500).json({message: e.message});
    }

}

export const register = async(req, res) => {
    try{
        // console.log(req.body);
        const {name, email, password} = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);
        const checkemail = await User.findOne({email});
        if(checkemail){
            return res.status(400).json({status: "Error", message: "Email already exists"});
        }
        const newUser = new User({name, email, password: hashedpassword});
        await newUser.save();
        res.status(200).json({status: "Registered", message: `Welcome ${name} to our platform!`, user: {name, email}});
    }catch(e){
        console.log(e.message);
        res.status(500).json({status: "Error", message: e.message});
    }
};