import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className='bg-gradient-to-b from-black' src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/US-en-20250106-TRIFECTA-perspective_65e335d4-6f1e-4d03-8daa-e439fbaaa340_large.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/US-en-20250106-TRIFECTA-perspective_65e335d4-6f1e-4d03-8daa-e439fbaaa340_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/US-en-20250106-TRIFECTA-perspective_65e335d4-6f1e-4d03-8daa-e439fbaaa340_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/US-en-20250106-TRIFECTA-perspective_65e335d4-6f1e-4d03-8daa-e439fbaaa340_small.jpg 959w" alt='bg-img' aria-hidden="true" class="default-ltr-cache-19j6xtr"/>
        </div>
    <form className='w-4/12  absolute  p-12 bg-black my-36 mx-auto right-0 left-0  rounded-lg bg-opacity-80 text-white'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full rounded-sm bg-gray-600' />}
        <input type='text' placeholder='Email Address' className='p-4 my-4 w-full rounded-sm bg-gray-600' />
        <input type='text' placeholder='Password' className='p-4 my-4 w-full rounded-sm bg-gray-600' />
        <button className='p-2 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
    </form>
    </div>
  )
}

export default Login;