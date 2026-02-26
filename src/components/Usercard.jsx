import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const Usercard = ({ user, handleNext, handlePrevious, isFirst, isLast }) => {
  const dispatch = useDispatch();
  const { _id, name, age, photoUrl, gender, about, skills, email } = user;

  const HandleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transition hover:scale-[1.02] duration-300">
        {/* Image Section */}
        <div className="w-full h-80 overflow-hidden">
          <img
            src={
              photoUrl || "https://dummyimage.com/600x800/000/fff&text=No+Image"
            }
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            {age && gender && (
              <p className="text-gray-400 text-sm">
                {age}, {gender}, {email}
              </p>
            )}
          </div>

          {about && (
            <p className="text-gray-300 text-sm leading-relaxed">{about}</p>
          )}

          {skills && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {(Array.isArray(skills)
                ? skills
                : typeof skills === "string"
                  ? skills.split(",")
                  : []
              ).map((skill, index) => (
                <span
                  key={index}
                  className="bg-zinc-800 text-xs px-3 py-1 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => HandleSendRequest("ignored", _id)}
              className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Ignore
            </button>

            <button
              onClick={() => HandleSendRequest("interested", _id)}
              className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Interested
            </button>
          </div>
          {/* <div className="join grid grid-cols-2">
            <button onClick={()=>handlePrevious} className="join-item btn btn-outline">« Previous</button>
            <button onClick={()=>handleNext} className="join-item btn btn-outline">Next »</button>
          </div> */}

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={handlePrevious}
              disabled={isFirst}
              className="py-2 rounded-lg border border-gray-600 text-white disabled:opacity-40"
            >
              « Previous
            </button>

            <button
              onClick={handleNext}
              disabled={isLast}
              className="py-2 rounded-lg border border-gray-600 text-white disabled:opacity-40"
            >
              Next »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
