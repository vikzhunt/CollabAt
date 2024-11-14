import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

const TeamGroups = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team Alpha', description: 'A team for AI projects', members: ['Alice', 'Bob'], messages: [], isJoined: false },
    { id: 2, name: 'Web Wizards', description: 'Frontend development team', members: ['Charlie'], messages: [], isJoined: false },
  ]);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleCreateTeam = () => {
    const newTeam = {
      id: teams.length + 1,
      name: teamName,
      description: teamDescription,
      members: [],
      messages: [],
      isJoined: false,
    };
    setTeams([...teams, newTeam]);
    setTeamName('');
    setTeamDescription('');
  };

  const handleJoinTeam = (teamId) => {
    setTeams(teams.map(team =>
      team.id === teamId ? { ...team, isJoined: true, members: [...team.members, 'New Member'] } : team
    ));
  };

  const handleSelectTeam = (teamId) => {
    setSelectedTeamId(teamId);
  };

  const handleSendMessage = () => {
    if (message || file) {
      const newMessage = { text: message, file: file ? URL.createObjectURL(file) : null };
      setTeams(teams.map(team =>
        team.id === selectedTeamId ? { ...team, messages: [...team.messages, newMessage] } : team
      ));
      setMessage('');
      setFile(null);
    }
  };

  const selectedTeam = teams.find(team => team.id === selectedTeamId);

  return (
    <div className="p-8 bg-slate-100 rounded-lg shadow-lg max-w-5xl mx-auto my-8 mt-0">
      <div className="flex justify-between gap-8">

        <div className="w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Typography variant="h4" className="text-center font-extrabold text-blue-900/90 mb-6 pb-4">
            Create Team
          </Typography>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="block w-full px-4 py-2 mb-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            placeholder="Team Description"
            className="block w-full px-4 py-2 mb-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCreateTeam}
            className="w-full bg-blue-800/90 hover:bg-blue-700/90 text-white font-semibold py-2 rounded-md transition duration-200 shadow-md"
          >
            Create Team
          </button>
        </div>

        {/* Available Teams Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Typography variant="h4" className="text-center font-extrabold text-blue-900/90 mb-6 pb-4">
            Available Teams
          </Typography>
          <ul className="space-y-4">
            {teams.map(team => (
              <li key={team.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <div onClick={() => handleSelectTeam(team.id)} className="cursor-pointer">
                    <h4 className="text-xl font-semibold text-gray-800">{team.name}</h4>
                    <p className="text-gray-600">{team.description}</p>
                  </div>
                  {!team.isJoined ? (
                    <button
                      onClick={() => handleJoinTeam(team.id)}
                      className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 shadow-sm"
                    >
                      Join
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectTeam(team.id)}
                      className="bg-blue-800/90 hover:bg-blue-700/90 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-sm"
                    >
                      Chat
                    </button>
                  )}
                </div>
                <p className="text-gray-500 mt-2 text-sm">Members: {team.members.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Room for Selected Team */}
      {selectedTeam && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">{selectedTeam.name}</h3>
          <div className="overflow-y-auto h-40 mb-4 bg-white p-4 rounded border border-gray-200">
            {selectedTeam.messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {msg.text.trim() && (
                  <p className="text-gray-700">User: {msg.text}</p>
                )}
                {msg.file && (
                  <a href={msg.file} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    View File
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label htmlFor="file-upload" className="ml-2 cursor-pointer text-gray-500 hover:text-blue-500">
              <AttachFile className='text-red-600/50'/>
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-800/90 hover:bg-blue-700/90 text-white font-semibold py-2 rounded-md transition duration-200 shadow-md"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamGroups;
