import { differenceInDays, parseISO, format } from 'date-fns';

export default function useFormatDatepicker(date: string) {
  const targetDate = parseISO(date);
  const now = new Date();
  const eventDate = format(date, "MMMM dd',' yyyy");
  
  const totalDays = differenceInDays(targetDate, now);
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  let result = '';
  if (weeks > 0) {
    result += `${weeks} WEEKS`;
  }
  if (days > 0) {
    if (weeks > 0) result += ' & ';
    result += `${days} DAYS`;
  }

  if (weeks === 0 && days === 0) {
    return "It's today"  
  }

  result += ` UNTIL ${eventDate}`;

  return result;
}
