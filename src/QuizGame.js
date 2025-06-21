import React, { useState, useEffect } from 'react';
import { Shuffle, CheckCircle, XCircle, RotateCcw, Star, Trophy, Zap } from 'lucide-react';

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [animateScore, setAnimateScore] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const allQuestions = [
    // 基本情報
    {
      question: "FOLの正式名称は？",
      options: ["エフ・オー・ロジスティクス株式会社", "エフ・オー・リード株式会社", "フル・オペレーション・ロジスティクス", "ファースト・オーダー・ロジスティクス"],
      correct: 0,
      category: "基本情報"
    },
    {
      question: "FOPの正式名称は？",
      options: ["株式会社エフ・オー・プロジェクト", "株式会社エフ・オー・プランニング", "エフ・オー・プロダクション", "フューチャー・オペレーション・プランニング"],
      correct: 1,
      category: "基本情報"
    },
    {
      question: "FOLの設立年は？",
      options: ["2013年", "2014年", "2015年", "2016年"],
      correct: 2,
      category: "基本情報"
    },
    {
      question: "FOLの設立月は？",
      options: ["7月", "8月", "9月", "10月"],
      correct: 2,
      category: "基本情報"
    },
    {
      question: "FOPの設立年は？",
      options: ["1985年", "1986年", "1987年", "1988年"],
      correct: 2,
      category: "基本情報"
    },
    {
      question: "FOPの設立月は？",
      options: ["8月", "9月", "10月", "11月"],
      correct: 2,
      category: "基本情報"
    },
    {
      question: "FOLは現在何年目？",
      options: ["12年目", "11年目", "9年目", "10年目"],
      correct: 1,
      category: "基本情報"
    },
    {
      question: "FOPは現在何年目？",
      options: ["35年目", "36年目", "38年目", "39年目"],
      correct: 2,
      category: "基本情報"
    },

    // 経営情報
    {
      question: "FOLの単年売上高は？",
      options: ["約60億円", "約70億円", "約80億円", "約90億円"],
      correct: 2,
      category: "経営情報"
    },
    {
      question: "FOPの単年売上高は？",
      options: ["約90億円", "約100億円", "約110億円", "約120億円"],
      correct: 2,
      category: "経営情報"
    },

    // 人事情報
    {
      question: "FOP、FOLの社長は？",
      options: ["岡本 力 社長", "宮崎 社長", "望月 社長", "野口 社長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "FOLの本部長は？",
      options: ["望月本部長", "宮崎本部長", "岡本本部長", "野口本部長"],
      correct: 1,
      category: "人事情報"
    },
    {
      question: "FOPの本部長は？",
      options: ["宮崎本部長", "望月本部長", "岡本本部長", "野口本部長"],
      correct: 1,
      category: "人事情報"
    },
    {
      question: "FOP営業本部長は？",
      options: ["岡本祐輔本部長", "岡本浩太郎本部長", "野口本部長", "望月本部長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "FOP業務本部長は？",
      options: ["岡本祐輔本部長", "岡本浩太郎本部長", "野口本部長", "望月本部長"],
      correct: 1,
      category: "人事情報"
    },
    {
      question: "FOP統括本部長は？",
      options: ["野口本部長", "望月本部長", "岡本祐輔本部長", "岡本浩太郎本部長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "FOP第一営業部統括は？",
      options: ["井上部長", "石渡部長", "大西部長", "品村部長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "FOP北日本事業部長は？",
      options: ["松沢部長", "小林部長", "田淵部長", "細野部長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "FOP第二営業部統括は？",
      options: ["井上部長", "石渡部長", "大西部長", "品村部長"],
      correct: 1,
      category: "人事情報"
    },
    {
      question: "FOP第二営業部長は？",
      options: ["井上部長", "石渡部長", "大西部長", "品村部長"],
      correct: 2,
      category: "人事情報"
    },
    {
      question: "FOP第一営業部長は？",
      options: ["井上部長", "石渡部長", "大西部長", "品村部長"],
      correct: 3,
      category: "人事情報"
    },
    {
      question: "FOP西日本事業部長は？",
      options: ["松沢部長", "小林部長", "田淵部長", "細野部長"],
      correct: 1,
      category: "人事情報"
    },
    {
      question: "FOP西日本事業部統括は？",
      options: ["松沢部長", "小林部長", "田淵部長", "細野部長"],
      correct: 2,
      category: "人事情報"
    },
    {
      question: "FOP人材開発部長は？",
      options: ["松沢部長", "小林部長", "田淵部長", "細野部長"],
      correct: 3,
      category: "人事情報"
    },
    {
      question: "YAC担当の課長は？",
      options: ["伊藤課長", "石井課長", "青木課長", "齋藤課長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "YACグループを統括している部長は？",
      options: ["井上部長", "石渡部長", "大西部長", "品村部長"],
      correct: 1,
      category: "人事情報"
    },
    {
      question: "YAC全体を統括している本部長は？",
      options: ["岡本祐輔本部長", "岡本浩太郎本部長", "野口本部長", "望月本部長"],
      correct: 0,
      category: "人事情報"
    },
    {
      question: "FOL事務担当は？",
      options: ["黒川さん", "白川さん", "青川さん", "赤川さん"],
      correct: 0,
      category: "人事情報"
    },
    {
    "question": "FOL の本部長である宮崎本部長は取締役ですか？",
    "options": ["はい", "いいえ", "執行役員", "監査役"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOL の本部長である望月本部長は取締役ですか？",
    "options": ["はい", "いいえ", "執行役員", "顧問"],
    "correct": 1,
    "category": "役職"
  },
  {
    "question": "FOP の営業本部長である岡本祐輔本部長は取締役ですか？",
    "options": ["はい", "いいえ", "執行役員", "本部長のみ"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOP 業務本部長の岡本浩太郎本部長は取締役ですか？",
    "options": ["はい", "いいえ", "執行役員", "該当なし"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOP 統括本部長の野口本部長は取締役ですか？",
    "options": ["はい", "いいえ", "執行役員", "部長"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOP 第一営業部統括の井上部長は執行役員ですか？",
    "options": ["はい", "いいえ", "取締役", "本部長"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOP 第二営業部統括の石渡部長は執行役員ですか？",
    "options": ["はい", "いいえ", "取締役", "統括部長"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOP 西日本事業部統括の田淵部長は執行役員ですか？",
    "options": ["はい", "いいえ", "取締役", "事業部長"],
    "correct": 0,
    "category": "役職"
  },
  {
    "question": "FOP の支店で、目黒本社以外に6支店あります。その中に含まれない支店は？",
    "options": ["札幌", "東北", "岡山", "福岡"],
    "correct": 2,
    "category": "会社情報"
  },
  {
    "question": "FOL の本社側には宮崎本部長、望月本部長の他に事務で誰が在籍していますか？",
    "options": ["田中さん", "黒川さん", "山田さん", "鈴木さん"],
    "correct": 1,
    "category": "会社情報"
  },
  {
    "question": "FOP の YAC 担当で、主任は誰ですか？",
    "options": ["伊藤課長", "石井主任", "青木主任", "齋藤さん"],
    "correct": 1,
    "category": "現場情報"
  },

    // 取引先情報（ヨドバシカメラ）
    {
      question: "ヨドバシカメラの正式名称は？",
      options: ["ヨドバシカメラ株式会社", "株式会社ヨドバシカメラ", "ヨドバシカメラ商事", "ヨドバシカメラグループ"],
      correct: 1,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの従業員数は約何人？",
      options: ["約4000人", "約5000人", "約6000人", "約7000人"],
      correct: 1,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの創立年は？",
      options: ["1958年", "1959年", "1960年", "1961年"],
      correct: 2,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの創立月は？",
      options: ["3月", "4月", "5月", "6月"],
      correct: 1,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラは今年何年目？",
      options: ["63年目", "64年目", "65年目", "66年目"],
      correct: 3,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの会長は？",
      options: ["藤沢昭和会長", "藤沢和則会長", "日野会長", "山本会長"],
      correct: 0,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの社長は？",
      options: ["藤沢昭和社長", "藤沢和則社長", "日野社長", "山本社長"],
      correct: 1,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの専務は？",
      options: ["藤沢専務", "日野専務", "山本専務", "田中専務"],
      correct: 1,
      category: "取引先情報"
    },
    {
      question: "ヨドバシカメラの店舗数は全国で何店舗？",
      options: ["22店舗", "23店舗", "24店舗", "25店舗"],
      correct: 2,
      category: "取引先情報"
    },
    {
    "question": "ヨドバシカメラで使用している行動4原則の一つは？",
    "options": ["迅速対応", "大きな声で", "チームワーク", "顧客第一"],
    "correct": 1,
    "category": "ヨドバシ情報"
  },
  {
    "question": "ヨドバシカメラ行動3原則の一つで「全て行動に○○、○○、○○をつけ、自分の立場をわきまえ考え行動」の○○は？",
    "options": ["顧客満足、法令遵守、地に足をつけて念には念を入れ", "迅速対応、正確処理、顧客対応", "効率重視、品質向上、チームワーク", "安全第一、環境配慮、コスト意識"],
    "correct": 0,
    "category": "ヨドバシ情報"
  },

    // 現場情報
    {
      question: "YAC川崎の所長は？",
      options: ["山本所長", "山本泰正所長", "瀧野瀬所長", "長岡所長"],
      correct: 1,
      category: "現場情報"
    },
    {
      question: "YAC川崎の副所長は？",
      options: ["瀧野瀬副所長", "高橋副所長", "山本副所長", "田中副所長"],
      correct: 0,
      category: "現場情報"
    },
    {
      question: "YAC川崎の副所長は？",
      options: ["鈴木副所長", "長岡副所長", "山本副所長", "田中副所長"],
      correct: 1,
      category: "現場情報"
    },
    {
      question: "山本所長のヨドバシカメラ内での役職は？",
      options: ["取締役物流本部長", "常務取締役物流本部長", "専務取締役物流本部長", "執行役員物流本部長"],
      correct: 1,
      category: "現場情報"
    },
    {
      question: "川崎1階のフロア長は？",
      options: ["堀フロア長", "船木フロア長", "美澤フロア長", "進藤フロア長"],
      correct: 0,
      category: "現場情報"
    },
    {
      question: "川崎2階のフロア長は？",
      options: ["堀フロア長", "船木フロア長", "美澤フロア長", "進藤フロア長"],
      correct: 1,
      category: "現場情報"
    },
    {
      question: "川崎3階のフロア長は？",
      options: ["堀フロア長", "船木フロア長", "美澤フロア長", "進藤フロア長"],
      correct: 2,
      category: "現場情報"
    },
    {
      question: "川崎4階のフロア長は？",
      options: ["堀フロア長", "船木フロア長", "美澤フロア長", "進藤フロア長"],
      correct: 3,
      category: "現場情報"
    },
    {
      question: "YAC六甲の所長は？",
      options: ["竹下所長", "直島所長", "山本所長", "田中所長"],
      correct: 0,
      category: "現場情報"
    },
    {
      question: "YAC桑名の所長は？",
      options: ["竹下所長", "直島所長", "山本所長", "田中所長"],
      correct: 1,
      category: "現場情報"
    },
    {
      question: "現在稼働している物流倉庫は？",
      options: ["YAC川崎、YAC六甲", "YAC川崎、YAC桑名", "YAC川崎、YAC六甲、YAC桑名", "YAC川崎、YAC六甲、YAC名古屋"],
      correct: 2,
      category: "現場情報"
    },
    {
      question: "YACで週3勤務のスタッフは何人？",
      options: ["2人", "3人", "4人", "5人"],
      correct: 1,
      category: "現場情報"
    },
    {
      question: "YACで週4勤務のスタッフは約何人？",
      options: ["約120人", "約130人", "約140人", "約150人"],
      correct: 2,
      category: "現場情報"
    },
    {
      question: "YACの女性スタッフは約何人？",
      options: ["約300人", "約320人", "約330人", "約350人"],
      correct: 2,
      category: "現場情報"
    },
    {
      question: "YACの日勤女性スタッフは約何人？",
      options: ["約210人", "約220人", "約230人", "約240人"],
      correct: 2,
      category: "現場情報"
    },
    {
      question: "YACの夜勤女性スタッフは約何人？",
      options: ["約90人", "約100人", "約110人", "約120人"],
      correct: 1,
      category: "現場情報"
    },
    {
    "question": "タフガード大の箱サイズは？",
    "options": ["60サイズ", "80サイズ", "100サイズ", "120サイズ"],
    "correct": 1,
    "category": "サイズ情報"
  },
  {
    "question": "PL02の箱サイズは？",
    "options": ["60サイズ", "80サイズ", "100サイズ", "120サイズ"],
    "correct": 2,
    "category": "サイズ情報"
  },
  {
    "question": "エクストリーム拠点「平井」の拠点コードは？",
    "options": ["10", "18", "50", "30"],
    "correct": 2,
    "category": "拠点情報"
  },
  {
    "question": "エクストリーム拠点「YAC川崎」の拠点コードは？",
    "options": ["29", "40", "90", "27"],
    "correct": 2,
    "category": "拠点情報"
  },
  {
    "question": "現在、引き渡している配送業者がエクストリーム以外で何社ありますか？",
    "options": ["8社", "9社", "10社", "12社"],
    "correct": 2,
    "category": "配送業者"
  },
  {
    "question": "オリコンの赤色の利用区別は何ですか？",
    "options": ["オーダーピック", "マテハン関連", "補充積載", "仕分け"],
    "correct": 2,
    "category": "現場情報"
  },
  {
    "question": "オリコンの青色の利用区別は何ですか？",
    "options": ["補充積載", "マテハン関連", "オーダーピック", "検品"],
    "correct": 2,
    "category": "現場情報"
  },
  {
    "question": "派遣会社がFOLに派遣している人数順で上位10社の一つは？",
    "options": ["FOP", "エイブル", "テンキ", "ウィル"],
    "correct": 0,
    "category": "派遣会社"
  },
  {
    "question": "現在、取引をしている派遣会社は全部で何社ありますか？",
    "options": ["20社", "30社", "34社", "40社"],
    "correct": 2,
    "category": "派遣会社"
  },
  {
    "question": "日勤帯のヤマトの締め時間は何時ですか？",
    "options": ["10:30", "13:00", "17:00", "19:00"],
    "correct": 0,
    "category": "締め時間"
  },
  {
    "question": "日勤帯の佐川の地方便の締め時間は何時ですか？",
    "options": ["13:00", "17:00", "19:00", "22:00"],
    "correct": 1,
    "category": "締め時間"
  },
  {
    "question": "夜勤帯の群馬、栃木、茨城、山梨の締め時間は何時ですか？",
    "options": ["22:00", "23:00", "23:30", "4:00"],
    "correct": 1,
    "category": "締め時間"
  },
  {
    "question": "夜勤帯の神奈川、千葉、埼玉、東京23区以外と23区の一部地域の締め時間は何時ですか？",
    "options": ["23:00", "23:30", "4:00", "5:00"],
    "correct": 1,
    "category": "締め時間"
  },

    // アクセス情報
    {
      question: "川崎駅からYACに来る際のバス乗り場は何番？",
      options: ["14番", "15番", "16番", "17番"],
      correct: 2,
      category: "アクセス情報"
    },
    {
      question: "川崎駅から乗るバスの行き先は？",
      options: ["浮島バスターミナル", "川崎埠頭", "東扇島", "羽田空港"],
      correct: 0,
      category: "アクセス情報"
    },
    {
      question: "YAC川崎最寄りのバス停は？",
      options: ["県営埋立地入口", "川崎埠頭入口", "浮島入口", "東扇島入口"],
      correct: 0,
      category: "アクセス情報"
    },
    {
      question: "バス停からYACまでの徒歩時間は？",
      options: ["約3分", "約5分", "約7分", "約10分"],
      correct: 1,
      category: "アクセス情報"
    },

    // 店舗情報
    {
      question: "新宿西口店の店舗番号は？",
      options: ["10", "11", "12", "13"],
      correct: 1,
      category: "店舗情報"
    },
    {
      question: "新宿東口店の店舗番号は？",
      options: ["11", "12", "13", "14"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "Akiba店の店舗番号は？",
      options: ["16", "17", "18", "19"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "錦糸町店の店舗番号は？",
      options: ["21", "22", "23", "24"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "上野店の店舗番号は？",
      options: ["23", "24", "25", "26"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "町田店の店舗番号は？",
      options: ["25", "26", "27", "28"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "八王子店の店舗番号は？",
      options: ["26", "27", "28", "29"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "吉祥寺店の店舗番号は？",
      options: ["27", "28", "29", "30"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "さいたま新都心店の店舗番号は？",
      options: ["29", "30", "31", "32"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "横浜店の店舗番号は？",
      options: ["31", "32", "33", "34"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "川崎ルフロン店の店舗番号は？",
      options: ["32", "33", "34", "35"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "上大岡店の店舗番号は？",
      options: ["35", "36", "37", "38"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "千葉店の店舗番号は？",
      options: ["36", "37", "38", "39"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "札幌店の店舗番号は？",
      options: ["66", "67", "68", "69"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "川崎アウトレット店の店舗番号は？",
      options: ["70", "71", "72", "73"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "梅田店の店舗番号は？",
      options: ["79", "80", "81", "82"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "京都店の店舗番号は？",
      options: ["81", "82", "83", "84"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "名古屋店の店舗番号は？",
      options: ["83", "84", "85", "86"],
      correct: 2,
      category: "店舗情報"
    },
    {
      question: "博多店の店舗番号は？",
      options: ["86", "87", "88", "89"],
      correct: 2,
      category: "店舗情報"
    },

    // 支店情報
    {
      question: "FOPの目黒本社以外の支店数は？",
      options: ["5支店", "6支店", "7支店", "8支店"],
      correct: 1,
      category: "基本情報"
    },
    {
      question: "FOPの支店に含まれるのは？",
      options: ["札幌支店", "北海道支店", "道央支店", "函館支店"],
      correct: 0,
      category: "支店情報"
    },
    {
      question: "FOPの支店に含まれるのは？",
      options: ["仙台支店", "東北支店", "青森支店", "秋田支店"],
      correct: 1,
      category: "支店情報"
    },
    {
      question: "FOPの支店に含まれるのは？",
      options: ["大阪支店", "関西支店", "兵庫支店", "神戸支店"],
      correct: 1,
      category: "支店情報"
    },
    {
      question: "FOPの支店に含まれるのは？",
      options: ["九州支店", "福岡支店", "博多支店", "熊本支店"],
      correct: 1,
      category: "支店情報"
    },
    {
      question: "FOPの支店に含まれるのは？",
      options: ["京都支店", "滋賀支店", "奈良支店", "和歌山支店"],
      correct: 0,
      category: "支店情報"
    },
    {
      question: "FOPの支店に含まれるのは？",
      options: ["愛知支店", "中部支店", "名古屋支店", "岐阜支店"],
      correct: 2,
      category: "支店情報"
    },
    {
    "question": "労働基準法で定められている有給の発生に関して、勤続6ヶ月で付与される日数は？",
    "options": ["5日", "10日", "11日", "12日"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "労働基準法で定められている有給の発生に関して、勤続1年6ヶ月で付与される日数は？",
    "options": ["10日", "11日", "12日", "14日"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "発生した有給は発生日から何年間で消滅しますか？",
    "options": ["1年間", "2年間", "3年間", "4年間"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "最終的に一度に保有できる有給日数は最大で何日分ですか？",
    "options": ["20日", "30日", "40日", "50日"],
    "correct": 2,
    "category": "労働基準法"
  },
  {
    "question": "派遣法の3年ルールとはどのようなものですか？",
    "options": ["同じ派遣先に5年までしかいられない", "派遣として働ける期間が最大3年", "同じ派遣先に3年までしかいられない", "派遣社員は3年で正社員に移行する"],
    "correct": 2,
    "category": "労働基準法"
  },
  {
    "question": "労働契約法の5年ルールとはどのようなものですか？",
    "options": ["有期雇用で同じ会社に3年所属した場合、無期に変更できる", "有期雇用で同じ会社に5年所属した場合、本人が申し出れば無期に変更できる", "有期雇用は最大5年までしか契約できない", "契約社員は5年で正社員に移行する"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "労働基準法で定められている深夜とは何時〜何時ですか？",
    "options": ["20時〜4時", "21時〜5時", "22時〜5時", "23時〜6時"],
    "correct": 2,
    "category": "労働基準法"
  },
  {
    "question": "1日の勤務時間が6時間以内は休憩を付与する義務がありますか？",
    "options": ["はい", "いいえ", "状況による", "会社規定による"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "6時間超え〜8時間以内の勤務では何分以上の休憩付与が義務付けられていますか？",
    "options": ["30分", "45分", "60分", "90分"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "8時間を超えての勤務では何分以上の休憩付与が義務付けられていますか？",
    "options": ["45分", "60分", "75分", "90分"],
    "correct": 1,
    "category": "労働基準法"
  },
  {
    "question": "OJT は何の略ですか？",
    "options": ["Original Job Training", "On the Job Test", "On the Job Training", "Operation Job Task"],
    "correct": 2,
    "category": "ビジネス用語"
  },
  {
    "question": "PDCA の P は何の略ですか？",
    "options": ["Practice", "Plan", "Perform", "Process"],
    "correct": 1,
    "category": "ビジネス用語"
  },
  {
    "question": "PDCA の C は何の略ですか？",
    "options": ["Control", "Complete", "Check", "Create"],
    "correct": 2,
    "category": "ビジネス用語"
  },
  {
    "question": "5S の項目に「整理」以外で当てはまるのは？",
    "options": ["清掃", "正確", "迅速", "効率"],
    "correct": 0,
    "category": "ビジネス用語"
  },
  {
    "question": "5W1H の H は何の略ですか？",
    "options": ["Where", "Why", "How", "Who"],
    "correct": 2,
    "category": "ビジネス用語"
  },

    // 実務知識
    {
      question: "ジフィ１の箱サイズは？",
      options: ["60サイズ", "80サイズ", "100サイズ", "120サイズ"],
      correct: 0,
      category: "実務知識"
    }
  ]; // <-- Close the allQuestions array here

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD93D'];
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 360
      });
    }
    setConfetti(newConfetti);
  };

  const initializeGame = () => {
    const shuffledQuestions = shuffleArray(allQuestions).slice(0, 20);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setConfetti([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (confetti.length > 0) {
      const timer = setInterval(() => {
        setConfetti(prev => prev.map(piece => ({
          ...piece,
          y: piece.y + piece.speed,
          rotation: piece.rotation + 5
        })).filter(piece => piece.y < 110));
      }, 50);
      return () => clearInterval(timer);
    }
  }, [confetti]);

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
      setAnimateScore(true);
      setTimeout(() => setAnimateScore(false), 600);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
      createConfetti();
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return '🎉 素晴らしい！完璧に近い成績です！';
    if (percentage >= 80) return '⭐ とても良い成績です！';
    if (percentage >= 70) return '👍 良い成績です！';
    if (percentage >= 60) return '📚 まずまずの成績です。復習しましょう。';
    return '💪 もう一度研修資料を確認して再挑戦しましょう。';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '基本情報': 'bg-blue-500',
      '経営情報': 'bg-purple-500',
      '人事情報': 'bg-green-500',
      '取引先情報': 'bg-orange-500',
      '現場情報': 'bg-red-500',
      'アクセス情報': 'bg-cyan-500',
      '実務知識': 'bg-pink-500',
      '法的知識': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="text-2xl text-white animate-pulse">
          <Zap className="inline-block mr-2 animate-spin" size={32} />
          問題を準備中...
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti */}
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="absolute animate-bounce"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              transform: `rotate(${piece.rotation}deg)`,
              borderRadius: '50%'
            }}
          />
        ))}
        
        <div className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className="mb-6">
              <Trophy className="mx-auto text-yellow-500 animate-bounce" size={80} />
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              クイズ完了！
            </h2>
            <div className="mb-6">
              <div className={`text-8xl font-bold mb-4 ${getScoreColor(score, questions.length)} animate-pulse`}>
                {score}/{questions.length}
              </div>
              <div className="text-2xl text-gray-600 mb-4">
                正答率: <span className="font-bold text-3xl">{percentage}%</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                      percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      percentage >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="text-xl text-gray-700 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                {getScoreMessage(score, questions.length)}
              </div>
            </div>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <RotateCcw size={24} />
              もう一度挑戦
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FOL社員確認テスト
              </h1>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full">
                <Shuffle size={20} className="animate-spin" />
                <span className="font-medium">シャッフル済み</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold text-gray-700">
                  問題 <span className="text-2xl text-purple-600">{currentQuestion + 1}</span> / {questions.length}
                </div>
                <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(currentQ.category)}`}>
                  {currentQ.category}
                </div>
              </div>
              <div className={`text-lg font-semibold flex items-center gap-2 ${animateScore ? 'animate-bounce' : ''}`}>
                <Star className="text-yellow-500" size={20} />
                <span className="text-gray-700">正解数: </span>
                <span className="text-2xl text-green-600">{score}</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-l-4 border-blue-500">
              {currentQ.question}
            </h2>
            
            <div className="grid gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-lg'
                      : selectedAnswer === index
                        ? index === currentQ.correct
                          ? 'border-green-400 bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-lg'
                          : 'border-red-400 bg-gradient-to-r from-red-100 to-red-200 text-red-800 shadow-lg'
                        : index === currentQ.correct
                          ? 'border-green-400 bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-lg'
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      selectedAnswer === null ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                      selectedAnswer === index && index === currentQ.correct ? 'bg-green-500' :
                      selectedAnswer === index ? 'bg-red-500' :
                      index === currentQ.correct ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {showResult && selectedAnswer === index && (
                      index === currentQ.correct ? (
                        <CheckCircle className="text-green-600 animate-bounce" size={28} />
                      ) : (
                        <XCircle className="text-red-600 animate-bounce" size={28} />
                      )
                    )}
                    {showResult && index === currentQ.correct && selectedAnswer !== index && (
                      <CheckCircle className="text-green-600 animate-bounce" size={28} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                {currentQuestion < questions.length - 1 ? '次の問題へ →' : '結果を見る 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;