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
            console.log(response.data)
            if (response.data._id) {
                const ticket = response.data
                const req1 = axios.get(`/customers/${ticket.customer}`)
                const req2 = axios.get(`/departments/${ticket.department}`)
                const req3 = ticket.employees.map(employee => axios.get(`/employees/${employee._id}`))
                Promise.all([req1, req2, ...req3])
                    .then(responses => {
                        if (responses[0].data._id) {
                            ticket.customer = responses[0].data.name
                            ticket.department = responses[1].data.name
                            console.log(responses[2].data)
                            const employees = []
                            for (let i = 2 ; i < responses.length ; i++) {
                                
                                employees.push(responses[i].data.name)
                                //console.log(employees)
                            }
                            ticket.employees = employees
                            console.log(ticket)
                            this.setState({ ticket })
                        }
                    })
                //this.setState ({ ticket })
            } else {
                alert (response.data.message )
            }
        })
    }

    render () {
        return (
            <div className = "container">
                <div className = "jumbotron">
                    <h2>Ticket - { this.state.ticket._id }</h2><hr/>
                    <p>Customer - { this.state.ticket.customer }</p>
                    <p>Department - { this.state.ticket.department }</p>
                    <p>Employee(s) - {this.state.ticket.employees ?  this.state.ticket.employees.map(empl => empl + ", ") : ''}</p>
                    <p>Status - {this.state.ticket.isResolved ? "Resolved" : "Pending"}</p>
                </div>
                <Link to = "/tickets">Back  |</Link><Link to = {`/tickets/edit/${ this.state.ticket._id}`}> Edit</Link>
            </div>
        )
    }
}

export default TicketShow