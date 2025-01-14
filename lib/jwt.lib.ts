import jwt, { JwtPayload } from 'jsonwebtoken';


export const verifyToken = (token: string): JwtPayload => {
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, jwtSecret) as JwtPayload;
}
