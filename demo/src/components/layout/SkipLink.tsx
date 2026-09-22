export function SkipLink() {
  return (
    <a
      href="/demo#conteudo"
      className="bg-paper text-ink sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:px-4 focus:py-2 focus:text-sm"
    >
      Ir para o conteúdo
    </a>
  );
}
