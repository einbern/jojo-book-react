import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './rightbar.scss'

export default function Rightbar() {
    const PF = process.env.REACT_APP_IMAGES_PERSON;
    const [friends, setFriends] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + currentUser._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, []);
    return (
        <div className="rightbar">
            <div className="rightbar-container">
                <p className='rightbar-friend-title'>Online Friends</p>
                <ul className="rightbar-list">
                    {friends.map((friend) => (
                        <li className="rightbar-list-item">
                            <div className="rightbar-item-container">
                                <img src={friend.profilePicture
                                    ? PF + friend.profilePicture
                                    : PF + "noAvatar.png"} alt="" className="rightbar-avatar" />
                                <span className="rightbar-online"></span>
                            </div>
                            <span className="rightbar-name">{friend.username}</span>
                            <div className="rightbar-overlay"></div>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    )
}
