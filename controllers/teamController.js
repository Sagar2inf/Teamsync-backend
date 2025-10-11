import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async(req, res) => {
    try{
        const userId = req.user.id;
        const {name} = req.body;

        if(!name){
            return res.status(400).json({error: "Team Name is required"});
        }
        
        const team = await Team.create({
            name, 
            owner: userId,
            members: [{id: userId, role: "owner"}]
        });
        res.status(201).json(team);

    } catch(e){
        res.status(500).json({error: e.message});
    }
};

export const getTeam = async(req, res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({error: "User doesn't found"});
        }
        const teams = await Team.find({"members.id": userId}).populate("owner", "name email").populate("members.id", "name email");
        res.json(teams);
    } catch(e){
        res.status(500).json({error: e.message});
    }
};

export const getTeamById = async(req, res) => {
    try{
        const teamId = req.params.id;
        const team = await Team.findById(teamId).populate("owner", "name email").populate("members.id", "name email");
        if(!team) return res.status(404).json({error: "Team not found"});
        res.json(team);
    }catch(e){
        res.status(500).json({error: e.message});
    }
};

export const inviteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const {email, role} = req.body;
        const inviterId = req.user.id;
        if(!["admin", "member"].includes(role)){
            return res.status(400).json({error: "Role must be admin or member"});
        }
        const team = await Team.findById(id);
        if(!team){
            return res.status(404).json({error: "Team not found"});
        }

        const inviter = team.members.find(m => m.id.toString() === inviterId);
        if(!inviter || !["owner", "admin"].includes(inviter.role)){
            return res.status(403).json({error: "You don't have permission to invite user"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        
        if(team.members.some(m => m.id.toString() === user._id.toString())){
            return res.status(400).json({error: "User already in team"});
        }

        team.members.push({id: user._id, role});
        await team.save();

        res.json(team);
    } catch(e){
        res.status(500).json({error: e.message});
    }
};