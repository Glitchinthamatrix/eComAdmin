import React from 'react'
import './sidebar.css';
import {Link} from 'react-router-dom';
import {Home,Category,Image, TrendingUp,Person,RoomService,AttachMoney,BarChart,Email,Feedback,Chat,Report,Work} from '@material-ui/icons';
import './sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrappper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                           <Home className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/">Home</Link>
                        </li>
                        <li className="sidebarListItem">
                           <Category className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/categories">Category</Link>
                        </li>
                        <li className="sidebarListItem">
                           <Image className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/images">Images</Link>
                        </li>
                    </ul>
                    
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Links</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                           <Person className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/users">users</Link>
                        </li>
                        <li className="sidebarListItem">
                           <RoomService className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/products">Products</Link>
                        </li>
                        <li className="sidebarListItem">
                           <AttachMoney className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/transactions">Transactions</Link>
                        </li>
                        <li className="sidebarListItem">
                           <BarChart className="sidebarIcon"/><Link style={{textDecoration:"none",color:'black'}} to="/reports">Reports</Link>
                        </li>
                    </ul>
                    
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                           <Email className="sidebarIcon"/>Mail
                        </li>
                        <li className="sidebarListItem">
                           <Feedback className="sidebarIcon"/>Feedback
                        </li>
                        <li className="sidebarListItem">
                           <Chat className="sidebarIcon"/>Message
                        </li>
                    </ul>
                    
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                           <Work className="sidebarIcon"/>Manage
                        </li>
                        <li className="sidebarListItem">
                           <TrendingUp className="sidebarIcon"/>Analytics
                        </li>
                        <li className="sidebarListItem">
                           <Report className="sidebarIcon"/>Report
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}
