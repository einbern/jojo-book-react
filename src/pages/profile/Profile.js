import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Feed from '../../components/feed/Feed';
import ProfileEditInfoModal from '../../components/modal/ProfileEditInfoModal';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './profile.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { CloudSyncTwoTone } from '@mui/icons-material';

export default function Profile() {
    const username = useParams().username;
    const [user, setUser] = useState({});
    const PFPE = process.env.REACT_APP_IMAGES_PERSON;
    const [open, setOpen] = useState(false);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const profileInputFile = useRef(null)
    const coverInputFile = useRef(null)
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
            setFollowed(() => currentUser.followings.includes(res.data._id));

        };
        fetchUser();
    }, [])


    const openModal = () => {
        setOpen(true);
        document.body.style.overflow = "hidden";
    }

    const closeModal = () => {
        setOpen(false);
        document.body.style.overflow = "visible";
    }

    const setImg = async (file, type) => {
        const userData = {
            userId: user._id,
        };


        const data = new FormData();
        const fileName = Date.now() + "_" + file.name;
        data.append("name", fileName);
        data.append("file", file);

        type === 'profile' ? userData.profilePicture = fileName : userData.coverPicture = fileName;

        try {
            await axios.post("/upload/person", data);

            try {
                await axios.put(`/users/${currentUser._id}`, userData);
                window.location.reload();
            } catch (err) { console.log(err) }

        } catch (err) { console.log(err) }

    }

    const changeProfileImg = () => {
        currentUser._id === user._id && profileInputFile.current.click()
    };

    const changeCoverImg = () => {
        currentUser._id === user._id && coverInputFile.current.click()
    };

    const followClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="profile-container">
                    <div className="profile-top">
                        <div className="profile-cover">
                            <img onClick={changeCoverImg} className='cover-img' src={user.coverPicture ? PFPE + user.coverPicture : PFPE + '/gray-bg.jpg'} alt='' />
                            <input
                                ref={coverInputFile}
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onClick={(e) => { e.target.value = null }}
                                onChange={(e) => setImg(e.target.files[0], "cover")}
                            />
                            <img onClick={changeProfileImg} className='profile-img' src={user.profilePicture ? PFPE + user.profilePicture : PFPE + "noAvatar.png"} alt='' />
                            <input
                                ref={profileInputFile}
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onClick={(e) => { e.target.value = null }}
                                onChange={(e) => setImg(e.target.files[0], "profile")}
                            />
                        </div>
                        <h1 className="profile-name">{user.username}</h1>
                        {currentUser._id !== user._id &&
                            <div className="profile-top-desc">
                                <button className="follow-btn" onClick={followClick}>
                                    {followed ? <CancelIcon className="follow-btn-icon" /> : <AddCircleIcon className="follow-btn-icon" />}
                                    {followed ? "Following" : "Follow"}
                                    <div className="profile-btn-overlay"></div>
                                </button>
                            </div>
                        }

                    </div>
                    <div className="profile-center">
                        <div className="profile-info">
                            <h3 className='profile-info-desc'>About Me</h3>
                            <p className='profile-info-desc'>Name : {user.username}</p>
                            <p className='profile-info-desc'>University : {user.university ? user.university : "-"}</p>
                            <p className='profile-info-desc'>City : {user.city ? user.city : "-"}</p>
                            <p className='profile-info-desc'>From : {user.from ? user.from : "-"}</p>
                            <p className='profile-info-desc'>Relationship : {!user.relationship ? "-" : user.relationship === 1 ? "Single" : user.relationship === 2 ? "In a relationship" : "It’s complicated"}</p>
                            <div className="profile-info-bottom">
                                {currentUser._id === user._id &&
                                    <button className='profile-btn' onClick={openModal}>
                                        Edit Your Information
                                        <div className="profile-btn-overlay"></div>
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="profile-feed">
                            <Feed username={username} />
                        </div>
                    </div>
                </div>
            </div>
            {open && <ProfileEditInfoModal onBgClick={closeModal} user={user} />}
        </>
    )
}
