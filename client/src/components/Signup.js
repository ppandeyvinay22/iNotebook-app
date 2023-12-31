import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;    //Destructuring kia hai iss line me

    // API Call
<<<<<<< HEAD
    const response = await fetch("inotebook-app-mern.vercel.app/api/auth/createuser", {
=======
    const response = await fetch("https://inotebook-app-mern.vercel.app/api/auth/createuser", {
>>>>>>> 1ea9b2fd176ad24ef2ef5e11bf89d2590f5df7ae
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //Save the authtoken and redirect.
      localStorage.setItem('auth-token', json.authToken);
      navigate('/');
      props.showAlert("Account created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container mt-2'>
      <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
