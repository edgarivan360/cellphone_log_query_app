/**
 * @author Edgar Quiroz
 * @version 1.0.0
 * @since 03/03/21
 * 
 * DTO para almacenar/mostrar datos de la bitácora de mongodb (cellphone_log).
 * 
 **/

/**
 * Objeto para exportar propiedades.
 */
const CellphoneLogDTO = {};

/**
 * Clase para almacenar/mostrar la información general de la bitácora.
 */
class CellphoneLog {
    logType;
    operationId;
    operationDate;
    operationTime;
    branch;
    userId;
    coreEnvironment;
    genericData;
    deviceId;
    uuid;
    httpStatus;
    errorCode;
    namespace;
    api;
    transaction;
    appVersion;
    deviceInformation;
}

/**
 * Clase para almacenar/mostrar el objeto de transacciones dentro de la bitácora, en caso de existir.
 */
class Transaction {
    serviceType;
    sourceAccount;
    targetAccount;
    amountOperation;
    reference;
    invoiceBranch;
    generics;
};

/**
 * Clase para almacenar/mostrar el objeto de información de dispositivo dentro de la bitácora, en caso de existir.
 */
class DeviceInformation {
    brand;
    model;
    operationSystem;
    osVersion;
    serviceProviders;
};

/**
 * Exportación de propiedades del módulo.
 */
CellphoneLogDTO.CellphoneLog = CellphoneLog;
CellphoneLogDTO.Transaction = Transaction;
CellphoneLogDTO.DeviceInformation = DeviceInformation;

module.exports = CellphoneLogDTO;