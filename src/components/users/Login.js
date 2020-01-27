import React from 'react'
import axios from 'axios'

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
            <div>
                <h2>Login</h2>
                <form onSubmit = { this.handleSubmit }>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="email"value= { this.state.email } onChange = { this.handleChange }/><br/>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id = "password" value={ this.state.password } onChange = { this.handleChange }/><br/>
                    <input type="submit" name="" value="submit"/>
                </form>
            </div>
        )
    }
}

export default Login