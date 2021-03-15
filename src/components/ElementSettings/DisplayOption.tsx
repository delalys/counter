import React from 'react'

interface Props {
    displayOption: string,
    handleDisplayOption: (type: string) => void,
}

const DisplayOption: React.FC <Props> = props => {

    const isDisplayOptionWeekClass = props.displayOption === "week" ? " is-active" : '';
    const isDisplayOptionMonthClass = props.displayOption === "month" ? " is-active" : '';

    return (
        <div className="toggle__group">
            <span className={"toggle" + isDisplayOptionWeekClass} onClick={() => props.handleDisplayOption("week")}>Last week</span>
            <span className={"toggle" + isDisplayOptionMonthClass} onClick={() => props.handleDisplayOption("month")}>Last month</span>
        </div>
    )
}
export default DisplayOption;