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
            <div className = "container">
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className = "form-control" name="name" value={ this.state.name } onChange = { this.handleChange } id = "name"/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className = "form-control" name="email" value={ this.state.email } onChange = { this.handleChange } id = "email"/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" className = "form-control" name="mobile" value={ this.state.mobile } onChange = { this.handleChange } id = "mobile"/>
                    </div>
                    <button type="submit" className = "btn btn-primary">Add</button>
                </form>
            </div>
        )
    }
}

export default Form