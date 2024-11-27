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
          <Typography variant="h6" className="font-bold text-gray-800">
            {user.name}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {user.email}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Eduaction: {user.degree}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Interests: {user.interest}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Technical Skills: {user.techSkills?.length
              ? user.techSkills.join(", ")
              : "No skills listed"}
          </Typography>{" "}
        </div>

        <div className="flex items-center space-x-4">
          {isRequested ? (
            <Button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full"
              aria-label="Requested"
            >
              <PersonAddIcon />
              <span>Requested</span>
            </Button>
          ) : !isConnected && !isPending ? (
            <Button
              onClick={onConnect}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full"
              aria-label="Send request"
            >
              <PersonAddIcon />
              <span>Connect</span>
            </Button>
          ) : isPending && showAcceptButton ? ( 
            <Box>
              <Button
                onClick={onAccept}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full"
                aria-label="Accept request"
              >
                <DoneIcon />
                <span>Accept</span>
              </Button>
              <Button
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full"
                aria-label="Reject request"
              >
                <CheckCircleIcon />
                <span>Reject</span>
              </Button>
            </Box>
          ) : isConnected ? (
            <button
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 mt-14 px-4 py-2 rounded"
              onClick={onRemove}
            >
              <span>Remove</span>
            </button>
          ) : (
            <Button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full"
              aria-label="Request recieved"
            >
              <CheckCircleIcon />
              <span>Request Pending</span>
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default UserCard;
