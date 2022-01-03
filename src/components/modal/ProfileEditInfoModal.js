import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './profileEditInfoModal.scss'

export default function ProfileEditInfoModal(props) {
    const { onBgClick, user } = props;
    const { user: currentUser } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        university: user.university || '',
        city: user.city || '',
        from: user.from || '',
        relationship: user.relationship || ''
    });

    const handleClick = async (e) => {
        e.preventDefault();
        const userData = {
            userId: user._id,
            university: userInfo.university,
            city: userInfo.city,
            from: userInfo.from,
            relationship: userInfo.relationship
        };

        try {
            await axios.put(`/users/${currentUser._id}`, userData);
            window.location.reload();

        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className="profile-editinfo-modal">
            <div className="profile-editinfo-bg" onClick={onBgClick}></div>
            <div className="profile-editinfo-box">
                <form onSubmit={handleClick}>
                    <div className="form-group">
                        <label htmlFor="university">University</label>
                        <input type="text" id="university" placeholder="Enter your university" className="form-control" value={userInfo.university} onChange={(e) => setUserInfo({ ...userInfo, university: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" placeholder="Enter your city" className="form-control" value={userInfo.city} onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="from">from</label>
                        <input type="text" id="from" placeholder="Enter your from" className="form-control" value={userInfo.from} onChange={(e) => setUserInfo({ ...userInfo, from: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="relationship">Relationship</label>
                        <select id="relationship" className="form-control" value={userInfo.relationship} onChange={(e) => setUserInfo({ ...userInfo, relationship: e.target.value })}>
                            <option disabled value="">Select your relation</option>
                            <option value="1">Single</option>
                            <option value="2">In a relationship</option>
                            <option value="3">It’s complicated</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className='profile-editinfo-btn'>
                            Update
                            <div className="profile-editinfo-btn-overlay"></div>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
