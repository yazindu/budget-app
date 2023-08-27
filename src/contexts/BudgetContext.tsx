import {createContext, PropsWithChildren, useContext, useState} from "react";
import {v4 as uuidV4} from 'uuid';

type BudgetItem = {
    id: typeof uuidV4,
    name: string,
    max: number
}

type ExpenseItem = {
    id: typeof uuidV4,
    budgetId: number,
    // name: string,
    // max: number
    amount: number,
    description: string
}

type BudgetContextState = {
    budgets: BudgetItem[]
    expenses: ExpenseItem[]
    getBudgetExpenses: (budgetId: number) => void
    addExpense: (description: string, amount: number, budgetId: number) => void
    addBudget: (name: string, max: number) => void
    deleteBudget: (id: typeof uuidV4) => void
    deleteExpense: (id: typeof uuidV4) => void
}

// const BudgetContext = React.createContext()
const BudgetContext = createContext({} as BudgetContextState)

// type BudgetProviderProps = {
//     children: ReactNode
// }

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({children}: PropsWithChildren) => {
    const [budgets, setBudgets] = useState<BudgetItem[]>([])
    const [expenses, setExpenses] = useState<ExpenseItem[]>([])

    const getBudgetExpenses = (budgetId: number) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    const addExpense = (description: string, amount: number, budgetId: number) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4, description: description, amount: amount, budgetId: budgetId}]
        })
    }
    const addBudget = (name: string, max: number) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4, name: name, max: max}]
        })
    }
    const deleteBudget = (id: typeof uuidV4) => {
        //TODO Deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    const deleteExpense = (id: typeof uuidV4) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets: budgets,
            expenses: expenses,
            addExpense: addExpense,
            deleteBudget: deleteBudget,
            deleteExpense: deleteExpense,
            getBudgetExpenses: getBudgetExpenses,
            addBudget: addBudget
        }}>
            {children}
        </BudgetContext.Provider>
    )
}