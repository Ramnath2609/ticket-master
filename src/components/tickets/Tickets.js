import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Tables from './Tables'
import TicketChart from "./Chart"
import {chartColors} from "./colors"
import { Button } from "reactstrap";
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
                    data: [1, 1],
                    backgroundColor: chartColors,
                    hoverBackgroundColor: chartColors
                    }
                ]
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
                let chartData = [resolvedTickets.length, tickets.length - resolvedTickets.length];
                console.log(chartData)
                this.setState({ 
                    tickets, 
                    employees, 
                    customers, 
                    departments, 
                    resolvedTickets,
                    data: { 
                        labels: ["Resolved", "Not resolved"],
                        datasets: [
                            {
                                data: chartData,
                                backgroundColor: chartColors,
                                hoverBackgroundColor: chartColors
                            }
                        ]
                    } 
                })
            })
    }

    handleResolve = (ticket) => {
        axios.put(`/tickets/${ticket._id}`, {
            isResolved: true
        })
            .then(response => {
                const ticket = response.data
                this.setState(prevState => {
                    const updatedTickets = prevState.tickets.map(tick => {
                        if(tick._id == ticket._id){
                            tick.isResolved = true;
                        }
                        return tick;
                    })
                    return {
                        tickets: updatedTickets
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
        let resolved
        if(this.state.tickets.length !==0) {
             resolved = (100 / this.state.tickets.length) * this.state.resolvedTickets.length
        }
                
        return (
            <div className = "container">
                <h2 className="title-text">Tickets</h2>
                <div className="row">
                { this.state.tickets.length !== 0 &&  
                    <Tables tickets={this.state.tickets} handleClick={this.handleClick} handleResolve={this.handleResolve}/> 
                }
                <div className="btn-container">
                    <Button color="primary" className="submit-btn">
                        <Link to = "/tickets/new">Add ticket</Link>
                    </Button>
                </div>
                </div>
                { this.state.tickets.length !== 0 && 
                    <>
                        <h2 className="title-text">Statistics</h2>
                        <div className="row">
                            <div className="col-12">
                                {this.state.tickets.length > 0 && <TicketChart data={this.state.data}/>}
                            </div>
                        </div>
                    </>   
                }
                { this.state.resolvedTickets.length !== 0 && 
                    <div className="progress-container">
                        <h2 className="title-text">Progress</h2>
                        <div className="progress">
                            <div 
                                className="progress-bar progress-bar-success" 
                                role="progressbar" 
                                aria-valuenow={this.state.resolvedTickets.length}
                                aria-valuemin="0" 
                                aria-valuemax={this.state.tickets.length} 
                                style={{width:`${resolved}%`}}
                            >
                                {`${(100 - resolved).toFixed(1)}% complete`}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default TicketsList