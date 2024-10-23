import knex from '../config/knex.config';

function index() {
    return knex('frutas').select('*');
}

function create(fruta) {
    return knex('frutas').insert(fruta);
}

function show(id) {
    return knex('frutas').where('id', id).first();
}

function update(id, fruta) {
    return knex('frutas').where('id', id).update(fruta);
}

function destroy(id) {
    return knex('frutas').where('id', id).del();
}

export default { index, create, show, update, destroy };