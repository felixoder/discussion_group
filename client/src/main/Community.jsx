import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {FaCheck , FaTimes} from 'react-icons/fa'




export default function Community() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
  
    <div className='p-3 max-w-screen-xl mx-auto'>
    <h2 className='text-2xl font-bold mb-4 text-center'>Our Community</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {currentUser && users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className='bg-white dark:bg-gray-800 shadow-md rounded-lg'>
            <div className='p-4'>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <img
                src={user.profilePicture}
                alt={user.username}
                className='w-20 h-20 object-cover bg-gray-500 rounded-full mx-auto mb-4'
              />
              <p className='font-bold text-[16px] text-center mb-2'>{user.fullname}</p>
              <p className='text-gray-600 dark:text-gray-400 text-center'>@{user.username}</p>
            </div>
          </div>
        ))
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
    {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
  </div>
  
  


  );
}