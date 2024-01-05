import type { WorkObj } from '@/types';

const work1: WorkObj = {
  id: 1,
  title: 'Clicker Empire Game',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/clicker-empire-game',
  codeUrl: 'https://github.com/Acha0203/Clicker_Empire_Game',
  path: '/work/clicker-empire-game',
  siteUrl: 'https://acha0203.github.io/Clicker_Empire_Game/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成したクリッカー ゲームです。大富豪を夢見る二十歳の若者になり、ハンバーガーを作って貯めたお金で株や豪邸を買い、自分の帝国を築き上げていきます。`,
    en: `This is a clicker game created as an assignment for the computer science learning platform Recursion. You are a 20-year-old youth who dreams of becoming a millionaire. By making a lot of hamburgers, you make a fortune to purchase stocks, mansion, and more for building your own empire.`,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'JavaScript および Bootstrap を使用して開発しました。',
    en: 'I developed this app using JavaScript and Bootstrap.',
  },
  thumbnailX: 1000,
  thumbnailY: 620,
} as const;

const work2: WorkObj = {
  id: 2,
  title: 'Calculation App',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/calculation-app',
  codeUrl: 'https://github.com/Acha0203/Calculation_App',
  path: '/work/calculation-app',
  siteUrl: 'https://acha0203.github.io/Calculation_App/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成した計算機アプリです。小数点以下 5 位まで扱えます。

演算子の優先順位：

    1. ％、/、×
    2. +、-

優先順位が同じ場合は左側から計算します。`,
    en: `This is a calculator app created as an assignment for the computer science learning platform Recursion. It can handle up to five decimal places.

Operator priority:

1. ％、/、×
2. +、-

When the priority is the same, the calculation is performed from the left side.`,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'Vue.js を使用して開発しました。',
    en: 'I developed this app using Vue.js.',
  },
  thumbnailX: 456,
  thumbnailY: 700,
} as const;

const work3: WorkObj = {
  id: 3,
  title: 'Task Management App',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/task-management-app',
  codeUrl: 'https://github.com/Acha0203/Task_Management_App',
  path: '/work/task-management-app',
  siteUrl: 'https://acha0203.github.io/Task_Management_App/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成したタスク管理アプリです。
最初に「ADD SECTION」ボタンをクリックしてセクションを追加します。セクション列の左下にある「+」をクリックするとタスク入力欄を追加できます。セクションまたはタスクを削除するには、ゴミ箱のアイコンをクリックします。なお、各タスクはドラッグ＆ドロップで自由に移動できます。`,
    en: `This is a task management app created as an assignment for the computer science learning platform Recursion.
First, click the 'ADD SECTION' button to add a section. Click the '+' at the bottom left of the section column to add a task input field. To delete a section or task, click the trash can icon. Each task can be freely moved by drag and drop.`,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'Vue.js および Vue Draggable を使用して開発しました。',
    en: 'I developed this app using Vue.js and Vue Draggable.',
  },
  thumbnailX: 1000,
  thumbnailY: 857,
} as const;

const work4: WorkObj = {
  id: 4,
  title: 'Countdown Timer',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/countdown-timer',
  codeUrl: 'https://github.com/Acha0203/Countdown_Timer',
  path: '/work/countdown-timer',
  siteUrl: 'https://acha0203.github.io/Countdown_Timer/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成したカウントダウンタイマーです。ささやかなアプリケーションですが Atomic Design を起用しました。`,
    en: `This is a countdown timer that I created as an assignment for the computer science learning platform Recursion. Although it is a small application, I developed it using Atomic Design.`,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'React.js、TypeScript、Tailwind CSS を使用して開発しました。',
    en: 'I developed this app using React.js, TypeScript, Tailwind CSS, and so on.',
  },
  thumbnailX: 1000,
  thumbnailY: 722,
} as const;

const work5: WorkObj = {
  id: 5,
  title: 'Online Dating App',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/online-dating-app',
  codeUrl: 'https://github.com/Acha0203/Online_Dating_App',
  path: '/work/online-dating-app',
  siteUrl: 'https://acha0203.github.io/Online_Dating_App/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成したオンライン チャット アプリです。「MESSAGE」ボタンをクリックすると、AI 相手に簡単な会話を楽しめます。`,
    en: `This is an online chat application created as an assignment for the computer science learning platform Recursion. When you click the 'MESSAGE' button, you can enjoy a simple conversation with an AI.`,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'Vue.js、Vuex、そしてリクルートが提供している AI サービス A3RT の Talk API を使用して開発しました。',
    en: 'I developed this app using Vue.js, Vuex, and the Talk API from A3RT, an AI service provided by Recruit.',
  },
  thumbnailX: 1000,
  thumbnailY: 842,
} as const;

