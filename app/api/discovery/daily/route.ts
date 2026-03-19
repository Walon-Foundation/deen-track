import { NextResponse } from "next/server";

export const revalidate = 7200; // 2 hour cache

const CURATED_DUAS = [
    { 
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      english: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      reference: "Quran 2:201"
    },
    { 
      arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
      english: "Our Lord, do not impose blame upon us if we have forgotten or erred.",
      transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
      reference: "Quran 2:286"
    },
    { 
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      english: "My Lord, increase me in knowledge.",
      transliteration: "Rabbi zidni 'ilma",
      reference: "Quran 20:114"
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
      english: "O Allah, I ask You for knowledge that is of benefit, a good provision and deeds that will be accepted.",
      transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
      reference: "Ibn Majah"
    },
    {
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      english: "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.",
      transliteration: "Rabbana taqabbal minna innaka antas-sami'ul-'alim",
      reference: "Quran 2:127"
    },
    {
      arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
      english: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
      transliteration: "Rabbana dhalamna anfusana wa-in lam taghfir lana watarhamna lanakunanna minal-khasirin",
      reference: "Quran 7:23"
    },
    {
       arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
       english: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.",
       transliteration: "Rabbana-srif 'anna 'adhaba jahannama inna 'adhabaha kana gharama",
       reference: "Quran 25:65"
    },
    {
       arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ",
       english: "Our Lord, forgive us and our brothers who preceded us in faith.",
       transliteration: "Rabbana-ghfir lana wali-ikhwanina-lladhina sabaquna bil-iman",
       reference: "Quran 59:10"
    },
    {
       arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
       english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
       transliteration: "Rabbana hab lana min azwajina wadhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
       reference: "Quran 25:74"
    },
    {
       arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
       english: "My Lord, expand for me my breast [with assurance] and ease for me my task.",
       transliteration: "Rabbi-shrah li sadri wa yassir li amri",
       reference: "Quran 20:25"
    },
    {
       arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
       english: "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.",
       transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul-'arshil-'adhim",
       reference: "Quran 9:129"
    },
    {
       arabic: "لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
       english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
       transliteration: "La ilaha illa anta subhanaka inni kuntu minadh-dhalimin",
       reference: "Quran 21:87"
    }
];

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const QURAN_BASE = process.env.QURAN_BASE_URL || "https://api.alquran.cloud/v1";
    const HADITH_BASE = process.env.HADITH_BASE_URL || "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

    const sources = ["quran", "hadith", "dua"];
    const chosen = category && sources.includes(category) 
        ? category 
        : sources[Math.floor(Math.random() * sources.length)];
    
    let content = null;

    if (chosen === "quran") {
      const randomAyahId = Math.floor(Math.random() * 6236) + 1;
      const res = await fetch(`${QURAN_BASE}/ayah/${randomAyahId}/editions/quran-uthmani,en.asad,en.transliteration`);
      const data = await res.json();
      
      if (data.status === "OK") {
        content = {
          type: "Quran",
          arabic: data.data[0].text,
          english: data.data[1].text,
          transliteration: data.data[2].text,
          reference: `Surah ${data.data[0].surah.englishName} (${data.data[0].surah.number}:${data.data[0].numberInSurah})`,
        };
      }
    } else if (chosen === "hadith") {
      // Restore parallel fetch to ensure Arabic text is available
      const [engRes, araRes] = await Promise.all([
        fetch(`${HADITH_BASE}/editions/eng-bukhari.json`, { next: { revalidate: 7200 } }),
        fetch(`${HADITH_BASE}/editions/ara-bukhari.json`, { next: { revalidate: 7200 } })
      ]);
      
      const engData = await engRes.json();
      const araData = await araRes.json();
      
      if (engData.hadiths && araData.hadiths) {
          const randomIdx = Math.floor(Math.random() * engData.hadiths.length);
          const iEng = engData.hadiths[randomIdx];
          const iAra = araData.hadiths[randomIdx];
          
          content = {
            type: "Hadith",
            arabic: iAra?.text || null, 
            english: iEng?.text,
            transliteration: null,
            reference: `Sahih al-Bukhari, Hadith #${iEng.hadithnumber}`,
          };
      }
    } else if (chosen === "dua") {
       const item = CURATED_DUAS[Math.floor(Math.random() * CURATED_DUAS.length)];
       content = {
           type: "Dua",
           arabic: item.arabic,
           english: item.english,
           transliteration: item.transliteration,
           reference: item.reference
       };
    }

    if (!content) throw new Error("Fetch failed");

    return NextResponse.json({ ok: true, data: content });
  } catch (err: any) {
    console.error("[DISCOVERY_ERROR]", err.message);
    return NextResponse.json({ ok: false, message: "Service unavailable" }, { status: 500 });
  }
}
