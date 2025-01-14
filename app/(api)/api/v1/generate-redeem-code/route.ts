import { NextRequest, NextResponse } from "next/server";
import {redeemCodeSchema} from '@/lib/schema/user'
import { verifyToken } from "@/lib/jwt.lib";
import redeemCodeModel from "@/models/redeemCode.model";
import connect from "@/db/dbConfig";
import User from "@/models/user.model";


export const POST = async (res:NextRequest) => {
    connect()
    const response = await res.json()
    response.expiryDate = new Date(response.expiryDate)
    const data = redeemCodeSchema.safeParse(response)
    if(!data.success){
        return NextResponse.json({
            status: 'error',
            message : 'incomplete data',
            error: data.error.issues[0].message
        }, {
            status: 400
        })
    }

    const tokenCookie = res.cookies.get('token')
    const token = tokenCookie?.value
    if(!token || !verifyToken(token)){
        return NextResponse.json({
            status: 'error',
            message : 'unauthorized'
        }, {
            status: 401
        })
    }
    let userData;
    try {
        userData = await User.findById(verifyToken(token).id)
        if(!userData || !(userData.role === 'admin')){
            return NextResponse.json({
                status: 'error',
                message : 'unauthorized user: only admin can create redeem code'
            }, {
                status: 401
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message : (error as Error).message
        }, {
            status: 500
        })
        
    }
    const redeemCodeData = {...data.data, createdBy: userData.username};
    try {
        const response = await redeemCodeModel.create(redeemCodeData)
        return NextResponse.json({
            status: 'success',
            message : 'redeem code created',
            data: response
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message : (error as Error).message
        }, {
            status: 500
        })
    }

}

export const GET = async (res:NextRequest) => {
    connect()
    const tokenCookie = res.cookies.get('token')
    const token = tokenCookie?.value
    if(!token || !verifyToken(token)){
        return NextResponse.json({
            status: 'error',
            message : 'unauthorized'
        }, {
            status: 401
        })
    }
    try {
        const response = await redeemCodeModel.find()
        return NextResponse.json({
            status: 'success',
            data : response
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message : (error as Error).message
        }, {
            status: 500
        })
    }
}