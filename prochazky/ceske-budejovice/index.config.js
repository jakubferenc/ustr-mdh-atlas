const typObjektu = {
  settings: {
    autoGenerateId: true,
    slug: 'typ-objektu',
  },

  items: [
    { title: 'Jihočeská vědecká knihovna' },
    { title: 'ulice F. A. Gerstnera' },
    { title: 'Senovážné náměstí' },
    { title: 'ulice Jana Opletala' },
    { title: 'Husova ulice u kapličky' },
  ],
};

const klicovaSlovaReflexe = {
  autoGenerateId: true,
  slug: 'klicova-slova-reflexe-mista',

  items: [
    { title: 'Smutek' },
    { title: 'Kontroverze' },
    { title: 'Klid' },
    { title: 'Rozrušení' },
    { title: 'Pohnutí' },
    { title: 'Vztek' },
    { title: 'Nespravedlnost' },
    { title: 'Radost ze změny' },
    { title: 'Souhlas' },
    { title: 'Chuť něco dělat' },
    { title: 'Potřeba se něco dozvědět' },
    { title: 'Vandalství' },
    { title: 'Chátrání' },
    { title: 'Provizorium' },
    { title: 'Nezaujalo mě' },
    { title: 'Vzbudilo pozornost' },
    { title: 'Něco chybí' },
  ],
};

const moznostiHistorickaFunkceMista = {
  autoGenerateId: true,
  slug: 'historicka-funkce-mista',

  items: [
    { title: 'místo setkávání' },
    { title: 'reprezentace a oslava politického režimu' },
    { title: 'místo ke vzpomínání' },
    { title: 'místo pro odpočinek' },
    { title: 'místo zbožnosti' },
    { title: 'prostor pro umění' },
    { title: 'žádná funkce / není zřejmé' },
  ],
};

const moznostiCharakteristika = {
  autoGenerateId: true,
  slug: 'misto-charakteristika',

  items: [
    { title: 'Tragédie' },
    { title: 'Komedie' },
    { title: 'Jeviště dějin' },
    { title: 'Propadliště dějin' },
    { title: 'V záři reflektorů' },
    { title: 'Zákulisí' },
  ],
};

const pramenyZdrojeBalvan = [
  {
    src: '/prameny/balvan/1. Balvan - Zmizelé Budějovice.jpg',
    desc: 'Původní zástavba na místě dnešní Jihočeské knihovny a „balvanu“.',
    source:
      'Daniel Kovář: České Budějovice, II. díl, Předměstí. Praha - Litomyšl 2006.',
  },
  {
    src: '/prameny/balvan/2. Pohlednice, 1972, Orbis.jpg',
    desc: 'Muzeum dělnického revolučního hnutí jižních Čech - původní expozice.',
    source: 'pohlednice, vyd. Orbis, 70. léta.',
  },
  {
    src: '/prameny/balvan/3. Muzeum děl. rev. hnutí - jak jsme je budovali, 1976 (2).jpg',
    desc: 'Slavnostní otevření Muzea dělnického revolučního hnutí jižních Čech v roce 1975.',
    source:
      'Muzeum dělnického revolučního hnutí jižních Čech v Českých Budějovicích. České Budějovice 1976.',
  },
  {
    src: '/prameny/balvan/4. P5030316.jpg',
    desc: null,
    source:
      'Přesun balvanu před výstavbou nové budovy Jihočeské knihovny, 2019.',
  },
];

const pramenyZdrojeSynagoga = [
  {
    src: '/prameny/synagoga/1. Synagoga.jpg',
    desc: 'Českobudějovická synagoga, v pozadí budova soudu.',
    source: 'pohlednice, kol. 1910.',
  },
  {
    src: '/prameny/synagoga/2. Synagoga - Zmizelé Budějovice (3).jpg',
    desc: 'Interiér synagogy před zničením a během demolice roku 1942.',
    source:
      'Daniel Kovář: České Budějovice, II. díl, Předměstí. Praha - Litomyšl 2006.',
  },
  {
    src: '/prameny/synagoga/3. Deník Jih. pravda, 4.7.92, s.10.jpg',
    desc: null,
    source: 'Zdroj: Deník Jihočeská pravda, 4. 7. 1992.',
  },
  {
    src: '/prameny/synagoga/4. synagoga_2011.png',
    desc: null,
    source: 'Zdroj: Google Maps, září 2011.',
  },
  {
    src: '/prameny/synagoga/5. synagoga_odkrytá.png',
    desc: null,
    source: 'Zdroj: Českobudějovický deník, 18. 10. 2013.',
  },
];

const pramenyZdrojeLenin = [
  {
    src: '/prameny/lenin/1. Českobudějovicko 1976, foto Fr. Dvořák.jpg',
    desc: 'Slavnostní shromáždění před pomníkem V. I. Lenina na tehdejším náměstí 1. máje.',
    source: 'Českobudějovicko. České Budějovice 1976.',
  },

  {
    src: '/prameny/lenin/2. Jih. pravda 12.12.72.jpg',
    desc: null,
    source: 'Jihočeská pravda, 12. 12. 1972.',
  },

  {
    src: '/prameny/lenin/3. Pressfoto, 1977, Miloš Nixlbauer.jpg',
    desc: 'Významné objekty Českých Budějovic.',
    source: 'pohlednice, vyd. Pressfoto, 1977.',
  },

  {
    src: '/prameny/lenin/4. článek 1A.png',
    desc: null,
    source: 'Českobudějovický deník, 28. 11. 2014.',
  },
];

