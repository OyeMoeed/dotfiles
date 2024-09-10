enum PasscodeTypes {
  ResetPasscode = 'ResetPasscode',
  NewPasscode = 'NewPasscode',
  ConfirmPasscode = 'ConfirmPasscode',
}
interface PasscodeChangeState {
  currentCode: string;
  newCode?: string;
  nextComponent: PasscodeTypes;
}

export { PasscodeChangeState, PasscodeTypes };
