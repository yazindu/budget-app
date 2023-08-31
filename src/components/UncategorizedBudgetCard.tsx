import {BudgetCard, BudgetCardProps} from "./BudgetCard.tsx";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetsContext.tsx";

export const UncategorizedBudgetCard = (props: BudgetCardProps) => {
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses({budgetId: UNCATEGORIZED_BUDGET_ID}).reduce((total, expense) => total + expense.amount, 0)
    if(amount===0) return null
    return (
        <BudgetCard {...props} amount={amount} name={'Uncategorized'} gray/>
    )
}