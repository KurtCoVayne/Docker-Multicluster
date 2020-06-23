import Signup from './../../components/pages/Signup';
import { Provider } from 'react-redux';
import storeFn from '../../redux/user/store';

function signup(){
    return(
        <Provider store={storeFn}>
            <Signup/>
        </Provider>
    );
}

export default signup;