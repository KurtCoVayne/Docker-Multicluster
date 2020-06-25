import Index from './../components/pages/Index';
import { Provider } from 'react-redux';
import storeFn from '../redux/user/store';
import Container from '../components/Container';

import './../public/index.css';

function index(){
    return(
        <Provider store={storeFn}>
            <Container title='Docker-MultiCluster'>
                <Index/>
            </Container>
        </Provider>
    );
}

export default index;