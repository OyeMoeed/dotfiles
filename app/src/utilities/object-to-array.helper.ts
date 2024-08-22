/*
 *  To convert an object to an array, so that it can be used to plot data throught flatlist or map
 */
const getArryFromObject = (object: object) => Object.entries(object).map(([key, value]) => ({ key, value }));
export default getArryFromObject;
