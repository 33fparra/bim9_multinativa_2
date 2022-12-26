/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import urlApi from '../common/Global'
import SimpleReactValidator from "simple-react-validator";

// dudas como se coloca la Api como se invoca desde el common

class ActualizarPaciente extends Component{

    url = urlApi;
    rutRef = React.createRef();
    nombreRef = React.createRef();
    edadRef = React.createRef();
    sexoRef = React.createRef();
    fotoPersonalRef = React.createRef();
    fechaIngresoRef = React.createRef();
    enferemedadRef = React.createRef();
    revisadoRef = React.createRef();
    pacienteId = null;

state = {
    paciente:{},
    status: null,
    photo: null,
    nuevo: ''
};

//yo asumo que aca no se usa por defecto el userId

componentDidMount(){
    this.pacienteId = this.props.match.params.id
    this.getUserById(this.pacienteId)
};

validator = new SimpleReactValidator();

//Aca estoy seguro que DEBO TRATAR LA IMAGEN, LA FECHA Y LOS BOOLEANOS DE OTRA FORMA

changeState = () => {
    this.setState({
      paciente: {
        rut: this.rutRef.current.value,
        nombre: this.nombreRef.current.value,
        edad: this.edadRef.current.value,
        sexo: this.sexoRef.current.value,
        fotoPersonal: this.fotoPersonalRef.current.value,
        fechaIngreso: this.fechaIngresoRef.current.value,
        enferemedad: this.enferemedadRef.current.value,
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

getUserById = (id) => {
    axios.get(this.url+ '/user/' +id).then(res=>{
        this.setState({
            paciente: res.data.paciente,
            nuevo: res.data.paciente.photo
        })
    })
}

UpdateUser = (e) =>{
    e.preventDefault()
    this.changeState()
    if(this.validator.allValid()){
        axios.put(this.url+"/paciente", this.state.paciente).then(res=>{ //recuerda que aqui hay una peticion tipo PUT
            if(res.data.newPaciente){
                this.setState({
                    paciente: res.data.newPaciente,
                    status: 'waiting'
                })
                if(this.state.photo !== null){
                    console.log(this.state.paciente);
                    var id = this.state.paciente._id
                    const formData = new FormData()
                    formData.append('file', this.state.photo, this.state.photo.nombre) //ojo AL NOMBRE DEL CAMPO AQUI

                    axios.post(this.url+"/paciente/photo/"+id, formData).then(res=>{
                        if(res.data.paciente){
                            this.setState({
                                paciente: res.data.paciente,
                                status: 'succes',
                                // force: true
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



render() {

    if(this.state.status === 'success'){
        return <Redirect to={'/'}></Redirect>
    }

    return (
      <div>
       <form onSubmit={this.ActualizarPaciente}>     {/* CAMBIAR NOMBRE THIS. ESTA PARTE */}
          <table>

              <tr>
              <td>
                <label>Rut</label>
              </td>
              <td>
                <input type="text" name="rut" ref={this.rutRef} onChange={this.changeState} defaultValue={paciente.rut}/>
              </td>
              {this.validator.message("rut", this.state.paciente.rut, "required|alpha")}
            </tr>
            {/* nombre */}
            <tr>
              <td>
                <label>Nombre</label>
              </td>
              <td>
                <input type="text" name="nombre" ref={this.nombreRef} onChange={this.changeState} defaultValue={paciente.rut}/>
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
              {
                this.state.paciente.photo !== nulll? (
                    <img src={this.url+'/paciente/photo/' + this.state.nuevo} alt={this.state.paciente.photo} width="275px" height="250px" id="photo"></img>
                ):(
                    <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt=""id="photo"></img>
                )
              
              }
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
            {/* enfermedad */}
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

export default ActualizarPaciente;