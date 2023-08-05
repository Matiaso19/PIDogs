import { GET_DOGS, FILTER_DOGS, GET_DOGS_BY_NAME, GET_DOG_DETAIL, ORDER_DOGS, FILTER_TEMPERAMENTS, GET_TEMPERAMENTS, FILTER_WEIGHT} from './types'


const initialState = {
    dogs: [],
    allDogs: [],
    details: [],
    temperaments: []
};
const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_DOGS:

            return {...state, 
                dogs: action.payload, 
                allDogs: action.payload
            }

        case GET_DOGS_BY_NAME: 
        return {...state, dogs: action.payload}

        case FILTER_DOGS:
          const filteredDogs = action.payload !== 'All'
            ? state.allDogs.filter((dog) => dog.created === (action.payload === 'true'))
            : state.allDogs 
            return {
              ...state,
              dogs: filteredDogs
            }
            
        case GET_TEMPERAMENTS: 
            return {
              ...state,
              temperaments: action.payload
            } 
          case FILTER_TEMPERAMENTS: 
              const filterTemp = state.allDogs.filter((dog) => {
                if(dog.temperament){
                  const dogsTempArray = dog.temperament.split(',').map((temp) =>  temp.trim());
                    return dogsTempArray.includes(action.payload)
                  } else {
                    return false
                  }
                  
                });
              return {
                ...state,
                dogs: filterTemp
              }      
        
        case FILTER_WEIGHT: 
              let dogsByWeight = [...state.dogs].sort((a,b)=>{
                if(a.weightMin > b.weightMin) {
                  return action.payload === 'min' ? 1 : -1
                } else if(a.weightMin < b.weightMin) {
                  return action.payload === 'max' ? 1 : -1
                } else return 0;
              })
              return {
                ...state,
                dogs: dogsByWeight
              }

        case ORDER_DOGS:
            let orderedDogs = [...state.dogs].sort((a, b) => {
                if (a.name > b.name) {
                    return action.payload === "Ascendent" ? 1 : -1;
                  } else if (a.name < b.name) {
                    return action.payload === "Descendent" ? 1 : -1;
                  } else return 0;
                });
                return {
                  ...state,
                  dogs: orderedDogs,
                };
            
        

        case GET_DOG_DETAIL: 
                return {
                    ...state,
                    details: action.payload
                }
            
        default:
            return {...state}
    }
};

export default rootReducer;