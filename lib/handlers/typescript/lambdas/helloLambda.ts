export const handler = async (event: any): Promise<any> => {
  const responseBody = {
    message: "Hello from Lambda!",
  };

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,GET", // Allow OPTIONS and GET methods
    },
    body: JSON.stringify(responseBody),
  };

  return response;
};
