import { createFileRoute } from "@tanstack/react-router";
import { DiagnosticSplit, FinalCTA, Footer, Header, Process, WhatsAppFloat } from "./index";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "AVEX · Diagnóstico da clínica" },
      {
        name: "description",
        content: "Veja onde os contatos param e como funciona o processo de análise da AVEX.",
      },
    ],
  }),
  component: DiagnosticPage,
});

function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FinalCTA eyebrow="Diagnóstico gratuito" headingLevel="h1" />
        <DiagnosticSplit />
        <Process />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
