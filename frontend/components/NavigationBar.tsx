import Link from 'next/link';
import store from '../redux/user/store';

function NavigationBar(){

    const data= store.getState();
    let isLogged= data.reducer.isLogged;

    function Auth(){
        return(
            <div>
                <li>
                    <Link as='/user/signin' href='/user/signin'>
                        <a>Iniciar Sesion</a>
                    </Link>
                </li>
                <li>
                    <Link href='/user/signup'>
                        <a>Registrarse</a>
                    </Link>
                </li>
            </div>
        );
    }

    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>Inicio</a>
                        </Link>
                    </li>
                    { isLogged ? '' : <Auth/> }
                </ul>
            </nav>
        </div>
    );
}

export default NavigationBar;