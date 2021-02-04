import React, {Component} from 'react';
import ElementSettings from './ElementSettings';

class Element extends Component {
    
    state = {
        isFullScreen: false,
        settingsOpen: false,
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
    
    toggleFullScreen = () => {

        // CLOSING
        if (this.state.isFullScreen) {
            
            // Sets back original positionning
            const marginAdjustedTop = this.elementSpaceAttribute.y - 16;
            this.element.current.style.cssText = 
                "width: " + this.elementSpaceAttribute.width + "px;"+
                "height: " + this.elementSpaceAttribute.height + "px;"+
                "left: " + this.elementSpaceAttribute.x + "px;"+
                "top: " + marginAdjustedTop + "px;"+
                "position: fixed;" + 
                "z-index: 99;";
            
            // Toggle Open state and class
            const that = this; 
            setTimeout(function(){ 
                const currentState = that.state.isFullScreen;
                that.setState({ isFullScreen: !currentState });
            }, 0);
            
            // Fixes once animation is done and Removes mirror element
            const thisElement = this; 
            setTimeout(function(){ 
                thisElement.element.current.style.cssText = 
                "width: " + thisElement.elementSpaceAttribute.width + "px;"+
                "height: " + thisElement.elementSpaceAttribute.height + "px;"+
                "position: relative;" +
                "z-index: ;"+
                "left: ;"+
                "top: ;";
                
                // Remove copy in DOM
                document.querySelector('.mirror-element').remove();
            }, 300);
        }
        // OPENING
        else {
            // Create copy in dom
            const mirrorElement = this.element.current.cloneNode(true);
            mirrorElement.style.cssText = "visibility: hidden";
            mirrorElement.classList.add("mirror-element");
            this.insertAfter(mirrorElement, this.element.current);
            
            // Sets in fixed position
            const marginAdjustedTop = this.elementSpaceAttribute.y - 16;
            this.element.current.style.cssText = 
                "width: " + this.elementSpaceAttribute.width + "px;"+
                "height: " + this.elementSpaceAttribute.height + "px;"+
                "left: " + this.elementSpaceAttribute.x + "px;"+
                "top: " + marginAdjustedTop + "px;"+
                "margin: 0 !important;"+
                "position: fixed;";

            // Toggle Open state and class
            const thisElement = this; 
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
            toggleSettings,
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
            <div>
                <div 
                    className={isFullScreenClass +" element my-3 justify-content-center d-flex animate__animated animate__fadeInDown"} 
                    ref={this.element}
                >
                    <span className="element__bg" style={elementStyle}></span>
                    <svg 
                    onClick={() => this.toggleFullScreen()} 
                    className="element__full-screen" 
                    pointerEvents="all"
                    xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="22 22 57 57" x="0px" y="0px">
                            <g><path d="M70,42h8V30a8,8,0,0,0-8-8H58v8H70Z"/><path d="M78,70V58H70V70H58v8H70A8,8,0,0,0,78,70Z"/><path d="M30,78H42V70H30V58H22V70A8,8,0,0,0,30,78Z"/><path d="M30,30H42V22H30a8,8,0,0,0-8,8V42h8Z"/></g>
                    </svg>
                    <svg height="512pt" viewBox="0 -21 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"
                        onClick={() => toggleSettings(id)} 
                        className="element__settings"
                    >
                        <path d="m448 42.667969h-206.613281c9.28125 19.433593 14.613281 41.066406 14.613281 64 0 22.933593-5.332031 44.5625-14.613281 64h206.613281c17.152344 0 33.257812-6.636719 45.3125-18.6875 12.054688-12.054688 18.6875-28.160157 18.6875-45.3125 0-35.285157-28.714844-64-64-64zm0 0"/><path d="m213.332031 106.667969c0 58.910156-47.753906 106.664062-106.664062 106.664062-58.910157 0-106.667969-47.753906-106.667969-106.664062 0-58.910157 47.757812-106.667969 106.667969-106.667969 58.910156 0 106.664062 47.757812 106.664062 106.667969zm0 0"/><path d="m256 362.667969c0-22.933594 5.332031-44.566407 14.613281-64h-206.613281c-35.285156 0-64 28.714843-64 64 0 17.152343 6.632812 33.257812 18.6875 45.3125 12.054688 12.050781 28.160156 18.6875 45.3125 18.6875h206.613281c-9.28125-19.4375-14.613281-41.066407-14.613281-64zm0 0"/><path d="m512 362.667969c0 58.910156-47.757812 106.664062-106.667969 106.664062-58.910156 0-106.664062-47.753906-106.664062-106.664062 0-58.910157 47.753906-106.667969 106.664062-106.667969 58.910157 0 106.667969 47.757812 106.667969 106.667969zm0 0"/>
                    </svg>
                    <h6 className="element__title">{value}</h6>
                    <span className="element__count">{count}</span>
                    <button className="element__button element__button--plus" onClick={() => changeCount(index, +1)}>+</button>
                    <button className="element__button element__button--minus" onClick={() => changeCount(index, -1)}>-</button>
                </div>
                <ElementSettings 
                    color1={gradients[gradientIndex].color2}
                    gradients={gradients}
                    gradientIndex={gradientIndex}
                    index={index}
                    id={id}
                    modifyElement={this.props.modifyElement}
                    settingsOpen={this.props.settingsOpen}
                    changeColor={this.props.changeColor}
                    handleRemove={this.props.handleRemove}
                />
            </div>
        );
    }
}

export default Element;