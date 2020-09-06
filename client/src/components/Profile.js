import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { Table } from 'reactstrap'

const Profile = () => {
    const {user} = useContext(AuthContext)
    return (
        <Table striped>
        <thead>
            <tr>
            <th>#</th>
            <th>Parameter</th>
            <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>First Name</td>
                <td> {user.firstName} </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Last Name</td>
                <td> {user.lastName} </td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Age</td>
                <td> {user.age} </td>
            </tr>
            <tr>
                <th scope="row">4</th>
                <td>Sex</td>
                <td> {user.sex} </td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Mobile Number</td>
                <td> {user.mobile} </td>
            </tr>
            <tr>
                <th scope="row">6</th>
                <td>Email</td>
                <td> {user.email} </td>
            </tr>
            <tr>
                <th scope="row">7</th>
                <td>Village</td>
                <td> {user.village} </td>
            </tr>
            <tr>
                <th scope="row">8</th>
                <td>Block</td>
                <td> {user.block} </td>
            </tr>
            <tr>
                <th scope="row">9</th>
                <td>District</td>
                <td> {user.district} </td>
            </tr>
            <tr>
                <th scope="row">10</th>
                <td>State</td>
                <td> {user.state} </td>
            </tr>
        </tbody>
        </Table>
    )
}

export default Profile