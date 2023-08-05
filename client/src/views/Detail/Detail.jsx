import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getDogDetail } from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import style from './Detail.module.css'





const Detail = () => {

    const {idRaza} = useParams();
   
     
   
    const myDog = useSelector((state)=>state.details)
    const dispatch = useDispatch();
    
    console.log(myDog);
    
    useEffect(() => {
        dispatch(getDogDetail(idRaza))
    }, [idRaza])
    
    /*const buscar = isNaN(idRaza) ? "bdd" : "api"
    if(buscar === "api") {*/

        const temperaments = myDog.temperament;
        return (
            <>
            {myDog.map(dog =>{
                return (
                    <div className={style.card}>

                    <div key= {dog.id} className={style.imageArea}>
    
                    <img src= {dog.image} alt={dog.name} className={style.dogImage} />
                    <h3>Name: {dog.name}</h3>
                    <h3>Id: {dog.id}</h3>
                    
                    <h3>Height: {dog.height}</h3>
                    <h3>Weight: {dog.weight}</h3>
                    <h3>Temperament: {dog.Temperament.join(', ')}</h3>
                    <h3>Life_Span: {dog.life_span}</h3>
                    </div>
                    </div>
                )
            })}
            <div>
                <button >GO BACK HOME</button>
            </div>
            </>
        )
    
    /*if(buscar === 'bdd') {
        //console.log(myDog);
        return (
            <>
            {myDog.map((dog) => {
                return (
                    <div key={dog.dataValues.id}>
                    <img src= {dog.dataValues.image} alt={dog.dataValues.name} />
                    <h1>Name: {dog.dataValues.name}</h1>
                    <h3>Id: {dog.dataValues.id}</h3>
                    </div>
                )
            })}
            </>
        )
    }*/
  
}

export default Detail;