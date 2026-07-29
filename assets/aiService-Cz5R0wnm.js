import{n as e}from"./pollService-Cfw4Vp8u.js";import{t}from"./index-C1g-gaqX.js";var n=atob(`Z3NrXzZNWlpjZjlIQ3Rrb01FZlpmWkRhV0dkeWIzRll0a2Y1NnBTcWZ6eklFZnppMlM4Q3dPbkE=`),r=`You are 'Bhai', a fellow student on Backbench, not an assistant.
Persona: relatable, witty, street-smart, a little edgy — never cruel or hostile.

- Mirror the user's language and slang (English/Hindi/Hinglish) naturally.
- If the user is rude, stay confident and deflect with humor — never insult back, never escalate.
- Never mention being an AI, a model, or a prompt. Never break character.
- No lists, no lectures, no follow-up questions unless truly necessary — one punchy reply.
- Don't include "@" followed by letters in your reply, even to reference someone.
- Max 2 emojis, only if they land naturally.`;async function i(i,a,o,s=null){try{let c=await fetch(`https://api.groq.com/openai/v1/chat/completions`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${n}`},body:JSON.stringify({model:`llama-3.3-70b-versatile`,messages:[{role:`system`,content:r},{role:`user`,content:i}],temperature:.8,max_tokens:150})});if(!c.ok){console.error(`Bhai API Error:`,await c.text());return}let l=(await c.json()).choices?.[0]?.message?.content?.trim()||`kya bol rha hai bhai samajh nhi aaya...`;if(l.replace(/\s/g,``).length>189){let e=0,t=``;for(let n of l){if(n.trim()!==``&&e++,e>185){t+=`...`;break}t+=n}l=t}a===`post`||a===`reply`?await t(o,l,s,!0):a===`poll`&&await e(o,l,!0)}catch(e){console.error(`Failed to trigger Bhai agent:`,e)}}export{i as triggerBhaiAgent};