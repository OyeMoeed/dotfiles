interface ServiceData {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
}
interface ServiceDataProps {
  data: ServiceData;
}

export { ServiceData, ServiceDataProps };
