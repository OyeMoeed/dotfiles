interface ServiceData {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
  type?: string;
}
interface ServiceDataProps {
  data: ServiceData;
}

export { ServiceData, ServiceDataProps };
