import React from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton,Avatar,TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Sidebar.css'
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                    <Avatar 
                        src='https://images.pexels.com/photos/7051010/pexels-photo-7051010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                        <IconButton>
                    <ChatIcon />
                        </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                      <TextField id="standard-basic" label="Search Your chat" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
