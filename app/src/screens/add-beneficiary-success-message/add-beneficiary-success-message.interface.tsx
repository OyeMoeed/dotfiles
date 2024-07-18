enum ActivateViewTypes {
  ACTIVATE_OPTIONS = 'ActivateOptions',
  RECEIVE_CALL = 'ReceiveCall',
  CALL_ALINMA = 'CallAlinma',
}

interface ActivateBeneficiaryType {
  CurrentOption: ActivateViewTypes;
}
export { ActivateBeneficiaryType, ActivateViewTypes };
