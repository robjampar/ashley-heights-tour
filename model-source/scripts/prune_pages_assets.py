"""Prune stale content-hashed assets from the GitHub Pages checkout.

Run from deployment/ashley-heights-tour after stage_github_pages.py. Keeps
the assets the new manifest names plus those the committed (HEAD) manifest
named, so a page loaded before this publish still resolves its files, and
rewrites previous_assets to exactly that retained set.
"""
import json,os,re,subprocess,time
root='model'
new=json.load(open(f'{root}/release.json'))
head=json.loads(subprocess.check_output(['git','show',f'HEAD:{root}/release.json']))
keep=set(new['assets'])|set(head['assets'])
hashed=re.compile(r'^[\w.-]+\.[0-9a-f]{16}\.(glb|json|js|css)$')
removed=0
for f in sorted(os.listdir(root)):
    if hashed.match(f) and f not in keep:
        os.remove(f'{root}/{f}');removed+=1;print('removed',f)
prev={name:{**info,'retain_until_epoch':time.time()+7*86400} for name,info in head['assets'].items() if name not in new['assets']}
new['previous_assets']=prev
json.dump(new,open(f'{root}/release.json','w'),indent=2);open(f'{root}/release.json','a').write('\n')
print('removed',removed,'kept',len(keep),'previous',list(prev))
