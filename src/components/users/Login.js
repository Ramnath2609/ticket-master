import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Input, } from 'reactstrap'

class Login extends React.Component {
    constructor () {
        super ()
        this.state = {
            email : '' ,
            password : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post("http://dct-ticket-master.herokuapp.com/users/login", formData)
        .then((response) => {
            if(response.data.token) {
                const token = response.data.token
                localStorage.setItem("authToken", token)
                this.props.history.push("/")
                window.location.reload()
            }else {
                alert("error")
            }
        })

    }

    handleChange = (e) => {
        this.setState({ [ e.target.name ] : e.target.value})
    }

    render () {
        return (
            <div className = "container">
                <div className = "row login-row">
                    <div className = "offset-md-4 col-md-4 login-container">
                    <h2 className="login-title">Login</h2>
                        <Form className="login-form" onSubmit = { this.handleSubmit }>
                            <FormGroup>
                                <label htmlFor="email">email</label>
                                <Input type="text" name="email" id="email"value= { this.state.email } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="password">password</label>
                                <Input type="password" name="password" id = "password" value={ this.state.password } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup className="submit-btn">
                                <Button color = "primary">Submit</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
               
            </div>
        )
    }
}

export default Login