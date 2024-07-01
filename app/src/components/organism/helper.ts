import moment from 'moment';

const transactionDateFormate = (date: string) => moment(date).format('DD/MM/YYYY - HH:mm');

export { transactionDateFormate };
