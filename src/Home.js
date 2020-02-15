import React , {Component} from 'react'
import AddDepartment from './AddDepartment'

function Home (props) {
    return (
        <div>
            <h2>Welcome to ticket master app</h2>
            { localStorage.getItem('authToken') && <AddDepartment /> }
        </div>
    )
}

export default Home