import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './Form'

class EmployeeNew extends React.Component {   

    handleSubmit = (formData) => {
            //console.log(formData)
         axios.post("/employees", formData, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            if (response.data._id) {
                this.props.history.push("/employees")
        }
        })
        .catch(err => {
            alert(err)
        })
        }
        
    

    render () {
        return (
            <div>
               <EmployeeForm handleSubmit = { this.handleSubmit } />
            </div>
        )
    }

}
export default EmployeeNew