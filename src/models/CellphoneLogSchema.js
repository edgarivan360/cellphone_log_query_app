/**
 * @author Edgar Quiroz
 * @version 1.0.0
 * @since 26/02/21
 * 
 * Schema para almacenar/manipular datos de la bitácora de mongodb (cellphone_log).
 * 
 **/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Variable constante para almacenar la información de la bitácora desde mongodb.
 */
const CellphoneLogSchema = new Schema({
    type: Object,
    properties: {
        logType: { type: String },
        operationId: { type: String },
        operationDate: { type: Date },
        operationTime: { type: Date },
        branch: { type: String },
        userId: { type: String },
        coreEnvironment: { type: String },
        genericData: { type: String },
        deviceId: { type: String },
        uuid: { type: String },
        httpStatus: { type: String },
        errorCode: { type: String },
        namespace: { type: String },
        api: { type: String },
        transaction: {
            type: Object,
            properties: {
                serviceType: { type: String },
                sourceAccount: { type: String },
                targetAccount: { type: String },
                amountOperation: { type: String },
                generics: {
                    type: Array,
                    properties: {
                        generic: { type: String }
                    }
                },
                reference: { type: String },
                invoiceBranch: { type: String }
            }
        },
        appVersion: { type: String },
        deviceInformation: {
            type: Object,
            properties: {
                brand: { type: String },
                model: { type: String },
                operationSystem: { type: String },
                osVersion: { type: String },
                serviceProviders: {
                    type: Array,
                    properties: {
                        serviceProvider: { type: String }
                    }
                }
            }
        }
    }
});

/**
 * Exportación de propiedades del módulo.
 */
module.exports = mongoose.model('CellphoneLogSchema', CellphoneLogSchema, 'cellphone_log');