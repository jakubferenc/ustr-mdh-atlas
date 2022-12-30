export default class User {
  #schema = {
    id: {
      default: '',
      validations: ['required'],
    },
    email: {
      default: '',
      validations: ['required'],
    },
    firstname: {
      default: '',
    },
    lastname: {
      default: '',
    },
    role: {
      default: '',
    },
  };

  getDataForApi() {
    return { ...this };
  }

  constructor(newUser = {}) {
    Object.keys(this.#schema).forEach((objectKey) => {
      if (newUser.hasOwnProperty(objectKey)) {
        this[objectKey] = newUser[objectKey];
      } else {
        if (this.#schema[objectKey]?.validations?.includes('required')) {
          throw new Error(`Field ${objectKey} is required for the User`);
        } else {
          this[objectKey] = this.#schema[objectKey].default;
        }
      }
    });
  }
}
