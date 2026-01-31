export function waMeLink(whatsapp: string): string {
  // wa.me requires digits only, typically with country code.
  const digits = whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}
