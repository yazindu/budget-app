import {Button, Form, Modal} from "react-bootstrap";
import React, {useRef} from "react";
import {useBudgets} from "../contexts/BudgetsContext.tsx";

type AddBudgetModalProps = {
    show: boolean,
    handleClose: () => void
}

export const AddBudgetModal = ({show, handleClose}: AddBudgetModalProps) => {
    const nameRef = useRef<HTMLInputElement>(null!) //is using non-null assertion here okay?
    const maxRef = useRef<HTMLInputElement>(null!)
    const {addBudget} = useBudgets()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) { //type of e is given by chatGPT. How can I find it myself? write the event handler inline and hover over the event parameter in the function
        e.preventDefault();
        addBudget({
            name: nameRef.current.value,
            max:parseFloat(maxRef.current.value)
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className={'mb-3'} controlId={'name'}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            ref={nameRef}
                            type={'text'}
                            required/>
                    </Form.Group><Form.Group className={'mb-3'} controlId={'max'}>
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control
                        ref={maxRef}
                        type={'number'}
                        required
                        min={0}
                        step={0.01}/>
                </Form.Group>
                    <div className={'d-flex justify-content-end'}>
                        <Button variant={'primary'} type={'submit'}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}