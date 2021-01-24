import React from 'react'
import HomeImage from "./assets/image/ticket-master.png"

function Home (props) {
    return (
        <div>
            <div className="container home-image">
                <img src={HomeImage} />
            </div>
        </div>
    )
}

export default Home