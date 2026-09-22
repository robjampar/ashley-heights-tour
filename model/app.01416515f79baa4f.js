/*!
meshoptimizer decoder
Copyright (C) 2016-2026 Arseny Kapoulkine

MIT License

Copyright (c) 2016-2022 Arseny Kapoulkine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var Vf=0,du=1,Wf=2;var Ds=1,qf=2,Dr=3,Vi=0,si=1,Rt=2,zt=0,Lr=1,fu=2,pu=3,mu=4,Yl=5;var Wi=100,Xf=101,jf=102,Kf=103,Yf=104,Ls=200,Jf=201,Zf=202,$f=203,gu=204,bu=205,to=206,Qf=207,io=208,ep=209,tp=210,ip=211,np=212,sp=213,rp=214,yl=0,_l=1,Ml=2,ur=3,Sl=4,wl=5,El=6,Tl=7,xu=0,ap=1,op=2,rn=0,no=1,so=2,ro=3,ao=4,oo=5,Ns=6,lo=7,Jh="attached",lp="detached",vu=300,cs=301,Fs=302,Jl=303,Zl=304,co=306,hi=1e3,Gi=1001,dr=1002,It=1003,$l=1004;var Us=1005;var kt=1006,Nr=1007;var an=1008;var di=1009,yu=1010,_u=1011,Fr=1012,Ql=1013,on=1014,Fi=1015,Yt=1016,ec=1017,tc=1018,hs=1020,Mu=35902,Su=35899,wu=1021,Eu=1022,yi=1023,gn=1026,En=1027,ic=1028,nc=1029,us=1030,sc=1031;var rc=1033,ho=33776,uo=33777,fo=33778,po=33779,ac=35840,oc=35841,lc=35842,cc=35843,hc=36196,uc=37492,dc=37496,fc=37488,pc=37489,mo=37490,mc=37491,gc=37808,bc=37809,xc=37810,vc=37811,yc=37812,_c=37813,Mc=37814,Sc=37815,wc=37816,Ec=37817,Tc=37818,Ac=37819,Rc=37820,Cc=37821,Pc=36492,Ic=36494,Dc=36495,Lc=36283,Nc=36284,go=36285,Fc=36286;var Ms=2300,Ss=2301,bl=2302,Zh=2303,$h=2400,Qh=2401,eu=2402,cp=2500;var Tu=0,bo=1,Ur=2,hp=3200;var xo=0,up=1,Xn="",Lt="srgb",gi="srgb-linear",ya="linear",mt="srgb";var xl=7680;var dp=519,fp=512,pp=513,mp=514,Uc=515,gp=516,bp=517,Oc=518,xp=519,Au=35044;var Ru="300 es",en=2e3,fr=2001;function ag(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function og(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function pr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function vp(){let s=pr("canvas");return s.style.display="block",s}var Zd={},mr=null;function _a(...s){let e="THREE."+s.shift();mr?mr("log",e,...s):console.log(e,...s)}function yp(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Fe(...s){s=yp(s);let e="THREE."+s.shift();if(mr)mr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Xe(...s){s=yp(s);let e="THREE."+s.shift();if(mr)mr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function _s(...s){let e=s.join(" ");e in Zd||(Zd[e]=!0,Fe(...s))}function _p(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Mp={[yl]:_l,[Ml]:El,[Sl]:Tl,[ur]:wl,[_l]:yl,[El]:Ml,[Tl]:Sl,[wl]:ur},bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let n=i[e];if(n!==void 0){let r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}},li=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$d=1234567,ga=Math.PI/180,ws=180/Math.PI;function Hi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(li[s&255]+li[s>>8&255]+li[s>>16&255]+li[s>>24&255]+"-"+li[e&255]+li[e>>8&255]+"-"+li[e>>16&15|64]+li[e>>24&255]+"-"+li[t&63|128]+li[t>>8&255]+"-"+li[t>>16&255]+li[t>>24&255]+li[i&255]+li[i>>8&255]+li[i>>16&255]+li[i>>24&255]).toLowerCase()}function rt(s,e,t){return Math.max(e,Math.min(t,s))}function Cu(s,e){return(s%e+e)%e}function lg(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function cg(s,e,t){return s!==e?(t-s)/(e-s):0}function ba(s,e,t){return(1-t)*s+t*e}function hg(s,e,t,i){return ba(s,e,1-Math.exp(-t*i))}function ug(s,e=1){return e-Math.abs(Cu(s,e*2)-e)}function dg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function fg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function pg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function mg(s,e){return s+Math.random()*(e-s)}function gg(s){return s*(.5-Math.random())}function bg(s){s!==void 0&&($d=s);let e=$d+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xg(s){return s*ga}function vg(s){return s*ws}function yg(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function _g(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Mg(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Sg(s,e,t,i,n){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),p=r((i-e)/2),m=a((i-e)/2);switch(n){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*m,l*p,o*c);break;case"YXY":s.set(l*p,o*h,l*m,o*c);break;case"ZYZ":s.set(l*m,l*p,o*h,o*c);break;default:Fe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Qi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Os={DEG2RAD:ga,RAD2DEG:ws,generateUUID:Hi,clamp:rt,euclideanModulo:Cu,mapLinear:lg,inverseLerp:cg,lerp:ba,damp:hg,pingpong:ug,smoothstep:dg,smootherstep:fg,randInt:pg,randFloat:mg,randFloatSpread:gg,seededRandom:bg,degToRad:xg,radToDeg:vg,isPowerOfTwo:yg,ceilPowerOfTwo:_g,floorPowerOfTwo:Mg,setQuaternionFromProperEuler:Sg,normalize:vt,denormalize:Qi},re=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Di=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3],d=r[a+0],p=r[a+1],m=r[a+2],v=r[a+3];if(u!==v||l!==d||c!==p||h!==m){let g=l*d+c*p+h*m+u*v;g<0&&(d=-d,p=-p,m=-m,v=-v,g=-g);let f=1-o;if(g<.9995){let y=Math.acos(g),M=Math.sin(y);f=Math.sin(f*y)/M,o=Math.sin(o*y)/M,l=l*f+d*o,c=c*f+p*o,h=h*f+m*o,u=u*f+v*o}else{l=l*f+d*o,c=c*f+p*o,h=h*f+m*o,u=u*f+v*o;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],d=r[a+1],p=r[a+2],m=r[a+3];return e[t]=o*m+h*u+l*p-c*d,e[t+1]=l*m+h*d+c*u-o*p,e[t+2]=c*m+h*p+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),d=l(i/2),p=l(n/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"YXZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"ZXY":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"ZYX":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"YZX":this._x=d*h*u+c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u-d*p*m;break;case"XZY":this._x=d*h*u-c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u+d*p*m;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-n)*p}else if(i>o&&i>u){let p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-o);this._w=(a-n)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Sh.copy(this).projectOnVector(e),this.sub(Sh)}reflect(e){return this.sub(Sh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sh=new I,Qd=new Di,$e=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],m=i[8],v=n[0],g=n[3],f=n[6],y=n[1],M=n[4],b=n[7],_=n[2],S=n[5],T=n[8];return r[0]=a*v+o*y+l*_,r[3]=a*g+o*M+l*S,r[6]=a*f+o*b+l*T,r[1]=c*v+h*y+u*_,r[4]=c*g+h*M+u*S,r[7]=c*f+h*b+u*T,r[2]=d*v+p*y+m*_,r[5]=d*g+p*M+m*S,r[8]=d*f+p*b+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,m=t*u+i*d+n*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=u*v,e[1]=(n*c-h*i)*v,e[2]=(o*i-n*a)*v,e[3]=d*v,e[4]=(h*t-n*l)*v,e[5]=(n*r-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return _s("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(wh.makeScale(e,t)),this}rotate(e){return _s("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(wh.makeRotation(-e)),this}translate(e,t){return _s("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(wh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wh=new $e,ef=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tf=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wg(){let s={enabled:!0,workingColorSpace:gi,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(n.r=On(n.r),n.g=On(n.g),n.b=On(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(n.r=hr(n.r),n.g=hr(n.g),n.b=hr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Xn?ya:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return _s("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return _s("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[gi]:{primaries:e,whitePoint:i,transfer:ya,toXYZ:ef,fromXYZ:tf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:ef,fromXYZ:tf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),s}var et=wg();function On(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function hr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Js,Al=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Js===void 0&&(Js=pr("canvas")),Js.width=e.width,Js.height=e.height;let n=Js.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Js}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=pr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(On(t[i]/255)*255):t[i]=On(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Eg=0,gr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=Hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Eh(n[a].image)):r.push(Eh(n[a]))}else r=Eh(n);i.url=r}return t||(e.images[this.uuid]=i),i}};function Eh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Al.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}var Tg=0,Th=new I,Xt=class s extends bn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,i=Gi,n=Gi,r=kt,a=an,o=yi,l=di,c=s.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Hi(),this.name="",this.source=new gr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Th).x}get height(){return this.source.getSize(Th).y}get depth(){return this.source.getSize(Th).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hi:e.x=e.x-Math.floor(e.x);break;case Gi:e.x=e.x<0?0:1;break;case dr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hi:e.y=e.y-Math.floor(e.y);break;case Gi:e.y=e.y<0?0:1;break;case dr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=vu;Xt.DEFAULT_ANISOTROPY=1;var yt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],m=l[9],v=l[2],g=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,b=(p+1)/2,_=(f+1)/2,S=(h+d)/4,T=(u+v)/4,x=(m+g)/4;return M>b&&M>_?M<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(M),n=S/i,r=T/i):b>_?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=S/n,r=x/n):_<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(_),i=T/r,n=x/r),this.set(i,n,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Rl=class extends bn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let n={width:e,height:t,depth:i.depth},r=new Xt(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new gr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bt=class extends Rl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ma=class extends Xt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=It,this.minFilter=It,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Cl=class extends Xt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=It,this.minFilter=It,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ke=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,i,n,r,a,o,l,c,h,u,d,p,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,h,u,d,p,m,v,g)}set(e,t,i,n,r,a,o,l,c,h,u,d,p,m,v,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=n,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,n=1/Zs.setFromMatrixColumn(e,0).length(),r=1/Zs.setFromMatrixColumn(e,1).length(),a=1/Zs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,p=a*u,m=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+m*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=m+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,p=l*u,m=c*h,v=c*u;t[0]=d+v*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-m,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,p=l*u,m=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,p=a*u,m=o*h,v=o*u;t[0]=l*h,t[4]=m*c-p,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=p*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=m*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+m,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*l,p=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-m,t[2]=m*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ag,e,Rg)}lookAt(e,t,i){let n=this.elements;return Pi.subVectors(e,t),Pi.lengthSq()===0&&(Pi.z=1),Pi.normalize(),Qn.crossVectors(i,Pi),Qn.lengthSq()===0&&(Math.abs(i.z)===1?Pi.x+=1e-4:Pi.z+=1e-4,Pi.normalize(),Qn.crossVectors(i,Pi)),Qn.normalize(),Wo.crossVectors(Pi,Qn),n[0]=Qn.x,n[4]=Wo.x,n[8]=Pi.x,n[1]=Qn.y,n[5]=Wo.y,n[9]=Pi.y,n[2]=Qn.z,n[6]=Wo.z,n[10]=Pi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],m=i[2],v=i[6],g=i[10],f=i[14],y=i[3],M=i[7],b=i[11],_=i[15],S=n[0],T=n[4],x=n[8],w=n[12],A=n[1],C=n[5],L=n[9],N=n[13],D=n[2],U=n[6],B=n[10],G=n[14],ne=n[3],q=n[7],X=n[11],J=n[15];return r[0]=a*S+o*A+l*D+c*ne,r[4]=a*T+o*C+l*U+c*q,r[8]=a*x+o*L+l*B+c*X,r[12]=a*w+o*N+l*G+c*J,r[1]=h*S+u*A+d*D+p*ne,r[5]=h*T+u*C+d*U+p*q,r[9]=h*x+u*L+d*B+p*X,r[13]=h*w+u*N+d*G+p*J,r[2]=m*S+v*A+g*D+f*ne,r[6]=m*T+v*C+g*U+f*q,r[10]=m*x+v*L+g*B+f*X,r[14]=m*w+v*N+g*G+f*J,r[3]=y*S+M*A+b*D+_*ne,r[7]=y*T+M*C+b*U+_*q,r[11]=y*x+M*L+b*B+_*X,r[15]=y*w+M*N+b*G+_*J,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],m=e[3],v=e[7],g=e[11],f=e[15],y=l*p-c*d,M=o*p-c*u,b=o*d-l*u,_=a*p-c*h,S=a*d-l*h,T=a*u-o*h;return t*(v*y-g*M+f*b)-i*(m*y-g*_+f*S)+n*(m*M-v*_+f*T)-r*(m*b-v*S+g*T)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],m=e[12],v=e[13],g=e[14],f=e[15],y=t*o-i*a,M=t*l-n*a,b=t*c-r*a,_=i*l-n*o,S=i*c-r*o,T=n*c-r*l,x=h*v-u*m,w=h*g-d*m,A=h*f-p*m,C=u*g-d*v,L=u*f-p*v,N=d*f-p*g,D=y*N-M*L+b*C+_*A-S*w+T*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/D;return e[0]=(o*N-l*L+c*C)*U,e[1]=(n*L-i*N-r*C)*U,e[2]=(v*T-g*S+f*_)*U,e[3]=(d*S-u*T-p*_)*U,e[4]=(l*A-a*N-c*w)*U,e[5]=(t*N-n*A+r*w)*U,e[6]=(g*b-m*T-f*M)*U,e[7]=(h*T-d*b+p*M)*U,e[8]=(a*L-o*A+c*x)*U,e[9]=(i*A-t*L-r*x)*U,e[10]=(m*S-v*b+f*y)*U,e[11]=(u*b-h*S-p*y)*U,e[12]=(o*w-a*C-l*x)*U,e[13]=(t*C-i*w+n*x)*U,e[14]=(v*M-m*_-g*y)*U,e[15]=(h*_-u*M+d*y)*U,this}scale(e){let t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,m=r*u,v=a*h,g=a*u,f=o*u,y=l*c,M=l*h,b=l*u,_=i.x,S=i.y,T=i.z;return n[0]=(1-(v+f))*_,n[1]=(p+b)*_,n[2]=(m-M)*_,n[3]=0,n[4]=(p-b)*S,n[5]=(1-(d+f))*S,n[6]=(g+y)*S,n[7]=0,n[8]=(m+M)*T,n[9]=(g-y)*T,n[10]=(1-(d+v))*T,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Zs.set(n[0],n[1],n[2]).length(),o=Zs.set(n[4],n[5],n[6]).length(),l=Zs.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Yi.copy(this);let c=1/a,h=1/o,u=1/l;return Yi.elements[0]*=c,Yi.elements[1]*=c,Yi.elements[2]*=c,Yi.elements[4]*=h,Yi.elements[5]*=h,Yi.elements[6]*=h,Yi.elements[8]*=u,Yi.elements[9]*=u,Yi.elements[10]*=u,t.setFromRotationMatrix(Yi),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,n,r,a,o=en,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(i-n),d=(t+e)/(t-e),p=(i+n)/(i-n),m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===en)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===fr)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=en,l=!1){let c=this.elements,h=2/(t-e),u=2/(i-n),d=-(t+e)/(t-e),p=-(i+n)/(i-n),m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===en)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===fr)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Zs=new I,Yi=new ke,Ag=new I(0,0,0),Rg=new I(1,1,1),Qn=new I,Wo=new I,Pi=new I,nf=new ke,sf=new Di,tn=class s{constructor(e=0,t=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return nf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sf.setFromEuler(this),this.setFromQuaternion(sf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};tn.DEFAULT_ORDER="XYZ";var br=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cg=0,rf=new I,$s=new Di,In=new ke,qo=new I,oa=new I,Pg=new I,Ig=new Di,af=new I(1,0,0),of=new I(0,1,0),lf=new I(0,0,1),cf={type:"added"},Dg={type:"removed"},Qs={type:"childadded",child:null},Ah={type:"childremoved",child:null},Et=class s extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new I,t=new tn,i=new Di,n=new I(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ke},normalMatrix:{value:new $e}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.multiply($s),this}rotateOnWorldAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.premultiply($s),this}rotateX(e){return this.rotateOnAxis(af,e)}rotateY(e){return this.rotateOnAxis(of,e)}rotateZ(e){return this.rotateOnAxis(lf,e)}translateOnAxis(e,t){return rf.copy(e).applyQuaternion(this.quaternion),this.position.add(rf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(af,e)}translateY(e){return this.translateOnAxis(of,e)}translateZ(e){return this.translateOnAxis(lf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qo.copy(e):qo.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(oa,qo,this.up):In.lookAt(qo,oa,this.up),this.quaternion.setFromRotationMatrix(In),n&&(In.extractRotation(n.matrixWorld),$s.setFromRotationMatrix(In),this.quaternion.premultiply($s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cf),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dg),Ah.child=e,this.dispatchEvent(Ah),Ah.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cf),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,e,Pg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,Ig,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Et.DEFAULT_UP=new I(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var at=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},Lg={type:"move"},xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new at,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new at,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new at,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,i),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lg)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new at;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Sp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},es={h:0,s:0,l:0},Xo={h:0,s:0,l:0};function Rh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Be=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=et.workingColorSpace){if(e=Cu(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Rh(a,r,e+1/3),this.g=Rh(a,r,e),this.b=Rh(a,r,e-1/3)}return et.colorSpaceToWorking(this,n),this}setStyle(e,t=Lt){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){let i=Sp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=On(e.r),this.g=On(e.g),this.b=On(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return et.workingToColorSpace(ci.copy(this),e),Math.round(rt(ci.r*255,0,255))*65536+Math.round(rt(ci.g*255,0,255))*256+Math.round(rt(ci.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(ci.copy(this),t);let i=ci.r,n=ci.g,r=ci.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(ci.copy(this),t),e.r=ci.r,e.g=ci.g,e.b=ci.b,e}getStyle(e=Lt){et.workingToColorSpace(ci.copy(this),e);let t=ci.r,i=ci.g,n=ci.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(es),this.setHSL(es.h+e,es.s+t,es.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(es),e.getHSL(Xo);let i=ba(es.h,Xo.h,t),n=ba(es.s,Xo.s,t),r=ba(es.l,Xo.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ci=new Be;Be.NAMES=Sp;var Es=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ji=new I,Dn=new I,Ch=new I,Ln=new I,er=new I,tr=new I,hf=new I,Ph=new I,Ih=new I,Dh=new I,Lh=new yt,Nh=new yt,Fh=new yt,rs=class s{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Ji.subVectors(e,t),n.cross(Ji);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Ji.subVectors(n,t),Dn.subVectors(i,t),Ch.subVectors(e,t);let a=Ji.dot(Ji),o=Ji.dot(Dn),l=Ji.dot(Ch),c=Dn.dot(Dn),h=Dn.dot(Ch),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-p-m,m,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(a,Ln.y),l.addScaledVector(o,Ln.z),l)}static getInterpolatedAttribute(e,t,i,n,r,a){return Lh.setScalar(0),Nh.setScalar(0),Fh.setScalar(0),Lh.fromBufferAttribute(e,t),Nh.fromBufferAttribute(e,i),Fh.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(Lh,r.x),a.addScaledVector(Nh,r.y),a.addScaledVector(Fh,r.z),a}static isFrontFacing(e,t,i,n){return Ji.subVectors(i,t),Dn.subVectors(e,t),Ji.cross(Dn).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ji.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),Ji.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return s.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,r=this.c,a,o;er.subVectors(n,i),tr.subVectors(r,i),Ph.subVectors(e,i);let l=er.dot(Ph),c=tr.dot(Ph);if(l<=0&&c<=0)return t.copy(i);Ih.subVectors(e,n);let h=er.dot(Ih),u=tr.dot(Ih);if(h>=0&&u<=h)return t.copy(n);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(er,a);Dh.subVectors(e,r);let p=er.dot(Dh),m=tr.dot(Dh);if(m>=0&&p<=m)return t.copy(r);let v=p*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(tr,o);let g=h*m-p*u;if(g<=0&&u-h>=0&&p-m>=0)return hf.subVectors(r,n),o=(u-h)/(u-h+(p-m)),t.copy(n).addScaledVector(hf,o);let f=1/(g+v+d);return a=v*f,o=d*f,t.copy(i).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ft=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Zi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zi):Zi.fromBufferAttribute(r,a),Zi.applyMatrix4(e.matrixWorld),this.expandByPoint(Zi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jo.copy(i.boundingBox)),jo.applyMatrix4(e.matrixWorld),this.union(jo)}let n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zi),Zi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(la),Ko.subVectors(this.max,la),ir.subVectors(e.a,la),nr.subVectors(e.b,la),sr.subVectors(e.c,la),ts.subVectors(nr,ir),is.subVectors(sr,nr),bs.subVectors(ir,sr);let t=[0,-ts.z,ts.y,0,-is.z,is.y,0,-bs.z,bs.y,ts.z,0,-ts.x,is.z,0,-is.x,bs.z,0,-bs.x,-ts.y,ts.x,0,-is.y,is.x,0,-bs.y,bs.x,0];return!Uh(t,ir,nr,sr,Ko)||(t=[1,0,0,0,1,0,0,0,1],!Uh(t,ir,nr,sr,Ko))?!1:(Yo.crossVectors(ts,is),t=[Yo.x,Yo.y,Yo.z],Uh(t,ir,nr,sr,Ko))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Nn=[new I,new I,new I,new I,new I,new I,new I,new I],Zi=new I,jo=new Ft,ir=new I,nr=new I,sr=new I,ts=new I,is=new I,bs=new I,la=new I,Ko=new I,Yo=new I,xs=new I;function Uh(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){xs.fromArray(s,r);let o=n.x*Math.abs(xs.x)+n.y*Math.abs(xs.y)+n.z*Math.abs(xs.z),l=e.dot(xs),c=t.dot(xs),h=i.dot(xs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Wt=new I,Jo=new re,Ng=0,Mt=class extends bn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ng++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Au,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Jo.fromBufferAttribute(this,t),Jo.applyMatrix3(e),this.setXY(t,Jo.x,Jo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Sa=class extends Mt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var wa=class extends Mt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ze=class extends Mt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Fg=new Ft,ca=new I,Oh=new I,ui=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Fg.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ca.subVectors(e,this.center);let t=ca.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(ca,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ca.copy(e.center).add(Oh)),this.expandByPoint(ca.copy(e.center).sub(Oh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ug=0,zi=new ke,kh=new Et,rr=new I,Ii=new Ft,ha=new Ft,ei=new I,ot=class s extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ag(e)?wa:Sa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $e().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return zi.makeRotationFromQuaternion(e),this.applyMatrix4(zi),this}rotateX(e){return zi.makeRotationX(e),this.applyMatrix4(zi),this}rotateY(e){return zi.makeRotationY(e),this.applyMatrix4(zi),this}rotateZ(e){return zi.makeRotationZ(e),this.applyMatrix4(zi),this}translate(e,t,i){return zi.makeTranslation(e,t,i),this.applyMatrix4(zi),this}scale(e,t,i){return zi.makeScale(e,t,i),this.applyMatrix4(zi),this}lookAt(e){return kh.lookAt(e),kh.updateMatrix(),this.applyMatrix4(kh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,r=e.length;n<r;n++){let a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ze(i,3))}else{let i=Math.min(e.length,t.count);for(let n=0;n<i;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ft);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let r=t[i];Ii.setFromBufferAttribute(r),this.morphTargetsRelative?(ei.addVectors(this.boundingBox.min,Ii.min),this.boundingBox.expandByPoint(ei),ei.addVectors(this.boundingBox.max,Ii.max),this.boundingBox.expandByPoint(ei)):(this.boundingBox.expandByPoint(Ii.min),this.boundingBox.expandByPoint(Ii.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let i=this.boundingSphere.center;if(Ii.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ha.setFromBufferAttribute(o),this.morphTargetsRelative?(ei.addVectors(Ii.min,ha.min),Ii.expandByPoint(ei),ei.addVectors(Ii.max,ha.max),Ii.expandByPoint(ei)):(Ii.expandByPoint(ha.min),Ii.expandByPoint(ha.max))}Ii.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)ei.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(ei));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ei.fromBufferAttribute(o,c),l&&(rr.fromBufferAttribute(e,c),ei.add(rr)),n=Math.max(n,i.distanceToSquared(ei))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,n=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Mt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new I,l[x]=new I;let c=new I,h=new I,u=new I,d=new re,p=new re,m=new re,v=new I,g=new I;function f(x,w,A){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,A),d.fromBufferAttribute(r,x),p.fromBufferAttribute(r,w),m.fromBufferAttribute(r,A),h.sub(c),u.sub(c),p.sub(d),m.sub(d);let C=1/(p.x*m.y-m.x*p.y);isFinite(C)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-p.y).multiplyScalar(C),g.copy(u).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(C),o[x].add(v),o[w].add(v),o[A].add(v),l[x].add(g),l[w].add(g),l[A].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,w=y.length;x<w;++x){let A=y[x],C=A.start,L=A.count;for(let N=C,D=C+L;N<D;N+=3)f(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let M=new I,b=new I,_=new I,S=new I;function T(x){_.fromBufferAttribute(n,x),S.copy(_);let w=o[x];M.copy(w),M.sub(_.multiplyScalar(_.dot(w))).normalize(),b.crossVectors(S,w);let C=b.dot(l[x])<0?-1:1;a.setXYZW(x,M.x,M.y,M.z,C)}for(let x=0,w=y.length;x<w;++x){let A=y[x],C=A.start,L=A.count;for(let N=C,D=C+L;N<D;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let n=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,p=e.count;d<p;d+=3){let m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);n.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ei.fromBufferAttribute(e,t),ei.normalize(),e.setXYZ(t,ei.x,ei.y,ei.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let f=0;f<h;f++)d[m++]=c[p++]}return new Mt(d,h,u)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let n=e.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},vr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Au,this.updateRanges=[],this.version=0,this.uuid=Hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},mi=new I,yr=class s{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)mi.fromBufferAttribute(this,t),mi.applyMatrix4(e),this.setXYZ(t,mi.x,mi.y,mi.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)mi.fromBufferAttribute(this,t),mi.applyNormalMatrix(e),this.setXYZ(t,mi.x,mi.y,mi.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)mi.fromBufferAttribute(this,t),mi.transformDirection(e),this.setXYZ(t,mi.x,mi.y,mi.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Qi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Qi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Qi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Qi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Qi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){_a("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_a("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Bh=new I,Og=new I,kg=new $e,$i=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=Bh.subVectors(i,t).cross(Og.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let n=e.delta(Bh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||kg.getNormalMatrix(e),n=this.coplanarPoint(Bh).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Bg=0,bi=class extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=Hi(),this.name="",this.type="Material",this.blending=Lr,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gu,this.blendDst=bu,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xl,this.stencilZFail=xl,this.stencilZPass=xl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new $i().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new re().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Fn=new I,zh=new I,Zo=new I,$o=new I,as=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){zh.copy(e).add(t).multiplyScalar(.5),Zo.copy(t).sub(e).normalize(),$o.copy(this.origin).sub(zh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Zo),o=$o.dot(this.direction),l=-$o.dot(Zo),c=$o.lengthSq(),h=Math.abs(1-a*a),u,d,p,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(zh).addScaledVector(Zo,d),p}intersectSphere(e,t){if(e.radius<0)return null;Fn.subVectors(e.center,this.origin);let i=Fn.dot(this.direction),n=Fn.dot(Fn)-i*i,r=e.radius*e.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,p=e.z-a.z,m=t.x-a.x,v=t.y-a.y,g=t.z-a.z,f=i.x-a.x,y=i.y-a.y,M=i.z-a.z,b=Math.abs(l),_=Math.abs(c),S=Math.abs(h),T,x,w,A,C,L,N,D,U,B,G,ne;if(b>=_&&b>=S?(w=l,L=u,U=m,ne=f,l>=0?(T=c,x=h,A=d,C=p,N=v,D=g,B=y,G=M):(T=h,x=c,A=p,C=d,N=g,D=v,B=M,G=y)):_>=S?(w=c,L=d,U=v,ne=y,c>=0?(T=h,x=l,A=p,C=u,N=g,D=m,B=M,G=f):(T=l,x=h,A=u,C=p,N=m,D=g,B=f,G=M)):(w=h,L=p,U=g,ne=M,h>=0?(T=l,x=c,A=u,C=d,N=m,D=v,B=f,G=y):(T=c,x=l,A=d,C=u,N=v,D=m,B=y,G=f)),w===0)return null;let q=T/w,X=x/w,J=1/w,Ee=A-q*L,ie=C-X*L,ye=N-q*U,Te=D-X*U,ze=B-q*ne,j=G-X*ne,$=ze*Te-j*ye,ue=Ee*j-ie*ze,Ue=ye*ie-Te*Ee;if(n){if($<0||ue<0||Ue<0)return null}else if(($<0||ue<0||Ue<0)&&($>0||ue>0||Ue>0))return null;let Se=$+ue+Ue;if(Se===0)return null;let We=J*($*L+ue*U+Ue*ne);return(Se>0?We<0:We>0)?null:this.at(We/Se,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},xi=class extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=xu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},uf=new ke,vs=new as,Qo=new ui,df=new I,el=new I,tl=new I,il=new I,Gh=new I,nl=new I,ff=new I,sl=new I,Je=class extends Et{constructor(e=new ot,t=new xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let o=this.morphTargetInfluences;if(r&&o){nl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Gh.fromBufferAttribute(u,e),a?nl.addScaledVector(Gh,h):nl.addScaledVector(Gh.sub(t),h))}t.add(nl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qo.copy(i.boundingSphere),Qo.applyMatrix4(r),vs.copy(e.ray).recast(e.near),!(Qo.containsPoint(vs.origin)===!1&&(vs.intersectSphere(Qo,df)===null||vs.origin.distanceToSquared(df)>(e.far-e.near)**2))&&(uf.copy(r).invert(),vs.copy(e.ray).applyMatrix4(uf),!(i.boundingBox!==null&&vs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vs)))}_computeIntersections(e,t,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){let g=d[m],f=a[g.materialIndex],y=Math.max(g.start,p.start),M=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=y,_=M;b<_;b+=3){let S=o.getX(b),T=o.getX(b+1),x=o.getX(b+2);n=rl(this,f,e,i,c,h,u,S,T,x),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{let m=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let g=m,f=v;g<f;g+=3){let y=o.getX(g),M=o.getX(g+1),b=o.getX(g+2);n=rl(this,a,e,i,c,h,u,y,M,b),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){let g=d[m],f=a[g.materialIndex],y=Math.max(g.start,p.start),M=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let b=y,_=M;b<_;b+=3){let S=b,T=b+1,x=b+2;n=rl(this,f,e,i,c,h,u,S,T,x),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{let m=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let g=m,f=v;g<f;g+=3){let y=g,M=g+1,b=g+2;n=rl(this,a,e,i,c,h,u,y,M,b),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}}};function zg(s,e,t,i,n,r,a,o){let l;if(e.side===si?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===Vi,o),l===null)return null;sl.copy(o),sl.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(sl);return c<t.near||c>t.far?null:{distance:c,point:sl.clone(),object:s}}function rl(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,el),s.getVertexPosition(l,tl),s.getVertexPosition(c,il);let h=zg(s,e,t,i,el,tl,il,ff);if(h){let u=new I;rs.getBarycoord(ff,el,tl,il,u),n&&(h.uv=rs.getInterpolatedAttribute(n,o,l,c,u,new re)),r&&(h.uv1=rs.getInterpolatedAttribute(r,o,l,c,u,new re)),a&&(h.normal=rs.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};rs.getNormal(el,tl,il,d.normal),h.face=d,h.barycoord=u}return h}var ua=new yt,pf=new yt,mf=new yt,Gg=new yt,gf=new ke,al=new I,Hh=new ui,bf=new ke,Vh=new as,Ea=class extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jh,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ft),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,al),this.boundingBox.expandByPoint(al)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ui),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,al),this.boundingSphere.expandByPoint(al)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hh.copy(this.boundingSphere),Hh.applyMatrix4(n),e.ray.intersectsSphere(Hh)!==!1&&(bf.copy(n).invert(),Vh.copy(e.ray).applyMatrix4(bf),!(this.boundingBox!==null&&Vh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Vh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===lp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Fe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,n=this.geometry;pf.fromBufferAttribute(n.attributes.skinIndex,e),mf.fromBufferAttribute(n.attributes.skinWeight,e),t.isVector4?(ua.copy(t),t.set(0,0,0,0)):(ua.set(...t,1),t.set(0,0,0)),ua.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=mf.getComponent(r);if(a!==0){let o=pf.getComponent(r);gf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Gg.copy(ua).applyMatrix4(gf),a)}}return t.isVector4&&(t.w=ua.w),t.applyMatrix4(this.bindMatrixInverse)}},_r=class extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}},xn=class extends Xt{constructor(e=null,t=1,i=1,n,r,a,o,l,c=It,h=It,u,d){super(null,a,o,l,c,h,n,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},xf=new ke,Hg=new ke,Ta=class s{constructor(e=[],t=[]){this.uuid=Hi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Fe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new ke;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Hg;xf.multiplyMatrices(o,t[r]),xf.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new xn(t,e,e,yi,Fi);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){let r=e.bones[i],a=t[r];a===void 0&&(Fe("Skeleton: No bone found with UUID:",r),a=new _r),this.bones.push(a),this.boneInverses.push(new ke().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let n=0,r=t.length;n<r;n++){let a=t[n];e.bones.push(a.uuid);let o=i[n];e.boneInverses.push(o.toArray())}return e}},kn=class extends Mt{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ar=new ke,vf=new ke,ol=[],yf=new Ft,Vg=new ke,da=new Je,fa=new ui,Aa=class extends Je{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new kn(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Vg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ft),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ar),yf.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(yf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ar),fa.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(fa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(e,t){let i=this.matrixWorld,n=this.count;if(da.geometry=this.geometry,da.material=this.material,da.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fa.copy(this.boundingSphere),fa.applyMatrix4(i),e.ray.intersectsSphere(fa)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,ar),vf.multiplyMatrices(i,ar),da.matrixWorld=vf,da.raycast(e,ol);for(let a=0,o=ol.length;a<o;a++){let l=ol[a];l.instanceId=r,l.object=this,t.push(l)}ol.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new kn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new xn(new Float32Array(n*this.count),n,this.count,ic,Fi));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ys=new ui,Wg=new re(.5,.5),ll=new I,vn=class{constructor(e=new $i,t=new $i,i=new $i,n=new $i,r=new $i,a=new $i){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=en,i=!1){let n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],m=r[8],v=r[9],g=r[10],f=r[11],y=r[12],M=r[13],b=r[14],_=r[15];if(n[0].setComponents(c-a,p-h,f-m,_-y).normalize(),n[1].setComponents(c+a,p+h,f+m,_+y).normalize(),n[2].setComponents(c+o,p+u,f+v,_+M).normalize(),n[3].setComponents(c-o,p-u,f-v,_-M).normalize(),i)n[4].setComponents(l,d,g,b).normalize(),n[5].setComponents(c-l,p-d,f-g,_-b).normalize();else if(n[4].setComponents(c-l,p-d,f-g,_-b).normalize(),t===en)n[5].setComponents(c+l,p+d,f+g,_+b).normalize();else if(t===fr)n[5].setComponents(l,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ys)}intersectsSprite(e){ys.center.set(0,0,0);let t=Wg.distanceTo(e.center);return ys.radius=.7071067811865476+t,ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(ys)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(ll.x=n.normal.x>0?e.max.x:e.min.x,ll.y=n.normal.y>0?e.max.y:e.min.y,ll.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ll)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yn=class extends bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Pl=new I,Il=new I,_f=new ke,pa=new as,cl=new ui,Wh=new I,Mf=new I,nn=class extends Et{constructor(e=new ot,t=new yn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Pl.fromBufferAttribute(t,n-1),Il.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Pl.distanceTo(Il);e.setAttribute("lineDistance",new Ze(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),cl.copy(i.boundingSphere),cl.applyMatrix4(n),cl.radius+=r,e.ray.intersectsSphere(cl)===!1)return;_f.copy(n).invert(),pa.copy(e.ray).applyMatrix4(_f);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let p=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=p,g=m-1;v<g;v+=c){let f=h.getX(v),y=h.getX(v+1),M=hl(this,e,pa,l,f,y,v);M&&t.push(M)}if(this.isLineLoop){let v=h.getX(m-1),g=h.getX(p),f=hl(this,e,pa,l,v,g,m-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let v=p,g=m-1;v<g;v+=c){let f=hl(this,e,pa,l,v,v+1,v);f&&t.push(f)}if(this.isLineLoop){let v=hl(this,e,pa,l,m-1,p,m-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function hl(s,e,t,i,n,r,a){let o=s.geometry.attributes.position;if(Pl.fromBufferAttribute(o,n),Il.fromBufferAttribute(o,r),t.distanceSqToSegment(Pl,Il,Wh,Mf)>i)return;Wh.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Wh);if(!(c<e.near||c>e.far))return{distance:c,point:Mf.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Sf=new I,wf=new I,Ra=class extends nn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)Sf.fromBufferAttribute(t,n),wf.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Sf.distanceTo(wf);e.setAttribute("lineDistance",new Ze(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ca=class extends nn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Mr=class extends bi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ef=new ke,tu=new as,ul=new ui,dl=new I,Pa=class extends Et{constructor(e=new ot,t=new Mr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ul.copy(i.boundingSphere),ul.applyMatrix4(n),ul.radius+=r,e.ray.intersectsSphere(ul)===!1)return;Ef.copy(n).invert(),tu.copy(e.ray).applyMatrix4(Ef);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=d,v=p;m<v;m++){let g=c.getX(m);dl.fromBufferAttribute(u,g),Tf(dl,g,l,n,e,t,this)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let m=d,v=p;m<v;m++)dl.fromBufferAttribute(u,m),Tf(dl,m,l,n,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Tf(s,e,t,i,n,r,a){let o=tu.distanceSqToPoint(s);if(o<t){let l=new I;tu.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ia=class extends Xt{constructor(e=[],t=cs,i,n,r,a,o,l,c,h){super(e,t,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Da=class extends Xt{constructor(e,t,i,n,r,a,o,l,c){super(e,t,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var _n=class extends Xt{constructor(e,t,i=on,n,r,a,o=It,l=It,c,h=gn,u=1){if(h!==gn&&h!==En)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new gr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Dl=class extends _n{constructor(e,t=on,i=cs,n,r,a=It,o=It,l,c=gn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,n,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},La=class extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gt=class s extends ot{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,n,a,2),m("x","z","y",1,-1,e,i,-t,n,a,3),m("x","y","z",1,-1,e,t,i,n,r,4),m("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(u,2));function m(v,g,f,y,M,b,_,S,T,x,w){let A=b/T,C=_/x,L=b/2,N=_/2,D=S/2,U=T+1,B=x+1,G=0,ne=0,q=new I;for(let X=0;X<B;X++){let J=X*C-N;for(let Ee=0;Ee<U;Ee++){let ie=Ee*A-L;q[v]=ie*y,q[g]=J*M,q[f]=D,c.push(q.x,q.y,q.z),q[v]=0,q[g]=0,q[f]=S>0?1:-1,h.push(q.x,q.y,q.z),u.push(Ee/T),u.push(1-X/x),G+=1}}for(let X=0;X<x;X++)for(let J=0;J<T;J++){let Ee=d+J+U*X,ie=d+J+U*(X+1),ye=d+(J+1)+U*(X+1),Te=d+(J+1)+U*X;l.push(Ee,ie,Te),l.push(ie,ye,Te),ne+=6}o.addGroup(p,ne,w),p+=ne,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Bn=class s extends ot{constructor(e=1,t=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:n,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,m=i*2+r,v=n+1,g=new I,f=new I;for(let y=0;y<=m;y++){let M=0,b=0,_=0,S=0;if(y<=i){let w=y/i,A=w*Math.PI/2;b=-h-e*Math.cos(A),_=e*Math.sin(A),S=-e*Math.cos(A),M=w*u}else if(y<=i+r){let w=(y-i)/r;b=-h+w*t,_=e,S=0,M=u+w*d}else{let w=(y-i-r)/i,A=w*Math.PI/2;b=h+e*Math.sin(A),_=e*Math.cos(A),S=e*Math.sin(A),M=u+d+w*u}let T=Math.max(0,Math.min(1,M/p)),x=0;y===0?x=.5/n:y===m&&(x=-.5/n);for(let w=0;w<=n;w++){let A=w/n,C=A*Math.PI*2,L=Math.sin(C),N=Math.cos(C);f.x=-_*N,f.y=b,f.z=_*L,o.push(f.x,f.y,f.z),g.set(-_*N,S,_*L),g.normalize(),l.push(g.x,g.y,g.z),c.push(A+x,T)}if(y>0){let w=(y-1)*v;for(let A=0;A<n;A++){let C=w+A,L=w+A+1,N=y*v+A,D=y*v+A+1;a.push(C,L,N),a.push(L,D,N)}}}this.setIndex(a),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Sr=class s extends ot{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new I,h=new re;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=i+u/t*n;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(o,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},jt=class s extends ot{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],u=[],d=[],p=[],m=0,v=[],g=i/2,f=0;y(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(d,3)),this.setAttribute("uv",new Ze(p,2));function y(){let b=new I,_=new I,S=0,T=(t-e)/i;for(let x=0;x<=r;x++){let w=[],A=x/r,C=A*(t-e)+e;for(let L=0;L<=n;L++){let N=L/n,D=N*l+o,U=Math.sin(D),B=Math.cos(D);_.x=C*U,_.y=-A*i+g,_.z=C*B,u.push(_.x,_.y,_.z),b.set(U,T,B).normalize(),d.push(b.x,b.y,b.z),p.push(N,1-A),w.push(m++)}v.push(w)}for(let x=0;x<n;x++)for(let w=0;w<r;w++){let A=v[w][x],C=v[w+1][x],L=v[w+1][x+1],N=v[w][x+1];(e>0||w!==0)&&(h.push(A,C,N),S+=3),(t>0||w!==r-1)&&(h.push(C,L,N),S+=3)}c.addGroup(f,S,0),f+=S}function M(b){let _=m,S=new re,T=new I,x=0,w=b===!0?e:t,A=b===!0?1:-1;for(let L=1;L<=n;L++)u.push(0,g*A,0),d.push(0,A,0),p.push(.5,.5),m++;let C=m;for(let L=0;L<=n;L++){let D=L/n*l+o,U=Math.cos(D),B=Math.sin(D);T.x=w*B,T.y=g*A,T.z=w*U,u.push(T.x,T.y,T.z),d.push(0,A,0),S.x=U*.5+.5,S.y=B*.5*A+.5,p.push(S.x,S.y),m++}for(let L=0;L<n;L++){let N=_+L,D=C+L;b===!0?h.push(D,D+1,N):h.push(D+1,D,N),x+=3}c.addGroup(f,x,b===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},zn=class s extends jt{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ll=class s extends ot{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};let r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new Ze(r,3)),this.setAttribute("normal",new Ze(r.slice(),3)),this.setAttribute("uv",new Ze(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let M=new I,b=new I,_=new I;for(let S=0;S<t.length;S+=3)p(t[S+0],M),p(t[S+1],b),p(t[S+2],_),l(M,b,_,y)}function l(y,M,b,_){let S=_+1,T=[];for(let x=0;x<=S;x++){T[x]=[];let w=y.clone().lerp(b,x/S),A=M.clone().lerp(b,x/S),C=S-x;for(let L=0;L<=C;L++)L===0&&x===S?T[x][L]=w:T[x][L]=w.clone().lerp(A,L/C)}for(let x=0;x<S;x++)for(let w=0;w<2*(S-x)-1;w++){let A=Math.floor(w/2);w%2===0?(d(T[x][A+1]),d(T[x+1][A]),d(T[x][A])):(d(T[x][A+1]),d(T[x+1][A+1]),d(T[x+1][A]))}}function c(y){let M=new I;for(let b=0;b<r.length;b+=3)M.x=r[b+0],M.y=r[b+1],M.z=r[b+2],M.normalize().multiplyScalar(y),r[b+0]=M.x,r[b+1]=M.y,r[b+2]=M.z}function h(){let y=new I;for(let M=0;M<r.length;M+=3){y.x=r[M+0],y.y=r[M+1],y.z=r[M+2];let b=g(y)/2/Math.PI+.5,_=f(y)/Math.PI+.5;a.push(b,1-_)}m(),u()}function u(){for(let y=0;y<a.length;y+=6){let M=a[y+0],b=a[y+2],_=a[y+4],S=Math.max(M,b,_),T=Math.min(M,b,_);S>.9&&T<.1&&(M<.2&&(a[y+0]+=1),b<.2&&(a[y+2]+=1),_<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function p(y,M){let b=y*3;M.x=e[b+0],M.y=e[b+1],M.z=e[b+2]}function m(){let y=new I,M=new I,b=new I,_=new I,S=new re,T=new re,x=new re;for(let w=0,A=0;w<r.length;w+=9,A+=6){y.set(r[w+0],r[w+1],r[w+2]),M.set(r[w+3],r[w+4],r[w+5]),b.set(r[w+6],r[w+7],r[w+8]),S.set(a[A+0],a[A+1]),T.set(a[A+2],a[A+3]),x.set(a[A+4],a[A+5]),_.copy(y).add(M).add(b).divideScalar(3);let C=g(_);v(S,A+0,y,C),v(T,A+2,M,C),v(x,A+4,b,C)}}function v(y,M,b,_){_<0&&y.x===1&&(a[M]=y.x-1),b.x===0&&b.z===0&&(a[M]=_/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function f(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}};var Li=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),n=0,r=i.length,a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);let h=i[n],d=i[n+1]-h,p=(a-h)/d;return(n+p)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);let a=this.getPoint(n),o=this.getPoint(r),l=t||(a.isVector2?new re:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new I,n=[],r=[],a=[],o=new I,l=new ke;for(let p=0;p<=e;p++){let m=p/e;n[p]=this.getTangentAt(m,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(n[p-1],n[p]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(rt(n[p-1].dot(n[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,m))}a[p].crossVectors(n[p],r[p])}if(t===!0){let p=Math.acos(rt(r[0].dot(r[e]),-1,1));p/=e,n[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(n[m],p*m)),a[m].crossVectors(n[m],r[m])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},wr=class extends Li{constructor(e=0,t=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new re){let i=t,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Nl=class extends wr{constructor(e,t,i,n,r,a){super(e,t,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Pu(){let s=0,e=0,t=0,i=0;function n(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,n(a,o,d,p)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+i*o}}}var Af=new I,Rf=new I,qh=new Pu,Xh=new Pu,jh=new Pu,Er=class extends Li{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new I){let i=t,n=this.points,r=n.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(Rf.subVectors(n[0],n[1]).add(n[0]),c=Rf);let u=n[o%r],d=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(Af.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=Af),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),g=Math.pow(d.distanceToSquared(h),p);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),qh.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,v,g),Xh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,v,g),jh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(qh.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Xh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),jh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(qh.calc(l),Xh.calc(l),jh.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new I().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Cf(s,e,t,i,n){let r=(i-e)*.5,a=(n-t)*.5,o=s*s,l=s*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*s+t}function qg(s,e){let t=1-s;return t*t*e}function Xg(s,e){return 2*(1-s)*s*e}function jg(s,e){return s*s*e}function xa(s,e,t,i){return qg(s,e)+Xg(s,t)+jg(s,i)}function Kg(s,e){let t=1-s;return t*t*t*e}function Yg(s,e){let t=1-s;return 3*t*t*s*e}function Jg(s,e){return 3*(1-s)*s*s*e}function Zg(s,e){return s*s*s*e}function va(s,e,t,i,n){return Kg(s,e)+Yg(s,t)+Jg(s,i)+Zg(s,n)}var Na=class extends Li{constructor(e=new re,t=new re,i=new re,n=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new re){let i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(va(e,n.x,r.x,a.x,o.x),va(e,n.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fl=class extends Li{constructor(e=new I,t=new I,i=new I,n=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new I){let i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(va(e,n.x,r.x,a.x,o.x),va(e,n.y,r.y,a.y,o.y),va(e,n.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fa=class extends Li{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ul=class extends Li{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ua=class extends Li{constructor(e=new re,t=new re,i=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new re){let i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(xa(e,n.x,r.x,a.x),xa(e,n.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends Li{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){let i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(xa(e,n.x,r.x,a.x),xa(e,n.y,r.y,a.y),xa(e,n.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends Li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let i=t,n=this.points,r=(n.length-1)*e,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],u=n[a>n.length-3?n.length-1:a+2];return i.set(Cf(o,l.x,c.x,h.x,u.x),Cf(o,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new re().fromArray(n))}return this}},Ol=Object.freeze({__proto__:null,ArcCurve:Nl,CatmullRomCurve3:Er,CubicBezierCurve:Na,CubicBezierCurve3:Fl,EllipseCurve:wr,LineCurve:Fa,LineCurve3:Ul,QuadraticBezierCurve:Ua,QuadraticBezierCurve3:Oa,SplineCurve:ka}),kl=class extends Li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ol[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),n=this.getCurveLengths(),r=0;for(;r<n.length;){if(n[r]>=i){let a=n[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let n=0,r=this.curves;n<r.length;n++){let a=r[n],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(new Ol[n.type]().fromJSON(n))}return this}},Ts=class extends kl{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Fa(this.currentPoint.clone(),new re(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){let r=new Ua(this.currentPoint.clone(),new re(e,t),new re(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,a){let o=new Na(this.currentPoint.clone(),new re(e,t),new re(i,n),new re(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new ka(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,n,r,a),this}absarc(e,t,i,n,r,a){return this.absellipse(e,t,i,i,n,r,a),this}ellipse(e,t,i,n,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,n,r,a,o,l),this}absellipse(e,t,i,n,r,a,o,l){let c=new wr(e,t,i,n,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ni=class extends Ts{constructor(e){super(e),this.uuid=Hi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(new Ts().fromJSON(n))}return this}};function $g(s,e,t=2){let i=e&&e.length,n=i?e[0]*t:s.length,r=wp(s,0,n,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=n0(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,u=l;for(let d=t;d<n;d+=t){let p=s[d],m=s[d+1];p<o&&(o=p),m<l&&(l=m),p>h&&(h=p),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Ba(r,a,t,o,l,c,0),a}function wp(s,e,t,i,n){let r;if(n===p0(s,e,t,i)>0)for(let a=e;a<t;a+=i)r=Pf(a/i|0,s[a],s[a+1],r);else for(let a=t-i;a>=e;a-=i)r=Pf(a/i|0,s[a],s[a+1],r);return r&&Tr(r,r.next)&&(Ga(r),r=r.next),r}function As(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(Tr(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Ga(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ba(s,e,t,i,n,r,a){if(!s)return;!a&&r&&l0(s,i,n,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?e0(s,i,n,r):Qg(s)){e.push(l.i,s.i,c.i),Ga(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=t0(As(s),e),Ba(s,e,t,i,n,r,2)):a===2&&i0(s,e,t,i,n,r):Ba(As(s),e,t,i,n,r,1);break}}}function Qg(s){let e=s.prev,t=s,i=s.next;if(Nt(e,t,i)>=0)return!1;let n=e.x,r=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=Math.min(n,r,a),u=Math.min(o,l,c),d=Math.max(n,r,a),p=Math.max(o,l,c),m=i.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=p&&ma(n,o,r,l,a,c,m.x,m.y)&&Nt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function e0(s,e,t,i){let n=s.prev,r=s,a=s.next;if(Nt(n,r,a)>=0)return!1;let o=n.x,l=r.x,c=a.x,h=n.y,u=r.y,d=a.y,p=Math.min(o,l,c),m=Math.min(h,u,d),v=Math.max(o,l,c),g=Math.max(h,u,d),f=iu(p,m,e,t,i),y=iu(v,g,e,t,i),M=s.prevZ,b=s.nextZ;for(;M&&M.z>=f&&b&&b.z<=y;){if(M.x>=p&&M.x<=v&&M.y>=m&&M.y<=g&&M!==n&&M!==a&&ma(o,h,l,u,c,d,M.x,M.y)&&Nt(M.prev,M,M.next)>=0||(M=M.prevZ,b.x>=p&&b.x<=v&&b.y>=m&&b.y<=g&&b!==n&&b!==a&&ma(o,h,l,u,c,d,b.x,b.y)&&Nt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;M&&M.z>=f;){if(M.x>=p&&M.x<=v&&M.y>=m&&M.y<=g&&M!==n&&M!==a&&ma(o,h,l,u,c,d,M.x,M.y)&&Nt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;b&&b.z<=y;){if(b.x>=p&&b.x<=v&&b.y>=m&&b.y<=g&&b!==n&&b!==a&&ma(o,h,l,u,c,d,b.x,b.y)&&Nt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function t0(s,e){let t=s;do{let i=t.prev,n=t.next.next;!Tr(i,n)&&Tp(i,t,t.next,n)&&za(i,n)&&za(n,i)&&(e.push(i.i,t.i,n.i),Ga(t),Ga(t.next),t=s=n),t=t.next}while(t!==s);return As(t)}function i0(s,e,t,i,n,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&u0(a,o)){let l=Ap(a,o);a=As(a,a.next),l=As(l,l.next),Ba(a,e,t,i,n,r,0),Ba(l,e,t,i,n,r,0);return}o=o.next}a=a.next}while(a!==s)}function n0(s,e,t,i){let n=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*i,l=r<a-1?e[r+1]*i:s.length,c=wp(s,o,l,i,!1);c===c.next&&(c.steiner=!0),n.push(h0(c))}n.sort(s0);for(let r=0;r<n.length;r++)t=r0(n[r],t);return t}function s0(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let i=(s.next.y-s.y)/(s.next.x-s.x),n=(e.next.y-e.y)/(e.next.x-e.x);t=i-n}return t}function r0(s,e){let t=a0(s,e);if(!t)return e;let i=Ap(t,s);return As(i,i.next),As(t,t.next)}function a0(s,e){let t=e,i=s.x,n=s.y,r=-1/0,a;if(Tr(s,t))return t;do{if(Tr(s,t.next))return t.next;if(n<=t.y&&n>=t.next.y&&t.next.y!==t.y){let u=t.x+(n-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===i))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Ep(n<c?i:r,n,l,c,n<c?r:i,n,t.x,t.y)){let u=Math.abs(n-t.y)/(i-t.x);za(t,s)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&o0(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function o0(s,e){return Nt(s.prev,s,e.prev)<0&&Nt(e.next,s,s.next)<0}function l0(s,e,t,i){let n=s;do n.z===0&&(n.z=iu(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,c0(n)}function c0(s){let e,t=1;do{let i=s,n;s=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(n=i,i=i.nextZ,o--):(n=a,a=a.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;i=a}r.nextZ=null,t*=2}while(e>1);return s}function iu(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function h0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Ep(s,e,t,i,n,r,a,o){return(n-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(n-a)*(i-o)}function ma(s,e,t,i,n,r,a,o){return!(s===a&&e===o)&&Ep(s,e,t,i,n,r,a,o)}function u0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!d0(s,e)&&(za(s,e)&&za(e,s)&&f0(s,e)&&(Nt(s.prev,s,e.prev)||Nt(s,e.prev,e))||Tr(s,e)&&Nt(s.prev,s,s.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Tr(s,e){return s.x===e.x&&s.y===e.y}function Tp(s,e,t,i){let n=pl(Nt(s,e,t)),r=pl(Nt(s,e,i)),a=pl(Nt(t,i,s)),o=pl(Nt(t,i,e));return!!(n!==r&&a!==o||n===0&&fl(s,t,e)||r===0&&fl(s,i,e)||a===0&&fl(t,s,i)||o===0&&fl(t,e,i))}function fl(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function pl(s){return s>0?1:s<0?-1:0}function d0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Tp(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function za(s,e){return Nt(s.prev,s,s.next)<0?Nt(s,e,s.next)>=0&&Nt(s,s.prev,e)>=0:Nt(s,e,s.prev)<0||Nt(s,s.next,e)<0}function f0(s,e){let t=s,i=!1,n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function Ap(s,e){let t=nu(s.i,s.x,s.y),i=nu(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Pf(s,e,t,i){let n=nu(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Ga(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function nu(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function p0(s,e,t,i){let n=0;for(let r=e,a=t-i;r<t;r+=i)n+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return n}var su=class{static triangulate(e,t,i=2){return $g(e,t,i)}},pn=class s{static area(e){let t=e.length,i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let i=[],n=[],r=[];If(e),Df(i,e);let a=e.length;t.forEach(If);for(let l=0;l<t.length;l++)n.push(a),a+=t[l].length,Df(i,t[l]);let o=su.triangulate(i,n);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function If(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Df(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Ha=class s extends ot{constructor(e=new Ni([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,n=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new Ze(n,3)),this.setAttribute("uv",new Ze(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,f=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:m0,M,b=!1,_,S,T,x;if(f){M=f.getSpacedPoints(h),b=!0,d=!1;let ee=f.isCatmullRomCurve3?f.closed:!1;_=f.computeFrenetFrames(h,ee),S=new I,T=new I,x=new I}d||(g=0,p=0,m=0,v=0);let w=o.extractPoints(c),A=w.shape,C=w.holes;if(!pn.isClockWise(A)){A=A.reverse();for(let ee=0,oe=C.length;ee<oe;ee++){let le=C[ee];pn.isClockWise(le)&&(C[ee]=le.reverse())}}function N(ee){let le=10000000000000001e-36,ce=ee[0];for(let de=1;de<=ee.length;de++){let Ve=de%ee.length,Oe=ee[Ve],qe=Oe.x-ce.x,Ke=Oe.y-ce.y,F=qe*qe+Ke*Ke,ut=Math.max(Math.abs(Oe.x),Math.abs(Oe.y),Math.abs(ce.x),Math.abs(ce.y)),Qe=le*ut*ut;if(F<=Qe){ee.splice(Ve,1),de--;continue}ce=Oe}}N(A),C.forEach(N);let D=C.length,U=A;for(let ee=0;ee<D;ee++){let oe=C[ee];A=A.concat(oe)}function B(ee,oe,le){return oe||Xe("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(oe,le)}let G=A.length;function ne(ee,oe,le){let ce,de,Ve,Oe=ee.x-oe.x,qe=ee.y-oe.y,Ke=le.x-ee.x,F=le.y-ee.y,ut=Oe*Oe+qe*qe,Qe=Oe*F-qe*Ke;if(Math.abs(Qe)>Number.EPSILON){let P=Math.sqrt(ut),E=Math.sqrt(Ke*Ke+F*F),z=oe.x-qe/P,H=oe.y+Oe/P,Y=le.x-F/E,he=le.y+Ke/E,fe=((Y-z)*F-(he-H)*Ke)/(Oe*F-qe*Ke);ce=z+Oe*fe-ee.x,de=H+qe*fe-ee.y;let Z=ce*ce+de*de;if(Z<=2)return new re(ce,de);Ve=Math.sqrt(Z/2)}else{let P=!1;Oe>Number.EPSILON?Ke>Number.EPSILON&&(P=!0):Oe<-Number.EPSILON?Ke<-Number.EPSILON&&(P=!0):Math.sign(qe)===Math.sign(F)&&(P=!0),P?(ce=-qe,de=Oe,Ve=Math.sqrt(ut)):(ce=Oe,de=qe,Ve=Math.sqrt(ut/2))}return new re(ce/Ve,de/Ve)}let q=[];for(let ee=0,oe=U.length,le=oe-1,ce=ee+1;ee<oe;ee++,le++,ce++)le===oe&&(le=0),ce===oe&&(ce=0),q[ee]=ne(U[ee],U[le],U[ce]);let X=[],J,Ee=q.concat();for(let ee=0,oe=D;ee<oe;ee++){let le=C[ee];J=[];for(let ce=0,de=le.length,Ve=de-1,Oe=ce+1;ce<de;ce++,Ve++,Oe++)Ve===de&&(Ve=0),Oe===de&&(Oe=0),J[ce]=ne(le[ce],le[Ve],le[Oe]);X.push(J),Ee=Ee.concat(J)}let ie;if(g===0)ie=pn.triangulateShape(U,C);else{let ee=[],oe=[];for(let le=0;le<g;le++){let ce=le/g,de=p*Math.cos(ce*Math.PI/2),Ve=m*Math.sin(ce*Math.PI/2)+v;for(let Oe=0,qe=U.length;Oe<qe;Oe++){let Ke=B(U[Oe],q[Oe],Ve);ue(Ke.x,Ke.y,-de),ce===0&&ee.push(Ke)}for(let Oe=0,qe=D;Oe<qe;Oe++){let Ke=C[Oe];J=X[Oe];let F=[];for(let ut=0,Qe=Ke.length;ut<Qe;ut++){let P=B(Ke[ut],J[ut],Ve);ue(P.x,P.y,-de),ce===0&&F.push(P)}ce===0&&oe.push(F)}}ie=pn.triangulateShape(ee,oe)}let ye=ie.length,Te=m+v;for(let ee=0;ee<G;ee++){let oe=d?B(A[ee],Ee[ee],Te):A[ee];b?(T.copy(_.normals[0]).multiplyScalar(oe.x),S.copy(_.binormals[0]).multiplyScalar(oe.y),x.copy(M[0]).add(T).add(S),ue(x.x,x.y,x.z)):ue(oe.x,oe.y,0)}for(let ee=1;ee<=h;ee++)for(let oe=0;oe<G;oe++){let le=d?B(A[oe],Ee[oe],Te):A[oe];b?(T.copy(_.normals[ee]).multiplyScalar(le.x),S.copy(_.binormals[ee]).multiplyScalar(le.y),x.copy(M[ee]).add(T).add(S),ue(x.x,x.y,x.z)):ue(le.x,le.y,u/h*ee)}for(let ee=g-1;ee>=0;ee--){let oe=ee/g,le=p*Math.cos(oe*Math.PI/2),ce=m*Math.sin(oe*Math.PI/2)+v;for(let de=0,Ve=U.length;de<Ve;de++){let Oe=B(U[de],q[de],ce);ue(Oe.x,Oe.y,u+le)}for(let de=0,Ve=C.length;de<Ve;de++){let Oe=C[de];J=X[de];for(let qe=0,Ke=Oe.length;qe<Ke;qe++){let F=B(Oe[qe],J[qe],ce);b?ue(F.x,F.y+M[h-1].y,M[h-1].x+le):ue(F.x,F.y,u+le)}}}ze(),j();function ze(){let ee=n.length/3;if(d){let oe=0,le=G*oe;for(let ce=0;ce<ye;ce++){let de=ie[ce];Ue(de[2]+le,de[1]+le,de[0]+le)}oe=h+g*2,le=G*oe;for(let ce=0;ce<ye;ce++){let de=ie[ce];Ue(de[0]+le,de[1]+le,de[2]+le)}}else{for(let oe=0;oe<ye;oe++){let le=ie[oe];Ue(le[2],le[1],le[0])}for(let oe=0;oe<ye;oe++){let le=ie[oe];Ue(le[0]+G*h,le[1]+G*h,le[2]+G*h)}}i.addGroup(ee,n.length/3-ee,0)}function j(){let ee=n.length/3,oe=0;$(U,oe),oe+=U.length;for(let le=0,ce=C.length;le<ce;le++){let de=C[le];$(de,oe),oe+=de.length}i.addGroup(ee,n.length/3-ee,1)}function $(ee,oe){let le=ee.length;for(;--le>=0;){let ce=le,de=le-1;de<0&&(de=ee.length-1);for(let Ve=0,Oe=h+g*2;Ve<Oe;Ve++){let qe=G*Ve,Ke=G*(Ve+1),F=oe+ce+qe,ut=oe+de+qe,Qe=oe+de+Ke,P=oe+ce+Ke;Se(F,ut,Qe,P)}}}function ue(ee,oe,le){l.push(ee),l.push(oe),l.push(le)}function Ue(ee,oe,le){We(ee),We(oe),We(le);let ce=n.length/3,de=y.generateTopUV(i,n,ce-3,ce-2,ce-1);dt(de[0]),dt(de[1]),dt(de[2])}function Se(ee,oe,le,ce){We(ee),We(oe),We(ce),We(oe),We(le),We(ce);let de=n.length/3,Ve=y.generateSideWallUV(i,n,de-6,de-3,de-2,de-1);dt(Ve[0]),dt(Ve[1]),dt(Ve[3]),dt(Ve[1]),dt(Ve[2]),dt(Ve[3])}function We(ee){n.push(l[ee*3+0]),n.push(l[ee*3+1]),n.push(l[ee*3+2])}function dt(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return g0(t,i,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];i.push(o)}let n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new Ol[n.type]().fromJSON(n)),new s(i,e.options)}},m0={generateTopUV:function(s,e,t,i,n){let r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[n*3],h=e[n*3+1];return[new re(r,a),new re(o,l),new re(c,h)]},generateSideWallUV:function(s,e,t,i,n,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[n*3],p=e[n*3+1],m=e[n*3+2],v=e[r*3],g=e[r*3+1],f=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new re(a,1-l),new re(c,1-u),new re(d,1-m),new re(v,1-f)]:[new re(o,1-l),new re(h,1-u),new re(p,1-m),new re(g,1-f)]}};function g0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){let r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ar=class s extends Ll{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Va=class s extends ot{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,d=t/l,p=[],m=[],v=[],g=[];for(let f=0;f<h;f++){let y=f*d-a;for(let M=0;M<c;M++){let b=M*u-r;m.push(b,-y,0),v.push(0,0,1),g.push(M/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<o;y++){let M=y+c*f,b=y+c*(f+1),_=y+1+c*(f+1),S=y+1+c*f;p.push(M,b,S),p.push(b,_,S)}this.setIndex(p),this.setAttribute("position",new Ze(m,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var sn=class s extends ot{constructor(e=new Ni([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],n=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Ze(n,3)),this.setAttribute("normal",new Ze(r,3)),this.setAttribute("uv",new Ze(a,2));function c(h){let u=n.length/3,d=h.extractPoints(t),p=d.shape,m=d.holes;pn.isClockWise(p)===!1&&(p=p.reverse());for(let g=0,f=m.length;g<f;g++){let y=m[g];pn.isClockWise(y)===!0&&(m[g]=y.reverse())}let v=pn.triangulateShape(p,m);for(let g=0,f=m.length;g<f;g++){let y=m[g];p=p.concat(y)}for(let g=0,f=p.length;g<f;g++){let y=p[g];n.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,f=v.length;g<f;g++){let y=v[g],M=y[0]+u,b=y[1]+u,_=y[2]+u;i.push(M,b,_),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return b0(t,e)}static fromJSON(e,t){let i=[];for(let n=0,r=e.shapes.length;n<r;n++){let a=t[e.shapes[n]];i.push(a)}return new s(i,e.curveSegments)}};function b0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,i=s.length;t<i;t++){let n=s[t];e.shapes.push(n.uuid)}else e.shapes.push(s.uuid);return e}var Rs=class s extends ot{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new I,d=new I,p=[],m=[],v=[],g=[];for(let f=0;f<=i;f++){let y=[],M=f/i,b=a+M*o,_=e*Math.cos(b),S=Math.sqrt(e*e-_*_),T=0;f===0&&a===0?T=.5/t:f===i&&l===Math.PI&&(T=-.5/t);for(let x=0;x<=t;x++){let w=x/t,A=n+w*r;u.x=-S*Math.cos(A),u.y=_,u.z=S*Math.sin(A),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(w+T,1-M),y.push(c++)}h.push(y)}for(let f=0;f<i;f++)for(let y=0;y<t;y++){let M=h[f][y+1],b=h[f][y],_=h[f+1][y],S=h[f+1][y+1];(f!==0||a>0)&&p.push(M,b,S),(f!==i-1||l<Math.PI)&&p.push(b,_,S)}this.setIndex(p),this.setAttribute("position",new Ze(m,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var vi=class s extends ot{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],u=[],d=new I,p=new I,m=new I;for(let v=0;v<=i;v++){let g=a+v/i*o;for(let f=0;f<=n;f++){let y=f/n*r;p.x=(e+t*Math.cos(g))*Math.cos(y),p.y=(e+t*Math.cos(g))*Math.sin(y),p.z=t*Math.sin(g),c.push(p.x,p.y,p.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),m.subVectors(p,d).normalize(),h.push(m.x,m.y,m.z),u.push(f/n),u.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=n;g++){let f=(n+1)*v+g-1,y=(n+1)*(v-1)+g-1,M=(n+1)*(v-1)+g,b=(n+1)*v+g;l.push(f,y,b),l.push(y,M,b)}this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Wa=class s extends ot{constructor(e=new Oa(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new I,l=new I,c=new re,h=new I,u=[],d=[],p=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(d,3)),this.setAttribute("uv",new Ze(p,2));function v(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),y(),f()}function g(M){h=e.getPointAt(M/t,h);let b=a.normals[M],_=a.binormals[M];for(let S=0;S<=n;S++){let T=S/n*Math.PI*2,x=Math.sin(T),w=-Math.cos(T);l.x=w*b.x+x*_.x,l.y=w*b.y+x*_.y,l.z=w*b.z+x*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function f(){for(let M=1;M<=t;M++)for(let b=1;b<=n;b++){let _=(n+1)*(M-1)+(b-1),S=(n+1)*M+(b-1),T=(n+1)*M+b,x=(n+1)*(M-1)+b;m.push(_,S,x),m.push(S,T,x)}}function y(){for(let M=0;M<=t;M++)for(let b=0;b<=n;b++)c.x=M/t,c.y=b/n,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Ol[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function ks(s){let e={};for(let t in s){e[t]={};for(let i in s[t]){let n=s[t][i];if(Lf(n))n.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Lf(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();e[t][i]=r}else e[t][i]=n.slice();else e[t][i]=n}}return e}function fi(s){let e={};for(let t=0;t<s.length;t++){let i=ks(s[t]);for(let n in i)e[n]=i[n]}return e}function Lf(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function x0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Iu(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}var Ei={clone:ks,merge:fi},v0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,y0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Dt=class extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=v0,this.fragmentShader=y0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=x0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Be().setHex(n.value);break;case"v2":this.uniforms[i].value=new re().fromArray(n.value);break;case"v3":this.uniforms[i].value=new I().fromArray(n.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(n.value);break;case"m3":this.uniforms[i].value=new $e().fromArray(n.value);break;case"m4":this.uniforms[i].value=new ke().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Rr=class extends Dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Kt=class extends bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xo,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Si=class extends Kt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var qa=class extends bi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xo,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};var Bl=class extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},zl=class extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ss(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function vl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function _0(s){function e(n,r){return s[n]-s[r]}let t=s.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Nf(s,e,t){let i=s.length,n=new s.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let l=0;l!==e;++l)n[a++]=s[o+l]}return n}function M0(s,e,t,i){let n=1,r=s[0];for(;r!==void 0&&r[i]===void 0;)r=s[n++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[n++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[n++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=s[n++];while(r!==void 0)}var Mn=class{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=t[++i],e<n)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let a=0;a!==n;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Gl=class extends Mn{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$h,endingEnd:$h}}intervalChanged_(e,t,i){let n=this.parameterPositions,r=e-2,a=e+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case Qh:r=e,o=2*t-i;break;case eu:r=n.length-2,o=t+n[r]-n[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Qh:a=e,l=2*i-t;break;case eu:a=1,l=i+n[1]-n[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,m=(i-t)/(n-t),v=m*m,g=v*m,f=-d*g+2*d*v-d*m,y=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,M=(-1-p)*g+(1.5+p)*v+.5*m,b=p*g-p*v;for(let _=0;_!==o;++_)r[_]=f*a[h+_]+y*a[c+_]+M*a[l+_]+b*a[u+_];return r}},Hl=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},Vl=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}},Wl=class extends Mn{interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(i-t)/(n-t),v=1-m;for(let g=0;g!==o;++g)r[g]=a[c+g]*v+a[l+g]*m;return r}let d=o*2,p=e-1;for(let m=0;m!==o;++m){let v=a[c+m],g=a[l+m],f=p*d+m*2,y=u[f],M=u[f+1],b=e*d+m*2,_=h[b],S=h[b+1],T=w0(i,t,y,_,n);r[m]=Rp(T,v,M,S,g)}return r}};function Rp(s,e,t,i,n){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*i+s*s*s*n}function S0(s,e,t,i,n){let r=1-s;return 3*r*r*(t-e)+6*r*s*(i-t)+3*s*s*(n-i)}function w0(s,e,t,i,n){let r=(s-e)/(n-e);for(let a=0;a<8;a++){let o=Rp(r,e,t,i,n)-s;if(Math.abs(o)<1e-10)break;let l=S0(r,e,t,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var wi=class{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ss(t,this.TimeBufferType),this.values=ss(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ss(e.times,Array),values:ss(e.values,Array)};let n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n),vl(e.settings)&&(i.settings={inTangents:ss(e.settings.inTangents,Array),outTangents:ss(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Hl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Gl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Wl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ms:t=this.InterpolantFactoryMethodDiscrete;break;case Ss:t=this.InterpolantFactoryMethodLinear;break;case bl:t=this.InterpolantFactoryMethodSmooth;break;case Zh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Fe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ms;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return bl;case this.InterpolantFactoryMethodBezier:return Zh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e;vl(this.settings)&&(Ff(this.settings.inTangents,e),Ff(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Xe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Xe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Xe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Xe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(n!==void 0&&og(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Xe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===bl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{let u=o*i,d=u-i,p=u+i;for(let m=0;m!==i;++m){let v=t[u+m];if(v!==t[d+m]||v!==t[p+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*i,d=a*i;for(let p=0;p!==i;++p)t[d+p]=t[u+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,vl(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Ff(s,e){for(let t=0,i=s.length;t!==i;t+=2)s[t]*=e}wi.prototype.ValueTypeName="";wi.prototype.TimeBufferType=Float32Array;wi.prototype.ValueBufferType=Float32Array;wi.prototype.DefaultInterpolation=Ss;var Gn=class extends wi{constructor(e,t,i){super(e,t,i)}};Gn.prototype.ValueTypeName="bool";Gn.prototype.ValueBufferType=Array;Gn.prototype.DefaultInterpolation=Ms;Gn.prototype.InterpolantFactoryMethodLinear=void 0;Gn.prototype.InterpolantFactoryMethodSmooth=void 0;var Xa=class extends wi{constructor(e,t,i,n){super(e,t,i,n)}};Xa.prototype.ValueTypeName="color";var Hn=class extends wi{constructor(e,t,i,n){super(e,t,i,n)}};Hn.prototype.ValueTypeName="number";var ql=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t),c=e*o;for(let h=c+o;c!==h;c+=4)Di.slerpFlat(r,0,a,c-o,a,c,l);return r}},Vn=class extends wi{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new ql(this.times,this.values,this.getValueSize(),e)}};Vn.prototype.ValueTypeName="quaternion";Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var Wn=class extends wi{constructor(e,t,i){super(e,t,i)}};Wn.prototype.ValueTypeName="string";Wn.prototype.ValueBufferType=Array;Wn.prototype.DefaultInterpolation=Ms;Wn.prototype.InterpolantFactoryMethodLinear=void 0;Wn.prototype.InterpolantFactoryMethodSmooth=void 0;var os=class extends wi{constructor(e,t,i,n){super(e,t,i,n)}};os.prototype.ValueTypeName="vector";var ja=class{constructor(e="",t=-1,i=[],n=cp){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=Hi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,n=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(T0(i[a]).scale(n));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(wi.toJSON(i[r]));return n}static CreateFromMorphTargetSequence(e,t,i,n){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=_0(l);l=Nf(l,1,h),c=Nf(c,1,h),!n&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Hn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let n={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=n[u];d||(n[u]=d=[]),d.push(c)}}let a=[];for(let o in n)a.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return a}resetDuration(){let e=this.tracks,t=0;for(let i=0,n=e.length;i!==n;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function E0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hn;case"vector":case"vector2":case"vector3":case"vector4":return os;case"color":return Xa;case"quaternion":return Vn;case"bool":case"boolean":return Gn;case"string":return Wn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function T0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=E0(s.type);if(s.times===void 0){let i=[],n=[];M0(s.keys,i,n,"value"),s.times=i,s.values=n}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),vl(s.settings)&&(t.settings={inTangents:ss(s.settings.inTangents,Float32Array),outTangents:ss(s.settings.outTangents,Float32Array)}),t}var mn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Uf(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Uf(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Uf(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Xl=class{constructor(e,t,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],m=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Cp=new Xl,Sn=class{constructor(e){this.manager=e!==void 0?e:Cp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Sn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Un={},ru=class extends Error{constructor(e,t){super(e),this.response=t}},Cr=class extends Sn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=mn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Un[e]!==void 0){Un[e].push({onLoad:t,onProgress:i,onError:n});return}Un[e]=[],Un[e].push({onLoad:t,onProgress:i,onError:n});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Fe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Un[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,m=p!==0,v=0,g=new ReadableStream({start(f){y();function y(){u.read().then(({done:M,value:b})=>{if(M)f.close();else{v+=b.byteLength;let _=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:p});for(let S=0,T=h.length;S<T;S++){let x=h[S];x.onProgress&&x.onProgress(_)}f.enqueue(b),y()}},M=>{f.error(M)})}}});return new Response(g)}else throw new ru(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(m=>p.decode(m))}}}).then(c=>{mn.add(`file:${e}`,c);let h=Un[e];delete Un[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{let h=Un[e];if(h===void 0)throw this.manager.itemError(e),c;delete Un[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var or=new WeakMap,jl=class extends Sn{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=mn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=or.get(a);u===void 0&&(u=[],or.set(a,u)),u.push({onLoad:t,onError:n})}return a}let o=pr("img");function l(){h(),t&&t(this);let u=or.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}or.delete(this),r.manager.itemEnd(e)}function c(u){h(),n&&n(u),mn.remove(`image:${e}`);let d=or.get(this)||[];for(let p=0;p<d.length;p++){let m=d[p];m.onError&&m.onError(u)}or.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),mn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Ka=class extends Sn{constructor(e){super(e)}load(e,t,i,n){let r=new Xt,a=new jl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}},ls=class extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ya=class extends ls{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Kh=new ke,Of=new I,kf=new I,Pr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=di,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vn,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Of.setFromMatrixPosition(e.matrixWorld),t.position.copy(Of),kf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(kf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){Kh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Kh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;e.coordinateSystem===fr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Kh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ml=new I,gl=new Di,fn=new I,Ja=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=en,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ml,gl,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ml,gl,fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ml,gl,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ml,gl,fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ns=new I,Bf=new re,zf=new re,qt=class extends Ja{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ga*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(ga*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ns.x,ns.y).multiplyScalar(-e/ns.z),ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ns.x,ns.y).multiplyScalar(-e/ns.z)}getViewSize(e,t){return this.getViewBounds(e,Bf,zf),t.subVectors(zf,Bf)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ga*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},au=class extends Pr{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=ws*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||n!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Za=class extends ls{constructor(e,t,i=0,n=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new au}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},ou=class extends Pr{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Cs=class extends ls{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new ou}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},wn=class extends Ja{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},lu=class extends Pr{constructor(){super(new wn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ps=class extends ls{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new lu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},$a=class extends ls{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var qn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Yh=new WeakMap,Qa=class extends Sn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Fe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Fe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=mn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Yh.has(a)===!0?(n&&n(Yh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return mn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){n&&n(c),Yh.set(l,c),mn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});mn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var lr=-90,cr=1,Ir=class extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new qt(lr,cr,e,t);n.layers=this.layers,this.add(n);let r=new qt(lr,cr,e,t);r.layers=this.layers,this.add(r);let a=new qt(lr,cr,e,t);a.layers=this.layers,this.add(a);let o=new qt(lr,cr,e,t);o.layers=this.layers,this.add(o);let l=new qt(lr,cr,e,t);l.layers=this.layers,this.add(l);let c=new qt(lr,cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===en)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Kl=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},eo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=A0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function A0(){this._document.hidden===!1&&this.reset()}var Du="\\[\\]\\.:\\/",R0=new RegExp("["+Du+"]","g"),Lu="[^"+Du+"]",C0="[^"+Du.replace("\\.","")+"]",P0=/((?:WC+[\/:])*)/.source.replace("WC",Lu),I0=/(WCOD+)?/.source.replace("WCOD",C0),D0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lu),L0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lu),N0=new RegExp("^"+P0+I0+D0+L0+"$"),F0=["material","materials","bones","map"],cu=class{constructor(e,t,i){let n=i||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},wt=class s{constructor(e,t,i){this.path=t,this.parsedPath=i||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,i):new s(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(R0,"")}static parseTrackName(e){let t=N0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);F0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,n=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Fe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Xe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Xe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[n];if(a===void 0){let c=t.nodeName;Xe("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wt.Composite=cu;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aM=new Float32Array(1);var Gf=new ke,Is=class{constructor(e,t,i=0,n=1/0){this.ray=new as(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gf),this}intersectObject(e,t=!0,i=[]){return hu(e,this,i,t),i.sort(Hf),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)hu(e[n],this,i,t);return i.sort(Hf),i}};function Hf(s,e){return s.distance-e.distance}function hu(s,e,t,i){let n=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)hu(r[a],e,t,!0)}}var uu=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=n,this}};function Nu(s,e,t,i){let n=U0(i);switch(t){case wu:return s*e;case ic:return s*e/n.components*n.byteLength;case nc:return s*e/n.components*n.byteLength;case us:return s*e*2/n.components*n.byteLength;case sc:return s*e*2/n.components*n.byteLength;case Eu:return s*e*3/n.components*n.byteLength;case yi:return s*e*4/n.components*n.byteLength;case rc:return s*e*4/n.components*n.byteLength;case ho:case uo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case fo:case po:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case oc:case cc:return Math.max(s,16)*Math.max(e,8)/4;case ac:case lc:return Math.max(s,8)*Math.max(e,8)/2;case hc:case uc:case fc:case pc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case dc:case mo:case mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case xc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case vc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case yc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case _c:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case wc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Rc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Cc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Pc:case Ic:case Dc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Lc:case Nc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case go:case Fc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function U0(s){switch(s){case di:case yu:return{byteLength:1,components:1};case Fr:case _u:case Yt:return{byteLength:2,components:1};case ec:case tc:return{byteLength:2,components:4};case on:case Ql:case Fi:return{byteLength:4,components:1};case Mu:case Su:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Zp(){let s=null,e=!1,t=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function k0(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<u.length;p++){let m=u[d],v=u[p];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,m=u.length;p<m;p++){let v=u[p];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var B0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,z0=`#ifdef USE_ALPHAHASH
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
#endif`,G0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,H0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,V0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,W0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,q0=`#ifdef USE_AOMAP
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
#endif`,X0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,j0=`#ifdef USE_BATCHING
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
#endif`,K0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Y0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Z0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$0=`#ifdef USE_IRIDESCENCE
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
#endif`,Q0=`#ifdef USE_BUMPMAP
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
#endif`,eb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ib=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ab=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ob=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,lb=`#define PI 3.141592653589793
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
} // validated`,cb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hb=`vec3 transformedNormal = objectNormal;
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
#endif`,ub=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,db=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mb="gl_FragColor = linearToOutputTexel( gl_FragColor );",gb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bb=`#ifdef USE_ENVMAP
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
#endif`,xb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vb=`#ifdef USE_ENVMAP
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
#endif`,yb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_b=`#ifdef USE_ENVMAP
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
#endif`,Mb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tb=`#ifdef USE_GRADIENTMAP
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
}`,Ab=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ib=`#ifdef USE_ENVMAP
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
#endif`,Db=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ub=`PhysicalMaterial material;
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
#endif`,Ob=`uniform sampler2D dfgLUT;
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
}`,kb=`
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
#endif`,Bb=`#if defined( RE_IndirectDiffuse )
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
#endif`,zb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Hb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yb=`#if defined( USE_POINTS_UV )
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
#endif`,Jb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$b=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ex=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tx=`#ifdef USE_MORPHTARGETS
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
#endif`,ix=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ox=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,lx=`#ifdef USE_NORMALMAP
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
#endif`,cx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ux=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,px=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wx=`float getShadowMask() {
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
}`,Ex=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tx=`#ifdef USE_SKINNING
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
#endif`,Ax=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rx=`#ifdef USE_SKINNING
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
#endif`,Cx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Px=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ix=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lx=`#ifdef USE_TRANSMISSION
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
#endif`,Nx=`#ifdef USE_TRANSMISSION
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zx=`uniform sampler2D t2D;
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`#include <common>
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
}`,Xx=`#if DEPTH_PACKING == 3200
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
}`,jx=`#define DISTANCE
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
}`,Kx=`#define DISTANCE
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
}`,Yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`uniform float scale;
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
}`,$x=`uniform vec3 diffuse;
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
}`,Qx=`#include <common>
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
}`,ev=`uniform vec3 diffuse;
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
}`,tv=`#define LAMBERT
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
}`,iv=`#define LAMBERT
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
}`,nv=`#define MATCAP
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
}`,sv=`#define MATCAP
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
}`,rv=`#define NORMAL
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
}`,av=`#define NORMAL
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
}`,ov=`#define PHONG
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
}`,lv=`#define PHONG
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
}`,cv=`#define STANDARD
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
}`,hv=`#define STANDARD
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
}`,uv=`#define TOON
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
}`,dv=`#define TOON
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
}`,fv=`uniform float size;
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
}`,pv=`uniform vec3 diffuse;
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
}`,mv=`#include <common>
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
}`,gv=`uniform vec3 color;
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
}`,bv=`uniform float rotation;
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
}`,xv=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:B0,alphahash_pars_fragment:z0,alphamap_fragment:G0,alphamap_pars_fragment:H0,alphatest_fragment:V0,alphatest_pars_fragment:W0,aomap_fragment:q0,aomap_pars_fragment:X0,batching_pars_vertex:j0,batching_vertex:K0,begin_vertex:Y0,beginnormal_vertex:J0,bsdfs:Z0,iridescence_fragment:$0,bumpmap_pars_fragment:Q0,clipping_planes_fragment:eb,clipping_planes_pars_fragment:tb,clipping_planes_pars_vertex:ib,clipping_planes_vertex:nb,color_fragment:sb,color_pars_fragment:rb,color_pars_vertex:ab,color_vertex:ob,common:lb,cube_uv_reflection_fragment:cb,defaultnormal_vertex:hb,displacementmap_pars_vertex:ub,displacementmap_vertex:db,emissivemap_fragment:fb,emissivemap_pars_fragment:pb,colorspace_fragment:mb,colorspace_pars_fragment:gb,envmap_fragment:bb,envmap_common_pars_fragment:xb,envmap_pars_fragment:vb,envmap_pars_vertex:yb,envmap_physical_pars_fragment:Ib,envmap_vertex:_b,fog_vertex:Mb,fog_pars_vertex:Sb,fog_fragment:wb,fog_pars_fragment:Eb,gradientmap_pars_fragment:Tb,lightmap_pars_fragment:Ab,lights_lambert_fragment:Rb,lights_lambert_pars_fragment:Cb,lights_pars_begin:Pb,lights_toon_fragment:Db,lights_toon_pars_fragment:Lb,lights_phong_fragment:Nb,lights_phong_pars_fragment:Fb,lights_physical_fragment:Ub,lights_physical_pars_fragment:Ob,lights_fragment_begin:kb,lights_fragment_maps:Bb,lights_fragment_end:zb,lightprobes_pars_fragment:Gb,logdepthbuf_fragment:Hb,logdepthbuf_pars_fragment:Vb,logdepthbuf_pars_vertex:Wb,logdepthbuf_vertex:qb,map_fragment:Xb,map_pars_fragment:jb,map_particle_fragment:Kb,map_particle_pars_fragment:Yb,metalnessmap_fragment:Jb,metalnessmap_pars_fragment:Zb,morphinstance_vertex:$b,morphcolor_vertex:Qb,morphnormal_vertex:ex,morphtarget_pars_vertex:tx,morphtarget_vertex:ix,normal_fragment_begin:nx,normal_fragment_maps:sx,normal_pars_fragment:rx,normal_pars_vertex:ax,normal_vertex:ox,normalmap_pars_fragment:lx,clearcoat_normal_fragment_begin:cx,clearcoat_normal_fragment_maps:hx,clearcoat_pars_fragment:ux,iridescence_pars_fragment:dx,opaque_fragment:fx,packing:px,premultiplied_alpha_fragment:mx,project_vertex:gx,dithering_fragment:bx,dithering_pars_fragment:xx,roughnessmap_fragment:vx,roughnessmap_pars_fragment:yx,shadowmap_pars_fragment:_x,shadowmap_pars_vertex:Mx,shadowmap_vertex:Sx,shadowmask_pars_fragment:wx,skinbase_vertex:Ex,skinning_pars_vertex:Tx,skinning_vertex:Ax,skinnormal_vertex:Rx,specularmap_fragment:Cx,specularmap_pars_fragment:Px,tonemapping_fragment:Ix,tonemapping_pars_fragment:Dx,transmission_fragment:Lx,transmission_pars_fragment:Nx,uv_pars_fragment:Fx,uv_pars_vertex:Ux,uv_vertex:Ox,worldpos_vertex:kx,background_vert:Bx,background_frag:zx,backgroundCube_vert:Gx,backgroundCube_frag:Hx,cube_vert:Vx,cube_frag:Wx,depth_vert:qx,depth_frag:Xx,distance_vert:jx,distance_frag:Kx,equirect_vert:Yx,equirect_frag:Jx,linedashed_vert:Zx,linedashed_frag:$x,meshbasic_vert:Qx,meshbasic_frag:ev,meshlambert_vert:tv,meshlambert_frag:iv,meshmatcap_vert:nv,meshmatcap_frag:sv,meshnormal_vert:rv,meshnormal_frag:av,meshphong_vert:ov,meshphong_frag:lv,meshphysical_vert:cv,meshphysical_frag:hv,meshtoon_vert:uv,meshtoon_frag:dv,points_vert:fv,points_frag:pv,shadow_vert:mv,shadow_frag:gv,sprite_vert:bv,sprite_frag:xv},ve={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},An={basic:{uniforms:fi([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:fi([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:fi([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:fi([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:fi([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Be(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:fi([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:fi([ve.points,ve.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:fi([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:fi([ve.common,ve.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:fi([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:fi([ve.sprite,ve.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:fi([ve.common,ve.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:fi([ve.lights,ve.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};An.physical={uniforms:fi([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var kc={r:0,b:0,g:0},vv=new ke,$p=new $e;$p.set(-1,0,0,0,1,0,0,0,1);function yv(s,e,t,i,n,r){let a=new Be(0),o=n===!0?0:1,l,c,h=null,u=0,d=null;function p(y){let M=y.isScene===!0?y.background:null;if(M&&M.isTexture){let b=y.backgroundBlurriness>0;M=e.get(M,b)}return M}function m(y){let M=!1,b=p(y);b===null?g(a,o):b&&b.isColor&&(g(b,1),M=!0);let _=s.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(y,M){let b=p(M);b&&(b.isCubeTexture||b.mapping===co)?(c===void 0&&(c=new Je(new gt(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ks(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(vv.makeRotationFromEuler(M.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply($p),c.material.toneMapped=et.getTransfer(b.colorSpace)!==mt,(h!==b||u!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Je(new Va(2,2),new Dt({name:"BackgroundMaterial",uniforms:ks(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=et.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,M){y.getRGB(kc,Iu(s)),t.buffers.color.setClear(kc.r,kc.g,kc.b,M,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:m,addToRenderList:v,dispose:f}}function _v(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=d(null),r=n,a=!1;function o(C,L,N,D,U){let B=!1,G=u(C,D,N,L);r!==G&&(r=G,c(r.object)),B=p(C,D,N,U),B&&m(C,D,N,U),U!==null&&e.update(U,s.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,b(C,L,N,D),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return s.createVertexArray()}function c(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function u(C,L,N,D){let U=D.wireframe===!0,B=i[L.id];B===void 0&&(B={},i[L.id]=B);let G=C.isInstancedMesh===!0?C.id:0,ne=B[G];ne===void 0&&(ne={},B[G]=ne);let q=ne[N.id];q===void 0&&(q={},ne[N.id]=q);let X=q[U];return X===void 0&&(X=d(l()),q[U]=X),X}function d(C){let L=[],N=[],D=[];for(let U=0;U<t;U++)L[U]=0,N[U]=0,D[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:D,object:C,attributes:{},index:null}}function p(C,L,N,D){let U=r.attributes,B=L.attributes,G=0,ne=N.getAttributes();for(let q in ne)if(ne[q].location>=0){let J=U[q],Ee=B[q];if(Ee===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(Ee=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(Ee=C.instanceColor)),J===void 0||J.attribute!==Ee||Ee&&J.data!==Ee.data)return!0;G++}return r.attributesNum!==G||r.index!==D}function m(C,L,N,D){let U={},B=L.attributes,G=0,ne=N.getAttributes();for(let q in ne)if(ne[q].location>=0){let J=B[q];J===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(J=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(J=C.instanceColor));let Ee={};Ee.attribute=J,J&&J.data&&(Ee.data=J.data),U[q]=Ee,G++}r.attributes=U,r.attributesNum=G,r.index=D}function v(){let C=r.newAttributes;for(let L=0,N=C.length;L<N;L++)C[L]=0}function g(C){f(C,0)}function f(C,L){let N=r.newAttributes,D=r.enabledAttributes,U=r.attributeDivisors;N[C]=1,D[C]===0&&(s.enableVertexAttribArray(C),D[C]=1),U[C]!==L&&(s.vertexAttribDivisor(C,L),U[C]=L)}function y(){let C=r.newAttributes,L=r.enabledAttributes;for(let N=0,D=L.length;N<D;N++)L[N]!==C[N]&&(s.disableVertexAttribArray(N),L[N]=0)}function M(C,L,N,D,U,B,G){G===!0?s.vertexAttribIPointer(C,L,N,U,B):s.vertexAttribPointer(C,L,N,D,U,B)}function b(C,L,N,D){v();let U=D.attributes,B=N.getAttributes(),G=L.defaultAttributeValues;for(let ne in B){let q=B[ne];if(q.location>=0){let X=U[ne];if(X===void 0&&(ne==="instanceMatrix"&&C.instanceMatrix&&(X=C.instanceMatrix),ne==="instanceColor"&&C.instanceColor&&(X=C.instanceColor)),X!==void 0){let J=X.normalized,Ee=X.itemSize,ie=e.get(X);if(ie===void 0)continue;let ye=ie.buffer,Te=ie.type,ze=ie.bytesPerElement,j=Te===s.INT||Te===s.UNSIGNED_INT||X.gpuType===Ql;if(X.isInterleavedBufferAttribute){let $=X.data,ue=$.stride,Ue=X.offset;if($.isInstancedInterleavedBuffer){for(let Se=0;Se<q.locationSize;Se++)f(q.location+Se,$.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Se=0;Se<q.locationSize;Se++)g(q.location+Se);s.bindBuffer(s.ARRAY_BUFFER,ye);for(let Se=0;Se<q.locationSize;Se++)M(q.location+Se,Ee/q.locationSize,Te,J,ue*ze,(Ue+Ee/q.locationSize*Se)*ze,j)}else{if(X.isInstancedBufferAttribute){for(let $=0;$<q.locationSize;$++)f(q.location+$,X.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let $=0;$<q.locationSize;$++)g(q.location+$);s.bindBuffer(s.ARRAY_BUFFER,ye);for(let $=0;$<q.locationSize;$++)M(q.location+$,Ee/q.locationSize,Te,J,Ee*ze,Ee/q.locationSize*$*ze,j)}}else if(G!==void 0){let J=G[ne];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(q.location,J);break;case 3:s.vertexAttrib3fv(q.location,J);break;case 4:s.vertexAttrib4fv(q.location,J);break;default:s.vertexAttrib1fv(q.location,J)}}}}y()}function _(){w();for(let C in i){let L=i[C];for(let N in L){let D=L[N];for(let U in D){let B=D[U];for(let G in B)h(B[G].object),delete B[G];delete D[U]}}delete i[C]}}function S(C){if(i[C.id]===void 0)return;let L=i[C.id];for(let N in L){let D=L[N];for(let U in D){let B=D[U];for(let G in B)h(B[G].object),delete B[G];delete D[U]}}delete i[C.id]}function T(C){for(let L in i){let N=i[L];for(let D in N){let U=N[D];if(U[C.id]===void 0)continue;let B=U[C.id];for(let G in B)h(B[G].object),delete B[G];delete U[C.id]}}}function x(C){for(let L in i){let N=i[L],D=C.isInstancedMesh===!0?C.id:0,U=N[D];if(U!==void 0){for(let B in U){let G=U[B];for(let ne in G)h(G[ne].object),delete G[ne];delete U[B]}delete N[D],Object.keys(N).length===0&&delete i[L]}}}function w(){A(),a=!0,r!==n&&(r=n,c(r.object))}function A(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:w,resetDefaultState:A,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function Mv(s,e,t){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];t.update(d,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Sv(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(T){return!(T!==yi&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let x=T===Yt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==di&&T!==Fi&&!x&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Fe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:b,maxSamples:_,samples:S}}function wv(s){let e=this,t=null,i=0,n=!1,r=!1,a=new $i,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||n;return n=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,f=s.get(u);if(!n||m===null||m.length===0||r&&!g)r?h(null):c();else{let y=r?0:i,M=y*4,b=f.clippingState||null;l.value=b,b=h(m,d,M,p);for(let _=0;_!==M;++_)b[_]=t[_];f.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,p,m){let v=u!==null?u.length:0,g=null;if(v!==0){if(g=l.value,m!==!0||g===null){let f=p+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<f)&&(g=new Float32Array(f));for(let M=0,b=p;M!==v;++M,b+=4)a.copy(u[M]).applyMatrix4(y,o),a.normal.toArray(g,b),g[b+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var kr=4,Ev=6,Tv=20,Av=256,vo=new wn,Pp=new Be,Fu=null,Uu=0,Ou=0,ku=!1,Rv=new I,Bs=new I,zr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){let{size:a=256,position:o=Rv}=r;Fu=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Ou=this._renderer.getActiveMipmapLevel(),ku=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,n,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fu,Uu,Ou),this._renderer.xr.enabled=ku,e.scissorTest=!1,Or(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cs||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fu=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Ou=this._renderer.getActiveMipmapLevel(),ku=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Yt,format:yi,colorSpace:gi,depthBuffer:!1},n=Ip(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ip(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Cv(r)),this._blurMaterial=Iv(r,e,t),this._ggxMaterial=Pv(r,e,t)}return n}_compileMaterial(e){let t=new Je(new ot,e);this._renderer.compile(t,vo)}_sceneToCubeUV(e,t,i,n,r){let l=new qt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Pp),u.toneMapping=rn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Je(new gt,new xi({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,f=!1,y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,f=!0):(g.color.copy(Pp),f=!0);for(let M=0;M<6;M++){let b=M%3;b===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):b===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));let _=this._cubeSize;Or(n,b*_,M>2?_:0,_,_),u.setRenderTarget(n),f&&u.render(v,l),u.render(e,l)}u.toneMapping=p,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===cs||e.mapping===Fs;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dp());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Or(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,vo)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,p=u*d,{_lodMax:m}=this,v=this._sizeLods[i],g=3*v*(i>m-kr?i-m+kr:0),f=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=m-t,Or(r,g,f,3*v,2*v),n.setRenderTarget(r),n.render(o,vo),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,Or(e,g,f,3*v,2*v),n.setRenderTarget(e),n.render(o,vo)}_blur(e,t,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,n,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],u=3*h*(n>this._lodMax-kr?n-this._lodMax+kr:0),d=4*(this._cubeSize-h);Or(t,u,d,3*h,2*h),a.setRenderTarget(t),a.render(l,vo)}};function Cv(s){let e=[],t=[],i=s,n=s-kr+1+Ev;for(let r=0;r<n;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,p=3,m=new Float32Array(p*d*u),v=new Float32Array(p*d*u);for(let f=0;f<u;f++){let y=f%3*2/3-1,M=f>2?0:-1,b=[y,M,0,y+2/3,M,0,y+2/3,M+1,0,y,M,0,y+2/3,M+1,0,y,M+1,0];m.set(b,p*d*f);for(let _=0;_<d;_++){let S=h[_*2]*2-1,T=h[_*2+1]*2-1;f===0?Bs.set(1,T,S):f===1?Bs.set(-S,1,-T):f===2?Bs.set(-S,T,1):f===3?Bs.set(-1,T,-S):f===4?Bs.set(-S,-1,T):Bs.set(S,T,-1),Bs.toArray(v,(f*d+_)*p)}}let g=new ot;g.setAttribute("position",new Mt(m,p)),g.setAttribute("outputDirection",new Mt(v,p)),t.push(new Je(g,null)),i>kr&&i--}return{lodMeshes:t,sizeLods:e}}function Ip(s,e,t){let i=new Bt(s,e,t);return i.texture.mapping=co,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Or(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function Pv(s,e,t){return new Dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Av,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Iv(s,e,t){return new Dt({name:"SphericalGaussianBlur",defines:{SAMPLES:Tv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Gc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Dp(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Lp(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Gc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Gr=class extends Bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new Ia(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new gt(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:si,blending:zt});r.uniforms.tEquirect.value=t;let a=new Je(n,r),o=t.minFilter;return t.minFilter===an&&(t.minFilter=kt),new Ir(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}};function Dv(s){let e=new WeakMap,t=new WeakMap,i=null;function n(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===Jl||p===Zl)if(e.has(d)){let m=e.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let v=new Gr(m.height);return v.fromEquirectangularTexture(s,d),e.set(d,v),d.addEventListener("dispose",c),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let p=d.mapping,m=p===Jl||p===Zl,v=p===cs||p===Fs;if(m||v){let g=t.get(d),f=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return i===null&&(i=new zr(s)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let y=d.image;return m&&y&&y.height>0||v&&y&&l(y)?(i===null&&(i=new zr(s)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,p){return p===Jl?d.mapping=cs:p===Zl&&(d.mapping=Fs),d}function l(d){let p=0,m=6;for(let v=0;v<m;v++)d[v]!==void 0&&p++;return p===m}function c(d){let p=d.target;p.removeEventListener("dispose",c);let m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function Lv(s){let e={};function t(i){if(e[i]!==void 0)return e[i];let n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let n=t(i);return n===null&&_s("WebGLRenderer: "+i+" extension not supported."),n}}}function Nv(s,e,t,i){let n={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete n[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let p in d)e.update(d[p],s.ARRAY_BUFFER)}function c(u){let d=[],p=u.index,m=u.attributes.position,v=0;if(m===void 0)return;if(p!==null){let y=p.array;v=p.version;for(let M=0,b=y.length;M<b;M+=3){let _=y[M+0],S=y[M+1],T=y[M+2];d.push(_,S,S,T,T,_)}}else{let y=m.array;v=m.version;for(let M=0,b=y.length/3-1;M<b;M+=3){let _=M+0,S=M+1,T=M+2;d.push(_,S,S,T,T,_)}}let g=new(m.count>=65535?wa:Sa)(d,1);g.version=v;let f=r.get(u);f&&e.remove(f),r.set(u,g)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Fv(s,e,t){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(i,d,r,u*a),t.update(d,i,1)}function c(u,d,p){p!==0&&(s.drawElementsInstanced(i,d,r,u*a,p),t.update(d,i,p))}function h(u,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,p);let v=0;for(let g=0;g<p;g++)v+=d[g];t.update(v,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Uv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Ov(s,e,t){let i=new WeakMap,n=new yt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let w=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],M=0;p===!0&&(M=1),m===!0&&(M=2),v===!0&&(M=3);let b=o.attributes.position.count*M,_=1;b>e.maxTextureSize&&(_=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let S=new Float32Array(b*_*4*u),T=new Ma(S,b,_,u);T.type=Fi,T.needsUpdate=!0;let x=M*4;for(let A=0;A<u;A++){let C=g[A],L=f[A],N=y[A],D=b*_*4*A;for(let U=0;U<C.count;U++){let B=U*x;p===!0&&(n.fromBufferAttribute(C,U),S[D+B+0]=n.x,S[D+B+1]=n.y,S[D+B+2]=n.z,S[D+B+3]=0),m===!0&&(n.fromBufferAttribute(L,U),S[D+B+4]=n.x,S[D+B+5]=n.y,S[D+B+6]=n.z,S[D+B+7]=0),v===!0&&(n.fromBufferAttribute(N,U),S[D+B+8]=n.x,S[D+B+9]=n.y,S[D+B+10]=n.z,S[D+B+11]=N.itemSize===4?n.w:1)}}d={count:u,texture:T,size:new re(b,_)},i.set(o,d),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];let m=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function kv(s,e,t,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Bv={[no]:"LINEAR_TONE_MAPPING",[so]:"REINHARD_TONE_MAPPING",[ro]:"CINEON_TONE_MAPPING",[ao]:"ACES_FILMIC_TONE_MAPPING",[Ns]:"AGX_TONE_MAPPING",[lo]:"NEUTRAL_TONE_MAPPING",[oo]:"CUSTOM_TONE_MAPPING"};function zv(s,e,t,i,n,r){let a=new Bt(e,t,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new ot;c.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ze([0,2,0,0,2,0],2));let h=new Rr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Je(c,h),d=new wn(-1,1,1,-1,0,1),p=null,m=null,v=!1,g,f=null,y=[],M=!1;this.setSize=function(b,_){a.setSize(b,_),o!==null&&o.setSize(b,_),l!==null&&l.setSize(b,_);for(let S=0;S<y.length;S++){let T=y[S];T.setSize&&T.setSize(b,_)}},this.setEffects=function(b){y=b,M=y.length>0&&y[0].isRenderPass===!0;let _=a.width,S=a.height;y.length>0&&o===null&&(o=new Bt(_,S,{type:Yt,depthBuffer:!1,stencilBuffer:!1}),l=new Bt(_,S,{type:Yt,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<y.length;T++){let x=y[T];x.setSize&&x.setSize(_,S)}},this.begin=function(b,_){if(v||b.toneMapping===rn&&y.length===0)return!1;if(f=_,_!==null){let S=_.width,T=_.height;(a.width!==S||a.height!==T)&&this.setSize(S,T)}return M===!1&&b.setRenderTarget(a),g=b.toneMapping,b.toneMapping=rn,!0},this.hasRenderPass=function(){return M},this.end=function(b,_){b.toneMapping=g,v=!0;let S=a,T=o;for(let x=0;x<y.length;x++){let w=y[x];w.enabled!==!1&&(w.render(b,T,S,_),w.needsSwap!==!1&&(S=T,T=T===o?l:o))}if(p!==b.outputColorSpace||m!==b.toneMapping){p=b.outputColorSpace,m=b.toneMapping,h.defines={},et.getTransfer(p)===mt&&(h.defines.SRGB_TRANSFER="");let x=Bv[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(f),b.render(u,d),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Qp=new Xt,Gu=new _n(1,1),em=new Ma,tm=new Cl,im=new Ia,Np=[],Fp=[],Up=new Float32Array(16),Op=new Float32Array(9),kp=new Float32Array(4);function Hr(s,e,t){let i=s[0];if(i<=0||i>0)return s;let n=e*t,r=Np[n];if(r===void 0&&(r=new Float32Array(n),Np[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Jt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function Zt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Hc(s,e){let t=Fp[e];t===void 0&&(t=new Int32Array(e),Fp[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function Gv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Hv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2fv(this.addr,e),Zt(t,e)}}function Vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;s.uniform3fv(this.addr,e),Zt(t,e)}}function Wv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4fv(this.addr,e),Zt(t,e)}}function qv(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,i))return;kp.set(i),s.uniformMatrix2fv(this.addr,!1,kp),Zt(t,i)}}function Xv(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,i))return;Op.set(i),s.uniformMatrix3fv(this.addr,!1,Op),Zt(t,i)}}function jv(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,i))return;Up.set(i),s.uniformMatrix4fv(this.addr,!1,Up),Zt(t,i)}}function Kv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Yv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2iv(this.addr,e),Zt(t,e)}}function Jv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3iv(this.addr,e),Zt(t,e)}}function Zv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4iv(this.addr,e),Zt(t,e)}}function $v(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Qv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2uiv(this.addr,e),Zt(t,e)}}function ey(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3uiv(this.addr,e),Zt(t,e)}}function ty(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4uiv(this.addr,e),Zt(t,e)}}function iy(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Gu.compareFunction=t.isReversedDepthBuffer()?Oc:Uc,r=Gu):r=Qp,t.setTexture2D(e||r,n)}function ny(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||tm,n)}function sy(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||im,n)}function ry(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||em,n)}function ay(s){switch(s){case 5126:return Gv;case 35664:return Hv;case 35665:return Vv;case 35666:return Wv;case 35674:return qv;case 35675:return Xv;case 35676:return jv;case 5124:case 35670:return Kv;case 35667:case 35671:return Yv;case 35668:case 35672:return Jv;case 35669:case 35673:return Zv;case 5125:return $v;case 36294:return Qv;case 36295:return ey;case 36296:return ty;case 35678:case 36198:case 36298:case 36306:case 35682:return iy;case 35679:case 36299:case 36307:return ny;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ry}}function oy(s,e){s.uniform1fv(this.addr,e)}function ly(s,e){let t=Hr(e,this.size,2);s.uniform2fv(this.addr,t)}function cy(s,e){let t=Hr(e,this.size,3);s.uniform3fv(this.addr,t)}function hy(s,e){let t=Hr(e,this.size,4);s.uniform4fv(this.addr,t)}function uy(s,e){let t=Hr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function dy(s,e){let t=Hr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function fy(s,e){let t=Hr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function py(s,e){s.uniform1iv(this.addr,e)}function my(s,e){s.uniform2iv(this.addr,e)}function gy(s,e){s.uniform3iv(this.addr,e)}function by(s,e){s.uniform4iv(this.addr,e)}function xy(s,e){s.uniform1uiv(this.addr,e)}function vy(s,e){s.uniform2uiv(this.addr,e)}function yy(s,e){s.uniform3uiv(this.addr,e)}function _y(s,e){s.uniform4uiv(this.addr,e)}function My(s,e,t){let i=this.cache,n=e.length,r=Hc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Gu:a=Qp;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||a,r[o])}function Sy(s,e,t){let i=this.cache,n=e.length,r=Hc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||tm,r[a])}function wy(s,e,t){let i=this.cache,n=e.length,r=Hc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||im,r[a])}function Ey(s,e,t){let i=this.cache,n=e.length,r=Hc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||em,r[a])}function Ty(s){switch(s){case 5126:return oy;case 35664:return ly;case 35665:return cy;case 35666:return hy;case 35674:return uy;case 35675:return dy;case 35676:return fy;case 5124:case 35670:return py;case 35667:case 35671:return my;case 35668:case 35672:return gy;case 35669:case 35673:return by;case 5125:return xy;case 36294:return vy;case 36295:return yy;case 36296:return _y;case 35678:case 36198:case 36298:case 36306:case 35682:return My;case 35679:case 36299:case 36307:return Sy;case 35680:case 36300:case 36308:case 36293:return wy;case 36289:case 36303:case 36311:case 36292:return Ey}}var Hu=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ay(t.type)}},Vu=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ty(t.type)}},Wu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(e,t[o.id],i)}}},Bu=/(\w+)(\])?(\[|\.)?/g;function Bp(s,e){s.seq.push(e),s.map[e.id]=e}function Ay(s,e,t){let i=s.name,n=i.length;for(Bu.lastIndex=0;;){let r=Bu.exec(i),a=Bu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Bp(t,c===void 0?new Hu(o,s,e):new Vu(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Wu(o),Bp(t,u)),t=u}}}var Br=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ay(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){let r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,r=e.length;n!==r;++n){let a=e[n];a.id in t&&i.push(a)}return i}};function zp(s,e,t){let i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}var Ry=37297,Cy=0;function Py(s,e){let t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Gp=new $e;function Iy(s){et._getMatrix(Gp,et.workingColorSpace,s);let e=`mat3( ${Gp.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(s)){case ya:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Hp(s,e,t){let i=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Py(s.getShaderSource(e),o)}else return r}function Dy(s,e){let t=Iy(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Ly={[no]:"Linear",[so]:"Reinhard",[ro]:"Cineon",[ao]:"ACESFilmic",[Ns]:"AgX",[lo]:"Neutral",[oo]:"Custom"};function Ny(s,e){let t=Ly[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Bc=new I;function Fy(){et.getLuminanceCoefficients(Bc);let s=Bc.x.toFixed(4),e=Bc.y.toFixed(4),t=Bc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_o).join(`
`)}function Oy(s){let e=[];for(let t in s){let i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ky(s,e){let t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(e,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function _o(s){return s!==""}function Vp(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wp(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var By=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(s){return s.replace(By,Gy)}var zy=new Map;function Gy(s,e){let t=nt[e];if(t===void 0){let i=zy.get(e);if(i!==void 0)t=nt[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qu(t)}var Hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qp(s){return s.replace(Hy,Vy)}function Vy(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Xp(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var Wy={[Ds]:"SHADOWMAP_TYPE_PCF",[Dr]:"SHADOWMAP_TYPE_VSM"};function qy(s){return Wy[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Xy={[cs]:"ENVMAP_TYPE_CUBE",[Fs]:"ENVMAP_TYPE_CUBE",[co]:"ENVMAP_TYPE_CUBE_UV"};function jy(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Xy[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ky={[Fs]:"ENVMAP_MODE_REFRACTION"};function Yy(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Ky[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Jy={[xu]:"ENVMAP_BLENDING_MULTIPLY",[ap]:"ENVMAP_BLENDING_MIX",[op]:"ENVMAP_BLENDING_ADD"};function Zy(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Jy[s.combine]||"ENVMAP_BLENDING_NONE"}function $y(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Qy(s,e,t,i){let n=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=qy(t),c=jy(t),h=Yy(t),u=Zy(t),d=$y(t),p=Uy(t),m=Oy(r),v=n.createProgram(),g,f,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(_o).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(_o).join(`
`),f.length>0&&(f+=`
`)):(g=[Xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_o).join(`
`),f=[Xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==rn?"#define TONE_MAPPING":"",t.toneMapping!==rn?nt.tonemapping_pars_fragment:"",t.toneMapping!==rn?Ny("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,Dy("linearToOutputTexel",t.outputColorSpace),Fy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_o).join(`
`)),a=qu(a),a=Vp(a,t),a=Wp(a,t),o=qu(o),o=Vp(o,t),o=Wp(o,t),a=qp(a),o=qp(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Ru?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ru?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=y+g+a,b=y+f+o,_=zp(n,n.VERTEX_SHADER,M),S=zp(n,n.FRAGMENT_SHADER,b);n.attachShader(v,_),n.attachShader(v,S),t.index0AttributeName!==void 0?n.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function T(C){if(s.debug.checkShaderErrors){let L=n.getProgramInfoLog(v)||"",N=n.getShaderInfoLog(_)||"",D=n.getShaderInfoLog(S)||"",U=L.trim(),B=N.trim(),G=D.trim(),ne=!0,q=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(ne=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,v,_,S);else{let X=Hp(n,_,"vertex"),J=Hp(n,S,"fragment");Xe("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+X+`
`+J)}else U!==""?Fe("WebGLProgram: Program Info Log:",U):(B===""||G==="")&&(q=!1);q&&(C.diagnostics={runnable:ne,programLog:U,vertexShader:{log:B,prefix:g},fragmentShader:{log:G,prefix:f}})}n.deleteShader(_),n.deleteShader(S),x=new Br(n,v),w=ky(n,v)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=n.getProgramParameter(v,Ry)),A},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=_,this.fragmentShader=S,this}var e_=0,Xu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new ju(e),t.set(e,i)),i}},ju=class{constructor(e){this.id=e_++,this.code=e,this.usedTimes=0}};function t_(s){return s===us||s===mo||s===go}function i_(s,e,t,i,n,r){let a=new br,o=new Xu,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,w,A,C,L,N){let D=C.fog,U=L.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ne=e.get(x.envMap||B,G),q=ne&&ne.mapping===co?ne.image.height:null,X=p[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Fe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ee=J!==void 0?J.length:0,ie=0;U.morphAttributes.position!==void 0&&(ie=1),U.morphAttributes.normal!==void 0&&(ie=2),U.morphAttributes.color!==void 0&&(ie=3);let ye,Te,ze,j;if(X){let Tt=An[X];ye=Tt.vertexShader,Te=Tt.fragmentShader}else{ye=x.vertexShader,Te=x.fragmentShader;let Tt=o.getVertexShaderStage(x),bt=o.getFragmentShaderStage(x);o.update(x,Tt,bt),ze=Tt.id,j=bt.id}let $=s.getRenderTarget(),ue=s.state.buffers.depth.getReversed(),Ue=L.isInstancedMesh===!0,Se=L.isBatchedMesh===!0,We=!!x.map,dt=!!x.matcap,ee=!!ne,oe=!!x.aoMap,le=!!x.lightMap,ce=!!x.bumpMap&&x.wireframe===!1,de=!!x.normalMap,Ve=!!x.displacementMap,Oe=!!x.emissiveMap,qe=!!x.metalnessMap,Ke=!!x.roughnessMap,F=x.anisotropy>0,ut=x.clearcoat>0,Qe=x.dispersion>0,P=x.retroreflectivity>0,E=x.iridescence>0,z=x.sheen>0,H=x.transmission>0,Y=F&&!!x.anisotropyMap,he=ut&&!!x.clearcoatMap,fe=ut&&!!x.clearcoatNormalMap,Z=ut&&!!x.clearcoatRoughnessMap,te=E&&!!x.iridescenceMap,ge=E&&!!x.iridescenceThicknessMap,Le=z&&!!x.sheenColorMap,me=z&&!!x.sheenRoughnessMap,pe=!!x.specularMap,Ce=!!x.specularColorMap,Ge=!!x.specularIntensityMap,Ye=H&&!!x.transmissionMap,k=H&&!!x.thicknessMap,be=!!x.gradientMap,Q=!!x.alphaMap,xe=x.alphaTest>0,we=!!x.alphaHash,ae=!!x.extensions,He=rn;x.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(He=s.toneMapping);let De={shaderID:X,shaderType:x.type,shaderName:x.name,vertexShader:ye,fragmentShader:Te,defines:x.defines,customVertexShaderID:ze,customFragmentShaderID:j,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Se,batchingColor:Se&&L._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&L.instanceColor!==null,instancingMorph:Ue&&L.morphTexture!==null,outputColorSpace:$===null?s.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:We,matcap:dt,envMap:ee,envMapMode:ee&&ne.mapping,envMapCubeUVHeight:q,aoMap:oe,lightMap:le,bumpMap:ce,normalMap:de,displacementMap:Ve,emissiveMap:Oe,normalMapObjectSpace:de&&x.normalMapType===up,normalMapTangentSpace:de&&x.normalMapType===xo,packedNormalMap:de&&x.normalMapType===xo&&t_(x.normalMap.format),metalnessMap:qe,roughnessMap:Ke,anisotropy:F,anisotropyMap:Y,clearcoat:ut,clearcoatMap:he,clearcoatNormalMap:fe,clearcoatRoughnessMap:Z,dispersion:Qe,retroreflection:P,iridescence:E,iridescenceMap:te,iridescenceThicknessMap:ge,sheen:z,sheenColorMap:Le,sheenRoughnessMap:me,specularMap:pe,specularColorMap:Ce,specularIntensityMap:Ge,transmission:H,transmissionMap:Ye,thicknessMap:k,gradientMap:be,opaque:x.transparent===!1&&x.blending===Lr&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:xe,alphaHash:we,combine:x.combine,mapUv:We&&m(x.map.channel),aoMapUv:oe&&m(x.aoMap.channel),lightMapUv:le&&m(x.lightMap.channel),bumpMapUv:ce&&m(x.bumpMap.channel),normalMapUv:de&&m(x.normalMap.channel),displacementMapUv:Ve&&m(x.displacementMap.channel),emissiveMapUv:Oe&&m(x.emissiveMap.channel),metalnessMapUv:qe&&m(x.metalnessMap.channel),roughnessMapUv:Ke&&m(x.roughnessMap.channel),anisotropyMapUv:Y&&m(x.anisotropyMap.channel),clearcoatMapUv:he&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:fe&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:me&&m(x.sheenRoughnessMap.channel),specularMapUv:pe&&m(x.specularMap.channel),specularColorMapUv:Ce&&m(x.specularColorMap.channel),specularIntensityMapUv:Ge&&m(x.specularIntensityMap.channel),transmissionMapUv:Ye&&m(x.transmissionMap.channel),thicknessMapUv:k&&m(x.thicknessMap.channel),alphaMapUv:Q&&m(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(de||F),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(We||Q),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&de===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ue,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:ie,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&A.length>0,shadowMapType:s.shadowMap.type,toneMapping:He,decodeVideoTexture:We&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===mt,decodeVideoTextureEmissive:Oe&&x.emissiveMap.isVideoTexture===!0&&et.getTransfer(x.emissiveMap.colorSpace)===mt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Rt,flipSided:x.side===si,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ae&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&x.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function g(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let A in x.defines)w.push(A),w.push(x.defines[A]);return x.isRawShaderMaterial===!1&&(f(w,x),y(w,x),w.push(s.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function y(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function M(x){let w=p[x.type],A;if(w){let C=An[w];A=Ei.clone(C.uniforms)}else A=x.uniforms;return A}function b(x,w){let A=h.get(w);return A!==void 0?++A.usedTimes:(A=new Qy(s,w,x,n),c.push(A),h.set(w,A)),A}function _(x){if(--x.usedTimes===0){let w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){o.remove(x)}function T(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:M,acquireProgram:b,releaseProgram:_,releaseShaderCache:S,programs:c,dispose:T}}function n_(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function s_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function jp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Kp(){let s=[],e=0,t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,m,v,g,f){let y=s[e];return y===void 0?(y={id:d.id,object:d,geometry:p,material:m,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:f},s[e]=y):(y.id=d.id,y.object=d,y.geometry=p,y.material=m,y.materialVariant=a(d),y.groupOrder=v,y.renderOrder=d.renderOrder,y.z=g,y.group=f),e++,y}function l(d,p,m,v,g,f,y){y.reversedDepth===!0&&(g=-g);let M=o(d,p,m,v,g,f);m.transmission>0?i.push(M):m.transparent===!0?n.push(M):t.push(M)}function c(d,p,m,v,g,f){let y=o(d,p,m,v,g,f);m.transmission>0?i.unshift(y):m.transparent===!0?n.unshift(y):t.unshift(y)}function h(d,p){t.length>1&&t.sort(d||s_),i.length>1&&i.sort(p||jp),n.length>1&&n.sort(p||jp)}function u(){for(let d=e,p=s.length;d<p;d++){let m=s[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:u,sort:h}}function r_(){let s=new WeakMap;function e(i,n){let r=s.get(i),a;return r===void 0?(a=new Kp,s.set(i,[a])):n>=r.length?(a=new Kp,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function a_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new Be};break;case"SpotLight":t={position:new I,direction:new I,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new I,halfWidth:new I,halfHeight:new I};break}return s[e.id]=t,t}}}function o_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var l_=0;function c_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function h_(s){let e=new a_,t=o_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let n=new I,r=new ke,a=new ke;function o(c){let h=0,u=0,d=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let p=0,m=0,v=0,g=0,f=0,y=0,M=0,b=0,_=0,S=0,T=0,x=0,w=0,A=0;c.sort(c_);for(let L=0,N=c.length;L<N;L++){let D=c[L],U=D.color,B=D.intensity,G=D.distance,ne=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===us?ne=D.shadow.map.texture:ne=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=U.r*B,u+=U.g*B,d+=U.b*B;else if(D.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(D.sh.coefficients[q],B);A++}else if(D.isSunLight){let q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let X=D.shadow,J=t.get(D);J.shadowIntensity=X.intensity,J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),i.sunShadow[m]=J,i.sunShadowMap[m]=ne;let Ee=X.getViewportCount();for(let ie=0;ie<Ee;ie++)i.sunShadowMatrix[v+ie]=X.getMatrix(ie),i.sunShadowCascade[v+ie]=X._cascadeData[ie];v+=Ee,m++}i.sun[p]=q,p++}else if(D.isDirectionalLight){let q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let X=D.shadow,J=t.get(D);J.shadowIntensity=X.intensity,J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize=X.mapSize,i.directionalShadow[g]=J,i.directionalShadowMap[g]=ne,i.directionalShadowMatrix[g]=D.shadow.matrix,_++}i.directional[g]=q,g++}else if(D.isSpotLight){let q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(U).multiplyScalar(B),q.distance=G,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,i.spot[y]=q;let X=D.shadow;if(D.map&&(i.spotLightMap[x]=D.map,x++,X.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[y]=X.matrix,D.castShadow){let J=t.get(D);J.shadowIntensity=X.intensity,J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize=X.mapSize,i.spotShadow[y]=J,i.spotShadowMap[y]=ne,T++}y++}else if(D.isRectAreaLight){let q=e.get(D);q.color.copy(U).multiplyScalar(B),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),i.rectArea[M]=q,M++}else if(D.isPointLight){let q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){let X=D.shadow,J=t.get(D);J.shadowIntensity=X.intensity,J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize=X.mapSize,J.shadowCameraNear=X.camera.near,J.shadowCameraFar=X.camera.far,i.pointShadow[f]=J,i.pointShadowMap[f]=ne,i.pointShadowMatrix[f]=D.shadow.matrix,S++}i.point[f]=q,f++}else if(D.isHemisphereLight){let q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(B),q.groundColor.copy(D.groundColor).multiplyScalar(B),i.hemi[b]=q,b++}}M>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let C=i.hash;(C.sunLength!==p||C.directionalLength!==g||C.pointLength!==f||C.spotLength!==y||C.rectAreaLength!==M||C.hemiLength!==b||C.numSunShadows!==m||C.numDirectionalShadows!==_||C.numPointShadows!==S||C.numSpotShadows!==T||C.numSpotMaps!==x||C.numLightProbes!==A)&&(i.sun.length=p,i.directional.length=g,i.spot.length=y,i.rectArea.length=M,i.point.length=f,i.hemi.length=b,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.directionalShadowMatrix.length=_,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+x-w,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,C.sunLength=p,C.directionalLength=g,C.pointLength=f,C.spotLength=y,C.rectAreaLength=M,C.hemiLength=b,C.numSunShadows=m,C.numDirectionalShadows=_,C.numPointShadows=S,C.numSpotShadows=T,C.numSpotMaps=x,C.numLightProbes=A,i.version=l_++)}function l(c,h){let u=0,d=0,p=0,m=0,v=0,g=0,f=h.matrixWorldInverse;for(let y=0,M=c.length;y<M;y++){let b=c[y];if(b.isSunLight){let _=i.sun[u];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(f),u++}else if(b.isDirectionalLight){let _=i.directional[d];_.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(f),d++}else if(b.isSpotLight){let _=i.spot[m];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(f),m++}else if(b.isRectAreaLight){let _=i.rectArea[v];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(f),a.identity(),r.copy(b.matrixWorld),r.premultiply(f),a.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),v++}else if(b.isPointLight){let _=i.point[p];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){let _=i.hemi[g];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(f),g++}}}return{setup:o,setupView:l,state:i}}function Yp(s){let e=new h_(s),t=[],i=[],n=[];function r(d){u.camera=d,t.length=0,i.length=0,n.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){n.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function u_(s){let e=new WeakMap;function t(n,r=0){let a=e.get(n),o;return a===void 0?(o=new Yp(s),e.set(n,[o])):r>=a.length?(o=new Yp(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var d_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f_=`uniform sampler2D shadow_pass;
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
}`,p_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],m_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Jp=new ke,yo=new I,zu=new I;function g_(s,e,t){let i=new vn,n=new re,r=new re,a=new yt,o=new Bl,l=new zl,c={},h=t.maxTextureSize,u={[Vi]:si,[si]:Vi,[Rt]:Rt},d=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:d_,fragmentShader:f_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let m=new ot;m.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Je(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ds;let f=this.type;this.render=function(S,T,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===qf&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ds);let w=s.getRenderTarget(),A=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),L=s.state;L.setBlending(zt),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let N=f!==this.type;N&&T.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(U=>U.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,U=S.length;D<U;D++){let B=S[D],G=B.shadow;if(G===void 0){Fe("WebGLShadowMap:",B,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;n.copy(G.mapSize);let ne=G.getFrameExtents();n.multiply(ne),r.copy(G.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/ne.x),n.x=r.x*ne.x,G.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/ne.y),n.y=r.y*ne.y,G.mapSize.y=r.y));let q=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=q,G.map===null||N===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Dr){if(B.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Bt(n.x,n.y,{format:us,type:Yt,minFilter:kt,magFilter:kt,generateMipmaps:!1}),G.map.texture.name=B.name+".shadowMap",G.map.depthTexture=new _n(n.x,n.y,Fi),G.map.depthTexture.name=B.name+".shadowMapDepth",G.map.depthTexture.format=gn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=It,G.map.depthTexture.magFilter=It}else B.isPointLight?(G.map=new Gr(n.x),G.map.depthTexture=new Dl(n.x,on)):(G.map=new Bt(n.x,n.y),G.map.depthTexture=new _n(n.x,n.y,on)),G.map.depthTexture.name=B.name+".shadowMap",G.map.depthTexture.format=gn,this.type===Ds?(G.map.depthTexture.compareFunction=q?Oc:Uc,G.map.depthTexture.minFilter=kt,G.map.depthTexture.magFilter=kt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=It,G.map.depthTexture.magFilter=It);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==n.x||G.map.height!==n.y)&&G.map.setSize(n.x,n.y);let X=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();B.isPointLight!==!0&&G.updateMatrices(B,x);for(let J=0;J<X;J++){let Ee=G.getCamera(J);if(B.isPointLight){let ie=G.camera,ye=G.matrix,Te=B.distance||ie.far;Te!==ie.far&&(ie.far=Te,ie.updateProjectionMatrix()),yo.setFromMatrixPosition(B.matrixWorld),ie.position.copy(yo),zu.copy(ie.position),zu.add(p_[J]),ie.up.copy(m_[J]),ie.lookAt(zu),ie.updateMatrixWorld(),ye.makeTranslation(-yo.x,-yo.y,-yo.z),Jp.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Jp,ie.coordinateSystem,ie.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,J),s.clear();else{J===0&&(s.setRenderTarget(G.map),s.clear());let ie=G.getViewport(J);a.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),L.viewport(a)}i=G.getFrustum(J),b(T,x,Ee,B,this.type)}G.isPointLightShadow!==!0&&this.type===Dr&&y(G,x),G.needsUpdate=!1}f=this.type,g.needsUpdate=!1,s.setRenderTarget(w,A,C)};function y(S,T){let x=e.update(v);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null?S.mapPass=new Bt(n.x,n.y,{format:us,type:Yt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(T,null,x,d,v,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value.set(S.map.width,S.map.height),p.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(T,null,x,p,v,null)}function M(S,T,x,w){let A=null,C=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)A=C;else if(A=x.isPointLight===!0?l:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let L=A.uuid,N=T.uuid,D=c[L];D===void 0&&(D={},c[L]=D);let U=D[N];U===void 0&&(U=A.clone(),D[N]=U,T.addEventListener("dispose",_)),A=U}if(A.visible=T.visible,A.wireframe=T.wireframe,w===Dr?A.side=T.shadowSide!==null?T.shadowSide:T.side:A.side=T.shadowSide!==null?T.shadowSide:u[T.side],A.alphaMap=T.alphaMap,A.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,A.map=T.map,A.clipShadows=T.clipShadows,A.clippingPlanes=T.clippingPlanes,A.clipIntersection=T.clipIntersection,A.displacementMap=T.displacementMap,A.displacementScale=T.displacementScale,A.displacementBias=T.displacementBias,A.wireframeLinewidth=T.wireframeLinewidth,A.linewidth=T.linewidth,x.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let L=s.properties.get(A);L.light=x}return A}function b(S,T,x,w,A){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===Dr)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let N=e.update(S),D=S.material;if(Array.isArray(D)){let U=N.groups;for(let B=0,G=U.length;B<G;B++){let ne=U[B],q=D[ne.materialIndex];if(q&&q.visible){let X=M(S,q,w,A);S.onBeforeShadow(s,S,T,x,N,X,ne),s.renderBufferDirect(x,null,N,X,S,ne),S.onAfterShadow(s,S,T,x,N,X,ne)}}}else if(D.visible){let U=M(S,D,w,A);S.onBeforeShadow(s,S,T,x,N,U,null),s.renderBufferDirect(x,null,N,U,S,null),S.onAfterShadow(s,S,T,x,N,U,null)}}let L=S.children;for(let N=0,D=L.length;N<D;N++)b(L[N],T,x,w,A)}function _(S){S.target.removeEventListener("dispose",_);for(let x in c){let w=c[x],A=S.target.uuid;A in w&&(w[A].dispose(),delete w[A])}}}function b_(s,e){function t(){let k=!1,be=new yt,Q=null,xe=new yt(0,0,0,0);return{setMask:function(we){Q!==we&&!k&&(s.colorMask(we,we,we,we),Q=we)},setLocked:function(we){k=we},setClear:function(we,ae,He,De,Tt){Tt===!0&&(we*=De,ae*=De,He*=De),be.set(we,ae,He,De),xe.equals(be)===!1&&(s.clearColor(we,ae,He,De),xe.copy(be))},reset:function(){k=!1,Q=null,xe.set(-1,0,0,0)}}}function i(){let k=!1,be=!1,Q=null,xe=null,we=null;return{setReversed:function(ae){if(be!==ae){let He=e.get("EXT_clip_control");ae?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),be=ae;let De=we;we=null,this.setClear(De)}},getReversed:function(){return be},setTest:function(ae){ae?$(s.DEPTH_TEST):ue(s.DEPTH_TEST)},setMask:function(ae){Q!==ae&&!k&&(s.depthMask(ae),Q=ae)},setFunc:function(ae){if(be&&(ae=Mp[ae]),xe!==ae){switch(ae){case yl:s.depthFunc(s.NEVER);break;case _l:s.depthFunc(s.ALWAYS);break;case Ml:s.depthFunc(s.LESS);break;case ur:s.depthFunc(s.LEQUAL);break;case Sl:s.depthFunc(s.EQUAL);break;case wl:s.depthFunc(s.GEQUAL);break;case El:s.depthFunc(s.GREATER);break;case Tl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xe=ae}},setLocked:function(ae){k=ae},setClear:function(ae){we!==ae&&(we=ae,be&&(ae=1-ae),s.clearDepth(ae))},reset:function(){k=!1,Q=null,xe=null,we=null,be=!1}}}function n(){let k=!1,be=null,Q=null,xe=null,we=null,ae=null,He=null,De=null,Tt=null;return{setTest:function(bt){k||(bt?$(s.STENCIL_TEST):ue(s.STENCIL_TEST))},setMask:function(bt){be!==bt&&!k&&(s.stencilMask(bt),be=bt)},setFunc:function(bt,Ki,un){(Q!==bt||xe!==Ki||we!==un)&&(s.stencilFunc(bt,Ki,un),Q=bt,xe=Ki,we=un)},setOp:function(bt,Ki,un){(ae!==bt||He!==Ki||De!==un)&&(s.stencilOp(bt,Ki,un),ae=bt,He=Ki,De=un)},setLocked:function(bt){k=bt},setClear:function(bt){Tt!==bt&&(s.clearStencil(bt),Tt=bt)},reset:function(){k=!1,be=null,Q=null,xe=null,we=null,ae=null,He=null,De=null,Tt=null}}}let r=new t,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},u={},d={},p=new WeakMap,m=[],v=null,g=!1,f=null,y=null,M=null,b=null,_=null,S=null,T=null,x=new Be(0,0,0),w=0,A=!1,C=null,L=null,N=null,D=null,U=null,B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,ne=0,q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(q)[1]),G=ne>=1):q.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),G=ne>=2);let X=null,J={},Ee=s.getParameter(s.SCISSOR_BOX),ie=s.getParameter(s.VIEWPORT),ye=new yt().fromArray(Ee),Te=new yt().fromArray(ie);function ze(k,be,Q,xe){let we=new Uint8Array(4),ae=s.createTexture();s.bindTexture(k,ae),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let He=0;He<Q;He++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(be,0,s.RGBA,1,1,xe,0,s.RGBA,s.UNSIGNED_BYTE,we):s.texImage2D(be+He,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,we);return ae}let j={};j[s.TEXTURE_2D]=ze(s.TEXTURE_2D,s.TEXTURE_2D,1),j[s.TEXTURE_CUBE_MAP]=ze(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[s.TEXTURE_2D_ARRAY]=ze(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),j[s.TEXTURE_3D]=ze(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(s.DEPTH_TEST),a.setFunc(ur),ce(!1),de(du),$(s.CULL_FACE),oe(zt);function $(k){h[k]!==!0&&(s.enable(k),h[k]=!0)}function ue(k){h[k]!==!1&&(s.disable(k),h[k]=!1)}function Ue(k,be){return d[k]!==be?(s.bindFramebuffer(k,be),d[k]=be,k===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=be),k===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=be),!0):!1}function Se(k,be){let Q=m,xe=!1;if(k){Q=p.get(be),Q===void 0&&(Q=[],p.set(be,Q));let we=k.textures;if(Q.length!==we.length||Q[0]!==s.COLOR_ATTACHMENT0){for(let ae=0,He=we.length;ae<He;ae++)Q[ae]=s.COLOR_ATTACHMENT0+ae;Q.length=we.length,xe=!0}}else Q[0]!==s.BACK&&(Q[0]=s.BACK,xe=!0);xe&&s.drawBuffers(Q)}function We(k){return v!==k?(s.useProgram(k),v=k,!0):!1}let dt={[Wi]:s.FUNC_ADD,[Xf]:s.FUNC_SUBTRACT,[jf]:s.FUNC_REVERSE_SUBTRACT};dt[Kf]=s.MIN,dt[Yf]=s.MAX;let ee={[Ls]:s.ZERO,[Jf]:s.ONE,[Zf]:s.SRC_COLOR,[gu]:s.SRC_ALPHA,[tp]:s.SRC_ALPHA_SATURATE,[io]:s.DST_COLOR,[to]:s.DST_ALPHA,[$f]:s.ONE_MINUS_SRC_COLOR,[bu]:s.ONE_MINUS_SRC_ALPHA,[ep]:s.ONE_MINUS_DST_COLOR,[Qf]:s.ONE_MINUS_DST_ALPHA,[ip]:s.CONSTANT_COLOR,[np]:s.ONE_MINUS_CONSTANT_COLOR,[sp]:s.CONSTANT_ALPHA,[rp]:s.ONE_MINUS_CONSTANT_ALPHA};function oe(k,be,Q,xe,we,ae,He,De,Tt,bt){if(k===zt){g===!0&&(ue(s.BLEND),g=!1);return}if(g===!1&&($(s.BLEND),g=!0),k!==Yl){if(k!==f||bt!==A){if((y!==Wi||_!==Wi)&&(s.blendEquation(s.FUNC_ADD),y=Wi,_=Wi),bt)switch(k){case Lr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case fu:s.blendFunc(s.ONE,s.ONE);break;case pu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case mu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Xe("WebGLState: Invalid blending: ",k);break}else switch(k){case Lr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case fu:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case pu:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mu:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",k);break}M=null,b=null,S=null,T=null,x.set(0,0,0),w=0,f=k,A=bt}return}we=we||be,ae=ae||Q,He=He||xe,(be!==y||we!==_)&&(s.blendEquationSeparate(dt[be],dt[we]),y=be,_=we),(Q!==M||xe!==b||ae!==S||He!==T)&&(s.blendFuncSeparate(ee[Q],ee[xe],ee[ae],ee[He]),M=Q,b=xe,S=ae,T=He),(De.equals(x)===!1||Tt!==w)&&(s.blendColor(De.r,De.g,De.b,Tt),x.copy(De),w=Tt),f=k,A=!1}function le(k,be){k.side===Rt?ue(s.CULL_FACE):$(s.CULL_FACE);let Q=k.side===si;be&&(Q=!Q),ce(Q),k.blending===Lr&&k.transparent===!1?oe(zt):oe(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let xe=k.stencilWrite;o.setTest(xe),xe&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Oe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?$(s.SAMPLE_ALPHA_TO_COVERAGE):ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function ce(k){C!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),C=k)}function de(k){k!==Vf?($(s.CULL_FACE),k!==L&&(k===du?s.cullFace(s.BACK):k===Wf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ue(s.CULL_FACE),L=k}function Ve(k){k!==N&&(G&&s.lineWidth(k),N=k)}function Oe(k,be,Q){k?($(s.POLYGON_OFFSET_FILL),(D!==be||U!==Q)&&(D=be,U=Q,a.getReversed()&&(be=-be),s.polygonOffset(be,Q))):ue(s.POLYGON_OFFSET_FILL)}function qe(k){k?$(s.SCISSOR_TEST):ue(s.SCISSOR_TEST)}function Ke(k){k===void 0&&(k=s.TEXTURE0+B-1),X!==k&&(s.activeTexture(k),X=k)}function F(k,be,Q){Q===void 0&&(X===null?Q=s.TEXTURE0+B-1:Q=X);let xe=J[Q];xe===void 0&&(xe={type:void 0,texture:void 0},J[Q]=xe),(xe.type!==k||xe.texture!==be)&&(X!==Q&&(s.activeTexture(Q),X=Q),s.bindTexture(k,be||j[k]),xe.type=k,xe.texture=be)}function ut(){let k=J[X];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Qe(){try{s.compressedTexImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function E(){try{s.texSubImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function z(){try{s.texSubImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function Y(){try{s.compressedTexSubImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function he(){try{s.texStorage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function fe(){try{s.texStorage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function Z(){try{s.texImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function te(){try{s.texImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function ge(k){return u[k]!==void 0?u[k]:s.getParameter(k)}function Le(k,be){u[k]!==be&&(s.pixelStorei(k,be),u[k]=be)}function me(k){ye.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),ye.copy(k))}function pe(k){Te.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),Te.copy(k))}function Ce(k,be){let Q=c.get(be);Q===void 0&&(Q=new WeakMap,c.set(be,Q));let xe=Q.get(k);xe===void 0&&(xe=s.getUniformBlockIndex(be,k.name),Q.set(k,xe))}function Ge(k,be){let xe=c.get(be).get(k);l.get(be)!==xe&&(s.uniformBlockBinding(be,xe,k.__bindingPointIndex),l.set(be,xe))}function Ye(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},X=null,J={},d={},p=new WeakMap,m=[],v=null,g=!1,f=null,y=null,M=null,b=null,_=null,S=null,T=null,x=new Be(0,0,0),w=0,A=!1,C=null,L=null,N=null,D=null,U=null,ye.set(0,0,s.canvas.width,s.canvas.height),Te.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:ue,bindFramebuffer:Ue,drawBuffers:Se,useProgram:We,setBlending:oe,setMaterial:le,setFlipSided:ce,setCullFace:de,setLineWidth:Ve,setPolygonOffset:Oe,setScissorTest:qe,activeTexture:Ke,bindTexture:F,unbindTexture:ut,compressedTexImage2D:Qe,compressedTexImage3D:P,texImage2D:Z,texImage3D:te,pixelStorei:Le,getParameter:ge,updateUBOMapping:Ce,uniformBlockBinding:Ge,texStorage2D:he,texStorage3D:fe,texSubImage2D:E,texSubImage3D:z,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:me,viewport:pe,reset:Ye}}function x_(s,e,t,i,n,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,h=new WeakMap,u=new Set,d,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(P,E){return m?new OffscreenCanvas(P,E):pr("canvas")}function g(P,E,z){let H=1,Y=Qe(P);if((Y.width>z||Y.height>z)&&(H=z/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let he=Math.floor(H*Y.width),fe=Math.floor(H*Y.height);d===void 0&&(d=v(he,fe));let Z=E?v(he,fe):d;return Z.width=he,Z.height=fe,Z.getContext("2d").drawImage(P,0,0,he,fe),Fe("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+he+"x"+fe+")."),Z}else return"data"in P&&Fe("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),P;return P}function f(P){return P.generateMipmaps}function y(P){s.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(P,E,z,H,Y,he=!1){if(P!==null){if(s[P]!==void 0)return s[P];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let fe;H&&(fe=e.get("EXT_texture_norm16"),fe||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=E;if(E===s.RED&&(z===s.FLOAT&&(Z=s.R32F),z===s.HALF_FLOAT&&(Z=s.R16F),z===s.UNSIGNED_BYTE&&(Z=s.R8),z===s.UNSIGNED_SHORT&&fe&&(Z=fe.R16_EXT),z===s.SHORT&&fe&&(Z=fe.R16_SNORM_EXT)),E===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.R8UI),z===s.UNSIGNED_SHORT&&(Z=s.R16UI),z===s.UNSIGNED_INT&&(Z=s.R32UI),z===s.BYTE&&(Z=s.R8I),z===s.SHORT&&(Z=s.R16I),z===s.INT&&(Z=s.R32I)),E===s.RG&&(z===s.FLOAT&&(Z=s.RG32F),z===s.HALF_FLOAT&&(Z=s.RG16F),z===s.UNSIGNED_BYTE&&(Z=s.RG8),z===s.UNSIGNED_SHORT&&fe&&(Z=fe.RG16_EXT),z===s.SHORT&&fe&&(Z=fe.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RG8UI),z===s.UNSIGNED_SHORT&&(Z=s.RG16UI),z===s.UNSIGNED_INT&&(Z=s.RG32UI),z===s.BYTE&&(Z=s.RG8I),z===s.SHORT&&(Z=s.RG16I),z===s.INT&&(Z=s.RG32I)),E===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),z===s.UNSIGNED_INT&&(Z=s.RGB32UI),z===s.BYTE&&(Z=s.RGB8I),z===s.SHORT&&(Z=s.RGB16I),z===s.INT&&(Z=s.RGB32I)),E===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),z===s.UNSIGNED_INT&&(Z=s.RGBA32UI),z===s.BYTE&&(Z=s.RGBA8I),z===s.SHORT&&(Z=s.RGBA16I),z===s.INT&&(Z=s.RGBA32I)),E===s.RGB&&(z===s.UNSIGNED_SHORT&&fe&&(Z=fe.RGB16_EXT),z===s.SHORT&&fe&&(Z=fe.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),E===s.RGBA){let te=he?ya:et.getTransfer(Y);z===s.FLOAT&&(Z=s.RGBA32F),z===s.HALF_FLOAT&&(Z=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Z=te===mt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&fe&&(Z=fe.RGBA16_EXT),z===s.SHORT&&fe&&(Z=fe.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function _(P,E){let z;return P?E===null||E===on||E===hs?z=s.DEPTH24_STENCIL8:E===Fi?z=s.DEPTH32F_STENCIL8:E===Fr&&(z=s.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===on||E===hs?z=s.DEPTH_COMPONENT24:E===Fi?z=s.DEPTH_COMPONENT32F:E===Fr&&(z=s.DEPTH_COMPONENT16),z}function S(P,E){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==It&&P.minFilter!==kt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function T(P){let E=P.target;E.removeEventListener("dispose",T),w(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function x(P){let E=P.target;E.removeEventListener("dispose",x),C(E)}function w(P){let E=i.get(P);if(E.__webglInit===void 0)return;let z=P.source,H=p.get(z);if(H){let Y=H[E.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&A(P),Object.keys(H).length===0&&p.delete(z)}i.remove(P)}function A(P){let E=i.get(P);s.deleteTexture(E.__webglTexture);let z=P.source,H=p.get(z);delete H[E.__cacheKey],a.memory.textures--}function C(P){let E=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(E.__webglFramebuffer[H]))for(let Y=0;Y<E.__webglFramebuffer[H].length;Y++)s.deleteFramebuffer(E.__webglFramebuffer[H][Y]);else s.deleteFramebuffer(E.__webglFramebuffer[H]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[H])}else{if(Array.isArray(E.__webglFramebuffer))for(let H=0;H<E.__webglFramebuffer.length;H++)s.deleteFramebuffer(E.__webglFramebuffer[H]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let H=0;H<E.__webglColorRenderbuffer.length;H++)E.__webglColorRenderbuffer[H]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[H]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let z=P.textures;for(let H=0,Y=z.length;H<Y;H++){let he=i.get(z[H]);he.__webglTexture&&(s.deleteTexture(he.__webglTexture),a.memory.textures--),i.remove(z[H])}i.remove(P)}let L=0;function N(){L=0}function D(){return L}function U(P){L=P}function B(){let P=L;return P>=n.maxTextures&&Fe("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+n.maxTextures),L+=1,P}function G(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function ne(P,E){let z=i.get(P);if(P.isVideoTexture&&F(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){let H=P.image;if(H===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{ue(z,P,E);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+E)}function q(P,E){let z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){ue(z,P,E);return}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+E)}function X(P,E){let z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){ue(z,P,E);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+E)}function J(P,E){let z=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&z.__version!==P.version){Ue(z,P,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+E)}let Ee={[hi]:s.REPEAT,[Gi]:s.CLAMP_TO_EDGE,[dr]:s.MIRRORED_REPEAT},ie={[It]:s.NEAREST,[$l]:s.NEAREST_MIPMAP_NEAREST,[Us]:s.NEAREST_MIPMAP_LINEAR,[kt]:s.LINEAR,[Nr]:s.LINEAR_MIPMAP_NEAREST,[an]:s.LINEAR_MIPMAP_LINEAR},ye={[fp]:s.NEVER,[xp]:s.ALWAYS,[pp]:s.LESS,[Uc]:s.LEQUAL,[mp]:s.EQUAL,[Oc]:s.GEQUAL,[gp]:s.GREATER,[bp]:s.NOTEQUAL};function Te(P,E){if(E.type===Fi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===kt||E.magFilter===Nr||E.magFilter===Us||E.magFilter===an||E.minFilter===kt||E.minFilter===Nr||E.minFilter===Us||E.minFilter===an)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,Ee[E.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,Ee[E.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,Ee[E.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,ie[E.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,ie[E.minFilter]),E.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,ye[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===It||E.minFilter!==Us&&E.minFilter!==an||E.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,n.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function ze(P,E){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",T));let H=E.source,Y=p.get(H);Y===void 0&&(Y={},p.set(H,Y));let he=G(E);if(he!==P.__cacheKey){Y[he]===void 0&&(Y[he]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Y[he].usedTimes++;let fe=Y[P.__cacheKey];fe!==void 0&&(Y[P.__cacheKey].usedTimes--,fe.usedTimes===0&&A(E)),P.__cacheKey=he,P.__webglTexture=Y[he].texture}return z}function j(P,E,z){return Math.floor(Math.floor(P/z)/E)}function $(P,E,z,H){let he=P.updateRanges;if(he.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,z,H,E.data);else{he.sort((Le,me)=>Le.start-me.start);let fe=0;for(let Le=1;Le<he.length;Le++){let me=he[fe],pe=he[Le],Ce=me.start+me.count,Ge=j(pe.start,E.width,4),Ye=j(me.start,E.width,4);pe.start<=Ce+1&&Ge===Ye&&j(pe.start+pe.count-1,E.width,4)===Ge?me.count=Math.max(me.count,pe.start+pe.count-me.start):(++fe,he[fe]=pe)}he.length=fe+1;let Z=t.getParameter(s.UNPACK_ROW_LENGTH),te=t.getParameter(s.UNPACK_SKIP_PIXELS),ge=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let Le=0,me=he.length;Le<me;Le++){let pe=he[Le],Ce=Math.floor(pe.start/4),Ge=Math.ceil(pe.count/4),Ye=Ce%E.width,k=Math.floor(Ce/E.width),be=Ge,Q=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(s.UNPACK_SKIP_ROWS,k),t.texSubImage2D(s.TEXTURE_2D,0,Ye,k,be,Q,z,H,E.data)}P.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Z),t.pixelStorei(s.UNPACK_SKIP_PIXELS,te),t.pixelStorei(s.UNPACK_SKIP_ROWS,ge)}}function ue(P,E,z){let H=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(H=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(H=s.TEXTURE_3D);let Y=ze(P,E),he=E.source;t.bindTexture(H,P.__webglTexture,s.TEXTURE0+z);let fe=i.get(he);if(he.version!==fe.__version||Y===!0){if(t.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let Q=et.getPrimaries(et.workingColorSpace),xe=E.colorSpace===Xn?null:et.getPrimaries(E.colorSpace),we=E.colorSpace===Xn||Q===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let te=g(E.image,!1,n.maxTextureSize);te=ut(E,te);let ge=r.convert(E.format,E.colorSpace),Le=r.convert(E.type),me=b(E.internalFormat,ge,Le,E.normalized,E.colorSpace,E.isVideoTexture);Te(H,E);let pe,Ce=E.mipmaps,Ge=E.isVideoTexture!==!0,Ye=fe.__version===void 0||Y===!0,k=he.dataReady,be=S(E,te);if(E.isDepthTexture)me=_(E.format===En,E.type),Ye&&(Ge?t.texStorage2D(s.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,me,te.width,te.height,0,ge,Le,null));else if(E.isDataTexture)if(Ce.length>0){Ge&&Ye&&t.texStorage2D(s.TEXTURE_2D,be,me,Ce[0].width,Ce[0].height);for(let Q=0,xe=Ce.length;Q<xe;Q++)pe=Ce[Q],Ge?k&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,pe.width,pe.height,ge,Le,pe.data):t.texImage2D(s.TEXTURE_2D,Q,me,pe.width,pe.height,0,ge,Le,pe.data);E.generateMipmaps=!1}else Ge?(Ye&&t.texStorage2D(s.TEXTURE_2D,be,me,te.width,te.height),k&&$(E,te,ge,Le)):t.texImage2D(s.TEXTURE_2D,0,me,te.width,te.height,0,ge,Le,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ge&&Ye&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,me,Ce[0].width,Ce[0].height,te.depth);for(let Q=0,xe=Ce.length;Q<xe;Q++)if(pe=Ce[Q],E.format!==yi)if(ge!==null)if(Ge){if(k)if(E.layerUpdates.size>0){let we=Nu(pe.width,pe.height,E.format,E.type);for(let ae of E.layerUpdates){let He=pe.data.subarray(ae*we/pe.data.BYTES_PER_ELEMENT,(ae+1)*we/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,ae,pe.width,pe.height,1,ge,He)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,pe.width,pe.height,te.depth,ge,pe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Q,me,pe.width,pe.height,te.depth,0,pe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?k&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,pe.width,pe.height,te.depth,ge,Le,pe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Q,me,pe.width,pe.height,te.depth,0,ge,Le,pe.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ge&&Ye&&t.texStorage2D(s.TEXTURE_2D,be,me,Ce[0].width,Ce[0].height);for(let Q=0,xe=Ce.length;Q<xe;Q++)pe=Ce[Q],E.format!==yi?ge!==null?Ge?k&&t.compressedTexSubImage2D(s.TEXTURE_2D,Q,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(s.TEXTURE_2D,Q,me,pe.width,pe.height,0,pe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?k&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,pe.width,pe.height,ge,Le,pe.data):t.texImage2D(s.TEXTURE_2D,Q,me,pe.width,pe.height,0,ge,Le,pe.data)}else if(E.isDataArrayTexture)if(Ge){if(Ye&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,me,te.width,te.height,te.depth),k)if(E.layerUpdates.size>0){let Q=Nu(te.width,te.height,E.format,E.type);for(let xe of E.layerUpdates){let we=te.data.subarray(xe*Q/te.data.BYTES_PER_ELEMENT,(xe+1)*Q/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,xe,te.width,te.height,1,ge,Le,we)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ge,Le,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,ge,Le,te.data);else if(E.isData3DTexture)Ge?(Ye&&t.texStorage3D(s.TEXTURE_3D,be,me,te.width,te.height,te.depth),k&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ge,Le,te.data)):t.texImage3D(s.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,ge,Le,te.data);else if(E.isFramebufferTexture){if(Ye)if(Ge)t.texStorage2D(s.TEXTURE_2D,be,me,te.width,te.height);else{let Q=te.width,xe=te.height;for(let we=0;we<be;we++)t.texImage2D(s.TEXTURE_2D,we,me,Q,xe,0,ge,Le,null),Q>>=1,xe>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){let Q=s.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),te.parentNode!==Q){Q.appendChild(te),u.add(E),Q.onpaint=xe=>{let we=xe.changedElements;for(let ae of u)we.includes(ae.image)&&(ae.needsUpdate=!0)},Q.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,te);else{let we=s.RGBA,ae=s.RGBA,He=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,we,ae,He,te)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Ge&&Ye){let Q=Qe(Ce[0]);t.texStorage2D(s.TEXTURE_2D,be,me,Q.width,Q.height)}for(let Q=0,xe=Ce.length;Q<xe;Q++)pe=Ce[Q],Ge?k&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,ge,Le,pe):t.texImage2D(s.TEXTURE_2D,Q,me,ge,Le,pe);E.generateMipmaps=!1}else if(Ge){if(Ye){let Q=Qe(te);t.texStorage2D(s.TEXTURE_2D,be,me,Q.width,Q.height)}k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ge,Le,te)}else t.texImage2D(s.TEXTURE_2D,0,me,ge,Le,te);f(E)&&y(H),fe.__version=he.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Ue(P,E,z){if(E.image.length!==6)return;let H=ze(P,E),Y=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+z);let he=i.get(Y);if(Y.version!==he.__version||H===!0){t.activeTexture(s.TEXTURE0+z);let fe=et.getPrimaries(et.workingColorSpace),Z=E.colorSpace===Xn?null:et.getPrimaries(E.colorSpace),te=E.colorSpace===Xn||fe===Z?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ge=E.isCompressedTexture||E.image[0].isCompressedTexture,Le=E.image[0]&&E.image[0].isDataTexture,me=[];for(let ae=0;ae<6;ae++)!ge&&!Le?me[ae]=g(E.image[ae],!0,n.maxCubemapSize):me[ae]=Le?E.image[ae].image:E.image[ae],me[ae]=ut(E,me[ae]);let pe=me[0],Ce=r.convert(E.format,E.colorSpace),Ge=r.convert(E.type),Ye=b(E.internalFormat,Ce,Ge,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,be=he.__version===void 0||H===!0,Q=Y.dataReady,xe=S(E,pe);Te(s.TEXTURE_CUBE_MAP,E);let we;if(ge){k&&be&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,Ye,pe.width,pe.height);for(let ae=0;ae<6;ae++){we=me[ae].mipmaps;for(let He=0;He<we.length;He++){let De=we[He];E.format!==yi?Ce!==null?k?Q&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He,0,0,De.width,De.height,Ce,De.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He,Ye,De.width,De.height,0,De.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He,0,0,De.width,De.height,Ce,Ge,De.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He,Ye,De.width,De.height,0,Ce,Ge,De.data)}}}else{if(we=E.mipmaps,k&&be){we.length>0&&xe++;let ae=Qe(me[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,Ye,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Le){k?Q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,me[ae].width,me[ae].height,Ce,Ge,me[ae].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,me[ae].width,me[ae].height,0,Ce,Ge,me[ae].data);for(let He=0;He<we.length;He++){let Tt=we[He].image[ae].image;k?Q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He+1,0,0,Tt.width,Tt.height,Ce,Ge,Tt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He+1,Ye,Tt.width,Tt.height,0,Ce,Ge,Tt.data)}}else{k?Q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ce,Ge,me[ae]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,Ce,Ge,me[ae]);for(let He=0;He<we.length;He++){let De=we[He];k?Q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He+1,0,0,Ce,Ge,De.image[ae]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,He+1,Ye,Ce,Ge,De.image[ae])}}}f(E)&&y(s.TEXTURE_CUBE_MAP),he.__version=Y.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Se(P,E,z,H,Y,he){let fe=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),te=b(z.internalFormat,fe,Z,z.normalized,z.colorSpace),ge=i.get(E),Le=i.get(z);if(Le.__renderTarget=E,!ge.__hasExternalTextures){let me=Math.max(1,E.width>>he),pe=Math.max(1,E.height>>he);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?t.texImage3D(Y,he,te,me,pe,E.depth,0,fe,Z,null):t.texImage2D(Y,he,te,me,pe,0,fe,Z,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),Ke(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,H,Y,Le.__webglTexture,0,qe(E)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,H,Y,Le.__webglTexture,he),t.bindFramebuffer(s.FRAMEBUFFER,null)}function We(P,E,z){if(s.bindRenderbuffer(s.RENDERBUFFER,P),E.depthBuffer){let H=E.depthTexture,Y=H&&H.isDepthTexture?H.type:null,he=_(E.stencilBuffer,Y),fe=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ke(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe(E),he,E.width,E.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe(E),he,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,he,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,P)}else{let H=E.textures;for(let Y=0;Y<H.length;Y++){let he=H[Y],fe=r.convert(he.format,he.colorSpace),Z=r.convert(he.type),te=b(he.internalFormat,fe,Z,he.normalized,he.colorSpace);Ke(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe(E),te,E.width,E.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe(E),te,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,te,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function dt(P,E,z){let H=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(E.depthTexture);if(Y.__renderTarget=E,(!Y.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,E.depthTexture.addEventListener("dispose",T)),Y.__webglTexture===void 0){Y.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),Te(s.TEXTURE_CUBE_MAP,E.depthTexture);let ge=r.convert(E.depthTexture.format),Le=r.convert(E.depthTexture.type),me;E.depthTexture.format===gn?me=s.DEPTH_COMPONENT24:E.depthTexture.format===En&&(me=s.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,me,E.width,E.height,0,ge,Le,null)}}else ne(E.depthTexture,0);let he=Y.__webglTexture,fe=qe(E),Z=H?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,te=E.depthTexture.format===En?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===gn)Ke(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,te,Z,he,0,fe):s.framebufferTexture2D(s.FRAMEBUFFER,te,Z,he,0);else if(E.depthTexture.format===En)Ke(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,te,Z,he,0,fe):s.framebufferTexture2D(s.FRAMEBUFFER,te,Z,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(P){let E=i.get(P),z=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){let H=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),H){let Y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),E.__depthDisposeCallback=Y}E.__boundDepthTexture=H}if(P.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let H=0;H<6;H++)dt(E.__webglFramebuffer[H],P,H);else{let H=P.texture.mipmaps;H&&H.length>0?dt(E.__webglFramebuffer[0],P,0):dt(E.__webglFramebuffer,P,0)}else if(z){E.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[H]),E.__webglDepthbuffer[H]===void 0)E.__webglDepthbuffer[H]=s.createRenderbuffer(),We(E.__webglDepthbuffer[H],P,!1);else{let Y=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=E.__webglDepthbuffer[H];s.bindRenderbuffer(s.RENDERBUFFER,he),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,he)}}else{let H=P.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),We(E.__webglDepthbuffer,P,!1);else{let Y=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,he),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,he)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function oe(P,E,z){let H=i.get(P);E!==void 0&&Se(H.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&ee(P)}function le(P){let E=P.texture,z=i.get(P),H=i.get(E);P.addEventListener("dispose",x);let Y=P.textures,he=P.isWebGLCubeRenderTarget===!0,fe=Y.length>1;if(fe||(H.__webglTexture===void 0&&(H.__webglTexture=s.createTexture()),H.__version=E.version,a.memory.textures++),he){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let te=0;te<E.mipmaps.length;te++)z.__webglFramebuffer[Z][te]=s.createFramebuffer()}else z.__webglFramebuffer[Z]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<E.mipmaps.length;Z++)z.__webglFramebuffer[Z]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(fe)for(let Z=0,te=Y.length;Z<te;Z++){let ge=i.get(Y[Z]);ge.__webglTexture===void 0&&(ge.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&Ke(P)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){let te=Y[Z];z.__webglColorRenderbuffer[Z]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let ge=r.convert(te.format,te.colorSpace),Le=r.convert(te.type),me=b(te.internalFormat,ge,Le,te.normalized,te.colorSpace,P.isXRRenderTarget===!0),pe=qe(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,pe,me,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Z,s.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),We(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture),Te(s.TEXTURE_CUBE_MAP,E);for(let Z=0;Z<6;Z++)if(E.mipmaps&&E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)Se(z.__webglFramebuffer[Z][te],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,te);else Se(z.__webglFramebuffer[Z],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);f(E)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let Z=0,te=Y.length;Z<te;Z++){let ge=Y[Z],Le=i.get(ge),me=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(me,Le.__webglTexture),Te(me,ge),Se(z.__webglFramebuffer,P,ge,s.COLOR_ATTACHMENT0+Z,me,0),f(ge)&&y(me)}t.unbindTexture()}else{let Z=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Z=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Z,H.__webglTexture),Te(Z,E),E.mipmaps&&E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)Se(z.__webglFramebuffer[te],P,E,s.COLOR_ATTACHMENT0,Z,te);else Se(z.__webglFramebuffer,P,E,s.COLOR_ATTACHMENT0,Z,0);f(E)&&y(Z),t.unbindTexture()}P.depthBuffer&&ee(P)}function ce(P){let E=P.textures;for(let z=0,H=E.length;z<H;z++){let Y=E[z];if(f(Y)){let he=M(P),fe=i.get(Y).__webglTexture;t.bindTexture(he,fe),y(he),t.unbindTexture()}}}let de=[],Ve=[];function Oe(P){if(P.samples>0){if(Ke(P)===!1){let E=P.textures,z=P.width,H=P.height,Y=s.COLOR_BUFFER_BIT,he=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=i.get(P),Z=E.length>1;if(Z)for(let ge=0;ge<E.length;ge++)t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);let te=P.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ge=0;ge<E.length;ge++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),Z){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,fe.__webglColorRenderbuffer[ge]);let Le=i.get(E[ge]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Le,0)}s.blitFramebuffer(0,0,z,H,0,0,z,H,Y,s.NEAREST),l===!0&&(de.length=0,Ve.length=0,de.push(s.COLOR_ATTACHMENT0+ge),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(de.push(he),Ve.push(he),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ve)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Z)for(let ge=0;ge<E.length;ge++){t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,fe.__webglColorRenderbuffer[ge]);let Le=i.get(E[ge]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,Le,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let E=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function qe(P){return Math.min(n.maxSamples,P.samples)}function Ke(P){let E=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function F(P){let E=a.render.frame;h.get(P)!==E&&(h.set(P,E),P.update())}function ut(P,E){let z=P.colorSpace,H=P.format,Y=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==gi&&z!==Xn&&(et.getTransfer(z)===mt?(H!==yi||Y!==di)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",z)),E}function Qe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=N,this.getTextureUnits=D,this.setTextureUnits=U,this.setTexture2D=ne,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=J,this.rebindTextures=oe,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function v_(s,e){function t(i,n=Xn){let r,a=et.getTransfer(n);if(i===di)return s.UNSIGNED_BYTE;if(i===ec)return s.UNSIGNED_SHORT_4_4_4_4;if(i===tc)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Mu)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Su)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===yu)return s.BYTE;if(i===_u)return s.SHORT;if(i===Fr)return s.UNSIGNED_SHORT;if(i===Ql)return s.INT;if(i===on)return s.UNSIGNED_INT;if(i===Fi)return s.FLOAT;if(i===Yt)return s.HALF_FLOAT;if(i===wu)return s.ALPHA;if(i===Eu)return s.RGB;if(i===yi)return s.RGBA;if(i===gn)return s.DEPTH_COMPONENT;if(i===En)return s.DEPTH_STENCIL;if(i===ic)return s.RED;if(i===nc)return s.RED_INTEGER;if(i===us)return s.RG;if(i===sc)return s.RG_INTEGER;if(i===rc)return s.RGBA_INTEGER;if(i===ho||i===uo||i===fo||i===po)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ho)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ho)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ac||i===oc||i===lc||i===cc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ac)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===lc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===hc||i===uc||i===dc||i===fc||i===pc||i===mo||i===mc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===hc||i===uc)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===dc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===fc)return r.COMPRESSED_R11_EAC;if(i===pc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===mo)return r.COMPRESSED_RG11_EAC;if(i===mc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===gc||i===bc||i===xc||i===vc||i===yc||i===_c||i===Mc||i===Sc||i===wc||i===Ec||i===Tc||i===Ac||i===Rc||i===Cc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===gc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===yc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_c)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ec)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Tc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ac)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pc||i===Ic||i===Dc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Pc)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ic)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lc||i===Nc||i===go||i===Fc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Lc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Nc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===go)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hs?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}var y_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,__=`
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

}`,Ku=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new La(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Dt({vertexShader:y_,fragmentShader:__,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new Va(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yu=class extends bn{constructor(e,t){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,m=null,v=typeof XRWebGLBinding<"u",g=new Ku,f={},y=t.getContextAttributes(),M=null,b=null,_=[],S=[],T=new re,x=null,w=null,A=new qt;A.viewport=new yt;let C=new qt;C.viewport=new yt;let L=[A,C],N=new Kl,D=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let $=_[j];return $===void 0&&($=new xr,_[j]=$),$.getTargetRaySpace()},this.getControllerGrip=function(j){let $=_[j];return $===void 0&&($=new xr,_[j]=$),$.getGripSpace()},this.getHand=function(j){let $=_[j];return $===void 0&&($=new xr,_[j]=$),$.getHandSpace()};function B(j){let $=S.indexOf(j.inputSource);if($===-1)return;let ue=_[$];ue!==void 0&&(ue.update(j.inputSource,j.frame,c||a),ue.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){n.removeEventListener("select",B),n.removeEventListener("selectstart",B),n.removeEventListener("selectend",B),n.removeEventListener("squeeze",B),n.removeEventListener("squeezestart",B),n.removeEventListener("squeezeend",B),n.removeEventListener("end",G),n.removeEventListener("inputsourceschange",ne);for(let j=0;j<_.length;j++){let $=S[j];$!==null&&(S[j]=null,_[j].disconnect($))}D=null,U=null,g.reset();for(let j in f)delete f[j];if(e.setRenderTarget(M),p=null,d=null,u=null,n=null,b=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(T.width,T.height,!1),w!==null){let j=w.camera;j.fov=w.fov,j.zoom=w.zoom,j.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(n,t)),u},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(j){if(n=j,n!==null){if(M=e.getRenderTarget(),n.addEventListener("select",B),n.addEventListener("selectstart",B),n.addEventListener("selectend",B),n.addEventListener("squeeze",B),n.addEventListener("squeezestart",B),n.addEventListener("squeezeend",B),n.addEventListener("end",G),n.addEventListener("inputsourceschange",ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Ue=null,Se=null;y.depth&&(Se=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=y.stencil?En:gn,Ue=y.stencil?hs:on);let We={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(We),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Bt(d.textureWidth,d.textureHeight,{format:yi,type:di,depthTexture:new _n(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ue={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,ue),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Bt(p.framebufferWidth,p.framebufferHeight,{format:yi,type:di,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),ze.setContext(n),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(j){for(let $=0;$<j.removed.length;$++){let ue=j.removed[$],Ue=S.indexOf(ue);Ue>=0&&(S[Ue]=null,_[Ue].disconnect(ue))}for(let $=0;$<j.added.length;$++){let ue=j.added[$],Ue=S.indexOf(ue);if(Ue===-1){for(let We=0;We<_.length;We++)if(We>=S.length){S.push(ue),Ue=We;break}else if(S[We]===null){S[We]=ue,Ue=We;break}if(Ue===-1)break}let Se=_[Ue];Se&&Se.connect(ue)}}let q=new I,X=new I;function J(j,$,ue){q.setFromMatrixPosition($.matrixWorld),X.setFromMatrixPosition(ue.matrixWorld);let Ue=q.distanceTo(X),Se=$.projectionMatrix.elements,We=ue.projectionMatrix.elements,dt=Se[14]/(Se[10]-1),ee=Se[14]/(Se[10]+1),oe=(Se[9]+1)/Se[5],le=(Se[9]-1)/Se[5],ce=(Se[8]-1)/Se[0],de=(We[8]+1)/We[0],Ve=dt*ce,Oe=dt*de,qe=Ue/(-ce+de),Ke=qe*-ce;if($.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ke),j.translateZ(qe),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Se[10]===-1)j.projectionMatrix.copy($.projectionMatrix),j.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let F=dt+qe,ut=ee+qe,Qe=Ve-Ke,P=Oe+(Ue-Ke),E=oe*ee/ut*F,z=le*ee/ut*F;j.projectionMatrix.makePerspective(Qe,P,E,z,F,ut),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Ee(j,$){$===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices($.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(n===null)return;let $=j.near,ue=j.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(ue=g.depthFar)),N.near=C.near=A.near=$,N.far=C.far=A.far=ue,(D!==N.near||U!==N.far)&&(n.updateRenderState({depthNear:N.near,depthFar:N.far}),D=N.near,U=N.far),N.layers.mask=j.layers.mask|6,A.layers.mask=N.layers.mask&-5,C.layers.mask=N.layers.mask&-3;let Ue=j.parent,Se=N.cameras;Ee(N,Ue);for(let We=0;We<Se.length;We++)Ee(Se[We],Ue);Se.length===2?J(N,A,C):N.projectionMatrix.copy(A.projectionMatrix),w===null&&j.isPerspectiveCamera&&(w={camera:j,fov:j.fov,zoom:j.zoom}),ie(j,N,Ue)};function ie(j,$,ue){ue===null?j.matrix.copy($.matrixWorld):(j.matrix.copy(ue.matrixWorld),j.matrix.invert(),j.matrix.multiply($.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy($.projectionMatrix),j.projectionMatrixInverse.copy($.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ws*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(j){return f[j]};let ye=null;function Te(j,$){if(h=$.getViewerPose(c||a),m=$,h!==null){let ue=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Ue=!1;ue.length!==N.cameras.length&&(N.cameras.length=0,Ue=!0);for(let ee=0;ee<ue.length;ee++){let oe=ue[ee],le=null;if(p!==null)le=p.getViewport(oe);else{let de=u.getViewSubImage(d,oe);le=de.viewport,ee===0&&(e.setRenderTargetTextures(b,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(b))}let ce=L[ee];ce===void 0&&(ce=new qt,ce.layers.enable(ee),ce.viewport=new yt,L[ee]=ce),ce.matrix.fromArray(oe.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(oe.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(le.x,le.y,le.width,le.height),ee===0&&(N.matrix.copy(ce.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ue===!0&&N.cameras.push(ce)}let Se=n.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&v){u=i.getBinding();let ee=u.getDepthInformation(ue[0]);ee&&ee.isValid&&ee.texture&&g.init(ee,n.renderState)}if(Se&&Se.includes("camera-access")&&v){e.state.unbindTexture(),u=i.getBinding();for(let ee=0;ee<ue.length;ee++){let oe=ue[ee].camera;if(oe){let le=f[oe];le||(le=new La,f[oe]=le);let ce=u.getCameraImage(oe);le.sourceTexture=ce}}}}for(let ue=0;ue<_.length;ue++){let Ue=S[ue],Se=_[ue];Ue!==null&&Se!==void 0&&Se.update(Ue,$,c||a)}ye&&ye(j,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),m=null}let ze=new Zp;ze.setAnimationLoop(Te),this.setAnimationLoop=function(j){ye=j},this.dispose=function(){}}},M_=new ke,nm=new $e;nm.set(-1,0,0,0,1,0,0,0,1);function S_(s,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Iu(s)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function n(g,f,y,M,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),u(g,f)):f.isMeshPhongMaterial?(r(g,f),h(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),d(g,f),f.isMeshPhysicalMaterial&&p(g,f,b)):f.isMeshMatcapMaterial?(r(g,f),m(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),v(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,y,M):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===si&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===si&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let y=e.get(f),M=y.envMap,b=y.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(M_.makeRotationFromEuler(b)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(nm),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,y,M){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*y,g.scale.value=M*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function u(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function d(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,y){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===si&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.retroreflectivity>0&&(g.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function v(g,f){let y=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function w_(s,e,t,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){let S=_.program;i.uniformBlockBinding(b,S)}function c(b,_){let S=n[b.id];S===void 0&&(g(b),S=h(b),n[b.id]=S,b.addEventListener("dispose",y));let T=_.program;i.updateUBOMapping(b,T);let x=e.render.frame;r[b.id]!==x&&(d(b),r[b.id]=x)}function h(b){let _=u();b.__bindingPointIndex=_;let S=s.createBuffer(),T=b.__size,x=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,T,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,S),S}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let _=n[b.id],S=b.uniforms,T=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let x=0,w=S.length;x<w;x++){let A=S[x];if(Array.isArray(A))for(let C=0,L=A.length;C<L;C++)p(A[C],x,C,T);else p(A,x,0,T)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(b,_,S,T){if(v(b,_,S,T)===!0){let x=b.__offset,w=b.value;if(Array.isArray(w)){let A=0;for(let C=0;C<w.length;C++){let L=w[C],N=f(L);m(L,b.__data,A),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(A+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,b.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,b.__data)}}function m(b,_,S){typeof b=="number"||typeof b=="boolean"?_[0]=b:b.isMatrix3?(_[0]=b.elements[0],_[1]=b.elements[1],_[2]=b.elements[2],_[3]=0,_[4]=b.elements[3],_[5]=b.elements[4],_[6]=b.elements[5],_[7]=0,_[8]=b.elements[6],_[9]=b.elements[7],_[10]=b.elements[8],_[11]=0):ArrayBuffer.isView(b)?_.set(new b.constructor(b.buffer,b.byteOffset,_.length)):b.toArray(_,S)}function v(b,_,S,T){let x=b.value,w=_+"_"+S;if(T[w]===void 0)return typeof x=="number"||typeof x=="boolean"?T[w]=x:ArrayBuffer.isView(x)?T[w]=x.slice():T[w]=x.clone(),!0;{let A=T[w];if(typeof x=="number"||typeof x=="boolean"){if(A!==x)return T[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(A.equals(x)===!1)return A.copy(x),!0}}return!1}function g(b){let _=b.uniforms,S=0,T=16;for(let w=0,A=_.length;w<A;w++){let C=Array.isArray(_[w])?_[w]:[_[w]];for(let L=0,N=C.length;L<N;L++){let D=C[L],U=Array.isArray(D.value)?D.value:[D.value];for(let B=0,G=U.length;B<G;B++){let ne=U[B],q=f(ne),X=S%T,J=X%q.boundary,Ee=X+J;S+=J,Ee!==0&&T-Ee<q.storage&&(S+=T-Ee),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=q.storage}}}let x=S%T;return x>0&&(S+=T-x),b.__size=S,b.__cache={},this}function f(b){let _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(_.boundary=16,_.storage=b.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",b),_}function y(b){let _=b.target;_.removeEventListener("dispose",y);let S=a.indexOf(_.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(n[_.id]),delete n[_.id],delete r[_.id]}function M(){for(let b in n)s.deleteBuffer(n[b]);a=[],n={},r={}}return{bind:l,update:c,dispose:M}}var E_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Tn=null;function T_(){return Tn===null&&(Tn=new xn(E_,16,16,us,Yt),Tn.name="DFG_LUT",Tn.minFilter=kt,Tn.magFilter=kt,Tn.wrapS=Gi,Tn.wrapT=Gi,Tn.generateMipmaps=!1,Tn.needsUpdate=!0),Tn}var zc=class{constructor(e={}){let{canvas:t=vp(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:p=di}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let v=p,g=new Set([rc,sc,nc]),f=new Set([di,on,Fr,hs,ec,tc]),y=new Uint32Array(4),M=new Int32Array(4),b=new I,_=null,S=null,T=[],x=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,C=!1,L=null,N=null,D=null,U=null;this._outputColorSpace=Lt;let B=0,G=0,ne=null,q=-1,X=null,J=new yt,Ee=new yt,ie=null,ye=new Be(0),Te=0,ze=t.width,j=t.height,$=1,ue=null,Ue=null,Se=new yt(0,0,ze,j),We=new yt(0,0,ze,j),dt=!1,ee=new vn,oe=!1,le=!1,ce=new ke,de=new I,Ve=new yt,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function Ke(){return ne===null?$:1}let F=i;function ut(R,O){return t.getContext(R,O)}let Qe,P,E,z,H,Y,he,fe,Z,te,ge,Le,me,pe,Ce,Ge,Ye,k,be,Q,xe,we,ae;try{let R={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",bt,!1),t.addEventListener("webglcontextcreationerror",Ki,!1),F===null){let O="webgl2";if(F=ut(O,R),F===null)throw ut(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}He()}catch(R){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",bt,!1),t.removeEventListener("webglcontextcreationerror",Ki,!1),Xe("WebGLRenderer: "+R.message),R}function He(){Qe=new Lv(F),Qe.init(),xe=new v_(F,Qe),P=new Sv(F,Qe,e,xe),E=new b_(F,Qe),P.reversedDepthBuffer&&d&&E.buffers.depth.setReversed(!0),N=F.createFramebuffer(),D=F.createFramebuffer(),U=F.createFramebuffer(),z=new Uv(F),H=new n_,Y=new x_(F,Qe,E,H,P,xe,z),he=new Dv(A),fe=new k0(F),we=new _v(F,fe),Z=new Nv(F,fe,z,we),te=new kv(F,Z,fe,we,z),k=new Ov(F,P,Y),Ce=new wv(H),ge=new i_(A,he,Qe,P,we,Ce),Le=new S_(A,H),me=new r_,pe=new u_(Qe),Ye=new yv(A,he,E,te,m,l),Ge=new g_(A,te,P),ae=new w_(F,z,P,E),be=new Mv(F,Qe,z),Q=new Fv(F,Qe,z),z.programs=ge.programs,A.capabilities=P,A.extensions=Qe,A.properties=H,A.renderLists=me,A.shadowMap=Ge,A.state=E,A.info=z}v!==di&&(w=new zv(v,t.width,t.height,o,n,r));let De=new Yu(A,F);this.xr=De,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let R=Qe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Qe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(R){R!==void 0&&($=R,this.setSize(ze,j,!1))},this.getSize=function(R){return R.set(ze,j)},this.setSize=function(R,O,K=!0){if(De.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ze=R,j=O,t.width=Math.floor(R*$),t.height=Math.floor(O*$),K===!0&&(t.style.width=R+"px",t.style.height=O+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,R,O)},this.getDrawingBufferSize=function(R){return R.set(ze*$,j*$).floor()},this.setDrawingBufferSize=function(R,O,K){ze=R,j=O,$=K,t.width=Math.floor(R*K),t.height=Math.floor(O*K),this.setViewport(0,0,R,O)},this.setEffects=function(R){if(v===di){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let O=0;O<R.length;O++)if(R[O].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(J)},this.getViewport=function(R){return R.copy(Se)},this.setViewport=function(R,O,K,V){R.isVector4?Se.set(R.x,R.y,R.z,R.w):Se.set(R,O,K,V),E.viewport(J.copy(Se).multiplyScalar($).round())},this.getScissor=function(R){return R.copy(We)},this.setScissor=function(R,O,K,V){R.isVector4?We.set(R.x,R.y,R.z,R.w):We.set(R,O,K,V),E.scissor(Ee.copy(We).multiplyScalar($).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(R){E.setScissorTest(dt=R)},this.setOpaqueSort=function(R){ue=R},this.setTransparentSort=function(R){Ue=R},this.getClearColor=function(R){return R.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(R=!0,O=!0,K=!0){let V=0;if(R){let W=!1;if(ne!==null){let Me=ne.texture.format;W=g.has(Me)}if(W){let Me=ne.texture.type,Re=f.has(Me),_e=Ye.getClearColor(),Pe=Ye.getClearAlpha(),Ne=_e.r,it=_e.g,ct=_e.b;Re?(y[0]=Ne,y[1]=it,y[2]=ct,y[3]=Pe,F.clearBufferuiv(F.COLOR,0,y)):(M[0]=Ne,M[1]=it,M[2]=ct,M[3]=Pe,F.clearBufferiv(F.COLOR,0,M))}else V|=F.COLOR_BUFFER_BIT}O&&(V|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(V|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&F.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),L=R},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",bt,!1),t.removeEventListener("webglcontextcreationerror",Ki,!1),Ye.dispose(),me.dispose(),pe.dispose(),H.dispose(),he.dispose(),te.dispose(),we.dispose(),ae.dispose(),ge.dispose(),De.dispose(),De.removeEventListener("sessionstart",Hd),De.removeEventListener("sessionend",Vd),gs.stop()};function Tt(R){R.preventDefault(),_a("WebGLRenderer: Context Lost."),C=!0}function bt(){_a("WebGLRenderer: Context Restored."),C=!1;let R=z.autoReset,O=Ge.enabled,K=Ge.autoUpdate,V=Ge.needsUpdate,W=Ge.type;He(),z.autoReset=R,Ge.enabled=O,Ge.autoUpdate=K,Ge.needsUpdate=V,Ge.type=W}function Ki(R){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function un(R){let O=R.target;O.removeEventListener("dispose",un),Qm(O)}function Qm(R){eg(R),H.remove(R)}function eg(R){let O=H.get(R).programs;O!==void 0&&(O.forEach(function(K){ge.releaseProgram(K)}),R.isShaderMaterial&&ge.releaseShaderCache(R))}this.renderBufferDirect=function(R,O,K,V,W,Me){O===null&&(O=Oe);let Re=W.isMesh&&W.matrixWorld.determinantAffine()<0,_e=ng(R,O,K,V,W);E.setMaterial(V,Re);let Pe=K.index,Ne=1;if(V.wireframe===!0){if(Pe=Z.getWireframeAttribute(K),Pe===void 0)return;Ne=2}let it=K.drawRange,ct=K.attributes.position,Ie=it.start*Ne,xt=(it.start+it.count)*Ne;Me!==null&&(Ie=Math.max(Ie,Me.start*Ne),xt=Math.min(xt,(Me.start+Me.count)*Ne)),Pe!==null?(Ie=Math.max(Ie,0),xt=Math.min(xt,Pe.count)):ct!=null&&(Ie=Math.max(Ie,0),xt=Math.min(xt,ct.count));let Vt=xt-Ie;if(Vt<0||Vt===1/0)return;we.setup(W,V,_e,K,Pe);let Ct,St=be;if(Pe!==null&&(Ct=fe.get(Pe),St=Q,St.setIndex(Ct)),W.isMesh)V.wireframe===!0?(E.setLineWidth(V.wireframeLinewidth*Ke()),St.setMode(F.LINES)):St.setMode(F.TRIANGLES);else if(W.isLine){let oi=V.linewidth;oi===void 0&&(oi=1),E.setLineWidth(oi*Ke()),W.isLineSegments?St.setMode(F.LINES):W.isLineLoop?St.setMode(F.LINE_LOOP):St.setMode(F.LINE_STRIP)}else W.isPoints?St.setMode(F.POINTS):W.isSprite&&St.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))St.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let oi=W._multiDrawStarts,Ae=W._multiDrawCounts,pi=W._multiDrawCount,ft=Pe?fe.get(Pe).bytesPerElement:1,Bi=H.get(V).currentProgram.getUniforms();for(let dn=0;dn<pi;dn++)Bi.setValue(F,"_gl_DrawID",dn),St.render(oi[dn]/ft,Ae[dn])}else if(W.isInstancedMesh)St.renderInstances(Ie,Vt,W.count);else if(K.isInstancedBufferGeometry){let oi=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ae=Math.min(K.instanceCount,oi);St.renderInstances(Ie,Vt,Ae)}else St.render(Ie,Vt)};function Gd(R,O,K,V){L!==null&&R.isNodeMaterial&&L.setObject(V,R),oe===!0&&Ce.setState(R,K,!1),R.transparent===!0&&R.side===Rt&&R.forceSinglePass===!1?(R.side=si,R.needsUpdate=!0,Vo(R,O,V),R.side=Vi,R.needsUpdate=!0,Vo(R,O,V),R.side=Rt):Vo(R,O,V)}this.compile=function(R,O,K=null){K===null&&(K=R),L!==null&&L.renderStart(R,O,K),S=pe.get(K),S.init(O),x.push(S),K.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),R!==K&&R.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),S.setupLights(),L!==null&&L.updateLights(S.state.lightsArray),le=this.localClippingEnabled,oe=Ce.init(this.clippingPlanes,le),oe===!0&&Ce.setGlobalState(this.clippingPlanes,O),L!==null&&Ge.render(S.state.shadowsArray,K,O);let V=new Set;return R.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let Me=W.material;if(Me)if(Array.isArray(Me))for(let Re=0;Re<Me.length;Re++){let _e=Me[Re];Gd(_e,K,O,W),V.add(_e)}else Gd(Me,K,O,W),V.add(Me)}),S=x.pop(),L!==null&&L.renderEnd(),V},this.compileAsync=function(R,O,K=null){let V=this.compile(R,O,K);return new Promise(W=>{function Me(){if(V.forEach(function(Re){let Pe=H.get(Re).currentProgram;(Pe===void 0||Pe.isReady())&&V.delete(Re)}),V.size===0){W(R);return}setTimeout(Me,10)}Qe.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let _h=null;function tg(R){_h&&_h(R)}function Hd(){gs.stop()}function Vd(){gs.start()}let gs=new Zp;gs.setAnimationLoop(tg),typeof self<"u"&&gs.setContext(self),this.setAnimationLoop=function(R){_h=R,De.setAnimationLoop(R),R===null?gs.stop():gs.start()},De.addEventListener("sessionstart",Hd),De.addEventListener("sessionend",Vd),this.render=function(R,O){if(O!==void 0&&O.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;L!==null&&L.renderStart(R,O);let K=De.enabled===!0&&De.isPresenting===!0,V=w!==null&&(ne===null||K)&&w.begin(A,ne);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(O),O=De.getCamera()),R.isScene===!0&&R.onBeforeRender(A,R,O,ne),S=pe.get(R,x.length),S.init(O),S.state.textureUnits=Y.getTextureUnits(),x.push(S),ce.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ee.setFromProjectionMatrix(ce,en,O.reversedDepth),le=this.localClippingEnabled,oe=Ce.init(this.clippingPlanes,le),_=me.get(R,T.length),_.init(),T.push(_),De.enabled===!0&&De.isPresenting===!0){let Re=A.xr.getDepthSensingMesh();Re!==null&&Mh(Re,O,-1/0,A.sortObjects)}Mh(R,O,0,A.sortObjects),_.finish(),L!==null&&L.updateLights(S.state.lightsArray),A.sortObjects===!0&&_.sort(ue,Ue),qe=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,qe&&Ye.addToRenderList(_,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&Ce.beginShadows();let W=S.state.shadowsArray;if(Ge.render(W,R,O),oe===!0&&Ce.endShadows(),(V&&w.hasRenderPass())===!1){let Re=_.opaque,_e=_.transmissive;if(S.setupLights(),O.isArrayCamera){let Pe=O.cameras;if(_e.length>0)for(let Ne=0,it=Pe.length;Ne<it;Ne++){let ct=Pe[Ne];qd(Re,_e,R,ct)}qe&&Ye.render(R);for(let Ne=0,it=Pe.length;Ne<it;Ne++){let ct=Pe[Ne];Wd(_,R,ct,ct.viewport)}}else _e.length>0&&qd(Re,_e,R,O),qe&&Ye.render(R),Wd(_,R,O)}ne!==null&&G===0&&(Y.updateMultisampleRenderTarget(ne),Y.updateRenderTargetMipmap(ne)),V&&w.end(A),R.isScene===!0&&R.onAfterRender(A,R,O),we.resetDefaultState(),q=-1,X=null,x.pop(),x.length>0?(S=x[x.length-1],Y.setTextureUnits(S.state.textureUnits),oe===!0&&Ce.setGlobalState(A.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?_=T[T.length-1]:_=null,L!==null&&L.renderEnd()};function Mh(R,O,K,V){if(R.visible===!1)return;if(R.layers.test(O.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(O);else if(R.isLightProbeGrid)S.pushLightProbeGrid(R);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(ee)){V&&Ve.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ce);let Re=te.update(R),_e=R.material;_e.visible&&_.push(R,Re,_e,K,Ve.z,null,O)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(ee))){let Re=te.update(R),_e=R.material;if(V&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ve.copy(R.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Ve.copy(Re.boundingSphere.center)),Ve.applyMatrix4(R.matrixWorld).applyMatrix4(ce)),Array.isArray(_e)){let Pe=Re.groups;for(let Ne=0,it=Pe.length;Ne<it;Ne++){let ct=Pe[Ne],Ie=_e[ct.materialIndex];Ie&&Ie.visible&&_.push(R,Re,Ie,K,Ve.z,ct,O)}}else _e.visible&&_.push(R,Re,_e,K,Ve.z,null,O)}}let Me=R.children;for(let Re=0,_e=Me.length;Re<_e;Re++)Mh(Me[Re],O,K,V)}function Wd(R,O,K,V){let{opaque:W,transmissive:Me,transparent:Re}=R;S.setupLightsView(K),oe===!0&&Ce.setGlobalState(A.clippingPlanes,K),V&&E.viewport(J.copy(V)),W.length>0&&Ho(W,O,K),Me.length>0&&Ho(Me,O,K),Re.length>0&&Ho(Re,O,K),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function qd(R,O,K,V){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[V.id]===void 0){let Ie=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[V.id]=new Bt(1,1,{generateMipmaps:!0,type:Ie?Yt:di,minFilter:an,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}let Me=S.state.transmissionRenderTarget[V.id],Re=V.viewport||J;Me.setSize(Re.z*A.transmissionResolutionScale,Re.w*A.transmissionResolutionScale);let _e=A.getRenderTarget(),Pe=A.getActiveCubeFace(),Ne=A.getActiveMipmapLevel();A.setRenderTarget(Me),A.getClearColor(ye),Te=A.getClearAlpha(),Te<1&&A.setClearColor(16777215,.5),A.clear(),qe&&Ye.render(K);let it=A.toneMapping;A.toneMapping=rn;let ct=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),oe===!0&&Ce.setGlobalState(A.clippingPlanes,V),Ho(R,K,V),Y.updateMultisampleRenderTarget(Me),Y.updateRenderTargetMipmap(Me),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let xt=0,Vt=O.length;xt<Vt;xt++){let Ct=O[xt],{object:St,geometry:oi,material:Ae,group:pi}=Ct;if(Ae.side===Rt&&St.layers.test(V.layers)){let ft=Ae.side;Ae.side=si,Ae.needsUpdate=!0,Xd(St,K,V,oi,Ae,pi),Ae.side=ft,Ae.needsUpdate=!0,Ie=!0}}Ie===!0&&(Y.updateMultisampleRenderTarget(Me),Y.updateRenderTargetMipmap(Me))}A.setRenderTarget(_e,Pe,Ne),A.setClearColor(ye,Te),ct!==void 0&&(V.viewport=ct),A.toneMapping=it}function Ho(R,O,K){let V=O.isScene===!0?O.overrideMaterial:null;for(let W=0,Me=R.length;W<Me;W++){let Re=R[W],{object:_e,geometry:Pe,group:Ne}=Re,it=Re.material;it.allowOverride===!0&&V!==null&&(it=V),_e.layers.test(K.layers)&&Xd(_e,O,K,Pe,it,Ne)}}function Xd(R,O,K,V,W,Me){L!==null&&W.isNodeMaterial&&L.setObject(R,W),R.onBeforeRender(A,O,K,V,W,Me),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),W.onBeforeRender(A,O,K,V,R,Me),W.transparent===!0&&W.side===Rt&&W.forceSinglePass===!1?(W.side=si,W.needsUpdate=!0,A.renderBufferDirect(K,O,V,W,R,Me),W.side=Vi,W.needsUpdate=!0,A.renderBufferDirect(K,O,V,W,R,Me),W.side=Rt):A.renderBufferDirect(K,O,V,W,R,Me),R.onAfterRender(A,O,K,V,W,Me)}function Vo(R,O,K){O.isScene!==!0&&(O=Oe);let V=H.get(R),W=S.state.lights,Me=S.state.shadowsArray,Re=W.state.version,_e=ge.getParameters(R,W.state,Me,O,K,S.state.lightProbeGridArray),Pe=ge.getProgramCacheKey(_e),Ne=V.programs;V.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;let it=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;V.envMap=he.get(R.envMap||V.environment,it),V.envMapRotation=V.environment!==null&&R.envMap===null?O.environmentRotation:R.envMapRotation,Ne===void 0&&(R.addEventListener("dispose",un),Ne=new Map,V.programs=Ne);let ct=Ne.get(Pe);if(ct!==void 0){if(V.currentProgram===ct&&V.lightsStateVersion===Re)return Kd(R,_e),ct}else _e.uniforms=ge.getUniforms(R),L!==null&&R.isNodeMaterial&&L.build(R,K,_e),R.onBeforeCompile(_e,A),ct=ge.acquireProgram(_e,Pe),Ne.set(Pe,ct),V.uniforms=_e.uniforms;let Ie=V.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ie.clippingPlanes=Ce.uniform),Kd(R,_e),V.needsLights=rg(R),V.lightsStateVersion=Re,V.needsLights&&(Ie.ambientLightColor.value=W.state.ambient,Ie.lightProbe.value=W.state.probe,Ie.sunLights.value=W.state.sun,Ie.sunLightShadows.value=W.state.sunShadow,Ie.directionalLights.value=W.state.directional,Ie.directionalLightShadows.value=W.state.directionalShadow,Ie.spotLights.value=W.state.spot,Ie.spotLightShadows.value=W.state.spotShadow,Ie.rectAreaLights.value=W.state.rectArea,Ie.ltc_1.value=W.state.rectAreaLTC1,Ie.ltc_2.value=W.state.rectAreaLTC2,Ie.pointLights.value=W.state.point,Ie.pointLightShadows.value=W.state.pointShadow,Ie.hemisphereLights.value=W.state.hemi,Ie.sunShadowMatrix.value=W.state.sunShadowMatrix,Ie.sunShadowCascade.value=W.state.sunShadowCascade,Ie.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ie.spotLightMatrix.value=W.state.spotLightMatrix,Ie.spotLightMap.value=W.state.spotLightMap,Ie.pointShadowMatrix.value=W.state.pointShadowMatrix),V.lightProbeGrid=S.state.lightProbeGridArray.length>0,V.currentProgram=ct,V.uniformsList=null,ct}function jd(R){if(R.uniformsList===null){let O=R.currentProgram.getUniforms();R.uniformsList=Br.seqWithValue(O.seq,R.uniforms)}return R.uniformsList}function Kd(R,O){let K=H.get(R);K.outputColorSpace=O.outputColorSpace,K.batching=O.batching,K.batchingColor=O.batchingColor,K.instancing=O.instancing,K.instancingColor=O.instancingColor,K.instancingMorph=O.instancingMorph,K.skinning=O.skinning,K.morphTargets=O.morphTargets,K.morphNormals=O.morphNormals,K.morphColors=O.morphColors,K.morphTargetsCount=O.morphTargetsCount,K.numClippingPlanes=O.numClippingPlanes,K.numIntersection=O.numClipIntersection,K.vertexAlphas=O.vertexAlphas,K.vertexTangents=O.vertexTangents,K.toneMapping=O.toneMapping}function ig(R,O){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;b.setFromMatrixPosition(O.matrixWorld);for(let K=0,V=R.length;K<V;K++){let W=R[K];if(W.texture!==null&&W.boundingBox.containsPoint(b))return W}return null}function ng(R,O,K,V,W){O.isScene!==!0&&(O=Oe),Y.resetTextureUnits();let Me=O.fog,Re=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,_e=ne===null?A.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:et.workingColorSpace,Pe=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ne=he.get(V.envMap||Re,Pe),it=V.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ct=!!K.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ie=!!K.morphAttributes.position,xt=!!K.morphAttributes.normal,Vt=!!K.morphAttributes.color,Ct=rn;V.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ct=A.toneMapping);let St=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,oi=St!==void 0?St.length:0,Ae=H.get(V),pi=S.state.lights;if(oe===!0&&(le===!0||R!==X)){let At=R===X&&V.id===q;Ce.setState(V,R,At)}let ft=!1;V.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==pi.state.version||Ae.outputColorSpace!==_e||W.isBatchedMesh&&Ae.batching===!1||!W.isBatchedMesh&&Ae.batching===!0||W.isBatchedMesh&&Ae.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ae.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ae.instancing===!1||!W.isInstancedMesh&&Ae.instancing===!0||W.isSkinnedMesh&&Ae.skinning===!1||!W.isSkinnedMesh&&Ae.skinning===!0||W.isInstancedMesh&&Ae.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ae.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ae.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ae.instancingMorph===!1&&W.morphTexture!==null||Ae.envMap!==Ne||V.fog===!0&&Ae.fog!==Me||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Ce.numPlanes||Ae.numIntersection!==Ce.numIntersection)||Ae.vertexAlphas!==it||Ae.vertexTangents!==ct||Ae.morphTargets!==Ie||Ae.morphNormals!==xt||Ae.morphColors!==Vt||Ae.toneMapping!==Ct||Ae.morphTargetsCount!==oi||!!Ae.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ae.__version=V.version);let Bi=Ae.currentProgram;ft===!0&&(Bi=Vo(V,O,W),L&&V.isNodeMaterial&&L.onUpdateProgram(V,Bi,Ae));let dn=!1,Jn=!1,Ks=!1,_t=Bi.getUniforms(),Ot=Ae.uniforms;if(E.useProgram(Bi.program)&&(dn=!0,Jn=!0,Ks=!0),V.id!==q&&(q=V.id,Jn=!0),Ae.needsLights){let At=ig(S.state.lightProbeGridArray,W);Ae.lightProbeGrid!==At&&(Ae.lightProbeGrid=At,Jn=!0)}if(dn||X!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),_t.setValue(F,"projectionMatrix",R.projectionMatrix),_t.setValue(F,"viewMatrix",R.matrixWorldInverse);let $n=_t.map.cameraPosition;$n!==void 0&&$n.setValue(F,de.setFromMatrixPosition(R.matrixWorld)),P.logarithmicDepthBuffer&&_t.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&_t.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),X!==R&&(X=R,Jn=!0,Ks=!0)}if(Ae.needsLights&&(pi.state.sunShadowMap.length>0&&_t.setValue(F,"sunShadowMap",pi.state.sunShadowMap,Y),pi.state.directionalShadowMap.length>0&&_t.setValue(F,"directionalShadowMap",pi.state.directionalShadowMap,Y),pi.state.spotShadowMap.length>0&&_t.setValue(F,"spotShadowMap",pi.state.spotShadowMap,Y),pi.state.pointShadowMap.length>0&&_t.setValue(F,"pointShadowMap",pi.state.pointShadowMap,Y)),W.isSkinnedMesh){_t.setOptional(F,W,"bindMatrix"),_t.setOptional(F,W,"bindMatrixInverse");let At=W.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),_t.setValue(F,"boneTexture",At.boneTexture,Y))}W.isBatchedMesh&&(_t.setOptional(F,W,"batchingTexture"),_t.setValue(F,"batchingTexture",W._matricesTexture,Y),_t.setOptional(F,W,"batchingIdTexture"),_t.setValue(F,"batchingIdTexture",W._indirectTexture,Y),_t.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&_t.setValue(F,"batchingColorTexture",W._colorsTexture,Y));let Zn=K.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&k.update(W,K,Bi),(Jn||Ae.receiveShadow!==W.receiveShadow)&&(Ae.receiveShadow=W.receiveShadow,_t.setValue(F,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&(Ot.envMapIntensity.value=O.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=T_()),Jn){if(_t.setValue(F,"toneMappingExposure",A.toneMappingExposure),Ae.needsLights&&sg(Ot,Ks),Me&&V.fog===!0&&Le.refreshFogUniforms(Ot,Me),Le.refreshMaterialUniforms(Ot,V,$,j,S.state.transmissionRenderTarget[R.id]),Ae.needsLights&&Ae.lightProbeGrid){let At=Ae.lightProbeGrid;Ot.probesSH.value=At.texture,Ot.probesMin.value.copy(At.boundingBox.min),Ot.probesMax.value.copy(At.boundingBox.max),Ot.probesResolution.value.copy(At.resolution)}Br.upload(F,jd(Ae),Ot,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Br.upload(F,jd(Ae),Ot,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&_t.setValue(F,"center",W.center),_t.setValue(F,"modelViewMatrix",W.modelViewMatrix),_t.setValue(F,"normalMatrix",W.normalMatrix),_t.setValue(F,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){let At=V.uniformsGroups;for(let $n=0,Ys=At.length;$n<Ys;$n++){let Jd=At[$n];ae.update(Jd,Bi),ae.bind(Jd,Bi)}}return Bi}function sg(R,O){R.ambientLightColor.needsUpdate=O,R.lightProbe.needsUpdate=O,R.sunLights.needsUpdate=O,R.sunLightShadows.needsUpdate=O,R.directionalLights.needsUpdate=O,R.directionalLightShadows.needsUpdate=O,R.pointLights.needsUpdate=O,R.pointLightShadows.needsUpdate=O,R.spotLights.needsUpdate=O,R.spotLightShadows.needsUpdate=O,R.rectAreaLights.needsUpdate=O,R.hemisphereLights.needsUpdate=O}function rg(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(R,O,K){let V=H.get(R);V.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),H.get(R.texture).__webglTexture=O,H.get(R.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:K,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,O){let K=H.get(R);K.__webglFramebuffer=O,K.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(R,O=0,K=0){ne=R,B=O,G=K;let V=null,W=!1,Me=!1;if(R){let _e=H.get(R);if(_e.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(F.FRAMEBUFFER,_e.__webglFramebuffer),J.copy(R.viewport),Ee.copy(R.scissor),ie=R.scissorTest,E.viewport(J),E.scissor(Ee),E.setScissorTest(ie),q=-1;return}else if(_e.__webglFramebuffer===void 0)Y.setupRenderTarget(R);else if(_e.__hasExternalTextures)Y.rebindTextures(R,H.get(R.texture).__webglTexture,H.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let it=R.depthTexture;if(_e.__boundDepthTexture!==it){if(it!==null&&H.has(it)&&(R.width!==it.image.width||R.height!==it.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(R)}}let Pe=R.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(Me=!0);let Ne=H.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ne[O])?V=Ne[O][K]:V=Ne[O],W=!0):R.samples>0&&Y.useMultisampledRTT(R)===!1?V=H.get(R).__webglMultisampledFramebuffer:Array.isArray(Ne)?V=Ne[K]:V=Ne,J.copy(R.viewport),Ee.copy(R.scissor),ie=R.scissorTest}else J.copy(Se).multiplyScalar($).floor(),Ee.copy(We).multiplyScalar($).floor(),ie=dt;if(K!==0&&(V=N),E.bindFramebuffer(F.FRAMEBUFFER,V)&&E.drawBuffers(R,V),E.viewport(J),E.scissor(Ee),E.setScissorTest(ie),W){let _e=H.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,_e.__webglTexture,K)}else if(Me){let _e=O;for(let Pe=0;Pe<R.textures.length;Pe++){let Ne=H.get(R.textures[Pe]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Pe,Ne.__webglTexture,K,_e)}}else if(R!==null&&K!==0){let _e=H.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,_e.__webglTexture,K)}q=-1};function Yd(R){let O=H.get(R);return(O.__readFormat!==R.format||O.__readType!==R.type)&&(O.__readFormat=R.format,O.__readType=R.type,O.__formatReadable=P.textureFormatReadable(R.format),O.__typeReadable=P.textureTypeReadable(R.type)),O}this.readRenderTargetPixels=function(R,O,K,V,W,Me,Re,_e=0){if(!(R&&R.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=H.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Re!==void 0&&(Pe=Pe[Re]),Pe){E.bindFramebuffer(F.FRAMEBUFFER,Pe);try{let Ne=R.textures[_e],it=Ne.format,ct=Ne.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+_e);let Ie=Yd(Ne);if(Ie.__formatReadable===!1){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=R.width-V&&K>=0&&K<=R.height-W&&F.readPixels(O,K,V,W,xe.convert(it),xe.convert(ct),Me)}finally{let Ne=ne!==null?H.get(ne).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(R,O,K,V,W,Me,Re,_e=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=H.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Re!==void 0&&(Pe=Pe[Re]),Pe)if(O>=0&&O<=R.width-V&&K>=0&&K<=R.height-W){E.bindFramebuffer(F.FRAMEBUFFER,Pe);let Ne=R.textures[_e],it=Ne.format,ct=Ne.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+_e);let Ie=Yd(Ne);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,xt),F.bufferData(F.PIXEL_PACK_BUFFER,Me.byteLength,F.STREAM_READ),F.readPixels(O,K,V,W,xe.convert(it),xe.convert(ct),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Vt=ne!==null?H.get(ne).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,Vt);let Ct=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await _p(F,Ct,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,xt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Me),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(xt),F.deleteSync(Ct),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,O=null,K=0){let V=Math.pow(2,-K),W=Math.floor(R.image.width*V),Me=Math.floor(R.image.height*V),Re=O!==null?O.x:0,_e=O!==null?O.y:0;Y.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,Re,_e,W,Me),E.unbindTexture()},this.copyTextureToTexture=function(R,O,K=null,V=null,W=0,Me=0){let Re,_e,Pe,Ne,it,ct,Ie,xt,Vt,Ct=R.isCompressedTexture?R.mipmaps[Me]:R.image;if(K!==null)Re=K.max.x-K.min.x,_e=K.max.y-K.min.y,Pe=K.isBox3?K.max.z-K.min.z:1,Ne=K.min.x,it=K.min.y,ct=K.isBox3?K.min.z:0;else{let Ot=Math.pow(2,-W);Re=Math.floor(Ct.width*Ot),_e=Math.floor(Ct.height*Ot),R.isDataArrayTexture?Pe=Ct.depth:R.isData3DTexture?Pe=Math.floor(Ct.depth*Ot):Pe=1,Ne=0,it=0,ct=0}V!==null?(Ie=V.x,xt=V.y,Vt=V.z):(Ie=0,xt=0,Vt=0);let St=xe.convert(O.format),oi=xe.convert(O.type),Ae;O.isData3DTexture?(Y.setTexture3D(O,0),Ae=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Y.setTexture2DArray(O,0),Ae=F.TEXTURE_2D_ARRAY):(Y.setTexture2D(O,0),Ae=F.TEXTURE_2D),E.activeTexture(F.TEXTURE0),E.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),E.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),E.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);let pi=E.getParameter(F.UNPACK_ROW_LENGTH),ft=E.getParameter(F.UNPACK_IMAGE_HEIGHT),Bi=E.getParameter(F.UNPACK_SKIP_PIXELS),dn=E.getParameter(F.UNPACK_SKIP_ROWS),Jn=E.getParameter(F.UNPACK_SKIP_IMAGES);E.pixelStorei(F.UNPACK_ROW_LENGTH,Ct.width),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ct.height),E.pixelStorei(F.UNPACK_SKIP_PIXELS,Ne),E.pixelStorei(F.UNPACK_SKIP_ROWS,it),E.pixelStorei(F.UNPACK_SKIP_IMAGES,ct);let Ks=R.isDataArrayTexture||R.isData3DTexture,_t=O.isDataArrayTexture||O.isData3DTexture;if(R.isDepthTexture){let Ot=H.get(R),Zn=H.get(O),At=H.get(Ot.__renderTarget),$n=H.get(Zn.__renderTarget);E.bindFramebuffer(F.READ_FRAMEBUFFER,At.__webglFramebuffer),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Ys=0;Ys<Pe;Ys++)Ks&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,H.get(R).__webglTexture,W,ct+Ys),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,H.get(O).__webglTexture,Me,Vt+Ys)),F.blitFramebuffer(Ne,it,Re,_e,Ie,xt,Re,_e,F.DEPTH_BUFFER_BIT,F.NEAREST);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||R.isRenderTargetTexture||H.has(R)){let Ot=H.get(R),Zn=H.get(O);E.bindFramebuffer(F.READ_FRAMEBUFFER,D),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,U);for(let At=0;At<Pe;At++)Ks?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.__webglTexture,W,ct+At):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ot.__webglTexture,W),_t?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Zn.__webglTexture,Me,Vt+At):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Zn.__webglTexture,Me),W!==0?F.blitFramebuffer(Ne,it,Re,_e,Ie,xt,Re,_e,F.COLOR_BUFFER_BIT,F.NEAREST):_t?F.copyTexSubImage3D(Ae,Me,Ie,xt,Vt+At,Ne,it,Re,_e):F.copyTexSubImage2D(Ae,Me,Ie,xt,Ne,it,Re,_e);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else _t?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(Ae,Me,Ie,xt,Vt,Re,_e,Pe,St,oi,Ct.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(Ae,Me,Ie,xt,Vt,Re,_e,Pe,St,Ct.data):F.texSubImage3D(Ae,Me,Ie,xt,Vt,Re,_e,Pe,St,oi,Ct):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Me,Ie,xt,Re,_e,St,oi,Ct.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Me,Ie,xt,Ct.width,Ct.height,St,Ct.data):F.texSubImage2D(F.TEXTURE_2D,Me,Ie,xt,Re,_e,St,oi,Ct);E.pixelStorei(F.UNPACK_ROW_LENGTH,pi),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ft),E.pixelStorei(F.UNPACK_SKIP_PIXELS,Bi),E.pixelStorei(F.UNPACK_SKIP_ROWS,dn),E.pixelStorei(F.UNPACK_SKIP_IMAGES,Jn),Me===0&&O.generateMipmaps&&F.generateMipmap(Ae),E.unbindTexture()},this.initRenderTarget=function(R){H.get(R).__webglFramebuffer===void 0&&Y.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Y.setTextureCube(R,0):R.isData3DTexture?Y.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Y.setTexture2DArray(R,0):Y.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){B=0,G=0,ne=null,E.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return en}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}};function Rn(s,e=!1){let t=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new ot,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let p=s[d].index;for(let m=0;m<p.count;++m)u.push(p.getX(m)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=sm(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let p=[];for(let v=0;v<a[h].length;++v)p.push(a[h][v][d]);let m=sm(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function sm(s){let e,t,i,n=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Mt(a,t,i),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,p=h.count;d<p;d++)for(let m=0;m<t;m++){let v=h.getComponent(d,m);o.setComponent(d+u,m,v)}}else a.set(h.array,l);l+=h.count*t}return n!==void 0&&(o.gpuType=n),o}function Ju(s,e){if(e===Tu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ur||e===bo){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let i=t.count-2,n=[];if(e===Ur)for(let r=1;r<=i;r++)n.push(t.getX(0)),n.push(t.getX(r)),n.push(t.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(n.push(t.getX(r)),n.push(t.getX(r+1)),n.push(t.getX(r+2))):(n.push(t.getX(r+2)),n.push(t.getX(r+1)),n.push(t.getX(r)));return n.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(n),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function rm(s){let e=new Map,t=new Map,i=s.clone();return am(s,i,function(n,r){e.set(r,n),t.set(n,r)}),i.traverse(function(n){if(!n.isSkinnedMesh)return;let r=n,a=e.get(n),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function am(s,e,t){t(s,e);for(let i=0;i<s.children.length;i++)am(s.children[i],e.children[i],t)}var Vc=class extends Sn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new nd(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new fd(t)}),this.register(function(t){return new pd(t)}),this.register(function(t){return new md(t)}),this.register(function(t){return new ad(t)}),this.register(function(t){return new od(t)}),this.register(function(t){return new ld(t)}),this.register(function(t){return new cd(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new hd(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new dd(t)}),this.register(function(t){return new ud(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new Wc(t,lt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Wc(t,lt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new gd(t)})}load(e,t,i,n){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=qn.extractUrlBase(e);a=qn.resolveURL(c,this.path)}else a=qn.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){n?n(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Cr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===um){try{a[lt.KHR_BINARY_GLTF]=new bd(e)}catch(u){n&&n(u);return}r=JSON.parse(a[lt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new wd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case lt.KHR_MATERIALS_UNLIT:a[u]=new td;break;case lt.KHR_DRACO_MESH_COMPRESSION:a[u]=new xd(r,this.dracoLoader);break;case lt.KHR_TEXTURE_TRANSFORM:a[u]=new vd;break;case lt.KHR_MESH_QUANTIZATION:a[u]=new yd;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,n)}parseAsync(e,t){let i=this;return new Promise(function(n,r){i.parse(e,t,n,r)})}};function A_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Gt(s,e,t){let i=s.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ed=class{constructor(e){this.parser=e,this.name=lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,n=t.cache.get(i);if(n)return n;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Be(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],gi);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ps(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Cs(h),c.distance=u;break;case"spot":c=new Za(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Cn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}},td=class{constructor(){this.name=lt.KHR_MATERIALS_UNLIT}getMaterialType(){return xi}extendParams(e,t,i){let n=[];e.color=new Be(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],gi),e.opacity=a[3]}r.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",r.baseColorTexture,Lt))}return Promise.all(n)}},id=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},nd=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(n.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(r,r)}return Promise.all(n)}},sd=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},rd=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(n)}},ad=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];if(t.sheenColor=new Be(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],gi)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Lt)),i.sheenRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(n)}},od=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&n.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(n)}},ld=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let r=i.attenuationColor||[1,1,1];return t.attenuationColor=new Be().setRGB(r[0],r[1],r[2],gi),Promise.all(n)}},cd=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IOR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},hd=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let r=i.specularColorFactor||[1,1,1];return t.specularColor=new Be().setRGB(r[0],r[1],r[2],gi),i.specularColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Lt)),Promise.all(n)}},ud=class{constructor(e){this.parser=e,this.name=lt.EXT_MATERIALS_BUMP}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&n.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(n)}},dd=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?Si:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&n.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(n)}},fd=class{constructor(e){this.parser=e,this.name=lt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;let r=n.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},pd=class{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=n.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},md=class{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=n.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},Wc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let n=i.extensions[this.name],r=this.parser.getDependency("buffer",n.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=n.byteOffset||0,c=n.byteLength||0,h=n.count,u=n.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,n.mode,n.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,n.mode,n.filter),p})})}else return null}},gd=class{constructor(e){this.name=lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let n=t.meshes[i.mesh];for(let c of n.primitives)if(c.mode!==qi.TRIANGLES&&c.mode!==qi.TRIANGLE_STRIP&&c.mode!==qi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(let m of u){let v=new ke,g=new I,f=new Di,y=new I(1,1,1),M=new Aa(m.geometry,m.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,_),l.SCALE&&y.fromBufferAttribute(l.SCALE,_),M.setMatrixAt(_,v.compose(g,f,y));let b=null;for(let _ in l)if(_==="_COLOR_0"){let S=l[_];M.instanceColor=new kn(S.array,S.itemSize,S.normalized)}else if(_!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"){if(b===null){let T=M.geometry;b=new ot,b.name=T.name;for(let x in T.attributes)b.setAttribute(x,T.attributes[x]);for(let x in T.morphAttributes)b.morphAttributes[x]=T.morphAttributes[x];T.index!==null&&b.setIndex(T.index),b.morphTargetsRelative=T.morphTargetsRelative;for(let x of T.groups)b.addGroup(x.start,x.count,x.materialIndex);T.boundingBox!==null&&(b.boundingBox=T.boundingBox.clone()),T.boundingSphere!==null&&(b.boundingSphere=T.boundingSphere.clone()),b.drawRange.start=T.drawRange.start,b.drawRange.count=T.drawRange.count,b.userData=Object.assign({},T.userData),M.geometry=b}let S=l[_];b.setAttribute(_,new kn(S.array,S.itemSize,S.normalized))}Et.prototype.copy.call(M,m),this.parser.assignFinalMaterial(M),p.push(M)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},um="glTF",Mo=12,om={JSON:1313821514,BIN:5130562},bd=class{constructor(e){this.name=lt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Mo),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==um)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let n=this.header.length-Mo,r=new DataView(e,Mo),a=0;for(;a<n;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===om.JSON){let c=new Uint8Array(e,Mo+a,o);this.content=i.decode(c)}else if(l===om.BIN){let c=Mo+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},xd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,n=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Md[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Md[h]||h.toLowerCase();if(a[h]!==void 0){let d=i.accessors[e.attributes[h]],p=Vr[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){n.decodeDracoFile(h,function(p){for(let m in p.attributes){let v=p.attributes[m],g=l[m];g!==void 0&&(v.normalized=g)}u(p)},o,c,gi,d)})})}},vd=class{constructor(){this.name=lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let i=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},yd=class{constructor(){this.name=lt.KHR_MESH_QUANTIZATION}},qc=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n*3+n;for(let a=0;a!==n;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,u=(i-t)/h,d=u*u,p=d*u,m=e*c,v=m-c,g=-2*p+3*d,f=p-d,y=1-g,M=f-d+u;for(let b=0;b!==o;b++){let _=a[v+b+o],S=a[v+b+l]*h,T=a[m+b+o],x=a[m+b]*h;r[b]=y*_+M*S+g*T+f*x}return r}},R_=new Di,_d=class extends qc{interpolate_(e,t,i,n){let r=super.interpolate_(e,t,i,n);return R_.fromArray(r).normalize().toArray(r),r}},qi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Vr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},lm={9728:It,9729:kt,9984:$l,9985:Nr,9986:Us,9987:an},cm={33071:Gi,33648:dr,10497:hi},Zu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Md={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ds={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},C_={CUBICSPLINE:void 0,LINEAR:Ss,STEP:Ms},$u={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function P_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vi})),s.DefaultMaterial}function zs(s,e,t){for(let i in t.extensions)s[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Cn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function I_(s,e,t){let i=!1,n=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(n=!0),u.COLOR_0!==void 0&&(r=!0),i&&n&&r)break}if(!i&&!n&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(i){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(n){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return i&&(s.morphAttributes.position=h),n&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function D_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)s.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function L_(s){let e,t=s.extensions&&s.extensions[lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Qu(t.attributes):e=s.indices+":"+Qu(s.attributes)+":"+s.mode,s.targets!==void 0)for(let i=0,n=s.targets.length;i<n;i++)e+=":"+Qu(s.targets[i]);return e}function Qu(s){let e="",t=Object.keys(s).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+s[t[i]]+";";return e}function Sd(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function N_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var F_=new ke,wd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new A_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);n=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&n<17||r&&a<98?this.textureLoader=new Ka(this.options.manager):this.textureLoader=new Qa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Cr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,n=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][n.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:n.asset,parser:i,userData:{}};return zs(r,o,n),Cn(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let a=t[n].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let n=0,r=e.length;n<r;n++){let a=e[n];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let n=i.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let n=e(t[i]);if(n)return n}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let n=0;n<t.length;n++){let r=e(t[n]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":n=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[lt.KHR_BINARY_GLTF].body);let n=this.options;return new Promise(function(r,a){i.load(qn.resolveURL(t.uri,n.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let n=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+n)})}loadAccessor(e){let t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){let a=Zu[n.type],o=Vr[n.componentType],l=n.normalized===!0,c=new o(n.count*a);return Promise.resolve(new Mt(c,a,l))}let r=[];return n.bufferView!==void 0?r.push(this.getDependency("bufferView",n.bufferView)):r.push(null),n.sparse!==void 0&&(r.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Zu[n.type],c=Vr[n.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=n.byteOffset||0,p=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,m=n.normalized===!0,v,g;if(p&&p!==u){let f=Math.floor(d/p),y="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+f+":"+n.count,M=t.cache.get(y);M||(v=new c(o,f*p,n.count*p/h),M=new vr(v,p/h),t.cache.add(y,M)),g=new yr(M,l,d%p/h,m)}else o===null?v=new c(n.count*l):v=new c(o,d,n.count*l),g=new Mt(v,l,m);if(n.sparse!==void 0){let f=Zu.SCALAR,y=Vr[n.sparse.indices.componentType],M=n.sparse.indices.byteOffset||0,b=n.sparse.values.byteOffset||0,_=new y(a[1],M,n.sparse.count*f),S=new c(a[2],b,n.sparse.count*l);o!==null&&(g=new Mt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,x=_.length;T<x;T++){let w=_[T];if(g.setX(w,S[T*l]),l>=2&&g.setY(w,S[T*l+1]),l>=3&&g.setZ(w,S[T*l+2]),l>=4&&g.setW(w,S[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let n=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=lm[d.magFilter]||kt,h.minFilter=lm[d.minFilter]||an,h.wrapS=cm[d.wrapS]||hi,h.wrapT=cm[d.wrapT]||hi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==It&&h.minFilter!==kt,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,n=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=n.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let m=d;t.isImageBitmapLoader===!0&&(m=function(v){let g=new Xt(v);g.needsUpdate=!0,d(g)}),t.load(qn.resolveURL(u,r.path),m,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Cn(u,a),u.userData.mimeType=a.mimeType||N_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,n){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[lt.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[lt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[lt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return n!==void 0&&(a.colorSpace=n),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,n=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Mr,bi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new yn,bi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(n||r||a){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return Kt}loadMaterial(e){let t=this,i=this.json,n=this.extensions,r=i.materials[e],a,o={},l=r.extensions||{},c=[];if(l[lt.KHR_MATERIALS_UNLIT]){let u=n[lt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Be(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],gi),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Lt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Rt);let h=r.alphaMode||$u.OPAQUE;if(h===$u.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===$u.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==xi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new re(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==xi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==xi){let u=r.emissiveFactor;o.emissive=new Be().setRGB(u[0],u[1],u[2],gi)}return r.emissiveTexture!==void 0&&a!==xi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Lt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Cn(u,r),t.associations.set(u,{materials:e}),r.extensions&&zs(n,u,r),u})}createUniqueName(e){let t=wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,n=this.primitiveCache;function r(o){return i[lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return hm(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=L_(c),u=n[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[lt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=hm(new ot,c,t),c.mode===qi.TRIANGLE_STRIP?d=d.then(p=>Ju(p,bo)):c.mode===qi.TRIANGLE_FAN&&(d=d.then(p=>Ju(p,Ur))),n[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,n=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?P_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,m=h.length;p<m;p++){let v=h[p],g=a[p],f,y=c[p];if(g.mode===qi.TRIANGLES||g.mode===qi.TRIANGLE_STRIP||g.mode===qi.TRIANGLE_FAN||g.mode===void 0){let M=r.isSkinnedMesh===!0,b=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");M&&b===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),f=M&&b?new Ea(v,y):new Je(v,y),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(g.mode===qi.LINES)f=new Ra(v,y);else if(g.mode===qi.LINE_STRIP)f=new nn(v,y);else if(g.mode===qi.LINE_LOOP)f=new Ca(v,y);else if(g.mode===qi.POINTS)f=new Pa(v,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(f.geometry.morphAttributes).length>0&&D_(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Cn(f,r),g.extensions&&zs(n,f,g),t.assignFinalMaterial(f),u.push(f)}for(let p=0,m=u.length;p<m;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&zs(n,u[0],r),u[0];let d=new at;r.extensions&&zs(n,d,r),t.associations.set(d,{meshes:e});for(let p=0,m=u.length;p<m;p++)d.add(u[p]);return d})}loadCamera(e){let t,i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new qt(Os.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new wn(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Cn(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let n=0,r=t.joints.length;n<r;n++)i.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){let r=n.pop(),a=n,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new ke;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ta(o,l)})}loadAnimation(e){let t=this.json,i=this,n=t.animations[e],r=n.name?n.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=n.channels.length;u<d;u++){let p=n.channels[u],m=n.samplers[p.sampler],v=p.target,g=v.node,f=n.parameters!==void 0?n.parameters[m.input]:m.input,y=n.parameters!==void 0?n.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",y)),c.push(m),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],m=u[2],v=u[3],g=u[4],f=[];for(let M=0,b=d.length;M<b;M++){let _=d[M],S=p[M],T=m[M],x=v[M],w=g[M];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let A=i._createAnimationTracks(_,S,T,x,w);if(A)for(let C=0;C<A.length;C++)f.push(A[C])}let y=new ja(r,void 0,f);return Cn(y,n),y})}createNodeMesh(e){let t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,n.mesh,r);return n.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),a})}loadNode(e){let t=this.json,i=this,n=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=n.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));let l=n.skin===void 0?Promise.resolve(null):i.getDependency("skin",n.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,F_)});for(let p=0,m=u.length;p<m;p++)h.add(u[p]);if(h.userData.pivot!==void 0&&u.length>0){let p=h.userData.pivot,m=u[0];h.pivot=new I().fromArray(p),h.position.x-=p[0],h.position.y-=p[1],h.position.z-=p[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,i=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?n.createUniqueName(r.name):"",o=[],l=n._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(n.getDependency("camera",r.camera).then(function(c){return n._getNodeRef(n.cameraCache,r.camera,c)})),n._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new _r:c.length>1?h=new at:c.length===1?h=c[0]:h=new Et,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Cn(h,r),r.extensions&&zs(i,h,r),r.matrix!==void 0){let u=new ke;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!n.associations.has(h))n.associations.set(h,{});else if(r.mesh!==void 0&&n.meshCache.refs[r.mesh]>1){let u=n.associations.get(h);n.associations.set(h,{...u})}return n.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],n=this,r=new at;i.name&&(r.name=n.createUniqueName(i.name)),Cn(r,i),i.extensions&&zs(t,r,i);let a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(n.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){let d=l[h];d.parent!==null?r.add(rm(d)):r.add(d)}let c=h=>{let u=new Map;for(let[d,p]of n.associations)(d instanceof bi||d instanceof Xt)&&u.set(d,p);return h.traverse(d=>{let p=n.associations.get(d);p!=null&&u.set(d,p)}),u};return n.associations=c(r),r})}_createAnimationTracks(e,t,i,n,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(p){p.morphTargetInfluences&&l.push(p.name?p.name:p.uuid)}ds[r.path]===ds.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(ds[r.path]){case ds.weights:h=Hn;break;case ds.rotation:h=Vn;break;case ds.translation:case ds.scale:h=os;break;default:i.itemSize===1?h=Hn:h=os;break}let u=n.interpolation!==void 0?C_[n.interpolation]:Ss,d=this._getArrayFromAccessor(i);for(let p=0,m=l.length;p<m;p++){let v=new h(l[p]+"."+ds[r.path],t.array,d,u);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Sd(t.constructor),n=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)n[r]=t[r]*i;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let n=this instanceof Vn?_d:qc;return new n(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function U_(s,e,t){let i=e.attributes,n=new Ft;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){let h=Sd(Vr[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new I,l=new I;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,m=d.max;if(p!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(m[2]))),d.normalized){let v=Sd(Vr[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}s.boundingBox=n;let a=new ui;n.getCenter(a.center),a.radius=n.min.distanceTo(n.max)/2,s.boundingSphere=a}function hm(s,e,t){let i=e.attributes,n=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in i){let o=Md[a]||a.toLowerCase();o in s.attributes||n.push(r(i[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});n.push(a)}return et.workingColorSpace!==gi&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),Cn(s,e),U_(s,e,t),Promise.all(n).then(function(){return e.targets!==void 0?I_(s,e.targets,t):s})}var dm=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var n=WebAssembly.validate(t)?o(e):o(s),r,a=WebAssembly.instantiate(n,{}).then(function(f){r=f.instance,r.exports.__wasm_call_ctors()});function o(f){for(var y=new Uint8Array(f.length),M=0;M<f.length;++M){var b=f.charCodeAt(M);y[M]=b>96?b-97:b>64?b-39:b+4}for(var _=0,M=0;M<f.length;++M)y[_++]=y[M]<60?i[y[M]]:(y[M]-60)*64+y[++M];return y.buffer.slice(0,_)}function l(f,y,M,b,_,S,T){var x=f.exports.sbrk,w=b+3&-4,A=x(w*_),C=x(S.length),L=new Uint8Array(f.exports.memory.buffer);L.set(S,C);var N=y(A,b,_,C,S.length);if(N==0&&T&&T(A,w,_),M.set(L.subarray(A,A+b*_)),x(A-x(0)),N!=0)throw new Error("Malformed buffer data: "+N)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function p(f){var y={object:new Worker(f),pending:0,requests:{}};return y.object.onmessage=function(M){var b=M.data;y.pending-=b.count,y.requests[b.id][b.action](b.value),delete y.requests[b.id]},y}function m(f){for(var y="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(n)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+g.name+";"+l.toString()+g.toString(),M=new Blob([y],{type:"text/javascript"}),b=URL.createObjectURL(M),_=u.length;_<f;++_)u[_]=p(b);for(var _=f;_<u.length;++_)u[_].object.postMessage({});u.length=f,URL.revokeObjectURL(b)}function v(f,y,M,b,_){for(var S=u[0],T=1;T<u.length;++T)u[T].pending<S.pending&&(S=u[T]);return new Promise(function(x,w){var A=new Uint8Array(M),C=++d;S.pending+=f,S.requests[C]={resolve:x,reject:w},S.object.postMessage({id:C,count:f,size:y,source:A,mode:b,filter:_},[A.buffer])})}function g(f){var y=f.data;self.ready.then(function(M){if(!y.id)return self.close();try{var b=new Uint8Array(y.count*y.size);l(M,M.exports[y.mode],b,y.count,y.size,y.source,M.exports[y.filter]),self.postMessage({id:y.id,count:y.count,action:"resolve",value:b},[b.buffer])}catch(_){self.postMessage({id:y.id,count:y.count,action:"reject",value:_})}})}return{ready:a,supported:!0,useWorkers:function(f){m(f)},decodeVertexBuffer:function(f,y,M,b,_){l(r,r.exports.meshopt_decodeVertexBuffer,f,y,M,b,r.exports[c[_]])},decodeIndexBuffer:function(f,y,M,b){l(r,r.exports.meshopt_decodeIndexBuffer,f,y,M,b)},decodeIndexSequence:function(f,y,M,b){l(r,r.exports.meshopt_decodeIndexSequence,f,y,M,b)},decodeGltfBuffer:function(f,y,M,b,_,S){l(r,r.exports[h[_]],f,y,M,b,r.exports[c[S]])},decodeGltfBufferAsync:function(f,y,M,b,_){return u.length>0?v(f,y,M,h[b],c[_]):a.then(function(){var S=new Uint8Array(f*y);return l(r,r.exports[h[b]],S,f,y,M,r.exports[c[_]]),S})}}})();function fm({cellSize:s=6,floorHeight:e=2.8,transparentCellSize:t=3,maxVertices:i=2e5,indexVertices:n=!1,minMaterialTriangles:r=2e4}={}){for(let[f,y]of Object.entries({cellSize:s,floorHeight:e,transparentCellSize:t,maxVertices:i}))if(!Number.isFinite(y)||y<=0)throw new RangeError(`${f} must be positive and finite`);if(!Number.isFinite(r)||r<0)throw new RangeError("minMaterialTriangles must be nonnegative and finite");let a=new Map,o=new Map,l=new Map,c=new Set,h=new I,u=new I,d={sourceMeshes:0,sourceVertices:0,sourceTriangles:0,emptySourceMeshes:0,batches:0,opaqueBatches:0,transparentBatches:0,spanBatches:0,globalBatches:0,outputVertices:0,outputTriangles:0,indexedBatches:0,oversizedSourceMeshes:0,inputStoredVertices:0,inputIndexEntries:0,cellSize:s,floorHeight:e,transparentCellSize:t,maxVertices:i,indexVertices:n,minMaterialTriangles:r},p=[],m=!1;function v(f,y,M=""){if(m)throw new Error("Spatial batcher is already finished");if(!f?.isBufferGeometry||!y?.isMaterial)throw new TypeError("A BufferGeometry and single Material are required");let b=f.getAttribute("position"),_=f.getAttribute("normal");if(!b||!_||b.itemSize!==3||_.itemSize!==3||_.count!==b.count)throw new Error("Spatial batching requires matching position/normal vec3 attributes");if(Object.keys(f.attributes).some(B=>B!=="position"&&B!=="normal")||Object.values(f.morphAttributes).some(B=>B.length))throw new Error("Strip unsupported attributes before static spatial batching");if(b.isInterleavedBufferAttribute||_.isInterleavedBufferAttribute)throw new Error("Deinterleave geometry before static spatial batching");let S=f.index?.count??b.count;if(S%3!==0||f.drawRange.start!==0||Number.isFinite(f.drawRange.count)&&f.drawRange.count<S)throw new Error("Spatial batching expects the complete triangle draw range");if(d.sourceMeshes++,d.sourceVertices+=S,d.sourceTriangles+=S/3,d.inputStoredVertices+=b.count,d.inputIndexEntries+=f.index?.count??0,c.add(f),l.set(y,(l.get(y)??0)+S/3),!S){d.emptySourceMeshes++,p.push(M);return}let T=new Ft().setFromBufferAttribute(b);if(![...T.min.toArray(),...T.max.toArray()].every(Number.isFinite))throw new Error("Spatial batching requires finite geometry bounds");T.getCenter(h),T.getSize(u);let x=y.transparent||y.transmission>0,w=x?t:s,A=u.x>w||u.z>w||u.y>e,C;if(A){let B=[Math.floor(T.min.x/w),Math.floor(T.min.y/e),Math.floor(T.min.z/w)],G=[Math.ceil(T.max.x/w)-1,Math.ceil(T.max.y/e)-1,Math.ceil(T.max.z/w)-1].map((ne,q)=>Math.max(B[q],ne));C=[...B,...G]}else C=[Math.floor(h.x/w),Math.floor(h.y/e),Math.floor(h.z/w)];o.has(y)||o.set(y,o.size);let L=[b,_].map(B=>`${B.array.constructor.name}:${B.normalized}:${B.gpuType}`).join("/"),N=`${o.get(y)}|${L}|${A?"span":"cell"}|${C.join(",")}`,D=a.get(N);D||(D={key:N,schema:L,cell:C,span:A,transparent:x,material:y,chunks:[]},a.set(N,D));let U=D.chunks.at(-1);(!U||U.vertices+S>i)&&(U={entries:[],vertices:0},D.chunks.push(U)),U.entries.push({geometry:f,sourceName:M}),U.vertices+=S,S>i&&d.oversizedSourceMeshes++}function g({disposeSources:f=!1}={}){if(m)throw new Error("Spatial batcher is already finished");m=!0;let y=new Map;for(let b of a.values()){if(l.get(b.material)>=r){y.set(b.key,b);continue}let _=`${o.get(b.material)}|${b.schema}|global`,S=y.get(_);S||(S={...b,key:_,cell:[],span:!1,global:!0,chunks:[]},y.set(_,S));for(let T of b.chunks)for(let x of T.entries){let w=x.geometry.index?.count??x.geometry.getAttribute("position").count,A=S.chunks.at(-1);(!A||A.vertices+w>i)&&(A={entries:[],vertices:0},S.chunks.push(A)),A.entries.push(x),A.vertices+=w}}let M=[];for(let b of y.values())for(let[_,S]of b.chunks.entries()){let T=S.entries.some(({geometry:N})=>N.index),x=S.entries.map(({geometry:N})=>{if(n)return N.index?N.toNonIndexed():N;if(!T||N.index)return N;let D=new ot,U=N.getAttribute("position").count;D.setAttribute("position",N.getAttribute("position")),D.setAttribute("normal",N.getAttribute("normal"));let B=U<=65535?new Uint16Array(U):new Uint32Array(U);for(let G=0;G<U;G++)B[G]=G;return D.setIndex(new Mt(B,1)),D}),w=Rn(x,!1);if(!w)throw new Error(`Could not merge spatial batch ${b.key}`);for(let N=0;N<x.length;N++)x[N]!==S.entries[N].geometry&&x[N].dispose();if(n){let N=O_(w);w.dispose(),w=N}w.index&&d.indexedBatches++,w.computeBoundingBox(),w.computeBoundingSphere();let A=new Je(w,b.material);A.name=`Spatial | ${b.material.name||b.material.uuid} | ${b.global?"global":b.span?"span":"cell"} ${b.cell.join(",")} | ${_}`,A.frustumCulled=!0,A.castShadow=!b.transparent,A.receiveShadow=!b.transparent;let C=[],L=0;for(let{geometry:N}of S.entries)C.push(L),L+=(N.index?.count??N.getAttribute("position").count)/3;A.userData.spatialBatch={key:b.key,cell:b.cell.slice(),spanning:b.span,global:!!b.global,sourceCount:S.entries.length,sourceNames:S.entries.map(N=>N.sourceName),sourceRanges:C,triangles:S.vertices/3},M.push(A),d.batches++,d[b.transparent?"transparentBatches":"opaqueBatches"]++,b.span&&d.spanBatches++,b.global&&d.globalBatches++,d.outputVertices+=w.getAttribute("position").count,d.outputTriangles+=(w.index?.count??w.getAttribute("position").count)/3}if(f)for(let b of c)b.dispose();return a.clear(),c.clear(),{meshes:M,stats:{...d},emptySources:p}}return{add:v,finish:g}}function O_(s){if(s.index)throw new Error("Exact indexing requires non-indexed triangles");let e=s.getAttribute("position"),t=s.getAttribute("normal");if(Object.keys(s.attributes).some(g=>g!=="position"&&g!=="normal")||!e||!t||e.itemSize!==3||t.itemSize!==3||e.count!==t.count||!(e.array instanceof Float32Array)||!(t.array instanceof Float32Array)||e.normalized||t.normalized)throw new Error("Exact indexing requires unnormalized Float32 position/normal attributes only");let i=e.count,n=new Uint32Array(e.array.buffer,e.array.byteOffset,i*3),r=new Uint32Array(t.array.buffer,t.array.byteOffset,i*3),a=new Map,o=new Int32Array(i),l=new Uint32Array(i),c=new Uint32Array(i),h=0;for(let g=0;g<i;g++){let f=g*3,y=2166136261;for(let b=0;b<3;b++)y=Math.imul(y^n[f+b],16777619);for(let b=0;b<3;b++)y=Math.imul(y^r[f+b],16777619);let M=-1;for(let b=a.get(y)??-1;b!==-1;b=o[b]){let _=l[b]*3;if(n[f]===n[_]&&n[f+1]===n[_+1]&&n[f+2]===n[_+2]&&r[f]===r[_]&&r[f+1]===r[_+1]&&r[f+2]===r[_+2]){M=b;break}}M===-1&&(M=h++,l[M]=g,o[M]=a.get(y)??-1,a.set(y,M)),c[g]=M}let u=new ot,d=new Float32Array(h*3),p=new Float32Array(h*3),m=new Uint32Array(d.buffer),v=new Uint32Array(p.buffer);for(let g=0;g<h;g++){let f=l[g]*3,y=g*3;m.set(n.subarray(f,f+3),y),v.set(r.subarray(f,f+3),y)}u.setAttribute("position",new Mt(d,3)),u.setAttribute("normal",new Mt(p,3)),u.setIndex(new Mt(h<=65535?new Uint16Array(c):c,1)),u.name=s.name,u.userData={...s.userData},u.setDrawRange(s.drawRange.start,s.drawRange.count);for(let g of s.groups)u.addGroup(g.start,g.count,g.materialIndex);return u}function Ed(s,e){if(e=e.replaceAll("_"," "),/Mirror/i.test(e))return;let t=/Entrance stippled glass/i.test(e),i=/water/i.test(e);if(/Hall opal lamp glass/i.test(e))s.transparent=!1,s.opacity=1,s.depthWrite=!0,s.metalness=0,s.roughness=.42;else if(t)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.48,s.opacity=.64,s.envMapIntensity=1;else if(i)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.16,s.envMapIntensity=1.1;else if(/Glazing|glass/i.test(e)){s.metalness=0,s.roughness=/mist/i.test(e)?.4:.1,s.opacity=/mist/i.test(e)?.36:.11,s.envMapIntensity=.8;return}let n=/carpet|upholstery|linen|curtain|fabric|cushion|Entrance mat/i.test(e),r=/oak|walnut|pine|timber|rattan/i.test(e)&&!n,a=e==="Proposal | Slate roof anthracite",o=t?9:i?10:/carpet/i.test(e)?11:e==="Red brown brick"?1:/Slate roof/i.test(e)?2:/Tarmac|Gravel|Planting soil/i.test(e)?3:r?4:/Warm plaster|White joinery|enamel|painted cast iron|Proposal \| Loft plaster|Proposal \| Limestone render/i.test(e)?5:n?6:/Stone|Concrete|Paving|brick|mortar|tile|granite|membrane/i.test(e)?7:/Grass|Foliage|Hedge/i.test(e)?8:0;o===1||o===2||o===3||o===6||o===8?s.roughness=.92:o===4?s.roughness=.43:o===5?s.roughness=/joinery|enamel/i.test(e)?.44:.88:o===7?s.roughness=/granite/i.test(e)?.28:.83:o===11&&(s.roughness=.96),o&&(s.onBeforeCompile=l=>{l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
   varying vec3 vSurfacePosition; varying vec3 vSurfaceNormal;`).replace("#include <begin_vertex>",`#include <begin_vertex>
   vSurfacePosition=(modelMatrix*vec4(position,1.)).xyz;
   vSurfaceNormal=normalize(mat3(modelMatrix)*normal);`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
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
   diffuseColor.rgb=mix(mix(${a?"vec3(.035,.043,.048),vec3(.068,.077,.080)":"vec3(.035,.038,.033),vec3(.075,.073,.059)"},surfaceHash(floor(uv))),${a?"vec3(.014,.017,.019)":"vec3(.012,.014,.012)"},seam);
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
  `),l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+c),l.fragmentShader=l.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
   vec3 surfaceDx=dFdx(-vViewPosition),surfaceDy=dFdy(-vViewPosition);
   vec3 surfaceR1=cross(surfaceDy,normal),surfaceR2=cross(normal,surfaceDx);
   float surfaceDet=dot(surfaceDx,surfaceR1);
   if(abs(surfaceDet)>.00000001)normal=normalize(abs(surfaceDet)*normal-sign(surfaceDet)*(dFdx(detailHeight)*surfaceR1+dFdy(detailHeight)*surfaceR2));
  `)},s.customProgramCacheKey=()=>`daylight-surface-v3-${o}${a?"-anthracite":""}`)}var Wr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Ui=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},k_=new wn(-1,1,1,-1,0,1),Td=class extends ot{constructor(){super(),this.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ze([0,2,0,0,2,0],2))}},B_=new Td,fs=class{constructor(e){this._mesh=new Je(B_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,k_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var qr=class extends Ui{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ei.clone(e.uniforms),this.material=new Dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new fs(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var So=class extends Ui{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}},Xc=class extends Ui{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var jc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new re);this._width=i.width,this._height=i.height,t=new Bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Yt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qr(Wr),this.copyPass.material.blending=zt,this.timer=new eo}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let n=0,r=this.passes.length;n<r;n++){let a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}So!==void 0&&(a instanceof So?i=!0:a instanceof Xc&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Kc=class extends Ui{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Be}render(e,t,i){let n=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=n}};var wo={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new re},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ke},cameraProjectionMatrixInverse:{value:new ke},cameraWorldMatrix:{value:new ke},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new I(-1,-1,-1)},sceneBoxMax:{value:new I(1,1,1)}},vertexShader:`

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
		}`},Eo={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Yc={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function pm(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=z_(e),i=t.length,n=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=t[a],l=2*Math.PI*o/i,c=new I(Math.cos(l),Math.sin(l),0).normalize();n[a*4]=(c.x*.5+.5)*255,n[a*4+1]=(c.y*.5+.5)*255,n[a*4+2]=127,n[a*4+3]=255}let r=new xn(n,e,e);return r.wrapS=hi,r.wrapT=hi,r.needsUpdate=!0,r}function z_(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,i=Array(t).fill(0),n=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(n===-1&&r===e?(r=e-2,n=0):(r===e&&(r=0),n<0&&(n=e-1)),i[n*e+r]!==0){r-=2,n++;continue}else i[n*e+r]=a++;r++,n--}return i}var To={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Ad(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new re},cameraProjectionMatrixInverse:{value:new ke},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Ad(s,e,t){let i=G_(s,e,t),n="vec3[SAMPLES](";for(let r=0;r<s;r++){let a=i[r];n+=`vec3(${a.x}, ${a.y}, ${a.z})${r<s-1?",":")"}`}return n}function G_(s,e,t){let i=[];for(let n=0;n<s;n++){let r=2*Math.PI*e*n/s,a=Math.pow(n/(s-1),t);i.push(new I(Math.cos(r),Math.sin(r),a))}return i}var Jc=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,n,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,p=c-u,m=e-d,v=t-p,g,f;m>v?(g=1,f=0):(g=0,f=1);let y=m-g+h,M=v-f+h,b=m-1+2*h,_=v-1+2*h,S=l&255,T=c&255,x=this.perm[S+this.perm[T]]%12,w=this.perm[S+g+this.perm[T+f]]%12,A=this.perm[S+1+this.perm[T+1]]%12,C=.5-m*m-v*v;C<0?i=0:(C*=C,i=C*C*this._dot(this.grad3[x],m,v));let L=.5-y*y-M*M;L<0?n=0:(L*=L,n=L*L*this._dot(this.grad3[w],y,M));let N=.5-b*b-_*_;return N<0?r=0:(N*=N,r=N*N*this._dot(this.grad3[A],b,_)),70*(i+n+r)}noise3d(e,t,i){let n,r,a,o,c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(i+c),p=1/6,m=(h+u+d)*p,v=h-m,g=u-m,f=d-m,y=e-v,M=t-g,b=i-f,_,S,T,x,w,A;y>=M?M>=b?(_=1,S=0,T=0,x=1,w=1,A=0):y>=b?(_=1,S=0,T=0,x=1,w=0,A=1):(_=0,S=0,T=1,x=1,w=0,A=1):M<b?(_=0,S=0,T=1,x=0,w=1,A=1):y<b?(_=0,S=1,T=0,x=0,w=1,A=1):(_=0,S=1,T=0,x=1,w=1,A=0);let C=y-_+p,L=M-S+p,N=b-T+p,D=y-x+2*p,U=M-w+2*p,B=b-A+2*p,G=y-1+3*p,ne=M-1+3*p,q=b-1+3*p,X=h&255,J=u&255,Ee=d&255,ie=this.perm[X+this.perm[J+this.perm[Ee]]]%12,ye=this.perm[X+_+this.perm[J+S+this.perm[Ee+T]]]%12,Te=this.perm[X+x+this.perm[J+w+this.perm[Ee+A]]]%12,ze=this.perm[X+1+this.perm[J+1+this.perm[Ee+1]]]%12,j=.6-y*y-M*M-b*b;j<0?n=0:(j*=j,n=j*j*this._dot3(this.grad3[ie],y,M,b));let $=.6-C*C-L*L-N*N;$<0?r=0:($*=$,r=$*$*this._dot3(this.grad3[ye],C,L,N));let ue=.6-D*D-U*U-B*B;ue<0?a=0:(ue*=ue,a=ue*ue*this._dot3(this.grad3[Te],D,U,B));let Ue=.6-G*G-ne*ne-q*q;return Ue<0?o=0:(Ue*=Ue,o=Ue*Ue*this._dot3(this.grad3[ze],G,ne,q)),32*(n+r+a+o)}noise4d(e,t,i,n){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,p,m,v=(e+t+i+n)*l,g=Math.floor(e+v),f=Math.floor(t+v),y=Math.floor(i+v),M=Math.floor(n+v),b=(g+f+y+M)*c,_=g-b,S=f-b,T=y-b,x=M-b,w=e-_,A=t-S,C=i-T,L=n-x,N=w>A?32:0,D=w>C?16:0,U=A>C?8:0,B=w>L?4:0,G=A>L?2:0,ne=C>L?1:0,q=N+D+U+B+G+ne,X=a[q][0]>=3?1:0,J=a[q][1]>=3?1:0,Ee=a[q][2]>=3?1:0,ie=a[q][3]>=3?1:0,ye=a[q][0]>=2?1:0,Te=a[q][1]>=2?1:0,ze=a[q][2]>=2?1:0,j=a[q][3]>=2?1:0,$=a[q][0]>=1?1:0,ue=a[q][1]>=1?1:0,Ue=a[q][2]>=1?1:0,Se=a[q][3]>=1?1:0,We=w-X+c,dt=A-J+c,ee=C-Ee+c,oe=L-ie+c,le=w-ye+2*c,ce=A-Te+2*c,de=C-ze+2*c,Ve=L-j+2*c,Oe=w-$+3*c,qe=A-ue+3*c,Ke=C-Ue+3*c,F=L-Se+3*c,ut=w-1+4*c,Qe=A-1+4*c,P=C-1+4*c,E=L-1+4*c,z=g&255,H=f&255,Y=y&255,he=M&255,fe=o[z+o[H+o[Y+o[he]]]]%32,Z=o[z+X+o[H+J+o[Y+Ee+o[he+ie]]]]%32,te=o[z+ye+o[H+Te+o[Y+ze+o[he+j]]]]%32,ge=o[z+$+o[H+ue+o[Y+Ue+o[he+Se]]]]%32,Le=o[z+1+o[H+1+o[Y+1+o[he+1]]]]%32,me=.6-w*w-A*A-C*C-L*L;me<0?h=0:(me*=me,h=me*me*this._dot4(r[fe],w,A,C,L));let pe=.6-We*We-dt*dt-ee*ee-oe*oe;pe<0?u=0:(pe*=pe,u=pe*pe*this._dot4(r[Z],We,dt,ee,oe));let Ce=.6-le*le-ce*ce-de*de-Ve*Ve;Ce<0?d=0:(Ce*=Ce,d=Ce*Ce*this._dot4(r[te],le,ce,de,Ve));let Ge=.6-Oe*Oe-qe*qe-Ke*Ke-F*F;Ge<0?p=0:(Ge*=Ge,p=Ge*Ge*this._dot4(r[ge],Oe,qe,Ke,F));let Ye=.6-ut*ut-Qe*Qe-P*P-E*E;return Ye<0?m=0:(Ye*=Ye,m=Ye*Ye*this._dot4(r[Le],ut,Qe,P,E)),27*(h+u+d+p+m)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,n){return e[0]*t+e[1]*i+e[2]*n}_dot4(e,t,i,n,r){return e[0]*t+e[1]*i+e[2]*n+e[3]*r}};var Ao=class s extends Ui{constructor(e,t,i=512,n=512,r,a,o){super(),this.width=i,this.height=n,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=pm(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Bt(this.width,this.height,{type:Yt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Dt({defines:Object.assign({},wo.defines),uniforms:Ei.clone(wo.uniforms),vertexShader:wo.vertexShader,fragmentShader:wo.fragmentShader,blending:zt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new qa,this.normalMaterial.blending=zt,this.pdMaterial=new Dt({defines:Object.assign({},To.defines),uniforms:Ei.clone(To.uniforms),vertexShader:To.vertexShader,fragmentShader:To.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Dt({defines:Object.assign({},Eo.defines),uniforms:Ei.clone(Eo.uniforms),vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader,blending:zt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Dt({uniforms:Ei.clone(Wr.uniforms),vertexShader:Wr.vertexShader,fragmentShader:Wr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:io,blendDst:Ls,blendEquation:Wi,blendSrcAlpha:to,blendDstAlpha:Ls,blendEquationAlpha:Wi}),this.blendMaterial=new Dt({uniforms:Ei.clone(Yc.uniforms),vertexShader:Yc.vertexShader,fragmentShader:Yc.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Yl,blendSrc:io,blendDst:Ls,blendEquation:Wi,blendSrcAlpha:to,blendDstAlpha:Ls,blendEquationAlpha:Wi}),this._fsQuad=new fs(null),this._originalClearColor=new Be,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new _n,this.depthTexture.format=En,this.depthTexture.type=hs,this.normalRenderTarget=new Bt(this.width,this.height,{minFilter:It,magFilter:It,type:Yt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,n=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=n,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=n,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ad(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Off:break;case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,n,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,n,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n=t.clearColor||n,r=t.clearAlpha||r,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new Jc,i=e*e*4,n=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a,c=o;n[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,n[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,n[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,n[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new xn(n,e,e,yi,di);return r.wrapS=hi,r.wrapT=hi,r.needsUpdate=!0,r}};Ao.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ro={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Zc=class extends Ui{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ei.clone(Ro.uniforms),this.material=new Rr({name:Ro.name,uniforms:this.uniforms,vertexShader:Ro.vertexShader,fragmentShader:Ro.fragmentShader}),this._fsQuad=new fs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===no?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===so?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ro?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ao?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ns?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===lo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===oo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var mm={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new re(1/1024,1/512)}},vertexShader:`

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

		}`};var Co=class s extends Je{constructor(){let e=s.SkyShader,t=new Dt({name:e.name,uniforms:Ei.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:si,depthWrite:!1});super(new gt(1,1,1),t),this.isSky=!0}};Co.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new I},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
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

		}`};function H_(s,e,t){let i=new Co;i.scale.setScalar(100),Object.assign(i.material.uniforms.turbidity,{value:2.2}),i.material.uniforms.rayleigh.value=1.8,i.material.uniforms.mieCoefficient.value=.004,i.material.uniforms.mieDirectionalG.value=.8,i.material.uniforms.cloudCoverage.value=.32,i.material.uniforms.cloudDensity.value=.22,i.material.uniforms.sunPosition.value.copy(e),i.material.uniforms.showSunDisc.value=!1;let n=new Es;n.add(i);let r=new Gr(t?128:256,{type:Yt});new Ir(.1,250,r).update(s,n);let a=new zr(s),o=a.fromCubemap(r.texture);return a.dispose(),i.geometry.dispose(),i.material.dispose(),{background:r.texture,environment:o.texture}}function gm(s,e,t,{actionMode:i=!1}={}){let n=matchMedia("(pointer: coarse)").matches,r=n||i;s.toneMapping=Ns,s.toneMappingExposure=1.08,s.shadowMap.enabled=!0,s.shadowMap.type=Ds,s.shadowMap.autoUpdate=!1,e.add(new Ya(14478074,8549991,.5)),e.add(new $a(16774373,.035));let a=new Ps(16774108,2.8),o=new I(0,0,1).applyEuler(new tn(Os.degToRad(26),Os.degToRad(-23),Os.degToRad(-28),"XYZ")),l=new I(o.x,o.z,-o.y),c=H_(s,l,n);e.background=c.background,e.backgroundIntensity=.22,e.environment=c.environment,e.environmentIntensity=.035,a.target.position.set(-3,0,-4),a.position.copy(a.target.position).add(l.multiplyScalar(55)),a.castShadow=!0;let h=r?2048:4096;a.shadow.mapSize.set(h,h),Object.assign(a.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120}),a.shadow.bias=-8e-5,a.shadow.normalBias=.012,e.add(a,a.target);let u=new Bt(innerWidth,innerHeight,{type:Yt,samples:r?0:4}),d=new jc(s,u);d.addPass(new Kc(e,t));let p=null;if(!n){p=new Ao(e,t,innerWidth,innerHeight,void 0,{radius:.45,distanceExponent:1.5,thickness:.15,scale:1,samples:16},{radius:6,rings:2,samples:8}),p.blendIntensity=.65;let b=p._overrideVisibility.bind(p),_=p._restoreVisibility.bind(p);p._overrideVisibility=()=>{b(),e.traverse(S=>{S.isMesh&&S.material.transparent&&S.visible&&(S.visible=!1,p._visibilityCache.push(S))})},p._restoreVisibility=_,p.enabled=!r,d.addPass(p)}d.addPass(new Zc);let m=new qr(mm);m.enabled=r,d.addPass(m);let v=(b,_)=>{d.setPixelRatio(s.getPixelRatio()),d.setSize(b,_),p&&p.setSize(Math.max(1,Math.round(d.readBuffer.width*.5)),Math.max(1,Math.round(d.readBuffer.height*.5))),m&&m.material.uniforms.resolution.value.set(1/d.readBuffer.width,1/d.readBuffer.height)};v(innerWidth,innerHeight);let g={toneMapping:"AgX",exposure:s.toneMappingExposure,sky:"precomputed analytic daylight",skyCubeSize:n?128:256,localBounceLights:0,castShadows:!0,ambientOcclusion:r?"off":"GTAO",aoResolutionScale:.5,antialiasing:r?"FXAA":"MSAA",environmentReflections:!0,shadowMapSize:h,touchDevice:n,actionMode:i},f=b=>{if(g.actionMode!==!!b){g.actionMode=!!b,r=n||b,p&&(p.enabled=!r),m.enabled=r;for(let _ of[d.renderTarget1,d.renderTarget2])_.samples=r?0:4,_.dispose();h=r?2048:4096,a.shadow.mapSize.set(h,h),a.shadow.map?.dispose(),a.shadow.map=null,a.shadow.mapPass?.dispose(),a.shadow.mapPass=null,s.shadowMap.needsUpdate=!0,g.ambientOcclusion=r?"off":"GTAO",g.antialiasing=r?"FXAA":"MSAA",g.shadowMapSize=h}},y=!1;return{render:()=>{d.render(),!y&&a.shadow.map&&(y=!0,e.traverse(b=>{if(b.material)for(let _ of Array.isArray(b.material)?b.material:[b.material])_.needsUpdate=!0}))},resize:v,setActionMode:f,updateShadows:()=>{s.shadowMap.needsUpdate=!0},info:g}}function bm(s,e,{budget:t=6}={}){let i=e.map((d,p)=>({...d,id:p,point:new I(d.position[0],d.position[2],-d.position[1])})),n=Array.from({length:Math.min(t,i.length)},()=>{let d=new Cs(16772311,0,1,0);return d.name="Room daylight fill",s.add(d),{light:d,current:null,target:null}}),r=new vn,a=new ke,o=new ui,l=-1/0,c=null,h={budget:n.length,sources:i.length,selected:[]};function u(d,p=performance.now()){let m=c===null?1:Math.min(.1,Math.max(0,(p-c)/1e3));if(c=p,p-l>=160){d.updateMatrixWorld(),r.setFromProjectionMatrix(a.multiplyMatrices(d.projectionMatrix,d.matrixWorldInverse));let v=new Set(n.map(M=>M.target?.id)),g=i.map(M=>{let b=d.position.distanceTo(M.point),_=Math.max(0,b-M.range);o.center.copy(M.point),o.radius=M.range;let S=r.intersectsSphere(o);return{source:M,score:M.intensity*(S?1:.15)/(1+_*_*.15+b*.08)*(v.has(M.id)?1.12:1)}}).sort((M,b)=>b.score-M.score).slice(0,n.length).map(M=>M.source),f=new Set(g.map(M=>M.id)),y=g.filter(M=>!n.some(b=>b.target?.id===M.id));for(let M of n)f.has(M.target?.id)||(M.target=y.shift()??null);h.selected=g.map(M=>M.name),l=p}for(let v of n){let g=v.current?.id!==v.target?.id;if(g&&v.light.intensity>.015){v.light.intensity*=Math.exp(-m*18);continue}g&&(v.current=v.target,v.current&&(v.light.position.copy(v.current.point),v.light.distance=v.current.range,v.light.name=v.current.name+" diffuse fill"));let f=v.current?.intensity??0;v.light.intensity+=(f-v.light.intensity)*(1-Math.exp(-m*12))}}return{update:u,info:h,slots:n}}var $c=class{constructor({mobile:e=!1,dpr:t=1}={}){this.mobile=e,this.dpr=t,this.scale=1,this.frames=[],this.lastCheck=null}ratio(e,t){let i=this.mobile?1.25:1.5,n=this.mobile?1e6:32e5;return Math.min(this.dpr,i,Math.sqrt(n/Math.max(1,e*t)))*this.scale}reset(){this.frames.length=0,this.lastCheck=null}sample(e,t){if(!Number.isFinite(e)||e<1||e>150||(this.lastCheck===null&&(this.lastCheck=t),this.frames.push(e),t-this.lastCheck<2400))return!1;let i=this.frames.sort((a,o)=>a-o);if(this.frames=[],this.lastCheck=t,i.length<24)return!1;let n=i[Math.floor(i.length/2)],r=this.scale;return n>27&&(this.scale=Math.max(.65,Math.round((this.scale-.15)*100)/100)),this.scale!==r}};var Qc=class{constructor(e,t=[]){this.scene=e,this.members=new Map,this.doors=[],this.activeGroups=new Map;for(let i of t){let n=new at;n.name=i.id,n.position.set(i.hinge[0],i.hinge[2],-i.hinge[1]),e.add(n);let r=i.rotationAxis?new I(i.rotationAxis[0],i.rotationAxis[2],-i.rotationAxis[1]).normalize():new I(0,1,0),a=i.closedDelta??0;n.quaternion.setFromAxisAngle(r,a);let o={spec:i,pivot:n,axis:r,closedPosition:n.position.clone(),buckets:new Map,angle:a,open:!1,meshCount:0};this.doors.push(o);for(let l of i.members)this.members.set(l,o)}}owner(e){for(let t=e;t;t=t.parent){let i=this.members.get(t.userData.name||t.name);if(i)return i}}add(e,t,i){t.translate(-e.pivot.position.x,-e.pivot.position.y,-e.pivot.position.z);let n=e.buckets.get(i.name);n||(n={material:i,geometries:[]},e.buckets.set(i.name,n)),n.geometries.push(t),e.meshCount++}finish(){let e=0;for(let t of this.doors){for(let{material:i,geometries:n}of t.buckets.values()){let r=Rn(n,!1),a=new Je(r,i);a.name=t.spec.id+" | "+i.name,a.castShadow=!i.transparent,a.receiveShadow=!i.transparent,t.pivot.add(a),e++;for(let o of n)o.dispose()}t.buckets.clear()}return e}update(e,t=0,i=!1,n=[]){let r=!1,a=new Map;for(let{spec:l}of this.doors)if(l.activationSet){let c=a.get(l.activationSet);c||(c=new Map,a.set(l.activationSet,c));let[h,u]=l.openingCenter;c.set(l.activationGroup,Math.hypot(e.x-h,e.y-u))}for(let[l,c]of a){let h=[...c].sort((d,p)=>d[1]-p[1])[0],u=this.activeGroups.get(l);(i||!c.has(u)||c.get(u)>h[1]+.2)&&this.activeGroups.set(l,h[0])}let o=[{position:e,selected:this.activeGroups},...n.map(l=>{let c=new Map;for(let h of a.keys()){let u=null,d=1/0;for(let{spec:p}of this.doors)if(p.activationSet===h){let[m,v,g]=p.openingCenter,f=Math.hypot(l.x-m,l.y-v)+Math.abs(l.z-g)*10;f<d&&(d=f,u=p.activationGroup)}c.set(h,u)}return{position:l,selected:c}})];for(let l of this.doors){let{spec:c}=l,[h,u,d]=c.openingCenter;l.open=o.some(({position:g,selected:f})=>{let y=Math.abs(g.z-d)<.75,M=h,b=u;if(c.apertureAxis){let[T,x]=c.apertureAxis,w=c.apertureWidth/2,A=Math.max(-w,Math.min(w,(g.x-h)*T+(g.y-u)*x));M+=T*A,b+=x*A}let _=Math.hypot(g.x-M,g.y-b);return(!c.activationSet||f.get(c.activationSet)===c.activationGroup)&&y&&_<(l.open&&!i?c.closeDistance:c.openDistance)});let p=l.open?c.openDelta:c.closedDelta??0,m=i?p:l.angle+(p-l.angle)*(1-Math.exp(-t*(c.responseRate??9))),v=Math.abs(p-m)<2e-4?p:m;if(Math.abs(v-l.angle)>1e-5){if(l.angle=v,c.motion==="sliding"?l.pivot.quaternion.identity():l.pivot.quaternion.setFromAxisAngle(l.axis,v),l.pivot.position.copy(l.closedPosition),c.motion==="retractable-garage"){let g=Math.sin(v),[f,y,M]=c.openTranslation;l.pivot.position.addScaledVector(new I(f,M,-y),g)}else if(c.motion==="sliding"){let g=c.openDelta?v/c.openDelta:0,[f,y,M]=c.openTranslation;l.pivot.position.addScaledVector(new I(f,M,-y),g)}r=!0}}return r}snap(e){return this.update(e,0,!0)}status(){return this.doors.map(({spec:e,angle:t,open:i,meshCount:n,pivot:r})=>({id:e.id,wall:e.wall,motion:e.motion??"hinged",activationGroup:e.activationGroup,angle:t,open:i,meshCount:n,batches:r.children.length,hinge:[...e.hinge],position:[r.position.x,-r.position.z,r.position.y],nativePoseRestored:Math.abs(t)<2e-4,closedPoseRestored:Math.abs(t-(e.closedDelta??0))<2e-4}))}};function $t(s,e,t){let i=!1;for(let n=0,r=t.length-1;n<t.length;r=n++){let[a,o]=t[n],[l,c]=t[r];o>e!=c>e&&s<(l-a)*(e-o)/(c-o)+a&&(i=!i)}return i}function V_(s,e,t,i){let n=i[0]-t[0],r=i[1]-t[1],a=Math.max(0,Math.min(1,((s-t[0])*n+(e-t[1])*r)/(n*n+r*r)));return Math.hypot(s-t[0]-a*n,e-t[1]-a*r)}function W_(s,e,t){let i=t.b[0]-t.a[0],n=t.b[1]-t.a[1],r=Math.hypot(i,n),a=((s-t.a[0])*i+(e-t.a[1])*n)/r,o=Math.abs(((s-t.a[0])*n-(e-t.a[1])*i)/r);return Math.hypot(Math.max(-a,a-r,0),Math.max(o-t.thickness/2,0))}var Gs=class{constructor(e){this.data=e,this.radius=.18,this.position={x:6.98,y:4.1,z:0},this.segments=[...e.segments];for(let t of e.walls){let[i,n]=t.a,[r,a]=t.b,o=Math.hypot(r-i,a-n),l=(r-i)/o,c=(a-n)/o,h=t.openings.filter(p=>p[2]<.15&&p[3]>1.65).map(p=>[Math.max(0,p[0]-p[1]/2),Math.min(o,p[0]+p[1]/2)]).sort((p,m)=>p[0]-m[0]),u=0,d=[];for(let[p,m]of h)p>u&&d.push([u,p]),u=Math.max(u,m);u<o&&d.push([u,o]);for(let[p,m]of d){let v=[p,m];if(t.projected_x_span)for(let g of t.projected_x_span){let f=(g-i)/l;f>p&&f<m&&v.push(f)}v.sort((g,f)=>g-f);for(let g=0;g<v.length-1;g++){let f=v[g],y=v[g+1],M=i+l*(f+y)/2,b=t.projected_x_span&&M>t.projected_x_span[0]&&M<t.projected_x_span[1]?t.front_projection_m:0,_=t.base_z??t.floor*e.levelHeight;this.segments.push({a:[i+l*f,n+c*f-b/2],b:[i+l*y,n+c*y-b/2],thickness:t.thickness_m+b,bottom:_,top:_+(t.height_m??(t.floor?2.45:2.6)),name:t.name})}}}}stairHeight(e,t){let[i,n]=this.data.stair?.boundsX??[7.92,8.815],r=this.data.levelHeight;return e<i||e>n||t<.115||t>3.56?null:t>=1.01?r/17+(3.56-t)/2.55*(13*r/17):(14+3*Math.atan2(1.01-t,e-i)/(Math.PI/2))*r/17}rampHeights(e,t){let i=[];for(let n of this.data.ramps??[])if($t(e,t,n.polygon)){let[r,a,o]=n.start,[l,c,h]=n.end,u=l-r,d=c-a,p=Math.max(0,Math.min(1,((e-r)*u+(t-a)*d)/(u*u+d*d)));i.push(o+(h-o)*p)}return i}support(e,t,i){let n=this.data.streetContext;if(this.data.site?.outline_m&&!$t(e,t,this.data.site.outline_m)&&!(this.data.approachSurface&&$t(e,t,this.data.approachSurface.polygon))&&!(n?.enabled&&n.walkPolygons.some(c=>$t(e,t,c))))return null;let r=this.stairHeight(e,t),a=(this.data.groundOpenings??[]).some(c=>$t(e,t,c.polygon??c)),o=this.rampHeights(e,t);a||o.push(0);for(let c of this.data.surfaces)(c.z!==0||!a)&&$t(e,t,c.polygon)&&o.push(c.z);r!==null&&o.push(r);let l=o.filter(c=>c<=i+(this.stepUp??.3)&&c>=i-(this.stepDown??.38));return l.length?Math.max(...l):null}blocked(e,t,i){let n=this.data.streetContext,r=this.radius,[a,o,l,c]=n?.enabled?n.bounds:this.data.bounds;if(e<a+r||e>l-r||t<o+r||t>c-r)return!0;for(let h of this.segments)if(!(i+1.5<=h.bottom+.04||i>=h.top-.04)&&!(h.name==="Landing rear rail"&&i<1)&&W_(e,t,h)<r)return!0;for(let h of n?.enabled?[...this.data.obstacles,...n.obstacles]:this.data.obstacles){if(h.maxFootZ!==void 0&&i>h.maxFootZ||i+1.5<h.bottom+.02||i>=h.top-.04)continue;if(h.polygon){if($t(e,t,h.polygon))return!0;for(let f=0;f<h.polygon.length;f++)if(V_(e,t,h.polygon[f],h.polygon[(f+1)%h.polygon.length])<r)return!0;continue}let[u,d,p,m]=h.box,v=e-Math.max(u,Math.min(p,e)),g=t-Math.max(d,Math.min(m,t));if(v*v+g*g<r*r)return!0}return!1}canStand(e){return!this.blocked(e.x,e.y,e.z)}teleport(e){let[t,i,n]=e.position;return this.position={x:t,y:i,z:n},this.position}move(e,t){let i=Math.max(1,Math.ceil(Math.hypot(e,t)/.04));for(let n=0;n<i;n++)for(let[r,a]of[[e/i,0],[0,t/i]]){let o=this.position,l=o.x+r,c=o.y+a,h=this.support(l,c,o.z);h!==null&&!this.blocked(l,c,h)&&(this.position={x:l,y:c,z:h})}return this.position}};var Po=()=>matchMedia("(pointer: coarse)").matches,eh=class{constructor(e,t,i,n,r=()=>{}){this.enabled=Po(),this.active=!1,this.axes={forward:0,right:0},this.movePointer=null,this.lookPointer=null,this.lookPoint=null,this.lookElement=null,this.lookGesture=null,this.sprinting=!1,this.pad=t,this.thumb=i,this.canvas=e,document.body.classList.toggle("touch-ui",this.enabled);let a=h=>this.enabled&&this.active&&h.pointerType!=="mouse",o=h=>{let u=t.getBoundingClientRect(),d=u.width*.34,p=h.clientX-u.left-u.width/2,m=h.clientY-u.top-u.height/2,v=Math.hypot(p,m),g=Math.min(1,d/(v||1));p*=g,m*=g,this.sprinting=v>d*(this.sprinting?1.08:1.28),t.classList.toggle("sprinting",this.sprinting),t.querySelector(".pad-label").textContent=this.sprinting?"Sprinting":"Push farther to sprint";let f=Math.hypot(p,m)/d;this.axes.forward=f<.13?0:-m/d,this.axes.right=f<.13?0:p/d,i.style.transform=`translate(${p}px,${m}px)`};t.addEventListener("pointerdown",h=>{!a(h)||this.movePointer!==null||(h.preventDefault(),this.movePointer=h.pointerId,t.setPointerCapture(h.pointerId),t.classList.add("engaged"),o(h))}),t.addEventListener("pointermove",h=>{h.pointerId===this.movePointer&&(h.preventDefault(),o(h))});let l=h=>{h.pointerId===this.movePointer&&this.resetMovement()};for(let h of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(h,l);e.addEventListener("pointerdown",h=>{!a(h)||!this.claimLook(h.pointerId,e)||(h.preventDefault(),this.lookPoint=[h.clientX,h.clientY],this.lookGesture={x:h.clientX,y:h.clientY,time:h.timeStamp,dragged:!1},e.setPointerCapture(h.pointerId))}),e.addEventListener("pointermove",h=>{h.pointerId!==this.lookPointer||!this.lookPoint||!this.active||(Math.hypot(h.clientX-this.lookGesture.x,h.clientY-this.lookGesture.y)>10&&(this.lookGesture.dragged=!0),h.preventDefault(),n(h.clientX-this.lookPoint[0],h.clientY-this.lookPoint[1]),document.getElementById("look-hint").hidden=!0,this.lookPoint=[h.clientX,h.clientY])});let c=h=>{if(h.pointerId!==this.lookPointer)return;let u=this.lookGesture,d=h.type==="pointerup"&&this.active&&u&&!u.dragged&&h.timeStamp-u.time<=350&&Math.hypot(h.clientX-u.x,h.clientY-u.y)<=10;this.releaseLook(h.pointerId),d&&r()};for(let h of["pointerup","pointercancel","lostpointercapture"])e.addEventListener(h,c);window.addEventListener("blur",()=>this.reset()),window.addEventListener("resize",()=>this.reset()),document.addEventListener("visibilitychange",()=>this.reset()),t.addEventListener("contextmenu",h=>h.preventDefault())}claimLook(e,t){return!this.active||this.lookPointer!==null?!1:(this.lookPointer=e,this.lookElement=t,!0)}releaseLook(e){if(e!==this.lookPointer)return;let t=this.lookElement;this.lookPointer=null,this.lookPoint=null,this.lookElement=null,this.lookGesture=null,t?.hasPointerCapture(e)&&t.releasePointerCapture(e)}resetMovement(){this.axes.forward=0,this.axes.right=0,this.movePointer=null,this.sprinting=!1,this.thumb.style.transform="",this.pad.classList.remove("engaged","sprinting"),this.pad.querySelector(".pad-label").textContent="Push farther to sprint"}reset(){let e=this.movePointer;this.resetMovement(),this.releaseLook(this.lookPointer),e!==null&&this.pad.hasPointerCapture(e)&&this.pad.releasePointerCapture(e)}setActive(e){this.active=e,e||this.reset()}};function xm(s,e){let t=[...s.floorLevels??[{id:0,z:0},{id:1,z:s.levelHeight}]].sort((n,r)=>n.z-r.z);if(!e||e.z<t[0].z-.15||e.z>t.at(-1).z+2.5)return!1;let i=t.findLast(n=>e.z>=n.z-.2)??t[0];return s.planRooms.some(n=>n.floor===i.id&&$t(e.x,e.y,n.polygon_m))}var th=class{constructor(e){this.data=e,this.reset()}reset(){this.phase="waiting",this.survived=0,this.wasInside=!1}arm(e){return this.phase!=="waiting"?!1:(this.phase="armed",this.wasInside=xm(this.data,e),!0)}advance(e,t=!0,i){if(!t)return!1;if(this.phase==="armed"){let n=xm(this.data,i),r=n&&!this.wasInside;if(this.wasInside=n,r)return this.phase="chasing",!0}else this.phase==="chasing"&&Number.isFinite(e)&&e>0&&(this.survived+=e);return!1}catch(){this.phase==="chasing"&&(this.phase="caught")}snapshot(){return{phase:this.phase,survived:this.survived,trigger:"house entry after garden shed bow pickup"}}};var Io=class{constructor(e=0,{type:t="shambler",style:i="classic",boss:n=!1,deathVariant:r=e%3}={}){this.group=new at,this.group.name=`Easter pursuer ${e+1}`,this.variant=e,this.heading=0,this.type=t,this.style=i,this.boss=n,this.small=i==="child",this.deathVariant=r,this.deathDuration=n?2.6:t==="brute"?2.35:t==="runner"?1.95:2.15,this.group.scale.set(...t==="brute"?[1.26,1.06,1.18]:t==="runner"?[.91,.97,.93]:t==="flanker"?[.96,1,.96]:[1,1,1]),this.small?this.group.scale.set(.66,.71,.66):n?this.group.scale.set(1.17,1.1,1.12):i.startsWith("woman")&&this.group.scale.multiply(new I(.95,.99,.95));let a=(x,w={})=>new Kt({color:x,roughness:.94,flatShading:!0,...w}),o=a(["#89936f","#87917c","#929578"][e%3]),l=a({"woman-coat":"#665365","woman-hoodie":"#4b6571",worker:"#756547",hoodie:"#596b54",child:"#8c6b45",suit:"#3f4652",groundskeeper:"#485442"}[i]??["#485249","#5d5144","#40565b"][e%3]),c=a(i==="worker"?"#7a6b3c":"#27302e"),h=a(["#343b38","#34383f","#424137"][e%3]),u=a("#9a987f"),d=a("#d4cf9e",{emissive:"#9b9b57",emissiveIntensity:.22}),p=new Rs(1,8,6),m=new gt(1,1,1),v=new Bn(1,1,3,7),g=(x,w,A,C,L)=>{let N=new Je(w,A);return N.position.set(...C),N.scale.set(...L),N.castShadow=!0,N.receiveShadow=!0,x.add(N),N},f=(x,w)=>{let A=new at;return A.position.set(...w),x.add(A),A},y=(x,w,A,C)=>g(x,v,w,[0,-A/2,0],[C,A/3,C]);this.body=f(this.group,[0,.83,0]),g(this.body,p,h,[0,.025,0],[.163,.13,.105]),this.chest=f(this.body,[0,.15,0]),this.chest.rotation.x=.16,g(this.chest,v,l,[0,.185,0],[.158,.17,.1]);for(let x=0;x<5;x++)g(this.chest,m,l,[-.12+x*.06,-.062-x%2*.023,.025],[.053,.085+x%2*.035,.17]);g(this.chest,m,u,[0,.205,.102],[.09,.31,.012]);for(let x of[-1,1]){let w=g(this.chest,m,l,[x*.066,.23,.117],[.045,.29,.022]);w.rotation.z=x*.14}g(this.chest,m,c,[0,.16,.128],[.023,.27,.014]),this.head=f(this.chest,[0,.495,.045]),this.head.rotation.z=-.12-e*.025,g(this.head,v,o,[0,-.069,0],[.043,.045,.048]),g(this.head,p,o,[0,.059,.003],[.123,.151,.113]),g(this.head,p,o,[0,-.015,.052],[.091,.065,.074]);for(let x of[-1,1]){g(this.head,p,o,[x*.12,.045,0],[.026,.041,.019]);let w=g(this.head,p,c,[x*.047,.076,.099],[.039,.025,.02]);w.rotation.z=x*.12,g(this.head,p,d,[x*.047,.075,.116],[.016,.01,.007]);let A=g(this.head,m,o,[x*.047,.103,.111],[.072,.018,.025]);A.rotation.z=x*.15}g(this.head,m,o,[0,.04,.12],[.032,.055,.032]);let M=g(this.head,m,c,[.005,-.013,.116],[.066,.014,.014]);if(M.rotation.z=.1,g(this.head,p,c,[-.01,.17,-.016],[.117,.051,.099]),g(this.head,p,c,[-.099,.091,-.045],[.031,.086,.075]),i==="woman-coat"&&(g(this.head,p,c,[.015,.035,-.058],[.132,.177,.085]),g(this.head,p,c,[.097,-.035,.017],[.037,.124,.073]),g(this.chest,m,l,[0,-.1,-.008],[.315,.23,.22]),g(this.chest,m,u,[0,.005,.113],[.28,.027,.018])),i==="hoodie"||i==="woman-hoodie"){let x=g(this.head,new vi(.126,.03,5,12),c,[0,.06,-.025],[1,1.22,.95]);g(this.head,p,c,[0,.075,-.07],[.134,.166,.077]);for(let w of[-1,1])g(this.chest,m,u,[w*.04,.255,.124],[.009,.17,.009]);i==="woman-hoodie"&&g(this.head,p,c,[.028,-.06,-.145],[.058,.116,.055])}if(i==="worker"&&(g(this.head,p,c,[0,.189,-.008],[.141,.078,.13]),g(this.head,m,c,[0,.152,.018],[.3,.02,.3]),g(this.chest,m,u,[0,.26,.121],[.29,.039,.015])),i==="suit"){for(let x of[-1,1]){let w=g(this.chest,m,u,[x*.043,.332,.125],[.048,.08,.02]);w.rotation.z=x*.45}g(this.chest,m,c,[0,.307,.144],[.035,.042,.02])}this.small&&(this.head.scale.setScalar(1.18),g(this.chest,m,u,[0,.11,.113],[.115,.12,.019])),(n||i==="groundskeeper")&&(g(this.chest,m,l,[0,-.11,0],[.33,.26,.235]),g(this.chest,m,u,[0,.16,.122],[.17,.34,.022]),g(this.head,m,c,[0,.168,.047],[.25,.042,.255]),g(this.head,p,c,[0,-.04,.048],[.1,.088,.084])),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[];for(let x of[-1,1]){let w=f(this.chest,[x*(n?.166:.194),.355,0]);w.rotation.z=x*.09,y(w,l,.255,.058);let A=f(w,[0,-.25,0]);g(A,p,o,[0,0,0],[.044,.045,.044]),y(A,o,.255,.043),g(A,p,o,[0,-.282,.006],[.05,.073,.033]),g(A,m,o,[x*.029,-.292,.029],[.022,.072,.02]),this.arms.push(w),this.elbows.push(A);let C=f(this.body,[x*.092,-.024,0]);y(C,h,.36,.07);let L=f(C,[0,-.355,0]);y(L,h,.31,.051),g(L,p,h,[0,0,0],[.057,.06,.054]),this.feet.push(g(L,m,c,[0,-.36,.044],[.13,.11,.25])),this.legs.push(C),this.knees.push(L)}let b=new Set,_=[];this.group.traverse(x=>{x.isMesh?b.add(x.geometry):_.push(x)});for(let x of _){let w=new Map;for(let A of[...x.children])if(A.isMesh){let C=w.get(A.material)??[];C.push(A),w.set(A.material,C)}for(let[A,C]of w)if(C.length>1){let L=C.map(D=>(D.updateMatrix(),D.geometry.clone().applyMatrix4(D.matrix))),N=new Je(Rn(L),A);N.castShadow=!0,N.receiveShadow=!0,C.forEach(D=>x.remove(D)),x.add(N),L.forEach(D=>D.dispose())}}let S=new Set;this.meshCount=0,this.bodyMeshes=[],this.group.traverse(x=>{x.isMesh&&(S.add(x.geometry),this.meshCount++,this.bodyMeshes.push(x))}),b.forEach(x=>{S.has(x)||x.dispose()}),this.head.traverse(x=>{x.isMesh&&(x.userData.hitZone="head")});let T=new Set;this.group.traverse(x=>{x.isMesh&&T.add(x.material)}),this.materials=[...T];for(let x of this.materials)x.userData.baseEmissive=x.emissive.clone();this.solePoint=new I,this.motionBlend=0,this.lookYaw=0,this.previousAction="",this.recoilSide=e%2?1:-1,this.update(0,{x:0,y:0,z:0},{x:0,y:-1},!1,0)}soleHeights(){return this.group.updateMatrixWorld(!0),this.feet.map(e=>{let t=1/0;for(let i of[-.5,.5])for(let n of[-.5,.5])for(let r of[-.5,.5])this.solePoint.set(i,n,r).applyMatrix4(e.matrixWorld),t=Math.min(t,this.solePoint.y);return t})}update(e,t,i,n,r=1/60,a={}){let o=!!a.running,l=this.type==="brute",c=this.type==="flanker",h=(o?7:l?2.8:c?4.5:3.8)*(this.small?1.2:this.boss?.88:1),u=e*h,d=Math.sin(u),p=-d,m=Math.sin(e*1.43+this.variant*1.91);this.motionBlend+=(Number(n)-this.motionBlend)*Math.min(1,Math.max(0,r)*9);let v=this.motionBlend,g=Math.max(0,Math.sin(e*.55+this.variant*2.23))**10,f=a.state??"pursue";f==="stagger"&&this.previousAction!=="stagger"&&(this.recoilSide*=-1),this.previousAction=f,this.group.position.set(t.x,t.z+.01,-t.y);let y=0;if(Math.hypot(i.x,i.y)>1e-4){let _=Math.atan2(i.x,-i.y),S=Math.atan2(Math.sin(_-this.heading),Math.cos(_-this.heading));this.heading+=S*Math.min(1,r*8),y=Math.atan2(Math.sin(_-this.heading),Math.cos(_-this.heading))}this.lookYaw+=(Math.max(-.55,Math.min(.55,y))*.8-this.lookYaw)*Math.min(1,r*10),this.group.rotation.y=this.heading,this.body.position.set(0,.8,0),this.body.scale.set(1,1,1),this.body.rotation.set(c?.035:0,(o?.075:l?.06:.04)*d*v,.008*m+(l?.045:o?.018:.028)*d*v),this.chest.rotation.set((c?.28:o?.23:l?.12:.17)+.008*m,-d*v*(o?.13:c?.1:.055),m*.012-d*v*(l?.07:.035)),this.head.rotation.set(.015*m,this.lookYaw+(1-v)*(.13*Math.sin(e*.71+this.variant)+g*.18),-.09-this.variant*.02+.04*Math.sin(e*1.7+this.variant));let M=o?.49:l?.235:c?.3:.31;for(let _=0;_<2;_++){let S=_?p:d,T=_?1:-1;this.legs[_].rotation.set(S*M*v,0,T*(l?.026:.012)),this.knees[_].rotation.set((c?.16:_?.035:0)+Math.max(0,-S)*(o?.78:c?.4:.28)*v,0,0),this.arms[_].rotation.set(o?-.38+S*.61:-(_?.91:.69)+S*.09*v+.035*m,T*(c?.1:.025),T*(.075+.035*S*v)),this.elbows[_].rotation.set(o?-.83-S*.17:-(_?.22:.17),0,0)}!n&&f==="pursue"&&(this.arms[this.variant%2].rotation.x-=g*.26,this.elbows[(this.variant+1)%2].rotation.x-=g*.17),(f==="hide"||f==="peek")&&(this.chest.rotation.x=.31,this.knees[0].rotation.x=this.knees[1].rotation.x=.28,this.head.rotation.y=this.lookYaw+Math.sin(e*1.35+this.variant)*.22,this.chest.rotation.y=(f==="peek"?.13:.04)*Math.sin(e*1.35),this.arms[0].rotation.x=-.5,this.arms[1].rotation.x=-.6);let b=Math.max(0,Math.min(1,a.progress??0));if(f==="windup"){let _=b*b*(3-2*b);this.arms[0].rotation.x=-.9-_*1.75,this.arms[1].rotation.x=l?this.arms[0].rotation.x:-.85-_*.74,this.elbows[0].rotation.x=l?-.55:-.4,this.elbows[1].rotation.x=l?-.55:-.24,this.chest.rotation.x=.16-_*(l?.22:.15),this.chest.rotation.y=l?0:-_*.17,this.head.rotation.x=-_*.065,this.body.rotation.z=l?0:-_*.03}else if(f==="recover"){let _=Math.sin(Math.min(1,b/.28)*Math.PI/2),S=Math.max(0,(b-.28)/.72),T=-2.65+_*2.27-S*.31;this.arms[0].rotation.x=T,this.arms[1].rotation.x=l?T:-1.59+_*.95-S*.27,this.elbows[0].rotation.x=l?-.55+_*.42:-.4+_*.25,this.elbows[1].rotation.x=l?this.elbows[0].rotation.x:-.22,this.chest.rotation.x=(l?-.06:.01)+_*(l?.5:.32)-S*.28,this.chest.rotation.y=l?0:-.17+_*.35-S*.18,this.head.rotation.x=_*.08*(1-S)}else if(f==="stagger"){let _=Math.sin(b*Math.PI),S=l?.11:this.type==="runner"?.34:c?.23:.26;this.body.rotation.x=-S*_,this.body.rotation.y=this.recoilSide*S*.65*_,this.body.rotation.z=this.recoilSide*S*.2*_,this.head.rotation.x=-S*.65*_,this.head.rotation.z+=this.recoilSide*.2*_,this.arms[0].rotation.x-=_*.34,this.arms[1].rotation.x+=_*.16}if(f==="dead"){let _=Math.max(0,Math.min(1,(b-.06)/.54)),S=_*_*(3-2*_),T=this.variant%2?1:-1,x=this.type==="runner"?Math.sin(Math.min(1,b/.3)*Math.PI)*.12:0;this.body.position.y=.8-.57*S,this.body.position.z=(this.deathVariant===0?-.13:this.deathVariant===1?-.05:0)*S,this.body.rotation.y=T*.07*S,this.body.rotation.z=0,this.deathVariant===1?(this.body.rotation.z=T*1.45*S,this.body.rotation.x=.1*S,this.chest.rotation.x=.17+.08*S,this.body.position.x=T*.05*S):this.deathVariant===2?(this.body.rotation.x=-1.55*S-x,this.chest.rotation.x=.17-.1*S):(this.body.rotation.x=1.5*S+x,this.chest.rotation.x=.17+.23*S),this.head.rotation.x=.2*S,this.head.rotation.z+=T*.1*S,this.legs[0].rotation.x=this.legs[1].rotation.x=-(this.deathVariant===0?1:this.deathVariant===1?.5:.4)*S,this.knees[0].rotation.x=this.knees[1].rotation.x=(this.deathVariant===0?2.2:this.deathVariant===1?1:.8)*S,this.arms[0].rotation.x=this.arms[1].rotation.x=-.16-S*.12,this.arms[0].rotation.z=-.065,this.arms[1].rotation.z=.065,this.elbows[0].rotation.x=this.elbows[1].rotation.x=-.25-S*.32}for(let _=0;_<2;_++)this.feet[_].rotation.set(...f==="dead"?[0,0,0]:[-this.legs[_].rotation.x-this.knees[_].rotation.x-this.body.rotation.x,0,-this.legs[_].rotation.z-this.body.rotation.z]);if(f!=="dead"){let _=Math.min(...this.soleHeights());this.body.position.y+=(t.z+.004-_)/this.group.scale.y}this.group.updateMatrixWorld(!0);for(let _ of this.materials){_.emissive.copy(_.userData.baseEmissive),a.hitFlash>0&&_.emissive.addScalar(a.hitFlash*.35);let S=f==="dead"?Math.max(0,Math.min(1,(1-b)/.26)):1;_.transparent!==S<1&&(_.transparent=S<1,_.needsUpdate=!0),_.opacity=S,_.depthWrite=S>.5}if(f==="dead"){this.deathBounds??=new Ft,this.meshBounds??=new Ft,this.group.updateMatrixWorld(!0),this.deathBounds.makeEmpty();for(let _ of this.bodyMeshes)_.geometry.boundingBox||_.geometry.computeBoundingBox(),this.meshBounds.copy(_.geometry.boundingBox).applyMatrix4(_.matrixWorld),this.deathBounds.union(this.meshBounds);this.group.position.y+=t.z+.005-this.deathBounds.min.y}}dispose(){let e=new Set,t=new Set;this.group.traverse(i=>{i.isMesh&&(e.add(i.geometry),t.add(i.material))}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.group.removeFromParent()}};var Xr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),Rd=s=>({x:s.x,y:s.y,z:s.z}),vm=()=>globalThis.performance?.now()??Date.now(),Hs=class extends Gs{constructor(e){super({...e}),this.allSegments=this.segments,this.allObstacles=e.obstacles,this.allSurfaces=e.surfaces,this.buckets=new Map}bucket(e,t){let i=Math.floor(e/2),n=Math.floor(t/2),r=`${i},${n}`;if(this.buckets.has(r))return this.buckets.get(r);let a=(p,m,v,g)=>p<=i*2+2&&v>=i*2&&m<=n*2+2&&g>=n*2,o=p=>[Math.min(...p.map(m=>m[0])),Math.min(...p.map(m=>m[1])),Math.max(...p.map(m=>m[0])),Math.max(...p.map(m=>m[1]))],l=.3,c=this.allSegments.filter(p=>{let m=p.thickness/2+l;return a(Math.min(p.a[0],p.b[0])-m,Math.min(p.a[1],p.b[1])-m,Math.max(p.a[0],p.b[0])+m,Math.max(p.a[1],p.b[1])+m)}),h=this.allObstacles.filter(p=>{let[m,v,g,f]=p.box??o(p.polygon);return a(m-l,v-l,g+l,f+l)}),u=this.allSurfaces.filter(p=>a(...o(p.polygon))),d={segments:c,obstacles:h,surfaces:u};return this.buckets.set(r,d),d}blocked(e,t,i){let n=this.bucket(e,t);return this.segments=n.segments,this.data.obstacles=n.obstacles,super.blocked(e,t,i)}support(e,t,i){return this.data.surfaces=this.bucket(e,t).surfaces,super.support(e,t,i)}},jr=class{constructor(e,{spacing:t=.2,radius:i=.18}={}){this.nav=new Hs(e),this.nav.radius=i,this.spacing=t,this.cells=new Map,this.edges=new Map,this.nodes=[],this.data=e}cell(e,t){let i=`${e},${t}`;if(this.cells.has(i))return this.cells.get(i);let n=e*this.spacing,r=t*this.spacing,a=(this.data.floorLevels??[{z:0},{z:this.data.levelHeight}]).map(c=>c.z);a.push(...this.nav.rampHeights(n,r));for(let c of this.nav.bucket(n,r).surfaces)$t(n,r,c.polygon)&&a.push(c.z);let o=this.nav.stairHeight(n,r);o!==null&&a.push(o);let l=[];for(let c of a){let h=this.nav.support(n,r,c);if(h===null||l.some(d=>Math.abs(d.z-h)<.035)||this.nav.blocked(n,r,h))continue;let u={x:n,y:r,z:h,ix:e,iy:t,id:this.nodes.length};this.nodes.push(u),l.push(u)}return this.cells.set(i,l),l}clear(e,t){let i=Math.hypot(t.x-e.x,t.y-e.y);if(i<1e-5)return Math.abs(e.z-t.z)<.04;let n=Math.ceil(i/.04),r=e.z;for(let a=1;a<=n;a++){let o=a/n,l=e.x+(t.x-e.x)*o,c=e.y+(t.y-e.y)*o,h=this.nav.support(l,c,r);if(h===null||this.nav.blocked(l,c,h))return!1;r=h}return Math.abs(r-t.z)<.045}connectors(e,t=!0){let i=Math.round(e.x/this.spacing),n=Math.round(e.y/this.spacing),r=[];for(let a=-2;a<=2;a++)for(let o=-2;o<=2;o++)for(let l of this.cell(i+a,n+o))Math.abs(l.z-e.z)>.35||r.push(l);return r.sort((a,o)=>Xr(a,e)-Xr(o,e)).filter(a=>t?this.clear(e,a):this.clear(a,e)).slice(0,8)}neighbours(e){if(this.edges.has(e.id))return this.edges.get(e.id);let t=[];for(let i=-1;i<=1;i++)for(let n=-1;n<=1;n++)if(!(!i&&!n))for(let r of this.cell(e.ix+i,e.iy+n))Math.abs(r.z-e.z)>.39||!this.clear(e,r)||t.push(r);return this.edges.set(e.id,t),t}search(e,t){return new Pd(this,e,t)}path(e,t,i=6e4){let n=this.search(e,t);for(;!n.done&&n.expanded<i;)n.step(1e3,1/0);return n.path}},Cd=class{constructor(){this.a=[]}push(e){let t=this.a,i=t.length;for(t.push(e);i;){let n=i-1>>1;if(t[n].f<=e.f)break;t[i]=t[n],i=n}t[i]=e}pop(){let e=this.a,t=e[0],i=e.pop();if(e.length){let n=0;for(;2*n+1<e.length;){let r=2*n+1;if(r+1<e.length&&e[r+1].f<e[r].f&&r++,e[r].f>=i.f)break;e[n]=e[r],n=r}e[n]=i}return t}get length(){return this.a.length}},Pd=class{constructor(e,t,i){this.planner=e,this.from=Rd(t),this.to=Rd(i),this.path=null,this.done=!1,this.expanded=0,this.heap=new Cd,this.cost=new Map,this.parent=new Map,this.closed=new Set,this.initialized=!1}step(e=48,t=3){if(this.done)return!0;let i=vm(),n=this.planner;if(!this.initialized){if(this.initialized=!0,n.clear(this.from,this.to))return this.path=[this.from,this.to],this.done=!0,!0;let a=n.connectors(this.to,!1);this.goals=new Set(a.map(o=>o.id));for(let o of n.connectors(this.from)){let l=Xr(this.from,o);this.cost.set(o.id,l),this.heap.push({n:o,g:l,f:l+Xr(o,this.to)})}if(!this.goals.size||!this.heap.length)return this.done=!0,!0}let r=0;for(;this.heap.length&&r<e&&vm()-i<t;){let{n:a,g:o}=this.heap.pop();if(!this.closed.has(a.id)){if(this.closed.add(a.id),this.expanded++,r++,this.goals.has(a.id)){let l=[this.to],c=a;for(;c;)l.push(Rd(c)),c=n.nodes[this.parent.get(c.id)];return l.push(this.from),this.path=l.reverse(),this.done=!0,!0}for(let l of n.neighbours(a)){if(this.closed.has(l.id))continue;let c=o+Xr(a,l);c>=(this.cost.get(l.id)??1/0)||(this.cost.set(l.id,c),this.parent.set(l.id,a.id),this.heap.push({n:l,g:c,f:c+Xr(l,this.to)}))}if(this.expanded>=6e4)return this.done=!0,!0}}return this.heap.length||(this.done=!0),this.done}};var Ai=s=>({x:s.x,y:s.y,z:s.z}),Kr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),Ri=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),Yr=()=>performance.now(),Jr=(s,e=0)=>{let t=s+Math.imul(e+17,92821)>>>0;return t=Math.imul(t^t>>>16,73244475),t=Math.imul(t^t>>>16,73244475),((t^t>>>16)>>>0)/4294967296},q_=Object.freeze({shambler:{health:75,speed:1.06,radius:.25,wallRadius:.18,damage:12,range:.84,windup:.78,recovery:1.05},runner:{health:52,speed:1.88,radius:.23,wallRadius:.18,damage:9,range:.79,windup:.48,recovery:.82},brute:{health:180,speed:.79,radius:.31,wallRadius:.23,damage:26,range:1.02,windup:1.16,recovery:1.48},flanker:{health:90,speed:1.31,radius:.24,wallRadius:.18,damage:14,range:.85,windup:.64,recovery:1.03}}),ih=class{constructor(e,{maxAlive:t=12,onAttack:i=()=>{},onDeath:n=()=>{},canSpawn:r=()=>!0}={}){this.data=e,this.maxAlive=Math.max(1,Math.min(20,Math.floor(t))),this.onAttack=i,this.onDeath=n,this.canSpawn=r,this.group=new at,this.group.name="Survival horde",this.actors=[],this.planners=new Map,this.nextId=1,this.time=0,this.wave=0,this.total=0,this.spawned=0,this.killed=0,this.skipped=0,this.droppedSpawns=0,this.active=!1,this.player={x:0,y:0,z:0},this.heading={x:0,y:1},this.spawnJob=null,this.candidates=[],this.nextSpawn=0,this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0,this.roundRobin=0}get positions(){return this.actors.filter(e=>e.alive).map(e=>Ai(e.nav.position))}planner(e=.18){return this.planners.has(e)||this.planners.set(e,new jr(this.data,{radius:e,spacing:e>.24?.16:.2})),this.planners.get(e)}reset(){for(let e of this.actors)e.figure.dispose();this.actors=[],this.group.clear(),this.spawnJob=null,this.candidates=[],this.active=!1,this.total=this.spawned=this.killed=this.skipped=this.droppedSpawns=0,this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0,this.time=0}startWave(e,t,i){return this.reset(),this.wave=Math.max(1,Math.floor(e)),this.total=Math.max(1,Math.floor(i??4+this.wave*3)),this.active=!0,this.player=Ai(t),this.nextSpawn=0,this.state()}state(){let e=this.actors.filter(n=>n.alive).length,t=Math.max(0,this.total-this.spawned-this.droppedSpawns),i=this.actors.find(n=>n.alive&&n.boss);return{wave:this.wave,alive:e,queued:t,killed:this.killed,total:this.total,spawned:this.spawned,skipped:this.skipped,complete:this.active&&e===0&&t===0&&!this.spawnJob,positions:this.positions,boss:i?{id:i.id,health:i.health,maxHealth:i.maxHealth}:null}}blocks(e,t=.18,i=null){return this.actors.some(n=>n.alive&&n.id!==i&&Math.abs(n.nav.position.z-e.z)<1.6&&Ri(n.nav.position,e)<n.radius+t+1e-5)}typeFor(e){let t=this.wave%5===0?["brute","shambler","brute","runner","brute","flanker","brute","shambler"]:this.wave%3===0?["runner","runner","shambler","runner","flanker","runner","brute","runner"]:this.wave===1?["shambler","shambler","runner","shambler"]:this.wave===2?["shambler","runner","flanker","shambler","runner"]:["shambler","runner","flanker","brute","runner","shambler"];return t[e%t.length]}appearance(e,t){let i=this.wave%5===0&&e===0,n=["woman-coat","worker","hoodie","child","suit","woman-hoodie"],r=i?"groundskeeper":n[(e+this.wave-1)%n.length];r==="child"&&t==="brute"&&(r="worker");let a={...q_[t]};return i?Object.assign(a,{health:350,speed:.69,radius:.32,wallRadius:.25,damage:34,windup:1.38,recovery:1.75,range:1.08}):r==="child"&&Object.assign(a,{health:Math.round(a.health*.65),speed:a.speed*1.08,radius:.17,wallRadius:.13,range:.66,windup:a.windup*.9,recovery:a.recovery*.92}),{style:r,boss:i,stats:a}}spawnAllowed(e,t){return this.canSpawn(e,t)?!0:(this.spawnVisibilityBlocked=!0,this.spawnStall=0,!1)}spawnCandidates(e,t,i,n){let r=this.planner(i),a=[];for(let h of this.data.rooms??[]){let[u,d,p]=h.position;for(let[m,v]of[[0,0],[.65,0],[-.65,0],[0,.65],[0,-.65]])a.push({x:u+m,y:d+v,z:p})}for(let h of[6,9,13])for(let u=0;u<20;u++){let d=u*Math.PI/10;a.push({x:e.x+Math.cos(d)*h,y:e.y+Math.sin(d)*h,z:e.z})}let o=Math.hypot(t.x,t.y)||1,l=t.x/o,c=t.y/o;return a.filter(h=>Kr(h,e)>5&&Kr(h,e)<27&&r.nav.support(h.x,h.y,h.z)!==null&&!r.nav.blocked(h.x,h.y,h.z)&&!this.blocks(h,.45)&&this.spawnAllowed(h,n)).map(h=>{let u=Ri(h,e),d=((h.x-e.x)*l+(h.y-e.y)*c)/(u||1)>.55;return{...h,score:Math.abs(u-9)+(d?6:0)+Math.abs(h.z-e.z)*.7}}).sort((h,u)=>h.score-u.score).slice(0,90)}createActor(e,t,i,n=this.appearance(this.spawned,e)){let{stats:r,style:a,boss:o}=n,l=this.nextId++,c=o?0:Math.floor(Jr(l,55)*3),h=new Io(l%3,{type:e,style:a,boss:o,deathVariant:c});h.group.userData.actorId=l,h.group.traverse(v=>{v.isMesh&&(v.userData.actorId=l)}),this.group.add(h.group);let u=new Hs(this.data);u.radius=r.wallRadius,u.position=Ai(t);let d=1+Math.min(.55,Math.max(0,this.wave-1)*.035),p=Math.round(r.health*d),m={id:l,type:e,style:a,boss:o,stats:r,figure:h,nav:u,radius:r.radius,health:p,maxHealth:p,alive:!0,state:"pursue",stateTime:0,path:i,index:1,job:null,lastTarget:Ai(this.player),nextPlan:this.time+.4+l%5*.12,stalled:0,unreachable:0,lastProgress:this.time,phase:l*1.713,flankSide:l%2?1:-1,flankUntil:0,attackAim:{x:0,y:1},hitFlash:0,staggerDuration:.35,deathTime:0,deathDuration:h.deathDuration,deathVariant:c,knockback:{x:0,y:0},speedMultiplier:.78+Jr(l,this.wave)*.47,temperament:!o&&this.wave>2&&(this.spawned+this.wave)%7===0?"ambusher":"pursuer",hideGoal:null,hideUntil:0,nextHide:this.time+12+Jr(l,9)*8,alerted:!1,noticeDirection:{x:this.player.x-t.x,y:this.player.y-t.y}};return h.update(this.time,t,{x:this.player.x-t.x,y:this.player.y-t.y},!1,1),this.actors.push(m),this.spawned++,m.temperament==="ambusher"&&this.beginHide(m),m}spawnStep(e,t){if(!(this.state().queued<=0||this.actors.filter(i=>i.alive).length>=this.maxAlive)&&(this.spawnVisibilityBlocked||(this.spawnStall+=e),!(this.time<this.nextSpawn))){if(!this.spawnJob){let i=this.typeFor(this.spawned),n=this.appearance(this.spawned,i),r=n.stats.wallRadius;this.candidates.length||(this.spawnVisibilityBlocked=!1,this.candidates=this.spawnCandidates(this.player,this.heading,r,n),this.candidateRounds++);let a=this.candidates.shift();a&&!this.planner(r).nav.blocked(a.x,a.y,a.z)&&this.spawnAllowed(a,n)&&(this.spawnJob={point:a,type:i,appearance:n,job:this.planner(r).search(a,this.player),started:this.time})}if(this.spawnJob&&Yr()<t){let{point:i,type:n,appearance:r,job:a,started:o}=this.spawnJob;a.step(28,Math.max(.1,t-Yr())),(a.done||a.expanded>12e3||this.time-o>8)&&(a.path&&Kr(i,this.player)>5&&!this.blocks(i,r.stats.radius+.16)&&this.spawnAllowed(i,r)&&(this.createActor(n,i,a.path,r),this.nextSpawn=this.time+Math.max(.28,.72-this.wave*.035),this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0),this.spawnJob=null)}if(!this.spawnVisibilityBlocked&&this.spawnStall>28){let i=this.state().queued;this.skipped+=i,this.droppedSpawns+=i,this.spawnJob=null,this.candidates=[]}}}target(e){let t=e.nav.position,i=this.player,n=this.planner(e.stats.wallRadius);if(e.hideGoal&&["seeking-hide","hide","peek"].includes(e.state))return Ai(e.hideGoal);if(e.type==="flanker"&&Ri(t,i)>2.3&&Math.abs(t.z-i.z)<.3){let r=i.x-t.x,a=i.y-t.y,o=Math.hypot(r,a)||1,l=1.25*e.flankSide,c={x:i.x-a/o*l,y:i.y+r/o*l,z:i.z};if(n.nav.support(c.x,c.y,c.z)!==null&&!n.nav.blocked(c.x,c.y,c.z)&&n.clear(c,i))return c}return Ai(i)}canSee(e,t=this.player){let i=e.nav.position,n=t.x-i.x,r=t.y-i.y,a=Math.hypot(n,r),o=e.noticeDirection;if(a>12||Math.abs(i.z-t.z)>.45)return!1;let l=Math.hypot(o.x,o.y)||1;return(n*o.x+r*o.y)/(Math.max(.001,a)*l)>.5&&this.planner(e.stats.wallRadius).clear(i,t)}wallOccludes(e,t){let i=this.player,n=i.x-t.x,r=i.y-t.y;for(let a of this.planner(e.stats.wallRadius).nav.allSegments){if(a.bottom>t.z+1.3||a.top<t.z+1.3)continue;let o=a.b[0]-a.a[0],l=a.b[1]-a.a[1],c=n*l-r*o;if(Math.abs(c)<1e-8)continue;let h=a.a[0]-t.x,u=a.a[1]-t.y,d=(h*l-u*o)/c,p=(h*r-u*n)/c;if(d>0&&d<1&&p>=0&&p<=1)return!0}return!1}coverPoint(e){let t=e.nav.position,i=this.planner(e.stats.wallRadius);if(this.wallOccludes(e,t))return Ai(t);let n=[];for(let r of i.nav.allSegments){if(r.bottom>t.z+.3||r.top<t.z+1.2)continue;let a=r.b[0]-r.a[0],o=r.b[1]-r.a[1],l=Math.hypot(a,o);if(l<.6)continue;let c=a/l,h=o/l,u=r.thickness/2+e.stats.wallRadius+.16;for(let d of[r.a,r.b])for(let p of[-1,1]){let m={x:d[0]-h*u*p,y:d[1]+c*u*p,z:t.z};Ri(t,m)<4&&Ri(m,this.player)>2&&n.push(m)}}for(let r of n.sort((a,o)=>Ri(a,t)-Ri(o,t)).slice(0,18))if(i.nav.support(r.x,r.y,r.z)!==null&&!i.nav.blocked(r.x,r.y,r.z)&&!this.blocks(r,e.radius,e.id)&&this.wallOccludes(e,r))return r;return null}beginHide(e){let t=this.coverPoint(e);if(e.nextHide=this.time+14+Jr(e.id,Math.floor(this.time))*8,!t)return!1;let i=e.path?.[1]??this.player;return e.hideGoal=t,e.hideUntil=this.time+6+Jr(e.id,4)*3.5,e.state=Ri(t,e.nav.position)<.2?"hide":"seeking-hide",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=!1,e.noticeDirection={x:i.x-e.nav.position.x,y:i.y-e.nav.position.y},e.peekBase=Math.atan2(e.noticeDirection.y,e.noticeDirection.x),!0}endHide(e,t=!1){e.hideGoal=null,e.state="pursue",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=t}canStrike(e,t=0){let i=e.nav.position;return Math.abs(i.z-this.player.z)<.42&&Ri(i,this.player)<=e.stats.range+t&&this.planner(e.stats.wallRadius).clear(i,this.player)}tryMove(e,t,i,{separate:n=!0}={}){let r=Math.max(1,Math.ceil(Math.hypot(t,i)/.035)),a=Ai(e.nav.position);for(let o=0;o<r;o++){let l=Ai(e.nav.position);e.nav.move(t/r,i/r);let c=e.nav.position;if(Math.abs(c.z-this.player.z)<1.6&&Ri(c,this.player)<e.radius+.18||n&&this.blocks(c,e.radius,e.id)){e.nav.position=l;break}}return Ri(a,e.nav.position)}moveActor(e,t){if(!e.path||e.index>=e.path.length)return 0;let i=this.planner(e.stats.wallRadius),n=e.nav.position;for(let M=Math.min(e.path.length-1,e.index+4);M>e.index;M--)if(Kr(n,e.path[M])<1.1&&i.clear(n,e.path[M])){e.index=M;break}let r=e.path[e.index],a=r.x-n.x,o=r.y-n.y,l=Math.hypot(a,o);if(l<.045)return e.index++,0;let c=e.stats.speed*e.speedMultiplier*(1+Math.min(.2,this.wave*.009));e.type==="runner"&&(c*=Math.sin(this.time*.8+e.phase)>.35?1.2:.84),e.type==="brute"&&(c*=.94+.06*Math.sin(this.time*2+e.phase));let h=Math.min(l,c*t),u=a/l,d=o/l,p=0,m=0;for(let M of this.actors)if(M!==e&&M.alive&&Math.abs(M.nav.position.z-n.z)<1.2){let b=n.x-M.nav.position.x,_=n.y-M.nav.position.y,S=Math.hypot(b,_),T=e.radius+M.radius+.35;S>0&&S<T&&(p+=b/S*(T-S)/T,m+=_/S*(T-S)/T)}let v=u+p*.8,g=d+m*.8,f=Math.hypot(v,g)||1,y=this.tryMove(e,v/f*h,g/f*h);if(y<h*.2){let M=e.flankSide;y+=this.tryMove(e,(u*.35-d*M*.75)*h,(d*.35+u*M*.75)*h)}return e.stalled=y<h*.12?e.stalled+t:Math.max(0,e.stalled-t*2),y>.003&&(e.lastProgress=this.time),e.stalled>.7&&(e.path=null,e.job=null,e.nextPlan=this.time+.15,e.stalled=0,e.flankSide*=-1),y}planActor(e,t){if(e.state==="hide"||e.state==="peek")return;let i=this.target(e),n=this.planner(e.stats.wallRadius);if(!e.job&&this.time>=e.nextPlan&&(!e.path||e.index>=e.path.length||Kr(i,e.lastTarget)>.75)&&(e.job=n.search(e.nav.position,i),e.lastTarget=Ai(i),e.nextPlan=this.time+1+e.id%4*.14,e.jobStarted=this.time),e.job&&Yr()<t&&(e.job.step(22,Math.max(.1,t-Yr())),e.job.done||this.time-e.jobStarted>8)){if(e.job.path){e.path=e.job.path,e.index=1,e.unreachable=0;let r=1/0;for(let a=1;a<e.path.length;a++){let o=Kr(e.nav.position,e.path[a]);o<r&&n.clear(e.nav.position,e.path[a])&&(e.index=a,r=o)}}else e.unreachable++,e.path=null,e.nextPlan=this.time+1.4;e.job=null}e.unreachable>=5&&this.time-e.lastProgress>40&&(e.alive=!1,e.state="dead",e.deathTime=0,e.retired=!0,this.skipped++)}damage(e,t,{headshot:i=!1,knockback:n=null}={}){let r=this.actors.find(a=>a.id===e&&a.alive);if(!r||!Number.isFinite(t)||t<=0)return{hit:!1,killed:!1,id:e};if(r.health=Math.max(0,r.health-t),r.hitFlash=1,n){let a=Array.isArray(n)?n[0]:n.x,o=Array.isArray(n)?n[1]:n.y;if(Number.isFinite(a)&&Number.isFinite(o)){let l=Math.hypot(a,o),c=l>1.1?1.1/l:1;r.knockback={x:a*c,y:o*c}}}return r.health===0?(r.alive=!1,r.state="dead",r.deathTime=0,r.job=null,this.killed++,this.onDeath({id:r.id,type:r.type,style:r.style,boss:r.boss,headshot:i,position:Ai(r.nav.position)})):(r.state="stagger",r.stateTime=0,r.hideGoal=null,r.alerted=!0,r.staggerDuration=(r.type==="brute"?.2:.34)+(i?.14:0)),{hit:!0,killed:!r.alive,health:r.health,id:e}}step(e,t,i={x:0,y:1}){if(!this.active)return this.state();e=Math.max(0,Math.min(.08,e)),this.time+=e,this.player=Ai(t),this.heading=Array.isArray(i)?{x:i[0],y:i[1]}:typeof i=="number"?{x:-Math.sin(i),y:Math.cos(i)}:i;let n=Yr()+4;this.spawnStep(e,n);let r=this.actors.filter(a=>a.alive);for(let a=0;a<r.length;a++){let o=r[(a+this.roundRobin)%r.length];if(Yr()>=n)break;this.planActor(o,n)}this.roundRobin++;for(let a of[...this.actors]){let o=Ai(a.nav.position);if(a.hitFlash=Math.max(0,a.hitFlash-e*5),!a.alive){a.deathTime+=e,a.figure.update(this.time,a.nav.position,{x:0,y:0},!1,e,{state:"dead",progress:a.deathTime/a.deathDuration}),a.deathTime>=a.deathDuration&&(a.figure.dispose(),this.actors.splice(this.actors.indexOf(a),1));continue}a.stateTime+=e;let l=0,c=a.knockback;if(Math.hypot(c.x,c.y)>.001){let d=1-Math.exp(-e*12);this.tryMove(a,c.x*d,c.y*d),c.x*=1-d,c.y*=1-d}if(["hide","peek","seeking-hide"].includes(a.state)){let d=a.peekBase+Math.sin(this.time*1.35+a.phase)*.55;a.noticeDirection={x:Math.cos(d),y:Math.sin(d)},this.time>=a.hideUntil||this.canSee(a)?this.endHide(a,this.canSee(a)):a.state==="seeking-hide"?(l=this.moveActor(a,e),a.hideGoal&&Ri(a.nav.position,a.hideGoal)<.25&&(a.state="hide",a.stateTime=0,a.path=null,a.job=null)):a.state=Math.sin(this.time*1.2+a.phase)>.25?"peek":"hide"}else if(a.state==="pursue"&&a.type==="flanker"&&!a.boss&&this.wave>2&&this.time>=a.nextHide)a.nextHide=this.time+14,Ri(a.nav.position,t)>2.5&&Ri(a.nav.position,t)<9&&Jr(a.id,Math.floor(this.time/10))<.35&&this.beginHide(a)||(l=this.moveActor(a,e));else if(a.state==="stagger")a.stateTime>=a.staggerDuration&&(a.state="pursue",a.stateTime=0);else if(a.state==="windup"){if(a.stateTime>=a.stats.windup){let d=t.x-a.nav.position.x,p=t.y-a.nav.position.y,m=Math.hypot(d,p)||1;this.canStrike(a,.08)&&(d*a.attackAim.x+p*a.attackAim.y)/m>.55&&this.onAttack({id:a.id,type:a.type,damage:a.stats.damage,position:Ai(a.nav.position)}),a.state="recover",a.stateTime=0}}else if(a.state==="recover")a.stateTime>=a.stats.recovery&&(a.state="pursue",a.stateTime=0);else if(this.canStrike(a)){let d=t.x-a.nav.position.x,p=t.y-a.nav.position.y,m=Math.hypot(d,p)||1;a.state="windup",a.stateTime=0,a.attackAim={x:d/m,y:p/m}}else l=this.moveActor(a,e);let h=a.state==="windup"||a.state==="recover"?a.attackAim:["hide","peek"].includes(a.state)?a.noticeDirection:{x:a.nav.position.x-o.x,y:a.nav.position.y-o.y};Math.hypot(h.x,h.y)>1e-4&&!["hide","peek","seeking-hide"].includes(a.state)&&(a.noticeDirection={...h});let u=a.state==="windup"?a.stats.windup:a.state==="recover"?a.stats.recovery:a.staggerDuration;a.figure.update(this.time+a.phase,a.nav.position,h,l>.001,e,{state:a.state,progress:a.stateTime/u,running:a.type==="runner"&&l>.001,hitFlash:a.hitFlash})}return this.state()}};function X_(s,e={},t=new Ft){let i=e.style==="child",n=e.boss||e.stats?.radius>=.3,r=i?.82:n?1.3:1.12,a=i?2.05:n?3.1:2.8;return t.min.set(s.x-r,s.z-.15,-s.y-r),t.max.set(s.x+r,s.z+a,-s.y+r),t}function ym(s,{margin:e=.15}={}){let t=new ke,i=new ke,n=new vn,r=new Ft,a=1+Math.max(0,e);return(o,l={})=>{if(!s?.isCamera||![o?.x,o?.y,o?.z].every(Number.isFinite))return!1;s.updateWorldMatrix(!0,!1),t.copy(s.projectionMatrix);for(let c of[0,4,8,12,1,5,9,13])t.elements[c]/=a;return i.multiplyMatrices(t,s.matrixWorldInverse),n.setFromProjectionMatrix(i,s.coordinateSystem,s.reversedDepth),!n.intersectsBox(X_(o,l,r))}}var Ht={bow:{label:"Bow",magazine:1,reserve:18,damage:75,interval:.55,reload:0},pistol:{label:"Pistol",magazine:12,reserve:48,damage:42,interval:.24,reload:1.3},shotgun:{label:"Shotgun",magazine:6,reserve:24,damage:23,pellets:7,interval:.9,reload:2.1},carbine:{label:"Carbine",magazine:24,reserve:96,damage:30,interval:.115,reload:1.8}},nh=s=>({total:4+s*2+(s%3===0?4:0),event:s%5===0?"Heavy footsteps":s%3===0?"The rush":"Hold the house",rest:14}),sh=class{constructor(){this.reset()}reset(){this.health=100,this.score=0,this.kills=0,this.wave=0,this.phase="prepare",this.rest=0,this.inventory={},this.weapon=null,this.cooldown=0,this.reloading=0,this.charge=0,this.firing=!1,this.shoveCooldown=0,this.combo=0,this.comboTime=0}acquire(e){if(!Ht[e])return!1;if(this.inventory[e])return this.supply(),!1;let t=Ht[e];return this.inventory[e]={loaded:e==="bow"?0:t.magazine,reserve:t.reserve},this.weapon=e,this.reloading=0,this.firing=!1,!0}switch(e){this.inventory[e]&&(this.weapon=e,this.reloading=0,this.firing=!1,this.charge=0)}cycle(){let e=Object.keys(Ht).filter(t=>this.inventory[t]);e.length&&this.switch(e[(e.indexOf(this.weapon)+1)%e.length])}reload(){let e=this.inventory[this.weapon],t=Ht[this.weapon];return!e||this.weapon==="bow"||this.reloading||!e.reserve||e.loaded===t.magazine?!1:(this.reloading=t.reload,this.firing=!1,!0)}shoot(){let e=Ht[this.weapon],t=this.inventory[this.weapon];if(!e||this.cooldown>0||this.reloading>0||this.health<=0)return null;let i=this.weapon==="bow"?"reserve":"loaded";if(t[i]<=0)return this.reload(),null;t[i]--,this.cooldown=e.interval;let n={...e,id:this.weapon,charge:Math.max(.2,this.charge)};return this.weapon!=="bow"&&t.loaded===0&&this.reload(),n}tick(e){let t=this.inventory[this.weapon];if(this.weapon!=="bow"&&t&&t.loaded===0&&t.reserve>0&&!this.reloading&&this.reload(),this.cooldown=Math.max(0,this.cooldown-e),this.shoveCooldown=Math.max(0,this.shoveCooldown-e),this.comboTime=Math.max(0,this.comboTime-e),this.comboTime||(this.combo=0),this.firing&&this.weapon==="bow"&&(this.charge=Math.min(1,this.charge+e/1.05)),this.reloading>0&&(this.reloading-=e,this.reloading<=0)){this.reloading=0;let i=this.inventory[this.weapon],n=Ht[this.weapon],r=Math.min(n.magazine-i.loaded,i.reserve);i.loaded+=r,i.reserve-=r}}hurt(e){return this.health=Math.max(0,this.health-e),this.health===0}kill(e=!1){this.kills++,this.combo++,this.comboTime=4;let t=(e?150:100)*Math.min(4,1+Math.floor(this.combo/3));return this.score+=t,t}supply(){for(let[e,t]of Object.entries(this.inventory))t.reserve=Math.min(e==="bow"?60:240,t.reserve+(e==="bow"?8:Ht[e].magazine*2))}nextWave(){return this.wave++,this.phase="wave",nh(this.wave)}finishWave(){this.phase="rest",this.rest=nh(this.wave).rest,this.health=Math.min(100,this.health+12),this.supply(),this.score+=this.wave*100}};function _m(s){let e=[],t=new xi({side:Rt}),i=(n,r,a,o,l,c,h=0)=>{if(o<=0||l<=0||c<=0)return;let u=new Je(new gt(o,c,l),t);u.position.set(n,a,-r),u.rotation.y=h,u.updateMatrixWorld(),e.push(u)};for(let n of s.walls){let[r,a]=n.a,[o,l]=n.b,c=Math.hypot(o-r,l-a),h=(o-r)/c,u=(l-a)/c,d=n.floor*s.levelHeight,p=n.height_m??(n.floor?2.45:2.6),m=[0,c];for(let v of n.openings)m.push(Math.max(0,v[0]-v[1]/2),Math.min(c,v[0]+v[1]/2));m.sort((v,g)=>v-g);for(let v=1;v<m.length;v++){let g=m[v-1],f=m[v],y=(g+f)/2;if(f<=g)continue;let M=n.openings.filter(_=>y>_[0]-_[1]/2&&y<_[0]+_[1]/2).sort((_,S)=>_[2]-S[2]),b=0;for(let _ of[...M,[0,0,p,p]]){let S=Math.min(p,_[2]);S>b&&i(r+h*y,a+u*y,d+(b+S)/2,f-g,n.thickness_m,S-b,Math.atan2(u,h)),b=Math.max(b,_[3])}}}for(let n of s.segments){let r=n.b[0]-n.a[0],a=n.b[1]-n.a[1];i((n.a[0]+n.b[0])/2,(n.a[1]+n.b[1])/2,(n.bottom+n.top)/2,Math.hypot(r,a),n.thickness,n.top-n.bottom,Math.atan2(a,r))}for(let n of s.obstacles){let r=n.box??[Math.min(...n.polygon.map(a=>a[0])),Math.min(...n.polygon.map(a=>a[1])),Math.max(...n.polygon.map(a=>a[0])),Math.max(...n.polygon.map(a=>a[1]))];i((r[0]+r[2])/2,(r[1]+r[3])/2,(n.bottom+n.top)/2,r[2]-r[0],r[3]-r[1],n.top-n.bottom)}for(let n of s.surfaces){let r=new sn(new Ni(n.polygon.map(([o,l])=>new re(o,l))));r.rotateX(-Math.PI/2),r.translate(0,n.z,0);let a=new Je(r,t);a.updateMatrixWorld(),e.push(a)}return e}var rh=class{constructor(){this.enabled=!0,this.context=null}unlock(){try{let e=window.AudioContext||window.webkitAudioContext;e&&!this.context&&(this.context=new e),this.context?.state==="suspended"&&this.context.resume().catch(()=>{})}catch{}}play(e){if(!this.enabled||!this.context||this.context.state!=="running")return;let t=this.context,i=t.currentTime,n=(r,a,o,l,c="sine",h=0)=>{let u=t.createOscillator(),d=t.createGain();u.type=c,u.frequency.setValueAtTime(r,i+h),u.frequency.exponentialRampToValueAtTime(a,i+h+o),d.gain.setValueAtTime(l,i+h),d.gain.exponentialRampToValueAtTime(.001,i+h+o),u.connect(d).connect(t.destination),u.start(i+h),u.stop(i+h+o+.01)};if(e==="bow")n(270,95,.12,.05,"triangle");else if(["pistol","shotgun","carbine"].includes(e)){let r=e==="shotgun"?.18:.09,a=t.createBuffer(1,Math.ceil(t.sampleRate*r),t.sampleRate),o=a.getChannelData(0);for(let h=0;h<o.length;h++)o[h]=(Math.random()*2-1)*Math.pow(1-h/o.length,3);let l=t.createBufferSource(),c=t.createGain();l.buffer=a,c.gain.value=.06,l.connect(c).connect(t.destination),l.start(),n(100,35,r,.08,"triangle")}else e==="hit"?n(680,310,.055,.035,"triangle"):e==="hurt"?n(95,42,.15,.05,"sine"):e==="pickup"?(n(440,660,.1,.035),n(660,880,.12,.025,"sine",.1)):e==="wave"&&(n(160,120,.22,.045,"triangle"),n(120,90,.3,.04,"triangle",.26))}};var ln=(s,e,t={})=>new Je(s,new Kt({color:e,roughness:.6,...t})),Do=.7075;function Id(s,e,t){let i=e.actor!==void 0;if(s.position.copy(e.point).addScaledVector(t,(i?.09:0)-Do),s.quaternion.setFromUnitVectors(new I(0,0,-1),t),i){s.updateWorldMatrix(!0,!1);let n=s.matrixWorld.clone();e.object.updateWorldMatrix(!0,!1),e.object.add(s),s.matrix.copy(e.object.matrixWorld).invert().multiply(n),s.matrixAutoUpdate=!1,s.matrixWorldNeedsUpdate=!0}}function Lo(){let s=new at;s.name="Arrow \xB7 shaft, head and three feathers",s.userData.projectile=!0;let e=ln(new jt(.005,.005,.64,6),12163938);e.rotation.x=Math.PI/2,e.position.z=-.32,e.name="Arrow shaft",s.add(e);let t=ln(new zn(.021,.075,4),5661031,{metalness:.55});t.rotation.x=-Math.PI/2,t.position.z=-.67,t.name="Arrowhead",s.add(t);for(let n=0;n<3;n++){let r=new Ni;r.moveTo(0,0),r.lineTo(.051,-.043),r.lineTo(.04,-.14),r.lineTo(0,-.17),r.closePath();let a=ln(new sn(r),n===0?13145935:15524803,{side:Rt});a.rotation.x=Math.PI/2,a.rotation.z=n*Math.PI*2/3,a.rotation.set(Math.PI/2,0,0);let o=new at;o.rotation.z=n*Math.PI*2/3,o.add(a),o.position.z=-.025,s.add(o),a.name="Arrow feather"}let i=ln(new jt(.009,.009,.025,5),9394738);return i.rotation.x=Math.PI/2,i.position.z=.002,s.add(i),s}function Mm({held:s=!1}={}){let e=new at;e.name="Recurve bow";let t=[];for(let m=0;m<=24;m++){let v=-Math.PI/2+m*Math.PI/24;t.push(new I(0,Math.sin(v)*.42,-Math.cos(v)*.17))}let i=new Wa(new Er(t),32,.012,6,!1),n=ln(i,8542264);n.name="Flexible bow limbs",e.add(n);let r=new Float32Array(i.attributes.position.array),a=ln(new jt(.023,.023,.12,7),3681573);a.position.z=-.165,e.add(a);let o=new nn(new ot().setFromPoints([t[0],new I(0,0,.025),t[24]]),new yn({color:15787464}));o.name="Bow string",e.add(o);let l=Lo();l.name="Nocked arrow",l.position.set(-.018,0,.025),e.add(l);let c=new Et;c.name="Projectile origin",c.position.copy(l.position),e.add(c);let h=new at;h.visible=s,e.add(h);let u=ln(new gt(.065,.11,.058),12687990);u.position.set(.026,0,-.155),h.add(u);let d=ln(new gt(.054,.065,.045),12687990);d.position.set(-.023,0,.025),h.add(d);let p=ln(new gt(.085,.11,.07),4347726);return p.position.set(.07,-.055,-.11),p.rotation.z=.4,h.add(p),e.userData.animate=(m=0,v=0,g=!0)=>{let f=v>0?Math.sin((.28-v)*105)*v*.065:0,y=i.attributes.position;for(let T=0;T<y.count;T++){let x=T*3,w=r[x+1],A=Math.abs(w/.42);y.setXYZ(T,r[x],w*(1-.08*m),r[x+2]+A*.07*m+f*A)}y.needsUpdate=!0;let M=.42*(1-.08*m),b=.07*m+f,_=.025+m*.27+f*2.5,S=o.geometry.attributes.position;S.setXYZ(0,0,-M,b),S.setXYZ(1,0,0,_),S.setXYZ(2,0,M,b),S.needsUpdate=!0,c.position.set(-.018,0,_),l.position.copy(c.position),l.visible=g,d.position.z=_},e.userData.animate(),e}function Sm(s){let e=new at;e.name=s;let t=(p,m,v,g,f,y)=>{let M=ln(p,m,y);return M.position.set(v,g,f),e.add(M),M},i=3621439,n=s==="shotgun"?8409904:3556668,r=s==="pistol"?-.24:s==="shotgun"?-.61:-.52;t(new gt(.08,.1,s==="pistol"?.24:.27),i,0,0,-.09);let a=t(new gt(.066,.17,.085),n,0,-.12,.025);a.rotation.x=-.24;let o=t(new vi(.044,.009,5,12),i,0,-.09,-.07);o.rotation.y=Math.PI/2,o.scale.z=1.25;let l=t(new gt(.008,.037,.01),1910821,0,-.07,-.07);l.rotation.x=.2;let c=t(new jt(.021,.021,Math.abs(r)-.12,10),2240043,0,.012,(r-.12)/2);c.rotation.x=Math.PI/2;let h=t(new vi(.021,.007,5,10),6384738,0,.012,r);h.name="Muzzle rim";let u=t(new Sr(.017,10),1054743,0,.012,r+.001,{side:Rt});if(t(new gt(.014,.024,.025),14862746,0,.074,s==="pistol"?-.19:r+.045),t(new gt(.06,.02,.025),1187611,0,.064,.009),s!=="pistol"){let p=t(new gt(.074,.12,.2),n,0,-.015,.16);p.rotation.x=.16;let m=t(new jt(.042,.042,.19,8),n,0,-.018,-.28);m.rotation.x=Math.PI/2,m.name="Pump grip";for(let v=0;v<5;v++){let g=t(new vi(.042,.004,4,8),2569260,0,-.018,-.2-v*.036)}}if(s==="carbine"){let p=t(new gt(.058,.17,.07),2636594,0,-.15,-.1);p.rotation.x=-.2;let m=t(new jt(.034,.034,.17,10),1583395,0,.12,-.085);m.rotation.x=Math.PI/2;let v=t(new Sr(.028,10),4222825,0,.12,-.173,{metalness:.3,roughness:.15,side:Rt});for(let g of[-.14,-.04])t(new gt(.028,.07,.024),i,0,.077,g)}let d=new Et;return d.name="Projectile origin",d.position.set(0,.012,r-.008),e.add(d),e.userData.animate=(p,m)=>{let v=e.getObjectByName("Pump grip");v&&s==="shotgun"&&(v.position.z=-.28+Math.sin(Math.max(0,m)/.28*Math.PI)*.08)},e}function wm(s){let e=new at;e.name=s==="health"?"Medical satchel, bandages and bottle":"Leather quiver and mixed ammunition";let t=(i,n,r,a,o,l)=>{let c=ln(i,n,l);return c.position.set(r,a,o),e.add(c),c};if(s==="health"){let i=t(new Bn(.1,.16,4,10),9529152,0,0,0);i.rotation.z=Math.PI/2,i.scale.z=.75;for(let a of[-.1,.1]){let o=t(new vi(.102,.012,5,14),4734508,a,0,0);o.rotation.y=Math.PI/2,o.scale.x=.76}let n=t(new vi(.057,.01,5,12,Math.PI),4536871,0,.106,0);n.rotation.z=0,t(new gt(.09,.075,.012),16051680,0,.012,.079),t(new gt(.018,.055,.015),11354942,0,.012,.084),t(new gt(.057,.018,.015),11354942,0,.012,.084);for(let a of[-.115,-.06]){let o=t(new jt(.025,.025,.072,10),14999496,a,.132,0);o.rotation.z=Math.PI/2}let r=t(new jt(.026,.026,.095,10),14263121,.12,.13,.006,{transparent:!0,opacity:.8});t(new jt(.027,.027,.018,10),15986401,.12,.185,.006)}else{let i=t(new jt(.075,.055,.28,12,1,!0),7294002,-.055,.035,0,{side:Rt});for(let r of[-.07,.16]){let a=t(new vi(.074,.009,5,12),12160076,-.055,r,0);a.rotation.x=Math.PI/2}let n=t(new vi(.13,.012,5,16,Math.PI*1.6),4011303,-.08,0,.015);n.scale.x=.6;for(let r=0;r<3;r++){let a=Lo();a.scale.setScalar(.48),a.rotation.x=-Math.PI/2,a.position.set(-.08+r*.026,.29,.014),e.add(a)}for(let r=0;r<5;r++){let a=t(new jt(.018,.018,.095,7),r<2?10438972:12884812,.05+r*.032,-.015,.018);a.rotation.z=-.12+r*.1,t(new jt(.019,.019,.023,7),14072434,.05+r*.032,-.07,.018,{metalness:.5})}t(new gt(.19,.038,.025),4734511,.11,-.033,.046)}return e}var j_=s=>({x:s.x,y:-s.z,z:s.y}),No=s=>new I(s.x,s.z,-s.y),pt=s=>document.getElementById(s),ah=class{constructor(e,{scene:t,camera:i,doors:n,mobile:r=!1,isActive:a,onDeath:o,onArm:l,onReset:c,toast:h}){Object.assign(this,{data:e,scene:t,camera:i,doors:n,mobile:r,isActive:a,onDeath:o,onArm:l,onReset:c,toast:h}),this.state=new sh,this.audio=new rh,this.time=0,this.hurtTime=0,this.hitTime=0,this.recoil=0,this.manualFiring=!1,this.group=new at,this.group.name="After Hours combat",t.add(this.group),this.pickups=[],this.projectiles=[],this.effects=[],this.ray=new Is,this.occluders=_m(e),this.horde=new ih(e,{maxAlive:r?7:12,canSpawn:ym(i),onAttack:u=>{this.state.phase!=="dead"&&(this.state.hurt(u.damage),this.hurtTime=.55,this.audio.play("hurt"),this.state.health||this.die())},onDeath:u=>{let d=this.state.kill(u.headshot);if(this.toast((u.headshot?"Headshot! +":"Zombie down +")+d),u.boss){let p=this.state.wave*500;this.state.score+=p,this.addPickup("health",u.position),this.addPickup("ammo",{...u.position,x:u.position.x+.24}),this.toast("Groundskeeper defeated \xB7 +"+p+" \xB7 supplies dropped")}else this.state.kills%3===0&&this.addPickup(this.state.kills%9===0?"health":"ammo",u.position)}}),this.group.add(this.horde.group),t.add(i),this.hand=new at,this.hand.position.set(.23,-.27,-.52),i.add(this.hand),this.buildUI(),this.reset()}buildUI(){this.tourWelcome=pt("welcome").innerHTML,this.tourHint=pt("hint").textContent,this.started=!1;let e=document.createElement("button");e.id="sound-control",e.hidden=!0,e.textContent="Sound on",e.setAttribute("aria-pressed","true"),e.onclick=()=>{this.audio.unlock(),this.audio.enabled=!this.audio.enabled,e.textContent=this.audio.enabled?"Sound on":"Sound off",e.setAttribute("aria-pressed",String(this.audio.enabled)),e.blur()},document.querySelector(".toolbar").insertBefore(e,pt("help")),document.addEventListener("pointerdown",()=>this.audio.unlock(),{once:!0}),document.addEventListener("keydown",()=>this.audio.unlock(),{once:!0});let t=document.createElement("div");t.id="combat-hud",t.innerHTML='<div id="wave-heading">AFTER HOURS</div><div id="wave-objective">Enter the house to begin</div><div id="boss-status" hidden><span>THE GROUNDSKEEPER</span><div><i></i></div></div><div id="combat-stats"><span id="health-text">\u2665 100</span><span id="weapon-text">Find the bow</span><span id="score-text">0</span></div><div id="weapon-progress"><i></i></div>',document.body.append(t);let i=document.createElement("div");i.id="combat-controls",i.innerHTML='<button id="swap-control" aria-label="Swap weapon">Swap</button>',document.body.append(i);let n=document.createElement("div");n.id="damage-vignette",n.setAttribute("aria-hidden","true"),document.body.append(n);let r=document.createElement("button");r.id="end-survival",r.className="text-button",r.textContent="End game \xB7 return to exploring",r.hidden=!0,r.onclick=()=>{this.reset(),pt("start").focus()},pt("welcome").insertBefore(r,pt("load-status")),pt("swap-control").addEventListener("click",a=>{a.preventDefault(),this.isActive()&&this.started&&(this.state.cycle(),this.equip()),pt("swap-control").blur()}),document.addEventListener("keydown",a=>{!this.isActive()||a.repeat||!this.started||["Space","KeyQ","Digit1","Digit2","Digit3","Digit4"].includes(a.code)&&(a.preventDefault(),a.code==="Space"&&this.press(),a.code==="KeyQ"&&this.shove(),a.code.startsWith("Digit")&&(this.state.switch(Object.keys(Ht)[Number(a.code.slice(-1))-1]),this.equip()))}),document.addEventListener("keyup",a=>{a.code==="Space"&&this.release()}),pt("view").addEventListener("pointerdown",a=>{a.pointerType==="mouse"&&a.button===0&&this.isActive()&&this.press()}),document.addEventListener("pointerup",a=>{a.pointerType==="mouse"&&a.button===0&&this.release()}),window.addEventListener("blur",()=>this.cancelFire()),window.addEventListener("resize",()=>this.cancelFire()),document.addEventListener("visibilitychange",()=>this.cancelFire())}activateUI(e){document.body.classList.toggle("easter-game",e),pt("rooms").hidden=e,pt("sound-control").hidden=!e,pt("end-survival").hidden=!e,e||(pt("toast").hidden=!0,pt("toast").textContent="");let t=pt("welcome");t.querySelector(".eyebrow").textContent=e?"ASHLEY HEIGHTS \xB7 AFTER HOURS":"EXPLORE ASHLEY HEIGHTS",t.querySelector("h1").textContent=e?"Hold the house.":"Come inside.",t.querySelector("p").textContent=e?"Survive the waves. Find guns as later waves unlock, collect supplies and keep moving.":"Explore the house and garden.",t.querySelector(".keys span").innerHTML=e?"W A S D move \xB7 Shift sprint<br>Mouse / Space fire \xB7 Q shove<br>1\u20134 weapons \xB7 Auto reload \xB7 Esc pause":"Move with these or the arrow keys.<br>Move your mouse to look around.",t.querySelector(".touch-instructions p").textContent=e?"Tap anywhere in the view to fire. Drag to aim. Push the movement pad farther to sprint. Guns reload automatically.":"Use both together. Push the movement pad farther to sprint.",pt("hint").textContent=e?"Mouse / Space fire \xB7 Auto reload \xB7 Q shove \xB7 1\u20134 switch \xB7 Shift sprint":this.tourHint,pt("look-hint").textContent=e?"Drag to aim \xB7 tap to fire":"Drag to look",pt("caught-title").textContent="The house fell.",pt("normal-model").textContent="Return to exploring"}canTakeBow(){let e=this.pickups.find(o=>o.kind==="bow");if(this.started||!e||!this.player||Math.hypot(e.position.x-this.player.x,e.position.y-this.player.y)>.65||Math.abs(e.position.z-this.player.z)>.4)return!1;let t=No(this.player).add(new I(0,this.data.eyeHeight,0)),i=No(e.position).add(new I(0,e.baseHeight,0)),n=i.clone().sub(t),r=n.length();this.ray.set(t,n.normalize()),this.ray.near=.015,this.ray.far=r-.08;let a=this.doors.doors.map(o=>o.pivot).filter(Boolean);return this.ray.intersectObjects([...this.occluders,...a],!0).length===0}takeBow(){if(!this.isActive()||!this.canTakeBow())return!1;let e=this.pickups.find(t=>t.kind==="bow");return this.clearObject(e.mesh),this.pickups.splice(this.pickups.indexOf(e),1),this.state.acquire("bow"),this.equip(),this.audio.play("pickup"),this.activateUI(!0),pt("view").focus(),this.onArm(),this.toast("Bow collected \xB7 Enter the house to begin"),!0}clearObject(e){e.traverse(t=>{(t.isMesh||t.isLine)&&(t.geometry.dispose(),t.material.dispose&&t.material.dispose())}),e.removeFromParent()}reset(){this.cancelFire(),this.started=!1,this.state.reset(),this.activateUI(!1),this.onReset?.(),this.horde.reset(),this.time=0,this.hurtTime=0,this.hitTime=0,this.releaseTime=0,this.lastShot=null,pt("crosshair").classList.remove("hit"),this.player=null,this.unlocked=new Set(["bow"]);for(let t of this.pickups)this.clearObject(t.mesh);for(let t of this.projectiles)this.clearObject(t.mesh);for(let t of this.effects)this.clearObject(t.mesh);this.pickups=[],this.projectiles=[],this.effects=[];let e=this.data.rooms.find(t=>t.id==="2445694-0");this.addPickup("bow",{x:e.position[0],y:e.position[1],z:e.position[2]}),this.equip(),pt("damage-vignette").style.opacity=0}mesh(e,t,i={}){return new Je(e,new Kt({color:t,roughness:.65,...i}))}buildWeapon(e,t=!1){return e==="bow"?Mm({held:t}):Sm(e)}equip(){this.cancelFire();for(let e of[...this.hand.children])this.clearObject(e);this.state.weapon&&this.hand.add(this.buildWeapon(this.state.weapon,!0)),this.recoil=0}addPickup(e,t){if(this.pickups.length>=32){let o=this.pickups.find(l=>!Ht[l.kind]);if(o)this.clearObject(o.mesh),this.pickups.splice(this.pickups.indexOf(o),1);else return}let i=e==="health"?7984033:Ht[e]?16765838:10406906,n=new at;n.position.copy(No(t));let r=this.mesh(new vi(.25,.026,5,20),i);r.rotation.x=Math.PI/2,r.position.y=.1,r.material.emissive.setHex(i),r.material.emissiveIntensity=.4,n.add(r);let a;Ht[e]?(a=this.buildWeapon(e),a.scale.setScalar(.62),a.position.y=.68):e==="arrow"?(a=Lo(),a.rotation.x=Math.PI/2,a.position.y=.25):(a=wm(e),a.position.y=.38),n.add(a),this.group.add(n),this.pickups.push({kind:e,position:{...t},mesh:n,item:a,baseHeight:a.position.y,age:0})}arm(e){this.started=!0,this.player=e}startWave(e=this.player){this.player=e;let t=this.state.nextWave();this.horde.startWave(this.state.wave,this.player,t.total),this.audio.play("wave"),this.toast(`Wave ${this.state.wave} \xB7 ${t.event}`)}unlock(){for(let[e,t,i]of[[3,"pistol","2445662-0"],[5,"shotgun","2445664-0"],[7,"carbine","2445670-3"]])if(this.state.wave+1>=e&&!this.unlocked.has(t)){this.unlocked.add(t);let n=this.data.rooms.find(r=>r.id===i);this.addPickup(t,{x:n.position[0],y:n.position[1],z:n.position[2]}),this.toast(`${Ht[t].label} unlocked \xB7 ${n.label}`)}}press(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||this.manualFiring||(this.manualFiring=!0,this.state.firing=!0,this.state.charge=0,this.state.weapon!=="bow"&&this.fire())}release(){this.manualFiring&&(this.state.firing&&this.state.weapon==="bow"&&this.isActive()&&this.fire(),this.cancelFire())}tapFire(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||this.manualFiring||(this.state.charge=1,this.fire(),this.state.charge=0)}cancelFire(){this.manualFiring=!1,this.state.firing=!1,this.state.charge=0}hit(e,t,i){this.ray.set(e,t),this.ray.near=.015,this.ray.far=i;let n=this.doors.doors.map(c=>c.pivot).filter(Boolean),a=this.ray.intersectObjects([...this.occluders,...n],!0)[0];a&&(this.ray.far=a.distance);let l=this.ray.intersectObjects(this.horde.actors.filter(c=>c.alive).map(c=>c.figure.group),!0).find(c=>c.object.userData.actorId!==void 0);return l?{...l,actor:l.object.userData.actorId,headshot:l.object.userData.hitZone==="head"}:a?{...a,wall:!0}:null}applyHit(e,t,i){return e?.actor===void 0?!1:this.horde.damage(e.actor,t*(e.headshot?1.8:1),{headshot:e.headshot,knockback:{x:i.x*.12,y:-i.z*.12}})?.hit?(this.hitTime=.16,this.audio.play("hit"),!0):!1}trace(e,t){let i=new nn(new ot().setFromPoints([e,t]),new yn({color:16772531,transparent:!0,opacity:.75}));this.group.add(i),this.effects.push({mesh:i,life:.07})}fire(){let e=this.state.shoot();if(!e)return;this.audio.play(e.id),this.recoil=1,this.releaseTime=.28,this.camera.updateMatrixWorld(!0),this.hand.updateMatrixWorld(!0);let t=this.camera.getWorldPosition(new I),i=this.camera.getWorldDirection(new I),n=this.hit(t,i,55),r=n?.point||t.clone().addScaledVector(i,55),a=this.hand.getObjectByName("Projectile origin");if(!a)return;let o=a.getWorldPosition(new I),l=r.clone().sub(o).normalize(),c=o.clone().sub(t),h=c.length(),u=this.hit(t,c.normalize(),h);if(this.lastShot={weapon:e.id,origin:o.toArray(),muzzle:a.getWorldPosition(new I).toArray(),eye:t.toArray(),blockedByWall:!!u?.wall},!u?.wall)if(e.id==="bow"){let d=Lo();d.position.copy(o),d.quaternion.setFromUnitVectors(new I(0,0,-1),l),this.group.add(d);let p=o.clone().addScaledVector(l,Do),m=this.hit(o,l,Do);if(m){this.applyHit(m,e.damage*(.35+.65*e.charge),l),Id(d,m,l),this.effects.push({mesh:d,life:5});return}this.projectiles.push({mesh:d,position:p,velocity:l.multiplyScalar(14+e.charge*15),damage:e.damage*(.35+.65*e.charge),life:4})}else{let d=this.mesh(new zn(.035,.14,5),16762733,{emissive:16755776});d.position.copy(o),d.quaternion.setFromUnitVectors(new I(0,1,0),l),this.group.add(d),this.effects.push({mesh:d,life:.055});for(let p=0;p<(e.pellets||1);p++){let m=l.clone();e.pellets&&(m.x+=(Math.random()-.5)*.11,m.y+=(Math.random()-.5)*.11,m.z+=(Math.random()-.5)*.11,m.normalize());let v=this.hit(o,m,55);this.applyHit(v,e.damage,m),p===0&&this.trace(o.clone(),v?.point||o.clone().addScaledVector(m,30))}}}shove(){if(!this.started||!this.player||this.state.shoveCooldown||this.state.phase==="dead")return;this.state.shoveCooldown=1.05,this.recoil=1.7;let e=No(this.player).add(new I(0,1,0)),t=this.camera.getWorldDirection(new I);for(let i of this.horde.actors){if(!i.alive)continue;let n=No(i.nav.position).add(new I(0,1,0)),r=n.clone().sub(e),a=r.length();if(a>1.55||a<.01||r.normalize().dot(t)<.25)continue;this.ray.set(e,r),this.ray.far=a;let o=this.ray.intersectObjects(this.occluders,!1)[0];o&&o.distance<a-.25||(this.horde.damage(i.id,20,{knockback:{x:r.x*.65,y:-r.z*.65}}),this.hitTime=.16)}}die(){this.state.phase="dead",this.cancelFire();try{let e=JSON.parse(localStorage.getItem("ashley-after-hours-best")||"{}");this.best=Math.max(e.score||0,this.state.score),localStorage.setItem("ashley-after-hours-best",JSON.stringify({score:this.best,wave:Math.max(e.wave||0,this.state.wave)}))}catch{this.best=this.state.score}this.onDeath()}step(e,t,i){if(this.player=t,!this.started){let a=this.pickups.find(o=>o.kind==="bow");a&&(a.age+=e,a.item.rotation.y+=e*.45,a.item.position.y=a.baseHeight+Math.sin(a.age*2.1)*.05,this.takeBow()),this.group.updateMatrixWorld(!0);return}this.time+=e,this.state.tick(e),this.hurtTime=Math.max(0,this.hurtTime-e),this.hitTime=Math.max(0,this.hitTime-e),this.recoil=Math.max(0,this.recoil-e*5);let n=this.camera.getWorldDirection(new I);this.state.phase==="wave"?(this.horde.step(e,t,{x:n.x,y:-n.z}),this.horde.state().complete&&(this.state.finishWave(),this.unlock(),this.addPickup("health",{...t,x:t.x+.35}),this.toast("Wave cleared \xB7 resupplied +12 health"))):this.state.phase==="rest"&&(this.horde.step(e,t,{x:n.x,y:-n.z}),this.state.rest-=e,this.state.rest<=0&&this.startWave()),this.manualFiring&&this.state.weapon!=="bow"&&!this.state.reloading&&(this.state.firing=!0,this.fire());for(let a=this.projectiles.length-1;a>=0;a--){let o=this.projectiles[a];o.life-=e,o.velocity.y-=2.4*e;let l=o.velocity.length()*e,c=o.velocity.clone().normalize(),h=this.hit(o.position,c,l);if(h||o.life<=0||o.position.y<.05){h&&(this.applyHit(h,o.damage,c),Id(o.mesh,h,c));let u=j_(h?.point||o.position),d=t.z;Math.abs(u.z-d)<2.2&&!this.horde.planner().nav.blocked(u.x,u.y,d)&&this.addPickup("arrow",{x:u.x,y:u.y,z:d}),h?this.effects.push({mesh:o.mesh,life:5}):this.clearObject(o.mesh),this.projectiles.splice(a,1)}else o.position.addScaledVector(o.velocity,e),o.mesh.position.copy(o.position).addScaledVector(c,-Do),o.mesh.quaternion.setFromUnitVectors(new I(0,0,-1),c)}for(let a=this.pickups.length-1;a>=0;a--){let o=this.pickups[a];o.age+=e,o.item.rotation.y+=e*.65,o.item.position.y=o.baseHeight+Math.sin(o.age*2.1)*.05;let l=o.position.z-t.z;if(Math.hypot(o.position.x-t.x,o.position.y-t.y)<.85&&Math.abs(l)<.4){let h=!0;Ht[o.kind]?(this.state.acquire(o.kind),this.equip(),this.toast(`${Ht[o.kind].label} found`)):o.kind==="health"?this.state.health>=100?h=!1:(this.state.health=Math.min(100,this.state.health+30),this.toast("+30 health")):o.kind==="arrow"?this.state.inventory.bow?this.state.inventory.bow.reserve=Math.min(60,this.state.inventory.bow.reserve+1):h=!1:(this.state.supply(),this.toast("Ammunition collected")),h&&(this.audio.play("pickup"),this.clearObject(o.mesh),this.pickups.splice(a,1))}}for(let a=this.effects.length-1;a>=0;a--)(this.effects[a].life-=e)<=0&&(this.clearObject(this.effects[a].mesh),this.effects.splice(a,1));this.hand.scale.setScalar(Math.min(1,.55+.45*this.camera.aspect)),this.hand.position.x=Math.min(.23,.1*this.camera.aspect),this.hand.visible=!!this.state.weapon;let r=this.state.reloading?Math.sin(Math.PI*(1-this.state.reloading/Ht[this.state.weapon].reload)):0;this.hand.rotation.x=this.recoil*.15,this.hand.rotation.z=-.6*r-this.state.charge*.045,this.hand.position.y=-.27+Math.sin(this.time*3)*.004-.14*r,this.hand.position.z=-.52+this.recoil*.05,this.releaseTime=Math.max(0,(this.releaseTime||0)-e),this.hand.children[0]?.userData.animate?.(this.state.charge,this.releaseTime,!!this.state.inventory.bow?.reserve&&this.state.cooldown<.3),this.group.updateMatrixWorld(!0),this.updateHUD(i)}updateHUD(e){let t=this.state,i=this.horde.state();pt("wave-heading").textContent=e.phase==="armed"?"BOW READY":t.phase==="rest"?`WAVE ${t.wave} CLEARED \xB7 ${Math.ceil(t.rest)}s`:`WAVE ${t.wave} \xB7 ${nh(t.wave).event.toUpperCase()}`;let n=this.pickups.find(o=>Ht[o.kind]),r=n&&{bow:"garden shed",pistol:"kitchen",shotgun:"garage",carbine:"landing"}[n.kind];pt("wave-objective").textContent=e.phase==="armed"?"Enter the house to begin":t.phase==="wave"?`${i.alive+i.queued} left${n?" \xB7 "+Ht[n.kind].label+" in the "+r:""}`:n?`Find the ${Ht[n.kind].label.toLowerCase()} in the ${r}`:"Collect supplies \xB7 keep moving",pt("boss-status").hidden=!i.boss,i.boss&&(pt("boss-status").querySelector("i").style.width=100*i.boss.health/i.boss.maxHealth+"%"),pt("health-text").textContent="\u2665 "+Math.ceil(t.health),pt("health-text").classList.toggle("low",t.health<35);let a=t.inventory[t.weapon];pt("weapon-text").textContent=a?`${Ht[t.weapon].label} \xB7 ${t.weapon==="bow"?a.reserve+" arrows":a.loaded+" / "+a.reserve}${t.reloading?" \xB7 reloading":""}`:"Find the bow \xB7 Q / Shove to defend",pt("score-text").textContent=t.score.toLocaleString()+(t.combo>=3?" \xD7"+Math.min(4,1+Math.floor(t.combo/3)):""),pt("weapon-progress").firstElementChild.style.width=(t.reloading?(1-t.reloading/Ht[t.weapon].reload)*100:t.charge*100)+"%",pt("damage-vignette").style.opacity=this.hurtTime?".7":"0",pt("crosshair").classList.toggle("hit",this.hitTime>0)}};function Dd(s,e){let[t,i,n,r]=s.streetContext?.enabled?s.streetContext.bounds:s.bounds,a=(l,c,h)=>Math.max(c,Math.min(h,l)),o=Math.min(0,...(s.floorLevels??[]).map(l=>l.z));return{x:a(e.x,t-35,n+35),y:a(e.y,i-35,r+35),z:a(e.z,o,45)}}function Ld(s,e,{forward:t=0,right:i=0,vertical:n=0,yaw:r=0,pitch:a=0,fast:o=!1,dt:l=0}){let c=t*Math.cos(a),h=-Math.sin(r)*c+Math.cos(r)*i,u=Math.cos(r)*c+Math.sin(r)*i,d=t*Math.sin(a)+n,p=(o?9:3.8)*Math.max(0,Math.min(l,.04))/Math.max(1,Math.hypot(h,u,d));return Dd(s,{x:e.x+h*p,y:e.y+u*p,z:e.z+d*p})}function oh(s,e,t){let i=o=>{if(!o)return null;let l=s.support(o.x,o.y,o.z);if(l===null||Math.abs(l-o.z)>.2)return null;let c={x:o.x,y:o.y,z:l};return s.canStand(c)?c:null},n=i(e);if(n)return{position:n,moved:!1};let r=i(t);if(r)return{position:r,moved:!0};let a=s.data.rooms.map(o=>({x:o.position[0],y:o.position[1],z:o.position[2]})).map(i).filter(Boolean).sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y,o.z-e.z)-Math.hypot(l.x-e.x,l.y-e.y,l.z-e.z));if(!a.length)throw Error("No supported walking viewpoint");return{position:a[0],moved:!0}}var Fd="ashley-heights-comparison-view",Em="ashley-heights-proposal-variant";var Zr={proposed:{label:"Proposal A",short:"A"},compact:{label:"Proposal B",short:"B"}},Nd=new URLSearchParams(location.search).get("design"),ti=Nd==="proposed"||Nd==="compact"?Nd:"original",jn=s=>s==="proposed"||s==="compact";function Tm(s,e=location.href){let t=new URL(e);return jn(s)?t.searchParams.set("design",s):t.searchParams.delete("design"),t}function lh(){try{let s=sessionStorage.getItem(Em);return jn(s)?s:"proposed"}catch{return"proposed"}}function Am(s){if(jn(s))try{sessionStorage.setItem(Em,s)}catch{}}function Fo(s){return s==="compact"?"proposed":"compact"}function Rm(s,e){let t={target:s,position:[e.x,e.y,e.z],yaw:e.yaw,pitch:e.pitch,active:e.active,flying:e.flying===!0,lastWalkingPosition:e.lastWalkingPosition,time:Date.now()};try{sessionStorage.setItem(Fd,JSON.stringify(t))}catch{}}function Cm(){try{let s=sessionStorage.getItem(Fd);if(!s)return null;sessionStorage.removeItem(Fd);let e=JSON.parse(s);return e.target!==ti||Date.now()-e.time>3e5||!e.position?.every(Number.isFinite)||!Number.isFinite(e.yaw)||!Number.isFinite(e.pitch)?null:e}catch{return null}}function Pm(s,e){let[t,i,n]=e.position,r={x:t,y:i,z:n};if(e.flying===!0)return{position:Dd(s.data,r),moved:!1};let a=c=>{let h=s.support(c.x,c.y,c.z);return h!==null&&Math.abs(h-c.z)<.2&&s.canStand(c)};if(a(r))return{position:r,moved:!1};let o=s.data.rooms.map(c=>({room:c,p:{x:c.position[0],y:c.position[1],z:c.position[2]}})).filter(c=>a(c.p));if(ti==="original"&&n>=2.4){let c=o.find(h=>h.room.label==="Landing");if(c)return{position:c.p,moved:!0,room:c.room.label}}o.sort((c,h)=>Math.hypot(c.p.x-t,c.p.y-i)+Math.abs(c.p.z-n)*3-Math.hypot(h.p.x-t,h.p.y-i)-Math.abs(h.p.z-n)*3);let l=o[0];return{position:l?.p??{...s.position},moved:!0,room:l?.room.label}}var Oi={trees:[{label:"Horse chestnut at the head of the close",x:-14.6,y:-25.5,height:18,crown:7,kind:"broadleaf",colour:"#3d4a2c",source:"Street View Aug 2023 (close-head panorama, ~10 m south); dominant street tree"},{label:"Scots pine behind No 5",x:12,y:-52,height:20,crown:4.5,kind:"pine",colour:"#44503f",source:"Street View Aug 2023; position approximate"},{label:"Trees behind Nos 1-2 (pair)",x:-46.1,y:23.9,height:16,crown:7,kind:"broadleaf",colour:"#44552f",source:"Google 3D top view, registered 0.9 m RMS"},{label:"Tree behind No 2",x:-29.8,y:30.1,height:15,crown:5.2,kind:"broadleaf",colour:"#3d4a33",source:"Google 3D top view"},{label:"Tree north of No 2/3",x:-26.1,y:43.4,height:13,crown:4.4,kind:"broadleaf",colour:"#4a5a32",source:"Google 3D top view"},{label:"Tree north of No 1",x:-37.1,y:42.7,height:15,crown:5.2,kind:"broadleaf",colour:"#3b4533",source:"Google 3D top view"},{label:"Conifer behind No 3",x:-17.1,y:33.2,height:15,crown:4.2,kind:"conifer",colour:"#39433a",source:"Google 3D top view"},{label:"Ornamental in No 3 rear garden",x:-20.7,y:16.2,height:6,crown:2.6,kind:"broadleaf",colour:"#7a7a3a",source:"Google 3D top view"},{label:"Tree beyond our north boundary (west)",x:-3.7,y:35,height:17,crown:6.5,kind:"broadleaf",colour:"#3e4a36",source:"Google 3D top view"},{label:"Tree beyond our north boundary (east)",x:10.9,y:32,height:16,crown:5.6,kind:"broadleaf",colour:"#414c3a",source:"Google 3D top view (kept outside the site line)"},{label:"Tree north-east (Richmond Court side)",x:18,y:42.2,height:15,crown:5.2,kind:"broadleaf",colour:"#3f4a38",source:"Google 3D top view"},{label:"Tree beyond our east front boundary",x:19.8,y:-6,height:12,crown:5.4,kind:"broadleaf",colour:"#3c4636",source:"Google 3D top view (placed just outside the site line)"},{label:"Marlow Court grounds",x:34.7,y:-10.4,height:12,crown:4.9,kind:"broadleaf",colour:"#4b5c38",source:"Google 3D top view"},{label:"Marlow Court south",x:45.9,y:-17.4,height:12,crown:4.9,kind:"broadleaf",colour:"#44503c",source:"Google 3D top view"},{label:"Ornamental in front of No 5",x:-5.3,y:-28.2,height:5,crown:2.1,kind:"broadleaf",colour:"#8a7a2c",source:"Google 3D top view (yellow foliage)"},{label:"Birch behind No 5's west wall",x:2.5,y:-30,height:14,crown:3.5,kind:"birch",colour:"#56613e",source:"Street View Aug 2023; position approximate"},{label:"Hedge along No 6's frontage",x:-22,y:-31,height:2,crown:5.5,kind:"hedge",colour:"#445030",source:"Street View Aug 2023"},{label:"Hedge along No 5's frontage",x:4.5,y:-27.2,height:1.8,crown:4,kind:"hedge",colour:"#445030",source:"Street View Aug 2023"}],houses:[{name:"Neighbour 1 \xB7 reference estimate",footprint:[[-59.79665,9.30984],[-59.1234,9.22317],[-58.99559,3.40707],[-48.86574,3.72358],[-49.1053,-5.03034],[-61.27589,-5.25473]],x:-54.907240542877894,y:-.8116349999999999,height:5.1,rise:3.1,roofParts:[[[-60.5209,3.51813],[-48.86574,3.72358],[-49.1053,-5.03034],[-61.27589,-5.25473]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1,roofType:"hip",colors:{wall:"#a8674c",roof:"#6f5a4c"},chimneys:[[-59.3,1.5]],source:"No planning drawings online. Heights estimated from 3D imagery against Nos 2 and 3 (same storey heights); hipped brick house, brown plain tiles, white windows (Street View Aug 2023)."},{name:"Neighbour 2 \xB7 reference estimate",footprint:[[-43.47037,7.20821],[-32.48846,7.50032],[-32.4135,2.6292],[-27.42748,2.84026],[-27.42525,-5.34776],[-43.14071,-5.88343]],x:-35.34048433867518,y:-1.35928,height:5.2,rise:3.2,roofParts:[[[-43.17443,2.05278],[-27.46947,2.50451],[-27.42525,-5.34776],[-43.14071,-5.88343]],[[-43.47037,7.20821],[-32.48846,7.50032],[-32.29711,.14084],[-43.36318,-.14044]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,roofType:"hip",partRises:[3.2,2.9],colors:{wall:"#b8694a",roof:"#6e6258"},porch:"gable",garageDoor:"#3f4448",chimneys:[[-28.6,1]],source:"17/01352/HOUSE drawings: existing ridge 8.4 m, eaves 5.1-5.2 m; built two-storey side extension with its own hip about 0.3 m lower, double garage below, oak gabled porch (Street View Aug 2023, 3D imagery)."},{name:"Neighbour 3 \xB7 reference estimate",footprint:[[-25.65193,10.88472],[-18.44637,11.06593],[-18.39352,10.12095],[-7.69556,10.19375],[-7.58782,.7981],[-18.11746,.70363],[-18.21192,-.05181],[-25.5858,-.21135]],x:-16.63043484937667,y:5.459525,height:5.1,rise:2.4,roofParts:[[[-18.39352,10.12095],[-7.69556,10.19375],[-7.58782,.7981],[-18.11746,.70363]],[[-25.65193,10.88472],[-18.44637,11.06593],[-18.21192,-.05181],[-25.5858,-.21135]]],frame:"dark",referenceClipped:!1,front:[[-18.11746,.70363],[-7.58782,.7981]],secondaryFront:[[-25.5858,-.21135],[-18.21192,-.05181]],garage:!1,roofType:"hip",partRises:[2.4,1.7],colors:{wall:"#9c6b50",roof:"#76665a"},rooflight:!0,chimneys:[[-8.4,5.2]],source:"18/00772/HOUSE drawings: ridge 7.50 m, eaves 5.1 m, dimensioned eaves 5.0 m on the proposed front; built part two-storey west extension with a lower hip (about 6.8 m) and glazed roof panel; anthracite frames and horizontal-slat gate (Street View Aug 2023)."},{name:"Neighbour 5 \xB7 reference estimate",footprint:[[8.0732,-30.55728],[13.41851,-36.36269],[5.41541,-43.60551],[.05961,-37.88403]],x:6.734790356677488,y:-37.123360000000005,height:5.1,rise:3,roofParts:[[[8.0732,-30.55728],[13.41851,-36.36269],[5.41541,-43.60551],[.05961,-37.88403]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,roofType:"hip",colors:{wall:"#8f5b46",roof:"#6b5448"},porch:"columns",bays:!0,chimneys:[],source:"No planning drawings online. Symmetrical two-storey hipped brick house with white-columned porch and two ground-floor bays; heights estimated from Street View against its five first-floor windows."},{name:"Neighbour 6 \xB7 reference estimate",footprint:[[-29.12009,-39.41573],[-16.92832,-39.7058],[-16.90658,-42.26727],[-15.9072,-42.4812],[-15.92745,-45.37842],[-17.14763,-45.56251],[-17.13602,-49.57258],[-21.08067,-49.66182],[-21.15489,-47.52004],[-24.46847,-47.34937],[-24.62517,-51.33777],[-29.5587,-51.12914]],x:-22.603222625347787,y:-43.92981,height:5.1,rise:3.5,roofParts:[[[-29.12009,-39.41573],[-16.92832,-39.7058],[-16.76772,-50.04644],[-29.05414,-49.82947]]],frame:"light",referenceClipped:!1,front:[[-29.12009,-39.41573],[-16.92832,-39.7058]],secondaryFront:null,garage:!1,roofType:"hip",colors:{wall:"#7e4e3b",roof:"#5f4b41"},porch:"columns",chimneys:[[-28.6,-42],[-17.4,-42.3]],source:"23/03025/HOUSE existing drawings: ridge 8.6 m, eaves 5.1 m, two chimneys, detached flat-roof garage 2.7 m. The 2023 consent (pitched garage roof, rear dormer, west extension) is not visible in the Aug 2023 Street View; drawn as existing."},{name:"No6 lower garage \xB7 reference estimate",footprint:[[-37.11622,-33.61024],[-30.68905,-33.49941],[-30.66657,-38.79021],[-37.1569,-38.72233]],x:-33.90713937759885,y:-36.166285,height:2.7,rise:0,roofParts:[[[-37.11622,-33.61024],[-30.68905,-33.49941],[-30.66657,-38.79021],[-37.1569,-38.72233]]],frame:"light",referenceClipped:!1,front:[[-37.11622,-33.61024],[-30.68905,-33.49941]],secondaryFront:null,garage:!0,roofType:"flat",colors:{wall:"#7e4e3b",roof:"#4b4b48"},chimneys:[],source:"23/03025/HOUSE existing front elevation: 2.70 m."},{name:"No5 garage \xB7 reference estimate",footprint:[[15.69732,-22.24221],[10.09072,-22.62925],[10.43933,-28.04733],[16.13008,-27.67112]],x:13.09102410013121,y:-25.150185,height:2.6,rise:0,roofParts:[[[15.69732,-22.24221],[10.09072,-22.62925],[10.43933,-28.04733],[16.13008,-27.67112]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!0,roofType:"flat",colors:{wall:"#8f5b46",roof:"#4b4b48"},chimneys:[],source:"Flat-roof garage (Street View Aug 2023); height estimate."},{name:"Southeast outbuilding \xB7 reference estimate",footprint:[[22.05807,-48.64768],[21.42866,-55.04862],[24.55294,-55.36551],[25.19284,-48.88063]],x:23.3102182906958,y:-51.964625,height:2.4,rise:0,roofParts:[[[22.05807,-48.64768],[21.42866,-55.04862],[24.55294,-55.36551],[25.19284,-48.88063]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,roofType:"flat",colors:{wall:"#9a7a62",roof:"#4d4d4a"},chimneys:[],source:"Estimate."},{name:"Marlow Court \xB7 reference estimate",footprint:[[37.71056,28.6561],[45.1281,23.01038],[42.85681,19.8912],[51.96834,12.74808],[44.53389,3.21455],[37.19002,8.76551],[39.44031,11.71681],[29.85553,18.49441]],x:41.111070766468906,y:15.621244999999998,height:5.6,rise:4.6,roofParts:[[[37.71056,28.6561],[45.1281,23.01038],[37.27306,12.84869],[29.85553,18.49441]],[[42.60434,19.9237],[51.96834,12.74808],[44.53389,3.21455],[35.1699,10.39017]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,roofType:"hip",colors:{wall:"#a36c52",roof:"#5f5250"},dormers:!0,chimneys:[],source:"Flats built under 89/01879 (5 blocks of 4 x 2-bed flats). Two storeys plus rooms in the roof with dormers and rooflights (3D imagery); heights estimated."},{name:"Richmond Court clipped reference \xB7 reference estimate",footprint:[[32.26652,49.39979],[44.21669,47.86148],[44.64982,41.0679],[33.27881,40.39944]],x:38.627418505960875,y:44.464690000000004,height:5.6,rise:4.4,roofParts:[[[32.26652,49.39979],[44.21669,47.86148],[44.64982,41.0679],[33.27881,40.39944]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1,roofType:"hip",colors:{wall:"#a36c52",roof:"#5f5250"},chimneys:[],source:"Same development as Marlow Court; estimate."},{name:"Southeast block clipped reference \xB7 reference estimate",footprint:[[28.13737,-45.84812],[30.89316,-45.00882],[42.23306,-45.95683],[42.03419,-49.59865],[45.0953,-49.73683],[43.89872,-59.30574],[40.14337,-59.24877],[40.22734,-58.57726],[32.54832,-58.44166],[31.9596,-59.7305],[27.35219,-59.64914]],x:36.109772290582754,y:-54.089245,height:5.4,rise:3.6,roofParts:[[[28.22153,-45.85895],[45.51515,-46.37932],[43.91971,-59.13786],[27.35219,-59.64914]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1,roofType:"hip",colors:{wall:"#9a6a55",roof:"#5f5250"},chimneys:[],source:"Estimate."}],road:[[-62.99803,-16.29118],[-22.94083,-17.35374],[-8.26841,-10.79887],[-3.22657,-22.45016],[-12.24028,-26.83363],[-15.75422,-24.8461],[-18.85768,-23.679],[-23.66508,-23.14545],[-63.82724,-22.92226]],pavement:[[-62.74612,-14.27667],[-24.01442,-14.99803],[-7.48025,-7.91522],[-.24943,-23.25984],[-13.05992,-29.9691],[-15.24854,-27.64043],[-19.39355,-25.91282],[-24.49558,-25.00018],[-64.08964,-25.0207]],drives:[[[-25.5858,-.21135],[-7.58782,.7981],[-7.29095,-7.76901],[-24.01442,-14.99803],[-25.88685,-14.92758]],[[-43.14071,-5.88343],[-27.42525,-5.34776],[-25.97101,-14.91674],[-47.47225,-14.53705]],[[-61.27589,-5.25473],[-49.1053,-5.03034],[-47.5564,-14.52622],[-62.74612,-14.27667]],[[-.24943,-23.25984],[15.64447,-21.29723],[15.69165,-40.06686],[5.58372,-43.62717],[.05961,-37.88403],[2.35207,-35.2793]],[[-43.09353,-24.65306],[-15.09109,-26.38137],[-14.97173,-39.78709],[-29.12009,-39.41573],[-30.66657,-38.79021],[-37.11622,-33.61024]],[[19.39992,16.9405],[30.53463,35.55006],[54.63495,32.02126],[50.79479,-4.15864],[18.9234,-10.12003]]],gate3:[[-21.74277,-13.24352],[-18.24026,-11.90332]],gate6:[[-34.27831,-25.27608],[-30.17584,-25.29245]],wall3:[[[-25.86586,-14.7597],[-21.74277,-13.24352]],[[-18.24026,-11.90332],[-7.48025,-7.91522]]],basis:"Footprints and road traced from the site plan registered to eleven fixed house/site anchors. Eaves and ridge heights from the neighbours' planning drawings where available (Nos 2, 3, 6), otherwise estimated from Google 3D imagery; roof forms, extensions, colours and trees from Google 3D imagery and Street View (Aug 2023). Not a survey.",registrationRMSMetres:.1286789476763554};var Dm="ashley-heights-street-context";function Lm(s){try{return s?.getItem(Dm)==="on"}catch{return!1}}function Nm(s,e){try{s?.setItem(Dm,e?"on":"off")}catch{}}function K_(s){let e=structuredClone(Oi.houses),t=[[-72,-68],[62,-68],[62,60],[-72,60]],i=e.map(n=>({name:n.name,polygon:n.footprint,bottom:0,top:n.height+n.rise}));for(let n of Oi.trees??[]){let r=n.kind==="hedge"?.65:.5,a=n.kind==="hedge"?n.crown:r;i.push({name:n.label,polygon:[[n.x-a,n.y-r],[n.x+a,n.y-r],[n.x+a,n.y+r],[n.x-a,n.y+r]],bottom:0,top:n.height})}return{enabled:!1,bounds:[Math.min(s.bounds[0],-72),Math.min(s.bounds[1],-68),Math.max(s.bounds[2],62),Math.max(s.bounds[3],60)],road:Oi.road,ground:t,houses:e,obstacles:i,walkPolygons:[t],basis:Oi.basis,registrationRMSMetres:Oi.registrationRMSMetres}}function Im(s,e){let t=s.data.streetContext,i=t?.enabled;t&&(t.enabled=!1);try{let n=s.support(e.x,e.y,e.z);return n!==null&&Math.abs(n-e.z)<.2&&!s.blocked(e.x,e.y,n)?{x:e.x,y:e.y,z:n}:null}finally{t&&(t.enabled=i)}}function Fm(s,{flying:e=!1}={}){let t=s.data.streetContext;if(!t||(t.enabled=!1,e||Im(s,s.position)))return!1;let i=[...s.data.rooms].sort((n,r)=>+(r.id==="arrival")-+(n.id==="arrival"));for(let n of i){let[r,a,o]=n.position,l=Im(s,{x:r,y:a,z:o});if(l)return s.position=l,!0}return t.enabled=!0,!1}function Ud(s,e){return!!s.streetContext?.enabled&&!$t(e.x,e.y,s.site.outline_m)&&!$t(e.x,e.y,s.approachSurface?.polygon??[])}var ch=class{constructor(e,t){this.scene=e,this.data=t,this.definition=K_(t),t.streetContext=this.definition,this.group=null,this.stats={meshes:0,triangles:0}}setVisible(e){e&&!this.group&&this.build(),this.definition.enabled=!!e,this.group&&(this.group.visible=!!e)}build(){let e=this.definition,t=new at;t.name="Optional reference-traced street context";let i={grass:"#819477",road:"#646c68",kerb:"#bbb9ae",drive:"#aca594",brick:"#967a60",roof:"#5a554e",trim:"#e1ded4",glass:"#6b8281",green:"#5f7555",dark:"#34383a",bark:"#5a4a3c",oak:"#9c7a52",chimney:"#8a5a45"},n=new Map,r=f=>{let y=f.index?f.toNonIndexed():f;y.computeVertexNormals();let M=y.attributes.position,b=y.attributes.normal,_=new Float32Array(M.count*2);for(let S=0;S<M.count;S++){let T=M.getX(S),x=M.getY(S),w=M.getZ(S),A=Math.abs(b.getX(S)),C=Math.abs(b.getY(S)),L=Math.abs(b.getZ(S));C>=A&&C>=L?(_[S*2]=T,_[S*2+1]=w):A>=L?(_[S*2]=w,_[S*2+1]=x):(_[S*2]=T,_[S*2+1]=x)}return y.setAttribute("uv",new Mt(_,2)),y},a=.82,o=(f,y)=>{let[M,b]=y.includes(":")?y.split(":"):[y,null],_=r(f);if(b){let S=new Be(b);M!=="leaf"&&S.multiplyScalar(1/a);let T=new Float32Array(_.attributes.position.count*3);for(let x=0;x<T.length;x+=3)T[x]=Math.min(1,S.r),T[x+1]=Math.min(1,S.g),T[x+2]=Math.min(1,S.b);_.setAttribute("color",new Mt(T,3))}n.has(M)||n.set(M,[]),n.get(M).push(_)},l=f=>new Ni(f.map(([y,M])=>new re(y,M))),c=(f,y,M,b=[])=>{let _=l(f);for(let T of b)_.holes.push(new Ts(T.map(([x,w])=>new re(x,w))));let S=new sn(_);S.rotateX(-Math.PI/2),S.translate(0,y,0),o(S,M)},h=(f,y,M,b,_,S,T,x=0)=>{let w=new gt(b,S,_);w.rotateY(x),w.translate(f,M+S/2,-y),o(w,T)},u=(f,y,M,b,_,S)=>{let T=y[0]-f[0],x=y[1]-f[1],w=Math.hypot(T,x);h((f[0]+y[0])/2,(f[1]+y[1])/2,_,w,M,b,S,Math.atan2(x,T))},d=(f,y,M)=>{let b=new Ha(l(f),{depth:y,bevelEnabled:!1,steps:1,curveSegments:1});b.rotateX(-Math.PI/2),o(b,M)},p=(f,y,M,b,_="trim")=>{let S=f.reduce((X,J)=>[X[0]+J[0]/4,X[1]+J[1]/4],[0,0]),T=f[0],x=f[1],w=Math.hypot(x[0]-T[0],x[1]-T[1]),A=Math.hypot(f[2][0]-x[0],f[2][1]-x[1]),C=[(x[0]-T[0])/w,(x[1]-T[1])/w];A>w&&(T=f[1],x=f[2],C=[(x[0]-T[0])/A,(x[1]-T[1])/A],[w,A]=[A,w]);let L=[-C[1],C[0]],N=(X,J)=>[S[0]+C[0]*X+L[0]*J,S[1]+C[1]*X+L[1]*J],D=[N(-w/2-.3,-A/2-.3),N(w/2+.3,-A/2-.3),N(w/2+.3,A/2+.3),N(-w/2-.3,A/2+.3)];if(M===0){c(D,y+.14,b);for(let X=0;X<4;X++)u(D[X],D[(X+1)%4],.06,.18,y-.04,_);return}let U=Math.max(.2,(w-A)/2),B=N(-U,0),G=N(U,0),ne=[...D.map(([X,J])=>[X,y,-J]),[B[0],y+M,-B[1]],[G[0],y+M,-G[1]]].flat(),q=new ot;q.setAttribute("position",new Ze(ne,3)),q.setIndex([0,1,5,0,5,4,1,2,5,2,3,4,2,4,5,3,0,4]),o(q,b);for(let X=0;X<4;X++)u(D[X],D[(X+1)%4],.045,.18,y-.12,_)};c(e.ground,-.135,"grass",[this.data.site.outline_m]),c(Oi.pavement,-.025,"drive"),c(e.road,-.012,"road");for(let f=0;f<e.road.length-1;f++)u(e.road[f],e.road[f+1],.14,.09,-.015,"kerb");for(let f of Oi.drives)c(f,-.008,"drive");let m=(f,y,M,b,_,S,T="light")=>{let x=Math.hypot(y[0]-f[0],y[1]-f[1]),w=[(y[0]-f[0])/x,(y[1]-f[1])/x],A=[w[1],-w[0]],C=f[0]+(y[0]-f[0])*M+A[0]*.04,L=f[1]+(y[1]-f[1])*M+A[1]*.04,N=Math.atan2(w[1],w[0]),D=T==="dark"?"dark":"trim";h(C,L,b,_,.055,S,D,N),h(C+A[0]*.03,L+A[1]*.03,b+.07,_-.14,.025,S-.14,"glass",N);let U=_>1.8?3:2;for(let B=1;B<U;B++){let G=(B/U-.5)*_;h(C+w[0]*G+A[0]*.05,L+w[1]*G+A[1]*.05,b+.07,.035,.03,S-.14,D,N)}};for(let f of e.houses){let y=f.colors?"wall:"+f.colors.wall:"brick",M=f.colors?"roof:"+f.colors.roof:"roof";d(f.footprint,f.height,y),f.roofParts.forEach((ie,ye)=>p(ie,f.height,f.partRises?.[ye]??f.rise,M));for(let[ie,ye]of f.chimneys??[])h(ie,ye,f.height-.4,.62,.62,f.rise*.95+.4,"chimney");let b=[f.y>0||f.name.startsWith("Neighbour 1")||f.name.startsWith("Neighbour 2")?f.x:-10,-21],_=f.footprint.reduce((ie,ye,Te)=>{let ze=f.footprint[(Te+1)%f.footprint.length];return ie+ye[0]*ze[1]-ze[0]*ye[1]},0),S=f.footprint.map((ie,ye)=>{let Te=ie,ze=f.footprint[(ye+1)%f.footprint.length];_<0&&([Te,ze]=[ze,Te]);let j=ze[0]-Te[0],$=ze[1]-Te[1],ue=Math.hypot(j,$);return{a:Te,b:ze,length:ue,score:((b[0]-(Te[0]+ze[0])/2)*$-(b[1]-(Te[1]+ze[1])/2)*j)/ue}}),T=f.front||[...S].filter(ie=>ie.length>4).sort((ie,ye)=>ye.score-ie.score)[0],x=Array.isArray(T)?T[0]:T.a,w=Array.isArray(T)?T[1]:T.b,A=(x[0]+w[0])/2,C=(x[1]+w[1])/2,L=w[0]-x[0],N=w[1]-x[1];(f.x-A)*N-(f.y-C)*L>0&&([x,w]=[w,x]);let D=Math.hypot(w[0]-x[0],w[1]-x[1]),U=[(w[0]-x[0])/D,(w[1]-x[1])/D],B=[U[1],-U[0]],G=Math.atan2(U[1],U[0]);if(f.garage){let ie=(x[0]+w[0])/2+B[0]*.04,ye=(x[1]+w[1])/2+B[1]*.04;h(ie,ye,.03,Math.min(3.9,D-.6),.08,2.08,"dark",G);for(let Te=0;Te<10;Te++){let ze=(Te/9-.5)*Math.min(3.8,D-.7);h(ie+U[0]*ze+B[0]*.05,ye+U[1]*ze+B[1]*.05,.08,.025,.02,1.97,"glass",G)}continue}let ne=f.height-1.95,q=.76;for(let ie of[.18,.5,.82])m(x,w,ie,ne,ie===.5?1.4:1.85,1.4,f.frame);for(let ie of[.18,.82])m(x,w,ie,q,1.85,1.42,f.frame);if(f.bays)for(let ie of[.18,.82]){let ye=x[0]+(w[0]-x[0])*ie+B[0]*.35,Te=x[1]+(w[1]-x[1])*ie+B[1]*.35;h(ye,Te,0,2.3,.7,.7,y,G),h(ye+B[0]*.05,Te+B[1]*.05,2.2,2.5,.85,.18,"trim",G)}if(f.dormers)for(let ie of[.3,.7]){let ye=x[0]+(w[0]-x[0])*ie-B[0]*1.2,Te=x[1]+(w[1]-x[1])*ie-B[1]*1.2;h(ye,Te,f.height+.3,1.6,1.4,1.4,M,G),h(ye+B[0]*.72,Te+B[1]*.72,f.height+.45,1.1,.04,1,"glass",G)}if(f.secondaryFront){let[ie,ye]=f.secondaryFront,Te=ye[0]-ie[0],ze=ye[1]-ie[1];(f.x-(ie[0]+ye[0])/2)*ze-(f.y-(ie[1]+ye[1])/2)*Te>0&&([ie,ye]=[ye,ie]);for(let j of[.28,.73])for(let $ of[q,ne])m(ie,ye,j,$,1.78,1.4,f.frame)}let X=(x[0]+w[0])/2+B[0]*.06,J=(x[1]+w[1])/2+B[1]*.06;if(h(X,J,.02,1.02,.09,2.18,f.frame==="dark"?"dark":"trim",G),f.porch==="columns"){h(X+B[0]*1,J+B[1]*1,2.45,2.6,1.9,.22,"trim",G);for(let ie of[-1.1,1.1])h(X+U[0]*ie+B[0]*1.75,J+U[1]*ie+B[1]*1.75,0,.22,.22,2.45,"trim")}if(f.porch==="gable"){h(X+B[0]*.9,J+B[1]*.9,2.45,2.4,1.7,.16,"oak",G);for(let ie of[-1,1])h(X+U[0]*ie+B[0]*1.6,J+U[1]*ie+B[1]*1.6,0,.2,.2,2.45,"oak")}if(f.name.startsWith("Neighbour 6"))for(let ie of[.5-.075,.5+.075])m(x,w,ie,.18,.33,1.9,"light");let Ee=ie=>[[x,w],...f.secondaryFront?[f.secondaryFront]:[]].some(([ye,Te])=>{let ze=Te[0]-ye[0],j=Te[1]-ye[1],$=Math.hypot(ze,j);return[ie.a,ie.b].every(ue=>Math.abs((ue[0]-ye[0])*j-(ue[1]-ye[1])*ze)/$<.15)});for(let ie of S.filter(ye=>ye.length>5&&!Ee(ye)).slice(0,2))for(let ye of[.86,ne])m(ie.a,ie.b,.53,ye,1.45,1.3,f.frame)}for(let[f,y]of Oi.wall3)u(f,y,.25,1.5,0,"wall:"+(Oi.houses.find(M=>M.name.startsWith("Neighbour 3"))?.colors?.wall??"#967a60"));let v=(f,y)=>{let[M,b]=f,_=Math.hypot(b[0]-M[0],b[1]-M[1]),S=[(b[0]-M[0])/_,(b[1]-M[1])/_],T=Math.atan2(S[1],S[0]);for(let[x,w]of f)h(x,w,0,.43,.43,1.95,"brick"),h(x,w,1.95,.49,.49,.1,"kerb");if(y){u(M,b,.075,1.62,0,"dark");for(let w=1;w<7;w++)u(M,b,.085,.016,w*.23,"glass");let x=[M[0]+S[0]*_*.7,M[1]+S[1]*_*.7];h(...x,0,.025,.09,1.62,"kerb",T)}else{for(let x of[.14,.84,1.5])u(M,b,.055,.035,x,"dark");for(let x=1;x<23;x++){let w=x/23;h(M[0]+(b[0]-M[0])*w,M[1]+(b[1]-M[1])*w,.1,.02,.02,1.48,"dark")}}};v(Oi.gate3,!0),v(Oi.gate6,!1);for(let f of Oi.trees??[]){let y="leaf:"+f.colour,M=f.height,b=f.crown;if(f.kind==="hedge"){h(f.x,f.y,0,b*2,1.3,M,y);continue}let _=f.kind==="pine"?M*.62:f.kind==="conifer"?M*.18:f.kind==="birch"?M*.3:M*.2,S=Math.min(.45,.08+M*.018),T=new jt(S*.8,S,_+1,7);if(T.translate(f.x,(_+1)/2,-f.y),o(T,"bark"),f.kind==="conifer"){let A=new zn(b,M-_,9);A.translate(f.x,_+(M-_)/2,-f.y),o(A,y);continue}if(f.kind==="pine"){let A=new Ar(b,1);A.scale(1,.55,1),A.translate(f.x,M-b*.55,-f.y),o(A,y);continue}let x=f.kind==="birch"?1.6:1,w=M-_;for(let[A,C,L,N]of[[0,0,.55,1],[.38,.2,.42,.72],[-.34,-.28,.46,.7],[.1,-.4,.72,.6]]){let D=new Ar(b*N*(f.kind==="birch"?.75:1),1);D.scale(1,x*w/(2*b)*1,1),D.translate(f.x+A*b,_+L*w,-(f.y+C*b)),o(D,y)}}let g=f=>{if(typeof document>"u")return null;let y=document.createElement("canvas");y.width=y.height=256;let M=y.getContext("2d"),b=S=>{let T=Math.round(255*Math.max(0,Math.min(1,S)));return`rgb(${T},${T},${T})`};if(M.fillStyle=b(a),M.fillRect(0,0,256,256),f==="wall"){let S=19.24812030075188,T=256/4.44;for(let x=0;x<14;x++){M.fillStyle=b(1),M.fillRect(0,x*S,256,2.2);for(let w=-1;w<6;w++){let A=w*T+(x%2?T/2:0);M.fillStyle=b(1),M.fillRect(A,x*S,2.2,S),M.fillStyle=b(a+Math.sin(x*12.9+w*78.2)*.07),M.fillRect(A+2.2,x*S+2.2,T-2.2,S-2.2)}}}else{let T=41.29032258064516;for(let x=0;x<11;x++){M.fillStyle=b(a-.16),M.fillRect(0,x*25.6,256,3);for(let w=-1;w<8;w++){let A=w*T+(x%2?T/2:0);M.fillStyle=b(a+Math.sin(x*7.1+w*3.3)*.05),M.fillRect(A+1.5,x*25.6+3,T-1.5,25.6-3)}}}let _=new Da(y);return _.wrapS=_.wrapT=hi,_.colorSpace=Lt,_.anisotropy=4,_};for(let[f,y]of n){if(!y.length)continue;let M=["wall","roof","leaf"].includes(f),b=f==="wall"||f==="roof"?g(f):null,_=Rn(y,!1),S=new Kt({color:M?"#ffffff":i[f],vertexColors:M,map:b,roughness:f==="glass"?.25:.95,side:Rt,flatShading:f==="leaf"}),T=new Je(_,S);T.name="Street context "+f,T.castShadow=!["grass","road","drive"].includes(f),T.receiveShadow=!0,t.add(T),this.stats.meshes++,this.stats.triangles+=_.attributes.position.count/3;for(let x of y)x.dispose()}this.group=t,this.scene.add(t)}};var $r={skin:["#e8c4a8","#d9a98a","#c58f6b","#8d5a3c","#6b4128","#f0d2bc"],hair:["#2b2118","#4a2f1d","#7d5a3a","#b98a55","#d9c39a","#5a5650","#1a1714"],top:["#5f7f96","#8a6f5a","#c9c2b4","#496b5a","#a34e45","#3f4652","#d7a24e","#6f5d8a","#e0e0d8","#2f4858"],bottom:["#343b38","#4b5563","#7a6a55","#2d3a4b","#8a8a80","#5b4636"],shoe:["#27302e","#5a4a3a","#e8e8e2","#3a3f47"]},Qr=(s,e)=>s[Math.abs(Math.floor(e))%s.length],Vs=["man","woman","man-smart","woman-dress","teen","child"],hh=class{constructor(e=0,t=Vs[e%Vs.length]){this.group=new at,this.group.name=`Resident ${e+1}`,this.variant=e,this.style=t,this.heading=0,this.motionBlend=0,this.sitBlend=0,this.lookYaw=0,this.state="idle";let i=t==="child",n=t==="teen",r=t.startsWith("woman"),a=t==="woman-dress",o=t==="man-smart";this.scale=i?.62:n?.86:r?.94:1,this.group.scale.setScalar(this.scale);let l=(x,w={})=>new Kt({color:x,roughness:.9,flatShading:!0,...w}),c=l(Qr($r.skin,e*7+3)),h=l(Qr($r.hair,e*5+1)),u=l(o?"#2f3a48":Qr($r.top,e*3+(r?4:0))),d=l(o?"#2f3a48":a?Qr($r.top,e*3+4):Qr($r.bottom,e*2+1)),p=l(Qr($r.shoe,e+(o?0:1))),m=l(o?"#f2f2ee":"#ece9e0"),v=new Rs(1,9,7),g=new gt(1,1,1),f=new Bn(1,1,3,8),y=(x,w,A,C,L)=>{let N=new Je(w,A);return N.position.set(...C),N.scale.set(...L),N.castShadow=!0,N.receiveShadow=!0,x.add(N),N},M=(x,w)=>{let A=new at;return A.position.set(...w),x.add(A),A},b=(x,w,A,C)=>y(x,f,w,[0,-A/2,0],[C,A/3,C]);if(this.hips=M(this.group,[0,.92,0]),y(this.hips,g,d,[0,.02,0],[.32,.16,.2]),this.chest=M(this.hips,[0,.1,0]),y(this.chest,g,u,[0,.24,0],[.33,.46,.2]),y(this.chest,g,u,[0,.44,0],[.41,.08,.22]),a&&y(this.hips,g,d,[0,-.16,0],[.36,.36,.24]),o){for(let x of[-1,1]){let w=y(this.chest,g,m,[x*.05,.3,.115],[.05,.24,.02]);w.rotation.z=x*.28}y(this.chest,g,l("#7a2e3a"),[0,.28,.125],[.035,.2,.015])}else y(this.chest,g,m,[0,.4,.11],[.1,.06,.02]);this.neck=M(this.chest,[0,.5,0]),y(this.neck,f,c,[0,.03,0],[.045,.03,.045]),this.head=M(this.neck,[0,.09,0]),y(this.head,v,c,[0,.09,0],[.098,.118,.104]),y(this.head,g,c,[0,.045,.095],[.026,.045,.03]),y(this.head,g,c,[0,0,.085],[.05,.012,.015]);for(let x of[-1,1])y(this.head,v,c,[x*.098,.085,.01],[.02,.03,.015]),y(this.head,v,l("#2a2622"),[x*.036,.105,.093],[.011,.011,.006]);y(this.head,v,h,[0,.135,-.01],[.104,.09,.108]),(r||n&&e%2)&&y(this.head,v,h,[0,.06,-.07],[.1,.16,.07]),a&&y(this.head,g,h,[0,-.06,-.1],[.09,.22,.05]),i&&y(this.head,v,h,[0,.16,0],[.108,.07,.11]),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[],this.hands=[];for(let x of[-1,1]){let w=M(this.chest,[x*.2,.44,0]);b(w,u,.28,.052);let A=M(w,[0,-.27,0]);y(A,v,u,[0,0,0],[.05,.05,.05]),b(A,o||a?u:c,.24,.043),this.hands.push(y(A,g,c,[0,-.28,.01],[.06,.1,.035])),this.arms.push(w),this.elbows.push(A);let C=M(this.hips,[x*.095,-.04,0]);b(C,d,.44,.072);let L=M(C,[0,-.43,0]);y(L,v,d,[0,0,0],[.06,.06,.06]),b(L,d,.42,.055),this.feet.push(y(L,g,p,[0,-.44,.045],[.11,.07,.26])),this.legs.push(C),this.knees.push(L)}let _=new Set,S=[];this.group.traverse(x=>{x.isMesh?_.add(x.geometry):S.push(x)});for(let x of S){let w=new Map;for(let A of[...x.children])if(A.isMesh){let C=w.get(A.material)??[];C.push(A),w.set(A.material,C)}for(let[A,C]of w)if(C.length>1){let L=C.map(D=>(D.updateMatrix(),D.geometry.clone().applyMatrix4(D.matrix))),N=new Je(Rn(L),A);N.castShadow=!0,N.receiveShadow=!0,C.forEach(D=>x.remove(D)),x.add(N),L.forEach(D=>D.dispose())}}let T=new Set;this.group.traverse(x=>{x.isMesh&&T.add(x.geometry)}),_.forEach(x=>{T.has(x)||x.dispose()}),this.update(0,{x:0,y:0,z:0},{x:0,y:1},!1,0)}update(e,t,i,n,r=1/60,a={}){let o=a.state??(n?"walk":"idle");this.state=o;let l=o==="treadmill",c=o==="sit",h=this.variant,u=l?6.2:3.4,d=e*u+h*1.7,p=Math.sin(d),m=Math.sin(e*1.1+h*2.3);this.motionBlend+=(Number(n||l)-this.motionBlend)*Math.min(1,r*8),this.sitBlend+=(Number(c)-this.sitBlend)*Math.min(1,r*5);let v=this.motionBlend,g=this.sitBlend;if(Math.hypot(i.x,i.y)>1e-4){let b=Math.atan2(i.x,-i.y),_=Math.atan2(Math.sin(b-this.heading),Math.cos(b-this.heading));this.heading+=_*Math.min(1,r*(n?9:4))}let f=o==="idle"||o==="look"?Math.sin(e*.43+h*1.3)*.5+Math.max(0,Math.sin(e*.9+h))**8*.4:0;this.lookYaw+=(f-this.lookYaw)*Math.min(1,r*3),this.group.rotation.y=this.heading;let y=a.seatHeight??.45;this.group.position.set(t.x,t.z+.005,-t.y),this.hips.position.set(0,.92*(1-g)+y/this.scale*g,-.14*g),this.hips.rotation.set(-.04*g,.05*p*v,.02*m+.03*p*v),this.chest.rotation.set(.02+.01*m+(o==="work"?.16:0)+(l?.08:0)-.05*g,-p*v*.09,-.03*p*v),this.neck.rotation.set(-.02*g,0,0),this.head.rotation.set(.01*m+(o==="work"?.25:0)+(o==="phone"?.3:0),this.lookYaw+(o==="look"?Math.sin(e*.6+h)*.6:0),.02*Math.sin(e*.8+h));let M=l?.62:.38;for(let b=0;b<2;b++){let _=b?-p:p,S=b?1:-1,T=_*M*v;this.legs[b].rotation.set(T*(1-g)-1.45*g,0,S*.02),this.knees[b].rotation.set(Math.max(0,-_)*(l?1.1:.55)*v*(1-g)+1.5*g,0,0),this.feet[b].rotation.set(g?-.1:0,0,0);let x=-_*(l?.9:.42)*v,w=S*.06,A=-.18-(l?.9:.18)*v;if(o==="work")x=-.95,A=-.75,w=S*.18;else if(o==="phone")b===1&&(x=-.7,A=-2.2,w=-.35);else if(o==="wave"&&b===1)x=-2.6+Math.sin(e*7)*.15,A=-.6,w=-.6+Math.sin(e*7)*.2;else if(c)x=-.55,A=-1.1,w=S*.08;else if(o==="idle"&&b===h%2){let C=Math.max(0,Math.sin(e*.5+h*2.1))**6;x-=C*.35,A-=C*.6}this.arms[b].rotation.set(x,0,w),this.elbows[b].rotation.set(A,0,0)}}dispose(){let e=new Set,t=new Set;this.group.traverse(i=>{i.isMesh&&(e.add(i.geometry),t.add(i.material))}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.group.removeFromParent()}};var Um=Math.PI*2;var Om=s=>s-Um*Math.floor((s+Math.PI)/Um);function km(s){let e=s.proposalFrontage?.wall_line_m,t=s.walls?.find(u=>/gates?$/i.test(u.name)&&u.openings?.length),i,n;if(e){let u=(s.segments??[]).filter(f=>/Front boundary wall (south|north)/.test(f.name)),d=[e[1][0]-e[0][0],e[1][1]-e[0][1]],p=Math.hypot(...d),m=[d[0]/p,d[1]/p],v=f=>(f[0]-e[0][0])*m[0]+(f[1]-e[0][1])*m[1],g=u.map(f=>[f.a,f.b].sort((y,M)=>Math.abs(v(y)-p/2)-Math.abs(v(M)-p/2))[0]);[i,n]=g.length===2?g.sort((f,y)=>v(f)-v(y)):[e[0],e[1]]}else if(t){let[u,d]=t.openings[0],p=[t.b[0]-t.a[0],t.b[1]-t.a[1]],m=Math.hypot(...p),v=[p[0]/m,p[1]/m];i=[t.a[0]+v[0]*(u-d/2),t.a[1]+v[1]*(u-d/2)],n=[t.a[0]+v[0]*(u+d/2),t.a[1]+v[1]*(u+d/2)]}else i=[-2.7,-18.03],n=[-4.72,-13.67];let r=[(i[0]+n[0])/2,(i[1]+n[1])/2],a=n[0]-i[0],o=n[1]-i[1],l=Math.hypot(a,o),c=[o/l,-a/l],h=s.site?.outline_m;if(h){let u=h.reduce((p,m)=>p+m[0],0)/h.length,d=h.reduce((p,m)=>p+m[1],0)/h.length;c[0]*(u-r[0])+c[1]*(d-r[1])>0&&(c=[-c[0],-c[1]])}return{a:i,b:n,centre:r,out:c,width:l,inward:Math.atan2(-c[1],-c[0])}}var Uo=class{constructor(e){this.path=e,this.s=[0];for(let t=1;t<e.length;t++)this.s.push(this.s[t-1]+Math.hypot(e[t].x-e[t-1].x,e[t].y-e[t-1].y));this.length=this.s[this.s.length-1]}pose(e){let t=Math.max(0,Math.min(this.length,e)),i=1;for(;i<this.s.length-1&&this.s[i]<t;)i++;let n=this.path[i-1],r=this.path[i],a=this.s[i]-this.s[i-1],o=a>1e-9?(t-this.s[i-1])/a:1;return{x:n.x+(r.x-n.x)*o,y:n.y+(r.y-n.y)*o,t:Om(n.t+Om(r.t-n.t)*o),dir:r.dir}}};var Bm=()=>globalThis.performance?.now()??Date.now(),Oo=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),cn=(s,e)=>s+Math.random()*(e-s),uh=s=>s[Math.floor(Math.random()*s.length)],Y_=/sofa|bench|lounger|armchair|chair|stool|\bbed\b|\bbed |seat|day bed/i,J_=/coffee|side table|bedside|headboard|table|desk|frame|rack|counter|unit|storage|cistern|toilet|pedestal|vanity|basin|shower|hanging|shelf|rail|treadmill|rower|weights/i,dh=class{constructor(e,t,i,n){this.life=e,this.id=t,this.nav=new Hs(e.data),this.nav.radius=.18,this.nav.position={x:i.x,y:i.y,z:i.z},this.nav.stepUp=.42,this.figure=new hh(t,n),e.group.add(this.figure.group),this.path=null,this.index=1,this.job=null,this.target=null,this.activity=null,this.activityUntil=0,this.wait=0,this.stalled=0,this.phase=Math.random()*10,this.facing={x:0,y:1},this.speed=cn(1.05,1.35),this.state="idle",this.car=null,this.hidden=!1,this.nextPlanAt=0,this.failures=0}get position(){return this.nav.position}advance(e,t){let i=this.nav,n=i.position,r=n.x+e,a=n.y+t,o=i.support(r,a,n.z);if(o!==null&&!i.blocked(r,a,o)){i.position={x:r,y:a,z:o};return}i.move(e,t)}setHidden(e){this.hidden=e,this.figure.group.visible=!e}chooseDestination(){let e=this.nav.position,t=this.life,i=t.destinations.filter(o=>Oo(o,e)>2.5&&!t.claimed.has(o.key)&&(t.unreachable.get(o.key)??0)<t.time);if(!i.length)return null;let n=i.filter(o=>Math.abs(o.z-e.z)<.5),r=n.length&&Math.random()<.65?n:i,a=[];for(let o of r)for(let l=0;l<(o.kind==="seat"?3:o.kind==="treadmill"?2:1);l++)a.push(o);return uh(a)}goTo(e,t=null){this.target&&this.life.claimed.delete(this.target.key),this.target=e,this.onArrive=t,this.path=null,this.index=1,this.job=null,this.nextPlanAt=0,e?.key&&this.life.claimed.add(e.key)}arrive(){let e=this.target;this.state=e.kind==="seat"?"sit":e.kind==="treadmill"?"treadmill":e.kind==="desk"?"work":uh(["idle","idle","look","phone"]),this.activityUntil=this.life.time+(e.kind==="seat"?cn(25,70):e.kind==="treadmill"?cn(20,45):e.kind==="desk"?cn(20,50):cn(8,22)),e.dir&&(this.facing={x:e.dir[0],y:e.dir[1]}),this.seatHeight=e.seatHeight,e.seat?(this.standPoint={x:e.x,y:e.y},this.nav.position.x=e.seat[0],this.nav.position.y=e.seat[1]):this.standPoint=null;let t=this.onArrive;this.onArrive=null,t&&t(this,!0)}step(e){let t=this.life,i=t.time,n=this.nav;if(this.hidden)return;if(!this.target){if(i>=this.activityUntil){this.standPoint&&(n.position.x=this.standPoint.x,n.position.y=this.standPoint.y,this.standPoint=null,this.state="idle");let o=this.chooseDestination();o?this.goTo(o):this.activityUntil=i+3}this.figure.update(i+this.phase,n.position,this.facing,!1,e,{state:this.state,seatHeight:this.seatHeight});return}if(!this.path&&!this.job&&i>=this.nextPlanAt&&(this.job=t.planner.search(n.position,this.target)),this.job&&t.budgetLeft()>0&&(this.job.step(1/0,Math.max(.2,t.budgetLeft())),this.job.done)){if(this.job.path)this.path=this.job.path,this.index=1,this.failures=0;else if(this.failures++,this.nextPlanAt=i+1.5,this.failures>=2){t.unreachable.set(this.target.key,i+180),this.failures=0;let o=this.onArrive;this.goTo(null),this.activityUntil=i+1,this.state="idle",o&&o(this,!1)}this.job=null}let r=!1,a={...n.position};if(this.path&&this.index<this.path.length){for(let u=Math.min(this.path.length-1,this.index+4);u>this.index;u--)if(Oo(n.position,this.path[u])<1.2&&t.planner.clear(n.position,this.path[u])){this.index=u;break}let o=this.path[this.index],l=o.x-n.position.x,c=o.y-n.position.y,h=Math.hypot(l,c);if(h<.05)this.index++;else{let u={x:n.position.x+l/h*.7,y:n.position.y+c/h*.7,z:n.position.z};if(t.blockedAhead(this,u))this.wait+=e,this.wait>4&&(this.wait=0,this.path=null,this.nextPlanAt=i+.5);else{this.wait=0;let p=Math.min(h,this.speed*e);if(this.advance(l/h*p,c/h*p),r=Oo(a,n.position)>p*.25,this.stalled=p>1e-5&&!r?this.stalled+e:0,this.stalled>.25&&this.stalled<.6){let m=Math.random()*Math.PI*2;n.move(Math.cos(m)*.03,Math.sin(m)*.03)}this.stalled>.6&&(this.stalled=0,this.path=null,this.nextPlanAt=i+.3),r&&(this.facing={x:l/h,y:c/h})}}if(this.path&&this.index>=this.path.length){let u=this.target;this.path=null,this.life.claimed.delete(u.key),this.arrive(),this.target=null}}this.figure.update(i+this.phase,n.position,this.facing,r,e,{state:r?"walk":this.state==="sit"||this.state==="treadmill"?"idle":this.state})}dispose(){this.target&&this.life.claimed.delete(this.target.key),this.figure.dispose()}},Od=class{constructor(e,t,i){this.life=e,this.bay=t,this.id=t.id,this.group=i.group,this.obstacle=i.obstacle,this.length=4.4,this.width=1.8,this.pose={x:t.x,y:t.y,t:t.t},this.state="parked",this.until=e.time+cn(20,90),this.track=null,this.s=0,this.speed=0,this.owner=null,this.away=!1,this.paths=e.drivePaths?.[t.id]??null,this.apply()}apply(){let e=this.pose;this.group.position.set(e.x,0,-e.y),this.group.rotation.y=e.t,this.group.visible=!this.away;let t=Math.abs(Math.cos(e.t)),i=Math.abs(Math.sin(e.t)),n=(this.length*t+this.width*i)/2,r=(this.length*i+this.width*t)/2,a=this.away?[999,999,999.1,999.1]:[e.x-n,e.y-r,e.x+n,e.y+r];this.obstacle&&(this.obstacle.box=a)}get moving(){return!this.away&&!!this.track&&(this.state==="driving-out"||this.state==="arriving")}doorPoint(){let e=this.pose,t=Math.sin(e.t),i=-Math.cos(e.t);return{x:e.x+t*1.35+Math.cos(e.t)*.5,y:e.y+i*1.35+Math.sin(e.t)*.5,z:0}}begin(e){this.track=e,this.s=0,this.speed=0}step(e){let t=this.life,i=t.time;switch(this.state){case"parked":i>=this.until&&this.paths?.exit&&!this.owner&&t.people?this.callOwner():i>=this.until&&this.paths?.exit&&!t.people&&(this.state="leaving");break;case"waiting-owner":break;case"leaving":t.takeDrive(this)&&(this.begin(new Uo(this.paths.exit)),this.state="driving-out");break;case"driving-out":{let n=this.gateDistance(),r=n-4.5;this.s<r-.01?this.drive(e,r):this.s<n+.5&&!t.gateOpen()?this.speed=0:(this.drive(e)||this.s>n+3)&&(this.away=!0,t.releaseDrive(this),this.state="away",this.until=i+cn(30,110),this.apply());break}case"away":i>=this.until&&this.paths?.arrive&&!t.cars.some(n=>n.state==="arriving")&&(this.state="arriving",this.begin(new Uo(this.paths.arrive)),this.pose={...this.paths.arrive[0]},this.away=!1,this.apply());break;case"arriving":{let n=this.gateDistance(),r=n-8,a=n-4.5;this.s<r-.01?this.drive(e,r):t.takeDrive(this)?this.s<a-.01?this.drive(e,a):this.s<n+.5&&!t.gateOpen()?this.speed=0:this.drive(e)&&(this.state="parked",t.releaseDrive(this),this.until=i+cn(45,180),this.dropOwner()):this.speed=0;break}}}gateDistance(){let e=this.track;if(e.gateS!==void 0)return e.gateS;let t=this.life.gate,i=1/0,n=0;for(let r=0;r<=e.length;r+=.25){let a=e.pose(r),o=Math.hypot(a.x-t.centre[0],a.y-t.centre[1]);o<i&&(i=o,n=r)}return e.gateS=n,n}drive(e,t=1/0){let i=this.track,n=Math.min(i.length,t),r=i.pose(this.s),a=r.dir<0,o=i.length;for(let u=this.s+.25;u<i.length;u+=.25)if(i.pose(u).dir!==r.dir){o=u;break}let l=Math.min(n-this.s,o-this.s),c=a?1.1:Math.min(2.4,.7+l*.9);this.life.personNear(this,r,a)&&(c=0),this.speed+=(c-this.speed)*Math.min(1,e*(c<this.speed?4:1.2)),this.s=Math.min(n,this.s+this.speed*e);let h=i.pose(this.s);return this.pose={x:h.x,y:h.y,t:h.t},this.apply(),this.s>=i.length-1e-6?!0:(this.s>=n-1e-6&&(this.speed=0),!1)}callOwner(){let e=this.life,t=e.freeResident();if(!t){this.until=e.time+15;return}this.owner=t,t.car=this,this.state="waiting-owner";let i=this.doorPoint();t.goTo({key:"car-"+this.id,kind:"car",x:i.x,y:i.y,z:0,dir:[Math.cos(this.pose.t),Math.sin(this.pose.t)]},(n,r)=>{r?(t.setHidden(!0),t.state="idle",this.state="leaving"):(t.car=null,this.owner=null,this.state="parked",this.until=e.time+20)})}dropOwner(){let e=this.life;if(!e.people)return;let t=this.doorPoint(),i=this.owner;if(!i){if(i=e.spawnResident(t),!i)return;this.owner=i,i.car=this}i.nav.position={x:t.x,y:t.y,z:0},i.setHidden(!1),i.facing={x:Math.sin(this.pose.t),y:-Math.cos(this.pose.t)};let n=e.entrance;i.goTo(n?{key:"entrance-"+this.id,kind:"view",x:n.x,y:n.y,z:n.z,dir:n.dir}:null,()=>{this.owner=null,i.car=null,i.activityUntil=e.time+cn(2,6)}),n||(this.owner=null,i.car=null)}},fh=class{constructor(e,{scene:t,doors:i,carTemplates:n=new Map,mobile:r=!1,drivePaths:a=null}={}){this.data=e,this.scene=t,this.doors=i,this.mobile=r,this.drivePaths=a??e.life?.drive??null,this.group=new at,this.group.name="Life",t.add(this.group),this.planner=new jr(e,{spacing:.2,radius:.18}),this.residents=[],this.cars=[],this.people=!1,this.carsOn=!1,this.time=0,this.claimed=new Set,this.unreachable=new Map,this.turn=0,this.driveOwner=null,this.frameDeadline=0,this.gate=km(e),this.gateDoor=i?.doors.find(l=>l.spec.id==="Proposal | Front sliding gate")??null,this.destinations=Z_(e);let o=e.rooms.find(l=>/new entrance gallery/i.test(l.label))??e.rooms.find(l=>/entrance hall/i.test(l.label))??null;this.entrance=o?{x:o.position[0],y:o.position[1],z:o.position[2],dir:o.direction}:null,this.carTemplates=n;for(let[l,c]of n){let h=(e.proposalSite?.driveway_bay_bounds_m??[]).find(v=>v.id===l);if(!h)continue;let u=h.bounds_m,d=u[3]-u[1]>u[2]-u[0]?Math.PI/2:0,p=this.drivePaths?.[l]?.arrive,m=p?p[p.length-1]:{x:(u[0]+u[2])/2,y:(u[1]+u[3])/2,t:d};this.cars.push(new Od(this,{id:l,x:m.x,y:m.y,t:m.t},c))}this.count=r?4:7}get active(){return this.people||this.carsOn}get visitorPositions(){let e=[];for(let t of this.residents)t.hidden||e.push({...t.nav.position});for(let t of this.cars)if(t.moving){let i=t.pose,n=t.track.pose(Math.min(t.track.length,t.s+2.6));e.push({x:i.x,y:i.y,z:0}),e.push({x:n.x,y:n.y,z:0})}return e}budgetLeft(){return this.frameDeadline-Bm()}setPeople(e){if(this.people=!!e,e&&!this.residents.length&&this.populate(),!e){for(let t of this.residents)t.dispose();this.residents=[],this.claimed.clear();for(let t of this.cars)t.owner&&(t.owner=null,t.state==="waiting-owner"&&(t.state="parked"))}}setCars(e){if(this.carsOn=!!e,!e)for(let t of this.cars){t.owner&&(t.owner.setHidden(!1),t.owner.car=null,t.owner.goTo(null),t.owner.activityUntil=this.time,t.owner=null);let i=t.paths?.arrive,n=i?i[i.length-1]:{x:t.bay.x,y:t.bay.y,t:t.bay.t};t.pose={...n},t.away=!1,t.track=null,t.state="parked",t.until=this.time+cn(20,90),t.apply()}this.driveOwner=null}populate(){let e=this.destinations.filter(t=>t.kind==="view"&&t.indoor);for(let t=0;t<this.count&&e.length;t++){let i=e.splice(Math.floor(Math.random()*e.length),1)[0];if(!this.planner.nav.canStand(i))continue;let n=new dh(this,this.residents.length,i,Vs[this.residents.length%Vs.length]);n.facing={x:i.dir[0],y:i.dir[1]},n.state=uh(["idle","look"]),n.activityUntil=this.time+cn(1,12),this.residents.push(n)}}spawnResident(e){if(this.residents.length>=this.count+2)return null;let t=new dh(this,this.residents.length,{x:e.x,y:e.y,z:0},Vs[this.residents.length%Vs.length]);return this.residents.push(t),t}freeResident(){let e=this.residents.filter(t=>!t.car&&!t.hidden&&!t.target);return e.length?uh(e):null}takeDrive(e){return!this.driveOwner||this.driveOwner===e?(this.driveOwner=e,!0):!1}releaseDrive(e){this.driveOwner===e&&(this.driveOwner=null)}driveFree(e){return!this.driveOwner||this.driveOwner===e}gateOpen(){return this.gateDoor?this.gateDoor.angle>.9:!0}personNear(e,t,i){let n=i?-1:1,r=Math.cos(t.t)*n,a=Math.sin(t.t)*n,o={x:t.x+r*e.length/2,y:t.y+a*e.length/2},l=c=>{let h=c.x-o.x,u=c.y-o.y,d=h*r+u*a,p=Math.abs(-h*a+u*r);return d>-.5&&d<3.2&&p<1.6&&Math.abs(c.z??0)<1.2};if(this.player&&l(this.player))return!0;for(let c of this.residents)if(!c.hidden&&l(c.nav.position))return!0;return!1}blockedAhead(e,t){if(this.player&&Oo(this.player,t)<.55&&Math.abs(this.player.z-t.z)<1.2)return"visitor";for(let i of this.residents)if(!(i===e||i.hidden)&&Oo(i.nav.position,t)<.5&&Math.abs(i.nav.position.z-t.z)<.6&&(!i.path||i.id<e.id))return"resident";for(let i of this.cars)if(i.moving){let n=i.pose;if(Math.hypot(n.x-t.x,n.y-t.y)<3.4)return"car"}return null}step(e,t){if(!this.active)return!1;e=Math.max(0,Math.min(.05,e)),this.time+=e,this.player=t,this.frameDeadline=Bm()+(this.mobile?2.5:4);let i=this.residents.length;if(this.turn=(this.turn+1)%Math.max(1,i),this.people)for(let n=0;n<i;n++)this.residents[(this.turn+n)%i].step(e);if(this.carsOn)for(let n of this.cars)n.step(e);return!0}dispose(){this.setPeople(!1),this.group.removeFromParent()}};function Z_(s){let e=[];for(let t of s.rooms){if(/gate|street|approach|outside|bridge|stair|landing|gallery|passage|corridor|lobby/i.test(t.id+" "+t.label))continue;let[i,n,r]=t.position;e.push({key:"view:"+t.id,kind:"view",x:i,y:n,z:r,dir:t.direction,indoor:!/garden|terrace|pool|deck|pavilion|lawn|drive|court/i.test(t.group+" "+t.label)})}for(let t of s.obstacles??[]){let i=t.box;if(!i)continue;let n=t.name??"",r=(i[0]+i[2])/2,a=(i[1]+i[3])/2,o=t.bottom??0;if(/treadmill/i.test(n)){let b=i[3]-i[1]>i[2]-i[0],_=b?[0,1]:[1,0],S=b?[(i[2]-i[0])/2+.45,0]:[0,(i[3]-i[1])/2+.45];e.push({key:"treadmill:"+n,kind:"treadmill",x:r+S[0],y:a+S[1],z:o,dir:_,seat:[r,a],indoor:!0});continue}if(!Y_.test(n)||J_.test(n))continue;let l=t.top??o+.45,c=/bed/i.test(n)?Math.min(.6,l):Math.min(.5,Math.max(.4,l-.4)),h=i[2]-i[0],u=i[3]-i[1];if(h>3||u>3||h<.3||u<.3)continue;let d=s.rooms.filter(b=>Math.abs(b.position[2]-o)<.6).sort((b,_)=>Math.hypot(b.position[0]-r,b.position[1]-a)-Math.hypot(_.position[0]-r,_.position[1]-a))[0],p=d?[d.position[0]-r,d.position[1]-a]:[0,1],m=Math.hypot(...p)||1,v=p[0]/m,g=p[1]/m,f=(Math.abs(v)*h+Math.abs(g)*u)/2,y=f+.38,M=Math.max(0,f-.3);e.push({key:"seat:"+n,kind:"seat",x:r+v*y,y:a+g*y,z:o,dir:[v,g],seatHeight:c,seat:[r+v*M,a+g*M],indoor:!0})}return e}function zm(s,e,t){let i=new at;i.name="Life car";let n=(e[0]+e[2])/2,r=(e[1]+e[3])/2,a=new ke().makeRotationY(-t).multiply(new ke().makeTranslation(-n,0,r));for(let{geometry:o,material:l}of s){let c=o.clone();c.applyMatrix4(a);let h=new Je(c,l);h.castShadow=!0,h.receiveShadow=!0,i.add(h)}return i}var ph=class{constructor({scene:e,camera:t,canvas:i,doors:n,life:r,data:a}){this.scene=e,this.camera=t,this.canvas=i,this.doors=n,this.life=r,this.data=a,this.raycaster=new Is,this.raycaster.far=80,this.enabled=!1,this.overlay=null,this.last=null,this.material=new xi({color:2914404,transparent:!0,opacity:.38,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:Rt})}setEnabled(e){this.enabled=!!e,e||this.clear()}clear(){this.overlay&&(this.overlay.removeFromParent(),this.overlay.geometry.dispose(),this.overlay=null),this.last=null}resolve(e){let t=e.object,i=t.userData.spatialBatch;if(i?.sourceRanges){let n=e.faceIndex,r=i.sourceRanges,a=0,o=r.length-1;for(;a<o;){let h=a+o+1>>1;r[h]<=n?a=h:o=h-1}let l=r[a],c=a+1<r.length?r[a+1]:i.triangles;return{name:i.sourceNames[a]||"(unnamed)",kind:"model",mesh:t,range:[l,c]}}for(let n=t;n;n=n.parent){let r=this.doors?.doors.find(a=>a.pivot===n);if(r)return{name:r.spec.id,kind:"door",mesh:t,range:null,root:n};if(n.userData.lifeCar)return{name:n.userData.lifeCar,kind:"car",mesh:t,range:null,root:n};if(/^Resident \d+$/.test(n.name))return{name:n.name,kind:"person",mesh:t,range:null,root:n};if(n.userData.streetName)return{name:n.userData.streetName,kind:"street",mesh:t,range:null,root:n}}return{name:t.name||"(unnamed)",kind:"other",mesh:t,range:null,root:t}}pickables(){let e=[];return this.scene.traverse(t=>{t.isMesh&&t.visible&&!t.userData.inspectOverlay&&!t.userData.noPick&&e.push(t)}),e}pick(e){this.raycaster.setFromCamera(new re(e[0],e[1]),this.camera);let t=this.raycaster.intersectObjects(this.pickables(),!1),i=null;for(let o of t){let l=o.object.material;if(!(l?.transparent&&l.opacity<.5&&!i)){i=o;break}}if(i||(i=t[0]),!i)return null;let n=this.resolve(i),r={x:i.point.x,y:-i.point.z,z:i.point.y},a=this.highlight(n);return this.last={...n,point:r,size:a,mesh:void 0,root:void 0},this.last}highlight(e){this.clear();let t=new Ft;if(e.range){let n=e.mesh.geometry,r=new ot;r.setAttribute("position",n.getAttribute("position")),n.index&&r.setIndex(n.index),r.setDrawRange(e.range[0]*3,(e.range[1]-e.range[0])*3);let a=new Je(r,this.material);a.userData.inspectOverlay=!0,a.frustumCulled=!1,a.renderOrder=5,this.scene.add(a),this.overlay=a;let o=n.getAttribute("position"),l=n.index;for(let c=e.range[0]*3;c<e.range[1]*3;c++){let h=l?l.getX(c):c;t.expandByPoint(new I(o.getX(h),o.getY(h),o.getZ(h)))}}else if(e.root){e.root.updateMatrixWorld(!0);let n=new at;n.userData.inspectOverlay=!0,e.root.traverse(r=>{if(!r.isMesh)return;let a=new Je(r.geometry,this.material);a.userData.inspectOverlay=!0,a.matrixAutoUpdate=!1,a.matrix.copy(r.matrixWorld),a.renderOrder=5,n.add(a)}),this.scene.add(n),this.overlay=n,this.overlay.geometry={dispose(){}},t.setFromObject(e.root)}if(t.isEmpty())return null;let i=t.getSize(new I);return{size:[i.x,i.z,i.y],min:[t.min.x,-t.max.z,t.min.y],max:[t.max.x,-t.min.z,t.max.y]}}};var se=s=>document.getElementById(s);document.body.classList.toggle("touch-ui",Po());var ai=se("view"),Xi=new Es;Xi.background=new Be("#dce5e5");var Bd=()=>({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}),na=Bd(),Kn=new qt(72,na.width/na.height,.045,150),hn,tt,je,Ci,st=null,ki=0,Pn=0,ji=!1,Qt=!1,js=!1,ta=null,ms="drag",zo=0,Gm=0,Hm=0,xh=!0,Pt=new Set,ri={sourceMeshes:0,batches:0,hiddenMeshes:0},ht=!1,ps=null,mh=new Map,ko=null,Ws=null,qs=null,ii=null,Vm=0,_i=null,ea=null,qm={people:"ashley-heights-life-people",cars:"ashley-heights-life-cars"};function Wm(s){try{return localStorage.getItem(qm[s])==="1"}catch{return!1}}function $_(s,e){try{localStorage.setItem(qm[s],e?"1":"0")}catch{}}var aa=()=>{mh.clear()};try{hn=new zc({canvas:ai,antialias:!Po(),powerPreference:"high-performance"})}catch(s){throw se("load-status").textContent="3D graphics could not start. Open this walkthrough in Safari or Chrome with hardware acceleration enabled.",s}var ia=new $c({mobile:Po(),dpr:devicePixelRatio});hn.setPixelRatio(ia.ratio(na.width,na.height));hn.setSize(na.width,na.height,!1);hn.outputColorSpace=Lt;var ni=gm(hn,Xi,Kn),Ut=new eh(ai,se("move-pad"),se("move-thumb"),(s,e)=>{!ji||!Qt||(ki-=s*.004,Pn=Math.max(-1.35,Math.min(1.35,Pn-e*.004)),Yn())},()=>{_i?.enabled&&!st?.game.started?zd():st?.game.tapFire()});function Xm(s){se("map").hidden=!s,se("map-panel").classList.toggle("collapsed",!s),se("map-toggle").textContent=Ut.enabled?s?"\xD7":"Map +":s?"\u2212":"+",se("map-toggle").setAttribute("aria-expanded",String(s)),se("map-toggle").setAttribute("aria-label",s?"Hide floorplan":"Show floorplan")}Xm(!Ut.enabled);function Mi(s){se("toast").textContent=s,se("toast").hidden=!1,clearTimeout(Mi.timer),Mi.timer=setTimeout(()=>se("toast").hidden=!0,4200)}function Yn(){let s=tt.position;Kn.position.set(s.x,s.z+je.eyeHeight,-s.y),Kn.rotation.set(Pn,ki,0,"YXZ")}function jm(s){ki=Math.atan2(-s[0],s[1]),Pn=Math.atan2(s[2]||0,Math.hypot(s[0],s[1]))}function Q_(s){return s.z>2&&s.z<3.3&&s.y>7.89&&s.y<10.64&&s.x>5.04&&s.x<9.08}function Km(s){return[...je.floorLevels??[{id:0,z:0,label:"Ground floor"},{id:1,z:2.8,label:"First floor"}]].reverse().find(e=>s>=e.z-.35)??{id:0,z:0,label:"Ground floor"}}function kd(){let s=tt.position;if(ht){let i=s.z+je.eyeHeight;return"Flying \xB7 "+Math.round(Math.abs(i))+" m "+(i<0?"below ground":"high")}if(Ud(je,s))return"Ashley Close";if(je.approachSurface&&$t(s.x,s.y,je.approachSurface.polygon)&&!$t(s.x,s.y,je.site.outline_m))return"Outside gates";let e=Km(s.z).id;return je.planRooms.find(i=>(i.floor===e||e===0&&i.floor===2)&&$t(s.x,s.y,i.polygon_m))?.name||(Q_(s)?"Balcony":null)||(s.y>10?"Garden":s.y<0?"Front of house":s.z>.2&&s.z<2.7?"Stairs":"Outside")}function sa(){let s=tt.position,e=Km(s.z),t=s.y>11&&s.z<1,i=e.id;se("location").textContent=kd(),se("floor-label").textContent=ht?"Site view":t?"Garden":Math.abs(s.z-e.z)>.35?"Stairs":e.label;let n=se("map").getContext("2d"),r=480,a=310;n.clearRect(0,0,r,a);let o=je.streetContext?.enabled,l=o&&(ht||Ud(je,s)),c=l?[-72,-51,31,34]:ht?[je.bounds[0]-4,je.bounds[1]-4,je.bounds[2]+4,je.bounds[3]+4]:t?[-28,8,19,33]:s.y<-.5?[-9,-24,19,11]:[-5.8,-1,14.7,11.2],h=Math.min((r-24)/(c[2]-c[0]),(a-24)/(c[3]-c[1])),u=(r-(c[2]-c[0])*h)/2,d=(a-(c[3]-c[1])*h)/2,p=([f,y])=>[u+(f-c[0])*h,a-d-(y-c[1])*h],m=(f,y,M)=>{n.beginPath(),f.forEach((b,_)=>{let[S,T]=p(b);_?n.lineTo(S,T):n.moveTo(S,T)}),n.closePath(),n.fillStyle=y,n.fill(),n.strokeStyle=M,n.lineWidth=1.6,n.stroke()};if(l){m(je.streetContext.road,"#a1aaa2","#808d83");for(let f of je.streetContext.obstacles)m(f.polygon,"#d6d0c3","#a39a8b");se("floor-label").textContent="Street context"}(ht||t||s.y<-.5)&&je.site?.outline_m&&m(je.site.outline_m,"#d8e2cf","#9aaa96");for(let f of je.planRooms)(ht?f.floor===0||f.floor===2:t?f.floor===2:f.floor===i)&&m(f.polygon_m,f.name===kd()?"#c0dacf":"#e9ece3","#8c9d90");if(!t&&!ht){for(let f of tt.segments)if(Math.abs(f.bottom-e.z)<.1){let y=p(f.a),M=p(f.b);n.beginPath(),n.moveTo(...y),n.lineTo(...M),n.strokeStyle="#62766b",n.lineWidth=2,n.stroke()}}let[v,g]=p([s.x,s.y]);n.save(),n.translate(v,g),n.rotate(-ki),n.fillStyle="#2c7864",n.beginPath(),n.moveTo(0,-14),n.lineTo(-8,7),n.lineTo(0,3),n.lineTo(8,7),n.closePath(),n.fill(),n.restore()}function Ym(){document.body.classList.toggle("flying",ht),se("flight-toggle").textContent=ht?"\u2193 Walk":"\u2191 Fly",se("flight-toggle").setAttribute("aria-pressed",String(ht)),se("flight-toggle").setAttribute("aria-label",ht?"Return to walking":"Fly around the house"),se("flight-height").hidden=!ht,st?.game.started||(se("hint").textContent=ht?"W A S D \xB7 E up / Q down \xB7 Shift faster \xB7 F walk \xB7 Esc controls":"W A S D / arrows \xB7 Shift faster \xB7 Esc controls",se("welcome").querySelector("h1").textContent=ht?"Fly around.":"Come inside.",se("welcome").querySelector(".keys span").innerHTML=ht?"W A S D move towards your view.<br>E up \xB7 Q down \xB7 Shift faster \xB7 F walk":"Move with these or the arrow keys.<br>Move your mouse to look around.",se("welcome").querySelector(".touch-instructions p").textContent=ht?"Move and look together. Hold Up or Down to change height. Push the pad farther to fly faster.":"Use both together. Push the movement pad farther to sprint.",ji&&(se("start").textContent=ht?"Start flying":"Start walking"))}function vh(s,{quiet:e=!1}={}){if(!(!ji||st?.game.started)){if(s&&!ht&&(ps=oh(tt,tt.position,ps).position),!s&&ht){let t=oh(tt,tt.position,ps);tt.position=t.position,t.moved&&!e&&Mi("Returned to your walking viewpoint.")}ht=!!s,Pt.clear(),Ut.reset(),aa(),Ym(),Yn(),sa()}}function gh(s){let e=je.rooms.find(t=>t.id===s);e&&(ht&&vh(!1,{quiet:!0}),Ut.reset(),tt.teleport(e),ps={...tt.position},jm(e.direction),Ci?.snap(tt.position)&&ni.updateShadows(),Yn(),sa(),se("rooms").value=s,Pt.clear())}function ra(s){st?.clock.phase!=="caught"&&(s&&st?.game.cancelFire(),se("welcome").hidden=!s,se("resume").hidden=Ut.enabled||s||document.pointerLockElement===ai,document.body.classList.toggle("walking",!s),Qt=!s,Ut.setActive(Qt),Pt.clear(),aa())}function eM(s){return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}function tM(){st.clock.catch(),Qt=!1,Pt.clear(),Ut.setActive(!1),js=!1,document.body.classList.remove("walking"),se("chase-status").hidden=!0,se("welcome").hidden=!0,se("resume").hidden=!0,document.pointerLockElement&&document.exitPointerLock();let s=st.game.state;se("caught-score").textContent=`Wave ${s.wave} \xB7 ${s.kills} defeated \xB7 ${s.score.toLocaleString()} points. Best: ${st.game.best.toLocaleString()}.`,se("caught").showModal(),se("play-again").focus()}se("caught").addEventListener("cancel",s=>s.preventDefault());se("play-again").onclick=()=>{st&&(st.game.reset(),st.clock.reset(),se("caught").close(),se("chase-status").hidden=!0,gh("arrival"),ni.updateShadows(),zo=performance.now(),Xs(ms==="lock"))};async function Xs(s){if(ji&&(s=s&&!Ut.enabled,ms=s?"lock":"drag",ra(!1),ai.focus(),s))try{await ai.requestPointerLock()}catch{ms="drag",Mi("Click and drag to look around; use W A S D to move."),se("resume").hidden=!1}}se("start").onclick=()=>Xs(!0);se("drag").onclick=()=>Xs(!1);se("resume").onclick=()=>Xs(!0);se("help").onclick=()=>{document.pointerLockElement&&document.exitPointerLock(),ra(!0)};se("rooms").onchange=s=>{st?.game.started||(gh(s.target.value),se("welcome").hidden&&ai.focus())};se("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Mi("Use your browser\u2019s fullscreen control.")}};function yh({focus:s=!0}={}){if(!qs)return;let e=qs;qs=null,se("settings-panel").hidden=!0,se("settings-toggle").setAttribute("aria-expanded","false"),Qt=e.active,Ut.setActive(Qt),Pt.clear(),s&&se("settings-toggle").focus(),Qt&&e.mode==="lock"&&(se("resume").hidden=!1)}function iM(){if(ji){if(qs){yh();return}qs={active:Qt,mode:ms},ms="drag",Qt=!1,Pt.clear(),aa(),Ut.setActive(!1),st?.game.cancelFire(),js=!1,document.pointerLockElement&&document.exitPointerLock(),se("settings-panel").hidden=!1,se("settings-toggle").setAttribute("aria-expanded","true"),se("street-context").focus()}}function Jm(s,{persist:e=!0}={}){if(!Ws)return;let t=!1;if(s?Ws.setVisible(!0):(t=Fm(tt,{flying:ht}),Ws.setVisible(je.streetContext.enabled)),se("street-context").checked=je.streetContext.enabled,e)try{Nm(localStorage,je.streetContext.enabled)}catch{}ri.streetContext={...Ws.stats,enabled:je.streetContext.enabled},Pt.clear(),Ut.reset(),aa(),t&&(ps={...tt.position},Ci?.snap(tt.position),Mi("Street hidden. Returned to the front gates.")),Yn(),sa(),ni.updateShadows()}se("settings-toggle").onclick=iM;se("settings-close").onclick=()=>yh();se("street-context").onchange=s=>Jm(s.target.checked);function Bo(s,e,{persist:t=!0}={}){if(ii){if(s==="people")ii.setPeople(e);else{if(e&&!ii.cars.length){Mi(jn(ti)?"No car paths are available for this design.":"Cars belong to the proposals: switch to Proposal A or B."),se("life-cars").checked=!1;return}ii.setCars(e)}se(s==="people"?"life-people":"life-cars").checked=s==="people"?ii.people:ii.carsOn,t&&$_(s,e),ri.life={people:ii.people,cars:ii.carsOn,residents:ii.residents.length,carCount:ii.cars.length},ni.updateShadows()}}se("life-people").onchange=s=>Bo("people",s.target.checked);se("life-cars").onchange=s=>Bo("cars",s.target.checked);function bh(s,{persist:e=!0}={}){if(_i&&(_i.setEnabled(s),document.body.classList.toggle("inspecting",_i.enabled),se("inspect-mode").checked=_i.enabled,_i.enabled||(se("inspect-card").hidden=!0),e))try{localStorage.setItem("ashley-heights-inspect",_i.enabled?"1":"0")}catch{}}function nM(s){if(!s)return;se("inspect-name").textContent=s.name;let e={model:"",door:"Door \xB7 ",car:"Car \xB7 ",person:"Person \xB7 ",street:"Street \xB7 ",other:""}[s.kind]??"",t=s.size?`${s.size.size.map(l=>l.toFixed(2)).join(" \xD7 ")} m \xB7 `:"",i=s.point,n=s.size?s.size.min[2]:i.z,r=je.floorLevels??[{z:0,label:"Ground floor"},{z:2.8,label:"First floor"}],a=[...r].filter(l=>l.z<=n+.06).sort((l,c)=>c.z-l.z)[0]??r[0],o=n<-.4&&a.label==="Cellar"&&jn(ti)?"Basement":n>r.at(-1).z+2.6?"Roof":a.label;se("inspect-meta").textContent=`${e}${t}at x ${i.x.toFixed(2)}, y ${i.y.toFixed(2)}, z ${i.z.toFixed(2)} \xB7 ${o}`,se("inspect-card").hidden=!1,window.walkthrough&&(window.walkthrough.lastPick=s)}function zd(s,e){if(!_i?.enabled||!ji||st?.game.started)return null;let{width:t,height:i}=Bd(),n=document.pointerLockElement===ai||s===void 0?[0,0]:[s/t*2-1,-(e/i*2-1)],r=_i.pick(n);return r?nM(r):Mi("Nothing there to identify."),r}se("inspect-mode").onchange=s=>bh(s.target.checked);se("inspect-close").onclick=()=>{se("inspect-card").hidden=!0,_i?.clear()};se("inspect-copy").onclick=async()=>{let s=se("inspect-name").textContent;try{await navigator.clipboard.writeText(s),Mi("Copied: "+s)}catch{Mi("Select the name to copy it.")}};document.addEventListener("pointerdown",s=>{qs&&!se("settings-panel").contains(s.target)&&!se("settings-toggle").contains(s.target)&&yh({focus:!1})},!0);var Zm=s=>{ji&&(Am(ti),Rm(s,{...tt.position,yaw:ki,pitch:Pn,active:Qt,flying:ht,lastWalkingPosition:ps}),location.assign(Tm(s)))};se("design-switch").onclick=()=>Zm(jn(ti)?"original":lh());se("variant-switch").onclick=()=>Zm(jn(ti)?Fo(ti):Fo(lh()));se("map-toggle").onclick=()=>Xm(se("map").hidden);se("flight-toggle").onclick=()=>{vh(!ht),Qt||Xs(!1),ai.focus(),ht&&Mi(Ut.enabled?"Fly mode \xB7 Move and look together \xB7 Hold Up / Down":"Fly mode \xB7 W A S D \xB7 E up / Q down \xB7 Shift faster")};for(let[s,e]of[["fly-up",1],["fly-down",-1]]){let t=se(s);t.addEventListener("pointerdown",i=>{!ht||!Qt||(i.preventDefault(),mh.set(i.pointerId,e),t.setPointerCapture(i.pointerId))});for(let i of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(i,n=>mh.delete(n.pointerId));t.addEventListener("click",i=>{i.detail===0&&ht&&Qt&&(tt.position=Ld(je,tt.position,{vertical:e,dt:.04}),Yn()),t.blur()}),t.addEventListener("contextmenu",i=>i.preventDefault())}for(let s of["blur","resize"])window.addEventListener(s,aa);document.addEventListener("visibilitychange",aa);document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===ai?(ra(!1),ms="lock"):ms==="lock"&&ji&&ra(!0)});document.addEventListener("pointerlockerror",()=>{ms="drag",ra(!1),Mi("Use click-and-drag to look around.")});ai.addEventListener("pointerdown",s=>{s.pointerType==="touch"||s.pointerType==="pen"||!ji||!Qt||(ai.focus(),js=!0,ta=[s.clientX,s.clientY],ea=[s.clientX,s.clientY,s.timeStamp],ai.setPointerCapture(s.pointerId))});ai.addEventListener("pointerup",s=>{js=!1,ta=null,ea&&_i?.enabled&&s.pointerType!=="touch"&&s.pointerType!=="pen"&&(document.pointerLockElement===ai?0:Math.hypot(s.clientX-ea[0],s.clientY-ea[1]))<5&&s.timeStamp-ea[2]<600&&zd(s.clientX,s.clientY),ea=null});ai.addEventListener("pointercancel",()=>{js=!1});document.addEventListener("pointermove",s=>{if(s.pointerType==="touch"||s.pointerType==="pen"||!Qt)return;let e=0,t=0;if(document.pointerLockElement===ai)e=s.movementX,t=s.movementY;else if(js&&ta)e=s.clientX-ta[0],t=s.clientY-ta[1],ta=[s.clientX,s.clientY];else return;ki-=e*.0025,Pn=Math.max(-1.35,Math.min(1.35,Pn-t*.0025)),Yn()});var sM=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"];document.addEventListener("keydown",s=>{if(s.code==="KeyI"&&ji&&!["SELECT","INPUT","BUTTON","TEXTAREA"].includes(document.activeElement?.tagName)&&!st?.game.started){bh(!_i?.enabled),Mi(_i?.enabled?"Identify objects \xB7 click anything to see its name":"Identify objects off");return}if(s.code==="Escape"){if(qs){s.preventDefault(),yh();return}document.pointerLockElement&&document.exitPointerLock(),ra(!0);return}if(!(!Qt||["SELECT","INPUT","BUTTON"].includes(document.activeElement?.tagName))){if(s.code==="KeyF"&&!s.repeat&&!st?.game.started){s.preventDefault(),vh(!ht);return}(sM.includes(s.code)||ht&&["KeyE","KeyQ"].includes(s.code))&&(s.preventDefault(),Pt.add(s.code))}});document.addEventListener("keyup",s=>Pt.delete(s.code));window.addEventListener("blur",()=>{Pt.clear(),js=!1,xh=!1});window.addEventListener("focus",()=>{xh=!0,zo=performance.now()});document.addEventListener("visibilitychange",()=>{Pt.clear(),zo=performance.now()});function Go(){let{width:s,height:e}=Bd();Kn.aspect=s/e,Kn.updateProjectionMatrix(),ia.dpr=devicePixelRatio,hn.setPixelRatio(Math.min(st?.game.started?1.25:1/0,ia.ratio(s,e))),hn.setSize(s,e,!1),ni.resize(s,e)}window.addEventListener("resize",Go);window.visualViewport?.addEventListener("resize",Go);async function rM(){document.body.classList.add("loading"),je=await fetch(ti==="proposed"?new URL("./proposal-navigation.fa39c66a96579f88.json",import.meta.url):ti==="compact"?new URL("./proposal-compact-navigation.abf5e0329b42dc74.json",import.meta.url):new URL("./navigation.8d80a66983989e77.json",import.meta.url)).then(m=>{if(!m.ok)throw Error("Navigation file missing");return m.json()}),tt=new Gs(je),Ws=new ch(Xi,je);let s=!1;try{s=Lm(localStorage)}catch{}if(Ws.setVisible(s),se("street-context").checked=s,ri.streetContext={...Ws.stats,enabled:s},ko=bm(Xi,[{name:"Kitchen daylight bounce",position:[2.15,6.4,1.55],range:4.2,intensity:1.65},{name:"Hall daylight bounce",position:[6.55,2.7,1.6],range:3.4,intensity:1.45},...je.proposalLights??[]],{budget:Ut.enabled?4:6}),ni.info.localBounceLights=ko.info.budget,ni.info.roomFills=ko.info,je.modelUpdatedAt){let m=new Date(je.modelUpdatedAt);se("model-version").textContent="Updated "+new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",timeZone:"Europe/London"}).format(m),se("model-version").title=m.toLocaleString("en-GB",{timeZone:"Europe/London"})+" \xB7 London time"}let e=new Vc().setMeshoptDecoder(dm),t=await new Promise((m,v)=>e.load((ti==="proposed"?new URL("./proposal.fab1930150fbeb62.glb",import.meta.url):ti==="compact"?new URL("./proposal-compact.f928961d6486b145.glb",import.meta.url):new URL("./house.028a9ad346a277e3.glb",import.meta.url)).href,m,g=>{let f=g.total?Math.round(g.loaded/g.total*75):35;se("progress").style.width=f+"%",se("load-status").textContent="Loading model \xB7 "+f+"%"},v));se("load-status").textContent="Preparing the rooms\u2026",se("progress").style.width="85%",await new Promise(m=>setTimeout(m,20)),t.scene.updateMatrixWorld(!0);let i=new Set(je.hiddenObjects),n=fm({cellSize:6,floorHeight:2.8,minMaterialTriangles:2e4,indexVertices:!1}),r=new Map;Ci=new Qc(Xi,je.interactiveDoors);let a=new Set((je.proposalSite?.driveway_bay_bounds_m??[]).map(m=>m.id).filter(m=>je.life?.drive?.[m])),o=new Map;function l(m){let v=m.name;if(r.has(v))return r.get(v);let g=m.clone(),f=je.materials[v]||je.materials[v.replaceAll("_"," ")];return f&&(g.color.setRGB(...f.slice(0,3)),g.opacity=f[3]),g.side=Rt,/Mirror/i.test(v)?(g.transparent=!1,g.opacity=1,g.metalness=1,g.roughness=.06):(g.transparent||g.opacity<1||/Glazing|Glass/i.test(v))&&(g.transparent=!0,g.depthWrite=!1,g.transmission=0,g.roughness=.09,g.metalness=0,g.side=Vi),Ed(g,v),r.set(v,g),g}function c(m){for(let v=m;v;v=v.parent)if(i.has(v.userData.name||v.name))return!0;return!1}t.scene.traverse(m=>{if(!m.isMesh)return;ri.sourceMeshes++;let v=Ci.owner(m);if(!v&&c(m)){ri.hiddenMeshes++;return}let g=m.geometry.clone();g.applyMatrix4(m.matrixWorld),g.attributes.normal||g.computeVertexNormals();for(let b of Object.keys(g.attributes))["position","normal"].includes(b)||g.deleteAttribute(b);let f=Array.isArray(m.material)?m.material[0]:m.material,y=l(f);if(v){Ci.add(v,g,y);return}let M=/^Proposal \| Compact car (\w+)/.exec(m.userData.name||m.name);if(M&&a.has(M[1])){let b=o.get(M[1])??[];b.push({geometry:g,material:y}),o.set(M[1],b);return}n.add(g,y,m.userData.name||m.name)});let h=n.finish({disposeSources:!0});for(let m of h.meshes)Xi.add(m);if(ri.batches+=h.meshes.length,ri.spatial=h.stats,je.approachSurface){let m=new Ni(je.approachSurface.polygon.map(([y,M])=>new re(y,M))),v=new sn(m);v.rotateX(-Math.PI/2),v.translate(0,.012,0);let g=new Kt({color:6448225,roughness:.97,side:Rt});Ed(g,"Tarmac");let f=new Je(v,g);f.name="Gate roadside approach",f.receiveShadow=!0,Xi.add(f),ri.batches++}ri.doorBatches=Ci.finish(),ri.interactiveDoors=Ci.doors.length,ri.batches+=ri.doorBatches;{let m=new Map;for(let[v,g]of o){let f=(je.proposalSite?.cars??[]).find(b=>b.bay===v),y=je.obstacles.find(b=>b.name==="Proposal | Compact car "+v);if(!f||!y)continue;let M=zm(g,y.box,f.heading_radians);M.userData.lifeCar="Proposal | Compact car "+v,Xi.add(M),ri.batches+=M.children.length,m.set(v,{group:M,obstacle:y})}ii=new fh(je,{scene:Xi,doors:Ci,carTemplates:m,mobile:Ut.enabled}),_i=new ph({scene:Xi,camera:Kn,canvas:ai,doors:Ci,life:ii,data:je});for(let[v,{group:g}]of m){let f=ii.cars.find(y=>y.id===v);f?f.apply():g.visible=!0}}ri.geometryBytes=0;let u=new Set;Xi.traverse(m=>{let v=m.geometry;if(!(!v||u.has(v))){u.add(v);for(let g of Object.values(v.attributes))ri.geometryBytes+=g.array.byteLength;v.index&&(ri.geometryBytes+=v.index.array.byteLength)}}),ni.updateShadows();{let m=new ah(je,{scene:Xi,camera:Kn,doors:Ci,mobile:Ut.enabled,isActive:()=>Qt&&!ht&&xh&&!document.hidden,onDeath:tM,onArm:()=>{st.clock.arm(tt.position)&&(ni.setActionMode(!0),hn.setPixelRatio(Math.min(devicePixelRatio,1.25)),Go(),st.game.arm(tt.position),st.game.updateHUD(st.clock))},onReset:()=>{st?.clock.reset(),ni.setActionMode(!1),hn.setPixelRatio(Math.min(devicePixelRatio,Ut.enabled?1.25:1.5)),Go()},toast:Mi});st={clock:new th(je),game:m,pursuit:m.horde}}let d=new Map;se("rooms").replaceChildren();for(let m of je.rooms){if(!d.has(m.group)){let g=document.createElement("optgroup");g.label=m.group,d.set(m.group,g),se("rooms").append(g)}let v=document.createElement("option");v.value=m.id,v.textContent=m.label,d.get(m.group).append(v)}se("rooms").disabled=!1,ji=!0,gh("arrival"),Wm("people")&&Bo("people",!0,{persist:!1});try{localStorage.getItem("ashley-heights-inspect")==="1"&&bh(!0,{persist:!1})}catch{}Wm("cars")&&ii.cars.length&&Bo("cars",!0,{persist:!1});let p=Cm();if(p){let m=Pm(tt,p);tt.position=m.position,ht=p.flying===!0;let v=p.lastWalkingPosition;v&&["x","y","z"].every(g=>Number.isFinite(v[g]))&&(ps=oh(tt,v,ps).position),Ym(),ki=p.yaw,Pn=p.pitch,Ci.snap(tt.position),ni.updateShadows(),Yn(),sa(),m.moved&&Mi("Moved to "+(m.room??"a safe viewpoint")+" for this design."),p.active&&Xs(!1)}{let m=jn(ti),v=lh();se("design-current").textContent=m?Zr[ti].label:"Original",se("design-action").textContent=m?"\u21C4 View original":"\u21C4 View "+Zr[v].label.toLowerCase(),se("design-switch").disabled=!1,se("flight-toggle").disabled=!1,se("design-switch").setAttribute("aria-label",m?"View original house":"View "+Zr[v].label);let g=m?Fo(ti):Fo(v);se("variant-switch").textContent="\u21C4 "+Zr[g].label+(g==="compact"?" (compact)":" (full)"),se("variant-switch").setAttribute("aria-label","View "+Zr[g].label),se("variant-switch").disabled=!1}se("start").disabled=!1,se("drag").disabled=!1,se("settings-toggle").disabled=!1,se("start").textContent=ht?"Start flying":"Start walking",se("load-status").textContent=ti==="proposed"?"Proposal A \xB7 New wing \xB7 Loft \xB7 Pool":ti==="compact"?"Proposal B \xB7 Compact new wing \xB7 Loft \xB7 Pool":"Start at the gates \xB7 Both floors \xB7 Garden",se("progress").style.width="100%",document.body.classList.remove("loading"),window.walkthrough={ready:!0,stats:ri,nav:tt,data:je,doors:Ci,camera:Kn,renderer:hn,lighting:ni.info,touch:Ut,easter:st,life:ii,setLife:Bo,inspector:_i,setInspect:bh,inspectAt:zd,goTo:gh,setFlying:vh,setStreetVisible:Jm,setView(m,v){Ut.reset(),tt.position={x:m[0],y:m[1],z:m[2]},jm(v),Ci.snap(tt.position)&&ni.updateShadows(),Yn(),sa()},getState(){return{...tt.position,yaw:ki,pitch:Pn,active:Qt,flying:ht,room:kd(),streetContext:je.streetContext.enabled,calls:hn.info.render.calls}},startDrag:()=>Xs(!1)}}function $m(s){requestAnimationFrame($m);let e=Math.max(0,(s-zo)/1e3),t=Math.min(e,.04);if(zo=s,ji){let i=Qt&&!document.hidden&&(!st?.game.started||xh);if(i&&ia.sample(e*1e3,s)&&(Go(),ni.info.renderScale=ia.scale),i||ia.reset(),i){let a=Number(Pt.has("KeyW")||Pt.has("ArrowUp"))-Number(Pt.has("KeyS")||Pt.has("ArrowDown"))+Ut.axes.forward,o=Number(Pt.has("KeyD")||Pt.has("ArrowRight"))-Number(Pt.has("KeyA")||Pt.has("ArrowLeft"))+Ut.axes.right;if(ht){let l=Number(Pt.has("KeyE"))-Number(Pt.has("KeyQ"))+[...mh.values()].reduce((c,h)=>c+h,0);tt.position=Ld(je,tt.position,{forward:a,right:o,vertical:l,yaw:ki,pitch:Pn,fast:Pt.has("ShiftLeft")||Pt.has("ShiftRight")||Ut.sprinting,dt:t})}else{let l=Math.max(1,Math.hypot(a,o)),c=(Pt.has("ShiftLeft")||Pt.has("ShiftRight")||Ut.sprinting?3.2:st?.game.started?2.15:1.65)*t/l,h=(-Math.sin(ki)*a+Math.cos(ki)*o)*c,u=(Math.cos(ki)*a+Math.sin(ki)*o)*c;for(let[d,p]of[[h,0],[0,u]]){let m={...tt.position};tt.move(d,p),st?.game.horde.blocks(tt.position,tt.radius)&&(tt.position=m)}}Yn()}st&&(st.clock.advance(e,i&&!ht,tt.position)&&st.game.startWave(tt.position),i&&!ht&&st.clock.phase!=="caught"?(st.game.step(t,tt.position,st.clock),st.clock.phase==="chasing"&&s-Hm>120&&(ni.updateShadows(),Hm=s)):st.game.cancelFire());let n=ii&&!document.hidden&&ii.step(t,tt.position),r=[...st?.clock.phase==="chasing"?st.pursuit.positions:[],...n?ii.visitorPositions:[]];Ci.update(tt.position,t,!1,r)?ni.updateShadows():n&&s-Vm>(Ut.enabled?350:200)&&(ni.updateShadows(),Vm=s),s-Gm>160&&(sa(),st?.clock.phase==="chasing"&&(se("chase-time").textContent=(i?"Keep moving":"Paused")+" \xB7 "+eM(st.clock.survived)),Gm=s)}ko&&ko.update(Kn,s),ni.render()}rM().catch(s=>{console.error(s),se("start").textContent="Try again",se("start").disabled=!1,se("start").onclick=()=>location.reload(),se("load-status").textContent="The house could not load. Check your connection and try again.",se("progress").style.width="0"});requestAnimationFrame($m);
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
