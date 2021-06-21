import React, { useState } from 'react'
import {Avatar, IconButton,Button,TextField} from '@material-ui/core'
import {AttachFile,MoreVert} from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import axios from './axios';

function Chat({messages}) {
    const [input, setInput] =  useState('')

    const sendMessage = async (e) =>{
        e.preventDefault();

       await axios.post('/messages/new',{
            message: input,
            name: "Miraz",
        }).then((response) => {
             console.log(response);
            }).catch((error) => {
             console.log(error);
        })
        setInput('');
    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                {messages.map((message) =>(
                    <p className='chat__message'>
                        <span className='chat__name'>{message.name}</span>
                
                            {message.message}
                
                        <span className='chat__timestamp'>{
                            new Date().toUTCString()}</span>
                    </p>
            ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <TextField value={input} id="standard-basic" onChange={(e) => setInput(e.target.value)} label="Enter a message" />
                    <Button onClick={sendMessage} type='submit'>Send</Button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
