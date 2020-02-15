import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Table from './Tables'
import Swal from 'sweetalert2'

class EmployeeList extends React.Component {
    constructor () {
        super ()
        this.state = {
            employees : [] ,
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
                <Link to ="/employees/new" >Add new employee</Link>
            </div>
        )
    }
}

export default EmployeeList