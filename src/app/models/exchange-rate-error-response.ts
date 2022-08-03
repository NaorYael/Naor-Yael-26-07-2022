export interface ExchangeRateErrorResponse {
    error: {
        error: {
          code: string;
          message: string;
          details?: string;
        }
    }

}
