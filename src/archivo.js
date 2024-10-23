const os = require('os');
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron')
const { ipcMain } = require('electron')
import leerEXcel from './excel';

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'All Files', extensions: ['*'] },
            { name: 'Excel', extensions: ['xlsx'] },
            { name: 'CSV', extensions: ['csv'] },
        ]
    }).then(result => {
        if (!result.canceled) {
            const ruta = result.filePaths[0];
            const data = leerEXcel(ruta);
            event.sender.send('selected-file', { ruta, data, canceled: false});
        }
        event.sender.send('selected-file', {canceled: true});
    }).catch(err => {
        console.log(err)
    })
});


