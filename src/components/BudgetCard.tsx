import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {CommonUtils} from "../utils/common_utils.ts";

export type BudgetCardProps = {
    name: string,
    amount: number,
    max: number
    hideMax : boolean
    gray: boolean
    hideButtons: boolean
    onAddExpenseClick: () => void
    onViewExpensesClick: ()=> void
}

export const BudgetCard = ({name, amount, max, hideMax, gray, onAddExpenseClick, hideButtons, onViewExpensesClick}: BudgetCardProps) => {
    const classNames: string[] = []
    if (amount > max && !hideMax) {
        classNames.push('bg-danger', 'bg-opacity-10')
    } else if (gray) {
        classNames.push('bg-light')
    }
    return (
        <Card className={classNames.join(' ')}>
            <Card.Body>
                <Card.Title className={"d-flex justify-content-between align-items-baseline fw-normal mb-3"}>
                    <div>{name}</div>
                    <div className={"d-flex align-items-baseline"}>
                        {CommonUtils.formatCurrency(amount)}
                        {!hideMax && (<span className={'text-muted fs-6 ms-1'}>
                         / {CommonUtils.formatCurrency(max)}
                        </span>)}
                    </div>
                </Card.Title>
                {!hideMax && (<ProgressBar
                    className={'rounded-pill'}
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />)}
                {hideButtons || (<Stack direction={'horizontal'} gap={2} className={'mt-4'}>
                    <Button variant={"outline-primary"} className={'ms-auto'} onClick={onAddExpenseClick}>
                        Add Expense</Button>
                    <Button onClick={onViewExpensesClick} variant={"outline-secondary"}>View Expense</Button>
                </Stack>)}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount: number, max: number) {
    const ratio = amount / max
    if (ratio < 0.5) return 'primary'
    if (ratio < 0.75) return 'warning'
    return 'danger'
}