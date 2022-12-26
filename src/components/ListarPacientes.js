/* eslint-disable react/jsx-no-duplicate-props */

import React, { Component } from "react";
// import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import urlApi from '../common/Global'


// dudas como se coloca la Api como se invoca desde el common

class ListarPacientes extends Component{

    url = urlApi;

    state = {
        pacientes : [],
        status: null
    }

    componentDidMount(){
        var start = this.props.home
        var buscar = this.props.buscar
        if(start === 'true') {
            this.getLastsPacientes()
        } else if (buscar && buscar !== null && buscar !== undefined){
            this.getUsersBySearch(buscar)
        } else {
            this.getPacientes()
        }
    }

    getPcientes = () => {
        axios.get(this.url + '/pacientes').then(res=>{
            this.setState({
               pacientes: res.data.pacientes,
               status: 'success'     
            })
        })
    };

    getLastsPacientes = () =>{
        axios.get(this.url + '/pacientes/last').then(res=>{
            this.setState({
                pacientes: res.data.pacientes,
                status: 'success'
            })
        })
    };

    getUsersBySearch = () => {
        axios.get(this.url + '/pacientes/buscar/').then(res=>{
            if(res.data.paciente) {
                this.setState({
                    pacientes: res.data.paciente,
                    status: 'success'
                })
            } else {
                this.setState({
                    pacientes: res.data.paciente,
                    status: 'error'
                })
            }
            
        })
    };

    render(){
        if (this.state.pacientes.length >= 1){
            return (<table border="1">
                <thead>
                    <tr>
                        <td>Rut</td>
                        <td>Nombre</td>
                        <td>Edad</td>
                        <td>Sexo</td>
                        <td>Foto</td>
                        <td>Fecha</td>
                        <td>Enfermedad</td>
                        <td>Revisado</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.pacientes.map((u) =>{
                            return (<tr key={u._id}>
                                <td>{u.rut}</td>
                                <td>{u.nombre}</td>
                                <td>{u.edad}</td>
                                <td>{u.sexo}</td>
                                <td>{
                                    u.photo != null ? (
                                       <img src={this.url + '/pacientes/buscar/' + u.photo} alt ={u.nombre} height="100px" width="100px" /> 
                                    ) : (
                                        <img src="https://www.rockombia.com/images/upload/rockombia-201504171429313975.jpg" height="100px" width="100px" alt={u.nombre} height="100px" width="100px" />
                                    )}</td>
                                <td>{u.fechaIngreso}</td>
                                <td>{u.enfermedad}</td>
                                <td>{u.revisado}</td>

                                <td><Link to={'/paciente/detalle' + u._id}>Detalles</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            )

        }else if (this.state.pacientes.length === 0 && this.state.status === 'success'){
            return (
                <div>
                    <h2>No hay Pacientes para mostrar</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Taking so long.........</h2>
                </div>
            )
        }
        
    }
}

export default ListarPacientes;