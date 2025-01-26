import React, {useState} from "react";
import {json, useNavigate} from 'react-router-dom';
import {loginUser} from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button } from 'react-bootstrap';
import axios from "axios";

export const LoginComp = (props) =>
{
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [error, setError] = useState();
    const navigate = useNavigate();

    const getInitialState = () => {
        const value = "0";
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    };


    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };




    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        const formData =  {
            "email": email,
            "password": pass,
            "role": value
        }

        const loginResponse = await loginUser(formData)
        const json_response = await loginResponse.json()
        console.log(json_response.status)
        if(json_response.status === "Success" && value === "1")
        {
            console.log(json_response)
            console.log("log1 in success")

            navigate(`/id=${json_response.id}`)
        }
        else if(json_response.status === "Success" && value === "0")
        {
            console.log(json_response)
            console.log("log in success")

            navigate(`/id=${json_response.id}`)
        }
        else
        {
            console.log("log in failed")
            setError(json_response['message'])
        }

    }

    const goNext = (e) => {
        navigate("/register")
    }

    return (
        <div>
            <div className={"auth-form"}>
                <div className="quiz-container">
                    <h2 className={"text-center"}>Login</h2>
                    <form className={"login-form"} onSubmit={handleSubmit} noValidate={true}>
                        <label htmlFor={"email"} className={"text-lg-start"}>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type={"email"}
                               placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
                        <label htmlFor={"password"}>Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"}
                               id={"password"} name={"password"}/>
                        <div style={{marginTop: '1em'}} className="row">
                            <div className="col-sm">
                                <button className="btn btn-success btn-lg" type={"submit"} onClick={handleSubmit}>Sign In</button>
                            </div>
                            <div className="col-sm">
                                <button className="btn btn-primary btn-lg" type={"submit"} onClick={goNext}>Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}