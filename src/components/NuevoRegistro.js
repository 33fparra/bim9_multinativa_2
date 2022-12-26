/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import urlApi from '../common/Global'
import SimpleReactValidator from "simple-react-validator";

// dudas como se coloca la Api como se invoca desde el common
// revisar todos los required

class AgregarPaciente extends Component{
    url = urlApi;
    rutRef = React.createRef();
    nombreRef = React.createRef();
    edadRef = React.createRef();
    sexoRef = React.createRef();
    fotoPersonalRef = React.createRef();
    fechaIngresoRef = React.createRef();
    enfermedadRef = React.createRef();
    revisadoRef = React.createRef();

state = {
    paciente:{},
    status: null,
    photo: null,
    force: false
}

validator = new SimpleReactValidator();

changeState = () => {
    this.setState({
      paciente: {
        rut: this.rutRef.current.value,
        nombre: this.nombreRef.current.value,
        edad: this.edadRef.current.value,
        sexo: this.sexoRef.current.value,
        fotoPersonal: this.fotoPersonalRef.current.value,
        fechaIngreso: this.fechaIngresoRef.current.value,
        enfermedad: this.enfermedadRef.current.value,
        revisado: this.revisadoRef.current.value
      },
    });
    this.validator.showMessages();
    this.forceUpdate();
  };

fileChange = (e)=>{
    this.setState({
        photo: e.target.files[0]
    })
}  

newPaciente = (e) =>{
    e.preventDefault()
    this.changeState()
    if(this.validator.allValid()){
        axios.post(this.url+"/paciente", this.state.paciente).then(res=>{
            if(res.data.newPaciente){
                this.setState({
                    paciente: res.data.newPaciente,
                    status: 'waiting'
                })
                if(this.state.photo !== null){
                    console.log(this.state.paciente);
                    var id = this.state.paciente._id
                    const formData = new FormData()
                    formData.append('file', this.state.photo, this.state.photo.nombre) //recordar que el nombre 'file' debe ser igual al de la Api de express o tirara error

                    axios.post(this.url+"/paciente/photo/"+id, formData).then(res=>{
                        if(res.data.paciente){
                            this.setState({
                                paciente: res.data.paciente,
                                status: 'succes',
                                force: true
                            })
                        }else{
                            this.setState({
                                paciente: res.data.paciente,
                                status: 'error'
                            })
                        }
                    })
                }else{
                    this.setStatus({
                    status: 'succes'
                })
            }
            }else{
                this.setStatus({
                status: 'succes'})
            }

        })
    }else{
        this.validator.showMessages()
        this.forceUpdate()
        this.setState({
            status: 'error'
        })
    }
}

// aqui debo arreglar el tema de los booleanos y de las fechas para ingresar ademas la foto

render() {
    return (
      <div>
       <form onSubmit={this.validar}>     {/* CAMBIAR NOMBRE THIS. ESTA PARTE */}
          <table>

              <tr>
              <td>
                <label>Rut</label>
              </td>
              <td>
                <input type="text" name="rut" ref={this.rutRef} onChange={this.changeState} />
              </td>
              {this.validator.message("rut", this.state.paciente.rut, "required|alpha")}
            </tr>
            {/* nombre */}
            <tr>
              <td>
                <label>Nombre</label>
              </td>
              <td>
                <input type="text" name="nombre" ref={this.nombreRef} onChange={this.changeState} />
              </td>
              {this.validator.message("nombre", this.state.paciente.nombre, "required|alpha_space")}
            </tr>
            {/* edad */}
            <tr>
              <td>
                <label>Edad</label>
              </td>
              <td>
                <input
                  type="text" name="edad" ref={this.edadRef} onChange={this.changeState}/>
              </td>
              {this.validator.message("edad", this.state.paciente.edad, "required|alpha")}
            </tr>
            {/* sexo */}
            <tr>
              <td>
                <label>Sexo</label>
              </td>
              <td>
                <input type="text" name="sexo" ref={this.sexoRef} onChange={this.changeState} />
              </td>
              {this.validator.message("sexo", this.state.paciente.sexo, "required|alpha")}
            </tr>
            {/* fotoPersonal Aqui tengo ciertas dudas*/}
            <tr>
              <td>
                <label>Foto</label>
              </td>
              <td>
                <input type="file" name="photo" ref={this.fotoPersonalRef} onChange={this.fileChange} />
              </td>
              {/* {this.validator.message("foto", this.state.paciente.foto, "required|alpha")} */}
            </tr>
            {/* fecha Ingreso*/}
            <tr>
              <td>
                <label>Fecha</label>
              </td>
              <td>
                <input type="text" name="fecha" ref={this.fechaIngresoRef} onChange={this.changeState} />
              </td>
              {this.validator.message("fechaIngreso", this.state.paciente.fechaIngreso, "required|alpha")}
            </tr>
            {/* enferemedad */}
            <tr>
              <td>
                <label>Enfermedad</label>
              </td>
              <td>
                <input type="text" name="enfermedad" ref={this.enfermedadRef} onChange={this.changeState} />
              </td>
              {this.validator.message("enfermedad", this.state.paciente.enfermedad, "required|alpha")}
            </tr>
            {/* revisado */}
            <tr>
              <td>
                <label>Revisado</label>
              </td>
              <td>
                <input type="text" name="revisado" ref={this.revisadoRef} onChange={this.changeState} />
              </td>
              {this.validator.message("revisado", this.state.paciente.revisado, "required|alpha")}
            </tr>
            <tr>
              <td>
                <input type="submit" value="Create Paciente"/>
              </td>
            </tr>
          </table>
        </form>
        {
            this.state.force && <Redirect to="/"></Redirect>
        }
      </div>
    );
  }

}

export default AgregarPaciente;