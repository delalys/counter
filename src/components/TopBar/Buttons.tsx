import React from 'react';

interface Props {
    muteApp: () => void,
    condenseApp: () => void,
    appIsMute: string,
    appIsCondensed: string,
}

const Buttons: React.FC<Props> = props => {
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

export default Buttons;