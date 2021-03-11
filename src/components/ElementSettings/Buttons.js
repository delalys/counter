import React from 'react'
import PropTypes from 'prop-types';

const Buttons = props => {
    return (
        <div className="settings__item btn-actions">
        <div
            className="btn btn-action"
            onClick={() => props.handleResetElementCount(props.index)}
        >
            Reset to 0
        </div>
        <div
            className="btn btn-action d-none d-md-block d-lg-block d-xl-block"
            onClick={() => props.handleElementFullScreen(props.index)}
        >
            Full screen
        </div>
        <div
            className="btn btn-action btn-danger"
            onClick={() => props.deleteElement(props.index)}
        >
            Delete
        </div>
    </div>
    )
}

Buttons.propTypes = {
    handleResetElementCount: PropTypes.func.isRequired,
    handleElementFullScreen: PropTypes.func.isRequired,
    deleteElement: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}

export default Buttons;