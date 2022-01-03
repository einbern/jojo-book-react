import React, { useContext, useRef, useState } from 'react'
import './share.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { PermMedia, Cancel, VideoLibrary } from "@mui/icons-material"
import axios from "axios";

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_IMAGES_PERSON;
    const [file, setFile] = useState(null);
    const desc = useRef();

    const submitHandle = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + "_" + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;

            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) { }
    }

    return (
        <div className="share">
            <div className="share-container">
                <div className="share-top">
                    <div className='share-text'>
                        <Link to={`/profile/${user.username}`} className='profile-link-center'>
                            <img src={user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "noAvatar.png"
                            } alt="" className="avatar" />
                        </Link>
                        <input placeholder={`What's new, ${user.username}`} ref={desc} />
                    </div>
                    <button type='button' onClick={submitHandle}><div className="share-btn-overlay"></div>Post It!!</button>
                </div>
                <hr className="share-hr" />
                {file && (
                    <div className="share-img-container">
                        <img className="share-img" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="share-cancel-img" onClick={() => setFile(null)} />
                    </div>
                )}
                <div className="share-bottom">
                    <label htmlFor="file" className="share-option">
                        <PermMedia htmlColor="tomato" className="share-icon" />
                        <span>Photo</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onClick={(e) => { e.target.value = null }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <label className="share-option">
                        <VideoLibrary htmlColor="#45bd62" className="share-icon" />
                        <span>Video</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
