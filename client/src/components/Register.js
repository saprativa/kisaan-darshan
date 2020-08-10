import React, {useState} from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './Login.css'

const stateDistrictBlockList = require('../lib/MasterDatabase.json')

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter First Name."),
  lastName: yup.string().required("Please enter Last Name."),
  age: yup.string().required("Please enter Age."),
  sex: yup.string().matches(/^[a-zA-Z]/, "Please enter Sex."),
  mobile: yup.string().required("Please enter Mobile Number."),
  email: yup.string().email("Please enter a valid Email."),
  village: yup.string().required("Please enter Village."),
  block: yup.string().matches(/^[0-9]/, "Please enter Block."),
  district: yup.string().matches(/^[0-9]/, "Please enter District."),
  state: yup.string().matches(/^[0-9]/, "Please enter State."),
  password: yup.string().required("Please enter Password.")
})

export default function Register() {

  const [isStateSelected, setIsStateSelected] = useState(false)
  const [isDistrictSelected, setIsDistrictSelected] = useState(false)
  const [stateID, setStateID] = useState('')
  const [districtID, setDistrictID] = useState('')
  const [blockID, setBlockID] = useState('')
  const [sex, setSex] = useState('')

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema)
  })

  const history = useHistory();

  const onSubmit = data => {
    axios.post('/api/register', data)
    .then((response) => {
      if(response.data.errors) {
        response.data.errors.forEach(element => {
          setError(element.param, {type: "server", message: element.msg})
        })
      }
      if (response.data.success) {
        history.push("/login")
      }
      if(response.data.exists)
        setError("server", {type: "manual", message: "User already exists!"})
    })
  }

  const stateChangeHandler = (e) => {
    setIsStateSelected(true)
    setIsDistrictSelected(false)
    setStateID(e.target.value)
    setDistrictID('')
    setBlockID('')
  }

  const districtChangeHandler = (e) => {
    setIsDistrictSelected(true)
    setDistrictID(e.target.value)
    setBlockID('')
  }

  const blockChangeHandler = (e) => {
    setBlockID(e.target.value)
  }

  const sexChangeHandler = (e) => {
    setSex(e.target.value)
  }


  return (
     
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

      <p className="error">{errors.server?.message}</p>
      
      <input type="text" name="firstName" placeholder="First Name" ref={register} />
      <p className="error">{errors.firstName?.message}</p>

      <input type="text" name="lastName" placeholder="Last Name" ref={register} />
      <p className="error">{errors.lastName?.message}</p>

      <input type="text" name="age" placeholder="Age" ref={register} />
      <p className="error">{errors.age?.message}</p>

      <select name="sex" value={sex} ref={register} onChange={sexChangeHandler}>
        <option>-- Select Sex --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <p className="error">{errors.sex?.message}</p>

      <input type="text" name="mobile" placeholder="Mobile Number" ref={register} />
      <p className="error">{errors.mobile?.message}</p>

      <input type="text" name="email" placeholder="Email (optional)" ref={register} />
      <p className="error">{errors.email?.message}</p>

      {isStateSelected?
      <>
        <select name="state" value={stateID} ref={register} onChange={stateChangeHandler}>
          <option disabled>-- Select State --</option>
          {stateDistrictBlockList.map((state, index) =>(
          <option key={index} value={index}>
            {state.name}
          </option>
          ))}
        </select>
        <p className="error">{errors.state?.message}</p>

        {isDistrictSelected?
          <>
            <select name="district" value={districtID} ref={register} onChange={districtChangeHandler}>
              <option disabled>-- Select District --</option>
              {stateDistrictBlockList[stateID].districtList.map((district, index) =>(
              <option key={index} value={index}>
                {district.name}
              </option>
              ))}
            </select>
            <p className="error">{errors.district?.message}</p>

            <select name="block" value={blockID} ref={register} onChange={blockChangeHandler}>
              <option>-- Select Block --</option>
              {stateDistrictBlockList[stateID].districtList[districtID].blockList.map((block, index) =>(
              <option key={index} value={index}>
                {block}
              </option>
              ))}
            </select>
            <p className="error">{errors.block?.message}</p>
          </>
          :
          <>
            <select name="district" value={districtID} ref={register} onChange={districtChangeHandler}>
              <option>-- Select District --</option>
              {stateDistrictBlockList[stateID].districtList.map((district, index) =>(
              <option key={index} value={index}>
                {district.name}
              </option>
              ))}
            </select>
            <p className="error">{errors.district?.message}</p>

            <select name="block" value={blockID} ref={register} onChange={blockChangeHandler}>
              <option>-- Select Block --</option>
            </select>
            <p className="error">{errors.block?.message}</p>
          </>
        }
      </>
        :
      <>
        <select name="state" value={stateID} ref={register} onChange={stateChangeHandler}>
          <option>-- Select State --</option>
          {stateDistrictBlockList.map((state, index) =>(
          <option key={index} value={index}>
            {state.name}
          </option>
          ))}
        </select>
        <p className="error">{errors.state?.message}</p>

        <select name="district" value={districtID} ref={register} onChange={districtChangeHandler}>
          <option>-- Select District --</option>
        </select>
        <p className="error">{errors.district?.message}</p>

        <select name="block" value={blockID} ref={register} onChange={blockChangeHandler}>
          <option>-- Select Block --</option>
        </select>
        <p className="error">{errors.block?.message}</p>
      </>
      }

      <input type="text" name="village" placeholder="Village" ref={register} />
      <p className="error">{errors.village?.message}</p>
        
      <input type="password" name="password" placeholder="Password" ref={register} />
      <p className="error">{errors.password?.message}</p>
      
      <input type="submit" value="Register" />
    </form>
  )
}