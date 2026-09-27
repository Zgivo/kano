export type Alphabet = "hiragana" | "katakana";

export type Kana = {
  id: string;
  character: string;
  romaji: string;
  alphabet: Alphabet;
  group: string;
  order: number;
  pronunciation: string;
  exampleWord: string;
  exampleReading: string;
  meaning: string;
  isCombination: boolean;
};

type RowKind = "basic" | "dakuon" | "handakuon" | "combination";
type Row = { group: string; romaji: string[]; hiragana: string[]; katakana: string[]; ids?: string[]; kind?: RowKind };

const rows: Row[] = [
  { group: "Vowels", romaji: ["a", "i", "u", "e", "o"], hiragana: ["あ", "い", "う", "え", "お"], katakana: ["ア", "イ", "ウ", "エ", "オ"] },
  { group: "K-row", romaji: ["ka", "ki", "ku", "ke", "ko"], hiragana: ["か", "き", "く", "け", "こ"], katakana: ["カ", "キ", "ク", "ケ", "コ"] },
  { group: "S-row", romaji: ["sa", "shi", "su", "se", "so"], hiragana: ["さ", "し", "す", "せ", "そ"], katakana: ["サ", "シ", "ス", "セ", "ソ"] },
  { group: "T-row", romaji: ["ta", "chi", "tsu", "te", "to"], hiragana: ["た", "ち", "つ", "て", "と"], katakana: ["タ", "チ", "ツ", "テ", "ト"] },
  { group: "N-row", romaji: ["na", "ni", "nu", "ne", "no"], hiragana: ["な", "に", "ぬ", "ね", "の"], katakana: ["ナ", "ニ", "ヌ", "ネ", "ノ"] },
  { group: "H-row", romaji: ["ha", "hi", "fu", "he", "ho"], hiragana: ["は", "ひ", "ふ", "へ", "ほ"], katakana: ["ハ", "ヒ", "フ", "ヘ", "ホ"] },
  { group: "M-row", romaji: ["ma", "mi", "mu", "me", "mo"], hiragana: ["ま", "み", "む", "め", "も"], katakana: ["マ", "ミ", "ム", "メ", "モ"] },
  { group: "Y-row", romaji: ["ya", "yu", "yo"], hiragana: ["や", "ゆ", "よ"], katakana: ["ヤ", "ユ", "ヨ"] },
  { group: "R-row", romaji: ["ra", "ri", "ru", "re", "ro"], hiragana: ["ら", "り", "る", "れ", "ろ"], katakana: ["ラ", "リ", "ル", "レ", "ロ"] },
  { group: "W-row", romaji: ["wa", "wo"], hiragana: ["わ", "を"], katakana: ["ワ", "ヲ"] },
  { group: "Final", romaji: ["n"], hiragana: ["ん"], katakana: ["ン"] },
];

const dakuonRows: Row[] = [
  { group: "Dakuon · G-row", romaji: ["ga", "gi", "gu", "ge", "go"], hiragana: ["が", "ぎ", "ぐ", "げ", "ご"], katakana: ["ガ", "ギ", "グ", "ゲ", "ゴ"], kind: "dakuon" },
  { group: "Dakuon · Z-row", romaji: ["za", "ji", "zu", "ze", "zo"], hiragana: ["ざ", "じ", "ず", "ぜ", "ぞ"], katakana: ["ザ", "ジ", "ズ", "ゼ", "ゾ"], kind: "dakuon" },
  { group: "Dakuon · D-row", romaji: ["da", "ji", "zu", "de", "do"], ids: ["da", "dji", "dzu", "de", "do"], hiragana: ["だ", "ぢ", "づ", "で", "ど"], katakana: ["ダ", "ヂ", "ヅ", "デ", "ド"], kind: "dakuon" },
  { group: "Dakuon · B-row", romaji: ["ba", "bi", "bu", "be", "bo"], hiragana: ["ば", "び", "ぶ", "べ", "ぼ"], katakana: ["バ", "ビ", "ブ", "ベ", "ボ"], kind: "dakuon" },
];

