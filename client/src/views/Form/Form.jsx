import { useEffect, useState } from 'react';
import style from './Form.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from '../../redux/actions';


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
    const dispatch = useDispatch();
    let temperaments = useSelector((state) => state.temperaments).sort(
        function (a, b) {
            if(a < b) return -1
            else return 1
        }
    );
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const [form, setForm] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperaments: [],
        image:'',
        
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
    
    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            temperaments: selectedTemperaments
        }));
    }, [selectedTemperaments]);

    const handleTemperamentsChange = (event) => {
       const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
       setSelectedTemperaments((prevSelectedTemperaments) => [...prevSelectedTemperaments, ...selectedOptions]);
       
    

    
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
          newErrors.heightMin = 'The minimum height cannot be greater than the maximum height';
        } else {
          newErrors.heightMin = '';
        }
      
        if (form.weightMax && form.weightMin > form.weightMax) {
          newErrors.weightMin = 'The minimum weight cannot be greater than the maximum weight';
        } else {
          newErrors.weightMin = '';
        }
      
        if (form.name && !(/^[A-Z][a-zA-Z]*$/).test(form.name)) {
          newErrors.name = 'The Name must begin with a capital letter and must not contain numbers or special characters';
        } else {
          newErrors.name = '';
        }
        
        
        setErrors(newErrors);
        
        return newErrors;
      }
      

    const submitHandler = (event) => {
        event.preventDefault();
        setErrors(validate(form))
        
       
    if(!Object.values(errors).every((value)=> value === '')) { alert('There are errors in the uploaded data or there are fields not completed');
        
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
            return alert('All fields must be complete')
        } else {
            try {
                axios.post('http://localhost:3001/dogs', form)
                   .then(res => alert('Your dog has been created successfully'))
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
             <select multiple options={temperaments} onChange={handleTemperamentsChange} value={selectedTemperaments} name='temperaments'>
            {temperaments.map((temperament) => (
                <option key={temperament} value={temperament}>
                    {temperament}
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