export default {
  info: function (message: string) {
    console.log(`NODE-AUTH-WARDEN: ${message}`);
  },

  error: function (message: string, error?: unknown) {
    if (error) {
      console.error(`NODE-AUTH-WARDEN: ${error}`);
    }
    throw new Error(message);
  },
};
