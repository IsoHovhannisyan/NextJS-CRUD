import prisma from "@/prisma";
import { NextResponse } from "next/server";


export const GET = async(req: Request, res: NextResponse)=>{
   try{
        prisma.$connect();
        const posts= await prisma.post.findMany();
        return NextResponse.json({message: 'Success', posts}, {status: 200});
   }catch(err){
        return NextResponse.json({message: 'Error', err}, {status: 500});
   }finally{
        prisma.$disconnect();
   }
}


export const POST = async(req: Request, res: NextResponse)=>{
    try{
        prisma.$connect();
        const {title, description} = await req.json();
        const post = await prisma.post.create({data: {title, description}});
        return NextResponse.json({message: 'Success', post}, {status: 201});
    }catch(err){
        return NextResponse.json({message: 'Error', err}, {status: 500})
    }finally{
        prisma.$disconnect();
    }
}


