import Index from './../components/pages/Index';
import { Provider } from 'react-redux';
import storeFn from '../redux/user/store';

function index(){
    return(
        <Provider store={storeFn}>
            <Index/>
        </Provider>
    );
}

export default index;