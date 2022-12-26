/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import urlApi from '../common/Global'
import {Link} from 'react-router-dom';


// dudas como se coloca la Api como se invoca desde el common

class Paciente extends Component{

    url = urlApi;

    state = {
        paciente : false,
        status: null
    }

    componentDidMount(){
        this.getUserById()
    }

    getUserById = () => {
        var id = this.props.match.params.id
        console.log(this.props)
        axios.get(this.url + "/paciente/" + id).then(res=>{
            this.setState({
                paciente: res.data.paciente,
                status: 'success'
            })
        }).catch(err=>{
            this.setState({
                paciente: false,
                status: 'success'
            })
        })

    };

    deleteUserById = (id) => {
        axios.delete(this.url + "/paciente/" + id).then(res =>{
            this.setState({
                paciente: res.data.paciente,
                status: 'delete'
            })
        })
    }


    render(){
        var message = "Prueba de Router (detalle)";
        return(
        <div>
                {
                    this.state.status === 'deleted' && <Redirect to="/"></Redirect>
                }
                {
                    this.state.paciente &&
            <div>
                <table border="1">
                <thead>
                    <tr>
                        <td>Rut</td>
                        <td>{this.state.paciente.rut}</td>
                    </tr>    
                    <tr>
                        <td>Nombre</td>
                        <td>{this.state.paciente.nombre}</td>
                    </tr> 
                    <tr>
                        <td>Edad</td>
                        <td>{this.state.paciente.edad}</td>
                    </tr> 
                    <tr>
                        <td>Sexo</td>
                        <td>{this.state.paciente.sexo}</td>
                    </tr>     
                    <tr>
                        <td>Foto</td>
                        {
                            this.state.paciente.photo !== null ? (
                                <img src={this.url + '/pacientes/photo/' + this.state.paciente.photo} alt ={this.state.paciente.photo} height="100px" width="100px" /> 
                            ) : (
                                <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt=""id="photo"></img>
                            )
                        }
                    </tr> 
                    <tr>
                        <td>Fecha Ingreso</td>
                        <td>{this.state.paciente.fechaIngreso}</td>
                    </tr>     
                    <tr>
                        <td>Enfermedad</td>
                        <td>{this.state.paciente.enfermedad}</td>
                    </tr>     
                    <tr>
                        <td>Revisado</td>
                        <td>{this.state.paciente.revisado}</td>
                    </tr> 

                    <tr>
                        <td><Link to={'/paciente/actualizar/' + this.state.paciente._id}>Actualizar</Link></td>
                        <td><button onClick={()=>{this.deleteUserById(this.state.paciente._id)}}>Delete</button></td>
                    </tr> 
                    
                </thead>
             </table>
            </div>
            }
            {
                !this.state.paciente && this.state.status === 'success' &&
                <div>
                    <h2>Paciente No encontrado</h2>
                    <h3>Prueba mass tarde</h3>
                    <Link to={'/'}></Link>
                </div>
            }
            {
                    this.state.status == null &&
                    <div>
                        <h2>Cargando.-.-.-.-.</h2>
                    </div>
            }
        </div>
        );
    }
}

export default Paciente;