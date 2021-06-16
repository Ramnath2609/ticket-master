import React from 'react'
import HomeImage from "./assets/image/ticket-master.png"

function Home (props) {
    return (
        <div className="home">
            <div className="container home-image">
                <img src={HomeImage} alt="home" />
            </div>
            <div className="home-text">
                <h1>Welcome to the Ticket Master application</h1>
            </div>
        </div>
    )
}

export default Home