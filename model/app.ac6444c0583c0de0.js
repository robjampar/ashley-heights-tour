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
var Uf=0,ou=1,Of=2;var Ps=1,kf=2,Cr=3,zi=0,ii=1,Dt=2,zt=0,Pr=1,lu=2,cu=3,hu=4,Xl=5;var Gi=100,Bf=101,zf=102,Gf=103,Hf=104,Is=200,Vf=201,Wf=202,qf=203,uu=204,du=205,$a=206,Xf=207,Qa=208,jf=209,Kf=210,Yf=211,Jf=212,Zf=213,$f=214,bl=0,xl=1,vl=2,cr=3,_l=4,yl=5,Ml=6,Sl=7,fu=0,Qf=1,ep=2,Qi=0,eo=1,to=2,io=3,no=4,so=5,Ds=6,ro=7,qh="attached",tp="detached",pu=300,rs=301,Ls=302,jl=303,Kl=304,ao=306,xi=1e3,ki=1001,hr=1002,Pt=1003,Yl=1004;var Fs=1005;var Ot=1006,Ir=1007;var en=1008;var hi=1009,mu=1010,gu=1011,Dr=1012,Jl=1013,tn=1014,Ii=1015,jt=1016,Zl=1017,$l=1018,as=1020,bu=35902,xu=35899,vu=1021,_u=1022,bi=1023,fn=1026,Mn=1027,Ql=1028,ec=1029,os=1030,tc=1031;var ic=1033,oo=33776,lo=33777,co=33778,ho=33779,nc=35840,sc=35841,rc=35842,ac=35843,oc=36196,lc=37492,cc=37496,hc=37488,uc=37489,uo=37490,dc=37491,fc=37808,pc=37809,mc=37810,gc=37811,bc=37812,xc=37813,vc=37814,_c=37815,yc=37816,Mc=37817,Sc=37818,wc=37819,Ec=37820,Tc=37821,Ac=36492,Rc=36494,Cc=36495,Pc=36283,Ic=36284,fo=36285,Dc=36286;var _s=2300,ys=2301,pl=2302,Xh=2303,jh=2400,Kh=2401,Yh=2402,ip=2500;var yu=0,po=1,Lr=2,np=3200;var mo=0,sp=1,Wn="",Ut="srgb",pi="srgb-linear",ga="linear",mt="srgb";var ml=7680;var rp=519,ap=512,op=513,lp=514,Lc=515,cp=516,hp=517,Fc=518,up=519,Mu=35044;var Su="300 es",Yi=2e3,ur=2001;function eg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function tg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function dr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function dp(){let s=dr("canvas");return s.style.display="block",s}var Wd={},fr=null;function ba(...s){let e="THREE."+s.shift();fr?fr("log",e,...s):console.log(e,...s)}function fp(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Le(...s){s=fp(s);let e="THREE."+s.shift();if(fr)fr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ve(...s){s=fp(s);let e="THREE."+s.shift();if(fr)fr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function vs(...s){let e=s.join(" ");e in Wd||(Wd[e]=!0,Le(...s))}function pp(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var mp={[bl]:xl,[vl]:Ml,[_l]:Sl,[cr]:yl,[xl]:bl,[Ml]:vl,[Sl]:_l,[yl]:cr},pn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let n=i[e];if(n!==void 0){let r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}},oi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qd=1234567,da=Math.PI/180,Ms=180/Math.PI;function Bi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(oi[s&255]+oi[s>>8&255]+oi[s>>16&255]+oi[s>>24&255]+"-"+oi[e&255]+oi[e>>8&255]+"-"+oi[e>>16&15|64]+oi[e>>24&255]+"-"+oi[t&63|128]+oi[t>>8&255]+"-"+oi[t>>16&255]+oi[t>>24&255]+oi[i&255]+oi[i>>8&255]+oi[i>>16&255]+oi[i>>24&255]).toLowerCase()}function it(s,e,t){return Math.max(e,Math.min(t,s))}function wu(s,e){return(s%e+e)%e}function ig(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function ng(s,e,t){return s!==e?(t-s)/(e-s):0}function fa(s,e,t){return(1-t)*s+t*e}function sg(s,e,t,i){return fa(s,e,1-Math.exp(-t*i))}function rg(s,e=1){return e-Math.abs(wu(s,e*2)-e)}function ag(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function og(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function lg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function cg(s,e){return s+Math.random()*(e-s)}function hg(s){return s*(.5-Math.random())}function ug(s){s!==void 0&&(qd=s);let e=qd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dg(s){return s*da}function fg(s){return s*Ms}function pg(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function mg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function gg(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function bg(s,e,t,i,n){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),p=a((i-e)/2);switch(n){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Le("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Ki(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ns={DEG2RAD:da,RAD2DEG:Ms,generateUUID:Bi,clamp:it,euclideanModulo:wu,mapLinear:ig,inverseLerp:ng,lerp:fa,damp:sg,pingpong:rg,smoothstep:ag,smootherstep:og,randInt:lg,randFloat:cg,randFloatSpread:hg,seededRandom:ug,degToRad:dg,radToDeg:fg,isPowerOfTwo:pg,ceilPowerOfTwo:mg,floorPowerOfTwo:gg,setQuaternionFromProperEuler:bg,normalize:vt,denormalize:Ki},ne=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ai=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3],d=r[a+0],f=r[a+1],p=r[a+2],x=r[a+3];if(u!==x||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*x;m<0&&(d=-d,f=-f,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){let _=Math.acos(m),M=Math.sin(_);g=Math.sin(g*_)/M,o=Math.sin(o*_)/M,l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+x*o}else{l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+x*o;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),d=l(i/2),f=l(n/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>u){let f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xh.copy(this).projectOnVector(e),this.sub(xh)}reflect(e){return this.sub(xh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xh=new I,Xd=new Ai,Ke=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],p=i[8],x=n[0],m=n[3],g=n[6],_=n[1],M=n[4],b=n[7],y=n[2],S=n[5],R=n[8];return r[0]=a*x+o*_+l*y,r[3]=a*m+o*M+l*S,r[6]=a*g+o*b+l*R,r[1]=c*x+h*_+u*y,r[4]=c*m+h*M+u*S,r[7]=c*g+h*b+u*R,r[2]=d*x+f*_+p*y,r[5]=d*m+f*M+p*S,r[8]=d*g+f*b+p*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=t*u+i*d+n*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=u*x,e[1]=(n*c-h*i)*x,e[2]=(o*i-n*a)*x,e[3]=d*x,e[4]=(h*t-n*l)*x,e[5]=(n*r-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return vs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vh.makeScale(e,t)),this}rotate(e){return vs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vh.makeRotation(-e)),this}translate(e,t){return vs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vh=new Ke,jd=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kd=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xg(){let s={enabled:!0,workingColorSpace:pi,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(n.r=Un(n.r),n.g=Un(n.g),n.b=Un(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(n.r=lr(n.r),n.g=lr(n.g),n.b=lr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Wn?ga:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[pi]:{primaries:e,whitePoint:i,transfer:ga,toXYZ:jd,fromXYZ:Kd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ut},outputColorSpaceConfig:{drawingBufferColorSpace:Ut}},[Ut]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:jd,fromXYZ:Kd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ut}}}),s}var $e=xg();function Un(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function lr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ks,wl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ks===void 0&&(Ks=dr("canvas")),Ks.width=e.width,Ks.height=e.height;let n=Ks.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Ks}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=dr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Un(t[i]/255)*255):t[i]=Un(t[i]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},vg=0,pr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(_h(n[a].image)):r.push(_h(n[a]))}else r=_h(n);i.url=r}return t||(e.images[this.uuid]=i),i}};function _h(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}var _g=0,yh=new I,Qt=class s extends pn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,i=ki,n=ki,r=Ot,a=en,o=bi,l=hi,c=s.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Bi(),this.name="",this.source=new pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yh).x}get height(){return this.source.getSize(yh).y}get depth(){return this.source.getSize(yh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xi:e.x=e.x-Math.floor(e.x);break;case ki:e.x=e.x<0?0:1;break;case hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xi:e.y=e.y-Math.floor(e.y);break;case ki:e.y=e.y<0?0:1;break;case hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=pu;Qt.DEFAULT_ANISOTROPY=1;var _t=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,b=(f+1)/2,y=(g+1)/2,S=(h+d)/4,R=(u+x)/4,v=(p+m)/4;return M>b&&M>y?M<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(M),n=S/i,r=R/i):b>y?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=S/n,r=v/n):y<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(y),i=R/r,n=v/r),this.set(i,n,r,t),this}let _=Math.sqrt((m-p)*(m-p)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(u-x)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},El=class extends pn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];let n={width:e,height:t,depth:i.depth},r=new Qt(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new pr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},kt=class extends El{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},xa=class extends Qt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Tl=class extends Qt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ue=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,i,n,r,a,o,l,c,h,u,d,f,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,h,u,d,f,p,x,m)}set(e,t,i,n,r,a,o,l,c,h,u,d,f,p,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=n,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,n=1/Ys.setFromMatrixColumn(e,0).length(),r=1/Ys.setFromMatrixColumn(e,1).length(),a=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d+x*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-x*u}else if(e.order==="XZY"){let d=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yg,e,Mg)}lookAt(e,t,i){let n=this.elements;return Ei.subVectors(e,t),Ei.lengthSq()===0&&(Ei.z=1),Ei.normalize(),Yn.crossVectors(i,Ei),Yn.lengthSq()===0&&(Math.abs(i.z)===1?Ei.x+=1e-4:Ei.z+=1e-4,Ei.normalize(),Yn.crossVectors(i,Ei)),Yn.normalize(),Go.crossVectors(Ei,Yn),n[0]=Yn.x,n[4]=Go.x,n[8]=Ei.x,n[1]=Yn.y,n[5]=Go.y,n[9]=Ei.y,n[2]=Yn.z,n[6]=Go.z,n[10]=Ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],p=i[2],x=i[6],m=i[10],g=i[14],_=i[3],M=i[7],b=i[11],y=i[15],S=n[0],R=n[4],v=n[8],E=n[12],T=n[1],C=n[5],D=n[9],F=n[13],L=n[2],U=n[6],H=n[10],B=n[14],K=n[3],G=n[7],j=n[11],$=n[15];return r[0]=a*S+o*T+l*L+c*K,r[4]=a*R+o*C+l*U+c*G,r[8]=a*v+o*D+l*H+c*j,r[12]=a*E+o*F+l*B+c*$,r[1]=h*S+u*T+d*L+f*K,r[5]=h*R+u*C+d*U+f*G,r[9]=h*v+u*D+d*H+f*j,r[13]=h*E+u*F+d*B+f*$,r[2]=p*S+x*T+m*L+g*K,r[6]=p*R+x*C+m*U+g*G,r[10]=p*v+x*D+m*H+g*j,r[14]=p*E+x*F+m*B+g*$,r[3]=_*S+M*T+b*L+y*K,r[7]=_*R+M*C+b*U+y*G,r[11]=_*v+M*D+b*H+y*j,r[15]=_*E+M*F+b*B+y*$,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],x=e[7],m=e[11],g=e[15],_=l*f-c*d,M=o*f-c*u,b=o*d-l*u,y=a*f-c*h,S=a*d-l*h,R=a*u-o*h;return t*(x*_-m*M+g*b)-i*(p*_-m*y+g*S)+n*(p*M-x*y+g*R)-r*(p*b-x*S+m*R)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],x=e[13],m=e[14],g=e[15],_=t*o-i*a,M=t*l-n*a,b=t*c-r*a,y=i*l-n*o,S=i*c-r*o,R=n*c-r*l,v=h*x-u*p,E=h*m-d*p,T=h*g-f*p,C=u*m-d*x,D=u*g-f*x,F=d*g-f*m,L=_*F-M*D+b*C+y*T-S*E+R*v;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/L;return e[0]=(o*F-l*D+c*C)*U,e[1]=(n*D-i*F-r*C)*U,e[2]=(x*R-m*S+g*y)*U,e[3]=(d*S-u*R-f*y)*U,e[4]=(l*T-a*F-c*E)*U,e[5]=(t*F-n*T+r*E)*U,e[6]=(m*b-p*R-g*M)*U,e[7]=(h*R-d*b+f*M)*U,e[8]=(a*D-o*T+c*v)*U,e[9]=(i*T-t*D-r*v)*U,e[10]=(p*S-x*b+g*_)*U,e[11]=(u*b-h*S-f*_)*U,e[12]=(o*E-a*C-l*v)*U,e[13]=(t*C-i*E+n*v)*U,e[14]=(x*M-p*y-m*_)*U,e[15]=(h*y-u*M+d*_)*U,this}scale(e){let t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,x=a*h,m=a*u,g=o*u,_=l*c,M=l*h,b=l*u,y=i.x,S=i.y,R=i.z;return n[0]=(1-(x+g))*y,n[1]=(f+b)*y,n[2]=(p-M)*y,n[3]=0,n[4]=(f-b)*S,n[5]=(1-(d+g))*S,n[6]=(m+_)*S,n[7]=0,n[8]=(p+M)*R,n[9]=(m-_)*R,n[10]=(1-(d+x))*R,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Ys.set(n[0],n[1],n[2]).length(),o=Ys.set(n[4],n[5],n[6]).length(),l=Ys.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Wi.copy(this);let c=1/a,h=1/o,u=1/l;return Wi.elements[0]*=c,Wi.elements[1]*=c,Wi.elements[2]*=c,Wi.elements[4]*=h,Wi.elements[5]*=h,Wi.elements[6]*=h,Wi.elements[8]*=u,Wi.elements[9]*=u,Wi.elements[10]*=u,t.setFromRotationMatrix(Wi),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,n,r,a,o=Yi,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(i-n),d=(t+e)/(t-e),f=(i+n)/(i-n),p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===Yi)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ur)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=Yi,l=!1){let c=this.elements,h=2/(t-e),u=2/(i-n),d=-(t+e)/(t-e),f=-(i+n)/(i-n),p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===Yi)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===ur)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Ys=new I,Wi=new Ue,yg=new I(0,0,0),Mg=new I(1,1,1),Yn=new I,Go=new I,Ei=new I,Yd=new Ue,Jd=new Ai,Ji=class s{constructor(e=0,t=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Yd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jd.setFromEuler(this),this.setFromQuaternion(Jd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ji.DEFAULT_ORDER="XYZ";var mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Sg=0,Zd=new I,Js=new Ai,Pn=new Ue,Ho=new I,na=new I,wg=new I,Eg=new Ai,$d=new I(1,0,0),Qd=new I(0,1,0),ef=new I(0,0,1),tf={type:"added"},Tg={type:"removed"},Zs={type:"childadded",child:null},Mh={type:"childremoved",child:null},wt=class s extends pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sg++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new I,t=new Ji,i=new Ai,n=new I(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Ke}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.multiply(Js),this}rotateOnWorldAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.premultiply(Js),this}rotateX(e){return this.rotateOnAxis($d,e)}rotateY(e){return this.rotateOnAxis(Qd,e)}rotateZ(e){return this.rotateOnAxis(ef,e)}translateOnAxis(e,t){return Zd.copy(e).applyQuaternion(this.quaternion),this.position.add(Zd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($d,e)}translateY(e){return this.translateOnAxis(Qd,e)}translateZ(e){return this.translateOnAxis(ef,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ho.copy(e):Ho.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(na,Ho,this.up):Pn.lookAt(Ho,na,this.up),this.quaternion.setFromRotationMatrix(Pn),n&&(Pn.extractRotation(n.matrixWorld),Js.setFromRotationMatrix(Pn),this.quaternion.premultiply(Js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tf),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tg),Mh.child=e,this.dispatchEvent(Mh),Mh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tf),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,wg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,Eg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};wt.DEFAULT_UP=new I(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var at=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ag={type:"move"},gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new at,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new at,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new at,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ag)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new at;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},gp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Vo={h:0,s:0,l:0};function Sh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Be=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=wu(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Sh(a,r,e+1/3),this.g=Sh(a,r,e),this.b=Sh(a,r,e-1/3)}return $e.colorSpaceToWorking(this,n),this}setStyle(e,t=Ut){function i(r){r!==void 0&&parseFloat(r)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ut){let i=gp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Un(e.r),this.g=Un(e.g),this.b=Un(e.b),this}copyLinearToSRGB(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ut){return $e.workingToColorSpace(li.copy(this),e),Math.round(it(li.r*255,0,255))*65536+Math.round(it(li.g*255,0,255))*256+Math.round(it(li.b*255,0,255))}getHexString(e=Ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(li.copy(this),t);let i=li.r,n=li.g,r=li.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(li.copy(this),t),e.r=li.r,e.g=li.g,e.b=li.b,e}getStyle(e=Ut){$e.workingToColorSpace(li.copy(this),e);let t=li.r,i=li.g,n=li.b;return e!==Ut?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(Vo);let i=fa(Jn.h,Vo.h,t),n=fa(Jn.s,Vo.s,t),r=fa(Jn.l,Vo.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},li=new Be;Be.NAMES=gp;var Ss=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ji,this.environmentIntensity=1,this.environmentRotation=new Ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},qi=new I,In=new I,wh=new I,Dn=new I,$s=new I,Qs=new I,nf=new I,Eh=new I,Th=new I,Ah=new I,Rh=new _t,Ch=new _t,Ph=new _t,ts=class s{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),qi.subVectors(e,t),n.cross(qi);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){qi.subVectors(n,t),In.subVectors(i,t),wh.subVectors(e,t);let a=qi.dot(qi),o=qi.dot(In),l=qi.dot(wh),c=In.dot(In),h=In.dot(wh),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(e,t,i,n,r,a){return Rh.setScalar(0),Ch.setScalar(0),Ph.setScalar(0),Rh.fromBufferAttribute(e,t),Ch.fromBufferAttribute(e,i),Ph.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(Rh,r.x),a.addScaledVector(Ch,r.y),a.addScaledVector(Ph,r.z),a}static isFrontFacing(e,t,i,n){return qi.subVectors(i,t),In.subVectors(e,t),qi.cross(In).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qi.subVectors(this.c,this.b),In.subVectors(this.a,this.b),qi.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return s.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,r=this.c,a,o;$s.subVectors(n,i),Qs.subVectors(r,i),Eh.subVectors(e,i);let l=$s.dot(Eh),c=Qs.dot(Eh);if(l<=0&&c<=0)return t.copy(i);Th.subVectors(e,n);let h=$s.dot(Th),u=Qs.dot(Th);if(h>=0&&u<=h)return t.copy(n);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector($s,a);Ah.subVectors(e,r);let f=$s.dot(Ah),p=Qs.dot(Ah);if(p>=0&&f<=p)return t.copy(r);let x=f*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(Qs,o);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return nf.subVectors(r,n),o=(u-h)/(u-h+(f-p)),t.copy(n).addScaledVector(nf,o);let g=1/(m+x+d);return a=x*g,o=d*g,t.copy(i).addScaledVector($s,a).addScaledVector(Qs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Bt=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xi):Xi.fromBufferAttribute(r,a),Xi.applyMatrix4(e.matrixWorld),this.expandByPoint(Xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wo.copy(i.boundingBox)),Wo.applyMatrix4(e.matrixWorld),this.union(Wo)}let n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xi),Xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sa),qo.subVectors(this.max,sa),er.subVectors(e.a,sa),tr.subVectors(e.b,sa),ir.subVectors(e.c,sa),Zn.subVectors(tr,er),$n.subVectors(ir,tr),ms.subVectors(er,ir);let t=[0,-Zn.z,Zn.y,0,-$n.z,$n.y,0,-ms.z,ms.y,Zn.z,0,-Zn.x,$n.z,0,-$n.x,ms.z,0,-ms.x,-Zn.y,Zn.x,0,-$n.y,$n.x,0,-ms.y,ms.x,0];return!Ih(t,er,tr,ir,qo)||(t=[1,0,0,0,1,0,0,0,1],!Ih(t,er,tr,ir,qo))?!1:(Xo.crossVectors(Zn,$n),t=[Xo.x,Xo.y,Xo.z],Ih(t,er,tr,ir,qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ln=[new I,new I,new I,new I,new I,new I,new I,new I],Xi=new I,Wo=new Bt,er=new I,tr=new I,ir=new I,Zn=new I,$n=new I,ms=new I,sa=new I,qo=new I,Xo=new I,gs=new I;function Ih(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){gs.fromArray(s,r);let o=n.x*Math.abs(gs.x)+n.y*Math.abs(gs.y)+n.z*Math.abs(gs.z),l=e.dot(gs),c=t.dot(gs),h=i.dot(gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Wt=new I,jo=new ne,Rg=0,Rt=class extends pn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Mu,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)jo.fromBufferAttribute(this,t),jo.applyMatrix3(e),this.setXY(t,jo.x,jo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var va=class extends Rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var _a=class extends Rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var je=class extends Rt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Cg=new Bt,ra=new I,Dh=new I,ci=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Cg.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ra.subVectors(e,this.center);let t=ra.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(ra,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ra.copy(e.center).add(Dh)),this.expandByPoint(ra.copy(e.center).sub(Dh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Pg=0,Oi=new Ue,Lh=new wt,nr=new I,Ti=new Bt,aa=new Bt,$t=new I,ot=class s extends pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(eg(e)?_a:va)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Oi.makeRotationFromQuaternion(e),this.applyMatrix4(Oi),this}rotateX(e){return Oi.makeRotationX(e),this.applyMatrix4(Oi),this}rotateY(e){return Oi.makeRotationY(e),this.applyMatrix4(Oi),this}rotateZ(e){return Oi.makeRotationZ(e),this.applyMatrix4(Oi),this}translate(e,t,i){return Oi.makeTranslation(e,t,i),this.applyMatrix4(Oi),this}scale(e,t,i){return Oi.makeScale(e,t,i),this.applyMatrix4(Oi),this}lookAt(e){return Lh.lookAt(e),Lh.updateMatrix(),this.applyMatrix4(Lh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,r=e.length;n<r;n++){let a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(i,3))}else{let i=Math.min(e.length,t.count);for(let n=0;n<i;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let r=t[i];Ti.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Ti.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Ti.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Ti.min),this.boundingBox.expandByPoint(Ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let i=this.boundingSphere.center;if(Ti.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];aa.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(Ti.min,aa.min),Ti.expandByPoint($t),$t.addVectors(Ti.max,aa.max),Ti.expandByPoint($t)):(Ti.expandByPoint(aa.min),Ti.expandByPoint(aa.max))}Ti.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$t.fromBufferAttribute(o,c),l&&(nr.fromBufferAttribute(e,c),$t.add(nr)),n=Math.max(n,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,n=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Rt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new I,l[v]=new I;let c=new I,h=new I,u=new I,d=new ne,f=new ne,p=new ne,x=new I,m=new I;function g(v,E,T){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,T),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,E),p.fromBufferAttribute(r,T),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),o[v].add(x),o[E].add(x),o[T].add(x),l[v].add(m),l[E].add(m),l[T].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let v=0,E=_.length;v<E;++v){let T=_[v],C=T.start,D=T.count;for(let F=C,L=C+D;F<L;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let M=new I,b=new I,y=new I,S=new I;function R(v){y.fromBufferAttribute(n,v),S.copy(y);let E=o[v];M.copy(E),M.sub(y.multiplyScalar(y.dot(E))).normalize(),b.crossVectors(S,E);let C=b.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,C)}for(let v=0,E=_.length;v<E;++v){let T=_[v],C=T.start,D=T.count;for(let F=C,L=C+D;F<L;F+=3)R(e.getX(F+0)),R(e.getX(F+1)),R(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let n=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new Rt(d,h,u)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let n=e.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},br=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Mu,this.updateRanges=[],this.version=0,this.uuid=Bi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},fi=new I,xr=class s{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)fi.fromBufferAttribute(this,t),fi.applyMatrix4(e),this.setXYZ(t,fi.x,fi.y,fi.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)fi.fromBufferAttribute(this,t),fi.applyNormalMatrix(e),this.setXYZ(t,fi.x,fi.y,fi.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)fi.fromBufferAttribute(this,t),fi.transformDirection(e),this.setXYZ(t,fi.x,fi.y,fi.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ki(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ki(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ki(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ki(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ba("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ba("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Fh=new I,Ig=new I,Dg=new Ke,ji=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=Fh.subVectors(i,t).cross(Ig.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let n=e.delta(Fh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Dg.getNormalMatrix(e),n=this.coplanarPoint(Fh).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Lg=0,mi=class extends pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=Pr,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uu,this.blendDst=du,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ml,this.stencilZFail=ml,this.stencilZPass=ml,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ji().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ne().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Fn=new I,Nh=new I,Ko=new I,Yo=new I,is=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Nh.copy(e).add(t).multiplyScalar(.5),Ko.copy(t).sub(e).normalize(),Yo.copy(this.origin).sub(Nh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ko),o=Yo.dot(this.direction),l=-Yo.dot(Ko),c=Yo.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Nh).addScaledVector(Ko,d),f}intersectSphere(e,t){if(e.radius<0)return null;Fn.subVectors(e.center,this.origin);let i=Fn.dot(this.direction),n=Fn.dot(Fn)-i*i,r=e.radius*e.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,x=t.y-a.y,m=t.z-a.z,g=i.x-a.x,_=i.y-a.y,M=i.z-a.z,b=Math.abs(l),y=Math.abs(c),S=Math.abs(h),R,v,E,T,C,D,F,L,U,H,B,K;if(b>=y&&b>=S?(E=l,D=u,U=p,K=g,l>=0?(R=c,v=h,T=d,C=f,F=x,L=m,H=_,B=M):(R=h,v=c,T=f,C=d,F=m,L=x,H=M,B=_)):y>=S?(E=c,D=d,U=x,K=_,c>=0?(R=h,v=l,T=f,C=u,F=m,L=p,H=M,B=g):(R=l,v=h,T=u,C=f,F=p,L=m,H=g,B=M)):(E=h,D=f,U=m,K=M,h>=0?(R=l,v=c,T=u,C=d,F=p,L=x,H=g,B=_):(R=c,v=l,T=d,C=u,F=x,L=p,H=_,B=g)),E===0)return null;let G=R/E,j=v/E,$=1/E,ye=T-G*D,xe=C-j*D,ct=F-G*U,Je=L-j*U,nt=H-G*K,Y=B-j*K,Q=nt*Je-Y*ct,ue=ye*Y-xe*nt,Fe=ct*xe-Je*ye;if(n){if(Q<0||ue<0||Fe<0)return null}else if((Q<0||ue<0||Fe<0)&&(Q>0||ue>0||Fe>0))return null;let Se=Q+ue+Fe;if(Se===0)return null;let Ge=$*(Q*D+ue*U+Fe*K);return(Se>0?Ge<0:Ge>0)?null:this.at(Ge/Se,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ri=class extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.combine=fu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},sf=new Ue,bs=new is,Jo=new ci,rf=new I,Zo=new I,$o=new I,Qo=new I,Uh=new I,el=new I,af=new I,tl=new I,Ye=class extends wt{constructor(e=new ot,t=new Ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let o=this.morphTargetInfluences;if(r&&o){el.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Uh.fromBufferAttribute(u,e),a?el.addScaledVector(Uh,h):el.addScaledVector(Uh.sub(t),h))}t.add(el)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(r),bs.copy(e.ray).recast(e.near),!(Jo.containsPoint(bs.origin)===!1&&(bs.intersectSphere(Jo,rf)===null||bs.origin.distanceToSquared(rf)>(e.far-e.near)**2))&&(sf.copy(r).invert(),bs.copy(e.ray).applyMatrix4(sf),!(i.boundingBox!==null&&bs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=a[m.materialIndex],_=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=_,y=M;b<y;b+=3){let S=o.getX(b),R=o.getX(b+1),v=o.getX(b+2);n=il(this,g,e,i,c,h,u,S,R,v),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{let p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let _=o.getX(m),M=o.getX(m+1),b=o.getX(m+2);n=il(this,a,e,i,c,h,u,_,M,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=a[m.materialIndex],_=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=_,y=M;b<y;b+=3){let S=b,R=b+1,v=b+2;n=il(this,g,e,i,c,h,u,S,R,v),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{let p=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let _=m,M=m+1,b=m+2;n=il(this,a,e,i,c,h,u,_,M,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}};function Fg(s,e,t,i,n,r,a,o){let l;if(e.side===ii?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===zi,o),l===null)return null;tl.copy(o),tl.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(tl);return c<t.near||c>t.far?null:{distance:c,point:tl.clone(),object:s}}function il(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,Zo),s.getVertexPosition(l,$o),s.getVertexPosition(c,Qo);let h=Fg(s,e,t,i,Zo,$o,Qo,af);if(h){let u=new I;ts.getBarycoord(af,Zo,$o,Qo,u),n&&(h.uv=ts.getInterpolatedAttribute(n,o,l,c,u,new ne)),r&&(h.uv1=ts.getInterpolatedAttribute(r,o,l,c,u,new ne)),a&&(h.normal=ts.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};ts.getNormal(Zo,$o,Qo,d.normal),h.face=d,h.barycoord=u}return h}var oa=new _t,of=new _t,lf=new _t,Ng=new _t,cf=new Ue,nl=new I,Oh=new ci,hf=new Ue,kh=new is,ya=class extends Ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=qh,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Bt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,nl),this.boundingBox.expandByPoint(nl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ci),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,nl),this.boundingSphere.expandByPoint(nl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Oh.copy(this.boundingSphere),Oh.applyMatrix4(n),e.ray.intersectsSphere(Oh)!==!1&&(hf.copy(n).invert(),kh.copy(e.ray).applyMatrix4(hf),!(this.boundingBox!==null&&kh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,kh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new _t,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===qh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===tp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Le("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,n=this.geometry;of.fromBufferAttribute(n.attributes.skinIndex,e),lf.fromBufferAttribute(n.attributes.skinWeight,e),t.isVector4?(oa.copy(t),t.set(0,0,0,0)):(oa.set(...t,1),t.set(0,0,0)),oa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=lf.getComponent(r);if(a!==0){let o=of.getComponent(r);cf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Ng.copy(oa).applyMatrix4(cf),a)}}return t.isVector4&&(t.w=oa.w),t.applyMatrix4(this.bindMatrixInverse)}},vr=class extends wt{constructor(){super(),this.isBone=!0,this.type="Bone"}},mn=class extends Qt{constructor(e=null,t=1,i=1,n,r,a,o,l,c=Pt,h=Pt,u,d){super(null,a,o,l,c,h,n,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},uf=new Ue,Ug=new Ue,Ma=class s{constructor(e=[],t=[]){this.uuid=Bi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Le("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new Ue;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Ug;uf.multiplyMatrices(o,t[r]),uf.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new mn(t,e,e,bi,Ii);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){let r=e.bones[i],a=t[r];a===void 0&&(Le("Skeleton: No bone found with UUID:",r),a=new vr),this.bones.push(a),this.boneInverses.push(new Ue().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let n=0,r=t.length;n<r;n++){let a=t[n];e.bones.push(a.uuid);let o=i[n];e.boneInverses.push(o.toArray())}return e}},On=class extends Rt{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},sr=new Ue,df=new Ue,sl=[],ff=new Bt,Og=new Ue,la=new Ye,ca=new ci,Sa=class extends Ye{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new On(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Og)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),ff.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(ff)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),ca.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(ca)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(e,t){let i=this.matrixWorld,n=this.count;if(la.geometry=this.geometry,la.material=this.material,la.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ca.copy(this.boundingSphere),ca.applyMatrix4(i),e.ray.intersectsSphere(ca)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,sr),df.multiplyMatrices(i,sr),la.matrixWorld=df,la.raycast(e,sl);for(let a=0,o=sl.length;a<o;a++){let l=sl[a];l.instanceId=r,l.object=this,t.push(l)}sl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new On(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new mn(new Float32Array(n*this.count),n,this.count,Ql,Ii));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},xs=new ci,kg=new ne(.5,.5),rl=new I,gn=class{constructor(e=new ji,t=new ji,i=new ji,n=new ji,r=new ji,a=new ji){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Yi,i=!1){let n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],x=r[9],m=r[10],g=r[11],_=r[12],M=r[13],b=r[14],y=r[15];if(n[0].setComponents(c-a,f-h,g-p,y-_).normalize(),n[1].setComponents(c+a,f+h,g+p,y+_).normalize(),n[2].setComponents(c+o,f+u,g+x,y+M).normalize(),n[3].setComponents(c-o,f-u,g-x,y-M).normalize(),i)n[4].setComponents(l,d,m,b).normalize(),n[5].setComponents(c-l,f-d,g-m,y-b).normalize();else if(n[4].setComponents(c-l,f-d,g-m,y-b).normalize(),t===Yi)n[5].setComponents(c+l,f+d,g+m,y+b).normalize();else if(t===ur)n[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xs)}intersectsSprite(e){xs.center.set(0,0,0);let t=kg.distanceTo(e.center);return xs.radius=.7071067811865476+t,xs.applyMatrix4(e.matrixWorld),this.intersectsSphere(xs)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(rl.x=n.normal.x>0?e.max.x:e.min.x,rl.y=n.normal.y>0?e.max.y:e.min.y,rl.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(rl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var bn=class extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Al=new I,Rl=new I,pf=new Ue,ha=new is,al=new ci,Bh=new I,mf=new I,Zi=class extends wt{constructor(e=new ot,t=new bn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Al.fromBufferAttribute(t,n-1),Rl.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Al.distanceTo(Rl);e.setAttribute("lineDistance",new je(i,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),al.copy(i.boundingSphere),al.applyMatrix4(n),al.radius+=r,e.ray.intersectsSphere(al)===!1)return;pf.copy(n).invert(),ha.copy(e.ray).applyMatrix4(pf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=f,m=p-1;x<m;x+=c){let g=h.getX(x),_=h.getX(x+1),M=ol(this,e,ha,l,g,_,x);M&&t.push(M)}if(this.isLineLoop){let x=h.getX(p-1),m=h.getX(f),g=ol(this,e,ha,l,x,m,p-1);g&&t.push(g)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=f,m=p-1;x<m;x+=c){let g=ol(this,e,ha,l,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=ol(this,e,ha,l,p-1,f,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ol(s,e,t,i,n,r,a){let o=s.geometry.attributes.position;if(Al.fromBufferAttribute(o,n),Rl.fromBufferAttribute(o,r),t.distanceSqToSegment(Al,Rl,Bh,mf)>i)return;Bh.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Bh);if(!(c<e.near||c>e.far))return{distance:c,point:mf.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var gf=new I,bf=new I,wa=class extends Zi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)gf.fromBufferAttribute(t,n),bf.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+gf.distanceTo(bf);e.setAttribute("lineDistance",new je(i,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ea=class extends Zi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},_r=class extends mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xf=new Ue,Jh=new is,ll=new ci,cl=new I,Ta=class extends wt{constructor(e=new ot,t=new _r){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ll.copy(i.boundingSphere),ll.applyMatrix4(n),ll.radius+=r,e.ray.intersectsSphere(ll)===!1)return;xf.copy(n).invert(),Jh.copy(e.ray).applyMatrix4(xf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,x=f;p<x;p++){let m=c.getX(p);cl.fromBufferAttribute(u,m),vf(cl,m,l,n,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,x=f;p<x;p++)cl.fromBufferAttribute(u,p),vf(cl,p,l,n,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function vf(s,e,t,i,n,r,a){let o=Jh.distanceSqToPoint(s);if(o<t){let l=new I;Jh.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Aa=class extends Qt{constructor(e=[],t=rs,i,n,r,a,o,l,c,h){super(e,t,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var xn=class extends Qt{constructor(e,t,i=tn,n,r,a,o=Pt,l=Pt,c,h=fn,u=1){if(h!==fn&&h!==Mn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Cl=class extends xn{constructor(e,t=tn,i=rs,n,r,a=Pt,o=Pt,l,c=fn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,n,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ra=class extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gt=class s extends ot{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,n,a,2),p("x","z","y",1,-1,e,i,-t,n,a,3),p("x","y","z",1,-1,e,t,i,n,r,4),p("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(u,2));function p(x,m,g,_,M,b,y,S,R,v,E){let T=b/R,C=y/v,D=b/2,F=y/2,L=S/2,U=R+1,H=v+1,B=0,K=0,G=new I;for(let j=0;j<H;j++){let $=j*C-F;for(let ye=0;ye<U;ye++){let xe=ye*T-D;G[x]=xe*_,G[m]=$*M,G[g]=L,c.push(G.x,G.y,G.z),G[x]=0,G[m]=0,G[g]=S>0?1:-1,h.push(G.x,G.y,G.z),u.push(ye/R),u.push(1-j/v),B+=1}}for(let j=0;j<v;j++)for(let $=0;$<R;$++){let ye=d+$+U*j,xe=d+$+U*(j+1),ct=d+($+1)+U*(j+1),Je=d+($+1)+U*j;l.push(ye,xe,Je),l.push(xe,ct,Je),K+=6}o.addGroup(f,K,E),f+=K,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},kn=class s extends ot{constructor(e=1,t=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:n,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=i*2+r,x=n+1,m=new I,g=new I;for(let _=0;_<=p;_++){let M=0,b=0,y=0,S=0;if(_<=i){let E=_/i,T=E*Math.PI/2;b=-h-e*Math.cos(T),y=e*Math.sin(T),S=-e*Math.cos(T),M=E*u}else if(_<=i+r){let E=(_-i)/r;b=-h+E*t,y=e,S=0,M=u+E*d}else{let E=(_-i-r)/i,T=E*Math.PI/2;b=h+e*Math.sin(T),y=e*Math.cos(T),S=e*Math.sin(T),M=u+d+E*u}let R=Math.max(0,Math.min(1,M/f)),v=0;_===0?v=.5/n:_===p&&(v=-.5/n);for(let E=0;E<=n;E++){let T=E/n,C=T*Math.PI*2,D=Math.sin(C),F=Math.cos(C);g.x=-y*F,g.y=b,g.z=y*D,o.push(g.x,g.y,g.z),m.set(-y*F,S,y*D),m.normalize(),l.push(m.x,m.y,m.z),c.push(T+v,R)}if(_>0){let E=(_-1)*x;for(let T=0;T<n;T++){let C=E+T,D=E+T+1,F=_*x+T,L=_*x+T+1;a.push(C,D,F),a.push(D,L,F)}}}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},yr=class s extends ot{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new I,h=new ne;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=i+u/t*n;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ti=class s extends ot{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,x=[],m=i/2,g=0;_(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(f,2));function _(){let b=new I,y=new I,S=0,R=(t-e)/i;for(let v=0;v<=r;v++){let E=[],T=v/r,C=T*(t-e)+e;for(let D=0;D<=n;D++){let F=D/n,L=F*l+o,U=Math.sin(L),H=Math.cos(L);y.x=C*U,y.y=-T*i+m,y.z=C*H,u.push(y.x,y.y,y.z),b.set(U,R,H).normalize(),d.push(b.x,b.y,b.z),f.push(F,1-T),E.push(p++)}x.push(E)}for(let v=0;v<n;v++)for(let E=0;E<r;E++){let T=x[E][v],C=x[E+1][v],D=x[E+1][v+1],F=x[E][v+1];(e>0||E!==0)&&(h.push(T,C,F),S+=3),(t>0||E!==r-1)&&(h.push(C,D,F),S+=3)}c.addGroup(g,S,0),g+=S}function M(b){let y=p,S=new ne,R=new I,v=0,E=b===!0?e:t,T=b===!0?1:-1;for(let D=1;D<=n;D++)u.push(0,m*T,0),d.push(0,T,0),f.push(.5,.5),p++;let C=p;for(let D=0;D<=n;D++){let L=D/n*l+o,U=Math.cos(L),H=Math.sin(L);R.x=E*H,R.y=m*T,R.z=E*U,u.push(R.x,R.y,R.z),d.push(0,T,0),S.x=U*.5+.5,S.y=H*.5*T+.5,f.push(S.x,S.y),p++}for(let D=0;D<n;D++){let F=y+D,L=C+D;b===!0?h.push(L,L+1,F):h.push(L+1,L,F),v+=3}c.addGroup(g,v,b===!0?1:2),g+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ws=class s extends ti{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Pl=class s extends ot{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};let r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(r.slice(),3)),this.setAttribute("uv",new je(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let M=new I,b=new I,y=new I;for(let S=0;S<t.length;S+=3)f(t[S+0],M),f(t[S+1],b),f(t[S+2],y),l(M,b,y,_)}function l(_,M,b,y){let S=y+1,R=[];for(let v=0;v<=S;v++){R[v]=[];let E=_.clone().lerp(b,v/S),T=M.clone().lerp(b,v/S),C=S-v;for(let D=0;D<=C;D++)D===0&&v===S?R[v][D]=E:R[v][D]=E.clone().lerp(T,D/C)}for(let v=0;v<S;v++)for(let E=0;E<2*(S-v)-1;E++){let T=Math.floor(E/2);E%2===0?(d(R[v][T+1]),d(R[v+1][T]),d(R[v][T])):(d(R[v][T+1]),d(R[v+1][T+1]),d(R[v+1][T]))}}function c(_){let M=new I;for(let b=0;b<r.length;b+=3)M.x=r[b+0],M.y=r[b+1],M.z=r[b+2],M.normalize().multiplyScalar(_),r[b+0]=M.x,r[b+1]=M.y,r[b+2]=M.z}function h(){let _=new I;for(let M=0;M<r.length;M+=3){_.x=r[M+0],_.y=r[M+1],_.z=r[M+2];let b=m(_)/2/Math.PI+.5,y=g(_)/Math.PI+.5;a.push(b,1-y)}p(),u()}function u(){for(let _=0;_<a.length;_+=6){let M=a[_+0],b=a[_+2],y=a[_+4],S=Math.max(M,b,y),R=Math.min(M,b,y);S>.9&&R<.1&&(M<.2&&(a[_+0]+=1),b<.2&&(a[_+2]+=1),y<.2&&(a[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,M){let b=_*3;M.x=e[b+0],M.y=e[b+1],M.z=e[b+2]}function p(){let _=new I,M=new I,b=new I,y=new I,S=new ne,R=new ne,v=new ne;for(let E=0,T=0;E<r.length;E+=9,T+=6){_.set(r[E+0],r[E+1],r[E+2]),M.set(r[E+3],r[E+4],r[E+5]),b.set(r[E+6],r[E+7],r[E+8]),S.set(a[T+0],a[T+1]),R.set(a[T+2],a[T+3]),v.set(a[T+4],a[T+5]),y.copy(_).add(M).add(b).divideScalar(3);let C=m(y);x(S,T+0,_,C),x(R,T+2,M,C),x(v,T+4,b,C)}}function x(_,M,b,y){y<0&&_.x===1&&(a[M]=_.x-1),b.x===0&&b.z===0&&(a[M]=y/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function g(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}};var Ci=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Le("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),n=0,r=i.length,a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);let h=i[n],d=i[n+1]-h,f=(a-h)/d;return(n+f)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);let a=this.getPoint(n),o=this.getPoint(r),l=t||(a.isVector2?new ne:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new I,n=[],r=[],a=[],o=new I,l=new Ue;for(let f=0;f<=e;f++){let p=f/e;n[f]=this.getTangentAt(p,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(it(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(n[f],r[f])}if(t===!0){let f=Math.acos(it(r[0].dot(r[e]),-1,1));f/=e,n[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(n[p],f*p)),a[p].crossVectors(n[p],r[p])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Mr=class extends Ci{constructor(e=0,t=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){let i=t,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Il=class extends Mr{constructor(e,t,i,n,r,a){super(e,t,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Eu(){let s=0,e=0,t=0,i=0;function n(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,n(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+i*o}}}var _f=new I,yf=new I,zh=new Eu,Gh=new Eu,Hh=new Eu,Sr=class extends Ci{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new I){let i=t,n=this.points,r=n.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(yf.subVectors(n[0],n[1]).add(n[0]),c=yf);let u=n[o%r],d=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(_f.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=_f),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),zh.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,x,m),Gh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,x,m),Hh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,x,m)}else this.curveType==="catmullrom"&&(zh.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Gh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Hh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(zh.calc(l),Gh.calc(l),Hh.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new I().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Mf(s,e,t,i,n){let r=(i-e)*.5,a=(n-t)*.5,o=s*s,l=s*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*s+t}function Bg(s,e){let t=1-s;return t*t*e}function zg(s,e){return 2*(1-s)*s*e}function Gg(s,e){return s*s*e}function pa(s,e,t,i){return Bg(s,e)+zg(s,t)+Gg(s,i)}function Hg(s,e){let t=1-s;return t*t*t*e}function Vg(s,e){let t=1-s;return 3*t*t*s*e}function Wg(s,e){return 3*(1-s)*s*s*e}function qg(s,e){return s*s*s*e}function ma(s,e,t,i,n){return Hg(s,e)+Vg(s,t)+Wg(s,i)+qg(s,n)}var Ca=class extends Ci{constructor(e=new ne,t=new ne,i=new ne,n=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new ne){let i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ma(e,n.x,r.x,a.x,o.x),ma(e,n.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Dl=class extends Ci{constructor(e=new I,t=new I,i=new I,n=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new I){let i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ma(e,n.x,r.x,a.x,o.x),ma(e,n.y,r.y,a.y,o.y),ma(e,n.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Pa=class extends Ci{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ll=class extends Ci{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ia=class extends Ci{constructor(e=new ne,t=new ne,i=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ne){let i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(pa(e,n.x,r.x,a.x),pa(e,n.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends Ci{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){let i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(pa(e,n.x,r.x,a.x),pa(e,n.y,r.y,a.y),pa(e,n.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},La=class extends Ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let i=t,n=this.points,r=(n.length-1)*e,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],u=n[a>n.length-3?n.length-1:a+2];return i.set(Mf(o,l.x,c.x,h.x,u.x),Mf(o,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new ne().fromArray(n))}return this}},Fl=Object.freeze({__proto__:null,ArcCurve:Il,CatmullRomCurve3:Sr,CubicBezierCurve:Ca,CubicBezierCurve3:Dl,EllipseCurve:Mr,LineCurve:Pa,LineCurve3:Ll,QuadraticBezierCurve:Ia,QuadraticBezierCurve3:Da,SplineCurve:La}),Nl=class extends Ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Fl[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),n=this.getCurveLengths(),r=0;for(;r<n.length;){if(n[r]>=i){let a=n[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let n=0,r=this.curves;n<r.length;n++){let a=r[n],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(new Fl[n.type]().fromJSON(n))}return this}},Es=class extends Nl{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Pa(this.currentPoint.clone(),new ne(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){let r=new Ia(this.currentPoint.clone(),new ne(e,t),new ne(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,a){let o=new Ca(this.currentPoint.clone(),new ne(e,t),new ne(i,n),new ne(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new La(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,n,r,a),this}absarc(e,t,i,n,r,a){return this.absellipse(e,t,i,i,n,r,a),this}ellipse(e,t,i,n,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,n,r,a,o,l),this}absellipse(e,t,i,n,r,a,o,l){let c=new Mr(e,t,i,n,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Pi=class extends Es{constructor(e){super(e),this.uuid=Bi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(new Es().fromJSON(n))}return this}};function Xg(s,e,t=2){let i=e&&e.length,n=i?e[0]*t:s.length,r=bp(s,0,n,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=Zg(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,u=l;for(let d=t;d<n;d+=t){let f=s[d],p=s[d+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Fa(r,a,t,o,l,c,0),a}function bp(s,e,t,i,n){let r;if(n===l0(s,e,t,i)>0)for(let a=e;a<t;a+=i)r=Sf(a/i|0,s[a],s[a+1],r);else for(let a=t-i;a>=e;a-=i)r=Sf(a/i|0,s[a],s[a+1],r);return r&&wr(r,r.next)&&(Ua(r),r=r.next),r}function Ts(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(wr(t,t.next)||Lt(t.prev,t,t.next)===0)){if(Ua(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Fa(s,e,t,i,n,r,a){if(!s)return;!a&&r&&i0(s,i,n,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Kg(s,i,n,r):jg(s)){e.push(l.i,s.i,c.i),Ua(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Yg(Ts(s),e),Fa(s,e,t,i,n,r,2)):a===2&&Jg(s,e,t,i,n,r):Fa(Ts(s),e,t,i,n,r,1);break}}}function jg(s){let e=s.prev,t=s,i=s.next;if(Lt(e,t,i)>=0)return!1;let n=e.x,r=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=Math.min(n,r,a),u=Math.min(o,l,c),d=Math.max(n,r,a),f=Math.max(o,l,c),p=i.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&ua(n,o,r,l,a,c,p.x,p.y)&&Lt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Kg(s,e,t,i){let n=s.prev,r=s,a=s.next;if(Lt(n,r,a)>=0)return!1;let o=n.x,l=r.x,c=a.x,h=n.y,u=r.y,d=a.y,f=Math.min(o,l,c),p=Math.min(h,u,d),x=Math.max(o,l,c),m=Math.max(h,u,d),g=Zh(f,p,e,t,i),_=Zh(x,m,e,t,i),M=s.prevZ,b=s.nextZ;for(;M&&M.z>=g&&b&&b.z<=_;){if(M.x>=f&&M.x<=x&&M.y>=p&&M.y<=m&&M!==n&&M!==a&&ua(o,h,l,u,c,d,M.x,M.y)&&Lt(M.prev,M,M.next)>=0||(M=M.prevZ,b.x>=f&&b.x<=x&&b.y>=p&&b.y<=m&&b!==n&&b!==a&&ua(o,h,l,u,c,d,b.x,b.y)&&Lt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;M&&M.z>=g;){if(M.x>=f&&M.x<=x&&M.y>=p&&M.y<=m&&M!==n&&M!==a&&ua(o,h,l,u,c,d,M.x,M.y)&&Lt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;b&&b.z<=_;){if(b.x>=f&&b.x<=x&&b.y>=p&&b.y<=m&&b!==n&&b!==a&&ua(o,h,l,u,c,d,b.x,b.y)&&Lt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Yg(s,e){let t=s;do{let i=t.prev,n=t.next.next;!wr(i,n)&&vp(i,t,t.next,n)&&Na(i,n)&&Na(n,i)&&(e.push(i.i,t.i,n.i),Ua(t),Ua(t.next),t=s=n),t=t.next}while(t!==s);return Ts(t)}function Jg(s,e,t,i,n,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&r0(a,o)){let l=_p(a,o);a=Ts(a,a.next),l=Ts(l,l.next),Fa(a,e,t,i,n,r,0),Fa(l,e,t,i,n,r,0);return}o=o.next}a=a.next}while(a!==s)}function Zg(s,e,t,i){let n=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*i,l=r<a-1?e[r+1]*i:s.length,c=bp(s,o,l,i,!1);c===c.next&&(c.steiner=!0),n.push(s0(c))}n.sort($g);for(let r=0;r<n.length;r++)t=Qg(n[r],t);return t}function $g(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let i=(s.next.y-s.y)/(s.next.x-s.x),n=(e.next.y-e.y)/(e.next.x-e.x);t=i-n}return t}function Qg(s,e){let t=e0(s,e);if(!t)return e;let i=_p(t,s);return Ts(i,i.next),Ts(t,t.next)}function e0(s,e){let t=e,i=s.x,n=s.y,r=-1/0,a;if(wr(s,t))return t;do{if(wr(s,t.next))return t.next;if(n<=t.y&&n>=t.next.y&&t.next.y!==t.y){let u=t.x+(n-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===i))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&xp(n<c?i:r,n,l,c,n<c?r:i,n,t.x,t.y)){let u=Math.abs(n-t.y)/(i-t.x);Na(t,s)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&t0(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function t0(s,e){return Lt(s.prev,s,e.prev)<0&&Lt(e.next,s,s.next)<0}function i0(s,e,t,i){let n=s;do n.z===0&&(n.z=Zh(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,n0(n)}function n0(s){let e,t=1;do{let i=s,n;s=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(n=i,i=i.nextZ,o--):(n=a,a=a.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;i=a}r.nextZ=null,t*=2}while(e>1);return s}function Zh(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function s0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function xp(s,e,t,i,n,r,a,o){return(n-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(n-a)*(i-o)}function ua(s,e,t,i,n,r,a,o){return!(s===a&&e===o)&&xp(s,e,t,i,n,r,a,o)}function r0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!a0(s,e)&&(Na(s,e)&&Na(e,s)&&o0(s,e)&&(Lt(s.prev,s,e.prev)||Lt(s,e.prev,e))||wr(s,e)&&Lt(s.prev,s,s.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function wr(s,e){return s.x===e.x&&s.y===e.y}function vp(s,e,t,i){let n=ul(Lt(s,e,t)),r=ul(Lt(s,e,i)),a=ul(Lt(t,i,s)),o=ul(Lt(t,i,e));return!!(n!==r&&a!==o||n===0&&hl(s,t,e)||r===0&&hl(s,i,e)||a===0&&hl(t,s,i)||o===0&&hl(t,e,i))}function hl(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ul(s){return s>0?1:s<0?-1:0}function a0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&vp(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Na(s,e){return Lt(s.prev,s,s.next)<0?Lt(s,e,s.next)>=0&&Lt(s,s.prev,e)>=0:Lt(s,e,s.prev)<0||Lt(s,s.next,e)<0}function o0(s,e){let t=s,i=!1,n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function _p(s,e){let t=$h(s.i,s.x,s.y),i=$h(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Sf(s,e,t,i){let n=$h(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Ua(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function $h(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function l0(s,e,t,i){let n=0;for(let r=e,a=t-i;r<t;r+=i)n+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return n}var Qh=class{static triangulate(e,t,i=2){return Xg(e,t,i)}},un=class s{static area(e){let t=e.length,i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let i=[],n=[],r=[];wf(e),Ef(i,e);let a=e.length;t.forEach(wf);for(let l=0;l<t.length;l++)n.push(a),a+=t[l].length,Ef(i,t[l]);let o=Qh.triangulate(i,n);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function wf(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Ef(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Oa=class s extends ot{constructor(e=new Pi([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,n=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new je(n,3)),this.setAttribute("uv",new je(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:c0,M,b=!1,y,S,R,v;if(g){M=g.getSpacedPoints(h),b=!0,d=!1;let te=g.isCatmullRomCurve3?g.closed:!1;y=g.computeFrenetFrames(h,te),S=new I,R=new I,v=new I}d||(m=0,f=0,p=0,x=0);let E=o.extractPoints(c),T=E.shape,C=E.holes;if(!un.isClockWise(T)){T=T.reverse();for(let te=0,re=C.length;te<re;te++){let oe=C[te];un.isClockWise(oe)&&(C[te]=oe.reverse())}}function F(te){let oe=10000000000000001e-36,le=te[0];for(let he=1;he<=te.length;he++){let ze=he%te.length,Ne=te[ze],He=Ne.x-le.x,We=Ne.y-le.y,N=He*He+We*We,ut=Math.max(Math.abs(Ne.x),Math.abs(Ne.y),Math.abs(le.x),Math.abs(le.y)),Ze=oe*ut*ut;if(N<=Ze){te.splice(ze,1),he--;continue}le=Ne}}F(T),C.forEach(F);let L=C.length,U=T;for(let te=0;te<L;te++){let re=C[te];T=T.concat(re)}function H(te,re,oe){return re||Ve("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(re,oe)}let B=T.length;function K(te,re,oe){let le,he,ze,Ne=te.x-re.x,He=te.y-re.y,We=oe.x-te.x,N=oe.y-te.y,ut=Ne*Ne+He*He,Ze=Ne*N-He*We;if(Math.abs(Ze)>Number.EPSILON){let P=Math.sqrt(ut),w=Math.sqrt(We*We+N*N),z=re.x-He/P,V=re.y+Ne/P,J=oe.x-N/w,ce=oe.y+We/w,de=((J-z)*N-(ce-V)*We)/(Ne*N-He*We);le=z+Ne*de-te.x,he=V+He*de-te.y;let Z=le*le+he*he;if(Z<=2)return new ne(le,he);ze=Math.sqrt(Z/2)}else{let P=!1;Ne>Number.EPSILON?We>Number.EPSILON&&(P=!0):Ne<-Number.EPSILON?We<-Number.EPSILON&&(P=!0):Math.sign(He)===Math.sign(N)&&(P=!0),P?(le=-He,he=Ne,ze=Math.sqrt(ut)):(le=Ne,he=He,ze=Math.sqrt(ut/2))}return new ne(le/ze,he/ze)}let G=[];for(let te=0,re=U.length,oe=re-1,le=te+1;te<re;te++,oe++,le++)oe===re&&(oe=0),le===re&&(le=0),G[te]=K(U[te],U[oe],U[le]);let j=[],$,ye=G.concat();for(let te=0,re=L;te<re;te++){let oe=C[te];$=[];for(let le=0,he=oe.length,ze=he-1,Ne=le+1;le<he;le++,ze++,Ne++)ze===he&&(ze=0),Ne===he&&(Ne=0),$[le]=K(oe[le],oe[ze],oe[Ne]);j.push($),ye=ye.concat($)}let xe;if(m===0)xe=un.triangulateShape(U,C);else{let te=[],re=[];for(let oe=0;oe<m;oe++){let le=oe/m,he=f*Math.cos(le*Math.PI/2),ze=p*Math.sin(le*Math.PI/2)+x;for(let Ne=0,He=U.length;Ne<He;Ne++){let We=H(U[Ne],G[Ne],ze);ue(We.x,We.y,-he),le===0&&te.push(We)}for(let Ne=0,He=L;Ne<He;Ne++){let We=C[Ne];$=j[Ne];let N=[];for(let ut=0,Ze=We.length;ut<Ze;ut++){let P=H(We[ut],$[ut],ze);ue(P.x,P.y,-he),le===0&&N.push(P)}le===0&&re.push(N)}}xe=un.triangulateShape(te,re)}let ct=xe.length,Je=p+x;for(let te=0;te<B;te++){let re=d?H(T[te],ye[te],Je):T[te];b?(R.copy(y.normals[0]).multiplyScalar(re.x),S.copy(y.binormals[0]).multiplyScalar(re.y),v.copy(M[0]).add(R).add(S),ue(v.x,v.y,v.z)):ue(re.x,re.y,0)}for(let te=1;te<=h;te++)for(let re=0;re<B;re++){let oe=d?H(T[re],ye[re],Je):T[re];b?(R.copy(y.normals[te]).multiplyScalar(oe.x),S.copy(y.binormals[te]).multiplyScalar(oe.y),v.copy(M[te]).add(R).add(S),ue(v.x,v.y,v.z)):ue(oe.x,oe.y,u/h*te)}for(let te=m-1;te>=0;te--){let re=te/m,oe=f*Math.cos(re*Math.PI/2),le=p*Math.sin(re*Math.PI/2)+x;for(let he=0,ze=U.length;he<ze;he++){let Ne=H(U[he],G[he],le);ue(Ne.x,Ne.y,u+oe)}for(let he=0,ze=C.length;he<ze;he++){let Ne=C[he];$=j[he];for(let He=0,We=Ne.length;He<We;He++){let N=H(Ne[He],$[He],le);b?ue(N.x,N.y+M[h-1].y,M[h-1].x+oe):ue(N.x,N.y,u+oe)}}}nt(),Y();function nt(){let te=n.length/3;if(d){let re=0,oe=B*re;for(let le=0;le<ct;le++){let he=xe[le];Fe(he[2]+oe,he[1]+oe,he[0]+oe)}re=h+m*2,oe=B*re;for(let le=0;le<ct;le++){let he=xe[le];Fe(he[0]+oe,he[1]+oe,he[2]+oe)}}else{for(let re=0;re<ct;re++){let oe=xe[re];Fe(oe[2],oe[1],oe[0])}for(let re=0;re<ct;re++){let oe=xe[re];Fe(oe[0]+B*h,oe[1]+B*h,oe[2]+B*h)}}i.addGroup(te,n.length/3-te,0)}function Y(){let te=n.length/3,re=0;Q(U,re),re+=U.length;for(let oe=0,le=C.length;oe<le;oe++){let he=C[oe];Q(he,re),re+=he.length}i.addGroup(te,n.length/3-te,1)}function Q(te,re){let oe=te.length;for(;--oe>=0;){let le=oe,he=oe-1;he<0&&(he=te.length-1);for(let ze=0,Ne=h+m*2;ze<Ne;ze++){let He=B*ze,We=B*(ze+1),N=re+le+He,ut=re+he+He,Ze=re+he+We,P=re+le+We;Se(N,ut,Ze,P)}}}function ue(te,re,oe){l.push(te),l.push(re),l.push(oe)}function Fe(te,re,oe){Ge(te),Ge(re),Ge(oe);let le=n.length/3,he=_.generateTopUV(i,n,le-3,le-2,le-1);dt(he[0]),dt(he[1]),dt(he[2])}function Se(te,re,oe,le){Ge(te),Ge(re),Ge(le),Ge(re),Ge(oe),Ge(le);let he=n.length/3,ze=_.generateSideWallUV(i,n,he-6,he-3,he-2,he-1);dt(ze[0]),dt(ze[1]),dt(ze[3]),dt(ze[1]),dt(ze[2]),dt(ze[3])}function Ge(te){n.push(l[te*3+0]),n.push(l[te*3+1]),n.push(l[te*3+2])}function dt(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return h0(t,i,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];i.push(o)}let n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new Fl[n.type]().fromJSON(n)),new s(i,e.options)}},c0={generateTopUV:function(s,e,t,i,n){let r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[n*3],h=e[n*3+1];return[new ne(r,a),new ne(o,l),new ne(c,h)]},generateSideWallUV:function(s,e,t,i,n,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[n*3],f=e[n*3+1],p=e[n*3+2],x=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-u),new ne(d,1-p),new ne(x,1-g)]:[new ne(o,1-l),new ne(h,1-u),new ne(f,1-p),new ne(m,1-g)]}};function h0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){let r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ka=class s extends Pl{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Ba=class s extends ot{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],x=[],m=[];for(let g=0;g<h;g++){let _=g*d-a;for(let M=0;M<c;M++){let b=M*u-r;p.push(b,-_,0),x.push(0,0,1),m.push(M/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let M=_+c*g,b=_+c*(g+1),y=_+1+c*(g+1),S=_+1+c*g;f.push(M,b,S),f.push(b,y,S)}this.setIndex(f),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var $i=class s extends ot{constructor(e=new Pi([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],n=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new je(n,3)),this.setAttribute("normal",new je(r,3)),this.setAttribute("uv",new je(a,2));function c(h){let u=n.length/3,d=h.extractPoints(t),f=d.shape,p=d.holes;un.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=p.length;m<g;m++){let _=p[m];un.isClockWise(_)===!0&&(p[m]=_.reverse())}let x=un.triangulateShape(f,p);for(let m=0,g=p.length;m<g;m++){let _=p[m];f=f.concat(_)}for(let m=0,g=f.length;m<g;m++){let _=f[m];n.push(_.x,_.y,0),r.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=x.length;m<g;m++){let _=x[m],M=_[0]+u,b=_[1]+u,y=_[2]+u;i.push(M,b,y),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return u0(t,e)}static fromJSON(e,t){let i=[];for(let n=0,r=e.shapes.length;n<r;n++){let a=t[e.shapes[n]];i.push(a)}return new s(i,e.curveSegments)}};function u0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,i=s.length;t<i;t++){let n=s[t];e.shapes.push(n.uuid)}else e.shapes.push(s.uuid);return e}var As=class s extends ot{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new I,d=new I,f=[],p=[],x=[],m=[];for(let g=0;g<=i;g++){let _=[],M=g/i,b=a+M*o,y=e*Math.cos(b),S=Math.sqrt(e*e-y*y),R=0;g===0&&a===0?R=.5/t:g===i&&l===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){let E=v/t,T=n+E*r;u.x=-S*Math.cos(T),u.y=y,u.z=S*Math.sin(T),p.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+R,1-M),_.push(c++)}h.push(_)}for(let g=0;g<i;g++)for(let _=0;_<t;_++){let M=h[g][_+1],b=h[g][_],y=h[g+1][_],S=h[g+1][_+1];(g!==0||a>0)&&f.push(M,b,S),(g!==i-1||l<Math.PI)&&f.push(b,y,S)}this.setIndex(f),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var gi=class s extends ot{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],u=[],d=new I,f=new I,p=new I;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let g=0;g<=n;g++){let _=g/n*r;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/n),u.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=n;m++){let g=(n+1)*x+m-1,_=(n+1)*(x-1)+m-1,M=(n+1)*(x-1)+m,b=(n+1)*x+m;l.push(g,_,b),l.push(_,M,b)}this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var za=class s extends ot{constructor(e=new Da(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new I,l=new I,c=new ne,h=new I,u=[],d=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(f,2));function x(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),_(),g()}function m(M){h=e.getPointAt(M/t,h);let b=a.normals[M],y=a.binormals[M];for(let S=0;S<=n;S++){let R=S/n*Math.PI*2,v=Math.sin(R),E=-Math.cos(R);l.x=E*b.x+v*y.x,l.y=E*b.y+v*y.y,l.z=E*b.z+v*y.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=t;M++)for(let b=1;b<=n;b++){let y=(n+1)*(M-1)+(b-1),S=(n+1)*M+(b-1),R=(n+1)*M+b,v=(n+1)*(M-1)+b;p.push(y,S,v),p.push(S,R,v)}}function _(){for(let M=0;M<=t;M++)for(let b=0;b<=n;b++)c.x=M/t,c.y=b/n,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Fl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Us(s){let e={};for(let t in s){e[t]={};for(let i in s[t]){let n=s[t][i];if(Tf(n))n.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Tf(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();e[t][i]=r}else e[t][i]=n.slice();else e[t][i]=n}}return e}function ui(s){let e={};for(let t=0;t<s.length;t++){let i=Us(s[t]);for(let n in i)e[n]=i[n]}return e}function Tf(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function d0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Tu(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}var yi={clone:Us,merge:ui},f0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,It=class extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=f0,this.fragmentShader=p0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=d0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Be().setHex(n.value);break;case"v2":this.uniforms[i].value=new ne().fromArray(n.value);break;case"v3":this.uniforms[i].value=new I().fromArray(n.value);break;case"v4":this.uniforms[i].value=new _t().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ke().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Ue().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Er=class extends It{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Xt=class extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mo,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},vi=class extends Xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return it(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ga=class extends mi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mo,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};var Ul=class extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ol=class extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function es(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function gl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function m0(s){function e(n,r){return s[n]-s[r]}let t=s.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Af(s,e,t){let i=s.length,n=new s.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let l=0;l!==e;++l)n[a++]=s[o+l]}return n}function g0(s,e,t,i){let n=1,r=s[0];for(;r!==void 0&&r[i]===void 0;)r=s[n++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[n++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[n++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=s[n++];while(r!==void 0)}var vn=class{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=t[++i],e<n)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let a=0;a!==n;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},kl=class extends vn{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jh,endingEnd:jh}}intervalChanged_(e,t,i){let n=this.parameterPositions,r=e-2,a=e+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kh:r=e,o=2*t-i;break;case Yh:r=n.length-2,o=t+n[r]-n[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Kh:a=e,l=2*i-t;break;case Yh:a=1,l=i+n[1]-n[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(i-t)/(n-t),x=p*p,m=x*p,g=-d*m+2*d*x-d*p,_=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*p+1,M=(-1-f)*m+(1.5+f)*x+.5*p,b=f*m-f*x;for(let y=0;y!==o;++y)r[y]=g*a[h+y]+_*a[c+y]+M*a[l+y]+b*a[u+y];return r}},Bl=class extends vn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},zl=class extends vn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}},Gl=class extends vn{interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(i-t)/(n-t),x=1-p;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*p;return r}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let x=a[c+p],m=a[l+p],g=f*d+p*2,_=u[g],M=u[g+1],b=e*d+p*2,y=h[b],S=h[b+1],R=x0(i,t,_,y,n);r[p]=yp(R,x,M,S,m)}return r}};function yp(s,e,t,i,n){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*i+s*s*s*n}function b0(s,e,t,i,n){let r=1-s;return 3*r*r*(t-e)+6*r*s*(i-t)+3*s*s*(n-i)}function x0(s,e,t,i,n){let r=(s-e)/(n-e);for(let a=0;a<8;a++){let o=yp(r,e,t,i,n)-s;if(Math.abs(o)<1e-10)break;let l=b0(r,e,t,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var _i=class{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=es(t,this.TimeBufferType),this.values=es(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:es(e.times,Array),values:es(e.values,Array)};let n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n),gl(e.settings)&&(i.settings={inTangents:es(e.settings.inTangents,Array),outTangents:es(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new zl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Gl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case _s:t=this.InterpolantFactoryMethodDiscrete;break;case ys:t=this.InterpolantFactoryMethodLinear;break;case pl:t=this.InterpolantFactoryMethodSmooth;break;case Xh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Le("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _s;case this.InterpolantFactoryMethodLinear:return ys;case this.InterpolantFactoryMethodSmooth:return pl;case this.InterpolantFactoryMethodBezier:return Xh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e;gl(this.settings)&&(Rf(this.settings.inTangents,e),Rf(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ve("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ve("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(n!==void 0&&tg(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Ve("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===pl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{let u=o*i,d=u-i,f=u+i;for(let p=0;p!==i;++p){let x=t[u+p];if(x!==t[d+p]||x!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,gl(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Rf(s,e){for(let t=0,i=s.length;t!==i;t+=2)s[t]*=e}_i.prototype.ValueTypeName="";_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=ys;var Bn=class extends _i{constructor(e,t,i){super(e,t,i)}};Bn.prototype.ValueTypeName="bool";Bn.prototype.ValueBufferType=Array;Bn.prototype.DefaultInterpolation=_s;Bn.prototype.InterpolantFactoryMethodLinear=void 0;Bn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ha=class extends _i{constructor(e,t,i,n){super(e,t,i,n)}};Ha.prototype.ValueTypeName="color";var zn=class extends _i{constructor(e,t,i,n){super(e,t,i,n)}};zn.prototype.ValueTypeName="number";var Hl=class extends vn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t),c=e*o;for(let h=c+o;c!==h;c+=4)Ai.slerpFlat(r,0,a,c-o,a,c,l);return r}},Gn=class extends _i{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new Hl(this.times,this.values,this.getValueSize(),e)}};Gn.prototype.ValueTypeName="quaternion";Gn.prototype.InterpolantFactoryMethodSmooth=void 0;var Hn=class extends _i{constructor(e,t,i){super(e,t,i)}};Hn.prototype.ValueTypeName="string";Hn.prototype.ValueBufferType=Array;Hn.prototype.DefaultInterpolation=_s;Hn.prototype.InterpolantFactoryMethodLinear=void 0;Hn.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends _i{constructor(e,t,i,n){super(e,t,i,n)}};ns.prototype.ValueTypeName="vector";var Va=class{constructor(e="",t=-1,i=[],n=ip){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=Bi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,n=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(_0(i[a]).scale(n));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(_i.toJSON(i[r]));return n}static CreateFromMorphTargetSequence(e,t,i,n){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=m0(l);l=Af(l,1,h),c=Af(c,1,h),!n&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new zn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let n={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=n[u];d||(n[u]=d=[]),d.push(c)}}let a=[];for(let o in n)a.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return a}resetDuration(){let e=this.tracks,t=0;for(let i=0,n=e.length;i!==n;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function v0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return zn;case"vector":case"vector2":case"vector3":case"vector4":return ns;case"color":return Ha;case"quaternion":return Gn;case"bool":case"boolean":return Bn;case"string":return Hn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function _0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=v0(s.type);if(s.times===void 0){let i=[],n=[];g0(s.keys,i,n,"value"),s.times=i,s.values=n}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),gl(s.settings)&&(t.settings={inTangents:es(s.settings.inTangents,Float32Array),outTangents:es(s.settings.outTangents,Float32Array)}),t}var dn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Cf(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Cf(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Cf(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Vl=class{constructor(e,t,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Mp=new Vl,_n=class{constructor(e){this.manager=e!==void 0?e:Mp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_n.DEFAULT_MATERIAL_NAME="__DEFAULT";var Nn={},eu=class extends Error{constructor(e,t){super(e),this.response=t}},Tr=class extends _n{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=dn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Nn[e]!==void 0){Nn[e].push({onLoad:t,onProgress:i,onError:n});return}Nn[e]=[],Nn[e].push({onLoad:t,onProgress:i,onError:n});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Le("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Nn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,x=0,m=new ReadableStream({start(g){_();function _(){u.read().then(({done:M,value:b})=>{if(M)g.close();else{x+=b.byteLength;let y=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let S=0,R=h.length;S<R;S++){let v=h[S];v.onProgress&&v.onProgress(y)}g.enqueue(b),_()}},M=>{g.error(M)})}}});return new Response(m)}else throw new eu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{dn.add(`file:${e}`,c);let h=Nn[e];delete Nn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Nn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Nn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var rr=new WeakMap,Wl=class extends _n{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=dn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=rr.get(a);u===void 0&&(u=[],rr.set(a,u)),u.push({onLoad:t,onError:n})}return a}let o=dr("img");function l(){h(),t&&t(this);let u=rr.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}rr.delete(this),r.manager.itemEnd(e)}function c(u){h(),n&&n(u),dn.remove(`image:${e}`);let d=rr.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}rr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),dn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Wa=class extends _n{constructor(e){super(e)}load(e,t,i,n){let r=new Qt,a=new Wl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}},ss=class extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},qa=class extends ss{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Vh=new Ue,Pf=new I,If=new I,Ar=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gn,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Pf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pf),If.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(If),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){Vh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Vh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;e.coordinateSystem===ur||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Vh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},dl=new I,fl=new Ai,hn=new I,Xa=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(dl,fl,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(dl,fl,hn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(dl,fl,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(dl,fl,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qn=new I,Df=new ne,Lf=new ne,qt=class extends Xa{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ms*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z)}getViewSize(e,t){return this.getViewBounds(e,Df,Lf),t.subVectors(Lf,Df)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(da*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},tu=class extends Ar{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Ms*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||n!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},ja=class extends ss{constructor(e,t,i=0,n=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new tu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},iu=class extends Ar{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Rs=class extends ss{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new iu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},yn=class extends Xa{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},nu=class extends Ar{constructor(){super(new yn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Cs=class extends ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new nu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ka=class extends ss{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Vn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Wh=new WeakMap,Ya=class extends _n{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Le("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Le("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=dn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Wh.has(a)===!0?(n&&n(Wh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return dn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){n&&n(c),Wh.set(l,c),dn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});dn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ar=-90,or=1,Rr=class extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new qt(ar,or,e,t);n.layers=this.layers,this.add(n);let r=new qt(ar,or,e,t);r.layers=this.layers,this.add(r);let a=new qt(ar,or,e,t);a.layers=this.layers,this.add(a);let o=new qt(ar,or,e,t);o.layers=this.layers,this.add(o);let l=new qt(ar,or,e,t);l.layers=this.layers,this.add(l);let c=new qt(ar,or,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Yi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ur)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},ql=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ja=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=y0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function y0(){this._document.hidden===!1&&this.reset()}var Au="\\[\\]\\.:\\/",M0=new RegExp("["+Au+"]","g"),Ru="[^"+Au+"]",S0="[^"+Au.replace("\\.","")+"]",w0=/((?:WC+[\/:])*)/.source.replace("WC",Ru),E0=/(WCOD+)?/.source.replace("WCOD",S0),T0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ru),A0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ru),R0=new RegExp("^"+w0+E0+T0+A0+"$"),C0=["material","materials","bones","map"],su=class{constructor(e,t,i){let n=i||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},St=class s{constructor(e,t,i){this.path=t,this.parsedPath=i||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,i):new s(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(M0,"")}static parseTrackName(e){let t=R0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);C0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,n=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Le("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[n];if(a===void 0){let c=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=su;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Qy=new Float32Array(1);var Ff=new Ue,Za=class{constructor(e,t,i=0,n=1/0){this.ray=new is(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ve("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ff.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ff),this}intersectObject(e,t=!0,i=[]){return ru(e,this,i,t),i.sort(Nf),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)ru(e[n],this,i,t);return i.sort(Nf),i}};function Nf(s,e){return s.distance-e.distance}function ru(s,e,t,i){let n=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)ru(r[a],e,t,!0)}}var au=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=n,this}};function Cu(s,e,t,i){let n=P0(i);switch(t){case vu:return s*e;case Ql:return s*e/n.components*n.byteLength;case ec:return s*e/n.components*n.byteLength;case os:return s*e*2/n.components*n.byteLength;case tc:return s*e*2/n.components*n.byteLength;case _u:return s*e*3/n.components*n.byteLength;case bi:return s*e*4/n.components*n.byteLength;case ic:return s*e*4/n.components*n.byteLength;case oo:case lo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case co:case ho:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case sc:case ac:return Math.max(s,16)*Math.max(e,8)/4;case nc:case rc:return Math.max(s,8)*Math.max(e,8)/2;case oc:case lc:case hc:case uc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case cc:case uo:case dc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case pc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case mc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case gc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case bc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case xc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case vc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case _c:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case yc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case wc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Tc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ac:case Rc:case Cc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Pc:case Ic:return Math.ceil(s/4)*Math.ceil(e/4)*8;case fo:case Dc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function P0(s){switch(s){case hi:case mu:return{byteLength:1,components:1};case Dr:case gu:case jt:return{byteLength:2,components:1};case Zl:case $l:return{byteLength:2,components:4};case tn:case Jl:case Ii:return{byteLength:4,components:1};case bu:case xu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Wp(){let s=null,e=!1,t=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function D0(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],x=u[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var L0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F0=`#ifdef USE_ALPHAHASH
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
#endif`,N0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,U0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,B0=`#ifdef USE_AOMAP
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
#endif`,z0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G0=`#ifdef USE_BATCHING
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
#endif`,H0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,V0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,W0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,X0=`#ifdef USE_IRIDESCENCE
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
#endif`,j0=`#ifdef USE_BUMPMAP
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,eb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ib=`#define PI 3.141592653589793
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
} // validated`,nb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sb=`vec3 transformedNormal = objectNormal;
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
#endif`,rb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ab=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ob=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cb="gl_FragColor = linearToOutputTexel( gl_FragColor );",hb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ub=`#ifdef USE_ENVMAP
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
#endif`,db=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fb=`#ifdef USE_ENVMAP
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
#endif`,pb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mb=`#ifdef USE_ENVMAP
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
#endif`,gb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_b=`#ifdef USE_GRADIENTMAP
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
}`,yb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Eb=`#ifdef USE_ENVMAP
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
#endif`,Tb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ab=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pb=`PhysicalMaterial material;
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
#endif`,Ib=`uniform sampler2D dfgLUT;
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
}`,Db=`
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
#endif`,Lb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ub=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ob=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vb=`#if defined( USE_POINTS_UV )
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
#endif`,Wb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yb=`#ifdef USE_MORPHTARGETS
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
#endif`,Jb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$b=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ix=`#ifdef USE_NORMALMAP
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
#endif`,nx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ax=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ox=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ux=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,px=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xx=`float getShadowMask() {
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
}`,vx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_x=`#ifdef USE_SKINNING
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
#endif`,yx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mx=`#ifdef USE_SKINNING
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
#endif`,Sx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ex=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ax=`#ifdef USE_TRANSMISSION
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
#endif`,Rx=`#ifdef USE_TRANSMISSION
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
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Lx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fx=`uniform sampler2D t2D;
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
}`,Nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ux=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`#include <common>
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
}`,zx=`#if DEPTH_PACKING == 3200
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
}`,Gx=`#define DISTANCE
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
}`,Hx=`#define DISTANCE
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
}`,Vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`uniform float scale;
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
}`,Xx=`uniform vec3 diffuse;
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
}`,jx=`#include <common>
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
}`,Kx=`uniform vec3 diffuse;
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
}`,Yx=`#define LAMBERT
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
}`,Jx=`#define LAMBERT
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
}`,Zx=`#define MATCAP
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
}`,$x=`#define MATCAP
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
}`,Qx=`#define NORMAL
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
}`,ev=`#define NORMAL
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
}`,tv=`#define PHONG
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
}`,iv=`#define PHONG
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
}`,nv=`#define STANDARD
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
}`,sv=`#define STANDARD
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
}`,rv=`#define TOON
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
}`,av=`#define TOON
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
}`,ov=`uniform float size;
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
}`,lv=`uniform vec3 diffuse;
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
}`,cv=`#include <common>
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
}`,hv=`uniform vec3 color;
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
}`,uv=`uniform float rotation;
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
}`,dv=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:L0,alphahash_pars_fragment:F0,alphamap_fragment:N0,alphamap_pars_fragment:U0,alphatest_fragment:O0,alphatest_pars_fragment:k0,aomap_fragment:B0,aomap_pars_fragment:z0,batching_pars_vertex:G0,batching_vertex:H0,begin_vertex:V0,beginnormal_vertex:W0,bsdfs:q0,iridescence_fragment:X0,bumpmap_pars_fragment:j0,clipping_planes_fragment:K0,clipping_planes_pars_fragment:Y0,clipping_planes_pars_vertex:J0,clipping_planes_vertex:Z0,color_fragment:$0,color_pars_fragment:Q0,color_pars_vertex:eb,color_vertex:tb,common:ib,cube_uv_reflection_fragment:nb,defaultnormal_vertex:sb,displacementmap_pars_vertex:rb,displacementmap_vertex:ab,emissivemap_fragment:ob,emissivemap_pars_fragment:lb,colorspace_fragment:cb,colorspace_pars_fragment:hb,envmap_fragment:ub,envmap_common_pars_fragment:db,envmap_pars_fragment:fb,envmap_pars_vertex:pb,envmap_physical_pars_fragment:Eb,envmap_vertex:mb,fog_vertex:gb,fog_pars_vertex:bb,fog_fragment:xb,fog_pars_fragment:vb,gradientmap_pars_fragment:_b,lightmap_pars_fragment:yb,lights_lambert_fragment:Mb,lights_lambert_pars_fragment:Sb,lights_pars_begin:wb,lights_toon_fragment:Tb,lights_toon_pars_fragment:Ab,lights_phong_fragment:Rb,lights_phong_pars_fragment:Cb,lights_physical_fragment:Pb,lights_physical_pars_fragment:Ib,lights_fragment_begin:Db,lights_fragment_maps:Lb,lights_fragment_end:Fb,lightprobes_pars_fragment:Nb,logdepthbuf_fragment:Ub,logdepthbuf_pars_fragment:Ob,logdepthbuf_pars_vertex:kb,logdepthbuf_vertex:Bb,map_fragment:zb,map_pars_fragment:Gb,map_particle_fragment:Hb,map_particle_pars_fragment:Vb,metalnessmap_fragment:Wb,metalnessmap_pars_fragment:qb,morphinstance_vertex:Xb,morphcolor_vertex:jb,morphnormal_vertex:Kb,morphtarget_pars_vertex:Yb,morphtarget_vertex:Jb,normal_fragment_begin:Zb,normal_fragment_maps:$b,normal_pars_fragment:Qb,normal_pars_vertex:ex,normal_vertex:tx,normalmap_pars_fragment:ix,clearcoat_normal_fragment_begin:nx,clearcoat_normal_fragment_maps:sx,clearcoat_pars_fragment:rx,iridescence_pars_fragment:ax,opaque_fragment:ox,packing:lx,premultiplied_alpha_fragment:cx,project_vertex:hx,dithering_fragment:ux,dithering_pars_fragment:dx,roughnessmap_fragment:fx,roughnessmap_pars_fragment:px,shadowmap_pars_fragment:mx,shadowmap_pars_vertex:gx,shadowmap_vertex:bx,shadowmask_pars_fragment:xx,skinbase_vertex:vx,skinning_pars_vertex:_x,skinning_vertex:yx,skinnormal_vertex:Mx,specularmap_fragment:Sx,specularmap_pars_fragment:wx,tonemapping_fragment:Ex,tonemapping_pars_fragment:Tx,transmission_fragment:Ax,transmission_pars_fragment:Rx,uv_pars_fragment:Cx,uv_pars_vertex:Px,uv_vertex:Ix,worldpos_vertex:Dx,background_vert:Lx,background_frag:Fx,backgroundCube_vert:Nx,backgroundCube_frag:Ux,cube_vert:Ox,cube_frag:kx,depth_vert:Bx,depth_frag:zx,distance_vert:Gx,distance_frag:Hx,equirect_vert:Vx,equirect_frag:Wx,linedashed_vert:qx,linedashed_frag:Xx,meshbasic_vert:jx,meshbasic_frag:Kx,meshlambert_vert:Yx,meshlambert_frag:Jx,meshmatcap_vert:Zx,meshmatcap_frag:$x,meshnormal_vert:Qx,meshnormal_frag:ev,meshphong_vert:tv,meshphong_frag:iv,meshphysical_vert:nv,meshphysical_frag:sv,meshtoon_vert:rv,meshtoon_frag:av,points_vert:ov,points_frag:lv,shadow_vert:cv,shadow_frag:hv,sprite_vert:uv,sprite_frag:dv},ve={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},wn={basic:{uniforms:ui([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:ui([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:ui([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:ui([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:ui([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Be(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:ui([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:ui([ve.points,ve.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:ui([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:ui([ve.common,ve.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:ui([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:ui([ve.sprite,ve.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:ui([ve.common,ve.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:ui([ve.lights,ve.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};wn.physical={uniforms:ui([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var Nc={r:0,b:0,g:0},fv=new Ue,qp=new Ke;qp.set(-1,0,0,0,1,0,0,0,1);function pv(s,e,t,i,n,r){let a=new Be(0),o=n===!0?0:1,l,c,h=null,u=0,d=null;function f(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){let b=_.backgroundBlurriness>0;M=e.get(M,b)}return M}function p(_){let M=!1,b=f(_);b===null?m(a,o):b&&b.isColor&&(m(b,1),M=!0);let y=s.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(_,M){let b=f(M);b&&(b.isCubeTexture||b.mapping===ao)?(c===void 0&&(c=new Ye(new gt(1,1,1),new It({name:"BackgroundCubeMaterial",uniforms:Us(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fv.makeRotationFromEuler(M.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qp),c.material.toneMapped=$e.getTransfer(b.colorSpace)!==mt,(h!==b||u!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Ye(new Ba(2,2),new It({name:"BackgroundMaterial",uniforms:Us(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=$e.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,M){_.getRGB(Nc,Tu(s)),t.buffers.color.setClear(Nc.r,Nc.g,Nc.b,M,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:p,addToRenderList:x,dispose:g}}function mv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=d(null),r=n,a=!1;function o(C,D,F,L,U){let H=!1,B=u(C,L,F,D);r!==B&&(r=B,c(r.object)),H=f(C,L,F,U),H&&p(C,L,F,U),U!==null&&e.update(U,s.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,b(C,D,F,L),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return s.createVertexArray()}function c(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function u(C,D,F,L){let U=L.wireframe===!0,H=i[D.id];H===void 0&&(H={},i[D.id]=H);let B=C.isInstancedMesh===!0?C.id:0,K=H[B];K===void 0&&(K={},H[B]=K);let G=K[F.id];G===void 0&&(G={},K[F.id]=G);let j=G[U];return j===void 0&&(j=d(l()),G[U]=j),j}function d(C){let D=[],F=[],L=[];for(let U=0;U<t;U++)D[U]=0,F[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:L,object:C,attributes:{},index:null}}function f(C,D,F,L){let U=r.attributes,H=D.attributes,B=0,K=F.getAttributes();for(let G in K)if(K[G].location>=0){let $=U[G],ye=H[G];if(ye===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&(ye=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&(ye=C.instanceColor)),$===void 0||$.attribute!==ye||ye&&$.data!==ye.data)return!0;B++}return r.attributesNum!==B||r.index!==L}function p(C,D,F,L){let U={},H=D.attributes,B=0,K=F.getAttributes();for(let G in K)if(K[G].location>=0){let $=H[G];$===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&($=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&($=C.instanceColor));let ye={};ye.attribute=$,$&&$.data&&(ye.data=$.data),U[G]=ye,B++}r.attributes=U,r.attributesNum=B,r.index=L}function x(){let C=r.newAttributes;for(let D=0,F=C.length;D<F;D++)C[D]=0}function m(C){g(C,0)}function g(C,D){let F=r.newAttributes,L=r.enabledAttributes,U=r.attributeDivisors;F[C]=1,L[C]===0&&(s.enableVertexAttribArray(C),L[C]=1),U[C]!==D&&(s.vertexAttribDivisor(C,D),U[C]=D)}function _(){let C=r.newAttributes,D=r.enabledAttributes;for(let F=0,L=D.length;F<L;F++)D[F]!==C[F]&&(s.disableVertexAttribArray(F),D[F]=0)}function M(C,D,F,L,U,H,B){B===!0?s.vertexAttribIPointer(C,D,F,U,H):s.vertexAttribPointer(C,D,F,L,U,H)}function b(C,D,F,L){x();let U=L.attributes,H=F.getAttributes(),B=D.defaultAttributeValues;for(let K in H){let G=H[K];if(G.location>=0){let j=U[K];if(j===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(j=C.instanceColor)),j!==void 0){let $=j.normalized,ye=j.itemSize,xe=e.get(j);if(xe===void 0)continue;let ct=xe.buffer,Je=xe.type,nt=xe.bytesPerElement,Y=Je===s.INT||Je===s.UNSIGNED_INT||j.gpuType===Jl;if(j.isInterleavedBufferAttribute){let Q=j.data,ue=Q.stride,Fe=j.offset;if(Q.isInstancedInterleavedBuffer){for(let Se=0;Se<G.locationSize;Se++)g(G.location+Se,Q.meshPerAttribute);C.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Se=0;Se<G.locationSize;Se++)m(G.location+Se);s.bindBuffer(s.ARRAY_BUFFER,ct);for(let Se=0;Se<G.locationSize;Se++)M(G.location+Se,ye/G.locationSize,Je,$,ue*nt,(Fe+ye/G.locationSize*Se)*nt,Y)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<G.locationSize;Q++)g(G.location+Q,j.meshPerAttribute);C.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<G.locationSize;Q++)m(G.location+Q);s.bindBuffer(s.ARRAY_BUFFER,ct);for(let Q=0;Q<G.locationSize;Q++)M(G.location+Q,ye/G.locationSize,Je,$,ye*nt,ye/G.locationSize*Q*nt,Y)}}else if(B!==void 0){let $=B[K];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(G.location,$);break;case 3:s.vertexAttrib3fv(G.location,$);break;case 4:s.vertexAttrib4fv(G.location,$);break;default:s.vertexAttrib1fv(G.location,$)}}}}_()}function y(){E();for(let C in i){let D=i[C];for(let F in D){let L=D[F];for(let U in L){let H=L[U];for(let B in H)h(H[B].object),delete H[B];delete L[U]}}delete i[C]}}function S(C){if(i[C.id]===void 0)return;let D=i[C.id];for(let F in D){let L=D[F];for(let U in L){let H=L[U];for(let B in H)h(H[B].object),delete H[B];delete L[U]}}delete i[C.id]}function R(C){for(let D in i){let F=i[D];for(let L in F){let U=F[L];if(U[C.id]===void 0)continue;let H=U[C.id];for(let B in H)h(H[B].object),delete H[B];delete U[C.id]}}}function v(C){for(let D in i){let F=i[D],L=C.isInstancedMesh===!0?C.id:0,U=F[L];if(U!==void 0){for(let H in U){let B=U[H];for(let K in B)h(B[K].object),delete B[K];delete U[H]}delete F[L],Object.keys(F).length===0&&delete i[D]}}}function E(){T(),a=!0,r!==n&&(r=n,c(r.object))}function T(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:E,resetDefaultState:T,dispose:y,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function gv(s,e,t){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function bv(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(R){return!(R!==bi&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let v=R===jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==hi&&R!==Ii&&!v&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Le("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:b,maxSamples:y,samples:S}}function xv(s){let e=this,t=null,i=0,n=!1,r=!1,a=new ji,o=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,g=s.get(u);if(!n||p===null||p.length===0||r&&!m)r?h(null):c();else{let _=r?0:i,M=_*4,b=g.clippingState||null;l.value=b,b=h(p,d,M,f);for(let y=0;y!==M;++y)b[y]=t[y];g.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,p){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,p!==!0||m===null){let g=f+x*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,b=f;M!==x;++M,b+=4)a.copy(u[M]).applyMatrix4(_,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Nr=4,vv=6,_v=20,yv=256,go=new yn,Sp=new Be,Pu=null,Iu=0,Du=0,Lu=!1,Mv=new I,Os=new I,Or=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){let{size:a=256,position:o=Mv}=r;Pu=this._renderer.getRenderTarget(),Iu=this._renderer.getActiveCubeFace(),Du=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,n,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Pu,Iu,Du),this._renderer.xr.enabled=Lu,e.scissorTest=!1,Fr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rs||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pu=this._renderer.getRenderTarget(),Iu=this._renderer.getActiveCubeFace(),Du=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:jt,format:bi,colorSpace:pi,depthBuffer:!1},n=wp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wp(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Sv(r)),this._blurMaterial=Ev(r,e,t),this._ggxMaterial=wv(r,e,t)}return n}_compileMaterial(e){let t=new Ye(new ot,e);this._renderer.compile(t,go)}_sceneToCubeUV(e,t,i,n,r){let l=new qt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Sp),u.toneMapping=Qi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ye(new gt,new Ri({name:"PMREM.Background",side:ii,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,g=!1,_=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,g=!0):(m.color.copy(Sp),g=!0);for(let M=0;M<6;M++){let b=M%3;b===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):b===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));let y=this._cubeSize;Fr(n,b*y,M>2?y:0,y,y),u.setRenderTarget(n),g&&u.render(x,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=_}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===rs||e.mapping===Ls;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ep());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Fr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,go)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:p}=this,x=this._sizeLods[i],m=3*x*(i>p-Nr?i-p+Nr:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Fr(r,m,g,3*x,2*x),n.setRenderTarget(r),n.render(o,go),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,Fr(e,m,g,3*x,2*x),n.setRenderTarget(e),n.render(o,go)}_blur(e,t,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,n,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],u=3*h*(n>this._lodMax-Nr?n-this._lodMax+Nr:0),d=4*(this._cubeSize-h);Fr(t,u,d,3*h,2*h),a.setRenderTarget(t),a.render(l,go)}};function Sv(s){let e=[],t=[],i=s,n=s-Nr+1+vv;for(let r=0;r<n;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,p=new Float32Array(f*d*u),x=new Float32Array(f*d*u);for(let g=0;g<u;g++){let _=g%3*2/3-1,M=g>2?0:-1,b=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];p.set(b,f*d*g);for(let y=0;y<d;y++){let S=h[y*2]*2-1,R=h[y*2+1]*2-1;g===0?Os.set(1,R,S):g===1?Os.set(-S,1,-R):g===2?Os.set(-S,R,1):g===3?Os.set(-1,R,-S):g===4?Os.set(-S,-1,R):Os.set(S,R,-1),Os.toArray(x,(g*d+y)*f)}}let m=new ot;m.setAttribute("position",new Rt(p,f)),m.setAttribute("outputDirection",new Rt(x,f)),t.push(new Ye(m,null)),i>Nr&&i--}return{lodMeshes:t,sizeLods:e}}function wp(s,e,t){let i=new kt(s,e,t);return i.texture.mapping=ao,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fr(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function wv(s,e,t){return new It({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:kc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Ev(s,e,t){return new It({name:"SphericalGaussianBlur",defines:{SAMPLES:_v,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:kc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Ep(){return new It({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Tp(){return new It({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zt,depthTest:!1,depthWrite:!1})}function kc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var kr=class extends kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new Aa(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new gt(5,5,5),r=new It({name:"CubemapFromEquirect",uniforms:Us(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ii,blending:zt});r.uniforms.tEquirect.value=t;let a=new Ye(n,r),o=t.minFilter;return t.minFilter===en&&(t.minFilter=Ot),new Rr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}};function Tv(s){let e=new WeakMap,t=new WeakMap,i=null;function n(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===jl||f===Kl)if(e.has(d)){let p=e.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let x=new kr(p.height);return x.fromEquirectangularTexture(s,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,p=f===jl||f===Kl,x=f===rs||f===Ls;if(p||x){let m=t.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Or(s)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let _=d.image;return p&&_&&_.height>0||x&&_&&l(_)?(i===null&&(i=new Or(s)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===jl?d.mapping=rs:f===Kl&&(d.mapping=Ls),d}function l(d){let f=0,p=6;for(let x=0;x<p;x++)d[x]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function Av(s){let e={};function t(i){if(e[i]!==void 0)return e[i];let n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let n=t(i);return n===null&&vs("WebGLRenderer: "+i+" extension not supported."),n}}}function Rv(s,e,t,i){let n={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete n[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,p=u.attributes.position,x=0;if(p===void 0)return;if(f!==null){let _=f.array;x=f.version;for(let M=0,b=_.length;M<b;M+=3){let y=_[M+0],S=_[M+1],R=_[M+2];d.push(y,S,S,R,R,y)}}else{let _=p.array;x=p.version;for(let M=0,b=_.length/3-1;M<b;M+=3){let y=M+0,S=M+1,R=M+2;d.push(y,S,S,R,R,y)}}let m=new(p.count>=65535?_a:va)(d,1);m.version=x;let g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Cv(s,e,t){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(i,d,r,u*a),t.update(d,i,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(i,d,r,u*a,f),t.update(d,i,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,f);let x=0;for(let m=0;m<f;m++)x+=d[m];t.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Pv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Ve("WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Iv(s,e,t){let i=new WeakMap,n=new _t;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let E=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],M=0;f===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let b=o.attributes.position.count*M,y=1;b>e.maxTextureSize&&(y=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let S=new Float32Array(b*y*4*u),R=new xa(S,b,y,u);R.type=Ii,R.needsUpdate=!0;let v=M*4;for(let T=0;T<u;T++){let C=m[T],D=g[T],F=_[T],L=b*y*4*T;for(let U=0;U<C.count;U++){let H=U*v;f===!0&&(n.fromBufferAttribute(C,U),S[L+H+0]=n.x,S[L+H+1]=n.y,S[L+H+2]=n.z,S[L+H+3]=0),p===!0&&(n.fromBufferAttribute(D,U),S[L+H+4]=n.x,S[L+H+5]=n.y,S[L+H+6]=n.z,S[L+H+7]=0),x===!0&&(n.fromBufferAttribute(F,U),S[L+H+8]=n.x,S[L+H+9]=n.y,S[L+H+10]=n.z,S[L+H+11]=F.itemSize===4?n.w:1)}}d={count:u,texture:R,size:new ne(b,y)},i.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Dv(s,e,t,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Lv={[eo]:"LINEAR_TONE_MAPPING",[to]:"REINHARD_TONE_MAPPING",[io]:"CINEON_TONE_MAPPING",[no]:"ACES_FILMIC_TONE_MAPPING",[Ds]:"AGX_TONE_MAPPING",[ro]:"NEUTRAL_TONE_MAPPING",[so]:"CUSTOM_TONE_MAPPING"};function Fv(s,e,t,i,n,r){let a=new kt(e,t,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new ot;c.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new je([0,2,0,0,2,0],2));let h=new Er({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ye(c,h),d=new yn(-1,1,1,-1,0,1),f=null,p=null,x=!1,m,g=null,_=[],M=!1;this.setSize=function(b,y){a.setSize(b,y),o!==null&&o.setSize(b,y),l!==null&&l.setSize(b,y);for(let S=0;S<_.length;S++){let R=_[S];R.setSize&&R.setSize(b,y)}},this.setEffects=function(b){_=b,M=_.length>0&&_[0].isRenderPass===!0;let y=a.width,S=a.height;_.length>0&&o===null&&(o=new kt(y,S,{type:jt,depthBuffer:!1,stencilBuffer:!1}),l=new kt(y,S,{type:jt,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<_.length;R++){let v=_[R];v.setSize&&v.setSize(y,S)}},this.begin=function(b,y){if(x||b.toneMapping===Qi&&_.length===0)return!1;if(g=y,y!==null){let S=y.width,R=y.height;(a.width!==S||a.height!==R)&&this.setSize(S,R)}return M===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=Qi,!0},this.hasRenderPass=function(){return M},this.end=function(b,y){b.toneMapping=m,x=!0;let S=a,R=o;for(let v=0;v<_.length;v++){let E=_[v];E.enabled!==!1&&(E.render(b,R,S,y),E.needsSwap!==!1&&(S=R,R=R===o?l:o))}if(f!==b.outputColorSpace||p!==b.toneMapping){f=b.outputColorSpace,p=b.toneMapping,h.defines={},$e.getTransfer(f)===mt&&(h.defines.SRGB_TRANSFER="");let v=Lv[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(g),b.render(u,d),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Xp=new Qt,Uu=new xn(1,1),jp=new xa,Kp=new Tl,Yp=new Aa,Ap=[],Rp=[],Cp=new Float32Array(16),Pp=new Float32Array(9),Ip=new Float32Array(4);function Br(s,e,t){let i=s[0];if(i<=0||i>0)return s;let n=e*t,r=Ap[n];if(r===void 0&&(r=new Float32Array(n),Ap[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Kt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function Yt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Bc(s,e){let t=Rp[e];t===void 0&&(t=new Int32Array(e),Rp[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function Nv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Uv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;s.uniform2fv(this.addr,e),Yt(t,e)}}function Ov(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;s.uniform3fv(this.addr,e),Yt(t,e)}}function kv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;s.uniform4fv(this.addr,e),Yt(t,e)}}function Bv(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(Kt(t,i))return;Ip.set(i),s.uniformMatrix2fv(this.addr,!1,Ip),Yt(t,i)}}function zv(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(Kt(t,i))return;Pp.set(i),s.uniformMatrix3fv(this.addr,!1,Pp),Yt(t,i)}}function Gv(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(Kt(t,i))return;Cp.set(i),s.uniformMatrix4fv(this.addr,!1,Cp),Yt(t,i)}}function Hv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;s.uniform2iv(this.addr,e),Yt(t,e)}}function Wv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;s.uniform3iv(this.addr,e),Yt(t,e)}}function qv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;s.uniform4iv(this.addr,e),Yt(t,e)}}function Xv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function jv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;s.uniform2uiv(this.addr,e),Yt(t,e)}}function Kv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;s.uniform3uiv(this.addr,e),Yt(t,e)}}function Yv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;s.uniform4uiv(this.addr,e),Yt(t,e)}}function Jv(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Uu.compareFunction=t.isReversedDepthBuffer()?Fc:Lc,r=Uu):r=Xp,t.setTexture2D(e||r,n)}function Zv(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Kp,n)}function $v(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Yp,n)}function Qv(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||jp,n)}function e_(s){switch(s){case 5126:return Nv;case 35664:return Uv;case 35665:return Ov;case 35666:return kv;case 35674:return Bv;case 35675:return zv;case 35676:return Gv;case 5124:case 35670:return Hv;case 35667:case 35671:return Vv;case 35668:case 35672:return Wv;case 35669:case 35673:return qv;case 5125:return Xv;case 36294:return jv;case 36295:return Kv;case 36296:return Yv;case 35678:case 36198:case 36298:case 36306:case 35682:return Jv;case 35679:case 36299:case 36307:return Zv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Qv}}function t_(s,e){s.uniform1fv(this.addr,e)}function i_(s,e){let t=Br(e,this.size,2);s.uniform2fv(this.addr,t)}function n_(s,e){let t=Br(e,this.size,3);s.uniform3fv(this.addr,t)}function s_(s,e){let t=Br(e,this.size,4);s.uniform4fv(this.addr,t)}function r_(s,e){let t=Br(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function a_(s,e){let t=Br(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function o_(s,e){let t=Br(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function l_(s,e){s.uniform1iv(this.addr,e)}function c_(s,e){s.uniform2iv(this.addr,e)}function h_(s,e){s.uniform3iv(this.addr,e)}function u_(s,e){s.uniform4iv(this.addr,e)}function d_(s,e){s.uniform1uiv(this.addr,e)}function f_(s,e){s.uniform2uiv(this.addr,e)}function p_(s,e){s.uniform3uiv(this.addr,e)}function m_(s,e){s.uniform4uiv(this.addr,e)}function g_(s,e,t){let i=this.cache,n=e.length,r=Bc(t,n);Kt(i,r)||(s.uniform1iv(this.addr,r),Yt(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Uu:a=Xp;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||a,r[o])}function b_(s,e,t){let i=this.cache,n=e.length,r=Bc(t,n);Kt(i,r)||(s.uniform1iv(this.addr,r),Yt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Kp,r[a])}function x_(s,e,t){let i=this.cache,n=e.length,r=Bc(t,n);Kt(i,r)||(s.uniform1iv(this.addr,r),Yt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||Yp,r[a])}function v_(s,e,t){let i=this.cache,n=e.length,r=Bc(t,n);Kt(i,r)||(s.uniform1iv(this.addr,r),Yt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||jp,r[a])}function __(s){switch(s){case 5126:return t_;case 35664:return i_;case 35665:return n_;case 35666:return s_;case 35674:return r_;case 35675:return a_;case 35676:return o_;case 5124:case 35670:return l_;case 35667:case 35671:return c_;case 35668:case 35672:return h_;case 35669:case 35673:return u_;case 5125:return d_;case 36294:return f_;case 36295:return p_;case 36296:return m_;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return b_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return v_}}var Ou=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=e_(t.type)}},ku=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=__(t.type)}},Bu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(e,t[o.id],i)}}},Fu=/(\w+)(\])?(\[|\.)?/g;function Dp(s,e){s.seq.push(e),s.map[e.id]=e}function y_(s,e,t){let i=s.name,n=i.length;for(Fu.lastIndex=0;;){let r=Fu.exec(i),a=Fu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Dp(t,c===void 0?new Ou(o,s,e):new ku(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Bu(o),Dp(t,u)),t=u}}}var Ur=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);y_(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){let r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,r=e.length;n!==r;++n){let a=e[n];a.id in t&&i.push(a)}return i}};function Lp(s,e,t){let i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}var M_=37297,S_=0;function w_(s,e){let t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Fp=new Ke;function E_(s){$e._getMatrix(Fp,$e.workingColorSpace,s);let e=`mat3( ${Fp.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(s)){case ga:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Np(s,e,t){let i=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+w_(s.getShaderSource(e),o)}else return r}function T_(s,e){let t=E_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var A_={[eo]:"Linear",[to]:"Reinhard",[io]:"Cineon",[no]:"ACESFilmic",[Ds]:"AgX",[ro]:"Neutral",[so]:"Custom"};function R_(s,e){let t=A_[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Uc=new I;function C_(){$e.getLuminanceCoefficients(Uc);let s=Uc.x.toFixed(4),e=Uc.y.toFixed(4),t=Uc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xo).join(`
`)}function I_(s){let e=[];for(let t in s){let i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function D_(s,e){let t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(e,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function xo(s){return s!==""}function Up(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Op(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function zu(s){return s.replace(L_,N_)}var F_=new Map;function N_(s,e){let t=tt[e];if(t===void 0){let i=F_.get(e);if(i!==void 0)t=tt[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return zu(t)}var U_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kp(s){return s.replace(U_,O_)}function O_(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Bp(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var k_={[Ps]:"SHADOWMAP_TYPE_PCF",[Cr]:"SHADOWMAP_TYPE_VSM"};function B_(s){return k_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var z_={[rs]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[ao]:"ENVMAP_TYPE_CUBE_UV"};function G_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":z_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var H_={[Ls]:"ENVMAP_MODE_REFRACTION"};function V_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":H_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var W_={[fu]:"ENVMAP_BLENDING_MULTIPLY",[Qf]:"ENVMAP_BLENDING_MIX",[ep]:"ENVMAP_BLENDING_ADD"};function q_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":W_[s.combine]||"ENVMAP_BLENDING_NONE"}function X_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function j_(s,e,t,i){let n=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=B_(t),c=G_(t),h=V_(t),u=q_(t),d=X_(t),f=P_(t),p=I_(r),x=n.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(xo).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(xo).join(`
`),g.length>0&&(g+=`
`)):(m=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xo).join(`
`),g=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qi?"#define TONE_MAPPING":"",t.toneMapping!==Qi?tt.tonemapping_pars_fragment:"",t.toneMapping!==Qi?R_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,T_("linearToOutputTexel",t.outputColorSpace),C_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xo).join(`
`)),a=zu(a),a=Up(a,t),a=Op(a,t),o=zu(o),o=Up(o,t),o=Op(o,t),a=kp(a),o=kp(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Su?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Su?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=_+m+a,b=_+g+o,y=Lp(n,n.VERTEX_SHADER,M),S=Lp(n,n.FRAGMENT_SHADER,b);n.attachShader(x,y),n.attachShader(x,S),t.index0AttributeName!==void 0?n.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function R(C){if(s.debug.checkShaderErrors){let D=n.getProgramInfoLog(x)||"",F=n.getShaderInfoLog(y)||"",L=n.getShaderInfoLog(S)||"",U=D.trim(),H=F.trim(),B=L.trim(),K=!0,G=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,x,y,S);else{let j=Np(n,y,"vertex"),$=Np(n,S,"fragment");Ve("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+j+`
`+$)}else U!==""?Le("WebGLProgram: Program Info Log:",U):(H===""||B==="")&&(G=!1);G&&(C.diagnostics={runnable:K,programLog:U,vertexShader:{log:H,prefix:m},fragmentShader:{log:B,prefix:g}})}n.deleteShader(y),n.deleteShader(S),v=new Ur(n,x),E=D_(n,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=n.getProgramParameter(x,M_)),T},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=S_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=S,this}var K_=0,Gu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Hu(e),t.set(e,i)),i}},Hu=class{constructor(e){this.id=K_++,this.code=e,this.usedTimes=0}};function Y_(s){return s===os||s===uo||s===fo}function J_(s,e,t,i,n,r){let a=new mr,o=new Gu,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,E,T,C,D,F){let L=C.fog,U=D.geometry,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||H,B),G=K&&K.mapping===ao?K.image.height:null,j=f[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&Le("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let $=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ye=$!==void 0?$.length:0,xe=0;U.morphAttributes.position!==void 0&&(xe=1),U.morphAttributes.normal!==void 0&&(xe=2),U.morphAttributes.color!==void 0&&(xe=3);let ct,Je,nt,Y;if(j){let Et=wn[j];ct=Et.vertexShader,Je=Et.fragmentShader}else{ct=v.vertexShader,Je=v.fragmentShader;let Et=o.getVertexShaderStage(v),bt=o.getFragmentShaderStage(v);o.update(v,Et,bt),nt=Et.id,Y=bt.id}let Q=s.getRenderTarget(),ue=s.state.buffers.depth.getReversed(),Fe=D.isInstancedMesh===!0,Se=D.isBatchedMesh===!0,Ge=!!v.map,dt=!!v.matcap,te=!!K,re=!!v.aoMap,oe=!!v.lightMap,le=!!v.bumpMap&&v.wireframe===!1,he=!!v.normalMap,ze=!!v.displacementMap,Ne=!!v.emissiveMap,He=!!v.metalnessMap,We=!!v.roughnessMap,N=v.anisotropy>0,ut=v.clearcoat>0,Ze=v.dispersion>0,P=v.retroreflectivity>0,w=v.iridescence>0,z=v.sheen>0,V=v.transmission>0,J=N&&!!v.anisotropyMap,ce=ut&&!!v.clearcoatMap,de=ut&&!!v.clearcoatNormalMap,Z=ut&&!!v.clearcoatRoughnessMap,ie=w&&!!v.iridescenceMap,me=w&&!!v.iridescenceThicknessMap,Ie=z&&!!v.sheenColorMap,pe=z&&!!v.sheenRoughnessMap,fe=!!v.specularMap,Ae=!!v.specularColorMap,Oe=!!v.specularIntensityMap,qe=V&&!!v.transmissionMap,k=V&&!!v.thicknessMap,ge=!!v.gradientMap,ee=!!v.alphaMap,be=v.alphaTest>0,we=!!v.alphaHash,se=!!v.extensions,ke=Qi;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(ke=s.toneMapping);let Pe={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:ct,fragmentShader:Je,defines:v.defines,customVertexShaderID:nt,customFragmentShaderID:Y,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Se,batchingColor:Se&&D._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&D.instanceColor!==null,instancingMorph:Fe&&D.morphTexture!==null,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ge,matcap:dt,envMap:te,envMapMode:te&&K.mapping,envMapCubeUVHeight:G,aoMap:re,lightMap:oe,bumpMap:le,normalMap:he,displacementMap:ze,emissiveMap:Ne,normalMapObjectSpace:he&&v.normalMapType===sp,normalMapTangentSpace:he&&v.normalMapType===mo,packedNormalMap:he&&v.normalMapType===mo&&Y_(v.normalMap.format),metalnessMap:He,roughnessMap:We,anisotropy:N,anisotropyMap:J,clearcoat:ut,clearcoatMap:ce,clearcoatNormalMap:de,clearcoatRoughnessMap:Z,dispersion:Ze,retroreflection:P,iridescence:w,iridescenceMap:ie,iridescenceThicknessMap:me,sheen:z,sheenColorMap:Ie,sheenRoughnessMap:pe,specularMap:fe,specularColorMap:Ae,specularIntensityMap:Oe,transmission:V,transmissionMap:qe,thicknessMap:k,gradientMap:ge,opaque:v.transparent===!1&&v.blending===Pr&&v.alphaToCoverage===!1,alphaMap:ee,alphaTest:be,alphaHash:we,combine:v.combine,mapUv:Ge&&p(v.map.channel),aoMapUv:re&&p(v.aoMap.channel),lightMapUv:oe&&p(v.lightMap.channel),bumpMapUv:le&&p(v.bumpMap.channel),normalMapUv:he&&p(v.normalMap.channel),displacementMapUv:ze&&p(v.displacementMap.channel),emissiveMapUv:Ne&&p(v.emissiveMap.channel),metalnessMapUv:He&&p(v.metalnessMap.channel),roughnessMapUv:We&&p(v.roughnessMap.channel),anisotropyMapUv:J&&p(v.anisotropyMap.channel),clearcoatMapUv:ce&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:de&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:me&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:pe&&p(v.sheenRoughnessMap.channel),specularMapUv:fe&&p(v.specularMap.channel),specularColorMapUv:Ae&&p(v.specularColorMap.channel),specularIntensityMapUv:Oe&&p(v.specularIntensityMap.channel),transmissionMapUv:qe&&p(v.transmissionMap.channel),thicknessMapUv:k&&p(v.thicknessMap.channel),alphaMapUv:ee&&p(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(he||N),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(Ge||ee),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&he===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ue,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:xe,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&T.length>0,shadowMapType:s.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ge&&v.map.isVideoTexture===!0&&$e.getTransfer(v.map.colorSpace)===mt,decodeVideoTextureEmissive:Ne&&v.emissiveMap.isVideoTexture===!0&&$e.getTransfer(v.emissiveMap.colorSpace)===mt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Dt,flipSided:v.side===ii,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:se&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&v.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Pe.vertexUv1s=l.has(1),Pe.vertexUv2s=l.has(2),Pe.vertexUv3s=l.has(3),l.clear(),Pe}function m(v){let E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(let T in v.defines)E.push(T),E.push(v.defines[T]);return v.isRawShaderMaterial===!1&&(g(E,v),_(E,v),E.push(s.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function g(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numSunLights),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numSunLightShadows),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function _(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){let E=f[v.type],T;if(E){let C=wn[E];T=yi.clone(C.uniforms)}else T=v.uniforms;return T}function b(v,E){let T=h.get(E);return T!==void 0?++T.usedTimes:(T=new j_(s,E,v,n),c.push(T),h.set(E,T)),T}function y(v){if(--v.usedTimes===0){let E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){o.remove(v)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:M,acquireProgram:b,releaseProgram:y,releaseShaderCache:S,programs:c,dispose:R}}function Z_(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function $_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function zp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Gp(){let s=[],e=0,t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,x,m,g){let _=s[e];return _===void 0?(_={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:g},s[e]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=p,_.materialVariant=a(d),_.groupOrder=x,_.renderOrder=d.renderOrder,_.z=m,_.group=g),e++,_}function l(d,f,p,x,m,g,_){_.reversedDepth===!0&&(m=-m);let M=o(d,f,p,x,m,g);p.transmission>0?i.push(M):p.transparent===!0?n.push(M):t.push(M)}function c(d,f,p,x,m,g){let _=o(d,f,p,x,m,g);p.transmission>0?i.unshift(_):p.transparent===!0?n.unshift(_):t.unshift(_)}function h(d,f){t.length>1&&t.sort(d||$_),i.length>1&&i.sort(f||zp),n.length>1&&n.sort(f||zp)}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:u,sort:h}}function Q_(){let s=new WeakMap;function e(i,n){let r=s.get(i),a;return r===void 0?(a=new Gp,s.set(i,[a])):n>=r.length?(a=new Gp,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function ey(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new Be};break;case"SpotLight":t={position:new I,direction:new I,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new I,halfWidth:new I,halfHeight:new I};break}return s[e.id]=t,t}}}function ty(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var iy=0;function ny(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function sy(s){let e=new ey,t=ty(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let n=new I,r=new Ue,a=new Ue;function o(c){let h=0,u=0,d=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let f=0,p=0,x=0,m=0,g=0,_=0,M=0,b=0,y=0,S=0,R=0,v=0,E=0,T=0;c.sort(ny);for(let D=0,F=c.length;D<F;D++){let L=c[D],U=L.color,H=L.intensity,B=L.distance,K=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===os?K=L.shadow.map.texture:K=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=U.r*H,u+=U.g*H,d+=U.b*H;else if(L.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(L.sh.coefficients[G],H);T++}else if(L.isSunLight){let G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let j=L.shadow,$=t.get(L);$.shadowIntensity=j.intensity,$.shadowBias=j.bias,$.shadowNormalBias=j.normalBias,$.shadowRadius=j.radius,$.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[p]=$,i.sunShadowMap[p]=K;let ye=j.getViewportCount();for(let xe=0;xe<ye;xe++)i.sunShadowMatrix[x+xe]=j.getMatrix(xe),i.sunShadowCascade[x+xe]=j._cascadeData[xe];x+=ye,p++}i.sun[f]=G,f++}else if(L.isDirectionalLight){let G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let j=L.shadow,$=t.get(L);$.shadowIntensity=j.intensity,$.shadowBias=j.bias,$.shadowNormalBias=j.normalBias,$.shadowRadius=j.radius,$.shadowMapSize=j.mapSize,i.directionalShadow[m]=$,i.directionalShadowMap[m]=K,i.directionalShadowMatrix[m]=L.shadow.matrix,y++}i.directional[m]=G,m++}else if(L.isSpotLight){let G=e.get(L);G.position.setFromMatrixPosition(L.matrixWorld),G.color.copy(U).multiplyScalar(H),G.distance=B,G.coneCos=Math.cos(L.angle),G.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),G.decay=L.decay,i.spot[_]=G;let j=L.shadow;if(L.map&&(i.spotLightMap[v]=L.map,v++,j.updateMatrices(L),L.castShadow&&E++),i.spotLightMatrix[_]=j.matrix,L.castShadow){let $=t.get(L);$.shadowIntensity=j.intensity,$.shadowBias=j.bias,$.shadowNormalBias=j.normalBias,$.shadowRadius=j.radius,$.shadowMapSize=j.mapSize,i.spotShadow[_]=$,i.spotShadowMap[_]=K,R++}_++}else if(L.isRectAreaLight){let G=e.get(L);G.color.copy(U).multiplyScalar(H),G.halfWidth.set(L.width*.5,0,0),G.halfHeight.set(0,L.height*.5,0),i.rectArea[M]=G,M++}else if(L.isPointLight){let G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),G.distance=L.distance,G.decay=L.decay,L.castShadow){let j=L.shadow,$=t.get(L);$.shadowIntensity=j.intensity,$.shadowBias=j.bias,$.shadowNormalBias=j.normalBias,$.shadowRadius=j.radius,$.shadowMapSize=j.mapSize,$.shadowCameraNear=j.camera.near,$.shadowCameraFar=j.camera.far,i.pointShadow[g]=$,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=L.shadow.matrix,S++}i.point[g]=G,g++}else if(L.isHemisphereLight){let G=e.get(L);G.skyColor.copy(L.color).multiplyScalar(H),G.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[b]=G,b++}}M>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let C=i.hash;(C.sunLength!==f||C.directionalLength!==m||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==M||C.hemiLength!==b||C.numSunShadows!==p||C.numDirectionalShadows!==y||C.numPointShadows!==S||C.numSpotShadows!==R||C.numSpotMaps!==v||C.numLightProbes!==T)&&(i.sun.length=f,i.directional.length=m,i.spot.length=_,i.rectArea.length=M,i.point.length=g,i.hemi.length=b,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.directionalShadowMatrix.length=y,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+v-E,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=T,C.sunLength=f,C.directionalLength=m,C.pointLength=g,C.spotLength=_,C.rectAreaLength=M,C.hemiLength=b,C.numSunShadows=p,C.numDirectionalShadows=y,C.numPointShadows=S,C.numSpotShadows=R,C.numSpotMaps=v,C.numLightProbes=T,i.version=iy++)}function l(c,h){let u=0,d=0,f=0,p=0,x=0,m=0,g=h.matrixWorldInverse;for(let _=0,M=c.length;_<M;_++){let b=c[_];if(b.isSunLight){let y=i.sun[u];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),u++}else if(b.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(g),d++}else if(b.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(g),p++}else if(b.isRectAreaLight){let y=i.rectArea[x];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){let y=i.point[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),f++}else if(b.isHemisphereLight){let y=i.hemi[m];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:i}}function Hp(s){let e=new sy(s),t=[],i=[],n=[];function r(d){u.camera=d,t.length=0,i.length=0,n.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){n.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ry(s){let e=new WeakMap;function t(n,r=0){let a=e.get(n),o;return a===void 0?(o=new Hp(s),e.set(n,[o])):r>=a.length?(o=new Hp(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var ay=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oy=`uniform sampler2D shadow_pass;
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
}`,ly=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],cy=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Vp=new Ue,bo=new I,Nu=new I;function hy(s,e,t){let i=new gn,n=new ne,r=new ne,a=new _t,o=new Ul,l=new Ol,c={},h=t.maxTextureSize,u={[zi]:ii,[ii]:zi,[Dt]:Dt},d=new It({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:ay,fragmentShader:oy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new ot;p.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ye(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let g=this.type;this.render=function(S,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===kf&&(Le("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ps);let E=s.getRenderTarget(),T=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),D=s.state;D.setBlending(zt),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let F=g!==this.type;F&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(U=>U.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,U=S.length;L<U;L++){let H=S[L],B=H.shadow;if(B===void 0){Le("WebGLShadowMap:",H,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;n.copy(B.mapSize);let K=B.getFrameExtents();n.multiply(K),r.copy(B.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/K.x),n.x=r.x*K.x,B.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/K.y),n.y=r.y*K.y,B.mapSize.y=r.y));let G=s.state.buffers.depth.getReversed();if(B.camera._reversedDepth=G,B.map===null||F===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Cr){if(H.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new kt(n.x,n.y,{format:os,type:jt,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),B.map.texture.name=H.name+".shadowMap",B.map.depthTexture=new xn(n.x,n.y,Ii),B.map.depthTexture.name=H.name+".shadowMapDepth",B.map.depthTexture.format=fn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Pt,B.map.depthTexture.magFilter=Pt}else H.isPointLight?(B.map=new kr(n.x),B.map.depthTexture=new Cl(n.x,tn)):(B.map=new kt(n.x,n.y),B.map.depthTexture=new xn(n.x,n.y,tn)),B.map.depthTexture.name=H.name+".shadowMap",B.map.depthTexture.format=fn,this.type===Ps?(B.map.depthTexture.compareFunction=G?Fc:Lc,B.map.depthTexture.minFilter=Ot,B.map.depthTexture.magFilter=Ot):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Pt,B.map.depthTexture.magFilter=Pt);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==n.x||B.map.height!==n.y)&&B.map.setSize(n.x,n.y);let j=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();H.isPointLight!==!0&&B.updateMatrices(H,v);for(let $=0;$<j;$++){let ye=B.getCamera($);if(H.isPointLight){let xe=B.camera,ct=B.matrix,Je=H.distance||xe.far;Je!==xe.far&&(xe.far=Je,xe.updateProjectionMatrix()),bo.setFromMatrixPosition(H.matrixWorld),xe.position.copy(bo),Nu.copy(xe.position),Nu.add(ly[$]),xe.up.copy(cy[$]),xe.lookAt(Nu),xe.updateMatrixWorld(),ct.makeTranslation(-bo.x,-bo.y,-bo.z),Vp.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Vp,xe.coordinateSystem,xe.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)s.setRenderTarget(B.map,$),s.clear();else{$===0&&(s.setRenderTarget(B.map),s.clear());let xe=B.getViewport($);a.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),D.viewport(a)}i=B.getFrustum($),b(R,v,ye,H,this.type)}B.isPointLightShadow!==!0&&this.type===Cr&&_(B,v),B.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(E,T,C)};function _(S,R){let v=e.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new kt(n.x,n.y,{format:os,type:jt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(R,null,v,d,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(R,null,v,f,x,null)}function M(S,R,v,E){let T=null,C=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)T=C;else if(T=v.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let D=T.uuid,F=R.uuid,L=c[D];L===void 0&&(L={},c[D]=L);let U=L[F];U===void 0&&(U=T.clone(),L[F]=U,R.addEventListener("dispose",y)),T=U}if(T.visible=R.visible,T.wireframe=R.wireframe,E===Cr?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:u[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,v.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let D=s.properties.get(T);D.light=v}return T}function b(S,R,v,E,T){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&T===Cr)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);let F=e.update(S),L=S.material;if(Array.isArray(L)){let U=F.groups;for(let H=0,B=U.length;H<B;H++){let K=U[H],G=L[K.materialIndex];if(G&&G.visible){let j=M(S,G,E,T);S.onBeforeShadow(s,S,R,v,F,j,K),s.renderBufferDirect(v,null,F,j,S,K),S.onAfterShadow(s,S,R,v,F,j,K)}}}else if(L.visible){let U=M(S,L,E,T);S.onBeforeShadow(s,S,R,v,F,U,null),s.renderBufferDirect(v,null,F,U,S,null),S.onAfterShadow(s,S,R,v,F,U,null)}}let D=S.children;for(let F=0,L=D.length;F<L;F++)b(D[F],R,v,E,T)}function y(S){S.target.removeEventListener("dispose",y);for(let v in c){let E=c[v],T=S.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function uy(s,e){function t(){let k=!1,ge=new _t,ee=null,be=new _t(0,0,0,0);return{setMask:function(we){ee!==we&&!k&&(s.colorMask(we,we,we,we),ee=we)},setLocked:function(we){k=we},setClear:function(we,se,ke,Pe,Et){Et===!0&&(we*=Pe,se*=Pe,ke*=Pe),ge.set(we,se,ke,Pe),be.equals(ge)===!1&&(s.clearColor(we,se,ke,Pe),be.copy(ge))},reset:function(){k=!1,ee=null,be.set(-1,0,0,0)}}}function i(){let k=!1,ge=!1,ee=null,be=null,we=null;return{setReversed:function(se){if(ge!==se){let ke=e.get("EXT_clip_control");se?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),ge=se;let Pe=we;we=null,this.setClear(Pe)}},getReversed:function(){return ge},setTest:function(se){se?Q(s.DEPTH_TEST):ue(s.DEPTH_TEST)},setMask:function(se){ee!==se&&!k&&(s.depthMask(se),ee=se)},setFunc:function(se){if(ge&&(se=mp[se]),be!==se){switch(se){case bl:s.depthFunc(s.NEVER);break;case xl:s.depthFunc(s.ALWAYS);break;case vl:s.depthFunc(s.LESS);break;case cr:s.depthFunc(s.LEQUAL);break;case _l:s.depthFunc(s.EQUAL);break;case yl:s.depthFunc(s.GEQUAL);break;case Ml:s.depthFunc(s.GREATER);break;case Sl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}be=se}},setLocked:function(se){k=se},setClear:function(se){we!==se&&(we=se,ge&&(se=1-se),s.clearDepth(se))},reset:function(){k=!1,ee=null,be=null,we=null,ge=!1}}}function n(){let k=!1,ge=null,ee=null,be=null,we=null,se=null,ke=null,Pe=null,Et=null;return{setTest:function(bt){k||(bt?Q(s.STENCIL_TEST):ue(s.STENCIL_TEST))},setMask:function(bt){ge!==bt&&!k&&(s.stencilMask(bt),ge=bt)},setFunc:function(bt,Vi,ln){(ee!==bt||be!==Vi||we!==ln)&&(s.stencilFunc(bt,Vi,ln),ee=bt,be=Vi,we=ln)},setOp:function(bt,Vi,ln){(se!==bt||ke!==Vi||Pe!==ln)&&(s.stencilOp(bt,Vi,ln),se=bt,ke=Vi,Pe=ln)},setLocked:function(bt){k=bt},setClear:function(bt){Et!==bt&&(s.clearStencil(bt),Et=bt)},reset:function(){k=!1,ge=null,ee=null,be=null,we=null,se=null,ke=null,Pe=null,Et=null}}}let r=new t,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],x=null,m=!1,g=null,_=null,M=null,b=null,y=null,S=null,R=null,v=new Be(0,0,0),E=0,T=!1,C=null,D=null,F=null,L=null,U=null,H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,K=0,G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),B=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),B=K>=2);let j=null,$={},ye=s.getParameter(s.SCISSOR_BOX),xe=s.getParameter(s.VIEWPORT),ct=new _t().fromArray(ye),Je=new _t().fromArray(xe);function nt(k,ge,ee,be){let we=new Uint8Array(4),se=s.createTexture();s.bindTexture(k,se),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ke=0;ke<ee;ke++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(ge,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,we):s.texImage2D(ge+ke,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,we);return se}let Y={};Y[s.TEXTURE_2D]=nt(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=nt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=nt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=nt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(s.DEPTH_TEST),a.setFunc(cr),le(!1),he(ou),Q(s.CULL_FACE),re(zt);function Q(k){h[k]!==!0&&(s.enable(k),h[k]=!0)}function ue(k){h[k]!==!1&&(s.disable(k),h[k]=!1)}function Fe(k,ge){return d[k]!==ge?(s.bindFramebuffer(k,ge),d[k]=ge,k===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ge),k===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ge),!0):!1}function Se(k,ge){let ee=p,be=!1;if(k){ee=f.get(ge),ee===void 0&&(ee=[],f.set(ge,ee));let we=k.textures;if(ee.length!==we.length||ee[0]!==s.COLOR_ATTACHMENT0){for(let se=0,ke=we.length;se<ke;se++)ee[se]=s.COLOR_ATTACHMENT0+se;ee.length=we.length,be=!0}}else ee[0]!==s.BACK&&(ee[0]=s.BACK,be=!0);be&&s.drawBuffers(ee)}function Ge(k){return x!==k?(s.useProgram(k),x=k,!0):!1}let dt={[Gi]:s.FUNC_ADD,[Bf]:s.FUNC_SUBTRACT,[zf]:s.FUNC_REVERSE_SUBTRACT};dt[Gf]=s.MIN,dt[Hf]=s.MAX;let te={[Is]:s.ZERO,[Vf]:s.ONE,[Wf]:s.SRC_COLOR,[uu]:s.SRC_ALPHA,[Kf]:s.SRC_ALPHA_SATURATE,[Qa]:s.DST_COLOR,[$a]:s.DST_ALPHA,[qf]:s.ONE_MINUS_SRC_COLOR,[du]:s.ONE_MINUS_SRC_ALPHA,[jf]:s.ONE_MINUS_DST_COLOR,[Xf]:s.ONE_MINUS_DST_ALPHA,[Yf]:s.CONSTANT_COLOR,[Jf]:s.ONE_MINUS_CONSTANT_COLOR,[Zf]:s.CONSTANT_ALPHA,[$f]:s.ONE_MINUS_CONSTANT_ALPHA};function re(k,ge,ee,be,we,se,ke,Pe,Et,bt){if(k===zt){m===!0&&(ue(s.BLEND),m=!1);return}if(m===!1&&(Q(s.BLEND),m=!0),k!==Xl){if(k!==g||bt!==T){if((_!==Gi||y!==Gi)&&(s.blendEquation(s.FUNC_ADD),_=Gi,y=Gi),bt)switch(k){case Pr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lu:s.blendFunc(s.ONE,s.ONE);break;case cu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case hu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ve("WebGLState: Invalid blending: ",k);break}else switch(k){case Pr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lu:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case cu:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hu:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",k);break}M=null,b=null,S=null,R=null,v.set(0,0,0),E=0,g=k,T=bt}return}we=we||ge,se=se||ee,ke=ke||be,(ge!==_||we!==y)&&(s.blendEquationSeparate(dt[ge],dt[we]),_=ge,y=we),(ee!==M||be!==b||se!==S||ke!==R)&&(s.blendFuncSeparate(te[ee],te[be],te[se],te[ke]),M=ee,b=be,S=se,R=ke),(Pe.equals(v)===!1||Et!==E)&&(s.blendColor(Pe.r,Pe.g,Pe.b,Et),v.copy(Pe),E=Et),g=k,T=!1}function oe(k,ge){k.side===Dt?ue(s.CULL_FACE):Q(s.CULL_FACE);let ee=k.side===ii;ge&&(ee=!ee),le(ee),k.blending===Pr&&k.transparent===!1?re(zt):re(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let be=k.stencilWrite;o.setTest(be),be&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ne(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function le(k){C!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),C=k)}function he(k){k!==Uf?(Q(s.CULL_FACE),k!==D&&(k===ou?s.cullFace(s.BACK):k===Of?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ue(s.CULL_FACE),D=k}function ze(k){k!==F&&(B&&s.lineWidth(k),F=k)}function Ne(k,ge,ee){k?(Q(s.POLYGON_OFFSET_FILL),(L!==ge||U!==ee)&&(L=ge,U=ee,a.getReversed()&&(ge=-ge),s.polygonOffset(ge,ee))):ue(s.POLYGON_OFFSET_FILL)}function He(k){k?Q(s.SCISSOR_TEST):ue(s.SCISSOR_TEST)}function We(k){k===void 0&&(k=s.TEXTURE0+H-1),j!==k&&(s.activeTexture(k),j=k)}function N(k,ge,ee){ee===void 0&&(j===null?ee=s.TEXTURE0+H-1:ee=j);let be=$[ee];be===void 0&&(be={type:void 0,texture:void 0},$[ee]=be),(be.type!==k||be.texture!==ge)&&(j!==ee&&(s.activeTexture(ee),j=ee),s.bindTexture(k,ge||Y[k]),be.type=k,be.texture=ge)}function ut(){let k=$[j];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Ze(){try{s.compressedTexImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function w(){try{s.texSubImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function z(){try{s.texSubImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function J(){try{s.compressedTexSubImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function ce(){try{s.texStorage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function de(){try{s.texStorage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function Z(){try{s.texImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function ie(){try{s.texImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function me(k){return u[k]!==void 0?u[k]:s.getParameter(k)}function Ie(k,ge){u[k]!==ge&&(s.pixelStorei(k,ge),u[k]=ge)}function pe(k){ct.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),ct.copy(k))}function fe(k){Je.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),Je.copy(k))}function Ae(k,ge){let ee=c.get(ge);ee===void 0&&(ee=new WeakMap,c.set(ge,ee));let be=ee.get(k);be===void 0&&(be=s.getUniformBlockIndex(ge,k.name),ee.set(k,be))}function Oe(k,ge){let be=c.get(ge).get(k);l.get(ge)!==be&&(s.uniformBlockBinding(ge,be,k.__bindingPointIndex),l.set(ge,be))}function qe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},j=null,$={},d={},f=new WeakMap,p=[],x=null,m=!1,g=null,_=null,M=null,b=null,y=null,S=null,R=null,v=new Be(0,0,0),E=0,T=!1,C=null,D=null,F=null,L=null,U=null,ct.set(0,0,s.canvas.width,s.canvas.height),Je.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:ue,bindFramebuffer:Fe,drawBuffers:Se,useProgram:Ge,setBlending:re,setMaterial:oe,setFlipSided:le,setCullFace:he,setLineWidth:ze,setPolygonOffset:Ne,setScissorTest:He,activeTexture:We,bindTexture:N,unbindTexture:ut,compressedTexImage2D:Ze,compressedTexImage3D:P,texImage2D:Z,texImage3D:ie,pixelStorei:Ie,getParameter:me,updateUBOMapping:Ae,uniformBlockBinding:Oe,texStorage2D:ce,texStorage3D:de,texSubImage2D:w,texSubImage3D:z,compressedTexSubImage2D:V,compressedTexSubImage3D:J,scissor:pe,viewport:fe,reset:qe}}function dy(s,e,t,i,n,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,w){return p?new OffscreenCanvas(P,w):dr("canvas")}function m(P,w,z){let V=1,J=Ze(P);if((J.width>z||J.height>z)&&(V=z/Math.max(J.width,J.height)),V<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ce=Math.floor(V*J.width),de=Math.floor(V*J.height);d===void 0&&(d=x(ce,de));let Z=w?x(ce,de):d;return Z.width=ce,Z.height=de,Z.getContext("2d").drawImage(P,0,0,ce,de),Le("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+ce+"x"+de+")."),Z}else return"data"in P&&Le("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),P;return P}function g(P){return P.generateMipmaps}function _(P){s.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(P,w,z,V,J,ce=!1){if(P!==null){if(s[P]!==void 0)return s[P];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let de;V&&(de=e.get("EXT_texture_norm16"),de||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=w;if(w===s.RED&&(z===s.FLOAT&&(Z=s.R32F),z===s.HALF_FLOAT&&(Z=s.R16F),z===s.UNSIGNED_BYTE&&(Z=s.R8),z===s.UNSIGNED_SHORT&&de&&(Z=de.R16_EXT),z===s.SHORT&&de&&(Z=de.R16_SNORM_EXT)),w===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.R8UI),z===s.UNSIGNED_SHORT&&(Z=s.R16UI),z===s.UNSIGNED_INT&&(Z=s.R32UI),z===s.BYTE&&(Z=s.R8I),z===s.SHORT&&(Z=s.R16I),z===s.INT&&(Z=s.R32I)),w===s.RG&&(z===s.FLOAT&&(Z=s.RG32F),z===s.HALF_FLOAT&&(Z=s.RG16F),z===s.UNSIGNED_BYTE&&(Z=s.RG8),z===s.UNSIGNED_SHORT&&de&&(Z=de.RG16_EXT),z===s.SHORT&&de&&(Z=de.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RG8UI),z===s.UNSIGNED_SHORT&&(Z=s.RG16UI),z===s.UNSIGNED_INT&&(Z=s.RG32UI),z===s.BYTE&&(Z=s.RG8I),z===s.SHORT&&(Z=s.RG16I),z===s.INT&&(Z=s.RG32I)),w===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),z===s.UNSIGNED_INT&&(Z=s.RGB32UI),z===s.BYTE&&(Z=s.RGB8I),z===s.SHORT&&(Z=s.RGB16I),z===s.INT&&(Z=s.RGB32I)),w===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),z===s.UNSIGNED_INT&&(Z=s.RGBA32UI),z===s.BYTE&&(Z=s.RGBA8I),z===s.SHORT&&(Z=s.RGBA16I),z===s.INT&&(Z=s.RGBA32I)),w===s.RGB&&(z===s.UNSIGNED_SHORT&&de&&(Z=de.RGB16_EXT),z===s.SHORT&&de&&(Z=de.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),w===s.RGBA){let ie=ce?ga:$e.getTransfer(J);z===s.FLOAT&&(Z=s.RGBA32F),z===s.HALF_FLOAT&&(Z=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Z=ie===mt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&de&&(Z=de.RGBA16_EXT),z===s.SHORT&&de&&(Z=de.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(P,w){let z;return P?w===null||w===tn||w===as?z=s.DEPTH24_STENCIL8:w===Ii?z=s.DEPTH32F_STENCIL8:w===Dr&&(z=s.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===tn||w===as?z=s.DEPTH_COMPONENT24:w===Ii?z=s.DEPTH_COMPONENT32F:w===Dr&&(z=s.DEPTH_COMPONENT16),z}function S(P,w){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Pt&&P.minFilter!==Ot?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function R(P){let w=P.target;w.removeEventListener("dispose",R),E(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&u.delete(w)}function v(P){let w=P.target;w.removeEventListener("dispose",v),C(w)}function E(P){let w=i.get(P);if(w.__webglInit===void 0)return;let z=P.source,V=f.get(z);if(V){let J=V[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&T(P),Object.keys(V).length===0&&f.delete(z)}i.remove(P)}function T(P){let w=i.get(P);s.deleteTexture(w.__webglTexture);let z=P.source,V=f.get(z);delete V[w.__cacheKey],a.memory.textures--}function C(P){let w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(w.__webglFramebuffer[V]))for(let J=0;J<w.__webglFramebuffer[V].length;J++)s.deleteFramebuffer(w.__webglFramebuffer[V][J]);else s.deleteFramebuffer(w.__webglFramebuffer[V]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[V])}else{if(Array.isArray(w.__webglFramebuffer))for(let V=0;V<w.__webglFramebuffer.length;V++)s.deleteFramebuffer(w.__webglFramebuffer[V]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let V=0;V<w.__webglColorRenderbuffer.length;V++)w.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[V]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let z=P.textures;for(let V=0,J=z.length;V<J;V++){let ce=i.get(z[V]);ce.__webglTexture&&(s.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(z[V])}i.remove(P)}let D=0;function F(){D=0}function L(){return D}function U(P){D=P}function H(){let P=D;return P>=n.maxTextures&&Le("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+n.maxTextures),D+=1,P}function B(P){let w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function K(P,w){let z=i.get(P);if(P.isVideoTexture&&N(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){let V=P.image;if(V===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{ue(z,P,w);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+w)}function G(P,w){let z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){ue(z,P,w);return}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+w)}function j(P,w){let z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){ue(z,P,w);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+w)}function $(P,w){let z=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&z.__version!==P.version){Fe(z,P,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+w)}let ye={[xi]:s.REPEAT,[ki]:s.CLAMP_TO_EDGE,[hr]:s.MIRRORED_REPEAT},xe={[Pt]:s.NEAREST,[Yl]:s.NEAREST_MIPMAP_NEAREST,[Fs]:s.NEAREST_MIPMAP_LINEAR,[Ot]:s.LINEAR,[Ir]:s.LINEAR_MIPMAP_NEAREST,[en]:s.LINEAR_MIPMAP_LINEAR},ct={[ap]:s.NEVER,[up]:s.ALWAYS,[op]:s.LESS,[Lc]:s.LEQUAL,[lp]:s.EQUAL,[Fc]:s.GEQUAL,[cp]:s.GREATER,[hp]:s.NOTEQUAL};function Je(P,w){if(w.type===Ii&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Ot||w.magFilter===Ir||w.magFilter===Fs||w.magFilter===en||w.minFilter===Ot||w.minFilter===Ir||w.minFilter===Fs||w.minFilter===en)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ye[w.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ye[w.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ye[w.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,xe[w.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,xe[w.minFilter]),w.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,ct[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Pt||w.minFilter!==Fs&&w.minFilter!==en||w.type===Ii&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,n.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function nt(P,w){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",R));let V=w.source,J=f.get(V);J===void 0&&(J={},f.set(V,J));let ce=B(w);if(ce!==P.__cacheKey){J[ce]===void 0&&(J[ce]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[ce].usedTimes++;let de=J[P.__cacheKey];de!==void 0&&(J[P.__cacheKey].usedTimes--,de.usedTimes===0&&T(w)),P.__cacheKey=ce,P.__webglTexture=J[ce].texture}return z}function Y(P,w,z){return Math.floor(Math.floor(P/z)/w)}function Q(P,w,z,V){let ce=P.updateRanges;if(ce.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,z,V,w.data);else{ce.sort((Ie,pe)=>Ie.start-pe.start);let de=0;for(let Ie=1;Ie<ce.length;Ie++){let pe=ce[de],fe=ce[Ie],Ae=pe.start+pe.count,Oe=Y(fe.start,w.width,4),qe=Y(pe.start,w.width,4);fe.start<=Ae+1&&Oe===qe&&Y(fe.start+fe.count-1,w.width,4)===Oe?pe.count=Math.max(pe.count,fe.start+fe.count-pe.start):(++de,ce[de]=fe)}ce.length=de+1;let Z=t.getParameter(s.UNPACK_ROW_LENGTH),ie=t.getParameter(s.UNPACK_SKIP_PIXELS),me=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let Ie=0,pe=ce.length;Ie<pe;Ie++){let fe=ce[Ie],Ae=Math.floor(fe.start/4),Oe=Math.ceil(fe.count/4),qe=Ae%w.width,k=Math.floor(Ae/w.width),ge=Oe,ee=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,qe),t.pixelStorei(s.UNPACK_SKIP_ROWS,k),t.texSubImage2D(s.TEXTURE_2D,0,qe,k,ge,ee,z,V,w.data)}P.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Z),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(s.UNPACK_SKIP_ROWS,me)}}function ue(P,w,z){let V=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(V=s.TEXTURE_3D);let J=nt(P,w),ce=w.source;t.bindTexture(V,P.__webglTexture,s.TEXTURE0+z);let de=i.get(ce);if(ce.version!==de.__version||J===!0){if(t.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let ee=$e.getPrimaries($e.workingColorSpace),be=w.colorSpace===Wn?null:$e.getPrimaries(w.colorSpace),we=w.colorSpace===Wn||ee===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let ie=m(w.image,!1,n.maxTextureSize);ie=ut(w,ie);let me=r.convert(w.format,w.colorSpace),Ie=r.convert(w.type),pe=b(w.internalFormat,me,Ie,w.normalized,w.colorSpace,w.isVideoTexture);Je(V,w);let fe,Ae=w.mipmaps,Oe=w.isVideoTexture!==!0,qe=de.__version===void 0||J===!0,k=ce.dataReady,ge=S(w,ie);if(w.isDepthTexture)pe=y(w.format===Mn,w.type),qe&&(Oe?t.texStorage2D(s.TEXTURE_2D,1,pe,ie.width,ie.height):t.texImage2D(s.TEXTURE_2D,0,pe,ie.width,ie.height,0,me,Ie,null));else if(w.isDataTexture)if(Ae.length>0){Oe&&qe&&t.texStorage2D(s.TEXTURE_2D,ge,pe,Ae[0].width,Ae[0].height);for(let ee=0,be=Ae.length;ee<be;ee++)fe=Ae[ee],Oe?k&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,fe.width,fe.height,me,Ie,fe.data):t.texImage2D(s.TEXTURE_2D,ee,pe,fe.width,fe.height,0,me,Ie,fe.data);w.generateMipmaps=!1}else Oe?(qe&&t.texStorage2D(s.TEXTURE_2D,ge,pe,ie.width,ie.height),k&&Q(w,ie,me,Ie)):t.texImage2D(s.TEXTURE_2D,0,pe,ie.width,ie.height,0,me,Ie,ie.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Oe&&qe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ge,pe,Ae[0].width,Ae[0].height,ie.depth);for(let ee=0,be=Ae.length;ee<be;ee++)if(fe=Ae[ee],w.format!==bi)if(me!==null)if(Oe){if(k)if(w.layerUpdates.size>0){let we=Cu(fe.width,fe.height,w.format,w.type);for(let se of w.layerUpdates){let ke=fe.data.subarray(se*we/fe.data.BYTES_PER_ELEMENT,(se+1)*we/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,se,fe.width,fe.height,1,me,ke)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,0,fe.width,fe.height,ie.depth,me,fe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ee,pe,fe.width,fe.height,ie.depth,0,fe.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?k&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,0,fe.width,fe.height,ie.depth,me,Ie,fe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ee,pe,fe.width,fe.height,ie.depth,0,me,Ie,fe.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Oe&&qe&&t.texStorage2D(s.TEXTURE_2D,ge,pe,Ae[0].width,Ae[0].height);for(let ee=0,be=Ae.length;ee<be;ee++)fe=Ae[ee],w.format!==bi?me!==null?Oe?k&&t.compressedTexSubImage2D(s.TEXTURE_2D,ee,0,0,fe.width,fe.height,me,fe.data):t.compressedTexImage2D(s.TEXTURE_2D,ee,pe,fe.width,fe.height,0,fe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?k&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,fe.width,fe.height,me,Ie,fe.data):t.texImage2D(s.TEXTURE_2D,ee,pe,fe.width,fe.height,0,me,Ie,fe.data)}else if(w.isDataArrayTexture)if(Oe){if(qe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ge,pe,ie.width,ie.height,ie.depth),k)if(w.layerUpdates.size>0){let ee=Cu(ie.width,ie.height,w.format,w.type);for(let be of w.layerUpdates){let we=ie.data.subarray(be*ee/ie.data.BYTES_PER_ELEMENT,(be+1)*ee/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,be,ie.width,ie.height,1,me,Ie,we)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,me,Ie,ie.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,ie.width,ie.height,ie.depth,0,me,Ie,ie.data);else if(w.isData3DTexture)Oe?(qe&&t.texStorage3D(s.TEXTURE_3D,ge,pe,ie.width,ie.height,ie.depth),k&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,me,Ie,ie.data)):t.texImage3D(s.TEXTURE_3D,0,pe,ie.width,ie.height,ie.depth,0,me,Ie,ie.data);else if(w.isFramebufferTexture){if(qe)if(Oe)t.texStorage2D(s.TEXTURE_2D,ge,pe,ie.width,ie.height);else{let ee=ie.width,be=ie.height;for(let we=0;we<ge;we++)t.texImage2D(s.TEXTURE_2D,we,pe,ee,be,0,me,Ie,null),ee>>=1,be>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){let ee=s.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),ie.parentNode!==ee){ee.appendChild(ie),u.add(w),ee.onpaint=be=>{let we=be.changedElements;for(let se of u)we.includes(se.image)&&(se.needsUpdate=!0)},ee.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ie);else{let we=s.RGBA,se=s.RGBA,ke=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,we,se,ke,ie)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Oe&&qe){let ee=Ze(Ae[0]);t.texStorage2D(s.TEXTURE_2D,ge,pe,ee.width,ee.height)}for(let ee=0,be=Ae.length;ee<be;ee++)fe=Ae[ee],Oe?k&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,me,Ie,fe):t.texImage2D(s.TEXTURE_2D,ee,pe,me,Ie,fe);w.generateMipmaps=!1}else if(Oe){if(qe){let ee=Ze(ie);t.texStorage2D(s.TEXTURE_2D,ge,pe,ee.width,ee.height)}k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,me,Ie,ie)}else t.texImage2D(s.TEXTURE_2D,0,pe,me,Ie,ie);g(w)&&_(V),de.__version=ce.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Fe(P,w,z){if(w.image.length!==6)return;let V=nt(P,w),J=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+z);let ce=i.get(J);if(J.version!==ce.__version||V===!0){t.activeTexture(s.TEXTURE0+z);let de=$e.getPrimaries($e.workingColorSpace),Z=w.colorSpace===Wn?null:$e.getPrimaries(w.colorSpace),ie=w.colorSpace===Wn||de===Z?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let me=w.isCompressedTexture||w.image[0].isCompressedTexture,Ie=w.image[0]&&w.image[0].isDataTexture,pe=[];for(let se=0;se<6;se++)!me&&!Ie?pe[se]=m(w.image[se],!0,n.maxCubemapSize):pe[se]=Ie?w.image[se].image:w.image[se],pe[se]=ut(w,pe[se]);let fe=pe[0],Ae=r.convert(w.format,w.colorSpace),Oe=r.convert(w.type),qe=b(w.internalFormat,Ae,Oe,w.normalized,w.colorSpace),k=w.isVideoTexture!==!0,ge=ce.__version===void 0||V===!0,ee=J.dataReady,be=S(w,fe);Je(s.TEXTURE_CUBE_MAP,w);let we;if(me){k&&ge&&t.texStorage2D(s.TEXTURE_CUBE_MAP,be,qe,fe.width,fe.height);for(let se=0;se<6;se++){we=pe[se].mipmaps;for(let ke=0;ke<we.length;ke++){let Pe=we[ke];w.format!==bi?Ae!==null?k?ee&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke,0,0,Pe.width,Pe.height,Ae,Pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke,qe,Pe.width,Pe.height,0,Pe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ee&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke,0,0,Pe.width,Pe.height,Ae,Oe,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke,qe,Pe.width,Pe.height,0,Ae,Oe,Pe.data)}}}else{if(we=w.mipmaps,k&&ge){we.length>0&&be++;let se=Ze(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,be,qe,se.width,se.height)}for(let se=0;se<6;se++)if(Ie){k?ee&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,pe[se].width,pe[se].height,Ae,Oe,pe[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,qe,pe[se].width,pe[se].height,0,Ae,Oe,pe[se].data);for(let ke=0;ke<we.length;ke++){let Et=we[ke].image[se].image;k?ee&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke+1,0,0,Et.width,Et.height,Ae,Oe,Et.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke+1,qe,Et.width,Et.height,0,Ae,Oe,Et.data)}}else{k?ee&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ae,Oe,pe[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,qe,Ae,Oe,pe[se]);for(let ke=0;ke<we.length;ke++){let Pe=we[ke];k?ee&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke+1,0,0,Ae,Oe,Pe.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ke+1,qe,Ae,Oe,Pe.image[se])}}}g(w)&&_(s.TEXTURE_CUBE_MAP),ce.__version=J.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Se(P,w,z,V,J,ce){let de=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),ie=b(z.internalFormat,de,Z,z.normalized,z.colorSpace),me=i.get(w),Ie=i.get(z);if(Ie.__renderTarget=w,!me.__hasExternalTextures){let pe=Math.max(1,w.width>>ce),fe=Math.max(1,w.height>>ce);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?t.texImage3D(J,ce,ie,pe,fe,w.depth,0,de,Z,null):t.texImage2D(J,ce,ie,pe,fe,0,de,Z,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),We(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,J,Ie.__webglTexture,0,He(w)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,J,Ie.__webglTexture,ce),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ge(P,w,z){if(s.bindRenderbuffer(s.RENDERBUFFER,P),w.depthBuffer){let V=w.depthTexture,J=V&&V.isDepthTexture?V.type:null,ce=y(w.stencilBuffer,J),de=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;We(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,He(w),ce,w.width,w.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,He(w),ce,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ce,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,P)}else{let V=w.textures;for(let J=0;J<V.length;J++){let ce=V[J],de=r.convert(ce.format,ce.colorSpace),Z=r.convert(ce.type),ie=b(ce.internalFormat,de,Z,ce.normalized,ce.colorSpace);We(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,He(w),ie,w.width,w.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,He(w),ie,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ie,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function dt(P,w,z){let V=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=i.get(w.depthTexture);if(J.__renderTarget=w,(!J.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),V){if(J.__webglInit===void 0&&(J.__webglInit=!0,w.depthTexture.addEventListener("dispose",R)),J.__webglTexture===void 0){J.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Je(s.TEXTURE_CUBE_MAP,w.depthTexture);let me=r.convert(w.depthTexture.format),Ie=r.convert(w.depthTexture.type),pe;w.depthTexture.format===fn?pe=s.DEPTH_COMPONENT24:w.depthTexture.format===Mn&&(pe=s.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,pe,w.width,w.height,0,me,Ie,null)}}else K(w.depthTexture,0);let ce=J.__webglTexture,de=He(w),Z=V?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,ie=w.depthTexture.format===Mn?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===fn)We(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ie,Z,ce,0,de):s.framebufferTexture2D(s.FRAMEBUFFER,ie,Z,ce,0);else if(w.depthTexture.format===Mn)We(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ie,Z,ce,0,de):s.framebufferTexture2D(s.FRAMEBUFFER,ie,Z,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function te(P){let w=i.get(P),z=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){let V=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),V){let J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,V.removeEventListener("dispose",J)};V.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=V}if(P.depthTexture&&!w.__autoAllocateDepthBuffer)if(z)for(let V=0;V<6;V++)dt(w.__webglFramebuffer[V],P,V);else{let V=P.texture.mipmaps;V&&V.length>0?dt(w.__webglFramebuffer[0],P,0):dt(w.__webglFramebuffer,P,0)}else if(z){w.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[V]),w.__webglDepthbuffer[V]===void 0)w.__webglDepthbuffer[V]=s.createRenderbuffer(),Ge(w.__webglDepthbuffer[V],P,!1);else{let J=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=w.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,ce),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,ce)}}else{let V=P.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Ge(w.__webglDepthbuffer,P,!1);else{let J=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ce),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,ce)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function re(P,w,z){let V=i.get(P);w!==void 0&&Se(V.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&te(P)}function oe(P){let w=P.texture,z=i.get(P),V=i.get(w);P.addEventListener("dispose",v);let J=P.textures,ce=P.isWebGLCubeRenderTarget===!0,de=J.length>1;if(de||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=w.version,a.memory.textures++),ce){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let ie=0;ie<w.mipmaps.length;ie++)z.__webglFramebuffer[Z][ie]=s.createFramebuffer()}else z.__webglFramebuffer[Z]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<w.mipmaps.length;Z++)z.__webglFramebuffer[Z]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(de)for(let Z=0,ie=J.length;Z<ie;Z++){let me=i.get(J[Z]);me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&We(P)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<J.length;Z++){let ie=J[Z];z.__webglColorRenderbuffer[Z]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let me=r.convert(ie.format,ie.colorSpace),Ie=r.convert(ie.type),pe=b(ie.internalFormat,me,Ie,ie.normalized,ie.colorSpace,P.isXRRenderTarget===!0),fe=He(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,pe,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Z,s.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),Ge(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ce){t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),Je(s.TEXTURE_CUBE_MAP,w);for(let Z=0;Z<6;Z++)if(w.mipmaps&&w.mipmaps.length>0)for(let ie=0;ie<w.mipmaps.length;ie++)Se(z.__webglFramebuffer[Z][ie],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ie);else Se(z.__webglFramebuffer[Z],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);g(w)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let Z=0,ie=J.length;Z<ie;Z++){let me=J[Z],Ie=i.get(me),pe=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pe=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,Ie.__webglTexture),Je(pe,me),Se(z.__webglFramebuffer,P,me,s.COLOR_ATTACHMENT0+Z,pe,0),g(me)&&_(pe)}t.unbindTexture()}else{let Z=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Z=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Z,V.__webglTexture),Je(Z,w),w.mipmaps&&w.mipmaps.length>0)for(let ie=0;ie<w.mipmaps.length;ie++)Se(z.__webglFramebuffer[ie],P,w,s.COLOR_ATTACHMENT0,Z,ie);else Se(z.__webglFramebuffer,P,w,s.COLOR_ATTACHMENT0,Z,0);g(w)&&_(Z),t.unbindTexture()}P.depthBuffer&&te(P)}function le(P){let w=P.textures;for(let z=0,V=w.length;z<V;z++){let J=w[z];if(g(J)){let ce=M(P),de=i.get(J).__webglTexture;t.bindTexture(ce,de),_(ce),t.unbindTexture()}}}let he=[],ze=[];function Ne(P){if(P.samples>0){if(We(P)===!1){let w=P.textures,z=P.width,V=P.height,J=s.COLOR_BUFFER_BIT,ce=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=i.get(P),Z=w.length>1;if(Z)for(let me=0;me<w.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);let ie=P.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let me=0;me<w.length;me++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),Z){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,de.__webglColorRenderbuffer[me]);let Ie=i.get(w[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ie,0)}s.blitFramebuffer(0,0,z,V,0,0,z,V,J,s.NEAREST),l===!0&&(he.length=0,ze.length=0,he.push(s.COLOR_ATTACHMENT0+me),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(he.push(ce),ze.push(ce),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ze)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Z)for(let me=0;me<w.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,de.__webglColorRenderbuffer[me]);let Ie=i.get(w[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,Ie,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let w=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function He(P){return Math.min(n.maxSamples,P.samples)}function We(P){let w=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function N(P){let w=a.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function ut(P,w){let z=P.colorSpace,V=P.format,J=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==pi&&z!==Wn&&($e.getTransfer(z)===mt?(V!==bi||J!==hi)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",z)),w}function Ze(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.getTextureUnits=L,this.setTextureUnits=U,this.setTexture2D=K,this.setTexture2DArray=G,this.setTexture3D=j,this.setTextureCube=$,this.rebindTextures=re,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=We,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fy(s,e){function t(i,n=Wn){let r,a=$e.getTransfer(n);if(i===hi)return s.UNSIGNED_BYTE;if(i===Zl)return s.UNSIGNED_SHORT_4_4_4_4;if(i===$l)return s.UNSIGNED_SHORT_5_5_5_1;if(i===bu)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===xu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===mu)return s.BYTE;if(i===gu)return s.SHORT;if(i===Dr)return s.UNSIGNED_SHORT;if(i===Jl)return s.INT;if(i===tn)return s.UNSIGNED_INT;if(i===Ii)return s.FLOAT;if(i===jt)return s.HALF_FLOAT;if(i===vu)return s.ALPHA;if(i===_u)return s.RGB;if(i===bi)return s.RGBA;if(i===fn)return s.DEPTH_COMPONENT;if(i===Mn)return s.DEPTH_STENCIL;if(i===Ql)return s.RED;if(i===ec)return s.RED_INTEGER;if(i===os)return s.RG;if(i===tc)return s.RG_INTEGER;if(i===ic)return s.RGBA_INTEGER;if(i===oo||i===lo||i===co||i===ho)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===oo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===oo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===lo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nc||i===sc||i===rc||i===ac)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===nc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oc||i===lc||i===cc||i===hc||i===uc||i===uo||i===dc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oc||i===lc)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===cc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===hc)return r.COMPRESSED_R11_EAC;if(i===uc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===uo)return r.COMPRESSED_RG11_EAC;if(i===dc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fc||i===pc||i===mc||i===gc||i===bc||i===xc||i===vc||i===_c||i===yc||i===Mc||i===Sc||i===wc||i===Ec||i===Tc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===mc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_c)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ec)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ac||i===Rc||i===Cc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ac)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pc||i===Ic||i===fo||i===Dc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Pc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===as?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}var py=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,my=`
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

}`,Vu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ra(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new It({vertexShader:py,fragmentShader:my,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Ba(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wu=class extends pn{constructor(e,t){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,x=typeof XRWebGLBinding<"u",m=new Vu,g={},_=t.getContextAttributes(),M=null,b=null,y=[],S=[],R=new ne,v=null,E=null,T=new qt;T.viewport=new _t;let C=new qt;C.viewport=new _t;let D=[T,C],F=new ql,L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=y[Y];return Q===void 0&&(Q=new gr,y[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=y[Y];return Q===void 0&&(Q=new gr,y[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=y[Y];return Q===void 0&&(Q=new gr,y[Y]=Q),Q.getHandSpace()};function H(Y){let Q=S.indexOf(Y.inputSource);if(Q===-1)return;let ue=y[Q];ue!==void 0&&(ue.update(Y.inputSource,Y.frame,c||a),ue.dispatchEvent({type:Y.type,data:Y.inputSource}))}function B(){n.removeEventListener("select",H),n.removeEventListener("selectstart",H),n.removeEventListener("selectend",H),n.removeEventListener("squeeze",H),n.removeEventListener("squeezestart",H),n.removeEventListener("squeezeend",H),n.removeEventListener("end",B),n.removeEventListener("inputsourceschange",K);for(let Y=0;Y<y.length;Y++){let Q=S[Y];Q!==null&&(S[Y]=null,y[Y].disconnect(Q))}L=null,U=null,m.reset();for(let Y in g)delete g[Y];if(e.setRenderTarget(M),f=null,d=null,u=null,n=null,b=null,nt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),E!==null){let Y=E.camera;Y.fov=E.fov,Y.zoom=E.zoom,Y.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(n,t)),u},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(Y){if(n=Y,n!==null){if(M=e.getRenderTarget(),n.addEventListener("select",H),n.addEventListener("selectstart",H),n.addEventListener("selectend",H),n.addEventListener("squeeze",H),n.addEventListener("squeezestart",H),n.addEventListener("squeezeend",H),n.addEventListener("end",B),n.addEventListener("inputsourceschange",K),_.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Fe=null,Se=null;_.depth&&(Se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=_.stencil?Mn:fn,Fe=_.stencil?as:tn);let Ge={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ge),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new kt(d.textureWidth,d.textureHeight,{format:bi,type:hi,depthTexture:new xn(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ue={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,t,ue),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new kt(f.framebufferWidth,f.framebufferHeight,{format:bi,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),nt.setContext(n),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function K(Y){for(let Q=0;Q<Y.removed.length;Q++){let ue=Y.removed[Q],Fe=S.indexOf(ue);Fe>=0&&(S[Fe]=null,y[Fe].disconnect(ue))}for(let Q=0;Q<Y.added.length;Q++){let ue=Y.added[Q],Fe=S.indexOf(ue);if(Fe===-1){for(let Ge=0;Ge<y.length;Ge++)if(Ge>=S.length){S.push(ue),Fe=Ge;break}else if(S[Ge]===null){S[Ge]=ue,Fe=Ge;break}if(Fe===-1)break}let Se=y[Fe];Se&&Se.connect(ue)}}let G=new I,j=new I;function $(Y,Q,ue){G.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(ue.matrixWorld);let Fe=G.distanceTo(j),Se=Q.projectionMatrix.elements,Ge=ue.projectionMatrix.elements,dt=Se[14]/(Se[10]-1),te=Se[14]/(Se[10]+1),re=(Se[9]+1)/Se[5],oe=(Se[9]-1)/Se[5],le=(Se[8]-1)/Se[0],he=(Ge[8]+1)/Ge[0],ze=dt*le,Ne=dt*he,He=Fe/(-le+he),We=He*-le;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(We),Y.translateZ(He),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Se[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let N=dt+He,ut=te+He,Ze=ze-We,P=Ne+(Fe-We),w=re*te/ut*N,z=oe*te/ut*N;Y.projectionMatrix.makePerspective(Ze,P,w,z,N,ut),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ye(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(n===null)return;let Q=Y.near,ue=Y.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),F.near=C.near=T.near=Q,F.far=C.far=T.far=ue,(L!==F.near||U!==F.far)&&(n.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,U=F.far),F.layers.mask=Y.layers.mask|6,T.layers.mask=F.layers.mask&-5,C.layers.mask=F.layers.mask&-3;let Fe=Y.parent,Se=F.cameras;ye(F,Fe);for(let Ge=0;Ge<Se.length;Ge++)ye(Se[Ge],Fe);Se.length===2?$(F,T,C):F.projectionMatrix.copy(T.projectionMatrix),E===null&&Y.isPerspectiveCamera&&(E={camera:Y,fov:Y.fov,zoom:Y.zoom}),xe(Y,F,Fe)};function xe(Y,Q,ue){ue===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(ue.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ms*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return g[Y]};let ct=null;function Je(Y,Q){if(h=Q.getViewerPose(c||a),p=Q,h!==null){let ue=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let Fe=!1;ue.length!==F.cameras.length&&(F.cameras.length=0,Fe=!0);for(let te=0;te<ue.length;te++){let re=ue[te],oe=null;if(f!==null)oe=f.getViewport(re);else{let he=u.getViewSubImage(d,re);oe=he.viewport,te===0&&(e.setRenderTargetTextures(b,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(b))}let le=D[te];le===void 0&&(le=new qt,le.layers.enable(te),le.viewport=new _t,D[te]=le),le.matrix.fromArray(re.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(re.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(oe.x,oe.y,oe.width,oe.height),te===0&&(F.matrix.copy(le.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Fe===!0&&F.cameras.push(le)}let Se=n.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){u=i.getBinding();let te=u.getDepthInformation(ue[0]);te&&te.isValid&&te.texture&&m.init(te,n.renderState)}if(Se&&Se.includes("camera-access")&&x){e.state.unbindTexture(),u=i.getBinding();for(let te=0;te<ue.length;te++){let re=ue[te].camera;if(re){let oe=g[re];oe||(oe=new Ra,g[re]=oe);let le=u.getCameraImage(re);oe.sourceTexture=le}}}}for(let ue=0;ue<y.length;ue++){let Fe=S[ue],Se=y[ue];Fe!==null&&Se!==void 0&&Se.update(Fe,Q,c||a)}ct&&ct(Y,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),p=null}let nt=new Wp;nt.setAnimationLoop(Je),this.setAnimationLoop=function(Y){ct=Y},this.dispose=function(){}}},gy=new Ue,Jp=new Ke;Jp.set(-1,0,0,0,1,0,0,0,1);function by(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Tu(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function n(m,g,_,M,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,b)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,_,M):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===ii&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===ii&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let _=e.get(g),M=_.envMap,b=_.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(gy.makeRotationFromEuler(b)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Jp),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,_,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=M*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,_){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===ii&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let _=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function xy(s,e,t,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,y){let S=y.program;i.uniformBlockBinding(b,S)}function c(b,y){let S=n[b.id];S===void 0&&(m(b),S=h(b),n[b.id]=S,b.addEventListener("dispose",_));let R=y.program;i.updateUBOMapping(b,R);let v=e.render.frame;r[b.id]!==v&&(d(b),r[b.id]=v)}function h(b){let y=u();b.__bindingPointIndex=y;let S=s.createBuffer(),R=b.__size,v=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,R,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,S),S}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let y=n[b.id],S=b.uniforms,R=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let v=0,E=S.length;v<E;v++){let T=S[v];if(Array.isArray(T))for(let C=0,D=T.length;C<D;C++)f(T[C],v,C,R);else f(T,v,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(b,y,S,R){if(x(b,y,S,R)===!0){let v=b.__offset,E=b.value;if(Array.isArray(E)){let T=0;for(let C=0;C<E.length;C++){let D=E[C],F=g(D);p(D,b.__data,T),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(T+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,b.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,b.__data)}}function p(b,y,S){typeof b=="number"||typeof b=="boolean"?y[0]=b:b.isMatrix3?(y[0]=b.elements[0],y[1]=b.elements[1],y[2]=b.elements[2],y[3]=0,y[4]=b.elements[3],y[5]=b.elements[4],y[6]=b.elements[5],y[7]=0,y[8]=b.elements[6],y[9]=b.elements[7],y[10]=b.elements[8],y[11]=0):ArrayBuffer.isView(b)?y.set(new b.constructor(b.buffer,b.byteOffset,y.length)):b.toArray(y,S)}function x(b,y,S,R){let v=b.value,E=y+"_"+S;if(R[E]===void 0)return typeof v=="number"||typeof v=="boolean"?R[E]=v:ArrayBuffer.isView(v)?R[E]=v.slice():R[E]=v.clone(),!0;{let T=R[E];if(typeof v=="number"||typeof v=="boolean"){if(T!==v)return R[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(T.equals(v)===!1)return T.copy(v),!0}}return!1}function m(b){let y=b.uniforms,S=0,R=16;for(let E=0,T=y.length;E<T;E++){let C=Array.isArray(y[E])?y[E]:[y[E]];for(let D=0,F=C.length;D<F;D++){let L=C[D],U=Array.isArray(L.value)?L.value:[L.value];for(let H=0,B=U.length;H<B;H++){let K=U[H],G=g(K),j=S%R,$=j%G.boundary,ye=j+$;S+=$,ye!==0&&R-ye<G.storage&&(S+=R-ye),L.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=S,S+=G.storage}}}let v=S%R;return v>0&&(S+=R-v),b.__size=S,b.__cache={},this}function g(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(y.boundary=16,y.storage=b.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",b),y}function _(b){let y=b.target;y.removeEventListener("dispose",_);let S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(n[y.id]),delete n[y.id],delete r[y.id]}function M(){for(let b in n)s.deleteBuffer(n[b]);a=[],n={},r={}}return{bind:l,update:c,dispose:M}}var vy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Sn=null;function _y(){return Sn===null&&(Sn=new mn(vy,16,16,os,jt),Sn.name="DFG_LUT",Sn.minFilter=Ot,Sn.magFilter=Ot,Sn.wrapS=ki,Sn.wrapT=ki,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}var Oc=class{constructor(e={}){let{canvas:t=dp(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=hi}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let x=f,m=new Set([ic,tc,ec]),g=new Set([hi,tn,Dr,as,Zl,$l]),_=new Uint32Array(4),M=new Int32Array(4),b=new I,y=null,S=null,R=[],v=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,C=!1,D=null,F=null,L=null,U=null;this._outputColorSpace=Ut;let H=0,B=0,K=null,G=-1,j=null,$=new _t,ye=new _t,xe=null,ct=new Be(0),Je=0,nt=t.width,Y=t.height,Q=1,ue=null,Fe=null,Se=new _t(0,0,nt,Y),Ge=new _t(0,0,nt,Y),dt=!1,te=new gn,re=!1,oe=!1,le=new Ue,he=new I,ze=new _t,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function We(){return K===null?Q:1}let N=i;function ut(A,O){return t.getContext(A,O)}let Ze,P,w,z,V,J,ce,de,Z,ie,me,Ie,pe,fe,Ae,Oe,qe,k,ge,ee,be,we,se;try{let A={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",bt,!1),t.addEventListener("webglcontextcreationerror",Vi,!1),N===null){let O="webgl2";if(N=ut(O,A),N===null)throw ut(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ke()}catch(A){throw t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",bt,!1),t.removeEventListener("webglcontextcreationerror",Vi,!1),Ve("WebGLRenderer: "+A.message),A}function ke(){Ze=new Av(N),Ze.init(),be=new fy(N,Ze),P=new bv(N,Ze,e,be),w=new uy(N,Ze),P.reversedDepthBuffer&&d&&w.buffers.depth.setReversed(!0),F=N.createFramebuffer(),L=N.createFramebuffer(),U=N.createFramebuffer(),z=new Pv(N),V=new Z_,J=new dy(N,Ze,w,V,P,be,z),ce=new Tv(T),de=new D0(N),we=new mv(N,de),Z=new Rv(N,de,z,we),ie=new Dv(N,Z,de,we,z),k=new Iv(N,P,J),Ae=new xv(V),me=new J_(T,ce,Ze,P,we,Ae),Ie=new by(T,V),pe=new Q_,fe=new ry(Ze),qe=new pv(T,ce,w,ie,p,l),Oe=new hy(T,ie,P),se=new xy(N,z,P,w),ge=new gv(N,Ze,z),ee=new Cv(N,Ze,z),z.programs=me.programs,T.capabilities=P,T.extensions=Ze,T.properties=V,T.renderLists=pe,T.shadowMap=Oe,T.state=w,T.info=z}x!==hi&&(E=new Fv(x,t.width,t.height,o,n,r));let Pe=new Wu(T,N);this.xr=Pe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let A=Ze.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Ze.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(A){A!==void 0&&(Q=A,this.setSize(nt,Y,!1))},this.getSize=function(A){return A.set(nt,Y)},this.setSize=function(A,O,X=!0){if(Pe.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}nt=A,Y=O,t.width=Math.floor(A*Q),t.height=Math.floor(O*Q),X===!0&&(t.style.width=A+"px",t.style.height=O+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(nt*Q,Y*Q).floor()},this.setDrawingBufferSize=function(A,O,X){nt=A,Y=O,Q=X,t.width=Math.floor(A*X),t.height=Math.floor(O*X),this.setViewport(0,0,A,O)},this.setEffects=function(A){if(x===hi){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let O=0;O<A.length;O++)if(A[O].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy($)},this.getViewport=function(A){return A.copy(Se)},this.setViewport=function(A,O,X,W){A.isVector4?Se.set(A.x,A.y,A.z,A.w):Se.set(A,O,X,W),w.viewport($.copy(Se).multiplyScalar(Q).round())},this.getScissor=function(A){return A.copy(Ge)},this.setScissor=function(A,O,X,W){A.isVector4?Ge.set(A.x,A.y,A.z,A.w):Ge.set(A,O,X,W),w.scissor(ye.copy(Ge).multiplyScalar(Q).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(A){w.setScissorTest(dt=A)},this.setOpaqueSort=function(A){ue=A},this.setTransparentSort=function(A){Fe=A},this.getClearColor=function(A){return A.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(A=!0,O=!0,X=!0){let W=0;if(A){let q=!1;if(K!==null){let Me=K.texture.format;q=m.has(Me)}if(q){let Me=K.texture.type,Te=g.has(Me),_e=qe.getClearColor(),Re=qe.getClearAlpha(),De=_e.r,et=_e.g,rt=_e.b;Te?(_[0]=De,_[1]=et,_[2]=rt,_[3]=Re,N.clearBufferuiv(N.COLOR,0,_)):(M[0]=De,M[1]=et,M[2]=rt,M[3]=Re,N.clearBufferiv(N.COLOR,0,M))}else W|=N.COLOR_BUFFER_BIT}O&&(W|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),D=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",bt,!1),t.removeEventListener("webglcontextcreationerror",Vi,!1),qe.dispose(),pe.dispose(),fe.dispose(),V.dispose(),ce.dispose(),ie.dispose(),we.dispose(),se.dispose(),me.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Nd),Pe.removeEventListener("sessionend",Ud),ps.stop()};function Et(A){A.preventDefault(),ba("WebGLRenderer: Context Lost."),C=!0}function bt(){ba("WebGLRenderer: Context Restored."),C=!1;let A=z.autoReset,O=Oe.enabled,X=Oe.autoUpdate,W=Oe.needsUpdate,q=Oe.type;ke(),z.autoReset=A,Oe.enabled=O,Oe.autoUpdate=X,Oe.needsUpdate=W,Oe.type=q}function Vi(A){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ln(A){let O=A.target;O.removeEventListener("dispose",ln),jm(O)}function jm(A){Km(A),V.remove(A)}function Km(A){let O=V.get(A).programs;O!==void 0&&(O.forEach(function(X){me.releaseProgram(X)}),A.isShaderMaterial&&me.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,X,W,q,Me){O===null&&(O=Ne);let Te=q.isMesh&&q.matrixWorld.determinantAffine()<0,_e=Zm(A,O,X,W,q);w.setMaterial(W,Te);let Re=X.index,De=1;if(W.wireframe===!0){if(Re=Z.getWireframeAttribute(X),Re===void 0)return;De=2}let et=X.drawRange,rt=X.attributes.position,Ce=et.start*De,xt=(et.start+et.count)*De;Me!==null&&(Ce=Math.max(Ce,Me.start*De),xt=Math.min(xt,(Me.start+Me.count)*De)),Re!==null?(Ce=Math.max(Ce,0),xt=Math.min(xt,Re.count)):rt!=null&&(Ce=Math.max(Ce,0),xt=Math.min(xt,rt.count));let Vt=xt-Ce;if(Vt<0||Vt===1/0)return;we.setup(q,W,_e,X,Re);let At,Mt=ge;if(Re!==null&&(At=de.get(Re),Mt=ee,Mt.setIndex(At)),q.isMesh)W.wireframe===!0?(w.setLineWidth(W.wireframeLinewidth*We()),Mt.setMode(N.LINES)):Mt.setMode(N.TRIANGLES);else if(q.isLine){let ai=W.linewidth;ai===void 0&&(ai=1),w.setLineWidth(ai*We()),q.isLineSegments?Mt.setMode(N.LINES):q.isLineLoop?Mt.setMode(N.LINE_LOOP):Mt.setMode(N.LINE_STRIP)}else q.isPoints?Mt.setMode(N.POINTS):q.isSprite&&Mt.setMode(N.TRIANGLES);if(q.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))Mt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let ai=q._multiDrawStarts,Ee=q._multiDrawCounts,di=q._multiDrawCount,ft=Re?de.get(Re).bytesPerElement:1,Ui=V.get(W).currentProgram.getUniforms();for(let cn=0;cn<di;cn++)Ui.setValue(N,"_gl_DrawID",cn),Mt.render(ai[cn]/ft,Ee[cn])}else if(q.isInstancedMesh)Mt.renderInstances(Ce,Vt,q.count);else if(X.isInstancedBufferGeometry){let ai=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ee=Math.min(X.instanceCount,ai);Mt.renderInstances(Ce,Vt,Ee)}else Mt.render(Ce,Vt)};function Fd(A,O,X,W){D!==null&&A.isNodeMaterial&&D.setObject(W,A),re===!0&&Ae.setState(A,X,!1),A.transparent===!0&&A.side===Dt&&A.forceSinglePass===!1?(A.side=ii,A.needsUpdate=!0,zo(A,O,W),A.side=zi,A.needsUpdate=!0,zo(A,O,W),A.side=Dt):zo(A,O,W)}this.compile=function(A,O,X=null){X===null&&(X=A),D!==null&&D.renderStart(A,O,X),S=fe.get(X),S.init(O),v.push(S),X.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(S.pushLight(q),q.castShadow&&S.pushShadow(q))}),A!==X&&A.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(S.pushLight(q),q.castShadow&&S.pushShadow(q))}),S.setupLights(),D!==null&&D.updateLights(S.state.lightsArray),oe=this.localClippingEnabled,re=Ae.init(this.clippingPlanes,oe),re===!0&&Ae.setGlobalState(this.clippingPlanes,O),D!==null&&Oe.render(S.state.shadowsArray,X,O);let W=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Me=q.material;if(Me)if(Array.isArray(Me))for(let Te=0;Te<Me.length;Te++){let _e=Me[Te];Fd(_e,X,O,q),W.add(_e)}else Fd(Me,X,O,q),W.add(Me)}),S=v.pop(),D!==null&&D.renderEnd(),W},this.compileAsync=function(A,O,X=null){let W=this.compile(A,O,X);return new Promise(q=>{function Me(){if(W.forEach(function(Te){let Re=V.get(Te).currentProgram;(Re===void 0||Re.isReady())&&W.delete(Te)}),W.size===0){q(A);return}setTimeout(Me,10)}Ze.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let gh=null;function Ym(A){gh&&gh(A)}function Nd(){ps.stop()}function Ud(){ps.start()}let ps=new Wp;ps.setAnimationLoop(Ym),typeof self<"u"&&ps.setContext(self),this.setAnimationLoop=function(A){gh=A,Pe.setAnimationLoop(A),A===null?ps.stop():ps.start()},Pe.addEventListener("sessionstart",Nd),Pe.addEventListener("sessionend",Ud),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;D!==null&&D.renderStart(A,O);let X=Pe.enabled===!0&&Pe.isPresenting===!0,W=E!==null&&(K===null||X)&&E.begin(T,K);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(O),O=Pe.getCamera()),A.isScene===!0&&A.onBeforeRender(T,A,O,K),S=fe.get(A,v.length),S.init(O),S.state.textureUnits=J.getTextureUnits(),v.push(S),le.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),te.setFromProjectionMatrix(le,Yi,O.reversedDepth),oe=this.localClippingEnabled,re=Ae.init(this.clippingPlanes,oe),y=pe.get(A,R.length),y.init(),R.push(y),Pe.enabled===!0&&Pe.isPresenting===!0){let Te=T.xr.getDepthSensingMesh();Te!==null&&bh(Te,O,-1/0,T.sortObjects)}bh(A,O,0,T.sortObjects),y.finish(),D!==null&&D.updateLights(S.state.lightsArray),T.sortObjects===!0&&y.sort(ue,Fe),He=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,He&&qe.addToRenderList(y,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),re===!0&&Ae.beginShadows();let q=S.state.shadowsArray;if(Oe.render(q,A,O),re===!0&&Ae.endShadows(),(W&&E.hasRenderPass())===!1){let Te=y.opaque,_e=y.transmissive;if(S.setupLights(),O.isArrayCamera){let Re=O.cameras;if(_e.length>0)for(let De=0,et=Re.length;De<et;De++){let rt=Re[De];kd(Te,_e,A,rt)}He&&qe.render(A);for(let De=0,et=Re.length;De<et;De++){let rt=Re[De];Od(y,A,rt,rt.viewport)}}else _e.length>0&&kd(Te,_e,A,O),He&&qe.render(A),Od(y,A,O)}K!==null&&B===0&&(J.updateMultisampleRenderTarget(K),J.updateRenderTargetMipmap(K)),W&&E.end(T),A.isScene===!0&&A.onAfterRender(T,A,O),we.resetDefaultState(),G=-1,j=null,v.pop(),v.length>0?(S=v[v.length-1],J.setTextureUnits(S.state.textureUnits),re===!0&&Ae.setGlobalState(T.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?y=R[R.length-1]:y=null,D!==null&&D.renderEnd()};function bh(A,O,X,W){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(te)){W&&ze.setFromMatrixPosition(A.matrixWorld).applyMatrix4(le);let Te=ie.update(A),_e=A.material;_e.visible&&y.push(A,Te,_e,X,ze.z,null,O)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(te))){let Te=ie.update(A),_e=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ze.copy(A.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ze.copy(Te.boundingSphere.center)),ze.applyMatrix4(A.matrixWorld).applyMatrix4(le)),Array.isArray(_e)){let Re=Te.groups;for(let De=0,et=Re.length;De<et;De++){let rt=Re[De],Ce=_e[rt.materialIndex];Ce&&Ce.visible&&y.push(A,Te,Ce,X,ze.z,rt,O)}}else _e.visible&&y.push(A,Te,_e,X,ze.z,null,O)}}let Me=A.children;for(let Te=0,_e=Me.length;Te<_e;Te++)bh(Me[Te],O,X,W)}function Od(A,O,X,W){let{opaque:q,transmissive:Me,transparent:Te}=A;S.setupLightsView(X),re===!0&&Ae.setGlobalState(T.clippingPlanes,X),W&&w.viewport($.copy(W)),q.length>0&&Bo(q,O,X),Me.length>0&&Bo(Me,O,X),Te.length>0&&Bo(Te,O,X),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function kd(A,O,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[W.id]===void 0){let Ce=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[W.id]=new kt(1,1,{generateMipmaps:!0,type:Ce?jt:hi,minFilter:en,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}let Me=S.state.transmissionRenderTarget[W.id],Te=W.viewport||$;Me.setSize(Te.z*T.transmissionResolutionScale,Te.w*T.transmissionResolutionScale);let _e=T.getRenderTarget(),Re=T.getActiveCubeFace(),De=T.getActiveMipmapLevel();T.setRenderTarget(Me),T.getClearColor(ct),Je=T.getClearAlpha(),Je<1&&T.setClearColor(16777215,.5),T.clear(),He&&qe.render(X);let et=T.toneMapping;T.toneMapping=Qi;let rt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),S.setupLightsView(W),re===!0&&Ae.setGlobalState(T.clippingPlanes,W),Bo(A,X,W),J.updateMultisampleRenderTarget(Me),J.updateRenderTargetMipmap(Me),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let xt=0,Vt=O.length;xt<Vt;xt++){let At=O[xt],{object:Mt,geometry:ai,material:Ee,group:di}=At;if(Ee.side===Dt&&Mt.layers.test(W.layers)){let ft=Ee.side;Ee.side=ii,Ee.needsUpdate=!0,Bd(Mt,X,W,ai,Ee,di),Ee.side=ft,Ee.needsUpdate=!0,Ce=!0}}Ce===!0&&(J.updateMultisampleRenderTarget(Me),J.updateRenderTargetMipmap(Me))}T.setRenderTarget(_e,Re,De),T.setClearColor(ct,Je),rt!==void 0&&(W.viewport=rt),T.toneMapping=et}function Bo(A,O,X){let W=O.isScene===!0?O.overrideMaterial:null;for(let q=0,Me=A.length;q<Me;q++){let Te=A[q],{object:_e,geometry:Re,group:De}=Te,et=Te.material;et.allowOverride===!0&&W!==null&&(et=W),_e.layers.test(X.layers)&&Bd(_e,O,X,Re,et,De)}}function Bd(A,O,X,W,q,Me){D!==null&&q.isNodeMaterial&&D.setObject(A,q),A.onBeforeRender(T,O,X,W,q,Me),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(T,O,X,W,A,Me),q.transparent===!0&&q.side===Dt&&q.forceSinglePass===!1?(q.side=ii,q.needsUpdate=!0,T.renderBufferDirect(X,O,W,q,A,Me),q.side=zi,q.needsUpdate=!0,T.renderBufferDirect(X,O,W,q,A,Me),q.side=Dt):T.renderBufferDirect(X,O,W,q,A,Me),A.onAfterRender(T,O,X,W,q,Me)}function zo(A,O,X){O.isScene!==!0&&(O=Ne);let W=V.get(A),q=S.state.lights,Me=S.state.shadowsArray,Te=q.state.version,_e=me.getParameters(A,q.state,Me,O,X,S.state.lightProbeGridArray),Re=me.getProgramCacheKey(_e),De=W.programs;W.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?O.environment:null,W.fog=O.fog;let et=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;W.envMap=ce.get(A.envMap||W.environment,et),W.envMapRotation=W.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,De===void 0&&(A.addEventListener("dispose",ln),De=new Map,W.programs=De);let rt=De.get(Re);if(rt!==void 0){if(W.currentProgram===rt&&W.lightsStateVersion===Te)return Gd(A,_e),rt}else _e.uniforms=me.getUniforms(A),D!==null&&A.isNodeMaterial&&D.build(A,X,_e),A.onBeforeCompile(_e,T),rt=me.acquireProgram(_e,Re),De.set(Re,rt),W.uniforms=_e.uniforms;let Ce=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ce.clippingPlanes=Ae.uniform),Gd(A,_e),W.needsLights=Qm(A),W.lightsStateVersion=Te,W.needsLights&&(Ce.ambientLightColor.value=q.state.ambient,Ce.lightProbe.value=q.state.probe,Ce.sunLights.value=q.state.sun,Ce.sunLightShadows.value=q.state.sunShadow,Ce.directionalLights.value=q.state.directional,Ce.directionalLightShadows.value=q.state.directionalShadow,Ce.spotLights.value=q.state.spot,Ce.spotLightShadows.value=q.state.spotShadow,Ce.rectAreaLights.value=q.state.rectArea,Ce.ltc_1.value=q.state.rectAreaLTC1,Ce.ltc_2.value=q.state.rectAreaLTC2,Ce.pointLights.value=q.state.point,Ce.pointLightShadows.value=q.state.pointShadow,Ce.hemisphereLights.value=q.state.hemi,Ce.sunShadowMatrix.value=q.state.sunShadowMatrix,Ce.sunShadowCascade.value=q.state.sunShadowCascade,Ce.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ce.spotLightMatrix.value=q.state.spotLightMatrix,Ce.spotLightMap.value=q.state.spotLightMap,Ce.pointShadowMatrix.value=q.state.pointShadowMatrix),W.lightProbeGrid=S.state.lightProbeGridArray.length>0,W.currentProgram=rt,W.uniformsList=null,rt}function zd(A){if(A.uniformsList===null){let O=A.currentProgram.getUniforms();A.uniformsList=Ur.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function Gd(A,O){let X=V.get(A);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function Jm(A,O){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;b.setFromMatrixPosition(O.matrixWorld);for(let X=0,W=A.length;X<W;X++){let q=A[X];if(q.texture!==null&&q.boundingBox.containsPoint(b))return q}return null}function Zm(A,O,X,W,q){O.isScene!==!0&&(O=Ne),J.resetTextureUnits();let Me=O.fog,Te=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?O.environment:null,_e=K===null?T.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:$e.workingColorSpace,Re=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,De=ce.get(W.envMap||Te,Re),et=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,rt=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ce=!!X.morphAttributes.position,xt=!!X.morphAttributes.normal,Vt=!!X.morphAttributes.color,At=Qi;W.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(At=T.toneMapping);let Mt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ai=Mt!==void 0?Mt.length:0,Ee=V.get(W),di=S.state.lights;if(re===!0&&(oe===!0||A!==j)){let Tt=A===j&&W.id===G;Ae.setState(W,A,Tt)}let ft=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==di.state.version||Ee.outputColorSpace!==_e||q.isBatchedMesh&&Ee.batching===!1||!q.isBatchedMesh&&Ee.batching===!0||q.isBatchedMesh&&Ee.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Ee.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Ee.instancing===!1||!q.isInstancedMesh&&Ee.instancing===!0||q.isSkinnedMesh&&Ee.skinning===!1||!q.isSkinnedMesh&&Ee.skinning===!0||q.isInstancedMesh&&Ee.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ee.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ee.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ee.instancingMorph===!1&&q.morphTexture!==null||Ee.envMap!==De||W.fog===!0&&Ee.fog!==Me||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ae.numPlanes||Ee.numIntersection!==Ae.numIntersection)||Ee.vertexAlphas!==et||Ee.vertexTangents!==rt||Ee.morphTargets!==Ce||Ee.morphNormals!==xt||Ee.morphColors!==Vt||Ee.toneMapping!==At||Ee.morphTargetsCount!==ai||!!Ee.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ee.__version=W.version);let Ui=Ee.currentProgram;ft===!0&&(Ui=zo(W,O,q),D&&W.isNodeMaterial&&D.onUpdateProgram(W,Ui,Ee));let cn=!1,Xn=!1,Xs=!1,yt=Ui.getUniforms(),Nt=Ee.uniforms;if(w.useProgram(Ui.program)&&(cn=!0,Xn=!0,Xs=!0),W.id!==G&&(G=W.id,Xn=!0),Ee.needsLights){let Tt=Jm(S.state.lightProbeGridArray,q);Ee.lightProbeGrid!==Tt&&(Ee.lightProbeGrid=Tt,Xn=!0)}if(cn||j!==A){w.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),yt.setValue(N,"projectionMatrix",A.projectionMatrix),yt.setValue(N,"viewMatrix",A.matrixWorldInverse);let Kn=yt.map.cameraPosition;Kn!==void 0&&Kn.setValue(N,he.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&yt.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&yt.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),j!==A&&(j=A,Xn=!0,Xs=!0)}if(Ee.needsLights&&(di.state.sunShadowMap.length>0&&yt.setValue(N,"sunShadowMap",di.state.sunShadowMap,J),di.state.directionalShadowMap.length>0&&yt.setValue(N,"directionalShadowMap",di.state.directionalShadowMap,J),di.state.spotShadowMap.length>0&&yt.setValue(N,"spotShadowMap",di.state.spotShadowMap,J),di.state.pointShadowMap.length>0&&yt.setValue(N,"pointShadowMap",di.state.pointShadowMap,J)),q.isSkinnedMesh){yt.setOptional(N,q,"bindMatrix"),yt.setOptional(N,q,"bindMatrixInverse");let Tt=q.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),yt.setValue(N,"boneTexture",Tt.boneTexture,J))}q.isBatchedMesh&&(yt.setOptional(N,q,"batchingTexture"),yt.setValue(N,"batchingTexture",q._matricesTexture,J),yt.setOptional(N,q,"batchingIdTexture"),yt.setValue(N,"batchingIdTexture",q._indirectTexture,J),yt.setOptional(N,q,"batchingColorTexture"),q._colorsTexture!==null&&yt.setValue(N,"batchingColorTexture",q._colorsTexture,J));let jn=X.morphAttributes;if((jn.position!==void 0||jn.normal!==void 0||jn.color!==void 0)&&k.update(q,X,Ui),(Xn||Ee.receiveShadow!==q.receiveShadow)&&(Ee.receiveShadow=q.receiveShadow,yt.setValue(N,"receiveShadow",q.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&O.environment!==null&&(Nt.envMapIntensity.value=O.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=_y()),Xn){if(yt.setValue(N,"toneMappingExposure",T.toneMappingExposure),Ee.needsLights&&$m(Nt,Xs),Me&&W.fog===!0&&Ie.refreshFogUniforms(Nt,Me),Ie.refreshMaterialUniforms(Nt,W,Q,Y,S.state.transmissionRenderTarget[A.id]),Ee.needsLights&&Ee.lightProbeGrid){let Tt=Ee.lightProbeGrid;Nt.probesSH.value=Tt.texture,Nt.probesMin.value.copy(Tt.boundingBox.min),Nt.probesMax.value.copy(Tt.boundingBox.max),Nt.probesResolution.value.copy(Tt.resolution)}Ur.upload(N,zd(Ee),Nt,J)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ur.upload(N,zd(Ee),Nt,J),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&yt.setValue(N,"center",q.center),yt.setValue(N,"modelViewMatrix",q.modelViewMatrix),yt.setValue(N,"normalMatrix",q.normalMatrix),yt.setValue(N,"modelMatrix",q.matrixWorld),W.uniformsGroups!==void 0){let Tt=W.uniformsGroups;for(let Kn=0,js=Tt.length;Kn<js;Kn++){let Vd=Tt[Kn];se.update(Vd,Ui),se.bind(Vd,Ui)}}return Ui}function $m(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.sunLights.needsUpdate=O,A.sunLightShadows.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function Qm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(A,O,X){let W=V.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),V.get(A.texture).__webglTexture=O,V.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:X,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,O){let X=V.get(A);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(A,O=0,X=0){K=A,H=O,B=X;let W=null,q=!1,Me=!1;if(A){let _e=V.get(A);if(_e.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(N.FRAMEBUFFER,_e.__webglFramebuffer),$.copy(A.viewport),ye.copy(A.scissor),xe=A.scissorTest,w.viewport($),w.scissor(ye),w.setScissorTest(xe),G=-1;return}else if(_e.__webglFramebuffer===void 0)J.setupRenderTarget(A);else if(_e.__hasExternalTextures)J.rebindTextures(A,V.get(A.texture).__webglTexture,V.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let et=A.depthTexture;if(_e.__boundDepthTexture!==et){if(et!==null&&V.has(et)&&(A.width!==et.image.width||A.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(A)}}let Re=A.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Me=!0);let De=V.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(De[O])?W=De[O][X]:W=De[O],q=!0):A.samples>0&&J.useMultisampledRTT(A)===!1?W=V.get(A).__webglMultisampledFramebuffer:Array.isArray(De)?W=De[X]:W=De,$.copy(A.viewport),ye.copy(A.scissor),xe=A.scissorTest}else $.copy(Se).multiplyScalar(Q).floor(),ye.copy(Ge).multiplyScalar(Q).floor(),xe=dt;if(X!==0&&(W=F),w.bindFramebuffer(N.FRAMEBUFFER,W)&&w.drawBuffers(A,W),w.viewport($),w.scissor(ye),w.setScissorTest(xe),q){let _e=V.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+O,_e.__webglTexture,X)}else if(Me){let _e=O;for(let Re=0;Re<A.textures.length;Re++){let De=V.get(A.textures[Re]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Re,De.__webglTexture,X,_e)}}else if(A!==null&&X!==0){let _e=V.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_e.__webglTexture,X)}G=-1};function Hd(A){let O=V.get(A);return(O.__readFormat!==A.format||O.__readType!==A.type)&&(O.__readFormat=A.format,O.__readType=A.type,O.__formatReadable=P.textureFormatReadable(A.format),O.__typeReadable=P.textureTypeReadable(A.type)),O}this.readRenderTargetPixels=function(A,O,X,W,q,Me,Te,_e=0){if(!(A&&A.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=V.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re){w.bindFramebuffer(N.FRAMEBUFFER,Re);try{let De=A.textures[_e],et=De.format,rt=De.type;A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_e);let Ce=Hd(De);if(Ce.__formatReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-W&&X>=0&&X<=A.height-q&&N.readPixels(O,X,W,q,be.convert(et),be.convert(rt),Me)}finally{let De=K!==null?V.get(K).__webglFramebuffer:null;w.bindFramebuffer(N.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(A,O,X,W,q,Me,Te,_e=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=V.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re)if(O>=0&&O<=A.width-W&&X>=0&&X<=A.height-q){w.bindFramebuffer(N.FRAMEBUFFER,Re);let De=A.textures[_e],et=De.format,rt=De.type;A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_e);let Ce=Hd(De);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,xt),N.bufferData(N.PIXEL_PACK_BUFFER,Me.byteLength,N.STREAM_READ),N.readPixels(O,X,W,q,be.convert(et),be.convert(rt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let Vt=K!==null?V.get(K).__webglFramebuffer:null;w.bindFramebuffer(N.FRAMEBUFFER,Vt);let At=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await pp(N,At,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,xt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Me),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(xt),N.deleteSync(At),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,O=null,X=0){let W=Math.pow(2,-X),q=Math.floor(A.image.width*W),Me=Math.floor(A.image.height*W),Te=O!==null?O.x:0,_e=O!==null?O.y:0;J.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,Te,_e,q,Me),w.unbindTexture()},this.copyTextureToTexture=function(A,O,X=null,W=null,q=0,Me=0){let Te,_e,Re,De,et,rt,Ce,xt,Vt,At=A.isCompressedTexture?A.mipmaps[Me]:A.image;if(X!==null)Te=X.max.x-X.min.x,_e=X.max.y-X.min.y,Re=X.isBox3?X.max.z-X.min.z:1,De=X.min.x,et=X.min.y,rt=X.isBox3?X.min.z:0;else{let Nt=Math.pow(2,-q);Te=Math.floor(At.width*Nt),_e=Math.floor(At.height*Nt),A.isDataArrayTexture?Re=At.depth:A.isData3DTexture?Re=Math.floor(At.depth*Nt):Re=1,De=0,et=0,rt=0}W!==null?(Ce=W.x,xt=W.y,Vt=W.z):(Ce=0,xt=0,Vt=0);let Mt=be.convert(O.format),ai=be.convert(O.type),Ee;O.isData3DTexture?(J.setTexture3D(O,0),Ee=N.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(J.setTexture2DArray(O,0),Ee=N.TEXTURE_2D_ARRAY):(J.setTexture2D(O,0),Ee=N.TEXTURE_2D),w.activeTexture(N.TEXTURE0),w.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),w.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),w.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);let di=w.getParameter(N.UNPACK_ROW_LENGTH),ft=w.getParameter(N.UNPACK_IMAGE_HEIGHT),Ui=w.getParameter(N.UNPACK_SKIP_PIXELS),cn=w.getParameter(N.UNPACK_SKIP_ROWS),Xn=w.getParameter(N.UNPACK_SKIP_IMAGES);w.pixelStorei(N.UNPACK_ROW_LENGTH,At.width),w.pixelStorei(N.UNPACK_IMAGE_HEIGHT,At.height),w.pixelStorei(N.UNPACK_SKIP_PIXELS,De),w.pixelStorei(N.UNPACK_SKIP_ROWS,et),w.pixelStorei(N.UNPACK_SKIP_IMAGES,rt);let Xs=A.isDataArrayTexture||A.isData3DTexture,yt=O.isDataArrayTexture||O.isData3DTexture;if(A.isDepthTexture){let Nt=V.get(A),jn=V.get(O),Tt=V.get(Nt.__renderTarget),Kn=V.get(jn.__renderTarget);w.bindFramebuffer(N.READ_FRAMEBUFFER,Tt.__webglFramebuffer),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let js=0;js<Re;js++)Xs&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(A).__webglTexture,q,rt+js),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(O).__webglTexture,Me,Vt+js)),N.blitFramebuffer(De,et,Te,_e,Ce,xt,Te,_e,N.DEPTH_BUFFER_BIT,N.NEAREST);w.bindFramebuffer(N.READ_FRAMEBUFFER,null),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(q!==0||A.isRenderTargetTexture||V.has(A)){let Nt=V.get(A),jn=V.get(O);w.bindFramebuffer(N.READ_FRAMEBUFFER,L),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,U);for(let Tt=0;Tt<Re;Tt++)Xs?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Nt.__webglTexture,q,rt+Tt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Nt.__webglTexture,q),yt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,jn.__webglTexture,Me,Vt+Tt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,jn.__webglTexture,Me),q!==0?N.blitFramebuffer(De,et,Te,_e,Ce,xt,Te,_e,N.COLOR_BUFFER_BIT,N.NEAREST):yt?N.copyTexSubImage3D(Ee,Me,Ce,xt,Vt+Tt,De,et,Te,_e):N.copyTexSubImage2D(Ee,Me,Ce,xt,De,et,Te,_e);w.bindFramebuffer(N.READ_FRAMEBUFFER,null),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else yt?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(Ee,Me,Ce,xt,Vt,Te,_e,Re,Mt,ai,At.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(Ee,Me,Ce,xt,Vt,Te,_e,Re,Mt,At.data):N.texSubImage3D(Ee,Me,Ce,xt,Vt,Te,_e,Re,Mt,ai,At):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Me,Ce,xt,Te,_e,Mt,ai,At.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Me,Ce,xt,At.width,At.height,Mt,At.data):N.texSubImage2D(N.TEXTURE_2D,Me,Ce,xt,Te,_e,Mt,ai,At);w.pixelStorei(N.UNPACK_ROW_LENGTH,di),w.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ft),w.pixelStorei(N.UNPACK_SKIP_PIXELS,Ui),w.pixelStorei(N.UNPACK_SKIP_ROWS,cn),w.pixelStorei(N.UNPACK_SKIP_IMAGES,Xn),Me===0&&O.generateMipmaps&&N.generateMipmap(Ee),w.unbindTexture()},this.initRenderTarget=function(A){V.get(A).__webglFramebuffer===void 0&&J.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?J.setTextureCube(A,0):A.isData3DTexture?J.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?J.setTexture2DArray(A,0):J.setTexture2D(A,0),w.unbindTexture()},this.resetState=function(){H=0,B=0,K=null,w.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}};function En(s,e=!1){let t=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new ot,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Zp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);let p=Zp(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Zp(s){let e,t,i,n=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Rt(a,t,i),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let x=h.getComponent(d,p);o.setComponent(d+u,p,x)}}else a.set(h.array,l);l+=h.count*t}return n!==void 0&&(o.gpuType=n),o}function qu(s,e){if(e===yu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Lr||e===po){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let i=t.count-2,n=[];if(e===Lr)for(let r=1;r<=i;r++)n.push(t.getX(0)),n.push(t.getX(r)),n.push(t.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(n.push(t.getX(r)),n.push(t.getX(r+1)),n.push(t.getX(r+2))):(n.push(t.getX(r+2)),n.push(t.getX(r+1)),n.push(t.getX(r)));return n.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(n),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function $p(s){let e=new Map,t=new Map,i=s.clone();return Qp(s,i,function(n,r){e.set(r,n),t.set(n,r)}),i.traverse(function(n){if(!n.isSkinnedMesh)return;let r=n,a=e.get(n),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function Qp(s,e,t){t(s,e);for(let i=0;i<s.children.length;i++)Qp(s.children[i],e.children[i],t)}var zc=class extends _n{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new $u(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new ld(t)}),this.register(function(t){return new cd(t)}),this.register(function(t){return new hd(t)}),this.register(function(t){return new td(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new nd(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new Zu(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new od(t)}),this.register(function(t){return new ad(t)}),this.register(function(t){return new Yu(t)}),this.register(function(t){return new Gc(t,st.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Gc(t,st.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ud(t)})}load(e,t,i,n){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Vn.extractUrlBase(e);a=Vn.resolveURL(c,this.path)}else a=Vn.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){n?n(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Tr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===sm){try{a[st.KHR_BINARY_GLTF]=new dd(e)}catch(u){n&&n(u);return}r=JSON.parse(a[st.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new vd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case st.KHR_MATERIALS_UNLIT:a[u]=new Ju;break;case st.KHR_DRACO_MESH_COMPRESSION:a[u]=new fd(r,this.dracoLoader);break;case st.KHR_TEXTURE_TRANSFORM:a[u]=new pd;break;case st.KHR_MESH_QUANTIZATION:a[u]=new md;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,n)}parseAsync(e,t){let i=this;return new Promise(function(n,r){i.parse(e,t,n,r)})}};function yy(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Gt(s,e,t){let i=s.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var st={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Yu=class{constructor(e){this.parser=e,this.name=st.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,n=t.cache.get(i);if(n)return n;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Be(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],pi);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Cs(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Rs(h),c.distance=u;break;case"spot":c=new ja(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Tn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}},Ju=class{constructor(){this.name=st.KHR_MATERIALS_UNLIT}getMaterialType(){return Ri}extendParams(e,t,i){let n=[];e.color=new Be(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],pi),e.opacity=a[3]}r.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",r.baseColorTexture,Ut))}return Promise.all(n)}},Zu=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},$u=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(n.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(r,r)}return Promise.all(n)}},Qu=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},ed=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(n)}},td=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];if(t.sheenColor=new Be(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],pi)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Ut)),i.sheenRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(n)}},id=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&n.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(n)}},nd=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let r=i.attenuationColor||[1,1,1];return t.attenuationColor=new Be().setRGB(r[0],r[1],r[2],pi),Promise.all(n)}},sd=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IOR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},rd=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let r=i.specularColorFactor||[1,1,1];return t.specularColor=new Be().setRGB(r[0],r[1],r[2],pi),i.specularColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Ut)),Promise.all(n)}},ad=class{constructor(e){this.parser=e,this.name=st.EXT_MATERIALS_BUMP}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&n.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(n)}},od=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?vi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&n.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(n)}},ld=class{constructor(e){this.parser=e,this.name=st.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;let r=n.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},cd=class{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=n.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},hd=class{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=n.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},Gc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let n=i.extensions[this.name],r=this.parser.getDependency("buffer",n.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=n.byteOffset||0,c=n.byteLength||0,h=n.count,u=n.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,n.mode,n.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,n.mode,n.filter),f})})}else return null}},ud=class{constructor(e){this.name=st.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let n=t.meshes[i.mesh];for(let c of n.primitives)if(c.mode!==Hi.TRIANGLES&&c.mode!==Hi.TRIANGLE_STRIP&&c.mode!==Hi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let p of u){let x=new Ue,m=new I,g=new Ai,_=new I(1,1,1),M=new Sa(p.geometry,p.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),M.setMatrixAt(y,x.compose(m,g,_));let b=null;for(let y in l)if(y==="_COLOR_0"){let S=l[y];M.instanceColor=new On(S.array,S.itemSize,S.normalized)}else if(y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"){if(b===null){let R=M.geometry;b=new ot,b.name=R.name;for(let v in R.attributes)b.setAttribute(v,R.attributes[v]);for(let v in R.morphAttributes)b.morphAttributes[v]=R.morphAttributes[v];R.index!==null&&b.setIndex(R.index),b.morphTargetsRelative=R.morphTargetsRelative;for(let v of R.groups)b.addGroup(v.start,v.count,v.materialIndex);R.boundingBox!==null&&(b.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(b.boundingSphere=R.boundingSphere.clone()),b.drawRange.start=R.drawRange.start,b.drawRange.count=R.drawRange.count,b.userData=Object.assign({},R.userData),M.geometry=b}let S=l[y];b.setAttribute(y,new On(S.array,S.itemSize,S.normalized))}wt.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},sm="glTF",vo=12,em={JSON:1313821514,BIN:5130562},dd=class{constructor(e){this.name=st.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,vo),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==sm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let n=this.header.length-vo,r=new DataView(e,vo),a=0;for(;a<n;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===em.JSON){let c=new Uint8Array(e,vo+a,o);this.content=i.decode(c)}else if(l===em.BIN){let c=vo+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},fd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=st.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,n=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=bd[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=bd[h]||h.toLowerCase();if(a[h]!==void 0){let d=i.accessors[e.attributes[h]],f=zr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){n.decodeDracoFile(h,function(f){for(let p in f.attributes){let x=f.attributes[p],m=l[p];m!==void 0&&(x.normalized=m)}u(f)},o,c,pi,d)})})}},pd=class{constructor(){this.name=st.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let i=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},md=class{constructor(){this.name=st.KHR_MESH_QUANTIZATION}},Hc=class extends vn{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n*3+n;for(let a=0;a!==n;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,u=(i-t)/h,d=u*u,f=d*u,p=e*c,x=p-c,m=-2*f+3*d,g=f-d,_=1-m,M=g-d+u;for(let b=0;b!==o;b++){let y=a[x+b+o],S=a[x+b+l]*h,R=a[p+b+o],v=a[p+b]*h;r[b]=_*y+M*S+m*R+g*v}return r}},My=new Ai,gd=class extends Hc{interpolate_(e,t,i,n){let r=super.interpolate_(e,t,i,n);return My.fromArray(r).normalize().toArray(r),r}},Hi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},zr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tm={9728:Pt,9729:Ot,9984:Yl,9985:Ir,9986:Fs,9987:en},im={33071:ki,33648:hr,10497:xi},Xu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},bd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ls={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sy={CUBICSPLINE:void 0,LINEAR:ys,STEP:_s},ju={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wy(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Xt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zi})),s.DefaultMaterial}function ks(s,e,t){for(let i in t.extensions)s[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Tn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ey(s,e,t){let i=!1,n=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(n=!0),u.COLOR_0!==void 0&&(r=!0),i&&n&&r)break}if(!i&&!n&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(i){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(n){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return i&&(s.morphAttributes.position=h),n&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Ty(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)s.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ay(s){let e,t=s.extensions&&s.extensions[st.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ku(t.attributes):e=s.indices+":"+Ku(s.attributes)+":"+s.mode,s.targets!==void 0)for(let i=0,n=s.targets.length;i<n;i++)e+=":"+Ku(s.targets[i]);return e}function Ku(s){let e="",t=Object.keys(s).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+s[t[i]]+";";return e}function xd(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ry(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Cy=new Ue,vd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new yy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);n=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&n<17||r&&a<98?this.textureLoader=new Wa(this.options.manager):this.textureLoader=new Ya(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Tr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,n=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][n.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:n.asset,parser:i,userData:{}};return ks(r,o,n),Tn(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let a=t[n].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let n=0,r=e.length;n<r;n++){let a=e[n];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let n=i.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let n=e(t[i]);if(n)return n}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let n=0;n<t.length;n++){let r=e(t[n]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":n=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[st.KHR_BINARY_GLTF].body);let n=this.options;return new Promise(function(r,a){i.load(Vn.resolveURL(t.uri,n.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let n=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+n)})}loadAccessor(e){let t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){let a=Xu[n.type],o=zr[n.componentType],l=n.normalized===!0,c=new o(n.count*a);return Promise.resolve(new Rt(c,a,l))}let r=[];return n.bufferView!==void 0?r.push(this.getDependency("bufferView",n.bufferView)):r.push(null),n.sparse!==void 0&&(r.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Xu[n.type],c=zr[n.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=n.byteOffset||0,f=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,p=n.normalized===!0,x,m;if(f&&f!==u){let g=Math.floor(d/f),_="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+g+":"+n.count,M=t.cache.get(_);M||(x=new c(o,g*f,n.count*f/h),M=new br(x,f/h),t.cache.add(_,M)),m=new xr(M,l,d%f/h,p)}else o===null?x=new c(n.count*l):x=new c(o,d,n.count*l),m=new Rt(x,l,p);if(n.sparse!==void 0){let g=Xu.SCALAR,_=zr[n.sparse.indices.componentType],M=n.sparse.indices.byteOffset||0,b=n.sparse.values.byteOffset||0,y=new _(a[1],M,n.sparse.count*g),S=new c(a[2],b,n.sparse.count*l);o!==null&&(m=new Rt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,v=y.length;R<v;R++){let E=y[R];if(m.setX(E,S[R*l]),l>=2&&m.setY(E,S[R*l+1]),l>=3&&m.setZ(E,S[R*l+2]),l>=4&&m.setW(E,S[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let n=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=tm[d.magFilter]||Ot,h.minFilter=tm[d.minFilter]||en,h.wrapS=im[d.wrapS]||xi,h.wrapT=im[d.wrapT]||xi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Pt&&h.minFilter!==Ot,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,n=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=n.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(x){let m=new Qt(x);m.needsUpdate=!0,d(m)}),t.load(Vn.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Tn(u,a),u.userData.mimeType=a.mimeType||Ry(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,n){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[st.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[st.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[st.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return n!==void 0&&(a.colorSpace=n),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,n=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new _r,mi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new bn,mi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(n||r||a){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return Xt}loadMaterial(e){let t=this,i=this.json,n=this.extensions,r=i.materials[e],a,o={},l=r.extensions||{},c=[];if(l[st.KHR_MATERIALS_UNLIT]){let u=n[st.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Be(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],pi),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Ut)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Dt);let h=r.alphaMode||ju.OPAQUE;if(h===ju.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ju.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ri&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ne(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Ri&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ri){let u=r.emissiveFactor;o.emissive=new Be().setRGB(u[0],u[1],u[2],pi)}return r.emissiveTexture!==void 0&&a!==Ri&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ut)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Tn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ks(n,u,r),u})}createUniqueName(e){let t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,n=this.primitiveCache;function r(o){return i[st.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return nm(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=Ay(c),u=n[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[st.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=nm(new ot,c,t),c.mode===Hi.TRIANGLE_STRIP?d=d.then(f=>qu(f,po)):c.mode===Hi.TRIANGLE_FAN&&(d=d.then(f=>qu(f,Lr))),n[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,n=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?wy(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){let x=h[f],m=a[f],g,_=c[f];if(m.mode===Hi.TRIANGLES||m.mode===Hi.TRIANGLE_STRIP||m.mode===Hi.TRIANGLE_FAN||m.mode===void 0){let M=r.isSkinnedMesh===!0,b=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");M&&b===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=M&&b?new ya(x,_):new Ye(x,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(m.mode===Hi.LINES)g=new wa(x,_);else if(m.mode===Hi.LINE_STRIP)g=new Zi(x,_);else if(m.mode===Hi.LINE_LOOP)g=new Ea(x,_);else if(m.mode===Hi.POINTS)g=new Ta(x,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&Ty(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Tn(g,r),m.extensions&&ks(n,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ks(n,u[0],r),u[0];let d=new at;r.extensions&&ks(n,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t,i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new qt(Ns.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new yn(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Tn(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let n=0,r=t.joints.length;n<r;n++)i.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){let r=n.pop(),a=n,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Ue;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ma(o,l)})}loadAnimation(e){let t=this.json,i=this,n=t.animations[e],r=n.name?n.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=n.channels.length;u<d;u++){let f=n.channels[u],p=n.samplers[f.sampler],x=f.target,m=x.node,g=n.parameters!==void 0?n.parameters[p.input]:p.input,_=n.parameters!==void 0?n.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",_)),c.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],p=u[2],x=u[3],m=u[4],g=[];for(let M=0,b=d.length;M<b;M++){let y=d[M],S=f[M],R=p[M],v=x[M],E=m[M];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let T=i._createAnimationTracks(y,S,R,v,E);if(T)for(let C=0;C<T.length;C++)g.push(T[C])}let _=new Va(r,void 0,g);return Tn(_,n),_})}createNodeMesh(e){let t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,n.mesh,r);return n.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),a})}loadNode(e){let t=this.json,i=this,n=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=n.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));let l=n.skin===void 0?Promise.resolve(null):i.getDependency("skin",n.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Cy)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,p=u[0];h.pivot=new I().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,i=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?n.createUniqueName(r.name):"",o=[],l=n._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(n.getDependency("camera",r.camera).then(function(c){return n._getNodeRef(n.cameraCache,r.camera,c)})),n._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new vr:c.length>1?h=new at:c.length===1?h=c[0]:h=new wt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Tn(h,r),r.extensions&&ks(i,h,r),r.matrix!==void 0){let u=new Ue;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!n.associations.has(h))n.associations.set(h,{});else if(r.mesh!==void 0&&n.meshCache.refs[r.mesh]>1){let u=n.associations.get(h);n.associations.set(h,{...u})}return n.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],n=this,r=new at;i.name&&(r.name=n.createUniqueName(i.name)),Tn(r,i),i.extensions&&ks(t,r,i);let a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(n.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){let d=l[h];d.parent!==null?r.add($p(d)):r.add(d)}let c=h=>{let u=new Map;for(let[d,f]of n.associations)(d instanceof mi||d instanceof Qt)&&u.set(d,f);return h.traverse(d=>{let f=n.associations.get(d);f!=null&&u.set(d,f)}),u};return n.associations=c(r),r})}_createAnimationTracks(e,t,i,n,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}ls[r.path]===ls.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(ls[r.path]){case ls.weights:h=zn;break;case ls.rotation:h=Gn;break;case ls.translation:case ls.scale:h=ns;break;default:i.itemSize===1?h=zn:h=ns;break}let u=n.interpolation!==void 0?Sy[n.interpolation]:ys,d=this._getArrayFromAccessor(i);for(let f=0,p=l.length;f<p;f++){let x=new h(l[f]+"."+ls[r.path],t.array,d,u);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=xd(t.constructor),n=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)n[r]=t[r]*i;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let n=this instanceof Gn?gd:Hc;return new n(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Py(s,e,t){let i=e.attributes,n=new Bt;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){let h=xd(zr[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new I,l=new I;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let x=xd(zr[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}s.boundingBox=n;let a=new ci;n.getCenter(a.center),a.radius=n.min.distanceTo(n.max)/2,s.boundingSphere=a}function nm(s,e,t){let i=e.attributes,n=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in i){let o=bd[a]||a.toLowerCase();o in s.attributes||n.push(r(i[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});n.push(a)}return $e.workingColorSpace!==pi&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),Tn(s,e),Py(s,e,t),Promise.all(n).then(function(){return e.targets!==void 0?Ey(s,e.targets,t):s})}var rm=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var n=WebAssembly.validate(t)?o(e):o(s),r,a=WebAssembly.instantiate(n,{}).then(function(g){r=g.instance,r.exports.__wasm_call_ctors()});function o(g){for(var _=new Uint8Array(g.length),M=0;M<g.length;++M){var b=g.charCodeAt(M);_[M]=b>96?b-97:b>64?b-39:b+4}for(var y=0,M=0;M<g.length;++M)_[y++]=_[M]<60?i[_[M]]:(_[M]-60)*64+_[++M];return _.buffer.slice(0,y)}function l(g,_,M,b,y,S,R){var v=g.exports.sbrk,E=b+3&-4,T=v(E*y),C=v(S.length),D=new Uint8Array(g.exports.memory.buffer);D.set(S,C);var F=_(T,b,y,C,S.length);if(F==0&&R&&R(T,E,y),M.set(D.subarray(T,T+b*y)),v(T-v(0)),F!=0)throw new Error("Malformed buffer data: "+F)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(g){var _={object:new Worker(g),pending:0,requests:{}};return _.object.onmessage=function(M){var b=M.data;_.pending-=b.count,_.requests[b.id][b.action](b.value),delete _.requests[b.id]},_}function p(g){for(var _="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(n)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+l.toString()+m.toString(),M=new Blob([_],{type:"text/javascript"}),b=URL.createObjectURL(M),y=u.length;y<g;++y)u[y]=f(b);for(var y=g;y<u.length;++y)u[y].object.postMessage({});u.length=g,URL.revokeObjectURL(b)}function x(g,_,M,b,y){for(var S=u[0],R=1;R<u.length;++R)u[R].pending<S.pending&&(S=u[R]);return new Promise(function(v,E){var T=new Uint8Array(M),C=++d;S.pending+=g,S.requests[C]={resolve:v,reject:E},S.object.postMessage({id:C,count:g,size:_,source:T,mode:b,filter:y},[T.buffer])})}function m(g){var _=g.data;self.ready.then(function(M){if(!_.id)return self.close();try{var b=new Uint8Array(_.count*_.size);l(M,M.exports[_.mode],b,_.count,_.size,_.source,M.exports[_.filter]),self.postMessage({id:_.id,count:_.count,action:"resolve",value:b},[b.buffer])}catch(y){self.postMessage({id:_.id,count:_.count,action:"reject",value:y})}})}return{ready:a,supported:!0,useWorkers:function(g){p(g)},decodeVertexBuffer:function(g,_,M,b,y){l(r,r.exports.meshopt_decodeVertexBuffer,g,_,M,b,r.exports[c[y]])},decodeIndexBuffer:function(g,_,M,b){l(r,r.exports.meshopt_decodeIndexBuffer,g,_,M,b)},decodeIndexSequence:function(g,_,M,b){l(r,r.exports.meshopt_decodeIndexSequence,g,_,M,b)},decodeGltfBuffer:function(g,_,M,b,y,S){l(r,r.exports[h[y]],g,_,M,b,r.exports[c[S]])},decodeGltfBufferAsync:function(g,_,M,b,y){return u.length>0?x(g,_,M,h[b],c[y]):a.then(function(){var S=new Uint8Array(g*_);return l(r,r.exports[h[b]],S,g,_,M,r.exports[c[y]]),S})}}})();function am({cellSize:s=6,floorHeight:e=2.8,transparentCellSize:t=3,maxVertices:i=2e5,indexVertices:n=!1,minMaterialTriangles:r=2e4}={}){for(let[g,_]of Object.entries({cellSize:s,floorHeight:e,transparentCellSize:t,maxVertices:i}))if(!Number.isFinite(_)||_<=0)throw new RangeError(`${g} must be positive and finite`);if(!Number.isFinite(r)||r<0)throw new RangeError("minMaterialTriangles must be nonnegative and finite");let a=new Map,o=new Map,l=new Map,c=new Set,h=new I,u=new I,d={sourceMeshes:0,sourceVertices:0,sourceTriangles:0,emptySourceMeshes:0,batches:0,opaqueBatches:0,transparentBatches:0,spanBatches:0,globalBatches:0,outputVertices:0,outputTriangles:0,indexedBatches:0,oversizedSourceMeshes:0,inputStoredVertices:0,inputIndexEntries:0,cellSize:s,floorHeight:e,transparentCellSize:t,maxVertices:i,indexVertices:n,minMaterialTriangles:r},f=[],p=!1;function x(g,_,M=""){if(p)throw new Error("Spatial batcher is already finished");if(!g?.isBufferGeometry||!_?.isMaterial)throw new TypeError("A BufferGeometry and single Material are required");let b=g.getAttribute("position"),y=g.getAttribute("normal");if(!b||!y||b.itemSize!==3||y.itemSize!==3||y.count!==b.count)throw new Error("Spatial batching requires matching position/normal vec3 attributes");if(Object.keys(g.attributes).some(H=>H!=="position"&&H!=="normal")||Object.values(g.morphAttributes).some(H=>H.length))throw new Error("Strip unsupported attributes before static spatial batching");if(b.isInterleavedBufferAttribute||y.isInterleavedBufferAttribute)throw new Error("Deinterleave geometry before static spatial batching");let S=g.index?.count??b.count;if(S%3!==0||g.drawRange.start!==0||Number.isFinite(g.drawRange.count)&&g.drawRange.count<S)throw new Error("Spatial batching expects the complete triangle draw range");if(d.sourceMeshes++,d.sourceVertices+=S,d.sourceTriangles+=S/3,d.inputStoredVertices+=b.count,d.inputIndexEntries+=g.index?.count??0,c.add(g),l.set(_,(l.get(_)??0)+S/3),!S){d.emptySourceMeshes++,f.push(M);return}let R=new Bt().setFromBufferAttribute(b);if(![...R.min.toArray(),...R.max.toArray()].every(Number.isFinite))throw new Error("Spatial batching requires finite geometry bounds");R.getCenter(h),R.getSize(u);let v=_.transparent||_.transmission>0,E=v?t:s,T=u.x>E||u.z>E||u.y>e,C;if(T){let H=[Math.floor(R.min.x/E),Math.floor(R.min.y/e),Math.floor(R.min.z/E)],B=[Math.ceil(R.max.x/E)-1,Math.ceil(R.max.y/e)-1,Math.ceil(R.max.z/E)-1].map((K,G)=>Math.max(H[G],K));C=[...H,...B]}else C=[Math.floor(h.x/E),Math.floor(h.y/e),Math.floor(h.z/E)];o.has(_)||o.set(_,o.size);let D=[b,y].map(H=>`${H.array.constructor.name}:${H.normalized}:${H.gpuType}`).join("/"),F=`${o.get(_)}|${D}|${T?"span":"cell"}|${C.join(",")}`,L=a.get(F);L||(L={key:F,schema:D,cell:C,span:T,transparent:v,material:_,chunks:[]},a.set(F,L));let U=L.chunks.at(-1);(!U||U.vertices+S>i)&&(U={entries:[],vertices:0},L.chunks.push(U)),U.entries.push({geometry:g,sourceName:M}),U.vertices+=S,S>i&&d.oversizedSourceMeshes++}function m({disposeSources:g=!1}={}){if(p)throw new Error("Spatial batcher is already finished");p=!0;let _=new Map;for(let b of a.values()){if(l.get(b.material)>=r){_.set(b.key,b);continue}let y=`${o.get(b.material)}|${b.schema}|global`,S=_.get(y);S||(S={...b,key:y,cell:[],span:!1,global:!0,chunks:[]},_.set(y,S));for(let R of b.chunks)for(let v of R.entries){let E=v.geometry.index?.count??v.geometry.getAttribute("position").count,T=S.chunks.at(-1);(!T||T.vertices+E>i)&&(T={entries:[],vertices:0},S.chunks.push(T)),T.entries.push(v),T.vertices+=E}}let M=[];for(let b of _.values())for(let[y,S]of b.chunks.entries()){let R=S.entries.some(({geometry:C})=>C.index),v=S.entries.map(({geometry:C})=>{if(n)return C.index?C.toNonIndexed():C;if(!R||C.index)return C;let D=new ot,F=C.getAttribute("position").count;D.setAttribute("position",C.getAttribute("position")),D.setAttribute("normal",C.getAttribute("normal"));let L=F<=65535?new Uint16Array(F):new Uint32Array(F);for(let U=0;U<F;U++)L[U]=U;return D.setIndex(new Rt(L,1)),D}),E=En(v,!1);if(!E)throw new Error(`Could not merge spatial batch ${b.key}`);for(let C=0;C<v.length;C++)v[C]!==S.entries[C].geometry&&v[C].dispose();if(n){let C=Iy(E);E.dispose(),E=C}E.index&&d.indexedBatches++,E.computeBoundingBox(),E.computeBoundingSphere();let T=new Ye(E,b.material);T.name=`Spatial | ${b.material.name||b.material.uuid} | ${b.global?"global":b.span?"span":"cell"} ${b.cell.join(",")} | ${y}`,T.frustumCulled=!0,T.castShadow=!b.transparent,T.receiveShadow=!b.transparent,T.userData.spatialBatch={key:b.key,cell:b.cell.slice(),spanning:b.span,global:!!b.global,sourceCount:S.entries.length,sourceNames:S.entries.map(C=>C.sourceName),triangles:S.vertices/3},M.push(T),d.batches++,d[b.transparent?"transparentBatches":"opaqueBatches"]++,b.span&&d.spanBatches++,b.global&&d.globalBatches++,d.outputVertices+=E.getAttribute("position").count,d.outputTriangles+=(E.index?.count??E.getAttribute("position").count)/3}if(g)for(let b of c)b.dispose();return a.clear(),c.clear(),{meshes:M,stats:{...d},emptySources:f}}return{add:x,finish:m}}function Iy(s){if(s.index)throw new Error("Exact indexing requires non-indexed triangles");let e=s.getAttribute("position"),t=s.getAttribute("normal");if(Object.keys(s.attributes).some(m=>m!=="position"&&m!=="normal")||!e||!t||e.itemSize!==3||t.itemSize!==3||e.count!==t.count||!(e.array instanceof Float32Array)||!(t.array instanceof Float32Array)||e.normalized||t.normalized)throw new Error("Exact indexing requires unnormalized Float32 position/normal attributes only");let i=e.count,n=new Uint32Array(e.array.buffer,e.array.byteOffset,i*3),r=new Uint32Array(t.array.buffer,t.array.byteOffset,i*3),a=new Map,o=new Int32Array(i),l=new Uint32Array(i),c=new Uint32Array(i),h=0;for(let m=0;m<i;m++){let g=m*3,_=2166136261;for(let b=0;b<3;b++)_=Math.imul(_^n[g+b],16777619);for(let b=0;b<3;b++)_=Math.imul(_^r[g+b],16777619);let M=-1;for(let b=a.get(_)??-1;b!==-1;b=o[b]){let y=l[b]*3;if(n[g]===n[y]&&n[g+1]===n[y+1]&&n[g+2]===n[y+2]&&r[g]===r[y]&&r[g+1]===r[y+1]&&r[g+2]===r[y+2]){M=b;break}}M===-1&&(M=h++,l[M]=m,o[M]=a.get(_)??-1,a.set(_,M)),c[m]=M}let u=new ot,d=new Float32Array(h*3),f=new Float32Array(h*3),p=new Uint32Array(d.buffer),x=new Uint32Array(f.buffer);for(let m=0;m<h;m++){let g=l[m]*3,_=m*3;p.set(n.subarray(g,g+3),_),x.set(r.subarray(g,g+3),_)}u.setAttribute("position",new Rt(d,3)),u.setAttribute("normal",new Rt(f,3)),u.setIndex(new Rt(h<=65535?new Uint16Array(c):c,1)),u.name=s.name,u.userData={...s.userData},u.setDrawRange(s.drawRange.start,s.drawRange.count);for(let m of s.groups)u.addGroup(m.start,m.count,m.materialIndex);return u}function _d(s,e){if(e=e.replaceAll("_"," "),/Mirror/i.test(e))return;let t=/Entrance stippled glass/i.test(e),i=/water/i.test(e);if(/Hall opal lamp glass/i.test(e))s.transparent=!1,s.opacity=1,s.depthWrite=!0,s.metalness=0,s.roughness=.42;else if(t)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.48,s.opacity=.64,s.envMapIntensity=1;else if(i)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.16,s.envMapIntensity=1.1;else if(/Glazing|glass/i.test(e)){s.metalness=0,s.roughness=/mist/i.test(e)?.4:.1,s.opacity=/mist/i.test(e)?.36:.11,s.envMapIntensity=.8;return}let n=/carpet|upholstery|linen|curtain|fabric|cushion|Entrance mat/i.test(e),r=/oak|walnut|pine|timber|rattan/i.test(e)&&!n,a=e==="Proposal | Slate roof anthracite",o=t?9:i?10:/carpet/i.test(e)?11:e==="Red brown brick"?1:/Slate roof/i.test(e)?2:/Tarmac|Gravel|Planting soil/i.test(e)?3:r?4:/Warm plaster|White joinery|enamel|painted cast iron|Proposal \| Loft plaster|Proposal \| Limestone render/i.test(e)?5:n?6:/Stone|Concrete|Paving|brick|mortar|tile|granite|membrane/i.test(e)?7:/Grass|Foliage|Hedge/i.test(e)?8:0;o===1||o===2||o===3||o===6||o===8?s.roughness=.92:o===4?s.roughness=.43:o===5?s.roughness=/joinery|enamel/i.test(e)?.44:.88:o===7?s.roughness=/granite/i.test(e)?.28:.83:o===11&&(s.roughness=.96),o&&(s.onBeforeCompile=l=>{l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
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
  `)},s.customProgramCacheKey=()=>`daylight-surface-v3-${o}${a?"-anthracite":""}`)}var Gr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Li=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Dy=new yn(-1,1,1,-1,0,1),yd=class extends ot{constructor(){super(),this.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new je([0,2,0,0,2,0],2))}},Ly=new yd,cs=class{constructor(e){this._mesh=new Ye(Ly,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Dy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Hr=class extends Li{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof It?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=yi.clone(e.uniforms),this.material=new It({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new cs(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var _o=class extends Li{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}},Vc=class extends Li{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Wc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new ne);this._width=i.width,this._height=i.height,t=new kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Hr(Gr),this.copyPass.material.blending=zt,this.timer=new Ja}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let n=0,r=this.passes.length;n<r;n++){let a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}_o!==void 0&&(a instanceof _o?i=!0:a instanceof Vc&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var qc=class extends Li{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Be}render(e,t,i){let n=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=n}};var yo={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ne},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ue},cameraProjectionMatrixInverse:{value:new Ue},cameraWorldMatrix:{value:new Ue},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new I(-1,-1,-1)},sceneBoxMax:{value:new I(1,1,1)}},vertexShader:`

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
		}`},Mo={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Xc={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function om(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=Fy(e),i=t.length,n=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=t[a],l=2*Math.PI*o/i,c=new I(Math.cos(l),Math.sin(l),0).normalize();n[a*4]=(c.x*.5+.5)*255,n[a*4+1]=(c.y*.5+.5)*255,n[a*4+2]=127,n[a*4+3]=255}let r=new mn(n,e,e);return r.wrapS=xi,r.wrapT=xi,r.needsUpdate=!0,r}function Fy(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,i=Array(t).fill(0),n=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(n===-1&&r===e?(r=e-2,n=0):(r===e&&(r=0),n<0&&(n=e-1)),i[n*e+r]!==0){r-=2,n++;continue}else i[n*e+r]=a++;r++,n--}return i}var So={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Md(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ne},cameraProjectionMatrixInverse:{value:new Ue},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Md(s,e,t){let i=Ny(s,e,t),n="vec3[SAMPLES](";for(let r=0;r<s;r++){let a=i[r];n+=`vec3(${a.x}, ${a.y}, ${a.z})${r<s-1?",":")"}`}return n}function Ny(s,e,t){let i=[];for(let n=0;n<s;n++){let r=2*Math.PI*e*n/s,a=Math.pow(n/(s-1),t);i.push(new I(Math.cos(r),Math.sin(r),a))}return i}var jc=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,n,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,p=e-d,x=t-f,m,g;p>x?(m=1,g=0):(m=0,g=1);let _=p-m+h,M=x-g+h,b=p-1+2*h,y=x-1+2*h,S=l&255,R=c&255,v=this.perm[S+this.perm[R]]%12,E=this.perm[S+m+this.perm[R+g]]%12,T=this.perm[S+1+this.perm[R+1]]%12,C=.5-p*p-x*x;C<0?i=0:(C*=C,i=C*C*this._dot(this.grad3[v],p,x));let D=.5-_*_-M*M;D<0?n=0:(D*=D,n=D*D*this._dot(this.grad3[E],_,M));let F=.5-b*b-y*y;return F<0?r=0:(F*=F,r=F*F*this._dot(this.grad3[T],b,y)),70*(i+n+r)}noise3d(e,t,i){let n,r,a,o,c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(i+c),f=1/6,p=(h+u+d)*f,x=h-p,m=u-p,g=d-p,_=e-x,M=t-m,b=i-g,y,S,R,v,E,T;_>=M?M>=b?(y=1,S=0,R=0,v=1,E=1,T=0):_>=b?(y=1,S=0,R=0,v=1,E=0,T=1):(y=0,S=0,R=1,v=1,E=0,T=1):M<b?(y=0,S=0,R=1,v=0,E=1,T=1):_<b?(y=0,S=1,R=0,v=0,E=1,T=1):(y=0,S=1,R=0,v=1,E=1,T=0);let C=_-y+f,D=M-S+f,F=b-R+f,L=_-v+2*f,U=M-E+2*f,H=b-T+2*f,B=_-1+3*f,K=M-1+3*f,G=b-1+3*f,j=h&255,$=u&255,ye=d&255,xe=this.perm[j+this.perm[$+this.perm[ye]]]%12,ct=this.perm[j+y+this.perm[$+S+this.perm[ye+R]]]%12,Je=this.perm[j+v+this.perm[$+E+this.perm[ye+T]]]%12,nt=this.perm[j+1+this.perm[$+1+this.perm[ye+1]]]%12,Y=.6-_*_-M*M-b*b;Y<0?n=0:(Y*=Y,n=Y*Y*this._dot3(this.grad3[xe],_,M,b));let Q=.6-C*C-D*D-F*F;Q<0?r=0:(Q*=Q,r=Q*Q*this._dot3(this.grad3[ct],C,D,F));let ue=.6-L*L-U*U-H*H;ue<0?a=0:(ue*=ue,a=ue*ue*this._dot3(this.grad3[Je],L,U,H));let Fe=.6-B*B-K*K-G*G;return Fe<0?o=0:(Fe*=Fe,o=Fe*Fe*this._dot3(this.grad3[nt],B,K,G)),32*(n+r+a+o)}noise4d(e,t,i,n){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,f,p,x=(e+t+i+n)*l,m=Math.floor(e+x),g=Math.floor(t+x),_=Math.floor(i+x),M=Math.floor(n+x),b=(m+g+_+M)*c,y=m-b,S=g-b,R=_-b,v=M-b,E=e-y,T=t-S,C=i-R,D=n-v,F=E>T?32:0,L=E>C?16:0,U=T>C?8:0,H=E>D?4:0,B=T>D?2:0,K=C>D?1:0,G=F+L+U+H+B+K,j=a[G][0]>=3?1:0,$=a[G][1]>=3?1:0,ye=a[G][2]>=3?1:0,xe=a[G][3]>=3?1:0,ct=a[G][0]>=2?1:0,Je=a[G][1]>=2?1:0,nt=a[G][2]>=2?1:0,Y=a[G][3]>=2?1:0,Q=a[G][0]>=1?1:0,ue=a[G][1]>=1?1:0,Fe=a[G][2]>=1?1:0,Se=a[G][3]>=1?1:0,Ge=E-j+c,dt=T-$+c,te=C-ye+c,re=D-xe+c,oe=E-ct+2*c,le=T-Je+2*c,he=C-nt+2*c,ze=D-Y+2*c,Ne=E-Q+3*c,He=T-ue+3*c,We=C-Fe+3*c,N=D-Se+3*c,ut=E-1+4*c,Ze=T-1+4*c,P=C-1+4*c,w=D-1+4*c,z=m&255,V=g&255,J=_&255,ce=M&255,de=o[z+o[V+o[J+o[ce]]]]%32,Z=o[z+j+o[V+$+o[J+ye+o[ce+xe]]]]%32,ie=o[z+ct+o[V+Je+o[J+nt+o[ce+Y]]]]%32,me=o[z+Q+o[V+ue+o[J+Fe+o[ce+Se]]]]%32,Ie=o[z+1+o[V+1+o[J+1+o[ce+1]]]]%32,pe=.6-E*E-T*T-C*C-D*D;pe<0?h=0:(pe*=pe,h=pe*pe*this._dot4(r[de],E,T,C,D));let fe=.6-Ge*Ge-dt*dt-te*te-re*re;fe<0?u=0:(fe*=fe,u=fe*fe*this._dot4(r[Z],Ge,dt,te,re));let Ae=.6-oe*oe-le*le-he*he-ze*ze;Ae<0?d=0:(Ae*=Ae,d=Ae*Ae*this._dot4(r[ie],oe,le,he,ze));let Oe=.6-Ne*Ne-He*He-We*We-N*N;Oe<0?f=0:(Oe*=Oe,f=Oe*Oe*this._dot4(r[me],Ne,He,We,N));let qe=.6-ut*ut-Ze*Ze-P*P-w*w;return qe<0?p=0:(qe*=qe,p=qe*qe*this._dot4(r[Ie],ut,Ze,P,w)),27*(h+u+d+f+p)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,n){return e[0]*t+e[1]*i+e[2]*n}_dot4(e,t,i,n,r){return e[0]*t+e[1]*i+e[2]*n+e[3]*r}};var wo=class s extends Li{constructor(e,t,i=512,n=512,r,a,o){super(),this.width=i,this.height=n,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=om(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new kt(this.width,this.height,{type:jt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new It({defines:Object.assign({},yo.defines),uniforms:yi.clone(yo.uniforms),vertexShader:yo.vertexShader,fragmentShader:yo.fragmentShader,blending:zt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Ga,this.normalMaterial.blending=zt,this.pdMaterial=new It({defines:Object.assign({},So.defines),uniforms:yi.clone(So.uniforms),vertexShader:So.vertexShader,fragmentShader:So.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new It({defines:Object.assign({},Mo.defines),uniforms:yi.clone(Mo.uniforms),vertexShader:Mo.vertexShader,fragmentShader:Mo.fragmentShader,blending:zt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new It({uniforms:yi.clone(Gr.uniforms),vertexShader:Gr.vertexShader,fragmentShader:Gr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Qa,blendDst:Is,blendEquation:Gi,blendSrcAlpha:$a,blendDstAlpha:Is,blendEquationAlpha:Gi}),this.blendMaterial=new It({uniforms:yi.clone(Xc.uniforms),vertexShader:Xc.vertexShader,fragmentShader:Xc.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Xl,blendSrc:Qa,blendDst:Is,blendEquation:Gi,blendSrcAlpha:$a,blendDstAlpha:Is,blendEquationAlpha:Gi}),this._fsQuad=new cs(null),this._originalClearColor=new Be,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new xn,this.depthTexture.format=Mn,this.depthTexture.type=as,this.normalRenderTarget=new kt(this.width,this.height,{minFilter:Pt,magFilter:Pt,type:jt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,n=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=n,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=n,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Md(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Off:break;case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,n,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,n,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n=t.clearColor||n,r=t.clearAlpha||r,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new jc,i=e*e*4,n=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a,c=o;n[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,n[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,n[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,n[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new mn(n,e,e,bi,hi);return r.wrapS=xi,r.wrapT=xi,r.needsUpdate=!0,r}};wo.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Eo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Kc=class extends Li{constructor(){super(),this.isOutputPass=!0,this.uniforms=yi.clone(Eo.uniforms),this.material=new Er({name:Eo.name,uniforms:this.uniforms,vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader}),this._fsQuad=new cs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},$e.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===eo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===to?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===io?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===no?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ds?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ro?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===so&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var lm={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`};var To=class s extends Ye{constructor(){let e=s.SkyShader,t=new It({name:e.name,uniforms:yi.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:ii,depthWrite:!1});super(new gt(1,1,1),t),this.isSky=!0}};To.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new I},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
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

		}`};function Uy(s,e,t){let i=new To;i.scale.setScalar(100),Object.assign(i.material.uniforms.turbidity,{value:2.2}),i.material.uniforms.rayleigh.value=1.8,i.material.uniforms.mieCoefficient.value=.004,i.material.uniforms.mieDirectionalG.value=.8,i.material.uniforms.cloudCoverage.value=.32,i.material.uniforms.cloudDensity.value=.22,i.material.uniforms.sunPosition.value.copy(e),i.material.uniforms.showSunDisc.value=!1;let n=new Ss;n.add(i);let r=new kr(t?128:256,{type:jt});new Rr(.1,250,r).update(s,n);let a=new Or(s),o=a.fromCubemap(r.texture);return a.dispose(),i.geometry.dispose(),i.material.dispose(),{background:r.texture,environment:o.texture}}function cm(s,e,t,{actionMode:i=!1}={}){let n=matchMedia("(pointer: coarse)").matches,r=n||i;s.toneMapping=Ds,s.toneMappingExposure=1.08,s.shadowMap.enabled=!0,s.shadowMap.type=Ps,s.shadowMap.autoUpdate=!1,e.add(new qa(14478074,8549991,.5)),e.add(new Ka(16774373,.035));let a=new Cs(16774108,2.8),o=new I(0,0,1).applyEuler(new Ji(Ns.degToRad(26),Ns.degToRad(-23),Ns.degToRad(-28),"XYZ")),l=new I(o.x,o.z,-o.y),c=Uy(s,l,n);e.background=c.background,e.backgroundIntensity=.22,e.environment=c.environment,e.environmentIntensity=.035,a.target.position.set(-3,0,-4),a.position.copy(a.target.position).add(l.multiplyScalar(55)),a.castShadow=!0;let h=r?2048:4096;a.shadow.mapSize.set(h,h),Object.assign(a.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120}),a.shadow.bias=-8e-5,a.shadow.normalBias=.012,e.add(a,a.target);let u=new kt(innerWidth,innerHeight,{type:jt,samples:r?0:4}),d=new Wc(s,u);d.addPass(new qc(e,t));let f=null;if(!n){f=new wo(e,t,innerWidth,innerHeight,void 0,{radius:.45,distanceExponent:1.5,thickness:.15,scale:1,samples:16},{radius:6,rings:2,samples:8}),f.blendIntensity=.65;let b=f._overrideVisibility.bind(f),y=f._restoreVisibility.bind(f);f._overrideVisibility=()=>{b(),e.traverse(S=>{S.isMesh&&S.material.transparent&&S.visible&&(S.visible=!1,f._visibilityCache.push(S))})},f._restoreVisibility=y,f.enabled=!r,d.addPass(f)}d.addPass(new Kc);let p=new Hr(lm);p.enabled=r,d.addPass(p);let x=(b,y)=>{d.setPixelRatio(s.getPixelRatio()),d.setSize(b,y),f&&f.setSize(Math.max(1,Math.round(d.readBuffer.width*.5)),Math.max(1,Math.round(d.readBuffer.height*.5))),p&&p.material.uniforms.resolution.value.set(1/d.readBuffer.width,1/d.readBuffer.height)};x(innerWidth,innerHeight);let m={toneMapping:"AgX",exposure:s.toneMappingExposure,sky:"precomputed analytic daylight",skyCubeSize:n?128:256,localBounceLights:0,castShadows:!0,ambientOcclusion:r?"off":"GTAO",aoResolutionScale:.5,antialiasing:r?"FXAA":"MSAA",environmentReflections:!0,shadowMapSize:h,touchDevice:n,actionMode:i},g=b=>{if(m.actionMode!==!!b){m.actionMode=!!b,r=n||b,f&&(f.enabled=!r),p.enabled=r;for(let y of[d.renderTarget1,d.renderTarget2])y.samples=r?0:4,y.dispose();h=r?2048:4096,a.shadow.mapSize.set(h,h),a.shadow.map?.dispose(),a.shadow.map=null,a.shadow.mapPass?.dispose(),a.shadow.mapPass=null,s.shadowMap.needsUpdate=!0,m.ambientOcclusion=r?"off":"GTAO",m.antialiasing=r?"FXAA":"MSAA",m.shadowMapSize=h}},_=!1;return{render:()=>{d.render(),!_&&a.shadow.map&&(_=!0,e.traverse(b=>{if(b.material)for(let y of Array.isArray(b.material)?b.material:[b.material])y.needsUpdate=!0}))},resize:x,setActionMode:g,updateShadows:()=>{s.shadowMap.needsUpdate=!0},info:m}}function hm(s,e,{budget:t=6}={}){let i=e.map((d,f)=>({...d,id:f,point:new I(d.position[0],d.position[2],-d.position[1])})),n=Array.from({length:Math.min(t,i.length)},()=>{let d=new Rs(16772311,0,1,0);return d.name="Room daylight fill",s.add(d),{light:d,current:null,target:null}}),r=new gn,a=new Ue,o=new ci,l=-1/0,c=null,h={budget:n.length,sources:i.length,selected:[]};function u(d,f=performance.now()){let p=c===null?1:Math.min(.1,Math.max(0,(f-c)/1e3));if(c=f,f-l>=160){d.updateMatrixWorld(),r.setFromProjectionMatrix(a.multiplyMatrices(d.projectionMatrix,d.matrixWorldInverse));let x=new Set(n.map(M=>M.target?.id)),m=i.map(M=>{let b=d.position.distanceTo(M.point),y=Math.max(0,b-M.range);o.center.copy(M.point),o.radius=M.range;let S=r.intersectsSphere(o);return{source:M,score:M.intensity*(S?1:.15)/(1+y*y*.15+b*.08)*(x.has(M.id)?1.12:1)}}).sort((M,b)=>b.score-M.score).slice(0,n.length).map(M=>M.source),g=new Set(m.map(M=>M.id)),_=m.filter(M=>!n.some(b=>b.target?.id===M.id));for(let M of n)g.has(M.target?.id)||(M.target=_.shift()??null);h.selected=m.map(M=>M.name),l=f}for(let x of n){let m=x.current?.id!==x.target?.id;if(m&&x.light.intensity>.015){x.light.intensity*=Math.exp(-p*18);continue}m&&(x.current=x.target,x.current&&(x.light.position.copy(x.current.point),x.light.distance=x.current.range,x.light.name=x.current.name+" diffuse fill"));let g=x.current?.intensity??0;x.light.intensity+=(g-x.light.intensity)*(1-Math.exp(-p*12))}}return{update:u,info:h,slots:n}}var Yc=class{constructor({mobile:e=!1,dpr:t=1}={}){this.mobile=e,this.dpr=t,this.scale=1,this.frames=[],this.lastCheck=null}ratio(e,t){let i=this.mobile?1.25:1.5,n=this.mobile?1e6:32e5;return Math.min(this.dpr,i,Math.sqrt(n/Math.max(1,e*t)))*this.scale}reset(){this.frames.length=0,this.lastCheck=null}sample(e,t){if(!Number.isFinite(e)||e<1||e>150||(this.lastCheck===null&&(this.lastCheck=t),this.frames.push(e),t-this.lastCheck<2400))return!1;let i=this.frames.sort((a,o)=>a-o);if(this.frames=[],this.lastCheck=t,i.length<24)return!1;let n=i[Math.floor(i.length/2)],r=this.scale;return n>27&&(this.scale=Math.max(.65,Math.round((this.scale-.15)*100)/100)),this.scale!==r}};var Jc=class{constructor(e,t=[]){this.scene=e,this.members=new Map,this.doors=[],this.activeGroups=new Map;for(let i of t){let n=new at;n.name=i.id,n.position.set(i.hinge[0],i.hinge[2],-i.hinge[1]),e.add(n);let r=i.rotationAxis?new I(i.rotationAxis[0],i.rotationAxis[2],-i.rotationAxis[1]).normalize():new I(0,1,0),a=i.closedDelta??0;n.quaternion.setFromAxisAngle(r,a);let o={spec:i,pivot:n,axis:r,closedPosition:n.position.clone(),buckets:new Map,angle:a,open:!1,meshCount:0};this.doors.push(o);for(let l of i.members)this.members.set(l,o)}}owner(e){for(let t=e;t;t=t.parent){let i=this.members.get(t.userData.name||t.name);if(i)return i}}add(e,t,i){t.translate(-e.pivot.position.x,-e.pivot.position.y,-e.pivot.position.z);let n=e.buckets.get(i.name);n||(n={material:i,geometries:[]},e.buckets.set(i.name,n)),n.geometries.push(t),e.meshCount++}finish(){let e=0;for(let t of this.doors){for(let{material:i,geometries:n}of t.buckets.values()){let r=En(n,!1),a=new Ye(r,i);a.name=t.spec.id+" | "+i.name,a.castShadow=!i.transparent,a.receiveShadow=!i.transparent,t.pivot.add(a),e++;for(let o of n)o.dispose()}t.buckets.clear()}return e}update(e,t=0,i=!1,n=[]){let r=!1,a=new Map;for(let{spec:l}of this.doors)if(l.activationSet){let c=a.get(l.activationSet);c||(c=new Map,a.set(l.activationSet,c));let[h,u]=l.openingCenter;c.set(l.activationGroup,Math.hypot(e.x-h,e.y-u))}for(let[l,c]of a){let h=[...c].sort((d,f)=>d[1]-f[1])[0],u=this.activeGroups.get(l);(i||!c.has(u)||c.get(u)>h[1]+.2)&&this.activeGroups.set(l,h[0])}let o=[{position:e,selected:this.activeGroups},...n.map(l=>{let c=new Map;for(let h of a.keys()){let u=null,d=1/0;for(let{spec:f}of this.doors)if(f.activationSet===h){let[p,x,m]=f.openingCenter,g=Math.hypot(l.x-p,l.y-x)+Math.abs(l.z-m)*10;g<d&&(d=g,u=f.activationGroup)}c.set(h,u)}return{position:l,selected:c}})];for(let l of this.doors){let{spec:c}=l,[h,u,d]=c.openingCenter;l.open=o.some(({position:m,selected:g})=>{let _=Math.abs(m.z-d)<.75,M=h,b=u;if(c.apertureAxis){let[R,v]=c.apertureAxis,E=c.apertureWidth/2,T=Math.max(-E,Math.min(E,(m.x-h)*R+(m.y-u)*v));M+=R*T,b+=v*T}let y=Math.hypot(m.x-M,m.y-b);return(!c.activationSet||g.get(c.activationSet)===c.activationGroup)&&_&&y<(l.open&&!i?c.closeDistance:c.openDistance)});let f=l.open?c.openDelta:c.closedDelta??0,p=i?f:l.angle+(f-l.angle)*(1-Math.exp(-t*(c.responseRate??9))),x=Math.abs(f-p)<2e-4?f:p;if(Math.abs(x-l.angle)>1e-5){if(l.angle=x,c.motion==="sliding"?l.pivot.quaternion.identity():l.pivot.quaternion.setFromAxisAngle(l.axis,x),l.pivot.position.copy(l.closedPosition),c.motion==="retractable-garage"){let m=Math.sin(x),[g,_,M]=c.openTranslation;l.pivot.position.addScaledVector(new I(g,M,-_),m)}else if(c.motion==="sliding"){let m=c.openDelta?x/c.openDelta:0,[g,_,M]=c.openTranslation;l.pivot.position.addScaledVector(new I(g,M,-_),m)}r=!0}}return r}snap(e){return this.update(e,0,!0)}status(){return this.doors.map(({spec:e,angle:t,open:i,meshCount:n,pivot:r})=>({id:e.id,wall:e.wall,motion:e.motion??"hinged",activationGroup:e.activationGroup,angle:t,open:i,meshCount:n,batches:r.children.length,hinge:[...e.hinge],position:[r.position.x,-r.position.z,r.position.y],nativePoseRestored:Math.abs(t)<2e-4,closedPoseRestored:Math.abs(t-(e.closedDelta??0))<2e-4}))}};function Jt(s,e,t){let i=!1;for(let n=0,r=t.length-1;n<t.length;r=n++){let[a,o]=t[n],[l,c]=t[r];o>e!=c>e&&s<(l-a)*(e-o)/(c-o)+a&&(i=!i)}return i}function Oy(s,e,t,i){let n=i[0]-t[0],r=i[1]-t[1],a=Math.max(0,Math.min(1,((s-t[0])*n+(e-t[1])*r)/(n*n+r*r)));return Math.hypot(s-t[0]-a*n,e-t[1]-a*r)}function ky(s,e,t){let i=t.b[0]-t.a[0],n=t.b[1]-t.a[1],r=Math.hypot(i,n),a=((s-t.a[0])*i+(e-t.a[1])*n)/r,o=Math.abs(((s-t.a[0])*n-(e-t.a[1])*i)/r);return Math.hypot(Math.max(-a,a-r,0),Math.max(o-t.thickness/2,0))}var Bs=class{constructor(e){this.data=e,this.radius=.18,this.position={x:6.98,y:4.1,z:0},this.segments=[...e.segments];for(let t of e.walls){let[i,n]=t.a,[r,a]=t.b,o=Math.hypot(r-i,a-n),l=(r-i)/o,c=(a-n)/o,h=t.openings.filter(f=>f[2]<.15&&f[3]>1.65).map(f=>[Math.max(0,f[0]-f[1]/2),Math.min(o,f[0]+f[1]/2)]).sort((f,p)=>f[0]-p[0]),u=0,d=[];for(let[f,p]of h)f>u&&d.push([u,f]),u=Math.max(u,p);u<o&&d.push([u,o]);for(let[f,p]of d){let x=[f,p];if(t.projected_x_span)for(let m of t.projected_x_span){let g=(m-i)/l;g>f&&g<p&&x.push(g)}x.sort((m,g)=>m-g);for(let m=0;m<x.length-1;m++){let g=x[m],_=x[m+1],M=i+l*(g+_)/2,b=t.projected_x_span&&M>t.projected_x_span[0]&&M<t.projected_x_span[1]?t.front_projection_m:0,y=t.base_z??t.floor*e.levelHeight;this.segments.push({a:[i+l*g,n+c*g-b/2],b:[i+l*_,n+c*_-b/2],thickness:t.thickness_m+b,bottom:y,top:y+(t.height_m??(t.floor?2.45:2.6)),name:t.name})}}}}stairHeight(e,t){let[i,n]=this.data.stair?.boundsX??[7.92,8.815],r=this.data.levelHeight;return e<i||e>n||t<.115||t>3.56?null:t>=1.01?r/17+(3.56-t)/2.55*(13*r/17):(14+3*Math.atan2(1.01-t,e-i)/(Math.PI/2))*r/17}rampHeights(e,t){let i=[];for(let n of this.data.ramps??[])if(Jt(e,t,n.polygon)){let[r,a,o]=n.start,[l,c,h]=n.end,u=l-r,d=c-a,f=Math.max(0,Math.min(1,((e-r)*u+(t-a)*d)/(u*u+d*d)));i.push(o+(h-o)*f)}return i}support(e,t,i){let n=this.data.streetContext;if(this.data.site?.outline_m&&!Jt(e,t,this.data.site.outline_m)&&!(this.data.approachSurface&&Jt(e,t,this.data.approachSurface.polygon))&&!(n?.enabled&&n.walkPolygons.some(c=>Jt(e,t,c))))return null;let r=this.stairHeight(e,t),a=(this.data.groundOpenings??[]).some(c=>Jt(e,t,c.polygon??c)),o=this.rampHeights(e,t);a||o.push(0);for(let c of this.data.surfaces)(c.z!==0||!a)&&Jt(e,t,c.polygon)&&o.push(c.z);r!==null&&o.push(r);let l=o.filter(c=>c<=i+(this.stepUp??.3)&&c>=i-(this.stepDown??.38));return l.length?Math.max(...l):null}blocked(e,t,i){let n=this.data.streetContext,r=this.radius,[a,o,l,c]=n?.enabled?n.bounds:this.data.bounds;if(e<a+r||e>l-r||t<o+r||t>c-r)return!0;for(let h of this.segments)if(!(i+1.5<=h.bottom+.04||i>=h.top-.04)&&!(h.name==="Landing rear rail"&&i<1)&&ky(e,t,h)<r)return!0;for(let h of n?.enabled?[...this.data.obstacles,...n.obstacles]:this.data.obstacles){if(h.maxFootZ!==void 0&&i>h.maxFootZ||i+1.5<h.bottom+.02||i>=h.top-.04)continue;if(h.polygon){if(Jt(e,t,h.polygon))return!0;for(let g=0;g<h.polygon.length;g++)if(Oy(e,t,h.polygon[g],h.polygon[(g+1)%h.polygon.length])<r)return!0;continue}let[u,d,f,p]=h.box,x=e-Math.max(u,Math.min(f,e)),m=t-Math.max(d,Math.min(p,t));if(x*x+m*m<r*r)return!0}return!1}canStand(e){return!this.blocked(e.x,e.y,e.z)}teleport(e){let[t,i,n]=e.position;return this.position={x:t,y:i,z:n},this.position}move(e,t){let i=Math.max(1,Math.ceil(Math.hypot(e,t)/.04));for(let n=0;n<i;n++)for(let[r,a]of[[e/i,0],[0,t/i]]){let o=this.position,l=o.x+r,c=o.y+a,h=this.support(l,c,o.z);h!==null&&!this.blocked(l,c,h)&&(this.position={x:l,y:c,z:h})}return this.position}};var Ao=()=>matchMedia("(pointer: coarse)").matches,Zc=class{constructor(e,t,i,n,r=()=>{}){this.enabled=Ao(),this.active=!1,this.axes={forward:0,right:0},this.movePointer=null,this.lookPointer=null,this.lookPoint=null,this.lookElement=null,this.lookGesture=null,this.sprinting=!1,this.pad=t,this.thumb=i,this.canvas=e,document.body.classList.toggle("touch-ui",this.enabled);let a=h=>this.enabled&&this.active&&h.pointerType!=="mouse",o=h=>{let u=t.getBoundingClientRect(),d=u.width*.34,f=h.clientX-u.left-u.width/2,p=h.clientY-u.top-u.height/2,x=Math.hypot(f,p),m=Math.min(1,d/(x||1));f*=m,p*=m,this.sprinting=x>d*(this.sprinting?1.08:1.28),t.classList.toggle("sprinting",this.sprinting),t.querySelector(".pad-label").textContent=this.sprinting?"Sprinting":"Push farther to sprint";let g=Math.hypot(f,p)/d;this.axes.forward=g<.13?0:-p/d,this.axes.right=g<.13?0:f/d,i.style.transform=`translate(${f}px,${p}px)`};t.addEventListener("pointerdown",h=>{!a(h)||this.movePointer!==null||(h.preventDefault(),this.movePointer=h.pointerId,t.setPointerCapture(h.pointerId),t.classList.add("engaged"),o(h))}),t.addEventListener("pointermove",h=>{h.pointerId===this.movePointer&&(h.preventDefault(),o(h))});let l=h=>{h.pointerId===this.movePointer&&this.resetMovement()};for(let h of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(h,l);e.addEventListener("pointerdown",h=>{!a(h)||!this.claimLook(h.pointerId,e)||(h.preventDefault(),this.lookPoint=[h.clientX,h.clientY],this.lookGesture={x:h.clientX,y:h.clientY,time:h.timeStamp,dragged:!1},e.setPointerCapture(h.pointerId))}),e.addEventListener("pointermove",h=>{h.pointerId!==this.lookPointer||!this.lookPoint||!this.active||(Math.hypot(h.clientX-this.lookGesture.x,h.clientY-this.lookGesture.y)>10&&(this.lookGesture.dragged=!0),h.preventDefault(),n(h.clientX-this.lookPoint[0],h.clientY-this.lookPoint[1]),document.getElementById("look-hint").hidden=!0,this.lookPoint=[h.clientX,h.clientY])});let c=h=>{if(h.pointerId!==this.lookPointer)return;let u=this.lookGesture,d=h.type==="pointerup"&&this.active&&u&&!u.dragged&&h.timeStamp-u.time<=350&&Math.hypot(h.clientX-u.x,h.clientY-u.y)<=10;this.releaseLook(h.pointerId),d&&r()};for(let h of["pointerup","pointercancel","lostpointercapture"])e.addEventListener(h,c);window.addEventListener("blur",()=>this.reset()),window.addEventListener("resize",()=>this.reset()),document.addEventListener("visibilitychange",()=>this.reset()),t.addEventListener("contextmenu",h=>h.preventDefault())}claimLook(e,t){return!this.active||this.lookPointer!==null?!1:(this.lookPointer=e,this.lookElement=t,!0)}releaseLook(e){if(e!==this.lookPointer)return;let t=this.lookElement;this.lookPointer=null,this.lookPoint=null,this.lookElement=null,this.lookGesture=null,t?.hasPointerCapture(e)&&t.releasePointerCapture(e)}resetMovement(){this.axes.forward=0,this.axes.right=0,this.movePointer=null,this.sprinting=!1,this.thumb.style.transform="",this.pad.classList.remove("engaged","sprinting"),this.pad.querySelector(".pad-label").textContent="Push farther to sprint"}reset(){let e=this.movePointer;this.resetMovement(),this.releaseLook(this.lookPointer),e!==null&&this.pad.hasPointerCapture(e)&&this.pad.releasePointerCapture(e)}setActive(e){this.active=e,e||this.reset()}};function um(s,e){let t=[...s.floorLevels??[{id:0,z:0},{id:1,z:s.levelHeight}]].sort((n,r)=>n.z-r.z);if(!e||e.z<t[0].z-.15||e.z>t.at(-1).z+2.5)return!1;let i=t.findLast(n=>e.z>=n.z-.2)??t[0];return s.planRooms.some(n=>n.floor===i.id&&Jt(e.x,e.y,n.polygon_m))}var $c=class{constructor(e){this.data=e,this.reset()}reset(){this.phase="waiting",this.survived=0,this.wasInside=!1}arm(e){return this.phase!=="waiting"?!1:(this.phase="armed",this.wasInside=um(this.data,e),!0)}advance(e,t=!0,i){if(!t)return!1;if(this.phase==="armed"){let n=um(this.data,i),r=n&&!this.wasInside;if(this.wasInside=n,r)return this.phase="chasing",!0}else this.phase==="chasing"&&Number.isFinite(e)&&e>0&&(this.survived+=e);return!1}catch(){this.phase==="chasing"&&(this.phase="caught")}snapshot(){return{phase:this.phase,survived:this.survived,trigger:"house entry after garden shed bow pickup"}}};var Ro=class{constructor(e=0,{type:t="shambler",style:i="classic",boss:n=!1,deathVariant:r=e%3}={}){this.group=new at,this.group.name=`Easter pursuer ${e+1}`,this.variant=e,this.heading=0,this.type=t,this.style=i,this.boss=n,this.small=i==="child",this.deathVariant=r,this.deathDuration=n?2.6:t==="brute"?2.35:t==="runner"?1.95:2.15,this.group.scale.set(...t==="brute"?[1.26,1.06,1.18]:t==="runner"?[.91,.97,.93]:t==="flanker"?[.96,1,.96]:[1,1,1]),this.small?this.group.scale.set(.66,.71,.66):n?this.group.scale.set(1.17,1.1,1.12):i.startsWith("woman")&&this.group.scale.multiply(new I(.95,.99,.95));let a=(v,E={})=>new Xt({color:v,roughness:.94,flatShading:!0,...E}),o=a(["#89936f","#87917c","#929578"][e%3]),l=a({"woman-coat":"#665365","woman-hoodie":"#4b6571",worker:"#756547",hoodie:"#596b54",child:"#8c6b45",suit:"#3f4652",groundskeeper:"#485442"}[i]??["#485249","#5d5144","#40565b"][e%3]),c=a(i==="worker"?"#7a6b3c":"#27302e"),h=a(["#343b38","#34383f","#424137"][e%3]),u=a("#9a987f"),d=a("#d4cf9e",{emissive:"#9b9b57",emissiveIntensity:.22}),f=new As(1,8,6),p=new gt(1,1,1),x=new kn(1,1,3,7),m=(v,E,T,C,D)=>{let F=new Ye(E,T);return F.position.set(...C),F.scale.set(...D),F.castShadow=!0,F.receiveShadow=!0,v.add(F),F},g=(v,E)=>{let T=new at;return T.position.set(...E),v.add(T),T},_=(v,E,T,C)=>m(v,x,E,[0,-T/2,0],[C,T/3,C]);this.body=g(this.group,[0,.83,0]),m(this.body,f,h,[0,.025,0],[.163,.13,.105]),this.chest=g(this.body,[0,.15,0]),this.chest.rotation.x=.16,m(this.chest,x,l,[0,.185,0],[.158,.17,.1]);for(let v=0;v<5;v++)m(this.chest,p,l,[-.12+v*.06,-.062-v%2*.023,.025],[.053,.085+v%2*.035,.17]);m(this.chest,p,u,[0,.205,.102],[.09,.31,.012]);for(let v of[-1,1]){let E=m(this.chest,p,l,[v*.066,.23,.117],[.045,.29,.022]);E.rotation.z=v*.14}m(this.chest,p,c,[0,.16,.128],[.023,.27,.014]),this.head=g(this.chest,[0,.495,.045]),this.head.rotation.z=-.12-e*.025,m(this.head,x,o,[0,-.069,0],[.043,.045,.048]),m(this.head,f,o,[0,.059,.003],[.123,.151,.113]),m(this.head,f,o,[0,-.015,.052],[.091,.065,.074]);for(let v of[-1,1]){m(this.head,f,o,[v*.12,.045,0],[.026,.041,.019]);let E=m(this.head,f,c,[v*.047,.076,.099],[.039,.025,.02]);E.rotation.z=v*.12,m(this.head,f,d,[v*.047,.075,.116],[.016,.01,.007]);let T=m(this.head,p,o,[v*.047,.103,.111],[.072,.018,.025]);T.rotation.z=v*.15}m(this.head,p,o,[0,.04,.12],[.032,.055,.032]);let M=m(this.head,p,c,[.005,-.013,.116],[.066,.014,.014]);if(M.rotation.z=.1,m(this.head,f,c,[-.01,.17,-.016],[.117,.051,.099]),m(this.head,f,c,[-.099,.091,-.045],[.031,.086,.075]),i==="woman-coat"&&(m(this.head,f,c,[.015,.035,-.058],[.132,.177,.085]),m(this.head,f,c,[.097,-.035,.017],[.037,.124,.073]),m(this.chest,p,l,[0,-.1,-.008],[.315,.23,.22]),m(this.chest,p,u,[0,.005,.113],[.28,.027,.018])),i==="hoodie"||i==="woman-hoodie"){let v=m(this.head,new gi(.126,.03,5,12),c,[0,.06,-.025],[1,1.22,.95]);m(this.head,f,c,[0,.075,-.07],[.134,.166,.077]);for(let E of[-1,1])m(this.chest,p,u,[E*.04,.255,.124],[.009,.17,.009]);i==="woman-hoodie"&&m(this.head,f,c,[.028,-.06,-.145],[.058,.116,.055])}if(i==="worker"&&(m(this.head,f,c,[0,.189,-.008],[.141,.078,.13]),m(this.head,p,c,[0,.152,.018],[.3,.02,.3]),m(this.chest,p,u,[0,.26,.121],[.29,.039,.015])),i==="suit"){for(let v of[-1,1]){let E=m(this.chest,p,u,[v*.043,.332,.125],[.048,.08,.02]);E.rotation.z=v*.45}m(this.chest,p,c,[0,.307,.144],[.035,.042,.02])}this.small&&(this.head.scale.setScalar(1.18),m(this.chest,p,u,[0,.11,.113],[.115,.12,.019])),(n||i==="groundskeeper")&&(m(this.chest,p,l,[0,-.11,0],[.33,.26,.235]),m(this.chest,p,u,[0,.16,.122],[.17,.34,.022]),m(this.head,p,c,[0,.168,.047],[.25,.042,.255]),m(this.head,f,c,[0,-.04,.048],[.1,.088,.084])),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[];for(let v of[-1,1]){let E=g(this.chest,[v*(n?.166:.194),.355,0]);E.rotation.z=v*.09,_(E,l,.255,.058);let T=g(E,[0,-.25,0]);m(T,f,o,[0,0,0],[.044,.045,.044]),_(T,o,.255,.043),m(T,f,o,[0,-.282,.006],[.05,.073,.033]),m(T,p,o,[v*.029,-.292,.029],[.022,.072,.02]),this.arms.push(E),this.elbows.push(T);let C=g(this.body,[v*.092,-.024,0]);_(C,h,.36,.07);let D=g(C,[0,-.355,0]);_(D,h,.31,.051),m(D,f,h,[0,0,0],[.057,.06,.054]),this.feet.push(m(D,p,c,[0,-.36,.044],[.13,.11,.25])),this.legs.push(C),this.knees.push(D)}let b=new Set,y=[];this.group.traverse(v=>{v.isMesh?b.add(v.geometry):y.push(v)});for(let v of y){let E=new Map;for(let T of[...v.children])if(T.isMesh){let C=E.get(T.material)??[];C.push(T),E.set(T.material,C)}for(let[T,C]of E)if(C.length>1){let D=C.map(L=>(L.updateMatrix(),L.geometry.clone().applyMatrix4(L.matrix))),F=new Ye(En(D),T);F.castShadow=!0,F.receiveShadow=!0,C.forEach(L=>v.remove(L)),v.add(F),D.forEach(L=>L.dispose())}}let S=new Set;this.meshCount=0,this.bodyMeshes=[],this.group.traverse(v=>{v.isMesh&&(S.add(v.geometry),this.meshCount++,this.bodyMeshes.push(v))}),b.forEach(v=>{S.has(v)||v.dispose()}),this.head.traverse(v=>{v.isMesh&&(v.userData.hitZone="head")});let R=new Set;this.group.traverse(v=>{v.isMesh&&R.add(v.material)}),this.materials=[...R];for(let v of this.materials)v.userData.baseEmissive=v.emissive.clone();this.solePoint=new I,this.motionBlend=0,this.lookYaw=0,this.previousAction="",this.recoilSide=e%2?1:-1,this.update(0,{x:0,y:0,z:0},{x:0,y:-1},!1,0)}soleHeights(){return this.group.updateMatrixWorld(!0),this.feet.map(e=>{let t=1/0;for(let i of[-.5,.5])for(let n of[-.5,.5])for(let r of[-.5,.5])this.solePoint.set(i,n,r).applyMatrix4(e.matrixWorld),t=Math.min(t,this.solePoint.y);return t})}update(e,t,i,n,r=1/60,a={}){let o=!!a.running,l=this.type==="brute",c=this.type==="flanker",h=(o?7:l?2.8:c?4.5:3.8)*(this.small?1.2:this.boss?.88:1),u=e*h,d=Math.sin(u),f=-d,p=Math.sin(e*1.43+this.variant*1.91);this.motionBlend+=(Number(n)-this.motionBlend)*Math.min(1,Math.max(0,r)*9);let x=this.motionBlend,m=Math.max(0,Math.sin(e*.55+this.variant*2.23))**10,g=a.state??"pursue";g==="stagger"&&this.previousAction!=="stagger"&&(this.recoilSide*=-1),this.previousAction=g,this.group.position.set(t.x,t.z+.01,-t.y);let _=0;if(Math.hypot(i.x,i.y)>1e-4){let y=Math.atan2(i.x,-i.y),S=Math.atan2(Math.sin(y-this.heading),Math.cos(y-this.heading));this.heading+=S*Math.min(1,r*8),_=Math.atan2(Math.sin(y-this.heading),Math.cos(y-this.heading))}this.lookYaw+=(Math.max(-.55,Math.min(.55,_))*.8-this.lookYaw)*Math.min(1,r*10),this.group.rotation.y=this.heading,this.body.position.set(0,.8,0),this.body.scale.set(1,1,1),this.body.rotation.set(c?.035:0,(o?.075:l?.06:.04)*d*x,.008*p+(l?.045:o?.018:.028)*d*x),this.chest.rotation.set((c?.28:o?.23:l?.12:.17)+.008*p,-d*x*(o?.13:c?.1:.055),p*.012-d*x*(l?.07:.035)),this.head.rotation.set(.015*p,this.lookYaw+(1-x)*(.13*Math.sin(e*.71+this.variant)+m*.18),-.09-this.variant*.02+.04*Math.sin(e*1.7+this.variant));let M=o?.49:l?.235:c?.3:.31;for(let y=0;y<2;y++){let S=y?f:d,R=y?1:-1;this.legs[y].rotation.set(S*M*x,0,R*(l?.026:.012)),this.knees[y].rotation.set((c?.16:y?.035:0)+Math.max(0,-S)*(o?.78:c?.4:.28)*x,0,0),this.arms[y].rotation.set(o?-.38+S*.61:-(y?.91:.69)+S*.09*x+.035*p,R*(c?.1:.025),R*(.075+.035*S*x)),this.elbows[y].rotation.set(o?-.83-S*.17:-(y?.22:.17),0,0)}!n&&g==="pursue"&&(this.arms[this.variant%2].rotation.x-=m*.26,this.elbows[(this.variant+1)%2].rotation.x-=m*.17),(g==="hide"||g==="peek")&&(this.chest.rotation.x=.31,this.knees[0].rotation.x=this.knees[1].rotation.x=.28,this.head.rotation.y=this.lookYaw+Math.sin(e*1.35+this.variant)*.22,this.chest.rotation.y=(g==="peek"?.13:.04)*Math.sin(e*1.35),this.arms[0].rotation.x=-.5,this.arms[1].rotation.x=-.6);let b=Math.max(0,Math.min(1,a.progress??0));if(g==="windup"){let y=b*b*(3-2*b);this.arms[0].rotation.x=-.9-y*1.75,this.arms[1].rotation.x=l?this.arms[0].rotation.x:-.85-y*.74,this.elbows[0].rotation.x=l?-.55:-.4,this.elbows[1].rotation.x=l?-.55:-.24,this.chest.rotation.x=.16-y*(l?.22:.15),this.chest.rotation.y=l?0:-y*.17,this.head.rotation.x=-y*.065,this.body.rotation.z=l?0:-y*.03}else if(g==="recover"){let y=Math.sin(Math.min(1,b/.28)*Math.PI/2),S=Math.max(0,(b-.28)/.72),R=-2.65+y*2.27-S*.31;this.arms[0].rotation.x=R,this.arms[1].rotation.x=l?R:-1.59+y*.95-S*.27,this.elbows[0].rotation.x=l?-.55+y*.42:-.4+y*.25,this.elbows[1].rotation.x=l?this.elbows[0].rotation.x:-.22,this.chest.rotation.x=(l?-.06:.01)+y*(l?.5:.32)-S*.28,this.chest.rotation.y=l?0:-.17+y*.35-S*.18,this.head.rotation.x=y*.08*(1-S)}else if(g==="stagger"){let y=Math.sin(b*Math.PI),S=l?.11:this.type==="runner"?.34:c?.23:.26;this.body.rotation.x=-S*y,this.body.rotation.y=this.recoilSide*S*.65*y,this.body.rotation.z=this.recoilSide*S*.2*y,this.head.rotation.x=-S*.65*y,this.head.rotation.z+=this.recoilSide*.2*y,this.arms[0].rotation.x-=y*.34,this.arms[1].rotation.x+=y*.16}if(g==="dead"){let y=Math.max(0,Math.min(1,(b-.06)/.54)),S=y*y*(3-2*y),R=this.variant%2?1:-1,v=this.type==="runner"?Math.sin(Math.min(1,b/.3)*Math.PI)*.12:0;this.body.position.y=.8-.57*S,this.body.position.z=(this.deathVariant===0?-.13:this.deathVariant===1?-.05:0)*S,this.body.rotation.y=R*.07*S,this.body.rotation.z=0,this.deathVariant===1?(this.body.rotation.z=R*1.45*S,this.body.rotation.x=.1*S,this.chest.rotation.x=.17+.08*S,this.body.position.x=R*.05*S):this.deathVariant===2?(this.body.rotation.x=-1.55*S-v,this.chest.rotation.x=.17-.1*S):(this.body.rotation.x=1.5*S+v,this.chest.rotation.x=.17+.23*S),this.head.rotation.x=.2*S,this.head.rotation.z+=R*.1*S,this.legs[0].rotation.x=this.legs[1].rotation.x=-(this.deathVariant===0?1:this.deathVariant===1?.5:.4)*S,this.knees[0].rotation.x=this.knees[1].rotation.x=(this.deathVariant===0?2.2:this.deathVariant===1?1:.8)*S,this.arms[0].rotation.x=this.arms[1].rotation.x=-.16-S*.12,this.arms[0].rotation.z=-.065,this.arms[1].rotation.z=.065,this.elbows[0].rotation.x=this.elbows[1].rotation.x=-.25-S*.32}for(let y=0;y<2;y++)this.feet[y].rotation.set(...g==="dead"?[0,0,0]:[-this.legs[y].rotation.x-this.knees[y].rotation.x-this.body.rotation.x,0,-this.legs[y].rotation.z-this.body.rotation.z]);if(g!=="dead"){let y=Math.min(...this.soleHeights());this.body.position.y+=(t.z+.004-y)/this.group.scale.y}this.group.updateMatrixWorld(!0);for(let y of this.materials){y.emissive.copy(y.userData.baseEmissive),a.hitFlash>0&&y.emissive.addScalar(a.hitFlash*.35);let S=g==="dead"?Math.max(0,Math.min(1,(1-b)/.26)):1;y.transparent!==S<1&&(y.transparent=S<1,y.needsUpdate=!0),y.opacity=S,y.depthWrite=S>.5}if(g==="dead"){this.deathBounds??=new Bt,this.meshBounds??=new Bt,this.group.updateMatrixWorld(!0),this.deathBounds.makeEmpty();for(let y of this.bodyMeshes)y.geometry.boundingBox||y.geometry.computeBoundingBox(),this.meshBounds.copy(y.geometry.boundingBox).applyMatrix4(y.matrixWorld),this.deathBounds.union(this.meshBounds);this.group.position.y+=t.z+.005-this.deathBounds.min.y}}dispose(){let e=new Set,t=new Set;this.group.traverse(i=>{i.isMesh&&(e.add(i.geometry),t.add(i.material))}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.group.removeFromParent()}};var Vr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),Sd=s=>({x:s.x,y:s.y,z:s.z}),dm=()=>globalThis.performance?.now()??Date.now(),zs=class extends Bs{constructor(e){super({...e}),this.allSegments=this.segments,this.allObstacles=e.obstacles,this.allSurfaces=e.surfaces,this.buckets=new Map}bucket(e,t){let i=Math.floor(e/2),n=Math.floor(t/2),r=`${i},${n}`;if(this.buckets.has(r))return this.buckets.get(r);let a=(f,p,x,m)=>f<=i*2+2&&x>=i*2&&p<=n*2+2&&m>=n*2,o=f=>[Math.min(...f.map(p=>p[0])),Math.min(...f.map(p=>p[1])),Math.max(...f.map(p=>p[0])),Math.max(...f.map(p=>p[1]))],l=.3,c=this.allSegments.filter(f=>{let p=f.thickness/2+l;return a(Math.min(f.a[0],f.b[0])-p,Math.min(f.a[1],f.b[1])-p,Math.max(f.a[0],f.b[0])+p,Math.max(f.a[1],f.b[1])+p)}),h=this.allObstacles.filter(f=>{let[p,x,m,g]=f.box??o(f.polygon);return a(p-l,x-l,m+l,g+l)}),u=this.allSurfaces.filter(f=>a(...o(f.polygon))),d={segments:c,obstacles:h,surfaces:u};return this.buckets.set(r,d),d}blocked(e,t,i){let n=this.bucket(e,t);return this.segments=n.segments,this.data.obstacles=n.obstacles,super.blocked(e,t,i)}support(e,t,i){return this.data.surfaces=this.bucket(e,t).surfaces,super.support(e,t,i)}},Wr=class{constructor(e,{spacing:t=.2,radius:i=.18}={}){this.nav=new zs(e),this.nav.radius=i,this.spacing=t,this.cells=new Map,this.edges=new Map,this.nodes=[],this.data=e}cell(e,t){let i=`${e},${t}`;if(this.cells.has(i))return this.cells.get(i);let n=e*this.spacing,r=t*this.spacing,a=(this.data.floorLevels??[{z:0},{z:this.data.levelHeight}]).map(c=>c.z);a.push(...this.nav.rampHeights(n,r));for(let c of this.nav.bucket(n,r).surfaces)Jt(n,r,c.polygon)&&a.push(c.z);let o=this.nav.stairHeight(n,r);o!==null&&a.push(o);let l=[];for(let c of a){let h=this.nav.support(n,r,c);if(h===null||l.some(d=>Math.abs(d.z-h)<.035)||this.nav.blocked(n,r,h))continue;let u={x:n,y:r,z:h,ix:e,iy:t,id:this.nodes.length};this.nodes.push(u),l.push(u)}return this.cells.set(i,l),l}clear(e,t){let i=Math.hypot(t.x-e.x,t.y-e.y);if(i<1e-5)return Math.abs(e.z-t.z)<.04;let n=Math.ceil(i/.04),r=e.z;for(let a=1;a<=n;a++){let o=a/n,l=e.x+(t.x-e.x)*o,c=e.y+(t.y-e.y)*o,h=this.nav.support(l,c,r);if(h===null||this.nav.blocked(l,c,h))return!1;r=h}return Math.abs(r-t.z)<.045}connectors(e,t=!0){let i=Math.round(e.x/this.spacing),n=Math.round(e.y/this.spacing),r=[];for(let a=-2;a<=2;a++)for(let o=-2;o<=2;o++)for(let l of this.cell(i+a,n+o))Math.abs(l.z-e.z)>.35||r.push(l);return r.sort((a,o)=>Vr(a,e)-Vr(o,e)).filter(a=>t?this.clear(e,a):this.clear(a,e)).slice(0,8)}neighbours(e){if(this.edges.has(e.id))return this.edges.get(e.id);let t=[];for(let i=-1;i<=1;i++)for(let n=-1;n<=1;n++)if(!(!i&&!n))for(let r of this.cell(e.ix+i,e.iy+n))Math.abs(r.z-e.z)>.39||!this.clear(e,r)||t.push(r);return this.edges.set(e.id,t),t}search(e,t){return new Ed(this,e,t)}path(e,t,i=6e4){let n=this.search(e,t);for(;!n.done&&n.expanded<i;)n.step(1e3,1/0);return n.path}},wd=class{constructor(){this.a=[]}push(e){let t=this.a,i=t.length;for(t.push(e);i;){let n=i-1>>1;if(t[n].f<=e.f)break;t[i]=t[n],i=n}t[i]=e}pop(){let e=this.a,t=e[0],i=e.pop();if(e.length){let n=0;for(;2*n+1<e.length;){let r=2*n+1;if(r+1<e.length&&e[r+1].f<e[r].f&&r++,e[r].f>=i.f)break;e[n]=e[r],n=r}e[n]=i}return t}get length(){return this.a.length}},Ed=class{constructor(e,t,i){this.planner=e,this.from=Sd(t),this.to=Sd(i),this.path=null,this.done=!1,this.expanded=0,this.heap=new wd,this.cost=new Map,this.parent=new Map,this.closed=new Set,this.initialized=!1}step(e=48,t=3){if(this.done)return!0;let i=dm(),n=this.planner;if(!this.initialized){if(this.initialized=!0,n.clear(this.from,this.to))return this.path=[this.from,this.to],this.done=!0,!0;let a=n.connectors(this.to,!1);this.goals=new Set(a.map(o=>o.id));for(let o of n.connectors(this.from)){let l=Vr(this.from,o);this.cost.set(o.id,l),this.heap.push({n:o,g:l,f:l+Vr(o,this.to)})}if(!this.goals.size||!this.heap.length)return this.done=!0,!0}let r=0;for(;this.heap.length&&r<e&&dm()-i<t;){let{n:a,g:o}=this.heap.pop();if(!this.closed.has(a.id)){if(this.closed.add(a.id),this.expanded++,r++,this.goals.has(a.id)){let l=[this.to],c=a;for(;c;)l.push(Sd(c)),c=n.nodes[this.parent.get(c.id)];return l.push(this.from),this.path=l.reverse(),this.done=!0,!0}for(let l of n.neighbours(a)){if(this.closed.has(l.id))continue;let c=o+Vr(a,l);c>=(this.cost.get(l.id)??1/0)||(this.cost.set(l.id,c),this.parent.set(l.id,a.id),this.heap.push({n:l,g:c,f:c+Vr(l,this.to)}))}if(this.expanded>=6e4)return this.done=!0,!0}}return this.heap.length||(this.done=!0),this.done}};var Mi=s=>({x:s.x,y:s.y,z:s.z}),qr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),Si=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),Xr=()=>performance.now(),jr=(s,e=0)=>{let t=s+Math.imul(e+17,92821)>>>0;return t=Math.imul(t^t>>>16,73244475),t=Math.imul(t^t>>>16,73244475),((t^t>>>16)>>>0)/4294967296},By=Object.freeze({shambler:{health:75,speed:1.06,radius:.25,wallRadius:.18,damage:12,range:.84,windup:.78,recovery:1.05},runner:{health:52,speed:1.88,radius:.23,wallRadius:.18,damage:9,range:.79,windup:.48,recovery:.82},brute:{health:180,speed:.79,radius:.31,wallRadius:.23,damage:26,range:1.02,windup:1.16,recovery:1.48},flanker:{health:90,speed:1.31,radius:.24,wallRadius:.18,damage:14,range:.85,windup:.64,recovery:1.03}}),Qc=class{constructor(e,{maxAlive:t=12,onAttack:i=()=>{},onDeath:n=()=>{},canSpawn:r=()=>!0}={}){this.data=e,this.maxAlive=Math.max(1,Math.min(20,Math.floor(t))),this.onAttack=i,this.onDeath=n,this.canSpawn=r,this.group=new at,this.group.name="Survival horde",this.actors=[],this.planners=new Map,this.nextId=1,this.time=0,this.wave=0,this.total=0,this.spawned=0,this.killed=0,this.skipped=0,this.droppedSpawns=0,this.active=!1,this.player={x:0,y:0,z:0},this.heading={x:0,y:1},this.spawnJob=null,this.candidates=[],this.nextSpawn=0,this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0,this.roundRobin=0}get positions(){return this.actors.filter(e=>e.alive).map(e=>Mi(e.nav.position))}planner(e=.18){return this.planners.has(e)||this.planners.set(e,new Wr(this.data,{radius:e,spacing:e>.24?.16:.2})),this.planners.get(e)}reset(){for(let e of this.actors)e.figure.dispose();this.actors=[],this.group.clear(),this.spawnJob=null,this.candidates=[],this.active=!1,this.total=this.spawned=this.killed=this.skipped=this.droppedSpawns=0,this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0,this.time=0}startWave(e,t,i){return this.reset(),this.wave=Math.max(1,Math.floor(e)),this.total=Math.max(1,Math.floor(i??4+this.wave*3)),this.active=!0,this.player=Mi(t),this.nextSpawn=0,this.state()}state(){let e=this.actors.filter(n=>n.alive).length,t=Math.max(0,this.total-this.spawned-this.droppedSpawns),i=this.actors.find(n=>n.alive&&n.boss);return{wave:this.wave,alive:e,queued:t,killed:this.killed,total:this.total,spawned:this.spawned,skipped:this.skipped,complete:this.active&&e===0&&t===0&&!this.spawnJob,positions:this.positions,boss:i?{id:i.id,health:i.health,maxHealth:i.maxHealth}:null}}blocks(e,t=.18,i=null){return this.actors.some(n=>n.alive&&n.id!==i&&Math.abs(n.nav.position.z-e.z)<1.6&&Si(n.nav.position,e)<n.radius+t+1e-5)}typeFor(e){let t=this.wave%5===0?["brute","shambler","brute","runner","brute","flanker","brute","shambler"]:this.wave%3===0?["runner","runner","shambler","runner","flanker","runner","brute","runner"]:this.wave===1?["shambler","shambler","runner","shambler"]:this.wave===2?["shambler","runner","flanker","shambler","runner"]:["shambler","runner","flanker","brute","runner","shambler"];return t[e%t.length]}appearance(e,t){let i=this.wave%5===0&&e===0,n=["woman-coat","worker","hoodie","child","suit","woman-hoodie"],r=i?"groundskeeper":n[(e+this.wave-1)%n.length];r==="child"&&t==="brute"&&(r="worker");let a={...By[t]};return i?Object.assign(a,{health:350,speed:.69,radius:.32,wallRadius:.25,damage:34,windup:1.38,recovery:1.75,range:1.08}):r==="child"&&Object.assign(a,{health:Math.round(a.health*.65),speed:a.speed*1.08,radius:.17,wallRadius:.13,range:.66,windup:a.windup*.9,recovery:a.recovery*.92}),{style:r,boss:i,stats:a}}spawnAllowed(e,t){return this.canSpawn(e,t)?!0:(this.spawnVisibilityBlocked=!0,this.spawnStall=0,!1)}spawnCandidates(e,t,i,n){let r=this.planner(i),a=[];for(let h of this.data.rooms??[]){let[u,d,f]=h.position;for(let[p,x]of[[0,0],[.65,0],[-.65,0],[0,.65],[0,-.65]])a.push({x:u+p,y:d+x,z:f})}for(let h of[6,9,13])for(let u=0;u<20;u++){let d=u*Math.PI/10;a.push({x:e.x+Math.cos(d)*h,y:e.y+Math.sin(d)*h,z:e.z})}let o=Math.hypot(t.x,t.y)||1,l=t.x/o,c=t.y/o;return a.filter(h=>qr(h,e)>5&&qr(h,e)<27&&r.nav.support(h.x,h.y,h.z)!==null&&!r.nav.blocked(h.x,h.y,h.z)&&!this.blocks(h,.45)&&this.spawnAllowed(h,n)).map(h=>{let u=Si(h,e),d=((h.x-e.x)*l+(h.y-e.y)*c)/(u||1)>.55;return{...h,score:Math.abs(u-9)+(d?6:0)+Math.abs(h.z-e.z)*.7}}).sort((h,u)=>h.score-u.score).slice(0,90)}createActor(e,t,i,n=this.appearance(this.spawned,e)){let{stats:r,style:a,boss:o}=n,l=this.nextId++,c=o?0:Math.floor(jr(l,55)*3),h=new Ro(l%3,{type:e,style:a,boss:o,deathVariant:c});h.group.userData.actorId=l,h.group.traverse(x=>{x.isMesh&&(x.userData.actorId=l)}),this.group.add(h.group);let u=new zs(this.data);u.radius=r.wallRadius,u.position=Mi(t);let d=1+Math.min(.55,Math.max(0,this.wave-1)*.035),f=Math.round(r.health*d),p={id:l,type:e,style:a,boss:o,stats:r,figure:h,nav:u,radius:r.radius,health:f,maxHealth:f,alive:!0,state:"pursue",stateTime:0,path:i,index:1,job:null,lastTarget:Mi(this.player),nextPlan:this.time+.4+l%5*.12,stalled:0,unreachable:0,lastProgress:this.time,phase:l*1.713,flankSide:l%2?1:-1,flankUntil:0,attackAim:{x:0,y:1},hitFlash:0,staggerDuration:.35,deathTime:0,deathDuration:h.deathDuration,deathVariant:c,knockback:{x:0,y:0},speedMultiplier:.78+jr(l,this.wave)*.47,temperament:!o&&this.wave>2&&(this.spawned+this.wave)%7===0?"ambusher":"pursuer",hideGoal:null,hideUntil:0,nextHide:this.time+12+jr(l,9)*8,alerted:!1,noticeDirection:{x:this.player.x-t.x,y:this.player.y-t.y}};return h.update(this.time,t,{x:this.player.x-t.x,y:this.player.y-t.y},!1,1),this.actors.push(p),this.spawned++,p.temperament==="ambusher"&&this.beginHide(p),p}spawnStep(e,t){if(!(this.state().queued<=0||this.actors.filter(i=>i.alive).length>=this.maxAlive)&&(this.spawnVisibilityBlocked||(this.spawnStall+=e),!(this.time<this.nextSpawn))){if(!this.spawnJob){let i=this.typeFor(this.spawned),n=this.appearance(this.spawned,i),r=n.stats.wallRadius;this.candidates.length||(this.spawnVisibilityBlocked=!1,this.candidates=this.spawnCandidates(this.player,this.heading,r,n),this.candidateRounds++);let a=this.candidates.shift();a&&!this.planner(r).nav.blocked(a.x,a.y,a.z)&&this.spawnAllowed(a,n)&&(this.spawnJob={point:a,type:i,appearance:n,job:this.planner(r).search(a,this.player),started:this.time})}if(this.spawnJob&&Xr()<t){let{point:i,type:n,appearance:r,job:a,started:o}=this.spawnJob;a.step(28,Math.max(.1,t-Xr())),(a.done||a.expanded>12e3||this.time-o>8)&&(a.path&&qr(i,this.player)>5&&!this.blocks(i,r.stats.radius+.16)&&this.spawnAllowed(i,r)&&(this.createActor(n,i,a.path,r),this.nextSpawn=this.time+Math.max(.28,.72-this.wave*.035),this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0),this.spawnJob=null)}if(!this.spawnVisibilityBlocked&&this.spawnStall>28){let i=this.state().queued;this.skipped+=i,this.droppedSpawns+=i,this.spawnJob=null,this.candidates=[]}}}target(e){let t=e.nav.position,i=this.player,n=this.planner(e.stats.wallRadius);if(e.hideGoal&&["seeking-hide","hide","peek"].includes(e.state))return Mi(e.hideGoal);if(e.type==="flanker"&&Si(t,i)>2.3&&Math.abs(t.z-i.z)<.3){let r=i.x-t.x,a=i.y-t.y,o=Math.hypot(r,a)||1,l=1.25*e.flankSide,c={x:i.x-a/o*l,y:i.y+r/o*l,z:i.z};if(n.nav.support(c.x,c.y,c.z)!==null&&!n.nav.blocked(c.x,c.y,c.z)&&n.clear(c,i))return c}return Mi(i)}canSee(e,t=this.player){let i=e.nav.position,n=t.x-i.x,r=t.y-i.y,a=Math.hypot(n,r),o=e.noticeDirection;if(a>12||Math.abs(i.z-t.z)>.45)return!1;let l=Math.hypot(o.x,o.y)||1;return(n*o.x+r*o.y)/(Math.max(.001,a)*l)>.5&&this.planner(e.stats.wallRadius).clear(i,t)}wallOccludes(e,t){let i=this.player,n=i.x-t.x,r=i.y-t.y;for(let a of this.planner(e.stats.wallRadius).nav.allSegments){if(a.bottom>t.z+1.3||a.top<t.z+1.3)continue;let o=a.b[0]-a.a[0],l=a.b[1]-a.a[1],c=n*l-r*o;if(Math.abs(c)<1e-8)continue;let h=a.a[0]-t.x,u=a.a[1]-t.y,d=(h*l-u*o)/c,f=(h*r-u*n)/c;if(d>0&&d<1&&f>=0&&f<=1)return!0}return!1}coverPoint(e){let t=e.nav.position,i=this.planner(e.stats.wallRadius);if(this.wallOccludes(e,t))return Mi(t);let n=[];for(let r of i.nav.allSegments){if(r.bottom>t.z+.3||r.top<t.z+1.2)continue;let a=r.b[0]-r.a[0],o=r.b[1]-r.a[1],l=Math.hypot(a,o);if(l<.6)continue;let c=a/l,h=o/l,u=r.thickness/2+e.stats.wallRadius+.16;for(let d of[r.a,r.b])for(let f of[-1,1]){let p={x:d[0]-h*u*f,y:d[1]+c*u*f,z:t.z};Si(t,p)<4&&Si(p,this.player)>2&&n.push(p)}}for(let r of n.sort((a,o)=>Si(a,t)-Si(o,t)).slice(0,18))if(i.nav.support(r.x,r.y,r.z)!==null&&!i.nav.blocked(r.x,r.y,r.z)&&!this.blocks(r,e.radius,e.id)&&this.wallOccludes(e,r))return r;return null}beginHide(e){let t=this.coverPoint(e);if(e.nextHide=this.time+14+jr(e.id,Math.floor(this.time))*8,!t)return!1;let i=e.path?.[1]??this.player;return e.hideGoal=t,e.hideUntil=this.time+6+jr(e.id,4)*3.5,e.state=Si(t,e.nav.position)<.2?"hide":"seeking-hide",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=!1,e.noticeDirection={x:i.x-e.nav.position.x,y:i.y-e.nav.position.y},e.peekBase=Math.atan2(e.noticeDirection.y,e.noticeDirection.x),!0}endHide(e,t=!1){e.hideGoal=null,e.state="pursue",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=t}canStrike(e,t=0){let i=e.nav.position;return Math.abs(i.z-this.player.z)<.42&&Si(i,this.player)<=e.stats.range+t&&this.planner(e.stats.wallRadius).clear(i,this.player)}tryMove(e,t,i,{separate:n=!0}={}){let r=Math.max(1,Math.ceil(Math.hypot(t,i)/.035)),a=Mi(e.nav.position);for(let o=0;o<r;o++){let l=Mi(e.nav.position);e.nav.move(t/r,i/r);let c=e.nav.position;if(Math.abs(c.z-this.player.z)<1.6&&Si(c,this.player)<e.radius+.18||n&&this.blocks(c,e.radius,e.id)){e.nav.position=l;break}}return Si(a,e.nav.position)}moveActor(e,t){if(!e.path||e.index>=e.path.length)return 0;let i=this.planner(e.stats.wallRadius),n=e.nav.position;for(let M=Math.min(e.path.length-1,e.index+4);M>e.index;M--)if(qr(n,e.path[M])<1.1&&i.clear(n,e.path[M])){e.index=M;break}let r=e.path[e.index],a=r.x-n.x,o=r.y-n.y,l=Math.hypot(a,o);if(l<.045)return e.index++,0;let c=e.stats.speed*e.speedMultiplier*(1+Math.min(.2,this.wave*.009));e.type==="runner"&&(c*=Math.sin(this.time*.8+e.phase)>.35?1.2:.84),e.type==="brute"&&(c*=.94+.06*Math.sin(this.time*2+e.phase));let h=Math.min(l,c*t),u=a/l,d=o/l,f=0,p=0;for(let M of this.actors)if(M!==e&&M.alive&&Math.abs(M.nav.position.z-n.z)<1.2){let b=n.x-M.nav.position.x,y=n.y-M.nav.position.y,S=Math.hypot(b,y),R=e.radius+M.radius+.35;S>0&&S<R&&(f+=b/S*(R-S)/R,p+=y/S*(R-S)/R)}let x=u+f*.8,m=d+p*.8,g=Math.hypot(x,m)||1,_=this.tryMove(e,x/g*h,m/g*h);if(_<h*.2){let M=e.flankSide;_+=this.tryMove(e,(u*.35-d*M*.75)*h,(d*.35+u*M*.75)*h)}return e.stalled=_<h*.12?e.stalled+t:Math.max(0,e.stalled-t*2),_>.003&&(e.lastProgress=this.time),e.stalled>.7&&(e.path=null,e.job=null,e.nextPlan=this.time+.15,e.stalled=0,e.flankSide*=-1),_}planActor(e,t){if(e.state==="hide"||e.state==="peek")return;let i=this.target(e),n=this.planner(e.stats.wallRadius);if(!e.job&&this.time>=e.nextPlan&&(!e.path||e.index>=e.path.length||qr(i,e.lastTarget)>.75)&&(e.job=n.search(e.nav.position,i),e.lastTarget=Mi(i),e.nextPlan=this.time+1+e.id%4*.14,e.jobStarted=this.time),e.job&&Xr()<t&&(e.job.step(22,Math.max(.1,t-Xr())),e.job.done||this.time-e.jobStarted>8)){if(e.job.path){e.path=e.job.path,e.index=1,e.unreachable=0;let r=1/0;for(let a=1;a<e.path.length;a++){let o=qr(e.nav.position,e.path[a]);o<r&&n.clear(e.nav.position,e.path[a])&&(e.index=a,r=o)}}else e.unreachable++,e.path=null,e.nextPlan=this.time+1.4;e.job=null}e.unreachable>=5&&this.time-e.lastProgress>40&&(e.alive=!1,e.state="dead",e.deathTime=0,e.retired=!0,this.skipped++)}damage(e,t,{headshot:i=!1,knockback:n=null}={}){let r=this.actors.find(a=>a.id===e&&a.alive);if(!r||!Number.isFinite(t)||t<=0)return{hit:!1,killed:!1,id:e};if(r.health=Math.max(0,r.health-t),r.hitFlash=1,n){let a=Array.isArray(n)?n[0]:n.x,o=Array.isArray(n)?n[1]:n.y;if(Number.isFinite(a)&&Number.isFinite(o)){let l=Math.hypot(a,o),c=l>1.1?1.1/l:1;r.knockback={x:a*c,y:o*c}}}return r.health===0?(r.alive=!1,r.state="dead",r.deathTime=0,r.job=null,this.killed++,this.onDeath({id:r.id,type:r.type,style:r.style,boss:r.boss,headshot:i,position:Mi(r.nav.position)})):(r.state="stagger",r.stateTime=0,r.hideGoal=null,r.alerted=!0,r.staggerDuration=(r.type==="brute"?.2:.34)+(i?.14:0)),{hit:!0,killed:!r.alive,health:r.health,id:e}}step(e,t,i={x:0,y:1}){if(!this.active)return this.state();e=Math.max(0,Math.min(.08,e)),this.time+=e,this.player=Mi(t),this.heading=Array.isArray(i)?{x:i[0],y:i[1]}:typeof i=="number"?{x:-Math.sin(i),y:Math.cos(i)}:i;let n=Xr()+4;this.spawnStep(e,n);let r=this.actors.filter(a=>a.alive);for(let a=0;a<r.length;a++){let o=r[(a+this.roundRobin)%r.length];if(Xr()>=n)break;this.planActor(o,n)}this.roundRobin++;for(let a of[...this.actors]){let o=Mi(a.nav.position);if(a.hitFlash=Math.max(0,a.hitFlash-e*5),!a.alive){a.deathTime+=e,a.figure.update(this.time,a.nav.position,{x:0,y:0},!1,e,{state:"dead",progress:a.deathTime/a.deathDuration}),a.deathTime>=a.deathDuration&&(a.figure.dispose(),this.actors.splice(this.actors.indexOf(a),1));continue}a.stateTime+=e;let l=0,c=a.knockback;if(Math.hypot(c.x,c.y)>.001){let d=1-Math.exp(-e*12);this.tryMove(a,c.x*d,c.y*d),c.x*=1-d,c.y*=1-d}if(["hide","peek","seeking-hide"].includes(a.state)){let d=a.peekBase+Math.sin(this.time*1.35+a.phase)*.55;a.noticeDirection={x:Math.cos(d),y:Math.sin(d)},this.time>=a.hideUntil||this.canSee(a)?this.endHide(a,this.canSee(a)):a.state==="seeking-hide"?(l=this.moveActor(a,e),a.hideGoal&&Si(a.nav.position,a.hideGoal)<.25&&(a.state="hide",a.stateTime=0,a.path=null,a.job=null)):a.state=Math.sin(this.time*1.2+a.phase)>.25?"peek":"hide"}else if(a.state==="pursue"&&a.type==="flanker"&&!a.boss&&this.wave>2&&this.time>=a.nextHide)a.nextHide=this.time+14,Si(a.nav.position,t)>2.5&&Si(a.nav.position,t)<9&&jr(a.id,Math.floor(this.time/10))<.35&&this.beginHide(a)||(l=this.moveActor(a,e));else if(a.state==="stagger")a.stateTime>=a.staggerDuration&&(a.state="pursue",a.stateTime=0);else if(a.state==="windup"){if(a.stateTime>=a.stats.windup){let d=t.x-a.nav.position.x,f=t.y-a.nav.position.y,p=Math.hypot(d,f)||1;this.canStrike(a,.08)&&(d*a.attackAim.x+f*a.attackAim.y)/p>.55&&this.onAttack({id:a.id,type:a.type,damage:a.stats.damage,position:Mi(a.nav.position)}),a.state="recover",a.stateTime=0}}else if(a.state==="recover")a.stateTime>=a.stats.recovery&&(a.state="pursue",a.stateTime=0);else if(this.canStrike(a)){let d=t.x-a.nav.position.x,f=t.y-a.nav.position.y,p=Math.hypot(d,f)||1;a.state="windup",a.stateTime=0,a.attackAim={x:d/p,y:f/p}}else l=this.moveActor(a,e);let h=a.state==="windup"||a.state==="recover"?a.attackAim:["hide","peek"].includes(a.state)?a.noticeDirection:{x:a.nav.position.x-o.x,y:a.nav.position.y-o.y};Math.hypot(h.x,h.y)>1e-4&&!["hide","peek","seeking-hide"].includes(a.state)&&(a.noticeDirection={...h});let u=a.state==="windup"?a.stats.windup:a.state==="recover"?a.stats.recovery:a.staggerDuration;a.figure.update(this.time+a.phase,a.nav.position,h,l>.001,e,{state:a.state,progress:a.stateTime/u,running:a.type==="runner"&&l>.001,hitFlash:a.hitFlash})}return this.state()}};function zy(s,e={},t=new Bt){let i=e.style==="child",n=e.boss||e.stats?.radius>=.3,r=i?.82:n?1.3:1.12,a=i?2.05:n?3.1:2.8;return t.min.set(s.x-r,s.z-.15,-s.y-r),t.max.set(s.x+r,s.z+a,-s.y+r),t}function fm(s,{margin:e=.15}={}){let t=new Ue,i=new Ue,n=new gn,r=new Bt,a=1+Math.max(0,e);return(o,l={})=>{if(!s?.isCamera||![o?.x,o?.y,o?.z].every(Number.isFinite))return!1;s.updateWorldMatrix(!0,!1),t.copy(s.projectionMatrix);for(let c of[0,4,8,12,1,5,9,13])t.elements[c]/=a;return i.multiplyMatrices(t,s.matrixWorldInverse),n.setFromProjectionMatrix(i,s.coordinateSystem,s.reversedDepth),!n.intersectsBox(zy(o,l,r))}}var Ht={bow:{label:"Bow",magazine:1,reserve:18,damage:75,interval:.55,reload:0},pistol:{label:"Pistol",magazine:12,reserve:48,damage:42,interval:.24,reload:1.3},shotgun:{label:"Shotgun",magazine:6,reserve:24,damage:23,pellets:7,interval:.9,reload:2.1},carbine:{label:"Carbine",magazine:24,reserve:96,damage:30,interval:.115,reload:1.8}},eh=s=>({total:4+s*2+(s%3===0?4:0),event:s%5===0?"Heavy footsteps":s%3===0?"The rush":"Hold the house",rest:14}),th=class{constructor(){this.reset()}reset(){this.health=100,this.score=0,this.kills=0,this.wave=0,this.phase="prepare",this.rest=0,this.inventory={},this.weapon=null,this.cooldown=0,this.reloading=0,this.charge=0,this.firing=!1,this.shoveCooldown=0,this.combo=0,this.comboTime=0}acquire(e){if(!Ht[e])return!1;if(this.inventory[e])return this.supply(),!1;let t=Ht[e];return this.inventory[e]={loaded:e==="bow"?0:t.magazine,reserve:t.reserve},this.weapon=e,this.reloading=0,this.firing=!1,!0}switch(e){this.inventory[e]&&(this.weapon=e,this.reloading=0,this.firing=!1,this.charge=0)}cycle(){let e=Object.keys(Ht).filter(t=>this.inventory[t]);e.length&&this.switch(e[(e.indexOf(this.weapon)+1)%e.length])}reload(){let e=this.inventory[this.weapon],t=Ht[this.weapon];return!e||this.weapon==="bow"||this.reloading||!e.reserve||e.loaded===t.magazine?!1:(this.reloading=t.reload,this.firing=!1,!0)}shoot(){let e=Ht[this.weapon],t=this.inventory[this.weapon];if(!e||this.cooldown>0||this.reloading>0||this.health<=0)return null;let i=this.weapon==="bow"?"reserve":"loaded";if(t[i]<=0)return this.reload(),null;t[i]--,this.cooldown=e.interval;let n={...e,id:this.weapon,charge:Math.max(.2,this.charge)};return this.weapon!=="bow"&&t.loaded===0&&this.reload(),n}tick(e){let t=this.inventory[this.weapon];if(this.weapon!=="bow"&&t&&t.loaded===0&&t.reserve>0&&!this.reloading&&this.reload(),this.cooldown=Math.max(0,this.cooldown-e),this.shoveCooldown=Math.max(0,this.shoveCooldown-e),this.comboTime=Math.max(0,this.comboTime-e),this.comboTime||(this.combo=0),this.firing&&this.weapon==="bow"&&(this.charge=Math.min(1,this.charge+e/1.05)),this.reloading>0&&(this.reloading-=e,this.reloading<=0)){this.reloading=0;let i=this.inventory[this.weapon],n=Ht[this.weapon],r=Math.min(n.magazine-i.loaded,i.reserve);i.loaded+=r,i.reserve-=r}}hurt(e){return this.health=Math.max(0,this.health-e),this.health===0}kill(e=!1){this.kills++,this.combo++,this.comboTime=4;let t=(e?150:100)*Math.min(4,1+Math.floor(this.combo/3));return this.score+=t,t}supply(){for(let[e,t]of Object.entries(this.inventory))t.reserve=Math.min(e==="bow"?60:240,t.reserve+(e==="bow"?8:Ht[e].magazine*2))}nextWave(){return this.wave++,this.phase="wave",eh(this.wave)}finishWave(){this.phase="rest",this.rest=eh(this.wave).rest,this.health=Math.min(100,this.health+12),this.supply(),this.score+=this.wave*100}};function pm(s){let e=[],t=new Ri({side:Dt}),i=(n,r,a,o,l,c,h=0)=>{if(o<=0||l<=0||c<=0)return;let u=new Ye(new gt(o,c,l),t);u.position.set(n,a,-r),u.rotation.y=h,u.updateMatrixWorld(),e.push(u)};for(let n of s.walls){let[r,a]=n.a,[o,l]=n.b,c=Math.hypot(o-r,l-a),h=(o-r)/c,u=(l-a)/c,d=n.floor*s.levelHeight,f=n.height_m??(n.floor?2.45:2.6),p=[0,c];for(let x of n.openings)p.push(Math.max(0,x[0]-x[1]/2),Math.min(c,x[0]+x[1]/2));p.sort((x,m)=>x-m);for(let x=1;x<p.length;x++){let m=p[x-1],g=p[x],_=(m+g)/2;if(g<=m)continue;let M=n.openings.filter(y=>_>y[0]-y[1]/2&&_<y[0]+y[1]/2).sort((y,S)=>y[2]-S[2]),b=0;for(let y of[...M,[0,0,f,f]]){let S=Math.min(f,y[2]);S>b&&i(r+h*_,a+u*_,d+(b+S)/2,g-m,n.thickness_m,S-b,Math.atan2(u,h)),b=Math.max(b,y[3])}}}for(let n of s.segments){let r=n.b[0]-n.a[0],a=n.b[1]-n.a[1];i((n.a[0]+n.b[0])/2,(n.a[1]+n.b[1])/2,(n.bottom+n.top)/2,Math.hypot(r,a),n.thickness,n.top-n.bottom,Math.atan2(a,r))}for(let n of s.obstacles){let r=n.box??[Math.min(...n.polygon.map(a=>a[0])),Math.min(...n.polygon.map(a=>a[1])),Math.max(...n.polygon.map(a=>a[0])),Math.max(...n.polygon.map(a=>a[1]))];i((r[0]+r[2])/2,(r[1]+r[3])/2,(n.bottom+n.top)/2,r[2]-r[0],r[3]-r[1],n.top-n.bottom)}for(let n of s.surfaces){let r=new $i(new Pi(n.polygon.map(([o,l])=>new ne(o,l))));r.rotateX(-Math.PI/2),r.translate(0,n.z,0);let a=new Ye(r,t);a.updateMatrixWorld(),e.push(a)}return e}var ih=class{constructor(){this.enabled=!0,this.context=null}unlock(){try{let e=window.AudioContext||window.webkitAudioContext;e&&!this.context&&(this.context=new e),this.context?.state==="suspended"&&this.context.resume().catch(()=>{})}catch{}}play(e){if(!this.enabled||!this.context||this.context.state!=="running")return;let t=this.context,i=t.currentTime,n=(r,a,o,l,c="sine",h=0)=>{let u=t.createOscillator(),d=t.createGain();u.type=c,u.frequency.setValueAtTime(r,i+h),u.frequency.exponentialRampToValueAtTime(a,i+h+o),d.gain.setValueAtTime(l,i+h),d.gain.exponentialRampToValueAtTime(.001,i+h+o),u.connect(d).connect(t.destination),u.start(i+h),u.stop(i+h+o+.01)};if(e==="bow")n(270,95,.12,.05,"triangle");else if(["pistol","shotgun","carbine"].includes(e)){let r=e==="shotgun"?.18:.09,a=t.createBuffer(1,Math.ceil(t.sampleRate*r),t.sampleRate),o=a.getChannelData(0);for(let h=0;h<o.length;h++)o[h]=(Math.random()*2-1)*Math.pow(1-h/o.length,3);let l=t.createBufferSource(),c=t.createGain();l.buffer=a,c.gain.value=.06,l.connect(c).connect(t.destination),l.start(),n(100,35,r,.08,"triangle")}else e==="hit"?n(680,310,.055,.035,"triangle"):e==="hurt"?n(95,42,.15,.05,"sine"):e==="pickup"?(n(440,660,.1,.035),n(660,880,.12,.025,"sine",.1)):e==="wave"&&(n(160,120,.22,.045,"triangle"),n(120,90,.3,.04,"triangle",.26))}};var nn=(s,e,t={})=>new Ye(s,new Xt({color:e,roughness:.6,...t})),Co=.7075;function Td(s,e,t){let i=e.actor!==void 0;if(s.position.copy(e.point).addScaledVector(t,(i?.09:0)-Co),s.quaternion.setFromUnitVectors(new I(0,0,-1),t),i){s.updateWorldMatrix(!0,!1);let n=s.matrixWorld.clone();e.object.updateWorldMatrix(!0,!1),e.object.add(s),s.matrix.copy(e.object.matrixWorld).invert().multiply(n),s.matrixAutoUpdate=!1,s.matrixWorldNeedsUpdate=!0}}function Po(){let s=new at;s.name="Arrow \xB7 shaft, head and three feathers",s.userData.projectile=!0;let e=nn(new ti(.005,.005,.64,6),12163938);e.rotation.x=Math.PI/2,e.position.z=-.32,e.name="Arrow shaft",s.add(e);let t=nn(new ws(.021,.075,4),5661031,{metalness:.55});t.rotation.x=-Math.PI/2,t.position.z=-.67,t.name="Arrowhead",s.add(t);for(let n=0;n<3;n++){let r=new Pi;r.moveTo(0,0),r.lineTo(.051,-.043),r.lineTo(.04,-.14),r.lineTo(0,-.17),r.closePath();let a=nn(new $i(r),n===0?13145935:15524803,{side:Dt});a.rotation.x=Math.PI/2,a.rotation.z=n*Math.PI*2/3,a.rotation.set(Math.PI/2,0,0);let o=new at;o.rotation.z=n*Math.PI*2/3,o.add(a),o.position.z=-.025,s.add(o),a.name="Arrow feather"}let i=nn(new ti(.009,.009,.025,5),9394738);return i.rotation.x=Math.PI/2,i.position.z=.002,s.add(i),s}function mm({held:s=!1}={}){let e=new at;e.name="Recurve bow";let t=[];for(let p=0;p<=24;p++){let x=-Math.PI/2+p*Math.PI/24;t.push(new I(0,Math.sin(x)*.42,-Math.cos(x)*.17))}let i=new za(new Sr(t),32,.012,6,!1),n=nn(i,8542264);n.name="Flexible bow limbs",e.add(n);let r=new Float32Array(i.attributes.position.array),a=nn(new ti(.023,.023,.12,7),3681573);a.position.z=-.165,e.add(a);let o=new Zi(new ot().setFromPoints([t[0],new I(0,0,.025),t[24]]),new bn({color:15787464}));o.name="Bow string",e.add(o);let l=Po();l.name="Nocked arrow",l.position.set(-.018,0,.025),e.add(l);let c=new wt;c.name="Projectile origin",c.position.copy(l.position),e.add(c);let h=new at;h.visible=s,e.add(h);let u=nn(new gt(.065,.11,.058),12687990);u.position.set(.026,0,-.155),h.add(u);let d=nn(new gt(.054,.065,.045),12687990);d.position.set(-.023,0,.025),h.add(d);let f=nn(new gt(.085,.11,.07),4347726);return f.position.set(.07,-.055,-.11),f.rotation.z=.4,h.add(f),e.userData.animate=(p=0,x=0,m=!0)=>{let g=x>0?Math.sin((.28-x)*105)*x*.065:0,_=i.attributes.position;for(let R=0;R<_.count;R++){let v=R*3,E=r[v+1],T=Math.abs(E/.42);_.setXYZ(R,r[v],E*(1-.08*p),r[v+2]+T*.07*p+g*T)}_.needsUpdate=!0;let M=.42*(1-.08*p),b=.07*p+g,y=.025+p*.27+g*2.5,S=o.geometry.attributes.position;S.setXYZ(0,0,-M,b),S.setXYZ(1,0,0,y),S.setXYZ(2,0,M,b),S.needsUpdate=!0,c.position.set(-.018,0,y),l.position.copy(c.position),l.visible=m,d.position.z=y},e.userData.animate(),e}function gm(s){let e=new at;e.name=s;let t=(f,p,x,m,g,_)=>{let M=nn(f,p,_);return M.position.set(x,m,g),e.add(M),M},i=3621439,n=s==="shotgun"?8409904:3556668,r=s==="pistol"?-.24:s==="shotgun"?-.61:-.52;t(new gt(.08,.1,s==="pistol"?.24:.27),i,0,0,-.09);let a=t(new gt(.066,.17,.085),n,0,-.12,.025);a.rotation.x=-.24;let o=t(new gi(.044,.009,5,12),i,0,-.09,-.07);o.rotation.y=Math.PI/2,o.scale.z=1.25;let l=t(new gt(.008,.037,.01),1910821,0,-.07,-.07);l.rotation.x=.2;let c=t(new ti(.021,.021,Math.abs(r)-.12,10),2240043,0,.012,(r-.12)/2);c.rotation.x=Math.PI/2;let h=t(new gi(.021,.007,5,10),6384738,0,.012,r);h.name="Muzzle rim";let u=t(new yr(.017,10),1054743,0,.012,r+.001,{side:Dt});if(t(new gt(.014,.024,.025),14862746,0,.074,s==="pistol"?-.19:r+.045),t(new gt(.06,.02,.025),1187611,0,.064,.009),s!=="pistol"){let f=t(new gt(.074,.12,.2),n,0,-.015,.16);f.rotation.x=.16;let p=t(new ti(.042,.042,.19,8),n,0,-.018,-.28);p.rotation.x=Math.PI/2,p.name="Pump grip";for(let x=0;x<5;x++){let m=t(new gi(.042,.004,4,8),2569260,0,-.018,-.2-x*.036)}}if(s==="carbine"){let f=t(new gt(.058,.17,.07),2636594,0,-.15,-.1);f.rotation.x=-.2;let p=t(new ti(.034,.034,.17,10),1583395,0,.12,-.085);p.rotation.x=Math.PI/2;let x=t(new yr(.028,10),4222825,0,.12,-.173,{metalness:.3,roughness:.15,side:Dt});for(let m of[-.14,-.04])t(new gt(.028,.07,.024),i,0,.077,m)}let d=new wt;return d.name="Projectile origin",d.position.set(0,.012,r-.008),e.add(d),e.userData.animate=(f,p)=>{let x=e.getObjectByName("Pump grip");x&&s==="shotgun"&&(x.position.z=-.28+Math.sin(Math.max(0,p)/.28*Math.PI)*.08)},e}function bm(s){let e=new at;e.name=s==="health"?"Medical satchel, bandages and bottle":"Leather quiver and mixed ammunition";let t=(i,n,r,a,o,l)=>{let c=nn(i,n,l);return c.position.set(r,a,o),e.add(c),c};if(s==="health"){let i=t(new kn(.1,.16,4,10),9529152,0,0,0);i.rotation.z=Math.PI/2,i.scale.z=.75;for(let a of[-.1,.1]){let o=t(new gi(.102,.012,5,14),4734508,a,0,0);o.rotation.y=Math.PI/2,o.scale.x=.76}let n=t(new gi(.057,.01,5,12,Math.PI),4536871,0,.106,0);n.rotation.z=0,t(new gt(.09,.075,.012),16051680,0,.012,.079),t(new gt(.018,.055,.015),11354942,0,.012,.084),t(new gt(.057,.018,.015),11354942,0,.012,.084);for(let a of[-.115,-.06]){let o=t(new ti(.025,.025,.072,10),14999496,a,.132,0);o.rotation.z=Math.PI/2}let r=t(new ti(.026,.026,.095,10),14263121,.12,.13,.006,{transparent:!0,opacity:.8});t(new ti(.027,.027,.018,10),15986401,.12,.185,.006)}else{let i=t(new ti(.075,.055,.28,12,1,!0),7294002,-.055,.035,0,{side:Dt});for(let r of[-.07,.16]){let a=t(new gi(.074,.009,5,12),12160076,-.055,r,0);a.rotation.x=Math.PI/2}let n=t(new gi(.13,.012,5,16,Math.PI*1.6),4011303,-.08,0,.015);n.scale.x=.6;for(let r=0;r<3;r++){let a=Po();a.scale.setScalar(.48),a.rotation.x=-Math.PI/2,a.position.set(-.08+r*.026,.29,.014),e.add(a)}for(let r=0;r<5;r++){let a=t(new ti(.018,.018,.095,7),r<2?10438972:12884812,.05+r*.032,-.015,.018);a.rotation.z=-.12+r*.1,t(new ti(.019,.019,.023,7),14072434,.05+r*.032,-.07,.018,{metalness:.5})}t(new gt(.19,.038,.025),4734511,.11,-.033,.046)}return e}var Gy=s=>({x:s.x,y:-s.z,z:s.y}),Io=s=>new I(s.x,s.z,-s.y),pt=s=>document.getElementById(s),nh=class{constructor(e,{scene:t,camera:i,doors:n,mobile:r=!1,isActive:a,onDeath:o,onArm:l,onReset:c,toast:h}){Object.assign(this,{data:e,scene:t,camera:i,doors:n,mobile:r,isActive:a,onDeath:o,onArm:l,onReset:c,toast:h}),this.state=new th,this.audio=new ih,this.time=0,this.hurtTime=0,this.hitTime=0,this.recoil=0,this.manualFiring=!1,this.group=new at,this.group.name="After Hours combat",t.add(this.group),this.pickups=[],this.projectiles=[],this.effects=[],this.ray=new Za,this.occluders=pm(e),this.horde=new Qc(e,{maxAlive:r?7:12,canSpawn:fm(i),onAttack:u=>{this.state.phase!=="dead"&&(this.state.hurt(u.damage),this.hurtTime=.55,this.audio.play("hurt"),this.state.health||this.die())},onDeath:u=>{let d=this.state.kill(u.headshot);if(this.toast((u.headshot?"Headshot! +":"Zombie down +")+d),u.boss){let f=this.state.wave*500;this.state.score+=f,this.addPickup("health",u.position),this.addPickup("ammo",{...u.position,x:u.position.x+.24}),this.toast("Groundskeeper defeated \xB7 +"+f+" \xB7 supplies dropped")}else this.state.kills%3===0&&this.addPickup(this.state.kills%9===0?"health":"ammo",u.position)}}),this.group.add(this.horde.group),t.add(i),this.hand=new at,this.hand.position.set(.23,-.27,-.52),i.add(this.hand),this.buildUI(),this.reset()}buildUI(){this.tourWelcome=pt("welcome").innerHTML,this.tourHint=pt("hint").textContent,this.started=!1;let e=document.createElement("button");e.id="sound-control",e.hidden=!0,e.textContent="Sound on",e.setAttribute("aria-pressed","true"),e.onclick=()=>{this.audio.unlock(),this.audio.enabled=!this.audio.enabled,e.textContent=this.audio.enabled?"Sound on":"Sound off",e.setAttribute("aria-pressed",String(this.audio.enabled)),e.blur()},document.querySelector(".toolbar").insertBefore(e,pt("help")),document.addEventListener("pointerdown",()=>this.audio.unlock(),{once:!0}),document.addEventListener("keydown",()=>this.audio.unlock(),{once:!0});let t=document.createElement("div");t.id="combat-hud",t.innerHTML='<div id="wave-heading">AFTER HOURS</div><div id="wave-objective">Enter the house to begin</div><div id="boss-status" hidden><span>THE GROUNDSKEEPER</span><div><i></i></div></div><div id="combat-stats"><span id="health-text">\u2665 100</span><span id="weapon-text">Find the bow</span><span id="score-text">0</span></div><div id="weapon-progress"><i></i></div>',document.body.append(t);let i=document.createElement("div");i.id="combat-controls",i.innerHTML='<button id="swap-control" aria-label="Swap weapon">Swap</button>',document.body.append(i);let n=document.createElement("div");n.id="damage-vignette",n.setAttribute("aria-hidden","true"),document.body.append(n);let r=document.createElement("button");r.id="end-survival",r.className="text-button",r.textContent="End game \xB7 return to exploring",r.hidden=!0,r.onclick=()=>{this.reset(),pt("start").focus()},pt("welcome").insertBefore(r,pt("load-status")),pt("swap-control").addEventListener("click",a=>{a.preventDefault(),this.isActive()&&this.started&&(this.state.cycle(),this.equip()),pt("swap-control").blur()}),document.addEventListener("keydown",a=>{!this.isActive()||a.repeat||!this.started||["Space","KeyQ","Digit1","Digit2","Digit3","Digit4"].includes(a.code)&&(a.preventDefault(),a.code==="Space"&&this.press(),a.code==="KeyQ"&&this.shove(),a.code.startsWith("Digit")&&(this.state.switch(Object.keys(Ht)[Number(a.code.slice(-1))-1]),this.equip()))}),document.addEventListener("keyup",a=>{a.code==="Space"&&this.release()}),pt("view").addEventListener("pointerdown",a=>{a.pointerType==="mouse"&&a.button===0&&this.isActive()&&this.press()}),document.addEventListener("pointerup",a=>{a.pointerType==="mouse"&&a.button===0&&this.release()}),window.addEventListener("blur",()=>this.cancelFire()),window.addEventListener("resize",()=>this.cancelFire()),document.addEventListener("visibilitychange",()=>this.cancelFire())}activateUI(e){document.body.classList.toggle("easter-game",e),pt("rooms").hidden=e,pt("sound-control").hidden=!e,pt("end-survival").hidden=!e,e||(pt("toast").hidden=!0,pt("toast").textContent="");let t=pt("welcome");t.querySelector(".eyebrow").textContent=e?"ASHLEY HEIGHTS \xB7 AFTER HOURS":"EXPLORE ASHLEY HEIGHTS",t.querySelector("h1").textContent=e?"Hold the house.":"Come inside.",t.querySelector("p").textContent=e?"Survive the waves. Find guns as later waves unlock, collect supplies and keep moving.":"Explore the house and garden.",t.querySelector(".keys span").innerHTML=e?"W A S D move \xB7 Shift sprint<br>Mouse / Space fire \xB7 Q shove<br>1\u20134 weapons \xB7 Auto reload \xB7 Esc pause":"Move with these or the arrow keys.<br>Move your mouse to look around.",t.querySelector(".touch-instructions p").textContent=e?"Tap anywhere in the view to fire. Drag to aim. Push the movement pad farther to sprint. Guns reload automatically.":"Use both together. Push the movement pad farther to sprint.",pt("hint").textContent=e?"Mouse / Space fire \xB7 Auto reload \xB7 Q shove \xB7 1\u20134 switch \xB7 Shift sprint":this.tourHint,pt("look-hint").textContent=e?"Drag to aim \xB7 tap to fire":"Drag to look",pt("caught-title").textContent="The house fell.",pt("normal-model").textContent="Return to exploring"}canTakeBow(){let e=this.pickups.find(o=>o.kind==="bow");if(this.started||!e||!this.player||Math.hypot(e.position.x-this.player.x,e.position.y-this.player.y)>.65||Math.abs(e.position.z-this.player.z)>.4)return!1;let t=Io(this.player).add(new I(0,this.data.eyeHeight,0)),i=Io(e.position).add(new I(0,e.baseHeight,0)),n=i.clone().sub(t),r=n.length();this.ray.set(t,n.normalize()),this.ray.near=.015,this.ray.far=r-.08;let a=this.doors.doors.map(o=>o.pivot).filter(Boolean);return this.ray.intersectObjects([...this.occluders,...a],!0).length===0}takeBow(){if(!this.isActive()||!this.canTakeBow())return!1;let e=this.pickups.find(t=>t.kind==="bow");return this.clearObject(e.mesh),this.pickups.splice(this.pickups.indexOf(e),1),this.state.acquire("bow"),this.equip(),this.audio.play("pickup"),this.activateUI(!0),pt("view").focus(),this.onArm(),this.toast("Bow collected \xB7 Enter the house to begin"),!0}clearObject(e){e.traverse(t=>{(t.isMesh||t.isLine)&&(t.geometry.dispose(),t.material.dispose&&t.material.dispose())}),e.removeFromParent()}reset(){this.cancelFire(),this.started=!1,this.state.reset(),this.activateUI(!1),this.onReset?.(),this.horde.reset(),this.time=0,this.hurtTime=0,this.hitTime=0,this.releaseTime=0,this.lastShot=null,pt("crosshair").classList.remove("hit"),this.player=null,this.unlocked=new Set(["bow"]);for(let t of this.pickups)this.clearObject(t.mesh);for(let t of this.projectiles)this.clearObject(t.mesh);for(let t of this.effects)this.clearObject(t.mesh);this.pickups=[],this.projectiles=[],this.effects=[];let e=this.data.rooms.find(t=>t.id==="2445694-0");this.addPickup("bow",{x:e.position[0],y:e.position[1],z:e.position[2]}),this.equip(),pt("damage-vignette").style.opacity=0}mesh(e,t,i={}){return new Ye(e,new Xt({color:t,roughness:.65,...i}))}buildWeapon(e,t=!1){return e==="bow"?mm({held:t}):gm(e)}equip(){this.cancelFire();for(let e of[...this.hand.children])this.clearObject(e);this.state.weapon&&this.hand.add(this.buildWeapon(this.state.weapon,!0)),this.recoil=0}addPickup(e,t){if(this.pickups.length>=32){let o=this.pickups.find(l=>!Ht[l.kind]);if(o)this.clearObject(o.mesh),this.pickups.splice(this.pickups.indexOf(o),1);else return}let i=e==="health"?7984033:Ht[e]?16765838:10406906,n=new at;n.position.copy(Io(t));let r=this.mesh(new gi(.25,.026,5,20),i);r.rotation.x=Math.PI/2,r.position.y=.1,r.material.emissive.setHex(i),r.material.emissiveIntensity=.4,n.add(r);let a;Ht[e]?(a=this.buildWeapon(e),a.scale.setScalar(.62),a.position.y=.68):e==="arrow"?(a=Po(),a.rotation.x=Math.PI/2,a.position.y=.25):(a=bm(e),a.position.y=.38),n.add(a),this.group.add(n),this.pickups.push({kind:e,position:{...t},mesh:n,item:a,baseHeight:a.position.y,age:0})}arm(e){this.started=!0,this.player=e}startWave(e=this.player){this.player=e;let t=this.state.nextWave();this.horde.startWave(this.state.wave,this.player,t.total),this.audio.play("wave"),this.toast(`Wave ${this.state.wave} \xB7 ${t.event}`)}unlock(){for(let[e,t,i]of[[3,"pistol","2445662-0"],[5,"shotgun","2445664-0"],[7,"carbine","2445670-3"]])if(this.state.wave+1>=e&&!this.unlocked.has(t)){this.unlocked.add(t);let n=this.data.rooms.find(r=>r.id===i);this.addPickup(t,{x:n.position[0],y:n.position[1],z:n.position[2]}),this.toast(`${Ht[t].label} unlocked \xB7 ${n.label}`)}}press(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||this.manualFiring||(this.manualFiring=!0,this.state.firing=!0,this.state.charge=0,this.state.weapon!=="bow"&&this.fire())}release(){this.manualFiring&&(this.state.firing&&this.state.weapon==="bow"&&this.isActive()&&this.fire(),this.cancelFire())}tapFire(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||this.manualFiring||(this.state.charge=1,this.fire(),this.state.charge=0)}cancelFire(){this.manualFiring=!1,this.state.firing=!1,this.state.charge=0}hit(e,t,i){this.ray.set(e,t),this.ray.near=.015,this.ray.far=i;let n=this.doors.doors.map(c=>c.pivot).filter(Boolean),a=this.ray.intersectObjects([...this.occluders,...n],!0)[0];a&&(this.ray.far=a.distance);let l=this.ray.intersectObjects(this.horde.actors.filter(c=>c.alive).map(c=>c.figure.group),!0).find(c=>c.object.userData.actorId!==void 0);return l?{...l,actor:l.object.userData.actorId,headshot:l.object.userData.hitZone==="head"}:a?{...a,wall:!0}:null}applyHit(e,t,i){return e?.actor===void 0?!1:this.horde.damage(e.actor,t*(e.headshot?1.8:1),{headshot:e.headshot,knockback:{x:i.x*.12,y:-i.z*.12}})?.hit?(this.hitTime=.16,this.audio.play("hit"),!0):!1}trace(e,t){let i=new Zi(new ot().setFromPoints([e,t]),new bn({color:16772531,transparent:!0,opacity:.75}));this.group.add(i),this.effects.push({mesh:i,life:.07})}fire(){let e=this.state.shoot();if(!e)return;this.audio.play(e.id),this.recoil=1,this.releaseTime=.28,this.camera.updateMatrixWorld(!0),this.hand.updateMatrixWorld(!0);let t=this.camera.getWorldPosition(new I),i=this.camera.getWorldDirection(new I),n=this.hit(t,i,55),r=n?.point||t.clone().addScaledVector(i,55),a=this.hand.getObjectByName("Projectile origin");if(!a)return;let o=a.getWorldPosition(new I),l=r.clone().sub(o).normalize(),c=o.clone().sub(t),h=c.length(),u=this.hit(t,c.normalize(),h);if(this.lastShot={weapon:e.id,origin:o.toArray(),muzzle:a.getWorldPosition(new I).toArray(),eye:t.toArray(),blockedByWall:!!u?.wall},!u?.wall)if(e.id==="bow"){let d=Po();d.position.copy(o),d.quaternion.setFromUnitVectors(new I(0,0,-1),l),this.group.add(d);let f=o.clone().addScaledVector(l,Co),p=this.hit(o,l,Co);if(p){this.applyHit(p,e.damage*(.35+.65*e.charge),l),Td(d,p,l),this.effects.push({mesh:d,life:5});return}this.projectiles.push({mesh:d,position:f,velocity:l.multiplyScalar(14+e.charge*15),damage:e.damage*(.35+.65*e.charge),life:4})}else{let d=this.mesh(new ws(.035,.14,5),16762733,{emissive:16755776});d.position.copy(o),d.quaternion.setFromUnitVectors(new I(0,1,0),l),this.group.add(d),this.effects.push({mesh:d,life:.055});for(let f=0;f<(e.pellets||1);f++){let p=l.clone();e.pellets&&(p.x+=(Math.random()-.5)*.11,p.y+=(Math.random()-.5)*.11,p.z+=(Math.random()-.5)*.11,p.normalize());let x=this.hit(o,p,55);this.applyHit(x,e.damage,p),f===0&&this.trace(o.clone(),x?.point||o.clone().addScaledVector(p,30))}}}shove(){if(!this.started||!this.player||this.state.shoveCooldown||this.state.phase==="dead")return;this.state.shoveCooldown=1.05,this.recoil=1.7;let e=Io(this.player).add(new I(0,1,0)),t=this.camera.getWorldDirection(new I);for(let i of this.horde.actors){if(!i.alive)continue;let n=Io(i.nav.position).add(new I(0,1,0)),r=n.clone().sub(e),a=r.length();if(a>1.55||a<.01||r.normalize().dot(t)<.25)continue;this.ray.set(e,r),this.ray.far=a;let o=this.ray.intersectObjects(this.occluders,!1)[0];o&&o.distance<a-.25||(this.horde.damage(i.id,20,{knockback:{x:r.x*.65,y:-r.z*.65}}),this.hitTime=.16)}}die(){this.state.phase="dead",this.cancelFire();try{let e=JSON.parse(localStorage.getItem("ashley-after-hours-best")||"{}");this.best=Math.max(e.score||0,this.state.score),localStorage.setItem("ashley-after-hours-best",JSON.stringify({score:this.best,wave:Math.max(e.wave||0,this.state.wave)}))}catch{this.best=this.state.score}this.onDeath()}step(e,t,i){if(this.player=t,!this.started){let a=this.pickups.find(o=>o.kind==="bow");a&&(a.age+=e,a.item.rotation.y+=e*.45,a.item.position.y=a.baseHeight+Math.sin(a.age*2.1)*.05,this.takeBow()),this.group.updateMatrixWorld(!0);return}this.time+=e,this.state.tick(e),this.hurtTime=Math.max(0,this.hurtTime-e),this.hitTime=Math.max(0,this.hitTime-e),this.recoil=Math.max(0,this.recoil-e*5);let n=this.camera.getWorldDirection(new I);this.state.phase==="wave"?(this.horde.step(e,t,{x:n.x,y:-n.z}),this.horde.state().complete&&(this.state.finishWave(),this.unlock(),this.addPickup("health",{...t,x:t.x+.35}),this.toast("Wave cleared \xB7 resupplied +12 health"))):this.state.phase==="rest"&&(this.horde.step(e,t,{x:n.x,y:-n.z}),this.state.rest-=e,this.state.rest<=0&&this.startWave()),this.manualFiring&&this.state.weapon!=="bow"&&!this.state.reloading&&(this.state.firing=!0,this.fire());for(let a=this.projectiles.length-1;a>=0;a--){let o=this.projectiles[a];o.life-=e,o.velocity.y-=2.4*e;let l=o.velocity.length()*e,c=o.velocity.clone().normalize(),h=this.hit(o.position,c,l);if(h||o.life<=0||o.position.y<.05){h&&(this.applyHit(h,o.damage,c),Td(o.mesh,h,c));let u=Gy(h?.point||o.position),d=t.z;Math.abs(u.z-d)<2.2&&!this.horde.planner().nav.blocked(u.x,u.y,d)&&this.addPickup("arrow",{x:u.x,y:u.y,z:d}),h?this.effects.push({mesh:o.mesh,life:5}):this.clearObject(o.mesh),this.projectiles.splice(a,1)}else o.position.addScaledVector(o.velocity,e),o.mesh.position.copy(o.position).addScaledVector(c,-Co),o.mesh.quaternion.setFromUnitVectors(new I(0,0,-1),c)}for(let a=this.pickups.length-1;a>=0;a--){let o=this.pickups[a];o.age+=e,o.item.rotation.y+=e*.65,o.item.position.y=o.baseHeight+Math.sin(o.age*2.1)*.05;let l=o.position.z-t.z;if(Math.hypot(o.position.x-t.x,o.position.y-t.y)<.85&&Math.abs(l)<.4){let h=!0;Ht[o.kind]?(this.state.acquire(o.kind),this.equip(),this.toast(`${Ht[o.kind].label} found`)):o.kind==="health"?this.state.health>=100?h=!1:(this.state.health=Math.min(100,this.state.health+30),this.toast("+30 health")):o.kind==="arrow"?this.state.inventory.bow?this.state.inventory.bow.reserve=Math.min(60,this.state.inventory.bow.reserve+1):h=!1:(this.state.supply(),this.toast("Ammunition collected")),h&&(this.audio.play("pickup"),this.clearObject(o.mesh),this.pickups.splice(a,1))}}for(let a=this.effects.length-1;a>=0;a--)(this.effects[a].life-=e)<=0&&(this.clearObject(this.effects[a].mesh),this.effects.splice(a,1));this.hand.scale.setScalar(Math.min(1,.55+.45*this.camera.aspect)),this.hand.position.x=Math.min(.23,.1*this.camera.aspect),this.hand.visible=!!this.state.weapon;let r=this.state.reloading?Math.sin(Math.PI*(1-this.state.reloading/Ht[this.state.weapon].reload)):0;this.hand.rotation.x=this.recoil*.15,this.hand.rotation.z=-.6*r-this.state.charge*.045,this.hand.position.y=-.27+Math.sin(this.time*3)*.004-.14*r,this.hand.position.z=-.52+this.recoil*.05,this.releaseTime=Math.max(0,(this.releaseTime||0)-e),this.hand.children[0]?.userData.animate?.(this.state.charge,this.releaseTime,!!this.state.inventory.bow?.reserve&&this.state.cooldown<.3),this.group.updateMatrixWorld(!0),this.updateHUD(i)}updateHUD(e){let t=this.state,i=this.horde.state();pt("wave-heading").textContent=e.phase==="armed"?"BOW READY":t.phase==="rest"?`WAVE ${t.wave} CLEARED \xB7 ${Math.ceil(t.rest)}s`:`WAVE ${t.wave} \xB7 ${eh(t.wave).event.toUpperCase()}`;let n=this.pickups.find(o=>Ht[o.kind]),r=n&&{bow:"garden shed",pistol:"kitchen",shotgun:"garage",carbine:"landing"}[n.kind];pt("wave-objective").textContent=e.phase==="armed"?"Enter the house to begin":t.phase==="wave"?`${i.alive+i.queued} left${n?" \xB7 "+Ht[n.kind].label+" in the "+r:""}`:n?`Find the ${Ht[n.kind].label.toLowerCase()} in the ${r}`:"Collect supplies \xB7 keep moving",pt("boss-status").hidden=!i.boss,i.boss&&(pt("boss-status").querySelector("i").style.width=100*i.boss.health/i.boss.maxHealth+"%"),pt("health-text").textContent="\u2665 "+Math.ceil(t.health),pt("health-text").classList.toggle("low",t.health<35);let a=t.inventory[t.weapon];pt("weapon-text").textContent=a?`${Ht[t.weapon].label} \xB7 ${t.weapon==="bow"?a.reserve+" arrows":a.loaded+" / "+a.reserve}${t.reloading?" \xB7 reloading":""}`:"Find the bow \xB7 Q / Shove to defend",pt("score-text").textContent=t.score.toLocaleString()+(t.combo>=3?" \xD7"+Math.min(4,1+Math.floor(t.combo/3)):""),pt("weapon-progress").firstElementChild.style.width=(t.reloading?(1-t.reloading/Ht[t.weapon].reload)*100:t.charge*100)+"%",pt("damage-vignette").style.opacity=this.hurtTime?".7":"0",pt("crosshair").classList.toggle("hit",this.hitTime>0)}};function Ad(s,e){let[t,i,n,r]=s.streetContext?.enabled?s.streetContext.bounds:s.bounds,a=(l,c,h)=>Math.max(c,Math.min(h,l)),o=Math.min(0,...(s.floorLevels??[]).map(l=>l.z));return{x:a(e.x,t-35,n+35),y:a(e.y,i-35,r+35),z:a(e.z,o,45)}}function Rd(s,e,{forward:t=0,right:i=0,vertical:n=0,yaw:r=0,pitch:a=0,fast:o=!1,dt:l=0}){let c=t*Math.cos(a),h=-Math.sin(r)*c+Math.cos(r)*i,u=Math.cos(r)*c+Math.sin(r)*i,d=t*Math.sin(a)+n,f=(o?9:3.8)*Math.max(0,Math.min(l,.04))/Math.max(1,Math.hypot(h,u,d));return Ad(s,{x:e.x+h*f,y:e.y+u*f,z:e.z+d*f})}function sh(s,e,t){let i=o=>{if(!o)return null;let l=s.support(o.x,o.y,o.z);if(l===null||Math.abs(l-o.z)>.2)return null;let c={x:o.x,y:o.y,z:l};return s.canStand(c)?c:null},n=i(e);if(n)return{position:n,moved:!1};let r=i(t);if(r)return{position:r,moved:!0};let a=s.data.rooms.map(o=>({x:o.position[0],y:o.position[1],z:o.position[2]})).map(i).filter(Boolean).sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y,o.z-e.z)-Math.hypot(l.x-e.x,l.y-e.y,l.z-e.z));if(!a.length)throw Error("No supported walking viewpoint");return{position:a[0],moved:!0}}var Pd="ashley-heights-comparison-view",xm="ashley-heights-proposal-variant";var Kr={proposed:{label:"Proposal A",short:"A"},compact:{label:"Proposal B",short:"B"}},Cd=new URLSearchParams(location.search).get("design"),ni=Cd==="proposed"||Cd==="compact"?Cd:"original",hs=s=>s==="proposed"||s==="compact";function vm(s,e=location.href){let t=new URL(e);return hs(s)?t.searchParams.set("design",s):t.searchParams.delete("design"),t}function rh(){try{let s=sessionStorage.getItem(xm);return hs(s)?s:"proposed"}catch{return"proposed"}}function _m(s){if(hs(s))try{sessionStorage.setItem(xm,s)}catch{}}function Do(s){return s==="compact"?"proposed":"compact"}function ym(s,e){let t={target:s,position:[e.x,e.y,e.z],yaw:e.yaw,pitch:e.pitch,active:e.active,flying:e.flying===!0,lastWalkingPosition:e.lastWalkingPosition,time:Date.now()};try{sessionStorage.setItem(Pd,JSON.stringify(t))}catch{}}function Mm(){try{let s=sessionStorage.getItem(Pd);if(!s)return null;sessionStorage.removeItem(Pd);let e=JSON.parse(s);return e.target!==ni||Date.now()-e.time>3e5||!e.position?.every(Number.isFinite)||!Number.isFinite(e.yaw)||!Number.isFinite(e.pitch)?null:e}catch{return null}}function Sm(s,e){let[t,i,n]=e.position,r={x:t,y:i,z:n};if(e.flying===!0)return{position:Ad(s.data,r),moved:!1};let a=c=>{let h=s.support(c.x,c.y,c.z);return h!==null&&Math.abs(h-c.z)<.2&&s.canStand(c)};if(a(r))return{position:r,moved:!1};let o=s.data.rooms.map(c=>({room:c,p:{x:c.position[0],y:c.position[1],z:c.position[2]}})).filter(c=>a(c.p));if(ni==="original"&&n>=2.4){let c=o.find(h=>h.room.label==="Landing");if(c)return{position:c.p,moved:!0,room:c.room.label}}o.sort((c,h)=>Math.hypot(c.p.x-t,c.p.y-i)+Math.abs(c.p.z-n)*3-Math.hypot(h.p.x-t,h.p.y-i)-Math.abs(h.p.z-n)*3);let l=o[0];return{position:l?.p??{...s.position},moved:!0,room:l?.room.label}}var An={houses:[{name:"Neighbour 1 \xB7 reference estimate",footprint:[[-59.79665,9.30984],[-59.1234,9.22317],[-58.99559,3.40707],[-48.86574,3.72358],[-49.1053,-5.03034],[-61.27589,-5.25473]],x:-54.907240542877894,y:-.8116349999999999,height:5.1,rise:2.5,roofParts:[[[-60.5209,3.51813],[-48.86574,3.72358],[-49.1053,-5.03034],[-61.27589,-5.25473]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1},{name:"Neighbour 2 \xB7 reference estimate",footprint:[[-43.47037,7.20821],[-32.48846,7.50032],[-32.4135,2.6292],[-27.42748,2.84026],[-27.42525,-5.34776],[-43.14071,-5.88343]],x:-35.34048433867518,y:-1.35928,height:5.1,rise:2.5,roofParts:[[[-43.17443,2.05278],[-27.46947,2.50451],[-27.42525,-5.34776],[-43.14071,-5.88343]],[[-43.47037,7.20821],[-32.48846,7.50032],[-32.29711,.14084],[-43.36318,-.14044]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1},{name:"Neighbour 3 \xB7 reference estimate",footprint:[[-25.65193,10.88472],[-18.44637,11.06593],[-18.39352,10.12095],[-7.69556,10.19375],[-7.58782,.7981],[-18.11746,.70363],[-18.21192,-.05181],[-25.5858,-.21135]],x:-16.63043484937667,y:5.459525,height:5.1,rise:2.5,roofParts:[[[-18.39352,10.12095],[-7.69556,10.19375],[-7.58782,.7981],[-18.11746,.70363]],[[-25.65193,10.88472],[-18.44637,11.06593],[-18.21192,-.05181],[-25.5858,-.21135]]],frame:"dark",referenceClipped:!1,front:[[-18.11746,.70363],[-7.58782,.7981]],secondaryFront:[[-25.5858,-.21135],[-18.21192,-.05181]],garage:!1},{name:"Neighbour 5 \xB7 reference estimate",footprint:[[8.0732,-30.55728],[13.41851,-36.36269],[5.41541,-43.60551],[.05961,-37.88403]],x:6.734790356677488,y:-37.123360000000005,height:5.1,rise:2.5,roofParts:[[[8.0732,-30.55728],[13.41851,-36.36269],[5.41541,-43.60551],[.05961,-37.88403]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1},{name:"Neighbour 6 \xB7 reference estimate",footprint:[[-29.12009,-39.41573],[-16.92832,-39.7058],[-16.90658,-42.26727],[-15.9072,-42.4812],[-15.92745,-45.37842],[-17.14763,-45.56251],[-17.13602,-49.57258],[-21.08067,-49.66182],[-21.15489,-47.52004],[-24.46847,-47.34937],[-24.62517,-51.33777],[-29.5587,-51.12914]],x:-22.603222625347787,y:-43.92981,height:5.1,rise:2.5,roofParts:[[[-29.12009,-39.41573],[-16.92832,-39.7058],[-16.76772,-50.04644],[-29.05414,-49.82947]]],frame:"light",referenceClipped:!1,front:[[-29.12009,-39.41573],[-16.92832,-39.7058]],secondaryFront:null,garage:!1},{name:"No6 lower garage \xB7 reference estimate",footprint:[[-37.11622,-33.61024],[-30.68905,-33.49941],[-30.66657,-38.79021],[-37.1569,-38.72233]],x:-33.90713937759885,y:-36.166285,height:2.6,rise:0,roofParts:[[[-37.11622,-33.61024],[-30.68905,-33.49941],[-30.66657,-38.79021],[-37.1569,-38.72233]]],frame:"light",referenceClipped:!1,front:[[-37.11622,-33.61024],[-30.68905,-33.49941]],secondaryFront:null,garage:!0},{name:"No5 garage \xB7 reference estimate",footprint:[[15.69732,-22.24221],[10.09072,-22.62925],[10.43933,-28.04733],[16.13008,-27.67112]],x:13.09102410013121,y:-25.150185,height:2.6,rise:0,roofParts:[[[15.69732,-22.24221],[10.09072,-22.62925],[10.43933,-28.04733],[16.13008,-27.67112]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!0},{name:"East garage block \xB7 reference estimate",footprint:[[27.80159,-10.23942],[18.10265,-9.16149],[17.23238,-19.53999],[26.76302,-20.59626]],x:22.47879337546242,y:-14.889705,height:2.6,rise:0,roofParts:[[[27.80159,-10.23942],[18.10265,-9.16149],[17.23238,-19.53999],[26.76302,-20.59626]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!0},{name:"Southeast outbuilding \xB7 reference estimate",footprint:[[22.05807,-48.64768],[21.42866,-55.04862],[24.55294,-55.36551],[25.19284,-48.88063]],x:23.3102182906958,y:-51.964625,height:2.6,rise:0,roofParts:[[[22.05807,-48.64768],[21.42866,-55.04862],[24.55294,-55.36551],[25.19284,-48.88063]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1},{name:"Marlow Court \xB7 reference estimate",footprint:[[37.71056,28.6561],[45.1281,23.01038],[42.85681,19.8912],[51.96834,12.74808],[44.53389,3.21455],[37.19002,8.76551],[39.44031,11.71681],[29.85553,18.49441]],x:41.111070766468906,y:15.621244999999998,height:5.7,rise:3,roofParts:[[[37.71056,28.6561],[45.1281,23.01038],[37.27306,12.84869],[29.85553,18.49441]],[[42.60434,19.9237],[51.96834,12.74808],[44.53389,3.21455],[35.1699,10.39017]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1},{name:"Richmond Court clipped reference \xB7 reference estimate",footprint:[[32.26652,49.39979],[44.21669,47.86148],[44.64982,41.0679],[33.27881,40.39944]],x:38.627418505960875,y:44.464690000000004,height:5.7,rise:3,roofParts:[[[32.26652,49.39979],[44.21669,47.86148],[44.64982,41.0679],[33.27881,40.39944]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1},{name:"Southeast block clipped reference \xB7 reference estimate",footprint:[[28.13737,-45.84812],[30.89316,-45.00882],[42.23306,-45.95683],[42.03419,-49.59865],[45.0953,-49.73683],[43.89872,-59.30574],[40.14337,-59.24877],[40.22734,-58.57726],[32.54832,-58.44166],[31.9596,-59.7305],[27.35219,-59.64914]],x:36.109772290582754,y:-54.089245,height:5.7,rise:3,roofParts:[[[28.22153,-45.85895],[45.51515,-46.37932],[43.91971,-59.13786],[27.35219,-59.64914]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1}],road:[[-62.99803,-16.29118],[-22.94083,-17.35374],[-8.26841,-10.79887],[-3.22657,-22.45016],[-12.24028,-26.83363],[-15.75422,-24.8461],[-18.85768,-23.679],[-23.66508,-23.14545],[-63.82724,-22.92226]],pavement:[[-62.74612,-14.27667],[-24.01442,-14.99803],[-7.48025,-7.91522],[-.24943,-23.25984],[-13.05992,-29.9691],[-15.24854,-27.64043],[-19.39355,-25.91282],[-24.49558,-25.00018],[-64.08964,-25.0207]],drives:[[[-25.5858,-.21135],[-7.58782,.7981],[-7.29095,-7.76901],[-24.01442,-14.99803],[-25.88685,-14.92758]],[[-43.14071,-5.88343],[-27.42525,-5.34776],[-25.97101,-14.91674],[-47.47225,-14.53705]],[[-61.27589,-5.25473],[-49.1053,-5.03034],[-47.5564,-14.52622],[-62.74612,-14.27667]],[[-.24943,-23.25984],[15.64447,-21.29723],[15.69165,-40.06686],[5.58372,-43.62717],[.05961,-37.88403],[2.35207,-35.2793]],[[-43.09353,-24.65306],[-15.09109,-26.38137],[-14.97173,-39.78709],[-29.12009,-39.41573],[-30.66657,-38.79021],[-37.11622,-33.61024]],[[19.39992,16.9405],[30.53463,35.55006],[54.63495,32.02126],[50.79479,-4.15864],[18.9234,-10.12003]]],gate3:[[-21.74277,-13.24352],[-18.24026,-11.90332]],gate6:[[-34.27831,-25.27608],[-30.17584,-25.29245]],wall3:[[[-25.86586,-14.7597],[-21.74277,-13.24352]],[[-18.24026,-11.90332],[-7.48025,-7.91522]]],basis:"Footprints and road traced from supplied site plan registered to eleven fixed house/site anchors. Roofs/elevations estimated from supplied Google aerial and Street View. Clipped reference edges remain uncertain; no surveyed heights.",registrationRMSMetres:.1286789476763554};var Em="ashley-heights-street-context";function Tm(s){try{return s?.getItem(Em)==="on"}catch{return!1}}function Am(s,e){try{s?.setItem(Em,e?"on":"off")}catch{}}function Hy(s){let e=structuredClone(An.houses),t=[[-72,-68],[62,-68],[62,60],[-72,60]],i=e.map(n=>({name:n.name,polygon:n.footprint,bottom:0,top:n.height+n.rise}));return{enabled:!1,bounds:[Math.min(s.bounds[0],-72),Math.min(s.bounds[1],-68),Math.max(s.bounds[2],62),Math.max(s.bounds[3],60)],road:An.road,ground:t,houses:e,obstacles:i,walkPolygons:[t],basis:An.basis,registrationRMSMetres:An.registrationRMSMetres}}function wm(s,e){let t=s.data.streetContext,i=t?.enabled;t&&(t.enabled=!1);try{let n=s.support(e.x,e.y,e.z);return n!==null&&Math.abs(n-e.z)<.2&&!s.blocked(e.x,e.y,n)?{x:e.x,y:e.y,z:n}:null}finally{t&&(t.enabled=i)}}function Rm(s,{flying:e=!1}={}){let t=s.data.streetContext;if(!t||(t.enabled=!1,e||wm(s,s.position)))return!1;let i=[...s.data.rooms].sort((n,r)=>+(r.id==="arrival")-+(n.id==="arrival"));for(let n of i){let[r,a,o]=n.position,l=wm(s,{x:r,y:a,z:o});if(l)return s.position=l,!0}return t.enabled=!0,!1}function Id(s,e){return!!s.streetContext?.enabled&&!Jt(e.x,e.y,s.site.outline_m)&&!Jt(e.x,e.y,s.approachSurface?.polygon??[])}var ah=class{constructor(e,t){this.scene=e,this.data=t,this.definition=Hy(t),t.streetContext=this.definition,this.group=null,this.stats={meshes:0,triangles:0}}setVisible(e){e&&!this.group&&this.build(),this.definition.enabled=!!e,this.group&&(this.group.visible=!!e)}build(){let e=this.definition,t=new at;t.name="Optional reference-traced street context";let i={grass:"#819477",road:"#646c68",kerb:"#bbb9ae",drive:"#aca594",brick:"#967a60",roof:"#5a554e",trim:"#e1ded4",glass:"#6b8281",green:"#5f7555"},n=new Map(Object.keys(i).map(p=>[p,[]])),r=(p,x)=>{p.deleteAttribute("uv"),n.get(x).push(p)},a=p=>new Pi(p.map(([x,m])=>new ne(x,m))),o=(p,x,m,g=[])=>{let _=a(p);for(let b of g)_.holes.push(new Es(b.map(([y,S])=>new ne(y,S))));let M=new $i(_);M.rotateX(-Math.PI/2),M.translate(0,x,0),r(M,m)},l=(p,x,m,g,_,M,b,y=0)=>{let S=new gt(g,M,_);S.rotateY(y),S.translate(p,m+M/2,-x),r(S,b)},c=(p,x,m,g,_,M)=>{let b=x[0]-p[0],y=x[1]-p[1],S=Math.hypot(b,y);l((p[0]+x[0])/2,(p[1]+x[1])/2,_,S,m,g,M,Math.atan2(y,b))},h=(p,x,m)=>{let g=new Oa(a(p),{depth:x,bevelEnabled:!1,steps:1,curveSegments:1});g.rotateX(-Math.PI/2),r(g,m)},u=(p,x,m)=>{let g=p.reduce((U,H)=>[U[0]+H[0]/4,U[1]+H[1]/4],[0,0]),_=p[0],M=p[1],b=Math.hypot(M[0]-_[0],M[1]-_[1]),y=Math.hypot(p[2][0]-M[0],p[2][1]-M[1]),S=[(M[0]-_[0])/b,(M[1]-_[1])/b];y>b&&(_=p[1],M=p[2],S=[(M[0]-_[0])/y,(M[1]-_[1])/y],[b,y]=[y,b]);let R=[-S[1],S[0]],v=(U,H)=>[g[0]+S[0]*U+R[0]*H,g[1]+S[1]*U+R[1]*H],E=[v(-b/2-.22,-y/2-.22),v(b/2+.22,-y/2-.22),v(b/2+.22,y/2+.22),v(-b/2-.22,y/2+.22)];if(m===0){o(E,x+.14,"roof");for(let U=0;U<4;U++)c(E[U],E[(U+1)%4],.06,.18,x-.04,"trim");return}let T=Math.max(.2,(b-y)/2),C=v(-T,0),D=v(T,0),F=[...E.map(([U,H])=>[U,x,-H]),[C[0],x+m,-C[1]],[D[0],x+m,-D[1]]].flat(),L=new ot;L.setAttribute("position",new je(F,3)),L.setIndex([0,1,5,0,5,4,1,2,5,2,3,4,2,4,5,3,0,4]),L.computeVertexNormals(),r(L,"roof");for(let U=0;U<4;U++)c(E[U],E[(U+1)%4],.045,.1,x-.08,"trim")};o(e.ground,-.135,"grass",[this.data.site.outline_m]),o(An.pavement,-.025,"drive"),o(e.road,-.012,"road");for(let p=0;p<e.road.length-1;p++)c(e.road[p],e.road[p+1],.14,.09,-.015,"kerb");for(let p of An.drives)o(p,-.008,"drive");let d=(p,x,m,g,_,M,b="light")=>{let y=Math.hypot(x[0]-p[0],x[1]-p[1]),S=[(x[0]-p[0])/y,(x[1]-p[1])/y],R=[S[1],-S[0]],v=p[0]+(x[0]-p[0])*m+R[0]*.04,E=p[1]+(x[1]-p[1])*m+R[1]*.04,T=Math.atan2(S[1],S[0]),C=b==="dark"?"roof":"trim";l(v,E,g,_,.055,M,C,T),l(v+R[0]*.03,E+R[1]*.03,g+.07,_-.14,.025,M-.14,"glass",T);let D=_>1.8?3:2;for(let F=1;F<D;F++){let L=(F/D-.5)*_;l(v+S[0]*L+R[0]*.05,E+S[1]*L+R[1]*.05,g+.07,.035,.03,M-.14,C,T)}};for(let p of e.houses){h(p.footprint,p.height,"brick");for(let B of p.roofParts)u(B,p.height,p.rise);let x=[p.y>0||p.name.startsWith("Neighbour 1")||p.name.startsWith("Neighbour 2")?p.x:-10,-21],m=p.footprint.reduce((B,K,G)=>{let j=p.footprint[(G+1)%p.footprint.length];return B+K[0]*j[1]-j[0]*K[1]},0),g=p.footprint.map((B,K)=>{let G=B,j=p.footprint[(K+1)%p.footprint.length];m<0&&([G,j]=[j,G]);let $=j[0]-G[0],ye=j[1]-G[1],xe=Math.hypot($,ye);return{a:G,b:j,length:xe,score:((x[0]-(G[0]+j[0])/2)*ye-(x[1]-(G[1]+j[1])/2)*$)/xe}}),_=p.front||[...g].filter(B=>B.length>4).sort((B,K)=>K.score-B.score)[0],M=Array.isArray(_)?_[0]:_.a,b=Array.isArray(_)?_[1]:_.b,y=(M[0]+b[0])/2,S=(M[1]+b[1])/2,R=b[0]-M[0],v=b[1]-M[1],E=Math.hypot(R,v);(p.x-y)*v-(p.y-S)*R>0&&([M,b]=[b,M]);let T=Math.hypot(b[0]-M[0],b[1]-M[1]),C=[(b[0]-M[0])/T,(b[1]-M[1])/T],D=[C[1],-C[0]],F=Math.atan2(C[1],C[0]);if(p.garage){let B=(M[0]+b[0])/2+D[0]*.04,K=(M[1]+b[1])/2+D[1]*.04;l(B,K,.03,Math.min(3.9,T-.6),.08,2.08,"roof",F);for(let G=0;G<10;G++){let j=(G/9-.5)*Math.min(3.8,T-.7);l(B+C[0]*j+D[0]*.05,K+C[1]*j+D[1]*.05,.08,.025,.02,1.97,"glass",F)}continue}for(let B of[.18,.5,.82])d(M,b,B,3.18,B===.5?1.4:1.85,1.4,p.frame);for(let B of[.18,.82])d(M,b,B,.76,1.85,1.42,p.frame);if(p.secondaryFront){let[B,K]=p.secondaryFront,G=K[0]-B[0],j=K[1]-B[1];(p.x-(B[0]+K[0])/2)*j-(p.y-(B[1]+K[1])/2)*G>0&&([B,K]=[K,B]);for(let $ of[.28,.73])for(let ye of[.76,3.18])d(B,K,$,ye,1.78,1.4,p.frame)}let L=(M[0]+b[0])/2+D[0]*.06,U=(M[1]+b[1])/2+D[1]*.06;if(l(L,U,.02,1.02,.09,2.18,p.frame==="dark"?"roof":"trim",F),p.name.startsWith("Neighbour 6")){for(let B of[.5-.075,.5+.075])d(M,b,B,.18,.33,1.9,"light");l(L+D[0]*.44,U+D[1]*.44,2.3,2.35,.96,.16,"trim",F);for(let B of[-1,1])l(L+C[0]*B+D[0]*.76,U+C[1]*B+D[1]*.76,0,.15,.15,2.3,"trim")}let H=B=>[[M,b],...p.secondaryFront?[p.secondaryFront]:[]].some(([K,G])=>{let j=G[0]-K[0],$=G[1]-K[1],ye=Math.hypot(j,$);return[B.a,B.b].every(xe=>Math.abs((xe[0]-K[0])*$-(xe[1]-K[1])*j)/ye<.15)});for(let B of g.filter(K=>K.length>5&&!H(K)).slice(0,2))for(let K of[.86,3.18])d(B.a,B.b,.53,K,1.45,1.3,p.frame)}for(let[p,x]of An.wall3)c(p,x,.25,1.5,0,"brick");let f=(p,x)=>{let[m,g]=p,_=Math.hypot(g[0]-m[0],g[1]-m[1]),M=[(g[0]-m[0])/_,(g[1]-m[1])/_],b=Math.atan2(M[1],M[0]);for(let[y,S]of p)l(y,S,0,.43,.43,1.95,"brick"),l(y,S,1.95,.49,.49,.1,"kerb");if(x){c(m,g,.075,1.62,0,"roof");for(let S=1;S<7;S++)c(m,g,.085,.016,S*.23,"glass");let y=[m[0]+M[0]*_*.7,m[1]+M[1]*_*.7];l(...y,0,.025,.09,1.62,"kerb",b)}else{for(let y of[.14,.84,1.5])c(m,g,.055,.035,y,"roof");for(let y=1;y<23;y++){let S=y/23;l(m[0]+(g[0]-m[0])*S,m[1]+(g[1]-m[1])*S,.1,.02,.02,1.48,"roof")}}};f(An.gate3,!0),f(An.gate6,!1);for(let[p,x,m]of[[-29,14,2.1],[-49,12,2.6],[-42,-12,2],[-17,-32,2.5],[22,-30,2.7],[27,26,2.4],[44,-10,3]]){l(p,x,0,.25,.25,2.5,"brick");let g=new ka(m,0);g.scale(1,1.2,1),g.translate(p,3.1,-x),r(g,"green")}for(let[p,x]of n){if(!x.length)continue;let m=x.map(b=>b.index?b.toNonIndexed():b),g=En(m,!1),_=new Xt({color:i[p],roughness:.97,side:Dt}),M=new Ye(g,_);M.name="Street context "+p,M.castShadow=!["grass","road","drive"].includes(p),M.receiveShadow=!0,t.add(M),this.stats.meshes++,this.stats.triangles+=g.attributes.position.count/3;for(let b of new Set([...x,...m]))b.dispose()}this.group=t,this.scene.add(t)}};var Yr={skin:["#e8c4a8","#d9a98a","#c58f6b","#8d5a3c","#6b4128","#f0d2bc"],hair:["#2b2118","#4a2f1d","#7d5a3a","#b98a55","#d9c39a","#5a5650","#1a1714"],top:["#5f7f96","#8a6f5a","#c9c2b4","#496b5a","#a34e45","#3f4652","#d7a24e","#6f5d8a","#e0e0d8","#2f4858"],bottom:["#343b38","#4b5563","#7a6a55","#2d3a4b","#8a8a80","#5b4636"],shoe:["#27302e","#5a4a3a","#e8e8e2","#3a3f47"]},Jr=(s,e)=>s[Math.abs(Math.floor(e))%s.length],Gs=["man","woman","man-smart","woman-dress","teen","child"],oh=class{constructor(e=0,t=Gs[e%Gs.length]){this.group=new at,this.group.name=`Resident ${e+1}`,this.variant=e,this.style=t,this.heading=0,this.motionBlend=0,this.sitBlend=0,this.lookYaw=0,this.state="idle";let i=t==="child",n=t==="teen",r=t.startsWith("woman"),a=t==="woman-dress",o=t==="man-smart";this.scale=i?.62:n?.86:r?.94:1,this.group.scale.setScalar(this.scale);let l=(v,E={})=>new Xt({color:v,roughness:.9,flatShading:!0,...E}),c=l(Jr(Yr.skin,e*7+3)),h=l(Jr(Yr.hair,e*5+1)),u=l(o?"#2f3a48":Jr(Yr.top,e*3+(r?4:0))),d=l(o?"#2f3a48":a?Jr(Yr.top,e*3+4):Jr(Yr.bottom,e*2+1)),f=l(Jr(Yr.shoe,e+(o?0:1))),p=l(o?"#f2f2ee":"#ece9e0"),x=new As(1,9,7),m=new gt(1,1,1),g=new kn(1,1,3,8),_=(v,E,T,C,D)=>{let F=new Ye(E,T);return F.position.set(...C),F.scale.set(...D),F.castShadow=!0,F.receiveShadow=!0,v.add(F),F},M=(v,E)=>{let T=new at;return T.position.set(...E),v.add(T),T},b=(v,E,T,C)=>_(v,g,E,[0,-T/2,0],[C,T/3,C]);if(this.hips=M(this.group,[0,.92,0]),_(this.hips,m,d,[0,.02,0],[.32,.16,.2]),this.chest=M(this.hips,[0,.1,0]),_(this.chest,m,u,[0,.24,0],[.33,.46,.2]),_(this.chest,m,u,[0,.44,0],[.41,.08,.22]),a&&_(this.hips,m,d,[0,-.16,0],[.36,.36,.24]),o){for(let v of[-1,1]){let E=_(this.chest,m,p,[v*.05,.3,.115],[.05,.24,.02]);E.rotation.z=v*.28}_(this.chest,m,l("#7a2e3a"),[0,.28,.125],[.035,.2,.015])}else _(this.chest,m,p,[0,.4,.11],[.1,.06,.02]);this.neck=M(this.chest,[0,.5,0]),_(this.neck,g,c,[0,.03,0],[.045,.03,.045]),this.head=M(this.neck,[0,.09,0]),_(this.head,x,c,[0,.09,0],[.098,.118,.104]),_(this.head,m,c,[0,.045,.095],[.026,.045,.03]),_(this.head,m,c,[0,0,.085],[.05,.012,.015]);for(let v of[-1,1])_(this.head,x,c,[v*.098,.085,.01],[.02,.03,.015]),_(this.head,x,l("#2a2622"),[v*.036,.105,.093],[.011,.011,.006]);_(this.head,x,h,[0,.135,-.01],[.104,.09,.108]),(r||n&&e%2)&&_(this.head,x,h,[0,.06,-.07],[.1,.16,.07]),a&&_(this.head,m,h,[0,-.06,-.1],[.09,.22,.05]),i&&_(this.head,x,h,[0,.16,0],[.108,.07,.11]),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[],this.hands=[];for(let v of[-1,1]){let E=M(this.chest,[v*.2,.44,0]);b(E,u,.28,.052);let T=M(E,[0,-.27,0]);_(T,x,u,[0,0,0],[.05,.05,.05]),b(T,o||a?u:c,.24,.043),this.hands.push(_(T,m,c,[0,-.28,.01],[.06,.1,.035])),this.arms.push(E),this.elbows.push(T);let C=M(this.hips,[v*.095,-.04,0]);b(C,d,.44,.072);let D=M(C,[0,-.43,0]);_(D,x,d,[0,0,0],[.06,.06,.06]),b(D,d,.42,.055),this.feet.push(_(D,m,f,[0,-.44,.045],[.11,.07,.26])),this.legs.push(C),this.knees.push(D)}let y=new Set,S=[];this.group.traverse(v=>{v.isMesh?y.add(v.geometry):S.push(v)});for(let v of S){let E=new Map;for(let T of[...v.children])if(T.isMesh){let C=E.get(T.material)??[];C.push(T),E.set(T.material,C)}for(let[T,C]of E)if(C.length>1){let D=C.map(L=>(L.updateMatrix(),L.geometry.clone().applyMatrix4(L.matrix))),F=new Ye(En(D),T);F.castShadow=!0,F.receiveShadow=!0,C.forEach(L=>v.remove(L)),v.add(F),D.forEach(L=>L.dispose())}}let R=new Set;this.group.traverse(v=>{v.isMesh&&R.add(v.geometry)}),y.forEach(v=>{R.has(v)||v.dispose()}),this.update(0,{x:0,y:0,z:0},{x:0,y:1},!1,0)}update(e,t,i,n,r=1/60,a={}){let o=a.state??(n?"walk":"idle");this.state=o;let l=o==="treadmill",c=o==="sit",h=this.variant,u=l?6.2:3.4,d=e*u+h*1.7,f=Math.sin(d),p=Math.sin(e*1.1+h*2.3);this.motionBlend+=(Number(n||l)-this.motionBlend)*Math.min(1,r*8),this.sitBlend+=(Number(c)-this.sitBlend)*Math.min(1,r*5);let x=this.motionBlend,m=this.sitBlend;if(Math.hypot(i.x,i.y)>1e-4){let b=Math.atan2(i.x,-i.y),y=Math.atan2(Math.sin(b-this.heading),Math.cos(b-this.heading));this.heading+=y*Math.min(1,r*(n?9:4))}let g=o==="idle"||o==="look"?Math.sin(e*.43+h*1.3)*.5+Math.max(0,Math.sin(e*.9+h))**8*.4:0;this.lookYaw+=(g-this.lookYaw)*Math.min(1,r*3),this.group.rotation.y=this.heading;let _=a.seatHeight??.45;this.group.position.set(t.x,t.z+.005,-t.y),this.hips.position.set(0,.92*(1-m)+_/this.scale*m,-.14*m),this.hips.rotation.set(-.04*m,.05*f*x,.02*p+.03*f*x),this.chest.rotation.set(.02+.01*p+(o==="work"?.16:0)+(l?.08:0)-.05*m,-f*x*.09,-.03*f*x),this.neck.rotation.set(-.02*m,0,0),this.head.rotation.set(.01*p+(o==="work"?.25:0)+(o==="phone"?.3:0),this.lookYaw+(o==="look"?Math.sin(e*.6+h)*.6:0),.02*Math.sin(e*.8+h));let M=l?.62:.38;for(let b=0;b<2;b++){let y=b?-f:f,S=b?1:-1,R=y*M*x;this.legs[b].rotation.set(R*(1-m)-1.45*m,0,S*.02),this.knees[b].rotation.set(Math.max(0,-y)*(l?1.1:.55)*x*(1-m)+1.5*m,0,0),this.feet[b].rotation.set(m?-.1:0,0,0);let v=-y*(l?.9:.42)*x,E=S*.06,T=-.18-(l?.9:.18)*x;if(o==="work")v=-.95,T=-.75,E=S*.18;else if(o==="phone")b===1&&(v=-.7,T=-2.2,E=-.35);else if(o==="wave"&&b===1)v=-2.6+Math.sin(e*7)*.15,T=-.6,E=-.6+Math.sin(e*7)*.2;else if(c)v=-.55,T=-1.1,E=S*.08;else if(o==="idle"&&b===h%2){let C=Math.max(0,Math.sin(e*.5+h*2.1))**6;v-=C*.35,T-=C*.6}this.arms[b].rotation.set(v,0,E),this.elbows[b].rotation.set(T,0,0)}}dispose(){let e=new Set,t=new Set;this.group.traverse(i=>{i.isMesh&&(e.add(i.geometry),t.add(i.material))}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.group.removeFromParent()}};var Cm=Math.PI*2;var Pm=s=>s-Cm*Math.floor((s+Math.PI)/Cm);function Im(s){let e=s.proposalFrontage?.wall_line_m,t=s.walls?.find(u=>/gates?$/i.test(u.name)&&u.openings?.length),i,n;if(e){let u=(s.segments??[]).filter(g=>/Front boundary wall (south|north)/.test(g.name)),d=[e[1][0]-e[0][0],e[1][1]-e[0][1]],f=Math.hypot(...d),p=[d[0]/f,d[1]/f],x=g=>(g[0]-e[0][0])*p[0]+(g[1]-e[0][1])*p[1],m=u.map(g=>[g.a,g.b].sort((_,M)=>Math.abs(x(_)-f/2)-Math.abs(x(M)-f/2))[0]);[i,n]=m.length===2?m.sort((g,_)=>x(g)-x(_)):[e[0],e[1]]}else if(t){let[u,d]=t.openings[0],f=[t.b[0]-t.a[0],t.b[1]-t.a[1]],p=Math.hypot(...f),x=[f[0]/p,f[1]/p];i=[t.a[0]+x[0]*(u-d/2),t.a[1]+x[1]*(u-d/2)],n=[t.a[0]+x[0]*(u+d/2),t.a[1]+x[1]*(u+d/2)]}else i=[-2.7,-18.03],n=[-4.72,-13.67];let r=[(i[0]+n[0])/2,(i[1]+n[1])/2],a=n[0]-i[0],o=n[1]-i[1],l=Math.hypot(a,o),c=[o/l,-a/l],h=s.site?.outline_m;if(h){let u=h.reduce((f,p)=>f+p[0],0)/h.length,d=h.reduce((f,p)=>f+p[1],0)/h.length;c[0]*(u-r[0])+c[1]*(d-r[1])>0&&(c=[-c[0],-c[1]])}return{a:i,b:n,centre:r,out:c,width:l,inward:Math.atan2(-c[1],-c[0])}}var Lo=class{constructor(e){this.path=e,this.s=[0];for(let t=1;t<e.length;t++)this.s.push(this.s[t-1]+Math.hypot(e[t].x-e[t-1].x,e[t].y-e[t-1].y));this.length=this.s[this.s.length-1]}pose(e){let t=Math.max(0,Math.min(this.length,e)),i=1;for(;i<this.s.length-1&&this.s[i]<t;)i++;let n=this.path[i-1],r=this.path[i],a=this.s[i]-this.s[i-1],o=a>1e-9?(t-this.s[i-1])/a:1;return{x:n.x+(r.x-n.x)*o,y:n.y+(r.y-n.y)*o,t:Pm(n.t+Pm(r.t-n.t)*o),dir:r.dir}}};var Dm=()=>globalThis.performance?.now()??Date.now(),Fo=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),sn=(s,e)=>s+Math.random()*(e-s),lh=s=>s[Math.floor(Math.random()*s.length)],Vy=/sofa|bench|lounger|armchair|chair|stool|\bbed\b|\bbed |seat|day bed/i,Wy=/coffee|side table|bedside|headboard|table|desk|frame|rack|counter|unit|storage|cistern|toilet|pedestal|vanity|basin|shower|hanging|shelf|rail|treadmill|rower|weights/i,ch=class{constructor(e,t,i,n){this.life=e,this.id=t,this.nav=new zs(e.data),this.nav.radius=.18,this.nav.position={x:i.x,y:i.y,z:i.z},this.nav.stepUp=.42,this.figure=new oh(t,n),e.group.add(this.figure.group),this.path=null,this.index=1,this.job=null,this.target=null,this.activity=null,this.activityUntil=0,this.wait=0,this.stalled=0,this.phase=Math.random()*10,this.facing={x:0,y:1},this.speed=sn(1.05,1.35),this.state="idle",this.car=null,this.hidden=!1,this.nextPlanAt=0,this.failures=0}get position(){return this.nav.position}advance(e,t){let i=this.nav,n=i.position,r=n.x+e,a=n.y+t,o=i.support(r,a,n.z);if(o!==null&&!i.blocked(r,a,o)){i.position={x:r,y:a,z:o};return}i.move(e,t)}setHidden(e){this.hidden=e,this.figure.group.visible=!e}chooseDestination(){let e=this.nav.position,t=this.life,i=t.destinations.filter(o=>Fo(o,e)>2.5&&!t.claimed.has(o.key)&&(t.unreachable.get(o.key)??0)<t.time);if(!i.length)return null;let n=i.filter(o=>Math.abs(o.z-e.z)<.5),r=n.length&&Math.random()<.65?n:i,a=[];for(let o of r)for(let l=0;l<(o.kind==="seat"?3:o.kind==="treadmill"?2:1);l++)a.push(o);return lh(a)}goTo(e,t=null){this.target&&this.life.claimed.delete(this.target.key),this.target=e,this.onArrive=t,this.path=null,this.index=1,this.job=null,this.nextPlanAt=0,e?.key&&this.life.claimed.add(e.key)}arrive(){let e=this.target;this.state=e.kind==="seat"?"sit":e.kind==="treadmill"?"treadmill":e.kind==="desk"?"work":lh(["idle","idle","look","phone"]),this.activityUntil=this.life.time+(e.kind==="seat"?sn(25,70):e.kind==="treadmill"?sn(20,45):e.kind==="desk"?sn(20,50):sn(8,22)),e.dir&&(this.facing={x:e.dir[0],y:e.dir[1]}),this.seatHeight=e.seatHeight,e.seat?(this.standPoint={x:e.x,y:e.y},this.nav.position.x=e.seat[0],this.nav.position.y=e.seat[1]):this.standPoint=null;let t=this.onArrive;this.onArrive=null,t&&t(this,!0)}step(e){let t=this.life,i=t.time,n=this.nav;if(this.hidden)return;if(!this.target){if(i>=this.activityUntil){this.standPoint&&(n.position.x=this.standPoint.x,n.position.y=this.standPoint.y,this.standPoint=null,this.state="idle");let o=this.chooseDestination();o?this.goTo(o):this.activityUntil=i+3}this.figure.update(i+this.phase,n.position,this.facing,!1,e,{state:this.state,seatHeight:this.seatHeight});return}if(!this.path&&!this.job&&i>=this.nextPlanAt&&(this.job=t.planner.search(n.position,this.target)),this.job&&t.budgetLeft()>0&&(this.job.step(1/0,Math.max(.2,t.budgetLeft())),this.job.done)){if(this.job.path)this.path=this.job.path,this.index=1,this.failures=0;else if(this.failures++,this.nextPlanAt=i+1.5,this.failures>=2){t.unreachable.set(this.target.key,i+180),this.failures=0;let o=this.onArrive;this.goTo(null),this.activityUntil=i+1,this.state="idle",o&&o(this,!1)}this.job=null}let r=!1,a={...n.position};if(this.path&&this.index<this.path.length){for(let u=Math.min(this.path.length-1,this.index+4);u>this.index;u--)if(Fo(n.position,this.path[u])<1.2&&t.planner.clear(n.position,this.path[u])){this.index=u;break}let o=this.path[this.index],l=o.x-n.position.x,c=o.y-n.position.y,h=Math.hypot(l,c);if(h<.05)this.index++;else{let u={x:n.position.x+l/h*.7,y:n.position.y+c/h*.7,z:n.position.z};if(t.blockedAhead(this,u))this.wait+=e,this.wait>4&&(this.wait=0,this.path=null,this.nextPlanAt=i+.5);else{this.wait=0;let f=Math.min(h,this.speed*e);if(this.advance(l/h*f,c/h*f),r=Fo(a,n.position)>f*.25,this.stalled=f>1e-5&&!r?this.stalled+e:0,this.stalled>.25&&this.stalled<.6){let p=Math.random()*Math.PI*2;n.move(Math.cos(p)*.03,Math.sin(p)*.03)}this.stalled>.6&&(this.stalled=0,this.path=null,this.nextPlanAt=i+.3),r&&(this.facing={x:l/h,y:c/h})}}if(this.path&&this.index>=this.path.length){let u=this.target;this.path=null,this.life.claimed.delete(u.key),this.arrive(),this.target=null}}this.figure.update(i+this.phase,n.position,this.facing,r,e,{state:r?"walk":this.state==="sit"||this.state==="treadmill"?"idle":this.state})}dispose(){this.target&&this.life.claimed.delete(this.target.key),this.figure.dispose()}},Dd=class{constructor(e,t,i){this.life=e,this.bay=t,this.id=t.id,this.group=i.group,this.obstacle=i.obstacle,this.length=4.4,this.width=1.8,this.pose={x:t.x,y:t.y,t:t.t},this.state="parked",this.until=e.time+sn(20,90),this.track=null,this.s=0,this.speed=0,this.owner=null,this.away=!1,this.paths=e.drivePaths?.[t.id]??null,this.apply()}apply(){let e=this.pose;this.group.position.set(e.x,0,-e.y),this.group.rotation.y=e.t,this.group.visible=!this.away;let t=Math.abs(Math.cos(e.t)),i=Math.abs(Math.sin(e.t)),n=(this.length*t+this.width*i)/2,r=(this.length*i+this.width*t)/2,a=this.away?[999,999,999.1,999.1]:[e.x-n,e.y-r,e.x+n,e.y+r];this.obstacle&&(this.obstacle.box=a)}get moving(){return!this.away&&!!this.track&&(this.state==="driving-out"||this.state==="arriving")}doorPoint(){let e=this.pose,t=Math.sin(e.t),i=-Math.cos(e.t);return{x:e.x+t*1.35+Math.cos(e.t)*.5,y:e.y+i*1.35+Math.sin(e.t)*.5,z:0}}begin(e){this.track=e,this.s=0,this.speed=0}step(e){let t=this.life,i=t.time;switch(this.state){case"parked":i>=this.until&&this.paths?.exit&&!this.owner&&t.people?this.callOwner():i>=this.until&&this.paths?.exit&&!t.people&&(this.state="leaving");break;case"waiting-owner":break;case"leaving":t.takeDrive(this)&&(this.begin(new Lo(this.paths.exit)),this.state="driving-out");break;case"driving-out":{let n=this.gateDistance(),r=n-4.5;this.s<r-.01?this.drive(e,r):this.s<n+.5&&!t.gateOpen()?this.speed=0:(this.drive(e)||this.s>n+3)&&(this.away=!0,t.releaseDrive(this),this.state="away",this.until=i+sn(30,110),this.apply());break}case"away":i>=this.until&&this.paths?.arrive&&!t.cars.some(n=>n.state==="arriving")&&(this.state="arriving",this.begin(new Lo(this.paths.arrive)),this.pose={...this.paths.arrive[0]},this.away=!1,this.apply());break;case"arriving":{let n=this.gateDistance(),r=n-8,a=n-4.5;this.s<r-.01?this.drive(e,r):t.takeDrive(this)?this.s<a-.01?this.drive(e,a):this.s<n+.5&&!t.gateOpen()?this.speed=0:this.drive(e)&&(this.state="parked",t.releaseDrive(this),this.until=i+sn(45,180),this.dropOwner()):this.speed=0;break}}}gateDistance(){let e=this.track;if(e.gateS!==void 0)return e.gateS;let t=this.life.gate,i=1/0,n=0;for(let r=0;r<=e.length;r+=.25){let a=e.pose(r),o=Math.hypot(a.x-t.centre[0],a.y-t.centre[1]);o<i&&(i=o,n=r)}return e.gateS=n,n}drive(e,t=1/0){let i=this.track,n=Math.min(i.length,t),r=i.pose(this.s),a=r.dir<0,o=i.length;for(let u=this.s+.25;u<i.length;u+=.25)if(i.pose(u).dir!==r.dir){o=u;break}let l=Math.min(n-this.s,o-this.s),c=a?1.1:Math.min(2.4,.7+l*.9);this.life.personNear(this,r,a)&&(c=0),this.speed+=(c-this.speed)*Math.min(1,e*(c<this.speed?4:1.2)),this.s=Math.min(n,this.s+this.speed*e);let h=i.pose(this.s);return this.pose={x:h.x,y:h.y,t:h.t},this.apply(),this.s>=i.length-1e-6?!0:(this.s>=n-1e-6&&(this.speed=0),!1)}callOwner(){let e=this.life,t=e.freeResident();if(!t){this.until=e.time+15;return}this.owner=t,t.car=this,this.state="waiting-owner";let i=this.doorPoint();t.goTo({key:"car-"+this.id,kind:"car",x:i.x,y:i.y,z:0,dir:[Math.cos(this.pose.t),Math.sin(this.pose.t)]},(n,r)=>{r?(t.setHidden(!0),t.state="idle",this.state="leaving"):(t.car=null,this.owner=null,this.state="parked",this.until=e.time+20)})}dropOwner(){let e=this.life;if(!e.people)return;let t=this.doorPoint(),i=this.owner;if(!i){if(i=e.spawnResident(t),!i)return;this.owner=i,i.car=this}i.nav.position={x:t.x,y:t.y,z:0},i.setHidden(!1),i.facing={x:Math.sin(this.pose.t),y:-Math.cos(this.pose.t)};let n=e.entrance;i.goTo(n?{key:"entrance-"+this.id,kind:"view",x:n.x,y:n.y,z:n.z,dir:n.dir}:null,()=>{this.owner=null,i.car=null,i.activityUntil=e.time+sn(2,6)}),n||(this.owner=null,i.car=null)}},hh=class{constructor(e,{scene:t,doors:i,carTemplates:n=new Map,mobile:r=!1,drivePaths:a=null}={}){this.data=e,this.scene=t,this.doors=i,this.mobile=r,this.drivePaths=a??e.life?.drive??null,this.group=new at,this.group.name="Life",t.add(this.group),this.planner=new Wr(e,{spacing:.2,radius:.18}),this.residents=[],this.cars=[],this.people=!1,this.carsOn=!1,this.time=0,this.claimed=new Set,this.unreachable=new Map,this.turn=0,this.driveOwner=null,this.frameDeadline=0,this.gate=Im(e),this.gateDoor=i?.doors.find(l=>l.spec.id==="Proposal | Front sliding gate")??null,this.destinations=qy(e);let o=e.rooms.find(l=>/new entrance gallery/i.test(l.label))??e.rooms.find(l=>/entrance hall/i.test(l.label))??null;this.entrance=o?{x:o.position[0],y:o.position[1],z:o.position[2],dir:o.direction}:null,this.carTemplates=n;for(let[l,c]of n){let h=(e.proposalSite?.driveway_bay_bounds_m??[]).find(x=>x.id===l);if(!h)continue;let u=h.bounds_m,d=u[3]-u[1]>u[2]-u[0]?Math.PI/2:0,f=this.drivePaths?.[l]?.arrive,p=f?f[f.length-1]:{x:(u[0]+u[2])/2,y:(u[1]+u[3])/2,t:d};this.cars.push(new Dd(this,{id:l,x:p.x,y:p.y,t:p.t},c))}this.count=r?4:7}get active(){return this.people||this.carsOn}get visitorPositions(){let e=[];for(let t of this.residents)t.hidden||e.push({...t.nav.position});for(let t of this.cars)if(t.moving){let i=t.pose,n=t.track.pose(Math.min(t.track.length,t.s+2.6));e.push({x:i.x,y:i.y,z:0}),e.push({x:n.x,y:n.y,z:0})}return e}budgetLeft(){return this.frameDeadline-Dm()}setPeople(e){if(this.people=!!e,e&&!this.residents.length&&this.populate(),!e){for(let t of this.residents)t.dispose();this.residents=[],this.claimed.clear();for(let t of this.cars)t.owner&&(t.owner=null,t.state==="waiting-owner"&&(t.state="parked"))}}setCars(e){if(this.carsOn=!!e,!e)for(let t of this.cars){t.owner&&(t.owner.setHidden(!1),t.owner.car=null,t.owner.goTo(null),t.owner.activityUntil=this.time,t.owner=null);let i=t.paths?.arrive,n=i?i[i.length-1]:{x:t.bay.x,y:t.bay.y,t:t.bay.t};t.pose={...n},t.away=!1,t.track=null,t.state="parked",t.until=this.time+sn(20,90),t.apply()}this.driveOwner=null}populate(){let e=this.destinations.filter(t=>t.kind==="view"&&t.indoor);for(let t=0;t<this.count&&e.length;t++){let i=e.splice(Math.floor(Math.random()*e.length),1)[0];if(!this.planner.nav.canStand(i))continue;let n=new ch(this,this.residents.length,i,Gs[this.residents.length%Gs.length]);n.facing={x:i.dir[0],y:i.dir[1]},n.state=lh(["idle","look"]),n.activityUntil=this.time+sn(1,12),this.residents.push(n)}}spawnResident(e){if(this.residents.length>=this.count+2)return null;let t=new ch(this,this.residents.length,{x:e.x,y:e.y,z:0},Gs[this.residents.length%Gs.length]);return this.residents.push(t),t}freeResident(){let e=this.residents.filter(t=>!t.car&&!t.hidden&&!t.target);return e.length?lh(e):null}takeDrive(e){return!this.driveOwner||this.driveOwner===e?(this.driveOwner=e,!0):!1}releaseDrive(e){this.driveOwner===e&&(this.driveOwner=null)}driveFree(e){return!this.driveOwner||this.driveOwner===e}gateOpen(){return this.gateDoor?this.gateDoor.angle>.9:!0}personNear(e,t,i){let n=i?-1:1,r=Math.cos(t.t)*n,a=Math.sin(t.t)*n,o={x:t.x+r*e.length/2,y:t.y+a*e.length/2},l=c=>{let h=c.x-o.x,u=c.y-o.y,d=h*r+u*a,f=Math.abs(-h*a+u*r);return d>-.5&&d<3.2&&f<1.6&&Math.abs(c.z??0)<1.2};if(this.player&&l(this.player))return!0;for(let c of this.residents)if(!c.hidden&&l(c.nav.position))return!0;return!1}blockedAhead(e,t){if(this.player&&Fo(this.player,t)<.55&&Math.abs(this.player.z-t.z)<1.2)return"visitor";for(let i of this.residents)if(!(i===e||i.hidden)&&Fo(i.nav.position,t)<.5&&Math.abs(i.nav.position.z-t.z)<.6&&(!i.path||i.id<e.id))return"resident";for(let i of this.cars)if(i.moving){let n=i.pose;if(Math.hypot(n.x-t.x,n.y-t.y)<3.4)return"car"}return null}step(e,t){if(!this.active)return!1;e=Math.max(0,Math.min(.05,e)),this.time+=e,this.player=t,this.frameDeadline=Dm()+(this.mobile?2.5:4);let i=this.residents.length;if(this.turn=(this.turn+1)%Math.max(1,i),this.people)for(let n=0;n<i;n++)this.residents[(this.turn+n)%i].step(e);if(this.carsOn)for(let n of this.cars)n.step(e);return!0}dispose(){this.setPeople(!1),this.group.removeFromParent()}};function qy(s){let e=[];for(let t of s.rooms){if(/gate|street|approach|outside|bridge|stair|landing|gallery|passage|corridor|lobby/i.test(t.id+" "+t.label))continue;let[i,n,r]=t.position;e.push({key:"view:"+t.id,kind:"view",x:i,y:n,z:r,dir:t.direction,indoor:!/garden|terrace|pool|deck|pavilion|lawn|drive|court/i.test(t.group+" "+t.label)})}for(let t of s.obstacles??[]){let i=t.box;if(!i)continue;let n=t.name??"",r=(i[0]+i[2])/2,a=(i[1]+i[3])/2,o=t.bottom??0;if(/treadmill/i.test(n)){let b=i[3]-i[1]>i[2]-i[0],y=b?[0,1]:[1,0],S=b?[(i[2]-i[0])/2+.45,0]:[0,(i[3]-i[1])/2+.45];e.push({key:"treadmill:"+n,kind:"treadmill",x:r+S[0],y:a+S[1],z:o,dir:y,seat:[r,a],indoor:!0});continue}if(!Vy.test(n)||Wy.test(n))continue;let l=t.top??o+.45,c=/bed/i.test(n)?Math.min(.6,l):Math.min(.5,Math.max(.4,l-.4)),h=i[2]-i[0],u=i[3]-i[1];if(h>3||u>3||h<.3||u<.3)continue;let d=s.rooms.filter(b=>Math.abs(b.position[2]-o)<.6).sort((b,y)=>Math.hypot(b.position[0]-r,b.position[1]-a)-Math.hypot(y.position[0]-r,y.position[1]-a))[0],f=d?[d.position[0]-r,d.position[1]-a]:[0,1],p=Math.hypot(...f)||1,x=f[0]/p,m=f[1]/p,g=(Math.abs(x)*h+Math.abs(m)*u)/2,_=g+.38,M=Math.max(0,g-.3);e.push({key:"seat:"+n,kind:"seat",x:r+x*_,y:a+m*_,z:o,dir:[x,m],seatHeight:c,seat:[r+x*M,a+m*M],indoor:!0})}return e}function Lm(s,e,t){let i=new at;i.name="Life car";let n=(e[0]+e[2])/2,r=(e[1]+e[3])/2,a=new Ue().makeRotationY(-t).multiply(new Ue().makeTranslation(-n,0,r));for(let{geometry:o,material:l}of s){let c=o.clone();c.applyMatrix4(a);let h=new Ye(c,l);h.castShadow=!0,h.receiveShadow=!0,i.add(h)}return i}var ae=s=>document.getElementById(s);document.body.classList.toggle("touch-ui",Ao());var wi=ae("view"),rn=new Ss;rn.background=new Be("#dce5e5");var km=()=>({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}),Qr=km(),ds=new qt(72,Qr.width/Qr.height,.045,150),an,Qe,Xe,Fi,lt=null,Ni=0,Rn=0,Cn=!1,Zt=!1,qs=!1,Zr=null,fs="drag",Oo=0,Fm=0,Nm=0,fh=!0,Ct=new Set,si={sourceMeshes:0,batches:0,hiddenMeshes:0},ht=!1,us=null,uh=new Map,No=null,Hs=null,Vs=null,ri=null,Um=0,Bm={people:"ashley-heights-life-people",cars:"ashley-heights-life-cars"};function Om(s){try{return localStorage.getItem(Bm[s])==="1"}catch{return!1}}function Xy(s,e){try{localStorage.setItem(Bm[s],e?"1":"0")}catch{}}var ia=()=>{uh.clear()};try{an=new Oc({canvas:wi,antialias:!Ao(),powerPreference:"high-performance"})}catch(s){throw ae("load-status").textContent="3D graphics could not start. Open this walkthrough in Safari or Chrome with hardware acceleration enabled.",s}var $r=new Yc({mobile:Ao(),dpr:devicePixelRatio});an.setPixelRatio($r.ratio(Qr.width,Qr.height));an.setSize(Qr.width,Qr.height,!1);an.outputColorSpace=Ut;var ei=cm(an,rn,ds),Ft=new Zc(wi,ae("move-pad"),ae("move-thumb"),(s,e)=>{!Cn||!Zt||(Ni-=s*.004,Rn=Math.max(-1.35,Math.min(1.35,Rn-e*.004)),qn())},()=>lt?.game.tapFire());function zm(s){ae("map").hidden=!s,ae("map-panel").classList.toggle("collapsed",!s),ae("map-toggle").textContent=Ft.enabled?s?"\xD7":"Map +":s?"\u2212":"+",ae("map-toggle").setAttribute("aria-expanded",String(s)),ae("map-toggle").setAttribute("aria-label",s?"Hide floorplan":"Show floorplan")}zm(!Ft.enabled);function on(s){ae("toast").textContent=s,ae("toast").hidden=!1,clearTimeout(on.timer),on.timer=setTimeout(()=>ae("toast").hidden=!0,4200)}function qn(){let s=Qe.position;ds.position.set(s.x,s.z+Xe.eyeHeight,-s.y),ds.rotation.set(Rn,Ni,0,"YXZ")}function Gm(s){Ni=Math.atan2(-s[0],s[1]),Rn=Math.atan2(s[2]||0,Math.hypot(s[0],s[1]))}function jy(s){return s.z>2&&s.z<3.3&&s.y>7.89&&s.y<10.64&&s.x>5.04&&s.x<9.08}function Hm(s){return[...Xe.floorLevels??[{id:0,z:0,label:"Ground floor"},{id:1,z:2.8,label:"First floor"}]].reverse().find(e=>s>=e.z-.35)??{id:0,z:0,label:"Ground floor"}}function Ld(){let s=Qe.position;if(ht){let i=s.z+Xe.eyeHeight;return"Flying \xB7 "+Math.round(Math.abs(i))+" m "+(i<0?"below ground":"high")}if(Id(Xe,s))return"Ashley Close";if(Xe.approachSurface&&Jt(s.x,s.y,Xe.approachSurface.polygon)&&!Jt(s.x,s.y,Xe.site.outline_m))return"Outside gates";let e=Hm(s.z).id;return Xe.planRooms.find(i=>(i.floor===e||e===0&&i.floor===2)&&Jt(s.x,s.y,i.polygon_m))?.name||(jy(s)?"Balcony":null)||(s.y>10?"Garden":s.y<0?"Front of house":s.z>.2&&s.z<2.7?"Stairs":"Outside")}function ea(){let s=Qe.position,e=Hm(s.z),t=s.y>11&&s.z<1,i=e.id;ae("location").textContent=Ld(),ae("floor-label").textContent=ht?"Site view":t?"Garden":Math.abs(s.z-e.z)>.35?"Stairs":e.label;let n=ae("map").getContext("2d"),r=480,a=310;n.clearRect(0,0,r,a);let o=Xe.streetContext?.enabled,l=o&&(ht||Id(Xe,s)),c=l?[-72,-51,31,34]:ht?[Xe.bounds[0]-4,Xe.bounds[1]-4,Xe.bounds[2]+4,Xe.bounds[3]+4]:t?[-28,8,19,33]:s.y<-.5?[-9,-24,19,11]:[-5.8,-1,14.7,11.2],h=Math.min((r-24)/(c[2]-c[0]),(a-24)/(c[3]-c[1])),u=(r-(c[2]-c[0])*h)/2,d=(a-(c[3]-c[1])*h)/2,f=([g,_])=>[u+(g-c[0])*h,a-d-(_-c[1])*h],p=(g,_,M)=>{n.beginPath(),g.forEach((b,y)=>{let[S,R]=f(b);y?n.lineTo(S,R):n.moveTo(S,R)}),n.closePath(),n.fillStyle=_,n.fill(),n.strokeStyle=M,n.lineWidth=1.6,n.stroke()};if(l){p(Xe.streetContext.road,"#a1aaa2","#808d83");for(let g of Xe.streetContext.obstacles)p(g.polygon,"#d6d0c3","#a39a8b");ae("floor-label").textContent="Street context"}(ht||t||s.y<-.5)&&Xe.site?.outline_m&&p(Xe.site.outline_m,"#d8e2cf","#9aaa96");for(let g of Xe.planRooms)(ht?g.floor===0||g.floor===2:t?g.floor===2:g.floor===i)&&p(g.polygon_m,g.name===Ld()?"#c0dacf":"#e9ece3","#8c9d90");if(!t&&!ht){for(let g of Qe.segments)if(Math.abs(g.bottom-e.z)<.1){let _=f(g.a),M=f(g.b);n.beginPath(),n.moveTo(..._),n.lineTo(...M),n.strokeStyle="#62766b",n.lineWidth=2,n.stroke()}}let[x,m]=f([s.x,s.y]);n.save(),n.translate(x,m),n.rotate(-Ni),n.fillStyle="#2c7864",n.beginPath(),n.moveTo(0,-14),n.lineTo(-8,7),n.lineTo(0,3),n.lineTo(8,7),n.closePath(),n.fill(),n.restore()}function Vm(){document.body.classList.toggle("flying",ht),ae("flight-toggle").textContent=ht?"\u2193 Walk":"\u2191 Fly",ae("flight-toggle").setAttribute("aria-pressed",String(ht)),ae("flight-toggle").setAttribute("aria-label",ht?"Return to walking":"Fly around the house"),ae("flight-height").hidden=!ht,lt?.game.started||(ae("hint").textContent=ht?"W A S D \xB7 E up / Q down \xB7 Shift faster \xB7 F walk \xB7 Esc controls":"W A S D / arrows \xB7 Shift faster \xB7 Esc controls",ae("welcome").querySelector("h1").textContent=ht?"Fly around.":"Come inside.",ae("welcome").querySelector(".keys span").innerHTML=ht?"W A S D move towards your view.<br>E up \xB7 Q down \xB7 Shift faster \xB7 F walk":"Move with these or the arrow keys.<br>Move your mouse to look around.",ae("welcome").querySelector(".touch-instructions p").textContent=ht?"Move and look together. Hold Up or Down to change height. Push the pad farther to fly faster.":"Use both together. Push the movement pad farther to sprint.",Cn&&(ae("start").textContent=ht?"Start flying":"Start walking"))}function ph(s,{quiet:e=!1}={}){if(!(!Cn||lt?.game.started)){if(s&&!ht&&(us=sh(Qe,Qe.position,us).position),!s&&ht){let t=sh(Qe,Qe.position,us);Qe.position=t.position,t.moved&&!e&&on("Returned to your walking viewpoint.")}ht=!!s,Ct.clear(),Ft.reset(),ia(),Vm(),qn(),ea()}}function dh(s){let e=Xe.rooms.find(t=>t.id===s);e&&(ht&&ph(!1,{quiet:!0}),Ft.reset(),Qe.teleport(e),us={...Qe.position},Gm(e.direction),Fi?.snap(Qe.position)&&ei.updateShadows(),qn(),ea(),ae("rooms").value=s,Ct.clear())}function ta(s){lt?.clock.phase!=="caught"&&(s&&lt?.game.cancelFire(),ae("welcome").hidden=!s,ae("resume").hidden=Ft.enabled||s||document.pointerLockElement===wi,document.body.classList.toggle("walking",!s),Zt=!s,Ft.setActive(Zt),Ct.clear(),ia())}function Ky(s){return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}function Yy(){lt.clock.catch(),Zt=!1,Ct.clear(),Ft.setActive(!1),qs=!1,document.body.classList.remove("walking"),ae("chase-status").hidden=!0,ae("welcome").hidden=!0,ae("resume").hidden=!0,document.pointerLockElement&&document.exitPointerLock();let s=lt.game.state;ae("caught-score").textContent=`Wave ${s.wave} \xB7 ${s.kills} defeated \xB7 ${s.score.toLocaleString()} points. Best: ${lt.game.best.toLocaleString()}.`,ae("caught").showModal(),ae("play-again").focus()}ae("caught").addEventListener("cancel",s=>s.preventDefault());ae("play-again").onclick=()=>{lt&&(lt.game.reset(),lt.clock.reset(),ae("caught").close(),ae("chase-status").hidden=!0,dh("arrival"),ei.updateShadows(),Oo=performance.now(),Ws(fs==="lock"))};async function Ws(s){if(Cn&&(s=s&&!Ft.enabled,fs=s?"lock":"drag",ta(!1),wi.focus(),s))try{await wi.requestPointerLock()}catch{fs="drag",on("Click and drag to look around; use W A S D to move."),ae("resume").hidden=!1}}ae("start").onclick=()=>Ws(!0);ae("drag").onclick=()=>Ws(!1);ae("resume").onclick=()=>Ws(!0);ae("help").onclick=()=>{document.pointerLockElement&&document.exitPointerLock(),ta(!0)};ae("rooms").onchange=s=>{lt?.game.started||(dh(s.target.value),ae("welcome").hidden&&wi.focus())};ae("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{on("Use your browser\u2019s fullscreen control.")}};function mh({focus:s=!0}={}){if(!Vs)return;let e=Vs;Vs=null,ae("settings-panel").hidden=!0,ae("settings-toggle").setAttribute("aria-expanded","false"),Zt=e.active,Ft.setActive(Zt),Ct.clear(),s&&ae("settings-toggle").focus(),Zt&&e.mode==="lock"&&(ae("resume").hidden=!1)}function Jy(){if(Cn){if(Vs){mh();return}Vs={active:Zt,mode:fs},fs="drag",Zt=!1,Ct.clear(),ia(),Ft.setActive(!1),lt?.game.cancelFire(),qs=!1,document.pointerLockElement&&document.exitPointerLock(),ae("settings-panel").hidden=!1,ae("settings-toggle").setAttribute("aria-expanded","true"),ae("street-context").focus()}}function Wm(s,{persist:e=!0}={}){if(!Hs)return;let t=!1;if(s?Hs.setVisible(!0):(t=Rm(Qe,{flying:ht}),Hs.setVisible(Xe.streetContext.enabled)),ae("street-context").checked=Xe.streetContext.enabled,e)try{Am(localStorage,Xe.streetContext.enabled)}catch{}si.streetContext={...Hs.stats,enabled:Xe.streetContext.enabled},Ct.clear(),Ft.reset(),ia(),t&&(us={...Qe.position},Fi?.snap(Qe.position),on("Street hidden. Returned to the front gates.")),qn(),ea(),ei.updateShadows()}ae("settings-toggle").onclick=Jy;ae("settings-close").onclick=()=>mh();ae("street-context").onchange=s=>Wm(s.target.checked);function Uo(s,e,{persist:t=!0}={}){if(ri){if(s==="people")ri.setPeople(e);else{if(e&&!ri.cars.length){on(hs(ni)?"No car paths are available for this design.":"Cars belong to the proposals: switch to Proposal A or B."),ae("life-cars").checked=!1;return}ri.setCars(e)}ae(s==="people"?"life-people":"life-cars").checked=s==="people"?ri.people:ri.carsOn,t&&Xy(s,e),si.life={people:ri.people,cars:ri.carsOn,residents:ri.residents.length,carCount:ri.cars.length},ei.updateShadows()}}ae("life-people").onchange=s=>Uo("people",s.target.checked);ae("life-cars").onchange=s=>Uo("cars",s.target.checked);document.addEventListener("pointerdown",s=>{Vs&&!ae("settings-panel").contains(s.target)&&!ae("settings-toggle").contains(s.target)&&mh({focus:!1})},!0);var qm=s=>{Cn&&(_m(ni),ym(s,{...Qe.position,yaw:Ni,pitch:Rn,active:Zt,flying:ht,lastWalkingPosition:us}),location.assign(vm(s)))};ae("design-switch").onclick=()=>qm(hs(ni)?"original":rh());ae("variant-switch").onclick=()=>qm(hs(ni)?Do(ni):Do(rh()));ae("map-toggle").onclick=()=>zm(ae("map").hidden);ae("flight-toggle").onclick=()=>{ph(!ht),Zt||Ws(!1),wi.focus(),ht&&on(Ft.enabled?"Fly mode \xB7 Move and look together \xB7 Hold Up / Down":"Fly mode \xB7 W A S D \xB7 E up / Q down \xB7 Shift faster")};for(let[s,e]of[["fly-up",1],["fly-down",-1]]){let t=ae(s);t.addEventListener("pointerdown",i=>{!ht||!Zt||(i.preventDefault(),uh.set(i.pointerId,e),t.setPointerCapture(i.pointerId))});for(let i of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(i,n=>uh.delete(n.pointerId));t.addEventListener("click",i=>{i.detail===0&&ht&&Zt&&(Qe.position=Rd(Xe,Qe.position,{vertical:e,dt:.04}),qn()),t.blur()}),t.addEventListener("contextmenu",i=>i.preventDefault())}for(let s of["blur","resize"])window.addEventListener(s,ia);document.addEventListener("visibilitychange",ia);document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===wi?(ta(!1),fs="lock"):fs==="lock"&&Cn&&ta(!0)});document.addEventListener("pointerlockerror",()=>{fs="drag",ta(!1),on("Use click-and-drag to look around.")});wi.addEventListener("pointerdown",s=>{s.pointerType==="touch"||s.pointerType==="pen"||!Cn||!Zt||(wi.focus(),qs=!0,Zr=[s.clientX,s.clientY],wi.setPointerCapture(s.pointerId))});wi.addEventListener("pointerup",()=>{qs=!1,Zr=null});wi.addEventListener("pointercancel",()=>{qs=!1});document.addEventListener("pointermove",s=>{if(s.pointerType==="touch"||s.pointerType==="pen"||!Zt)return;let e=0,t=0;if(document.pointerLockElement===wi)e=s.movementX,t=s.movementY;else if(qs&&Zr)e=s.clientX-Zr[0],t=s.clientY-Zr[1],Zr=[s.clientX,s.clientY];else return;Ni-=e*.0025,Rn=Math.max(-1.35,Math.min(1.35,Rn-t*.0025)),qn()});var Zy=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"];document.addEventListener("keydown",s=>{if(s.code==="Escape"){if(Vs){s.preventDefault(),mh();return}document.pointerLockElement&&document.exitPointerLock(),ta(!0);return}if(!(!Zt||["SELECT","INPUT","BUTTON"].includes(document.activeElement?.tagName))){if(s.code==="KeyF"&&!s.repeat&&!lt?.game.started){s.preventDefault(),ph(!ht);return}(Zy.includes(s.code)||ht&&["KeyE","KeyQ"].includes(s.code))&&(s.preventDefault(),Ct.add(s.code))}});document.addEventListener("keyup",s=>Ct.delete(s.code));window.addEventListener("blur",()=>{Ct.clear(),qs=!1,fh=!1});window.addEventListener("focus",()=>{fh=!0,Oo=performance.now()});document.addEventListener("visibilitychange",()=>{Ct.clear(),Oo=performance.now()});function ko(){let{width:s,height:e}=km();ds.aspect=s/e,ds.updateProjectionMatrix(),$r.dpr=devicePixelRatio,an.setPixelRatio(Math.min(lt?.game.started?1.25:1/0,$r.ratio(s,e))),an.setSize(s,e,!1),ei.resize(s,e)}window.addEventListener("resize",ko);window.visualViewport?.addEventListener("resize",ko);async function $y(){document.body.classList.add("loading"),Xe=await fetch(ni==="proposed"?new URL("./proposal-navigation.433ef4665f1e5739.json",import.meta.url):ni==="compact"?new URL("./proposal-compact-navigation.761912ccc9fedd93.json",import.meta.url):new URL("./navigation.8d80a66983989e77.json",import.meta.url)).then(p=>{if(!p.ok)throw Error("Navigation file missing");return p.json()}),Qe=new Bs(Xe),Hs=new ah(rn,Xe);let s=!1;try{s=Tm(localStorage)}catch{}if(Hs.setVisible(s),ae("street-context").checked=s,si.streetContext={...Hs.stats,enabled:s},No=hm(rn,[{name:"Kitchen daylight bounce",position:[2.15,6.4,1.55],range:4.2,intensity:1.65},{name:"Hall daylight bounce",position:[6.55,2.7,1.6],range:3.4,intensity:1.45},...Xe.proposalLights??[]],{budget:Ft.enabled?4:6}),ei.info.localBounceLights=No.info.budget,ei.info.roomFills=No.info,Xe.modelUpdatedAt){let p=new Date(Xe.modelUpdatedAt);ae("model-version").textContent="Updated "+new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",timeZone:"Europe/London"}).format(p),ae("model-version").title=p.toLocaleString("en-GB",{timeZone:"Europe/London"})+" \xB7 London time"}let e=new zc().setMeshoptDecoder(rm),t=await new Promise((p,x)=>e.load((ni==="proposed"?new URL("./proposal.a20af0b2391f256a.glb",import.meta.url):ni==="compact"?new URL("./proposal-compact.1e6363ed374446f6.glb",import.meta.url):new URL("./house.028a9ad346a277e3.glb",import.meta.url)).href,p,m=>{let g=m.total?Math.round(m.loaded/m.total*75):35;ae("progress").style.width=g+"%",ae("load-status").textContent="Loading model \xB7 "+g+"%"},x));ae("load-status").textContent="Preparing the rooms\u2026",ae("progress").style.width="85%",await new Promise(p=>setTimeout(p,20)),t.scene.updateMatrixWorld(!0);let i=new Set(Xe.hiddenObjects),n=am({cellSize:6,floorHeight:2.8,minMaterialTriangles:2e4,indexVertices:!1}),r=new Map;Fi=new Jc(rn,Xe.interactiveDoors);let a=new Set((Xe.proposalSite?.driveway_bay_bounds_m??[]).map(p=>p.id).filter(p=>Xe.life?.drive?.[p])),o=new Map;function l(p){let x=p.name;if(r.has(x))return r.get(x);let m=p.clone(),g=Xe.materials[x]||Xe.materials[x.replaceAll("_"," ")];return g&&(m.color.setRGB(...g.slice(0,3)),m.opacity=g[3]),m.side=Dt,/Mirror/i.test(x)?(m.transparent=!1,m.opacity=1,m.metalness=1,m.roughness=.06):(m.transparent||m.opacity<1||/Glazing|Glass/i.test(x))&&(m.transparent=!0,m.depthWrite=!1,m.transmission=0,m.roughness=.09,m.metalness=0,m.side=zi),_d(m,x),r.set(x,m),m}function c(p){for(let x=p;x;x=x.parent)if(i.has(x.userData.name||x.name))return!0;return!1}t.scene.traverse(p=>{if(!p.isMesh)return;si.sourceMeshes++;let x=Fi.owner(p);if(!x&&c(p)){si.hiddenMeshes++;return}let m=p.geometry.clone();m.applyMatrix4(p.matrixWorld),m.attributes.normal||m.computeVertexNormals();for(let b of Object.keys(m.attributes))["position","normal"].includes(b)||m.deleteAttribute(b);let g=Array.isArray(p.material)?p.material[0]:p.material,_=l(g);if(x){Fi.add(x,m,_);return}let M=/^Proposal \| Compact car (\w+)/.exec(p.userData.name||p.name);if(M&&a.has(M[1])){let b=o.get(M[1])??[];b.push({geometry:m,material:_}),o.set(M[1],b);return}n.add(m,_,p.userData.name||p.name)});let h=n.finish({disposeSources:!0});for(let p of h.meshes)rn.add(p);if(si.batches+=h.meshes.length,si.spatial=h.stats,Xe.approachSurface){let p=new Pi(Xe.approachSurface.polygon.map(([_,M])=>new ne(_,M))),x=new $i(p);x.rotateX(-Math.PI/2),x.translate(0,.012,0);let m=new Xt({color:6448225,roughness:.97,side:Dt});_d(m,"Tarmac");let g=new Ye(x,m);g.name="Gate roadside approach",g.receiveShadow=!0,rn.add(g),si.batches++}si.doorBatches=Fi.finish(),si.interactiveDoors=Fi.doors.length,si.batches+=si.doorBatches;{let p=new Map;for(let[x,m]of o){let g=(Xe.proposalSite?.cars??[]).find(b=>b.bay===x),_=Xe.obstacles.find(b=>b.name==="Proposal | Compact car "+x);if(!g||!_)continue;let M=Lm(m,_.box,g.heading_radians);rn.add(M),si.batches+=M.children.length,p.set(x,{group:M,obstacle:_})}ri=new hh(Xe,{scene:rn,doors:Fi,carTemplates:p,mobile:Ft.enabled});for(let[x,{group:m}]of p){let g=ri.cars.find(_=>_.id===x);g?g.apply():m.visible=!0}}si.geometryBytes=0;let u=new Set;rn.traverse(p=>{let x=p.geometry;if(!(!x||u.has(x))){u.add(x);for(let m of Object.values(x.attributes))si.geometryBytes+=m.array.byteLength;x.index&&(si.geometryBytes+=x.index.array.byteLength)}}),ei.updateShadows();{let p=new nh(Xe,{scene:rn,camera:ds,doors:Fi,mobile:Ft.enabled,isActive:()=>Zt&&!ht&&fh&&!document.hidden,onDeath:Yy,onArm:()=>{lt.clock.arm(Qe.position)&&(ei.setActionMode(!0),an.setPixelRatio(Math.min(devicePixelRatio,1.25)),ko(),lt.game.arm(Qe.position),lt.game.updateHUD(lt.clock))},onReset:()=>{lt?.clock.reset(),ei.setActionMode(!1),an.setPixelRatio(Math.min(devicePixelRatio,Ft.enabled?1.25:1.5)),ko()},toast:on});lt={clock:new $c(Xe),game:p,pursuit:p.horde}}let d=new Map;ae("rooms").replaceChildren();for(let p of Xe.rooms){if(!d.has(p.group)){let m=document.createElement("optgroup");m.label=p.group,d.set(p.group,m),ae("rooms").append(m)}let x=document.createElement("option");x.value=p.id,x.textContent=p.label,d.get(p.group).append(x)}ae("rooms").disabled=!1,Cn=!0,dh("arrival"),Om("people")&&Uo("people",!0,{persist:!1}),Om("cars")&&ri.cars.length&&Uo("cars",!0,{persist:!1});let f=Mm();if(f){let p=Sm(Qe,f);Qe.position=p.position,ht=f.flying===!0;let x=f.lastWalkingPosition;x&&["x","y","z"].every(m=>Number.isFinite(x[m]))&&(us=sh(Qe,x,us).position),Vm(),Ni=f.yaw,Rn=f.pitch,Fi.snap(Qe.position),ei.updateShadows(),qn(),ea(),p.moved&&on("Moved to "+(p.room??"a safe viewpoint")+" for this design."),f.active&&Ws(!1)}{let p=hs(ni),x=rh();ae("design-current").textContent=p?Kr[ni].label:"Original",ae("design-action").textContent=p?"\u21C4 View original":"\u21C4 View "+Kr[x].label.toLowerCase(),ae("design-switch").disabled=!1,ae("flight-toggle").disabled=!1,ae("design-switch").setAttribute("aria-label",p?"View original house":"View "+Kr[x].label);let m=p?Do(ni):Do(x);ae("variant-switch").textContent="\u21C4 "+Kr[m].label+(m==="compact"?" (compact)":" (full)"),ae("variant-switch").setAttribute("aria-label","View "+Kr[m].label),ae("variant-switch").disabled=!1}ae("start").disabled=!1,ae("drag").disabled=!1,ae("settings-toggle").disabled=!1,ae("start").textContent=ht?"Start flying":"Start walking",ae("load-status").textContent=ni==="proposed"?"Proposal A \xB7 New wing \xB7 Loft \xB7 Pool":ni==="compact"?"Proposal B \xB7 Compact new wing \xB7 Loft \xB7 Pool":"Start at the gates \xB7 Both floors \xB7 Garden",ae("progress").style.width="100%",document.body.classList.remove("loading"),window.walkthrough={ready:!0,stats:si,nav:Qe,data:Xe,doors:Fi,camera:ds,renderer:an,lighting:ei.info,touch:Ft,easter:lt,life:ri,setLife:Uo,goTo:dh,setFlying:ph,setStreetVisible:Wm,setView(p,x){Ft.reset(),Qe.position={x:p[0],y:p[1],z:p[2]},Gm(x),Fi.snap(Qe.position)&&ei.updateShadows(),qn(),ea()},getState(){return{...Qe.position,yaw:Ni,pitch:Rn,active:Zt,flying:ht,room:Ld(),streetContext:Xe.streetContext.enabled,calls:an.info.render.calls}},startDrag:()=>Ws(!1)}}function Xm(s){requestAnimationFrame(Xm);let e=Math.max(0,(s-Oo)/1e3),t=Math.min(e,.04);if(Oo=s,Cn){let i=Zt&&!document.hidden&&(!lt?.game.started||fh);if(i&&$r.sample(e*1e3,s)&&(ko(),ei.info.renderScale=$r.scale),i||$r.reset(),i){let a=Number(Ct.has("KeyW")||Ct.has("ArrowUp"))-Number(Ct.has("KeyS")||Ct.has("ArrowDown"))+Ft.axes.forward,o=Number(Ct.has("KeyD")||Ct.has("ArrowRight"))-Number(Ct.has("KeyA")||Ct.has("ArrowLeft"))+Ft.axes.right;if(ht){let l=Number(Ct.has("KeyE"))-Number(Ct.has("KeyQ"))+[...uh.values()].reduce((c,h)=>c+h,0);Qe.position=Rd(Xe,Qe.position,{forward:a,right:o,vertical:l,yaw:Ni,pitch:Rn,fast:Ct.has("ShiftLeft")||Ct.has("ShiftRight")||Ft.sprinting,dt:t})}else{let l=Math.max(1,Math.hypot(a,o)),c=(Ct.has("ShiftLeft")||Ct.has("ShiftRight")||Ft.sprinting?3.2:lt?.game.started?2.15:1.65)*t/l,h=(-Math.sin(Ni)*a+Math.cos(Ni)*o)*c,u=(Math.cos(Ni)*a+Math.sin(Ni)*o)*c;for(let[d,f]of[[h,0],[0,u]]){let p={...Qe.position};Qe.move(d,f),lt?.game.horde.blocks(Qe.position,Qe.radius)&&(Qe.position=p)}}qn()}lt&&(lt.clock.advance(e,i&&!ht,Qe.position)&&lt.game.startWave(Qe.position),i&&!ht&&lt.clock.phase!=="caught"?(lt.game.step(t,Qe.position,lt.clock),lt.clock.phase==="chasing"&&s-Nm>120&&(ei.updateShadows(),Nm=s)):lt.game.cancelFire());let n=ri&&!document.hidden&&ri.step(t,Qe.position),r=[...lt?.clock.phase==="chasing"?lt.pursuit.positions:[],...n?ri.visitorPositions:[]];Fi.update(Qe.position,t,!1,r)?ei.updateShadows():n&&s-Um>(Ft.enabled?350:200)&&(ei.updateShadows(),Um=s),s-Fm>160&&(ea(),lt?.clock.phase==="chasing"&&(ae("chase-time").textContent=(i?"Keep moving":"Paused")+" \xB7 "+Ky(lt.clock.survived)),Fm=s)}No&&No.update(ds,s),ei.render()}$y().catch(s=>{console.error(s),ae("start").textContent="Try again",ae("start").disabled=!1,ae("start").onclick=()=>location.reload(),ae("load-status").textContent="The house could not load. Check your connection and try again.",ae("progress").style.width="0"});requestAnimationFrame(Xm);
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
