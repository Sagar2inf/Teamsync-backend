import jwt from "jsonwebtoken";

export const generateJWT = (userInfo) => {
    return jwt.sign(
        {id: userInfo},
        process.env.JWT_SECRET,
        {expiresIn: "30s"}
    );
};

export const generateRefreshToken = (userInfo) =>{
    return jwt.sign(
        {id: userInfo},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: "7d"}
    )
}
