import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Tables from './Tables'

class TicketsList extends React.Component {
    constructor () {
        super ()
        this.state = {
            tickets : [],
            employees : [],
            customers : [],
            departments : []
        }
        console.log("constructor")
    }

        componentDidMount () {
        console.log("component did mount")
        const req1 = axios.get('/tickets')
        const req2 = axios.get('/customers')
        const req3 = axios.get('/employees')
        const req4 = axios.get('/departments')
        Promise.all([req1, req2, req3, req4])
            .then(responses => {
                const tickets = responses[0].data
                const customers = responses[1].data
                const employees = responses[2].data
                const departments = responses[3].data
                tickets.forEach(ticket => {
                    ticket.customer = customers.find(cust => ticket.customer === cust._id)
                    ticket.department = departments.find(dept => ticket.department === dept._id) 
                    ticket.employees = ticket.employees.map(employee => {
                        employee = employees.find(empl => employee._id === empl._id)
                        return employee
                    })
                })

                this.setState({ tickets, employees, customers, departments})
            })
    }

    

    handleClick = (id) => {
        axios.delete(`/tickets/${id}`)
            .then(response => {
                if (response.data._id) {
                    this.setState(prevState => {
                        return {
                            tickets : prevState.tickets.filter(ticket => ticket._id !== response.data._id)
                        }
                    })
                } else {
                    alert (response.data.message)
                }
            })
    }

    render () {
        console.log('within tickets render', this.state.tickets.length)
        return (
            <div className = "container">
                <h2>Tickets</h2>
                { this.state.tickets.length !== 0 &&  <Tables tickets = { this.state.tickets } handleClick = { this.handleClick }/> }
                <Link to = "/tickets/new">Add ticket</Link>
            </div>
        )
    }
}

export default TicketsList