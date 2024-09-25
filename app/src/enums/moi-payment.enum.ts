/**
 * Defines all possible MOI payment types.
 */
enum MoiPaymentType {
  SERVICE_PROVIDER = 'provider',
  SERVICE_TYPE = 'service',
  MY_ID_CHECK = 'check',
  MY_ID = 'id',
  BENEFICIARY_ID = 'beneficiary',
  ID_TYPE = 'type',
  DURATION = 'duration',
}

enum MoiPaymentFormFields {
  SERVICE_PROVIDER = 'serviceProvider',
  SERVICE_TYPE = 'serviceType',
}

export { MoiPaymentFormFields, MoiPaymentType };
