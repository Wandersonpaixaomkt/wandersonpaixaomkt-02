import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
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
  Stethoscope,
  ClipboardList,
  Users,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// ============================================================
// CONFIGURAÇÃO — Altere aqui os dados de contato e integrações
// ============================================================
const CONFIG = {
  whatsapp: "5599999999999", // <- Substituir pelo número real com DDI+DDD
  whatsappMessage: "Olá Wanderson, gostaria de solicitar um diagnóstico para minha clínica.",
  email: "contato@avex.com.br", // <- Substituir
  instagram: "https://instagram.com/wandersonpaixao", // <- Substituir
  cidade: "Atendimento online em todo o Brasil",
  // Endpoint do formulário (CRM/Notion/Sheets). Ex: Zapier, Make, Supabase Function.
  formEndpoint: "", // <- Preencher com URL do webhook
};

const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderson Paixão · AVEX — Diagnóstico de Captação para Clínicas" },
      {
        name: "description",
        content:
          "Análise estratégica para clínicas, consultórios e profissionais da saúde. Descubra onde sua operação está perdendo oportunidades entre o anúncio e o agendamento.",
      },
      { property: "og:title", content: "AVEX · Wanderson Paixão — Diagnóstico para Clínicas" },
      {
        property: "og:description",
        content:
          "Posicionamento, anúncios, landing page, WhatsApp, recepção e conversão. Estruture a jornada da procura ao agendamento.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

// ============================================================
// COMPONENTES AUXILIARES
// ============================================================
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {(eyebrow || title || subtitle) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && (
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function CTAPrimary({ children = "Solicitar meu diagnóstico", href = "#diagnostico" }: { children?: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition hover:brightness-95 md:text-base"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function CTASecondary({ children = "Falar com Wanderson", href = waLink }: { children?: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-secondary md:text-base"
    >
      <MessageCircle className="h-4 w-4" />
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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-display text-lg font-bold">A</span>
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-sm font-bold text-foreground">AVEX</span>
            <span className="truncate text-[11px] text-muted-foreground">Wanderson Paixão</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
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
            className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Falar no WhatsApp
          </a>
          <a
            href="#diagnostico"
            className="rounded-lg bg-brand px-3.5 py-2 text-sm font-semibold text-brand-foreground transition hover:brightness-95"
          >
            Solicitar diagnóstico
          </a>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-border p-2 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3" aria-label="Menu móvel">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-3.5 py-2.5 text-center text-sm font-medium"
              >
                Falar no WhatsApp
              </a>
              <a
                href="#diagnostico"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-brand px-3.5 py-2.5 text-center text-sm font-semibold text-brand-foreground"
              >
                Solicitar diagnóstico
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const journey = [
    "Posicionamento",
    "Conteúdo",
    "Anúncios",
    "Landing page",
    "WhatsApp / Agenda",
    "Qualificação",
    "Atendimento",
    "Agendamento",
    "Venda",
    "Melhoria contínua",
  ];
  return (
    <div id="top" className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(600px circle at 15% 10%, oklch(0.72 0.15 175 / 0.15), transparent 60%), radial-gradient(500px circle at 85% 80%, oklch(0.28 0.06 240 / 0.08), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Diagnóstico estratégico para clínicas
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
              Descubra onde sua clínica está perdendo oportunidades — antes, durante e depois do contato do paciente.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              Analiso posicionamento, presença digital, anúncios, páginas, WhatsApp, recepção, qualificação, acompanhamento e conversão. O objetivo não é gerar apenas mais mensagens — é organizar o caminho da procura até o agendamento.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAPrimary />
              <CTASecondary />
            </div>
            <p className="mt-5 max-w-lg text-sm text-muted-foreground">
              Análise estratégica, sem promessas irreais e com recomendações baseadas no cenário da sua operação.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Jornada da captação à venda
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Um gargalo em qualquer etapa custa agendamentos.
            </h3>
            <ol className="mt-5 space-y-2">
              {journey.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FAIXA DE AUTORIDADE
// ============================================================
function Authority() {
  const areas = [
    "Google Ads",
    "Meta Ads",
    "Landing pages",
    "Jornada comercial",
    "CRM",
    "WhatsApp",
    "Scripts",
    "Automação",
    "Melhoria contínua",
  ];
  return (
    <div className="border-b border-border bg-background py-8">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Áreas de atuação
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {areas.map((a) => (
            <span key={a} className="text-sm font-medium text-foreground/80">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROBLEMA
// ============================================================
function Problems() {
  const items = [
    "Poucas mensagens chegando",
    "Dependência excessiva de indicações",
    "Contatos pouco qualificados",
    "Demora no atendimento",
    "Recepção sem padrão",
    "Ausência de follow-up",
    "Falta de organização dos contatos",
    "Site que não direciona para uma ação",
    "Instagram que informa, mas não gera procura",
    "Anúncios sem acompanhamento",
    "Falta de dados sobre quantos contatos viraram agendamentos",
    "Equipe sobrecarregada respondendo o mesmo",
  ];
  return (
    <Section
      id="problemas"
      eyebrow="Diagnóstico"
      title="O problema pode não estar apenas nos anúncios."
      subtitle="Muitas clínicas investem em mídia e ainda assim sentem que os contatos não avançam. Normalmente o gargalo está em outro ponto da jornada."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
              <X className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm text-foreground">{item}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl rounded-xl border border-brand/30 bg-brand/5 p-5 text-center text-base font-medium text-foreground">
        Gerar mais contatos não resolve sozinho quando a jornada entre o anúncio e o atendimento está quebrada.
      </p>
    </Section>
  );
}

// ============================================================
// DIAGNÓSTICO — EXPLICATIVO
// ============================================================
function DiagnosticExplain() {
  const analisa = [
    "Posicionamento",
    "Oferta",
    "Diferenciais",
    "Público",
    "Concorrência",
    "Presença no Google",
    "Instagram",
    "Site",
    "Landing pages",
    "Campanhas",
    "Rastreamento",
    "WhatsApp",
    "Recepção",
    "Qualificação",
    "Agenda",
    "Follow-up",
    "Indicadores",
  ];
  const gargalos = [
    "Pouca demanda",
    "Mensagem errada",
    "Canal inadequado",
    "Página fraca",
    "Público mal selecionado",
    "Atendimento lento",
    "Falta de processo",
    "Ausência de acompanhamento",
    "Baixa conversão",
  ];
  return (
    <Section
      eyebrow="Antes de escalar"
      title="Antes de anunciar mais, é preciso entender onde está o gargalo."
      subtitle="Investir em mídia sem diagnóstico é como aumentar a fila da recepção sem ampliar a agenda."
      className="bg-surface"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand/15 text-brand">
              <Search className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">O que pode ser analisado</h3>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {analisa.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-destructive/10 text-destructive">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">Possíveis gargalos</h3>
          </div>
          <ul className="mt-5 space-y-2.5">
            {gargalos.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// MÉTODO AVEX
// ============================================================
function Method() {
  const steps = [
    {
      icon: Search,
      title: "Diagnosticar",
      desc: "Análise do negócio, mercado, oferta, público, concorrentes, operação e jornada comercial.",
    },
    {
      icon: Megaphone,
      title: "Atrair",
      desc: "Google Ads, Meta Ads, presença digital e conteúdo orientado a gerar procura.",
    },
    {
      icon: MousePointerClick,
      title: "Captar",
      desc: "Landing pages, formulários, sites, WhatsApp e agenda estruturados para receber o interesse.",
    },
    {
      icon: Filter,
      title: "Qualificar",
      desc: "Perguntas estratégicas, CRM, classificação dos contatos e automações.",
    },
    {
      icon: Handshake,
      title: "Converter",
      desc: "Scripts, acompanhamento, follow-up, treinamento da recepção e organização do atendimento.",
    },
    {
      icon: LineChart,
      title: "Melhorar",
      desc: "Indicadores, testes, relatórios, ajustes e melhoria contínua.",
    },
  ];
  return (
    <Section
      id="metodo"
      eyebrow="Método AVEX"
      title="Método AVEX de Geração e Conversão"
      subtitle="Seis etapas que conectam anúncio, atendimento e agenda — aplicadas de acordo com o gargalo identificado."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="font-display text-3xl font-bold text-muted-foreground/30">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm italic text-muted-foreground">
        Não existe uma única solução para todos os negócios. A estrutura é definida de acordo com o principal gargalo identificado.
      </p>
    </Section>
  );
}

// ============================================================
// SOLUÇÕES
// ============================================================
function Solutions() {
  const blocks = [
    {
      icon: Megaphone,
      title: "Gerar novas oportunidades",
      items: [
        "Meta Ads",
        "Google Ads",
        "Campanhas locais",
        "Planejamento de mídia",
        "Páginas de captação",
        "Rastreamento de conversões",
      ],
    },
    {
      icon: Filter,
      title: "Melhorar a conversão",
      items: [
        "Análise do WhatsApp",
        "Scripts de atendimento",
        "Perguntas de qualificação",
        "CRM",
        "Follow-up",
        "Treinamento da recepção",
        "Acompanhamento dos contatos",
      ],
    },
    {
      icon: Sparkles,
      title: "Posicionamento e autoridade",
      items: [
        "Planejamento de conteúdo",
        "Design",
        "Produção de vídeo",
        "Organização do perfil",
        "Direcionamento de comunicação",
        "Campanhas para ampliar conteúdos estratégicos",
      ],
      note: "Produção de conteúdo, design, gravação e edição podem ser contratados como serviços complementares.",
    },
    {
      icon: TrendingUp,
      title: "Estruturar o crescimento",
      items: [
        "Análise da jornada do cliente",
        "Planejamento estratégico",
        "Site",
        "Landing pages",
        "Funis",
        "Automações",
        "Indicadores",
        "Assessoria",
        "Melhoria contínua",
      ],
    },
  ];
  return (
    <Section
      id="solucoes"
      eyebrow="Soluções"
      title="Soluções organizadas por objetivo"
      subtitle="Não é uma lista de serviços aleatórios. Cada bloco resolve uma dor específica da operação."
      className="bg-surface"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {b.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {it}
                </li>
              ))}
            </ul>
            {b.note && (
              <p className="mt-4 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
                {b.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
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
        "Direcionamento para landing page ou WhatsApp",
        "Rastreamento",
        "Otimização",
        "Relatório",
      ],
    },
    {
      tag: "Plano 02",
      title: "Gerar demanda e escalar",
      desc: "Para quem já tem alguma estrutura e precisa de volume e previsibilidade.",
      items: [
        "Meta Ads e Google Ads",
        "Campanhas adicionais",
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
      desc: "Para clínicas que precisam de uma assessoria mais ampla.",
      items: [
        "Planejamento estratégico",
        "Análise do negócio",
        "Campanhas",
        "Funil e landing pages",
        "CRM e atendimento",
        "Automações",
        "Indicadores",
        "Reuniões estratégicas",
        "Melhoria contínua",
      ],
    },
  ];
  return (
    <Section
      eyebrow="Níveis de serviço"
      title="Três caminhos, um definido conforme seu cenário."
      subtitle="Os planos são pontos de partida. O escopo final é ajustado após o diagnóstico."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.tag}
            className={`relative flex flex-col rounded-2xl border p-6 md:p-7 ${
              p.featured
                ? "border-brand/50 bg-card shadow-lg shadow-brand/10 ring-1 ring-brand/30"
                : "border-border bg-card"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                Mais aplicado
              </span>
            )}
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">{p.tag}</p>
            <h3 className="mt-2 text-xl font-bold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <ul className="mt-5 space-y-2">
              {p.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {i}
                </li>
              ))}
            </ul>
            <a
              href="#diagnostico"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Avaliar este plano <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        O plano recomendado é definido após a análise do cenário, da estrutura e da capacidade de atendimento da clínica.
      </p>
    </Section>
  );
}

// ============================================================
// OFERTA PRINCIPAL — DIAGNÓSTICO
// ============================================================
function DiagnosticOffer() {
  const analyzed = [
    "Canais de captação",
    "Oferta",
    "Posicionamento",
    "Anúncios",
    "Páginas",
    "WhatsApp",
    "Recepção",
    "Qualificação",
    "Follow-up",
    "Indicadores",
    "Capacidade de atendimento",
  ];
  const receives = [
    "Identificação dos principais gargalos",
    "Prioridades",
    "Recomendações",
    "Possibilidades de melhoria",
    "Indicação do próximo passo",
    "Recomendação do serviço adequado",
  ];
  return (
    <Section eyebrow="Oferta principal" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
          Diagnóstico Estratégico de Captação e Conversão
        </h2>
        <p className="mt-4 text-pretty text-base text-primary-foreground/80 md:text-lg">
          Identifique o que está impedindo sua clínica de gerar, organizar ou converter mais oportunidades.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 md:p-7">
          <h3 className="text-lg font-semibold">O que será analisado</h3>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {analyzed.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 md:p-7">
          <h3 className="text-lg font-semibold">O que você recebe</h3>
          <ul className="mt-5 space-y-2.5">
            {receives.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href="#formulario"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg transition hover:brightness-95 md:text-base"
        >
          Quero identificar meus gargalos <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}

// ============================================================
// PARA QUEM É / NÃO É
// ============================================================
function ForWho() {
  const forItems = [
    "Clínicas particulares",
    "Consultórios",
    "Centros de estética",
    "Profissionais da saúde",
    "Negócios com atendimento pelo WhatsApp",
    "Negócios com recepção ou secretária",
    "Empresas com capacidade para atender mais pessoas",
    "Empresas dispostas a acompanhar dados e melhorar processos",
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
    <Section eyebrow="Alinhamento" title="Para quem faz sentido — e para quem não faz.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 md:p-7">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-brand" /> Para quem é
          </h3>
          <ul className="mt-5 space-y-2.5">
            {forItems.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <XCircle className="h-5 w-5 text-destructive" /> Para quem não é
          </h3>
          <ul className="mt-5 space-y-2.5">
            {notFor.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
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
// PROCESSO DE TRABALHO
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
    <Section
      eyebrow="Processo"
      title="Como é o caminho até o resultado."
      subtitle="Da inscrição inicial ao acompanhamento estratégico contínuo."
      className="bg-surface"
    >
      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/15 font-display text-lg font-bold text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pt-1.5 text-sm font-medium text-foreground">{s}</p>
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
    <Section
      eyebrow="Provas e projetos"
      title="Estudos de caso, campanhas e indicadores."
      subtitle="Esta seção é reservada para materiais reais de clientes. Nenhum dado é apresentado sem autorização."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex aspect-[4/5] flex-col justify-between rounded-2xl border border-dashed border-border bg-card p-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Placeholder {i}
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                Adicionar aqui um estudo de caso real.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Depoimentos, prints, indicadores, campanhas, landing pages, dashboards e processos.
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
    "Gestor de campanhas no Google e Meta",
    "Foco em estratégia antes de ferramenta",
    "Pesquisador contínuo de tecnologia, marketing, IA, vendas e negócios",
  ];
  return (
    <Section id="sobre" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/70">
            {/* Substituir por foto do Wanderson: <img src="..." alt="Wanderson Paixão" /> */}
            <div className="flex h-full items-end p-6 text-primary-foreground">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">AVEX</p>
                <p className="font-display text-2xl font-bold">Wanderson Paixão</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Sobre
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            "Meu trabalho é compreender o problema antes de indicar a ferramenta."
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            Não vendo tráfego pago como produto pronto. Analiso o negócio, entendo a operação, identifico o gargalo e recomendo o caminho — que pode ser anúncio, atendimento, funil, página, processo ou uma combinação disso.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
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
// FORMULÁRIO
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
        // Integração — CRM / Notion / Google Sheets / Webhook
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Falha no envio");
      } else {
        // Sem endpoint: simula sucesso — configurar CONFIG.formEndpoint
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <Section id="diagnostico" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-2xl rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8 text-center md:p-12">
          <span className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-brand text-brand-foreground">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">Recebi suas informações.</h2>
          <p className="mt-4 text-primary-foreground/80">
            Agora vou analisar seu cenário e verificar qual caminho pode fazer mais sentido para sua operação.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Continuar no WhatsApp
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-5 py-3 text-sm font-semibold"
            >
              Agendar reunião
            </a>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="diagnostico"
      eyebrow="Solicitar diagnóstico"
      title="Preencha para receber uma análise do seu cenário."
      subtitle="Duas etapas curtas. Suas respostas orientam a conversa e evitam propostas genéricas."
    >
      <div id="formulario" className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <div className="mb-8 flex items-center gap-3">
          {[1, 2].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-3">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${
                  step >= (n as 1 | 2)
                    ? "bg-brand text-brand-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {n}
              </span>
              <span className="text-sm font-medium text-foreground">
                {n === 1 ? "Informações básicas" : "Cenário"}
              </span>
              {n === 1 && <div className="ml-2 h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" name="nome" error={errors.nome} required />
              <Field label="Nome da clínica ou negócio" name="clinica" error={errors.clinica} required />
              <Field label="Especialidade" name="especialidade" />
              <Field label="Cidade" name="cidade" error={errors.cidade} required />
              <Field label="WhatsApp" name="whatsapp" type="tel" placeholder="(00) 00000-0000" error={errors.whatsapp} required />
              <Field label="E-mail" name="email" type="email" error={errors.email} required />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4">
              <Field label="Qual é sua principal dificuldade?" name="dificuldade" as="textarea" />
              <Field label="Como os pacientes chegam atualmente?" name="origem" />
              <Select label="Sua clínica já anuncia?" name="anuncia" options={["Sim", "Não", "Já anunciei antes"]} />
              <Select label="Existe recepção ou secretária?" name="recepcao" options={["Sim", "Não", "Terceirizada"]} />
              <Field label="Quantos novos atendimentos consegue absorver por mês?" name="capacidade" />
              <Field label="Qual é o principal procedimento ou serviço?" name="procedimento" />
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
              <label className="flex items-start gap-3 pt-2 text-sm text-foreground">
                <input type="checkbox" name="consentimento" required className="mt-1 h-4 w-4 accent-[color:var(--color-brand)]" />
                <span>
                  Autorizo o uso destas informações para contato e análise comercial, conforme a política de privacidade.
                </span>
              </label>
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                ← Voltar
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow transition hover:brightness-95 disabled:opacity-60"
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
            <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.
            </p>
          )}
        </form>
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
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30";
  return (
    <label className="block text-sm font-medium text-foreground">
      {label} {required && <span className="text-destructive">*</span>}
      {as === "textarea" ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} className={cls} required={required} />
      )}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      <select
        name={name}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
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
      a: "O prazo depende da estrutura atual, das aprovações da conta e do material disponível. Normalmente entre alguns dias e algumas semanas.",
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
    <Section id="faq" eyebrow="Perguntas frequentes" title="Dúvidas comuns antes de solicitar o diagnóstico.">
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((it, i) => (
          <details key={i} className="group px-5 py-4 md:px-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="text-base font-semibold text-foreground">{it.q}</span>
              <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{it.a}</p>
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
    <Section className="bg-surface">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-primary p-10 text-center text-primary-foreground md:p-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          <Stethoscope className="h-3.5 w-3.5 text-brand" /> Último passo
        </span>
        <h2 className="mt-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
          Antes de investir mais, descubra onde sua operação está perdendo oportunidades.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-primary-foreground/80 md:text-lg">
          Uma análise estratégica pode mostrar se o principal problema está na captação, na mensagem, na página, no atendimento ou na falta de acompanhamento.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#diagnostico"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg transition hover:brightness-95 md:text-base"
          >
            Solicitar meu diagnóstico <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary-foreground/5 px-6 py-3.5 text-sm font-semibold md:text-base"
          >
            <MessageCircle className="h-4 w-4" /> Falar com Wanderson
          </a>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-display text-lg font-bold">A</span>
            </span>
            <div className="leading-tight">
              <p className="font-display font-bold text-foreground">AVEX</p>
              <p className="text-xs text-muted-foreground">Wanderson Paixão</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Estratégia de captação, jornada comercial e melhoria contínua para clínicas, consultórios e profissionais da saúde.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">{CONFIG.cidade}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={waLink} target="_blank" rel="noreferrer" className="hover:text-foreground">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONFIG.email}`} className="hover:text-foreground">
                {CONFIG.email}
              </a>
            </li>
            <li>
              <a href={CONFIG.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Institucional</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                Política de privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Termos de uso
              </a>
            </li>
            <li>
              <a href="#diagnostico" className="hover:text-foreground">
                Solicitar diagnóstico
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-6 md:px-8">
          <p className="text-xs text-muted-foreground">
            Resultados dependem de fatores como mercado, investimento, oferta, atendimento e capacidade operacional. Nenhum resultado é garantido.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} AVEX · Wanderson Paixão. Todos os direitos reservados.
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
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition md:hidden ${
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
        <DiagnosticExplain />
        <Method />
        <Solutions />
        <Plans />
        <DiagnosticOffer />
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

// Unused-icon suppression for tree-shaking clarity
void Users; void ClipboardList;
