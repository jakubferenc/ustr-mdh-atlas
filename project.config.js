// responsive
const gap = 32
const tablet = 769
const desktop = 960 + 2 * gap
const widescreen = 1152 + 2 * gap
const fullhd = 1344 + 2 * gap
const mobile = tablet - 1

const projectName = 'mdh-prochazka-dev';

export default {
  name: projectName,
  filePath: '',
  publicFileURL: '',
  firebaseConfig: {

    apiConfig: {

      apiKey: "AIzaSyBVzZg_eTlvpovD_U6MIWT6ZLtHK0zf3ys",
      authDomain: "mdh-prochazka-dev.firebaseapp.com",
      projectId: "mdh-prochazka-dev",
      storageBucket: "mdh-prochazka-dev.appspot.com",
      messagingSenderId: "819752448865",
      appId: "1:819752448865:web:86d7f2702e4e9e27f58b20",
      measurementId: "G-K5JH5PL8BH"

    },
    collectionID: `objekty-${projectName}`,

  },
  imageSizes: {
    full: 1920,
    thumb: 1920/4,
  },
  seo: {
    cookiePolicyNamespace: '',
    google: {
      tagManagerID: ''
    },
    themeColor: ''
  },
  baseURL: {
    production: '',
    development: ''
  },
  responsive: {
    breakpoints: {
      mobile,
      tablet,
      desktop,
      widescreen,
      fullhd
    }
  }

}
