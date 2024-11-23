// src/Components/Auth/Login.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../APIs/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      let response = await logIn({ email, password });

      console.log(response.data.token);
      
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('crUserId',response.data.user._id);
      localStorage.setItem('email',email);
      navigate("/dashboard");
    }
    catch(error){
      console.log('login failed',error);
      alert("Login Failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
        backgroundImage: `url('../bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 3,
          borderRadius: "12px",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Welcome Back!
          </Typography>
          <form>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#2575fc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2575fc" },
                  "&:hover fieldset": { borderColor: "#6a11cb" },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#2575fc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2575fc" },
                  "&:hover fieldset": { borderColor: "#6a11cb" },
                },
              }}
            />
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#006BFF",
                "&:hover": {
                  backgroundColor: "#0B2F9F",
                },
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#2575fc" }}
            >
              Sign Up
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
