import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class TicketShow extends React.Component {
    constructor () {
        super ()
        this.state = {
            ticket : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`)
        .then(response => {
            //console.log(response.data)
            if (response.data._id) {
                const ticket = response.data
                this.setState ({ ticket })
            } else {
                alert (response.data.message )
            }
        })
    }

    render () {
        return (
            <div>
                <h2>Showing ticket</h2>
                <p>{ this.state.ticket._id } - { this.state.ticket.department }</p>
                <Link to = "/tickets">Back  |</Link><Link to = {`/tickets/edit/${ this.state.ticket._id}`}> Edit</Link>
            </div>
        )
    }
}

export default TicketShow