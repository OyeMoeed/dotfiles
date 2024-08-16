// Utility function to mask the first six characters of a string
const hideContactNumber = (input: string): string => `${'XXXXXX'}${input?.slice(6)}`;

export { hideContactNumber };
