import React from 'react'

class DepartmentForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            name : props.name ? props.name : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const name = this.state.name
        const department = { name }
        this.props.handleSubmit(department)
    }

    render () {
        return (
            <div>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type="text" className = "form-control" name="name" value={ this.state.name} onChange = {this.handleChange}/>
                    </div>
                    <button type="submit" className = "btn btn-primary">ADD</button>
                </form>

            </div>
        )
    }
}

export default DepartmentForm