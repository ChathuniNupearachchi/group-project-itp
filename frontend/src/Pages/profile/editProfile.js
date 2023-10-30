import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectUser } from '../../redux/fearures/auth/authSlice';
import Card from '../../components/card/card';
import { updateUser } from '../../services/authService';
import { Changepassword } from '../../components/changePassword/changepassword';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    name: user?.name,
    Email: user?.Email,
    phone: user?.phone,
    photo: user?.photo,
  };

  const [Profile, setProfile] = useState(initialState);
  const [ProfileImage, setProfileImage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...Profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      let imageURL = Profile.photo; // Default to the current photo URL

      if (ProfileImage) {
        // Handle image upload if a new photo is selected
        if (
          ProfileImage.type === 'image/jpg' ||
          ProfileImage.type === 'image/jpeg' ||
          ProfileImage.type === 'image/png'
        ) {
          const image = new FormData();
          image.append('file', ProfileImage);
          image.append('cloud_name', 'dq7iq5idx');
          image.append('upload_preset', 'bdx8cuof');

          // Upload the new image to Cloudinary
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dq7iq5idx/image/upload',
            { method: 'post', body: image }
          );

          const imgData = await response.json();
          imageURL = imgData.url.toString();
        } else {
          // Handle the case where an unsupported image format is selected
          toast.error('Unsupported image format. Please use JPG, JPEG, or PNG.');
          setIsLoading(false);
          return; // Exit the function
        }
      }

      // Update the user's profile
      const formData = {
        name: Profile.name,
        phone: Profile.phone,
        photo: imageURL, // Use the updated photo URL
      };

      const data = await updateUser(formData);
      toast.success('Update User');
      navigate('/profile');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  

  return (
    <div>
      <Header />
      <Sidebar />
      <div className='new' style={{marginLeft:'330px' ,marginRight:'0px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'}}>
      <div className='new' style={{marginLeft:'100px' ,marginRight:'100px', marginTop:'50px',borderRadius:'20px',boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',padding:'30px' ,backgroundColor:'#DEDEDE'}}>
        <h1 style={{color:'#FFA500'}}>Edit Profile<hr></hr></h1>
        <br />
        <Card>
          <center>
            <img src={Profile?.photo} alt="Profile picture" width="200" height="200" />
            
          <form onSubmit={saveProfile} style={{width:'700px'}}>
            <br />
            <b style={{marginLeft:'0px',width:'700px'}}>Name:</b>
            <input type="text" name="name" value={Profile?.name} onChange={handleInputChange} />
            <br />
            <b style={{marginLeft:'0px',width:'700px'}}>Phone:</b>
            <input type="text" name="phone" value={Profile?.phone} onChange={handleInputChange} />
            <br />
            <b style={{marginLeft:'0px',width:'700px'}}>Photo:</b>
            <input type="file" name="image" onChange={handleImageChange} />
            <br />
            <br />
            <div>
              <button type="submit">Confirm</button>
            </div>
          </form>
          </center>
        </Card>
        <br />
        <Changepassword />
      </div>
    </div>
    </div>
  );
};

export default EditProfile;
