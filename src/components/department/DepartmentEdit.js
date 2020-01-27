import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'

class DepartmentEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
            department : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`)
        .then(response => {
            if (response.data._id) {
                const department = response.data
                this.setState({ department })
            } else {
                alert (response.data.message)
            }
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/departments/${this.props.match.params.id}`, formData)
        .then(response => {
            if (response.data._id) {
                this.props.history.push("/departments")
            } else {
                alert (response.data.message)
            }
        })
    }

    render () {
        return (
            <div>
                <h2>Edit department</h2>
                { Object.keys(this.state.department).length !== 0 && <DepartmentForm handleSubmit = { this.handleSubmit } name = { this.state.department.name }/>}
            </div>
        )
    }
}

export default DepartmentEdit