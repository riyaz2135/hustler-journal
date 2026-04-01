export type AccountType = 'Phase1' | 'Phase2' | 'Funded' | 'Live' | 'Demo';
export type TradeResult = 'Win' | 'Loss' | 'Breakeven';
export type Direction = 'LONG' | 'SHORT';
export type Bias = 'Bullish' | 'Bearish' | 'Neutral';
export type Session = 'Asian' | 'London' | 'New York' | 'LDN-NY Overlap';

export interface Account {
  id: number;
  name: string;
  size: number;
  initialBalance: number;
  type: AccountType;
  broker: string;
  risk: number;
  days: number;
  maxDailyLoss?: number;
  maxTotalLoss?: number;
  profitTarget?: number;
  isSynced?: boolean;
  lastSync?: string;
}

export interface Trade {
  id: number;
  account: string;
  date: string;
  day: string;
  pair: string;
  session: Session;
  bias: Bias;
  dir: Direction;
  type: string;
  entry: number;
  exit: number;
  sl: number;
  tp: number;
  pnl: number;
  comm: number;
  size: number;
  risk: number;
  rrt: number;
  rra: number;
  result: TradeResult;
  entryTime: string;
  exitTime: string;
  htf: string;
  itf: string;
  ltf: string;
  biasNotes: string;
  htfNotes: string;
  itfNotes: string;
  ltfNotes: string;
  narr: string;
  model: string;
  psych: string;
  well: string;
  impr: string;
  psychNotes: string;
  rating: string;
  mistakes?: string[];
  confluences?: string[];
  shots: {
    htf: string | null;
    itf: string | null;
    ltf: string | null;
  };
  rules: {
    r1: boolean;
    r2: boolean;
    r3: boolean;
    r4: boolean;
    r5: boolean;
    r6: boolean;
    r7: boolean;
  };
  importedFromCSV?: boolean;
}
