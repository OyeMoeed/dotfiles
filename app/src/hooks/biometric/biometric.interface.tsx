interface BiometricResult {
  publicKey: string;
}
enum BiometryTypes {
  FaceID = 'FaceID',
  TouchID = 'TouchID',
  Biometrics = 'Biometrics',
}
export { BiometricResult, BiometryTypes };
