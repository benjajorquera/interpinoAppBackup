const db = require("../models");
const { Op } = require('sequelize');
const Especialidad = db.especialidad;
const Origen = db.origen;

async function groupByICSO(data) {

    let defaultQuery = await Especialidad.findAll({
        attributes: ['service','email'],
        where: {
            service: 'DEFAULT',
        },
    });
    //Por si no existe servicio especialidad DEFAULT
    if(Object.keys(defaultQuery).length === 0) {
        await Especialidad.create({ name: "Edgardo Villavicencio", email: "edgardo.villavicenci@redsalud.gov.cl", service: "DEFAULT" });
        await Especialidad.create({ name: "Diego Ruiz", email: "diego.ruiz@redsalud.gob.cl", service: "DEFAULT" });
    }

    //Servicios de Origen
    let origen = await Origen.findAll({
        attributes: ['service'],
        group: ['service']
    });
    let listaSO = {};
    origen.forEach(origen => {
        listaSO[origen.service] = {};
        listaSO[origen.service].correos = [];
        listaSO[origen.service].interconsultas = [];
    });
    let correosOrigen = await Origen.findAll({
        attributes: ['service', 'email'],
    });
    let correosOrigenJ = JSON.parse(JSON.stringify(correosOrigen));
    correosOrigenJ.forEach(correo => {
        listaSO[correo.service].correos.push(correo.email);
    });

    //Especialidades
    let especialidades = await Especialidad.findAll({
        attributes: ['service'],
        group: ['service']
    });
    let listaIC = {};
    especialidades.forEach(especialidad => {
        listaIC[especialidad.service] = {};
        listaIC[especialidad.service].correos = [];
        listaIC[especialidad.service].interconsultas = [];
    });

    let correosEspecialidades = await Especialidad.findAll({
        attributes: ['service', 'email'],
    });
    let correosEspecialidadJ = JSON.parse(JSON.stringify(correosEspecialidades));
    correosEspecialidadJ.forEach(especialidad => {
        listaIC[especialidad.service].correos.push(especialidad.email);
    });

    const aprobadosIC = data.aprobados;
    const reprobadosIC = data.reprobados;

    aprobadosIC.forEach(interconsulta => {
        let nombreEspecialidad = interconsulta['Descripción Interconsulta'];
        if(listaIC.hasOwnProperty(nombreEspecialidad)){
            let arrIC = listaIC[nombreEspecialidad].interconsultas;
        
            if(arrIC === undefined){
                let arr = [];
                arr.push(interconsulta);
                listaIC[nombreEspecialidad].interconsultas = arr;
            }else{
                arrIC.push(interconsulta);
            }
        }else{
            let arrIC = listaIC['DEFAULT'].interconsultas;
            
            if(arrIC === undefined){
                let arr = [];
                arr.push(interconsulta);
                listaIC['DEFAULT'].interconsultas = arr;
            }else{
                arrIC.push(interconsulta);
            }
        }
    });

    reprobadosIC.forEach(interconsulta => {
        let nombreEspecialidad = interconsulta['Unidad/Servicio Origen Interconsulta'];
        if(listaSO.hasOwnProperty(nombreEspecialidad)){
            let arrSO = listaSO[nombreEspecialidad].interconsultas;
            
            if(arrSO === undefined){
                let arr = [];
                arr.push(interconsulta);
                listaSO[nombreEspecialidad].interconsultas = arr;
            }else{
                arrSO.push(interconsulta);
            }
        }
    });


    return {listaIC, listaSO};
}
module.exports = { groupByICSO};