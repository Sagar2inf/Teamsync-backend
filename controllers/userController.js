import User from '../models/User.js';

export const GetUser = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("name email role profilePicture createdAt");
        if(!user){
            return res.status(404).json({status: "Error", message: "User not found"});
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            createdAt: user.createdAt
        });
    } catch(e){
        res.status(500).json({message: e.message});
    }
};

export const Updateuser = async(req, res) => {
    try{
        const {name, profilePicture} = req.body;
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({status: "Error", message: "User not found"});
        }
        if(name) user.name = name;
        if(profilePicture) user.profilePicture = profilePicture;
        const updatedUser = await user.save();
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profilePicture: updatedUser.profilePicture,
            createdAt: updatedUser.createdAt
        });

    } catch(e){
        res.status(500).json({message: e.message});
    }
};