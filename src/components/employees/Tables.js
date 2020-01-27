import React from 'react'
import { Link } from 'react-router-dom'

function Tables (props) {

    const handleRemove = (id) => {
        const data = id
        props.handleRemove(data)
    }

    return (
        <div className = "container">
            <table className="table">
        <thead>
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>email</th>
                <th>mobile</th>
                <th>department</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
            {
                props.employees.map((empl, i) => {
                    return <tr key = { empl._id } className="tableStriped">
                              <td>{ i + 1 }</td>
                              <td>{ empl.name }</td>
                              <td>{ empl.email }</td>
                              <td>{ empl.mobile }</td>
                              <td>{ empl.department.name }</td>
                              <td><Link to ={`/employees/${empl._id}`}>Show  |</Link><Link to ="/employees" onClick = {()=>{ handleRemove(empl._id) }}>  Remove</Link></td>
                           </tr>
                })
            }
        </tbody>
    </table>
        </div>
    )
}

export default Tables