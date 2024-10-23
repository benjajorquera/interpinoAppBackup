const templateIC = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interconsultas Incompletas</title>

    <style>
        /* http://meyerweb.com/eric/tools/css/reset/ 
            v2.0 | 20110126
            License: none (public domain)
        */

        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    </style>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            box-sizing: border-box;
            background-color: #fafafa;
        }
        .container {    
            width: 98%;
            margin: 1rem auto;
            box-sizing: border-box;
        }
        .logos {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        .logos img {
            width: 8rem;
        }
        .header {
            width: 100%;
            text-align: center;
            padding: .5rem 1rem;
            box-sizing: border-box;
        }
        .header h1 {
            color: #494949;
            direction: ltr;
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
            font-size: 38px;
            font-weight: 700;
            letter-spacing: normal;
            line-height: 120%;
            text-align: center;
        }
        .subject {
            color: #101112;
            direction: ltr;
            font-family: Roboto, sans-serif !important;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 120%;
            text-align: left;
            width: 100%;
            margin: 1rem 0;
            overflow: scroll;
            color: rgba(0,0,0,.87);
            border-width: thin;
            display: block;
            max-width: 100%;
            overflow-wrap: break-word;
            position: relative;
            white-space: normal;
            padding: 16px;
            box-sizing: border-box;
        }
        .subject p {
            margin-bottom: 1rem;
        }
        .data {
            width: 100%;
            margin: 1rem 0;
            overflow: scroll;
            border-radius: 4px;
            background-color: #fff;
            color: rgba(0,0,0,.87);
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12) !important;
            border-width: thin;
            display: block;
            max-width: 100%;
            outline: none;
            text-decoration: none;
            transition-property: box-shadow,opacity;
            overflow-wrap: break-word;
            position: relative;
            white-space: normal;
            padding: 16px 0;
            box-sizing: border-box;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            overflow-x: hidden;
            margin: 2rem 0;
        }
        th, td {
            text-align: left;
            padding: 8px;
            min-width: 10rem;
        }
        th {
            font-size: 14px;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        strong {
            font-weight: bold;
        }
        .data-header {
            width: 100%;
            margin: 1rem 0;
            padding: 16px;
            text-align: center;
            box-sizing: border-box;
        }
        .data-header h2 {
            color: #494949;
            direction: ltr;
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
            font-size: 38px;
            font-weight: 700;
            letter-spacing: normal;
            line-height: 120%;
            text-align: center;
        }
        .data-header p {
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 2px;
            line-height: 120%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logos">
            <div class="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/ElPinologo.jpg" alt="Hospital El Pino">
            </div>
            <div class="right">
                <img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/878462_862637/aa.png" alt="Unidad de Gestión de Pacientes">
            </div>
        </div>
        <div class="header">
            <h1>Interconsultas</h1>
        </div>

        <div class="subject">
            <p>Estimado/a:</p>
            <p>Deseándole una buena jornada, le adjuntamos las interconsultas agendadas correspondientes a su especialidad.</p>
            <p>Al ejecutar una interconsulta por favor recuerde indicarlo en el sistema para no volver a enviarle una interconsulta ya finalizada,</p>
            <p>Saludos cordiales,</p>
            <p>Secretaria/o Unidad de Gestión de Pacientes</p>
        </div>

        <div class="data">
            <div class="data-header">
                <h2>Pendientes</h2>
                <p>del día de hoy</p>
            </div>
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre Paciente</th>
                        <th scope="col">Rut</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Diagnóstico</th>
                        <th scope="col">Unidad/Servicio Origen Interconsulta</th>
                        <th scope="col">Sala</th>
                        <th scope="col">Cama</th>
                        <th scope="col">Descripción Interconsulta</th>
                        <th scope="col">Profesional Solicitante</th>
                        <th scope="col">Profesional que Evalúa</th>
                        <th scope="col">Estado de la Orden</th>
                        <th scope="col">Fecha Solicitud</th>
                        <th scope="col">Hora Solicitud</th>
                        <th scope="col">Fecha Ejecución</th>
                        <th scope="col">Hora Ejecución</th>
                        <th scope="col">Tiempo de Espera</th>
                        <th scope="col">Razón Cambio Estado</th>
                        <th scope="col">Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each interconsultas}}
                    <tr>
                        <td> {{[Nombre Paciente]}} </td>
                        <td> {{[RUN]}} </td>
                        <td> {{[Edad]}} </td>
                        <td> {{[Sexo]}} </td>
                        <td> {{[Diagnóstico]}} </td>
                        <td> {{[Unidad/Servicio Origen Interconsulta]}} </td>
                        <td> {{[Sala]}} </td>
                        <td> {{[Cama]}} </td>
                        <td> {{[Descripción Interconsulta]}} </td>
                        <td> {{[Profesional Solicitante]}} </td>
                        <td> {{[Profesional que Evalúa]}} </td>
                        <td> {{[Estado de la Orden]}} </td>
                        <td> {{[Fecha Solicitud]}} </td>
                        <td> {{[Hora Solicitud]}} </td>
                        <td> {{[Fecha Ejecución]}} </td>
                        <td> {{[Hora Ejecución]}} </td>
                        <td> {{[Tiempo de Espera]}} </td>
                        <td> {{[Razón Cambio Estado]}} </td>
                        <td> {{[Observaciones]}} </td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>

    </div>
