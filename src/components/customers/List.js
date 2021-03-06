import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import Swal from 'sweetalert2'

class CustomerList extends  React.Component {
    constructor () {
        super ()
        this.state = {
            customers : []
        }
    }

    componentDidMount () {
        axios.get("/customers", {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then((response) => {
            const customers = response.data
            this.setState({ customers })
        })
    }

    handleClick = (id) => {
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
                axios.delete(`/customers/${id}`, {
                    headers : {
                        "x-auth" : localStorage.getItem("authToken")
                    }
                })
                .then (response => {
                    if (response.data._id) {

                        this.setState(prevState => {
                            return {
                                customers : prevState.customers.filter(cust => cust._id !== response.data._id)
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
        const customers = this.state.customers
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "offset-md-2 col-md-6">
                    <h2 className="title-text">Customers - { customers.length }</h2>
                        <ListGroup>
                            {
                                customers.map(cust => {
                                    return (
                                        <ListGroupItem key = { cust._id }>
                                            { cust.name } - { cust.email } - { cust.mobile } 
                                            <ul className="action-btns">
                                                <li className="show-btn">
                                                    <Link to = {`/customers/${cust._id}`}>
                                                        Show
                                                    </Link>
                                                </li>
                                                <li className="remove-btn">
                                                    <Link to ="/employees" onClick = {() => {this.handleClick(cust._id)}}>  Remove</Link>
                                                </li>
                                            </ul>
                                        </ListGroupItem>
                                    ) 
                                })
                            }
                        </ListGroup>
                        <div className="btn-container mt-2">
                            <Button color="primary" className="submit-btn">
                                <Link to="/customers/new">Add a customer</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerList