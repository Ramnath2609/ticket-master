import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './Form'

class EmployeesEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
            employee : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`)
        .then(response => {
            if (response.data._id) {
                const employee = response.data
                this.setState({ employee })
            } else {
                alert (response.data.message)
            }
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/employees/${this.state.employee._id}`, formData)
        .then(response => {
            //console.log(response.data)
            if (response.data) {
                this.props.history.push(`/employees/${response.data._id}`)
            } else {
                alert (response.data.message)
            }
        })
    }

    render () {
        return (
            <div>
                <h2>Edit employee</h2>
                { Object.keys(this.state.employee).length !== 0 && <EmployeeForm handleSubmit = { this.handleSubmit } {...this.state.employee }/>}
            </div>
        )
    }
}

export default EmployeesEdit