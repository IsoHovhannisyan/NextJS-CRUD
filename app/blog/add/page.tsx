'use client'

import { useRouter } from "next/navigation"
import {useRef} from 'react';
import { Toaster, toast } from "react-hot-toast";

interface Blog{
    title: string;
    description: string
}

const postBlog = async({title, description}: Blog)=>{
    const res = await fetch('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        //@ts-ignore
        "Content-Type": "application/json"
    });

    return await res.json();
}


const AddBlog = ()=>{
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLInputElement | null>(null);

    const submitHandler = async(e: any)=>{
        e.preventDefault();
        
        if(titleRef.current && descriptionRef.current){
            toast.loading('Sending Request', {id: '1'});
            await postBlog({
                title: titleRef.current.value,
                description: descriptionRef.current.value
            });
            toast.success('Blog Post Successfully', {id: '1'});
        }
       
    }


    return (
        <>  
        <Toaster/>
        <h2 className=' text-orange-500 text-[1.5rem]'>Add Blog Page</h2>
        <div className=" gap-2 w-full">
            <form onSubmit={submitHandler} className="">
                <input type="text" ref={titleRef} className=" border-2 border-orange-300 outline-none mr-[1rem] " placeholder="Name"/>
                <input type="text" ref={descriptionRef} className=" border-2 border-orange-300 outline-none resize-none mr-[1rem]" placeholder="Description"/>
                <button type="submit" className="bg-orange-300 p-[.3rem] rounded-lg">ADD</button>
            </form>  
        </div>
                  
        </>

    );

}

export default AddBlog;

