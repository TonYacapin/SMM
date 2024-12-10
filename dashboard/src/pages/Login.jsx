import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Login.css';

import loginImage from '../../public/logo.jpg'; // Adjust the path as necessary

function Login() {
  const [ModalStudOpen, setModalStudOpen] = useState(true);
  const [loginID, setLoginID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginIDErr, setLoginIDError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the users are already in localStorage, if not, populate with dummy data
    const users = JSON.parse(localStorage.getItem('users')) || null;
    if (!users) {
      // Populate localStorage with dummy users if not already populated
      const dummyUsers = {
        admin: { password: 'admin', role: 'admin' },
        user: { password: 'user', role: 'user' },
        inventory: { password: 'inventory', role: 'inventory' },
      };
      localStorage.setItem('users', JSON.stringify(dummyUsers));
    }
  }, []);

  const handleCloseStudModal = () => {
    setModalStudOpen(false);
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users'));

    // Check if the credentials exist in the "database" (users object)
    if (users && users[loginID] && users[loginID].password === password) {
      // Simulate storing the token and role in localStorage
      const user = users[loginID];
      const token = 'dummy-token'; // You can use a real token generator if needed
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/ManageProduct');
      } else if (user.role === 'user') {
        navigate('/Products');
      } else if (user.role === 'inventory') {
        navigate('/InventoryDashboard');
      }
    } else {
      // If invalid credentials, show error message
      setLoginIDError('Invalid login ID or password');
      setPasswordError('Invalid login ID or password');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to Register page
  };

  return (
    <Modal open={ModalStudOpen} onClose={handleCloseStudModal}>
      <div className="login-modal">
        <div className="main-login-form">
          <div className="login-form">
            <img src={loginImage} alt="Login Image" className="login-image" />
            <h1>Login</h1>
            <div className="example-credentials">
              <p><strong>admin</strong> password: admin</p>
              <p><strong>user</strong> password: user</p>
              <p><strong>inventory</strong> password: inventory</p>
            </div>
            <div className="login-forms">
              <TextField
                value={loginID}
                onChange={(e) => {
                  setLoginID(e.target.value);
                  setLoginIDError('');
                }}
                id="outlined-basic-1"
                label="Email or Username"
                variant="outlined"
                required
                error={!!loginIDErr}
                helperText={loginIDErr ? loginIDErr : ''}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                id="outlined-basic-2"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                required
                error={!!passwordError}
                helperText={passwordError ? passwordError : ''}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                }
                label="Show Password"
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                className="login-button sign-in"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseStudModal}
                className="login-button cancel"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Cancel
              </Button>

              <Button
                variant="outlined"
                onClick={handleRegisterClick}
                className="login-button register"
                style={{ borderColor: 'black', color: 'black', height: '56px' }}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
