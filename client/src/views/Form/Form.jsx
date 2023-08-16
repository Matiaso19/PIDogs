import { useEffect, useState } from 'react';
import style from './Form.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from '../../redux/actions';
import { useHistory } from 'react-router-dom';



const Chip = ({ label, onDelete }) => {
    return (
      <div className={style.chip}>
        {label}
        <span onClick={onDelete}>
          &times;
        </span>
      </div>
    );
  };


  const Form = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let temperaments = useSelector((state) => state.temperaments).sort(
        function (a, b) {
            if(a < b) return -1
            else return 1
        }
    );

    let dogNames = useSelector((state) => state.dogs.map((dog)=>dog.name))
    

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const [form, setForm] = useState({
        name: '',
        heightMin: '',
        weightMin: '',
        heightMax: '',
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
        temperaments: [],
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
       const newSelectedTemperaments = [];
       for (const temp of selectedOptions) {
            if(!selectedTemperaments.includes(temp)) {
                newSelectedTemperaments.push(temp)
            }
       }
       setSelectedTemperaments((prevSelectedTemperaments) => [...prevSelectedTemperaments, ...newSelectedTemperaments]);
       
       validate({ ...form, temperaments: [...selectedTemperaments, ...newSelectedTemperaments] });
    

    
    }

    const handleDeleteTemperament = (temperament) => {
        setSelectedTemperaments(function(oldTemperaments){ 
            return oldTemperaments.filter((temp)=> temp !== temperament)
        });
    }
    

    const changeHandler = (event) => {
        const property = event.target.name;
        let value = event.target.value;
        if(property === 'name') {
            value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            
        }
        
        
       validate({...form, [property]: value})

        setForm({...form, [property]: value})
    }



    const validate = (data) => {
        const newErrors = {};
        if(!data.lifeSpan) {
            newErrors.lifeSpan = 'Life Span is required'
        }
        if(data.lifeSpan > 30) {
            newErrors.lifeSpan = 'Life Span cannot be higher than 30'
        }
        if(data.lifeSpan && data.lifeSpan <= 0) {
            newErrors.lifeSpan = 'This value cannot be negative'
        }
        if(data.image) {
            const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
            if(!imageRegex.test(data.image)) {
                newErrors.image = 'Please, enter a valid image format (jpg, jpeg, png o gif)'
            }
        }
        if (data.name && !(/^[A-Za-z\s]+$/).test(data.name)) {
            newErrors.name = 'Name must not contain numbers or especial caracters';
          } else {
              newErrors.name = '';
          }
          if (!data.weightMin) {
              newErrors.weightMin = 'Weight Min is required';
          } else if (data.weightMin < 0) {
              newErrors.weightMin = 'Weight Min cannot be negative';
          }
      
          if (!data.weightMax) {
              newErrors.weightMax = 'Weight Max is required';
          } else if (data.weightMax < 0) {
              newErrors.weightMax = 'Weight Max cannot be negative';
          }
      
          if (data.weightMin >= 0 && data.weightMax >= 0 && parseInt(data.weightMin) > parseInt(data.weightMax)) {
              newErrors.weightMin = 'The minimum weight cannot be greater than the maximum weight';
              newErrors.weightMax = 'The maximum weight cannot be less than the minimum weight';
          }
          if (!data.heightMin) {
            newErrors.heightMin = 'Height Min is required';
        } else if (data.heightMin < 0) {
            newErrors.heightMin = 'Height Min cannot be negative';
        }
    
        if (!data.heightMax) {
            newErrors.heightMax = 'Height Max is required';
        } else if (data.heightMax < 0) {
            newErrors.heightMax = 'Height Max cannot be negative';
        }
    
        if (data.heightMin >= 0 && data.heightMax >= 0 && parseInt(data.heightMin) > parseInt(data.heightMax)) {
            newErrors.heightMin = 'The minimum height cannot be greater than the maximum height';
            newErrors.heightMax = 'The maximum height cannot be less than the minimum height';
        } 
        if (dogNames.includes(data.name)) {
            newErrors.name = 'This name already exists in the database, please choose another one';
        }
        
        if(data.temperaments.length === 0) {
            newErrors.temperaments = 'Please, choose one temperament'
        } else {
            newErrors.temperaments = '';
        }
        
        setErrors(newErrors);
        
        return newErrors;
      }
      

    const submitHandler = async (event) => {
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
            
        )
         { 
            return alert('All fields must be complete')
        } else {
            try {
                await axios.post('http://localhost:3001/dogs', form)
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
                history.push('/home');
            
               
                
            } catch (err) {
                alert(err)
            }

        }


    }

    return (
        <form onSubmit={submitHandler} className={style.container}>
            
            <div className={style.formContainer}>
            <div className={style.info}>

            
            <label><span className={style.title}>Name:</span> </label>
            <input className={style.input} type='text' value={form.name} onChange={changeHandler} name='name'></input>
            <div>
            <span>

            {errors.name && <span className={style.error}>{errors.name}</span>}
            </span>
            </div>
            

            <div>
            <label><span className={style.title}>Height Min:</span> </label>
            <input className={style.input} type='number' value={form.heightMin} onChange={changeHandler}name='heightMin'></input>
            <div>
            {errors.heightMin && <span className={style.error}>{errors.heightMin}</span>}

            </div>
            </div>
            <div>
            
            <label><span className={style.title}>Height Max: </span> </label>
            <input className={style.input} type='number' value={form.heightMax} onChange={changeHandler} name='heightMax'></input>
            <div>

            {errors.heightMax && <span className={style.error}>{errors.heightMax}</span>}
            </div>
            </div>

            <div>
            
            <label><span className={style.title}>Weight Min: </span> </label>
            <input className={style.input} type='number' value={form.weightMin} onChange={changeHandler} name='weightMin'></input>
            <div>

            {errors.weightMin && <span className={style.error}>{errors.weightMin}</span>}
            </div>
            </div>
            <div>
            <label><span className={style.title}>Weight Max: </span> </label>
            <input className={style.input} type='number' value={form.weightMax} onChange={changeHandler} name='weightMax'></input>
            <div>

            {errors.weightMax && <span className={style.error}>{errors.weightMax}</span>}
            </div>
            </div>

            <div>
            <label><span className={style.title}>Life Span: </span> </label>
            <input className={style.input} type='number' value={form.lifeSpan} onChange={changeHandler} name='lifeSpan'></input>
            <div>

            {errors.lifeSpan && <span className={style.error}>{errors.lifeSpan}</span>}
            </div>
            </div>
            <div>
            <label><span className={style.title}>Image: </span> </label>
            <input className={style.input} type='text' value={form.image} onChange={changeHandler} name='image'></input>
            {errors.image && <span className={style.error}>{errors.image}</span>}
            </div>

            <div>
            <label><span className={style.title}>Temperaments(choose one): </span> </label>
             <select className={style.list} multiple options={temperaments} onChange={handleTemperamentsChange} value={selectedTemperaments} name='temperaments'>
            {temperaments.map((temperament) => (
                <option key={temperament} value={temperament}>
                    {temperament}
                </option>
            ))}
            </select>
            
            </div>
            {/*mostrar los temperamentos como chips*/ }
            <div>
            <p><span className={style.title}>Selected Temperaments: </span> </p>
            <div >
                {selectedTemperaments.map((temperament)=> (
                    <Chip key={temperament} label={temperament} onDelete={()=> handleDeleteTemperament(temperament)}></Chip>
                ))}
            </div>
            {errors.temperaments && <span className={style.error}>{errors.temperaments}</span>}
            </div>
            
            
            
            


        </div>
            <div >
            <button className={style.button} type='submit'>CREATE YOUR DOG!!</button>
            </div>
        </div>
        
        </form>
    )
}

export default Form;
       

            
            
        
        
        
        
        
    
        


    
    
    
    
    


   