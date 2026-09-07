import type { Lang, Profile } from "../types";

export type PersonalFocus = { title: string; text: string; reason: string };

export function getPersonalFocus(profile: Profile, lang: Lang): PersonalFocus {
  const expiry = profile.boravak.permitExpiryDate;
  const hasKids = profile.kids;
  const unemployed = profile.work === "unemployed";
  const renting = profile.housing === "renting" || profile.housing === "shared";

  if (expiry) {
    if (lang === "de") return { title: "Aufenthalt im Blick behalten", text: "Dein Ablaufdatum ist gespeichert. Prüfe jetzt Verfahren und Unterlagen für die Verlängerung.", reason: "Aufenthaltstitel" };
    if (lang === "sr") return { title: "Drži boravak pod kontrolom", text: "Datum isteka je sačuvan. Sada proveri proceduru i dokumenta za produženje.", reason: "Boravišna dozvola" };
    return { title: "Keep your residence status on track", text: "Your expiry date is saved. Now check the renewal process and required documents.", reason: "Residence permit" };
  }
  if (unemployed) {
    if (lang === "de") return { title: "Nach dem Jobverlust zuerst handeln", text: "Arbeitsuchend- und Arbeitslosmeldung sowie deine aufenthaltsrechtliche Situation prüfen.", reason: "Arbeit" };
    if (lang === "sr") return { title: "Posle gubitka posla prvo reaguj", text: "Proveri Arbeitsuchend/Arbeitslos prijavu i uticaj na svoj boravišni status.", reason: "Posao" };
    return { title: "Act first after job loss", text: "Check job-seeker and unemployment registration and what it means for your residence status.", reason: "Work" };
  }
  if (hasKids) {
    if (lang === "de") return { title: "Familienleistungen prüfen", text: "Mit Kindern können Kindergeld und weitere Familienleistungen für dich relevant sein.", reason: "Familie" };
    if (lang === "sr") return { title: "Proveri porodična prava", text: "Ako imaš decu, Kindergeld i druga porodična prava mogu biti relevantna.", reason: "Porodica" };
    return { title: "Check family support", text: "With children, Kindergeld and other family benefits may be relevant to you.", reason: "Family" };
  }
  if (renting) {
    if (lang === "de") return { title: "Wohnen im Blick behalten", text: "Prüfe Adresse, Mietunterlagen und mögliche Unterstützung bei Wohnkosten.", reason: "Wohnen" };
    if (lang === "sr") return { title: "Drži stanovanje pod kontrolom", text: "Proveri adresu, dokumenta za stan i moguću pomoć oko troškova stanovanja.", reason: "Stanovanje" };
    return { title: "Keep housing on track", text: "Check your address, rental documents and possible housing support.", reason: "Housing" };
  }
  if (lang === "de") return { title: "Profil ist deine Ausgangsbasis", text: "Je mehr Angaben du ergänzt, desto genauer können wir Fristen und Hinweise auf dich zuschneiden.", reason: "Profil" };
  if (lang === "sr") return { title: "Profil je tvoja osnova", text: "Što više podataka dodaš, preciznije možemo prilagoditi rokove i preporuke.", reason: "Profil" };
  return { title: "Your profile is the starting point", text: "The more you add, the more precisely we can tailor deadlines and guidance to you.", reason: "Profile" };
}
