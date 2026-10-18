import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import glob
target = None
for f in sorted(glob.glob(os.path.join(ROOT, "data/content/batch*.json"))):
    rows = json.load(open(f))
    for x in rows:
        if x["slug"] == "catalyst-performance":
            target, p = x, f
            break
    if target: break
if target is None:
    raise SystemExit("catalyst entry not found")
r = target  # rows still holds the list from the matched file

r["companyUrl"] = "https://catalystperformance.sg/"
r["headline"] = "Catalyst Performance rebuilt its own digital stack, and organic search clicks rose more than 1,500% in the 60 days to October 2026."
r["useCase"] = "Marketing operations"
r["aiType"] = "LLM application"
r["outcomes"] = ["Revenue", "Capacity", "Quality"]

r["metrics"] = [
  {
    "label": "Organic search clicks",
    "value": "Over 300% increase at nomination",
    "baseline": "9 Mar – 8 May 2026",
    "after": "60 days to 12 Oct 2026: over 1,500%, more than 16x the earlier level",
    "sourceIds": ["T0-AWARDS", "T1-CATALYST-PR"],
    "attribution": "Company-reported. Nomination figures were checked at the studio by SBF in August 2026; the later comparison is the company's own Search Console reading."
  },
  {
    "label": "Search impressions",
    "value": "190% increase at nomination",
    "baseline": "9 Mar – 8 May 2026",
    "after": "Eight times higher over the same 60-day comparison",
    "sourceIds": ["T0-AWARDS", "T1-CATALYST-PR"],
    "attribution": "Company-reported. Comparison periods as stated in the company release."
  },
  {
    "label": "Google search position",
    "value": "More than 2x improvement at nomination",
    "baseline": "Page four",
    "after": "Page one",
    "sourceIds": ["T0-AWARDS", "T1-CATALYST-PR"],
    "attribution": "Company-reported. The page-position change is stated in the company release, not in the award citation."
  }
]

r["scqa"] = {
  "s": "Catalyst Performance is a personal training studio at Manulife Tower in Singapore's central business district. Bervin Manoharan, Jeremy Soh and Dr Luqman Haris founded it after corporate careers in the industry, and their coaching experience spans more than 25 years combined. The studio coaches working adults from their thirties onward, including clients over 50, athletes, and pre-natal and post-natal clients. Every client starts with a four-pillar Healthspan Assessment covering body composition, cardiorespiratory fitness, stability and strength. It is a small business with a small team, competing for local attention against larger gyms that employ marketing departments.",
  "c": "The legacy website lacked search engine optimisation and generative engine optimisation infrastructure, and the studio sat on page four of Google. Website updates, content creation, advertising campaigns and lead outreach required significant time or external agency support, and the studio had no in-house digital capacity for any of it. Manoharan states that there was budget for an agency, but that no agency would promise an outcome, so the work was taken on internally instead. Growth therefore depended on buying attention or on the founders' spare hours. Marketing was intermittent, which is the worst pattern for search visibility, because gains decay when publishing stops.",
  "q": "How could a small coaching business build and run a full digital acquisition operation, and own the systems behind it, without hiring an agency or a technical team?",
  "a": "Manoharan built the systems himself: the website, the marketing systems, the operations panel, the WhatsApp and Instagram assistants, and the client nutrition log. Each is built around how the studio coaches, and each uses whichever model does the job best. The company release names DeepSeek and Fable, describing the latter as the latest Claude model from Anthropic. The rebuilt website carries search and generative engine optimisation infrastructure. Automated outreach powers LinkedIn messaging, email campaigns and personalised follow-ups. Advertising analysis reviews Meta, Google and TikTok campaign data to find inefficient spend, and AI-operated dashboards report bookings, leads, protocol sales, email performance and funnel analytics. The published result at nomination was more than 300% more organic search clicks, a 190% increase in impressions and more than double the Google ranking. The company now reports a later comparison, 60 days to 12 October 2026 against 9 March to 8 May 2026: clicks up more than 1,500%, more than 16 times the earlier level, impressions eight times higher, and the studio on page one rather than page four. The Singapore Business Federation checked the nomination figures at the studio in August. The stated next step is ownership, with capital going into hosting the studio's own models and infrastructure so that processing sits inside the business."
}

r["takeaway"] = "Owning the stack is the difference between renting a capability and holding one. The gain is not the model; it is that nobody else can switch it off."

