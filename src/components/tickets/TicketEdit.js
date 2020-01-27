import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
            ticket : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        const req1 = axios.get("/customers")
        const req2 = axios.get("/employees")
        const req3 = axios.get("/departments")
        const req4 = axios.get(`/tickets/${id}`)
        Promise.all([req1, req2, req3, req4])
        .then(responses => {
            //console.log(responses[0].data)
            const customers = responses[0].data
            const employees = responses[1].data
            const departments = responses[2].data
            const ticket = responses[3].data
            ticket.customer = customers.find(cust => cust._id === ticket.customer)
            ticket.department = departments.find(dept => dept._id === ticket.department)
            const empls = []
            ticket.employees.forEach(empl => {
                const employee = employees.find(employee => employee._id === empl._id )
                if (employee) {
                    empls.push(employee)
                }
            })
            ticket.employees = empls

            

            this.setState({ticket })
        })}

        handleSubmit = (formData) => {
            console.log(formData)
            const id = this.props.match.params.id
            axios.put(`/tickets/${id}`, formData)
            .then(response => {
                if (response.data._id) {
                    this.props.history.push('/tickets')
                }
            })
            .catch(err => {
                alert(err)
            })
        }
    


    render () {
        return (
            <div>
                <h2>Edit ticket</h2>
                { Object.keys(this.state.ticket).length !== 0 ? <TicketForm handleSubmit = { this.handleSubmit } {...this.state.ticket} /> : ''}
            </div>
        )
    }
}

export default TicketEdit