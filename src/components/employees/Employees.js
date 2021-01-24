import React from 'react'
import axios from '../../config/axios'
import Table from './Tables'
import Swal from 'sweetalert2'
import { Button } from 'reactstrap'
import EmployeeForm from './Form'


class EmployeeList extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            employees : [],
            show: false
        }
    }

    componentDidMount () {
        axios.get("/employees", {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
           console.log(response.data)
           const employees = response.data
           this.setState({ employees })
        })
        
    }

    openModal = () => {
        this.setState({ show: true })
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleSubmit = (formData) => {
            //console.log(formData)
         axios.post("/employees", formData, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            if (response.data._id) {
                Swal.fire(
                    'Good job!',
                    'You department has been created!',
                    'success'
                  )
                this.setState({ show: false })
                window.location.reload()
                //this.props.history.push("/employees")
        }
        })
        .catch(err => {
            Swal.fire(
                'Oops!',
                'Something went wrong!',
                'error'
              )
        })
        }

    handleRemove = (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`/employees/${data}`)
                    .then(response => {
                        if (response.data._id) {
                            this.setState(prevState => {
                                return {
                                    employees : prevState.employees.filter(empl => empl._id != response.data._id)
                                }
                            })
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                        } else {
                            Swal.fire(
                                'Oops!',
                                'Something went wrong',
                                'error'
                              )
                        }
                    }) 
             
            }
          })
        
    }

    render () {
        return (
            <div className = "container">
                <h2>Listing employees</h2>
                <Table employees = { this.state.employees } handleRemove = { this.handleRemove }/>
                <div className="add-btn">
                    <Button onClick={() => this.openModal()}>Add a new employee</Button>
                </div>
                <EmployeeForm handleSubmit = { this.handleSubmit } toggle={this.toggle} handleShow={this.handleShow} modal={this.state.show} />
            </div>
        )
    }
}

export default EmployeeList