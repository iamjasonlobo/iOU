import React, { useState } from 'react';

function UserProfileView() {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [photo, setPhoto] = useState(null);

  React.useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/user/details');
      setUser(response.data);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUploadPhoto = async (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    try {
      if (passwords.newPassword) {
        await axios.put('/api/user/change-password', passwords);
      }

      if (photo) {
        const formData = new FormData();
        formData.append('photo', photo);
        await axios.post('/api/user/upload-photo', formData);
      }

      await axios.put('/api/user/update', user);
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleSignOut = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className='form-container'>
      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={user.email} onChange={handleChange} />
        </div>

        <h2>Change Password</h2>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input type="password" id="oldPassword" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} />
        </div>

        <h2>Upload Photo</h2>
        <div className="form-group">
          <input type="file" accept="image/*" onChange={handleUploadPhoto} />
        </div>

        <div className="form-group">
          <button type="submit">Save Changes</button>
        </div>
      </form>
      </div>
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="form-group">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default UserProfileView;
