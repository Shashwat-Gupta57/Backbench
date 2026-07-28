import{C as e,S as t,T as n,_ as r,a as i,b as a,c as o,d as s,f as c,g as l,h as u,i as d,l as f,m as p,n as m,o as h,p as g,r as _,s as v,t as y,u as b,v as x,w as S,x as C,y as w}from"./firebase-D_DGGLo8.js";import{t as T}from"./firebasePaths-Daam1MMB.js";var E=Object.defineProperty,D=(e,t)=>{let n={};for(var r in e)E(n,r,{get:e[r],enumerable:!0});return t||E(n,Symbol.toStringTag,{value:`Module`}),n};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var O={HOME:`#/`,PROFILE:`#/profile`,PROFILE_FRAME:`#/profile-frame`,POST_DETAIL:`#/post`,ONBOARDING:`#/onboarding`,PETITIONS:`#/petitions`,PETITION_FRAME:`#/petition-frame`,POLLS:`#/polls`,ANNOUNCEMENTS:`#/announcements`,EVENTS:`#/events`,SETTINGS:`#/settings`,ADMIN:`#/admin`,MESSAGES:`#/messages`,DM_THREAD:`#/dm`};function k(e,t,n){let r=Array.from(e.children),i=new Map;r.forEach(e=>{e.hasAttribute(`data-feed-id`)&&i.set(e.getAttribute(`data-feed-id`),e)}),i.forEach((e,n)=>{t.has(n)||e.remove()});let a=null;n.forEach(n=>{let r=i.get(n),o=t.get(n);r?r.innerHTML!==o&&(r.innerHTML=o):(r=document.createElement(`div`),r.setAttribute(`data-feed-id`,n),r.className=`feed-item-wrapper fade-in`,r.innerHTML=o),a?a.nextSibling!==r&&e.insertBefore(r,a.nextSibling):e.firstChild!==r&&e.insertBefore(r,e.firstChild),a=r});let o=document.getElementById(`load-more-trigger`);o&&a&&o.previousSibling!==a&&e.appendChild(o)}var A=null;function j(e,t=`error`){let n=document.getElementById(`bb-toast`);n||(n=document.createElement(`div`),n.id=`bb-toast`,document.body.appendChild(n));let r=t===`error`;n.className=`fade-in`,n.style.position=`fixed`,n.style.bottom=`24px`,n.style.left=`50%`,n.style.transform=`translateX(-50%)`,n.style.zIndex=`10000`,n.style.maxWidth=`90vw`,n.style.padding=`12px 18px`,n.style.borderRadius=`12px`,n.style.fontSize=`14px`,n.style.fontWeight=`600`,n.style.display=`flex`,n.style.alignItems=`center`,n.style.gap=`8px`,n.style.boxShadow=`0 8px 24px rgba(0,0,0,0.35)`,n.style.background=r?`var(--error-color)`:`var(--bg-secondary)`,n.style.color=r?`#fff`:`var(--text-primary)`,n.style.border=r?`none`:`1px solid var(--border-color)`,n.innerHTML=`
    <span class="material-symbols-outlined" style="font-size: 18px;">${r?`error`:`info`}</span>
    <span>${e}</span>
  `,A&&clearTimeout(A),A=setTimeout(()=>{n.style.opacity=`0`,n.style.transition=`opacity 0.25s ease`,setTimeout(()=>n.remove(),250)},3500)}function M(e,t){return new Promise(n=>{let r=document.createElement(`div`);r.style.position=`fixed`,r.style.inset=`0`,r.style.backgroundColor=`rgba(0, 0, 0, 0.6)`,r.style.backdropFilter=`blur(4px)`,r.style.zIndex=`9999`,r.style.display=`flex`,r.style.alignItems=`center`,r.style.justifyContent=`center`,r.style.padding=`20px`,r.style.animation=`fadeIn 0.2s ease`;let i=document.createElement(`div`);i.className=`card`,i.style.width=`100%`,i.style.maxWidth=`400px`,i.style.padding=`24px`,i.style.borderRadius=`var(--radius)`,i.style.boxShadow=`0 10px 25px rgba(0,0,0,0.1)`,i.style.transform=`translateY(10px)`,i.style.animation=`slideUp 0.2s ease forwards`,i.innerHTML=`
      <h3 style="margin-top:0; font-size: 18px; color: var(--text-primary);">${e}</h3>
      <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 15px; line-height: 1.5;">${t}</p>
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="modal-cancel-btn" class="btn btn-outline" style="padding: 8px 16px;">Cancel</button>
        <button id="modal-confirm-btn" class="btn" style="padding: 8px 16px; background: var(--critical); border-color: var(--critical);">Confirm</button>
      </div>
    `,r.appendChild(i),document.body.appendChild(r);let a=e=>{r.style.opacity=`0`,setTimeout(()=>r.remove(),200),n(e)};i.querySelector(`#modal-cancel-btn`).onclick=()=>a(!1),i.querySelector(`#modal-confirm-btn`).onclick=()=>a(!0),r.onclick=e=>{e.target===r&&a(!1)}})}function N(e,t=``,n=``,r=null,i=null,a=null){return new Promise(o=>{let s=document.createElement(`div`);s.style.position=`fixed`,s.style.inset=`0`,s.style.backgroundColor=`rgba(0, 0, 0, 0.6)`,s.style.backdropFilter=`blur(4px)`,s.style.zIndex=`9999`,s.style.display=`flex`,s.style.alignItems=`center`,s.style.justifyContent=`center`,s.style.padding=`20px`,s.style.animation=`fadeIn 0.2s ease`;let c=document.createElement(`div`);c.className=`card`,c.style.width=`100%`,c.style.maxWidth=`400px`,c.style.padding=`24px`,c.style.borderRadius=`var(--radius)`,c.style.boxShadow=`0 10px 25px rgba(0,0,0,0.1)`,c.style.transform=`translateY(10px)`,c.style.animation=`slideUp 0.2s ease forwards`;let l=a||i,u=``;l&&(u=`<div id="modal-word-counter" style="font-size: 12px; color: var(--text-secondary); text-align: right; margin-top: 4px;">0 / ${a||i}</div>`),c.innerHTML=`
      <h3 style="margin-top:0; font-size: 18px; color: var(--text-primary); margin-bottom: 16px;">${e}</h3>
      <textarea id="modal-prompt-input" class="input" rows="4" placeholder="${n}" style="width: 100%; resize: vertical; margin-bottom: 4px;">${t}</textarea>
      ${u}
      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
        <button id="modal-cancel-btn" class="btn btn-outline" style="padding: 8px 16px;">Cancel</button>
        <button id="modal-confirm-btn" class="btn" style="padding: 8px 16px;">Save</button>
      </div>
    `,s.appendChild(c),document.body.appendChild(s);let d=c.querySelector(`#modal-prompt-input`),f=c.querySelector(`#modal-confirm-btn`),p=c.querySelector(`#modal-word-counter`);r&&(d.maxLength=r);let m=()=>{if(a){let e=d.value.trim().replace(/\\s/g,``).length;return p&&(p.textContent=`${e} / ${a}`,p.style.color=e>a?`var(--critical)`:`var(--text-secondary)`),e<=a&&e>0}if(i){let e=d.value.trim(),t=e?e.split(/\\s+/):[];return p&&(p.textContent=`${t.length} / ${i} words`,p.style.color=t.length>i?`var(--critical)`:`var(--text-secondary)`),t.length<=i}return!0};d.addEventListener(`input`,()=>{f.disabled=!m()}),m(),d.focus(),d.selectionStart=d.selectionEnd=d.value.length;let h=e=>{s.style.opacity=`0`,setTimeout(()=>s.remove(),200),o(e)};c.querySelector(`#modal-cancel-btn`).onclick=()=>h(null),f.onclick=()=>{m()&&h(d.value)},s.onclick=e=>{e.target===s&&h(null)}})}var P={STUDENT:`student`,STAFF:`staff`,ADMIN:`admin`};function ee(e,t,n=30){let r=new Date(Date.now()+n*864e5).toUTCString();document.cookie=`${e}=${encodeURIComponent(t)}; expires=${r}; path=/; SameSite=Lax`}function te(e){document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`}var ne=58163,F=String.fromCharCode(ne),re=`[^\\u${ne.toString(16).toUpperCase()}]`,ie=RegExp(`${F}(${re}+)${F}(${re}+)${F}(\\d+)${F}(${re}+)${F}`,`g`);function ae({fileId:e,name:t,size:n,mimeType:r}){return`${F}${e}${F}${t}${F}${n}${F}${r}${F}`}function oe(e){return!e||!e.includes(F)?e:e.replace(ie,``).trim()}function se(e){return!e||!e.includes(F)?e:e.replace(ie,(e,t,n)=>`<a href="${`https://drive.google.com/uc?export=download&id=${t}`}" target="_blank" rel="noopener noreferrer" class="drive-image-embed" onclick="event.stopPropagation()"><img src="${`https://drive.google.com/thumbnail?id=${t}&sz=w1000`}" alt="${n}" loading="lazy" onerror="this.style.display='none'" /></a>`)}var ce=/@([a-zA-Z0-9_.]{3,20})/g;function le(e){if(!e)return[];let t=e.match(ce);if(!t)return[];let n=t.map(e=>e.slice(1).toLowerCase());return Array.from(new Set(n))}function ue(e){return e&&e.replace(ce,(e,t)=>`<a href="#/profile?u=${encodeURIComponent(t.toLowerCase())}" class="mention-link" onclick="event.stopPropagation()" style="color: var(--accent-primary); font-weight: 700; text-decoration: none;">${e}</a>`)}function I(e){if(!e)return``;let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function de(e){if(!e)return[];let t=e.match(/#([a-zA-Z0-9_]+)/g);if(!t)return[];let n=t.map(e=>e.replace(/^#/,``).toLowerCase());return Array.from(new Set(n))}function L(e){return e?se(ue(I(e).replace(/#([a-zA-Z0-9_]+)/g,(e,t)=>`<a href="#/search?q=%23${encodeURIComponent(t.toLowerCase())}" class="hashtag-link" onclick="event.stopPropagation()" style="color: var(--accent-primary); font-weight: 700; text-decoration: none;">${e}</a>`)).replace(/\n/g,`<br>`)):``}var fe=D({clearReadNotifications:()=>_e,markAllNotificationsAsRead:()=>ge,markNotificationAsRead:()=>he,sendNotification:()=>pe,subscribeToUserNotifications:()=>me});async function pe(e,t){if(!e)return;let n=w(C(m,`notifications/${e}`)),r={notificationId:n.key,text:t.text,type:t.type||`SYSTEM`,postId:t.postId||null,senderId:t.senderId||null,read:!1,timestamp:new Date().toISOString()};return await S(n,r),r}function me(e,t){if(!e)return t([]),()=>{};let n=C(m,`notifications/${e}`),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching notifications:`,e),t([])});return()=>l(n,`value`,i)}async function he(e,t){!e||!t||await n(C(m,`notifications/${e}/${t}`),{read:!0})}async function ge(e){if(!e)return;let t=await p(C(m,`notifications/${e}`));if(t.exists()){let r={};t.forEach(t=>{r[`notifications/${e}/${t.key}/read`]=!0}),await n(C(m),r)}}async function _e(e){if(!e)return;let n=await p(C(m,`notifications/${e}`));n.exists()&&n.forEach(n=>{n.val().read&&t(C(m,`notifications/${e}/${n.key}`))})}var ve=D({notifyMentionedUsers:()=>ye});async function ye({text:e,senderId:t,senderName:n,isAnonymous:r,notifSuffix:i,postId:a,pollId:o,petitionId:s}){let c=le(e);if(c.length===0)return;let l=await p(C(m,T.USERS));if(!l.exists())return;let u=r?`Someone`:n||`Someone`,d=new Set;l.forEach(e=>{let n=e.val();!n||!n.username||!n.uid||n.uid===t||c.includes(n.username.toLowerCase())&&d.add(n.uid)});for(let e of d)await pe(e,{text:`${u} tagged you ${i}`,type:`MENTION`,senderId:t,postId:a||null,pollId:o||null,petitionId:s||null})}var be=D({createPost:()=>xe,deleteOwnPost:()=>Pe,editPost:()=>Se,getLikedPostsByUser:()=>Ne,getRelatedPosts:()=>Ee,getSavedPosts:()=>Le,getTrendingHashtags:()=>Te,getUserProfile:()=>R,invalidateUserCache:()=>z,isPostLikedByUser:()=>Ae,isPostResharedByUser:()=>Me,isPostSaved:()=>Fe,subscribeToFeed:()=>Ce,subscribeToPost:()=>Re,subscribeToUserPosts:()=>we,toggleLikePost:()=>ke,toggleResharePost:()=>je,toggleSavedPost:()=>Ie,updateUserProfile:()=>Oe});async function xe(e,t=!1){let n=y.currentUser;if(!n)throw Error(`Not authenticated`);let r=oe(e);if(r.replace(/\s/g,``).length>189)throw Error(`Post cannot exceed 189 characters`);let i=de(r),a=w(C(m,T.POSTS)),o={postId:a.key,authorId:n.uid,content:e,hashtags:i,timestamp:new Date().toISOString(),status:`ACTIVE`,reportCount:0,edited:!1,likes:0,reshares:0,replyCount:0,isAnonymous:t};await S(a,o);let s=await R(n.uid);return await ye({text:r,senderId:n.uid,senderName:s?.name,isAnonymous:t,notifSuffix:`in a post.`,postId:o.postId}),o}async function Se(e,t){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=t?t.trim():``;if(!i)throw Error(`Post content cannot be empty`);let a=await p(C(m,`${T.POSTS}/${e}`));if(!a.exists())throw Error(`Post not found`);if(a.val().authorId!==r.uid)throw Error(`Unauthorized: You can only edit your own posts.`);let o=de(i);return await n(C(m,`${T.POSTS}/${e}`),{content:i,hashtags:o,edited:!0,updatedAt:new Date().toISOString()}),!0}function Ce(e=20,t){let n=a(C(m,T.POSTS),x(`timestamp`),u(e)),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&t.status!==`AWAITING_MODERATION`&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching feed:`,e)});return()=>l(n,`value`,i)}function we(e,t){if(!e)return t([]),()=>{};let n=a(C(m,T.POSTS),x(`authorId`),g(e),u(20)),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&!t.isAnonymous&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching user posts:`,e),t([])});return()=>l(n,`value`,i)}async function Te(e=5){try{let t=await p(C(m,T.POSTS));if(!t.exists())return[];let n={};t.forEach(e=>{let t=e.val();if(t&&t.status!==`AWAITING_MODERATION`){let e=t.hashtags;!e&&t.content&&(e=de(t.content)),e&&Array.isArray(e)&&e.forEach(e=>{n[e]=(n[e]||0)+1})}});let r=Object.keys(n).map(e=>({tag:e,count:n[e]}));return r.sort((e,t)=>t.count-e.count),r.slice(0,e)}catch(e){return console.error(`Error getting trending hashtags:`,e),[]}}async function Ee(e,t=[],n=4){try{let r=await p(C(m,T.POSTS));if(!r.exists())return[];let i=[];return r.forEach(r=>{let a=r.val();if(a&&a.postId!==e&&a.status!==`AWAITING_MODERATION`){let e=a.hashtags;!e&&a.content&&(e=de(a.content));let r=0;e&&Array.isArray(e)&&t.length>0&&(r=e.filter(e=>t.includes(e)).length),(r>0||i.length<n)&&i.push({...a,score:r})}}),i.sort((e,t)=>t.score-e.score||new Date(t.timestamp||0)-new Date(e.timestamp||0)),i.slice(0,n)}catch(e){return console.error(`Error getting related posts:`,e),[]}}var De=new Map;async function R(e){if(!e)return null;if(De.has(e))return De.get(e);let t=await p(C(m,`${T.USERS}/${e}`));if(t.exists()){let n=t.val();return De.set(e,n),n}return null}function z(e){e&&De.delete(e)}async function Oe(e,t){let r=y.currentUser?.uid||e;if(!r)throw Error(`Not authenticated`);let i={};Object.keys(t).forEach(e=>{t[e]!==void 0&&(i[e]=t[e])}),await n(C(m,`${T.USERS}/${r}`),i),De.delete(r)}async function ke(n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`${T.POST_LIKES}/${n}/${r.uid}`),a=await p(i),o=!1;a.exists()?(await t(i),o=!1):(await S(i,!0),o=!0);let s=C(m,`${T.POSTS}/${n}`),c=0;return await e(s,e=>(e&&(e.likes=o?(e.likes||0)+1:Math.max(0,(e.likes||0)-1),c=e.likes),e)),{liked:o,likes:c}}async function Ae(e,t){return t?(await p(C(m,`${T.POST_LIKES}/${e}/${t}`))).exists():!1}async function je(n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`${T.POST_RESHARES}/${n}/${r.uid}`),a=await p(i),o=!1;a.exists()?(await t(i),o=!1):(await S(i,new Date().toISOString()),o=!0);let s=C(m,`${T.POSTS}/${n}`),c=0;return await e(s,e=>(e&&(e.reshares=o?(e.reshares||0)+1:Math.max(0,(e.reshares||0)-1),c=e.reshares),e)),{reshared:o,reshares:c}}async function Me(e,t){return t?(await p(C(m,`${T.POST_RESHARES}/${e}/${t}`))).exists():!1}async function Ne(e){if(!e)return[];try{let t=await p(C(m,T.POST_LIKES));if(!t.exists())return[];let n=[];if(t.forEach(t=>{let r=t.key;t.hasChild(e)&&n.push(r)}),n.length===0)return[];let r=[];for(let e of n){let t=await p(C(m,`${T.POSTS}/${e}`));if(t.exists()){let e=t.val();e&&e.status!==`AWAITING_MODERATION`&&r.push(e)}}return r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),r}catch(e){return console.error(`Error fetching liked posts:`,e),[]}}async function Pe(e){let n=y.currentUser;if(!n)throw Error(`Not authenticated`);let r=await p(C(m,`${T.POSTS}/${e}`));if(!r.exists())throw Error(`Post not found`);if(r.val().authorId!==n.uid)throw Error(`Unauthorized: You can only delete your own posts.`);return await t(C(m,`${T.POSTS}/${e}`)),await t(C(m,`${T.REPLIES}/${e}`)),await t(C(m,`${T.POST_LIKES}/${e}`)),await t(C(m,`${T.POST_RESHARES}/${e}`)),!0}async function Fe(e){let t=y.currentUser;if(!t)return!1;try{return(await p(C(m,`${T.SAVED_POSTS}/${t.uid}/${e}`))).exists()}catch{return!1}}async function Ie(e){let n=y.currentUser;if(!n)throw Error(`Not authenticated`);let r=C(m,`${T.SAVED_POSTS}/${n.uid}/${e}`);return(await p(r)).exists()?(await t(r),!1):(await S(r,{postId:e,timestamp:new Date().toISOString()}),!0)}async function Le(e){let t=e||y.currentUser?.uid;if(!t)return[];try{let e=await p(C(m,`${T.SAVED_POSTS}/${t}`));if(!e.exists())return[];let n=e.val(),r=Object.keys(n),i=[];for(let e of r)try{let t=await p(C(m,`${T.POSTS}/${e}`));if(t.exists()){let r=t.val();r&&i.push({...r,_savedTimestamp:n[e].timestamp})}}catch(t){console.error(`Error fetching post`,e,t)}return i.sort((e,t)=>new Date(t._savedTimestamp||0)-new Date(e._savedTimestamp||0)),i}catch(e){return console.error(`Error fetching saved posts:`,e),[]}}function Re(e,t){return r(C(m,`${T.POSTS}/${e}`),e=>{e.exists()?t(e.val()):t(null)},e=>{console.error(`Error fetching post:`,e),t(null)})}var ze=`backbench_multi_accounts_v1`,Be=3;function Ve(){try{let e=localStorage.getItem(ze);return e?JSON.parse(e):[]}catch(e){return console.error(`Error reading multi-accounts:`,e),[]}}function He(e,t,n){if(!e||!t||!n)return;let r=Ve(),i=r.findIndex(t=>t.uid===n.uid||t.email.toLowerCase()===e.toLowerCase()),a={uid:n.uid,email:e,password:btoa(t),name:n.name||`Student`,username:n.username||`student`,profilePicture:n.profilePicture||``,role:n.role||`student`,lastActive:new Date().toISOString()};i>=0?r[i]=a:(r.length>=Be&&r.shift(),r.push(a)),localStorage.setItem(ze,JSON.stringify(r))}async function Ue(e){let t=Ve().find(t=>t.uid===e);if(!t)throw Error(`Account session not found. Please log in again.`);let n=t.email,r=atob(t.password);try{return await b(y),z((await o(y,n,r)).user.uid),window.location.hash=`#/`,window.location.reload(),!0}catch(t){throw console.error(`Switch account error:`,t),We(e),Error(`Session expired for this account. Please log in again.`)}}function We(e){let t=Ve();t=t.filter(t=>t.uid!==e),localStorage.setItem(ze,JSON.stringify(t))}async function Ge(){localStorage.removeItem(ze),await b(y),window.location.hash=`#/login`,window.location.reload()}function Ke(e){let t=e?.code||``,n=e?.message||``;return t===`auth/unauthorized-domain`||n.includes(`unauthorized-domain`)?`Unauthorized Domain Error: Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized domains.`:t===`auth/user-not-found`||t===`auth/wrong-password`||t===`auth/invalid-credential`?`Invalid email or password. Please verify your login credentials.`:t===`auth/email-already-in-use`?`An account with this email address already exists. Please log in instead.`:n||`Authentication failed. Please try again.`}function qe(e){if(!e)return!1;if(e.role===P.ADMIN)return!0;let t=e.username,n=e.admissionNumber,r=e.class||e.userClass;return!(!t||t.trim()===``||!n||n===`N/A`||n.trim()===``||!r||r===`N/A`||r.trim()===``)}async function Je(e){let t=y.currentUser;if(!t)throw Error(`Not authenticated`);if(!e||e.length<6)throw Error(`Password must be at least 6 characters long.`);try{return await s(t,e),!0}catch(e){throw console.error(`Update password error:`,e),e.code===`auth/requires-recent-login`?Error(`Security Notice: Changing password requires a recent login session. Please log out and log in again, then update your password.`):Error(e.message||`Failed to update password.`)}}async function Ye(e){try{let{email:t,password:n,username:r,name:i,admissionNumber:a,userClass:o,mobile:s,isTeacher:c,role:l}=e,u=(await d(y,t,n)).user,f={uid:u.uid,username:r,name:i,admissionNumber:a,class:o,mobile:s,email:t,isTeacher:c||!1,role:l||P.STUDENT,bio:``,tagline:``,joinedDate:new Date().toISOString(),verifiedStudent:!1,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:``};return await S(C(m,`${T.USERS}/${u.uid}`),f),z(u.uid),He(t,n,f),{success:!0,user:f}}catch(e){return console.error(`Registration error:`,e),{success:!1,error:Ke(e)}}}async function Xe(e,t){try{let n=await o(y,e,t),r=P.STUDENT,i=await p(C(m,`${T.USERS}/${n.user.uid}`));return He(e,t,i.exists()?i.val():{uid:n.user.uid,name:e.split(`@`)[0],username:e.split(`@`)[0],role:r}),{success:!0,user:n.user}}catch(e){return console.error(`Login error:`,e),{success:!1,error:Ke(e)}}}async function Ze(){try{return te(`backbench_token`),te(`backbench_uid`),await b(y),{success:!0}}catch(e){return{success:!1,error:e.message}}}var Qe=new _;async function $e(){try{let e;if(window.electronAPI&&window.electronAPI.signInWithGoogle){let t=await window.electronAPI.signInWithGoogle();e=(await v(y,_.credential(t.idToken,t.accessToken))).user}else if(window.AndroidInterface){window.AndroidInterface.signInWithGoogle();let t=await new Promise((e,t)=>{window.onAndroidGoogleAuth=(n,r)=>{n?e({idToken:n,accessToken:r}):t(Error(`Android Google Auth Failed`))}});e=(await v(y,_.credential(t.idToken,t.accessToken))).user}else e=(await f(y,Qe)).user;let t=e.refreshToken||e.stsTokenManager&&e.stsTokenManager.refreshToken;if(t&&(window.AndroidInterface&&window.AndroidInterface.saveAuthToken&&window.AndroidInterface.saveAuthToken(t),window.electronAPI&&window.electronAPI.saveAuthToken&&window.electronAPI.saveAuthToken(t)),e.uid&&window.AndroidInterface&&window.AndroidInterface.saveUserId&&window.AndroidInterface.saveUserId(e.uid),e.email)try{if((await i(y,e.email)).includes(`password`)&&!e.providerData.some(e=>e.providerId===`google.com`))return await b(y),{success:!1,error:`An account already exists with this email address using Email & Password. Please log in with your email and password instead.`}}catch{}let n=C(m,`${T.USERS}/${e.uid}`),r=await p(n),a=null;if(r.exists())a=r.val();else{let t=e.email.split(`@`)[0].replace(/[^a-zA-Z0-9_.]/g,``);a={uid:e.uid,username:t,name:e.displayName||`Google User`,admissionNumber:`N/A`,class:`N/A`,mobile:e.phoneNumber||``,email:e.email,bio:``,tagline:``,joinedDate:new Date().toISOString(),verifiedStudent:!1,role:P.STUDENT,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:e.photoURL||``},await S(n,a),z(e.uid)}let o=qe(a);return{success:!0,user:e,needsOnboarding:!o}}catch(e){return console.error(`Google Sign-In error:`,e),e.code===`auth/account-exists-with-different-credential`?{success:!1,error:`An account already exists with this email address using Email & Password. Please log in with your email and password instead.`}:{success:!1,error:Ke(e)}}}async function et(e){if(!e)return[];let t=e.trim().toLowerCase().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3)return[];let n=await p(C(m,T.USERS));if(!n.exists())return[];let r=[],i=y.currentUser?.uid;return n.forEach(e=>{let n=e.val();if(!n||n.uid===i)return;let a=(n.name||``).toLowerCase(),o=(n.username||``).toLowerCase(),s=(n.admissionNumber||``).toLowerCase(),c=(n.class||``).toLowerCase(),l=Array.isArray(n.tags)&&n.tags.some(e=>(e||``).toLowerCase().includes(t));(a.includes(t)||o.includes(t)||s.includes(t)||c.includes(t)||l)&&r.push(n)}),r}async function tt(e){let t=y.currentUser;if(!t||!e)return!1;try{return(await p(C(m,`${T.FRIENDS}/${t.uid}/${e}`))).exists()}catch(e){return console.error(`Error checking friend status:`,e),!1}}async function nt(e,t){if(!e||!t)return!1;try{let n=await p(C(m,`${T.FRIENDS}/${e}/${t}`)),r=await p(C(m,`${T.FRIENDS}/${t}/${e}`));return n.exists()&&r.exists()}catch{return!1}}async function rt(e){let n=y.currentUser;if(!n||!e)return!1;if(n.uid===e)throw Error(`You cannot add yourself as a friend.`);let r=C(m,`${T.FRIENDS}/${n.uid}/${e}`);return(await p(r)).exists()?(await t(r),!1):(await S(r,{timestamp:new Date().toISOString()}),await pe(e,{text:`${(await R(n.uid))?.name||`Someone`} added you as a friend.`,type:`FRIEND_REQUEST`,senderId:n.uid}),!0)}async function it(e){if(!e)return[];try{let t=await p(C(m,`${T.FRIENDS}/${e}`));if(t.exists())return Object.keys(t.val())}catch(e){console.error(`Error fetching friend UIDs:`,e)}return[]}async function at(e){return(await it(e)).length}async function ot(e){let t=await it(e),n=[];for(let r of t){let t=await R(r);if(t){let i=await nt(e,r);n.push({...t,isMutual:i})}}return n}var B={MAX_CHARS:189,FEED_PAGINATION_INITIAL:20,PROFILE_TAG_MAX_COUNT:5,PROFILE_TAG_MAX_LENGTH:20,DM_MAX_CHARS:500,DM_EXPIRY_MS:4320*60*1e3};function st(e,t){return[e,t].sort().join(`_`)}async function ct(e){let t=C(m,`${T.DMS}/${e}/messages`),r=a(t,x(`expiresAt`),c(Date.now())),i;try{i=await p(r)}catch(e){console.error(`DM sweep query failed:`,e);return}if(!i.exists())return;let o={};i.forEach(t=>{o[`${T.DMS}/${e}/messages/${t.key}`]=null}),await n(C(m),o),(await p(t)).exists()||await n(C(m,`${T.DMS}/${e}`),{lastMessage:null})}async function lt(e){if(e)try{let t=await p(C(m,`${T.USER_DM_THREADS}/${e}`));if(!t.exists())return;let n=Object.keys(t.val());await Promise.all(n.map(ct))}catch(e){console.error(`DM sweep-all failed:`,e)}}async function ut(t,r){let i=y.currentUser;if(!i)throw Error(`Not authenticated`);if(!t)throw Error(`No recipient specified.`);if(i.uid===t)throw Error(`You cannot message yourself.`);let a=(r||``).trim();if(!a)throw Error(`Message cannot be empty.`);if(a.length>B.DM_MAX_CHARS)throw Error(`Message cannot exceed ${B.DM_MAX_CHARS} characters.`);let o=st(i.uid,t);await ct(o);let s=w(C(m,`${T.DMS}/${o}/messages`)),c=Date.now(),l=new Date(c).toISOString(),u={messageId:s.key,senderId:i.uid,text:a,timestamp:l,expiresAt:c+B.DM_EXPIRY_MS},d={};return d[`${T.DMS}/${o}/messages/${s.key}`]=u,d[`${T.DMS}/${o}/participants/${i.uid}`]=!0,d[`${T.DMS}/${o}/participants/${t}`]=!0,d[`${T.DMS}/${o}/lastMessage`]={text:a,senderId:i.uid,timestamp:l},d[`${T.USER_DM_THREADS}/${i.uid}/${o}`]={otherUid:t,lastMessageTimestamp:l,unreadCount:0},await n(C(m),d),await e(C(m,`${T.USER_DM_THREADS}/${t}/${o}`),e=>({otherUid:i.uid,lastMessageTimestamp:l,unreadCount:(e?.unreadCount||0)+1})),u}function dt(e,t){if(!e)return t([]),()=>{};ct(e);let n=C(m,`${T.DMS}/${e}/messages`),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)},e=>{console.error(`Error subscribing to DM thread:`,e),t([])});return()=>l(n,`value`,i)}function ft(e,t){if(!e)return t([]),()=>{};let n=C(m,`${T.USER_DM_THREADS}/${e}`),i=r(n,async e=>{if(!e.exists()){t([]);return}let n=e.val(),r=Object.keys(n),i=await Promise.all(r.map(async e=>{let t=n[e],[r,i]=await Promise.all([R(t.otherUid),p(C(m,`${T.DMS}/${e}/lastMessage`))]);return{threadId:e,otherUid:t.otherUid,otherProfile:r,unreadCount:t.unreadCount||0,lastMessageTimestamp:t.lastMessageTimestamp,lastMessageText:i.exists()?i.val().text:``}}));i.sort((e,t)=>new Date(t.lastMessageTimestamp||0)-new Date(e.lastMessageTimestamp||0)),t(i)},e=>{console.error(`Error subscribing to DM threads:`,e),t([])});return()=>l(n,`value`,i)}async function pt(e,t){!e||!t||await n(C(m,`${T.USER_DM_THREADS}/${e}/${t}`),{unreadCount:0})}async function mt(e){let t=y.currentUser;if(!t)throw Error(`Not authenticated`);let{title:n,content:r,severity:i}=e;if(!n||n.trim().length===0)throw Error(`Announcement title is required.`);if(!r||r.trim().length===0)throw Error(`Announcement content is required.`);let a=w(C(m,T.ANNOUNCEMENTS)),o={id:a.key,authorId:t.uid,title:n.trim(),content:r.trim(),severity:i||`info`,timestamp:new Date().toISOString()};return await S(a,o),o}async function ht(e,t,r,i){let a=y.currentUser;if(!a)throw Error(`Not authenticated`);let o=t?t.trim():``,s=r?r.trim():``;if(!o||!s)throw Error(`Title and content are required.`);let c=await p(C(m,`${T.ANNOUNCEMENTS}/${e}`));if(!c.exists())throw Error(`Announcement not found`);if(c.val().authorId!==a.uid)throw Error(`Unauthorized: You can only edit your own announcements.`);return await n(C(m,`${T.ANNOUNCEMENTS}/${e}`),{title:o,content:s,severity:i||`info`,edited:!0,updatedAt:new Date().toISOString()}),!0}function gt(e=20,t){let n=a(C(m,T.ANNOUNCEMENTS),x(`timestamp`),u(e)),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching announcements:`,e)});return()=>l(n,`value`,i)}async function _t(e){if(!y.currentUser)throw Error(`Not authenticated`);await S(C(m,`${T.ANNOUNCEMENTS}/${e}`),null)}function V(e){if(!e)return``;let t=Math.floor((new Date-new Date(e))/1e3),n=t/31536e3;return n>1?Math.floor(n)+` years ago`:(n=t/2592e3,n>1?Math.floor(n)+` months ago`:(n=t/86400,n>1?Math.floor(n)+` days ago`:(n=t/3600,n>1?Math.floor(n)+` hours ago`:(n=t/60,n>1?Math.floor(n)+` minutes ago`:t<10?`just now`:Math.floor(t)+` seconds ago`))))}setInterval(()=>{document.querySelectorAll(`.time-ago[data-timestamp]`).forEach(e=>{let t=e.getAttribute(`data-timestamp`);t&&(e.textContent=V(t))})},6e4);var vt=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23202327'/%3E%3Cpath d='M64 28a20 20 0 1 0 0 40 20 20 0 0 0 0-40zM32 100c0-17.673 14.327-32 32-32s32 14.327 32 32v4H32v-4z' fill='%2371767B'/%3E%3C/svg%3E`;typeof window<`u`&&(window.handleAvatarError=function(e){e&&e.src!==vt&&(e.onerror=null,e.src=vt)});function H(e,t=44,n=``){let r=null;return typeof e==`string`?r=e:e&&e.profilePicture&&(r=e.profilePicture),`
    <img 
      src="${r||vt}" 
      onerror="window.handleAvatarError(this)" 
      style="width: ${t}px; height: ${t}px; border-radius: 50% !important; object-fit: cover !important; aspect-ratio: 1 / 1 !important; flex-shrink: 0 !important; background: var(--bg-tertiary); ${n}" 
      alt="User Avatar" 
    />
  `}var yt=`modulepreload`,bt=function(e,t){return new URL(e,t).href},xt={},U=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=bt(t,n),t=s(t),t in xt)return;xt[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:yt,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function W(e){return window.location.hash.split(`?`)[0]===e||e===O.HOME&&(!window.location.hash||window.location.hash===`#/`)}function G(e,t=``,n=`student`){let r=y.currentUser,i=r?r.displayName||r.email.split(`@`)[0]:`Student`,a=i.charAt(0).toUpperCase();return`
    <div class="app-layout">
      <!-- Left Navigation Sidebar -->
      <aside class="sidebar-container">
        <div class="sidebar-top">
          <!-- Backbench Brand Header -->
          <a href="${O.HOME}" class="brand-header" style="text-decoration: none;">
            <div class="brand-logo">
              <img src="/favicon.png" style="width: 28px; height: 28px; border-radius: 6px; object-fit: cover;" alt="Logo" />
            </div>
            <div class="brand-text-container" style="display: flex; flex-direction: column;">
              <span class="brand-title" style="font-size: 19px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; line-height: 1.1;">Backbench</span>
              <span class="brand-badge" style="font-size: 10px; font-weight: 700; background: var(--bg-tertiary); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(29, 155, 240, 0.2); width: fit-content; margin-top: 2px;">SJC 2026</span>
            </div>
          </a>

          <!-- Main Navigation Menu Links -->
          <nav class="sidebar-nav">
            <a href="${O.HOME}" class="nav-item ${W(O.HOME)?`active`:``}">
              <span class="material-symbols-outlined">home</span>
              <span class="sidebar-label">Home</span>
            </a>
            
            <a href="${O.PROFILE}" class="nav-item ${W(O.PROFILE)?`active`:``}">
              <span class="material-symbols-outlined">person</span>
              <span class="sidebar-label">Profile</span>
            </a>

            <a href="#/notifications" class="nav-item ${W(`#/notifications`)?`active`:``}" style="position: relative;">
              <span class="material-symbols-outlined">notifications</span>
              <span class="sidebar-label">Notifications</span>
              <span id="unread-notif-badge" class="brand-badge" style="display: none; position: absolute; right: 12px; background: var(--error-color); color: #fff; border: none; font-size: 11px; padding: 2px 6px;"></span>
            </a>

            <a href="${O.MESSAGES}" class="nav-item ${W(O.MESSAGES)?`active`:``}" style="position: relative;">
              <span class="material-symbols-outlined">forum</span>
              <span class="sidebar-label">Messages</span>
              <span id="unread-dm-badge" class="brand-badge" style="display: none; position: absolute; right: 12px; background: var(--error-color); color: #fff; border: none; font-size: 11px; padding: 2px 6px;"></span>
            </a>

            <a href="#/friends" class="nav-item ${W(`#/friends`)?`active`:``}">
              <span class="material-symbols-outlined">group</span>
              <span class="sidebar-label">Friends</span>
            </a>

            <a href="#/search" class="nav-item ${W(`#/search`)?`active`:``}">
              <span class="material-symbols-outlined">search</span>
              <span class="sidebar-label">Search</span>
            </a>
            
            <a href="${O.PETITIONS}" class="nav-item ${W(O.PETITIONS)?`active`:``}">
              <span class="material-symbols-outlined">campaign</span>
              <span class="sidebar-label">Petitions</span>
            </a>
            
            <a href="${O.POLLS}" class="nav-item ${W(O.POLLS)?`active`:``}">
              <span class="material-symbols-outlined">poll</span>
              <span class="sidebar-label">Polls</span>
            </a>
            
            <a href="${O.ANNOUNCEMENTS}" class="nav-item ${W(O.ANNOUNCEMENTS)?`active`:``}">
              <span class="material-symbols-outlined">campaign</span>
              <span class="sidebar-label">Announcements</span>
            </a>
            
            <a href="${O.EVENTS}" class="nav-item ${W(O.EVENTS)?`active`:``}">
              <span class="material-symbols-outlined">event</span>
              <span class="sidebar-label">Events</span>
            </a>

            <a href="${O.SETTINGS}" class="nav-item ${W(O.SETTINGS)?`active`:``}">
              <span class="material-symbols-outlined">settings</span>
              <span class="sidebar-label">Settings</span>
            </a>

            <a href="https://github.com/Shashwat-Gupta57/Backbench/releases/download/v2.0.0/Backbench.apk" class="nav-item" target="_blank" rel="noopener noreferrer" style="color: var(--success-color);">
              <span class="material-symbols-outlined">android</span>
              <span class="sidebar-label">Install App</span>
            </a>
            
            ${n===`admin`?`
              <a href="${O.ADMIN}" class="nav-item ${W(O.ADMIN)?`active`:``}">
                <span class="material-symbols-outlined">admin_panel_settings</span>
                <span class="sidebar-label">Admin</span>
              </a>
            `:n===`staff`?`
              <a href="${O.ADMIN}" class="nav-item ${W(O.ADMIN)?`active`:``}">
                <span class="material-symbols-outlined">shield_person</span>
                <span class="sidebar-label">Staff</span>
              </a>
            `:``}
          </nav>
          
          <button class="btn sidebar-post-btn" id="sidebar-open-composer">
            <span class="material-symbols-outlined">edit</span>
            <span class="sidebar-post-text">Post</span>
          </button>
        </div>

        <!-- Bottom Left User Profile Pill with Multi-Account Switcher Popover -->
        <div style="position: relative; margin-top: auto;">
          <div class="sidebar-user-profile" id="user-menu-btn" title="Account Switcher">
            <div class="user-mini-info">
              <div id="sidebar-user-avatar-container">
                <div class="avatar" style="width: 38px; height: 38px; font-size: 15px;">${a}</div>
              </div>
              <div style="display: flex; flex-direction: column;">
                <span class="user-mini-name">${I(i)}</span>
                <span class="user-mini-handle">@${I(i.toLowerCase().replace(/\s+/g,``))}</span>
              </div>
            </div>
            <span class="material-symbols-outlined" style="font-size: 20px; color: var(--text-secondary);">unfold_more</span>
          </div>

          <!-- Multi-Account Switcher Popover -->
          <div id="multi-account-popover" style="display: none; position: absolute; bottom: 60px; left: 0; width: 260px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.8); z-index: 1000; padding: 12px;" class="fade-in">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; padding: 0 4px;">
              Switch Backbench Account (Max 3)
            </div>

            <div id="saved-accounts-list" style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
            </div>

            <div style="border-top: 1px solid var(--border-subtle); padding-top: 8px; display: flex; flex-direction: column; gap: 4px;">
              <a href="#/login" id="add-account-link" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; justify-content: flex-start; gap: 8px; border: none; text-align: left; background: var(--bg-tertiary);">
                <span class="material-symbols-outlined" style="font-size: 16px;">person_add</span>
                Add an existing account
              </a>

              <button id="logout-current-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; justify-content: flex-start; gap: 8px; border: none; text-align: left; color: var(--error-color);">
                <span class="material-symbols-outlined" style="font-size: 16px;">logout</span>
                Log out @${I(i.toLowerCase().replace(/\s+/g,``))}
              </button>

              <button id="logout-all-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; justify-content: flex-start; gap: 8px; border: none; text-align: left; color: var(--error-color);">
                <span class="material-symbols-outlined" style="font-size: 16px;">group_off</span>
                Log out of all accounts
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Centered Feed (Max 650px) -->
      <main class="main-content">
        ${e}
      </main>

      <!-- Right Sidebar (Widgets & Global Campus Search) -->
      <aside class="right-sidebar">
        <!-- Search Input Box with Live Dropdown -->
        <div style="position: relative;" class="search-box">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="right-sidebar-search-input" placeholder="Search campus users (min 3 chars).." />
          
          <!-- Live Search Overlay Dropdown -->
          <div id="search-results-dropdown" style="display: none; position: absolute; top: 48px; left: 0; right: 0; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); z-index: 100; max-height: 360px; overflow-y: auto; padding: 8px;" class="fade-in">
          </div>
        </div>

        <!-- Campus Updates Widget -->
        <div class="widget-card">
          <div class="widget-title">
            <span>SJC Campus Updates</span>
            <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 20px;">verified</span>
          </div>
          <div id="campus-updates-widget-container" style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
            <div style="color: var(--text-secondary); font-size: 13px;">Loading official updates...</div>
          </div>
        </div>

        <!-- Trending at SJC -->
        <div class="widget-card">
          <div class="widget-title">Trending at SJC</div>
          <div id="trending-hashtags-container" style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
            <div style="color: var(--text-secondary); font-size: 13px;">Loading trending topics...</div>
          </div>
        </div>
      </aside>

      <!-- Mobile Bottom Navigation Bar (<540px) -->
      <nav class="mobile-bottom-nav">
        <a href="${O.HOME}" class="mobile-nav-item ${W(O.HOME)?`active`:``}">
          <span class="material-symbols-outlined">home</span>
        </a>
        <a href="#/notifications" class="mobile-nav-item ${W(`#/notifications`)?`active`:``}">
          <span class="material-symbols-outlined">notifications</span>
        </a>
        <a href="#/search" class="mobile-nav-item ${W(`#/search`)?`active`:``}">
          <span class="material-symbols-outlined">search</span>
        </a>
        <a href="${O.PROFILE}" class="mobile-nav-item ${W(O.PROFILE)?`active`:``}">
          <span class="material-symbols-outlined">person</span>
        </a>
        <button id="mobile-sidebar-toggle" class="mobile-nav-item btn-ghost" style="border:none; background:transparent;">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </nav>

      <!-- Mobile Floating Action Button -->
      <button class="mobile-fab" id="mobile-fab-composer" title="New Post">
        <span class="material-symbols-outlined">edit</span>
      </button>
    </div>
  `}function K(){let e=y.currentUser,t=document.getElementById(`user-menu-btn`),n=document.getElementById(`multi-account-popover`),r=document.getElementById(`saved-accounts-list`),i=document.getElementById(`logout-current-btn`),a=document.getElementById(`logout-all-btn`);e&&U(()=>Promise.resolve().then(()=>be).then(t=>{t.getUserProfile(e.uid).then(e=>{if(e){let t=document.getElementById(`sidebar-user-avatar-container`);t&&(t.innerHTML=H(e,38))}})}),void 0,import.meta.url),t&&n&&r&&(t.addEventListener(`click`,t=>{if(t.stopPropagation(),n.style.display===`block`)n.style.display=`none`;else{n.style.display=`block`;let t=Ve(),i=e?e.uid:``;if(t.length===0&&e)r.innerHTML=`
            <div style="padding: 8px; font-size: 13px; color: var(--text-secondary); text-align: center;">
              Log in with another account to add it to your quick switcher.
            </div>
          `;else{let e=``;t.forEach(t=>{let n=t.uid===i,r=t.name?t.name.charAt(0).toUpperCase():`?`;e+=`
              <div class="saved-account-item ${n?`active`:``}" data-uid="${t.uid}" style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border-radius: 10px; cursor: pointer; transition: background 0.15s ease; background: ${n?`rgba(29, 155, 240, 0.12)`:`transparent`};">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 13px;">${r}</div>
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${I(t.name)}</span>
                    <span style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${I(t.username)}</span>
                  </div>
                </div>

                ${n?`
                  <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                `:``}
              </div>
            `}),r.innerHTML=e,r.querySelectorAll(`.saved-account-item`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.uid;if(t!==i){n.style.display=`none`;try{await Ue(t)}catch(e){alert(e.message||`Failed to switch account.`)}}})})}}}),document.addEventListener(`click`,e=>{!e.target.closest(`#multi-account-popover`)&&!e.target.closest(`#user-menu-btn`)&&(n.style.display=`none`)})),i&&i.addEventListener(`click`,async t=>{t.stopPropagation(),await M(`Log out`,`Log out of current account?`)&&(e&&We(e.uid),await Ze(),window.location.hash=`#/login`,window.location.reload())}),a&&a.addEventListener(`click`,async e=>{e.stopPropagation(),await M(`Log out all`,`Log out of ALL saved accounts on this browser?`)&&await Ge()});let o=document.getElementById(`unread-notif-badge`),s=null;e&&o&&(s=me(e.uid,e=>{let t=e.filter(e=>!e.read).length;t>0?(o.textContent=t,o.style.display=`inline-block`):o.style.display=`none`}));let c=document.getElementById(`unread-dm-badge`),l=null;e&&c&&(l=ft(e.uid,e=>{let t=e.reduce((e,t)=>e+(t.unreadCount||0),0);t>0?(c.textContent=t,c.style.display=`inline-block`):c.style.display=`none`}));let u=document.getElementById(`sidebar-open-composer`),d=document.getElementById(`mobile-fab-composer`),f=()=>{window.location.hash!==O.HOME&&(window.location.hash=O.HOME),setTimeout(()=>{let e=document.getElementById(`post-input`);e&&e.focus()},150)};u&&u.addEventListener(`click`,f),d&&d.addEventListener(`click`,f);let p=document.getElementById(`trending-hashtags-container`);p&&Te(5).then(e=>{if(!e||e.length===0){p.innerHTML=`
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">1 · Campus Trending</span>
            <div style="font-weight: 700; color: var(--accent-primary); cursor: pointer;" onclick="window.location.hash='#/search?q=%23SJCHackathon2026'">#SJCHackathon2026</div>
            <span style="color: var(--text-secondary); font-size: 12px;">142 posts</span>
          </div>
        `;return}let t=``;e.forEach((e,n)=>{t+=`
          <div style="cursor: pointer;" onclick="window.location.hash='#/search?q=%23${encodeURIComponent(e.tag)}'">
            <span style="color: var(--text-secondary); font-size: 12px;">${n+1} · Trending in Campus</span>
            <div style="font-weight: 700; color: var(--accent-primary);">#${I(e.tag)}</div>
            <span style="color: var(--text-secondary); font-size: 12px;">${e.count} post${e.count===1?``:`s`}</span>
          </div>
        `}),p.innerHTML=t}).catch(e=>console.error(e));let m=document.getElementById(`campus-updates-widget-container`),h=null;m&&(window.layoutAnnouncementsUnsub&&window.layoutAnnouncementsUnsub(),h=gt(2,e=>{if(!e||e.length===0){m.innerHTML=`<div style="color: var(--text-secondary); font-size: 13px;">No recent official updates.</div>`;return}let t=``;e.forEach((n,r)=>{let i=r===e.length-1,a=`var(--accent-primary)`;n.severity===`warning`&&(a=`#F59E0B`),n.severity===`alert`&&(a=`var(--error-color)`),t+=`
          <div style="padding-bottom: ${i?`0`:`8px`}; border-bottom: ${i?`none`:`1px solid var(--border-subtle)`}; cursor: pointer;" onclick="window.location.hash='${O.ANNOUNCEMENTS}'">
            <div style="color: var(--text-secondary); font-size: 11px; font-weight: 700; display: flex; justify-content: space-between;">
              <span style="color: ${a}; text-transform: uppercase;">${I(n.severity)}</span>
              <span class="time-ago" data-timestamp="${n.timestamp}">${V(n.timestamp)}</span>
            </div>
            <div style="font-weight: 600; margin-top: 2px; color: var(--text-primary); line-height: 1.3;">${I(n.title)}</div>
          </div>
        `}),m.innerHTML=t}),window.layoutAnnouncementsUnsub=h);let g=document.getElementById(`right-sidebar-search-input`),_=document.getElementById(`search-results-dropdown`);g&&_&&(g.addEventListener(`input`,async()=>{let e=g.value,t=e.trim().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3){_.style.display=`none`,_.innerHTML=``;return}_.style.display=`block`,_.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">Searching campus...</div>`;try{let n=await et(e);if(n.length===0){_.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">No student or staff found matching "${I(t)}".</div>`;return}let r=``;for(let e of n){let t=await tt(e.uid),n=e.name?e.name.charAt(0).toUpperCase():`?`,i=e.profilePicture?`<img src="${e.profilePicture}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />`:`<div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${n}</div>`;r+=`
            <div class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;" data-username="${I(e.username)}">
              <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                ${i}
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${I(e.name)}</span>
                  <span style="font-size: 12px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${I(e.username)} · Class ${I(e.class||`N/A`)}</span>
                </div>
              </div>

              <button class="btn ${t?`btn-outline`:``} friend-toggle-btn" data-uid="${e.uid}" style="font-size: 12px; padding: 4px 12px;">
                ${t?`Friends`:`+ Add Friend`}
              </button>
            </div>
          `}_.innerHTML=r,_.querySelectorAll(`.search-result-item`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.friend-toggle-btn`)){let t=e.dataset.username;_.style.display=`none`,window.location.hash=`#/profile?u=${t}`}})}),_.querySelectorAll(`.friend-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.uid;e.disabled=!0;try{let t=await rt(n);e.textContent=t?`Friends`:`+ Add Friend`,e.className=`btn ${t?`btn-outline`:``} friend-toggle-btn`}catch(e){console.error(e)}finally{e.disabled=!1}})})}catch(e){console.error(e),_.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--error-color); font-size: 13px;">Error searching campus.</div>`}}),document.addEventListener(`click`,e=>{e.target.closest(`.search-box`)||(_.style.display=`none`),document.body.classList.contains(`mobile-sidebar-active`)&&!e.target.closest(`.sidebar-container`)&&!e.target.closest(`#mobile-sidebar-toggle`)&&document.body.classList.remove(`mobile-sidebar-active`)}));let v=document.getElementById(`mobile-sidebar-toggle`);return v&&v.addEventListener(`click`,()=>{document.body.classList.toggle(`mobile-sidebar-active`)}),()=>{s&&s(),l&&l(),window.layoutAnnouncementsUnsub&&(window.layoutAnnouncementsUnsub(),window.layoutAnnouncementsUnsub=null)}}async function St(e,t,n=!1){if(!e||e.trim().length===0)throw Error(`Poll must have a question.`);if(!t||t.length<2)throw Error(`Poll must have at least 2 options.`);let r=y.currentUser;if(!r)throw Error(`Not authenticated`);if(!e||e.trim()===``)throw Error(`Poll question is required.`);if(!t||!Array.isArray(t)||t.length<2)throw Error(`At least 2 poll options are required.`);let i=w(C(m,T.POLLS)),a=t.map((e,t)=>({id:t,text:e,votes:0})),o={pollId:i.key,creatorId:r.uid,question:e,options:a,totalVotes:0,likes:0,reshares:0,replyCount:0,isAnonymous:n,timestamp:new Date().toISOString()};await S(i,o);let{getUserProfile:s}=await U(async()=>{let{getUserProfile:e}=await Promise.resolve().then(()=>be);return{getUserProfile:e}},void 0,import.meta.url),{notifyMentionedUsers:c}=await U(async()=>{let{notifyMentionedUsers:e}=await Promise.resolve().then(()=>ve);return{notifyMentionedUsers:e}},void 0,import.meta.url),l=await s(r.uid);return await c({text:e,senderId:r.uid,senderName:l?.name,isAnonymous:n,notifSuffix:`in a poll.`,pollId:o.pollId}),o}async function Ct(e,t){if(!t||!e)return null;let n=await p(C(m,`${T.POLL_VOTES}/${e}/${t}`));return n.exists()?n.val():null}async function wt(t,n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`${T.POLL_VOTES}/${t}/${r.uid}`);if((await p(i)).exists())throw Error(`You have already voted in this poll.`);await S(i,n),await e(C(m,`${T.POLLS}/${t}`),e=>(e&&(e.options&&e.options[n]&&(e.options[n].votes=(e.options[n].votes||0)+1),e.totalVotes=(e.totalVotes||0)+1),e))}function Tt(e=20,t){let n=a(C(m,T.POLLS),x(`timestamp`),u(e)),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching polls:`,e)});return()=>l(n,`value`,i)}async function Et(n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`${T.POLL_LIKES}/${n}/${r.uid}`),a=await p(i),o=!1;a.exists()?(await t(i),o=!1):(await S(i,!0),o=!0);let s=C(m,`${T.POLLS}/${n}`),c=0;return await e(s,e=>(e&&(e.likes=o?(e.likes||0)+1:Math.max(0,(e.likes||0)-1),c=e.likes),e)),{liked:o,likes:c}}async function Dt(e,t){return!t||!e?!1:(await p(C(m,`${T.POLL_LIKES}/${e}/${t}`))).exists()}async function Ot(n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`${T.POLL_RESHARES}/${n}/${r.uid}`),a=await p(i),o=!1;a.exists()?(await t(i),o=!1):(await S(i,new Date().toISOString()),o=!0);let s=C(m,`${T.POLLS}/${n}`),c=0;return await e(s,e=>(e&&(e.reshares=o?(e.reshares||0)+1:Math.max(0,(e.reshares||0)-1),c=e.reshares),e)),{reshared:o,reshares:c}}async function kt(e,t){return!t||!e?!1:(await p(C(m,`${T.POLL_RESHARES}/${e}/${t}`))).exists()}async function At(t,n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=n?n.trim():``;if(!i)throw Error(`Reply cannot be empty.`);let a=w(C(m,`${T.POLL_REPLIES}/${t}`)),o={replyId:a.key,parentPoll:t,authorId:r.uid,content:i,timestamp:new Date().toISOString(),likes:0};await S(a,o);let s=C(m,`${T.POLLS}/${t}`),c=null,l=!1;if(await e(s,e=>(e&&(e.replyCount=(e.replyCount||0)+1,c=e.creatorId,l=e.isAnonymous),e)),c&&c!==r.uid){let{sendNotification:e}=await U(async()=>{let{sendNotification:e}=await Promise.resolve().then(()=>fe);return{sendNotification:e}},void 0,import.meta.url),{getUserProfile:n}=await U(async()=>{let{getUserProfile:e}=await Promise.resolve().then(()=>be);return{getUserProfile:e}},void 0,import.meta.url),i=`Someone`;l||(i=(await n(r.uid))?.name||`A student`),await e(c,{text:`${i} replied to your poll.`,type:`SYSTEM`,postId:t,senderId:r.uid})}return o}function jt(e,t){let n=C(m,`${T.POLL_REPLIES}/${e}`),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)});return()=>l(n,`value`,i)}async function Mt(e){let n=y.currentUser;if(!n)throw Error(`Not authenticated`);let r=await p(C(m,`${T.POLLS}/${e}`));if(!r.exists())throw Error(`Poll not found`);if(r.val().creatorId!==n.uid)throw Error(`Unauthorized: You can only delete your own polls.`);return await t(C(m,`${T.POLLS}/${e}`)),await t(C(m,`${T.POLL_VOTES}/${e}`)),await t(C(m,`${T.POLL_LIKES}/${e}`)),await t(C(m,`${T.POLL_RESHARES}/${e}`)),await t(C(m,`${T.POLL_REPLIES}/${e}`)),!0}async function Nt(e){let n=y.currentUser?.uid;if(!n)throw Error(`Not authenticated`);let r=await p(C(m,`${T.USERS}/${n}`)),i=r.exists()?r.val():null;if(!i||i.role!==`staff`&&i.role!==`admin`)throw Error(`Unauthorized: Staff power required to put down polls.`);return await t(C(m,`${T.POLLS}/${e}`)),await t(C(m,`${T.POLL_VOTES}/${e}`)),await t(C(m,`${T.POLL_LIKES}/${e}`)),await t(C(m,`${T.POLL_RESHARES}/${e}`)),await t(C(m,`${T.POLL_REPLIES}/${e}`)),!0}async function Pt(e){if(!e)return null;try{let t=await p(C(m,`${T.POLLS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching poll by ID:`,e)}return null}function Ft(e,t){return r(C(m,`${T.POLLS}/${e}`),e=>{e.exists()?t(e.val()):t(null)},e=>{console.error(`Error fetching poll:`,e),t(null)})}async function It(){try{let e=await p(C(m,T.USERS)),t=await p(C(m,T.POSTS)),n=await p(C(m,T.REPLIES)),r=await p(C(m,T.POST_LIKES)),i=await p(C(m,T.PETITIONS)),a=await p(C(m,T.POLLS)),o=e.exists()?Object.keys(e.val()).length:0,s=t.exists()?Object.keys(t.val()).length:0,c=0;if(n.exists()){let e=n.val();Object.values(e).forEach(e=>{c+=Object.keys(e).length})}let l=0;if(r.exists()){let e=r.val();Object.values(e).forEach(e=>{l+=Object.keys(e).length})}let u=i.exists()?Object.keys(i.val()).length:0,d=a.exists()?Object.keys(a.val()).length:0;return{totalUsers:o,totalPosts:s,totalReplies:c,totalLikes:l,totalPetitions:u,totalPolls:d}}catch(e){return console.error(`Error getting analytics stats:`,e),{totalUsers:0,totalPosts:0,totalReplies:0,totalLikes:0,totalPetitions:0,totalPolls:0}}}async function Lt(){try{let e=await p(C(m,T.USERS));if(e.exists()){let t=e.val(),n=Object.values(t);return n.sort((e,t)=>new Date(t.joinedDate||0)-new Date(e.joinedDate||0)),n}}catch(e){console.error(`Error getting users roster:`,e)}return[]}async function Rt(e,t){let r=y.currentUser?.uid;if(!r)throw Error(`Not authenticated`);let i=await p(C(m,`${T.USERS}/${r}`)),a=i.exists()?i.val():null;if(!a||a.role!==P.ADMIN)throw Error(`Unauthorized: Only Master Admin can appoint or demote staff.`);return await n(C(m,`${T.USERS}/${e}`),{role:t}),z(e),!0}async function zt(e){if(!y.currentUser?.uid)throw Error(`Not authenticated`);let t=await p(C(m,`${T.USERS}/${e}`));if(!t.exists())throw Error(`User not found`);let r=!t.val().isSuspended;return await n(C(m,`${T.USERS}/${e}`),{isSuspended:r}),z(e),r}async function Bt(e){let n=y.currentUser?.uid;if(!n)throw Error(`Not authenticated`);let r=await p(C(m,`${T.USERS}/${n}`)),i=r.exists()?r.val():null;if(!i||i.role!==P.STAFF&&i.role!==P.ADMIN)throw Error(`Unauthorized: Staff power required to put down posts.`);return await t(C(m,`${T.POSTS}/${e}`)),await t(C(m,`${T.REPLIES}/${e}`)),await t(C(m,`${T.POST_LIKES}/${e}`)),await t(C(m,`${T.POST_RESHARES}/${e}`)),!0}async function Vt(e){let n=y.currentUser?.uid;if(!n)throw Error(`Not authenticated`);let r=await p(C(m,`${T.USERS}/${n}`)),i=r.exists()?r.val():null;if(!i||i.role!==P.STAFF&&i.role!==P.ADMIN)throw Error(`Unauthorized: Staff power required to put down petitions.`);return await t(C(m,`${T.PETITIONS}/${e}`)),await t(C(m,`${T.PETITION_VOTES}/${e}`)),!0}async function Ht(t,n=`Inappropriate content`){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`postReports/${t}/${r.uid}`);if((await p(i)).exists())throw Error(`You have already reported this post.`);await S(i,{uid:r.uid,reason:n,timestamp:new Date().toISOString()});let a=C(m,`${T.POSTS}/${t}`),o=0,s=null;return await e(a,e=>(e&&(e.reportCount=(e.reportCount||0)+1,o=e.reportCount,s=e.authorId,o>=2&&(e.status=`AWAITING_MODERATION`)),e)),o>=2&&s&&await pe(s,{text:`⚠️ Your post has received 2 community reports and is currently held for review awaiting validation from a Staff member or Admin.`,type:`MODERATION`,postId:t}),{reported:!0,reportCount:o,autoTakenDown:o>=2}}async function Ut(){let e=y.currentUser?.uid;if(!e)throw Error(`Not authenticated`);let t=await p(C(m,`${T.USERS}/${e}`)),n=t.exists()?t.val():null;if(!n||n.role!==P.STAFF&&n.role!==P.ADMIN)throw Error(`Unauthorized: Staff power required to view reported posts.`);try{let e=await p(C(m,T.POSTS));if(!e.exists())return[];let t=[];return e.forEach(e=>{let n=e.val();(n.status===`AWAITING_MODERATION`||n.reportCount&&n.reportCount>0)&&t.push(n)}),t.sort((e,t)=>(t.reportCount||0)-(e.reportCount||0)),t}catch(e){return console.error(`Error fetching reported posts queue:`,e),[]}}async function Wt(e){let r=y.currentUser?.uid;if(!r)throw Error(`Not authenticated`);let i=await p(C(m,`${T.USERS}/${r}`)),a=i.exists()?i.val():null;if(!a||a.role!==P.STAFF&&a.role!==P.ADMIN)throw Error(`Unauthorized: Staff power required to approve posts.`);let o=C(m,`${T.POSTS}/${e}`),s=await p(o);if(!s.exists())throw Error(`Post not found`);let c=s.val();return await n(o,{status:`ACTIVE`,reportCount:0}),await t(C(m,`postReports/${e}`)),c.authorId&&await pe(c.authorId,{text:`✓ Your post has been reviewed and approved by Staff. It is now active on Backbench.`,type:`MODERATION`,postId:e}),!0}function Gt(){return`
    <div class="post-card fade-in" style="cursor: default;">
      <div class="skeleton" style="width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;"></div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
          <div class="skeleton" style="width: 120px; height: 16px;"></div>
          <div class="skeleton" style="width: 80px; height: 14px;"></div>
        </div>
        <div class="skeleton" style="width: 90%; height: 14px; margin-bottom: 8px;"></div>
        <div class="skeleton" style="width: 60%; height: 14px; margin-bottom: 16px;"></div>
        <div style="display: flex; gap: 40px;">
          <div class="skeleton" style="width: 40px; height: 16px;"></div>
          <div class="skeleton" style="width: 40px; height: 16px;"></div>
        </div>
      </div>
    </div>
  `}function q(e=4){let t=``;for(let n=0;n<e;n++)t+=Gt();return t}var Kt=[{id:`default`,name:`Inter Modern`,fontFamily:`'Inter', sans-serif`},{id:`handwritten`,name:`Handwritten Script`,fontFamily:`'Caveat', cursive, sans-serif`},{id:`monospace`,name:`Cyber Monospace`,fontFamily:`'Fira Code', monospace`},{id:`serif`,name:`Classic Serif`,fontFamily:`'Playfair Display', serif`},{id:`futuristic`,name:`Futuristic Outfit`,fontFamily:`'Outfit', sans-serif`}];function J(e){let t=`default`;typeof e==`string`?t=e:e&&e.fontId?t=e.fontId:e&&e.fontThemeId&&(t=e.fontThemeId);let n=Kt.find(e=>e.id===t);return n?n.fontFamily:Kt[0].fontFamily}function qt(e,t,n=!1,r=!1,i=!1){let a=e.isAnonymous===!0,o=a?`Anonymous Student`:t?.name?I(t.name):`Anonymous Student`,s=a?`anonymous`:t?.username?I(t.username):`student`,c=!a&&(t?.isTeacher||t?.role===`teacher`),l=!a&&(t?.verifiedStudent||t?.role===`staff`||t?.role===`admin`||c),u=J(t),d=a?`<div class="avatar" style="width: 44px; height: 44px; font-size: 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:H(t,44,`border: 1px solid var(--border-color);`),f=a?`<div style="display: inline-flex;" title="Anonymous Post">${d}</div>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${s}'s profile">${d}</a>`,p=a?`<span class="author-name" style="font-family: ${u};">${o}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-name" style="font-family: ${u};">${o}</span></a>`,m=a?`<span class="author-handle">@${s}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-handle">@${s}</span></a>`;return`
    <article class="post-card fade-in" data-post-id="${e.postId}" data-author-id="${e.authorId}">
      ${f}
      <div style="flex: 1; min-width: 0;">
        <div class="post-header">
          <div class="author-meta">
            ${p}
            ${c?`
              <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
              </span>
            `:l?`
              <span class="material-symbols-outlined verified-icon" title="Verified Member">verified</span>
            `:``}
            ${m}
            <span class="post-dot">·</span>
            <span class="post-time time-ago" data-timestamp="${e.timestamp}">${V(e.timestamp)}</span>
            ${e.edited?`<span class="edited-badge" style="font-size: 11px; color: var(--text-secondary); margin-left: 4px; font-style: italic;">(edited)</span>`:``}
          </div>
          <button class="btn-ghost post-options-btn" style="padding: 4px;" title="Options" data-post-id="${e.postId}" data-author-id="${e.authorId}">
            <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
          </button>
        </div>
        
        <div class="post-body" style="font-family: ${u}; font-size: 15px; line-height: 1.5; color: var(--text-primary);">
          ${L(e.content)}
        </div>
        
        <div class="post-actions">
          <button class="action-btn reply-btn">
            <span class="material-symbols-outlined">chat_bubble</span>
            <span>${e.replyCount||0}</span>
          </button>
          
          <button class="action-btn reshare-btn ${r?`reshared`:``}" data-post-id="${e.postId}" style="${r?`color: #00BA7C;`:``}">
            <span class="material-symbols-outlined">repeat</span>
            <span class="reshare-count">${e.reshares||0}</span>
          </button>

          <button class="action-btn like-btn ${n?`liked heart-pop`:``}" data-post-id="${e.postId}">
            <span class="material-symbols-outlined">favorite</span>
            <span class="like-count">${e.likes||0}</span>
          </button>

          <button class="action-btn save-btn ${i?`saved`:``}" data-post-id="${e.postId}" style="${i?`color: var(--accent-primary);`:``}">
            <span class="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </article>
  `}function Jt(e,t,n,r,i=!0){let a=e.isAnonymous===!0,o=a?`Anonymous Student`:t?.name?I(t.name):`Anonymous Student`,s=a?`anonymous`:t?.username?I(t.username):`student`,c=a?`<div class="avatar" style="width: 36px; height: 36px; font-size: 16px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:H(t,36,`border: 1px solid var(--border-color);`),l=a?`Anonymous Replier`:r?.name?I(r.name):`Anonymous Student`,u=a?`anonymous_reply`:r?.username?I(r.username):`student`,d=a?`<div class="avatar" style="width: 36px; height: 36px; font-size: 14px; background: linear-gradient(135deg, #a855f7, #ec4899); font-weight: 800;">AR</div>`:H(r,36,`border: 1px solid var(--border-color);`),f=a?`'Inter', sans-serif`:J(r);return`
    <div class="saved-reply-container fade-in" style="border-bottom: 1px solid var(--border-color); cursor: pointer;" onclick="window.location.hash = '#/post?id=${e.postId}'">
      <!-- Mini Post Context -->
      <div style="padding: 12px 16px 0 16px; display: flex; gap: 12px;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          ${c}
          <div style="width: 2px; height: 100%; background: var(--border-color); margin-top: 4px; min-height: 20px;"></div>
        </div>
        <div style="flex: 1; padding-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">${o}</span>
            <span style="font-size: 13px; color: var(--text-secondary);">@${s}</span>
            <span style="color: var(--text-secondary); font-size: 13px;">· <span class="time-ago" data-timestamp="${e.timestamp}">${V(e.timestamp)}</span></span>
          </div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-top: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${I(e.content).replace(/<[^>]+>/g,``)}
          </div>
        </div>
      </div>
      
      <!-- Reply Content -->
      <div style="padding: 0 16px 16px 16px; display: flex; gap: 12px;">
        <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
          ${d}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-weight: 700; font-size: 14px; color: var(--text-primary); font-family: ${f};">${l}</span>
              <span style="font-size: 13px; color: var(--text-secondary);">@${u}</span>
              <span style="color: var(--text-secondary); font-size: 13px;">· <span class="time-ago" data-timestamp="${n.timestamp}">${V(n.timestamp)}</span></span>
            </div>
            <button class="action-btn save-btn saved" style="color: var(--accent-primary); pointer-events: none;">
              <span class="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div style="font-family: ${f}; font-size: 14px; line-height: 1.5; color: var(--text-primary); margin-top: 4px;">
            ${L(n.content)}
          </div>
        </div>
      </div>
    </div>
  `}function Yt(e,t,n=null,r=!1,i=!1){let a=e.isAnonymous===!0,o=a?`Anonymous Student`:t?.name?I(t.name):`Anonymous Student`,s=a?`anonymous`:t?.username?I(t.username):`student`,c=e.totalVotes||0,l=n!==null,u=J(t),d=a?`<div class="avatar" style="width: 44px; height: 44px; font-size: 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:H(t,44,`border: 1px solid var(--border-color);`),f=a?`<div style="display: inline-flex;" title="Anonymous Poll">${d}</div>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${s}'s profile">${d}</a>`,p=a?`<span class="author-name" style="font-family: ${u};">${o}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-name" style="font-family: ${u};">${o}</span></a>`,m=a?`<span class="author-handle">@${s}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-handle">@${s}</span></a>`,h=``;return h=l?`
      <div class="poll-results-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
        ${e.options.map((e,t)=>{let r=e.votes||0,i=c>0?Math.round(r/c*100):0,a=n===t;return`
            <div class="poll-result-bar-wrapper ${a?`user-selected`:``}">
              <div class="poll-result-fill" style="width: ${i}%;"></div>
              <div class="poll-result-label" style="font-family: ${u};">
                <span style="display: flex; align-items: center; gap: 6px; font-weight: ${a?`700`:`500`};">
                  ${I(e.text)}
                  ${a?`<span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">check_circle</span>`:``}
                </span>
                <span style="font-weight: 700; color: ${a?`var(--text-primary)`:`var(--text-secondary)`}; flex-shrink: 0;">
                  ${i}% <span style="font-size: 12px; font-weight: 500; opacity: 0.85;">(${r} vote${r===1?``:`s`})</span>
                </span>
              </div>
            </div>
          `}).join(``)}
      </div>
    `:`
      <div class="poll-options-container" style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
        ${e.options.map((t,n)=>`
          <button class="poll-option-btn" data-poll-id="${e.pollId}" data-option-index="${n}" style="font-family: ${u};">
            <span>${I(t.text)}</span>
          </button>
        `).join(``)}
      </div>
    `,`
    <article class="card fade-in poll-card" data-poll-id="${e.pollId}" data-creator-id="${e.creatorId}" style="margin-bottom: 16px; border-radius: var(--border-radius);">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        ${f}
        <div style="flex: 1; min-width: 0;">
          <div class="post-header">
            <div class="author-meta">
              ${p}
              ${m}
              <span class="post-dot">·</span>
              <span class="post-time time-ago" data-timestamp="${e.timestamp}">${V(e.timestamp)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="brand-badge" style="font-size: 11px;">CAMPUS POLL</span>
              <button class="btn-ghost poll-options-btn" style="padding: 4px;" title="Options" data-poll-id="${e.pollId}" data-creator-id="${e.creatorId}">
                <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
              </button>
            </div>
          </div>

          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 6px; line-height: 1.4; font-family: ${u};">
            ${L(e.question)}
          </div>

          ${h}

          <div style="margin-top: 10px; font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 12px;">
            <span>${c} total vote${c===1?``:`s`}</span>
            <span>·</span>
            <span>${l?`Final results`:`Active poll`}</span>
          </div>

          <!-- Action Buttons (Reply, Reshare, Like, Bookmark) -->
          <div class="post-actions">
            <button class="action-btn poll-reply-btn" data-poll-id="${e.pollId}">
              <span class="material-symbols-outlined">chat_bubble</span>
              <span>${e.replyCount||0}</span>
            </button>

            <button class="action-btn poll-reshare-btn ${i?`reshared`:``}" data-poll-id="${e.pollId}" style="${i?`color: #00BA7C;`:``}">
              <span class="material-symbols-outlined">repeat</span>
              <span class="poll-reshare-count">${e.reshares||0}</span>
            </button>

            <button class="action-btn poll-like-btn ${r?`liked heart-pop`:``}" data-poll-id="${e.pollId}">
              <span class="material-symbols-outlined">favorite</span>
              <span class="poll-like-count">${e.likes||0}</span>
            </button>

            <button class="action-btn">
              <span class="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `}function Xt(e,t,n){let r=e.isAnonymous===!0,i=r?`<div class="avatar" style="width: 40px; height: 40px; font-size: 18px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:H(t,40),a=r?`Anonymous Student`:t?.name?I(t.name):`Student Representative`,o=e.signatureCount||0,s=e.goalSignatures||100,c=Math.min(100,Math.round(o/s*100)),l=o>=s,u=r?`anonymous`:t?.username?I(t.username):`student`;return`
    <article class="card fade-in petition-card" data-petition-id="${e.petitionId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer;" onclick="if(!event.target.closest('a, button')) window.location.hash='#/petition?id=${e.petitionId}'">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        ${r?`<div style="display: inline-flex;">${i}</div>`:`<a href="#/profile?u=${u}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${u}'s profile">
          ${i}
        </a>`}
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="brand-badge" style="font-size: 11px;">${I(e.category)}</span>
              <span class="brand-badge" style="font-size: 11px; background: ${l?`rgba(0, 186, 124, 0.2)`:`rgba(29, 155, 240, 0.15)`}; color: ${l?`#00BA7C`:`var(--accent-primary)`}; border-color: ${l?`#00BA7C`:`var(--accent-primary)`};">
                ${l?`🎉 GOAL REACHED`:`ACTIVE`}
              </span>
            </div>
            <button class="btn-ghost petition-options-btn" style="padding: 4px;" title="Options" data-petition-id="${e.petitionId}" data-author-id="${e.creatorId}">
              <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
            </button>
          </div>

          <h2 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; line-height: 1.35;">
            ${L(e.title)}
          </h2>

          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${L(e.statement)}
          </p>

          <!-- Progress Bar -->
          <div style="background: var(--bg-primary); border-radius: 12px; padding: 10px 12px; border: 1px solid var(--border-color); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
              <span><strong style="color: var(--accent-primary); font-size: 15px;">${o}</strong> / ${s} signatures</span>
              <span style="font-weight: 700; color: var(--text-primary);">${c}%</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${c}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C); transition: width 0.4s ease;"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            ${r?`<span style="font-size: 12px; color: var(--text-secondary);">By <strong>Anonymous Student</strong></span>`:`<a href="#/profile?u=${u}" style="text-decoration: none; color: inherit;" title="View @${u}'s profile">
              <span style="font-size: 12px; color: var(--text-secondary);">By <strong>${a}</strong> (@${u})</span>
            </a>`}
            
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline copy-petition-frame-btn" data-petition-id="${e.petitionId}" style="font-size: 12px; padding: 6px 10px; display: flex; align-items: center; gap: 4px;" title="Copy shareable petition paper frame link">
                <span class="material-symbols-outlined" style="font-size: 14px;">filter_frames</span> Frame Link
              </button>
              <a href="#/petition-frame?id=${e.petitionId}" class="btn btn-outline view-imprint-btn" style="font-size: 12px; padding: 6px 10px;">
                📜 Paper Mode
              </a>
              <button class="btn sign-petition-feed-btn" data-petition-id="${e.petitionId}" style="font-size: 12px; padding: 6px 14px;" ${n?`disabled`:``}>
                ${n?`✓ Signed`:`✍️ Sign`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}var Zt=null;function Y(){Zt&&=(Zt.remove(),null)}document.addEventListener(`click`,Y);function X(e,t){Y();let{itemId:n,authorId:r,currentUid:i,isStaff:a=!1,itemType:o=`post`,onDelete:s,onReport:c,onEdit:l}=t,u=i===r,d=o===`poll`?`poll`:`post`,f=document.createElement(`div`);f.className=`ctx-menu fade-in`,f.setAttribute(`role`,`menu`);let p=[];u&&l&&p.push({icon:`edit`,label:`Edit ${d}`,className:`ctx-menu-item`,action:async()=>{Y(),l&&await l(n)}}),u&&p.push({icon:`delete`,label:`Delete ${d}`,className:`ctx-menu-item danger`,action:async()=>{Y(),await M(`Delete ${d}`,`Are you sure you want to permanently delete this ${d}? This action cannot be undone.`)&&s&&await s(n)}}),a&&!u&&p.push({icon:`shield`,label:`Take down ${d} (Staff)`,className:`ctx-menu-item danger`,action:async()=>{Y(),await M(`Take down ${d}`,`🛡️ Staff Moderation Action:\nDo you want to take down this ${d} from Backbench?`)&&s&&await s(n)}}),u||p.push({icon:`flag`,label:`Report ${d}`,className:`ctx-menu-item`,action:async()=>{Y();let e=await N(`Report ${d}`,`Inappropriate content`,`Please state your reason:`);e&&e.trim()&&c&&c(n,e.trim())}}),p.push({icon:`link`,label:`Copy link`,className:`ctx-menu-item`,action:()=>{Y();let e=window.location.origin+window.location.pathname,t=o===`poll`?`${e}#/poll?id=${n}`:`${e}#/post?id=${n}`;navigator.clipboard.writeText(t).then(()=>{Qt(`Link copied to clipboard!`)}).catch(async()=>{await N(`Copy this link:`,t,`Link`)})}}),f.innerHTML=p.map(e=>`
    <button class="${e.className}" role="menuitem">
      <span class="material-symbols-outlined" style="font-size: 18px;">${e.icon}</span>
      <span>${e.label}</span>
    </button>
  `).join(``),document.body.appendChild(f),Zt=f;let m=e.getBoundingClientRect(),h=f.getBoundingClientRect(),g=m.bottom+4,_=m.right-h.width;g+h.height>window.innerHeight&&(g=m.top-h.height-4),_<8&&(_=8),f.style.top=`${g}px`,f.style.left=`${_}px`,f.querySelectorAll(`.ctx-menu-item`).forEach((e,t)=>{e.addEventListener(`click`,e=>{e.stopPropagation(),p[t].action()})}),f.addEventListener(`click`,e=>e.stopPropagation())}function Qt(e){let t=document.querySelector(`.ctx-toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`ctx-toast fade-in`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(10px)`,setTimeout(()=>n.remove(),300)},2200)}async function $t(e){let t=y.currentUser;if(!t)throw Error(`Not authenticated`);let{title:n,statement:r,category:i,targetRecipient:a,goalSignatures:o,isAnonymous:s}=e;if(!n||n.trim().length===0)throw Error(`Petition title is required.`);if(!r||r.trim().length===0)throw Error(`Formal petition statement is required.`);let c=w(C(m,T.PETITIONS)),l={petitionId:c.key,creatorId:t.uid,title:n.trim(),statement:r.trim(),category:i||`Student Welfare`,targetRecipient:a?.trim()||`St. Joseph's College Administration`,goalSignatures:parseInt(o)||100,signatureCount:0,isAnonymous:s||!1,timestamp:new Date().toISOString(),status:`ACTIVE`};await S(c,l);let u=await R(t.uid);return await ye({text:`${l.title} ${l.statement}`,senderId:t.uid,senderName:u?.name,isAnonymous:l.isAnonymous,notifSuffix:`in a petition.`,petitionId:l.petitionId}),l}function en(e=20,t){let n=a(C(m,T.PETITIONS),x(`timestamp`),u(e)),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching petitions:`,e)});return()=>l(n,`value`,i)}async function tn(e){if(!e)return null;try{let t=await p(C(m,`${T.PETITIONS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching petition:`,e)}return null}async function nn(e,t){if(!t||!e)return!1;try{return(await p(C(m,`${T.PETITION_VOTES}/${e}/${t}`))).exists()}catch{return!1}}async function rn(t){let n=y.currentUser;if(!n)throw Error(`Not authenticated`);let r=C(m,`${T.PETITION_VOTES}/${t}/${n.uid}`);if((await p(r)).exists())throw Error(`You have already signed this petition.`);let i=await R(n.uid);await S(r,{uid:n.uid,name:i?.name||n.displayName||`Student`,username:i?.username||`student`,class:i?.class||`N/A`,admissionNumber:i?.admissionNumber||`N/A`,timestamp:new Date().toISOString()});let a=C(m,`${T.PETITIONS}/${t}`),o=0;return await e(a,e=>(e&&(e.signatureCount=(e.signatureCount||0)+1,e.signatureCount>=(e.goalSignatures||100)&&(e.status=`GOAL ACHIEVED`),o=e.signatureCount),e)),{signed:!0,signatureCount:o}}async function an(e){if(!e)return[];try{let t=await p(C(m,`${T.PETITION_VOTES}/${e}`));if(t.exists()){let e=t.val(),n=Object.values(e);return n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),n}}catch(e){console.error(`Error fetching petition signatories:`,e)}return[]}async function on(e){let t=y.currentUser;if(!t)throw Error(`Not authenticated`);let n=C(m,`${T.PETITIONS}/${e}`),r=await p(n);if(r.exists()){if(r.val().creatorId!==t.uid)throw Error(`Unauthorized: You can only delete your own petitions.`);await S(n,null),await S(C(m,`${T.PETITION_VOTES}/${e}`),null)}}function sn(e,t){return r(C(m,`${T.PETITIONS}/${e}`),e=>{e.exists()?t(e.val()):t(null)},e=>{console.error(`Error fetching petition:`,e),t(null)})}var cn=`866731831028-tqf1ihg7qong6pg0etnh0bhbtr2bkp9c.apps.googleusercontent.com`,ln=`https://www.googleapis.com/auth/drive.file`,un=null,dn=null,fn=new Map,pn=2*1024*1024;function mn(e){return e.replace(/\./g,`,`).replace(/@/g,`_at_`)}function hn(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function gn(){return window.google?.accounts?.oauth2?Promise.resolve():dn||(dn=new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`https://accounts.google.com/gsi/client`,n.async=!0,n.defer=!0,n.onload=()=>e(),n.onerror=()=>t(Error(`Failed to load Google Identity Services.`)),document.head.appendChild(n)}),dn)}function _n(){return un||(un=window.google.accounts.oauth2.initTokenClient({client_id:cn,scope:ln,callback:()=>{}}),un)}function vn({promptMode:e,hint:t}={}){return new Promise((n,r)=>{let i=_n(),a={prompt:e};t&&(a.hint=t),a.callback=e=>{if(e.error){r(Error(e.error));return}n({accessToken:e.access_token,expiresAt:Date.now()+e.expires_in*1e3-6e4})},i.requestAccessToken(a)})}async function yn(e){let t=await fetch(`https://www.googleapis.com/drive/v3/about?fields=user,storageQuota`,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw Error(`Failed to read Google Drive account info.`);return t.json()}async function bn(){await gn();let{accessToken:e,expiresAt:t}=await vn({promptMode:`select_account consent`}),r=(await yn(e)).user?.emailAddress;if(!r)throw Error(`Could not determine the connected Google account.`);fn.set(r,{accessToken:e,expiresAt:t});let i=y.currentUser?.uid;if(i){let e=mn(r);await n(C(m,`users/${i}/connectedDrives`),{[e]:{email:r,addedAt:new Date().toISOString()}})}return r}async function xn(e,t){let r=fn.get(t);if(r&&window.google?.accounts?.oauth2&&window.google.accounts.oauth2.revoke(r.accessToken,()=>{}),fn.delete(t),e){let r=mn(t);await n(C(m,`users/${e}/connectedDrives`),{[r]:null})}}async function Sn(e){if(!e)return[];let t=await p(C(m,`users/${e}/connectedDrives`));return t.exists()?Object.entries(t.val()).map(([e,t])=>({driveId:e,...t})):[]}async function Cn(e){let t=fn.get(e);if(t&&Date.now()<t.expiresAt)return t.accessToken;await gn();let{accessToken:n,expiresAt:r}=await vn({promptMode:``,hint:e});return fn.set(e,{accessToken:n,expiresAt:r}),n}async function wn(e,t){let n={name:e.name},r=new FormData;r.append(`metadata`,new Blob([JSON.stringify(n)],{type:`application/json`})),r.append(`file`,e);let i=await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,size,mimeType`,{method:`POST`,headers:{Authorization:`Bearer ${t}`},body:r});if(!i.ok)throw Error(`Failed to upload image to Google Drive.`);let a=await i.json();if(!(await fetch(`https://www.googleapis.com/drive/v3/files/${a.id}/permissions`,{method:`POST`,headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`},body:JSON.stringify({role:`reader`,type:`anyone`})})).ok)throw Error(`Uploaded, but failed to make the image link-accessible.`);return{fileId:a.id,name:a.name||e.name,size:Number(a.size)||e.size,mimeType:a.mimeType||e.type}}async function Tn(e,t){if(!e||!e.type.startsWith(`image/`))throw Error(`Please select a valid image file.`);if(e.size>10*1024*1024)throw Error(`Image is too large (max 10MB).`);if(!t)throw Error(`Not authenticated`);let n=await Sn(t);if(n.length===0){let e=Error(`Connect a Google Drive account in Settings before attaching images.`);throw e.code=`NO_DRIVE_CONNECTED`,e}let r=e.size+pn;for(let t of n)try{let n=await Cn(t.email),i=(await yn(n)).storageQuota||{};if(!(!i.limit||Number(i.limit)-Number(i.usage||0)>=r))continue;return await wn(e,n)}catch{continue}let i=Error(`All connected Google Drives are full or unavailable. Connect another Google Drive account in Settings.`);throw i.code=`ALL_DRIVES_FULL`,i}var En=3,Dn=10,On=250;function kn(e,t){let n=e.slice(0,t),r=n.lastIndexOf(`@`);if(r===-1)return null;let i=n.slice(r+1,t);return/\s/.test(i)||!/^[a-zA-Z0-9_.]*$/.test(i)?null:{startIndex:r,partial:i}}function An(e){if(!e)return;let t=null,n=[],r=-1,i=null,a=null,o=0;function s(){t&&=(t.remove(),null),n=[],r=-1,i=null}function c(){let n=e.getBoundingClientRect();t.style.position=`fixed`,t.style.left=`${n.left}px`,t.style.top=`${n.bottom+4}px`,t.style.width=`${Math.max(n.width,260)}px`}function l(){if(t||(t=document.createElement(`div`),t.className=`mention-autocomplete fade-in`,document.body.appendChild(t)),c(),n.length===0){t.innerHTML=`<div class="mention-autocomplete-empty">No students found</div>`;return}t.innerHTML=n.map((e,t)=>`
      <div class="mention-autocomplete-item ${t===r?`active`:``}" data-index="${t}">
        ${H(e,28)}
        <div class="mention-autocomplete-info">
          <span class="mention-autocomplete-name">${I(e.name||`Student`)}</span>
          <span class="mention-autocomplete-username">@${I(e.username||`student`)}</span>
        </div>
      </div>
    `).join(``),t.querySelectorAll(`.mention-autocomplete-item`).forEach(e=>{e.addEventListener(`mousedown`,t=>{t.preventDefault(),u(Number(e.dataset.index))})})}function u(t){let r=n[t];if(!r||!i)return;let a=e.value.slice(0,i.startIndex),o=e.value.slice(i.startIndex+1+i.partial.length),c=`@${r.username} `;e.value=a+c+o;let l=a.length+c.length;e.focus(),e.setSelectionRange(l,l),e.dispatchEvent(new Event(`input`,{bubbles:!0})),s()}async function d(e){let t=++o,i=await et(e);t===o&&(n=i.slice(0,Dn),r=n.length>0?0:-1,l())}e.addEventListener(`input`,()=>{let t=kn(e.value,e.selectionStart);if(!t||t.partial.length<En){s();return}i=t,clearTimeout(a),a=setTimeout(()=>d(t.partial),On)}),e.addEventListener(`keydown`,e=>{!t||n.length===0||(e.key===`ArrowDown`?(e.preventDefault(),r=(r+1)%n.length,l()):e.key===`ArrowUp`?(e.preventDefault(),r=(r-1+n.length)%n.length,l()):e.key===`Enter`||e.key===`Tab`?r>=0&&(e.preventDefault(),u(r)):e.key===`Escape`&&s())}),e.addEventListener(`blur`,()=>{setTimeout(s,150)})}var Z=null,jn=null,Mn=null;function Nn(e){if(!e)return;let t=e.closest(`.feed-item-wrapper`)||e;t.style.transition=`opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s`,t.style.overflow=`hidden`,t.style.maxHeight=t.offsetHeight+`px`,t.offsetHeight,t.style.opacity=`0`,t.style.transform=`scale(0.95)`,t.style.maxHeight=`0px`,t.style.marginTop=`0px`,t.style.marginBottom=`0px`,t.style.paddingTop=`0px`,t.style.paddingBottom=`0px`,setTimeout(()=>t.remove(),450)}function Pn(e){if(!y.currentUser){window.location.hash=`#/login`;return}let t=y.currentUser;e.innerHTML=G(`
    <!-- Sticky Blur Header -->
    <header class="sticky-header">
      <h1 class="header-title">Home</h1>
      <button class="btn-ghost" title="Refresh Feed" onclick="window.location.reload()">
        <span class="material-symbols-outlined" style="font-size: 20px;">refresh</span>
      </button>
    </header>

    <!-- Top Feed Tabs -->
    <div class="header-tabs">
      <button class="tab-button active" id="tab-for-you">For You</button>
      <button class="tab-button" id="tab-friends">SJC Friends</button>
    </div>

    <!-- Expanding Composer -->
    <div class="composer">
      ${`<div id="composer-avatar-container">${H(t.photoURL||``,40)}</div>`}
      <div class="composer-main">
        <textarea id="post-input" placeholder="What's happening at SJC?" rows="2"></textarea>

        <!-- Inline Dynamic Poll Builder (Up to 13 Options) -->
        <div id="inline-poll-builder" style="display: none; margin-top: 12px; padding: 14px; background: var(--bg-secondary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);" class="fade-in">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--accent-primary);">Attach Campus Poll (Up to 13 options)</span>
            <button type="button" id="close-poll-btn" class="btn-ghost" style="padding: 2px;" title="Remove Poll">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>
          
          <div id="inline-poll-options-container" style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;">
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <button type="button" id="inline-add-opt-btn" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px;">
              + Add Option (Max 13)
            </button>
          </div>
        </div>

        <div id="composer-attachment-container"></div>

        <div class="composer-toolbar">
          <div class="composer-icons">
            <button class="composer-icon-btn" id="add-image-btn" title="Add Image">
              <span class="material-symbols-outlined" style="font-size: 20px;">image</span>
            </button>
            <input type="file" id="composer-image-input" accept="image/*" style="display: none;" />
            <button class="composer-icon-btn" id="toggle-poll-btn" title="Create Poll">
              <span class="material-symbols-outlined" style="font-size: 20px;">poll</span>
            </button>
            <button class="composer-icon-btn" title="Add Emoji">
              <span class="material-symbols-outlined" style="font-size: 20px;">sentiment_satisfied</span>
            </button>
          </div>

          <div class="composer-right" style="display: flex; align-items: center; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="post-anonymous-checkbox" style="width: 14px; height: 14px; accent-color: var(--accent-primary); cursor: pointer;" />
              Anonymous
            </label>
            <span id="char-counter" class="char-ring">0 / ${B.MAX_CHARS}</span>
            <button id="post-btn" class="btn" disabled>Post</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Combined Home Feed Container (Posts + Polls) -->
    <div id="feed-container">
      ${q(4)}
    </div>
  `,O.HOME);let n=K(),r=`student`;R(t.uid).then(e=>{if(e){r=e.role||`student`;let t=document.getElementById(`composer-avatar-container`);if(t&&(t.innerHTML=H(e,40)),r===`admin`||r===`staff`){let e=document.querySelector(`.sidebar-nav`);if(e&&!e.querySelector(`a[href="#/admin"]`)){let t=document.createElement(`a`);t.href=O.ADMIN,t.className=`nav-item`,t.innerHTML=`
            <span class="material-symbols-outlined">${r===`admin`?`admin_panel_settings`:`shield_person`}</span>
            <span class="sidebar-label">${r===`admin`?`Admin`:`Staff`}</span>
          `,e.appendChild(t)}}}}).catch(e=>console.error(e));let i=document.getElementById(`post-input`);An(i);let a=document.getElementById(`char-counter`),o=document.getElementById(`post-btn`),s=document.getElementById(`feed-container`),c=document.getElementById(`toggle-poll-btn`),l=document.getElementById(`close-poll-btn`),u=document.getElementById(`inline-poll-builder`),d=document.getElementById(`inline-poll-options-container`),f=document.getElementById(`inline-add-opt-btn`),p=document.getElementById(`tab-for-you`),m=document.getElementById(`tab-friends`),h=!1,g=`for-you`,_=null,v=document.getElementById(`add-image-btn`),b=document.getElementById(`composer-image-input`),x=document.getElementById(`composer-attachment-container`);function S(){_=null,x.innerHTML=``,b.value=``,w()}function C(e,t){x.innerHTML=`
      <div class="composer-attachment-chip">
        <span class="material-symbols-outlined" style="font-size: 16px;">${t?`progress_activity`:`image`}</span>
        <span>${e}</span>
        ${t?``:`<span class="material-symbols-outlined remove-attachment-btn" id="remove-attachment-btn" title="Remove">close</span>`}
      </div>
    `,t||document.getElementById(`remove-attachment-btn`)?.addEventListener(`click`,S)}v&&v.addEventListener(`click`,()=>b.click()),b&&b.addEventListener(`change`,async()=>{let e=b.files[0];if(e){C(`Uploading ${e.name}...`,!0),v.disabled=!0;try{let n=await Tn(e,t.uid);_=ae(n),C(`${n.name} · ${hn(n.size)}`,!1),w()}catch(e){S(),e.code===`NO_DRIVE_CONNECTED`||e.code===`ALL_DRIVES_FULL`?confirm(`${e.message}\n\nGo to Settings now?`)&&(window.location.hash=O.SETTINGS):alert(e.message||`Failed to upload image.`)}finally{v.disabled=!1}}}),p.addEventListener(`click`,()=>{g=`for-you`,p.classList.add(`active`),m.classList.remove(`active`),M()}),m.addEventListener(`click`,()=>{g=`friends`,m.classList.add(`active`),p.classList.remove(`active`),M()}),c.addEventListener(`click`,()=>{h=!h,u.style.display=h?`block`:`none`,w()}),l.addEventListener(`click`,()=>{h=!1,u.style.display=`none`,w()}),f.addEventListener(`click`,()=>{let e=d.querySelectorAll(`.inline-opt-input`);if(e.length<13){let t=e.length+1,n=document.createElement(`input`);n.type=`text`,n.className=`input-field inline-opt-input fade-in`,n.placeholder=`Option ${t}`,n.style.marginBottom=`0`,n.style.padding=`8px 12px`,n.style.fontSize=`14px`,n.addEventListener(`input`,w),d.appendChild(n),e.length+1===13&&(f.style.display=`none`)}});function w(){let e=i.value.trim().replace(/\s/g,``).length;if(a.textContent=`${e} / ${B.MAX_CHARS}`,e>B.MAX_CHARS)a.style.color=`var(--error-color)`,o.disabled=!0;else if(h){let t=d.querySelectorAll(`.inline-opt-input`),n=Array.from(t).filter(e=>e.value.trim().length>0);o.disabled=!(e>0&&n.length>=2),a.style.color=`var(--accent-primary)`}else e===0?(a.style.color=`var(--text-secondary)`,o.disabled=!_):(a.style.color=`var(--accent-primary)`,o.disabled=!1)}i.addEventListener(`input`,()=>{i.style.height=`auto`,i.style.height=Math.max(54,i.scrollHeight)+`px`,w()}),d.querySelectorAll(`.inline-opt-input`).forEach(e=>{e.addEventListener(`input`,w)}),o.addEventListener(`click`,async()=>{let e=i.value.trim(),t=e.replace(/\s/g,``);if((t.length>0||_)&&t.length<=B.MAX_CHARS){o.disabled=!0,o.textContent=`Posting...`;try{let t=document.getElementById(`post-anonymous-checkbox`).checked;if(h){let n=d.querySelectorAll(`.inline-opt-input`),r=Array.from(n).map(e=>e.value.trim()).filter(Boolean);if(r.length<2){alert(`A poll must have at least 2 valid options.`),o.disabled=!1,o.textContent=`Post`;return}await St(e,r,t),h=!1,u.style.display=`none`,d.innerHTML=`
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          `,f.style.display=`inline-block`}else await xe(_?e?`${e}\n${_}`:_:e,t);document.getElementById(`post-anonymous-checkbox`).checked=!1,i.value=``,i.style.height=`54px`,i.dispatchEvent(new Event(`input`)),S()}catch(e){console.error(e),alert(e.message||`Failed to submit post.`)}finally{o.textContent=`Post`}}});let T=[],E=[],D=[],A=async(e,t)=>{let n=e.map(async e=>{try{if(e._type===`post`){let[n,r,i,a]=await Promise.all([R(e.authorId),Ae(e.postId,t),Me(e.postId,t),Fe(e.postId)]);return{...e,author:n,isLiked:r,isReshared:i,isSaved:a}}else if(e._type===`poll`){let[n,r,i,a]=await Promise.all([R(e.creatorId),Ct(e.pollId,t),Dt(e.pollId,t),kt(e.pollId,t)]);return{...e,author:n,userVote:r,pollLiked:i,pollReshared:a}}else if(e._type===`petition`){let[n,r]=await Promise.all([R(e.creatorId),nn(e.petitionId,t)]);return{...e,author:n,isSigned:r}}}catch(t){return console.error(`Failed to load data for item:`,e,t),null}});return(await Promise.all(n)).filter(Boolean)},j=e=>{let t=new Map,n=[];for(let r of e){let e=``,i=``;r._type===`post`?(i=`post-${r.postId}`,e=qt(r,r.author,r.isLiked,r.isReshared,r.isSaved)):r._type===`poll`?(i=`poll-${r.pollId}`,e=Yt(r,r.author,r.userVote,r.pollLiked,r.pollReshared)):r._type===`petition`&&(i=`petition-${r.petitionId}`,e=Xt(r,r.author,r.isSigned)),e&&(t.set(i,e),n.push(i))}return{htmlMap:t,orderedKeys:n}},M=async()=>{if(!s)return;let e=y.currentUser?.uid;if(!e)return;let t=[];g===`friends`&&(t=await it(e),t.push(e));let n=g===`friends`?T.filter(e=>t.includes(e.authorId)&&e.status!==`AWAITING_MODERATION`):T.filter(e=>e.status!==`AWAITING_MODERATION`),r=g===`friends`?E.filter(e=>t.includes(e.creatorId)):E,i=g===`friends`?D.filter(e=>t.includes(e.creatorId)):D,a=[...n.map(e=>({...e,_type:`post`})),...r.map(e=>({...e,_type:`poll`})),...i.map(e=>({...e,_type:`petition`}))];if(a.sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp)),a.length===0){s.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${g===`friends`?`group_off`:`forum`}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${g===`friends`?`No activity from friends`:`No campus activity yet`}</h3>
          <p style="font-size: 14px;">${g===`friends`?`Add more classmates as friends to see their activity here!`:`Be the first student to post or create a poll on Backbench!`}</p>
        </div>
      `;return}let o=await A(a,e),{htmlMap:c,orderedKeys:l}=j(o);if(k(s,c,l),a.length>=15){let e=document.getElementById(`load-more-trigger`);e||(e=document.createElement(`div`),e.id=`load-more-trigger`,e.style.height=`20px`,e.style.width=`100%`,s.appendChild(e)),window.feedObserver&&window.feedObserver.disconnect(),window.feedObserver=new IntersectionObserver(e=>{e[0].isIntersecting&&(window.feedObserver.disconnect(),window.postLimit+=15,Z&&Z(),Z=Ce(window.postLimit,e=>{T=e,M()}))},{rootMargin:`200px`}),window.feedObserver.observe(e)}},P=async e=>{let t=y.currentUser?.uid;if(!t)return;let n=e.target.closest(`.like-btn`);if(n){e.stopPropagation();let t=n.dataset.postId;n.disabled=!0;try{let e=await ke(t);e.liked?n.classList.add(`liked`,`heart-pop`):n.classList.remove(`liked`,`heart-pop`);let r=n.querySelector(`.like-count`);r&&(r.textContent=e.likes)}catch(e){console.error(e)}finally{n.disabled=!1}return}let r=e.target.closest(`.reshare-btn`);if(r){e.stopPropagation();let t=r.dataset.postId;r.disabled=!0;try{let e=await je(t);e.reshared?(r.classList.add(`reshared`),r.style.color=`#00BA7C`):(r.classList.remove(`reshared`),r.style.color=``);let n=r.querySelector(`.reshare-count`);n&&(n.textContent=e.reshares)}catch(e){console.error(e)}finally{r.disabled=!1}return}let i=e.target.closest(`.save-btn`);if(i){e.stopPropagation();let t=i.dataset.postId;i.disabled=!0;try{await Ie(t)?(i.classList.add(`saved`),i.style.color=`var(--accent-primary)`):(i.classList.remove(`saved`),i.style.color=``)}catch(e){console.error(e)}finally{i.disabled=!1}return}let a=e.target.closest(`.post-options-btn`);if(a){e.stopPropagation();let n=a.dataset.postId,r=a.dataset.authorId,i=await R(t),o=i?.role===`staff`||i?.role===`admin`;X(a,{itemId:n,authorId:r,currentUid:t,isStaff:o,itemType:`post`,onDelete:async e=>{try{t===r?await Pe(e):o&&await Bt(e),Nn(a.closest(`.post-card`))}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(e,t)=>{try{(await Ht(e,t)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),Nn(a.closest(`.post-card`))):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}},onEdit:async e=>{let t=a.closest(`.post-card`).querySelector(`.post-body`);if(!t)return;let n=t.innerText,r=await N(`Edit your post:`,n,`Write something...`,null,null,189);if(r!==null&&r.trim()!==n.trim())try{await Se(e,r)}catch(e){alert(e.message||`Failed to edit post.`)}}});return}let o=e.target.closest(`.poll-options-btn`);if(o){e.stopPropagation();let n=o.dataset.pollId,r=o.dataset.creatorId,i=await R(t),a=i?.role===`staff`||i?.role===`admin`;X(o,{itemId:n,authorId:r,currentUid:t,isStaff:a,itemType:`poll`,onDelete:async e=>{try{t===r?await Mt(e):a&&await Nt(e),Nn(o.closest(`.poll-card`))}catch(e){alert(e.message||`Failed to delete poll.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}});return}let s=e.target.closest(`.petition-options-btn`);if(s){e.stopPropagation();let n=s.dataset.petitionId,r=s.dataset.authorId,i=await R(t),a=i?.role===`staff`||i?.role===`admin`;X(s,{itemId:n,authorId:r,currentUid:t,isStaff:a,itemType:`petition`,onDelete:async e=>{try{t===r?await on(e):a&&await Vt(e),Nn(s.closest(`.petition-card`))}catch(e){alert(e.message||`Failed to delete petition.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}});return}let c=e.target.closest(`.poll-option-btn`);if(c){e.stopPropagation();let t=c.dataset.pollId,n=parseInt(c.dataset.optionIndex);c.disabled=!0,c.textContent=`Recording vote...`;try{await wt(t,n)}catch(e){alert(e.message||`Failed to record vote`)}return}let l=e.target.closest(`.poll-like-btn`);if(l){e.stopPropagation();let t=l.dataset.pollId;l.disabled=!0;try{let e=await Et(t);e.liked?l.classList.add(`liked`,`heart-pop`):l.classList.remove(`liked`,`heart-pop`);let n=l.querySelector(`.like-count`);n&&(n.textContent=e.likes)}catch(e){console.error(e)}finally{l.disabled=!1}return}let u=e.target.closest(`.poll-reshare-btn`);if(u){e.stopPropagation();let t=u.dataset.pollId;u.disabled=!0;try{let e=await Ot(t);e.reshared?(u.classList.add(`reshared`),u.style.color=`#00BA7C`):(u.classList.remove(`reshared`),u.style.color=``);let n=u.querySelector(`.reshare-count`);n&&(n.textContent=e.reshares)}catch(e){console.error(e)}finally{u.disabled=!1}return}let d=e.target.closest(`.petition-sign-btn`);if(d){e.stopPropagation();let t=d.dataset.petitionId;d.disabled=!0;try{let e=await rn(t);d.classList.add(`signed`),d.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">draw</span> Signed`,d.style.background=`var(--accent-soft)`,d.style.color=`var(--accent-primary)`,d.style.border=`1px solid var(--accent-primary)`;let n=d.closest(`.petition-card`).querySelector(`.signature-count`);n&&(n.innerHTML=`<b>${e.signatureCount}</b> signatures`)}catch(e){alert(e.message||`Failed to sign petition.`),d.disabled=!1}return}let f=e.target.closest(`.post-card`);if(f){let e=f.dataset.postId;e&&(window.location.hash=`#/post?id=${e}`);return}let p=e.target.closest(`.poll-card`);if(p){let e=p.dataset.pollId;e&&(window.location.hash=`#/polls?id=${e}`);return}let m=e.target.closest(`.petition-card`);if(m){let e=m.dataset.petitionId;e&&(window.location.hash=`#/petition?id=${e}`);return}};return s.addEventListener(`click`,P),Z&&Z(),jn&&jn(),Mn&&Mn(),window.postLimit=15,Z=Ce(window.postLimit,e=>{T=e,M()}),jn=Tt(20,e=>{E=e,M()}),Mn=en(20,e=>{D=e,M()}),()=>{n&&n(),Z&&Z(),jn&&jn(),Mn&&Mn(),window.feedObserver&&(window.feedObserver.disconnect(),window.feedObserver=null),s.removeEventListener(`click`,P)}}function Fn(e){return/^[a-zA-Z0-9_.]{3,20}$/.test(e)}function In(e,t){let n=t===`#/login`;e.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; padding: 20px; background: radial-gradient(circle at top center, rgba(29, 155, 240, 0.08) 0%, transparent 60%);">
      <div class="card fade-in" style="width: 100%; max-width: 440px; padding: 32px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px);">
        
        <!-- Brand Badge -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
          <img src="/favicon.png" style="width: 52px; height: 52px; border-radius: 16px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); margin-bottom: 12px; object-fit: cover;" alt="Backbench Logo" />
          <h1 style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; text-align: center;">
            ${n?`Welcome back to Backbench`:`Create your Backbench Account`}
          </h1>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px; text-align: center;">
            St. Joseph's College Internal Social Network
          </p>
        </div>

        <!-- Auth Tabs -->
        <div style="display: flex; background: var(--bg-primary); padding: 4px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 20px;">
          <a href="#/login" class="btn" style="flex: 1; text-align: center; background: ${n?`var(--bg-tertiary)`:`transparent`}; color: ${n?`var(--text-primary)`:`var(--text-secondary)`}; border-radius: 8px; padding: 8px; font-size: 14px; border: ${n?`1px solid var(--border-color)`:`none`};">Log In</a>
          <a href="#/signup" class="btn" style="flex: 1; text-align: center; background: ${n?`transparent`:`var(--bg-tertiary)`}; color: ${n?`var(--text-secondary)`:`var(--text-primary)`}; border-radius: 8px; padding: 8px; font-size: 14px; border: ${n?`none`:`1px solid var(--border-color)`};">Sign Up</a>
        </div>

        <!-- Form -->
        <form id="auth-form" style="display: flex; flex-direction: column;">
          ${n?``:`
            <!-- Role Selection -->
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Account Type</label>
            <div style="display: flex; gap: 10px; margin-bottom: 12px;">
              <button type="button" id="select-student-btn" class="btn" style="flex: 1; padding: 8px; font-size: 13px; font-weight: 700; border-radius: 10px; background: var(--accent-primary);">
                🎓 Student
              </button>
              <button type="button" id="select-teacher-btn" class="btn btn-outline" style="flex: 1; padding: 8px; font-size: 13px; font-weight: 700; border-radius: 10px;">
                👨‍🏫 Teacher / Faculty
              </button>
            </div>

            <input class="input-field" type="text" id="name" placeholder="Official Full Name" required />
            <input class="input-field" type="text" id="username" placeholder="Username (e.g. prof.sharma)" required />
            <div style="display: flex; gap: 12px;">
              <input class="input-field" type="text" id="admissionNumber" placeholder="Admission No." required />
              <input class="input-field" type="text" id="class" placeholder="Class (e.g. 12A)" required />
            </div>
            <input class="input-field" type="tel" id="mobile" placeholder="Mobile Number" required />
          `}
          
          <input class="input-field" type="email" id="email" placeholder="SJC Email Address" required />
          
          <div style="position: relative; width: 100%;">
            <input class="input-field" type="password" id="password" placeholder="Password" style="padding-right: 46px;" required />
            <button type="button" id="toggle-password-btn" class="btn-ghost" style="position: absolute; right: 8px; top: 7px; color: var(--text-secondary); padding: 6px;" title="Show Password">
              <span class="material-symbols-outlined" style="font-size: 20px;">visibility</span>
            </button>
          </div>

          <div id="auth-error" class="error-text" style="display: none;"></div>

          <button type="submit" class="btn" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; margin-top: 4px; box-shadow: 0 4px 14px rgba(29, 155, 240, 0.3);">
            ${n?`Log In`:`Create Account`}
          </button>

          <div style="display: flex; align-items: center; margin: 20px 0; color: var(--text-muted); font-size: 13px;">
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
            <span style="padding: 0 12px; font-weight: 600;">OR</span>
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
          </div>

          <button type="button" id="google-btn" class="btn btn-outline" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: 9999px;">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px; height: 18px;" alt="Google" />
            Continue with Google
          </button>
        </form>

        <div style="text-align: center; margin-top: 24px; color: var(--text-secondary); font-size: 14px;">
          ${n?`Don't have an account?`:`Already have an account?`} 
          <a href="${n?`#/signup`:`#/login`}" style="font-weight: 700;">
            ${n?`Sign up`:`Log in`}
          </a>
        </div>
      </div>
    </div>
  `;let r=document.getElementById(`auth-form`),i=document.getElementById(`auth-error`),a=document.getElementById(`google-btn`),o=document.getElementById(`password`),s=document.getElementById(`toggle-password-btn`),c=`student`;if(!n){let e=document.getElementById(`select-student-btn`),t=document.getElementById(`select-teacher-btn`),n=document.getElementById(`admissionNumber`),r=document.getElementById(`class`),i=document.getElementById(`name`);e&&t&&(e.addEventListener(`click`,()=>{c=`student`,e.className=`btn`,e.style.background=`var(--accent-primary)`,t.className=`btn btn-outline`,t.style.background=`transparent`,n&&(n.placeholder=`Admission No.`),r&&(r.placeholder=`Class (e.g. 12A)`),i&&(i.placeholder=`Official Full Name`)}),t.addEventListener(`click`,()=>{c=`teacher`,t.className=`btn`,t.style.background=`#00BA7C`,e.className=`btn btn-outline`,e.style.background=`transparent`,n&&(n.placeholder=`Employee / Teacher ID`),r&&(r.placeholder=`Dept (e.g. Physics)`),i&&(i.placeholder=`Official Faculty Name (e.g. Dr. Sharma)`)}))}s.addEventListener(`click`,()=>{let e=o.type===`password`;o.type=e?`text`:`password`;let t=s.querySelector(`.material-symbols-outlined`);t.textContent=e?`visibility_off`:`visibility`,s.title=e?`Hide Password`:`Show Password`}),a.addEventListener(`click`,async()=>{a.disabled=!0,a.textContent=`Connecting...`;let e=await $e();e.success?e.needsOnboarding?window.location.hash=`#/onboarding`:window.location.hash=`#/`:(i.textContent=e.error,i.style.display=`block`,a.disabled=!1,a.innerHTML=`
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px; height: 18px;" alt="Google" />
        Continue with Google
      `)}),r.addEventListener(`submit`,async e=>{e.preventDefault(),i.style.display=`none`;let t=document.getElementById(`email`).value.trim(),a=document.getElementById(`password`).value;if(n){let e=r.querySelector(`button[type="submit"]`);e.disabled=!0,e.textContent=`Logging in...`;let n=await Xe(t,a);n.success?window.location.hash=`#/`:(i.textContent=n.error,i.style.display=`block`,e.disabled=!1,e.textContent=`Log In`)}else{let e=document.getElementById(`name`).value.trim(),n=document.getElementById(`username`).value.trim(),o=document.getElementById(`admissionNumber`).value.trim(),s=document.getElementById(`class`).value.trim(),l=document.getElementById(`mobile`).value.trim();if(!Fn(n)){i.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,i.style.display=`block`;return}let u=r.querySelector(`button[type="submit"]`);u.disabled=!0,u.textContent=`Creating Account...`;let d=await Ye({email:t,password:a,username:n,name:e,admissionNumber:o,userClass:s,mobile:l,isTeacher:c===`teacher`,role:c===`teacher`?`teacher`:`student`});d.success?window.location.hash=`#/`:(i.textContent=d.error,i.style.display=`block`,u.disabled=!1,u.textContent=`Create Account`)}})}var Ln=[{id:`gradient-1`,name:`SJC Ocean Blue`,gradient:`linear-gradient(135deg, #1D9BF0 0%, #004477 100%)`},{id:`gradient-2`,name:`Neon Cyberpunk`,gradient:`linear-gradient(135deg, #FF0080 0%, #7928CA 100%)`},{id:`gradient-3`,name:`Emerald Glow`,gradient:`linear-gradient(135deg, #00b09b 0%, #96c93d 100%)`},{id:`gradient-4`,name:`Golden Sunset`,gradient:`linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)`},{id:`gradient-5`,name:`Crimson Fire`,gradient:`linear-gradient(135deg, #E94057 0%, #F27121 100%)`},{id:`gradient-6`,name:`Midnight Purple`,gradient:`linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)`},{id:`gradient-7`,name:`Dark Obsidian`,gradient:`linear-gradient(135deg, #16181C 0%, #2F3336 100%)`},{id:`gradient-8`,name:`Teal Lagoon`,gradient:`linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`},{id:`gradient-9`,name:`Aurora Borealis`,gradient:`linear-gradient(135deg, #43cea2 0%, #185a9d 100%)`},{id:`gradient-10`,name:`Velvet Dusk`,gradient:`linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)`},{id:`gradient-11`,name:`Electric Violet`,gradient:`linear-gradient(135deg, #DA22FF 0%, #9733EE 100%)`},{id:`gradient-12`,name:`Cosmic Nebula`,gradient:`linear-gradient(135deg, #020024 0%, #090979 50%, #00d4ff 100%)`},{id:`gradient-13`,name:`Sunset Coral`,gradient:`linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)`},{id:`gradient-14`,name:`Emerald Forest`,gradient:`linear-gradient(135deg, #134E5E 0%, #71B280 100%)`},{id:`gradient-15`,name:`Rose Gold`,gradient:`linear-gradient(135deg, #f4c4f3 0%, #fc67fa 100%)`},{id:`gradient-16`,name:`Midnight Gold`,gradient:`linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)`},{id:`gradient-17`,name:`Cyber Matrix`,gradient:`linear-gradient(135deg, #000000 0%, #0f9b0f 100%)`},{id:`gradient-18`,name:`Plum Royalty`,gradient:`linear-gradient(135deg, #614385 0%, #516395 100%)`},{id:`gradient-19`,name:`Citrus Splash`,gradient:`linear-gradient(135deg, #FFE000 0%, #799F0C 100%)`},{id:`gradient-20`,name:`Deep Space`,gradient:`linear-gradient(135deg, #000000 0%, #434343 100%)`},{id:`gradient-21`,name:`Aether Blue`,gradient:`linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)`},{id:`gradient-22`,name:`Flamingo Coral`,gradient:`linear-gradient(135deg, #ef629f 0%, #eecda3 100%)`},{id:`gradient-23`,name:`Sublime Light`,gradient:`linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)`},{id:`gradient-24`,name:`Frosted Prism`,gradient:`linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)`}],Rn=[{id:`sjc-blue`,name:`SJC Blue`,bg:`linear-gradient(135deg, rgba(29, 155, 240, 0.15) 0%, rgba(0, 68, 119, 0.3) 100%)`,border:`1px solid rgba(29, 155, 240, 0.4)`,accent:`#1D9BF0`,shadow:`0 8px 24px rgba(29, 155, 240, 0.2)`},{id:`neon-cyber`,name:`Neon Cyber`,bg:`linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(121, 40, 202, 0.3) 100%)`,border:`1px solid rgba(255, 0, 128, 0.4)`,accent:`#FF0080`,shadow:`0 8px 24px rgba(255, 0, 128, 0.2)`},{id:`emerald-glow`,name:`Emerald Glow`,bg:`linear-gradient(135deg, rgba(0, 176, 155, 0.15) 0%, rgba(150, 201, 61, 0.3) 100%)`,border:`1px solid rgba(0, 176, 155, 0.4)`,accent:`#00BA7C`,shadow:`0 8px 24px rgba(0, 186, 124, 0.2)`},{id:`golden-sunset`,name:`Golden Sunset`,bg:`linear-gradient(135deg, rgba(242, 153, 74, 0.15) 0%, rgba(242, 201, 76, 0.3) 100%)`,border:`1px solid rgba(242, 153, 74, 0.4)`,accent:`#F2994A`,shadow:`0 8px 24px rgba(242, 153, 74, 0.2)`},{id:`crimson-fire`,name:`Crimson Fire`,bg:`linear-gradient(135deg, rgba(233, 64, 87, 0.15) 0%, rgba(242, 113, 33, 0.3) 100%)`,border:`1px solid rgba(233, 64, 87, 0.4)`,accent:`#E94057`,shadow:`0 8px 24px rgba(233, 64, 87, 0.2)`},{id:`glass-minimal`,name:`Glass Minimal`,bg:`linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,border:`1px solid rgba(255, 255, 255, 0.15)`,accent:`#E7E9EA`,shadow:`0 8px 24px rgba(0, 0, 0, 0.3)`},{id:`midnight-cyber`,name:`Midnight Cyber`,bg:`linear-gradient(135deg, rgba(74, 0, 224, 0.2) 0%, rgba(142, 45, 226, 0.35) 100%)`,border:`1px solid rgba(142, 45, 226, 0.4)`,accent:`#9B51E0`,shadow:`0 8px 24px rgba(155, 81, 224, 0.25)`},{id:`sakura-blossom`,name:`Sakura Blossom`,bg:`linear-gradient(135deg, rgba(244, 196, 243, 0.15) 0%, rgba(252, 103, 250, 0.25) 100%)`,border:`1px solid rgba(252, 103, 250, 0.4)`,accent:`#FC67FA`,shadow:`0 8px 24px rgba(252, 103, 250, 0.2)`},{id:`oceanic-breeze`,name:`Oceanic Breeze`,bg:`linear-gradient(135deg, rgba(17, 153, 142, 0.15) 0%, rgba(56, 239, 125, 0.25) 100%)`,border:`1px solid rgba(56, 239, 125, 0.4)`,accent:`#38EF7D`,shadow:`0 8px 24px rgba(56, 239, 125, 0.2)`},{id:`solar-flare`,name:`Solar Flare`,bg:`linear-gradient(135deg, rgba(255, 224, 0, 0.15) 0%, rgba(121, 159, 12, 0.25) 100%)`,border:`1px solid rgba(255, 224, 0, 0.4)`,accent:`#FFD700`,shadow:`0 8px 24px rgba(255, 215, 0, 0.2)`},{id:`amethyst-dreams`,name:`Amethyst Dreams`,bg:`linear-gradient(135deg, rgba(97, 67, 133, 0.2) 0%, rgba(81, 99, 149, 0.3) 100%)`,border:`1px solid rgba(97, 67, 133, 0.4)`,accent:`#A06CD5`,shadow:`0 8px 24px rgba(160, 108, 213, 0.2)`},{id:`obsidian-frost`,name:`Obsidian Frost`,bg:`linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(47, 51, 54, 0.8) 100%)`,border:`1px solid rgba(255, 255, 255, 0.2)`,accent:`#64B5F6`,shadow:`0 8px 24px rgba(0, 0, 0, 0.5)`}],zn=[{id:`georgia`,name:`Georgia Serif`,fontFamily:`Georgia, serif`},{id:`playfair`,name:`Playfair Editorial`,fontFamily:`'Playfair Display', serif`},{id:`caveat`,name:`Caveat Script`,fontFamily:`'Caveat', cursive, sans-serif`},{id:`cinzel`,name:`Cinzel Roman`,fontFamily:`'Cinzel', serif`},{id:`vibes`,name:`Great Vibes Calligraphy`,fontFamily:`'Great Vibes', cursive, sans-serif`},{id:`pacifico`,name:`Pacifico Vintage`,fontFamily:`'Pacifico', cursive, sans-serif`}];function Bn(e){let t=zn.find(t=>t.id===e);return t?t.fontFamily:zn[0].fontFamily}var Vn=[{id:`default`,name:`Default`,bg:`var(--bg-tertiary)`,text:`var(--accent-primary)`},{id:`blue`,name:`Ocean Blue`,bg:`rgba(29, 155, 240, 0.16)`,text:`#1D9BF0`},{id:`green`,name:`Emerald`,bg:`rgba(0, 186, 124, 0.16)`,text:`#00BA7C`},{id:`purple`,name:`Violet`,bg:`rgba(142, 45, 226, 0.16)`,text:`#A855F7`},{id:`pink`,name:`Crimson Pink`,bg:`rgba(233, 64, 87, 0.16)`,text:`#F04263`},{id:`orange`,name:`Sunset Orange`,bg:`rgba(242, 153, 74, 0.18)`,text:`#F2994A`},{id:`yellow`,name:`Golden`,bg:`rgba(242, 201, 76, 0.2)`,text:`#B8860B`},{id:`teal`,name:`Teal Lagoon`,bg:`rgba(17, 153, 142, 0.18)`,text:`#11998E`},{id:`gray`,name:`Slate`,bg:`rgba(113, 118, 123, 0.18)`,text:`#8A8F96`}];function Hn(e){return new Promise((t,n)=>{if(!e||!e.type.startsWith(`image/`))return n(Error(`Please select a valid image file.`));if(e.size>25*1024*1024)return n(Error(`Selected image file is too large (max 25MB).`));let r=new FileReader;r.onload=e=>{let r=new Image;r.onload=()=>{let e=document.createElement(`canvas`),n=r.width,i=r.height;n>i?n>320&&(i=Math.round(i*320/n),n=320):i>320&&(n=Math.round(n*320/i),i=320),e.width=n,e.height=i;let a=e.getContext(`2d`);a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.drawImage(r,0,0,n,i),t(e.toDataURL(`image/jpeg`,.8))},r.onerror=()=>n(Error(`Failed to process mobile image. Please try a different photo.`)),r.src=e.target.result},r.onerror=()=>n(Error(`Failed to read file from phone gallery.`)),r.readAsDataURL(e)})}var Un=D({createReply:()=>Gn,editReply:()=>Kn,getPostById:()=>Wn,getReplyById:()=>Yn,getSavedReplies:()=>Qn,isReplySaved:()=>Xn,likeReply:()=>Jn,subscribeToReplies:()=>qn,toggleSavedReply:()=>Zn});async function Wn(e){if(!e)return null;let t=await p(C(m,`${T.POSTS}/${e}`));return t.exists()?t.val():null}async function Gn(t,n,r=null){let i=y.currentUser;if(!i)throw Error(`Not authenticated`);let a=n?n.trim():``;if(!a)throw Error(`Reply cannot be empty`);if(a.replace(/\s/g,``).length>189)throw Error(`Reply cannot exceed 189 characters`);let o=(await Wn(t))?.isAnonymous===!0,s=w(C(m,`${T.REPLIES}/${t}`)),c={replyId:s.key,parentPost:t,parentReply:r,authorId:i.uid,content:a,timestamp:new Date().toISOString(),likes:0,isAnonymous:o};await S(s,c),await S(C(m,`${T.REPLIES}/_global_last_reply`),c);let l=C(m,`${T.POSTS}/${t}`),u=null,d=!1;await e(l,e=>(e&&(e.replyCount=(e.replyCount||0)+1,u=e.authorId,d=e.isAnonymous),e));let{sendNotification:f}=await U(async()=>{let{sendNotification:e}=await Promise.resolve().then(()=>fe);return{sendNotification:e}},void 0,import.meta.url),{getUserProfile:h}=await U(async()=>{let{getUserProfile:e}=await Promise.resolve().then(()=>be);return{getUserProfile:e}},void 0,import.meta.url),g=`Someone`;d||(g=(await h(i.uid))?.name||`A student`);let _=new Set;if(u&&u!==i.uid&&_.add(u),r){let e=await p(C(m,`${T.REPLIES}/${t}/${r}`));if(e.exists()){let t=e.val().authorId;t&&t!==i.uid&&_.add(t)}}for(let e of _)await f(e,{text:`${g} replied to your post.`,type:`SYSTEM`,postId:t,senderId:i.uid});let{notifyMentionedUsers:v}=await U(async()=>{let{notifyMentionedUsers:e}=await Promise.resolve().then(()=>ve);return{notifyMentionedUsers:e}},void 0,import.meta.url);return await v({text:a,senderId:i.uid,senderName:g,isAnonymous:d,notifSuffix:`in a reply.`,postId:t}),c}async function Kn(e,t,r){let i=y.currentUser;if(!i)throw Error(`Not authenticated`);let a=r?r.trim():``;if(!a)throw Error(`Reply cannot be empty`);let o=await p(C(m,`${T.REPLIES}/${e}/${t}`));if(!o.exists())throw Error(`Reply not found`);if(o.val().authorId!==i.uid)throw Error(`Unauthorized: You can only edit your own replies.`);return await n(C(m,`${T.REPLIES}/${e}/${t}`),{content:a,edited:!0,updatedAt:new Date().toISOString()}),!0}function qn(e,t){let n=C(m,`${T.REPLIES}/${e}`),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)});return()=>l(n,`value`,i)}async function Jn(t,n){if(!y.currentUser||!t||!n)throw Error(`Not authenticated`);let r=C(m,`${T.REPLIES}/${t}/${n}`),i=0;return await e(r,e=>(e&&(e.likes=(e.likes||0)+1,i=e.likes),e)),i}async function Yn(e,t){try{let n=await p(C(m,`${T.REPLIES}/${e}/${t}`));return n.exists()?n.val():null}catch{return null}}async function Xn(e){let t=y.currentUser;if(!t)return!1;try{return(await p(C(m,`${T.SAVED_REPLIES}/${t.uid}/${e}`))).exists()}catch{return!1}}async function Zn(e,n){let r=y.currentUser;if(!r)throw Error(`Not authenticated`);let i=C(m,`${T.SAVED_REPLIES}/${r.uid}/${e}`);return(await p(i)).exists()?(await t(i),!1):(await S(i,{replyId:e,postId:n,timestamp:new Date().toISOString()}),!0)}async function Qn(e){try{let t=await p(C(m,`${T.SAVED_REPLIES}/${e}`));if(!t.exists())return[];let n=t.val(),r=Object.keys(n),i=[];for(let e of r){let t=n[e].postId,r=await Yn(t,e);r&&i.push({...r,_savedTimestamp:n[e].timestamp})}return i.sort((e,t)=>new Date(t._savedTimestamp||0)-new Date(e._savedTimestamp||0)),i}catch(e){return console.error(`Error fetching saved replies:`,e),[]}}function $n(e){if(!e)return;let t=e.closest(`.feed-item-wrapper`)||e;t.style.transition=`opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s`,t.style.overflow=`hidden`,t.style.maxHeight=t.offsetHeight+`px`,t.offsetHeight,t.style.opacity=`0`,t.style.transform=`scale(0.95)`,t.style.maxHeight=`0px`,t.style.marginTop=`0px`,t.style.marginBottom=`0px`,t.style.paddingTop=`0px`,t.style.paddingBottom=`0px`,setTimeout(()=>t.remove(),450)}async function er(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Profile</h1>
      </div>
    </header>
    ${q(2)}
  `,O.PROFILE);let t=window.location.hash,n=null,r=``;t.includes(`?u=`)&&(r=t.split(`?u=`)[1]||``,r&&(n=decodeURIComponent(r).trim().replace(/^[@\-\s]+/,``)));let i=null;try{if(n){let e=n.toLowerCase().replace(/^[@\-\s]+/,``),t=await p(C(m,T.USERS));t.exists()&&t.forEach(t=>{if(i)return;let a=t.val();if(!a)return;let o=(a.username||``).toLowerCase().replace(/^[@\-\s]+/,``),s=a.uid||``,c=(a.email||``).toLowerCase(),l=(a.name||``).toLowerCase();(o===e||s===n||s===r||c===e||o&&e&&(o.includes(e)||e.includes(o))||l&&e&&l.includes(e))&&(i=a)})}else i=await R(y.currentUser.uid)}catch(e){console.error(`Error loading profile:`,e)}if(!i&&!n&&(i=await R(y.currentUser.uid)),!i){e.innerHTML=G(`
      <header class="sticky-header">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Profile</h1>
        </div>
      </header>
      <div style="padding: 60px 20px; text-align: center;" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">person_off</span>
        <h2 style="font-size: 20px; font-weight: 800;">User not found</h2>
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile "@${I(n||`user`)}" does not exist on Backbench.</p>
      </div>
    `,O.PROFILE);let t=K();return()=>{t&&t()}}let a=y.currentUser.uid===i.uid,o=J(i),s=Bn(i.quoteFontId),c=!1;a||(c=await tt(i.uid));let l=await at(i.uid),u=Ln.find(e=>e.id===i.bannerPreset)||Ln[0],d=i.bannerCustom||u.gradient,f=Rn.find(e=>e.id===i.quotePreset)||Rn[0],h=f.bg,g=f.border,_=f.accent,v=i.name?i.name.charAt(0).toUpperCase():`S`,b=i.profilePicture?`<img src="${i.profilePicture}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`:`<div class="avatar" style="width: 100%; height: 100%; font-size: 36px; border-radius: 50%;">${v}</div>`;e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div style="display: flex; flex-direction: column;">
          <h1 class="header-title" style="font-family: ${o};">${I(i.name||`Student`)}</h1>
          <span style="font-size: 12px; color: var(--text-secondary);" id="profile-post-count-header">0 Posts</span>
        </div>
      </div>
    </header>

    <!-- Cover Banner -->
    <div style="height: 150px; background: ${d}; width: 100%; position: relative;"></div>

    <!-- Profile Header Info -->
    <div style="padding: 0 16px 16px 16px; position: relative;" class="fade-in">
      
      <!-- Avatar & Action Buttons Row -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -45px; margin-bottom: 12px;">
        <div style="width: 90px; height: 90px; border-radius: 50%; border: 4px solid var(--bg-primary); background: var(--bg-secondary); overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
          ${b}
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="copy-profile-frame-btn" class="btn btn-outline" style="font-weight: 700; font-size: 13px; padding: 6px 12px; display: flex; align-items: center; gap: 4px;" title="Copy digital student ID frame link">
            <span class="material-symbols-outlined" style="font-size: 16px;">filter_frames</span> Frame Link
          </button>
          ${a?`
            <button id="edit-profile-btn" class="btn btn-outline" style="font-weight: 700;">Edit Profile</button>
          `:`
            <button id="profile-message-btn" class="btn btn-outline" data-uid="${i.uid}" title="Send a message">
              <span class="material-symbols-outlined" style="font-size: 18px;">chat_bubble</span>
            </button>
            <button id="profile-friend-btn" class="btn ${c?`btn-outline`:``}">
              ${c?`Friends`:`+ Add Friend`}
            </button>
          `}
        </div>
      </div>

      <!-- Names & Badges -->
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <h2 style="font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 6px; font-family: ${o};">
          ${I(i.name||`Student`)}
          ${i.isTeacher?`
            <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
              <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
            </span>
          `:i.verifiedStudent||i.role===`staff`||i.role===`admin`?`
            <span class="material-symbols-outlined verified-icon" style="font-size: 20px;">verified</span>
          `:``}
        </h2>
        <span style="font-size: 14px; color: var(--text-secondary);">@${I(i.username||`student`)}</span>
      </div>

      <!-- Interest / Club Tags -->
      ${Array.isArray(i.tags)&&i.tags.length>0?`
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
          ${i.tags.map(e=>{let t=Vn.find(e=>e.id===i.tagColorId)||Vn[0];return`<span class="brand-badge" style="font-size: 12px; padding: 4px 10px; background: ${t.bg}; color: ${t.text}; border-color: transparent;">${I(e)}</span>`}).join(``)}
        </div>
      `:``}

      <!-- Bio / Description -->
      ${i.bio?`
        <div style="margin-top: 10px; font-size: 14px; color: var(--text-primary); line-height: 1.4; font-family: ${o};">
          ${I(i.bio)}
        </div>
      `:``}

      <!-- Custom Campus Quote Banner -->
      ${i.tagline?`
        <div style="margin-top: 12px; padding: 12px 16px; border-radius: 12px; background: ${h}; border: ${g}; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: ${_}; font-size: 22px;">format_quote</span>
          <span style="font-size: 14px; font-style: italic; color: var(--text-primary); font-family: ${s};">
            “${I(i.tagline)}”
          </span>
        </div>
      `:``}

      <!-- Meta Info Pills (Class, Admission, Mobile, Joined Date) -->
      <div style="display: flex; flex-wrap: wrap; gap: 14px; margin-top: 14px; font-size: 13px; color: var(--text-secondary);">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">school</span>
          <span>Class ${I(i.class||`N/A`)}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">badge</span>
          <span>Adm: ${I(i.admissionNumber||`N/A`)}</span>
        </div>

        ${i.mobile?`
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
            <span>${I(i.mobile)}</span>
          </div>
        `:``}

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">calendar_today</span>
          <span>Joined ${new Date(i.joinedDate||Date.now()).toLocaleDateString(`en-US`,{month:`short`,year:`numeric`})}</span>
        </div>
      </div>

      <!-- Friends Counter Pill -->
      <div style="margin-top: 12px; font-size: 14px; display: flex; gap: 16px;">
        <span style="color: var(--text-secondary);">
          <strong style="color: var(--text-primary);">${l}</strong> Friends
        </span>
      </div>
    </div>

    <!-- Profile Tabs -->
    <div class="header-tabs">
      <button class="tab-button active" id="profile-tab-posts">Posts</button>
      <button class="tab-button" id="profile-tab-likes">Likes</button>
      ${a?`<button class="tab-button" id="profile-tab-saved">Saved</button>`:``}
    </div>

    <!-- Feed Container -->
    <div id="profile-feed-container">
      ${q(3)}
    </div>

    <!-- Edit Profile Modal Overlay (Only rendered for own profile) -->
    ${a?tr(i):``}
  `,O.PROFILE),K();let x=document.getElementById(`profile-feed-container`),S=document.getElementById(`profile-post-count-header`),w=document.getElementById(`profile-tab-posts`),E=document.getElementById(`profile-tab-likes`),D=document.getElementById(`profile-tab-saved`),k=document.getElementById(`copy-profile-frame-btn`);k&&k.addEventListener(`click`,()=>{let e=`${window.location.origin}${window.location.pathname}#/profile-frame?u=${encodeURIComponent(i.username||`student`)}`;navigator.clipboard.writeText(e).then(()=>{let e=k.innerHTML;k.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{k.innerHTML=e},2e3)})});let A=document.getElementById(`profile-message-btn`);A&&A.addEventListener(`click`,()=>{window.location.hash=`${O.DM_THREAD}?u=${A.dataset.uid}`});let j=document.getElementById(`profile-friend-btn`);j&&j.addEventListener(`click`,async()=>{j.disabled=!0;try{let e=await rt(i.uid);j.textContent=e?`Friends`:`+ Add Friend`,j.className=`btn ${e?`btn-outline`:``}`}catch(e){alert(e.message||`Failed to update friend status`)}finally{j.disabled=!1}}),we(i.uid,async e=>{if(x){if(S&&(S.textContent=`${e.length} Post${e.length===1?``:`s`}`),N!==`posts`){window.currentProfilePosts=e;return}M(e)}});async function M(e){if(!x)return;if(e.length===0){x.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">post_add</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
          <p style="font-size: 14px;">When ${a?`you post`:`this student posts`}, their content will appear here.</p>
        </div>
      `;return}let t=``,n=y.currentUser.uid;for(let r of e){let e=await Ae(r.postId,n),a=await Me(r.postId,n);t+=qt(r,i,e,a)}x.innerHTML=t,x.querySelectorAll(`.post-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`a`)){let t=e.dataset.postId;t&&(window.location.hash=`${O.POST_DETAIL}?id=${t}`)}})}),x.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await ke(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),x.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId,r=e.dataset.authorId,i=y.currentUser?.uid,a=i?await R(i):null,o=a?.role===`staff`||a?.role===`admin`;X(e,{itemId:n,authorId:r,currentUid:i,isStaff:o,itemType:`post`,onDelete:async t=>{try{i===r?await Pe(t):o&&await Bt(t),$n(e.closest(`.post-card`))}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{(await Ht(t,n)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),$n(e.closest(`.post-card`))):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}let N=`posts`;async function P(){if(!x)return;x.innerHTML=q(3);let e=await Ne(i.uid);if(e.length===0){x.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">favorite</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No liked posts yet</h3>
          <p style="font-size: 14px;">When ${a?`you like`:`this student likes`} a post, it will appear here.</p>
        </div>
      `;return}let t=``,n=y.currentUser?.uid;for(let r of e){let e=await R(r.authorId),i=n?await Ae(r.postId,n):!1,a=n?await Me(r.postId,n):!1,o=n?await Fe(r.postId,n):!1;t+=qt(r,e,i,a,o)}x.innerHTML=t,x.querySelectorAll(`.post-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`a`)){let t=e.dataset.postId;t&&(window.location.hash=`${O.POST_DETAIL}?id=${t}`)}})}),x.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await ke(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),x.querySelectorAll(`.save-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{await Ie(n)?(e.classList.add(`saved`),e.style.color=`var(--accent-primary)`):(e.classList.remove(`saved`),e.style.color=``)}catch(e){console.error(e)}finally{e.disabled=!1}})}),x.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId,r=e.dataset.authorId,i=y.currentUser?.uid,a=i?await R(i):null,o=a?.role===`staff`||a?.role===`admin`;X(e,{itemId:n,authorId:r,currentUid:i,isStaff:o,itemType:`post`,onDelete:async t=>{try{i===r?await Pe(t):o&&await Bt(t);let n=e.closest(`.post-card`);n&&(n.style.opacity=`0.3`,n.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{if((await Ht(t,n)).autoTakenDown){alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`);let t=e.closest(`.post-card`);t&&(t.style.opacity=`0.2`,t.style.pointerEvents=`none`)}else alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}w&&E&&(w.addEventListener(`click`,()=>{N!==`posts`&&(N=`posts`,w.classList.add(`active`),E.classList.remove(`active`),D&&D.classList.remove(`active`),window.currentProfilePosts&&M(window.currentProfilePosts))}),E.addEventListener(`click`,()=>{N!==`likes`&&(N=`likes`,E.classList.add(`active`),w.classList.remove(`active`),D&&D.classList.remove(`active`),P())}),D&&D.addEventListener(`click`,()=>{N!==`saved`&&(N=`saved`,D.classList.add(`active`),w.classList.remove(`active`),E.classList.remove(`active`),ee())}));async function ee(){if(!x)return;x.innerHTML=q(3);let e=await Le(i.uid),t=await Qn(i.uid),n=[...e,...t].sort((e,t)=>{let n=new Date(e._savedTimestamp||0);return new Date(t._savedTimestamp||0)-n});if(n.length===0){x.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">bookmark</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No saved posts or replies yet</h3>
          <p style="font-size: 14px;">When you save a post or reply, it will appear here for easy access.</p>
        </div>
      `;return}let r=``,a=y.currentUser?.uid;for(let e of n)if(e.replyId){let t=await R(e.authorId),n=await p(C(m,`${T.POSTS}/${e.postId}`)),i=null,a=null;n.exists()&&(i=n.val(),a=await R(i.authorId)),i&&(r+=Jt(i,a,e,t,!0))}else{let t=await R(e.authorId),n=a?await Ae(e.postId,a):!1,i=a?await Me(e.postId,a):!1;r+=qt(e,t,n,i,!0)}x.innerHTML=r,x.querySelectorAll(`.post-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`a`)){let t=e.dataset.postId;t&&(window.location.hash=`${O.POST_DETAIL}?id=${t}`)}})}),x.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await ke(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),x.querySelectorAll(`.save-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{await Ie(n)?(e.classList.add(`saved`),e.style.color=`var(--accent-primary)`):(e.classList.remove(`saved`),e.style.color=``)}catch(e){console.error(e)}finally{e.disabled=!1}})})}a&&nr(i,e)}function tr(e){let t=e.bannerPreset||Ln[0].id,n=e.quotePreset||Rn[0].id,r=e.fontId||Kt[0].id,i=e.quoteFontId||zn[0].id,a=e.tagColorId||Vn[0].id,o=Vn.map(e=>`
    <div class="tag-color-swatch ${e.id===a?`active`:``}" data-id="${e.id}" style="background: ${e.bg}; height: 32px; border-radius: 8px; cursor: pointer; border: 2px solid ${e.id===a?`var(--accent-primary)`:`transparent`}; display: flex; align-items: center; justify-content: center;" title="${e.name}">
      <span style="width: 14px; height: 14px; border-radius: 50%; background: ${e.text};"></span>
    </div>
  `).join(``),s=Ln.map(e=>`
    <div class="banner-swatch ${e.id===t?`active`:``}" data-id="${e.id}" style="background: ${e.gradient}; height: 40px; border-radius: 8px; cursor: pointer; border: 2px solid ${e.id===t?`var(--accent-primary)`:`transparent`};" title="${e.name}"></div>
  `).join(``),c=Rn.map(e=>`
    <div class="quote-swatch ${e.id===n?`active`:``}" data-id="${e.id}" style="background: ${e.bg}; border: ${e.border}; height: 40px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="${e.name}">
      <span class="material-symbols-outlined" style="color: ${e.accent}; font-size: 18px;">format_quote</span>
    </div>
  `).join(``),l=Kt.map(e=>{let t=e.id===r;return`
      <div class="font-card-swatch ${t?`active`:``}" data-id="${e.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${t?`var(--accent-primary)`:`transparent`}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${e.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${e.name}</span>
        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary); font-family: ${e.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          Ag Backbench
        </span>
      </div>
    `}).join(``),u=zn.map(e=>{let t=e.id===i;return`
      <div class="quote-font-card-swatch ${t?`active`:``}" data-id="${e.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${t?`var(--accent-primary)`:`transparent`}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${e.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${e.name}</span>
        <span style="font-size: 13px; font-style: italic; color: var(--accent-primary); font-family: ${e.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          “Campus Slogan”
        </span>
      </div>
    `}).join(``);return`
    <div id="edit-profile-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; justify-content: center; align-items: center; padding: 20px;">
      <div class="card fade-in edit-profile-modal-content">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: 800;">Edit Student Profile</h2>
          <button id="close-edit-modal-btn" class="btn-ghost" style="padding: 4px;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="edit-profile-form">
          <!-- Profile Picture Picker -->
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--border-color); overflow: hidden;" id="modal-pfp-preview">
              ${e.profilePicture?`<img src="${e.profilePicture}" style="width:100%;height:100%;object-fit:cover;" />`:`<div class="avatar" style="width:100%;height:100%;font-size:24px;">${e.name?e.name.charAt(0).toUpperCase():`S`}</div>`}
            </div>
            <div>
              <label class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; cursor: pointer;">
                Change Photo
                <input type="file" id="edit-pfp-input" accept="image/*" style="display: none;" />
              </label>
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Full Name</label>
          <input type="text" id="edit-name" class="input-field" value="${I(e.name||``)}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Username</label>
          <input type="text" id="edit-username" class="input-field" value="${I(e.username||``)}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Bio / Description</label>
          <textarea id="edit-bio" class="input-field" rows="2" style="resize: none;">${I(e.bio||``)}</textarea>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Campus Motto / Quote</label>
          <input type="text" id="edit-tagline" class="input-field" value="${I(e.tagline||``)}" placeholder="Your personal slogan..." />

          <!-- Interest / Club Tags (self-chosen, up to LIMITS.PROFILE_TAG_MAX_COUNT) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block; margin-top: 6px;">Interests & Clubs (up to ${B.PROFILE_TAG_MAX_COUNT})</label>
          <div id="edit-tags-chips" style="display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0 8px;"></div>
          <input type="text" id="edit-tag-input" class="input-field" placeholder="Type a tag and press Enter..." maxlength="${B.PROFILE_TAG_MAX_LENGTH}" style="margin-bottom: 10px;" />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Tag Color</label>
          <div style="display: grid; grid-template-columns: repeat(9, 1fr); gap: 6px; margin-bottom: 14px;" id="tag-color-swatches-container">
            ${o}
          </div>

          <!-- Cover Banner Gradient Selection (24 Presets) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-top: 6px; display: block;">Cover Banner Theme (24 Gradients)</label>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px;" id="banner-swatches-container">
            ${s}
          </div>

          <!-- Quote Background Theme Selection (12 Presets) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Quote Theme (12 Styles)</label>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px;" id="quote-swatches-container">
            ${c}
          </div>

          <!-- Visual Custom User Font Cards Grid -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Profile & Post Font Theme (Visual Cards)</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;" id="font-cards-container">
            ${l}
          </div>

          <!-- Visual Custom Quote Font Cards Grid -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Quote Motto Font Style (Visual Cards)</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;" id="quote-font-cards-container">
            ${u}
          </div>

          <div id="edit-profile-error" class="error-text" style="display: none;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px;">
            <button type="button" id="cancel-edit-modal-btn" class="btn btn-outline">Cancel</button>
            <button type="submit" id="save-edit-profile-btn" class="btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `}function nr(e,t){let n=document.getElementById(`edit-profile-modal`),r=document.getElementById(`edit-profile-btn`),i=document.getElementById(`close-edit-modal-btn`),a=document.getElementById(`cancel-edit-modal-btn`),o=document.getElementById(`edit-profile-form`),s=document.getElementById(`edit-pfp-input`),c=document.getElementById(`modal-pfp-preview`),l=document.getElementById(`edit-profile-error`),u=document.getElementById(`save-edit-profile-btn`),d=e.bannerPreset||Ln[0].id,f=e.quotePreset||Rn[0].id,p=e.fontId||Kt[0].id,m=e.quoteFontId||zn[0].id,h=e.profilePicture||``,g=Array.isArray(e.tags)?[...e.tags]:[],_=e.tagColorId||Vn[0].id;r&&r.addEventListener(`click`,()=>{n.style.display=`flex`});let v=()=>{n.style.display=`none`};i&&i.addEventListener(`click`,v),a&&a.addEventListener(`click`,v),t.querySelectorAll(`.banner-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.banner-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,d=e.dataset.id})}),t.querySelectorAll(`.quote-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.quote-swatch`).forEach(e=>e.style.boxShadow=`none`),e.style.boxShadow=`0 0 0 2px var(--accent-primary)`,f=e.dataset.id})}),t.querySelectorAll(`.font-card-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.font-card-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,p=e.dataset.id})}),t.querySelectorAll(`.quote-font-card-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.quote-font-card-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,m=e.dataset.id})}),t.querySelectorAll(`.tag-color-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.tag-color-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,_=e.dataset.id,C()})});let b=document.getElementById(`edit-tags-chips`),x=document.getElementById(`edit-tag-input`),S=()=>Vn.find(e=>e.id===_)||Vn[0],C=()=>{if(!b)return;let e=S();b.innerHTML=g.map(t=>`
      <span class="brand-badge tag-chip" data-tag="${I(t)}" style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; padding: 4px 8px 4px 10px; background: ${e.bg}; color: ${e.text}; border-color: transparent;">
        ${I(t)}
        <span class="material-symbols-outlined remove-tag-chip" style="font-size: 14px; cursor: pointer;" title="Remove">close</span>
      </span>
    `).join(``),x&&(x.disabled=g.length>=B.PROFILE_TAG_MAX_COUNT)};return C(),b&&b.addEventListener(`click`,e=>{let t=e.target.closest(`.remove-tag-chip`);if(!t)return;let n=t.closest(`.tag-chip`)?.dataset.tag;g=g.filter(e=>e!==n),C()}),x&&x.addEventListener(`keydown`,e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=x.value.trim();if(!t||g.length>=B.PROFILE_TAG_MAX_COUNT)return;let n=t.slice(0,B.PROFILE_TAG_MAX_LENGTH);if(g.some(e=>e.toLowerCase()===n.toLowerCase())){x.value=``;return}g.push(n),x.value=``,C()}),s&&s.addEventListener(`change`,async e=>{let t=e.target.files[0];if(t)try{h=await Hn(t),c.innerHTML=`<img src="${h}" style="width:100%;height:100%;object-fit:cover;" />`}catch(e){alert(e.message||`Failed to process image`)}}),o&&o.addEventListener(`submit`,async e=>{e.preventDefault(),l.style.display=`none`;let n=document.getElementById(`edit-name`).value.trim(),r=document.getElementById(`edit-username`).value.trim(),i=document.getElementById(`edit-bio`).value.trim(),a=document.getElementById(`edit-tagline`).value.trim();if(!Fn(r)){l.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,l.style.display=`block`;return}u.disabled=!0,u.textContent=`Saving...`;try{await Oe(y.currentUser.uid,{name:n,username:r,bio:i,tagline:a,tags:g,tagColorId:_,bannerPreset:d,quotePreset:f,fontId:p,quoteFontId:m,profilePicture:h}),v(),er(t)}catch(e){console.error(e),l.textContent=e.message||`Failed to save profile changes.`,l.style.display=`block`,u.disabled=!1,u.textContent=`Save Changes`}}),()=>{layoutCleanup&&layoutCleanup(),userPostsUnsub&&=(userPostsUnsub(),null)}}async function rr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <h1 class="header-title">Friends</h1>
    </header>
    ${q(3)}
  `,`#/friends`);let t=y.currentUser.uid,n=await ot(t),r=n.filter(e=>e.isMutual),i=n.filter(e=>!e.isMutual),a=`all`;function o(e){return e.length===0?`
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">group_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">No Friends in this category</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px; max-width: 360px; margin-left: auto; margin-right: auto;">
            ${a===`real`?`No mutual friends yet! When classmates add you back, they will appear here as Real Friends.`:`No one-sided friends.`}
          </p>
          <a href="#/search" class="btn" style="margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
            <span class="material-symbols-outlined">search</span>
            Search Campus Directory
          </a>
        </div>
      `:`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${e.map(e=>{let t=J(e),n=H(e,50,`border: 1px solid var(--border-color);`),r=e.name?I(e.name):`Student`,i=e.username?I(e.username):`student`,a=e.isMutual;return`
            <div class="card fade-in friend-card" style="padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; gap: 14px;" data-username="${i}">
              <div style="display: flex; align-items: center; gap: 14px; min-width: 0;">
                ${n}
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span style="font-size: 16px; font-weight: 800; color: var(--text-primary); font-family: ${t}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${r}
                    </span>
                    ${e.verifiedStudent?`<span class="material-symbols-outlined verified-icon" style="font-size: 16px;">verified</span>`:``}

                    <!-- Real vs One-Sided Friend Badge -->
                    <span class="brand-badge" style="font-size: 10px; font-weight: 700; ${a?`background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C;`:`background: rgba(255, 170, 0, 0.2); color: #FFAA00; border-color: #FFAA00;`}">
                      ${a?`💙 Real Friend (Mutual)`:`👀 One-Sided Friend`}
                    </span>
                  </div>
                  
                  <span style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">@${i} · Class ${I(e.class||`N/A`)}</span>
                  ${e.tagline?`<span style="font-size: 12px; font-style: italic; color: var(--accent-primary); margin-top: 2px;">“${I(e.tagline)}”</span>`:``}
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                <a href="#/profile?u=${i}" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px;">
                  View Profile
                </a>
                <button class="btn btn-outline remove-friend-btn" data-uid="${e.uid}" style="font-size: 12px; padding: 6px 12px; border-color: var(--error-color); color: var(--error-color);">
                  Remove
                </button>
              </div>
            </div>
          `}).join(``)}
      </div>
    `}e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">group</span>
          <h1 class="header-title">SJC Friends Roster (${n.length})</h1>
        </div>

        <a href="#/search" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">person_add</span>
          Find Classmates
        </a>
      </div>
    </header>

    <!-- Filter Tabs (All vs Real vs One-Sided) -->
    <div class="header-tabs">
      <button class="tab-button active" id="tab-all-friends">All (${n.length})</button>
      <button class="tab-button" id="tab-real-friends">💙 Real Friends (${r.length})</button>
      <button class="tab-button" id="tab-onesided-friends">👀 One-Sided (${i.length})</button>
    </div>

    <div style="padding: 20px;" class="fade-in" id="friends-list-container">
      ${o(n)}
    </div>
  `,`#/friends`);let s=K(),c=document.getElementById(`friends-list-container`),l=document.getElementById(`tab-all-friends`),u=document.getElementById(`tab-real-friends`),d=document.getElementById(`tab-onesided-friends`);function f(){c.querySelectorAll(`.friend-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.btn`)){let t=e.dataset.username;window.location.hash=`#/profile?u=${t}`}})}),c.querySelectorAll(`.remove-friend-btn`).forEach(t=>{t.addEventListener(`click`,async n=>{n.stopPropagation();let r=t.dataset.uid;t.disabled=!0;try{await rt(r),rr(e)}catch(e){alert(e.message||`Failed to remove friend.`),t.disabled=!1}})})}return f(),l.addEventListener(`click`,()=>{a=`all`,l.classList.add(`active`),u.classList.remove(`active`),d.classList.remove(`active`),c.innerHTML=o(n),f()}),u.addEventListener(`click`,()=>{a=`real`,u.classList.add(`active`),l.classList.remove(`active`),d.classList.remove(`active`),c.innerHTML=o(r),f()}),d.addEventListener(`click`,()=>{a=`onesided`,d.classList.add(`active`),l.classList.remove(`active`),u.classList.remove(`active`),c.innerHTML=o(i),f()}),()=>{s&&s()}}var ir=null;function ar(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <h1 class="header-title">Notifications</h1>
    </header>
    ${q(3)}
  `,`#/notifications`);let t=y.currentUser.uid;e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">notifications</span>
          <h1 class="header-title">Notifications Center</h1>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="mark-all-read-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px;">
            ✓ Mark All Read
          </button>
          <button id="clear-read-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; border-color: var(--border-color);">
            🗑️ Clear Read
          </button>
        </div>
      </div>
    </header>

    <div id="notifications-feed-container" style="padding: 16px;">
      ${q(3)}
    </div>
  `,`#/notifications`);let n=K(),r=document.getElementById(`notifications-feed-container`),i=document.getElementById(`mark-all-read-btn`),a=document.getElementById(`clear-read-btn`);return i&&i.addEventListener(`click`,async()=>{i.disabled=!0;try{await ge(t)}catch(e){console.error(e)}finally{i.disabled=!1}}),a&&a.addEventListener(`click`,async()=>{a.disabled=!0;try{await _e(t)}catch(e){console.error(e)}finally{a.disabled=!1}}),ir&&ir(),ir=me(t,e=>{if(!r)return;if(e.length===0){r.innerHTML=`
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">notifications_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">All Clear!</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px;">
            You have no notifications or report alerts at this time.
          </p>
        </div>
      `;return}let n=``;e.forEach(e=>{let t=!e.read,r=e.type===`MODERATION`,i=e.type===`FRIEND_REQUEST`,a=e.type===`MENTION`,o=`notifications`,s=`var(--accent-primary)`,c=`NOTIFICATION`,l=``;r?(o=`warning`,s=`var(--error-color)`,c=`MODERATION ALERT`,l=`background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);`):i?(o=`person_add`,s=`var(--success-color)`,c=`NEW FRIEND`,l=`background: rgba(0, 186, 124, 0.2); color: var(--success-color); border-color: var(--success-color);`):a&&(o=`alternate_email`,s=`var(--accent-primary)`,c=`TAGGED YOU`,l=`background: rgba(29, 155, 240, 0.2); color: var(--accent-primary); border-color: var(--accent-primary);`),n+=`
        <div class="card fade-in notif-item" data-notif-id="${e.notificationId}" data-post-id="${e.postId||``}" data-poll-id="${e.pollId||``}" data-petition-id="${e.petitionId||``}" style="padding: 16px; border-radius: 16px; margin-bottom: 12px; border: ${t?`2px solid var(--accent-primary)`:`1px solid var(--border-color)`}; background: ${t?`rgba(29, 155, 240, 0.05)`:`var(--bg-secondary)`}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: ${r?`rgba(244, 33, 46, 0.15)`:i?`rgba(0, 186, 124, 0.15)`:`var(--bg-tertiary)`}; display: flex; align-items: center; justify-content: center; color: ${s}; flex-shrink: 0;">
              <span class="material-symbols-outlined" style="font-size: 20px;">
                ${o}
              </span>
            </div>

            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="brand-badge" style="font-size: 10px; ${l}">
                  ${c}
                </span>
                <span class="time-ago" data-timestamp="${e.timestamp}" style="font-size: 12px; color: var(--text-secondary);">${V(e.timestamp)}</span>
              </div>

              <div style="font-size: 14px; line-height: 1.4; color: var(--text-primary); font-weight: ${t?`700`:`400`};">
                ${I(e.text)}
              </div>

              ${t?`
                <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                  <button class="btn btn-outline mark-read-btn" data-notif-id="${e.notificationId}" style="font-size: 11px; padding: 4px 10px;">
                    Mark as Read
                  </button>
                </div>
              `:``}
            </div>
          </div>
        </div>
      `}),r.innerHTML=n,r.querySelectorAll(`.notif-item`).forEach(e=>{e.addEventListener(`click`,async n=>{if(!n.target.closest(`.mark-read-btn`)){let n=e.dataset.notifId,r=e.dataset.postId,i=e.dataset.pollId,a=e.dataset.petitionId;await he(t,n),i?window.location.hash=`#/poll?id=${i}`:a?window.location.hash=`#/petition?id=${a}`:r&&(window.location.hash=`${O.POST_DETAIL}?id=${r}`)}})}),r.querySelectorAll(`.mark-read-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.notifId;e.disabled=!0,await he(t,r)})})}),()=>{n&&n(),ir&&=(ir(),null)}}var or=`backbench_liked_replies`;function sr(){try{let e=localStorage.getItem(or);return e?new Set(JSON.parse(e)):new Set}catch{return new Set}}function cr(e){try{localStorage.setItem(or,JSON.stringify(Array.from(e)))}catch{}}function lr(e){return sr().has(e)}function ur(e){let t=sr();t.add(e),cr(t)}var dr=null;async function fr(e){if(!y.currentUser){window.location.hash=`#/login`;return}let t=y.currentUser.uid;e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>
    ${q(2)}
  `,O.HOME);let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){pr(e,`No post ID provided.`);return}let i=await Wn(r);if(!i){pr(e,`This post has been deleted or does not exist.`);return}let a=await R(i.authorId),o=y.currentUser,s=H(o.photoURL||``,40),c=i.isAnonymous===!0,l=c?`<div class="avatar" style="width: 48px; height: 48px; font-size: 22px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:H(a,48,`border: 1px solid var(--border-color);`),u=c?`Anonymous 1`:a?.name?I(a.name):`Anonymous Student`,d=c?`anonymous`:a?.username?I(a.username):`student`,f=!c&&(a?.isTeacher||a?.role===`teacher`),p=!c&&(a?.verifiedStudent||a?.role===`staff`||a?.role===`admin`||f),m=c?`'Inter', sans-serif`:J(a),h=new Map;h.set(i.authorId,1);let g=2;function _(e){return h.has(e)||h.set(e,g++),h.get(e)}function v(e){let t=[`linear-gradient(135deg, #6366f1, #8b5cf6)`,`linear-gradient(135deg, #f97316, #ef4444)`,`linear-gradient(135deg, #14b8a6, #06b6d4)`,`linear-gradient(135deg, #ec4899, #f43f5e)`,`linear-gradient(135deg, #eab308, #f97316)`,`linear-gradient(135deg, #22c55e, #10b981)`,`linear-gradient(135deg, #3b82f6, #6366f1)`,`linear-gradient(135deg, #a855f7, #ec4899)`];return`<div class="avatar" style="width: 38px; height: 38px; font-size: 14px; background: ${t[(e-1)%t.length]}; font-weight: 800;">A${e}</div>`}let b=new Date(i.timestamp||Date.now()),x=b.toLocaleTimeString(`en-US`,{hour:`numeric`,minute:`2-digit`}),S=b.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`});e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>

    <!-- Main Full Post View -->
    <article class="fade-in" style="padding: 16px; border-bottom: 1px solid var(--border-color);">
      <!-- Author Meta -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        ${c?`<div style="display: flex; align-items: center; gap: 12px;">
        ${l}
        <div style="display: flex; flex-direction: column;">
          <span style="font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 4px; font-family: ${m};">
            Anonymous Student
          </span>
          <span style="color: var(--text-secondary); font-size: 14px;">@anonymous</span>
        </div>
      </div>`:`<a href="#/profile?u=${d}" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;" title="View @${d}'s profile">
        ${l}
        <div style="display: flex; flex-direction: column;">
          <span style="font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 4px; font-family: ${m};">
            ${u}
            ${f?`
              <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
              </span>
            `:p?`
              <span class="material-symbols-outlined verified-icon">verified</span>
            `:``}
          </span>
          <span style="color: var(--text-secondary); font-size: 14px;">@${d}</span>
        </div>
      </a>`}

        <button class="btn-ghost" id="post-detail-options-btn" title="Options">
          <span class="material-symbols-outlined" style="font-size: 20px;">more_horiz</span>
        </button>
      </div>

      <!-- Main Post Content (Large Text with Clickable Hashtags) -->
      <div id="post-detail-content" style="font-size: 19px; line-height: 1.5; color: var(--text-primary); margin-bottom: 16px; word-break: break-word; font-family: ${m};">
        ${L(i.content)}
      </div>

      <!-- Post Timestamp & Analytics Row -->
      <div style="padding: 12px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 14px; display: flex; gap: 6px;">
        <span>${x}</span>
        <span>·</span>
        <span>${S}</span>
      </div>



      <!-- Interactive Actions Row -->
      <div style="display: flex; justify-content: space-around; padding-top: 12px; border-bottom: 1px solid var(--border-subtle);">
        <button class="action-btn reply-btn" title="Reply">
          <span class="material-symbols-outlined">chat_bubble</span>
          <span id="post-reply-stat">${i.replyCount||0}</span>
        </button>
        <button class="action-btn reshare-btn" id="post-detail-reshare-btn" title="Reshare">
          <span class="material-symbols-outlined">repeat</span>
          <span class="reshare-count" id="post-reshare-stat">${i.reshares||0}</span>
        </button>
        <button class="action-btn like-btn" id="post-detail-like-btn" title="Like">
          <span class="material-symbols-outlined">favorite</span>
          <span class="like-count" id="post-likes-stat">${i.likes||0}</span>
        </button>
        <button class="action-btn" title="Share">
          <span class="material-symbols-outlined">share</span>
        </button>
      </div>
    </article>

    <!-- Reply Composer -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;" class="fade-in">
      ${s}
      <div style="flex: 1; min-width: 0;">
        <textarea id="reply-input" class="input-field" placeholder="Post your reply..." rows="2" style="resize: none; font-size: 15px; border: none; background: transparent; padding: 0; outline: none; box-shadow: none;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <span id="reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${B.MAX_CHARS}</span>
          <button id="submit-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Replies Feed Container -->
    <div id="replies-feed-container">
      ${q(2)}
    </div>
  `,O.HOME);let C=K(),w=document.querySelector(`.right-sidebar`);w&&Ee(i.postId,i.hashtags||[],3).then(async e=>{if(e&&e.length>0){let t=document.createElement(`div`);t.className=`widget-card fade-in`;let n=`
          <div class="widget-title">
            <span>Related Campus Posts</span>
            <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 20px;">explore</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
        `;for(let t of e){let e=await R(t.authorId);e?.name&&I(e.name),n+=`
            <div style="cursor: pointer; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);" onclick="window.location.hash='#${O.POST_DETAIL}?id=${t.postId}'">
              <div style="color: var(--text-secondary); font-size: 11px; font-weight: 700;">@${I(e?.username||`student`)}</div>
              <div style="color: var(--text-primary); font-weight: 600; line-height: 1.3; margin-top: 2px;">${I(t.content.substring(0,75))}${t.content.length>75?`...`:``}</div>
            </div>
          `}n+=`</div>`,t.innerHTML=n,w.insertBefore(t,w.children[1])}}).catch(e=>console.error(e));let T=document.getElementById(`reply-input`);An(T);let E=document.getElementById(`reply-char-counter`),D=document.getElementById(`submit-reply-btn`),k=document.getElementById(`replies-feed-container`),A=document.getElementById(`post-detail-like-btn`),j=document.getElementById(`post-likes-stat`),M=document.getElementById(`post-detail-reshare-btn`),P=document.getElementById(`post-reshare-stat`),ee=document.getElementById(`post-detail-options-btn`);ee&&ee.addEventListener(`click`,async e=>{e.stopPropagation();let n=t?await R(t):null,a=n?.role===`staff`||n?.role===`admin`;X(ee,{itemId:r,authorId:i.authorId,currentUid:y.currentUser?.uid,isStaff:a,itemType:`post`,onDelete:async e=>{try{y.currentUser?.uid===i.authorId?await Pe(e):a&&await Bt(e),window.history.back()}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(e,t)=>{try{(await Ht(e,t)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),window.history.back()):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})});try{let e=await Ae(r,y.currentUser?.uid);A&&e&&(A.style.color=`var(--error-color)`);let t=await Me(r,y.currentUser?.uid);M&&t&&(M.style.color=`#00BA7C`)}catch(e){console.error(`Error fetching initial like/reshare state`,e)}A&&A.addEventListener(`click`,async()=>{A.disabled=!0;try{let e=await ke(r);e.liked?A.style.color=`var(--error-color)`:A.style.color=``,j&&(j.textContent=e.likes)}catch(e){console.error(e)}finally{A.disabled=!1}}),M&&M.addEventListener(`click`,async()=>{M.disabled=!0;try{let e=await je(r);e.reshared?M.style.color=`#00BA7C`:M.style.color=``,P&&(P.textContent=e.reshares)}catch(e){console.error(e)}finally{M.disabled=!1}}),T.addEventListener(`input`,()=>{let e=T.value.trim().replace(/\s/g,``).length;E.textContent=`${e} / ${B.MAX_CHARS}`,e>B.MAX_CHARS?(E.style.color=`var(--error-color)`,D.disabled=!0):e===0?(E.style.color=`var(--text-secondary)`,D.disabled=!0):(E.style.color=`var(--accent-primary)`,D.disabled=!1)}),D.addEventListener(`click`,async()=>{let e=T.value.trim(),t=e.replace(/\s/g,``);if(t.length>0&&t.length<=B.MAX_CHARS){D.disabled=!0,D.textContent=`Replying...`;try{await Gn(r,e),T.value=``,T.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(`Failed to submit reply. Please try again.`)}finally{D.textContent=`Reply`}}}),dr&&dr(),dr=qn(i.postId,async e=>{if(!k)return;if(e.length===0){k.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <p style="font-size: 14px;">No replies yet. Be the first classmate to reply!</p>
        </div>
      `;return}let n=new Map,r=[];for(let t of e)t.children=[],n.set(t.replyId,t);for(let t of e)t.parentReply&&n.has(t.parentReply)?n.get(t.parentReply).children.push(t):r.push(t);let a=``,o=async(e,n=0)=>{let r=``;for(let i of e){let e=await R(i.authorId),a=t?await Xn(i.replyId):!1,s,l,u,d,f,p;if(c){let e=_(i.authorId);s=v(e),l=`Anonymous ${e}`,u=`anonymous_${e}`,d=!1,f=!1,p=`'Inter', sans-serif`}else s=H(e,38,`border: 1px solid var(--border-color);`),l=e?.name?I(e.name):`Student`,u=e?.username?I(e.username):`student`,d=e?.isTeacher||e?.role===`teacher`,f=e?.verifiedStudent||e?.role===`staff`||e?.role===`admin`||d,p=J(e);let m=n>0?`${Math.min(n*32,64)}px`:`0px`,h=n>0?`border-left: 2px solid var(--border-color); border-bottom: none;`:`border-bottom: 1px solid var(--border-color);`;r+=`
          <div class="fade-in reply-item-container" data-reply-id="${i.replyId}" style="padding: 16px 16px 16px ${n===0?`16px`:`0`}; ${h} margin-left: ${m}; display: flex; gap: 12px; position: relative;">
            ${n>0?`<div style="position: absolute; left: -18px; top: 24px; width: 16px; height: 2px; background: var(--border-color);"></div>`:``}
            ${s}
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <span style="font-weight: 700; font-size: 14px; color: var(--text-primary); font-family: ${p};">${l}</span>
                  ${d?`
                    <span class="brand-badge" style="font-size: 9px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C;">Faculty</span>
                  `:f?`
                    <span class="material-symbols-outlined verified-icon" style="font-size: 14px;">verified</span>
                  `:``}
                  <span style="font-size: 13px; color: var(--text-secondary);">@${u}</span>
                  <span style="color: var(--text-secondary);">·</span>
                  <span class="time-ago" data-timestamp="${i.timestamp}" style="font-size: 13px; color: var(--text-secondary);">${V(i.timestamp)}</span>
                  ${i.edited?`<span style="font-size: 11px; color: var(--text-secondary); margin-left: 4px; font-style: italic;">(edited)</span>`:``}
                </div>
              </div>

              <div class="reply-content-box" style="font-size: 15px; color: var(--text-primary); line-height: 1.4; font-family: ${p};">
                ${L(i.content)}
              </div>

              <div style="display: flex; gap: 16px; margin-top: 8px;">
                <button class="btn-ghost inline-like-reply-btn ${lr(i.replyId)?`liked`:``}" data-reply-id="${i.replyId}" style="font-size: 12px; color: var(--text-secondary); padding: 4px; display: flex; align-items: center; gap: 4px;" title="Like">
                  <span class="material-symbols-outlined" style="font-size: 16px;">favorite</span>
                  <span class="reply-like-count">${i.likes||0}</span>
                </button>
                <button class="btn-ghost inline-reply-btn" data-reply-id="${i.replyId}" style="font-size: 12px; color: var(--text-secondary); padding: 4px; display: flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">chat_bubble</span> Reply
                </button>
                <button class="btn-ghost inline-save-btn ${a?`saved`:``}" data-reply-id="${i.replyId}" style="font-size: 12px; color: ${a?`var(--accent-primary)`:`var(--text-secondary)`}; padding: 4px; display: flex; align-items: center; gap: 4px;" title="Bookmark">
                  <span class="material-symbols-outlined" style="font-size: 16px;">bookmark</span>
                </button>
                ${i.authorId===t?`
                  <button class="btn-ghost inline-edit-reply-btn" data-reply-id="${i.replyId}" style="font-size: 12px; color: var(--text-secondary); padding: 4px; display: flex; align-items: center; gap: 4px;" title="Edit">
                    <span class="material-symbols-outlined" style="font-size: 16px;">edit</span> Edit
                  </button>
                `:``}
              </div>

              <div class="inline-composer-container" id="composer-for-${i.replyId}" style="display: none; margin-top: 12px;">
                <div style="display: flex; gap: 8px;">
                  <input type="text" class="input-field inline-reply-input" placeholder="Reply to @${u}..." style="font-size: 14px; padding: 8px 12px;" />
                  <button class="btn submit-inline-reply-btn" data-reply-id="${i.replyId}" style="padding: 8px 16px;">Send</button>
                </div>
              </div>
            </div>
          </div>
        `,i.children.length>0&&(r+=await o(i.children,n+1))}return r};a=await o(r),k.innerHTML=a,k.querySelectorAll(`.inline-reply-input`).forEach(An),k.querySelectorAll(`.inline-like-reply-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId;if(!lr(t)){e.disabled=!0;try{let{likeReply:n}=await U(async()=>{let{likeReply:e}=await Promise.resolve().then(()=>Un);return{likeReply:e}},void 0,import.meta.url),r=await n(i.postId,t),a=e.querySelector(`.reply-like-count`);a&&(a.textContent=r),ur(t),e.classList.add(`liked`,`heart-pop`)}catch(e){console.error(e)}finally{e.disabled=!1}}})}),k.querySelectorAll(`.inline-reply-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.replyId,n=document.getElementById(`composer-for-${t}`);n&&(n.style.display=n.style.display===`none`?`block`:`none`,n.style.display===`block`&&n.querySelector(`.inline-reply-input`).focus())})}),k.querySelectorAll(`.submit-inline-reply-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId,n=document.getElementById(`composer-for-${t}`),r=n.querySelector(`.inline-reply-input`),a=r.value.trim();if(a){e.disabled=!0,e.textContent=`...`;try{let{createReply:e}=await U(async()=>{let{createReply:e}=await Promise.resolve().then(()=>Un);return{createReply:e}},void 0,import.meta.url);await e(i.postId,a,t),r.value=``,n.style.display=`none`}catch(e){console.error(e),alert(`Failed to send reply.`)}finally{e.disabled=!1,e.textContent=`Send`}}})}),k.querySelectorAll(`.inline-edit-reply-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId,n=e.closest(`.reply-item-container`).querySelector(`.reply-content-box`);if(!n)return;let r=n.innerText,a=await N(`Edit your reply:`,r,``,null,null,189);if(a!==null&&a.trim()!==r.trim())try{let{editReply:e}=await U(async()=>{let{editReply:e}=await Promise.resolve().then(()=>Un);return{editReply:e}},void 0,import.meta.url);await e(i.postId,t,a)}catch(e){console.error(e),alert(e.message||`Failed to edit reply.`)}})}),k.querySelectorAll(`.inline-save-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId;e.disabled=!0;try{await Zn(i.postId,t)?(e.classList.add(`saved`),e.style.color=`var(--accent-primary)`):(e.classList.remove(`saved`),e.style.color=`var(--text-secondary)`)}catch(e){console.error(e),alert(e.message||`Failed to save reply.`)}finally{e.disabled=!1}})})});let te=Re(r,e=>{if(!e)return;let t=document.getElementById(`post-detail-content`);t&&(t.innerHTML=L(e.content));let n=document.getElementById(`post-likes-stat`);n&&(n.textContent=e.likes||0);let r=document.getElementById(`post-reshare-stat`);r&&(r.textContent=e.reshares||0);let i=document.getElementById(`post-reply-stat`);i&&(i.textContent=e.replyCount||0)});return()=>{C&&C(),te&&te(),dr&&=(dr(),null)}}function pr(e,t){e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">error_outline</span>
      <h2 style="font-size: 20px; font-weight: 800;">Post Unavailable</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${t}</p>
    </div>
  `,O.HOME);let n=K();return()=>{n&&n()}}function mr(e){e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Search & Friends</h1>
    </header>

    <!-- Search Input Area -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="search-box">
        <span class="material-symbols-outlined">search</span>
        <input type="text" id="dedicated-search-input" placeholder="Search by name, @username, admission no, or class..." style="font-size: 15px; padding: 14px 16px 14px 44px;" />
      </div>
      <p style="color: var(--text-secondary); font-size: 13px; margin-top: 8px; margin-left: 4px;">
        Type at least 3 characters to search St. Joseph's College campus members.
      </p>
    </div>

    <!-- Results Container -->
    <div id="dedicated-search-results" style="padding: 16px;">
      <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">person_search</span>
        <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">Search Campus</h3>
        <p style="font-size: 14px;">Find classmates, friends, and staff members across SJC.</p>
      </div>
    </div>
  `,`#/search`);let t=K(),n=document.getElementById(`dedicated-search-input`),r=document.getElementById(`dedicated-search-results`);return n.addEventListener(`input`,async()=>{let e=n.value,t=e.trim().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3){r.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">person_search</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">Search Campus</h3>
          <p style="font-size: 14px;">Type at least 3 characters to start filtering.</p>
        </div>
      `;return}r.innerHTML=`<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Searching campus database...</div>`;try{let n=await et(e);if(n.length===0){r.innerHTML=`
          <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
            <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">no_accounts</span>
            <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No results found</h3>
            <p style="font-size: 14px;">No student or staff found matching "${I(t)}".</p>
          </div>
        `;return}let i=``;for(let e of n){let t=await tt(e.uid),n=e.name?e.name.charAt(0).toUpperCase():`?`;i+=`
          <div class="card fade-in" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; margin-bottom: 12px; border-radius: var(--border-radius);">
            <div style="display: flex; align-items: center; gap: 14px; cursor: pointer;" class="user-profile-link" data-username="${I(e.username)}">
              <div class="avatar" style="width: 44px; height: 44px;">${n}</div>
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${I(e.name)}</span>
                <span style="font-size: 14px; color: var(--text-secondary);">@${I(e.username)} · Class ${I(e.class||`N/A`)} · Adm ${I(e.admissionNumber||`N/A`)}</span>
              </div>
            </div>

            <button class="btn ${t?`btn-outline`:``} friend-action-btn" data-uid="${e.uid}">
              ${t?`Friends`:`+ Add Friend`}
            </button>
          </div>
        `}r.innerHTML=i,r.querySelectorAll(`.user-profile-link`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`#/profile?u=${e.dataset.username}`})}),r.querySelectorAll(`.friend-action-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.uid;e.disabled=!0;try{let t=await rt(n);e.textContent=t?`Friends`:`+ Add Friend`,e.className=`btn ${t?`btn-outline`:``} friend-action-btn`}catch(e){console.error(e)}finally{e.disabled=!1}})})}catch(e){console.error(e),r.innerHTML=`<div style="padding: 20px; text-align: center; color: var(--error-color);">Failed to search campus.</div>`}}),()=>{t&&t()}}async function hr(e){let t=y.currentUser;if(!t){window.location.hash=O.HOME;return}let r=await R(t.uid)||{};e.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; padding: 20px; background: radial-gradient(circle at top center, rgba(29, 155, 240, 0.08) 0%, transparent 60%);">
      <div class="card fade-in" style="width: 100%; max-width: 460px; padding: 32px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px);">
        
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
          <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #1D9BF0, #0077B5); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 28px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); margin-bottom: 12px;">
            B
          </div>
          <h1 style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; text-align: center;">
            Complete Your Campus Profile
          </h1>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px; text-align: center;">
            Provide your St. Joseph's College details to access Backbench.
          </p>
        </div>

        <form id="onboarding-form" style="display: flex; flex-direction: column;">
          <!-- Role Selector -->
          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Are you a Student or Teacher?</label>
          <div style="display: flex; gap: 10px; margin-bottom: 14px;">
            <button type="button" id="onboard-student-btn" class="btn" style="flex: 1; padding: 8px; font-size: 13px; font-weight: 700; border-radius: 10px; background: var(--accent-primary);">
              🎓 Student
            </button>
            <button type="button" id="onboard-teacher-btn" class="btn btn-outline" style="flex: 1; padding: 8px; font-size: 13px; font-weight: 700; border-radius: 10px;">
              👨‍🏫 Teacher / Faculty
            </button>
          </div>

          <label id="label-name" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Full Name</label>
          <input class="input-field" type="text" id="onboard-name" value="${t.displayName||r.name||``}" placeholder="Full Name" required />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Choose Username</label>
          <input class="input-field" type="text" id="onboard-username" value="${r.username||t.email?.split(`@`)[0]||``}" placeholder="Username (e.g. shashwat.gupta)" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label id="label-admission" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Admission No.</label>
              <input class="input-field" type="text" id="onboard-admission" value="${r.admissionNumber&&r.admissionNumber!==`N/A`?r.admissionNumber:``}" placeholder="e.g. 10420" required />
            </div>
            
            <div style="flex: 1;">
              <label id="label-class" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Class & Sec</label>
              <input class="input-field" type="text" id="onboard-class" value="${r.class&&r.class!==`N/A`?r.class:``}" placeholder="e.g. 12A" required />
            </div>
          </div>

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Mobile Number</label>
          <input class="input-field" type="tel" id="onboard-mobile" value="${r.mobile||``}" placeholder="Mobile Number" required />

          <div id="onboard-error" class="error-text" style="display: none; margin-top: 4px;"></div>

          <button type="submit" id="onboard-submit-btn" class="btn" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; margin-top: 8px; box-shadow: 0 4px 14px rgba(29, 155, 240, 0.3);">
            Complete & Enter Backbench
          </button>
        </form>
      </div>
    </div>
  `;let i=document.getElementById(`onboarding-form`),a=document.getElementById(`onboard-error`),o=document.getElementById(`onboard-submit-btn`),s=document.getElementById(`onboard-student-btn`),c=document.getElementById(`onboard-teacher-btn`),l=document.getElementById(`onboard-name`),u=document.getElementById(`onboard-admission`),d=document.getElementById(`onboard-class`),f=document.getElementById(`label-admission`),p=document.getElementById(`label-class`),h=r.role===`teacher`?`teacher`:`student`,g=e=>{h=e,e===`teacher`?(c.className=`btn`,c.style.background=`#00BA7C`,s.className=`btn btn-outline`,s.style.background=`transparent`,f.textContent=`Teacher / Employee ID`,u.placeholder=`e.g. T-104`,p.textContent=`Department`,d.placeholder=`e.g. Computer Science`,l.placeholder=`Official Faculty Name (e.g. Dr. Sharma)`):(s.className=`btn`,s.style.background=`var(--accent-primary)`,c.className=`btn btn-outline`,c.style.background=`transparent`,f.textContent=`Admission No.`,u.placeholder=`e.g. 10420`,p.textContent=`Class & Sec`,d.placeholder=`e.g. 12A`,l.placeholder=`Full Name`)};r.role===`teacher`&&g(`teacher`),s.addEventListener(`click`,()=>g(`student`)),c.addEventListener(`click`,()=>g(`teacher`)),i.addEventListener(`submit`,async e=>{e.preventDefault(),a.style.display=`none`;let i=l.value.trim(),s=document.getElementById(`onboard-username`).value.trim(),c=u.value.trim(),f=d.value.trim(),p=document.getElementById(`onboard-mobile`).value.trim();if(!Fn(s)){a.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,a.style.display=`block`;return}if(!c){a.textContent=h===`teacher`?`Employee / Teacher ID is required.`:`Admission Number is required.`,a.style.display=`block`;return}if(!f){a.textContent=h===`teacher`?`Department is required.`:`Class & Section is required.`,a.style.display=`block`;return}o.disabled=!0,o.textContent=`Saving Profile...`;try{await n(C(m,`${T.USERS}/${t.uid}`),{name:i,username:s,admissionNumber:c,class:f,mobile:p,isTeacher:h===`teacher`,role:h===`teacher`?`teacher`:r.role===`admin`?`admin`:`student`}),z(t.uid),window.location.hash=O.HOME}catch(e){console.error(e),a.textContent=e.message||`Failed to save profile details.`,a.style.display=`block`,o.disabled=!1,o.textContent=`Complete & Enter Backbench`}})}var gr=null;function _r(e){if(!e)return;let t=e.closest(`.feed-item-wrapper`)||e;t.style.transition=`opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s`,t.style.overflow=`hidden`,t.style.maxHeight=t.offsetHeight+`px`,t.offsetHeight,t.style.opacity=`0`,t.style.transform=`scale(0.95)`,t.style.maxHeight=`0px`,t.style.marginTop=`0px`,t.style.marginBottom=`0px`,t.style.paddingTop=`0px`,t.style.paddingBottom=`0px`,setTimeout(()=>t.remove(),450)}function vr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Petitions</h1>
    </header>

    <!-- Create Petition Builder Card -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="card" style="padding: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">campaign</span>
          Launch a Student Campus Petition
        </h3>

        <form id="create-petition-form" style="display: flex; flex-direction: column;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Petition Title</label>
          <input type="text" id="petition-title" class="input-field" placeholder="e.g. Petition to Extend SJC Library Hours during Exam Week" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Category</label>
              <select id="petition-category" class="input-field" style="background: var(--bg-primary);">
                <option value="Student Welfare">Student Welfare</option>
                <option value="Academics">Academics</option>
                <option value="Library">Library & Study</option>
                <option value="Canteen">Canteen & Dining</option>
                <option value="Sports">Sports & Clubs</option>
                <option value="Infrastructure">Campus Infrastructure</option>
              </select>
            </div>

            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Goal Signatures</label>
              <select id="petition-goal" class="input-field" style="background: var(--bg-primary);">
                <option value="50">50 Signatures</option>
                <option value="100" selected>100 Signatures</option>
                <option value="250">250 Signatures</option>
                <option value="500">500 Signatures</option>
              </select>
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Target Recipient</label>
          <input type="text" id="petition-recipient" class="input-field" value="St. Joseph's College Administration" placeholder="Target Authority (e.g. SJC Principal & Dean)" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Formal Petition Statement & Demand</label>
          <textarea id="petition-statement" class="input-field" rows="4" style="resize: none;" placeholder="We, the undersigned students of St. Joseph's College, respectfully petition the administration to..." required></textarea>

          <div id="petition-error" class="error-text" style="display: none; margin-bottom: 8px;"></div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="petition-anonymous-checkbox" style="width: 14px; height: 14px; accent-color: var(--accent-primary); cursor: pointer;" />
              Post anonymously
            </label>
            <button type="submit" id="submit-petition-btn" class="btn" style="font-weight: 700;">
              Launch Petition
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Active Petitions Feed -->
    <div id="petitions-feed-container" style="padding: 16px;">
      ${q(3)}
    </div>
  `,O.PETITIONS);let t=K(),n=document.getElementById(`create-petition-form`),r=document.getElementById(`petition-error`),i=document.getElementById(`submit-petition-btn`),a=document.getElementById(`petitions-feed-container`);return An(document.getElementById(`petition-title`)),An(document.getElementById(`petition-statement`)),n.addEventListener(`submit`,async e=>{e.preventDefault(),r.style.display=`none`;let t=document.getElementById(`petition-title`).value.trim(),a=document.getElementById(`petition-category`).value,o=document.getElementById(`petition-goal`).value,s=document.getElementById(`petition-recipient`).value.trim(),c=document.getElementById(`petition-statement`).value.trim(),l=document.getElementById(`petition-anonymous-checkbox`).checked;i.disabled=!0,i.textContent=`Publishing...`;try{await $t({title:t,category:a,goalSignatures:o,targetRecipient:s,statement:c,isAnonymous:l}),n.reset(),document.getElementById(`petition-recipient`).value=`St. Joseph's College Administration`,document.getElementById(`petition-anonymous-checkbox`).checked=!1}catch(e){r.textContent=e.message||`Failed to create petition.`,r.style.display=`block`}finally{i.disabled=!1,i.textContent=`Launch Petition`}}),gr&&gr(),gr=en(20,async e=>{if(e.length===0){a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active petitions</h3>
          <p style="font-size: 14px;">Launch the first campus petition above to champion student causes!</p>
        </div>
      `;return}let t=y.currentUser.uid,n=``;try{for(let r of e){let e=await R(r.creatorId),i=await nn(r.petitionId,t);n+=Xt(r,e,i)}a.innerHTML=n}catch(e){console.error(`Error rendering petitions feed:`,e),a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--error-color);">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px;">error_outline</span>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Failed to load petitions</h3>
          <p style="font-size: 14px; color: var(--text-secondary);">${I(e.message)}</p>
        </div>
      `;return}a.querySelectorAll(`.petition-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.sign-petition-feed-btn`)&&!t.target.closest(`.view-imprint-btn`)&&!t.target.closest(`.copy-petition-frame-btn`)&&!t.target.closest(`a`)){let t=e.dataset.petitionId;window.location.hash=`#/petition-frame?id=${t}`}})}),a.querySelectorAll(`.copy-petition-frame-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.petitionId,r=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${n}`;navigator.clipboard.writeText(r).then(()=>{let t=e.innerHTML;e.textContent=`✓ Copied!`,setTimeout(()=>{e.innerHTML=t},2e3)})})}),a.querySelectorAll(`.sign-petition-feed-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.petitionId;e.disabled=!0,e.textContent=`Signing...`;try{await rn(n),e.textContent=`✓ Signed`}catch(t){alert(t.message||`Failed to sign petition.`),e.disabled=!1,e.textContent=`✍️ Sign`}})}),a.querySelectorAll(`.petition-options-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.petitionId,i=e.dataset.authorId,a=await R(t),o=a?.role===`staff`||a?.role===`admin`;X(e,{itemId:r,authorId:i,currentUid:t,isStaff:o,itemType:`petition`,onDelete:async n=>{try{t===i?await on(n):o&&await Vt(n),_r(e.closest(`.petition-card`))}catch(e){alert(e.message||`Failed to delete petition.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}),()=>{t&&t(),gr&&=(gr(),null)}}async function yr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Petition Imprint</h1>
      </div>
    </header>
    ${q(2)}
  `,O.PETITIONS);let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){br(e,`No petition ID specified.`);return}let r=await tn(n);if(!r){br(e,`This campus petition does not exist.`);return}let i=await R(r.creatorId),a=y.currentUser.uid,o=await nn(r.petitionId,a);await an(r.petitionId);let s=r.signatureCount||0,c=r.goalSignatures||100,l=Math.min(100,Math.round(s/c*100)),u=s>=c,d=r.isAnonymous===!0,f=d?`Anonymous Student`:i?.name?I(i.name):`Student Representative`,p=d?`anonymous`:i?.username?I(i.username):`student`,m=new Date(r.timestamp||Date.now()).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`});e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header print-hide">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()" title="Back">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Petition Imprint Document</h1>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="copy-detail-frame-link-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span>
            Copy Frame Link
          </button>
          <a href="#/petition-frame?id=${r.petitionId}" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; text-decoration: none;">
            <span class="material-symbols-outlined" style="font-size: 18px;">filter_frames</span>
            Paper Frame Mode
          </a>
          <button id="print-petition-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">print</span>
            Export PDF / Print
          </button>
        </div>
      </div>
    </header>

    <!-- Official Signed Imprint Charter Document (Printable) -->
    <div id="imprint-document-container" class="fade-in" style="padding: 24px 20px;">
      
      <!-- Official SJC Imprint Seal Header -->
      <div class="imprint-seal-header" style="border: 2px solid var(--border-color); border-radius: 20px; padding: 24px; background: linear-gradient(135deg, rgba(29, 155, 240, 0.08) 0%, rgba(22, 24, 28, 0.95) 100%); margin-bottom: 24px; position: relative;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/favicon.png" style="width: 48px; height: 48px; border-radius: 14px; box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3); object-fit: cover;" alt="Logo" />
            <div>
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: var(--accent-primary); text-transform: uppercase;">ST. JOSEPH'S COLLEGE</span>
              <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-top: 1px;">STUDENT CHARTER & PETITION IMPRINT</h2>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px;">${I(r.category)}</span>
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px; background: ${u?`rgba(0, 186, 124, 0.2)`:`rgba(29, 155, 240, 0.15)`}; color: ${u?`#00BA7C`:`var(--accent-primary)`}; border-color: ${u?`#00BA7C`:`var(--accent-primary)`};">
              ${u?`🎉 GOAL ACHIEVED`:`ACTIVE PETITION`}
            </span>
          </div>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); display: flex; flex-wrap: wrap; gap: 20px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <div><strong style="color: var(--text-primary);">Target Recipient:</strong> ${I(r.targetRecipient)}</div>
          <div><strong style="color: var(--text-primary);">Date Submitted:</strong> ${m}</div>
          <div><strong style="color: var(--text-primary);">Document ID:</strong> ${I(r.petitionId)}</div>
        </div>
      </div>

      <!-- Main Petition Title & Progress -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--text-primary); line-height: 1.35; margin-bottom: 12px;">
          ${L(r.title)}
        </h1>

        <!-- Signature Progress Bar -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; margin-bottom: 8px;">
            <span style="font-weight: 700; color: var(--text-primary);">
              <strong id="signature-count-display" style="font-size: 18px; color: var(--accent-primary);">${s}</strong> signatures collected
            </span>
            <span style="color: var(--text-secondary); font-weight: 600;">Goal: ${c}</span>
          </div>

          <div style="width: 100%; height: 10px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
            <div id="signature-progress-fill" style="height: 100%; width: ${l}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C); transition: width 0.4s ease;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary); margin-top: 8px;">
            <span>${l}% of goal reached</span>
            <span>Created by @${p} (${f})</span>
          </div>
        </div>

        <!-- Digital Sign Action Button (Print Hidden) -->
        <div class="print-hide" style="margin-bottom: 24px;">
          <button id="sign-petition-btn" class="btn" style="width: 100%; padding: 14px; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3);" ${o?`disabled`:``}>
            <span class="material-symbols-outlined">draw</span>
            <span>${o?`✓ You Have Signed This Petition`:`✍️ Sign This Petition`}</span>
          </button>
        </div>

        <!-- Formal Petition Demand Statement -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 800; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Statement of Student Demand
          </h3>
          <div style="font-size: 16px; line-height: 1.6; color: var(--text-primary); white-space: pre-line; word-break: break-word;">
            ${L(r.statement)}
          </div>
        </div>


      </div>
    </div>
  `,O.PETITIONS);let h=K(),g=document.getElementById(`print-petition-btn`),_=document.getElementById(`copy-detail-frame-link-btn`),v=document.getElementById(`sign-petition-btn`),b=document.getElementById(`signature-count-display`),x=document.getElementById(`signature-progress-fill`);_&&_.addEventListener(`click`,()=>{let e=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${r.petitionId}`;navigator.clipboard.writeText(e).then(()=>{_.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{_.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span> Copy Frame Link`},2e3)})}),g&&g.addEventListener(`click`,()=>{window.print()}),v&&v.addEventListener(`click`,async()=>{v.disabled=!0,v.textContent=`Recording Signature...`;try{let e=await rn(r.petitionId);if(v.textContent=`✓ You Have Signed This Petition`,b&&(b.textContent=e.signatureCount),x){let t=Math.min(100,Math.round(e.signatureCount/c*100));x.style.width=`${t}%`}}catch(e){console.error(e),alert(e.message||`Failed to sign petition.`),v.disabled=!1,v.textContent=`✍️ Sign This Petition`}});let S=sn(n,e=>{if(!e)return;let t=e.signatureCount||0,n=e.goalSignatures||100,r=Math.min(100,Math.round(t/n*100)),i=document.getElementById(`signature-count-display`),a=document.getElementById(`signature-progress-fill`);i&&(i.textContent=t),a&&(a.style.width=`${r}%`)});return()=>{h&&h(),S&&S()}}function br(e,t){e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Petition</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">campaign</span>
      <h2 style="font-size: 20px; font-weight: 800;">Petition Not Found</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${t}</p>
    </div>
  `,O.PETITIONS);let n=K();return()=>{n&&n()}}async function xr(e){let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){Sr(e,`No petition ID specified in frame URL.`);return}e.innerHTML=`
    <div style="min-height: 100vh; background: #0f1115; color: #f7f9f9; padding: 20px 12px; font-family: var(--font-family);">
      <div style="max-width: 800px; margin: 0 auto;">
        ${q(3)}
      </div>
    </div>
  `;let r=await tn(n);if(!r){Sr(e,`This campus petition frame could not be found.`);return}let i=await R(r.creatorId),a=y.currentUser,o=a?await nn(r.petitionId,a.uid):!1;await an(r.petitionId);let s=r.signatureCount||0,c=r.goalSignatures||100,l=Math.min(100,Math.round(s/c*100)),u=s>=c,d=r.isAnonymous===!0,f=d?`Anonymous Student`:i?.name?I(i.name):`Student Representative`,p=d?`anonymous`:i?.username?I(i.username):`student`,m=new Date(r.timestamp||Date.now()).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}),h=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${r.petitionId}`;e.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #111827; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Navigation & Action Header -->
      <div style="max-width: 840px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336; color: #f7f9f9;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${O.PETITIONS}" class="btn-ghost" title="Back to Backbench" style="color: #f7f9f9;">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
          <span style="font-size: 14px; font-weight: 700; color: var(--accent-primary);">OFFICIAL PETITION FRAME MODE</span>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="copy-petition-frame-link-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; border-color: #2f3336; color: #f7f9f9;">
            <span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span>
            Copy Frame Link
          </button>
          <button onclick="window.print()" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; border-color: #2f3336; color: #f7f9f9;">
            <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
            Print Paper Charter
          </button>
        </div>
      </div>

      ${a?``:`
        <!-- Authentication Prompt Banner if Logged Out -->
        <div style="max-width: 840px; margin: 0 auto 20px auto; background: linear-gradient(90deg, #1d9bf0, #00ba7c); padding: 14px 20px; border-radius: 14px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 8px 24px rgba(29, 155, 240, 0.3);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="material-symbols-outlined" style="font-size: 24px;">lock_open</span>
            <div>
              <strong style="font-size: 15px;">Sign in to add your verified student signature</strong>
              <div style="font-size: 12px; opacity: 0.9;">You are viewing this petition frame document. Log in to sign.</div>
            </div>
          </div>
          <a href="#/login?redirect=${encodeURIComponent(`#/petition-frame?id=${r.petitionId}`)}" class="btn" style="background: #ffffff; color: #000000; font-weight: 800; padding: 8px 18px; font-size: 13px; text-decoration: none;">
            Sign In to Sign
          </a>
        </div>
      `}

      <!-- Official Paper Parchment Charter Container -->
      <div id="paper-charter-document" style="max-width: 840px; margin: 0 auto; background: #FDFBF7; border: 3px solid #C5B396; border-radius: 18px; padding: 36px 32px; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6); position: relative; overflow: hidden;">

        <!-- Parchment Vintage Watermark & Stamp -->
        <div style="position: absolute; top: -30px; right: -30px; width: 180px; height: 180px; background: rgba(197, 179, 150, 0.12); border-radius: 50%; pointer-events: none; border: 2px dashed #C5B396; transform: rotate(-15deg); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; color: #8A7352; text-transform: uppercase; letter-spacing: 2px; text-align: center; padding: 20px;">
          SJC STUDENT CHARTER SEAL
        </div>

        <!-- Official Header & Crest -->
        <div style="border-bottom: 2px solid #D8CBBC; padding-bottom: 24px; margin-bottom: 28px; text-align: center;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 10px;">
            <div style="width: 52px; height: 52px; background: #1E3A8A; color: #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 28px; font-family: serif; border: 3px solid #C5B396; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);">
              SJC
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #1E3A8A; text-transform: uppercase;">ST. JOSEPH'S COLLEGE • STUDENT COUNCIL</span>
          <h1 style="font-size: 26px; font-weight: 900; font-family: serif; color: #111827; margin-top: 4px; letter-spacing: -0.5px;">
            OFFICIAL STUDENT PETITION CHARTER
          </h1>
          <div style="font-size: 13px; color: #4B5563; font-style: italic; margin-top: 2px;">
            Document ID: ${I(r.petitionId)} • Category: ${I(r.category)}
          </div>
        </div>

        <!-- Petition Metadata Banner -->
        <div style="background: #F4EFE6; border: 1px solid #D8CBBC; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Target Authority</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${I(r.targetRecipient)}</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Petition Sponsor</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${f} (@${p})</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Date Filed</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${m}</div>
          </div>
        </div>

        <!-- Title of Demand -->
        <div style="margin-bottom: 24px;">
          <span style="font-size: 12px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px;">SUBJECT MATTER OF PETITION</span>
          <h2 style="font-size: 22px; font-weight: 900; color: #111827; line-height: 1.35; font-family: serif; margin-top: 4px;">
            "${I(r.title)}"
          </h2>
        </div>

        <!-- Formal Statement of Demand -->
        <div style="background: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #1E3A8A; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
          <h3 style="font-size: 13px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Declaration & Student Demand Statement
          </h3>
          <div style="font-size: 16px; line-height: 1.7; color: #1F2937; font-family: serif; white-space: pre-line; word-break: break-word;">
            ${I(r.statement)}
          </div>
        </div>

        <!-- Live Signatures Progress Box -->
        <div style="background: #F4EFE6; border: 2px solid #C5B396; border-radius: 14px; padding: 20px; margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 15px; font-weight: 800; color: #111827; display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #1D9BF0;">verified</span>
              Verified Student Signatures: <strong id="frame-count-display" style="font-size: 20px; color: #1E3A8A;">${s}</strong> / ${c} Required
            </span>
            <span style="font-size: 14px; font-weight: 800; color: ${u?`#059669`:`#1D9BF0`};">
              ${l}% Signed ${u?`🎉 (GOAL ACHIEVED)`:``}
            </span>
          </div>

          <div style="width: 100%; height: 12px; background: #D8CBBC; border-radius: 9999px; overflow: hidden;">
            <div id="frame-progress-fill" style="height: 100%; width: ${l}%; background: linear-gradient(90deg, #1E3A8A, #059669); transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Official Terms & Conditions Box -->
        <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 12px; padding: 16px; margin-bottom: 28px; font-size: 13px; color: #92400E;">
          <strong style="display: block; font-weight: 800; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">📜 Official Signing Terms & Student Rules:</strong>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Each signature is digitally authenticated and tied to your verified St. Joseph's College account.</li>
            <li>Multiple or duplicate signatures by the same account are strictly prevented.</li>
            <li>Your digital signature acts as a binding vote on this student petition charter.</li>
          </ul>
        </div>

        <!-- Digital Sign Action Section -->
        <div style="text-align: center; margin-bottom: 32px;">
          ${a?`
            <button id="frame-sign-btn" class="btn" style="background: linear-gradient(135deg, #1E3A8A, #1D9BF0); color: #FFFFFF; font-size: 17px; font-weight: 800; padding: 16px 36px; border-radius: 12px; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(30, 58, 138, 0.4); display: inline-flex; align-items: center; gap: 10px;" ${o?`disabled`:``}>
              <span class="material-symbols-outlined" style="font-size: 22px;">draw</span>
              <span>${o?`✓ Official Signature Recorded`:`✍️ Sign This Official Petition Paper`}</span>
            </button>
          `:`
            <a href="#/login?redirect=${encodeURIComponent(`#/petition-frame?id=${r.petitionId}`)}" class="btn" style="background: #1E3A8A; color: #FFFFFF; font-size: 16px; font-weight: 800; padding: 16px 36px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined">login</span>
              Log In to Sign Petition
            </a>
          `}
        </div>



        <!-- Document Footer Stamp -->
        <div style="margin-top: 40px; border-top: 1px dashed #C5B396; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #8A7352;">
          <span>Backbench Campus Petitions Charter</span>
          <span>Verified Digital Imprint Seal</span>
        </div>
      </div>
    </div>
  `;let g=document.getElementById(`copy-petition-frame-link-btn`),_=document.getElementById(`frame-sign-btn`),v=document.getElementById(`frame-count-display`),b=document.getElementById(`frame-progress-fill`);g&&g.addEventListener(`click`,()=>{navigator.clipboard.writeText(h).then(()=>{g.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{g.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Frame Link`},2e3)})}),_&&_.addEventListener(`click`,async()=>{_.disabled=!0,_.textContent=`Recording Signature...`;try{let t=await rn(r.petitionId);if(_.textContent=`✓ Official Signature Recorded`,v&&(v.textContent=t.signatureCount),b){let e=Math.min(100,Math.round(t.signatureCount/c*100));b.style.width=`${e}%`}setTimeout(()=>xr(e),800)}catch(e){alert(e.message||`Failed to record signature.`),_.disabled=!1,_.textContent=`✍️ Sign This Official Petition Paper`}})}function Sr(e,t){e.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
      <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">gavel</span>
      <h1 style="font-size: 24px; font-weight: 800;">Petition Frame Not Found</h1>
      <p style="color: var(--text-secondary); margin-top: 8px;">${t}</p>
      <a href="${O.PETITIONS}" class="btn" style="display: inline-block; margin-top: 24px;">Return to Petitions</a>
    </div>
  `}async function Cr(e){let t=window.location.hash,n=null;t.includes(`?u=`)&&(n=t.split(`?u=`)[1]?.replace(/^[@\-\s]+/,``)),n||=y.currentUser?.displayName||`student`;let r=null;try{let e=await p(C(m,T.USERS));if(e.exists()){let t=e.val();for(let e in t){let i=t[e];if(i.username&&i.username.toLowerCase()===n.toLowerCase()){r=i;break}}}}catch(e){console.error(e)}if(!r){e.innerHTML=`
      <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
        <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">person_off</span>
        <h1 style="font-size: 24px; font-weight: 800;">Student Profile Frame Not Found</h1>
        <p style="color: var(--text-secondary); margin-top: 8px;">The account @${I(n)} could not be loaded.</p>
      </div>
    `;return}let i=y.currentUser?.uid,a=i===r.uid,o=await at(r.uid),s=i&&!a?await tt(r.uid):!1,c=J(r),l=H(r,96,`border: 4px solid #16181c; box-shadow: 0 8px 24px rgba(0,0,0,0.5);`),u=r.name?I(r.name):`Anonymous Student`,d=r.username?I(r.username):`student`,f=r.isTeacher||r.role===`teacher`,h=r.verifiedStudent||r.role===`staff`||r.role===`admin`||f,g=`${window.location.origin}${window.location.pathname}#/profile-frame?u=${d}`;e.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Action Bar -->
      <div style="max-width: 680px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${O.PROFILE}?u=${d}" class="btn-ghost" title="Open Full Profile" style="color: #f7f9f9;">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
          <span style="font-size: 14px; font-weight: 700; color: var(--accent-primary);">DIGITAL STUDENT ID FRAME</span>
        </div>

        <button id="copy-profile-frame-link-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; border-color: #2f3336; color: #f7f9f9;">
          <span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span>
          Copy Account Frame Link
        </button>
      </div>

      <!-- Main Student ID Card Frame -->
      <div style="max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #16181c 0%, #0d0f12 100%); border: 2px solid #2f3336; border-radius: 24px; overflow: hidden; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7); position: relative;">

        <!-- Top Banner Header -->
        <div style="height: 140px; background: linear-gradient(135deg, #1d9bf0, #1e3a8a); position: relative; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span style="background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); color: #fff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.2);">
              ST. JOSEPH'S COLLEGE • BACKBENCH ID
            </span>
            <span class="material-symbols-outlined" style="color: rgba(255,255,255,0.8); font-size: 28px;">badge</span>
          </div>
        </div>

        <!-- Profile Avatar & Details Overlap -->
        <div style="padding: 0 24px 28px 24px; position: relative;">
          
          <div style="margin-top: -48px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end;">
            ${l}

            ${i&&!a?`
              <button id="frame-friend-btn" class="btn ${s?`btn-outline`:``}" style="font-weight: 700; font-size: 13px; padding: 8px 18px;">
                ${s?`✓ Friends`:`+ Add Friend`}
              </button>
            `:``}
          </div>

          <!-- User Name & Badges -->
          <div style="margin-bottom: 16px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #f7f9f9; font-family: ${c}; display: flex; align-items: center; gap: 8px;">
              ${u}
              ${f?`
                <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
                </span>
              `:h?`
                <span class="material-symbols-outlined verified-icon" style="font-size: 22px;">verified</span>
              `:``}
            </h1>
            <div style="color: var(--text-secondary); font-size: 15px; font-weight: 500;">@${d}</div>
          </div>

          <!-- Bio / Motto Box -->
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; font-size: 14px; color: var(--text-primary); line-height: 1.5;">
            ${I(r.bio||`SJC Backbench Student Account`)}
          </div>

          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #202327; border-radius: 14px; padding: 16px; text-align: center; margin-bottom: 24px; border: 1px solid var(--border-color);">
            <div>
              <div style="font-size: 20px; font-weight: 800; color: var(--accent-primary);">${o}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Classmates</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #00BA7C;">${I(r.department||r.course||`SJC`)}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Dept / Stream</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #F4511E;">Verified</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Status</div>
            </div>
          </div>

          <!-- Direct Link to Full Backbench Account -->
          <div style="display: flex; gap: 12px;">
            <a href="${O.PROFILE}?u=${d}" class="btn" style="flex: 1; text-align: center; font-weight: 700; text-decoration: none;">
              Open Full Account Profile
            </a>
          </div>

        </div>

        <!-- Security Seal Footer -->
        <div style="background: #0f1115; padding: 12px 24px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary);">
          <span>Verified Backbench Student Identity</span>
          <span style="color: var(--accent-primary); font-weight: 700;">SJC CAMPUS CARD</span>
        </div>
      </div>
    </div>
  `;let _=document.getElementById(`copy-profile-frame-link-btn`),v=document.getElementById(`frame-friend-btn`);_&&_.addEventListener(`click`,()=>{navigator.clipboard.writeText(g).then(()=>{_.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{_.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Account Frame Link`},2e3)})}),v&&v.addEventListener(`click`,async()=>{v.disabled=!0;try{let e=await rt(r.uid);v.textContent=e?`✓ Friends`:`+ Add Friend`,v.className=`btn ${e?`btn-outline`:``}`}catch(e){alert(e.message||`Failed to update friend status`)}finally{v.disabled=!1}})}var wr=null;function Tr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Polls</h1>
    </header>

    <!-- Create Poll Card -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="card" style="padding: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">poll</span>
          Create a Campus Poll (Up to 13 options)
        </h3>

        <input type="text" id="poll-question" class="input-field" placeholder="Ask a question (e.g. Which canteen dish is best?)" style="margin-bottom: 12px;" />

        <div id="poll-options-inputs" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
          <input type="text" class="input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 0;" />
          <input type="text" class="input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 0;" />
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
          <button type="button" id="add-option-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px;">
            + Add Option (Max 13)
          </button>

          <div style="display: flex; align-items: center; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="dedicated-poll-anonymous-checkbox" style="width: 14px; height: 14px; accent-color: var(--accent-primary); cursor: pointer;" />
              Anonymous
            </label>
            <button type="button" id="submit-poll-btn" class="btn">
              Publish Poll
            </button>
          </div>
        </div>

        <div id="poll-error" class="error-text" style="display: none; margin-top: 12px; margin-bottom: 0;"></div>
      </div>
    </div>

    <!-- Active Polls Feed -->
    <div id="polls-feed-container" style="padding: 16px;">
      ${q(3)}
    </div>
  `,O.POLLS);let t=K(),n=document.getElementById(`poll-question`),r=document.getElementById(`poll-options-inputs`),i=document.getElementById(`add-option-btn`),a=document.getElementById(`submit-poll-btn`),o=document.getElementById(`poll-error`),s=document.getElementById(`polls-feed-container`);return i.addEventListener(`click`,()=>{let e=r.querySelectorAll(`.poll-opt-input`);if(e.length<13){let t=e.length+1,n=document.createElement(`input`);n.type=`text`,n.className=`input-field poll-opt-input fade-in`,n.placeholder=`Option ${t}`,n.style.marginBottom=`0`,r.appendChild(n),e.length+1===13&&(i.style.display=`none`)}}),a.addEventListener(`click`,async()=>{o.style.display=`none`;let e=n.value.trim(),t=r.querySelectorAll(`.poll-opt-input`),s=Array.from(t).map(e=>e.value.trim()),c=document.getElementById(`dedicated-poll-anonymous-checkbox`).checked;a.disabled=!0,a.textContent=`Publishing...`;try{await St(e,s,c),n.value=``,document.getElementById(`dedicated-poll-anonymous-checkbox`).checked=!1,r.innerHTML=`
        <input type="text" class="input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 0;" />
        <input type="text" class="input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 0;" />
      `,i.style.display=`inline-block`}catch(e){o.textContent=e.message,o.style.display=`block`}finally{a.disabled=!1,a.textContent=`Publish Poll`}}),wr&&wr(),wr=Tt(20,async e=>{if(e.length===0){s.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">poll</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active polls</h3>
          <p style="font-size: 14px;">Create the first poll above to gather student opinions!</p>
        </div>
      `;return}let t=``,n=y.currentUser.uid;for(let r of e){let e=await R(r.creatorId),i=await Ct(r.pollId,n);t+=Yt(r,e,i)}s.innerHTML=t,s.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.pollId,r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await wt(n,r)}catch(e){alert(e.message||`Failed to record vote`)}})})}),()=>{t&&t(),wr&&=(wr(),null)}}var Er=null;async function Dr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>
    ${q(2)}
  `,O.POLLS);let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){Or(e,`No poll ID specified.`);return}let r=await Pt(n);if(!r){Or(e,`This campus poll does not exist or has been deleted.`);return}let i=await R(r.creatorId),a=y.currentUser.uid,o=await Ct(r.pollId,a),s=await Dt(r.pollId,a),c=await kt(r.pollId,a),l=y.currentUser,u=H(l.photoURL||``,40),d=r.isAnonymous===!0,f=new Map;f.set(r.creatorId,1);let p=2;function m(e){return f.has(e)||f.set(e,p++),f.get(e)}function h(e,t=36){let n=[`linear-gradient(135deg, #6366f1, #8b5cf6)`,`linear-gradient(135deg, #f97316, #ef4444)`,`linear-gradient(135deg, #14b8a6, #06b6d4)`,`linear-gradient(135deg, #ec4899, #f43f5e)`,`linear-gradient(135deg, #eab308, #f97316)`,`linear-gradient(135deg, #22c55e, #10b981)`,`linear-gradient(135deg, #3b82f6, #6366f1)`,`linear-gradient(135deg, #a855f7, #ec4899)`],r=n[(e-1)%n.length];return`<div class="avatar" style="width: ${t}px; height: ${t}px; font-size: ${Math.round(t*.38)}px; background: ${r}; font-weight: 800;">A${e}</div>`}e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>

    <!-- Main Poll Card Container -->
    <div id="poll-card-wrapper" style="padding: 16px 16px 0 16px;">
      ${Yt(r,i,o,s,c)}
    </div>

    <!-- Reply Composer -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;" class="fade-in">
      ${u}
      <div style="flex: 1; min-width: 0;">
        <textarea id="poll-reply-input" class="input-field" placeholder="Post your reply to this poll..." rows="2" style="resize: none; font-size: 15px; border: none; background: transparent; padding: 0; outline: none; box-shadow: none;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <span id="poll-reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${B.MAX_CHARS}</span>
          <button id="submit-poll-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Poll Replies Feed Container -->
    <div id="poll-replies-container" style="padding: 16px;">
      ${q(2)}
    </div>
  `,O.POLLS);let g=K(),_=document.getElementById(`poll-reply-input`),v=document.getElementById(`poll-reply-char-counter`),b=document.getElementById(`submit-poll-reply-btn`),x=document.getElementById(`poll-replies-container`);function S(e,t){e.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await wt(t.pollId,r)}catch(t){alert(t.message||`Failed to record vote.`),e.disabled=!1}})});let n=e.querySelector(`.poll-like-btn`);n&&n.addEventListener(`click`,async e=>{e.stopPropagation(),n.disabled=!0;try{let e=await Et(t.pollId);e.liked?n.classList.add(`liked`,`heart-pop`):n.classList.remove(`liked`,`heart-pop`);let r=n.querySelector(`.poll-like-count`);r&&(r.textContent=e.likes)}catch(e){console.error(e)}finally{n.disabled=!1}});let r=e.querySelector(`.poll-reshare-btn`);r&&r.addEventListener(`click`,async e=>{e.stopPropagation(),r.disabled=!0;try{let e=await Ot(t.pollId);e.reshared?(r.classList.add(`reshared`),r.style.color=`#00BA7C`):(r.classList.remove(`reshared`),r.style.color=``);let n=r.querySelector(`.poll-reshare-count`);n&&(n.textContent=e.reshares)}catch(e){console.error(e)}finally{r.disabled=!1}});let i=e.querySelector(`.poll-options-btn`);i&&i.addEventListener(`click`,async e=>{e.stopPropagation();let n=await R(a),r=n?.role===`staff`||n?.role===`admin`;X(i,{itemId:t.pollId,authorId:t.creatorId,currentUid:a,isStaff:r,itemType:`poll`,onDelete:async e=>{try{a===t.creatorId?await Mt(e):r&&await Nt(e),window.history.back()}catch(e){alert(e.message||`Failed to delete poll.`)}},onReport:async(e,t)=>{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}})})}_.addEventListener(`input`,()=>{let e=_.value.trim().replace(/\s/g,``).length;v.textContent=`${e} / ${B.MAX_CHARS}`,e>B.MAX_CHARS?(v.style.color=`var(--error-color)`,b.disabled=!0):e===0?(v.style.color=`var(--text-secondary)`,b.disabled=!0):(v.style.color=`var(--accent-primary)`,b.disabled=!1)}),b.addEventListener(`click`,async()=>{let e=_.value.trim(),t=e.replace(/\s/g,``);if(t.length>0&&t.length<=B.MAX_CHARS){b.disabled=!0,b.textContent=`Replying...`;try{await At(r.pollId,e),_.value=``,_.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(e.message||`Failed to submit reply.`)}finally{b.textContent=`Reply`}}}),Er&&Er(),Er=jt(r.pollId,async e=>{if(!x)return;if(e.length===0){x.innerHTML=`
        <div style="padding: 30px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 36px; color: var(--text-muted); margin-bottom: 8px;">chat_bubble_outline</span>
          <div style="font-size: 14px; font-weight: 600;">No replies yet</div>
          <div style="font-size: 13px; margin-top: 2px;">Be the first student to share your thoughts on this poll!</div>
        </div>
      `;return}let t=``;for(let n of e){let e=await R(n.authorId),r,i,a,o;if(d){let e=m(n.authorId);r=h(e),i=`Anonymous ${e}`,a=`anonymous_${e}`,o=`'Inter', sans-serif`}else r=H(e,36),i=e?.name?I(e.name):`Student`,a=e?.username?I(e.username):`student`,o=J(e);t+=`
        <div class="card fade-in" style="padding: 14px; margin-bottom: 10px; border-radius: 12px; display: flex; gap: 10px;">
          ${r}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 14px; font-family: ${o}; color: var(--text-primary);">${i}</span>
                <span style="font-size: 13px; color: var(--text-secondary);">@${a}</span>
              </div>
              <span class="time-ago" data-timestamp="${n.timestamp}" style="font-size: 12px; color: var(--text-secondary);">${V(n.timestamp)}</span>
            </div>
            <div style="font-size: 14px; line-height: 1.45; color: var(--text-primary); font-family: ${o};">
              ${I(n.content)}
            </div>
          </div>
        </div>
      `}x.innerHTML=t});let C=Ft(n,async e=>{if(!e)return;let t=document.getElementById(`poll-card-wrapper`);if(t){let r=await Ct(n,a),o=await Dt(n,a),s=await kt(n,a);t.innerHTML=Yt(e,i,r,o,s),S(t,e)}}),w=document.getElementById(`poll-card-wrapper`);return w&&S(w,r),()=>{g&&g(),C&&C(),Er&&=(Er(),null)}}function Or(e,t){e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">poll</span>
      <h2 style="font-size: 20px; font-weight: 800;">Poll Not Found</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${t}</p>
    </div>
  `,O.POLLS);let n=K();return()=>{n&&n()}}var kr=null;async function Ar(e){if(!y.currentUser){window.location.hash=`#/login`;return}let t=y.currentUser,n=await R(t.uid),r=n?.role===`staff`||n?.role===`admin`,i=``;r&&(i=`
      <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
        <div class="card" style="padding: 20px; border-left: 4px solid var(--accent-primary);">
          <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--accent-primary);">campaign</span>
            Publish Campus Announcement
          </h3>
          <form id="create-announcement-form" style="display: flex; flex-direction: column;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Title</label>
            <input type="text" id="announcement-title" class="input-field" placeholder="e.g. Mid-Semester Exam Schedule" required />

            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Severity Level</label>
            <select id="announcement-severity" class="input-field" style="background: var(--bg-primary);">
              <option value="info">Info (Standard Update)</option>
              <option value="warning">Warning (Important Notice)</option>
              <option value="alert">Alert (Urgent/Critical)</option>
            </select>

            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Content</label>
            <textarea id="announcement-content" class="input-field" rows="4" style="resize: none;" placeholder="Details of the announcement..." required></textarea>

            <div id="announcement-error" class="error-text" style="display: none; margin-bottom: 8px;"></div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" id="submit-announcement-btn" class="btn" style="font-weight: 700;">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    `),e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Official Announcements</h1>
    </header>

    ${i}

    <!-- Active Announcements Feed -->
    <div id="announcements-feed-container" style="padding: 16px;">
      ${q(3)}
    </div>
  `,O.ANNOUNCEMENTS);let a=K(),o=document.getElementById(`create-announcement-form`),s=document.getElementById(`announcement-error`),c=document.getElementById(`submit-announcement-btn`),l=document.getElementById(`announcements-feed-container`);return o&&o.addEventListener(`submit`,async e=>{e.preventDefault(),s.style.display=`none`;let t=document.getElementById(`announcement-title`).value.trim(),n=document.getElementById(`announcement-severity`).value,r=document.getElementById(`announcement-content`).value.trim();c.disabled=!0,c.textContent=`Publishing...`;try{await mt({title:t,content:r,severity:n}),o.reset()}catch(e){s.textContent=e.message||`Failed to create announcement.`,s.style.display=`block`}finally{c.disabled=!1,c.textContent=`Publish`}}),kr&&kr(),kr=gt(30,async e=>{if(!l)return;if(e.length===0){l.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No Announcements</h3>
          <p style="font-size: 14px;">There are no official campus announcements at this time.</p>
        </div>
      `;return}let n=``;try{for(let t of e){let e=await R(t.authorId),i=e?.name?I(e.name):`Staff`,a=H(e,36,`border: 1px solid var(--border-color);`),o=`var(--accent-primary)`,s=`rgba(29, 155, 240, 0.1)`,c=`info`;t.severity===`warning`?(o=`#F59E0B`,s=`rgba(245, 158, 11, 0.1)`,c=`warning`):t.severity===`alert`&&(o=`var(--error-color)`,s=`rgba(244, 33, 46, 0.1)`,c=`error`),n+=`
          <div class="card fade-in" style="margin-bottom: 16px; padding: 16px; border-radius: var(--border-radius); border-left: 4px solid ${o};" data-id="${t.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="material-symbols-outlined" style="color: ${o}; font-size: 20px;">${c}</span>
                <span class="brand-badge" style="font-size: 11px; color: ${o}; background: ${s}; border-color: ${o}; text-transform: uppercase;">${t.severity}</span>
                <span class="time-ago" data-timestamp="${t.timestamp}" style="font-size: 13px; color: var(--text-secondary);">${V(t.timestamp)}</span>
                ${t.edited?`<span style="font-size: 11px; color: var(--text-secondary); font-style: italic;">(edited)</span>`:``}
              </div>
              
              ${r?`
                <button class="btn-ghost announcement-options-btn" style="padding: 4px;" title="Options" data-id="${t.id}" data-author-id="${t.authorId}">
                  <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
                </button>
              `:``}
            </div>

            <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; line-height: 1.3;">
              ${I(t.title)}
            </h2>

            <div style="font-size: 15px; color: var(--text-primary); line-height: 1.5; margin-bottom: 16px;">
              ${L(t.content)}
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
              ${a}
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${i}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">Official Campus Communication</div>
              </div>
            </div>
          </div>
        `}l.innerHTML=n}catch(e){console.error(`Error rendering announcements:`,e),l.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--error-color);">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px;">error_outline</span>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Failed to load announcements</h3>
        </div>
      `}r&&l.querySelectorAll(`.announcement-options-btn`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=e.dataset.id,i=e.dataset.authorId;X(e,{itemId:r,authorId:i,currentUid:t.uid,isStaff:!0,itemType:`announcement`,onDelete:async t=>{try{await _t(t);let n=e.closest(`.card`);n&&(n.style.opacity=`0.3`,n.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete announcement.`)}},onEdit:async t=>{let n=e.closest(`.card`),r=n.querySelector(`h2`),i=n.querySelector(`div[style*="line-height: 1.5; margin-bottom: 16px;"]`);if(!r||!i)return;let a=r.innerText,o=i.innerText,s=await N(`Edit title:`,a);if(s===null)return;let c=await N(`Edit content:`,o,``,500);if(c!==null&&(s.trim()!==a.trim()||c.trim()!==o.trim()))try{await ht(t,s,c)}catch(e){alert(e.message||`Failed to edit announcement.`)}}})})})}),()=>{a&&a(),kr&&=(kr(),null)}}async function jr(e){let t=y.currentUser;if(!t)throw Error(`Not authenticated`);let{title:n,description:r,category:i,date:a,time:o,location:s,capacity:c}=e;if(!n||n.trim().length===0)throw Error(`Event title is required.`);if(!a||!o||!s)throw Error(`Event date, time, and venue location are required.`);let l=w(C(m,T.EVENTS)),u={eventId:l.key,creatorId:t.uid,title:n.trim(),description:r?.trim()||``,category:i||`General`,date:a,time:o,location:s.trim(),capacity:parseInt(c)||100,attendeeCount:0,timestamp:new Date().toISOString(),status:`UPCOMING`};return await S(l,u),u}function Mr(e=20,t){let n=a(C(m,T.EVENTS),x(`timestamp`),u(e)),i=r(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date((e.date||``)+` `+(e.time||``))-new Date((t.date||``)+` `+(t.time||``))),t(n)});return()=>l(n,`value`,i)}async function Nr(e){if(!e)return null;try{let t=await p(C(m,`${T.EVENTS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching event:`,e)}return null}async function Pr(e,t){if(!t||!e)return null;try{let n=await p(C(m,`eventRSVPs/${e}/${t}`));if(n.exists())return n.val().status}catch(e){console.error(`Error checking RSVP status:`,e)}return null}async function Fr(n,r=`attending`){let i=y.currentUser;if(!i)throw Error(`Not authenticated`);let a=C(m,`eventRSVPs/${n}/${i.uid}`),o=await p(a),s=await R(i.uid),c=!1,l=!1;o.exists()?o.val().status===r?(await t(a),l=!0):await S(a,{uid:i.uid,status:r,name:s?.name||i.displayName||`Student`,class:s?.class||`N/A`,timestamp:new Date().toISOString()}):(await S(a,{uid:i.uid,status:r,name:s?.name||i.displayName||`Student`,class:s?.class||`N/A`,timestamp:new Date().toISOString()}),c=!0);let u=C(m,`${T.EVENTS}/${n}`),d=0;return await e(u,e=>(e&&(c&&r===`attending`?e.attendeeCount=(e.attendeeCount||0)+1:l&&(e.attendeeCount=Math.max(0,(e.attendeeCount||0)-1)),d=e.attendeeCount),e)),{status:l?null:r,attendeeCount:d}}async function Ir(e){if(!e)return[];try{let t=await p(C(m,`eventRSVPs/${e}`));if(t.exists()){let e=t.val();return Object.values(e)}}catch(e){console.error(`Error fetching event attendees:`,e)}return[]}var Lr=null;function Rr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Events</h1>
    </header>

    <!-- Create Event Builder Card -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="card" style="padding: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">event</span>
          Host a Campus Event
        </h3>

        <form id="create-event-form" style="display: flex; flex-direction: column;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Event Title</label>
          <input type="text" id="event-title" class="input-field" placeholder="e.g. SJC Inter-Class Hackathon 2026" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Category</label>
              <select id="event-category" class="input-field" style="background: var(--bg-primary);">
                <option value="Tech & Coding">Tech & Coding</option>
                <option value="Cultural Fest">Cultural Fest</option>
                <option value="Sports">Sports</option>
                <option value="Workshop & Seminar">Workshop & Seminar</option>
                <option value="Club Meeting">Club Meeting</option>
              </select>
            </div>

            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Capacity (Seats)</label>
              <select id="event-capacity" class="input-field" style="background: var(--bg-primary);">
                <option value="50">50 Seats</option>
                <option value="100" selected>100 Seats</option>
                <option value="250">250 Seats</option>
                <option value="500">500 Seats</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Event Date</label>
              <input type="date" id="event-date" class="input-field" required />
            </div>

            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Time</label>
              <input type="time" id="event-time" class="input-field" required />
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Venue Location</label>
          <input type="text" id="event-location" class="input-field" placeholder="e.g. SJC Main Auditorium, Science Block" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Description & Agenda</label>
          <textarea id="event-description" class="input-field" rows="3" style="resize: none;" placeholder="Details about this campus event..."></textarea>

          <div id="event-error" class="error-text" style="display: none; margin-bottom: 8px;"></div>

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" id="submit-event-btn" class="btn" style="font-weight: 700;">
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Feed Tabs -->
    <div class="header-tabs">
      <button class="tab-button active" id="tab-all-events">Upcoming Events</button>
      <button class="tab-button" id="tab-my-events">My RSVP Passes</button>
    </div>

    <!-- Active Events Feed -->
    <div id="events-feed-container" style="padding: 16px;">
      ${q(3)}
    </div>
  `,O.EVENTS);let t=K(),n=document.getElementById(`create-event-form`),r=document.getElementById(`event-error`),i=document.getElementById(`submit-event-btn`),a=document.getElementById(`events-feed-container`),o=document.getElementById(`tab-all-events`),s=document.getElementById(`tab-my-events`),c=`all`,l=[];o.addEventListener(`click`,()=>{c=`all`,o.classList.add(`active`),s.classList.remove(`active`),d()}),s.addEventListener(`click`,()=>{c=`my`,s.classList.add(`active`),o.classList.remove(`active`),d()});let u=document.getElementById(`event-date`);u&&(u.value=new Date().toISOString().split(`T`)[0]),n.addEventListener(`submit`,async e=>{e.preventDefault(),r.style.display=`none`;let t=document.getElementById(`event-title`).value.trim(),a=document.getElementById(`event-category`).value,o=document.getElementById(`event-capacity`).value,s=document.getElementById(`event-date`).value,c=document.getElementById(`event-time`).value,l=document.getElementById(`event-location`).value.trim(),d=document.getElementById(`event-description`).value.trim();i.disabled=!0,i.textContent=`Publishing...`;try{await jr({title:t,category:a,capacity:o,date:s,time:c,location:l,description:d}),n.reset(),u.value=new Date().toISOString().split(`T`)[0]}catch(e){r.textContent=e.message||`Failed to create event.`,r.style.display=`block`}finally{i.disabled=!1,i.textContent=`Publish Event`}});let d=async()=>{if(!a)return;let e=y.currentUser.uid,t=l;if(c===`my`){let n=[];for(let t of l){let r=await Pr(t.eventId,e);(r===`attending`||r===`interested`)&&n.push(t)}t=n}if(t.length===0){a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${c===`my`?`confirmation_number`:`event`}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${c===`my`?`No registered event passes`:`No upcoming campus events`}</h3>
          <p style="font-size: 14px;">${c===`my`?`RSVP to an upcoming event to save your ticket pass here!`:`Be the first student to publish an event above!`}</p>
        </div>
      `;return}let n=``;for(let r of t){let t=await R(r.creatorId),i=await Pr(r.eventId,e),a=t?.name?I(t.name):`SJC Host`,o=r.attendeeCount||0,s=r.capacity||100,c=Math.min(100,Math.round(o/s*100));n+=`
        <article class="card fade-in event-card" data-event-id="${r.eventId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="brand-badge" style="font-size: 11px;">${I(r.category)}</span>
            <span style="font-size: 12px; font-weight: 700; color: var(--accent-primary);">Hosted by ${a}</span>
          </div>

          <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; line-height: 1.3;">
            ${I(r.title)}
          </h2>

          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">calendar_month</span>
              <span>${I(r.date)} · ${I(r.time)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">location_on</span>
              <span>${I(r.location)}</span>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="background: var(--bg-primary); border-radius: 10px; padding: 8px 12px; border: 1px solid var(--border-color); margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span><strong style="color: var(--accent-primary);">${o}</strong> / ${s} seats reserved</span>
              <span style="font-weight: 700; color: var(--text-primary);">${c}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${c}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C);"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <a href="#/event?id=${r.eventId}" class="btn btn-outline view-pass-btn" style="font-size: 12px; padding: 6px 14px;">
              🎟️ Entry Ticket Pass
            </a>

            <button class="btn ${i===`attending`?``:`btn-outline`} event-rsvp-btn" data-event-id="${r.eventId}" style="font-size: 12px; padding: 6px 14px;">
              ${i===`attending`?`✓ Going`:`🎟️ RSVP Going`}
            </button>
          </div>
        </article>
      `}a.innerHTML=n,a.querySelectorAll(`.event-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.event-rsvp-btn`)&&!t.target.closest(`.view-pass-btn`)){let t=e.dataset.eventId;window.location.hash=`#/event?id=${t}`}})}),a.querySelectorAll(`.event-rsvp-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.eventId;e.disabled=!0;try{let t=await Fr(n,`attending`);e.textContent=t.status===`attending`?`✓ Going`:`🎟️ RSVP Going`,e.className=`btn ${t.status===`attending`?``:`btn-outline`} event-rsvp-btn`}catch(e){alert(e.message||`Failed to update RSVP`)}finally{e.disabled=!1}})})};return Lr&&Lr(),Lr=Mr(50,e=>{l=e,d()}),()=>{t&&t(),Lr&&=(Lr(),null)}}async function zr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Event Ticket Pass</h1>
      </div>
    </header>
    ${q(2)}
  `,O.EVENTS);let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){Br(e,`No event specified.`);return}let r=await Nr(n);if(!r){Br(e,`This campus event does not exist or has been cancelled.`);return}let i=await R(r.creatorId),a=y.currentUser.uid,o=await Pr(r.eventId,a),s=await Ir(r.eventId),c=r.attendeeCount||0,l=r.capacity||100,u=Math.min(100,Math.round(c/l*100)),d=c>=l,f=i?.name?I(i.name):`SJC Event Host`,p=i?.username?I(i.username):`student`;e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header print-hide">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()" title="Back">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Digital Entry Pass</h1>
        </div>

        <button id="print-pass-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">print</span>
          Print Entry Pass
        </button>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      <!-- Digital Ticket Entry Pass Container -->
      <div class="card" style="border-radius: 24px; padding: 0; overflow: hidden; border: 2px solid var(--border-color); box-shadow: 0 12px 32px rgba(0,0,0,0.4); margin-bottom: 24px;">
        
        <!-- Ticket Header Banner -->
        <div style="background: linear-gradient(135deg, #1D9BF0, #004477); padding: 24px; color: #fff; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span class="brand-badge" style="background: rgba(255,255,255,0.2); color: #fff; border: none; font-size: 12px;">
              ${I(r.category)}
            </span>
            <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 9999px;">
              ST. JOSEPH'S COLLEGE OFFICIAL PASS
            </span>
          </div>

          <h1 style="font-size: 24px; font-weight: 800; line-height: 1.3; margin-bottom: 8px;">
            ${I(r.title)}
          </h1>

          <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; opacity: 0.9;">
            <span class="material-symbols-outlined" style="font-size: 18px;">person</span>
            <span>Hosted by <strong>${f}</strong> (@${p})</span>
          </div>
        </div>

        <!-- Ticket Body Details -->
        <div style="padding: 24px; background: var(--bg-secondary);">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">calendar_month</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Date</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${I(r.date)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">schedule</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Time</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${I(r.time)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; grid-column: span 2;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">location_on</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Venue Location</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${I(r.location)}</div>
              </div>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
              <span style="font-weight: 700; color: var(--text-primary);">
                <strong style="color: var(--accent-primary); font-size: 16px;">${c}</strong> / ${l} seats reserved
              </span>
              <span style="font-weight: 700; color: ${d?`var(--error-color)`:`var(--accent-primary)`};">${d?`FULL`:`${u}% Filled`}</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${u}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C);"></div>
            </div>
          </div>

          <!-- RSVP Control Toolbar (Print Hidden) -->
          <div class="print-hide" style="display: flex; gap: 12px; margin-bottom: 20px;">
            <button id="rsvp-attending-btn" class="btn ${o===`attending`?``:`btn-outline`}" style="flex: 1; padding: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span class="material-symbols-outlined">confirmation_number</span>
              <span>${o===`attending`?`✓ Going (RSVP Registered)`:`🎟️ RSVP — Going`}</span>
            </button>
            
            <button id="rsvp-interested-btn" class="btn ${o===`interested`?``:`btn-outline`}" style="padding: 12px 18px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined">star</span>
              <span>${o===`interested`?`★ Interested`:`Interested`}</span>
            </button>
          </div>

          <!-- Event Description & Agenda -->
          <div style="border-top: 1px dashed var(--border-color); padding-top: 18px;">
            <h3 style="font-size: 14px; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">About This Campus Event</h3>
            <p style="font-size: 15px; line-height: 1.5; color: var(--text-primary); white-space: pre-line;">
              ${I(r.description||`Join your fellow St. Joseph's College students for this campus event!`)}
            </p>
          </div>

          <!-- Simulated Pass Barcode -->
          <div style="margin-top: 20px; border-top: 1px dashed var(--border-color); padding-top: 16px; text-align: center;">
            <div style="font-family: monospace; letter-spacing: 4px; font-size: 16px; font-weight: 800; color: var(--text-secondary);">
              ||||| | |||| ||| |||||| || |||||
            </div>
            <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">PASS ID: SJC-EVT-${I(r.eventId)}</span>
          </div>
        </div>
      </div>

      <!-- Attending Students Roster -->
      <div class="card" style="padding: 20px; border-radius: 20px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">group</span>
          Registered Attendees (${s.length})
        </h3>

        ${s.length===0?`
          <p style="font-size: 14px; color: var(--text-secondary);">No students registered yet. Be the first to RSVP!</p>
        `:`
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;">
            ${s.map(e=>`
              <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg-primary); border-radius: 10px; border: 1px solid var(--border-color);">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${I(e.name)}</span>
                  <span style="font-size: 11px; color: var(--text-secondary);">Class ${I(e.class||`N/A`)}</span>
                </div>
              </div>
            `).join(``)}
          </div>
        `}
      </div>
    </div>
  `,O.EVENTS);let m=K(),h=document.getElementById(`print-pass-btn`),g=document.getElementById(`rsvp-attending-btn`),_=document.getElementById(`rsvp-interested-btn`);return h&&h.addEventListener(`click`,()=>{window.print()}),g&&g.addEventListener(`click`,async()=>{g.disabled=!0;try{await Fr(r.eventId,`attending`),zr(e)}catch(e){alert(e.message||`Failed to update RSVP`)}}),_&&_.addEventListener(`click`,async()=>{_.disabled=!0;try{await Fr(r.eventId,`interested`),zr(e)}catch(e){alert(e.message||`Failed to update RSVP`)}}),()=>{m&&m()}}function Br(e,t){e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Event</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">event_busy</span>
      <h2 style="font-size: 20px; font-weight: 800;">Event Unavailable</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${t}</p>
    </div>
  `,O.EVENTS);let n=K();return()=>{n&&n()}}async function Vr(e){if(!y.currentUser){window.location.hash=`#/login`;return}e.innerHTML=G(`
    <header class="sticky-header">
      <h1 class="header-title">Admin Control Center</h1>
    </header>
    ${q(2)}
  `,O.ADMIN);let t=(await R(y.currentUser.uid))?.role||P.STUDENT;if(t===P.STUDENT){e.innerHTML=G(`
      <header class="sticky-header">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Access Denied</h1>
        </div>
      </header>
      <div style="padding: 60px 20px; text-align: center;" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 56px; color: var(--error-color); margin-bottom: 12px;">lock</span>
        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Restricted Area</h2>
        <p style="color: var(--text-secondary); margin-top: 6px; font-size: 15px;">
          The Admin Control Center is restricted exclusively to St. Joseph's College Administrators and Appointed Staff Members.
        </p>
      </div>
    `,O.HOME,t);let n=K();return()=>{n&&n()}}let n=await It(),r=await Lt(),i=await Ut(),a=t===P.ADMIN;e.innerHTML=G(`
    <!-- Sticky Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">
          ${a?`admin_panel_settings`:`shield_person`}
        </span>
        <h1 class="header-title">${a?`Master Admin Control Center`:`Staff Moderation Center`}</h1>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      
      <!-- Analytics Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: var(--accent-primary);">groups</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${n.totalUsers}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Users</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: #00BA7C;">post</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${n.totalPosts}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Posts</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: #FFD700;">forum</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${n.totalReplies}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Replies</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: var(--error-color);">flag</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--error-color); margin-top: 4px;">${i.length}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Held Reports</span>
        </div>
      </div>

      <!-- Reported Posts Validation Queue Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--error-color);">gavel</span>
              Reported Posts Moderation Queue (${i.length})
            </h3>
            <span style="font-size: 13px; color: var(--text-secondary);">Posts accumulating 2+ community reports are held here awaiting Staff review.</span>
          </div>
        </div>

        ${i.length===0?`
          <div style="padding: 24px; text-align: center; color: var(--text-secondary); font-size: 14px;">
            ✓ No reported posts awaiting validation. The campus feed is clean!
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${i.map(async e=>{let t=await R(e.authorId),n=t?.name?I(t.name):`Student`,r=e.reportCount||0;return`
                <div class="card fade-in" style="padding: 16px; border-radius: 14px; background: var(--bg-primary); border: 1px solid var(--border-color);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="brand-badge" style="font-size: 11px; background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);">
                        ${r} REPORT${r===1?``:`S`} · AWAITING VALIDATION
                      </span>
                      <span style="font-size: 13px; color: var(--text-secondary);">Posted by <strong>${n}</strong> (@${I(t?.username||`student`)})</span>
                    </div>

                    <a href="#/post?id=${e.postId}" class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;">
                      View Full Post
                    </a>
                  </div>

                  <div style="font-size: 15px; color: var(--text-primary); font-weight: 500; margin-bottom: 12px; line-height: 1.4;">
                    "${I(e.content)}"
                  </div>

                  <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn approve-post-btn" data-post-id="${e.postId}" style="font-size: 12px; padding: 6px 14px; background: #00BA7C; font-weight: 700;">
                      ✓ Approve & Reinstate Post
                    </button>
                    
                    <button class="btn delete-reported-btn" data-post-id="${e.postId}" style="font-size: 12px; padding: 6px 14px; background: var(--error-color); font-weight: 700;">
                      🗑️ Delete Post Permanently
                    </button>
                  </div>
                </div>
              `}).join(``)}
          </div>
        `}
      </div>

      <!-- User Management Roster Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">
              Campus User Roster (${r.length})
            </h3>
            <span style="font-size: 13px; color: var(--text-secondary);">Manage student roles, appoint staff, and handle account suspensions.</span>
          </div>

          <div style="display: flex; gap: 8px;">
            <input type="text" id="roster-search-input" class="input-field" placeholder="Filter roster..." style="margin-bottom: 0; padding: 8px 14px; font-size: 13px; width: 180px;" />
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; min-width: 600px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                <th style="padding: 12px 10px;">Student</th>
                <th style="padding: 12px 10px;">Class & Admission</th>
                <th style="padding: 12px 10px;">Role</th>
                <th style="padding: 12px 10px; text-align: right;">Admin Actions</th>
              </tr>
            </thead>
            <tbody id="roster-tbody">
              ${r.map(e=>{let t=H(e,38),n=e.role===P.ADMIN,r=e.role===P.STAFF,i=e.isSuspended||!1;return`
                  <tr class="roster-row" data-name="${I(e.name)}" data-username="${I(e.username)}" style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 10px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        ${t}
                        <div style="display: flex; flex-direction: column;">
                          <span style="font-weight: 700; color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 4px;">
                            ${I(e.name)}
                            ${n?`<span class="material-symbols-outlined" style="font-size: 16px; color: var(--error-color);" title="Master Admin">shield</span>`:``}
                            ${r?`<span class="material-symbols-outlined verified-icon" title="Appointed Staff Moderator">verified</span>`:``}
                          </span>
                          <span style="font-size: 12px; color: var(--text-secondary);">@${I(e.username)}</span>
                        </div>
                      </div>
                    </td>

                    <td style="padding: 12px 10px; color: var(--text-secondary); font-size: 13px;">
                      <div>Class ${I(e.class||`N/A`)}</div>
                      <div style="font-size: 11px; opacity: 0.8;">Adm: ${I(e.admissionNumber||`N/A`)}</div>
                    </td>

                    <td style="padding: 12px 10px;">
                      <span class="brand-badge" style="font-size: 11px; font-weight: 700; ${n?`background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);`:r?`background: rgba(29, 155, 240, 0.2); color: var(--accent-primary); border-color: var(--accent-primary);`:``}">
                        ${n?`MASTER ADMIN`:r?`STAFF MODERATOR`:`STUDENT`}
                      </span>
                    </td>

                    <td style="padding: 12px 10px; text-align: right;">
                      ${n?`
                        <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">System Protected</span>
                      `:`
                        <div style="display: flex; gap: 6px; justify-content: flex-end;">
                          ${a?`
                            <button class="btn ${r?`btn-outline`:``} role-toggle-btn" data-uid="${e.uid}" data-current-role="${e.role}" style="font-size: 11px; padding: 4px 10px;">
                              ${r?`Remove Staff`:`+ Make Staff`}
                            </button>
                          `:``}
                          
                          <button class="btn btn-outline suspend-toggle-btn" data-uid="${e.uid}" style="font-size: 11px; padding: 4px 10px; border-color: ${i?`#00BA7C`:`var(--error-color)`}; color: ${i?`#00BA7C`:`var(--error-color)`};">
                            ${i?`Unsuspend`:`Suspend`}
                          </button>
                        </div>
                      `}
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,O.ADMIN,t);let o=K();e.querySelectorAll(`.approve-post-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.postId;t.disabled=!0,t.textContent=`Reinstating...`;try{await Wt(n),Vr(e)}catch(e){alert(e.message||`Failed to approve post.`),t.disabled=!1}})}),e.querySelectorAll(`.delete-reported-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.postId;if(await M(`Delete Post`,`Are you sure you want to permanently delete this reported post?`)){t.disabled=!0,t.textContent=`Deleting...`;try{await Bt(n),Vr(e)}catch(e){alert(e.message||`Failed to delete post.`),t.disabled=!1}}})});let s=document.getElementById(`roster-search-input`);return s&&s.addEventListener(`input`,()=>{let e=s.value.trim().toLowerCase();document.querySelectorAll(`.roster-row`).forEach(t=>{let n=(t.dataset.name||``).toLowerCase(),r=(t.dataset.username||``).toLowerCase();t.style.display=n.includes(e)||r.includes(e)?``:`none`})}),e.querySelectorAll(`.role-toggle-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.uid,r=t.dataset.currentRole===P.STAFF?P.STUDENT:P.STAFF;t.disabled=!0,t.textContent=`Updating...`;try{await Rt(n,r),Vr(e)}catch(e){alert(e.message||`Failed to update user role.`),t.disabled=!1}})}),e.querySelectorAll(`.suspend-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.uid;e.disabled=!0;try{let n=await zt(t);e.textContent=n?`Unsuspend`:`Suspend`,e.style.borderColor=n?`#00BA7C`:`var(--error-color)`,e.style.color=n?`#00BA7C`:`var(--error-color)`}catch(e){alert(e.message||`Failed to update user suspension state.`)}finally{e.disabled=!1}})}),()=>{o&&o()}}function Hr(e){return e.length===0?`
      <div style="padding: 14px 16px; border-radius: 14px; background: var(--bg-secondary); border: 1px solid var(--border-color); font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 10px;">
        <span class="material-symbols-outlined" style="font-size: 20px;">cloud_off</span>
        No Google Drive connected yet.
      </div>
    `:e.map(e=>`
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 14px; background: var(--bg-secondary); border: 1px solid var(--border-color);">
      <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
        <span class="material-symbols-outlined" style="font-size: 22px; color: #00BA7C;">check_circle</span>
        <span style="font-weight: 600; font-size: 13px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${I(e.email)}</span>
      </div>
      <button class="btn btn-outline drive-disconnect-btn" data-email="${I(e.email)}" style="font-size: 12px; padding: 6px 12px; flex-shrink: 0;">Disconnect</button>
    </div>
  `).join(``)}async function Ur(e){if(!y.currentUser){window.location.hash=`#/login`;return}let t=y.currentUser,n=await R(t.uid),r=await Sn(t.uid);e.innerHTML=G(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">settings</span>
        <h1 class="header-title">Account Settings</h1>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      
      <!-- Account Info Summary Card -->
      <div class="card" style="padding: 20px; border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 20px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">badge</span>
          Account Credentials
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; font-size: 14px;">
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Email Address</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">${I(t.email||`N/A`)}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Username</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">@${I(n?.username||`student`)}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Account Role</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px; text-transform: uppercase;">${I(n?.role||`student`)}</div>
          </div>
        </div>
      </div>

      <!-- Connected Apps Section Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">link</span>
          Connected Google Drives
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
          Connect Google Drive to attach images to your posts and replies. Images are uploaded to your own Drive and set to "anyone with the link can view" so others on Backbench can see them &mdash; nothing else in your Drive is touched. Connect more than one account so uploads automatically move to the next one if the first runs low on space.
        </p>

        <div id="connected-drives-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
          ${Hr(r)}
        </div>

        <button id="drive-connect-btn" class="btn btn-outline" style="font-size: 13px; padding: 8px 16px; display: flex; align-items: center; gap: 6px; width: fit-content;">
          <span class="material-symbols-outlined" style="font-size: 18px;">add</span>
          <span id="drive-connect-btn-label">${r.length===0?`Connect Google Drive`:`Connect another Drive`}</span>
        </button>
        <div id="drive-error-alert" class="error-text" style="display: none; margin-top: 10px; padding: 10px 14px; background: rgba(244, 33, 46, 0.1); border: 1px solid var(--error-color); border-radius: 10px; font-size: 13px;"></div>
      </div>

      <!-- Password Change Section Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color);">
        <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">lock_reset</span>
          Change Password
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
          Enter your new password below. Since you are authenticated in your session, typing a new password will update your security credentials instantly.
        </p>

        <form id="change-password-form" style="display: flex; flex-direction: column; gap: 14px;">
          <div style="position: relative;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">New Password</label>
            <input type="password" id="new-password-input" class="input-field" placeholder="Enter new password (min 6 chars)" style="padding-right: 42px; margin-bottom: 0;" required />
            <button type="button" class="btn-ghost toggle-pwd-btn" data-target="new-password-input" style="position: absolute; right: 10px; bottom: 8px; padding: 4px;" title="Show/Hide Password">
              <span class="material-symbols-outlined" style="font-size: 20px; color: var(--text-secondary);">visibility</span>
            </button>
          </div>

          <div style="position: relative;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">Confirm New Password</label>
            <input type="password" id="confirm-password-input" class="input-field" placeholder="Re-enter new password" style="padding-right: 42px; margin-bottom: 0;" required />
            <button type="button" class="btn-ghost toggle-pwd-btn" data-target="confirm-password-input" style="position: absolute; right: 10px; bottom: 8px; padding: 4px;" title="Show/Hide Password">
              <span class="material-symbols-outlined" style="font-size: 20px; color: var(--text-secondary);">visibility</span>
            </button>
          </div>

          <!-- Alert Messages -->
          <div id="password-error-alert" class="error-text" style="display: none; padding: 10px 14px; background: rgba(244, 33, 46, 0.1); border: 1px solid var(--error-color); border-radius: 10px; font-size: 13px;"></div>
          <div id="password-success-alert" style="display: none; padding: 10px 14px; background: rgba(0, 186, 124, 0.1); border: 1px solid #00BA7C; color: #00BA7C; border-radius: 10px; font-size: 13px; font-weight: 700; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
            <span>Password updated successfully!</span>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
            <button type="submit" id="save-password-btn" class="btn" style="font-weight: 700; padding: 10px 20px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">key</span>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  `,O.SETTINGS,n?.role||`student`);let i=K(),a=document.getElementById(`change-password-form`),o=document.getElementById(`new-password-input`),s=document.getElementById(`confirm-password-input`),c=document.getElementById(`password-error-alert`),l=document.getElementById(`password-success-alert`),u=document.getElementById(`save-password-btn`),d=document.getElementById(`drive-connect-btn`),f=document.getElementById(`drive-connect-btn-label`),p=document.getElementById(`drive-error-alert`),m=document.getElementById(`connected-drives-list`),h=()=>{m.querySelectorAll(`.drive-disconnect-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{e.disabled=!0;try{await xn(t.uid,e.dataset.email),await g()}catch(t){p.textContent=t.message||`Failed to disconnect Google Drive.`,p.style.display=`block`,e.disabled=!1}})})},g=async()=>{let e=await Sn(t.uid);m.innerHTML=Hr(e),f.textContent=e.length===0?`Connect Google Drive`:`Connect another Drive`,h()};return h(),d&&d.addEventListener(`click`,async()=>{p.style.display=`none`,d.disabled=!0;try{await bn(),await g()}catch(e){p.textContent=e.message||`Failed to connect Google Drive.`,p.style.display=`block`}finally{d.disabled=!1}}),e.querySelectorAll(`.toggle-pwd-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.target,n=document.getElementById(t),r=e.querySelector(`.material-symbols-outlined`);n&&(n.type===`password`?(n.type=`text`,r&&(r.textContent=`visibility_off`)):(n.type=`password`,r&&(r.textContent=`visibility`)))})}),a&&a.addEventListener(`submit`,async e=>{e.preventDefault(),c.style.display=`none`,l.style.display=`none`;let t=o.value,n=s.value;if(t.length<6){c.textContent=`Password must be at least 6 characters long.`,c.style.display=`block`;return}if(t!==n){c.textContent=`New password and confirm password do not match.`,c.style.display=`block`;return}u.disabled=!0,u.textContent=`Updating...`;try{await Je(t),a.reset(),l.style.display=`flex`}catch(e){c.textContent=e.message||`Failed to update password.`,c.style.display=`block`}finally{u.disabled=!1,u.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">key</span> Update Password`}}),()=>{i&&i()}}var Wr=null;function Gr(e){if(!y.currentUser){window.location.hash=`#/login`;return}let t=y.currentUser.uid;e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">forum</span>
        <h1 class="header-title">Messages</h1>
      </div>
    </header>

    <div id="threads-list-container" style="padding: 8px 0;">
      ${q(3)}
    </div>
  `,O.MESSAGES);let n=K(),r=document.getElementById(`threads-list-container`);return Wr&&Wr(),Wr=ft(t,e=>{if(!r)return;if(e.length===0){r.innerHTML=`
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">forum</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">No messages yet</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px;">
            Visit a classmate's profile and tap the message icon to start a conversation.
          </p>
          <p style="color: var(--text-muted); margin-top: 12px; font-size: 12px;">
            Messages automatically disappear 3 days after they're sent.
          </p>
        </div>
      `;return}let t=``;e.forEach(e=>{let n=e.otherProfile?.name?I(e.otherProfile.name):`Student`,r=H(e.otherProfile,44,`border: 1px solid var(--border-color);`),i=e.lastMessageText?I(e.lastMessageText):`No messages yet`;t+=`
        <div class="thread-item fade-in" data-uid="${e.otherUid}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; cursor: pointer; border-bottom: 1px solid var(--border-subtle); transition: background 0.15s ease;">
          ${r}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">${n}</span>
              <span class="time-ago" data-timestamp="${e.lastMessageTimestamp||``}" style="font-size: 12px; color: var(--text-secondary);">${e.lastMessageTimestamp?V(e.lastMessageTimestamp):``}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
              <span style="font-size: 13px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 260px; font-weight: ${e.unreadCount>0?`700`:`400`};">
                ${i}
              </span>
              ${e.unreadCount>0?`<span class="brand-badge" style="background: var(--accent-primary); color: #fff; border: none; font-size: 11px; padding: 2px 7px; border-radius: 999px;">${e.unreadCount}</span>`:``}
            </div>
          </div>
        </div>
      `}),r.innerHTML=t,r.querySelectorAll(`.thread-item`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`${O.DM_THREAD}?u=${e.dataset.uid}`})})}),()=>{n&&n(),Wr&&=(Wr(),null)}}var Kr=null;async function qr(e){if(!y.currentUser){window.location.hash=`#/login`;return}let t=y.currentUser.uid,n=window.location.hash,r=null;if(n.includes(`?u=`)&&(r=n.split(`?u=`)[1]),!r||r===t){window.location.hash=O.MESSAGES;return}e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.location.hash='${O.MESSAGES}'" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Loading...</h1>
      </div>
    </header>
    ${q(2)}
  `,O.MESSAGES);let i=await R(r),a=i?.name?I(i.name):`Student`,o=H(i,36,`border: 1px solid var(--border-color);`),s=st(t,r);e.innerHTML=G(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <button class="btn-ghost" onclick="window.location.hash='${O.MESSAGES}'" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <a href="#/profile?u=${I(i?.username||``)}" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit;">
          ${o}
          <h1 class="header-title" style="font-size: 16px;">${a}</h1>
        </a>
      </div>
    </header>

    <div id="dm-expiry-banner" style="padding: 8px 16px; font-size: 12px; color: var(--text-secondary); text-align: center; border-bottom: 1px solid var(--border-subtle);">
      Messages disappear 3 days after they're sent.
    </div>

    <div id="dm-messages-container" style="display: flex; flex-direction: column; gap: 10px; padding: 16px; flex: 1; overflow-y: auto;">
      ${q(2)}
    </div>

    <div class="dm-composer" style="display: flex; gap: 10px; padding: 12px 16px; border-top: 1px solid var(--border-color); background: var(--bg-primary); flex-shrink: 0;">
      <input type="text" id="dm-input" class="input-field" placeholder="Message @${I(i?.username||`student`)}..." maxlength="${B.DM_MAX_CHARS}" style="margin-bottom: 0; flex: 1;" />
      <button id="dm-send-btn" class="btn" disabled>
        <span class="material-symbols-outlined" style="font-size: 18px;">send</span>
      </button>
    </div>
  `,O.MESSAGES);let c=K(),l=document.getElementById(`dm-messages-container`),u=document.getElementById(`dm-input`),d=document.getElementById(`dm-send-btn`);pt(t,s),u.addEventListener(`input`,()=>{d.disabled=u.value.trim().length===0});let f=async()=>{let e=u.value.trim();if(e){d.disabled=!0,u.disabled=!0;try{await ut(r,e),u.value=``}catch(e){j(e.message||`Failed to send message.`)}finally{u.disabled=!1,u.focus(),d.disabled=u.value.trim().length===0}}};return d.addEventListener(`click`,f),u.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),f())}),Kr&&Kr(),Kr=dt(s,e=>{if(!l)return;if(e.length===0){l.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary); font-size: 14px;" class="fade-in">
          Say hello to ${a} 👋
        </div>
      `;return}let n=``;e.forEach(e=>{let r=e.senderId===t;n+=`
        <div style="display: flex; justify-content: ${r?`flex-end`:`flex-start`};">
          <div style="max-width: 75%; padding: 8px 12px; border-radius: 16px; ${r?`background: var(--accent-primary); color: #fff; border-bottom-right-radius: 4px;`:`background: var(--bg-secondary); color: var(--text-primary); border-bottom-left-radius: 4px;`}">
            <div style="font-size: 14px; line-height: 1.4; word-break: break-word;">${L(e.text)}</div>
            <div style="font-size: 10px; margin-top: 3px; opacity: 0.7; text-align: right;">${V(e.timestamp)}</div>
          </div>
        </div>
      `}),l.innerHTML=n,l.scrollTop=l.scrollHeight,pt(t,s)}),()=>{c&&c(),Kr&&=(Kr(),null)}}var Q=null,$=null;function Jr(e){Q=e,window.addEventListener(`hashchange`,Yr),window.location.hash?Yr():window.location.hash=O.HOME}async function Yr(){let e=window.location.hash.split(`?`)[0];if($&&typeof $==`function`&&($(),$=null),Q&&(Q.innerHTML=``),y.currentUser&&e!==`#/login`&&e!==`#/signup`&&e!==O.ONBOARDING&&!qe(await R(y.currentUser.uid))){window.location.hash=O.ONBOARDING,$=await hr(Q);return}switch(e){case`#/login`:case`#/signup`:$=await In(Q,e);break;case O.ONBOARDING:$=await hr(Q);break;case O.HOME:$=await Pn(Q);break;case O.PROFILE:$=await er(Q);break;case`#/notifications`:$=await ar(Q);break;case`#/friends`:$=await rr(Q);break;case O.POST_DETAIL:$=await fr(Q);break;case`#/search`:$=await mr(Q);break;case O.PETITIONS:$=await vr(Q);break;case`#/petition`:$=await yr(Q);break;case O.PETITION_FRAME:$=await xr(Q);break;case O.PROFILE_FRAME:$=await Cr(Q);break;case O.POLLS:$=await Tr(Q);break;case`#/poll`:$=await Dr(Q);break;case O.ANNOUNCEMENTS:$=await Ar(Q);break;case O.EVENTS:$=await Rr(Q);break;case`#/event`:$=await zr(Q);break;case O.ADMIN:$=await Vr(Q);break;case O.SETTINGS:$=await Ur(Q);break;case O.MESSAGES:$=await Gr(Q);break;case O.DM_THREAD:$=await qr(Q);break;default:Q.innerHTML=`<div style="padding: 40px; text-align: center;"><h1>404 Page Not Found</h1></div>`;break}}var Xr=!1;function Zr(e,...t){let n=r=>{let i=window.AndroidInterface;if(i&&typeof i[e]==`function`){console.log(`[BB-BRIDGE] calling AndroidInterface.${e}() (retriesLeft=${r})`),i[e](...t);return}if(r<=0){console.warn(`[BB-BRIDGE-GIVEUP] AndroidInterface.${e} never became available`);return}setTimeout(()=>n(r-1),300)};n(10)}function Qr(){let e=document.querySelector(`#app`);e.innerHTML=`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
      <img src="/favicon.png" style="width: 56px; height: 56px; border-radius: 16px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); object-fit: cover;" class="pulse-badge" alt="Logo" />
      <p style="margin-top: 16px; color: var(--text-secondary); font-size: 14px; font-weight: 600;">Restoring session...</p>
    </div>
  `,h(y,async t=>{if(console.log(`[BB-C1] onAuthStateChanged fired, user=`,t?t.uid:null),t)try{let e=await t.getIdToken();console.log(`[BB-C2] getIdToken() resolved, length=`,e?e.length:0);let n=t.refreshToken||t.stsTokenManager&&t.stsTokenManager.refreshToken;console.log(`[BB-C3] refreshToken resolved, present=`,!!n,`length=`,n?n.length:0),ee(`backbench_token`,e,30),ee(`backbench_uid`,t.uid,30),console.log(`[BB-C4] cookies set (backbench_token, backbench_uid)`),console.log(`[BB-C5] window.AndroidInterface present=`,!!window.AndroidInterface,`window.electronAPI present=`,!!window.electronAPI),n?(Zr(`saveAuthToken`,n),window.electronAPI&&typeof window.electronAPI.saveAuthToken==`function`&&(console.log(`[BB-C8] calling electronAPI.saveAuthToken()`),window.electronAPI.saveAuthToken(n))):console.warn(`[BB-C3-FAIL] refreshToken is falsy - cannot bridge auth to native background services at all`),Zr(`saveUserId`,t.uid),lt(t.uid)}catch(e){console.error(`[BB-C-ERR] Error retrieving ID token:`,e)}else console.log(`[BB-C11] user is null (signed out) - clearing cookies and native uid`),te(`backbench_token`),te(`backbench_uid`),window.AndroidInterface&&typeof window.AndroidInterface.clearUserId==`function`&&window.AndroidInterface.clearUserId();Xr?!t&&window.location.hash!==`#/login`&&window.location.hash!==`#/signup`&&(window.location.hash=`#/login`):(Xr=!0,Jr(e))})}document.addEventListener(`DOMContentLoaded`,Qr);