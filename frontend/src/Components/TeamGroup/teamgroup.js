import React, { useState } from 'react';
import {Typography} from '@mui/material';
const TeamGroups = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team Alpha', description: 'A team for AI projects', members: ['Alice', 'Bob'] },
    { id: 2, name: 'Web Wizards', description: 'Frontend development team', members: ['Charlie'] },
  ]);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleCreateTeam = () => {
    const newTeam = {
      id: teams.length + 1,
      name: teamName,
      description: teamDescription,
      members: []
    };
    setTeams([...teams, newTeam]);
    setTeamName('');
    setTeamDescription('');
  };

  const handleJoinTeam = (teamId) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, members: [...team.members, 'New Member'] } : team
    ));
  };

  return (
    <div className="p-8 bg-slate-100 rounded-lg shadow-lg max-w-2xl mx-auto my-8 mt-0">
      <Typography variant="h4" className="text-center font-extrabold text-blue-900/90 mb-6 pb-4">
          Team Groups
      </Typography>
      
      {/* Form to create a new team */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Create a New Team</h3>
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

      {/* List of available teams */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Teams</h3>
      <ul className="space-y-4">
        {teams.map(team => (
          <li key={team.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">{team.name}</h4>
                <p className="text-gray-600">{team.description}</p>
              </div>
              <button 
                onClick={() => handleJoinTeam(team.id)} 
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 shadow-sm"
              >
                Join
              </button>
            </div>
            <p className="text-gray-500 mt-2 text-sm">Members: {team.members.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamGroups;
