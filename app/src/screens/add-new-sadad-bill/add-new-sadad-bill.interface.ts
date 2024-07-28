interface CompanyProps {
  name: string;
  image: string;
}

export interface SelectedValues {
  service: string;
  company: CompanyProps;
}

export interface FormValues {
  companyName: string;
  serviceType: string;
}
