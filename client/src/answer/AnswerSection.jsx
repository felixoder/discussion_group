import React, { useEffect, useState } from 'react';
import { Alert, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Answer from './Answer';

export default function AnswerSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [answer, setAnswer] = useState('');
  const [answerError, setAnswerError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.length > 200) {
      setAnswerError("Answer should not exceed 200 characters.");
      return;
    }
    try {
      const res = await fetch("/api/answer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: answer,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnswer('');
        setAnswerError(null);
        setAnswers([data, ...answers]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setAnswerError(error.message);
    }
  };

  useEffect(() => {
    const getAnswers = async () => {
      setIsLoading(true); // Set loading to true when fetching
      try {
        const res = await fetch(`/api/answer/getPostAnswers/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setAnswers(data);
        } else {
          throw new Error("Failed to fetch answers.");
        }
      } catch (error) {
        setAnswerError(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    getAnswers();
  }, [postId]);
  const handleLike = async (answerId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/answer/likeAnswer/${answerId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setAnswers(
          answers.map((answer) =>
            answer._id === answerId
              ? {
                  ...answer,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : answer
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto w-full p-3">
        {currentUser ? (
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Sign in as </p>
            <img
              src={currentUser.profilePicture}
              alt=""
              className="h-5 w-5 object-cover rounded-full"
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-xs text-cyan-700 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className="text-sm text-teal-500 my-5 flex gap-1">
            You must be signed in to answer.
            <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
              Sign In
            </Link>
          </div>
        )}
        {currentUser && (
          <form
            className="border border-teal-500 rounded-md p-3"
            onSubmit={handleSubmit}
          >
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  ['clean'],
                ],
              }}
              formats={{}}
              className='h-72 mb-12'
              required
              value={answer}
              onChange={(content) => setAnswer(content)}
            />
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-500 text-xs">
                {200 - answer.length} characters remaining.....
              </p>
              <Button outline gradientDuoTone="purpleToBlue" type="submit">
                Submit
              </Button>
            </div>
            {answerError && (
              <Alert color="failure" className="mt-5">
                {answerError}
              </Alert>
            )}
          </form>
        )}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {answers.length === 0 ? (
              <p className="text-sm my-5">No Answers yet</p>
            ) : (
              <>
                <div className="text-sm my-5 flex items-center gap-1">
                  <p>Answers</p>
                  <div className="border border-gray-500 py-1 px-2 rounded-sm">
                    <p>{answers.length}</p>
                  </div>
                </div>
                {answers.map((singleAnswer) => (
                  <Answer
                    key={singleAnswer._id}
                    answer={singleAnswer}
                    dangerouslySetInnerHTML={{ __html: singleAnswer.content }}
                    onLike={handleLike}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
