import React from "react";
import { PersonAdd as PersonAddIcon, CheckCircle as CheckCircleIcon, Done as DoneIcon } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

const UserCard = ({ user, onConnect, onAccept, onRemove, isConnected, isRequested, isPending, showAcceptButton }) => {
  // // console.log(user);
  // // console.log(isRequested);
  // console.log(showAcceptButton);
  return (
    <Box className="w-full bg-white rounded-lg border hover:bg-yellow-50/20 hover:border-yellow-500 shadow-lg p-6 mb-6">
      <div className="flex items-start space-x-6">
        <img
          src="https://images.unsplash.com/photo-1647684379498-4cdcc826556e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
          alt={user.name || "User profile image"}
          className="w-40 h-40 object-cover rounded-lg"
        />

        <div className="flex-1">
          <Typography variant="h6" className="font-extrabold text-gray-800">
            {user.name}
          </Typography>
          <Typography variant="body2" className="text-indigo-500/80">
            {user.email}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
          <span className="font-bold">Eduaction:</span> {user.degree}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            <span className="font-bold">Interests:</span> {user.interest}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
          <span className="font-bold">Technical Skills:</span>{user.techSkills?.length
              ? user.techSkills.join(", ")
              : "No skills listed"}
          </Typography>{" "}
          {user.resume && (
            <div className="mt-4">
              <a
                href={user.resume} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                View Resume
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isRequested ? (
            <Button
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300"
              aria-label="Requested"
            >
              <PersonAddIcon />
              <span className="font-semibold">Requested</span>
            </Button>
          ) : !isConnected && !isPending ? (
            <Button
              onClick={onConnect}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300"
              aria-label="Send request"
            >
              <PersonAddIcon />
              <span className="font-semibold">Connect</span>
            </Button>
          ) : isPending && showAcceptButton ? (
            <Box>
              <Button
                onClick={onAccept}
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300"
                aria-label="Accept request"
              >
                <DoneIcon />
                <span className="font-semibold">Accept</span>
              </Button>
              <Button
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300"
                aria-label="Reject request"
              >
                <CheckCircleIcon />
                <span className="font-semibold">Reject</span>
              </Button>
            </Box>
          ) : isConnected ? (
            <button
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold mt-4 px-6 py-3 rounded-full shadow-lg transition duration-300"
              onClick={onRemove}
            >
              <span>Remove</span>
            </button>
          ) : (
            <Button
              className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300"
              aria-label="Request received"
            >
              <CheckCircleIcon />
              <span className="font-semibold">Request Pending</span>
            </Button>
          )}
        </div>

      </div>
    </Box>
  );
};

export default UserCard;
