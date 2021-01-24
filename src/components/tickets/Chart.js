import { Doughnut } from 'react-chartjs-2';
import React from "react"
function TicketChart(props){
    return (
        <Doughnut 
            data={props.data}
            width={100}
            height={50}
        />
    )
}

export default TicketChart