import { Profile } from '@/hooks/use-portafolio-data';

const DEFAULT_WHATSAPP_MESSAGE =
    'Hola, estuve revisando tu portafolio y me gustaría conversar contigo sobre una posible colaboración o proyecto de desarrollo de software. ¿Tienes disponibilidad para coordinar una reunión o llamada?';

export function buildWhatsappLink(profile: Profile | undefined): string | undefined {
    const whatsappNumber = profile?.phone?.replace(/\D/g, '');
    if (!whatsappNumber) return undefined;

    const message = profile?.whatsappMessage || DEFAULT_WHATSAPP_MESSAGE;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}