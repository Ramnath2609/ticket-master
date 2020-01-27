import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Table from './Tables'

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
        axios.delete(`/employees/${data}`)
        .then(response => {
            if (response.data._id) {
                this.setState(prevState => {
                    return {
                        employees : prevState.employees.filter(empl => empl._id != response.data._id)
                    }
                })
            } else {
                alert (response.data.message)
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