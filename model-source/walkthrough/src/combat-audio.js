// Short procedural cues, created only after a player gesture; no downloads.
export class CombatAudio{
 constructor(){this.enabled=true;this.context=null;}
 unlock(){try{const Context=window.AudioContext||window.webkitAudioContext;if(Context&&!this.context)this.context=new Context();if(this.context?.state==='suspended')this.context.resume().catch(()=>{});}catch{}}
 play(kind){if(!this.enabled||!this.context||this.context.state!=='running')return;const ctx=this.context,t=ctx.currentTime;
  const tone=(frequency,end,duration,volume,type='sine',delay=0)=>{const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type;osc.frequency.setValueAtTime(frequency,t+delay);osc.frequency.exponentialRampToValueAtTime(end,t+delay+duration);gain.gain.setValueAtTime(volume,t+delay);gain.gain.exponentialRampToValueAtTime(.001,t+delay+duration);osc.connect(gain).connect(ctx.destination);osc.start(t+delay);osc.stop(t+delay+duration+.01);};
  if(kind==='bow')tone(270,95,.12,.05,'triangle');
  else if(['pistol','shotgun','carbine'].includes(kind)){const length=kind==='shotgun'?.18:.09;const buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*length),ctx.sampleRate),v=buffer.getChannelData(0);for(let i=0;i<v.length;i++)v[i]=(Math.random()*2-1)*Math.pow(1-i/v.length,3);const noise=ctx.createBufferSource(),gain=ctx.createGain();noise.buffer=buffer;gain.gain.value=.06;noise.connect(gain).connect(ctx.destination);noise.start();tone(100,35,length,.08,'triangle');}
  else if(kind==='hit')tone(680,310,.055,.035,'triangle');
  else if(kind==='hurt')tone(95,42,.15,.05,'sine');
  else if(kind==='pickup'){tone(440,660,.10,.035);tone(660,880,.12,.025,'sine',.10);}
  else if(kind==='wave'){tone(160,120,.22,.045,'triangle');tone(120,90,.30,.04,'triangle',.26);}
 }
}
