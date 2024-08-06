/**
 * Defines all possible MOI payment types.
 */
enum TrafficPaymentType {
  SERVICE_PROVIDER = 'provider',
  SERVICE_TYPE = 'service',
  MY_ID_CHECK = 'check',
  MY_ID = 'id',
  BENEFICIARY_ID = 'beneficiary',
  ID_TYPE = 'type',
  DURATION = 'duration',
  VOILATION_NUMBER = 'voilationNumber',
}

enum TrafficPaymentFormFields {

  MY_ID_CHECK = 'myIdCheck',
  MY_ID = 'myId',
  ID_TYPE = 'idType',
  VOILATION_NUMBER = 'voilationNumber',
}

export { TrafficPaymentFormFields, TrafficPaymentType };
