import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  Megaphone,
  MousePointerClick,
  Filter,
  Handshake,
  LineChart,
  CheckCircle2,
  XCircle,
  Search,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Zap,
  BarChart3,
  Layers,
  Compass,
  Radar,
  Target,
} from "lucide-react";

// ============================================================
// CONFIGURAÇÃO — Altere aqui os dados de contato e integrações
// ============================================================
const CONFIG = {
  // TODO: substitua pelo número real — formato DDI+DDD+número, ex: 5594999999999
  whatsapp: "5599999999999",
  whatsappMessage:
    "Olá, Wanderson. Quero conversar sobre os anúncios e o atendimento da minha clínica.",
  email: "contato@avex.com.br",
  instagram: "https://instagram.com/wandersonpaixaomkt",
  cidade: "Atendimento online em todo o Brasil",
  // TODO: cole aqui a URL do webhook (Zapier, Make, Supabase Functions, etc.)
  formEndpoint: "",
  // URL pública do site (sem barra final) — usada no canonical e OG
  siteUrl: "https://avex.ads.br",
  // TODO: URL da imagem OG (1200×630px) hospedada publicamente
  ogImage: "https://avex.ads.br/og-image.jpg",
};

const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
  CONFIG.whatsappMessage,
)}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wanderson Paixão",
  url: CONFIG.siteUrl,
  sameAs: [CONFIG.instagram, `https://wa.me/${CONFIG.whatsapp}`],
  jobTitle: "Consultor de anúncios e atendimento para clínicas",
  description: "Anúncios e atendimento para clínicas e consultórios.",
  worksFor: { "@type": "Organization", name: "AVEX" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AVEX · Anúncios e atendimento para clínicas" },
      {
        name: "description",
        content: "Análise de anúncios, páginas e atendimento para clínicas, por Wanderson Paixão.",
      },
      { property: "og:title", content: "AVEX · Diagnóstico para Clínicas" },
      {
        property: "og:description",
        content: "Veja onde os contatos param antes de chegar ao agendamento.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CONFIG.siteUrl },
      { property: "og:image", content: CONFIG.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AVEX · Diagnóstico para Clínicas" },
      {
        name: "twitter:description",
        content: "Anúncios e atendimento para clínicas, por Wanderson Paixão.",
      },
      { name: "twitter:image", content: CONFIG.ogImage },
      { name: "theme-color", content: "#060606" },
    ],
    links: [{ rel: "canonical", href: CONFIG.siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: LandingPage,
});

// ============================================================
// PRIMITIVES
// ============================================================
function EyebrowTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-text-muted-2)]">
      <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(255,92,31,0.55)]" />
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mx-auto mb-12 max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && <EyebrowTag>{eyebrow}</EyebrowTag>}
      <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-[color:var(--color-text-muted-2)] md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-16 md:px-8 md:py-24 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function PrimaryButton({
  children,
  href,
  external,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`btn-brand group/cta inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold hover:btn-brand-hover md:text-[15px] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
    </a>
  );
}

function SecondaryButton({
  children,
  href,
  external,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-[color:var(--color-border-brand)] hover:bg-card md:text-[15px] ${className}`}
    >
      {children}
    </a>
  );
}

// ============================================================
// HEADER
// ============================================================
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu com Esc e trava o scroll da página enquanto ele está aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: "/#problemas", label: "Problemas" },
    { href: "/#metodo", label: "Método" },
    { href: "/#solucoes", label: "Soluções" },
    { href: "/diagnostico", label: "Diagnóstico" },
    { href: "/diagnostico#processo", label: "Processo" },
    { href: "/#sobre", label: "Sobre" },
    { href: "/#faq", label: "FAQ" },
  ];
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-border/80 bg-background/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]"
          : "border-transparent bg-background/40"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="/" className="flex shrink-0 items-center" aria-label="AVEX · página inicial">
          <img
            src="/logo-avex-site.png"
            alt="AVEX · Wanderson Paixão"
            className="h-9 w-auto md:h-10"
            width={120}
            height={40}
          />
        </a>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-[color:var(--color-text-muted-2)] transition hover:bg-card hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-[13px] font-medium text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/20 md:inline-flex"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <a
            href="/#diagnostico"
            className="btn-brand hidden items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-semibold hover:btn-brand-hover sm:inline-flex"
          >
            Solicitar diagnóstico
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-foreground hover:border-[color:var(--color-border-brand)] xl:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-movel"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* Mobile / tablet drawer */}
      <div
        id="menu-movel"
        className={`xl:hidden ${open ? "block animate-fade-in" : "hidden"} max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl`}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 md:px-8"
          aria-label="Menu móvel"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-[15px] font-medium text-foreground hover:bg-card"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-3 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium"
            >
              Falar no WhatsApp
            </a>
            <a
              href="/#diagnostico"
              onClick={() => setOpen(false)}
              className="btn-brand rounded-lg px-4 py-3 text-center text-sm font-semibold"
            >
              Solicitar diagnóstico
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

