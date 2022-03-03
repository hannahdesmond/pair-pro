import axios from 'axios'
import {useState} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    languages: '',
    bio: ''
  })

  const { name, email, password, password2, languages, bio } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:5000/api/users/`, {
      name: name,  
      email: email, 
      password: password,
      languages: languages,
      bio: bio
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    window.location.href = '/'
  }

  return (
  <>
    <section className='heading'>
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit ={onSubmit}>
        <div className="form-group">
          <input 
            type='text' 
            className='form-control' 
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name' 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type='email' 
            className='form-control' 
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email' 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type='password' 
            className='form-control' 
            id='password'
            name='password'
            value={password}
            placeholder='Enter password' 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type='password' 
            className='form-control' 
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm password' 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type='text' 
            className='form-control' 
            id='languages'
            name='languages'
            value={languages}
            placeholder='What languages do you use or are learning?' 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input 
            type='text' 
            className='form-control' 
            id='bio'
            name='bio'
            value={bio}
            placeholder='Tell everyone a bit about yourself' 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
  </>
  )
}

export default Register