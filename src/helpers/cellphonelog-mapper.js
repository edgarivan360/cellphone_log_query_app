/**
 * @author Edgar Quiroz
 * @version 1.0.0
 * @since 03/03/21
 * 
 * Mapper para la bitácora de mongodb (cellphone_log).
 * 
 **/
const helper = require('./helper');
const cellphoneLogDTO = require('../dto/CellphoneLogDTO');

/**
 * Objeto para exportar propiedades.
 */
const CellphoneLogMapper = {};

/**
 * Función para convertir una lista de objetos Schema de mongodb a una lista de DTOs CellphoneLog.
 * @param {Array[CellphoneLogSchema]} cellphoneLogSchemaList Lista de objetos Schema de mongodb.
 * @returns {Array[CellphoneLog]} Lista de DTOs con la data del schema de mongodb.
 */
function toDtoList(cellphoneLogSchemaList) {
    return cellphoneLogSchemaList.map(cellphoneLogSchema => toDto(cellphoneLogSchema));
}

/**
 * Función para convertir un objeto Schema de mongodb a un DTO CellphoneLog.
 * @param {CellphoneLogSchema} cellphoneLogSchema Objeto Schema de mongodb.
 * @returns {CellphoneLog} DTO con la data del schema de mongodb.
 */
function toDto(cellphoneLogSchema) {
    const cellphoneLog = new cellphoneLogDTO.CellphoneLog();
    cellphoneLog.logType = cellphoneLogSchema.logType;
    cellphoneLog.operationId = cellphoneLogSchema.operationId;
    cellphoneLog.operationDate = helper.formatDate(cellphoneLogSchema.operationDate);
    cellphoneLog.operationTime = helper.formatTime(cellphoneLogSchema.operationTime);
    cellphoneLog.branch = cellphoneLogSchema.branch;
    cellphoneLog.userId = cellphoneLogSchema.userId;
    cellphoneLog.coreEnvironment = cellphoneLogSchema.coreEnvironment;
    cellphoneLog.genericData = cellphoneLogSchema.genericData;
    cellphoneLog.deviceId = cellphoneLogSchema.deviceId;
    cellphoneLog.uuid = cellphoneLogSchema.uuid;
    cellphoneLog.httpStatus = cellphoneLogSchema.httpStatus;
    cellphoneLog.errorCode = cellphoneLogSchema.errorCode;
    cellphoneLog.namespace = cellphoneLogSchema.namespace;
    cellphoneLog.api = cellphoneLogSchema.api;
    cellphoneLog.appVersion = cellphoneLogSchema.appVersion;

    if (cellphoneLogSchema.transaction) {
        cellphoneLog.transaction = toDtoTransaction(cellphoneLogSchema);
    }
    if (cellphoneLogSchema.deviceInformation) {
        cellphoneLog.deviceInformation = toDtoDeviceInformation(cellphoneLogSchema);
    }

    return cellphoneLog;
}

/**
 * Función para convertir un objeto Schema de mongodb a un DTO Transaction.
 * @param {CellphoneLogSchema} cellphoneLogSchema Objeto Schema de mongodb.
 * @returns {Transaction} DTO con las transacciones del schema de mongodb.
 */
function toDtoTransaction(cellphoneLogSchema) {
    const transaction = new cellphoneLogDTO.Transaction();
    transaction.serviceType = cellphoneLogSchema.transaction.serviceType;
    transaction.sourceAccount = cellphoneLogSchema.transaction.sourceAccount;
    transaction.targetAccount = cellphoneLogSchema.transaction.targetAccount;
    transaction.amountOperation = cellphoneLogSchema.transaction.amountOperation;
    transaction.reference = cellphoneLogSchema.transaction.reference;
    transaction.invoiceBranch = cellphoneLogSchema.transaction.invoiceBranch;
    transaction.generics = cellphoneLogSchema.transaction.generics;
    return transaction;
}

/**
 * Función para convertir un objeto Schema de mongodb a un DTO DeviceInformation.
 * @param {CellphoneLogSchema} cellphoneLogSchema Objeto Schema de mongodb.
 * @returns {DeviceInformation} DTO con la información de dispositivos del schema de mongodb.
 */
function toDtoDeviceInformation(cellphoneLogSchema) {
    const deviceInformation = new cellphoneLogDTO.DeviceInformation();
    deviceInformation.brand = cellphoneLogSchema.deviceInformation.brand;
    deviceInformation.model = cellphoneLogSchema.deviceInformation.model;
    deviceInformation.operationSystem = cellphoneLogSchema.deviceInformation.operationSystem;
    deviceInformation.osVersion = cellphoneLogSchema.deviceInformation.osVersion;
    deviceInformation.serviceProviders = cellphoneLogSchema.deviceInformation.serviceProviders;
    return deviceInformation;
}

/**
 * Exportación de propiedades del módulo.
 */
CellphoneLogMapper.toDto = toDto;
CellphoneLogMapper.toDtoList = toDtoList;

module.exports = CellphoneLogMapper;