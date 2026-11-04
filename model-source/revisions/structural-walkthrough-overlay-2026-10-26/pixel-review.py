"""Image-level opacity/wipe check on a fixed roof crop, outside the controls."""
from pathlib import Path
from PIL import Image
import numpy as np,json
p=Path(__file__).resolve().parents[2]/'walkthrough/test-results/structural-walkthrough-overlay-2026-10-26'
a,b,c,d=[np.asarray(Image.open(p/f).convert('RGB'),float) for f in ['06-structure-zero.png','07-structure-full.png','08-structure-half.png','09-split-half.png']]
r=np.s_[420:900,350:790,:]
# Frames are captured sequentially; temporal AO/shadow/foliage variation is
# allowed a mean 3/255 display-channel tolerance. This is not a survey test.
report={'halfOpacityMeanAbsoluteError':float(np.abs(c[r]-(a[r]+b[r])*.5).mean()),'splitFinishedSideMeanAbsoluteError':float(np.abs(d[r]-a[r]).mean()),'structureSignalMeanAbsoluteDifference':float(np.abs(a[r]-b[r]).mean()),'pixels':211200,'meanChannelTolerance':3,'basis':'Sequential Chrome screenshots, static roof crop; limited tolerance for temporal rendering variation.'}
assert report['halfOpacityMeanAbsoluteError']<3
assert report['splitFinishedSideMeanAbsoluteError']<3
assert report['structureSignalMeanAbsoluteDifference']>10
report['passed']=True
(p/'pixel-review.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
