import { StatusCode } from "../helpers/httpcode";

module.exports = {
  async success(code = null, message = null, success = null) {
    return {
      statusCode: code,
      body: {
        success: success || true,
        message: message || "SUCCESS",
      },
    };
  },
  async error(code = null, message = null, success = null) {
    return {
      statusCode: code,
      body: {
        success: success || false,
        message: message || "ERROR",
      },
    };
  },
  async successData(code = null, data = null, message = null, success = null) {
    return {
      statusCode: code || StatusCode.ok,
      body: {
        success: success || true,
        message: message || "SUCCESS",
        data: data || [],
      },
    };
  },

  async successPaginationData(code = null, data = null, success = null, nextPage = null) {
    return {
      statusCode: (code) || httpStatusCode.ok,
      body: JSON.stringify({
        success: success || true,
        nextPage,
        data: data || [],
      }),
    };
  },

  /**
   * Return the success pagination data
   * @param {*} code
   * @param {*} data
   * @param {*} success
   * @param {*} message
   * @returns
   */
  async successPaginationDataMessage(code = null, data = null, success = null, message = null, nextPage = null) {
    return {
      statusCode: (code) || httpStatusCode.ok,
      body: {
        success: success || true,
        message: message || 'SUCCESS',
        nextPage,
        data: data || [],
      },
    };
  },

};
