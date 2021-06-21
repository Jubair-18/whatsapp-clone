import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages]=useState([]);
  useEffect(()=>{
    axios.get('/messages/sync').then(
      (res)=>{
          setMessages(res.data);
      }
    )
  },[])

  useEffect(()=>{
    var pusher = new Pusher('bb8d3c9bced8cc6daf61', {
      cluster: 'ap2'
    },);

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=> {
      setMessages([...messages,data])
    });
   return()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }
  },[messages])
  return (
    <div className="App">
        <div className="app__body">
          <Sidebar />
          <Chat messages={messages}/>
        </div>
    </div>
  );
}

export default App;
