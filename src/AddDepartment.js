import React from 'react'
import { Button } from 'reactstrap'
import axios from './config/axios'
import Swal from 'sweetalert2'

function AddDepartment () {
    return (
        <div>
            <Button color = "primary" onClick = {() => {
                       Swal.fire({
                        title: 'Add a department',
                        input: 'text',
                        inputAttributes: {
                          autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Add',
                        showLoaderOnConfirm: true,
                        preConfirm: (department) => {
                          const formData = { name : department }
                          return axios.post(`/departments`, formData)
                            .then(response => {
                              console.log(response)
                              if (response.data.hasOwnProperty('errors')) {
                                throw new Error(response.data.errors.message)
                              } else {
                                return response.data
                              }
                              
                            })
                            .catch(error => {
                              Swal.showValidationMessage(
                                `Request failed: ${error}`
                              )
                            })
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                      }).then((result) => {
                        if (result.value) {
                          Swal.fire({
                            title : 'Department has been added successfuly'
                          })
                        }
                      })
                 }}>Add a department</Button>
        </div>
    )
}
export default AddDepartment