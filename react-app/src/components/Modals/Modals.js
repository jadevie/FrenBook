import { useSelector } from 'react-redux';
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';

export default function Modals() {
    const ui = useSelector(state => state.ui);
    return <>
        {ui.showSignUpModal && <SignUpFormModal />}
    </>;
}
