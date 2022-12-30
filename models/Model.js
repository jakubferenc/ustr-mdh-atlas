export default class Model {
  #schema = {};
  #newObject = {};

  getDataForApi() {
    return { ...this };
  }

  validate(schema, newObject) {
    Object.keys(schema).forEach((objectKey) => {
      if (newObject.hasOwnProperty(objectKey)) {
        this[objectKey] = newObject[objectKey];
      } else {
        if (schema[objectKey]?.validations?.includes('required')) {
          throw new Error(`Field ${objectKey} is required`);
        } else {
          this[objectKey] = schema[objectKey].default;
        }
      }
    });
  }

  constructor() {}
}
