import type { WorkObj } from '@/types';

const work1: WorkObj = {
  id: 1,
  title: 'CONNECT 4',
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
  thumbnailX: 2860,
  thumbnailY: 2288,
} as const;

const work2: WorkObj = {
  id: 2,
  title: 'BLACKJACK',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/blackjack',
  codeUrl: 'https://github.com/Acha0203/BlackJack_Game',
  path: '/work/blackjack',
  siteUrl: 'https://acha0203.github.io/BlackJack_Game/',
  description: {
    ja: `コンピュータサイエンス学習プラットフォーム Recursion の課題として作成したトランプゲームです。スタート画面ではブラックジャックかポーカーを選択できるようになっていますが、現在のところブラックジャックのみ遊べます。

画面下の「HIT」ボタンをクリックするとカードを 1 枚引き、「STAND」ボタンをクリックすると、手持ちのカードでディーラーと勝負できます。カードの数字の合計が 21 以下でディーラーよりも大きな数字であればプレイヤーが勝利します。

最初のターンのみ「SURRENDER」ボタンをクリックすると降参できます。降参した場合は掛金の半分が戻ってきます。また、最初のターンのみ「DOUBLE」ボタンをクリックするとダブルプレイができます。掛金を 2 倍支払うことで、勝利した場合は配当が 2 倍になります。ただし、カードを 1 枚しか引けません。

チップが 0 になるか、カードがなくなるまでプレイできます。`,
    en: `This is a card game created as an assignment for the computer science learning platform Recursion. On the start screen, you can choose between Blackjack and Poker, but currently only Blackjack is available to play.

When you click the 'HIT' button at the bottom of the screen, you draw one card. When you click the 'STAND' button, you can compete with the dealer using the cards you have. If the total value of your cards is less than or equal to 21 and greater than the dealer's, the player wins.

Only on the first turn, you can click the 'SURRENDER' button to give up. If you surrender, half of your bet is returned. Also, only on the first turn, you can click the 'DOUBLE' button to play a double play. By paying double the bet, if you win, the payout is doubled. However, you can draw only one more card.

You can play until you run out of chips or run out of cards.
    `,
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'TypeScript、Next.js、Redux、Tailwind CSS などを使用して開発しました。',
    en: 'We developed this game with TypeScript, Next.js, Redux, Tailwind CSS, and so on.',
  },
  thumbnailX: 2070,
  thumbnailY: 1656,
} as const;

export const workList: WorkObj[] = [work1, work2];
