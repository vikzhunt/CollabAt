import React from "react";
import { PersonAdd as PersonAddIcon,CheckCircle as CheckCircleIcon, Done as DoneIcon } from "@mui/icons-material";

const UserCard = ({ user, onConnect, onAccept, isConnected, isPending }) => {
  console.log(user);

  return (
    <div className="w-full bg-white rounded-lg border hover:bg-yellow-50/20 hover:border-yellow-500 shadow-lg p-6 mb-6">
      <div className="flex items-start space-x-6">
        <img
          src={
            "https://images.unsplash.com/photo-1647684379498-4cdcc826556e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={user.name}
          className="w-40 h-40 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.degree}</p>
          <p className="text-sm text-gray-500">{user.techSkills.join(", ")}</p>
        </div>
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full"
              disabled
            >
              <CheckCircleIcon />
              <span>Connected</span>
            </button>
          ) : isPending ? (
            <>
              <button
                onClick={() => onAccept(user._id)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full"
              >
                <DoneIcon />
                <span>Accept Request</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onConnect(user._id)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              <PersonAddIcon />
              <span>Connect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
