import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import MessageItem from '../messageitem';
import './style.css';


import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';  
import AttachmentIcon from '@material-ui/icons/Attachment';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

import Api from '../../api';

export default function ChatWindow({user, data}){

    const body = useRef();

    const [emojiList, setEmojiList] = useState();
    const [savedMessage, setSavedMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [users, setUsers] = useState([]);


    useEffect(()=> {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [messageList]);

    useEffect(()=>{
        setMessageList([]);
        let unsub = Api.onChatContent(data.chatId, setMessageList, setUsers);
        return unsub;
    }, [data.chatId]);

    const handleEmojiClick = (e, emojiObject) => {
        setSavedMessage( savedMessage + emojiObject.emoji);
    }

    const handleEmojiList = () => {
       emojiList ? setEmojiList(false) : setEmojiList(true)
    }

    const handleSendClick = () => {
        if(savedMessage !== ''){
            Api.sendMessage(data, user.id, 'text', savedMessage, users);
            setSavedMessage('');
            setEmojiList(false);
        }
    }

    const handleInputKeyUp = (e) => {
        if(e.keyCode === 13){
            handleSendClick();
        }
    }

    return(
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className='chatWindow--info'>
                     <img className="chatWindow--avatar" src={data.image} alt='' />
                     <div className="chatWindow--name">{data.title}</div>
                </div>

                <div className='chatWindow--buttons'>
                    <div className='chatWindow--btn'>
                         <SearchIcon style={{color: '#919191'}} />
                    </div>
                    <div className='chatWindow--btn'>
                         <MoreVertIcon style={{color: '#919191'}} />
                    </div>
                </div>
            </div>

            <div ref={body} className='chatWindow--body'>
                 {messageList.map((item, key) => (
                     <MessageItem 
                        key={key}
                        data={item}
                        user={user}
                     />
                 ))}
            </div>

            <div className="emojiArea" style={{height: emojiList ? '200px' : '0px'}}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    groupNames={{
                        smileys_people: 'Pessoas',
                        animals_nature: 'Animais',
                        food_drink: 'Comidas',
                        travel_places: 'Viagem',
                        activities: 'Atividades',
                        objects: 'Objetos',
                        symbols: 'Simbolos',
                        flags: 'Bandeiras',
                        recently_used: 'Usados recentemente',
                      }}
                    
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className='chatWindow--footer'>
                <div className="chatWindow--left">
                    <div
                        className="chatWindow--btn"
                        onClick={handleEmojiList}
                        style={{
                            width: emojiList ? '40px' : '0px',
                        }}
                    >
                        <CloseIcon style={{color: '#919191', fontSize: '32px'}}/>
                    </div>

                    <div
                        className="chatWindow--btn"
                        onClick={handleEmojiList}
                    >
                        <InsertEmoticonIcon style={{color: emojiList ? '#009688' : '#919191', fontSize: '32px'}}/>
                    </div>

                    <div
                        className="chatWindow--btn"
                    >
                        <AttachmentIcon className="AttachIcon" style={{color: '#919191', fontSize: '32px', cursor: 'pointer'}}/>
                    </div>

                </div>

                 <div className="chatWindow--inputArea">
                    <input
                        className="chatWindow--input"
                        type="text"
                        placeholder="Digite uma Messagem"
                        value={savedMessage}
                        onChange={e=>setSavedMessage(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                 </div>
                 <div className="chatWindow--right">

                    {savedMessage !== '' && 
                        <div className="chatWindow--btn" >
                            <SendIcon onClick={handleSendClick} style={{color: '#919191', fontSize: '30px'}}/>
                        </div>
                    }
                    {savedMessage === '' && 
                     <div className="chatWindow--btn" >
                        <MicIcon  style={{color: '#919191', fontSize: '30px'}}/>
                     </div>
                    }
                 </div>
            </div>
        </div>
    );
}