import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppSettings extends Component {

    render() {

        const isOpenSettingsClass = this.props.appSettingsIsDisplayed ? "is-open" : '';
        const appIsMuteLabel = this.props.appIsMute ? "Unmute app" : 'Mute app';
        const appIsCondensedLabel = this.props.appIsCondensed ? "Large view" : 'Compact view';

        return(
            <div 
                className={"settings is-app " + isOpenSettingsClass}
                style={{ height: this.props.appSettingsHeight }}
            >
                <div className="row">
                    <hr className=""/>

                    {/* Actions */}
                    <div className="settings__item btn-actions col-lg-5">
                        <div
                            className="btn btn-action"
                            onClick={() => this.props.muteApp()}
                        >
                            {appIsMuteLabel}
                        </div>
                        <div
                            className="btn btn-action"
                            onClick={() => this.props.condenseApp()}
                        >
                            {appIsCondensedLabel}
                        </div>
                    </div>
                    <hr className="d-lg-none d-xl-none"/>
                    {/* Color */}
                    <div className="settings__item col-lg-7">
                        <span className="settings__title">Color:</span>
                        {this.props.gradients.map((el, index) => {
                            let color1 = this.props.gradients[index].color1;
                            let color2 = this.props.gradients[index].color2;
                            let classActiveColor = (index === this.props.gradient) ? 'color-example active' : 'color-example';
                            return <span 
                                        className={classActiveColor}
                                        key={index}
                                        onClick={ () => this.props.colorizeApp(index)}
                                    >
                                        <div 
                                            className="color-example__background"
                                            style={{backgroundImage: `linear-gradient(190deg, ${color1} 0%, ${color2} 100%)`}}
                                        ></div>
                                    </span>
                            })}
                    </div>

                </div>
            </div>
        )
    }
}

AppSettings.propTypes = {
    appSettingsIsDisplayed: PropTypes.bool.isRequired,
    appSettingsHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
    
    appIsMute: PropTypes.bool.isRequired,
    muteApp: PropTypes.func.isRequired,

    appIsCondensed: PropTypes.bool.isRequired,
    condenseApp: PropTypes.func.isRequired,

    colorizeApp: PropTypes.func.isRequired,

    gradient: PropTypes.number.isRequired,
    gradients: PropTypes.array.isRequired,
}

export default AppSettings;