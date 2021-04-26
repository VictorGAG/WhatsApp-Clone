import React, { useState ,useEffect } from 'react';
import './style.css';

export default function MessageItem({data, user}) {

  const [time, setTime] = useState('');

  useEffect(()=>{
      if(data.date > 0){
          let d = new Date(data.date.seconds * 1000);
          let hours = d.getHours();
          let minutes = d.getMinutes();

          hours = hours<10?'0'+hours:hours;
          minutes = minutes<10?'0'+minutes:minutes;
          setTime(hours + ':' + minutes);
      }
  }, [data]);

  let isMy = () => {
    if (data.author === user.id){
      isMy = true;
    }else{
      isMy = false;
    }
  }

  isMy();

  return (
      <div
        className="menssage--line"
        style={{
          justifyContent: isMy ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          className="menssage--item"
          style={{
            backgroundColor: isMy ? '#DCF8C6' : '#FFF',
          }}
        >
          <div className="menssage--text">{data.body}</div>
          <div className="menssage--time">{time}</div>
        </div>
      </div>
  );
}