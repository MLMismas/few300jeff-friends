export interface DashboardModel {
  holidayId: string;
  holidayName: string;
  friends: {
    id: string;
    name: string;
  }[];
}
