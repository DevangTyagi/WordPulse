import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/auth'
import  {logout} from '../../store/authslice'
function Logoutbtn() {
    const dispatch = useDispatch()
    const logouthandler = () => {
        authServices.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <div
        className='inline-bock duration-200 rounded-lg'
        onClick={logouthandler}> 
            Logout
        </div>
    )
}

export default Logoutbtn
