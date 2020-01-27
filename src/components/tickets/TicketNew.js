import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketNew extends React.Component {

    
    handleSubmit = (formData) => {
        axios.post("/tickets", formData)
        .then(response => {
            if (response.data._id) {
                this.props.history.push("/tickets")
            } else {
                alert(response.data.message)
            }
        })
    }

    render () {
        return (
            <div>
                <h2>Create new tickets</h2>
                <TicketForm handleSubmit = { this.handleSubmit } />
            </div>
        )
    }
}

export default TicketNew