type formatResponseType = {
  data?: any;
  message?: string;
  success?: boolean;
  stack?: any;
};

export const formatResponse = ({
  data,
  message,
  success,
  stack,
}: formatResponseType) => {
  return {
    data,
    message,
    success,
    stack,
  };
};
