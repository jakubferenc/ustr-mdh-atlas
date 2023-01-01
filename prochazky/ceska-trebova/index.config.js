const typObjektu = {
  settings: {
    autoGenerateId: false,
    slug: 'typ-objektu',
  },

  items: [
    {
      id: 'skalka',
      title: 'Skalka - ubytovna Střední školy technické a dopravní',
    },
    {
      id: 'habrmanova-ulice',
      title: 'Habrmanova ulice - pomník před ZŠ Habrmanova',
    },
    { id: 'stare-namesti', title: 'Staré náměstí - fontána' },
    {
      id: 'pernerovo-namesti-pomnik',
      title: 'Pernerovo náměstí - pomník Jana Pernera',
    },
    { id: 'vestibul-nadrazi', title: 'Vestibul nádraží' },
    {
      id: 'pernerovo-namesti-sousosi',
      title: 'Pernerovo náměstí - sousoší Sbratření',
    },
  ],
};

const klicovaSlovaReflexe = {
  autoGenerateId: true,
  slug: 'klicova-slova-reflexe-mista',

  items: [
    { title: 'Nezájem' },
    { title: 'Smutek' },
    { title: 'Obdiv' },
    { title: 'Překvapení' },
    { title: 'Odpor' },
    { title: 'Strach' },
    { title: 'Pokora' },
    { title: 'Optimismus' },
    { title: 'Úcta' },
    { title: 'Pobavení' },
  ],
};

const klicovaSlovaReflexeStareNamesti = {
  autoGenerateId: true,
  slug: 'klicova-slova-reflexe-mista',

  items: [
    { title: 'Smutek' },
    { title: 'Klid' },
    { title: 'Rozrušení' },
    { title: 'Vztek' },
    { title: 'Radost ze změny' },
    { title: 'Souhlas' },
    { title: 'Chuť něco udělat' },
    { title: 'Potřeba se něco dozvědět' },
    { title: 'Vandalství' },
    { title: 'Chátrání' },
    { title: 'Provizorium' },
    { title: 'Nezaujalo mě' },
    { title: 'Něco chybí' },
  ],
};

const moznostiHistorickaFunkceMista = {
  autoGenerateId: true,
  slug: 'historicka-funkce-mista',

  items: [
    { title: 'vzpomínání' },
    { title: 'propaganda' },
    { title: 'dekorace' },
    { title: 'poučení' },
    { title: 'reprezentace' },
    { title: 'prostor pro umění' },
    { title: 'žádná funkce' },
  ],
};

