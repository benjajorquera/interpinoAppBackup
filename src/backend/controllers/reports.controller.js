const db = require("../models");
const { QueryTypes } = require('sequelize');
const XLSX = require('xlsx');
const xl = require('excel4node');
const path = require('path');

exports.reportsBySpecialtyDate = (req, res) => {
    let interconsultas = db.sequelize.query(
        'SELECT * FROM interconsulta WHERE description IN(:desc) AND dateRequest  BETWEEN :iniDate AND :endDate ORDER BY description',
        {
            replacements: { desc: req.body.especialidades, iniDate: req.body.start_date, endDate: req.body.end_date },
            type: QueryTypes.SELECT
        }
    )

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Interconsultas');
    var style = wb.createStyle({
        font: {
            color: '#040404',
            size: 12,
        }
    });

    ws.cell(1, 1).string('Nombre Paciente').style(style);
    ws.cell(1, 2).string('Rut').style(style);
    ws.cell(1, 3).string('Edad').style(style);
    ws.cell(1, 4).string('Sexo').style(style);
    ws.cell(1, 5).string('Diagnóstico').style(style);
    ws.cell(1, 6).string('Unidad/Servicio Origen Interconsulta').style(style);
    ws.cell(1, 7).string('Sala').style(style);
    ws.cell(1, 8).string('Cama').style(style);
    ws.cell(1, 9).string('Descripción Interconsulta').style(style);
    ws.cell(1, 10).string('Profesional Solicitante').style(style);
    ws.cell(1, 11).string('Profesional que Evalúa').style(style);
    ws.cell(1, 12).string('Estado de la Orden').style(style);
    ws.cell(1, 13).string('Fecha Solicitud').style(style);
    ws.cell(1, 14).string('Hora Solicitud').style(style);
    ws.cell(1, 15).string('Fecha Ejecución').style(style);
    ws.cell(1, 16).string('Hora Ejecución').style(style);
    ws.cell(1, 17).string('Tiempo de Espera').style(style);
    ws.cell(1, 18).string('Razón Cambio Estado').style(style);
    ws.cell(1, 19).string('Tiempo sin ejecutarse').style(style);
    ws.cell(1, 20).string('Observaciones').style(style);

    interconsultas.then((data) => {
        var i = 2;
        data.forEach((interconsulta) => {
            console.log(interconsulta);
            ws.cell(i, 1).string(interconsulta.name).style(style);
            ws.cell(i, 2).string(interconsulta.run).style(style);
            ws.cell(i, 3).number(interconsulta.age).style(style);
            ws.cell(i, 4).string(interconsulta.gender).style(style);
            ws.cell(i, 5).string(interconsulta.diagnosis).style(style);
            ws.cell(i, 6).string(interconsulta.origin).style(style);
            //Sala
            if(interconsulta.room != null){
              ws.cell(i, 7).string(interconsulta.room).style(style);  
              
            }else{
              ws.cell(i, 7).string("").style(style);
            }
            //Cama
            if(interconsulta.bed != null){
              ws.cell(i, 8).string(interconsulta.bed).style(style);
            }else{
              ws.cell(i, 8).string("").style(style);
            }
            ws.cell(i, 9).string(interconsulta.description).style(style);
            ws.cell(i, 10).string(interconsulta.request).style(style);
            //Profesional que Evalua
            if(interconsulta.evaluate != null){
              ws.cell(i, 11).string(interconsulta.evaluate).style(style);
            }else{
              ws.cell(i, 11).string("").style(style);
            }
            ws.cell(i, 12).string(interconsulta.status).style(style);
            //Fecha Solicitud
            let dateRequestString = interconsulta.dateRequest.toISOString().slice(0, 10);
            ws.cell(i, 13).string(dateRequestString).style(style);
            ws.cell(i, 14).string(interconsulta.timeRequest).style(style);
            //Fecha ejecución
            if(interconsulta.dateExecute != null){
              let dateExecuteString = interconsulta.dateExecute.toISOString().slice(0, 10);
              ws.cell(i, 15).string(dateExecuteString).style(style);
            }else{
              ws.cell(i, 15).string("").style(style);
            }
            //Hora ejecución
            if(interconsulta.timeExecute != null){
              ws.cell(i, 16).string(interconsulta.timeExecute).style(style);
            }else{
              ws.cell(i, 16).string("").style(style);
            }
            //Tiempo de espera
            if(interconsulta.waitingTime != null){
              ws.cell(i, 17).string(interconsulta.waitingTime).style(style);
            }else{
              ws.cell(i, 17).string("").style(style);
            }
            //Razón cambio estado
            if(interconsulta.reasonChangeStatus != null){
              ws.cell(i, 18).string(interconsulta.reasonChangeStatus).style(style);
            }else{
              ws.cell(i, 18).string("").style(style);
            }
            if(interconsulta.dateExecute == null){
              let fechaActual = new Date();
              let resultado = fechaActual.getTime() - interconsulta.dateRequest.getTime();
              let diasEspera = Math.round(resultado / (24*60*60*1000));
              let tiempoEsperaString = diasEspera.toString() + " Días";
              ws.cell(i, 19).string(tiempoEsperaString).style(style);
            }else{
              ws.cell(i, 19).string("").style(style);
            }
            //Observaciones
            ws.cell(i, 20).string(interconsulta.Observations).style(style);
            i++;
        });
        wb.write('Interconsultas.xlsx', res);
    });
}
