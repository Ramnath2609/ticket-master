import React from 'react'
import { Link } from 'react-router-dom'


class Tables extends React.Component {
    

    handleClick = (id) => {
        this.props.handleClick(id)
    }

    handleResolve = (ticket) => {
        this.props.handleResolve(ticket)
    }

    render () {
        console.log('within table render', this.props.tickets)
        return (
            <div className = "container">
                 <table className = "table">
                    <thead>
                        <tr>
                            <th>code no</th>
                            <th>customer</th>
                            <th>department</th>
                            <th>employee</th>
                            <th>message</th>
                            <th>priority</th>
                            <th>action</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.tickets.map(ticket => {
                                return <tr key= { ticket._id } >
                                        <td>{ ticket.code }</td>
                                        <td>{ ticket.customer.name }</td>
                                        <td>{ ticket.department.name }</td>
                                        <td>{ ticket.employees.map(empl => empl.name + " ") }</td>
                                        <td>{ ticket.message }</td>
                                        <td>{ ticket.priority }</td>
                                        <td>
                                            <ul className="action-btns">
                                                <li className="show-btn">
                                                    <Link  to ={`/tickets/${ ticket._id }`}>
                                                        Show
                                                    </Link></li>
                                                <li className="remove-btn">
                                                    <Link to="/tickets" onClick={() => {this.handleClick(ticket._id)}}>
                                                        Remove
                                                    </Link>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            {ticket.isResolved ? (
                                                "Completed"
                                            ) : (
                                                <label>
                                                    <input 
                                                        type='checkbox' 
                                                        checked={ticket.isResolved} 
                                                        onChange={()=>{this.handleResolve(ticket)}}
                                                    /> 
                                                Mark as complete
                                                </label>
                                            )}
                                        </td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tables