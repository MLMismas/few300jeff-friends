import { OptionListItem } from '.';

export interface FriendHoliday {
  id: string;
  name: string;
  nonCelebratedHolidays: OptionListItem[];
  celebratedHolidays: OptionListItem[];
}
