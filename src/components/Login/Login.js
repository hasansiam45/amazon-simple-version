import React, {useContext,useState} from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';



function Login() {

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
       handleResponse(res, true);
    })
  }
  
  const fbSignIn = () => {
    handleFbSingIn()
      .then(res => {
        console.log(res)
        handleResponse(res, true);
    })
  }
  
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }


  const handleBlur = (evt) => {
    let isFieldValid = true;

    if (evt.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(evt.target.value);
    }
    if (evt.target.name === 'password') {
      const isPasswordValid = evt.target.value.length > 6;
      const hasPasswordNum = /\d{1}/.test(evt.target.value);
      isFieldValid = isPasswordValid && hasPasswordNum;
    }
    if (isFieldValid) {
      const newUserInfo = {
        ...user
      };
      newUserInfo[evt.target.name] = evt.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
        handleResponse(res, true);
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
       .then(res => {
        handleResponse(res, true);
       })
    }
    e.preventDefault();
  }



 

  return (
    <div style={{textAlign:"center"}}>

    {
      user.isSignedIn ? < button onClick = {signOut} > Sign Out </button> : <button onClick={googleSignIn}>Sign In Using Google</button >
      }
      
      <br/>

    <button onClick={fbSignIn}>Sign In Using Facebook</button>

    {
      user.isSignedIn && <div>
        <p> Welcome: {
          user.name
        } </p>
        <img src={user.photo}alt = "" / >
        </div>
    }

    <h1> Our Own Authentication </h1>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User? Sign Up</label>

    <form onSubmit = {handleSubmit} >
    {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" required />}<br/>     
    <input type = "text"onBlur = {handleBlur}name = "email"placeholder = "Your Email"required / > < br / >
    <input type = "password" onBlur = { handleBlur}name = "password"placeholder = "Your Password"required / > < br / >
    <input type = "submit"value = {newUser ? 'Sign up' : 'Sign in'} / >
    </form>

      <p style={{ color: 'red' }} > {user.error} </p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully!</p>
      }

    </div>
  );
}

export default Login;