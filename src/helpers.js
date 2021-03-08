//---------//
// Helpers //
//---------//

const helpers = {
    setStateElement: function(elements, indexElement, property, newValue, addToList) {
      if (addToList === undefined) {
        var newElements =   
          [...elements.slice(0,indexElement), {
            ...elements[indexElement], 
              [property]: newValue,
            },
            ...elements.slice(indexElement+1)]
      } else if (addToList) {
        newElements = elements;
        newElements[indexElement][property].push(newValue);
      } else if (addToList === false) {
        newElements = elements;
        newElements[indexElement][property].pop();
      }
      return newElements
    },

}

export default helpers;
