import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Axios() {
    const [person, setPerson] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                setPerson(response.data)
                console.log(person)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const el_item = person.map((item) => {
        return <li
            key={item.id}>
            Name: {item.name}
            Email: {item.email}
        </li>
    })
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name
        }
        axios.post(`https://jsonplaceholder.typicode.com/users`, user)
            .then((response) => {
                console.log(response);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleChangDelete = (e) => {
        setId(e.target.value)
    }
    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <ul>
                {el_item}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>
                    Person Name:
                </label>
                <input type="text" name="name" onChange={handleChange} />
            </form>
            <form onSubmit={handleDelete}>
                <label>
                    Person ID:
                </label>
                <input type="text" name="id" onChange={handleChangDelete} />
            </form>
        </>
    )
}
