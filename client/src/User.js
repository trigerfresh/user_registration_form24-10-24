import React, {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const User = ()=>{
	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [category, setCategory] = useState('');
	const [isFeatured, setIsFeatured] = useState(false); // Checkbox for Featured
	const [isPublic, setIsPublic] = useState(false); // Checkbox for Public
	const [image, setImage] = useState(null);

	const hImageChange = (e)=>{
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e)=>{
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('gender', gender);
		formData.append('category', category);	
		formData.append('isFeatured', isFeatured); // Append isFeatured to form data
    		formData.append('isPublic', isPublic); // Append isPublic to form data
		formData.append('image', image);
	
	try{
		await axios.post('http://localhost:5000/upload', formData);	
		console.log(formData)
		alert("Image uploaded successfully!");
		setName("");
		setGender("");
		setCategory('');
		setIsFeatured(false); // Clear Featured checkbox
		setIsPublic(false); // Clear Public checkbox
		setImage(null);
	}catch(error){
		console.error("Error uploading image : ",   error);
		alert("Failed to load data");
	}
	};
	
	return(
			
		<div>
		<center>
		<h1>User Registraion Form</h1>
		<form onSubmit = {handleSubmit}>
			<input type = "text" value = {name} onChange = {(e)=>setName(e.target.value)} placeholder = "Enter name"/>
			<div>
				<label><input type = "radio" value = "male" checked = {gender === 'male'} onChange = {(e)=>setGender(e.target.value)} required/>Male</label>
				<label><input type = "radio" value = "female" checked = {gender === 'female'} onChange = {(e)=>setGender(e.target.value)} required/>Female</label>
			</div>

			
			<select value={category} onChange={(e) => setCategory(e.target.value)} required>
        			<option value="" disabled>Select a category</option>
        			<option value="Nature">Nature</option>
        			<option value="People">People</option>
        			<option value="Architecture">Architecture</option>
        			<option value="Animals">Animals</option>
      			</select>

			<div>
        			<label><input type="checkbox" checked={isFeatured} onChange={() => setIsFeatured(!isFeatured)}/>Featured </label>
      			
        			<label><input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)}/>Public</label>
      			</div>

			
			<input type = "file" onChange = {hImageChange} required/>
			<button type = "submit">Save</button>
		</form>
		<Link to = "/userList">View User Data</Link>
		</center>	
		</div>
	)
}

export default User;