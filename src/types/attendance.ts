export interface Attendance {
  id: number;
  quantity: number;
  total_points: number;
}

export interface AttendanceCancel {
  order_id: number;
  total_points: number;
}
