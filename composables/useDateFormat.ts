import { differenceInDays, parseISO, format } from 'date-fns';

export default function useDateFormat(date: string) {
  const eventDate = format(date, "MMMM dd',' yyyy");
  
  return eventDate;
}
