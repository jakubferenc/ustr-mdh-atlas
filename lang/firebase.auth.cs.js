
const cs = ['cs', {
  "createUserWithEmailAndPassword failed: First argument \"email\" must be a valid string.": {
    code: 'auth/argument-error',
    translations: {
      cs: 'První pole Email musí být validní hodnota.',
    }
  },
  "createUserWithEmailAndPassword failed: Second argument \"password\" must be a valid string.": {
    code: 'auth/argument-error',
    translations: {
      cs: 'Druhé pole Heslo musí být validní hodnota.',
    }
  },

  "Password should be at least 6 characters": {
    code: 'auth/weak-password',
    translations: {
      cs: 'heslo musí mít aspoň 6 znaků.',
    }
  },

 }]

export default cs;
