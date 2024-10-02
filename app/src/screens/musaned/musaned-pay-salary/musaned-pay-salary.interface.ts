enum SalaryCategories {
  Monthly_Salary = 'monthlySalary',
  Bonus_Salary = 'bonusSalary',
  Advanced_Salary = 'advancedSalary',
  Deducted_Salary = 'deductedSalary',

  TRX_JUSTIFICATION_Type_Monthly_Salary = 'MONTHLY_SALARY',
  TRX_JUSTIFICATION_Type_Bonus_Salary = 'BONUS_SALARY',
  TRX_JUSTIFICATION_Type_Advanced_Salary = 'ADVANCE_SALARY',
  TRX_JUSTIFICATION_Type_Deducted_Salary = 'DEDUCTED_SALARY',
}

enum DeductionReasons {
  Rent = 'rent',
  Loan = 'Loan',
  Other = 'Other',
}

interface MusanedPaySalaryScreenProps {}

export { SalaryCategories, MusanedPaySalaryScreenProps, DeductionReasons };
