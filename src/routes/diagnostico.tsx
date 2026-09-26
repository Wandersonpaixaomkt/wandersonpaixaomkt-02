import { createFileRoute } from "@tanstack/react-router";
import {
  DiagnosticSplit,
  FinalCTA,
  Footer,
  Header,
  Process,
  WhatsAppFloat,
} from "./index";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico e processo · AVEX" },
      {
        name: "description",
        content:
          "Entenda os gargalos da captação da sua clínica e conheça as etapas do processo AVEX.",
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
        <FinalCTA />
        <DiagnosticSplit />
        <Process />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
