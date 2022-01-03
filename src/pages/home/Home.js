import React from 'react'
import Feed from '../../components/feed/Feed'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import './home.scss'

export default function Home() {
    return (
        <>
        <Navbar/>
        <main role="main">
            <div className="home-container">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </main>
        </>
    )
}
