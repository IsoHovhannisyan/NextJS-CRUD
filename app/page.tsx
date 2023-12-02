import Link from 'next/link';


async function fetchBlogs() {
    const res = await fetch('http://localhost:3000/api/blog', {
      next:{
        revalidate: 10
      }
    });
    const data = await res.json();
    return data.posts;
}


export default async function Home() {

  const posts = await fetchBlogs();

  return (
    <main className="">
      <Link href={'/blog/add'} className=' text-orange-500 text-[1.5rem]' >Add New Blog</Link>
      {
        posts?.map( (el: any, index: any)=>< div key={el.id} className='border-2 border-orange-300 m-2 p-2 mb-[2rem]'>
          <div className='border-2 border-orange-300 p-2 mt-2'>{index+1}</div> 
          <div className='border-2 border-orange-300 p-2 mt-2'>{el.title}</div> 
          <div className=' border-2 border-orange-300 p-2 mt-2'>{el.description}</div>
          <div className=' border-2 border-orange-300 bg-orange p-2 mt-2'>
            <Link href={'/blog/edit/' + el.id}>Edit</Link>
          </div> 
        </div> )
      }
    </main>
  )
}
