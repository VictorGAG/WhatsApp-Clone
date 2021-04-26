import React from 'react';
import './style.css';

import ComputerIcon from '@material-ui/icons/Computer';

export default function ChatIntro(){
    return(
        <div className="chatIntro">
            <img src='https://professor-falken.com/wp-content/uploads/2017/07/Como-usar-WhatsApp-desde-el-navegador-web-en-tu-ordenador-professor-falken.com_.jpg' alt='' />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conecta ao seu telefone para sincronizar suas mensagens.<br/>Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-fi.</h2>
            <div className="chatIntro--info">
                <ComputerIcon className="computerIcon" iconSize="small" style={{color: '#919191'}}/>
                <h2>O WhatsApp está disponível para Windows. <a href="https://localhost:3000">Obtenha-o aqui</a></h2>
            </div>
        </div>
    );
}