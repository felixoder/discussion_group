import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Answer({ answer }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${answer.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [answer]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className='w-10 h-10 rounded-full bg-gray-200"'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs ">
            {moment(answer.createdAt).fromNow()}
          </span>
        </div>
   
         
          
   
          <>
          <div dangerouslySetInnerHTML={{ __html: answer.content }} />
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              answer.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
            onClick={() => onLike(answer._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {answer.numberOfLikes > 0 &&
              answer.numberOfLikes +
                " " +
                (answer.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        
        </div>
          
          </>
          

       
      </div>
    </div>
  );
}