const pramenyZdrojeGottwald = [
  {
    src: '/prameny/gottwald/1. Fr. Mrázek - zasloužilý umělec (2).jpg',
    desc: 'Pomník Klementa Gottwalda na tehdejším sídlišti Vítězného února. České Budějovice 1985.',
    source: '',
  },

  {
    src: '/prameny/gottwald/2. Jih. pravda 25.5.79 (1).jpg',
    desc: null,
    source: 'Jihočeská pravda, 25. 5. 1979.',
  },

  {
    src: '/prameny/gottwald/3. Pravda Bratislava, odesl. 1980, foto Ant. Cvak.jpg',
    desc: 'Významné objekty Českých Budějovic.',
    source: 'pohlednice, vyd. Pravda Bratislava, 1980.',
  },

  {
    src: '/prameny/gottwald/4. článek 2B, ČB deník, 17. 11. 2014.png',
    desc: null,
    source: 'Českobudějovický deník, 17. 11. 2014.',
  },
];

const pramenyZdrojeCtyriDvory = [
  {
    src: '/prameny/ctyri-dvory/1. U Kapličky 2013 (1).jpg',
    desc: 'Prostor kolem kapličky sv. Vojtěcha, 2013.',
  },

  {
    src: '/prameny/ctyri-dvory/2. U Kapličky 2013 (2).jpg',
    desc: 'Prostor kolem kapličky sv. Vojtěcha, 2013.',
  },

  {
    src: '/prameny/ctyri-dvory/3. U Kapličky 2013 (3).jpg',
    desc: 'Nároží Husovy a Sukovy ulice, 2013.',
  },

  {
    src: '/prameny/ctyri-dvory/4. Kronika-new.jpg',
    desc: 'Centrum Čtyř Dvorů v roce 1934; barevně vyznačena kaplička',
    source:
      'Kronika obce Čtyři Dvory, Státní okresní archiv České Budějovice, digi.ceskearchivy.cz',
  },

  {
    src: '/prameny/ctyri-dvory/5. Letecký 1.png',
    desc: 'Centrum Čtyř Dvorů v roce 1952',
    source: 'https://geoportal.gov.cz/',
  },

  {
    src: '/prameny/ctyri-dvory/6. Letecký 2.png',
    desc: 'Centrum Čtyř Dvorů v současnosti.',
    source: 'https://geoportal.gov.cz/',
  },
];

const mapovaniUkolu = {
  q01_01: {
    title: 'Kde se nacházíte?',
    type: 'array',
    itemsObj: typObjektu,
    limit: 1,
    inline: false,
  },
  q01_02: {
    title: 'Jak na vás místo působí?',
    subtitle:
      'Vyberte tři pojmy, které nejlépe vystihují, jak na vás působí místo, kde se právě nacházíte.',
    type: 'array',
    itemsObj: klicovaSlovaReflexe,
    limit: 3,
    inline: false,
  },
  q01_03_01: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyZdrojeBalvan,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[0].title,
      },
    ],
  },
  q01_03_02: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyZdrojeSynagoga,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[1].title,
      },
    ],
  },
  q01_03_03: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyZdrojeLenin,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q01_03_04: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyZdrojeGottwald,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[3].title,
      },
    ],
  },
  q01_03_05: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyZdrojeCtyriDvory,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[4].title,
      },
    ],
  },
  q01_04: {
    title: 'K čemu místo v minulosti sloužilo?',
    subtitle: 'Vyberte 1-3 funkce na základě historických pramenů.',
    type: 'array',
    itemsObj: moznostiHistorickaFunkceMista,
    limit: 3,
    inline: false,
  },
  q01_05: {
    title: 'Pořiďte fotografii, která nejlépe zachytí celek tohoto místa.',
    type: 'image',
    photoCount: 1,
  },
  q01_06: {
    title:
      'Vyfotografujte detail nebo prvek v okolí, který podle vás určuje charakter tohoto místa.',
    type: 'image',
    photoCount: 1,
  },

  q01_07: {
    title:
      'Vyberte 1-3 pojmy z nabídky, které podle vás nejlépe charakterizují toto místo.',
    type: 'array',
    itemsObj: moznostiCharakteristika,
    limit: 3,
    inline: false,
  },

  q01_08: {
    title: 'Svůj výběr krátce zdůvodněte.',
    subtitle: 'Tuto odpověď jsem zvolil/a, protože...',
    type: 'text',
  },

  q01_09: {
    title: 'Pojmenujte místo.',
    type: 'text',
  },
};

export default {
  id: 'a73c6252-926d-4d01-9039-af35c4209c1c', // UUID 4
  nazev: 'České Budějovice: (ne)viditelná místa',
  slug: 'ceske-budejovice',
  autori: ['Michal Kurz', 'Tereza Arndt'],
  barva: '#aba99d',
  popis:
    'Procházka vede účastníky pěti veřejně přístupnými lokalitami v Českých Budějovicích, které prošly během druhé poloviny 20. století výraznými změnami svého vzhledu i funkce. Přestože jde o na první pohled nenápadná místa, sehrávala v minulosti významnou roli ve společenském životě města. Procházka rozvíjí možnost je vnímat a analyzovat jako svého druhu jeviště či scény, na níž se v různých dobách pohybovaly a jednaly různé skupiny aktérů. Otázky v aplikaci vedou účastníky od přímého pozorování a reflexe dojmů, přes prohlížení kontextualizačních historických pramenů k formulování celkové charakteristiky místa a hypotéz týkajících se možných příčin jeho pozorované proměny.',
  metodika: 'České Budějovice_ scénář + metodika.pdf',
  obrazky: {
    thumb: 'thumb.jpg',
    intro: 'intro.jpg',
  },
  typObjektu,
  mapovaniUkolu,
};
