import React from 'react';
import './style.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';

export default function UserInfo({user, showUser, setShowUser}) {

    function handleUserInfo(){
        setShowUser(false);
    }

    return (
        <div
            className="userInfo"
            style={{
                left:showUser ?'0':'-440px',
            }}
        >
            <div className='userInfo--head'>
                <div className="userInfo--backbtn">
                    <ArrowBackIcon onClick={handleUserInfo}/>
                </div>
                <div className="userInfo--title">Perfil</div>
            </div>
            <div className="userInfo--photo">
                <img className='photo' src={user.avatar} alt='avatar' />
            </div>
            <div className="userInfo--name">
                <div className="name--title">Nome</div>
                <div className="name--info">
                    <div className="name">{user.name}</div>
                    <CreateIcon className="name--icon" style={{color: '#919191'}}/>
                </div>
            </div>
            <div className="space">
                <div className="space--text">Esse não é seu nome de usuário e nem seu PIN. Esse nome será visível para seus contatos do WhatsApp.</div>  
            </div>
            <div className="scraps">
                <div className="name--title">Recado</div>
                <div className="name--info">
                    <div className="name">14 02 19</div>
                    <CreateIcon className="name--icon" style={{color: '#919191'}}/>
                </div>
            </div>
        </div>
    )
}