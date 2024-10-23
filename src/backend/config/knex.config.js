import knex from 'knex';

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite3'
    },
    useNullAsDefault: true
});

export default connectedKnex;