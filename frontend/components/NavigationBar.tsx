import Link from "next/link";
import store from "../redux/user/store";

const css=require('./../public/navbar.css');

function NavigationBar(props:any){

    const { username ,isLogged }= store.getState().reducer;
    
    function Logout(){

    }

    function Auth(){
        return(
            <div className="row">
                <div className="col-md">
                    <Link as="/user/signin" href="/user/signin">
                        <a><strong>Iniciar Sesion</strong></a>
                    </Link>
                </div>
                <div className="col-md">
                    <Link href="/user/signup">
                        <a><strong>Registrarse</strong></a>
                    </Link>
                </div>
            </div>
        );
    }

    function User(){
        return(
            <div className="row">
                <div className="col-md">
                    <a><strong>{username}</strong></a>
                </div>
                <div className="col-md">
                    <button onClick={Logout} >Cerrar Sesion</button>
                </div>
            </div>
        );
    }

    return(
        <div className={css.navigation}>
            <div className="container">
                <nav>
                    <div className="row">
                        <div className="col-md">
                            <Link href="/">
                                <a><strong>{props.title}</strong></a>
                            </Link>
                        </div>
                        <div className="col-md">
                            <Link href="/#info">
                                <a><strong>Info</strong></a>
                            </Link>
                        </div>
                        <div className="col-md">
                            { (props.noAuth) ? "" :
                              isLogged ? <User/> : <Auth/>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavigationBar;