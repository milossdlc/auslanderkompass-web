import { useEffect } from "react";
import { LANG_ORDER, STRINGS } from "../i18n";
import type { Lang } from "../types";
import "../styles/publicGuidePolish.css";

type LocalText = { de: string; en: string };
type FAQ = { q: LocalText; a: LocalText };
type Source = { label: string; url: string };
type Guide = {
  slug: string;
  title: LocalText;
  description: LocalText;
  summary: LocalText;
  timing: LocalText;
  steps: LocalText[];
  checklist: LocalText[];
  mistakes: LocalText[];
  faq: FAQ[];
  sources: Source[];
};

const t = (value: LocalText, de: boolean) => de ? value.de : value.en;

const GUIDES: Guide[] = [
  {
    slug: "aufenthaltstitel-verlaengern",
    title: { de: "Aufenthaltstitel verlängern in Deutschland", en: "Residence permit renewal in Germany" },
    description: { de: "Aufenthaltstitel verlängern: wann du anfangen solltest, welche Unterlagen häufig gebraucht werden und was bei einem rechtzeitigen Antrag wichtig ist.", en: "Residence permit renewal in Germany: when to start, which documents are commonly needed and why applying before expiry matters." },
    summary: { de: "Beginne frühzeitig und prüfe immer die Anforderungen für deinen konkreten Aufenthaltstitel und deine zuständige Ausländerbehörde. Viele Behörden empfehlen, mehrere Wochen vor Ablauf mit der Verlängerung zu beginnen.", en: "Start early and always check the requirements for your specific residence title and responsible foreigners authority. Many authorities recommend beginning the renewal process several weeks before expiry." },
    timing: { de: "Wichtig: Der Antrag sollte vor Ablauf deines aktuellen Aufenthaltstitels gestellt werden. Bei vielen Aufenthaltstiteln gilt der bisherige Titel bei rechtzeitigem Antrag grundsätzlich bis zur Entscheidung der Ausländerbehörde fort (§ 81 Abs. 4 AufenthG; Ausnahmen gelten, unter anderem für bestimmte Visa). Lokale Behörden können zusätzlich einen früheren Planungstermin empfehlen.", en: "Important: apply before your current residence title expires. For many residence titles, a timely application generally means the existing title continues until the authority decides (§ 81(4) Residence Act; exceptions apply, including certain visas). Local authorities may recommend starting earlier for planning purposes." },
    steps: [
      { de: "Prüfe die Art deines Aufenthaltstitels, das Ablaufdatum und die für dich zuständige Ausländerbehörde.", en: "Check your residence title type, expiry date and the authority responsible for your case." },
      { de: "Öffne den offiziellen Online-Dienst deiner Behörde und prüfe die aktuelle Unterlagenliste für genau deinen Aufenthaltstitel.", en: "Open your authority's official online service and check the current document list for your exact residence title." },
      { de: "Bereite Pass, aktuellen Aufenthaltstitel und die titelbezogenen Nachweise vor, zum Beispiel Beschäftigungs-, Einkommens-, Studien- oder Familiennachweise.", en: "Prepare your passport, current residence title and permit-specific evidence, such as employment, income, study or family documents." },
      { de: "Stelle den Antrag rechtzeitig und speichere Eingangsbestätigung, Aktenzeichen und hochgeladene Unterlagen.", en: "Submit the application in time and keep the confirmation, reference number and uploaded documents." }
    ],
    checklist: [
      { de: "Reisepass oder Nationalpass", en: "Passport or national passport" },
      { de: "Aktueller Aufenthaltstitel und gegebenenfalls Zusatzblatt", en: "Current residence title and, where applicable, supplementary sheet" },
      { de: "Nachweise, die zu deinem Aufenthaltszweck gehören", en: "Evidence relevant to the purpose of your residence" },
      { de: "Aktuelle Kontaktdaten und gegebenenfalls Meldebescheinigung", en: "Current contact details and, where required, registration certificate" },
      { de: "Nachweis über den rechtzeitig gestellten Antrag", en: "Proof that the application was submitted in time" }
    ],
    mistakes: [
      { de: "Bis kurz vor Ablauf warten und dann erst Unterlagen zusammensuchen.", en: "Waiting until just before expiry before collecting documents." },
      { de: "Eine allgemeine Unterlagenliste verwenden, obwohl der eigene Aufenthaltstitel andere Nachweise verlangt.", en: "Using a generic document list even though your permit type requires different evidence." },
      { de: "Davon ausgehen, dass ein gebuchter Termin automatisch dasselbe ist wie ein gestellter Antrag.", en: "Assuming that booking an appointment is automatically the same as submitting an application." }
    ],
    faq: [
      { q: { de: "Wann sollte ich mit der Verlängerung anfangen?", en: "When should I start the renewal?" }, a: { de: "Plane mehrere Wochen Vorlauf ein und prüfe die Empfehlung deiner zuständigen Behörde. In Hamburg wird für verschiedene Aufenthaltstitel häufig etwa acht Wochen vor Ablauf empfohlen. Entscheidend ist, den Antrag nicht erst nach Ablauf zu stellen.", en: "Allow several weeks and check your local authority's recommendation. In Hamburg, around eight weeks before expiry is commonly recommended for several permit categories. The key point is not to wait until after expiry to apply." } },
      { q: { de: "Bleibt mein Aufenthaltstitel während der Bearbeitung gültig?", en: "Does my residence title remain valid while the application is processed?" }, a: { de: "Bei einem vor Ablauf gestellten Verlängerungs- oder Folgeantrag gilt der bisherige Aufenthaltstitel nach § 81 Abs. 4 AufenthG grundsätzlich bis zur Entscheidung fort. Es gibt Ausnahmen, deshalb solltest du deinen konkreten Fall bei der Behörde prüfen.", en: "For an extension or follow-up residence-title application submitted before expiry, § 81(4) generally provides for the existing title to continue until a decision is made. Exceptions exist, so confirm your specific case with the authority." } },
      { q: { de: "Welche Unterlagen brauche ich?", en: "Which documents do I need?" }, a: { de: "Das hängt vom Aufenthaltszweck ab. Pass und aktueller Aufenthaltstitel gehören typischerweise dazu; Beschäftigungs-, Einkommens-, Studien- oder Familiennachweise können zusätzlich erforderlich sein.", en: "It depends on the purpose of residence. Passport and current residence title are commonly required; employment, income, study or family evidence may also be needed." } }
    ],
    sources: [
      { label: "§ 81 AufenthG – Gesetze im Internet", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__81.html" },
      { label: "Hamburg Service – Verlängerung Aufenthaltserlaubnis zum Arbeiten", url: "https://www.hamburg.de/service/info/111212533/n0/" }
    ]
  },
  {
    slug: "anmeldung-deutschland",
    title: { de: "Anmeldung in Deutschland: Frist, Unterlagen und Ablauf", en: "Registering your address in Germany: deadline, documents and process" },
    description: { de: "Anmeldung nach dem Einzug: Zwei-Wochen-Frist, Wohnungsgeberbestätigung, Meldebehörde und typische Fehler einfach erklärt.", en: "Address registration after moving in: the two-week rule, landlord confirmation, registration authority and common mistakes explained." },
    summary: { de: "Die Anmeldung ist an den tatsächlichen Einzug in eine Wohnung geknüpft. Nach § 17 Bundesmeldegesetz musst du dich grundsätzlich innerhalb von zwei Wochen nach dem Einzug bei der Meldebehörde anmelden.", en: "Address registration is tied to actually moving into a home. Under § 17 of the Federal Registration Act, you generally have to register with the registration authority within two weeks after moving in." },
    timing: { de: "Die gesetzliche Frist beginnt mit dem Einzug in die Wohnung, nicht automatisch mit deiner Einreise nach Deutschland. Für Sonderfälle und Ausnahmen gelten zusätzliche Regeln.", en: "The statutory period starts when you move into the home, not automatically when you enter Germany. Additional rules apply to special cases and exceptions." },
    steps: [
      { de: "Ziehe tatsächlich in deine neue Wohnung ein und notiere das Einzugsdatum.", en: "Actually move into your new home and note the move-in date." },
      { de: "Bitte den Wohnungsgeber um die Wohnungsgeberbestätigung.", en: "Ask the housing provider for the Wohnungsgeberbestätigung." },
      { de: "Buche oder nutze den von deiner Stadt vorgesehenen Weg zur Anmeldung bei der zuständigen Meldebehörde.", en: "Use the registration process provided by your city or municipality for the responsible registration authority." },
      { de: "Bewahre die Meldebestätigung auf; sie wird später bei vielen Verwaltungsprozessen gebraucht.", en: "Keep the registration confirmation; it is often needed for later administrative processes." }
    ],
    checklist: [
      { de: "Ausweis oder Reisepass", en: "ID card or passport" },
      { de: "Wohnungsgeberbestätigung", en: "Wohnungsgeberbestätigung from the housing provider" },
      { de: "Gegebenenfalls weitere Dokumente, die deine Kommune verlangt", en: "Any additional documents required by your municipality" },
      { de: "Einzugsdatum und vollständige Wohnadresse", en: "Move-in date and full home address" }
    ],
    mistakes: [
      { de: "Die Zwei-Wochen-Frist ab Einreise statt ab Einzug berechnen.", en: "Counting the two-week period from entry into Germany instead of move-in." },
      { de: "Ohne Wohnungsgeberbestätigung zum Termin gehen.", en: "Going to the appointment without the housing-provider confirmation." },
      { de: "Meldebestätigung nach der Anmeldung nicht aufbewahren.", en: "Not keeping the registration confirmation after registration." }
    ],
    faq: [
      { q: { de: "Wie lange habe ich für die Anmeldung Zeit?", en: "How long do I have to register?" }, a: { de: "Grundsätzlich zwei Wochen nach dem Einzug in die Wohnung (§ 17 Abs. 1 BMG).", en: "Generally two weeks after moving into the home (§ 17(1) BMG)." } },
      { q: { de: "Beginnt die Frist mit meiner Einreise nach Deutschland?", en: "Does the deadline start when I enter Germany?" }, a: { de: "Nein. Die allgemeine Frist nach § 17 BMG knüpft an den Einzug in eine Wohnung an. Für bestimmte kurzfristige Aufenthalte und Sonderfälle gibt es eigene Regeln.", en: "No. The general rule under § 17 BMG is linked to moving into a home. Separate rules exist for certain temporary stays and special cases." } },
      { q: { de: "Was ist die Wohnungsgeberbestätigung?", en: "What is a Wohnungsgeberbestätigung?" }, a: { de: "Das ist die Bestätigung des Wohnungsgebers über deinen Einzug. Sie ist ein typischer Bestandteil der Anmeldung.", en: "It is the housing provider's confirmation that you moved in. It is a standard part of the registration process." } }
    ],
    sources: [
      { label: "§ 17 BMG – Gesetze im Internet", url: "https://www.gesetze-im-internet.de/bmg/__17.html" },
      { label: "Bundesportal – Verwaltung in Deutschland", url: "https://verwaltung.bund.de/" }
    ]
  },
  {
    slug: "jobwechsel-aufenthaltstitel",
    title: { de: "Jobwechsel mit Aufenthaltstitel: Was du vorher prüfen solltest", en: "Changing jobs with a German residence permit: what to check first" },
    description: { de: "Jobwechsel mit Aufenthaltstitel: Beschäftigungsauflagen, Zusatzblatt, Arbeitgeberbindung und wichtige Schritte vor dem Wechsel.", en: "Changing jobs with a German residence permit: employment restrictions, supplementary sheet, employer ties and key checks before switching." },
    summary: { de: "Ob du den Arbeitgeber ohne vorherige Änderung deines Aufenthaltstitels wechseln darfst, hängt von deinem konkreten Titel und seinen Beschäftigungsauflagen ab. Prüfe deshalb immer Aufenthaltstitel und Zusatzblatt.", en: "Whether you may change employers without first changing your residence title depends on your specific title and its employment conditions. Always check the residence title and supplementary sheet." },
    timing: { de: "Prüfe die Beschäftigungsauflagen bevor du die neue Stelle antrittst. § 4a AufenthG verlangt, dass Beschränkungen der Erwerbstätigkeit aus dem Aufenthaltstitel erkennbar sind; für eine Änderung einer bestehenden Beschränkung kann eine Erlaubnis erforderlich sein.", en: "Check your employment conditions before starting the new job. § 4a of the Residence Act requires employment restrictions to be visible from the residence title; changing an existing restriction may require permission." },
    steps: [
      { de: "Lies Aufenthaltstitel und Zusatzblatt und suche nach Arbeitgeber-, Tätigkeits- oder sonstigen Beschäftigungsbeschränkungen.", en: "Read your residence title and supplementary sheet for employer, occupation or other employment restrictions." },
      { de: "Vergleiche den neuen Arbeitsvertrag mit den Bedingungen deines Aufenthaltstitels.", en: "Compare the new employment contract with the conditions of your residence title." },
      { de: "Wenn eine Beschränkung geändert werden muss, kläre das vor Arbeitsbeginn mit der zuständigen Ausländerbehörde.", en: "If a restriction has to be changed, clarify it with the foreigners authority before starting the new job." },
      { de: "Bewahre Vertrag, Stellenbeschreibung und behördliche Bestätigung oder Genehmigung auf.", en: "Keep the contract, job description and any authority confirmation or approval." }
    ],
    checklist: [
      { de: "Aufenthaltstitel", en: "Residence title" },
      { de: "Zusatzblatt", en: "Supplementary sheet (Zusatzblatt)" },
      { de: "Neuer Arbeitsvertrag", en: "New employment contract" },
      { de: "Stellenbeschreibung und gegebenenfalls Qualifikationsnachweise", en: "Job description and, where relevant, qualification evidence" }
    ],
    mistakes: [
      { de: "Nur auf den Namen des Aufenthaltstitels schauen und das Zusatzblatt ignorieren.", en: "Looking only at the permit name and ignoring the supplementary sheet." },
      { de: "Den neuen Job beginnen, obwohl eine bestehende Beschäftigungsbeschränkung noch nicht geändert wurde.", en: "Starting the new job before an existing employment restriction has been changed." },
      { de: "Regeln für die Blaue Karte EU auf alle anderen Aufenthaltstitel übertragen.", en: "Applying EU Blue Card job-change rules to every other residence title." }
    ],
    faq: [
      { q: { de: "Darf ich mit jedem Aufenthaltstitel den Arbeitgeber wechseln?", en: "Can I change employer with every residence title?" }, a: { de: "Nicht automatisch. Entscheidend sind dein konkreter Aufenthaltstitel und die eingetragenen Beschäftigungsauflagen.", en: "Not automatically. Your specific residence title and recorded employment restrictions are decisive." } },
      { q: { de: "Wo sehe ich, ob mein Job eingeschränkt ist?", en: "Where can I see whether my employment is restricted?" }, a: { de: "Prüfe den Aufenthaltstitel und ein vorhandenes Zusatzblatt. § 4a AufenthG sieht vor, dass Beschränkungen der Erwerbstätigkeit erkennbar sein müssen.", en: "Check the residence title and any supplementary sheet. § 4a provides that employment restrictions must be identifiable from the residence title." } },
      { q: { de: "Gibt es bei der Blauen Karte EU Sonderregeln?", en: "Are there special rules for the EU Blue Card?" }, a: { de: "Ja. Für die Blaue Karte EU gelten eigene Regelungen zum Arbeitgeberwechsel, insbesondere im ersten Beschäftigungsjahr. Prüfe deshalb immer die aktuellen Blue-Card-Regeln separat.", en: "Yes. The EU Blue Card has specific employer-change rules, especially during the first year of employment. Check the current Blue Card rules separately." } }
    ],
    sources: [
      { label: "§ 4a AufenthG – Gesetze im Internet", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__4a.html" },
      { label: "Make it in Germany – Blaue Karte EU", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/blaue-karte-eu" }
    ]
  },
  {
    slug: "arbeitslos-in-deutschland",
    title: { de: "Arbeitslos in Deutschland: Arbeitsuchend melden, arbeitslos melden, nächste Schritte", en: "Unemployed in Germany: job-seeker registration, unemployment registration and next steps" },
    description: { de: "Job verloren oder Kündigung erhalten? Wann du dich arbeitsuchend und arbeitslos melden solltest und welche Unterlagen du bereithältst.", en: "Lost your job or received notice? When to register as job-seeking and unemployed, and which documents to keep ready." },
    summary: { de: "Arbeitsuchendmeldung und Arbeitslosmeldung sind zwei verschiedene Schritte. Die Bundesagentur für Arbeit empfiehlt die Arbeitsuchendmeldung spätestens drei Monate vor Ende des Jobs oder innerhalb von drei Tagen, wenn du erst kurzfristig davon erfährst.", en: "Job-seeker registration and unemployment registration are two different steps. The Federal Employment Agency says to register as job-seeking at least three months before employment ends, or within three days if you only learn about the end at short notice." },
    timing: { de: "Die Arbeitslosmeldung ersetzt die Arbeitsuchendmeldung nicht. Die Arbeitslosmeldung sollte spätestens am ersten Tag ohne Beschäftigung erfolgen; sie kann frühestens drei Monate vorher vorgenommen werden.", en: "Unemployment registration does not replace job-seeker registration. You should register as unemployed no later than the first day without employment; registration can be made up to three months in advance." },
    steps: [
      { de: "Sobald das Ende deines Arbeitsverhältnisses feststeht, prüfe sofort die Frist für die Arbeitsuchendmeldung.", en: "As soon as the end of your employment is known, immediately check the deadline for job-seeker registration." },
      { de: "Melde dich bei der Bundesagentur für Arbeit arbeitsuchend.", en: "Register as job-seeking with the Federal Employment Agency." },
      { de: "Melde dich spätestens am ersten Tag ohne Beschäftigung zusätzlich arbeitslos.", en: "Also register as unemployed no later than your first day without employment." },
      { de: "Wenn dein Aufenthaltstitel an deine Beschäftigung gekoppelt sein könnte, prüfe parallel deine aufenthaltsrechtlichen Pflichten bei der zuständigen Ausländerbehörde.", en: "If your residence title may be connected to your employment, check your residence-related obligations with the foreigners authority in parallel." }
    ],
    checklist: [
      { de: "Kündigung oder Aufhebungsvertrag", en: "Termination notice or separation agreement" },
      { de: "Arbeitsvertrag und letzte Gehaltsabrechnungen", en: "Employment contract and recent payslips" },
      { de: "Sozialversicherungs- und Identifikationsdaten", en: "Social insurance and identification details" },
      { de: "Aufenthaltstitel und Zusatzblatt, falls relevant", en: "Residence title and supplementary sheet, where relevant" }
    ],
    mistakes: [
      { de: "Arbeitsuchendmeldung und Arbeitslosmeldung für denselben Vorgang halten.", en: "Treating job-seeker registration and unemployment registration as the same step." },
      { de: "Mit der Arbeitsuchendmeldung warten, obwohl das Ende des Jobs bereits bekannt ist.", en: "Waiting to register as job-seeking even though the employment end is already known." },
      { de: "Bei einem beschäftigungsbezogenen Aufenthaltstitel nur die Arbeitsagentur informieren und die Ausländerbehörde vergessen.", en: "With an employment-related residence title, informing only the employment agency and forgetting the foreigners authority." }
    ],
    faq: [
      { q: { de: "Wann muss ich mich arbeitsuchend melden?", en: "When do I need to register as job-seeking?" }, a: { de: "Mindestens drei Monate vor Beginn der Arbeitslosigkeit. Erfährst du kurzfristiger vom Jobende, solltest du dich innerhalb von drei Tagen arbeitsuchend melden.", en: "At least three months before unemployment begins. If you learn about the job ending at shorter notice, register as job-seeking within three days." } },
      { q: { de: "Wann muss ich mich arbeitslos melden?", en: "When do I need to register as unemployed?" }, a: { de: "Spätestens am ersten Tag ohne Beschäftigung. Die Meldung ist frühestens drei Monate vorher möglich.", en: "No later than the first day without employment. You can register up to three months in advance." } },
      { q: { de: "Muss ich bei Jobverlust auch an meinen Aufenthaltstitel denken?", en: "Do I also need to think about my residence title after losing a job?" }, a: { de: "Ja, wenn dein Aufenthaltstitel an Beschäftigung oder einen bestimmten Aufenthaltszweck geknüpft ist. Dann solltest du deine konkrete Situation zusätzlich mit der zuständigen Ausländerbehörde klären.", en: "Yes, if your residence title is tied to employment or a specific purpose of residence. In that case, clarify your situation with the responsible foreigners authority as well." } }
    ],
    sources: [
      { label: "Bundesagentur für Arbeit – Arbeitsuchend melden", url: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/ihre-schritte-wenn-sie-arbeitslos-werden/wie-sie-sich-arbeitsuchend-melden" },
      { label: "Bundesagentur für Arbeit – Arbeitslos melden", url: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/ihre-schritte-wenn-sie-arbeitslos-werden/wie-sie-sich-arbeitslos-melden" }
    ]
  },
  {
    slug: "niederlassungserlaubnis-blue-card",
    title: { de: "Niederlassungserlaubnis mit Blauer Karte EU: 27 oder 21 Monate?", en: "Permanent residence with an EU Blue Card: 27 or 21 months?" },
    description: { de: "Niederlassungserlaubnis mit Blauer Karte EU: 27 Monate mit A1 oder 21 Monate mit B1 – plus weitere Voraussetzungen und Unterlagen.", en: "Permanent residence with an EU Blue Card: 27 months with A1 or 21 months with B1, plus other requirements and typical documents." },
    summary: { de: "Für Inhaberinnen und Inhaber einer Blauen Karte EU gibt es einen erleichterten Weg zur Niederlassungserlaubnis. Nach den aktuellen Regeln kann sie grundsätzlich nach 27 Monaten qualifizierter Beschäftigung mit A1-Deutsch oder nach 21 Monaten mit B1-Deutsch möglich sein, wenn die weiteren Voraussetzungen erfüllt sind.", en: "EU Blue Card holders have a facilitated route to permanent residence. Under the current rules, it can generally be possible after 27 months of qualified employment with A1 German, or after 21 months with B1 German, if the other requirements are met." },
    timing: { de: "Die Monatszahl allein reicht nicht. Zusätzlich spielen unter anderem qualifizierte Beschäftigung, Rentenversicherungsbeiträge, Sprachkenntnisse, Grundkenntnisse der Rechts- und Gesellschaftsordnung sowie ausreichender Wohnraum eine Rolle.", en: "The number of months alone is not enough. Other factors include qualified employment, pension contributions, German language skills, basic knowledge of Germany's legal and social order, and adequate housing." },
    steps: [
      { de: "Prüfe, seit wann du die Blaue Karte EU besitzt und seit wann du eine passende qualifizierte Beschäftigung ausübst.", en: "Check how long you have held the EU Blue Card and how long you have been in qualifying skilled employment." },
      { de: "Prüfe deine Rentenversicherungszeiten und ob 27 Monate oder bei B1-Sprachnachweis 21 Monate für dich relevant sind.", en: "Check your pension-contribution periods and whether the 27-month route or the 21-month route with B1 applies to you." },
      { de: "Bereite Sprach-, Beschäftigungs-, Wohnraum- und weitere von deiner Behörde verlangte Nachweise vor.", en: "Prepare language, employment, housing and other evidence required by your authority." },
      { de: "Stelle den Antrag bei der für deinen Wohnort zuständigen Ausländerbehörde und reagiere auf Nachforderungen.", en: "Apply to the foreigners authority responsible for your place of residence and respond to any further document requests." }
    ],
    checklist: [
      { de: "Blaue Karte EU und Reisepass", en: "EU Blue Card and passport" },
      { de: "Beschäftigungs- und Einkommensnachweise", en: "Employment and income evidence" },
      { de: "Nachweis zu Rentenversicherungsbeiträgen", en: "Evidence of pension insurance contributions" },
      { de: "Sprachnachweis A1 oder B1, je nach gewünschtem Weg", en: "A1 or B1 language proof, depending on the route" },
      { de: "Nachweise zu Wohnraum und gegebenenfalls Leben-in-Deutschland-Kenntnissen", en: "Housing evidence and, where required, evidence of knowledge of life in Germany" }
    ],
    mistakes: [
      { de: "Nur 21 oder 27 Monate zählen und die übrigen Voraussetzungen ignorieren.", en: "Counting only 21 or 27 months and ignoring the other requirements." },
      { de: "Annehmen, dass jedes Sprachzertifikat automatisch von der Behörde akzeptiert wird.", en: "Assuming every language certificate is automatically accepted by the authority." },
      { de: "Beschäftigungs- und Rentenversicherungszeiten nicht vor dem Antrag abgleichen.", en: "Not checking employment and pension-contribution periods before applying." }
    ],
    faq: [
      { q: { de: "Wann sind 27 Monate relevant?", en: "When do the 27 months apply?" }, a: { de: "Für die erleichterte Niederlassungserlaubnis mit Blauer Karte EU gilt grundsätzlich eine 27-Monats-Route, wenn unter anderem Deutschkenntnisse auf A1-Niveau und die weiteren Voraussetzungen erfüllt sind.", en: "The facilitated EU Blue Card permanent-residence route generally uses 27 months when, among other requirements, A1 German and the other conditions are met." } },
      { q: { de: "Wann reichen 21 Monate?", en: "When can 21 months be enough?" }, a: { de: "Mit nachgewiesenen Deutschkenntnissen auf B1-Niveau kann sich die erforderliche Zeit grundsätzlich auf 21 Monate verkürzen, sofern auch die übrigen Voraussetzungen erfüllt sind.", en: "With proven B1 German, the required period can generally be reduced to 21 months if the other conditions are also met." } },
      { q: { de: "Brauche ich zusätzlich Rentenversicherungsbeiträge?", en: "Do I also need pension contributions?" }, a: { de: "Ja. Die erleichterte Regelung setzt auch entsprechende Zeiten qualifizierter Beschäftigung und Beiträge zur gesetzlichen Rentenversicherung oder vergleichbare Aufwendungen voraus.", en: "Yes. The facilitated route also requires relevant periods of qualified employment and statutory pension contributions or comparable expenses." } }
    ],
    sources: [
      { label: "Make it in Germany – Niederlassungserlaubnis", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/dauerhaft-in-deutschland/niederlassungserlaubnis" },
      { label: "Make it in Germany – Blaue Karte EU", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/blaue-karte-eu" },
      { label: "§ 18c AufenthG – Gesetze im Internet", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html" }
    ]
  }
];

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function PublicGuide({ slug, lang, onLangChange }: { slug: string; lang: Lang; onLangChange: (lang: Lang) => void }) {
  const guide = GUIDES.find((g) => g.slug === slug);
  const publicLang: "de" | "en" = lang === "de" ? "de" : "en";
  const de = publicLang === "de";
  const related = guide ? GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3) : GUIDES.slice(0, 3);

  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const jsonLdId = "auslanderleben-guide-jsonld";
    document.getElementById(jsonLdId)?.remove();

    if (!guide) {
      document.title = de ? "Guide nicht gefunden – Ausländerleben" : "Guide not found – Ausländerleben";
      setMeta('meta[name="description"]', "name", "description", de ? "Dieser Ausländerleben Guide wurde nicht gefunden." : "This Ausländerleben guide could not be found.");
      setMeta('meta[name="robots"]', "name", "robots", "noindex,nofollow");
      if (canonical) canonical.href = `${window.location.origin}/`;
      return;
    }

    const pageTitle = `${t(guide.title, de)} | Ausländerleben`;
    const pageDescription = t(guide.description, de);
    const pageUrl = `${window.location.origin}/guide/${guide.slug}`;
    document.title = pageTitle;
    if (canonical) canonical.href = pageUrl;
    setMeta('meta[name="description"]', "name", "description", pageDescription);
    setMeta('meta[name="robots"]', "name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", pageDescription);
    setMeta('meta[property="og:type"]', "property", "og:type", "article");
    setMeta('meta[property="og:url"]', "property", "og:url", pageUrl);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Ausländerleben");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", pageDescription);

    const script = document.createElement("script");
    script.id = jsonLdId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "HowTo", inLanguage: publicLang, name: t(guide.title, de), description: pageDescription, step: guide.steps.map((step) => ({ "@type": "HowToStep", name: t(step, de) })), url: pageUrl, publisher: { "@type": "Organization", name: "Ausländerleben", url: window.location.origin } },
        { "@type": "FAQPage", inLanguage: publicLang, mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: t(item.q, de), acceptedAnswer: { "@type": "Answer", text: t(item.a, de) } })) }
      ]
    });
    document.head.appendChild(script);
    return () => document.getElementById(jsonLdId)?.remove();
  }, [de, guide, publicLang]);

  if (!guide) return <div className="public-guide-shell">
    <header className="public-guide-topbar"><a className="public-guide-brand" href="/">Ausländerleben</a><div className="public-guide-controls"><a className="public-home-btn" href="/">{de ? "Startseite" : "Home"}</a></div></header>
    <main className="public-guide"><header className="public-guide-hero"><div className="eyebrow">404</div><h1 className="disp">{de ? "Guide nicht gefunden" : "Guide not found"}</h1><p>{de ? "Dieser Guide existiert nicht oder wurde verschoben. Starte auf der Startseite oder öffne einen unserer verfügbaren Guides." : "This guide does not exist or may have moved. Start from the homepage or open one of our available guides."}</p></header><section className="public-related"><div className="eyebrow">{de ? "Verfügbare Guides" : "Available guides"}</div><div className="public-related-grid">{related.map((item)=><a key={item.slug} href={`/guide/${item.slug}`}><strong>{t(item.title,de)}</strong><span>{de ? "Guide öffnen" : "Open guide"} →</span></a>)}</div></section></main>
  </div>;

  return <div className="public-guide-shell">
    <header className="public-guide-topbar">
      <a className="public-guide-brand" href="/" aria-label="Ausländerleben home">Ausländerleben</a>
      <div className="public-guide-controls"><a className="public-home-btn" href="/">{de ? "Startseite" : "Home"}</a><select className="public-lang-select" aria-label="Language" value={publicLang} onChange={(e)=>onLangChange(e.target.value as Lang)}>{LANG_ORDER.filter((l)=>l === "de" || l === "en").map((l)=><option key={l} value={l}>{STRINGS[l].name}</option>)}</select></div>
    </header>
    <main className="public-guide" id="top">
      <header className="public-guide-hero"><div className="eyebrow">Ausländerleben Guide</div><h1 className="disp">{t(guide.title,de)}</h1><p>{t(guide.description,de)}</p><div className="public-guide-trust"><span>{de ? "Schritt für Schritt" : "Step by step"}</span><span>{de ? "Offizielle Quellen" : "Official sources"}</span><span>{de ? "Kostenlos" : "Free"}</span></div></header>
      <section className="public-guide-overview"><div><div className="eyebrow">{de ? "Kurz erklärt" : "In short"}</div><p>{t(guide.summary,de)}</p></div><div className="public-timing"><strong>{de ? "Wann handeln?" : "When to act"}</strong><p>{t(guide.timing,de)}</p></div></section>
      <section className="public-guide-card"><div className="eyebrow">{de ? "Was du jetzt tun kannst" : "What you can do now"}</div><ol>{guide.steps.map((step, i) => <li key={i}><span>{i + 1}</span><p>{t(step,de)}</p></li>)}</ol></section>
      <section className="public-content-grid"><div className="public-content-card"><div className="eyebrow">{de ? "Typische Unterlagen" : "Typical documents"}</div><ul>{guide.checklist.map((item)=><li key={t(item,de)}>{t(item,de)}</li>)}</ul></div><div className="public-content-card public-mistakes"><div className="eyebrow">{de ? "Häufige Fehler" : "Common mistakes"}</div><ul>{guide.mistakes.map((item)=><li key={t(item,de)}>{t(item,de)}</li>)}</ul></div></section>
      <section className="public-faq"><div className="eyebrow">FAQ</div><h2 className="disp">{de ? "Häufige Fragen" : "Frequently asked questions"}</h2><div className="public-faq-list">{guide.faq.map((item)=><details key={t(item.q,de)}><summary>{t(item.q,de)}</summary><p>{t(item.a,de)}</p></details>)}</div></section>
      <section className="public-sources"><div><div className="eyebrow">{de ? "Offizielle Quellen" : "Official sources"}</div><p>{de ? "Prüfe vor wichtigen Entscheidungen immer die aktuelle Information der zuständigen offiziellen Stelle." : "Before important decisions, always check the current information from the responsible official authority."}</p></div><div className="public-source-links">{guide.sources.map((source)=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div></section>
      <section className="public-guide-journey"><div><strong>{de ? "Möchtest du wissen, was für deine Situation als Nächstes wichtig ist?" : "Want to know what matters next for your situation?"}</strong><p>{de ? "Erstelle in wenigen Minuten deinen persönlichen Kompass mit Fristen und nächsten Schritten." : "Create your personal guide in a few minutes and see relevant deadlines and next steps."}</p></div><a href="/">{de ? "Persönlichen Kompass starten" : "Create my personal guide"} →</a></section>
      <section className="public-related"><div className="eyebrow">{de ? "Weitere Guides" : "Related guides"}</div><div className="public-related-grid">{related.map((item)=><a key={item.slug} href={`/guide/${item.slug}`}><strong>{t(item.title,de)}</strong><span>{de ? "Guide öffnen" : "Open guide"} →</span></a>)}</div></section>
      <footer className="public-guide-footer">{de ? "Hinweis: Ausländerleben bietet allgemeine Orientierung und keine individuelle Rechtsberatung. Prüfe wichtige Entscheidungen immer bei der zuständigen offiziellen Stelle." : "Note: Ausländerleben provides general orientation, not individual legal advice. Always confirm important decisions with the responsible official authority."}</footer>
    </main>
    <button className="back-to-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>{de ? "Nach oben" : "Back to top"} ↑</button>
  </div>;
}
