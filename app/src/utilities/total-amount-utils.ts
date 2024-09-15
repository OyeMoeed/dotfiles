const getTotalAmount = (formInstances: any[]) =>
  // eslint-disable-next-line no-useless-escape
  formInstances.reduce((total, contact) => total + parseFloat(contact?.amount?.replace(/\,/g, '') || 0), 0);

export default getTotalAmount;
