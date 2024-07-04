const calculateProgress = (remainingAmount: number, totalLimit: number): string => {
    if (totalLimit === 0) {
        return '0%'; // Avoid division by zero and return 0%
    }
    const percentage: number = (remainingAmount / totalLimit) * 100;
    return `${percentage.toFixed(2)}%`; // Format the percentage with two decimal places and add the percentage sign
};

export default calculateProgress
