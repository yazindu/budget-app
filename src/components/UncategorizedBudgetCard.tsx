import {BudgetCard} from "./BudgetCard.tsx";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetsContext.tsx";

type UncategorizedBudgetCardProps = {
    onAddExpenseClick: () => void
    onViewExpensesClick: () => void
}
export const UncategorizedBudgetCard = (props: UncategorizedBudgetCardProps) => {
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses({budgetId: UNCATEGORIZED_BUDGET_ID}).reduce((total, expense) => total + expense.amount, 0)
    if (amount === 0) return null
    return (
        <BudgetCard
            amount={amount}
            name={'Uncategorized'}
            hideMax={true}
            gray={true}
            max={0}
            hideButtons={false}
            onAddExpenseClick={props.onAddExpenseClick}
            onViewExpensesClick={props.onViewExpensesClick}
        />
    )
}