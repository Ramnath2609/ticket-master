import React from 'react'
import axios from 'axios'
import { Form, FormGroup, Button, Input } from 'reactstrap'

class Register extends React.Component {
    constructor () {
        super ()
        this.state = {
            username : '',
            email : '' ,
            password : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit (e) {
        e.preventDefault ()
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        //console.log(formData)
        axios.post("http://dct-ticket-master.herokuapp.com/users/register", formData)
        .then((response) => {
            if (response.data._id) {
                this.props.history.push("/account/login")
            } else {
                alert(response.data.message)
            }
        })
    }

    render () {
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "offset-md-4 col-md-4">
                    <h2>Register with us</h2>
                        <Form onSubmit = { this.handleSubmit }>
                            <FormGroup>
                                <label htmlFor="username">username</label>
                                <Input type="text" name="username" id = "username"  value= { this.state.username } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="email">email</label>
                                <Input type="text" name="email" id="email" value={ this.state.email } onChange = { this.handleChange } />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="password">password</label>
                                <Input type="password" name="password" id="password" value={ this.state.password } onChange = { this.handleChange } />
                            </FormGroup>
                            <Button color = "primary">Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register 