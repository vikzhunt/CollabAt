import React from 'react';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material'; 

const UserCard = ({ user, onConnect, isConnected }) => {
  return (
    <div className="w-full bg-white rounded-lg border hover:bg-yellow-50/20 hover:border-yellow-500 shadow-lg p-6 mb-6">
      <div className="flex items-start space-x-6">
        {/* Profile Picture */}
        <img
          src={
            user.picture ||
            'https://images.unsplash.com/photo-1647684379498-4cdcc826556e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D'
          }
          alt={user.name}
          className="w-40 h-40 object-cover rounded-lg"
        />

        {/* Profile Details */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Degree:</span> {user.degree}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Area of Interest:</span> {user.areaOfInterest}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Skills:</span> {user.skills}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Technical Skills:</span> {user.techSkills}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Interests:</span> {user.interests}
          </p>

          {/* Resume Link */}
          {user.resume ? (
            <a
              href={user.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline mt-3 inline-block bg-blue-100 py-1 px-3 rounded-md font-medium hover:bg-blue-200 transition"
            >
              View Resume
            </a>
          ) : (
            <p className="text-gray-500 mt-3">Resume not available</p>
          )}
        </div>
      </div>

      {/* Connect Button */}
      <div className="mt-6">
        <button
          onClick={() => onConnect(user.id)}
          disabled={isConnected}
          className={`w-full py-2 rounded-lg font-medium flex items-center justify-center space-x-2 ${
            isConnected
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
              : 'bg-blue-900/90 hover:bg-blue-800/90 text-white'
          } transition-all duration-200 ease-in-out`}
        >
          {/* Adding the icon to the button */}
          <PersonAddIcon />
          <span>{isConnected ? 'Request Sent' : 'Connect'}</span>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
