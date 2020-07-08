const { RESTDataSource } = require("apollo-datasource-rest");

class SubjectAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/";
  }

  async getAllSubjects() {
    const response = await this.get("subjects");

    if (!response || !response.subjects) {
      return [];
    }

    return response.subjects.map((subject) => this.subjectReducer(subject));
  }

  subjectReducer(subject) {
    return {
      ...subject,
      id: subject._id,
    };
  }
}

module.exports = SubjectAPI;
