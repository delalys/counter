//---------//
// Helpers //
//---------//


// Eases value changes in an element, takes in: index (number) | property to change (string) | new value
// export default function setStateElement(indexElement, property, newValue) {
//     var newElements =   
//       [...this.props.elements.elements.slice(0,indexElement), {
//         ...this.props.elements.elements[indexElement], 
//           [property]: newValue,
//       },
//       ...this.props.elements.elements.slice(indexElement+1)]
//   return newElements
// }

const helpers = {
    setStateElement: function(elements, indexElement, property, newValue) {
        var newElements =   
          [...elements.slice(0,indexElement), {
            ...elements[indexElement], 
              [property]: newValue,
          },
          ...elements.slice(indexElement+1)]
      return newElements
    },

}

// setStateElement = (indexElement, property, newValue) =>  {
//     return {
//       ...this.props.elements, elements: [
//         ...this.props.elements.elements.slice(0,indexElement),
//         {
//           ...this.props.elements.elements[indexElement],
//           [property]: newValue,
//         },
//         ...this.props.elements.elements.slice(indexElement+1)
//       ]
//     }
//   }

export default helpers;
