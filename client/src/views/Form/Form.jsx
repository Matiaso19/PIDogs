import { useEffect, useState } from 'react';
import style from './Form.module.css';
import axios from 'axios';

const Form = () => {
    const [form, setForm] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperaments: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperaments: ''
    })
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        validate({...form, [property]: value})
        setForm({...form, [property]: value})
    }
    const validate = (form) => {
        if(form.heightMax && form.heightMin > form.heightMax) {setErrors({...errors, heightMin: 'La altura minima no puede ser mayor que la altura maxima'});
    } else {
        setErrors({...errors, heightMin: ''})
    }
        return errors;
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const response = axios.post('http://localhost:3001/dogs', form)
        .then(res => alert(res))
        .catch(err => alert(err))

    }
    const [temperamentList, setTemperamentList] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3001/temperaments')
        .then((res)=> setTemperamentList(res.data))
        .catch((err) => alert(err))
    }, []);

    return (
        <form onSubmit={submitHandler}>
            <div>
            <label>Name: </label>
            <input type='text' value={form.name} onChange={changeHandler} name='name'></input>
            </div>

            <div>
            <label>Heigth Min: </label>
            <input type='number' value={form.heightMin} onChange={changeHandler}name='heightMin'></input>
            {errors.heightMin && <span>{errors.heightMin}</span>}
            </div>
            <div>
            <label>Heigth Max: </label>
            <input type='number' value={form.heightMax} onChange={changeHandler} name='heightMax'></input>
            </div>

            <div>
            <label>Weight Min: </label>
            <input type='number' value={form.weightMin} onChange={changeHandler} name='weightMin'></input>
            </div>
            <div>
            <label>Weight Max: </label>
            <input type='number' value={form.weightMax} onChange={changeHandler} name='weightMax'></input>
            </div>

            <div>
            <label>Life Span: </label>
            <input type='number' value={form.lifeSpan} onChange={changeHandler} name='lifeSpan'></input>
            </div>

            <div>
            <label>Temperaments: </label>
            <select onChange={changeHandler} name='temperaments'>

            <option value=''>Select a Temperament</option>
            {temperamentList.map((temperament) => (
                <option key={temperament.id} value={temperament.name}> {temperament.name}</option>
                ))}
            </select>
            </div>

            <div>
            <button type='submit'>CREATE NEW DOG</button>
            </div>


        </form>
    )
}

export default Form;