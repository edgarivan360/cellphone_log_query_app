/**
 * @author Edgar Quiroz
 * @version 1.0.0
 * @since 26/03/21
 * 
 * Controlador (router) para la manipulación de datos de la bitácora de mongodb (cellphone_log).
 * 
 **/
const express = require('express');
const router = express.Router();
const CsvParser = require('json2csv').Parser;
const helper = require('../helpers/helper');
const cellphoneLogMapper = require('../helpers/cellphonelog-mapper');
const CellphoneLogSchema = require('../models/CellphoneLogSchema');

/**
 * Endpoint GET para recuperar la información de la bitácora.
 */
router.get('/bitacora/retrieve', async (req, res) => {

    
     // Si la petición no define el número de página, se renderea la pantalla de búsqueda en limpio,
     // de lo contrario, se realiza el proceso de búsqueda.
    if (!req.query.page) {
        res.render('bitacora/bitacora-query');
    }
    else {

        // Variables constantes para el número de documentos por página y la página actual.
        const docsPerPage = Number(process.env.DOCS_PER_PAGE);
        const page = Number(req.query.page);

        // Variables constantes para los parámetros de búsqueda provenientes de la petición.
        const { operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api } = 
            helper.getRequestQueryParams(req);
        
        // Filtros de búsqueda construidos a partir de los parámetros de búsqueda provenientes de la petición.
        const mongoQueryFilter = helper.getMongoQueryFilter(
            operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api);

        // Si la lista de filtros es vacía, se envía un error y se pintan de nuevo los filtros ingresados.
        // de lo contrario, se hace la búsqueda en mongodb.
        if (Object.keys(mongoQueryFilter).length === 0) {
            const errors = [];
            errors.push({text: process.env.ERROR_MESSAGE_MANDATORY_DATES});
            // Renderización de la página de búsqueda.
            res.render('bitacora/bitacora-query',
            { errors, operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api });
        }
        else {      
            const cellphoneLogSchemaList = await CellphoneLogSchema.find(mongoQueryFilter).sort({
                operationDate: 'asc',
                operationTime: 'asc'
            })
            .skip((docsPerPage * page) - docsPerPage)
            .limit(docsPerPage)
            .lean();

            const cellphoneLogDTOList = cellphoneLogMapper.toDtoList(cellphoneLogSchemaList);

            const cellphoneLogCount = await CellphoneLogSchema.countDocuments(mongoQueryFilter);
            const totalPages = Math.ceil(cellphoneLogCount / Number(process.env.DOCS_PER_PAGE));
            
            const success = [];
            success.push({text: process.env.SUCCESS_MESSAGE_SEARCH_COMPLETED});
            
            res.render('bitacora/bitacora-query', { 
                cellphoneLogDTOList, success, page, totalPages,
                operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api,
                helpers: {
                    textToJson: function(text) {
                        return helper.textToJson(text);
                    },
                    formatDate: function(date) {
                        return helper.formatDate(date);
                    },
                    formatTime: function(time) {
                        return helper.formatTime(time);
                    },
                    ifEquals: function(val1, val2) {
                        return val1 === val2;
                    },
                    getPageLeftBorder: function(page) {
                        return helper.getPageLeftBorder(page);
                    },
                    getPageRightBorder: function(page, totalPages) {
                        return helper.getPageRightBorder(page, totalPages);
                    }
                }
            });
        }
    }
});

router.post('/bitacora/retrieve', async (req, res) => {
    const { operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api } = 
            helper.getRequestBodyParams(req);
        
    const mongoQueryFilter = helper.getMongoQueryFilter(
        operationDateTimeIni, operationDateTimeEnd, logType, operationId, userId, uuid, api);
    
    const cellphoneLogSchemaList = await CellphoneLogSchema.find(mongoQueryFilter).sort({
        operationDate: 'asc',
        operationTime: 'asc'
    }).lean();

    const cellphoneLogDTOList = cellphoneLogMapper.toDtoList(cellphoneLogSchemaList);

    const csvParser = new CsvParser();
    const csvData = csvParser.parse(cellphoneLogDTOList);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bitacora.csv');

    res.status(200).end(csvData);
});

module.exports = router;