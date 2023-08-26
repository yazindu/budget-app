import {createContext, ReactNode, useContext} from "react";

type BudgetContext = {

}



// const BudgetContext = React.createContext()
const BudgetContext = createContext({} as BudgetContext)

type BudgetProviderProps = {
    children: ReactNode
}

export function useBudgets(){
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({children} : BudgetProviderProps)=> {
    return children
}