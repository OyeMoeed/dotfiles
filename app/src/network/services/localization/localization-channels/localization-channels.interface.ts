type CallbackProps = (error: any, data: any) => void;

interface LocalizationChannelsProps {
  url: string;
  language: string;
  callback: CallbackProps;
  namespace?: string;
}

export { LocalizationChannelsProps, CallbackProps };
