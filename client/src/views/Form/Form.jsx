import { useEffect, useState } from 'react';
import style from './Form.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


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
    const history = useHistory();
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
        temperaments: '',
        image: ''
    })
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [temperamentList, setTemperamentList] = useState([]);
    
    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            temperaments: selectedTemperaments
        }));
    }, [selectedTemperaments]);

    const handleTemperamentsChange = (event) => {
       const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
       setSelectedTemperaments((prevSelectedTemperaments) => [...prevSelectedTemperaments, ...selectedOptions]);
       //setForm({...form, temperaments: selectedTemperaments})
    

    
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
        const newErrors = {};
      
        if (form.heightMax && form.heightMin > form.heightMax) {
          newErrors.heightMin = 'La altura mínima no puede ser mayor que la altura máxima';
        } else {
          newErrors.heightMin = '';
        }
      
        if (form.weightMax && form.weightMin > form.weightMax) {
          newErrors.weightMin = 'El peso mínimo no puede ser mayor que el peso máximo';
        } else {
          newErrors.weightMin = '';
        }
      
        if (form.name && !(/^[A-Za-z]+$/).test(form.name)) {
          newErrors.name = 'El nombre solo puede contener letras, no números ni caracteres especiales';
        } else {
          newErrors.name = '';
        }
        
        
        setErrors(newErrors);
        
        return newErrors;
      }
      

    const submitHandler = (event) => {
        event.preventDefault();
        setErrors(validate(form))
        
       
    if(!Object.values(errors).every((value)=> value === '')) { alert('Hay errores en los datos cargados o hay campos sin completar');
        
    }
        else if (
            form.name === '' ||
            form.heightMin === '' ||
            form.heightMax === '' ||
            form.weightMin === '' ||
            form.weightMax === '' ||
            form.lifeSpan === '' 
            //!form.temperaments.length
        )
         { 
            return alert('Hay campos sin completar')
        } else {
            try {
                const response = axios.post('http://localhost:3001/dogs', form)
                   .then(res => alert('La raza fue creada exitosamente'))
                   .catch(err => alert(err))
                setForm({
                    name: '',
                    heightMin: '',
                    heightMax: '',
                    weightMin: '',
                    weightMax: '',
                    lifeSpan: '',
                    temperaments: [],
                    image:''
                })
            
               
                
            } catch (err) {
                alert(err)
            }

        }


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
            {errors.name && <span>{errors.name}</span>}
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
            {errors.weightMin && <span>{errors.weightMin}</span>}
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