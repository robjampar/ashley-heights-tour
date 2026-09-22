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
var ip=0,wu=1,np=2;var Ns=1,sp=2,Or=3,Hi=0,ni=1,Rt=2,zt=0,kr=1,Eu=2,Tu=3,Au=4,ac=5;var Vi=100,rp=101,ap=102,op=103,lp=104,Fs=200,cp=201,hp=202,up=203,Ru=204,Cu=205,ho=206,dp=207,uo=208,fp=209,pp=210,mp=211,gp=212,bp=213,xp=214,Il=0,Dl=1,Ll=2,gr=3,Nl=4,Fl=5,Ul=6,Ol=7,Pu=0,vp=1,yp=2,sn=0,fo=1,po=2,mo=3,go=4,bo=5,Us=6,xo=7,lu="attached",_p="detached",Iu=300,ls=301,Os=302,oc=303,lc=304,vo=306,ci=1e3,zi=1001,br=1002,Dt=1003,cc=1004;var ks=1005;var kt=1006,Br=1007;var rn=1008;var di=1009,Du=1010,Lu=1011,zr=1012,hc=1013,an=1014,Fi=1015,Yt=1016,uc=1017,dc=1018,cs=1020,Nu=35902,Fu=35899,Uu=1021,Ou=1022,Mi=1023,gn=1026,En=1027,fc=1028,pc=1029,hs=1030,mc=1031;var gc=1033,yo=33776,_o=33777,Mo=33778,So=33779,bc=35840,xc=35841,vc=35842,yc=35843,_c=36196,Mc=37492,Sc=37496,wc=37488,Ec=37489,wo=37490,Tc=37491,Ac=37808,Rc=37809,Cc=37810,Pc=37811,Ic=37812,Dc=37813,Lc=37814,Nc=37815,Fc=37816,Uc=37817,Oc=37818,kc=37819,Bc=37820,zc=37821,Gc=36492,Hc=36494,Vc=36495,Wc=36283,qc=36284,Eo=36285,Xc=36286;var Ms=2300,Ss=2301,Rl=2302,cu=2303,hu=2400,uu=2401,du=2402,Mp=2500;var ku=0,To=1,Gr=2,Sp=3200;var Ao=0,wp=1,Xn="",It="srgb",xi="srgb-linear",Ra="linear",mt="srgb";var Cl=7680;var Ep=519,Tp=512,Ap=513,Rp=514,jc=515,Cp=516,Pp=517,Kc=518,Ip=519,Bu=35044;var zu="300 es",Qi=2e3,xr=2001;function xg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function vg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function vr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Dp(){let s=vr("canvas");return s.style.display="block",s}var cf={},yr=null;function Ca(...s){let e="THREE."+s.shift();yr?yr("log",e,...s):console.log(e,...s)}function Lp(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function ke(...s){s=Lp(s);let e="THREE."+s.shift();if(yr)yr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Xe(...s){s=Lp(s);let e="THREE."+s.shift();if(yr)yr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function _s(...s){let e=s.join(" ");e in cf||(cf[e]=!0,ke(...s))}function Np(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Fp={[Il]:Dl,[Ll]:Ul,[Nl]:Ol,[gr]:Fl,[Dl]:Il,[Ul]:Ll,[Ol]:Nl,[Fl]:gr},bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let n=i[e];if(n!==void 0){let r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}},oi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hf=1234567,wa=Math.PI/180,ws=180/Math.PI;function Gi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(oi[s&255]+oi[s>>8&255]+oi[s>>16&255]+oi[s>>24&255]+"-"+oi[e&255]+oi[e>>8&255]+"-"+oi[e>>16&15|64]+oi[e>>24&255]+"-"+oi[t&63|128]+oi[t>>8&255]+"-"+oi[t>>16&255]+oi[t>>24&255]+oi[i&255]+oi[i>>8&255]+oi[i>>16&255]+oi[i>>24&255]).toLowerCase()}function at(s,e,t){return Math.max(e,Math.min(t,s))}function Gu(s,e){return(s%e+e)%e}function yg(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function _g(s,e,t){return s!==e?(t-s)/(e-s):0}function Ea(s,e,t){return(1-t)*s+t*e}function Mg(s,e,t,i){return Ea(s,e,1-Math.exp(-t*i))}function Sg(s,e=1){return e-Math.abs(Gu(s,e*2)-e)}function wg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Eg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Tg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ag(s,e){return s+Math.random()*(e-s)}function Rg(s){return s*(.5-Math.random())}function Cg(s){s!==void 0&&(hf=s);let e=hf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pg(s){return s*wa}function Ig(s){return s*ws}function Dg(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Lg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ng(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Fg(s,e,t,i,n){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),g=a((i-e)/2);switch(n){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function $i(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Bs={DEG2RAD:wa,RAD2DEG:ws,generateUUID:Gi,clamp:at,euclideanModulo:Gu,mapLinear:yg,inverseLerp:_g,lerp:Ea,damp:Mg,pingpong:Sg,smoothstep:wg,smootherstep:Eg,randInt:Tg,randFloat:Ag,randFloatSpread:Rg,seededRandom:Cg,degToRad:Pg,radToDeg:Ig,isPowerOfTwo:Dg,ceilPowerOfTwo:Lg,floorPowerOfTwo:Ng,setQuaternionFromProperEuler:Fg,normalize:vt,denormalize:$i},ne=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(at(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(at(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},vi=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3],d=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(u!==y||l!==d||c!==f||h!==g){let p=l*d+c*f+h*g+u*y;p<0&&(d=-d,f=-f,g=-g,y=-y,p=-p);let m=1-o;if(p<.9995){let _=Math.acos(p),S=Math.sin(_);m=Math.sin(m*_)/S,o=Math.sin(o*_)/S,l=l*m+d*o,c=c*m+f*o,h=h*m+g*o,u=u*m+y*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+g*o,u=u*m+y*o;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),d=l(i/2),f=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>u){let f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(at(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(at(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Nh.copy(this).projectOnVector(e),this.sub(Nh)}reflect(e){return this.sub(Nh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(at(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nh=new N,uf=new vi,$e=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],y=n[0],p=n[3],m=n[6],_=n[1],S=n[4],x=n[7],M=n[2],v=n[5],A=n[8];return r[0]=a*y+o*_+l*M,r[3]=a*p+o*S+l*v,r[6]=a*m+o*x+l*A,r[1]=c*y+h*_+u*M,r[4]=c*p+h*S+u*v,r[7]=c*m+h*x+u*A,r[2]=d*y+f*_+g*M,r[5]=d*p+f*S+g*v,r[8]=d*m+f*x+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+i*d+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=u*y,e[1]=(n*c-h*i)*y,e[2]=(o*i-n*a)*y,e[3]=d*y,e[4]=(h*t-n*l)*y,e[5]=(n*r-o*t)*y,e[6]=f*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return _s("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Fh.makeScale(e,t)),this}rotate(e){return _s("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Fh.makeRotation(-e)),this}translate(e,t){return _s("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Fh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fh=new $e,df=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ff=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ug(){let s={enabled:!0,workingColorSpace:xi,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(n.r=kn(n.r),n.g=kn(n.g),n.b=kn(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(n.r=mr(n.r),n.g=mr(n.g),n.b=mr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Xn?Ra:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return _s("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return _s("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[xi]:{primaries:e,whitePoint:i,transfer:Ra,toXYZ:df,fromXYZ:ff,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:df,fromXYZ:ff,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),s}var tt=Ug();function kn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function mr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Zs,kl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Zs===void 0&&(Zs=vr("canvas")),Zs.width=e.width,Zs.height=e.height;let n=Zs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Zs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=vr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(kn(t[i]/255)*255):t[i]=kn(t[i]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Og=0,_r=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=Gi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Uh(n[a].image)):r.push(Uh(n[a]))}else r=Uh(n);i.url=r}return t||(e.images[this.uuid]=i),i}};function Uh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?kl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var kg=0,Oh=new N,Xt=class s extends bn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,i=zi,n=zi,r=kt,a=rn,o=Mi,l=di,c=s.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=Gi(),this.name="",this.source=new _r(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Oh).x}get height(){return this.source.getSize(Oh).y}get depth(){return this.source.getSize(Oh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Iu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ci:e.x=e.x-Math.floor(e.x);break;case zi:e.x=e.x<0?0:1;break;case br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ci:e.y=e.y-Math.floor(e.y);break;case zi:e.y=e.y<0?0:1;break;case br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Iu;Xt.DEFAULT_ANISOTROPY=1;var yt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],y=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(c+1)/2,x=(f+1)/2,M=(m+1)/2,v=(h+d)/4,A=(u+y)/4,b=(g+p)/4;return S>x&&S>M?S<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(S),n=v/i,r=A/i):x>M?x<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(x),i=v/n,r=b/n):M<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(M),i=A/r,n=b/r),this.set(i,n,r,t),this}let _=Math.sqrt((p-g)*(p-g)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(u-y)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this.w=at(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this.w=at(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(at(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bl=class extends bn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let n={width:e,height:t,depth:i.depth},r=new Xt(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new _r(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bt=class extends Bl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Pa=class extends Xt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var zl=class extends Xt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Be=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,i,n,r,a,o,l,c,h,u,d,f,g,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,h,u,d,f,g,y,p)}set(e,t,i,n,r,a,o,l,c,h,u,d,f,g,y,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=n,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,n=1/$s.setFromMatrixColumn(e,0).length(),r=1/$s.setFromMatrixColumn(e,1).length(),a=1/$s.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,y=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-y*c,t[9]=-o*l,t[2]=y-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,y=c*u;t[0]=d+y*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=y+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,y=c*u;t[0]=d-y*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=y-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,y=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+y,t[1]=l*u,t[5]=y*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*h,t[4]=y-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-y*u}else if(e.order==="XZY"){let d=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+y,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bg,e,zg)}lookAt(e,t,i){let n=this.elements;return Ii.subVectors(e,t),Ii.lengthSq()===0&&(Ii.z=1),Ii.normalize(),$n.crossVectors(i,Ii),$n.lengthSq()===0&&(Math.abs(i.z)===1?Ii.x+=1e-4:Ii.z+=1e-4,Ii.normalize(),$n.crossVectors(i,Ii)),$n.normalize(),$o.crossVectors(Ii,$n),n[0]=$n.x,n[4]=$o.x,n[8]=Ii.x,n[1]=$n.y,n[5]=$o.y,n[9]=Ii.y,n[2]=$n.z,n[6]=$o.z,n[10]=Ii.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],y=i[6],p=i[10],m=i[14],_=i[3],S=i[7],x=i[11],M=i[15],v=n[0],A=n[4],b=n[8],w=n[12],T=n[1],C=n[5],D=n[9],P=n[13],I=n[2],F=n[6],H=n[10],V=n[14],ee=n[3],G=n[7],K=n[11],j=n[15];return r[0]=a*v+o*T+l*I+c*ee,r[4]=a*A+o*C+l*F+c*G,r[8]=a*b+o*D+l*H+c*K,r[12]=a*w+o*P+l*V+c*j,r[1]=h*v+u*T+d*I+f*ee,r[5]=h*A+u*C+d*F+f*G,r[9]=h*b+u*D+d*H+f*K,r[13]=h*w+u*P+d*V+f*j,r[2]=g*v+y*T+p*I+m*ee,r[6]=g*A+y*C+p*F+m*G,r[10]=g*b+y*D+p*H+m*K,r[14]=g*w+y*P+p*V+m*j,r[3]=_*v+S*T+x*I+M*ee,r[7]=_*A+S*C+x*F+M*G,r[11]=_*b+S*D+x*H+M*K,r[15]=_*w+S*P+x*V+M*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],y=e[7],p=e[11],m=e[15],_=l*f-c*d,S=o*f-c*u,x=o*d-l*u,M=a*f-c*h,v=a*d-l*h,A=a*u-o*h;return t*(y*_-p*S+m*x)-i*(g*_-p*M+m*v)+n*(g*S-y*M+m*A)-r*(g*x-y*v+p*A)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],y=e[13],p=e[14],m=e[15],_=t*o-i*a,S=t*l-n*a,x=t*c-r*a,M=i*l-n*o,v=i*c-r*o,A=n*c-r*l,b=h*y-u*g,w=h*p-d*g,T=h*m-f*g,C=u*p-d*y,D=u*m-f*y,P=d*m-f*p,I=_*P-S*D+x*C+M*T-v*w+A*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/I;return e[0]=(o*P-l*D+c*C)*F,e[1]=(n*D-i*P-r*C)*F,e[2]=(y*A-p*v+m*M)*F,e[3]=(d*v-u*A-f*M)*F,e[4]=(l*T-a*P-c*w)*F,e[5]=(t*P-n*T+r*w)*F,e[6]=(p*x-g*A-m*S)*F,e[7]=(h*A-d*x+f*S)*F,e[8]=(a*D-o*T+c*b)*F,e[9]=(i*T-t*D-r*b)*F,e[10]=(g*v-y*x+m*_)*F,e[11]=(u*x-h*v-f*_)*F,e[12]=(o*w-a*C-l*b)*F,e[13]=(t*C-i*w+n*b)*F,e[14]=(y*S-g*M-p*_)*F,e[15]=(h*M-u*S+d*_)*F,this}scale(e){let t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,y=a*h,p=a*u,m=o*u,_=l*c,S=l*h,x=l*u,M=i.x,v=i.y,A=i.z;return n[0]=(1-(y+m))*M,n[1]=(f+x)*M,n[2]=(g-S)*M,n[3]=0,n[4]=(f-x)*v,n[5]=(1-(d+m))*v,n[6]=(p+_)*v,n[7]=0,n[8]=(g+S)*A,n[9]=(p-_)*A,n[10]=(1-(d+y))*A,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=$s.set(n[0],n[1],n[2]).length(),o=$s.set(n[4],n[5],n[6]).length(),l=$s.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Ki.copy(this);let c=1/a,h=1/o,u=1/l;return Ki.elements[0]*=c,Ki.elements[1]*=c,Ki.elements[2]*=c,Ki.elements[4]*=h,Ki.elements[5]*=h,Ki.elements[6]*=h,Ki.elements[8]*=u,Ki.elements[9]*=u,Ki.elements[10]*=u,t.setFromRotationMatrix(Ki),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,n,r,a,o=Qi,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(i-n),d=(t+e)/(t-e),f=(i+n)/(i-n),g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===Qi)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===xr)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=Qi,l=!1){let c=this.elements,h=2/(t-e),u=2/(i-n),d=-(t+e)/(t-e),f=-(i+n)/(i-n),g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===Qi)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===xr)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},$s=new N,Ki=new Be,Bg=new N(0,0,0),zg=new N(1,1,1),$n=new N,$o=new N,Ii=new N,pf=new Be,mf=new vi,en=class s{constructor(e=0,t=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(at(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-at(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(at(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-at(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(at(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-at(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return pf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mf.setFromEuler(this),this.setFromQuaternion(mf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};en.DEFAULT_ORDER="XYZ";var Mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Gg=0,gf=new N,Qs=new vi,In=new Be,Qo=new N,da=new N,Hg=new N,Vg=new vi,bf=new N(1,0,0),xf=new N(0,1,0),vf=new N(0,0,1),yf={type:"added"},Wg={type:"removed"},er={type:"childadded",child:null},kh={type:"childremoved",child:null},St=class s extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new N,t=new en,i=new vi,n=new N(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Be},normalMatrix:{value:new $e}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qs.setFromAxisAngle(e,t),this.quaternion.multiply(Qs),this}rotateOnWorldAxis(e,t){return Qs.setFromAxisAngle(e,t),this.quaternion.premultiply(Qs),this}rotateX(e){return this.rotateOnAxis(bf,e)}rotateY(e){return this.rotateOnAxis(xf,e)}rotateZ(e){return this.rotateOnAxis(vf,e)}translateOnAxis(e,t){return gf.copy(e).applyQuaternion(this.quaternion),this.position.add(gf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bf,e)}translateY(e){return this.translateOnAxis(xf,e)}translateZ(e){return this.translateOnAxis(vf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Qo.copy(e):Qo.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),da.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(da,Qo,this.up):In.lookAt(Qo,da,this.up),this.quaternion.setFromRotationMatrix(In),n&&(In.extractRotation(n.matrixWorld),Qs.setFromRotationMatrix(In),this.quaternion.premultiply(Qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yf),er.child=e,this.dispatchEvent(er),er.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wg),kh.child=e,this.dispatchEvent(kh),kh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yf),er.child=e,this.dispatchEvent(er),er.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,e,Hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,Vg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};St.DEFAULT_UP=new N(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var it=class extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}},qg={type:"move"},Sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new it,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new it,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new it,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let p=t.getJointPose(y,i),m=this._getHandJoint(c,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qg)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new it;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Up={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},el={h:0,s:0,l:0};function Bh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var ze=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=tt.workingColorSpace){if(e=Gu(e,1),t=at(t,0,1),i=at(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Bh(a,r,e+1/3),this.g=Bh(a,r,e),this.b=Bh(a,r,e-1/3)}return tt.colorSpaceToWorking(this,n),this}setStyle(e,t=It){function i(r){r!==void 0&&parseFloat(r)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){let i=Up[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return tt.workingToColorSpace(li.copy(this),e),Math.round(at(li.r*255,0,255))*65536+Math.round(at(li.g*255,0,255))*256+Math.round(at(li.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(li.copy(this),t);let i=li.r,n=li.g,r=li.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(li.copy(this),t),e.r=li.r,e.g=li.g,e.b=li.b,e}getStyle(e=It){tt.workingToColorSpace(li.copy(this),e);let t=li.r,i=li.g,n=li.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(el);let i=Ea(Qn.h,el.h,t),n=Ea(Qn.s,el.s,t),r=Ea(Qn.l,el.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},li=new ze;ze.NAMES=Up;var Es=class extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Yi=new N,Dn=new N,zh=new N,Ln=new N,tr=new N,ir=new N,_f=new N,Gh=new N,Hh=new N,Vh=new N,Wh=new yt,qh=new yt,Xh=new yt,On=class s{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Yi.subVectors(e,t),n.cross(Yi);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Yi.subVectors(n,t),Dn.subVectors(i,t),zh.subVectors(e,t);let a=Yi.dot(Yi),o=Yi.dot(Dn),l=Yi.dot(zh),c=Dn.dot(Dn),h=Dn.dot(zh),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(a,Ln.y),l.addScaledVector(o,Ln.z),l)}static getInterpolatedAttribute(e,t,i,n,r,a){return Wh.setScalar(0),qh.setScalar(0),Xh.setScalar(0),Wh.fromBufferAttribute(e,t),qh.fromBufferAttribute(e,i),Xh.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(Wh,r.x),a.addScaledVector(qh,r.y),a.addScaledVector(Xh,r.z),a}static isFrontFacing(e,t,i,n){return Yi.subVectors(i,t),Dn.subVectors(e,t),Yi.cross(Dn).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yi.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),Yi.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return s.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,r=this.c,a,o;tr.subVectors(n,i),ir.subVectors(r,i),Gh.subVectors(e,i);let l=tr.dot(Gh),c=ir.dot(Gh);if(l<=0&&c<=0)return t.copy(i);Hh.subVectors(e,n);let h=tr.dot(Hh),u=ir.dot(Hh);if(h>=0&&u<=h)return t.copy(n);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(tr,a);Vh.subVectors(e,r);let f=tr.dot(Vh),g=ir.dot(Vh);if(g>=0&&f<=g)return t.copy(r);let y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(ir,o);let p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return _f.subVectors(r,n),o=(u-h)/(u-h+(f-g)),t.copy(n).addScaledVector(_f,o);let m=1/(p+y+d);return a=y*m,o=d*m,t.copy(i).addScaledVector(tr,a).addScaledVector(ir,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ft=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ji.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ji.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ji.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ji):Ji.fromBufferAttribute(r,a),Ji.applyMatrix4(e.matrixWorld),this.expandByPoint(Ji);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),tl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tl.copy(i.boundingBox)),tl.applyMatrix4(e.matrixWorld),this.union(tl)}let n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ji),Ji.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fa),il.subVectors(this.max,fa),nr.subVectors(e.a,fa),sr.subVectors(e.b,fa),rr.subVectors(e.c,fa),es.subVectors(sr,nr),ts.subVectors(rr,sr),bs.subVectors(nr,rr);let t=[0,-es.z,es.y,0,-ts.z,ts.y,0,-bs.z,bs.y,es.z,0,-es.x,ts.z,0,-ts.x,bs.z,0,-bs.x,-es.y,es.x,0,-ts.y,ts.x,0,-bs.y,bs.x,0];return!jh(t,nr,sr,rr,il)||(t=[1,0,0,0,1,0,0,0,1],!jh(t,nr,sr,rr,il))?!1:(nl.crossVectors(es,ts),t=[nl.x,nl.y,nl.z],jh(t,nr,sr,rr,il))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ji).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ji).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Nn=[new N,new N,new N,new N,new N,new N,new N,new N],Ji=new N,tl=new Ft,nr=new N,sr=new N,rr=new N,es=new N,ts=new N,bs=new N,fa=new N,il=new N,nl=new N,xs=new N;function jh(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){xs.fromArray(s,r);let o=n.x*Math.abs(xs.x)+n.y*Math.abs(xs.y)+n.z*Math.abs(xs.z),l=e.dot(xs),c=t.dot(xs),h=i.dot(xs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Wt=new N,sl=new ne,Xg=0,Mt=class extends bn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Bu,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)sl.fromBufferAttribute(this,t),sl.applyMatrix3(e),this.setXY(t,sl.x,sl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=$i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ia=class extends Mt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Da=class extends Mt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ke=class extends Mt{constructor(e,t,i){super(new Float32Array(e),t,i)}},jg=new Ft,pa=new N,Kh=new N,hi=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):jg.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pa.subVectors(e,this.center);let t=pa.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(pa,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pa.copy(e.center).add(Kh)),this.expandByPoint(pa.copy(e.center).sub(Kh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Kg=0,Bi=new Be,Yh=new St,ar=new N,Di=new Ft,ma=new Ft,ei=new N,nt=class s extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xg(e)?Da:Ia)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $e().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Bi.makeRotationFromQuaternion(e),this.applyMatrix4(Bi),this}rotateX(e){return Bi.makeRotationX(e),this.applyMatrix4(Bi),this}rotateY(e){return Bi.makeRotationY(e),this.applyMatrix4(Bi),this}rotateZ(e){return Bi.makeRotationZ(e),this.applyMatrix4(Bi),this}translate(e,t,i){return Bi.makeTranslation(e,t,i),this.applyMatrix4(Bi),this}scale(e,t,i){return Bi.makeScale(e,t,i),this.applyMatrix4(Bi),this}lookAt(e){return Yh.lookAt(e),Yh.updateMatrix(),this.applyMatrix4(Yh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,r=e.length;n<r;n++){let a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ke(i,3))}else{let i=Math.min(e.length,t.count);for(let n=0;n<i;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ft);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let r=t[i];Di.setFromBufferAttribute(r),this.morphTargetsRelative?(ei.addVectors(this.boundingBox.min,Di.min),this.boundingBox.expandByPoint(ei),ei.addVectors(this.boundingBox.max,Di.max),this.boundingBox.expandByPoint(ei)):(this.boundingBox.expandByPoint(Di.min),this.boundingBox.expandByPoint(Di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(Di.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ma.setFromBufferAttribute(o),this.morphTargetsRelative?(ei.addVectors(Di.min,ma.min),Di.expandByPoint(ei),ei.addVectors(Di.max,ma.max),Di.expandByPoint(ei)):(Di.expandByPoint(ma.min),Di.expandByPoint(ma.max))}Di.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)ei.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(ei));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ei.fromBufferAttribute(o,c),l&&(ar.fromBufferAttribute(e,c),ei.add(ar)),n=Math.max(n,i.distanceToSquared(ei))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,n=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Mt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let b=0;b<i.count;b++)o[b]=new N,l[b]=new N;let c=new N,h=new N,u=new N,d=new ne,f=new ne,g=new ne,y=new N,p=new N;function m(b,w,T){c.fromBufferAttribute(i,b),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,T),d.fromBufferAttribute(r,b),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,T),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),o[b].add(y),o[w].add(y),o[T].add(y),l[b].add(p),l[w].add(p),l[T].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let b=0,w=_.length;b<w;++b){let T=_[b],C=T.start,D=T.count;for(let P=C,I=C+D;P<I;P+=3)m(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let S=new N,x=new N,M=new N,v=new N;function A(b){M.fromBufferAttribute(n,b),v.copy(M);let w=o[b];S.copy(w),S.sub(M.multiplyScalar(M.dot(w))).normalize(),x.crossVectors(v,w);let C=x.dot(l[b])<0?-1:1;a.setXYZW(b,S.x,S.y,S.z,C)}for(let b=0,w=_.length;b<w;++b){let T=_[b],C=T.start,D=T.count;for(let P=C,I=C+D;P<I;P+=3)A(e.getX(P+0)),A(e.getX(P+1)),A(e.getX(P+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let n=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,u=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),y=e.getX(d+1),p=e.getX(d+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ei.fromBufferAttribute(e,t),ei.normalize(),e.setXYZ(t,ei.x,ei.y,ei.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new Mt(d,h,u)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let n=e.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ts=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bu,this.updateRanges=[],this.version=0,this.uuid=Gi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},bi=new N,ss=class s{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)bi.fromBufferAttribute(this,t),bi.applyMatrix4(e),this.setXYZ(t,bi.x,bi.y,bi.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bi.fromBufferAttribute(this,t),bi.applyNormalMatrix(e),this.setXYZ(t,bi.x,bi.y,bi.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bi.fromBufferAttribute(this,t),bi.transformDirection(e),this.setXYZ(t,bi.x,bi.y,bi.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=$i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=$i(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=$i(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=$i(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=$i(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ca("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ca("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Jh=new N,Yg=new N,Jg=new $e,Zi=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=Jh.subVectors(i,t).cross(Yg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let n=e.delta(Jh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Jg.getNormalMatrix(e),n=this.coplanarPoint(Jh).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Zg=0,ui=class extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=kr,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ru,this.blendDst=Cu,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ep,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cl,this.stencilZFail=Cl,this.stencilZPass=Cl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Zi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ne().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},wr=class extends ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},or,ga=new N,lr=new N,cr=new N,hr=new ne,ba=new ne,Op=new Be,rl=new N,xa=new N,al=new N,Mf=new ne,Zh=new ne,Sf=new ne,La=class extends St{constructor(e=new wr){if(super(),this.isSprite=!0,this.type="Sprite",or===void 0){or=new nt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ts(t,5);or.setIndex([0,1,2,0,2,3]),or.setAttribute("position",new ss(i,3,0,!1)),or.setAttribute("uv",new ss(i,2,3,!1))}this.geometry=or,this.material=e,this.center=new ne(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Xe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),lr.setFromMatrixScale(this.matrixWorld),Op.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),cr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&lr.multiplyScalar(-cr.z);let i=this.material.rotation,n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));let a=this.center;ol(rl.set(-.5,-.5,0),cr,a,lr,n,r),ol(xa.set(.5,-.5,0),cr,a,lr,n,r),ol(al.set(.5,.5,0),cr,a,lr,n,r),Mf.set(0,0),Zh.set(1,0),Sf.set(1,1);let o=e.ray.intersectTriangle(rl,xa,al,!1,ga);if(o===null&&(ol(xa.set(-.5,.5,0),cr,a,lr,n,r),Zh.set(0,1),o=e.ray.intersectTriangle(rl,al,xa,!1,ga),o===null))return;let l=e.ray.origin.distanceTo(ga);l<e.near||l>e.far||t.push({distance:l,point:ga.clone(),uv:On.getInterpolation(ga,rl,xa,al,Mf,Zh,Sf,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ol(s,e,t,i,n,r){hr.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(ba.x=r*hr.x-n*hr.y,ba.y=n*hr.x+r*hr.y):ba.copy(hr),s.copy(e),s.x+=ba.x,s.y+=ba.y,s.applyMatrix4(Op)}var Fn=new N,$h=new N,ll=new N,cl=new N,rs=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){$h.copy(e).add(t).multiplyScalar(.5),ll.copy(t).sub(e).normalize(),cl.copy(this.origin).sub($h);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ll),o=cl.dot(this.direction),l=-cl.dot(ll),c=cl.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let y=1/h;u*=y,d*=y,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy($h).addScaledVector(ll,d),f}intersectSphere(e,t){if(e.radius<0)return null;Fn.subVectors(e.center,this.origin);let i=Fn.dot(this.direction),n=Fn.dot(Fn)-i*i,r=e.radius*e.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,g=t.x-a.x,y=t.y-a.y,p=t.z-a.z,m=i.x-a.x,_=i.y-a.y,S=i.z-a.z,x=Math.abs(l),M=Math.abs(c),v=Math.abs(h),A,b,w,T,C,D,P,I,F,H,V,ee;if(x>=M&&x>=v?(w=l,D=u,F=g,ee=m,l>=0?(A=c,b=h,T=d,C=f,P=y,I=p,H=_,V=S):(A=h,b=c,T=f,C=d,P=p,I=y,H=S,V=_)):M>=v?(w=c,D=d,F=y,ee=_,c>=0?(A=h,b=l,T=f,C=u,P=p,I=g,H=S,V=m):(A=l,b=h,T=u,C=f,P=g,I=p,H=m,V=S)):(w=h,D=f,F=p,ee=S,h>=0?(A=l,b=c,T=u,C=d,P=g,I=y,H=m,V=_):(A=c,b=l,T=d,C=u,P=y,I=g,H=_,V=m)),w===0)return null;let G=A/w,K=b/w,j=1/w,me=T-G*D,he=C-K*D,Le=P-G*F,ve=I-K*F,Ne=H-G*ee,Y=V-K*ee,B=Ne*ve-Y*Le,$=me*Y-he*Ne,fe=Le*he-ve*me;if(n){if(B<0||$<0||fe<0)return null}else if((B<0||$<0||fe<0)&&(B>0||$>0||fe>0))return null;let oe=B+$+fe;if(oe===0)return null;let Ce=j*(B*D+$*F+fe*ee);return(oe>0?Ce<0:Ce>0)?null:this.at(Ce/oe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},yi=class extends ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Pu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},wf=new Be,vs=new rs,hl=new hi,Ef=new N,ul=new N,dl=new N,fl=new N,Qh=new N,pl=new N,Tf=new N,ml=new N,Ze=class extends St{constructor(e=new nt,t=new yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let o=this.morphTargetInfluences;if(r&&o){pl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Qh.fromBufferAttribute(u,e),a?pl.addScaledVector(Qh,h):pl.addScaledVector(Qh.sub(t),h))}t.add(pl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hl.copy(i.boundingSphere),hl.applyMatrix4(r),vs.copy(e.ray).recast(e.near),!(hl.containsPoint(vs.origin)===!1&&(vs.intersectSphere(hl,Ef)===null||vs.origin.distanceToSquared(Ef)>(e.far-e.near)**2))&&(wf.copy(r).invert(),vs.copy(e.ray).applyMatrix4(wf),!(i.boundingBox!==null&&vs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vs)))}_computeIntersections(e,t,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=d.length;g<y;g++){let p=d[g],m=a[p.materialIndex],_=Math.max(p.start,f.start),S=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let x=_,M=S;x<M;x+=3){let v=o.getX(x),A=o.getX(x+1),b=o.getX(x+2);n=gl(this,m,e,i,c,h,u,v,A,b),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{let g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){let _=o.getX(p),S=o.getX(p+1),x=o.getX(p+2);n=gl(this,a,e,i,c,h,u,_,S,x),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=d.length;g<y;g++){let p=d[g],m=a[p.materialIndex],_=Math.max(p.start,f.start),S=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let x=_,M=S;x<M;x+=3){let v=x,A=x+1,b=x+2;n=gl(this,m,e,i,c,h,u,v,A,b),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{let g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){let _=p,S=p+1,x=p+2;n=gl(this,a,e,i,c,h,u,_,S,x),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}}};function $g(s,e,t,i,n,r,a,o){let l;if(e.side===ni?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===Hi,o),l===null)return null;ml.copy(o),ml.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(ml);return c<t.near||c>t.far?null:{distance:c,point:ml.clone(),object:s}}function gl(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,ul),s.getVertexPosition(l,dl),s.getVertexPosition(c,fl);let h=$g(s,e,t,i,ul,dl,fl,Tf);if(h){let u=new N;On.getBarycoord(Tf,ul,dl,fl,u),n&&(h.uv=On.getInterpolatedAttribute(n,o,l,c,u,new ne)),r&&(h.uv1=On.getInterpolatedAttribute(r,o,l,c,u,new ne)),a&&(h.normal=On.getInterpolatedAttribute(a,o,l,c,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new N,materialIndex:0};On.getNormal(ul,dl,fl,d.normal),h.face=d,h.barycoord=u}return h}var va=new yt,Af=new yt,Rf=new yt,Qg=new yt,Cf=new Be,bl=new N,eu=new hi,Pf=new Be,tu=new rs,Na=class extends Ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=lu,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ft),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,bl),this.boundingBox.expandByPoint(bl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hi),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,bl),this.boundingSphere.expandByPoint(bl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),eu.copy(this.boundingSphere),eu.applyMatrix4(n),e.ray.intersectsSphere(eu)!==!1&&(Pf.copy(n).invert(),tu.copy(e.ray).applyMatrix4(Pf),!(this.boundingBox!==null&&tu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,tu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===lu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_p?this.bindMatrixInverse.copy(this.bindMatrix).invert():ke("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,n=this.geometry;Af.fromBufferAttribute(n.attributes.skinIndex,e),Rf.fromBufferAttribute(n.attributes.skinWeight,e),t.isVector4?(va.copy(t),t.set(0,0,0,0)):(va.set(...t,1),t.set(0,0,0)),va.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Rf.getComponent(r);if(a!==0){let o=Af.getComponent(r);Cf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Qg.copy(va).applyMatrix4(Cf),a)}}return t.isVector4&&(t.w=va.w),t.applyMatrix4(this.bindMatrixInverse)}},Er=class extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}},xn=class extends Xt{constructor(e=null,t=1,i=1,n,r,a,o,l,c=Dt,h=Dt,u,d){super(null,a,o,l,c,h,n,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},If=new Be,e0=new Be,Fa=class s{constructor(e=[],t=[]){this.uuid=Gi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ke("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new Be;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:e0;If.multiplyMatrices(o,t[r]),If.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new xn(t,e,e,Mi,Fi);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){let r=e.bones[i],a=t[r];a===void 0&&(ke("Skeleton: No bone found with UUID:",r),a=new Er),this.bones.push(a),this.boneInverses.push(new Be().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let n=0,r=t.length;n<r;n++){let a=t[n];e.bones.push(a.uuid);let o=i[n];e.boneInverses.push(o.toArray())}return e}},Bn=class extends Mt{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ur=new Be,Df=new Be,xl=[],Lf=new Ft,t0=new Be,ya=new Ze,_a=new hi,Ua=class extends Ze{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bn(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,t0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ft),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ur),Lf.copy(e.boundingBox).applyMatrix4(ur),this.boundingBox.union(Lf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ur),_a.copy(e.boundingSphere).applyMatrix4(ur),this.boundingSphere.union(_a)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(e,t){let i=this.matrixWorld,n=this.count;if(ya.geometry=this.geometry,ya.material=this.material,ya.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_a.copy(this.boundingSphere),_a.applyMatrix4(i),e.ray.intersectsSphere(_a)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,ur),Df.multiplyMatrices(i,ur),ya.matrixWorld=Df,ya.raycast(e,xl);for(let a=0,o=xl.length;a<o;a++){let l=xl[a];l.instanceId=r,l.object=this,t.push(l)}xl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new xn(new Float32Array(n*this.count),n,this.count,fc,Fi));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ys=new hi,i0=new ne(.5,.5),vl=new N,vn=class{constructor(e=new Zi,t=new Zi,i=new Zi,n=new Zi,r=new Zi,a=new Zi){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qi,i=!1){let n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],y=r[9],p=r[10],m=r[11],_=r[12],S=r[13],x=r[14],M=r[15];if(n[0].setComponents(c-a,f-h,m-g,M-_).normalize(),n[1].setComponents(c+a,f+h,m+g,M+_).normalize(),n[2].setComponents(c+o,f+u,m+y,M+S).normalize(),n[3].setComponents(c-o,f-u,m-y,M-S).normalize(),i)n[4].setComponents(l,d,p,x).normalize(),n[5].setComponents(c-l,f-d,m-p,M-x).normalize();else if(n[4].setComponents(c-l,f-d,m-p,M-x).normalize(),t===Qi)n[5].setComponents(c+l,f+d,m+p,M+x).normalize();else if(t===xr)n[5].setComponents(l,d,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ys)}intersectsSprite(e){ys.center.set(0,0,0);let t=i0.distanceTo(e.center);return ys.radius=.7071067811865476+t,ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(ys)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(vl.x=n.normal.x>0?e.max.x:e.min.x,vl.y=n.normal.y>0?e.max.y:e.min.y,vl.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(vl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yn=class extends ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Gl=new N,Hl=new N,Nf=new Be,Ma=new rs,yl=new hi,iu=new N,Ff=new N,tn=class extends St{constructor(e=new nt,t=new yn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Gl.fromBufferAttribute(t,n-1),Hl.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Gl.distanceTo(Hl);e.setAttribute("lineDistance",new Ke(i,1))}else ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yl.copy(i.boundingSphere),yl.applyMatrix4(n),yl.radius+=r,e.ray.intersectsSphere(yl)===!1)return;Nf.copy(n).invert(),Ma.copy(e.ray).applyMatrix4(Nf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=f,p=g-1;y<p;y+=c){let m=h.getX(y),_=h.getX(y+1),S=_l(this,e,Ma,l,m,_,y);S&&t.push(S)}if(this.isLineLoop){let y=h.getX(g-1),p=h.getX(f),m=_l(this,e,Ma,l,y,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let y=f,p=g-1;y<p;y+=c){let m=_l(this,e,Ma,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=_l(this,e,Ma,l,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function _l(s,e,t,i,n,r,a){let o=s.geometry.attributes.position;if(Gl.fromBufferAttribute(o,n),Hl.fromBufferAttribute(o,r),t.distanceSqToSegment(Gl,Hl,iu,Ff)>i)return;iu.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(iu);if(!(c<e.near||c>e.far))return{distance:c,point:Ff.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Uf=new N,Of=new N,Oa=class extends tn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)Uf.fromBufferAttribute(t,n),Of.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Uf.distanceTo(Of);e.setAttribute("lineDistance",new Ke(i,1))}else ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ka=class extends tn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Tr=class extends ui{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},kf=new Be,fu=new rs,Ml=new hi,Sl=new N,Ba=class extends St{constructor(e=new nt,t=new Tr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ml.copy(i.boundingSphere),Ml.applyMatrix4(n),Ml.radius+=r,e.ray.intersectsSphere(Ml)===!1)return;kf.copy(n).invert(),fu.copy(e.ray).applyMatrix4(kf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,y=f;g<y;g++){let p=c.getX(g);Sl.fromBufferAttribute(u,p),Bf(Sl,p,l,n,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,y=f;g<y;g++)Sl.fromBufferAttribute(u,g),Bf(Sl,g,l,n,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Bf(s,e,t,i,n,r,a){let o=fu.distanceSqToPoint(s);if(o<t){let l=new N;fu.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var za=class extends Xt{constructor(e=[],t=ls,i,n,r,a,o,l,c,h){super(e,t,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ar=class extends Xt{constructor(e,t,i,n,r,a,o,l,c){super(e,t,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var _n=class extends Xt{constructor(e,t,i=an,n,r,a,o=Dt,l=Dt,c,h=gn,u=1){if(h!==gn&&h!==En)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _r(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Vl=class extends _n{constructor(e,t=an,i=ls,n,r,a=Dt,o=Dt,l,c=gn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,n,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ga=class extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gt=class s extends nt{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(u,2));function g(y,p,m,_,S,x,M,v,A,b,w){let T=x/A,C=M/b,D=x/2,P=M/2,I=v/2,F=A+1,H=b+1,V=0,ee=0,G=new N;for(let K=0;K<H;K++){let j=K*C-P;for(let me=0;me<F;me++){let he=me*T-D;G[y]=he*_,G[p]=j*S,G[m]=I,c.push(G.x,G.y,G.z),G[y]=0,G[p]=0,G[m]=v>0?1:-1,h.push(G.x,G.y,G.z),u.push(me/A),u.push(1-K/b),V+=1}}for(let K=0;K<b;K++)for(let j=0;j<A;j++){let me=d+j+F*K,he=d+j+F*(K+1),Le=d+(j+1)+F*(K+1),ve=d+(j+1)+F*K;l.push(me,he,ve),l.push(he,Le,ve),ee+=6}o.addGroup(f,ee,w),f+=ee,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},zn=class s extends nt{constructor(e=1,t=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:n,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,g=i*2+r,y=n+1,p=new N,m=new N;for(let _=0;_<=g;_++){let S=0,x=0,M=0,v=0;if(_<=i){let w=_/i,T=w*Math.PI/2;x=-h-e*Math.cos(T),M=e*Math.sin(T),v=-e*Math.cos(T),S=w*u}else if(_<=i+r){let w=(_-i)/r;x=-h+w*t,M=e,v=0,S=u+w*d}else{let w=(_-i-r)/i,T=w*Math.PI/2;x=h+e*Math.sin(T),M=e*Math.cos(T),v=e*Math.sin(T),S=u+d+w*u}let A=Math.max(0,Math.min(1,S/f)),b=0;_===0?b=.5/n:_===g&&(b=-.5/n);for(let w=0;w<=n;w++){let T=w/n,C=T*Math.PI*2,D=Math.sin(C),P=Math.cos(C);m.x=-M*P,m.y=x,m.z=M*D,o.push(m.x,m.y,m.z),p.set(-M*P,v,M*D),p.normalize(),l.push(p.x,p.y,p.z),c.push(T+b,A)}if(_>0){let w=(_-1)*y;for(let T=0;T<n;T++){let C=w+T,D=w+T+1,P=_*y+T,I=_*y+T+1;a.push(C,D,P),a.push(D,I,P)}}}this.setIndex(a),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Rr=class s extends nt{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new N,h=new ne;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=i+u/t*n;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ke(a,3)),this.setAttribute("normal",new Ke(o,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},jt=class s extends nt{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,y=[],p=i/2,m=0;_(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Ke(u,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(f,2));function _(){let x=new N,M=new N,v=0,A=(t-e)/i;for(let b=0;b<=r;b++){let w=[],T=b/r,C=T*(t-e)+e;for(let D=0;D<=n;D++){let P=D/n,I=P*l+o,F=Math.sin(I),H=Math.cos(I);M.x=C*F,M.y=-T*i+p,M.z=C*H,u.push(M.x,M.y,M.z),x.set(F,A,H).normalize(),d.push(x.x,x.y,x.z),f.push(P,1-T),w.push(g++)}y.push(w)}for(let b=0;b<n;b++)for(let w=0;w<r;w++){let T=y[w][b],C=y[w+1][b],D=y[w+1][b+1],P=y[w][b+1];(e>0||w!==0)&&(h.push(T,C,P),v+=3),(t>0||w!==r-1)&&(h.push(C,D,P),v+=3)}c.addGroup(m,v,0),m+=v}function S(x){let M=g,v=new ne,A=new N,b=0,w=x===!0?e:t,T=x===!0?1:-1;for(let D=1;D<=n;D++)u.push(0,p*T,0),d.push(0,T,0),f.push(.5,.5),g++;let C=g;for(let D=0;D<=n;D++){let I=D/n*l+o,F=Math.cos(I),H=Math.sin(I);A.x=w*H,A.y=p*T,A.z=w*F,u.push(A.x,A.y,A.z),d.push(0,T,0),v.x=F*.5+.5,v.y=H*.5*T+.5,f.push(v.x,v.y),g++}for(let D=0;D<n;D++){let P=M+D,I=C+D;x===!0?h.push(I,I+1,P):h.push(I+1,I,P),b+=3}c.addGroup(m,b,x===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},As=class s extends jt{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Wl=class s extends nt{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};let r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new Ke(r,3)),this.setAttribute("normal",new Ke(r.slice(),3)),this.setAttribute("uv",new Ke(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let S=new N,x=new N,M=new N;for(let v=0;v<t.length;v+=3)f(t[v+0],S),f(t[v+1],x),f(t[v+2],M),l(S,x,M,_)}function l(_,S,x,M){let v=M+1,A=[];for(let b=0;b<=v;b++){A[b]=[];let w=_.clone().lerp(x,b/v),T=S.clone().lerp(x,b/v),C=v-b;for(let D=0;D<=C;D++)D===0&&b===v?A[b][D]=w:A[b][D]=w.clone().lerp(T,D/C)}for(let b=0;b<v;b++)for(let w=0;w<2*(v-b)-1;w++){let T=Math.floor(w/2);w%2===0?(d(A[b][T+1]),d(A[b+1][T]),d(A[b][T])):(d(A[b][T+1]),d(A[b+1][T+1]),d(A[b+1][T]))}}function c(_){let S=new N;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(_),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){let _=new N;for(let S=0;S<r.length;S+=3){_.x=r[S+0],_.y=r[S+1],_.z=r[S+2];let x=p(_)/2/Math.PI+.5,M=m(_)/Math.PI+.5;a.push(x,1-M)}g(),u()}function u(){for(let _=0;_<a.length;_+=6){let S=a[_+0],x=a[_+2],M=a[_+4],v=Math.max(S,x,M),A=Math.min(S,x,M);v>.9&&A<.1&&(S<.2&&(a[_+0]+=1),x<.2&&(a[_+2]+=1),M<.2&&(a[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,S){let x=_*3;S.x=e[x+0],S.y=e[x+1],S.z=e[x+2]}function g(){let _=new N,S=new N,x=new N,M=new N,v=new ne,A=new ne,b=new ne;for(let w=0,T=0;w<r.length;w+=9,T+=6){_.set(r[w+0],r[w+1],r[w+2]),S.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),v.set(a[T+0],a[T+1]),A.set(a[T+2],a[T+3]),b.set(a[T+4],a[T+5]),M.copy(_).add(S).add(x).divideScalar(3);let C=p(M);y(v,T+0,_,C),y(A,T+2,S,C),y(b,T+4,x,C)}}function y(_,S,x,M){M<0&&_.x===1&&(a[S]=_.x-1),x.x===0&&x.z===0&&(a[S]=M/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}};var Li=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),n=0,r=i.length,a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);let h=i[n],d=i[n+1]-h,f=(a-h)/d;return(n+f)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);let a=this.getPoint(n),o=this.getPoint(r),l=t||(a.isVector2?new ne:new N);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new N,n=[],r=[],a=[],o=new N,l=new Be;for(let f=0;f<=e;f++){let g=f/e;n[f]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(at(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(n[f],r[f])}if(t===!0){let f=Math.acos(at(r[0].dot(r[e]),-1,1));f/=e,n[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),a[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Cr=class extends Li{constructor(e=0,t=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){let i=t,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ql=class extends Cr{constructor(e,t,i,n,r,a){super(e,t,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Hu(){let s=0,e=0,t=0,i=0;function n(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,n(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+i*o}}}var zf=new N,Gf=new N,nu=new Hu,su=new Hu,ru=new Hu,Pr=class extends Li{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new N){let i=t,n=this.points,r=n.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(Gf.subVectors(n[0],n[1]).add(n[0]),c=Gf);let u=n[o%r],d=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(zf.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=zf),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),g<1e-4&&(g=y),p<1e-4&&(p=y),nu.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,y,p),su.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,y,p),ru.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,y,p)}else this.curveType==="catmullrom"&&(nu.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),su.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ru.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(nu.calc(l),su.calc(l),ru.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new N().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Hf(s,e,t,i,n){let r=(i-e)*.5,a=(n-t)*.5,o=s*s,l=s*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*s+t}function n0(s,e){let t=1-s;return t*t*e}function s0(s,e){return 2*(1-s)*s*e}function r0(s,e){return s*s*e}function Ta(s,e,t,i){return n0(s,e)+s0(s,t)+r0(s,i)}function a0(s,e){let t=1-s;return t*t*t*e}function o0(s,e){let t=1-s;return 3*t*t*s*e}function l0(s,e){return 3*(1-s)*s*s*e}function c0(s,e){return s*s*s*e}function Aa(s,e,t,i,n){return a0(s,e)+o0(s,t)+l0(s,i)+c0(s,n)}var Ha=class extends Li{constructor(e=new ne,t=new ne,i=new ne,n=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new ne){let i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Aa(e,n.x,r.x,a.x,o.x),Aa(e,n.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xl=class extends Li{constructor(e=new N,t=new N,i=new N,n=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new N){let i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Aa(e,n.x,r.x,a.x,o.x),Aa(e,n.y,r.y,a.y,o.y),Aa(e,n.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Va=class extends Li{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jl=class extends Li{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wa=class extends Li{constructor(e=new ne,t=new ne,i=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ne){let i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(Ta(e,n.x,r.x,a.x),Ta(e,n.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qa=class extends Li{constructor(e=new N,t=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new N){let i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(Ta(e,n.x,r.x,a.x),Ta(e,n.y,r.y,a.y),Ta(e,n.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xa=class extends Li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let i=t,n=this.points,r=(n.length-1)*e,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],u=n[a>n.length-3?n.length-1:a+2];return i.set(Hf(o,l.x,c.x,h.x,u.x),Hf(o,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new ne().fromArray(n))}return this}},Kl=Object.freeze({__proto__:null,ArcCurve:ql,CatmullRomCurve3:Pr,CubicBezierCurve:Ha,CubicBezierCurve3:Xl,EllipseCurve:Cr,LineCurve:Va,LineCurve3:jl,QuadraticBezierCurve:Wa,QuadraticBezierCurve3:qa,SplineCurve:Xa}),Yl=class extends Li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kl[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),n=this.getCurveLengths(),r=0;for(;r<n.length;){if(n[r]>=i){let a=n[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let n=0,r=this.curves;n<r.length;n++){let a=r[n],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(new Kl[n.type]().fromJSON(n))}return this}},Rs=class extends Yl{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Va(this.currentPoint.clone(),new ne(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){let r=new Wa(this.currentPoint.clone(),new ne(e,t),new ne(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,a){let o=new Ha(this.currentPoint.clone(),new ne(e,t),new ne(i,n),new ne(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Xa(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,n,r,a),this}absarc(e,t,i,n,r,a){return this.absellipse(e,t,i,i,n,r,a),this}ellipse(e,t,i,n,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,n,r,a,o,l),this}absellipse(e,t,i,n,r,a,o,l){let c=new Cr(e,t,i,n,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ni=class extends Rs{constructor(e){super(e),this.uuid=Gi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(new Rs().fromJSON(n))}return this}};function h0(s,e,t=2){let i=e&&e.length,n=i?e[0]*t:s.length,r=kp(s,0,n,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=m0(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,u=l;for(let d=t;d<n;d+=t){let f=s[d],g=s[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return ja(r,a,t,o,l,c,0),a}function kp(s,e,t,i,n){let r;if(n===T0(s,e,t,i)>0)for(let a=e;a<t;a+=i)r=Vf(a/i|0,s[a],s[a+1],r);else for(let a=t-i;a>=e;a-=i)r=Vf(a/i|0,s[a],s[a+1],r);return r&&Ir(r,r.next)&&(Ya(r),r=r.next),r}function Cs(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(Ir(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Ya(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ja(s,e,t,i,n,r,a){if(!s)return;!a&&r&&y0(s,i,n,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?d0(s,i,n,r):u0(s)){e.push(l.i,s.i,c.i),Ya(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=f0(Cs(s),e),ja(s,e,t,i,n,r,2)):a===2&&p0(s,e,t,i,n,r):ja(Cs(s),e,t,i,n,r,1);break}}}function u0(s){let e=s.prev,t=s,i=s.next;if(Nt(e,t,i)>=0)return!1;let n=e.x,r=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=Math.min(n,r,a),u=Math.min(o,l,c),d=Math.max(n,r,a),f=Math.max(o,l,c),g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Sa(n,o,r,l,a,c,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function d0(s,e,t,i){let n=s.prev,r=s,a=s.next;if(Nt(n,r,a)>=0)return!1;let o=n.x,l=r.x,c=a.x,h=n.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),y=Math.max(o,l,c),p=Math.max(h,u,d),m=pu(f,g,e,t,i),_=pu(y,p,e,t,i),S=s.prevZ,x=s.nextZ;for(;S&&S.z>=m&&x&&x.z<=_;){if(S.x>=f&&S.x<=y&&S.y>=g&&S.y<=p&&S!==n&&S!==a&&Sa(o,h,l,u,c,d,S.x,S.y)&&Nt(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=f&&x.x<=y&&x.y>=g&&x.y<=p&&x!==n&&x!==a&&Sa(o,h,l,u,c,d,x.x,x.y)&&Nt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=m;){if(S.x>=f&&S.x<=y&&S.y>=g&&S.y<=p&&S!==n&&S!==a&&Sa(o,h,l,u,c,d,S.x,S.y)&&Nt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=p&&x!==n&&x!==a&&Sa(o,h,l,u,c,d,x.x,x.y)&&Nt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function f0(s,e){let t=s;do{let i=t.prev,n=t.next.next;!Ir(i,n)&&zp(i,t,t.next,n)&&Ka(i,n)&&Ka(n,i)&&(e.push(i.i,t.i,n.i),Ya(t),Ya(t.next),t=s=n),t=t.next}while(t!==s);return Cs(t)}function p0(s,e,t,i,n,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&S0(a,o)){let l=Gp(a,o);a=Cs(a,a.next),l=Cs(l,l.next),ja(a,e,t,i,n,r,0),ja(l,e,t,i,n,r,0);return}o=o.next}a=a.next}while(a!==s)}function m0(s,e,t,i){let n=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*i,l=r<a-1?e[r+1]*i:s.length,c=kp(s,o,l,i,!1);c===c.next&&(c.steiner=!0),n.push(M0(c))}n.sort(g0);for(let r=0;r<n.length;r++)t=b0(n[r],t);return t}function g0(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let i=(s.next.y-s.y)/(s.next.x-s.x),n=(e.next.y-e.y)/(e.next.x-e.x);t=i-n}return t}function b0(s,e){let t=x0(s,e);if(!t)return e;let i=Gp(t,s);return Cs(i,i.next),Cs(t,t.next)}function x0(s,e){let t=e,i=s.x,n=s.y,r=-1/0,a;if(Ir(s,t))return t;do{if(Ir(s,t.next))return t.next;if(n<=t.y&&n>=t.next.y&&t.next.y!==t.y){let u=t.x+(n-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===i))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Bp(n<c?i:r,n,l,c,n<c?r:i,n,t.x,t.y)){let u=Math.abs(n-t.y)/(i-t.x);Ka(t,s)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&v0(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function v0(s,e){return Nt(s.prev,s,e.prev)<0&&Nt(e.next,s,s.next)<0}function y0(s,e,t,i){let n=s;do n.z===0&&(n.z=pu(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,_0(n)}function _0(s){let e,t=1;do{let i=s,n;s=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(n=i,i=i.nextZ,o--):(n=a,a=a.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;i=a}r.nextZ=null,t*=2}while(e>1);return s}function pu(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function M0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Bp(s,e,t,i,n,r,a,o){return(n-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(n-a)*(i-o)}function Sa(s,e,t,i,n,r,a,o){return!(s===a&&e===o)&&Bp(s,e,t,i,n,r,a,o)}function S0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!w0(s,e)&&(Ka(s,e)&&Ka(e,s)&&E0(s,e)&&(Nt(s.prev,s,e.prev)||Nt(s,e.prev,e))||Ir(s,e)&&Nt(s.prev,s,s.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Ir(s,e){return s.x===e.x&&s.y===e.y}function zp(s,e,t,i){let n=El(Nt(s,e,t)),r=El(Nt(s,e,i)),a=El(Nt(t,i,s)),o=El(Nt(t,i,e));return!!(n!==r&&a!==o||n===0&&wl(s,t,e)||r===0&&wl(s,i,e)||a===0&&wl(t,s,i)||o===0&&wl(t,e,i))}function wl(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function El(s){return s>0?1:s<0?-1:0}function w0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&zp(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Ka(s,e){return Nt(s.prev,s,s.next)<0?Nt(s,e,s.next)>=0&&Nt(s,s.prev,e)>=0:Nt(s,e,s.prev)<0||Nt(s,s.next,e)<0}function E0(s,e){let t=s,i=!1,n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function Gp(s,e){let t=mu(s.i,s.x,s.y),i=mu(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Vf(s,e,t,i){let n=mu(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Ya(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function mu(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function T0(s,e,t,i){let n=0;for(let r=e,a=t-i;r<t;r+=i)n+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return n}var gu=class{static triangulate(e,t,i=2){return h0(e,t,i)}},pn=class s{static area(e){let t=e.length,i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let i=[],n=[],r=[];Wf(e),qf(i,e);let a=e.length;t.forEach(Wf);for(let l=0;l<t.length;l++)n.push(a),a+=t[l].length,qf(i,t[l]);let o=gu.triangulate(i,n);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Wf(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function qf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Dr=class s extends nt{constructor(e=new Ni([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,n=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new Ke(n,3)),this.setAttribute("uv",new Ke(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:A0,S,x=!1,M,v,A,b;if(m){S=m.getSpacedPoints(h),x=!0,d=!1;let te=m.isCatmullRomCurve3?m.closed:!1;M=m.computeFrenetFrames(h,te),v=new N,A=new N,b=new N}d||(p=0,f=0,g=0,y=0);let w=o.extractPoints(c),T=w.shape,C=w.holes;if(!pn.isClockWise(T)){T=T.reverse();for(let te=0,le=C.length;te<le;te++){let ue=C[te];pn.isClockWise(ue)&&(C[te]=ue.reverse())}}function P(te){let ue=10000000000000001e-36,ce=te[0];for(let pe=1;pe<=te.length;pe++){let We=pe%te.length,Ge=te[We],qe=Ge.x-ce.x,Ye=Ge.y-ce.y,U=qe*qe+Ye*Ye,dt=Math.max(Math.abs(Ge.x),Math.abs(Ge.y),Math.abs(ce.x),Math.abs(ce.y)),et=ue*dt*dt;if(U<=et){te.splice(We,1),pe--;continue}ce=Ge}}P(T),C.forEach(P);let I=C.length,F=T;for(let te=0;te<I;te++){let le=C[te];T=T.concat(le)}function H(te,le,ue){return le||Xe("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(le,ue)}let V=T.length;function ee(te,le,ue){let ce,pe,We,Ge=te.x-le.x,qe=te.y-le.y,Ye=ue.x-te.x,U=ue.y-te.y,dt=Ge*Ge+qe*qe,et=Ge*U-qe*Ye;if(Math.abs(et)>Number.EPSILON){let L=Math.sqrt(dt),E=Math.sqrt(Ye*Ye+U*U),z=le.x-qe/L,W=le.y+Ge/L,Z=ue.x-U/E,de=ue.y+Ye/E,ge=((Z-z)*U-(de-W)*Ye)/(Ge*U-qe*Ye);ce=z+Ge*ge-te.x,pe=W+qe*ge-te.y;let Q=ce*ce+pe*pe;if(Q<=2)return new ne(ce,pe);We=Math.sqrt(Q/2)}else{let L=!1;Ge>Number.EPSILON?Ye>Number.EPSILON&&(L=!0):Ge<-Number.EPSILON?Ye<-Number.EPSILON&&(L=!0):Math.sign(qe)===Math.sign(U)&&(L=!0),L?(ce=-qe,pe=Ge,We=Math.sqrt(dt)):(ce=Ge,pe=qe,We=Math.sqrt(dt/2))}return new ne(ce/We,pe/We)}let G=[];for(let te=0,le=F.length,ue=le-1,ce=te+1;te<le;te++,ue++,ce++)ue===le&&(ue=0),ce===le&&(ce=0),G[te]=ee(F[te],F[ue],F[ce]);let K=[],j,me=G.concat();for(let te=0,le=I;te<le;te++){let ue=C[te];j=[];for(let ce=0,pe=ue.length,We=pe-1,Ge=ce+1;ce<pe;ce++,We++,Ge++)We===pe&&(We=0),Ge===pe&&(Ge=0),j[ce]=ee(ue[ce],ue[We],ue[Ge]);K.push(j),me=me.concat(j)}let he;if(p===0)he=pn.triangulateShape(F,C);else{let te=[],le=[];for(let ue=0;ue<p;ue++){let ce=ue/p,pe=f*Math.cos(ce*Math.PI/2),We=g*Math.sin(ce*Math.PI/2)+y;for(let Ge=0,qe=F.length;Ge<qe;Ge++){let Ye=H(F[Ge],G[Ge],We);$(Ye.x,Ye.y,-pe),ce===0&&te.push(Ye)}for(let Ge=0,qe=I;Ge<qe;Ge++){let Ye=C[Ge];j=K[Ge];let U=[];for(let dt=0,et=Ye.length;dt<et;dt++){let L=H(Ye[dt],j[dt],We);$(L.x,L.y,-pe),ce===0&&U.push(L)}ce===0&&le.push(U)}}he=pn.triangulateShape(te,le)}let Le=he.length,ve=g+y;for(let te=0;te<V;te++){let le=d?H(T[te],me[te],ve):T[te];x?(A.copy(M.normals[0]).multiplyScalar(le.x),v.copy(M.binormals[0]).multiplyScalar(le.y),b.copy(S[0]).add(A).add(v),$(b.x,b.y,b.z)):$(le.x,le.y,0)}for(let te=1;te<=h;te++)for(let le=0;le<V;le++){let ue=d?H(T[le],me[le],ve):T[le];x?(A.copy(M.normals[te]).multiplyScalar(ue.x),v.copy(M.binormals[te]).multiplyScalar(ue.y),b.copy(S[te]).add(A).add(v),$(b.x,b.y,b.z)):$(ue.x,ue.y,u/h*te)}for(let te=p-1;te>=0;te--){let le=te/p,ue=f*Math.cos(le*Math.PI/2),ce=g*Math.sin(le*Math.PI/2)+y;for(let pe=0,We=F.length;pe<We;pe++){let Ge=H(F[pe],G[pe],ce);$(Ge.x,Ge.y,u+ue)}for(let pe=0,We=C.length;pe<We;pe++){let Ge=C[pe];j=K[pe];for(let qe=0,Ye=Ge.length;qe<Ye;qe++){let U=H(Ge[qe],j[qe],ce);x?$(U.x,U.y+S[h-1].y,S[h-1].x+ue):$(U.x,U.y,u+ue)}}}Ne(),Y();function Ne(){let te=n.length/3;if(d){let le=0,ue=V*le;for(let ce=0;ce<Le;ce++){let pe=he[ce];fe(pe[2]+ue,pe[1]+ue,pe[0]+ue)}le=h+p*2,ue=V*le;for(let ce=0;ce<Le;ce++){let pe=he[ce];fe(pe[0]+ue,pe[1]+ue,pe[2]+ue)}}else{for(let le=0;le<Le;le++){let ue=he[le];fe(ue[2],ue[1],ue[0])}for(let le=0;le<Le;le++){let ue=he[le];fe(ue[0]+V*h,ue[1]+V*h,ue[2]+V*h)}}i.addGroup(te,n.length/3-te,0)}function Y(){let te=n.length/3,le=0;B(F,le),le+=F.length;for(let ue=0,ce=C.length;ue<ce;ue++){let pe=C[ue];B(pe,le),le+=pe.length}i.addGroup(te,n.length/3-te,1)}function B(te,le){let ue=te.length;for(;--ue>=0;){let ce=ue,pe=ue-1;pe<0&&(pe=te.length-1);for(let We=0,Ge=h+p*2;We<Ge;We++){let qe=V*We,Ye=V*(We+1),U=le+ce+qe,dt=le+pe+qe,et=le+pe+Ye,L=le+ce+Ye;oe(U,dt,et,L)}}}function $(te,le,ue){l.push(te),l.push(le),l.push(ue)}function fe(te,le,ue){Ce(te),Ce(le),Ce(ue);let ce=n.length/3,pe=_.generateTopUV(i,n,ce-3,ce-2,ce-1);Qe(pe[0]),Qe(pe[1]),Qe(pe[2])}function oe(te,le,ue,ce){Ce(te),Ce(le),Ce(ce),Ce(le),Ce(ue),Ce(ce);let pe=n.length/3,We=_.generateSideWallUV(i,n,pe-6,pe-3,pe-2,pe-1);Qe(We[0]),Qe(We[1]),Qe(We[3]),Qe(We[1]),Qe(We[2]),Qe(We[3])}function Ce(te){n.push(l[te*3+0]),n.push(l[te*3+1]),n.push(l[te*3+2])}function Qe(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return R0(t,i,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];i.push(o)}let n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new Kl[n.type]().fromJSON(n)),new s(i,e.options)}},A0={generateTopUV:function(s,e,t,i,n){let r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[n*3],h=e[n*3+1];return[new ne(r,a),new ne(o,l),new ne(c,h)]},generateSideWallUV:function(s,e,t,i,n,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[n*3],f=e[n*3+1],g=e[n*3+2],y=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-u),new ne(d,1-g),new ne(y,1-m)]:[new ne(o,1-l),new ne(h,1-u),new ne(f,1-g),new ne(p,1-m)]}};function R0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){let r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ja=class s extends Wl{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Za=class s extends nt{constructor(e=[new ne(0,-.5),new ne(.5,0),new ne(0,.5)],t=12,i=0,n=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:n},t=Math.floor(t),n=at(n,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/t,u=new N,d=new ne,f=new N,g=new N,y=new N,p=0,m=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:p=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-p,f.z=m*0,y.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:p=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),l.push(f.x,f.y,f.z),y.copy(g)}for(let _=0;_<=t;_++){let S=i+_*h*n,x=Math.sin(S),M=Math.cos(S);for(let v=0;v<=e.length-1;v++){u.x=e[v].x*x,u.y=e[v].y,u.z=e[v].x*M,a.push(u.x,u.y,u.z),d.x=_/t,d.y=v/(e.length-1),o.push(d.x,d.y);let A=l[3*v+0]*x,b=l[3*v+1],w=l[3*v+0]*M;c.push(A,b,w)}}for(let _=0;_<t;_++)for(let S=0;S<e.length-1;S++){let x=S+_*e.length,M=x,v=x+e.length,A=x+e.length+1,b=x+1;r.push(M,v,b),r.push(A,b,v)}this.setIndex(r),this.setAttribute("position",new Ke(a,3)),this.setAttribute("uv",new Ke(o,2)),this.setAttribute("normal",new Ke(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}};var $a=class s extends nt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],y=[],p=[];for(let m=0;m<h;m++){let _=m*d-a;for(let S=0;S<c;S++){let x=S*u-r;g.push(x,-_,0),y.push(0,0,1),p.push(S/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){let S=_+c*m,x=_+c*(m+1),M=_+1+c*(m+1),v=_+1+c*m;f.push(S,x,v),f.push(x,M,v)}this.setIndex(f),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(y,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var nn=class s extends nt{constructor(e=new Ni([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],n=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Ke(n,3)),this.setAttribute("normal",new Ke(r,3)),this.setAttribute("uv",new Ke(a,2));function c(h){let u=n.length/3,d=h.extractPoints(t),f=d.shape,g=d.holes;pn.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){let _=g[p];pn.isClockWise(_)===!0&&(g[p]=_.reverse())}let y=pn.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){let _=g[p];f=f.concat(_)}for(let p=0,m=f.length;p<m;p++){let _=f[p];n.push(_.x,_.y,0),r.push(0,0,1),a.push(_.x,_.y)}for(let p=0,m=y.length;p<m;p++){let _=y[p],S=_[0]+u,x=_[1]+u,M=_[2]+u;i.push(S,x,M),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return C0(t,e)}static fromJSON(e,t){let i=[];for(let n=0,r=e.shapes.length;n<r;n++){let a=t[e.shapes[n]];i.push(a)}return new s(i,e.curveSegments)}};function C0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,i=s.length;t<i;t++){let n=s[t];e.shapes.push(n.uuid)}else e.shapes.push(s.uuid);return e}var Ps=class s extends nt{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new N,d=new N,f=[],g=[],y=[],p=[];for(let m=0;m<=i;m++){let _=[],S=m/i,x=a+S*o,M=e*Math.cos(x),v=Math.sqrt(e*e-M*M),A=0;m===0&&a===0?A=.5/t:m===i&&l===Math.PI&&(A=-.5/t);for(let b=0;b<=t;b++){let w=b/t,T=n+w*r;u.x=-v*Math.cos(T),u.y=M,u.z=v*Math.sin(T),g.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),p.push(w+A,1-S),_.push(c++)}h.push(_)}for(let m=0;m<i;m++)for(let _=0;_<t;_++){let S=h[m][_+1],x=h[m][_],M=h[m+1][_],v=h[m+1][_+1];(m!==0||a>0)&&f.push(S,x,v),(m!==i-1||l<Math.PI)&&f.push(x,M,v)}this.setIndex(f),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(y,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var _i=class s extends nt{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],u=[],d=new N,f=new N,g=new N;for(let y=0;y<=i;y++){let p=a+y/i*o;for(let m=0;m<=n;m++){let _=m/n*r;f.x=(e+t*Math.cos(p))*Math.cos(_),f.y=(e+t*Math.cos(p))*Math.sin(_),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(m/n),u.push(y/i)}}for(let y=1;y<=i;y++)for(let p=1;p<=n;p++){let m=(n+1)*y+p-1,_=(n+1)*(y-1)+p-1,S=(n+1)*(y-1)+p,x=(n+1)*y+p;l.push(m,_,x),l.push(_,S,x)}this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Qa=class s extends nt{constructor(e=new qa(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,l=new N,c=new ne,h=new N,u=[],d=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new Ke(u,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(f,2));function y(){for(let S=0;S<t;S++)p(S);p(r===!1?t:0),_(),m()}function p(S){h=e.getPointAt(S/t,h);let x=a.normals[S],M=a.binormals[S];for(let v=0;v<=n;v++){let A=v/n*Math.PI*2,b=Math.sin(A),w=-Math.cos(A);l.x=w*x.x+b*M.x,l.y=w*x.y+b*M.y,l.z=w*x.z+b*M.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let S=1;S<=t;S++)for(let x=1;x<=n;x++){let M=(n+1)*(S-1)+(x-1),v=(n+1)*S+(x-1),A=(n+1)*S+x,b=(n+1)*(S-1)+x;g.push(M,v,b),g.push(v,A,b)}}function _(){for(let S=0;S<=t;S++)for(let x=0;x<=n;x++)c.x=S/t,c.y=x/n,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Kl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function zs(s){let e={};for(let t in s){e[t]={};for(let i in s[t]){let n=s[t][i];if(Xf(n))n.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Xf(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();e[t][i]=r}else e[t][i]=n.slice();else e[t][i]=n}}return e}function fi(s){let e={};for(let t=0;t<s.length;t++){let i=zs(s[t]);for(let n in i)e[n]=i[n]}return e}function Xf(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function P0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Vu(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}var Ti={clone:zs,merge:fi},I0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,D0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=I0,this.fragmentShader=D0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=P0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new ze().setHex(n.value);break;case"v2":this.uniforms[i].value=new ne().fromArray(n.value);break;case"v3":this.uniforms[i].value=new N().fromArray(n.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(n.value);break;case"m3":this.uniforms[i].value=new $e().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Be().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Lr=class extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Kt=class extends ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ao,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},wi=class extends Kt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return at(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var eo=class extends ui{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ao,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};var Jl=class extends ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Zl=class extends ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ns(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Pl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function L0(s){function e(n,r){return s[n]-s[r]}let t=s.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function jf(s,e,t){let i=s.length,n=new s.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let l=0;l!==e;++l)n[a++]=s[o+l]}return n}function N0(s,e,t,i){let n=1,r=s[0];for(;r!==void 0&&r[i]===void 0;)r=s[n++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[n++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[n++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=s[n++];while(r!==void 0)}var Mn=class{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=t[++i],e<n)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let a=0;a!==n;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},$l=class extends Mn{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hu,endingEnd:hu}}intervalChanged_(e,t,i){let n=this.parameterPositions,r=e-2,a=e+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case uu:r=e,o=2*t-i;break;case du:r=n.length-2,o=t+n[r]-n[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case uu:a=e,l=2*i-t;break;case du:a=1,l=i+n[1]-n[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(n-t),y=g*g,p=y*g,m=-d*p+2*d*y-d*g,_=(1+d)*p+(-1.5-2*d)*y+(-.5+d)*g+1,S=(-1-f)*p+(1.5+f)*y+.5*g,x=f*p-f*y;for(let M=0;M!==o;++M)r[M]=m*a[h+M]+_*a[c+M]+S*a[l+M]+x*a[u+M];return r}},Ql=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},ec=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}},tc=class extends Mn{interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(i-t)/(n-t),y=1-g;for(let p=0;p!==o;++p)r[p]=a[c+p]*y+a[l+p]*g;return r}let d=o*2,f=e-1;for(let g=0;g!==o;++g){let y=a[c+g],p=a[l+g],m=f*d+g*2,_=u[m],S=u[m+1],x=e*d+g*2,M=h[x],v=h[x+1],A=U0(i,t,_,M,n);r[g]=Hp(A,y,S,v,p)}return r}};function Hp(s,e,t,i,n){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*i+s*s*s*n}function F0(s,e,t,i,n){let r=1-s;return 3*r*r*(t-e)+6*r*s*(i-t)+3*s*s*(n-i)}function U0(s,e,t,i,n){let r=(s-e)/(n-e);for(let a=0;a<8;a++){let o=Hp(r,e,t,i,n)-s;if(Math.abs(o)<1e-10)break;let l=F0(r,e,t,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Ei=class{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ns(t,this.TimeBufferType),this.values=ns(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ns(e.times,Array),values:ns(e.values,Array)};let n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n),Pl(e.settings)&&(i.settings={inTangents:ns(e.settings.inTangents,Array),outTangents:ns(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ec(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ql(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $l(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new tc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ms:t=this.InterpolantFactoryMethodDiscrete;break;case Ss:t=this.InterpolantFactoryMethodLinear;break;case Rl:t=this.InterpolantFactoryMethodSmooth;break;case cu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ke("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ms;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return Rl;case this.InterpolantFactoryMethodBezier:return cu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e;Pl(this.settings)&&(Kf(this.settings.inTangents,e),Kf(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Xe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Xe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Xe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Xe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(n!==void 0&&vg(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Xe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Rl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{let u=o*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let y=t[u+g];if(y!==t[d+g]||y!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,Pl(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Kf(s,e){for(let t=0,i=s.length;t!==i;t+=2)s[t]*=e}Ei.prototype.ValueTypeName="";Ei.prototype.TimeBufferType=Float32Array;Ei.prototype.ValueBufferType=Float32Array;Ei.prototype.DefaultInterpolation=Ss;var Gn=class extends Ei{constructor(e,t,i){super(e,t,i)}};Gn.prototype.ValueTypeName="bool";Gn.prototype.ValueBufferType=Array;Gn.prototype.DefaultInterpolation=Ms;Gn.prototype.InterpolantFactoryMethodLinear=void 0;Gn.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends Ei{constructor(e,t,i,n){super(e,t,i,n)}};to.prototype.ValueTypeName="color";var Hn=class extends Ei{constructor(e,t,i,n){super(e,t,i,n)}};Hn.prototype.ValueTypeName="number";var ic=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t),c=e*o;for(let h=c+o;c!==h;c+=4)vi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Vn=class extends Ei{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new ic(this.times,this.values,this.getValueSize(),e)}};Vn.prototype.ValueTypeName="quaternion";Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var Wn=class extends Ei{constructor(e,t,i){super(e,t,i)}};Wn.prototype.ValueTypeName="string";Wn.prototype.ValueBufferType=Array;Wn.prototype.DefaultInterpolation=Ms;Wn.prototype.InterpolantFactoryMethodLinear=void 0;Wn.prototype.InterpolantFactoryMethodSmooth=void 0;var as=class extends Ei{constructor(e,t,i,n){super(e,t,i,n)}};as.prototype.ValueTypeName="vector";var io=class{constructor(e="",t=-1,i=[],n=Mp){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=Gi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,n=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(k0(i[a]).scale(n));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(Ei.toJSON(i[r]));return n}static CreateFromMorphTargetSequence(e,t,i,n){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=L0(l);l=jf(l,1,h),c=jf(c,1,h),!n&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Hn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let n={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=n[u];d||(n[u]=d=[]),d.push(c)}}let a=[];for(let o in n)a.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return a}resetDuration(){let e=this.tracks,t=0;for(let i=0,n=e.length;i!==n;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function O0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hn;case"vector":case"vector2":case"vector3":case"vector4":return as;case"color":return to;case"quaternion":return Vn;case"bool":case"boolean":return Gn;case"string":return Wn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function k0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=O0(s.type);if(s.times===void 0){let i=[],n=[];N0(s.keys,i,n,"value"),s.times=i,s.values=n}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Pl(s.settings)&&(t.settings={inTangents:ns(s.settings.inTangents,Float32Array),outTangents:ns(s.settings.outTangents,Float32Array)}),t}var mn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Yf(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Yf(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Yf(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var nc=class{constructor(e,t,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Vp=new nc,Sn=class{constructor(e){this.manager=e!==void 0?e:Vp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Sn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Un={},bu=class extends Error{constructor(e,t){super(e),this.response=t}},Nr=class extends Sn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=mn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Un[e]!==void 0){Un[e].push({onLoad:t,onProgress:i,onError:n});return}Un[e]=[],Un[e].push({onLoad:t,onProgress:i,onError:n});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&ke("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Un[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,y=0,p=new ReadableStream({start(m){_();function _(){u.read().then(({done:S,value:x})=>{if(S)m.close();else{y+=x.byteLength;let M=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:f});for(let v=0,A=h.length;v<A;v++){let b=h[v];b.onProgress&&b.onProgress(M)}m.enqueue(x),_()}},S=>{m.error(S)})}}});return new Response(p)}else throw new bu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{mn.add(`file:${e}`,c);let h=Un[e];delete Un[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Un[e];if(h===void 0)throw this.manager.itemError(e),c;delete Un[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var dr=new WeakMap,sc=class extends Sn{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=mn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=dr.get(a);u===void 0&&(u=[],dr.set(a,u)),u.push({onLoad:t,onError:n})}return a}let o=vr("img");function l(){h(),t&&t(this);let u=dr.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}dr.delete(this),r.manager.itemEnd(e)}function c(u){h(),n&&n(u),mn.remove(`image:${e}`);let d=dr.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}dr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),mn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var no=class extends Sn{constructor(e){super(e)}load(e,t,i,n){let r=new Xt,a=new sc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}},os=class extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},so=class extends os{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},au=new Be,Jf=new N,Zf=new N,Fr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=di,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vn,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Jf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jf),Zf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){au.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(au,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;e.coordinateSystem===xr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(au)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Tl=new N,Al=new vi,fn=new N,ro=class extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tl,Al,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tl,Al,fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Tl,Al,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tl,Al,fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},is=new N,$f=new ne,Qf=new ne,qt=class extends ro{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(wa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(wa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(is.x,is.y).multiplyScalar(-e/is.z),is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(is.x,is.y).multiplyScalar(-e/is.z)}getViewSize(e,t){return this.getViewBounds(e,$f,Qf),t.subVectors(Qf,$f)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(wa*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},xu=class extends Fr{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=ws*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||n!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},ao=class extends os{constructor(e,t,i=0,n=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},vu=class extends Fr{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Is=class extends os{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new vu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},wn=class extends ro{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},yu=class extends Fr{constructor(){super(new wn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ds=class extends os{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new yu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},oo=class extends os{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var qn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ou=new WeakMap,lo=class extends Sn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ke("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ke("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=mn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{ou.has(a)===!0?(n&&n(ou.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return mn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){n&&n(c),ou.set(l,c),mn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});mn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var fr=-90,pr=1,Ur=class extends St{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new qt(fr,pr,e,t);n.layers=this.layers,this.add(n);let r=new qt(fr,pr,e,t);r.layers=this.layers,this.add(r);let a=new qt(fr,pr,e,t);a.layers=this.layers,this.add(a);let o=new qt(fr,pr,e,t);o.layers=this.layers,this.add(o);let l=new qt(fr,pr,e,t);l.layers=this.layers,this.add(l);let c=new qt(fr,pr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Qi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,n),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,n),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},rc=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},co=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=B0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function B0(){this._document.hidden===!1&&this.reset()}var Wu="\\[\\]\\.:\\/",z0=new RegExp("["+Wu+"]","g"),qu="[^"+Wu+"]",G0="[^"+Wu.replace("\\.","")+"]",H0=/((?:WC+[\/:])*)/.source.replace("WC",qu),V0=/(WCOD+)?/.source.replace("WCOD",G0),W0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qu),q0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qu),X0=new RegExp("^"+H0+V0+W0+q0+"$"),j0=["material","materials","bones","map"],_u=class{constructor(e,t,i){let n=i||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Et=class s{constructor(e,t,i){this.path=t,this.parsedPath=i||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,i):new s(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(z0,"")}static parseTrackName(e){let t=X0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);j0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,n=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Xe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Xe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[n];if(a===void 0){let c=t.nodeName;Xe("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=_u;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var vM=new Float32Array(1);var ep=new Be,Ls=class{constructor(e,t,i=0,n=1/0){this.ray=new rs(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ep.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ep),this}intersectObject(e,t=!0,i=[]){return Mu(e,this,i,t),i.sort(tp),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)Mu(e[n],this,i,t);return i.sort(tp),i}};function tp(s,e){return s.distance-e.distance}function Mu(s,e,t,i){let n=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)Mu(r[a],e,t,!0)}}var Su=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=n,this}};function Xu(s,e,t,i){let n=K0(i);switch(t){case Uu:return s*e;case fc:return s*e/n.components*n.byteLength;case pc:return s*e/n.components*n.byteLength;case hs:return s*e*2/n.components*n.byteLength;case mc:return s*e*2/n.components*n.byteLength;case Ou:return s*e*3/n.components*n.byteLength;case Mi:return s*e*4/n.components*n.byteLength;case gc:return s*e*4/n.components*n.byteLength;case yo:case _o:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Mo:case So:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case xc:case yc:return Math.max(s,16)*Math.max(e,8)/4;case bc:case vc:return Math.max(s,8)*Math.max(e,8)/2;case _c:case Mc:case wc:case Ec:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sc:case wo:case Tc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Cc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case kc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Bc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case zc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Gc:case Hc:case Vc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Wc:case qc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Eo:case Xc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function K0(s){switch(s){case di:case Du:return{byteLength:1,components:1};case zr:case Lu:case Yt:return{byteLength:2,components:1};case uc:case dc:return{byteLength:2,components:4};case an:case hc:case Fi:return{byteLength:4,components:1};case Nu:case Fu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function um(){let s=null,e=!1,t=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function J0(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],y=u[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let y=u[f];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var Z0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$0=`#ifdef USE_ALPHAHASH
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
#endif`,Q0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ib=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nb=`#ifdef USE_AOMAP
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
#endif`,sb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rb=`#ifdef USE_BATCHING
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
#endif`,ab=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ob=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hb=`#ifdef USE_IRIDESCENCE
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
#endif`,ub=`#ifdef USE_BUMPMAP
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
#endif`,db=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,yb=`#define PI 3.141592653589793
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
} // validated`,_b=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mb=`vec3 transformedNormal = objectNormal;
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
#endif`,Sb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ab="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cb=`#ifdef USE_ENVMAP
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
#endif`,Pb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ib=`#ifdef USE_ENVMAP
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
#endif`,Db=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lb=`#ifdef USE_ENVMAP
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
#endif`,Nb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ub=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ob=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kb=`#ifdef USE_GRADIENTMAP
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
}`,Bb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Vb=`#ifdef USE_ENVMAP
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
#endif`,Wb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kb=`PhysicalMaterial material;
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
#endif`,Yb=`uniform sampler2D dfgLUT;
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
}`,Jb=`
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
#endif`,Zb=`#if defined( RE_IndirectDiffuse )
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
#endif`,$b=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ax=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ox=`#if defined( USE_POINTS_UV )
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
#endif`,lx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ux=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fx=`#ifdef USE_MORPHTARGETS
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
#endif`,px=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,yx=`#ifdef USE_NORMALMAP
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
#endif`,_x=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ex=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ax=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ix=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ux=`float getShadowMask() {
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
}`,Ox=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kx=`#ifdef USE_SKINNING
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
#endif`,Bx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zx=`#ifdef USE_SKINNING
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
#endif`,Gx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qx=`#ifdef USE_TRANSMISSION
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
#endif`,Xx=`#ifdef USE_TRANSMISSION
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
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$x=`uniform sampler2D t2D;
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
}`,Qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ev=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nv=`#include <common>
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
}`,sv=`#if DEPTH_PACKING == 3200
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
}`,rv=`#define DISTANCE
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
}`,av=`#define DISTANCE
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
}`,ov=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cv=`uniform float scale;
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
}`,hv=`uniform vec3 diffuse;
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
}`,uv=`#include <common>
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
}`,dv=`uniform vec3 diffuse;
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
}`,fv=`#define LAMBERT
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
}`,pv=`#define LAMBERT
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
}`,mv=`#define MATCAP
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
}`,gv=`#define MATCAP
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
}`,bv=`#define NORMAL
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
}`,xv=`#define NORMAL
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
}`,vv=`#define PHONG
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
}`,yv=`#define PHONG
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
}`,_v=`#define STANDARD
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
}`,Mv=`#define STANDARD
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
}`,Sv=`#define TOON
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
}`,wv=`#define TOON
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
}`,Ev=`uniform float size;
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
}`,Tv=`uniform vec3 diffuse;
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
}`,Av=`#include <common>
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
}`,Rv=`uniform vec3 color;
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
}`,Cv=`uniform float rotation;
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
}`,Pv=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Z0,alphahash_pars_fragment:$0,alphamap_fragment:Q0,alphamap_pars_fragment:eb,alphatest_fragment:tb,alphatest_pars_fragment:ib,aomap_fragment:nb,aomap_pars_fragment:sb,batching_pars_vertex:rb,batching_vertex:ab,begin_vertex:ob,beginnormal_vertex:lb,bsdfs:cb,iridescence_fragment:hb,bumpmap_pars_fragment:ub,clipping_planes_fragment:db,clipping_planes_pars_fragment:fb,clipping_planes_pars_vertex:pb,clipping_planes_vertex:mb,color_fragment:gb,color_pars_fragment:bb,color_pars_vertex:xb,color_vertex:vb,common:yb,cube_uv_reflection_fragment:_b,defaultnormal_vertex:Mb,displacementmap_pars_vertex:Sb,displacementmap_vertex:wb,emissivemap_fragment:Eb,emissivemap_pars_fragment:Tb,colorspace_fragment:Ab,colorspace_pars_fragment:Rb,envmap_fragment:Cb,envmap_common_pars_fragment:Pb,envmap_pars_fragment:Ib,envmap_pars_vertex:Db,envmap_physical_pars_fragment:Vb,envmap_vertex:Lb,fog_vertex:Nb,fog_pars_vertex:Fb,fog_fragment:Ub,fog_pars_fragment:Ob,gradientmap_pars_fragment:kb,lightmap_pars_fragment:Bb,lights_lambert_fragment:zb,lights_lambert_pars_fragment:Gb,lights_pars_begin:Hb,lights_toon_fragment:Wb,lights_toon_pars_fragment:qb,lights_phong_fragment:Xb,lights_phong_pars_fragment:jb,lights_physical_fragment:Kb,lights_physical_pars_fragment:Yb,lights_fragment_begin:Jb,lights_fragment_maps:Zb,lights_fragment_end:$b,lightprobes_pars_fragment:Qb,logdepthbuf_fragment:ex,logdepthbuf_pars_fragment:tx,logdepthbuf_pars_vertex:ix,logdepthbuf_vertex:nx,map_fragment:sx,map_pars_fragment:rx,map_particle_fragment:ax,map_particle_pars_fragment:ox,metalnessmap_fragment:lx,metalnessmap_pars_fragment:cx,morphinstance_vertex:hx,morphcolor_vertex:ux,morphnormal_vertex:dx,morphtarget_pars_vertex:fx,morphtarget_vertex:px,normal_fragment_begin:mx,normal_fragment_maps:gx,normal_pars_fragment:bx,normal_pars_vertex:xx,normal_vertex:vx,normalmap_pars_fragment:yx,clearcoat_normal_fragment_begin:_x,clearcoat_normal_fragment_maps:Mx,clearcoat_pars_fragment:Sx,iridescence_pars_fragment:wx,opaque_fragment:Ex,packing:Tx,premultiplied_alpha_fragment:Ax,project_vertex:Rx,dithering_fragment:Cx,dithering_pars_fragment:Px,roughnessmap_fragment:Ix,roughnessmap_pars_fragment:Dx,shadowmap_pars_fragment:Lx,shadowmap_pars_vertex:Nx,shadowmap_vertex:Fx,shadowmask_pars_fragment:Ux,skinbase_vertex:Ox,skinning_pars_vertex:kx,skinning_vertex:Bx,skinnormal_vertex:zx,specularmap_fragment:Gx,specularmap_pars_fragment:Hx,tonemapping_fragment:Vx,tonemapping_pars_fragment:Wx,transmission_fragment:qx,transmission_pars_fragment:Xx,uv_pars_fragment:jx,uv_pars_vertex:Kx,uv_vertex:Yx,worldpos_vertex:Jx,background_vert:Zx,background_frag:$x,backgroundCube_vert:Qx,backgroundCube_frag:ev,cube_vert:tv,cube_frag:iv,depth_vert:nv,depth_frag:sv,distance_vert:rv,distance_frag:av,equirect_vert:ov,equirect_frag:lv,linedashed_vert:cv,linedashed_frag:hv,meshbasic_vert:uv,meshbasic_frag:dv,meshlambert_vert:fv,meshlambert_frag:pv,meshmatcap_vert:mv,meshmatcap_frag:gv,meshnormal_vert:bv,meshnormal_frag:xv,meshphong_vert:vv,meshphong_frag:yv,meshphysical_vert:_v,meshphysical_frag:Mv,meshtoon_vert:Sv,meshtoon_frag:wv,points_vert:Ev,points_frag:Tv,shadow_vert:Av,shadow_frag:Rv,sprite_vert:Cv,sprite_frag:Pv},Se={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},An={basic:{uniforms:fi([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:fi([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:fi([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:fi([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:fi([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new ze(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:fi([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:fi([Se.points,Se.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:fi([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:fi([Se.common,Se.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:fi([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:fi([Se.sprite,Se.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:fi([Se.common,Se.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:fi([Se.lights,Se.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};An.physical={uniforms:fi([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var Yc={r:0,b:0,g:0},Iv=new Be,dm=new $e;dm.set(-1,0,0,0,1,0,0,0,1);function Dv(s,e,t,i,n,r){let a=new ze(0),o=n===!0?0:1,l,c,h=null,u=0,d=null;function f(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){let x=_.backgroundBlurriness>0;S=e.get(S,x)}return S}function g(_){let S=!1,x=f(_);x===null?p(a,o):x&&x.isColor&&(p(x,1),S=!0);let M=s.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(_,S){let x=f(S);x&&(x.isCubeTexture||x.mapping===vo)?(c===void 0&&(c=new Ze(new gt(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:zs(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,v,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Iv.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(dm),c.material.toneMapped=tt.getTransfer(x.colorSpace)!==mt,(h!==x||u!==x.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,u=x.version,d=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ze(new $a(2,2),new Lt({name:"BackgroundMaterial",uniforms:zs(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=tt.getTransfer(x.colorSpace)!==mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||u!==x.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,u=x.version,d=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,S){_.getRGB(Yc,Vu(s)),t.buffers.color.setClear(Yc.r,Yc.g,Yc.b,S,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,p(a,o)},render:g,addToRenderList:y,dispose:m}}function Lv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=d(null),r=n,a=!1;function o(C,D,P,I,F){let H=!1,V=u(C,I,P,D);r!==V&&(r=V,c(r.object)),H=f(C,I,P,F),H&&g(C,I,P,F),F!==null&&e.update(F,s.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,x(C,D,P,I),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return s.createVertexArray()}function c(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function u(C,D,P,I){let F=I.wireframe===!0,H=i[D.id];H===void 0&&(H={},i[D.id]=H);let V=C.isInstancedMesh===!0?C.id:0,ee=H[V];ee===void 0&&(ee={},H[V]=ee);let G=ee[P.id];G===void 0&&(G={},ee[P.id]=G);let K=G[F];return K===void 0&&(K=d(l()),G[F]=K),K}function d(C){let D=[],P=[],I=[];for(let F=0;F<t;F++)D[F]=0,P[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:P,attributeDivisors:I,object:C,attributes:{},index:null}}function f(C,D,P,I){let F=r.attributes,H=D.attributes,V=0,ee=P.getAttributes();for(let G in ee)if(ee[G].location>=0){let j=F[G],me=H[G];if(me===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&(me=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&(me=C.instanceColor)),j===void 0||j.attribute!==me||me&&j.data!==me.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function g(C,D,P,I){let F={},H=D.attributes,V=0,ee=P.getAttributes();for(let G in ee)if(ee[G].location>=0){let j=H[G];j===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&(j=C.instanceColor));let me={};me.attribute=j,j&&j.data&&(me.data=j.data),F[G]=me,V++}r.attributes=F,r.attributesNum=V,r.index=I}function y(){let C=r.newAttributes;for(let D=0,P=C.length;D<P;D++)C[D]=0}function p(C){m(C,0)}function m(C,D){let P=r.newAttributes,I=r.enabledAttributes,F=r.attributeDivisors;P[C]=1,I[C]===0&&(s.enableVertexAttribArray(C),I[C]=1),F[C]!==D&&(s.vertexAttribDivisor(C,D),F[C]=D)}function _(){let C=r.newAttributes,D=r.enabledAttributes;for(let P=0,I=D.length;P<I;P++)D[P]!==C[P]&&(s.disableVertexAttribArray(P),D[P]=0)}function S(C,D,P,I,F,H,V){V===!0?s.vertexAttribIPointer(C,D,P,F,H):s.vertexAttribPointer(C,D,P,I,F,H)}function x(C,D,P,I){y();let F=I.attributes,H=P.getAttributes(),V=D.defaultAttributeValues;for(let ee in H){let G=H[ee];if(G.location>=0){let K=F[ee];if(K===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(K=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(K=C.instanceColor)),K!==void 0){let j=K.normalized,me=K.itemSize,he=e.get(K);if(he===void 0)continue;let Le=he.buffer,ve=he.type,Ne=he.bytesPerElement,Y=ve===s.INT||ve===s.UNSIGNED_INT||K.gpuType===hc;if(K.isInterleavedBufferAttribute){let B=K.data,$=B.stride,fe=K.offset;if(B.isInstancedInterleavedBuffer){for(let oe=0;oe<G.locationSize;oe++)m(G.location+oe,B.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let oe=0;oe<G.locationSize;oe++)p(G.location+oe);s.bindBuffer(s.ARRAY_BUFFER,Le);for(let oe=0;oe<G.locationSize;oe++)S(G.location+oe,me/G.locationSize,ve,j,$*Ne,(fe+me/G.locationSize*oe)*Ne,Y)}else{if(K.isInstancedBufferAttribute){for(let B=0;B<G.locationSize;B++)m(G.location+B,K.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let B=0;B<G.locationSize;B++)p(G.location+B);s.bindBuffer(s.ARRAY_BUFFER,Le);for(let B=0;B<G.locationSize;B++)S(G.location+B,me/G.locationSize,ve,j,me*Ne,me/G.locationSize*B*Ne,Y)}}else if(V!==void 0){let j=V[ee];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(G.location,j);break;case 3:s.vertexAttrib3fv(G.location,j);break;case 4:s.vertexAttrib4fv(G.location,j);break;default:s.vertexAttrib1fv(G.location,j)}}}}_()}function M(){w();for(let C in i){let D=i[C];for(let P in D){let I=D[P];for(let F in I){let H=I[F];for(let V in H)h(H[V].object),delete H[V];delete I[F]}}delete i[C]}}function v(C){if(i[C.id]===void 0)return;let D=i[C.id];for(let P in D){let I=D[P];for(let F in I){let H=I[F];for(let V in H)h(H[V].object),delete H[V];delete I[F]}}delete i[C.id]}function A(C){for(let D in i){let P=i[D];for(let I in P){let F=P[I];if(F[C.id]===void 0)continue;let H=F[C.id];for(let V in H)h(H[V].object),delete H[V];delete F[C.id]}}}function b(C){for(let D in i){let P=i[D],I=C.isInstancedMesh===!0?C.id:0,F=P[I];if(F!==void 0){for(let H in F){let V=F[H];for(let ee in V)h(V[ee].object),delete V[ee];delete F[H]}delete P[I],Object.keys(P).length===0&&delete i[D]}}}function w(){T(),a=!0,r!==n&&(r=n,c(r.object))}function T(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:w,resetDefaultState:T,dispose:M,releaseStatesOfGeometry:v,releaseStatesOfObject:b,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:p,disableUnusedAttributes:_}}function Nv(s,e,t){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Fv(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==Mi&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let b=A===Yt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==di&&A!==Fi&&!b&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(ke("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=s.getParameter(s.MAX_SAMPLES),v=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:x,maxSamples:M,samples:v}}function Uv(s){let e=this,t=null,i=0,n=!1,r=!1,a=new Zi,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!n||g===null||g.length===0||r&&!p)r?h(null):c();else{let _=r?0:i,S=_*4,x=m.clippingState||null;l.value=x,x=h(g,d,S,f);for(let M=0;M!==S;++M)x[M]=t[M];m.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,g!==!0||p===null){let m=f+y*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(p===null||p.length<m)&&(p=new Float32Array(m));for(let S=0,x=f;S!==y;++S,x+=4)a.copy(u[S]).applyMatrix4(_,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}var Vr=4,Ov=6,kv=20,Bv=256,Ro=new wn,Wp=new ze,ju=null,Ku=0,Yu=0,Ju=!1,zv=new N,Gs=new N,qr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){let{size:a=256,position:o=zv}=r;ju=this._renderer.getRenderTarget(),Ku=this._renderer.getActiveCubeFace(),Yu=this._renderer.getActiveMipmapLevel(),Ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,n,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ju,Ku,Yu),this._renderer.xr.enabled=Ju,e.scissorTest=!1,Hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ls||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ju=this._renderer.getRenderTarget(),Ku=this._renderer.getActiveCubeFace(),Yu=this._renderer.getActiveMipmapLevel(),Ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Yt,format:Mi,colorSpace:xi,depthBuffer:!1},n=qp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qp(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Gv(r)),this._blurMaterial=Vv(r,e,t),this._ggxMaterial=Hv(r,e,t)}return n}_compileMaterial(e){let t=new Ze(new nt,e);this._renderer.compile(t,Ro)}_sceneToCubeUV(e,t,i,n,r){let l=new qt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Wp),u.toneMapping=sn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ze(new gt,new yi({name:"PMREM.Background",side:ni,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,p=y.material,m=!1,_=e.background;_?_.isColor&&(p.color.copy(_),e.background=null,m=!0):(p.color.copy(Wp),m=!0);for(let S=0;S<6;S++){let x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));let M=this._cubeSize;Hr(n,x*M,S>2?M:0,M,M),u.setRenderTarget(n),m&&u.render(y,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=_}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===ls||e.mapping===Os;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=jp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xp());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Hr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ro)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:g}=this,y=this._sizeLods[i],p=3*y*(i>g-Vr?i-g+Vr:0),m=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Hr(r,p,m,3*y,2*y),n.setRenderTarget(r),n.render(o,Ro),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Hr(e,p,m,3*y,2*y),n.setRenderTarget(e),n.render(o,Ro)}_blur(e,t,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,n,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],u=3*h*(n>this._lodMax-Vr?n-this._lodMax+Vr:0),d=4*(this._cubeSize-h);Hr(t,u,d,3*h,2*h),a.setRenderTarget(t),a.render(l,Ro)}};function Gv(s){let e=[],t=[],i=s,n=s-Vr+1+Ov;for(let r=0;r<n;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,g=new Float32Array(f*d*u),y=new Float32Array(f*d*u);for(let m=0;m<u;m++){let _=m%3*2/3-1,S=m>2?0:-1,x=[_,S,0,_+2/3,S,0,_+2/3,S+1,0,_,S,0,_+2/3,S+1,0,_,S+1,0];g.set(x,f*d*m);for(let M=0;M<d;M++){let v=h[M*2]*2-1,A=h[M*2+1]*2-1;m===0?Gs.set(1,A,v):m===1?Gs.set(-v,1,-A):m===2?Gs.set(-v,A,1):m===3?Gs.set(-1,A,-v):m===4?Gs.set(-v,-1,A):Gs.set(v,A,-1),Gs.toArray(y,(m*d+M)*f)}}let p=new nt;p.setAttribute("position",new Mt(g,f)),p.setAttribute("outputDirection",new Mt(y,f)),t.push(new Ze(p,null)),i>Vr&&i--}return{lodMeshes:t,sizeLods:e}}function qp(s,e,t){let i=new Bt(s,e,t);return i.texture.mapping=vo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hr(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function Hv(s,e,t){return new Lt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Bv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$c(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Vv(s,e,t){return new Lt({name:"SphericalGaussianBlur",defines:{SAMPLES:kv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:$c(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Xp(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$c(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function jp(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zt,depthTest:!1,depthWrite:!1})}function $c(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Xr=class extends Bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new za(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new gt(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ni,blending:zt});r.uniforms.tEquirect.value=t;let a=new Ze(n,r),o=t.minFilter;return t.minFilter===rn&&(t.minFilter=kt),new Ur(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}};function Wv(s){let e=new WeakMap,t=new WeakMap,i=null;function n(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===oc||f===lc)if(e.has(d)){let g=e.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let y=new Xr(g.height);return y.fromEquirectangularTexture(s,d),e.set(d,y),d.addEventListener("dispose",c),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,g=f===oc||f===lc,y=f===ls||f===Os;if(g||y){let p=t.get(d),m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new qr(s)),p=g?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{let _=d.image;return g&&_&&_.height>0||y&&_&&l(_)?(i===null&&(i=new qr(s)),p=g?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function o(d,f){return f===oc?d.mapping=ls:f===lc&&(d.mapping=Os),d}function l(d){let f=0,g=6;for(let y=0;y<g;y++)d[y]!==void 0&&f++;return f===g}function c(d){let f=d.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function qv(s){let e={};function t(i){if(e[i]!==void 0)return e[i];let n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let n=t(i);return n===null&&_s("WebGLRenderer: "+i+" extension not supported."),n}}}function Xv(s,e,t,i){let n={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete n[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,y=0;if(g===void 0)return;if(f!==null){let _=f.array;y=f.version;for(let S=0,x=_.length;S<x;S+=3){let M=_[S+0],v=_[S+1],A=_[S+2];d.push(M,v,v,A,A,M)}}else{let _=g.array;y=g.version;for(let S=0,x=_.length/3-1;S<x;S+=3){let M=S+0,v=S+1,A=S+2;d.push(M,v,v,A,A,M)}}let p=new(g.count>=65535?Da:Ia)(d,1);p.version=y;let m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function jv(s,e,t){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(i,d,r,u*a),t.update(d,i,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(i,d,r,u*a,f),t.update(d,i,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,f);let y=0;for(let p=0;p<f;p++)y+=d[p];t.update(y,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Kv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Yv(s,e,t){let i=new WeakMap,n=new yt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),y===!0&&(S=3);let x=o.attributes.position.count*S,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let v=new Float32Array(x*M*4*u),A=new Pa(v,x,M,u);A.type=Fi,A.needsUpdate=!0;let b=S*4;for(let T=0;T<u;T++){let C=p[T],D=m[T],P=_[T],I=x*M*4*T;for(let F=0;F<C.count;F++){let H=F*b;f===!0&&(n.fromBufferAttribute(C,F),v[I+H+0]=n.x,v[I+H+1]=n.y,v[I+H+2]=n.z,v[I+H+3]=0),g===!0&&(n.fromBufferAttribute(D,F),v[I+H+4]=n.x,v[I+H+5]=n.y,v[I+H+6]=n.z,v[I+H+7]=0),y===!0&&(n.fromBufferAttribute(P,F),v[I+H+8]=n.x,v[I+H+9]=n.y,v[I+H+10]=n.z,v[I+H+11]=P.itemSize===4?n.w:1)}}d={count:u,texture:A,size:new ne(x,M)},i.set(o,d),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Jv(s,e,t,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Zv={[fo]:"LINEAR_TONE_MAPPING",[po]:"REINHARD_TONE_MAPPING",[mo]:"CINEON_TONE_MAPPING",[go]:"ACES_FILMIC_TONE_MAPPING",[Us]:"AGX_TONE_MAPPING",[xo]:"NEUTRAL_TONE_MAPPING",[bo]:"CUSTOM_TONE_MAPPING"};function $v(s,e,t,i,n,r){let a=new Bt(e,t,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new nt;c.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ke([0,2,0,0,2,0],2));let h=new Lr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ze(c,h),d=new wn(-1,1,1,-1,0,1),f=null,g=null,y=!1,p,m=null,_=[],S=!1;this.setSize=function(x,M){a.setSize(x,M),o!==null&&o.setSize(x,M),l!==null&&l.setSize(x,M);for(let v=0;v<_.length;v++){let A=_[v];A.setSize&&A.setSize(x,M)}},this.setEffects=function(x){_=x,S=_.length>0&&_[0].isRenderPass===!0;let M=a.width,v=a.height;_.length>0&&o===null&&(o=new Bt(M,v,{type:Yt,depthBuffer:!1,stencilBuffer:!1}),l=new Bt(M,v,{type:Yt,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<_.length;A++){let b=_[A];b.setSize&&b.setSize(M,v)}},this.begin=function(x,M){if(y||x.toneMapping===sn&&_.length===0)return!1;if(m=M,M!==null){let v=M.width,A=M.height;(a.width!==v||a.height!==A)&&this.setSize(v,A)}return S===!1&&x.setRenderTarget(a),p=x.toneMapping,x.toneMapping=sn,!0},this.hasRenderPass=function(){return S},this.end=function(x,M){x.toneMapping=p,y=!0;let v=a,A=o;for(let b=0;b<_.length;b++){let w=_[b];w.enabled!==!1&&(w.render(x,A,v,M),w.needsSwap!==!1&&(v=A,A=A===o?l:o))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},tt.getTransfer(f)===mt&&(h.defines.SRGB_TRANSFER="");let b=Zv[g];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=v.texture,x.setRenderTarget(m),x.render(u,d),m=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var fm=new Xt,Qu=new _n(1,1),pm=new Pa,mm=new zl,gm=new za,Kp=[],Yp=[],Jp=new Float32Array(16),Zp=new Float32Array(9),$p=new Float32Array(4);function jr(s,e,t){let i=s[0];if(i<=0||i>0)return s;let n=e*t,r=Kp[n];if(r===void 0&&(r=new Float32Array(n),Kp[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Jt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function Zt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Qc(s,e){let t=Yp[e];t===void 0&&(t=new Int32Array(e),Yp[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function Qv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ey(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2fv(this.addr,e),Zt(t,e)}}function ty(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;s.uniform3fv(this.addr,e),Zt(t,e)}}function iy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4fv(this.addr,e),Zt(t,e)}}function ny(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,i))return;$p.set(i),s.uniformMatrix2fv(this.addr,!1,$p),Zt(t,i)}}function sy(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,i))return;Zp.set(i),s.uniformMatrix3fv(this.addr,!1,Zp),Zt(t,i)}}function ry(s,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,i))return;Jp.set(i),s.uniformMatrix4fv(this.addr,!1,Jp),Zt(t,i)}}function ay(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function oy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2iv(this.addr,e),Zt(t,e)}}function ly(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3iv(this.addr,e),Zt(t,e)}}function cy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4iv(this.addr,e),Zt(t,e)}}function hy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function uy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2uiv(this.addr,e),Zt(t,e)}}function dy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3uiv(this.addr,e),Zt(t,e)}}function fy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4uiv(this.addr,e),Zt(t,e)}}function py(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Qu.compareFunction=t.isReversedDepthBuffer()?Kc:jc,r=Qu):r=fm,t.setTexture2D(e||r,n)}function my(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||mm,n)}function gy(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||gm,n)}function by(s,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||pm,n)}function xy(s){switch(s){case 5126:return Qv;case 35664:return ey;case 35665:return ty;case 35666:return iy;case 35674:return ny;case 35675:return sy;case 35676:return ry;case 5124:case 35670:return ay;case 35667:case 35671:return oy;case 35668:case 35672:return ly;case 35669:case 35673:return cy;case 5125:return hy;case 36294:return uy;case 36295:return dy;case 36296:return fy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return my;case 35680:case 36300:case 36308:case 36293:return gy;case 36289:case 36303:case 36311:case 36292:return by}}function vy(s,e){s.uniform1fv(this.addr,e)}function yy(s,e){let t=jr(e,this.size,2);s.uniform2fv(this.addr,t)}function _y(s,e){let t=jr(e,this.size,3);s.uniform3fv(this.addr,t)}function My(s,e){let t=jr(e,this.size,4);s.uniform4fv(this.addr,t)}function Sy(s,e){let t=jr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function wy(s,e){let t=jr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Ey(s,e){let t=jr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Ty(s,e){s.uniform1iv(this.addr,e)}function Ay(s,e){s.uniform2iv(this.addr,e)}function Ry(s,e){s.uniform3iv(this.addr,e)}function Cy(s,e){s.uniform4iv(this.addr,e)}function Py(s,e){s.uniform1uiv(this.addr,e)}function Iy(s,e){s.uniform2uiv(this.addr,e)}function Dy(s,e){s.uniform3uiv(this.addr,e)}function Ly(s,e){s.uniform4uiv(this.addr,e)}function Ny(s,e,t){let i=this.cache,n=e.length,r=Qc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Qu:a=fm;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||a,r[o])}function Fy(s,e,t){let i=this.cache,n=e.length,r=Qc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||mm,r[a])}function Uy(s,e,t){let i=this.cache,n=e.length,r=Qc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||gm,r[a])}function Oy(s,e,t){let i=this.cache,n=e.length,r=Qc(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Zt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||pm,r[a])}function ky(s){switch(s){case 5126:return vy;case 35664:return yy;case 35665:return _y;case 35666:return My;case 35674:return Sy;case 35675:return wy;case 35676:return Ey;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return Ry;case 35669:case 35673:return Cy;case 5125:return Py;case 36294:return Iy;case 36295:return Dy;case 36296:return Ly;case 35678:case 36198:case 36298:case 36306:case 35682:return Ny;case 35679:case 36299:case 36307:return Fy;case 35680:case 36300:case 36308:case 36293:return Uy;case 36289:case 36303:case 36311:case 36292:return Oy}}var ed=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=xy(t.type)}},td=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ky(t.type)}},id=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(e,t[o.id],i)}}},Zu=/(\w+)(\])?(\[|\.)?/g;function Qp(s,e){s.seq.push(e),s.map[e.id]=e}function By(s,e,t){let i=s.name,n=i.length;for(Zu.lastIndex=0;;){let r=Zu.exec(i),a=Zu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Qp(t,c===void 0?new ed(o,s,e):new td(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new id(o),Qp(t,u)),t=u}}}var Wr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);By(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){let r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,r=e.length;n!==r;++n){let a=e[n];a.id in t&&i.push(a)}return i}};function em(s,e,t){let i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}var zy=37297,Gy=0;function Hy(s,e){let t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var tm=new $e;function Vy(s){tt._getMatrix(tm,tt.workingColorSpace,s);let e=`mat3( ${tm.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(s)){case Ra:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function im(s,e,t){let i=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Hy(s.getShaderSource(e),o)}else return r}function Wy(s,e){let t=Vy(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var qy={[fo]:"Linear",[po]:"Reinhard",[mo]:"Cineon",[go]:"ACESFilmic",[Us]:"AgX",[xo]:"Neutral",[bo]:"Custom"};function Xy(s,e){let t=qy[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jc=new N;function jy(){tt.getLuminanceCoefficients(Jc);let s=Jc.x.toFixed(4),e=Jc.y.toFixed(4),t=Jc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ky(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Po).join(`
`)}function Yy(s){let e=[];for(let t in s){let i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Jy(s,e){let t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(e,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Po(s){return s!==""}function nm(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function nd(s){return s.replace(Zy,Qy)}var $y=new Map;function Qy(s,e){let t=ot[e];if(t===void 0){let i=$y.get(e);if(i!==void 0)t=ot[i],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return nd(t)}var e_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rm(s){return s.replace(e_,t_)}function t_(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function am(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var i_={[Ns]:"SHADOWMAP_TYPE_PCF",[Or]:"SHADOWMAP_TYPE_VSM"};function n_(s){return i_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var s_={[ls]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[vo]:"ENVMAP_TYPE_CUBE_UV"};function r_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":s_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var a_={[Os]:"ENVMAP_MODE_REFRACTION"};function o_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":a_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var l_={[Pu]:"ENVMAP_BLENDING_MULTIPLY",[vp]:"ENVMAP_BLENDING_MIX",[yp]:"ENVMAP_BLENDING_ADD"};function c_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":l_[s.combine]||"ENVMAP_BLENDING_NONE"}function h_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function u_(s,e,t,i){let n=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=n_(t),c=r_(t),h=o_(t),u=c_(t),d=h_(t),f=Ky(t),g=Yy(r),y=n.createProgram(),p,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Po).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Po).join(`
`),m.length>0&&(m+=`
`)):(p=[am(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Po).join(`
`),m=[am(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==sn?"#define TONE_MAPPING":"",t.toneMapping!==sn?ot.tonemapping_pars_fragment:"",t.toneMapping!==sn?Xy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Wy("linearToOutputTexel",t.outputColorSpace),jy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Po).join(`
`)),a=nd(a),a=nm(a,t),a=sm(a,t),o=nd(o),o=nm(o,t),o=sm(o,t),a=rm(a),o=rm(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===zu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=_+p+a,x=_+m+o,M=em(n,n.VERTEX_SHADER,S),v=em(n,n.FRAGMENT_SHADER,x);n.attachShader(y,M),n.attachShader(y,v),t.index0AttributeName!==void 0?n.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(y,0,"position"),n.linkProgram(y);function A(C){if(s.debug.checkShaderErrors){let D=n.getProgramInfoLog(y)||"",P=n.getShaderInfoLog(M)||"",I=n.getShaderInfoLog(v)||"",F=D.trim(),H=P.trim(),V=I.trim(),ee=!0,G=!0;if(n.getProgramParameter(y,n.LINK_STATUS)===!1)if(ee=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,y,M,v);else{let K=im(n,M,"vertex"),j=im(n,v,"fragment");Xe("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(y,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+K+`
`+j)}else F!==""?ke("WebGLProgram: Program Info Log:",F):(H===""||V==="")&&(G=!1);G&&(C.diagnostics={runnable:ee,programLog:F,vertexShader:{log:H,prefix:p},fragmentShader:{log:V,prefix:m}})}n.deleteShader(M),n.deleteShader(v),b=new Wr(n,y),w=Jy(n,y)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=n.getProgramParameter(y,zy)),T},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Gy++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=v,this}var d_=0,sd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new rd(e),t.set(e,i)),i}},rd=class{constructor(e){this.id=d_++,this.code=e,this.usedTimes=0}};function f_(s){return s===hs||s===wo||s===Eo}function p_(s,e,t,i,n,r){let a=new Mr,o=new sd,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return l.add(b),b===0?"uv":`uv${b}`}function y(b,w,T,C,D,P){let I=C.fog,F=D.geometry,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ee=e.get(b.envMap||H,V),G=ee&&ee.mapping===vo?ee.image.height:null,K=f[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&ke("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let j=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,me=j!==void 0?j.length:0,he=0;F.morphAttributes.position!==void 0&&(he=1),F.morphAttributes.normal!==void 0&&(he=2),F.morphAttributes.color!==void 0&&(he=3);let Le,ve,Ne,Y;if(K){let Tt=An[K];Le=Tt.vertexShader,ve=Tt.fragmentShader}else{Le=b.vertexShader,ve=b.fragmentShader;let Tt=o.getVertexShaderStage(b),bt=o.getFragmentShaderStage(b);o.update(b,Tt,bt),Ne=Tt.id,Y=bt.id}let B=s.getRenderTarget(),$=s.state.buffers.depth.getReversed(),fe=D.isInstancedMesh===!0,oe=D.isBatchedMesh===!0,Ce=!!b.map,Qe=!!b.matcap,te=!!ee,le=!!b.aoMap,ue=!!b.lightMap,ce=!!b.bumpMap&&b.wireframe===!1,pe=!!b.normalMap,We=!!b.displacementMap,Ge=!!b.emissiveMap,qe=!!b.metalnessMap,Ye=!!b.roughnessMap,U=b.anisotropy>0,dt=b.clearcoat>0,et=b.dispersion>0,L=b.retroreflectivity>0,E=b.iridescence>0,z=b.sheen>0,W=b.transmission>0,Z=U&&!!b.anisotropyMap,de=dt&&!!b.clearcoatMap,ge=dt&&!!b.clearcoatNormalMap,Q=dt&&!!b.clearcoatRoughnessMap,se=E&&!!b.iridescenceMap,ye=E&&!!b.iridescenceThicknessMap,Ue=z&&!!b.sheenColorMap,xe=z&&!!b.sheenRoughnessMap,be=!!b.specularMap,Pe=!!b.specularColorMap,He=!!b.specularIntensityMap,Je=W&&!!b.transmissionMap,k=W&&!!b.thicknessMap,_e=!!b.gradientMap,ie=!!b.alphaMap,Me=b.alphaTest>0,Te=!!b.alphaHash,re=!!b.extensions,Ve=sn;b.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ve=s.toneMapping);let Fe={shaderID:K,shaderType:b.type,shaderName:b.name,vertexShader:Le,fragmentShader:ve,defines:b.defines,customVertexShaderID:Ne,customFragmentShaderID:Y,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:oe,batchingColor:oe&&D._colorsTexture!==null,instancing:fe,instancingColor:fe&&D.instanceColor!==null,instancingMorph:fe&&D.morphTexture!==null,outputColorSpace:B===null?s.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ce,matcap:Qe,envMap:te,envMapMode:te&&ee.mapping,envMapCubeUVHeight:G,aoMap:le,lightMap:ue,bumpMap:ce,normalMap:pe,displacementMap:We,emissiveMap:Ge,normalMapObjectSpace:pe&&b.normalMapType===wp,normalMapTangentSpace:pe&&b.normalMapType===Ao,packedNormalMap:pe&&b.normalMapType===Ao&&f_(b.normalMap.format),metalnessMap:qe,roughnessMap:Ye,anisotropy:U,anisotropyMap:Z,clearcoat:dt,clearcoatMap:de,clearcoatNormalMap:ge,clearcoatRoughnessMap:Q,dispersion:et,retroreflection:L,iridescence:E,iridescenceMap:se,iridescenceThicknessMap:ye,sheen:z,sheenColorMap:Ue,sheenRoughnessMap:xe,specularMap:be,specularColorMap:Pe,specularIntensityMap:He,transmission:W,transmissionMap:Je,thicknessMap:k,gradientMap:_e,opaque:b.transparent===!1&&b.blending===kr&&b.alphaToCoverage===!1,alphaMap:ie,alphaTest:Me,alphaHash:Te,combine:b.combine,mapUv:Ce&&g(b.map.channel),aoMapUv:le&&g(b.aoMap.channel),lightMapUv:ue&&g(b.lightMap.channel),bumpMapUv:ce&&g(b.bumpMap.channel),normalMapUv:pe&&g(b.normalMap.channel),displacementMapUv:We&&g(b.displacementMap.channel),emissiveMapUv:Ge&&g(b.emissiveMap.channel),metalnessMapUv:qe&&g(b.metalnessMap.channel),roughnessMapUv:Ye&&g(b.roughnessMap.channel),anisotropyMapUv:Z&&g(b.anisotropyMap.channel),clearcoatMapUv:de&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ge&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(b.sheenRoughnessMap.channel),specularMapUv:be&&g(b.specularMap.channel),specularColorMapUv:Pe&&g(b.specularColorMap.channel),specularIntensityMapUv:He&&g(b.specularIntensityMap.channel),transmissionMapUv:Je&&g(b.transmissionMap.channel),thicknessMapUv:k&&g(b.thicknessMap.channel),alphaMapUv:ie&&g(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(pe||U),vertexNormals:!!F.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!F.attributes.uv&&(Ce||ie),fog:!!I,useFog:b.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||F.attributes.normal===void 0&&pe===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:$,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:he,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:P.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&T.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Ce&&b.map.isVideoTexture===!0&&tt.getTransfer(b.map.colorSpace)===mt,decodeVideoTextureEmissive:Ge&&b.emissiveMap.isVideoTexture===!0&&tt.getTransfer(b.emissiveMap.colorSpace)===mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Rt,flipSided:b.side===ni,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:re&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&b.extensions.multiDraw===!0||oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function p(b){let w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(let T in b.defines)w.push(T),w.push(b.defines[T]);return b.isRawShaderMaterial===!1&&(m(w,b),_(w,b),w.push(s.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function m(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numSunLights),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numSunLightShadows),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function _(b,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function S(b){let w=f[b.type],T;if(w){let C=An[w];T=Ti.clone(C.uniforms)}else T=b.uniforms;return T}function x(b,w){let T=h.get(w);return T!==void 0?++T.usedTimes:(T=new u_(s,w,b,n),c.push(T),h.set(w,T)),T}function M(b){if(--b.usedTimes===0){let w=c.indexOf(b);c[w]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function v(b){o.remove(b)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:S,acquireProgram:x,releaseProgram:M,releaseShaderCache:v,programs:c,dispose:A}}function m_(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function g_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function om(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function lm(){let s=[],e=0,t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,y,p,m){let _=s[e];return _===void 0?(_={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:p,group:m},s[e]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=g,_.materialVariant=a(d),_.groupOrder=y,_.renderOrder=d.renderOrder,_.z=p,_.group=m),e++,_}function l(d,f,g,y,p,m,_){_.reversedDepth===!0&&(p=-p);let S=o(d,f,g,y,p,m);g.transmission>0?i.push(S):g.transparent===!0?n.push(S):t.push(S)}function c(d,f,g,y,p,m){let _=o(d,f,g,y,p,m);g.transmission>0?i.unshift(_):g.transparent===!0?n.unshift(_):t.unshift(_)}function h(d,f){t.length>1&&t.sort(d||g_),i.length>1&&i.sort(f||om),n.length>1&&n.sort(f||om)}function u(){for(let d=e,f=s.length;d<f;d++){let g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:u,sort:h}}function b_(){let s=new WeakMap;function e(i,n){let r=s.get(i),a;return r===void 0?(a=new lm,s.set(i,[a])):n>=r.length?(a=new lm,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function x_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function v_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var y_=0;function __(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function M_(s){let e=new x_,t=v_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let n=new N,r=new Be,a=new Be;function o(c){let h=0,u=0,d=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let f=0,g=0,y=0,p=0,m=0,_=0,S=0,x=0,M=0,v=0,A=0,b=0,w=0,T=0;c.sort(__);for(let D=0,P=c.length;D<P;D++){let I=c[D],F=I.color,H=I.intensity,V=I.distance,ee=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===hs?ee=I.shadow.map.texture:ee=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=F.r*H,u+=F.g*H,d+=F.b*H;else if(I.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(I.sh.coefficients[G],H);T++}else if(I.isSunLight){let G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let K=I.shadow,j=t.get(I);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),i.sunShadow[g]=j,i.sunShadowMap[g]=ee;let me=K.getViewportCount();for(let he=0;he<me;he++)i.sunShadowMatrix[y+he]=K.getMatrix(he),i.sunShadowCascade[y+he]=K._cascadeData[he];y+=me,g++}i.sun[f]=G,f++}else if(I.isDirectionalLight){let G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let K=I.shadow,j=t.get(I);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,i.directionalShadow[p]=j,i.directionalShadowMap[p]=ee,i.directionalShadowMatrix[p]=I.shadow.matrix,M++}i.directional[p]=G,p++}else if(I.isSpotLight){let G=e.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(F).multiplyScalar(H),G.distance=V,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,i.spot[_]=G;let K=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,K.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[_]=K.matrix,I.castShadow){let j=t.get(I);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,i.spotShadow[_]=j,i.spotShadowMap[_]=ee,A++}_++}else if(I.isRectAreaLight){let G=e.get(I);G.color.copy(F).multiplyScalar(H),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),i.rectArea[S]=G,S++}else if(I.isPointLight){let G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){let K=I.shadow,j=t.get(I);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,j.shadowCameraNear=K.camera.near,j.shadowCameraFar=K.camera.far,i.pointShadow[m]=j,i.pointShadowMap[m]=ee,i.pointShadowMatrix[m]=I.shadow.matrix,v++}i.point[m]=G,m++}else if(I.isHemisphereLight){let G=e.get(I);G.skyColor.copy(I.color).multiplyScalar(H),G.groundColor.copy(I.groundColor).multiplyScalar(H),i.hemi[x]=G,x++}}S>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let C=i.hash;(C.sunLength!==f||C.directionalLength!==p||C.pointLength!==m||C.spotLength!==_||C.rectAreaLength!==S||C.hemiLength!==x||C.numSunShadows!==g||C.numDirectionalShadows!==M||C.numPointShadows!==v||C.numSpotShadows!==A||C.numSpotMaps!==b||C.numLightProbes!==T)&&(i.sun.length=f,i.directional.length=p,i.spot.length=_,i.rectArea.length=S,i.point.length=m,i.hemi.length=x,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=v,i.pointShadowMap.length=v,i.pointShadowMatrix.length=v,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=T,C.sunLength=f,C.directionalLength=p,C.pointLength=m,C.spotLength=_,C.rectAreaLength=S,C.hemiLength=x,C.numSunShadows=g,C.numDirectionalShadows=M,C.numPointShadows=v,C.numSpotShadows=A,C.numSpotMaps=b,C.numLightProbes=T,i.version=y_++)}function l(c,h){let u=0,d=0,f=0,g=0,y=0,p=0,m=h.matrixWorldInverse;for(let _=0,S=c.length;_<S;_++){let x=c[_];if(x.isSunLight){let M=i.sun[u];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(m),u++}else if(x.isDirectionalLight){let M=i.directional[d];M.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(n),M.direction.transformDirection(m),d++}else if(x.isSpotLight){let M=i.spot[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(n),M.direction.transformDirection(m),g++}else if(x.isRectAreaLight){let M=i.rectArea[y];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){let M=i.point[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){let M=i.hemi[p];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(m),p++}}}return{setup:o,setupView:l,state:i}}function cm(s){let e=new M_(s),t=[],i=[],n=[];function r(d){u.camera=d,t.length=0,i.length=0,n.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){n.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function S_(s){let e=new WeakMap;function t(n,r=0){let a=e.get(n),o;return a===void 0?(o=new cm(s),e.set(n,[o])):r>=a.length?(o=new cm(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var w_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E_=`uniform sampler2D shadow_pass;
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
}`,T_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],A_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],hm=new Be,Co=new N,$u=new N;function R_(s,e,t){let i=new vn,n=new ne,r=new ne,a=new yt,o=new Jl,l=new Zl,c={},h=t.maxTextureSize,u={[Hi]:ni,[ni]:Hi,[Rt]:Rt},d=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:w_,fragmentShader:E_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new nt;g.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ze(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ns;let m=this.type;this.render=function(v,A,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||v.length===0)return;this.type===sp&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ns);let w=s.getRenderTarget(),T=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),D=s.state;D.setBlending(zt),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let P=m!==this.type;P&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(F=>F.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,F=v.length;I<F;I++){let H=v[I],V=H.shadow;if(V===void 0){ke("WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;n.copy(V.mapSize);let ee=V.getFrameExtents();n.multiply(ee),r.copy(V.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/ee.x),n.x=r.x*ee.x,V.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/ee.y),n.y=r.y*ee.y,V.mapSize.y=r.y));let G=s.state.buffers.depth.getReversed();if(V.camera._reversedDepth=G,V.map===null||P===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Or){if(H.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Bt(n.x,n.y,{format:hs,type:Yt,minFilter:kt,magFilter:kt,generateMipmaps:!1}),V.map.texture.name=H.name+".shadowMap",V.map.depthTexture=new _n(n.x,n.y,Fi),V.map.depthTexture.name=H.name+".shadowMapDepth",V.map.depthTexture.format=gn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Dt,V.map.depthTexture.magFilter=Dt}else H.isPointLight?(V.map=new Xr(n.x),V.map.depthTexture=new Vl(n.x,an)):(V.map=new Bt(n.x,n.y),V.map.depthTexture=new _n(n.x,n.y,an)),V.map.depthTexture.name=H.name+".shadowMap",V.map.depthTexture.format=gn,this.type===Ns?(V.map.depthTexture.compareFunction=G?Kc:jc,V.map.depthTexture.minFilter=kt,V.map.depthTexture.magFilter=kt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Dt,V.map.depthTexture.magFilter=Dt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==n.x||V.map.height!==n.y)&&V.map.setSize(n.x,n.y);let K=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();H.isPointLight!==!0&&V.updateMatrices(H,b);for(let j=0;j<K;j++){let me=V.getCamera(j);if(H.isPointLight){let he=V.camera,Le=V.matrix,ve=H.distance||he.far;ve!==he.far&&(he.far=ve,he.updateProjectionMatrix()),Co.setFromMatrixPosition(H.matrixWorld),he.position.copy(Co),$u.copy(he.position),$u.add(T_[j]),he.up.copy(A_[j]),he.lookAt($u),he.updateMatrixWorld(),Le.makeTranslation(-Co.x,-Co.y,-Co.z),hm.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),V._frustum.setFromProjectionMatrix(hm,he.coordinateSystem,he.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)s.setRenderTarget(V.map,j),s.clear();else{j===0&&(s.setRenderTarget(V.map),s.clear());let he=V.getViewport(j);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),D.viewport(a)}i=V.getFrustum(j),x(A,b,me,H,this.type)}V.isPointLightShadow!==!0&&this.type===Or&&_(V,b),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(w,T,C)};function _(v,A){let b=e.update(y);d.defines.VSM_SAMPLES!==v.blurSamples&&(d.defines.VSM_SAMPLES=v.blurSamples,f.defines.VSM_SAMPLES=v.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),v.mapPass===null?v.mapPass=new Bt(n.x,n.y,{format:hs,type:Yt}):(v.mapPass.width!==v.map.width||v.mapPass.height!==v.map.height)&&v.mapPass.setSize(v.map.width,v.map.height),d.uniforms.shadow_pass.value=v.map.depthTexture,d.uniforms.resolution.value.set(v.map.width,v.map.height),d.uniforms.radius.value=v.radius,s.setRenderTarget(v.mapPass),s.clear(),s.renderBufferDirect(A,null,b,d,y,null),f.uniforms.shadow_pass.value=v.mapPass.texture,f.uniforms.resolution.value.set(v.map.width,v.map.height),f.uniforms.radius.value=v.radius,s.setRenderTarget(v.map),s.clear(),s.renderBufferDirect(A,null,b,f,y,null)}function S(v,A,b,w){let T=null,C=b.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(C!==void 0)T=C;else if(T=b.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let D=T.uuid,P=A.uuid,I=c[D];I===void 0&&(I={},c[D]=I);let F=I[P];F===void 0&&(F=T.clone(),I[P]=F,A.addEventListener("dispose",M)),T=F}if(T.visible=A.visible,T.wireframe=A.wireframe,w===Or?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:u[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,b.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let D=s.properties.get(T);D.light=b}return T}function x(v,A,b,w,T){if(v.visible===!1)return;if(v.layers.test(A.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&T===Or)&&(!v.frustumCulled||v.intersectsFrustum(i))){v.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,v.matrixWorld);let P=e.update(v),I=v.material;if(Array.isArray(I)){let F=P.groups;for(let H=0,V=F.length;H<V;H++){let ee=F[H],G=I[ee.materialIndex];if(G&&G.visible){let K=S(v,G,w,T);v.onBeforeShadow(s,v,A,b,P,K,ee),s.renderBufferDirect(b,null,P,K,v,ee),v.onAfterShadow(s,v,A,b,P,K,ee)}}}else if(I.visible){let F=S(v,I,w,T);v.onBeforeShadow(s,v,A,b,P,F,null),s.renderBufferDirect(b,null,P,F,v,null),v.onAfterShadow(s,v,A,b,P,F,null)}}let D=v.children;for(let P=0,I=D.length;P<I;P++)x(D[P],A,b,w,T)}function M(v){v.target.removeEventListener("dispose",M);for(let b in c){let w=c[b],T=v.target.uuid;T in w&&(w[T].dispose(),delete w[T])}}}function C_(s,e){function t(){let k=!1,_e=new yt,ie=null,Me=new yt(0,0,0,0);return{setMask:function(Te){ie!==Te&&!k&&(s.colorMask(Te,Te,Te,Te),ie=Te)},setLocked:function(Te){k=Te},setClear:function(Te,re,Ve,Fe,Tt){Tt===!0&&(Te*=Fe,re*=Fe,Ve*=Fe),_e.set(Te,re,Ve,Fe),Me.equals(_e)===!1&&(s.clearColor(Te,re,Ve,Fe),Me.copy(_e))},reset:function(){k=!1,ie=null,Me.set(-1,0,0,0)}}}function i(){let k=!1,_e=!1,ie=null,Me=null,Te=null;return{setReversed:function(re){if(_e!==re){let Ve=e.get("EXT_clip_control");re?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),_e=re;let Fe=Te;Te=null,this.setClear(Fe)}},getReversed:function(){return _e},setTest:function(re){re?B(s.DEPTH_TEST):$(s.DEPTH_TEST)},setMask:function(re){ie!==re&&!k&&(s.depthMask(re),ie=re)},setFunc:function(re){if(_e&&(re=Fp[re]),Me!==re){switch(re){case Il:s.depthFunc(s.NEVER);break;case Dl:s.depthFunc(s.ALWAYS);break;case Ll:s.depthFunc(s.LESS);break;case gr:s.depthFunc(s.LEQUAL);break;case Nl:s.depthFunc(s.EQUAL);break;case Fl:s.depthFunc(s.GEQUAL);break;case Ul:s.depthFunc(s.GREATER);break;case Ol:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Me=re}},setLocked:function(re){k=re},setClear:function(re){Te!==re&&(Te=re,_e&&(re=1-re),s.clearDepth(re))},reset:function(){k=!1,ie=null,Me=null,Te=null,_e=!1}}}function n(){let k=!1,_e=null,ie=null,Me=null,Te=null,re=null,Ve=null,Fe=null,Tt=null;return{setTest:function(bt){k||(bt?B(s.STENCIL_TEST):$(s.STENCIL_TEST))},setMask:function(bt){_e!==bt&&!k&&(s.stencilMask(bt),_e=bt)},setFunc:function(bt,ji,un){(ie!==bt||Me!==ji||Te!==un)&&(s.stencilFunc(bt,ji,un),ie=bt,Me=ji,Te=un)},setOp:function(bt,ji,un){(re!==bt||Ve!==ji||Fe!==un)&&(s.stencilOp(bt,ji,un),re=bt,Ve=ji,Fe=un)},setLocked:function(bt){k=bt},setClear:function(bt){Tt!==bt&&(s.clearStencil(bt),Tt=bt)},reset:function(){k=!1,_e=null,ie=null,Me=null,Te=null,re=null,Ve=null,Fe=null,Tt=null}}}let r=new t,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],y=null,p=!1,m=null,_=null,S=null,x=null,M=null,v=null,A=null,b=new ze(0,0,0),w=0,T=!1,C=null,D=null,P=null,I=null,F=null,H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,ee=0,G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=ee>=1):G.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=ee>=2);let K=null,j={},me=s.getParameter(s.SCISSOR_BOX),he=s.getParameter(s.VIEWPORT),Le=new yt().fromArray(me),ve=new yt().fromArray(he);function Ne(k,_e,ie,Me){let Te=new Uint8Array(4),re=s.createTexture();s.bindTexture(k,re),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ve=0;Ve<ie;Ve++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(_e,0,s.RGBA,1,1,Me,0,s.RGBA,s.UNSIGNED_BYTE,Te):s.texImage2D(_e+Ve,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Te);return re}let Y={};Y[s.TEXTURE_2D]=Ne(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=Ne(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=Ne(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=Ne(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),B(s.DEPTH_TEST),a.setFunc(gr),ce(!1),pe(wu),B(s.CULL_FACE),le(zt);function B(k){h[k]!==!0&&(s.enable(k),h[k]=!0)}function $(k){h[k]!==!1&&(s.disable(k),h[k]=!1)}function fe(k,_e){return d[k]!==_e?(s.bindFramebuffer(k,_e),d[k]=_e,k===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=_e),k===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=_e),!0):!1}function oe(k,_e){let ie=g,Me=!1;if(k){ie=f.get(_e),ie===void 0&&(ie=[],f.set(_e,ie));let Te=k.textures;if(ie.length!==Te.length||ie[0]!==s.COLOR_ATTACHMENT0){for(let re=0,Ve=Te.length;re<Ve;re++)ie[re]=s.COLOR_ATTACHMENT0+re;ie.length=Te.length,Me=!0}}else ie[0]!==s.BACK&&(ie[0]=s.BACK,Me=!0);Me&&s.drawBuffers(ie)}function Ce(k){return y!==k?(s.useProgram(k),y=k,!0):!1}let Qe={[Vi]:s.FUNC_ADD,[rp]:s.FUNC_SUBTRACT,[ap]:s.FUNC_REVERSE_SUBTRACT};Qe[op]=s.MIN,Qe[lp]=s.MAX;let te={[Fs]:s.ZERO,[cp]:s.ONE,[hp]:s.SRC_COLOR,[Ru]:s.SRC_ALPHA,[pp]:s.SRC_ALPHA_SATURATE,[uo]:s.DST_COLOR,[ho]:s.DST_ALPHA,[up]:s.ONE_MINUS_SRC_COLOR,[Cu]:s.ONE_MINUS_SRC_ALPHA,[fp]:s.ONE_MINUS_DST_COLOR,[dp]:s.ONE_MINUS_DST_ALPHA,[mp]:s.CONSTANT_COLOR,[gp]:s.ONE_MINUS_CONSTANT_COLOR,[bp]:s.CONSTANT_ALPHA,[xp]:s.ONE_MINUS_CONSTANT_ALPHA};function le(k,_e,ie,Me,Te,re,Ve,Fe,Tt,bt){if(k===zt){p===!0&&($(s.BLEND),p=!1);return}if(p===!1&&(B(s.BLEND),p=!0),k!==ac){if(k!==m||bt!==T){if((_!==Vi||M!==Vi)&&(s.blendEquation(s.FUNC_ADD),_=Vi,M=Vi),bt)switch(k){case kr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Eu:s.blendFunc(s.ONE,s.ONE);break;case Tu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Au:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Xe("WebGLState: Invalid blending: ",k);break}else switch(k){case kr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Eu:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Tu:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Au:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",k);break}S=null,x=null,v=null,A=null,b.set(0,0,0),w=0,m=k,T=bt}return}Te=Te||_e,re=re||ie,Ve=Ve||Me,(_e!==_||Te!==M)&&(s.blendEquationSeparate(Qe[_e],Qe[Te]),_=_e,M=Te),(ie!==S||Me!==x||re!==v||Ve!==A)&&(s.blendFuncSeparate(te[ie],te[Me],te[re],te[Ve]),S=ie,x=Me,v=re,A=Ve),(Fe.equals(b)===!1||Tt!==w)&&(s.blendColor(Fe.r,Fe.g,Fe.b,Tt),b.copy(Fe),w=Tt),m=k,T=!1}function ue(k,_e){k.side===Rt?$(s.CULL_FACE):B(s.CULL_FACE);let ie=k.side===ni;_e&&(ie=!ie),ce(ie),k.blending===kr&&k.transparent===!1?le(zt):le(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let Me=k.stencilWrite;o.setTest(Me),Me&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ge(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?B(s.SAMPLE_ALPHA_TO_COVERAGE):$(s.SAMPLE_ALPHA_TO_COVERAGE)}function ce(k){C!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),C=k)}function pe(k){k!==ip?(B(s.CULL_FACE),k!==D&&(k===wu?s.cullFace(s.BACK):k===np?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):$(s.CULL_FACE),D=k}function We(k){k!==P&&(V&&s.lineWidth(k),P=k)}function Ge(k,_e,ie){k?(B(s.POLYGON_OFFSET_FILL),(I!==_e||F!==ie)&&(I=_e,F=ie,a.getReversed()&&(_e=-_e),s.polygonOffset(_e,ie))):$(s.POLYGON_OFFSET_FILL)}function qe(k){k?B(s.SCISSOR_TEST):$(s.SCISSOR_TEST)}function Ye(k){k===void 0&&(k=s.TEXTURE0+H-1),K!==k&&(s.activeTexture(k),K=k)}function U(k,_e,ie){ie===void 0&&(K===null?ie=s.TEXTURE0+H-1:ie=K);let Me=j[ie];Me===void 0&&(Me={type:void 0,texture:void 0},j[ie]=Me),(Me.type!==k||Me.texture!==_e)&&(K!==ie&&(s.activeTexture(ie),K=ie),s.bindTexture(k,_e||Y[k]),Me.type=k,Me.texture=_e)}function dt(){let k=j[K];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function et(){try{s.compressedTexImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function L(){try{s.compressedTexImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function E(){try{s.texSubImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function z(){try{s.texSubImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function de(){try{s.texStorage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function ge(){try{s.texStorage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function Q(){try{s.texImage2D(...arguments)}catch(k){Xe("WebGLState:",k)}}function se(){try{s.texImage3D(...arguments)}catch(k){Xe("WebGLState:",k)}}function ye(k){return u[k]!==void 0?u[k]:s.getParameter(k)}function Ue(k,_e){u[k]!==_e&&(s.pixelStorei(k,_e),u[k]=_e)}function xe(k){Le.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),Le.copy(k))}function be(k){ve.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),ve.copy(k))}function Pe(k,_e){let ie=c.get(_e);ie===void 0&&(ie=new WeakMap,c.set(_e,ie));let Me=ie.get(k);Me===void 0&&(Me=s.getUniformBlockIndex(_e,k.name),ie.set(k,Me))}function He(k,_e){let Me=c.get(_e).get(k);l.get(_e)!==Me&&(s.uniformBlockBinding(_e,Me,k.__bindingPointIndex),l.set(_e,Me))}function Je(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},K=null,j={},d={},f=new WeakMap,g=[],y=null,p=!1,m=null,_=null,S=null,x=null,M=null,v=null,A=null,b=new ze(0,0,0),w=0,T=!1,C=null,D=null,P=null,I=null,F=null,Le.set(0,0,s.canvas.width,s.canvas.height),ve.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:B,disable:$,bindFramebuffer:fe,drawBuffers:oe,useProgram:Ce,setBlending:le,setMaterial:ue,setFlipSided:ce,setCullFace:pe,setLineWidth:We,setPolygonOffset:Ge,setScissorTest:qe,activeTexture:Ye,bindTexture:U,unbindTexture:dt,compressedTexImage2D:et,compressedTexImage3D:L,texImage2D:Q,texImage3D:se,pixelStorei:Ue,getParameter:ye,updateUBOMapping:Pe,uniformBlockBinding:He,texStorage2D:de,texStorage3D:ge,texSubImage2D:E,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:Z,scissor:xe,viewport:be,reset:Je}}function P_(s,e,t,i,n,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap,u=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(L,E){return g?new OffscreenCanvas(L,E):vr("canvas")}function p(L,E,z){let W=1,Z=et(L);if((Z.width>z||Z.height>z)&&(W=z/Math.max(Z.width,Z.height)),W<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let de=Math.floor(W*Z.width),ge=Math.floor(W*Z.height);d===void 0&&(d=y(de,ge));let Q=E?y(de,ge):d;return Q.width=de,Q.height=ge,Q.getContext("2d").drawImage(L,0,0,de,ge),ke("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+de+"x"+ge+")."),Q}else return"data"in L&&ke("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),L;return L}function m(L){return L.generateMipmaps}function _(L){s.generateMipmap(L)}function S(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(L,E,z,W,Z,de=!1){if(L!==null){if(s[L]!==void 0)return s[L];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ge;W&&(ge=e.get("EXT_texture_norm16"),ge||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===s.RED&&(z===s.FLOAT&&(Q=s.R32F),z===s.HALF_FLOAT&&(Q=s.R16F),z===s.UNSIGNED_BYTE&&(Q=s.R8),z===s.UNSIGNED_SHORT&&ge&&(Q=ge.R16_EXT),z===s.SHORT&&ge&&(Q=ge.R16_SNORM_EXT)),E===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.R8UI),z===s.UNSIGNED_SHORT&&(Q=s.R16UI),z===s.UNSIGNED_INT&&(Q=s.R32UI),z===s.BYTE&&(Q=s.R8I),z===s.SHORT&&(Q=s.R16I),z===s.INT&&(Q=s.R32I)),E===s.RG&&(z===s.FLOAT&&(Q=s.RG32F),z===s.HALF_FLOAT&&(Q=s.RG16F),z===s.UNSIGNED_BYTE&&(Q=s.RG8),z===s.UNSIGNED_SHORT&&ge&&(Q=ge.RG16_EXT),z===s.SHORT&&ge&&(Q=ge.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RG8UI),z===s.UNSIGNED_SHORT&&(Q=s.RG16UI),z===s.UNSIGNED_INT&&(Q=s.RG32UI),z===s.BYTE&&(Q=s.RG8I),z===s.SHORT&&(Q=s.RG16I),z===s.INT&&(Q=s.RG32I)),E===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),z===s.UNSIGNED_INT&&(Q=s.RGB32UI),z===s.BYTE&&(Q=s.RGB8I),z===s.SHORT&&(Q=s.RGB16I),z===s.INT&&(Q=s.RGB32I)),E===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),z===s.UNSIGNED_INT&&(Q=s.RGBA32UI),z===s.BYTE&&(Q=s.RGBA8I),z===s.SHORT&&(Q=s.RGBA16I),z===s.INT&&(Q=s.RGBA32I)),E===s.RGB&&(z===s.UNSIGNED_SHORT&&ge&&(Q=ge.RGB16_EXT),z===s.SHORT&&ge&&(Q=ge.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),E===s.RGBA){let se=de?Ra:tt.getTransfer(Z);z===s.FLOAT&&(Q=s.RGBA32F),z===s.HALF_FLOAT&&(Q=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Q=se===mt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&ge&&(Q=ge.RGBA16_EXT),z===s.SHORT&&ge&&(Q=ge.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function M(L,E){let z;return L?E===null||E===an||E===cs?z=s.DEPTH24_STENCIL8:E===Fi?z=s.DEPTH32F_STENCIL8:E===zr&&(z=s.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===an||E===cs?z=s.DEPTH_COMPONENT24:E===Fi?z=s.DEPTH_COMPONENT32F:E===zr&&(z=s.DEPTH_COMPONENT16),z}function v(L,E){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Dt&&L.minFilter!==kt?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function A(L){let E=L.target;E.removeEventListener("dispose",A),w(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function b(L){let E=L.target;E.removeEventListener("dispose",b),C(E)}function w(L){let E=i.get(L);if(E.__webglInit===void 0)return;let z=L.source,W=f.get(z);if(W){let Z=W[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(L),Object.keys(W).length===0&&f.delete(z)}i.remove(L)}function T(L){let E=i.get(L);s.deleteTexture(E.__webglTexture);let z=L.source,W=f.get(z);delete W[E.__cacheKey],a.memory.textures--}function C(L){let E=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(E.__webglFramebuffer[W]))for(let Z=0;Z<E.__webglFramebuffer[W].length;Z++)s.deleteFramebuffer(E.__webglFramebuffer[W][Z]);else s.deleteFramebuffer(E.__webglFramebuffer[W]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[W])}else{if(Array.isArray(E.__webglFramebuffer))for(let W=0;W<E.__webglFramebuffer.length;W++)s.deleteFramebuffer(E.__webglFramebuffer[W]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let W=0;W<E.__webglColorRenderbuffer.length;W++)E.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[W]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let z=L.textures;for(let W=0,Z=z.length;W<Z;W++){let de=i.get(z[W]);de.__webglTexture&&(s.deleteTexture(de.__webglTexture),a.memory.textures--),i.remove(z[W])}i.remove(L)}let D=0;function P(){D=0}function I(){return D}function F(L){D=L}function H(){let L=D;return L>=n.maxTextures&&ke("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+n.maxTextures),D+=1,L}function V(L){let E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function ee(L,E){let z=i.get(L);if(L.isVideoTexture&&U(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&z.__version!==L.version){let W=L.image;if(W===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{$(z,L,E);return}}else L.isExternalTexture&&(z.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+E)}function G(L,E){let z=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&z.__version!==L.version){$(z,L,E);return}else L.isExternalTexture&&(z.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+E)}function K(L,E){let z=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&z.__version!==L.version){$(z,L,E);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+E)}function j(L,E){let z=i.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&z.__version!==L.version){fe(z,L,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+E)}let me={[ci]:s.REPEAT,[zi]:s.CLAMP_TO_EDGE,[br]:s.MIRRORED_REPEAT},he={[Dt]:s.NEAREST,[cc]:s.NEAREST_MIPMAP_NEAREST,[ks]:s.NEAREST_MIPMAP_LINEAR,[kt]:s.LINEAR,[Br]:s.LINEAR_MIPMAP_NEAREST,[rn]:s.LINEAR_MIPMAP_LINEAR},Le={[Tp]:s.NEVER,[Ip]:s.ALWAYS,[Ap]:s.LESS,[jc]:s.LEQUAL,[Rp]:s.EQUAL,[Kc]:s.GEQUAL,[Cp]:s.GREATER,[Pp]:s.NOTEQUAL};function ve(L,E){if(E.type===Fi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===kt||E.magFilter===Br||E.magFilter===ks||E.magFilter===rn||E.minFilter===kt||E.minFilter===Br||E.minFilter===ks||E.minFilter===rn)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,me[E.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,me[E.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,me[E.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,he[E.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,he[E.minFilter]),E.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Le[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Dt||E.minFilter!==ks&&E.minFilter!==rn||E.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(L,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,n.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Ne(L,E){let z=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",A));let W=E.source,Z=f.get(W);Z===void 0&&(Z={},f.set(W,Z));let de=V(E);if(de!==L.__cacheKey){Z[de]===void 0&&(Z[de]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Z[de].usedTimes++;let ge=Z[L.__cacheKey];ge!==void 0&&(Z[L.__cacheKey].usedTimes--,ge.usedTimes===0&&T(E)),L.__cacheKey=de,L.__webglTexture=Z[de].texture}return z}function Y(L,E,z){return Math.floor(Math.floor(L/z)/E)}function B(L,E,z,W){let de=L.updateRanges;if(de.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,z,W,E.data);else{de.sort((Ue,xe)=>Ue.start-xe.start);let ge=0;for(let Ue=1;Ue<de.length;Ue++){let xe=de[ge],be=de[Ue],Pe=xe.start+xe.count,He=Y(be.start,E.width,4),Je=Y(xe.start,E.width,4);be.start<=Pe+1&&He===Je&&Y(be.start+be.count-1,E.width,4)===He?xe.count=Math.max(xe.count,be.start+be.count-xe.start):(++ge,de[ge]=be)}de.length=ge+1;let Q=t.getParameter(s.UNPACK_ROW_LENGTH),se=t.getParameter(s.UNPACK_SKIP_PIXELS),ye=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let Ue=0,xe=de.length;Ue<xe;Ue++){let be=de[Ue],Pe=Math.floor(be.start/4),He=Math.ceil(be.count/4),Je=Pe%E.width,k=Math.floor(Pe/E.width),_e=He,ie=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(s.UNPACK_SKIP_ROWS,k),t.texSubImage2D(s.TEXTURE_2D,0,Je,k,_e,ie,z,W,E.data)}L.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Q),t.pixelStorei(s.UNPACK_SKIP_PIXELS,se),t.pixelStorei(s.UNPACK_SKIP_ROWS,ye)}}function $(L,E,z){let W=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(W=s.TEXTURE_3D);let Z=Ne(L,E),de=E.source;t.bindTexture(W,L.__webglTexture,s.TEXTURE0+z);let ge=i.get(de);if(de.version!==ge.__version||Z===!0){if(t.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let ie=tt.getPrimaries(tt.workingColorSpace),Me=E.colorSpace===Xn?null:tt.getPrimaries(E.colorSpace),Te=E.colorSpace===Xn||ie===Me?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let se=p(E.image,!1,n.maxTextureSize);se=dt(E,se);let ye=r.convert(E.format,E.colorSpace),Ue=r.convert(E.type),xe=x(E.internalFormat,ye,Ue,E.normalized,E.colorSpace,E.isVideoTexture);ve(W,E);let be,Pe=E.mipmaps,He=E.isVideoTexture!==!0,Je=ge.__version===void 0||Z===!0,k=de.dataReady,_e=v(E,se);if(E.isDepthTexture)xe=M(E.format===En,E.type),Je&&(He?t.texStorage2D(s.TEXTURE_2D,1,xe,se.width,se.height):t.texImage2D(s.TEXTURE_2D,0,xe,se.width,se.height,0,ye,Ue,null));else if(E.isDataTexture)if(Pe.length>0){He&&Je&&t.texStorage2D(s.TEXTURE_2D,_e,xe,Pe[0].width,Pe[0].height);for(let ie=0,Me=Pe.length;ie<Me;ie++)be=Pe[ie],He?k&&t.texSubImage2D(s.TEXTURE_2D,ie,0,0,be.width,be.height,ye,Ue,be.data):t.texImage2D(s.TEXTURE_2D,ie,xe,be.width,be.height,0,ye,Ue,be.data);E.generateMipmaps=!1}else He?(Je&&t.texStorage2D(s.TEXTURE_2D,_e,xe,se.width,se.height),k&&B(E,se,ye,Ue)):t.texImage2D(s.TEXTURE_2D,0,xe,se.width,se.height,0,ye,Ue,se.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){He&&Je&&t.texStorage3D(s.TEXTURE_2D_ARRAY,_e,xe,Pe[0].width,Pe[0].height,se.depth);for(let ie=0,Me=Pe.length;ie<Me;ie++)if(be=Pe[ie],E.format!==Mi)if(ye!==null)if(He){if(k)if(E.layerUpdates.size>0){let Te=Xu(be.width,be.height,E.format,E.type);for(let re of E.layerUpdates){let Ve=be.data.subarray(re*Te/be.data.BYTES_PER_ELEMENT,(re+1)*Te/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,re,be.width,be.height,1,ye,Ve)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,be.width,be.height,se.depth,ye,be.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ie,xe,be.width,be.height,se.depth,0,be.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?k&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,be.width,be.height,se.depth,ye,Ue,be.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ie,xe,be.width,be.height,se.depth,0,ye,Ue,be.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{He&&Je&&t.texStorage2D(s.TEXTURE_2D,_e,xe,Pe[0].width,Pe[0].height);for(let ie=0,Me=Pe.length;ie<Me;ie++)be=Pe[ie],E.format!==Mi?ye!==null?He?k&&t.compressedTexSubImage2D(s.TEXTURE_2D,ie,0,0,be.width,be.height,ye,be.data):t.compressedTexImage2D(s.TEXTURE_2D,ie,xe,be.width,be.height,0,be.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?k&&t.texSubImage2D(s.TEXTURE_2D,ie,0,0,be.width,be.height,ye,Ue,be.data):t.texImage2D(s.TEXTURE_2D,ie,xe,be.width,be.height,0,ye,Ue,be.data)}else if(E.isDataArrayTexture)if(He){if(Je&&t.texStorage3D(s.TEXTURE_2D_ARRAY,_e,xe,se.width,se.height,se.depth),k)if(E.layerUpdates.size>0){let ie=Xu(se.width,se.height,E.format,E.type);for(let Me of E.layerUpdates){let Te=se.data.subarray(Me*ie/se.data.BYTES_PER_ELEMENT,(Me+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Me,se.width,se.height,1,ye,Ue,Te)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ye,Ue,se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,xe,se.width,se.height,se.depth,0,ye,Ue,se.data);else if(E.isData3DTexture)He?(Je&&t.texStorage3D(s.TEXTURE_3D,_e,xe,se.width,se.height,se.depth),k&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ye,Ue,se.data)):t.texImage3D(s.TEXTURE_3D,0,xe,se.width,se.height,se.depth,0,ye,Ue,se.data);else if(E.isFramebufferTexture){if(Je)if(He)t.texStorage2D(s.TEXTURE_2D,_e,xe,se.width,se.height);else{let ie=se.width,Me=se.height;for(let Te=0;Te<_e;Te++)t.texImage2D(s.TEXTURE_2D,Te,xe,ie,Me,0,ye,Ue,null),ie>>=1,Me>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){let ie=s.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),se.parentNode!==ie){ie.appendChild(se),u.add(E),ie.onpaint=Me=>{let Te=Me.changedElements;for(let re of u)Te.includes(re.image)&&(re.needsUpdate=!0)},ie.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,se);else{let Te=s.RGBA,re=s.RGBA,Ve=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Te,re,Ve,se)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(He&&Je){let ie=et(Pe[0]);t.texStorage2D(s.TEXTURE_2D,_e,xe,ie.width,ie.height)}for(let ie=0,Me=Pe.length;ie<Me;ie++)be=Pe[ie],He?k&&t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ye,Ue,be):t.texImage2D(s.TEXTURE_2D,ie,xe,ye,Ue,be);E.generateMipmaps=!1}else if(He){if(Je){let ie=et(se);t.texStorage2D(s.TEXTURE_2D,_e,xe,ie.width,ie.height)}k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ye,Ue,se)}else t.texImage2D(s.TEXTURE_2D,0,xe,ye,Ue,se);m(E)&&_(W),ge.__version=de.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function fe(L,E,z){if(E.image.length!==6)return;let W=Ne(L,E),Z=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+z);let de=i.get(Z);if(Z.version!==de.__version||W===!0){t.activeTexture(s.TEXTURE0+z);let ge=tt.getPrimaries(tt.workingColorSpace),Q=E.colorSpace===Xn?null:tt.getPrimaries(E.colorSpace),se=E.colorSpace===Xn||ge===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ye=E.isCompressedTexture||E.image[0].isCompressedTexture,Ue=E.image[0]&&E.image[0].isDataTexture,xe=[];for(let re=0;re<6;re++)!ye&&!Ue?xe[re]=p(E.image[re],!0,n.maxCubemapSize):xe[re]=Ue?E.image[re].image:E.image[re],xe[re]=dt(E,xe[re]);let be=xe[0],Pe=r.convert(E.format,E.colorSpace),He=r.convert(E.type),Je=x(E.internalFormat,Pe,He,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,_e=de.__version===void 0||W===!0,ie=Z.dataReady,Me=v(E,be);ve(s.TEXTURE_CUBE_MAP,E);let Te;if(ye){k&&_e&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Me,Je,be.width,be.height);for(let re=0;re<6;re++){Te=xe[re].mipmaps;for(let Ve=0;Ve<Te.length;Ve++){let Fe=Te[Ve];E.format!==Mi?Pe!==null?k?ie&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve,0,0,Fe.width,Fe.height,Pe,Fe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve,Je,Fe.width,Fe.height,0,Fe.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve,0,0,Fe.width,Fe.height,Pe,He,Fe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve,Je,Fe.width,Fe.height,0,Pe,He,Fe.data)}}}else{if(Te=E.mipmaps,k&&_e){Te.length>0&&Me++;let re=et(xe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Me,Je,re.width,re.height)}for(let re=0;re<6;re++)if(Ue){k?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,xe[re].width,xe[re].height,Pe,He,xe[re].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Je,xe[re].width,xe[re].height,0,Pe,He,xe[re].data);for(let Ve=0;Ve<Te.length;Ve++){let Tt=Te[Ve].image[re].image;k?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve+1,0,0,Tt.width,Tt.height,Pe,He,Tt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve+1,Je,Tt.width,Tt.height,0,Pe,He,Tt.data)}}else{k?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Pe,He,xe[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Je,Pe,He,xe[re]);for(let Ve=0;Ve<Te.length;Ve++){let Fe=Te[Ve];k?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve+1,0,0,Pe,He,Fe.image[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ve+1,Je,Pe,He,Fe.image[re])}}}m(E)&&_(s.TEXTURE_CUBE_MAP),de.__version=Z.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function oe(L,E,z,W,Z,de){let ge=r.convert(z.format,z.colorSpace),Q=r.convert(z.type),se=x(z.internalFormat,ge,Q,z.normalized,z.colorSpace),ye=i.get(E),Ue=i.get(z);if(Ue.__renderTarget=E,!ye.__hasExternalTextures){let xe=Math.max(1,E.width>>de),be=Math.max(1,E.height>>de);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,de,se,xe,be,E.depth,0,ge,Q,null):t.texImage2D(Z,de,se,xe,be,0,ge,Q,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Ye(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,Z,Ue.__webglTexture,0,qe(E)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,Z,Ue.__webglTexture,de),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ce(L,E,z){if(s.bindRenderbuffer(s.RENDERBUFFER,L),E.depthBuffer){let W=E.depthTexture,Z=W&&W.isDepthTexture?W.type:null,de=M(E.stencilBuffer,Z),ge=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ye(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe(E),de,E.width,E.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe(E),de,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,de,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,L)}else{let W=E.textures;for(let Z=0;Z<W.length;Z++){let de=W[Z],ge=r.convert(de.format,de.colorSpace),Q=r.convert(de.type),se=x(de.internalFormat,ge,Q,de.normalized,de.colorSpace);Ye(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe(E),se,E.width,E.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe(E),se,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,se,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Qe(L,E,z){let W=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(E.depthTexture);if(Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,E.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),ve(s.TEXTURE_CUBE_MAP,E.depthTexture);let ye=r.convert(E.depthTexture.format),Ue=r.convert(E.depthTexture.type),xe;E.depthTexture.format===gn?xe=s.DEPTH_COMPONENT24:E.depthTexture.format===En&&(xe=s.DEPTH24_STENCIL8);for(let be=0;be<6;be++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,xe,E.width,E.height,0,ye,Ue,null)}}else ee(E.depthTexture,0);let de=Z.__webglTexture,ge=qe(E),Q=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,se=E.depthTexture.format===En?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===gn)Ye(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,Q,de,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,se,Q,de,0);else if(E.depthTexture.format===En)Ye(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,Q,de,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,se,Q,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function te(L){let E=i.get(L),z=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){let W=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),W){let Z=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,W.removeEventListener("dispose",Z)};W.addEventListener("dispose",Z),E.__depthDisposeCallback=Z}E.__boundDepthTexture=W}if(L.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)Qe(E.__webglFramebuffer[W],L,W);else{let W=L.texture.mipmaps;W&&W.length>0?Qe(E.__webglFramebuffer[0],L,0):Qe(E.__webglFramebuffer,L,0)}else if(z){E.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[W]),E.__webglDepthbuffer[W]===void 0)E.__webglDepthbuffer[W]=s.createRenderbuffer(),Ce(E.__webglDepthbuffer[W],L,!1);else{let Z=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=E.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,de),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,de)}}else{let W=L.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Ce(E.__webglDepthbuffer,L,!1);else{let Z=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,de),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,de)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function le(L,E,z){let W=i.get(L);E!==void 0&&oe(W.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&te(L)}function ue(L){let E=L.texture,z=i.get(L),W=i.get(E);L.addEventListener("dispose",b);let Z=L.textures,de=L.isWebGLCubeRenderTarget===!0,ge=Z.length>1;if(ge||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=E.version,a.memory.textures++),de){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let se=0;se<E.mipmaps.length;se++)z.__webglFramebuffer[Q][se]=s.createFramebuffer()}else z.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)z.__webglFramebuffer[Q]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ge)for(let Q=0,se=Z.length;Q<se;Q++){let ye=i.get(Z[Q]);ye.__webglTexture===void 0&&(ye.__webglTexture=s.createTexture(),a.memory.textures++)}if(L.samples>0&&Ye(L)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){let se=Z[Q];z.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);let ye=r.convert(se.format,se.colorSpace),Ue=r.convert(se.type),xe=x(se.internalFormat,ye,Ue,se.normalized,se.colorSpace,L.isXRRenderTarget===!0),be=qe(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,be,xe,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),Ce(z.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(de){t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),ve(s.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0)for(let se=0;se<E.mipmaps.length;se++)oe(z.__webglFramebuffer[Q][se],L,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se);else oe(z.__webglFramebuffer[Q],L,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(E)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let Q=0,se=Z.length;Q<se;Q++){let ye=Z[Q],Ue=i.get(ye),xe=s.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(xe=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(xe,Ue.__webglTexture),ve(xe,ye),oe(z.__webglFramebuffer,L,ye,s.COLOR_ATTACHMENT0+Q,xe,0),m(ye)&&_(xe)}t.unbindTexture()}else{let Q=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Q=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Q,W.__webglTexture),ve(Q,E),E.mipmaps&&E.mipmaps.length>0)for(let se=0;se<E.mipmaps.length;se++)oe(z.__webglFramebuffer[se],L,E,s.COLOR_ATTACHMENT0,Q,se);else oe(z.__webglFramebuffer,L,E,s.COLOR_ATTACHMENT0,Q,0);m(E)&&_(Q),t.unbindTexture()}L.depthBuffer&&te(L)}function ce(L){let E=L.textures;for(let z=0,W=E.length;z<W;z++){let Z=E[z];if(m(Z)){let de=S(L),ge=i.get(Z).__webglTexture;t.bindTexture(de,ge),_(de),t.unbindTexture()}}}let pe=[],We=[];function Ge(L){if(L.samples>0){if(Ye(L)===!1){let E=L.textures,z=L.width,W=L.height,Z=s.COLOR_BUFFER_BIT,de=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=i.get(L),Q=E.length>1;if(Q)for(let ye=0;ye<E.length;ye++)t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);let se=L.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let ye=0;ye<E.length;ye++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ge.__webglColorRenderbuffer[ye]);let Ue=i.get(E[ye]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ue,0)}s.blitFramebuffer(0,0,z,W,0,0,z,W,Z,s.NEAREST),l===!0&&(pe.length=0,We.length=0,pe.push(s.COLOR_ATTACHMENT0+ye),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(pe.push(de),We.push(de),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,We)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let ye=0;ye<E.length;ye++){t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.RENDERBUFFER,ge.__webglColorRenderbuffer[ye]);let Ue=i.get(E[ye]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.TEXTURE_2D,Ue,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&l){let E=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function qe(L){return Math.min(n.maxSamples,L.samples)}function Ye(L){let E=i.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function U(L){let E=a.render.frame;h.get(L)!==E&&(h.set(L,E),L.update())}function dt(L,E){let z=L.colorSpace,W=L.format,Z=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||z!==xi&&z!==Xn&&(tt.getTransfer(z)===mt?(W!==Mi||Z!==di)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",z)),E}function et(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=P,this.getTextureUnits=I,this.setTextureUnits=F,this.setTexture2D=ee,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=j,this.rebindTextures=le,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=Ye,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function I_(s,e){function t(i,n=Xn){let r,a=tt.getTransfer(n);if(i===di)return s.UNSIGNED_BYTE;if(i===uc)return s.UNSIGNED_SHORT_4_4_4_4;if(i===dc)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Nu)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Fu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Du)return s.BYTE;if(i===Lu)return s.SHORT;if(i===zr)return s.UNSIGNED_SHORT;if(i===hc)return s.INT;if(i===an)return s.UNSIGNED_INT;if(i===Fi)return s.FLOAT;if(i===Yt)return s.HALF_FLOAT;if(i===Uu)return s.ALPHA;if(i===Ou)return s.RGB;if(i===Mi)return s.RGBA;if(i===gn)return s.DEPTH_COMPONENT;if(i===En)return s.DEPTH_STENCIL;if(i===fc)return s.RED;if(i===pc)return s.RED_INTEGER;if(i===hs)return s.RG;if(i===mc)return s.RG_INTEGER;if(i===gc)return s.RGBA_INTEGER;if(i===yo||i===_o||i===Mo||i===So)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===yo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===yo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_o)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===So)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bc||i===xc||i===vc||i===yc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_c||i===Mc||i===Sc||i===wc||i===Ec||i===wo||i===Tc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===_c||i===Mc)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Sc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===wc)return r.COMPRESSED_R11_EAC;if(i===Ec)return r.COMPRESSED_SIGNED_R11_EAC;if(i===wo)return r.COMPRESSED_RG11_EAC;if(i===Tc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ac||i===Rc||i===Cc||i===Pc||i===Ic||i===Dc||i===Lc||i===Nc||i===Fc||i===Uc||i===Oc||i===kc||i===Bc||i===zc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ac)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Rc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Cc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ic)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Dc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Lc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Oc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===kc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Gc||i===Hc||i===Vc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Gc)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Hc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wc||i===qc||i===Eo||i===Xc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Wc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===qc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Eo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cs?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}var D_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L_=`
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

}`,ad=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ga(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Lt({vertexShader:D_,fragmentShader:L_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new $a(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},od=class extends bn{constructor(e,t){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,y=typeof XRWebGLBinding<"u",p=new ad,m={},_=t.getContextAttributes(),S=null,x=null,M=[],v=[],A=new ne,b=null,w=null,T=new qt;T.viewport=new yt;let C=new qt;C.viewport=new yt;let D=[T,C],P=new rc,I=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let B=M[Y];return B===void 0&&(B=new Sr,M[Y]=B),B.getTargetRaySpace()},this.getControllerGrip=function(Y){let B=M[Y];return B===void 0&&(B=new Sr,M[Y]=B),B.getGripSpace()},this.getHand=function(Y){let B=M[Y];return B===void 0&&(B=new Sr,M[Y]=B),B.getHandSpace()};function H(Y){let B=v.indexOf(Y.inputSource);if(B===-1)return;let $=M[B];$!==void 0&&($.update(Y.inputSource,Y.frame,c||a),$.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){n.removeEventListener("select",H),n.removeEventListener("selectstart",H),n.removeEventListener("selectend",H),n.removeEventListener("squeeze",H),n.removeEventListener("squeezestart",H),n.removeEventListener("squeezeend",H),n.removeEventListener("end",V),n.removeEventListener("inputsourceschange",ee);for(let Y=0;Y<M.length;Y++){let B=v[Y];B!==null&&(v[Y]=null,M[Y].disconnect(B))}I=null,F=null,p.reset();for(let Y in m)delete m[Y];if(e.setRenderTarget(S),f=null,d=null,u=null,n=null,x=null,Ne.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(A.width,A.height,!1),w!==null){let Y=w.camera;Y.fov=w.fov,Y.zoom=w.zoom,Y.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(n,t)),u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(Y){if(n=Y,n!==null){if(S=e.getRenderTarget(),n.addEventListener("select",H),n.addEventListener("selectstart",H),n.addEventListener("selectend",H),n.addEventListener("squeeze",H),n.addEventListener("squeezestart",H),n.addEventListener("squeezeend",H),n.addEventListener("end",V),n.addEventListener("inputsourceschange",ee),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let $=null,fe=null,oe=null;_.depth&&(oe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=_.stencil?En:gn,fe=_.stencil?cs:an);let Ce={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ce),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Bt(d.textureWidth,d.textureHeight,{format:Mi,type:di,depthTexture:new _n(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let $={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,t,$),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Bt(f.framebufferWidth,f.framebufferHeight,{format:Mi,type:di,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),Ne.setContext(n),Ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ee(Y){for(let B=0;B<Y.removed.length;B++){let $=Y.removed[B],fe=v.indexOf($);fe>=0&&(v[fe]=null,M[fe].disconnect($))}for(let B=0;B<Y.added.length;B++){let $=Y.added[B],fe=v.indexOf($);if(fe===-1){for(let Ce=0;Ce<M.length;Ce++)if(Ce>=v.length){v.push($),fe=Ce;break}else if(v[Ce]===null){v[Ce]=$,fe=Ce;break}if(fe===-1)break}let oe=M[fe];oe&&oe.connect($)}}let G=new N,K=new N;function j(Y,B,$){G.setFromMatrixPosition(B.matrixWorld),K.setFromMatrixPosition($.matrixWorld);let fe=G.distanceTo(K),oe=B.projectionMatrix.elements,Ce=$.projectionMatrix.elements,Qe=oe[14]/(oe[10]-1),te=oe[14]/(oe[10]+1),le=(oe[9]+1)/oe[5],ue=(oe[9]-1)/oe[5],ce=(oe[8]-1)/oe[0],pe=(Ce[8]+1)/Ce[0],We=Qe*ce,Ge=Qe*pe,qe=fe/(-ce+pe),Ye=qe*-ce;if(B.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ye),Y.translateZ(qe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),oe[10]===-1)Y.projectionMatrix.copy(B.projectionMatrix),Y.projectionMatrixInverse.copy(B.projectionMatrixInverse);else{let U=Qe+qe,dt=te+qe,et=We-Ye,L=Ge+(fe-Ye),E=le*te/dt*U,z=ue*te/dt*U;Y.projectionMatrix.makePerspective(et,L,E,z,U,dt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function me(Y,B){B===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(B.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(n===null)return;let B=Y.near,$=Y.far;p.texture!==null&&(p.depthNear>0&&(B=p.depthNear),p.depthFar>0&&($=p.depthFar)),P.near=C.near=T.near=B,P.far=C.far=T.far=$,(I!==P.near||F!==P.far)&&(n.updateRenderState({depthNear:P.near,depthFar:P.far}),I=P.near,F=P.far),P.layers.mask=Y.layers.mask|6,T.layers.mask=P.layers.mask&-5,C.layers.mask=P.layers.mask&-3;let fe=Y.parent,oe=P.cameras;me(P,fe);for(let Ce=0;Ce<oe.length;Ce++)me(oe[Ce],fe);oe.length===2?j(P,T,C):P.projectionMatrix.copy(T.projectionMatrix),w===null&&Y.isPerspectiveCamera&&(w={camera:Y,fov:Y.fov,zoom:Y.zoom}),he(Y,P,fe)};function he(Y,B,$){$===null?Y.matrix.copy(B.matrixWorld):(Y.matrix.copy($.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(B.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(B.projectionMatrix),Y.projectionMatrixInverse.copy(B.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ws*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(P)},this.getCameraTexture=function(Y){return m[Y]};let Le=null;function ve(Y,B){if(h=B.getViewerPose(c||a),g=B,h!==null){let $=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let fe=!1;$.length!==P.cameras.length&&(P.cameras.length=0,fe=!0);for(let te=0;te<$.length;te++){let le=$[te],ue=null;if(f!==null)ue=f.getViewport(le);else{let pe=u.getViewSubImage(d,le);ue=pe.viewport,te===0&&(e.setRenderTargetTextures(x,pe.colorTexture,pe.depthStencilTexture),e.setRenderTarget(x))}let ce=D[te];ce===void 0&&(ce=new qt,ce.layers.enable(te),ce.viewport=new yt,D[te]=ce),ce.matrix.fromArray(le.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(le.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(ue.x,ue.y,ue.width,ue.height),te===0&&(P.matrix.copy(ce.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),fe===!0&&P.cameras.push(ce)}let oe=n.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&y){u=i.getBinding();let te=u.getDepthInformation($[0]);te&&te.isValid&&te.texture&&p.init(te,n.renderState)}if(oe&&oe.includes("camera-access")&&y){e.state.unbindTexture(),u=i.getBinding();for(let te=0;te<$.length;te++){let le=$[te].camera;if(le){let ue=m[le];ue||(ue=new Ga,m[le]=ue);let ce=u.getCameraImage(le);ue.sourceTexture=ce}}}}for(let $=0;$<M.length;$++){let fe=v[$],oe=M[$];fe!==null&&oe!==void 0&&oe.update(fe,B,c||a)}Le&&Le(Y,B),B.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:B}),g=null}let Ne=new um;Ne.setAnimationLoop(ve),this.setAnimationLoop=function(Y){Le=Y},this.dispose=function(){}}},N_=new Be,bm=new $e;bm.set(-1,0,0,0,1,0,0,0,1);function F_(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Vu(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function n(p,m,_,S,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,x)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,_,S):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ni&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ni&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let _=e.get(m),S=_.envMap,x=_.envMapRotation;S&&(p.envMap.value=S,p.envMapRotation.value.setFromMatrix4(N_.makeRotationFromEuler(x)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(bm),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,_,S){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=S*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ni&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let _=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function U_(s,e,t,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){let v=M.program;i.uniformBlockBinding(x,v)}function c(x,M){let v=n[x.id];v===void 0&&(p(x),v=h(x),n[x.id]=v,x.addEventListener("dispose",_));let A=M.program;i.updateUBOMapping(x,A);let b=e.render.frame;r[x.id]!==b&&(d(x),r[x.id]=b)}function h(x){let M=u();x.__bindingPointIndex=M;let v=s.createBuffer(),A=x.__size,b=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,A,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let M=n[x.id],v=x.uniforms,A=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let b=0,w=v.length;b<w;b++){let T=v[b];if(Array.isArray(T))for(let C=0,D=T.length;C<D;C++)f(T[C],b,C,A);else f(T,b,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,M,v,A){if(y(x,M,v,A)===!0){let b=x.__offset,w=x.value;if(Array.isArray(w)){let T=0;for(let C=0;C<w.length;C++){let D=w[C],P=m(D);g(D,x.__data,T),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(T+=P.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,x.__data)}}function g(x,M,v){typeof x=="number"||typeof x=="boolean"?M[0]=x:x.isMatrix3?(M[0]=x.elements[0],M[1]=x.elements[1],M[2]=x.elements[2],M[3]=0,M[4]=x.elements[3],M[5]=x.elements[4],M[6]=x.elements[5],M[7]=0,M[8]=x.elements[6],M[9]=x.elements[7],M[10]=x.elements[8],M[11]=0):ArrayBuffer.isView(x)?M.set(new x.constructor(x.buffer,x.byteOffset,M.length)):x.toArray(M,v)}function y(x,M,v,A){let b=x.value,w=M+"_"+v;if(A[w]===void 0)return typeof b=="number"||typeof b=="boolean"?A[w]=b:ArrayBuffer.isView(b)?A[w]=b.slice():A[w]=b.clone(),!0;{let T=A[w];if(typeof b=="number"||typeof b=="boolean"){if(T!==b)return A[w]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(T.equals(b)===!1)return T.copy(b),!0}}return!1}function p(x){let M=x.uniforms,v=0,A=16;for(let w=0,T=M.length;w<T;w++){let C=Array.isArray(M[w])?M[w]:[M[w]];for(let D=0,P=C.length;D<P;D++){let I=C[D],F=Array.isArray(I.value)?I.value:[I.value];for(let H=0,V=F.length;H<V;H++){let ee=F[H],G=m(ee),K=v%A,j=K%G.boundary,me=K+j;v+=j,me!==0&&A-me<G.storage&&(v+=A-me),I.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=G.storage}}}let b=v%A;return b>0&&(v+=A-b),x.__size=v,x.__cache={},this}function m(x){let M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",x),M}function _(x){let M=x.target;M.removeEventListener("dispose",_);let v=a.indexOf(M.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(n[M.id]),delete n[M.id],delete r[M.id]}function S(){for(let x in n)s.deleteBuffer(n[x]);a=[],n={},r={}}return{bind:l,update:c,dispose:S}}var O_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Tn=null;function k_(){return Tn===null&&(Tn=new xn(O_,16,16,hs,Yt),Tn.name="DFG_LUT",Tn.minFilter=kt,Tn.magFilter=kt,Tn.wrapS=zi,Tn.wrapT=zi,Tn.generateMipmaps=!1,Tn.needsUpdate=!0),Tn}var Zc=class{constructor(e={}){let{canvas:t=Dp(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=di}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let y=f,p=new Set([gc,mc,pc]),m=new Set([di,an,zr,cs,uc,dc]),_=new Uint32Array(4),S=new Int32Array(4),x=new N,M=null,v=null,A=[],b=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,C=!1,D=null,P=null,I=null,F=null;this._outputColorSpace=It;let H=0,V=0,ee=null,G=-1,K=null,j=new yt,me=new yt,he=null,Le=new ze(0),ve=0,Ne=t.width,Y=t.height,B=1,$=null,fe=null,oe=new yt(0,0,Ne,Y),Ce=new yt(0,0,Ne,Y),Qe=!1,te=new vn,le=!1,ue=!1,ce=new Be,pe=new N,We=new yt,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function Ye(){return ee===null?B:1}let U=i;function dt(R,O){return t.getContext(R,O)}let et,L,E,z,W,Z,de,ge,Q,se,ye,Ue,xe,be,Pe,He,Je,k,_e,ie,Me,Te,re;try{let R={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",bt,!1),t.addEventListener("webglcontextcreationerror",ji,!1),U===null){let O="webgl2";if(U=dt(O,R),U===null)throw dt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(R){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",bt,!1),t.removeEventListener("webglcontextcreationerror",ji,!1),Xe("WebGLRenderer: "+R.message),R}function Ve(){et=new qv(U),et.init(),Me=new I_(U,et),L=new Fv(U,et,e,Me),E=new C_(U,et),L.reversedDepthBuffer&&d&&E.buffers.depth.setReversed(!0),P=U.createFramebuffer(),I=U.createFramebuffer(),F=U.createFramebuffer(),z=new Kv(U),W=new m_,Z=new P_(U,et,E,W,L,Me,z),de=new Wv(T),ge=new J0(U),Te=new Lv(U,ge),Q=new Xv(U,ge,z,Te),se=new Jv(U,Q,ge,Te,z),k=new Yv(U,L,Z),Pe=new Uv(W),ye=new p_(T,de,et,L,Te,Pe),Ue=new F_(T,W),xe=new b_,be=new S_(et),Je=new Dv(T,de,E,se,g,l),He=new R_(T,se,L),re=new U_(U,z,L,E),_e=new Nv(U,et,z),ie=new jv(U,et,z),z.programs=ye.programs,T.capabilities=L,T.extensions=et,T.properties=W,T.renderLists=xe,T.shadowMap=He,T.state=E,T.info=z}y!==di&&(w=new $v(y,t.width,t.height,o,n,r));let Fe=new od(T,U);this.xr=Fe,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let R=et.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=et.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(R){R!==void 0&&(B=R,this.setSize(Ne,Y,!1))},this.getSize=function(R){return R.set(Ne,Y)},this.setSize=function(R,O,J=!0){if(Fe.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Ne=R,Y=O,t.width=Math.floor(R*B),t.height=Math.floor(O*B),J===!0&&(t.style.width=R+"px",t.style.height=O+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,R,O)},this.getDrawingBufferSize=function(R){return R.set(Ne*B,Y*B).floor()},this.setDrawingBufferSize=function(R,O,J){Ne=R,Y=O,B=J,t.width=Math.floor(R*J),t.height=Math.floor(O*J),this.setViewport(0,0,R,O)},this.setEffects=function(R){if(y===di){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let O=0;O<R.length;O++)if(R[O].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(j)},this.getViewport=function(R){return R.copy(oe)},this.setViewport=function(R,O,J,q){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,O,J,q),E.viewport(j.copy(oe).multiplyScalar(B).round())},this.getScissor=function(R){return R.copy(Ce)},this.setScissor=function(R,O,J,q){R.isVector4?Ce.set(R.x,R.y,R.z,R.w):Ce.set(R,O,J,q),E.scissor(me.copy(Ce).multiplyScalar(B).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(R){E.setScissorTest(Qe=R)},this.setOpaqueSort=function(R){$=R},this.setTransparentSort=function(R){fe=R},this.getClearColor=function(R){return R.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(R=!0,O=!0,J=!0){let q=0;if(R){let X=!1;if(ee!==null){let Ee=ee.texture.format;X=p.has(Ee)}if(X){let Ee=ee.texture.type,Re=m.has(Ee),we=Je.getClearColor(),Ie=Je.getClearAlpha(),Oe=we.r,rt=we.g,ht=we.b;Re?(_[0]=Oe,_[1]=rt,_[2]=ht,_[3]=Ie,U.clearBufferuiv(U.COLOR,0,_)):(S[0]=Oe,S[1]=rt,S[2]=ht,S[3]=Ie,U.clearBufferiv(U.COLOR,0,S))}else q|=U.COLOR_BUFFER_BIT}O&&(q|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&U.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),D=R},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",bt,!1),t.removeEventListener("webglcontextcreationerror",ji,!1),Je.dispose(),xe.dispose(),be.dispose(),W.dispose(),de.dispose(),se.dispose(),Te.dispose(),re.dispose(),ye.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Qd),Fe.removeEventListener("sessionend",ef),gs.stop()};function Tt(R){R.preventDefault(),Ca("WebGLRenderer: Context Lost."),C=!0}function bt(){Ca("WebGLRenderer: Context Restored."),C=!1;let R=z.autoReset,O=He.enabled,J=He.autoUpdate,q=He.needsUpdate,X=He.type;Ve(),z.autoReset=R,He.enabled=O,He.autoUpdate=J,He.needsUpdate=q,He.type=X}function ji(R){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function un(R){let O=R.target;O.removeEventListener("dispose",un),ug(O)}function ug(R){dg(R),W.remove(R)}function dg(R){let O=W.get(R).programs;O!==void 0&&(O.forEach(function(J){ye.releaseProgram(J)}),R.isShaderMaterial&&ye.releaseShaderCache(R))}this.renderBufferDirect=function(R,O,J,q,X,Ee){O===null&&(O=Ge);let Re=X.isMesh&&X.matrixWorld.determinantAffine()<0,we=mg(R,O,J,q,X);E.setMaterial(q,Re);let Ie=J.index,Oe=1;if(q.wireframe===!0){if(Ie=Q.getWireframeAttribute(J),Ie===void 0)return;Oe=2}let rt=J.drawRange,ht=J.attributes.position,De=rt.start*Oe,xt=(rt.start+rt.count)*Oe;Ee!==null&&(De=Math.max(De,Ee.start*Oe),xt=Math.min(xt,(Ee.start+Ee.count)*Oe)),Ie!==null?(De=Math.max(De,0),xt=Math.min(xt,Ie.count)):ht!=null&&(De=Math.max(De,0),xt=Math.min(xt,ht.count));let Vt=xt-De;if(Vt<0||Vt===1/0)return;Te.setup(X,q,we,J,Ie);let Ct,wt=_e;if(Ie!==null&&(Ct=ge.get(Ie),wt=ie,wt.setIndex(Ct)),X.isMesh)q.wireframe===!0?(E.setLineWidth(q.wireframeLinewidth*Ye()),wt.setMode(U.LINES)):wt.setMode(U.TRIANGLES);else if(X.isLine){let ai=q.linewidth;ai===void 0&&(ai=1),E.setLineWidth(ai*Ye()),X.isLineSegments?wt.setMode(U.LINES):X.isLineLoop?wt.setMode(U.LINE_LOOP):wt.setMode(U.LINE_STRIP)}else X.isPoints?wt.setMode(U.POINTS):X.isSprite&&wt.setMode(U.TRIANGLES);if(X.isBatchedMesh)if(et.get("WEBGL_multi_draw"))wt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let ai=X._multiDrawStarts,Ae=X._multiDrawCounts,gi=X._multiDrawCount,ft=Ie?ge.get(Ie).bytesPerElement:1,ki=W.get(q).currentProgram.getUniforms();for(let dn=0;dn<gi;dn++)ki.setValue(U,"_gl_DrawID",dn),wt.render(ai[dn]/ft,Ae[dn])}else if(X.isInstancedMesh)wt.renderInstances(De,Vt,X.count);else if(J.isInstancedBufferGeometry){let ai=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ae=Math.min(J.instanceCount,ai);wt.renderInstances(De,Vt,Ae)}else wt.render(De,Vt)};function $d(R,O,J,q){D!==null&&R.isNodeMaterial&&D.setObject(q,R),le===!0&&Pe.setState(R,J,!1),R.transparent===!0&&R.side===Rt&&R.forceSinglePass===!1?(R.side=ni,R.needsUpdate=!0,Zo(R,O,q),R.side=Hi,R.needsUpdate=!0,Zo(R,O,q),R.side=Rt):Zo(R,O,q)}this.compile=function(R,O,J=null){J===null&&(J=R),D!==null&&D.renderStart(R,O,J),v=be.get(J),v.init(O),b.push(v),J.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),R!==J&&R.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights(),D!==null&&D.updateLights(v.state.lightsArray),ue=this.localClippingEnabled,le=Pe.init(this.clippingPlanes,ue),le===!0&&Pe.setGlobalState(this.clippingPlanes,O),D!==null&&He.render(v.state.shadowsArray,J,O);let q=new Set;return R.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let Ee=X.material;if(Ee)if(Array.isArray(Ee))for(let Re=0;Re<Ee.length;Re++){let we=Ee[Re];$d(we,J,O,X),q.add(we)}else $d(Ee,J,O,X),q.add(Ee)}),v=b.pop(),D!==null&&D.renderEnd(),q},this.compileAsync=function(R,O,J=null){let q=this.compile(R,O,J);return new Promise(X=>{function Ee(){if(q.forEach(function(Re){let Ie=W.get(Re).currentProgram;(Ie===void 0||Ie.isReady())&&q.delete(Re)}),q.size===0){X(R);return}setTimeout(Ee,10)}et.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Dh=null;function fg(R){Dh&&Dh(R)}function Qd(){gs.stop()}function ef(){gs.start()}let gs=new um;gs.setAnimationLoop(fg),typeof self<"u"&&gs.setContext(self),this.setAnimationLoop=function(R){Dh=R,Fe.setAnimationLoop(R),R===null?gs.stop():gs.start()},Fe.addEventListener("sessionstart",Qd),Fe.addEventListener("sessionend",ef),this.render=function(R,O){if(O!==void 0&&O.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;D!==null&&D.renderStart(R,O);let J=Fe.enabled===!0&&Fe.isPresenting===!0,q=w!==null&&(ee===null||J)&&w.begin(T,ee);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(O),O=Fe.getCamera()),R.isScene===!0&&R.onBeforeRender(T,R,O,ee),v=be.get(R,b.length),v.init(O),v.state.textureUnits=Z.getTextureUnits(),b.push(v),ce.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),te.setFromProjectionMatrix(ce,Qi,O.reversedDepth),ue=this.localClippingEnabled,le=Pe.init(this.clippingPlanes,ue),M=xe.get(R,A.length),M.init(),A.push(M),Fe.enabled===!0&&Fe.isPresenting===!0){let Re=T.xr.getDepthSensingMesh();Re!==null&&Lh(Re,O,-1/0,T.sortObjects)}Lh(R,O,0,T.sortObjects),M.finish(),D!==null&&D.updateLights(v.state.lightsArray),T.sortObjects===!0&&M.sort($,fe),qe=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,qe&&Je.addToRenderList(M,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),le===!0&&Pe.beginShadows();let X=v.state.shadowsArray;if(He.render(X,R,O),le===!0&&Pe.endShadows(),(q&&w.hasRenderPass())===!1){let Re=M.opaque,we=M.transmissive;if(v.setupLights(),O.isArrayCamera){let Ie=O.cameras;if(we.length>0)for(let Oe=0,rt=Ie.length;Oe<rt;Oe++){let ht=Ie[Oe];nf(Re,we,R,ht)}qe&&Je.render(R);for(let Oe=0,rt=Ie.length;Oe<rt;Oe++){let ht=Ie[Oe];tf(M,R,ht,ht.viewport)}}else we.length>0&&nf(Re,we,R,O),qe&&Je.render(R),tf(M,R,O)}ee!==null&&V===0&&(Z.updateMultisampleRenderTarget(ee),Z.updateRenderTargetMipmap(ee)),q&&w.end(T),R.isScene===!0&&R.onAfterRender(T,R,O),Te.resetDefaultState(),G=-1,K=null,b.pop(),b.length>0?(v=b[b.length-1],Z.setTextureUnits(v.state.textureUnits),le===!0&&Pe.setGlobalState(T.clippingPlanes,v.state.camera)):v=null,A.pop(),A.length>0?M=A[A.length-1]:M=null,D!==null&&D.renderEnd()};function Lh(R,O,J,q){if(R.visible===!1)return;if(R.layers.test(O.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(O);else if(R.isLightProbeGrid)v.pushLightProbeGrid(R);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(te)){q&&We.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ce);let Re=se.update(R),we=R.material;we.visible&&M.push(R,Re,we,J,We.z,null,O)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(te))){let Re=se.update(R),we=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),We.copy(R.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),We.copy(Re.boundingSphere.center)),We.applyMatrix4(R.matrixWorld).applyMatrix4(ce)),Array.isArray(we)){let Ie=Re.groups;for(let Oe=0,rt=Ie.length;Oe<rt;Oe++){let ht=Ie[Oe],De=we[ht.materialIndex];De&&De.visible&&M.push(R,Re,De,J,We.z,ht,O)}}else we.visible&&M.push(R,Re,we,J,We.z,null,O)}}let Ee=R.children;for(let Re=0,we=Ee.length;Re<we;Re++)Lh(Ee[Re],O,J,q)}function tf(R,O,J,q){let{opaque:X,transmissive:Ee,transparent:Re}=R;v.setupLightsView(J),le===!0&&Pe.setGlobalState(T.clippingPlanes,J),q&&E.viewport(j.copy(q)),X.length>0&&Jo(X,O,J),Ee.length>0&&Jo(Ee,O,J),Re.length>0&&Jo(Re,O,J),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function nf(R,O,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[q.id]===void 0){let De=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[q.id]=new Bt(1,1,{generateMipmaps:!0,type:De?Yt:di,minFilter:rn,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}let Ee=v.state.transmissionRenderTarget[q.id],Re=q.viewport||j;Ee.setSize(Re.z*T.transmissionResolutionScale,Re.w*T.transmissionResolutionScale);let we=T.getRenderTarget(),Ie=T.getActiveCubeFace(),Oe=T.getActiveMipmapLevel();T.setRenderTarget(Ee),T.getClearColor(Le),ve=T.getClearAlpha(),ve<1&&T.setClearColor(16777215,.5),T.clear(),qe&&Je.render(J);let rt=T.toneMapping;T.toneMapping=sn;let ht=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),v.setupLightsView(q),le===!0&&Pe.setGlobalState(T.clippingPlanes,q),Jo(R,J,q),Z.updateMultisampleRenderTarget(Ee),Z.updateRenderTargetMipmap(Ee),et.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let xt=0,Vt=O.length;xt<Vt;xt++){let Ct=O[xt],{object:wt,geometry:ai,material:Ae,group:gi}=Ct;if(Ae.side===Rt&&wt.layers.test(q.layers)){let ft=Ae.side;Ae.side=ni,Ae.needsUpdate=!0,sf(wt,J,q,ai,Ae,gi),Ae.side=ft,Ae.needsUpdate=!0,De=!0}}De===!0&&(Z.updateMultisampleRenderTarget(Ee),Z.updateRenderTargetMipmap(Ee))}T.setRenderTarget(we,Ie,Oe),T.setClearColor(Le,ve),ht!==void 0&&(q.viewport=ht),T.toneMapping=rt}function Jo(R,O,J){let q=O.isScene===!0?O.overrideMaterial:null;for(let X=0,Ee=R.length;X<Ee;X++){let Re=R[X],{object:we,geometry:Ie,group:Oe}=Re,rt=Re.material;rt.allowOverride===!0&&q!==null&&(rt=q),we.layers.test(J.layers)&&sf(we,O,J,Ie,rt,Oe)}}function sf(R,O,J,q,X,Ee){D!==null&&X.isNodeMaterial&&D.setObject(R,X),R.onBeforeRender(T,O,J,q,X,Ee),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),X.onBeforeRender(T,O,J,q,R,Ee),X.transparent===!0&&X.side===Rt&&X.forceSinglePass===!1?(X.side=ni,X.needsUpdate=!0,T.renderBufferDirect(J,O,q,X,R,Ee),X.side=Hi,X.needsUpdate=!0,T.renderBufferDirect(J,O,q,X,R,Ee),X.side=Rt):T.renderBufferDirect(J,O,q,X,R,Ee),R.onAfterRender(T,O,J,q,X,Ee)}function Zo(R,O,J){O.isScene!==!0&&(O=Ge);let q=W.get(R),X=v.state.lights,Ee=v.state.shadowsArray,Re=X.state.version,we=ye.getParameters(R,X.state,Ee,O,J,v.state.lightProbeGridArray),Ie=ye.getProgramCacheKey(we),Oe=q.programs;q.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?O.environment:null,q.fog=O.fog;let rt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;q.envMap=de.get(R.envMap||q.environment,rt),q.envMapRotation=q.environment!==null&&R.envMap===null?O.environmentRotation:R.envMapRotation,Oe===void 0&&(R.addEventListener("dispose",un),Oe=new Map,q.programs=Oe);let ht=Oe.get(Ie);if(ht!==void 0){if(q.currentProgram===ht&&q.lightsStateVersion===Re)return af(R,we),ht}else we.uniforms=ye.getUniforms(R),D!==null&&R.isNodeMaterial&&D.build(R,J,we),R.onBeforeCompile(we,T),ht=ye.acquireProgram(we,Ie),Oe.set(Ie,ht),q.uniforms=we.uniforms;let De=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(De.clippingPlanes=Pe.uniform),af(R,we),q.needsLights=bg(R),q.lightsStateVersion=Re,q.needsLights&&(De.ambientLightColor.value=X.state.ambient,De.lightProbe.value=X.state.probe,De.sunLights.value=X.state.sun,De.sunLightShadows.value=X.state.sunShadow,De.directionalLights.value=X.state.directional,De.directionalLightShadows.value=X.state.directionalShadow,De.spotLights.value=X.state.spot,De.spotLightShadows.value=X.state.spotShadow,De.rectAreaLights.value=X.state.rectArea,De.ltc_1.value=X.state.rectAreaLTC1,De.ltc_2.value=X.state.rectAreaLTC2,De.pointLights.value=X.state.point,De.pointLightShadows.value=X.state.pointShadow,De.hemisphereLights.value=X.state.hemi,De.sunShadowMatrix.value=X.state.sunShadowMatrix,De.sunShadowCascade.value=X.state.sunShadowCascade,De.directionalShadowMatrix.value=X.state.directionalShadowMatrix,De.spotLightMatrix.value=X.state.spotLightMatrix,De.spotLightMap.value=X.state.spotLightMap,De.pointShadowMatrix.value=X.state.pointShadowMatrix),q.lightProbeGrid=v.state.lightProbeGridArray.length>0,q.currentProgram=ht,q.uniformsList=null,ht}function rf(R){if(R.uniformsList===null){let O=R.currentProgram.getUniforms();R.uniformsList=Wr.seqWithValue(O.seq,R.uniforms)}return R.uniformsList}function af(R,O){let J=W.get(R);J.outputColorSpace=O.outputColorSpace,J.batching=O.batching,J.batchingColor=O.batchingColor,J.instancing=O.instancing,J.instancingColor=O.instancingColor,J.instancingMorph=O.instancingMorph,J.skinning=O.skinning,J.morphTargets=O.morphTargets,J.morphNormals=O.morphNormals,J.morphColors=O.morphColors,J.morphTargetsCount=O.morphTargetsCount,J.numClippingPlanes=O.numClippingPlanes,J.numIntersection=O.numClipIntersection,J.vertexAlphas=O.vertexAlphas,J.vertexTangents=O.vertexTangents,J.toneMapping=O.toneMapping}function pg(R,O){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let J=0,q=R.length;J<q;J++){let X=R[J];if(X.texture!==null&&X.boundingBox.containsPoint(x))return X}return null}function mg(R,O,J,q,X){O.isScene!==!0&&(O=Ge),Z.resetTextureUnits();let Ee=O.fog,Re=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?O.environment:null,we=ee===null?T.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:tt.workingColorSpace,Ie=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Oe=de.get(q.envMap||Re,Ie),rt=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ht=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),De=!!J.morphAttributes.position,xt=!!J.morphAttributes.normal,Vt=!!J.morphAttributes.color,Ct=sn;q.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ct=T.toneMapping);let wt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ai=wt!==void 0?wt.length:0,Ae=W.get(q),gi=v.state.lights;if(le===!0&&(ue===!0||R!==K)){let At=R===K&&q.id===G;Pe.setState(q,R,At)}let ft=!1;q.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==gi.state.version||Ae.outputColorSpace!==we||X.isBatchedMesh&&Ae.batching===!1||!X.isBatchedMesh&&Ae.batching===!0||X.isBatchedMesh&&Ae.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ae.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ae.instancing===!1||!X.isInstancedMesh&&Ae.instancing===!0||X.isSkinnedMesh&&Ae.skinning===!1||!X.isSkinnedMesh&&Ae.skinning===!0||X.isInstancedMesh&&Ae.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ae.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ae.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ae.instancingMorph===!1&&X.morphTexture!==null||Ae.envMap!==Oe||q.fog===!0&&Ae.fog!==Ee||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Pe.numPlanes||Ae.numIntersection!==Pe.numIntersection)||Ae.vertexAlphas!==rt||Ae.vertexTangents!==ht||Ae.morphTargets!==De||Ae.morphNormals!==xt||Ae.morphColors!==Vt||Ae.toneMapping!==Ct||Ae.morphTargetsCount!==ai||!!Ae.lightProbeGrid!=v.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ae.__version=q.version);let ki=Ae.currentProgram;ft===!0&&(ki=Zo(q,O,X),D&&q.isNodeMaterial&&D.onUpdateProgram(q,ki,Ae));let dn=!1,Yn=!1,Ys=!1,_t=ki.getUniforms(),Ot=Ae.uniforms;if(E.useProgram(ki.program)&&(dn=!0,Yn=!0,Ys=!0),q.id!==G&&(G=q.id,Yn=!0),Ae.needsLights){let At=pg(v.state.lightProbeGridArray,X);Ae.lightProbeGrid!==At&&(Ae.lightProbeGrid=At,Yn=!0)}if(dn||K!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),_t.setValue(U,"projectionMatrix",R.projectionMatrix),_t.setValue(U,"viewMatrix",R.matrixWorldInverse);let Zn=_t.map.cameraPosition;Zn!==void 0&&Zn.setValue(U,pe.setFromMatrixPosition(R.matrixWorld)),L.logarithmicDepthBuffer&&_t.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&_t.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),K!==R&&(K=R,Yn=!0,Ys=!0)}if(Ae.needsLights&&(gi.state.sunShadowMap.length>0&&_t.setValue(U,"sunShadowMap",gi.state.sunShadowMap,Z),gi.state.directionalShadowMap.length>0&&_t.setValue(U,"directionalShadowMap",gi.state.directionalShadowMap,Z),gi.state.spotShadowMap.length>0&&_t.setValue(U,"spotShadowMap",gi.state.spotShadowMap,Z),gi.state.pointShadowMap.length>0&&_t.setValue(U,"pointShadowMap",gi.state.pointShadowMap,Z)),X.isSkinnedMesh){_t.setOptional(U,X,"bindMatrix"),_t.setOptional(U,X,"bindMatrixInverse");let At=X.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),_t.setValue(U,"boneTexture",At.boneTexture,Z))}X.isBatchedMesh&&(_t.setOptional(U,X,"batchingTexture"),_t.setValue(U,"batchingTexture",X._matricesTexture,Z),_t.setOptional(U,X,"batchingIdTexture"),_t.setValue(U,"batchingIdTexture",X._indirectTexture,Z),_t.setOptional(U,X,"batchingColorTexture"),X._colorsTexture!==null&&_t.setValue(U,"batchingColorTexture",X._colorsTexture,Z));let Jn=J.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&k.update(X,J,ki),(Yn||Ae.receiveShadow!==X.receiveShadow)&&(Ae.receiveShadow=X.receiveShadow,_t.setValue(U,"receiveShadow",X.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&O.environment!==null&&(Ot.envMapIntensity.value=O.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=k_()),Yn){if(_t.setValue(U,"toneMappingExposure",T.toneMappingExposure),Ae.needsLights&&gg(Ot,Ys),Ee&&q.fog===!0&&Ue.refreshFogUniforms(Ot,Ee),Ue.refreshMaterialUniforms(Ot,q,B,Y,v.state.transmissionRenderTarget[R.id]),Ae.needsLights&&Ae.lightProbeGrid){let At=Ae.lightProbeGrid;Ot.probesSH.value=At.texture,Ot.probesMin.value.copy(At.boundingBox.min),Ot.probesMax.value.copy(At.boundingBox.max),Ot.probesResolution.value.copy(At.resolution)}Wr.upload(U,rf(Ae),Ot,Z)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Wr.upload(U,rf(Ae),Ot,Z),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&_t.setValue(U,"center",X.center),_t.setValue(U,"modelViewMatrix",X.modelViewMatrix),_t.setValue(U,"normalMatrix",X.normalMatrix),_t.setValue(U,"modelMatrix",X.matrixWorld),q.uniformsGroups!==void 0){let At=q.uniformsGroups;for(let Zn=0,Js=At.length;Zn<Js;Zn++){let lf=At[Zn];re.update(lf,ki),re.bind(lf,ki)}}return ki}function gg(R,O){R.ambientLightColor.needsUpdate=O,R.lightProbe.needsUpdate=O,R.sunLights.needsUpdate=O,R.sunLightShadows.needsUpdate=O,R.directionalLights.needsUpdate=O,R.directionalLightShadows.needsUpdate=O,R.pointLights.needsUpdate=O,R.pointLightShadows.needsUpdate=O,R.spotLights.needsUpdate=O,R.spotLightShadows.needsUpdate=O,R.rectAreaLights.needsUpdate=O,R.hemisphereLights.needsUpdate=O}function bg(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(R,O,J){let q=W.get(R);q.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),W.get(R.texture).__webglTexture=O,W.get(R.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,O){let J=W.get(R);J.__webglFramebuffer=O,J.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(R,O=0,J=0){ee=R,H=O,V=J;let q=null,X=!1,Ee=!1;if(R){let we=W.get(R);if(we.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(U.FRAMEBUFFER,we.__webglFramebuffer),j.copy(R.viewport),me.copy(R.scissor),he=R.scissorTest,E.viewport(j),E.scissor(me),E.setScissorTest(he),G=-1;return}else if(we.__webglFramebuffer===void 0)Z.setupRenderTarget(R);else if(we.__hasExternalTextures)Z.rebindTextures(R,W.get(R.texture).__webglTexture,W.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let rt=R.depthTexture;if(we.__boundDepthTexture!==rt){if(rt!==null&&W.has(rt)&&(R.width!==rt.image.width||R.height!==rt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(R)}}let Ie=R.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(Ee=!0);let Oe=W.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Oe[O])?q=Oe[O][J]:q=Oe[O],X=!0):R.samples>0&&Z.useMultisampledRTT(R)===!1?q=W.get(R).__webglMultisampledFramebuffer:Array.isArray(Oe)?q=Oe[J]:q=Oe,j.copy(R.viewport),me.copy(R.scissor),he=R.scissorTest}else j.copy(oe).multiplyScalar(B).floor(),me.copy(Ce).multiplyScalar(B).floor(),he=Qe;if(J!==0&&(q=P),E.bindFramebuffer(U.FRAMEBUFFER,q)&&E.drawBuffers(R,q),E.viewport(j),E.scissor(me),E.setScissorTest(he),X){let we=W.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,we.__webglTexture,J)}else if(Ee){let we=O;for(let Ie=0;Ie<R.textures.length;Ie++){let Oe=W.get(R.textures[Ie]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ie,Oe.__webglTexture,J,we)}}else if(R!==null&&J!==0){let we=W.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,we.__webglTexture,J)}G=-1};function of(R){let O=W.get(R);return(O.__readFormat!==R.format||O.__readType!==R.type)&&(O.__readFormat=R.format,O.__readType=R.type,O.__formatReadable=L.textureFormatReadable(R.format),O.__typeReadable=L.textureTypeReadable(R.type)),O}this.readRenderTargetPixels=function(R,O,J,q,X,Ee,Re,we=0){if(!(R&&R.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=W.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Re!==void 0&&(Ie=Ie[Re]),Ie){E.bindFramebuffer(U.FRAMEBUFFER,Ie);try{let Oe=R.textures[we],rt=Oe.format,ht=Oe.type;R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+we);let De=of(Oe);if(De.__formatReadable===!1){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=R.width-q&&J>=0&&J<=R.height-X&&U.readPixels(O,J,q,X,Me.convert(rt),Me.convert(ht),Ee)}finally{let Oe=ee!==null?W.get(ee).__webglFramebuffer:null;E.bindFramebuffer(U.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(R,O,J,q,X,Ee,Re,we=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=W.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Re!==void 0&&(Ie=Ie[Re]),Ie)if(O>=0&&O<=R.width-q&&J>=0&&J<=R.height-X){E.bindFramebuffer(U.FRAMEBUFFER,Ie);let Oe=R.textures[we],rt=Oe.format,ht=Oe.type;R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+we);let De=of(Oe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,xt),U.bufferData(U.PIXEL_PACK_BUFFER,Ee.byteLength,U.STREAM_READ),U.readPixels(O,J,q,X,Me.convert(rt),Me.convert(ht),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Vt=ee!==null?W.get(ee).__webglFramebuffer:null;E.bindFramebuffer(U.FRAMEBUFFER,Vt);let Ct=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Np(U,Ct,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,xt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ee),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(xt),U.deleteSync(Ct),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,O=null,J=0){let q=Math.pow(2,-J),X=Math.floor(R.image.width*q),Ee=Math.floor(R.image.height*q),Re=O!==null?O.x:0,we=O!==null?O.y:0;Z.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,Re,we,X,Ee),E.unbindTexture()},this.copyTextureToTexture=function(R,O,J=null,q=null,X=0,Ee=0){let Re,we,Ie,Oe,rt,ht,De,xt,Vt,Ct=R.isCompressedTexture?R.mipmaps[Ee]:R.image;if(J!==null)Re=J.max.x-J.min.x,we=J.max.y-J.min.y,Ie=J.isBox3?J.max.z-J.min.z:1,Oe=J.min.x,rt=J.min.y,ht=J.isBox3?J.min.z:0;else{let Ot=Math.pow(2,-X);Re=Math.floor(Ct.width*Ot),we=Math.floor(Ct.height*Ot),R.isDataArrayTexture?Ie=Ct.depth:R.isData3DTexture?Ie=Math.floor(Ct.depth*Ot):Ie=1,Oe=0,rt=0,ht=0}q!==null?(De=q.x,xt=q.y,Vt=q.z):(De=0,xt=0,Vt=0);let wt=Me.convert(O.format),ai=Me.convert(O.type),Ae;O.isData3DTexture?(Z.setTexture3D(O,0),Ae=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Z.setTexture2DArray(O,0),Ae=U.TEXTURE_2D_ARRAY):(Z.setTexture2D(O,0),Ae=U.TEXTURE_2D),E.activeTexture(U.TEXTURE0),E.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),E.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),E.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let gi=E.getParameter(U.UNPACK_ROW_LENGTH),ft=E.getParameter(U.UNPACK_IMAGE_HEIGHT),ki=E.getParameter(U.UNPACK_SKIP_PIXELS),dn=E.getParameter(U.UNPACK_SKIP_ROWS),Yn=E.getParameter(U.UNPACK_SKIP_IMAGES);E.pixelStorei(U.UNPACK_ROW_LENGTH,Ct.width),E.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ct.height),E.pixelStorei(U.UNPACK_SKIP_PIXELS,Oe),E.pixelStorei(U.UNPACK_SKIP_ROWS,rt),E.pixelStorei(U.UNPACK_SKIP_IMAGES,ht);let Ys=R.isDataArrayTexture||R.isData3DTexture,_t=O.isDataArrayTexture||O.isData3DTexture;if(R.isDepthTexture){let Ot=W.get(R),Jn=W.get(O),At=W.get(Ot.__renderTarget),Zn=W.get(Jn.__renderTarget);E.bindFramebuffer(U.READ_FRAMEBUFFER,At.__webglFramebuffer),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let Js=0;Js<Ie;Js++)Ys&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(R).__webglTexture,X,ht+Js),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(O).__webglTexture,Ee,Vt+Js)),U.blitFramebuffer(Oe,rt,Re,we,De,xt,Re,we,U.DEPTH_BUFFER_BIT,U.NEAREST);E.bindFramebuffer(U.READ_FRAMEBUFFER,null),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(X!==0||R.isRenderTargetTexture||W.has(R)){let Ot=W.get(R),Jn=W.get(O);E.bindFramebuffer(U.READ_FRAMEBUFFER,I),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,F);for(let At=0;At<Ie;At++)Ys?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ot.__webglTexture,X,ht+At):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ot.__webglTexture,X),_t?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Jn.__webglTexture,Ee,Vt+At):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Jn.__webglTexture,Ee),X!==0?U.blitFramebuffer(Oe,rt,Re,we,De,xt,Re,we,U.COLOR_BUFFER_BIT,U.NEAREST):_t?U.copyTexSubImage3D(Ae,Ee,De,xt,Vt+At,Oe,rt,Re,we):U.copyTexSubImage2D(Ae,Ee,De,xt,Oe,rt,Re,we);E.bindFramebuffer(U.READ_FRAMEBUFFER,null),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else _t?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(Ae,Ee,De,xt,Vt,Re,we,Ie,wt,ai,Ct.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Ae,Ee,De,xt,Vt,Re,we,Ie,wt,Ct.data):U.texSubImage3D(Ae,Ee,De,xt,Vt,Re,we,Ie,wt,ai,Ct):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ee,De,xt,Re,we,wt,ai,Ct.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ee,De,xt,Ct.width,Ct.height,wt,Ct.data):U.texSubImage2D(U.TEXTURE_2D,Ee,De,xt,Re,we,wt,ai,Ct);E.pixelStorei(U.UNPACK_ROW_LENGTH,gi),E.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ft),E.pixelStorei(U.UNPACK_SKIP_PIXELS,ki),E.pixelStorei(U.UNPACK_SKIP_ROWS,dn),E.pixelStorei(U.UNPACK_SKIP_IMAGES,Yn),Ee===0&&O.generateMipmaps&&U.generateMipmap(Ae),E.unbindTexture()},this.initRenderTarget=function(R){W.get(R).__webglFramebuffer===void 0&&Z.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Z.setTextureCube(R,0):R.isData3DTexture?Z.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Z.setTexture2DArray(R,0):Z.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){H=0,V=0,ee=null,E.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}};function Rn(s,e=!1){let t=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new nt,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=xm(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][d]);let g=xm(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function xm(s){let e,t,i,n=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Mt(a,t,i),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){let y=h.getComponent(d,g);o.setComponent(d+u,g,y)}}else a.set(h.array,l);l+=h.count*t}return n!==void 0&&(o.gpuType=n),o}function ld(s,e){if(e===ku)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Gr||e===To){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let i=t.count-2,n=[];if(e===Gr)for(let r=1;r<=i;r++)n.push(t.getX(0)),n.push(t.getX(r)),n.push(t.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(n.push(t.getX(r)),n.push(t.getX(r+1)),n.push(t.getX(r+2))):(n.push(t.getX(r+2)),n.push(t.getX(r+1)),n.push(t.getX(r)));return n.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(n),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function vm(s){let e=new Map,t=new Map,i=s.clone();return ym(s,i,function(n,r){e.set(r,n),t.set(n,r)}),i.traverse(function(n){if(!n.isSkinnedMesh)return;let r=n,a=e.get(n),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function ym(s,e,t){t(s,e);for(let i=0;i<s.children.length;i++)ym(s.children[i],e.children[i],t)}var eh=class extends Sn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new md(t)}),this.register(function(t){return new gd(t)}),this.register(function(t){return new Ed(t)}),this.register(function(t){return new Td(t)}),this.register(function(t){return new Ad(t)}),this.register(function(t){return new xd(t)}),this.register(function(t){return new vd(t)}),this.register(function(t){return new yd(t)}),this.register(function(t){return new _d(t)}),this.register(function(t){return new pd(t)}),this.register(function(t){return new Md(t)}),this.register(function(t){return new bd(t)}),this.register(function(t){return new wd(t)}),this.register(function(t){return new Sd(t)}),this.register(function(t){return new dd(t)}),this.register(function(t){return new th(t,ct.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new th(t,ct.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Rd(t)})}load(e,t,i,n){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=qn.extractUrlBase(e);a=qn.resolveURL(c,this.path)}else a=qn.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){n?n(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Nr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Em){try{a[ct.KHR_BINARY_GLTF]=new Cd(e)}catch(u){n&&n(u);return}r=JSON.parse(a[ct.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Ud(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ct.KHR_MATERIALS_UNLIT:a[u]=new fd;break;case ct.KHR_DRACO_MESH_COMPRESSION:a[u]=new Pd(r,this.dracoLoader);break;case ct.KHR_TEXTURE_TRANSFORM:a[u]=new Id;break;case ct.KHR_MESH_QUANTIZATION:a[u]=new Dd;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,n)}parseAsync(e,t){let i=this;return new Promise(function(n,r){i.parse(e,t,n,r)})}};function B_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Gt(s,e,t){let i=s.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},dd=class{constructor(e){this.parser=e,this.name=ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,n=t.cache.get(i);if(n)return n;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new ze(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],xi);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ds(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Is(h),c.distance=u;break;case"spot":c=new ao(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Cn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}},fd=class{constructor(){this.name=ct.KHR_MATERIALS_UNLIT}getMaterialType(){return yi}extendParams(e,t,i){let n=[];e.color=new ze(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],xi),e.opacity=a[3]}r.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",r.baseColorTexture,It))}return Promise.all(n)}},pd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},md=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(n.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(r,r)}return Promise.all(n)}},gd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},bd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(n)}},xd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];if(t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],xi)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,It)),i.sheenRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(n)}},vd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&n.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(n)}},yd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let r=i.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(r[0],r[1],r[2],xi),Promise.all(n)}},_d=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IOR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Md=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let r=i.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(r[0],r[1],r[2],xi),i.specularColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,It)),Promise.all(n)}},Sd=class{constructor(e){this.parser=e,this.name=ct.EXT_MATERIALS_BUMP}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&n.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(n)}},wd=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?wi:null}extendMaterialParams(e,t){let i=Gt(this.parser,e,this.name);if(i===null)return Promise.resolve();let n=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&n.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(n)}},Ed=class{constructor(e){this.parser=e,this.name=ct.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;let r=n.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Td=class{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=n.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},Ad=class{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=n.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},th=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let n=i.extensions[this.name],r=this.parser.getDependency("buffer",n.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=n.byteOffset||0,c=n.byteLength||0,h=n.count,u=n.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,n.mode,n.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,n.mode,n.filter),f})})}else return null}},Rd=class{constructor(e){this.name=ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let n=t.meshes[i.mesh];for(let c of n.primitives)if(c.mode!==Wi.TRIANGLES&&c.mode!==Wi.TRIANGLE_STRIP&&c.mode!==Wi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let g of u){let y=new Be,p=new N,m=new vi,_=new N(1,1,1),S=new Ua(g.geometry,g.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,M),l.SCALE&&_.fromBufferAttribute(l.SCALE,M),S.setMatrixAt(M,y.compose(p,m,_));let x=null;for(let M in l)if(M==="_COLOR_0"){let v=l[M];S.instanceColor=new Bn(v.array,v.itemSize,v.normalized)}else if(M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"){if(x===null){let A=S.geometry;x=new nt,x.name=A.name;for(let b in A.attributes)x.setAttribute(b,A.attributes[b]);for(let b in A.morphAttributes)x.morphAttributes[b]=A.morphAttributes[b];A.index!==null&&x.setIndex(A.index),x.morphTargetsRelative=A.morphTargetsRelative;for(let b of A.groups)x.addGroup(b.start,b.count,b.materialIndex);A.boundingBox!==null&&(x.boundingBox=A.boundingBox.clone()),A.boundingSphere!==null&&(x.boundingSphere=A.boundingSphere.clone()),x.drawRange.start=A.drawRange.start,x.drawRange.count=A.drawRange.count,x.userData=Object.assign({},A.userData),S.geometry=x}let v=l[M];x.setAttribute(M,new Bn(v.array,v.itemSize,v.normalized))}St.prototype.copy.call(S,g),this.parser.assignFinalMaterial(S),f.push(S)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Em="glTF",Io=12,_m={JSON:1313821514,BIN:5130562},Cd=class{constructor(e){this.name=ct.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Io),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Em)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let n=this.header.length-Io,r=new DataView(e,Io),a=0;for(;a<n;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===_m.JSON){let c=new Uint8Array(e,Io+a,o);this.content=i.decode(c)}else if(l===_m.BIN){let c=Io+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Pd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,n=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Nd[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Nd[h]||h.toLowerCase();if(a[h]!==void 0){let d=i.accessors[e.attributes[h]],f=Kr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){n.decodeDracoFile(h,function(f){for(let g in f.attributes){let y=f.attributes[g],p=l[g];p!==void 0&&(y.normalized=p)}u(f)},o,c,xi,d)})})}},Id=class{constructor(){this.name=ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let i=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Dd=class{constructor(){this.name=ct.KHR_MESH_QUANTIZATION}},ih=class extends Mn{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n*3+n;for(let a=0;a!==n;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,u=(i-t)/h,d=u*u,f=d*u,g=e*c,y=g-c,p=-2*f+3*d,m=f-d,_=1-p,S=m-d+u;for(let x=0;x!==o;x++){let M=a[y+x+o],v=a[y+x+l]*h,A=a[g+x+o],b=a[g+x]*h;r[x]=_*M+S*v+p*A+m*b}return r}},z_=new vi,Ld=class extends ih{interpolate_(e,t,i,n){let r=super.interpolate_(e,t,i,n);return z_.fromArray(r).normalize().toArray(r),r}},Wi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Kr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Mm={9728:Dt,9729:kt,9984:cc,9985:Br,9986:ks,9987:rn},Sm={33071:zi,33648:br,10497:ci},cd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Nd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},us={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},G_={CUBICSPLINE:void 0,LINEAR:Ss,STEP:Ms},hd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function H_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hi})),s.DefaultMaterial}function Hs(s,e,t){for(let i in t.extensions)s[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Cn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function V_(s,e,t){let i=!1,n=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(n=!0),u.COLOR_0!==void 0&&(r=!0),i&&n&&r)break}if(!i&&!n&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(i){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(n){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return i&&(s.morphAttributes.position=h),n&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function W_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)s.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function q_(s){let e,t=s.extensions&&s.extensions[ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ud(t.attributes):e=s.indices+":"+ud(s.attributes)+":"+s.mode,s.targets!==void 0)for(let i=0,n=s.targets.length;i<n;i++)e+=":"+ud(s.targets[i]);return e}function ud(s){let e="",t=Object.keys(s).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+s[t[i]]+";";return e}function Fd(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function X_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var j_=new Be,Ud=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new B_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);n=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&n<17||r&&a<98?this.textureLoader=new no(this.options.manager):this.textureLoader=new lo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,n=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][n.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:n.asset,parser:i,userData:{}};return Hs(r,o,n),Cn(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let a=t[n].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let n=0,r=e.length;n<r;n++){let a=e[n];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let n=i.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let n=e(t[i]);if(n)return n}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let n=0;n<t.length;n++){let r=e(t[n]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":n=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ct.KHR_BINARY_GLTF].body);let n=this.options;return new Promise(function(r,a){i.load(qn.resolveURL(t.uri,n.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let n=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+n)})}loadAccessor(e){let t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){let a=cd[n.type],o=Kr[n.componentType],l=n.normalized===!0,c=new o(n.count*a);return Promise.resolve(new Mt(c,a,l))}let r=[];return n.bufferView!==void 0?r.push(this.getDependency("bufferView",n.bufferView)):r.push(null),n.sparse!==void 0&&(r.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=cd[n.type],c=Kr[n.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=n.byteOffset||0,f=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,g=n.normalized===!0,y,p;if(f&&f!==u){let m=Math.floor(d/f),_="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+m+":"+n.count,S=t.cache.get(_);S||(y=new c(o,m*f,n.count*f/h),S=new Ts(y,f/h),t.cache.add(_,S)),p=new ss(S,l,d%f/h,g)}else o===null?y=new c(n.count*l):y=new c(o,d,n.count*l),p=new Mt(y,l,g);if(n.sparse!==void 0){let m=cd.SCALAR,_=Kr[n.sparse.indices.componentType],S=n.sparse.indices.byteOffset||0,x=n.sparse.values.byteOffset||0,M=new _(a[1],S,n.sparse.count*m),v=new c(a[2],x,n.sparse.count*l);o!==null&&(p=new Mt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let A=0,b=M.length;A<b;A++){let w=M[A];if(p.setX(w,v[A*l]),l>=2&&p.setY(w,v[A*l+1]),l>=3&&p.setZ(w,v[A*l+2]),l>=4&&p.setW(w,v[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let n=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Mm[d.magFilter]||kt,h.minFilter=Mm[d.minFilter]||rn,h.wrapS=Sm[d.wrapS]||ci,h.wrapT=Sm[d.wrapT]||ci,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Dt&&h.minFilter!==kt,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,n=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=n.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(y){let p=new Xt(y);p.needsUpdate=!0,d(p)}),t.load(qn.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Cn(u,a),u.userData.mimeType=a.mimeType||X_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,n){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[ct.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[ct.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[ct.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return n!==void 0&&(a.colorSpace=n),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,n=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Tr,ui.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new yn,ui.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(n||r||a){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return Kt}loadMaterial(e){let t=this,i=this.json,n=this.extensions,r=i.materials[e],a,o={},l=r.extensions||{},c=[];if(l[ct.KHR_MATERIALS_UNLIT]){let u=n[ct.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new ze(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],xi),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,It)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Rt);let h=r.alphaMode||hd.OPAQUE;if(h===hd.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===hd.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==yi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ne(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==yi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==yi){let u=r.emissiveFactor;o.emissive=new ze().setRGB(u[0],u[1],u[2],xi)}return r.emissiveTexture!==void 0&&a!==yi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,It)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Cn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Hs(n,u,r),u})}createUniqueName(e){let t=Et.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,n=this.primitiveCache;function r(o){return i[ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return wm(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=q_(c),u=n[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[ct.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=wm(new nt,c,t),c.mode===Wi.TRIANGLE_STRIP?d=d.then(f=>ld(f,To)):c.mode===Wi.TRIANGLE_FAN&&(d=d.then(f=>ld(f,Gr))),n[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,n=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?H_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let y=h[f],p=a[f],m,_=c[f];if(p.mode===Wi.TRIANGLES||p.mode===Wi.TRIANGLE_STRIP||p.mode===Wi.TRIANGLE_FAN||p.mode===void 0){let S=r.isSkinnedMesh===!0,x=y.hasAttribute("skinIndex")&&y.hasAttribute("skinWeight");S&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=S&&x?new Na(y,_):new Ze(y,_),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(p.mode===Wi.LINES)m=new Oa(y,_);else if(p.mode===Wi.LINE_STRIP)m=new tn(y,_);else if(p.mode===Wi.LINE_LOOP)m=new ka(y,_);else if(p.mode===Wi.POINTS)m=new Ba(y,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&W_(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Cn(m,r),p.extensions&&Hs(n,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Hs(n,u[0],r),u[0];let d=new it;r.extensions&&Hs(n,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new qt(Bs.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new wn(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Cn(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let n=0,r=t.joints.length;n<r;n++)i.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){let r=n.pop(),a=n,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Be;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Fa(o,l)})}loadAnimation(e){let t=this.json,i=this,n=t.animations[e],r=n.name?n.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=n.channels.length;u<d;u++){let f=n.channels[u],g=n.samplers[f.sampler],y=f.target,p=y.node,m=n.parameters!==void 0?n.parameters[g.input]:g.input,_=n.parameters!==void 0?n.parameters[g.output]:g.output;y.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",_)),c.push(g),h.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],y=u[3],p=u[4],m=[];for(let S=0,x=d.length;S<x;S++){let M=d[S],v=f[S],A=g[S],b=y[S],w=p[S];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let T=i._createAnimationTracks(M,v,A,b,w);if(T)for(let C=0;C<T.length;C++)m.push(T[C])}let _=new io(r,void 0,m);return Cn(_,n),_})}createNodeMesh(e){let t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,n.mesh,r);return n.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),a})}loadNode(e){let t=this.json,i=this,n=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=n.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));let l=n.skin===void 0?Promise.resolve(null):i.getDependency("skin",n.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,j_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,g=u[0];h.pivot=new N().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,i=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?n.createUniqueName(r.name):"",o=[],l=n._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(n.getDependency("camera",r.camera).then(function(c){return n._getNodeRef(n.cameraCache,r.camera,c)})),n._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Er:c.length>1?h=new it:c.length===1?h=c[0]:h=new St,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Cn(h,r),r.extensions&&Hs(i,h,r),r.matrix!==void 0){let u=new Be;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!n.associations.has(h))n.associations.set(h,{});else if(r.mesh!==void 0&&n.meshCache.refs[r.mesh]>1){let u=n.associations.get(h);n.associations.set(h,{...u})}return n.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],n=this,r=new it;i.name&&(r.name=n.createUniqueName(i.name)),Cn(r,i),i.extensions&&Hs(t,r,i);let a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(n.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){let d=l[h];d.parent!==null?r.add(vm(d)):r.add(d)}let c=h=>{let u=new Map;for(let[d,f]of n.associations)(d instanceof ui||d instanceof Xt)&&u.set(d,f);return h.traverse(d=>{let f=n.associations.get(d);f!=null&&u.set(d,f)}),u};return n.associations=c(r),r})}_createAnimationTracks(e,t,i,n,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}us[r.path]===us.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(us[r.path]){case us.weights:h=Hn;break;case us.rotation:h=Vn;break;case us.translation:case us.scale:h=as;break;default:i.itemSize===1?h=Hn:h=as;break}let u=n.interpolation!==void 0?G_[n.interpolation]:Ss,d=this._getArrayFromAccessor(i);for(let f=0,g=l.length;f<g;f++){let y=new h(l[f]+"."+us[r.path],t.array,d,u);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Fd(t.constructor),n=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)n[r]=t[r]*i;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let n=this instanceof Vn?Ld:ih;return new n(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function K_(s,e,t){let i=e.attributes,n=new Ft;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new N(l[0],l[1],l[2]),new N(c[0],c[1],c[2])),o.normalized){let h=Fd(Kr[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new N,l=new N;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let y=Fd(Kr[d.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}s.boundingBox=n;let a=new hi;n.getCenter(a.center),a.radius=n.min.distanceTo(n.max)/2,s.boundingSphere=a}function wm(s,e,t){let i=e.attributes,n=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in i){let o=Nd[a]||a.toLowerCase();o in s.attributes||n.push(r(i[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});n.push(a)}return tt.workingColorSpace!==xi&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${tt.workingColorSpace}" not supported.`),Cn(s,e),K_(s,e,t),Promise.all(n).then(function(){return e.targets!==void 0?V_(s,e.targets,t):s})}var Tm=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var n=WebAssembly.validate(t)?o(e):o(s),r,a=WebAssembly.instantiate(n,{}).then(function(m){r=m.instance,r.exports.__wasm_call_ctors()});function o(m){for(var _=new Uint8Array(m.length),S=0;S<m.length;++S){var x=m.charCodeAt(S);_[S]=x>96?x-97:x>64?x-39:x+4}for(var M=0,S=0;S<m.length;++S)_[M++]=_[S]<60?i[_[S]]:(_[S]-60)*64+_[++S];return _.buffer.slice(0,M)}function l(m,_,S,x,M,v,A){var b=m.exports.sbrk,w=x+3&-4,T=b(w*M),C=b(v.length),D=new Uint8Array(m.exports.memory.buffer);D.set(v,C);var P=_(T,x,M,C,v.length);if(P==0&&A&&A(T,w,M),S.set(D.subarray(T,T+x*M)),b(T-b(0)),P!=0)throw new Error("Malformed buffer data: "+P)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(m){var _={object:new Worker(m),pending:0,requests:{}};return _.object.onmessage=function(S){var x=S.data;_.pending-=x.count,_.requests[x.id][x.action](x.value),delete _.requests[x.id]},_}function g(m){for(var _="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(n)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+p.name+";"+l.toString()+p.toString(),S=new Blob([_],{type:"text/javascript"}),x=URL.createObjectURL(S),M=u.length;M<m;++M)u[M]=f(x);for(var M=m;M<u.length;++M)u[M].object.postMessage({});u.length=m,URL.revokeObjectURL(x)}function y(m,_,S,x,M){for(var v=u[0],A=1;A<u.length;++A)u[A].pending<v.pending&&(v=u[A]);return new Promise(function(b,w){var T=new Uint8Array(S),C=++d;v.pending+=m,v.requests[C]={resolve:b,reject:w},v.object.postMessage({id:C,count:m,size:_,source:T,mode:x,filter:M},[T.buffer])})}function p(m){var _=m.data;self.ready.then(function(S){if(!_.id)return self.close();try{var x=new Uint8Array(_.count*_.size);l(S,S.exports[_.mode],x,_.count,_.size,_.source,S.exports[_.filter]),self.postMessage({id:_.id,count:_.count,action:"resolve",value:x},[x.buffer])}catch(M){self.postMessage({id:_.id,count:_.count,action:"reject",value:M})}})}return{ready:a,supported:!0,useWorkers:function(m){g(m)},decodeVertexBuffer:function(m,_,S,x,M){l(r,r.exports.meshopt_decodeVertexBuffer,m,_,S,x,r.exports[c[M]])},decodeIndexBuffer:function(m,_,S,x){l(r,r.exports.meshopt_decodeIndexBuffer,m,_,S,x)},decodeIndexSequence:function(m,_,S,x){l(r,r.exports.meshopt_decodeIndexSequence,m,_,S,x)},decodeGltfBuffer:function(m,_,S,x,M,v){l(r,r.exports[h[M]],m,_,S,x,r.exports[c[v]])},decodeGltfBufferAsync:function(m,_,S,x,M){return u.length>0?y(m,_,S,h[x],c[M]):a.then(function(){var v=new Uint8Array(m*_);return l(r,r.exports[h[x]],v,m,_,S,r.exports[c[M]]),v})}}})();function Am({cellSize:s=6,floorHeight:e=2.8,transparentCellSize:t=3,maxVertices:i=2e5,indexVertices:n=!1,minMaterialTriangles:r=2e4}={}){for(let[m,_]of Object.entries({cellSize:s,floorHeight:e,transparentCellSize:t,maxVertices:i}))if(!Number.isFinite(_)||_<=0)throw new RangeError(`${m} must be positive and finite`);if(!Number.isFinite(r)||r<0)throw new RangeError("minMaterialTriangles must be nonnegative and finite");let a=new Map,o=new Map,l=new Map,c=new Set,h=new N,u=new N,d={sourceMeshes:0,sourceVertices:0,sourceTriangles:0,emptySourceMeshes:0,batches:0,opaqueBatches:0,transparentBatches:0,spanBatches:0,globalBatches:0,outputVertices:0,outputTriangles:0,indexedBatches:0,oversizedSourceMeshes:0,inputStoredVertices:0,inputIndexEntries:0,cellSize:s,floorHeight:e,transparentCellSize:t,maxVertices:i,indexVertices:n,minMaterialTriangles:r},f=[],g=!1;function y(m,_,S=""){if(g)throw new Error("Spatial batcher is already finished");if(!m?.isBufferGeometry||!_?.isMaterial)throw new TypeError("A BufferGeometry and single Material are required");let x=m.getAttribute("position"),M=m.getAttribute("normal");if(!x||!M||x.itemSize!==3||M.itemSize!==3||M.count!==x.count)throw new Error("Spatial batching requires matching position/normal vec3 attributes");if(Object.keys(m.attributes).some(H=>H!=="position"&&H!=="normal")||Object.values(m.morphAttributes).some(H=>H.length))throw new Error("Strip unsupported attributes before static spatial batching");if(x.isInterleavedBufferAttribute||M.isInterleavedBufferAttribute)throw new Error("Deinterleave geometry before static spatial batching");let v=m.index?.count??x.count;if(v%3!==0||m.drawRange.start!==0||Number.isFinite(m.drawRange.count)&&m.drawRange.count<v)throw new Error("Spatial batching expects the complete triangle draw range");if(d.sourceMeshes++,d.sourceVertices+=v,d.sourceTriangles+=v/3,d.inputStoredVertices+=x.count,d.inputIndexEntries+=m.index?.count??0,c.add(m),l.set(_,(l.get(_)??0)+v/3),!v){d.emptySourceMeshes++,f.push(S);return}let A=new Ft().setFromBufferAttribute(x);if(![...A.min.toArray(),...A.max.toArray()].every(Number.isFinite))throw new Error("Spatial batching requires finite geometry bounds");A.getCenter(h),A.getSize(u);let b=_.transparent||_.transmission>0,w=b?t:s,T=u.x>w||u.z>w||u.y>e,C;if(T){let H=[Math.floor(A.min.x/w),Math.floor(A.min.y/e),Math.floor(A.min.z/w)],V=[Math.ceil(A.max.x/w)-1,Math.ceil(A.max.y/e)-1,Math.ceil(A.max.z/w)-1].map((ee,G)=>Math.max(H[G],ee));C=[...H,...V]}else C=[Math.floor(h.x/w),Math.floor(h.y/e),Math.floor(h.z/w)];o.has(_)||o.set(_,o.size);let D=[x,M].map(H=>`${H.array.constructor.name}:${H.normalized}:${H.gpuType}`).join("/"),P=`${o.get(_)}|${D}|${T?"span":"cell"}|${C.join(",")}`,I=a.get(P);I||(I={key:P,schema:D,cell:C,span:T,transparent:b,material:_,chunks:[]},a.set(P,I));let F=I.chunks.at(-1);(!F||F.vertices+v>i)&&(F={entries:[],vertices:0},I.chunks.push(F)),F.entries.push({geometry:m,sourceName:S}),F.vertices+=v,v>i&&d.oversizedSourceMeshes++}function p({disposeSources:m=!1}={}){if(g)throw new Error("Spatial batcher is already finished");g=!0;let _=new Map;for(let x of a.values()){if(l.get(x.material)>=r){_.set(x.key,x);continue}let M=`${o.get(x.material)}|${x.schema}|global`,v=_.get(M);v||(v={...x,key:M,cell:[],span:!1,global:!0,chunks:[]},_.set(M,v));for(let A of x.chunks)for(let b of A.entries){let w=b.geometry.index?.count??b.geometry.getAttribute("position").count,T=v.chunks.at(-1);(!T||T.vertices+w>i)&&(T={entries:[],vertices:0},v.chunks.push(T)),T.entries.push(b),T.vertices+=w}}let S=[];for(let x of _.values())for(let[M,v]of x.chunks.entries()){let A=v.entries.some(({geometry:P})=>P.index),b=v.entries.map(({geometry:P})=>{if(n)return P.index?P.toNonIndexed():P;if(!A||P.index)return P;let I=new nt,F=P.getAttribute("position").count;I.setAttribute("position",P.getAttribute("position")),I.setAttribute("normal",P.getAttribute("normal"));let H=F<=65535?new Uint16Array(F):new Uint32Array(F);for(let V=0;V<F;V++)H[V]=V;return I.setIndex(new Mt(H,1)),I}),w=Rn(b,!1);if(!w)throw new Error(`Could not merge spatial batch ${x.key}`);for(let P=0;P<b.length;P++)b[P]!==v.entries[P].geometry&&b[P].dispose();if(n){let P=Y_(w);w.dispose(),w=P}w.index&&d.indexedBatches++,w.computeBoundingBox(),w.computeBoundingSphere();let T=new Ze(w,x.material);T.name=`Spatial | ${x.material.name||x.material.uuid} | ${x.global?"global":x.span?"span":"cell"} ${x.cell.join(",")} | ${M}`,T.frustumCulled=!0,T.castShadow=!x.transparent,T.receiveShadow=!x.transparent;let C=[],D=0;for(let{geometry:P}of v.entries)C.push(D),D+=(P.index?.count??P.getAttribute("position").count)/3;T.userData.spatialBatch={key:x.key,cell:x.cell.slice(),spanning:x.span,global:!!x.global,sourceCount:v.entries.length,sourceNames:v.entries.map(P=>P.sourceName),sourceRanges:C,triangles:v.vertices/3},S.push(T),d.batches++,d[x.transparent?"transparentBatches":"opaqueBatches"]++,x.span&&d.spanBatches++,x.global&&d.globalBatches++,d.outputVertices+=w.getAttribute("position").count,d.outputTriangles+=(w.index?.count??w.getAttribute("position").count)/3}if(m)for(let x of c)x.dispose();return a.clear(),c.clear(),{meshes:S,stats:{...d},emptySources:f}}return{add:y,finish:p}}function Y_(s){if(s.index)throw new Error("Exact indexing requires non-indexed triangles");let e=s.getAttribute("position"),t=s.getAttribute("normal");if(Object.keys(s.attributes).some(p=>p!=="position"&&p!=="normal")||!e||!t||e.itemSize!==3||t.itemSize!==3||e.count!==t.count||!(e.array instanceof Float32Array)||!(t.array instanceof Float32Array)||e.normalized||t.normalized)throw new Error("Exact indexing requires unnormalized Float32 position/normal attributes only");let i=e.count,n=new Uint32Array(e.array.buffer,e.array.byteOffset,i*3),r=new Uint32Array(t.array.buffer,t.array.byteOffset,i*3),a=new Map,o=new Int32Array(i),l=new Uint32Array(i),c=new Uint32Array(i),h=0;for(let p=0;p<i;p++){let m=p*3,_=2166136261;for(let x=0;x<3;x++)_=Math.imul(_^n[m+x],16777619);for(let x=0;x<3;x++)_=Math.imul(_^r[m+x],16777619);let S=-1;for(let x=a.get(_)??-1;x!==-1;x=o[x]){let M=l[x]*3;if(n[m]===n[M]&&n[m+1]===n[M+1]&&n[m+2]===n[M+2]&&r[m]===r[M]&&r[m+1]===r[M+1]&&r[m+2]===r[M+2]){S=x;break}}S===-1&&(S=h++,l[S]=p,o[S]=a.get(_)??-1,a.set(_,S)),c[p]=S}let u=new nt,d=new Float32Array(h*3),f=new Float32Array(h*3),g=new Uint32Array(d.buffer),y=new Uint32Array(f.buffer);for(let p=0;p<h;p++){let m=l[p]*3,_=p*3;g.set(n.subarray(m,m+3),_),y.set(r.subarray(m,m+3),_)}u.setAttribute("position",new Mt(d,3)),u.setAttribute("normal",new Mt(f,3)),u.setIndex(new Mt(h<=65535?new Uint16Array(c):c,1)),u.name=s.name,u.userData={...s.userData},u.setDrawRange(s.drawRange.start,s.drawRange.count);for(let p of s.groups)u.addGroup(p.start,p.count,p.materialIndex);return u}function Od(s,e){if(e=e.replaceAll("_"," "),/Mirror/i.test(e))return;let t=/Entrance stippled glass/i.test(e),i=/water/i.test(e);if(/Hall opal lamp glass/i.test(e))s.transparent=!1,s.opacity=1,s.depthWrite=!0,s.metalness=0,s.roughness=.42;else if(t)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.48,s.opacity=.64,s.envMapIntensity=1;else if(i)s.transparent=!0,s.depthWrite=!1,s.metalness=0,s.roughness=.16,s.envMapIntensity=1.1;else if(/Glazing|glass/i.test(e)){s.metalness=0,s.roughness=/mist/i.test(e)?.4:.1,s.opacity=/mist/i.test(e)?.36:.11,s.envMapIntensity=.8;return}let n=/carpet|upholstery|linen|curtain|fabric|cushion|Entrance mat/i.test(e),r=/oak|walnut|pine|timber|rattan/i.test(e)&&!n,a=e==="Proposal | Slate roof anthracite",o=t?9:i?10:/carpet/i.test(e)?11:e==="Red brown brick"?1:/Slate roof/i.test(e)?2:/Tarmac|Gravel|Planting soil/i.test(e)?3:r?4:/Warm plaster|White joinery|enamel|painted cast iron|Proposal \| Loft plaster|Proposal \| Limestone render/i.test(e)?5:n?6:/Stone|Concrete|Paving|brick|mortar|tile|granite|membrane/i.test(e)?7:/Grass|Foliage|Hedge/i.test(e)?8:0;o===1||o===2||o===3||o===6||o===8?s.roughness=.92:o===4?s.roughness=.43:o===5?s.roughness=/joinery|enamel/i.test(e)?.44:.88:o===7?s.roughness=/granite/i.test(e)?.28:.83:o===11&&(s.roughness=.96),o&&(s.onBeforeCompile=l=>{l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
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
  `)},s.customProgramCacheKey=()=>`daylight-surface-v3-${o}${a?"-anthracite":""}`)}var Yr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Ui=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},J_=new wn(-1,1,1,-1,0,1),kd=class extends nt{constructor(){super(),this.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ke([0,2,0,0,2,0],2))}},Z_=new kd,ds=class{constructor(e){this._mesh=new Ze(Z_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,J_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Jr=class extends Ui{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ti.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ds(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Do=class extends Ui{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}},nh=class extends Ui{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var sh=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new ne);this._width=i.width,this._height=i.height,t=new Bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Yt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Jr(Yr),this.copyPass.material.blending=zt,this.timer=new co}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let n=0,r=this.passes.length;n<r;n++){let a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Do!==void 0&&(a instanceof Do?i=!0:a instanceof nh&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var rh=class extends Ui{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ze}render(e,t,i){let n=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=n}};var Lo={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ne},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Be},cameraProjectionMatrixInverse:{value:new Be},cameraWorldMatrix:{value:new Be},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new N(-1,-1,-1)},sceneBoxMax:{value:new N(1,1,1)}},vertexShader:`

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
		}`},No={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},ah={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Rm(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=$_(e),i=t.length,n=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=t[a],l=2*Math.PI*o/i,c=new N(Math.cos(l),Math.sin(l),0).normalize();n[a*4]=(c.x*.5+.5)*255,n[a*4+1]=(c.y*.5+.5)*255,n[a*4+2]=127,n[a*4+3]=255}let r=new xn(n,e,e);return r.wrapS=ci,r.wrapT=ci,r.needsUpdate=!0,r}function $_(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,i=Array(t).fill(0),n=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(n===-1&&r===e?(r=e-2,n=0):(r===e&&(r=0),n<0&&(n=e-1)),i[n*e+r]!==0){r-=2,n++;continue}else i[n*e+r]=a++;r++,n--}return i}var Fo={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Bd(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ne},cameraProjectionMatrixInverse:{value:new Be},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Bd(s,e,t){let i=Q_(s,e,t),n="vec3[SAMPLES](";for(let r=0;r<s;r++){let a=i[r];n+=`vec3(${a.x}, ${a.y}, ${a.z})${r<s-1?",":")"}`}return n}function Q_(s,e,t){let i=[];for(let n=0;n<s;n++){let r=2*Math.PI*e*n/s,a=Math.pow(n/(s-1),t);i.push(new N(Math.cos(r),Math.sin(r),a))}return i}var oh=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,n,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,g=e-d,y=t-f,p,m;g>y?(p=1,m=0):(p=0,m=1);let _=g-p+h,S=y-m+h,x=g-1+2*h,M=y-1+2*h,v=l&255,A=c&255,b=this.perm[v+this.perm[A]]%12,w=this.perm[v+p+this.perm[A+m]]%12,T=this.perm[v+1+this.perm[A+1]]%12,C=.5-g*g-y*y;C<0?i=0:(C*=C,i=C*C*this._dot(this.grad3[b],g,y));let D=.5-_*_-S*S;D<0?n=0:(D*=D,n=D*D*this._dot(this.grad3[w],_,S));let P=.5-x*x-M*M;return P<0?r=0:(P*=P,r=P*P*this._dot(this.grad3[T],x,M)),70*(i+n+r)}noise3d(e,t,i){let n,r,a,o,c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(i+c),f=1/6,g=(h+u+d)*f,y=h-g,p=u-g,m=d-g,_=e-y,S=t-p,x=i-m,M,v,A,b,w,T;_>=S?S>=x?(M=1,v=0,A=0,b=1,w=1,T=0):_>=x?(M=1,v=0,A=0,b=1,w=0,T=1):(M=0,v=0,A=1,b=1,w=0,T=1):S<x?(M=0,v=0,A=1,b=0,w=1,T=1):_<x?(M=0,v=1,A=0,b=0,w=1,T=1):(M=0,v=1,A=0,b=1,w=1,T=0);let C=_-M+f,D=S-v+f,P=x-A+f,I=_-b+2*f,F=S-w+2*f,H=x-T+2*f,V=_-1+3*f,ee=S-1+3*f,G=x-1+3*f,K=h&255,j=u&255,me=d&255,he=this.perm[K+this.perm[j+this.perm[me]]]%12,Le=this.perm[K+M+this.perm[j+v+this.perm[me+A]]]%12,ve=this.perm[K+b+this.perm[j+w+this.perm[me+T]]]%12,Ne=this.perm[K+1+this.perm[j+1+this.perm[me+1]]]%12,Y=.6-_*_-S*S-x*x;Y<0?n=0:(Y*=Y,n=Y*Y*this._dot3(this.grad3[he],_,S,x));let B=.6-C*C-D*D-P*P;B<0?r=0:(B*=B,r=B*B*this._dot3(this.grad3[Le],C,D,P));let $=.6-I*I-F*F-H*H;$<0?a=0:($*=$,a=$*$*this._dot3(this.grad3[ve],I,F,H));let fe=.6-V*V-ee*ee-G*G;return fe<0?o=0:(fe*=fe,o=fe*fe*this._dot3(this.grad3[Ne],V,ee,G)),32*(n+r+a+o)}noise4d(e,t,i,n){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,f,g,y=(e+t+i+n)*l,p=Math.floor(e+y),m=Math.floor(t+y),_=Math.floor(i+y),S=Math.floor(n+y),x=(p+m+_+S)*c,M=p-x,v=m-x,A=_-x,b=S-x,w=e-M,T=t-v,C=i-A,D=n-b,P=w>T?32:0,I=w>C?16:0,F=T>C?8:0,H=w>D?4:0,V=T>D?2:0,ee=C>D?1:0,G=P+I+F+H+V+ee,K=a[G][0]>=3?1:0,j=a[G][1]>=3?1:0,me=a[G][2]>=3?1:0,he=a[G][3]>=3?1:0,Le=a[G][0]>=2?1:0,ve=a[G][1]>=2?1:0,Ne=a[G][2]>=2?1:0,Y=a[G][3]>=2?1:0,B=a[G][0]>=1?1:0,$=a[G][1]>=1?1:0,fe=a[G][2]>=1?1:0,oe=a[G][3]>=1?1:0,Ce=w-K+c,Qe=T-j+c,te=C-me+c,le=D-he+c,ue=w-Le+2*c,ce=T-ve+2*c,pe=C-Ne+2*c,We=D-Y+2*c,Ge=w-B+3*c,qe=T-$+3*c,Ye=C-fe+3*c,U=D-oe+3*c,dt=w-1+4*c,et=T-1+4*c,L=C-1+4*c,E=D-1+4*c,z=p&255,W=m&255,Z=_&255,de=S&255,ge=o[z+o[W+o[Z+o[de]]]]%32,Q=o[z+K+o[W+j+o[Z+me+o[de+he]]]]%32,se=o[z+Le+o[W+ve+o[Z+Ne+o[de+Y]]]]%32,ye=o[z+B+o[W+$+o[Z+fe+o[de+oe]]]]%32,Ue=o[z+1+o[W+1+o[Z+1+o[de+1]]]]%32,xe=.6-w*w-T*T-C*C-D*D;xe<0?h=0:(xe*=xe,h=xe*xe*this._dot4(r[ge],w,T,C,D));let be=.6-Ce*Ce-Qe*Qe-te*te-le*le;be<0?u=0:(be*=be,u=be*be*this._dot4(r[Q],Ce,Qe,te,le));let Pe=.6-ue*ue-ce*ce-pe*pe-We*We;Pe<0?d=0:(Pe*=Pe,d=Pe*Pe*this._dot4(r[se],ue,ce,pe,We));let He=.6-Ge*Ge-qe*qe-Ye*Ye-U*U;He<0?f=0:(He*=He,f=He*He*this._dot4(r[ye],Ge,qe,Ye,U));let Je=.6-dt*dt-et*et-L*L-E*E;return Je<0?g=0:(Je*=Je,g=Je*Je*this._dot4(r[Ue],dt,et,L,E)),27*(h+u+d+f+g)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,n){return e[0]*t+e[1]*i+e[2]*n}_dot4(e,t,i,n,r){return e[0]*t+e[1]*i+e[2]*n+e[3]*r}};var Uo=class s extends Ui{constructor(e,t,i=512,n=512,r,a,o){super(),this.width=i,this.height=n,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Rm(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Bt(this.width,this.height,{type:Yt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Lt({defines:Object.assign({},Lo.defines),uniforms:Ti.clone(Lo.uniforms),vertexShader:Lo.vertexShader,fragmentShader:Lo.fragmentShader,blending:zt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new eo,this.normalMaterial.blending=zt,this.pdMaterial=new Lt({defines:Object.assign({},Fo.defines),uniforms:Ti.clone(Fo.uniforms),vertexShader:Fo.vertexShader,fragmentShader:Fo.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Lt({defines:Object.assign({},No.defines),uniforms:Ti.clone(No.uniforms),vertexShader:No.vertexShader,fragmentShader:No.fragmentShader,blending:zt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Lt({uniforms:Ti.clone(Yr.uniforms),vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:uo,blendDst:Fs,blendEquation:Vi,blendSrcAlpha:ho,blendDstAlpha:Fs,blendEquationAlpha:Vi}),this.blendMaterial=new Lt({uniforms:Ti.clone(ah.uniforms),vertexShader:ah.vertexShader,fragmentShader:ah.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:ac,blendSrc:uo,blendDst:Fs,blendEquation:Vi,blendSrcAlpha:ho,blendDstAlpha:Fs,blendEquationAlpha:Vi}),this._fsQuad=new ds(null),this._originalClearColor=new ze,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new _n,this.depthTexture.format=En,this.depthTexture.type=cs,this.normalRenderTarget=new Bt(this.width,this.height,{minFilter:Dt,magFilter:Dt,type:Yt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,n=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=n,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=n,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Bd(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Off:break;case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,n,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,n,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n=t.clearColor||n,r=t.clearAlpha||r,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new oh,i=e*e*4,n=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a,c=o;n[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,n[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,n[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,n[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new xn(n,e,e,Mi,di);return r.wrapS=ci,r.wrapT=ci,r.needsUpdate=!0,r}};Uo.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Oo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var lh=class extends Ui{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ti.clone(Oo.uniforms),this.material=new Lr({name:Oo.name,uniforms:this.uniforms,vertexShader:Oo.vertexShader,fragmentShader:Oo.fragmentShader}),this._fsQuad=new ds(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tt.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===fo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===po?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===mo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===go?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Us?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===xo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===bo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Cm={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`};var ko=class s extends Ze{constructor(){let e=s.SkyShader,t=new Lt({name:e.name,uniforms:Ti.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:ni,depthWrite:!1});super(new gt(1,1,1),t),this.isSky=!0}};ko.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new N},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
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

		}`};function eM(s,e,t){let i=new ko;i.scale.setScalar(100),Object.assign(i.material.uniforms.turbidity,{value:2.2}),i.material.uniforms.rayleigh.value=1.8,i.material.uniforms.mieCoefficient.value=.004,i.material.uniforms.mieDirectionalG.value=.8,i.material.uniforms.cloudCoverage.value=.32,i.material.uniforms.cloudDensity.value=.22,i.material.uniforms.sunPosition.value.copy(e),i.material.uniforms.showSunDisc.value=!1;let n=new Es;n.add(i);let r=new Xr(t?128:256,{type:Yt});new Ur(.1,250,r).update(s,n);let a=new qr(s),o=a.fromCubemap(r.texture);return a.dispose(),i.geometry.dispose(),i.material.dispose(),{background:r.texture,environment:o.texture}}function Pm(s,e,t,{actionMode:i=!1}={}){let n=matchMedia("(pointer: coarse)").matches,r=n||i;s.toneMapping=Us,s.toneMappingExposure=1.08,s.shadowMap.enabled=!0,s.shadowMap.type=Ns,s.shadowMap.autoUpdate=!1,e.add(new so(14478074,8549991,.5)),e.add(new oo(16774373,.035));let a=new Ds(16774108,2.8),o=new N(0,0,1).applyEuler(new en(Bs.degToRad(26),Bs.degToRad(-23),Bs.degToRad(-28),"XYZ")),l=new N(o.x,o.z,-o.y),c=eM(s,l,n);e.background=c.background,e.backgroundIntensity=.22,e.environment=c.environment,e.environmentIntensity=.035,a.target.position.set(-3,0,-4),a.position.copy(a.target.position).add(l.multiplyScalar(55)),a.castShadow=!0;let h=r?2048:4096;a.shadow.mapSize.set(h,h),Object.assign(a.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120}),a.shadow.bias=-8e-5,a.shadow.normalBias=.012,e.add(a,a.target);let u=new Bt(innerWidth,innerHeight,{type:Yt,samples:r?0:4}),d=new sh(s,u);d.addPass(new rh(e,t));let f=null;if(!n){f=new Uo(e,t,innerWidth,innerHeight,void 0,{radius:.45,distanceExponent:1.5,thickness:.15,scale:1,samples:16},{radius:6,rings:2,samples:8}),f.blendIntensity=.65;let x=f._overrideVisibility.bind(f),M=f._restoreVisibility.bind(f);f._overrideVisibility=()=>{x(),e.traverse(v=>{v.isMesh&&v.material.transparent&&v.visible&&(v.visible=!1,f._visibilityCache.push(v))})},f._restoreVisibility=M,f.enabled=!r,d.addPass(f)}d.addPass(new lh);let g=new Jr(Cm);g.enabled=r,d.addPass(g);let y=(x,M)=>{d.setPixelRatio(s.getPixelRatio()),d.setSize(x,M),f&&f.setSize(Math.max(1,Math.round(d.readBuffer.width*.5)),Math.max(1,Math.round(d.readBuffer.height*.5))),g&&g.material.uniforms.resolution.value.set(1/d.readBuffer.width,1/d.readBuffer.height)};y(innerWidth,innerHeight);let p={toneMapping:"AgX",exposure:s.toneMappingExposure,sky:"precomputed analytic daylight",skyCubeSize:n?128:256,localBounceLights:0,castShadows:!0,ambientOcclusion:r?"off":"GTAO",aoResolutionScale:.5,antialiasing:r?"FXAA":"MSAA",environmentReflections:!0,shadowMapSize:h,touchDevice:n,actionMode:i},m=x=>{if(p.actionMode!==!!x){p.actionMode=!!x,r=n||x,f&&(f.enabled=!r),g.enabled=r;for(let M of[d.renderTarget1,d.renderTarget2])M.samples=r?0:4,M.dispose();h=r?2048:4096,a.shadow.mapSize.set(h,h),a.shadow.map?.dispose(),a.shadow.map=null,a.shadow.mapPass?.dispose(),a.shadow.mapPass=null,s.shadowMap.needsUpdate=!0,p.ambientOcclusion=r?"off":"GTAO",p.antialiasing=r?"FXAA":"MSAA",p.shadowMapSize=h}},_=!1;return{render:()=>{d.render(),!_&&a.shadow.map&&(_=!0,e.traverse(x=>{if(x.material)for(let M of Array.isArray(x.material)?x.material:[x.material])M.needsUpdate=!0}))},resize:y,setActionMode:m,updateShadows:()=>{s.shadowMap.needsUpdate=!0},info:p}}function Im(s,e,{budget:t=6}={}){let i=e.map((d,f)=>({...d,id:f,point:new N(d.position[0],d.position[2],-d.position[1])})),n=Array.from({length:Math.min(t,i.length)},()=>{let d=new Is(16772311,0,1,0);return d.name="Room daylight fill",s.add(d),{light:d,current:null,target:null}}),r=new vn,a=new Be,o=new hi,l=-1/0,c=null,h={budget:n.length,sources:i.length,selected:[]};function u(d,f=performance.now()){let g=c===null?1:Math.min(.1,Math.max(0,(f-c)/1e3));if(c=f,f-l>=160){d.updateMatrixWorld(),r.setFromProjectionMatrix(a.multiplyMatrices(d.projectionMatrix,d.matrixWorldInverse));let y=new Set(n.map(S=>S.target?.id)),p=i.map(S=>{let x=d.position.distanceTo(S.point),M=Math.max(0,x-S.range);o.center.copy(S.point),o.radius=S.range;let v=r.intersectsSphere(o);return{source:S,score:S.intensity*(v?1:.15)/(1+M*M*.15+x*.08)*(y.has(S.id)?1.12:1)}}).sort((S,x)=>x.score-S.score).slice(0,n.length).map(S=>S.source),m=new Set(p.map(S=>S.id)),_=p.filter(S=>!n.some(x=>x.target?.id===S.id));for(let S of n)m.has(S.target?.id)||(S.target=_.shift()??null);h.selected=p.map(S=>S.name),l=f}for(let y of n){let p=y.current?.id!==y.target?.id;if(p&&y.light.intensity>.015){y.light.intensity*=Math.exp(-g*18);continue}p&&(y.current=y.target,y.current&&(y.light.position.copy(y.current.point),y.light.distance=y.current.range,y.light.name=y.current.name+" diffuse fill"));let m=y.current?.intensity??0;y.light.intensity+=(m-y.light.intensity)*(1-Math.exp(-g*12))}}return{update:u,info:h,slots:n}}var ch=class{constructor({mobile:e=!1,dpr:t=1}={}){this.mobile=e,this.dpr=t,this.scale=1,this.frames=[],this.lastCheck=null}ratio(e,t){let i=this.mobile?1.25:1.5,n=this.mobile?1e6:32e5;return Math.min(this.dpr,i,Math.sqrt(n/Math.max(1,e*t)))*this.scale}reset(){this.frames.length=0,this.lastCheck=null}sample(e,t){if(!Number.isFinite(e)||e<1||e>150||(this.lastCheck===null&&(this.lastCheck=t),this.frames.push(e),t-this.lastCheck<2400))return!1;let i=this.frames.sort((a,o)=>a-o);if(this.frames=[],this.lastCheck=t,i.length<24)return!1;let n=i[Math.floor(i.length/2)],r=this.scale;return n>27&&(this.scale=Math.max(.65,Math.round((this.scale-.15)*100)/100)),this.scale!==r}};var hh=class{constructor(e,t=[]){this.scene=e,this.members=new Map,this.doors=[],this.activeGroups=new Map;for(let i of t){let n=new it;n.name=i.id,n.position.set(i.hinge[0],i.hinge[2],-i.hinge[1]),e.add(n);let r=i.rotationAxis?new N(i.rotationAxis[0],i.rotationAxis[2],-i.rotationAxis[1]).normalize():new N(0,1,0),a=i.closedDelta??0;n.quaternion.setFromAxisAngle(r,a);let o={spec:i,pivot:n,axis:r,closedPosition:n.position.clone(),buckets:new Map,angle:a,open:!1,meshCount:0};this.doors.push(o);for(let l of i.members)this.members.set(l,o)}}owner(e){for(let t=e;t;t=t.parent){let i=this.members.get(t.userData.name||t.name);if(i)return i}}add(e,t,i){t.translate(-e.pivot.position.x,-e.pivot.position.y,-e.pivot.position.z);let n=e.buckets.get(i.name);n||(n={material:i,geometries:[]},e.buckets.set(i.name,n)),n.geometries.push(t),e.meshCount++}finish(){let e=0;for(let t of this.doors){for(let{material:i,geometries:n}of t.buckets.values()){let r=Rn(n,!1),a=new Ze(r,i);a.name=t.spec.id+" | "+i.name,a.castShadow=!i.transparent,a.receiveShadow=!i.transparent,t.pivot.add(a),e++;for(let o of n)o.dispose()}t.buckets.clear()}return e}update(e,t=0,i=!1,n=[]){let r=!1,a=new Map;for(let{spec:l}of this.doors)if(l.activationSet){let c=a.get(l.activationSet);c||(c=new Map,a.set(l.activationSet,c));let[h,u]=l.openingCenter;c.set(l.activationGroup,Math.hypot(e.x-h,e.y-u))}for(let[l,c]of a){let h=[...c].sort((d,f)=>d[1]-f[1])[0],u=this.activeGroups.get(l);(i||!c.has(u)||c.get(u)>h[1]+.2)&&this.activeGroups.set(l,h[0])}let o=[{position:e,selected:this.activeGroups},...n.map(l=>{let c=new Map;for(let h of a.keys()){let u=null,d=1/0;for(let{spec:f}of this.doors)if(f.activationSet===h){let[g,y,p]=f.openingCenter,m=Math.hypot(l.x-g,l.y-y)+Math.abs(l.z-p)*10;m<d&&(d=m,u=f.activationGroup)}c.set(h,u)}return{position:l,selected:c}})];for(let l of this.doors){let{spec:c}=l,[h,u,d]=c.openingCenter;l.open=o.some(({position:p,selected:m})=>{let _=Math.abs(p.z-d)<.75,S=h,x=u;if(c.apertureAxis){let[A,b]=c.apertureAxis,w=c.apertureWidth/2,T=Math.max(-w,Math.min(w,(p.x-h)*A+(p.y-u)*b));S+=A*T,x+=b*T}let M=Math.hypot(p.x-S,p.y-x);return(!c.activationSet||m.get(c.activationSet)===c.activationGroup)&&_&&M<(l.open&&!i?c.closeDistance:c.openDistance)});let f=l.open?c.openDelta:c.closedDelta??0,g=i?f:l.angle+(f-l.angle)*(1-Math.exp(-t*(c.responseRate??9))),y=Math.abs(f-g)<2e-4?f:g;if(Math.abs(y-l.angle)>1e-5){if(l.angle=y,c.motion==="sliding"?l.pivot.quaternion.identity():l.pivot.quaternion.setFromAxisAngle(l.axis,y),l.pivot.position.copy(l.closedPosition),c.motion==="retractable-garage"){let p=Math.sin(y),[m,_,S]=c.openTranslation;l.pivot.position.addScaledVector(new N(m,S,-_),p)}else if(c.motion==="sliding"){let p=c.openDelta?y/c.openDelta:0,[m,_,S]=c.openTranslation;l.pivot.position.addScaledVector(new N(m,S,-_),p)}r=!0}}return r}snap(e){return this.update(e,0,!0)}status(){return this.doors.map(({spec:e,angle:t,open:i,meshCount:n,pivot:r})=>({id:e.id,wall:e.wall,motion:e.motion??"hinged",activationGroup:e.activationGroup,angle:t,open:i,meshCount:n,batches:r.children.length,hinge:[...e.hinge],position:[r.position.x,-r.position.z,r.position.y],nativePoseRestored:Math.abs(t)<2e-4,closedPoseRestored:Math.abs(t-(e.closedDelta??0))<2e-4}))}};function $t(s,e,t){let i=!1;for(let n=0,r=t.length-1;n<t.length;r=n++){let[a,o]=t[n],[l,c]=t[r];o>e!=c>e&&s<(l-a)*(e-o)/(c-o)+a&&(i=!i)}return i}function tM(s,e,t,i){let n=i[0]-t[0],r=i[1]-t[1],a=Math.max(0,Math.min(1,((s-t[0])*n+(e-t[1])*r)/(n*n+r*r)));return Math.hypot(s-t[0]-a*n,e-t[1]-a*r)}function iM(s,e,t){let i=t.b[0]-t.a[0],n=t.b[1]-t.a[1],r=Math.hypot(i,n),a=((s-t.a[0])*i+(e-t.a[1])*n)/r,o=Math.abs(((s-t.a[0])*n-(e-t.a[1])*i)/r);return Math.hypot(Math.max(-a,a-r,0),Math.max(o-t.thickness/2,0))}var Vs=class{constructor(e){this.data=e,this.radius=.18,this.position={x:6.98,y:4.1,z:0},this.segments=[...e.segments];for(let t of e.walls){let[i,n]=t.a,[r,a]=t.b,o=Math.hypot(r-i,a-n),l=(r-i)/o,c=(a-n)/o,h=t.openings.filter(f=>f[2]<.15&&f[3]>1.65).map(f=>[Math.max(0,f[0]-f[1]/2),Math.min(o,f[0]+f[1]/2)]).sort((f,g)=>f[0]-g[0]),u=0,d=[];for(let[f,g]of h)f>u&&d.push([u,f]),u=Math.max(u,g);u<o&&d.push([u,o]);for(let[f,g]of d){let y=[f,g];if(t.projected_x_span)for(let p of t.projected_x_span){let m=(p-i)/l;m>f&&m<g&&y.push(m)}y.sort((p,m)=>p-m);for(let p=0;p<y.length-1;p++){let m=y[p],_=y[p+1],S=i+l*(m+_)/2,x=t.projected_x_span&&S>t.projected_x_span[0]&&S<t.projected_x_span[1]?t.front_projection_m:0,M=t.base_z??t.floor*e.levelHeight;this.segments.push({a:[i+l*m,n+c*m-x/2],b:[i+l*_,n+c*_-x/2],thickness:t.thickness_m+x,bottom:M,top:M+(t.height_m??(t.floor?2.45:2.6)),name:t.name})}}}}stairHeight(e,t){let[i,n]=this.data.stair?.boundsX??[7.92,8.815],r=this.data.levelHeight;return e<i||e>n||t<.115||t>3.56?null:t>=1.01?r/17+(3.56-t)/2.55*(13*r/17):(14+3*Math.atan2(1.01-t,e-i)/(Math.PI/2))*r/17}rampHeights(e,t){let i=[];for(let n of this.data.ramps??[])if($t(e,t,n.polygon)){let[r,a,o]=n.start,[l,c,h]=n.end,u=l-r,d=c-a,f=Math.max(0,Math.min(1,((e-r)*u+(t-a)*d)/(u*u+d*d)));i.push(o+(h-o)*f)}return i}support(e,t,i){let n=this.data.streetContext;if(this.data.site?.outline_m&&!$t(e,t,this.data.site.outline_m)&&!(this.data.approachSurface&&$t(e,t,this.data.approachSurface.polygon))&&!(n?.enabled&&n.walkPolygons.some(c=>$t(e,t,c))))return null;let r=this.stairHeight(e,t),a=(this.data.groundOpenings??[]).some(c=>$t(e,t,c.polygon??c)),o=this.rampHeights(e,t);a||o.push(0);for(let c of this.data.surfaces)(c.z!==0||!a)&&$t(e,t,c.polygon)&&o.push(c.z);r!==null&&o.push(r);let l=o.filter(c=>c<=i+(this.stepUp??.3)&&c>=i-(this.stepDown??.38));return l.length?Math.max(...l):null}blocked(e,t,i){let n=this.data.streetContext,r=this.radius,[a,o,l,c]=n?.enabled?n.bounds:this.data.bounds;if(e<a+r||e>l-r||t<o+r||t>c-r)return!0;for(let h of this.segments)if(!(i+1.5<=h.bottom+.04||i>=h.top-.04)&&!(h.name==="Landing rear rail"&&i<1)&&iM(e,t,h)<r)return!0;for(let h of n?.enabled?[...this.data.obstacles,...n.obstacles]:this.data.obstacles){if(h.maxFootZ!==void 0&&i>h.maxFootZ||i+1.5<h.bottom+.02||i>=h.top-.04)continue;if(h.polygon){if($t(e,t,h.polygon))return!0;for(let m=0;m<h.polygon.length;m++)if(tM(e,t,h.polygon[m],h.polygon[(m+1)%h.polygon.length])<r)return!0;continue}let[u,d,f,g]=h.box,y=e-Math.max(u,Math.min(f,e)),p=t-Math.max(d,Math.min(g,t));if(y*y+p*p<r*r)return!0}return!1}canStand(e){return!this.blocked(e.x,e.y,e.z)}teleport(e){let[t,i,n]=e.position;return this.position={x:t,y:i,z:n},this.position}move(e,t){let i=Math.max(1,Math.ceil(Math.hypot(e,t)/.04));for(let n=0;n<i;n++)for(let[r,a]of[[e/i,0],[0,t/i]]){let o=this.position,l=o.x+r,c=o.y+a,h=this.support(l,c,o.z);h!==null&&!this.blocked(l,c,h)&&(this.position={x:l,y:c,z:h})}return this.position}};var Bo=()=>matchMedia("(pointer: coarse)").matches,uh=class{constructor(e,t,i,n,r=()=>{}){this.enabled=Bo(),this.active=!1,this.axes={forward:0,right:0},this.movePointer=null,this.lookPointer=null,this.lookPoint=null,this.lookElement=null,this.lookGesture=null,this.sprinting=!1,this.pad=t,this.thumb=i,this.canvas=e,document.body.classList.toggle("touch-ui",this.enabled);let a=h=>this.enabled&&this.active&&h.pointerType!=="mouse",o=h=>{let u=t.getBoundingClientRect(),d=u.width*.34,f=h.clientX-u.left-u.width/2,g=h.clientY-u.top-u.height/2,y=Math.hypot(f,g),p=Math.min(1,d/(y||1));f*=p,g*=p,this.sprinting=y>d*(this.sprinting?1.08:1.28),t.classList.toggle("sprinting",this.sprinting),t.querySelector(".pad-label").textContent=this.sprinting?"Sprinting":"Push farther to sprint";let m=Math.hypot(f,g)/d;this.axes.forward=m<.13?0:-g/d,this.axes.right=m<.13?0:f/d,i.style.transform=`translate(${f}px,${g}px)`};t.addEventListener("pointerdown",h=>{!a(h)||this.movePointer!==null||(h.preventDefault(),this.movePointer=h.pointerId,t.setPointerCapture(h.pointerId),t.classList.add("engaged"),o(h))}),t.addEventListener("pointermove",h=>{h.pointerId===this.movePointer&&(h.preventDefault(),o(h))});let l=h=>{h.pointerId===this.movePointer&&this.resetMovement()};for(let h of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(h,l);e.addEventListener("pointerdown",h=>{!a(h)||!this.claimLook(h.pointerId,e)||(h.preventDefault(),this.lookPoint=[h.clientX,h.clientY],this.lookGesture={x:h.clientX,y:h.clientY,time:h.timeStamp,dragged:!1},e.setPointerCapture(h.pointerId))}),e.addEventListener("pointermove",h=>{h.pointerId!==this.lookPointer||!this.lookPoint||!this.active||(Math.hypot(h.clientX-this.lookGesture.x,h.clientY-this.lookGesture.y)>10&&(this.lookGesture.dragged=!0),h.preventDefault(),n(h.clientX-this.lookPoint[0],h.clientY-this.lookPoint[1]),document.getElementById("look-hint").hidden=!0,this.lookPoint=[h.clientX,h.clientY])});let c=h=>{if(h.pointerId!==this.lookPointer)return;let u=this.lookGesture,d=h.type==="pointerup"&&this.active&&u&&!u.dragged&&h.timeStamp-u.time<=350&&Math.hypot(h.clientX-u.x,h.clientY-u.y)<=10;this.releaseLook(h.pointerId),d&&r()};for(let h of["pointerup","pointercancel","lostpointercapture"])e.addEventListener(h,c);window.addEventListener("blur",()=>this.reset()),window.addEventListener("resize",()=>this.reset()),document.addEventListener("visibilitychange",()=>this.reset()),t.addEventListener("contextmenu",h=>h.preventDefault())}claimLook(e,t){return!this.active||this.lookPointer!==null?!1:(this.lookPointer=e,this.lookElement=t,!0)}releaseLook(e){if(e!==this.lookPointer)return;let t=this.lookElement;this.lookPointer=null,this.lookPoint=null,this.lookElement=null,this.lookGesture=null,t?.hasPointerCapture(e)&&t.releasePointerCapture(e)}resetMovement(){this.axes.forward=0,this.axes.right=0,this.movePointer=null,this.sprinting=!1,this.thumb.style.transform="",this.pad.classList.remove("engaged","sprinting"),this.pad.querySelector(".pad-label").textContent="Push farther to sprint"}reset(){let e=this.movePointer;this.resetMovement(),this.releaseLook(this.lookPointer),e!==null&&this.pad.hasPointerCapture(e)&&this.pad.releasePointerCapture(e)}setActive(e){this.active=e,e||this.reset()}};function Dm(s,e){let t=[...s.floorLevels??[{id:0,z:0},{id:1,z:s.levelHeight}]].sort((n,r)=>n.z-r.z);if(!e||e.z<t[0].z-.15||e.z>t.at(-1).z+2.5)return!1;let i=t.findLast(n=>e.z>=n.z-.2)??t[0];return s.planRooms.some(n=>n.floor===i.id&&$t(e.x,e.y,n.polygon_m))}var dh=class{constructor(e){this.data=e,this.reset()}reset(){this.phase="waiting",this.survived=0,this.wasInside=!1}arm(e){return this.phase!=="waiting"?!1:(this.phase="armed",this.wasInside=Dm(this.data,e),!0)}advance(e,t=!0,i){if(!t)return!1;if(this.phase==="armed"){let n=Dm(this.data,i),r=n&&!this.wasInside;if(this.wasInside=n,r)return this.phase="chasing",!0}else this.phase==="chasing"&&Number.isFinite(e)&&e>0&&(this.survived+=e);return!1}catch(){this.phase==="chasing"&&(this.phase="caught")}snapshot(){return{phase:this.phase,survived:this.survived,trigger:"house entry after garden shed bow pickup"}}};var zo=class{constructor(e=0,{type:t="shambler",style:i="classic",boss:n=!1,deathVariant:r=e%3}={}){this.group=new it,this.group.name=`Easter pursuer ${e+1}`,this.variant=e,this.heading=0,this.type=t,this.style=i,this.boss=n,this.small=i==="child",this.deathVariant=r,this.deathDuration=n?2.6:t==="brute"?2.35:t==="runner"?1.95:2.15,this.group.scale.set(...t==="brute"?[1.26,1.06,1.18]:t==="runner"?[.91,.97,.93]:t==="flanker"?[.96,1,.96]:[1,1,1]),this.small?this.group.scale.set(.66,.71,.66):n?this.group.scale.set(1.17,1.1,1.12):i.startsWith("woman")&&this.group.scale.multiply(new N(.95,.99,.95));let a=(b,w={})=>new Kt({color:b,roughness:.94,flatShading:!0,...w}),o=a(["#89936f","#87917c","#929578"][e%3]),l=a({"woman-coat":"#665365","woman-hoodie":"#4b6571",worker:"#756547",hoodie:"#596b54",child:"#8c6b45",suit:"#3f4652",groundskeeper:"#485442"}[i]??["#485249","#5d5144","#40565b"][e%3]),c=a(i==="worker"?"#7a6b3c":"#27302e"),h=a(["#343b38","#34383f","#424137"][e%3]),u=a("#9a987f"),d=a("#d4cf9e",{emissive:"#9b9b57",emissiveIntensity:.22}),f=new Ps(1,8,6),g=new gt(1,1,1),y=new zn(1,1,3,7),p=(b,w,T,C,D)=>{let P=new Ze(w,T);return P.position.set(...C),P.scale.set(...D),P.castShadow=!0,P.receiveShadow=!0,b.add(P),P},m=(b,w)=>{let T=new it;return T.position.set(...w),b.add(T),T},_=(b,w,T,C)=>p(b,y,w,[0,-T/2,0],[C,T/3,C]);this.body=m(this.group,[0,.83,0]),p(this.body,f,h,[0,.025,0],[.163,.13,.105]),this.chest=m(this.body,[0,.15,0]),this.chest.rotation.x=.16,p(this.chest,y,l,[0,.185,0],[.158,.17,.1]);for(let b=0;b<5;b++)p(this.chest,g,l,[-.12+b*.06,-.062-b%2*.023,.025],[.053,.085+b%2*.035,.17]);p(this.chest,g,u,[0,.205,.102],[.09,.31,.012]);for(let b of[-1,1]){let w=p(this.chest,g,l,[b*.066,.23,.117],[.045,.29,.022]);w.rotation.z=b*.14}p(this.chest,g,c,[0,.16,.128],[.023,.27,.014]),this.head=m(this.chest,[0,.495,.045]),this.head.rotation.z=-.12-e*.025,p(this.head,y,o,[0,-.069,0],[.043,.045,.048]),p(this.head,f,o,[0,.059,.003],[.123,.151,.113]),p(this.head,f,o,[0,-.015,.052],[.091,.065,.074]);for(let b of[-1,1]){p(this.head,f,o,[b*.12,.045,0],[.026,.041,.019]);let w=p(this.head,f,c,[b*.047,.076,.099],[.039,.025,.02]);w.rotation.z=b*.12,p(this.head,f,d,[b*.047,.075,.116],[.016,.01,.007]);let T=p(this.head,g,o,[b*.047,.103,.111],[.072,.018,.025]);T.rotation.z=b*.15}p(this.head,g,o,[0,.04,.12],[.032,.055,.032]);let S=p(this.head,g,c,[.005,-.013,.116],[.066,.014,.014]);if(S.rotation.z=.1,p(this.head,f,c,[-.01,.17,-.016],[.117,.051,.099]),p(this.head,f,c,[-.099,.091,-.045],[.031,.086,.075]),i==="woman-coat"&&(p(this.head,f,c,[.015,.035,-.058],[.132,.177,.085]),p(this.head,f,c,[.097,-.035,.017],[.037,.124,.073]),p(this.chest,g,l,[0,-.1,-.008],[.315,.23,.22]),p(this.chest,g,u,[0,.005,.113],[.28,.027,.018])),i==="hoodie"||i==="woman-hoodie"){let b=p(this.head,new _i(.126,.03,5,12),c,[0,.06,-.025],[1,1.22,.95]);p(this.head,f,c,[0,.075,-.07],[.134,.166,.077]);for(let w of[-1,1])p(this.chest,g,u,[w*.04,.255,.124],[.009,.17,.009]);i==="woman-hoodie"&&p(this.head,f,c,[.028,-.06,-.145],[.058,.116,.055])}if(i==="worker"&&(p(this.head,f,c,[0,.189,-.008],[.141,.078,.13]),p(this.head,g,c,[0,.152,.018],[.3,.02,.3]),p(this.chest,g,u,[0,.26,.121],[.29,.039,.015])),i==="suit"){for(let b of[-1,1]){let w=p(this.chest,g,u,[b*.043,.332,.125],[.048,.08,.02]);w.rotation.z=b*.45}p(this.chest,g,c,[0,.307,.144],[.035,.042,.02])}this.small&&(this.head.scale.setScalar(1.18),p(this.chest,g,u,[0,.11,.113],[.115,.12,.019])),(n||i==="groundskeeper")&&(p(this.chest,g,l,[0,-.11,0],[.33,.26,.235]),p(this.chest,g,u,[0,.16,.122],[.17,.34,.022]),p(this.head,g,c,[0,.168,.047],[.25,.042,.255]),p(this.head,f,c,[0,-.04,.048],[.1,.088,.084])),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[];for(let b of[-1,1]){let w=m(this.chest,[b*(n?.166:.194),.355,0]);w.rotation.z=b*.09,_(w,l,.255,.058);let T=m(w,[0,-.25,0]);p(T,f,o,[0,0,0],[.044,.045,.044]),_(T,o,.255,.043),p(T,f,o,[0,-.282,.006],[.05,.073,.033]),p(T,g,o,[b*.029,-.292,.029],[.022,.072,.02]),this.arms.push(w),this.elbows.push(T);let C=m(this.body,[b*.092,-.024,0]);_(C,h,.36,.07);let D=m(C,[0,-.355,0]);_(D,h,.31,.051),p(D,f,h,[0,0,0],[.057,.06,.054]),this.feet.push(p(D,g,c,[0,-.36,.044],[.13,.11,.25])),this.legs.push(C),this.knees.push(D)}let x=new Set,M=[];this.group.traverse(b=>{b.isMesh?x.add(b.geometry):M.push(b)});for(let b of M){let w=new Map;for(let T of[...b.children])if(T.isMesh){let C=w.get(T.material)??[];C.push(T),w.set(T.material,C)}for(let[T,C]of w)if(C.length>1){let D=C.map(I=>(I.updateMatrix(),I.geometry.clone().applyMatrix4(I.matrix))),P=new Ze(Rn(D),T);P.castShadow=!0,P.receiveShadow=!0,C.forEach(I=>b.remove(I)),b.add(P),D.forEach(I=>I.dispose())}}let v=new Set;this.meshCount=0,this.bodyMeshes=[],this.group.traverse(b=>{b.isMesh&&(v.add(b.geometry),this.meshCount++,this.bodyMeshes.push(b))}),x.forEach(b=>{v.has(b)||b.dispose()}),this.head.traverse(b=>{b.isMesh&&(b.userData.hitZone="head")});let A=new Set;this.group.traverse(b=>{b.isMesh&&A.add(b.material)}),this.materials=[...A];for(let b of this.materials)b.userData.baseEmissive=b.emissive.clone();this.solePoint=new N,this.motionBlend=0,this.lookYaw=0,this.previousAction="",this.recoilSide=e%2?1:-1,this.update(0,{x:0,y:0,z:0},{x:0,y:-1},!1,0)}soleHeights(){return this.group.updateMatrixWorld(!0),this.feet.map(e=>{let t=1/0;for(let i of[-.5,.5])for(let n of[-.5,.5])for(let r of[-.5,.5])this.solePoint.set(i,n,r).applyMatrix4(e.matrixWorld),t=Math.min(t,this.solePoint.y);return t})}update(e,t,i,n,r=1/60,a={}){let o=!!a.running,l=this.type==="brute",c=this.type==="flanker",h=(o?7:l?2.8:c?4.5:3.8)*(this.small?1.2:this.boss?.88:1),u=e*h,d=Math.sin(u),f=-d,g=Math.sin(e*1.43+this.variant*1.91);this.motionBlend+=(Number(n)-this.motionBlend)*Math.min(1,Math.max(0,r)*9);let y=this.motionBlend,p=Math.max(0,Math.sin(e*.55+this.variant*2.23))**10,m=a.state??"pursue";m==="stagger"&&this.previousAction!=="stagger"&&(this.recoilSide*=-1),this.previousAction=m,this.group.position.set(t.x,t.z+.01,-t.y);let _=0;if(Math.hypot(i.x,i.y)>1e-4){let M=Math.atan2(i.x,-i.y),v=Math.atan2(Math.sin(M-this.heading),Math.cos(M-this.heading));this.heading+=v*Math.min(1,r*8),_=Math.atan2(Math.sin(M-this.heading),Math.cos(M-this.heading))}this.lookYaw+=(Math.max(-.55,Math.min(.55,_))*.8-this.lookYaw)*Math.min(1,r*10),this.group.rotation.y=this.heading,this.body.position.set(0,.8,0),this.body.scale.set(1,1,1),this.body.rotation.set(c?.035:0,(o?.075:l?.06:.04)*d*y,.008*g+(l?.045:o?.018:.028)*d*y),this.chest.rotation.set((c?.28:o?.23:l?.12:.17)+.008*g,-d*y*(o?.13:c?.1:.055),g*.012-d*y*(l?.07:.035)),this.head.rotation.set(.015*g,this.lookYaw+(1-y)*(.13*Math.sin(e*.71+this.variant)+p*.18),-.09-this.variant*.02+.04*Math.sin(e*1.7+this.variant));let S=o?.49:l?.235:c?.3:.31;for(let M=0;M<2;M++){let v=M?f:d,A=M?1:-1;this.legs[M].rotation.set(v*S*y,0,A*(l?.026:.012)),this.knees[M].rotation.set((c?.16:M?.035:0)+Math.max(0,-v)*(o?.78:c?.4:.28)*y,0,0),this.arms[M].rotation.set(o?-.38+v*.61:-(M?.91:.69)+v*.09*y+.035*g,A*(c?.1:.025),A*(.075+.035*v*y)),this.elbows[M].rotation.set(o?-.83-v*.17:-(M?.22:.17),0,0)}!n&&m==="pursue"&&(this.arms[this.variant%2].rotation.x-=p*.26,this.elbows[(this.variant+1)%2].rotation.x-=p*.17),(m==="hide"||m==="peek")&&(this.chest.rotation.x=.31,this.knees[0].rotation.x=this.knees[1].rotation.x=.28,this.head.rotation.y=this.lookYaw+Math.sin(e*1.35+this.variant)*.22,this.chest.rotation.y=(m==="peek"?.13:.04)*Math.sin(e*1.35),this.arms[0].rotation.x=-.5,this.arms[1].rotation.x=-.6);let x=Math.max(0,Math.min(1,a.progress??0));if(m==="windup"){let M=x*x*(3-2*x);this.arms[0].rotation.x=-.9-M*1.75,this.arms[1].rotation.x=l?this.arms[0].rotation.x:-.85-M*.74,this.elbows[0].rotation.x=l?-.55:-.4,this.elbows[1].rotation.x=l?-.55:-.24,this.chest.rotation.x=.16-M*(l?.22:.15),this.chest.rotation.y=l?0:-M*.17,this.head.rotation.x=-M*.065,this.body.rotation.z=l?0:-M*.03}else if(m==="recover"){let M=Math.sin(Math.min(1,x/.28)*Math.PI/2),v=Math.max(0,(x-.28)/.72),A=-2.65+M*2.27-v*.31;this.arms[0].rotation.x=A,this.arms[1].rotation.x=l?A:-1.59+M*.95-v*.27,this.elbows[0].rotation.x=l?-.55+M*.42:-.4+M*.25,this.elbows[1].rotation.x=l?this.elbows[0].rotation.x:-.22,this.chest.rotation.x=(l?-.06:.01)+M*(l?.5:.32)-v*.28,this.chest.rotation.y=l?0:-.17+M*.35-v*.18,this.head.rotation.x=M*.08*(1-v)}else if(m==="stagger"){let M=Math.sin(x*Math.PI),v=l?.11:this.type==="runner"?.34:c?.23:.26;this.body.rotation.x=-v*M,this.body.rotation.y=this.recoilSide*v*.65*M,this.body.rotation.z=this.recoilSide*v*.2*M,this.head.rotation.x=-v*.65*M,this.head.rotation.z+=this.recoilSide*.2*M,this.arms[0].rotation.x-=M*.34,this.arms[1].rotation.x+=M*.16}if(m==="dead"){let M=Math.max(0,Math.min(1,(x-.06)/.54)),v=M*M*(3-2*M),A=this.variant%2?1:-1,b=this.type==="runner"?Math.sin(Math.min(1,x/.3)*Math.PI)*.12:0;this.body.position.y=.8-.57*v,this.body.position.z=(this.deathVariant===0?-.13:this.deathVariant===1?-.05:0)*v,this.body.rotation.y=A*.07*v,this.body.rotation.z=0,this.deathVariant===1?(this.body.rotation.z=A*1.45*v,this.body.rotation.x=.1*v,this.chest.rotation.x=.17+.08*v,this.body.position.x=A*.05*v):this.deathVariant===2?(this.body.rotation.x=-1.55*v-b,this.chest.rotation.x=.17-.1*v):(this.body.rotation.x=1.5*v+b,this.chest.rotation.x=.17+.23*v),this.head.rotation.x=.2*v,this.head.rotation.z+=A*.1*v,this.legs[0].rotation.x=this.legs[1].rotation.x=-(this.deathVariant===0?1:this.deathVariant===1?.5:.4)*v,this.knees[0].rotation.x=this.knees[1].rotation.x=(this.deathVariant===0?2.2:this.deathVariant===1?1:.8)*v,this.arms[0].rotation.x=this.arms[1].rotation.x=-.16-v*.12,this.arms[0].rotation.z=-.065,this.arms[1].rotation.z=.065,this.elbows[0].rotation.x=this.elbows[1].rotation.x=-.25-v*.32}for(let M=0;M<2;M++)this.feet[M].rotation.set(...m==="dead"?[0,0,0]:[-this.legs[M].rotation.x-this.knees[M].rotation.x-this.body.rotation.x,0,-this.legs[M].rotation.z-this.body.rotation.z]);if(m!=="dead"){let M=Math.min(...this.soleHeights());this.body.position.y+=(t.z+.004-M)/this.group.scale.y}this.group.updateMatrixWorld(!0);for(let M of this.materials){M.emissive.copy(M.userData.baseEmissive),a.hitFlash>0&&M.emissive.addScalar(a.hitFlash*.35);let v=m==="dead"?Math.max(0,Math.min(1,(1-x)/.26)):1;M.transparent!==v<1&&(M.transparent=v<1,M.needsUpdate=!0),M.opacity=v,M.depthWrite=v>.5}if(m==="dead"){this.deathBounds??=new Ft,this.meshBounds??=new Ft,this.group.updateMatrixWorld(!0),this.deathBounds.makeEmpty();for(let M of this.bodyMeshes)M.geometry.boundingBox||M.geometry.computeBoundingBox(),this.meshBounds.copy(M.geometry.boundingBox).applyMatrix4(M.matrixWorld),this.deathBounds.union(this.meshBounds);this.group.position.y+=t.z+.005-this.deathBounds.min.y}}dispose(){let e=new Set,t=new Set;this.group.traverse(i=>{i.isMesh&&(e.add(i.geometry),t.add(i.material))}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.group.removeFromParent()}};var Zr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),zd=s=>({x:s.x,y:s.y,z:s.z}),Lm=()=>globalThis.performance?.now()??Date.now(),Ws=class extends Vs{constructor(e){super({...e}),this.allSegments=this.segments,this.allObstacles=e.obstacles,this.allSurfaces=e.surfaces,this.buckets=new Map}bucket(e,t){let i=Math.floor(e/2),n=Math.floor(t/2),r=`${i},${n}`;if(this.buckets.has(r))return this.buckets.get(r);let a=(f,g,y,p)=>f<=i*2+2&&y>=i*2&&g<=n*2+2&&p>=n*2,o=f=>[Math.min(...f.map(g=>g[0])),Math.min(...f.map(g=>g[1])),Math.max(...f.map(g=>g[0])),Math.max(...f.map(g=>g[1]))],l=.3,c=this.allSegments.filter(f=>{let g=f.thickness/2+l;return a(Math.min(f.a[0],f.b[0])-g,Math.min(f.a[1],f.b[1])-g,Math.max(f.a[0],f.b[0])+g,Math.max(f.a[1],f.b[1])+g)}),h=this.allObstacles.filter(f=>{let[g,y,p,m]=f.box??o(f.polygon);return a(g-l,y-l,p+l,m+l)}),u=this.allSurfaces.filter(f=>a(...o(f.polygon))),d={segments:c,obstacles:h,surfaces:u};return this.buckets.set(r,d),d}blocked(e,t,i){let n=this.bucket(e,t);return this.segments=n.segments,this.data.obstacles=n.obstacles,super.blocked(e,t,i)}support(e,t,i){return this.data.surfaces=this.bucket(e,t).surfaces,super.support(e,t,i)}},$r=class{constructor(e,{spacing:t=.2,radius:i=.18}={}){this.nav=new Ws(e),this.nav.radius=i,this.spacing=t,this.cells=new Map,this.edges=new Map,this.nodes=[],this.data=e}cell(e,t){let i=`${e},${t}`;if(this.cells.has(i))return this.cells.get(i);let n=e*this.spacing,r=t*this.spacing,a=(this.data.floorLevels??[{z:0},{z:this.data.levelHeight}]).map(c=>c.z);a.push(...this.nav.rampHeights(n,r));for(let c of this.nav.bucket(n,r).surfaces)$t(n,r,c.polygon)&&a.push(c.z);let o=this.nav.stairHeight(n,r);o!==null&&a.push(o);let l=[];for(let c of a){let h=this.nav.support(n,r,c);if(h===null||l.some(d=>Math.abs(d.z-h)<.035)||this.nav.blocked(n,r,h))continue;let u={x:n,y:r,z:h,ix:e,iy:t,id:this.nodes.length};this.nodes.push(u),l.push(u)}return this.cells.set(i,l),l}clear(e,t){let i=Math.hypot(t.x-e.x,t.y-e.y);if(i<1e-5)return Math.abs(e.z-t.z)<.04;let n=Math.ceil(i/.04),r=e.z;for(let a=1;a<=n;a++){let o=a/n,l=e.x+(t.x-e.x)*o,c=e.y+(t.y-e.y)*o,h=this.nav.support(l,c,r);if(h===null||this.nav.blocked(l,c,h))return!1;r=h}return Math.abs(r-t.z)<.045}connectors(e,t=!0){let i=Math.round(e.x/this.spacing),n=Math.round(e.y/this.spacing),r=[];for(let a=-2;a<=2;a++)for(let o=-2;o<=2;o++)for(let l of this.cell(i+a,n+o))Math.abs(l.z-e.z)>.35||r.push(l);return r.sort((a,o)=>Zr(a,e)-Zr(o,e)).filter(a=>t?this.clear(e,a):this.clear(a,e)).slice(0,8)}neighbours(e){if(this.edges.has(e.id))return this.edges.get(e.id);let t=[];for(let i=-1;i<=1;i++)for(let n=-1;n<=1;n++)if(!(!i&&!n))for(let r of this.cell(e.ix+i,e.iy+n))Math.abs(r.z-e.z)>.39||!this.clear(e,r)||t.push(r);return this.edges.set(e.id,t),t}search(e,t){return new Hd(this,e,t)}path(e,t,i=6e4){let n=this.search(e,t);for(;!n.done&&n.expanded<i;)n.step(1e3,1/0);return n.path}},Gd=class{constructor(){this.a=[]}push(e){let t=this.a,i=t.length;for(t.push(e);i;){let n=i-1>>1;if(t[n].f<=e.f)break;t[i]=t[n],i=n}t[i]=e}pop(){let e=this.a,t=e[0],i=e.pop();if(e.length){let n=0;for(;2*n+1<e.length;){let r=2*n+1;if(r+1<e.length&&e[r+1].f<e[r].f&&r++,e[r].f>=i.f)break;e[n]=e[r],n=r}e[n]=i}return t}get length(){return this.a.length}},Hd=class{constructor(e,t,i){this.planner=e,this.from=zd(t),this.to=zd(i),this.path=null,this.done=!1,this.expanded=0,this.heap=new Gd,this.cost=new Map,this.parent=new Map,this.closed=new Set,this.initialized=!1}step(e=48,t=3){if(this.done)return!0;let i=Lm(),n=this.planner;if(!this.initialized){if(this.initialized=!0,n.clear(this.from,this.to))return this.path=[this.from,this.to],this.done=!0,!0;let a=n.connectors(this.to,!1);this.goals=new Set(a.map(o=>o.id));for(let o of n.connectors(this.from)){let l=Zr(this.from,o);this.cost.set(o.id,l),this.heap.push({n:o,g:l,f:l+Zr(o,this.to)})}if(!this.goals.size||!this.heap.length)return this.done=!0,!0}let r=0;for(;this.heap.length&&r<e&&Lm()-i<t;){let{n:a,g:o}=this.heap.pop();if(!this.closed.has(a.id)){if(this.closed.add(a.id),this.expanded++,r++,this.goals.has(a.id)){let l=[this.to],c=a;for(;c;)l.push(zd(c)),c=n.nodes[this.parent.get(c.id)];return l.push(this.from),this.path=l.reverse(),this.done=!0,!0}for(let l of n.neighbours(a)){if(this.closed.has(l.id))continue;let c=o+Zr(a,l);c>=(this.cost.get(l.id)??1/0)||(this.cost.set(l.id,c),this.parent.set(l.id,a.id),this.heap.push({n:l,g:c,f:c+Zr(l,this.to)}))}if(this.expanded>=6e4)return this.done=!0,!0}}return this.heap.length||(this.done=!0),this.done}};var Ri=s=>({x:s.x,y:s.y,z:s.z}),Qr=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z),Ci=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),ea=()=>performance.now(),ta=(s,e=0)=>{let t=s+Math.imul(e+17,92821)>>>0;return t=Math.imul(t^t>>>16,73244475),t=Math.imul(t^t>>>16,73244475),((t^t>>>16)>>>0)/4294967296},nM=Object.freeze({shambler:{health:75,speed:1.06,radius:.25,wallRadius:.18,damage:12,range:.84,windup:.78,recovery:1.05},runner:{health:52,speed:1.88,radius:.23,wallRadius:.18,damage:9,range:.79,windup:.48,recovery:.82},brute:{health:180,speed:.79,radius:.31,wallRadius:.23,damage:26,range:1.02,windup:1.16,recovery:1.48},flanker:{health:90,speed:1.31,radius:.24,wallRadius:.18,damage:14,range:.85,windup:.64,recovery:1.03}}),fh=class{constructor(e,{maxAlive:t=12,onAttack:i=()=>{},onDeath:n=()=>{},canSpawn:r=()=>!0}={}){this.data=e,this.maxAlive=Math.max(1,Math.min(20,Math.floor(t))),this.onAttack=i,this.onDeath=n,this.canSpawn=r,this.group=new it,this.group.name="Survival horde",this.actors=[],this.planners=new Map,this.nextId=1,this.time=0,this.wave=0,this.total=0,this.spawned=0,this.killed=0,this.skipped=0,this.droppedSpawns=0,this.active=!1,this.player={x:0,y:0,z:0},this.heading={x:0,y:1},this.spawnJob=null,this.candidates=[],this.nextSpawn=0,this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0,this.roundRobin=0}get positions(){return this.actors.filter(e=>e.alive).map(e=>Ri(e.nav.position))}planner(e=.18){return this.planners.has(e)||this.planners.set(e,new $r(this.data,{radius:e,spacing:e>.24?.16:.2})),this.planners.get(e)}reset(){for(let e of this.actors)e.figure.dispose();this.actors=[],this.group.clear(),this.spawnJob=null,this.candidates=[],this.active=!1,this.total=this.spawned=this.killed=this.skipped=this.droppedSpawns=0,this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0,this.time=0}startWave(e,t,i){return this.reset(),this.wave=Math.max(1,Math.floor(e)),this.total=Math.max(1,Math.floor(i??4+this.wave*3)),this.active=!0,this.player=Ri(t),this.nextSpawn=0,this.state()}state(){let e=this.actors.filter(n=>n.alive).length,t=Math.max(0,this.total-this.spawned-this.droppedSpawns),i=this.actors.find(n=>n.alive&&n.boss);return{wave:this.wave,alive:e,queued:t,killed:this.killed,total:this.total,spawned:this.spawned,skipped:this.skipped,complete:this.active&&e===0&&t===0&&!this.spawnJob,positions:this.positions,boss:i?{id:i.id,health:i.health,maxHealth:i.maxHealth}:null}}blocks(e,t=.18,i=null){return this.actors.some(n=>n.alive&&n.id!==i&&Math.abs(n.nav.position.z-e.z)<1.6&&Ci(n.nav.position,e)<n.radius+t+1e-5)}typeFor(e){let t=this.wave%5===0?["brute","shambler","brute","runner","brute","flanker","brute","shambler"]:this.wave%3===0?["runner","runner","shambler","runner","flanker","runner","brute","runner"]:this.wave===1?["shambler","shambler","runner","shambler"]:this.wave===2?["shambler","runner","flanker","shambler","runner"]:["shambler","runner","flanker","brute","runner","shambler"];return t[e%t.length]}appearance(e,t){let i=this.wave%5===0&&e===0,n=["woman-coat","worker","hoodie","child","suit","woman-hoodie"],r=i?"groundskeeper":n[(e+this.wave-1)%n.length];r==="child"&&t==="brute"&&(r="worker");let a={...nM[t]};return i?Object.assign(a,{health:350,speed:.69,radius:.32,wallRadius:.25,damage:34,windup:1.38,recovery:1.75,range:1.08}):r==="child"&&Object.assign(a,{health:Math.round(a.health*.65),speed:a.speed*1.08,radius:.17,wallRadius:.13,range:.66,windup:a.windup*.9,recovery:a.recovery*.92}),{style:r,boss:i,stats:a}}spawnAllowed(e,t){return this.canSpawn(e,t)?!0:(this.spawnVisibilityBlocked=!0,this.spawnStall=0,!1)}spawnCandidates(e,t,i,n){let r=this.planner(i),a=[];for(let h of this.data.rooms??[]){let[u,d,f]=h.position;for(let[g,y]of[[0,0],[.65,0],[-.65,0],[0,.65],[0,-.65]])a.push({x:u+g,y:d+y,z:f})}for(let h of[6,9,13])for(let u=0;u<20;u++){let d=u*Math.PI/10;a.push({x:e.x+Math.cos(d)*h,y:e.y+Math.sin(d)*h,z:e.z})}let o=Math.hypot(t.x,t.y)||1,l=t.x/o,c=t.y/o;return a.filter(h=>Qr(h,e)>5&&Qr(h,e)<27&&r.nav.support(h.x,h.y,h.z)!==null&&!r.nav.blocked(h.x,h.y,h.z)&&!this.blocks(h,.45)&&this.spawnAllowed(h,n)).map(h=>{let u=Ci(h,e),d=((h.x-e.x)*l+(h.y-e.y)*c)/(u||1)>.55;return{...h,score:Math.abs(u-9)+(d?6:0)+Math.abs(h.z-e.z)*.7}}).sort((h,u)=>h.score-u.score).slice(0,90)}createActor(e,t,i,n=this.appearance(this.spawned,e)){let{stats:r,style:a,boss:o}=n,l=this.nextId++,c=o?0:Math.floor(ta(l,55)*3),h=new zo(l%3,{type:e,style:a,boss:o,deathVariant:c});h.group.userData.actorId=l,h.group.traverse(y=>{y.isMesh&&(y.userData.actorId=l)}),this.group.add(h.group);let u=new Ws(this.data);u.radius=r.wallRadius,u.position=Ri(t);let d=1+Math.min(.55,Math.max(0,this.wave-1)*.035),f=Math.round(r.health*d),g={id:l,type:e,style:a,boss:o,stats:r,figure:h,nav:u,radius:r.radius,health:f,maxHealth:f,alive:!0,state:"pursue",stateTime:0,path:i,index:1,job:null,lastTarget:Ri(this.player),nextPlan:this.time+.4+l%5*.12,stalled:0,unreachable:0,lastProgress:this.time,phase:l*1.713,flankSide:l%2?1:-1,flankUntil:0,attackAim:{x:0,y:1},hitFlash:0,staggerDuration:.35,deathTime:0,deathDuration:h.deathDuration,deathVariant:c,knockback:{x:0,y:0},speedMultiplier:.78+ta(l,this.wave)*.47,temperament:!o&&this.wave>2&&(this.spawned+this.wave)%7===0?"ambusher":"pursuer",hideGoal:null,hideUntil:0,nextHide:this.time+12+ta(l,9)*8,alerted:!1,noticeDirection:{x:this.player.x-t.x,y:this.player.y-t.y}};return h.update(this.time,t,{x:this.player.x-t.x,y:this.player.y-t.y},!1,1),this.actors.push(g),this.spawned++,g.temperament==="ambusher"&&this.beginHide(g),g}spawnStep(e,t){if(!(this.state().queued<=0||this.actors.filter(i=>i.alive).length>=this.maxAlive)&&(this.spawnVisibilityBlocked||(this.spawnStall+=e),!(this.time<this.nextSpawn))){if(!this.spawnJob){let i=this.typeFor(this.spawned),n=this.appearance(this.spawned,i),r=n.stats.wallRadius;this.candidates.length||(this.spawnVisibilityBlocked=!1,this.candidates=this.spawnCandidates(this.player,this.heading,r,n),this.candidateRounds++);let a=this.candidates.shift();a&&!this.planner(r).nav.blocked(a.x,a.y,a.z)&&this.spawnAllowed(a,n)&&(this.spawnJob={point:a,type:i,appearance:n,job:this.planner(r).search(a,this.player),started:this.time})}if(this.spawnJob&&ea()<t){let{point:i,type:n,appearance:r,job:a,started:o}=this.spawnJob;a.step(28,Math.max(.1,t-ea())),(a.done||a.expanded>12e3||this.time-o>8)&&(a.path&&Qr(i,this.player)>5&&!this.blocks(i,r.stats.radius+.16)&&this.spawnAllowed(i,r)&&(this.createActor(n,i,a.path,r),this.nextSpawn=this.time+Math.max(.28,.72-this.wave*.035),this.spawnStall=0,this.spawnVisibilityBlocked=!1,this.candidateRounds=0),this.spawnJob=null)}if(!this.spawnVisibilityBlocked&&this.spawnStall>28){let i=this.state().queued;this.skipped+=i,this.droppedSpawns+=i,this.spawnJob=null,this.candidates=[]}}}target(e){let t=e.nav.position,i=this.player,n=this.planner(e.stats.wallRadius);if(e.hideGoal&&["seeking-hide","hide","peek"].includes(e.state))return Ri(e.hideGoal);if(e.type==="flanker"&&Ci(t,i)>2.3&&Math.abs(t.z-i.z)<.3){let r=i.x-t.x,a=i.y-t.y,o=Math.hypot(r,a)||1,l=1.25*e.flankSide,c={x:i.x-a/o*l,y:i.y+r/o*l,z:i.z};if(n.nav.support(c.x,c.y,c.z)!==null&&!n.nav.blocked(c.x,c.y,c.z)&&n.clear(c,i))return c}return Ri(i)}canSee(e,t=this.player){let i=e.nav.position,n=t.x-i.x,r=t.y-i.y,a=Math.hypot(n,r),o=e.noticeDirection;if(a>12||Math.abs(i.z-t.z)>.45)return!1;let l=Math.hypot(o.x,o.y)||1;return(n*o.x+r*o.y)/(Math.max(.001,a)*l)>.5&&this.planner(e.stats.wallRadius).clear(i,t)}wallOccludes(e,t){let i=this.player,n=i.x-t.x,r=i.y-t.y;for(let a of this.planner(e.stats.wallRadius).nav.allSegments){if(a.bottom>t.z+1.3||a.top<t.z+1.3)continue;let o=a.b[0]-a.a[0],l=a.b[1]-a.a[1],c=n*l-r*o;if(Math.abs(c)<1e-8)continue;let h=a.a[0]-t.x,u=a.a[1]-t.y,d=(h*l-u*o)/c,f=(h*r-u*n)/c;if(d>0&&d<1&&f>=0&&f<=1)return!0}return!1}coverPoint(e){let t=e.nav.position,i=this.planner(e.stats.wallRadius);if(this.wallOccludes(e,t))return Ri(t);let n=[];for(let r of i.nav.allSegments){if(r.bottom>t.z+.3||r.top<t.z+1.2)continue;let a=r.b[0]-r.a[0],o=r.b[1]-r.a[1],l=Math.hypot(a,o);if(l<.6)continue;let c=a/l,h=o/l,u=r.thickness/2+e.stats.wallRadius+.16;for(let d of[r.a,r.b])for(let f of[-1,1]){let g={x:d[0]-h*u*f,y:d[1]+c*u*f,z:t.z};Ci(t,g)<4&&Ci(g,this.player)>2&&n.push(g)}}for(let r of n.sort((a,o)=>Ci(a,t)-Ci(o,t)).slice(0,18))if(i.nav.support(r.x,r.y,r.z)!==null&&!i.nav.blocked(r.x,r.y,r.z)&&!this.blocks(r,e.radius,e.id)&&this.wallOccludes(e,r))return r;return null}beginHide(e){let t=this.coverPoint(e);if(e.nextHide=this.time+14+ta(e.id,Math.floor(this.time))*8,!t)return!1;let i=e.path?.[1]??this.player;return e.hideGoal=t,e.hideUntil=this.time+6+ta(e.id,4)*3.5,e.state=Ci(t,e.nav.position)<.2?"hide":"seeking-hide",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=!1,e.noticeDirection={x:i.x-e.nav.position.x,y:i.y-e.nav.position.y},e.peekBase=Math.atan2(e.noticeDirection.y,e.noticeDirection.x),!0}endHide(e,t=!1){e.hideGoal=null,e.state="pursue",e.stateTime=0,e.path=null,e.job=null,e.nextPlan=this.time,e.alerted=t}canStrike(e,t=0){let i=e.nav.position;return Math.abs(i.z-this.player.z)<.42&&Ci(i,this.player)<=e.stats.range+t&&this.planner(e.stats.wallRadius).clear(i,this.player)}tryMove(e,t,i,{separate:n=!0}={}){let r=Math.max(1,Math.ceil(Math.hypot(t,i)/.035)),a=Ri(e.nav.position);for(let o=0;o<r;o++){let l=Ri(e.nav.position);e.nav.move(t/r,i/r);let c=e.nav.position;if(Math.abs(c.z-this.player.z)<1.6&&Ci(c,this.player)<e.radius+.18||n&&this.blocks(c,e.radius,e.id)){e.nav.position=l;break}}return Ci(a,e.nav.position)}moveActor(e,t){if(!e.path||e.index>=e.path.length)return 0;let i=this.planner(e.stats.wallRadius),n=e.nav.position;for(let S=Math.min(e.path.length-1,e.index+4);S>e.index;S--)if(Qr(n,e.path[S])<1.1&&i.clear(n,e.path[S])){e.index=S;break}let r=e.path[e.index],a=r.x-n.x,o=r.y-n.y,l=Math.hypot(a,o);if(l<.045)return e.index++,0;let c=e.stats.speed*e.speedMultiplier*(1+Math.min(.2,this.wave*.009));e.type==="runner"&&(c*=Math.sin(this.time*.8+e.phase)>.35?1.2:.84),e.type==="brute"&&(c*=.94+.06*Math.sin(this.time*2+e.phase));let h=Math.min(l,c*t),u=a/l,d=o/l,f=0,g=0;for(let S of this.actors)if(S!==e&&S.alive&&Math.abs(S.nav.position.z-n.z)<1.2){let x=n.x-S.nav.position.x,M=n.y-S.nav.position.y,v=Math.hypot(x,M),A=e.radius+S.radius+.35;v>0&&v<A&&(f+=x/v*(A-v)/A,g+=M/v*(A-v)/A)}let y=u+f*.8,p=d+g*.8,m=Math.hypot(y,p)||1,_=this.tryMove(e,y/m*h,p/m*h);if(_<h*.2){let S=e.flankSide;_+=this.tryMove(e,(u*.35-d*S*.75)*h,(d*.35+u*S*.75)*h)}return e.stalled=_<h*.12?e.stalled+t:Math.max(0,e.stalled-t*2),_>.003&&(e.lastProgress=this.time),e.stalled>.7&&(e.path=null,e.job=null,e.nextPlan=this.time+.15,e.stalled=0,e.flankSide*=-1),_}planActor(e,t){if(e.state==="hide"||e.state==="peek")return;let i=this.target(e),n=this.planner(e.stats.wallRadius);if(!e.job&&this.time>=e.nextPlan&&(!e.path||e.index>=e.path.length||Qr(i,e.lastTarget)>.75)&&(e.job=n.search(e.nav.position,i),e.lastTarget=Ri(i),e.nextPlan=this.time+1+e.id%4*.14,e.jobStarted=this.time),e.job&&ea()<t&&(e.job.step(22,Math.max(.1,t-ea())),e.job.done||this.time-e.jobStarted>8)){if(e.job.path){e.path=e.job.path,e.index=1,e.unreachable=0;let r=1/0;for(let a=1;a<e.path.length;a++){let o=Qr(e.nav.position,e.path[a]);o<r&&n.clear(e.nav.position,e.path[a])&&(e.index=a,r=o)}}else e.unreachable++,e.path=null,e.nextPlan=this.time+1.4;e.job=null}e.unreachable>=5&&this.time-e.lastProgress>40&&(e.alive=!1,e.state="dead",e.deathTime=0,e.retired=!0,this.skipped++)}damage(e,t,{headshot:i=!1,knockback:n=null}={}){let r=this.actors.find(a=>a.id===e&&a.alive);if(!r||!Number.isFinite(t)||t<=0)return{hit:!1,killed:!1,id:e};if(r.health=Math.max(0,r.health-t),r.hitFlash=1,n){let a=Array.isArray(n)?n[0]:n.x,o=Array.isArray(n)?n[1]:n.y;if(Number.isFinite(a)&&Number.isFinite(o)){let l=Math.hypot(a,o),c=l>1.1?1.1/l:1;r.knockback={x:a*c,y:o*c}}}return r.health===0?(r.alive=!1,r.state="dead",r.deathTime=0,r.job=null,this.killed++,this.onDeath({id:r.id,type:r.type,style:r.style,boss:r.boss,headshot:i,position:Ri(r.nav.position)})):(r.state="stagger",r.stateTime=0,r.hideGoal=null,r.alerted=!0,r.staggerDuration=(r.type==="brute"?.2:.34)+(i?.14:0)),{hit:!0,killed:!r.alive,health:r.health,id:e}}step(e,t,i={x:0,y:1}){if(!this.active)return this.state();e=Math.max(0,Math.min(.08,e)),this.time+=e,this.player=Ri(t),this.heading=Array.isArray(i)?{x:i[0],y:i[1]}:typeof i=="number"?{x:-Math.sin(i),y:Math.cos(i)}:i;let n=ea()+4;this.spawnStep(e,n);let r=this.actors.filter(a=>a.alive);for(let a=0;a<r.length;a++){let o=r[(a+this.roundRobin)%r.length];if(ea()>=n)break;this.planActor(o,n)}this.roundRobin++;for(let a of[...this.actors]){let o=Ri(a.nav.position);if(a.hitFlash=Math.max(0,a.hitFlash-e*5),!a.alive){a.deathTime+=e,a.figure.update(this.time,a.nav.position,{x:0,y:0},!1,e,{state:"dead",progress:a.deathTime/a.deathDuration}),a.deathTime>=a.deathDuration&&(a.figure.dispose(),this.actors.splice(this.actors.indexOf(a),1));continue}a.stateTime+=e;let l=0,c=a.knockback;if(Math.hypot(c.x,c.y)>.001){let d=1-Math.exp(-e*12);this.tryMove(a,c.x*d,c.y*d),c.x*=1-d,c.y*=1-d}if(["hide","peek","seeking-hide"].includes(a.state)){let d=a.peekBase+Math.sin(this.time*1.35+a.phase)*.55;a.noticeDirection={x:Math.cos(d),y:Math.sin(d)},this.time>=a.hideUntil||this.canSee(a)?this.endHide(a,this.canSee(a)):a.state==="seeking-hide"?(l=this.moveActor(a,e),a.hideGoal&&Ci(a.nav.position,a.hideGoal)<.25&&(a.state="hide",a.stateTime=0,a.path=null,a.job=null)):a.state=Math.sin(this.time*1.2+a.phase)>.25?"peek":"hide"}else if(a.state==="pursue"&&a.type==="flanker"&&!a.boss&&this.wave>2&&this.time>=a.nextHide)a.nextHide=this.time+14,Ci(a.nav.position,t)>2.5&&Ci(a.nav.position,t)<9&&ta(a.id,Math.floor(this.time/10))<.35&&this.beginHide(a)||(l=this.moveActor(a,e));else if(a.state==="stagger")a.stateTime>=a.staggerDuration&&(a.state="pursue",a.stateTime=0);else if(a.state==="windup"){if(a.stateTime>=a.stats.windup){let d=t.x-a.nav.position.x,f=t.y-a.nav.position.y,g=Math.hypot(d,f)||1;this.canStrike(a,.08)&&(d*a.attackAim.x+f*a.attackAim.y)/g>.55&&this.onAttack({id:a.id,type:a.type,damage:a.stats.damage,position:Ri(a.nav.position)}),a.state="recover",a.stateTime=0}}else if(a.state==="recover")a.stateTime>=a.stats.recovery&&(a.state="pursue",a.stateTime=0);else if(this.canStrike(a)){let d=t.x-a.nav.position.x,f=t.y-a.nav.position.y,g=Math.hypot(d,f)||1;a.state="windup",a.stateTime=0,a.attackAim={x:d/g,y:f/g}}else l=this.moveActor(a,e);let h=a.state==="windup"||a.state==="recover"?a.attackAim:["hide","peek"].includes(a.state)?a.noticeDirection:{x:a.nav.position.x-o.x,y:a.nav.position.y-o.y};Math.hypot(h.x,h.y)>1e-4&&!["hide","peek","seeking-hide"].includes(a.state)&&(a.noticeDirection={...h});let u=a.state==="windup"?a.stats.windup:a.state==="recover"?a.stats.recovery:a.staggerDuration;a.figure.update(this.time+a.phase,a.nav.position,h,l>.001,e,{state:a.state,progress:a.stateTime/u,running:a.type==="runner"&&l>.001,hitFlash:a.hitFlash})}return this.state()}};function sM(s,e={},t=new Ft){let i=e.style==="child",n=e.boss||e.stats?.radius>=.3,r=i?.82:n?1.3:1.12,a=i?2.05:n?3.1:2.8;return t.min.set(s.x-r,s.z-.15,-s.y-r),t.max.set(s.x+r,s.z+a,-s.y+r),t}function Nm(s,{margin:e=.15}={}){let t=new Be,i=new Be,n=new vn,r=new Ft,a=1+Math.max(0,e);return(o,l={})=>{if(!s?.isCamera||![o?.x,o?.y,o?.z].every(Number.isFinite))return!1;s.updateWorldMatrix(!0,!1),t.copy(s.projectionMatrix);for(let c of[0,4,8,12,1,5,9,13])t.elements[c]/=a;return i.multiplyMatrices(t,s.matrixWorldInverse),n.setFromProjectionMatrix(i,s.coordinateSystem,s.reversedDepth),!n.intersectsBox(sM(o,l,r))}}var Ht={bow:{label:"Bow",magazine:1,reserve:18,damage:75,interval:.55,reload:0},pistol:{label:"Pistol",magazine:12,reserve:48,damage:42,interval:.24,reload:1.3},shotgun:{label:"Shotgun",magazine:6,reserve:24,damage:23,pellets:7,interval:.9,reload:2.1},carbine:{label:"Carbine",magazine:24,reserve:96,damage:30,interval:.115,reload:1.8}},ph=s=>({total:4+s*2+(s%3===0?4:0),event:s%5===0?"Heavy footsteps":s%3===0?"The rush":"Hold the house",rest:14}),mh=class{constructor(){this.reset()}reset(){this.health=100,this.score=0,this.kills=0,this.wave=0,this.phase="prepare",this.rest=0,this.inventory={},this.weapon=null,this.cooldown=0,this.reloading=0,this.charge=0,this.firing=!1,this.shoveCooldown=0,this.combo=0,this.comboTime=0}acquire(e){if(!Ht[e])return!1;if(this.inventory[e])return this.supply(),!1;let t=Ht[e];return this.inventory[e]={loaded:e==="bow"?0:t.magazine,reserve:t.reserve},this.weapon=e,this.reloading=0,this.firing=!1,!0}switch(e){this.inventory[e]&&(this.weapon=e,this.reloading=0,this.firing=!1,this.charge=0)}cycle(){let e=Object.keys(Ht).filter(t=>this.inventory[t]);e.length&&this.switch(e[(e.indexOf(this.weapon)+1)%e.length])}reload(){let e=this.inventory[this.weapon],t=Ht[this.weapon];return!e||this.weapon==="bow"||this.reloading||!e.reserve||e.loaded===t.magazine?!1:(this.reloading=t.reload,this.firing=!1,!0)}shoot(){let e=Ht[this.weapon],t=this.inventory[this.weapon];if(!e||this.cooldown>0||this.reloading>0||this.health<=0)return null;let i=this.weapon==="bow"?"reserve":"loaded";if(t[i]<=0)return this.reload(),null;t[i]--,this.cooldown=e.interval;let n={...e,id:this.weapon,charge:Math.max(.2,this.charge)};return this.weapon!=="bow"&&t.loaded===0&&this.reload(),n}tick(e){let t=this.inventory[this.weapon];if(this.weapon!=="bow"&&t&&t.loaded===0&&t.reserve>0&&!this.reloading&&this.reload(),this.cooldown=Math.max(0,this.cooldown-e),this.shoveCooldown=Math.max(0,this.shoveCooldown-e),this.comboTime=Math.max(0,this.comboTime-e),this.comboTime||(this.combo=0),this.firing&&this.weapon==="bow"&&(this.charge=Math.min(1,this.charge+e/1.05)),this.reloading>0&&(this.reloading-=e,this.reloading<=0)){this.reloading=0;let i=this.inventory[this.weapon],n=Ht[this.weapon],r=Math.min(n.magazine-i.loaded,i.reserve);i.loaded+=r,i.reserve-=r}}hurt(e){return this.health=Math.max(0,this.health-e),this.health===0}kill(e=!1){this.kills++,this.combo++,this.comboTime=4;let t=(e?150:100)*Math.min(4,1+Math.floor(this.combo/3));return this.score+=t,t}supply(){for(let[e,t]of Object.entries(this.inventory))t.reserve=Math.min(e==="bow"?60:240,t.reserve+(e==="bow"?8:Ht[e].magazine*2))}nextWave(){return this.wave++,this.phase="wave",ph(this.wave)}finishWave(){this.phase="rest",this.rest=ph(this.wave).rest,this.health=Math.min(100,this.health+12),this.supply(),this.score+=this.wave*100}};function Fm(s){let e=[],t=new yi({side:Rt}),i=(n,r,a,o,l,c,h=0)=>{if(o<=0||l<=0||c<=0)return;let u=new Ze(new gt(o,c,l),t);u.position.set(n,a,-r),u.rotation.y=h,u.updateMatrixWorld(),e.push(u)};for(let n of s.walls){let[r,a]=n.a,[o,l]=n.b,c=Math.hypot(o-r,l-a),h=(o-r)/c,u=(l-a)/c,d=n.floor*s.levelHeight,f=n.height_m??(n.floor?2.45:2.6),g=[0,c];for(let y of n.openings)g.push(Math.max(0,y[0]-y[1]/2),Math.min(c,y[0]+y[1]/2));g.sort((y,p)=>y-p);for(let y=1;y<g.length;y++){let p=g[y-1],m=g[y],_=(p+m)/2;if(m<=p)continue;let S=n.openings.filter(M=>_>M[0]-M[1]/2&&_<M[0]+M[1]/2).sort((M,v)=>M[2]-v[2]),x=0;for(let M of[...S,[0,0,f,f]]){let v=Math.min(f,M[2]);v>x&&i(r+h*_,a+u*_,d+(x+v)/2,m-p,n.thickness_m,v-x,Math.atan2(u,h)),x=Math.max(x,M[3])}}}for(let n of s.segments){let r=n.b[0]-n.a[0],a=n.b[1]-n.a[1];i((n.a[0]+n.b[0])/2,(n.a[1]+n.b[1])/2,(n.bottom+n.top)/2,Math.hypot(r,a),n.thickness,n.top-n.bottom,Math.atan2(a,r))}for(let n of s.obstacles){let r=n.box??[Math.min(...n.polygon.map(a=>a[0])),Math.min(...n.polygon.map(a=>a[1])),Math.max(...n.polygon.map(a=>a[0])),Math.max(...n.polygon.map(a=>a[1]))];i((r[0]+r[2])/2,(r[1]+r[3])/2,(n.bottom+n.top)/2,r[2]-r[0],r[3]-r[1],n.top-n.bottom)}for(let n of s.surfaces){let r=new nn(new Ni(n.polygon.map(([o,l])=>new ne(o,l))));r.rotateX(-Math.PI/2),r.translate(0,n.z,0);let a=new Ze(r,t);a.updateMatrixWorld(),e.push(a)}return e}var gh=class{constructor(){this.enabled=!0,this.context=null}unlock(){try{let e=window.AudioContext||window.webkitAudioContext;e&&!this.context&&(this.context=new e),this.context?.state==="suspended"&&this.context.resume().catch(()=>{})}catch{}}play(e){if(!this.enabled||!this.context||this.context.state!=="running")return;let t=this.context,i=t.currentTime,n=(r,a,o,l,c="sine",h=0)=>{let u=t.createOscillator(),d=t.createGain();u.type=c,u.frequency.setValueAtTime(r,i+h),u.frequency.exponentialRampToValueAtTime(a,i+h+o),d.gain.setValueAtTime(l,i+h),d.gain.exponentialRampToValueAtTime(.001,i+h+o),u.connect(d).connect(t.destination),u.start(i+h),u.stop(i+h+o+.01)};if(e==="bow")n(270,95,.12,.05,"triangle");else if(["pistol","shotgun","carbine"].includes(e)){let r=e==="shotgun"?.18:.09,a=t.createBuffer(1,Math.ceil(t.sampleRate*r),t.sampleRate),o=a.getChannelData(0);for(let h=0;h<o.length;h++)o[h]=(Math.random()*2-1)*Math.pow(1-h/o.length,3);let l=t.createBufferSource(),c=t.createGain();l.buffer=a,c.gain.value=.06,l.connect(c).connect(t.destination),l.start(),n(100,35,r,.08,"triangle")}else e==="hit"?n(680,310,.055,.035,"triangle"):e==="hurt"?n(95,42,.15,.05,"sine"):e==="pickup"?(n(440,660,.1,.035),n(660,880,.12,.025,"sine",.1)):e==="wave"&&(n(160,120,.22,.045,"triangle"),n(120,90,.3,.04,"triangle",.26))}};var on=(s,e,t={})=>new Ze(s,new Kt({color:e,roughness:.6,...t})),Go=.7075;function Vd(s,e,t){let i=e.actor!==void 0;if(s.position.copy(e.point).addScaledVector(t,(i?.09:0)-Go),s.quaternion.setFromUnitVectors(new N(0,0,-1),t),i){s.updateWorldMatrix(!0,!1);let n=s.matrixWorld.clone();e.object.updateWorldMatrix(!0,!1),e.object.add(s),s.matrix.copy(e.object.matrixWorld).invert().multiply(n),s.matrixAutoUpdate=!1,s.matrixWorldNeedsUpdate=!0}}function Ho(){let s=new it;s.name="Arrow \xB7 shaft, head and three feathers",s.userData.projectile=!0;let e=on(new jt(.005,.005,.64,6),12163938);e.rotation.x=Math.PI/2,e.position.z=-.32,e.name="Arrow shaft",s.add(e);let t=on(new As(.021,.075,4),5661031,{metalness:.55});t.rotation.x=-Math.PI/2,t.position.z=-.67,t.name="Arrowhead",s.add(t);for(let n=0;n<3;n++){let r=new Ni;r.moveTo(0,0),r.lineTo(.051,-.043),r.lineTo(.04,-.14),r.lineTo(0,-.17),r.closePath();let a=on(new nn(r),n===0?13145935:15524803,{side:Rt});a.rotation.x=Math.PI/2,a.rotation.z=n*Math.PI*2/3,a.rotation.set(Math.PI/2,0,0);let o=new it;o.rotation.z=n*Math.PI*2/3,o.add(a),o.position.z=-.025,s.add(o),a.name="Arrow feather"}let i=on(new jt(.009,.009,.025,5),9394738);return i.rotation.x=Math.PI/2,i.position.z=.002,s.add(i),s}function Um({held:s=!1}={}){let e=new it;e.name="Recurve bow";let t=[];for(let g=0;g<=24;g++){let y=-Math.PI/2+g*Math.PI/24;t.push(new N(0,Math.sin(y)*.42,-Math.cos(y)*.17))}let i=new Qa(new Pr(t),32,.012,6,!1),n=on(i,8542264);n.name="Flexible bow limbs",e.add(n);let r=new Float32Array(i.attributes.position.array),a=on(new jt(.023,.023,.12,7),3681573);a.position.z=-.165,e.add(a);let o=new tn(new nt().setFromPoints([t[0],new N(0,0,.025),t[24]]),new yn({color:15787464}));o.name="Bow string",e.add(o);let l=Ho();l.name="Nocked arrow",l.position.set(-.018,0,.025),e.add(l);let c=new St;c.name="Projectile origin",c.position.copy(l.position),e.add(c);let h=new it;h.visible=s,e.add(h);let u=on(new gt(.065,.11,.058),12687990);u.position.set(.026,0,-.155),h.add(u);let d=on(new gt(.054,.065,.045),12687990);d.position.set(-.023,0,.025),h.add(d);let f=on(new gt(.085,.11,.07),4347726);return f.position.set(.07,-.055,-.11),f.rotation.z=.4,h.add(f),e.userData.animate=(g=0,y=0,p=!0)=>{let m=y>0?Math.sin((.28-y)*105)*y*.065:0,_=i.attributes.position;for(let A=0;A<_.count;A++){let b=A*3,w=r[b+1],T=Math.abs(w/.42);_.setXYZ(A,r[b],w*(1-.08*g),r[b+2]+T*.07*g+m*T)}_.needsUpdate=!0;let S=.42*(1-.08*g),x=.07*g+m,M=.025+g*.27+m*2.5,v=o.geometry.attributes.position;v.setXYZ(0,0,-S,x),v.setXYZ(1,0,0,M),v.setXYZ(2,0,S,x),v.needsUpdate=!0,c.position.set(-.018,0,M),l.position.copy(c.position),l.visible=p,d.position.z=M},e.userData.animate(),e}function Om(s){let e=new it;e.name=s;let t=(f,g,y,p,m,_)=>{let S=on(f,g,_);return S.position.set(y,p,m),e.add(S),S},i=3621439,n=s==="shotgun"?8409904:3556668,r=s==="pistol"?-.24:s==="shotgun"?-.61:-.52;t(new gt(.08,.1,s==="pistol"?.24:.27),i,0,0,-.09);let a=t(new gt(.066,.17,.085),n,0,-.12,.025);a.rotation.x=-.24;let o=t(new _i(.044,.009,5,12),i,0,-.09,-.07);o.rotation.y=Math.PI/2,o.scale.z=1.25;let l=t(new gt(.008,.037,.01),1910821,0,-.07,-.07);l.rotation.x=.2;let c=t(new jt(.021,.021,Math.abs(r)-.12,10),2240043,0,.012,(r-.12)/2);c.rotation.x=Math.PI/2;let h=t(new _i(.021,.007,5,10),6384738,0,.012,r);h.name="Muzzle rim";let u=t(new Rr(.017,10),1054743,0,.012,r+.001,{side:Rt});if(t(new gt(.014,.024,.025),14862746,0,.074,s==="pistol"?-.19:r+.045),t(new gt(.06,.02,.025),1187611,0,.064,.009),s!=="pistol"){let f=t(new gt(.074,.12,.2),n,0,-.015,.16);f.rotation.x=.16;let g=t(new jt(.042,.042,.19,8),n,0,-.018,-.28);g.rotation.x=Math.PI/2,g.name="Pump grip";for(let y=0;y<5;y++){let p=t(new _i(.042,.004,4,8),2569260,0,-.018,-.2-y*.036)}}if(s==="carbine"){let f=t(new gt(.058,.17,.07),2636594,0,-.15,-.1);f.rotation.x=-.2;let g=t(new jt(.034,.034,.17,10),1583395,0,.12,-.085);g.rotation.x=Math.PI/2;let y=t(new Rr(.028,10),4222825,0,.12,-.173,{metalness:.3,roughness:.15,side:Rt});for(let p of[-.14,-.04])t(new gt(.028,.07,.024),i,0,.077,p)}let d=new St;return d.name="Projectile origin",d.position.set(0,.012,r-.008),e.add(d),e.userData.animate=(f,g)=>{let y=e.getObjectByName("Pump grip");y&&s==="shotgun"&&(y.position.z=-.28+Math.sin(Math.max(0,g)/.28*Math.PI)*.08)},e}function km(s){let e=new it;e.name=s==="health"?"Medical satchel, bandages and bottle":"Leather quiver and mixed ammunition";let t=(i,n,r,a,o,l)=>{let c=on(i,n,l);return c.position.set(r,a,o),e.add(c),c};if(s==="health"){let i=t(new zn(.1,.16,4,10),9529152,0,0,0);i.rotation.z=Math.PI/2,i.scale.z=.75;for(let a of[-.1,.1]){let o=t(new _i(.102,.012,5,14),4734508,a,0,0);o.rotation.y=Math.PI/2,o.scale.x=.76}let n=t(new _i(.057,.01,5,12,Math.PI),4536871,0,.106,0);n.rotation.z=0,t(new gt(.09,.075,.012),16051680,0,.012,.079),t(new gt(.018,.055,.015),11354942,0,.012,.084),t(new gt(.057,.018,.015),11354942,0,.012,.084);for(let a of[-.115,-.06]){let o=t(new jt(.025,.025,.072,10),14999496,a,.132,0);o.rotation.z=Math.PI/2}let r=t(new jt(.026,.026,.095,10),14263121,.12,.13,.006,{transparent:!0,opacity:.8});t(new jt(.027,.027,.018,10),15986401,.12,.185,.006)}else{let i=t(new jt(.075,.055,.28,12,1,!0),7294002,-.055,.035,0,{side:Rt});for(let r of[-.07,.16]){let a=t(new _i(.074,.009,5,12),12160076,-.055,r,0);a.rotation.x=Math.PI/2}let n=t(new _i(.13,.012,5,16,Math.PI*1.6),4011303,-.08,0,.015);n.scale.x=.6;for(let r=0;r<3;r++){let a=Ho();a.scale.setScalar(.48),a.rotation.x=-Math.PI/2,a.position.set(-.08+r*.026,.29,.014),e.add(a)}for(let r=0;r<5;r++){let a=t(new jt(.018,.018,.095,7),r<2?10438972:12884812,.05+r*.032,-.015,.018);a.rotation.z=-.12+r*.1,t(new jt(.019,.019,.023,7),14072434,.05+r*.032,-.07,.018,{metalness:.5})}t(new gt(.19,.038,.025),4734511,.11,-.033,.046)}return e}var rM=s=>({x:s.x,y:-s.z,z:s.y}),Vo=s=>new N(s.x,s.z,-s.y),pt=s=>document.getElementById(s),bh=class{constructor(e,{scene:t,camera:i,doors:n,mobile:r=!1,isActive:a,onDeath:o,onArm:l,onReset:c,toast:h}){Object.assign(this,{data:e,scene:t,camera:i,doors:n,mobile:r,isActive:a,onDeath:o,onArm:l,onReset:c,toast:h}),this.state=new mh,this.audio=new gh,this.time=0,this.hurtTime=0,this.hitTime=0,this.recoil=0,this.manualFiring=!1,this.group=new it,this.group.name="After Hours combat",t.add(this.group),this.pickups=[],this.projectiles=[],this.effects=[],this.ray=new Ls,this.occluders=Fm(e),this.horde=new fh(e,{maxAlive:r?7:12,canSpawn:Nm(i),onAttack:u=>{this.state.phase!=="dead"&&(this.state.hurt(u.damage),this.hurtTime=.55,this.audio.play("hurt"),this.state.health||this.die())},onDeath:u=>{let d=this.state.kill(u.headshot);if(this.toast((u.headshot?"Headshot! +":"Zombie down +")+d),u.boss){let f=this.state.wave*500;this.state.score+=f,this.addPickup("health",u.position),this.addPickup("ammo",{...u.position,x:u.position.x+.24}),this.toast("Groundskeeper defeated \xB7 +"+f+" \xB7 supplies dropped")}else this.state.kills%3===0&&this.addPickup(this.state.kills%9===0?"health":"ammo",u.position)}}),this.group.add(this.horde.group),t.add(i),this.hand=new it,this.hand.position.set(.23,-.27,-.52),i.add(this.hand),this.buildUI(),this.reset()}buildUI(){this.tourWelcome=pt("welcome").innerHTML,this.tourHint=pt("hint").textContent,this.started=!1;let e=document.createElement("button");e.id="sound-control",e.hidden=!0,e.textContent="Sound on",e.setAttribute("aria-pressed","true"),e.onclick=()=>{this.audio.unlock(),this.audio.enabled=!this.audio.enabled,e.textContent=this.audio.enabled?"Sound on":"Sound off",e.setAttribute("aria-pressed",String(this.audio.enabled)),e.blur()},document.querySelector(".toolbar").insertBefore(e,pt("help")),document.addEventListener("pointerdown",()=>this.audio.unlock(),{once:!0}),document.addEventListener("keydown",()=>this.audio.unlock(),{once:!0});let t=document.createElement("div");t.id="combat-hud",t.innerHTML='<div id="wave-heading">AFTER HOURS</div><div id="wave-objective">Enter the house to begin</div><div id="boss-status" hidden><span>THE GROUNDSKEEPER</span><div><i></i></div></div><div id="combat-stats"><span id="health-text">\u2665 100</span><span id="weapon-text">Find the bow</span><span id="score-text">0</span></div><div id="weapon-progress"><i></i></div>',document.body.append(t);let i=document.createElement("div");i.id="combat-controls",i.innerHTML='<button id="swap-control" aria-label="Swap weapon">Swap</button>',document.body.append(i);let n=document.createElement("div");n.id="damage-vignette",n.setAttribute("aria-hidden","true"),document.body.append(n);let r=document.createElement("button");r.id="end-survival",r.className="text-button",r.textContent="End game \xB7 return to exploring",r.hidden=!0,r.onclick=()=>{this.reset(),pt("start").focus()},pt("welcome").insertBefore(r,pt("load-status")),pt("swap-control").addEventListener("click",a=>{a.preventDefault(),this.isActive()&&this.started&&(this.state.cycle(),this.equip()),pt("swap-control").blur()}),document.addEventListener("keydown",a=>{!this.isActive()||a.repeat||!this.started||["Space","KeyQ","Digit1","Digit2","Digit3","Digit4"].includes(a.code)&&(a.preventDefault(),a.code==="Space"&&this.press(),a.code==="KeyQ"&&this.shove(),a.code.startsWith("Digit")&&(this.state.switch(Object.keys(Ht)[Number(a.code.slice(-1))-1]),this.equip()))}),document.addEventListener("keyup",a=>{a.code==="Space"&&this.release()}),pt("view").addEventListener("pointerdown",a=>{a.pointerType==="mouse"&&a.button===0&&this.isActive()&&this.press()}),document.addEventListener("pointerup",a=>{a.pointerType==="mouse"&&a.button===0&&this.release()}),window.addEventListener("blur",()=>this.cancelFire()),window.addEventListener("resize",()=>this.cancelFire()),document.addEventListener("visibilitychange",()=>this.cancelFire())}activateUI(e){document.body.classList.toggle("easter-game",e),pt("rooms").hidden=e,pt("sound-control").hidden=!e,pt("end-survival").hidden=!e,e||(pt("toast").hidden=!0,pt("toast").textContent="");let t=pt("welcome");t.querySelector(".eyebrow").textContent=e?"ASHLEY HEIGHTS \xB7 AFTER HOURS":"EXPLORE ASHLEY HEIGHTS",t.querySelector("h1").textContent=e?"Hold the house.":"Come inside.",t.querySelector("p").textContent=e?"Survive the waves. Find guns as later waves unlock, collect supplies and keep moving.":"Explore the house and garden.",t.querySelector(".keys span").innerHTML=e?"W A S D move \xB7 Shift sprint<br>Mouse / Space fire \xB7 Q shove<br>1\u20134 weapons \xB7 Auto reload \xB7 Esc pause":"Move with these or the arrow keys.<br>Move your mouse to look around.",t.querySelector(".touch-instructions p").textContent=e?"Tap anywhere in the view to fire. Drag to aim. Push the movement pad farther to sprint. Guns reload automatically.":"Use both together. Push the movement pad farther to sprint.",pt("hint").textContent=e?"Mouse / Space fire \xB7 Auto reload \xB7 Q shove \xB7 1\u20134 switch \xB7 Shift sprint":this.tourHint,pt("look-hint").textContent=e?"Drag to aim \xB7 tap to fire":"Drag to look",pt("caught-title").textContent="The house fell.",pt("normal-model").textContent="Return to exploring"}canTakeBow(){let e=this.pickups.find(o=>o.kind==="bow");if(this.started||!e||!this.player||Math.hypot(e.position.x-this.player.x,e.position.y-this.player.y)>.65||Math.abs(e.position.z-this.player.z)>.4)return!1;let t=Vo(this.player).add(new N(0,this.data.eyeHeight,0)),i=Vo(e.position).add(new N(0,e.baseHeight,0)),n=i.clone().sub(t),r=n.length();this.ray.set(t,n.normalize()),this.ray.near=.015,this.ray.far=r-.08;let a=this.doors.doors.map(o=>o.pivot).filter(Boolean);return this.ray.intersectObjects([...this.occluders,...a],!0).length===0}takeBow(){if(!this.isActive()||!this.canTakeBow())return!1;let e=this.pickups.find(t=>t.kind==="bow");return this.clearObject(e.mesh),this.pickups.splice(this.pickups.indexOf(e),1),this.state.acquire("bow"),this.equip(),this.audio.play("pickup"),this.activateUI(!0),pt("view").focus(),this.onArm(),this.toast("Bow collected \xB7 Enter the house to begin"),!0}clearObject(e){e.traverse(t=>{(t.isMesh||t.isLine)&&(t.geometry.dispose(),t.material.dispose&&t.material.dispose())}),e.removeFromParent()}reset(){this.cancelFire(),this.started=!1,this.state.reset(),this.activateUI(!1),this.onReset?.(),this.horde.reset(),this.time=0,this.hurtTime=0,this.hitTime=0,this.releaseTime=0,this.lastShot=null,pt("crosshair").classList.remove("hit"),this.player=null,this.unlocked=new Set(["bow"]);for(let t of this.pickups)this.clearObject(t.mesh);for(let t of this.projectiles)this.clearObject(t.mesh);for(let t of this.effects)this.clearObject(t.mesh);this.pickups=[],this.projectiles=[],this.effects=[];let e=this.data.rooms.find(t=>t.id==="2445694-0");this.addPickup("bow",{x:e.position[0],y:e.position[1],z:e.position[2]}),this.equip(),pt("damage-vignette").style.opacity=0}mesh(e,t,i={}){return new Ze(e,new Kt({color:t,roughness:.65,...i}))}buildWeapon(e,t=!1){return e==="bow"?Um({held:t}):Om(e)}equip(){this.cancelFire();for(let e of[...this.hand.children])this.clearObject(e);this.state.weapon&&this.hand.add(this.buildWeapon(this.state.weapon,!0)),this.recoil=0}addPickup(e,t){if(this.pickups.length>=32){let o=this.pickups.find(l=>!Ht[l.kind]);if(o)this.clearObject(o.mesh),this.pickups.splice(this.pickups.indexOf(o),1);else return}let i=e==="health"?7984033:Ht[e]?16765838:10406906,n=new it;n.position.copy(Vo(t));let r=this.mesh(new _i(.25,.026,5,20),i);r.rotation.x=Math.PI/2,r.position.y=.1,r.material.emissive.setHex(i),r.material.emissiveIntensity=.4,n.add(r);let a;Ht[e]?(a=this.buildWeapon(e),a.scale.setScalar(.62),a.position.y=.68):e==="arrow"?(a=Ho(),a.rotation.x=Math.PI/2,a.position.y=.25):(a=km(e),a.position.y=.38),n.add(a),this.group.add(n),this.pickups.push({kind:e,position:{...t},mesh:n,item:a,baseHeight:a.position.y,age:0})}arm(e){this.started=!0,this.player=e}startWave(e=this.player){this.player=e;let t=this.state.nextWave();this.horde.startWave(this.state.wave,this.player,t.total),this.audio.play("wave"),this.toast(`Wave ${this.state.wave} \xB7 ${t.event}`)}unlock(){for(let[e,t,i]of[[3,"pistol","2445662-0"],[5,"shotgun","2445664-0"],[7,"carbine","2445670-3"]])if(this.state.wave+1>=e&&!this.unlocked.has(t)){this.unlocked.add(t);let n=this.data.rooms.find(r=>r.id===i);this.addPickup(t,{x:n.position[0],y:n.position[1],z:n.position[2]}),this.toast(`${Ht[t].label} unlocked \xB7 ${n.label}`)}}press(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||this.manualFiring||(this.manualFiring=!0,this.state.firing=!0,this.state.charge=0,this.state.weapon!=="bow"&&this.fire())}release(){this.manualFiring&&(this.state.firing&&this.state.weapon==="bow"&&this.isActive()&&this.fire(),this.cancelFire())}tapFire(){!this.started||!this.isActive()||!this.state.weapon||this.state.phase==="dead"||this.manualFiring||(this.state.charge=1,this.fire(),this.state.charge=0)}cancelFire(){this.manualFiring=!1,this.state.firing=!1,this.state.charge=0}hit(e,t,i){this.ray.set(e,t),this.ray.near=.015,this.ray.far=i;let n=this.doors.doors.map(c=>c.pivot).filter(Boolean),a=this.ray.intersectObjects([...this.occluders,...n],!0)[0];a&&(this.ray.far=a.distance);let l=this.ray.intersectObjects(this.horde.actors.filter(c=>c.alive).map(c=>c.figure.group),!0).find(c=>c.object.userData.actorId!==void 0);return l?{...l,actor:l.object.userData.actorId,headshot:l.object.userData.hitZone==="head"}:a?{...a,wall:!0}:null}applyHit(e,t,i){return e?.actor===void 0?!1:this.horde.damage(e.actor,t*(e.headshot?1.8:1),{headshot:e.headshot,knockback:{x:i.x*.12,y:-i.z*.12}})?.hit?(this.hitTime=.16,this.audio.play("hit"),!0):!1}trace(e,t){let i=new tn(new nt().setFromPoints([e,t]),new yn({color:16772531,transparent:!0,opacity:.75}));this.group.add(i),this.effects.push({mesh:i,life:.07})}fire(){let e=this.state.shoot();if(!e)return;this.audio.play(e.id),this.recoil=1,this.releaseTime=.28,this.camera.updateMatrixWorld(!0),this.hand.updateMatrixWorld(!0);let t=this.camera.getWorldPosition(new N),i=this.camera.getWorldDirection(new N),n=this.hit(t,i,55),r=n?.point||t.clone().addScaledVector(i,55),a=this.hand.getObjectByName("Projectile origin");if(!a)return;let o=a.getWorldPosition(new N),l=r.clone().sub(o).normalize(),c=o.clone().sub(t),h=c.length(),u=this.hit(t,c.normalize(),h);if(this.lastShot={weapon:e.id,origin:o.toArray(),muzzle:a.getWorldPosition(new N).toArray(),eye:t.toArray(),blockedByWall:!!u?.wall},!u?.wall)if(e.id==="bow"){let d=Ho();d.position.copy(o),d.quaternion.setFromUnitVectors(new N(0,0,-1),l),this.group.add(d);let f=o.clone().addScaledVector(l,Go),g=this.hit(o,l,Go);if(g){this.applyHit(g,e.damage*(.35+.65*e.charge),l),Vd(d,g,l),this.effects.push({mesh:d,life:5});return}this.projectiles.push({mesh:d,position:f,velocity:l.multiplyScalar(14+e.charge*15),damage:e.damage*(.35+.65*e.charge),life:4})}else{let d=this.mesh(new As(.035,.14,5),16762733,{emissive:16755776});d.position.copy(o),d.quaternion.setFromUnitVectors(new N(0,1,0),l),this.group.add(d),this.effects.push({mesh:d,life:.055});for(let f=0;f<(e.pellets||1);f++){let g=l.clone();e.pellets&&(g.x+=(Math.random()-.5)*.11,g.y+=(Math.random()-.5)*.11,g.z+=(Math.random()-.5)*.11,g.normalize());let y=this.hit(o,g,55);this.applyHit(y,e.damage,g),f===0&&this.trace(o.clone(),y?.point||o.clone().addScaledVector(g,30))}}}shove(){if(!this.started||!this.player||this.state.shoveCooldown||this.state.phase==="dead")return;this.state.shoveCooldown=1.05,this.recoil=1.7;let e=Vo(this.player).add(new N(0,1,0)),t=this.camera.getWorldDirection(new N);for(let i of this.horde.actors){if(!i.alive)continue;let n=Vo(i.nav.position).add(new N(0,1,0)),r=n.clone().sub(e),a=r.length();if(a>1.55||a<.01||r.normalize().dot(t)<.25)continue;this.ray.set(e,r),this.ray.far=a;let o=this.ray.intersectObjects(this.occluders,!1)[0];o&&o.distance<a-.25||(this.horde.damage(i.id,20,{knockback:{x:r.x*.65,y:-r.z*.65}}),this.hitTime=.16)}}die(){this.state.phase="dead",this.cancelFire();try{let e=JSON.parse(localStorage.getItem("ashley-after-hours-best")||"{}");this.best=Math.max(e.score||0,this.state.score),localStorage.setItem("ashley-after-hours-best",JSON.stringify({score:this.best,wave:Math.max(e.wave||0,this.state.wave)}))}catch{this.best=this.state.score}this.onDeath()}step(e,t,i){if(this.player=t,!this.started){let a=this.pickups.find(o=>o.kind==="bow");a&&(a.age+=e,a.item.rotation.y+=e*.45,a.item.position.y=a.baseHeight+Math.sin(a.age*2.1)*.05,this.takeBow()),this.group.updateMatrixWorld(!0);return}this.time+=e,this.state.tick(e),this.hurtTime=Math.max(0,this.hurtTime-e),this.hitTime=Math.max(0,this.hitTime-e),this.recoil=Math.max(0,this.recoil-e*5);let n=this.camera.getWorldDirection(new N);this.state.phase==="wave"?(this.horde.step(e,t,{x:n.x,y:-n.z}),this.horde.state().complete&&(this.state.finishWave(),this.unlock(),this.addPickup("health",{...t,x:t.x+.35}),this.toast("Wave cleared \xB7 resupplied +12 health"))):this.state.phase==="rest"&&(this.horde.step(e,t,{x:n.x,y:-n.z}),this.state.rest-=e,this.state.rest<=0&&this.startWave()),this.manualFiring&&this.state.weapon!=="bow"&&!this.state.reloading&&(this.state.firing=!0,this.fire());for(let a=this.projectiles.length-1;a>=0;a--){let o=this.projectiles[a];o.life-=e,o.velocity.y-=2.4*e;let l=o.velocity.length()*e,c=o.velocity.clone().normalize(),h=this.hit(o.position,c,l);if(h||o.life<=0||o.position.y<.05){h&&(this.applyHit(h,o.damage,c),Vd(o.mesh,h,c));let u=rM(h?.point||o.position),d=t.z;Math.abs(u.z-d)<2.2&&!this.horde.planner().nav.blocked(u.x,u.y,d)&&this.addPickup("arrow",{x:u.x,y:u.y,z:d}),h?this.effects.push({mesh:o.mesh,life:5}):this.clearObject(o.mesh),this.projectiles.splice(a,1)}else o.position.addScaledVector(o.velocity,e),o.mesh.position.copy(o.position).addScaledVector(c,-Go),o.mesh.quaternion.setFromUnitVectors(new N(0,0,-1),c)}for(let a=this.pickups.length-1;a>=0;a--){let o=this.pickups[a];o.age+=e,o.item.rotation.y+=e*.65,o.item.position.y=o.baseHeight+Math.sin(o.age*2.1)*.05;let l=o.position.z-t.z;if(Math.hypot(o.position.x-t.x,o.position.y-t.y)<.85&&Math.abs(l)<.4){let h=!0;Ht[o.kind]?(this.state.acquire(o.kind),this.equip(),this.toast(`${Ht[o.kind].label} found`)):o.kind==="health"?this.state.health>=100?h=!1:(this.state.health=Math.min(100,this.state.health+30),this.toast("+30 health")):o.kind==="arrow"?this.state.inventory.bow?this.state.inventory.bow.reserve=Math.min(60,this.state.inventory.bow.reserve+1):h=!1:(this.state.supply(),this.toast("Ammunition collected")),h&&(this.audio.play("pickup"),this.clearObject(o.mesh),this.pickups.splice(a,1))}}for(let a=this.effects.length-1;a>=0;a--)(this.effects[a].life-=e)<=0&&(this.clearObject(this.effects[a].mesh),this.effects.splice(a,1));this.hand.scale.setScalar(Math.min(1,.55+.45*this.camera.aspect)),this.hand.position.x=Math.min(.23,.1*this.camera.aspect),this.hand.visible=!!this.state.weapon;let r=this.state.reloading?Math.sin(Math.PI*(1-this.state.reloading/Ht[this.state.weapon].reload)):0;this.hand.rotation.x=this.recoil*.15,this.hand.rotation.z=-.6*r-this.state.charge*.045,this.hand.position.y=-.27+Math.sin(this.time*3)*.004-.14*r,this.hand.position.z=-.52+this.recoil*.05,this.releaseTime=Math.max(0,(this.releaseTime||0)-e),this.hand.children[0]?.userData.animate?.(this.state.charge,this.releaseTime,!!this.state.inventory.bow?.reserve&&this.state.cooldown<.3),this.group.updateMatrixWorld(!0),this.updateHUD(i)}updateHUD(e){let t=this.state,i=this.horde.state();pt("wave-heading").textContent=e.phase==="armed"?"BOW READY":t.phase==="rest"?`WAVE ${t.wave} CLEARED \xB7 ${Math.ceil(t.rest)}s`:`WAVE ${t.wave} \xB7 ${ph(t.wave).event.toUpperCase()}`;let n=this.pickups.find(o=>Ht[o.kind]),r=n&&{bow:"garden shed",pistol:"kitchen",shotgun:"garage",carbine:"landing"}[n.kind];pt("wave-objective").textContent=e.phase==="armed"?"Enter the house to begin":t.phase==="wave"?`${i.alive+i.queued} left${n?" \xB7 "+Ht[n.kind].label+" in the "+r:""}`:n?`Find the ${Ht[n.kind].label.toLowerCase()} in the ${r}`:"Collect supplies \xB7 keep moving",pt("boss-status").hidden=!i.boss,i.boss&&(pt("boss-status").querySelector("i").style.width=100*i.boss.health/i.boss.maxHealth+"%"),pt("health-text").textContent="\u2665 "+Math.ceil(t.health),pt("health-text").classList.toggle("low",t.health<35);let a=t.inventory[t.weapon];pt("weapon-text").textContent=a?`${Ht[t.weapon].label} \xB7 ${t.weapon==="bow"?a.reserve+" arrows":a.loaded+" / "+a.reserve}${t.reloading?" \xB7 reloading":""}`:"Find the bow \xB7 Q / Shove to defend",pt("score-text").textContent=t.score.toLocaleString()+(t.combo>=3?" \xD7"+Math.min(4,1+Math.floor(t.combo/3)):""),pt("weapon-progress").firstElementChild.style.width=(t.reloading?(1-t.reloading/Ht[t.weapon].reload)*100:t.charge*100)+"%",pt("damage-vignette").style.opacity=this.hurtTime?".7":"0",pt("crosshair").classList.toggle("hit",this.hitTime>0)}};function Wd(s,e){let[t,i,n,r]=s.streetContext?.enabled?s.streetContext.bounds:s.bounds,a=(l,c,h)=>Math.max(c,Math.min(h,l)),o=Math.min(0,...(s.floorLevels??[]).map(l=>l.z));return{x:a(e.x,t-35,n+35),y:a(e.y,i-35,r+35),z:a(e.z,o,45)}}function qd(s,e,{forward:t=0,right:i=0,vertical:n=0,yaw:r=0,pitch:a=0,fast:o=!1,dt:l=0}){let c=t*Math.cos(a),h=-Math.sin(r)*c+Math.cos(r)*i,u=Math.cos(r)*c+Math.sin(r)*i,d=t*Math.sin(a)+n,f=(o?9:3.8)*Math.max(0,Math.min(l,.04))/Math.max(1,Math.hypot(h,u,d));return Wd(s,{x:e.x+h*f,y:e.y+u*f,z:e.z+d*f})}function xh(s,e,t){let i=o=>{if(!o)return null;let l=s.support(o.x,o.y,o.z);if(l===null||Math.abs(l-o.z)>.2)return null;let c={x:o.x,y:o.y,z:l};return s.canStand(c)?c:null},n=i(e);if(n)return{position:n,moved:!1};let r=i(t);if(r)return{position:r,moved:!0};let a=s.data.rooms.map(o=>({x:o.position[0],y:o.position[1],z:o.position[2]})).map(i).filter(Boolean).sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y,o.z-e.z)-Math.hypot(l.x-e.x,l.y-e.y,l.z-e.z));if(!a.length)throw Error("No supported walking viewpoint");return{position:a[0],moved:!0}}var Xd="ashley-heights-comparison-view";var vh={original:"Existing",proposed:"Proposed"},Bm=new URLSearchParams(location.search).get("design"),ln=Bm==="proposed"||Bm==="compact"?"proposed":"original",ia=s=>s==="proposed";function zm(s,e=location.href){let t=new URL(e);return ia(s)?t.searchParams.set("design","proposed"):t.searchParams.delete("design"),t}function Gm(s,e){let t={target:s,position:[e.x,e.y,e.z],yaw:e.yaw,pitch:e.pitch,active:e.active,flying:e.flying===!0,lastWalkingPosition:e.lastWalkingPosition,time:Date.now()};try{sessionStorage.setItem(Xd,JSON.stringify(t))}catch{}}function Hm(){try{let s=sessionStorage.getItem(Xd);if(!s)return null;sessionStorage.removeItem(Xd);let e=JSON.parse(s);return e.target!==ln||Date.now()-e.time>3e5||!e.position?.every(Number.isFinite)||!Number.isFinite(e.yaw)||!Number.isFinite(e.pitch)?null:e}catch{return null}}function Vm(s,e){let[t,i,n]=e.position,r={x:t,y:i,z:n};if(e.flying===!0)return{position:Wd(s.data,r),moved:!1};let a=c=>{let h=s.support(c.x,c.y,c.z);return h!==null&&Math.abs(h-c.z)<.2&&s.canStand(c)};if(a(r))return{position:r,moved:!1};let o=s.data.rooms.map(c=>({room:c,p:{x:c.position[0],y:c.position[1],z:c.position[2]}})).filter(c=>a(c.p));if(ln==="original"&&n>=2.4){let c=o.find(h=>h.room.label==="Landing");if(c)return{position:c.p,moved:!0,room:c.room.label}}o.sort((c,h)=>Math.hypot(c.p.x-t,c.p.y-i)+Math.abs(c.p.z-n)*3-Math.hypot(h.p.x-t,h.p.y-i)-Math.abs(h.p.z-n)*3);let l=o[0];return{position:l?.p??{...s.position},moved:!0,room:l?.room.label}}var pi={trees:[{id:"T1",label:"Tree beyond our north boundary (east)",x:10.9,y:32,height:16,crown:5.6,kind:"broadleaf",colour:"#414c3a",source:"Google 3D top view (kept outside the site line)"},{id:"T2",label:"Tree north-east (Richmond Court side)",x:18,y:42.2,height:15,crown:5.2,kind:"broadleaf",colour:"#3f4a38",source:"Google 3D top view"},{id:"T3",label:"Marlow Court grounds",x:34.7,y:-10.4,height:12,crown:4.9,kind:"broadleaf",colour:"#4b5c38",source:"Google 3D top view"},{id:"T4",label:"Marlow Court south",x:45.9,y:-17.4,height:12,crown:4.9,kind:"broadleaf",colour:"#44503c",source:"Google 3D top view"},{id:"T5",label:"Birch behind No 5's garage",x:17.5,y:-27.8,height:16,crown:3.5,kind:"birch",colour:"#56613e",source:"Owner (22 Sep 2026): behind G5 as seen from the close, not in front; placed on the Street View bearing (~102 deg from the close-head panorama) beyond the garage.",dbh:.3,trunk_basis:"Street View heading 90: slender pale stem, narrow open crown"},{id:"T6",label:"Scots pine behind No 5",x:6.5,y:-52.5,height:20,crown:4.5,kind:"pine",colour:"#44503f",source:"Close-head Street View (Aug 2023), bearings from the calibrated panorama (-13.7,-16.7): trunk at 143.8 deg (heading 130 view), towering behind No 5's east side; distance kept from the 3D view",dbh:.55,trunk_basis:"Street View heading 135: clean stem to about two-thirds of its height, orange upper bark, flat-topped clumped crown"},{id:"T8",label:"Hedge on the No 5 / No 6 frontage",x:-10.1,y:-32.5,height:1.9,crown:5.3,kind:"hedge",colour:"#51633a",source:"Close-head Street View (Aug 2023), bearings from the calibrated panorama (-13.7,-16.7): continuous hedge from ~143 to ~179 deg about 16-18 m away (base 46 px below the horizon), running into No 6's fence"},{id:"T9",label:"Horse chestnut in No 6's front garden",x:-17.5,y:-32.2,height:18,crown:7.5,kind:"broadleaf",colour:"#4c6334",source:"Close-head Street View (Aug 2023, heading 190, fov 40): conkers visible; trunk just behind No 6's front fence at bearing ~188 deg, ~16 m from the calibrated panorama (trunk ~0.65 m wide over 35 px). Registered 3D top view: textured crown centre unprojects to y -32.3; the dark untextured patch at the head of the close (earlier traced as the canopy) is its shadow",dbh:.7,crownBase:3,bark:"#4f4a44",trunk_basis:"Street View heading 190 fov 40: trunk ~35 px wide at ~16 m (0.65-0.7 m); lowest limbs about 3 m, above No 6's 1.8 m fence"},{id:"T10",label:"Hedge along No 6's frontage",x:-22,y:-31,height:2,crown:5.5,kind:"hedge",colour:"#51633a",source:"Street View Aug 2023"},{id:"T11",label:"Cypress in No 3's forecourt (west)",x:-26.3,y:-9.3,height:5.5,crown:.9,kind:"conifer",colour:"#33402f",source:"Close-head Street View (Aug 2023, heading 300): two slim cypresses behind No 3's front wall west of its sliding gate, at bearings 293 and 297 deg from the panorama (calibrated at -13.7,-16.7 from our gate, No 3's gate and our wall corner); tops level with No 2's eaves | Owner: No 3's west boundary wall runs back from the road between them; set either side of it.",dbh:.15},{id:"T12",label:"Cypress in No 3's forecourt (east)",x:-25.2,y:-8.6,height:5.5,crown:.9,kind:"conifer",colour:"#33402f",source:"Close-head Street View (Aug 2023, heading 300): two slim cypresses behind No 3's front wall west of its sliding gate, at bearings 293 and 297 deg from the panorama (calibrated at -13.7,-16.7 from our gate, No 3's gate and our wall corner); tops level with No 2's eaves | Owner: No 3's west boundary wall runs back from the road between them; set either side of it.",dbh:.15},{id:"T13",label:"Trees behind Nos 1-2 (pair)",x:-46.1,y:23.9,height:16,crown:7,kind:"broadleaf",colour:"#44552f",source:"Google 3D top view, registered 0.9 m RMS"},{id:"T14",label:"Ornamental in No 3 rear garden",x:-20.7,y:16.2,height:6,crown:2.6,kind:"broadleaf",colour:"#7a7a3a",source:"Google 3D top view"},{id:"T15",label:"Tree behind No 2",x:-29.8,y:30.1,height:15,crown:5.2,kind:"broadleaf",colour:"#3d4a33",source:"Google 3D top view"},{id:"T16",label:"Tree north of No 1",x:-37.1,y:42.7,height:15,crown:5.2,kind:"broadleaf",colour:"#3b4533",source:"Google 3D top view"},{id:"T17",label:"Tree north of No 2/3",x:-26.1,y:43.4,height:13,crown:4.4,kind:"broadleaf",colour:"#4a5a32",source:"Google 3D top view"},{id:"T18",label:"Conifer behind No 3",x:-17.1,y:33.2,height:15,crown:4.2,kind:"conifer",colour:"#39433a",source:"Google 3D top view"},{id:"T19",label:"Tree beyond our north boundary (west)",x:-3.7,y:35,height:17,crown:6.5,kind:"broadleaf",colour:"#3e4a36",source:"Google 3D top view"}],siteTrees:[{id:"M1",label:"Large tree in the front garden, south-east",x:15.4,y:-13.5,height:10.05},{id:"M3",label:"Tall open conifer on the west front wall by No 3",x:-6.8,y:-4,height:11.3},{id:"M4",label:"Rear north boundary corner",x:-5.9,y:26,height:7},{id:"M5",label:"Row of tree-like bushes inside the south front wall",x:4.75,y:-21.85,height:10},{id:"M6",label:"Hedge inside the front wall, west boundary to the gate",x:-5.47,y:-10.11,height:3}],houses:[{name:"Neighbour 1 \xB7 reference estimate",footprint:[[-59.79665,9.30984],[-59.1234,9.22317],[-58.99559,3.40707],[-48.86574,3.72358],[-49.1053,-5.03034],[-61.27589,-5.25473]],x:-54.907240542877894,y:-.8116349999999999,height:5.1,rise:3.1,roofParts:[[[-60.5209,3.51813],[-48.86574,3.72358],[-49.1053,-5.03034],[-61.27589,-5.25473]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1,id:"H1",roofType:"hip",colors:{wall:"#a8674c",roof:"#6f5a4c"},chimneys:[[-59.3,1.5]],source:"No planning drawings online. Heights estimated from 3D imagery against Nos 2 and 3 (same storey heights); hipped brick house, brown plain tiles, white windows (Street View Aug 2023)."},{name:"Neighbour 2 \xB7 reference estimate",footprint:[[-43.47037,7.20821],[-32.48846,7.50032],[-32.4135,2.6292],[-27.42748,2.84026],[-27.42525,-5.34776],[-43.14071,-5.88343]],x:-35.34048433867518,y:-1.35928,height:5.2,rise:3.2,roofParts:[[[-43.17443,2.05278],[-27.46947,2.50451],[-27.42525,-5.34776],[-43.14071,-5.88343]],[[-43.47037,7.20821],[-32.48846,7.50032],[-32.29711,.14084],[-43.36318,-.14044]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"H2",roofType:"hip",partRises:[3.2,2.9],colors:{wall:"#b8694a",roof:"#6e6258"},porch:"gable",garageDoor:"#3f4448",chimneys:[[-28.6,1]],source:"17/01352/HOUSE drawings: existing ridge 8.4 m, eaves 5.1-5.2 m; built two-storey side extension with its own hip about 0.3 m lower, double garage below, oak gabled porch (Street View Aug 2023, 3D imagery)."},{name:"Neighbour 3 \xB7 reference estimate",footprint:[[-25.65193,10.88472],[-18.44637,11.06593],[-18.39352,10.12095],[-7.69556,10.19375],[-7.58782,.7981],[-18.11746,.70363],[-18.21192,-.05181],[-25.5858,-.21135]],x:-16.63043484937667,y:5.459525,height:5.1,rise:2.4,roofParts:[[[-18.39352,10.12095],[-7.69556,10.19375],[-7.58782,.7981],[-18.11746,.70363]],[[-25.65193,10.88472],[-18.44637,11.06593],[-18.21192,-.05181],[-25.5858,-.21135]]],frame:"dark",referenceClipped:!1,front:[[-18.11746,.70363],[-7.58782,.7981]],secondaryFront:[[-25.5858,-.21135],[-18.21192,-.05181]],garage:!1,id:"H3",roofType:"hip",partRises:[2.4,1.7],colors:{wall:"#9c6b50",roof:"#76665a"},rooflight:!0,chimneys:[[-8.4,5.2]],source:"18/00772/HOUSE drawings: ridge 7.50 m, eaves 5.1 m, dimensioned eaves 5.0 m on the proposed front; built part two-storey west extension with a lower hip (about 6.8 m) and glazed roof panel; anthracite frames and horizontal-slat gate (Street View Aug 2023)."},{name:"Neighbour 5 \xB7 reference estimate",footprint:[[8.0732,-30.55728],[13.41851,-36.36269],[5.41541,-43.60551],[.05961,-37.88403]],x:6.734790356677488,y:-37.123360000000005,height:5.1,rise:3,roofParts:[[[8.0732,-30.55728],[13.41851,-36.36269],[5.41541,-43.60551],[.05961,-37.88403]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"H5",roofType:"hip",colors:{wall:"#8f5b46",roof:"#6b5448"},porch:"columns",bays:!0,chimneys:[],source:"No planning drawings online. Symmetrical two-storey hipped brick house with white-columned porch and two ground-floor bays; heights estimated from Street View against its five first-floor windows."},{name:"Neighbour 6 \xB7 reference estimate",footprint:[[-29.12009,-39.41573],[-16.92832,-39.7058],[-16.90658,-42.26727],[-15.9072,-42.4812],[-15.92745,-45.37842],[-17.14763,-45.56251],[-17.13602,-49.57258],[-21.08067,-49.66182],[-21.15489,-47.52004],[-24.46847,-47.34937],[-24.62517,-51.33777],[-29.5587,-51.12914]],x:-22.603222625347787,y:-43.92981,height:5.1,rise:3.5,roofParts:[[[-29.12009,-39.41573],[-16.92832,-39.7058],[-16.76772,-50.04644],[-29.05414,-49.82947]]],frame:"light",referenceClipped:!1,front:[[-29.12009,-39.41573],[-16.92832,-39.7058]],secondaryFront:null,garage:!1,id:"H6",roofType:"hip",colors:{wall:"#7e4e3b",roof:"#5f4b41"},porch:"columns",chimneys:[[-28.6,-42],[-17.4,-42.3]],source:"23/03025/HOUSE existing drawings: ridge 8.6 m, eaves 5.1 m, two chimneys, detached flat-roof garage 2.7 m. The 2023 consent (pitched garage roof, rear dormer, west extension) is not visible in the Aug 2023 Street View; drawn as existing."},{name:"No6 lower garage \xB7 reference estimate",footprint:[[-37.11622,-33.61024],[-30.68905,-33.49941],[-30.66657,-38.79021],[-37.1569,-38.72233]],x:-33.90713937759885,y:-36.166285,height:2.7,rise:0,roofParts:[[[-37.11622,-33.61024],[-30.68905,-33.49941],[-30.66657,-38.79021],[-37.1569,-38.72233]]],frame:"light",referenceClipped:!1,front:[[-37.11622,-33.61024],[-30.68905,-33.49941]],secondaryFront:null,garage:!0,id:"G6",roofType:"flat",colors:{wall:"#7e4e3b",roof:"#4b4b48"},chimneys:[],source:"23/03025/HOUSE existing front elevation: 2.70 m."},{name:"No5 garage \xB7 reference estimate",footprint:[[15.69732,-22.24221],[10.09072,-22.62925],[10.43933,-28.04733],[16.13008,-27.67112]],x:13.09102410013121,y:-25.150185,height:2.6,rise:0,roofParts:[[[15.69732,-22.24221],[10.09072,-22.62925],[10.43933,-28.04733],[16.13008,-27.67112]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!0,id:"G5",roofType:"flat",colors:{wall:"#8f5b46",roof:"#4b4b48"},chimneys:[],source:"Flat-roof garage (Street View Aug 2023); height estimate. Owner confirms it stands (22 Sep 2026)."},{name:"Southeast outbuilding \xB7 reference estimate",footprint:[[22.05807,-48.64768],[21.42866,-55.04862],[24.55294,-55.36551],[25.19284,-48.88063]],x:23.3102182906958,y:-51.964625,height:2.4,rise:0,roofParts:[[[22.05807,-48.64768],[21.42866,-55.04862],[24.55294,-55.36551],[25.19284,-48.88063]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"B1",roofType:"flat",colors:{wall:"#9a7a62",roof:"#4d4d4a"},chimneys:[],source:"Estimate."},{name:"Marlow Court \xB7 reference estimate",footprint:[[35.778181052631574,12.938298947368423],[27.5,19.2],[36.800000000000004,31.5],[44.6,25.199999999999996],[41.64152943094734,21.414430132072393],[51.9,13.400000000000002],[44.2,4],[34.599999999999994,11.500000000000002]],x:39.76094915254237,y:16.3,height:8,rise:3.5,roofParts:[[[27.5,19.2],[36.8,31.5],[44.6,25.2],[35.3,13.3]],[[34.6,11.5],[44.2,4],[51.9,13.4],[42.3,20.9]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"B2",roofType:"hip",colors:{wall:"#9a5a44",roof:"#5c4f4a"},storeys:3,upperWall:"#ece6da",upperFrom:2.75,tudor:!0,chimneys:[],source:"Footprint traced on a Google 3D top-down registered to our roof, fountain and No 3 (proposal/neighbours/register_flats.py, 0.70 m RMS; imagery/sat-top-flats.jpg). Street View from the White Lodge Close entrance (Apr 2026): three full storeys, brick ground floor, steep roofs with front gables; heights estimated from storeys (3 x 2.6 m + plinth to eaves). Mock-Tudor upper floors (black timbers on white). Owner: much more substantial than first drawn. Flats under 89/01879."},{name:"Richmond Court clipped reference \xB7 reference estimate",footprint:[[33.772,54.6],[26.1,54.6],[26.1,67.2],[34.3,67.8],[45.3,67.9],[44.2,40.4],[33.2,40.3]],x:38.986000000000004,y:47.5,height:8,rise:3.5,roofParts:[[[33.2,40.3],[44.2,40.4],[45.3,67.9],[34.3,67.8]],[[26.1,54.6],[34.3,54.6],[34.3,67.8],[26.1,67.2]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"B3",roofType:"hip",colors:{wall:"#9a5a44",roof:"#5c4f4a"},storeys:3,upperWall:"#ece6da",upperFrom:2.75,chimneys:[],source:"Footprint traced on a Google 3D top-down registered to our roof, fountain and No 3 (proposal/neighbours/register_flats.py, 0.70 m RMS; imagery/sat-top-flats.jpg). Street View from the White Lodge Close entrance (Apr 2026): three full storeys, brick ground floor, steep roofs with front gables; heights estimated from storeys (3 x 2.6 m + plinth to eaves). White render above brick with brick-faced gables."},{name:"Southeast block clipped reference \xB7 reference estimate",footprint:[[28.13737,-45.84812],[30.89316,-45.00882],[42.23306,-45.95683],[42.03419,-49.59865],[45.0953,-49.73683],[43.89872,-59.30574],[40.14337,-59.24877],[40.22734,-58.57726],[32.54832,-58.44166],[31.9596,-59.7305],[27.35219,-59.64914]],x:36.109772290582754,y:-54.089245,height:5.4,rise:3.6,roofParts:[[[28.22153,-45.85895],[45.51515,-46.37932],[43.91971,-59.13786],[27.35219,-59.64914]]],frame:"light",referenceClipped:!0,front:null,secondaryFront:null,garage:!1,id:"B4",roofType:"hip",colors:{wall:"#9a6a55",roof:"#5f5250"},chimneys:[],source:"Estimate."},{name:"White Lodge Close north-east block \xB7 reference estimate",footprint:[[66.8,39.5],[66.8,57.8],[92.5,54.9],[93.5,41.2]],x:79.9,y:48.05,height:8,rise:3.5,roofParts:[[[66.8,39.5],[93.5,41.2],[92.5,54.9],[66.8,57.8]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"B5",roofType:"hip",colors:{wall:"#9a5a44",roof:"#5c4f4a"},storeys:3,upperWall:"#ece6da",upperFrom:2.75,tudor:!0,chimneys:[],source:"Footprint traced on a Google 3D top-down registered to our roof, fountain and No 3 (proposal/neighbours/register_flats.py, 0.70 m RMS; imagery/sat-top-flats.jpg). Street View from the White Lodge Close entrance (Apr 2026): three full storeys, brick ground floor, steep roofs with front gables; heights estimated from storeys (3 x 2.6 m + plinth to eaves). Mock-Tudor upper floors."},{name:"White Lodge Close south-east block \xB7 reference estimate",footprint:[[73.1,2.5],[63.5,11.6],[73.5,28.8],[83.1,19.7]],x:73.3,y:15.649999999999999,height:8,rise:3.5,roofParts:[[[73.1,2.5],[83.1,19.7],[73.5,28.8],[63.5,11.6]]],frame:"light",referenceClipped:!1,front:null,secondaryFront:null,garage:!1,id:"B6",roofType:"hip",colors:{wall:"#9a5a44",roof:"#5c4f4a"},storeys:3,upperWall:"#ece6da",upperFrom:2.75,chimneys:[],source:"Footprint traced on a Google 3D top-down registered to our roof, fountain and No 3 (proposal/neighbours/register_flats.py, 0.70 m RMS; imagery/sat-top-flats.jpg). Not visible from the street; assumed to match the others (three storeys)."}],road:[[-62.99803,-16.29118],[-22.94083,-17.35374],[-8.26841,-10.79887],[-3.22657,-22.45016],[-12.24028,-26.83363],[-15.75422,-24.8461],[-18.85768,-23.679],[-23.66508,-23.14545],[-63.82724,-22.92226]],pavement:[[-62.74612,-14.27667],[-24.01442,-14.99803],[-7.48025,-7.91522],[-.24943,-23.25984],[-13.05992,-29.9691],[-15.24854,-27.64043],[-19.39355,-25.91282],[-24.49558,-25.00018],[-64.08964,-25.0207]],drives:[[[-25.5858,-.21135],[-7.58782,.7981],[-7.29095,-7.76901],[-24.01442,-14.99803],[-25.88685,-14.92758]],[[-43.14071,-5.88343],[-27.42525,-5.34776],[-25.97101,-14.91674],[-47.47225,-14.53705]],[[-61.27589,-5.25473],[-49.1053,-5.03034],[-47.5564,-14.52622],[-62.74612,-14.27667]],[[-.24943,-23.25984],[15.64447,-21.29723],[15.69165,-40.06686],[5.58372,-43.62717],[.05961,-37.88403],[2.35207,-35.2793]],[[-43.09353,-24.65306],[-15.09109,-26.38137],[-14.97173,-39.78709],[-29.12009,-39.41573],[-30.66657,-38.79021],[-37.11622,-33.61024]],[[19.39992,16.9405],[30.53463,35.55006],[54.63495,32.02126],[50.79479,-4.15864],[18.9234,-10.12003]]],gate3:[[-21.74277,-13.24352],[-18.24026,-11.90332]],gate6:[[-34.27831,-25.27608],[-30.17584,-25.29245]],wall3:[[[-25.86586,-14.7597],[-21.74277,-13.24352]],[[-18.24026,-11.90332],[-7.48025,-7.91522]],[[-25.86586,-14.7597],[-25.6,-.2]]],basis:"Footprints and road traced from the site plan registered to eleven fixed house/site anchors. Eaves and ridge heights from the neighbours' planning drawings where available (Nos 2, 3, 6), otherwise estimated from Google 3D imagery; roof forms, extensions, colours and trees from Google 3D imagery and Street View (Aug 2023). Not a survey.",registrationRMSMetres:.1286789476763554};var qm="ashley-heights-street-context";function Xm(s){try{return s?.getItem(qm)==="on"}catch{return!1}}function jm(s,e){try{s?.setItem(qm,e?"on":"off")}catch{}}function aM(s){let e=structuredClone(pi.houses),t=[[-72,-68],[98,-68],[98,72],[-72,72]],i=e.map(n=>({name:n.name,polygon:n.footprint,bottom:0,top:n.height+n.rise}));for(let n of pi.trees??[]){let r=n.kind==="hedge"?.65:.5,a=n.kind==="hedge"?n.crown:r;i.push({name:n.label,polygon:[[n.x-a,n.y-r],[n.x+a,n.y-r],[n.x+a,n.y+r],[n.x-a,n.y+r]],bottom:0,top:n.height})}return{enabled:!1,bounds:[Math.min(s.bounds[0],-72),Math.min(s.bounds[1],-68),Math.max(s.bounds[2],98),Math.max(s.bounds[3],72)],road:pi.road,ground:t,houses:e,obstacles:i,walkPolygons:[t],basis:pi.basis,registrationRMSMetres:pi.registrationRMSMetres}}function Wm(s,e){let t=s.data.streetContext,i=t?.enabled;t&&(t.enabled=!1);try{let n=s.support(e.x,e.y,e.z);return n!==null&&Math.abs(n-e.z)<.2&&!s.blocked(e.x,e.y,n)?{x:e.x,y:e.y,z:n}:null}finally{t&&(t.enabled=i)}}function Km(s,{flying:e=!1}={}){let t=s.data.streetContext;if(!t||(t.enabled=!1,e||Wm(s,s.position)))return!1;let i=[...s.data.rooms].sort((n,r)=>+(r.id==="arrival")-+(n.id==="arrival"));for(let n of i){let[r,a,o]=n.position,l=Wm(s,{x:r,y:a,z:o});if(l)return s.position=l,!0}return t.enabled=!0,!1}function jd(s,e){return!!s.streetContext?.enabled&&!$t(e.x,e.y,s.site.outline_m)&&!$t(e.x,e.y,s.approachSurface?.polygon??[])}var yh=class{constructor(e,t){this.scene=e,this.data=t,this.definition=aM(t),t.streetContext=this.definition,this.group=null,this.stats={meshes:0,triangles:0}}setVisible(e){e&&!this.group&&this.build(),this.definition.enabled=!!e,this.group&&(this.group.visible=!!e),this.syncLabels()}setLabels(e){this.labelsOn=!!e,e&&!this.labels&&this.buildLabels(),this.syncLabels()}syncLabels(){this.labels&&(this.labels.site.visible=!!this.labelsOn,this.labels.street.visible=!!this.labelsOn&&!!this.definition.enabled)}buildLabels(){let e=(r,a,o,l,c)=>{let h=document.createElement("canvas"),u=h.getContext("2d"),d=36;u.font=`600 ${d}px system-ui,sans-serif`;let f=u.measureText(r).width;u.font=`400 ${d*.8}px system-ui,sans-serif`;let g=a?u.measureText(a).width:0;h.width=Math.ceil(f+g+(a?52:28)),h.height=d+22,u.fillStyle="rgba(20,26,24,.82)",u.beginPath(),u.roundRect(0,0,h.width,h.height,12),u.fill(),u.fillStyle="#fff",u.font=`600 ${d}px system-ui,sans-serif`,u.textBaseline="middle",u.fillText(r,14,h.height/2),a&&(u.fillStyle="#d6dfd9",u.font=`400 ${d*.8}px system-ui,sans-serif`,u.fillText(a,14+f+24,h.height/2));let y=new Ar(h);y.colorSpace=It;let p=new wr({map:y,depthTest:!1,transparent:!0,sizeAttenuation:!1}),m=new La(p),_=.034;return m.scale.set(_*h.width/h.height,_,1),m.center.set(.5,0),m.position.set(o,c,-l),m.renderOrder=1e3,m.name="Label "+r,m},t=r=>r.replace(/ · reference estimate| clipped reference/g,"").replace(/^Neighbour (\d)/,"No $1").replace(/^No(\d) /,"No $1 ").slice(0,30),i=new it,n=new it;i.name="Street ID labels",n.name="Site tree ID labels";for(let r of this.definition.houses??pi.houses)r.id&&i.add(e(r.id,t(r.name),r.x,r.y,r.height+r.rise+.8));for(let r of pi.trees??[])r.id&&i.add(e(r.id,t(r.label),r.x,r.y,r.height+.5));for(let r of pi.siteTrees??[])n.add(e(r.id,t(r.label),r.x,r.y,r.height+.5));this.scene.add(i,n),this.labels={street:i,site:n}}build(){let e=this.definition,t=new it;t.name="Optional reference-traced street context";let i={grass:"#819477",road:"#646c68",kerb:"#bbb9ae",drive:"#aca594",brick:"#967a60",roof:"#5a554e",trim:"#e1ded4",glass:"#6b8281",green:"#5f7555",dark:"#34383a",bark:"#5a4a3c",oak:"#9c7a52",chimney:"#8a5a45"},n=new Map,r=v=>{let A=v.index?v.toNonIndexed():v;A.computeVertexNormals();let b=A.attributes.position,w=A.attributes.normal,T=new Float32Array(b.count*2);for(let C=0;C<b.count;C++){let D=b.getX(C),P=b.getY(C),I=b.getZ(C),F=Math.abs(w.getX(C)),H=Math.abs(w.getY(C)),V=Math.abs(w.getZ(C));H>=F&&H>=V?(T[C*2]=D,T[C*2+1]=I):F>=V?(T[C*2]=I,T[C*2+1]=P):(T[C*2]=D,T[C*2+1]=P)}return A.setAttribute("uv",new Mt(T,2)),A},a=.82,o=(v,A)=>{let[b,w]=A.includes(":")?A.split(":"):[A,null],T=r(v);if(w){let C=new ze(w);b!=="leaf"&&b!=="bark"&&C.multiplyScalar(1/a);let D=new Float32Array(T.attributes.position.count*3);for(let P=0;P<D.length;P+=3)D[P]=Math.min(1,C.r),D[P+1]=Math.min(1,C.g),D[P+2]=Math.min(1,C.b);T.setAttribute("color",new Mt(D,3))}n.has(b)||n.set(b,[]),n.get(b).push(T)},l=v=>new Ni(v.map(([A,b])=>new ne(A,b))),c=(v,A,b,w=[])=>{let T=l(v);for(let D of w)T.holes.push(new Rs(D.map(([P,I])=>new ne(P,I))));let C=new nn(T);C.rotateX(-Math.PI/2),C.translate(0,A,0),o(C,b)},h=(v,A,b,w,T,C,D,P=0)=>{let I=new gt(w,C,T);I.rotateY(P),I.translate(v,b+C/2,-A),o(I,D)},u=(v,A,b,w,T,C)=>{let D=A[0]-v[0],P=A[1]-v[1],I=Math.hypot(D,P);h((v[0]+A[0])/2,(v[1]+A[1])/2,T,I,b,w,C,Math.atan2(P,D))},d=(v,A,b)=>{let w=new Dr(l(v),{depth:A,bevelEnabled:!1,steps:1,curveSegments:1});w.rotateX(-Math.PI/2),o(w,b)},f=(v,A,b,w)=>{let T=new Dr(l(v),{depth:b-A,bevelEnabled:!1,steps:1,curveSegments:1});T.rotateX(-Math.PI/2),T.translate(0,A,0),o(T,w)},g=(v,A,b,w,T="trim")=>{let C=v.reduce((ve,Ne)=>[ve[0]+Ne[0]/4,ve[1]+Ne[1]/4],[0,0]),D=v[0],P=v[1],I=Math.hypot(P[0]-D[0],P[1]-D[1]),F=Math.hypot(v[2][0]-P[0],v[2][1]-P[1]),H=[(P[0]-D[0])/I,(P[1]-D[1])/I];F>I&&(D=v[1],P=v[2],H=[(P[0]-D[0])/F,(P[1]-D[1])/F],[I,F]=[F,I]);let V=[-H[1],H[0]],ee=(ve,Ne)=>[C[0]+H[0]*ve+V[0]*Ne,C[1]+H[1]*ve+V[1]*Ne],G=[ee(-I/2-.3,-F/2-.3),ee(I/2+.3,-F/2-.3),ee(I/2+.3,F/2+.3),ee(-I/2-.3,F/2+.3)];if(b===0){c(G,A+.14,w);for(let ve=0;ve<4;ve++)u(G[ve],G[(ve+1)%4],.06,.18,A-.04,T);return}let K=Math.max(.2,(I-F)/2),j=ee(-K,0),me=ee(K,0),he=[...G.map(([ve,Ne])=>[ve,A,-Ne]),[j[0],A+b,-j[1]],[me[0],A+b,-me[1]]].flat(),Le=new nt;Le.setAttribute("position",new Ke(he,3)),Le.setIndex([0,1,5,0,5,4,1,2,5,2,3,4,2,4,5,3,0,4]),o(Le,w);for(let ve=0;ve<4;ve++)u(G[ve],G[(ve+1)%4],.045,.18,A-.12,T)};c(e.ground,-.135,"grass",[this.data.site.outline_m]),c(pi.pavement,-.025,"drive"),c(e.road,-.012,"road");for(let v=0;v<e.road.length-1;v++)u(e.road[v],e.road[v+1],.14,.09,-.015,"kerb");for(let v of pi.drives)c(v,-.008,"drive");let y=(v,A,b,w,T,C,D="light")=>{let P=Math.hypot(A[0]-v[0],A[1]-v[1]),I=[(A[0]-v[0])/P,(A[1]-v[1])/P],F=[I[1],-I[0]],H=v[0]+(A[0]-v[0])*b+F[0]*.04,V=v[1]+(A[1]-v[1])*b+F[1]*.04,ee=Math.atan2(I[1],I[0]),G=D==="dark"?"dark":"trim";h(H,V,w,T,.055,C,G,ee),h(H+F[0]*.03,V+F[1]*.03,w+.07,T-.14,.025,C-.14,"glass",ee);let K=T>1.8?3:2;for(let j=1;j<K;j++){let me=(j/K-.5)*T;h(H+I[0]*me+F[0]*.05,V+I[1]*me+F[1]*.05,w+.07,.035,.03,C-.14,G,ee)}};for(let v of e.houses){let A=v.colors?"wall:"+v.colors.wall:"brick",b=v.colors?"roof:"+v.colors.roof:"roof";if(v.upperWall){let B=v.upperFrom??2.75;f(v.footprint,0,B,A),f(v.footprint,B,v.height,"wall:"+v.upperWall),v.tudor&&v.footprint.forEach(($,fe)=>{let oe=v.footprint[(fe+1)%v.footprint.length],Ce=Math.hypot(oe[0]-$[0],oe[1]-$[1]),Qe=Math.max(2,Math.round(Ce/1.1)),te=Math.atan2(oe[1]-$[1],oe[0]-$[0]),le=(oe[1]-$[1])/Ce*.03,ue=-(oe[0]-$[0])/Ce*.03;for(let ce=0;ce<=Qe;ce++){let pe=ce/Qe;h($[0]+(oe[0]-$[0])*pe,$[1]+(oe[1]-$[1])*pe,B,.16,.16,v.height-B,"dark",te)}for(let ce of[B,(B+v.height)/2,v.height-.18])u($,oe,.16,.16,ce,"dark")})}else d(v.footprint,v.height,A);v.roofParts.forEach((B,$)=>g(B,v.height,v.partRises?.[$]??v.rise,b));for(let[B,$]of v.chimneys??[])h(B,$,v.height-.4,.62,.62,v.rise*.95+.4,"chimney");let w=[v.y>0||v.name.startsWith("Neighbour 1")||v.name.startsWith("Neighbour 2")?v.x:-10,-21],T=v.footprint.reduce((B,$,fe)=>{let oe=v.footprint[(fe+1)%v.footprint.length];return B+$[0]*oe[1]-oe[0]*$[1]},0),C=v.footprint.map((B,$)=>{let fe=B,oe=v.footprint[($+1)%v.footprint.length];T<0&&([fe,oe]=[oe,fe]);let Ce=oe[0]-fe[0],Qe=oe[1]-fe[1],te=Math.hypot(Ce,Qe);return{a:fe,b:oe,length:te,score:((w[0]-(fe[0]+oe[0])/2)*Qe-(w[1]-(fe[1]+oe[1])/2)*Ce)/te}}),D=v.front||[...C].filter(B=>B.length>4).sort((B,$)=>$.score-B.score)[0],P=Array.isArray(D)?D[0]:D.a,I=Array.isArray(D)?D[1]:D.b,F=(P[0]+I[0])/2,H=(P[1]+I[1])/2,V=I[0]-P[0],ee=I[1]-P[1];(v.x-F)*ee-(v.y-H)*V>0&&([P,I]=[I,P]);let G=Math.hypot(I[0]-P[0],I[1]-P[1]),K=[(I[0]-P[0])/G,(I[1]-P[1])/G],j=[K[1],-K[0]],me=Math.atan2(K[1],K[0]);if(v.garage){let B=(P[0]+I[0])/2+j[0]*.04,$=(P[1]+I[1])/2+j[1]*.04;h(B,$,.03,Math.min(3.9,G-.6),.08,2.08,"dark",me);for(let fe=0;fe<10;fe++){let oe=(fe/9-.5)*Math.min(3.8,G-.7);h(B+K[0]*oe+j[0]*.05,$+K[1]*oe+j[1]*.05,.08,.025,.02,1.97,"glass",me)}continue}let he=v.height-1.95,Le=.76;if(v.storeys===3){let B=[Le,(v.upperFrom??2.75)+.7,he],$=Math.max(3,Math.round(G/3.2));for(let fe of B)for(let oe=0;oe<$;oe++)y(P,I,(oe+.5)/$,fe,1.2,1.3,v.frame);continue}for(let B of[.18,.5,.82])y(P,I,B,he,B===.5?1.4:1.85,1.4,v.frame);for(let B of[.18,.82])y(P,I,B,Le,1.85,1.42,v.frame);if(v.bays)for(let B of[.18,.82]){let $=P[0]+(I[0]-P[0])*B+j[0]*.35,fe=P[1]+(I[1]-P[1])*B+j[1]*.35;h($,fe,0,2.3,.7,.7,A,me),h($+j[0]*.05,fe+j[1]*.05,2.2,2.5,.85,.18,"trim",me)}if(v.dormers)for(let B of[.3,.7]){let $=P[0]+(I[0]-P[0])*B-j[0]*1.2,fe=P[1]+(I[1]-P[1])*B-j[1]*1.2;h($,fe,v.height+.3,1.6,1.4,1.4,b,me),h($+j[0]*.72,fe+j[1]*.72,v.height+.45,1.1,.04,1,"glass",me)}if(v.secondaryFront){let[B,$]=v.secondaryFront,fe=$[0]-B[0],oe=$[1]-B[1];(v.x-(B[0]+$[0])/2)*oe-(v.y-(B[1]+$[1])/2)*fe>0&&([B,$]=[$,B]);for(let Ce of[.28,.73])for(let Qe of[Le,he])y(B,$,Ce,Qe,1.78,1.4,v.frame)}let ve=(P[0]+I[0])/2+j[0]*.06,Ne=(P[1]+I[1])/2+j[1]*.06;if(h(ve,Ne,.02,1.02,.09,2.18,v.frame==="dark"?"dark":"trim",me),v.porch==="columns"){h(ve+j[0]*1,Ne+j[1]*1,2.45,2.6,1.9,.22,"trim",me);for(let B of[-1.1,1.1])h(ve+K[0]*B+j[0]*1.75,Ne+K[1]*B+j[1]*1.75,0,.22,.22,2.45,"trim")}if(v.porch==="gable"){h(ve+j[0]*.9,Ne+j[1]*.9,2.45,2.4,1.7,.16,"oak",me);for(let B of[-1,1])h(ve+K[0]*B+j[0]*1.6,Ne+K[1]*B+j[1]*1.6,0,.2,.2,2.45,"oak")}if(v.name.startsWith("Neighbour 6"))for(let B of[.5-.075,.5+.075])y(P,I,B,.18,.33,1.9,"light");let Y=B=>[[P,I],...v.secondaryFront?[v.secondaryFront]:[]].some(([$,fe])=>{let oe=fe[0]-$[0],Ce=fe[1]-$[1],Qe=Math.hypot(oe,Ce);return[B.a,B.b].every(te=>Math.abs((te[0]-$[0])*Ce-(te[1]-$[1])*oe)/Qe<.15)});for(let B of C.filter($=>$.length>5&&!Y($)).slice(0,2))for(let $ of[.86,he])y(B.a,B.b,.53,$,1.45,1.3,v.frame)}for(let[v,A]of pi.wall3)u(v,A,.25,1.95,0,"wall:"+(pi.houses.find(b=>b.name.startsWith("Neighbour 3"))?.colors?.wall??"#967a60"));let p=(v,A)=>{let[b,w]=v,T=Math.hypot(w[0]-b[0],w[1]-b[1]),C=[(w[0]-b[0])/T,(w[1]-b[1])/T],D=Math.atan2(C[1],C[0]);for(let[P,I]of v)h(P,I,0,.43,.43,1.95,"brick"),h(P,I,1.95,.49,.49,.1,"kerb");if(A){u(b,w,.075,1.62,0,"dark");for(let I=1;I<7;I++)u(b,w,.085,.016,I*.23,"glass");let P=[b[0]+C[0]*T*.7,b[1]+C[1]*T*.7];h(...P,0,.025,.09,1.62,"kerb",D)}else{for(let P of[.14,.84,1.5])u(b,w,.055,.035,P,"dark");for(let P=1;P<23;P++){let I=P/23;h(b[0]+(w[0]-b[0])*I,b[1]+(w[1]-b[1])*I,.1,.02,.02,1.48,"dark")}}};p(pi.gate3,!0),p(pi.gate6,!1);let m=new N(0,1,0),_=(v,A,b,w,T)=>{let C=new N(v[0],v[2],-v[1]),D=new N(A[0],A[2],-A[1]),P=D.clone().sub(C),I=new jt(w,b,P.length(),6,1);I.applyQuaternion(new vi().setFromUnitVectors(m,P.clone().normalize())),I.translate(...C.clone().add(P.multiplyScalar(.5)).toArray()),o(I,T)},S=(v,A,b,w,T,C,D=1)=>{let P=new Ja(w,D);P.scale(1,T,1),P.translate(v,b,-A),o(P,C)},x=(v,A,b,w)=>{let T=new Za(b.map(([C,D])=>new ne(C,D)),10);T.translate(v,0,-A),o(T,w)};for(let v of pi.trees??[]){let A="leaf:"+v.colour,b=v.height,w=v.crown,{x:T,y:C}=v,D=Math.abs(Math.sin(T*12.9898+C*78.233))*43758.5453,P=()=>(D=(D*9301+49297)%233280)/233280;if(v.kind==="hedge"){let he=Math.max(2,Math.round(w*2/1.1));h(T,C,0,w*2,1,b*.55,A);for(let Le=0;Le<he;Le++){let ve=T-w+(Le+.5)*w*2/he;S(ve,C+(P()-.5)*.15,b*.62,.75+.15*P(),b*.5/.8,A,1)}continue}let I=v.dbh??Math.min(.9,.035*b),F=I/2,H="bark:"+(v.bark??(v.kind==="birch"?"#d9d5ca":"#5b5046"));if(v.kind==="conifer"){if(w<1.3){x(T,C,[[0,0],[w*.55,.02*b],[w*.95,.18*b],[w,.42*b],[w*.8,.7*b],[w*.42,.9*b],[0,b]],A);continue}_([T,C,0],[T,C,.3*b],F,F*.7,H),x(T,C,[[0,.1*b],[w*.8,.14*b],[w*.95,.3*b],[w*.78,.52*b],[w*.5,.75*b],[w*.15,.95*b],[0,b]],A);for(let he=0;he<9;he++){let Le=he*2.4+P(),ve=he/9,Ne=(.18+.7*ve)*b,Y=w*(1-.8*ve);S(T+Math.cos(Le)*Y*.7,C+Math.sin(Le)*Y*.7,Ne,Y*.5+.3,1.3,A)}continue}if(v.kind==="pine"){_([T,C,0],[T,C,.55*b],F,F*.7,H),_([T,C,.55*b],[T,C,.93*b],F*.7,F*.3,"bark:#9a6040");for(let he=0;he<10;he++){let Le=he*2.4+P()*.6,ve=w*(.2+.55*P()),Ne=b*(.62+.036*he),Y=[T+Math.cos(Le)*ve,C+Math.sin(Le)*ve,Ne];_([T,C,Ne-1],Y,F*.3,F*.12,"bark:#9a6040"),S(Y[0],Y[1],Y[2],w*(.42+.14*P()),.5,A)}S(T,C,b*.95,w*.5,.45,A);continue}let V=v.kind==="birch",ee=v.crownBase??(V?.3:.2)*b,G=b-ee,K=V?w*.8:w;_([T,C,0],[T,C,.35],F*1.3,F,H),_([T,C,.35],[T,C,ee+G*(V?.75:.3)],F,F*(V?.35:.62),H);let j=V?4:5;for(let he=0;he<j;he++){let Le=he*Math.PI*2/j+P()*.5,ve=ee+G*(.05+.12*P());_([T,C,ve],[T+Math.cos(Le)*K*.55,C+Math.sin(Le)*K*.55,ve+G*.4],F*(V?.3:.38),F*.12,H)}S(T,C,ee+G*.5,K*.7,G/(2*K)*1.05,A);let me=V?6:8;for(let he=0;he<me;he++){let Le=he*Math.PI*2/me+P()*.4,ve=ee+G*(.3+.3*(he%3)/2+.1*P()),Ne=K*(.5+.12*P());S(T+Math.cos(Le)*Ne,C+Math.sin(Le)*Ne,ve,K*(.42+.08*P()),G/(2*K)*.95,A)}S(T+(P()-.5)*K*.3,C+(P()-.5)*K*.3,ee+G*.82,K*.48,.9,A)}let M=v=>{if(typeof document>"u")return null;let A=document.createElement("canvas");A.width=A.height=256;let b=A.getContext("2d"),w=C=>{let D=Math.round(255*Math.max(0,Math.min(1,C)));return`rgb(${D},${D},${D})`};if(b.fillStyle=w(a),b.fillRect(0,0,256,256),v==="wall"){let C=19.24812030075188,D=256/4.44;for(let P=0;P<14;P++){b.fillStyle=w(1),b.fillRect(0,P*C,256,2.2);for(let I=-1;I<6;I++){let F=I*D+(P%2?D/2:0);b.fillStyle=w(1),b.fillRect(F,P*C,2.2,C),b.fillStyle=w(a+Math.sin(P*12.9+I*78.2)*.07),b.fillRect(F+2.2,P*C+2.2,D-2.2,C-2.2)}}}else{let D=41.29032258064516;for(let P=0;P<11;P++){b.fillStyle=w(a-.16),b.fillRect(0,P*25.6,256,3);for(let I=-1;I<8;I++){let F=I*D+(P%2?D/2:0);b.fillStyle=w(a+Math.sin(P*7.1+I*3.3)*.05),b.fillRect(F+1.5,P*25.6+3,D-1.5,25.6-3)}}}let T=new Ar(A);return T.wrapS=T.wrapT=ci,T.colorSpace=It,T.anisotropy=4,T};for(let[v,A]of n){if(!A.length)continue;let b=["wall","roof","leaf","bark"].includes(v),w=v==="wall"||v==="roof"?M(v):null,T=Rn(A,!1),C=new Kt({color:b?"#ffffff":i[v],vertexColors:b,map:w,roughness:v==="glass"?.25:.95,side:Rt,flatShading:v==="leaf"}),D=new Ze(T,C);D.name="Street context "+v,D.castShadow=!["grass","road","drive"].includes(v),D.receiveShadow=!0,t.add(D),this.stats.meshes++,this.stats.triangles+=T.attributes.position.count/3;for(let P of A)P.dispose()}this.group=t,this.scene.add(t)}};var na={skin:["#e8c4a8","#d9a98a","#c58f6b","#8d5a3c","#6b4128","#f0d2bc"],hair:["#2b2118","#4a2f1d","#7d5a3a","#b98a55","#d9c39a","#5a5650","#1a1714"],top:["#5f7f96","#8a6f5a","#c9c2b4","#496b5a","#a34e45","#3f4652","#d7a24e","#6f5d8a","#e0e0d8","#2f4858"],bottom:["#343b38","#4b5563","#7a6a55","#2d3a4b","#8a8a80","#5b4636"],shoe:["#27302e","#5a4a3a","#e8e8e2","#3a3f47"]},sa=(s,e)=>s[Math.abs(Math.floor(e))%s.length],qs=["man","woman","man-smart","woman-dress","teen","child"],_h=class{constructor(e=0,t=qs[e%qs.length]){this.group=new it,this.group.name=`Resident ${e+1}`,this.variant=e,this.style=t,this.heading=0,this.motionBlend=0,this.sitBlend=0,this.lookYaw=0,this.state="idle";let i=t==="child",n=t==="teen",r=t.startsWith("woman"),a=t==="woman-dress",o=t==="man-smart";this.scale=i?.62:n?.86:r?.94:1,this.group.scale.setScalar(this.scale);let l=(b,w={})=>new Kt({color:b,roughness:.9,flatShading:!0,...w}),c=l(sa(na.skin,e*7+3)),h=l(sa(na.hair,e*5+1)),u=l(o?"#2f3a48":sa(na.top,e*3+(r?4:0))),d=l(o?"#2f3a48":a?sa(na.top,e*3+4):sa(na.bottom,e*2+1)),f=l(sa(na.shoe,e+(o?0:1))),g=l(o?"#f2f2ee":"#ece9e0"),y=new Ps(1,9,7),p=new gt(1,1,1),m=new zn(1,1,3,8),_=(b,w,T,C,D)=>{let P=new Ze(w,T);return P.position.set(...C),P.scale.set(...D),P.castShadow=!0,P.receiveShadow=!0,b.add(P),P},S=(b,w)=>{let T=new it;return T.position.set(...w),b.add(T),T},x=(b,w,T,C)=>_(b,m,w,[0,-T/2,0],[C,T/3,C]);if(this.hips=S(this.group,[0,.92,0]),_(this.hips,p,d,[0,.02,0],[.32,.16,.2]),this.chest=S(this.hips,[0,.1,0]),_(this.chest,p,u,[0,.24,0],[.33,.46,.2]),_(this.chest,p,u,[0,.44,0],[.41,.08,.22]),a&&_(this.hips,p,d,[0,-.16,0],[.36,.36,.24]),o){for(let b of[-1,1]){let w=_(this.chest,p,g,[b*.05,.3,.115],[.05,.24,.02]);w.rotation.z=b*.28}_(this.chest,p,l("#7a2e3a"),[0,.28,.125],[.035,.2,.015])}else _(this.chest,p,g,[0,.4,.11],[.1,.06,.02]);this.neck=S(this.chest,[0,.5,0]),_(this.neck,m,c,[0,.03,0],[.045,.03,.045]),this.head=S(this.neck,[0,.09,0]),_(this.head,y,c,[0,.09,0],[.098,.118,.104]),_(this.head,p,c,[0,.045,.095],[.026,.045,.03]),_(this.head,p,c,[0,0,.085],[.05,.012,.015]);for(let b of[-1,1])_(this.head,y,c,[b*.098,.085,.01],[.02,.03,.015]),_(this.head,y,l("#2a2622"),[b*.036,.105,.093],[.011,.011,.006]);_(this.head,y,h,[0,.135,-.01],[.104,.09,.108]),(r||n&&e%2)&&_(this.head,y,h,[0,.06,-.07],[.1,.16,.07]),a&&_(this.head,p,h,[0,-.06,-.1],[.09,.22,.05]),i&&_(this.head,y,h,[0,.16,0],[.108,.07,.11]),this.arms=[],this.elbows=[],this.legs=[],this.knees=[],this.feet=[],this.hands=[];for(let b of[-1,1]){let w=S(this.chest,[b*.2,.44,0]);x(w,u,.28,.052);let T=S(w,[0,-.27,0]);_(T,y,u,[0,0,0],[.05,.05,.05]),x(T,o||a?u:c,.24,.043),this.hands.push(_(T,p,c,[0,-.28,.01],[.06,.1,.035])),this.arms.push(w),this.elbows.push(T);let C=S(this.hips,[b*.095,-.04,0]);x(C,d,.44,.072);let D=S(C,[0,-.43,0]);_(D,y,d,[0,0,0],[.06,.06,.06]),x(D,d,.42,.055),this.feet.push(_(D,p,f,[0,-.44,.045],[.11,.07,.26])),this.legs.push(C),this.knees.push(D)}let M=new Set,v=[];this.group.traverse(b=>{b.isMesh?M.add(b.geometry):v.push(b)});for(let b of v){let w=new Map;for(let T of[...b.children])if(T.isMesh){let C=w.get(T.material)??[];C.push(T),w.set(T.material,C)}for(let[T,C]of w)if(C.length>1){let D=C.map(I=>(I.updateMatrix(),I.geometry.clone().applyMatrix4(I.matrix))),P=new Ze(Rn(D),T);P.castShadow=!0,P.receiveShadow=!0,C.forEach(I=>b.remove(I)),b.add(P),D.forEach(I=>I.dispose())}}let A=new Set;this.group.traverse(b=>{b.isMesh&&A.add(b.geometry)}),M.forEach(b=>{A.has(b)||b.dispose()}),this.update(0,{x:0,y:0,z:0},{x:0,y:1},!1,0)}update(e,t,i,n,r=1/60,a={}){let o=a.state??(n?"walk":"idle");this.state=o;let l=o==="treadmill",c=o==="sit",h=this.variant,u=l?6.2:3.4,d=e*u+h*1.7,f=Math.sin(d),g=Math.sin(e*1.1+h*2.3);this.motionBlend+=(Number(n||l)-this.motionBlend)*Math.min(1,r*8),this.sitBlend+=(Number(c)-this.sitBlend)*Math.min(1,r*5);let y=this.motionBlend,p=this.sitBlend;if(Math.hypot(i.x,i.y)>1e-4){let x=Math.atan2(i.x,-i.y),M=Math.atan2(Math.sin(x-this.heading),Math.cos(x-this.heading));this.heading+=M*Math.min(1,r*(n?9:4))}let m=o==="idle"||o==="look"?Math.sin(e*.43+h*1.3)*.5+Math.max(0,Math.sin(e*.9+h))**8*.4:0;this.lookYaw+=(m-this.lookYaw)*Math.min(1,r*3),this.group.rotation.y=this.heading;let _=a.seatHeight??.45;this.group.position.set(t.x,t.z+.005,-t.y),this.hips.position.set(0,.92*(1-p)+_/this.scale*p,-.14*p),this.hips.rotation.set(-.04*p,.05*f*y,.02*g+.03*f*y),this.chest.rotation.set(.02+.01*g+(o==="work"?.16:0)+(l?.08:0)-.05*p,-f*y*.09,-.03*f*y),this.neck.rotation.set(-.02*p,0,0),this.head.rotation.set(.01*g+(o==="work"?.25:0)+(o==="phone"?.3:0),this.lookYaw+(o==="look"?Math.sin(e*.6+h)*.6:0),.02*Math.sin(e*.8+h));let S=l?.62:.38;for(let x=0;x<2;x++){let M=x?-f:f,v=x?1:-1,A=M*S*y;this.legs[x].rotation.set(A*(1-p)-1.45*p,0,v*.02),this.knees[x].rotation.set(Math.max(0,-M)*(l?1.1:.55)*y*(1-p)+1.5*p,0,0),this.feet[x].rotation.set(p?-.1:0,0,0);let b=-M*(l?.9:.42)*y,w=v*.06,T=-.18-(l?.9:.18)*y;if(o==="work")b=-.95,T=-.75,w=v*.18;else if(o==="phone")x===1&&(b=-.7,T=-2.2,w=-.35);else if(o==="wave"&&x===1)b=-2.6+Math.sin(e*7)*.15,T=-.6,w=-.6+Math.sin(e*7)*.2;else if(c)b=-.55,T=-1.1,w=v*.08;else if(o==="idle"&&x===h%2){let C=Math.max(0,Math.sin(e*.5+h*2.1))**6;b-=C*.35,T-=C*.6}this.arms[x].rotation.set(b,0,w),this.elbows[x].rotation.set(T,0,0)}}dispose(){let e=new Set,t=new Set;this.group.traverse(i=>{i.isMesh&&(e.add(i.geometry),t.add(i.material))}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.group.removeFromParent()}};var Ym=Math.PI*2;var Jm=s=>s-Ym*Math.floor((s+Math.PI)/Ym);function Zm(s){let e=s.proposalFrontage?.wall_line_m,t=s.walls?.find(u=>/gates?$/i.test(u.name)&&u.openings?.length),i,n;if(e){let u=(s.segments??[]).filter(m=>/Front boundary wall (south|north)/.test(m.name)),d=[e[1][0]-e[0][0],e[1][1]-e[0][1]],f=Math.hypot(...d),g=[d[0]/f,d[1]/f],y=m=>(m[0]-e[0][0])*g[0]+(m[1]-e[0][1])*g[1],p=u.map(m=>[m.a,m.b].sort((_,S)=>Math.abs(y(_)-f/2)-Math.abs(y(S)-f/2))[0]);[i,n]=p.length===2?p.sort((m,_)=>y(m)-y(_)):[e[0],e[1]]}else if(t){let[u,d]=t.openings[0],f=[t.b[0]-t.a[0],t.b[1]-t.a[1]],g=Math.hypot(...f),y=[f[0]/g,f[1]/g];i=[t.a[0]+y[0]*(u-d/2),t.a[1]+y[1]*(u-d/2)],n=[t.a[0]+y[0]*(u+d/2),t.a[1]+y[1]*(u+d/2)]}else i=[-2.7,-18.03],n=[-4.72,-13.67];let r=[(i[0]+n[0])/2,(i[1]+n[1])/2],a=n[0]-i[0],o=n[1]-i[1],l=Math.hypot(a,o),c=[o/l,-a/l],h=s.site?.outline_m;if(h){let u=h.reduce((f,g)=>f+g[0],0)/h.length,d=h.reduce((f,g)=>f+g[1],0)/h.length;c[0]*(u-r[0])+c[1]*(d-r[1])>0&&(c=[-c[0],-c[1]])}return{a:i,b:n,centre:r,out:c,width:l,inward:Math.atan2(-c[1],-c[0])}}var Wo=class{constructor(e){this.path=e,this.s=[0];for(let t=1;t<e.length;t++)this.s.push(this.s[t-1]+Math.hypot(e[t].x-e[t-1].x,e[t].y-e[t-1].y));this.length=this.s[this.s.length-1]}pose(e){let t=Math.max(0,Math.min(this.length,e)),i=1;for(;i<this.s.length-1&&this.s[i]<t;)i++;let n=this.path[i-1],r=this.path[i],a=this.s[i]-this.s[i-1],o=a>1e-9?(t-this.s[i-1])/a:1;return{x:n.x+(r.x-n.x)*o,y:n.y+(r.y-n.y)*o,t:Jm(n.t+Jm(r.t-n.t)*o),dir:r.dir}}};var $m=()=>globalThis.performance?.now()??Date.now(),qo=(s,e)=>Math.hypot(s.x-e.x,s.y-e.y),cn=(s,e)=>s+Math.random()*(e-s),Mh=s=>s[Math.floor(Math.random()*s.length)],oM=/sofa|bench|lounger|armchair|chair|stool|\bbed\b|\bbed |seat|day bed/i,lM=/coffee|side table|bedside|headboard|table|desk|frame|rack|counter|unit|storage|cistern|toilet|pedestal|vanity|basin|shower|hanging|shelf|rail|treadmill|rower|weights/i,Sh=class{constructor(e,t,i,n){this.life=e,this.id=t,this.nav=new Ws(e.data),this.nav.radius=.18,this.nav.position={x:i.x,y:i.y,z:i.z},this.nav.stepUp=.42,this.figure=new _h(t,n),e.group.add(this.figure.group),this.path=null,this.index=1,this.job=null,this.target=null,this.activity=null,this.activityUntil=0,this.wait=0,this.stalled=0,this.phase=Math.random()*10,this.facing={x:0,y:1},this.speed=cn(1.05,1.35),this.state="idle",this.car=null,this.hidden=!1,this.nextPlanAt=0,this.failures=0}get position(){return this.nav.position}advance(e,t){let i=this.nav,n=i.position,r=n.x+e,a=n.y+t,o=i.support(r,a,n.z);if(o!==null&&!i.blocked(r,a,o)){i.position={x:r,y:a,z:o};return}i.move(e,t)}setHidden(e){this.hidden=e,this.figure.group.visible=!e}chooseDestination(){let e=this.nav.position,t=this.life,i=t.destinations.filter(o=>qo(o,e)>2.5&&!t.claimed.has(o.key)&&(t.unreachable.get(o.key)??0)<t.time);if(!i.length)return null;let n=i.filter(o=>Math.abs(o.z-e.z)<.5),r=n.length&&Math.random()<.65?n:i,a=[];for(let o of r)for(let l=0;l<(o.kind==="seat"?3:o.kind==="treadmill"?2:1);l++)a.push(o);return Mh(a)}goTo(e,t=null){this.target&&this.life.claimed.delete(this.target.key),this.target=e,this.onArrive=t,this.path=null,this.index=1,this.job=null,this.nextPlanAt=0,e?.key&&this.life.claimed.add(e.key)}arrive(){let e=this.target;this.state=e.kind==="seat"?"sit":e.kind==="treadmill"?"treadmill":e.kind==="desk"?"work":Mh(["idle","idle","look","phone"]),this.activityUntil=this.life.time+(e.kind==="seat"?cn(25,70):e.kind==="treadmill"?cn(20,45):e.kind==="desk"?cn(20,50):cn(8,22)),e.dir&&(this.facing={x:e.dir[0],y:e.dir[1]}),this.seatHeight=e.seatHeight,e.seat?(this.standPoint={x:e.x,y:e.y},this.nav.position.x=e.seat[0],this.nav.position.y=e.seat[1]):this.standPoint=null;let t=this.onArrive;this.onArrive=null,t&&t(this,!0)}step(e){let t=this.life,i=t.time,n=this.nav;if(this.hidden)return;if(!this.target){if(i>=this.activityUntil){this.standPoint&&(n.position.x=this.standPoint.x,n.position.y=this.standPoint.y,this.standPoint=null,this.state="idle");let o=this.chooseDestination();o?this.goTo(o):this.activityUntil=i+3}this.figure.update(i+this.phase,n.position,this.facing,!1,e,{state:this.state,seatHeight:this.seatHeight});return}if(!this.path&&!this.job&&i>=this.nextPlanAt&&(this.job=t.planner.search(n.position,this.target)),this.job&&t.budgetLeft()>0&&(this.job.step(1/0,Math.max(.2,t.budgetLeft())),this.job.done)){if(this.job.path)this.path=this.job.path,this.index=1,this.failures=0;else if(this.failures++,this.nextPlanAt=i+1.5,this.failures>=2){t.unreachable.set(this.target.key,i+180),this.failures=0;let o=this.onArrive;this.goTo(null),this.activityUntil=i+1,this.state="idle",o&&o(this,!1)}this.job=null}let r=!1,a={...n.position};if(this.path&&this.index<this.path.length){for(let u=Math.min(this.path.length-1,this.index+4);u>this.index;u--)if(qo(n.position,this.path[u])<1.2&&t.planner.clear(n.position,this.path[u])){this.index=u;break}let o=this.path[this.index],l=o.x-n.position.x,c=o.y-n.position.y,h=Math.hypot(l,c);if(h<.05)this.index++;else{let u={x:n.position.x+l/h*.7,y:n.position.y+c/h*.7,z:n.position.z};if(t.blockedAhead(this,u))this.wait+=e,this.wait>4&&(this.wait=0,this.path=null,this.nextPlanAt=i+.5);else{this.wait=0;let f=Math.min(h,this.speed*e);if(this.advance(l/h*f,c/h*f),r=qo(a,n.position)>f*.25,this.stalled=f>1e-5&&!r?this.stalled+e:0,this.stalled>.25&&this.stalled<.6){let g=Math.random()*Math.PI*2;n.move(Math.cos(g)*.03,Math.sin(g)*.03)}this.stalled>.6&&(this.stalled=0,this.path=null,this.nextPlanAt=i+.3),r&&(this.facing={x:l/h,y:c/h})}}if(this.path&&this.index>=this.path.length){let u=this.target;this.path=null,this.life.claimed.delete(u.key),this.arrive(),this.target=null}}this.figure.update(i+this.phase,n.position,this.facing,r,e,{state:r?"walk":this.state==="sit"||this.state==="treadmill"?"idle":this.state})}dispose(){this.target&&this.life.claimed.delete(this.target.key),this.figure.dispose()}},Kd=class{constructor(e,t,i){this.life=e,this.bay=t,this.id=t.id,this.group=i.group,this.obstacle=i.obstacle,this.length=4.4,this.width=1.8,this.pose={x:t.x,y:t.y,t:t.t},this.state="parked",this.until=e.time+cn(20,90),this.track=null,this.s=0,this.speed=0,this.owner=null,this.away=!1,this.paths=e.drivePaths?.[t.id]??null,this.apply()}apply(){let e=this.pose;this.group.position.set(e.x,0,-e.y),this.group.rotation.y=e.t,this.group.visible=!this.away;let t=Math.abs(Math.cos(e.t)),i=Math.abs(Math.sin(e.t)),n=(this.length*t+this.width*i)/2,r=(this.length*i+this.width*t)/2,a=this.away?[999,999,999.1,999.1]:[e.x-n,e.y-r,e.x+n,e.y+r];this.obstacle&&(this.obstacle.box=a)}get moving(){return!this.away&&!!this.track&&(this.state==="driving-out"||this.state==="arriving")}doorPoint(){let e=this.pose,t=Math.sin(e.t),i=-Math.cos(e.t);return{x:e.x+t*1.35+Math.cos(e.t)*.5,y:e.y+i*1.35+Math.sin(e.t)*.5,z:0}}begin(e){this.track=e,this.s=0,this.speed=0}step(e){let t=this.life,i=t.time;switch(this.state){case"parked":i>=this.until&&this.paths?.exit&&!this.owner&&t.people?this.callOwner():i>=this.until&&this.paths?.exit&&!t.people&&(this.state="leaving");break;case"waiting-owner":break;case"leaving":t.takeDrive(this)&&(this.begin(new Wo(this.paths.exit)),this.state="driving-out");break;case"driving-out":{let n=this.gateDistance(),r=n-4.5;this.s<r-.01?this.drive(e,r):this.s<n+.5&&!t.gateOpen()?this.speed=0:(this.drive(e)||this.s>n+3)&&(this.away=!0,t.releaseDrive(this),this.state="away",this.until=i+cn(30,110),this.apply());break}case"away":i>=this.until&&this.paths?.arrive&&!t.cars.some(n=>n.state==="arriving")&&(this.state="arriving",this.begin(new Wo(this.paths.arrive)),this.pose={...this.paths.arrive[0]},this.away=!1,this.apply());break;case"arriving":{let n=this.gateDistance(),r=n-8,a=n-4.5;this.s<r-.01?this.drive(e,r):t.takeDrive(this)?this.s<a-.01?this.drive(e,a):this.s<n+.5&&!t.gateOpen()?this.speed=0:this.drive(e)&&(this.state="parked",t.releaseDrive(this),this.until=i+cn(45,180),this.dropOwner()):this.speed=0;break}}}gateDistance(){let e=this.track;if(e.gateS!==void 0)return e.gateS;let t=this.life.gate,i=1/0,n=0;for(let r=0;r<=e.length;r+=.25){let a=e.pose(r),o=Math.hypot(a.x-t.centre[0],a.y-t.centre[1]);o<i&&(i=o,n=r)}return e.gateS=n,n}drive(e,t=1/0){let i=this.track,n=Math.min(i.length,t),r=i.pose(this.s),a=r.dir<0,o=i.length;for(let u=this.s+.25;u<i.length;u+=.25)if(i.pose(u).dir!==r.dir){o=u;break}let l=Math.min(n-this.s,o-this.s),c=a?1.1:Math.min(2.4,.7+l*.9);this.life.personNear(this,r,a)&&(c=0),this.speed+=(c-this.speed)*Math.min(1,e*(c<this.speed?4:1.2)),this.s=Math.min(n,this.s+this.speed*e);let h=i.pose(this.s);return this.pose={x:h.x,y:h.y,t:h.t},this.apply(),this.s>=i.length-1e-6?!0:(this.s>=n-1e-6&&(this.speed=0),!1)}callOwner(){let e=this.life,t=e.freeResident();if(!t){this.until=e.time+15;return}this.owner=t,t.car=this,this.state="waiting-owner";let i=this.doorPoint();t.goTo({key:"car-"+this.id,kind:"car",x:i.x,y:i.y,z:0,dir:[Math.cos(this.pose.t),Math.sin(this.pose.t)]},(n,r)=>{r?(t.setHidden(!0),t.state="idle",this.state="leaving"):(t.car=null,this.owner=null,this.state="parked",this.until=e.time+20)})}dropOwner(){let e=this.life;if(!e.people)return;let t=this.doorPoint(),i=this.owner;if(!i){if(i=e.spawnResident(t),!i)return;this.owner=i,i.car=this}i.nav.position={x:t.x,y:t.y,z:0},i.setHidden(!1),i.facing={x:Math.sin(this.pose.t),y:-Math.cos(this.pose.t)};let n=e.entrance;i.goTo(n?{key:"entrance-"+this.id,kind:"view",x:n.x,y:n.y,z:n.z,dir:n.dir}:null,()=>{this.owner=null,i.car=null,i.activityUntil=e.time+cn(2,6)}),n||(this.owner=null,i.car=null)}},wh=class{constructor(e,{scene:t,doors:i,carTemplates:n=new Map,mobile:r=!1,drivePaths:a=null}={}){this.data=e,this.scene=t,this.doors=i,this.mobile=r,this.drivePaths=a??e.life?.drive??null,this.group=new it,this.group.name="Life",t.add(this.group),this.planner=new $r(e,{spacing:.2,radius:.18}),this.residents=[],this.cars=[],this.people=!1,this.carsOn=!1,this.time=0,this.claimed=new Set,this.unreachable=new Map,this.turn=0,this.driveOwner=null,this.frameDeadline=0,this.gate=Zm(e),this.gateDoor=i?.doors.find(l=>l.spec.id==="Proposal | Front sliding gate")??null,this.destinations=cM(e);let o=e.rooms.find(l=>/new entrance gallery/i.test(l.label))??e.rooms.find(l=>/entrance hall/i.test(l.label))??null;this.entrance=o?{x:o.position[0],y:o.position[1],z:o.position[2],dir:o.direction}:null,this.carTemplates=n;for(let[l,c]of n){let h=(e.proposalSite?.driveway_bay_bounds_m??[]).find(y=>y.id===l);if(!h)continue;let u=h.bounds_m,d=u[3]-u[1]>u[2]-u[0]?Math.PI/2:0,f=this.drivePaths?.[l]?.arrive,g=f?f[f.length-1]:{x:(u[0]+u[2])/2,y:(u[1]+u[3])/2,t:d};this.cars.push(new Kd(this,{id:l,x:g.x,y:g.y,t:g.t},c))}this.count=r?4:7}get active(){return this.people||this.carsOn}get visitorPositions(){let e=[];for(let t of this.residents)t.hidden||e.push({...t.nav.position});for(let t of this.cars)if(t.moving){let i=t.pose,n=t.track.pose(Math.min(t.track.length,t.s+2.6));e.push({x:i.x,y:i.y,z:0}),e.push({x:n.x,y:n.y,z:0})}return e}budgetLeft(){return this.frameDeadline-$m()}setPeople(e){if(this.people=!!e,e&&!this.residents.length&&this.populate(),!e){for(let t of this.residents)t.dispose();this.residents=[],this.claimed.clear();for(let t of this.cars)t.owner&&(t.owner=null,t.state==="waiting-owner"&&(t.state="parked"))}}setCars(e){if(this.carsOn=!!e,!e)for(let t of this.cars){t.owner&&(t.owner.setHidden(!1),t.owner.car=null,t.owner.goTo(null),t.owner.activityUntil=this.time,t.owner=null);let i=t.paths?.arrive,n=i?i[i.length-1]:{x:t.bay.x,y:t.bay.y,t:t.bay.t};t.pose={...n},t.away=!1,t.track=null,t.state="parked",t.until=this.time+cn(20,90),t.apply()}this.driveOwner=null}populate(){let e=this.destinations.filter(t=>t.kind==="view"&&t.indoor);for(let t=0;t<this.count&&e.length;t++){let i=e.splice(Math.floor(Math.random()*e.length),1)[0];if(!this.planner.nav.canStand(i))continue;let n=new Sh(this,this.residents.length,i,qs[this.residents.length%qs.length]);n.facing={x:i.dir[0],y:i.dir[1]},n.state=Mh(["idle","look"]),n.activityUntil=this.time+cn(1,12),this.residents.push(n)}}spawnResident(e){if(this.residents.length>=this.count+2)return null;let t=new Sh(this,this.residents.length,{x:e.x,y:e.y,z:0},qs[this.residents.length%qs.length]);return this.residents.push(t),t}freeResident(){let e=this.residents.filter(t=>!t.car&&!t.hidden&&!t.target);return e.length?Mh(e):null}takeDrive(e){return!this.driveOwner||this.driveOwner===e?(this.driveOwner=e,!0):!1}releaseDrive(e){this.driveOwner===e&&(this.driveOwner=null)}driveFree(e){return!this.driveOwner||this.driveOwner===e}gateOpen(){return this.gateDoor?this.gateDoor.angle>.9:!0}personNear(e,t,i){let n=i?-1:1,r=Math.cos(t.t)*n,a=Math.sin(t.t)*n,o={x:t.x+r*e.length/2,y:t.y+a*e.length/2},l=c=>{let h=c.x-o.x,u=c.y-o.y,d=h*r+u*a,f=Math.abs(-h*a+u*r);return d>-.5&&d<3.2&&f<1.6&&Math.abs(c.z??0)<1.2};if(this.player&&l(this.player))return!0;for(let c of this.residents)if(!c.hidden&&l(c.nav.position))return!0;return!1}blockedAhead(e,t){if(this.player&&qo(this.player,t)<.55&&Math.abs(this.player.z-t.z)<1.2)return"visitor";for(let i of this.residents)if(!(i===e||i.hidden)&&qo(i.nav.position,t)<.5&&Math.abs(i.nav.position.z-t.z)<.6&&(!i.path||i.id<e.id))return"resident";for(let i of this.cars)if(i.moving){let n=i.pose;if(Math.hypot(n.x-t.x,n.y-t.y)<3.4)return"car"}return null}step(e,t){if(!this.active)return!1;e=Math.max(0,Math.min(.05,e)),this.time+=e,this.player=t,this.frameDeadline=$m()+(this.mobile?2.5:4);let i=this.residents.length;if(this.turn=(this.turn+1)%Math.max(1,i),this.people)for(let n=0;n<i;n++)this.residents[(this.turn+n)%i].step(e);if(this.carsOn)for(let n of this.cars)n.step(e);return!0}dispose(){this.setPeople(!1),this.group.removeFromParent()}};function cM(s){let e=[];for(let t of s.rooms){if(/gate|street|approach|outside|bridge|stair|landing|gallery|passage|corridor|lobby/i.test(t.id+" "+t.label))continue;let[i,n,r]=t.position;e.push({key:"view:"+t.id,kind:"view",x:i,y:n,z:r,dir:t.direction,indoor:!/garden|terrace|pool|deck|pavilion|lawn|drive|court/i.test(t.group+" "+t.label)})}for(let t of s.obstacles??[]){let i=t.box;if(!i)continue;let n=t.name??"",r=(i[0]+i[2])/2,a=(i[1]+i[3])/2,o=t.bottom??0;if(/treadmill/i.test(n)){let x=i[3]-i[1]>i[2]-i[0],M=x?[0,1]:[1,0],v=x?[(i[2]-i[0])/2+.45,0]:[0,(i[3]-i[1])/2+.45];e.push({key:"treadmill:"+n,kind:"treadmill",x:r+v[0],y:a+v[1],z:o,dir:M,seat:[r,a],indoor:!0});continue}if(!oM.test(n)||lM.test(n))continue;let l=t.top??o+.45,c=/bed/i.test(n)?Math.min(.6,l):Math.min(.5,Math.max(.4,l-.4)),h=i[2]-i[0],u=i[3]-i[1];if(h>3||u>3||h<.3||u<.3)continue;let d=s.rooms.filter(x=>Math.abs(x.position[2]-o)<.6).sort((x,M)=>Math.hypot(x.position[0]-r,x.position[1]-a)-Math.hypot(M.position[0]-r,M.position[1]-a))[0],f=d?[d.position[0]-r,d.position[1]-a]:[0,1],g=Math.hypot(...f)||1,y=f[0]/g,p=f[1]/g,m=(Math.abs(y)*h+Math.abs(p)*u)/2,_=m+.38,S=Math.max(0,m-.3);e.push({key:"seat:"+n,kind:"seat",x:r+y*_,y:a+p*_,z:o,dir:[y,p],seatHeight:c,seat:[r+y*S,a+p*S],indoor:!0})}return e}function Qm(s,e,t){let i=new it;i.name="Life car";let n=(e[0]+e[2])/2,r=(e[1]+e[3])/2,a=new Be().makeRotationY(-t).multiply(new Be().makeTranslation(-n,0,r));for(let{geometry:o,material:l}of s){let c=o.clone();c.applyMatrix4(a);let h=new Ze(c,l);h.castShadow=!0,h.receiveShadow=!0,i.add(h)}return i}var Eh=class{constructor({scene:e,camera:t,canvas:i,doors:n,life:r,data:a}){this.scene=e,this.camera=t,this.canvas=i,this.doors=n,this.life=r,this.data=a,this.raycaster=new Ls,this.raycaster.far=80,this.enabled=!1,this.overlay=null,this.last=null,this.material=new yi({color:2914404,transparent:!0,opacity:.38,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:Rt})}setEnabled(e){this.enabled=!!e,e||this.clear()}clear(){this.overlay&&(this.overlay.removeFromParent(),this.overlay.geometry.dispose(),this.overlay=null),this.last=null}resolve(e){let t=e.object,i=t.userData.spatialBatch;if(i?.sourceRanges){let n=e.faceIndex,r=i.sourceRanges,a=0,o=r.length-1;for(;a<o;){let h=a+o+1>>1;r[h]<=n?a=h:o=h-1}let l=r[a],c=a+1<r.length?r[a+1]:i.triangles;return{name:i.sourceNames[a]||"(unnamed)",kind:"model",mesh:t,range:[l,c]}}for(let n=t;n;n=n.parent){let r=this.doors?.doors.find(a=>a.pivot===n);if(r)return{name:r.spec.id,kind:"door",mesh:t,range:null,root:n};if(n.userData.lifeCar)return{name:n.userData.lifeCar,kind:"car",mesh:t,range:null,root:n};if(/^Resident \d+$/.test(n.name))return{name:n.name,kind:"person",mesh:t,range:null,root:n};if(n.userData.streetName)return{name:n.userData.streetName,kind:"street",mesh:t,range:null,root:n}}return{name:t.name||"(unnamed)",kind:"other",mesh:t,range:null,root:t}}pickables(){let e=[];return this.scene.traverse(t=>{t.isMesh&&t.visible&&!t.userData.inspectOverlay&&!t.userData.noPick&&e.push(t)}),e}pick(e){this.raycaster.setFromCamera(new ne(e[0],e[1]),this.camera);let t=this.raycaster.intersectObjects(this.pickables(),!1),i=null;for(let o of t){let l=o.object.material;if(!(l?.transparent&&l.opacity<.5&&!i)){i=o;break}}if(i||(i=t[0]),!i)return null;let n=this.resolve(i),r={x:i.point.x,y:-i.point.z,z:i.point.y},a=this.highlight(n);return this.last={...n,point:r,size:a,mesh:void 0,root:void 0},this.last}highlight(e){this.clear();let t=new Ft;if(e.range){let n=e.mesh.geometry,r=new nt;r.setAttribute("position",n.getAttribute("position")),n.index&&r.setIndex(n.index),r.setDrawRange(e.range[0]*3,(e.range[1]-e.range[0])*3);let a=new Ze(r,this.material);a.userData.inspectOverlay=!0,a.frustumCulled=!1,a.renderOrder=5,this.scene.add(a),this.overlay=a;let o=n.getAttribute("position"),l=n.index;for(let c=e.range[0]*3;c<e.range[1]*3;c++){let h=l?l.getX(c):c;t.expandByPoint(new N(o.getX(h),o.getY(h),o.getZ(h)))}}else if(e.root){e.root.updateMatrixWorld(!0);let n=new it;n.userData.inspectOverlay=!0,e.root.traverse(r=>{if(!r.isMesh)return;let a=new Ze(r.geometry,this.material);a.userData.inspectOverlay=!0,a.matrixAutoUpdate=!1,a.matrix.copy(r.matrixWorld),a.renderOrder=5,n.add(a)}),this.scene.add(n),this.overlay=n,this.overlay.geometry={dispose(){}},t.setFromObject(e.root)}if(t.isEmpty())return null;let i=t.getSize(new N);return{size:[i.x,i.z,i.y],min:[t.min.x,-t.max.z,t.min.y],max:[t.max.x,-t.min.z,t.max.y]}}};var ae=s=>document.getElementById(s);document.body.classList.toggle("touch-ui",Bo());var ri=ae("view"),qi=new Es;qi.background=new ze("#dce5e5");var Jd=()=>({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}),la=Jd(),jn=new qt(72,la.width/la.height,.045,150),hn,st,je,Pi,lt=null,Oi=0,Pn=0,Xi=!1,Qt=!1,Ks=!1,aa=null,ms="drag",Ko=0,eg=0,tg=0,Ch=!0,Pt=new Set,si={sourceMeshes:0,batches:0,hiddenMeshes:0},ut=!1,ps=null,Th=new Map,Xo=null,fs=null,Xs=null,ti=null,ig=0,mi=null,ra=null,sg={people:"ashley-heights-life-people",cars:"ashley-heights-life-cars"};function ng(s){try{return localStorage.getItem(sg[s])==="1"}catch{return!1}}function hM(s,e){try{localStorage.setItem(sg[s],e?"1":"0")}catch{}}var ua=()=>{Th.clear()};try{hn=new Zc({canvas:ri,antialias:!Bo(),powerPreference:"high-performance"})}catch(s){throw ae("load-status").textContent="3D graphics could not start. Open this walkthrough in Safari or Chrome with hardware acceleration enabled.",s}var oa=new ch({mobile:Bo(),dpr:devicePixelRatio});hn.setPixelRatio(oa.ratio(la.width,la.height));hn.setSize(la.width,la.height,!1);hn.outputColorSpace=It;var ii=Pm(hn,qi,jn),Ut=new uh(ri,ae("move-pad"),ae("move-thumb"),(s,e)=>{!Xi||!Qt||(Oi-=s*.004,Pn=Math.max(-1.35,Math.min(1.35,Pn-e*.004)),Kn())},()=>{mi?.enabled&&!lt?.game.started?Zd():lt?.game.tapFire()});function rg(s){ae("map").hidden=!s,ae("map-panel").classList.toggle("collapsed",!s),ae("map-toggle").textContent=Ut.enabled?s?"\xD7":"Map +":s?"\u2212":"+",ae("map-toggle").setAttribute("aria-expanded",String(s)),ae("map-toggle").setAttribute("aria-label",s?"Hide floorplan":"Show floorplan")}rg(!Ut.enabled);function Si(s){ae("toast").textContent=s,ae("toast").hidden=!1,clearTimeout(Si.timer),Si.timer=setTimeout(()=>ae("toast").hidden=!0,4200)}function Kn(){let s=st.position;jn.position.set(s.x,s.z+je.eyeHeight,-s.y),jn.rotation.set(Pn,Oi,0,"YXZ")}function ag(s){Oi=Math.atan2(-s[0],s[1]),Pn=Math.atan2(s[2]||0,Math.hypot(s[0],s[1]))}function uM(s){return s.z>2&&s.z<3.3&&s.y>7.89&&s.y<10.64&&s.x>5.04&&s.x<9.08}function og(s){return[...je.floorLevels??[{id:0,z:0,label:"Ground floor"},{id:1,z:2.8,label:"First floor"}]].reverse().find(e=>s>=e.z-.35)??{id:0,z:0,label:"Ground floor"}}function Yd(){let s=st.position;if(ut){let i=s.z+je.eyeHeight;return"Flying \xB7 "+Math.round(Math.abs(i))+" m "+(i<0?"below ground":"high")}if(jd(je,s))return"Ashley Close";if(je.approachSurface&&$t(s.x,s.y,je.approachSurface.polygon)&&!$t(s.x,s.y,je.site.outline_m))return"Outside gates";let e=og(s.z).id;return je.planRooms.find(i=>(i.floor===e||e===0&&i.floor===2)&&$t(s.x,s.y,i.polygon_m))?.name||(uM(s)?"Balcony":null)||(s.y>10?"Garden":s.y<0?"Front of house":s.z>.2&&s.z<2.7?"Stairs":"Outside")}function ca(){let s=st.position,e=og(s.z),t=s.y>11&&s.z<1,i=e.id;ae("location").textContent=Yd(),ae("floor-label").textContent=ut?"Site view":t?"Garden":Math.abs(s.z-e.z)>.35?"Stairs":e.label;let n=ae("map").getContext("2d"),r=480,a=310;n.clearRect(0,0,r,a);let o=je.streetContext?.enabled,l=o&&(ut||jd(je,s)),c=l?[-72,-51,31,34]:ut?[je.bounds[0]-4,je.bounds[1]-4,je.bounds[2]+4,je.bounds[3]+4]:t?[-28,8,19,33]:s.y<-.5?[-9,-24,19,11]:[-5.8,-1,14.7,11.2],h=Math.min((r-24)/(c[2]-c[0]),(a-24)/(c[3]-c[1])),u=(r-(c[2]-c[0])*h)/2,d=(a-(c[3]-c[1])*h)/2,f=([m,_])=>[u+(m-c[0])*h,a-d-(_-c[1])*h],g=(m,_,S)=>{n.beginPath(),m.forEach((x,M)=>{let[v,A]=f(x);M?n.lineTo(v,A):n.moveTo(v,A)}),n.closePath(),n.fillStyle=_,n.fill(),n.strokeStyle=S,n.lineWidth=1.6,n.stroke()};if(l){g(je.streetContext.road,"#a1aaa2","#808d83");for(let m of je.streetContext.obstacles)g(m.polygon,"#d6d0c3","#a39a8b");ae("floor-label").textContent="Street context"}(ut||t||s.y<-.5)&&je.site?.outline_m&&g(je.site.outline_m,"#d8e2cf","#9aaa96");for(let m of je.planRooms)(ut?m.floor===0||m.floor===2:t?m.floor===2:m.floor===i)&&g(m.polygon_m,m.name===Yd()?"#c0dacf":"#e9ece3","#8c9d90");if(!t&&!ut){for(let m of st.segments)if(Math.abs(m.bottom-e.z)<.1){let _=f(m.a),S=f(m.b);n.beginPath(),n.moveTo(..._),n.lineTo(...S),n.strokeStyle="#62766b",n.lineWidth=2,n.stroke()}}let[y,p]=f([s.x,s.y]);n.save(),n.translate(y,p),n.rotate(-Oi),n.fillStyle="#2c7864",n.beginPath(),n.moveTo(0,-14),n.lineTo(-8,7),n.lineTo(0,3),n.lineTo(8,7),n.closePath(),n.fill(),n.restore()}function lg(){document.body.classList.toggle("flying",ut),ae("flight-toggle").textContent=ut?"\u2193 Walk":"\u2191 Fly",ae("flight-toggle").setAttribute("aria-pressed",String(ut)),ae("flight-toggle").setAttribute("aria-label",ut?"Return to walking":"Fly around the house"),ae("flight-height").hidden=!ut,lt?.game.started||(ae("hint").textContent=ut?"W A S D \xB7 E up / Q down \xB7 Shift faster \xB7 F walk \xB7 Esc controls":"W A S D / arrows \xB7 Shift faster \xB7 Esc controls",ae("welcome").querySelector("h1").textContent=ut?"Fly around.":"Come inside.",ae("welcome").querySelector(".keys span").innerHTML=ut?"W A S D move towards your view.<br>E up \xB7 Q down \xB7 Shift faster \xB7 F walk":"Move with these or the arrow keys.<br>Move your mouse to look around.",ae("welcome").querySelector(".touch-instructions p").textContent=ut?"Move and look together. Hold Up or Down to change height. Push the pad farther to fly faster.":"Use both together. Push the movement pad farther to sprint.",Xi&&(ae("start").textContent=ut?"Start flying":"Start walking"))}function Ph(s,{quiet:e=!1}={}){if(!(!Xi||lt?.game.started)){if(s&&!ut&&(ps=xh(st,st.position,ps).position),!s&&ut){let t=xh(st,st.position,ps);st.position=t.position,t.moved&&!e&&Si("Returned to your walking viewpoint.")}ut=!!s,Pt.clear(),Ut.reset(),ua(),lg(),Kn(),ca()}}function Ah(s){let e=je.rooms.find(t=>t.id===s);e&&(ut&&Ph(!1,{quiet:!0}),Ut.reset(),st.teleport(e),ps={...st.position},ag(e.direction),Pi?.snap(st.position)&&ii.updateShadows(),Kn(),ca(),ae("rooms").value=s,Pt.clear())}function ha(s){lt?.clock.phase!=="caught"&&(s&&lt?.game.cancelFire(),ae("welcome").hidden=!s,ae("resume").hidden=Ut.enabled||s||document.pointerLockElement===ri,document.body.classList.toggle("walking",!s),Qt=!s,Ut.setActive(Qt),Pt.clear(),ua())}function dM(s){return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}function fM(){lt.clock.catch(),Qt=!1,Pt.clear(),Ut.setActive(!1),Ks=!1,document.body.classList.remove("walking"),ae("chase-status").hidden=!0,ae("welcome").hidden=!0,ae("resume").hidden=!0,document.pointerLockElement&&document.exitPointerLock();let s=lt.game.state;ae("caught-score").textContent=`Wave ${s.wave} \xB7 ${s.kills} defeated \xB7 ${s.score.toLocaleString()} points. Best: ${lt.game.best.toLocaleString()}.`,ae("caught").showModal(),ae("play-again").focus()}ae("caught").addEventListener("cancel",s=>s.preventDefault());ae("play-again").onclick=()=>{lt&&(lt.game.reset(),lt.clock.reset(),ae("caught").close(),ae("chase-status").hidden=!0,Ah("arrival"),ii.updateShadows(),Ko=performance.now(),js(ms==="lock"))};async function js(s){if(Xi&&(s=s&&!Ut.enabled,ms=s?"lock":"drag",ha(!1),ri.focus(),s))try{await ri.requestPointerLock()}catch{ms="drag",Si("Click and drag to look around; use W A S D to move."),ae("resume").hidden=!1}}ae("start").onclick=()=>js(!0);ae("drag").onclick=()=>js(!1);ae("resume").onclick=()=>js(!0);ae("help").onclick=()=>{document.pointerLockElement&&document.exitPointerLock(),ha(!0)};ae("rooms").onchange=s=>{lt?.game.started||(Ah(s.target.value),ae("welcome").hidden&&ri.focus())};ae("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Si("Use your browser\u2019s fullscreen control.")}};function Ih({focus:s=!0}={}){if(!Xs)return;let e=Xs;Xs=null,ae("settings-panel").hidden=!0,ae("settings-toggle").setAttribute("aria-expanded","false"),Qt=e.active,Ut.setActive(Qt),Pt.clear(),s&&ae("settings-toggle").focus(),Qt&&e.mode==="lock"&&(ae("resume").hidden=!1)}function pM(){if(Xi){if(Xs){Ih();return}Xs={active:Qt,mode:ms},ms="drag",Qt=!1,Pt.clear(),ua(),Ut.setActive(!1),lt?.game.cancelFire(),Ks=!1,document.pointerLockElement&&document.exitPointerLock(),ae("settings-panel").hidden=!1,ae("settings-toggle").setAttribute("aria-expanded","true"),ae("street-context").focus()}}function cg(s,{persist:e=!0}={}){if(!fs)return;let t=!1;if(s?fs.setVisible(!0):(t=Km(st,{flying:ut}),fs.setVisible(je.streetContext.enabled)),ae("street-context").checked=je.streetContext.enabled,e)try{jm(localStorage,je.streetContext.enabled)}catch{}si.streetContext={...fs.stats,enabled:je.streetContext.enabled},Pt.clear(),Ut.reset(),ua(),t&&(ps={...st.position},Pi?.snap(st.position),Si("Street hidden. Returned to the front gates.")),Kn(),ca(),ii.updateShadows()}ae("settings-toggle").onclick=pM;ae("settings-close").onclick=()=>Ih();ae("street-context").onchange=s=>cg(s.target.checked);function jo(s,e,{persist:t=!0}={}){if(ti){if(s==="people")ti.setPeople(e);else{if(e&&!ti.cars.length){Si(ia(ln)?"No car paths are available for this design.":"Cars belong to the proposed design: switch to Proposed."),ae("life-cars").checked=!1;return}ti.setCars(e)}ae(s==="people"?"life-people":"life-cars").checked=s==="people"?ti.people:ti.carsOn,t&&hM(s,e),si.life={people:ti.people,cars:ti.carsOn,residents:ti.residents.length,carCount:ti.cars.length},ii.updateShadows()}}ae("life-people").onchange=s=>jo("people",s.target.checked);ae("life-cars").onchange=s=>jo("cars",s.target.checked);function Rh(s,{persist:e=!0}={}){if(mi&&(mi.setEnabled(s),document.body.classList.toggle("inspecting",mi.enabled),ae("inspect-mode").checked=mi.enabled,mi.enabled||(ae("inspect-card").hidden=!0),fs?.setLabels(mi.enabled),e))try{localStorage.setItem("ashley-heights-inspect",mi.enabled?"1":"0")}catch{}}function mM(s){if(!s)return;ae("inspect-name").textContent=s.name;let e={model:"",door:"Door \xB7 ",car:"Car \xB7 ",person:"Person \xB7 ",street:"Street \xB7 ",other:""}[s.kind]??"",t=s.size?`${s.size.size.map(l=>l.toFixed(2)).join(" \xD7 ")} m \xB7 `:"",i=s.point,n=s.size?s.size.min[2]:i.z,r=je.floorLevels??[{z:0,label:"Ground floor"},{z:2.8,label:"First floor"}],a=[...r].filter(l=>l.z<=n+.06).sort((l,c)=>c.z-l.z)[0]??r[0],o=n<-.4&&a.label==="Cellar"&&ia(ln)?"Basement":n>r.at(-1).z+2.6?"Roof":a.label;ae("inspect-meta").textContent=`${e}${t}at x ${i.x.toFixed(2)}, y ${i.y.toFixed(2)}, z ${i.z.toFixed(2)} \xB7 ${o}`,ae("inspect-card").hidden=!1,window.walkthrough&&(window.walkthrough.lastPick=s)}function Zd(s,e){if(!mi?.enabled||!Xi||lt?.game.started)return null;let{width:t,height:i}=Jd(),n=document.pointerLockElement===ri||s===void 0?[0,0]:[s/t*2-1,-(e/i*2-1)],r=mi.pick(n);return r?mM(r):Si("Nothing there to identify."),r}ae("inspect-mode").onchange=s=>Rh(s.target.checked);ae("inspect-close").onclick=()=>{ae("inspect-card").hidden=!0,mi?.clear()};ae("inspect-copy").onclick=async()=>{let s=ae("inspect-name").textContent;try{await navigator.clipboard.writeText(s),Si("Copied: "+s)}catch{Si("Select the name to copy it.")}};document.addEventListener("pointerdown",s=>{Xs&&!ae("settings-panel").contains(s.target)&&!ae("settings-toggle").contains(s.target)&&Ih({focus:!1})},!0);var gM=s=>{Xi&&(Gm(s,{...st.position,yaw:Oi,pitch:Pn,active:Qt,flying:ut,lastWalkingPosition:ps}),location.assign(zm(s)))};ae("design-switch").onclick=()=>gM(ia(ln)?"original":"proposed");ae("map-toggle").onclick=()=>rg(ae("map").hidden);ae("flight-toggle").onclick=()=>{Ph(!ut),Qt||js(!1),ri.focus(),ut&&Si(Ut.enabled?"Fly mode \xB7 Move and look together \xB7 Hold Up / Down":"Fly mode \xB7 W A S D \xB7 E up / Q down \xB7 Shift faster")};for(let[s,e]of[["fly-up",1],["fly-down",-1]]){let t=ae(s);t.addEventListener("pointerdown",i=>{!ut||!Qt||(i.preventDefault(),Th.set(i.pointerId,e),t.setPointerCapture(i.pointerId))});for(let i of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(i,n=>Th.delete(n.pointerId));t.addEventListener("click",i=>{i.detail===0&&ut&&Qt&&(st.position=qd(je,st.position,{vertical:e,dt:.04}),Kn()),t.blur()}),t.addEventListener("contextmenu",i=>i.preventDefault())}for(let s of["blur","resize"])window.addEventListener(s,ua);document.addEventListener("visibilitychange",ua);document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===ri?(ha(!1),ms="lock"):ms==="lock"&&Xi&&ha(!0)});document.addEventListener("pointerlockerror",()=>{ms="drag",ha(!1),Si("Use click-and-drag to look around.")});ri.addEventListener("pointerdown",s=>{s.pointerType==="touch"||s.pointerType==="pen"||!Xi||!Qt||(ri.focus(),Ks=!0,aa=[s.clientX,s.clientY],ra=[s.clientX,s.clientY,s.timeStamp],ri.setPointerCapture(s.pointerId))});ri.addEventListener("pointerup",s=>{Ks=!1,aa=null,ra&&mi?.enabled&&s.pointerType!=="touch"&&s.pointerType!=="pen"&&(document.pointerLockElement===ri?0:Math.hypot(s.clientX-ra[0],s.clientY-ra[1]))<5&&s.timeStamp-ra[2]<600&&Zd(s.clientX,s.clientY),ra=null});ri.addEventListener("pointercancel",()=>{Ks=!1});document.addEventListener("pointermove",s=>{if(s.pointerType==="touch"||s.pointerType==="pen"||!Qt)return;let e=0,t=0;if(document.pointerLockElement===ri)e=s.movementX,t=s.movementY;else if(Ks&&aa)e=s.clientX-aa[0],t=s.clientY-aa[1],aa=[s.clientX,s.clientY];else return;Oi-=e*.0025,Pn=Math.max(-1.35,Math.min(1.35,Pn-t*.0025)),Kn()});var bM=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"];document.addEventListener("keydown",s=>{if(s.code==="KeyI"&&Xi&&!["SELECT","INPUT","BUTTON","TEXTAREA"].includes(document.activeElement?.tagName)&&!lt?.game.started){Rh(!mi?.enabled),Si(mi?.enabled?"Identify objects \xB7 click anything to see its name":"Identify objects off");return}if(s.code==="Escape"){if(Xs){s.preventDefault(),Ih();return}document.pointerLockElement&&document.exitPointerLock(),ha(!0);return}if(!(!Qt||["SELECT","INPUT","BUTTON"].includes(document.activeElement?.tagName))){if(s.code==="KeyF"&&!s.repeat&&!lt?.game.started){s.preventDefault(),Ph(!ut);return}(bM.includes(s.code)||ut&&["KeyE","KeyQ"].includes(s.code))&&(s.preventDefault(),Pt.add(s.code))}});document.addEventListener("keyup",s=>Pt.delete(s.code));window.addEventListener("blur",()=>{Pt.clear(),Ks=!1,Ch=!1});window.addEventListener("focus",()=>{Ch=!0,Ko=performance.now()});document.addEventListener("visibilitychange",()=>{Pt.clear(),Ko=performance.now()});function Yo(){let{width:s,height:e}=Jd();jn.aspect=s/e,jn.updateProjectionMatrix(),oa.dpr=devicePixelRatio,hn.setPixelRatio(Math.min(lt?.game.started?1.25:1/0,oa.ratio(s,e))),hn.setSize(s,e,!1),ii.resize(s,e)}window.addEventListener("resize",Yo);window.visualViewport?.addEventListener("resize",Yo);async function xM(){document.body.classList.add("loading"),je=await fetch(ln==="proposed"?new URL("./proposal-compact-navigation.4a65fbd12efd2af7.json",import.meta.url):new URL("./navigation.c7fcc1914dd897d2.json",import.meta.url)).then(g=>{if(!g.ok)throw Error("Navigation file missing");return g.json()}),st=new Vs(je),fs=new yh(qi,je);let s=!1;try{s=Xm(localStorage)}catch{}if(fs.setVisible(s),ae("street-context").checked=s,si.streetContext={...fs.stats,enabled:s},Xo=Im(qi,[{name:"Kitchen daylight bounce",position:[2.15,6.4,1.55],range:4.2,intensity:1.65},{name:"Hall daylight bounce",position:[6.55,2.7,1.6],range:3.4,intensity:1.45},...je.proposalLights??[]],{budget:Ut.enabled?4:6}),ii.info.localBounceLights=Xo.info.budget,ii.info.roomFills=Xo.info,je.modelUpdatedAt){let g=new Date(je.modelUpdatedAt);ae("model-version").textContent="Updated "+new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",timeZone:"Europe/London"}).format(g),ae("model-version").title=g.toLocaleString("en-GB",{timeZone:"Europe/London"})+" \xB7 London time"}let e=new eh().setMeshoptDecoder(Tm),t=await new Promise((g,y)=>e.load((ln==="proposed"?new URL("./proposal-compact.ef1980e196748f9c.glb",import.meta.url):new URL("./house.d7d75fd498d6295a.glb",import.meta.url)).href,g,p=>{let m=p.total?Math.round(p.loaded/p.total*75):35;ae("progress").style.width=m+"%",ae("load-status").textContent="Loading model \xB7 "+m+"%"},y));ae("load-status").textContent="Preparing the rooms\u2026",ae("progress").style.width="85%",await new Promise(g=>setTimeout(g,20)),t.scene.updateMatrixWorld(!0);let i=new Set(je.hiddenObjects),n=Am({cellSize:6,floorHeight:2.8,minMaterialTriangles:2e4,indexVertices:!1}),r=new Map;Pi=new hh(qi,je.interactiveDoors);let a=new Set((je.proposalSite?.driveway_bay_bounds_m??[]).map(g=>g.id).filter(g=>je.life?.drive?.[g])),o=new Map;function l(g){let y=g.name;if(r.has(y))return r.get(y);let p=g.clone(),m=je.materials[y]||je.materials[y.replaceAll("_"," ")];return m&&(p.color.setRGB(...m.slice(0,3)),p.opacity=m[3]),p.side=Rt,/Mirror/i.test(y)?(p.transparent=!1,p.opacity=1,p.metalness=1,p.roughness=.06):(p.transparent||p.opacity<1||/Glazing|Glass/i.test(y))&&(p.transparent=!0,p.depthWrite=!1,p.transmission=0,p.roughness=.09,p.metalness=0,p.side=Hi),Od(p,y),r.set(y,p),p}function c(g){for(let y=g;y;y=y.parent)if(i.has(y.userData.name||y.name))return!0;return!1}t.scene.traverse(g=>{if(!g.isMesh)return;si.sourceMeshes++;let y=Pi.owner(g);if(!y&&c(g)){si.hiddenMeshes++;return}let p=g.geometry.clone();p.applyMatrix4(g.matrixWorld),p.attributes.normal||p.computeVertexNormals();for(let x of Object.keys(p.attributes))["position","normal"].includes(x)||p.deleteAttribute(x);let m=Array.isArray(g.material)?g.material[0]:g.material,_=l(m);if(y){Pi.add(y,p,_);return}let S=/^Proposal \| Compact car (\w+)/.exec(g.userData.name||g.name);if(S&&a.has(S[1])){let x=o.get(S[1])??[];x.push({geometry:p,material:_}),o.set(S[1],x);return}n.add(p,_,g.userData.name||g.name)});let h=n.finish({disposeSources:!0});for(let g of h.meshes)qi.add(g);if(si.batches+=h.meshes.length,si.spatial=h.stats,je.approachSurface){let g=new Ni(je.approachSurface.polygon.map(([_,S])=>new ne(_,S))),y=new nn(g);y.rotateX(-Math.PI/2),y.translate(0,.012,0);let p=new Kt({color:6448225,roughness:.97,side:Rt});Od(p,"Tarmac");let m=new Ze(y,p);m.name="Gate roadside approach",m.receiveShadow=!0,qi.add(m),si.batches++}si.doorBatches=Pi.finish(),si.interactiveDoors=Pi.doors.length,si.batches+=si.doorBatches;{let g=new Map;for(let[y,p]of o){let m=(je.proposalSite?.cars??[]).find(x=>x.bay===y),_=je.obstacles.find(x=>x.name==="Proposal | Compact car "+y);if(!m||!_)continue;let S=Qm(p,_.box,m.heading_radians);S.userData.lifeCar="Proposal | Compact car "+y,qi.add(S),si.batches+=S.children.length,g.set(y,{group:S,obstacle:_})}ti=new wh(je,{scene:qi,doors:Pi,carTemplates:g,mobile:Ut.enabled}),mi=new Eh({scene:qi,camera:jn,canvas:ri,doors:Pi,life:ti,data:je});for(let[y,{group:p}]of g){let m=ti.cars.find(_=>_.id===y);m?m.apply():p.visible=!0}}si.geometryBytes=0;let u=new Set;qi.traverse(g=>{let y=g.geometry;if(!(!y||u.has(y))){u.add(y);for(let p of Object.values(y.attributes))si.geometryBytes+=p.array.byteLength;y.index&&(si.geometryBytes+=y.index.array.byteLength)}}),ii.updateShadows();{let g=new bh(je,{scene:qi,camera:jn,doors:Pi,mobile:Ut.enabled,isActive:()=>Qt&&!ut&&Ch&&!document.hidden,onDeath:fM,onArm:()=>{lt.clock.arm(st.position)&&(ii.setActionMode(!0),hn.setPixelRatio(Math.min(devicePixelRatio,1.25)),Yo(),lt.game.arm(st.position),lt.game.updateHUD(lt.clock))},onReset:()=>{lt?.clock.reset(),ii.setActionMode(!1),hn.setPixelRatio(Math.min(devicePixelRatio,Ut.enabled?1.25:1.5)),Yo()},toast:Si});lt={clock:new dh(je),game:g,pursuit:g.horde}}let d=new Map;ae("rooms").replaceChildren();for(let g of je.rooms){if(!d.has(g.group)){let p=document.createElement("optgroup");p.label=g.group,d.set(g.group,p),ae("rooms").append(p)}let y=document.createElement("option");y.value=g.id,y.textContent=g.label,d.get(g.group).append(y)}ae("rooms").disabled=!1,Xi=!0,Ah("arrival"),ng("people")&&jo("people",!0,{persist:!1});try{localStorage.getItem("ashley-heights-inspect")==="1"&&Rh(!0,{persist:!1})}catch{}ng("cars")&&ti.cars.length&&jo("cars",!0,{persist:!1});let f=Hm();if(f){let g=Vm(st,f);st.position=g.position,ut=f.flying===!0;let y=f.lastWalkingPosition;y&&["x","y","z"].every(p=>Number.isFinite(y[p]))&&(ps=xh(st,y,ps).position),lg(),Oi=f.yaw,Pn=f.pitch,Pi.snap(st.position),ii.updateShadows(),Kn(),ca(),g.moved&&Si("Moved to "+(g.room??"a safe viewpoint")+" for this design."),f.active&&js(!1)}{let g=ia(ln),y=g?"original":"proposed";ae("design-current").textContent=vh[ln],ae("design-action").textContent="\u21C4 View "+vh[y].toLowerCase(),ae("design-switch").disabled=!1,ae("flight-toggle").disabled=!1,ae("design-switch").setAttribute("aria-label","View "+vh[y].toLowerCase()+" design")}ae("start").disabled=!1,ae("drag").disabled=!1,ae("settings-toggle").disabled=!1,ae("start").textContent=ut?"Start flying":"Start walking",ae("load-status").textContent=ln==="proposed"?"Proposed \xB7 New wing \xB7 Loft \xB7 Pool":"Existing \xB7 Start at the gates \xB7 Both floors \xB7 Garden",ae("progress").style.width="100%",document.body.classList.remove("loading"),window.walkthrough={ready:!0,stats:si,nav:st,data:je,doors:Pi,camera:jn,renderer:hn,lighting:ii.info,touch:Ut,easter:lt,life:ti,setLife:jo,inspector:mi,setInspect:Rh,inspectAt:Zd,goTo:Ah,setFlying:Ph,setStreetVisible:cg,setView(g,y){Ut.reset(),st.position={x:g[0],y:g[1],z:g[2]},ag(y),Pi.snap(st.position)&&ii.updateShadows(),Kn(),ca()},getState(){return{...st.position,yaw:Oi,pitch:Pn,active:Qt,flying:ut,room:Yd(),streetContext:je.streetContext.enabled,calls:hn.info.render.calls}},startDrag:()=>js(!1)}}function hg(s){requestAnimationFrame(hg);let e=Math.max(0,(s-Ko)/1e3),t=Math.min(e,.04);if(Ko=s,Xi){let i=Qt&&!document.hidden&&(!lt?.game.started||Ch);if(i&&oa.sample(e*1e3,s)&&(Yo(),ii.info.renderScale=oa.scale),i||oa.reset(),i){let a=Number(Pt.has("KeyW")||Pt.has("ArrowUp"))-Number(Pt.has("KeyS")||Pt.has("ArrowDown"))+Ut.axes.forward,o=Number(Pt.has("KeyD")||Pt.has("ArrowRight"))-Number(Pt.has("KeyA")||Pt.has("ArrowLeft"))+Ut.axes.right;if(ut){let l=Number(Pt.has("KeyE"))-Number(Pt.has("KeyQ"))+[...Th.values()].reduce((c,h)=>c+h,0);st.position=qd(je,st.position,{forward:a,right:o,vertical:l,yaw:Oi,pitch:Pn,fast:Pt.has("ShiftLeft")||Pt.has("ShiftRight")||Ut.sprinting,dt:t})}else{let l=Math.max(1,Math.hypot(a,o)),c=(Pt.has("ShiftLeft")||Pt.has("ShiftRight")||Ut.sprinting?3.2:lt?.game.started?2.15:1.65)*t/l,h=(-Math.sin(Oi)*a+Math.cos(Oi)*o)*c,u=(Math.cos(Oi)*a+Math.sin(Oi)*o)*c;for(let[d,f]of[[h,0],[0,u]]){let g={...st.position};st.move(d,f),lt?.game.horde.blocks(st.position,st.radius)&&(st.position=g)}}Kn()}lt&&(lt.clock.advance(e,i&&!ut,st.position)&&lt.game.startWave(st.position),i&&!ut&&lt.clock.phase!=="caught"?(lt.game.step(t,st.position,lt.clock),lt.clock.phase==="chasing"&&s-tg>120&&(ii.updateShadows(),tg=s)):lt.game.cancelFire());let n=ti&&!document.hidden&&ti.step(t,st.position),r=[...lt?.clock.phase==="chasing"?lt.pursuit.positions:[],...n?ti.visitorPositions:[]];Pi.update(st.position,t,!1,r)?ii.updateShadows():n&&s-ig>(Ut.enabled?350:200)&&(ii.updateShadows(),ig=s),s-eg>160&&(ca(),lt?.clock.phase==="chasing"&&(ae("chase-time").textContent=(i?"Keep moving":"Paused")+" \xB7 "+dM(lt.clock.survived)),eg=s)}Xo&&Xo.update(jn,s),ii.render()}xM().catch(s=>{console.error(s),ae("start").textContent="Try again",ae("start").disabled=!1,ae("start").onclick=()=>location.reload(),ae("load-status").textContent="The house could not load. Check your connection and try again.",ae("progress").style.width="0"});requestAnimationFrame(hg);
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
