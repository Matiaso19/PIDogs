import { GET_DOGS, FILTER_DOGS, GET_DOGS_BY_NAME, GET_DOG_DETAIL, ORDER_DOGS, FILTER_TEMPERAMENTS, FILTER_WEIGHT, GET_TEMPERAMENTS} from './types';
import axios from 'axios'
const URL = 'http://localhost:3001/'


export const getDogs = () => {
    return async function(dispatch){
        const apiData = await axios.get(`${URL}dogs`)
        const dogs = apiData.data;
        dispatch({type: GET_DOGS, payload: dogs})
    }
};
export const getDogsByName = (name) => {
    return async function(dispatch) {
        const apiData = await axios.get(`${URL}dogs?name=${name}`)
        const dogs = apiData.data;
        dispatch({type: GET_DOGS_BY_NAME, payload: dogs})
    }
}
export const filterDogs = (created) => {
    return {
        type: FILTER_DOGS,
        payload: created
    }
}
export const getTemperaments = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/temperaments')
        
        const temperamentsList = apiData.data.map((temp) => temp.name)
       
       return dispatch({type: GET_TEMPERAMENTS, payload: temperamentsList})
    }
}
export const filterTemperaments = (temperament) => {
    return {
        type: FILTER_TEMPERAMENTS,
        payload: temperament
    }
}
export const orderDogs = (order) => {
    return {
        type: ORDER_DOGS,
        payload: order
    }
}
export const orderbyWeight = (order) => {
    return {
        type: FILTER_WEIGHT,
        payload: order
    }
}
export const getDogDetail = (id) => {
    return async function(dispatch) {
    
        
        //aca hay que poner la url con el ID recibido por parametros
        const apiData = await axios.get(`${URL}dogs/${id}`)
        const dog = apiData.data;
        dispatch({ type: GET_DOG_DETAIL, payload: dog})
    
    }
}