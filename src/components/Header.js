import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser,removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGO } from '../utils/constant';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=> store.user);

  useEffect(() => {
    //handle user store update
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const { uid, email, displayName,photoURL} = user;
            //update my store for sign in case
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL:photoURL }));
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
        }
    });

    //unsubscribe when header component unmounts
    return () => unsubscribe();

}, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful

    }).catch((error) => {
      navigate("/error");
    });
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={LOGO} alt='logo' />
      {/* load this portion only when user logged in */}
      {user && <div className='flex p-2'>
        <img className="w-12 h-12" alt="user_icon" src={user.photoURL} />
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>}

    </div>
    
  )
}

export default Header;