const mapovaniUkolu = {
  "q00_01": {
    "title": "Uživatelské jméno",
    "type": "text"
},
  "q01_01": {
      "title": "Jaký typ předmětu jste vybrali? vyberte z následujících možností",
      "type": "array"
  },
  "q01_02": {
    "title": "Popište předmět",
    "type": "text"
  },
  "q01_03": {
    "title": "vyfoťte předmět",
    "type": "image"
  },
};

const typObjektu = {
  settings: {
    autoGenerateId: false,
    slug: 'typ-objektu',
  },

  items: [
    { id: 'kniha', title: 'kniha' },
    { id: 'umelecke-dilo', title: 'umělecké dílo' },
    { id: 'model-pro-ucely-vystavy', title: 'model pro účely výstavy' },
    { id: 'diplom-zdravice', title: 'diplom, zdravice' },
    { id: 'medaile', title: 'medaile' },
    { id: 'plakát', title: 'plakát' },
    { id: 'dobová fotografie', title: 'dobová fotografie' },
    { id: 'předmět denní potřeby', title: 'předmět denní potřeby' },
    { id: 'nástroj', title: 'nástroj' },
    { id: 'nábytek', title: 'nábytek' },
  ],
};




export {
    typObjektu,
    mapovaniUkolu,
};
