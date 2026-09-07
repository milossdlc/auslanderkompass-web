import type { Lang, Profile } from "../types";
import { buildSmartDeadlines, daysSigned } from "./deadlines";

export type ActionPlanItem = {
  id: string;
  priority: number;
  title: string;
  text: string;
  hrefView: "rokovi" | "objasnjeno" | "profile";
  actionLabel: string;
};

export function buildActionPlan(profile: Profile, lang: Lang): ActionPlanItem[] {
  const de = lang === "de";
  const sr = lang === "sr";
  const items: ActionPlanItem[] = [];
  const deadlines = buildSmartDeadlines(profile, lang);
  const nearest = deadlines.length ? Math.min(...deadlines.map((d) => daysSigned(d.date))) : null;

  if (nearest !== null && nearest <= 90) {
    items.push({
      id: "permit",
      priority: nearest <= 30 ? 100 : 90,
      title: de ? "Aufenthaltstitel vorbereiten" : sr ? "Pripremi produženje boravka" : "Prepare your residence permit",
      text: de ? "Prüfe Unterlagen und starte rechtzeitig mit dem Verfahren." : sr ? "Proveri dokumenta i počni na vreme." : "Check your documents and start the process in time.",
      hrefView: "rokovi",
      actionLabel: de ? "Fristen ansehen" : sr ? "Pogledaj rokove" : "View deadlines",
    });
  }

  if (profile.work === "unemployed") {
    items.push({
      id: "unemployment",
      priority: 95,
      title: de ? "Nach Jobverlust zuerst handeln" : sr ? "Ako si ostao/la bez posla, reaguj prvo" : "Act first after job loss",
      text: de ? "Arbeitsuchend- und Arbeitslosmeldung unterscheiden und Fristen prüfen." : sr ? "Proveri prijavu kao osoba koja traži posao i prijavu nezaposlenosti." : "Check the deadlines for registering as job-seeking and unemployed.",
      hrefView: "objasnjeno",
      actionLabel: de ? "Zum Leitfaden" : sr ? "Otvori vodič" : "Open guide",
    });
  }

  if (profile.kids) {
    items.push({
      id: "family",
      priority: 70,
      title: de ? "Familienleistungen prüfen" : sr ? "Proveri porodična prava" : "Check family benefits",
      text: de ? "Kindergeld und weitere Leistungen passend zu deinem Haushalt prüfen." : sr ? "Proveri Kindergeld i druge moguće naknade za tvoju porodicu." : "Check Kindergeld and other benefits relevant to your household.",
      hrefView: "objasnjeno",
      actionLabel: de ? "Familienleitfaden" : sr ? "Porodični vodič" : "Family guide",
    });
  }

  if (profile.housing === "renting" || profile.housing === "shared") {
    items.push({
      id: "housing",
      priority: profile.rent != null && profile.income != null ? 65 : 55,
      title: de ? "Wohnkosten prüfen" : sr ? "Proveri pomoć za stanovanje" : "Check housing support",
      text: de ? "Mit Miete und Einkommen kannst du prüfen, ob Wohngeld für dich relevant sein könnte." : sr ? "Uz podatke o kiriji i prihodu možeš proveriti da li je Wohngeld relevantan." : "With rent and income, you can check whether housing support may be relevant.",
      hrefView: "objasnjeno",
      actionLabel: de ? "Mehr erfahren" : sr ? "Saznaj više" : "Learn more",
    });
  }

  items.push({
    id: "profile",
    priority: 20,
    title: de ? "Profil aktuell halten" : sr ? "Održi profil ažurnim" : "Keep your profile up to date",
    text: de ? "Aktuelle Daten helfen Ausländerleben, deine nächsten Schritte besser zu priorisieren." : sr ? "Ažurni podaci pomažu da Ausländerleben bolje odredi tvoje sledeće korake." : "Current profile data helps Ausländerleben prioritize your next steps.",
    hrefView: "profile",
    actionLabel: de ? "Profil öffnen" : sr ? "Otvori profil" : "Open profile",
  });

  return items.sort((a, b) => b.priority - a.priority).slice(0, 4);
}
