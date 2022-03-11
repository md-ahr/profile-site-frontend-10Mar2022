import { useState } from 'react';
import { Modal } from 'react-responsive-modal';

interface Button {
    name: string;
}

const ModalBox = (props: Button) => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <button type="button" onClick={onOpenModal} className="text-green-500 basis-[auto] text-xs sm:text-sm border-2 border-green-500 rounded font-medium px-4 py-2 ml-0 sm:ml-6 lg:ml-8 hover:bg-green-500 hover:text-white transition ease duration-500">{props.name}</button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2>Simple centered modal</h2>
            </Modal>
        </div>
    );
};

export default ModalBox;
