import { format } from 'date-fns/format';
import { ptBR } from 'date-fns/locale/pt-BR';

export const newDate = (date: Date) => new Date(date);

export const formatDate = (date: Date) => {
  const formatedDate = format(newDate(date), 'dd/MM/yyyy', {
    locale: ptBR,
  }).toString();
  return formatedDate;
};

export const formatHoursAndMinutes = (date: Date) => {
  return format(newDate(date), "HH 'h' mm 'm'", { locale: ptBR });
};

export const formatTime = (date: Date) => {
  const formatedTime = format(newDate(date), 'HH:mm', {
    locale: ptBR,
  }).toString();

  return formatedTime;
};

export const formatTimeSeconds = (date: Date) => {
  const formatedTime = format(newDate(date), 'HH:mm:ss', {
    locale: ptBR,
  }).toString();

  return formatedTime;
};
