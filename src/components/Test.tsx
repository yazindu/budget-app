import {useState} from "react";

type BudgetItem = {
    id: number,
    name: string,
    max: number
}
export const Test = () => {
    const [budgets1, setBudgets1] = useState<BudgetItem[]>() //type assertion without initial value
    const [budgets2, setBudgets2] = useState<BudgetItem[]>([]) //type assertion with empty initial array
    const [budgets3, setBudgets3] = useState([] as BudgetItem[]) //an array as type inference
    const [budgets4, setBudgets4] = useState({} as BudgetItem[]) //an object as type inference


    console.log(budgets1)
    console.log(budgets2)
    console.log(budgets3)
    console.log(budgets4)
    setBudgets1([] as BudgetItem[])
    setBudgets2([] as BudgetItem[])
    setBudgets3([] as BudgetItem[])
    setBudgets4([] as BudgetItem[])
}