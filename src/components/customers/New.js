import React from 'react'
import axios from '../../config/axios'
import Form from './Form'
import Swal from "sweetalert2"

class CustomerNew extends React.Component {

    handleSubmit = (formData) => {
        axios.post("/customers",formData, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            console.log(response.data)
            if ( response.data._id ) {
                this.props.history.push("/customers")
                Swal.fire('Good job', 'Customer has been created !', 'success')
            } else {
                //alert (response.data.message)
                Swal.fire('Oops', 'Something went wrong', 'error')
            }
        })
    }
   
    render () {
        return (
            <div>
                <h2>Add a new customer</h2>
                <Form handleSubmit = { this.handleSubmit } />
            </div>
        )
    }
}

export default CustomerNew 