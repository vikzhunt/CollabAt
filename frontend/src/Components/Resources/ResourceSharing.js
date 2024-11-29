import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Link as LinkIcon } from '@mui/icons-material';
import { getAllResources, uploadResource } from '../../APIs/resource';

const ResourceSharing = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [resources, setResources] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newResource = await getAllResources();
        // console.log(newResource.data.resourceList);
        setResources(newResource.data.resourceList);
      }catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reloadData]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = async (e) => {
    if (file || link) {
      e.preventDefault();
      const newResource = { Category: category, fileLink: file, link: link };  
      console.log(newResource);
      const formData = new FormData();
      Object.keys(newResource).forEach(key => {
        if (newResource[key]) {
          formData.append(key, newResource[key]);
        }
      });
      console.log(formData);
      try{
        await uploadResource(formData);
        setReloadData(!reloadData);
        console.log("done")
      }
      catch(error){
        console.log('upload failed',error);
        alert("Upload Failed");
      }
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

            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Upload a File
              </label>
              <input
                id="file-upload"
                name='file'
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

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
            <Card
              key={index}
              className="bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-yellow-50/20 hover:border-yellow-500 shadow-lg p-4 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <CardContent>
                <Typography
                  variant="body1"
                  className="text-lg font-semibold text-gray-700 mb-2"
                >
                  <span className="font-bold text-purple-500/80">Category:</span>
                  <br></br> 
                  <span className="font-bold text-black-800/90">{resource.Category}</span>
                </Typography>

                {resource.fileLink && (
                  <Typography variant="body2" className="mb-2">
                    <strong className="text-blue-600/80">File:</strong>{' '}
                    <span
                      className="text-gray-500 block break-words overflow-hidden"
                    >
                      {resource.fileLink}
                    </span>
                  </Typography>
                )}

                {resource.link && (
                  <Typography variant="body2">
                    <strong className="text-blue-600/80">Link:</strong>{' '}
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      {resource.link}
                    </a>
                  </Typography>
                )}
              </CardContent>
              <CardActions className="pt-4 flex justify-end">
                {resource.fileLink && (
                  <a
                    href={resource.fileLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    View File
                  </a>
                )}
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ResourceSharing;
