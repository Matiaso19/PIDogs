import { useEffect, useState } from 'react';
import style from './Form.module.css';
import axios from 'axios';


//chip
const Chip = ({ label, onDelete }) => {
    return (
      <div className={style.chip}>
        {label}
        <span className={style.closeIcon} onClick={onDelete}>
          &times;
        </span>
      </div>
    );
  };


const Form = () => {
    const [form, setForm] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperaments: [],
        image:''
    });
    const [errors, setErrors] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperaments: [],
        image: ''
    })
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [temperamentList, setTemperamentList] = useState([]);
    
    const handleTemperamentsChange = (event) => {
       const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
       setSelectedTemperaments((prevSelectedTemperaments) => [...prevSelectedTemperaments, ...selectedOptions]);
       setForm({...form, temperaments: selectedTemperaments})
        

    
    }

    const handleDeleteTemperament = (temperament) => {
        setSelectedTemperaments(function(oldTemperaments){ 
            return oldTemperaments.filter((temp)=> temp !== temperament)
        });
    }
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
            <label>Image: </label>
            <input type='text' value={form.image} onChange={changeHandler} name='image'></input>
            </div>

            <div>
            <label>Temperaments: </label>
             <select multiple options={temperamentList} onChange={handleTemperamentsChange} value={selectedTemperaments} name='temperaments'>
            {temperamentList.map((temperament) => (
                <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                </option>
            ))}
            </select>
            
            </div>
            {/*mostrar los temperamentos como chips*/ }
            <div>
            <h3>Selected Temperaments: </h3>
            <div className={style.chipContainer}>
                {selectedTemperaments.map((temperament)=> (
                    <Chip key={temperament} label={temperament} onDelete={()=> handleDeleteTemperament(temperament)}></Chip>
                ))}
            </div>
            </div>
            
            
            
            

            <div>
            <button type='submit'>CREATE NEW DOG</button>
            </div>


        </form>
    )
}

export default Form;