const moznostiHistorickaFunkceMistaStareNamesti = {
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

const pramenyUvod = [
  {
    src: '/prameny/uvodni-soucasny-web.png',
    desc: null,
    source: 'https://www.ceska-trebova.cz/',
  },
];

const pramenyUbytovna = [
  {
    src: '/prameny/1-ubytovna-relief-zeleznicaru/1-10-let-skoly.jpg',
    desc: `Nákres budoucí ubytovny, počátek 50. let (na stožárech v popředí československá a sovětská vlajka).`,
    source: '10 let železniční školy v České Třebové. Česká Třebová 1955.',
  },
  {
    src: '/prameny/1-ubytovna-relief-zeleznicaru/2-10-let-skoly-text.jpg',
    desc: null,
    source: '10 let železniční školy v České Třebové. Česká Třebová 1955.',
  },
  {
    src: '/prameny/1-ubytovna-relief-zeleznicaru/3-10-let-skoly-text.jpg',
    desc: null,
    source: '10 let železniční školy v České Třebové. Česká Třebová 1955.',
  },
  {
    src: '/prameny/1-ubytovna-relief-zeleznicaru/4-orbis-60-leta.jpg',
    desc: `Významná místa České Třebové: Sousoší Sbratření na Starém náměstí (1), Střední průmyslová škola železniční (2), park Javorka (3), studentský domov (4).`,
    source: 'pohlednice, vyd. Orbis, 60. léta.',
  },
];

const pramenyHabrmanovaUlice = [
  {
    src: '/prameny/2-pomnik-padlym-zs-habrmanova/01.png',
    desc: null,
    source: `Pochodeň: Orgán východočeského KV KSČ, 8. 5. 1980.`,
  },
  {
    src: '/prameny/2-pomnik-padlym-zs-habrmanova/02-Muzeum-802_1992.jpg',
    desc: `Slavnostní odhalení pomníku obětem fašismu 8. 5. 1980.`,
    source: `Městské muzeum Česká Třebová, ev. č. 802/1992, foto Karel Aliger.`,
  },
  {
    src: '/prameny/2-pomnik-padlym-zs-habrmanova/03-Muzeum-801_1992.jpg',
    desc: `Slavnostní odhalení pomníku obětem fašismu 8. 5. 1980.`,
    source: `Městské muzeum Česká Třebová, ev. č. 801/1992, foto Karel Aliger.`,
  },
  {
    src: '/prameny/2-pomnik-padlym-zs-habrmanova/04-deska.jpg',
    desc: ` Při srovnání jmen na pomníku a pamětní desky z českotřebovského nádraží můžete zjistit, že mezi oběťmi války byla řada zdejších železničářů, kteří se během okupace zapojili do odbojové činnosti.`,
    source: ``,
  },
];

const pramenyStareNamesti = [
  {
    src: '/prameny/3-stare-namesti/01-kronika-1948.png',
    desc: `Kronika České Třebové, 1948.`,
    source: `Státní okresní aŕchiv Ústí nad Orlicí, fond MNV Česká Třebová.`,
  },
  {
    src: '/prameny/3-stare-namesti/02.jpg',
    desc: `Sochař Karel Pokorný při práci na modelu sousoší.`,
    source: `volné dílo.`,
  },
  {
    src: '/prameny/3-stare-namesti/03.jpg',
    desc: `Odhalení sousoší na Starém náměstí, 1951.`,
    source: `Městské muzeum Česká Třebová, ev. č. 429/1987.`,
  },
  {
    src: '/prameny/3-stare-namesti/04.jpg',
    desc: `Náměstí Sbratření se stejnojmennou sochou, 1. polovina 50. let.`,
    source: `pohlednice, vyd. Orbis.`,
  },
  {
    src: '/prameny/3-stare-namesti/05.png',
    desc: null,
    source: `Pochodeň: Orgán východočeského KV KSČ, 10. 8. 1981.`,
  },
  {
    src: '/prameny/3-stare-namesti/06.jpg',
    desc: `Přesun sousoší ze Starého náměstí v roce 1996.`,
    source: `Městské muzeum Česká Třebová, ev. č. 394/1997.`,
  },
  {
    src: '/prameny/3-stare-namesti/07.png',
    desc: `Českotřebovský zpravodaj 9. 3. 1996.`,
    source: null,
  },
];

const pramenyPernerovoNamestiPomnikJanaPernera = [
  {
    src: '/prameny/4-perneruv-pomnik/01.png',
    desc: `Hodnocení vítězného návrhu Pernerova pomníku.`,
    source: 'https://www.ceska-trebova.cz/',
  },
  {
    src: '/prameny/4-perneruv-pomnik/02.png',
    desc: null,
    source: 'orlicky.denik.cz',
  },
  {
    src: '/prameny/4-perneruv-pomnik/03.png',
    desc: null,
    source: 'idnes.cz',
  },
  {
    src: '/prameny/4-perneruv-pomnik/04.png',
    desc: null,
    source: 'idnes.cz',
  },
  {
    src: '/prameny/4-perneruv-pomnik/05.png',
    desc: null,
    source: 'idnes.cz',
  },
];

const pramenyVestibulNadrazi = [
  {
    src: '/prameny/5-nadrazi-deska-sgrafito/01.jpg',
    desc: null,
    source:
      'Jan Lomar, Kronika dění ve městě Česká Třebová, Muzeum Česká Třebová.',
  },
  {
    src: '/prameny/5-nadrazi-deska-sgrafito/02.jpg',
    desc: `Malíř Stanislav Víša (1924-1984), autor sgrafit na českotřebovském nádraží.`,
    source: `www.osobnostiregionu.cz `,
  },
  {
    src: '/prameny/5-nadrazi-deska-sgrafito/03.png',
    desc: null,
    source: `Železničář, roč. 1975, č. 7-8.`,
  },
];

const pramenyPernerovoNamestiSousosiSbratreni = [
  {
    src: '/prameny/6-pernerovo-sbratreni/1-prvni-presun-text.png',
    desc: null,
    source: `Českotřebovský zpravodaj 4. 6. 1996.`,
  },
  {
    src: '/prameny/6-pernerovo-sbratreni/2-prvni-presun-wiki.jpg',
    desc: `Sousoší Sbratření před úpravou Pernerova náměstí, 2000, foto Marek Stránský.`,
    source: `Nostramanus [CC BY-SA 3.0 (https://creativecommons.org/license/by-sa/3.0/deed.cs)], via Wikimedia Commons`,
  },
  {
    src: '/prameny/6-pernerovo-sbratreni/3-presun-mapy.png',
    desc: `Původní umístění Sbratření u nádraží (1996-2010).`,
    source: `mapy.cz`,
  },
  {
    src: '/prameny/6-pernerovo-sbratreni/4-presun-mapy.png',
    desc: `Současné umístění Sbratření u nádraží (od 2010).`,
    source: `mapy.cz`,
  },
  {
    src: '/prameny/6-pernerovo-sbratreni/05.jpg',
    desc: null,
    source: `Českotřebovský zpravodaj 8/2010.`,
  },
  {
    src: '/prameny/6-pernerovo-sbratreni/06.jpg',
    desc: null,
    source: `Českotřebovský zpravodaj 4/2009.`,
  },
  {
    src: '/prameny/6-pernerovo-sbratreni/07.jpg',
    desc: null,
    source: null,
  },
];

const mapovaniUkolu = {
  q00_01: {
    title:
      'Přečtěte si charakteristiku České Třebové z oficiálních webových stránek města.',
    subtitle:
      'Zkuste ji porovnat s vlastními dojmy a informacemi, které získáte během procházky.',
    type: 'gallery',
    sources: pramenyUvod,
    columns: 1,
  },
  q01_01: {
    title: 'Kde se nacházíte?',
    type: 'array',
    itemsObj: typObjektu,
    limit: 1,
    inline: false,
  },
  q01_03: {
    title: 'Co objekt znázorňuje? Jaké postavy vidíte na objektu?',
    type: 'text',
    conditions: [
      {
        question: 'q01_01',
        operator: 'not_in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q01_04: {
    title:
      'Vyfotografujte detail nebo prvek, podle něhož jste určili, co dílo znázorňuje.',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q01_01',
        operator: 'not_in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q01_05_01: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyUbytovna,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[0].title,
      },
    ],
  },
  q01_05_02: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyHabrmanovaUlice,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[1].title,
      },
    ],
  },
  q01_05_03: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyPernerovoNamestiPomnikJanaPernera,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[3].title,
      },
    ],
  },
  q01_05_04: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyVestibulNadrazi,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[4].title,
      },
    ],
  },
  q01_05_05: {
    title: 'Prohlédněte si historické materiály vztahující se k místu.',
    type: 'gallery',
    sources: pramenyPernerovoNamestiSousosiSbratreni,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[5].title,
      },
    ],
  },
  q01_06: {
    title: 'K čemu dílo mohlo sloužit? Vyberte 1-2 pojmy.',
    type: 'array',
    itemsObj: moznostiHistorickaFunkceMista,
    limit: 2,
    inline: false,
  },
  q02_01: {
    title:
      'Vyberte 1-3 pojmy, které nejlépe vystihují, jak na vás působí místo, kde se právě nacházíte.',
    type: 'array',
    itemsObj: klicovaSlovaReflexeStareNamesti,
    limit: 3,
    inline: false,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q02_02: {
    title: 'Co objekt znázorňuje? Jaké postavy vidíte na objektu?',
    type: 'text',
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q02_03: {
    title:
      'Vyfotografujte detail nebo prvek v okolí, který podle vás určuje charakter tohoto místa.',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q02_04: {
    title: 'Prohlédněte si historické materiály vztahující se k místu',
    type: 'gallery',
    sources: pramenyStareNamesti,
    columns: 4,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q02_05: {
    title:
      'K čemu místo v minulosti sloužilo? Vyberte 1-3 funkce na základě historických pramenů.',
    type: 'array',
    itemsObj: moznostiHistorickaFunkceMistaStareNamesti,
    limit: 3,
    inline: false,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
  q02_06: {
    title: 'Pořiďte fotografii, která nejlépe zachytí celek tohoto místa.',
    type: 'image',
    photoCount: 1,
    conditions: [
      {
        question: 'q01_01',
        operator: 'in',
        value: typObjektu.items[2].title,
      },
    ],
  },
};

export default {
  id: 'f37d2a08-97b1-4913-9657-235aadca34b0', // UUID 4
  nazev: 'Česká Třebová - město železničářů?',
  slug: 'ceska-trebova',
  autori: ['Bohumil Melichar'],
  barva: '#a69f8e',
  popis:
    'Procházka vede po několika uměleckých dílech umístěných na veřejně přístupných místech v České Třebové. Jejím záměrem je umožnit účastníkům posoudit, jakým způsobem a nakolik výrazně je v současném veřejném prostoru města přítomno tradiční místní téma železnice a železničářů. Otázky v aplikaci a doplňující historické prameny vedou uživatele k reflexi vlastních dojmů z konkrétních výtvarných objektů a k domýšlení tématu v obecnějších souvislostech (jakým způsobem a s jakými záměry prezentujeme konkrétní témata na veřejných prostranstvích).',
  metodika: 'Česká Třebová_ scénář a metodika.pdf',
  obrazky: {
    thumb: 'thumb.jpg',
    intro: 'intro.jpg',
  },
  typObjektu,
  mapovaniUkolu,
};
