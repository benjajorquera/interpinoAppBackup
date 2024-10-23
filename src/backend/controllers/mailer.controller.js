"use strict";
const handlebars = require('handlebars');
const nodemailer = require("nodemailer");
const enqueueController = require("./enqueue.controller");
const templatesEmails = require('../utils');
const db = require("../models");

async function sendMail(data) {
    const EMAIL = await db.email.findByPk(1);
    const results = await enqueueController.groupByICSO(data);
    const enviar = results.listaIC;
    const devolver = results.listaSO;
    const info = [];

    const transporter = nodemailer.createTransport({
        name: 'mail.redsalud.gob.cl',
        host: EMAIL.host,
        port: EMAIL.port,
        requireTLS: true,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL.email, // generated ethereal user
            pass: EMAIL.password, // generated ethereal password
        },
        tls: {
            ciphers: "SSLv3",
            minVersion: 'TLSv1',
            rejectUnauthorized: false,
            // ignoreTLS: false,
            // requireTLS: true,
        }
    });

    console.info("Interconsultas aprobadas")
    for (const [key, value] of Object.entries(enviar)) {

        // check if the list of interconsultas and correos is not empty
        if (value.interconsultas.length > 0 && value.correos.length > 0) {

            // sort by Fecha Solicitud and Hora Solicitud
            value.interconsultas.sort((a, b) => {
                const dateA = new Date(a['Fecha Solicitud'].split("/").reverse().join("/") + " " + a['Hora Solicitud']);
                const dateB = new Date(b['Fecha Solicitud'].split("/").reverse().join("/") + " " + b['Hora Solicitud']);

                return dateA - dateB;
            });

            const emailData = composeEmailSend(value, key);

            try {
                console.log("[*] Sending email to", emailData.subject, "-", new Date());
                let temp = await transporter.sendMail({
                    from: { name: EMAIL.name, address: EMAIL.email },
                    to: emailData.to, // list of receivers
                    subject: emailData.subject, // Subject line
                    text: emailData.text, // plain text body
                    html: emailData.html, // html body
                });
                info.push(temp);
                await sleep(2 * 1000); // 2 seconds
                console.log("[*] Email sent to", emailData.subject, "-", new Date());
            } catch (error) {
                console.error(error);
                console.info(" [X] KEY:", key);
                console.info(" [X] Email data:", emailData);

                // Throw Error
                throw new Error(error);
            }
        }

    };

    console.info("Interconsultas rechazadas")

    for (const [key, value] of Object.entries(devolver)) {

        // check if the list of interconsultas and correos is not empty
        if (value.interconsultas.length > 0 && value.correos.length > 0) {

            // sort by Fecha Solicitud and Hora Solicitud
            value.interconsultas.sort((a, b) => {
                const dateA = new Date(a['Fecha Solicitud'].split("/").reverse().join("/") + " " + a['Hora Solicitud']);
                const dateB = new Date(b['Fecha Solicitud'].split("/").reverse().join("/") + " " + b['Hora Solicitud']);

                return dateA - dateB;
            });

            const emailData = composeEmailReturn(value, key);

            try {
                console.log("[*] Sending email to", emailData.subject, "-", new Date());
                let temp = await transporter.sendMail({
                    from: EMAIL.email, // sender address
                    to: emailData.to, // list of receivers
                    subject: emailData.subject, // Subject line
                    text: emailData.text, // plain text body
                    html: emailData.html, // html body
                });
                info.push(temp);
                await sleep(2 * 1000); // 2 seconds
                console.log("[*] Email sent to", emailData.subject, "-", new Date());
            } catch (error) {
                console.error(error);
                console.info(" [X] KEY:", key);
                console.info(" [X] Email data:", emailData);

                // Throw Error
                throw new Error(error);
            }
        }

    }

    return {
        status: 200,
        message: 'Email sent',
        data: info,
    }
}

function composeEmailSend(data, key) {
    const emailTemplate = handlebars.compile(templatesEmails.templateIC);
    const htmlToSend = emailTemplate({ interconsultas: data.interconsultas });

    const emailData = {
        // from: "interconsultas@hospitalelpino.gob.cl",
        to: data.correos.join(","),
        subject: `Interconsultas aprobadas: ${key}`,
        html: htmlToSend,
        text: JSON.stringify(data.interconsultas),
    };

    return emailData;
}

function composeEmailReturn(data, key) {
    console.log("[+] Data:", data);
    const emailTemplate = handlebars.compile(templatesEmails.templateSO);
    const htmlToSend = emailTemplate({ interconsultas: data.interconsultas });

    const emailData = {
        // from: "interconsultas@hospitalelpino.gob.cl",
        to: data.correos.join(","),
        subject: `Interconsultas rechazadas: ${key}`,
        html: htmlToSend,
        text: JSON.stringify(data.interconsultas),
    };

    return emailData;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getEmail() {
    // get email id 1
    const email = await db.email.findOne({
        where: {
            id: 1
        }
    });

    return email;
}

module.exports = { sendMail };