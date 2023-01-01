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

const mapovaniUkolu = {
  q01_01: {
    title: 'Jaký typ předmětu jste vybrali? vyberte z následujících možností',
    type: 'array',
    itemsObj: typObjektu,
    limit: 3,
    inline: false,
  },
  q01_02: {
    title: 'Popište předmět',
    type: 'text',
  },
  q01_03: {
    title: 'vyfoťte předmět',
    type: 'image',
    photoCount: 3,
  },
};

export default {
  id: 'cf46233f-f7c4-4f92-8fc3-784dc5c0877f', // UUID 4
  nazev:
    'Artefakty v muzeu - Digitální aplikace k edukativní práci v muzejní expozici',
  slug: 'muzeum',
  autori: ['Bohumil Melichar'],
  klicovaSlova: [
    'muzeum',
    'muzejní pedagogika',
    'artefakt',
    'object based learning',
  ],
  barva: '#44352c',
  metadata: {},
  popis:
    'Účastníci programu se budou věnovat detailní analýze jednotlivých předmětů muzejní expozice. Funkce chytrého telefonu jim umožní exponáty třídit do jednotlivých kategorií, popisovat kontext jejich vystavování a vše detailně nafotit. Takto vzniklá dokumentace se může stát východiskem pro úvahu nad výstavou, posláním muzea či diskusi o procesu utváření vědomostí o minulosti.',
  metodika: 'procházka po muzeu_metodika.pdf',
  obrazky: {
    thumb: 'thumb.jpg',
    intro: 'intro.jpg',
  },
  mapovaniUkolu,
};
