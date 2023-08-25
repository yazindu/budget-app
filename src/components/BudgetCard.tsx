import {Card} from "react-bootstrap";
import {formatCurrency} from "../utils.ts";


type BudgetCardProps = {
    name: string,
    amount: number,
    max: number
}

export const BudgetCard = ({name, amount, max} : BudgetCardProps) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <div>{name}</div>
                    <div>{formatCurrency(amount)} / {formatCurrency(max)}</div>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}