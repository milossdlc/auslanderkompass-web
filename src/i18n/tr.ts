import type { LangStrings } from "./types";

export const tr: LangStrings = {
  "name": "Türkçe",
  "dir": "ltr",
  "nav": {
    "kompas": "Pusula",
    "rokovi": "Süreler",
    "objasnjeno": "Açıklama"
  },
  "step": "Adım {n}/{total}",
  "onboarding": {
    "boravak": {
      "title": "Oturum durumun nedir?",
      "sub": "Bu, senin için geçerli olan hak ve yükümlülükleri belirler — her şeyin temeli.",
      "permitLabel": "Oturum izninin türü",
      "options": [
        {
          "key": "work_permit",
          "label": "Çalışma vizesi / Blue Card",
          "icon": "passport"
        },
        {
          "key": "family_reunification",
          "label": "Aile birleşimi",
          "icon": "heart"
        },
        {
          "key": "asylum",
          "label": "İltica süreci / Duldung",
          "icon": "passport"
        },
        {
          "key": "student_visa",
          "label": "Öğrenci vizesi",
          "icon": "book"
        }
      ],
      "arrivalLabel": "Varış/taşınma tarihin",
      "arrivalHint": "Anmeldung süresini (14 gün) hesaplamak için kullanılır.",
      "expiryLabel": "Oturum izninin bitiş tarihi — isteğe bağlı",
      "expiryHint": "Biliyorsan — yenileme zamanı geldiğinde seni zamanında uyarırız."
    },
    "work": {
      "title": "Çalışma durumun nedir?",
      "sub": "Bunu yalnızca sana muhtemelen uygulanacak yardımları hesaplamak için kullanıyoruz.",
      "options": [
        {
          "key": "employed",
          "label": "Çalışıyorum",
          "icon": "house"
        },
        {
          "key": "unemployed",
          "label": "İşsizim",
          "icon": "coin"
        },
        {
          "key": "student",
          "label": "Öğrenciyim",
          "icon": "book"
        },
        {
          "key": "parental_leave",
          "label": "Ebeveyn iznindeyim",
          "icon": "heart"
        }
      ],
      "incomeLabel": "Yaklaşık aylık net gelir (€) — isteğe bağlı, daha doğru tahmin için",
      "incomePlaceholder": "örn. 1800"
    },
    "kids": {
      "title": "Çocuğun var mı?",
      "sub": "Bu, Kindergeld'in sana uygulanıp uygulanmayacağını belirler.",
      "yes": "Evet",
      "no": "Hayır",
      "kidsCountLabel": "Çocuk sayısı"
    },
    "housing": {
      "title": "Nasıl oturuyorsun?",
      "sub": "Bu, Wohngeld tahminini etkiler.",
      "options": [
        {
          "key": "renting",
          "label": "Kirada oturuyorum",
          "icon": "house"
        },
        {
          "key": "owned",
          "label": "Kendi evim/dairem var",
          "icon": "house"
        },
        {
          "key": "shared",
          "label": "Ev arkadaşlarımla paylaşıyorum",
          "icon": "house"
        }
      ],
      "rentLabel": "Giderler dahil aylık kira (€) — isteğe bağlı",
      "rentPlaceholder": "örn. 750"
    }
  },
  "next": "İleri",
  "finish": "Pusulamı göster",
  "back": "Geri",
  "skip": "Şimdilik atla",
  "kompas": {
    "profileSaved": "Yanıtlarına göre",
    "title": "Pusulan",
    "reset": "Baştan başla",
    "estimateLabel": "Tahmin",
    "estimateText": "{total} yardımdan {good} tanesi muhtemelen sana uygulanıyor",
    "yourBenefits": "Yardımların",
    "proTitle": "Tam tutar ve senaryo simülatörü",
    "proSub": "Pro sürümde mevcut — hazırlanıyor",
    "startLabel": "Başla",
    "continueLabel": "Devam et",
    "ctaNextSteps": "Sonraki adımlara bak",
    "homeTagline": "Almanya'da muhtemelen sana uygulanan sosyal yardımları üç kısa adımda öğren.",
    "areasHeading": "Yaşam alanların",
    "heroText": "Profiline göre hesaplanan hakların ve yükümlülüklerin — yaşam alanına göre.",
    "areaCounts": "{rights} hak · {obligations} yükümlülük",
    "rightsHeading": "Hakların",
    "obligationsHeading": "Yükümlülüklerin",
    "noObligations": "Bu alan için şu anda kayıtlı bir yükümlülük yok.",
    "noDateYet": "Henüz tarih girilmedi — kesin bir süre için profiline ekle."
  },
  "benefits": {
    "burgergeld": {
      "statusGood": "Muhtemelen geçerli",
      "statusWarn": "Koşulları kontrol et",
      "statusMuted": "Pek olası değil",
      "noteGood": "İşsizler için temel destek — barınma giderlerini de kapsar."
    },
    "wohngeld": {
      "linkedStatus": "Bürgergeld ile karşılanıyor",
      "linkedNote": "Bürgergeld geçerli olduğunda barınma giderleri genellikle onun üzerinden karşılanır — ayrı bir Wohngeld başvurusu genelde gerekmez.",
      "warnStatus": "Tutarı kontrol et",
      "warnNoteRatio": "Kiran, gelirinin %{pct}'i — Wohngeld kontrolü için olağan eşiğin üzerinde.",
      "mutedStatus": "Pek olası değil",
      "mutedNoteRatio": "Kira (gelirin %{pct}'i) olağan eşiğin altında.",
      "warnNoteMissing": "Daha doğru bir tahmin için profilinde gelir ve kira bilgisini gir."
    },
    "kindergeld": {
      "status": "Muhtemelen geçerli",
      "noteForms": [
        "{n} çocuk kayıtlı"
      ],
      "noneStatus": "Geçerli değil",
      "noneNote": "Kayıtlı çocuk yok."
    }
  },
  "benefitInfo": {
    "burgergeld": "Bürgergeld, Almanya'da işsizler veya geliri yetersiz olanlar için temel sosyal destektir; barınma giderleri desteğini de içerir.",
    "wohngeld": "Wohngeld, Bürgergeld almayan düşük gelirli hanelere yönelik devlet barınma yardımıdır.",
    "kindergeld": "Kindergeld, gelirden bağımsız olarak kayıtlı her çocuk için ebeveynlere ödenen aylık devlet yardımıdır."
  },
  "benefit": {
    "disclaimer": "Bu genel bir bilgidir, hukuki tavsiye değildir.",
    "crosslink": "{name} bilgisine de göz at",
    "nextSteps": "Sonraki adımlar",
    "docsTitle": "Genellikle neye ihtiyacın olur",
    "markApplied": "Başvurduğunu işaretle",
    "appliedOn": "Başvuru tarihi: {date}",
    "unmark": "Geri al",
    "openLink": "Resmi sayfayı aç"
  },
  "benefitApply": {
    "burgergeld": "Başvuru, yetkili Jobcenter'a çevrimiçi veya şahsen yapılır.",
    "wohngeld": "Başvuru, genellikle belediye veya şehir yönetiminin bir parçası olan yetkili Wohngeldstelle'ye yapılır.",
    "kindergeld": "Başvuru, genellikle Agentur für Arbeit'e bağlı yetkili Familienkasse'ye yapılır."
  },
  "benefitDocs": {
    "burgergeld": [
      "Kimlik veya oturum izni",
      "İşsizlik veya yetersiz gelir belgesi",
      "Banka hesap numarası (IBAN)"
    ],
    "wohngeld": [
      "Kimlik veya oturum izni",
      "Kira tutarını gösteren kira sözleşmesi",
      "Tüm hane üyelerinin gelir belgesi"
    ],
    "kindergeld": [
      "Kimlik veya oturum izni",
      "Çocuğun doğum belgesi",
      "Çocuğun ve ebeveynin vergi kimlik numarası"
    ]
  },
  "rokovi": {
    "title": "Süreler",
    "fromApplied": "başvuru tarihine göre",
    "empty": "Profiline göre şu anda önerilen bir süre yok.",
    "disclaimer": "Bu tarihler genel bir kurala göre hesaplanmış yaklaşık tarihlerdir — gerçek kararındaki (Bescheid) tarihin yerini tutmaz.",
    "approx": "yaklaşık · ",
    "pill": "{d} g.",
    "bgTitle": "Bürgergeld — tahmini onay yenileme",
    "bgNote": "Genellikle 6–12 ay — kesin tarih Bescheid'inde yazar.",
    "wgTitle": "Wohngeld — tahmini yıllık yenileme",
    "wgNote": "Wohngeld başvuruları genellikle yılda bir kez yenilenir.",
    "needProfileTitle": "Önce Pusulanı tamamla",
    "needProfileText": "Sürelerini hesaplayabilmemiz için önce profiline ihtiyacımız var — sadece birkaç adım sürer.",
    "anmeldungTitle": "İkametgah kaydı (Anmeldung)",
    "anmeldungNote": "Taşınmadan sonra 14 gün içinde zorunlu — yetkili Bürgeramt'ta.",
    "permitTitle": "Oturum izni yenileme",
    "permitNote": "Mevcut iznin sona ermeden önce yetkili Ausländerbehörde'ye zamanında yenileme başvurusu yap.",
    "tagObligation": "Yükümlülük",
    "tagRight": "Hak",
    "overdue": "gecikmiş"
  },
  "areas": {
    "boravak": {
      "name": "Oturum"
    },
    "stanovanje": {
      "name": "Konut"
    },
    "rad": {
      "name": "Çalışma"
    },
    "porodica": {
      "name": "Aile"
    }
  },
  "extra": {
    "boravak_work": {
      "name": "Çalışma hakkı",
      "desc": "Çalışıp çalışamayacağın ve ne ölçüde çalışabileceğin oturum izninin türüne bağlıdır — çalışma vizesi veya Blue Card ile genellikle sınırsız, diğer izinlerde genellikle kısıtlamalı veya ek izinle."
    },
    "boravak_family": {
      "name": "Aile birleşimi",
      "desc": "Belirli koşullar altında en yakın aile üyelerini (eş, reşit olmayan çocuklar) yanına getirebilirsin. Tam koşullar oturum izninin türüne bağlıdır."
    },
    "boravak_anmeldung": {
      "name": "İkametgahını bildir",
      "desc": "Her taşınmadan sonra 14 gün içinde Bürgeramt'a kaydolmalısın — bu olmadan birçok sonraki adım (banka hesabı, oturum izni) mümkün değil.",
      "consequence": "Geç yapılan kayıt para cezasına yol açabilir ve buna bağlı her şeyi geciktirir."
    },
    "boravak_permit": {
      "name": "Oturum iznini yenile",
      "desc": "Mevcut izninin süresi dolmadan önce yetkili Ausländerbehörde'ye zamanında yenileme başvurusu yap.",
      "consequence": "Zamanında başvuru yapılmadan süresi dolan bir oturum izni yasal statünü tehlikeye atabilir."
    },
    "boravak_integration": {
      "name": "Entegrasyon kursu",
      "desc": "Oturum izninin türüne bağlı olarak, bir entegrasyon kursuna (dil + oryantasyon) katılım zorunlu olabilir.",
      "consequence": "Zorunlu katılımda, geçerli bir neden olmadan devamsızlık oturum iznini etkileyebilir."
    },
    "stanovanje_kuendigung": {
      "name": "Tahliyeye karşı koruma",
      "desc": "Almanya'da kiracı olarak nispeten güçlü bir yasal tahliye korumasına sahipsin — ev sahibinin fesih yapabilmesi için genellikle kabul edilebilir bir gerekçe gerekir."
    },
    "stanovanje_adresa": {
      "name": "Taşınmada adres bildirimi",
      "desc": "Her konut değişikliğinde 14 gün içinde yeniden kayıt yaptırmalı ve Jobcenter ya da Ausländerbehörde'yi yeni adresin hakkında bilgilendirmelisin.",
      "consequence": "Bildirilmeyen adres değişikliği devam eden yardımları geciktirebilir."
    },
    "rad_minwage": {
      "name": "Asgari ücret",
      "desc": "Almanya'da sektör veya uyruk fark etmeksizin geçerli olan yasal bir saatlik asgari ücret vardır."
    },
    "rad_leave": {
      "name": "Ücretli izin",
      "desc": "5 günlük çalışma haftasında yasal olarak yılda en az 20 ücretli izin gününe hakkın vardır."
    },
    "rad_dismissal": {
      "name": "İşte fesihten koruma",
      "desc": "Aynı işyerinde (10'dan fazla çalışanı olan) 6 ay çalıştıktan sonra yasal fesih koruması devreye girer — fesih için kabul edilebilir bir gerekçe gerekir."
    },
    "rad_mitwirkung": {
      "name": "Bildirim yükümlülüğü (Mitwirkungspflicht)",
      "desc": "Gelir, iş veya adresindeki değişiklikleri kendin ve hatırlatılmadan Jobcenter'a bildirmelisin.",
      "consequence": "Bildirilmeyen değişiklikler geri ödeme talebine veya yardımın kesilmesine yol açabilir."
    },
    "porodica_elterngeld": {
      "name": "Elterngeld",
      "desc": "Elterngeld, doğumdan sonra çocuğa bakmak için gelirini azaltan ebeveynleri destekler — Bürgergeld'den bağımsız olarak."
    },
    "porodica_birth": {
      "name": "Doğumu bildir",
      "desc": "Çocuğun doğumu genellikle bir hafta içinde yetkili nüfus dairesine (Standesamt) bildirilmelidir.",
      "consequence": "Doğum bildirimi yapılmadan doğum belgesi düzenlenmez — bu belge Kindergeld ve diğer başvurular için gereklidir."
    },
    "porodica_taxid": {
      "name": "Çocuğun için vergi kimlik numarası",
      "desc": "Her çocuğun kendi vergi kimlik numarasına ihtiyacı vardır — genellikle doğum bildiriminden sonra otomatik olarak verilir ve Kindergeld başvurusu için gereklidir."
    }
  },
  "glossary": [
    {
      "term": "Bescheid",
      "area": null,
      "explain": "Bir kurumun başvurun hakkındaki resmi yazılı kararı — kararı ve eğer katılmıyorsan itiraz (Widerspruch) süresini içerir.",
      "institution": "gönderen kuruma bağlı"
    },
    {
      "term": "Widerspruch",
      "area": null,
      "explain": "Bir Bescheid'e karşı resmi itiraz, genellikle alındıktan sonra bir ay içinde.",
      "institution": "Bescheid'i düzenleyen kurum"
    },
    {
      "term": "Anmeldung",
      "area": "boravak",
      "explain": "Taşınmadan sonra ikametgah kaydı. Süre 14 gündür — bu olmadan birçok başka şey (banka hesabı, oturum izni) mümkün değildir.",
      "institution": "Bürgeramt / Einwohnermeldeamt"
    },
    {
      "term": "Aufenthaltstitel",
      "area": "boravak",
      "explain": "Almanya'daki yasal oturumunu düzenleyen belge — türü ve süresi neler yapabileceğini (örn. çalışma) ve ne yapman gerektiğini belirler.",
      "institution": "Ausländerbehörde"
    },
    {
      "term": "Mitwirkungspflicht",
      "area": "rad",
      "explain": "Değişiklikleri (gelir, iş, adres) kendin bildirme yükümlülüğün — sistem bunu otomatik olarak öğrenmez.",
      "institution": "Jobcenter (Bürgergeld için)"
    },
    {
      "term": "Jobcenter ile Agentur für Arbeit farkı",
      "area": "rad",
      "explain": "Jobcenter, Bürgergeld alanlar için; Agentur für Arbeit ise daha önce çalışıp prim ödediysen işsizlik sigortası için yetkilidir. Nadiren ikisiyle birden işin olur.",
      "institution": "çalışma geçmişine bağlı"
    }
  ],
  "glossaryPage": {
    "title": "Açıklama",
    "intro": "Almanca bürokratik terimleri anlamak sadece dil meselesi değildir — terimler anlamlarını sistemle deneyim kazanarak alır. Almanca terim değişmeden kalır (mektubunda da öyle yazar), açıklama ise senin dilinde.",
    "groupGeneral": "Genel"
  },
  "months": [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara"
  ]
};
