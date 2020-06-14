import React,{useState} from 'react';
import fetch from 'node-fetch';

import {restapi} from './../keys';


function Authentication(props:any){

    const [auth, setAuth]=useState('signin');

    function handleAuth(){
        if(auth==='signin') setAuth('signup');
        else setAuth('signin');
    }

    function Signin(){
        
        async function onSubmit(e:any){
            e.preventDefault();
            let password=e.password, email=e.email;

            const response = await fetch(`${restapi}/user/signin`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            /* const json = await response.json();
        
            if(json.statusText==='done') return('Task created');
            return(`Err: ${json.statusText}`); */
        }

        return(
            <div>
                <h2>Iniciar sesion</h2>
                <div>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <p>
                            Email: 
                            <input type="text" name="email" id=""/>
                        </p>
                        <p>
                            Password: 
                            <input type="password" name="password" id=""/>
                        </p>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
                <p>No tienes cuenta?, <a onClick={handleAuth}>Registrarse</a></p>
            </div>
        );
    }

    function Signup(){

        async function onSubmit(e:any){
            let username=e.username, password=e.password, email=e.email;

            const response = await fetch(`${restapi}/user/signup`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email })
            });
            /* const json = await response.json();
        
            if(json.statusText==='done') return('Task created');
            return(`Err: ${json.statusText}`); */
        }

        return(
            <div>
                <h2>Registrarse</h2>
                <div>
                    <form onSubmit={onSubmit}>
                        <p>
                            Username: 
                            <input type="text" name="username" id=""/>
                        </p>
                        <p>
                            Email: 
                            <input type="text" name="email" id=""/>
                        </p>
                        <p>
                            Password: 
                            <input type="password" name="password" id=""/>
                        </p>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
                <p>Ya tienes cuenta?, <a onClick={handleAuth}>Iniciar Sesion</a></p>
            </div>
        );
    }

    return(
        <div>
            { auth==='signin' ? <Signin/>:<Signup/> }
        </div>
    );
}

export default Authentication;