</body>
</html>
`;

const templateSO = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interconsultas Incompletas</title>

    <style>
        /* http://meyerweb.com/eric/tools/css/reset/ 
            v2.0 | 20110126
            License: none (public domain)
        */

        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    </style>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            box-sizing: border-box;
            background-color: #fafafa;
        }
        .container {    
            width: 98%;
            margin: 1rem auto;
            box-sizing: border-box;
        }
        .logos {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        .logos img {
            width: 8rem;
        }
        .header {
            width: 100%;
            text-align: center;
            padding: .5rem 1rem;
            box-sizing: border-box;
        }
        .header h1 {
            color: #494949;
            direction: ltr;
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
            font-size: 38px;
            font-weight: 700;
            letter-spacing: normal;
            line-height: 120%;
            text-align: center;
        }
        .subject {
            color: #101112;
            direction: ltr;
            font-family: Roboto, sans-serif !important;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 120%;
            text-align: left;
            width: 100%;
            margin: 1rem 0;
            overflow: scroll;
            color: rgba(0,0,0,.87);
            border-width: thin;
            display: block;
            max-width: 100%;
            overflow-wrap: break-word;
            position: relative;
            white-space: normal;
            padding: 16px;
            box-sizing: border-box;
        }
        .subject p {
            margin-bottom: 1rem;
        }
        .data {
            width: 100%;
            margin: 1rem 0;
            overflow: scroll;
            border-radius: 4px;
            background-color: #fff;
            color: rgba(0,0,0,.87);
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12) !important;
            border-width: thin;
            display: block;
            max-width: 100%;
            outline: none;
            text-decoration: none;
            transition-property: box-shadow,opacity;
            overflow-wrap: break-word;
            position: relative;
            white-space: normal;
            padding: 16px 0;
            box-sizing: border-box;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            overflow-x: hidden;
            margin: 2rem 0;
        }
        th, td {
            text-align: left;
            padding: 8px;
            min-width: 10rem;
        }
        th {
            font-size: 14px;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        strong {
            font-weight: bold;
        }
        .data-header {
            width: 100%;
            margin: 1rem 0;
            padding: 16px;
            text-align: center;
            box-sizing: border-box;
        }
        .data-header h2 {
            color: #494949;
            direction: ltr;
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
            font-size: 38px;
            font-weight: 700;
            letter-spacing: normal;
            line-height: 120%;
            text-align: center;
        }
        .data-header p {
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 2px;
            line-height: 120%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logos">
            <div class="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/ElPinologo.jpg" alt="Hospital El Pino">
            </div>
            <div class="right">
                <img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/878462_862637/aa.png" alt="Unidad de Gestión de Pacientes">
            </div>
        </div>
        <div class="header">
            <h1>Interconsultas Incompletas</h1>
        </div>

        <div class="subject">
            <p>Estimado/a:</p>
            <p>
                Deseándole una buena jornada, le adjuntamos las interconsultas que usted solicitó a través del sistema debido a que su campo de <strong>"Observaciones"</strong> o <strong>"Diagnóstico"</strong> está incompleto, le solicitamos que por favor lo complete para poder agendar la interconsulta.
            </p>
            <p>Gracias de antemano,</p>
            <p>Saludos cordiales,</p>
            <p>Secretaria/o Unidad de Gestión de Pacientes</p>
        </div>

        <div class="data">
            <div class="data-header">
                <h2>Pendientes</h2>
                <p>del día de hoy</p>
            </div>
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre Paciente</th>
                        <th scope="col">Rut</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Diagnóstico</th>
                        <th scope="col">Unidad/Servicio Origen Interconsulta</th>
                        <th scope="col">Sala</th>
                        <th scope="col">Cama</th>
                        <th scope="col">Descripción Interconsulta</th>
                        <th scope="col">Profesional Solicitante</th>
                        <th scope="col">Profesional que Evalúa</th>
                        <th scope="col">Estado de la Orden</th>
                        <th scope="col">Fecha Solicitud</th>
                        <th scope="col">Hora Solicitud</th>
                        <th scope="col">Fecha Ejecución</th>
                        <th scope="col">Hora Ejecución</th>
                        <th scope="col">Tiempo de Espera</th>
                        <th scope="col">Razón Cambio Estado</th>
                        <th scope="col">Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each interconsultas}}
                    <tr>
                        <td> {{[Nombre Paciente]}} </td>
                        <td> {{[RUN]}} </td>
                        <td> {{[Edad]}} </td>
                        <td> {{[Sexo]}} </td>
                        <td> {{[Diagnóstico]}} </td>
                        <td> {{[Unidad/Servicio Origen Interconsulta]}} </td>
                        <td> {{[Sala]}} </td>
                        <td> {{[Cama]}} </td>
                        <td> {{[Descripción Interconsulta]}} </td>
                        <td> {{[Profesional Solicitante]}} </td>
                        <td> {{[Profesional que Evalúa]}} </td>
                        <td> {{[Estado de la Orden]}} </td>
                        <td> {{[Fecha Solicitud]}} </td>
                        <td> {{[Hora Solicitud]}} </td>
                        <td> {{[Fecha Ejecución]}} </td>
                        <td> {{[Hora Ejecución]}} </td>
                        <td> {{[Tiempo de Espera]}} </td>
                        <td> {{[Razón Cambio Estado]}} </td>
                        <td> {{[Observaciones]}} </td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>

    </div>
</body>
</html>
`;

module.exports = { templateIC, templateSO };