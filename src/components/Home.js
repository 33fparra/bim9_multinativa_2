/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import urlApi from '../common/Global'
import SimpleReactValidator from "simple-react-validator";

// dudas como se coloca la Api como se invoca desde el common

class Inicio extends Component{

    render(){
        var message = "Prueba de Router (inicio)";
        return(
            <div>
                <p>Esto es una {message}</p>
               
            </div>
        );
        }


}

export default Inicio;