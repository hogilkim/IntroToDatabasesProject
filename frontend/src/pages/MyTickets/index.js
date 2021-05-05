import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import moment from 'moment'
import './mytickets.css'

export default function MyTickets(){
    const [tickets, setTickets] = useState([]);
    const customer_id = localStorage.getItem('customer');

    useEffect(()=>{
        getTickets()
    }, [])

    const getTickets = async (filter) => {
        const url ='/ticket/${filter}'
        const response = await api.get(url, {headers: {customer_id}});

        setTickets(response.data);
    }
    return (
        <ul className="tickets-list">
            {tickets.map(ticket=>(
                <li key={ticket._id}>
                    <strong>{ticket.airline_name}</strong>
                    <span>Flight Number: {ticket.flight_number}</span>
                    <span>Sold Price: ${parseFloat(ticket.sold_price).toFixed(2)}</span>
                    <span>Card Type: {ticket.card_type}</span>
                    <span>Card Number: {ticket.card_num}</span>
                    <span>Name On Card: {ticket.name_on_card}</span>
                    <span>Expiration Date: {moment(ticket.expiration_date).format('l')}</span>
                    <span>Purchase Date: {moment(ticket.purchase_date).format('l')}</span>
                    <span>Purchase Time: {moment(ticket.purchase_time).format('h:mm')}</span>
                </li>
            ))}
        </ul>
    )
}