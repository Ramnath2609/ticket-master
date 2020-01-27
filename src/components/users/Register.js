import React, {Component } from 'react'
import axios from 'axios'

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
            <div>
                <h2>Register with us</h2>
                <form onSubmit = { this.handleSubmit }>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id = "username"  value= { this.state.username } onChange = { this.handleChange }/><br/>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="email" value={ this.state.email } onChange = { this.handleChange } /><br/>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" value={ this.state.password } onChange = { this.handleChange } /><br/>
                    <input type="submit" name="" value="Register"/>
                </form>
            </div>
        )
    }
}

export default Register 