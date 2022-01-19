import React, { useContext, useEffect, useState } from 'react'
import './sidebar.scss'
import {
    Person,
    Chat,
} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Sidebar() {
    const { user: currentUser } = useContext(AuthContext);
    const [notFriends, setNotFriends] = useState([]);
    const PF = process.env.REACT_APP_IMAGES_PERSON;

    useEffect(() => {
        const fetchNotFriends = async () => {

            const res = await axios.get(`/users/notfriends/${currentUser._id}`)
            setNotFriends(res.data)
        };
        fetchNotFriends();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <ul className="sidebar-list">
                    <Link className="sidebar-link" to={`/friend`} >
                        <li className="sidebar-list-item">
                            <Person className="sidebar-icon" />
                            <span className="sidebar-list-item-text">Friends</span>
                            <div className="sidebar-overlay"></div>
                        </li>
                    </Link>
                    <Link className="sidebar-link" to={`/messenger`} >
                        <li className="sidebar-list-item">
                            <Chat className="sidebar-icon" />
                            <span className="sidebar-list-item-text">Chats</span>
                            <div className="sidebar-overlay"></div>
                        </li>
                    </Link>
                </ul>
                <hr className="sidebar-hr" />
                <p className='sidebar-friend-title'>Suggested Friends</p>
                <ul className="sidebar-list">
                    {notFriends.map((notFriend) => (
                        <Link className="sidebar-link" to={`/profile/${notFriend.username}`} >
                            <li className="sidebar-list-item">
                                <img src={notFriend.profilePicture
                                    ? PF + notFriend.profilePicture
                                    : PF + "noAvatar.png"} alt="" className="avatar" />
                                <span>{notFriend.username}</span>
                                <div className="sidebar-overlay"></div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div >
    )
}
