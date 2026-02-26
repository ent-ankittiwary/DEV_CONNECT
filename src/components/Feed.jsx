import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";
import Review from "./Review";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const feedArray = Array.isArray(feed) ? feed : [];
  const handleNext = () => {
    if (currentIndex < feedArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };


  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, [feed]);

  if (!feed) return;

  if (feedArray.length <= 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-4xl font-bold">
        You have viewed all users
      </div>
    );
  // const totalFeed = feed.length;
  // const randomNo = Math.floor(Math.random()*totalFeed);

  return (
  <div className="min-h-screen bg-black text-white px-4 py-12">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-12">

      {/* USER CARD */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Usercard
          user={feedArray[currentIndex]}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isFirst={currentIndex === 0}
          isLast={currentIndex === feedArray.length - 1}
        />
      </div>

      {/* REVIEW SECTION */}
      <div className="w-full lg:w-1/2">
        <Review toUserId={feedArray[currentIndex]?._id} />
      </div>

    </div>
  </div>
);
};

export default Feed;
