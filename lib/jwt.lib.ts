import { JwtPayloadInfo } from '@/types/customTypes';
import jwt from 'jsonwebtoken';


export const verifyToken = (token: string): JwtPayloadInfo => {
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, jwtSecret) as JwtPayloadInfo;
}
