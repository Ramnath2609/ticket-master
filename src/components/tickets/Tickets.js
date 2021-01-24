import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Tables from './Tables'
import TicketChart from "./Chart"
import {chartColors} from "./colors"
class TicketsList extends React.Component {
    constructor () {
        super ()
        this.state = {
            tickets : [],
            employees : [],
            resolvedTickets : [],
            customers : [],
            departments : [],
            data: {
                labels: ["Resolved", "Not resolved"],
                    datasets: [
                        {
                        data: [300, 50],
                        backgroundColor: chartColors,
                        hoverBackgroundColor: chartColors
   
                    }]
        }
    }
}

        componentDidMount () {
        const req1 = axios.get('/tickets')
        const req2 = axios.get('/customers')
        const req3 = axios.get('/employees')
        const req4 = axios.get('/departments')
        Promise.all([req1, req2, req3, req4])
            .then(responses => {
                const tickets = responses[0].data
                const resolvedTickets = tickets.filter(ticket => ticket.isResolved)
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

                this.setState({ tickets, employees, customers, departments, resolvedTickets })
            })
    }

    handleResolve = (ticket) => {
        axios.delete(`/tickets/${ticket._id}`)
            .then(response => {
                const tickets = response.data
                this.setState(prevState => {
                    const resolvedTickets = prevState.resolvedTickets.push(ticket)
                    return {
                        tickets, resolvedTickets
                    }
                })
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
        let resolved
        if(this.state.tickets.length !==0) {
             resolved = (100 / this.state.tickets.length) * this.state.resolvedTickets.length
        }
        
        //console.log(resolved)
        return (
            <div className = "container">
                <div className="row">
                <h2>Tickets</h2>
                { this.state.tickets.length !== 0 &&  <Tables tickets = { this.state.tickets } handleClick = { this.handleClick } handleResolve = { this.handleResolve }/> }
                <Link to = "/tickets/new">Add ticket</Link>
                </div>
                
                <div className="row">
                    <h2>Statistics</h2>
                    <div className="col-8">
                        {this.state.tickets.length > 0 && <TicketChart data={this.state.data}/>}
                    </div>
                </div>
                { this.state.resolvedTickets.length !== 0 &&
                <div className="progress">
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow='3'
                    aria-valuemin="0" aria-valuemax={ this.state.tickets.length } style={{width : `${resolved}%`}}>
                        {`${100 - resolved}% complete`}
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default TicketsList