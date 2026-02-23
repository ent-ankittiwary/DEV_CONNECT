import axios from "axios";
import React, { useEffect } from "react";
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

  if (feed.length <= 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-4xl font-bold">
        You have viewed all users
      </div>
    );

 return (
  <div className="min-h-screen bg-black text-white px-4 py-12">

    {/* <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
      Discover Developers
    </h1> */}

    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">

      {/* User Card */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Usercard user={feed[0]} />
      </div>

      {/* Review Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Review toUserId={feed[0]._id} />
      </div>

    </div>

  </div>
);
};

export default Feed;