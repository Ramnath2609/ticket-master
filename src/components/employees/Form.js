import React from 'react'
import axios from '../../config/axios'

class EmployeeForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            empId : '',
            name : props.name ? props.name : '' ,
            email : props.email ? props.email : '',
            mobile : props.mobile ? props.mobile : '',
            department : '',
            departments : []
        }
    }

    componentDidMount () {
        axios.get("/departments", {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({ departments })
        })
    }

    handleChange = (e) => {
        //console.log(e.target.name)
        this.setState({ [e.target.name ] : e.target.value })
        
    }

    handleSelect = (e) => {
        this.setState({ department : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const deptObj = this.state.departments.find(dept => dept.name === this.state.department)
        const formData = {
            id : this.state.id ,
            name : this.state.name ,
            email : this.state.email ,
            mobile : this.state.mobile ,
            department : deptObj
        }
        this.props.handleSubmit(formData)
    }

    render () {
        return (
            <div>
                 <h2>Add an employee</h2>
                <form onSubmit = { this.handleSubmit }>
                    <label htmlFor="id">id</label>
                    <input type="tetx" name="empId" id="id" value={ this.state.empId } onChange = { this.handleChange }/><br/>
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" value={ this.state.name } onChange = { this.handleChange }/><br/>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="email" value = { this.state.email } onChange = { this.handleChange } /><br/>
                    <label htmlFor="mobile">mobile</label>
                    <input type="text" name="mobile" id = "mobile" value = { this.state.mobile } onChange = { this.handleChange } /><br/>
                    <select onChange = { this.handleSelect }>
                        <option value="select">Select</option>
                        {
                            this.state.departments.map(dept => {
                                return <option key = { dept._id} value ={ dept.name }>{ dept.name }</option> 
                            }
                        )}
                    </select>
                    <input type="submit" name="" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default EmployeeForm