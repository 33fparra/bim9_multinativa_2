/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Redirect} from 'react-router';
import axios from 'axios';

class BuscarPaciente extends Component{

    buscarRef = React.createRef();

    state= {
        buscar: "",
        redirect: false
    }

    buscarByField=(e)=>{
        e.preventDefault(); //evitar que recargue la pagina
        this.setState({
            buscar:this.buscarRef.current.value,
            redirect: true
        })
    }


    render(){
        if(this.state.redirect){
            return(
                <Redirect to={'/redirect/' + this.state.buscar }></Redirect>
            );
        }



        return(
            <div>
                <form onSubmit={this.buscarByField}>
                    <table>
                        <tr>
                            <td>Buscar</td>
                            <td><input type="text" name="buscar" ref={this.buscarRef} /></td>
                            <td><input type="submit" name="submit" value="Buscar" /></td>
                        </tr>
                    </table>
                </form>
               
            </div>
        );
        }
}

export default BuscarPaciente;