export enum WinnersSortParameters {
  WINS = 'wins',
  TIME = 'time',
}

export enum WinnersSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum WinnersLimits {
  PAGE_NUMBER_OFFSET = 1, // API pages start at 1, but in react table starts at 0
  PAGE_LIMIT = 10,
}

export enum WinnerWinsCountUpdater {
  WINS_COUNT_INCREMENT = 1,
}
