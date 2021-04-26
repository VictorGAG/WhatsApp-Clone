import React from 'react';
import './style.css';

import Api from '../../api';

import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import GoogleIcon from '../../google-icon-1.png';
    
export default function Login({onReceive}){

    const handleGoogleLogin = async () => {
        let result = await Api.googlePopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro de login");
        }
    }

    return(
        <div className="login--container">
            <div className="login">
                <div className="login--header">
                    <img className="login--icon" src='https://img.icons8.com/clouds/100/000000/login-rounded-right.png' alt=''/>
                </div>
                <div className="login--buttons" onClick={handleGoogleLogin}>
                    <button className="login--google">
                        <img src={GoogleIcon} alt='' style={{
                            marginRight: '10px',
                            width: '25px',
                            heigth: '25px',
                        }}/>
                        Logar com google</button>
                </div>
                {/* <div className="login--buttons">
                    <button className="login--email">
                    <EmailIcon 
                    style={{
                        marginRight: '10px',
                        width: '30px',
                        heigth: '30px',
                    }}
                    />Logar com email</button>
                </div> */}

                {/* <div className="login--buttons">
                    <button className="login--phone">
                    <PhoneAndroid 
                    style={{
                        marginRight: '10px',
                        width: '30px',
                        heigth: '30px',
                    }}
                    />Logar com celular</button>
                </div> */}

            </div>
        </div>
    );
}