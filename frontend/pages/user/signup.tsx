import Signup from './../../components/pages/Signup';
import { Provider } from 'react-redux';
import storeFn from '../../redux/user/store';
import Container from '../../components/Container';

function signup(){
    return(
        <Provider store={storeFn}>
            <Container title='Signup'>
                <Signup/>
            </Container>
        </Provider>
    );
}

export default signup;