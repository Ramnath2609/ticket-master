import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'

class CustomerForm extends React.Component {
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
                <div className="row login-row">
                    <Form onSubmit = { this.handleSubmit }>
                        <FormGroup>
                            <label htmlFor="name">Name</label>
                            <Input type="text" className = "form-control" name="name" value={ this.state.name } onChange = { this.handleChange } id = "name"/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <Input type="text" className = "form-control" name="email" value={ this.state.email } onChange = { this.handleChange } id = "email"/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="mobile">Mobile</label>
                            <Input type="text" className = "form-control" name="mobile" value={ this.state.mobile } onChange = { this.handleChange } id = "mobile"/>
                        </FormGroup>
                        <FormGroup className="submit-btn">
                            <Button type="submit" className = "btn btn-primary">Add</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

export default CustomerForm