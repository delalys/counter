import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buttons from './Buttons';
import Colors from './Colors';

class AppSettings extends Component {

    render() {

        const isOpenSettingsClass = this.props.appSettingsIsDisplayed ? "is-open" : '';

        return(
            <div 
                className={"settings is-app " + isOpenSettingsClass}
                style={{ height: this.props.appSettingsHeight }}
            >
                <div className="row">
                    <hr className=""/>
                    <Buttons 
                        muteApp={this.props.muteApp}
                        appIsMute={this.props.appIsMute}
                        condenseApp={this.props.condenseApp}
                        appIsCondensed={this.props.appIsCondensed}
                    />
                    <hr className="d-lg-none d-xl-none"/>
                    <Colors 
                        gradients={this.props.gradients}
                        colorizeApp={this.props.colorizeApp}
                    />
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