/**
 * AVEX · Recebe os envios do formulário de diagnóstico e grava na planilha.
 *
 * Como instalar (uma vez só):
 *  1. Abra a planilha "AVEX · Leads do diagnóstico" > Extensões > Apps Script.
 *  2. Apague o conteúdo do editor, cole este arquivo inteiro e salve.
 *  3. Implantar > Nova implantação > tipo "App da Web".
 *       Executar como: Eu
 *       Quem pode acessar: Qualquer pessoa
 *  4. Autorize o acesso e copie a "URL do app da Web" (termina em /exec).
 *  5. Cole a URL em CONFIG.formEndpoint, em src/routes/index.tsx.
 */

// Ordem das colunas da planilha (linha 1). A chave é o `name` do campo no site.
const COLUMNS = [
  "_timestamp",
  "nome",
  "clinica",
  "especialidade",
  "cidade",
  "whatsapp",
  "email",
  "dificuldade",
  "origem",
  "anuncia",
  "recepcao",
  "capacidade",
  "procedimento",
  "investimento",
  "preferencia",
  "consentimento",
  "pagina",
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Campo invisível no site: se veio preenchido, é robô de spam.
    if (data.website) return json({ ok: true });

    const row = COLUMNS.map(function (key) {
      if (key === "_timestamp") return new Date();
      if (key === "consentimento") return data.consentimento ? "Sim" : "Não";
      return sanitize(data[key]);
    });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Evita que um texto começando com = + - @ vire fórmula na planilha.
function sanitize(value) {
  const text = String(value == null ? "" : value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
