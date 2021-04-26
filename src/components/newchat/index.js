import React, { useState, useEffect } from 'react';
import './style.css'

import Api from '../../api';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function NewChat({show, setShow, user}) {

    const [list, setList] = useState([]);
    const [newChatId, setChatId ] = useState();

    useEffect(() =>{
        
    const getList = async () => {
        if(user !== null) {
            let results = await Api.getContactList(user.id);
            setList(results);
        }
    }
    getList();
        
    }, [user]);

    const addNewChat = async (user2, newChatId, setChatId) =>{
        await Api.addNewChat(user, user2, newChatId, setChatId);

        DisableNewChat();
    }

    function DisableNewChat(){
        setShow(false);
    }

    return (
        <div
            className="newChat"
            style={{
                left:show?'0':'-440px',
            }}
        >
            <div className='newChat--head'>
                <div className="newChat--backbtn">
                    <ArrowBackIcon onClick={DisableNewChat}/>
                </div>
                <div className="newChat--title">Nova conversa</div>
            </div>
            <div className='newChat--list'>
                 {list.map((item, key)=>(
                     <div onClick={()=>addNewChat(item)} className="newChat--item" key={key}>
                        <img className='item--avatar' src={item.avatar} alt='avatar' />
                        <div className='item--name'>{item.name}</div>
                     </div>
                 ))}
            </div>
        </div>
    )
}