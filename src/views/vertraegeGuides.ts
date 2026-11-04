// Guides: Verträge & Versicherungen kündigen und wechseln (Herbst 2026).
// Same shape as GROWTH_GUIDES_DATA in GrowthGuide.tsx; rendered by GrowthGuide and prerendered for SEO.
type L = { de: string; en: string };
const x = (de: string, en: string): L => ({ de, en });

export const VERTRAEGE_SLUGS = [
  "vertraege-kuendigen-wechseln",
  "internet-vertrag-wechseln",
  "handyvertrag-wechseln",
  "strom-gas-anbieter-wechseln",
  "kfz-versicherung-wechseln",
  "haftpflichtversicherung-deutschland",
  "girokonto-wechseln",
  "mietkaution-deutschland",
] as const;

const SRC = {
  bgb309: { label: "§ 309 BGB – Klauselverbote (Laufzeit, Verlängerung, Textform)", url: "https://dejure.org/gesetze/BGB/309.html" },
  bgb312k: { label: "§ 312k BGB – Kündigungsbutton", url: "https://www.gesetze-im-internet.de/bgb/__312k.html" },
  tkg56: { label: "§ 56 TKG – Vertragslaufzeit und Kündigung", url: "https://www.gesetze-im-internet.de/tkg_2021/__56.html" },
  tkg57: { label: "§ 57 TKG – Abweichung der Leistung (zu langsames Internet)", url: "https://dejure.org/gesetze/TKG/57.html" },
  tkg59: { label: "§ 59 TKG – Anbieterwechsel und Rufnummernmitnahme", url: "https://dejure.org/gesetze/TKG/59.html" },
  tkg60: { label: "§ 60 TKG – Umzug", url: "https://www.gesetze-im-internet.de/tkg_2021/__60.html" },
  breitband: { label: "Breitbandmessung der Bundesnetzagentur", url: "https://breitbandmessung.de/" },
  enwg41: { label: "§ 41 EnWG – Energielieferverträge, Preisänderungen", url: "https://www.gesetze-im-internet.de/enwg_2005/__41.html" },
  stromgvv20: { label: "§ 20 StromGVV – Kündigung der Grundversorgung", url: "https://www.gesetze-im-internet.de/stromgvv/__20.html" },
  bnetzaWechsel: { label: "Bundesnetzagentur – Lieferantenwechsel", url: "https://bundesnetzagentur.de/DE/Vportal/Energie/KuendigungLieferantenwechsel/Lieferantenwechsel/start.html" },
  vzStrom24: { label: "Verbraucherzentrale – Stromversorgerwechsel innerhalb von 24 Stunden", url: "https://www.verbraucherzentrale-niedersachsen.de/node/120320" },
  vvg11: { label: "§ 11 VVG – Verlängerung, Kündigung", url: "https://www.gesetze-im-internet.de/vvg_2008/__11.html" },
  vvg40: { label: "§ 40 VVG – Kündigung bei Prämienerhöhung", url: "https://www.gesetze-im-internet.de/vvg_2008/__40.html" },
  vzKfz: { label: "Verbraucherzentrale Hamburg – Kfz-Versicherung wechseln", url: "https://vzhh.de/print/pdf/node/341" },
  vzKonto: { label: "Verbraucherzentrale – Banken müssen beim Kontowechsel helfen", url: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/banken-muessen-beim-kontowechsel-helfen-13051" },
  bgb551: { label: "§ 551 BGB – Begrenzung und Anlage von Mietsicherheiten", url: "https://www.gesetze-im-internet.de/bgb/__551.html" },
};

export const VERTRAEGE_GUIDES = [
  {
    slug: "vertraege-kuendigen-wechseln",
    title: x("Verträge kündigen und wechseln in Deutschland: so geht's", "Cancelling and switching contracts in Germany: how it works"),
    description: x(
      "Kündigungsfristen, Kündigungsbutton, Sonderkündigungsrecht und die richtige Reihenfolge beim Wechsel von Internet, Handy, Strom, Versicherung und Konto.",
      "Notice periods, the cancellation button, special termination rights and the right order when switching internet, mobile, electricity, insurance and bank account."
    ),
    summary: x(
      "Fast alle laufenden Verträge in Deutschland verlängern sich automatisch, wenn du nicht kündigst. Seit 2022 gilt für viele Verbraucherverträge: Nach der ersten Laufzeit kannst du monatlich kündigen, und online abgeschlossene Abos brauchen einen Kündigungsbutton. Versicherungen sind die große Ausnahme – sie laufen meist ein Jahr und verlängern sich jeweils um ein weiteres Jahr.",
      "Almost every ongoing contract in Germany renews automatically unless you cancel. Since 2022, many consumer contracts can be cancelled monthly after the initial term, and subscriptions concluded online must offer a cancellation button. Insurance is the big exception – it usually runs for a year and renews for another year each time."
    ),
    timing: x(
      "Der Herbst ist Wechselzeit: Viele Kfz-Versicherungen musst du bis 30. November kündigen, Strom- und Gaspreise ändern sich oft zum Jahreswechsel, und nach einer Preiserhöhung hast du ein Sonderkündigungsrecht. Prüfe bei jedem Vertrag zuerst das Laufzeitende und die Kündigungsfrist.",
      "Autumn is switching season: many car insurance policies must be cancelled by 30 November, electricity and gas prices often change at the turn of the year, and a price increase gives you a special termination right. For each contract, check the end of the term and the notice period first."
    ),
    steps: [
      x("Liste alle Verträge auf: Internet, Handy, Strom, Gas, Versicherungen, Konto, Abos (Fitness, Streaming).", "List all contracts: internet, mobile, electricity, gas, insurance, bank account, subscriptions (gym, streaming)."),
      x("Notiere je Vertrag Kundennummer, Laufzeitende und Kündigungsfrist – sie stehen in Vertrag, Rechnung oder Kundenkonto.", "Note the customer number, end of term and notice period for each contract – they are in the contract, invoice or online account."),
      x("Vergleiche Angebote und schließe den neuen Vertrag ab, bevor du kündigst – vor allem bei Versicherung und Strom, damit keine Lücke entsteht.", "Compare offers and sign the new contract before cancelling – especially for insurance and electricity, so there is no gap."),
      x("Kündige in Textform (E-Mail, Online-Formular oder Kündigungsbutton) oder lass den neuen Anbieter kündigen, wenn er das anbietet.", "Cancel in text form (email, online form or cancellation button), or let the new provider cancel for you if it offers this."),
      x("Speichere die Kündigungsbestätigung mit Datum. Kommt keine Bestätigung, frag nach.", "Save the cancellation confirmation with its date. If none arrives, follow up."),
    ],
    checklist: [
      x("Kundennummer und Vertragsnummer", "Customer and contract number"),
      x("Laufzeitende und Kündigungsfrist", "End of term and notice period"),
      x("Zählernummer bzw. Marktlokations-ID (Strom/Gas)", "Meter number or market location ID (electricity/gas)"),
      x("IBAN für den neuen Vertrag", "IBAN for the new contract"),
      x("Kündigungsbestätigung (als PDF oder Screenshot speichern)", "Cancellation confirmation (save as PDF or screenshot)"),
    ],
    mistakes: [
      x("Erst kündigen, dann einen neuen Vertrag suchen – bei Kfz-Versicherung oder Strom kann das teuer werden.", "Cancelling first and only then looking for a new contract – this can be costly for car insurance or electricity."),
      x("Annehmen, dass Versicherungen monatlich kündbar sind. Sie laufen meist bis zum Ende des Versicherungsjahres.", "Assuming insurance can be cancelled monthly. It usually runs until the end of the insurance year."),
      x("Preiserhöhungsbriefe ignorieren – die Frist für das Sonderkündigungsrecht ist oft kurz.", "Ignoring price-increase letters – the deadline for the special termination right is often short."),
    ],
    faq: [
      { q: x("Muss eine Kündigung per Brief geschickt werden?", "Does a cancellation have to be sent by post?"), a: x("Bei den meisten Verbraucherverträgen reicht Textform, also auch E-Mail oder Online-Formular. Eine strengere Form darf in AGB nicht verlangt werden (§ 309 Nr. 13 BGB). Für den Nachweis ist eine Bestätigung wichtig.", "For most consumer contracts, text form is enough – email or an online form. Standard terms may not require a stricter form (§ 309 no. 13 BGB). Keep the confirmation as proof.") },
      { q: x("Was ist der Kündigungsbutton?", "What is the cancellation button?"), a: x("Wer Abos online verkauft, muss einen gut sichtbaren Button wie „Verträge hier kündigen“ anbieten. Fehlt er, kannst du jederzeit fristlos kündigen. Für Finanzdienstleistungen gilt diese Pflicht nicht.", "Businesses that sell subscriptions online must provide a clearly visible button such as “Verträge hier kündigen”. If it is missing, you can cancel at any time without notice. Financial services are excluded.") },
      { q: x("Was ist ein Sonderkündigungsrecht?", "What is a special termination right?"), a: x("Bei Preiserhöhungen kannst du Strom- und Gasverträge ohne Frist kündigen (§ 41 EnWG) und Versicherungen innerhalb eines Monats nach der Mitteilung (§ 40 VVG). Bei Internetverträgen gibt es Sonderrechte bei Umzug oder deutlich zu langsamer Leitung.", "After a price increase you can cancel electricity and gas contracts without notice (§ 41 EnWG) and insurance within one month of the notice (§ 40 VVG). Internet contracts have special rights when you move or when the connection is much slower than agreed.") },
    ],
    sources: [SRC.bgb309, SRC.bgb312k, SRC.tkg56, SRC.enwg41, SRC.vvg11, SRC.vvg40],
  },
  {
    slug: "internet-vertrag-wechseln",
    title: x("Internetvertrag wechseln oder kündigen: Fristen, Umzug, langsames Internet", "Switching or cancelling your internet contract in Germany"),
    description: x(
      "Höchstens 24 Monate Laufzeit, danach monatlich kündbar: wie du DSL, Kabel oder Glasfaser wechselst, was beim Umzug gilt und was du bei zu langsamem Internet tun kannst.",
      "A maximum 24-month term, then monthly cancellation: how to switch DSL, cable or fibre, what applies when you move and what to do if your internet is too slow."
    ),
    summary: x(
      "Die erste Laufzeit darf höchstens 24 Monate betragen, und jeder Anbieter muss dir auch einen Vertrag mit höchstens 12 Monaten anbieten. Nach der ersten Laufzeit kannst du jederzeit mit einer Frist von einem Monat kündigen (§ 56 TKG). Beim Wechsel darf dein Anschluss höchstens einen Arbeitstag ausfallen.",
      "The initial term may be at most 24 months, and every provider must also offer you a contract of at most 12 months. After the initial term you can cancel at any time with one month's notice (§ 56 TKG). When you switch, your connection may be down for at most one working day."
    ),
    timing: x(
      "Am einfachsten: Schließe den neuen Vertrag ab und beauftrage den neuen Anbieter mit der Kündigung und dem Wechseltermin. Plane den Wechsel auf das Laufzeitende des alten Vertrags.",
      "The easiest route: sign the new contract and ask the new provider to handle the cancellation and switch date. Plan the switch for the end of the old contract's term."
    ),
    steps: [
      x("Prüfe im Kundenkonto, ob die erste Laufzeit vorbei ist und wann der Vertrag frühestens endet.", "Check in your online account whether the initial term has ended and when the contract can end at the earliest."),
      x("Prüfe die Verfügbarkeit an deiner Adresse: DSL, Kabel oder Glasfaser und welche Geschwindigkeit tatsächlich möglich ist.", "Check what is available at your address – DSL, cable or fibre – and which speed is actually possible."),
      x("Schließe den neuen Vertrag ab und erlaube dem neuen Anbieter, den alten Vertrag zu kündigen (Anbieterwechsel).", "Sign the new contract and authorise the new provider to cancel the old one (provider switch)."),
      x("Gib Router oder Receiver des alten Anbieters zurück, wenn sie gemietet waren.", "Return the old provider's router or receiver if it was rented."),
    ],
    checklist: [
      x("Kundennummer beim alten Anbieter", "Customer number with the old provider"),
      x("Anschlusskennung bzw. Festnetznummer, falls sie mitgenommen werden soll", "Line ID or landline number if you want to keep it"),
      x("Name des Anschlussinhabers wie im alten Vertrag", "Account holder's name exactly as in the old contract"),
      x("Gemietete Geräte (Router) für die Rückgabe", "Rented devices (router) to return"),
    ],
    mistakes: [
      x("Selbst kündigen und erst danach den neuen Anbieter beauftragen – dann kann eine Lücke ohne Internet entstehen.", "Cancelling yourself and only then ordering the new provider – this can leave you without internet."),
      x("Den Namen des Anschlussinhabers anders schreiben als im alten Vertrag – der Wechsel kann daran scheitern.", "Writing the account holder's name differently from the old contract – the switch can fail because of this."),
      x("Beim Umzug einfach weiterzahlen, obwohl am neuen Wohnort kein Anschluss möglich ist.", "Simply continuing to pay after moving although no connection is possible at the new address."),
    ],
    faq: [
      { q: x("Was gilt, wenn ich umziehe?", "What happens when I move?"), a: x("Der Anbieter muss die Leistung an der neuen Adresse weiter erbringen, wenn er sie dort anbietet – die Laufzeit bleibt gleich. Bietet er sie dort nicht an, kannst du mit einer Frist von einem Monat kündigen (§ 60 TKG). Für den Umzug darf er ein angemessenes Entgelt verlangen.", "The provider must continue the service at the new address if it offers it there – the term stays the same. If it does not offer it there, you can cancel with one month's notice (§ 60 TKG). It may charge a reasonable fee for the move.") },
      { q: x("Mein Internet ist viel langsamer als im Vertrag. Was kann ich tun?", "My internet is much slower than in the contract. What can I do?"), a: x("Bei erheblichen, dauerhaften oder regelmäßig wiederkehrenden Abweichungen kannst du die Zahlung mindern oder außerordentlich kündigen (§ 57 TKG). Als Nachweis dient das Messprotokoll der Breitbandmessung der Bundesnetzagentur.", "If the speed deviates significantly, continuously or regularly, you can reduce your payment or terminate extraordinarily (§ 57 TKG). The measurement protocol from the Federal Network Agency's broadband test serves as proof.") },
      { q: x("Kann ich meine Festnetznummer mitnehmen?", "Can I keep my landline number?"), a: x("Ja, die Rufnummernmitnahme ist für dich kostenlos (§ 59 TKG). Beantrage sie beim neuen Anbieter zusammen mit dem Wechsel.", "Yes, number porting is free for you (§ 59 TKG). Request it from the new provider together with the switch.") },
    ],
    sources: [SRC.tkg56, SRC.tkg57, SRC.tkg59, SRC.tkg60, SRC.breitband],
  },
  {
    slug: "handyvertrag-wechseln",
    title: x("Handyvertrag wechseln oder kündigen: Fristen und Rufnummer mitnehmen", "Switching your mobile contract in Germany and keeping your number"),
    description: x(
      "Wann du deinen Handyvertrag kündigen kannst, wie die Rufnummernmitnahme funktioniert und was bei Prepaid und SIM-Karte für Neuankömmlinge wichtig ist.",
      "When you can cancel your mobile contract, how number porting works and what newcomers should know about prepaid and SIM cards."
    ),
    summary: x(
      "Für Handyverträge gelten dieselben Regeln wie für Internet: höchstens 24 Monate erste Laufzeit, danach monatlich kündbar. Deine Nummer kannst du kostenlos mitnehmen. Wer neu in Deutschland ist, startet oft mit Prepaid – ohne Laufzeit und ohne Bonitätsprüfung.",
      "Mobile contracts follow the same rules as internet: at most a 24-month initial term, then monthly cancellation. You can keep your number for free. Newcomers often start with prepaid – no term and no credit check."
    ),
    timing: x(
      "Kündige rechtzeitig vor Ende der ersten Laufzeit oder – danach – mit einem Monat Frist. Die Rufnummernmitnahme kannst du bei Mobilfunk jederzeit beantragen, also auch vor Vertragsende.",
      "Cancel in time before the initial term ends or – after that – with one month's notice. For mobile numbers you can request porting at any time, even before the contract ends."
    ),
    steps: [
      x("Prüfe im Kundenkonto Laufzeitende und Kündigungsfrist.", "Check the end of term and notice period in your online account."),
      x("Wähle den neuen Tarif. Achte auf Datenvolumen, Netz (Telekom, Vodafone, O2) und Laufzeit.", "Choose the new plan. Look at data volume, network (Telekom, Vodafone, O2) and term."),
      x("Beantrage beim neuen Anbieter die Rufnummernmitnahme; er übernimmt die Abstimmung mit dem alten Anbieter.", "Request number porting from the new provider; it coordinates with the old provider."),
      x("Kündige den alten Vertrag in Textform bzw. bestätige die Kündigung im Rahmen der Mitnahme.", "Cancel the old contract in text form or confirm the cancellation as part of porting."),
    ],
    checklist: [
      x("Ausweis oder Pass (für die Identitätsprüfung, auch bei Prepaid)", "ID card or passport (for identity verification, also for prepaid)"),
      x("Meldeadresse in Deutschland", "Registered address in Germany"),
      x("IBAN (für Verträge mit monatlicher Rechnung)", "IBAN (for contracts with a monthly bill)"),
      x("Rufnummer und Kundennummer beim alten Anbieter", "Phone number and customer number with the old provider"),
    ],
    mistakes: [
      x("Einen 24-Monats-Vertrag mit teurem Handy abschließen, obwohl ein günstiger SIM-only-Tarif reicht.", "Signing a 24-month contract with an expensive phone when a cheap SIM-only plan would do."),
      x("Den alten Vertrag kündigen und die Nummer vergessen – nach Vertragsende ist die Mitnahme nur noch begrenzt möglich.", "Cancelling the old contract and forgetting about the number – porting is only possible for a limited time after the contract ends."),
      x("Annehmen, dass eine ausländische SIM-Karte auf Dauer günstig ist – Roaming innerhalb der EU unterliegt Fair-Use-Grenzen.", "Assuming a foreign SIM card stays cheap long term – EU roaming is subject to fair-use limits."),
    ],
    faq: [
      { q: x("Kostet die Rufnummernmitnahme etwas?", "Does number porting cost anything?"), a: x("Nein, Verbrauchern dürfen dafür keine direkten Entgelte berechnet werden (§ 59 TKG). Verzögert sich die Mitnahme, steht dir eine Entschädigung zu.", "No, consumers may not be charged direct fees for it (§ 59 TKG). If porting is delayed, you are entitled to compensation.") },
      { q: x("Brauche ich für Prepaid einen Ausweis?", "Do I need ID for prepaid?"), a: x("Ja, auch Prepaid-Karten werden in Deutschland erst nach einer Identitätsprüfung freigeschaltet, zum Beispiel per Video-Ident oder im Shop.", "Yes, prepaid SIM cards in Germany are only activated after identity verification, for example by video ident or in a shop.") },
      { q: x("Bekomme ich ohne Schufa einen Vertrag?", "Can I get a contract without a Schufa history?"), a: x("Für Verträge mit monatlicher Rechnung prüfen Anbieter oft die Bonität. Wer neu ist, hat noch keine Schufa-Historie – Prepaid oder monatlich kündbare SIM-only-Tarife sind dann der einfache Einstieg.", "For contracts with a monthly bill, providers often check creditworthiness. Newcomers have no Schufa history yet – prepaid or monthly-cancellable SIM-only plans are the easy start.") },
    ],
    sources: [SRC.tkg56, SRC.tkg59],
  },
  {
    slug: "strom-gas-anbieter-wechseln",
    title: x("Strom- und Gasanbieter wechseln: Fristen, Grundversorgung, Preiserhöhung", "Switching electricity and gas supplier in Germany"),
    description: x(
      "Wie der Wechsel von Strom und Gas funktioniert, warum die Grundversorgung oft teuer ist, welche Fristen gelten und was du nach einer Preiserhöhung tun kannst.",
      "How switching electricity and gas works, why default supply (Grundversorgung) is often expensive, which notice periods apply and what to do after a price increase."
    ),
    summary: x(
      "Wer nach dem Einzug nichts abschließt, landet automatisch in der Grundversorgung – oft der teuerste Tarif. Die Grundversorgung kannst du mit zwei Wochen Frist kündigen, ohne Gebühren (§ 20 StromGVV). Seit 6. Juni 2025 muss der technische Wechsel des Stromanbieters an Werktagen innerhalb von 24 Stunden möglich sein; deine Kündigungsfrist gilt trotzdem.",
      "If you sign nothing after moving in, you are automatically placed in default supply (Grundversorgung) – often the most expensive tariff. You can cancel default supply with two weeks' notice and no fees (§ 20 StromGVV). Since 6 June 2025, the technical switch of electricity supplier must be possible within 24 hours on working days; your notice period still applies."
    ),
    timing: x(
      "Lies beim Einzug den Zählerstand ab und fotografiere ihn. Kündigst du einen Sondervertrag, gilt die vereinbarte Frist – oft ein Monat zum Laufzeitende. Nach einer Preiserhöhung kannst du ohne Frist zum Zeitpunkt der Erhöhung kündigen.",
      "Read and photograph the meter when you move in. For a special contract (Sondervertrag), the agreed notice applies – often one month before the end of the term. After a price increase you can cancel without notice, effective when the increase takes effect."
    ),
    steps: [
      x("Finde heraus, bei wem du Kunde bist – steht auf der Rechnung oder dem Willkommensbrief. Ohne Vertrag: beim Grundversorger deiner Stadt.", "Find out who your supplier is – see your bill or welcome letter. Without a contract: the default supplier in your city."),
      x("Notiere Zählernummer, Zählerstand und Jahresverbrauch (steht auf der letzten Jahresabrechnung).", "Note the meter number, meter reading and annual consumption (on your last annual bill)."),
      x("Vergleiche Tarife mit deinem Verbrauch und achte auf Preisgarantie, Laufzeit und Bonus-Bedingungen.", "Compare tariffs using your consumption and check price guarantee, term and bonus conditions."),
      x("Schließe den neuen Vertrag ab; in der Regel kündigt der neue Anbieter den alten Vertrag für dich.", "Sign the new contract; usually the new supplier cancels the old contract for you."),
      x("Prüfe die Schlussrechnung des alten Anbieters und die erste Abschlagszahlung des neuen.", "Check the old supplier's final bill and the new supplier's first monthly instalment."),
    ],
    checklist: [
      x("Zählernummer und aktueller Zählerstand (Foto)", "Meter number and current reading (photo)"),
      x("Marktlokations-ID (MaLo-ID), falls auf der Rechnung angegeben", "Market location ID (MaLo-ID), if shown on the bill"),
      x("Jahresverbrauch in kWh", "Annual consumption in kWh"),
      x("Kundennummer beim bisherigen Anbieter", "Customer number with the current supplier"),
    ],
    mistakes: [
      x("Monatelang in der teuren Grundversorgung bleiben, weil man nach dem Einzug nichts abgeschlossen hat.", "Staying in expensive default supply for months because nothing was signed after moving in."),
      x("Nur auf den Neukundenbonus schauen und den Preis im zweiten Jahr übersehen.", "Looking only at the new-customer bonus and overlooking the price in the second year."),
      x("Preiserhöhungsbriefe nicht lesen – damit verpasst du das Sonderkündigungsrecht.", "Not reading price-increase letters – and missing the special termination right."),
    ],
    faq: [
      { q: x("Kann mir beim Wechsel der Strom ausgehen?", "Can my power be cut off when I switch?"), a: x("Nein. Wenn beim Wechsel etwas schiefgeht, wirst du vom Grundversorger weiter beliefert. Der Strom fließt weiter.", "No. If something goes wrong during the switch, the default supplier continues to supply you. The power stays on.") },
      { q: x("Was gilt bei einer Preiserhöhung?", "What applies after a price increase?"), a: x("Der Anbieter muss Haushaltskunden mindestens einen Monat vorher informieren. Du kannst dann ohne Kündigungsfrist und ohne Gebühr kündigen, wirksam zum Zeitpunkt der Erhöhung (§ 41 EnWG).", "The supplier must notify household customers at least one month in advance. You can then cancel without notice and without a fee, effective when the increase takes effect (§ 41 EnWG).") },
      { q: x("Gilt das auch für Gas?", "Does this also apply to gas?"), a: x("Ja, für Gas gelten dieselben Grundregeln (Grundversorgung, Sonderkündigungsrecht bei Preiserhöhung). Die 24-Stunden-Regel betrifft bisher den Stromwechsel.", "Yes, the same basic rules apply to gas (default supply, special termination right after a price increase). The 24-hour rule currently applies to switching electricity.") },
    ],
    sources: [SRC.stromgvv20, SRC.enwg41, SRC.vzStrom24, SRC.bnetzaWechsel],
  },
  {
    slug: "kfz-versicherung-wechseln",
    title: x("Kfz-Versicherung wechseln: Stichtag 30. November und Sonderkündigung", "Switching car insurance in Germany: the 30 November deadline"),
    description: x(
      "Warum der 30. November für die Kfz-Versicherung wichtig ist, wann du außerhalb des Stichtags wechseln kannst und in welcher Reihenfolge du vorgehst.",
      "Why 30 November matters for car insurance, when you can switch outside the deadline and in which order to proceed."
    ),
    summary: x(
      "Bei den meisten Kfz-Versicherungen entspricht das Versicherungsjahr dem Kalenderjahr, und die Kündigungsfrist beträgt einen Monat. Deshalb musst du in diesen Fällen bis 30. November kündigen, um zum 1. Januar zu wechseln. Läuft dein Vertrag zu einem anderen Datum, gilt ein anderer Stichtag – er steht im Versicherungsschein.",
      "For most car insurance policies the insurance year equals the calendar year and the notice period is one month. That is why you usually have to cancel by 30 November to switch on 1 January. If your policy runs to a different date, a different deadline applies – it is in your policy document."
    ),
    timing: x(
      "Schließe zuerst die neue Versicherung ab und kündige dann die alte – so bist du nie ohne Haftpflichtschutz, der für jedes Auto Pflicht ist. Die Kündigung muss bis zum Stichtag beim Versicherer angekommen sein.",
      "Take out the new policy first and then cancel the old one – so you are never without liability cover, which is compulsory for every car. The cancellation must reach the insurer by the deadline."
    ),
    steps: [
      x("Prüfe im Versicherungsschein Ablaufdatum und Kündigungsfrist.", "Check the expiry date and notice period in your policy document."),
      x("Notiere deine Schadenfreiheitsklasse (SF-Klasse) – sie bestimmt den Preis und wird übertragen.", "Note your no-claims class (SF-Klasse) – it determines the price and is transferred."),
      x("Vergleiche Angebote mit gleicher Deckung (Haftpflicht, Teil- oder Vollkasko, Selbstbeteiligung).", "Compare offers with the same cover (liability, partial or comprehensive, deductible)."),
      x("Schließe die neue Versicherung ab und kündige die alte in Textform rechtzeitig vor dem Stichtag.", "Take out the new policy and cancel the old one in text form in good time before the deadline."),
    ],
    checklist: [
      x("Versicherungsschein mit Vertragsnummer", "Policy document with policy number"),
      x("Fahrzeugschein (Zulassungsbescheinigung Teil I)", "Vehicle registration certificate (Part I)"),
      x("Schadenfreiheitsklasse bzw. Nachweis aus dem Ausland", "No-claims class or proof from abroad"),
      x("Jährliche Fahrleistung und Stellplatz", "Annual mileage and parking situation"),
    ],
    mistakes: [
      x("Kündigen, bevor die neue Versicherung bestätigt ist.", "Cancelling before the new policy is confirmed."),
      x("Den 30. November als Absendedatum verstehen – entscheidend ist, wann die Kündigung ankommt.", "Treating 30 November as the sending date – what counts is when the cancellation arrives."),
      x("Schadenfreie Jahre aus dem Heimatland nicht nachfragen – manche Versicherer erkennen sie an.", "Not asking about no-claims years from your home country – some insurers recognise them."),
    ],
    faq: [
      { q: x("Kann ich nach dem 30. November noch wechseln?", "Can I still switch after 30 November?"), a: x("Ja, wenn du ein Sonderkündigungsrecht hast – etwa nach einer Beitragserhöhung ohne Leistungsänderung: dann innerhalb eines Monats nach Zugang der Mitteilung (§ 40 VVG). Auch nach einem Schadensfall oder beim Fahrzeugverkauf gibt es Sonderkündigungsrechte.", "Yes, if you have a special termination right – for example after a premium increase without a change in cover: then within one month of receiving the notice (§ 40 VVG). There are also special rights after a claim or when you sell the car.") },
      { q: x("Gilt der Stichtag für alle?", "Does the deadline apply to everyone?"), a: x("Nein, nur wenn dein Versicherungsjahr am 31. Dezember endet und die Frist einen Monat beträgt. Prüfe deinen Versicherungsschein.", "No, only if your insurance year ends on 31 December and the notice period is one month. Check your policy document.") },
      { q: x("Wie werden meine schadenfreien Jahre übertragen?", "How are my no-claims years transferred?"), a: x("Der neue Versicherer fragt die SF-Klasse in der Regel beim alten Versicherer ab. Prüfe die Einstufung auf der neuen Police.", "The new insurer usually requests the no-claims class from the old insurer. Check the classification on the new policy.") },
    ],
    sources: [SRC.vzKfz, SRC.vvg11, SRC.vvg40],
  },
  {
    slug: "haftpflichtversicherung-deutschland",
    title: x("Private Haftpflichtversicherung in Deutschland: warum, was kostet sie, wie wechseln", "Personal liability insurance in Germany: why, cost and switching"),
    description: x(
      "Warum fast jeder in Deutschland eine private Haftpflichtversicherung hat, was sie abdeckt, worauf du achten solltest und wie Kündigung und Wechsel funktionieren.",
      "Why almost everyone in Germany has personal liability insurance, what it covers, what to look for and how cancelling and switching work."
    ),
    summary: x(
      "In Deutschland haftest du für Schäden, die du anderen zufügst, unbegrenzt mit deinem Vermögen. Die private Haftpflichtversicherung ist nicht gesetzlich vorgeschrieben, gilt aber als eine der wichtigsten Versicherungen und ist meist günstig. Viele Vermieter fragen bei der Wohnungssuche danach.",
      "In Germany you are liable without limit for damage you cause to others. Personal liability insurance is not legally required, but it is considered one of the most important policies and is usually inexpensive. Many landlords ask about it during the flat search."
    ),
    timing: x(
      "Am besten direkt nach der Ankunft abschließen. Verträge laufen meist ein Jahr und verlängern sich automatisch um ein Jahr; kündigen kannst du zum Ende des Versicherungsjahres mit der vereinbarten Frist (ein bis drei Monate).",
      "Ideally take it out right after arriving. Contracts usually run for a year and renew automatically for another year; you can cancel at the end of the insurance year with the agreed notice (one to three months)."
    ),
    steps: [
      x("Entscheide, wer mitversichert sein soll: Single, Paar oder Familie.", "Decide who should be covered: single, couple or family."),
      x("Achte auf eine hohe Deckungssumme und auf Mietsachschäden (Schäden an der Mietwohnung).", "Look for a high coverage amount and rental property damage (damage to your rented flat)."),
      x("Vergleiche Angebote und schließe den Vertrag ab – oft online in wenigen Minuten.", "Compare offers and sign the contract – often online in a few minutes."),
      x("Beim Wechsel: neuen Vertrag abschließen, alten Vertrag zum Ende des Versicherungsjahres kündigen.", "When switching: sign the new contract and cancel the old one at the end of the insurance year."),
    ],
    checklist: [
      x("Meldeadresse in Deutschland", "Registered address in Germany"),
      x("IBAN für den Beitrag", "IBAN for the premium"),
      x("Namen und Geburtsdaten mitversicherter Personen", "Names and dates of birth of co-insured persons"),
      x("Bei Wechsel: Vertragsnummer und Ablaufdatum der alten Police", "When switching: policy number and expiry date of the old policy"),
    ],
    mistakes: [
      x("Haftpflicht mit Hausratversicherung verwechseln – Hausrat schützt deine eigenen Sachen, Haftpflicht Schäden bei anderen.", "Confusing liability with contents insurance – contents covers your own things, liability covers damage to others."),
      x("Mietsachschäden ausschließen – gerade für Mieter wichtig.", "Excluding rental property damage – especially important for tenants."),
      x("Den alten Vertrag kündigen, bevor der neue gilt.", "Cancelling the old contract before the new one starts."),
    ],
    faq: [
      { q: x("Ist die Haftpflichtversicherung Pflicht?", "Is liability insurance compulsory?"), a: x("Für Privatpersonen nicht – Pflicht ist sie zum Beispiel für Autos. Trotzdem wird sie dringend empfohlen, weil Schäden an Personen sehr teuer werden können.", "Not for private individuals – it is compulsory for cars, for example. Still, it is strongly recommended, because damage to people can become very expensive.") },
      { q: x("Kann ich bei einer Beitragserhöhung kündigen?", "Can I cancel after a premium increase?"), a: x("Ja, wenn der Beitrag aufgrund einer Anpassungsklausel steigt, ohne dass sich der Umfang ändert: innerhalb eines Monats nach Zugang der Mitteilung (§ 40 VVG).", "Yes, if the premium rises under an adjustment clause without a change in cover: within one month of receiving the notice (§ 40 VVG).") },
      { q: x("Was ist mit Verträgen über drei Jahre?", "What about contracts longer than three years?"), a: x("Verträge mit mehr als drei Jahren Laufzeit kannst du zum Ende des dritten Jahres oder jedes folgenden Jahres mit drei Monaten Frist kündigen (§ 11 VVG).", "Contracts with a term of more than three years can be cancelled at the end of the third year or any later year with three months' notice (§ 11 VVG).") },
    ],
    sources: [SRC.vvg11, SRC.vvg40],
  },
  {
    slug: "girokonto-wechseln",
    title: x("Girokonto wechseln: gesetzliche Kontowechselhilfe Schritt für Schritt", "Switching your bank account in Germany: the legal account-switching service"),
    description: x(
      "Wie die gesetzliche Kontowechselhilfe funktioniert, welche Fristen die Banken haben, was es kostet und woran du beim Wechsel denken solltest.",
      "How the legal account-switching service works, which deadlines banks have, what it costs and what to keep in mind when switching."
    ),
    summary: x(
      "Jede Bank in Deutschland muss dir auf Wunsch beim Kontowechsel helfen. Die neue Bank holt die Daten von Daueraufträgen, Lastschriften und Gutschriften der letzten 13 Monate bei der alten Bank, richtet sie neu ein und informiert z. B. deinen Arbeitgeber. Die Auskunft und die Schließung des alten Kontos sind kostenlos.",
      "Every bank in Germany must help you switch accounts on request. The new bank collects the standing orders, direct debits and incoming payments of the last 13 months from the old bank, sets them up again and informs your employer, for example. The information and closing the old account are free of charge."
    ),
    timing: x(
      "Die neue Bank fordert die Daten innerhalb von 2 Geschäftstagen an, die alte liefert innerhalb von 5 Geschäftstagen, und die neue richtet alles innerhalb von 5 Geschäftstagen ein. Lass beide Konten einige Wochen parallel laufen.",
      "The new bank requests the data within 2 business days, the old bank delivers within 5 business days, and the new bank sets everything up within 5 business days. Keep both accounts running in parallel for a few weeks."
    ),
    steps: [
      x("Eröffne das neue Konto und beantrage dort die Kontowechselhilfe (Formular oder online).", "Open the new account and request the account-switching service there (form or online)."),
      x("Wähle aus, welche Daueraufträge und Lastschriften übertragen werden und ob das alte Konto geschlossen wird.", "Choose which standing orders and direct debits are transferred and whether the old account is closed."),
      x("Prüfe die Liste der Zahlungspartner (Arbeitgeber, Vermieter, Versicherungen) und informiere fehlende selbst.", "Check the list of payers and payees (employer, landlord, insurers) and inform any missing ones yourself."),
      x("Schließe das alte Konto erst, wenn keine Zahlungen mehr dort ankommen.", "Close the old account only when no more payments arrive there."),
    ],
    checklist: [
      x("Ausweis oder Pass und Meldebescheinigung", "ID or passport and registration certificate"),
      x("IBAN des alten Kontos", "IBAN of the old account"),
      x("Liste wichtiger Zahlungspartner (Gehalt, Miete, Kindergeld, Versicherungen)", "List of important payers and payees (salary, rent, Kindergeld, insurance)"),
    ],
    mistakes: [
      x("Das alte Konto sofort schließen – verspätete Lastschriften können dann platzen.", "Closing the old account immediately – late direct debits can then bounce."),
      x("Arbeitgeber oder Familienkasse nicht informieren.", "Not informing your employer or the family benefits office."),
      x("Kontoführungsgebühren und Bedingungen des neuen Kontos nicht prüfen.", "Not checking the new account's fees and conditions."),
    ],
    faq: [
      { q: x("Kostet die Kontowechselhilfe etwas?", "Does the switching service cost anything?"), a: x("Die Auskunft über Daueraufträge und Lastschriften, die Listen und das Schließen des alten Kontos sind kostenlos. Für weitere Leistungen dürfen Banken nur angemessene, vereinbarte Entgelte verlangen – viele verlangen nichts.", "Information on standing orders and direct debits, the lists and closing the old account are free. Banks may only charge reasonable, agreed fees for other services – many charge nothing.") },
      { q: x("Wer haftet, wenn etwas schiefgeht?", "Who is liable if something goes wrong?"), a: x("Entsteht dir durch einen Fehler ein Schaden, etwa Mahngebühren, haften beide Banken (§ 25 Zahlungskontengesetz). Beschwerden kannst du bei der BaFin oder der Schlichtungsstelle der Bank einreichen.", "If an error causes you financial loss, such as late-payment fees, both banks are liable (§ 25 Payment Accounts Act). You can complain to BaFin or the bank's arbitration body.") },
      { q: x("Gilt das auch für eine Bank im Ausland?", "Does this apply to a bank abroad?"), a: x("Die volle Hilfe gilt nur zwischen Banken in Deutschland. Wechselst du in ein anderes EU-Land, muss die deutsche Bank dir die Listen geben, die ausländische Bank muss aber nicht helfen.", "Full assistance only applies between banks in Germany. If you switch to another EU country, the German bank must give you the lists, but the foreign bank is not required to help.") },
    ],
    sources: [SRC.vzKonto],
  },
  {
    slug: "mietkaution-deutschland",
    title: x("Mietkaution in Deutschland: Höhe, Raten, Kautionskonto und Rückzahlung", "Rental deposit in Germany: amount, instalments and repayment"),
    description: x(
      "Wie hoch die Mietkaution höchstens sein darf, dass du sie in drei Raten zahlen kannst, wie der Vermieter sie anlegen muss und was bei der Rückzahlung wichtig ist.",
      "How high a rental deposit may be, that you can pay it in three instalments, how the landlord must hold it and what matters when you get it back."
    ),
    summary: x(
      "Die Mietkaution darf höchstens drei Monatsmieten ohne Nebenkosten betragen. Eine Barkaution kannst du in drei gleichen Monatsraten zahlen – die erste zu Beginn des Mietverhältnisses. Der Vermieter muss die Kaution getrennt von seinem Vermögen anlegen, und die Zinsen gehören dir (§ 551 BGB).",
      "The rental deposit may be at most three months' rent excluding service charges. A cash deposit can be paid in three equal monthly instalments – the first at the start of the tenancy. The landlord must keep the deposit separate from their own assets, and the interest belongs to you (§ 551 BGB)."
    ),
    timing: x(
      "Die erste Rate ist zu Beginn des Mietverhältnisses fällig, die beiden weiteren mit den nächsten Mietzahlungen. Fotografiere beim Einzug den Zustand der Wohnung und bewahre das Übergabeprotokoll auf.",
      "The first instalment is due at the start of the tenancy, the other two with the following rent payments. Photograph the flat's condition when you move in and keep the handover report."
    ),
    steps: [
      x("Rechne nach: Kaution höchstens 3 × Kaltmiete (ohne Betriebskosten).", "Do the maths: deposit at most 3 × base rent (excluding service charges)."),
      x("Entscheide, ob du bar in drei Raten zahlst oder eine Alternative nutzt (Kautionskonto, Bankbürgschaft, Kautionsversicherung).", "Decide whether to pay in cash in three instalments or use an alternative (deposit account, bank guarantee, deposit insurance)."),
      x("Lass dir den Eingang der Kaution bestätigen und frag, wo sie angelegt ist.", "Get a receipt for the deposit and ask where it is held."),
      x("Beim Auszug: Übergabeprotokoll erstellen, Schlüssel gegen Quittung zurückgeben, Kontodaten für die Rückzahlung mitteilen.", "When moving out: create a handover report, return the keys against a receipt and provide your bank details for repayment."),
    ],
    checklist: [
      x("Mietvertrag mit Höhe der Kaltmiete", "Rental contract stating the base rent"),
      x("Zahlungsnachweise der Kautionsraten", "Proof of deposit instalment payments"),
      x("Übergabeprotokoll und Fotos vom Einzug", "Handover report and move-in photos"),
    ],
    mistakes: [
      x("Eine Kaution über drei Kaltmieten akzeptieren.", "Accepting a deposit higher than three months' base rent."),
      x("Die ganze Kaution vor der Schlüsselübergabe bar ohne Quittung zahlen.", "Paying the whole deposit in cash before receiving the keys, without a receipt."),
      x("Beim Einzug keine Mängel dokumentieren – das kann bei der Rückzahlung teuer werden.", "Not documenting defects at move-in – this can be costly when the deposit is repaid."),
    ],
    faq: [
      { q: x("Darf der Vermieter die ganze Kaution sofort verlangen?", "Can the landlord demand the full deposit at once?"), a: x("Bei einer Barkaution hast du das Recht, in drei gleichen Monatsraten zu zahlen. Eine abweichende Vereinbarung zu deinem Nachteil ist unwirksam.", "For a cash deposit you have the right to pay in three equal monthly instalments. An agreement to your disadvantage is invalid.") },
      { q: x("Bekomme ich Zinsen?", "Do I get interest?"), a: x("Ja, die Erträge stehen dir zu und erhöhen die Kaution. Ausnahme: Wohnheime für Studierende und Jugendliche.", "Yes, the returns belong to you and increase the deposit. Exception: student and youth dormitories.") },
      { q: x("Wann bekomme ich die Kaution zurück?", "When do I get the deposit back?"), a: x("Nach dem Auszug darf der Vermieter einen angemessenen Zeitraum prüfen, ob noch Forderungen bestehen, zum Beispiel aus der Nebenkostenabrechnung. Einen Teil kann er bis zur Abrechnung zurückbehalten.", "After you move out, the landlord may take a reasonable time to check for outstanding claims, for example from the service-charge statement. Part of it may be held back until that statement.") },
    ],
    sources: [SRC.bgb551],
  },
];
