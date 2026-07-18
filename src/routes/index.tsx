import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Target,
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
} from "lucide-react";

// ============================================================
// CONFIGURAÇÃO — Altere aqui os dados de contato e integrações
// ============================================================
const CONFIG = {
  whatsapp: "5599999999999", // <- DDI+DDD+número, ex: 5511999999999
  whatsappMessage:
    "Olá, Wanderson. Quero entender onde minha clínica está perdendo oportunidades. Podemos conversar?",
  email: "contato@avex.com.br",
  instagram: "https://instagram.com/wandersonpaixao",
  cidade: "Atendimento online em todo o Brasil",
  // Endpoint do formulário (CRM/Notion/Sheets). Ex: Zapier, Make, Supabase Function.
  formEndpoint: "",
};

const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
  CONFIG.whatsappMessage,
)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AVEX · Diagnóstico de Captação e Conversão para Clínicas" },
      {
        name: "description",
        content:
          "Descubra onde sua clínica perde pacientes entre o anúncio e a agenda. Diagnóstico estratégico de posicionamento, mídia, WhatsApp, recepção e conversão — por Wanderson Paixão.",
      },
      { property: "og:title", content: "AVEX · Diagnóstico para Clínicas" },
      {
        property: "og:description",
        content:
          "Mais contatos não resolvem uma jornada quebrada. Analisamos cada etapa entre o anúncio e o agendamento.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#060606" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
    <div
      className={`mx-auto mb-14 max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}
    >
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
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-20 md:px-8 md:py-28 lg:py-36 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function PrimaryButton({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`btn-brand inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold hover:[&]:btn-brand-hover md:text-[15px] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
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
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-[color:var(--color-border-brand)] hover:bg-card md:text-[15px] ${className}`}
    >
      {children}
    </a>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#problemas", label: "Problemas" },
    { href: "#metodo", label: "Método" },
    { href: "#solucoes", label: "Soluções" },
    { href: "#diagnostico", label: "Diagnóstico" },
    { href: "#sobre", label: "Sobre" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-border bg-card">
            <span className="absolute inset-0 bg-gradient-to-br from-brand/30 via-transparent to-transparent" />
            <span className="relative font-display text-base font-bold text-foreground">A</span>
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-[13px] font-semibold tracking-widest text-foreground">
              AVEX
            </span>
            <span className="truncate text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
              Wanderson Paixão
            </span>
          </span>
        </a>
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
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
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-foreground transition hover:border-[color:var(--color-border-brand)]"
          >
            WhatsApp
          </a>
          <a
            href="#diagnostico"
            className="btn-brand inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold hover:[&]:btn-brand-hover"
          >
            Solicitar diagnóstico
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-border bg-card p-2 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {/* Mobile drawer */}
      <div
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-border bg-background/95 backdrop-blur-xl`}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4"
          aria-label="Menu móvel"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-card"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-3 grid gap-2 border-t border-border pt-4">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium"
            >
              Falar no WhatsApp
            </a>
            <a
              href="#diagnostico"
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
      className="relative isolate overflow-hidden px-5 pb-24 pt-20 md:px-8 md:pb-28 md:pt-28 lg:min-h-[92vh] lg:pb-40"
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

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <EyebrowTag>Consultoria de captação para clínicas</EyebrowTag>
        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-[68px]">
          Você não precisa de mais mensagens. Precisa de uma jornada que{" "}
          <span className="text-gradient-brand">converta</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--color-text-muted-2)] md:text-lg">
          Do primeiro anúncio ao paciente na cadeira: mapeamos onde sua clínica está perdendo oportunidades e estruturamos o caminho que transforma procura em agendamento.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton href="#diagnostico">Quero meu diagnóstico gratuito</PrimaryButton>
          <SecondaryButton href={waLink} external>
            <MessageCircle className="h-4 w-4" />
            Conversar no WhatsApp
          </SecondaryButton>
        </div>

        <p className="mt-5 max-w-xl text-sm text-[color:var(--color-text-dim)]">
          Análise consultiva, sem promessas de faturamento e sem venda de pacote. Recomendação baseada no cenário real da sua operação.
        </p>
      </div>

      {/* Arco luminoso */}
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto mt-16 h-[220px] w-full max-w-5xl md:mt-24"
      >
        <div className="absolute inset-x-0 top-0 mx-auto h-[220px] w-full overflow-hidden">
          <div
            className="absolute left-1/2 top-0 h-[440px] w-[1200px] -translate-x-1/2 rounded-full border border-[color:var(--color-border-brand)]"
            style={{
              boxShadow:
                "0 0 80px 10px rgba(255, 92, 31, 0.35), inset 0 0 60px rgba(255, 92, 31, 0.15)",
            }}
          />
          <div
            className="absolute left-1/2 top-[-10px] h-[440px] w-[1400px] -translate-x-1/2 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(255,120,73,0.35), transparent 55%)",
            }}
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
    "Landing Pages",
    "Jornada Comercial",
    "CRM",
    "WhatsApp",
    "Scripts",
    "Automação",
    "Melhoria Contínua",
  ];
  return (
    <div className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 py-10 md:px-8">
        <p className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-text-dim)]">
          Áreas de atuação
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {areas.map((a) => (
            <span
              key={a}
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-text-muted-2)]/80"
            >
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
      title: "Contatos que não fecham",
      desc: "Mensagens chegam, mas o paciente some antes de agendar. Sem visibilidade sobre onde e por que ele desiste.",
    },
    {
      icon: Compass,
      title: "Refém da indicação",
      desc: "Quando a indicação esfria, a agenda esfria junto. Não há canal previsível de novos pacientes.",
    },
    {
      icon: Zap,
      title: "Atendimento improvisado",
      desc: "Cada mensagem é respondida de um jeito. Sem script, sem qualificação e sem quem retome o contato depois.",
    },
    {
      icon: BarChart3,
      title: "Anúncio no escuro",
      desc: "A campanha roda, o investimento sai, mas ninguém sabe quantos contatos viraram agendamento — nem quais dão prejuízo.",
    },
  ];
  return (
    <Section id="problemas">
      <SectionHead
        eyebrow="Onde o dinheiro vaza"
        title="O problema quase nunca está só no anúncio."
        subtitle="Antes de aumentar o investimento, é preciso enxergar em que ponto da jornada a clínica está deixando pacientes na mesa."
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
            <h3 className="relative mt-6 text-lg font-semibold text-foreground">
              {it.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
              {it.desc}
            </p>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[color:var(--color-border-brand)] bg-card/50 p-5 text-center">
        <p className="text-sm font-medium text-foreground md:text-base">
          Mais contatos não resolvem uma jornada{" "}
          <span className="text-brand">quebrada</span>. Aumentam o desperdício.
        </p>
      </div>
    </Section>
  );
}

