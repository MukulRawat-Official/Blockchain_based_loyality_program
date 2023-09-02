import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomModal() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <p>Not Connected</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;
