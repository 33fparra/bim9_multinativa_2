import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import BuscarPaciente from '../components/BuscarRegistro';

class Nav extends Component{
    render(){
        var cabecera="Menú de Navegación";
        return(
            <div>
                <h1>{cabecera}</h1>
                <ul>
                    <li><NavLink to="/inicio">Inicio</NavLink></li>
                    <li><NavLink to="/paciente/nuevo">Agregar Paciente</NavLink></li>
                    <li><NavLink to="/paciente/listar">Listado de Pacientes</NavLink></li>
                   
                </ul>
                <BuscarPaciente></BuscarPaciente>
            </div>
        );
    }
}

export default Nav;