export interface ApiResponse<T> {
  result: T;
  hasNextPage?: boolean;
  nextPage?: number | null;
}
