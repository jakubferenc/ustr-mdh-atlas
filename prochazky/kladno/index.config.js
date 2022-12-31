const typObjektu = {
  settings: {
    autoGenerateId: true,
    slug: 'typ-objektu',
  },

  items: [
    { title: 'Pamětní místo spojené s druhou světovou válkou' },
    { title: 'Pamětní místo oslavující práci' },
  ],
};

const mistaDruhaSvetovaValka = {
  autoGenerateId: true,
  slug: 'mista-druha-svetova-valka',

  items: [
    { title: 'Pomník umučených v koncentračních táborech' },
    { title: 'Lidická matka' },
  ],
};

const mistaOslavujiciPraci = {
  autoGenerateId: true,
  slug: 'mista-oslavujici-praci',

  items: [{ title: 'Váňův kámen' }, { title: 'Hornická práce' }],
};

const klicovaSlovaReflexe = {
  autoGenerateId: true,
  slug: 'klicova-slova-reflexe-mista',

  items: [
    { title: 'estetické' },
    { title: 'zanedbané' },
    { title: 'opuštěné' },
    { title: 'živé' },
    { title: 'upravené' },
    { title: 'původní' },
    { title: 'děsivé' },
    { title: 'pietní' },
    { title: 'funkční' },
    { title: 'uklidňující' },
    { title: 'barevné' },
    { title: 'šedivé' },
    { title: 'vzbuzující hrdost' },
    { title: 'vzbuzující stud' },
  ],
};

const moznostiStariObjektu = {
  autoGenerateId: true,
  slug: 'stari-objektu',

  items: [
    { title: 'Z 19. století nebo první poloviny 20. století' },
    { title: 'Z druhé poloviny 20. století' },
    { title: 'Z počátku 21. století' },
  ],
};

const moznostiGenderoveRoleMista = {
  autoGenerateId: true,
  slug: 'genderove-role-mista',

  items: [
    { title: 'Mužská role' },
    { title: 'Ženská role' },
    { title: 'Obě role' },
  ],
};

const moznostiIntence = {
  autoGenerateId: true,
  slug: 'misto-intence',

  items: [
    { title: 'utrpení' },
    { title: 'hrdost' },
    { title: 'tvrdost' },
    { title: 'síla' },

    { title: 'citovost' },
    { title: 'rodina' },
    { title: 'práce' },
    { title: 'materiální hodnoty' },
    { title: 'nemateriální hodnoty' },
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
  q01_01_01: {
    title: 'Koho nebo čeho je to pomník? Upřesněte.',
    type: 'array',
    itemsObj: mistaDruhaSvetovaValka,
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
  q01_01_02: {
    title: 'Koho nebo čeho je to pomník? Upřesněte.',
    type: 'array',
    itemsObj: mistaOslavujiciPraci,
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
  q01_02: {
    title: 'Jak na vás místo působí?',
    type: 'array',
    itemsObj: klicovaSlovaReflexe,
    limit: 5,
    inline: false,
  },
  q01_03: {
    title:
      'Jaké informace se o objektu můžete dozvědět přímo na místě, kde se právě nacházíte?',
    type: 'text',
  },
  q01_04: {
    title: 'Jak je zkoumaný objekt přibližně starý?',
    type: 'array',
    itemsObj: moznostiStariObjektu,
    limit: 1,
    inline: false,
  },
  q01_05: {
    title: 'Vyfoťte místo',
    type: 'image',
    photoCount: 1,
  },
  q01_06: {
    title: 'Souvisí místo spíše s mužskou či ženskou rolí?',
    type: 'array',
    itemsObj: moznostiGenderoveRoleMista,
    limit: 1,
    inline: false,
  },
  q01_07: {
    title: 'Vyfoťte detaily dokládající váš předchozí výběr',
    subtitle: 'Vyfoťte až 3 fotografie detailů',
    type: 'image',
    photoCount: 3,
  },
  q01_08: {
    title: 'Co mělo místo původně vyjadřovat?',
    type: 'array',
    itemsObj: moznostiIntence,
    limit: 3,
    inline: false,
  },
  q01_09: {
    title: 'Vyfoťte detaily dokládající váš předchozí výběr',
    type: 'image',
    photoCount: 3,
    dynamicBasedOn: 'q01_08',
  },
};

export default {
  id: 'e757c132-7fa3-459c-8f28-978e060404a2', // UUID 4
  nazev: 'Kladenští muži a ženy z bronzu či kamene',
  slug: 'kladno',
  autori: ['Bohumil Melichar'],
  metadata: {
    cas: 60,
    delka: 800,
  },
  popis:
    'Účastníci procházky na své cestě analyzují pět míst, která jsou důležité pro identitu Kladna jako centra těžby a těžkého průmyslu. Pomníky, reliéfy a budovy připomínají nejen pracovní úspěchy, nasazení místních dělníků či jejich stavovskou čest, ale také těžké chvíle utrpení a zmaru. Pozornost bude zaměřena na to, jakým způsobem je do dnešních ulic vtisknuta vzpomínka na zanikající průmyslovou společnost a jaké hodnoty se s ní pojily. Monumentální zobrazení událostí, které měly být neustále připomínány, odhalují nejen logiku s jakou ke společenství horníků a hutníků přistupoval stát, ale také jaké vlastnosti připisoval jejím členům. Identita založená na přijetí mužské či ženské role je jednou ze zásadních a dobově byla považována za stabilní a neměnnou. Zdůrazňování spojitosti mezi určitými metaforami vyjádřenými pomníky s ženským či mužským světem může odhalit jak se stereotypy v otázce pohlaví zabydlovali v dobové mentalitě. Žáci budou nakonec vedeni k porovnání dobového zobrazení muže a ženy na pomnících se současným zobrazováním mužů a žen v reklamě. Bude tak konfrontovat starší vrstvu veřejného prostoru s tou současnou. Na závěr bude vyzván, aby na základě jeho současného náhledu na svět rozhodl, jestli pomník plní nadále svoji funkci a nebo už se jedná o neaktuální historickou památku.',
  metodika: 'Kladno_Metodika pro učitele.pdf',
  obrazky: {
    thumb: 'thumb.jpg',
    intro: 'intro.jpg',
  },
  mapovaniUkolu,
};
