'use strict';
let internals = {};
/**
 * @apiIgnore Entry Point
 * @api {get} / Punto de entrada
 * @apiSuccess
 */
internals.getAll = (request, reply) => {
    reply.view('index', { title: 'My home page' });
};

internals.getByName = (request, reply) => {
    var name = encodeURIComponent(request.params.name);
    var insulto = request.params.insulto ? encodeURIComponent(request.params.insulto) : '!';
    reply.view('index', { title: name + insulto });
};

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: internals.getAll
    },
    {
        method: 'GET',
        path: '/a/{name}/{insulto?}',
        handler: internals.getByName
    }];