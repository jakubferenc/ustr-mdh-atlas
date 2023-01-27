// responsive
const gap = 32;
const tablet = 769;
const desktop = 960 + 2 * gap;
const widescreen = 1152 + 2 * gap;
const fullhd = 1344 + 2 * gap;
const mobile = tablet - 1;

const projectName = 'mdh-prochazka-dev';

export default {
  name: projectName,
  globalTitle: 'Atlas Muzea dělnického hnutí v 21. století',
  filePath: '',
  publicFileURL: '',
  obsah: {
    about: {
      projectText: '',
      sectionTitle:
        'Na jednotlivých interaktivních mapách najdete objekty, které lze třídit pomocí typu a kategorie. Můžete si zobrazit všechny objekty najednou, nebo si vytřídit ty, které chcete. Mapy dále pro uživatele nabízí tři způsoby pohledu na data. Lze si zobrazit pouze objekty, pouze mapu, anebo vše dohromady.',
      aboutText:
        'Atlas vznikl v rámci projektu Ministerstva kultury ČR NAKI II (DG18P02OVV045) – Muzeum dělnického hnutí v&nbsp;21. století. Prezentace práce s&nbsp;muzejní sbírkou doby státního socialismu a&nbsp;způsoby užití jejího materiálu k&nbsp;potřebám odborné a široké veřejnosti.',
    },
  },
  separatorForDynamicSlideId: '_d_',
  firebaseConfig: {
    apiConfig: {
      apiKey: 'AIzaSyBVzZg_eTlvpovD_U6MIWT6ZLtHK0zf3ys',
      authDomain: `${projectName}.firebaseapp.com`,
      projectId: projectName,
      storageBucket: `${projectName}.appspot.com`,
      messagingSenderId: '819752448865',
      appId: '1:819752448865:web:86d7f2702e4e9e27f58b20',
      measurementId: 'G-K5JH5PL8BH',
    },
    collectionId: `objects`,
    collectionUsersId: 'users',
  },
  imageSizes: {
    full: 1920,
    thumb: 1920 / 4,
  },
  seo: {
    cookiePolicyNamespace: '',
    google: {
      tagManagerID: '',
    },
    themeColor: '',
  },
  baseURL: {
    production: '',
    development: '',
  },
  responsive: {
    breakpoints: {
      mobile,
      tablet,
      desktop,
      widescreen,
      fullhd,
    },
  },
};