r["claims"] = [
  {"id": "c1", "text": "The legacy website lacked SEO and GEO infrastructure, limiting organic discoverability.", "sourceIds": ["T0-AWARDS"], "evidence": "stated"},
  {"id": "c2", "text": "Claude is embedded across website, marketing and operational workflows.", "sourceIds": ["T0-AWARDS"], "evidence": "stated"},
  {"id": "c3", "text": "Manoharan built the website, marketing systems, operations panel, WhatsApp and Instagram assistants and client nutrition log himself.", "sourceIds": ["T1-CATALYST-PR"], "evidence": "stated"},
  {"id": "c4", "text": "The systems use whichever model suits the task, and the release names DeepSeek and Fable, described as the latest Claude model from Anthropic.", "sourceIds": ["T1-CATALYST-PR"], "evidence": "stated"},
  {"id": "c5", "text": "In the 60 days to 12 October 2026, organic clicks rose more than 1,500% against 9 March to 8 May 2026, and impressions were eight times higher.", "sourceIds": ["T1-CATALYST-PR"], "evidence": "stated"},
  {"id": "c6", "text": "The Singapore Business Federation checked the nomination figures at the studio in August 2026.", "sourceIds": ["T1-CATALYST-PR"], "evidence": "stated", "basis": "Stated by the company. The award citation independently confirms that shortlisted companies receive SBF site visits to verify claims."}
]

r["stack"] = [
  {"layer": "AI model", "what": "Model-agnostic stack; the release names DeepSeek and Fable, described as the latest Claude model from Anthropic", "vendor": "DeepSeek, Anthropic (Claude)", "origin": "vendor", "evidence": "stated", "sourceIds": ["T0-AWARDS", "T1-CATALYST-PR"]},
  {"layer": "Web", "what": "Rebuilt site with SEO and generative engine optimisation infrastructure, built in-house", "origin": "in-house", "evidence": "stated", "sourceIds": ["T0-AWARDS", "T1-CATALYST-PR"]},
  {"layer": "Assistants", "what": "WhatsApp and Instagram assistants", "origin": "in-house", "evidence": "stated", "sourceIds": ["T1-CATALYST-PR"]},
  {"layer": "Operations", "what": "Operations panel and client nutrition log", "origin": "in-house", "evidence": "stated", "sourceIds": ["T1-CATALYST-PR"]},
  {"layer": "Outreach", "what": "LinkedIn outreach, email campaigns and personalised follow-up", "origin": "in-house", "evidence": "stated", "sourceIds": ["T0-AWARDS"]},
  {"layer": "Analytics", "what": "Cross-platform advertising analysis and funnel dashboards", "origin": "in-house", "evidence": "stated", "sourceIds": ["T0-AWARDS"]},
  {"layer": "Governance", "what": "Not described in any public source", "origin": "unknown", "evidence": "stated", "sourceIds": ["T0-AWARDS"]}
]

r["timeline"] = [
  {"date": "2026-03-09", "event": "Start of the Search Console comparison period used in the company's later reporting.", "sourceIds": ["T1-CATALYST-PR"]},
  {"date": "2026-08-01", "event": "SBF verifies the nomination figures at the studio during the award site visit.", "sourceIds": ["T1-CATALYST-PR"]},
  {"date": "2026-10-13", "event": "Award presented by Minister Josephine Teo at SMEs Go Digital Day; Manoharan accepts for the company.", "sourceIds": ["T1-CATALYST-PR"]},
  {"date": "2026-10-16", "event": "Company issues a release reporting updated search figures and the plan to host its own models.", "sourceIds": ["T1-CATALYST-PR"]}
]

r["gaps"] = [
  "The Business Insider page is a GlobeNewswire release issued by the company, and the page states that Business Insider's editorial team was not involved. It corroborates the company's account but is not independent reporting, so the grade stays at B.",
  "Absolute traffic, lead and revenue figures are not published; only relative changes and the comparison period.",
  "The model named Fable is not identified in any other public source. The release describes it as the latest Claude model from Anthropic.",
  "The claim to be the first fitness brand to win is the company's own. The award citation lists sectors and makes no sector-first claim."
]

r["confidence"] = "B"

json.dump(rows, open(p, "w"), indent=2, ensure_ascii=False)
print("updated catalyst-performance")
