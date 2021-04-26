import React, { useState, useEffect } from 'react';
import './style.css';

// import DoneAllIcon from '@material-ui/icons/DoneAll';
    
export default function ChatListItem({onClick, active, data}){

    const [time, setTime] = useState('');

    useEffect(()=>{
        if(data.lastMessageDate > 0){
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();

            hours = hours<10?'0'+hours:hours;
            minutes = minutes<10?'0'+minutes:minutes;
            setTime(hours + ':' + minutes);
        }
    }, [data]);

    return(
        <div 
            className={`container ${active?'active':''}`}
            onClick={onClick}
        >
            <img className="perfil--photo" src={data.image} alt='avatar' />
            <div className="lists">
                <div className="list">
                    <div className="list-name">{data.title}</div>
                    <div className="list-time">{time}</div>
                </div>
                <div className="list">
                    <div className="last-msg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
    
        </div>
    );
}