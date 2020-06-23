import fetch from 'node-fetch';
import {restapi} from './../config/keys';
import { useState } from 'react';
import { useRouter } from 'next/router';
import store from './../../redux/user/store';
import { updateContent } from './../../redux/user/actions';

function Signin(){

    const router=useRouter();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error,setError]=useState({
        state:false,
        data:''
    });

    function ShowError(){
        return(
            <div>
                <p>{error.data}</p>
            </div>
        );
    }

    async function handleSubmit(e:any){
        e.preventDefault();

        const response= await fetch(`${restapi}/user/signin`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        });

        const data= await response.json();

        setEmail('');
        setPassword('');

        if(data.statusText==='done'){
            let content={
                username:data.user.username,
                email:data.user.email,
                permissions:data.user.permissions,
                last_seen:data.user.last_seen,
                account_created:data.user.account_created,
                token:data.token,
                isLogged:true
            }
            
            store.dispatch(updateContent(content));

            router.push('/');
        }
        else{
            setError({
                state:true,
                data:data.statusText
            });
        }
    }

    return(
        <div>
            <h2>Inicio de Sesion</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <br/>
                <label>Password: </label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <br/>
                <button type="submit">Enviar</button>
            </form>
            { error.state==true ? <ShowError/> : '' }
        </div>
    );
}

export default Signin;