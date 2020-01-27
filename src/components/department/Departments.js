import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import DepartmentForm from './DepartmentForm'

class Departments extends React.Component {
    constructor () {
        super () 
        this.state = {
            departments : [] ,
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

    handleSubmit = (department) => {
        axios.post("/departments", department, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            const department = response.data
            this.setState((prevState) => {
                return {
                    departments : prevState.departments.concat(department)
                }
            })
        })
    }

    handleChange = (e) => {
        this.setState ({ [e.target.name ] : e.target.value })
    }

    handleRemove = (dept) => {
        //console.log(dept)
        axios.delete(`/departments/${dept._id}`, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            if (response.data._id) {
                //window.location.reload()
                this.setState(prevState => {
                    return {
                        departments : prevState.departments.filter(dept => dept._id !== response.data._id)
                    }
                })
            }
        })
    }

    render () {
        return (
            <div className="container">
                <h2>Departments - { this.state.departments.length }</h2>
                <ul className="list-group">
                    {
                        this.state.departments.map(dept => {
                            return <li className ="list-group-item" key = { dept._id }>{ dept._id }-{ dept.name } <Link to ={`/departments/${ dept._id }`} >Show  |</Link><Link to = "/departments"  onClick = {() => { this.handleRemove(dept)} }>  Remove</Link></li>
                        })
                    }
                </ul>
                <DepartmentForm handleSubmit = { this.handleSubmit } />
            </div>
        )
    }
}

export default Departments