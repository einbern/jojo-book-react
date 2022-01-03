import { useContext, useEffect, useState } from "react";
import "./post.scss"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { format } from 'timeago.js';
import RecommendIcon from '@mui/icons-material/Recommend';
import axios from "axios";

export default function Post({ post }) {
    const { user: currentUser } = useContext(AuthContext)
    const [user, setUser] = useState({});
    const PFPE = process.env.REACT_APP_IMAGES_PERSON;
    const PFPO = process.env.REACT_APP_IMAGES_POST;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const avatar = {
        width: "44px",
        height: "44px",
    };

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)

        };
        fetchUser();
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        }
        catch (err) { }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="post-container">
                <div className="post-top">
                    <Link to={`/profile/${user.username}`} className='profile-link-center'>
                        <img src={user.profilePicture
                            ? PFPE + user.profilePicture
                            : PFPE + "noAvatar.png"
                        }
                            alt=""
                            className="avatar"
                            style={avatar}
                        />
                    </Link>
                    <div className="post-top-desc">
                        <span className="post-username">
                            {user.username}
                        </span>
                        <span className="post-date">
                            {format(post.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="post-center">
                    {/* <span className="post-text">{post?.desc}</span>
                    <img className="post-img" src={PFPO + post.img} alt="" /> */}
                    <span className="post-text">{post.desc}</span>
                    {post.img && <img className="post-img" src={PFPO + post.img} alt="" />}
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-l" onClick={likeHandler}>
                        <RecommendIcon htmlColor='#4267B2' className="like-icon" />
                        <span className='like-count'>{like} people</span>
                    </div>
                    <div className="post-bottom-r">
                        <span>{post.comment ? post.comment : 0} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
