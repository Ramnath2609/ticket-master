import React from 'react'
import { FormGroup, Form, Button, Input } from 'reactstrap'

class DepartmentForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            name : props.name ? props.name : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const name = this.state.name
        const department = { name }
        this.props.handleSubmit(department)
    }

    render () {
        return (
            <div className = "offset-md-2 col-md-4">
                <br/>
                <h3>Add a new department</h3>
                <br/>
                <Form onSubmit = { this.handleSubmit }>
                    <FormGroup>
                        <Input type="text" className = "form-control" name="name" value={ this.state.name} onChange = {this.handleChange}/>
                    </FormGroup>
                    <Button color="primary">Add</Button>
                </Form>
            </div>
        )
    }
}

export default DepartmentForm