const handakuonRows: Row[] = [
  { group: "Handakuon · P-row", romaji: ["pa", "pi", "pu", "pe", "po"], hiragana: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"], katakana: ["パ", "ピ", "プ", "ペ", "ポ"], kind: "handakuon" },
];

const combinationRows: Row[] = [
  {
    group: "K / S / CH combinations",
    romaji: ["kya", "kyu", "kyo", "sha", "shu", "sho", "cha", "chu", "cho"],
    hiragana: ["きゃ", "きゅ", "きょ", "しゃ", "しゅ", "しょ", "ちゃ", "ちゅ", "ちょ"],
    katakana: ["キャ", "キュ", "キョ", "シャ", "シュ", "ショ", "チャ", "チュ", "チョ"],
    kind: "combination",
  },
  {
    group: "N / H / M / R combinations",
    romaji: ["nya", "nyu", "nyo", "hya", "hyu", "hyo", "mya", "myu", "myo", "rya", "ryu", "ryo"],
    hiragana: ["にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ", "みゃ", "みゅ", "みょ", "りゃ", "りゅ", "りょ"],
    katakana: ["ニャ", "ニュ", "ニョ", "ヒャ", "ヒュ", "ヒョ", "ミャ", "ミュ", "ミョ", "リャ", "リュ", "リョ"],
    kind: "combination",
  },
  {
    group: "Voiced combinations",
    romaji: ["gya", "gyu", "gyo", "ja", "ju", "jo", "bya", "byu", "byo", "pya", "pyu", "pyo"],
    hiragana: ["ぎゃ", "ぎゅ", "ぎょ", "じゃ", "じゅ", "じょ", "びゃ", "びゅ", "びょ", "ぴゃ", "ぴゅ", "ぴょ"],
    katakana: ["ギャ", "ギュ", "ギョ", "ジャ", "ジュ", "ジョ", "ビャ", "ビュ", "ビョ", "ピャ", "ピュ", "ピョ"],
    kind: "combination",
  },
];

const allRows = [...rows, ...dakuonRows, ...handakuonRows, ...combinationRows];

const examples: Record<string, [string, string, string]> = {
  a: ["あさ", "asa", "morning"], i: ["いぬ", "inu", "dog"], u: ["うみ", "umi", "sea"], e: ["えき", "eki", "station"], o: ["おちゃ", "ocha", "tea"],
  ka: ["かさ", "kasa", "umbrella"], ki: ["き", "ki", "tree"], ku: ["くち", "kuchi", "mouth"], ke: ["けさ", "kesa", "this morning"], ko: ["こえ", "koe", "voice"],
  sa: ["さかな", "sakana", "fish"], shi: ["すし", "sushi", "sushi"], su: ["すな", "suna", "sand"], se: ["せかい", "sekai", "world"], so: ["そら", "sora", "sky"],
  ta: ["たこ", "tako", "octopus"], chi: ["ちず", "chizu", "map"], tsu: ["つき", "tsuki", "moon"], te: ["て", "te", "hand"], to: ["とり", "tori", "bird"],
  na: ["なつ", "natsu", "summer"], ni: ["にく", "niku", "meat"], nu: ["ぬの", "nuno", "cloth"], ne: ["ねこ", "neko", "cat"], no: ["のみもの", "nomimono", "drink"],
  ha: ["はな", "hana", "flower"], hi: ["ひ", "hi", "sun"], fu: ["ふね", "fune", "boat"], he: ["へや", "heya", "room"], ho: ["ほし", "hoshi", "star"],
  ma: ["まど", "mado", "window"], mi: ["みず", "mizu", "water"], mu: ["むし", "mushi", "insect"], me: ["め", "me", "eye"], mo: ["もり", "mori", "forest"],
  ya: ["やま", "yama", "mountain"], yu: ["ゆき", "yuki", "snow"], yo: ["よる", "yoru", "night"],
  ra: ["らいねん", "rainen", "next year"], ri: ["りんご", "ringo", "apple"], ru: ["るす", "rusu", "absence"], re: ["れきし", "rekishi", "history"], ro: ["ろく", "roku", "six"],
  wa: ["わたし", "watashi", "I"], wo: ["みずを", "mizu o", "water (object)"], n: ["ほん", "hon", "book"],
};

const katakanaExamples: Record<string, [string, string, string]> = {
  a: ["アジア", "ajia", "Asia"], i: ["イタリア", "itaria", "Italy"], u: ["ウール", "uuru", "wool"], e: ["エア", "ea", "air"], o: ["オレンジ", "orenji", "orange"],
  ka: ["カメラ", "kamera", "camera"], ki: ["キロ", "kiro", "kilo"], ku: ["クラス", "kurasu", "class"], ke: ["ケーキ", "keeki", "cake"], ko: ["コーヒー", "koohii", "coffee"],
  shi: ["シマ", "shima", "island"], su: ["スープ", "suupu", "soup"], te: ["テスト", "tesuto", "test"], to: ["トマト", "tomato", "tomato"],
  na: ["ナイフ", "naifu", "knife"], ho: ["ホテル", "hoteru", "hotel"], ma: ["マスク", "masuku", "mask"], me: ["メモ", "memo", "memo"],
  ra: ["ラジオ", "rajio", "radio"], ri: ["リズム", "rizumu", "rhythm"], ru: ["ルール", "ruuru", "rule"], re: ["レモン", "remon", "lemon"], ro: ["ロボット", "robotto", "robot"],
};

function buildAlphabet(alphabet: Alphabet): Kana[] {
  let order = 0;
  return allRows.flatMap((row) => row.romaji.map((romaji, index) => {
    const character = row[alphabet][index];
    const isCombination = row.kind === "combination";
    const sample = row.kind && row.kind !== "basic"
      ? [character, romaji, row.kind === "dakuon" ? "voiced kana sound" : row.kind === "handakuon" ? "semi-voiced kana sound" : "combined kana sound"]
      : alphabet === "katakana" ? katakanaExamples[romaji] ?? examples[romaji] : examples[romaji];
    order += 1;
    return {
      id: `${alphabet}-${row.ids?.[index] ?? romaji}`,
      character,
      romaji,
      alphabet,
      group: row.group,
      order,
      pronunciation: romaji,
      exampleWord: sample[0],
      exampleReading: sample[1],
      meaning: sample[2],
      isCombination,
    };
  }));
}

export const kana: Kana[] = [...buildAlphabet("hiragana"), ...buildAlphabet("katakana")];
export const hiragana = kana.filter((item) => item.alphabet === "hiragana");
export const katakana = kana.filter((item) => item.alphabet === "katakana");
export const combinationKana = kana.filter((item) => item.isCombination);

export const lessonGroups = allRows.map((row, index) => ({
  lesson: index + 1,
  group: row.group,
  hiragana: hiragana.filter((item) => item.group === row.group),
  katakana: katakana.filter((item) => item.group === row.group),
}));

export const similarSets = [
  ["katakana-shi", "katakana-tsu"],
  ["katakana-so", "katakana-n"],
  ["hiragana-nu", "hiragana-me"],
  ["hiragana-re", "hiragana-wa"],
  ["hiragana-sa", "hiragana-ki"],
];
