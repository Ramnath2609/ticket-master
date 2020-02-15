import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import DepartmentForm from './DepartmentForm'
import { ListGroup, ListGroupItem } from 'reactstrap'
import Swal from 'sweetalert2'

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
            if(response.data.hasOwnProperty('errors')){
                Swal.fire(
                    'Oops !!!',
                    'There was an error submitting the form',
                    'error'
                  )
            }else {
                const department = response.data
                this.setState((prevState) => {
                    return {
                        departments : prevState.departments.concat(department)
                    }
                })
                Swal.fire(
                    'Good job!',
                    'You department has been created!',
                    'success'
                  )
            }
           
        })
    }

    handleChange = (e) => {
        this.setState ({ [e.target.name ] : e.target.value })
    }

    handleRemove = (dept) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if(result.value) {
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
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Oops!',
                            'Something went wrong.',
                            'error'
                        )
                    }
                })
            }
        })
        
    }

    render () {
        return (
            <div className="container">
                <div className = "row">
                    <div className = "col-md-6">
                    <h2>Departments - { this.state.departments.length }</h2>
                        <ListGroup className="list-group">
                            {
                                this.state.departments.map(dept => {
                                    return <ListGroupItem className ="list-group-item" key = { dept._id }>{ dept.name } <Link className = "float-right" to ={`/departments/${ dept._id }`} >    Show</Link><Link className = "float-right" to = "/departments"  onClick = {() => { this.handleRemove(dept)} }>Remove    |</Link></ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </div>
                    <DepartmentForm  handleSubmit = { this.handleSubmit } />
                </div>
                
            </div>
        )
    }
}

export default Departments