// ============================================================
// DIAGNÓSTICO — split com painel visual
// ============================================================
function DiagnosticSplit() {
  const points = [
    "Posicionamento, oferta e diferenciais reais",
    "Presença digital: Google, Instagram e site",
    "Campanhas, páginas e rastreamento de conversão",
    "WhatsApp, recepção e qualificação do contato",
    "Follow-up, agenda cheia e indicadores da operação",
  ];
  const journey = [
    { label: "Posicionamento", value: 82, tone: "ok" },
    { label: "Anúncios", value: 64, tone: "warn" },
    { label: "Landing Page", value: 48, tone: "warn" },
    { label: "WhatsApp", value: 32, tone: "bad" },
    { label: "Follow-up", value: 21, tone: "bad" },
  ] as const;
  return (
    <Section className="bg-surface/30">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <EyebrowTag>Antes de escalar investimento</EyebrowTag>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl lg:text-5xl">
            Anunciar mais sem enxergar o{" "}
            <span className="text-brand">gargalo</span> é acelerar o prejuízo.
          </h2>
          <p className="mt-5 text-[color:var(--color-text-muted-2)]">
            Investir em mídia sem diagnóstico é como abrir mais horários numa agenda que ninguém consegue preencher. Antes de amplificar, é preciso mapear cada etapa e identificar onde a operação está perdendo eficiência.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-foreground md:text-[15px]"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[color:var(--color-border-brand)] bg-brand/10 text-brand">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryButton href="#diagnostico">Mapear meus gargalos</PrimaryButton>
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
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                  Painel de diagnóstico
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">
                  Jornada da captação à venda
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[color:var(--color-text-muted-2)]">
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
                { k: "Gargalos", v: "3" },
                { k: "Prioridades", v: "2" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-background/40 p-3 text-center"
                >
                  <p className="font-display text-xl font-semibold text-foreground">
                    {s.v}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
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
    { icon: Search, title: "Diagnosticar", desc: "Entender o negócio, o mercado, a oferta e a jornada antes de qualquer campanha." },
    { icon: Megaphone, title: "Atrair", desc: "Google Ads, Meta Ads e conteúdo desenhados para gerar procura qualificada." },
    { icon: MousePointerClick, title: "Captar", desc: "Landing pages, formulários e canais que transformam interesse em contato." },
    { icon: Filter, title: "Qualificar", desc: "Perguntas certas, CRM e classificação para priorizar quem realmente compra." },
    { icon: Handshake, title: "Converter", desc: "Scripts, follow-up e recepção alinhados para levar o paciente até a agenda." },
    { icon: LineChart, title: "Otimizar", desc: "Indicadores, testes e ajustes contínuos para melhorar mês após mês." },
  ];
  return (
    <Section id="metodo">
      <SectionHead
        eyebrow="Método AVEX"
        title="Um método construído para clínicas — não para agências."
        subtitle="Seis etapas que conectam anúncio, atendimento e agenda. A ordem de execução é definida pelo gargalo, não por pacote pronto."
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
      <ol className="relative grid gap-4 lg:hidden">
        <div
          aria-hidden
          className="absolute bottom-3 left-[27px] top-3 w-px bg-gradient-to-b from-transparent via-brand/40 to-transparent sm:left-[27px]"
        />
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="relative flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border bg-background text-brand">
              <s.icon className="h-5 w-5" strokeWidth={1.6} />
              <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-brand font-mono text-[10px] font-semibold text-brand-foreground">
                {i + 1}
              </span>
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--color-text-muted-2)]">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm italic text-[color:var(--color-text-dim)]">
        Nenhuma clínica é igual — e nenhum plano deveria ser. A ordem e a intensidade de cada etapa vêm do diagnóstico, nunca de um pacote pronto.
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
        eyebrow="Frentes de trabalho"
        title="Soluções organizadas por resultado — não por serviço."
        subtitle="Cada bloco resolve uma dor específica. A combinação certa aparece depois do diagnóstico."
      />
      <div className="grid gap-4 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          className="lg:col-span-4"
          eyebrow="Bloco 01 · Aquisição"
          icon={Megaphone}
          title="Gerar novas oportunidades"
          desc="Colocar sua clínica na frente de quem já está procurando — e transformar essa procura em contato real."
          items={["Meta Ads", "Google Ads", "Landing Pages", "Rastreamento"]}
          visual={<AdsVisual />}
        />
        <BentoCard
          className="lg:col-span-2"
          eyebrow="Bloco 02 · Conversão"
          icon={Filter}
          title="Transformar contato em agenda"
          desc="Padronizar o WhatsApp, qualificar contatos e recuperar quem esfriou antes de agendar."
          items={["Scripts", "CRM", "Follow-up"]}
        />
        <BentoCard
          className="lg:col-span-2"
          eyebrow="Bloco 03 · Autoridade"
          icon={Sparkles}
          title="Posicionar como referência"
          desc="Comunicação, presença e conteúdo que sustentam preço, filtram público e reduzem objeção."
          items={["Conteúdo", "Design", "Vídeo"]}
          note="Serviços complementares"
        />
        <BentoCard
          className="lg:col-span-4"
          eyebrow="Bloco 04 · Escala"
          icon={TrendingUp}
          title="Estruturar o crescimento com previsibilidade"
          desc="Do funil aos indicadores: transformar a captação em um sistema que cresce sem depender de improviso."
          items={["Jornada", "Funis", "Automações", "Indicadores", "Assessoria"]}
          visual={<GrowthVisual />}
        />
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
  className = "",
  visual,
  note,
}: {
  eyebrow: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  items: string[];
  className?: string;
  visual?: React.ReactNode;
  note?: string;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-[color:var(--color-border-brand)] ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
          {eyebrow}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background/60 text-brand">
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-foreground md:text-2xl">
        {title}
      </h3>
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
      {visual && <div className="mt-6 flex-1">{visual}</div>}
      {note && (
        <p className="mt-6 border-t border-border pt-4 text-[11px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
          {note}
        </p>
      )}
      <a
        href="#diagnostico"
        className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-brand transition group-hover:gap-2"
      >
        Aplicar em minha clínica <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

function AdsVisual() {
  const bars = [22, 38, 30, 55, 48, 70, 62, 84];
  return (
    <div className="mt-2 flex h-32 items-end gap-2">
      {bars.map((h, i) => (
        <div key={i} className="flex-1">
          <div
            className="w-full rounded-md"
            style={{
              height: `${h}%`,
              background:
                i === bars.length - 1
                  ? "linear-gradient(180deg, #ff7849, #ff5a1f)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
              boxShadow:
                i === bars.length - 1 ? "0 0 24px rgba(255,92,31,0.55)" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function GrowthVisual() {
  return (
    <svg viewBox="0 0 400 110" className="mt-2 h-24 w-full" fill="none">
      <defs>
        <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 90 L50 78 L100 82 L150 60 L200 65 L250 40 L300 45 L350 22 L400 15 L400 110 L0 110 Z"
        fill="url(#lg)"
      />
      <path
        d="M0 90 L50 78 L100 82 L150 60 L200 65 L250 40 L300 45 L350 22 L400 15"
        stroke="#ff5a1f"
        strokeWidth="2"
      />
      {[
        [50, 78],
        [150, 60],
        [250, 40],
        [350, 22],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="3" fill="#ff5a1f" />
      ))}
    </svg>
  );
}

// ============================================================
// PLANOS
// ============================================================
function Plans() {
  const plans = [
    {
      tag: "Plano 01",
      title: "Gerar demanda em contato",
      desc: "Para negócios que precisam aumentar a entrada de novas oportunidades.",
      items: [
        "Diagnóstico inicial",
        "Planejamento",
        "Meta Ads ou Google Ads",
        "Landing page ou WhatsApp",
        "Rastreamento e otimização",
        "Relatório",
      ],
    },
    {
      tag: "Plano 02",
      title: "Gerar demanda e escalar",
      desc: "Para quem já tem alguma estrutura e precisa de volume e previsibilidade.",
      items: [
        "Meta Ads e Google Ads",
        "Remarketing",
        "Testes de ofertas",
        "Acompanhamento do atendimento",
        "Análise da jornada",
        "Otimizações frequentes",
      ],
      featured: true,
    },
    {
      tag: "Plano 03",
      title: "Gerar, escalar e otimizar",
      desc: "Para clínicas que precisam de assessoria mais ampla.",
      items: [
        "Planejamento estratégico",
        "Campanhas e funil",
        "Landing pages e CRM",
        "Atendimento e automações",
        "Indicadores",
        "Reuniões estratégicas",
      ],
    },
  ];
  return (
    <Section>
      <SectionHead
        eyebrow="Níveis de serviço"
        title="Três caminhos, um definido conforme seu cenário."
        subtitle="Os planos são pontos de partida. O escopo final é ajustado após o diagnóstico."
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
              <span className="absolute -top-3 left-6 rounded-full border border-[color:var(--color-border-brand)] bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-foreground">
                Mais aplicado
              </span>
            )}
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-brand">
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
                  className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold hover:[&]:btn-brand-hover"
                >
                  Avaliar este plano <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href="#diagnostico"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-[color:var(--color-border-brand)]"
                >
                  Avaliar este plano
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[color:var(--color-text-dim)]">
        O plano recomendado é definido após a análise do cenário, da estrutura e da
        capacidade de atendimento da clínica.
      </p>
    </Section>
  );
}

// ============================================================
// PARA QUEM É
// ============================================================
function ForWho() {
  const forItems = [
    "Clínicas particulares",
    "Consultórios",
    "Centros de estética",
    "Profissionais da saúde",
    "Negócios com atendimento pelo WhatsApp",
    "Empresas com capacidade para atender mais pessoas",
    "Quem aceita acompanhar dados e melhorar processos",
  ];
  const notFor = [
    "Quem procura resultado imediato sem estrutura",
    "Quem não pretende investir",
    "Quem não responde os contatos",
    "Quem não aceita melhorar o atendimento",
    "Quem busca apenas publicações baratas",
    "Quem deseja garantias irreais de faturamento",
  ];
  return (
    <Section>
      <SectionHead
        eyebrow="Alinhamento"
        title="Para quem faz sentido — e para quem não faz."
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
function Process() {
  const steps = [
    "Preenchimento do diagnóstico",
    "Análise inicial",
    "Reunião estratégica",
    "Identificação do gargalo",
    "Recomendação da solução",
    "Proposta personalizada",
    "Implantação",
    "Acompanhamento",
    "Melhoria contínua",
  ];
  return (
    <Section className="bg-surface/30">
      <SectionHead
        eyebrow="Processo"
        title="Como é o caminho até o resultado."
        subtitle="Da inscrição inicial ao acompanhamento estratégico contínuo."
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
        eyebrow="Provas e projetos"
        title="Estudos de caso, campanhas e indicadores."
        subtitle="Espaço reservado para materiais reais de clientes. Nenhum dado é apresentado sem autorização."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border bg-card p-6 transition hover:border-[color:var(--color-border-brand)]"
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <span className="relative text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-text-dim)]">
              Placeholder {String(i).padStart(2, "0")}
            </span>
            <div className="relative">
              <p className="font-display text-lg font-semibold text-foreground">
                Adicionar aqui um estudo de caso real.
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted-2)]">
                Depoimentos, prints, indicadores, campanhas, landing pages, dashboards.
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
    "Especialista em marketing e soluções digitais",
    "Formado em Administração",
    "Estudante de Psicologia",
    "Gestor de campanhas Google e Meta",
    "Foco em estratégia antes de ferramenta",
    "Pesquisador contínuo de tecnologia, IA e vendas",
  ];
  return (
    <Section id="sobre" className="bg-surface/30">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_1.1fr] lg:items-center">
        {/* Photo placeholder — substituir por <img src="..." /> */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 20% 30%, rgba(255,92,31,0.4), transparent 65%)",
            }}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--color-border-brand)] bg-gradient-to-br from-card-highlight via-card to-background">
            {/* Substituir este bloco por: <img src="..." alt="Wanderson Paixão" className="h-full w-full object-cover" /> */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div
              aria-hidden
              className="absolute -right-20 top-1/3 h-64 w-64 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,92,31,0.55), transparent 65%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end p-7 text-foreground">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-brand">
                  AVEX
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  Wanderson Paixão
                </p>
                <p className="mt-1 text-xs text-[color:var(--color-text-muted-2)]">
                  Estratégia · Marketing · Crescimento
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <EyebrowTag>Sobre</EyebrowTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.15] text-foreground md:text-4xl lg:text-[44px]">
            "Meu trabalho é compreender o problema antes de indicar a{" "}
            <span className="text-brand">ferramenta</span>."
          </h2>
          <p className="mt-6 text-[color:var(--color-text-muted-2)] md:text-lg">
            Não vendo tráfego pago como produto pronto. Analiso o negócio, entendo a
            operação, identifico o gargalo e recomendo o caminho — que pode ser
            anúncio, atendimento, funil, página, processo ou uma combinação disso.
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
function DiagnosticForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (step === 1) {
      if (validateStep1(form)) setStep(2);
      return;
    }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
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
          <h2 className="mt-6 font-display text-3xl font-semibold md:text-4xl">
            Recebi suas informações.
          </h2>
          <p className="mt-4 text-[color:var(--color-text-muted-2)]">
            Agora vou analisar seu cenário e verificar qual caminho pode fazer mais
            sentido para sua operação.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href={waLink}>Continuar no WhatsApp</PrimaryButton>
            <SecondaryButton href={waLink} external>
              Agendar reunião
            </SecondaryButton>
          </div>
        </div>
      </Section>
    );
  }

  const benefits = [
    "Identificação dos principais gargalos",
    "Prioridades claras para os próximos passos",
    "Recomendações baseadas no cenário real",
    "Indicação do serviço adequado",
  ];

  return (
    <Section id="diagnostico">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -z-10 mx-auto -mt-20 h-[400px] max-w-4xl opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,92,31,0.35), transparent 65%)",
        }}
      />
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.1fr] lg:items-start">
        <div>
          <EyebrowTag>Oferta principal</EyebrowTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] md:text-4xl lg:text-5xl">
            Diagnóstico Estratégico de{" "}
            <span className="text-brand">Captação e Conversão</span>
          </h2>
          <p className="mt-5 text-[color:var(--color-text-muted-2)] md:text-lg">
            Identifique o que está impedindo sua clínica de gerar, organizar ou
            converter mais oportunidades.
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
              Sem custo. Sem compromisso. Análise entregue em até 3 dias úteis após o envio.
            </p>
          </div>
        </div>

        <div
          id="formulario"
          className="relative rounded-3xl border border-[color:var(--color-border-brand)] bg-card-highlight p-6 shadow-2xl shadow-black/50 md:p-8"
        >
          {/* Step indicator */}
          <div className="mb-6 flex items-center gap-3">
            {[1, 2].map((n) => (
              <div key={n} className="flex flex-1 items-center gap-3">
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
                {n === 1 && <div className="mx-1 h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" name="nome" error={errors.nome} required />
                <Field label="Clínica ou negócio" name="clinica" error={errors.clinica} required />
                <Field label="Especialidade" name="especialidade" />
                <Field label="Cidade" name="cidade" error={errors.cidade} required />
                <Field
                  label="WhatsApp"
                  name="whatsapp"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  error={errors.whatsapp}
                  required
                />
                <Field label="E-mail" name="email" type="email" error={errors.email} required />
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4">
                <Field
                  label="Qual é sua principal dificuldade?"
                  name="dificuldade"
                  as="textarea"
                />
                <Field label="Como os pacientes chegam atualmente?" name="origem" />
                <Select
                  label="Sua clínica já anuncia?"
                  name="anuncia"
                  options={["Sim", "Não", "Já anunciei antes"]}
                />
                <Select
                  label="Existe recepção ou secretária?"
                  name="recepcao"
                  options={["Sim", "Não", "Terceirizada"]}
                />
                <Field
                  label="Quantos novos atendimentos consegue absorver por mês?"
                  name="capacidade"
                />
                <Field label="Principal procedimento ou serviço" name="procedimento" />
                <Select
                  label="Faixa de investimento pretendida em captação"
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
                  label="Prefere contato pelo WhatsApp ou reunião agendada?"
                  name="preferencia"
                  options={["WhatsApp", "Reunião agendada", "Tanto faz"]}
                />
                <label className="mt-1 flex items-start gap-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="consentimento"
                    required
                    className="mt-1 h-4 w-4 accent-[color:var(--color-brand)]"
                  />
                  <span className="text-[color:var(--color-text-muted-2)]">
                    Autorizo o uso destas informações para contato e análise comercial,
                    conforme a política de privacidade.
                  </span>
                </label>
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-[color:var(--color-text-muted-2)] hover:text-foreground"
                >
                  ← Voltar
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-brand inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold hover:[&]:btn-brand-hover disabled:opacity-60"
              >
                {status === "sending"
                  ? "Enviando..."
                  : step === 1
                    ? "Continuar"
                    : "Enviar para análise"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {status === "error" && (
              <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  as?: "textarea";
}) {
  const cls =
    "mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-[color:var(--color-text-dim)] outline-none transition focus:border-[color:var(--color-border-brand)] focus:ring-2 focus:ring-brand/30";
  return (
    <label className="block text-xs font-medium uppercase tracking-widest text-[color:var(--color-text-muted-2)]">
      {label} {required && <span className="text-brand">*</span>}
      {as === "textarea" ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={cls}
          required={required}
        />
      )}
      {error && <span className="mt-1 block text-xs normal-case text-brand">{error}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block text-xs font-medium uppercase tracking-widest text-[color:var(--color-text-muted-2)]">
      {label}
      <select
        name={name}
        className="mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-[color:var(--color-border-brand)] focus:ring-2 focus:ring-brand/30"
      >
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQ() {
  const items = [
    {
      q: "Você trabalha somente com tráfego pago?",
      a: "Não. Tráfego pago é uma das ferramentas. O trabalho começa entendendo o gargalo — pode ser posicionamento, página, atendimento, processo ou mídia.",
    },
    {
      q: "O investimento em anúncios está incluído?",
      a: "Não. A verba de anúncios é paga diretamente por você às plataformas (Google e Meta), separada da gestão.",
    },
    {
      q: "Em quanto tempo as campanhas são implantadas?",
      a: "Depende da estrutura atual, das aprovações da conta e do material disponível. Normalmente entre alguns dias e algumas semanas.",
    },
    {
      q: "Você garante quantidade de pacientes?",
      a: "Não. Nenhum profissional sério garante volume de pacientes, pois resultado depende de mercado, oferta, atendimento e capacidade operacional.",
    },
    {
      q: "É necessário ter site?",
      a: "Nem sempre. Em muitos casos uma landing page dedicada converte melhor que um site institucional.",
    },
    {
      q: "Você também cria landing pages?",
      a: "Sim, landing pages fazem parte do escopo quando são o gargalo identificado ou parte da estratégia recomendada.",
    },
    {
      q: "Você ajuda a recepção?",
      a: "Sim. Scripts, perguntas de qualificação, organização do WhatsApp e treinamento fazem parte do trabalho de conversão.",
    },
    {
      q: "Você atende somente clínicas?",
      a: "O foco é saúde: clínicas, consultórios, centros de estética e profissionais da área. Outros segmentos são avaliados caso a caso.",
    },
    {
      q: "Os serviços de conteúdo estão incluídos?",
      a: "Produção de conteúdo, design, gravação e edição são contratados como serviços complementares, quando necessários.",
    },
    {
      q: "Como funciona o diagnóstico?",
      a: "Você preenche o formulário, analiso o cenário e retorno com pontos de atenção, prioridades e recomendação do próximo passo.",
    },
    {
      q: "Qual é o prazo mínimo recomendado?",
      a: "Trabalhos de captação e conversão exigem tempo de teste e ajustes. O prazo mínimo é discutido conforme o cenário.",
    },
    {
      q: "Como os resultados são acompanhados?",
      a: "Com indicadores claros de cada etapa da jornada: cliques, contatos, qualificados, agendados e convertidos, além de reuniões periódicas.",
    },
  ];
  return (
    <Section id="faq">
      <SectionHead
        eyebrow="Perguntas frequentes"
        title="Dúvidas comuns antes de solicitar o diagnóstico."
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
function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-[100px] animate-glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,92,31,0.45), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <EyebrowTag>Último passo</EyebrowTag>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-[64px]">
          Antes de investir mais, descubra onde sua operação está{" "}
          <span className="text-gradient-brand">perdendo oportunidades</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-[color:var(--color-text-muted-2)] md:text-lg">
          Uma análise estratégica pode mostrar se o principal problema está na
          captação, na mensagem, na página, no atendimento ou na falta de
          acompanhamento.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="#diagnostico">Solicitar meu diagnóstico</PrimaryButton>
          <SecondaryButton href={waLink} external>
            <MessageCircle className="h-4 w-4" />
            Falar com Wanderson
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
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-border bg-card">
              <span className="absolute inset-0 bg-gradient-to-br from-brand/40 via-transparent to-transparent" />
              <span className="relative font-display text-base font-bold">A</span>
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-widest text-foreground">
                AVEX
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                Wanderson Paixão
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-[color:var(--color-text-muted-2)]">
            Estratégia de captação, jornada comercial e melhoria contínua para
            clínicas, consultórios e profissionais da saúde.
          </p>
          <p className="mt-4 text-xs text-[color:var(--color-text-dim)]">
            {CONFIG.cidade}
          </p>
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
              <a
                href={`mailto:${CONFIG.email}`}
                className="transition hover:text-brand"
              >
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
              <a href="#diagnostico" className="transition hover:text-brand">
                Solicitar diagnóstico
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-xs text-[color:var(--color-text-dim)]">
            © {new Date().getFullYear()} AVEX · Wanderson Paixão. Todos os direitos
            reservados.
          </p>
          <p className="max-w-xl text-xs text-[color:var(--color-text-dim)]">
            Resultados dependem de mercado, investimento, oferta, atendimento e
            capacidade operacional. Nenhum resultado é garantido.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// WHATSAPP FLOAT (mobile)
// ============================================================
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={`btn-brand fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold shadow-2xl transition md:hidden ${
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
        <DiagnosticSplit />
        <Method />
        <Solutions />
        <Plans />
        <ForWho />
        <Process />
        <Proof />
        <About />
        <DiagnosticForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/* Unused import guard */
void Target;
