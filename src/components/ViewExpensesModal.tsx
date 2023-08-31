import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetsContext.tsx";
import {Button, Modal, Stack} from "react-bootstrap";

type ViewExpensesModalProps = {
    budgetId: string,
    handleClose: () => void
}

export const ViewExpensesModal = ({budgetId, handleClose}: ViewExpensesModalProps) => {
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? {name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID}
        : budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction={"horizontal"} gap={2}>
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteBudget({id: budgetId}) //TODO 53:35
                                handleClose()
                            }} variant={"outline-danger"}>Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*    <Form.Group className={'mb-3'} controlId={'name'}>*/}
                {/*        <Form.Label>Name</Form.Label>*/}
                {/*        <Form.Control*/}
                {/*            ref={nameRef}*/}
                {/*            type={'text'}*/}
                {/*            required/>*/}
                {/*    </Form.Group><Form.Group className={'mb-3'} controlId={'max'}>*/}
                {/*    <Form.Label>Maximum Spending</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        ref={maxRef}*/}
                {/*        type={'number'}*/}
                {/*        required*/}
                {/*        min={0}*/}
                {/*        step={0.01}/>*/}
                {/*</Form.Group>*/}
                {/*    <div className={'d-flex justify-content-end'}>*/}
                {/*        <Button variant={'primary'} type={'submit'}>Add</Button>*/}
                {/*    </div>*/}
            </Modal.Body>
        </Modal>
    )
}