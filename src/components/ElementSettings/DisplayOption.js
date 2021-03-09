import React from 'react'
import PropTypes from 'prop-types';

const DisplayOption = props => {

    const isDisplayOptionWeekClass = props.displayOption === "week" ? " is-active" : '';
    const isDisplayOptionMonthClass = props.displayOption === "month" ? " is-active" : '';

    return (
        <div className="toggle__group">
            <span className={"toggle" + isDisplayOptionWeekClass} onClick={() => props.handleDisplayOption("week")}>Last week</span>
            <span className={"toggle" + isDisplayOptionMonthClass} onClick={() => props.handleDisplayOption("month")}>Last month</span>
        </div>
    )
}

DisplayOption.propTypes = {
    displayOption: PropTypes.string.isRequired,
    handleDisplayOption: PropTypes.func.isRequired
}

export default DisplayOption;