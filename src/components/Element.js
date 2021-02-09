import React, {Component, Fragment} from 'react';
import ElementSettings from './ElementSettings';

class Element extends Component {
    
    state = {
        isFullScreen: false,
        settingsOpen: false,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        position: 'relative',
        zIndex: 3,
    }
    
    element = React.createRef();
    elementSpaceAttribute = '';

    componentDidMount() {
        this.setsWidth();
        this.elementSpaceAttribute = this.element.current.getBoundingClientRect();
    }
    
    setsWidth = () => {
        this.elementSpaceAttribute = this.element.current.getBoundingClientRect();
        this.element.current.style.cssText = "width: " + this.elementSpaceAttribute.width + "px;";
    }

    // Place DOM element in after reference Dom element
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }  

    handleSettings = () => {
        this.setState(
            (prevState, props) => ({ settingsOpen: !this.state.settingsOpen })
        )
        this.props.toggleSettings(this.props.index);
      };

    toggleFullScreen = () => {

        // CLOSING
        if (this.state.isFullScreen) {
            
            // Sets back original positionning
            // Get valeu from state
            this.element.current.style.cssText = 
                "width: " + this.elementSpaceAttribute.width + "px;"+
                "height: " + this.elementSpaceAttribute.height + "px;"+
                "left: " + this.elementSpaceAttribute.x + "px;"+
                "top: " + this.elementSpaceAttribute.y + "px;"+
                "position: fixed;" + 
                "z-index: 99;";
              
            this.setState({ 
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: this.elementSpaceAttribute.y,
                    left: this.elementSpaceAttribute.x,
                    position: "fixed",
                    zIndex: "99",
                }, () => {
                    this.element.current.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px;"+
                        "left: " + this.state.left + "px;"+
                        "top: " + this.state.top + "px;"+
                        "position:"+ this.state.position +";"+
                        "z-index:"+ this.state.zIndex;
                }
            )
            
            // Toggle Open state and class
            let that = this; 
            setTimeout(function(){ 
                const currentState = that.state.isFullScreen;
                that.setState({ isFullScreen: !currentState });
            }, 0);
            
            // Fixes once animation is done and Removes mirror element
            setTimeout(function(){ 
                this.setState({ 
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: '',
                    left: '',
                    position: "relative",
                    zIndex: '',
                }, () => {
                    this.element.current.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px"+
                        "left: " + this.state.left + ";"+
                        "top: " + this.state.top + ";"+
                        "position:"+ this.state.zIndex +";";
                }
            )
            // Remove copy in DOM
            document.querySelector('.mirror-element').remove();

            }.bind(this), 300);
        }

        // OPENING
        else {
            this.elementSpaceAttribute = this.element.current.getBoundingClientRect();

            // Create copy in dom
            let mirrorElement = this.element.current.cloneNode(true);
            mirrorElement.style.cssText = "visibility: hidden";
            mirrorElement.classList.add("mirror-element");
            this.insertAfter(mirrorElement, this.element.current);
            
            // Sets in fixed position
            this.setState({
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: this.elementSpaceAttribute.y,
                    left: this.elementSpaceAttribute.x,
                    position: "fixed",
                }, () => {
                    this.element.current.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px;"+
                        "left: " + this.state.left + "px;"+
                        "top: " + this.state.top + "px;"+
                        "position:"+ this.state.position +";";
                }
            )

            // Toggle Open state and class
            let thisElement = this; 
            setTimeout(function(){ 
                const currentState = thisElement.state.isFullScreen;
                thisElement.setState({ isFullScreen: !currentState });
            }, 0);
        }
    }

    render() {
        
        const {
            value,
            count,
            index,
            id,
            gradientIndex,
            gradients,
            changeCount,
        } = this.props;
        
        const newGradient = gradients[gradientIndex];

        const isFullScreenClass = this.state.isFullScreen ? "is-open" : '';
    
        const elementStyle = {
            background: `linear-gradient(190deg, ${newGradient.color1} 0%, ${newGradient.color2} 100%)`,
        };

        return(
            <Fragment>
                <ElementSettings 
                    color1={gradients[gradientIndex].color2}
                    gradients={gradients}
                    gradientIndex={gradientIndex}
                    index={index}
                    key={index}
                    id={id}
                    modifyName={this.props.modifyName}
                    modifyIncrementBy={this.props.modifyIncrementBy}
                    settingsOpen={this.props.settingsOpen}
                    modifyColor={this.props.modifyColor}
                    handleRemoveElement={this.props.handleRemoveElement}
                    toggleSettings={this.handleSettings}
                />
                <div 
                    className={isFullScreenClass +" element justify-content-center d-flex animate__animated animate__fadeInDown"} 
                    ref={this.element}
                >
                    <span className="element__bg" style={elementStyle}></span>

                    <div className="element__actions">
                        {/* toggle Full screen */}
                        <span 
                            className="element__actions-btn" 
                            onClick={() => this.toggleFullScreen()} 
                        >
                            <svg className="element__full-screen"  pointerEvents="all" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="22 22 57 57" x="0px" y="0px">
                                <g><path d="M70,42h8V30a8,8,0,0,0-8-8H58v8H70Z"/><path d="M78,70V58H70V70H58v8H70A8,8,0,0,0,78,70Z"/><path d="M30,78H42V70H30V58H22V70A8,8,0,0,0,30,78Z"/><path d="M30,30H42V22H30a8,8,0,0,0-8,8V42h8Z"/></g>
                            </svg>
                        </span>
                        {/* toggle Settings */}
                        <span
                            className="element__actions-btn hide-full-screen"
                            onClick={() => this.handleSettings()}
                        >
                            <svg className="element__settings" height="512pt" viewBox="0 -21 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="m448 42.667969h-206.613281c9.28125 19.433593 14.613281 41.066406 14.613281 64 0 22.933593-5.332031 44.5625-14.613281 64h206.613281c17.152344 0 33.257812-6.636719 45.3125-18.6875 12.054688-12.054688 18.6875-28.160157 18.6875-45.3125 0-35.285157-28.714844-64-64-64zm0 0"/><path d="m213.332031 106.667969c0 58.910156-47.753906 106.664062-106.664062 106.664062-58.910157 0-106.667969-47.753906-106.667969-106.664062 0-58.910157 47.757812-106.667969 106.667969-106.667969 58.910156 0 106.664062 47.757812 106.664062 106.667969zm0 0"/><path d="m256 362.667969c0-22.933594 5.332031-44.566407 14.613281-64h-206.613281c-35.285156 0-64 28.714843-64 64 0 17.152343 6.632812 33.257812 18.6875 45.3125 12.054688 12.050781 28.160156 18.6875 45.3125 18.6875h206.613281c-9.28125-19.4375-14.613281-41.066407-14.613281-64zm0 0"/><path d="m512 362.667969c0 58.910156-47.757812 106.664062-106.667969 106.664062-58.910156 0-106.664062-47.753906-106.664062-106.664062 0-58.910157 47.753906-106.667969 106.664062-106.667969 58.910157 0 106.667969 47.757812 106.667969 106.667969zm0 0"/>
                            </svg>
                        </span>
                        {/* Decrements */}
                        <span 
                            className="element__actions-btn" 
                            onClick={() => changeCount(index, 'decrement')}
                        >
                            <span className="element__button element__button--minus">-</span>
                        </span>
                    </div>

                    <h6 className="element__title">{value}</h6>
                    <span className="element__count">{count}</span>
                    {/* Increments */}
                    <span className="element__button element__button--plus" onClick={() => changeCount(index, 'increment')}>+</span>
                </div>
            </Fragment>
        );
    }
}

export default Element;