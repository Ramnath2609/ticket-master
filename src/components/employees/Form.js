import React from 'react'
import axios from '../../config/axios'
import { Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class EmployeeForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            empId : '',
            name : props.name ? props.name : '' ,
            email : props.email ? props.email : '',
            mobile : props.mobile ? props.mobile : '',
            department : '',
            departments : [],
            show: false
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
                    <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                        <ModalHeader toggle={this.props.toggle} >
                        Add an employee
                        </ModalHeader>
                        <ModalBody>
                        <Form onSubmit = { this.handleSubmit }>
                            <FormGroup>
                                <Input type="tetx" placeholder="Id" name="empId" className = "form-control" id="id" value={ this.state.empId } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="Name" name="name" className = "form-control" value={ this.state.name } onChange = { this.handleChange }/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="Email" name="email" className = "form-control" id="email" value = { this.state.email } onChange = { this.handleChange } />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="Mobile" name="mobile" className = "form-control" id = "mobile" value = { this.state.mobile } onChange = { this.handleChange } />
                            </FormGroup>
                            <FormGroup className="select-option">
                                <select  onChange = { this.handleSelect } className = "form-control">
                                    <option value="select">Select</option>
                                    {
                                        this.state.departments.map(dept => {
                                            return <option key = { dept._id} value ={ dept.name }>{ dept.name }</option> 
                                        }
                                    )}
                                </select>
                            </FormGroup>
                            <FormGroup className="submit-btn">
                                <Button color = "primary">Submit</Button>
                            </FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default EmployeeForm