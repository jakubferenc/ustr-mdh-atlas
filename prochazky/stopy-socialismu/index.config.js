const mista = {
  settings: {
    autoGenerateId: true,
    slug: 'mista',
  },

  items: [
    {
      id: 'misto-01',
      title: 'Pamětní místo spojené s konkrétní historickou událostí',
    },
    {
      id: 'misto-02',
      title: 'Ulice pojmenovaná po významné historické postavě',
    },
    {
      id: 'misto-06',
      title: 'Pamětní místo spojené s konkrétní historickou postavou',
    },
    {
      id: 'misto-03',
      title: 'Významná budova spojená s minulým režimem',
    },
    {
      id: 'misto-04',
      title: 'Místo, které reprezentuje paměť současných obyvatel',
    },
    {
      id: 'misto-05',
      title: 'Drobný artefakt komunismu',
    },
  ],
};

const klicovaSlovaUlice = [
  'rušná',
  'opuštěná',
  'tichá',
  'zastrčená',
  'bulvár',
  'náměstí',
  'místo pro odpočinek',
  'místo práce',
  'zelená',
  'zanedbaná',
  'důstojné místo',
];

const klicovaSlova = [
  'estetické',
  'zanedbané',
  'opuštěné',
  'živé',
  'upravené',
  'původní',
  'děsivé',
  'pietní',
  'funkční',
  'uklidňující',
  'barevné',
  'šedivé',
  'vzbuzující hrdost',
  'vzbuzující stud',
];

const mapovaniUkolu = {
  q00_01: {
    title: 'Kde se nacházíte?',
    type: 'array',
    itemsObj: mista,
    limit: 1,
    inline: false,
  },
  q01_01: {
    title: 'Jak zní vžitý název místa?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[0].title,
      },
    ],
  },
  q01_02: {
    title: 'Jak na vás místo působí?',
    type: 'array',
    itemsObj: klicovaSlova,
    limit: 5,
    inline: false,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[0].title,
      },
    ],
  },
  q01_03: {
    title: 'Jaké informace se můžete dozvědět přímo na místě?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[0].title,
      },
    ],
  },
  q01_04: {
    title:
      'Vyfoťte detail pamětního místa, který charakterizuje vzpomínání na 2. světovou válku',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[0].title,
      },
    ],
  },
  q02_01: {
    title: 'Jak se ulice jmenuje dnes?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[1].title,
      },
    ],
  },
  q02_02: {
    title: 'Víte jak se ulice jmenovala dříve, byla někdy přejmenovaná',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[1].title,
      },
    ],
  },
  q02_03: {
    title:
      'Je v ulici nějaké místo, které odkazuje na dědictví historické postavy, podle které byla/je pojmenována?',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[1].title,
      },
    ],
  },
  q02_04: {
    title: 'Jaká je charakteristická atmosféra ulice?',
    type: 'array',
    itemsObj: klicovaSlovaUlice,
    limit: 5,
    inline: false,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[1].title,
      },
    ],
  },
  q03_01: {
    title: 'Jak zní vžitý název budovy?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_02: {
    title: 'Zachyťte celek budovy',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_03: {
    title: 'Jak na vás místo působí?',
    type: 'array',
    itemsObj: klicovaSlova,
    limit: 5,
    inline: false,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_04: {
    title: 'Jakou má místo funkci?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_05: {
    title: 'Lze se na místě o jeho minulosti něco dozvědět?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_06_01: {
    title:
      'Vyfoťte klíčové detaily místa, které odkazují na minulost spjatou s komunismem (První foto)',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_06_02: {
    title:
      'Vyfoťte klíčové detaily místa, které odkazují na minulost spjatou s komunismem (Druhé foto)',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q03_06_03: {
    title:
      'Vyfoťte klíčové detaily místa, které odkazují na minulost spjatou s komunismem (Třetí foto)',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[2].title,
      },
    ],
  },
  q04_01: {
    title: 'Jak vzní žitý název místa?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q04_02: {
    title: 'Zachyťte celek místa.',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q04_03: {
    title: 'Jak na vás místo působí?',
    type: 'array',
    itemsObj: klicovaSlova,
    limit: 5,
    inline: false,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q04_04: {
    title: 'Jakým způsobem místo reprezentuje paměť současných obyvatel?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q04_05_01: {
    title:
      'Vyfoťte klíčové detaily místa, které dokumentují paměť současných obyvatel (První foto)',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q04_05_02: {
    title:
      'Vyfoťte klíčové detaily místa, které dokumentují paměť současných obyvatel (Druhé foto)',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q04_05_03: {
    title:
      'Vyfoťte klíčové detaily místa, které dokumentují paměť současných obyvatel (Třetí foto)',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[3].title,
      },
    ],
  },
  q05_01: {
    title: 'Jak byste artefakt pojmenovali?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q05_02: {
    title: 'Zdokumentujte artefakt pomocí fotoaparátu.',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q05_03: {
    title: 'Jak na vás artefakt působí?',
    type: 'array',
    itemsObj: klicovaSlova,
    limit: 5,
    inline: false,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q05_04: {
    title: 'K čemu sloužil (slouží)?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q05_05: {
    title: 'Máte s artefaktem spojenou nějakou vzpomínku?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q06_01: {
    title: 'Na koho se vzpomíná?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[5].title,
      },
    ],
  },
  q06_02: {
    title: 'Zachyťte celek místa.',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q06_03: {
    title: 'Jak na vás místo působí?',
    type: 'array',
    itemsObj: klicovaSlova,
    limit: 5,
    inline: false,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q06_04: {
    title: 'Jaké informace se můžete dozvědět přímo na místě?',
    type: 'text',
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
  q06_05: {
    title: 'Vyfoťte detail pamětního místa',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q00_01',
        operator: 'in',
        value: mista.items[4].title,
      },
    ],
  },
};

export default {
  id: '92197c00-5936-4ac2-9b19-e235a32c2695', // UUID 4
  nazev:
    'Stopy socialismu kolem nás - Digitální aplikace k edukativnímu mapování dějin ve veřejném prostoru',
  slug: 'stopy-socialismu',
  autori: ['Bohumil Melichar'],
  barva: '#28444d',
  metadata: {
    cas: 60,
    delka: 800,
  },
  popis:
    'Účastníci procházky budou na své cestě analyzovat rozmanitá místa, která slouží nebo sloužila ke vzpomínání na oběti či hrdiny konfliktů, ale také místa, která nesou pozůstatky každodenního života za socialismu. Budou objevovat, jak se 40 let socialismu propsalo do prostředí, v němž žijí. Zhodnocení nakolik jsou stopy této epochy přítomné v jejich městě, čtvrtí, vesnici apod. povede k otázkám po významu této minulé éry pro komunitu, ve které se pohybují.',
  metodika: 'metodika_slepá procházka.pdf',
  obrazky: {
    thumb: 'thumb.jpg',
    intro: 'intro.jpg',
  },
  mapovaniUkolu,
};
