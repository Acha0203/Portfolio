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
    ja: `このゲームはモンテカルロ木探索（MCTS）アルゴリズムを用いて AI 対戦を実装しています。このアルゴリズムの背景にある考え方は、可能な手の検索ツリーを構築し、それぞれを複数回シミュレートして期待される結果を決定するというものです。つまり、すべての可能なゲームを探索するのではなく、最も有望なルートのみを選択するという事が可能になります。`,
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
  title: 'BLACKJjaK',
  thumbnailUrl: 'https://acha0203.github.io/Portfolio/images/Work_Images/blackjack',
  codeUrl: 'https://github.com/Acha0203/BlackJack_Game',
  path: '/work/blackjack',
  siteUrl: 'https://acha0203.github.io/BlackJack_Game/',
  description: {
    ja: '',
    en: '',
  },
  supplement: {
    ja: '',
    en: '',
  },
  technology: {
    ja: 'Next.js、Redux',
    en: 'Next.js, Redux',
  },
  thumbnailX: 2070,
  thumbnailY: 1656,
} as const;

export const workList: WorkObj[] = [work1, work2];
