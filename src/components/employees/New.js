import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './Form'
import Swal from 'sweetalert2'

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
                Swal.fire(
                    'Good job!',
                    'You department has been created!',
                    'success'
                  )
                this.props.history.push("/employees")
        }
        })
        .catch(err => {
            Swal.fire(
                'Oops!',
                'Something went wrong!',
                'error'
              )
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