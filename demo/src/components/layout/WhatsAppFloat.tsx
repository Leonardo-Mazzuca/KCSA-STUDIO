import { site } from "@/data/site";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-7"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2.5A9.46 9.46 0 0 0 2.6 11.9c0 1.67.44 3.3 1.27 4.74L2.5 21.5l5.02-1.32a9.48 9.48 0 0 0 4.52 1.15h.01a9.46 9.46 0 0 0 0-18.83Zm0 17.32h-.01a7.86 7.86 0 0 1-4-.97l-.29-.17-2.98.78.8-2.9-.19-.3a7.85 7.85 0 1 1 6.67 3.56Zm4.31-5.88c-.24-.12-1.4-.69-1.61-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.32-1.64-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.4-.57 1.6-1.13.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={site.contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`${site.contact.whatsappLabel} no WhatsApp`}
      className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 inline-flex size-16 items-center justify-center overflow-hidden rounded-full bg-paper text-ink shadow-[0_10px_30px_rgba(0,0,0,0.38)] transition-transform duration-300 hover:scale-105 md:right-7 md:bottom-7"
    >
      <WhatsAppIcon />
    </a>
  );
}
