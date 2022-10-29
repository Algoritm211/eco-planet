export interface User {
  // Unique id or wallet
  accountId: string
  // Number of tokens for award in the end of month
  award: number
  // Number of bottles which was contributed
  contribution: number;
  // Name
  name: string
  // HERE QUESTIONG WHAT IT IS
  socialRating: number
}

export interface ContributionDTO {
  amount: number;
}
