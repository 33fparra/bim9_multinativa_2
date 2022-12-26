/* eslint-disable no-undef */
/* eslint-disable react/require-render-return */
/* eslint-disable no-unused-vars */
// en este componente el ESLINT ME TIRO MUCHISIMOS ERRORES

import React, {Component} from 'react';
import ListarPacientes from '../components/ListarPacientes';
import BuscarPaciente from '../components/BuscarRegistro';

class Seeker extends Component{
    render(){
        var field = this.props.match.params.buscar;
        returm(
            <div>
                <h1>Searching: {field}</h1>
                <ListarPacientes buscar={field}></ListarPacientes>
                <BuscarPaciente></BuscarPaciente>
            </div>
        );
    }
 }

export default Seeker;