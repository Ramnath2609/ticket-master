import React from 'react'
import axios from '../../config/axios'
import { Form, FormGroup, Input, Button, DropdownMenu, DropdownItem } from 'reactstrap'

class EmployeeForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            empId : '',
            name : props.name ? props.name : '' ,
            email : props.email ? props.email : '',
            mobile : props.mobile ? props.mobile : '',
            department : '',
            departments : []
        }
    }

    componentDidMount () {
        axios.get("/departments", {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({ departments })
        })
    }

    handleChange = (e) => {
        //console.log(e.target.name)
        this.setState({ [e.target.name ] : e.target.value })
        
    }

    handleSelect = (e) => {
        this.setState({ department : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const deptObj = this.state.departments.find(dept => dept.name === this.state.department)
        const formData = {
            id : this.state.id ,
            name : this.state.name ,
            email : this.state.email ,
            mobile : this.state.mobile ,
            department : deptObj
        }
        this.props.handleSubmit(formData)
    }

    render () {
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "offset-md-3 col-md-6">
                    <h2>Add an employee</h2>
                        <Form onSubmit = { this.handleSubmit }>
                            <FormGroup>
                                <label htmlFor="id">id</label>
                                <Input type="tetx" name="empId" className = "form-control" id="id" value={ this.state.empId } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="name">name</label>
                                <Input type="text" name="name" className = "form-control" value={ this.state.name } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="email">email</label>
                                <Input type="text" name="email" className = "form-control" id="email" value = { this.state.email } onChange = { this.handleChange } />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="mobile">mobile</label>
                                <Input type="text" name="mobile" className = "form-control" id = "mobile" value = { this.state.mobile } onChange = { this.handleChange } />
                            </FormGroup>
                            <FormGroup>
                                <select onChange = { this.handleSelect } className = "form-control">
                                    <option value="select">Select</option>
                                    {
                                        this.state.departments.map(dept => {
                                            return <option key = { dept._id} value ={ dept.name }>{ dept.name }</option> 
                                        }
                                    )}
                                </select>
                            </FormGroup>
                            <Button color = "primary">Submit</Button>
                        </Form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default EmployeeForm