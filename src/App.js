import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as elementActions from './actions/elementActions';
import * as appSettingsActions from './actions/appSettingsActions';
import Element from './components/Element';
import Topbar from './components/TopBar';
import './App.css';

// import ClicSound from './assets/clic.mp3'

class App extends Component {

//   audio = [];
  
  // componentDidMount() {
  //   // Create and preload 10 sounds for mobile delay
  //   for (let i = 0; i < 10; i++) {
  //     this.audio = [
  //       ...this.audio,
  //       new Audio (ClicSound)
  //     ]
  //     this.audio[i].preload = 'auto';
  //   }
  //   this.props.colorizeApp(3)
  // }
  
  //-----//
  // App //
  //-----//

  // handleMuting = () => {
  //   this.setState({
  //     isMute: !this.state.isMute
  //   })
  // }

  // handleCondensing = () => {
  //   this.setState({
  //     isCondensed: !this.state.isCondensed
  //   })
  // }

  // Change Element gradient
  // modifyColor = (indexGradient) =>{
  //   this.setState({gradient: indexGradient});
  // }

  
  //------//
  // FORM //
  //------//

  // Change Element settingsOpen
  // toggleAppSettings = () => {
  //   // Toggle settingsOpen boolean
  //   this.setState({appSettingsOpen: !this.state.appSettingsOpen});
  // }

  // // Add new element
  // handleAddElement = (el) => {
  //   this.setState( prevstate => {
  //     return{
  //       elements: [
  //         ...prevstate.elements,
  //         el
  //       ]
  //     }
  //   });
  // }



  


  // Used for condensed class on container
  removeClassByPrefix(node, prefix) {
    var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
    node.className = node.className.replace(regx, '');
    return node;
  }
  
  
  //---------//
  // ELEMENT //  
  //---------//

  // handleCountChange = (indexElement, changeType) => {
  //   // Play sound
  //   if (!this.props.appSettings.isMute) {
  //     this.audio[this.props.appSettings.soundPlaying].load();
  //     this.audio[this.props.appSettings.soundPlaying].play()
  //   }
  //   this.setState({
  //     soundPlaying: (this.props.appSettings.soundPlaying +1) % 10
  //   })

  //   // Check if resuslt is a positive number, otherwise sets it to 1
  //   let incrementBy = this.props.state.state.elements[indexElement].incrementBy;
  //   if ((incrementBy === 0) || (incrementBy === '')) {
  //     incrementBy = parseInt(1);
  //   }
  //   // Increment or decrement by the new value
  //   if (changeType === "increment") {
  //     parseInt(incrementBy);
  //     this.setState( prevState => ({
  //       count: prevState.elements[indexElement].count +=  incrementBy
  //     }));
  //   } else if (changeType === "decrement") {
  //     this.setState( prevState => ({
  //       count: prevState.elements[indexElement].count -=  incrementBy
  //     }));
  //   }
  // }

  //------------------//
  // ELEMENT SETTINGS //  
  //------------------//

  // Delete element
  // handleRemoveElement = (index) => {
  //   let elements = this.state.elements;
  //   elements.splice(index, 1);
  //   this.setState({elements});
  // }

  // Set the count back to 0
  // handleReinitElement = (indexElement) =>
  //   this.setStateElement(indexElement, 'count', 0);  

  // Change Element name
  // modifyName = (event, newValue, indexElement) => {
  //   event.preventDefault();
  //   if (newValue !== '') {
  //     this.setStateElement(indexElement, 'value', newValue);
  //   }
  // }

  // Change Element IncrementBy
  // modifyIncrementBy = (newIncrementBy, indexElement, oldIncrementBy) => {
  //   if ((newIncrementBy !== '') && (newIncrementBy !== '0')) {
  //     this.setStateElement(indexElement, 'incrementBy', newIncrementBy);
  //   } else if ((newIncrementBy == null) || (newIncrementBy === '0')) {
  //     this.setStateElement(indexElement, 'incrementBy', oldIncrementBy);
  //   }
  // }


  scrollToListTop = () => this.container.current.scrollIntoView();
  
  container = React.createRef();

  
  render(){
    
    const appIsCondensedClass = this.props.appSettings.appIsCondensed ? "is-condensed" : '';
    const isGradientClass = "gradient-" + this.props.appSettings.gradient;   

    return (
      <div className={appIsCondensedClass + " " + isGradientClass +" background-gradient"}>
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
                    modifyColor={this.modifyColor}
                    resetElementCount={this.props.resetElementCount}
                    displayElementInFullScreen={this.props.displayElementInFullScreen}
                    deleteElement={this.props.deleteElement}
                  />
                )}
                <div 
                  ref={this.container} 
                  className="anchor"
                ></div>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);