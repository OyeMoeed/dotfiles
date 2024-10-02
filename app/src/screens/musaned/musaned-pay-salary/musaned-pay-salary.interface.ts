enum SalaryCategories {
  Monthly_Salary = 'monthlySalary',
  Advanced_Salary = 'advancedSalary',
  Bonus_Salary = 'bonusSalary',

  TRX_JUSTIFICATION_Type_Monthly_Salary = 'MONTHLY_SALARY',
  TRX_JUSTIFICATION_Type_Advanced_Salary = 'ADVANCE_SALARY',
  TRX_JUSTIFICATION_Type_Bonus_Salary = 'BONUS_SALARY',
}

enum DeductionReasons {
  Rent = 'rent',
  Loan = 'Loan',
  Other = 'Other',
}

interface MusanedPaySalaryScreenProps {}

export { SalaryCategories, MusanedPaySalaryScreenProps, DeductionReasons };
