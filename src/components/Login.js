import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        //validate form data
        const message = checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);

        if(message) return;
        if(!isSignInForm) {
            //Sign Up Login
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value , photoURL: "https://avatars.githubusercontent.com/u/40633956?v=4"
                      }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL:photoURL }));
                       
                        
                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                        
                      });
                    console.log(user);
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" +errorMessage);
                });
        }
        else{
            //Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user)
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" +errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className='bg-gradient-to-b from-black' src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/US-en-20250106-TRIFECTA-perspective_65e335d4-6f1e-4d03-8daa-e439fbaaa340_large.jpg"  alt='bg-img' aria-hidden="true" />
        </div>
    <form onSubmit={(e)=>e.preventDefault()} className='w-4/12  absolute  p-12 bg-black my-36 mx-auto right-0 left-0  rounded-lg bg-opacity-80 text-white'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full rounded-sm bg-gray-600' />}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full rounded-sm bg-gray-600' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full rounded-sm bg-gray-600' />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-2 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
    </form>
    </div>
  )
}

export default Login;