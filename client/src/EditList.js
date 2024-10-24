// src/EditImage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditList = () => {
  const { id } = useParams();
  const history = useNavigate();
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(name){
    formData.append('name', name);
    }
    if(gender){
    formData.append('gender', gender);
    }
    if(category){
    formData.append('category', category);
    }
    if(isFeatured){
    formData.append('isFeatured', isFeatured);
    }
    if(isPublic){
    formData.append('isPublic', isPublic);
    }
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/images/${id}`, formData);
      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating the data:', error);
      alert('Failed to update data.');
    }
  };

  return (
    <div>
      <h2>Edit Image</h2>
      {currentImage && <img src={`http://localhost:5000/${currentImage}`} alt="Current" style={{ width: '100px' }} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            Female
          </label>
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>Select a category</option>
          <option value="Nature">Nature</option>
          <option value="People">People</option>
          <option value="Architecture">Architecture</option>
          <option value="Animals">Animals</option>
        </select>

        <input type="file" onChange={handleImageChange} />

        <div>
          <label>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={() => setIsFeatured(!isFeatured)}
            />
            Featured
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            Public
          </label>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditList;
