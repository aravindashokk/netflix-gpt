import React, { useEffect } from 'react'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",  //only when authenticated
            element: <Browse />,
        },
    ]);


    useEffect(() => {
        //handle user store update
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName,photoURL} = user;
                //update my store for sign in case
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL:photoURL }));
            } else {
                // User is signed out
                dispatch(removeUser());
            }
        });
    }, [])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body