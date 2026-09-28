"""Precisely scaled model elevation sheets; vector annotation, z-buffer linework."""
from pathlib import Path
import subprocess, json, base64, io
import numpy as np
import pymupdf as fitz
from PIL import Image, ImageFilter
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'revisions/brochure-spatial-2026-09-28/elevations'
VIEWS={'W':([-100,-1,4],[0,-1,4],35,'WEST / ENTRANCE COURTYARD'),'S':([4,-100,4],[4,0,4],25,'SOUTH'),'E':([100,-1,4],[0,-1,4],35,'EAST'),'N':([4,100,4],[4,0,4],25,'NORTH / GARDEN')}

def sheet(key, im, width, title, scale, pw, ph):
 s=1000/scale; iw=width*s; ih=width*2000/4400*s; x=(pw-iw)/2; ground=ph*.56; y=ground-(4+width*2000/4400/2)*s
 b=io.BytesIO();im.save(b,format='PNG');data=base64.b64encode(b.getvalue()).decode()
 parts=[f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{pw}mm" height="{ph}mm" viewBox="0 0 {pw} {ph}">',f'<rect width="{pw}" height="{ph}" fill="white"/>']
 def line(a,b,c,d,w=.18,dash=''):
  parts.append(f'<line x1="{a}" y1="{b}" x2="{c}" y2="{d}" stroke="#202020" stroke-width="{w}" '+(f'stroke-dasharray="{dash}"' if dash else '')+'/>')
 def text(t,a,b,size=2.3):parts.append(f'<text x="{a}" y="{b}" font-family="Helvetica" font-size="{size}" fill="#202020">{t}</text>')
 parts.append(f'<rect x="8" y="8" width="{pw-16}" height="{ph-16}" fill="none" stroke="#202020" stroke-width=".3"/>')
 text('ASHLEY HEIGHTS',14,19,4);text('PROPOSED / BRICK FACADE',14,25,2.4);text(title+' ELEVATION',14,34,3.3)
 parts.append(f'<image x="{x}" y="{y}" width="{iw}" height="{ih}" xlink:href="data:image/png;base64,{data}"/>')
 # Clear all below datum; native geometry and model foundations do not represent surveyed ground.
 parts.append(f'<rect x="{x}" y="{ground}" width="{iw}" height="{max(0,y+ih-ground)}" fill="white"/>')
 line(x,ground,x+iw,ground,.4)
 for z,label in [(0,'GROUND DATUM +0.000'),(2.8,'FIRST DATUM +2.800'),(5.55,'LOFT DATUM +5.550')]:
  yy=ground-z*s;line(x-10,yy,x,yy,.15);text(label,12,yy-1.5,2)
 # Dimension string drawn against model floor datums.
 dx=x+iw+5
 for z in [0,2.8,5.55]:
  yy=ground-z*s;line(dx-2,yy,dx+2,yy);line(dx-1,yy+1,dx+1,yy-1,.25)
 line(dx,ground,dx,ground-5.55*s)
 text('2800',dx+2,ground-1.4*s,2);text('2750',dx+2,ground-4.175*s,2)
 text(f'01  {title} ELEVATION',x,ground+11,2.6);text(f'1:{scale} AT '+('A4' if pw==297 else 'A3')+' / ORTHOGRAPHIC',x,ground+16,2.1)
 sy=ph-63; text('MATERIALS',14,sy,2.4)
 for i,t in enumerate(['External walls: facing brick','Pitched roofs / dormer cheeks: tile; flat caps: membrane','Retained white / proposed dark frames; oak entrance doors']):text(t,14,sy+5+i*4,2.1)
 text('DRAWING NOTES',pw*.54,sy,2.4)
 for i,t in enumerate(['Dimensions in mm; levels in m relative to model datum.','Model-derived design review; verify against measured survey.','Not for construction. Print at 100% / actual size.']):text(t,pw*.54,sy+5+i*4,2.1)
 sy=ph-37;text('METRES',14,sy-3,2)
 for i in range(5):
  parts.append(f'<rect x="{14+i*s}" y="{sy}" width="{s}" height="1.5" stroke="black" stroke-width=".15" fill="'+('black' if i%2==0 else 'white')+'"/>')
 for i in [0,1,2,3,4,5]:text(str(i),14+i*s-.5,sy+5,2)
 ty=ph-24;line(8,ty,pw-8,ty,.3)
 for xx in [pw*.48,pw*.72,pw*.86]:line(xx,ty,xx,ph-8,.2)
 text('ASHLEY HEIGHTS / PROPOSED',12,ty+6,2.6);text('LOCAL OWNER REVIEW',12,ty+12,2)
 text('AH-P-E'+key+' / REV C',pw*.48+3,ty+6,2.5);text(title,pw*.48+3,ty+12,1.9)
 text(f'1:{scale} @ '+('A4' if pw==297 else 'A3'),pw*.72+3,ty+6,2.5);text('SCALE AT ACTUAL SIZE',pw*.72+3,ty+12,1.7)
 text('28 SEP 2026',pw*.86+3,ty+6,2.2);text('DESIGN REVIEW',pw*.86+3,ty+12,1.8)
 parts.append('</svg>');return ''.join(parts)

def main():
 pdf=ROOT/'output/pdf/ashley-heights-elevations-A3.pdf';c=canvas.Canvas(str(pdf),pagesize=(420*mm,297*mm))
 manifest=[]
 for key,(eye,target,width,title) in VIEWS.items():
  ppm=OUT/(key+'-linework.ppm')
  subprocess.run(['/tmp/ashley-brochure-cpu-render',str(OUT/'house-envelope-triangles.bin'),str(ppm),'4400','2000',*map(str,eye+target),str(-width),'0','lines'],check=True)
  im=Image.open(ppm).convert('L').filter(ImageFilter.MinFilter(3));im.save(OUT/(key+'-linework.png'));ppm.unlink()
  for scale,pw,ph,suffix in [(200,297,210,''),(100,420,297,'-A3')]:
   path=OUT/(key+suffix+'.svg');path.write_text(sheet(key,im,width,title,scale,pw,ph))
   d=svg2rlg(str(path));assert abs(d.width-pw*mm)<.01
   if suffix:renderPDF.draw(d,c,0,0);c.showPage()
   else:
    preview=fitz.open(stream=renderPDF.drawToString(d),filetype='pdf');preview[0].get_pixmap(matrix=fitz.Matrix(2,2)).save(str(OUT/(key+'.png')))
  manifest.append({'view':key,'A4Scale':200,'A3Scale':100,'sourceWidthM':width,'A4ViewportWidthMm':width*5,'A3ViewportWidthMm':width*10,'scaleBarA4Mm':25,'scaleBarA3Mm':50})
 c.save();(OUT/'sheet-scales.json').write_text(json.dumps(manifest,indent=2))
if __name__=='__main__':main()
