interface IPayContactsPermissionInterface {
  onPermissionGranted: () => void;
}

interface IPayContactsPermissionRefType {
  checkPermission: () => void;
}

export { IPayContactsPermissionInterface, IPayContactsPermissionRefType };
