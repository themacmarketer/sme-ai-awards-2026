import re,html,sys,json,subprocess,concurrent.futures as cf
domains = sys.argv[1:]
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
KW=["artificial intelligence","AI-","AI ","generative","genai","machine learning","automation","copilot","agent","LLM","Claude","ChatGPT","OpenAI","computer vision"]
def get(d):
    for scheme in ("https://","http://"):
        try:
            r=subprocess.run(["curl","-sL","--max-time","20","-A",UA,"-w","\n__CODE__%{http_code}",scheme+d],capture_output=True,text=True)
            out=r.stdout
            m=re.search(r"__CODE__(\d+)$",out.strip())
            code=m.group(1) if m else "000"
            body=out[:m.start()] if m else out
            if code.startswith("2") and len(body)>800:
                return d,code,body
        except Exception as e:
            pass
    return d,code if 'code' in dir() else "err",""
def clean(t):
    t=re.sub(r'<script.*?</script>|<style.*?</style>|<!--.*?-->','',t,flags=re.S|re.I)
    t=re.sub(r'<[^>]+>',' ',t); t=html.unescape(t); return re.sub(r'\s+',' ',t)
def work(d):
    d,code,body=get(d)
    if not body: return {"domain":d,"status":code,"text":""}
    txt=clean(body)
    sents=re.split(r'(?<=[.!?])\s+',txt)
    hits=[s for s in sents if any(k.lower() in s.lower() for k in KW) and len(s)<400]
    return {"domain":d,"status":code,"len":len(txt),"hits":hits[:14]}
with cf.ThreadPoolExecutor(max_workers=6) as ex:
    res=list(ex.map(work,domains))
json.dump(res,open("research/site-probe.json","w"),indent=1)
for r in res:
    print("==",r["domain"],r["status"],r.get("len"))
    for h in r.get("hits",[])[:8]: print("   *",h[:230])
