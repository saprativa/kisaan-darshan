import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { Table } from 'reactstrap';

const Profile = () => {
    const {profile} = useContext(AuthContext)
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
                <td> {profile.firstName} </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Last Name</td>
                <td> {profile.lastName} </td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Age</td>
                <td> {profile.age} </td>
            </tr>
            <tr>
                <th scope="row">4</th>
                <td>Sex</td>
                <td> {profile.sex} </td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Mobile Number</td>
                <td> {profile.mobile} </td>
            </tr>
            <tr>
                <th scope="row">6</th>
                <td>Email</td>
                <td> {profile.email} </td>
            </tr>
            <tr>
                <th scope="row">7</th>
                <td>Village</td>
                <td> {profile.village} </td>
            </tr>
            <tr>
                <th scope="row">8</th>
                <td>Block</td>
                <td> {profile.block} </td>
            </tr>
            <tr>
                <th scope="row">9</th>
                <td>District</td>
                <td> {profile.district} </td>
            </tr>
            <tr>
                <th scope="row">10</th>
                <td>State</td>
                <td> {profile.state} </td>
            </tr>
        </tbody>
        </Table>
    )
}

export default Profile