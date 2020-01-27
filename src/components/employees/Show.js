import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class EmployeeShow extends React.Component {
    constructor () {
        super ()
        this.state = {
            employee : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        //console.log(id)
        axios.get(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            const employee = response.data
            this.setState({ employee })
        })
    }

    render () {
        return (
            <div>
                <h3>{ this.state.employee.name } - { this.state.employee.email }</h3>
                <Link to = "/employees">Back  |</Link><Link to ={`/employees/edit/${ this.state.employee._id }`}> Edit</Link> 
            </div>
        )
    }
}

export default EmployeeShow