import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import movieBg from "../../assets/movie-bg1.jpg";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error:any) {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
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
          <Box>
            <Typography fontWeight={300} mt={2}>
              <Link href="#" underline="hover" sx={{ color: "#fff" }}>
                Forgot Password
              </Link>
            </Typography>
            <Typography fontWeight={300} mt={2}>
              <Link href="#" underline="hover" sx={{ color: "#fff" }}>
                Don't have an account? Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Login;