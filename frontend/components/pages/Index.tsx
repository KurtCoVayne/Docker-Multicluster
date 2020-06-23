import Container from '../Container';
import NavigationBar from '../NavigationBar';
import store from '../../redux/user/store';

function Index(){

    const { username, isLogged }=store.getState().reducer;
    
    return(
        <Container title='Docker-MultiCluster'>
            <NavigationBar/>
            <div className='container bg-aqua'>
                { isLogged ? 
                    <h1>Hola {username}!, tiempo sin verte</h1>:
                    <h1>Por favor iniciar Sesion</h1>
                }
            </div>
        </Container>
    );
}

export default Index;