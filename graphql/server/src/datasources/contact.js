const { RESTDataSource } = require("apollo-datasource-rest");

class ContactAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/";
  }

  async sendFeedback(name, email, msg, subjectId) {
    console.log("sendfeedback");
    // const payload = JSON.stringify({ email, msg, name, subjectId: subjectId });
    // console.log(payload)
    // const response = await this.post("contact", payload, {
    //   data: payload,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    // });

    return {
      success: true,
    };
  }
}

module.exports = ContactAPI;
