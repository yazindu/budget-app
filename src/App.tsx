import {Button, Container, Stack} from "react-bootstrap";
import {BudgetCard} from "./components/BudgetCard.tsx";
import {AddBudgetModal} from "./components/AddBudgetModal.tsx";

function App() {
    const handleClose = () => {
        console.log('hi')
    }
    const handleSubmit = () => {
        console.log('hello')
    }

    return (
        <>
            <Container className={'my-4'}>
                <Stack direction={'horizontal'} gap={2} className={'mb-4'}>
                    <h1 className={'me-auto'}>Budgets</h1>
                    <Button variant={'primary'}>Add Budget</Button>
                    <Button variant={'outline-primary'}>Add Expense</Button>
                </Stack>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: "1rem",
                    alignItems: "flex-start"
                }}>
                    <BudgetCard
                        gray={true}
                        name={'Entertainment'}
                        amount={900}
                        max={1000}
                    ></BudgetCard>
                </div>
            </Container>
            <AddBudgetModal show={true} handleClose={handleClose} handleSubmit={handleSubmit}/>
        </>
    )
}

export default App
