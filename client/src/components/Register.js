import React, {useState, useContext} from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './styles.css'
import { Input, FormFeedback, FormGroup, Alert, Button } from 'reactstrap'
import classnames from 'classnames'
import { AuthContext } from '../context/AuthContext'

const stateDistrictBlockList = require('../lib/MasterDatabase.json')

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter First Name."),
  lastName: yup.string().required("Please enter Last Name."),
  age: yup.string().required("Please enter Age."),
  sex: yup.string().matches(/^[a-zA-Z]/, "Please enter Sex."),
  mobile: yup.string().required("Please enter Mobile Number.").min(10, "Invalid Mobile Number.").max(10, "Invalid Mobile Number."),
  email: yup.string().email("Please enter a valid Email."),
  village: yup.string().required("Please enter Village."),
  block: yup.string().matches(/^[a-zA-Z]/, "Please enter Block."),
  district: yup.string().matches(/^[a-zA-Z]/, "Please enter District."),
  state: yup.string().matches(/^[a-zA-Z]/, "Please enter State."),
  password: yup.string().required("Please enter Password.").min(5, "Minimum 5 characters.")
})

export default function Register() {

  const [isStateSelected, setIsStateSelected] = useState(false)
  const [isDistrictSelected, setIsDistrictSelected] = useState(false)
  const [stateID, setStateID] = useState('')
  const [state, setState] = useState('')
  const [districtID, setDistrictID] = useState('')
  const [district, setDistrict] = useState('')
  const [block, setBlock] = useState('')
  const [sex, setSex] = useState('')

  const { register, handleSubmit, errors, setError, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const {isAuthenticated} = useContext(AuthContext)

  const watchAllFields = watch()

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
    setStateID(e.target.options.selectedIndex - 1)
    setState(e.target.value)
    setDistrictID('')
    setDistrict('')
    setBlock('')
  }

  const districtChangeHandler = (e) => {
    setIsDistrictSelected(true)
    setDistrictID(e.target.options.selectedIndex - 1)
    setDistrict(e.target.value)
    setBlock('')
  }

  const blockChangeHandler = (e) => {
    setBlock(e.target.value)
  }

  const sexChangeHandler = (e) => {
    setSex(e.target.value)
  }


  return (

    <div className="outer">

      {
        isAuthenticated
        ? <p className="loginForm">You must be logged out to register another user.</p>
        :
        <form className="registrationForm mb-5 mt-5" onSubmit={handleSubmit(onSubmit)}>

          {
            errors.server?
            <Alert color="danger">
              {errors.server?.message}
            </Alert>
            :
            <p></p>
          }

          <FormGroup>
            <Input type="text" name="firstName" placeholder="First Name" innerRef={register} 
            className={classnames({'is-invalid': errors.firstName, 
            'is-valid': watchAllFields.firstName && !errors.firstName})} />
            <FormFeedback>{errors.firstName?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input type="text" name="lastName" placeholder="Last Name" innerRef={register} 
            className={classnames({'is-invalid': errors.lastName, 
            'is-valid': watchAllFields.lastName && !errors.lastName})} />
            <FormFeedback>{errors.lastName?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input type="text" name="age" placeholder="Age" innerRef={register} 
            className={classnames({'is-invalid': errors.age, 
            'is-valid': watchAllFields.age && !errors.age})} />
            <FormFeedback>{errors.age?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input type="select" name="sex" value={sex} innerRef={register} onChange={sexChangeHandler}
            className={classnames({'is-invalid': errors.sex})}>
              <option>-- Select Sex --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Input>
            <p className="errorMessage">{errors.sex?.message}</p>
          </FormGroup>

          <FormGroup>
            <Input type="text" name="mobile" placeholder="Mobile Number" innerRef={register} 
            className={classnames({'is-invalid': errors.mobile, 
            'is-valid': watchAllFields.mobile && !errors.mobile})} />
            <FormFeedback>{errors.mobile?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input type="text" name="email" placeholder="Email (optional)" innerRef={register} 
            className={classnames({'is-invalid': errors.email, 
            'is-valid': watchAllFields.email && !errors.email})} />
            <FormFeedback>{errors.email?.message}</FormFeedback>
          </FormGroup>

          {isStateSelected?
          <>
            <Input type="select" name="state" value={state} innerRef={register} onChange={stateChangeHandler}
            className={classnames({'is-invalid': errors.state})}>
              <option disabled>-- Select State --</option>
              {stateDistrictBlockList.map((state, index) =>(
              <option key={index} value={state.name}>
                {state.name}
              </option>
              ))}
            </Input>
            <p className="errorMessage">{errors.state?.message}</p>

            {isDistrictSelected?
              <>
                <Input type="select" name="district" value={district} innerRef={register} onChange={districtChangeHandler}
                className={classnames({'is-invalid': errors.district})}>
                  <option disabled>-- Select District --</option>
                  {stateDistrictBlockList[stateID].districtList.map((district, index) =>(
                  <option key={index} value={district.name}>
                    {district.name}
                  </option>
                  ))}
                </Input>
                <p className="errorMessage">{errors.district?.message}</p>

                <Input type="select" name="block" value={block} innerRef={register} onChange={blockChangeHandler}
                className={classnames({'is-invalid': errors.block})}>
                  <option>-- Select Block --</option>
                  {stateDistrictBlockList[stateID].districtList[districtID].blockList.map((block, index) =>(
                  <option key={index} value={block.name}>
                    {block}
                  </option>
                  ))}
                </Input>
                <p className="errorMessage">{errors.block?.message}</p>
              </>
              :
              <>
                <Input type="select" name="district" value={district} innerRef={register} onChange={districtChangeHandler}
                className={classnames({'is-invalid': errors.district})}>
                  <option>-- Select District --</option>
                  {stateDistrictBlockList[stateID].districtList.map((district, index) =>(
                  <option key={index} value={district.name}>
                    {district.name}
                  </option>
                  ))}
                </Input>
                <p className="errorMessage">{errors.district?.message}</p>

                <Input type="select" name="block" value={block} innerRef={register} onChange={blockChangeHandler}
                className={classnames({'is-invalid': errors.block})}>
                  <option>-- Select Block --</option>
                </Input>
                <p className="errorMessage">{errors.block?.message}</p>
              </>
            }
          </>
            :
          <>
            <Input type="select" name="state" value={state} innerRef={register} onChange={stateChangeHandler}
            className={classnames({'is-invalid': errors.state})}>
              <option>-- Select State --</option>
              {stateDistrictBlockList.map((state, index) =>(
              <option key={index} value={state.name}>
                {state.name}
              </option>
              ))}
            </Input>
            <p className="errorMessage">{errors.state?.message}</p>

            <Input type="select" name="district" value={district} innerRef={register} onChange={districtChangeHandler}
            className={classnames({'is-invalid': errors.district})}>
              <option>-- Select District --</option>
            </Input>
            <p className="errorMessage">{errors.district?.message}</p>

            <Input type="select" name="block" value={block} innerRef={register} onChange={blockChangeHandler}
            className={classnames({'is-invalid': errors.block})}>
              <option>-- Select Block --</option>
            </Input>
            <p className="errorMessage">{errors.block?.message}</p>
          </>
          }

          <FormGroup>
            <Input type="text" name="village" placeholder="Village" innerRef={register} 
            className={classnames({'is-invalid': errors.village, 
            'is-valid': watchAllFields.village && !errors.village})} />
            <FormFeedback>{errors.village?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input type="password" name="password" placeholder="Password" innerRef={register} 
            className={classnames({'is-invalid': errors.password, 
            'is-valid': watchAllFields.password && !errors.password})} />
            <FormFeedback>{errors.password?.message}</FormFeedback>
          </FormGroup>
          
          <Button>Register</Button>
        </form>
      }

    </div>
  )
}