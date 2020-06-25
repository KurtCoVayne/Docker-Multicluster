import { useState } from 'react';
import { restapi } from './../config/keys';
/* import store from './../../redux/user/store';
import { updateContent } from './../../redux/user/actions'; */
import { useRouter } from 'next/router';
import NavigationBar from '../NavigationBar';

function Signup(props:any){

    const router=useRouter();

    const [email, setEmail]=useState('');
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [error,setError]=useState({
        state:false,
        data:''
    });
    
    async function handleSubmit(e:any){
        e.preventDefault();

        const response= await fetch(`${restapi}/user/signup`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email, username })
        });

        const data= await response.json();

        setEmail('');
        setPassword('');
        setUsername('');

        if(data.statusText==='done'){
            router.push('/user/signin');
        }
        else{
            setError({
                state:true,
                data:data.statusText
            });
        }

    }

    function ShowError(){
        return(
            <div>
                <p>{error.data}</p>
            </div>
        );
    }

    return(
        <div>
            <NavigationBar title={props.title} noAuth={true}/>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre de Usuario: </label>
                <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <br/>
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

export default Signup;