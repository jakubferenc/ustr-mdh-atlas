const typObjektu = {
  settings: {
    autoGenerateId: true,
    slug: 'typ-objektu',
  },
  items: [{ title: 'Pomník jednotlivci' }, { title: 'Pomník skupině' }],
};
[];

const mistaPomnikJednotlivci = {
  autoGenerateId: true,
  slug: 'mista-pomnik-jednotlivci',

  items: [
    { title: 'Pomník Jožky Jabůrkové' },
    { title: 'Pomník Julia Fučíka' },
    { title: 'Pomník Jana Švermy' },
  ],
};

const mistaPomnikSkupina = {
  autoGenerateId: true,
  slug: 'mista-pomnik-skupiny',

  items: [
    { title: 'Pohřebiště vojáků Rudé armády' },
    { title: 'Památník Československých letcům RAF' },
    { title: 'Památník II. odboji' },
  ],
};

const klicovaSlovaReflexe = {
  autoGenerateId: true,
  slug: 'klicova-slova-reflexe-mista',

  items: [
    { title: 'vkusné' },
    { title: 'nevkusné' },
    { title: 'zanedbané' },
    { title: 'upravené' },
    { title: 'opuštěné' },
    { title: 'živé' },
    { title: 'pietní' },
    { title: 'znepokojivý' },
    { title: 'uklidňující' },
    { title: 'vzbuzující hrdost' },
    { title: 'vzbuzující stud' },
    { title: 'vzbuzující úctu' },
    { title: 'srozumitelné' },
    { title: 'nesrozumitelné' },
  ],
};

const moznostiStariObjektu = {
  autoGenerateId: true,
  slug: 'stari-objektu',

  items: [
    { title: 'Z druhé poloviny 20. století' },
    { title: 'Z počátku 21. století' },
  ],
};

const moznostiIntence = {
  autoGenerateId: true,
  slug: 'misto-intence',

  items: [
    { title: 'odvaha' },
    { title: 'utrpení' },
    { title: 'hrdost' },
    { title: 'tvrdost' },
    { title: 'síla' },
    { title: 'odhodlanost' },
    { title: 'vlastenectví' },
    { title: 'úcta' },
    { title: 'statečnost' },
    { title: 'sebeobětování' },
  ],
};

const mapovaniUkolu = {
  q01_01: {
    title: 'Kde se nacházíte?',
    type: 'array',
    itemsObj: typObjektu,
    limit: 1,
    inline: false,
  },
  q01_02_01: {
    title: 'Koho nebo čeho je to pomník? Upřesněte.',
    type: 'array',
    itemsObj: mistaPomnikJednotlivci,
    limit: 1,
    inline: false,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[0].title,
      },
    ],
  },
  q01_02_02: {
    title: 'Koho nebo čeho je to pomník? Upřesněte.',
    type: 'array',
    itemsObj: mistaPomnikSkupina,
    limit: 1,
    inline: false,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[1].title,
      },
    ],
  },
  q01_03: {
    title: 'Jak na vás místo působí?',
    type: 'array',
    itemsObj: klicovaSlovaReflexe,
    limit: 5,
    inline: false,
  },
  q01_04: {
    title:
      'Jaké informace se o objektu můžete dozvědět přímo na místě, kde se právě nacházíte?',
    type: 'text',
  },
  q01_05: {
    title: 'Jak je zkoumaný objekt přibližně starý?',
    type: 'array',
    itemsObj: moznostiStariObjektu,
    limit: 1,
    inline: false,
  },
  q01_06: {
    title: 'Vyfoťte místo',
    type: 'image',
    photoCount: 1,
  },
  q01_07: {
    title: 'Kdo je připomínán?',
    type: 'text',
  },
  q01_08: {
    title: 'Co mělo místo původně vyjadřovat?',
    type: 'array',
    itemsObj: moznostiStariObjektu,
    limit: 3,
    inline: false,
  },
  q01_09_01: {
    title: 'Vyfoťte detaily dokládající váš předchozí výběr',
    subtitle: 'Vyfoťte až 3 fotografie detailů',
    type: 'image',
    dynamicBasedOn: 'q01_08',
  },
};
export default {
  id: '2bc7bd44-22b5-4633-826e-a64fe7e701ce', // UUID 4
  nazev:
    'Pohřbená paměť: proměna paměti na druhou světovou válku po roce 1989 Procházka Praha',
  slug: 'pohrbena-pamet-praha',
  autori: ['Bohumil Melichar'],
  barva: '#657788',
  metadata: {
    cas: '90 minut (60 minut práce, 30 minut na přesun)',
    delka: 'do 1500 m',
    pozadavky: 'jízdenka na metro (24 kč na jednoho nebo lítačka)',
  },
  popis:
    'Účastníci procházky na své cestě analyzují místa, která slouží vzpomínání na účastníky druhé světové války. Pomníky připomínají statečnost a sebeobětování pojící se s frontovými bojovníky či aktivním odbojem proti nacismu v zázemí Protektorátu. Pozornost bude zaměřena na to, jakým způsobem se proměnil přístup k různým osobnostem a kolektivům, jimž byla a je připisovaná heroická role. Monumentální zobrazení symbolů odkazujících na projevy chrabrosti v bojích druhé světové války komunikují stejně a možná i ve větší míře hodnoty tvůrců pomníků, jako ty, za něž jednotlivý odbojáři a frontoví vojáci riskovali životy. Připomínání těch, kteří se zasloužili natolik o porážku Třetí říše, že jejich odkaz necháváme zvěčnit na centrálních místech města, se ukazuje jako velice výběrové. Porovnání dvou pražských pietních areálů spojených se změnou hodnocení různých válečných aktérů poukazuje na proces, jakým naše společnost vnímá hodnotu hrdinství a vybírá své hrdiny. Je zřejmé, že tento mechanismus je v mnohém závislý na aktuálním politickém a společenském dění.Účastníci procházky na své cestě analyzují místa, která slouží vzpomínání na účastníky druhé světové války. Pomníky připomínají statečnost a sebeobětování pojící se s frontovými bojovníky či aktivním odbojem proti nacismu v zázemí Protektorátu. Pozornost bude zaměřena na to, jakým způsobem se proměnil přístup k různým osobnostem a kolektivům, jimž byla a je připisovaná heroická role. Monumentální zobrazení symbolů odkazujících na projevy chrabrosti v bojích druhé světové války komunikují stejně a možná i ve větší míře hodnoty tvůrců pomníků, jako ty, za něž jednotlivý odbojáři a frontoví vojáci riskovali životy. Připomínání těch, kteří se zasloužili natolik o porážku Třetí říše, že jejich odkaz necháváme zvěčnit na centrálních místech města, se ukazuje jako velice výběrové. Porovnání dvou pražských pietních areálů spojených se změnou hodnocení různých válečných aktérů poukazuje na proces, jakým naše společnost vnímá hodnotu hrdinství a vybírá své hrdiny. Je zřejmé, že tento mechanismus je v mnohém závislý na aktuálním politickém a společenském dění.',
  metodika: 'metodika_Olšany Klárov.pdf',
  obrazky: {
    thumb: 'thumb.jpg',
    intro: 'intro.jpg',
  },
  mapovaniUkolu,
};
