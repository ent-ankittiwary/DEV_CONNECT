import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections, removeConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/accepted/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteConnection = async (id) => {
    try {
      const res = await axios.delete(
        BASE_URL + "/accepted/connection/delete/" + id,
        { withCredentials: true },
      );
      dispatch(removeConnection(id));
      alert(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!Array.isArray(connections)) return null;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        No Connections Found
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          My Connections
        </h1>

        {/* Connection Cards */}
        <div className="space-y-8">
          {connections.map((connection) => {
            if (!connection.fromUserId || !connection.toUserId) return null;

            const connectionId = connection._id;

            const fromId = String(connection.fromUserId._id);
            const toId = String(connection.toUserId._id);
            const loggedInId = String(user._id);

            let otherUser = null;

            if (fromId === loggedInId) {
              otherUser = connection.toUserId;
            } else if (toId === loggedInId) {
              otherUser = connection.fromUserId;
            } else {
              return null;
            }

            if (!otherUser) return null;

            const { name, age, photoUrl, gender, about, skills } = otherUser;

            return (
              <div
                key={connectionId}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl transition hover:border-zinc-700"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-700">
                      <img
                        src={
                          photoUrl ||
                          "https://dummyimage.com/200x200/000/fff&text=User"
                        }
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className="text-xl font-semibold">{name}</h2>

                    {age && gender && (
                      <p className="text-sm text-zinc-400">
                        {age}, {gender}
                      </p>
                    )}

                    {about && (
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {about}
                      </p>
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
                  </div>

                  {/* Remove Button */}
                  <div className="w-full md:w-auto">
                    <button
                      onClick={() => deleteConnection(connectionId)}
                      className="w-full md:w-auto px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connection;
