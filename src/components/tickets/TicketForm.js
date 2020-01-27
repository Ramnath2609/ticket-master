import React from 'react'
import axios from '../../config/axios'

class TicketForm extends React.Component {
    constructor (props) {
        super (props)
        this.state ={
            codeNo : props.code ? props.code : '',
            name : '',
            customers : [],
            departments : [],
            customer : props.customer ? props.customer : '',
            department : props.department ? props.department : '',
            message : props.message ? props.message : '',
            selectedEmployees : [],
            employees : [],
            priority : props.priority ? props.priority : ''

        }
    }

    componentDidMount () {
        const req1 = axios.get('/customers')
        const req2 = axios.get('/departments')
        const req3 = axios.get('/employees')
        Promise.all([req1, req2, req3])
            .then(responses => {
                const customers = responses[0].data
                const departments = responses[1].data
                const employees = responses[2].data
                this.setState({ customers, departments, employees })
            })
        
    }

    handleSelect = (e) => {
        console.log(e.target.id)
        this.setState({[ e.target.id ] : e.target.value})
    }

    handleChange = (e) => {
       this.setState({ [ e.target.name ] : e.target.value })
       //console.log(e.target.name, e.target.value)
    }

    handleClick = (id) => {
        const employee = this.state.employees.find(empl => empl._id === id)
        if (employee) {
            this.setState(prevState => {
                const selectedEmployees = [].concat(prevState.selectedEmployees, employee._id)
                return {
                    selectedEmployees
                }
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        console.log(this.state)
        const code = this.state.codeNo
        const employees = this.state.selectedEmployees
        const department = this.state.department
        const customer =  this.state.customer
        const message = this.state.message
        const priority = this.state.priority

        const formData = {
            code,
            employees ,
            department ,
            customer ,
            message,
            priority
        }
        this.props.handleSubmit(formData)
    }
 
    render () {
        const employees = this.state.employees.filter(empl => empl.department._id === this.state.department)
        return (
            <div className = "container">
                <form onSubmit = { this.handleSubmit }>
                    <label htmlFor="codeNo">Code Number</label><br/>
                    <input type="text" name="codeNo" id="codeNo" value={ this.state.codeNo } onChange = { this.handleChange }/><br/>
                    <label htmlFor="customer">Customer</label><br/>
                    <select id="customer" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        {
                            this.state.customers.map(customer => {
                                return <option key = { customer._id } name = "customer" value = { customer._id }>{ customer.name }</option>
                            })
                        }
                    </select><br/>
                    <label htmlFor="department">Department</label><br/>
                    <select id = "department" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        {
                            this.state.departments.map(department => {
                                return <option key = { department._id } value = { department._id }>{ department.name }</option>
                            })
                        }
                    </select><br/>
                    <label htmlFor="employee">Employees</label><br/>
                    <ul>
                        {
                            employees.map(employee => {
                                return <li key = { employee._id }><input type = "checkbox" value = { employee._id } onClick = { () => {this.handleClick(employee._id)} } />{ employee.name }</li>
                            })
                        }
                    </ul>
                    <br/>
                    <label htmlFor="message">Message</label><br/>
                    <textarea  id = "message" onChange = { this.handleChange } name = "message" value = { this.state.message } cols="70" rows="4"></textarea><br/>
                    <label htmlFor="priority">Priority :</label><br/>
                        <input type="radio" name="priority" value="High" onChange = { this.handleChange }/>High<br/>
                        <input type="radio" name="priority" value="Medium" onChange = { this.handleChange }/>Medium<br/>
                        <input type="radio" name="priority" value="Low" onChange = { this.handleChange }/>Low<br/>
                    <input type="submit" name="" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default TicketForm