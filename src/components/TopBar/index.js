import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppSettings from './AppSettings';
import AddElementForm from './AddElementForm';

class TopBar extends Component {

    
    render() {
        const isSettingsClass = this.props.appSettingsIsDisplayed ? "is-open" : '';

        return(
            <div className={"form-element mt-3 " + isSettingsClass}>
                <AddElementForm
                    elements={this.props.elements}
                    addElement={this.props.addElement}

                    displayAppSettings={this.props.displayAppSettings}
                />
                <AppSettings 
                    appSettingsIsDisplayed={this.props.appSettingsIsDisplayed}

                    appIsMute={this.props.appIsMute}
                    muteApp={this.props.muteApp}

                    appIsCondensed={this.props.appIsCondensed}
                    condenseApp={this.props.condenseApp}

                    colorizeApp={this.props.colorizeApp}

                    gradient={this.props.gradient}
                    gradients={this.props.gradients}
                />
            </div>
        )
    }
}

TopBar.propTypes = {
    appSettingsIsDisplayed: PropTypes.bool.isRequired,
    
    appIsMute: PropTypes.bool.isRequired,
    muteApp: PropTypes.func.isRequired,

    appIsCondensed: PropTypes.bool.isRequired,
    condenseApp: PropTypes.func.isRequired,

    colorizeApp: PropTypes.func.isRequired,

    gradient: PropTypes.number.isRequired,
    gradients: PropTypes.array.isRequired,
    
    elements: PropTypes.array.isRequired,
    addElement: PropTypes.func.isRequired,
    
    displayAppSettings: PropTypes.func.isRequired,
}

export default TopBar;