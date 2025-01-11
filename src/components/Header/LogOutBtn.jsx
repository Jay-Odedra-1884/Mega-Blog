import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logOut } from '../../features/authSlice';

function LogOutBtn() {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        authService.logOut()
        .then(() => {
            dispatch(logOut())
        })
    }

  return (
    <div className='bg-gray-700 duration-300 hover:scale-110 hover:bg-black  px-2 py-1 rounded-lg flex items-center justify-center '>
      <button className='bg-transparent outline-none border-none' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default LogOutBtn
