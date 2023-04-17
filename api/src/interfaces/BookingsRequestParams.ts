export interface BookingsIdParams {
  id: string;
}

export interface BookingsRequestBody {
  engine_id: number;
  user_id: number;
  start_date: string;
  end_date: string;
}

export interface BookingsUpdateRequestBody {
  engine_id?: number;
  user_id?: number;
  start_date?: string;
  end_date?: string;
}
