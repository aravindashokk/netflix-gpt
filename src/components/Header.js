import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser,removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';



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
      <img className='w-44' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo' />
      {/* load this portion only when user logged in */}
      {user && <div className='flex p-2'>
        <img className="w-12 h-12" alt="user_icon" src={user.photoURL} />
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>}

    </div>
    
  )
}

export default Header;