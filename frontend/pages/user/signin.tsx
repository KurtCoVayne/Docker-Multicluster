import Signin from '../../components/pages/Signin';
import { Provider } from 'react-redux';
import storeFn from '../../redux/user/store';
import Container from '../../components/Container';

function signin(){
    return(
        <Provider store={storeFn}>
            <Container title='Signin'>
                <Signin title='Docker-MultiCluster'/>
            </Container>
        </Provider>
    );
}

export default signin;