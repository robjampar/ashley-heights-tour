var Mm=Object.defineProperty;var wm=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var Tm=(i,e)=>{for(var t in e)Mm(i,t,{get:e[t],enumerable:!0})};var Kp={};Tm(Kp,{AsyncCompress:()=>K_,AsyncDecompress:()=>Q_,AsyncDeflate:()=>Up,AsyncGunzip:()=>kp,AsyncGzip:()=>K_,AsyncInflate:()=>Iu,AsyncUnzipInflate:()=>hy,AsyncUnzlib:()=>zp,AsyncZipDeflate:()=>ry,AsyncZlib:()=>J_,Compress:()=>bu,DecodeUTF8:()=>ny,Decompress:()=>yu,Deflate:()=>Rn,EncodeUTF8:()=>iy,FlateErrorCode:()=>j_,Gunzip:()=>Kl,Gzip:()=>bu,Inflate:()=>mn,Unzip:()=>uy,UnzipInflate:()=>cy,UnzipPassThrough:()=>Xp,Unzlib:()=>Jl,Zip:()=>ay,ZipDeflate:()=>sy,ZipPassThrough:()=>Ra,Zlib:()=>vu,compress:()=>Y_,compressSync:()=>xu,decompress:()=>ey,decompressSync:()=>ty,deflate:()=>Op,deflateSync:()=>Da,gunzip:()=>Bp,gunzipSync:()=>Yl,gzip:()=>Y_,gzipSync:()=>xu,inflate:()=>Du,inflateSync:()=>Er,strFromU8:()=>Nu,strToU8:()=>Xi,unzip:()=>dy,unzipSync:()=>fy,unzlib:()=>Gp,unzlibSync:()=>Zl,zip:()=>oy,zipSync:()=>ly,zlib:()=>Z_,zlibSync:()=>_u});function gs(i,e){return typeof i=="function"&&(e=i,i={}),this.ondata=e,i}function Op(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),wr(i,e,[Mr],function(n){return Ki(Da(n.data[0],n.data[1]))},0,t)}function Da(i,e){return ms(i,e||{},0,0)}function Du(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),wr(i,e,[Sr],function(n){return Ki(Er(n.data[0],Tu(n.data[1])))},1,t)}function Er(i,e){return Pa(i,{i:2},e&&e.out,e&&e.dictionary)}function Y_(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),wr(i,e,[Mr,Ip,function(){return[xu]}],function(n){return Ki(xu(n.data[0],n.data[1]))},2,t)}function xu(i,e){e||(e={});var t=yr(),n=i.length;t.p(i);var s=ms(i,e,Ru(e),8),r=s.length;return Eu(s,e),tt(s,r-8,t.d()),tt(s,r-4,n),s}function Bp(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),wr(i,e,[Sr,Dp,function(){return[Yl]}],function(n){return Ki(Yl(n.data[0],n.data[1]))},3,t)}function Yl(i,e){var t=Au(i);return t+8>i.length&&De(6,"invalid gzip data"),Pa(i.subarray(t,-8),{i:2},e&&e.out||new We(Fp(i)),e&&e.dictionary)}function Z_(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),wr(i,e,[Mr,Lp,function(){return[_u]}],function(n){return Ki(_u(n.data[0],n.data[1]))},4,t)}function _u(i,e){e||(e={});var t=ec();t.p(i);var n=ms(i,e,e.dictionary?6:2,4);return Cu(n,e),tt(n,n.length-4,t.d()),n}function Gp(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),wr(i,e,[Sr,Np,function(){return[Zl]}],function(n){return Ki(Zl(n.data[0],Tu(n.data[1])))},5,t)}function Zl(i,e){return Pa(i.subarray(Pu(i,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}function ey(i,e,t){return t||(t=e,e={}),typeof t!="function"&&De(7),i[0]==31&&i[1]==139&&i[2]==8?Bp(i,e,t):(i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31?Du(i,e,t):Gp(i,e,t)}function ty(i,e){return i[0]==31&&i[1]==139&&i[2]==8?Yl(i,e):(i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31?Er(i,e):Zl(i,e)}function Xi(i,e){if(e){for(var t=new We(i.length),n=0;n<i.length;++n)t[n]=i.charCodeAt(n);return t}if(bp)return bp.encode(i);for(var s=i.length,r=new We(i.length+(i.length>>1)),a=0,o=function(h){r[a++]=h},n=0;n<s;++n){if(a+5>r.length){var c=new We(a+8+(s-n<<1));c.set(r),r=c}var l=i.charCodeAt(n);l<128||e?o(l):l<2048?(o(192|l>>6),o(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|i.charCodeAt(++n)&1023,o(240|l>>18),o(128|l>>12&63),o(128|l>>6&63),o(128|l&63)):(o(224|l>>12),o(128|l>>6&63),o(128|l&63))}return An(r,0,a)}function Nu(i,e){if(e){for(var t="",n=0;n<i.length;n+=16384)t+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return t}else{if(Su)return Su.decode(i);var s=Hp(i),r=s.s,t=s.r;return t.length&&De(8),r}}function oy(i,e,t){t||(t=e,e={}),typeof t!="function"&&De(7);var n={};Lu(i,"",n,e);var s=Object.keys(n),r=s.length,a=0,o=0,c=r,l=new Array(r),h=[],u=function(){for(var m=0;m<h.length;++m)h[m]()},d=function(m,p){Ql(function(){t(m,p)})};Ql(function(){d=t});var f=function(){var m=new We(o+22),p=a,S=o-a;o=0;for(var A=0;A<c;++A){var _=l[A];try{var M=_.c.length;br(m,o,_,_.f,_.u,M);var E=30+_.f.length+ji(_.extra),R=o+E;m.set(_.c,R),br(m,a,_,_.f,_.u,M,o,_.m),a+=16+E+(_.m?_.m.length:0),o=R+M}catch(x){return d(x,null)}}Fu(m,a,l.length,S,p),d(null,m)};r||f();for(var b=function(m){var p=s[m],S=n[p],A=S[0],_=S[1],M=yr(),E=A.length;M.p(A);var R=Xi(p),x=R.length,T=_.comment,I=T&&Xi(T),L=I&&I.length,z=ji(_.extra),G=_.level==0?0:8,N=function(V,Y){if(V)u(),d(V,null);else{var X=Y.length;l[m]=Ia(_,{size:E,crc:M.d(),c:Y,f:R,m:I,u:x!=p.length||I&&T.length!=L,compression:G}),a+=30+x+z+X,o+=76+2*(x+z)+(L||0)+X,--r||f()}};if(x>65535&&N(De(11,0,1),null),!G)N(null,A);else if(E<16e4)try{N(null,Da(A,_))}catch(V){N(V,null)}else h.push(Op(A,_,N))},v=0;v<c;++v)b(v);return u}function ly(i,e){e||(e={});var t={},n=[];Lu(i,"",t,e);var s=0,r=0;for(var a in t){var o=t[a],c=o[0],l=o[1],h=l.level==0?0:8,u=Xi(a),d=u.length,f=l.comment,b=f&&Xi(f),v=b&&b.length,m=ji(l.extra);d>65535&&De(11);var p=h?Da(c,l):c,S=p.length,A=yr();A.p(c),n.push(Ia(l,{size:c.length,crc:A.d(),c:p,f:u,m:b,u:d!=a.length||b&&f.length!=v,o:s,compression:h})),s+=30+d+m+S,r+=76+2*(d+m)+(v||0)+S}for(var _=new We(r+22),M=s,E=r-s,R=0;R<n.length;++R){var u=n[R];br(_,u.o,u,u.f,u.u,u.c.length);var x=30+u.f.length+ji(u.extra);_.set(u.c,u.o+x),br(_,s,u,u.f,u.u,u.c.length,u.o,u.m),s+=16+x+(u.m?u.m.length:0)}return Fu(_,s,n.length,E,M),_}function dy(i,e,t){t||(t=e,e={}),typeof t!="function"&&De(7);var n=[],s=function(){for(var m=0;m<n.length;++m)n[m]()},r={},a=function(m,p){Ql(function(){t(m,p)})};Ql(function(){a=t});for(var o=i.length-22;It(i,o)!=101010256;--o)if(!o||i.length-o>65558)return a(De(13,0,1),null),s;var c=rn(i,o+8);if(c){var l=c,h=It(i,o+16),u=h==4294967295||l==65535;if(u){var d=It(i,o-12);u=It(i,d)==101075792,u&&(l=c=It(i,d+32),h=It(i,d+48))}for(var f=e&&e.filter,b=function(m){var p=qp(i,h,u),S=p[0],A=p[1],_=p[2],M=p[3],E=p[4],R=p[5],x=$p(i,R);h=E;var T=function(L,z){L?(s(),a(L,null)):(z&&(r[M]=z),--c||a(null,r))};if(!f||f({name:M,size:A,originalSize:_,compression:S}))if(!S)T(null,An(i,x,x+A));else if(S==8){var I=i.subarray(x,x+A);if(_<524288||A>.8*_)try{T(null,Er(I,{out:new We(_)}))}catch(L){T(L,null)}else n.push(Du(I,{size:_},T))}else T(De(14,"unknown compression type "+S,1),null);else T(null,null)},v=0;v<l;++v)b(v)}else a(null,{});return s}function fy(i,e){for(var t={},n=i.length-22;It(i,n)!=101010256;--n)(!n||i.length-n>65558)&&De(13);var s=rn(i,n+8);if(!s)return{};var r=It(i,n+16),a=r==4294967295||s==65535;if(a){var o=It(i,n-12);a=It(i,o)==101075792,a&&(s=It(i,o+32),r=It(i,o+48))}for(var c=e&&e.filter,l=0;l<s;++l){var h=qp(i,r,a),u=h[0],d=h[1],f=h[2],b=h[3],v=h[4],m=h[5],p=$p(i,m);r=v,(!c||c({name:b,size:d,originalSize:f,compression:u}))&&(u?u==8?t[b]=Er(i.subarray(p,p+d),{out:new We(f)}):De(14,"unknown compression type "+u):t[b]=An(i,p,p+d))}return t}var mp,q_,We,an,Ca,xr,vr,Ea,xp,vp,Mu,jl,_p,yp,pu,Aa,Mi,nt,En,wi,nt,nt,nt,nt,gr,nt,Sp,Mp,wp,Tp,Wl,Tn,$l,_r,An,j_,Ep,De,Pa,ai,pr,ql,Xl,mu,mr,wu,gu,Ap,qi,Rp,Cp,yr,ec,ms,Ia,gp,Hl,X_,Pp,Sr,Mr,Ip,Dp,Lp,Np,Ki,Tu,wr,Cn,Tr,rn,It,fu,tt,Eu,Au,Fp,Ru,Cu,Pu,Rn,Up,mn,Iu,bu,K_,Kl,kp,vu,J_,Jl,zp,yu,Q_,Lu,bp,Su,Vp,Hp,ny,iy,Wp,$p,qp,jp,ji,br,Fu,Ra,sy,ry,ay,Xp,cy,hy,uy,Ql,Yp=wm(()=>{mp={},q_=(function(i,e,t,n,s){var r=new Worker(mp[e]||(mp[e]=URL.createObjectURL(new Blob([i+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return r.onmessage=function(a){var o=a.data,c=o.$e$;if(c){var l=new Error(c[0]);l.code=c[1],l.stack=c[2],s(l,null)}else s(null,o)},r.postMessage(t,n),r}),We=Uint8Array,an=Uint16Array,Ca=Int32Array,xr=new We([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),vr=new We([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ea=new We([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),xp=function(i,e){for(var t=new an(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var s=new Ca(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)s[r]=r-t[n]<<5|n;return{b:t,r:s}},vp=xp(xr,2),Mu=vp.b,jl=vp.r;Mu[28]=258,jl[258]=28;_p=xp(vr,0),yp=_p.b,pu=_p.r,Aa=new an(32768);for(nt=0;nt<32768;++nt)Mi=(nt&43690)>>1|(nt&21845)<<1,Mi=(Mi&52428)>>2|(Mi&13107)<<2,Mi=(Mi&61680)>>4|(Mi&3855)<<4,Aa[nt]=((Mi&65280)>>8|(Mi&255)<<8)>>1;En=(function(i,e,t){for(var n=i.length,s=0,r=new an(e);s<n;++s)i[s]&&++r[i[s]-1];var a=new an(e);for(s=1;s<e;++s)a[s]=a[s-1]+r[s-1]<<1;var o;if(t){o=new an(1<<e);var c=15-e;for(s=0;s<n;++s)if(i[s])for(var l=s<<4|i[s],h=e-i[s],u=a[i[s]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)o[Aa[u]>>c]=l}else for(o=new an(n),s=0;s<n;++s)i[s]&&(o[s]=Aa[a[i[s]-1]++]>>15-i[s]);return o}),wi=new We(288);for(nt=0;nt<144;++nt)wi[nt]=8;for(nt=144;nt<256;++nt)wi[nt]=9;for(nt=256;nt<280;++nt)wi[nt]=7;for(nt=280;nt<288;++nt)wi[nt]=8;gr=new We(32);for(nt=0;nt<32;++nt)gr[nt]=5;Sp=En(wi,9,0),Mp=En(wi,9,1),wp=En(gr,5,0),Tp=En(gr,5,1),Wl=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},Tn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},$l=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},_r=function(i){return(i+7)/8|0},An=function(i,e,t){return(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length),new We(i.subarray(e,t))},j_={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14},Ep=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],De=function(i,e,t){var n=new Error(e||Ep[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,De),!t)throw n;return n},Pa=function(i,e,t,n){var s=i.length,r=n?n.length:0;if(!s||e.f&&!e.l)return t||new We(0);var a=!t,o=a||e.i!=2,c=e.i;a&&(t=new We(s*3));var l=function(de){var we=t.length;if(de>we){var at=new We(Math.max(we*2,de));at.set(t),t=at}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,b=e.d,v=e.m,m=e.n,p=s*8;do{if(!f){h=Tn(i,u,1);var S=Tn(i,u+1,3);if(u+=3,S)if(S==1)f=Mp,b=Tp,v=9,m=5;else if(S==2){var E=Tn(i,u,31)+257,R=Tn(i,u+10,15)+4,x=E+Tn(i,u+5,31)+1;u+=14;for(var T=new We(x),I=new We(19),L=0;L<R;++L)I[Ea[L]]=Tn(i,u+L*3,7);u+=R*3;for(var z=Wl(I),G=(1<<z)-1,N=En(I,z,1),L=0;L<x;){var V=N[Tn(i,u,G)];u+=V&15;var A=V>>4;if(A<16)T[L++]=A;else{var Y=0,X=0;for(A==16?(X=3+Tn(i,u,3),u+=2,Y=T[L-1]):A==17?(X=3+Tn(i,u,7),u+=3):A==18&&(X=11+Tn(i,u,127),u+=7);X--;)T[L++]=Y}}var ie=T.subarray(0,E),j=T.subarray(E);v=Wl(ie),m=Wl(j),f=En(ie,v,1),b=En(j,m,1)}else De(1);else{var A=_r(u)+4,_=i[A-4]|i[A-3]<<8,M=A+_;if(M>s){c&&De(0);break}o&&l(d+_),t.set(i.subarray(A,M),d),e.b=d+=_,e.p=u=M*8,e.f=h;continue}if(u>p){c&&De(0);break}}o&&l(d+131072);for(var K=(1<<v)-1,te=(1<<m)-1,_e=u;;_e=u){var Y=f[$l(i,u)&K],me=Y>>4;if(u+=Y&15,u>p){c&&De(0);break}if(Y||De(2),me<256)t[d++]=me;else if(me==256){_e=u,f=null;break}else{var Ge=me-254;if(me>264){var L=me-257,Ae=xr[L];Ge=Tn(i,u,(1<<Ae)-1)+Mu[L],u+=Ae}var Be=b[$l(i,u)&te],ee=Be>>4;Be||De(3),u+=Be&15;var j=yp[ee];if(ee>3){var Ae=vr[ee];j+=$l(i,u)&(1<<Ae)-1,u+=Ae}if(u>p){c&&De(0);break}o&&l(d+131072);var ne=d+Ge;if(d<j){var ge=r-j,Ue=Math.min(j,ne);for(ge+d<0&&De(3);d<Ue;++d)t[d]=n[ge+d]}for(;d<ne;++d)t[d]=t[d-j]}}e.l=f,e.p=_e,e.b=d,e.f=h,f&&(h=1,e.m=v,e.d=b,e.n=m)}while(!h);return d!=t.length&&a?An(t,0,d):t.subarray(0,d)},ai=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8},pr=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8,i[n+2]|=t>>16},ql=function(i,e){for(var t=[],n=0;n<i.length;++n)i[n]&&t.push({s:n,f:i[n]});var s=t.length,r=t.slice();if(!s)return{t:qi,l:0};if(s==1){var a=new We(t[0].s+1);return a[t[0].s]=1,{t:a,l:1}}t.sort(function(M,E){return M.f-E.f}),t.push({s:-1,f:25001});var o=t[0],c=t[1],l=0,h=1,u=2;for(t[0]={s:-1,f:o.f+c.f,l:o,r:c};h!=s-1;)o=t[t[l].f<t[u].f?l++:u++],c=t[l!=h&&t[l].f<t[u].f?l++:u++],t[h++]={s:-1,f:o.f+c.f,l:o,r:c};for(var d=r[0].s,n=1;n<s;++n)r[n].s>d&&(d=r[n].s);var f=new an(d+1),b=Xl(t[h-1],f,0);if(b>e){var n=0,v=0,m=b-e,p=1<<m;for(r.sort(function(E,R){return f[R.s]-f[E.s]||E.f-R.f});n<s;++n){var S=r[n].s;if(f[S]>e)v+=p-(1<<b-f[S]),f[S]=e;else break}for(v>>=m;v>0;){var A=r[n].s;f[A]<e?v-=1<<e-f[A]++-1:++n}for(;n>=0&&v;--n){var _=r[n].s;f[_]==e&&(--f[_],++v)}b=e}return{t:new We(f),l:b}},Xl=function(i,e,t){return i.s==-1?Math.max(Xl(i.l,e,t+1),Xl(i.r,e,t+1)):e[i.s]=t},mu=function(i){for(var e=i.length;e&&!i[--e];);for(var t=new an(++e),n=0,s=i[0],r=1,a=function(c){t[n++]=c},o=1;o<=e;++o)if(i[o]==s&&o!=e)++r;else{if(!s&&r>2){for(;r>138;r-=138)a(32754);r>2&&(a(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(a(s),--r;r>6;r-=6)a(8304);r>2&&(a(r-3<<5|8208),r=0)}for(;r--;)a(s);r=1,s=i[o]}return{c:t.subarray(0,n),n:e}},mr=function(i,e){for(var t=0,n=0;n<e.length;++n)t+=i[n]*e[n];return t},wu=function(i,e,t){var n=t.length,s=_r(e+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=t[r];return(s+4+n)*8},gu=function(i,e,t,n,s,r,a,o,c,l,h){ai(e,h++,t),++s[256];for(var u=ql(s,15),d=u.t,f=u.l,b=ql(r,15),v=b.t,m=b.l,p=mu(d),S=p.c,A=p.n,_=mu(v),M=_.c,E=_.n,R=new an(19),x=0;x<S.length;++x)++R[S[x]&31];for(var x=0;x<M.length;++x)++R[M[x]&31];for(var T=ql(R,7),I=T.t,L=T.l,z=19;z>4&&!I[Ea[z-1]];--z);var G=l+5<<3,N=mr(s,wi)+mr(r,gr)+a,V=mr(s,d)+mr(r,v)+a+14+3*z+mr(R,I)+2*R[16]+3*R[17]+7*R[18];if(c>=0&&G<=N&&G<=V)return wu(e,h,i.subarray(c,c+l));var Y,X,ie,j;if(ai(e,h,1+(V<N)),h+=2,V<N){Y=En(d,f,0),X=d,ie=En(v,m,0),j=v;var K=En(I,L,0);ai(e,h,A-257),ai(e,h+5,E-1),ai(e,h+10,z-4),h+=14;for(var x=0;x<z;++x)ai(e,h+3*x,I[Ea[x]]);h+=3*z;for(var te=[S,M],_e=0;_e<2;++_e)for(var me=te[_e],x=0;x<me.length;++x){var Ge=me[x]&31;ai(e,h,K[Ge]),h+=I[Ge],Ge>15&&(ai(e,h,me[x]>>5&127),h+=me[x]>>12)}}else Y=Sp,X=wi,ie=wp,j=gr;for(var x=0;x<o;++x){var Ae=n[x];if(Ae>255){var Ge=Ae>>18&31;pr(e,h,Y[Ge+257]),h+=X[Ge+257],Ge>7&&(ai(e,h,Ae>>23&31),h+=xr[Ge]);var Be=Ae&31;pr(e,h,ie[Be]),h+=j[Be],Be>3&&(pr(e,h,Ae>>5&8191),h+=vr[Be])}else pr(e,h,Y[Ae]),h+=X[Ae]}return pr(e,h,Y[256]),h+X[256]},Ap=new Ca([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),qi=new We(0),Rp=function(i,e,t,n,s,r){var a=r.z||i.length,o=new We(n+a+5*(1+Math.ceil(a/7e3))+s),c=o.subarray(n,o.length-s),l=r.l,h=(r.r||0)&7;if(e){h&&(c[0]=r.r>>3);for(var u=Ap[e-1],d=u>>13,f=u&8191,b=(1<<t)-1,v=r.p||new an(32768),m=r.h||new an(b+1),p=Math.ceil(t/3),S=2*p,A=function(Oe){return(i[Oe]^i[Oe+1]<<p^i[Oe+2]<<S)&b},_=new Ca(25e3),M=new an(288),E=new an(32),R=0,x=0,T=r.i||0,I=0,L=r.w||0,z=0;T+2<a;++T){var G=A(T),N=T&32767,V=m[G];if(v[N]=V,m[G]=N,L<=T){var Y=a-T;if((R>7e3||I>24576)&&(Y>423||!l)){h=gu(i,c,0,_,M,E,x,I,z,T-z,h),I=R=x=0,z=T;for(var X=0;X<286;++X)M[X]=0;for(var X=0;X<30;++X)E[X]=0}var ie=2,j=0,K=f,te=N-V&32767;if(Y>2&&G==A(T-te))for(var _e=Math.min(d,Y)-1,me=Math.min(32767,T),Ge=Math.min(258,Y);te<=me&&--K&&N!=V;){if(i[T+ie]==i[T+ie-te]){for(var Ae=0;Ae<Ge&&i[T+Ae]==i[T+Ae-te];++Ae);if(Ae>ie){if(ie=Ae,j=te,Ae>_e)break;for(var Be=Math.min(te,Ae-2),ee=0,X=0;X<Be;++X){var ne=T-te+X&32767,ge=v[ne],Ue=ne-ge&32767;Ue>ee&&(ee=Ue,V=ne)}}}N=V,V=v[N],te+=N-V&32767}if(j){_[I++]=268435456|jl[ie]<<18|pu[j];var de=jl[ie]&31,we=pu[j]&31;x+=xr[de]+vr[we],++M[257+de],++E[we],L=T+ie,++R}else _[I++]=i[T],++M[i[T]]}}for(T=Math.max(T,L);T<a;++T)_[I++]=i[T],++M[i[T]];h=gu(i,c,l,_,M,E,x,I,z,T-z,h),l||(r.r=h&7|c[h/8|0]<<3,h-=7,r.h=m,r.p=v,r.i=T,r.w=L)}else{for(var T=r.w||0;T<a+l;T+=65535){var at=T+65535;at>=a&&(c[h/8|0]=l,at=a),h=wu(c,h+1,i.subarray(T,at))}r.i=a}return An(o,0,n+_r(h)+s)},Cp=(function(){for(var i=new Int32Array(256),e=0;e<256;++e){for(var t=e,n=9;--n;)t=(t&1&&-306674912)^t>>>1;i[e]=t}return i})(),yr=function(){var i=-1;return{p:function(e){for(var t=i,n=0;n<e.length;++n)t=Cp[t&255^e[n]]^t>>>8;i=t},d:function(){return~i}}},ec=function(){var i=1,e=0;return{p:function(t){for(var n=i,s=e,r=t.length|0,a=0;a!=r;){for(var o=Math.min(a+2655,r);a<o;++a)s+=n+=t[a];n=(n&65535)+15*(n>>16),s=(s&65535)+15*(s>>16)}i=n,e=s},d:function(){return i%=65521,e%=65521,(i&255)<<24|(i&65280)<<8|(e&255)<<8|e>>8}}},ms=function(i,e,t,n,s){if(!s&&(s={l:1},e.dictionary)){var r=e.dictionary.subarray(-32768),a=new We(r.length+i.length);a.set(r),a.set(i,r.length),i=a,s.w=r.length}return Rp(i,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+e.mem,t,n,s)},Ia=function(i,e){var t={};for(var n in i)t[n]=i[n];for(var n in e)t[n]=e[n];return t},gp=function(i,e,t){for(var n=i(),s=i.toString(),r=s.slice(s.indexOf("[")+1,s.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<n.length;++a){var o=n[a],c=r[a];if(typeof o=="function"){e+=";"+c+"=";var l=o.toString();if(o.prototype)if(l.indexOf("[native code]")!=-1){var h=l.indexOf(" ",8)+1;e+=l.slice(h,l.indexOf("(",h))}else{e+=l;for(var u in o.prototype)e+=";"+c+".prototype."+u+"="+o.prototype[u].toString()}else e+=l}else t[c]=o}return e},Hl=[],X_=function(i){var e=[];for(var t in i)i[t].buffer&&e.push((i[t]=new i[t].constructor(i[t])).buffer);return e},Pp=function(i,e,t,n){if(!Hl[t]){for(var s="",r={},a=i.length-1,o=0;o<a;++o)s=gp(i[o],s,r);Hl[t]={c:gp(i[a],s,r),e:r}}var c=Ia({},Hl[t].e);return q_(Hl[t].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",t,c,X_(c),n)},Sr=function(){return[We,an,Ca,xr,vr,Ea,Mu,yp,Mp,Tp,Aa,Ep,En,Wl,Tn,$l,_r,An,De,Pa,Er,Ki,Tu]},Mr=function(){return[We,an,Ca,xr,vr,Ea,jl,pu,Sp,wi,wp,gr,Aa,Ap,qi,En,ai,pr,ql,Xl,mu,mr,wu,gu,_r,An,Rp,ms,Da,Ki]},Ip=function(){return[Eu,Ru,tt,yr,Cp]},Dp=function(){return[Au,Fp]},Lp=function(){return[Cu,tt,ec]},Np=function(){return[Pu]},Ki=function(i){return postMessage(i,[i.buffer])},Tu=function(i){return i&&{out:i.size&&new We(i.size),dictionary:i.dictionary}},wr=function(i,e,t,n,s,r){var a=Pp(t,n,s,function(o,c){a.terminate(),r(o,c)});return a.postMessage([i,e],e.consume?[i.buffer]:[]),function(){a.terminate()}},Cn=function(i){return i.ondata=function(e,t){return postMessage([e,t],[e.buffer])},function(e){e.data.length?(i.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):i.flush()}},Tr=function(i,e,t,n,s,r,a){var o,c=Pp(i,n,s,function(l,h){l?(c.terminate(),e.ondata.call(e,l)):Array.isArray(h)?h.length==1?(e.queuedSize-=h[0],e.ondrain&&e.ondrain(h[0])):(h[1]&&c.terminate(),e.ondata.call(e,l,h[0],h[1])):a(h)});c.postMessage(t),e.queuedSize=0,e.push=function(l,h){e.ondata||De(5),o&&e.ondata(De(4,0,1),null,!!h),e.queuedSize+=l.length,c.postMessage([l,o=h],[l.buffer])},e.terminate=function(){c.terminate()},r&&(e.flush=function(){c.postMessage([])})},rn=function(i,e){return i[e]|i[e+1]<<8},It=function(i,e){return(i[e]|i[e+1]<<8|i[e+2]<<16|i[e+3]<<24)>>>0},fu=function(i,e){return It(i,e)+It(i,e+4)*4294967296},tt=function(i,e,t){for(;t;++e)i[e]=t,t>>>=8},Eu=function(i,e){var t=e.filename;if(i[0]=31,i[1]=139,i[2]=8,i[8]=e.level<2?4:e.level==9?2:0,i[9]=3,e.mtime!=0&&tt(i,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),t){i[3]=8;for(var n=0;n<=t.length;++n)i[n+10]=t.charCodeAt(n)}},Au=function(i){(i[0]!=31||i[1]!=139||i[2]!=8)&&De(6,"invalid gzip data");var e=i[3],t=10;e&4&&(t+=(i[10]|i[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!i[t++]);return t+(e&2)},Fp=function(i){var e=i.length;return(i[e-4]|i[e-3]<<8|i[e-2]<<16|i[e-1]<<24)>>>0},Ru=function(i){return 10+(i.filename?i.filename.length+1:0)},Cu=function(i,e){var t=e.level,n=t==0?0:t<6?1:t==9?3:2;if(i[0]=120,i[1]=n<<6|(e.dictionary&&32),i[1]|=31-(i[0]<<8|i[1])%31,e.dictionary){var s=ec();s.p(e.dictionary),tt(i,2,s.d())}},Pu=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&De(6,"invalid zlib data"),(i[1]>>5&1)==+!e&&De(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};Rn=(function(){function i(e,t){if(typeof e=="function"&&(t=e,e={}),this.ondata=t,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new We(98304),this.o.dictionary){var n=this.o.dictionary.subarray(-32768);this.b.set(n,32768-n.length),this.s.i=32768-n.length}}return i.prototype.p=function(e,t){this.ondata(ms(e,this.o,0,0,this.s),t)},i.prototype.push=function(e,t){this.ondata||De(5),this.s.l&&De(4);var n=e.length+this.s.z;if(n>this.b.length){if(n>2*this.b.length-32768){var s=new We(n&-32768);s.set(this.b.subarray(0,this.s.z)),this.b=s}var r=this.b.length-this.s.z;this.b.set(e.subarray(0,r),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(r),32768),this.s.z=e.length-r+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=t&1,(this.s.z>this.s.w+8191||t)&&(this.p(this.b,t||!1),this.s.w=this.s.i,this.s.i-=2)},i.prototype.flush=function(){this.ondata||De(5),this.s.l&&De(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},i})(),Up=(function(){function i(e,t){Tr([Mr,function(){return[Cn,Rn]}],this,gs.call(this,e,t),function(n){var s=new Rn(n.data);onmessage=Cn(s)},6,1)}return i})();mn=(function(){function i(e,t){typeof e=="function"&&(t=e,e={}),this.ondata=t;var n=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:n?n.length:0},this.o=new We(32768),this.p=new We(0),n&&this.o.set(n)}return i.prototype.e=function(e){if(this.ondata||De(5),this.d&&De(4),!this.p.length)this.p=e;else if(e.length){var t=new We(this.p.length+e.length);t.set(this.p),t.set(e,this.p.length),this.p=t}},i.prototype.c=function(e){this.s.i=+(this.d=e||!1);var t=this.s.b,n=Pa(this.p,this.s,this.o);this.ondata(An(n,t,this.s.b),this.d),this.o=An(n,this.s.b-32768),this.s.b=this.o.length,this.p=An(this.p,this.s.p/8|0),this.s.p&=7},i.prototype.push=function(e,t){this.e(e),this.c(t)},i})(),Iu=(function(){function i(e,t){Tr([Sr,function(){return[Cn,mn]}],this,gs.call(this,e,t),function(n){var s=new mn(n.data);onmessage=Cn(s)},7,0)}return i})();bu=(function(){function i(e,t){this.c=yr(),this.l=0,this.v=1,Rn.call(this,e,t)}return i.prototype.push=function(e,t){this.c.p(e),this.l+=e.length,Rn.prototype.push.call(this,e,t)},i.prototype.p=function(e,t){var n=ms(e,this.o,this.v&&Ru(this.o),t&&8,this.s);this.v&&(Eu(n,this.o),this.v=0),t&&(tt(n,n.length-8,this.c.d()),tt(n,n.length-4,this.l)),this.ondata(n,t)},i.prototype.flush=function(){Rn.prototype.flush.call(this)},i})(),K_=(function(){function i(e,t){Tr([Mr,Ip,function(){return[Cn,Rn,bu]}],this,gs.call(this,e,t),function(n){var s=new bu(n.data);onmessage=Cn(s)},8,1)}return i})();Kl=(function(){function i(e,t){this.v=1,this.r=0,mn.call(this,e,t)}return i.prototype.push=function(e,t){if(mn.prototype.e.call(this,e),this.r+=e.length,this.v){var n=this.p.subarray(this.v-1),s=n.length>3?Au(n):4;if(s>n.length){if(!t)return}else this.v>1&&this.onmember&&this.onmember(this.r-n.length);this.p=n.subarray(s),this.v=0}mn.prototype.c.call(this,t),this.s.f&&!this.s.l&&!t&&(this.v=_r(this.s.p)+9,this.s={i:0},this.o=new We(0),this.push(new We(0),t))},i})(),kp=(function(){function i(e,t){var n=this;Tr([Sr,Dp,function(){return[Cn,mn,Kl]}],this,gs.call(this,e,t),function(s){var r=new Kl(s.data);r.onmember=function(a){return postMessage(a)},onmessage=Cn(r)},9,0,function(s){return n.onmember&&n.onmember(s)})}return i})();vu=(function(){function i(e,t){this.c=ec(),this.v=1,Rn.call(this,e,t)}return i.prototype.push=function(e,t){this.c.p(e),Rn.prototype.push.call(this,e,t)},i.prototype.p=function(e,t){var n=ms(e,this.o,this.v&&(this.o.dictionary?6:2),t&&4,this.s);this.v&&(Cu(n,this.o),this.v=0),t&&tt(n,n.length-4,this.c.d()),this.ondata(n,t)},i.prototype.flush=function(){Rn.prototype.flush.call(this)},i})(),J_=(function(){function i(e,t){Tr([Mr,Lp,function(){return[Cn,Rn,vu]}],this,gs.call(this,e,t),function(n){var s=new vu(n.data);onmessage=Cn(s)},10,1)}return i})();Jl=(function(){function i(e,t){mn.call(this,e,t),this.v=e&&e.dictionary?2:1}return i.prototype.push=function(e,t){if(mn.prototype.e.call(this,e),this.v){if(this.p.length<6&&!t)return;this.p=this.p.subarray(Pu(this.p,this.v-1)),this.v=0}t&&(this.p.length<4&&De(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),mn.prototype.c.call(this,t)},i})(),zp=(function(){function i(e,t){Tr([Sr,Np,function(){return[Cn,mn,Jl]}],this,gs.call(this,e,t),function(n){var s=new Jl(n.data);onmessage=Cn(s)},11,0)}return i})();yu=(function(){function i(e,t){this.o=gs.call(this,e,t)||{},this.G=Kl,this.I=mn,this.Z=Jl}return i.prototype.i=function(){var e=this;this.s.ondata=function(t,n){e.ondata(t,n)}},i.prototype.push=function(e,t){if(this.ondata||De(5),this.s)this.s.push(e,t);else{if(this.p&&this.p.length){var n=new We(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,t),this.p=null)}},i})(),Q_=(function(){function i(e,t){yu.call(this,e,t),this.queuedSize=0,this.G=kp,this.I=Iu,this.Z=zp}return i.prototype.i=function(){var e=this;this.s.ondata=function(t,n,s){e.ondata(t,n,s)},this.s.ondrain=function(t){e.queuedSize-=t,e.ondrain&&e.ondrain(t)}},i.prototype.push=function(e,t){this.queuedSize+=e.length,yu.prototype.push.call(this,e,t)},i})();Lu=function(i,e,t,n){for(var s in i){var r=i[s],a=e+s,o=n;Array.isArray(r)&&(o=Ia(n,r[1]),r=r[0]),r instanceof We?t[a]=[r,o]:(t[a+="/"]=[new We(0),o],Lu(r,a,t,n))}},bp=typeof TextEncoder<"u"&&new TextEncoder,Su=typeof TextDecoder<"u"&&new TextDecoder,Vp=0;try{Su.decode(qi,{stream:!0}),Vp=1}catch{}Hp=function(i){for(var e="",t=0;;){var n=i[t++],s=(n>127)+(n>223)+(n>239);if(t+s>i.length)return{s:e,r:An(i,t-1)};s?s==3?(n=((n&15)<<18|(i[t++]&63)<<12|(i[t++]&63)<<6|i[t++]&63)-65536,e+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?e+=String.fromCharCode((n&31)<<6|i[t++]&63):e+=String.fromCharCode((n&15)<<12|(i[t++]&63)<<6|i[t++]&63):e+=String.fromCharCode(n)}},ny=(function(){function i(e){this.ondata=e,Vp?this.t=new TextDecoder:this.p=qi}return i.prototype.push=function(e,t){if(this.ondata||De(5),t=!!t,this.t){this.ondata(this.t.decode(e,{stream:!0}),t),t&&(this.t.decode().length&&De(8),this.t=null);return}this.p||De(4);var n=new We(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length);var s=Hp(n),r=s.s,a=s.r;t?(a.length&&De(8),this.p=null):this.p=a,this.ondata(r,t)},i})(),iy=(function(){function i(e){this.ondata=e}return i.prototype.push=function(e,t){this.ondata||De(5),this.d&&De(4),this.ondata(Xi(e),this.d=t||!1)},i})();Wp=function(i){return i==1?3:i<6?2:i==9?1:0},$p=function(i,e){return e+30+rn(i,e+26)+rn(i,e+28)},qp=function(i,e,t){var n=rn(i,e+28),s=Nu(i.subarray(e+46,e+46+n),!(rn(i,e+8)&2048)),r=e+46+n,a=It(i,e+20),o=t&&a==4294967295?jp(i,r):[a,It(i,e+24),It(i,e+42)],c=o[0],l=o[1],h=o[2];return[rn(i,e+10),c,l,s,r+rn(i,e+30)+rn(i,e+32),h]},jp=function(i,e){for(;rn(i,e)!=1;e+=4+rn(i,e+2));return[fu(i,e+12),fu(i,e+4),fu(i,e+20)]},ji=function(i){var e=0;if(i)for(var t in i){var n=i[t].length;n>65535&&De(9),e+=n+4}return e},br=function(i,e,t,n,s,r,a,o){var c=n.length,l=t.extra,h=o&&o.length,u=ji(l);tt(i,e,a!=null?33639248:67324752),e+=4,a!=null&&(i[e++]=20,i[e++]=t.os),i[e]=20,e+=2,i[e++]=t.flag<<1|(r<0&&8),i[e++]=s&&8,i[e++]=t.compression&255,i[e++]=t.compression>>8;var d=new Date(t.mtime==null?Date.now():t.mtime),f=d.getFullYear()-1980;if((f<0||f>119)&&De(10),tt(i,e,f<<25|d.getMonth()+1<<21|d.getDate()<<16|d.getHours()<<11|d.getMinutes()<<5|d.getSeconds()>>1),e+=4,r!=-1&&(tt(i,e,t.crc),tt(i,e+4,r<0?-r-2:r),tt(i,e+8,t.size)),tt(i,e+12,c),tt(i,e+14,u),e+=16,a!=null&&(tt(i,e,h),tt(i,e+6,t.attrs),tt(i,e+10,a),e+=14),i.set(n,e),e+=c,u)for(var b in l){var v=l[b],m=v.length;tt(i,e,+b),tt(i,e+2,m),i.set(v,e+4),e+=4+m}return h&&(i.set(o,e),e+=h),e},Fu=function(i,e,t,n,s){tt(i,e,101010256),tt(i,e+8,t),tt(i,e+10,t),tt(i,e+12,n),tt(i,e+16,s)},Ra=(function(){function i(e){this.filename=e,this.c=yr(),this.size=0,this.compression=0}return i.prototype.process=function(e,t){this.ondata(null,e,t)},i.prototype.push=function(e,t){this.ondata||De(5),this.c.p(e),this.size+=e.length,t&&(this.crc=this.c.d()),this.process(e,t||!1)},i})(),sy=(function(){function i(e,t){var n=this;t||(t={}),Ra.call(this,e),this.d=new Rn(t,function(s,r){n.ondata(null,s,r)}),this.compression=8,this.flag=Wp(t.level)}return i.prototype.process=function(e,t){try{this.d.push(e,t)}catch(n){this.ondata(n,null,t)}},i.prototype.push=function(e,t){Ra.prototype.push.call(this,e,t)},i})(),ry=(function(){function i(e,t){var n=this;t||(t={}),Ra.call(this,e),this.d=new Up(t,function(s,r,a){n.ondata(s,r,a)}),this.compression=8,this.flag=Wp(t.level),this.terminate=this.d.terminate}return i.prototype.process=function(e,t){this.d.push(e,t)},i.prototype.push=function(e,t){Ra.prototype.push.call(this,e,t)},i})(),ay=(function(){function i(e){this.ondata=e,this.u=[],this.d=1}return i.prototype.add=function(e){var t=this;if(this.ondata||De(5),this.d&2)this.ondata(De(4+(this.d&1)*8,0,1),null,!1);else{var n=Xi(e.filename),s=n.length,r=e.comment,a=r&&Xi(r),o=s!=e.filename.length||a&&r.length!=a.length,c=s+ji(e.extra)+30;s>65535&&this.ondata(De(11,0,1),null,!1);var l=new We(c);br(l,0,e,n,o,-1);var h=[l],u=function(){for(var m=0,p=h;m<p.length;m++){var S=p[m];t.ondata(null,S,!1)}h=[]},d=this.d;this.d=0;var f=this.u.length,b=Ia(e,{f:n,u:o,o:a,t:function(){e.terminate&&e.terminate()},r:function(){if(u(),d){var m=t.u[f+1];m?m.r():t.d=1}d=1}}),v=0;e.ondata=function(m,p,S){if(m)t.ondata(m,p,S),t.terminate();else if(v+=p.length,h.push(p),S){var A=new We(16);tt(A,0,134695760),tt(A,4,e.crc),tt(A,8,v),tt(A,12,e.size),h.push(A),b.c=v,b.b=c+v+16,b.crc=e.crc,b.size=e.size,d&&b.r(),d=1}else d&&u()},this.u.push(b)}},i.prototype.end=function(){var e=this;if(this.d&2){this.ondata(De(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},i.prototype.e=function(){for(var e=0,t=0,n=0,s=0,r=this.u;s<r.length;s++){var a=r[s];n+=46+a.f.length+ji(a.extra)+(a.o?a.o.length:0)}for(var o=new We(n+22),c=0,l=this.u;c<l.length;c++){var a=l[c];br(o,e,a,a.f,a.u,-a.c-2,t,a.o),e+=46+a.f.length+ji(a.extra)+(a.o?a.o.length:0),t+=a.b}Fu(o,e,this.u.length,n,t),this.ondata(null,o,!0),this.d=2},i.prototype.terminate=function(){for(var e=0,t=this.u;e<t.length;e++){var n=t[e];n.t()}this.d=2},i})();Xp=(function(){function i(){}return i.prototype.push=function(e,t){this.ondata(null,e,t)},i.compression=0,i})(),cy=(function(){function i(){var e=this;this.i=new mn(function(t,n){e.ondata(null,t,n)})}return i.prototype.push=function(e,t){try{this.i.push(e,t)}catch(n){this.ondata(n,null,t)}},i.compression=8,i})(),hy=(function(){function i(e,t){var n=this;t<32e4?this.i=new mn(function(s,r){n.ondata(null,s,r)}):(this.i=new Iu(function(s,r,a){n.ondata(s,r,a)}),this.terminate=this.i.terminate)}return i.prototype.push=function(e,t){this.i.terminate&&(e=An(e,0)),this.i.push(e,t)},i.compression=8,i})(),uy=(function(){function i(e){this.onfile=e,this.k=[],this.o={0:Xp},this.p=qi}return i.prototype.push=function(e,t){var n=this;if(this.onfile||De(5),this.p||De(4),this.c>0){var s=Math.min(this.c,e.length),r=e.subarray(0,s);if(this.c-=s,this.d?this.d.push(r,!this.c):this.k[0].push(r),e=e.subarray(s),e.length)return this.push(e,t)}else{var a=0,o=0,c=void 0,l=void 0;this.p.length?e.length?(l=new We(this.p.length+e.length),l.set(this.p),l.set(e,this.p.length)):l=this.p:l=e;for(var h=l.length,u=this.c,d=u&&this.d,f=function(){var p,S=It(l,o);if(S==67324752){a=1,c=o,b.d=null,b.c=0;var A=rn(l,o+6),_=rn(l,o+8),M=A&2048,E=A&8,R=rn(l,o+26),x=rn(l,o+28);if(h>o+30+R+x){var T=[];b.k.unshift(T),a=2;var I=It(l,o+18),L=It(l,o+22),z=Nu(l.subarray(o+30,o+=30+R),!M);I==4294967295?(p=E?[-2]:jp(l,o),I=p[0],L=p[1]):E&&(I=-1),o+=x,b.c=I;var G,N={name:z,compression:_,start:function(){if(N.ondata||De(5),!I)N.ondata(null,qi,!0);else{var V=n.o[_];V||N.ondata(De(14,"unknown compression type "+_,1),null,!1),G=I<0?new V(z):new V(z,I,L),G.ondata=function(j,K,te){N.ondata(j,K,te)};for(var Y=0,X=T;Y<X.length;Y++){var ie=X[Y];G.push(ie,!1)}n.k[0]==T&&n.c?n.d=G:G.push(qi,!0)}},terminate:function(){G&&G.terminate&&G.terminate()}};I>=0&&(N.size=I,N.originalSize=L),b.onfile(N)}return"break"}else if(u){if(S==134695760)return c=o+=12+(u==-2&&8),a=3,b.c=0,"break";if(S==33639248)return c=o-=4,a=3,b.c=0,"break"}},b=this;o<h-4;++o){var v=f();if(v==="break")break}if(this.p=qi,u<0){var m=a?l.subarray(0,c-12-(u==-2&&8)-(It(l,c-16)==134695760&&4)):l.subarray(0,o);d?d.push(m,!!a):this.k[+(a==2)].push(m)}if(a&2)return this.push(l.subarray(o),t);this.p=l.subarray(o)}t&&(this.c&&De(13),this.p=null)},i.prototype.register=function(e){this.o[e.compression]=e},i})(),Ql=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(i){i()}});var ys=["steel","floors","roof","connections","layers","walls","bearing","partitions","concrete"],ju={steel:["beams"],floors:["joists","trimmers"],roof:["rafters","trimmers","fascia"],connections:["connections","details"],layers:["layers"],walls:["masonry","lintels","framing-review"],bearing:["studs"],partitions:["partitions"],concrete:["rc"]},qu=i=>i.structuralSystem==="garden-terrace"||["rafters","fascia"].includes(i.category)||/^M-(RE\d|RIDGE-|ROOF-B)/.test(i.id);function Fa(i,e){if(i.masonryDetail)return["walls","all"].includes(e);if(i.retained){if(["walls","openings"].includes(i.category))return e==="walls"||e==="all";if(i.category==="floors")return["floors","layers","all"].includes(e);if(i.category==="roof")return e==="roof"||e==="all"}return e==="all"?ys.some(t=>Fa(i,t)):e==="floors"?["joists","connections","details"].includes(i.category)||i.category==="trimmers"&&!qu(i):e==="roof"?qu(i):(ju[e]??[]).includes(i.category)}function Xu(i,e){return e==="all"?ys.every(t=>i.includes(t))?[]:[...ys]:i.includes(e)?i.filter(t=>t!==e):[...i,e]}function Ku(i){let e=new Set(i.flatMap(t=>ju[t]??[]));if(i.includes("floors"))for(let t of["connections","details"])e.add(t);return i.includes("roof")&&e.add("beams"),i.includes("walls")&&e.add("details"),[...e]}var Dn={beams:{label:"Steel & ridge beams",color:"#83b9d5"},joists:{label:"Floor joists",color:"#dcb781"},rafters:{label:"Roof rafters / joists",color:"#e4ce9f"},trimmers:{label:"Headers & trimmers",color:"#d99865"},studs:{label:"Load-bearing timber \xB7 proposed",color:"#c8b085"},partitions:{label:"Non-load-bearing partitions",color:"#83bca1"},"framing-review":{label:"Framing \xB7 role unresolved",color:"#e4a7c4"},fascia:{label:"Eaves / fascia backing",color:"#afc3c8"},details:{label:"Connection, blocking & cavity details",color:"#a49b7e"},layers:{label:"Floor build-up allowances",color:"#d1dbe2"},connections:{label:"Hanger reservations",color:"#c5d8e3"},lintels:{label:"Lintel reservations",color:"#b8a0d6"},masonry:{label:"Brick & block leaves",color:"#c78366"},rc:{label:"Concrete envelopes",color:"#adb7be"},concrete:{label:"Basement & foundations",color:"#c595e7"},walls:{label:"Wall envelopes",color:"#81d6e0"},openings:{label:"Opening envelopes",color:"#ffc879"},floors:{label:"Floor zones",color:"#84b8fa"},roof:{label:"Roof zones",color:"#a3dba0"},steel:{label:"Support studies",color:"#ff9388"}},Ci=["beams","joists","rafters","trimmers","studs","partitions","framing-review","fascia","connections","details","layers","lintels","masonry","rc"],D=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ua=i=>i.bounds[0].map((e,t)=>(e+i.bounds[1][t])/2);function Zt(i,e){let t=["beam-block","solid-rc"].includes(e)?e:null,n=i.garageBeamBlock?.defaultOption??i.garageDeckDefault;return t??(["beam-block","solid-rc"].includes(n)?n:"solid-rc")}function oc(i){let e=i.garageBeamBlock;if(!e||i.garageDeckInstalled)return i.elements;let t=new Set(e.replacesIds);return[...i.elements.map(n=>t.has(n.id)?{...n,garageDeckOption:"solid-rc"}:n),...e.elements]}function Rr(i,{categories:e=Object.keys(Dn),region:t="house",retained:n=!0,level:s="all",trialOverlay:r=!1,representation:a="all",garageRebuild:o=!0,loftUpgrade:c=!0,roofOption:l="replace",focusSystem:h=null,scope:u="all",isolatedIds:d=null,systemFilters:f=null,garageDeck:b=Zt(i)}={}){return oc(i).filter(v=>(!v.garageDeckOption||v.garageDeckOption===b)&&(!d||d.includes(v.id))&&(!f||f.some(m=>Fa(v,m)))&&(!v.trial||r)&&(a==="all"||a==="envelopes"&&!v.member||a==="members"&&(v.member||v.retained||v.trial))&&(e.includes(v.category)||v.masonryDetail&&e.includes("masonry")||a==="members"&&n&&v.retained&&(!f||f.some(m=>Fa(v,m))))&&(v.condition!=="loft-upgrade"||c)&&(v.condition!=="roof-rebuild"||l==="replace")&&(!v.roofContext||l!=="replace")&&(!h||h!=="roof"||v.retained||v.structuralSystem==="garden-terrace"||["rafters","roof"].includes(v.category)||/^M-(RE\d|RIDGE-|ROOF-B)/.test(v.id))&&(!h||h!=="floors"||v.retained||v.structuralSystem!=="garden-terrace"&&(["joists","connections","details","layers"].includes(v.category)||v.category==="trimmers"&&!/^M-RE\d/.test(v.id)||v.category==="beams"&&!/^M-(RIDGE-|ROOF-B)/.test(v.id)))&&(v.scope!=="garage-rebuild"||o)&&(!v.garageContext||!o)&&(u==="all"||v.scope===u||v.retained)&&(t==="all"||v.region===t)&&(n||!v.retained)&&Em(v,s))}function Em(i,e){if(e==="all"||i.level===Number(e))return!0;if(!i.masonryDetail&&!["walls","openings","masonry","studs","partitions","framing-review"].includes(i.category))return!1;let n={"-1":[-2.8,0],0:[0,2.8],1:[2.8,5.55],3:[5.55,20]}[String(e)];return!!n&&i.bounds[0][2]<n[1]-.001&&i.bounds[1][2]>n[0]+.001}function Yu(i,e,t){let n=[],s=[0,1,2].filter(a=>a!==e),r=new Set;for(let a=0;a<i.length;a+=3){let o=i.slice(a,a+3),c=[];for(let h=0;h<3;h++){let u=o[h],d=o[(h+1)%3],f=u[e]-t,b=d[e]-t;if(Math.abs(f)<1e-6&&c.push(s.map(v=>u[v])),f<0&&b>0||f>0&&b<0){let v=f/(f-b);c.push(s.map(m=>u[m]+v*(d[m]-u[m])))}}let l=[...new Map(c.map(h=>[h.map(u=>u.toFixed(5)).join(","),h])).values()];if(l.length===2&&Math.hypot(l[0][0]-l[1][0],l[0][1]-l[1][1])>1e-5){let h=l.map(u=>u.map(d=>d.toFixed(4)).join(",")).sort().join("|");r.has(h)||(r.add(h),n.push(l))}}return n}function Am(i,{view:e="plan",level:t=0,sectionAt:n=9.455,focusSystem:s=null}={}){let r={[-1]:-2.8,0:0,1:2.8,3:5.55}[t]??0;if(e==="section")return i.triangles?Yu(i.triangles,0,n):[];if(e==="plan")return i.foundationSubstructure&&[-1,0].includes(Number(t))?i.planEdges??[]:i.line?i.level===Number(t)?[i.line.map(c=>c.slice(0,2))]:[]:i.member&&(i.category==="rafters"||i.category==="fascia"||/^M-RE\d/.test(i.id))&&(s==="roof"||i.level===Number(t))||s==="roof"&&i.category==="roof"?(i.edges??[]).map(c=>c.map(l=>l.slice(0,2))):i.member&&["beams","joists","rafters","trimmers","studs","partitions","framing-review","fascia","connections","details","layers","lintels","rc"].includes(i.category)&&i.level===Number(t)?i.planEdges??[]:["floors","openings"].includes(i.category)&&i.level===Number(t)?i.planEdges??[]:i.category==="concrete"&&Number(t)===-1&&i.bounds[1][2]<=-2.79?i.planEdges??[]:Yu(i.triangles??[],2,r+1.2);let a=e==="front"||e==="rear"?0:1,o=e==="rear"||e==="east"?-1:1;return(i.line?[i.line]:i.edges??[]).map(c=>c.map(l=>[o*l[a],l[2]]))}function Oa(i,e={}){e={roofOption:"replace",loftUpgrade:!0,...e};let{view:t="plan",level:n=0,region:s="house",selected:r=null,width:a=1100,height:o=760,light:c=!1}=e,l=Rr(i,{...e,level:t==="plan"||t==="section"?"all":e.level??"all"}),h=l.map(x=>({e:x,segments:Am(x,{...e,view:t,level:n})})).filter(x=>x.segments.length),u=h.flatMap(x=>x.segments.flat()),d=s==="workshop"?[-25,20.8,-17,26.5]:[-6,-17,15,14],f=u.length?u.reduce((x,T)=>[Math.min(x[0],T[0]),Math.min(x[1],T[1]),Math.max(x[2],T[0]),Math.max(x[3],T[1])],[1/0,1/0,-1/0,-1/0]):d,b=46,v=Math.min((a-b*2)/Math.max(1,f[2]-f[0]),(o-b*2)/Math.max(1,f[3]-f[1])),m=(a-(f[2]-f[0])*v)/2,p=(o-(f[3]-f[1])*v)/2,S=x=>[m+(x[0]-f[0])*v,o-p-(x[1]-f[1])*v],A=c?"#ffffff":"#0c2138",_=c?"#163a57":"#bdd9ee",M=[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${a} ${o}" width="${a}" height="${o}" role="img" aria-label="Structural coordination ${D(t)}"><rect width="${a}" height="${o}" fill="${A}"/>`];if(!c){for(let x=0;x<a;x+=24)M.push(`<path d="M${x} 0V${o}" stroke="#19314a" stroke-width=".5"/>`);for(let x=0;x<o;x+=24)M.push(`<path d="M0 ${x}H${a}" stroke="#19314a" stroke-width=".5"/>`)}for(let{e:x,segments:T}of h){let I=r===x.id?c?"#ba3030":"#ffffff":x.retained?c?"#6d7c87":"#738da4":c?{concrete:"#80549c",walls:"#167782",openings:"#a76a1c",floors:"#426f9f",roof:"#497747",steel:"#bc584a"}[x.category]??"#40596a":Dn[x.category].color,L=T.map(z=>{let G=S(z[0]),N=S(z[1]);return`M${G[0].toFixed(2)} ${G[1].toFixed(2)}L${N[0].toFixed(2)} ${N[1].toFixed(2)}`}).join("");M.push(`<g data-element="${D(x.id)}" tabindex="0" role="button" aria-label="${D(x.id+" "+x.name)}"><title>${D(x.id+" | "+x.name+" | "+x.status)}</title><path d="${L}" fill="none" stroke="${I}" stroke-width="${r===x.id?2.5:1.1}" ${x.line?'stroke-dasharray="6 4"':""}/><path d="${L}" fill="none" stroke="transparent" stroke-width="8"/></g>`)}if(t==="plan"&&e.focusSystem!=="roof"&&h.length)for(let x of i.rooms??[]){if(x.floor!==Number(n)||!x.labelPoint)continue;let T=x.labelPoint;if(s==="house"&&(T[0]<-6||T[1]>15)||s==="workshop"&&(T[0]>-15||T[1]<18))continue;let[I,L]=S(T);if(I<30||I>a-30||L<30||L>o-50)continue;let z=x.name.replace(/^New |^Original |^Proposal /,"").slice(0,28);M.push(`<text x="${I.toFixed(2)}" y="${L.toFixed(2)}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="9" fill="${_}" opacity=".65" pointer-events="none">${D(z)}</text>`)}if(r){let x=l.find(T=>T.id===r);h.some(T=>T.e.id===r)&&M.push(`<text x="24" y="28" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="${_}">${D(x.id+" \xB7 "+x.name)}</text>`)}if(t!=="plan"&&t!=="section")for(let x of i.floorLevels){let T=S([f[0],x.z])[1];M.push(`<path d="M24 ${T.toFixed(2)}H${a-24}" stroke="${_}" opacity=".3" stroke-dasharray="4 4"/><text x="24" y="${(T-5).toFixed(2)}" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="${_}">${D(x.label)} ${x.z.toFixed(2)} m</text>`)}let E=28,R=o-22;return M.push(`<path d="M${E} ${R-5}v10m0 -5h${(5*v).toFixed(2)}m0 -5v10" stroke="${_}" fill="none"/><text x="${E}" y="${R-10}" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="${_}">5 m \xB7 model geometry</text>`),M.push(`<text x="${a-24}" y="${o-14}" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="${_}">${e.representation==="members"?"M16 \xB7 ROOF "+(e.roofOption==="replace"?"B \u2014 REBUILD":"A \u2014 RETAIN"):"P01"} - COORDINATION ONLY - NOT FOR CONSTRUCTION</text>`),M.push("</svg>"),{svg:M.join(""),count:h.length,ids:h.map(x=>x.e.id),scale:v}}function Ju(i){let e=i.garageBeamBlock;if(!(!e||i.garageDeckInstalled)){for(let t of i.elements)e.replacesIds.includes(t.id)&&(t.garageDeckOption="solid-rc");i.elements.push(...e.elements),Object.assign(i.rates,e.rates),i.issues.push({id:"BB01",severity:"unresolved",title:"Selected beam-and-block garage: detailed design pending",detail:e.decision+" "+e.supplierReference.limitation,elementIds:["M-BB01-TOPPING","M-BB01-EDGE-RC","M-BB01-BEAM-W-08"]}),i.garageDeckInstalled=!0}}function ka(i,e){return Zt(i,e)==="beam-block"&&i.garageBeamBlock?{...i,foundations:i.garageBeamBlock.foundations}:i}var pt=(i,e=2)=>Number(i).toFixed(e);function Rm(i){let e=i.vehicleBrief;if(!e)return"";let t=e.assumptions;return`<section class="garage-vehicle-brief"><h3>Agreed vehicles \xB7 VB01</h3><p><strong>${e.vehicles.map(s=>`${pt(s.maximumGrossMassKg/1e3,1)} t ${D(s.id==="van"?"laden van":s.name.replace(" allowance",""))}`).join(" + ")}, parked together.</strong> Combined static weight ${pt(e.combinedStaticWeightKN,1)} kN. These are maximum gross allowances, not kerb weights or identified vehicle models.</p><p>Provisional Category G study: ${pt(e.provisionalVehicleUDLKPa,1)} kPa vehicle UDL, separate ${e.localPointSensitivitiesKN.join(" / ")} kN point/jack sensitivities, plus paired-wheel cases. Exact UK local actions and full parking/load patterns require designer confirmation.</p><p>Axle assumption: ${pt(t.maximumAxleFraction*100,0)}% of vehicle weight; wheel split ${pt(t.heavierWheelFractionOfAxle*100,0)}:${pt((1-t.heavierWheelFractionOfAxle)*100,0)}; study movement factor \xD7${pt(t.movementSensitivityFactor,2)}. Neither equal sharing across beams nor these assumed vehicle distributions is verified. Vehicles are not credited against groundwater uplift.</p><p><a href="${D(i.enquiryUrl??"garage-deck-enquiry.pdf")}" target="_blank" rel="noopener">Open supplier enquiry pack \u2197</a></p></section>`}function Ss(i,{detail:e=!1,garageDeck:t=Zt(i)}={}){let n=i.garageBeamBlock;if(!n)return"";let s=n.quantities,r=n.supplierReference,a=[["Site concrete",pt(s.baselineConcreteM3)+" m\xB3",pt(s.siteConcreteM3)+" m\xB3 + "+pt(s.groutM3)+" m\xB3 grout"],["Deck self-weight",pt(s.baselineWeightKN,1)+" kN",pt(s.alternativeWeightKN,1)+" kN"],["Structural depth","250 mm","150 mm beams + 100 mm nominal topping"],["Floor / basement ceiling","Existing datums","Unchanged"],["Components","Poured slab",s.beamCount+" beams \xB7 "+s.blockCount+" infill pieces"]],o="";if(e){let c=n.demandCases.filter(l=>l.action==="distributed"||l.stationFraction===.5);o=`<details><summary>Vehicle-load sensitivity \u2014 not supplier verification</summary><p>UDL and isolated wheel/jack cases are separate. Local loads of ${n.vehicleBrief?.localPointSensitivitiesKN.join(" / ")??"10 / 15 / 20"} kN are compared with hypothetical sharing across 1\u20135 beams. Equal sharing is NOT established by the model. Demand uses 1.35 G + 1.50 Q; no composite beam capacity or deflection result is assumed.</p><div class="table-scroll"><table><thead><tr><th>Case / bay</th><th>Action / sharing assumption</th><th>ULS moment</th><th>ULS end reactions</th></tr></thead><tbody>${c.map(l=>`<tr><td>${D(l.scenario)} / ${D(l.bay)}</td><td>${l.action==="distributed"?pt(l.vehicleUDLKPa,1)+" kPa":pt(l.localLoadKN,0)+" kN \xF7 "+l.assumedSharingBeams+" beam(s)"}</td><td>${pt(l.uls.momentKNm)} kNm</td><td>${l.uls.reactionsKN.map(h=>pt(h)).join(" / ")} kN</td></tr>`).join("")}</tbody></table></div><p>The linked data also checks local loads at 5%, 25%, 75% and 95% of the span. Legacy reference: ${pt(r.serviceMomentKNm)} kNm service moment, ${pt(r.ultimateMomentKNm)} kNm ultimate moment, ${pt(r.ultimateShearKN)} kN shear. ${D(r.limitation)}</p></details>`,n.pairedAxleCases&&(o+=`<details><summary>Paired-wheel demand \xB7 van and Tesla</summary><p>Upper permanent-load case. Two wheel forces move together at assumed tracks of 1.6 / 1.8 / 2.0 m; both 60:40 orientations and eleven stations are sampled. Reactions below are separate end envelopes, not a simultaneous pair. This is a local axle study, not a verified whole-deck parking analysis.</p><div class="table-scroll"><table><thead><tr><th>Vehicle / bay</th><th>Assumed beams sharing</th><th>Max ULS moment</th><th>Left / right reaction envelopes</th></tr></thead><tbody>${n.pairedAxleCases.map(l=>`<tr><td>${D(l.vehicleName)} / ${D(l.bay)}</td><td>${l.assumedSharingBeams}</td><td>${pt(l.worstUlsMoment.uls.momentKNm)} kNm</td><td>${pt(l.worstLeftReaction.uls.reactionsKN[0])} / ${pt(l.worstRightReaction.uls.reactionsKN[1])} kN</td></tr>`).join("")}</tbody></table></div></details>`)}return`<article class="trial-card"><h2>Garage floor over basement \xB7 selected system</h2><p><strong>${t==="beam-block"?"Viewing the selected beam-and-block proposal":"Viewing the solid RC alternative"}.</strong> ${D(n.decision)}</p>${Rm(n)}<div class="table-scroll"><table><thead><tr><th>Item</th><th>Solid RC alternative</th><th>Beam-and-block proposal</th></tr></thead><tbody>${a.map(c=>`<tr>${c.map(l=>`<td>${D(l)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p>${pt(s.siteConcreteReductionPercent,0)}% less site concrete, with precast concrete and blocks added separately. This is not the same percentage saving in weight or installed cost. ${s.cutBlockCount} infill pieces need cuts; supplier layout and waste allowance remain outstanding.</p><p><strong>Bearing route:</strong> two ${n.clearSpansM.map(c=>pt(c,3)).join(" / ")} m clear bays, onto the perimeter concrete and existing cinema bearing wall/opening heads. The solid north strip retains the bearing wall and stair/girder junction. No upper masonry load is assigned to the infill.</p><p><strong>Build-up:</strong> 100 mm nominal topping reserves 25 mm for camber/tolerance above a 75 mm minimum comparison allowance. Manufacturer camber, reinforcement, fire/thermal layers and complete wheel-load design are unverified.</p><p><button class="outline" data-garage-deck-view="framing">Inspect beams, blocks and bearings</button> <button class="outline" data-garage-deck-view="complete">Show topping</button> <button class="text-button" data-garage-deck-option="solid-rc">Compare solid RC</button></p>${o}${n.deeperBeamComparison?`<details><summary>Deeper-beam alternative considered</summary><p>${D(n.deeperBeamComparison.section)}. A 225 mm beam + 100 mm topping + 22 mm finish totals 347 mm, extending 22 mm below the current structural/finish envelope while leaving about 85 mm above the ceiling board. ${D(n.deeperBeamComparison.basis)}</p></details>`:""}<details><summary>Construction sequence and outstanding design</summary><ol>${n.installation.map(c=>`<li>${D(c)}</li>`).join("")}</ol><ul>${n.openDesign.map(c=>`<li>${D(c)}</li>`).join("")}</ul></details><p><a href="${D(r.url)}" target="_blank" rel="noopener">Supplier reference \xB7 legacy guide, pages 10 and 12 \u2197</a></p></article>`}function Zu(i,e,t={}){return i.deckRole?`<h2>Beam-and-block proposal</h2>${i.profileBasis?`<p>${D(i.profileBasis)}</p>`:""}${i.nominalBearingsMm?`<p>Nominal end bearings ${i.nominalBearingsMm.join(" / ")} mm. Clear span ${pt(i.nominalClearSpanM,3)} m; ${pt(i.engineeringSpanM,3)} m between bearing centres. Geometric seat only; capacity and erection tolerance require design.</p>`:""}${i.flangeSeatMm?`<p>Modelled block overlap on each flange: ${pt(i.flangeSeatMm,1)} mm. Verify block strength, flange profile, seating and tolerances with the supplier.</p>`:""}${i.reinforcementStatus?`<p>${D(i.reinforcementStatus)}</p>`:""}${i.loadPathNote?`<p>${D(i.loadPathNote)}</p>`:""}${(i.supportMemberIds??[]).map(n=>`<button class="text-button" data-focus-member="${D(n)}">Support ${D(n)} \u2197</button>`).join("")}${Ss(e,{...t,detail:!0})}`:e.garageBeamBlock?.replacesIds.includes(i.id)?Ss(e,{...t,detail:!0}):""}var _t=(i,e=1)=>Number(i).toFixed(e);function Qu(i){let e=i.foundations;if(!e)return"<p>Foundation study unavailable.</p>";let t=(n,s)=>`<div><small>${n}</small><strong>${s}</strong></div>`;return`<div class="trial-head"><div><p class="eyebrow">${D(e.revision)} \xB7 ASSUMED BASELINE</p><h1>Foundations, without confusing depth and thickness.</h1><p>${D(e.datum)}. The 3D model shows the reference case. Lower and upper cases below change the calculation assumptions; they do not replace the displayed geometry.</p></div></div>
 <div class="trial-note"><strong>Experimental, not for construction.</strong> ${D(e.boundsMeaning)} No ground report or verified building reactions are available.</div>
 <div class="trial-metrics">${t("Garage / garden strip","600 \xD7 300 mm")}${t("Underside below assumed ground","1,000 mm")}${t("Masonry above footing","850 mm high")}</div>
 ${e.garageDeckNote?`<p class="trial-note">${D(e.garageDeckNote)}</p>`:""}<article class="trial-card"><h2>The reference arrangement</h2><p>Concrete strips sit below foundation-grade masonry. The masonry is a solid allowance, with its product, bond, moisture details and post bearing pads unresolved. The house-side post has an 800 mm pad envelope; the perimeter terrace posts still need local load-spreading checks.</p><p><strong>Garden floor:</strong> 150 mm ground-bearing slab, separate from the wall/post foundations; 125 / 150 / 200 mm thickness sensitivity. A 150 mm finish/build-up zone and 150 mm sub-base remain visible layers.</p><p><strong>Basement:</strong> ${_t(e.raftAreaM2,2)} m\xB2 continuous 300 mm raft allowance, with 50 mm blinding and 150 mm formation/sub-base layers. The comparison thicknesses are 250 / 300 / 400 mm, not calculated thickness bounds. No separate strips are added under the raft. Local stiffening and reinforcement remain to be designed; the current 352.5 mm retaining-wall envelope remains a coordination allowance.</p><div class="issue-refs">${[["M-GF-1","Garage strip"],["M-GS-1","Foundation masonry"],["M-GARDEN-SLAB","Garden slab"],["M-RC-EEBF948","Basement raft"]].map(([n,s])=>`<button data-focus-member="${n}">${s}</button>`).join("")}</div></article>
 <article class="trial-card"><h2>Gross bearing pressure \xB7 limited screening only</h2><p>${D(e.calculationBasis)}</p><div class="table-scroll"><table><thead><tr><th>Assumption / result</th>${e.cases.map(n=>`<th>${D(n.label)}</th>`).join("")}</tr></thead><tbody>${[["Assumed allowable bearing",n=>`${_t(n.grossAllowableBearingKPa,0)} kPa`],["Assumed founding depth below ground",n=>`${_t(n.depthBelowGroundM,2)} m`],["Garage superstructure budget",n=>`${_t(n.garageSuperstructureKNm)} kN/m`],["Garage: gross pressure on 600 mm strip",n=>`${_t(n.garagePressureKPa)} kPa \xB7 ${n.garageWithinPressureScreen?"within assumed bearing":"EXCEEDS assumed bearing"}`],["Indicative garage width from this pressure arithmetic",n=>`${_t(n.garageRequiredWidthScreenM,3)} m (not a selected width)`],["Garden superstructure budget",n=>`${_t(n.gardenSuperstructureKNm)} kN/m`],["Garden: gross strip pressure",n=>`${_t(n.gardenPressureKPa)} kPa \xB7 ${n.gardenWithinPressureScreen?"within assumed bearing":"EXCEEDS assumed bearing"}`],["House-side post budget / pad pressure",n=>`${_t(n.gardenPostKN)} kN / ${_t(n.housePostPadPressureKPa)} kPa \xB7 ${n.housePostPadWithinScreen?"within assumed bearing":"EXCEEDS assumed bearing"}`],["Basement gross average pressure",n=>`${_t(n.basementGrossPressureKPa)} kPa (local peaks unchecked)`]].map(([n,s])=>`<tr><th>${n}</th>${e.cases.map(r=>`<td>${s(r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p>${D(e.loadBasis)}</p></article>
 <article class="trial-card"><h2>Basement uplift \xB7 construction stage matters</h2><p>Water acts at raft underside ${_t(e.raftBaseZ,2)} m. Only the modelled raft and six retaining walls are counted in the empty-box dead weight. The illustrative completed comparison adds ${_t(e.basement.additionalPermanentLoadKN,0)} kN of permanent load, which is not a surveyed or verified contribution. Positive balance is not a factored stability pass; negative balance exposes a shortfall.</p><div class="table-scroll"><table><thead><tr><th>Unfactored comparison</th>${e.cases.map(n=>`<th>${D(n.id)}</th>`).join("")}</tr></thead><tbody>${[["Groundwater level Z",n=>`${_t(n.waterLevelZ,2)} m`],["Head at raft underside",n=>`${_t(n.waterHeadAtRaftM,2)} m`],["Upward water force",n=>`${_t(n.upliftKN)} kN`],["Empty-box dead weight",n=>`${_t(n.emptyBoxDeadWeightKN)} kN`],["Empty-box balance",n=>`${_t(n.emptyBoxBalanceKN)} kN`],["Illustrative completed balance",n=>`${_t(n.completedIllustrativeBalanceKN)} kN`]].map(([n,s])=>`<tr><th>${n}</th>${e.cases.map(r=>`<td>${s(r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="trial-note">The wetter case has an uplift shortfall in these weight comparisons. No pump reliability, wall friction or unverified house weight is assumed to solve it. A staged, factored design is required before excavation.</p></article>
 <article class="trial-card"><h2>Still to design</h2><ul>${e.checksNotCompleted.map(n=>`<li>${D(n)}</li>`).join("")}</ul></article><div class="trial-sources">${e.sources.map(n=>`<a href="${D(n.url)}" target="_blank" rel="noopener">${D(n.title)} \u2197</a>`).join("")}</div>`}function ed(i,e){if(!i.foundationCase||!e.foundations)return"";let t=e.foundations,n=t.cases.find(r=>r.id==="reference"),s=i.foundationCase;return`<h2>F01 reference assumptions</h2><p>Assumed ground Z ${_t(t.assumedGroundZ,2)} m; allowable bearing ${_t(n.grossAllowableBearingKPa,0)} kPa. ${s==="basement"?`Average gross pressure ${_t(n.basementGrossPressureKPa)} kPa; raft thickness not calculated.`:`${s==="garage"?"Garage":"Garden"} line-load budget ${_t(n[s+"SuperstructureKNm"])} kN/m; gross strip pressure ${_t(n[s+"PressureKPa"])} kPa.`} Passing this arithmetic does not verify soil, settlement, strength or the load path.</p><button class="text-button" data-foundation-study>Compare lower / reference / upper assumptions</button>`}var zi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Gi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zd=0,qc=1,Gd=2;var da=1,Vd=2,ir=3,ti=0,sn=1,Kt=2,ni=0,sr=1,jc=2,Xc=3,Kc=4,Hd=5;var ls=100,Wd=101,$d=102,qd=103,jd=104,Xd=200,Kd=201,Yd=202,Jd=203,Yc=204,Jc=205,Zd=206,Qd=207,ef=208,tf=209,nf=210,sf=211,rf=212,af=213,of=214,bo=0,xo=1,vo=2,Bs=3,_o=4,yo=5,So=6,Mo=7,Vo=0,lf=1,cf=2,Gn=0,Zc=1,Qc=2,eh=3,th=4,nh=5,ih=6,sh=7,Lc="attached",hf="detached",rh=300,Vi=301,cs=302,Ho=303,Wo=304,fa=306,Ui=1e3,Mn=1001,zs=1002,At=1003,$o=1004;var hs=1005;var Rt=1006,rr=1007;var Vn=1008;var fn=1009,ah=1010,oh=1011,ar=1012,qo=1013,Hn=1014,vn=1015,Wn=1016,jo=1017,Xo=1018,or=1020,lh=35902,ch=35899,hh=1021,uh=1022,_n=1023,Kn=1026,Hi=1027,Ko=1028,Yo=1029,Wi=1030,Jo=1031;var Zo=1033,pa=33776,ma=33777,ga=33778,ba=33779,Qo=35840,el=35841,tl=35842,nl=35843,il=36196,sl=37492,rl=37496,al=37488,ol=37489,xa=37490,ll=37491,cl=37808,hl=37809,ul=37810,dl=37811,fl=37812,pl=37813,ml=37814,gl=37815,bl=37816,xl=37817,vl=37818,_l=37819,yl=37820,Sl=37821,Ml=36492,wl=36494,Tl=36495,El=36283,Al=36284,va=36285,Rl=36286;var ns=2300,is=2301,po=2302,Nc=2303,Fc=2400,Uc=2401,Oc=2402,uf=2500;var dh=0,_a=1,lr=2,df=3200;var ya=0,ff=1,Si="",Ot="srgb",en="srgb-linear",kr="linear",rt="srgb";var mo=7680;var pf=519,mf=512,gf=513,bf=514,Cl=515,xf=516,vf=517,Pl=518,_f=519,fh=35044;var ph="300 es",On=2e3,Gs=2001;function Cm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Pm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yf(){let i=Vs("canvas");return i.style.display="block",i}var td={},Hs=null;function Br(...i){let e="THREE."+i.shift();Hs?Hs("log",e,...i):console.log(e,...i)}function Sf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=Sf(i);let e="THREE."+i.shift();if(Hs)Hs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ke(...i){i=Sf(i);let e="THREE."+i.shift();if(Hs)Hs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ts(...i){let e=i.join(" ");e in td||(td[e]=!0,Pe(...i))}function Mf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var wf={[bo]:xo,[vo]:So,[_o]:Mo,[Bs]:yo,[xo]:bo,[So]:vo,[Mo]:_o,[yo]:Bs},Bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},$t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],nd=1234567,Os=Math.PI/180,ss=180/Math.PI;function kn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[t&63|128]+$t[t>>8&255]+"-"+$t[t>>16&255]+$t[t>>24&255]+$t[n&255]+$t[n>>8&255]+$t[n>>16&255]+$t[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function mh(i,e){return(i%e+e)%e}function Im(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Dm(i,e,t){return i!==e?(t-i)/(e-i):0}function Or(i,e,t){return(1-t)*i+t*e}function Lm(i,e,t,n){return Or(i,e,1-Math.exp(-t*n))}function Nm(i,e=1){return e-Math.abs(mh(i,e*2)-e)}function Fm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Um(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Om(i,e){return i+Math.floor(Math.random()*(e-i+1))}function km(i,e){return i+Math.random()*(e-i)}function Bm(i){return i*(.5-Math.random())}function zm(i){i!==void 0&&(nd=i);let e=nd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gm(i){return i*Os}function Vm(i){return i*ss}function Hm(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Wm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function $m(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function qm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),b=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*b,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*b,o*l);break;case"ZYZ":i.set(c*b,c*f,o*h,o*l);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Un(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var us={DEG2RAD:Os,RAD2DEG:ss,generateUUID:kn,clamp:Ke,euclideanModulo:mh,mapLinear:Im,inverseLerp:Dm,lerp:Or,damp:Lm,pingpong:Nm,smoothstep:Fm,smootherstep:Um,randInt:Om,randFloat:km,randFloatSpread:Bm,seededRandom:zm,degToRad:Gm,radToDeg:Vm,isPowerOfTwo:Hm,ceilPowerOfTwo:Wm,floorPowerOfTwo:$m,setQuaternionFromProperEuler:qm,normalize:lt,denormalize:Un},Ne=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],b=r[a+2],v=r[a+3];if(u!==v||c!==d||l!==f||h!==b){let m=c*d+l*f+h*b+u*v;m<0&&(d=-d,f=-f,b=-b,v=-v,m=-m);let p=1-o;if(m<.9995){let S=Math.acos(m),A=Math.sin(S);p=Math.sin(p*S)/A,o=Math.sin(o*S)/A,c=c*p+d*o,l=l*p+f*o,h=h*p+b*o,u=u*p+v*o}else{c=c*p+d*o,l=l*p+f*o,h=h*p+b*o,u=u*p+v*o;let S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],b=r[a+3];return e[t]=o*b+h*u+c*f-l*d,e[t+1]=c*b+h*d+l*u-o*f,e[t+2]=l*b+h*f+o*d-c*u,e[t+3]=h*b-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),b=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*b,this._y=l*f*u-d*h*b,this._z=l*h*b+d*f*u,this._w=l*h*u-d*f*b;break;case"YXZ":this._x=d*h*u+l*f*b,this._y=l*f*u-d*h*b,this._z=l*h*b-d*f*u,this._w=l*h*u+d*f*b;break;case"ZXY":this._x=d*h*u-l*f*b,this._y=l*f*u+d*h*b,this._z=l*h*b+d*f*u,this._w=l*h*u-d*f*b;break;case"ZYX":this._x=d*h*u-l*f*b,this._y=l*f*u+d*h*b,this._z=l*h*b-d*f*u,this._w=l*h*u+d*f*b;break;case"YZX":this._x=d*h*u+l*f*b,this._y=l*f*u+d*h*b,this._z=l*h*b-d*f*u,this._w=l*h*u-d*f*b;break;case"XZY":this._x=d*h*u-l*f*b,this._y=l*f*u-d*h*b,this._z=l*h*b+d*f*u,this._w=l*h*u+d*f*b;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(id.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(id.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lc.copy(this).projectOnVector(e),this.sub(lc)}reflect(e){return this.sub(lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},lc=new O,id=new Xt,ze=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],b=n[8],v=s[0],m=s[3],p=s[6],S=s[1],A=s[4],_=s[7],M=s[2],E=s[5],R=s[8];return r[0]=a*v+o*S+c*M,r[3]=a*m+o*A+c*E,r[6]=a*p+o*_+c*R,r[1]=l*v+h*S+u*M,r[4]=l*m+h*A+u*E,r[7]=l*p+h*_+u*R,r[2]=d*v+f*S+b*M,r[5]=d*m+f*A+b*E,r[8]=d*p+f*_+b*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,b=t*u+n*d+s*f;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/b;return e[0]=u*v,e[1]=(s*l-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=d*v,e[4]=(h*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ts("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(cc.makeScale(e,t)),this}rotate(e){return ts("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(cc.makeRotation(-e)),this}translate(e,t){return ts("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(cc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},cc=new ze,sd=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rd=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jm(){let i={enabled:!0,workingColorSpace:en,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(s.r=pi(s.r),s.g=pi(s.g),s.b=pi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(s.r=ks(s.r),s.g=ks(s.g),s.b=ks(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Si?kr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[en]:{primaries:e,whitePoint:n,transfer:kr,toXYZ:sd,fromXYZ:rd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:sd,fromXYZ:rd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),i}var Xe=jm();function pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ms,wo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=Vs("canvas")),Ms.width=e.width,Ms.height=e.height;let s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Vs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=pi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(pi(t[n]/255)*255):t[n]=pi(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Xm=0,Ws=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(hc(s[a].image)):r.push(hc(s[a]))}else r=hc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function hc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}var Km=0,uc=new O,Vt=class i extends Bn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=Rt,a=Vn,o=_n,c=fn,l=i.DEFAULT_ANISOTROPY,h=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=kn(),this.name="",this.source=new Ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(uc).x}get height(){return this.source.getSize(uc).y}get depth(){return this.source.getSize(uc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ui:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ui:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=rh;Vt.DEFAULT_ANISOTROPY=1;var ct=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],b=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(b-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(b+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(l+1)/2,_=(f+1)/2,M=(p+1)/2,E=(h+d)/4,R=(u+v)/4,x=(b+m)/4;return A>_&&A>M?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=E/n,r=R/n):_>M?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=R/r,s=x/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-b)*(m-b)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-b)/S,this.y=(u-v)/S,this.z=(d-h)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},To=class extends Bn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Vt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ws(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends To{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zr=class extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eo=class extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ve=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,h,u,d,f,b,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,d,f,b,v,m)}set(e,t,n,s,r,a,o,c,l,h,u,d,f,b,v,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=b,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ws.setFromMatrixColumn(e,0).length(),r=1/ws.setFromMatrixColumn(e,1).length(),a=1/ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,b=o*h,v=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+b*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=b+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,b=l*h,v=l*u;t[0]=d+v*o,t[4]=b*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-b,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,b=l*h,v=l*u;t[0]=d-v*o,t[4]=-a*u,t[8]=b+f*o,t[1]=f+b*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,b=o*h,v=o*u;t[0]=c*h,t[4]=b*l-f,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=f*l-b,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,b=o*c,v=o*l;t[0]=c*h,t[4]=v-d*u,t[8]=b*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+b,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*c,f=a*l,b=o*c,v=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=a*h,t[9]=f*u-b,t[2]=b*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ym,e,Jm)}lookAt(e,t,n){let s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Pi.crossVectors(n,gn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Pi.crossVectors(n,gn)),Pi.normalize(),Ba.crossVectors(gn,Pi),s[0]=Pi.x,s[4]=Ba.x,s[8]=gn.x,s[1]=Pi.y,s[5]=Ba.y,s[9]=gn.y,s[2]=Pi.z,s[6]=Ba.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],b=n[2],v=n[6],m=n[10],p=n[14],S=n[3],A=n[7],_=n[11],M=n[15],E=s[0],R=s[4],x=s[8],T=s[12],I=s[1],L=s[5],z=s[9],G=s[13],N=s[2],V=s[6],Y=s[10],X=s[14],ie=s[3],j=s[7],K=s[11],te=s[15];return r[0]=a*E+o*I+c*N+l*ie,r[4]=a*R+o*L+c*V+l*j,r[8]=a*x+o*z+c*Y+l*K,r[12]=a*T+o*G+c*X+l*te,r[1]=h*E+u*I+d*N+f*ie,r[5]=h*R+u*L+d*V+f*j,r[9]=h*x+u*z+d*Y+f*K,r[13]=h*T+u*G+d*X+f*te,r[2]=b*E+v*I+m*N+p*ie,r[6]=b*R+v*L+m*V+p*j,r[10]=b*x+v*z+m*Y+p*K,r[14]=b*T+v*G+m*X+p*te,r[3]=S*E+A*I+_*N+M*ie,r[7]=S*R+A*L+_*V+M*j,r[11]=S*x+A*z+_*Y+M*K,r[15]=S*T+A*G+_*X+M*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],b=e[3],v=e[7],m=e[11],p=e[15],S=c*f-l*d,A=o*f-l*u,_=o*d-c*u,M=a*f-l*h,E=a*d-c*h,R=a*u-o*h;return t*(v*S-m*A+p*_)-n*(b*S-m*M+p*E)+s*(b*A-v*M+p*R)-r*(b*_-v*E+m*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],b=e[12],v=e[13],m=e[14],p=e[15],S=t*o-n*a,A=t*c-s*a,_=t*l-r*a,M=n*c-s*o,E=n*l-r*o,R=s*l-r*c,x=h*v-u*b,T=h*m-d*b,I=h*p-f*b,L=u*m-d*v,z=u*p-f*v,G=d*p-f*m,N=S*G-A*z+_*L+M*I-E*T+R*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/N;return e[0]=(o*G-c*z+l*L)*V,e[1]=(s*z-n*G-r*L)*V,e[2]=(v*R-m*E+p*M)*V,e[3]=(d*E-u*R-f*M)*V,e[4]=(c*I-a*G-l*T)*V,e[5]=(t*G-s*I+r*T)*V,e[6]=(m*_-b*R-p*A)*V,e[7]=(h*R-d*_+f*A)*V,e[8]=(a*z-o*I+l*x)*V,e[9]=(n*I-t*z-r*x)*V,e[10]=(b*E-v*_+p*S)*V,e[11]=(u*_-h*E-f*S)*V,e[12]=(o*T-a*L-c*x)*V,e[13]=(t*L-n*T+s*x)*V,e[14]=(v*A-b*M-m*S)*V,e[15]=(h*M-u*A+d*S)*V,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,b=r*u,v=a*h,m=a*u,p=o*u,S=c*l,A=c*h,_=c*u,M=n.x,E=n.y,R=n.z;return s[0]=(1-(v+p))*M,s[1]=(f+_)*M,s[2]=(b-A)*M,s[3]=0,s[4]=(f-_)*E,s[5]=(1-(d+p))*E,s[6]=(m+S)*E,s[7]=0,s[8]=(b+A)*R,s[9]=(m-S)*R,s[10]=(1-(d+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ws.set(s[0],s[1],s[2]).length(),o=ws.set(s[4],s[5],s[6]).length(),c=ws.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ln.copy(this);let l=1/a,h=1/o,u=1/c;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=u,Ln.elements[9]*=u,Ln.elements[10]*=u,t.setFromRotationMatrix(Ln),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=On,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),b,v;if(c)b=r/(a-r),v=a*r/(a-r);else if(o===On)b=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Gs)b=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=b,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=On,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),b,v;if(c)b=1/(a-r),v=a/(a-r);else if(o===On)b=-2/(a-r),v=-(a+r)/(a-r);else if(o===Gs)b=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=b,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ws=new O,Ln=new Ve,Ym=new O(0,0,0),Jm=new O(1,1,1),Pi=new O,Ba=new O,gn=new O,ad=new Ve,od=new Xt,Yn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ad.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ad,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return od.setFromEuler(this),this.setFromQuaternion(od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var $s=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Zm=0,ld=new O,Ts=new Xt,oi=new Ve,za=new O,Cr=new O,Qm=new O,eg=new Xt,cd=new O(1,0,0),hd=new O(0,1,0),ud=new O(0,0,1),dd={type:"added"},tg={type:"removed"},Es={type:"childadded",child:null},dc={type:"childremoved",child:null},yt=class i extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new O,t=new Yn,n=new Xt,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ve},normalMatrix:{value:new ze}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(cd,e)}rotateY(e){return this.rotateOnAxis(hd,e)}rotateZ(e){return this.rotateOnAxis(ud,e)}translateOnAxis(e,t){return ld.copy(e).applyQuaternion(this.quaternion),this.position.add(ld.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cd,e)}translateY(e){return this.translateOnAxis(hd,e)}translateZ(e){return this.translateOnAxis(ud,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?za.copy(e):za.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(Cr,za,this.up):oi.lookAt(za,Cr,this.up),this.quaternion.setFromRotationMatrix(oi),s&&(oi.extractRotation(s.matrixWorld),Ts.setFromRotationMatrix(oi),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dd),Es.child=e,this.dispatchEvent(Es),Es.child=null):ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tg),dc.child=e,this.dispatchEvent(dc),dc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dd),Es.child=e,this.dispatchEvent(Es),Es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,e,Qm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,eg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),b=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),b.length>0&&(n.nodes=b)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};yt.DEFAULT_UP=new O(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=class extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ng={type:"move"},qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new on,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new on,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new on,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,b=.005;l.inputState.pinching&&d>f+b?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-b&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ng)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new on;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Tf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Ga={h:0,s:0,l:0};function fc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ie=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Xe.workingColorSpace){if(e=mh(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fc(a,r,e+1/3),this.g=fc(a,r,e),this.b=fc(a,r,e-1/3)}return Xe.colorSpaceToWorking(this,s),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){let n=Tf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pi(e.r),this.g=pi(e.g),this.b=pi(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return Xe.workingToColorSpace(qt.copy(this),e),Math.round(Ke(qt.r*255,0,255))*65536+Math.round(Ke(qt.g*255,0,255))*256+Math.round(Ke(qt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(qt.copy(this),t);let n=qt.r,s=qt.g,r=qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Ot){Xe.workingToColorSpace(qt.copy(this),e);let t=qt.r,n=qt.g,s=qt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(Ga);let n=Or(Ii.h,Ga.h,t),s=Or(Ii.s,Ga.s,t),r=Or(Ii.l,Ga.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qt=new Ie;Ie.NAMES=Tf;var Gr=class extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Nn=new O,li=new O,pc=new O,ci=new O,As=new O,Rs=new O,fd=new O,mc=new O,gc=new O,bc=new O,xc=new ct,vc=new ct,_c=new ct,fi=class i{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Nn.subVectors(e,t),s.cross(Nn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Nn.subVectors(s,t),li.subVectors(n,t),pc.subVectors(e,t);let a=Nn.dot(Nn),o=Nn.dot(li),c=Nn.dot(pc),l=li.dot(li),h=li.dot(pc),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,b=(a*h-o*c)*d;return r.set(1-f-b,b,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ci.x),c.addScaledVector(a,ci.y),c.addScaledVector(o,ci.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return xc.setScalar(0),vc.setScalar(0),_c.setScalar(0),xc.fromBufferAttribute(e,t),vc.fromBufferAttribute(e,n),_c.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(xc,r.x),a.addScaledVector(vc,r.y),a.addScaledVector(_c,r.z),a}static isFrontFacing(e,t,n,s){return Nn.subVectors(n,t),li.subVectors(e,t),Nn.cross(li).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Nn.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;As.subVectors(s,n),Rs.subVectors(r,n),mc.subVectors(e,n);let c=As.dot(mc),l=Rs.dot(mc);if(c<=0&&l<=0)return t.copy(n);gc.subVectors(e,s);let h=As.dot(gc),u=Rs.dot(gc);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(As,a);bc.subVectors(e,r);let f=As.dot(bc),b=Rs.dot(bc);if(b>=0&&f<=b)return t.copy(r);let v=f*l-c*b;if(v<=0&&l>=0&&b<=0)return o=l/(l-b),t.copy(n).addScaledVector(Rs,o);let m=h*b-f*u;if(m<=0&&u-h>=0&&f-b>=0)return fd.subVectors(r,s),o=(u-h)/(u-h+(f-b)),t.copy(s).addScaledVector(fd,o);let p=1/(m+v+d);return a=v*p,o=d*p,t.copy(n).addScaledVector(As,a).addScaledVector(Rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},tn=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fn):Fn.fromBufferAttribute(r,a),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Va.copy(n.boundingBox)),Va.applyMatrix4(e.matrixWorld),this.union(Va)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),Ha.subVectors(this.max,Pr),Cs.subVectors(e.a,Pr),Ps.subVectors(e.b,Pr),Is.subVectors(e.c,Pr),Di.subVectors(Ps,Cs),Li.subVectors(Is,Ps),Ji.subVectors(Cs,Is);let t=[0,-Di.z,Di.y,0,-Li.z,Li.y,0,-Ji.z,Ji.y,Di.z,0,-Di.x,Li.z,0,-Li.x,Ji.z,0,-Ji.x,-Di.y,Di.x,0,-Li.y,Li.x,0,-Ji.y,Ji.x,0];return!yc(t,Cs,Ps,Is,Ha)||(t=[1,0,0,0,1,0,0,0,1],!yc(t,Cs,Ps,Is,Ha))?!1:(Wa.crossVectors(Di,Li),t=[Wa.x,Wa.y,Wa.z],yc(t,Cs,Ps,Is,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hi=[new O,new O,new O,new O,new O,new O,new O,new O],Fn=new O,Va=new tn,Cs=new O,Ps=new O,Is=new O,Di=new O,Li=new O,Ji=new O,Pr=new O,Ha=new O,Wa=new O,Zi=new O;function yc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zi.fromArray(i,r);let o=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),c=e.dot(Zi),l=t.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Lt=new O,$a=new Ne,ig=0,Ft=class extends Bn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ig++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fh,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$a.fromBufferAttribute(this,t),$a.applyMatrix3(e),this.setXY(t,$a.x,$a.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Vr=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Hr=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var wt=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}},sg=new tn,Ir=new O,Sc=new O,cn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):sg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ir.subVectors(e,this.center);let t=Ir.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ir,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ir.copy(e.center).add(Sc)),this.expandByPoint(Ir.copy(e.center).sub(Sc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},rg=0,Sn=new Ve,Mc=new yt,Ds=new O,bn=new tn,Dr=new tn,Gt=new O,Mt=class i extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cm(e)?Hr:Vr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return Mc.lookAt(e),Mc.updateMatrix(),this.applyMatrix4(Mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ds).negate(),this.translate(Ds.x,Ds.y,Ds.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(bn.min,Dr.min),bn.expandByPoint(Gt),Gt.addVectors(bn.max,Dr.max),bn.expandByPoint(Gt)):(bn.expandByPoint(Dr.min),bn.expandByPoint(Dr.max))}bn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Gt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Gt.fromBufferAttribute(o,l),c&&(Ds.fromBufferAttribute(e,l),Gt.add(Ds)),s=Math.max(s,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ft(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new O,c[x]=new O;let l=new O,h=new O,u=new O,d=new Ne,f=new Ne,b=new Ne,v=new O,m=new O;function p(x,T,I){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,I),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,T),b.fromBufferAttribute(r,I),h.sub(l),u.sub(l),f.sub(d),b.sub(d);let L=1/(f.x*b.y-b.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(b.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-b.x).multiplyScalar(L),o[x].add(v),o[T].add(v),o[I].add(v),c[x].add(m),c[T].add(m),c[I].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let x=0,T=S.length;x<T;++x){let I=S[x],L=I.start,z=I.count;for(let G=L,N=L+z;G<N;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let A=new O,_=new O,M=new O,E=new O;function R(x){M.fromBufferAttribute(s,x),E.copy(M);let T=o[x];A.copy(T),A.sub(M.multiplyScalar(M.dot(T))).normalize(),_.crossVectors(E,T);let L=_.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,L)}for(let x=0,T=S.length;x<T;++x){let I=S[x],L=I.start,z=I.count;for(let G=L,N=L+z;G<N;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,h=new O,u=new O;if(e)for(let d=0,f=e.count;d<f;d+=3){let b=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,b),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(b,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,b=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*h;for(let p=0;p<h;p++)d[b++]=l[f++]}return new Ft(d,h,u)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fh,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Qt=new O,Xs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Br("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Br("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},wc=new O,ag=new O,og=new ze,jt=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=wc.subVectors(n,t).cross(ag.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(wc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||og.getNormalMatrix(e),s=this.coplanarPoint(wc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},lg=0,nn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=sr,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yc,this.blendDst=Jc,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mo,this.stencilZFail=mo,this.stencilZPass=mo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ie().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new jt().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ne().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ui=new O,Tc=new O,qa=new O,ja=new O,Jn=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Tc.copy(e).add(t).multiplyScalar(.5),qa.copy(t).sub(e).normalize(),ja.copy(this.origin).sub(Tc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(qa),o=ja.dot(this.direction),c=-ja.dot(qa),l=ja.lengthSq(),h=Math.abs(1-a*a),u,d,f,b;if(h>0)if(u=a*c-o,d=a*o-c,b=r*h,u>=0)if(d>=-b)if(d<=b){let v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-b?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=b?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Tc).addScaledVector(qa,d),f}intersectSphere(e,t){if(e.radius<0)return null;ui.subVectors(e.center,this.origin);let n=ui.dot(this.direction),s=ui.dot(ui)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,b=t.x-a.x,v=t.y-a.y,m=t.z-a.z,p=n.x-a.x,S=n.y-a.y,A=n.z-a.z,_=Math.abs(c),M=Math.abs(l),E=Math.abs(h),R,x,T,I,L,z,G,N,V,Y,X,ie;if(_>=M&&_>=E?(T=c,z=u,V=b,ie=p,c>=0?(R=l,x=h,I=d,L=f,G=v,N=m,Y=S,X=A):(R=h,x=l,I=f,L=d,G=m,N=v,Y=A,X=S)):M>=E?(T=l,z=d,V=v,ie=S,l>=0?(R=h,x=c,I=f,L=u,G=m,N=b,Y=A,X=p):(R=c,x=h,I=u,L=f,G=b,N=m,Y=p,X=A)):(T=h,z=f,V=m,ie=A,h>=0?(R=c,x=l,I=u,L=d,G=b,N=v,Y=p,X=S):(R=l,x=c,I=d,L=u,G=v,N=b,Y=S,X=p)),T===0)return null;let j=R/T,K=x/T,te=1/T,_e=I-j*z,me=L-K*z,Ge=G-j*V,Ae=N-K*V,Be=Y-j*ie,ee=X-K*ie,ne=Be*Ae-ee*Ge,ge=_e*ee-me*Be,Ue=Ge*me-Ae*_e;if(s){if(ne<0||ge<0||Ue<0)return null}else if((ne<0||ge<0||Ue<0)&&(ne>0||ge>0||Ue>0))return null;let de=ne+ge+Ue;if(de===0)return null;let we=te*(ne*z+ge*V+Ue*ie);return(de>0?we<0:we>0)?null:this.at(we/de,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},hn=class extends nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},pd=new Ve,Qi=new Jn,Xa=new cn,md=new O,Ka=new O,Ya=new O,Ja=new O,Ec=new O,Za=new O,gd=new O,Qa=new O,Ct=class extends yt{constructor(e=new Mt,t=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Za.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Ec.fromBufferAttribute(u,e),a?Za.addScaledVector(Ec,h):Za.addScaledVector(Ec.sub(t),h))}t.add(Za)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(r),Qi.copy(e.ray).recast(e.near),!(Xa.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(Xa,md)===null||Qi.origin.distanceToSquared(md)>(e.far-e.near)**2))&&(pd.copy(r).invert(),Qi.copy(e.ray).applyMatrix4(pd),!(n.boundingBox!==null&&Qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Qi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let b=0,v=d.length;b<v;b++){let m=d[b],p=a[m.materialIndex],S=Math.max(m.start,f.start),A=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=S,M=A;_<M;_+=3){let E=o.getX(_),R=o.getX(_+1),x=o.getX(_+2);s=eo(this,p,e,n,l,h,u,E,R,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let b=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=b,p=v;m<p;m+=3){let S=o.getX(m),A=o.getX(m+1),_=o.getX(m+2);s=eo(this,a,e,n,l,h,u,S,A,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let b=0,v=d.length;b<v;b++){let m=d[b],p=a[m.materialIndex],S=Math.max(m.start,f.start),A=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=S,M=A;_<M;_+=3){let E=_,R=_+1,x=_+2;s=eo(this,p,e,n,l,h,u,E,R,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let b=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=b,p=v;m<p;m+=3){let S=m,A=m+1,_=m+2;s=eo(this,a,e,n,l,h,u,S,A,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function cg(i,e,t,n,s,r,a,o){let c;if(e.side===sn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ti,o),c===null)return null;Qa.copy(o),Qa.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Qa);return l<t.near||l>t.far?null:{distance:l,point:Qa.clone(),object:i}}function eo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ka),i.getVertexPosition(c,Ya),i.getVertexPosition(l,Ja);let h=cg(i,e,t,n,Ka,Ya,Ja,gd);if(h){let u=new O;fi.getBarycoord(gd,Ka,Ya,Ja,u),s&&(h.uv=fi.getInterpolatedAttribute(s,o,c,l,u,new Ne)),r&&(h.uv1=fi.getInterpolatedAttribute(r,o,c,l,u,new Ne)),a&&(h.normal=fi.getInterpolatedAttribute(a,o,c,l,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new O,materialIndex:0};fi.getNormal(Ka,Ya,Ja,d.normal),h.face=d,h.barycoord=u}return h}var Lr=new ct,bd=new ct,xd=new ct,hg=new ct,vd=new Ve,to=new O,Ac=new cn,_d=new Ve,Rc=new Jn,Wr=class extends Ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Lc,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new tn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,to),this.boundingBox.expandByPoint(to)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new cn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,to),this.boundingSphere.expandByPoint(to)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ac.copy(this.boundingSphere),Ac.applyMatrix4(s),e.ray.intersectsSphere(Ac)!==!1&&(_d.copy(s).invert(),Rc.copy(e.ray).applyMatrix4(_d),!(this.boundingBox!==null&&Rc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Rc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ct,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Lc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;bd.fromBufferAttribute(s.attributes.skinIndex,e),xd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Lr.copy(t),t.set(0,0,0,0)):(Lr.set(...t,1),t.set(0,0,0)),Lr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=xd.getComponent(r);if(a!==0){let o=bd.getComponent(r);vd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(hg.copy(Lr).applyMatrix4(vd),a)}}return t.isVector4&&(t.w=Lr.w),t.applyMatrix4(this.bindMatrixInverse)}},Ks=class extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ys=class extends Vt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=At,h=At,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},yd=new Ve,ug=new Ve,$r=class i{constructor(e=[],t=[]){this.uuid=kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ve;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:ug;yd.multiplyMatrices(o,t[r]),yd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ys(t,e,e,_n,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new Ks),this.bones.push(a),this.boneInverses.push(new Ve().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},mi=class extends Ft{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ls=new Ve,Sd=new Ve,no=[],Md=new tn,dg=new Ve,Nr=new Ct,Fr=new cn,qr=class extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new mi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,dg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ls),Md.copy(e.boundingBox).applyMatrix4(Ls),this.boundingBox.union(Md)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new cn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ls),Fr.copy(e.boundingSphere).applyMatrix4(Ls),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Nr.geometry=this.geometry,Nr.material=this.material,Nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),e.ray.intersectsSphere(Fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ls),Sd.multiplyMatrices(n,Ls),Nr.matrixWorld=Sd,Nr.raycast(e,no);for(let a=0,o=no.length;a<o;a++){let c=no[a];c.instanceId=r,c.object=this,t.push(c)}no.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new mi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ys(new Float32Array(s*this.count),s,this.count,Ko,vn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},es=new cn,fg=new Ne(.5,.5),io=new O,Js=class{constructor(e=new jt,t=new jt,n=new jt,s=new jt,r=new jt,a=new jt){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=On,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],b=r[8],v=r[9],m=r[10],p=r[11],S=r[12],A=r[13],_=r[14],M=r[15];if(s[0].setComponents(l-a,f-h,p-b,M-S).normalize(),s[1].setComponents(l+a,f+h,p+b,M+S).normalize(),s[2].setComponents(l+o,f+u,p+v,M+A).normalize(),s[3].setComponents(l-o,f-u,p-v,M-A).normalize(),n)s[4].setComponents(c,d,m,_).normalize(),s[5].setComponents(l-c,f-d,p-m,M-_).normalize();else if(s[4].setComponents(l-c,f-d,p-m,M-_).normalize(),t===On)s[5].setComponents(l+c,f+d,p+m,M+_).normalize();else if(t===Gs)s[5].setComponents(c,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(e){es.center.set(0,0,0);let t=fg.distanceTo(e.center);return es.radius=.7071067811865476+t,es.applyMatrix4(e.matrixWorld),this.intersectsSphere(es)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(io.x=s.normal.x>0?e.max.x:e.min.x,io.y=s.normal.y>0?e.max.y:e.min.y,io.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(io)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var zn=class extends nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ao=new O,Ro=new O,wd=new Ve,Ur=new Jn,so=new cn,Cc=new O,Td=new O,gi=class extends yt{constructor(e=new Mt,t=new zn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ao.fromBufferAttribute(t,s-1),Ro.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ao.distanceTo(Ro);e.setAttribute("lineDistance",new wt(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),so.radius+=r,e.ray.intersectsSphere(so)===!1)return;wd.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(wd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),b=Math.min(h.count,a.start+a.count);for(let v=f,m=b-1;v<m;v+=l){let p=h.getX(v),S=h.getX(v+1),A=ro(this,e,Ur,c,p,S,v);A&&t.push(A)}if(this.isLineLoop){let v=h.getX(b-1),m=h.getX(f),p=ro(this,e,Ur,c,v,m,b-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),b=Math.min(d.count,a.start+a.count);for(let v=f,m=b-1;v<m;v+=l){let p=ro(this,e,Ur,c,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){let v=ro(this,e,Ur,c,b-1,f,b-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ro(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Ao.fromBufferAttribute(o,s),Ro.fromBufferAttribute(o,r),t.distanceSqToSegment(Ao,Ro,Cc,Td)>n)return;Cc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Cc);if(!(l<e.near||l>e.far))return{distance:l,point:Td.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Ed=new O,Ad=new O,Zn=class extends gi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ed.fromBufferAttribute(t,s),Ad.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ed.distanceTo(Ad);e.setAttribute("lineDistance",new wt(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},jr=class extends gi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Zs=class extends nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rd=new Ve,kc=new Jn,ao=new cn,oo=new O,Xr=class extends yt{constructor(e=new Mt,t=new Zs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(s),ao.radius+=r,e.ray.intersectsSphere(ao)===!1)return;Rd.copy(s).invert(),kc.copy(e.ray).applyMatrix4(Rd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let b=d,v=f;b<v;b++){let m=l.getX(b);oo.fromBufferAttribute(u,m),Cd(oo,m,c,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let b=d,v=f;b<v;b++)oo.fromBufferAttribute(u,b),Cd(oo,b,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Cd(i,e,t,n,s,r,a){let o=kc.distanceSqToPoint(i);if(o<t){let c=new O;kc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Kr=class extends Vt{constructor(e=[],t=Vi,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Oi=class extends Vt{constructor(e,t,n=Hn,s,r,a,o=At,c=At,l,h=Kn,u=1){if(h!==Kn&&h!==Hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Co=class extends Oi{constructor(e,t=Hn,n=Vi,s,r,a=At,o=At,c,l=Kn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Yr=class extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Qs=class i extends Mt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;b("z","y","x",-1,-1,n,t,e,a,r,0),b("z","y","x",1,-1,n,t,-e,a,r,1),b("x","z","y",1,1,e,n,t,s,a,2),b("x","z","y",1,-1,e,n,-t,s,a,3),b("x","y","z",1,-1,e,t,n,s,r,4),b("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(h,3)),this.setAttribute("uv",new wt(u,2));function b(v,m,p,S,A,_,M,E,R,x,T){let I=_/R,L=M/x,z=_/2,G=M/2,N=E/2,V=R+1,Y=x+1,X=0,ie=0,j=new O;for(let K=0;K<Y;K++){let te=K*L-G;for(let _e=0;_e<V;_e++){let me=_e*I-z;j[v]=me*S,j[m]=te*A,j[p]=N,l.push(j.x,j.y,j.z),j[v]=0,j[m]=0,j[p]=E>0?1:-1,h.push(j.x,j.y,j.z),u.push(_e/R),u.push(1-K/x),X+=1}}for(let K=0;K<x;K++)for(let te=0;te<R;te++){let _e=d+te+V*K,me=d+te+V*(K+1),Ge=d+(te+1)+V*(K+1),Ae=d+(te+1)+V*K;c.push(_e,me,Ae),c.push(me,Ge,Ae),ie+=6}o.addGroup(f,ie,T),f+=ie,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var lo=new O,co=new O,Pc=new O,ho=new fi,Jr=class extends Mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Os*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let b=0;b<c;b+=3){a?(l[0]=a.getX(b),l[1]=a.getX(b+1),l[2]=a.getX(b+2)):(l[0]=b,l[1]=b+1,l[2]=b+2);let{a:v,b:m,c:p}=ho;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),ho.getNormal(Pc),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){let A=(S+1)%3,_=u[S],M=u[A],E=ho[h[S]],R=ho[h[A]],x=`${_}_${M}`,T=`${M}_${_}`;T in d&&d[T]?(Pc.dot(d[T].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(R.x,R.y,R.z)),d[T]=null):x in d||(d[x]={index0:l[S],index1:l[A],normal:Pc.clone()})}}for(let b in d)if(d[b]){let{index0:v,index1:m}=d[b];lo.fromBufferAttribute(o,v),co.fromBufferAttribute(o,m),f.push(lo.x,lo.y,lo.z),f.push(co.x,co.y,co.z)}this.setAttribute("position",new wt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Zr=class i extends Mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],b=[],v=[],m=[];for(let p=0;p<h;p++){let S=p*d-a;for(let A=0;A<l;A++){let _=A*u-r;b.push(_,-S,0),v.push(0,0,1),m.push(A/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){let A=S+l*p,_=S+l*(p+1),M=S+1+l*(p+1),E=S+1+l*p;f.push(A,_,E),f.push(_,M,E)}this.setIndex(f),this.setAttribute("position",new wt(b,3)),this.setAttribute("normal",new wt(v,3)),this.setAttribute("uv",new wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function ds(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Pd(s))s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Pd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Yt(i){let e={};for(let t=0;t<i.length;t++){let n=ds(i[t]);for(let s in n)e[s]=n[s]}return e}function Pd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function pg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}var Ef={clone:ds,merge:Yt},mg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xn=class extends nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mg,this.fragmentShader=gg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=pg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ie().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ne().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ct().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ze().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ve().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Po=class extends xn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},rs=class extends nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ya,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},un=class extends rs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Qr=class extends nn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ya,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Vo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Io=class extends nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Do=class extends nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var ea=class extends zn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Fi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function go(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function bg(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Id(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function xg(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var Qn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Lo=class extends Qn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fc,endingEnd:Fc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Uc:r=e,o=2*t-n;break;case Oc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Uc:a=e,c=2*n-t;break;case Oc:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,b=(n-t)/(s-t),v=b*b,m=v*b,p=-d*m+2*d*v-d*b,S=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*b+1,A=(-1-f)*m+(1.5+f)*v+.5*b,_=f*m-f*v;for(let M=0;M!==o;++M)r[M]=p*a[h+M]+S*a[l+M]+A*a[c+M]+_*a[u+M];return r}},No=class extends Qn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}},Fo=class extends Qn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Uo=class extends Qn{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let b=(n-t)/(s-t),v=1-b;for(let m=0;m!==o;++m)r[m]=a[l+m]*v+a[c+m]*b;return r}let d=o*2,f=e-1;for(let b=0;b!==o;++b){let v=a[l+b],m=a[c+b],p=f*d+b*2,S=u[p],A=u[p+1],_=e*d+b*2,M=h[_],E=h[_+1],R=_g(n,t,S,M,s);r[b]=Af(R,v,A,E,m)}return r}};function Af(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function vg(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function _g(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Af(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=vg(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fi(t,this.TimeBufferType),this.values=Fi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fi(e.times,Array),values:Fi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),go(e.settings)&&(n.settings={inTangents:Fi(e.settings.inTangents,Array),outTangents:Fi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Uo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ns:t=this.InterpolantFactoryMethodDiscrete;break;case is:t=this.InterpolantFactoryMethodLinear;break;case po:t=this.InterpolantFactoryMethodSmooth;break;case Nc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ns;case this.InterpolantFactoryMethodLinear:return is;case this.InterpolantFactoryMethodSmooth:return po;case this.InterpolantFactoryMethodBezier:return Nc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;go(this.settings)&&(Dd(this.settings.inTangents,e),Dd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){ke("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){ke("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Pm(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){ke("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===po,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,d=u-n,f=u+n;for(let b=0;b!==n;++b){let v=t[u+b];if(v!==t[d+b]||v!==t[f+b]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,go(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Dd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=is;var bi=class extends dn{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=ns;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var ta=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}};ta.prototype.ValueTypeName="color";var xi=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}};xi.prototype.ValueTypeName="number";var Oo=class extends Qn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)Xt.slerpFlat(r,0,a,l-o,a,l,c);return r}},vi=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Oo(this.times,this.values,this.getValueSize(),e)}};vi.prototype.ValueTypeName="quaternion";vi.prototype.InterpolantFactoryMethodSmooth=void 0;var _i=class extends dn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="string";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=ns;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}};ki.prototype.ValueTypeName="vector";var na=class{constructor(e="",t=-1,n=[],s=uf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Sg(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(dn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=bg(c);c=Id(c,1,h),l=Id(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new xi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function yg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xi;case"vector":case"vector2":case"vector3":case"vector4":return ki;case"color":return ta;case"quaternion":return vi;case"bool":case"boolean":return bi;case"string":return _i}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Sg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=yg(i.type);if(i.times===void 0){let n=[],s=[];xg(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),go(i.settings)&&(t.settings={inTangents:Fi(i.settings.inTangents,Float32Array),outTangents:Fi(i.settings.outTangents,Float32Array)}),t}var Xn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Ld(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Ld(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ld(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ko=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],b=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return b}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Rf=new ko,ei=class{constructor(e){this.manager=e!==void 0?e:Rf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ei.DEFAULT_MATERIAL_NAME="__DEFAULT";var di={},Bc=class extends Error{constructor(e,t){super(e),this.response=t}},er=class extends ei{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Xn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(di[e]!==void 0){di[e].push({onLoad:t,onProgress:n,onError:s});return}di[e]=[],di[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=di[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,b=f!==0,v=0,m=new ReadableStream({start(p){S();function S(){u.read().then(({done:A,value:_})=>{if(A)p.close();else{v+=_.byteLength;let M=new ProgressEvent("progress",{lengthComputable:b,loaded:v,total:f});for(let E=0,R=h.length;E<R;E++){let x=h[E];x.onProgress&&x.onProgress(M)}p.enqueue(_),S()}},A=>{p.error(A)})}}});return new Response(m)}else throw new Bc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(b=>f.decode(b))}}}).then(l=>{Xn.add(`file:${e}`,l);let h=di[e];delete di[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=di[e];if(h===void 0)throw this.manager.itemError(e),l;delete di[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ns=new WeakMap,Bo=class extends ei{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Xn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Ns.get(a);u===void 0&&(u=[],Ns.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=Vs("img");function c(){h(),t&&t(this);let u=Ns.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Ns.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Xn.remove(`image:${e}`);let d=Ns.get(this)||[];for(let f=0;f<d.length;f++){let b=d[f];b.onError&&b.onError(u)}Ns.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Xn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var ia=class extends ei{constructor(e){super(e)}load(e,t,n,s){let r=new Vt,a=new Bo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},as=class extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},sa=class extends as{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ic=new Ve,Nd=new O,Fd=new O,tr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Js,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Nd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nd),Fd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Ic.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ic,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Gs||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Ic)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},uo=new O,fo=new Xt,jn=new O,ra=class extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(uo,fo,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,fo,jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(uo,fo,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,fo,jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ni=new O,Ud=new Ne,Od=new Ne,Nt=class extends ra{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(Os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,Ud,Od),t.subVectors(Od,Ud)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Os*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},zc=class extends tr{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ss*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},aa=class extends as{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Gc=class extends tr{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0}},oa=class extends as{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Gc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Bi=class extends ra{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vc=class extends tr{constructor(){super(new Bi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},os=class extends as{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Vc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var yi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Dc=new WeakMap,la=class extends ei{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Xn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Dc.has(a)===!0?(s&&s(Dc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Xn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Dc.set(c,l),Xn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Xn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Fs=-90,Us=1,zo=class extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Nt(Fs,Us,e,t);s.layers=this.layers,this.add(s);let r=new Nt(Fs,Us,e,t);r.layers=this.layers,this.add(r);let a=new Nt(Fs,Us,e,t);a.layers=this.layers,this.add(a);let o=new Nt(Fs,Us,e,t);o.layers=this.layers,this.add(o);let c=new Nt(Fs,Us,e,t);c.layers=this.layers,this.add(c);let l=new Nt(Fs,Us,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=b,n.texture.needsPMREMUpdate=!0}},Go=class extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bh="\\[\\]\\.:\\/",Mg=new RegExp("["+bh+"]","g"),xh="[^"+bh+"]",wg="[^"+bh.replace("\\.","")+"]",Tg=/((?:WC+[\/:])*)/.source.replace("WC",xh),Eg=/(WCOD+)?/.source.replace("WCOD",wg),Ag=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xh),Rg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xh),Cg=new RegExp("^"+Tg+Eg+Ag+Rg+"$"),Pg=["material","materials","bones","map"],Hc=class{constructor(e,t,n){let s=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Mg,"")}static parseTrackName(e){let t=Cg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Pg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;ke("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=Hc;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ky=new Float32Array(1);var kd=new Ve,ca=class{constructor(e,t,n=0,s=1/0){this.ray=new Jn(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new $s,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kd),this}intersectObject(e,t=!0,n=[]){return Wc(e,this,n,t),n.sort(Bd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Wc(e[s],this,n,t);return n.sort(Bd),n}};function Bd(i,e){return i.distance-e.distance}function Wc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Wc(r[a],e,t,!0)}}var nr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var $c=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var ha=class extends Zn{constructor(e=10,t=10,n=4473924,s=8947848){n=new Ie(n),s=new Ie(s);let r=t/2,a=e/t,o=e/2,c=[],l=[];for(let d=0,f=0,b=-o;d<=t;d++,b+=a){c.push(-o,0,b,o,0,b),c.push(b,0,-o,b,0,o);let v=d===r?n:s;v.toArray(l,f),f+=3,v.toArray(l,f),f+=3,v.toArray(l,f),f+=3,v.toArray(l,f),f+=3}let h=new Mt;h.setAttribute("position",new wt(c,3)),h.setAttribute("color",new wt(l,3));let u=new zn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var ua=class extends Bn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function vh(i,e,t,n){let s=Ig(n);switch(t){case hh:return i*e;case Ko:return i*e/s.components*s.byteLength;case Yo:return i*e/s.components*s.byteLength;case Wi:return i*e*2/s.components*s.byteLength;case Jo:return i*e*2/s.components*s.byteLength;case uh:return i*e*3/s.components*s.byteLength;case _n:return i*e*4/s.components*s.byteLength;case Zo:return i*e*4/s.components*s.byteLength;case pa:case ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ga:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:case nl:return Math.max(i,16)*Math.max(e,8)/4;case Qo:case tl:return Math.max(i,8)*Math.max(e,8)/2;case il:case sl:case al:case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case rl:case xa:case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case dl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ml:case wl:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case El:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*8;case va:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ig(i){switch(i){case fn:case ah:return{byteLength:1,components:1};case ar:case oh:case Wn:return{byteLength:2,components:1};case jo:case Xo:return{byteLength:2,components:4};case Hn:case qo:case vn:return{byteLength:4,components:1};case lh:case ch:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Yf(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Lg(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,b)=>f.start-b.start);let d=0;for(let f=1;f<u.length;f++){let b=u[d],v=u[f];v.start<=b.start+b.count+1?b.count=Math.max(b.count,v.start+v.count-b.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,b=u.length;f<b;f++){let v=u[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Ng=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fg=`#ifdef USE_ALPHAHASH
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
#endif`,Ug=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Og=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zg=`#ifdef USE_AOMAP
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
#endif`,Gg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vg=`#ifdef USE_BATCHING
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
#endif`,Hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jg=`#ifdef USE_IRIDESCENCE
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
#endif`,Xg=`#ifdef USE_BUMPMAP
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
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,eb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
} // validated`,sb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rb=`vec3 transformedNormal = objectNormal;
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
#endif`,ab=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ob=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hb="gl_FragColor = linearToOutputTexel( gl_FragColor );",ub=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,db=`#ifdef USE_ENVMAP
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
#endif`,fb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pb=`#ifdef USE_ENVMAP
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
#endif`,mb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gb=`#ifdef USE_ENVMAP
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
#endif`,bb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_b=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yb=`#ifdef USE_GRADIENTMAP
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
}`,Sb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tb=`uniform bool receiveShadow;
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
#endif`,Ab=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ib=`PhysicalMaterial material;
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
#endif`,Db=`uniform sampler2D dfgLUT;
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
}`,Lb=`
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
#endif`,Nb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ub=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ob=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vb=`#ifdef USE_MAP
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
#endif`,Wb=`#if defined( USE_POINTS_UV )
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
#endif`,$b=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xb=`#if defined( USE_MORPHCOLORS )
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
vec3 nonPerturbedNormal = normal;`,Qb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,e0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,i0=`#ifdef USE_NORMALMAP
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
#endif`,s0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,a0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,h0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,b0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,x0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v0=`float getShadowMask() {
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
}`,_0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y0=`#ifdef USE_SKINNING
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
#endif`,S0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M0=`#ifdef USE_SKINNING
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
#endif`,w0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,T0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,E0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,R0=`#ifdef USE_TRANSMISSION
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
#endif`,C0=`#ifdef USE_TRANSMISSION
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
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,N0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,F0=`uniform sampler2D t2D;
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,k0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`#include <common>
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
}`,G0=`#if DEPTH_PACKING == 3200
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
}`,V0=`#define DISTANCE
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
}`,H0=`#define DISTANCE
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
}`,W0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q0=`uniform float scale;
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
}`,j0=`uniform vec3 diffuse;
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
}`,X0=`#include <common>
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
}`,K0=`uniform vec3 diffuse;
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
}`,Y0=`#define LAMBERT
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
}`,J0=`#define LAMBERT
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
}`,Z0=`#define MATCAP
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
}`,Q0=`#define MATCAP
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
}`,ex=`#define NORMAL
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
}`,tx=`#define NORMAL
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
}`,nx=`#define PHONG
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
}`,ix=`#define PHONG
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
}`,sx=`#define STANDARD
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
}`,rx=`#define STANDARD
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
}`,ax=`#define TOON
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
}`,ox=`#define TOON
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
}`,lx=`uniform float size;
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
}`,cx=`uniform vec3 diffuse;
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
}`,hx=`#include <common>
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
}`,ux=`uniform vec3 color;
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
}`,dx=`uniform float rotation;
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
}`,fx=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:Ng,alphahash_pars_fragment:Fg,alphamap_fragment:Ug,alphamap_pars_fragment:Og,alphatest_fragment:kg,alphatest_pars_fragment:Bg,aomap_fragment:zg,aomap_pars_fragment:Gg,batching_pars_vertex:Vg,batching_vertex:Hg,begin_vertex:Wg,beginnormal_vertex:$g,bsdfs:qg,iridescence_fragment:jg,bumpmap_pars_fragment:Xg,clipping_planes_fragment:Kg,clipping_planes_pars_fragment:Yg,clipping_planes_pars_vertex:Jg,clipping_planes_vertex:Zg,color_fragment:Qg,color_pars_fragment:eb,color_pars_vertex:tb,color_vertex:nb,common:ib,cube_uv_reflection_fragment:sb,defaultnormal_vertex:rb,displacementmap_pars_vertex:ab,displacementmap_vertex:ob,emissivemap_fragment:lb,emissivemap_pars_fragment:cb,colorspace_fragment:hb,colorspace_pars_fragment:ub,envmap_fragment:db,envmap_common_pars_fragment:fb,envmap_pars_fragment:pb,envmap_pars_vertex:mb,envmap_physical_pars_fragment:Eb,envmap_vertex:gb,fog_vertex:bb,fog_pars_vertex:xb,fog_fragment:vb,fog_pars_fragment:_b,gradientmap_pars_fragment:yb,lightmap_pars_fragment:Sb,lights_lambert_fragment:Mb,lights_lambert_pars_fragment:wb,lights_pars_begin:Tb,lights_toon_fragment:Ab,lights_toon_pars_fragment:Rb,lights_phong_fragment:Cb,lights_phong_pars_fragment:Pb,lights_physical_fragment:Ib,lights_physical_pars_fragment:Db,lights_fragment_begin:Lb,lights_fragment_maps:Nb,lights_fragment_end:Fb,lightprobes_pars_fragment:Ub,logdepthbuf_fragment:Ob,logdepthbuf_pars_fragment:kb,logdepthbuf_pars_vertex:Bb,logdepthbuf_vertex:zb,map_fragment:Gb,map_pars_fragment:Vb,map_particle_fragment:Hb,map_particle_pars_fragment:Wb,metalnessmap_fragment:$b,metalnessmap_pars_fragment:qb,morphinstance_vertex:jb,morphcolor_vertex:Xb,morphnormal_vertex:Kb,morphtarget_pars_vertex:Yb,morphtarget_vertex:Jb,normal_fragment_begin:Zb,normal_fragment_maps:Qb,normal_pars_fragment:e0,normal_pars_vertex:t0,normal_vertex:n0,normalmap_pars_fragment:i0,clearcoat_normal_fragment_begin:s0,clearcoat_normal_fragment_maps:r0,clearcoat_pars_fragment:a0,iridescence_pars_fragment:o0,opaque_fragment:l0,packing:c0,premultiplied_alpha_fragment:h0,project_vertex:u0,dithering_fragment:d0,dithering_pars_fragment:f0,roughnessmap_fragment:p0,roughnessmap_pars_fragment:m0,shadowmap_pars_fragment:g0,shadowmap_pars_vertex:b0,shadowmap_vertex:x0,shadowmask_pars_fragment:v0,skinbase_vertex:_0,skinning_pars_vertex:y0,skinning_vertex:S0,skinnormal_vertex:M0,specularmap_fragment:w0,specularmap_pars_fragment:T0,tonemapping_fragment:E0,tonemapping_pars_fragment:A0,transmission_fragment:R0,transmission_pars_fragment:C0,uv_pars_fragment:P0,uv_pars_vertex:I0,uv_vertex:D0,worldpos_vertex:L0,background_vert:N0,background_frag:F0,backgroundCube_vert:U0,backgroundCube_frag:O0,cube_vert:k0,cube_frag:B0,depth_vert:z0,depth_frag:G0,distance_vert:V0,distance_frag:H0,equirect_vert:W0,equirect_frag:$0,linedashed_vert:q0,linedashed_frag:j0,meshbasic_vert:X0,meshbasic_frag:K0,meshlambert_vert:Y0,meshlambert_frag:J0,meshmatcap_vert:Z0,meshmatcap_frag:Q0,meshnormal_vert:ex,meshnormal_frag:tx,meshphong_vert:nx,meshphong_frag:ix,meshphysical_vert:sx,meshphysical_frag:rx,meshtoon_vert:ax,meshtoon_frag:ox,points_vert:lx,points_frag:cx,shadow_vert:hx,shadow_frag:ux,sprite_vert:dx,sprite_frag:fx},fe={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},si={basic:{uniforms:Yt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Yt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Yt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Yt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Yt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Ie(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Yt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Yt([fe.points,fe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Yt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Yt([fe.common,fe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Yt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Yt([fe.sprite,fe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Yt([fe.common,fe.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Yt([fe.lights,fe.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};si.physical={uniforms:Yt([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var Il={r:0,b:0,g:0},px=new Ve,Jf=new ze;Jf.set(-1,0,0,0,1,0,0,0,1);function mx(i,e,t,n,s,r){let a=new Ie(0),o=s===!0?0:1,c,l,h=null,u=0,d=null;function f(S){let A=S.isScene===!0?S.background:null;if(A&&A.isTexture){let _=S.backgroundBlurriness>0;A=e.get(A,_)}return A}function b(S){let A=!1,_=f(S);_===null?m(a,o):_&&_.isColor&&(m(_,1),A=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(S,A){let _=f(A);_&&(_.isCubeTexture||_.mapping===fa)?(l===void 0&&(l=new Ct(new Qs(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:ds(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(px.makeRotationFromEuler(A.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Jf),l.material.toneMapped=Xe.getTransfer(_.colorSpace)!==rt,(h!==_||u!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ct(new Zr(2,2),new xn({name:"BackgroundMaterial",uniforms:ds(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(_.colorSpace)!==rt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,A){S.getRGB(Il,gh(i)),t.buffers.color.setClear(Il.r,Il.g,Il.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:b,addToRenderList:v,dispose:p}}function gx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(L,z,G,N,V){let Y=!1,X=u(L,N,G,z);r!==X&&(r=X,l(r.object)),Y=f(L,N,G,V),Y&&b(L,N,G,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,_(L,z,G,N),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function u(L,z,G,N){let V=N.wireframe===!0,Y=n[z.id];Y===void 0&&(Y={},n[z.id]=Y);let X=L.isInstancedMesh===!0?L.id:0,ie=Y[X];ie===void 0&&(ie={},Y[X]=ie);let j=ie[G.id];j===void 0&&(j={},ie[G.id]=j);let K=j[V];return K===void 0&&(K=d(c()),j[V]=K),K}function d(L){let z=[],G=[],N=[];for(let V=0;V<t;V++)z[V]=0,G[V]=0,N[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:N,object:L,attributes:{},index:null}}function f(L,z,G,N){let V=r.attributes,Y=z.attributes,X=0,ie=G.getAttributes();for(let j in ie)if(ie[j].location>=0){let te=V[j],_e=Y[j];if(_e===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(_e=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(_e=L.instanceColor)),te===void 0||te.attribute!==_e||_e&&te.data!==_e.data)return!0;X++}return r.attributesNum!==X||r.index!==N}function b(L,z,G,N){let V={},Y=z.attributes,X=0,ie=G.getAttributes();for(let j in ie)if(ie[j].location>=0){let te=Y[j];te===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));let _e={};_e.attribute=te,te&&te.data&&(_e.data=te.data),V[j]=_e,X++}r.attributes=V,r.attributesNum=X,r.index=N}function v(){let L=r.newAttributes;for(let z=0,G=L.length;z<G;z++)L[z]=0}function m(L){p(L,0)}function p(L,z){let G=r.newAttributes,N=r.enabledAttributes,V=r.attributeDivisors;G[L]=1,N[L]===0&&(i.enableVertexAttribArray(L),N[L]=1),V[L]!==z&&(i.vertexAttribDivisor(L,z),V[L]=z)}function S(){let L=r.newAttributes,z=r.enabledAttributes;for(let G=0,N=z.length;G<N;G++)z[G]!==L[G]&&(i.disableVertexAttribArray(G),z[G]=0)}function A(L,z,G,N,V,Y,X){X===!0?i.vertexAttribIPointer(L,z,G,V,Y):i.vertexAttribPointer(L,z,G,N,V,Y)}function _(L,z,G,N){v();let V=N.attributes,Y=G.getAttributes(),X=z.defaultAttributeValues;for(let ie in Y){let j=Y[ie];if(j.location>=0){let K=V[ie];if(K===void 0&&(ie==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),ie==="instanceColor"&&L.instanceColor&&(K=L.instanceColor)),K!==void 0){let te=K.normalized,_e=K.itemSize,me=e.get(K);if(me===void 0)continue;let Ge=me.buffer,Ae=me.type,Be=me.bytesPerElement,ee=Ae===i.INT||Ae===i.UNSIGNED_INT||K.gpuType===qo;if(K.isInterleavedBufferAttribute){let ne=K.data,ge=ne.stride,Ue=K.offset;if(ne.isInstancedInterleavedBuffer){for(let de=0;de<j.locationSize;de++)p(j.location+de,ne.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let de=0;de<j.locationSize;de++)m(j.location+de);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let de=0;de<j.locationSize;de++)A(j.location+de,_e/j.locationSize,Ae,te,ge*Be,(Ue+_e/j.locationSize*de)*Be,ee)}else{if(K.isInstancedBufferAttribute){for(let ne=0;ne<j.locationSize;ne++)p(j.location+ne,K.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ne=0;ne<j.locationSize;ne++)m(j.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let ne=0;ne<j.locationSize;ne++)A(j.location+ne,_e/j.locationSize,Ae,te,_e*Be,_e/j.locationSize*ne*Be,ee)}}else if(X!==void 0){let te=X[ie];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(j.location,te);break;case 3:i.vertexAttrib3fv(j.location,te);break;case 4:i.vertexAttrib4fv(j.location,te);break;default:i.vertexAttrib1fv(j.location,te)}}}}S()}function M(){T();for(let L in n){let z=n[L];for(let G in z){let N=z[G];for(let V in N){let Y=N[V];for(let X in Y)h(Y[X].object),delete Y[X];delete N[V]}}delete n[L]}}function E(L){if(n[L.id]===void 0)return;let z=n[L.id];for(let G in z){let N=z[G];for(let V in N){let Y=N[V];for(let X in Y)h(Y[X].object),delete Y[X];delete N[V]}}delete n[L.id]}function R(L){for(let z in n){let G=n[z];for(let N in G){let V=G[N];if(V[L.id]===void 0)continue;let Y=V[L.id];for(let X in Y)h(Y[X].object),delete Y[X];delete V[L.id]}}}function x(L){for(let z in n){let G=n[z],N=L.isInstancedMesh===!0?L.id:0,V=G[N];if(V!==void 0){for(let Y in V){let X=V[Y];for(let ie in X)h(X[ie].object),delete X[ie];delete V[Y]}delete G[N],Object.keys(G).length===0&&delete n[z]}}}function T(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:I,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function bx(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function xx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==_n&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let x=R===Wn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==fn&&R!==vn&&!x&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Pe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:b,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:_,maxSamples:M,samples:E}}function vx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new jt,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let b=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||b===null||b.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,A=S*4,_=p.clippingState||null;c.value=_,_=h(b,d,A,f);for(let M=0;M!==A;++M)_[M]=t[M];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,b){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=c.value,b!==!0||m===null){let p=f+v*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,_=f;A!==v;++A,_+=4)a.copy(u[A]).applyMatrix4(S,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var hr=4,_x=6,yx=20,Sx=256,Sa=new Bi,Cf=new Ie,_h=null,yh=0,Sh=0,Mh=!1,Mx=new O,fs=new O,Ll=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Mx}=r;_h=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Df(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=If(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_h,yh,Sh),this._renderer.xr.enabled=Mh,e.scissorTest=!1,cr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vi||e.mapping===cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_h=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Wn,format:_n,colorSpace:en,depthBuffer:!1},s=Pf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=wx(r)),this._blurMaterial=Ex(r,e,t),this._ggxMaterial=Tx(r,e,t)}return s}_compileMaterial(e){let t=new Ct(new Mt,e);this._renderer.compile(t,Sa)}_sceneToCubeUV(e,t,n,s,r){let c=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Cf),u.toneMapping=Gn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ct(new Qs,new hn({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,p=!1,S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(Cf),p=!0);for(let A=0;A<6;A++){let _=A%3;_===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):_===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));let M=this._cubeSize;cr(s,_*M,A>2?M:0,M,M),u.setRenderTarget(s),p&&u.render(v,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Vi||e.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Df()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=If());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;cr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Sa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,f=u*d,{_lodMax:b}=this,v=this._sizeLods[n],m=3*v*(n>b-hr?n-b+hr:0),p=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=b-t,cr(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,Sa),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=b-n,cr(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(o,Sa)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-hr?s-this._lodMax+hr:0),d=4*(this._cubeSize-h);cr(t,u,d,3*h,2*h),a.setRenderTarget(t),a.render(c,Sa)}};function wx(i){let e=[],t=[],n=i,s=i-hr+1+_x;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,d=6,f=3,b=new Float32Array(f*d*u),v=new Float32Array(f*d*u);for(let p=0;p<u;p++){let S=p%3*2/3-1,A=p>2?0:-1,_=[S,A,0,S+2/3,A,0,S+2/3,A+1,0,S,A,0,S+2/3,A+1,0,S,A+1,0];b.set(_,f*d*p);for(let M=0;M<d;M++){let E=h[M*2]*2-1,R=h[M*2+1]*2-1;p===0?fs.set(1,R,E):p===1?fs.set(-E,1,-R):p===2?fs.set(-E,R,1):p===3?fs.set(-1,R,-E):p===4?fs.set(-E,-1,R):fs.set(E,R,-1),fs.toArray(v,(p*d+M)*f)}}let m=new Mt;m.setAttribute("position",new Ft(b,f)),m.setAttribute("outputDirection",new Ft(v,f)),t.push(new Ct(m,null)),n>hr&&n--}return{lodMeshes:t,sizeLods:e}}function Pf(i,e,t){let n=new ln(i,e,t);return n.texture.mapping=fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function cr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Tx(i,e,t){return new xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Ex(i,e,t){return new xn({name:"SphericalGaussianBlur",defines:{SAMPLES:yx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function If(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Df(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Ul(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Nl=class extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Kr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Qs(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:ni});r.uniforms.tEquirect.value=t;let a=new Ct(s,r),o=t.minFilter;return t.minFilter===Vn&&(t.minFilter=Rt),new zo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Ax(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Ho||f===Wo)if(e.has(d)){let b=e.get(d).texture;return o(b,d.mapping)}else{let b=d.image;if(b&&b.height>0){let v=new Nl(b.height);return v.fromEquirectangularTexture(i,d),e.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,b=f===Ho||f===Wo,v=f===Vi||f===cs;if(b||v){let m=t.get(d),p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Ll(i)),m=b?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let S=d.image;return b&&S&&S.height>0||v&&S&&c(S)?(n===null&&(n=new Ll(i)),m=b?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===Ho?d.mapping=Vi:f===Wo&&(d.mapping=cs),d}function c(d){let f=0,b=6;for(let v=0;v<b;v++)d[v]!==void 0&&f++;return f===b}function l(d){let f=d.target;f.removeEventListener("dispose",l);let b=e.get(f);b!==void 0&&(e.delete(f),b.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let b=t.get(f);b!==void 0&&(t.delete(f),b.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Rx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ts("WebGLRenderer: "+n+" extension not supported."),s}}}function Cx(i,e,t,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let b in d.attributes)e.remove(d.attributes[b]);d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,b=u.attributes.position,v=0;if(b===void 0)return;if(f!==null){let S=f.array;v=f.version;for(let A=0,_=S.length;A<_;A+=3){let M=S[A+0],E=S[A+1],R=S[A+2];d.push(M,E,E,R,R,M)}}else{let S=b.array;v=b.version;for(let A=0,_=S.length/3-1;A<_;A+=3){let M=A+0,E=A+1,R=A+2;d.push(M,E,E,R,R,M)}}let m=new(b.count>=65535?Hr:Vr)(d,1);m.version=v;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Px(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*a),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let v=0;for(let m=0;m<f;m++)v+=d[m];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Ix(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:ke("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Dx(i,e,t){let n=new WeakMap,s=new ct;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let T=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],A=0;f===!0&&(A=1),b===!0&&(A=2),v===!0&&(A=3);let _=o.attributes.position.count*A,M=1;_>e.maxTextureSize&&(M=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*M*4*u),R=new zr(E,_,M,u);R.type=vn,R.needsUpdate=!0;let x=A*4;for(let I=0;I<u;I++){let L=m[I],z=p[I],G=S[I],N=_*M*4*I;for(let V=0;V<L.count;V++){let Y=V*x;f===!0&&(s.fromBufferAttribute(L,V),E[N+Y+0]=s.x,E[N+Y+1]=s.y,E[N+Y+2]=s.z,E[N+Y+3]=0),b===!0&&(s.fromBufferAttribute(z,V),E[N+Y+4]=s.x,E[N+Y+5]=s.y,E[N+Y+6]=s.z,E[N+Y+7]=0),v===!0&&(s.fromBufferAttribute(G,V),E[N+Y+8]=s.x,E[N+Y+9]=s.y,E[N+Y+10]=s.z,E[N+Y+11]=G.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new Ne(_,M)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];let b=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",b),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Lx(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Nx={[Zc]:"LINEAR_TONE_MAPPING",[Qc]:"REINHARD_TONE_MAPPING",[eh]:"CINEON_TONE_MAPPING",[th]:"ACES_FILMIC_TONE_MAPPING",[ih]:"AGX_TONE_MAPPING",[sh]:"NEUTRAL_TONE_MAPPING",[nh]:"CUSTOM_TONE_MAPPING"};function Fx(i,e,t,n,s,r){let a=new ln(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Mt;l.setAttribute("position",new wt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new wt([0,2,0,0,2,0],2));let h=new Po({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ct(l,h),d=new Bi(-1,1,1,-1,0,1),f=null,b=null,v=!1,m,p=null,S=[],A=!1;this.setSize=function(_,M){a.setSize(_,M),o!==null&&o.setSize(_,M),c!==null&&c.setSize(_,M);for(let E=0;E<S.length;E++){let R=S[E];R.setSize&&R.setSize(_,M)}},this.setEffects=function(_){S=_,A=S.length>0&&S[0].isRenderPass===!0;let M=a.width,E=a.height;S.length>0&&o===null&&(o=new ln(M,E,{type:Wn,depthBuffer:!1,stencilBuffer:!1}),c=new ln(M,E,{type:Wn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<S.length;R++){let x=S[R];x.setSize&&x.setSize(M,E)}},this.begin=function(_,M){if(v||_.toneMapping===Gn&&S.length===0)return!1;if(p=M,M!==null){let E=M.width,R=M.height;(a.width!==E||a.height!==R)&&this.setSize(E,R)}return A===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=Gn,!0},this.hasRenderPass=function(){return A},this.end=function(_,M){_.toneMapping=m,v=!0;let E=a,R=o;for(let x=0;x<S.length;x++){let T=S[x];T.enabled!==!1&&(T.render(_,R,E,M),T.needsSwap!==!1&&(E=R,R=R===o?c:o))}if(f!==_.outputColorSpace||b!==_.toneMapping){f=_.outputColorSpace,b=_.toneMapping,h.defines={},Xe.getTransfer(f)===rt&&(h.defines.SRGB_TRANSFER="");let x=Nx[b];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,_.setRenderTarget(p),_.render(u,d),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Zf=new Vt,Eh=new Oi(1,1),Qf=new zr,ep=new Eo,tp=new Kr,Lf=[],Nf=[],Ff=new Float32Array(16),Uf=new Float32Array(9),Of=new Float32Array(4);function dr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Lf[s];if(r===void 0&&(r=new Float32Array(s),Lf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ol(i,e){let t=Nf[e];t===void 0&&(t=new Int32Array(e),Nf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ux(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function zx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;Of.set(n),i.uniformMatrix2fv(this.addr,!1,Of),Bt(t,n)}}function Gx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;Uf.set(n),i.uniformMatrix3fv(this.addr,!1,Uf),Bt(t,n)}}function Vx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;Ff.set(n),i.uniformMatrix4fv(this.addr,!1,Ff),Bt(t,n)}}function Hx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function $x(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function qx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function jx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function Kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function Yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function Jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Eh.compareFunction=t.isReversedDepthBuffer()?Pl:Cl,r=Eh):r=Zf,t.setTexture2D(e||r,s)}function Zx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ep,s)}function Qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||tp,s)}function ev(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Qf,s)}function tv(i){switch(i){case 5126:return Ux;case 35664:return Ox;case 35665:return kx;case 35666:return Bx;case 35674:return zx;case 35675:return Gx;case 35676:return Vx;case 5124:case 35670:return Hx;case 35667:case 35671:return Wx;case 35668:case 35672:return $x;case 35669:case 35673:return qx;case 5125:return jx;case 36294:return Xx;case 36295:return Kx;case 36296:return Yx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return Zx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return ev}}function nv(i,e){i.uniform1fv(this.addr,e)}function iv(i,e){let t=dr(e,this.size,2);i.uniform2fv(this.addr,t)}function sv(i,e){let t=dr(e,this.size,3);i.uniform3fv(this.addr,t)}function rv(i,e){let t=dr(e,this.size,4);i.uniform4fv(this.addr,t)}function av(i,e){let t=dr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ov(i,e){let t=dr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function lv(i,e){let t=dr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function cv(i,e){i.uniform1iv(this.addr,e)}function hv(i,e){i.uniform2iv(this.addr,e)}function uv(i,e){i.uniform3iv(this.addr,e)}function dv(i,e){i.uniform4iv(this.addr,e)}function fv(i,e){i.uniform1uiv(this.addr,e)}function pv(i,e){i.uniform2uiv(this.addr,e)}function mv(i,e){i.uniform3uiv(this.addr,e)}function gv(i,e){i.uniform4uiv(this.addr,e)}function bv(i,e,t){let n=this.cache,s=e.length,r=Ol(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Eh:a=Zf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function xv(i,e,t){let n=this.cache,s=e.length,r=Ol(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ep,r[a])}function vv(i,e,t){let n=this.cache,s=e.length,r=Ol(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||tp,r[a])}function _v(i,e,t){let n=this.cache,s=e.length,r=Ol(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Qf,r[a])}function yv(i){switch(i){case 5126:return nv;case 35664:return iv;case 35665:return sv;case 35666:return rv;case 35674:return av;case 35675:return ov;case 35676:return lv;case 5124:case 35670:return cv;case 35667:case 35671:return hv;case 35668:case 35672:return uv;case 35669:case 35673:return dv;case 5125:return fv;case 36294:return pv;case 36295:return mv;case 36296:return gv;case 35678:case 36198:case 36298:case 36306:case 35682:return bv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return vv;case 36289:case 36303:case 36311:case 36292:return _v}}var Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tv(t.type)}},Rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yv(t.type)}},Ch=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},wh=/(\w+)(\])?(\[|\.)?/g;function kf(i,e){i.seq.push(e),i.map[e.id]=e}function Sv(i,e,t){let n=i.name,s=n.length;for(wh.lastIndex=0;;){let r=wh.exec(n),a=wh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){kf(t,l===void 0?new Ah(o,i,e):new Rh(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Ch(o),kf(t,u)),t=u}}}var ur=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Sv(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Bf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Mv=37297,wv=0;function Tv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var zf=new ze;function Ev(i){Xe._getMatrix(zf,Xe.workingColorSpace,i);let e=`mat3( ${zf.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(i)){case kr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Gf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Tv(i.getShaderSource(e),o)}else return r}function Av(i,e){let t=Ev(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Rv={[Zc]:"Linear",[Qc]:"Reinhard",[eh]:"Cineon",[th]:"ACESFilmic",[ih]:"AgX",[sh]:"Neutral",[nh]:"Custom"};function Cv(i,e){let t=Rv[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Dl=new O;function Pv(){Xe.getLuminanceCoefficients(Dl);let i=Dl.x.toFixed(4),e=Dl.y.toFixed(4),t=Dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Iv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wa).join(`
`)}function Dv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Lv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function wa(i){return i!==""}function Vf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ph(i){return i.replace(Nv,Uv)}var Fv=new Map;function Uv(i,e){let t=je[e];if(t===void 0){let n=Fv.get(e);if(n!==void 0)t=je[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ph(t)}var Ov=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wf(i){return i.replace(Ov,kv)}function kv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $f(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Bv={[da]:"SHADOWMAP_TYPE_PCF",[ir]:"SHADOWMAP_TYPE_VSM"};function zv(i){return Bv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gv={[Vi]:"ENVMAP_TYPE_CUBE",[cs]:"ENVMAP_TYPE_CUBE",[fa]:"ENVMAP_TYPE_CUBE_UV"};function Vv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Gv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Hv={[cs]:"ENVMAP_MODE_REFRACTION"};function Wv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Hv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var $v={[Vo]:"ENVMAP_BLENDING_MULTIPLY",[lf]:"ENVMAP_BLENDING_MIX",[cf]:"ENVMAP_BLENDING_ADD"};function qv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":$v[i.combine]||"ENVMAP_BLENDING_NONE"}function jv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=zv(t),l=Vv(t),h=Wv(t),u=qv(t),d=jv(t),f=Iv(t),b=Dv(r),v=s.createProgram(),m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(wa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(wa).join(`
`),p.length>0&&(p+=`
`)):(m=[$f(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wa).join(`
`),p=[$f(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?je.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Cv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Av("linearToOutputTexel",t.outputColorSpace),Pv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wa).join(`
`)),a=Ph(a),a=Vf(a,t),a=Hf(a,t),o=Ph(o),o=Vf(o,t),o=Hf(o,t),a=Wf(a),o=Wf(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=S+m+a,_=S+p+o,M=Bf(s,s.VERTEX_SHADER,A),E=Bf(s,s.FRAGMENT_SHADER,_);s.attachShader(v,M),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(L){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(v)||"",G=s.getShaderInfoLog(M)||"",N=s.getShaderInfoLog(E)||"",V=z.trim(),Y=G.trim(),X=N.trim(),ie=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,M,E);else{let K=Gf(s,M,"vertex"),te=Gf(s,E,"fragment");ke("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+K+`
`+te)}else V!==""?Pe("WebGLProgram: Program Info Log:",V):(Y===""||X==="")&&(j=!1);j&&(L.diagnostics={runnable:ie,programLog:V,vertexShader:{log:Y,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(M),s.deleteShader(E),x=new ur(s,v),T=Lv(s,v)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(v,Mv)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=E,this}var Kv=0,Ih=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Dh(e),t.set(e,n)),n}},Dh=class{constructor(e){this.id=Kv++,this.code=e,this.usedTimes=0}};function Yv(i){return i===Wi||i===xa||i===va}function Jv(i,e,t,n,s,r){let a=new $s,o=new Ih,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,T,I,L,z,G){let N=L.fog,V=z.geometry,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ie=e.get(x.envMap||Y,X),j=ie&&ie.mapping===fa?ie.image.height:null,K=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Pe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let te=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,_e=te!==void 0?te.length:0,me=0;V.morphAttributes.position!==void 0&&(me=1),V.morphAttributes.normal!==void 0&&(me=2),V.morphAttributes.color!==void 0&&(me=3);let Ge,Ae,Be,ee;if(K){let bt=si[K];Ge=bt.vertexShader,Ae=bt.fragmentShader}else{Ge=x.vertexShader,Ae=x.fragmentShader;let bt=o.getVertexShaderStage(x),it=o.getFragmentShaderStage(x);o.update(x,bt,it),Be=bt.id,ee=it.id}let ne=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Ue=z.isInstancedMesh===!0,de=z.isBatchedMesh===!0,we=!!x.map,at=!!x.matcap,Oe=!!ie,Qe=!!x.aoMap,ot=!!x.lightMap,$e=!!x.bumpMap&&x.wireframe===!1,ut=!!x.normalMap,Tt=!!x.displacementMap,Ht=!!x.emissiveMap,gt=!!x.metalnessMap,St=!!x.roughnessMap,k=x.anisotropy>0,Ut=x.clearcoat>0,C=x.dispersion>0,y=x.retroreflectivity>0,g=x.iridescence>0,P=x.sheen>0,F=x.transmission>0,H=k&&!!x.anisotropyMap,Q=Ut&&!!x.clearcoatMap,re=Ut&&!!x.clearcoatNormalMap,J=Ut&&!!x.clearcoatRoughnessMap,W=g&&!!x.iridescenceMap,ae=g&&!!x.iridescenceThicknessMap,ye=P&&!!x.sheenColorMap,le=P&&!!x.sheenRoughnessMap,ce=!!x.specularMap,xe=!!x.specularColorMap,Fe=!!x.specularIntensityMap,He=F&&!!x.transmissionMap,B=F&&!!x.thicknessMap,he=!!x.gradientMap,se=!!x.alphaMap,ue=x.alphaTest>0,ve=!!x.alphaHash,oe=!!x.extensions,Le=Gn;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Le=i.toneMapping);let Re={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:Ge,fragmentShader:Ae,defines:x.defines,customVertexShaderID:Be,customFragmentShaderID:ee,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:de,batchingColor:de&&z._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&z.instanceColor!==null,instancingMorph:Ue&&z.morphTexture!==null,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Xe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:we,matcap:at,envMap:Oe,envMapMode:Oe&&ie.mapping,envMapCubeUVHeight:j,aoMap:Qe,lightMap:ot,bumpMap:$e,normalMap:ut,displacementMap:Tt,emissiveMap:Ht,normalMapObjectSpace:ut&&x.normalMapType===ff,normalMapTangentSpace:ut&&x.normalMapType===ya,packedNormalMap:ut&&x.normalMapType===ya&&Yv(x.normalMap.format),metalnessMap:gt,roughnessMap:St,anisotropy:k,anisotropyMap:H,clearcoat:Ut,clearcoatMap:Q,clearcoatNormalMap:re,clearcoatRoughnessMap:J,dispersion:C,retroreflection:y,iridescence:g,iridescenceMap:W,iridescenceThicknessMap:ae,sheen:P,sheenColorMap:ye,sheenRoughnessMap:le,specularMap:ce,specularColorMap:xe,specularIntensityMap:Fe,transmission:F,transmissionMap:He,thicknessMap:B,gradientMap:he,opaque:x.transparent===!1&&x.blending===sr&&x.alphaToCoverage===!1,alphaMap:se,alphaTest:ue,alphaHash:ve,combine:x.combine,mapUv:we&&b(x.map.channel),aoMapUv:Qe&&b(x.aoMap.channel),lightMapUv:ot&&b(x.lightMap.channel),bumpMapUv:$e&&b(x.bumpMap.channel),normalMapUv:ut&&b(x.normalMap.channel),displacementMapUv:Tt&&b(x.displacementMap.channel),emissiveMapUv:Ht&&b(x.emissiveMap.channel),metalnessMapUv:gt&&b(x.metalnessMap.channel),roughnessMapUv:St&&b(x.roughnessMap.channel),anisotropyMapUv:H&&b(x.anisotropyMap.channel),clearcoatMapUv:Q&&b(x.clearcoatMap.channel),clearcoatNormalMapUv:re&&b(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&b(x.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&b(x.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&b(x.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&b(x.sheenColorMap.channel),sheenRoughnessMapUv:le&&b(x.sheenRoughnessMap.channel),specularMapUv:ce&&b(x.specularMap.channel),specularColorMapUv:xe&&b(x.specularColorMap.channel),specularIntensityMapUv:Fe&&b(x.specularIntensityMap.channel),transmissionMapUv:He&&b(x.transmissionMap.channel),thicknessMapUv:B&&b(x.thicknessMap.channel),alphaMapUv:se&&b(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ut||k),vertexNormals:!!V.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!V.attributes.uv&&(we||se),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||V.attributes.normal===void 0&&ut===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ge,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:me,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Le,decodeVideoTexture:we&&x.map.isVideoTexture===!0&&Xe.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:Ht&&x.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Kt,flipSided:x.side===sn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:oe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&x.extensions.multiDraw===!0||de)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function m(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)T.push(I),T.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(T,x),S(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function S(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){let T=f[x.type],I;if(T){let L=si[T];I=Ef.clone(L.uniforms)}else I=x.uniforms;return I}function _(x,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new Xv(i,T,x,s),l.push(I),h.set(T,I)),I}function M(x){if(--x.usedTimes===0){let T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function R(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:A,acquireProgram:_,releaseProgram:M,releaseShaderCache:E,programs:l,dispose:R}}function Zv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Qv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,b,v,m,p){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:f,material:b,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:m,group:p},i[e]=S):(S.id=d.id,S.object=d,S.geometry=f,S.material=b,S.materialVariant=a(d),S.groupOrder=v,S.renderOrder=d.renderOrder,S.z=m,S.group=p),e++,S}function c(d,f,b,v,m,p,S){S.reversedDepth===!0&&(m=-m);let A=o(d,f,b,v,m,p);b.transmission>0?n.push(A):b.transparent===!0?s.push(A):t.push(A)}function l(d,f,b,v,m,p){let S=o(d,f,b,v,m,p);b.transmission>0?n.unshift(S):b.transparent===!0?s.unshift(S):t.unshift(S)}function h(d,f){t.length>1&&t.sort(d||Qv),n.length>1&&n.sort(f||qf),s.length>1&&s.sort(f||qf)}function u(){for(let d=e,f=i.length;d<f;d++){let b=i[d];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function e_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new jf,i.set(n,[a])):s>=r.length?(a=new jf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function t_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new O,color:new Ie};break;case"SpotLight":t={position:new O,direction:new O,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function n_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var i_=0;function s_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function r_(i){let e=new t_,t=n_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);let s=new O,r=new Ve,a=new Ve;function o(l){let h=0,u=0,d=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let f=0,b=0,v=0,m=0,p=0,S=0,A=0,_=0,M=0,E=0,R=0,x=0,T=0,I=0;l.sort(s_);for(let z=0,G=l.length;z<G;z++){let N=l[z],V=N.color,Y=N.intensity,X=N.distance,ie=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Wi?ie=N.shadow.map.texture:ie=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=V.r*Y,u+=V.g*Y,d+=V.b*Y;else if(N.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(N.sh.coefficients[j],Y);I++}else if(N.isSunLight){let j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,te=t.get(N);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[b]=te,n.sunShadowMap[b]=ie;let _e=K.getViewportCount();for(let me=0;me<_e;me++)n.sunShadowMatrix[v+me]=K.getMatrix(me),n.sunShadowCascade[v+me]=K._cascadeData[me];v+=_e,b++}n.sun[f]=j,f++}else if(N.isDirectionalLight){let j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,te=t.get(N);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,n.directionalShadow[m]=te,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=N.shadow.matrix,M++}n.directional[m]=j,m++}else if(N.isSpotLight){let j=e.get(N);j.position.setFromMatrixPosition(N.matrixWorld),j.color.copy(V).multiplyScalar(Y),j.distance=X,j.coneCos=Math.cos(N.angle),j.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),j.decay=N.decay,n.spot[S]=j;let K=N.shadow;if(N.map&&(n.spotLightMap[x]=N.map,x++,K.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[S]=K.matrix,N.castShadow){let te=t.get(N);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,n.spotShadow[S]=te,n.spotShadowMap[S]=ie,R++}S++}else if(N.isRectAreaLight){let j=e.get(N);j.color.copy(V).multiplyScalar(Y),j.halfWidth.set(N.width*.5,0,0),j.halfHeight.set(0,N.height*.5,0),n.rectArea[A]=j,A++}else if(N.isPointLight){let j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),j.distance=N.distance,j.decay=N.decay,N.castShadow){let K=N.shadow,te=t.get(N);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,te.shadowCameraNear=K.camera.near,te.shadowCameraFar=K.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=ie,n.pointShadowMatrix[p]=N.shadow.matrix,E++}n.point[p]=j,p++}else if(N.isHemisphereLight){let j=e.get(N);j.skyColor.copy(N.color).multiplyScalar(Y),j.groundColor.copy(N.groundColor).multiplyScalar(Y),n.hemi[_]=j,_++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let L=n.hash;(L.sunLength!==f||L.directionalLength!==m||L.pointLength!==p||L.spotLength!==S||L.rectAreaLength!==A||L.hemiLength!==_||L.numSunShadows!==b||L.numDirectionalShadows!==M||L.numPointShadows!==E||L.numSpotShadows!==R||L.numSpotMaps!==x||L.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=m,n.spot.length=S,n.rectArea.length=A,n.point.length=p,n.hemi.length=_,n.sunShadow.length=b,n.sunShadowMap.length=b,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=I,L.sunLength=f,L.directionalLength=m,L.pointLength=p,L.spotLength=S,L.rectAreaLength=A,L.hemiLength=_,L.numSunShadows=b,L.numDirectionalShadows=M,L.numPointShadows=E,L.numSpotShadows=R,L.numSpotMaps=x,L.numLightProbes=I,n.version=i_++)}function c(l,h){let u=0,d=0,f=0,b=0,v=0,m=0,p=h.matrixWorldInverse;for(let S=0,A=l.length;S<A;S++){let _=l[S];if(_.isSunLight){let M=n.sun[u];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(p),u++}else if(_.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(_.isSpotLight){let M=n.spot[b];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),b++}else if(_.isRectAreaLight){let M=n.rectArea[v];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(_.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Xf(i){let e=new r_(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function a_(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Xf(i),e.set(s,[o])):r>=a.length?(o=new Xf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var o_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l_=`uniform sampler2D shadow_pass;
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
}`,c_=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],h_=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Kf=new Ve,Ma=new O,Th=new O;function u_(i,e,t){let n=new Js,s=new Ne,r=new Ne,a=new ct,o=new Io,c=new Do,l={},h=t.maxTextureSize,u={[ti]:sn,[sn]:ti,[Kt]:Kt},d=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:o_,fragmentShader:l_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let b=new Mt;b.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Ct(b,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=da;let p=this.type;this.render=function(E,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Vd&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=da);let T=i.getRenderTarget(),I=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),z=i.state;z.setBlending(ni),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let G=p!==this.type;G&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(V=>V.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,V=E.length;N<V;N++){let Y=E[N],X=Y.shadow;if(X===void 0){Pe("WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let ie=X.getFrameExtents();s.multiply(ie),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,X.mapSize.y=r.y));let j=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=j,X.map===null||G===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===ir){if(Y.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new ln(s.x,s.y,{format:Wi,type:Wn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),X.map.texture.name=Y.name+".shadowMap",X.map.depthTexture=new Oi(s.x,s.y,vn),X.map.depthTexture.name=Y.name+".shadowMapDepth",X.map.depthTexture.format=Kn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=At,X.map.depthTexture.magFilter=At}else Y.isPointLight?(X.map=new Nl(s.x),X.map.depthTexture=new Co(s.x,Hn)):(X.map=new ln(s.x,s.y),X.map.depthTexture=new Oi(s.x,s.y,Hn)),X.map.depthTexture.name=Y.name+".shadowMap",X.map.depthTexture.format=Kn,this.type===da?(X.map.depthTexture.compareFunction=j?Pl:Cl,X.map.depthTexture.minFilter=Rt,X.map.depthTexture.magFilter=Rt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=At,X.map.depthTexture.magFilter=At);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let K=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();Y.isPointLight!==!0&&X.updateMatrices(Y,x);for(let te=0;te<K;te++){let _e=X.getCamera(te);if(Y.isPointLight){let me=X.camera,Ge=X.matrix,Ae=Y.distance||me.far;Ae!==me.far&&(me.far=Ae,me.updateProjectionMatrix()),Ma.setFromMatrixPosition(Y.matrixWorld),me.position.copy(Ma),Th.copy(me.position),Th.add(c_[te]),me.up.copy(h_[te]),me.lookAt(Th),me.updateMatrixWorld(),Ge.makeTranslation(-Ma.x,-Ma.y,-Ma.z),Kf.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Kf,me.coordinateSystem,me.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,te),i.clear();else{te===0&&(i.setRenderTarget(X.map),i.clear());let me=X.getViewport(te);a.set(r.x*me.x,r.y*me.y,r.x*me.z,r.y*me.w),z.viewport(a)}n=X.getFrustum(te),_(R,x,_e,Y,this.type)}X.isPointLightShadow!==!0&&this.type===ir&&S(X,x),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,I,L)};function S(E,R){let x=e.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new ln(s.x,s.y,{format:Wi,type:Wn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,x,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,x,f,v,null)}function A(E,R,x,T){let I=null,L=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)I=L;else if(I=x.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let z=I.uuid,G=R.uuid,N=l[z];N===void 0&&(N={},l[z]=N);let V=N[G];V===void 0&&(V=I.clone(),N[G]=V,R.addEventListener("dispose",M)),I=V}if(I.visible=R.visible,I.wireframe=R.wireframe,T===ir?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:u[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let z=i.properties.get(I);z.light=x}return I}function _(E,R,x,T,I){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===ir)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);let G=e.update(E),N=E.material;if(Array.isArray(N)){let V=G.groups;for(let Y=0,X=V.length;Y<X;Y++){let ie=V[Y],j=N[ie.materialIndex];if(j&&j.visible){let K=A(E,j,T,I);E.onBeforeShadow(i,E,R,x,G,K,ie),i.renderBufferDirect(x,null,G,K,E,ie),E.onAfterShadow(i,E,R,x,G,K,ie)}}}else if(N.visible){let V=A(E,N,T,I);E.onBeforeShadow(i,E,R,x,G,V,null),i.renderBufferDirect(x,null,G,V,E,null),E.onAfterShadow(i,E,R,x,G,V,null)}}let z=E.children;for(let G=0,N=z.length;G<N;G++)_(z[G],R,x,T,I)}function M(E){E.target.removeEventListener("dispose",M);for(let x in l){let T=l[x],I=E.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function d_(i,e){function t(){let B=!1,he=new ct,se=null,ue=new ct(0,0,0,0);return{setMask:function(ve){se!==ve&&!B&&(i.colorMask(ve,ve,ve,ve),se=ve)},setLocked:function(ve){B=ve},setClear:function(ve,oe,Le,Re,bt){bt===!0&&(ve*=Re,oe*=Re,Le*=Re),he.set(ve,oe,Le,Re),ue.equals(he)===!1&&(i.clearColor(ve,oe,Le,Re),ue.copy(he))},reset:function(){B=!1,se=null,ue.set(-1,0,0,0)}}}function n(){let B=!1,he=!1,se=null,ue=null,ve=null;return{setReversed:function(oe){if(he!==oe){let Le=e.get("EXT_clip_control");oe?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),he=oe;let Re=ve;ve=null,this.setClear(Re)}},getReversed:function(){return he},setTest:function(oe){oe?ne(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(oe){se!==oe&&!B&&(i.depthMask(oe),se=oe)},setFunc:function(oe){if(he&&(oe=wf[oe]),ue!==oe){switch(oe){case bo:i.depthFunc(i.NEVER);break;case xo:i.depthFunc(i.ALWAYS);break;case vo:i.depthFunc(i.LESS);break;case Bs:i.depthFunc(i.LEQUAL);break;case _o:i.depthFunc(i.EQUAL);break;case yo:i.depthFunc(i.GEQUAL);break;case So:i.depthFunc(i.GREATER);break;case Mo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=oe}},setLocked:function(oe){B=oe},setClear:function(oe){ve!==oe&&(ve=oe,he&&(oe=1-oe),i.clearDepth(oe))},reset:function(){B=!1,se=null,ue=null,ve=null,he=!1}}}function s(){let B=!1,he=null,se=null,ue=null,ve=null,oe=null,Le=null,Re=null,bt=null;return{setTest:function(it){B||(it?ne(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(it){he!==it&&!B&&(i.stencilMask(it),he=it)},setFunc:function(it,In,$n){(se!==it||ue!==In||ve!==$n)&&(i.stencilFunc(it,In,$n),se=it,ue=In,ve=$n)},setOp:function(it,In,$n){(oe!==it||Le!==In||Re!==$n)&&(i.stencilOp(it,In,$n),oe=it,Le=In,Re=$n)},setLocked:function(it){B=it},setClear:function(it){bt!==it&&(i.clearStencil(it),bt=it)},reset:function(){B=!1,he=null,se=null,ue=null,ve=null,oe=null,Le=null,Re=null,bt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,b=[],v=null,m=!1,p=null,S=null,A=null,_=null,M=null,E=null,R=null,x=new Ie(0,0,0),T=0,I=!1,L=null,z=null,G=null,N=null,V=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,ie=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=ie>=1):j.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=ie>=2);let K=null,te={},_e=i.getParameter(i.SCISSOR_BOX),me=i.getParameter(i.VIEWPORT),Ge=new ct().fromArray(_e),Ae=new ct().fromArray(me);function Be(B,he,se,ue){let ve=new Uint8Array(4),oe=i.createTexture();i.bindTexture(B,oe),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<se;Le++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(he+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return oe}let ee={};ee[i.TEXTURE_2D]=Be(i.TEXTURE_2D,i.TEXTURE_2D,1),ee[i.TEXTURE_CUBE_MAP]=Be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[i.TEXTURE_2D_ARRAY]=Be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ee[i.TEXTURE_3D]=Be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(Bs),$e(!1),ut(qc),ne(i.CULL_FACE),Qe(ni);function ne(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function ge(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function Ue(B,he){return d[B]!==he?(i.bindFramebuffer(B,he),d[B]=he,B===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=he),B===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=he),!0):!1}function de(B,he){let se=b,ue=!1;if(B){se=f.get(he),se===void 0&&(se=[],f.set(he,se));let ve=B.textures;if(se.length!==ve.length||se[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Le=ve.length;oe<Le;oe++)se[oe]=i.COLOR_ATTACHMENT0+oe;se.length=ve.length,ue=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,ue=!0);ue&&i.drawBuffers(se)}function we(B){return v!==B?(i.useProgram(B),v=B,!0):!1}let at={[ls]:i.FUNC_ADD,[Wd]:i.FUNC_SUBTRACT,[$d]:i.FUNC_REVERSE_SUBTRACT};at[qd]=i.MIN,at[jd]=i.MAX;let Oe={[Xd]:i.ZERO,[Kd]:i.ONE,[Yd]:i.SRC_COLOR,[Yc]:i.SRC_ALPHA,[nf]:i.SRC_ALPHA_SATURATE,[ef]:i.DST_COLOR,[Zd]:i.DST_ALPHA,[Jd]:i.ONE_MINUS_SRC_COLOR,[Jc]:i.ONE_MINUS_SRC_ALPHA,[tf]:i.ONE_MINUS_DST_COLOR,[Qd]:i.ONE_MINUS_DST_ALPHA,[sf]:i.CONSTANT_COLOR,[rf]:i.ONE_MINUS_CONSTANT_COLOR,[af]:i.CONSTANT_ALPHA,[of]:i.ONE_MINUS_CONSTANT_ALPHA};function Qe(B,he,se,ue,ve,oe,Le,Re,bt,it){if(B===ni){m===!0&&(ge(i.BLEND),m=!1);return}if(m===!1&&(ne(i.BLEND),m=!0),B!==Hd){if(B!==p||it!==I){if((S!==ls||M!==ls)&&(i.blendEquation(i.FUNC_ADD),S=ls,M=ls),it)switch(B){case sr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jc:i.blendFunc(i.ONE,i.ONE);break;case Xc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ke("WebGLState: Invalid blending: ",B);break}else switch(B){case sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xc:ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kc:ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ke("WebGLState: Invalid blending: ",B);break}A=null,_=null,E=null,R=null,x.set(0,0,0),T=0,p=B,I=it}return}ve=ve||he,oe=oe||se,Le=Le||ue,(he!==S||ve!==M)&&(i.blendEquationSeparate(at[he],at[ve]),S=he,M=ve),(se!==A||ue!==_||oe!==E||Le!==R)&&(i.blendFuncSeparate(Oe[se],Oe[ue],Oe[oe],Oe[Le]),A=se,_=ue,E=oe,R=Le),(Re.equals(x)===!1||bt!==T)&&(i.blendColor(Re.r,Re.g,Re.b,bt),x.copy(Re),T=bt),p=B,I=!1}function ot(B,he){B.side===Kt?ge(i.CULL_FACE):ne(i.CULL_FACE);let se=B.side===sn;he&&(se=!se),$e(se),B.blending===sr&&B.transparent===!1?Qe(ni):Qe(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);let ue=B.stencilWrite;o.setTest(ue),ue&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ht(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function $e(B){L!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),L=B)}function ut(B){B!==zd?(ne(i.CULL_FACE),B!==z&&(B===qc?i.cullFace(i.BACK):B===Gd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),z=B}function Tt(B){B!==G&&(X&&i.lineWidth(B),G=B)}function Ht(B,he,se){B?(ne(i.POLYGON_OFFSET_FILL),(N!==he||V!==se)&&(N=he,V=se,a.getReversed()&&(he=-he),i.polygonOffset(he,se))):ge(i.POLYGON_OFFSET_FILL)}function gt(B){B?ne(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function St(B){B===void 0&&(B=i.TEXTURE0+Y-1),K!==B&&(i.activeTexture(B),K=B)}function k(B,he,se){se===void 0&&(K===null?se=i.TEXTURE0+Y-1:se=K);let ue=te[se];ue===void 0&&(ue={type:void 0,texture:void 0},te[se]=ue),(ue.type!==B||ue.texture!==he)&&(K!==se&&(i.activeTexture(se),K=se),i.bindTexture(B,he||ee[B]),ue.type=B,ue.texture=he)}function Ut(){let B=te[K];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function C(){try{i.compressedTexImage2D(...arguments)}catch(B){ke("WebGLState:",B)}}function y(){try{i.compressedTexImage3D(...arguments)}catch(B){ke("WebGLState:",B)}}function g(){try{i.texSubImage2D(...arguments)}catch(B){ke("WebGLState:",B)}}function P(){try{i.texSubImage3D(...arguments)}catch(B){ke("WebGLState:",B)}}function F(){try{i.compressedTexSubImage2D(...arguments)}catch(B){ke("WebGLState:",B)}}function H(){try{i.compressedTexSubImage3D(...arguments)}catch(B){ke("WebGLState:",B)}}function Q(){try{i.texStorage2D(...arguments)}catch(B){ke("WebGLState:",B)}}function re(){try{i.texStorage3D(...arguments)}catch(B){ke("WebGLState:",B)}}function J(){try{i.texImage2D(...arguments)}catch(B){ke("WebGLState:",B)}}function W(){try{i.texImage3D(...arguments)}catch(B){ke("WebGLState:",B)}}function ae(B){return u[B]!==void 0?u[B]:i.getParameter(B)}function ye(B,he){u[B]!==he&&(i.pixelStorei(B,he),u[B]=he)}function le(B){Ge.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),Ge.copy(B))}function ce(B){Ae.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Ae.copy(B))}function xe(B,he){let se=l.get(he);se===void 0&&(se=new WeakMap,l.set(he,se));let ue=se.get(B);ue===void 0&&(ue=i.getUniformBlockIndex(he,B.name),se.set(B,ue))}function Fe(B,he){let ue=l.get(he).get(B);c.get(he)!==ue&&(i.uniformBlockBinding(he,ue,B.__bindingPointIndex),c.set(he,ue))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},K=null,te={},d={},f=new WeakMap,b=[],v=null,m=!1,p=null,S=null,A=null,_=null,M=null,E=null,R=null,x=new Ie(0,0,0),T=0,I=!1,L=null,z=null,G=null,N=null,V=null,Ge.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:ge,bindFramebuffer:Ue,drawBuffers:de,useProgram:we,setBlending:Qe,setMaterial:ot,setFlipSided:$e,setCullFace:ut,setLineWidth:Tt,setPolygonOffset:Ht,setScissorTest:gt,activeTexture:St,bindTexture:k,unbindTexture:Ut,compressedTexImage2D:C,compressedTexImage3D:y,texImage2D:J,texImage3D:W,pixelStorei:ye,getParameter:ae,updateUBOMapping:xe,uniformBlockBinding:Fe,texStorage2D:Q,texStorage3D:re,texSubImage2D:g,texSubImage3D:P,compressedTexSubImage2D:F,compressedTexSubImage3D:H,scissor:le,viewport:ce,reset:He}}function f_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ne,h=new WeakMap,u=new Set,d,f=new WeakMap,b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(y,g){return b?new OffscreenCanvas(y,g):Vs("canvas")}function m(y,g,P){let F=1,H=C(y);if((H.width>P||H.height>P)&&(F=P/Math.max(H.width,H.height)),F<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){let Q=Math.floor(F*H.width),re=Math.floor(F*H.height);d===void 0&&(d=v(Q,re));let J=g?v(Q,re):d;return J.width=Q,J.height=re,J.getContext("2d").drawImage(y,0,0,Q,re),Pe("WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+Q+"x"+re+")."),J}else return"data"in y&&Pe("WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),y;return y}function p(y){return y.generateMipmaps}function S(y){i.generateMipmap(y)}function A(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(y,g,P,F,H,Q=!1){if(y!==null){if(i[y]!==void 0)return i[y];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let re;F&&(re=e.get("EXT_texture_norm16"),re||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=g;if(g===i.RED&&(P===i.FLOAT&&(J=i.R32F),P===i.HALF_FLOAT&&(J=i.R16F),P===i.UNSIGNED_BYTE&&(J=i.R8),P===i.UNSIGNED_SHORT&&re&&(J=re.R16_EXT),P===i.SHORT&&re&&(J=re.R16_SNORM_EXT)),g===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.R8UI),P===i.UNSIGNED_SHORT&&(J=i.R16UI),P===i.UNSIGNED_INT&&(J=i.R32UI),P===i.BYTE&&(J=i.R8I),P===i.SHORT&&(J=i.R16I),P===i.INT&&(J=i.R32I)),g===i.RG&&(P===i.FLOAT&&(J=i.RG32F),P===i.HALF_FLOAT&&(J=i.RG16F),P===i.UNSIGNED_BYTE&&(J=i.RG8),P===i.UNSIGNED_SHORT&&re&&(J=re.RG16_EXT),P===i.SHORT&&re&&(J=re.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.RG8UI),P===i.UNSIGNED_SHORT&&(J=i.RG16UI),P===i.UNSIGNED_INT&&(J=i.RG32UI),P===i.BYTE&&(J=i.RG8I),P===i.SHORT&&(J=i.RG16I),P===i.INT&&(J=i.RG32I)),g===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.RGB8UI),P===i.UNSIGNED_SHORT&&(J=i.RGB16UI),P===i.UNSIGNED_INT&&(J=i.RGB32UI),P===i.BYTE&&(J=i.RGB8I),P===i.SHORT&&(J=i.RGB16I),P===i.INT&&(J=i.RGB32I)),g===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),P===i.UNSIGNED_INT&&(J=i.RGBA32UI),P===i.BYTE&&(J=i.RGBA8I),P===i.SHORT&&(J=i.RGBA16I),P===i.INT&&(J=i.RGBA32I)),g===i.RGB&&(P===i.UNSIGNED_SHORT&&re&&(J=re.RGB16_EXT),P===i.SHORT&&re&&(J=re.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),g===i.RGBA){let W=Q?kr:Xe.getTransfer(H);P===i.FLOAT&&(J=i.RGBA32F),P===i.HALF_FLOAT&&(J=i.RGBA16F),P===i.UNSIGNED_BYTE&&(J=W===rt?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&re&&(J=re.RGBA16_EXT),P===i.SHORT&&re&&(J=re.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function M(y,g){let P;return y?g===null||g===Hn||g===or?P=i.DEPTH24_STENCIL8:g===vn?P=i.DEPTH32F_STENCIL8:g===ar&&(P=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Hn||g===or?P=i.DEPTH_COMPONENT24:g===vn?P=i.DEPTH_COMPONENT32F:g===ar&&(P=i.DEPTH_COMPONENT16),P}function E(y,g){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==At&&y.minFilter!==Rt?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function R(y){let g=y.target;g.removeEventListener("dispose",R),T(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&u.delete(g)}function x(y){let g=y.target;g.removeEventListener("dispose",x),L(g)}function T(y){let g=n.get(y);if(g.__webglInit===void 0)return;let P=y.source,F=f.get(P);if(F){let H=F[g.__cacheKey];H.usedTimes--,H.usedTimes===0&&I(y),Object.keys(F).length===0&&f.delete(P)}n.remove(y)}function I(y){let g=n.get(y);i.deleteTexture(g.__webglTexture);let P=y.source,F=f.get(P);delete F[g.__cacheKey],a.memory.textures--}function L(y){let g=n.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),n.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(g.__webglFramebuffer[F]))for(let H=0;H<g.__webglFramebuffer[F].length;H++)i.deleteFramebuffer(g.__webglFramebuffer[F][H]);else i.deleteFramebuffer(g.__webglFramebuffer[F]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[F])}else{if(Array.isArray(g.__webglFramebuffer))for(let F=0;F<g.__webglFramebuffer.length;F++)i.deleteFramebuffer(g.__webglFramebuffer[F]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let F=0;F<g.__webglColorRenderbuffer.length;F++)g.__webglColorRenderbuffer[F]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[F]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let P=y.textures;for(let F=0,H=P.length;F<H;F++){let Q=n.get(P[F]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),n.remove(P[F])}n.remove(y)}let z=0;function G(){z=0}function N(){return z}function V(y){z=y}function Y(){let y=z;return y>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+(y+1)+" texture units while this GPU supports only "+s.maxTextures),z+=1,y}function X(y){let g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function ie(y,g){let P=n.get(y);if(y.isVideoTexture&&k(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&P.__version!==y.version){let F=y.image;if(F===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{ge(P,y,g);return}}else y.isExternalTexture&&(P.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+g)}function j(y,g){let P=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&P.__version!==y.version){ge(P,y,g);return}else y.isExternalTexture&&(P.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+g)}function K(y,g){let P=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&P.__version!==y.version){ge(P,y,g);return}t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+g)}function te(y,g){let P=n.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&P.__version!==y.version){Ue(P,y,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+g)}let _e={[Ui]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[zs]:i.MIRRORED_REPEAT},me={[At]:i.NEAREST,[$o]:i.NEAREST_MIPMAP_NEAREST,[hs]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[rr]:i.LINEAR_MIPMAP_NEAREST,[Vn]:i.LINEAR_MIPMAP_LINEAR},Ge={[mf]:i.NEVER,[_f]:i.ALWAYS,[gf]:i.LESS,[Cl]:i.LEQUAL,[bf]:i.EQUAL,[Pl]:i.GEQUAL,[xf]:i.GREATER,[vf]:i.NOTEQUAL};function Ae(y,g){if(g.type===vn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Rt||g.magFilter===rr||g.magFilter===hs||g.magFilter===Vn||g.minFilter===Rt||g.minFilter===rr||g.minFilter===hs||g.minFilter===Vn)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,_e[g.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,_e[g.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,_e[g.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,me[g.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,me[g.minFilter]),g.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,Ge[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===At||g.minFilter!==hs&&g.minFilter!==Vn||g.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(y,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Be(y,g){let P=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",R));let F=g.source,H=f.get(F);H===void 0&&(H={},f.set(F,H));let Q=X(g);if(Q!==y.__cacheKey){H[Q]===void 0&&(H[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),H[Q].usedTimes++;let re=H[y.__cacheKey];re!==void 0&&(H[y.__cacheKey].usedTimes--,re.usedTimes===0&&I(g)),y.__cacheKey=Q,y.__webglTexture=H[Q].texture}return P}function ee(y,g,P){return Math.floor(Math.floor(y/P)/g)}function ne(y,g,P,F){let Q=y.updateRanges;if(Q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,P,F,g.data);else{Q.sort((ye,le)=>ye.start-le.start);let re=0;for(let ye=1;ye<Q.length;ye++){let le=Q[re],ce=Q[ye],xe=le.start+le.count,Fe=ee(ce.start,g.width,4),He=ee(le.start,g.width,4);ce.start<=xe+1&&Fe===He&&ee(ce.start+ce.count-1,g.width,4)===Fe?le.count=Math.max(le.count,ce.start+ce.count-le.start):(++re,Q[re]=ce)}Q.length=re+1;let J=t.getParameter(i.UNPACK_ROW_LENGTH),W=t.getParameter(i.UNPACK_SKIP_PIXELS),ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let ye=0,le=Q.length;ye<le;ye++){let ce=Q[ye],xe=Math.floor(ce.start/4),Fe=Math.ceil(ce.count/4),He=xe%g.width,B=Math.floor(xe/g.width),he=Fe,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,He),t.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,He,B,he,se,P,F,g.data)}y.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,W),t.pixelStorei(i.UNPACK_SKIP_ROWS,ae)}}function ge(y,g,P){let F=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(F=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(F=i.TEXTURE_3D);let H=Be(y,g),Q=g.source;t.bindTexture(F,y.__webglTexture,i.TEXTURE0+P);let re=n.get(Q);if(Q.version!==re.__version||H===!0){if(t.activeTexture(i.TEXTURE0+P),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let se=Xe.getPrimaries(Xe.workingColorSpace),ue=g.colorSpace===Si?null:Xe.getPrimaries(g.colorSpace),ve=g.colorSpace===Si||se===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let W=m(g.image,!1,s.maxTextureSize);W=Ut(g,W);let ae=r.convert(g.format,g.colorSpace),ye=r.convert(g.type),le=_(g.internalFormat,ae,ye,g.normalized,g.colorSpace,g.isVideoTexture);Ae(F,g);let ce,xe=g.mipmaps,Fe=g.isVideoTexture!==!0,He=re.__version===void 0||H===!0,B=Q.dataReady,he=E(g,W);if(g.isDepthTexture)le=M(g.format===Hi,g.type),He&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,le,W.width,W.height):t.texImage2D(i.TEXTURE_2D,0,le,W.width,W.height,0,ae,ye,null));else if(g.isDataTexture)if(xe.length>0){Fe&&He&&t.texStorage2D(i.TEXTURE_2D,he,le,xe[0].width,xe[0].height);for(let se=0,ue=xe.length;se<ue;se++)ce=xe[se],Fe?B&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ce.width,ce.height,ae,ye,ce.data):t.texImage2D(i.TEXTURE_2D,se,le,ce.width,ce.height,0,ae,ye,ce.data);g.generateMipmaps=!1}else Fe?(He&&t.texStorage2D(i.TEXTURE_2D,he,le,W.width,W.height),B&&ne(g,W,ae,ye)):t.texImage2D(i.TEXTURE_2D,0,le,W.width,W.height,0,ae,ye,W.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Fe&&He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,le,xe[0].width,xe[0].height,W.depth);for(let se=0,ue=xe.length;se<ue;se++)if(ce=xe[se],g.format!==_n)if(ae!==null)if(Fe){if(B)if(g.layerUpdates.size>0){let ve=vh(ce.width,ce.height,g.format,g.type);for(let oe of g.layerUpdates){let Le=ce.data.subarray(oe*ve/ce.data.BYTES_PER_ELEMENT,(oe+1)*ve/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,oe,ce.width,ce.height,1,ae,Le)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ce.width,ce.height,W.depth,ae,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,le,ce.width,ce.height,W.depth,0,ce.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ce.width,ce.height,W.depth,ae,ye,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,le,ce.width,ce.height,W.depth,0,ae,ye,ce.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Fe&&He&&t.texStorage2D(i.TEXTURE_2D,he,le,xe[0].width,xe[0].height);for(let se=0,ue=xe.length;se<ue;se++)ce=xe[se],g.format!==_n?ae!==null?Fe?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,ce.width,ce.height,ae,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,se,le,ce.width,ce.height,0,ce.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?B&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ce.width,ce.height,ae,ye,ce.data):t.texImage2D(i.TEXTURE_2D,se,le,ce.width,ce.height,0,ae,ye,ce.data)}else if(g.isDataArrayTexture)if(Fe){if(He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,le,W.width,W.height,W.depth),B)if(g.layerUpdates.size>0){let se=vh(W.width,W.height,g.format,g.type);for(let ue of g.layerUpdates){let ve=W.data.subarray(ue*se/W.data.BYTES_PER_ELEMENT,(ue+1)*se/W.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ue,W.width,W.height,1,ae,ye,ve)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,ae,ye,W.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,W.width,W.height,W.depth,0,ae,ye,W.data);else if(g.isData3DTexture)Fe?(He&&t.texStorage3D(i.TEXTURE_3D,he,le,W.width,W.height,W.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,ae,ye,W.data)):t.texImage3D(i.TEXTURE_3D,0,le,W.width,W.height,W.depth,0,ae,ye,W.data);else if(g.isFramebufferTexture){if(He)if(Fe)t.texStorage2D(i.TEXTURE_2D,he,le,W.width,W.height);else{let se=W.width,ue=W.height;for(let ve=0;ve<he;ve++)t.texImage2D(i.TEXTURE_2D,ve,le,se,ue,0,ae,ye,null),se>>=1,ue>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),W.parentNode!==se){se.appendChild(W),u.add(g),se.onpaint=ue=>{let ve=ue.changedElements;for(let oe of u)ve.includes(oe.image)&&(oe.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,W);else{let ve=i.RGBA,oe=i.RGBA,Le=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ve,oe,Le,W)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xe.length>0){if(Fe&&He){let se=C(xe[0]);t.texStorage2D(i.TEXTURE_2D,he,le,se.width,se.height)}for(let se=0,ue=xe.length;se<ue;se++)ce=xe[se],Fe?B&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ae,ye,ce):t.texImage2D(i.TEXTURE_2D,se,le,ae,ye,ce);g.generateMipmaps=!1}else if(Fe){if(He){let se=C(W);t.texStorage2D(i.TEXTURE_2D,he,le,se.width,se.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae,ye,W)}else t.texImage2D(i.TEXTURE_2D,0,le,ae,ye,W);p(g)&&S(F),re.__version=Q.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Ue(y,g,P){if(g.image.length!==6)return;let F=Be(y,g),H=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+P);let Q=n.get(H);if(H.version!==Q.__version||F===!0){t.activeTexture(i.TEXTURE0+P);let re=Xe.getPrimaries(Xe.workingColorSpace),J=g.colorSpace===Si?null:Xe.getPrimaries(g.colorSpace),W=g.colorSpace===Si||re===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);let ae=g.isCompressedTexture||g.image[0].isCompressedTexture,ye=g.image[0]&&g.image[0].isDataTexture,le=[];for(let oe=0;oe<6;oe++)!ae&&!ye?le[oe]=m(g.image[oe],!0,s.maxCubemapSize):le[oe]=ye?g.image[oe].image:g.image[oe],le[oe]=Ut(g,le[oe]);let ce=le[0],xe=r.convert(g.format,g.colorSpace),Fe=r.convert(g.type),He=_(g.internalFormat,xe,Fe,g.normalized,g.colorSpace),B=g.isVideoTexture!==!0,he=Q.__version===void 0||F===!0,se=H.dataReady,ue=E(g,ce);Ae(i.TEXTURE_CUBE_MAP,g);let ve;if(ae){B&&he&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ue,He,ce.width,ce.height);for(let oe=0;oe<6;oe++){ve=le[oe].mipmaps;for(let Le=0;Le<ve.length;Le++){let Re=ve[Le];g.format!==_n?xe!==null?B?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Re.width,Re.height,xe,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,He,Re.width,Re.height,0,Re.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Re.width,Re.height,xe,Fe,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,He,Re.width,Re.height,0,xe,Fe,Re.data)}}}else{if(ve=g.mipmaps,B&&he){ve.length>0&&ue++;let oe=C(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ue,He,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(ye){B?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,le[oe].width,le[oe].height,xe,Fe,le[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,He,le[oe].width,le[oe].height,0,xe,Fe,le[oe].data);for(let Le=0;Le<ve.length;Le++){let bt=ve[Le].image[oe].image;B?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,bt.width,bt.height,xe,Fe,bt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,He,bt.width,bt.height,0,xe,Fe,bt.data)}}else{B?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe,Fe,le[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,He,xe,Fe,le[oe]);for(let Le=0;Le<ve.length;Le++){let Re=ve[Le];B?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,xe,Fe,Re.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,He,xe,Fe,Re.image[oe])}}}p(g)&&S(i.TEXTURE_CUBE_MAP),Q.__version=H.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function de(y,g,P,F,H,Q){let re=r.convert(P.format,P.colorSpace),J=r.convert(P.type),W=_(P.internalFormat,re,J,P.normalized,P.colorSpace),ae=n.get(g),ye=n.get(P);if(ye.__renderTarget=g,!ae.__hasExternalTextures){let le=Math.max(1,g.width>>Q),ce=Math.max(1,g.height>>Q);H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?t.texImage3D(H,Q,W,le,ce,g.depth,0,re,J,null):t.texImage2D(H,Q,W,le,ce,0,re,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),St(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,F,H,ye.__webglTexture,0,gt(g)):(H===i.TEXTURE_2D||H>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,F,H,ye.__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function we(y,g,P){if(i.bindRenderbuffer(i.RENDERBUFFER,y),g.depthBuffer){let F=g.depthTexture,H=F&&F.isDepthTexture?F.type:null,Q=M(g.stencilBuffer,H),re=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;St(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt(g),Q,g.width,g.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt(g),Q,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,Q,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,y)}else{let F=g.textures;for(let H=0;H<F.length;H++){let Q=F[H],re=r.convert(Q.format,Q.colorSpace),J=r.convert(Q.type),W=_(Q.internalFormat,re,J,Q.normalized,Q.colorSpace);St(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt(g),W,g.width,g.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt(g),W,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,W,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function at(y,g,P){let F=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let H=n.get(g.depthTexture);if(H.__renderTarget=g,(!H.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),F){if(H.__webglInit===void 0&&(H.__webglInit=!0,g.depthTexture.addEventListener("dispose",R)),H.__webglTexture===void 0){H.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Ae(i.TEXTURE_CUBE_MAP,g.depthTexture);let ae=r.convert(g.depthTexture.format),ye=r.convert(g.depthTexture.type),le;g.depthTexture.format===Kn?le=i.DEPTH_COMPONENT24:g.depthTexture.format===Hi&&(le=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,le,g.width,g.height,0,ae,ye,null)}}else ie(g.depthTexture,0);let Q=H.__webglTexture,re=gt(g),J=F?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,W=g.depthTexture.format===Hi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Kn)St(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,J,Q,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,W,J,Q,0);else if(g.depthTexture.format===Hi)St(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,J,Q,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,W,J,Q,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Oe(y){let g=n.get(y),P=y.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==y.depthTexture){let F=y.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),F){let H=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,F.removeEventListener("dispose",H)};F.addEventListener("dispose",H),g.__depthDisposeCallback=H}g.__boundDepthTexture=F}if(y.depthTexture&&!g.__autoAllocateDepthBuffer)if(P)for(let F=0;F<6;F++)at(g.__webglFramebuffer[F],y,F);else{let F=y.texture.mipmaps;F&&F.length>0?at(g.__webglFramebuffer[0],y,0):at(g.__webglFramebuffer,y,0)}else if(P){g.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[F]),g.__webglDepthbuffer[F]===void 0)g.__webglDepthbuffer[F]=i.createRenderbuffer(),we(g.__webglDepthbuffer[F],y,!1);else{let H=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=g.__webglDepthbuffer[F];i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,Q)}}else{let F=y.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),we(g.__webglDepthbuffer,y,!1);else{let H=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,Q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Qe(y,g,P){let F=n.get(y);g!==void 0&&de(F.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&Oe(y)}function ot(y){let g=y.texture,P=n.get(y),F=n.get(g);y.addEventListener("dispose",x);let H=y.textures,Q=y.isWebGLCubeRenderTarget===!0,re=H.length>1;if(re||(F.__webglTexture===void 0&&(F.__webglTexture=i.createTexture()),F.__version=g.version,a.memory.textures++),Q){P.__webglFramebuffer=[];for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0){P.__webglFramebuffer[J]=[];for(let W=0;W<g.mipmaps.length;W++)P.__webglFramebuffer[J][W]=i.createFramebuffer()}else P.__webglFramebuffer[J]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){P.__webglFramebuffer=[];for(let J=0;J<g.mipmaps.length;J++)P.__webglFramebuffer[J]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(re)for(let J=0,W=H.length;J<W;J++){let ae=n.get(H[J]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(y.samples>0&&St(y)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let J=0;J<H.length;J++){let W=H[J];P.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[J]);let ae=r.convert(W.format,W.colorSpace),ye=r.convert(W.type),le=_(W.internalFormat,ae,ye,W.normalized,W.colorSpace,y.isXRRenderTarget===!0),ce=gt(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,le,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,P.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),we(P.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture),Ae(i.TEXTURE_CUBE_MAP,g);for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0)for(let W=0;W<g.mipmaps.length;W++)de(P.__webglFramebuffer[J][W],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,W);else de(P.__webglFramebuffer[J],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);p(g)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let J=0,W=H.length;J<W;J++){let ae=H[J],ye=n.get(ae),le=i.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(le=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,ye.__webglTexture),Ae(le,ae),de(P.__webglFramebuffer,y,ae,i.COLOR_ATTACHMENT0+J,le,0),p(ae)&&S(le)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(J=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,F.__webglTexture),Ae(J,g),g.mipmaps&&g.mipmaps.length>0)for(let W=0;W<g.mipmaps.length;W++)de(P.__webglFramebuffer[W],y,g,i.COLOR_ATTACHMENT0,J,W);else de(P.__webglFramebuffer,y,g,i.COLOR_ATTACHMENT0,J,0);p(g)&&S(J),t.unbindTexture()}y.depthBuffer&&Oe(y)}function $e(y){let g=y.textures;for(let P=0,F=g.length;P<F;P++){let H=g[P];if(p(H)){let Q=A(y),re=n.get(H).__webglTexture;t.bindTexture(Q,re),S(Q),t.unbindTexture()}}}let ut=[],Tt=[];function Ht(y){if(y.samples>0){if(St(y)===!1){let g=y.textures,P=y.width,F=y.height,H=i.COLOR_BUFFER_BIT,Q=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=n.get(y),J=g.length>1;if(J)for(let ae=0;ae<g.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);let W=y.texture.mipmaps;W&&W.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let ae=0;ae<g.length;ae++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(H|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(H|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);let ye=n.get(g[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,P,F,0,0,P,F,H,i.NEAREST),c===!0&&(ut.length=0,Tt.length=0,ut.push(i.COLOR_ATTACHMENT0+ae),y.depthBuffer&&y.storeMultisampledDepthBuffer===!1&&(ut.push(Q),Tt.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let ae=0;ae<g.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);let ye=n.get(g[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.storeMultisampledDepthBuffer===!1&&c){let g=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function gt(y){return Math.min(s.maxSamples,y.samples)}function St(y){let g=n.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function k(y){let g=a.render.frame;h.get(y)!==g&&(h.set(y,g),y.update())}function Ut(y,g){let P=y.colorSpace,F=y.format,H=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||P!==en&&P!==Si&&(Xe.getTransfer(P)===rt?(F!==_n||H!==fn)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ke("WebGLTextures: Unsupported texture color space:",P)),g}function C(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=Y,this.resetTextureUnits=G,this.getTextureUnits=N,this.setTextureUnits=V,this.setTexture2D=ie,this.setTexture2DArray=j,this.setTexture3D=K,this.setTextureCube=te,this.rebindTextures=Qe,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function p_(i,e){function t(n,s=Si){let r,a=Xe.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ch)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ah)return i.BYTE;if(n===oh)return i.SHORT;if(n===ar)return i.UNSIGNED_SHORT;if(n===qo)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===Wn)return i.HALF_FLOAT;if(n===hh)return i.ALPHA;if(n===uh)return i.RGB;if(n===_n)return i.RGBA;if(n===Kn)return i.DEPTH_COMPONENT;if(n===Hi)return i.DEPTH_STENCIL;if(n===Ko)return i.RED;if(n===Yo)return i.RED_INTEGER;if(n===Wi)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===Zo)return i.RGBA_INTEGER;if(n===pa||n===ma||n===ga||n===ba)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qo||n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===il||n===sl||n===rl||n===al||n===ol||n===xa||n===ll)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===il||n===sl)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===al)return r.COMPRESSED_R11_EAC;if(n===ol)return r.COMPRESSED_SIGNED_R11_EAC;if(n===xa)return r.COMPRESSED_RG11_EAC;if(n===ll)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===bl||n===xl||n===vl||n===_l||n===yl||n===Sl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ul)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===dl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ml)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_l)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ml||n===wl||n===Tl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ml)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===El||n===Al||n===va||n===Rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===El)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===or?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var m_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g_=`
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

}`,Lh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Yr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new xn({vertexShader:m_,fragmentShader:g_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Zr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nh=class extends Bn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,b=null,v=typeof XRWebGLBinding<"u",m=new Lh,p={},S=t.getContextAttributes(),A=null,_=null,M=[],E=[],R=new Ne,x=null,T=null,I=new Nt;I.viewport=new ct;let L=new Nt;L.viewport=new ct;let z=[I,L],G=new Go,N=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ne=M[ee];return ne===void 0&&(ne=new qs,M[ee]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(ee){let ne=M[ee];return ne===void 0&&(ne=new qs,M[ee]=ne),ne.getGripSpace()},this.getHand=function(ee){let ne=M[ee];return ne===void 0&&(ne=new qs,M[ee]=ne),ne.getHandSpace()};function Y(ee){let ne=E.indexOf(ee.inputSource);if(ne===-1)return;let ge=M[ne];ge!==void 0&&(ge.update(ee.inputSource,ee.frame,l||a),ge.dispatchEvent({type:ee.type,data:ee.inputSource}))}function X(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ie);for(let ee=0;ee<M.length;ee++){let ne=E[ee];ne!==null&&(E[ee]=null,M[ee].disconnect(ne))}N=null,V=null,m.reset();for(let ee in p)delete p[ee];if(e.setRenderTarget(A),f=null,d=null,u=null,s=null,_=null,Be.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),T!==null){let ee=T.camera;ee.fov=T.fov,ee.zoom=T.zoom,ee.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return b},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ie),S.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Ue=null,de=null;S.depth&&(de=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=S.stencil?Hi:Kn,Ue=S.stencil?or:Hn);let we={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(we),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new ln(d.textureWidth,d.textureHeight,{format:_n,type:fn,depthTexture:new Oi(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ge={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new ln(f.framebufferWidth,f.framebufferHeight,{format:_n,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Be.setContext(s),Be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(ee){for(let ne=0;ne<ee.removed.length;ne++){let ge=ee.removed[ne],Ue=E.indexOf(ge);Ue>=0&&(E[Ue]=null,M[Ue].disconnect(ge))}for(let ne=0;ne<ee.added.length;ne++){let ge=ee.added[ne],Ue=E.indexOf(ge);if(Ue===-1){for(let we=0;we<M.length;we++)if(we>=E.length){E.push(ge),Ue=we;break}else if(E[we]===null){E[we]=ge,Ue=we;break}if(Ue===-1)break}let de=M[Ue];de&&de.connect(ge)}}let j=new O,K=new O;function te(ee,ne,ge){j.setFromMatrixPosition(ne.matrixWorld),K.setFromMatrixPosition(ge.matrixWorld);let Ue=j.distanceTo(K),de=ne.projectionMatrix.elements,we=ge.projectionMatrix.elements,at=de[14]/(de[10]-1),Oe=de[14]/(de[10]+1),Qe=(de[9]+1)/de[5],ot=(de[9]-1)/de[5],$e=(de[8]-1)/de[0],ut=(we[8]+1)/we[0],Tt=at*$e,Ht=at*ut,gt=Ue/(-$e+ut),St=gt*-$e;if(ne.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(St),ee.translateZ(gt),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),de[10]===-1)ee.projectionMatrix.copy(ne.projectionMatrix),ee.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let k=at+gt,Ut=Oe+gt,C=Tt-St,y=Ht+(Ue-St),g=Qe*Oe/Ut*k,P=ot*Oe/Ut*k;ee.projectionMatrix.makePerspective(C,y,g,P,k,Ut),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function _e(ee,ne){ne===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ne.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let ne=ee.near,ge=ee.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),G.near=L.near=I.near=ne,G.far=L.far=I.far=ge,(N!==G.near||V!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),N=G.near,V=G.far),G.layers.mask=ee.layers.mask|6,I.layers.mask=G.layers.mask&-5,L.layers.mask=G.layers.mask&-3;let Ue=ee.parent,de=G.cameras;_e(G,Ue);for(let we=0;we<de.length;we++)_e(de[we],Ue);de.length===2?te(G,I,L):G.projectionMatrix.copy(I.projectionMatrix),T===null&&ee.isPerspectiveCamera&&(T={camera:ee,fov:ee.fov,zoom:ee.zoom}),me(ee,G,Ue)};function me(ee,ne,ge){ge===null?ee.matrix.copy(ne.matrixWorld):(ee.matrix.copy(ge.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ne.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ne.projectionMatrix),ee.projectionMatrixInverse.copy(ne.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=ss*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(ee){return p[ee]};let Ge=null;function Ae(ee,ne){if(h=ne.getViewerPose(l||a),b=ne,h!==null){let ge=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Ue=!1;ge.length!==G.cameras.length&&(G.cameras.length=0,Ue=!0);for(let Oe=0;Oe<ge.length;Oe++){let Qe=ge[Oe],ot=null;if(f!==null)ot=f.getViewport(Qe);else{let ut=u.getViewSubImage(d,Qe);ot=ut.viewport,Oe===0&&(e.setRenderTargetTextures(_,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(_))}let $e=z[Oe];$e===void 0&&($e=new Nt,$e.layers.enable(Oe),$e.viewport=new ct,z[Oe]=$e),$e.matrix.fromArray(Qe.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(Qe.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ot.x,ot.y,ot.width,ot.height),Oe===0&&(G.matrix.copy($e.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ue===!0&&G.cameras.push($e)}let de=s.enabledFeatures;if(de&&de.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let Oe=u.getDepthInformation(ge[0]);Oe&&Oe.isValid&&Oe.texture&&m.init(Oe,s.renderState)}if(de&&de.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let Oe=0;Oe<ge.length;Oe++){let Qe=ge[Oe].camera;if(Qe){let ot=p[Qe];ot||(ot=new Yr,p[Qe]=ot);let $e=u.getCameraImage(Qe);ot.sourceTexture=$e}}}}for(let ge=0;ge<M.length;ge++){let Ue=E[ge],de=M[ge];Ue!==null&&de!==void 0&&de.update(Ue,ne,l||a)}Ge&&Ge(ee,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),b=null}let Be=new Yf;Be.setAnimationLoop(Ae),this.setAnimationLoop=function(ee){Ge=ee},this.dispose=function(){}}},b_=new Ve,np=new ze;np.set(-1,0,0,0,1,0,0,0,1);function x_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,gh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,A,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),b(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,S,A):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===sn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===sn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p),A=S.envMap,_=S.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(_)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(np),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=A*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function b(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function v_(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,M){let E=M.program;n.uniformBlockBinding(_,E)}function l(_,M){let E=s[_.id];E===void 0&&(m(_),E=h(_),s[_.id]=E,_.addEventListener("dispose",S));let R=M.program;n.updateUBOMapping(_,R);let x=e.render.frame;r[_.id]!==x&&(d(_),r[_.id]=x)}function h(_){let M=u();_.__bindingPointIndex=M;let E=i.createBuffer(),R=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,E),E}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let M=s[_.id],E=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,T=E.length;x<T;x++){let I=E[x];if(Array.isArray(I))for(let L=0,z=I.length;L<z;L++)f(I[L],x,L,R);else f(I,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,M,E,R){if(v(_,M,E,R)===!0){let x=_.__offset,T=_.value;if(Array.isArray(T)){let I=0;for(let L=0;L<T.length;L++){let z=T[L],G=p(z);b(z,_.__data,I),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(I+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(T,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function b(_,M,E){typeof _=="number"||typeof _=="boolean"?M[0]=_:_.isMatrix3?(M[0]=_.elements[0],M[1]=_.elements[1],M[2]=_.elements[2],M[3]=0,M[4]=_.elements[3],M[5]=_.elements[4],M[6]=_.elements[5],M[7]=0,M[8]=_.elements[6],M[9]=_.elements[7],M[10]=_.elements[8],M[11]=0):ArrayBuffer.isView(_)?M.set(new _.constructor(_.buffer,_.byteOffset,M.length)):_.toArray(M,E)}function v(_,M,E,R){let x=_.value,T=M+"_"+E;if(R[T]===void 0)return typeof x=="number"||typeof x=="boolean"?R[T]=x:ArrayBuffer.isView(x)?R[T]=x.slice():R[T]=x.clone(),!0;{let I=R[T];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return R[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function m(_){let M=_.uniforms,E=0,R=16;for(let T=0,I=M.length;T<I;T++){let L=Array.isArray(M[T])?M[T]:[M[T]];for(let z=0,G=L.length;z<G;z++){let N=L[z],V=Array.isArray(N.value)?N.value:[N.value];for(let Y=0,X=V.length;Y<X;Y++){let ie=V[Y],j=p(ie),K=E%R,te=K%j.boundary,_e=K+te;E+=te,_e!==0&&R-_e<j.storage&&(E+=R-_e),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=E,E+=j.storage}}}let x=E%R;return x>0&&(E+=R-x),_.__size=E,_.__cache={},this}function p(_){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",_),M}function S(_){let M=_.target;M.removeEventListener("dispose",S);let E=a.indexOf(M.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function A(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}var __=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ii=null;function y_(){return ii===null&&(ii=new Ys(__,16,16,Wi,Wn),ii.name="DFG_LUT",ii.minFilter=Rt,ii.magFilter=Rt,ii.wrapS=Mn,ii.wrapT=Mn,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var Fl=class{constructor(e={}){let{canvas:t=yf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=fn}=e;this.isWebGLRenderer=!0;let b;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=n.getContextAttributes().alpha}else b=a;let v=f,m=new Set([Zo,Jo,Yo]),p=new Set([fn,Hn,ar,or,jo,Xo]),S=new Uint32Array(4),A=new Int32Array(4),_=new O,M=null,E=null,R=[],x=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,L=!1,z=null,G=null,N=null,V=null;this._outputColorSpace=Ot;let Y=0,X=0,ie=null,j=-1,K=null,te=new ct,_e=new ct,me=null,Ge=new Ie(0),Ae=0,Be=t.width,ee=t.height,ne=1,ge=null,Ue=null,de=new ct(0,0,Be,ee),we=new ct(0,0,Be,ee),at=!1,Oe=new Js,Qe=!1,ot=!1,$e=new Ve,ut=new O,Tt=new ct,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},gt=!1;function St(){return ie===null?ne:1}let k=n;function Ut(w,U){return t.getContext(w,U)}let C,y,g,P,F,H,Q,re,J,W,ae,ye,le,ce,xe,Fe,He,B,he,se,ue,ve,oe;try{let w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",bt,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",In,!1),k===null){let U="webgl2";if(k=Ut(U,w),k===null)throw Ut(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(w){throw t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",In,!1),ke("WebGLRenderer: "+w.message),w}function Le(){C=new Rx(k),C.init(),ue=new p_(k,C),y=new xx(k,C,e,ue),g=new d_(k,C),y.reversedDepthBuffer&&d&&g.buffers.depth.setReversed(!0),G=k.createFramebuffer(),N=k.createFramebuffer(),V=k.createFramebuffer(),P=new Ix(k),F=new Zv,H=new f_(k,C,g,F,y,ue,P),Q=new Ax(I),re=new Lg(k),ve=new gx(k,re),J=new Cx(k,re,P,ve),W=new Lx(k,J,re,ve,P),B=new Dx(k,y,H),xe=new vx(F),ae=new Jv(I,Q,C,y,ve,xe),ye=new x_(I,F),le=new e_,ce=new a_(C),He=new mx(I,Q,g,W,b,c),Fe=new u_(I,W,y),oe=new v_(k,P,y,g),he=new bx(k,C,P),se=new Px(k,C,P),P.programs=ae.programs,I.capabilities=y,I.extensions=C,I.properties=F,I.renderLists=le,I.shadowMap=Fe,I.state=g,I.info=P}v!==fn&&(T=new Fx(v,t.width,t.height,o,s,r));let Re=new Nh(I,k);this.xr=Re,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let w=C.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=C.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(w){w!==void 0&&(ne=w,this.setSize(Be,ee,!1))},this.getSize=function(w){return w.set(Be,ee)},this.setSize=function(w,U,Z=!0){if(Re.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}Be=w,ee=U,t.width=Math.floor(w*ne),t.height=Math.floor(U*ne),Z===!0&&(t.style.width=w+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(Be*ne,ee*ne).floor()},this.setDrawingBufferSize=function(w,U,Z){Be=w,ee=U,ne=Z,t.width=Math.floor(w*Z),t.height=Math.floor(U*Z),this.setViewport(0,0,w,U)},this.setEffects=function(w){if(v===fn){ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let U=0;U<w.length;U++)if(w[U].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(te)},this.getViewport=function(w){return w.copy(de)},this.setViewport=function(w,U,Z,$){w.isVector4?de.set(w.x,w.y,w.z,w.w):de.set(w,U,Z,$),g.viewport(te.copy(de).multiplyScalar(ne).round())},this.getScissor=function(w){return w.copy(we)},this.setScissor=function(w,U,Z,$){w.isVector4?we.set(w.x,w.y,w.z,w.w):we.set(w,U,Z,$),g.scissor(_e.copy(we).multiplyScalar(ne).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(w){g.setScissorTest(at=w)},this.setOpaqueSort=function(w){ge=w},this.setTransparentSort=function(w){Ue=w},this.getClearColor=function(w){return w.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(w=!0,U=!0,Z=!0){let $=0;if(w){let q=!1;if(ie!==null){let be=ie.texture.format;q=m.has(be)}if(q){let be=ie.texture.type,Me=p.has(be),pe=He.getClearColor(),Te=He.getClearAlpha(),Ce=pe.r,qe=pe.g,Je=pe.b;Me?(S[0]=Ce,S[1]=qe,S[2]=Je,S[3]=Te,k.clearBufferuiv(k.COLOR,0,S)):(A[0]=Ce,A[1]=qe,A[2]=Je,A[3]=Te,k.clearBufferiv(k.COLOR,0,A))}else $|=k.COLOR_BUFFER_BIT}U&&($|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&($|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&k.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),z=w},this.dispose=function(){t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",In,!1),He.dispose(),le.dispose(),ce.dispose(),F.dispose(),Q.dispose(),W.dispose(),ve.dispose(),oe.dispose(),ae.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Ou),Re.removeEventListener("sessionend",ku),Yi.stop()};function bt(w){w.preventDefault(),Br("WebGLRenderer: Context Lost."),L=!0}function it(){Br("WebGLRenderer: Context Restored."),L=!1;let w=P.autoReset,U=Fe.enabled,Z=Fe.autoUpdate,$=Fe.needsUpdate,q=Fe.type;Le(),P.autoReset=w,Fe.enabled=U,Fe.autoUpdate=Z,Fe.needsUpdate=$,Fe.type=q}function In(w){ke("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function $n(w){let U=w.target;U.removeEventListener("dispose",$n),gm(U)}function gm(w){bm(w),F.remove(w)}function bm(w){let U=F.get(w).programs;U!==void 0&&(U.forEach(function(Z){ae.releaseProgram(Z)}),w.isShaderMaterial&&ae.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,Z,$,q,be){U===null&&(U=Ht);let Me=q.isMesh&&q.matrixWorld.determinantAffine()<0,pe=_m(w,U,Z,$,q);g.setMaterial($,Me);let Te=Z.index,Ce=1;if($.wireframe===!0){if(Te=J.getWireframeAttribute(Z),Te===void 0)return;Ce=2}let qe=Z.drawRange,Je=Z.attributes.position,Ee=qe.start*Ce,st=(qe.start+qe.count)*Ce;be!==null&&(Ee=Math.max(Ee,be.start*Ce),st=Math.min(st,(be.start+be.count)*Ce)),Te!==null?(Ee=Math.max(Ee,0),st=Math.min(st,Te.count)):Je!=null&&(Ee=Math.max(Ee,0),st=Math.min(st,Je.count));let Dt=st-Ee;if(Dt<0||Dt===1/0)return;ve.setup(q,$,pe,Z,Te);let vt,ft=he;if(Te!==null&&(vt=re.get(Te),ft=se,ft.setIndex(vt)),q.isMesh)$.wireframe===!0?(g.setLineWidth($.wireframeLinewidth*St()),ft.setMode(k.LINES)):ft.setMode(k.TRIANGLES);else if(q.isLine){let Wt=$.linewidth;Wt===void 0&&(Wt=1),g.setLineWidth(Wt*St()),q.isLineSegments?ft.setMode(k.LINES):q.isLineLoop?ft.setMode(k.LINE_LOOP):ft.setMode(k.LINE_STRIP)}else q.isPoints?ft.setMode(k.POINTS):q.isSprite&&ft.setMode(k.TRIANGLES);if(q.isBatchedMesh)if(C.get("WEBGL_multi_draw"))ft.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Wt=q._multiDrawStarts,Se=q._multiDrawCounts,Jt=q._multiDrawCount,et=Te?re.get(Te).bytesPerElement:1,yn=F.get($).currentProgram.getUniforms();for(let qn=0;qn<Jt;qn++)yn.setValue(k,"_gl_DrawID",qn),ft.render(Wt[qn]/et,Se[qn])}else if(q.isInstancedMesh)ft.renderInstances(Ee,Dt,q.count);else if(Z.isInstancedBufferGeometry){let Wt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Se=Math.min(Z.instanceCount,Wt);ft.renderInstances(Ee,Dt,Se)}else ft.render(Ee,Dt)};function Uu(w,U,Z,$){z!==null&&w.isNodeMaterial&&z.setObject($,w),Qe===!0&&xe.setState(w,Z,!1),w.transparent===!0&&w.side===Kt&&w.forceSinglePass===!1?(w.side=sn,w.needsUpdate=!0,Na(w,U,$),w.side=ti,w.needsUpdate=!0,Na(w,U,$),w.side=Kt):Na(w,U,$)}this.compile=function(w,U,Z=null){Z===null&&(Z=w),z!==null&&z.renderStart(w,U,Z),E=ce.get(Z),E.init(U),x.push(E),Z.traverseVisible(function(q){q.isLight&&q.layers.test(U.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),w!==Z&&w.traverseVisible(function(q){q.isLight&&q.layers.test(U.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),E.setupLights(),z!==null&&z.updateLights(E.state.lightsArray),ot=this.localClippingEnabled,Qe=xe.init(this.clippingPlanes,ot),Qe===!0&&xe.setGlobalState(this.clippingPlanes,U),z!==null&&Fe.render(E.state.shadowsArray,Z,U);let $=new Set;return w.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let be=q.material;if(be)if(Array.isArray(be))for(let Me=0;Me<be.length;Me++){let pe=be[Me];Uu(pe,Z,U,q),$.add(pe)}else Uu(be,Z,U,q),$.add(be)}),E=x.pop(),z!==null&&z.renderEnd(),$},this.compileAsync=function(w,U,Z=null){let $=this.compile(w,U,Z);return new Promise(q=>{function be(){if($.forEach(function(Me){let Te=F.get(Me).currentProgram;(Te===void 0||Te.isReady())&&$.delete(Me)}),$.size===0){q(w);return}setTimeout(be,10)}C.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let rc=null;function xm(w){rc&&rc(w)}function Ou(){Yi.stop()}function ku(){Yi.start()}let Yi=new Yf;Yi.setAnimationLoop(xm),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(w){rc=w,Re.setAnimationLoop(w),w===null?Yi.stop():Yi.start()},Re.addEventListener("sessionstart",Ou),Re.addEventListener("sessionend",ku),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;z!==null&&z.renderStart(w,U);let Z=Re.enabled===!0&&Re.isPresenting===!0,$=T!==null&&(ie===null||Z)&&T.begin(I,ie);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(U),U=Re.getCamera()),w.isScene===!0&&w.onBeforeRender(I,w,U,ie),E=ce.get(w,x.length),E.init(U),E.state.textureUnits=H.getTextureUnits(),x.push(E),$e.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Oe.setFromProjectionMatrix($e,On,U.reversedDepth),ot=this.localClippingEnabled,Qe=xe.init(this.clippingPlanes,ot),M=le.get(w,R.length),M.init(),R.push(M),Re.enabled===!0&&Re.isPresenting===!0){let Me=I.xr.getDepthSensingMesh();Me!==null&&ac(Me,U,-1/0,I.sortObjects)}ac(w,U,0,I.sortObjects),M.finish(),z!==null&&z.updateLights(E.state.lightsArray),I.sortObjects===!0&&M.sort(ge,Ue),gt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,gt&&He.addToRenderList(M,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Qe===!0&&xe.beginShadows();let q=E.state.shadowsArray;if(Fe.render(q,w,U),Qe===!0&&xe.endShadows(),($&&T.hasRenderPass())===!1){let Me=M.opaque,pe=M.transmissive;if(E.setupLights(),U.isArrayCamera){let Te=U.cameras;if(pe.length>0)for(let Ce=0,qe=Te.length;Ce<qe;Ce++){let Je=Te[Ce];zu(Me,pe,w,Je)}gt&&He.render(w);for(let Ce=0,qe=Te.length;Ce<qe;Ce++){let Je=Te[Ce];Bu(M,w,Je,Je.viewport)}}else pe.length>0&&zu(Me,pe,w,U),gt&&He.render(w),Bu(M,w,U)}ie!==null&&X===0&&(H.updateMultisampleRenderTarget(ie),H.updateRenderTargetMipmap(ie)),$&&T.end(I),w.isScene===!0&&w.onAfterRender(I,w,U),ve.resetDefaultState(),j=-1,K=null,x.pop(),x.length>0?(E=x[x.length-1],H.setTextureUnits(E.state.textureUnits),Qe===!0&&xe.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?M=R[R.length-1]:M=null,z!==null&&z.renderEnd()};function ac(w,U,Z,$){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)Z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLightProbeGrid)E.pushLightProbeGrid(w);else if(w.isLight)E.pushLight(w),w.castShadow&&E.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Oe)){$&&Tt.setFromMatrixPosition(w.matrixWorld).applyMatrix4($e);let Me=W.update(w),pe=w.material;pe.visible&&M.push(w,Me,pe,Z,Tt.z,null,U)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Oe))){let Me=W.update(w),pe=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Tt.copy(w.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Tt.copy(Me.boundingSphere.center)),Tt.applyMatrix4(w.matrixWorld).applyMatrix4($e)),Array.isArray(pe)){let Te=Me.groups;for(let Ce=0,qe=Te.length;Ce<qe;Ce++){let Je=Te[Ce],Ee=pe[Je.materialIndex];Ee&&Ee.visible&&M.push(w,Me,Ee,Z,Tt.z,Je,U)}}else pe.visible&&M.push(w,Me,pe,Z,Tt.z,null,U)}}let be=w.children;for(let Me=0,pe=be.length;Me<pe;Me++)ac(be[Me],U,Z,$)}function Bu(w,U,Z,$){let{opaque:q,transmissive:be,transparent:Me}=w;E.setupLightsView(Z),Qe===!0&&xe.setGlobalState(I.clippingPlanes,Z),$&&g.viewport(te.copy($)),q.length>0&&La(q,U,Z),be.length>0&&La(be,U,Z),Me.length>0&&La(Me,U,Z),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function zu(w,U,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[$.id]===void 0){let Ee=C.has("EXT_color_buffer_half_float")||C.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[$.id]=new ln(1,1,{generateMipmaps:!0,type:Ee?Wn:fn,minFilter:Vn,samples:Math.max(4,y.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}let be=E.state.transmissionRenderTarget[$.id],Me=$.viewport||te;be.setSize(Me.z*I.transmissionResolutionScale,Me.w*I.transmissionResolutionScale);let pe=I.getRenderTarget(),Te=I.getActiveCubeFace(),Ce=I.getActiveMipmapLevel();I.setRenderTarget(be),I.getClearColor(Ge),Ae=I.getClearAlpha(),Ae<1&&I.setClearColor(16777215,.5),I.clear(),gt&&He.render(Z);let qe=I.toneMapping;I.toneMapping=Gn;let Je=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),E.setupLightsView($),Qe===!0&&xe.setGlobalState(I.clippingPlanes,$),La(w,Z,$),H.updateMultisampleRenderTarget(be),H.updateRenderTargetMipmap(be),C.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let st=0,Dt=U.length;st<Dt;st++){let vt=U[st],{object:ft,geometry:Wt,material:Se,group:Jt}=vt;if(Se.side===Kt&&ft.layers.test($.layers)){let et=Se.side;Se.side=sn,Se.needsUpdate=!0,Gu(ft,Z,$,Wt,Se,Jt),Se.side=et,Se.needsUpdate=!0,Ee=!0}}Ee===!0&&(H.updateMultisampleRenderTarget(be),H.updateRenderTargetMipmap(be))}I.setRenderTarget(pe,Te,Ce),I.setClearColor(Ge,Ae),Je!==void 0&&($.viewport=Je),I.toneMapping=qe}function La(w,U,Z){let $=U.isScene===!0?U.overrideMaterial:null;for(let q=0,be=w.length;q<be;q++){let Me=w[q],{object:pe,geometry:Te,group:Ce}=Me,qe=Me.material;qe.allowOverride===!0&&$!==null&&(qe=$),pe.layers.test(Z.layers)&&Gu(pe,U,Z,Te,qe,Ce)}}function Gu(w,U,Z,$,q,be){z!==null&&q.isNodeMaterial&&z.setObject(w,q),w.onBeforeRender(I,U,Z,$,q,be),w.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),q.onBeforeRender(I,U,Z,$,w,be),q.transparent===!0&&q.side===Kt&&q.forceSinglePass===!1?(q.side=sn,q.needsUpdate=!0,I.renderBufferDirect(Z,U,$,q,w,be),q.side=ti,q.needsUpdate=!0,I.renderBufferDirect(Z,U,$,q,w,be),q.side=Kt):I.renderBufferDirect(Z,U,$,q,w,be),w.onAfterRender(I,U,Z,$,q,be)}function Na(w,U,Z){U.isScene!==!0&&(U=Ht);let $=F.get(w),q=E.state.lights,be=E.state.shadowsArray,Me=q.state.version,pe=ae.getParameters(w,q.state,be,U,Z,E.state.lightProbeGridArray),Te=ae.getProgramCacheKey(pe),Ce=$.programs;$.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?U.environment:null,$.fog=U.fog;let qe=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;$.envMap=Q.get(w.envMap||$.environment,qe),$.envMapRotation=$.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Ce===void 0&&(w.addEventListener("dispose",$n),Ce=new Map,$.programs=Ce);let Je=Ce.get(Te);if(Je!==void 0){if($.currentProgram===Je&&$.lightsStateVersion===Me)return Hu(w,pe),Je}else pe.uniforms=ae.getUniforms(w),z!==null&&w.isNodeMaterial&&z.build(w,Z,pe),w.onBeforeCompile(pe,I),Je=ae.acquireProgram(pe,Te),Ce.set(Te,Je),$.uniforms=pe.uniforms;let Ee=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ee.clippingPlanes=xe.uniform),Hu(w,pe),$.needsLights=Sm(w),$.lightsStateVersion=Me,$.needsLights&&(Ee.ambientLightColor.value=q.state.ambient,Ee.lightProbe.value=q.state.probe,Ee.sunLights.value=q.state.sun,Ee.sunLightShadows.value=q.state.sunShadow,Ee.directionalLights.value=q.state.directional,Ee.directionalLightShadows.value=q.state.directionalShadow,Ee.spotLights.value=q.state.spot,Ee.spotLightShadows.value=q.state.spotShadow,Ee.rectAreaLights.value=q.state.rectArea,Ee.ltc_1.value=q.state.rectAreaLTC1,Ee.ltc_2.value=q.state.rectAreaLTC2,Ee.pointLights.value=q.state.point,Ee.pointLightShadows.value=q.state.pointShadow,Ee.hemisphereLights.value=q.state.hemi,Ee.sunShadowMatrix.value=q.state.sunShadowMatrix,Ee.sunShadowCascade.value=q.state.sunShadowCascade,Ee.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ee.spotLightMatrix.value=q.state.spotLightMatrix,Ee.spotLightMap.value=q.state.spotLightMap,Ee.pointShadowMatrix.value=q.state.pointShadowMatrix),$.lightProbeGrid=E.state.lightProbeGridArray.length>0,$.currentProgram=Je,$.uniformsList=null,Je}function Vu(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=ur.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Hu(w,U){let Z=F.get(w);Z.outputColorSpace=U.outputColorSpace,Z.batching=U.batching,Z.batchingColor=U.batchingColor,Z.instancing=U.instancing,Z.instancingColor=U.instancingColor,Z.instancingMorph=U.instancingMorph,Z.skinning=U.skinning,Z.morphTargets=U.morphTargets,Z.morphNormals=U.morphNormals,Z.morphColors=U.morphColors,Z.morphTargetsCount=U.morphTargetsCount,Z.numClippingPlanes=U.numClippingPlanes,Z.numIntersection=U.numClipIntersection,Z.vertexAlphas=U.vertexAlphas,Z.vertexTangents=U.vertexTangents,Z.toneMapping=U.toneMapping}function vm(w,U){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(U.matrixWorld);for(let Z=0,$=w.length;Z<$;Z++){let q=w[Z];if(q.texture!==null&&q.boundingBox.containsPoint(_))return q}return null}function _m(w,U,Z,$,q){U.isScene!==!0&&(U=Ht),H.resetTextureUnits();let be=U.fog,Me=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?U.environment:null,pe=ie===null?I.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Xe.workingColorSpace,Te=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ce=Q.get($.envMap||Me,Te),qe=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Je=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ee=!!Z.morphAttributes.position,st=!!Z.morphAttributes.normal,Dt=!!Z.morphAttributes.color,vt=Gn;$.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(vt=I.toneMapping);let ft=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Wt=ft!==void 0?ft.length:0,Se=F.get($),Jt=E.state.lights;if(Qe===!0&&(ot===!0||w!==K)){let xt=w===K&&$.id===j;xe.setState($,w,xt)}let et=!1;$.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==Jt.state.version||Se.outputColorSpace!==pe||q.isBatchedMesh&&Se.batching===!1||!q.isBatchedMesh&&Se.batching===!0||q.isBatchedMesh&&Se.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Se.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Se.instancing===!1||!q.isInstancedMesh&&Se.instancing===!0||q.isSkinnedMesh&&Se.skinning===!1||!q.isSkinnedMesh&&Se.skinning===!0||q.isInstancedMesh&&Se.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Se.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Se.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Se.instancingMorph===!1&&q.morphTexture!==null||Se.envMap!==Ce||$.fog===!0&&Se.fog!==be||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==xe.numPlanes||Se.numIntersection!==xe.numIntersection)||Se.vertexAlphas!==qe||Se.vertexTangents!==Je||Se.morphTargets!==Ee||Se.morphNormals!==st||Se.morphColors!==Dt||Se.toneMapping!==vt||Se.morphTargetsCount!==Wt||!!Se.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,Se.__version=$.version);let yn=Se.currentProgram;et===!0&&(yn=Na($,U,q),z&&$.isNodeMaterial&&z.onUpdateProgram($,yn,Se));let qn=!1,Ei=!1,vs=!1,dt=yn.getUniforms(),Et=Se.uniforms;if(g.useProgram(yn.program)&&(qn=!0,Ei=!0,vs=!0),$.id!==j&&(j=$.id,Ei=!0),Se.needsLights){let xt=vm(E.state.lightProbeGridArray,q);Se.lightProbeGrid!==xt&&(Se.lightProbeGrid=xt,Ei=!0)}if(qn||K!==w){g.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),dt.setValue(k,"projectionMatrix",w.projectionMatrix),dt.setValue(k,"viewMatrix",w.matrixWorldInverse);let Ri=dt.map.cameraPosition;Ri!==void 0&&Ri.setValue(k,ut.setFromMatrixPosition(w.matrixWorld)),y.logarithmicDepthBuffer&&dt.setValue(k,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&dt.setValue(k,"isOrthographic",w.isOrthographicCamera===!0),K!==w&&(K=w,Ei=!0,vs=!0)}if(Se.needsLights&&(Jt.state.sunShadowMap.length>0&&dt.setValue(k,"sunShadowMap",Jt.state.sunShadowMap,H),Jt.state.directionalShadowMap.length>0&&dt.setValue(k,"directionalShadowMap",Jt.state.directionalShadowMap,H),Jt.state.spotShadowMap.length>0&&dt.setValue(k,"spotShadowMap",Jt.state.spotShadowMap,H),Jt.state.pointShadowMap.length>0&&dt.setValue(k,"pointShadowMap",Jt.state.pointShadowMap,H)),q.isSkinnedMesh){dt.setOptional(k,q,"bindMatrix"),dt.setOptional(k,q,"bindMatrixInverse");let xt=q.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),dt.setValue(k,"boneTexture",xt.boneTexture,H))}q.isBatchedMesh&&(dt.setOptional(k,q,"batchingTexture"),dt.setValue(k,"batchingTexture",q._matricesTexture,H),dt.setOptional(k,q,"batchingIdTexture"),dt.setValue(k,"batchingIdTexture",q._indirectTexture,H),dt.setOptional(k,q,"batchingColorTexture"),q._colorsTexture!==null&&dt.setValue(k,"batchingColorTexture",q._colorsTexture,H));let Ai=Z.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&B.update(q,Z,yn),(Ei||Se.receiveShadow!==q.receiveShadow)&&(Se.receiveShadow=q.receiveShadow,dt.setValue(k,"receiveShadow",q.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&U.environment!==null&&(Et.envMapIntensity.value=U.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=y_()),Ei){if(dt.setValue(k,"toneMappingExposure",I.toneMappingExposure),Se.needsLights&&ym(Et,vs),be&&$.fog===!0&&ye.refreshFogUniforms(Et,be),ye.refreshMaterialUniforms(Et,$,ne,ee,E.state.transmissionRenderTarget[w.id]),Se.needsLights&&Se.lightProbeGrid){let xt=Se.lightProbeGrid;Et.probesSH.value=xt.texture,Et.probesMin.value.copy(xt.boundingBox.min),Et.probesMax.value.copy(xt.boundingBox.max),Et.probesResolution.value.copy(xt.resolution)}ur.upload(k,Vu(Se),Et,H)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ur.upload(k,Vu(Se),Et,H),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&dt.setValue(k,"center",q.center),dt.setValue(k,"modelViewMatrix",q.modelViewMatrix),dt.setValue(k,"normalMatrix",q.normalMatrix),dt.setValue(k,"modelMatrix",q.matrixWorld),$.uniformsGroups!==void 0){let xt=$.uniformsGroups;for(let Ri=0,_s=xt.length;Ri<_s;Ri++){let $u=xt[Ri];oe.update($u,yn),oe.bind($u,yn)}}return yn}function ym(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.sunLights.needsUpdate=U,w.sunLightShadows.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function Sm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(w,U,Z){let $=F.get(w);$.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),F.get(w.texture).__webglTexture=U,F.get(w.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Z,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,U){let Z=F.get(w);Z.__webglFramebuffer=U,Z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,Z=0){ie=w,Y=U,X=Z;let $=null,q=!1,be=!1;if(w){let pe=F.get(w);if(pe.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(k.FRAMEBUFFER,pe.__webglFramebuffer),te.copy(w.viewport),_e.copy(w.scissor),me=w.scissorTest,g.viewport(te),g.scissor(_e),g.setScissorTest(me),j=-1;return}else if(pe.__webglFramebuffer===void 0)H.setupRenderTarget(w);else if(pe.__hasExternalTextures)H.rebindTextures(w,F.get(w.texture).__webglTexture,F.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let qe=w.depthTexture;if(pe.__boundDepthTexture!==qe){if(qe!==null&&F.has(qe)&&(w.width!==qe.image.width||w.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(w)}}let Te=w.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(be=!0);let Ce=F.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?$=Ce[U][Z]:$=Ce[U],q=!0):w.samples>0&&H.useMultisampledRTT(w)===!1?$=F.get(w).__webglMultisampledFramebuffer:Array.isArray(Ce)?$=Ce[Z]:$=Ce,te.copy(w.viewport),_e.copy(w.scissor),me=w.scissorTest}else te.copy(de).multiplyScalar(ne).floor(),_e.copy(we).multiplyScalar(ne).floor(),me=at;if(Z!==0&&($=G),g.bindFramebuffer(k.FRAMEBUFFER,$)&&g.drawBuffers(w,$),g.viewport(te),g.scissor(_e),g.setScissorTest(me),q){let pe=F.get(w.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,Z)}else if(be){let pe=U;for(let Te=0;Te<w.textures.length;Te++){let Ce=F.get(w.textures[Te]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,Z,pe)}}else if(w!==null&&Z!==0){let pe=F.get(w.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,pe.__webglTexture,Z)}j=-1};function Wu(w){let U=F.get(w);return(U.__readFormat!==w.format||U.__readType!==w.type)&&(U.__readFormat=w.format,U.__readType=w.type,U.__formatReadable=y.textureFormatReadable(w.format),U.__typeReadable=y.textureTypeReadable(w.type)),U}this.readRenderTargetPixels=function(w,U,Z,$,q,be,Me,pe=0){if(!(w&&w.isWebGLRenderTarget)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=F.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){g.bindFramebuffer(k.FRAMEBUFFER,Te);try{let Ce=w.textures[pe],qe=Ce.format,Je=Ce.type;w.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+pe);let Ee=Wu(Ce);if(Ee.__formatReadable===!1){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-$&&Z>=0&&Z<=w.height-q&&k.readPixels(U,Z,$,q,ue.convert(qe),ue.convert(Je),be)}finally{let Ce=ie!==null?F.get(ie).__webglFramebuffer:null;g.bindFramebuffer(k.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(w,U,Z,$,q,be,Me,pe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=F.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te)if(U>=0&&U<=w.width-$&&Z>=0&&Z<=w.height-q){g.bindFramebuffer(k.FRAMEBUFFER,Te);let Ce=w.textures[pe],qe=Ce.format,Je=Ce.type;w.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+pe);let Ee=Wu(Ce);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,st),k.bufferData(k.PIXEL_PACK_BUFFER,be.byteLength,k.STREAM_READ),k.readPixels(U,Z,$,q,ue.convert(qe),ue.convert(Je),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let Dt=ie!==null?F.get(ie).__webglFramebuffer:null;g.bindFramebuffer(k.FRAMEBUFFER,Dt);let vt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Mf(k,vt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,st),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,be),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(st),k.deleteSync(vt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,U=null,Z=0){let $=Math.pow(2,-Z),q=Math.floor(w.image.width*$),be=Math.floor(w.image.height*$),Me=U!==null?U.x:0,pe=U!==null?U.y:0;H.setTexture2D(w,0),k.copyTexSubImage2D(k.TEXTURE_2D,Z,0,0,Me,pe,q,be),g.unbindTexture()},this.copyTextureToTexture=function(w,U,Z=null,$=null,q=0,be=0){let Me,pe,Te,Ce,qe,Je,Ee,st,Dt,vt=w.isCompressedTexture?w.mipmaps[be]:w.image;if(Z!==null)Me=Z.max.x-Z.min.x,pe=Z.max.y-Z.min.y,Te=Z.isBox3?Z.max.z-Z.min.z:1,Ce=Z.min.x,qe=Z.min.y,Je=Z.isBox3?Z.min.z:0;else{let Et=Math.pow(2,-q);Me=Math.floor(vt.width*Et),pe=Math.floor(vt.height*Et),w.isDataArrayTexture?Te=vt.depth:w.isData3DTexture?Te=Math.floor(vt.depth*Et):Te=1,Ce=0,qe=0,Je=0}$!==null?(Ee=$.x,st=$.y,Dt=$.z):(Ee=0,st=0,Dt=0);let ft=ue.convert(U.format),Wt=ue.convert(U.type),Se;U.isData3DTexture?(H.setTexture3D(U,0),Se=k.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(H.setTexture2DArray(U,0),Se=k.TEXTURE_2D_ARRAY):(H.setTexture2D(U,0),Se=k.TEXTURE_2D),g.activeTexture(k.TEXTURE0),g.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),g.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),g.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);let Jt=g.getParameter(k.UNPACK_ROW_LENGTH),et=g.getParameter(k.UNPACK_IMAGE_HEIGHT),yn=g.getParameter(k.UNPACK_SKIP_PIXELS),qn=g.getParameter(k.UNPACK_SKIP_ROWS),Ei=g.getParameter(k.UNPACK_SKIP_IMAGES);g.pixelStorei(k.UNPACK_ROW_LENGTH,vt.width),g.pixelStorei(k.UNPACK_IMAGE_HEIGHT,vt.height),g.pixelStorei(k.UNPACK_SKIP_PIXELS,Ce),g.pixelStorei(k.UNPACK_SKIP_ROWS,qe),g.pixelStorei(k.UNPACK_SKIP_IMAGES,Je);let vs=w.isDataArrayTexture||w.isData3DTexture,dt=U.isDataArrayTexture||U.isData3DTexture;if(w.isDepthTexture){let Et=F.get(w),Ai=F.get(U),xt=F.get(Et.__renderTarget),Ri=F.get(Ai.__renderTarget);g.bindFramebuffer(k.READ_FRAMEBUFFER,xt.__webglFramebuffer),g.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ri.__webglFramebuffer);for(let _s=0;_s<Te;_s++)vs&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,F.get(w).__webglTexture,q,Je+_s),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,F.get(U).__webglTexture,be,Dt+_s)),k.blitFramebuffer(Ce,qe,Me,pe,Ee,st,Me,pe,k.DEPTH_BUFFER_BIT,k.NEAREST);g.bindFramebuffer(k.READ_FRAMEBUFFER,null),g.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(q!==0||w.isRenderTargetTexture||F.has(w)){let Et=F.get(w),Ai=F.get(U);g.bindFramebuffer(k.READ_FRAMEBUFFER,N),g.bindFramebuffer(k.DRAW_FRAMEBUFFER,V);for(let xt=0;xt<Te;xt++)vs?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Et.__webglTexture,q,Je+xt):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Et.__webglTexture,q),dt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ai.__webglTexture,be,Dt+xt):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ai.__webglTexture,be),q!==0?k.blitFramebuffer(Ce,qe,Me,pe,Ee,st,Me,pe,k.COLOR_BUFFER_BIT,k.NEAREST):dt?k.copyTexSubImage3D(Se,be,Ee,st,Dt+xt,Ce,qe,Me,pe):k.copyTexSubImage2D(Se,be,Ee,st,Ce,qe,Me,pe);g.bindFramebuffer(k.READ_FRAMEBUFFER,null),g.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else dt?w.isDataTexture||w.isData3DTexture?k.texSubImage3D(Se,be,Ee,st,Dt,Me,pe,Te,ft,Wt,vt.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(Se,be,Ee,st,Dt,Me,pe,Te,ft,vt.data):k.texSubImage3D(Se,be,Ee,st,Dt,Me,pe,Te,ft,Wt,vt):w.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,be,Ee,st,Me,pe,ft,Wt,vt.data):w.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,be,Ee,st,vt.width,vt.height,ft,vt.data):k.texSubImage2D(k.TEXTURE_2D,be,Ee,st,Me,pe,ft,Wt,vt);g.pixelStorei(k.UNPACK_ROW_LENGTH,Jt),g.pixelStorei(k.UNPACK_IMAGE_HEIGHT,et),g.pixelStorei(k.UNPACK_SKIP_PIXELS,yn),g.pixelStorei(k.UNPACK_SKIP_ROWS,qn),g.pixelStorei(k.UNPACK_SKIP_IMAGES,Ei),be===0&&U.generateMipmaps&&k.generateMipmap(Se),g.unbindTexture()},this.initRenderTarget=function(w){F.get(w).__webglFramebuffer===void 0&&H.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?H.setTextureCube(w,0):w.isData3DTexture?H.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?H.setTexture2DArray(w,0):H.setTexture2D(w,0),g.unbindTexture()},this.resetState=function(){Y=0,X=0,ie=null,g.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}};var ip={type:"change"},Uh={type:"start"},rp={type:"end"},kl=new Jn,sp=new jt,M_=Math.cos(70*us.DEG2RAD),zt=new O,pn=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fh=1e-6,Bl=class extends ua{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.touches={ONE:Gi.ROTATE,TWO:Gi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Xt,this._lastTargetPosition=new O,this._quat=new Xt().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new nr,this._sphericalDelta=new nr,this._scale=1,this._panOffset=new O,this._rotateStart=new Ne,this._rotateEnd=new Ne,this._rotateDelta=new Ne,this._panStart=new Ne,this._panEnd=new Ne,this._panDelta=new Ne,this._dollyStart=new Ne,this._dollyEnd=new Ne,this._dollyDelta=new Ne,this._dollyDirection=new O,this._mouse=new Ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=T_.bind(this),this._onPointerDown=w_.bind(this),this._onPointerUp=E_.bind(this),this._onContextMenu=L_.bind(this),this._onMouseWheel=C_.bind(this),this._onKeyDown=P_.bind(this),this._onTouchStart=I_.bind(this),this._onTouchMove=D_.bind(this),this._onMouseDown=A_.bind(this),this._onMouseMove=R_.bind(this),this._interceptControlDown=N_.bind(this),this._interceptControlUp=F_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ht.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ip),this.update(),this.state=ht.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=pn:n>Math.PI&&(n-=pn),s<-Math.PI?s+=pn:s>Math.PI&&(s-=pn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=zt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(kl.origin.copy(this.object.position),kl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(kl.direction))<M_?this.object.lookAt(this.target):(sp.setFromNormalAndCoplanarPoint(this.object.up,this.target),kl.intersectPlane(sp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fh||this._lastTargetPosition.distanceToSquared(this.target)>Fh?(this.dispatchEvent(ip),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?pn/60*this.autoRotateSpeed*e:pn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;zt.copy(s).sub(this.target);let r=zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/t.clientHeight),this._rotateUp(pn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/t.clientHeight),this._rotateUp(pn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function w_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function T_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function E_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rp),this.state=ht.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function A_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ht.DOLLY;break;case zi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ht.ROTATE}break;case zi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(Uh)}function R_(i){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function C_(i){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(i.preventDefault(),this.dispatchEvent(Uh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(rp))}function P_(i){this.enabled!==!1&&this._handleKeyDown(i)}function I_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Gi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ht.TOUCH_ROTATE;break;case Gi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case Gi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ht.TOUCH_DOLLY_PAN;break;case Gi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(Uh)}function D_(i){switch(this._trackPointer(i),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ht.NONE}}function L_(i){this.enabled!==!1&&i.preventDefault()}function N_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function F_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Oh(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Mt,l=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let b=0;b<f.count;++b)u.push(f.getX(b)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=ap(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][d]);let b=ap(f);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(b)}}}return c}function ap(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Ft(a,t,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/t;for(let d=0,f=h.count;d<f;d++)for(let b=0;b<t;b++){let v=h.getComponent(d,b);o.setComponent(d+u,b,v)}}else a.set(h.array,c);c+=h.count*t}return s!==void 0&&(o.gpuType=s),o}function kh(i,e){if(e===dh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===lr||e===_a){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===lr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function op(i){let e=new Map,t=new Map,n=i.clone();return lp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function lp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)lp(i.children[n],e.children[n],t)}var zl=class extends ei{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new $h(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Gl(t,Ye.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Gl(t,Ye.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new su(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=yi.extractUrlBase(e);a=yi.resolveURL(l,this.path)}else a=yi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new er(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===fp){try{a[Ye.KHR_BINARY_GLTF]=new ru(e)}catch(u){s&&s(u);return}r=JSON.parse(a[Ye.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new du(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ye.KHR_MATERIALS_UNLIT:a[u]=new Hh;break;case Ye.KHR_DRACO_MESH_COMPRESSION:a[u]=new au(r,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:a[u]=new ou;break;case Ye.KHR_MESH_QUANTIZATION:a[u]=new lu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function U_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Pt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Vh=class{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],en);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new os(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new oa(h),l.distance=u;break;case"spot":l=new aa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ri(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Hh=class{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return hn}extendParams(e,t,n){let s=[];e.color=new Ie(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],en),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ot))}return Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},$h=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(r,r)}return Promise.all(s)}},qh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},jh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Xh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],en)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Ot)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Kh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(r[0],r[1],r[2],en),Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(r[0],r[1],r[2],en),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Ot)),Promise.all(s)}},Qh=class{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},eu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},tu=class{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},nu=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},iu=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Gl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}},su=class{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==wn.TRIANGLES&&l.mode!==wn.TRIANGLE_STRIP&&l.mode!==wn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let b of u){let v=new Ve,m=new O,p=new Xt,S=new O(1,1,1),A=new qr(b.geometry,b.material,d);for(let M=0;M<d;M++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,M),c.SCALE&&S.fromBufferAttribute(c.SCALE,M),A.setMatrixAt(M,v.compose(m,p,S));let _=null;for(let M in c)if(M==="_COLOR_0"){let E=c[M];A.instanceColor=new mi(E.array,E.itemSize,E.normalized)}else if(M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"){if(_===null){let R=A.geometry;_=new Mt,_.name=R.name;for(let x in R.attributes)_.setAttribute(x,R.attributes[x]);for(let x in R.morphAttributes)_.morphAttributes[x]=R.morphAttributes[x];R.index!==null&&_.setIndex(R.index),_.morphTargetsRelative=R.morphTargetsRelative;for(let x of R.groups)_.addGroup(x.start,x.count,x.materialIndex);R.boundingBox!==null&&(_.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(_.boundingSphere=R.boundingSphere.clone()),_.drawRange.start=R.drawRange.start,_.drawRange.count=R.drawRange.count,_.userData=Object.assign({},R.userData),A.geometry=_}let E=c[M];_.setAttribute(M,new mi(E.array,E.itemSize,E.normalized))}yt.prototype.copy.call(A,b),this.parser.assignFinalMaterial(A),f.push(A)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},fp="glTF",Ta=12,cp={JSON:1313821514,BIN:5130562},ru=class{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ta),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==fp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Ta,r=new DataView(e,Ta),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===cp.JSON){let l=new Uint8Array(e,Ta+a,o);this.content=n.decode(l)}else if(c===cp.BIN){let l=Ta+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},au=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=hu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=hu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=fr[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(let b in f.attributes){let v=f.attributes[b],m=c[b];m!==void 0&&(v.normalized=m)}u(f)},o,l,en,d)})})}},ou=class{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},lu=class{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}},Vl=class extends Qn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,b=e*l,v=b-l,m=-2*f+3*d,p=f-d,S=1-m,A=p-d+u;for(let _=0;_!==o;_++){let M=a[v+_+o],E=a[v+_+c]*h,R=a[b+_+o],x=a[b+_]*h;r[_]=S*M+A*E+m*R+p*x}return r}},O_=new Xt,cu=class extends Vl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return O_.fromArray(r).normalize().toArray(r),r}},wn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},fr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},hp={9728:At,9729:Rt,9984:$o,9985:rr,9986:hs,9987:Vn},up={33071:Mn,33648:zs,10497:Ui},Bh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},hu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$i={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},k_={CUBICSPLINE:void 0,LINEAR:is,STEP:ns},zh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function B_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new rs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),i.DefaultMaterial}function ps(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ri(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function z_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function G_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function V_(i){let e,t=i.extensions&&i.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gh(t.attributes):e=i.indices+":"+Gh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Gh(i.targets[n]);return e}function Gh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function uu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function H_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var W_=new Ve,du=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new U_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new ia(this.options.manager):this.textureLoader=new la(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new er(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ps(r,o,s),ri(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(yi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Bh[s.type],o=fr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Ft(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Bh[s.type],l=fr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,b=s.normalized===!0,v,m;if(f&&f!==u){let p=Math.floor(d/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,A=t.cache.get(S);A||(v=new l(o,p*f,s.count*f/h),A=new js(v,f/h),t.cache.add(S,A)),m=new Xs(A,c,d%f/h,b)}else o===null?v=new l(s.count*c):v=new l(o,d,s.count*c),m=new Ft(v,c,b);if(s.sparse!==void 0){let p=Bh.SCALAR,S=fr[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,M=new S(a[1],A,s.sparse.count*p),E=new l(a[2],_,s.sparse.count*c);o!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,x=M.length;R<x;R++){let T=M[R];if(m.setX(T,E[R*c]),c>=2&&m.setY(T,E[R*c+1]),c>=3&&m.setZ(T,E[R*c+2]),c>=4&&m.setW(T,E[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=b}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=hp[d.magFilter]||Rt,h.minFilter=hp[d.minFilter]||Vn,h.wrapS=up[d.wrapS]||Ui,h.wrapT=up[d.wrapT]||Ui,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==At&&h.minFilter!==Rt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let b=d;t.isImageBitmapLoader===!0&&(b=function(v){let m=new Vt(v);m.needsUpdate=!0,d(m)}),t.load(yi.resolveURL(u,r.path),b,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),ri(u,a),u.userData.mimeType=a.mimeType||H_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ye.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Zs,nn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new zn,nn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return rs}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[Ye.KHR_MATERIALS_UNLIT]){let u=s[Ye.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],en),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Ot)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Kt);let h=r.alphaMode||zh.OPAQUE;if(h===zh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===zh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==hn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ne(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==hn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==hn){let u=r.emissiveFactor;o.emissive=new Ie().setRGB(u[0],u[1],u[2],en)}return r.emissiveTexture!==void 0&&a!==hn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ot)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),ri(u,r),t.associations.set(u,{materials:e}),r.extensions&&ps(s,u,r),u})}createUniqueName(e){let t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return dp(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=V_(l),u=s[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=dp(new Mt,l,t),l.mode===wn.TRIANGLE_STRIP?d=d.then(f=>kh(f,_a)):l.mode===wn.TRIANGLE_FAN&&(d=d.then(f=>kh(f,lr))),s[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?B_(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,b=h.length;f<b;f++){let v=h[f],m=a[f],p,S=l[f];if(m.mode===wn.TRIANGLES||m.mode===wn.TRIANGLE_STRIP||m.mode===wn.TRIANGLE_FAN||m.mode===void 0){let A=r.isSkinnedMesh===!0,_=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");A&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=A&&_?new Wr(v,S):new Ct(v,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(m.mode===wn.LINES)p=new Zn(v,S);else if(m.mode===wn.LINE_STRIP)p=new gi(v,S);else if(m.mode===wn.LINE_LOOP)p=new jr(v,S);else if(m.mode===wn.POINTS)p=new Xr(v,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&G_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ri(p,r),m.extensions&&ps(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,b=u.length;f<b;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ps(s,u[0],r),u[0];let d=new on;r.extensions&&ps(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,b=u.length;f<b;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(us.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Bi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ri(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let d=new Ve;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new $r(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let f=s.channels[u],b=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[b.input]:b.input,S=s.parameters!==void 0?s.parameters[b.output]:b.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",S)),l.push(b),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],b=u[2],v=u[3],m=u[4],p=[];for(let A=0,_=d.length;A<_;A++){let M=d[A],E=f[A],R=b[A],x=v[A],T=m[A];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let I=n._createAnimationTracks(M,E,R,x,T);if(I)for(let L=0;L<I.length;L++)p.push(I[L])}let S=new na(r,void 0,p);return ri(S,s),S})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,W_)});for(let f=0,b=u.length;f<b;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,b=u[0];h.pivot=new O().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],b.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Ks:l.length>1?h=new on:l.length===1?h=l[0]:h=new yt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ri(h,r),r.extensions&&ps(n,h,r),r.matrix!==void 0){let u=new Ve;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new on;n.name&&(r.name=s.createUniqueName(n.name)),ri(r,n),n.extensions&&ps(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?r.add(op(d)):r.add(d)}let l=h=>{let u=new Map;for(let[d,f]of s.associations)(d instanceof nn||d instanceof Vt)&&u.set(d,f);return h.traverse(d=>{let f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}$i[r.path]===$i.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch($i[r.path]){case $i.weights:h=xi;break;case $i.rotation:h=vi;break;case $i.translation:case $i.scale:h=ki;break;default:n.itemSize===1?h=xi:h=ki;break}let u=s.interpolation!==void 0?k_[s.interpolation]:is,d=this._getArrayFromAccessor(n);for(let f=0,b=c.length;f<b;f++){let v=new h(c[f]+"."+$i[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=uu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof vi?cu:Vl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function $_(i,e,t){let n=e.attributes,s=new tn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new O(c[0],c[1],c[2]),new O(l[0],l[1],l[2])),o.normalized){let h=uu(fr[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new O,c=new O;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,b=d.max;if(f!==void 0&&b!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(b[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(b[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(b[2]))),d.normalized){let v=uu(fr[d.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new cn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function dp(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=hu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Xe.workingColorSpace!==en&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),ri(i,e),$_(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?z_(i,e.targets,t):i})}var pp=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var S=new Uint8Array(p.length),A=0;A<p.length;++A){var _=p.charCodeAt(A);S[A]=_>96?_-97:_>64?_-39:_+4}for(var M=0,A=0;A<p.length;++A)S[M++]=S[A]<60?n[S[A]]:(S[A]-60)*64+S[++A];return S.buffer.slice(0,M)}function c(p,S,A,_,M,E,R){var x=p.exports.sbrk,T=_+3&-4,I=x(T*M),L=x(E.length),z=new Uint8Array(p.exports.memory.buffer);z.set(E,L);var G=S(I,_,M,L,E.length);if(G==0&&R&&R(I,T,M),A.set(z.subarray(I,I+_*M)),x(I-x(0)),G!=0)throw new Error("Malformed buffer data: "+G)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(p){var S={object:new Worker(p),pending:0,requests:{}};return S.object.onmessage=function(A){var _=A.data;S.pending-=_.count,S.requests[_.id][_.action](_.value),delete S.requests[_.id]},S}function b(p){for(var S="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+c.toString()+m.toString(),A=new Blob([S],{type:"text/javascript"}),_=URL.createObjectURL(A),M=u.length;M<p;++M)u[M]=f(_);for(var M=p;M<u.length;++M)u[M].object.postMessage({});u.length=p,URL.revokeObjectURL(_)}function v(p,S,A,_,M){for(var E=u[0],R=1;R<u.length;++R)u[R].pending<E.pending&&(E=u[R]);return new Promise(function(x,T){var I=new Uint8Array(A),L=++d;E.pending+=p,E.requests[L]={resolve:x,reject:T},E.object.postMessage({id:L,count:p,size:S,source:I,mode:_,filter:M},[I.buffer])})}function m(p){var S=p.data;self.ready.then(function(A){if(!S.id)return self.close();try{var _=new Uint8Array(S.count*S.size);c(A,A.exports[S.mode],_,S.count,S.size,S.source,A.exports[S.filter]),self.postMessage({id:S.id,count:S.count,action:"resolve",value:_},[_.buffer])}catch(M){self.postMessage({id:S.id,count:S.count,action:"reject",value:M})}})}return{ready:a,supported:!0,useWorkers:function(p){b(p)},decodeVertexBuffer:function(p,S,A,_,M){c(r,r.exports.meshopt_decodeVertexBuffer,p,S,A,_,r.exports[l[M]])},decodeIndexBuffer:function(p,S,A,_){c(r,r.exports.meshopt_decodeIndexBuffer,p,S,A,_)},decodeIndexSequence:function(p,S,A,_){c(r,r.exports.meshopt_decodeIndexSequence,p,S,A,_)},decodeGltfBuffer:function(p,S,A,_,M,E){c(r,r.exports[h[M]],p,S,A,_,r.exports[l[E]])},decodeGltfBufferAsync:function(p,S,A,_,M){return u.length>0?v(p,S,A,h[_],l[M]):a.then(function(){var E=new Uint8Array(p*S);return c(r,r.exports[h[_]],E,p,S,A,r.exports[l[M]]),E})}}})();async function py(i){let e=new Uint8Array(i);if(e[0]!==31||e[1]!==139)return i;if(typeof DecompressionStream<"u")return new Response(new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();let{gunzipSync:t}=await Promise.resolve().then(()=>(Yp(),Kp)),n=t(e);return n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength)}async function Jp(i,e,t){let n=new URL(e,globalThis.location?.href);if(!n.pathname.endsWith(".gz"))return i.loadAsync(n.href,t);let s=await fetch(n);if(!s.ok)throw Error("Model request failed: "+s.status);let r=Number(s.headers.get("content-length"))||0,a=s.body.getReader(),o=[],c=0;for(;;){let{done:d,value:f}=await a.read();if(d)break;o.push(f),c+=f.length,t?.({loaded:c,total:r})}let l=new Uint8Array(c),h=0;for(let d of o)l.set(d,h),h+=d.length;let u=await py(l.buffer);if(new DataView(u).getUint32(0,!0)!==1179937895)throw Error("Invalid model response");return i.parseAsync(u,new URL("./",n).href)}var Ze=(i,e=2)=>Number.isFinite(i)?i.toFixed(e):"\u2014",Zp=["#d29a40","#3e9c8b","#578fc7","#9767b6"],Ti=(i,e)=>`<div class="table-scroll"><table><thead><tr>${i.map(t=>`<th>${D(t)}</th>`).join("")}</tr></thead><tbody>${e.map(t=>`<tr>${t.map(n=>`<td>${n}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;function tc(i,e){let l=S=>[38+(S[0]-2.8)*36,56+(-2.5-S[1])*36],h=S=>S.map((A,_)=>(_?"L":"M")+l(A).map(M=>M.toFixed(2)).join(",")).join(" ")+" Z",u=i.elements.filter(S=>S.region==="house"&&S.level===0&&["walls","openings"].includes(S.category)&&S.bounds[0][0]>=3&&S.bounds[1][0]<=14.1&&S.bounds[0][1]<-3&&S.bounds[1][1]>-16.5),d=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 625" role="img" aria-label="Candidate joist directions above ground-floor walls; no 8.6 metre clear span assumed"><rect width="920" height="625" fill="#f8fafc"/><style>text{font-family:Arial,sans-serif;fill:#29465c}.small{font-size:12px}.title{font-size:17px;font-weight:bold}</style><defs>${Zp.map((S,A)=>`<marker id="arrow${A}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${S}"/></marker>`).join("")}</defs><text x="34" y="28" class="title">First-floor span directions / ground-floor supports below</text>`;for(let S of u){let[A,_]=S.bounds;d+=`<path d="${h([[A[0],A[1]],[_[0],A[1]],[_[0],_[1]],[A[0],_[1]]])}" fill="${S.category==="openings"?"#edc78b":"#c1cdd5"}" stroke="#8ba0ae" stroke-width=".7"><title>${D(S.name)}</title></path>`}let f=[["Garage",[7.3,-12.8]],["Utility",[12.6,-15.4]],["Gym",[11.6,-6.7]],["Gallery / void",[6.5,-6.7]]];for(let[S,A]of f){let[_,M]=l(A);d+=`<text x="${_}" y="${M}" text-anchor="middle" class="small">${D(S)}</text>`}for(let[S,A]of e.floors.slice(0,3).entries()){let[_,M]=A.axis.map(l),E=Zp[S],R=[(_[0]+M[0])/2,(_[1]+M[1])/2];d+=`<path d="M${_}L${M}" stroke="${E}" stroke-width="3" marker-start="url(#arrow${S})" marker-end="url(#arrow${S})"/><rect x="${R[0]-41}" y="${R[1]-11}" width="82" height="23" rx="4" fill="#fff"/><text x="${R[0]}" y="${R[1]+5}" text-anchor="middle" font-size="12" font-weight="bold">${A.id} \xB7 ${Ze(A.clearSpanM)} m</text>`}let[b,v]=[[9.2,-9.905],[9.2,-4.23]].map(l);d+=`<path d="M${b}L${v}" stroke="#bf6370" stroke-width="3" stroke-dasharray="7 4"/>`;let m=[["Corrected span basis","8.59 m is the overall floor-mesh width.","It crosses separate rooms and a dividing wall.","It is not a clear joist span."],["J-01 / garage","6.06 m north-south candidate.","Parallel to the large west garage opening.","South and garage/store bearing lines unverified."],["J-02 / utility","2.32 m east-west candidate.","Garage dividing wall to east external wall."],["J-03 / gym","4.49 m east-west candidate.","Dashed red line: proposed bearing timber stud wall.","Timber headers and supporting studs at openings."],["J-04 / west wing (outside this diagram)","4.95 m east-west candidate.","Check original-house junction and its openings."]],p=65;for(let[S,...A]of m){d+=`<text x="520" y="${p}" font-size="13" font-weight="bold">${D(S)}</text>`,p+=24;for(let _ of A)d+=`<text x="520" y="${p}" class="small">${D(_)}</text>`,p+=20;p+=23}return d+='<text x="34" y="606" font-size="11">MODEL DIMENSIONS ONLY \xB7 BAY ARROWS, NOT A JOIST LAYOUT \xB7 NOT FOR CONSTRUCTION</text></svg>',d}function Qp(i,e,t="reference"){let n=e.scenarios.find(h=>h.id===t),s=h=>h.cases.find(u=>u.scenario===t),r=e.floors.map(h=>{let u=s(h),d=u.choices[0],f=d.candidate;return[`<strong>${h.id}</strong><br>${D(h.name)}`,`${Ze(h.clearSpanM,3)} / ${Ze(u.engineeringSpanM,3)} m`,f?`${D(f.name)} @ 400 mm<br><small>Table limit ${Ze(f.maximumEngineeringSpanMm/1e3,3)} m</small>`:"Outside table",`${Ze(u.illustrativeBuildUpMm,0)} mm`,`<button data-trial-element="${h.elementIds[0]}">Locate \u2197</button>`]}),a=e.beams.map(h=>{let u=s(h),d=u.candidate;return[`<strong>${h.id}</strong><br>${D(h.name)}`,`${Ze(u.gkExcludingSelfKNm)} / ${Ze(u.qkKNm)} kN/m`,d?`${D(d.section)}<br><small>S355; conditional shortlist</small>`:"No shortlist candidate",d?`${Ze(d.uls.momentKNm)} kNm<br>${Ze(d.uls.reactionKN)} kN/end`:"\u2014",d?`${Ze(d.sls.deflectionMm)} / ${Ze(d.totalDeflectionLimitMm)} mm`:"\u2014"]}),o=e.basement.cases.find(h=>h.scenario===t),c=e.lintels.filter(h=>h.cases.length),l=e.quantityRates;return`<div class="trial-head"><div><p class="eyebrow">UK EXPERIMENTAL STUDY \xB7 ${D(e.revision)}</p><h1>Test the assumptions.</h1><p>${D(e.boundsMeaning)}</p></div><label>Scenario<select id="trial-scenario">${e.scenarios.map(h=>`<option value="${h.id}" ${h.id===t?"selected":""}>${D(h.label)}</option>`).join("")}</select></label></div>
 <div class="trial-metrics"><div><small>Permanent floor load</small><strong>${Ze(n.floorGk)} kN/m\xB2</strong></div><div><small>Domestic imposed load</small><strong>${Ze(n.floorQk)} kN/m\xB2</strong></div><div><small>Span allowance</small><strong>+${Ze(n.spanAllowanceM*1e3,0)} mm</strong></div></div>
 <article class="trial-card"><h2>Direction before size</h2><p>${D(e.correction)}</p>${tc(i,e)}<p>Arrows show local bearing-line hypotheses, not confirmed structural supports or joist cut lengths. Every reaction must reach a designed foundation, including through the basement.</p></article>
 <article class="trial-card"><h2>Floors / James Jones JJI comparison</h2>${Ti(["Bay","Clear / engineering span","First shallow candidate at 400","Illustrative build-up","Model"],r)}<p>${D(e.floorLoadBasis)}</p><p>${D(e.joistConditions)}</p><p>Build-up = joist + 22 mm deck + 15 mm ceiling + 20 mm finish allowance. Services, acoustic/fire layers and actual finish may add depth. Compare with the current 200 mm architectural floor envelope before changing levels or headroom.</p>
 ${e.floors.map(h=>`<details><summary>${h.id} \xB7 ${D(h.name)}: support and spacing options</summary><p>${D(h.direction)}. ${D(h.alternate)}</p><p>${D(h.supportStatus)}</p>${Ti(["Centres","Conditional table candidate","Published engineering span"],s(h).choices.map(u=>[`${u.spacingMm} mm`,u.candidate?D(u.candidate.name):"No candidate",u.candidate?`${Ze(u.candidate.maximumEngineeringSpanMm/1e3,3)} m`:"\u2014"]))}<p>2.0 kN/m\xB2 permanent + 2.0 kN/m\xB2 imposed stress case: outside this table; bespoke supplier design needed.</p></details>`).join("")}</article>
 <article class="trial-card"><h2>Preferred gym wall / load-bearing timber framing</h2><p>${D(e.timberWall.basis)}</p><p>${D(e.timberWall.loadBasis)}</p>${Ti(["Opening","Conditional header screen","End reaction, ULS","Bearing length indication","Extra head height*"],e.timberHeaders.map(h=>{let u=s(h),d=u.candidate;return[`${h.id} \xB7 ${D(h.name)}<br>${Ze(h.clearSpanM)} m`,d?D(d.section):"No candidate in this C24 shortlist",d?`${Ze(Math.max(...d.strengthCases.map(f=>f.reactionKN)))} kN`:"\u2014",d?`${Ze(d.requiredDirectBearingLengthMm,0)} mm`:"\u2014",d?`${Ze(u.extraHeightWith90MmPlateAllowance,0)} mm`:"\u2014"]}))}<p>*Illustrative header plus 90 mm top-plate allowance compared with the current head zone. This is a coordination test, not a specified plate detail. Do not adopt a candidate without checking stud packs, bearing, connections, lateral restraint and fire protection.</p><p>${D(e.timberWall.coordination)}</p><p class="trial-note">${D(e.timberWall.supportBelow)}</p><p>A heavier assumed case that falls outside the C24 shortlist triggers a revised header arrangement or UK-supplied LVL design; it does not establish that masonry piers or a long steel beam are needed.</p></article>
 <article class="trial-card"><h2>Steel / garage head and gym comparison only</h2>${Ti(["Study","Gk excl. self / Qk","Trial section","ULS demand","SLS deflection / limit"],a)}<p>${D(e.steelConditions)}</p><p>${D(e.steelDeflection)}</p>${e.beams.map(h=>`<details><summary>${h.id} \xB7 ${D(h.name)}: loads and all candidates</summary><p>${D(h.basis)}</p>${Ti(["S355 UB","MEd / elastic reference","SLS deflection","Limited screen"],s(h).screens.map(u=>[D(u.section),`${Ze(u.uls.momentKNm)} / ${Ze(u.elasticMomentResistanceKNm)} kNm`,`${Ze(u.sls.deflectionMm)} mm`,u.withinScreen?"Within these checks only":"Outside one or more checks"]))}</details>`).join("")}<p class="trial-note">No column, post, connection, padstone or foundation has been designed for these beam reactions. The full-span gym steel comparison is not the preferred scheme; its loading basis differs from the timber-wall study, which also allows a gallery-side tributary width.</p></article>
 <article class="trial-card"><h2>Opening heads / Catnic sensitivity</h2><p>${e.lintels.length} modelled heads registered; ${c.length} new external heads have a generic cavity-lintel load comparison. This is not a completed lintel schedule.</p>${Ti(["Head / model proxy span","Unfactored total load","Catalogue comparison","Result"],c.map(h=>{let u=s(h);return[`<button data-trial-element="${h.id}">${D(h.name.replace("Proposal | ",""))}</button><br>${Ze(u.proxySpanM)} m`,`${Ze(u.totalUnfactoredUDLKN)} kN<br>inner:outer ${Ze(u.innerOuterRatio,0)}:1`,u.candidate?`CG150/100 \xB7 ${u.candidate.lengthMm} mm<br>SWL ${u.candidate.swlKN} kN`:"Outside length range",u.withinPublishedDomain?u.withinSWL?"Within generic SWL only":"Exceeds generic SWL":"Load ratio outside listed cases"]}))}<p>Assumed outer masonry load = 20 kN/m\xB3 \xD7 102.5 mm \xD7 ${t==="low"?"0.6":t==="reference"?"1.2":"2.4"} m height. Inner:outer ratio ${t==="low"?"1:1":t==="reference"?"3:1":"6:1"}. No arching reduction. No point loads. Catalogue length assumes 150 mm bearing each end; model head extent is not a verified opening or bearing. SWL is compared to unfactored UDL, never to factored ULS.</p><p>Catalogue cavity 150\u2013165 mm, inner leaf 100\u2013115 mm, outer leaf stated 100\u2013102 mm. Confirm suitability for the intended 102.5 mm brick and final cavity. Wall strength, bearing, restraint, trays, fire and actual loading require manufacturer/engineer confirmation.</p></article>
 <article class="trial-card"><h2>UK-T01 generic basement pressure sensitivity</h2><p class="trial-note">This earlier sensitivity uses a 250 mm base self-weight and 2.58 m wall quantity height; it is not the current raft layout. Open <strong>Foundations</strong> for the F01 reference geometry, actual modelled concrete weight and updated groundwater comparisons.</p><div class="trial-metrics"><div><small>Water head above base underside</small><strong>${Ze(n.waterHeadM)} m</strong></div><div><small>Base lateral pressure</small><strong>${Ze(o.basePressureKPa)} kPa</strong></div><div><small>Unfactored buoyancy</small><strong>${Ze(o.upliftKN,0)} kN</strong></div></div>${Ti(["K\u2080 / surcharge","Dry / saturated soil weight","Lateral resultant","Cantilever base moment"],[[`${n.K0} / ${n.surchargeKPa} kPa`,`${n.soilGamma} / ${n.saturatedGamma} kN/m\xB3`,`${Ze(o.resultantKNperM)} kN/m`,`${Ze(o.cantileverBaseMomentKNmPerM)} kNm/m`]])}<p>${D(e.basementBasis)}</p><p>Footprint ${Ze(e.basement.areaM2)} m\xB2. Current 250 mm base self-weight alone: ${Ze(o.currentBaseSelfWeightOnlyKN,0)} kN. This is not the complete building resistance and no flotation pass/fail is issued. Ground bearing capacity and reinforcement remain unknown.</p></article>
 <article class="trial-card"><h2>Quantity sensitivity / measured geometry and UK unit sizes</h2>${Ti(["Trial thickness","Base only","Walls only, 2.58 m high"],e.basement.concreteVolumes.map(h=>[`${Ze(h.thicknessM*1e3,0)} mm`,`${Ze(h.baseVolumeM3)} m\xB3`,`${Ze(h.wallVolumeM3)} m\xB3`]))}<p>Thicknesses are volume scenarios, not designed concrete sections. Same external stepped footprint; wall corners counted once, no openings deducted. Excludes roof slab, blinding, foundations, construction joints and waste.</p>${Ti(["Per 100 m\xB2 NET leaf","No waste","+5%","+10%"],[["215 \xD7 102.5 \xD7 65 brick",...l.brickCountsPer100M2],["440 \xD7 215 face block",...l.blockCountsPer100M2]])}<p>${D(l.basis)}</p></article>
 <article class="trial-card"><h2>Calculation basis and unresolved work</h2>${Object.entries(e.formulas).map(([h,u])=>`<p><strong>${D(h)}</strong> \xB7 ${D(u)}</p>`).join("")}<ul>${e.unresolved.map(h=>`<li>${D(h)}</li>`).join("")}</ul><p>${D(e.basis)}</p><div class="trial-sources">${e.sources.map(h=>`<a href="${D(h.url)}" target="_blank" rel="noopener">${D(h.title)} \u2197</a>`).join("")}</div><a href="./trials.json" download>Download inputs, all candidates and results \xB7 JSON \u2193</a></article>`}var em={"padstone-envelope":"Padstone + grout shown","steel-seat-envelope":"Steel bearing seat shown","concrete-seat-envelope":"Concrete bearing shown","steel-connection-required":"Steel joint needs design","masonry-bearing-unresolved":"Masonry bearing unresolved","support-unresolved":"Support unresolved"},Ar=i=>i?.length?`<button class="text-button" data-junction-pair="${D(i.join(","))}">Inspect this support \u2197</button>`:"";function tm(i){let e=i.endBearingReview??[],t=i.upperMasonryTransfer,n=i.assumedRetainedContinuity?[i.assumedRetainedContinuity]:i.assumedRetainedTransfer??[],s=i.supersededOpeningHeads??[];return(e.length?`<h2>Beam-end support review</h2>${e.map(r=>`<p><strong>End ${r.end} \xB7 ${D(em[r.kind]??r.kind)}</strong><br>${D(r.detail)}</p>${Ar([i.id,...r.supportIds])}`).join("")}`:"")+(t?`<h2>Upper masonry bearing</h2><p>${D(t.basis)}</p><p>Floor loads alone do not size this transfer. Masonry, facade and any roof reactions must also be included.</p>${Ar([i.id,t.wallId,t.id])}`:"")+(n.length?`<h2>Assumed existing pier continuity</h2><p>The grey pier band connects the aligned walls above and below. Concealed masonry, its condition and capacity have not been surveyed; it is excluded from new-work quantities.</p>${n.map(r=>`<p>${D(r.basis)}</p>${Ar([...new Set([i.id,r.beamId,r.memberId,r.bedId,r.lowerSourceId,r.upperSourceId].filter(Boolean))])}`).join("")}<p>Beam design must include the supported wall loads. Pockets and bearing beds are coordination allowances.</p>`:"")+(s.length?`<h2>Combined opening head</h2>${s.map(r=>`<p>${D(r.basis)}</p><p>Replaces ${D(r.memberId)}. Complete opening and floor loads, flange-width distribution and steel connections remain uncalculated.</p>`).join("")}`:"")}function nm(i){let e=i.cavityClosure,t=i.cavityClosures??[];return e?`<h2>Cavity termination</h2><p>${(e.cavityWidthM*1e3).toFixed(0)} mm cavity, with a ${(e.nominalDepthM*1e3).toFixed(0)} mm closure envelope. Insulation and moisture-resistant profile are separate selectable parts.</p><p>Product, seals, fixing and fire performance remain unselected. This detail carries no beam or masonry load.</p>${Ar([i.id,...i.relatedMemberIds??[],...e.penetrationMemberIds])}`:t.length?`<h2>Cavity termination</h2>${t.map(n=>`<p>${D(n.name)} \xB7 ${(n.cavityWidthM*1e3).toFixed(0)} mm cavity.</p>${Ar([i.id,...n.detailIds])}`).join("")}`:""}function im(i,e={}){let t=i.beamEndBearings;if(!t)return"";let n=new Map(i.elements.map(r=>[r.id,r])),s=t.ends.filter(r=>{let a=n.get(r.beamId);return a&&(e.region==="all"||!e.region||a.region===e.region)&&(a.condition!=="roof-rebuild"||e.roofOption!=="retain")&&(a.scope!=="garage-rebuild"||e.garageRebuild!==!1)});return`<article class="trial-card"><h2>Beam bearings and padstones</h2><p>${D(t.scope)}</p><details><summary>Review ${s.length} beam ends</summary><div class="table-scroll"><table><thead><tr><th>Beam / end</th><th>Support detail</th><th>Review</th></tr></thead><tbody>${s.map(r=>`<tr><td>${D(r.beamId)} \xB7 end ${r.end}<br>${D(r.beamName)}</td><td><strong>${D(em[r.kind]??r.kind)}</strong><br>${D(r.detail)}</td><td>${Ar([r.beamId,...r.supportIds])}</td></tr>`).join("")}</tbody></table></div></details></article>`}function bs(i,e={}){return!!i&&(!i.garageDeckOption||i.garageDeckOption===(e.garageDeck??"solid-rc"))&&(e.region==="all"||!e.region||i.region===e.region)&&(i.condition!=="roof-rebuild"||e.roofOption!=="retain")&&(i.condition!=="loft-upgrade"||e.loftUpgrade!==!1)&&(i.scope!=="garage-rebuild"||e.garageRebuild!==!1)}function my(i,e={}){e={...e,garageDeck:Zt(i,e?.garageDeck)};let t=new Map(i.elements.map(n=>[n.id,n]));return i.junctionReview.clashAudit.intersections.filter(n=>[n.a,n.b].every(s=>bs(t.get(s),e)))}var xs=(i,e,t="Inspect junction")=>`<button class="pair text-button" data-junction-pair="${D(i+","+e)}">${D(t)} \u2197</button>`;function gy(i){return i.every(e=>e==="masonry")?"Resolve the inner/outer leaf return and cavity alignment while preserving the opening and external face.":i.includes("partitions")?"Coordinate non-bearing wall heads and studs around the beam, including movement and fire-lining space.":i.includes("studs")||i.includes("framing-review")?"Establish the wall\u2019s bearing role before changing its head, studs or supporting steel.":i.includes("masonry")?"Review the wall bearing or pocket, padstone and cavity detail; an overlap does not prove adequate support.":i.includes("lintels")?"Resolve the competing lintel and beam arrangements and their loads; both are still provisional allowances.":i.includes("rc")?"Coordinate the steel level, concrete bearing and basement construction detail.":i.every(e=>e==="beams")?"Resolve the intersecting ridge lines for the selected roof option and design the connection.":"Review the bearing/end geometry and member levels. Intermediate roof bearings and crossings have not been notched to hide the clash."}function by(i,e={}){e={...e,garageDeck:Zt(i,e?.garageDeck)};let t=i.coveringFit;if(!t)return"";let n=new Map(i.elements.map(a=>[a.id,a])),s=t.intersections.filter(a=>bs(n.get(a.memberId),e)),r=new Map;for(let a of s){let o=a.kind==="roof-lining"?"Upper roof linings":a.kind.includes("floor")||a.kind==="basement-finish"?"Floor coverings":"Ceiling coverings";r.has(o)||r.set(o,[]),r.get(o).push(a)}return`<article class="trial-card"><h2>Architecture: floor and ceiling fit</h2>${e.garageDeck==="beam-block"?"<p>BB01 is contained within the previous slab envelope and preserves the lining datums. Its own internal/shared-structure check is separate; these legacy covering measurements have not been recomputed for each precast part.</p>":""}<p>${t.measured.length} authored coverings were measured. <strong>${s.length} overlaps</strong> remain against the structural options currently selected; <strong>${t.unmeasured.length} unmeasured items</strong> are listed separately. These counts include roof and bearing interfaces beyond the horizontal floor-framing check.</p><p>${D(t.scope)}</p>${[...r].map(([a,o])=>`<details><summary>${D(a)} \xB7 ${o.length} overlaps</summary><div class="table-scroll"><table><thead><tr><th>Authored covering</th><th>Member</th><th>Overlap</th></tr></thead><tbody>${o.map(c=>`<tr><td>${D(c.objectName)}</td><td><button class="text-button" data-focus-member="${D(c.memberId)}">${D(c.memberId)}</button><br>${D(c.memberName)}</td><td>${c.overlapCm3==null?"Plane crossing":c.overlapCm3.toLocaleString("en-GB")+" cm\xB3"}</td></tr>`).join("")}</tbody></table></div></details>`).join("")}${t.unmeasured.length?`<details><summary>Unmeasured surfaces and members \xB7 ${t.unmeasured.length}</summary>${t.unmeasured.map(a=>`<p><strong>${D(a.objectName??a.memberId)}</strong><br>${D(a.reason)}</p>`).join("")}</details>`:""}<p><a href="./covering-fit.json" download>Complete finish-fit measurements \xB7 JSON \u2193</a></p></article>`}function sm(i,e){e={...e,garageDeck:Zt(i,e?.garageDeck)};let t=i.junctionReview,n=new Map(i.elements.map(c=>[c.id,c])),s=my(i,e),r=t.endCuts.filter(c=>bs(n.get(c.memberId),e)&&bs(n.get(c.supportId),e)),a=new Map;for(let c of s){let l=c.categories.map(h=>Dn[h].label).sort().join(" / ");a.has(l)||a.set(l,[]),a.get(l).push(c)}let o=c=>c.map(l=>`<tr><td><strong>${D(l.a)} / ${D(l.b)}</strong><div class="member-names">${D(n.get(l.a).name)}<br>${D(n.get(l.b).name)}</div></td><td>${l.overlapCm3.toLocaleString("en-GB")} cm\xB3</td><td>${xs(l.a,l.b)}</td></tr>`).join("");return`<p class="eyebrow">M11 \xB7 GEOMETRY COORDINATION</p><h1>Inspect how the parts meet.</h1><p class="intro">This review follows the building and roof/garage/loft options selected on the left. It includes every level and system in that selection. Exact solid intersections identify overlaps; they do not establish bearing capacity or a complete load path.</p>
 <div class="trial-metrics"><div><small>Remaining solid overlaps \xB7 selected options</small><strong>${s.length}</strong></div><div><small>Coordinated end cuts \xB7 selected options</small><strong>${r.length}</strong></div><div><small>Corner junctions reviewed \xB7 whole study</small><strong>${t.masonry.corners.length}</strong></div></div>
 <div class="junction-actions"><button class="outline compact" id="export-cuts">Model dimensions \xB7 CSV \u2193</button><a href="./junction-review.json" download>Full junction review \xB7 JSON \u2193</a></div>
 ${im(i,e)}
 ${by(i,e)}
 <article class="trial-card"><h2>Clearances and connections</h2><p>${D(t.basis)}</p><p>The model reserves <strong>${t.assumptions.joistEndGapMm} mm</strong> between a joist end and the back plate of its generic hanger, a <strong>${t.assumptions.hangerPlateMm} mm</strong> hanger plate, <strong>${t.assumptions.beamEndClearanceMm} mm</strong> at coordinated secondary steel ends and <strong>${t.assumptions.rafterEndClearanceMm} mm</strong> at coordinated roof-member ends. These are model assumptions, not approved fabrication tolerances.</p><p>I-joist ends remain square with intact flanges. No flange notches, service holes, bolt patterns or weld sizes are inferred. Hanger products, bearing, restraint and steel connection design remain outstanding. The model dimension export is <strong>not a cutting or fabrication schedule</strong>.</p></article>
 <article class="trial-card"><h2>Joist and hanger fit check</h2><p>Across the whole study, ${t.connectionFit.assemblies} hanger assemblies and ${t.connectionFit.solidPairsChecked} linked solid pairs were checked. ${t.connectionFit.intersections.length} positive-volume overlaps and ${t.connectionFit.seatLevelErrors.length} seat-level discrepancies remain in this specific check.</p><p>${D(t.connectionFit.scope)}</p></article>
 <article class="trial-card"><h2>Remaining overlaps</h2><p>${D(t.clashAudit.method)} Some overlaps mark an intended bearing pocket; others need a changed assembly or level. Each pair remains visible for review. This is not a clash-free certificate.</p>${[...a].sort((c,l)=>l[1].length-c[1].length).map(([c,l])=>`<details><summary>${D(c)} \xB7 ${l.length}</summary><p>${D(gy(l[0].categories))}</p><div class="table-scroll"><table><thead><tr><th>Members</th><th>Overlap volume</th><th>3D detail</th></tr></thead><tbody>${o(l)}</tbody></table></div></details>`).join("")||"<p>No positive-volume overlaps in the selected audit scope.</p>"}<p class="muted">${D(t.scopeLimit)}</p></article>
 <article class="trial-card"><h2>Coordinated end geometry</h2><p>Full-section end setbacks and plumb roof-member ends avoid passing through a steel face. The connection across each gap still needs to be designed.</p><details><summary>Review ${r.length} end cuts</summary><div class="table-scroll"><table><thead><tr><th>Member / receiver</th><th>End geometry</th><th>3D detail</th></tr></thead><tbody>${r.map(c=>`<tr><td>${D(c.memberId)}<br>${D(c.supportId)}</td><td>End ${c.end} \xB7 ${D(c.cut)}<br>${c.setbackMm} mm setback; ${c.modelClearanceMm} mm nominal gap</td><td>${xs(c.memberId,c.supportId)}</td></tr>`).join("")}</tbody></table></div></details></article>
 <article class="trial-card"><h2>Non-bearing heads below steel</h2><p>Complete panel heads and their studs move together beneath parallel downstand beams. The ${t.assumptions.partitionSteelClearanceMm} mm gap is a combined movement/fire-lining space allowance; the actual movement, steel protection and head/sealing system remain to be designed. Cross-beam junctions remain in the overlap list.</p>${t.partitionHeads.filter(c=>bs(n.get(c.headId),e)&&bs(n.get(c.beamId),e)).map(c=>`<p><strong>${D(c.headId)}</strong> \xB7 ${c.dropMm} mm lower, with ${c.studIds.length} shortened studs.</p>${xs([c.headId,...c.studIds].join(","),c.beamId,"Inspect complete partition head")}`).join("")}</article>
 ${e.garageDeck==="beam-block"?Ss(i,e):""}<article class="trial-card"><h2>Construction layers</h2><p>Use <strong>Floor build-ups</strong> to see selectable deck, finish, service-space and ceiling allowances. These layers follow the floor openings and are excluded from the cost subtotal. The schedule below records what remains missing.</p><div class="table-scroll"><table><thead><tr><th>System</th><th>Shown in the model</th><th>Still unresolved / not fully modelled</th></tr></thead><tbody>${t.layerSchedule.map(c=>{let l=e.garageDeck==="beam-block"&&c.system==="Basement and vehicle deck"?{...c,shown:"Selected beam-and-block system; provisional 150 mm precast beams and 100 mm nominal reinforced topping within the existing 250 mm structural envelope; original 75 mm finish/screed allowance and ceiling datum retained. Local RC edges retain the bearing-wall route."}:c;return`<tr><td><strong>${D(l.system)}</strong></td><td>${D(l.shown)}</td><td>${D(l.unresolved)}</td></tr>`}).join("")}</tbody></table></div></article>
 <article class="trial-card"><h2>Joist material preference</h2><p>${D(t.assumptions.materialPreference)}</p><p>The short ground-floor bays and west loft now have solid C24 candidates with limited floor-load screens. The ground-floor bays include staggered full-depth blocking and a rough stock comparison in Costs. Longer bays retain I-joist reservations pending complete manufacturer design; selected fire, acoustic, vibration and connection details remain open.</p></article>
 <div class="trial-sources">${t.assumptions.sources.map(c=>`<a href="${D(c.url)}" target="_blank" rel="noopener">${D(c.title)} \u2197</a>`).join("")}</div>`}function rm(i,e){let t=e.junctionReview;if(!t)return"";let n=t.clashAudit.intersections.filter(a=>a.a===i.id||a.b===i.id),s=i.connectionDetail,r=i.coveringFitClashes??[];return`${tm(i)}${nm(i)}${i.layoutAdjustment?`<h2>Layout adjustment</h2><p>Joist grid line moved from ${i.layoutAdjustment.originalCrossM.toFixed(3)} m to ${i.layoutAdjustment.currentCrossM.toFixed(3)} m (${Math.round(Math.abs(i.layoutAdjustment.currentCrossM-i.layoutAdjustment.originalCrossM)*1e3)} mm). ${D(i.layoutAdjustment.reason)}</p>`:""}
 ${s?`<h2>Hanger coordination</h2><p>${s.modelEndGapMm} mm nominal joist-end gap; ${s.plateMm} mm back plate; ${s.modelBearingLengthMm} mm modelled seat contact. Product and load capacity unverified.</p><p>${D(s.joistCut??"I-joist flanges stay intact; no site notches approved.")}</p>${xs(i.parentId,i.receiverId,"Inspect joist, hanger and receiver")}${s.infillMemberId?`<button class="text-button" data-focus-member="${D(s.infillMemberId)}">Inspect timber infill block</button>`:""}${s.infillStatus?`<p>${D(s.infillStatus)}</p>`:""}`:""}
 ${i.endCutDetails?.length?`<h2>Model end cuts</h2>${i.endCutDetails.map(a=>`<p>End ${a.end}: ${D(a.cut)}. ${a.setbackMm} mm setback with ${a.modelClearanceMm} mm nominal clearance.</p>${xs(i.id,a.supportId)}`).join("")}<p>Model dimensions only. Connection and fabrication design outstanding.</p>`:""}
 ${i.partitionHeadCoordination?`<h2>Non-bearing head adjustment</h2><p>${i.partitionHeadCoordination.dropMm} mm lower with ${i.partitionHeadCoordination.nominalSteelClearanceMm} mm nominal clearance below steel. ${D(i.partitionHeadCoordination.basis)}</p>${xs([i.partitionHeadCoordination.headId,...i.partitionHeadCoordination.studIds].join(","),i.partitionHeadCoordination.beamId,"Inspect complete panel head")}`:""}
 ${i.cornerCoordination?`<h2>Masonry corner</h2><p>${D(i.cornerCoordination.basis)}</p>`:""}
 ${r.length?`<h2>Architectural covering overlaps</h2><p>${r.length} authored floor, ceiling or roof-lining intersections require coordination. The architecture remains visible when inspecting this member in the walkthrough.</p><details><summary>Covering names and measured overlap</summary>${r.map(a=>`<p><strong>${D(a.objectName)}</strong><br>${a.overlapCm3==null?"Plane crossing":a.overlapCm3.toLocaleString("en-GB")+" cm\xB3"}</p>`).join("")}</details>`:""}
 ${n.length?`<h2>Measured overlaps \xB7 all options</h2><p>${n.length} overlapping solid pair${n.length===1?"":"s"}. Inspecting a pair enables its required options.</p>${n.slice(0,8).map(a=>xs(a.a,a.b,(a.a===i.id?a.b:a.a)+" \xB7 "+a.overlapCm3+" cm\xB3")).join("")}${n.length>8?"<p>All pairs are listed in Junctions.</p>":""}`:""}`}function am(i,e){e={...e,garageDeck:Zt(i,e?.garageDeck)};let t=new Map(i.elements.map(r=>[r.id,r])),n=["id","section","modelLengthMm","endTreatment","ends","headAdjustment","fabricationReady"],s=r=>'"'+String(typeof r=="object"?JSON.stringify(r):r??"").replaceAll('"','""')+'"';return"\uFEFF"+[n.map(s).join(","),...i.junctionReview.cutSchedule.filter(r=>bs(t.get(r.id),e)).map(r=>n.map(a=>s(r[a])).join(","))].join(`\r
`)+`\r
`}var om={"loadbearing-proposal":"Load-bearing \xB7 proposed","non-loadbearing":"Non-load-bearing partition",unresolved:"Role unresolved"},xy={new:"New work",alteration:"Alteration to existing","garage-rebuild":"Garage rebuild",retained:"Retained \xB7 survey required"};function nc(i,{garageRebuild:e=!0,loftUpgrade:t=!0,roofOption:n="replace",region:s="house",scope:r="all",garageDeck:a=Zt(i),rates:o=i.rates}={}){return o={...i.garageBeamBlock?.rates,...o},oc(i).filter(c=>(!c.garageDeckOption||c.garageDeckOption===a)&&!c.retained&&c.cost&&c.cost.quantity>0&&(c.condition!=="loft-upgrade"||t)&&(c.condition!=="roof-rebuild"||n==="replace")&&(c.scope!=="garage-rebuild"||e)&&(s==="all"||c.region===s)&&(r==="all"||c.scope===r)).map(c=>{let l=o[c.cost.rateKey];return{id:c.id,name:c.name,roofOption:n,garageDeck:a,scope:c.scope,category:c.category,framingRole:c.framingRole??null,material:c.material??null,quantity:c.cost.quantity,rateKey:c.cost.rateKey,unit:l.unit,status:c.status,low:c.cost.quantity*l.low,reference:c.cost.quantity*l.reference,high:c.cost.quantity*l.high}})}function ic(i){return i.reduce((e,t)=>({low:e.low+t.low,reference:e.reference+t.reference,high:e.high+t.high}),{low:0,reference:0,high:0})}function vy(i){return Object.entries(om).map(([e,t])=>{let n=i.filter(s=>s.framingRole===e&&s.rateKey==="timber"&&s.unit==="m\xB3");return{label:t,count:n.length,quantity:n.reduce((s,r)=>s+r.quantity,0),...ic(n)}}).filter(e=>e.count)}var Pn=i=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",maximumFractionDigits:0}).format(i);function _y(i,e,t){let n=i.groundDeckStudy?.solidFloorStudy;if(!n||!t.some(a=>n.joistIds.includes(a.id)))return"";let s=n.alternatives.map(a=>{let o=a.netJoistVolumeM3??a.netJoistLengthM,c=a.netJoistVolumeM3!=null?e.timber:e.ijoist;return`<tr><td>${D(a.label)}</td><td>${o.toFixed(2)} ${a.netJoistVolumeM3!=null?"m\xB3":"m"}</td>${["low","reference","high"].map(l=>`<td>${Pn(o*c[l])}</td>`).join("")}</tr>`}).join(""),r=n.stockAllocation;return`<article class="trial-card"><h2>G02 \xB7 Short-span solid timber comparison</h2><p>${n.joistIds.length} joists and ${n.blockingIds.length} staggered midspan blocks are drawn. These are experimental members with limited gravity screens; vibration, restraint and connections remain unverified. This comparison uses the same ${n.netJoistLengthM.toFixed(1)} m of joists in each option and your current unit allowances. Blocking and hangers are excluded from this comparison table but included where priced in the main subtotal.</p><div class="table-scroll"><table><thead><tr><th>Option</th><th>Net joists</th><th>Lower</th><th>Reference</th><th>Higher</th></tr></thead><tbody>${s}</tbody></table></div><p><strong>Illustrative stock allocation:</strong> ${r.length} \xD7 4.8 m lengths, including blocks cut from offcuts. Supplier-list supply benchmark ${Pn(n.stockSupplyBenchmarkExVAT)} ex VAT; separate from the installed allowance above.</p><p>${D(n.stockBasis)}</p><details><summary>Review rough stock allocation \xB7 not fabrication-ready</summary><div class="table-scroll"><table><thead><tr><th>Stock</th><th>Rough pieces</th><th>Remaining</th></tr></thead><tbody>${r.map((a,o)=>`<tr><td>${o+1} \xB7 4.8 m</td><td>${a.pieces.map(c=>`<button class="text-button" data-focus-member="${D(c.memberId)}">${D(c.memberId)}</button> ${c.roughCutMm} mm`).join("<br>")}</td><td>${a.remainingMm} mm</td></tr>`).join("")}</tbody></table></div></details><a href="${D(n.supplierReference.url)}" target="_blank" rel="noopener">UK stock-size / supply benchmark \u2197</a></article>`}function lm(i,e,t){t={...i.garageBeamBlock?.rates,...t},e={roofOption:"replace",loftUpgrade:!0,garageRebuild:!0,...e};let n=nc(i,{...e,rates:t}),s=ic(n),r=Object.entries(t).map(([l,h])=>({id:l,...h,quantity:n.filter(u=>u.rateKey===l).reduce((u,d)=>u+d.quantity,0)})).filter(l=>l.quantity>0),o=`<article class="trial-card"><h2>Wall framing by role</h2><p>Separate quantities within the subtotal above, using the same timber allowance. Non-load-bearing partitions are kept separate from proposed bearing frames; unresolved roles remain a distinct allowance.</p><div class="table-scroll"><table><thead><tr><th>Role</th><th>References</th><th>Timber m\xB3</th><th>Reference allowance</th></tr></thead><tbody>${vy(n).map(l=>`<tr><td>${D(l.label)}</td><td>${l.count}</td><td>${l.quantity.toFixed(3)}</td><td>${Pn(l.reference)}</td></tr>`).join("")}</tbody></table></div></article>`,c=ic(nc(i,{...e,garageRebuild:!0,scope:"garage-rebuild",rates:t}));return`<div class="trial-head"><div><p class="eyebrow">M16 \xB7 QUANTITY-LED ALLOWANCES</p><h1>Explore the shell costs.</h1><p><strong>Roof option ${e.roofOption==="replace"?"B \xB7 Remove and rebuild":"A \xB7 Retain and adapt"}.</strong> Priced subset of modelled new and altered work. Retained structure is excluded. All levels in the selected building; drawing layer toggles do not change this subtotal. Full replacement of the original loft joists is ${e.loftUpgrade!==!1?"included as an unverified allowance":"hidden and excluded in this comparison"}. The base scheme removes the existing loft joists and roof; lower floors remain retained.</p></div><button class="outline compact" id="export-cost">Export member CSV \u2193</button></div><div class="trial-note"><strong>Partial subtotal \u2014 not a complete shell budget.</strong> Uncalculated member reservations are included as allowances. The missing work below has no price yet. ${D(i.rateBasis)}</div><div class="trial-metrics">${[["low","Lower allowances"],["reference","Reference allowances"],["high","Higher allowances"]].map(([l,h])=>`<div><small>${h} \xB7 ex VAT</small><strong>${Pn(s[l])}</strong></div>`).join("")}</div><article class="trial-card"><h2>Original garage scenario</h2><p><strong>${e.garageRebuild!==!1?"Rebuild included \u2014 base scheme":"Retain original garage shell, subject to survey"}</strong>. The modelled wall/foundation reservations account for ${Pn(c.low)}\u2013${Pn(c.high)} (${Pn(c.reference)} reference) to this priced subset. This is <strong>not the full demolition/rebuild premium</strong>: demolition, excavation, propping and unknown foundation requirements are unpriced. New upper-storey work is common to both options.</p><p>${D(i.garageOption.basis)}</p></article><article class="trial-card"><h2>Editable unit allowances \xB7 GBP ex VAT</h2><p>Change any rate to test a quote or budget. Rates save in this browser. Net quantities exclude waste and are not an order list.</p><div class="table-scroll"><table><thead><tr><th>Package</th><th>Quantity</th><th>Low / unit</th><th>Reference / unit</th><th>High / unit</th><th>Reference subtotal</th></tr></thead><tbody>${r.map(l=>`<tr><td>${D(l.label)}</td><td>${l.quantity.toLocaleString("en-GB",{maximumFractionDigits:2})} ${D(l.unit)}</td>${["low","reference","high"].map(h=>`<td><input type="number" min="0" step="0.1" data-rate="${l.id}" data-bound="${h}" value="${l[h]}" aria-label="${D(l.label+" "+h+" rate")}"></td>`).join("")}<td>${Pn(l.quantity*l.reference)}</td></tr>`).join("")}</tbody></table></div><button class="text-button" id="reset-rates">Reset study allowances</button><p>${n.length} priced member/assembly references. Concrete excludes reinforcing steel and formwork; hanger and lintel products remain unselected.</p></article>${Ss(i,e)}${o}${_y(i,t,n)}<article class="trial-card"><h2>Unpriced / outside this subtotal</h2><ul>${i.excludedCosts.map(l=>`<li>${D(l)}</li>`).join("")}</ul></article>`}function cm(i,e,t){let n=["id","name","roofOption","garageDeck","scope","category","framingRole","material","status","quantity","unit","rateKey","low","reference","high"],s=r=>'"'+String(r??"").replaceAll('"','""')+'"';return"\uFEFF"+[n.map(s).join(","),...nc(i,{...e,rates:t}).map(r=>n.map(a=>s(r[a])).join(","))].join(`\r
`)+`\r
`}function hm(i){return`<p class="eyebrow">M11 \xB7 OPEN COORDINATION ITEMS</p><h1>See what still needs resolving.</h1><p class="intro">These are known issues and unverified assumptions, not an exhaustive clash or engineering audit. Select a reference to inspect its location in 3D.</p>${i.issues.map(e=>`<article class="trial-card"><span class="issue-kind">${D(e.severity)}</span><h2>${D(e.title)}</h2><p>${D(e.detail)}</p><div class="issue-refs">${e.elementIds.slice(0,8).map(t=>`<button data-focus-member="${D(t)}">${D(t)}</button>`).join("")}${e.elementIds.length>8?`<small>+ ${e.elementIds.length-8} related references</small>`:""}</div></article>`).join("")}`}function yy(i){let e=i.gardenEndSupports?`<h2>Terrace member ends</h2>${i.gardenEndSupports.map((s,r)=>`<p>End ${r+1}: <button class="text-button" data-focus-member="${D(s.memberId)}">${D(s.memberId)}</button> \xB7 ${Math.round(s.gapM*1e3)} mm model gap. Hanger/seat and capacity unverified.</p>`).join("")}`:"",t=i.foundationCoordination,n=t?`<h2>Below-ground reference</h2><p>${D(t.datum)}. Upper face ${t.topZ.toFixed(2)} m; underside ${t.bottomZ.toFixed(2)} m. ${D(t.basis)}</p>${t.bearingMemberId?`<button class="text-button" data-focus-member="${D(t.bearingMemberId)}">Inspect footing ${D(t.bearingMemberId)}</button>`:""}`:"";return e+n}function um(i,e,t,n={}){t={...e.garageBeamBlock?.rates,...t},n={...n,garageDeck:Zt(e,n.garageDeck)},n.garageDeck==="beam-block"&&i.masonryBearingAudit&&(i={...i,masonryBearingAudit:{...i.masonryBearingAudit,contacts:i.masonryBearingAudit.contacts.map(h=>({...h,memberId:h.memberId==="M-G01-GARAGE-SLAB"?"M-BB01-EDGE-RC":h.memberId}))}});let s=i.endSupports?`<h2>Joist ends</h2>${i.endSupports.map((h,u)=>`<p>End ${u+1}: ${h.kind==="receiver-reservation"?`<button class="text-button" data-focus-member="${D(h.memberId)}">${D(h.memberId)}</button> \xB7 receiver reservation; capacity unverified`:h.kind==="cantilever-tip"?"Free cantilever tip \xB7 no end hanger":"Unresolved support"}</p>`).join("")}`:"",r=i.cantilever?`<h2>Deliberate cantilever</h2><p>${i.cantilever.lengthM.toFixed(3)} m projection; ${i.cantilever.backspanM.toFixed(3)} m modelled backspan. <button class="text-button" data-focus-member="${D(i.cantilever.supportMemberId)}">Inspect inboard bearing</button>. ${D(i.cantilever.basis)}</p>`:"",a=i.endSupportCandidates?`<h2>Receiver end contacts</h2>${i.endSupportCandidates.map((h,u)=>`<p>End ${u+1}: ${h.wallCandidates.length?"near wall envelope "+D(h.wallCandidates.join(", ")):"no direct wall bearing identified"}; ${h.connectedReceivers.length} adjoining receivers. Geometric contact only; load path unverified.</p>`).join("")}`:"",o=i.measurements,c=[["Work scope",xy[i.scope]??i.scope],["Roof strategy",i.condition==="roof-rebuild"?"Option B only":"Shared / retained basis"],["Material proposal",i.material],["Framing role",om[i.framingRole]??i.framingRole],["Displayed section",i.section],["Length",o.lengthM?o.lengthM.toFixed(3)+" m":null],["Top / underside",`${i.bounds[1][2].toFixed(3)} / ${i.bounds[0][2].toFixed(3)} m`],["Centres",i.spacingMm?i.spacingMm+" mm":null],["Calculation basis",i.calculationRef??"Uncalculated space reservation"],["Net area",i.areaM2?i.areaM2.toFixed(2)+" m\xB2":null],["Visible masonry pieces",i.unitCount?i.unitCount.toLocaleString():null],["Quantity",i.cost?i.cost.quantity.toLocaleString("en-GB",{maximumFractionDigits:3})+" "+t[i.cost.rateKey].unit:null],["Reference allowance",i.cost?Pn(i.cost.quantity*t[i.cost.rateKey].reference)+" ex VAT":null],["Construction status","Not approved"]],l=e.issues.filter(h=>i.issueIds?.includes(h.id));return`<p class="eyebrow">MEMBER / ASSEMBLY INSPECTOR</p><span class="ref">${D(i.id)}</span><h2>${D(i.name)}</h2><span class="badge">${D(i.status)}</span><dl class="facts">${c.filter(h=>h[1]!=null).map(([h,u])=>`<div><dt>${D(h)}</dt><dd>${D(u)}</dd></div>`).join("")}</dl><p>${D(i.basis)}</p>${i.unitNote?`<p>${D(i.unitNote)}</p>`:""}${i.supportStatus?`<p><strong>Supports:</strong> ${D(i.supportStatus)}</p>`:""}${i.floorBandSupport?`<h2>Masonry through the floor</h2><p>Continues from ${i.floorBandSupport.bottomZ.toFixed(2)} to ${i.floorBandSupport.topZ.toFixed(2)} m onto the aligned wall/head below. Floor joists do not carry this leaf; capacity remains unverified.</p>${i.floorBandSupport.lowerWallIds.map(h=>`<button class="text-button" data-focus-member="${D(h)}">${D(h)}</button>`).join("")}`:""}${ed(i,ka(e,n.garageDeck))}${yy(i)}${Cy(i)}${Ry(i)}${Ey(i.supplierSpanCheck)}${Ay(i.supportScreen)}${wy(i.columnScreen)}${Ty(i)}${My(i.loadRoute)}${Zu(i,e,n)}${Sy(i)}${rm(i,e)}${s}${r}${i.intermediateSupports?.length?`<h2>Intermediate bearing proposals</h2>${i.intermediateSupports.map(h=>`<button class="text-button" data-focus-member="${D(h)}">${D(h)}</button>`).join("")}`:""}${i.proposedBeamLine?`<h2>Proposed continuous beam line</h2><p>${D(i.proposedBeamLine.id)} \xB7 ${D(i.proposedBeamLine.name)}. Model segments on this line do not imply fabrication splices.</p>`:""}${i.connectionRequirement?`<p><strong>Connection:</strong> ${D(i.connectionRequirement)}</p>`:""}${a}${i.receiverId?`<button class="text-button" data-focus-member="${D(i.receiverId)}">Inspect receiver ${D(i.receiverId)}</button>`:""}${i.parentId?`<button class="text-button" data-focus-member="${D(i.parentId)}">Inspect parent joist ${D(i.parentId)}</button>`:""}<button class="outline" id="focus-element">Focus in 3D</button><button class="outline" id="isolate-element" style="margin-top:8px">Isolate this assembly</button><h2>Open checks</h2>${l.map(h=>`<p class="member-issue"><strong>${D(h.title)}</strong><br>${D(h.detail)}</p>`).join("")}<ul class="check-list">${i.checks.map(h=>`<li>${D(h)}</li>`).join("")}</ul><p class="muted">Source objects: ${D(i.sourceIds?.join(", ")||"Explicit trial layout")}</p>`}function dm(i){if(!i.units)return i.triangles;let e=[...i.cutUnitTriangles??[]];for(let[t,n,s,r,a,o]of i.units){let c=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(([l,h,u])=>[t+l*r/2,n+h*a/2,s+u*o/2]);for(let[l,h,u,d]of[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]])e.push(c[l],c[h],c[u],c[l],c[u],c[d])}return e}var sc={all:Ci.filter(i=>i!=="layers"),steel:["beams"],floors:["beams","joists","trimmers","connections","details"],roof:["beams","rafters","trimmers","fascia"],walls:["studs","partitions","framing-review","lintels","masonry"],partitions:["partitions"],bearing:["studs"],connections:["connections","details"],layers:["layers","joists","beams","connections","details"],concrete:["rc"]};function fm(i,e,t){let n=new Set(i.elements.filter(a=>a.condition==="roof-rebuild").map(a=>a.id)),s=ic(nc(i,{roofOption:"replace",region:"house",rates:t}).filter(a=>n.has(a.id))),r=i.roofOptions;return`<p class="eyebrow">M11 \xB7 TWO STRUCTURAL STRATEGIES</p><h1>Keep the roof, or rebuild it.</h1><p class="intro">${D(r.externalForm)} Roof B and a completely new loft floor are the agreed base scheme. Option A remains available as a comparison. Existing lower floors and walls remain except for agreed alterations; the original garage rebuild is included by default and can be switched off for comparison.</p><div class="roof-option-grid">${r.options.map((a,o)=>`<article class="trial-card roof-option ${e.roofOption===a.id?"active":""}"><span class="eyebrow">OPTION ${o?"B":"A"} ${e.roofOption===a.id?"\xB7 SELECTED":""}</span><h2>${D(a.label.slice(4))}</h2><p>${D(a.description)}</p><dl class="facts"><div><dt>Original roof frame</dt><dd>${o?"Entirely replaced":"Retain where verified"}</dd></div><div><dt>New wings / dormers</dt><dd>Included in both options</dd></div><div><dt>Exterior shape</dt><dd>Agreed design retained</dd></div></dl><p>${D(a.risks)}</p><button class="outline" data-roof-choice="${a.id}">${e.roofOption===a.id?"Selected":"Select option "+(o?"B":"A")}</button><div class="roof-actions"><button data-roof-model="${a.id}">View in 3D</button><button data-roof-plan="${a.id}">Roof plan</button></div></article>`).join("")}</div><article class="trial-card"><h2>What Option B adds to the current model</h2><p><strong>${r.replacementMemberCount} replacement framing references</strong> cover the surviving original-roof zones shown grey in Option A, approximately <strong>${r.additionalReplacementRoofSurfaceM2.toFixed(1)} m\xB2</strong> of modelled roof surface. Roof areas already removed/altered for the agreed extensions and dormers are common to both options. This additional area is not the total original-roof demolition quantity.</p><p>Additional modelled framing allowance: <strong>${Pn(s.low)}\u2013${Pn(s.high)} ex VAT</strong>; reference ${Pn(s.reference)}. These are uncalculated member reservations at editable study rates. <strong>This is not the full replacement premium.</strong> Demolition, scaffolding, temporary covering, coverings/insulation, strengthening and connection design remain unpriced.</p><p>Use the roof selector to compare the same camera, plan or section. The register, quantities, cost subtotal and CSV export follow the selected option.</p></article>`}function pm(i,e=.002){if(i.category!=="masonry"||!i.units)return[];let t=i.bounds[0],n=0;for(let a=0;a<i.triangles.length;a+=3){let[o,c,l]=i.triangles.slice(a,a+3).map(h=>h.map((u,d)=>u-t[d]));n+=o[0]*(c[1]*l[2]-c[2]*l[1])+o[1]*(c[2]*l[0]-c[0]*l[2])+o[2]*(c[0]*l[1]-c[1]*l[0])}let s=n<0?-1:1,r=[];for(let a=0;a<i.triangles.length;a+=3){let o=i.triangles.slice(a,a+3),[c,l,h]=o,u=l.map((m,p)=>m-c[p]),d=h.map((m,p)=>m-c[p]),f=[u[1]*d[2]-u[2]*d[1],u[2]*d[0]-u[0]*d[2],u[0]*d[1]-u[1]*d[0]],b=Math.hypot(...f),v=s;for(let m=0;m<3;m++)for(let p of[0,1])o.every(S=>Math.abs(S[m]-i.bounds[p][m])<1e-8)&&b&&Math.abs(f[m])/b>1-1e-6&&(v=(p?1:-1)*Math.sign(f[m]));r.push(...o.map(m=>m.map((p,S)=>p-(b?v*f[S]*e/b:0))))}return r}function Sy(i){let e=i.vehicleDeckStudy;if(!e)return"";let t=i.slabCoordination.thicknessMm,n=e.cases.filter(r=>r.thicknessMm===t),s=n.map(r=>`<tr><td>${D(r.case)} \xB7 ${D(r.bay)}</td><td>${r.spanM.toFixed(3)} m</td><td>${r.stripWidthM.toFixed(1)} m</td><td>${r.loadAction==="distributed"?r.vehicleUDLKPa.toFixed(1)+" kPa":r.singleWheelOrJackKN.toFixed(0)+" kN local"}</td><td>${r.ulsMomentKNmPerM.toFixed(1)} kNm/m</td><td>${r.requiredFlexuralAsMm2PerM==null?"Beyond assumed block":r.requiredFlexuralAsMm2PerM.toFixed(0)+" mm\xB2/m"}</td></tr>`).join("");return`<h2>Garage vehicle deck \xB7 strip study</h2><p><strong>${D(e.status)}</strong></p><p>${D(e.supportSpanBasis)}</p><p>Trial materials: ${D(e.materialAssumptions.concrete)}, ${D(e.materialAssumptions.reinforcement)}; assumed ${e.materialAssumptions.coverMm} mm cover and ${e.materialAssumptions.trialBarDiameterMm} mm bars define effective depth only.</p><details><summary>${t} mm slab \xB7 ${n.length} load/distribution cases</summary><div class="table-scroll"><table><thead><tr><th>Case / bay</th><th>Span</th><th>Assumed strip</th><th>Vehicle action</th><th>ULS moment</th><th>Flexural As only</th></tr></thead><tbody>${s}</tbody></table></div></details><p>${D(e.limits)}</p><a href="${D(e.flexureSource)}" target="_blank" rel="noopener">Flexural calculation reference \u2197</a>`}function My(i){if(!i)return"";let e=t=>t.startsWith("M-")?`<button class="text-button" data-focus-member="${D(t)}">${D(t)} \u2197</button>`:D(t.replaceAll("-"," "))+" \xB7 bearing unverified";return`<h2>Load path \xB7 ${D(i.study)}</h2><p>Loads from the floor and ${i.receivedFrom.length?i.receivedFrom.map(e).join(", "):"this member\u2019s self-weight"} pass to:</p><ol>${i.endDestinations.map((t,n)=>`<li>Support ${n+1}: ${e(t)}</li>`).join("")}</ol><p>These are proposed reaction routes. The next member, connection and final foundation still need verification.</p>`}function wy(i){if(!i)return"";let e=i.cases.some(n=>n.hypotheticalStoreyRestraint),t=n=>n?`${(n.axialUtilisation*100).toFixed(0)}% at ${n.effectiveLengthM.toFixed(2)} m`:"\u2014";return`<h2>Column \xB7 axial sensitivity</h2><p>${D(i.basis)}</p><div class="table-scroll"><table><thead><tr><th>Case</th><th>Floor + column ULS</th><th>Full-height axial utilisation</th>${e?"<th>With hypothetical floor restraint</th>":""}</tr></thead><tbody>${i.cases.map(n=>`<tr><td>${D(n.scenario+(n.pattern?" \xB7 "+n.pattern:""))}</td><td>${n.fullLength.axialULSKN.toFixed(1)} kN</td><td>${t(n.fullLength)}</td>${e?`<td>${t(n.hypotheticalStoreyRestraint)}</td>`:""}</tr>`).join("")}</tbody></table></div><p>${D(i.limits)}</p><a href="${D(i.section.source)}" target="_blank" rel="noopener">Section property source \u2197</a>`}function Ty(i){let e=i.bearingSeats??(i.bearingSeat?[i.bearingSeat]:[]);return e.length?`<h2>Modelled bearing seats</h2>${e.map(t=>`<p><strong>${D(t.wallId)}</strong><br>${(t.nominalBearingM*1e3).toFixed(0)} mm nominal bearing; ${(t.contactAreaM2*1e6).toFixed(0)} mm\xB2 geometric contact. Underside at Z${t.bearingZ.toFixed(3)} m.</p><button class="text-button" data-junction-pair="${D([i.id,t.padId,t.groutId].join(","))}">Inspect beam, pad and grout \u2197</button><p>${D(t.basis)}</p>`).join("")}<p>Pad strength, masonry compression, eccentricity and support below are unverified.</p>`:""}function Ey(i){return i?`<h2>Supplier span-table comparison</h2><p>${i.engineeringSpanM.toFixed(3)} m between modelled receivers; table limit ${i.tableSpanM.toFixed(3)} m at ${i.spacingMm} mm centres. <strong>${i.withinTable?"Within table span only":"Exceeds table span"}</strong>.</p><p>${D(i.limits)}</p><a href="${D(i.source)}" target="_blank" rel="noopener">James Jones JJI manual \xB7 ${D(i.table)} \u2197</a>`:""}function Ay(i){if(!i)return"";let e=o=>o.map(c=>`<tr><td>${D(c.scenario)}</td><td>${c.sls.deflectionMm.toFixed(1)} mm</td><td>${(c.uls.reactionsKN??[c.uls.reactionKN,c.uls.reactionKN]).map(l=>l.toFixed(1)).join(" / ")} kN</td><td>${c.withinScreen?"Within limited screen":"Fails screen"}</td></tr>`).join(""),t=i.serviceability,n=t?`<h2>UK design basis \xB7 provisional</h2><p><strong>Building Regulations compliance is not demonstrated.</strong> A result within these limited checks is not construction approval.</p><p>Variable-action limit: span/${t.variableSpanDivisor}. Total-movement target: the smaller of span/${t.totalSpanDivisor} and ${t.totalAbsoluteMm} mm.</p><p>${D(t.basis)}</p>`:"",s=i.patternCases??[],r=Math.max(0,...s.map(o=>o.upliftSensitivity?.holdDownDemandKN??0)),a=s.length?`<details><summary>Adverse live-load patterns</summary><p>${D(i.patternBasis??"Each gallery span is loaded separately, with linked reactions carried into the receiving beams. The isolated north-span case also removes live load from the other loft bays.")}</p><div class="table-scroll"><table><thead><tr><th>Pattern / case</th><th>Deflection</th><th>ULS reactions</th><th>Result</th></tr></thead><tbody>${e(s.map(o=>({...o,scenario:o.variablePattern.replaceAll("gallery-","").replaceAll("-"," ")+" \xB7 "+o.scenario})))}</tbody></table></div>${r?`<p><strong>Connection reversal:</strong> the 0.90 Gk + 1.50 Qk sensitivity gives up to ${r.toFixed(2)} kN uplift at a support. A positive steel connection must carry this; connection capacity is not verified.</p>`:""}</details>`:"";return`${n}<h2>Limited floor-load screen</h2><p>${D(i.basis)}</p><p>${D(i.loadBasis)}</p><div class="table-scroll"><table><thead><tr><th>Case</th><th>Total deflection</th><th>Support reactions \xB7 ULS</th><th>Result</th></tr></thead><tbody>${e(i.cases)}</tbody></table></div>${a}${i.sectionToleranceCases?.length?`<details><summary>Smaller-section sensitivity</summary><p>Assumed 44 \xD7 293.5 mm section, compared with the 45 \xD7 295 mm model. This is a sensitivity, not a supplier tolerance guarantee.</p><div class="table-scroll"><table><thead><tr><th>Case</th><th>Final deflection</th><th>ULS reactions</th><th>Result</th></tr></thead><tbody>${e(i.sectionToleranceCases)}</tbody></table></div></details>`:""}<p>${D(i.limits)}</p>${i.intermediateStudy?`<h2>Intermediate support comparison</h2><p>${D(i.intermediateStudy.basis)}</p><p>Spans ${i.intermediateStudy.spansM.map(o=>o.toFixed(3)+" m").join(" + ")}.</p>${i.intermediateStudy.cases.map(o=>`<p>${D(o.scenario)}: deflections ${o.segments.map(c=>c.sls.deflectionMm.toFixed(1)+" mm").join(" / ")}; combined intermediate ULS reaction ${o.intermediateReactionULSKN.toFixed(1)} kN.</p>`).join("")}`:""}`}function Ry(i){if(!i.wallBearingSpanStudy)return"";let e=i.existingWallBearings??[];return`<h2>Existing-wall bearing study</h2><p>${e.length?"Retained solid walls are proposed as the intermediate supports.":"No retained intermediate wall crosses this joist; a local transfer or verified longer-span member is still needed."}</p>${e.map(t=>`<p><button class="text-button" data-focus-member="${D(t.wallId)}">${D(t.wallId)}</button> \xB7 ${D(t.wallName)}<br>${(t.bearingRunM*1e3).toFixed(0)} mm geometric crossing; wall head ${t.wallHeadDeltaMm>=0?"above":"below"} joist underside by ${Math.abs(t.wallHeadDeltaMm).toFixed(0)} mm. Seat/hanger detail and capacity unverified.</p>`).join("")}<p>Modelled clear runs: ${i.wallBearingSpanStudy.clearRunsM.map(t=>t.toFixed(2)+" m").join(" + ")}. These are geometry measurements, not approved spans.</p>`}function Cy(i){let e=i.masonryBearingAudit;if(!e)return"";let t=e.baseAreaM2?100*e.contactAreaM2/e.baseAreaM2:0,n=e.contacts.map(s=>s.memberId);return`<h2>Wall base contact</h2><p>${t.toFixed(1)}% of the sampled base meets masonry, concrete or a transfer/lintel envelope. ${e.unmatchedAreaM2.toFixed(3)} m\xB2 has no matching support in this check. Contact is geometric; capacity and the load path below remain unverified.</p>${n.map(s=>`<button class="text-button" data-focus-member="${D(s)}">${D(s)}</button>`).join("")}${n.length?`<button class="text-button" data-junction-pair="${D([i.id,...n].join(","))}">Inspect wall and bearing together</button>`:""}${e.timberBelow.length?`<p><strong>Timber beneath this wall is not an approved wall support.</strong> ${e.timberBelow.length} floor members lie below its footprint; resolve the transfer independently.</p>`:""}`}async function mm({root:i=document,baseURL:e=new URL("./",location.href),embed:t=null}={}){let n=C=>i.querySelector("#"+C),s=C=>new URL(C,e),r=t?i.host.classList:document.body.classList;n("layers-toggle").onclick=()=>{let C=r.toggle("layers-open");n("layers-toggle").setAttribute("aria-expanded",String(C))};let a={garageDeck:null,view:"model",level:"all",region:"house",retained:!0,categories:[...sc.all],representation:"members",scope:"all",garageRebuild:!0,loftUpgrade:!0,roofOption:new URLSearchParams(location.search).get("roof")==="retain"?"retain":"replace",systemFilters:ys.filter(C=>C!=="layers"),focusSystem:null,isolated:null,isolatedIds:null,mode:"solid",selected:null,trialOverlay:!1,sectionAt:9.455},[o,c,l]=await Promise.all(["model.json","trials.json","members.json"].map(async C=>{let y=await fetch(s(C));if(!y.ok)throw Error("Structural data failed to load: "+C);return y.json()}));Ju(l),a.garageDeck=Zt(l,new URLSearchParams(location.search).get("garageDeck")),o.garageDeckDefault=Zt(l),l.garageBeamBlock&&(l.garageBeamBlock.enquiryUrl=new URL("garage-deck-enquiry.pdf",e).href),o.elements.push(...c.visualStudies);let h="reference";a.garageRebuild=l.garageOption.default!==!1;let u=n("selection").innerHTML;for(let C of o.elements)C.roofContext=l.retainedRoofIds.includes(C.id),l.retainedIds.includes(C.id)&&(C.retained=!0,C.scope="retained"),l.garageContextIds.includes(C.id)&&(C.retained=!0,C.scope="retained",C.garageContext=!0);o.elements.push(...l.elements);let d=structuredClone(l.rates);try{let C=JSON.parse(localStorage.getItem("ashley-member-rates-"+l.revision));if(C)for(let y of Object.keys(d))for(let g of["low","reference","high"])Number.isFinite(C[y]?.[g])&&C[y][g]>=0&&(d[y][g]=C[y][g])}catch{}let f=()=>{try{localStorage.setItem("ashley-member-rates-"+l.revision,JSON.stringify(d))}catch{}},b=t?new on:new Gr;b.name="Structural member layer",t?t.scene.add(b):b.background=new Ie("#0c2138");let v=t?.renderer??new Fl({canvas:n("model"),antialias:!0});t||v.setPixelRatio(Math.min(devicePixelRatio,2)),v.localClippingEnabled=!0;let m=t?.canvas??n("model"),p=t?.camera??new Nt(42,1,.05,350),S=t?{target:new O,update(){t.focus(p.position.clone(),this.target.clone())}}:new Bl(p,v.domElement);S.enableDamping=!0,S.dampingFactor=.12,S.maxDistance=150,S.minDistance=.15;let A=new jt(new O(0,-1,0),9),_=new jt(new O(0,-1,0),9),M=new Map,E=new Map,R=C=>({beam:"#87b6d1",block:"#c7bfa6",topping:"#a9b9af",edge:"#a0acb6",grout:"#8e907f"})[C.deckRole]??Dn[C.category].color,x=C=>C.member||C.trial?A:_;t||b.add(new sa(14479359,4481145,3));let T=new os(16777215,2);T.position.set(-10,25,20),t||b.add(T);let I=C=>new O(C[0],C[2],-C[1]),L=new ha(80,80,2639457,1585740);L.position.y=-3.12,t||b.add(L);for(let C of o.elements){let y=C.retained?"#718a9f":C.leaf==="block"?"#b9b9ac":R(C),g=x(C);if(C.triangles?.length){let P=dm(C),F=pm(C),H=[...P,...F],Q=new Mt().setAttribute("position",new wt(H.flatMap(ce=>[ce[0],ce[2],-ce[1]]),3));Q.computeVertexNormals();let re=new Ie(C.category==="masonry"?y:"#ffffff"),J=new Ie("#b4b0a2");Q.setAttribute("color",new wt(H.flatMap((ce,xe)=>(xe<P.length?re:J).toArray()),3));let W=C.member?new Qr({color:C.category==="masonry"?"#ffffff":y,vertexColors:!0,transparent:!1,side:Kt,clippingPlanes:[g]}):new hn({color:y,transparent:!0,opacity:.06,side:Kt,depthWrite:!1,clippingPlanes:[g]}),ae=new Ct(Q,W);ae.userData.element=C,b.add(ae),M.set(C.id,ae);let ye=(C.edges??[]).flatMap(ce=>ce.flatMap(xe=>[xe[0],xe[2],-xe[1]])),le=new Zn(new Mt().setAttribute("position",new wt(ye,3)),new zn({color:y,transparent:!0,opacity:C.retained?.35:.85,clippingPlanes:[g]}));le.userData.element=C,b.add(le),E.set(C.id,le)}else if(C.line){let P=new gi(new Mt().setFromPoints(C.line.map(I)),new ea({color:y,dashSize:.16,gapSize:.09,clippingPlanes:[g]}));P.computeLineDistances(),P.userData.element=C,b.add(P),E.set(C.id,P)}}let z=[],G=new Map;for(let C of o.elements){if(!M.has(C.id))continue;let y=JSON.stringify([C.category,C.deckRole,C.garageDeckOption,C.region,C.level,C.scope,C.retained,C.condition,C.garageContext,C.roofContext,C.leaf,C.trial]);G.has(y)||G.set(y,[]),G.get(y).push(C)}for(let C of G.values())for(let y of["mesh","line"]){let g=y==="mesh"?M:E,P=C.map(W=>g.get(W.id)).filter(Boolean);if(!P.length)continue;let F=Oh(P.map(W=>W.geometry),!1),H=P[0].material.clone();H.clippingPlanes=P[0].material.clippingPlanes;let Q=y==="mesh"?new Ct(F,H):new Zn(F,H),re=0,J=P.map(W=>({end:re+=W.geometry.attributes.position.count/(y==="mesh"?3:1),id:W.userData.element.id}));Q.userData={batch:!0,ranges:J,kind:y},b.add(Q),z.push({object:Q,es:C,kind:y})}b.updateMatrixWorld(!0),b.traverse(C=>{C.matrixAutoUpdate=!1,C.matrixWorldAutoUpdate=!1});let N=null,V=null;async function Y(C){if(t){t.context(C,Number(n("context-opacity").value)/100,_);return}if(C&&!N){n("loading").textContent="Loading architectural overlay\u2026",n("loading").hidden=!1;try{V??=(async()=>{let y=new zl;y.setMeshoptDecoder(pp);let g=await Jp(y,s("../../proposal-compact.dec570af7ac5539a.glb.gz").href),P=new hn({color:"#dce8f0",transparent:!0,opacity:Number(n("context-opacity").value)/100,side:Kt,depthWrite:!1,clippingPlanes:[_]}),F=new Set(o.elements.filter(ae=>!ae.member&&!ae.trial).flatMap(ae=>[ae.name,ae.sourceObject]).filter(Boolean)),H=[];if(g.scene.updateMatrixWorld(!0),g.scene.traverse(ae=>{if(!ae.isMesh)return;let ye=ae;for(;ye&&!ye.userData.source_name;)ye=ye.parent;let le=ye?.userData.source_name??ae.name;if(!(F.has(le)||/window|glaz|door|stair|tread|ceiling|plaster/i.test(le)&&!/cabinet|cupboard|wardrobe|shower|car |van |tesla|fiat|plant|tree|hedge|picture|artwork/i.test(le)))return;let xe=ae.geometry.clone().applyMatrix4(ae.matrixWorld);xe.index&&(xe=xe.toNonIndexed());for(let Fe of Object.keys(xe.attributes))Fe!=="position"&&xe.deleteAttribute(Fe);xe.clearGroups(),H.push(xe)}),!H.length)throw Error("Architectural overlay has no matched shell geometry");let Q=Oh(H,!1),re=new on;re.name="Architectural overlay",re.userData.overlayObjectCount=H.length;let J=new Ct(Q,P);J.name="Architectural surfaces",re.add(J);let W=new Zn(new Jr(Q,35),new zn({color:"#dce8f0",transparent:!0,opacity:.55,depthWrite:!1,clippingPlanes:[_]}));W.name="Architectural outlines",re.add(W);for(let ae of H)ae.dispose();return re})(),N=await V,b.add(N)}catch(y){V=null,n("context").checked=!1,n("loading").textContent="Overlay unavailable. The structural register is still usable.",console.error(y);return}n("loading").hidden=!0}N&&(N.visible=n("context").checked,X())}function X(){let C=Number(n("context-opacity").value)/100;t&&t.context(n("context").checked,C,_),n("context-opacity-value").textContent=Math.round(C*100)+"%",N?.traverse(y=>{y.material&&(y.material.opacity=y.isLineSegments?Math.min(.85,C+.27):C)})}function ie(){let C=Rr(o,{...a,level:a.view==="model"?a.level:"all"});return a.isolated?C.filter(y=>y.id===a.isolated||y.parentId===a.isolated):C}function j(){let C=ie();if(!C.length)return;let y=new tn;for(let W of C)y.expandByPoint(I(W.bounds[0])),y.expandByPoint(I(W.bounds[1]));let g=y.getCenter(new O),P=new O(1,.8,1.2).normalize(),F=new O(P.z,0,-P.x).normalize(),H=new O().crossVectors(P,F),Q=Math.tan(us.degToRad(p.fov/2)),re=Q*p.aspect,J=3;for(let W of[y.min.x,y.max.x])for(let ae of[y.min.y,y.max.y])for(let ye of[y.min.z,y.max.z]){let le=new O(W,ae,ye).sub(g);J=Math.max(J,Math.abs(le.dot(F))/re+le.dot(P),Math.abs(le.dot(H))/Q+le.dot(P))}S.target.copy(g),p.position.copy(g).add(P.multiplyScalar(J*1.12)),p.near=.05,p.far=350,p.updateProjectionMatrix(),S.update()}function K(){Qe();for(let g of i.querySelectorAll("#systems .check")){let P=g.querySelector("input").value;g.querySelector(".system-count").textContent=Rr(o,{...a,categories:[P],systemFilters:null,retained:!1}).length}let C=new Set(ie().map(g=>g.id));for(let g of o.elements){let P=M.get(g.id),F=E.get(g.id),H=g.id===a.selected,Q=H?"#fff1bc":g.retained?"#718a9f":g.leaf==="block"?"#b9b9ac":R(g);P&&(P.material.polygonOffset=H,P.material.polygonOffsetFactor=-1,P.material.polygonOffsetUnits=-1,P.visible=C.has(g.id),P.material.color.set(g.category==="masonry"&&!H?"#ffffff":Q),P.material.opacity=g.retained?g.category==="walls"&&a.mode==="solid"?.3:.055:g.member?a.mode==="solid"?1:.14:H?.4:a.mode==="solid"?.6:.055,P.material.transparent=g.retained||a.mode!=="solid"||!g.member,P.material.depthWrite=!g.retained&&a.mode==="solid"),F&&(F.visible=C.has(g.id),F.material.color.set(Q),F.material.opacity=H?1:g.retained?.2:a.mode==="solid"?.28:.9)}for(let{object:g,es:P,kind:F}of z){let H=P.every(J=>C.has(J.id))&&!(P.length===1&&P[0].id===a.selected);if(g.visible=H,!H)continue;let Q=P[0],re=(F==="mesh"?M:E).get(Q.id);g.material.copy(re.material),g.material.polygonOffset=!1,g.material.clippingPlanes=re.material.clippingPlanes,g.material.color.set(F==="mesh"&&Q.category==="masonry"?"#ffffff":Q.retained?"#718a9f":Q.leaf==="block"?"#b9b9ac":R(Q)),g.material.opacity=F==="mesh"?Q.retained?Q.category==="walls"&&a.mode==="solid"?.3:.055:Q.member?a.mode==="solid"?1:.14:a.mode==="solid"?.6:.055:Q.retained?.2:a.mode==="solid"?.28:.9;for(let J of P){let W=(F==="mesh"?M:E).get(J.id);W&&(W.visible=J.id===a.selected,W.renderOrder=2)}}for(let g of[...M.values(),...E.values()])g.visible&&!g.parent?b.add(g):!g.visible&&g.parent===b&&b.remove(g);n("model").hidden=a.view!=="model",n("drawing").hidden=["model","schedule","trials","costs","issues","roof-options","junctions","foundations"].includes(a.view),n("register").hidden=a.view!=="schedule",n("trials").hidden=a.view!=="trials",n("costs").hidden=a.view!=="costs",n("member-issues").hidden=a.view!=="issues",n("roof-options").hidden=a.view!=="roof-options",n("junctions").hidden=a.view!=="junctions",n("foundations").hidden=a.view!=="foundations";let y=["front","rear","west","east"].includes(a.view);if(n("elevation").hidden=!y,n("section-control").hidden=a.view!=="section",n("view-title").textContent={junctions:"Junctions, cuts and construction layers",model:"Structure in context",plan:"Floor plan",front:"Front / south elevation",rear:"Rear / north elevation",west:"West elevation",east:"East elevation",section:"Section through the building",schedule:"Coordinated element register",trials:"UK assumptions and trial calculations",costs:"Quantities and shell cost allowances",issues:"Fit and unresolved coordination",foundations:"Foundation assumptions and sensitivity","roof-options":"Retain or rebuild the existing roof"}[a.view],n("level").disabled=["costs","issues","section","roof-options","junctions","foundations"].includes(a.view),n("view-meta").textContent=(["costs","issues","section","roof-options","junctions","foundations"].includes(a.view)||a.level==="all"?"All levels":o.floorLevels.find(g=>g.id===Number(a.level))?.label)+" \xB7 "+(a.region==="house"?"Main house":a.region==="workshop"?"Garden workshop":"Both buildings")+" \xB7 Roof "+(a.roofOption==="replace"?"B \u2014 rebuild":"A \u2014 retain"),a.view==="plan"&&a.focusSystem==="roof"&&(n("view-title").textContent="Roof framing plan",n("level").disabled=!0,n("view-meta").textContent="All roof levels \xB7 "+(a.region==="house"?"Main house":a.region==="workshop"?"Garden workshop":"Both buildings")+" \xB7 Roof "+(a.roofOption==="replace"?"B \u2014 rebuild":"A \u2014 retain")),n("view-hint").textContent=a.view==="model"?t?"Walk / fly \xB7 Click a member to inspect \xB7 Esc releases the mouse":"Drag to orbit \xB7 Scroll to zoom \xB7 Click an element":["schedule","trials","costs","issues","roof-options","junctions","foundations"].includes(a.view)?"":"Click a line to inspect \xB7 Dashed lines are support studies",["model","schedule","trials","costs","issues","roof-options","junctions","foundations"].includes(a.view))n("visible-count").textContent=C.size+(a.representation==="members"?" members / assemblies & retained context":" architectural envelopes & studies");else{let g=Oa(o,{...a,level:a.view==="plan"?a.level==="all"?0:Number(a.level):a.level});n("drawing").innerHTML=g.svg,n("visible-count").textContent=g.count+" element references in this view"}a.view==="foundations"&&(n("foundations").innerHTML=Qu(ka(l,a.garageDeck)),n("visible-count").textContent="Reference geometry \xB7 illustrative assumptions \xB7 not a construction design"),a.view==="junctions"&&(n("junctions").innerHTML=sm(l,a),n("visible-count").textContent="Measured geometry \xB7 model dimensions only"),a.view==="schedule"&&de(),a.view==="trials"&&(Ue(),n("visible-count").textContent="4 floor bays \xB7 timber bearing-wall study \xB7 3 scenarios"),a.view==="roof-options"&&(n("roof-options").innerHTML=fm(l,a,d),n("visible-count").textContent="Two options \xB7 shared exterior design \xB7 experimental framing"),a.view==="costs"&&ge(),a.view==="issues"&&(n("member-issues").innerHTML=hm(l),n("visible-count").textContent=l.issues.length+" open coordination items");for(let g of["cut","architecture-cut","context","context-opacity"])n(g).disabled=a.view!=="model";for(let g of i.querySelectorAll(".tabs button"))g.setAttribute("aria-pressed",String(g.dataset.view===a.view||g.dataset.view==="front"&&y));t&&(i.host.classList.toggle("document-view",a.view!=="model"),t.onView(a.view)),at()}function te(C){a.selected=C;let y=o.elements.find(Q=>Q.id===C);if(!y)return;if(y.garageDeckOption&&y.garageDeckOption!==a.garageDeck&&(a.garageDeck=y.garageDeckOption,we()),y.member){n("selection").innerHTML=um(y,l,d,a),n("focus-element").onclick=()=>_e(y),n("isolate-element").onclick=()=>{a.isolated=y.id,a.retained=!1,_e(y)};let Q=new URL(location.href);Q.searchParams.set("element",C),Q.searchParams.set("garageDeck",a.garageDeck),history.replaceState(null,"",Q),K();return}let g=y.measurements,P=[];g.envelopeM&&P.push(["Model envelope",g.envelopeM.map(Q=>Q.toFixed(3)).join(" \xD7 ")+" m"]),g.projectedAreaM2&&P.push(["Projected model area",g.projectedAreaM2.toFixed(2)+" m\xB2"]),g.headEnvelopeLengthM&&P.push(["Head envelope length",g.headEnvelopeLengthM.toFixed(3)+" m"]),g.axisLengthM&&P.push(["Study axis length",g.axisLengthM.toFixed(3)+" m"]);let F=[...c.floors,...c.beams,...c.timberHeaders].filter(Q=>Q.elementIds?.includes(y.id)||y.id==="TR-"+Q.id||y.id.startsWith("TR-"+Q.id+"-"));P.push(["Structural size","No approved design"],["Design loading","Assumptions only"],["Trial calculations",F.length?"UK-T01: "+F.map(Q=>Q.id).join(", "):"Not assessed in UK-T01"],["Construction approval","Not approved"]),n("selection").innerHTML=`<p class="eyebrow">ELEMENT INSPECTOR</p><span class="ref">${D(y.id)}</span><h2>${D(y.name.replace(/^Proposal \| /,""))}</h2><span class="badge">${D(y.status)}</span><p>${D(y.basis)}</p><dl class="facts">${P.map(([Q,re])=>`<div><dt>${D(Q)}</dt><dd>${D(re)}</dd></div>`).join("")}</dl><h2>Required design checks</h2><ul class="check-list">${y.checks.map(Q=>`<li>${D(Q)}</li>`).join("")}</ul><button id="focus-element" class="outline">Focus in 3D</button>${F.length?'<button id="show-trials" class="outline" style="margin-top:8px">View UK trial calculations</button>':""}`,F.length&&(n("show-trials").onclick=()=>{a.view="trials",K()}),n("focus-element").onclick=()=>{a.systemFilters=null,a.representation=y.retained?"members":"envelopes",a.isolated=null,a.isolatedIds=null,a.categories=Object.keys(Dn),Oe(),a.view="model",y.trial&&(a.trialOverlay=!0,n("trial-overlay").checked=!0),a.categories.includes(y.category)||a.categories.push(y.category),a.region=y.region,a.level="all",a.retained=!0,we(),K(),S.target.copy(I(Ua(y)));let Q=Math.max(...y.bounds[1].map((re,J)=>re-y.bounds[0][J]),2);p.position.copy(S.target).add(new O(Q*.9,Q*.7,Q*.9))};let H=new URL(location.href);H.searchParams.set("element",C),H.searchParams.set("garageDeck",a.garageDeck),history.replaceState(null,"",H),K()}function _e(C){a.systemFilters=null,a.isolatedIds=null;let y=C.structuralSystem==="garden-terrace"||["rafters","fascia","roof"].includes(C.category)||/^M-(RE\d|RIDGE-|ROOF-B)/.test(C.id);(a.focusSystem==="floors"&&y||a.focusSystem==="roof"&&!y||!C.member)&&(a.focusSystem=null),C.condition==="roof-rebuild"&&(a.roofOption="replace"),C.roofContext&&(a.roofOption="retain"),a.view="model",a.representation=C.member||C.retained?"members":"envelopes",a.region=C.region,a.level=C.member?String(C.level):"all",C.scope==="garage-rebuild"&&(a.garageRebuild=!0),C.condition==="loft-upgrade"&&(a.loftUpgrade=!0),C.retained&&(a.retained=!0),a.scope="all",a.categories.includes(C.category)||a.categories.push(C.category),Oe(),we(),K(),A.constant=9,n("cut").value="9",n("cut-value").textContent="9.00 m",S.target.copy(I(Ua(C)));let g=Math.max(...C.bounds[1].map((F,H)=>F-C.bounds[0][H]),.6),P=Math.max(g*1.8,1.3);p.position.copy(S.target).add(new O(.9,.55,1).normalize().multiplyScalar(P)),S.update()}function me(C){a.systemFilters=null;let y=C.map(W=>o.elements.find(ae=>ae.id===W)).filter(Boolean);if(y.length<2)return;let g=new Set(y.map(W=>W.parentId??W.id)),P=o.elements.filter(W=>["connections","details"].includes(W.category)&&g.has(W.parentId));a.focusSystem=null,a.isolated=null,a.isolatedIds=[...new Set([...C,...P.map(W=>W.id)])],a.retained=y.some(W=>W.retained),a.region="all",a.level="all",a.scope="all",a.representation="members",a.categories=[...new Set([...y,...P].map(W=>W.category))],a.view="model",y.some(W=>W.condition==="roof-rebuild")&&(a.roofOption="replace"),y.some(W=>W.condition==="loft-upgrade")&&(a.loftUpgrade=!0),y.some(W=>W.scope==="garage-rebuild")&&(a.garageRebuild=!0),Oe(),we(),te(y[0].id),A.constant=9,n("cut").value="9",n("cut-value").textContent="9.00 m";let F=[0,1,2].map(W=>Math.max(...y.map(ae=>ae.bounds[0][W]))),H=[0,1,2].map(W=>Math.min(...y.map(ae=>ae.bounds[1][W])));S.target.copy(I(F.map((W,ae)=>(W+H[ae])/2)));let Q=Math.max(1.1,Math.min(4,Math.max(...H.map((W,ae)=>Math.abs(W-F[ae])))*2.5)),re=I(Ua(y[0])).sub(S.target);re.y=0,re.lengthSq()<1e-4&&re.set(.9,0,1),re.normalize();let J=new O(-re.z,0,re.x).multiplyScalar(.45);re.add(J),re.y=.75,p.position.copy(S.target).add(re.normalize().multiplyScalar(Q)),S.update()}function Ge(C){a.systemFilters=null,a.focusSystem=["roof","floors"].includes(C)?C:null,a.isolated=null,a.isolatedIds=null,a.selected=null,n("selection").innerHTML=u,a.retained=!1,a.representation="members",a.categories=[...sc[C]??Ci],a.view="model",Oe(),we(),K(),j()}function Ae(C){if(!["retain","replace"].includes(C))return;a.roofOption=C,a.isolated=null,a.isolatedIds=null;let y=o.elements.find(P=>P.id===a.selected);(y?.condition==="roof-rebuild"&&C==="retain"||y?.roofContext&&C==="replace")&&(a.selected=null,n("selection").innerHTML=u),we(),K();let g=new URL(location.href);g.searchParams.set("roof",C),history.replaceState(null,"",g)}n("roof-option").onchange=()=>Ae(n("roof-option").value);function Be(C){if(!["solid-rc","beam-block"].includes(C)||!l.garageBeamBlock)return;a.garageDeck=C,a.isolated=null,a.isolatedIds=null,a.selected=null,n("selection").innerHTML=u;let y=new URL(location.href);y.searchParams.set("garageDeck",C),y.searchParams.delete("element"),history.replaceState(null,"",y),we(),K()}function ee(C="framing"){let y=l.garageBeamBlock;if(!y)return;Be(C!=="solid-rc"?"beam-block":"solid-rc");let g=a.garageDeck==="beam-block"?y.elements.filter(P=>C==="complete"||!["topping","grout"].includes(P.deckRole)).map(P=>P.id):y.replacesIds;a.view="model",a.level="all",a.region="house",a.scope="all",a.representation="members",a.retained=!1,a.systemFilters=null,a.focusSystem=null,a.categories=[...Ci],a.isolatedIds=[...g,...y.retainedSupportIds],a.selected=null,Oe(),we(),A.constant=.05,n("cut").value=".05",n("cut-value").textContent="0.05 m",K(),S.target.copy(I([9.455,-12.9,-.5])),p.position.copy(I([18.5,-22,8])),S.update(),te(a.garageDeck==="beam-block"?C==="complete"?"M-BB01-TOPPING":"M-BB01-BEAM-W-08":"M-G01-GARAGE-SLAB")}n("garage-deck").onchange=()=>Be(n("garage-deck").value),n("inspect-garage-deck").onclick=()=>ee(a.garageDeck==="beam-block"?"framing":"solid-rc");for(let C of[n("selection"),n("costs")])C.addEventListener("click",y=>{let g=y.target.closest("[data-garage-deck-view]");if(g){ee(g.dataset.garageDeckView);return}let P=y.target.closest("[data-garage-deck-option]");P&&ee(P.dataset.garageDeckOption)});n("roof-options").onclick=C=>{let y=C.target.closest("[data-roof-choice],[data-roof-model],[data-roof-plan]");if(!y)return;let g=y.dataset.roofChoice??y.dataset.roofModel??y.dataset.roofPlan;Ae(g),(y.dataset.roofModel||y.dataset.roofPlan)&&(Ge("roof"),a.retained=!0,a.level=y.dataset.roofPlan?"3":"all",a.view=y.dataset.roofPlan?"plan":"model",we(),K(),j())};function ne(C,y,g){let P=URL.createObjectURL(new Blob([C],{type:g})),F=document.createElement("a");F.href=P,F.download=y,F.click(),setTimeout(()=>URL.revokeObjectURL(P),1e3)}function ge(){n("costs").innerHTML=lm(l,a,d),n("costs").querySelectorAll("[data-rate]").forEach(C=>C.onchange=()=>{let y=Number(C.value);Number.isFinite(y)&&y>=0&&(d[C.dataset.rate][C.dataset.bound]=y,f(),ge())}),n("reset-rates").onclick=()=>{d=structuredClone(l.rates),f(),ge()},n("export-cost").onclick=()=>ne(cm(l,a,d),`Ashley-Heights-M15-roof-${a.roofOption}-partial-member-costs-ex-VAT.csv`,"text/csv;charset=utf-8"),n("visible-count").textContent="Partial subtotal \xB7 net geometry \xB7 unpriced work excluded"}function Ue(){n("trials").innerHTML=Qp(o,c,h),n("trial-scenario").onchange=C=>{h=C.target.value,Ue()}}n("trials").onclick=C=>{let y=C.target.closest("[data-trial-element]");y&&(te(y.dataset.trialElement),n("focus-element").click())};function de(){let C=n("search").value.trim().toLowerCase(),y=Rr(o,a).filter(g=>(g.id+" "+g.name+" "+(g.section??"")+" "+(g.scope??"")).toLowerCase().includes(C));n("register-list").innerHTML=y.map(g=>`<button class="register-row ${g.id===a.selected?"selected":""}" data-element="${D(g.id)}"><strong>${D(g.id)}</strong><span>${D(g.name.replace(/^Proposal \| /,""))}</span><small>${D(Dn[g.category].label+" \xB7 "+g.status)}</small></button>`).join(""),n("visible-count").textContent=y.length+" references \xB7 trial geometry, not an order list"}function we(){n("garage-deck").value=a.garageDeck;for(let C of["region","level","representation","scope"])n(C).value=a[C];n("retained").checked=a.retained,n("roof-option").value=a.roofOption,n("garage-rebuild").checked=a.garageRebuild,n("loft-upgrade").checked=a.loftUpgrade;for(let C of i.querySelectorAll("#systems input"))C.checked=a.categories.includes(C.value)}function at(){if(t||a.view!=="model")return;let C=n("viewport").getBoundingClientRect();v.setSize(C.width,C.height,!1),p.aspect=C.width/Math.max(1,C.height),p.updateProjectionMatrix()}t||new ResizeObserver(at).observe(n("viewport"));function Oe(){let C=a.representation==="members"?Ci:Object.keys(Dn).filter(y=>!Ci.includes(y));n("systems").innerHTML=C.map(y=>{let g=Dn[y];return`<label class="check"><input type="checkbox" value="${y}" ${a.categories.includes(y)?"checked":""}><i class="swatch" style="background:${g.color}"></i>${D(g.label)}<span class="system-count">${o.elements.filter(P=>P.category===y).length}</span></label>`}).join("")}Oe();function Qe(){for(let C of i.querySelectorAll("#isolation [data-isolate]")){let y=C.dataset.isolate,g=a.systemFilters??[];C.setAttribute("aria-pressed",String(y==="all"?ys.every(P=>g.includes(P)):g.includes(y)))}}function ot(C){a.systemFilters=Xu(a.systemFilters??[],C),a.categories=Ku(a.systemFilters),a.representation="members",a.focusSystem=a.systemFilters.length===1&&a.systemFilters[0]==="roof"?"roof":null,a.isolated=null,a.isolatedIds=null,Oe(),we(),K()}n("isolation").onclick=C=>{let y=C.target.closest("[data-isolate]");y&&ot(y.dataset.isolate)},n("representation").onchange=()=>{a.systemFilters=null,a.focusSystem=null,a.representation=n("representation").value,a.isolated=null,a.isolatedIds=null,a.categories=a.representation==="members"?[...sc.all]:Object.keys(Dn).filter(C=>!Ci.includes(C)),Oe(),K(),t||j()},n("scope").onchange=()=>{a.scope=n("scope").value,a.isolated=null,a.isolatedIds=null,a.scope==="garage-rebuild"&&(a.garageRebuild=!0),we(),K(),t||j()},n("loft-upgrade").onchange=()=>{a.loftUpgrade=n("loft-upgrade").checked,a.isolated=null,a.isolatedIds=null,K()},n("garage-rebuild").onchange=()=>{a.garageRebuild=n("garage-rebuild").checked,a.isolated=null,a.isolatedIds=null,K()};for(let C of[n("selection"),n("member-issues"),n("junctions"),n("foundations"),n("costs")])C.addEventListener("click",y=>{if(y.target.closest("[data-foundation-study]")){a.view="foundations",K();return}let g=y.target.closest("[data-junction-pair]");if(g){me(g.dataset.junctionPair.split(","));return}if(y.target.closest("#export-cuts")){ne(am(l,a),"Ashley-Heights-M15-model-dimensions-NOT-FOR-FABRICATION.csv","text/csv;charset=utf-8");return}let P=y.target.closest("[data-focus-member]");P&&(a.isolated=null,a.isolatedIds=null,te(P.dataset.focusMember),_e(o.elements.find(F=>F.id===P.dataset.focusMember)))});n("systems").onchange=()=>{a.systemFilters=null,a.focusSystem=null,a.isolated=null,a.isolatedIds=null,a.categories=[...i.querySelectorAll("#systems input:checked")].map(C=>C.value),K()};for(let C of["region","level"])n(C).onchange=()=>{a[C]=n(C).value,a.view==="plan"&&a.level==="all"&&(a.level="0"),we(),K(),t||j()};n("trial-overlay").onchange=()=>{a.trialOverlay=n("trial-overlay").checked,K()},n("retained").onchange=()=>{a.retained=n("retained").checked,K()};for(let C of i.querySelectorAll(".tabs button"))C.onclick=()=>{a.view=C.dataset.view,a.view==="plan"&&a.level==="all"&&(a.level="0"),we(),K()};for(let C of i.querySelectorAll("#appearance button"))C.onclick=()=>{a.mode=C.dataset.mode;for(let y of i.querySelectorAll("#appearance button"))y.setAttribute("aria-pressed",String(y===C));K()};n("cut").oninput=()=>{A.constant=Number(n("cut").value),n("cut-value").textContent=A.constant.toFixed(2)+" m"},n("architecture-cut").oninput=()=>{_.constant=Number(n("architecture-cut").value),n("architecture-cut-value").textContent=_.constant.toFixed(2)+" m"},n("context-opacity").oninput=X,n("context").onchange=()=>Y(n("context").checked),n("fit").onclick=j,n("elevation").onchange=()=>{a.view=n("elevation").value,K()},n("section-at").oninput=()=>{let C=Number(n("section-at").value);Number.isFinite(C)&&(a.sectionAt=C,K())},n("search").oninput=de;for(let C of[n("drawing"),n("register-list")])C.onclick=y=>{let g=y.target.closest("[data-element]");g&&te(g.dataset.element)},C.onkeydown=y=>{if(["Enter"," "].includes(y.key)){let g=y.target.closest("[data-element]");g&&(y.preventDefault(),te(g.dataset.element))}};let $e=null,ut=new ca;ut.params.Line.threshold=.08,m.addEventListener("pointerdown",C=>{t&&!t.active()||($e=[C.clientX,C.clientY])}),m.addEventListener("pointerup",C=>{if(t&&(!t.active()||a.view!=="model")||!$e||Math.hypot(C.clientX-$e[0],C.clientY-$e[1])>5)return;let y=m.getBoundingClientRect(),g=document.pointerLockElement===m?new Ne:new Ne((C.clientX-y.left)/y.width*2-1,-(C.clientY-y.top)/y.height*2+1);if(t?.canPick&&!t.canPick(g))return;p.updateMatrixWorld(),b.updateMatrixWorld(!0),ut.setFromCamera(g,p);let P=ut.intersectObjects([...z.map(F=>F.object),...M.values(),...E.values()].filter(F=>F.visible),!1).filter(F=>F.point.y<=(F.object.material.clippingPlanes?.[0]?.constant??9)+.001);if(P.length){let F=P[0],H=F.object.userData,Q=H.batch?H.ranges.find(re=>(H.kind==="mesh"?F.faceIndex:F.index)<re.end)?.id:H.element.id;Q&&te(Q)}}),n("download-svg").onclick=()=>{if(a.view==="trials"){let H=URL.createObjectURL(new Blob([tc(o,c)],{type:"image/svg+xml"})),Q=document.createElement("a");Q.href=H,Q.download="Ashley-Heights-span-direction-study.svg",Q.click(),setTimeout(()=>URL.revokeObjectURL(H),1e3);return}let C=["model","schedule","costs","issues","roof-options","junctions","foundations"].includes(a.view)?"plan":a.view,{svg:y}=Oa(o,{...a,view:C,level:a.level==="all"?0:Number(a.level),light:!0}),g=new Blob([y],{type:"image/svg+xml"}),P=URL.createObjectURL(g),F=document.createElement("a");F.href=P,F.download=`Ashley-Heights-${C}-${a.representation==="members"?"M15-roof-"+a.roofOption:"P01"}-NOT-FOR-CONSTRUCTION.svg`,F.click(),setTimeout(()=>URL.revokeObjectURL(P),1e3)},n("issues").innerHTML=[...o.coordinationItems,...l.issues].map(C=>`<p><strong>${D(C.id+" \xB7 "+C.title)}</strong><br>${D(C.detail)}</p>`).join(""),n("coverage").innerHTML=["M01 adds detailed trial members and wall assemblies. Existing hidden framing is not surveyed. "+l.elements.length+" member/assembly references. Priced quantities cover a subset only.",...l.excludedCosts].map(C=>`<p>${D(C)}</p>`).join(""),n("sources").innerHTML=[...o.sources,...l.sources].map(C=>`<a href="${D(C.url)}" target="_blank" rel="noopener">${D(C.title)} \u2197</a>`).join(""),n("loading").hidden=!0;let Tt=new URLSearchParams(location.search).get("view");["trials","issues","costs","roof-options","junctions","foundations"].includes(Tt)&&(a.view=Tt),we(),K(),t||j();let Ht=new URLSearchParams(location.search).get("element");o.elements.some(C=>C.id===Ht)&&te(Ht);let gt=new URLSearchParams(location.search).get("deckView");!t&&["framing","complete","solid-rc"].includes(gt)&&ee(gt);let St=await fetch(s("pack.json"));if(St.ok&&!(await St.json()).available){let y=i.querySelector('a[href="./coordination-pack.pdf"]');y.removeAttribute("href"),y.setAttribute("aria-disabled","true"),y.textContent="PDF awaits current drawing issue"}let k=await fetch(s("trial-pack.json"));if(k.ok&&!(await k.json()).available){let y=i.querySelector('a[href="./trial-study.pdf"]');y.removeAttribute("href"),y.setAttribute("aria-disabled","true"),y.textContent="Trial PDF awaits current issue"}t||v.setAnimationLoop(()=>{a.view==="model"&&!document.hidden&&(S.update(),v.render(b,p))});let Ut={ready:!0,setGarageDeck:Be,showGarageDeck:ee,data:o,trials:c,members:l,setRoofOption:Ae,inspectJunction:me,toggleVisibleSystem:ot,get rates(){return d},isolate:Ge,focusElement:_e,visible:()=>ie().map(C=>C.id),setGarageRebuild(C){a.garageRebuild=C,we(),K()},controls:S,directionSVG:()=>tc(o,c),state:a,select:te,fit:j,setView(C){a.view=C,K()},setRegion(C){a.region=C,we(),K(),j()},setLevel(C){a.level=String(C),we(),K(),j()},drawing:C=>Oa(o,{...a,...C}),renderer:v,scene:b,camera:p,get architecture(){return N},cutawayPlanes:{structure:A,architecture:_}};return t||(window.structureStudio=Ut),Ut}await mm();
/*! Bundled license information:

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.8.2
  *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
