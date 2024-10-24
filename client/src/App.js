import logo from './logo.svg';
import './App.css';
import User from "./User.js";
import UserList from "./UserList.js";
import EditList from './EditList.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path = "/" element = {<User/>}/>
			<Route path = "/userList" element = {<UserList/>}/> 
			<Route path="/edit/:id" element={<EditList/>} /> {/* Route for editing */}

		</Routes>
	</BrowserRouter>
	
	  );
}

export default App;