// ============================================================
// HERO — dark, wide, arco luminoso
// ============================================================
function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pb-24 pt-20 md:px-8 md:pb-28 md:pt-28 lg:pb-0 lg:pt-28"
    >
      {/* subtle grid */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]"
      />
      {/* dots */}
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_65%)]"
      />
      {/* orange radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-[80px] animate-glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,92,31,0.55), rgba(201,56,10,0.15) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <EyebrowTag>Anúncios e atendimento para clínicas</EyebrowTag>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-[60px]">
            Onde os contatos param antes de chegar à agenda.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--color-text-muted-2)] md:text-lg">
            Reviso anúncios, páginas e atendimento para localizar o que precisa mudar.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <PrimaryButton href="/#diagnostico">Quero meu diagnóstico gratuito</PrimaryButton>
            <SecondaryButton
              href={waLink}
              external
              className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20"
            >
              <MessageCircle className="h-4 w-4" />
              Conversar no WhatsApp
            </SecondaryButton>
          </div>

          <p className="mt-5 max-w-xl text-sm text-[color:var(--color-text-dim)]">
            Vou olhar os anúncios e o atendimento da clínica. O diagnóstico não obriga você a
            contratar.
          </p>
        </div>

        <div className="pointer-events-none relative isolate mx-auto h-[360px] w-full max-w-[420px] lg:h-[520px] lg:max-w-none">
          <div
            aria-hidden
            className="absolute bottom-[4%] right-[-2%] z-0 h-[90%] w-[110%] rounded-full opacity-100 blur-[85px] animate-glow-pulse"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,92,31,0.68), rgba(201,56,10,0.28) 45%, transparent 72%)",
            }}
          />
          <img
            src="/wanderson-hero-cutout.png"
            alt="Wanderson Paixão"
            className="absolute bottom-0 left-1/2 z-10 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom lg:left-auto lg:right-[-4%] lg:translate-x-0"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAIXA DE AUTORIDADE
// ============================================================
function Authority() {
  const areas = [
    "Google Ads",
    "Meta Ads",
    "Páginas de campanha",
    "Atendimento",
    "CRM",
    "WhatsApp",
  ];
  return (
    <div className="border-y border-border bg-surface/40">
      <div className="mx-auto flex min-h-[76px] max-w-6xl items-center justify-center overflow-hidden px-5 py-5 md:min-h-[84px] md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {areas.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-text-muted-2)]/80"
            >
              <Target aria-hidden className="h-3.5 w-3.5 shrink-0 text-brand" />
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROBLEMAS
// ============================================================
function Problems() {
  const items = [
    {
      icon: Radar,
      title: "Contatos que não agendam",
      desc: "A pessoa chama, mas não marca. Sem acompanhar as conversas, fica difícil saber onde ela parou.",
    },
    {
      icon: Compass,
      title: "Agenda depende de indicações",
      desc: "Quando as indicações diminuem, faltam outros canais para trazer novos pacientes.",
    },
    {
      icon: Zap,
      title: "Atendimento improvisado",
      desc: "Cada pessoa responde de um jeito. Alguns contatos ficam sem retorno e outros não recebem as informações certas.",
    },
    {
      icon: BarChart3,
      title: "Campanhas sem acompanhamento",
      desc: "A campanha está no ar, mas falta registrar quantas pessoas chamaram, agendaram ou compareceram.",
    },
  ];
  return (
    <Section id="problemas">
      <SectionHead
        eyebrow="Onde os contatos param"
        title="O anúncio pode não ser o problema."
        subtitle="Antes de investir mais, descubra em que etapa os contatos deixam de avançar até o agendamento."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <article
            key={it.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-border-brand)]"
          >
            <div
              className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,92,31,0.35), transparent 70%)",
              }}
            />
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background/60 text-brand">
              <it.icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="relative mt-6 text-lg font-semibold text-foreground">{it.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
              {it.desc}
            </p>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[color:var(--color-border-brand)] bg-card/50 p-5 text-center">
        <p className="text-sm font-medium text-foreground md:text-base">
          Mais contatos não resolvem falhas no atendimento ou no agendamento.
        </p>
      </div>
    </Section>
  );
}

// ============================================================
// DIAGNÓSTICO — split com painel visual
// ============================================================
export function DiagnosticSplit() {
  const points = [
    "Serviços, preços e motivos para escolher sua clínica",
    "Site e perfis que o paciente consulta",
    "Anúncios e caminho até o primeiro contato",
    "Quem responde no WhatsApp e o que diz",
    "Retorno aos contatos e organização da agenda",
  ];
  const journey = [
    { label: "Serviços", value: 82, tone: "ok" },
    { label: "Anúncios", value: 64, tone: "warn" },
    { label: "Página", value: 48, tone: "warn" },
    { label: "WhatsApp", value: 32, tone: "bad" },
    { label: "Retorno", value: 21, tone: "bad" },
  ] as const;
  return (
    <Section className="bg-surface/30">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <EyebrowTag>Antes de anunciar mais</EyebrowTag>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl lg:text-5xl">
            Antes de aumentar os anúncios, descubra onde os contatos deixam de avançar.
          </h2>
          <p className="mt-5 text-[color:var(--color-text-muted-2)]">
            Mais investimento não corrige uma etapa que não funciona. Vamos olhar oferta, anúncios,
            página, WhatsApp e retorno aos contatos para localizar o problema.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground md:text-[15px]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[color:var(--color-border-brand)] bg-brand/10 text-brand">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryButton href="/#diagnostico">Pedir análise da clínica</PrimaryButton>
          </div>
        </div>

        {/* Painel visual */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(255,92,31,0.28), transparent 60%)",
            }}
          />
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/40">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                  Exemplo de análise
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">
                  Do primeiro contato ao agendamento
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[color:var(--color-text-muted-2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
                Exemplo ilustrativo
              </span>
            </div>

            <div className="space-y-3.5">
              {journey.map((row) => {
                const barColor =
                  row.tone === "ok"
                    ? "var(--color-success)"
                    : row.tone === "warn"
                      ? "var(--color-warning)"
                      : "var(--color-brand)";
                return (
                  <div key={row.label}>
                    <div className="mb-1 flex items-center justify-between text-[13px]">
                      <span className="text-foreground">{row.label}</span>
                      <span className="font-mono text-[color:var(--color-text-muted-2)]">
                        {row.value}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${row.value}%`,
                          background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
                          boxShadow: `0 0 12px ${barColor}55`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: "Etapas", v: "9" },
                { k: "Pontos de parada", v: "3" },
                { k: "Ações", v: "2" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-background/40 p-3 text-center"
                >
                  <p className="font-display text-xl font-semibold text-foreground">{s.v}</p>
                  <p className="text-[11px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
                    {s.k}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// MÉTODO AVEX — timeline horizontal (desktop) / vertical (mobile)
// ============================================================
function Method() {
  const steps = [
    {
      icon: Search,
      title: "Entender",
      desc: "Entender a clínica, os serviços, o público e como os pacientes chegam hoje.",
    },
    {
      icon: Megaphone,
      title: "Anunciar",
      desc: "Escolher os canais de anúncio de acordo com o público e a região atendida.",
    },
    {
      icon: MousePointerClick,
      title: "Receber contatos",
      desc: "Organizar páginas e formulários para facilitar o pedido de informação ou agendamento.",
    },
    {
      icon: Filter,
      title: "Organizar",
      desc: "Registrar os contatos e entender quais precisam de resposta primeiro.",
    },
    {
      icon: Handshake,
      title: "Responder",
      desc: "Combinar respostas e retornos para acompanhar o contato até o agendamento.",
    },
    {
      icon: LineChart,
      title: "Rever",
      desc: "Acompanhar os números e ajustar campanhas e atendimento com base no que aconteceu.",
    },
  ];
  return (
    <Section id="metodo">
      <SectionHead
        eyebrow="Como o trabalho começa"
        title="Primeiro entendemos a clínica. Depois definimos as ações."
        subtitle="O plano depende do que encontrarmos entre o anúncio, o atendimento e a agenda."
      />

      {/* Desktop horizontal timeline */}
      <div className="relative hidden lg:block">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[42px] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,92,31,0.5) 15%, rgba(255,92,31,0.5) 85%, transparent)",
          }}
        />
        <div className="grid grid-cols-6 gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="group flex flex-col items-center text-center">
              <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-brand/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                <span className="relative grid h-[84px] w-[84px] place-items-center rounded-full border border-border bg-card transition group-hover:border-[color:var(--color-border-brand)]">
                  <s.icon className="h-6 w-6 text-brand" strokeWidth={1.6} />
                  <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-brand font-mono text-[11px] font-semibold text-brand-foreground">
                    {i + 1}
                  </span>
                </span>
              </div>
              <h3 className="mt-6 font-display text-base font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-[color:var(--color-text-muted-2)]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet vertical */}
      <div className="relative lg:hidden">
        <div
          aria-hidden
          className="absolute bottom-3 left-[48px] top-3 w-px bg-gradient-to-b from-transparent via-brand/40 to-transparent"
        />
        <ol className="relative grid gap-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border bg-background text-brand">
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
                <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-brand font-mono text-[11px] font-semibold text-brand-foreground">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted-2)]">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm italic text-[color:var(--color-text-dim)]">
        A sequência muda conforme a estrutura da clínica e o que precisa ser corrigido primeiro.
      </p>
    </Section>
  );
}

// ============================================================
// SOLUÇÕES — Bento Grid assimétrico
// ============================================================
function Solutions() {
  return (
    <Section id="solucoes" className="bg-surface/30">
      <SectionHead
        eyebrow="Do primeiro contato à agenda"
        title="Quatro partes do caminho até a agenda."
        subtitle="Anúncios atraem. Atendimento responde. Informação esclarece. Os dados mostram o que ajustar."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <BentoCard
          eyebrow="01 · Anúncios"
          icon={Megaphone}
          title="Atrair novos pacientes"
          desc="Google e Meta Ads apresentam os serviços da clínica a quem procura atendimento."
          items={["Google Ads", "Meta Ads", "Páginas de campanha"]}
        />
        <BentoCard
          eyebrow="02 · Atendimento"
          icon={Filter}
          title="Responder e retomar contatos"
          desc="Organizo as respostas no WhatsApp e retomo contato com quem ainda não marcou."
          items={["WhatsApp", "Cadastro de contatos", "Retornos"]}
        />
        <BentoCard
          eyebrow="03 · Informação"
          icon={Sparkles}
          title="Explicar os serviços da clínica"
          desc="Apresentar os serviços e responder às dúvidas que surgem antes do agendamento."
          items={["Conteúdo", "Design", "Vídeo"]}
          note="Conteúdo, design e vídeo são contratados à parte."
        />
        <BentoCard
          eyebrow="04 · Acompanhamento"
          icon={TrendingUp}
          title="Ver o que está funcionando"
          desc="Acompanho contatos e agendamentos para decidir o que ajustar nas campanhas e no atendimento."
          items={["Contatos", "Agendamentos", "Dados", "Ajustes"]}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <PrimaryButton href="/#diagnostico">Pedir análise da clínica</PrimaryButton>
      </div>
    </Section>
  );
}

function BentoCard({
  eyebrow,
  icon: Icon,
  title,
  desc,
  items,
  note,
}: {
  eyebrow: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  items: string[];
  note?: string;
}) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-[color:var(--color-border-brand)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
          {eyebrow}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background/60 text-brand">
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-foreground md:text-2xl">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
        {desc}
      </p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <li
            key={i}
            className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-text-muted-2)]"
          >
            {i}
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-6 border-t border-border pt-4 text-[11px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
          {note}
        </p>
      )}
    </article>
  );
}

// ============================================================
// PLANOS
// ============================================================
function Plans() {
  const plans = [
    {
      tag: "Opção 01 · Anúncios",
      title: "Testar anúncios para atrair contatos",
      desc: "Para clínicas que dependem de indicações e querem testar anúncios para atrair novos contatos.",
      items: [
        "Análise inicial da clínica",
        "Plano de campanha",
        "Meta Ads ou Google Ads",
        "Definição do caminho até o contato",
        "Medição dos contatos e ajustes",
        "Relatório mensal dos dados disponíveis",
      ],
    },
    {
      tag: "Opção 02 · Mais canais",
      title: "Acompanhar melhor os contatos",
      desc: "Para clínicas que já anunciam e querem acompanhar melhor os contatos e agendamentos.",
      items: [
        "Gestão de Meta Ads e Google Ads",
        "Anúncios para quem já visitou a página",
        "Teste de anúncios e mensagens",
        "Acompanhamento do atendimento",
        "Análise do caminho até o agendamento",
        "Ajustes periódicos nas campanhas",
      ],
      featured: true,
    },
    {
      tag: "Opção 03 · Anúncios e atendimento",
      title: "Organizar anúncios e atendimento",
      desc: "Para clínicas que precisam organizar anúncios, atendimento e acompanhamento em conjunto.",
      items: [
        "Planejamento e revisão das campanhas",
        "Campanhas e etapas de contato",
        "Páginas e cadastro de contatos",
        "Organização das respostas e retornos",
        "Acompanhamento dos números da clínica",
        "Reuniões em datas combinadas",
      ],
    },
  ];
  return (
    <Section>
      <SectionHead
        eyebrow="Opções de trabalho"
        title="O escopo é definido depois de entender sua clínica."
        subtitle="As opções abaixo servem de referência. A proposta depende da estrutura, dos objetivos e do que precisa ser feito."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.tag}
            className={`relative flex flex-col rounded-2xl border p-7 transition ${
              p.featured
                ? "border-[color:var(--color-border-brand)] bg-card-highlight glow-ring"
                : "border-border bg-card hover:border-white/15"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full border border-[color:var(--color-border-brand)] bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-foreground">
                Meta Ads e Google Ads
              </span>
            )}
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-brand">
              {p.tag}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold text-foreground md:text-2xl">
              {p.title}
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-text-muted-2)]">{p.desc}</p>
            <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
              {p.items.map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13px] text-foreground md:text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-2">
              {p.featured ? (
                <a
                  href="#diagnostico"
                  className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold hover:btn-brand-hover"
                >
                  Conversar sobre esta opção <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href="#diagnostico"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-[color:var(--color-border-brand)]"
                >
                  Conversar sobre esta opção
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[color:var(--color-text-dim)]">
        A proposta depende da equipe, da agenda e do volume de contatos que a clínica consegue
        atender.
      </p>
    </Section>
  );
}

// ============================================================
// PARA QUEM É
// ============================================================
function ForWho() {
  const forItems = [
    "Clínicas que querem receber contatos além das indicações",
    "Consultórios com horários disponíveis na agenda",
    "Centros de estética que buscam novos clientes",
    "Profissionais da saúde com atendimento próprio",
    "Negócios que recebem pacientes pelo WhatsApp",
    "Gestores dispostos a rever anúncios e atendimento",
    "Quem separa verba para anúncios e gestão",
  ];
  const notFor = [
    "Quem precisa de resultado imediato",
    "Quem não tem verba para anunciar",
    "Quem não consegue responder aos contatos",
    "Quem não quer rever o atendimento",
    "Quem procura apenas posts ou artes avulsas",
    "Quem exige faturamento garantido",
  ];
  return (
    <Section>
      <SectionHead
        eyebrow="Para quem faz sentido"
        title="Veja se este trabalho combina com sua clínica."
        subtitle="Anúncios precisam de verba e os contatos precisam de resposta. Essas condições entram na conversa inicial."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--color-border-brand)] bg-card p-7">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-brand" strokeWidth={1.8} /> Para quem é
          </h3>
          <ul className="mt-5 space-y-3">
            {forItems.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <XCircle className="h-5 w-5 text-[color:var(--color-text-dim)]" strokeWidth={1.8} />
            Para quem não é
          </h3>
          <ul className="mt-5 space-y-3">
            {notFor.map((i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[color:var(--color-text-muted-2)]"
              >
                <XCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-text-dim)]"
                  strokeWidth={1.6}
                />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// PROCESSO
// ============================================================
export function Process() {
  const steps = [
    "Preencher o formulário",
    "Analisar as informações da clínica",
    "Conversar sobre o atendimento e os anúncios",
    "Localizar onde os contatos param",
    "Definir o que precisa ser feito",
    "Enviar a proposta",
    "Preparar as mudanças aprovadas",
    "Revisar os primeiros resultados",
    "Ajustar o que for necessário",
  ];
  return (
    <Section id="processo" className="bg-surface/30">
      <SectionHead
        eyebrow="Etapas do trabalho"
        title="Da primeira conversa aos ajustes nas campanhas."
        subtitle="Você recebe a análise e a proposta antes de decidir se quer seguir."
      />
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-[color:var(--color-border-brand)]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-background/60 font-mono text-sm font-semibold text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm font-medium text-foreground">{s}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

// ============================================================
// PROVAS
// ============================================================
function Proof() {
  return (
    <Section>
      <SectionHead
        eyebrow="Projetos"
        title="Projetos de clientes só serão publicados com autorização."
        subtitle="Ainda não há projetos publicados nesta página."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border bg-card p-6 transition hover:border-[color:var(--color-border-brand)]"
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <span className="relative text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-text-dim)]">
              Projeto {String(i).padStart(2, "0")}
            </span>
            <div className="relative">
              <p className="font-display text-lg font-semibold text-foreground">
                Projeto não publicado.
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted-2)]">
                Este espaço será atualizado quando houver material autorizado.
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// SOBRE
// ============================================================
function About() {
  const bullets = [
    "Especialista em captação e conversão para clínicas",
    "Formado em Administração",
    "Estudante de Psicologia (comportamento de consumo)",
    "Gestor certificado de campanhas Google e Meta",
    "Defino as ações antes de escolher as ferramentas",
    "Estudo IA, análise de dados e vendas",
  ];
  return (
    <Section id="sobre" className="bg-surface/30">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_1.1fr] lg:items-center">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 20% 30%, rgba(255,92,31,0.4), transparent 65%)",
            }}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--color-border-brand)] bg-card">
            <img
              src="/wanderson-about.jpg"
              alt="Wanderson Paixão em uma cafeteria"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end p-7 text-white">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-brand">
                  AVEX
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">Wanderson Paixão</p>
                <p className="mt-1 text-xs text-white/75">
                  Anúncios · Atendimento
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <EyebrowTag>Quem está por trás</EyebrowTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.15] text-foreground md:text-4xl lg:text-[44px]">
            Entendo como os contatos chegam à clínica.
          </h2>
          <p className="mt-6 text-[color:var(--color-text-muted-2)] md:text-lg">
            Vejo quem responde e o que acontece antes do agendamento. Depois sugiro mudanças em
            anúncios, páginas ou atendimento.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card/60 p-3 text-sm text-foreground"
              >
                <Layers className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// FORMULÁRIO — Oferta de diagnóstico com painel
// ============================================================
const FORM_STORAGE_KEY = "avex_diag_step1";

function DiagnosticForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedStep1, setSavedStep1] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FORM_STORAGE_KEY);
      if (raw) setSavedStep1(JSON.parse(raw));
    } catch {
      // Ignore unavailable or malformed local storage data.
    }
  }, []);

  function validateStep1(form: HTMLFormElement) {
    const data = new FormData(form);
    const e: Record<string, string> = {};
    if (!String(data.get("nome") || "").trim()) e.nome = "Informe seu nome";
    if (!String(data.get("clinica") || "").trim()) e.clinica = "Informe o nome do negócio";
    if (!String(data.get("cidade") || "").trim()) e.cidade = "Informe a cidade";
    if (!String(data.get("whatsapp") || "").trim()) e.whatsapp = "Informe o WhatsApp";
    const email = String(data.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido";
    setErrors(e);
    focusFirstError(form, e);
    return Object.keys(e).length === 0;
  }

  function focusFirstError(form: HTMLFormElement, e: Record<string, string>) {
    const first = Object.keys(e)[0];
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  // Move o foco para o primeiro campo quando a etapa muda (teclado e leitores de tela)
  useEffect(() => {
    if (!formRef.current || !hasInteracted.current) return;
    formRef.current.querySelector<HTMLElement>("input, textarea, select")?.focus();
  }, [step]);

  // Leva o usuário até a confirmação após o envio
  useEffect(() => {
    if (status === "ok") document.getElementById("diagnostico")?.scrollIntoView({ block: "start" });
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    hasInteracted.current = true;
    const form = e.currentTarget;
    if (step === 1) {
      if (validateStep1(form)) {
        const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
        setSavedStep1(data);
        try {
          localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
        } catch {
          // Continue when local storage is unavailable.
        }
        setStep(2);
      }
      return;
    }
    const step2 = new FormData(form);
    if (!step2.get("consentimento")) {
      const e = { consentimento: "Marque a autorização para enviarmos o diagnóstico" };
      setErrors(e);
      focusFirstError(form, e);
      return;
    }
    setErrors({});
    setStatus("sending");
    // Os campos da etapa 1 não estão mais no DOM: junta com o que foi salvo
    const data = { ...savedStep1, ...Object.fromEntries(step2.entries()) };
    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Falha no envio");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("ok");
      try {
        localStorage.removeItem(FORM_STORAGE_KEY);
      } catch {
        // Submission succeeded even if local storage cleanup is unavailable.
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <Section id="diagnostico">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[color:var(--color-border-brand)] bg-card p-10 text-center md:p-14">
          <div
            aria-hidden
            className="absolute -inset-24 -z-10 opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,92,31,0.4), transparent 60%)",
            }}
          />
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[color:var(--color-border-brand)] bg-brand/15 text-brand">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h2 className="mt-6 font-display text-3xl font-semibold md:text-4xl" role="status">
            Recebi suas informações.
          </h2>
          <p className="mt-4 text-[color:var(--color-text-muted-2)]">
            Retorno em até 3 dias úteis com os pontos que encontrei e uma sugestão de próximo passo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href={waLink} external>
              Adiantar pelo WhatsApp
            </PrimaryButton>
            <SecondaryButton href="/#faq">Ver dúvidas comuns</SecondaryButton>
          </div>
        </div>
      </Section>
    );
  }

  const benefits = [
    "Leitura das etapas de captação e atendimento",
    "Pontos que precisam de atenção primeiro",
    "Sugestões com base nas informações enviadas",
    "Próximo passo, mesmo que você não contrate",
  ];

  return (
    <Section id="diagnostico">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -z-10 mx-auto -mt-20 h-[400px] max-w-4xl opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,92,31,0.35), transparent 65%)",
        }}
      />
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.1fr] lg:items-start">
        <div>
          <EyebrowTag>Ponto de partida gratuito</EyebrowTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] md:text-4xl lg:text-5xl">
            Vamos descobrir onde os contatos deixam de virar agendamentos.
          </h2>
          <p className="mt-5 text-[color:var(--color-text-muted-2)] md:text-lg">
            Vou analisar como sua clínica atrai contatos, responde e marca consultas. O diagnóstico
            não obriga você a contratar.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground md:text-[15px]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[color:var(--color-border-brand)] bg-brand/15 text-brand">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 hidden lg:block">
            <p className="text-xs text-[color:var(--color-text-dim)]">
              Sem custo e sem obrigação de contratar. Retorno em até 3 dias úteis.
            </p>
          </div>
        </div>

        <div
          id="formulario"
          className="relative rounded-3xl border border-[color:var(--color-border-brand)] bg-card-highlight p-6 shadow-2xl shadow-black/50 md:p-8"
        >
          {/* Step indicator */}
          <ol className="mb-6 flex items-center gap-3" aria-label={`Etapa ${step} de 2`}>
            {[1, 2].map((n) => (
              <li
                key={n}
                className="flex flex-1 items-center gap-3"
                aria-current={step === n ? "step" : undefined}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold transition ${
                    step >= (n as 1 | 2)
                      ? "bg-brand text-brand-foreground shadow-[0_0_16px_rgba(255,92,31,0.55)]"
                      : "border border-border bg-background text-[color:var(--color-text-dim)]"
                  }`}
                >
                  {n}
                </span>
                <span
                  className={`text-xs font-medium uppercase tracking-widest ${
                    step >= (n as 1 | 2) ? "text-foreground" : "text-[color:var(--color-text-dim)]"
                  }`}
                >
                  {n === 1 ? "Contato" : "Cenário"}
                </span>
                {n === 1 && (
                  <span
                    aria-hidden
                    className={`mx-1 h-px flex-1 transition-colors duration-300 ${step === 2 ? "bg-brand/60" : "bg-border"}`}
                  />
                )}
              </li>
            ))}
          </ol>
          <p className="-mt-2 mb-6 text-sm text-[color:var(--color-text-muted-2)]">
            {step === 1
              ? "Leva cerca de 2 minutos. Sem custo e sem compromisso de contratar."
              : "Quase lá. Essas respostas ajudam a preparar uma análise mais precisa."}
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nome"
                  name="nome"
                  autoComplete="name"
                  error={errors.nome}
                  required
                  defaultValue={savedStep1.nome}
                />
                <Field
                  label="Clínica ou negócio"
                  name="clinica"
                  autoComplete="organization"
                  error={errors.clinica}
                  required
                  defaultValue={savedStep1.clinica}
                />
                <Field
                  label="Especialidade"
                  name="especialidade"
                  defaultValue={savedStep1.especialidade}
                />
                <Field
                  label="Cidade"
                  name="cidade"
                  autoComplete="address-level2"
                  error={errors.cidade}
                  required
                  defaultValue={savedStep1.cidade}
                />
                <Field
                  label="WhatsApp"
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(00) 00000-0000"
                  error={errors.whatsapp}
                  required
                  defaultValue={savedStep1.whatsapp}
                />
                <Field
                  label="E-mail"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  error={errors.email}
                  required
                  defaultValue={savedStep1.email}
                />
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4">
                <Field
                  label="Qual sua principal dificuldade hoje?"
                  name="dificuldade"
                  as="textarea"
                />
                <Field label="Como os pacientes chegam atualmente?" name="origem" />
                <Select
                  label="A clínica já anuncia?"
                  name="anuncia"
                  options={["Sim, hoje", "Não", "Já anunciei antes"]}
                />
                <Select
                  label="Existe recepção ou secretária dedicada?"
                  name="recepcao"
                  options={["Sim", "Não", "Terceirizada"]}
                />
                <Field
                  label="Quantos novos pacientes consegue atender por mês?"
                  name="capacidade"
                />
                <Field label="Principal procedimento ou serviço" name="procedimento" />
                <Select
                  label="Investimento mensal previsto em captação"
                  name="investimento"
                  options={[
                    "Até R$ 1.500 / mês",
                    "R$ 1.500 – R$ 3.000 / mês",
                    "R$ 3.000 – R$ 6.000 / mês",
                    "Acima de R$ 6.000 / mês",
                    "Ainda não defini",
                  ]}
                />
                <Select
                  label="Como prefere continuar a conversa?"
                  name="preferencia"
                  options={["WhatsApp", "Reunião agendada", "Tanto faz"]}
                />
                <div>
                  <label className="mt-1 flex cursor-pointer items-start gap-3 rounded-lg p-1 text-sm text-foreground">
                    <input
                      type="checkbox"
                      name="consentimento"
                      required
                      aria-invalid={errors.consentimento ? true : undefined}
                      aria-describedby={errors.consentimento ? "consentimento-erro" : undefined}
                      onChange={() =>
                        errors.consentimento &&
                        setErrors(({ consentimento: _omit, ...rest }) => rest)
                      }
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[color:var(--color-brand)]"
                    />
                    <span className="text-[color:var(--color-text-muted-2)]">
                      Autorizo o uso destas informações apenas para análise e contato comercial,
                      conforme a política de privacidade.
                    </span>
                  </label>
                  {errors.consentimento && (
                    <p
                      id="consentimento-erro"
                      role="alert"
                      className="mt-1 pl-9 text-xs text-brand-light"
                    >
                      {errors.consentimento}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => {
                    hasInteracted.current = true;
                    setErrors({});
                    setStep(1);
                  }}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-[color:var(--color-text-muted-2)] hover:text-foreground"
                >
                  ← Voltar
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
                className="btn-brand inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold hover:btn-brand-hover disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" && (
                  <span
                    aria-hidden
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                )}
                {status === "sending"
                  ? "Enviando..."
                  : step === 1
                    ? "Continuar"
                    : "Quero meu diagnóstico"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {status === "error" && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
              >
                Não foi possível enviar agora. Tente novamente ou{" "}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  fale pelo WhatsApp
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}

const fieldLabelCls = "block text-[13px] font-medium text-foreground";
const fieldControlCls =
  "mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-3 text-base text-foreground placeholder:text-[color:var(--color-text-dim)] outline-none transition focus:border-[color:var(--color-border-brand)] focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-brand/70 md:py-2.5 md:text-sm";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  as,
  defaultValue,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  as?: "textarea";
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = `campo-${name}`;
  const errorId = `${id}-erro`;
  const a11y = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  return (
    <div>
      <label htmlFor={id} className={fieldLabelCls}>
        {label}{" "}
        {required ? (
          <span className="text-brand" aria-hidden>
            *
          </span>
        ) : (
          <span className="font-normal text-[color:var(--color-text-dim)]">(opcional)</span>
        )}
      </label>
      {as === "textarea" ? (
        <textarea
          {...a11y}
          placeholder={placeholder}
          rows={3}
          className={`${fieldControlCls} resize-y`}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          {...a11y}
          type={type}
          placeholder={placeholder}
          className={fieldControlCls}
          required={required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          inputMode={inputMode}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-brand-light">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  const id = `campo-${name}`;
  return (
    <div>
      <label htmlFor={id} className={fieldLabelCls}>
        {label} <span className="font-normal text-[color:var(--color-text-dim)]">(opcional)</span>
      </label>
      <select id={id} name={name} className={`${fieldControlCls} cursor-pointer`}>
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQ() {
  const items = [
    {
      q: "Você trabalha somente com tráfego pago?",
      a: "Não. Também posso avaliar a página e o atendimento. Primeiro identifico o que precisa de ajuste.",
    },
    {
      q: "O investimento em anúncios está incluído?",
      a: "Não. O pagamento dos anúncios é feito por você diretamente ao Google ou à Meta. Esse valor é separado da gestão.",
    },
    {
      q: "Em quanto tempo as campanhas são implantadas?",
      a: "O prazo depende dos acessos, dos materiais e dos ajustes necessários. Depois de analisar a conta, passo uma estimativa.",
    },
    {
      q: "Você garante quantidade de pacientes?",
      a: "Não. A procura, os serviços, o atendimento e a agenda influenciam o número de pacientes.",
    },
    {
      q: "É necessário ter site?",
      a: "Nem sempre. A página depende dos serviços e de como o paciente agenda.",
    },
    {
      q: "Você cria páginas para campanhas?",
      a: "Sim. A página pode entrar na proposta quando fizer parte do trabalho combinado.",
    },
    {
      q: "Você ajuda a recepção?",
      a: "Sim. Posso ajudar a organizar as respostas, as perguntas e o retorno aos contatos. Combinamos o escopo antes de começar.",
    },
    {
      q: "Você atende somente clínicas?",
      a: "Atendo clínicas, consultórios, centros de estética e profissionais da saúde. Outros segmentos são avaliados antes da proposta.",
    },
    {
      q: "Os serviços de conteúdo estão incluídos?",
      a: "Não estão incluídos na gestão de anúncios. Se você precisar desses serviços, eles entram em uma proposta separada.",
    },
    {
      q: "Como funciona o diagnóstico?",
      a: "Você preenche o formulário. Analiso as informações e retorno em até 3 dias úteis com o que encontrei.",
    },
    {
      q: "Qual é o prazo mínimo recomendado?",
      a: "O prazo depende do trabalho e do tempo necessário para testar os ajustes. Definimos isso na proposta.",
    },
    {
      q: "Como os resultados são acompanhados?",
      a: "Acompanhamos os dados disponíveis, como cliques, contatos e agendamentos. A frequência das reuniões fica definida no escopo.",
    },
  ];
  return (
    <Section id="faq">
      <SectionHead
        eyebrow="Dúvidas comuns"
        title="O que você precisa saber antes de conversar."
        subtitle="Se ficou alguma dúvida, fale comigo pelo WhatsApp."
      />
      <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {items.map((it, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 transition hover:bg-card-highlight">
              <span className="text-[15px] font-medium text-foreground">{it.q}</span>
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-background text-[color:var(--color-text-muted-2)] transition group-open:border-[color:var(--color-border-brand)] group-open:bg-brand/10 group-open:text-brand">
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>
            <p className="px-6 pb-5 text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// CTA FINAL
// ============================================================
export function FinalCTA({
  eyebrow = "Último passo",
  headingLevel = "h2",
}: {
  eyebrow?: string;
  headingLevel?: "h1" | "h2";
} = {}) {
  const Heading = headingLevel;
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-[100px] animate-glow-pulse"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,92,31,0.45), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <EyebrowTag>{eyebrow}</EyebrowTag>
        <Heading className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-[64px]">
          Descubra em que etapa sua clínica perde contatos antes do agendamento.
        </Heading>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-[color:var(--color-text-muted-2)] md:text-lg">
          Vamos olhar anúncios, página, WhatsApp e retorno aos contatos para entender onde a
          conversa para.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="/#diagnostico">Solicitar meu diagnóstico gratuito</PrimaryButton>
          <SecondaryButton href={waLink} external>
            <MessageCircle className="h-4 w-4" />
            Falar direto com Wanderson
          </SecondaryButton>
        </div>
      </div>

      {/* Arco luminoso decorativo */}
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto mt-16 h-[160px] w-full max-w-5xl"
      >
        <div className="absolute inset-x-0 top-0 h-[160px] overflow-hidden">
          <div
            className="absolute left-1/2 top-4 h-[320px] w-[1100px] -translate-x-1/2 rounded-full border border-[color:var(--color-border-brand)]"
            style={{
              boxShadow:
                "0 0 60px 8px rgba(255, 92, 31, 0.3), inset 0 0 50px rgba(255, 92, 31, 0.1)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <img src="/logo-avex-site.png" alt="AVEX · Wanderson Paixão" className="h-12 w-auto" />
          <p className="mt-5 max-w-sm text-sm text-[color:var(--color-text-muted-2)]">
            Anúncios e atendimento para clínicas e consultórios.
          </p>
          <p className="mt-4 text-xs text-[color:var(--color-text-dim)]">{CONFIG.cidade}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
            Contato
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[color:var(--color-text-muted-2)]">
            <li>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-brand"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONFIG.email}`} className="transition hover:text-brand">
                {CONFIG.email}
              </a>
            </li>
            <li>
              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-brand"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
            Institucional
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[color:var(--color-text-muted-2)]">
            <li>
              <a href="#" className="transition hover:text-brand">
                Política de privacidade
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-brand">
                Termos de uso
              </a>
            </li>
            <li>
              <a href="/#diagnostico" className="transition hover:text-brand">
                Solicitar diagnóstico
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-xs text-[color:var(--color-text-dim)]">
            © {new Date().getFullYear()} AVEX · Wanderson Paixão. Todos os direitos reservados.
          </p>
          <p className="max-w-xl text-xs text-[color:var(--color-text-dim)]">
            Os resultados variam conforme a procura, o investimento, os serviços e a capacidade de
            atendimento. Não há garantia de resultados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// WHATSAPP FLOAT (mobile)
// ============================================================
export function WhatsAppFloat() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [formInView, setFormInView] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Esconde o botão enquanto o formulário está na tela, para não cobrir o envio
    const form = document.getElementById("formulario");
    const io =
      form && "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
            threshold: 0.1,
          })
        : null;
    if (form && io) io.observe(form);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);
  const visible = scrolledPast && !formInView;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`btn-brand fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold shadow-2xl transition md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================
function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Authority />
        <Problems />
        <Method />
        <Solutions />
        <Plans />
        <About />
        <DiagnosticForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
