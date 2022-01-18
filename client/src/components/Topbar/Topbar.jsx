import React from 'react'
import './topbar.css';
import {NotificationsNone,Language,Settings } from "@material-ui/icons";

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <div className="logo">Admin</div>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                    <Language/>
                    <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                    <Settings/>
                    <span className="topIconBadge">2</span>
                    </div>
                    <img src="https://www.w3schools.com/w3images/team2.jpg" alt="avatar" className="topAvatar"/>
                </div>
            </div>
        </div>
    )
}
