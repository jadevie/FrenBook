import { useSelector } from 'react-redux';
import SigninFormModal from './SigninFormModal/SigninFormModal';

export default function Modals() {
    const ui = useSelector(state => state.ui);
    return <>
        {ui.showSigninModal && <SigninFormModal />}
    </>;
}
