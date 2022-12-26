/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Nav from './Nav';
// import Validator from '../src/components/Validator';
import URL from '../components/URL';
import AgregarPaciente from '../components/NuevoRegistro';
import ActualizarPaciente from '../components/ActualizarRegistro';
import Inicio from '../components/Home';
import DetallePaciente from '../components/DetallePaciente'; //duda con el nombre del componente la clase lleva ese nombre seguro
import ListarPacientes from '../components/ListarPacientes'; //duda con el nombre del componente
import BuscarPaciente from '../components/BuscarRegistro';
import NotFound from '../routes/404'

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <Nav></Nav>
                <Switch>
                    <Route exact path="/" component={Inicio}></Route>
                    <Route exact path="/inicio" component={Inicio}></Route>
                    <Route exact path="/paciente/nuevo" component={AgregarPaciente}></Route>
                    <Route exact path="/paciente/actualizar/:id" component={ActualizarPaciente}></Route>
                    <Route exact path="/paciente/detalle/:id" component={DetallePaciente}></Route>
                    <Route exact path="/pacientes/listar" component={ListarPacientes}></Route>   {/* //aca me surgen dudas  */}
                    <Route exact path="/paciente/buscar/:buscar" component={BuscarPaciente}></Route>
                    <Route exact path="/redirect/:buscar" render={(props)=>{
                        var buscar=props.match.params.buscar;
                        return(
                            <Redirect to={'/paciente/buscar'+buscar}></Redirect>
                        )
                    }}
                    ></Route>
                    <Route component={Error}></Route>


                    {/* <Route exact path="/paciente" component={AgregarPaciente}></Route> */}
                </Switch>
            </BrowserRouter>

        );
    }
}

export default Router;
