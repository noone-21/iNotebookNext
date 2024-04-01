"use client"

import { useState, useRef, useContext } from "react"
import styles from './signup-form.module.css'
import { useRouter } from "next/navigation"
import AlertContext from "@/store/context/alertContext"


export default function SignUpForm() {

    const alertCtx = useContext(AlertContext)

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnfrmPassword: "" })

    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const passwordInputRef = useRef()
    const cnfrmPasswordInputRef = useRef()

    const router = useRouter()

    // const [isDisabled, setIsDisabled] = useState(true)

    const userSignUp = async (e) => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredCnfrmPassword = cnfrmPasswordInputRef.current.value

        const credentials = {
            name: enteredName,
            email: enteredEmail,
            password:enteredPassword,
            cnfrmPassword: enteredCnfrmPassword
        }

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            alertCtx.showAlert(data.message, "danger")
        }

        alertCtx.showAlert("Account Created Successfully!", "success")

        setCredentials({ name: "", email: "", password: "", cnfrmPassword: "" })

        router.push('/auth/login')
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

        //   if(credentials.name.length >= 3 && validateEmail(credentials.email)&&credentials.password.length >=7&&credentials.password === credentials.cnfrmPassword){
        //       setIsDisabled(false)
        // }
        // else{
        //     setIsDisabled(true)
        //   }
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return <div className={`container  ${styles.signup} `} >
        <div className='row mx-6 d-flex justify-content-center' >
            <div className='col-md-5 jumbotron'  style={{ padding: '5% 4%', background: 'linear-gradient(#599e98, #678080)', borderRadius: '10px' }}>
                <form onSubmit={userSignUp} >
                    <h2 className="d-flex justify-content-center">SIGN UP</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className={` form-control ${credentials.name.length === 0 ? '' : credentials.name.length < 3 && credentials.name.length > 0 ? 'is-invalid' : 'is-valid'}`} onChange={onChange} required minLength={3} value={credentials.name} name='name' id="name" placeholder="Enter Your Name" ref={nameInputRef} />
                        <div className={credentials.name.length === 0 ? '' : credentials.name.length < 3 && credentials.name.length > 0 ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.name.length === 0 ? '' : credentials.name.length < 3 && credentials.name.length > 0 ? 'Invalid Name!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <div className="form-group">

                        <label htmlFor="email">Email address</label>
                        <input type="email" className={` form-control ${credentials.email.length === 0 ? '' : !validateEmail(credentials.email) ? 'is-invalid' : 'is-valid'}`} onChange={onChange} required value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter Your email" ref={emailInputRef} />
                        <div className={credentials.email.length === 0 ? '' : !validateEmail(credentials.email) ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.email.length === 0 ? '' : !validateEmail(credentials.email) ? 'Invalid Email!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={onChange} required minLength={8} className={` form-control ${credentials.password.length === 0 ? '' : credentials.password.length < 8 && credentials.password.length > 0 ? 'is-invalid' : 'is-valid'}`} value={credentials.password} name='password' id="password" placeholder="Enter Your Password" ref={passwordInputRef} />
                        <div className={credentials.password.length === 0 ? '' : credentials.password.length < 8 && credentials.password.length > 0 ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.password.length === 0 ? '' : credentials.password.length < 8 && credentials.password.length > 0 ? 'Password too short!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cnfrmPassword">Confirm Password</label>
                        <input type="password" onChange={onChange} required minLength={8} className={` form-control ${credentials.cnfrmPassword.length === 0 || credentials.password.length < 8 ? '' : credentials.password !== credentials.cnfrmPassword ? 'is-invalid' : 'is-valid'}`} value={credentials.cnfrmPassword} name='cnfrmPassword' id="cnfrmPassword" placeholder="Re-Enter Your Password" ref={cnfrmPasswordInputRef} />
                        <div className={credentials.cnfrmPassword.length === 0 || credentials.password.length < 8 ? '' : credentials.password !== credentials.cnfrmPassword ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.cnfrmPassword.length === 0 || credentials.password.length < 8 ? '' : credentials.password !== credentials.cnfrmPassword ? 'Passwords do not not match!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-2" >SignUp</button>
                </form>
            </div>

        </div>
    </div>
}