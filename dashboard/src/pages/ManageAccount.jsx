import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageAccount.css';
import { IconButton, Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Register from './Register';

function ManageAccount() {
  const [users, setUsers] = useState([]); // Users will be fetched from localStorage
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch users from localStorage and convert to an array
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && typeof storedUsers === 'object') {
      const usersArray = Object.keys(storedUsers).map(key => ({
        _id: key,
        username: key,
        ...storedUsers[key],
      }));
      setUsers(usersArray);
    } else {
      setUsers([]); // Set to empty array if no valid data
    }
  }, []);

  const saveUsersToLocalStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user._id !== userId);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    alert('User deleted successfully');
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = () => {
    const updatedUsers = users.map(user => (user._id === selectedUser._id ? selectedUser : user));
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    handleEditModalClose();
    alert('User updated successfully');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleRoleChange = (e) => {
    setSelectedUser({ ...selectedUser, userRole: e.target.value });
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-account-container">
      <div className="sidebar">
        <Link to="/ManageProduct" className="sidebar-link">Back</Link>
      </div>
      <div className="content">
        <div className="head">
          <h1 className="h1-center">Manage Account</h1>
          <TextField
            label="Search Usernames"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-field"
          />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={handleRegisterModalOpen}>
            Add User
          </Button>
        </div>
        <br />
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userRole}</td>
                <td className="actions">
                  <IconButton onClick={() => deleteUser(user._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEditClick(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <Box sx={{ ...modalStyle }}>
          <h2>Edit User</h2>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={selectedUser?.username || ''}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={selectedUser?.email || ''}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>User Role</InputLabel>
            <Select
              name="userRole"
              value={selectedUser?.userRole || ''}
              onChange={handleRoleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="inventory">Inventory</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditUser}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Modal open={isRegisterModalOpen} onClose={handleRegisterModalClose}>
        <Box sx={{ ...modalStyle }}>
          <Register closeModal={handleRegisterModalClose} />
        </Box>
      </Modal>
    </div>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ManageAccount;
