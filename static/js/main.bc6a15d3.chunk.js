(this.webpackJsonpcounter=this.webpackJsonpcounter||[]).push([[0],{20:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var s=n(0),i=n(1),a=n.n(i),c=n(8),l=n.n(c),o=(n(20),n(9)),r=n(12),d=n(7),u=n(2),m=n(3),p=n(5),h=n(4),g=[{color1:"#4d4d4d",color2:"#2c2c2c"},{color1:"#757EA1",color2:"#456F7B"},{color1:"#9ea2e0",color2:"#5a60dd"},{color1:"#B599DE",color2:"#8951DB"},{color1:"#9B7286",color2:"#A65B7D"},{color1:"#ba8f89",color2:"#c6786c"},{color1:"#C6AB6C",color2:"#A58743"},{color1:"#688D70",color2:"#509264"}],b=n(6),j=function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={value:"",incrementBy:""},e.handleChange=function(t){e.setState({value:t.target.value})},e.handleIncrementByChange=function(t){""!==t.target.value&&e.setState({incrementBy:parseInt(t.target.value)})},e}return Object(m.a)(n,[{key:"render",value:function(){var e=this,t=this.props.settingsOpen?"is-open":"",n=this.props.appIsMute?"Unmute app":"Mute app",i=this.props.isCondensed?"Large view":"Compact view";return Object(s.jsx)("div",{className:"settings "+t,children:Object(s.jsxs)("form",{className:"modify-form",onSubmit:function(t){e.props.modifyName(t,e.state.value,e.props.index),e.props.modifyIncrementBy(e.state.incrementBy,e.props.index,e.props.incrementBy),e.setState({value:""}),e.setState({incrementBy:""}),e.props.toggleSettings(e.props.id)},children:[Object(s.jsxs)("div",{className:"settings__item btn-actions",children:[Object(s.jsx)("div",{className:"btn btn-action",onClick:function(){return e.props.handleReinitElement(e.props.index)},children:"Reinitialise"}),Object(s.jsx)("div",{className:"btn btn-action",onClick:function(){return e.props.toggleFullScreen()},children:"Full screen"}),Object(s.jsx)("div",{className:"btn btn-action",onClick:function(){return e.props.handleMuting()},children:n}),Object(s.jsx)("div",{className:"btn btn-action",onClick:function(){return e.props.handleCondensing()},children:i}),Object(s.jsx)("div",{className:"btn btn-action btn-danger",onClick:function(){return e.props.handleRemoveElement(e.props.index)},children:"Delete"})]}),Object(s.jsx)("hr",{}),Object(s.jsxs)("div",{className:"settings__item",children:[Object(s.jsx)("span",{className:"settings__title",children:"Name:"}),Object(s.jsx)("input",{value:this.state.value,type:"text",placeholder:"Enter a new name",onChange:this.handleChange})]}),Object(s.jsxs)("div",{className:"settings__item",children:[Object(s.jsxs)("span",{className:"settings__title",children:["Step: ",Object(s.jsxs)("span",{className:"settings__title--notice",children:["Now ",this.props.incrementBy," by ",this.props.incrementBy]})]}),Object(s.jsx)("input",{value:this.state.incrementBy,type:"number",placeholder:"How much you want to add every count up ?",onChange:this.handleIncrementByChange})]}),Object(s.jsxs)("div",{className:"settings__item",children:[Object(s.jsx)("span",{className:"settings__title",children:"Color:"}),this.props.gradients.map((function(t,n){var i=e.props.gradients[n].color1,a=e.props.gradients[n].color2,c=n===e.props.gradient?"color-example active":"color-example";return Object(s.jsx)("span",{className:c,onClick:function(){return e.props.modifyColor(n)},children:Object(s.jsx)("div",{className:"color-example__background",style:{backgroundImage:"linear-gradient(190deg, ".concat(i," 0%, ").concat(a," 100%)")}})},n)}))]}),Object(s.jsx)("hr",{}),Object(s.jsx)("div",{className:"settings__item",children:Object(s.jsx)("input",{value:"Save and close",className:"btn btn-primary",style:{background:this.props.color1},type:"submit"})})]})})}}]),n}(i.Component),f=function(e){return Object(s.jsxs)("div",{className:"element__actions",children:[Object(s.jsx)("span",{className:"element__actions-btn hide-list-screen",onClick:function(){return e.toggleFullScreen()},children:Object(s.jsx)("svg",{className:"element__full-screen",pointerEvents:"all",xmlns:"http://www.w3.org/2000/svg","data-name":"Layer 1",viewBox:"22 22 57 57",x:"0px",y:"0px",children:Object(s.jsxs)("g",{children:[Object(s.jsx)("path",{d:"M70,42h8V30a8,8,0,0,0-8-8H58v8H70Z"}),Object(s.jsx)("path",{d:"M78,70V58H70V70H58v8H70A8,8,0,0,0,78,70Z"}),Object(s.jsx)("path",{d:"M30,78H42V70H30V58H22V70A8,8,0,0,0,30,78Z"}),Object(s.jsx)("path",{d:"M30,30H42V22H30a8,8,0,0,0-8,8V42h8Z"})]})})}),Object(s.jsx)("span",{className:"element__actions-btn hide-full-screen",onClick:function(){return e.handleSettings()},children:Object(s.jsxs)("svg",{className:"element__settings",height:"512pt",viewBox:"0 -21 512 512",width:"512pt",xmlns:"http://www.w3.org/2000/svg",children:[Object(s.jsx)("path",{d:"m448 42.667969h-206.613281c9.28125 19.433593 14.613281 41.066406 14.613281 64 0 22.933593-5.332031 44.5625-14.613281 64h206.613281c17.152344 0 33.257812-6.636719 45.3125-18.6875 12.054688-12.054688 18.6875-28.160157 18.6875-45.3125 0-35.285157-28.714844-64-64-64zm0 0"}),Object(s.jsx)("path",{d:"m213.332031 106.667969c0 58.910156-47.753906 106.664062-106.664062 106.664062-58.910157 0-106.667969-47.753906-106.667969-106.664062 0-58.910157 47.757812-106.667969 106.667969-106.667969 58.910156 0 106.664062 47.757812 106.664062 106.667969zm0 0"}),Object(s.jsx)("path",{d:"m256 362.667969c0-22.933594 5.332031-44.566407 14.613281-64h-206.613281c-35.285156 0-64 28.714843-64 64 0 17.152343 6.632812 33.257812 18.6875 45.3125 12.054688 12.050781 28.160156 18.6875 45.3125 18.6875h206.613281c-9.28125-19.4375-14.613281-41.066407-14.613281-64zm0 0"}),Object(s.jsx)("path",{d:"m512 362.667969c0 58.910156-47.757812 106.664062-106.667969 106.664062-58.910156 0-106.664062-47.753906-106.664062-106.664062 0-58.910157 47.753906-106.667969 106.664062-106.667969 58.910157 0 106.667969 47.757812 106.667969 106.667969zm0 0"})]})}),Object(s.jsx)("span",{className:"element__actions-btn",onClick:function(){return e.changeCount(e.index,"decrement")},children:Object(s.jsx)("span",{className:"element__button element__button--minus",children:"-"})})]})},x=n(14),v=function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var s=arguments.length,i=new Array(s),c=0;c<s;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={isFullScreen:!1,settingsOpen:!1,isClicked:!1,width:0,height:0,top:0,left:0,position:"relative",zIndex:3},e.element=a.a.createRef(),e.elementSpaceAttribute="",e.setsWidth=function(){var t=document.querySelector(".element__container").getBoundingClientRect();e.setState({width:t.width}),e.element.current.style.cssText="width: "+e.state.width+"px;"},e.handleSettings=function(){e.setState((function(t,n){return{settingsOpen:!e.state.settingsOpen}})),e.props.toggleSettings(e.props.index)},e.toggleFullScreen=function(){if(e.state.isFullScreen){e.element.current.style.cssText="width: "+e.elementSpaceAttribute.width+"px;height: "+e.elementSpaceAttribute.height+"px;left: "+e.elementSpaceAttribute.x+"px;top: "+e.elementSpaceAttribute.y+"px;position: fixed;z-index: 99;",e.setState({width:e.elementSpaceAttribute.width,height:e.elementSpaceAttribute.height,top:e.elementSpaceAttribute.y,left:e.elementSpaceAttribute.x,position:"fixed",zIndex:"99"},(function(){e.element.current.style.cssText="width: "+e.state.width+"px;height: "+e.state.height+"px;left: "+e.state.left+"px;top: "+e.state.top+"px;position:"+e.state.position+";z-index:"+e.state.zIndex}));var t=Object(b.a)(e);setTimeout((function(){var e=t.state.isFullScreen;t.setState({isFullScreen:!e})}),0),setTimeout(function(){var e=this;this.setState({width:this.elementSpaceAttribute.width,height:this.elementSpaceAttribute.height,top:"",left:"",position:"relative",zIndex:""},(function(){e.element.current.style.cssText="width: "+e.state.width+"px;height: "+e.state.height+"pxleft: "+e.state.left+";top: "+e.state.top+";position:"+e.state.zIndex+";"})),document.querySelector(".mirror-element").remove()}.bind(Object(b.a)(e)),300)}else{e.elementSpaceAttribute=e.element.current.getBoundingClientRect();var n=e.element.current.cloneNode(!0);n.style.cssText="visibility: hidden",n.classList.add("mirror-element"),e.insertAfter(n,e.element.current),e.setState({width:e.elementSpaceAttribute.width,height:e.elementSpaceAttribute.height,top:e.elementSpaceAttribute.y,left:e.elementSpaceAttribute.x,position:"fixed"},(function(){e.element.current.style.cssText="width: "+e.state.width+"px;height: "+e.state.height+"px;left: "+e.state.left+"px;top: "+e.state.top+"px;position:"+e.state.position+";"}));var s=Object(b.a)(e);setTimeout((function(){var e=s.state.isFullScreen;s.setState({isFullScreen:!e})}),0)}},e}return Object(m.a)(n,[{key:"componentDidMount",value:function(){this.setsWidth(),this.elementSpaceAttribute=this.element.current.getBoundingClientRect()}},{key:"insertAfter",value:function(e,t){t.parentNode.insertBefore(e,t.nextSibling)}},{key:"render",value:function(){var e=this,t=this.props,n=t.value,a=t.count,c=t.index,l=t.id,o=(t.gradientIndex,t.gradient),r=t.gradients,d=t.incrementBy,u=t.changeCount,m=this.state.isFullScreen?"is-open":"",p=this.props.appIsCondensed?"is-condensed":"",h=this.state.isClicked?"is-clicked":"",g=this.props.count>9999?"reduced-text-1":"";return Object(s.jsx)(x.a,{onResize:function(){return e.setsWidth()},children:Object(s.jsxs)(i.Fragment,{children:[Object(s.jsx)(j,{gradients:r,gradient:o,index:c,id:l,appIsMute:this.props.appIsMute,isCondensed:this.props.appIsCondensed,incrementBy:d,modifyName:this.props.modifyName,modifyIncrementBy:this.props.modifyIncrementBy,settingsOpen:this.props.settingsOpen,modifyColor:this.props.modifyColor,handleMuting:this.props.handleMuting,handleReinitElement:this.props.handleReinitElement,handleCondensing:this.props.handleCondensing,handleRemoveElement:this.props.handleRemoveElement,toggleSettings:this.handleSettings,toggleFullScreen:this.toggleFullScreen},c),Object(s.jsxs)("div",{className:m+" "+p+" element justify-content-center d-flex animate__animated animate__fadeInDown",ref:this.element,children:[Object(s.jsx)("span",{className:"element__bg"}),Object(s.jsx)(f,{handleSettings:this.handleSettings,index:c,changeCount:u,toggleFullScreen:this.toggleFullScreen}),Object(s.jsxs)("h6",{className:"element__title",children:[n,Object(s.jsxs)("span",{className:"element__title--notice",children:[" (+",d,")"]})]}),Object(s.jsx)("span",{className:h+" "+g+" element__count",children:a}),Object(s.jsx)("span",{className:"element__button element__button--plus",onClick:function(){return u(c,"increment")},onMouseUp:function(t){return e.setState({isClicked:!1})},onMouseDown:function(t){return e.setState({isClicked:!0})},children:"+"})]})]})})}}]),n}(i.Component),O=function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={value:""},e.handleChange=function(t){e.setState({value:t.target.value})},e.handleAddElement=function(t){t.preventDefault();var n=e.props.elements,s=(n[n.length-1].gradient+1)%e.props.gradients.length,i={value:e.state.value,count:0,id:e.props.elements.length+1,gradient:s,settingsOpen:!1,incrementBy:1};e.props.addElement(i),e.setState({value:""})},e}return Object(m.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("form",{className:"form-element mt-3",onSubmit:this.handleAddElement,children:[Object(s.jsx)("input",{className:"form-element__input",value:this.state.value,type:"text",placeholder:"Enter a new name",onChange:this.handleChange}),Object(s.jsx)("input",{type:"submit",className:"form-element__btn btn btn-primary",value:"Add"}),Object(s.jsx)("span",{className:"bg-btn"})]})}}]),n}(i.Component),y=(n(23),n.p+"static/media/clic.92f35524.mp3"),S=function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var s=arguments.length,i=new Array(s),c=0;c<s;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={elements:[{id:1,value:"Glass of water",count:3,gradient:2,color1:"#ba8f89",color2:"#c6786c",settingsOpen:!1,incrementBy:1},{id:2,value:"Pushups",count:50,gradient:3,color1:"#ba8f89",color2:"#c6786c",settingsOpen:!1,incrementBy:10},{id:3,value:"Day without smoking",count:17,gradient:4,color1:"#ba8f89",color2:"#c6786c",settingsOpen:!1,incrementBy:1}],gradients:g,gradient:2,isMute:!1,isCondensed:!1,soundPlaying:0},e.audio=[],e.handleCountChange=function(t,n){e.state.isMute||(e.audio[e.state.soundPlaying].load(),e.audio[e.state.soundPlaying].play()),e.setState({soundPlaying:(e.state.soundPlaying+1)%10});var s=e.state.elements[t].incrementBy;0!==s&&""!==s||(s=parseInt(1)),"increment"===n?(parseInt(s),e.setState((function(e){return{count:e.elements[t].count+=s}}))):"decrement"===n&&e.setState((function(e){return{count:e.elements[t].count-=s}}))},e.handleMuting=function(){e.setState({isMute:!e.state.isMute})},e.handleCondensing=function(){e.setState({isCondensed:!e.state.isCondensed})},e.handleAddElement=function(t){e.setState((function(e){return{elements:[].concat(Object(d.a)(e.elements),[t])}})),e.scrollToListTop()},e.handleRemoveElement=function(t){var n=e.state.elements;n.splice(t,1),e.setState({elements:n})},e.setStateElement=function(t,n,s){return e.setState((function(e){var i=e.elements;return{elements:[].concat(Object(d.a)(i.slice(0,t)),[Object(r.a)(Object(r.a)({},i[t]),{},Object(o.a)({},n,s))],Object(d.a)(i.slice(t+1)))}}))},e.modifyName=function(t,n,s){t.preventDefault(),""!==n&&e.setStateElement(s,"value",n)},e.modifyIncrementBy=function(t,n,s){""!==t&&"0"!==t?(console.log(t),e.setStateElement(n,"incrementBy",t)):null!=t&&"0"!==t||e.setStateElement(n,"incrementBy",s)},e.modifyColor=function(t){e.setState({gradient:t})},e.handleReinitElement=function(t){return e.setStateElement(t,"count",0)},e.toggleSettings=function(t){var n=!e.state.elements[t].settingsOpen;e.setStateElement(t,"settingsOpen",n)},e.scrollToListTop=function(){return e.container.current.scrollIntoView()},e.container=a.a.createRef(),e}return Object(m.a)(n,[{key:"componentDidMount",value:function(){for(var e=0;e<10;e++)this.audio=[].concat(Object(d.a)(this.audio),[new Audio(y)]),this.audio[e].preload="auto";this.modifyColor(2)}},{key:"removeClassByPrefix",value:function(e,t){var n=new RegExp("\\b"+t+"[^ ]*[ ]?\\b","g");return e.className=e.className.replace(n,""),e}},{key:"render",value:function(){var e=this,t=this.state.isCondensed?"is-condensed":"",n="gradient-"+this.state.gradient;return Object(s.jsx)("div",{className:t+" "+n+" background-gradient",children:Object(s.jsxs)("div",{className:"container",children:[Object(s.jsxs)("div",{className:"element__container",children:[this.state.elements.map((function(t,n){return Object(s.jsx)(v,{value:t.value,count:t.count,index:n,id:t.id,incrementBy:t.incrementBy,gradientIndex:t.gradient,gradient:e.state.gradient,gradients:e.state.gradients,appIsMute:e.state.isMute,appIsCondensed:e.state.isCondensed,settingsOpen:t.settingsOpen,changeCount:e.handleCountChange,modifyColor:e.modifyColor,modifyName:e.modifyName,handleMuting:e.handleMuting,handleCondensing:e.handleCondensing,modifyIncrementBy:e.modifyIncrementBy,toggleSettings:e.toggleSettings,handleReinitElement:e.handleReinitElement,handleRemoveElement:e.handleRemoveElement},n)})),Object(s.jsx)("div",{ref:this.container,className:"anchor"})]}),Object(s.jsx)("div",{className:"element__container element__container--form",children:Object(s.jsx)(O,{elements:this.state.elements,addElement:this.handleAddElement,gradients:this.state.gradients})})]})})}}]),n}(i.Component),C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,s=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),s(e),i(e),a(e),c(e)}))};l.a.render(Object(s.jsx)(S,{}),document.getElementById("root")),C()}},[[24,1,2]]]);
//# sourceMappingURL=main.bc6a15d3.chunk.js.map