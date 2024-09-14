/**
 * Defines possible statuses while asking for permissions.
 */
enum PermissionsStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  UNKNOWN = 'unknown',
  BLOCKED = 'blocked',
  LIMITED = 'limited',
  UNAVAILABLE = 'unavailable',
}

export default PermissionsStatus;
