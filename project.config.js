// responsive
const gap = 32
const tablet = 769
const desktop = 960 + 2 * gap
const widescreen = 1152 + 2 * gap
const fullhd = 1344 + 2 * gap
const mobile = tablet - 1

const projectName = 'mdh-prochazka-muzeum';

export default {
  name: projectName,
  filePath: '',
  publicFileURL: '',
  firebaseConfig: {

    apiConfig: {

      apiKey: "AIzaSyC9wQhBwV77tGn4Dt74dvvbIJvj-JMXPQQ",
      authDomain: "mdh-prochazky-all.firebaseapp.com",
      projectId: "mdh-prochazky-all",
      storageBucket: "mdh-prochazky-all.appspot.com",
      messagingSenderId: "206112705764",
      appId: "1:206112705764:web:ce9c819d0d796b402630f1",
      measurementId: "${config.measurementId}"

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
