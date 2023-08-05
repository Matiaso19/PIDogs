import React, { useState } from 'react'
import style from './SearchBar.module.css'
import { useDispatch } from 'react-redux';
import {getDogsByName } from '../../redux/actions';


export const SearchBar = () => {
const [dogState, setDogState] = useState('');
const dispatch = useDispatch(); 

const handleChangeSearch = (event) => {
    setDogState(event.target.value)
}
const handleSubmitSearch = (event) => {
    if(!dogState.length) {
        return alert('Please input a name to start the search')
    } else {
       
        dispatch(getDogsByName(dogState));
        
        setDogState('')
    
    }

}
  
  return (
    <div className={style.searchBar}>
        <input type='text' placeholder='Search a breed by name...' className={style.input} value={dogState} onChange={handleChangeSearch}>
        </input>
        <button type='submit' onClick={handleSubmitSearch}>Search!</button>
    </div>
  )
}
        
            
