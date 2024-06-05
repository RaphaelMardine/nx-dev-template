export function removeFirstWord(phrase: string): string {
  const indexOfFirstSpace = phrase.indexOf(' ');
  if (indexOfFirstSpace !== -1) {
    return phrase.substring(indexOfFirstSpace + 1);
  }
  return phrase;
}
