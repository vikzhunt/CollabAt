import Team from "./../Modals/team.js";

export const createTeam = async (req, res) => {
    const { name, description, userId } = req.body;
    try {
        const newTeam = new Team({
        name,
        description,
        leader: userId,
        members: [userId]
      });
  
      await newTeam.save();
      return res.status(201).json({ message: 'Team created successfully'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating team', error });
    }
};

export const joinTeam = async (req, res) => {
    const { teamId, userId } = req.body; 
  
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      if (team.members.includes(userId)) {
        return res.status(400).json({ message: 'User is already a member of the team' });
      }
  
      team.members.push(userId);
      await team.save();
  
      return res.status(200).json({ message: 'Joined team successfully', team });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error joining team', error });
    }
  };
  
  
  export const sendMessage = async (req, res) => {
    const { teamId, text, file, userId } = req.body; 
  
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      const newMessage = {
        text,
        file,
        sender: userId
      };
  
      team.messages.push(newMessage);
      await team.save();
  
      return res.status(200).json({ message: 'Message sent successfully', team });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error sending message', error });
    }
  };

  export const getAllTeams = async (req, res) => {
    try {
      const teamList = await Team.find({});
      return res.status(200).json({ message: "Teams found", teamList });
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve team list", error: error.message });
    }
};