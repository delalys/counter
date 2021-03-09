import React from 'react'
import PropTypes from 'prop-types';

import { Textfit } from 'react-textfit';

const KeyFigures = props => {
    return (
        <div className="row">
            <div className="col-4 settings__stats-col is-number no-border">
                <div className={"settings__stats-col--count "}><Textfit>{props.todayCounts}</Textfit></div>
                <div className="settings__stats-col--title">Today</div>
            </div>
            <div className="col-4 settings__stats-col is-number">
                <div className={"settings__stats-col--count "}><Textfit>{props.lastWeekCounts}</Textfit></div>
                <div className="settings__stats-col--title">Last week</div>
            </div>
            <div className="col-4 settings__stats-col is-number">
                <div className={"settings__stats-col--count "}><Textfit>{props.lastMonthCounts}</Textfit></div>
                <div className="settings__stats-col--title">Last month</div>
            </div>
        </div>  
    )
}

KeyFigures.propTypes = {
    todayCounts: PropTypes.number.isRequired,
    lastWeekCounts: PropTypes.number.isRequired,
    lastMonthCounts: PropTypes.number.isRequired,
}

export default KeyFigures;