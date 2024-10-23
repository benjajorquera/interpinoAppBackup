var exec = require("child_process").exec;
const db = require("../backend/models");
const Backup = db.backup;

async function exportDB() {
  var utc = new Date().toLocaleDateString().replaceAll("/", "-");
  var execString = "";
  execString =
    "mysqldump -u " +
    process.env.VUE_APP_DB_USER +
    ' --password="' +
    process.env.VUE_APP_DB_PASSWORD +
    '" interpino > "' +
    process.env.VUE_APP_BACKUP_ROUTE +
    "interpinoBackup" +
    utc +
    '.sql"';
  exec(execString, function (error) {
    console.log("Exportación exitosa");
    if (error !== null) {
      console.log("exec error: " + error);
      return;
    }
  });

  var backupDate = undefined;

  await Backup.findByPk(1)
    .then((data) => {
      console.log("Fecha de respaldo obtenida correctamente!");
      backupDate = data.date;
    })
    .catch((err) => {
      console.log("Se ha producido un error al obtener la fecha de respaldo");
      console.log(err);
    });

  if (backupDate !== undefined) {
    await Backup.update(
      { date: new Date().toLocaleString("sv").replace(" ", "T") + "Z" },
      { where: { id: 1 } }
    )
      .then((data) => {
        console.log("Fecha de respaldo actualizada correctamente!");
        console.log(data, utc);
      })
      .catch((err) => {
        console.log(
          "Se ha producido un error al actualizar la fecha de respaldo"
        );
        console.log(err);
      });
  } else {
    await Backup.create({
      date: new Date().toLocaleString("sv").replace(" ", "T") + "Z",
    })
      .then((data) => {
        console.log("Fecha de respaldo ingresada correctamente!");
        console.log(data, utc);
      })
      .catch((err) => {
        console.log(
          "Se ha producido un error al ingresar la fecha de respaldo"
        );
        console.log(err);
      });
  }
}

function importDB(filePath) {
  var execString = "";
  execString =
    "mysql -u " +
    process.env.VUE_APP_DB_USER +
    ' --password="' +
    process.env.VUE_APP_DB_PASSWORD +
    '" interpino < "' +
    filePath +
    '"';
  exec(execString, function (error) {
    console.log("Importación exitosa");
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
}

module.exports = { exportDB, importDB };
