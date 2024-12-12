import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/auth'
import  {logout} from '../../store/authslice'
import { useNavigate } from 'react-router-dom'
function Logoutbtn({ onClick}) {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logouthandler = () => {
        authServices.logout().then(() => {
            dispatch(logout())
            // Call onClick prop to close the menu if needed
            if (onClick) onClick();
            navigate('/'); 
        }).catch(err => {
            console.error("Logout failed:", err?.message || "An error occurred");
        })

    }
    return (
        <button
        className='inline-bock duration-200 rounded-lg'
        onClick={logouthandler}> 
            Logout
        </button>
    )
}

export default Logoutbtn
