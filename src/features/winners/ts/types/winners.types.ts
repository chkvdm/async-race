export type Winner = {
  winnerId: number | null;
  winnerTime: string;
  winnerName: string;
};

export type WinnersPaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type ColumnSort = {
  id: string;
  desc: boolean;
};

export type Sorting = ColumnSort[];
