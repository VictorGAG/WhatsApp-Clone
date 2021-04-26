import React, { useState, useEffect } from 'react';
import './style.css';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import NewChat from '../newchat';
import ChatListItem from '../chatlistitem';
import ChatIntro from '../chatintro';
import ChatWindow from '../chatwindow';
import UserInfo from '../userinfo';

import Login from '../login';
import Api from '../../api';

export default function Whatsapp() {

    const [chatlist, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState({});
    const [user, setUser] = useState(null);
    const [showNewChat, setShowNewChat] = useState(false);
    const [showUser, setShowUser ] = useState(false);

    useEffect(()=>{
        if(user !== null){
            let unsub = Api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user]);

    function ShowNewChat(){
        setShowNewChat(true);
    }

    function handleUserInfo(){
        setShowUser(true);
    }

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL,
        }
        await Api.addUser(newUser);
        setUser(newUser);
    }


    if(user === null) {
        return(<Login onReceive={handleLoginData}/>)
    }

    

    return (
        <div className="wrapper">
        <div className="sidebar">
            <UserInfo 
                user={user}
                showUser={showUser}
                setShowUser={setShowUser}
            />
            <NewChat 
                chatList={chatlist}
                user={user}
                show={showNewChat}
                setShow={setShowNewChat}
            />
            <header>
                <img onClick={handleUserInfo} src={user.avatar} alt='avatar' />
                <div className='header--buttons'>
                    <div className='button'>
                        <DonutLargeIcon style={{color: '#919191'}}/>
                    </div>
                    <div className='button'>
                         <ChatIcon onClick={ShowNewChat} style={{color: '#919191'}}/>
                    </div>
                    <div className='button'>
                        <MoreVertIcon style={{color: '#919191'}}/>
                    </div>
                </div>
            </header>

            <div className="search">
                <div className='search--input'>
                    <SearchIcon fontSize="small" style={{color: '#919191'}}/>
                    <input type="search" placeholder="Pesquisar ou começar uma nova conversa" />
                </div>
            </div>

            <div className="chatlist">
                {chatlist.map((item, key) => (
                    <ChatListItem 
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatlist[key].chatId}
                            onClick={()=> setActiveChat(chatlist[key])}
                        />
                    ))}
                </div>

            </div>

            <div className="contentArea">
                {activeChat.chatId !== undefined &&
                    <ChatWindow 
                        user={user}
                        data={activeChat}
                    />
                }
                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }
            </div>

        </div>
    );
}

