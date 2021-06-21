import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'pusher';
import Messages from './dbMessages.js';

const app = express();
const port = process.env.PORT || 9000;
const connection_url = 'mongodb+srv://admin:miraz2002@cluster0.ybzrz.mongodb.net/whatsapp?retryWrites=true&w=majority'

app.use(express.json());
app.use(cors());

const pusher = new Pusher({
  appId: "1219876",
  key: "bb8d3c9bced8cc6daf61",
  secret: "8ddeed8a48c1e7c720c2",
  cluster: "ap2",
  useTLS: true
});


//=====
//mongodb connection
//======

mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection ;

db.once('open',()=>{
    console.log('db is connected');

//=======
 //For realtime chat
//=======

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        if(change.operationType==='insert'){
            const messageDetails = change.fullDocument;
            
        pusher.trigger("messages", "inserted", 
        {
            name: messageDetails.user,
            message: messageDetails.message
        });
        }else{
            console.log('someting is happend');
        }
    })
})

//=====
// api
//=====
app.get('/',(req,res)=>{
    res.status(201).send('hello world');
});
app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }      
    })
})
app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body ;

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })

})
//=====
//listener
//=====
app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})


