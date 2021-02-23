import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppSettings from './AppSettings';
import AddElementForm from './AddElementForm';
import ResizeObserver from 'rc-resize-observer';

class TopBar extends Component {

    state = {
        appSettingsHeight: null,
        appSettingsHeightCondensed: null,
    }
    
    // Create a copy of App Settings to set a natural fixed height to the original element
    createMirrorElement = () => {
        // forces update if new actions have change its state
        if (document.querySelector('.settings.is-mirror.is-app')) {
            document.querySelector('.settings.is-mirror.is-app').remove();
        }
        var mirrorElement = document.querySelector('.settings.is-app').cloneNode(true);
        document.querySelector('.form-element').appendChild(mirrorElement);
        mirrorElement.classList.add('is-mirror', 'is-open');
    }

    // Gets new settings height and sets it to state
    setsAppSettingsHeight = () => {
        this.createMirrorElement();
        let appSettingsHeightDOM = document.querySelector('.settings.is-mirror.is-app');
        let appDOM = document.querySelector('.app');
        if (this.props.appIsCondensed) {
            this.setState({appSettingsHeightCondensed: appSettingsHeightDOM.offsetHeight + "px"});
            appDOM.classList.remove('is-condensed');
            this.setState({appSettingsHeight: appSettingsHeightDOM.offsetHeight + "px"});
            appDOM.classList.add('is-condensed');
        } else {
            this.setState({appSettingsHeight: appSettingsHeightDOM.offsetHeight + "px"});
            appDOM.classList.add('is-condensed');
            this.setState({appSettingsHeightCondensed: appSettingsHeightDOM.offsetHeight + "px"});
            appDOM.classList.remove('is-condensed');
            console.log(appSettingsHeightDOM.offsetHeight)
        }
    }

    componentDidMount() {
        // Wait for mirror to be created then call setsAppSettingsHeight
        let mirrorIsDone = function functionOne(){
            return new Promise(()=>{
                this.createMirrorElement();
            });
        }.bind(this);
        
        mirrorIsDone().then(()=>{
            this.setsAppSettingsHeight()
        });
    }    
    
    render() {
        const isSettingsClass = this.props.appSettingsIsDisplayed ? "is-open" : '';
        let appAettingsHeightToGve = !this.props.appSettingsIsDisplayed ? 0 : this.props.appIsCondensed ? this.state.appSettingsHeightCondensed : this.state.appSettingsHeight;

        return(
            <ResizeObserver onResize={() => this.setsAppSettingsHeight()}>
                <div className={"form-element mt-3 " + isSettingsClass}>
                    <AddElementForm
                        elements={this.props.elements}
                        addElement={this.props.addElement}

                        displayAppSettings={this.props.displayAppSettings}
                    />
                    <AppSettings 
                        appSettingsIsDisplayed={this.props.appSettingsIsDisplayed}
                        appSettingsHeight={appAettingsHeightToGve}

                        appIsMute={this.props.appIsMute}
                        muteApp={this.props.muteApp}

                        appIsCondensed={this.props.appIsCondensed}
                        condenseApp={this.props.condenseApp}

                        colorizeApp={this.props.colorizeApp}

                        gradient={this.props.gradient}
                        gradients={this.props.gradients}
                    />
                </div>
            </ResizeObserver>
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