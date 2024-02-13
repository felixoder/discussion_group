import { Spinner, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/post/getposts');
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const timeSince = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((currentDate - postDate) / 1000);
    const intervals = {
      year: Math.floor(seconds / 31536000),
      month: Math.floor(seconds / 2592000),
      day: Math.floor(seconds / 86400),
      hour: Math.floor(seconds / 3600),
      minute: Math.floor(seconds / 60),
    };

    let timeAgo = '';
    for (const [unit, interval] of Object.entries(intervals)) {
      if (interval > 0) {
        timeAgo = `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        break;
      }
    }
    return timeAgo || 'Just now';
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <h1 className='text-center font-bold text-4xl'>All Questions</h1>
      
      {loading ? (
        <Spinner />
      ) : (
        posts.map((post) => (
          <Link to={`/post/${post.slug}`} key={post._id} className="hover:cursor-pointer">
            <div className="border-transparent p-4 rounded-md h-[200px] mt-5 ml-5 mr-5 dark:bg-gray-800 bg-slate-50">
              <div className="">
                <h2 className="text-2xl font-bold truncate">{post.title}</h2>
                <Button gradientDuoTone='purpleToBlue' outline className='mt-2'>{post.tag}</Button>
                <div className="flex justify-between mt-2">
                  <div className="flex flex-col items-center gap-2">
                    <p className="mt-4 text-sm text-white-400 font-semibold"><strong className='font-semibold'></strong> {post.createdBy}</p>
                    <p className='text-sm text-white-400 font-semibold'>Asked {timeSince(post.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
