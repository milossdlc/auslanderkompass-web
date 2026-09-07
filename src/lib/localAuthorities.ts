import type { Lang, Profile } from "../types";

export interface LocalAuthority {
  city: string;
  name: string;
  description: string;
  url: string;
}

const FALLBACK: Record<Lang, Omit<LocalAuthority, "city">> = {
  de: { name: "Bundesportal / zuständige Behörde", description: "Nutze das Bundesportal, um die zuständige Stelle für deinen Wohnort zu finden.", url: "https://verwaltung.bund.de/portal/" },
  en: { name: "Federal portal / responsible authority", description: "Use the federal portal to find the authority responsible for your place of residence.", url: "https://verwaltung.bund.de/portal/" },
  sr: { name: "Bundesportal / nadležna institucija", description: "Koristi Bundesportal da pronađeš nadležnu instituciju prema mestu stanovanja.", url: "https://verwaltung.bund.de/portal/" },
  ar: { name: "البوابة الاتحادية / الجهة المختصة", description: "استخدم البوابة الاتحادية للعثور على الجهة المختصة بمكان إقامتك.", url: "https://verwaltung.bund.de/portal/" },
  tr: { name: "Federal portal / yetkili makam", description: "İkamet ettiğin yere göre yetkili kurumu federal portal üzerinden bul.", url: "https://verwaltung.bund.de/portal/" },
  uk: { name: "Федеральний портал / відповідний орган", description: "Знайди відповідний орган для свого місця проживання через федеральний портал.", url: "https://verwaltung.bund.de/portal/" },
  ru: { name: "Федеральный портал / компетентный орган", description: "Найди компетентный орган по месту проживания через федеральный портал.", url: "https://verwaltung.bund.de/portal/" },
  fa: { name: "پورتال فدرال / مرجع مسئول", description: "مرجع مسئول محل اقامت خود را از طریق پورتال فدرال پیدا کنید.", url: "https://verwaltung.bund.de/portal/" },
};

const LOCAL: Record<string, Record<Lang, Omit<LocalAuthority, "city">>> = {
  hamburg: {
    de: { name: "Hamburg Service – Ausländerangelegenheiten", description: "Zuständige Dienststelle richtet sich nach deinem gemeldeten Wohnort in Hamburg.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    en: { name: "Hamburg Service – Foreigners' Affairs", description: "The responsible office depends on your registered address in Hamburg.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    sr: { name: "Hamburg Service – Ausländerangelegenheiten", description: "Nadležna služba zavisi od prijavljene adrese u Hamburgu.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    ar: { name: "Hamburg Service – شؤون الأجانب", description: "تحدد الجهة المختصة حسب عنوان إقامتك المسجل في هامبورغ.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    tr: { name: "Hamburg Service – Yabancılar işleri", description: "Yetkili birim Hamburg'daki kayıtlı adresine göre belirlenir.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    uk: { name: "Hamburg Service – справи іноземців", description: "Відповідний офіс залежить від зареєстрованої адреси в Гамбурзі.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    ru: { name: "Hamburg Service – дела иностранцев", description: "Ответственное отделение зависит от зарегистрированного адреса в Гамбурге.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
    fa: { name: "Hamburg Service – امور اتباع خارجی", description: "اداره مسئول بر اساس نشانی ثبت‌شده شما در هامبورگ تعیین می‌شود.", url: "https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/hamburgservice/standorte-auslaenderangelegenheiten-589946" },
  },
  berlin: {
    de: { name: "Landesamt für Einwanderung (LEA)", description: "Berlin bietet für viele Aufenthaltstitel Online-Anträge über das LEA an.", url: "https://service.berlin.de/standorte/einwanderungsamt/329228/" },
    en: { name: "State Office for Immigration (LEA)", description: "Berlin offers online applications for many residence titles through LEA.", url: "https://www.berlin.de/einwanderung/en/" },
    sr: { name: "Landesamt für Einwanderung (LEA)", description: "Berlin za mnoge boravišne statuse nudi online podnošenje zahteva preko LEA.", url: "https://www.berlin.de/einwanderung/en/" },
    ar: { name: "Landesamt für Einwanderung (LEA)", description: "تتيح برلين تقديم طلبات إلكترونية للعديد من تصاريح الإقامة عبر LEA.", url: "https://www.berlin.de/einwanderung/en/" },
    tr: { name: "Landesamt für Einwanderung (LEA)", description: "Berlin birçok oturum izni için LEA üzerinden çevrim içi başvuru sunuyor.", url: "https://www.berlin.de/einwanderung/en/" },
    uk: { name: "Landesamt für Einwanderung (LEA)", description: "У Берліні для багатьох дозволів на проживання доступні онлайн-заявки через LEA.", url: "https://www.berlin.de/einwanderung/en/" },
    ru: { name: "Landesamt für Einwanderung (LEA)", description: "В Берлине для многих видов ВНЖ доступны онлайн-заявки через LEA.", url: "https://www.berlin.de/einwanderung/en/" },
    fa: { name: "Landesamt für Einwanderung (LEA)", description: "در برلین برای بسیاری از مجوزهای اقامت، درخواست آنلاین از طریق LEA امکان‌پذیر است.", url: "https://www.berlin.de/einwanderung/en/" },
  },
  munich: {
    de: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "München bietet Informationen und Online-Anträge für Aufenthalts- und Arbeitserlaubnisse.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    en: { name: "Servicestelle for Immigration and Naturalisation", description: "Munich provides information and online applications for residence and work permits.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    sr: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "Minhen nudi informacije i online zahteve za boravišne i radne dozvole.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    ar: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "توفر ميونخ معلومات وطلبات إلكترونية لتصاريح الإقامة والعمل.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    tr: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "Münih, oturum ve çalışma izinleri için bilgi ve çevrim içi başvurular sunuyor.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    uk: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "Мюнхен надає інформацію та онлайн-заявки для дозволів на проживання і роботу.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    ru: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "Мюнхен предоставляет информацию и онлайн-заявки для разрешений на проживание и работу.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
    fa: { name: "Servicestelle für Zuwanderung und Einbürgerung", description: "مونیخ اطلاعات و درخواست‌های آنلاین برای مجوز اقامت و کار ارائه می‌کند.", url: "https://stadt.muenchen.de/service/en-GB/info/servicestelle-fur-zuwanderung-und-einburgerung/10424868/" },
  },
};

function normalizeCity(value: string | null): string {
  return (value ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss");
}

export function getLocalAuthority(profile: Profile, lang: Lang): LocalAuthority {
  const city = normalizeCity(profile.city);
  const key = city === "munchen" ? "munich" : city;
  const local = LOCAL[key]?.[lang] ?? LOCAL[key]?.en;
  if (local) return { city: profile.city || key, ...local };
  return { city: profile.city || "Deutschland", ...FALLBACK[lang] };
}
