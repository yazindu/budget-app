import {Button, Form, Modal} from "react-bootstrap";
import React, {useRef} from "react";
import {useBudgets} from "../contexts/BudgetsContext.tsx";

type AddExpenseModalProps = {
    show: boolean,
    handleClose: () => void
    defaultBudgetId: string
}

export const AddExpenseModal = ({show, handleClose}: AddExpenseModalProps) => {
    const descriptionRef = useRef<HTMLInputElement>(null!) //is using non-null assertion here okay?
    const amountRef = useRef<HTMLInputElement>(null!)
    const budgetIdRef = useRef<HTMLSelectElement>(null!)
    const {addExpense, budgets} = useBudgets()
    const defaultBudgetId = 'test';

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) { //type of e is given by chatGPT. How can I find it myself? write the event handler inline and hover over the event parameter in the function
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className={'mb-3'} controlId={'description'}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            ref={descriptionRef}
                            type={'text'}
                            required/>
                    </Form.Group>
                    <Form.Group className={'mb-3'} controlId={'amount'}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type={'number'}
                            required
                            min={0}
                            step={0.01}/>
                    </Form.Group>
                    <Form.Group className={'mb-3'} controlId={'budgetId'}>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>
                            {budgets.map(budget => (
                                <option
                                    key={JSON.stringify(budget.id)}
                                    value={JSON.stringify(budget.id)}
                                >
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className={'d-flex justify-content-end'}>
                        <Button variant={'primary'} type={'submit'}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}