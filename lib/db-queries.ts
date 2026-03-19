import { db } from "@/db/drizzle";
import { quranTable, hadithTable, duaTable, knowledgeTable, journalTable } from "@/db/schema";
import { eq, desc, sql, and, gte } from "drizzle-orm";

export async function getUserStats(userId: string) {
  const [quranCount] = await db
    .select({ total: sql<number>`count(*)` })
    .from(quranTable)
    .where(eq(quranTable.userId, userId));

  const [hadithCount] = await db
    .select({ total: sql<number>`count(*)` })
    .from(hadithTable)
    .where(eq(hadithTable.userId, userId));

  const [duaTotal] = await db
    .select({ total: sql<number>`sum(${duaTable.count})` })
    .from(duaTable)
    .where(eq(duaTable.userId, userId));

  const [knowledgeCount] = await db
    .select({ total: sql<number>`count(*)` })
    .from(knowledgeTable)
    .where(eq(knowledgeTable.userId, userId));

  return {
    quran: Number(quranCount?.total || 0),
    hadith: Number(hadithCount?.total || 0),
    dua: Number(duaTotal?.total || 0),
    knowledge: Number(knowledgeCount?.total || 0),
  };
}

export async function getRecentActivity(userId: string, limit: number = 5) {
  const quranLogs = await db
    .select({
      id: quranTable.id,
      type: sql<string>`'Quran'`,
      title: quranTable.surahName,
      detail: sql<string>`concat('Verses ', ${quranTable.verseStart}, '-', ${quranTable.verseEnd})`,
      createdAt: quranTable.createdAt,
    })
    .from(quranTable)
    .where(eq(quranTable.userId, userId))
    .orderBy(desc(quranTable.createdAt))
    .limit(limit);

  const hadithLogs = await db
    .select({
      id: hadithTable.id,
      type: sql<string>`'Hadith'`,
      title: hadithTable.scholar,
      detail: sql<string>`concat('Hadith #', ${hadithTable.hadithName})`,
      createdAt: hadithTable.createdAt,
    })
    .from(hadithTable)
    .where(eq(hadithTable.userId, userId))
    .orderBy(desc(hadithTable.createdAt))
    .limit(limit);

  const duaLogs = await db
    .select({
      id: duaTable.id,
      type: sql<string>`'Dua'`,
      title: duaTable.category,
      detail: sql<string>`concat(${duaTable.count}, ' Recitations')`,
      createdAt: duaTable.createdAt,
    })
    .from(duaTable)
    .where(eq(duaTable.userId, userId))
    .orderBy(desc(duaTable.createdAt))
    .limit(limit);

  const merged = [...quranLogs, ...hadithLogs, ...duaLogs]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);

  return merged;
}

export async function getWeeklyActivityChart(userId: string, range: string = "7d") {
  const lookbackDays = range === "30d" ? 30 : range === "1y" ? 365 : 7;
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (lookbackDays - 1));

  const [qData, hData, dData, kData] = await Promise.all([
    db.select({ createdAt: quranTable.createdAt }).from(quranTable).where(and(eq(quranTable.userId, userId), gte(quranTable.createdAt, startDate))),
    db.select({ createdAt: hadithTable.createdAt }).from(hadithTable).where(and(eq(hadithTable.userId, userId), gte(hadithTable.createdAt, startDate))),
    db.select({ createdAt: duaTable.createdAt }).from(duaTable).where(and(eq(duaTable.userId, userId), gte(duaTable.createdAt, startDate))),
    db.select({ createdAt: knowledgeTable.createdAt }).from(knowledgeTable).where(and(eq(knowledgeTable.userId, userId), gte(knowledgeTable.createdAt, startDate))),
  ]);

  const allEntries = [...qData, ...hData, ...dData, ...kData];
  const daysMap: Record<string, number> = {};
  
  //@ts-ignore
  const chartData = [];
  for (let i = lookbackDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = lookbackDays <= 30 
      ? d.toLocaleDateString('en-US', { weekday: 'short' }) 
      : d.toLocaleDateString('en-US', { month: 'short' });
    
    // For large ranges like 1Y, we group by month name or similar
    // To keep it simple but working for 1Y/30D, we'll use a unique key for grouping
    const groupKey = lookbackDays > 30 
      ? `${d.getFullYear()}-${d.getMonth()}`
      : d.toDateString();
      
    daysMap[groupKey] = 0;
  }

  allEntries.forEach(e => {
    const d = e.createdAt;
    const groupKey = lookbackDays > 30 
      ? `${d.getFullYear()}-${d.getMonth()}`
      : d.toDateString();
      
    if (daysMap[groupKey] !== undefined) {
      daysMap[groupKey]++;
    }
  });

  for (let i = lookbackDays - 1; i >= 0; i--) {
     const d = new Date();
     d.setDate(d.getDate() - i);
     const groupKey = lookbackDays > 30 
       ? `${d.getFullYear()}-${d.getMonth()}`
       : d.toDateString();
    
     const label = lookbackDays <= 7 
       ? d.toLocaleDateString('en-US', { weekday: 'short' })
       : lookbackDays <= 30 
         ? d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
         : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

     if (lookbackDays > 30) {
      //@ts-ignore
        if (!chartData.find(cd => cd.day === label)) {
           chartData.push({ day: label, entries: daysMap[groupKey] || 0 });
        } else {
          //@ts-ignore
           const existing = chartData.find(cd => cd.day === label);
           if (existing) existing.entries += 1;
        }
     } else {
        chartData.push({ day: label, entries: daysMap[groupKey] || 0 });
     }
  }

  return chartData;
}

export async function getAllUserRecords(userId: string, page: number = 1, limit: number = 20) {
  const offset = (page - 1) * limit;

  const [quran, hadith, dua, knowledge, journal] = await Promise.all([
    db.select().from(quranTable).where(eq(quranTable.userId, userId)).orderBy(desc(quranTable.createdAt)).limit(offset + limit),
    db.select().from(hadithTable).where(eq(hadithTable.userId, userId)).orderBy(desc(hadithTable.createdAt)).limit(offset + limit),
    db.select().from(duaTable).where(eq(duaTable.userId, userId)).orderBy(desc(duaTable.createdAt)).limit(offset + limit),
    db.select().from(knowledgeTable).where(eq(knowledgeTable.userId, userId)).orderBy(desc(knowledgeTable.createdAt)).limit(offset + limit),
    db.select().from(journalTable).where(eq(journalTable.userId, userId)).orderBy(desc(journalTable.createdAt)).limit(offset + limit),
  ]);

  const normalized = [
    ...quran.map(q => ({ id: q.id, type: 'Quran', title: q.surahName, detail: `Verses ${q.verseStart}-${q.verseEnd}`, date: q.createdAt, content: q.status })),
    ...hadith.map(h => ({ id: h.id, type: 'Hadith', title: h.scholar, detail: `${h.book} - #${h.hadithName}`, date: h.createdAt, content: h.understanding })),
    ...dua.map(d => ({ id: d.id, type: 'Dua', title: d.category, detail: `${d.count} Recitations`, date: d.createdAt, content: null })),
    ...knowledge.map(k => ({ id: k.id, type: 'Knowledge', title: k.title, detail: k.knowledgeType, date: k.createdAt, content: k.notes })),
    ...journal.map(j => ({ id: j.id, type: 'Journal', title: j.title || 'Personal Reflection', detail: 'Reflection', date: j.createdAt, content: j.content })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(offset, offset + limit);

  return normalized;
}
