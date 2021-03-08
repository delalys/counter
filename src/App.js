import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as elementActions from './actions/elementActions';
import * as appSettingsActions from './actions/appSettingsActions';
import Element from './components/Element';
import Topbar from './components/TopBar';
import './App.css';

class App extends Component {
  
  render(){
    
    const appIsCondensedClass = this.props.appSettings.appIsCondensed ? "is-condensed" : '';
    const isGradientClass = "gradient-" + this.props.appSettings.gradient; 

    return (
      <div className={appIsCondensedClass + " " + isGradientClass +" background-gradient app"}>
          <div className="container">
              <div 
                className="element__container"
              >
                {this.props.elements.elements.map( (element, index) =>
                  <Element 
                    key={index}
                    id={element.id}
                    index={index}
                    elements={this.props.elements.elements}

                    value={element.value}
                    renameElement={this.props.renameElement}

                    gradients={this.props.appSettings.gradients}
                    gradient={this.props.appSettings.gradient}

                    count={element.count}
                    changeElementCount={this.props.changeElementCount}

                    incrementBy={element.incrementBy}
                    modifyIncrementBy={this.modifyIncrementBy}

                    appIsMute={this.props.appSettings.appIsMute}
                    soundPlaying={this.props.appSettings.soundPlaying}

                    appIsCondensed={this.props.appSettings.appIsCondensed}
                    handleCondensing={this.handleCondensing}

                    elementSettingsIsDisplayed={element.elementSettingsIsDisplayed}
                    displayElementSettings={this.props.displayElementSettings}

                    changeElementIncrementBy={this.props.changeElementIncrementBy}
                    
                    countHistory={element.countHistory}
                    changeElementCountHistory={this.props.changeElementCountHistory}
                    removeOneElementCountHistory={this.props.removeOneElementCountHistory}
                    
                    countHistoryGroupByDay={element.countHistoryGroupByDay}
                    changeCountHistoryGroupByDay={this.props.changeCountHistoryGroupByDay}

                    modifyColor={this.modifyColor}

                    resetElementCount={this.props.resetElementCount}

                    displayElementInFullScreen={this.props.displayElementInFullScreen}

                    deleteElement={this.props.deleteElement}
                  />
                )}
              </div>
              <div className="element__container element__container--form">
                <Topbar 
                  elements={this.props.elements.elements}
                  gradients={this.props.appSettings.gradients}
                  gradient={this.props.appSettings.gradient}

                  appSettingsIsDisplayed={this.props.appSettings.appSettingsIsDisplayed}
                  displayAppSettings={this.props.displayAppSettings}

                  appIsCondensed={this.props.appSettings.appIsCondensed}
                  condenseApp={this.props.condenseApp}

                  appIsMute={this.props.appSettings.appIsMute}
                  muteApp={this.props.muteApp}

                  addElement={this.props.addElement}

                  colorizeApp={this.props.colorizeApp}
                />
              </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  appSettings: state.appSettings,
  elements: state.element
});

const mapDispatchToProps = (dispatch) => {
  return {
    displayAppSettings: () => dispatch(appSettingsActions.displayAppSettings()),
    muteApp: () => dispatch(appSettingsActions.muteApp()),
    condenseApp: () => dispatch(appSettingsActions.condenseApp()),
    colorizeApp: (indexGradient) => dispatch(appSettingsActions.colorizeApp(indexGradient)),
    
    addElement: (element) => dispatch(elementActions.addElement(element)),
    deleteElement: (indexElement) => dispatch(elementActions.deleteElement(indexElement)),
    displayElementSettings: (indexElement, propertyName, newValue) => dispatch(elementActions.displayElementSettings(indexElement, propertyName, newValue)),
    displayElementInFullScreen: (newElements) => dispatch(elementActions.displayElementInFullScreen(newElements)),
    resetElementCount: (newElements) => dispatch(elementActions.resetElementCount(newElements)),
    renameElement: (indexElement, propertyName, newValue) => dispatch(elementActions.renameElement(indexElement, propertyName, newValue)),
    changeElementIncrementBy: (indexElement, propertyName, newValue) => dispatch(elementActions.changeElementIncrementBy(indexElement, propertyName, newValue)),
    changeElementCount: (indexElement, propertyName, newValue) => dispatch(elementActions.changeElementCount(indexElement, propertyName, newValue)),
    changeElementCountHistory: (elements, indexElement, propertyName, newValue) => dispatch(elementActions.changeElementCountHistory(elements, indexElement, propertyName, newValue)),
    removeOneElementCountHistory: (elements, indexElement, propertyName, newValue) => dispatch(elementActions.removeOneElementCountHistory(elements, indexElement, propertyName, newValue)),
    changeCountHistoryGroupByDay: (indexElement, propertyName, newValue) => dispatch(elementActions.changeCountHistoryGroupByDay(indexElement, propertyName, newValue)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);