import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const UserList = ()=>{
	const [images, setImages] = useState([]);
		
	useEffect(()=>{
		const fetchImages = async()=>{
		try{
			const response = await axios.get('http://localhost:5000/images');
			setImages(response.data);
		}catch(error){
			console.error("Error fetching data : ", error);
		}
	};
	fetchImages();
	}, [])

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this image?')) {
      		try {
        		await axios.delete(`http://localhost:5000/images/${id}`);
        		setImages(images.filter(image => image._id !== id)); // Update the state to remove the deleted image
        		alert('Image deleted successfully!');
      		} catch (error) {
        		console.error('Error deleting image:', error);
        		alert('Failed to delete image.');
      		}
    		}
  	};


	return(
	<div>
		<center>
		<h1>User Data</h1>
		<table border = "5">
			<thead>
				<tr>
					<th>Name</th>
					<th>Gender</th>
					<th>Category</th>
					<th>Featured</th>
					<th>Public</th>
					<th>Image</th>
				</tr>
			</thead>
			<tbody>
				{images.map((images)=>(
					<tr key = {images._id}>
						<td>{images.name}</td>
						<td>{images.gender}</td>
						<td>{images.category}</td>
						<td>{images.isFeatured ? 'Yes' : 'No'}</td>
						<td>{images.isPublic ? 'Yes' : 'No'}</td>
						<td><img src = {`http://localhost:5000/${images.imagePath}`} alt = {images.name} style = {{ width : '50px' }}/></td>
						<td><Link to={`/edit/${images._id}`}>Edit</Link> {/* Link to edit */}
						<button onClick={() => handleDelete(images._id)} style={{ marginLeft: '10px' }}>Delete</button></td>
					</tr>
				))}
			</tbody>
		</table>
		<Link to = "/">Home</Link>
		</center>
	</div>
	)
}

export default UserList;