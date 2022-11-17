import cs from '@/lang/firebase.auth.cs';

export const translateAuth = (errorObject, language) => {

  const translationsObject = {};
  translationsObject[cs[0]] = { ...cs[1] };
  return translationsObject[language][errorObject.message].translations[language];


};
