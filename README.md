# InterPino

InterPino is a local desktop application designed for the Patient Management Unit at [El Pino Hospital](https://hospitalelpino.gob.cl/wphep/). It automates the process of sending interconsultations from service emails to specialty emails stored in a database, considering factors such as patient service origin, age, and attention status (open or closed).

## Features

- **User Authentication:** Access the system using secure credentials.
- **Interconsultation Automation:** Automatically send interconsultations based on predefined criteria.
- **Date Tracking:** Record request, scheduling, and execution dates to determine response times.
- **Alerts:** Notify users about interconsultations not executed within 48 hours.
- **Manage Services and Specialties:** Add or remove services and specialties as needed.
- **Excel Import:** Load interconsultation data from `.xlsx` files for specified time periods.

## Interconsultation Groups

1. **Approved Interconsultations:** Require a filled "Observations" field and are stored in the application's database.
2. **Rejected Interconsultations:** Have an empty "Observations" field, prompting notifications to the originating services for necessary corrections within the TrakCare system.

Interconsultations marked as "closed" or "executed" in TrakCare are excluded from sending. Those directed to specialties without an associated email will be sent to the Patient Management Unit's supervisors, with email addresses customizable within the app.

## Reporting

Generate detailed reports in `.xlsx` format, including all interconsultations within a selected date range and chosen specialties. Reports provide complete information on each interconsultation, including the number of days since execution.

## Installation

Please review the handbook in the docs folder for the correct functioning of the app.

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run electron:serve
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
