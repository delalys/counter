import React from 'react';
import PropTypes from 'prop-types';

const Buttons = props => {
    const appIsMuteLabel = props.appIsMute ? "Unmute app" : 'Mute app';
    const appIsCondensedLabel = props.appIsCondensed ? "Large view" : 'Compact view';
   
    return (
        <div className="settings__item btn-actions col-lg-5">
            <div className="btn btn-action" onClick={() => props.muteApp()}>
                {appIsMuteLabel}
            </div>
            <div className="btn btn-action" onClick={() => props.condenseApp()}>
                {appIsCondensedLabel}
            </div>
        </div>
    )
}


Buttons.propTypes = {
    muteApp: PropTypes.func.isRequired,
    appIsMuteLabel: PropTypes.string.isRequired,
    condenseApp: PropTypes.func.isRequired,
    appIsCondensedLabel: PropTypes.string.isRequired,
}

export default Buttons;