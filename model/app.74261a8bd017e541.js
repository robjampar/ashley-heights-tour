var Zd=0,Eh=1,Kd=2;var Po=1,xl=2,or=3,Pn=0,Zt=1,Et=2,Lt=0,ar=1,Ah=2,Rh=3,Ch=4,_l=5;var In=100,Jd=101,jd=102,$d=103,Qd=104,ds=200,ef=201,tf=202,nf=203,Ph=204,Ih=205,Io=206,sf=207,Lo=208,rf=209,of=210,af=211,lf=212,cf=213,hf=214,Wa=0,Xa=1,qa=2,zs=3,Ya=4,Za=5,Ka=6,Ja=7,Lh=0,uf=1,df=2,Vn=0,Do=1,No=2,Uo=3,Fo=4,Oo=5,fs=6,Bo=7,ch="attached",ff="detached",Dh=300,Wi=301,ps=302,vl=303,yl=304,zo=306,hn=1e3,Rn=1001,ks=1002,Mt=1003,Ml=1004;var ms=1005;var Pt=1006,lr=1007;var Gn=1008;var en=1009,Nh=1010,Uh=1011,cr=1012,Sl=1013,Wn=1014,Sn=1015,kt=1016,bl=1017,wl=1018,Xi=1020,Fh=35902,Oh=35899,Bh=1021,zh=1022,cn=1023,$n=1026,ai=1027,Tl=1028,El=1029,qi=1030,Al=1031;var Rl=1033,ko=33776,Ho=33777,Vo=33778,Go=33779,Cl=35840,Pl=35841,Il=35842,Ll=35843,Dl=36196,Nl=37492,Ul=37496,Fl=37488,Ol=37489,Wo=37490,Bl=37491,zl=37808,kl=37809,Hl=37810,Vl=37811,Gl=37812,Wl=37813,Xl=37814,ql=37815,Yl=37816,Zl=37817,Kl=37818,Jl=37819,jl=37820,$l=37821,Ql=36492,ec=36494,tc=36495,nc=36283,ic=36284,Xo=36285,sc=36286;var is=2300,ss=2301,Ha=2302,hh=2303,uh=2400,dh=2401,fh=2402,pf=2500;var kh=0,qo=1,hr=2,mf=3200;var Yo=0,gf=1,Ri="",Ct="srgb",rn="srgb-linear",Yr="linear",et="srgb";var Va=7680;var xf=519,_f=512,vf=513,yf=514,rc=515,Mf=516,Sf=517,oc=518,bf=519,Hh=35044;var Vh="300 es",zn=2e3,Hs=2001;function Bp(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function zp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Vs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function wf(){let s=Vs("canvas");return s.style.display="block",s}var id={},Gs=null;function Zr(...s){let e="THREE."+s.shift();Gs?Gs("log",e,...s):console.log(e,...s)}function Tf(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ae(...s){s=Tf(s);let e="THREE."+s.shift();if(Gs)Gs("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ne(...s){s=Tf(s);let e="THREE."+s.shift();if(Gs)Gs("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ns(...s){let e=s.join(" ");e in id||(id[e]=!0,Ae(...s))}function Ef(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Af={[Wa]:Xa,[qa]:Ka,[Ya]:Ja,[zs]:Za,[Xa]:Wa,[Ka]:qa,[Ja]:Ya,[Za]:zs},Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sd=1234567,Gr=Math.PI/180,rs=180/Math.PI;function Cn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[s&255]+jt[s>>8&255]+jt[s>>16&255]+jt[s>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function Xe(s,e,t){return Math.max(e,Math.min(t,s))}function Gh(s,e){return(s%e+e)%e}function kp(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Hp(s,e,t){return s!==e?(t-s)/(e-s):0}function Wr(s,e,t){return(1-t)*s+t*e}function Vp(s,e,t,n){return Wr(s,e,1-Math.exp(-t*n))}function Gp(s,e=1){return e-Math.abs(Gh(s,e*2)-e)}function Wp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Xp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function qp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Yp(s,e){return s+Math.random()*(e-s)}function Zp(s){return s*(.5-Math.random())}function Kp(s){s!==void 0&&(sd=s);let e=sd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Jp(s){return s*Gr}function jp(s){return s*rs}function $p(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Qp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function em(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function tm(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*p,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*p,a*l);break;case"ZYZ":s.set(c*p,c*f,a*h,a*l);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Bn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ot(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var gs={DEG2RAD:Gr,RAD2DEG:rs,generateUUID:Cn,clamp:Xe,euclideanModulo:Gh,mapLinear:kp,inverseLerp:Hp,lerp:Wr,damp:Vp,pingpong:Gp,smoothstep:Wp,smootherstep:Xp,randInt:qp,randFloat:Yp,randFloatSpread:Zp,seededRandom:Kp,degToRad:Jp,radToDeg:jp,isPowerOfTwo:$p,ceilPowerOfTwo:Qp,floorPowerOfTwo:em,setQuaternionFromProperEuler:tm,normalize:ot,denormalize:Bn},re=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},vn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(u!==_||c!==d||l!==f||h!==p){let m=c*d+l*f+h*p+u*_;m<0&&(d=-d,f=-f,p=-p,_=-_,m=-m);let g=1-a;if(m<.9995){let b=Math.acos(m),T=Math.sin(b);g=Math.sin(g*b)/T,a=Math.sin(a*b)/T,c=c*g+d*a,l=l*g+f*a,h=h*g+p*a,u=u*g+_*a}else{c=c*g+d*a,l=l*g+f*a,h=h*g+p*a,u=u*g+_*a;let b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*u+c*f-l*d,e[t+1]=c*p+h*d+l*u-a*f,e[t+2]=l*p+h*f+a*d-c*u,e[t+3]=h*p-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),p=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fc.copy(this).projectOnVector(e),this.sub(Fc)}reflect(e){return this.sub(Fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fc=new P,rd=new vn,Fe=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],m=i[3],g=i[6],b=i[1],T=i[4],v=i[7],M=i[2],S=i[5],A=i[8];return r[0]=o*_+a*b+c*M,r[3]=o*m+a*T+c*S,r[6]=o*g+a*v+c*A,r[1]=l*_+h*b+u*M,r[4]=l*m+h*T+u*S,r[7]=l*g+h*v+u*A,r[2]=d*_+f*b+p*M,r[5]=d*m+f*T+p*S,r[8]=d*g+f*v+p*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Oc.makeScale(e,t)),this}rotate(e){return ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Oc.makeRotation(-e)),this}translate(e,t){return ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Oc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Oc=new Fe,od=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ad=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nm(){let s={enabled:!0,workingColorSpace:rn,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===et&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===et&&(i.r=Os(i.r),i.g=Os(i.g),i.b=Os(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ri?Yr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ns("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ns("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[rn]:{primaries:e,whitePoint:n,transfer:Yr,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:n,transfer:et,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),s}var ze=nm();function yi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Os(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var bs,ja=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bs===void 0&&(bs=Vs("canvas")),bs.width=e.width,bs.height=e.height;let i=bs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Vs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=yi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yi(t[n]/255)*255):t[n]=yi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},im=0,Ws=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Bc(i[o].image)):r.push(Bc(i[o]))}else r=Bc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Bc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ja.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}var sm=0,zc=new P,qt=class s extends Qn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Rn,i=Rn,r=Pt,o=Gn,a=cn,c=en,l=s.DEFAULT_ANISOTROPY,h=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Cn(),this.name="",this.source=new Ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zc).x}get height(){return this.source.getSize(zc).y}get depth(){return this.source.getSize(zc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hn:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case ks:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hn:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case ks:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Dh;qt.DEFAULT_ANISOTROPY=1;var lt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],_=c[2],m=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+m)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,v=(f+1)/2,M=(g+1)/2,S=(h+d)/4,A=(u+_)/4,x=(p+m)/4;return T>v&&T>M?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=S/n,r=A/n):v>M?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=S/i,r=x/i):M<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),n=A/r,i=x/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-p)*(m-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-p)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$a=class extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new qt(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ws(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},It=class extends $a{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kr=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qa=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var De=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,o,a,c,l,h,u,d,f,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,f,p,_,m)}set(e,t,n,i,r,o,a,c,l,h,u,d,f,p,_,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/ws.setFromMatrixColumn(e,0).length(),r=1/ws.setFromMatrixColumn(e,1).length(),o=1/ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,p=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+p*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=p+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,p=l*h,_=l*u;t[0]=d+_*a,t[4]=p*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,p=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,p=a*h,_=a*u;t[0]=c*h,t[4]=p*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-p,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,p=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,f=o*l,p=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rm,e,om)}lookAt(e,t,n){let i=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Ni.crossVectors(n,xn),Ni.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Ni.crossVectors(n,xn)),Ni.normalize(),pa.crossVectors(xn,Ni),i[0]=Ni.x,i[4]=pa.x,i[8]=xn.x,i[1]=Ni.y,i[5]=pa.y,i[9]=xn.y,i[2]=Ni.z,i[6]=pa.z,i[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],m=n[10],g=n[14],b=n[3],T=n[7],v=n[11],M=n[15],S=i[0],A=i[4],x=i[8],E=i[12],R=i[1],I=i[5],D=i[9],O=i[13],L=i[2],V=i[6],Y=i[10],Z=i[14],te=i[3],G=i[7],$=i[11],ee=i[15];return r[0]=o*S+a*R+c*L+l*te,r[4]=o*A+a*I+c*V+l*G,r[8]=o*x+a*D+c*Y+l*$,r[12]=o*E+a*O+c*Z+l*ee,r[1]=h*S+u*R+d*L+f*te,r[5]=h*A+u*I+d*V+f*G,r[9]=h*x+u*D+d*Y+f*$,r[13]=h*E+u*O+d*Z+f*ee,r[2]=p*S+_*R+m*L+g*te,r[6]=p*A+_*I+m*V+g*G,r[10]=p*x+_*D+m*Y+g*$,r[14]=p*E+_*O+m*Z+g*ee,r[3]=b*S+T*R+v*L+M*te,r[7]=b*A+T*I+v*V+M*G,r[11]=b*x+T*D+v*Y+M*$,r[15]=b*E+T*O+v*Z+M*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],m=e[11],g=e[15],b=c*f-l*d,T=a*f-l*u,v=a*d-c*u,M=o*f-l*h,S=o*d-c*h,A=o*u-a*h;return t*(_*b-m*T+g*v)-n*(p*b-m*M+g*S)+i*(p*T-_*M+g*A)-r*(p*v-_*S+m*A)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+i*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],m=e[14],g=e[15],b=t*a-n*o,T=t*c-i*o,v=t*l-r*o,M=n*c-i*a,S=n*l-r*a,A=i*l-r*c,x=h*_-u*p,E=h*m-d*p,R=h*g-f*p,I=u*m-d*_,D=u*g-f*_,O=d*g-f*m,L=b*O-T*D+v*I+M*R-S*E+A*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/L;return e[0]=(a*O-c*D+l*I)*V,e[1]=(i*D-n*O-r*I)*V,e[2]=(_*A-m*S+g*M)*V,e[3]=(d*S-u*A-f*M)*V,e[4]=(c*R-o*O-l*E)*V,e[5]=(t*O-i*R+r*E)*V,e[6]=(m*v-p*A-g*T)*V,e[7]=(h*A-d*v+f*T)*V,e[8]=(o*D-a*R+l*x)*V,e[9]=(n*R-t*D-r*x)*V,e[10]=(p*S-_*v+g*b)*V,e[11]=(u*v-h*S-f*b)*V,e[12]=(a*E-o*I-c*x)*V,e[13]=(t*I-n*E+i*x)*V,e[14]=(_*T-p*M-m*b)*V,e[15]=(h*M-u*T+d*b)*V,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,p=r*u,_=o*h,m=o*u,g=a*u,b=c*l,T=c*h,v=c*u,M=n.x,S=n.y,A=n.z;return i[0]=(1-(_+g))*M,i[1]=(f+v)*M,i[2]=(p-T)*M,i[3]=0,i[4]=(f-v)*S,i[5]=(1-(d+g))*S,i[6]=(m+b)*S,i[7]=0,i[8]=(p+T)*A,i[9]=(m-b)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=ws.set(i[0],i[1],i[2]).length(),a=ws.set(i[4],i[5],i[6]).length(),c=ws.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Nn.copy(this);let l=1/o,h=1/a,u=1/c;return Nn.elements[0]*=l,Nn.elements[1]*=l,Nn.elements[2]*=l,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=u,Nn.elements[9]*=u,Nn.elements[10]*=u,t.setFromRotationMatrix(Nn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,i,r,o,a=zn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,_;if(c)p=r/(o-r),_=o*r/(o-r);else if(a===zn)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Hs)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=zn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,_;if(c)p=1/(o-r),_=o/(o-r);else if(a===zn)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Hs)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ws=new P,Nn=new De,rm=new P(0,0,0),om=new P(1,1,1),Ni=new P,pa=new P,xn=new P,ld=new De,cd=new vn,kn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ld.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ld,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cd.setFromEuler(this),this.setFromQuaternion(cd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";var Xs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},am=0,hd=new P,Ts=new vn,pi=new De,ma=new P,Nr=new P,lm=new P,cm=new vn,ud=new P(1,0,0),dd=new P(0,1,0),fd=new P(0,0,1),pd={type:"added"},hm={type:"removed"},Es={type:"childadded",child:null},kc={type:"childremoved",child:null},gt=class s extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new P,t=new kn,n=new vn,i=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new De},normalMatrix:{value:new Fe}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(ud,e)}rotateY(e){return this.rotateOnAxis(dd,e)}rotateZ(e){return this.rotateOnAxis(fd,e)}translateOnAxis(e,t){return hd.copy(e).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ud,e)}translateY(e){return this.translateOnAxis(dd,e)}translateZ(e){return this.translateOnAxis(fd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ma.copy(e):ma.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Nr,ma,this.up):pi.lookAt(ma,Nr,this.up),this.quaternion.setFromRotationMatrix(pi),i&&(pi.extractRotation(i.matrixWorld),Ts.setFromRotationMatrix(pi),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ne("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pd),Es.child=e,this.dispatchEvent(Es),Es.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hm),kc.child=e,this.dispatchEvent(kc),kc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pd),Es.child=e,this.dispatchEvent(Es),Es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,lm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,cm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};gt.DEFAULT_UP=new P(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var at=class extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}},um={type:"move"},qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new at,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new at,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new at,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),g=this._getHandJoint(l,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(um)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new at;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},ga={h:0,s:0,l:0};function Hc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ie=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ze.workingColorSpace){if(e=Gh(e,1),t=Xe(t,0,1),n=Xe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Hc(o,r,e+1/3),this.g=Hc(o,r,e),this.b=Hc(o,r,e-1/3)}return ze.colorSpaceToWorking(this,i),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){let n=Rf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return ze.workingToColorSpace($t.copy(this),e),Math.round(Xe($t.r*255,0,255))*65536+Math.round(Xe($t.g*255,0,255))*256+Math.round(Xe($t.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace($t.copy(this),t);let n=$t.r,i=$t.g,r=$t.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Ct){ze.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,i=$t.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+t,Ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ui),e.getHSL(ga);let n=Wr(Ui.h,ga.h,t),i=Wr(Ui.s,ga.s,t),r=Wr(Ui.l,ga.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ie;Ie.NAMES=Rf;var os=class extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Un=new P,mi=new P,Vc=new P,gi=new P,As=new P,Rs=new P,md=new P,Gc=new P,Wc=new P,Xc=new P,qc=new lt,Yc=new lt,Zc=new lt,ki=class s{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Un.subVectors(e,t),i.cross(Un);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Un.subVectors(i,t),mi.subVectors(n,t),Vc.subVectors(e,t);let o=Un.dot(Un),a=Un.dot(mi),c=Un.dot(Vc),l=mi.dot(mi),h=mi.dot(Vc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,p=(o*h-a*c)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gi.x),c.addScaledVector(o,gi.y),c.addScaledVector(a,gi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,o){return qc.setScalar(0),Yc.setScalar(0),Zc.setScalar(0),qc.fromBufferAttribute(e,t),Yc.fromBufferAttribute(e,n),Zc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(qc,r.x),o.addScaledVector(Yc,r.y),o.addScaledVector(Zc,r.z),o}static isFrontFacing(e,t,n,i){return Un.subVectors(n,t),mi.subVectors(e,t),Un.cross(mi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Un.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;As.subVectors(i,n),Rs.subVectors(r,n),Gc.subVectors(e,n);let c=As.dot(Gc),l=Rs.dot(Gc);if(c<=0&&l<=0)return t.copy(n);Wc.subVectors(e,i);let h=As.dot(Wc),u=Rs.dot(Wc);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(As,o);Xc.subVectors(e,r);let f=As.dot(Xc),p=Rs.dot(Xc);if(p>=0&&f<=p)return t.copy(r);let _=f*l-c*p;if(_<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(n).addScaledVector(Rs,a);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return md.subVectors(r,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(md,a);let g=1/(m+_+d);return o=_*g,a=d*g,t.copy(n).addScaledVector(As,o).addScaledVector(Rs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qt=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Fn):Fn.fromBufferAttribute(r,o),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xa.copy(n.boundingBox)),xa.applyMatrix4(e.matrixWorld),this.union(xa)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ur),_a.subVectors(this.max,Ur),Cs.subVectors(e.a,Ur),Ps.subVectors(e.b,Ur),Is.subVectors(e.c,Ur),Fi.subVectors(Ps,Cs),Oi.subVectors(Is,Ps),$i.subVectors(Cs,Is);let t=[0,-Fi.z,Fi.y,0,-Oi.z,Oi.y,0,-$i.z,$i.y,Fi.z,0,-Fi.x,Oi.z,0,-Oi.x,$i.z,0,-$i.x,-Fi.y,Fi.x,0,-Oi.y,Oi.x,0,-$i.y,$i.x,0];return!Kc(t,Cs,Ps,Is,_a)||(t=[1,0,0,0,1,0,0,0,1],!Kc(t,Cs,Ps,Is,_a))?!1:(va.crossVectors(Fi,Oi),t=[va.x,va.y,va.z],Kc(t,Cs,Ps,Is,_a))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},xi=[new P,new P,new P,new P,new P,new P,new P,new P],Fn=new P,xa=new Qt,Cs=new P,Ps=new P,Is=new P,Fi=new P,Oi=new P,$i=new P,Ur=new P,_a=new P,va=new P,Qi=new P;function Kc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Qi.fromArray(s,r);let a=i.x*Math.abs(Qi.x)+i.y*Math.abs(Qi.y)+i.z*Math.abs(Qi.z),c=e.dot(Qi),l=t.dot(Qi),h=n.dot(Qi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Ot=new P,ya=new re,dm=0,zt=class extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hh,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ya.fromBufferAttribute(this,t),ya.applyMatrix3(e),this.setXY(t,ya.x,ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Jr=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var jr=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var qe=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},fm=new Qt,Fr=new P,Jc=new P,un=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):fm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fr.subVectors(e,this.center);let t=Fr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Fr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fr.copy(e.center).add(Jc)),this.expandByPoint(Fr.copy(e.center).sub(Jc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},pm=0,An=new De,jc=new gt,Ls=new P,_n=new Qt,Or=new Qt,Xt=new P,rt=class s extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bp(e)?jr:Jr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,t,n){return An.makeTranslation(e,t,n),this.applyMatrix4(An),this}scale(e,t,n){return An.makeScale(e,t,n),this.applyMatrix4(An),this}lookAt(e){return jc.lookAt(e),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Or.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(_n.min,Or.min),_n.expandByPoint(Xt),Xt.addVectors(_n.max,Or.max),_n.expandByPoint(Xt)):(_n.expandByPoint(Or.min),_n.expandByPoint(Or.max))}_n.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Xt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Xt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Xt.fromBufferAttribute(a,l),c&&(Ls.fromBufferAttribute(e,l),Xt.add(Ls)),i=Math.max(i,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new P,c[x]=new P;let l=new P,h=new P,u=new P,d=new re,f=new re,p=new re,_=new P,m=new P;function g(x,E,R){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,R),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,E),p.fromBufferAttribute(r,R),h.sub(l),u.sub(l),f.sub(d),p.sub(d);let I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),a[x].add(_),a[E].add(_),a[R].add(_),c[x].add(m),c[E].add(m),c[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,E=b.length;x<E;++x){let R=b[x],I=R.start,D=R.count;for(let O=I,L=I+D;O<L;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let T=new P,v=new P,M=new P,S=new P;function A(x){M.fromBufferAttribute(i,x),S.copy(M);let E=a[x];T.copy(E),T.sub(M.multiplyScalar(M.dot(E))).normalize(),v.crossVectors(S,E);let I=v.dot(c[x])<0?-1:1;o.setXYZW(x,T.x,T.y,T.z,I)}for(let x=0,E=b.length;x<E;++x){let R=b[x],I=R.start,D=R.count;for(let O=I,L=I+D;O<L;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,p=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let g=0;g<h;g++)d[p++]=l[f++]}return new zt(d,h,u)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ys=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hh,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},sn=new P,Zs=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Zr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Zr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},$c=new P,mm=new P,gm=new Fe,On=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=$c.subVectors(n,t).cross(mm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta($c),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||gm.getNormalMatrix(e),i=this.coplanarPoint($c).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},xm=0,on=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=ar,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ph,this.blendDst=Ih,this.blendEquation=In,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Va,this.stencilZFail=Va,this.stencilZPass=Va,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ie().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new On().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var _i=new P,Qc=new P,Ma=new P,Sa=new P,Hi=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qc.copy(e).add(t).multiplyScalar(.5),Ma.copy(t).sub(e).normalize(),Sa.copy(this.origin).sub(Qc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ma),a=Sa.dot(this.direction),c=-Sa.dot(Ma),l=Sa.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*c-a,d=o*a-c,p=r*h,u>=0)if(d>=-p)if(d<=p){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Qc).addScaledVector(Ma,d),f}intersectSphere(e,t){if(e.radius<0)return null;_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),i=_i.dot(_i)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,i,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,p=t.x-o.x,_=t.y-o.y,m=t.z-o.z,g=n.x-o.x,b=n.y-o.y,T=n.z-o.z,v=Math.abs(c),M=Math.abs(l),S=Math.abs(h),A,x,E,R,I,D,O,L,V,Y,Z,te;if(v>=M&&v>=S?(E=c,D=u,V=p,te=g,c>=0?(A=l,x=h,R=d,I=f,O=_,L=m,Y=b,Z=T):(A=h,x=l,R=f,I=d,O=m,L=_,Y=T,Z=b)):M>=S?(E=l,D=d,V=_,te=b,l>=0?(A=h,x=c,R=f,I=u,O=m,L=p,Y=T,Z=g):(A=c,x=h,R=u,I=f,O=p,L=m,Y=g,Z=T)):(E=h,D=f,V=m,te=T,h>=0?(A=c,x=l,R=u,I=d,O=p,L=_,Y=g,Z=b):(A=l,x=c,R=d,I=u,O=_,L=p,Y=b,Z=g)),E===0)return null;let G=A/E,$=x/E,ee=1/E,Se=R-G*D,be=I-$*D,tt=O-G*V,We=L-$*V,Ke=Y-G*te,X=Z-$*te,J=Ke*We-X*tt,fe=Se*X-be*Ke,Le=tt*be-We*Se;if(i){if(J<0||fe<0||Le<0)return null}else if((J<0||fe<0||Le<0)&&(J>0||fe>0||Le>0))return null;let ge=J+fe+Le;if(ge===0)return null;let Oe=ee*(J*D+fe*V+Le*te);return(ge>0?Oe<0:Oe>0)?null:this.at(Oe/ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},yn=class extends on{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},gd=new De,es=new Hi,ba=new un,xd=new P,wa=new P,Ta=new P,Ea=new P,eh=new P,Aa=new P,_d=new P,Ra=new P,je=class extends gt{constructor(e=new rt,t=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Aa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(eh.fromBufferAttribute(u,e),o?Aa.addScaledVector(eh,h):Aa.addScaledVector(eh.sub(t),h))}t.add(Aa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ba.copy(n.boundingSphere),ba.applyMatrix4(r),es.copy(e.ray).recast(e.near),!(ba.containsPoint(es.origin)===!1&&(es.intersectSphere(ba,xd)===null||es.origin.distanceToSquared(xd)>(e.far-e.near)**2))&&(gd.copy(r).invert(),es.copy(e.ray).applyMatrix4(gd),!(n.boundingBox!==null&&es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,es)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let m=d[p],g=o[m.materialIndex],b=Math.max(m.start,f.start),T=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,M=T;v<M;v+=3){let S=a.getX(v),A=a.getX(v+1),x=a.getX(v+2);i=Ca(this,g,e,n,l,h,u,S,A,x),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let b=a.getX(m),T=a.getX(m+1),v=a.getX(m+2);i=Ca(this,o,e,n,l,h,u,b,T,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let m=d[p],g=o[m.materialIndex],b=Math.max(m.start,f.start),T=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,M=T;v<M;v+=3){let S=v,A=v+1,x=v+2;i=Ca(this,g,e,n,l,h,u,S,A,x),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let b=m,T=m+1,v=m+2;i=Ca(this,o,e,n,l,h,u,b,T,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function _m(s,e,t,n,i,r,o,a){let c;if(e.side===Zt?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Pn,a),c===null)return null;Ra.copy(a),Ra.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Ra);return l<t.near||l>t.far?null:{distance:l,point:Ra.clone(),object:s}}function Ca(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,wa),s.getVertexPosition(c,Ta),s.getVertexPosition(l,Ea);let h=_m(s,e,t,n,wa,Ta,Ea,_d);if(h){let u=new P;ki.getBarycoord(_d,wa,Ta,Ea,u),i&&(h.uv=ki.getInterpolatedAttribute(i,a,c,l,u,new re)),r&&(h.uv1=ki.getInterpolatedAttribute(r,a,c,l,u,new re)),o&&(h.normal=ki.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new P,materialIndex:0};ki.getNormal(wa,Ta,Ea,d.normal),h.face=d,h.barycoord=u}return h}var Br=new lt,vd=new lt,yd=new lt,vm=new lt,Md=new De,Pa=new P,th=new un,Sd=new De,nh=new Hi,$r=class extends je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ch,this.bindMatrix=new De,this.bindMatrixInverse=new De,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pa),this.boundingBox.expandByPoint(Pa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new un),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pa),this.boundingSphere.expandByPoint(Pa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),th.copy(this.boundingSphere),th.applyMatrix4(i),e.ray.intersectsSphere(th)!==!1&&(Sd.copy(i).invert(),nh.copy(e.ray).applyMatrix4(Sd),!(this.boundingBox!==null&&nh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,nh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ch?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ff?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;vd.fromBufferAttribute(i.attributes.skinIndex,e),yd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Br.copy(t),t.set(0,0,0,0)):(Br.set(...t,1),t.set(0,0,0)),Br.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=yd.getComponent(r);if(o!==0){let a=vd.getComponent(r);Md.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(vm.copy(Br).applyMatrix4(Md),o)}}return t.isVector4&&(t.w=Br.w),t.applyMatrix4(this.bindMatrixInverse)}},Ks=class extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ei=class extends qt{constructor(e=null,t=1,n=1,i,r,o,a,c,l=Mt,h=Mt,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},bd=new De,ym=new De,Qr=class s{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new De)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new De;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:ym;bd.multiplyMatrices(a,t[r]),bd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ei(t,e,e,cn,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(Ae("Skeleton: No bone found with UUID:",r),o=new Ks),this.bones.push(o),this.boneInverses.push(new De().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},Mi=class extends zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ds=new De,wd=new De,Ia=[],Td=new Qt,Mm=new De,zr=new je,kr=new un,eo=class extends je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Mm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),Td.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(Td)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),kr.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ds),wd.multiplyMatrices(n,Ds),zr.matrixWorld=wd,zr.raycast(e,Ia);for(let o=0,a=Ia.length;o<a;o++){let c=Ia[o];c.instanceId=r,c.object=this,t.push(c)}Ia.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Mi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ei(new Float32Array(i*this.count),i,this.count,Tl,Sn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ts=new un,Sm=new re(.5,.5),La=new P,Js=class{constructor(e=new On,t=new On,n=new On,i=new On,r=new On,o=new On){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],_=r[9],m=r[10],g=r[11],b=r[12],T=r[13],v=r[14],M=r[15];if(i[0].setComponents(l-o,f-h,g-p,M-b).normalize(),i[1].setComponents(l+o,f+h,g+p,M+b).normalize(),i[2].setComponents(l+a,f+u,g+_,M+T).normalize(),i[3].setComponents(l-a,f-u,g-_,M-T).normalize(),n)i[4].setComponents(c,d,m,v).normalize(),i[5].setComponents(l-c,f-d,g-m,M-v).normalize();else if(i[4].setComponents(l-c,f-d,g-m,M-v).normalize(),t===zn)i[5].setComponents(l+c,f+d,g+m,M+v).normalize();else if(t===Hs)i[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ts)}intersectsSprite(e){ts.center.set(0,0,0);let t=Sm.distanceTo(e.center);return ts.radius=.7071067811865476+t,ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(ts)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(La.x=i.normal.x>0?e.max.x:e.min.x,La.y=i.normal.y>0?e.max.y:e.min.y,La.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(La)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ti=class extends on{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},el=new P,tl=new P,Ed=new De,Hr=new Hi,Da=new un,ih=new P,Ad=new P,Hn=class extends gt{constructor(e=new rt,t=new ti){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)el.fromBufferAttribute(t,i-1),tl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=el.distanceTo(tl);e.setAttribute("lineDistance",new qe(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(i),Da.radius+=r,e.ray.intersectsSphere(Da)===!1)return;Ed.copy(i).invert(),Hr.copy(e.ray).applyMatrix4(Ed);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,m=p-1;_<m;_+=l){let g=h.getX(_),b=h.getX(_+1),T=Na(this,e,Hr,c,g,b,_);T&&t.push(T)}if(this.isLineLoop){let _=h.getX(p-1),m=h.getX(f),g=Na(this,e,Hr,c,_,m,p-1);g&&t.push(g)}}else{let f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let _=f,m=p-1;_<m;_+=l){let g=Na(this,e,Hr,c,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){let _=Na(this,e,Hr,c,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Na(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(el.fromBufferAttribute(a,i),tl.fromBufferAttribute(a,r),t.distanceSqToSegment(el,tl,ih,Ad)>n)return;ih.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(ih);if(!(l<e.near||l>e.far))return{distance:l,point:Ad.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Rd=new P,Cd=new P,to=class extends Hn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Rd.fromBufferAttribute(t,i),Cd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Rd.distanceTo(Cd);e.setAttribute("lineDistance",new qe(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},no=class extends Hn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},js=class extends on{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Pd=new De,ph=new Hi,Ua=new un,Fa=new P,io=class extends gt{constructor(e=new rt,t=new js){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(i),Ua.radius+=r,e.ray.intersectsSphere(Ua)===!1)return;Pd.copy(i).invert(),ph.copy(e.ray).applyMatrix4(Pd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=d,_=f;p<_;p++){let m=l.getX(p);Fa.fromBufferAttribute(u,m),Id(Fa,m,c,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,_=f;p<_;p++)Fa.fromBufferAttribute(u,p),Id(Fa,p,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Id(s,e,t,n,i,r,o){let a=ph.distanceSqToPoint(s);if(a<t){let c=new P;ph.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var so=class extends qt{constructor(e=[],t=Wi,n,i,r,o,a,c,l,h){super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ni=class extends qt{constructor(e,t,n=Wn,i,r,o,a=Mt,c=Mt,l,h=$n,u=1){if(h!==$n&&h!==ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},nl=class extends ni{constructor(e,t=Wn,n=Wi,i,r,o=Mt,a=Mt,c,l=$n){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ro=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},dt=class s extends rt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new qe(l,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(u,2));function p(_,m,g,b,T,v,M,S,A,x,E){let R=v/A,I=M/x,D=v/2,O=M/2,L=S/2,V=A+1,Y=x+1,Z=0,te=0,G=new P;for(let $=0;$<Y;$++){let ee=$*I-O;for(let Se=0;Se<V;Se++){let be=Se*R-D;G[_]=be*b,G[m]=ee*T,G[g]=L,l.push(G.x,G.y,G.z),G[_]=0,G[m]=0,G[g]=S>0?1:-1,h.push(G.x,G.y,G.z),u.push(Se/A),u.push(1-$/x),Z+=1}}for(let $=0;$<x;$++)for(let ee=0;ee<A;ee++){let Se=d+ee+V*$,be=d+ee+V*($+1),tt=d+(ee+1)+V*($+1),We=d+(ee+1)+V*$;c.push(Se,be,We),c.push(be,tt,We),te+=6}a.addGroup(f,te,E),f+=te,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},as=class s extends rt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+r,_=i+1,m=new P,g=new P;for(let b=0;b<=p;b++){let T=0,v=0,M=0,S=0;if(b<=n){let E=b/n,R=E*Math.PI/2;v=-h-e*Math.cos(R),M=e*Math.sin(R),S=-e*Math.cos(R),T=E*u}else if(b<=n+r){let E=(b-n)/r;v=-h+E*t,M=e,S=0,T=u+E*d}else{let E=(b-n-r)/n,R=E*Math.PI/2;v=h+e*Math.sin(R),M=e*Math.cos(R),S=e*Math.sin(R),T=u+d+E*u}let A=Math.max(0,Math.min(1,T/f)),x=0;b===0?x=.5/i:b===p&&(x=-.5/i);for(let E=0;E<=i;E++){let R=E/i,I=R*Math.PI*2,D=Math.sin(I),O=Math.cos(I);g.x=-M*O,g.y=v,g.z=M*D,a.push(g.x,g.y,g.z),m.set(-M*O,S,M*D),m.normalize(),c.push(m.x,m.y,m.z),l.push(R+x,A)}if(b>0){let E=(b-1)*_;for(let R=0;R<i;R++){let I=E+R,D=E+R+1,O=b*_+R,L=b*_+R+1;o.push(I,D,O),o.push(D,L,O)}}}this.setIndex(o),this.setAttribute("position",new qe(a,3)),this.setAttribute("normal",new qe(c,3)),this.setAttribute("uv",new qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},$s=class s extends rt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new P,h=new re;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qe(o,3)),this.setAttribute("normal",new qe(a,3)),this.setAttribute("uv",new qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Yt=class s extends rt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,_=[],m=n/2,g=0;b(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new qe(u,3)),this.setAttribute("normal",new qe(d,3)),this.setAttribute("uv",new qe(f,2));function b(){let v=new P,M=new P,S=0,A=(t-e)/n;for(let x=0;x<=r;x++){let E=[],R=x/r,I=R*(t-e)+e;for(let D=0;D<=i;D++){let O=D/i,L=O*c+a,V=Math.sin(L),Y=Math.cos(L);M.x=I*V,M.y=-R*n+m,M.z=I*Y,u.push(M.x,M.y,M.z),v.set(V,A,Y).normalize(),d.push(v.x,v.y,v.z),f.push(O,1-R),E.push(p++)}_.push(E)}for(let x=0;x<i;x++)for(let E=0;E<r;E++){let R=_[E][x],I=_[E+1][x],D=_[E+1][x+1],O=_[E][x+1];(e>0||E!==0)&&(h.push(R,I,O),S+=3),(t>0||E!==r-1)&&(h.push(I,D,O),S+=3)}l.addGroup(g,S,0),g+=S}function T(v){let M=p,S=new re,A=new P,x=0,E=v===!0?e:t,R=v===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,m*R,0),d.push(0,R,0),f.push(.5,.5),p++;let I=p;for(let D=0;D<=i;D++){let L=D/i*c+a,V=Math.cos(L),Y=Math.sin(L);A.x=E*Y,A.y=m*R,A.z=E*V,u.push(A.x,A.y,A.z),d.push(0,R,0),S.x=V*.5+.5,S.y=Y*.5*R+.5,f.push(S.x,S.y),p++}for(let D=0;D<i;D++){let O=M+D,L=I+D;v===!0?h.push(L,L+1,O):h.push(L+1,L,O),x+=3}l.addGroup(g,x,v===!0?1:2),g+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ls=class s extends Yt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new re:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,i=[],r=[],o=[],a=new P,c=new De;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Xe(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Xe(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Qs=class extends Mn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new re){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},il=class extends Qs{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Wh(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Ld=new P,Dd=new P,sh=new Wh,rh=new Wh,oh=new Wh,er=class extends Mn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(Dd.subVectors(i[0],i[1]).add(i[0]),l=Dd);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Ld.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ld),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),sh.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,_,m),rh.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,_,m),oh.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(sh.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),rh.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),oh.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(sh.calc(c),rh.calc(c),oh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Nd(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function bm(s,e){let t=1-s;return t*t*e}function wm(s,e){return 2*(1-s)*s*e}function Tm(s,e){return s*s*e}function Xr(s,e,t,n){return bm(s,e)+wm(s,t)+Tm(s,n)}function Em(s,e){let t=1-s;return t*t*t*e}function Am(s,e){let t=1-s;return 3*t*t*s*e}function Rm(s,e){return 3*(1-s)*s*s*e}function Cm(s,e){return s*s*s*e}function qr(s,e,t,n,i){return Em(s,e)+Am(s,t)+Rm(s,n)+Cm(s,i)}var oo=class extends Mn{constructor(e=new re,t=new re,n=new re,i=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new re){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(qr(e,i.x,r.x,o.x,a.x),qr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sl=class extends Mn{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(qr(e,i.x,r.x,o.x,a.x),qr(e,i.y,r.y,o.y,a.y),qr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ao=class extends Mn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rl=class extends Mn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lo=class extends Mn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Xr(e,i.x,r.x,o.x),Xr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},co=class extends Mn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Xr(e,i.x,r.x,o.x),Xr(e,i.y,r.y,o.y),Xr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Nd(a,c.x,l.x,h.x,u.x),Nd(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new re().fromArray(i))}return this}},mh=Object.freeze({__proto__:null,ArcCurve:il,CatmullRomCurve3:er,CubicBezierCurve:oo,CubicBezierCurve3:sl,EllipseCurve:Qs,LineCurve:ao,LineCurve3:rl,QuadraticBezierCurve:lo,QuadraticBezierCurve3:co,SplineCurve:ho}),ol=class extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new mh[i.type]().fromJSON(i))}return this}},uo=class extends ol{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ao(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new lo(this.currentPoint.clone(),new re(e,t),new re(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new oo(this.currentPoint.clone(),new re(e,t),new re(n,i),new re(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ho(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,o,a,c),this}absellipse(e,t,n,i,r,o,a,c){let l=new Qs(e,t,n,i,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ii=class extends uo{constructor(e){super(e),this.uuid=Cn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new uo().fromJSON(i))}return this}};function Pm(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Cf(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Um(s,e,r,t)),s.length>80*t){a=s[0],c=s[1];let h=a,u=c;for(let d=t;d<i;d+=t){let f=s[d],p=s[d+1];f<a&&(a=f),p<c&&(c=p),f>h&&(h=f),p>u&&(u=p)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return fo(r,o,t,a,c,l,0),o}function Cf(s,e,t,n,i){let r;if(i===qm(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Ud(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Ud(o/n|0,s[o],s[o+1],r);return r&&tr(r,r.next)&&(mo(r),r=r.next),r}function cs(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(tr(t,t.next)||wt(t.prev,t,t.next)===0)){if(mo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&km(s,n,i,r);let a=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?Lm(s,n,i,r):Im(s)){e.push(c.i,s.i,l.i),mo(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=Dm(cs(s),e),fo(s,e,t,n,i,r,2)):o===2&&Nm(s,e,t,n,i,r):fo(cs(s),e,t,n,i,r,1);break}}}function Im(s){let e=s.prev,t=s,n=s.next;if(wt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(i,r,o),u=Math.min(a,c,l),d=Math.max(i,r,o),f=Math.max(a,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Vr(i,a,r,c,o,l,p.x,p.y)&&wt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Lm(s,e,t,n){let i=s.prev,r=s,o=s.next;if(wt(i,r,o)>=0)return!1;let a=i.x,c=r.x,l=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,c,l),p=Math.min(h,u,d),_=Math.max(a,c,l),m=Math.max(h,u,d),g=gh(f,p,e,t,n),b=gh(_,m,e,t,n),T=s.prevZ,v=s.nextZ;for(;T&&T.z>=g&&v&&v.z<=b;){if(T.x>=f&&T.x<=_&&T.y>=p&&T.y<=m&&T!==i&&T!==o&&Vr(a,h,c,u,l,d,T.x,T.y)&&wt(T.prev,T,T.next)>=0||(T=T.prevZ,v.x>=f&&v.x<=_&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&Vr(a,h,c,u,l,d,v.x,v.y)&&wt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;T&&T.z>=g;){if(T.x>=f&&T.x<=_&&T.y>=p&&T.y<=m&&T!==i&&T!==o&&Vr(a,h,c,u,l,d,T.x,T.y)&&wt(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&Vr(a,h,c,u,l,d,v.x,v.y)&&wt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Dm(s,e){let t=s;do{let n=t.prev,i=t.next.next;!tr(n,i)&&If(n,t,t.next,i)&&po(n,i)&&po(i,n)&&(e.push(n.i,t.i,i.i),mo(t),mo(t.next),t=s=i),t=t.next}while(t!==s);return cs(t)}function Nm(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Gm(o,a)){let c=Lf(o,a);o=cs(o,o.next),c=cs(c,c.next),fo(o,e,t,n,i,r,0),fo(c,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Um(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,c=r<o-1?e[r+1]*n:s.length,l=Cf(s,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Vm(l))}i.sort(Fm);for(let r=0;r<i.length;r++)t=Om(i[r],t);return t}function Fm(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Om(s,e){let t=Bm(s,e);if(!t)return e;let n=Lf(t,s);return cs(n,n.next),cs(t,t.next)}function Bm(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(tr(s,t))return t;do{if(tr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Pf(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);po(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&zm(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function zm(s,e){return wt(s.prev,s,e.prev)<0&&wt(e.next,s,s.next)<0}function km(s,e,t,n){let i=s;do i.z===0&&(i.z=gh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Hm(i)}function Hm(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function gh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Vm(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Pf(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Vr(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Pf(s,e,t,n,i,r,o,a)}function Gm(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Wm(s,e)&&(po(s,e)&&po(e,s)&&Xm(s,e)&&(wt(s.prev,s,e.prev)||wt(s,e.prev,e))||tr(s,e)&&wt(s.prev,s,s.next)>0&&wt(e.prev,e,e.next)>0)}function wt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function tr(s,e){return s.x===e.x&&s.y===e.y}function If(s,e,t,n){let i=Ba(wt(s,e,t)),r=Ba(wt(s,e,n)),o=Ba(wt(t,n,s)),a=Ba(wt(t,n,e));return!!(i!==r&&o!==a||i===0&&Oa(s,t,e)||r===0&&Oa(s,n,e)||o===0&&Oa(t,s,n)||a===0&&Oa(t,e,n))}function Oa(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ba(s){return s>0?1:s<0?-1:0}function Wm(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&If(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function po(s,e){return wt(s.prev,s,s.next)<0?wt(s,e,s.next)>=0&&wt(s,s.prev,e)>=0:wt(s,e,s.prev)<0||wt(s,s.next,e)<0}function Xm(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Lf(s,e){let t=xh(s.i,s.x,s.y),n=xh(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ud(s,e,t,n){let i=xh(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function xh(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function qm(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var _h=class{static triangulate(e,t,n=2){return Pm(e,t,n)}},Bs=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Fd(e),Od(n,e);let o=e.length;t.forEach(Fd);for(let c=0;c<t.length;c++)i.push(o),o+=t[c].length,Od(n,t[c]);let a=_h.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Fd(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Od(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var go=class s extends rt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],p=[],_=[],m=[];for(let g=0;g<h;g++){let b=g*d-o;for(let T=0;T<l;T++){let v=T*u-r;p.push(v,-b,0),_.push(0,0,1),m.push(T/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let b=0;b<a;b++){let T=b+l*g,v=b+l*(g+1),M=b+1+l*(g+1),S=b+1+l*g;f.push(T,v,S),f.push(v,M,S)}this.setIndex(f),this.setAttribute("position",new qe(p,3)),this.setAttribute("normal",new qe(_,3)),this.setAttribute("uv",new qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var Si=class s extends rt{constructor(e=new ii([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new qe(i,3)),this.setAttribute("normal",new qe(r,3)),this.setAttribute("uv",new qe(o,2));function l(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,p=d.holes;Bs.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=p.length;m<g;m++){let b=p[m];Bs.isClockWise(b)===!0&&(p[m]=b.reverse())}let _=Bs.triangulateShape(f,p);for(let m=0,g=p.length;m<g;m++){let b=p[m];f=f.concat(b)}for(let m=0,g=f.length;m<g;m++){let b=f[m];i.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,g=_.length;m<g;m++){let b=_[m],T=b[0]+u,v=b[1]+u,M=b[2]+u;n.push(T,v,M),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ym(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function Ym(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var xo=class s extends rt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new P,d=new P,f=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){let b=[],T=g/n,v=o+T*a,M=e*Math.cos(v),S=Math.sqrt(e*e-M*M),A=0;g===0&&o===0?A=.5/t:g===n&&c===Math.PI&&(A=-.5/t);for(let x=0;x<=t;x++){let E=x/t,R=i+E*r;u.x=-S*Math.cos(R),u.y=M,u.z=S*Math.sin(R),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(E+A,1-T),b.push(l++)}h.push(b)}for(let g=0;g<n;g++)for(let b=0;b<t;b++){let T=h[g][b+1],v=h[g][b],M=h[g+1][b],S=h[g+1][b+1];(g!==0||o>0)&&f.push(T,v,S),(g!==n-1||c<Math.PI)&&f.push(v,M,S)}this.setIndex(f),this.setAttribute("position",new qe(p,3)),this.setAttribute("normal",new qe(_,3)),this.setAttribute("uv",new qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var an=class s extends rt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],u=[],d=new P,f=new P,p=new P;for(let _=0;_<=n;_++){let m=o+_/n*a;for(let g=0;g<=i;g++){let b=g/i*r;f.x=(e+t*Math.cos(m))*Math.cos(b),f.y=(e+t*Math.cos(m))*Math.sin(b),f.z=t*Math.sin(m),l.push(f.x,f.y,f.z),d.x=e*Math.cos(b),d.y=e*Math.sin(b),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/i),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=i;m++){let g=(i+1)*_+m-1,b=(i+1)*(_-1)+m-1,T=(i+1)*(_-1)+m,v=(i+1)*_+m;c.push(g,b,v),c.push(b,T,v)}this.setIndex(c),this.setAttribute("position",new qe(l,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var _o=class s extends rt{constructor(e=new co(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new P,c=new P,l=new re,h=new P,u=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new qe(u,3)),this.setAttribute("normal",new qe(d,3)),this.setAttribute("uv",new qe(f,2));function _(){for(let T=0;T<t;T++)m(T);m(r===!1?t:0),b(),g()}function m(T){h=e.getPointAt(T/t,h);let v=o.normals[T],M=o.binormals[T];for(let S=0;S<=i;S++){let A=S/i*Math.PI*2,x=Math.sin(A),E=-Math.cos(A);c.x=E*v.x+x*M.x,c.y=E*v.y+x*M.y,c.z=E*v.z+x*M.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function g(){for(let T=1;T<=t;T++)for(let v=1;v<=i;v++){let M=(i+1)*(T-1)+(v-1),S=(i+1)*T+(v-1),A=(i+1)*T+v,x=(i+1)*(T-1)+v;p.push(M,S,x),p.push(S,A,x)}}function b(){for(let T=0;T<=t;T++)for(let v=0;v<=i;v++)l.x=T/t,l.y=v/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new mh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function xs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(Bd(i))i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Bd(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function tn(s){let e={};for(let t=0;t<s.length;t++){let n=xs(s[t]);for(let i in n)e[i]=n[i]}return e}function Bd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Zm(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Xh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}var pn={clone:xs,merge:tn},Km=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,St=class extends on{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Km,this.fragmentShader=Jm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xs(e.uniforms),this.uniformsGroups=Zm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Ie().setHex(i.value);break;case"v2":this.uniforms[n].value=new re().fromArray(i.value);break;case"v3":this.uniforms[n].value=new P().fromArray(i.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Fe().fromArray(i.value);break;case"m4":this.uniforms[n].value=new De().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},nr=class extends St{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ln=class extends on{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dn=class extends ln{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var vo=class extends on{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};var al=class extends on{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ll=class extends on{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zi(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Ga(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function jm(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function $m(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var si=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},cl=class extends si{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:uh,endingEnd:uh}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case dh:r=e,a=2*t-n;break;case fh:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case dh:o=e,c=2*n-t;break;case fh:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,m=_*p,g=-d*m+2*d*_-d*p,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*p+1,T=(-1-f)*m+(1.5+f)*_+.5*p,v=f*m-f*_;for(let M=0;M!==a;++M)r[M]=g*o[h+M]+b*o[l+M]+T*o[c+M]+v*o[u+M];return r}},hl=class extends si{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},ul=class extends si{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},dl=class extends si{interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),_=1-p;for(let m=0;m!==a;++m)r[m]=o[l+m]*_+o[c+m]*p;return r}let d=a*2,f=e-1;for(let p=0;p!==a;++p){let _=o[l+p],m=o[c+p],g=f*d+p*2,b=u[g],T=u[g+1],v=e*d+p*2,M=h[v],S=h[v+1],A=eg(n,t,b,M,i);r[p]=Df(A,_,T,S,m)}return r}};function Df(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function Qm(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function eg(s,e,t,n,i){let r=(s-e)/(i-e);for(let o=0;o<8;o++){let a=Df(r,e,t,n,i)-s;if(Math.abs(a)<1e-10)break;let c=Qm(r,e,t,n,i);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var fn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zi(t,this.TimeBufferType),this.values=zi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zi(e.times,Array),values:zi(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Ga(e.settings)&&(n.settings={inTangents:zi(e.settings.inTangents,Array),outTangents:zi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ul(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new dl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case is:t=this.InterpolantFactoryMethodDiscrete;break;case ss:t=this.InterpolantFactoryMethodLinear;break;case Ha:t=this.InterpolantFactoryMethodSmooth;break;case hh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return is;case this.InterpolantFactoryMethodLinear:return ss;case this.InterpolantFactoryMethodSmooth:return Ha;case this.InterpolantFactoryMethodBezier:return hh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Ga(this.settings)&&(kd(this.settings.inTangents,e),kd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ne("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Ne("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ne("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ne("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&zp(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){Ne("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ha,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Ga(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function kd(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=ss;var bi=class extends fn{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=is;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends fn{constructor(e,t,n,i){super(e,t,n,i)}};yo.prototype.ValueTypeName="color";var wi=class extends fn{constructor(e,t,n,i){super(e,t,n,i)}};wi.prototype.ValueTypeName="number";var fl=class extends si{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)vn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ti=class extends fn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new fl(this.times,this.values,this.getValueSize(),e)}};Ti.prototype.ValueTypeName="quaternion";Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends fn{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="string";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=is;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends fn{constructor(e,t,n,i){super(e,t,n,i)}};Vi.prototype.ValueTypeName="vector";var Mo=class{constructor(e="",t=-1,n=[],i=pf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Cn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ng(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(fn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=jm(c);c=zd(c,1,h),l=zd(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new wi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function tg(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wi;case"vector":case"vector2":case"vector3":case"vector4":return Vi;case"color":return yo;case"quaternion":return Ti;case"bool":case"boolean":return bi;case"string":return Ei}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function ng(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=tg(s.type);if(s.times===void 0){let n=[],i=[];$m(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Ga(s.settings)&&(t.settings={inTangents:zi(s.settings.inTangents,Float32Array),outTangents:zi(s.settings.outTangents,Float32Array)}),t}var jn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Hd(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Hd(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Hd(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var pl=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Nf=new pl,ri=class{constructor(e){this.manager=e!==void 0?e:Nf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ri.DEFAULT_MATERIAL_NAME="__DEFAULT";var vi={},vh=class extends Error{constructor(e,t){super(e),this.response=t}},ir=class extends ri{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=jn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:i});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=vi[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,_=0,m=new ReadableStream({start(g){b();function b(){u.read().then(({done:T,value:v})=>{if(T)g.close();else{_+=v.byteLength;let M=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let S=0,A=h.length;S<A;S++){let x=h[S];x.onProgress&&x.onProgress(M)}g.enqueue(v),b()}},T=>{g.error(T)})}}});return new Response(m)}else throw new vh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{jn.add(`file:${e}`,l);let h=vi[e];delete vi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=vi[e];if(h===void 0)throw this.manager.itemError(e),l;delete vi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ns=new WeakMap,ml=class extends ri{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=jn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Ns.get(o);u===void 0&&(u=[],Ns.set(o,u)),u.push({onLoad:t,onError:i})}return o}let a=Vs("img");function c(){h(),t&&t(this);let u=Ns.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Ns.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),jn.remove(`image:${e}`);let d=Ns.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}Ns.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),jn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var So=class extends ri{constructor(e){super(e)}load(e,t,n,i){let r=new qt,o=new ml(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Gi=class extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},bo=class extends Gi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ah=new De,Vd=new P,Gd=new P,sr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Js,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Vd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vd),Gd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){ah.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ah,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,c=i?i.x/r.x:0,l=i?i.y/r.y:0;e.coordinateSystem===Hs||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(ah)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},za=new P,ka=new vn,Jn=new P,wo=class extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(za,ka,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(za,ka,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(za,ka,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(za,ka,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bi=new P,Wd=new re,Xd=new re,Bt=class extends wo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,Wd,Xd),t.subVectors(Xd,Wd)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Gr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},yh=class extends sr{constructor(){super(new Bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=rs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},To=class extends Gi{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new yh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Mh=class extends sr{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0}},hs=class extends Gi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Mh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},oi=class extends wo{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Sh=class extends sr{constructor(){super(new oi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},us=class extends Gi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Sh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Eo=class extends Gi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ai=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var lh=new WeakMap,Ao=class extends ri{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=jn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{lh.has(o)===!0?(i&&i(lh.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return jn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),lh.set(c,l),jn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});jn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Us=-90,Fs=1,rr=class extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Bt(Us,Fs,e,t);i.layers=this.layers,this.add(i);let r=new Bt(Us,Fs,e,t);r.layers=this.layers,this.add(r);let o=new Bt(Us,Fs,e,t);o.layers=this.layers,this.add(o);let a=new Bt(Us,Fs,e,t);a.layers=this.layers,this.add(a);let c=new Bt(Us,Fs,e,t);c.layers=this.layers,this.add(c);let l=new Bt(Us,Fs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},gl=class extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ro=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=ig.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function ig(){this._document.hidden===!1&&this.reset()}var qh="\\[\\]\\.:\\/",sg=new RegExp("["+qh+"]","g"),Yh="[^"+qh+"]",rg="[^"+qh.replace("\\.","")+"]",og=/((?:WC+[\/:])*)/.source.replace("WC",Yh),ag=/(WCOD+)?/.source.replace("WCOD",rg),lg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Yh),cg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Yh),hg=new RegExp("^"+og+ag+lg+cg+"$"),ug=["material","materials","bones","map"],bh=class{constructor(e,t,n){let i=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(sg,"")}static parseTrackName(e){let t=hg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);ug.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;Ne("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=bh;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ay=new Float32Array(1);var qd=new De,Co=class{constructor(e,t,n=0,i=1/0){this.ray=new Hi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Xs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ne("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return qd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(qd),this}intersectObject(e,t=!0,n=[]){return wh(e,this,n,t),n.sort(Yd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)wh(e[i],this,n,t);return n.sort(Yd),n}};function Yd(s,e){return s.distance-e.distance}function wh(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)wh(r[o],e,t,!0)}}var Th=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};function Zh(s,e,t,n){let i=dg(n);switch(t){case Bh:return s*e;case Tl:return s*e/i.components*i.byteLength;case El:return s*e/i.components*i.byteLength;case qi:return s*e*2/i.components*i.byteLength;case Al:return s*e*2/i.components*i.byteLength;case zh:return s*e*3/i.components*i.byteLength;case cn:return s*e*4/i.components*i.byteLength;case Rl:return s*e*4/i.components*i.byteLength;case ko:case Ho:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Vo:case Go:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Pl:case Ll:return Math.max(s,16)*Math.max(e,8)/4;case Cl:case Il:return Math.max(s,8)*Math.max(e,8)/2;case Dl:case Nl:case Fl:case Ol:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ul:case Wo:case Bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Hl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Wl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ql:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Kl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Jl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case jl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case $l:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ql:case ec:case tc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case nc:case ic:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Xo:case sc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dg(s){switch(s){case en:case Nh:return{byteLength:1,components:1};case cr:case Uh:case kt:return{byteLength:2,components:1};case bl:case wl:return{byteLength:2,components:4};case Wn:case Sl:case Sn:return{byteLength:4,components:1};case Fh:case Oh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function np(){let s=null,e=!1,t=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),t(r,o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function pg(s){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(s.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}var mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_g=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,wg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ag=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ug=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Fg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Og=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Bg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",qg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Zg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$g=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,e0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,t0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,i0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,a0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,l0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,f0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,p0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,m0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,g0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,x0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,_0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,S0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,b0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,T0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,A0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,R0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,P0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,L0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,N0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,U0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,B0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,z0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,k0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,H0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,V0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,G0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,W0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,X0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,q0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,j0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Q0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ex=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ix=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ox=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ax=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,px=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,mx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_x=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ex=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Px=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Nx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ux=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Fx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ox=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:mg,alphahash_pars_fragment:gg,alphamap_fragment:xg,alphamap_pars_fragment:_g,alphatest_fragment:vg,alphatest_pars_fragment:yg,aomap_fragment:Mg,aomap_pars_fragment:Sg,batching_pars_vertex:bg,batching_vertex:wg,begin_vertex:Tg,beginnormal_vertex:Eg,bsdfs:Ag,iridescence_fragment:Rg,bumpmap_pars_fragment:Cg,clipping_planes_fragment:Pg,clipping_planes_pars_fragment:Ig,clipping_planes_pars_vertex:Lg,clipping_planes_vertex:Dg,color_fragment:Ng,color_pars_fragment:Ug,color_pars_vertex:Fg,color_vertex:Og,common:Bg,cube_uv_reflection_fragment:zg,defaultnormal_vertex:kg,displacementmap_pars_vertex:Hg,displacementmap_vertex:Vg,emissivemap_fragment:Gg,emissivemap_pars_fragment:Wg,colorspace_fragment:Xg,colorspace_pars_fragment:qg,envmap_fragment:Yg,envmap_common_pars_fragment:Zg,envmap_pars_fragment:Kg,envmap_pars_vertex:Jg,envmap_physical_pars_fragment:a0,envmap_vertex:jg,fog_vertex:$g,fog_pars_vertex:Qg,fog_fragment:e0,fog_pars_fragment:t0,gradientmap_pars_fragment:n0,lightmap_pars_fragment:i0,lights_lambert_fragment:s0,lights_lambert_pars_fragment:r0,lights_pars_begin:o0,lights_toon_fragment:l0,lights_toon_pars_fragment:c0,lights_phong_fragment:h0,lights_phong_pars_fragment:u0,lights_physical_fragment:d0,lights_physical_pars_fragment:f0,lights_fragment_begin:p0,lights_fragment_maps:m0,lights_fragment_end:g0,lightprobes_pars_fragment:x0,logdepthbuf_fragment:_0,logdepthbuf_pars_fragment:v0,logdepthbuf_pars_vertex:y0,logdepthbuf_vertex:M0,map_fragment:S0,map_pars_fragment:b0,map_particle_fragment:w0,map_particle_pars_fragment:T0,metalnessmap_fragment:E0,metalnessmap_pars_fragment:A0,morphinstance_vertex:R0,morphcolor_vertex:C0,morphnormal_vertex:P0,morphtarget_pars_vertex:I0,morphtarget_vertex:L0,normal_fragment_begin:D0,normal_fragment_maps:N0,normal_pars_fragment:U0,normal_pars_vertex:F0,normal_vertex:O0,normalmap_pars_fragment:B0,clearcoat_normal_fragment_begin:z0,clearcoat_normal_fragment_maps:k0,clearcoat_pars_fragment:H0,iridescence_pars_fragment:V0,opaque_fragment:G0,packing:W0,premultiplied_alpha_fragment:X0,project_vertex:q0,dithering_fragment:Y0,dithering_pars_fragment:Z0,roughnessmap_fragment:K0,roughnessmap_pars_fragment:J0,shadowmap_pars_fragment:j0,shadowmap_pars_vertex:$0,shadowmap_vertex:Q0,shadowmask_pars_fragment:ex,skinbase_vertex:tx,skinning_pars_vertex:nx,skinning_vertex:ix,skinnormal_vertex:sx,specularmap_fragment:rx,specularmap_pars_fragment:ox,tonemapping_fragment:ax,tonemapping_pars_fragment:lx,transmission_fragment:cx,transmission_pars_fragment:hx,uv_pars_fragment:ux,uv_pars_vertex:dx,uv_vertex:fx,worldpos_vertex:px,background_vert:mx,background_frag:gx,backgroundCube_vert:xx,backgroundCube_frag:_x,cube_vert:vx,cube_frag:yx,depth_vert:Mx,depth_frag:Sx,distance_vert:bx,distance_frag:wx,equirect_vert:Tx,equirect_frag:Ex,linedashed_vert:Ax,linedashed_frag:Rx,meshbasic_vert:Cx,meshbasic_frag:Px,meshlambert_vert:Ix,meshlambert_frag:Lx,meshmatcap_vert:Dx,meshmatcap_frag:Nx,meshnormal_vert:Ux,meshnormal_frag:Fx,meshphong_vert:Ox,meshphong_frag:Bx,meshphysical_vert:zx,meshphysical_frag:kx,meshtoon_vert:Hx,meshtoon_frag:Vx,points_vert:Gx,points_frag:Wx,shadow_vert:Xx,shadow_frag:qx,sprite_vert:Yx,sprite_frag:Zx},ue={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},ci={basic:{uniforms:tn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:tn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:tn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:tn([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:tn([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:tn([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:tn([ue.points,ue.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:tn([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:tn([ue.common,ue.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:tn([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:tn([ue.sprite,ue.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:tn([ue.common,ue.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:tn([ue.lights,ue.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ci.physical={uniforms:tn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var ac={r:0,b:0,g:0},Kx=new De,ip=new Fe;ip.set(-1,0,0,0,1,0,0,0,1);function Jx(s,e,t,n,i,r){let o=new Ie(0),a=i===!0?0:1,c,l,h=null,u=0,d=null;function f(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){let v=b.backgroundBlurriness>0;T=e.get(T,v)}return T}function p(b){let T=!1,v=f(b);v===null?m(o,a):v&&v.isColor&&(m(v,1),T=!0);let M=s.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(b,T){let v=f(T);v&&(v.isCubeTexture||v.mapping===zo)?(l===void 0&&(l=new je(new dt(1,1,1),new St({name:"BackgroundCubeMaterial",uniforms:xs(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Kx.makeRotationFromEuler(T.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ip),l.material.toneMapped=ze.getTransfer(v.colorSpace)!==et,(h!==v||u!==v.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new je(new go(2,2),new St({name:"BackgroundMaterial",uniforms:xs(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=ze.getTransfer(v.colorSpace)!==et,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,T){b.getRGB(ac,Xh(s)),t.buffers.color.setClear(ac.r,ac.g,ac.b,T,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,T=1){o.set(b),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,m(o,a)},render:p,addToRenderList:_,dispose:g}}function jx(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(I,D,O,L,V){let Y=!1,Z=u(I,L,O,D);r!==Z&&(r=Z,l(r.object)),Y=f(I,L,O,V),Y&&p(I,L,O,V),V!==null&&e.update(V,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(I,D,O,L),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return s.createVertexArray()}function l(I){return s.bindVertexArray(I)}function h(I){return s.deleteVertexArray(I)}function u(I,D,O,L){let V=L.wireframe===!0,Y=n[D.id];Y===void 0&&(Y={},n[D.id]=Y);let Z=I.isInstancedMesh===!0?I.id:0,te=Y[Z];te===void 0&&(te={},Y[Z]=te);let G=te[O.id];G===void 0&&(G={},te[O.id]=G);let $=G[V];return $===void 0&&($=d(c()),G[V]=$),$}function d(I){let D=[],O=[],L=[];for(let V=0;V<t;V++)D[V]=0,O[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:L,object:I,attributes:{},index:null}}function f(I,D,O,L){let V=r.attributes,Y=D.attributes,Z=0,te=O.getAttributes();for(let G in te)if(te[G].location>=0){let ee=V[G],Se=Y[G];if(Se===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&(Se=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&(Se=I.instanceColor)),ee===void 0||ee.attribute!==Se||Se&&ee.data!==Se.data)return!0;Z++}return r.attributesNum!==Z||r.index!==L}function p(I,D,O,L){let V={},Y=D.attributes,Z=0,te=O.getAttributes();for(let G in te)if(te[G].location>=0){let ee=Y[G];ee===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor));let Se={};Se.attribute=ee,ee&&ee.data&&(Se.data=ee.data),V[G]=Se,Z++}r.attributes=V,r.attributesNum=Z,r.index=L}function _(){let I=r.newAttributes;for(let D=0,O=I.length;D<O;D++)I[D]=0}function m(I){g(I,0)}function g(I,D){let O=r.newAttributes,L=r.enabledAttributes,V=r.attributeDivisors;O[I]=1,L[I]===0&&(s.enableVertexAttribArray(I),L[I]=1),V[I]!==D&&(s.vertexAttribDivisor(I,D),V[I]=D)}function b(){let I=r.newAttributes,D=r.enabledAttributes;for(let O=0,L=D.length;O<L;O++)D[O]!==I[O]&&(s.disableVertexAttribArray(O),D[O]=0)}function T(I,D,O,L,V,Y,Z){Z===!0?s.vertexAttribIPointer(I,D,O,V,Y):s.vertexAttribPointer(I,D,O,L,V,Y)}function v(I,D,O,L){_();let V=L.attributes,Y=O.getAttributes(),Z=D.defaultAttributeValues;for(let te in Y){let G=Y[te];if(G.location>=0){let $=V[te];if($===void 0&&(te==="instanceMatrix"&&I.instanceMatrix&&($=I.instanceMatrix),te==="instanceColor"&&I.instanceColor&&($=I.instanceColor)),$!==void 0){let ee=$.normalized,Se=$.itemSize,be=e.get($);if(be===void 0)continue;let tt=be.buffer,We=be.type,Ke=be.bytesPerElement,X=We===s.INT||We===s.UNSIGNED_INT||$.gpuType===Sl;if($.isInterleavedBufferAttribute){let J=$.data,fe=J.stride,Le=$.offset;if(J.isInstancedInterleavedBuffer){for(let ge=0;ge<G.locationSize;ge++)g(G.location+ge,J.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ge=0;ge<G.locationSize;ge++)m(G.location+ge);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let ge=0;ge<G.locationSize;ge++)T(G.location+ge,Se/G.locationSize,We,ee,fe*Ke,(Le+Se/G.locationSize*ge)*Ke,X)}else{if($.isInstancedBufferAttribute){for(let J=0;J<G.locationSize;J++)g(G.location+J,$.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let J=0;J<G.locationSize;J++)m(G.location+J);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let J=0;J<G.locationSize;J++)T(G.location+J,Se/G.locationSize,We,ee,Se*Ke,Se/G.locationSize*J*Ke,X)}}else if(Z!==void 0){let ee=Z[te];if(ee!==void 0)switch(ee.length){case 2:s.vertexAttrib2fv(G.location,ee);break;case 3:s.vertexAttrib3fv(G.location,ee);break;case 4:s.vertexAttrib4fv(G.location,ee);break;default:s.vertexAttrib1fv(G.location,ee)}}}}b()}function M(){E();for(let I in n){let D=n[I];for(let O in D){let L=D[O];for(let V in L){let Y=L[V];for(let Z in Y)h(Y[Z].object),delete Y[Z];delete L[V]}}delete n[I]}}function S(I){if(n[I.id]===void 0)return;let D=n[I.id];for(let O in D){let L=D[O];for(let V in L){let Y=L[V];for(let Z in Y)h(Y[Z].object),delete Y[Z];delete L[V]}}delete n[I.id]}function A(I){for(let D in n){let O=n[D];for(let L in O){let V=O[L];if(V[I.id]===void 0)continue;let Y=V[I.id];for(let Z in Y)h(Y[Z].object),delete Y[Z];delete V[I.id]}}}function x(I){for(let D in n){let O=n[D],L=I.isInstancedMesh===!0?I.id:0,V=O[L];if(V!==void 0){for(let Y in V){let Z=V[Y];for(let te in Z)h(Z[te].object),delete Z[te];delete V[Y]}delete O[L],Object.keys(O).length===0&&delete n[D]}}}function E(){R(),o=!0,r!==i&&(r=i,l(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:E,resetDefaultState:R,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function $x(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Qx(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==cn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let x=A===kt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==en&&A!==Sn&&!x&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ae("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:v,maxSamples:M,samples:S}}function e_(s){let e=this,t=null,n=0,i=!1,r=!1,o=new On,a=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,g=s.get(u);if(!i||p===null||p.length===0||r&&!m)r?h(null):l();else{let b=r?0:n,T=b*4,v=g.clippingState||null;c.value=v,v=h(p,d,T,f);for(let M=0;M!==T;++M)v[M]=t[M];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,p!==!0||m===null){let g=f+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<g)&&(m=new Float32Array(g));for(let T=0,v=f;T!==_;++T,v+=4)o.copy(u[T]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var dr=4,t_=6,n_=20,i_=256,Zo=new oi,Uf=new Ie,Kh=null,Jh=0,jh=0,$h=!1,s_=new P,_s=new P,pr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=s_}=r;Kh=this._renderer.getRenderTarget(),Jh=this._renderer.getActiveCubeFace(),jh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Of(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kh,Jh,jh),this._renderer.xr.enabled=$h,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kh=this._renderer.getRenderTarget(),Jh=this._renderer.getActiveCubeFace(),jh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:kt,format:cn,colorSpace:rn,depthBuffer:!1},i=Ff(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ff(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=r_(r)),this._blurMaterial=a_(r,e,t),this._ggxMaterial=o_(r,e,t)}return i}_compileMaterial(e){let t=new je(new rt,e);this._renderer.compile(t,Zo)}_sceneToCubeUV(e,t,n,i,r){let c=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Uf),u.toneMapping=Vn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new je(new dt,new yn({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,g=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,g=!0):(m.color.copy(Uf),g=!0);for(let T=0;T<6;T++){let v=T%3;v===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):v===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));let M=this._cubeSize;ur(i,v*M,T>2?M:0,M,M),u.setRenderTarget(i),g&&u.render(_,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Wi||e.mapping===ps;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Of());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;ur(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Zo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,f=u*d,{_lodMax:p}=this,_=this._sizeLods[n],m=3*_*(n>p-dr?n-p+dr:0),g=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=p-t,ur(r,m,g,3*_,2*_),i.setRenderTarget(r),i.render(a,Zo),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,ur(e,m,g,3*_,2*_),i.setRenderTarget(e),i.render(a,Zo)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,i,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[i];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],u=3*h*(i>this._lodMax-dr?i-this._lodMax+dr:0),d=4*(this._cubeSize-h);ur(t,u,d,3*h,2*h),o.setRenderTarget(t),o.render(c,Zo)}};function r_(s){let e=[],t=[],n=s,i=s-dr+1+t_;for(let r=0;r<i;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,d=6,f=3,p=new Float32Array(f*d*u),_=new Float32Array(f*d*u);for(let g=0;g<u;g++){let b=g%3*2/3-1,T=g>2?0:-1,v=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];p.set(v,f*d*g);for(let M=0;M<d;M++){let S=h[M*2]*2-1,A=h[M*2+1]*2-1;g===0?_s.set(1,A,S):g===1?_s.set(-S,1,-A):g===2?_s.set(-S,A,1):g===3?_s.set(-1,A,-S):g===4?_s.set(-S,-1,A):_s.set(S,A,-1),_s.toArray(_,(g*d+M)*f)}}let m=new rt;m.setAttribute("position",new zt(p,f)),m.setAttribute("outputDirection",new zt(_,f)),t.push(new je(m,null)),n>dr&&n--}return{lodMeshes:t,sizeLods:e}}function Ff(s,e,t){let n=new It(s,e,t);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function o_(s,e,t){return new St({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:i_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Lt,depthTest:!1,depthWrite:!1})}function a_(s,e,t){return new St({name:"SphericalGaussianBlur",defines:{SAMPLES:n_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:hc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Lt,depthTest:!1,depthWrite:!1})}function Of(){return new St({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Lt,depthTest:!1,depthWrite:!1})}function Bf(){return new St({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Lt,depthTest:!1,depthWrite:!1})}function hc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var mr=class extends It{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new so(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new dt(5,5,5),r=new St({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:Lt});r.uniforms.tEquirect.value=t;let o=new je(i,r),a=t.minFilter;return t.minFilter===Gn&&(t.minFilter=Pt),new rr(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}};function l_(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===vl||f===yl)if(e.has(d)){let p=e.get(d).texture;return a(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let _=new mr(p.height);return _.fromEquirectangularTexture(s,d),e.set(d,_),d.addEventListener("dispose",l),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,p=f===vl||f===yl,_=f===Wi||f===ps;if(p||_){let m=t.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new pr(s)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let b=d.image;return p&&b&&b.height>0||_&&b&&c(b)?(n===null&&(n=new pr(s)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,f){return f===vl?d.mapping=Wi:f===yl&&(d.mapping=ps),d}function c(d){let f=0,p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function l(d){let f=d.target;f.removeEventListener("dispose",l);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function c_(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ns("WebGLRenderer: "+n+" extension not supported."),i}}}function h_(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,p=u.attributes.position,_=0;if(p===void 0)return;if(f!==null){let b=f.array;_=f.version;for(let T=0,v=b.length;T<v;T+=3){let M=b[T+0],S=b[T+1],A=b[T+2];d.push(M,S,S,A,A,M)}}else{let b=p.array;_=p.version;for(let T=0,v=b.length/3-1;T<v;T+=3){let M=T+0,S=T+1,A=T+2;d.push(M,S,S,A,A,M)}}let m=new(p.count>=65535?jr:Jr)(d,1);m.version=_;let g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function u_(s,e,t){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){s.drawElements(n,d,r,u*o),t.update(d,n,1)}function l(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];t.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function d_(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:Ne("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function f_(s,e,t){let n=new WeakMap,i=new lt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let E=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],T=0;f===!0&&(T=1),p===!0&&(T=2),_===!0&&(T=3);let v=a.attributes.position.count*T,M=1;v>e.maxTextureSize&&(M=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let S=new Float32Array(v*M*4*u),A=new Kr(S,v,M,u);A.type=Sn,A.needsUpdate=!0;let x=T*4;for(let R=0;R<u;R++){let I=m[R],D=g[R],O=b[R],L=v*M*4*R;for(let V=0;V<I.count;V++){let Y=V*x;f===!0&&(i.fromBufferAttribute(I,V),S[L+Y+0]=i.x,S[L+Y+1]=i.y,S[L+Y+2]=i.z,S[L+Y+3]=0),p===!0&&(i.fromBufferAttribute(D,V),S[L+Y+4]=i.x,S[L+Y+5]=i.y,S[L+Y+6]=i.z,S[L+Y+7]=0),_===!0&&(i.fromBufferAttribute(O,V),S[L+Y+8]=i.x,S[L+Y+9]=i.y,S[L+Y+10]=i.z,S[L+Y+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new re(v,M)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let p=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",p),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function p_(s,e,t,n,i){let r=new WeakMap;function o(l){let h=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var m_={[Do]:"LINEAR_TONE_MAPPING",[No]:"REINHARD_TONE_MAPPING",[Uo]:"CINEON_TONE_MAPPING",[Fo]:"ACES_FILMIC_TONE_MAPPING",[fs]:"AGX_TONE_MAPPING",[Bo]:"NEUTRAL_TONE_MAPPING",[Oo]:"CUSTOM_TONE_MAPPING"};function g_(s,e,t,n,i,r){let o=new It(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new rt;l.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new qe([0,2,0,0,2,0],2));let h=new nr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new je(l,h),d=new oi(-1,1,1,-1,0,1),f=null,p=null,_=!1,m,g=null,b=[],T=!1;this.setSize=function(v,M){o.setSize(v,M),a!==null&&a.setSize(v,M),c!==null&&c.setSize(v,M);for(let S=0;S<b.length;S++){let A=b[S];A.setSize&&A.setSize(v,M)}},this.setEffects=function(v){b=v,T=b.length>0&&b[0].isRenderPass===!0;let M=o.width,S=o.height;b.length>0&&a===null&&(a=new It(M,S,{type:kt,depthBuffer:!1,stencilBuffer:!1}),c=new It(M,S,{type:kt,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<b.length;A++){let x=b[A];x.setSize&&x.setSize(M,S)}},this.begin=function(v,M){if(_||v.toneMapping===Vn&&b.length===0)return!1;if(g=M,M!==null){let S=M.width,A=M.height;(o.width!==S||o.height!==A)&&this.setSize(S,A)}return T===!1&&v.setRenderTarget(o),m=v.toneMapping,v.toneMapping=Vn,!0},this.hasRenderPass=function(){return T},this.end=function(v,M){v.toneMapping=m,_=!0;let S=o,A=a;for(let x=0;x<b.length;x++){let E=b[x];E.enabled!==!1&&(E.render(v,A,S,M),E.needsSwap!==!1&&(S=A,A=A===a?c:a))}if(f!==v.outputColorSpace||p!==v.toneMapping){f=v.outputColorSpace,p=v.toneMapping,h.defines={},ze.getTransfer(f)===et&&(h.defines.SRGB_TRANSFER="");let x=m_[p];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(g),v.render(u,d),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var sp=new qt,tu=new ni(1,1),rp=new Kr,op=new Qa,ap=new so,zf=[],kf=[],Hf=new Float32Array(16),Vf=new Float32Array(9),Gf=new Float32Array(4);function gr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=zf[i];if(r===void 0&&(r=new Float32Array(i),zf[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Ht(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Vt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function uc(s,e){let t=kf[e];t===void 0&&(t=new Int32Array(e),kf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function x_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function __(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2fv(this.addr,e),Vt(t,e)}}function v_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;s.uniform3fv(this.addr,e),Vt(t,e)}}function y_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4fv(this.addr,e),Vt(t,e)}}function M_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Gf.set(n),s.uniformMatrix2fv(this.addr,!1,Gf),Vt(t,n)}}function S_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Vf.set(n),s.uniformMatrix3fv(this.addr,!1,Vf),Vt(t,n)}}function b_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Hf.set(n),s.uniformMatrix4fv(this.addr,!1,Hf),Vt(t,n)}}function w_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function T_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2iv(this.addr,e),Vt(t,e)}}function E_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;s.uniform3iv(this.addr,e),Vt(t,e)}}function A_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4iv(this.addr,e),Vt(t,e)}}function R_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function C_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2uiv(this.addr,e),Vt(t,e)}}function P_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;s.uniform3uiv(this.addr,e),Vt(t,e)}}function I_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4uiv(this.addr,e),Vt(t,e)}}function L_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(tu.compareFunction=t.isReversedDepthBuffer()?oc:rc,r=tu):r=sp,t.setTexture2D(e||r,i)}function D_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||op,i)}function N_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ap,i)}function U_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||rp,i)}function F_(s){switch(s){case 5126:return x_;case 35664:return __;case 35665:return v_;case 35666:return y_;case 35674:return M_;case 35675:return S_;case 35676:return b_;case 5124:case 35670:return w_;case 35667:case 35671:return T_;case 35668:case 35672:return E_;case 35669:case 35673:return A_;case 5125:return R_;case 36294:return C_;case 36295:return P_;case 36296:return I_;case 35678:case 36198:case 36298:case 36306:case 35682:return L_;case 35679:case 36299:case 36307:return D_;case 35680:case 36300:case 36308:case 36293:return N_;case 36289:case 36303:case 36311:case 36292:return U_}}function O_(s,e){s.uniform1fv(this.addr,e)}function B_(s,e){let t=gr(e,this.size,2);s.uniform2fv(this.addr,t)}function z_(s,e){let t=gr(e,this.size,3);s.uniform3fv(this.addr,t)}function k_(s,e){let t=gr(e,this.size,4);s.uniform4fv(this.addr,t)}function H_(s,e){let t=gr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function V_(s,e){let t=gr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function G_(s,e){let t=gr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function W_(s,e){s.uniform1iv(this.addr,e)}function X_(s,e){s.uniform2iv(this.addr,e)}function q_(s,e){s.uniform3iv(this.addr,e)}function Y_(s,e){s.uniform4iv(this.addr,e)}function Z_(s,e){s.uniform1uiv(this.addr,e)}function K_(s,e){s.uniform2uiv(this.addr,e)}function J_(s,e){s.uniform3uiv(this.addr,e)}function j_(s,e){s.uniform4uiv(this.addr,e)}function $_(s,e,t){let n=this.cache,i=e.length,r=uc(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=tu:o=sp;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,r[a])}function Q_(s,e,t){let n=this.cache,i=e.length,r=uc(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||op,r[o])}function ev(s,e,t){let n=this.cache,i=e.length,r=uc(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ap,r[o])}function tv(s,e,t){let n=this.cache,i=e.length,r=uc(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||rp,r[o])}function nv(s){switch(s){case 5126:return O_;case 35664:return B_;case 35665:return z_;case 35666:return k_;case 35674:return H_;case 35675:return V_;case 35676:return G_;case 5124:case 35670:return W_;case 35667:case 35671:return X_;case 35668:case 35672:return q_;case 35669:case 35673:return Y_;case 5125:return Z_;case 36294:return K_;case 36295:return J_;case 36296:return j_;case 35678:case 36198:case 36298:case 36306:case 35682:return $_;case 35679:case 36299:case 36307:return Q_;case 35680:case 36300:case 36308:case 36293:return ev;case 36289:case 36303:case 36311:case 36292:return tv}}var nu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=F_(t.type)}},iu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nv(t.type)}},su=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Qh=/(\w+)(\])?(\[|\.)?/g;function Wf(s,e){s.seq.push(e),s.map[e.id]=e}function iv(s,e,t){let n=s.name,i=n.length;for(Qh.lastIndex=0;;){let r=Qh.exec(n),o=Qh.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Wf(t,l===void 0?new nu(a,s,e):new iu(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new su(a),Wf(t,u)),t=u}}}var fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);iv(a,c,this)}let i=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function Xf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var sv=37297,rv=0;function ov(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var qf=new Fe;function av(s){ze._getMatrix(qf,ze.workingColorSpace,s);let e=`mat3( ${qf.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(s)){case Yr:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Yf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+ov(s.getShaderSource(e),a)}else return r}function lv(s,e){let t=av(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var cv={[Do]:"Linear",[No]:"Reinhard",[Uo]:"Cineon",[Fo]:"ACESFilmic",[fs]:"AgX",[Bo]:"Neutral",[Oo]:"Custom"};function hv(s,e){let t=cv[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lc=new P;function uv(){ze.getLuminanceCoefficients(lc);let s=lc.x.toFixed(4),e=lc.y.toFixed(4),t=lc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jo).join(`
`)}function fv(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function pv(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Jo(s){return s!==""}function Zf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var mv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ru(s){return s.replace(mv,xv)}var gv=new Map;function xv(s,e){let t=Ge[e];if(t===void 0){let n=gv.get(e);if(n!==void 0)t=Ge[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ru(t)}var _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jf(s){return s.replace(_v,vv)}function vv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var yv={[Po]:"SHADOWMAP_TYPE_PCF",[or]:"SHADOWMAP_TYPE_VSM"};function Mv(s){return yv[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Sv={[Wi]:"ENVMAP_TYPE_CUBE",[ps]:"ENVMAP_TYPE_CUBE",[zo]:"ENVMAP_TYPE_CUBE_UV"};function bv(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Sv[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var wv={[ps]:"ENVMAP_MODE_REFRACTION"};function Tv(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":wv[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ev={[Lh]:"ENVMAP_BLENDING_MULTIPLY",[uf]:"ENVMAP_BLENDING_MIX",[df]:"ENVMAP_BLENDING_ADD"};function Av(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Ev[s.combine]||"ENVMAP_BLENDING_NONE"}function Rv(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Cv(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Mv(t),l=bv(t),h=Tv(t),u=Av(t),d=Rv(t),f=dv(t),p=fv(r),_=i.createProgram(),m,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Jo).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Jo).join(`
`),g.length>0&&(g+=`
`)):(m=[jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jo).join(`
`),g=[jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Vn?hv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,lv("linearToOutputTexel",t.outputColorSpace),uv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jo).join(`
`)),o=ru(o),o=Zf(o,t),o=Kf(o,t),a=ru(a),a=Zf(a,t),a=Kf(a,t),o=Jf(o),a=Jf(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let T=b+m+o,v=b+g+a,M=Xf(i,i.VERTEX_SHADER,T),S=Xf(i,i.FRAGMENT_SHADER,v);i.attachShader(_,M),i.attachShader(_,S),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(I){if(s.debug.checkShaderErrors){let D=i.getProgramInfoLog(_)||"",O=i.getShaderInfoLog(M)||"",L=i.getShaderInfoLog(S)||"",V=D.trim(),Y=O.trim(),Z=L.trim(),te=!0,G=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(te=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,M,S);else{let $=Yf(i,M,"vertex"),ee=Yf(i,S,"fragment");Ne("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+$+`
`+ee)}else V!==""?Ae("WebGLProgram: Program Info Log:",V):(Y===""||Z==="")&&(G=!1);G&&(I.diagnostics={runnable:te,programLog:V,vertexShader:{log:Y,prefix:m},fragmentShader:{log:Z,prefix:g}})}i.deleteShader(M),i.deleteShader(S),x=new fr(i,_),E=pv(i,_)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(_,sv)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=S,this}var Pv=0,ou=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new au(e),t.set(e,n)),n}},au=class{constructor(e){this.id=Pv++,this.code=e,this.usedTimes=0}};function Iv(s){return s===qi||s===Wo||s===Xo}function Lv(s,e,t,n,i,r){let o=new Xs,a=new ou,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function _(x,E,R,I,D,O){let L=I.fog,V=D.geometry,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,te=e.get(x.envMap||Y,Z),G=te&&te.mapping===zo?te.image.height:null,$=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Ae("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let ee=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Se=ee!==void 0?ee.length:0,be=0;V.morphAttributes.position!==void 0&&(be=1),V.morphAttributes.normal!==void 0&&(be=2),V.morphAttributes.color!==void 0&&(be=3);let tt,We,Ke,X;if($){let xt=ci[$];tt=xt.vertexShader,We=xt.fragmentShader}else{tt=x.vertexShader,We=x.fragmentShader;let xt=a.getVertexShaderStage(x),it=a.getFragmentShaderStage(x);a.update(x,xt,it),Ke=xt.id,X=it.id}let J=s.getRenderTarget(),fe=s.state.buffers.depth.getReversed(),Le=D.isInstancedMesh===!0,ge=D.isBatchedMesh===!0,Oe=!!x.map,bt=!!x.matcap,Be=!!te,Je=!!x.aoMap,nt=!!x.lightMap,He=!!x.bumpMap&&x.wireframe===!1,ht=!!x.normalMap,Tt=!!x.displacementMap,Wt=!!x.emissiveMap,ft=!!x.metalnessMap,yt=!!x.roughnessMap,U=x.anisotropy>0,Ut=x.clearcoat>0,$e=x.dispersion>0,C=x.retroreflectivity>0,y=x.iridescence>0,B=x.sheen>0,H=x.transmission>0,q=U&&!!x.anisotropyMap,ie=Ut&&!!x.clearcoatMap,ae=Ut&&!!x.clearcoatNormalMap,K=Ut&&!!x.clearcoatRoughnessMap,Q=y&&!!x.iridescenceMap,le=y&&!!x.iridescenceThicknessMap,Te=B&&!!x.sheenColorMap,oe=B&&!!x.sheenRoughnessMap,se=!!x.specularMap,ve=!!x.specularColorMap,Ce=!!x.specularIntensityMap,Ue=H&&!!x.transmissionMap,F=H&&!!x.thicknessMap,ce=!!x.gradientMap,j=!!x.alphaMap,he=x.alphaTest>0,me=!!x.alphaHash,ne=!!x.extensions,Pe=Vn;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Pe=s.toneMapping);let we={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:tt,fragmentShader:We,defines:x.defines,customVertexShaderID:Ke,customFragmentShaderID:X,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:ge,batchingColor:ge&&D._colorsTexture!==null,instancing:Le,instancingColor:Le&&D.instanceColor!==null,instancingMorph:Le&&D.morphTexture!==null,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Oe,matcap:bt,envMap:Be,envMapMode:Be&&te.mapping,envMapCubeUVHeight:G,aoMap:Je,lightMap:nt,bumpMap:He,normalMap:ht,displacementMap:Tt,emissiveMap:Wt,normalMapObjectSpace:ht&&x.normalMapType===gf,normalMapTangentSpace:ht&&x.normalMapType===Yo,packedNormalMap:ht&&x.normalMapType===Yo&&Iv(x.normalMap.format),metalnessMap:ft,roughnessMap:yt,anisotropy:U,anisotropyMap:q,clearcoat:Ut,clearcoatMap:ie,clearcoatNormalMap:ae,clearcoatRoughnessMap:K,dispersion:$e,retroreflection:C,iridescence:y,iridescenceMap:Q,iridescenceThicknessMap:le,sheen:B,sheenColorMap:Te,sheenRoughnessMap:oe,specularMap:se,specularColorMap:ve,specularIntensityMap:Ce,transmission:H,transmissionMap:Ue,thicknessMap:F,gradientMap:ce,opaque:x.transparent===!1&&x.blending===ar&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:he,alphaHash:me,combine:x.combine,mapUv:Oe&&p(x.map.channel),aoMapUv:Je&&p(x.aoMap.channel),lightMapUv:nt&&p(x.lightMap.channel),bumpMapUv:He&&p(x.bumpMap.channel),normalMapUv:ht&&p(x.normalMap.channel),displacementMapUv:Tt&&p(x.displacementMap.channel),emissiveMapUv:Wt&&p(x.emissiveMap.channel),metalnessMapUv:ft&&p(x.metalnessMap.channel),roughnessMapUv:yt&&p(x.roughnessMap.channel),anisotropyMapUv:q&&p(x.anisotropyMap.channel),clearcoatMapUv:ie&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ae&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:oe&&p(x.sheenRoughnessMap.channel),specularMapUv:se&&p(x.specularMap.channel),specularColorMapUv:ve&&p(x.specularColorMap.channel),specularIntensityMapUv:Ce&&p(x.specularIntensityMap.channel),transmissionMapUv:Ue&&p(x.transmissionMap.channel),thicknessMapUv:F&&p(x.thicknessMap.channel),alphaMapUv:j&&p(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ht||U),vertexNormals:!!V.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!V.attributes.uv&&(Oe||j),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||V.attributes.normal===void 0&&ht===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:fe,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:be,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Oe&&x.map.isVideoTexture===!0&&ze.getTransfer(x.map.colorSpace)===et,decodeVideoTextureEmissive:Wt&&x.emissiveMap.isVideoTexture===!0&&ze.getTransfer(x.emissiveMap.colorSpace)===et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Et,flipSided:x.side===Zt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ne&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&x.extensions.multiDraw===!0||ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function m(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)E.push(R),E.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(g(E,x),b(E,x),E.push(s.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function g(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function b(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function T(x){let E=f[x.type],R;if(E){let I=ci[E];R=pn.clone(I.uniforms)}else R=x.uniforms;return R}function v(x,E){let R=h.get(E);return R!==void 0?++R.usedTimes:(R=new Cv(s,E,x,i),l.push(R),h.set(E,R)),R}function M(x){if(--x.usedTimes===0){let E=l.indexOf(x);l[E]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function A(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:T,acquireProgram:v,releaseProgram:M,releaseShaderCache:S,programs:l,dispose:A}}function Dv(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Nv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function $f(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Qf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,p,_,m,g){let b=s[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:p,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:g},s[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=p,b.materialVariant=o(d),b.groupOrder=_,b.renderOrder=d.renderOrder,b.z=m,b.group=g),e++,b}function c(d,f,p,_,m,g,b){b.reversedDepth===!0&&(m=-m);let T=a(d,f,p,_,m,g);p.transmission>0?n.push(T):p.transparent===!0?i.push(T):t.push(T)}function l(d,f,p,_,m,g){let b=a(d,f,p,_,m,g);p.transmission>0?n.unshift(b):p.transparent===!0?i.unshift(b):t.unshift(b)}function h(d,f){t.length>1&&t.sort(d||Nv),n.length>1&&n.sort(f||$f),i.length>1&&i.sort(f||$f)}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:u,sort:h}}function Uv(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Qf,s.set(n,[o])):i>=r.length?(o=new Qf,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Fv(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Ie};break;case"SpotLight":t={position:new P,direction:new P,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function Ov(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Bv=0;function zv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function kv(s){let e=new Fv,t=Ov(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let i=new P,r=new De,o=new De;function a(l){let h=0,u=0,d=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,b=0,T=0,v=0,M=0,S=0,A=0,x=0,E=0,R=0;l.sort(zv);for(let D=0,O=l.length;D<O;D++){let L=l[D],V=L.color,Y=L.intensity,Z=L.distance,te=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===qi?te=L.shadow.map.texture:te=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=V.r*Y,u+=V.g*Y,d+=V.b*Y;else if(L.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(L.sh.coefficients[G],Y);R++}else if(L.isSunLight){let G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,ee=t.get(L);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[p]=ee,n.sunShadowMap[p]=te;let Se=$.getViewportCount();for(let be=0;be<Se;be++)n.sunShadowMatrix[_+be]=$.getMatrix(be),n.sunShadowCascade[_+be]=$._cascadeData[be];_+=Se,p++}n.sun[f]=G,f++}else if(L.isDirectionalLight){let G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,ee=t.get(L);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize=$.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=te,n.directionalShadowMatrix[m]=L.shadow.matrix,M++}n.directional[m]=G,m++}else if(L.isSpotLight){let G=e.get(L);G.position.setFromMatrixPosition(L.matrixWorld),G.color.copy(V).multiplyScalar(Y),G.distance=Z,G.coneCos=Math.cos(L.angle),G.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),G.decay=L.decay,n.spot[b]=G;let $=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,$.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[b]=$.matrix,L.castShadow){let ee=t.get(L);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize=$.mapSize,n.spotShadow[b]=ee,n.spotShadowMap[b]=te,A++}b++}else if(L.isRectAreaLight){let G=e.get(L);G.color.copy(V).multiplyScalar(Y),G.halfWidth.set(L.width*.5,0,0),G.halfHeight.set(0,L.height*.5,0),n.rectArea[T]=G,T++}else if(L.isPointLight){let G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),G.distance=L.distance,G.decay=L.decay,L.castShadow){let $=L.shadow,ee=t.get(L);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize=$.mapSize,ee.shadowCameraNear=$.camera.near,ee.shadowCameraFar=$.camera.far,n.pointShadow[g]=ee,n.pointShadowMap[g]=te,n.pointShadowMatrix[g]=L.shadow.matrix,S++}n.point[g]=G,g++}else if(L.isHemisphereLight){let G=e.get(L);G.skyColor.copy(L.color).multiplyScalar(Y),G.groundColor.copy(L.groundColor).multiplyScalar(Y),n.hemi[v]=G,v++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let I=n.hash;(I.sunLength!==f||I.directionalLength!==m||I.pointLength!==g||I.spotLength!==b||I.rectAreaLength!==T||I.hemiLength!==v||I.numSunShadows!==p||I.numDirectionalShadows!==M||I.numPointShadows!==S||I.numSpotShadows!==A||I.numSpotMaps!==x||I.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=m,n.spot.length=b,n.rectArea.length=T,n.point.length=g,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,I.sunLength=f,I.directionalLength=m,I.pointLength=g,I.spotLength=b,I.rectAreaLength=T,I.hemiLength=v,I.numSunShadows=p,I.numDirectionalShadows=M,I.numPointShadows=S,I.numSpotShadows=A,I.numSpotMaps=x,I.numLightProbes=R,n.version=Bv++)}function c(l,h){let u=0,d=0,f=0,p=0,_=0,m=0,g=h.matrixWorldInverse;for(let b=0,T=l.length;b<T;b++){let v=l[b];if(v.isSunLight){let M=n.sun[u];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),d++}else if(v.isSpotLight){let M=n.spot[p];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(g),m++}}}return{setup:a,setupView:c,state:n}}function ep(s){let e=new kv(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){i.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Hv(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new ep(s),e.set(i,[a])):r>=o.length?(a=new ep(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Wv=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Xv=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],tp=new De,Ko=new P,eu=new P;function qv(s,e,t){let n=new Js,i=new re,r=new re,o=new lt,a=new al,c=new ll,l={},h=t.maxTextureSize,u={[Pn]:Zt,[Zt]:Pn,[Et]:Et},d=new St({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Vv,fragmentShader:Gv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new rt;p.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new je(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Po;let g=this.type;this.render=function(S,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===xl&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Po);let E=s.getRenderTarget(),R=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),D=s.state;D.setBlending(Lt),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let O=g!==this.type;O&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(V=>V.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,V=S.length;L<V;L++){let Y=S[L],Z=Y.shadow;if(Z===void 0){Ae("WebGLShadowMap:",Y,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);let te=Z.getFrameExtents();i.multiply(te),r.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/te.x),i.x=r.x*te.x,Z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/te.y),i.y=r.y*te.y,Z.mapSize.y=r.y));let G=s.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=G,Z.map===null||O===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===or){if(Y.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new It(i.x,i.y,{format:qi,type:kt,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),Z.map.texture.name=Y.name+".shadowMap",Z.map.depthTexture=new ni(i.x,i.y,Sn),Z.map.depthTexture.name=Y.name+".shadowMapDepth",Z.map.depthTexture.format=$n,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Mt,Z.map.depthTexture.magFilter=Mt}else Y.isPointLight?(Z.map=new mr(i.x),Z.map.depthTexture=new nl(i.x,Wn)):(Z.map=new It(i.x,i.y),Z.map.depthTexture=new ni(i.x,i.y,Wn)),Z.map.depthTexture.name=Y.name+".shadowMap",Z.map.depthTexture.format=$n,this.type===Po?(Z.map.depthTexture.compareFunction=G?oc:rc,Z.map.depthTexture.minFilter=Pt,Z.map.depthTexture.magFilter=Pt):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Mt,Z.map.depthTexture.magFilter=Mt);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==i.x||Z.map.height!==i.y)&&Z.map.setSize(i.x,i.y);let $=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();Y.isPointLight!==!0&&Z.updateMatrices(Y,x);for(let ee=0;ee<$;ee++){let Se=Z.getCamera(ee);if(Y.isPointLight){let be=Z.camera,tt=Z.matrix,We=Y.distance||be.far;We!==be.far&&(be.far=We,be.updateProjectionMatrix()),Ko.setFromMatrixPosition(Y.matrixWorld),be.position.copy(Ko),eu.copy(be.position),eu.add(Wv[ee]),be.up.copy(Xv[ee]),be.lookAt(eu),be.updateMatrixWorld(),tt.makeTranslation(-Ko.x,-Ko.y,-Ko.z),tp.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(tp,be.coordinateSystem,be.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)s.setRenderTarget(Z.map,ee),s.clear();else{ee===0&&(s.setRenderTarget(Z.map),s.clear());let be=Z.getViewport(ee);o.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),D.viewport(o)}n=Z.getFrustum(ee),v(A,x,Se,Y,this.type)}Z.isPointLightShadow!==!0&&this.type===or&&b(Z,x),Z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(E,R,I)};function b(S,A){let x=e.update(_);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new It(i.x,i.y,{format:qi,type:kt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(A,null,x,d,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(A,null,x,f,_,null)}function T(S,A,x,E){let R=null,I=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)R=I;else if(R=x.isPointLight===!0?c:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let D=R.uuid,O=A.uuid,L=l[D];L===void 0&&(L={},l[D]=L);let V=L[O];V===void 0&&(V=R.clone(),L[O]=V,A.addEventListener("dispose",M)),R=V}if(R.visible=A.visible,R.wireframe=A.wireframe,E===or?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:u[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let D=s.properties.get(R);D.light=x}return R}function v(S,A,x,E,R){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===or)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let O=e.update(S),L=S.material;if(Array.isArray(L)){let V=O.groups;for(let Y=0,Z=V.length;Y<Z;Y++){let te=V[Y],G=L[te.materialIndex];if(G&&G.visible){let $=T(S,G,E,R);S.onBeforeShadow(s,S,A,x,O,$,te),s.renderBufferDirect(x,null,O,$,S,te),S.onAfterShadow(s,S,A,x,O,$,te)}}}else if(L.visible){let V=T(S,L,E,R);S.onBeforeShadow(s,S,A,x,O,V,null),s.renderBufferDirect(x,null,O,V,S,null),S.onAfterShadow(s,S,A,x,O,V,null)}}let D=S.children;for(let O=0,L=D.length;O<L;O++)v(D[O],A,x,E,R)}function M(S){S.target.removeEventListener("dispose",M);for(let x in l){let E=l[x],R=S.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function Yv(s,e){function t(){let F=!1,ce=new lt,j=null,he=new lt(0,0,0,0);return{setMask:function(me){j!==me&&!F&&(s.colorMask(me,me,me,me),j=me)},setLocked:function(me){F=me},setClear:function(me,ne,Pe,we,xt){xt===!0&&(me*=we,ne*=we,Pe*=we),ce.set(me,ne,Pe,we),he.equals(ce)===!1&&(s.clearColor(me,ne,Pe,we),he.copy(ce))},reset:function(){F=!1,j=null,he.set(-1,0,0,0)}}}function n(){let F=!1,ce=!1,j=null,he=null,me=null;return{setReversed:function(ne){if(ce!==ne){let Pe=e.get("EXT_clip_control");ne?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),ce=ne;let we=me;me=null,this.setClear(we)}},getReversed:function(){return ce},setTest:function(ne){ne?J(s.DEPTH_TEST):fe(s.DEPTH_TEST)},setMask:function(ne){j!==ne&&!F&&(s.depthMask(ne),j=ne)},setFunc:function(ne){if(ce&&(ne=Af[ne]),he!==ne){switch(ne){case Wa:s.depthFunc(s.NEVER);break;case Xa:s.depthFunc(s.ALWAYS);break;case qa:s.depthFunc(s.LESS);break;case zs:s.depthFunc(s.LEQUAL);break;case Ya:s.depthFunc(s.EQUAL);break;case Za:s.depthFunc(s.GEQUAL);break;case Ka:s.depthFunc(s.GREATER);break;case Ja:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}he=ne}},setLocked:function(ne){F=ne},setClear:function(ne){me!==ne&&(me=ne,ce&&(ne=1-ne),s.clearDepth(ne))},reset:function(){F=!1,j=null,he=null,me=null,ce=!1}}}function i(){let F=!1,ce=null,j=null,he=null,me=null,ne=null,Pe=null,we=null,xt=null;return{setTest:function(it){F||(it?J(s.STENCIL_TEST):fe(s.STENCIL_TEST))},setMask:function(it){ce!==it&&!F&&(s.stencilMask(it),ce=it)},setFunc:function(it,Dn,Zn){(j!==it||he!==Dn||me!==Zn)&&(s.stencilFunc(it,Dn,Zn),j=it,he=Dn,me=Zn)},setOp:function(it,Dn,Zn){(ne!==it||Pe!==Dn||we!==Zn)&&(s.stencilOp(it,Dn,Zn),ne=it,Pe=Dn,we=Zn)},setLocked:function(it){F=it},setClear:function(it){xt!==it&&(s.clearStencil(it),xt=it)},reset:function(){F=!1,ce=null,j=null,he=null,me=null,ne=null,Pe=null,we=null,xt=null}}}let r=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,b=null,T=null,v=null,M=null,S=null,A=null,x=new Ie(0,0,0),E=0,R=!1,I=null,D=null,O=null,L=null,V=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,te=0,G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(G)[1]),Z=te>=1):G.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Z=te>=2);let $=null,ee={},Se=s.getParameter(s.SCISSOR_BOX),be=s.getParameter(s.VIEWPORT),tt=new lt().fromArray(Se),We=new lt().fromArray(be);function Ke(F,ce,j,he){let me=new Uint8Array(4),ne=s.createTexture();s.bindTexture(F,ne),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Pe=0;Pe<j;Pe++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(ce,0,s.RGBA,1,1,he,0,s.RGBA,s.UNSIGNED_BYTE,me):s.texImage2D(ce+Pe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,me);return ne}let X={};X[s.TEXTURE_2D]=Ke(s.TEXTURE_2D,s.TEXTURE_2D,1),X[s.TEXTURE_CUBE_MAP]=Ke(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[s.TEXTURE_2D_ARRAY]=Ke(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),X[s.TEXTURE_3D]=Ke(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(s.DEPTH_TEST),o.setFunc(zs),He(!1),ht(Eh),J(s.CULL_FACE),Je(Lt);function J(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function fe(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Le(F,ce){return d[F]!==ce?(s.bindFramebuffer(F,ce),d[F]=ce,F===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ce),F===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ce),!0):!1}function ge(F,ce){let j=p,he=!1;if(F){j=f.get(ce),j===void 0&&(j=[],f.set(ce,j));let me=F.textures;if(j.length!==me.length||j[0]!==s.COLOR_ATTACHMENT0){for(let ne=0,Pe=me.length;ne<Pe;ne++)j[ne]=s.COLOR_ATTACHMENT0+ne;j.length=me.length,he=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,he=!0);he&&s.drawBuffers(j)}function Oe(F){return _!==F?(s.useProgram(F),_=F,!0):!1}let bt={[In]:s.FUNC_ADD,[Jd]:s.FUNC_SUBTRACT,[jd]:s.FUNC_REVERSE_SUBTRACT};bt[$d]=s.MIN,bt[Qd]=s.MAX;let Be={[ds]:s.ZERO,[ef]:s.ONE,[tf]:s.SRC_COLOR,[Ph]:s.SRC_ALPHA,[of]:s.SRC_ALPHA_SATURATE,[Lo]:s.DST_COLOR,[Io]:s.DST_ALPHA,[nf]:s.ONE_MINUS_SRC_COLOR,[Ih]:s.ONE_MINUS_SRC_ALPHA,[rf]:s.ONE_MINUS_DST_COLOR,[sf]:s.ONE_MINUS_DST_ALPHA,[af]:s.CONSTANT_COLOR,[lf]:s.ONE_MINUS_CONSTANT_COLOR,[cf]:s.CONSTANT_ALPHA,[hf]:s.ONE_MINUS_CONSTANT_ALPHA};function Je(F,ce,j,he,me,ne,Pe,we,xt,it){if(F===Lt){m===!0&&(fe(s.BLEND),m=!1);return}if(m===!1&&(J(s.BLEND),m=!0),F!==_l){if(F!==g||it!==R){if((b!==In||M!==In)&&(s.blendEquation(s.FUNC_ADD),b=In,M=In),it)switch(F){case ar:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ah:s.blendFunc(s.ONE,s.ONE);break;case Rh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ch:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ne("WebGLState: Invalid blending: ",F);break}else switch(F){case ar:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ah:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Rh:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ch:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",F);break}T=null,v=null,S=null,A=null,x.set(0,0,0),E=0,g=F,R=it}return}me=me||ce,ne=ne||j,Pe=Pe||he,(ce!==b||me!==M)&&(s.blendEquationSeparate(bt[ce],bt[me]),b=ce,M=me),(j!==T||he!==v||ne!==S||Pe!==A)&&(s.blendFuncSeparate(Be[j],Be[he],Be[ne],Be[Pe]),T=j,v=he,S=ne,A=Pe),(we.equals(x)===!1||xt!==E)&&(s.blendColor(we.r,we.g,we.b,xt),x.copy(we),E=xt),g=F,R=!1}function nt(F,ce){F.side===Et?fe(s.CULL_FACE):J(s.CULL_FACE);let j=F.side===Zt;ce&&(j=!j),He(j),F.blending===ar&&F.transparent===!1?Je(Lt):Je(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let he=F.stencilWrite;a.setTest(he),he&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Wt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):fe(s.SAMPLE_ALPHA_TO_COVERAGE)}function He(F){I!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),I=F)}function ht(F){F!==Zd?(J(s.CULL_FACE),F!==D&&(F===Eh?s.cullFace(s.BACK):F===Kd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):fe(s.CULL_FACE),D=F}function Tt(F){F!==O&&(Z&&s.lineWidth(F),O=F)}function Wt(F,ce,j){F?(J(s.POLYGON_OFFSET_FILL),(L!==ce||V!==j)&&(L=ce,V=j,o.getReversed()&&(ce=-ce),s.polygonOffset(ce,j))):fe(s.POLYGON_OFFSET_FILL)}function ft(F){F?J(s.SCISSOR_TEST):fe(s.SCISSOR_TEST)}function yt(F){F===void 0&&(F=s.TEXTURE0+Y-1),$!==F&&(s.activeTexture(F),$=F)}function U(F,ce,j){j===void 0&&($===null?j=s.TEXTURE0+Y-1:j=$);let he=ee[j];he===void 0&&(he={type:void 0,texture:void 0},ee[j]=he),(he.type!==F||he.texture!==ce)&&($!==j&&(s.activeTexture(j),$=j),s.bindTexture(F,ce||X[F]),he.type=F,he.texture=ce)}function Ut(){let F=ee[$];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function $e(){try{s.compressedTexImage2D(...arguments)}catch(F){Ne("WebGLState:",F)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(F){Ne("WebGLState:",F)}}function y(){try{s.texSubImage2D(...arguments)}catch(F){Ne("WebGLState:",F)}}function B(){try{s.texSubImage3D(...arguments)}catch(F){Ne("WebGLState:",F)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(F){Ne("WebGLState:",F)}}function q(){try{s.compressedTexSubImage3D(...arguments)}catch(F){Ne("WebGLState:",F)}}function ie(){try{s.texStorage2D(...arguments)}catch(F){Ne("WebGLState:",F)}}function ae(){try{s.texStorage3D(...arguments)}catch(F){Ne("WebGLState:",F)}}function K(){try{s.texImage2D(...arguments)}catch(F){Ne("WebGLState:",F)}}function Q(){try{s.texImage3D(...arguments)}catch(F){Ne("WebGLState:",F)}}function le(F){return u[F]!==void 0?u[F]:s.getParameter(F)}function Te(F,ce){u[F]!==ce&&(s.pixelStorei(F,ce),u[F]=ce)}function oe(F){tt.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),tt.copy(F))}function se(F){We.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),We.copy(F))}function ve(F,ce){let j=l.get(ce);j===void 0&&(j=new WeakMap,l.set(ce,j));let he=j.get(F);he===void 0&&(he=s.getUniformBlockIndex(ce,F.name),j.set(F,he))}function Ce(F,ce){let he=l.get(ce).get(F);c.get(ce)!==he&&(s.uniformBlockBinding(ce,he,F.__bindingPointIndex),c.set(ce,he))}function Ue(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},$=null,ee={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,b=null,T=null,v=null,M=null,S=null,A=null,x=new Ie(0,0,0),E=0,R=!1,I=null,D=null,O=null,L=null,V=null,tt.set(0,0,s.canvas.width,s.canvas.height),We.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:fe,bindFramebuffer:Le,drawBuffers:ge,useProgram:Oe,setBlending:Je,setMaterial:nt,setFlipSided:He,setCullFace:ht,setLineWidth:Tt,setPolygonOffset:Wt,setScissorTest:ft,activeTexture:yt,bindTexture:U,unbindTexture:Ut,compressedTexImage2D:$e,compressedTexImage3D:C,texImage2D:K,texImage3D:Q,pixelStorei:Te,getParameter:le,updateUBOMapping:ve,uniformBlockBinding:Ce,texStorage2D:ie,texStorage3D:ae,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:H,compressedTexSubImage3D:q,scissor:oe,viewport:se,reset:Ue}}function Zv(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,y){return p?new OffscreenCanvas(C,y):Vs("canvas")}function m(C,y,B){let H=1,q=$e(C);if((q.width>B||q.height>B)&&(H=B/Math.max(q.width,q.height)),H<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ie=Math.floor(H*q.width),ae=Math.floor(H*q.height);d===void 0&&(d=_(ie,ae));let K=y?_(ie,ae):d;return K.width=ie,K.height=ae,K.getContext("2d").drawImage(C,0,0,ie,ae),Ae("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ie+"x"+ae+")."),K}else return"data"in C&&Ae("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),C;return C}function g(C){return C.generateMipmaps}function b(C){s.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(C,y,B,H,q,ie=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ae;H&&(ae=e.get("EXT_texture_norm16"),ae||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=y;if(y===s.RED&&(B===s.FLOAT&&(K=s.R32F),B===s.HALF_FLOAT&&(K=s.R16F),B===s.UNSIGNED_BYTE&&(K=s.R8),B===s.UNSIGNED_SHORT&&ae&&(K=ae.R16_EXT),B===s.SHORT&&ae&&(K=ae.R16_SNORM_EXT)),y===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.R8UI),B===s.UNSIGNED_SHORT&&(K=s.R16UI),B===s.UNSIGNED_INT&&(K=s.R32UI),B===s.BYTE&&(K=s.R8I),B===s.SHORT&&(K=s.R16I),B===s.INT&&(K=s.R32I)),y===s.RG&&(B===s.FLOAT&&(K=s.RG32F),B===s.HALF_FLOAT&&(K=s.RG16F),B===s.UNSIGNED_BYTE&&(K=s.RG8),B===s.UNSIGNED_SHORT&&ae&&(K=ae.RG16_EXT),B===s.SHORT&&ae&&(K=ae.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RG8UI),B===s.UNSIGNED_SHORT&&(K=s.RG16UI),B===s.UNSIGNED_INT&&(K=s.RG32UI),B===s.BYTE&&(K=s.RG8I),B===s.SHORT&&(K=s.RG16I),B===s.INT&&(K=s.RG32I)),y===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGB8UI),B===s.UNSIGNED_SHORT&&(K=s.RGB16UI),B===s.UNSIGNED_INT&&(K=s.RGB32UI),B===s.BYTE&&(K=s.RGB8I),B===s.SHORT&&(K=s.RGB16I),B===s.INT&&(K=s.RGB32I)),y===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),B===s.UNSIGNED_INT&&(K=s.RGBA32UI),B===s.BYTE&&(K=s.RGBA8I),B===s.SHORT&&(K=s.RGBA16I),B===s.INT&&(K=s.RGBA32I)),y===s.RGB&&(B===s.UNSIGNED_SHORT&&ae&&(K=ae.RGB16_EXT),B===s.SHORT&&ae&&(K=ae.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(K=s.R11F_G11F_B10F)),y===s.RGBA){let Q=ie?Yr:ze.getTransfer(q);B===s.FLOAT&&(K=s.RGBA32F),B===s.HALF_FLOAT&&(K=s.RGBA16F),B===s.UNSIGNED_BYTE&&(K=Q===et?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&ae&&(K=ae.RGBA16_EXT),B===s.SHORT&&ae&&(K=ae.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function M(C,y){let B;return C?y===null||y===Wn||y===Xi?B=s.DEPTH24_STENCIL8:y===Sn?B=s.DEPTH32F_STENCIL8:y===cr&&(B=s.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Wn||y===Xi?B=s.DEPTH_COMPONENT24:y===Sn?B=s.DEPTH_COMPONENT32F:y===cr&&(B=s.DEPTH_COMPONENT16),B}function S(C,y){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Mt&&C.minFilter!==Pt?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function A(C){let y=C.target;y.removeEventListener("dispose",A),E(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&u.delete(y)}function x(C){let y=C.target;y.removeEventListener("dispose",x),I(y)}function E(C){let y=n.get(C);if(y.__webglInit===void 0)return;let B=C.source,H=f.get(B);if(H){let q=H[y.__cacheKey];q.usedTimes--,q.usedTimes===0&&R(C),Object.keys(H).length===0&&f.delete(B)}n.remove(C)}function R(C){let y=n.get(C);s.deleteTexture(y.__webglTexture);let B=C.source,H=f.get(B);delete H[y.__cacheKey],o.memory.textures--}function I(C){let y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(y.__webglFramebuffer[H]))for(let q=0;q<y.__webglFramebuffer[H].length;q++)s.deleteFramebuffer(y.__webglFramebuffer[H][q]);else s.deleteFramebuffer(y.__webglFramebuffer[H]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[H])}else{if(Array.isArray(y.__webglFramebuffer))for(let H=0;H<y.__webglFramebuffer.length;H++)s.deleteFramebuffer(y.__webglFramebuffer[H]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let H=0;H<y.__webglColorRenderbuffer.length;H++)y.__webglColorRenderbuffer[H]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[H]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let B=C.textures;for(let H=0,q=B.length;H<q;H++){let ie=n.get(B[H]);ie.__webglTexture&&(s.deleteTexture(ie.__webglTexture),o.memory.textures--),n.remove(B[H])}n.remove(C)}let D=0;function O(){D=0}function L(){return D}function V(C){D=C}function Y(){let C=D;return C>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),D+=1,C}function Z(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function te(C,y){let B=n.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){let H=C.image;if(H===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{fe(B,C,y);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+y)}function G(C,y){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){fe(B,C,y);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+y)}function $(C,y){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){fe(B,C,y);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+y)}function ee(C,y){let B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){Le(B,C,y);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+y)}let Se={[hn]:s.REPEAT,[Rn]:s.CLAMP_TO_EDGE,[ks]:s.MIRRORED_REPEAT},be={[Mt]:s.NEAREST,[Ml]:s.NEAREST_MIPMAP_NEAREST,[ms]:s.NEAREST_MIPMAP_LINEAR,[Pt]:s.LINEAR,[lr]:s.LINEAR_MIPMAP_NEAREST,[Gn]:s.LINEAR_MIPMAP_LINEAR},tt={[_f]:s.NEVER,[bf]:s.ALWAYS,[vf]:s.LESS,[rc]:s.LEQUAL,[yf]:s.EQUAL,[oc]:s.GEQUAL,[Mf]:s.GREATER,[Sf]:s.NOTEQUAL};function We(C,y){if(y.type===Sn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Pt||y.magFilter===lr||y.magFilter===ms||y.magFilter===Gn||y.minFilter===Pt||y.minFilter===lr||y.minFilter===ms||y.minFilter===Gn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Se[y.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Se[y.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Se[y.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,be[y.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,be[y.minFilter]),y.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,tt[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Mt||y.minFilter!==ms&&y.minFilter!==Gn||y.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Ke(C,y){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",A));let H=y.source,q=f.get(H);q===void 0&&(q={},f.set(H,q));let ie=Z(y);if(ie!==C.__cacheKey){q[ie]===void 0&&(q[ie]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),q[ie].usedTimes++;let ae=q[C.__cacheKey];ae!==void 0&&(q[C.__cacheKey].usedTimes--,ae.usedTimes===0&&R(y)),C.__cacheKey=ie,C.__webglTexture=q[ie].texture}return B}function X(C,y,B){return Math.floor(Math.floor(C/B)/y)}function J(C,y,B,H){let ie=C.updateRanges;if(ie.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,B,H,y.data);else{ie.sort((Te,oe)=>Te.start-oe.start);let ae=0;for(let Te=1;Te<ie.length;Te++){let oe=ie[ae],se=ie[Te],ve=oe.start+oe.count,Ce=X(se.start,y.width,4),Ue=X(oe.start,y.width,4);se.start<=ve+1&&Ce===Ue&&X(se.start+se.count-1,y.width,4)===Ce?oe.count=Math.max(oe.count,se.start+se.count-oe.start):(++ae,ie[ae]=se)}ie.length=ae+1;let K=t.getParameter(s.UNPACK_ROW_LENGTH),Q=t.getParameter(s.UNPACK_SKIP_PIXELS),le=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let Te=0,oe=ie.length;Te<oe;Te++){let se=ie[Te],ve=Math.floor(se.start/4),Ce=Math.ceil(se.count/4),Ue=ve%y.width,F=Math.floor(ve/y.width),ce=Ce,j=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(s.UNPACK_SKIP_ROWS,F),t.texSubImage2D(s.TEXTURE_2D,0,Ue,F,ce,j,B,H,y.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,K),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(s.UNPACK_SKIP_ROWS,le)}}function fe(C,y,B){let H=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(H=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(H=s.TEXTURE_3D);let q=Ke(C,y),ie=y.source;t.bindTexture(H,C.__webglTexture,s.TEXTURE0+B);let ae=n.get(ie);if(ie.version!==ae.__version||q===!0){if(t.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let j=ze.getPrimaries(ze.workingColorSpace),he=y.colorSpace===Ri?null:ze.getPrimaries(y.colorSpace),me=y.colorSpace===Ri||j===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let Q=m(y.image,!1,i.maxTextureSize);Q=Ut(y,Q);let le=r.convert(y.format,y.colorSpace),Te=r.convert(y.type),oe=v(y.internalFormat,le,Te,y.normalized,y.colorSpace,y.isVideoTexture);We(H,y);let se,ve=y.mipmaps,Ce=y.isVideoTexture!==!0,Ue=ae.__version===void 0||q===!0,F=ie.dataReady,ce=S(y,Q);if(y.isDepthTexture)oe=M(y.format===ai,y.type),Ue&&(Ce?t.texStorage2D(s.TEXTURE_2D,1,oe,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,oe,Q.width,Q.height,0,le,Te,null));else if(y.isDataTexture)if(ve.length>0){Ce&&Ue&&t.texStorage2D(s.TEXTURE_2D,ce,oe,ve[0].width,ve[0].height);for(let j=0,he=ve.length;j<he;j++)se=ve[j],Ce?F&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,se.width,se.height,le,Te,se.data):t.texImage2D(s.TEXTURE_2D,j,oe,se.width,se.height,0,le,Te,se.data);y.generateMipmaps=!1}else Ce?(Ue&&t.texStorage2D(s.TEXTURE_2D,ce,oe,Q.width,Q.height),F&&J(y,Q,le,Te)):t.texImage2D(s.TEXTURE_2D,0,oe,Q.width,Q.height,0,le,Te,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ce&&Ue&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ce,oe,ve[0].width,ve[0].height,Q.depth);for(let j=0,he=ve.length;j<he;j++)if(se=ve[j],y.format!==cn)if(le!==null)if(Ce){if(F)if(y.layerUpdates.size>0){let me=Zh(se.width,se.height,y.format,y.type);for(let ne of y.layerUpdates){let Pe=se.data.subarray(ne*me/se.data.BYTES_PER_ELEMENT,(ne+1)*me/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,ne,se.width,se.height,1,le,Pe)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,se.width,se.height,Q.depth,le,se.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,oe,se.width,se.height,Q.depth,0,se.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?F&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,se.width,se.height,Q.depth,le,Te,se.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,oe,se.width,se.height,Q.depth,0,le,Te,se.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Ce&&Ue&&t.texStorage2D(s.TEXTURE_2D,ce,oe,ve[0].width,ve[0].height);for(let j=0,he=ve.length;j<he;j++)se=ve[j],y.format!==cn?le!==null?Ce?F&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,se.width,se.height,le,se.data):t.compressedTexImage2D(s.TEXTURE_2D,j,oe,se.width,se.height,0,se.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?F&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,se.width,se.height,le,Te,se.data):t.texImage2D(s.TEXTURE_2D,j,oe,se.width,se.height,0,le,Te,se.data)}else if(y.isDataArrayTexture)if(Ce){if(Ue&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ce,oe,Q.width,Q.height,Q.depth),F)if(y.layerUpdates.size>0){let j=Zh(Q.width,Q.height,y.format,y.type);for(let he of y.layerUpdates){let me=Q.data.subarray(he*j/Q.data.BYTES_PER_ELEMENT,(he+1)*j/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,Q.width,Q.height,1,le,Te,me)}y.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,Te,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,oe,Q.width,Q.height,Q.depth,0,le,Te,Q.data);else if(y.isData3DTexture)Ce?(Ue&&t.texStorage3D(s.TEXTURE_3D,ce,oe,Q.width,Q.height,Q.depth),F&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,Te,Q.data)):t.texImage3D(s.TEXTURE_3D,0,oe,Q.width,Q.height,Q.depth,0,le,Te,Q.data);else if(y.isFramebufferTexture){if(Ue)if(Ce)t.texStorage2D(s.TEXTURE_2D,ce,oe,Q.width,Q.height);else{let j=Q.width,he=Q.height;for(let me=0;me<ce;me++)t.texImage2D(s.TEXTURE_2D,me,oe,j,he,0,le,Te,null),j>>=1,he>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){let j=s.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),Q.parentNode!==j){j.appendChild(Q),u.add(y),j.onpaint=he=>{let me=he.changedElements;for(let ne of u)me.includes(ne.image)&&(ne.needsUpdate=!0)},j.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{let me=s.RGBA,ne=s.RGBA,Pe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,me,ne,Pe,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Ce&&Ue){let j=$e(ve[0]);t.texStorage2D(s.TEXTURE_2D,ce,oe,j.width,j.height)}for(let j=0,he=ve.length;j<he;j++)se=ve[j],Ce?F&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,le,Te,se):t.texImage2D(s.TEXTURE_2D,j,oe,le,Te,se);y.generateMipmaps=!1}else if(Ce){if(Ue){let j=$e(Q);t.texStorage2D(s.TEXTURE_2D,ce,oe,j.width,j.height)}F&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le,Te,Q)}else t.texImage2D(s.TEXTURE_2D,0,oe,le,Te,Q);g(y)&&b(H),ae.__version=ie.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Le(C,y,B){if(y.image.length!==6)return;let H=Ke(C,y),q=y.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+B);let ie=n.get(q);if(q.version!==ie.__version||H===!0){t.activeTexture(s.TEXTURE0+B);let ae=ze.getPrimaries(ze.workingColorSpace),K=y.colorSpace===Ri?null:ze.getPrimaries(y.colorSpace),Q=y.colorSpace===Ri||ae===K?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let le=y.isCompressedTexture||y.image[0].isCompressedTexture,Te=y.image[0]&&y.image[0].isDataTexture,oe=[];for(let ne=0;ne<6;ne++)!le&&!Te?oe[ne]=m(y.image[ne],!0,i.maxCubemapSize):oe[ne]=Te?y.image[ne].image:y.image[ne],oe[ne]=Ut(y,oe[ne]);let se=oe[0],ve=r.convert(y.format,y.colorSpace),Ce=r.convert(y.type),Ue=v(y.internalFormat,ve,Ce,y.normalized,y.colorSpace),F=y.isVideoTexture!==!0,ce=ie.__version===void 0||H===!0,j=q.dataReady,he=S(y,se);We(s.TEXTURE_CUBE_MAP,y);let me;if(le){F&&ce&&t.texStorage2D(s.TEXTURE_CUBE_MAP,he,Ue,se.width,se.height);for(let ne=0;ne<6;ne++){me=oe[ne].mipmaps;for(let Pe=0;Pe<me.length;Pe++){let we=me[Pe];y.format!==cn?ve!==null?F?j&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe,0,0,we.width,we.height,ve,we.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe,Ue,we.width,we.height,0,we.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe,0,0,we.width,we.height,ve,Ce,we.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe,Ue,we.width,we.height,0,ve,Ce,we.data)}}}else{if(me=y.mipmaps,F&&ce){me.length>0&&he++;let ne=$e(oe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,he,Ue,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Te){F?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,oe[ne].width,oe[ne].height,ve,Ce,oe[ne].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ue,oe[ne].width,oe[ne].height,0,ve,Ce,oe[ne].data);for(let Pe=0;Pe<me.length;Pe++){let xt=me[Pe].image[ne].image;F?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe+1,0,0,xt.width,xt.height,ve,Ce,xt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe+1,Ue,xt.width,xt.height,0,ve,Ce,xt.data)}}else{F?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ve,Ce,oe[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ue,ve,Ce,oe[ne]);for(let Pe=0;Pe<me.length;Pe++){let we=me[Pe];F?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe+1,0,0,ve,Ce,we.image[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Pe+1,Ue,ve,Ce,we.image[ne])}}}g(y)&&b(s.TEXTURE_CUBE_MAP),ie.__version=q.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function ge(C,y,B,H,q,ie){let ae=r.convert(B.format,B.colorSpace),K=r.convert(B.type),Q=v(B.internalFormat,ae,K,B.normalized,B.colorSpace),le=n.get(y),Te=n.get(B);if(Te.__renderTarget=y,!le.__hasExternalTextures){let oe=Math.max(1,y.width>>ie),se=Math.max(1,y.height>>ie);q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?t.texImage3D(q,ie,Q,oe,se,y.depth,0,ae,K,null):t.texImage2D(q,ie,Q,oe,se,0,ae,K,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),yt(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,H,q,Te.__webglTexture,0,ft(y)):(q===s.TEXTURE_2D||q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,H,q,Te.__webglTexture,ie),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Oe(C,y,B){if(s.bindRenderbuffer(s.RENDERBUFFER,C),y.depthBuffer){let H=y.depthTexture,q=H&&H.isDepthTexture?H.type:null,ie=M(y.stencilBuffer,q),ae=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;yt(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft(y),ie,y.width,y.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft(y),ie,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,ie,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ae,s.RENDERBUFFER,C)}else{let H=y.textures;for(let q=0;q<H.length;q++){let ie=H[q],ae=r.convert(ie.format,ie.colorSpace),K=r.convert(ie.type),Q=v(ie.internalFormat,ae,K,ie.normalized,ie.colorSpace);yt(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft(y),Q,y.width,y.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft(y),Q,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,Q,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function bt(C,y,B){let H=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(y.depthTexture);if(q.__renderTarget=y,(!q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H){if(q.__webglInit===void 0&&(q.__webglInit=!0,y.depthTexture.addEventListener("dispose",A)),q.__webglTexture===void 0){q.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),We(s.TEXTURE_CUBE_MAP,y.depthTexture);let le=r.convert(y.depthTexture.format),Te=r.convert(y.depthTexture.type),oe;y.depthTexture.format===$n?oe=s.DEPTH_COMPONENT24:y.depthTexture.format===ai&&(oe=s.DEPTH24_STENCIL8);for(let se=0;se<6;se++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,oe,y.width,y.height,0,le,Te,null)}}else te(y.depthTexture,0);let ie=q.__webglTexture,ae=ft(y),K=H?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,Q=y.depthTexture.format===ai?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===$n)yt(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,K,ie,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,Q,K,ie,0);else if(y.depthTexture.format===ai)yt(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,K,ie,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,Q,K,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(C){let y=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let H=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),H){let q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,H.removeEventListener("dispose",q)};H.addEventListener("dispose",q),y.__depthDisposeCallback=q}y.__boundDepthTexture=H}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let H=0;H<6;H++)bt(y.__webglFramebuffer[H],C,H);else{let H=C.texture.mipmaps;H&&H.length>0?bt(y.__webglFramebuffer[0],C,0):bt(y.__webglFramebuffer,C,0)}else if(B){y.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[H]),y.__webglDepthbuffer[H]===void 0)y.__webglDepthbuffer[H]=s.createRenderbuffer(),Oe(y.__webglDepthbuffer[H],C,!1);else{let q=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ie=y.__webglDepthbuffer[H];s.bindRenderbuffer(s.RENDERBUFFER,ie),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,ie)}}else{let H=C.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),Oe(y.__webglDepthbuffer,C,!1);else{let q=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ie=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ie),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,ie)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Je(C,y,B){let H=n.get(C);y!==void 0&&ge(H.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&Be(C)}function nt(C){let y=C.texture,B=n.get(C),H=n.get(y);C.addEventListener("dispose",x);let q=C.textures,ie=C.isWebGLCubeRenderTarget===!0,ae=q.length>1;if(ae||(H.__webglTexture===void 0&&(H.__webglTexture=s.createTexture()),H.__version=y.version,o.memory.textures++),ie){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let Q=0;Q<y.mipmaps.length;Q++)B.__webglFramebuffer[K][Q]=s.createFramebuffer()}else B.__webglFramebuffer[K]=s.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<y.mipmaps.length;K++)B.__webglFramebuffer[K]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(ae)for(let K=0,Q=q.length;K<Q;K++){let le=n.get(q[K]);le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture(),o.memory.textures++)}if(C.samples>0&&yt(C)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<q.length;K++){let Q=q[K];B.__webglColorRenderbuffer[K]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[K]);let le=r.convert(Q.format,Q.colorSpace),Te=r.convert(Q.type),oe=v(Q.internalFormat,le,Te,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),se=ft(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,se,oe,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.RENDERBUFFER,B.__webglColorRenderbuffer[K])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Oe(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){t.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture),We(s.TEXTURE_CUBE_MAP,y);for(let K=0;K<6;K++)if(y.mipmaps&&y.mipmaps.length>0)for(let Q=0;Q<y.mipmaps.length;Q++)ge(B.__webglFramebuffer[K][Q],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else ge(B.__webglFramebuffer[K],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);g(y)&&b(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let K=0,Q=q.length;K<Q;K++){let le=q[K],Te=n.get(le),oe=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(oe,Te.__webglTexture),We(oe,le),ge(B.__webglFramebuffer,C,le,s.COLOR_ATTACHMENT0+K,oe,0),g(le)&&b(oe)}t.unbindTexture()}else{let K=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(K,H.__webglTexture),We(K,y),y.mipmaps&&y.mipmaps.length>0)for(let Q=0;Q<y.mipmaps.length;Q++)ge(B.__webglFramebuffer[Q],C,y,s.COLOR_ATTACHMENT0,K,Q);else ge(B.__webglFramebuffer,C,y,s.COLOR_ATTACHMENT0,K,0);g(y)&&b(K),t.unbindTexture()}C.depthBuffer&&Be(C)}function He(C){let y=C.textures;for(let B=0,H=y.length;B<H;B++){let q=y[B];if(g(q)){let ie=T(C),ae=n.get(q).__webglTexture;t.bindTexture(ie,ae),b(ie),t.unbindTexture()}}}let ht=[],Tt=[];function Wt(C){if(C.samples>0){if(yt(C)===!1){let y=C.textures,B=C.width,H=C.height,q=s.COLOR_BUFFER_BIT,ie=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=n.get(C),K=y.length>1;if(K)for(let le=0;le<y.length;le++)t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);let Q=C.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let le=0;le<y.length;le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(q|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(q|=s.STENCIL_BUFFER_BIT)),K){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Te=n.get(y[le]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Te,0)}s.blitFramebuffer(0,0,B,H,0,0,B,H,q,s.NEAREST),c===!0&&(ht.length=0,Tt.length=0,ht.push(s.COLOR_ATTACHMENT0+le),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ht.push(ie),Tt.push(ie),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Tt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),K)for(let le=0;le<y.length;le++){t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Te=n.get(y[le]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,Te,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function ft(C){return Math.min(i.maxSamples,C.samples)}function yt(C){let y=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function U(C){let y=o.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function Ut(C,y){let B=C.colorSpace,H=C.format,q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==rn&&B!==Ri&&(ze.getTransfer(B)===et?(H!==cn||q!==en)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",B)),y}function $e(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Y,this.resetTextureUnits=O,this.getTextureUnits=L,this.setTextureUnits=V,this.setTexture2D=te,this.setTexture2DArray=G,this.setTexture3D=$,this.setTextureCube=ee,this.rebindTextures=Je,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=yt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Kv(s,e){function t(n,i=Ri){let r,o=ze.getTransfer(i);if(n===en)return s.UNSIGNED_BYTE;if(n===bl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===wl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Fh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Oh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nh)return s.BYTE;if(n===Uh)return s.SHORT;if(n===cr)return s.UNSIGNED_SHORT;if(n===Sl)return s.INT;if(n===Wn)return s.UNSIGNED_INT;if(n===Sn)return s.FLOAT;if(n===kt)return s.HALF_FLOAT;if(n===Bh)return s.ALPHA;if(n===zh)return s.RGB;if(n===cn)return s.RGBA;if(n===$n)return s.DEPTH_COMPONENT;if(n===ai)return s.DEPTH_STENCIL;if(n===Tl)return s.RED;if(n===El)return s.RED_INTEGER;if(n===qi)return s.RG;if(n===Al)return s.RG_INTEGER;if(n===Rl)return s.RGBA_INTEGER;if(n===ko||n===Ho||n===Vo||n===Go)if(o===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ko)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ho)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Go)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cl||n===Pl||n===Il||n===Ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Dl||n===Nl||n===Ul||n===Fl||n===Ol||n===Wo||n===Bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Dl||n===Nl)return o===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ul)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Fl)return r.COMPRESSED_R11_EAC;if(n===Ol)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Wo)return r.COMPRESSED_RG11_EAC;if(n===Bl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===zl||n===kl||n===Hl||n===Vl||n===Gl||n===Wl||n===Xl||n===ql||n===Yl||n===Zl||n===Kl||n===Jl||n===jl||n===$l)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Hl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Gl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ql)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Kl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jl)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$l)return o===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ql||n===ec||n===tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ql)return o===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nc||n===ic||n===Xo||n===sc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===nc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var Jv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,lu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ro(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new St({vertexShader:Jv,fragmentShader:jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new go(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cu=class extends Qn{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null,_=typeof XRWebGLBinding<"u",m=new lu,g={},b=t.getContextAttributes(),T=null,v=null,M=[],S=[],A=new re,x=null,E=null,R=new Bt;R.viewport=new lt;let I=new Bt;I.viewport=new lt;let D=[R,I],O=new gl,L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=M[X];return J===void 0&&(J=new qs,M[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=M[X];return J===void 0&&(J=new qs,M[X]=J),J.getGripSpace()},this.getHand=function(X){let J=M[X];return J===void 0&&(J=new qs,M[X]=J),J.getHandSpace()};function Y(X){let J=S.indexOf(X.inputSource);if(J===-1)return;let fe=M[J];fe!==void 0&&(fe.update(X.inputSource,X.frame,l||o),fe.dispatchEvent({type:X.type,data:X.inputSource}))}function Z(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",te);for(let X=0;X<M.length;X++){let J=S[X];J!==null&&(S[X]=null,M[X].disconnect(J))}L=null,V=null,m.reset();for(let X in g)delete g[X];if(e.setRenderTarget(T),f=null,d=null,u=null,i=null,v=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),E!==null){let X=E.camera;X.fov=E.fov,X.zoom=E.zoom,X.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(T=e.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",te),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Le=null,ge=null;b.depth&&(ge=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=b.stencil?ai:$n,Le=b.stencil?Xi:Wn);let Oe={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new It(d.textureWidth,d.textureHeight,{format:cn,type:en,depthTexture:new ni(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let fe={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,fe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new It(f.framebufferWidth,f.framebufferHeight,{format:cn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Ke.setContext(i),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(X){for(let J=0;J<X.removed.length;J++){let fe=X.removed[J],Le=S.indexOf(fe);Le>=0&&(S[Le]=null,M[Le].disconnect(fe))}for(let J=0;J<X.added.length;J++){let fe=X.added[J],Le=S.indexOf(fe);if(Le===-1){for(let Oe=0;Oe<M.length;Oe++)if(Oe>=S.length){S.push(fe),Le=Oe;break}else if(S[Oe]===null){S[Oe]=fe,Le=Oe;break}if(Le===-1)break}let ge=M[Le];ge&&ge.connect(fe)}}let G=new P,$=new P;function ee(X,J,fe){G.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(fe.matrixWorld);let Le=G.distanceTo($),ge=J.projectionMatrix.elements,Oe=fe.projectionMatrix.elements,bt=ge[14]/(ge[10]-1),Be=ge[14]/(ge[10]+1),Je=(ge[9]+1)/ge[5],nt=(ge[9]-1)/ge[5],He=(ge[8]-1)/ge[0],ht=(Oe[8]+1)/Oe[0],Tt=bt*He,Wt=bt*ht,ft=Le/(-He+ht),yt=ft*-He;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(yt),X.translateZ(ft),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ge[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let U=bt+ft,Ut=Be+ft,$e=Tt-yt,C=Wt+(Le-yt),y=Je*Be/Ut*U,B=nt*Be/Ut*U;X.projectionMatrix.makePerspective($e,C,y,B,U,Ut),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Se(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let J=X.near,fe=X.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),O.near=I.near=R.near=J,O.far=I.far=R.far=fe,(L!==O.near||V!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),L=O.near,V=O.far),O.layers.mask=X.layers.mask|6,R.layers.mask=O.layers.mask&-5,I.layers.mask=O.layers.mask&-3;let Le=X.parent,ge=O.cameras;Se(O,Le);for(let Oe=0;Oe<ge.length;Oe++)Se(ge[Oe],Le);ge.length===2?ee(O,R,I):O.projectionMatrix.copy(R.projectionMatrix),E===null&&X.isPerspectiveCamera&&(E={camera:X,fov:X.fov,zoom:X.zoom}),be(X,O,Le)};function be(X,J,fe){fe===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(fe.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=rs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(X){return g[X]};let tt=null;function We(X,J){if(h=J.getViewerPose(l||o),p=J,h!==null){let fe=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Le=!1;fe.length!==O.cameras.length&&(O.cameras.length=0,Le=!0);for(let Be=0;Be<fe.length;Be++){let Je=fe[Be],nt=null;if(f!==null)nt=f.getViewport(Je);else{let ht=u.getViewSubImage(d,Je);nt=ht.viewport,Be===0&&(e.setRenderTargetTextures(v,ht.colorTexture,ht.depthStencilTexture),e.setRenderTarget(v))}let He=D[Be];He===void 0&&(He=new Bt,He.layers.enable(Be),He.viewport=new lt,D[Be]=He),He.matrix.fromArray(Je.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Je.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(nt.x,nt.y,nt.width,nt.height),Be===0&&(O.matrix.copy(He.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Le===!0&&O.cameras.push(He)}let ge=i.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let Be=u.getDepthInformation(fe[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,i.renderState)}if(ge&&ge.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let Be=0;Be<fe.length;Be++){let Je=fe[Be].camera;if(Je){let nt=g[Je];nt||(nt=new ro,g[Je]=nt);let He=u.getCameraImage(Je);nt.sourceTexture=He}}}}for(let fe=0;fe<M.length;fe++){let Le=S[fe],ge=M[fe];Le!==null&&ge!==void 0&&ge.update(Le,J,l||o)}tt&&tt(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),p=null}let Ke=new np;Ke.setAnimationLoop(We),this.setAnimationLoop=function(X){tt=X},this.dispose=function(){}}},$v=new De,lp=new Fe;lp.set(-1,0,0,0,1,0,0,0,1);function Qv(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Xh(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,b,T,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,v)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,b,T):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Zt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Zt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let b=e.get(g),T=b.envMap,v=b.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4($v.makeRotationFromEuler(v)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(lp),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,b,T){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*b,m.scale.value=T*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,b){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Zt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let b=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ey(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){let S=M.program;n.uniformBlockBinding(v,S)}function l(v,M){let S=i[v.id];S===void 0&&(m(v),S=h(v),i[v.id]=S,v.addEventListener("dispose",b));let A=M.program;n.updateUBOMapping(v,A);let x=e.render.frame;r[v.id]!==x&&(d(v),r[v.id]=x)}function h(v){let M=u();v.__bindingPointIndex=M;let S=s.createBuffer(),A=v.__size,x=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,A,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,S),S}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let M=i[v.id],S=v.uniforms,A=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let x=0,E=S.length;x<E;x++){let R=S[x];if(Array.isArray(R))for(let I=0,D=R.length;I<D;I++)f(R[I],x,I,A);else f(R,x,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,M,S,A){if(_(v,M,S,A)===!0){let x=v.__offset,E=v.value;if(Array.isArray(E)){let R=0;for(let I=0;I<E.length;I++){let D=E[I],O=g(D);p(D,v.__data,R),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(R+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,v.__data)}}function p(v,M,S){typeof v=="number"||typeof v=="boolean"?M[0]=v:v.isMatrix3?(M[0]=v.elements[0],M[1]=v.elements[1],M[2]=v.elements[2],M[3]=0,M[4]=v.elements[3],M[5]=v.elements[4],M[6]=v.elements[5],M[7]=0,M[8]=v.elements[6],M[9]=v.elements[7],M[10]=v.elements[8],M[11]=0):ArrayBuffer.isView(v)?M.set(new v.constructor(v.buffer,v.byteOffset,M.length)):v.toArray(M,S)}function _(v,M,S,A){let x=v.value,E=M+"_"+S;if(A[E]===void 0)return typeof x=="number"||typeof x=="boolean"?A[E]=x:ArrayBuffer.isView(x)?A[E]=x.slice():A[E]=x.clone(),!0;{let R=A[E];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return A[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(v){let M=v.uniforms,S=0,A=16;for(let E=0,R=M.length;E<R;E++){let I=Array.isArray(M[E])?M[E]:[M[E]];for(let D=0,O=I.length;D<O;D++){let L=I[D],V=Array.isArray(L.value)?L.value:[L.value];for(let Y=0,Z=V.length;Y<Z;Y++){let te=V[Y],G=g(te),$=S%A,ee=$%G.boundary,Se=$+ee;S+=ee,Se!==0&&A-Se<G.storage&&(S+=A-Se),L.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=S,S+=G.storage}}}let x=S%A;return x>0&&(S+=A-x),v.__size=S,v.__cache={},this}function g(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",v),M}function b(v){let M=v.target;M.removeEventListener("dispose",b);let S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function T(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:T}}var ty=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),li=null;function ny(){return li===null&&(li=new ei(ty,16,16,qi,kt),li.name="DFG_LUT",li.minFilter=Pt,li.magFilter=Pt,li.wrapS=Rn,li.wrapT=Rn,li.generateMipmaps=!1,li.needsUpdate=!0),li}var cc=class{constructor(e={}){let{canvas:t=wf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=en}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,m=new Set([Rl,Al,El]),g=new Set([en,Wn,cr,Xi,bl,wl]),b=new Uint32Array(4),T=new Int32Array(4),v=new P,M=null,S=null,A=[],x=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,D=null,O=null,L=null,V=null;this._outputColorSpace=Ct;let Y=0,Z=0,te=null,G=-1,$=null,ee=new lt,Se=new lt,be=null,tt=new Ie(0),We=0,Ke=t.width,X=t.height,J=1,fe=null,Le=null,ge=new lt(0,0,Ke,X),Oe=new lt(0,0,Ke,X),bt=!1,Be=new Js,Je=!1,nt=!1,He=new De,ht=new P,Tt=new lt,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ft=!1;function yt(){return te===null?J:1}let U=n;function Ut(w,N){return t.getContext(w,N)}let $e,C,y,B,H,q,ie,ae,K,Q,le,Te,oe,se,ve,Ce,Ue,F,ce,j,he,me,ne;try{let w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",xt,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",Dn,!1),U===null){let N="webgl2";if(U=Ut(N,w),U===null)throw Ut(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pe()}catch(w){throw t.removeEventListener("webglcontextlost",xt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Dn,!1),Ne("WebGLRenderer: "+w.message),w}function Pe(){$e=new c_(U),$e.init(),he=new Kv(U,$e),C=new Qx(U,$e,e,he),y=new Yv(U,$e),C.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),O=U.createFramebuffer(),L=U.createFramebuffer(),V=U.createFramebuffer(),B=new d_(U),H=new Dv,q=new Zv(U,$e,y,H,C,he,B),ie=new l_(R),ae=new pg(U),me=new jx(U,ae),K=new h_(U,ae,B,me),Q=new p_(U,K,ae,me,B),F=new f_(U,C,q),ve=new e_(H),le=new Lv(R,ie,$e,C,me,ve),Te=new Qv(R,H),oe=new Uv,se=new Hv($e),Ue=new Jx(R,ie,y,Q,p,c),Ce=new qv(R,Q,C),ne=new ey(U,B,C,y),ce=new $x(U,$e,B),j=new u_(U,$e,B),B.programs=le.programs,R.capabilities=C,R.extensions=$e,R.properties=H,R.renderLists=oe,R.shadowMap=Ce,R.state=y,R.info=B}_!==en&&(E=new g_(_,t.width,t.height,a,i,r));let we=new cu(R,U);this.xr=we,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let w=$e.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=$e.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(w){w!==void 0&&(J=w,this.setSize(Ke,X,!1))},this.getSize=function(w){return w.set(Ke,X)},this.setSize=function(w,N,W=!0){if(we.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}Ke=w,X=N,t.width=Math.floor(w*J),t.height=Math.floor(N*J),W===!0&&(t.style.width=w+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(Ke*J,X*J).floor()},this.setDrawingBufferSize=function(w,N,W){Ke=w,X=N,J=W,t.width=Math.floor(w*W),t.height=Math.floor(N*W),this.setViewport(0,0,w,N)},this.setEffects=function(w){if(_===en){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let N=0;N<w.length;N++)if(w[N].isOutputPass===!0){Ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ee)},this.getViewport=function(w){return w.copy(ge)},this.setViewport=function(w,N,W,z){w.isVector4?ge.set(w.x,w.y,w.z,w.w):ge.set(w,N,W,z),y.viewport(ee.copy(ge).multiplyScalar(J).round())},this.getScissor=function(w){return w.copy(Oe)},this.setScissor=function(w,N,W,z){w.isVector4?Oe.set(w.x,w.y,w.z,w.w):Oe.set(w,N,W,z),y.scissor(Se.copy(Oe).multiplyScalar(J).round())},this.getScissorTest=function(){return bt},this.setScissorTest=function(w){y.setScissorTest(bt=w)},this.setOpaqueSort=function(w){fe=w},this.setTransparentSort=function(w){Le=w},this.getClearColor=function(w){return w.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,W=!0){let z=0;if(w){let k=!1;if(te!==null){let pe=te.texture.format;k=m.has(pe)}if(k){let pe=te.texture.type,_e=g.has(pe),de=Ue.getClearColor(),ye=Ue.getClearAlpha(),Ee=de.r,Ve=de.g,Ze=de.b;_e?(b[0]=Ee,b[1]=Ve,b[2]=Ze,b[3]=ye,U.clearBufferuiv(U.COLOR,0,b)):(T[0]=Ee,T[1]=Ve,T[2]=Ze,T[3]=ye,U.clearBufferiv(U.COLOR,0,T))}else z|=U.COLOR_BUFFER_BIT}N&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),D=w},this.dispose=function(){t.removeEventListener("webglcontextlost",xt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Dn,!1),Ue.dispose(),oe.dispose(),se.dispose(),H.dispose(),ie.dispose(),Q.dispose(),me.dispose(),ne.dispose(),le.dispose(),we.dispose(),we.removeEventListener("sessionstart",Zu),we.removeEventListener("sessionend",Ku),ji.stop()};function xt(w){w.preventDefault(),Zr("WebGLRenderer: Context Lost."),I=!0}function it(){Zr("WebGLRenderer: Context Restored."),I=!1;let w=B.autoReset,N=Ce.enabled,W=Ce.autoUpdate,z=Ce.needsUpdate,k=Ce.type;Pe(),B.autoReset=w,Ce.enabled=N,Ce.autoUpdate=W,Ce.needsUpdate=z,Ce.type=k}function Dn(w){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Zn(w){let N=w.target;N.removeEventListener("dispose",Zn),Ip(N)}function Ip(w){Lp(w),H.remove(w)}function Lp(w){let N=H.get(w).programs;N!==void 0&&(N.forEach(function(W){le.releaseProgram(W)}),w.isShaderMaterial&&le.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,W,z,k,pe){N===null&&(N=Wt);let _e=k.isMesh&&k.matrixWorld.determinantAffine()<0,de=Up(w,N,W,z,k);y.setMaterial(z,_e);let ye=W.index,Ee=1;if(z.wireframe===!0){if(ye=K.getWireframeAttribute(W),ye===void 0)return;Ee=2}let Ve=W.drawRange,Ze=W.attributes.position,Me=Ve.start*Ee,st=(Ve.start+Ve.count)*Ee;pe!==null&&(Me=Math.max(Me,pe.start*Ee),st=Math.min(st,(pe.start+pe.count)*Ee)),ye!==null?(Me=Math.max(Me,0),st=Math.min(st,ye.count)):Ze!=null&&(Me=Math.max(Me,0),st=Math.min(st,Ze.count));let Ft=st-Me;if(Ft<0||Ft===1/0)return;me.setup(k,z,de,W,ye);let vt,pt=ce;if(ye!==null&&(vt=ae.get(ye),pt=j,pt.setIndex(vt)),k.isMesh)z.wireframe===!0?(y.setLineWidth(z.wireframeLinewidth*yt()),pt.setMode(U.LINES)):pt.setMode(U.TRIANGLES);else if(k.isLine){let Jt=z.linewidth;Jt===void 0&&(Jt=1),y.setLineWidth(Jt*yt()),k.isLineSegments?pt.setMode(U.LINES):k.isLineLoop?pt.setMode(U.LINE_LOOP):pt.setMode(U.LINE_STRIP)}else k.isPoints?pt.setMode(U.POINTS):k.isSprite&&pt.setMode(U.TRIANGLES);if(k.isBatchedMesh)if($e.get("WEBGL_multi_draw"))pt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Jt=k._multiDrawStarts,xe=k._multiDrawCounts,nn=k._multiDrawCount,Qe=ye?ae.get(ye).bytesPerElement:1,En=H.get(z).currentProgram.getUniforms();for(let Kn=0;Kn<nn;Kn++)En.setValue(U,"_gl_DrawID",Kn),pt.render(Jt[Kn]/Qe,xe[Kn])}else if(k.isInstancedMesh)pt.renderInstances(Me,Ft,k.count);else if(W.isInstancedBufferGeometry){let Jt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,xe=Math.min(W.instanceCount,Jt);pt.renderInstances(Me,Ft,xe)}else pt.render(Me,Ft)};function Yu(w,N,W,z){D!==null&&w.isNodeMaterial&&D.setObject(z,w),Je===!0&&ve.setState(w,W,!1),w.transparent===!0&&w.side===Et&&w.forceSinglePass===!1?(w.side=Zt,w.needsUpdate=!0,fa(w,N,z),w.side=Pn,w.needsUpdate=!0,fa(w,N,z),w.side=Et):fa(w,N,z)}this.compile=function(w,N,W=null){W===null&&(W=w),D!==null&&D.renderStart(w,N,W),S=se.get(W),S.init(N),x.push(S),W.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(S.pushLight(k),k.castShadow&&S.pushShadow(k))}),w!==W&&w.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(S.pushLight(k),k.castShadow&&S.pushShadow(k))}),S.setupLights(),D!==null&&D.updateLights(S.state.lightsArray),nt=this.localClippingEnabled,Je=ve.init(this.clippingPlanes,nt),Je===!0&&ve.setGlobalState(this.clippingPlanes,N),D!==null&&Ce.render(S.state.shadowsArray,W,N);let z=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let pe=k.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){let de=pe[_e];Yu(de,W,N,k),z.add(de)}else Yu(pe,W,N,k),z.add(pe)}),S=x.pop(),D!==null&&D.renderEnd(),z},this.compileAsync=function(w,N,W=null){let z=this.compile(w,N,W);return new Promise(k=>{function pe(){if(z.forEach(function(_e){let ye=H.get(_e).currentProgram;(ye===void 0||ye.isReady())&&z.delete(_e)}),z.size===0){k(w);return}setTimeout(pe,10)}$e.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Nc=null;function Dp(w){Nc&&Nc(w)}function Zu(){ji.stop()}function Ku(){ji.start()}let ji=new np;ji.setAnimationLoop(Dp),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(w){Nc=w,we.setAnimationLoop(w),w===null?ji.stop():ji.start()},we.addEventListener("sessionstart",Zu),we.addEventListener("sessionend",Ku),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;D!==null&&D.renderStart(w,N);let W=we.enabled===!0&&we.isPresenting===!0,z=E!==null&&(te===null||W)&&E.begin(R,te);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(we.cameraAutoUpdate===!0&&we.updateCamera(N),N=we.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,N,te),S=se.get(w,x.length),S.init(N),S.state.textureUnits=q.getTextureUnits(),x.push(S),He.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Be.setFromProjectionMatrix(He,zn,N.reversedDepth),nt=this.localClippingEnabled,Je=ve.init(this.clippingPlanes,nt),M=oe.get(w,A.length),M.init(),A.push(M),we.enabled===!0&&we.isPresenting===!0){let _e=R.xr.getDepthSensingMesh();_e!==null&&Uc(_e,N,-1/0,R.sortObjects)}Uc(w,N,0,R.sortObjects),M.finish(),D!==null&&D.updateLights(S.state.lightsArray),R.sortObjects===!0&&M.sort(fe,Le),ft=we.enabled===!1||we.isPresenting===!1||we.hasDepthSensing()===!1,ft&&Ue.addToRenderList(M,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Je===!0&&ve.beginShadows();let k=S.state.shadowsArray;if(Ce.render(k,w,N),Je===!0&&ve.endShadows(),(z&&E.hasRenderPass())===!1){let _e=M.opaque,de=M.transmissive;if(S.setupLights(),N.isArrayCamera){let ye=N.cameras;if(de.length>0)for(let Ee=0,Ve=ye.length;Ee<Ve;Ee++){let Ze=ye[Ee];ju(_e,de,w,Ze)}ft&&Ue.render(w);for(let Ee=0,Ve=ye.length;Ee<Ve;Ee++){let Ze=ye[Ee];Ju(M,w,Ze,Ze.viewport)}}else de.length>0&&ju(_e,de,w,N),ft&&Ue.render(w),Ju(M,w,N)}te!==null&&Z===0&&(q.updateMultisampleRenderTarget(te),q.updateRenderTargetMipmap(te)),z&&E.end(R),w.isScene===!0&&w.onAfterRender(R,w,N),me.resetDefaultState(),G=-1,$=null,x.pop(),x.length>0?(S=x[x.length-1],q.setTextureUnits(S.state.textureUnits),Je===!0&&ve.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?M=A[A.length-1]:M=null,D!==null&&D.renderEnd()};function Uc(w,N,W,z){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLightProbeGrid)S.pushLightProbeGrid(w);else if(w.isLight)S.pushLight(w),w.castShadow&&S.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Be)){z&&Tt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(He);let _e=Q.update(w),de=w.material;de.visible&&M.push(w,_e,de,W,Tt.z,null,N)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Be))){let _e=Q.update(w),de=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Tt.copy(w.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Tt.copy(_e.boundingSphere.center)),Tt.applyMatrix4(w.matrixWorld).applyMatrix4(He)),Array.isArray(de)){let ye=_e.groups;for(let Ee=0,Ve=ye.length;Ee<Ve;Ee++){let Ze=ye[Ee],Me=de[Ze.materialIndex];Me&&Me.visible&&M.push(w,_e,Me,W,Tt.z,Ze,N)}}else de.visible&&M.push(w,_e,de,W,Tt.z,null,N)}}let pe=w.children;for(let _e=0,de=pe.length;_e<de;_e++)Uc(pe[_e],N,W,z)}function Ju(w,N,W,z){let{opaque:k,transmissive:pe,transparent:_e}=w;S.setupLightsView(W),Je===!0&&ve.setGlobalState(R.clippingPlanes,W),z&&y.viewport(ee.copy(z)),k.length>0&&da(k,N,W),pe.length>0&&da(pe,N,W),_e.length>0&&da(_e,N,W),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function ju(w,N,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[z.id]===void 0){let Me=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[z.id]=new It(1,1,{generateMipmaps:!0,type:Me?kt:en,minFilter:Gn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ze.workingColorSpace})}let pe=S.state.transmissionRenderTarget[z.id],_e=z.viewport||ee;pe.setSize(_e.z*R.transmissionResolutionScale,_e.w*R.transmissionResolutionScale);let de=R.getRenderTarget(),ye=R.getActiveCubeFace(),Ee=R.getActiveMipmapLevel();R.setRenderTarget(pe),R.getClearColor(tt),We=R.getClearAlpha(),We<1&&R.setClearColor(16777215,.5),R.clear(),ft&&Ue.render(W);let Ve=R.toneMapping;R.toneMapping=Vn;let Ze=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),S.setupLightsView(z),Je===!0&&ve.setGlobalState(R.clippingPlanes,z),da(w,W,z),q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe),$e.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let st=0,Ft=N.length;st<Ft;st++){let vt=N[st],{object:pt,geometry:Jt,material:xe,group:nn}=vt;if(xe.side===Et&&pt.layers.test(z.layers)){let Qe=xe.side;xe.side=Zt,xe.needsUpdate=!0,$u(pt,W,z,Jt,xe,nn),xe.side=Qe,xe.needsUpdate=!0,Me=!0}}Me===!0&&(q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe))}R.setRenderTarget(de,ye,Ee),R.setClearColor(tt,We),Ze!==void 0&&(z.viewport=Ze),R.toneMapping=Ve}function da(w,N,W){let z=N.isScene===!0?N.overrideMaterial:null;for(let k=0,pe=w.length;k<pe;k++){let _e=w[k],{object:de,geometry:ye,group:Ee}=_e,Ve=_e.material;Ve.allowOverride===!0&&z!==null&&(Ve=z),de.layers.test(W.layers)&&$u(de,N,W,ye,Ve,Ee)}}function $u(w,N,W,z,k,pe){D!==null&&k.isNodeMaterial&&D.setObject(w,k),w.onBeforeRender(R,N,W,z,k,pe),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(R,N,W,z,w,pe),k.transparent===!0&&k.side===Et&&k.forceSinglePass===!1?(k.side=Zt,k.needsUpdate=!0,R.renderBufferDirect(W,N,z,k,w,pe),k.side=Pn,k.needsUpdate=!0,R.renderBufferDirect(W,N,z,k,w,pe),k.side=Et):R.renderBufferDirect(W,N,z,k,w,pe),w.onAfterRender(R,N,W,z,k,pe)}function fa(w,N,W){N.isScene!==!0&&(N=Wt);let z=H.get(w),k=S.state.lights,pe=S.state.shadowsArray,_e=k.state.version,de=le.getParameters(w,k.state,pe,N,W,S.state.lightProbeGridArray),ye=le.getProgramCacheKey(de),Ee=z.programs;z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;let Ve=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;z.envMap=ie.get(w.envMap||z.environment,Ve),z.envMapRotation=z.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Ee===void 0&&(w.addEventListener("dispose",Zn),Ee=new Map,z.programs=Ee);let Ze=Ee.get(ye);if(Ze!==void 0){if(z.currentProgram===Ze&&z.lightsStateVersion===_e)return ed(w,de),Ze}else de.uniforms=le.getUniforms(w),D!==null&&w.isNodeMaterial&&D.build(w,W,de),w.onBeforeCompile(de,R),Ze=le.acquireProgram(de,ye),Ee.set(ye,Ze),z.uniforms=de.uniforms;let Me=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Me.clippingPlanes=ve.uniform),ed(w,de),z.needsLights=Op(w),z.lightsStateVersion=_e,z.needsLights&&(Me.ambientLightColor.value=k.state.ambient,Me.lightProbe.value=k.state.probe,Me.sunLights.value=k.state.sun,Me.sunLightShadows.value=k.state.sunShadow,Me.directionalLights.value=k.state.directional,Me.directionalLightShadows.value=k.state.directionalShadow,Me.spotLights.value=k.state.spot,Me.spotLightShadows.value=k.state.spotShadow,Me.rectAreaLights.value=k.state.rectArea,Me.ltc_1.value=k.state.rectAreaLTC1,Me.ltc_2.value=k.state.rectAreaLTC2,Me.pointLights.value=k.state.point,Me.pointLightShadows.value=k.state.pointShadow,Me.hemisphereLights.value=k.state.hemi,Me.sunShadowMatrix.value=k.state.sunShadowMatrix,Me.sunShadowCascade.value=k.state.sunShadowCascade,Me.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Me.spotLightMatrix.value=k.state.spotLightMatrix,Me.spotLightMap.value=k.state.spotLightMap,Me.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=S.state.lightProbeGridArray.length>0,z.currentProgram=Ze,z.uniformsList=null,Ze}function Qu(w){if(w.uniformsList===null){let N=w.currentProgram.getUniforms();w.uniformsList=fr.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function ed(w,N){let W=H.get(w);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function Np(w,N){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;v.setFromMatrixPosition(N.matrixWorld);for(let W=0,z=w.length;W<z;W++){let k=w[W];if(k.texture!==null&&k.boundingBox.containsPoint(v))return k}return null}function Up(w,N,W,z,k){N.isScene!==!0&&(N=Wt),q.resetTextureUnits();let pe=N.fog,_e=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,de=te===null?R.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:ze.workingColorSpace,ye=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ee=ie.get(z.envMap||_e,ye),Ve=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ze=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Me=!!W.morphAttributes.position,st=!!W.morphAttributes.normal,Ft=!!W.morphAttributes.color,vt=Vn;z.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(vt=R.toneMapping);let pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Jt=pt!==void 0?pt.length:0,xe=H.get(z),nn=S.state.lights;if(Je===!0&&(nt===!0||w!==$)){let _t=w===$&&z.id===G;ve.setState(z,w,_t)}let Qe=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==nn.state.version||xe.outputColorSpace!==de||k.isBatchedMesh&&xe.batching===!1||!k.isBatchedMesh&&xe.batching===!0||k.isBatchedMesh&&xe.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&xe.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&xe.instancing===!1||!k.isInstancedMesh&&xe.instancing===!0||k.isSkinnedMesh&&xe.skinning===!1||!k.isSkinnedMesh&&xe.skinning===!0||k.isInstancedMesh&&xe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&xe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&xe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&xe.instancingMorph===!1&&k.morphTexture!==null||xe.envMap!==Ee||z.fog===!0&&xe.fog!==pe||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==ve.numPlanes||xe.numIntersection!==ve.numIntersection)||xe.vertexAlphas!==Ve||xe.vertexTangents!==Ze||xe.morphTargets!==Me||xe.morphNormals!==st||xe.morphColors!==Ft||xe.toneMapping!==vt||xe.morphTargetsCount!==Jt||!!xe.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,xe.__version=z.version);let En=xe.currentProgram;Qe===!0&&(En=fa(z,N,k),D&&z.isNodeMaterial&&D.onUpdateProgram(z,En,xe));let Kn=!1,Ii=!1,Ms=!1,ut=En.getUniforms(),Rt=xe.uniforms;if(y.useProgram(En.program)&&(Kn=!0,Ii=!0,Ms=!0),z.id!==G&&(G=z.id,Ii=!0),xe.needsLights){let _t=Np(S.state.lightProbeGridArray,k);xe.lightProbeGrid!==_t&&(xe.lightProbeGrid=_t,Ii=!0)}if(Kn||$!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ut.setValue(U,"projectionMatrix",w.projectionMatrix),ut.setValue(U,"viewMatrix",w.matrixWorldInverse);let Di=ut.map.cameraPosition;Di!==void 0&&Di.setValue(U,ht.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&ut.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),$!==w&&($=w,Ii=!0,Ms=!0)}if(xe.needsLights&&(nn.state.sunShadowMap.length>0&&ut.setValue(U,"sunShadowMap",nn.state.sunShadowMap,q),nn.state.directionalShadowMap.length>0&&ut.setValue(U,"directionalShadowMap",nn.state.directionalShadowMap,q),nn.state.spotShadowMap.length>0&&ut.setValue(U,"spotShadowMap",nn.state.spotShadowMap,q),nn.state.pointShadowMap.length>0&&ut.setValue(U,"pointShadowMap",nn.state.pointShadowMap,q)),k.isSkinnedMesh){ut.setOptional(U,k,"bindMatrix"),ut.setOptional(U,k,"bindMatrixInverse");let _t=k.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),ut.setValue(U,"boneTexture",_t.boneTexture,q))}k.isBatchedMesh&&(ut.setOptional(U,k,"batchingTexture"),ut.setValue(U,"batchingTexture",k._matricesTexture,q),ut.setOptional(U,k,"batchingIdTexture"),ut.setValue(U,"batchingIdTexture",k._indirectTexture,q),ut.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&ut.setValue(U,"batchingColorTexture",k._colorsTexture,q));let Li=W.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&F.update(k,W,En),(Ii||xe.receiveShadow!==k.receiveShadow)&&(xe.receiveShadow=k.receiveShadow,ut.setValue(U,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(Rt.envMapIntensity.value=N.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=ny()),Ii){if(ut.setValue(U,"toneMappingExposure",R.toneMappingExposure),xe.needsLights&&Fp(Rt,Ms),pe&&z.fog===!0&&Te.refreshFogUniforms(Rt,pe),Te.refreshMaterialUniforms(Rt,z,J,X,S.state.transmissionRenderTarget[w.id]),xe.needsLights&&xe.lightProbeGrid){let _t=xe.lightProbeGrid;Rt.probesSH.value=_t.texture,Rt.probesMin.value.copy(_t.boundingBox.min),Rt.probesMax.value.copy(_t.boundingBox.max),Rt.probesResolution.value.copy(_t.resolution)}fr.upload(U,Qu(xe),Rt,q)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(fr.upload(U,Qu(xe),Rt,q),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(U,"center",k.center),ut.setValue(U,"modelViewMatrix",k.modelViewMatrix),ut.setValue(U,"normalMatrix",k.normalMatrix),ut.setValue(U,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){let _t=z.uniformsGroups;for(let Di=0,Ss=_t.length;Di<Ss;Di++){let nd=_t[Di];ne.update(nd,En),ne.bind(nd,En)}}return En}function Fp(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.sunLights.needsUpdate=N,w.sunLightShadows.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function Op(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(w,N,W){let z=H.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(w.texture).__webglTexture=N,H.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){let W=H.get(w);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,W=0){te=w,Y=N,Z=W;let z=null,k=!1,pe=!1;if(w){let de=H.get(w);if(de.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(U.FRAMEBUFFER,de.__webglFramebuffer),ee.copy(w.viewport),Se.copy(w.scissor),be=w.scissorTest,y.viewport(ee),y.scissor(Se),y.setScissorTest(be),G=-1;return}else if(de.__webglFramebuffer===void 0)q.setupRenderTarget(w);else if(de.__hasExternalTextures)q.rebindTextures(w,H.get(w.texture).__webglTexture,H.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Ve=w.depthTexture;if(de.__boundDepthTexture!==Ve){if(Ve!==null&&H.has(Ve)&&(w.width!==Ve.image.width||w.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(w)}}let ye=w.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(pe=!0);let Ee=H.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ee[N])?z=Ee[N][W]:z=Ee[N],k=!0):w.samples>0&&q.useMultisampledRTT(w)===!1?z=H.get(w).__webglMultisampledFramebuffer:Array.isArray(Ee)?z=Ee[W]:z=Ee,ee.copy(w.viewport),Se.copy(w.scissor),be=w.scissorTest}else ee.copy(ge).multiplyScalar(J).floor(),Se.copy(Oe).multiplyScalar(J).floor(),be=bt;if(W!==0&&(z=O),y.bindFramebuffer(U.FRAMEBUFFER,z)&&y.drawBuffers(w,z),y.viewport(ee),y.scissor(Se),y.setScissorTest(be),k){let de=H.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,de.__webglTexture,W)}else if(pe){let de=N;for(let ye=0;ye<w.textures.length;ye++){let Ee=H.get(w.textures[ye]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ye,Ee.__webglTexture,W,de)}}else if(w!==null&&W!==0){let de=H.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,de.__webglTexture,W)}G=-1};function td(w){let N=H.get(w);return(N.__readFormat!==w.format||N.__readType!==w.type)&&(N.__readFormat=w.format,N.__readType=w.type,N.__formatReadable=C.textureFormatReadable(w.format),N.__typeReadable=C.textureTypeReadable(w.type)),N}this.readRenderTargetPixels=function(w,N,W,z,k,pe,_e,de=0){if(!(w&&w.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=H.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye){y.bindFramebuffer(U.FRAMEBUFFER,ye);try{let Ee=w.textures[de],Ve=Ee.format,Ze=Ee.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+de);let Me=td(Ee);if(Me.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Me.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-z&&W>=0&&W<=w.height-k&&U.readPixels(N,W,z,k,he.convert(Ve),he.convert(Ze),pe)}finally{let Ee=te!==null?H.get(te).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(w,N,W,z,k,pe,_e,de=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=H.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye)if(N>=0&&N<=w.width-z&&W>=0&&W<=w.height-k){y.bindFramebuffer(U.FRAMEBUFFER,ye);let Ee=w.textures[de],Ve=Ee.format,Ze=Ee.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+de);let Me=td(Ee);if(Me.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Me.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,st),U.bufferData(U.PIXEL_PACK_BUFFER,pe.byteLength,U.STREAM_READ),U.readPixels(N,W,z,k,he.convert(Ve),he.convert(Ze),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ft=te!==null?H.get(te).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Ft);let vt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ef(U,vt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,st),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pe),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(st),U.deleteSync(vt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,W=0){let z=Math.pow(2,-W),k=Math.floor(w.image.width*z),pe=Math.floor(w.image.height*z),_e=N!==null?N.x:0,de=N!==null?N.y:0;q.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,_e,de,k,pe),y.unbindTexture()},this.copyTextureToTexture=function(w,N,W=null,z=null,k=0,pe=0){let _e,de,ye,Ee,Ve,Ze,Me,st,Ft,vt=w.isCompressedTexture?w.mipmaps[pe]:w.image;if(W!==null)_e=W.max.x-W.min.x,de=W.max.y-W.min.y,ye=W.isBox3?W.max.z-W.min.z:1,Ee=W.min.x,Ve=W.min.y,Ze=W.isBox3?W.min.z:0;else{let Rt=Math.pow(2,-k);_e=Math.floor(vt.width*Rt),de=Math.floor(vt.height*Rt),w.isDataArrayTexture?ye=vt.depth:w.isData3DTexture?ye=Math.floor(vt.depth*Rt):ye=1,Ee=0,Ve=0,Ze=0}z!==null?(Me=z.x,st=z.y,Ft=z.z):(Me=0,st=0,Ft=0);let pt=he.convert(N.format),Jt=he.convert(N.type),xe;N.isData3DTexture?(q.setTexture3D(N,0),xe=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(q.setTexture2DArray(N,0),xe=U.TEXTURE_2D_ARRAY):(q.setTexture2D(N,0),xe=U.TEXTURE_2D),y.activeTexture(U.TEXTURE0),y.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),y.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),y.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);let nn=y.getParameter(U.UNPACK_ROW_LENGTH),Qe=y.getParameter(U.UNPACK_IMAGE_HEIGHT),En=y.getParameter(U.UNPACK_SKIP_PIXELS),Kn=y.getParameter(U.UNPACK_SKIP_ROWS),Ii=y.getParameter(U.UNPACK_SKIP_IMAGES);y.pixelStorei(U.UNPACK_ROW_LENGTH,vt.width),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,vt.height),y.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),y.pixelStorei(U.UNPACK_SKIP_ROWS,Ve),y.pixelStorei(U.UNPACK_SKIP_IMAGES,Ze);let Ms=w.isDataArrayTexture||w.isData3DTexture,ut=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){let Rt=H.get(w),Li=H.get(N),_t=H.get(Rt.__renderTarget),Di=H.get(Li.__renderTarget);y.bindFramebuffer(U.READ_FRAMEBUFFER,_t.__webglFramebuffer),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let Ss=0;Ss<ye;Ss++)Ms&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(w).__webglTexture,k,Ze+Ss),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(N).__webglTexture,pe,Ft+Ss)),U.blitFramebuffer(Ee,Ve,_e,de,Me,st,_e,de,U.DEPTH_BUFFER_BIT,U.NEAREST);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||w.isRenderTargetTexture||H.has(w)){let Rt=H.get(w),Li=H.get(N);y.bindFramebuffer(U.READ_FRAMEBUFFER,L),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let _t=0;_t<ye;_t++)Ms?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Rt.__webglTexture,k,Ze+_t):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Rt.__webglTexture,k),ut?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Li.__webglTexture,pe,Ft+_t):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Li.__webglTexture,pe),k!==0?U.blitFramebuffer(Ee,Ve,_e,de,Me,st,_e,de,U.COLOR_BUFFER_BIT,U.NEAREST):ut?U.copyTexSubImage3D(xe,pe,Me,st,Ft+_t,Ee,Ve,_e,de):U.copyTexSubImage2D(xe,pe,Me,st,Ee,Ve,_e,de);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ut?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(xe,pe,Me,st,Ft,_e,de,ye,pt,Jt,vt.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(xe,pe,Me,st,Ft,_e,de,ye,pt,vt.data):U.texSubImage3D(xe,pe,Me,st,Ft,_e,de,ye,pt,Jt,vt):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pe,Me,st,_e,de,pt,Jt,vt.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pe,Me,st,vt.width,vt.height,pt,vt.data):U.texSubImage2D(U.TEXTURE_2D,pe,Me,st,_e,de,pt,Jt,vt);y.pixelStorei(U.UNPACK_ROW_LENGTH,nn),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qe),y.pixelStorei(U.UNPACK_SKIP_PIXELS,En),y.pixelStorei(U.UNPACK_SKIP_ROWS,Kn),y.pixelStorei(U.UNPACK_SKIP_IMAGES,Ii),pe===0&&N.generateMipmaps&&U.generateMipmap(xe),y.unbindTexture()},this.initRenderTarget=function(w){H.get(w).__webglFramebuffer===void 0&&q.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?q.setTextureCube(w,0):w.isData3DTexture?q.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?q.setTexture2DArray(w,0):q.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){Y=0,Z=0,te=null,y.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}};function xr(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,c=new rt,l=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=cp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);let p=cp(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function cp(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new zt(o,t,n),c=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute){let u=c/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let _=h.getComponent(d,p);a.setComponent(d+u,p,_)}}else o.set(h.array,c);c+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function hu(s,e){if(e===kh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===hr||e===qo){let t=s.getIndex();if(t===null){let r=[],o=s.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===hr)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function hp(s){let e=new Map,t=new Map,n=s.clone();return up(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,o=e.get(i),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function up(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)up(s.children[n],e.children[n],t)}var dc=class extends ri{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new xu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new Ru(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new yu(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new Su(t)}),this.register(function(t){return new bu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new wu(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new Eu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new fc(t,Ye.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new fc(t,Ye.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Pu(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Ai.extractUrlBase(e);o=Ai.resolveURL(l,this.path)}else o=Ai.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ir(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===gp){try{o[Ye.KHR_BINARY_GLTF]=new Iu(e)}catch(u){i&&i(u);return}r=JSON.parse(o[Ye.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Bu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ye.KHR_MATERIALS_UNLIT:o[u]=new mu;break;case Ye.KHR_DRACO_MESH_COMPRESSION:o[u]=new Lu(r,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:o[u]=new Du;break;case Ye.KHR_MESH_QUANTIZATION:o[u]=new Nu;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function iy(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Dt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},pu=class{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],rn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new us(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new hs(h),l.distance=u;break;case"spot":l=new To(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),hi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},mu=class{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return yn}extendParams(e,t,n){let i=[];e.color=new Ie(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],rn),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ct))}return Promise.all(i)}},gu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},xu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(r,r)}return Promise.all(i)}},_u=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},vu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},yu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],rn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Ct)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Mu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Su=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(r[0],r[1],r[2],rn),Promise.all(i)}},bu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},wu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(r[0],r[1],r[2],rn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Ct)),Promise.all(i)}},Tu=class{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Eu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Dt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Dt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Au=class{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Ru=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Cu=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},fc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},Pu=class{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Ln.TRIANGLES&&l.mode!==Ln.TRIANGLE_STRIP&&l.mode!==Ln.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let p of u){let _=new De,m=new P,g=new vn,b=new P(1,1,1),T=new eo(p.geometry,p.material,d);for(let M=0;M<d;M++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,M),c.SCALE&&b.fromBufferAttribute(c.SCALE,M),T.setMatrixAt(M,_.compose(m,g,b));let v=null;for(let M in c)if(M==="_COLOR_0"){let S=c[M];T.instanceColor=new Mi(S.array,S.itemSize,S.normalized)}else if(M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"){if(v===null){let A=T.geometry;v=new rt,v.name=A.name;for(let x in A.attributes)v.setAttribute(x,A.attributes[x]);for(let x in A.morphAttributes)v.morphAttributes[x]=A.morphAttributes[x];A.index!==null&&v.setIndex(A.index),v.morphTargetsRelative=A.morphTargetsRelative;for(let x of A.groups)v.addGroup(x.start,x.count,x.materialIndex);A.boundingBox!==null&&(v.boundingBox=A.boundingBox.clone()),A.boundingSphere!==null&&(v.boundingSphere=A.boundingSphere.clone()),v.drawRange.start=A.drawRange.start,v.drawRange.count=A.drawRange.count,v.userData=Object.assign({},A.userData),T.geometry=v}let S=c[M];v.setAttribute(M,new Mi(S.array,S.itemSize,S.normalized))}gt.prototype.copy.call(T,p),this.parser.assignFinalMaterial(T),f.push(T)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},gp="glTF",jo=12,dp={JSON:1313821514,BIN:5130562},Iu=class{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,jo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==gp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-jo,r=new DataView(e,jo),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===dp.JSON){let l=new Uint8Array(e,jo+o,a);this.content=n.decode(l)}else if(c===dp.BIN){let l=jo+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Lu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Fu[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Fu[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=_r[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let p in f.attributes){let _=f.attributes[p],m=c[p];m!==void 0&&(_.normalized=m)}u(f)},a,l,rn,d)})})}},Du=class{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Nu=class{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}},pc=class extends si{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*l,_=p-l,m=-2*f+3*d,g=f-d,b=1-m,T=g-d+u;for(let v=0;v!==a;v++){let M=o[_+v+a],S=o[_+v+c]*h,A=o[p+v+a],x=o[p+v]*h;r[v]=b*M+T*S+m*A+g*x}return r}},sy=new vn,Uu=class extends pc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return sy.fromArray(r).normalize().toArray(r),r}},Ln={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},_r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fp={9728:Mt,9729:Pt,9984:Ml,9985:lr,9986:ms,9987:Gn},pp={33071:Rn,33648:ks,10497:hn},uu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Fu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ry={CUBICSPLINE:void 0,LINEAR:ss,STEP:is},du={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function oy(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ln({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pn})),s.DefaultMaterial}function vs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function hi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ay(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function ly(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function cy(s){let e,t=s.extensions&&s.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+fu(t.attributes):e=s.indices+":"+fu(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+fu(s.targets[n]);return e}function fu(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ou(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hy(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var uy=new De,Bu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new iy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new So(this.options.manager):this.textureLoader=new Ao(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ir(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return vs(r,a,i),hi(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Ai.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=uu[i.type],a=_r[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new zt(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=uu[i.type],l=_r[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,_,m;if(f&&f!==u){let g=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count,T=t.cache.get(b);T||(_=new l(a,g*f,i.count*f/h),T=new Ys(_,f/h),t.cache.add(b,T)),m=new Zs(T,c,d%f/h,p)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),m=new zt(_,c,p);if(i.sparse!==void 0){let g=uu.SCALAR,b=_r[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,M=new b(o[1],T,i.sparse.count*g),S=new l(o[2],v,i.sparse.count*c);a!==null&&(m=new zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,x=M.length;A<x;A++){let E=M[A];if(m.setX(E,S[A*c]),c>=2&&m.setY(E,S[A*c+1]),c>=3&&m.setZ(E,S[A*c+2]),c>=4&&m.setW(E,S[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=fp[d.magFilter]||Pt,h.minFilter=fp[d.minFilter]||Gn,h.wrapS=pp[d.wrapS]||hn,h.wrapT=pp[d.wrapT]||hn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Mt&&h.minFilter!==Pt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){let m=new qt(_);m.needsUpdate=!0,d(m)}),t.load(Ai.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),hi(u,o),u.userData.mimeType=o.mimeType||hy(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ye.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new js,on.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new ti,on.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ln}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[Ye.KHR_MATERIALS_UNLIT]){let u=i[Ye.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ie(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],rn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Ct)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Et);let h=r.alphaMode||du.OPAQUE;if(h===du.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===du.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==yn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new re(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==yn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==yn){let u=r.emissiveFactor;a.emissive=new Ie().setRGB(u[0],u[1],u[2],rn)}return r.emissiveTexture!==void 0&&o!==yn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ct)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),hi(u,r),t.associations.set(u,{materials:e}),r.extensions&&vs(i,u,r),u})}createUniqueName(e){let t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return mp(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=cy(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=mp(new rt,l,t),l.mode===Ln.TRIANGLE_STRIP?d=d.then(f=>hu(f,qo)):l.mode===Ln.TRIANGLE_FAN&&(d=d.then(f=>hu(f,hr))),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?oy(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,p=h.length;f<p;f++){let _=h[f],m=o[f],g,b=l[f];if(m.mode===Ln.TRIANGLES||m.mode===Ln.TRIANGLE_STRIP||m.mode===Ln.TRIANGLE_FAN||m.mode===void 0){let T=r.isSkinnedMesh===!0,v=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");T&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=T&&v?new $r(_,b):new je(_,b),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(m.mode===Ln.LINES)g=new to(_,b);else if(m.mode===Ln.LINE_STRIP)g=new Hn(_,b);else if(m.mode===Ln.LINE_LOOP)g=new no(_,b);else if(m.mode===Ln.POINTS)g=new io(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&ly(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),hi(g,r),m.extensions&&vs(i,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&vs(i,u[0],r),u[0];let d=new at;r.extensions&&vs(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Bt(gs.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new oi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),hi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new De;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Qr(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],p=i.samplers[f.sampler],_=f.target,m=_.node,g=i.parameters!==void 0?i.parameters[p.input]:p.input,b=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",b)),l.push(p),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],p=u[2],_=u[3],m=u[4],g=[];for(let T=0,v=d.length;T<v;T++){let M=d[T],S=f[T],A=p[T],x=_[T],E=m[T];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let R=n._createAnimationTracks(M,S,A,x,E);if(R)for(let I=0;I<R.length;I++)g.push(R[I])}let b=new Mo(r,void 0,g);return hi(b,i),b})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,uy)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,p=u[0];h.pivot=new P().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Ks:l.length>1?h=new at:l.length===1?h=l[0]:h=new gt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),hi(h,r),r.extensions&&vs(n,h,r),r.matrix!==void 0){let u=new De;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new at;n.name&&(r.name=i.createUniqueName(n.name)),hi(r,n),n.extensions&&vs(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?r.add(hp(d)):r.add(d)}let l=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof on||d instanceof qt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}Zi[r.path]===Zi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(Zi[r.path]){case Zi.weights:h=wi;break;case Zi.rotation:h=Ti;break;case Zi.translation:case Zi.scale:h=Vi;break;default:n.itemSize===1?h=wi:h=Vi;break}let u=i.interpolation!==void 0?ry[i.interpolation]:ss,d=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let _=new h(c[f]+"."+Zi[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ou(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Ti?Uu:pc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function dy(s,e,t){let n=e.attributes,i=new Qt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){let h=Ou(_r[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new P,c=new P;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let _=Ou(_r[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new un;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function mp(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=Fu[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return ze.workingColorSpace!==rn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ze.workingColorSpace}" not supported.`),hi(s,e),dy(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?ay(s,e.targets,t):s})}function zu(s,e){if(e=e.replaceAll("_"," "),/Mirror/i.test(e))return;let t=/Entrance stippled glass/i.test(e),n=/water/i.test(e);if(/Hall opal lamp glass/i.test(e))s.transparent=!1,s.opacity=1,s.depthWrite=!0,s.metalness=0,s.roughness=.42;else if(t)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.48,s.opacity=.64,s.envMapIntensity=1;else if(n)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.16,s.envMapIntensity=1.1;else if(/Glazing|glass/i.test(e)){s.metalness=0,s.roughness=/mist/i.test(e)?.4:.1,s.opacity=/mist/i.test(e)?.36:.11,s.envMapIntensity=.8;return}let i=/carpet|upholstery|linen|curtain|fabric|cushion|Entrance mat/i.test(e),r=/oak|walnut|pine|timber|rattan/i.test(e)&&!i,o=t?9:n?10:/carpet/i.test(e)?11:e==="Red brown brick"?1:/Slate roof/i.test(e)?2:/Tarmac|Gravel|Planting soil/i.test(e)?3:r?4:/Warm plaster|White joinery|enamel|painted cast iron/i.test(e)?5:i?6:/Stone|Concrete|Paving|brick|mortar|tile|granite|membrane/i.test(e)?7:/Grass|Foliage|Hedge/i.test(e)?8:0;o===1||o===2||o===3||o===6||o===8?s.roughness=.92:o===4?s.roughness=.43:o===5?s.roughness=/joinery|enamel/i.test(e)?.44:.88:o===7?s.roughness=/granite/i.test(e)?.28:.83:o===11&&(s.roughness=.96),o&&(s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
   varying vec3 vSurfacePosition; varying vec3 vSurfaceNormal;`).replace("#include <begin_vertex>",`#include <begin_vertex>
   vSurfacePosition=(modelMatrix*vec4(position,1.)).xyz;
   vSurfaceNormal=normalize(mat3(modelMatrix)*normal);`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
   varying vec3 vSurfacePosition; varying vec3 vSurfaceNormal;
   float surfaceHash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
   float surfaceNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(surfaceHash(i),surfaceHash(i+vec2(1,0)),f.x),mix(surfaceHash(i+vec2(0,1)),surfaceHash(i+vec2(1,1)),f.x),f.y);}
  `);let c=`vec3 sn=abs(normalize(vSurfaceNormal));
   vec2 p=sn.y>.65?vSurfacePosition.xz:(sn.x>sn.z?vSurfacePosition.zy:vSurfacePosition.xy);
   float pixelSize=max(length(dFdx(p)),length(dFdy(p)));
   float microFade=1.-smoothstep(.001,.0035,pixelSize);
   float fineNoise=surfaceNoise(p*180.);
   float detailHeight=0.;
  `;o===1?c+=`
   float row=floor(p.y/.076);vec2 uv=vec2((p.x+mod(row,2.)*.1125)/.225,p.y/.076);
   vec2 f=fract(uv),edge=min(f,1.-f)*vec2(.225,.076);
   float aa=max(fwidth(p.x),fwidth(p.y))*.65;
   float mortar=1.-smoothstep(.0035-aa,.0035+aa+.0001,min(edge.x,edge.y));
   float brickTone=surfaceHash(floor(uv));
   vec3 clay=mix(vec3(.12,.035,.012),vec3(.29,.10,.037),brickTone);
   clay*=.94+.12*surfaceNoise(p*38.);
   diffuseColor.rgb=mix(clay,vec3(.28,.245,.19),mortar);
   detailHeight=(-mortar*.0012+(fineNoise-.5)*.00012)*microFade;
  `:o===2?c+=`
   // Roof courses use the roof plane, not only its height above the ground.
   vec2 roofP=sn.x>sn.z?vec2(vSurfacePosition.z,vSurfacePosition.x):vSurfacePosition.xz;
   float row=floor(roofP.y/.16);vec2 uv=vec2((roofP.x+mod(row,2.)*.145)/.29,roofP.y/.16);
   vec2 f=fract(uv),edge=min(f,1.-f)*vec2(.29,.16);
   float aa=max(fwidth(roofP.x),fwidth(roofP.y))*.6;
   float seam=1.-smoothstep(.002-aa,.002+aa+.0001,min(edge.x,edge.y));
   diffuseColor.rgb=mix(mix(vec3(.035,.038,.033),vec3(.075,.073,.059),surfaceHash(floor(uv))),vec3(.012,.014,.012),seam);
   detailHeight=-seam*.0012*microFade;
  `:o===3?c+=`
   float aggregate=mix(.96,.82+.27*fineNoise,microFade);
   diffuseColor.rgb*=aggregate*(.94+.1*surfaceNoise(p*1.6));
   detailHeight=(fineNoise-.5)*.00028*microFade;
  `:o===4?c+=`
   float grain=surfaceNoise(vec2(p.x*48.,p.y*2.8));
   float grainFade=1.-smoothstep(.003,.010,pixelSize);
   diffuseColor.rgb*=mix(.955,.90+.11*grain,grainFade);
   detailHeight=(grain-.5)*.00018*grainFade;
  `:o===5?c+=`
   diffuseColor.rgb*=1.+(fineNoise-.5)*.025*microFade;
   detailHeight=(fineNoise-.5)*.00006*microFade;
  `:o===6?c+=`
   diffuseColor.rgb*=.96+(fineNoise-.5)*.13*microFade;
   detailHeight=(fineNoise-.5)*.0002*microFade;
  `:o===7?c+=`
   diffuseColor.rgb*=.96+(fineNoise-.5)*.075*microFade;
   detailHeight=(fineNoise-.5)*.00009*microFade;
  `:o===8?c+=`
   diffuseColor.rgb*=.83+.22*surfaceNoise(p*2.5);
  `:o===9?c+=`
   float stippleFade=1.-smoothstep(.0025,.008,pixelSize);
   float stipple=surfaceNoise(p*155.);
   diffuseColor.rgb*=.94+(stipple-.5)*.16*stippleFade;
   detailHeight=(stipple-.5)*.0011*stippleFade;
  `:o===10?c+=`
   float rippleFade=1.-smoothstep(.012,.045,pixelSize);
   float ripple=sin(p.x*51.+sin(p.y*23.)*.65)*sin(p.y*43.+sin(p.x*18.)*.8);
   detailHeight=ripple*.00075*rippleFade;
  `:o===11&&(c+=`
   // Broad pile direction/mottling remains visible at room scale; the finer
   // fibres fade independently before becoming subpixel detail.
   float pile=surfaceNoise(p*6.0)*.65+surfaceNoise(p*21.)*.35;
   float pileFade=1.-smoothstep(.018,.05,pixelSize);
   diffuseColor.rgb*=1.+(pile-.5)*.22*pileFade+(fineNoise-.5)*.10*microFade;
   detailHeight=(fineNoise-.5)*.00022*microFade;
  `),a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+c),a.fragmentShader=a.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
   vec3 surfaceDx=dFdx(-vViewPosition),surfaceDy=dFdy(-vViewPosition);
   vec3 surfaceR1=cross(surfaceDy,normal),surfaceR2=cross(normal,surfaceDx);
   float surfaceDet=dot(surfaceDx,surfaceR1);
   if(abs(surfaceDet)>.00000001)normal=normalize(abs(surfaceDet)*normal-sign(surfaceDet)*(dFdx(detailHeight)*surfaceR1+dFdy(detailHeight)*surfaceR2));
  `)},s.customProgramCacheKey=()=>`daylight-surface-v3-${o}`)}var vr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var bn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},fy=new oi(-1,1,1,-1,0,1),ku=class extends rt{constructor(){super(),this.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qe([0,2,0,0,2,0],2))}},py=new ku,Ki=class{constructor(e){this._mesh=new je(py,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,fy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var yr=class extends bn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof St?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=pn.clone(e.uniforms),this.material=new St({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ki(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var $o=class extends bn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},mc=class extends bn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var gc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new re);this._width=n.width,this._height=n.height,t=new It(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:kt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new yr(vr),this.copyPass.material.blending=Lt,this.timer=new Ro}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}$o!==void 0&&(o instanceof $o?n=!0:o instanceof mc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var xc=class extends bn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ie}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Qo={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new re},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new De},cameraProjectionMatrixInverse:{value:new De},cameraWorldMatrix:{value:new De},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new P(-1,-1,-1)},sceneBoxMax:{value:new P(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},ea={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},_c={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function xp(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=my(e),n=t.length,i=new Uint8Array(n*4);for(let o=0;o<n;++o){let a=t[o],c=2*Math.PI*a/n,l=new P(Math.cos(c),Math.sin(c),0).normalize();i[o*4]=(l.x*.5+.5)*255,i[o*4+1]=(l.y*.5+.5)*255,i[o*4+2]=127,i[o*4+3]=255}let r=new ei(i,e,e);return r.wrapS=hn,r.wrapT=hn,r.needsUpdate=!0,r}function my(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,n=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),n[i*e+r]!==0){r-=2,i++;continue}else n[i*e+r]=o++;r++,i--}return n}var ta={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Hu(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new re},cameraProjectionMatrixInverse:{value:new De},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Hu(s,e,t){let n=gy(s,e,t),i="vec3[SAMPLES](";for(let r=0;r<s;r++){let o=n[r];i+=`vec3(${o.x}, ${o.y}, ${o.z})${r<s-1?",":")"}`}return i}function gy(s,e,t){let n=[];for(let i=0;i<s;i++){let r=2*Math.PI*e*i/s,o=Math.pow(i/(s-1),t);n.push(new P(Math.cos(r),Math.sin(r),o))}return n}var vc=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,i,r,o=.5*(Math.sqrt(3)-1),a=(e+t)*o,c=Math.floor(e+a),l=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(c+l)*h,d=c-u,f=l-u,p=e-d,_=t-f,m,g;p>_?(m=1,g=0):(m=0,g=1);let b=p-m+h,T=_-g+h,v=p-1+2*h,M=_-1+2*h,S=c&255,A=l&255,x=this.perm[S+this.perm[A]]%12,E=this.perm[S+m+this.perm[A+g]]%12,R=this.perm[S+1+this.perm[A+1]]%12,I=.5-p*p-_*_;I<0?n=0:(I*=I,n=I*I*this._dot(this.grad3[x],p,_));let D=.5-b*b-T*T;D<0?i=0:(D*=D,i=D*D*this._dot(this.grad3[E],b,T));let O=.5-v*v-M*M;return O<0?r=0:(O*=O,r=O*O*this._dot(this.grad3[R],v,M)),70*(n+i+r)}noise3d(e,t,n){let i,r,o,a,l=(e+t+n)*.3333333333333333,h=Math.floor(e+l),u=Math.floor(t+l),d=Math.floor(n+l),f=1/6,p=(h+u+d)*f,_=h-p,m=u-p,g=d-p,b=e-_,T=t-m,v=n-g,M,S,A,x,E,R;b>=T?T>=v?(M=1,S=0,A=0,x=1,E=1,R=0):b>=v?(M=1,S=0,A=0,x=1,E=0,R=1):(M=0,S=0,A=1,x=1,E=0,R=1):T<v?(M=0,S=0,A=1,x=0,E=1,R=1):b<v?(M=0,S=1,A=0,x=0,E=1,R=1):(M=0,S=1,A=0,x=1,E=1,R=0);let I=b-M+f,D=T-S+f,O=v-A+f,L=b-x+2*f,V=T-E+2*f,Y=v-R+2*f,Z=b-1+3*f,te=T-1+3*f,G=v-1+3*f,$=h&255,ee=u&255,Se=d&255,be=this.perm[$+this.perm[ee+this.perm[Se]]]%12,tt=this.perm[$+M+this.perm[ee+S+this.perm[Se+A]]]%12,We=this.perm[$+x+this.perm[ee+E+this.perm[Se+R]]]%12,Ke=this.perm[$+1+this.perm[ee+1+this.perm[Se+1]]]%12,X=.6-b*b-T*T-v*v;X<0?i=0:(X*=X,i=X*X*this._dot3(this.grad3[be],b,T,v));let J=.6-I*I-D*D-O*O;J<0?r=0:(J*=J,r=J*J*this._dot3(this.grad3[tt],I,D,O));let fe=.6-L*L-V*V-Y*Y;fe<0?o=0:(fe*=fe,o=fe*fe*this._dot3(this.grad3[We],L,V,Y));let Le=.6-Z*Z-te*te-G*G;return Le<0?a=0:(Le*=Le,a=Le*Le*this._dot3(this.grad3[Ke],Z,te,G)),32*(i+r+o+a)}noise4d(e,t,n,i){let r=this.grad4,o=this.simplex,a=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,u,d,f,p,_=(e+t+n+i)*c,m=Math.floor(e+_),g=Math.floor(t+_),b=Math.floor(n+_),T=Math.floor(i+_),v=(m+g+b+T)*l,M=m-v,S=g-v,A=b-v,x=T-v,E=e-M,R=t-S,I=n-A,D=i-x,O=E>R?32:0,L=E>I?16:0,V=R>I?8:0,Y=E>D?4:0,Z=R>D?2:0,te=I>D?1:0,G=O+L+V+Y+Z+te,$=o[G][0]>=3?1:0,ee=o[G][1]>=3?1:0,Se=o[G][2]>=3?1:0,be=o[G][3]>=3?1:0,tt=o[G][0]>=2?1:0,We=o[G][1]>=2?1:0,Ke=o[G][2]>=2?1:0,X=o[G][3]>=2?1:0,J=o[G][0]>=1?1:0,fe=o[G][1]>=1?1:0,Le=o[G][2]>=1?1:0,ge=o[G][3]>=1?1:0,Oe=E-$+l,bt=R-ee+l,Be=I-Se+l,Je=D-be+l,nt=E-tt+2*l,He=R-We+2*l,ht=I-Ke+2*l,Tt=D-X+2*l,Wt=E-J+3*l,ft=R-fe+3*l,yt=I-Le+3*l,U=D-ge+3*l,Ut=E-1+4*l,$e=R-1+4*l,C=I-1+4*l,y=D-1+4*l,B=m&255,H=g&255,q=b&255,ie=T&255,ae=a[B+a[H+a[q+a[ie]]]]%32,K=a[B+$+a[H+ee+a[q+Se+a[ie+be]]]]%32,Q=a[B+tt+a[H+We+a[q+Ke+a[ie+X]]]]%32,le=a[B+J+a[H+fe+a[q+Le+a[ie+ge]]]]%32,Te=a[B+1+a[H+1+a[q+1+a[ie+1]]]]%32,oe=.6-E*E-R*R-I*I-D*D;oe<0?h=0:(oe*=oe,h=oe*oe*this._dot4(r[ae],E,R,I,D));let se=.6-Oe*Oe-bt*bt-Be*Be-Je*Je;se<0?u=0:(se*=se,u=se*se*this._dot4(r[K],Oe,bt,Be,Je));let ve=.6-nt*nt-He*He-ht*ht-Tt*Tt;ve<0?d=0:(ve*=ve,d=ve*ve*this._dot4(r[Q],nt,He,ht,Tt));let Ce=.6-Wt*Wt-ft*ft-yt*yt-U*U;Ce<0?f=0:(Ce*=Ce,f=Ce*Ce*this._dot4(r[le],Wt,ft,yt,U));let Ue=.6-Ut*Ut-$e*$e-C*C-y*y;return Ue<0?p=0:(Ue*=Ue,p=Ue*Ue*this._dot4(r[Te],Ut,$e,C,y)),27*(h+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}_dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}};var na=class s extends bn{constructor(e,t,n=512,i=512,r,o,a){super(),this.width=n,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=xp(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new It(this.width,this.height,{type:kt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new St({defines:Object.assign({},Qo.defines),uniforms:pn.clone(Qo.uniforms),vertexShader:Qo.vertexShader,fragmentShader:Qo.fragmentShader,blending:Lt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new vo,this.normalMaterial.blending=Lt,this.pdMaterial=new St({defines:Object.assign({},ta.defines),uniforms:pn.clone(ta.uniforms),vertexShader:ta.vertexShader,fragmentShader:ta.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new St({defines:Object.assign({},ea.defines),uniforms:pn.clone(ea.uniforms),vertexShader:ea.vertexShader,fragmentShader:ea.fragmentShader,blending:Lt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new St({uniforms:pn.clone(vr.uniforms),vertexShader:vr.vertexShader,fragmentShader:vr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Lo,blendDst:ds,blendEquation:In,blendSrcAlpha:Io,blendDstAlpha:ds,blendEquationAlpha:In}),this.blendMaterial=new St({uniforms:pn.clone(_c.uniforms),vertexShader:_c.vertexShader,fragmentShader:_c.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:_l,blendSrc:Lo,blendDst:ds,blendEquation:In,blendSrcAlpha:Io,blendDstAlpha:ds,blendEquationAlpha:In}),this._fsQuad=new Ki(null),this._originalClearColor=new Ie,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ni,this.depthTexture.format=ai,this.depthTexture.type=Xi,this.normalRenderTarget=new It(this.width,this.height,{minFilter:Mt,magFilter:Mt,type:kt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Hu(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Off:break;case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Lt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Lt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Lt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Lt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Lt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,i,r){e.getClearColor(this._originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_renderOverride(e,t,n,i,r){e.getClearColor(this._originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new vc,n=e*e*4,i=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){let c=o,l=a;i[(o*e+a)*4]=(t.noise(c,l)*.5+.5)*255,i[(o*e+a)*4+1]=(t.noise(c+e,l)*.5+.5)*255,i[(o*e+a)*4+2]=(t.noise(c,l+e)*.5+.5)*255,i[(o*e+a)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}let r=new ei(i,e,e,cn,en);return r.wrapS=hn,r.wrapT=hn,r.needsUpdate=!0,r}};na.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var ia={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var yc=class extends bn{constructor(){super(),this.isOutputPass=!0,this.uniforms=pn.clone(ia.uniforms),this.material=new nr({name:ia.name,uniforms:this.uniforms,vertexShader:ia.vertexShader,fragmentShader:ia.fragmentShader}),this._fsQuad=new Ki(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ze.getTransfer(this._outputColorSpace)===et&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Do?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===No?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Uo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===fs?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Bo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Oo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var _p={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new re(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`};var sa=class s extends je{constructor(){let e=s.SkyShader,t=new St({name:e.name,uniforms:pn.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Zt,depthWrite:!1});super(new dt(1,1,1),t),this.isSky=!0}};sa.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new P},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( vSunDirection.y );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// gradient at a lattice corner; sinless hash so every GPU produces the same clouds
		vec2 gradient( vec2 i ) {
			vec3 p = fract( i.xyx * vec3( 0.1031, 0.1030, 0.0973 ) );
			p += dot( p, p.yzx + 33.33 );
			return fract( ( p.xx + p.yz ) * p.zy ) * 2.0 - 1.0;
		}

		// 2D gradient noise: isotropic lobes like Perlin at value-noise cost
		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			vec2 u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // quintic fade
			float a = dot( gradient( i ), f );
			float b = dot( gradient( i + vec2( 1.0, 0.0 ) ), f - vec2( 1.0, 0.0 ) );
			float c = dot( gradient( i + vec2( 0.0, 1.0 ) ), f - vec2( 0.0, 1.0 ) );
			float d = dot( gradient( i + vec2( 1.0, 1.0 ) ), f - vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y ) * 1.6; // ~[-1,1]
		}

		// fbm; per-octave drift makes clouds billow instead of scrolling as a rigid stamp
		float fbm( vec2 p, float drift ) {
			float result = 0.0;
			float amplitude = 1.0;
			for ( int i = 0; i < 4; i ++ ) {
				result += amplitude * noise( p );
				amplitude *= 0.5;
				p = p * 2.0 + drift;
			}
			return result;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, direction.y ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - vSunDirection.y, 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = clamp( ( cosTheta - sunAngularDiameterCos ) * 50000.0, 0.0, 1.0 ) * showSunDisc;
			vec3 sundiscColor = ( 760.0 * sundisc ) * min( vSunE * Fex, 80.0 );

			vec3 texColor = ( Lin + L0 ) * 0.04 + sundiscColor + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Cloud density field
				float evolve = time * cloudSpeed * 300.0;
				float cloudNoise = clamp( fbm( cloudUV * 1000.0, evolve ) * 0.7 + 0.5, 0.0, 1.0 );

				// Large-scale coverage variation: clear gaps next to dense banks
				float region = noise( cloudUV * 300.0 ) * 0.37 + 0.5;
				float cov = clamp( cloudCoverage + ( region - 0.5 ) * 0.6, 0.0, 1.0 );

				// Carve clouds where noise rises above the coverage level
				float threshold = 1.0 - cov;
				float cloudMask = smoothstep( threshold, threshold + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.03 + 0.06 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting from the sky's own radiance
				float dayFactor = smoothstep( -0.08, 0.3, vSunDirection.y );
				vec3 sunColor = vSunE * Fex * 0.22 * 0.04; // 0.22 ~ albedo/pi, 0.04 = exposure; the aerial composite adds the eye-leg extinction
				vec3 skyAmbient = Lin * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

				// Beer-powder self-shadow from the sampled density
				float depth = max( 0.0, cloudNoise - threshold );
				float beer = exp( depth * -4.0 );
				float powder = 1.0 - beer * beer; // beer*beer == exp(-8*depth)
				float shade = mix( 0.45, 1.0, clamp( beer * powder * 2.6, 0.0, 1.0 ) ); // 2.6 = 1/0.385, normalizes beer*powder peak to 1

				// Henyey-Greenstein forward lobe ( g = 0.7 ): silver lining on rims toward the sun
				float silver = clamp( 0.51 / pow( 1.49 - cosTheta * 1.4, 1.5 ), 0.0, 3.0 ); // 0.51=1-g^2, 1.49=1+g^2, 1.4=2g
				float edge = cloudMask * ( 1.0 - cloudMask ) * 4.0;

				vec3 cloudColor = skyAmbient + sunColor * shade;
				cloudColor += sunColor * silver * edge * 0.6;
				cloudColor *= max( dayFactor, 0.03 );

				// Cloud opacity via Beer's law: density sets how solid the clouds get
				float alpha = ( 1.0 - exp( depth * cloudDensity * -12.0 ) ) * horizonFade;

				// Occlude the sun disc/glow behind opaque cloud
				texColor -= L0 * 0.04 * alpha;

				// Composite through the atmosphere so distant clouds dissolve into haze
				vec3 cloudAerial = mix( texColor, cloudColor, Fex );
				texColor = mix( texColor, cloudAerial, alpha );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function xy(s,e,t){let n=new sa;n.scale.setScalar(100),Object.assign(n.material.uniforms.turbidity,{value:2.2}),n.material.uniforms.rayleigh.value=1.8,n.material.uniforms.mieCoefficient.value=.004,n.material.uniforms.mieDirectionalG.value=.8,n.material.uniforms.cloudCoverage.value=.32,n.material.uniforms.cloudDensity.value=.22,n.material.uniforms.sunPosition.value.copy(e),n.material.uniforms.showSunDisc.value=!1;let i=new os;i.add(n);let r=new mr(t?128:256,{type:kt});new rr(.1,250,r).update(s,i);let o=new pr(s),a=o.fromCubemap(r.texture);return o.dispose(),n.geometry.dispose(),n.material.dispose(),{background:r.texture,environment:a.texture}}function vp(s,e,t,{actionMode:n=!1}={}){let i=matchMedia("(pointer: coarse)").matches,r=i||n;s.toneMapping=fs,s.toneMappingExposure=1.08,s.shadowMap.enabled=!0,s.shadowMap.type=xl,s.shadowMap.autoUpdate=!1,e.add(new bo(14478074,8549991,.5)),e.add(new Eo(16774373,.035));for(let[b,T,v,M]of[["Kitchen daylight bounce",[2.15,1.55,-6.4],4.2,1.65],["Hall daylight bounce",[6.55,1.6,-2.7],3.4,1.45]]){let S=new hs(16772311,M,v,0);S.name=b,S.position.set(...T),e.add(S)}let o=new us(16774108,2.8),a=new P(0,0,1).applyEuler(new kn(gs.degToRad(26),gs.degToRad(-23),gs.degToRad(-28),"XYZ")),c=new P(a.x,a.z,-a.y),l=xy(s,c,i);e.background=l.background,e.backgroundIntensity=.22,e.environment=l.environment,e.environmentIntensity=.035,o.target.position.set(-3,0,-4),o.position.copy(o.target.position).add(c.multiplyScalar(55)),o.castShadow=!0;let h=r?2048:4096;o.shadow.mapSize.set(h,h),Object.assign(o.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120}),o.shadow.bias=-8e-5,o.shadow.normalBias=.012,e.add(o,o.target);let u=new It(innerWidth,innerHeight,{type:kt,samples:r?0:4}),d=new gc(s,u);d.addPass(new xc(e,t));let f=null;if(!i){f=new na(e,t,innerWidth,innerHeight,void 0,{radius:.45,distanceExponent:1.5,thickness:.15,scale:1,samples:32},{radius:6,rings:2,samples:16}),f.blendIntensity=.65;let b=f._overrideVisibility.bind(f),T=f._restoreVisibility.bind(f);f._overrideVisibility=()=>{b(),e.traverse(v=>{v.isMesh&&v.material.transparent&&v.visible&&(v.visible=!1,f._visibilityCache.push(v))})},f._restoreVisibility=T,f.enabled=!r,d.addPass(f)}d.addPass(new yc);let p=new yr(_p);p.enabled=r,d.addPass(p);let _=(b,T)=>{d.setSize(b,T),p&&p.material.uniforms.resolution.value.set(1/d.readBuffer.width,1/d.readBuffer.height)};_(innerWidth,innerHeight);let m={toneMapping:"AgX",exposure:s.toneMappingExposure,sky:"precomputed analytic daylight",skyCubeSize:i?128:256,localBounceLights:2,castShadows:!0,ambientOcclusion:r?"off":"GTAO",antialiasing:r?"FXAA":"MSAA",environmentReflections:!0,shadowMapSize:h,touchDevice:i,actionMode:n};return{render:()=>d.render(),resize:_,setActionMode:b=>{if(m.actionMode!==!!b){m.actionMode=!!b,r=i||b,f&&(f.enabled=!r),p.enabled=r;for(let T of[d.renderTarget1,d.renderTarget2])T.samples=r?0:4,T.dispose();h=r?2048:4096,o.shadow.mapSize.set(h,h),o.shadow.map?.dispose(),o.shadow.map=null,o.shadow.mapPass?.dispose(),o.shadow.mapPass=null,s.shadowMap.needsUpdate=!0,m.ambientOcclusion=r?"off":"GTAO",m.antialiasing=r?"FXAA":"MSAA",m.shadowMapSize=h}},updateShadows:()=>{s.shadowMap.needsUpdate=!0},info:m}}var Mc=class{constructor(e,t=[]){this.scene=e,this.members=new Map,this.doors=[],this.activeGroups=new Map;for(let n of t){let i=new at;i.name=n.id,i.position.set(n.hinge[0],n.hinge[2],-n.hinge[1]),e.add(i);let r=n.rotationAxis?new P(n.rotationAxis[0],n.rotationAxis[2],-n.rotationAxis[1]).normalize():new P(0,1,0),o=n.closedDelta??0;i.quaternion.setFromAxisAngle(r,o);let a={spec:n,pivot:i,axis:r,closedPosition:i.position.clone(),buckets:new Map,angle:o,open:!1,meshCount:0};this.doors.push(a);for(let c of n.members)this.members.set(c,a)}}owner(e){for(let t=e;t;t=t.parent){let n=this.members.get(t.userData.name||t.name);if(n)return n}}add(e,t,n){t.translate(-e.pivot.position.x,-e.pivot.position.y,-e.pivot.position.z);let i=e.buckets.get(n.name);i||(i={material:n,geometries:[]},e.buckets.set(n.name,i)),i.geometries.push(t),e.meshCount++}finish(){let e=0;for(let t of this.doors){for(let{material:n,geometries:i}of t.buckets.values()){let r=xr(i,!1),o=new je(r,n);o.name=t.spec.id+" | "+n.name,o.castShadow=!n.transparent,o.receiveShadow=!n.transparent,t.pivot.add(o),e++;for(let a of i)a.dispose()}t.buckets.clear()}return e}update(e,t=0,n=!1,i=[]){let r=!1,o=new Map;for(let{spec:c}of this.doors)if(c.activationSet){let l=o.get(c.activationSet);l||(l=new Map,o.set(c.activationSet,l));let[h,u]=c.openingCenter;l.set(c.activationGroup,Math.hypot(e.x-h,e.y-u))}for(let[c,l]of o){let h=[...l].sort((d,f)=>d[1]-f[1])[0],u=this.activeGroups.get(c);(n||!l.has(u)||l.get(u)>h[1]+.2)&&this.activeGroups.set(c,h[0])}let a=[{position:e,selected:this.activeGroups},...i.map(c=>{let l=new Map;for(let h of o.keys()){let u=null,d=1/0;for(let{spec:f}of this.doors)if(f.activationSet===h){let[p,_,m]=f.openingCenter,g=Math.hypot(c.x-p,c.y-_)+Math.abs(c.z-m)*10;g<d&&(d=g,u=f.activationGroup)}l.set(h,u)}return{position:c,selected:l}})];for(let c of this.doors){let{spec:l}=c,[h,u,d]=l.openingCenter;c.open=a.some(({position:m,selected:g})=>{let b=Math.abs(m.z-d)<.75,T=h,v=u;if(l.apertureAxis){let[A,x]=l.apertureAxis,E=l.apertureWidth/2,R=Math.max(-E,Math.min(E,(m.x-h)*A+(m.y-u)*x));T+=A*R,v+=x*R}let M=Math.hypot(m.x-T,m.y-v);return(!l.activationSet||g.get(l.activationSet)===l.activationGroup)&&b&&M<(c.open&&!n?l.closeDistance:l.openDistance)});let f=c.open?l.openDelta:l.closedDelta??0,p=n?f:c.angle+(f-c.angle)*(1-Math.exp(-t*(l.responseRate??9))),_=Math.abs(f-p)<2e-4?f:p;if(Math.abs(_-c.angle)>1e-5){if(c.angle=_,c.pivot.quaternion.setFromAxisAngle(c.axis,_),c.pivot.position.copy(c.closedPosition),l.motion==="retractable-garage"){let m=Math.sin(_),[g,b,T]=l.openTranslation;c.pivot.position.addScaledVector(new P(g,T,-b),m)}r=!0}}return r}snap(e){return this.update(e,0,!0)}status(){return this.doors.map(({spec:e,angle:t,open:n,meshCount:i,pivot:r})=>({id:e.id,wall:e.wall,motion:e.motion??"hinged",activationGroup:e.activationGroup,angle:t,open:n,meshCount:i,batches:r.children.length,hinge:[...e.hinge],position:[r.position.x,-r.position.z,r.position.y],nativePoseRestored:Math.abs(t)<2e-4,closedPoseRestored:Math.abs(t-(e.closedDelta??0))<2e-4}))}};function Ji(s,e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){let[o,a]=t[i],[c,l]=t[r];a>e!=l>e&&s<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}function _y(s,e,t,n){let i=n[0]-t[0],r=n[1]-t[1],o=Math.max(0,Math.min(1,((s-t[0])*i+(e-t[1])*r)/(i*i+r*r)));return Math.hypot(s-t[0]-o*i,e-t[1]-o*r)}function vy(s,e,t){let n=t.b[0]-t.a[0],i=t.b[1]-t.a[1],r=Math.hypot(n,i),o=((s-t.a[0])*n+(e-t.a[1])*i)/r,a=Math.abs(((s-t.a[0])*i-(e-t.a[1])*n)/r);return Math.hypot(Math.max(-o,o-r,0),Math.max(a-t.thickness/2,0))}var Mr=class{constructor(e){this.data=e,this.radius=.18,this.position={x:6.98,y:4.1,z:0},this.segments=[...e.segments];for(let t of e.walls){let[n,i]=t.a,[r,o]=t.b,a=Math.hypot(r-n,o-i),c=(r-n)/a,l=(o-i)/a,h=t.openings.filter(f=>f[2]<.15&&f[3]>1.65).map(f=>[Math.max(0,f[0]-f[1]/2),Math.min(a,f[0]+f[1]/2)]).sort((f,p)=>f[0]-p[0]),u=0,d=[];for(let[f,p]of h)f>u&&d.push([u,f]),u=Math.max(u,p);u<a&&d.push([u,a]);for(let[f,p]of d){let _=[f,p];if(t.projected_x_span)for(let m of t.projected_x_span){let g=(m-n)/c;g>f&&g<p&&_.push(g)}_.sort((m,g)=>m-g);for(let m=0;m<_.length-1;m++){let g=_[m],b=_[m+1],T=n+c*(g+b)/2,v=t.projected_x_span&&T>t.projected_x_span[0]&&T<t.projected_x_span[1]?t.front_projection_m:0,M=t.floor*e.levelHeight;this.segments.push({a:[n+c*g,i+l*g-v/2],b:[n+c*b,i+l*b-v/2],thickness:t.thickness_m+v,bottom:M,top:M+(t.height_m??(t.floor?2.45:2.6)),name:t.name})}}}}stairHeight(e,t){let[n,i]=this.data.stair?.boundsX??[7.92,8.815],r=this.data.levelHeight;return e<n||e>i||t<.115||t>3.56?null:t>=1.01?r/17+(3.56-t)/2.55*(13*r/17):(14+3*Math.atan2(1.01-t,e-n)/(Math.PI/2))*r/17}support(e,t,n){if(this.data.site?.outline_m&&!Ji(e,t,this.data.site.outline_m)&&!(this.data.approachSurface&&Ji(e,t,this.data.approachSurface.polygon)))return null;let i=this.stairHeight(e,t),r=[0];for(let a of this.data.surfaces)Ji(e,t,a.polygon)&&r.push(a.z);i!==null&&r.push(i);let o=r.filter(a=>a<=n+.3&&a>=n-.38);return o.length?Math.max(...o):null}blocked(e,t,n){let i=this.radius,[r,o,a,c]=this.data.bounds;if(e<r+i||e>a-i||t<o+i||t>c-i)return!0;for(let l of this.segments)if(!(n+1.5<=l.bottom+.04||n>=l.top-.04)&&!(l.name==="Landing rear rail"&&n<1)&&vy(e,t,l)<i)return!0;for(let l of this.data.obstacles){if(n+1.5<l.bottom+.02||n>=l.top-.04)continue;if(l.polygon){if(Ji(e,t,l.polygon))return!0;for(let m=0;m<l.polygon.length;m++)if(_y(e,t,l.polygon[m],l.polygon[(m+1)%l.polygon.length])<i)return!0;continue}let[h,u,d,f]=l.box,p=e-Math.max(h,Math.min(d,e)),_=t-Math.max(u,Math.min(f,t));if(p*p+_*_<i*i)return!0}return!1}canStand(e){return!this.blocked(e.x,e.y,e.z)}teleport(e){let[t,n,i]=e.position;return this.position={x:t,y:n,z:i},this.position}move(e,t){let n=Math.max(1,Math.ceil(Math.hypot(e,t)/.04));for(let i=0;i<n;i++)for(let[r,o]of[[e/n,0],[0,t/n]]){let a=this.position,c=a.x+r,l=a.y+o,h=this.support(c,l,a.z);h!==null&&!this.blocked(c,l,h)&&(this.position={x:c,y:l,z:h})}return this.position}};var ra=()=>matchMedia("(pointer: coarse)").matches,Sc=class{constructor(e,t,n,i){this.enabled=ra(),this.active=!1,this.axes={forward:0,right:0},this.movePointer=null,this.lookPointer=null,this.lookPoint=null,this.pad=t,this.thumb=n,this.canvas=e,document.body.classList.toggle("touch-ui",this.enabled);let r=l=>this.enabled&&this.active&&l.pointerType!=="mouse",o=l=>{let h=t.getBoundingClientRect(),u=h.width*.34,d=l.clientX-h.left-h.width/2,f=l.clientY-h.top-h.height/2,p=Math.hypot(d,f),_=Math.min(1,u/(p||1));d*=_,f*=_;let m=Math.hypot(d,f)/u;this.axes.forward=m<.13?0:-f/u,this.axes.right=m<.13?0:d/u,n.style.transform=`translate(${d}px,${f}px)`};t.addEventListener("pointerdown",l=>{!r(l)||this.movePointer!==null||(l.preventDefault(),this.movePointer=l.pointerId,t.setPointerCapture(l.pointerId),t.classList.add("engaged"),o(l))}),t.addEventListener("pointermove",l=>{l.pointerId===this.movePointer&&(l.preventDefault(),o(l))});let a=l=>{l.pointerId===this.movePointer&&this.resetMovement()};for(let l of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(l,a);e.addEventListener("pointerdown",l=>{!r(l)||this.lookPointer!==null||(l.preventDefault(),this.lookPointer=l.pointerId,this.lookPoint=[l.clientX,l.clientY],e.setPointerCapture(l.pointerId))}),e.addEventListener("pointermove",l=>{l.pointerId!==this.lookPointer||!this.lookPoint||!this.active||(l.preventDefault(),i(l.clientX-this.lookPoint[0],l.clientY-this.lookPoint[1]),document.getElementById("look-hint").hidden=!0,this.lookPoint=[l.clientX,l.clientY])});let c=l=>{l.pointerId===this.lookPointer&&(this.lookPointer=null,this.lookPoint=null)};for(let l of["pointerup","pointercancel","lostpointercapture"])e.addEventListener(l,c);window.addEventListener("blur",()=>this.reset()),window.addEventListener("resize",()=>this.reset()),document.addEventListener("visibilitychange",()=>this.reset()),t.addEventListener("contextmenu",l=>l.preventDefault())}resetMovement(){this.axes.forward=0,this.axes.right=0,this.movePointer=null,this.thumb.style.transform="",this.pad.classList.remove("engaged")}reset(){let e=this.movePointer,t=this.lookPointer;this.resetMovement(),this.lookPointer=null,this.lookPoint=null,e!==null&&this.pad.hasPointerCapture(e)&&this.pad.releasePointerCapture(e),t!==null&&this.canvas.hasPointerCapture(t)&&this.canvas.releasePointerCapture(t)}setActive(e){this.active=e,e||this.reset()}};var bc=class{constructor(){this.reset()}reset(){this.phase="waiting",this.survived=0}begin(){return this.phase!=="waiting"?!1:(this.phase="chasing",!0)}advance(e,t=!0){t&&this.phase==="chasing"&&Number.isFinite(e)&&e>0&&(this.survived+=e)}catch(){this.phase==="chasing"&&(this.phase="caught")}snapshot(){return{phase:this.phase,survived:this.survived,trigger:"garden shed bow pickup"}}};var oa=class{constructor(e=0,{type:t="shambler",style:n="classic",boss:i=!1,deathVariant:r=e%3}={}){this.group=new at,this.group.name=`Easter pursuer ${e+1}`,this.variant=e,this.heading=0,this.type=t,this.style=n,this.boss=i,this.small=n==="child",this.deathVariant=r,this.deathDuration=i?2.6:t==="brute"?2.35:t==="runner"?1.95:2.15,this.group.scale.set(...t==="brute"?[1.26,1.06,1.18]:t==="runner"?[.91,.97,.93]:t==="flanker"?[.96,1,.96]:[1,1,1]),this.small?this.group.scale.set(.66,.71,.66):i?this.group.scale.set(1.17,1.1,1.12):n.startsWith("woman")&&this.group.scale.multiply(new P(.95,.99,.95));let o=(x,E={})=>new ln({color:x,roughness:.94,flatShading:!0,...E}),a=o(["#89936f","#87917c","#929578"][e%3]),c=o({"woman-coat":"#665365","woman-hoodie":"#4b6571",worker:"#756547",hoodie:"#596b54",child:"#8c6b45",suit:"#3f4652",groundskeeper:"#485442"}[n]??["#485249","#5d5144","#40565b"][e%3]),l=o(n==="worker"?"#7a6b3c":"#27302e"),h=o(["#343b38","#34383f","#424137"][e%3]),u=o("#9a987f"),d=o("#d4cf9e",{emissive:"#9b9b57",emissiveIntensity:.22}),f=new xo(1,8,6),p=new dt(1,1,1),_=new as(1,1,3,7),m=(x,E,R,I,D)=>{let O=new je(E,R);return O.position.set(...I),O.scale.set(...D),O.castShadow=!0,O.receiveShadow=!0,x.add(O),O},g=(x,E)=>{let R=new at;return R.position.set(...E),x.add(R),R},b=(x,E,R,I)=>m(x,_,E,[0,-R/2,0],[I,R/3,I]);this.body=g(this.group,[0,.83,0]),m(this.body,f,h,[0,.025,0],[.163,.13,.105]),this.chest=g(this.body,[0,.15,0]),this.chest.rotation.x=.16,m(this.chest,_,c,[0,.185,0],[.158,.17,.1]);for(let x=0;x<5;x++)m(this.chest,p,c,[-.12+x*.06,-.062-x%2*.023,.025],[.053,.085+x%2*.035,.17]);m(this.chest,p,u,[0,.205,.102],[.09,.31,.012]);for(let x of[-1,1]){let E=m(this.chest,p,c,[x*.066,.23,.117],[.045,.29,.022]);E.rotation.z=x*.14}m(this.chest,p,l,[0,.16,.128],[.023,.27,.014]),this.head=g(this.chest,[0,.495,.045]),this.head.rotation.z=-.12-e*.025,m(this.head,_,a,[0,-.069,0],[.043,.045,.048]),m(this.head,f,a,[0,.059,.003],[.123,.151,.113]),m(this.head,f,a,[0,-.015,.052],[.091,.065,.074]);for(let x of[-1,1]){m(this.head,f,a,[x*.12,.045,0],[.026,.041,.019]);let E=m(this.head,f,l,[x*.047,.076,.099],[.039,.025,.02]);E.rotation.z=x*.12,m(this.head,f,d,[x*.047,.075,.116],[.016,.01,.007]);let R=m(this.head,p,a,[x*.047,.103,.111],[.072,.018,.025]);R.rotation.z=x*.15}m(this.head,p,a,[0,.04,.12],[.032,.055,.032]);let T=m(this.head,p,l,[.005,-.013,.116],[.066,.014,.014]);if(T.rotation.z=.1,m(this.head,f,l,[-.01,.17,-.016],[.117,.051,.099]),m(this.head,f,l,[-.099,.091,-.045],[.031,.086,.075]),n==="woman-coat"&&(m(this.head,f,l,[.015,.035,-.058],[.132,.177,.085]),m(this.head,f,l,[.097,-.035,.017],[.037,.124,.073]),m(this.chest,p,c,[0,-.1,-.008],[.315,.23,.22]),m(this.chest,p,u,[0,.005,.113],[.28,.027,.018])),n==="hoodie"||n==="woman-hoodie"){let x=m(this.head,new an(.126,.03,5,12),l,[0,.06,-.025],[1,1.22,.95]);m(this.head,f,l,[0,.075,-.07],[.134,.166,.077]);for(let E of[-1,1])m(this.chest,p,u,[E*.04,.255,.124],[.009,.17,.009]);n==="woman-hoodie"&&m(this.head,f,l,[.028,-.06,-.145],[.058,.116,.055])}if(n==="worker"&&(m(this.head,f,l,[0,.189,-.008],[.141,.078,.13]),m(this.head,p,l,[0,.152,.018],[.3,.02,.3]),m(this.chest,p,u,[0,.26,.121],[.29,.039,.015])),n==="suit"){for(let x of[-1,1]){let E=m(this.chest,p,u,[x*.043,.332,.125],[.048,.08,.02]);E.rotation.z=x*.45}m(this.chest,p,l,[0,.307,.144],[.035,.042,.02])}this.small&&(this.head.scale.setScalar(1.18),m(this.chest,p,u,[0,.11,.113],[.115,.12,.019])),(i||n==="groundskeeper")&&(m(this.chest,p,c,[0,-.11,0],[.33,.26,.235]),m(this.chest,p,u,[0,.16,.122],[.17,.34,.022]),m(this.head,p,l,[0,.168,.047],[.25,.042,.255]),m(this.head,f,l,[0,-.04,.048],[.1,.088,.084])),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[];for(let x of[-1,1]){let E=g(this.chest,[x*(i?.166:.194),.355,0]);E.rotation.z=x*.09,b(E,c,.255,.058);let R=g(E,[0,-.25,0]);m(R,f,a,[0,0,0],[.044,.045,.044]),b(R,a,.255,.043),m(R,f,a,[0,-.282,.006],[.05,.073,.033]),m(R,p,a,[x*.029,-.292,.029],[.022,.072,.02]),this.arms.push(E),this.elbows.push(R);let I=g(this.body,[x*.092,-.024,0]);b(I,h,.36,.07);let D=g(I,[0,-.355,0]);b(D,h,.31,.051),m(D,f,h,[0,0,0],[.057,.06,.054]),this.feet.push(m(D,p,l,[0,-.36,.044],[.13,.11,.25])),this.legs.push(I),this.knees.push(D)}let v=new Set,M=[];this.group.traverse(x=>{x.isMesh?v.add(x.geometry):M.push(x)});for(let x of M){let E=new Map;for(let R of[...x.children])if(R.isMesh){let I=E.get(R.material)??[];I.push(R),E.set(R.material,I)}for(let[R,I]of E)if(I.length>1){let D=I.map(L=>(L.updateMatrix(),L.geometry.clone().applyMatrix4(L.matrix))),O=new je(xr(D),R);O.castShadow=!0,O.receiveShadow=!0,I.forEach(L=>x.remove(L)),x.add(O),D.forEach(L=>L.dispose())}}let S=new Set;this.meshCount=0,this.bodyMeshes=[],this.group.traverse(x=>{x.isMesh&&(S.add(x.geometry),this.meshCount++,this.bodyMeshes.push(x))}),v.forEach(x=>{S.has(x)||x.dispose()}),this.head.traverse(x=>{x.isMesh&&(x.userData.hitZone="head")});let A=new Set;this.group.traverse(x=>{x.isMesh&&A.add(x.material)}),this.materials=[...A];for(let x of this.materials)x.userData.baseEmissive=x.emissive.clone();this.solePoint=new P,this.motionBlend=0,this.lookYaw=0,this.previousAction="",this.recoilSide=e%2?1:-1,this.update(0,{x:0,y:0,z:0},{x:0,y:-1},!1,0)}soleHeights(){return this.group.updateMatrixWorld(!0),this.feet.map(e=>{let t=1/0;for(let n of[-.5,.5])for(let i of[-.5,.5])for(let r of[-.5,.5])this.solePoint.set(n,i,r).applyMatrix4(e.matrixWorld),t=Math.min(t,this.solePoint.y);return t})}update(e,t,n,i,r=1/60,o={}){let a=!!o.running,c=this.type==="brute",l=this.type==="flanker",h=(a?7:c?2.8:l?4.5:3.8)*(this.small?1.2:this.boss?.88:1),u=e*h,d=Math.sin(u),f=-d,p=Math.sin(e*1.43+this.variant*1.91);this.motionBlend+=(Number(i)-this.motionBlend)*Math.min(1,Math.max(0,r)*9);let _=this.motionBlend,m=Math.max(0,Math.sin(e*.55+this.variant*2.23))**10,g=o.state??"pursue";g==="stagger"&&this.previousAction!=="stagger"&&(this.recoilSide*=-1),this.previousAction=g,this.group.position.set(t.x,t.z+.01,-t.y);let b=0;if(Math.hypot(n.x,n.y)>1e-4){let M=Math.atan2(n.x,-n.y),S=Math.atan2(Math.sin(M-this.heading),Math.cos(M-this.heading));this.heading+=S*Math.min(1,r*8),b=Math.atan2(Math.sin(M-this.heading),Math.cos(M-this.heading))}this.lookYaw+=(Math.max(-.55,Math.min(.55,b))*.8-this.lookYaw)*Math.min(1,r*10),this.group.rotation.y=this.heading,this.body.position.set(0,.8,0),this.body.scale.set(1,1,1),this.body.rotation.set(l?.035:0,(a?.075:c?.06:.04)*d*_,.008*p+(c?.045:a?.018:.028)*d*_),this.chest.rotation.set((l?.28:a?.23:c?.12:.17)+.008*p,-d*_*(a?.13:l?.1:.055),p*.012-d*_*(c?.07:.035)),this.head.rotation.set(.015*p,this.lookYaw+(1-_)*(.13*Math.sin(e*.71+this.variant)+m*.18),-.09-this.variant*.02+.04*Math.sin(e*1.7+this.variant));let T=a?.49:c?.235:l?.3:.31;for(let M=0;M<2;M++){let S=M?f:d,A=M?1:-1;this.legs[M].rotation.set(S*T*_,0,A*(c?.026:.012)),this.knees[M].rotation.set((l?.16:M?.035:0)+Math.max(0,-S)*(a?.78:l?.4:.28)*_,0,0),this.arms[M].rotation.set(a?-.38+S*.61:-(M?.91:.69)+S*.09*_+.035*p,A*(l?.1:.025),A*(.075+.035*S*_)),this.elbows[M].rotation.set(a?-.83-S*.17:-(M?.22:.17),0,0)}!i&&g==="pursue"&&(this.arms[this.variant%2].rotation.x-=m*.26,this.elbows[(this.variant+1)%2].rotation.x-=m*.17),(g==="hide"||g==="peek")&&(this.chest.rotation.x=.31,this.knees[0].rotation.x=this.knees[1].rotation.x=.28,this.head.rotation.y=this.lookYaw+Math.sin(e*1.35+this.variant)*.22,this.chest.rotation.y=(g==="peek"?.13:.04)*Math.sin(e*1.35),this.arms[0].rotation.x=-.5,this.arms[1].rotation.x=-.6);let v=Math.max(0,Math.min(1,o.progress??0));if(g==="windup"){let M=v*v*(3-2*v);this.arms[0].rotation.x=-.9-M*1.75,this.arms[1].rotation.x=c?this.arms[0].rotation.x:-.85-M*.74,this.elbows[0].rotation.x=c?-.55:-.4,this.elbows[1].rotation.x=c?-.55:-.24,this.chest.rotation.x=.16-M*(c?.22:.15),this.chest.rotation.y=c?0:-M*.17,this.head.rotation.x=-M*.065,this.body.rotation.z=c?0:-M*.03}else if(g==="recover"){let M=Math.sin(Math.min(1,v/.28)*Math.PI/2),S=Math.max(0,(v-.28)/.72),A=-2.65+M*2.27-S*.31;this.arms[0].rotation.x=A,this.arms[1].rotation.x=c?A:-1.59+M*.95-S*.27,this.elbows[0].rotation.x=c?-.55+M*.42:-.4+M*.25,this.elbows[1].rotation.x=c?this.elbows[0].rotation.x:-.22,this.chest.rotation.x=(c?-.06:.01)+M*(c?.5:.32)-S*.28,this.chest.rotation.y=c?0:-.17+M*.35-S*.18,this.head.rotation.x=M*.08*(1-S)}else if(g==="stagger"){let M=Math.sin(v*Math.PI),S=c?.11:this.type==="runner"?.34:l?.23:.26;this.body.rotation.x=-S*M,this.body.rotation.y=this.recoilSide*S*.65*M,this.body.rotation.z=this.recoilSide*S*.2*M,this.head.rotation.x=-S*.65*M,this.head.rotation.z+=this.recoilSide*.2*M,this.arms[0].rotation.x-=M*.34,this.arms[1].rotation.x+=M*.16}if(g==="dead"){let M=Math.max(0,Math.min(1,(v-.06)/.54)),S=M*M*(3-2*M),A=this.variant%2?1:-1,x=this.type==="runner"?Math.sin(Math.min(1,v/.3)*Math.PI)*.12:0;this.body.position.y=.8-.57*S,this.body.position.z=(this.deathVariant===0?-.13:this.deathVariant===1?-.05:0)*S,this.body.rotation.y=A*.07*S,this.body.rotation.z=0,this.deathVariant===1?(this.body.rotation.z=A*1.45*S,this.body.rotation.x=.1*S,this.chest.rotation.x=.17+.08*S,this.body.position.x=A*.05*S):this.deathVariant===2?(this.body.rotation.x=-1.55*S-x,this.chest.rotation.x=.17-.1*S):(this.body.rotation.x=1.5*S+x,this.chest.rotation.x=.17+.23*S),this.head.rotation.x=.2*S,this.head.rotation.z+=A*.1*S,this.legs[0].rotation.x=this.legs[1].rotation.x=-(this.deathVariant===0?1:this.deathVariant===1?.5:.4)*S,this.knees[0].rotation.x=this.knees[1].rotation.x=(this.deathVariant===0?2.2:this.deathVariant===1?1:.8)*S,this.arms[0].rotation.x=this.arms[1].rotation.x=-.16-S*.12,this.arms[0].rotation.z=-.065,this.arms[1].rotation.z=.065,this.elbows[0].rotation.x=this.elbows[1].rotation.x=-.25-S*.32}for(let M=0;M<2;M++)this.feet[M].rotation.set(...g==="dead"?[0,0,0]:[-this.legs[M].rotation.x-this.knees[M].rotation.x-this.body.rotation.x,0,-this.legs[M].rotation.z-this.body.rotation.z]);if(g!=="dead"){let M=Math.min(...this.soleHeights());this.body.position.y+=(t.z+.004-M)/this.group.scale.y}this.group.updateMatrixWorld(!0);for(let M of this.materials){M.emissive.copy(M.userData.baseEmissive),o.hitFlash>0&&M.emissive.addScalar(o.hitFlash*.35);let S=g==="dead"?Math.max(0,Math.min(1,(1-v)/.26)):1;M.transparent!==S<1&&(M.transparent=S<1,M.needsUpdate=!0),M.opacity=S,M.depthWrite=S>.5}if(g==="dead"){this.deathBounds??=new Qt,this.meshBounds??=new Qt,this.group.updateMatrixWorld(!0),this.deathBounds.makeEmpty();for(let M of this.bodyMeshes)M.geometry.boundingBox||M.geometry.computeBoundingBox(),this.meshBounds.copy(M.geometry.boundingBox).applyMatrix4(M.matrixWorld),this.deathBounds.union(this.meshBounds);this.group.position.y+=t.z+.005-this.deathBounds.min.y}}dispose(){let e=new Set,t=new Set;this.group.traverse(n=>{n.isMesh&&(e.add(n.geometry),t.add(n.material))}),e.forEach(n=>n.dispose()),t.forEach(n=>n.dispose()),this.group.removeFromParent()}};var Sr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),Vu=s=>({x:s.x,y:s.y,z:s.z}),yp=()=>globalThis.performance?.now()??Date.now(),aa=class extends Mr{constructor(e){super({...e}),this.allSegments=this.segments,this.allObstacles=e.obstacles,this.allSurfaces=e.surfaces,this.buckets=new Map}bucket(e,t){let n=Math.floor(e/2),i=Math.floor(t/2),r=`${n},${i}`;if(this.buckets.has(r))return this.buckets.get(r);let o=(f,p,_,m)=>f<=n*2+2&&_>=n*2&&p<=i*2+2&&m>=i*2,a=f=>[Math.min(...f.map(p=>p[0])),Math.min(...f.map(p=>p[1])),Math.max(...f.map(p=>p[0])),Math.max(...f.map(p=>p[1]))],c=.3,l=this.allSegments.filter(f=>{let p=f.thickness/2+c;return o(Math.min(f.a[0],f.b[0])-p,Math.min(f.a[1],f.b[1])-p,Math.max(f.a[0],f.b[0])+p,Math.max(f.a[1],f.b[1])+p)}),h=this.allObstacles.filter(f=>{let[p,_,m,g]=f.box??a(f.polygon);return o(p-c,_-c,m+c,g+c)}),u=this.allSurfaces.filter(f=>o(...a(f.polygon))),d={segments:l,obstacles:h,surfaces:u};return this.buckets.set(r,d),d}blocked(e,t,n){let i=this.bucket(e,t);return this.segments=i.segments,this.data.obstacles=i.obstacles,super.blocked(e,t,n)}support(e,t,n){return this.data.surfaces=this.bucket(e,t).surfaces,super.support(e,t,n)}},wc=class{constructor(e,{spacing:t=.2,radius:n=.18}={}){this.nav=new aa(e),this.nav.radius=n,this.spacing=t,this.cells=new Map,this.edges=new Map,this.nodes=[],this.data=e}cell(e,t){let n=`${e},${t}`;if(this.cells.has(n))return this.cells.get(n);let i=e*this.spacing,r=t*this.spacing,o=[0,this.data.levelHeight],a=this.nav.stairHeight(i,r);a!==null&&o.push(a);let c=[];for(let l of o){let h=this.nav.support(i,r,l);if(h===null||c.some(d=>Math.abs(d.z-h)<.035)||this.nav.blocked(i,r,h))continue;let u={x:i,y:r,z:h,ix:e,iy:t,id:this.nodes.length};this.nodes.push(u),c.push(u)}return this.cells.set(n,c),c}clear(e,t){let n=Math.hypot(t.x-e.x,t.y-e.y);if(n<1e-5)return Math.abs(e.z-t.z)<.04;let i=Math.ceil(n/.04),r=e.z;for(let o=1;o<=i;o++){let a=o/i,c=e.x+(t.x-e.x)*a,l=e.y+(t.y-e.y)*a,h=this.nav.support(c,l,r);if(h===null||this.nav.blocked(c,l,h))return!1;r=h}return Math.abs(r-t.z)<.045}connectors(e,t=!0){let n=Math.round(e.x/this.spacing),i=Math.round(e.y/this.spacing),r=[];for(let o=-2;o<=2;o++)for(let a=-2;a<=2;a++)for(let c of this.cell(n+o,i+a))Math.abs(c.z-e.z)>.35||r.push(c);return r.sort((o,a)=>Sr(o,e)-Sr(a,e)).filter(o=>t?this.clear(e,o):this.clear(o,e)).slice(0,8)}neighbours(e){if(this.edges.has(e.id))return this.edges.get(e.id);let t=[];for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++)if(!(!n&&!i))for(let r of this.cell(e.ix+n,e.iy+i))Math.abs(r.z-e.z)>.39||!this.clear(e,r)||t.push(r);return this.edges.set(e.id,t),t}search(e,t){return new Wu(this,e,t)}path(e,t,n=6e4){let i=this.search(e,t);for(;!i.done&&i.expanded<n;)i.step(1e3,1/0);return i.path}},Gu=class{constructor(){this.a=[]}push(e){let t=this.a,n=t.length;for(t.push(e);n;){let i=n-1>>1;if(t[i].f<=e.f)break;t[n]=t[i],n=i}t[n]=e}pop(){let e=this.a,t=e[0],n=e.pop();if(e.length){let i=0;for(;2*i+1<e.length;){let r=2*i+1;if(r+1<e.length&&e[r+1].f<e[r].f&&r++,e[r].f>=n.f)break;e[i]=e[r],i=r}e[i]=n}return t}get length(){return this.a.length}},Wu=class{constructor(e,t,n){this.planner=e,this.from=Vu(t),this.to=Vu(n),this.path=null,this.done=!1,this.expanded=0,this.heap=new Gu,this.cost=new Map,this.parent=new Map,this.closed=new Set,this.initialized=!1}step(e=48,t=3){if(this.done)return!0;let n=yp(),i=this.planner;if(!this.initialized){if(this.initialized=!0,i.clear(this.from,this.to))return this.path=[this.from,this.to],this.done=!0,!0;let o=i.connectors(this.to,!1);this.goals=new Set(o.map(a=>a.id));for(let a of i.connectors(this.from)){let c=Sr(this.from,a);this.cost.set(a.id,c),this.heap.push({n:a,g:c,f:c+Sr(a,this.to)})}if(!this.goals.size||!this.heap.length)return this.done=!0,!0}let r=0;for(;this.heap.length&&r<e&&yp()-n<t;){let{n:o,g:a}=this.heap.pop();if(!this.closed.has(o.id)){if(this.closed.add(o.id),this.expanded++,r++,this.goals.has(o.id)){let c=[this.to],l=o;for(;l;)c.push(Vu(l)),l=i.nodes[this.parent.get(l.id)];return c.push(this.from),this.path=c.reverse(),this.done=!0,!0}for(let c of i.neighbours(o)){if(this.closed.has(c.id))continue;let l=a+Sr(o,c);l>=(this.cost.get(c.id)??1/0)||(this.cost.set(c.id,l),this.parent.set(c.id,o.id),this.heap.push({n:c,g:l,f:l+Sr(c,this.to)}))}if(this.expanded>=6e4)return this.done=!0,!0}}return this.heap.length||(this.done=!0),this.done}};var mn=s=>({x:s.x,y:s.y,z:s.z}),br=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),gn=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),wr=()=>performance.now(),Tr=(s,e=0)=>{let t=s+Math.imul(e+17,92821)>>>0;return t=Math.imul(t^t>>>16,73244475),t=Math.imul(t^t>>>16,73244475),((t^t>>>16)>>>0)/4294967296},yy=Object.freeze({shambler:{health:75,speed:1.06,radius:.25,wallRadius:.18,damage:12,range:.84,windup:.78,recovery:1.05},runner:{health:52,speed:1.88,radius:.23,wallRadius:.18,damage:9,range:.79,windup:.48,recovery:.82},brute:{health:180,speed:.79,radius:.31,wallRadius:.23,damage:26,range:1.02,windup:1.16,recovery:1.48},flanker:{health:90,speed:1.31,radius:.24,wallRadius:.18,damage:14,range:.85,windup:.64,recovery:1.03}}),Tc=class{constructor(e,{maxAlive:t=12,onAttack:n=()=>{},onDeath:i=()=>{}}={}){this.data=e,this.maxAlive=Math.max(1,Math.min(20,Math.floor(t))),this.onAttack=n,this.onDeath=i,this.group=new at,this.group.name="Survival horde",this.actors=[],this.planners=new Map,this.nextId=1,this.time=0,this.wave=0,this.total=0,this.spawned=0,this.killed=0,this.skipped=0,this.droppedSpawns=0,this.active=!1,this.player={x:0,y:0,z:0},this.heading={x:0,y:1},this.spawnJob=null,this.candidates=[],this.nextSpawn=0,this.spawnStall=0,this.candidateRounds=0,this.roundRobin=0}get positions(){return this.actors.filter(e=>e.alive).map(e=>mn(e.nav.position))}planner(e=.18){return this.planners.has(e)||this.planners.set(e,new wc(this.data,{radius:e,spacing:e>.24?.16:.2})),this.planners.get(e)}reset(){for(let e of this.actors)e.figure.dispose();this.actors=[],this.group.clear(),this.spawnJob=null,this.candidates=[],this.active=!1,this.total=this.spawned=this.killed=this.skipped=this.droppedSpawns=0,this.spawnStall=0,this.candidateRounds=0,this.time=0}startWave(e,t,n){return this.reset(),this.wave=Math.max(1,Math.floor(e)),this.total=Math.max(1,Math.floor(n??4+this.wave*3)),this.active=!0,this.player=mn(t),this.nextSpawn=0,this.state()}state(){let e=this.actors.filter(i=>i.alive).length,t=Math.max(0,this.total-this.spawned-this.droppedSpawns),n=this.actors.find(i=>i.alive&&i.boss);return{wave:this.wave,alive:e,queued:t,killed:this.killed,total:this.total,spawned:this.spawned,skipped:this.skipped,complete:this.active&&e===0&&t===0&&!this.spawnJob,positions:this.positions,boss:n?{id:n.id,health:n.health,maxHealth:n.maxHealth}:null}}blocks(e,t=.18,n=null){return this.actors.some(i=>i.alive&&i.id!==n&&Math.abs(i.nav.position.z-e.z)<1.6&&gn(i.nav.position,e)<i.radius+t+1e-5)}typeFor(e){let t=this.wave%5===0?["brute","shambler","brute","runner","brute","flanker","brute","shambler"]:this.wave%3===0?["runner","runner","shambler","runner","flanker","runner","brute","runner"]:this.wave===1?["shambler","shambler","runner","shambler"]:this.wave===2?["shambler","runner","flanker","shambler","runner"]:["shambler","runner","flanker","brute","runner","shambler"];return t[e%t.length]}appearance(e,t){let n=this.wave%5===0&&e===0,i=["woman-coat","worker","hoodie","child","suit","woman-hoodie"],r=n?"groundskeeper":i[(e+this.wave-1)%i.length];r==="child"&&t==="brute"&&(r="worker");let o={...yy[t]};return n?Object.assign(o,{health:350,speed:.69,radius:.32,wallRadius:.25,damage:34,windup:1.38,recovery:1.75,range:1.08}):r==="child"&&Object.assign(o,{health:Math.round(o.health*.65),speed:o.speed*1.08,radius:.17,wallRadius:.13,range:.66,windup:o.windup*.9,recovery:o.recovery*.92}),{style:r,boss:n,stats:o}}spawnCandidates(e,t,n){let i=this.planner(n),r=[];for(let l of this.data.rooms??[]){let[h,u,d]=l.position;for(let[f,p]of[[0,0],[.65,0],[-.65,0],[0,.65],[0,-.65]])r.push({x:h+f,y:u+p,z:d})}for(let l of[6,9,13])for(let h=0;h<20;h++){let u=h*Math.PI/10;r.push({x:e.x+Math.cos(u)*l,y:e.y+Math.sin(u)*l,z:e.z})}let o=Math.hypot(t.x,t.y)||1,a=t.x/o,c=t.y/o;return r.filter(l=>br(l,e)>5&&br(l,e)<27&&i.nav.support(l.x,l.y,l.z)!==null&&!i.nav.blocked(l.x,l.y,l.z)&&!this.blocks(l,.45)).map(l=>{let h=gn(l,e),u=((l.x-e.x)*a+(l.y-e.y)*c)/(h||1)>.55;return{...l,score:Math.abs(h-9)+(u?6:0)+Math.abs(l.z-e.z)*.7}}).sort((l,h)=>l.score-h.score).slice(0,90)}createActor(e,t,n,i=this.appearance(this.spawned,e)){let{stats:r,style:o,boss:a}=i,c=this.nextId++,l=a?0:Math.floor(Tr(c,55)*3),h=new oa(c%3,{type:e,style:o,boss:a,deathVariant:l});h.group.userData.actorId=c,h.group.traverse(_=>{_.isMesh&&(_.userData.actorId=c)}),this.group.add(h.group);let u=new aa(this.data);u.radius=r.wallRadius,u.position=mn(t);let d=1+Math.min(.55,Math.max(0,this.wave-1)*.035),f=Math.round(r.health*d),p={id:c,type:e,style:o,boss:a,stats:r,figure:h,nav:u,radius:r.radius,health:f,maxHealth:f,alive:!0,state:"pursue",stateTime:0,path:n,index:1,job:null,lastTarget:mn(this.player),nextPlan:this.time+.4+c%5*.12,stalled:0,unreachable:0,lastProgress:this.time,phase:c*1.713,flankSide:c%2?1:-1,flankUntil:0,attackAim:{x:0,y:1},hitFlash:0,staggerDuration:.35,deathTime:0,deathDuration:h.deathDuration,deathVariant:l,knockback:{x:0,y:0},speedMultiplier:.78+Tr(c,this.wave)*.47,temperament:!a&&this.wave>2&&(this.spawned+this.wave)%7===0?"ambusher":"pursuer",hideGoal:null,hideUntil:0,nextHide:this.time+12+Tr(c,9)*8,alerted:!1,noticeDirection:{x:this.player.x-t.x,y:this.player.y-t.y}};return h.update(this.time,t,{x:this.player.x-t.x,y:this.player.y-t.y},!1,1),this.actors.push(p),this.spawned++,p.temperament==="ambusher"&&this.beginHide(p),p}spawnStep(e,t){if(!(this.state().queued<=0||this.actors.filter(n=>n.alive).length>=this.maxAlive)&&(this.spawnStall+=e,!(this.time<this.nextSpawn))){if(!this.spawnJob){let n=this.typeFor(this.spawned),i=this.appearance(this.spawned,n),r=i.stats.wallRadius;this.candidates.length||(this.candidates=this.spawnCandidates(this.player,this.heading,r),this.candidateRounds++);let o=this.candidates.shift();o&&!this.planner(r).nav.blocked(o.x,o.y,o.z)&&(this.spawnJob={point:o,type:n,appearance:i,job:this.planner(r).search(o,this.player),started:this.time})}if(this.spawnJob&&wr()<t){let{point:n,type:i,appearance:r,job:o,started:a}=this.spawnJob;o.step(28,Math.max(.1,t-wr())),(o.done||o.expanded>12e3||this.time-a>8)&&(o.path&&br(n,this.player)>5&&!this.blocks(n,r.stats.radius+.16)&&(this.createActor(i,n,o.path,r),this.nextSpawn=this.time+Math.max(.28,.72-this.wave*.035),this.spawnStall=0,this.candidateRounds=0),this.spawnJob=null)}if(this.spawnStall>28){let n=this.state().queued;this.skipped+=n,this.droppedSpawns+=n,this.spawnJob=null,this.candidates=[]}}}target(e){let t=e.nav.position,n=this.player,i=this.planner(e.stats.wallRadius);if(e.hideGoal&&["seeking-hide","hide","peek"].includes(e.state))return mn(e.hideGoal);if(e.type==="flanker"&&gn(t,n)>2.3&&Math.abs(t.z-n.z)<.3){let r=n.x-t.x,o=n.y-t.y,a=Math.hypot(r,o)||1,c=1.25*e.flankSide,l={x:n.x-o/a*c,y:n.y+r/a*c,z:n.z};if(i.nav.support(l.x,l.y,l.z)!==null&&!i.nav.blocked(l.x,l.y,l.z)&&i.clear(l,n))return l}return mn(n)}canSee(e,t=this.player){let n=e.nav.position,i=t.x-n.x,r=t.y-n.y,o=Math.hypot(i,r),a=e.noticeDirection;if(o>12||Math.abs(n.z-t.z)>.45)return!1;let c=Math.hypot(a.x,a.y)||1;return(i*a.x+r*a.y)/(Math.max(.001,o)*c)>.5&&this.planner(e.stats.wallRadius).clear(n,t)}wallOccludes(e,t){let n=this.player,i=n.x-t.x,r=n.y-t.y;for(let o of this.planner(e.stats.wallRadius).nav.allSegments){if(o.bottom>t.z+1.3||o.top<t.z+1.3)continue;let a=o.b[0]-o.a[0],c=o.b[1]-o.a[1],l=i*c-r*a;if(Math.abs(l)<1e-8)continue;let h=o.a[0]-t.x,u=o.a[1]-t.y,d=(h*c-u*a)/l,f=(h*r-u*i)/l;if(d>0&&d<1&&f>=0&&f<=1)return!0}return!1}coverPoint(e){let t=e.nav.position,n=this.planner(e.stats.wallRadius);if(this.wallOccludes(e,t))return mn(t);let i=[];for(let r of n.nav.allSegments){if(r.bottom>t.z+.3||r.top<t.z+1.2)continue;let o=r.b[0]-r.a[0],a=r.b[1]-r.a[1],c=Math.hypot(o,a);if(c<.6)continue;let l=o/c,h=a/c,u=r.thickness/2+e.stats.wallRadius+.16;for(let d of[r.a,r.b])for(let f of[-1,1]){let p={x:d[0]-h*u*f,y:d[1]+l*u*f,z:t.z};gn(t,p)<4&&gn(p,this.player)>2&&i.push(p)}}for(let r of i.sort((o,a)=>gn(o,t)-gn(a,t)).slice(0,18))if(n.nav.support(r.x,r.y,r.z)!==null&&!n.nav.blocked(r.x,r.y,r.z)&&!this.blocks(r,e.radius,e.id)&&this.wallOccludes(e,r))return r;return null}beginHide(e){let t=this.coverPoint(e);if(e.nextHide=this.time+14+Tr(e.id,Math.floor(this.time))*8,!t)return!1;let n=e.path?.[1]??this.player;return e.hideGoal=t,e.hideUntil=this.time+6+Tr(e.id,4)*3.5,e.state=gn(t,e.nav.position)<.2?"hide":"seeking-hide",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=!1,e.noticeDirection={x:n.x-e.nav.position.x,y:n.y-e.nav.position.y},e.peekBase=Math.atan2(e.noticeDirection.y,e.noticeDirection.x),!0}endHide(e,t=!1){e.hideGoal=null,e.state="pursue",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=t}canStrike(e,t=0){let n=e.nav.position;return Math.abs(n.z-this.player.z)<.42&&gn(n,this.player)<=e.stats.range+t&&this.planner(e.stats.wallRadius).clear(n,this.player)}tryMove(e,t,n,{separate:i=!0}={}){let r=Math.max(1,Math.ceil(Math.hypot(t,n)/.035)),o=mn(e.nav.position);for(let a=0;a<r;a++){let c=mn(e.nav.position);e.nav.move(t/r,n/r);let l=e.nav.position;if(Math.abs(l.z-this.player.z)<1.6&&gn(l,this.player)<e.radius+.18||i&&this.blocks(l,e.radius,e.id)){e.nav.position=c;break}}return gn(o,e.nav.position)}moveActor(e,t){if(!e.path||e.index>=e.path.length)return 0;let n=this.planner(e.stats.wallRadius),i=e.nav.position;for(let T=Math.min(e.path.length-1,e.index+4);T>e.index;T--)if(br(i,e.path[T])<1.1&&n.clear(i,e.path[T])){e.index=T;break}let r=e.path[e.index],o=r.x-i.x,a=r.y-i.y,c=Math.hypot(o,a);if(c<.045)return e.index++,0;let l=e.stats.speed*e.speedMultiplier*(1+Math.min(.2,this.wave*.009));e.type==="runner"&&(l*=Math.sin(this.time*.8+e.phase)>.35?1.2:.84),e.type==="brute"&&(l*=.94+.06*Math.sin(this.time*2+e.phase));let h=Math.min(c,l*t),u=o/c,d=a/c,f=0,p=0;for(let T of this.actors)if(T!==e&&T.alive&&Math.abs(T.nav.position.z-i.z)<1.2){let v=i.x-T.nav.position.x,M=i.y-T.nav.position.y,S=Math.hypot(v,M),A=e.radius+T.radius+.35;S>0&&S<A&&(f+=v/S*(A-S)/A,p+=M/S*(A-S)/A)}let _=u+f*.8,m=d+p*.8,g=Math.hypot(_,m)||1,b=this.tryMove(e,_/g*h,m/g*h);if(b<h*.2){let T=e.flankSide;b+=this.tryMove(e,(u*.35-d*T*.75)*h,(d*.35+u*T*.75)*h)}return e.stalled=b<h*.12?e.stalled+t:Math.max(0,e.stalled-t*2),b>.003&&(e.lastProgress=this.time),e.stalled>.7&&(e.path=null,e.job=null,e.nextPlan=this.time+.15,e.stalled=0,e.flankSide*=-1),b}planActor(e,t){if(e.state==="hide"||e.state==="peek")return;let n=this.target(e),i=this.planner(e.stats.wallRadius);if(!e.job&&this.time>=e.nextPlan&&(!e.path||e.index>=e.path.length||br(n,e.lastTarget)>.75)&&(e.job=i.search(e.nav.position,n),e.lastTarget=mn(n),e.nextPlan=this.time+1+e.id%4*.14,e.jobStarted=this.time),e.job&&wr()<t&&(e.job.step(22,Math.max(.1,t-wr())),e.job.done||this.time-e.jobStarted>8)){if(e.job.path){e.path=e.job.path,e.index=1,e.unreachable=0;let r=1/0;for(let o=1;o<e.path.length;o++){let a=br(e.nav.position,e.path[o]);a<r&&i.clear(e.nav.position,e.path[o])&&(e.index=o,r=a)}}else e.unreachable++,e.path=null,e.nextPlan=this.time+1.4;e.job=null}e.unreachable>=5&&this.time-e.lastProgress>40&&(e.alive=!1,e.state="dead",e.deathTime=0,e.retired=!0,this.skipped++)}damage(e,t,{headshot:n=!1,knockback:i=null}={}){let r=this.actors.find(o=>o.id===e&&o.alive);if(!r||!Number.isFinite(t)||t<=0)return{hit:!1,killed:!1,id:e};if(r.health=Math.max(0,r.health-t),r.hitFlash=1,i){let o=Array.isArray(i)?i[0]:i.x,a=Array.isArray(i)?i[1]:i.y;if(Number.isFinite(o)&&Number.isFinite(a)){let c=Math.hypot(o,a),l=c>1.1?1.1/c:1;r.knockback={x:o*l,y:a*l}}}return r.health===0?(r.alive=!1,r.state="dead",r.deathTime=0,r.job=null,this.killed++,this.onDeath({id:r.id,type:r.type,style:r.style,boss:r.boss,headshot:n,position:mn(r.nav.position)})):(r.state="stagger",r.stateTime=0,r.hideGoal=null,r.alerted=!0,r.staggerDuration=(r.type==="brute"?.2:.34)+(n?.14:0)),{hit:!0,killed:!r.alive,health:r.health,id:e}}step(e,t,n={x:0,y:1}){if(!this.active)return this.state();e=Math.max(0,Math.min(.08,e)),this.time+=e,this.player=mn(t),this.heading=Array.isArray(n)?{x:n[0],y:n[1]}:typeof n=="number"?{x:-Math.sin(n),y:Math.cos(n)}:n;let i=wr()+4;this.spawnStep(e,i);let r=this.actors.filter(o=>o.alive);for(let o=0;o<r.length;o++){let a=r[(o+this.roundRobin)%r.length];if(wr()>=i)break;this.planActor(a,i)}this.roundRobin++;for(let o of[...this.actors]){let a=mn(o.nav.position);if(o.hitFlash=Math.max(0,o.hitFlash-e*5),!o.alive){o.deathTime+=e,o.figure.update(this.time,o.nav.position,{x:0,y:0},!1,e,{state:"dead",progress:o.deathTime/o.deathDuration}),o.deathTime>=o.deathDuration&&(o.figure.dispose(),this.actors.splice(this.actors.indexOf(o),1));continue}o.stateTime+=e;let c=0,l=o.knockback;if(Math.hypot(l.x,l.y)>.001){let d=1-Math.exp(-e*12);this.tryMove(o,l.x*d,l.y*d),l.x*=1-d,l.y*=1-d}if(["hide","peek","seeking-hide"].includes(o.state)){let d=o.peekBase+Math.sin(this.time*1.35+o.phase)*.55;o.noticeDirection={x:Math.cos(d),y:Math.sin(d)},this.time>=o.hideUntil||this.canSee(o)?this.endHide(o,this.canSee(o)):o.state==="seeking-hide"?(c=this.moveActor(o,e),o.hideGoal&&gn(o.nav.position,o.hideGoal)<.25&&(o.state="hide",o.stateTime=0,o.path=null,o.job=null)):o.state=Math.sin(this.time*1.2+o.phase)>.25?"peek":"hide"}else if(o.state==="pursue"&&o.type==="flanker"&&!o.boss&&this.wave>2&&this.time>=o.nextHide)o.nextHide=this.time+14,gn(o.nav.position,t)>2.5&&gn(o.nav.position,t)<9&&Tr(o.id,Math.floor(this.time/10))<.35&&this.beginHide(o)||(c=this.moveActor(o,e));else if(o.state==="stagger")o.stateTime>=o.staggerDuration&&(o.state="pursue",o.stateTime=0);else if(o.state==="windup"){if(o.stateTime>=o.stats.windup){let d=t.x-o.nav.position.x,f=t.y-o.nav.position.y,p=Math.hypot(d,f)||1;this.canStrike(o,.08)&&(d*o.attackAim.x+f*o.attackAim.y)/p>.55&&this.onAttack({id:o.id,type:o.type,damage:o.stats.damage,position:mn(o.nav.position)}),o.state="recover",o.stateTime=0}}else if(o.state==="recover")o.stateTime>=o.stats.recovery&&(o.state="pursue",o.stateTime=0);else if(this.canStrike(o)){let d=t.x-o.nav.position.x,f=t.y-o.nav.position.y,p=Math.hypot(d,f)||1;o.state="windup",o.stateTime=0,o.attackAim={x:d/p,y:f/p}}else c=this.moveActor(o,e);let h=o.state==="windup"||o.state==="recover"?o.attackAim:["hide","peek"].includes(o.state)?o.noticeDirection:{x:o.nav.position.x-a.x,y:o.nav.position.y-a.y};Math.hypot(h.x,h.y)>1e-4&&!["hide","peek","seeking-hide"].includes(o.state)&&(o.noticeDirection={...h});let u=o.state==="windup"?o.stats.windup:o.state==="recover"?o.stats.recovery:o.staggerDuration;o.figure.update(this.time+o.phase,o.nav.position,h,c>.001,e,{state:o.state,progress:o.stateTime/u,running:o.type==="runner"&&c>.001,hitFlash:o.hitFlash})}return this.state()}};var Nt={bow:{label:"Bow",magazine:1,reserve:18,damage:75,interval:.55,reload:0},pistol:{label:"Pistol",magazine:12,reserve:48,damage:42,interval:.24,reload:1.3},shotgun:{label:"Shotgun",magazine:6,reserve:24,damage:23,pellets:7,interval:.9,reload:2.1},carbine:{label:"Carbine",magazine:24,reserve:96,damage:30,interval:.115,reload:1.8}},Ec=s=>({total:4+s*2+(s%3===0?4:0),event:s%5===0?"Heavy footsteps":s%3===0?"The rush":"Hold the house",rest:14}),Ac=class{constructor(){this.reset()}reset(){this.health=100,this.score=0,this.kills=0,this.wave=0,this.phase="prepare",this.rest=0,this.inventory={},this.weapon=null,this.cooldown=0,this.reloading=0,this.charge=0,this.firing=!1,this.shoveCooldown=0,this.combo=0,this.comboTime=0}acquire(e){if(!Nt[e])return!1;if(this.inventory[e])return this.supply(),!1;let t=Nt[e];return this.inventory[e]={loaded:e==="bow"?0:t.magazine,reserve:t.reserve},this.weapon=e,this.reloading=0,this.firing=!1,!0}switch(e){this.inventory[e]&&(this.weapon=e,this.reloading=0,this.firing=!1,this.charge=0)}cycle(){let e=Object.keys(Nt).filter(t=>this.inventory[t]);e.length&&this.switch(e[(e.indexOf(this.weapon)+1)%e.length])}reload(){let e=this.inventory[this.weapon],t=Nt[this.weapon];return!e||this.weapon==="bow"||this.reloading||!e.reserve||e.loaded===t.magazine?!1:(this.reloading=t.reload,this.firing=!1,!0)}shoot(){let e=Nt[this.weapon],t=this.inventory[this.weapon];if(!e||this.cooldown>0||this.reloading>0||this.health<=0)return null;let n=this.weapon==="bow"?"reserve":"loaded";return t[n]<=0?(this.reload(),null):(t[n]--,this.cooldown=e.interval,{...e,id:this.weapon,charge:Math.max(.2,this.charge)})}tick(e){if(this.cooldown=Math.max(0,this.cooldown-e),this.shoveCooldown=Math.max(0,this.shoveCooldown-e),this.comboTime=Math.max(0,this.comboTime-e),this.comboTime||(this.combo=0),this.firing&&this.weapon==="bow"&&(this.charge=Math.min(1,this.charge+e/1.05)),this.reloading>0&&(this.reloading-=e,this.reloading<=0)){this.reloading=0;let t=this.inventory[this.weapon],n=Nt[this.weapon],i=Math.min(n.magazine-t.loaded,t.reserve);t.loaded+=i,t.reserve-=i}}hurt(e){return this.health=Math.max(0,this.health-e),this.health===0}kill(e=!1){this.kills++,this.combo++,this.comboTime=4;let t=(e?150:100)*Math.min(4,1+Math.floor(this.combo/3));return this.score+=t,t}supply(){for(let[e,t]of Object.entries(this.inventory))t.reserve=Math.min(e==="bow"?60:240,t.reserve+(e==="bow"?8:Nt[e].magazine*2))}nextWave(){return this.wave++,this.phase="wave",Ec(this.wave)}finishWave(){this.phase="rest",this.rest=Ec(this.wave).rest,this.health=Math.min(100,this.health+12),this.supply(),this.score+=this.wave*100}};function Mp(s){let e=[],t=new yn({side:Et}),n=(i,r,o,a,c,l,h=0)=>{if(a<=0||c<=0||l<=0)return;let u=new je(new dt(a,l,c),t);u.position.set(i,o,-r),u.rotation.y=h,u.updateMatrixWorld(),e.push(u)};for(let i of s.walls){let[r,o]=i.a,[a,c]=i.b,l=Math.hypot(a-r,c-o),h=(a-r)/l,u=(c-o)/l,d=i.floor*s.levelHeight,f=i.height_m??(i.floor?2.45:2.6),p=[0,l];for(let _ of i.openings)p.push(Math.max(0,_[0]-_[1]/2),Math.min(l,_[0]+_[1]/2));p.sort((_,m)=>_-m);for(let _=1;_<p.length;_++){let m=p[_-1],g=p[_],b=(m+g)/2;if(g<=m)continue;let T=i.openings.filter(M=>b>M[0]-M[1]/2&&b<M[0]+M[1]/2).sort((M,S)=>M[2]-S[2]),v=0;for(let M of[...T,[0,0,f,f]]){let S=Math.min(f,M[2]);S>v&&n(r+h*b,o+u*b,d+(v+S)/2,g-m,i.thickness_m,S-v,Math.atan2(u,h)),v=Math.max(v,M[3])}}}for(let i of s.segments){let r=i.b[0]-i.a[0],o=i.b[1]-i.a[1];n((i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2,(i.bottom+i.top)/2,Math.hypot(r,o),i.thickness,i.top-i.bottom,Math.atan2(o,r))}for(let i of s.obstacles){let r=i.box??[Math.min(...i.polygon.map(o=>o[0])),Math.min(...i.polygon.map(o=>o[1])),Math.max(...i.polygon.map(o=>o[0])),Math.max(...i.polygon.map(o=>o[1]))];n((r[0]+r[2])/2,(r[1]+r[3])/2,(i.bottom+i.top)/2,r[2]-r[0],r[3]-r[1],i.top-i.bottom)}for(let i of s.surfaces){let r=new Si(new ii(i.polygon.map(([a,c])=>new re(a,c))));r.rotateX(-Math.PI/2),r.translate(0,i.z,0);let o=new je(r,t);o.updateMatrixWorld(),e.push(o)}return e}var Rc=class{constructor(){this.enabled=!0,this.context=null}unlock(){try{let e=window.AudioContext||window.webkitAudioContext;e&&!this.context&&(this.context=new e),this.context?.state==="suspended"&&this.context.resume().catch(()=>{})}catch{}}play(e){if(!this.enabled||!this.context||this.context.state!=="running")return;let t=this.context,n=t.currentTime,i=(r,o,a,c,l="sine",h=0)=>{let u=t.createOscillator(),d=t.createGain();u.type=l,u.frequency.setValueAtTime(r,n+h),u.frequency.exponentialRampToValueAtTime(o,n+h+a),d.gain.setValueAtTime(c,n+h),d.gain.exponentialRampToValueAtTime(.001,n+h+a),u.connect(d).connect(t.destination),u.start(n+h),u.stop(n+h+a+.01)};if(e==="bow")i(270,95,.12,.05,"triangle");else if(["pistol","shotgun","carbine"].includes(e)){let r=e==="shotgun"?.18:.09,o=t.createBuffer(1,Math.ceil(t.sampleRate*r),t.sampleRate),a=o.getChannelData(0);for(let h=0;h<a.length;h++)a[h]=(Math.random()*2-1)*Math.pow(1-h/a.length,3);let c=t.createBufferSource(),l=t.createGain();c.buffer=o,l.gain.value=.06,c.connect(l).connect(t.destination),c.start(),i(100,35,r,.08,"triangle")}else e==="hit"?i(680,310,.055,.035,"triangle"):e==="hurt"?i(95,42,.15,.05,"sine"):e==="pickup"?(i(440,660,.1,.035),i(660,880,.12,.025,"sine",.1)):e==="wave"&&(i(160,120,.22,.045,"triangle"),i(120,90,.3,.04,"triangle",.26))}};var Xn=(s,e,t={})=>new je(s,new ln({color:e,roughness:.6,...t}));function la(){let s=new at;s.name="Arrow \xB7 shaft, head and three feathers",s.userData.projectile=!0;let e=Xn(new Yt(.005,.005,.64,6),12163938);e.rotation.x=Math.PI/2,e.position.z=-.32,e.name="Arrow shaft",s.add(e);let t=Xn(new ls(.021,.075,4),5661031,{metalness:.55});t.rotation.x=-Math.PI/2,t.position.z=-.67,t.name="Arrowhead",s.add(t);for(let i=0;i<3;i++){let r=new ii;r.moveTo(0,0),r.lineTo(.051,-.043),r.lineTo(.04,-.14),r.lineTo(0,-.17),r.closePath();let o=Xn(new Si(r),i===0?13145935:15524803,{side:Et});o.rotation.x=Math.PI/2,o.rotation.z=i*Math.PI*2/3,o.rotation.set(Math.PI/2,0,0);let a=new at;a.rotation.z=i*Math.PI*2/3,a.add(o),a.position.z=-.025,s.add(a),o.name="Arrow feather"}let n=Xn(new Yt(.009,.009,.025,5),9394738);return n.rotation.x=Math.PI/2,n.position.z=.002,s.add(n),s}function Sp({held:s=!1}={}){let e=new at;e.name="Recurve bow";let t=[];for(let p=0;p<=24;p++){let _=-Math.PI/2+p*Math.PI/24;t.push(new P(0,Math.sin(_)*.42,-Math.cos(_)*.17))}let n=new _o(new er(t),32,.012,6,!1),i=Xn(n,8542264);i.name="Flexible bow limbs",e.add(i);let r=new Float32Array(n.attributes.position.array),o=Xn(new Yt(.023,.023,.12,7),3681573);o.position.z=-.165,e.add(o);let a=new Hn(new rt().setFromPoints([t[0],new P(0,0,.025),t[24]]),new ti({color:15787464}));a.name="Bow string",e.add(a);let c=la();c.name="Nocked arrow",c.position.set(-.018,0,.025),e.add(c);let l=new gt;l.name="Projectile origin",l.position.copy(c.position),e.add(l);let h=new at;h.visible=s,e.add(h);let u=Xn(new dt(.065,.11,.058),12687990);u.position.set(.026,0,-.155),h.add(u);let d=Xn(new dt(.054,.065,.045),12687990);d.position.set(-.023,0,.025),h.add(d);let f=Xn(new dt(.085,.11,.07),4347726);return f.position.set(.07,-.055,-.11),f.rotation.z=.4,h.add(f),e.userData.animate=(p=0,_=0,m=!0)=>{let g=_>0?Math.sin((.28-_)*105)*_*.065:0,b=n.attributes.position;for(let A=0;A<b.count;A++){let x=A*3,E=r[x+1],R=Math.abs(E/.42);b.setXYZ(A,r[x],E*(1-.08*p),r[x+2]+R*.07*p+g*R)}b.needsUpdate=!0;let T=.42*(1-.08*p),v=.07*p+g,M=.025+p*.27+g*2.5,S=a.geometry.attributes.position;S.setXYZ(0,0,-T,v),S.setXYZ(1,0,0,M),S.setXYZ(2,0,T,v),S.needsUpdate=!0,l.position.set(-.018,0,M),c.position.copy(l.position),c.visible=m,d.position.z=M},e.userData.animate(),e}function bp(s){let e=new at;e.name=s;let t=(f,p,_,m,g,b)=>{let T=Xn(f,p,b);return T.position.set(_,m,g),e.add(T),T},n=3621439,i=s==="shotgun"?8409904:3556668,r=s==="pistol"?-.24:s==="shotgun"?-.61:-.52;t(new dt(.08,.1,s==="pistol"?.24:.27),n,0,0,-.09);let o=t(new dt(.066,.17,.085),i,0,-.12,.025);o.rotation.x=-.24;let a=t(new an(.044,.009,5,12),n,0,-.09,-.07);a.rotation.y=Math.PI/2,a.scale.z=1.25;let c=t(new dt(.008,.037,.01),1910821,0,-.07,-.07);c.rotation.x=.2;let l=t(new Yt(.021,.021,Math.abs(r)-.12,10),2240043,0,.012,(r-.12)/2);l.rotation.x=Math.PI/2;let h=t(new an(.021,.007,5,10),6384738,0,.012,r);h.name="Muzzle rim";let u=t(new $s(.017,10),1054743,0,.012,r+.001,{side:Et});if(t(new dt(.014,.024,.025),14862746,0,.074,s==="pistol"?-.19:r+.045),t(new dt(.06,.02,.025),1187611,0,.064,.009),s!=="pistol"){let f=t(new dt(.074,.12,.2),i,0,-.015,.16);f.rotation.x=.16;let p=t(new Yt(.042,.042,.19,8),i,0,-.018,-.28);p.rotation.x=Math.PI/2,p.name="Pump grip";for(let _=0;_<5;_++){let m=t(new an(.042,.004,4,8),2569260,0,-.018,-.2-_*.036)}}if(s==="carbine"){let f=t(new dt(.058,.17,.07),2636594,0,-.15,-.1);f.rotation.x=-.2;let p=t(new Yt(.034,.034,.17,10),1583395,0,.12,-.085);p.rotation.x=Math.PI/2;let _=t(new $s(.028,10),4222825,0,.12,-.173,{metalness:.3,roughness:.15,side:Et});for(let m of[-.14,-.04])t(new dt(.028,.07,.024),n,0,.077,m)}let d=new gt;return d.name="Projectile origin",d.position.set(0,.012,r-.008),e.add(d),e.userData.animate=(f,p)=>{let _=e.getObjectByName("Pump grip");_&&s==="shotgun"&&(_.position.z=-.28+Math.sin(Math.max(0,p)/.28*Math.PI)*.08)},e}function wp(s){let e=new at;e.name=s==="health"?"Medical satchel, bandages and bottle":"Leather quiver and mixed ammunition";let t=(n,i,r,o,a,c)=>{let l=Xn(n,i,c);return l.position.set(r,o,a),e.add(l),l};if(s==="health"){let n=t(new as(.1,.16,4,10),9529152,0,0,0);n.rotation.z=Math.PI/2,n.scale.z=.75;for(let o of[-.1,.1]){let a=t(new an(.102,.012,5,14),4734508,o,0,0);a.rotation.y=Math.PI/2,a.scale.x=.76}let i=t(new an(.057,.01,5,12,Math.PI),4536871,0,.106,0);i.rotation.z=0,t(new dt(.09,.075,.012),16051680,0,.012,.079),t(new dt(.018,.055,.015),11354942,0,.012,.084),t(new dt(.057,.018,.015),11354942,0,.012,.084);for(let o of[-.115,-.06]){let a=t(new Yt(.025,.025,.072,10),14999496,o,.132,0);a.rotation.z=Math.PI/2}let r=t(new Yt(.026,.026,.095,10),14263121,.12,.13,.006,{transparent:!0,opacity:.8});t(new Yt(.027,.027,.018,10),15986401,.12,.185,.006)}else{let n=t(new Yt(.075,.055,.28,12,1,!0),7294002,-.055,.035,0,{side:Et});for(let r of[-.07,.16]){let o=t(new an(.074,.009,5,12),12160076,-.055,r,0);o.rotation.x=Math.PI/2}let i=t(new an(.13,.012,5,16,Math.PI*1.6),4011303,-.08,0,.015);i.scale.x=.6;for(let r=0;r<3;r++){let o=la();o.scale.setScalar(.48),o.rotation.x=-Math.PI/2,o.position.set(-.08+r*.026,.29,.014),e.add(o)}for(let r=0;r<5;r++){let o=t(new Yt(.018,.018,.095,7),r<2?10438972:12884812,.05+r*.032,-.015,.018);o.rotation.z=-.12+r*.1,t(new Yt(.019,.019,.023,7),14072434,.05+r*.032,-.07,.018,{metalness:.5})}t(new dt(.19,.038,.025),4734511,.11,-.033,.046)}return e}var My=s=>({x:s.x,y:-s.z,z:s.y}),ca=s=>new P(s.x,s.z,-s.y),ke=s=>document.getElementById(s),Cc=class{constructor(e,{scene:t,camera:n,doors:i,mobile:r=!1,isActive:o,onDeath:a,onBegin:c,onReset:l,onLook:h,toast:u}){Object.assign(this,{data:e,scene:t,camera:n,doors:i,mobile:r,isActive:o,onDeath:a,onBegin:c,onReset:l,onLook:h,toast:u}),this.state=new Ac,this.audio=new Rc,this.time=0,this.hurtTime=0,this.hitTime=0,this.recoil=0,this.sprinting=!1,this.group=new at,this.group.name="After Hours combat",t.add(this.group),this.pickups=[],this.projectiles=[],this.effects=[],this.ray=new Co,this.occluders=Mp(e),this.horde=new Tc(e,{maxAlive:r?7:12,onAttack:d=>{this.state.phase!=="dead"&&(this.state.hurt(d.damage),this.hurtTime=.55,this.audio.play("hurt"),this.state.health||this.die())},onDeath:d=>{let f=this.state.kill(d.headshot);if(this.toast((d.headshot?"Headshot! +":"Zombie down +")+f),d.boss){let p=this.state.wave*500;this.state.score+=p,this.addPickup("health",d.position),this.addPickup("ammo",{...d.position,x:d.position.x+.24}),this.toast("Groundskeeper defeated \xB7 +"+p+" \xB7 supplies dropped")}else this.state.kills%3===0&&this.addPickup(this.state.kills%9===0?"health":"ammo",d.position)}}),this.group.add(this.horde.group),t.add(n),this.hand=new at,this.hand.position.set(.23,-.27,-.52),n.add(this.hand),this.buildUI(),this.reset()}buildUI(){this.tourWelcome=ke("welcome").innerHTML,this.tourHint=ke("hint").textContent,this.started=!1;let e=document.createElement("button");e.id="sound-control",e.hidden=!0,e.textContent="Sound on",e.setAttribute("aria-pressed","true"),e.onclick=()=>{this.audio.unlock(),this.audio.enabled=!this.audio.enabled,e.textContent=this.audio.enabled?"Sound on":"Sound off",e.setAttribute("aria-pressed",String(this.audio.enabled)),e.blur()},document.querySelector(".toolbar").insertBefore(e,ke("help")),document.addEventListener("pointerdown",()=>this.audio.unlock(),{once:!0}),document.addEventListener("keydown",()=>this.audio.unlock(),{once:!0});let t=document.createElement("div");t.id="combat-hud",t.innerHTML='<div id="wave-heading">AFTER HOURS</div><div id="wave-objective">Enter the house to begin</div><div id="boss-status" hidden><span>THE GROUNDSKEEPER</span><div><i></i></div></div><div id="combat-stats"><span id="health-text">\u2665 100</span><span id="weapon-text">Find the bow</span><span id="score-text">0</span></div><div id="weapon-progress"><i></i></div>',document.body.append(t);let n=document.createElement("div");n.id="combat-controls",n.innerHTML='<button id="fire-control" aria-label="Fire. Hold to draw the bow, release to shoot. Drag this button to aim."><strong>FIRE</strong><small>drag to aim</small></button><button id="reload-control">Reload</button><button id="swap-control">Swap</button><button id="shove-control">Shove</button><button id="sprint-control" aria-pressed="false">Sprint</button>',document.body.append(n);let i=document.createElement("div");i.id="damage-vignette",i.setAttribute("aria-hidden","true"),document.body.append(i);let r=document.createElement("button");r.id="end-survival",r.className="text-button",r.textContent="End game \xB7 return to exploring",r.hidden=!0,r.onclick=()=>{this.reset(),ke("start").focus()},ke("welcome").insertBefore(r,ke("load-status"));let o=document.createElement("button");o.id="bow-pickup",o.textContent=this.mobile?"Take bow \xB7 start survival":"E \xB7 Take bow \xB7 start survival",o.hidden=!0,o.onclick=()=>this.takeBow(),document.body.append(o);let a=ke("fire-control"),c=null,l=null;a.addEventListener("pointerdown",u=>{this.isActive()&&(u.preventDefault(),c=u.pointerId,l=[u.clientX,u.clientY],a.setPointerCapture(c),a.classList.add("held"),this.press())}),a.addEventListener("pointermove",u=>{u.pointerId!==c||!l||(this.onLook(u.clientX-l[0],u.clientY-l[1]),l=[u.clientX,u.clientY])});let h=u=>{u.pointerId===c&&(c=null,l=null,a.classList.remove("held"),u.type==="pointerup"?this.release():this.cancelFire())};for(let u of["pointerup","pointercancel","lostpointercapture"])a.addEventListener(u,h);for(let[u,d]of[["reload-control",()=>this.state.reload()],["swap-control",()=>{this.state.cycle(),this.equip()}],["shove-control",()=>this.shove()],["sprint-control",()=>{this.sprinting=!this.sprinting,ke("sprint-control").setAttribute("aria-pressed",String(this.sprinting))}]])ke(u).addEventListener("click",f=>{f.preventDefault(),this.isActive()&&this.started&&d(),ke(u).blur()});document.addEventListener("keydown",u=>{if(!(!this.isActive()||u.repeat)){if(u.code==="KeyE"&&!this.started){u.preventDefault(),this.takeBow();return}this.started&&["Space","KeyR","KeyQ","Digit1","Digit2","Digit3","Digit4"].includes(u.code)&&(u.preventDefault(),u.code==="Space"&&this.press(),u.code==="KeyR"&&this.state.reload(),u.code==="KeyQ"&&this.shove(),u.code.startsWith("Digit")&&(this.state.switch(Object.keys(Nt)[Number(u.code.slice(-1))-1]),this.equip()))}}),document.addEventListener("keyup",u=>{u.code==="Space"&&this.release()}),ke("view").addEventListener("pointerdown",u=>{u.pointerType==="mouse"&&u.button===0&&this.isActive()&&this.press()}),document.addEventListener("pointerup",u=>{u.pointerType==="mouse"&&u.button===0&&this.release()}),window.addEventListener("blur",()=>this.cancelFire()),document.addEventListener("visibilitychange",()=>this.cancelFire()),a.addEventListener("contextmenu",u=>u.preventDefault())}activateUI(e){document.body.classList.toggle("easter-game",e),ke("rooms").hidden=e,ke("sound-control").hidden=!e,ke("bow-pickup").hidden=!0,ke("end-survival").hidden=!e;let t=ke("welcome");t.querySelector(".eyebrow").textContent=e?"ASHLEY HEIGHTS \xB7 AFTER HOURS":"EXPLORE ASHLEY HEIGHTS",t.querySelector("h1").textContent=e?"Hold the house.":"Come inside.",t.querySelector("p").textContent=e?"Survive the waves. Find guns as later waves unlock, collect supplies and keep moving.":"Walk through the house and garden. Take the bow in the garden shed if you want to start the zombie game.",t.querySelector(".keys span").innerHTML=e?"W A S D move \xB7 Shift sprint<br>Mouse / Space fire \xB7 R reload \xB7 Q shove<br>1\u20134 weapons \xB7 Esc pause":"Move with these or the arrow keys.<br>Move your mouse to look around.",t.querySelector(".touch-instructions p").textContent=e?"Hold Fire and drag to aim; lift to release an arrow. Supplies collect as you approach.":"Use both together. Lift your thumb to stop.",ke("hint").textContent=e?"Mouse / Space fire \xB7 R reload \xB7 Q shove \xB7 1\u20134 switch \xB7 Shift sprint":this.tourHint,ke("caught-title").textContent="The house fell.",ke("normal-model").textContent="Return to exploring"}canTakeBow(){let e=this.pickups.find(o=>o.kind==="bow");if(this.started||!e||!this.player||Math.hypot(e.position.x-this.player.x,e.position.y-this.player.y)>1.35||Math.abs(e.position.z-this.player.z)>.4)return!1;let t=ca(this.player).add(new P(0,this.data.eyeHeight,0)),n=ca(e.position).add(new P(0,e.baseHeight,0)),i=n.clone().sub(t),r=i.length();return this.ray.set(t,i.normalize()),this.ray.near=.015,this.ray.far=r-.08,this.ray.intersectObjects(this.occluders,!1).length===0}takeBow(){if(!this.isActive()||!this.canTakeBow())return!1;let e=this.pickups.find(t=>t.kind==="bow");return this.clearObject(e.mesh),this.pickups.splice(this.pickups.indexOf(e),1),this.state.acquire("bow"),this.equip(),this.audio.play("pickup"),this.activateUI(!0),ke("bow-pickup").blur(),ke("view").focus(),this.onBegin(),!0}clearObject(e){e.traverse(t=>{(t.isMesh||t.isLine)&&(t.geometry.dispose(),t.material.dispose&&t.material.dispose())}),e.removeFromParent()}reset(){this.started=!1,this.state.reset(),this.activateUI(!1),this.onReset?.(),this.horde.reset(),this.time=0,this.hurtTime=0,this.hitTime=0,this.releaseTime=0,this.lastShot=null,ke("crosshair").classList.remove("hit"),this.player=null,this.unlocked=new Set(["bow"]),this.sprinting=!1,ke("sprint-control").setAttribute("aria-pressed","false");for(let t of this.pickups)this.clearObject(t.mesh);for(let t of this.projectiles)this.clearObject(t.mesh);for(let t of this.effects)this.clearObject(t.mesh);this.pickups=[],this.projectiles=[],this.effects=[];let e=this.data.rooms.find(t=>t.id==="2445694-0");this.addPickup("bow",{x:e.position[0],y:e.position[1],z:e.position[2]}),this.equip(),ke("damage-vignette").style.opacity=0}mesh(e,t,n={}){return new je(e,new ln({color:t,roughness:.65,...n}))}buildWeapon(e,t=!1){return e==="bow"?Sp({held:t}):bp(e)}equip(){for(let e of[...this.hand.children])this.clearObject(e);this.state.weapon&&this.hand.add(this.buildWeapon(this.state.weapon,!0)),this.recoil=0}addPickup(e,t){if(this.pickups.length>=32){let a=this.pickups.find(c=>!Nt[c.kind]);if(a)this.clearObject(a.mesh),this.pickups.splice(this.pickups.indexOf(a),1);else return}let n=e==="health"?7984033:Nt[e]?16765838:10406906,i=new at;i.position.copy(ca(t));let r=this.mesh(new an(.25,.026,5,20),n);r.rotation.x=Math.PI/2,r.position.y=.1,r.material.emissive.setHex(n),r.material.emissiveIntensity=.4,i.add(r);let o;Nt[e]?(o=this.buildWeapon(e),o.scale.setScalar(.62),o.position.y=.68):e==="arrow"?(o=la(),o.rotation.x=Math.PI/2,o.position.y=.25):(o=wp(e),o.position.y=.38),i.add(o),this.group.add(i),this.pickups.push({kind:e,position:{...t},mesh:i,item:o,baseHeight:o.position.y,age:0})}begin(e){this.started=!0,this.player=e,this.startWave()}startWave(){let e=this.state.nextWave();this.horde.startWave(this.state.wave,this.player,e.total),this.audio.play("wave"),this.toast(`Wave ${this.state.wave} \xB7 ${e.event}`)}unlock(){for(let[e,t,n]of[[3,"pistol","2445662-0"],[5,"shotgun","2445664-0"],[7,"carbine","2445670-3"]])if(this.state.wave+1>=e&&!this.unlocked.has(t)){this.unlocked.add(t);let i=this.data.rooms.find(r=>r.id===n);this.addPickup(t,{x:i.position[0],y:i.position[1],z:i.position[2]}),this.toast(`${Nt[t].label} unlocked \xB7 ${i.label}`)}}press(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||(this.state.firing=!0,this.state.charge=0,this.state.weapon!=="bow"&&this.fire())}release(){this.state.firing&&this.state.weapon==="bow"&&this.isActive()&&this.fire(),this.cancelFire()}cancelFire(){this.state.firing=!1,this.state.charge=0,ke("fire-control")?.classList.remove("held")}hit(e,t,n){this.ray.set(e,t),this.ray.near=.015,this.ray.far=n;let i=this.doors.doors.map(l=>l.pivot).filter(Boolean),o=this.ray.intersectObjects([...this.occluders,...i],!0)[0];o&&(this.ray.far=o.distance);let c=this.ray.intersectObjects(this.horde.actors.filter(l=>l.alive).map(l=>l.figure.group),!0).find(l=>l.object.userData.actorId!==void 0);return c?{...c,actor:c.object.userData.actorId,headshot:c.object.userData.hitZone==="head"}:o?{...o,wall:!0}:null}applyHit(e,t,n){return e?.actor===void 0?!1:this.horde.damage(e.actor,t*(e.headshot?1.8:1),{headshot:e.headshot,knockback:{x:n.x*.12,y:-n.z*.12}})?.hit?(this.hitTime=.16,this.audio.play("hit"),!0):!1}trace(e,t){let n=new Hn(new rt().setFromPoints([e,t]),new ti({color:16772531,transparent:!0,opacity:.75}));this.group.add(n),this.effects.push({mesh:n,life:.07})}fire(){let e=this.state.shoot();if(!e)return;this.audio.play(e.id),this.recoil=1,this.releaseTime=.28,this.camera.updateMatrixWorld(!0),this.hand.updateMatrixWorld(!0);let t=this.camera.getWorldPosition(new P),n=this.camera.getWorldDirection(new P),i=this.hit(t,n,55),r=i?.point||t.clone().addScaledVector(n,55),o=this.hand.getObjectByName("Projectile origin");if(!o)return;let a=o.getWorldPosition(new P),c=r.clone().sub(a).normalize(),l=a.clone().sub(t),h=l.length(),u=this.hit(t,l.normalize(),h);if(this.lastShot={weapon:e.id,origin:a.toArray(),muzzle:o.getWorldPosition(new P).toArray(),eye:t.toArray(),blockedByWall:!!u?.wall},!u?.wall)if(e.id==="bow"){let d=la();d.position.copy(a),d.quaternion.setFromUnitVectors(new P(0,0,-1),c),this.group.add(d);let f=a.clone().addScaledVector(c,.7075),p=this.hit(a,c,.7075);if(p){this.applyHit(p,e.damage*(.35+.65*e.charge),c),d.position.copy(p.point).addScaledVector(c,-.7075),p.actor!==void 0&&(d.updateMatrixWorld(!0),p.object.attach(d)),this.effects.push({mesh:d,life:5});return}this.projectiles.push({mesh:d,position:f,velocity:c.multiplyScalar(14+e.charge*15),damage:e.damage*(.35+.65*e.charge),life:4})}else{let d=this.mesh(new ls(.035,.14,5),16762733,{emissive:16755776});d.position.copy(a),d.quaternion.setFromUnitVectors(new P(0,1,0),c),this.group.add(d),this.effects.push({mesh:d,life:.055});for(let f=0;f<(e.pellets||1);f++){let p=c.clone();e.pellets&&(p.x+=(Math.random()-.5)*.11,p.y+=(Math.random()-.5)*.11,p.z+=(Math.random()-.5)*.11,p.normalize());let _=this.hit(a,p,55);this.applyHit(_,e.damage,p),f===0&&this.trace(a.clone(),_?.point||a.clone().addScaledVector(p,30))}}}shove(){if(!this.started||!this.player||this.state.shoveCooldown||this.state.phase==="dead")return;this.state.shoveCooldown=1.05,this.recoil=1.7;let e=ca(this.player).add(new P(0,1,0)),t=this.camera.getWorldDirection(new P);for(let n of this.horde.actors){if(!n.alive)continue;let i=ca(n.nav.position).add(new P(0,1,0)),r=i.clone().sub(e),o=r.length();if(o>1.55||o<.01||r.normalize().dot(t)<.25)continue;this.ray.set(e,r),this.ray.far=o;let a=this.ray.intersectObjects(this.occluders,!1)[0];a&&a.distance<o-.25||(this.horde.damage(n.id,20,{knockback:{x:r.x*.65,y:-r.z*.65}}),this.hitTime=.16)}}die(){this.state.phase="dead",this.cancelFire();try{let e=JSON.parse(localStorage.getItem("ashley-after-hours-best")||"{}");this.best=Math.max(e.score||0,this.state.score),localStorage.setItem("ashley-after-hours-best",JSON.stringify({score:this.best,wave:Math.max(e.wave||0,this.state.wave)}))}catch{this.best=this.state.score}this.onDeath()}step(e,t,n){if(this.player=t,!this.started){let o=this.pickups.find(a=>a.kind==="bow");o&&(o.age+=e,o.item.rotation.y+=e*.45,o.item.position.y=o.baseHeight+Math.sin(o.age*2.1)*.05,ke("bow-pickup").hidden=!this.canTakeBow()),this.group.updateMatrixWorld(!0);return}ke("bow-pickup").hidden=!0,this.time+=e,this.state.tick(e),this.hurtTime=Math.max(0,this.hurtTime-e),this.hitTime=Math.max(0,this.hitTime-e),this.recoil=Math.max(0,this.recoil-e*5);let i=this.camera.getWorldDirection(new P);this.state.phase==="wave"?(this.horde.step(e,t,{x:i.x,y:-i.z}),this.horde.state().complete&&(this.state.finishWave(),this.unlock(),this.addPickup("health",{...t,x:t.x+.35}),this.toast("Wave cleared \xB7 resupplied +12 health"))):this.state.phase==="rest"&&(this.horde.step(e,t,{x:i.x,y:-i.z}),this.state.rest-=e,this.state.rest<=0&&this.startWave()),this.state.firing&&this.state.weapon!=="bow"&&this.fire();for(let o=this.projectiles.length-1;o>=0;o--){let a=this.projectiles[o];a.life-=e,a.velocity.y-=2.4*e;let c=a.velocity.length()*e,l=a.velocity.clone().normalize(),h=this.hit(a.position,l,c);if(h||a.life<=0||a.position.y<.05){h&&(this.applyHit(h,a.damage,l),a.mesh.position.copy(h.point).addScaledVector(l,-.7075),a.mesh.quaternion.setFromUnitVectors(new P(0,0,-1),l));let u=My(h?.point||a.position),d=t.z;Math.abs(u.z-d)<2.2&&!this.horde.planner().nav.blocked(u.x,u.y,d)&&this.addPickup("arrow",{x:u.x,y:u.y,z:d}),h?(h.actor!==void 0&&(a.mesh.updateMatrixWorld(!0),h.object.attach(a.mesh)),this.effects.push({mesh:a.mesh,life:5})):this.clearObject(a.mesh),this.projectiles.splice(o,1)}else a.position.addScaledVector(a.velocity,e),a.mesh.position.copy(a.position).addScaledVector(l,-.7075),a.mesh.quaternion.setFromUnitVectors(new P(0,0,-1),l)}for(let o=this.pickups.length-1;o>=0;o--){let a=this.pickups[o];a.age+=e,a.item.rotation.y+=e*.65,a.item.position.y=a.baseHeight+Math.sin(a.age*2.1)*.05;let c=a.position.z-t.z;if(Math.hypot(a.position.x-t.x,a.position.y-t.y)<.85&&Math.abs(c)<.4){let h=!0;Nt[a.kind]?(this.state.acquire(a.kind),this.equip(),this.toast(`${Nt[a.kind].label} found`)):a.kind==="health"?this.state.health>=100?h=!1:(this.state.health=Math.min(100,this.state.health+30),this.toast("+30 health")):a.kind==="arrow"?this.state.inventory.bow?this.state.inventory.bow.reserve=Math.min(60,this.state.inventory.bow.reserve+1):h=!1:(this.state.supply(),this.toast("Ammunition collected")),h&&(this.audio.play("pickup"),this.clearObject(a.mesh),this.pickups.splice(o,1))}}for(let o=this.effects.length-1;o>=0;o--)(this.effects[o].life-=e)<=0&&(this.clearObject(this.effects[o].mesh),this.effects.splice(o,1));this.hand.scale.setScalar(Math.min(1,.55+.45*this.camera.aspect)),this.hand.position.x=Math.min(.23,.1*this.camera.aspect),this.hand.visible=!!this.state.weapon;let r=this.state.reloading?Math.sin(Math.PI*(1-this.state.reloading/Nt[this.state.weapon].reload)):0;this.hand.rotation.x=this.recoil*.15,this.hand.rotation.z=-.6*r-this.state.charge*.045,this.hand.position.y=-.27+Math.sin(this.time*3)*.004-.14*r,this.hand.position.z=-.52+this.recoil*.05,this.releaseTime=Math.max(0,(this.releaseTime||0)-e),this.hand.children[0]?.userData.animate?.(this.state.charge,this.releaseTime,!!this.state.inventory.bow?.reserve&&this.state.cooldown<.3),this.group.updateMatrixWorld(!0),this.updateHUD(n)}updateHUD(e){let t=this.state,n=this.horde.state();ke("wave-heading").textContent=e.phase==="waiting"?"AFTER HOURS":t.phase==="rest"?`WAVE ${t.wave} CLEARED \xB7 ${Math.ceil(t.rest)}s`:`WAVE ${t.wave} \xB7 ${Ec(t.wave).event.toUpperCase()}`;let i=this.pickups.find(a=>Nt[a.kind]),r=i&&{bow:"garden shed",pistol:"kitchen",shotgun:"garage",carbine:"landing"}[i.kind];ke("wave-objective").textContent=e.phase==="waiting"?"Take the bow in the garden shed to begin":t.phase==="wave"?`${n.alive+n.queued} left${i?" \xB7 "+Nt[i.kind].label+" in the "+r:""}`:i?`Find the ${Nt[i.kind].label.toLowerCase()} in the ${r}`:"Collect supplies \xB7 reload \xB7 keep moving",ke("boss-status").hidden=!n.boss,n.boss&&(ke("boss-status").querySelector("i").style.width=100*n.boss.health/n.boss.maxHealth+"%"),ke("health-text").textContent="\u2665 "+Math.ceil(t.health),ke("health-text").classList.toggle("low",t.health<35);let o=t.inventory[t.weapon];ke("weapon-text").textContent=o?`${Nt[t.weapon].label} \xB7 ${t.weapon==="bow"?o.reserve+" arrows":o.loaded+" / "+o.reserve}${t.reloading?" \xB7 reloading":""}`:"Find the bow \xB7 Q / Shove to defend",ke("score-text").textContent=t.score.toLocaleString()+(t.combo>=3?" \xD7"+Math.min(4,1+Math.floor(t.combo/3)):""),ke("weapon-progress").firstElementChild.style.width=(t.reloading?(1-t.reloading/Nt[t.weapon].reload)*100:t.charge*100)+"%",ke("damage-vignette").style.opacity=this.hurtTime?".7":"0",ke("crosshair").classList.toggle("hit",this.hitTime>0),ke("fire-control").disabled=!t.weapon,ke("reload-control").disabled=!t.weapon||t.weapon==="bow",ke("shove-control").classList.toggle("cooldown",t.shoveCooldown>0)}};var Re=s=>document.getElementById(s);document.body.classList.toggle("touch-ui",ra());var Tn=Re("view"),Er=new os;Er.background=new Ie("#dce5e5");var Ap=()=>({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}),Pc=Ap(),ys=new Bt(72,Pc.width/Pc.height,.045,150),di,Gt,At,ui,ct=null,Yn=0,Pi=0,Lr=!1,fi=!1,Dr=!1,Ar=null,Rr="drag",ha=0,Tp=0,Ep=0,Dc=!0,Kt=new Set,Ci={sourceMeshes:0,batches:0,hiddenMeshes:0};try{di=new cc({canvas:Tn,antialias:!ra(),powerPreference:"high-performance"})}catch(s){throw Re("load-status").textContent="3D graphics could not start. Open this walkthrough in Safari or Chrome with hardware acceleration enabled.",s}di.setPixelRatio(Math.min(devicePixelRatio,ra()?1.25:1.5));di.setSize(Pc.width,Pc.height,!1);di.outputColorSpace=Ct;var qn=vp(di,Er,ys),wn=new Sc(Tn,Re("move-pad"),Re("move-thumb"),(s,e)=>{!Lr||!fi||(Yn-=s*.004,Pi=Math.max(-1.35,Math.min(1.35,Pi-e*.004)),Pr())});function Rp(s){Re("map").hidden=!s,Re("map-panel").classList.toggle("collapsed",!s),Re("map-toggle").textContent=wn.enabled?s?"\xD7":"Map +":s?"\u2212":"+",Re("map-toggle").setAttribute("aria-expanded",String(s)),Re("map-toggle").setAttribute("aria-label",s?"Hide floorplan":"Show floorplan")}Rp(!wn.enabled);function Cr(s){Re("toast").textContent=s,Re("toast").hidden=!1,clearTimeout(Cr.timer),Cr.timer=setTimeout(()=>Re("toast").hidden=!0,4200)}function Pr(){let s=Gt.position;ys.position.set(s.x,s.z+At.eyeHeight,-s.y),ys.rotation.set(Pi,Yn,0,"YXZ")}function Cp(s){Yn=Math.atan2(-s[0],s[1]),Pi=Math.atan2(s[2]||0,Math.hypot(s[0],s[1]))}function Sy(s){return s.z>2&&s.y>7.89&&s.y<10.64&&s.x>5.04&&s.x<9.08}function Xu(){let s=Gt.position;if(At.approachSurface&&Ji(s.x,s.y,At.approachSurface.polygon)&&!Ji(s.x,s.y,At.site.outline_m))return"Outside gates";let e=s.z>2?1:0;return At.planRooms.find(n=>(n.floor===e||e===0&&n.floor===2)&&Ji(s.x,s.y,n.polygon_m))?.name||(Sy(s)?"Balcony":null)||(s.y>10?"Garden":s.y<0?"Front of house":s.z>.2&&s.z<2.7?"Stairs":"Outside")}function qu(){let s=Gt.position,e=s.z>2.35,t=s.y>11,n=e?1:0;Re("location").textContent=Xu(),Re("floor-label").textContent=t?"Garden":e?"First floor":s.z>.2?"Stairs":"Ground floor";let i=Re("map").getContext("2d"),r=480,o=310;i.clearRect(0,0,r,o);let a=t?[-28,8,19,33]:s.y<-.5?[-9,-21,19,11]:[-5.8,-1,14.7,11.2],c=Math.min((r-24)/(a[2]-a[0]),(o-24)/(a[3]-a[1])),l=(r-(a[2]-a[0])*c)/2,h=(o-(a[3]-a[1])*c)/2,u=([_,m])=>[l+(_-a[0])*c,o-h-(m-a[1])*c],d=(_,m,g)=>{i.beginPath(),_.forEach((b,T)=>{let[v,M]=u(b);T?i.lineTo(v,M):i.moveTo(v,M)}),i.closePath(),i.fillStyle=m,i.fill(),i.strokeStyle=g,i.lineWidth=1.6,i.stroke()};(t||s.y<-.5)&&At.site?.outline_m&&d(At.site.outline_m,"#d8e2cf","#9aaa96");for(let _ of At.planRooms)(t?_.floor===2:_.floor===n)&&d(_.polygon_m,_.name===Xu()?"#c0dacf":"#e9ece3","#8c9d90");if(!t){for(let _ of Gt.segments)if(Math.abs(_.bottom-n*2.8)<.1){let m=u(_.a),g=u(_.b);i.beginPath(),i.moveTo(...m),i.lineTo(...g),i.strokeStyle="#62766b",i.lineWidth=2,i.stroke()}}let[f,p]=u([s.x,s.y]);i.save(),i.translate(f,p),i.rotate(-Yn),i.fillStyle="#2c7864",i.beginPath(),i.moveTo(0,-14),i.lineTo(-8,7),i.lineTo(0,3),i.lineTo(8,7),i.closePath(),i.fill(),i.restore()}function Ic(s){let e=At.rooms.find(t=>t.id===s);e&&(wn.reset(),Gt.teleport(e),Cp(e.direction),ui?.snap(Gt.position)&&qn.updateShadows(),Pr(),qu(),Re("rooms").value=s,Kt.clear())}function Ir(s){ct?.clock.phase!=="caught"&&(s&&ct?.game.cancelFire(),Re("welcome").hidden=!s,Re("resume").hidden=wn.enabled||s||document.pointerLockElement===Tn,document.body.classList.toggle("walking",!s),fi=!s,wn.setActive(fi),Kt.clear())}function by(s){return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}function wy(){ct.clock.catch(),fi=!1,Kt.clear(),wn.setActive(!1),Dr=!1,document.body.classList.remove("walking"),Re("chase-status").hidden=!0,Re("welcome").hidden=!0,Re("resume").hidden=!0,document.pointerLockElement&&document.exitPointerLock();let s=ct.game.state;Re("caught-score").textContent=`Wave ${s.wave} \xB7 ${s.kills} defeated \xB7 ${s.score.toLocaleString()} points. Best: ${ct.game.best.toLocaleString()}.`,Re("caught").showModal(),Re("play-again").focus()}Re("caught").addEventListener("cancel",s=>s.preventDefault());Re("play-again").onclick=()=>{ct&&(ct.game.reset(),ct.clock.reset(),Re("caught").close(),Re("chase-status").hidden=!0,Ic("arrival"),qn.updateShadows(),ha=performance.now(),ua(Rr==="lock"))};async function ua(s){if(Lr&&(s=s&&!wn.enabled,Rr=s?"lock":"drag",Ir(!1),Tn.focus(),s))try{await Tn.requestPointerLock()}catch{Rr="drag",Cr("Click and drag to look around; use W A S D to move."),Re("resume").hidden=!1}}Re("start").onclick=()=>ua(!0);Re("drag").onclick=()=>ua(!1);Re("resume").onclick=()=>ua(!0);Re("help").onclick=()=>{document.pointerLockElement&&document.exitPointerLock(),Ir(!0)};Re("rooms").onchange=s=>{ct?.game.started||(Ic(s.target.value),Re("welcome").hidden&&Tn.focus())};Re("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Cr("Use your browser\u2019s fullscreen control.")}};Re("map-toggle").onclick=()=>Rp(Re("map").hidden);document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===Tn?(Ir(!1),Rr="lock"):Rr==="lock"&&Lr&&Ir(!0)});document.addEventListener("pointerlockerror",()=>{Rr="drag",Ir(!1),Cr("Use click-and-drag to look around.")});Tn.addEventListener("pointerdown",s=>{s.pointerType==="touch"||s.pointerType==="pen"||!Lr||!fi||(Tn.focus(),Dr=!0,Ar=[s.clientX,s.clientY],Tn.setPointerCapture(s.pointerId))});Tn.addEventListener("pointerup",()=>{Dr=!1,Ar=null});Tn.addEventListener("pointercancel",()=>{Dr=!1});document.addEventListener("pointermove",s=>{if(s.pointerType==="touch"||s.pointerType==="pen"||!fi)return;let e=0,t=0;if(document.pointerLockElement===Tn)e=s.movementX,t=s.movementY;else if(Dr&&Ar)e=s.clientX-Ar[0],t=s.clientY-Ar[1],Ar=[s.clientX,s.clientY];else return;Yn-=e*.0025,Pi=Math.max(-1.35,Math.min(1.35,Pi-t*.0025)),Pr()});var Ty=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"];document.addEventListener("keydown",s=>{if(s.code==="Escape"){document.pointerLockElement&&document.exitPointerLock(),Ir(!0);return}!fi||["SELECT","INPUT","BUTTON"].includes(document.activeElement?.tagName)||Ty.includes(s.code)&&(s.preventDefault(),Kt.add(s.code))});document.addEventListener("keyup",s=>Kt.delete(s.code));window.addEventListener("blur",()=>{Kt.clear(),Dr=!1,Dc=!1});window.addEventListener("focus",()=>{Dc=!0,ha=performance.now()});document.addEventListener("visibilitychange",()=>{Kt.clear(),ha=performance.now()});function Lc(){let{width:s,height:e}=Ap();ys.aspect=s/e,ys.updateProjectionMatrix(),di.setSize(s,e,!1),qn.resize(s,e)}window.addEventListener("resize",Lc);window.visualViewport?.addEventListener("resize",Lc);async function Ey(){if(document.body.classList.add("loading"),At=await fetch(new URL("./navigation.8d80a66983989e77.json",import.meta.url)).then(c=>{if(!c.ok)throw Error("Navigation file missing");return c.json()}),Gt=new Mr(At),At.modelUpdatedAt){let c=new Date(At.modelUpdatedAt);Re("model-version").textContent="Updated "+new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",timeZone:"Europe/London"}).format(c),Re("model-version").title=c.toLocaleString("en-GB",{timeZone:"Europe/London"})+" \xB7 London time"}let s=new dc,e=await new Promise((c,l)=>s.load(new URL("./house.7766e892321887bc.glb",import.meta.url).href,c,h=>{let u=h.total?Math.round(h.loaded/h.total*75):35;Re("progress").style.width=u+"%",Re("load-status").textContent="Loading model \xB7 "+u+"%"},l));Re("load-status").textContent="Preparing the rooms\u2026",Re("progress").style.width="85%",await new Promise(c=>setTimeout(c,20)),e.scene.updateMatrixWorld(!0);let t=new Set(At.hiddenObjects),n=new Map,i=new Map;ui=new Mc(Er,At.interactiveDoors);function r(c){let l=c.name;if(i.has(l))return i.get(l);let h=c.clone(),u=At.materials[l]||At.materials[l.replaceAll("_"," ")];return u&&(h.color.setRGB(...u.slice(0,3)),h.opacity=u[3]),h.side=Et,/Mirror/i.test(l)?(h.transparent=!1,h.opacity=1,h.metalness=1,h.roughness=.06):(h.transparent||h.opacity<1||/Glazing|Glass/i.test(l))&&(h.transparent=!0,h.depthWrite=!1,h.transmission=0,h.roughness=.09,h.metalness=0,h.side=Pn),zu(h,l),i.set(l,h),h}function o(c){for(let l=c;l;l=l.parent)if(t.has(l.userData.name||l.name))return!0;return!1}e.scene.traverse(c=>{if(!c.isMesh)return;Ci.sourceMeshes++;let l=ui.owner(c);if(!l&&o(c)){Ci.hiddenMeshes++;return}let h=c.geometry.index?c.geometry.toNonIndexed():c.geometry.clone();h.applyMatrix4(c.matrixWorld),h.attributes.normal||h.computeVertexNormals();for(let _ of Object.keys(h.attributes))["position","normal"].includes(_)||h.deleteAttribute(_);let u=Array.isArray(c.material)?c.material[0]:c.material,d=r(u);if(l){ui.add(l,h,d);return}let f=d.name,p=n.get(f);p||(p={geometries:[],material:d},n.set(f,p)),p.geometries.push(h)});for(let{geometries:c,material:l}of n.values()){let h=xr(c,!1),u=new je(h,l);u.name=l.name,u.castShadow=!l.transparent,u.receiveShadow=!l.transparent,Er.add(u),Ci.batches++;for(let d of c)d.dispose()}if(At.approachSurface){let c=new ii(At.approachSurface.polygon.map(([d,f])=>new re(d,f))),l=new Si(c);l.rotateX(-Math.PI/2),l.translate(0,-.015,0);let h=new ln({color:6448225,roughness:.97,side:Et});zu(h,"Tarmac");let u=new je(l,h);u.name="Gate roadside approach",u.receiveShadow=!0,Er.add(u),Ci.batches++}Ci.doorBatches=ui.finish(),Ci.interactiveDoors=ui.doors.length,Ci.batches+=Ci.doorBatches,qn.updateShadows();{let c=new Cc(At,{scene:Er,camera:ys,doors:ui,mobile:wn.enabled,isActive:()=>fi&&Dc&&!document.hidden,onDeath:wy,onBegin:()=>{ct.clock.begin()&&(qn.setActionMode(!0),di.setPixelRatio(Math.min(devicePixelRatio,1.25)),Lc(),ct.game.begin(Gt.position))},onReset:()=>{ct?.clock.reset(),qn.setActionMode(!1),di.setPixelRatio(Math.min(devicePixelRatio,wn.enabled?1.25:1.5)),Lc()},onLook:(l,h)=>{Yn-=l*.004,Pi=Math.max(-1.35,Math.min(1.35,Pi-h*.004)),Pr()},toast:Cr});ct={clock:new bc,game:c,pursuit:c.horde}}let a=new Map;Re("rooms").replaceChildren();for(let c of At.rooms){if(!a.has(c.group)){let h=document.createElement("optgroup");h.label=c.group,a.set(c.group,h),Re("rooms").append(h)}let l=document.createElement("option");l.value=c.id,l.textContent=c.label,a.get(c.group).append(l)}Re("rooms").disabled=!1,Lr=!0,Ic("arrival"),Re("start").disabled=!1,Re("drag").disabled=!1,Re("start").textContent="Start walking",Re("load-status").textContent="Start at the gates \xB7 Both floors \xB7 Garden",Re("progress").style.width="100%",document.body.classList.remove("loading"),window.walkthrough={ready:!0,stats:Ci,nav:Gt,data:At,doors:ui,camera:ys,renderer:di,lighting:qn.info,touch:wn,easter:ct,goTo:Ic,setView(c,l){wn.reset(),Gt.position={x:c[0],y:c[1],z:c[2]},Cp(l),ui.snap(Gt.position)&&qn.updateShadows(),Pr(),qu()},getState(){return{...Gt.position,yaw:Yn,pitch:Pi,active:fi,room:Xu(),calls:di.info.render.calls}},startDrag:()=>ua(!1)}}function Pp(s){requestAnimationFrame(Pp);let e=Math.max(0,(s-ha)/1e3),t=Math.min(e,.04);if(ha=s,Lr){let n=fi&&!document.hidden&&(!ct?.game.started||Dc);if(n){let i=Number(Kt.has("KeyW")||Kt.has("ArrowUp"))-Number(Kt.has("KeyS")||Kt.has("ArrowDown"))+wn.axes.forward,r=Number(Kt.has("KeyD")||Kt.has("ArrowRight"))-Number(Kt.has("KeyA")||Kt.has("ArrowLeft"))+wn.axes.right,o=Math.max(1,Math.hypot(i,r)),a=(Kt.has("ShiftLeft")||Kt.has("ShiftRight")||ct?.game.sprinting?3.2:ct?.game.started?2.15:1.65)*t/o,c=(-Math.sin(Yn)*i+Math.cos(Yn)*r)*a,l=(Math.cos(Yn)*i+Math.sin(Yn)*r)*a;for(let[h,u]of[[c,0],[0,l]]){let d={...Gt.position};Gt.move(h,u),ct?.game.horde.blocks(Gt.position,Gt.radius)&&(Gt.position=d)}Pr()}ct&&(ct.clock.advance(e,n),n&&ct.clock.phase!=="caught"?(ct.game.step(t,Gt.position,ct.clock),ct.clock.phase==="chasing"&&s-Ep>120&&(qn.updateShadows(),Ep=s)):ct.game.cancelFire()),ui.update(Gt.position,t,!1,ct?.clock.phase==="chasing"?ct.pursuit.positions:[])&&qn.updateShadows(),s-Tp>160&&(qu(),ct?.clock.phase==="chasing"&&(Re("chase-time").textContent=(n?"Keep moving":"Paused")+" \xB7 "+by(ct.clock.survived)),Tp=s)}qn.render()}Ey().catch(s=>{console.error(s),Re("start").textContent="Try again",Re("start").disabled=!1,Re("start").onclick=()=>location.reload(),Re("load-status").textContent="The house could not load. Check your connection and try again.",Re("progress").style.width="0"});requestAnimationFrame(Pp);
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
