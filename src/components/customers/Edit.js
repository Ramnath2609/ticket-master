import React from 'react'
import axios from '../../config/axios'
import Form from './Form'

class CustomerEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
            customer : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`)
        .then(response => {
            if (response.data._id) {
                const customer = response.data
                this.setState({ customer })
            } else {
                alert(response.data.message)
            }
            
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/customers/${this.state.customer._id}`, formData)
        .then(response => {
            if (response.data._id) {
                this.props.history.push(`/customers/${response.data._id}`)
            } else {
                alert(response.data.message)
            }
        })
    }

    render () {
        return (
            <div>
                <h2>Edit customer</h2>
                { Object.keys(this.state.customer).length !== 0 && <Form handleSubmit = { this.handleSubmit } { ...this.state.customer } />}
            </div>
        )
    }
}

export default CustomerEdit