const { RESTDataSource } = require("apollo-datasource-rest");

class ContactAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/";
  }

  async sendFeedback(name, email, msg, subjectId) {
    const response = await this.post(
      "contact",
      JSON.stringify({ email, msg, name, subjectId }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response;
  }
}

module.exports = ContactAPI;
