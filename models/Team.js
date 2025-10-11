import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member"
    }
    
})

const teamSchema =  new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    members: [memberSchema]
},{timestamps: true});

teamSchema.index({ name: 1 }, { unique: true });      
teamSchema.index({ owner: 1 });                        
teamSchema.index({ "members.id": 1 });            
teamSchema.index({ "members.role": 1 });

const Team = mongoose.model("Team", teamSchema);
export default  Team;