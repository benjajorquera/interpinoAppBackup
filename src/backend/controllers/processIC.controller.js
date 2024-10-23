const db = require("../models");
const Interconsulta = db.interconsulta;
const { Op } = require("sequelize");

function parseEntry(item) {
  let fechaSolicitud = parseDate(item["Fecha Solicitud"]);
  let fechaEjecucion = parseDate(item["Fecha Ejecución"]);
  return {
    name: item["Nombre Paciente"],
    run: item["Rut"],
    age: parseInt(item["Edad"]),
    gender: item["Sexo"],
    diagnosis: item["Diagnóstico"],
    origin: item["Unidad/Servicio Origen Interconsulta"],
    room: item["Sala"] === "" ? null : item["Sala"],
    bed: item["Cama"] === "" ? null : item["Cama"],
    description: item["Descripción Interconsulta"],
    request: item["Profesional Solicitante"],
    evaluate:
      item["Profesional que Evalúa"] === ""
        ? null
        : item["Profesional que Evalúa"],
    status: item["Estado de la Orden"],
    dateRequest: fechaSolicitud,
    timeRequest: item["Hora Solicitud"],
    dateExecute: fechaEjecucion === "" ? null : fechaEjecucion,
    timeExecute: item["Hora Ejecución"] === "" ? null : item["Hora Ejecución"],
    waitingTime:
      item["Tiempo de Espera"] === "" ? null : item["Tiempo de Espera"],
    reasonChangeStatus:
      item["Razón Cambio Estado"] === "" ? null : item["Razón Cambio Estado"],
    Observations: item["Observaciones"],
  };
}

function parseDate(date) {
  if (date === "") return "";
  date = date.split("/");
  return date[2] + "-" + date[1] + "-" + date[0];
}

async function updateInterconsulta(item) {
  let fechaSolicitudParse = parseDate(item["Fecha Solicitud"]) + "T00:00:00.000Z";
  var idIC = undefined;
  if(!item["Rut"]) item["Rut"] = null;
  await Interconsulta.findOne({
    where: {
      run: item["Rut"],
      dateRequest: fechaSolicitudParse,
      timeRequest: item["Hora Solicitud"] + ":00",
    },
  })
    .then((data) => {
      if (data !== null) idIC = data.id;
      else {
        console.log("No se ha encontrado la Interconsulta");
        addInterconsulta(item);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (idIC !== undefined) {
    var entry = parseEntry(item);
    await Interconsulta.findOne({
      where: {
        id: idIC,
        status: { [Op.not]: "Ejecutado" },
      },
    })
      .then((interconsulta) => {
        if (!interconsulta) {
          console.log(
            "No se ha encontrado la Interconsulta con id= " +
              idIC +
              " , o se encuentra en estado ejecutado."
          );
          return;
        }

        interconsulta
          .update(entry)
          .then((data) => {
            console.log("Interconsulta actualizada correctamente!");
          })
          .catch((err) => {
            console.log("Error actualizando la Interconsulta");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function addInterconsulta(item) {
  var entry = parseEntry(item);

  await Interconsulta.create(entry)
    .then((data) => {
      console.log("Interconsulta creada correctamente!");
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al crear la Interconsulta");
      console.log(entry);
    });
}

async function processData(data) {
  const requiredKeys = [
    "Nombre Paciente",
    "Edad",
    "Sexo",
    "Unidad/Servicio Origen Interconsulta",
    "Descripción Interconsulta",
    "Profesional Solicitante",
    "Estado de la Orden",
    "Fecha Solicitud",
    "Hora Solicitud",
    "Observaciones",
  ];

  const interconsultas = { aprobados: [], reprobados: [], agendadas: [] };

  await data.forEach(function (item) {
    if((item['Sala'] !== undefined || item['Sala'] !== null) && item['Sala'].slice(0,6) === "Cierre"){
      return;
    }
    // Si falta algún campo obligatorio, se agrega a la lista de reprobadas
    let flag = false;
    const emptyKeys = Object.keys(item).filter(
      (key) => item[key] === null || item[key] === undefined || item[key] === ""
    );
    requiredKeys.forEach(function (columnName, id) {
      if (emptyKeys.includes(columnName)) {
        interconsultas["reprobados"].push(item);
        flag = true;
        return;
      }
    });
    if (flag) return;

    if (item["Estado de la Orden"] === "Ejecutado") {
      interconsultas["aprobados"].push(item);
    } else {
      item["Estado de la Orden"] = "Agendado";
      interconsultas["aprobados"].push(item);
      interconsultas["agendadas"].push(item);
    }

    updateInterconsulta(item);
  });

  return interconsultas;
}

module.exports = { processData };
