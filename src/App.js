import React, { useState } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {

  const provider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })

  const handleSignIn = () =>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {

      const {displayName, email, photoURL} = result.user;
      
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }

      setUser(signedInUser);

    }).catch((error) => {
      const errorMessage = error.message;
    });
    }

    // Sign Out

    const handleSignOut = () => {
      firebase.auth().signOut()
      .then((result) => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
        }
        setUser(signedOutUser);
      })
      .catch((error) => {
        // An error happened.
      });
    }

    // Manual Login Sign Up

    const handleBlur = (e) => {

      let isFieldValid = true;

      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <h3>Login Sign Up with Google Section</h3>

            {
              user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
            }

            {
              user.isSignedIn && 
              <div>
                <img style={{width: '40px', borderRadius: '50%'}} src={user.photo} alt=""/>{user.name}
              </div>
            }


            {/* Manual Login Sign Up */}

            <h3>Manual Login Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <input onBlur={handleBlur} type="email" name="email" placeholder="Email" required/>
              <br/>
              <input onBlur={handleBlur} type="password" name="password" placeholder="Password" required/>
              <br/>
              <input type="submit" value="Submit"/>
            </form>
            <p style={{color: 'red'}}>{user.error}</p>
            {
              user.success && <p style={{color: 'green'}}>User Created Successfully</p>
            }
        </header>
      </div>
    );
}

export default App;
