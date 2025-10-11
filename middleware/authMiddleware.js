import jwt from "jsonwebtoken";

export const manageAuth = (req, res, next) => {
    // const token = req.headers.authorization?.split(" ")[1];
    // console.log(req);
    const authheader = req.headers["authorization"];
    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(401).json({message: "Missing Access Token"});
    }
    const token = authheader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json({message: "Invalid or Expired Token"});
        }
        req.user = {id: decoded.id };
        req.userId = decoded.id;
        next();
    });
};