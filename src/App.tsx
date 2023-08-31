import {Button, Container, Stack} from "react-bootstrap";
import {BudgetCard} from "./components/BudgetCard.tsx";
import {AddBudgetModal} from "./components/AddBudgetModal.tsx";
import {useState} from "react";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "./contexts/BudgetsContext.tsx";
import {AddExpenseModal} from "./components/AddExpenseModal.tsx";
import {UncategorizedBudgetCard} from "./components/UncategorizedBudgetCard.tsx";
import {TotalBudgetCard} from "./components/TotalBudgetCard.tsx";
import {ViewExpensesModal} from "./components/ViewExpensesModal.tsx";

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState('')
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(null)
    const {budgets, getBudgetExpenses} = useBudgets()

    function openAddExpenseModal(budgetID: string) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetID)
    }

    return (
        <>
            <Container className={'my-4'}>
                <Stack direction={'horizontal'} gap={2} className={'mb-4'}>
                    <h1 className={'me-auto'}>Budgets</h1>
                    <Button
                        variant={'primary'}
                        onClick={() => setShowAddBudgetModal(true)}
                    >Add Budget</Button>
                    <Button onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)} variant={'outline-primary'}>
                        Add Expense</Button>
                    {/*TODO: check onClick function PASS 43:32*/}
                </Stack>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: "1rem",
                    alignItems: "flex-start"
                }}>
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses({budgetId: budget.id}).reduce((total, expense) => total + expense.amount, 0)
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                gray={false} //TODO check (added byME)
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalBudgetCard/>
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                handleClose={() => setShowAddExpenseModal(false)}
                defaultBudgetId={addExpenseModalBudgetId}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId(null)} //TODO 54:54
            />
        </>
    )
}

export default App
