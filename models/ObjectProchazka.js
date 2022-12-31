import Model from './Model';

export default class ObjectProchazka extends Model {
  #schema = {
    id: {
      default: '',
      validations: ['required'],
    },
    data: {
      default: '',
      validations: ['required'],
    },
    audio: {
      default: [],
    },
    obrazky: {
      default: [],
    },
    prochazka_id: {
      default: '',
      validations: ['required'],
    },
    prochazka_slug: {
      default: '',
      validations: ['required'],
    },
    user_id: {
      default: '',
      validations: ['required'],
    },
    user_email: {
      default: '',
      validations: ['required'],
    },
    timestamp: {
      default: '',
      validations: ['required'],
    },
    misto: {
      default: '',
    },
  };

  constructor(newObject = {}) {
    super();
    this.validate(this.#schema, newObject);
  }
}
