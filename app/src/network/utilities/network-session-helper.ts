import logOut from '../services/core/logout/logout.service';

const logoutProcess = async () => {
  try {
    await logOut();
  } catch (e) {}
};

export { logoutProcess };
