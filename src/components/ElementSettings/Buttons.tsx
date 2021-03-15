import React from 'react'

interface Props {
    index: number,
    handleResetElementCount: (index: number) => void,
    handleElementFullScreen: (index: number) => void,
    deleteElement: (index: number) => void,
}

const Buttons: React.FC <Props> = props => {
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

export default Buttons;