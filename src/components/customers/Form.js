import React from 'react'

class Form extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            name : props.name ? props.name : '',
            email : props.email ? props.email :'',
            mobile : props.mobile ? props.mobile : ''
        }
    }

    handleChange = (e) => {
        this.setState ( { [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const formData = { 
            name : this.state.name ,
            email : this.state.email ,
            mobile : this.state.mobile
        }
        this.props.handleSubmit(formData)
    }

    render () {
        return (
            <div>
                <form onSubmit = { this.handleSubmit }>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={ this.state.name } onChange = { this.handleChange } id = "name"/><br/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={ this.state.email } onChange = { this.handleChange } id = "email"/><br/>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={ this.state.mobile } onChange = { this.handleChange } id = "mobile"/><br/>
                    <input type="submit" name="" value="add"/>
                </form>
            </div>
        )
    }
}

export default Form