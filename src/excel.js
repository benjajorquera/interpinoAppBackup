const XLSX = require('xlsx');
import * as fs from 'fs';

XLSX.set_fs(fs);

const leerEXcel = (ruta) => {
    const workbook = XLSX.readFile(ruta);
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    return data;
}

export default leerEXcel;