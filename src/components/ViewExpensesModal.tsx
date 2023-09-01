import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetsContext.tsx";
import {Button, Modal, Stack} from "react-bootstrap";
import {formatCurrency} from "../utils.ts";

type ViewExpensesModalProps = {
    budgetId: string,
    handleClose: () => void
}

export const ViewExpensesModal = ({budgetId, handleClose}: ViewExpensesModalProps) => {
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()

    const expenses = getBudgetExpenses({budgetId: budgetId})

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? {name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID}
        : budgets.find(b => b.id === budgetId)

    return (
        // budgetId !== null removed to avoid using null | string
        <Modal show={budgetId !== 'close'} onHide={handleClose}>
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
                <Stack direction={'vertical'} gap={3}>
                    {expenses.map(expense => (
                        <Stack direction={'horizontal'} gap={2} key={expense.id}>
                            <div className={'me-auto fs-4'}>{expense.description}</div>
                            <div className={'fs-5'}>{formatCurrency(expense.amount)}</div>
                            <Button size={'sm'}
                                    variant={'outline-danger'}
                                    onClick={()=>deleteExpense(expense)}
                            >&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}