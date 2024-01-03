import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Typography,
} from "@mui/material";
import movieBg from "../../assets/movie-bg1.jpg";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        // Handle case where email or password is empty
        toast.error('Email and password are required.');
        return;
      }

      // Try to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error:any) {
      console.error(error);
      // If user doesn't exist, create a new account
      if (error.code) {
        try {
          // Create a new user
          await createUserWithEmailAndPassword(auth, email, password);
          navigate('/home');
        } catch (createError) {
          console.error('Error creating user:', createError);
          toast.error('Error creating user. Please try again.');
        }
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else {
        // Handle other authentication errors
        toast.error('Authentication error. Please try again.');
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error:any) {
      console.error('Google Sign-In Error:', error.message);
    }
  }

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Email: ${email} and Password: ${password}`);
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${movieBg})`,
        backgroundSize: "contain",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Box
        p={4}
        sx={{
          width: "100%",
          background: "rgba(0,0,0,0.75)",
          maxWidth: "380px",
        }}
      >
        <Typography variant="h2" mb={3} fontSize="1.25rem">
          Sign Up
        </Typography>
        <Box component="form" sx={{ color: "#fff" }} onSubmit={submitHandle}>
          <InputBase
            required
            placeholder="Email address"
            type="email"
            fullWidth
            sx={{
              mb: 2,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBase
            required
            placeholder="Password"
            type="password"
            fullWidth
            sx={{
              mb: 1,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ color: "#fff" }}
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit" onClick={handleEmailLogin}>
            Sign In
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#4285F4", color: "#fff" }}
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#4285F4", color: "#fff" }}
            onClick={()=>{
              navigate('/home');
            }}
          >
            Continue
          </Button>
        </Box>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Login;
