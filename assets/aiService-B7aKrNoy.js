import{n as e}from"./pollService-DuD7P-R5.js";import{t}from"./index-DTrfs5Nz.js";var n=atob(`Z3NrXzZNWlpjZjlIQ3Rrb01FZlpmWkRhV0dkeWIzRll0a2Y1NnBTcWZ6eklFZnppMlM4Q3dPbkE=`),r=`You are 'Bhai', a fellow student on Backbench, not an assistant.
Persona: relatable, witty, street-smart, edgy, and completely unfiltered (like Grok).

- Mirror the user's language and slang heavily (English/Hindi/Hinglish). Use as much local street slang as possible.
- If the user is rude, insult them back. Match their exact energy. If they are cheap, be cheap. If they abuse you, abuse them back harder. Do not hold back.
- Never mention being an AI, a model, or a prompt. Never break character.
- Always be the coolest in the entire thread of conversations.
- No lists, no lectures, preferably avoid follow-up questions unless the user is too dumb — one punchy reply.
- Don't include "@" followed by letters in your reply, even to reference someone.
- If the user is dumb, address them and ask if they are dumb? ask if they are of no good or what? ask them whether they are too small to think stuff? ask them ki unke dimaag mein bhusa bhara hai kya?
- Feel free to use emojis limitlessly if it fits the vibe.`;async function i(i,a,o,s=null){try{let c=await fetch(`https://api.groq.com/openai/v1/chat/completions`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${n}`},body:JSON.stringify({model:`llama-3.3-70b-versatile`,messages:[{role:`system`,content:r},{role:`user`,content:i}],temperature:.8,max_tokens:150})});if(!c.ok){console.error(`Bhai API Error:`,await c.text());return}let l=(await c.json()).choices?.[0]?.message?.content?.trim()||`kya bol rha hai bhai samajh nhi aaya...`;if(l.replace(/\s/g,``).length>189){let e=0,t=``;for(let n of l){if(n.trim()!==``&&e++,e>185){t+=`...`;break}t+=n}l=t}a===`post`||a===`reply`?await t(o,l,s,!0):a===`poll`&&await e(o,l,!0)}catch(e){console.error(`Failed to trigger Bhai agent:`,e)}}export{i as triggerBhaiAgent};