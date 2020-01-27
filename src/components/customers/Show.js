import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class CustomerShow extends React.Component {
    constructor () {
        super ()
        this.state = {
            customer : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            //console.log(response.data)
            const customer = response.data
            this.setState({ customer })
        })
    }

    render () {
        const customer = this.state.customer 
        return (
            <div>
                <h2>Showing customer </h2>
                <p> { customer.name } - { customer.email } - { customer.mobile } </p>
                <Link to = {`/customers/edit/${ this.props.match.params.id }`}>Edit |</Link>
                <Link to = "/customers">  Back</Link>
            </div>
        )
    }
}

export default CustomerShow