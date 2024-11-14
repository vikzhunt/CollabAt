import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Link as LinkIcon } from '@mui/icons-material';

const ResourceSharing = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [resources, setResources] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = () => {
    if (file || link) {
      const newResource = { file, link, category, timestamp: new Date() }; 
      setResources([newResource, ...resources]);  
      setFile(null);
      setLink('');
      setCategory('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-100 rounded-lg shadow-xl">
      <Card className="shadow-lg rounded-lg bg-white">
        <CardContent>
          <Typography variant="h4" className="text-center font-extrabold text-blue-900/90 mb-4 pb-4">
            Share Your Resources
          </Typography>

          <div className="mb-6 space-y-4">
            {/* Category Selection */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
                className="mb-4"
              >
                <MenuItem value="Notes">Notes</MenuItem>
                <MenuItem value="Interview Prep">Interview Prep</MenuItem>
                <MenuItem value="Coding Questions">Coding Questions</MenuItem>
              </Select>
            </FormControl>

            {/* File Upload */}
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Upload a File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Link Sharing */}
            <div>
              <TextField
                label="Enter a Link"
                variant="outlined"
                fullWidth
                value={link}
                onChange={handleLinkChange}
                className="mb-4"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <LinkIcon />
                    </IconButton>
                  ),
                }}
              />
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              variant="contained"
              color="primary"
              fullWidth
              className="py-2"
              endIcon={<CloudUploadIcon />}
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <Typography variant="h6" className="mt-8 mb-4 p-5 font-bold text-gray-800">
        Shared Resources
      </Typography>

      <div className="space-y-4">
        {resources.length === 0 ? (
          <Typography variant="body1" className="text-center text-gray-500">
            No resources shared yet.
          </Typography>
        ) : (
          resources.map((resource, index) => (
            <Card key={index} className="shadow-md bg-white p-4 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out">
              <CardContent>
                <Typography variant="body2" color="textSecondary" className="text-sm">
                  <strong>Category:</strong> {resource.category}
                </Typography>
                {resource.file && (
                  <Typography variant="body2" color="textSecondary" className="text-sm">
                    <strong>File:</strong> {resource.file.name}
                  </Typography>
                )}
                {resource.link && (
                  <Typography variant="body2" color="primary" className="text-sm">
                    <strong>Link:</strong>{' '}
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                      {resource.link}
                    </a>
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => alert('Download feature coming soon!')}>
                  Download
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ResourceSharing;
