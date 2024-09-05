import { clearSession } from '../services/core/logout/logout.service';

const logoutProcess = async () => {
  try {
    await clearSession();
  } catch (e) {}
};

export { logoutProcess };
