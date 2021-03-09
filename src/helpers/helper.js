/**
 * @author Edgar Quiroz
 * @version 1.0.0
 * @since 02/03/21
 * 
 * Mapper para la bitácora de mongodb (cellphone_log).
 * 
 **/
const dateformat = require('dateformat');

/**
 * Objeto para exportar propiedades.
 */
const Helper = {};

/**
 * Función para formatear tiempo a formato HH:MM:SS (AM|PM).
 * @param {Date} date Fecha a formatear.
 * @returns {String} Fecha formateada.
 */
function formatTime(date) {
    return dateformat(date, 'hh:MM:ss TT');
}

/**
 * Función para formatear fecha a formato DD-MM_YYYY.
 * @param {Date} date Fecha a formatear.
 * @returns {String} Fecha formateada.
 */
function formatDate(date) {
    return dateformat(date, 'dd-mm-yyyy');
}

/**
 * Función para convertir objeto a una cadena JSON en caso de ser posible.
 * @param {Object} text Objeto a convertir.
 * @returns {String} Objeto convertido a cadena JSON.
 */
function textToJson(text) {
    return JSON.stringify(text);
}

/**
 * Función para definir el número de páginas a mostrar menores a la página en la cual se esté posicionado
 * ej. página 15 --> se muestran (12, 13, 14, 15).
 * @param {Number} page Página actual.
 * @returns {Array[Number]} Lista con las páginas menores a la página actual y la página actual.
 */
function getPageLeftBorder(page) {
    let actualPage = page;
    let i = 1;
    const leftBorder = [];
    leftBorder.push(page);
    while ((actualPage - 1) > 0 && i <= 3) {
        leftBorder.push(actualPage - 1);
        actualPage--;
        i++;
    }
    return leftBorder.reverse();
}

/**
 * Función para definir el número de páginas a mostrar mayores a la página en la cual se esté posicionado
 * ej. página 15 --> se muestran (16, 17, 18).
 * @param {Number} page Página actual.
 * @returns {Array[Number]} Lista con las páginas menores a la página actual.
 */
function getPageRightBorder(page, totalPages) {
    let actualPage = page;
    let i = 1;
    const rightBorder = [];
    while ((actualPage + 1) <= totalPages && i <= 3) {
        rightBorder.push(actualPage + 1);
        actualPage++;
        i++;
    }
    return rightBorder;
}

/**
 * Función para almacenar en variables constantes los parámetros de búsqueda de la bitácora
 * enviados a través del método GET (request query parameters).
 * @param {Request} req Petición de la llamada del método GET.
 * @returns {Object} Objeto JSON con los parámetros del método GET.
 */
function getRequestQueryParams(req) {
    const operationDateTimeIni = req.query.operationDateTimeIni;
    const operationDateTimeEnd = req.query.operationDateTimeEnd;
    const logType = req.query.logType;
    const operationId = req.query.operationId;
    const userId = req.query.userId;
    const uuid = req.query.uuid;
    const api = req.query.api;
    return { operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api };
}

/**
 * Función para almacenar en variables constantes los campos del body de la bitácora
 * enviados a través del método POST (request body).
 * @param {Request} req Petición de la llamada del método POST.
 * @returns {Object} Objeto JSON con los parámetros del método POST.
 */
function getRequestBodyParams(req) {
    const operationDateTimeIni = req.body.operationDateTimeIni;
    const operationDateTimeEnd = req.body.operationDateTimeEnd;
    const logType = req.body.logType;
    const operationId = req.body.operationId;
    const userId = req.body.userId;
    const uuid = req.body.uuid;
    const api = req.body.api;
    return { operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api };
}

/**
 * Función construir la lista de filtros de búsqueda para las consultas de mongodb de la bitácora.
 * @param {Date} operationDateTimeIni Fecha de operación inicial.
 * @param {Date} operationDateTimeEnd Fecha de operación final.
 * @param {String} logType Tipo de log (operacional o transaccional).
 * @param {String} operationId ID de operación.
 * @param {String} userId ID de usuario.
 * @param {String} uuid uuid registrado.
 * @param {String} api API registrada.
 * @returns {Array[FilterQuery]} Lista de filtros de búsqueda de mongodb.
 */
function getMongoQueryFilter(operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api) {
    const mongoQueryFilter = {};
    
    if (!operationDateTimeIni || !operationDateTimeEnd) {
        return mongoQueryFilter;
    }

    mongoQueryFilter['operationTime'] = {
        $gte: new Date(operationDateTimeIni),
        $lte: new Date(operationDateTimeEnd)
    };

    if (logType) {
        mongoQueryFilter['logType'] = logType;
    }
    if (operationId) {
        mongoQueryFilter['operationId'] = operationId;
    }
    if (userId) {
        mongoQueryFilter['userId'] = userId;
    }
    if (uuid) {
        mongoQueryFilter['uuid'] = uuid;
    }
    if (api) {
        mongoQueryFilter['api'] = api;
    }
    return mongoQueryFilter;
}

/**
 * Exportación de propiedades del módulo.
 */
Helper.formatTime = formatTime;
Helper.formatDate = formatDate;
Helper.getRequestQueryParams = getRequestQueryParams;
Helper.getRequestBodyParams = getRequestBodyParams;
Helper.getMongoQueryFilter = getMongoQueryFilter;
Helper.textToJson = textToJson;
Helper.getPageLeftBorder = getPageLeftBorder;
Helper.getPageRightBorder = getPageRightBorder;

module.exports = Helper;