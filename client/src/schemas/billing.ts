
export interface billing {
  id: number;
  description: string;
  unit_amount: number;
  user_id: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  type?: string | null;
  session_id?: string | null;
  date_created?: Date | null;
  date_paid?: Date | null;
}


