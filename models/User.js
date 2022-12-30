import Model from './Model';

export default class User extends Model {
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

  constructor(newUser = {}) {
    super();
    this.validate(this.#schema, newUser);
  }
}
