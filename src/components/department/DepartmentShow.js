import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class DepartmentShow extends React.Component {
    constructor () {
        super ()
        this.state = {
            department : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        //console.log(id)
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

    render () {
        const dept = this.state.department
        return (
            <div>
                <h2>Name - { dept.name }</h2>
                <Link to = "/departments">Back |</Link><Link to = {`/departments/edit/${dept._id}`}> Edit</Link>
            </div>
        )
    }
}

export default DepartmentShow