import React, { useContext } from 'react'
import './navbar.scss'
import { Search, Person, Chat, Notifications, Logout } from "@mui/icons-material"
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_IMAGES_PERSON;
    const LogoutHandle = () => {
        localStorage.clear()
        window.location.reload();
    };
    return (
        <header>
            <div className="navbar fixed-top">
                <div className="navbar-container">
                    <div className="navbar-l">
                        <a className="navbar-brand" href="/#">
                            <span>JOJO</span>
                        </a>
                    </div>
                    <div className="navbar-m">
                        <span className="search-bar">
                            <Search className="search-icon" />
                            <input className="search-input" placeholder="Search for friends or posts" />
                        </span>
                    </div>
                    <div className="navbar-r">
                        <Link to={`/profile/${user.username}`} className="profile-link profile-link-center" >
                            <img src={user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "noAvatar.png"
                            } alt="" className="avatar" />
                            <span>{user.username}</span>
                        </Link>
                        <div className="navbar-icon-item">
                            <Person />
                            <span className="navbar-icon-badge">1</span>
                        </div>
                        <div className="navbar-icon-item">
                            <Chat />
                            <span className="navbar-icon-badge">2</span>
                        </div>
                        <div className="navbar-icon-item">
                            <Notifications />
                            <span className="navbar-icon-badge">1</span>
                        </div>
                        <div className="logout" onClick={LogoutHandle}>
                            <div className="navbar-icon-item">
                                <Logout />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}
