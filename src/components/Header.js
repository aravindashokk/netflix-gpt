import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useEffect(() => {
    //handle user store update
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        //update my store for sign in case
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
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

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful

    }).catch((error) => {
      navigate("/error");
    });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  md:justify-between'>
      <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='logo' />
      {/* load this portion only when user logged in */}
      {user && <div className='flex p-2 justify-between'>
        {showGptSearch && (<select onChange={handleLanguageChange} className='p-2 m-2 bg-gray-900 text-white rounded-lg'>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>)}
        <button onClick={handleGptSearchClick} className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'>
          {showGptSearch ? "Home" : "GPT Search"}
        </button>
        <img className="hidden m:block w-12 h-12 p-2" alt="user_icon" src={user.photoURL} />
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>}

    </div>

  )
}

export default Header;