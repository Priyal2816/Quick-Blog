import React from 'react'
import { blogCategories } from '../assets/assets'
import { useState, useEffect } from 'react'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'
import Shimmer from './Shimmer'

const BlogList = () => {

    const [menu, setMenu] = useState("All");
    const {blogs, input} = useAppContext();

    // used only for testing
    // const {blogs: contextBlogs, input} = useAppContext();
    // const [blogs, setBlogs] = useState([]);
    // useEffect(() => {
    //   // Fake delay for testing shimmer
    //   setTimeout(() => {
    //     setBlogs(contextBlogs);
    //   }, 2000); // 2 sec delay
    // }, [contextBlogs]);

    if(!blogs || blogs.length==0)return <Shimmer/>

    const filteredBlogs = ()=>{
        if(input === ''){
            return blogs;
        }
        return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.
        toLowerCase()) || blog.category.toLowerCase().includes(input.
        toLowerCase()));
    }

  return (
    <div>
        {/* blog categories */}
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
            {blogCategories.map((item) => (
                <div key={item} className='relative'>
                    <button onClick={()=> setMenu(item)} 
                    className={`cursor-pointer text-gray-500 
                    ${menu === item && 'text-white px-4 pt-0.5'}`}>
                        {item}
                        {menu === item && (
                           <motion.div layoutId='underline'
                           transition={{type: 'spring', stiffness: 500, damping: 30}}
                           className='absolute left-0 right-0 top-0 h-7 -z-1
                           bg-primary rounded-full'></motion.div>
                        )}
                    </button>
                </div>
            ))}
        </div>

        {/* blog cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
        gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
            {filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu)
            .map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
        </div>
        
    </div>
  )
}

export default BlogList
