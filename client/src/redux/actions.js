import axios from 'axios'
const URL = 'http://localhost:3001/'



export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";

export const getDogs = () => {
    return async function(dispatch){
        const apiData = await axios.get(`${URL}dogs`)
        const dogs = apiData.data;
        dispatch({type: GET_DOGS, payload: dogs})
    }
};

/*export const getDogDetail = (id) => {
    return async function(dispatch) {
        //aca hay que poner la url con el ID recibido por parametros
        const apiData = await axios.get(`${URL}:idRaza`)
        const dog = apiData.data;
        dispatch({ type: GET_DOG_DETAIL, payload: dog})
    }
}*/