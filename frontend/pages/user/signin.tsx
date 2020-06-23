import Signin from '../../components/pages/Signin';
import { Provider } from 'react-redux';
import storeFn from '../../redux/user/store';

function signin(){
    return(
        <Provider store={storeFn}>
            <Signin/>
        </Provider>
    );
}

export default signin;