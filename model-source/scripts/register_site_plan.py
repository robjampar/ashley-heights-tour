"""Register the unobscured user site plan with one uniform metric transform."""
from pathlib import Path
import json, numpy as np
from scipy.optimize import least_squares
from shapely.geometry import Polygon
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from PIL import Image

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
# Main rectangle corners, excluding bays/porch, in the 1680 x 1504 screenshot.
# Rear left, rear right, front right, front left. Scale comes from the room-based
# house width/depth; the raster is never stretched differently along X and Y.
pixels=np.array([[677,647],[1144,589],[1175,812],[705,873]],float)
world=np.array([[-5.295,8.935],[14.095,8.935],[14.095,-.115],[-5.295,-.115]])
boundary_pixels=np.array([[120,287],[1150,155],[1315,1320],[899,1419],[678,1067],[614,407],[139,424]],float)
outbuilding_pixels=np.array([[1058,168],[1150,155],[1177,338],[1086,352]],float)
def project(v,p=world):
    a,b,tx,ty=v;return np.c_[a*p[:,0]+b*p[:,1]+tx,b*p[:,0]-a*p[:,1]+ty]
fit=least_squares(lambda v:(project(v)-pixels).ravel(),[24,-3,832,851])
a,b,tx,ty=fit.x;inv=np.linalg.inv([[a,b],[b,-a]])
def convert(p):return (np.array(p)-[tx,ty])@inv.T
outline=convert(boundary_pixels);outbuilding=convert(outbuilding_pixels)
scale=float(np.hypot(a,b));residual=project(fit.x)-pixels
width_px=float(np.mean(np.linalg.norm(pixels[[1,2]]-pixels[[0,3]],axis=1)))
depth_px=float(np.mean(np.linalg.norm(pixels[[0,1]]-pixels[[3,2]],axis=1)))
data={'source_file':'source/site-plan-clear.png','source_size_px':[1680,1504],
      'method':'Four main-house corners; least-squares uniform scale + rotation + translation, no anisotropic stretch.',
      'parameters':fit.x.tolist(),'pixels_per_m':scale,'house_landmarks_world_m':world.tolist(),
      'house_landmarks_pixels':pixels.tolist(),'landmark_residuals_pixels':residual.tolist(),
      'corner_rms_m':float(np.sqrt(np.mean(np.sum(residual**2,axis=1)))/scale),
      'outline_m':outline.tolist(),'outline_pixels':boundary_pixels.tolist(),
      'area_m2':float(Polygon(outline).area),'outbuilding_mapped_outline_m':outbuilding.tolist(),
      'outbuilding_pixels':outbuilding_pixels.tolist(),
      'house_depth_from_map_width_ratio_m':depth_px/width_px*19.39,
      'model_main_body_depth_m':9.05,
      'note':'User identifies this as the more accurate site plan. It replaces the obscured TPO trace for site placement. No scale bar appears in the crop, so absolute scale inherits the house dimensions. House footprint aspect ratio differs by about 0.25m in depth; this remains visible, not forced away.'}
(OUT/'site-registration.json').write_text(json.dumps(data,indent=2))
fig,ax=plt.subplots(figsize=(12,12));ax.imshow(Image.open(ROOT/data['source_file']))
poly=np.r_[boundary_pixels,boundary_pixels[:1]];ax.plot(poly[:,0],poly[:,1],color='#078c86',lw=2,label='Traced boundary')
q=project(fit.x);q=np.r_[q,q[:1]];ax.plot(q[:,0],q[:,1],color='#c55324',lw=2,label='Existing model body, uniform registration')
ax.scatter(pixels[:,0],pixels[:,1],color='#c55324',s=45)
for i,p in enumerate(pixels):ax.annotate(str(i+1),p,xytext=(8,10),textcoords='offset points',color='#9a3412',weight='bold')
o=np.r_[outbuilding_pixels,outbuilding_pixels[:1]];ax.plot(o[:,0],o[:,1],color='#426cba',lw=2,label='Mapped outbuilding outline')
ax.set_xlim(60,1380);ax.set_ylim(1460,85);ax.axis('off');ax.legend(loc='lower right',fontsize=10)
fig.suptitle('Ashley Heights — registration to the unobscured site plan',fontsize=17,y=.97)
fig.text(.08,.03,f'Uniform scale: {scale:.2f} px/m. Four-corner fit: {data["corner_rms_m"]:.2f} m RMS. Traced plot: {data["area_m2"]:,.0f} m².\nMap aspect ratio suggests a 9.30 m main body; current model is 9.05 m. Absolute scale inherits the room-based house dimensions.',fontsize=10)
fig.subplots_adjust(top=.92,bottom=.09);fig.savefig(OUT/'Site plan registration.pdf');fig.savefig(OUT/'Site plan registration.png',dpi=170)
print(json.dumps(data,indent=2))
