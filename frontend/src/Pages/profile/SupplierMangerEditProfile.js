import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectUser } from '../../redux/fearures/auth/authSlice';
import Card from '../../components/card/card';
import { updateUser } from '../../services/authService';
import { Changepassword } from '../../components/changePassword/changepassword';
import AdminLayout from '../SuppliePages/Layouts/AdminLayout'


const SupplierMagerEditProfile = () => {
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
      navigate('/admin/supplierManagerProfile');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  

  return (
    <AdminLayout>
    <div>
      <center>
        <h1>edit profile</h1>
        <br />
        <Card>
          <span>
            <img src={Profile?.photo} alt="Profile picture" width="200" height="200" />
          </span>
          <form onSubmit={saveProfile}>
            <br />
            <b>Name:</b>
            <input type="text" name="name" value={Profile?.name} onChange={handleInputChange} />
            <br />
            <b>Phone:</b>
            <input type="text" name="phone" value={Profile?.phone} onChange={handleInputChange} />
            <br />
            <b>Photo:</b>
            <input type="file" name="image" onChange={handleImageChange} />
            <br />
            <br />
            <div>
              <button type="submit">Confirm</button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

          </form>
        </Card>
        <br />
        <Changepassword />
        
      </center>
    </div>
    </AdminLayout>
  );
};

export default SupplierMagerEditProfile;
