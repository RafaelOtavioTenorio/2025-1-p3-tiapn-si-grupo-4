
import { useEffect, useRef, type PropsWithChildren } from "react";
import DefaultButton from "./DefaultButton";

interface ModalProps extends PropsWithChildren {
    openModal: boolean;
    closeModal: () => void;
}

function DefaultModal(props: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

    return (
        <dialog
            ref={ref}
            onCancel={props.closeModal}
            className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/5"
        >
            <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    {props.children}
                </div>
                <div className="flex justify-end p-4">
                    <DefaultButton onClick={props.closeModal}>
                        Fechar
                    </DefaultButton>
                </div>
            </div>

        </dialog>
    );
}

export default DefaultModal;