import { ICON } from '../assets';

export const getCardTypeIcon = (cardNumber: string) => {
  if (/^4/.test(cardNumber)) {
    return ICON.Visa; // Visa
  }
  if (/^5[1-5]/.test(cardNumber)) {
    return ICON.MasterCard; // MasterCard
  }
  if (/^6/.test(cardNumber)) {
    return ICON.Affirm; // Affirm
  }
  if (/^9/.test(cardNumber)) {
    return ICON.Alipay; // AlipayCard
  }
  if (/^(34|37)/.test(cardNumber)) {
    return ICON.DinersClub; // DinersClub
  }
  if (/^6(011|5)/.test(cardNumber)) {
    return ICON.Discover; // Discover
  }
  if (/^4[035]/.test(cardNumber)) {
    return ICON.Elo; // Elo
  }
  if (/^0x/.test(cardNumber)) {
    return ICON.Etherium; // Ethereum
  }
  if (/^6(?:011|5|4[23])/.test(cardNumber)) {
    return ICON.FaceBookPay; // FaceBookPay
  }
  if (/^9[0-9]/.test(cardNumber)) {
    return ICON.GiroPay; // GiroPay
  }
  if (/^(5[06789]|6[0-9])/.test(cardNumber)) {
    return ICON.GooglePay; // GooglePay
  }
  if (/^3(?:0[012345]|[68])/.test(cardNumber)) {
    return ICON.Ideal; // Ideal
  }
  if (/^(5[56]|6[37])/.test(cardNumber)) {
    return ICON.Interac; // Interac
  }
  if (/^(2131|1800|35)/.test(cardNumber)) {
    return ICON.Jcb; // JCB
  }
  if (/^(50|5[6-9]|6[0-9])/.test(cardNumber)) {
    return ICON.Maestro; // Maestro
  }
  if (/^6(?:011|5|4[23])/.test(cardNumber)) {
    return ICON.Payoneer; // Payoneer
  }
  if (/^4/.test(cardNumber)) {
    return ICON.Paypal; // Paypal
  }
  if (/^4[0-9]{6,}$/.test(cardNumber)) {
    return ICON.PaySafe; // PaySafe
  }
  if (/^6[0-9]{6,}$/.test(cardNumber)) {
    return ICON.Poli; // Poli
  }
  if (/^SEPA/.test(cardNumber)) {
    return ICON.Sepa; // SEPA
  }
  if (/^3[47]/.test(cardNumber)) {
    return ICON.Amex; // Amex
  }
  if (/^Apple Pay$/.test(cardNumber)) {
    return ICON.ApplePay; // ApplePay
  }
  if (/^Bitcoin$/.test(cardNumber)) {
    return ICON.Bitcoin; // Bitcoin
  }
  if (/^Bitcoin Cash$/.test(cardNumber)) {
    return ICON.BitcoinCash; // BitcoinCash
  }
  if (/^BitPay$/.test(cardNumber)) {
    return ICON.BitPay; // BitPay
  }
  if (/^CitaDele$/.test(cardNumber)) {
    return ICON.CitaDele; // CitaDele
  }
  if (/^Forbrugsforeningen$/.test(cardNumber)) {
    return ICON.ForBrugsforeningen; // Forbrugsforeningen
  }
  if (/^Klarna$/.test(cardNumber)) {
    return ICON.Klarna; // Klarna
  }
  if (/^Litecoin$/.test(cardNumber)) {
    return ICON.Lightcoin; // Litecoin
  }
  if (/^Qiwi$/.test(cardNumber)) {
    return ICON.Qiwi; // Qiwi
  }
  if (/^Skrill$/.test(cardNumber)) {
    return ICON.Skrill; // Skrill
  }
  if (/^Sofort$/.test(cardNumber)) {
    return ICON.Sofort; // Sofort
  }
  if (/^Stripe$/.test(cardNumber)) {
    return ICON.Stripe; // Stripe
  }
  if (/^WeChat$/.test(cardNumber)) {
    return ICON.WeChat; // WeChat
  }
  if (/^Yandex$/.test(cardNumber)) {
    return ICON.Yandex; // Yandex
  }
  if (/^Verifone$/.test(cardNumber)) {
    return ICON.Verifone; // Verifone
  }
  if (/^WebMoney$/.test(cardNumber)) {
    return ICON.WebMoney; // WebMoney
  }

  return ICON.CreditCard;
};
