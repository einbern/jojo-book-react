import Navbar from '../../components/navbar/Navbar'
import './friend.scss'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';

export default function Friend() {
    const username = useParams().username;
    const PF = process.env.REACT_APP_IMAGES_PERSON;
    const [friends, setFriends] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {

        if (username === undefined) {
            const getFriends = async () => {
                try {
                    const friendList = await axios.get("/users/friends/" + currentUser._id);
                    setFriends(friendList.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getFriends();         
        } else {
            const getFriends = async () => {
                try {
                    const res = await axios.get("/users?username=" + username);
                    let array = [];
                    array.push(res.data)
                    setFriends(array);
                } catch (err) {
                    console.log(err);
                }
            };
            getFriends();   
        }


    }, []);

    return (
        <>
            <Navbar />
            <div className="friend">
                <div className="friend-container">
                    {friends.length > 0 ? friends.map((friend) => (
                        <Link className="sidebar-link" to={`/profile/${friend.username}`} >
                            <div class="card">
                                <div class="card__header">
                                    <img src={friend.profilePicture
                                        ? PF + friend.profilePicture
                                        : PF + "noAvatar.png"} alt="" className="rightbar-avatar" alt="card__image" class="card__image" />
                                </div>
                                <div class="card__body">
                                    <h4>{friend.username}</h4>
                                </div>
                            </div>
                        </Link>
                    )) : <h1>Not found user: {username}</h1>}

                </div>
            </div>
        </>
    )
}
