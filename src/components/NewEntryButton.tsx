import { RiSystemAddBoxLine } from 'solid-icons/ri';
import Button from './Button';
import NewEntryModalContent from './modals/NewEntry';
import useModalManager from '../stores/modalManager';

export default function NewEntryButton() {

    const showModal = useModalManager(state => state.showModal);

    return <Button
        onClick={() => showModal("newEntry", <NewEntryModalContent />)}
        class='flex justify-center items-center gap-1'
    >
        <RiSystemAddBoxLine size={20} /> New Entry
    </Button>;
}