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
            <div className = "container">
                 <h2>Add an employee</h2>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <label htmlFor="id">id</label>
                        <input type="tetx" name="empId" className = "form-control" id="id" value={ this.state.empId } onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" name="name" className = "form-control" value={ this.state.name } onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="email">email</label>
                        <input type="text" name="email" className = "form-control" id="email" value = { this.state.email } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="mobile">mobile</label>
                        <input type="text" name="mobile" className = "form-control" id = "mobile" value = { this.state.mobile } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <select onChange = { this.handleSelect } className = "form-control">
                            <option value="select">Select</option>
                            {
                                this.state.departments.map(dept => {
                                    return <option key = { dept._id} value ={ dept.name }>{ dept.name }</option> 
                                }
                            )}
                        </select>
                    </div>
                    <button type="submit" className = "btn btn-primary">submit</button>
                </form>
            </div>
        )
    }
}

export default EmployeeForm