import {createContext, PropsWithChildren, useContext} from "react";
import {v4 as uuidV4} from 'uuid';
import {useLocalStorage} from "../hooks/useLocalStorage.ts";

type BudgetItem = {
    id: typeof uuidV4,
    name: string,
    max: number
}

type ExpenseItem = {
    id: typeof uuidV4,
    budgetId: typeof uuidV4,
    amount: number,
    description: string
}

type BudgetsContextType = {
    budgets: BudgetItem[]
    expenses: ExpenseItem[]
    getBudgetExpenses: ({budgetId}:{budgetId: typeof uuidV4}) => ExpenseItem[]
    addExpense: ({description, amount, budgetId}:{description: string, amount: number, budgetId: typeof uuidV4}) => void
    addBudget: ({name, max}: { name: string, max: number }) => void //addBudget: (name: string, max: number) => void
    deleteBudget: ({id}:{id: typeof uuidV4}) => void
    deleteExpense: ({id}:{id: typeof uuidV4}) => void
}

const BudgetsContext = createContext({} as BudgetsContextType)

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}: PropsWithChildren) => {
    const [budgets, setBudgets] = useLocalStorage<BudgetItem[]>("budgets",[])
    const [expenses, setExpenses] = useLocalStorage<ExpenseItem[]>("expenses",[])

    const getBudgetExpenses = ({budgetId}:{budgetId: typeof uuidV4}) : ExpenseItem[] => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    const addExpense = ({description, amount, budgetId}:{description: string, amount: number, budgetId: typeof uuidV4}) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4, description: description, amount: amount, budgetId: budgetId}]
        })
    }
    const addBudget = ({name, max}: { name: string, max: number }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4, name: name, max: max}]
        })
    }
    const deleteBudget = ({id}:{id: typeof uuidV4}) => {
        //TODO Deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    const deleteExpense = ({id}:{id: typeof uuidV4}) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            addExpense,
            deleteBudget,
            deleteExpense,
            getBudgetExpenses,
            addBudget
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}