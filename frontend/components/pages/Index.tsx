import NavigationBar from './../NavigationBar';
import store from './../../redux/user/store';
import Footer from './../Footer';

import './../../public/index.css';
const css=require('./../../public/index.css');

function Index(){

    const { username, email ,isLogged }=store.getState().reducer;
    
    function UserCard(){
        return(
            <aside>
                <div className="container">
                    <p><strong>{username}</strong></p>
                    <p>{email}</p>
                    <button>Redirect</button>
                </div>
            </aside>
        );
    }

    function RegisterMessage(){
        return(
            <aside>

            </aside>
        );
    }

    return(
        <div className={css.indexMainContainer}>
            <NavigationBar title='Docker-MultiCluster' pageType='index'/>
            <main className={css.mainSection}>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <h1><strong>Docker-MultiCluster</strong></h1>
                            <strong>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Mollitia repudiandae aperiam eligendi reprehenderit velit
                                </p>
                            </strong>
                        </div>
                        <div className="col-md-6">
                            { isLogged ? <UserCard/> : <RegisterMessage/>}
                        </div>
                    </div>
                </div>
            </main>
            <section id='info' className={css.info}>
                <div className="container">
                    <h2 className='text-center' >Info</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
                                corrupti commodi, debitis, vel quae vitae sunt voluptates repudiandae
                                soluta doloremque laborum a necessitatibus ipsa assumenda. Tempore
                                harum magni excepturi eaque.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={css.footerSection}>
                <Footer/>
            </section>
        </div>
    );
}

export default Index;