const work6: WorkObj = {
  id: 6,
  title: 'Computer Builder',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/computer-builder',
  codeUrl: 'https://github.com/Acha0203/Computer_Builder',
  path: '/work/computer-builder',
  siteUrl: 'https://acha0203.github.io/Computer_Builder/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成した自作コンピュータのスペック計算機です。ささやかなアプリケーションですがデザインに力を入れました。`,
    en: `This is a custom computer specification calculator created as an assignment for the computer science learning platform Recursion. It is a small application, but I put effort into its design.`,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'React.js、TypeScript、Material UI などを使用して開発しました。',
    en: 'I developed this app using React.js, TypeScript, Material UI, and so on.',
  },
  thumbnailX: 1000,
  thumbnailY: 902,
} as const;

const work7: WorkObj = {
  id: 7,
  title: 'Connect 4',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/connect-4',
  codeUrl: 'https://github.com/TeamE-React/connect-4',
  path: '/work/connect-4',
  siteUrl: 'https://teame-connect4.vercel.app/',
  description: {
    ja: `コネクト 4 は、2 人のプレイヤーが交互に色のついたディスクを上から列に落としていくターン制のゲームです。ディスクはまっすぐ下に落ち、列の中の次の空きスペースに入ります。相手よりも早く自分のディスクを 4 つ連続で縦、横、または斜めに揃えたプレイヤーが勝利します。`,
    en: `Connect 4 is a turn-based game where two players take turns dropping colored disks from the top into a column. The disk will fall straight down towards the next available space within the column. The aim of each player is to be the first to form a vertical, horizontal, or diagonal line of four of one's own disks.`,
  },
  supplement: {
    ja: `このゲームはモンテカルロ木探索（MCTS）アルゴリズムを用いて AI 対戦を実装しています。このアルゴリズムの背景にある考え方は、可能な手の検索ツリーを構築し、それぞれを複数回シミュレートして期待される結果を決定するというものです。つまり、すべての可能なゲームを探索するのではなく、最も有望なルートのみを選択することが可能になります。`,
    en: `We implemented an agent using a Monte Carlo Tree Search (MCTS) algorithm. The idea behind this algorithm is to build a search tree of possible move sequences and simulates each one multiple times to determine the expected outcome. (Instead of exploring all the possible games, only the most promising routes are chosen).`,
  },
  technology: {
    ja: 'Next.js、Material UI などを使用して開発しました。',
    en: 'We developed this game with Next.js, Material UI, and so on.',
  },
  thumbnailX: 1000,
  thumbnailY: 800,
} as const;

const work8: WorkObj = {
  id: 8,
  title: 'BlackJack',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/blackjack',
  codeUrl: 'https://github.com/Acha0203/BlackJack_Game',
  path: '/work/blackjack',
  siteUrl: 'https://acha0203.github.io/BlackJack_Game/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成したトランプゲームです。スタート画面ではブラックジャックかポーカーを選択できるようになっていますが、現在のところブラックジャックのみ遊べます。

画面下の「HIT」ボタンをクリックするとカードを 1 枚引き、「STAND」ボタンをクリックすると、手持ちのカードでディーラーと勝負できます。カードの数字の合計が 21 以下でディーラーよりも大きな数字であればプレイヤーが勝利します。

最初のターンのみ「SURRENDER」ボタンをクリックすると降参できます。降参した場合は掛金の半分が戻ってきます。また、最初のターンのみ「DOUBLE」ボタンをクリックするとダブル プレイができます。掛金を 2 倍支払うことで、勝利した場合は配当が 2 倍になります。ただし、カードを 1 枚しか引けません。

チップが 0 になるか、カードがなくなるまでプレイできます。`,
    en: `This is a card game created as an assignment for the computer science learning platform Recursion. On the start screen, you can choose between Blackjack and Poker, but currently only Blackjack is available to play.

When you click the 'HIT' button at the bottom of the screen, you draw one card. When you click the 'STAND' button, you can compete with the dealer using the cards you have. If the total value of your cards is less than or equal to 21 and greater than the dealer's, the player wins.

Only on the first turn, you can click the 'SURRENDER' button to give up. If you surrender, half of your bet is returned. Also, only on the first turn, you can click the 'DOUBLE' button to play a double play. By paying double the bet, if you win, the payout is doubled. However, you can draw only one more card.

You can play until you run out of chips or run out of cards. Good luck!
    `,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'TypeScript、Next.js、Redux、Tailwind CSS などを使用して開発しました。',
    en: 'I developed this game with TypeScript, Next.js, Redux, Tailwind CSS, and so on.',
  },
  thumbnailX: 1000,
  thumbnailY: 800,
} as const;

export const workList: WorkObj[] = [work1, work2, work3, work4, work5, work6, work7, work8];
