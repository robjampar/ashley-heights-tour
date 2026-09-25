"""Locate user-marked fountain and gates without changing the clear site plan."""
from pathlib import Path
import json
import numpy as np
from scipy.optimize import least_squares
from PIL import Image
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'output-walkthrough'
site = json.loads((OUT/'site-registration.json').read_text())
world = np.array(site['outline_m'])
pixels = np.array([[134,256],[1268,143],[1385,1375],[948,1485],
                   [754,1076],[686,398],[148,386]], float)

def project(v, p):
    a, b, tx, ty = v
    p = np.array(p)
    return np.c_[a*p[:,0]+b*p[:,1]+tx, b*p[:,0]-a*p[:,1]+ty]

fit = least_squares(lambda v:(project(v, world)-pixels).ravel(), [26,-3,896,869])
a,b,tx,ty = fit.x
inverse = np.linalg.inv([[a,b],[b,-a]])
convert = lambda p: (np.array(p)-[tx,ty])@inverse.T
fountain = convert([1120,1166])
gate = convert([[906,1323],[854,1213]])  # South to north.
errors = np.linalg.norm(project(fit.x, world)-pixels, axis=1)/np.hypot(a,b)
data = {'source_file':'source/aerial-boundary-annotated.png',
        'method':'Uniform scale, rotation and translation fitted to seven corresponding boundary bends. Clear site-plan boundary retained; no anisotropic model stretching.',
        'parameters':fit.x.tolist(), 'boundary_pixels':pixels.tolist(),
        'boundary_residuals_m':errors.tolist(), 'registration_rms_m':float(np.sqrt(np.mean(errors**2))),
        'fountain_center_pixel':[1120,1166], 'fountain_center_m':fountain.tolist(),
        'gate_endpoint_pixels':[[906,1323],[854,1213]], 'gate_endpoints_m':gate.tolist(),
        'gate_center_m':gate.mean(axis=0).tolist(), 'marked_gate_span_m':float(np.linalg.norm(gate[1]-gate[0])),
        'note':'User marks approximate wall lines in red, fountain centre in red/white and gate span in blue. Thick strokes and oblique aerial perspective limit precision; these are placement estimates, not surveyed coordinates.'}
(OUT/'annotated-aerial-registration.json').write_text(json.dumps(data,indent=2))
fig, ax = plt.subplots(figsize=(12,12))
ax.imshow(Image.open(ROOT/data['source_file']))
p = project(fit.x, np.r_[world,world[:1]])
ax.plot(p[:,0],p[:,1],color='#00eece',lw=2,label='Clear site-plan boundary, registered uniformly')
ax.scatter([1120],[1166],s=75,facecolors='none',edgecolors='#00eece',linewidths=2,label='Model fountain centre')
ax.plot([906,854],[1323,1213],color='#fff47b',lw=2,label='Model gate position from blue mark')
house = np.array([[-5.295,-.115],[14.095,-.115],[14.095,8.935],[-5.295,8.935],[-5.295,-.115]])
p = project(fit.x, house)
ax.plot(p[:,0],p[:,1],color='#fff47b',lw=1.5,ls='--',label='Main house wall footprint')
ax.axis('off')
ax.legend(loc='upper left',fontsize=9)
fig.suptitle('Ashley Heights — user-marked gates and fountain',fontsize=17,y=.985)
fig.text(.075,.025,f'Boundary registration RMS: {data["registration_rms_m"]:.2f} m. Marked gate span: {data["marked_gate_span_m"]:.2f} m.\nThe source annotations are approximate; the clear site-plan outline remains unchanged.',fontsize=10)
fig.subplots_adjust(left=.02,right=.98,top=.95,bottom=.08)
fig.savefig(OUT/'Annotated aerial registration.pdf')
fig.savefig(OUT/'Annotated aerial registration.png',dpi=170)
print(json.dumps(data,indent=2))
