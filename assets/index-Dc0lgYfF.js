import{C as e,S as t,_ as n,a as r,b as i,c as a,d as o,f as s,g as c,h as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as _,t as v,u as y,v as b,w as x,x as S,y as C}from"./firebase-CtcSoZ93.js";import{t as w}from"./firebasePaths-D-4D9olD.js";var T=Object.defineProperty,E=(e,t)=>{let n={};for(var r in e)T(n,r,{get:e[r],enumerable:!0});return t||T(n,Symbol.toStringTag,{value:`Module`}),n};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var D={HOME:`#/`,PROFILE:`#/profile`,PROFILE_FRAME:`#/profile-frame`,POST_DETAIL:`#/post`,ONBOARDING:`#/onboarding`,PETITIONS:`#/petitions`,PETITION_FRAME:`#/petition-frame`,POLLS:`#/polls`,ANNOUNCEMENTS:`#/announcements`,EVENTS:`#/events`,SETTINGS:`#/settings`,ADMIN:`#/admin`};function O(e,t,n){let r=Array.from(e.children),i=new Map;r.forEach(e=>{e.hasAttribute(`data-feed-id`)&&i.set(e.getAttribute(`data-feed-id`),e)}),i.forEach((e,n)=>{t.has(n)||e.remove()});let a=null;n.forEach(n=>{let r=i.get(n),o=t.get(n);r?r.innerHTML!==o&&(r.innerHTML=o):(r=document.createElement(`div`),r.setAttribute(`data-feed-id`,n),r.className=`feed-item-wrapper fade-in`,r.innerHTML=o),a?a.nextSibling!==r&&e.insertBefore(r,a.nextSibling):e.firstChild!==r&&e.insertBefore(r,e.firstChild),a=r});let o=document.getElementById(`load-more-trigger`);o&&a&&o.previousSibling!==a&&e.appendChild(o)}function k(e,t){return new Promise(n=>{let r=document.createElement(`div`);r.style.position=`fixed`,r.style.inset=`0`,r.style.backgroundColor=`rgba(0, 0, 0, 0.6)`,r.style.backdropFilter=`blur(4px)`,r.style.zIndex=`9999`,r.style.display=`flex`,r.style.alignItems=`center`,r.style.justifyContent=`center`,r.style.padding=`20px`,r.style.animation=`fadeIn 0.2s ease`;let i=document.createElement(`div`);i.className=`card`,i.style.width=`100%`,i.style.maxWidth=`400px`,i.style.padding=`24px`,i.style.borderRadius=`var(--radius)`,i.style.boxShadow=`0 10px 25px rgba(0,0,0,0.1)`,i.style.transform=`translateY(10px)`,i.style.animation=`slideUp 0.2s ease forwards`,i.innerHTML=`
      <h3 style="margin-top:0; font-size: 18px; color: var(--text-primary);">${e}</h3>
      <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 15px; line-height: 1.5;">${t}</p>
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="modal-cancel-btn" class="btn btn-outline" style="padding: 8px 16px;">Cancel</button>
        <button id="modal-confirm-btn" class="btn" style="padding: 8px 16px; background: var(--critical); border-color: var(--critical);">Confirm</button>
      </div>
    `,r.appendChild(i),document.body.appendChild(r);let a=e=>{r.style.opacity=`0`,setTimeout(()=>r.remove(),200),n(e)};i.querySelector(`#modal-cancel-btn`).onclick=()=>a(!1),i.querySelector(`#modal-confirm-btn`).onclick=()=>a(!0),r.onclick=e=>{e.target===r&&a(!1)}})}function A(e,t=``,n=``,r=null,i=null,a=null){return new Promise(a=>{let o=document.createElement(`div`);o.style.position=`fixed`,o.style.inset=`0`,o.style.backgroundColor=`rgba(0, 0, 0, 0.6)`,o.style.backdropFilter=`blur(4px)`,o.style.zIndex=`9999`,o.style.display=`flex`,o.style.alignItems=`center`,o.style.justifyContent=`center`,o.style.padding=`20px`,o.style.animation=`fadeIn 0.2s ease`;let s=document.createElement(`div`);s.className=`card`,s.style.width=`100%`,s.style.maxWidth=`400px`,s.style.padding=`24px`,s.style.borderRadius=`var(--radius)`,s.style.boxShadow=`0 10px 25px rgba(0,0,0,0.1)`,s.style.transform=`translateY(10px)`,s.style.animation=`slideUp 0.2s ease forwards`;let c=``;i&&(c=`<div id="modal-word-counter" style="font-size: 12px; color: var(--text-secondary); text-align: right; margin-top: 4px;">0 / ${i} words</div>`),s.innerHTML=`
      <h3 style="margin-top:0; font-size: 18px; color: var(--text-primary); margin-bottom: 16px;">${e}</h3>
      <textarea id="modal-prompt-input" class="input" rows="4" placeholder="${n}" style="width: 100%; resize: vertical; margin-bottom: 4px;">${t}</textarea>
      ${c}
      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
        <button id="modal-cancel-btn" class="btn btn-outline" style="padding: 8px 16px;">Cancel</button>
        <button id="modal-confirm-btn" class="btn" style="padding: 8px 16px;">Save</button>
      </div>
    `,o.appendChild(s),document.body.appendChild(o);let l=s.querySelector(`#modal-prompt-input`),u=s.querySelector(`#modal-confirm-btn`),d=s.querySelector(`#modal-word-counter`);r&&(l.maxLength=r);let f=()=>{if(!i)return!0;let e=l.value.trim(),t=e?e.split(/\s+/):[];return d&&(d.textContent=`${t.length} / ${i} words`,t.length>i?d.style.color=`var(--critical)`:d.style.color=`var(--text-secondary)`),t.length<=i};l.addEventListener(`input`,()=>{let e=f();u.disabled=!e}),f(),l.focus(),l.selectionStart=l.selectionEnd=l.value.length;let p=e=>{o.style.opacity=`0`,setTimeout(()=>o.remove(),200),a(e)};s.querySelector(`#modal-cancel-btn`).onclick=()=>p(null),u.onclick=()=>{f()&&p(l.value)},o.onclick=e=>{e.target===o&&p(null)}})}var j={STUDENT:`student`,STAFF:`staff`,ADMIN:`admin`};function M(e,t,n=30){let r=new Date(Date.now()+n*864e5).toUTCString();document.cookie=`${e}=${encodeURIComponent(t)}; expires=${r}; path=/; SameSite=Lax`}function N(e){document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`}function P(e){if(!e)return``;let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function F(e){if(!e)return[];let t=e.match(/#([a-zA-Z0-9_]+)/g);if(!t)return[];let n=t.map(e=>e.replace(/^#/,``).toLowerCase());return Array.from(new Set(n))}function ee(e){return e?P(e).replace(/#([a-zA-Z0-9_]+)/g,(e,t)=>`<a href="#/search?q=%23${encodeURIComponent(t.toLowerCase())}" class="hashtag-link" onclick="event.stopPropagation()" style="color: var(--accent-primary); font-weight: 700; text-decoration: none;">${e}</a>`).replace(/\n/g,`<br>`):``}var I=E({createPost:()=>te,deleteOwnPost:()=>pe,editPost:()=>ne,getLikedPostsByUser:()=>fe,getRelatedPosts:()=>oe,getSavedPosts:()=>ge,getTrendingHashtags:()=>ae,getUserProfile:()=>L,invalidateUserCache:()=>R,isPostLikedByUser:()=>z,isPostResharedByUser:()=>de,isPostSaved:()=>me,subscribeToFeed:()=>re,subscribeToPost:()=>_e,subscribeToUserPosts:()=>ie,toggleLikePost:()=>le,toggleResharePost:()=>ue,toggleSavedPost:()=>he,updateUserProfile:()=>ce});async function te(t,n=!1){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);if(t.replace(/\s/g,``).length>189)throw Error(`Post cannot exceed 189 characters`);let a=F(t),o=b(i(p,w.POSTS)),s={postId:o.key,authorId:r.uid,content:t,hashtags:a,timestamp:new Date().toISOString(),status:`ACTIVE`,reportCount:0,edited:!1,likes:0,reshares:0,replyCount:0,isAnonymous:n};return await e(o,s),s}async function ne(e,t){let n=v.currentUser;if(!n)throw Error(`Not authenticated`);let r=t?t.trim():``;if(!r)throw Error(`Post content cannot be empty`);let a=await h(i(p,`${w.POSTS}/${e}`));if(!a.exists())throw Error(`Post not found`);if(a.val().authorId!==n.uid)throw Error(`Unauthorized: You can only edit your own posts.`);let o=F(r);return await x(i(p,`${w.POSTS}/${e}`),{content:r,hashtags:o,edited:!0,updatedAt:new Date().toISOString()}),!0}function re(e=20,t){let r=C(i(p,w.POSTS),n(`timestamp`),f(e)),a=c(r,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&t.status!==`AWAITING_MODERATION`&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching feed:`,e)});return()=>l(r,`value`,a)}function ie(e,t){if(!e)return t([]),()=>{};let r=C(i(p,w.POSTS),n(`authorId`),s(e),f(20)),a=c(r,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching user posts:`,e),t([])});return()=>l(r,`value`,a)}async function ae(e=5){try{let t=await h(i(p,w.POSTS));if(!t.exists())return[];let n={};t.forEach(e=>{let t=e.val();if(t&&t.status!==`AWAITING_MODERATION`){let e=t.hashtags;!e&&t.content&&(e=F(t.content)),e&&Array.isArray(e)&&e.forEach(e=>{n[e]=(n[e]||0)+1})}});let r=Object.keys(n).map(e=>({tag:e,count:n[e]}));return r.sort((e,t)=>t.count-e.count),r.slice(0,e)}catch(e){return console.error(`Error getting trending hashtags:`,e),[]}}async function oe(e,t=[],n=4){try{let r=await h(i(p,w.POSTS));if(!r.exists())return[];let a=[];return r.forEach(r=>{let i=r.val();if(i&&i.postId!==e&&i.status!==`AWAITING_MODERATION`){let e=i.hashtags;!e&&i.content&&(e=F(i.content));let r=0;e&&Array.isArray(e)&&t.length>0&&(r=e.filter(e=>t.includes(e)).length),(r>0||a.length<n)&&a.push({...i,score:r})}}),a.sort((e,t)=>t.score-e.score||new Date(t.timestamp||0)-new Date(e.timestamp||0)),a.slice(0,n)}catch(e){return console.error(`Error getting related posts:`,e),[]}}var se=new Map;async function L(e){if(!e)return null;if(se.has(e))return se.get(e);let t=await h(i(p,`${w.USERS}/${e}`));if(t.exists()){let n=t.val();return se.set(e,n),n}return null}function R(e){e&&se.delete(e)}async function ce(e,t){let n=v.currentUser?.uid||e;if(!n)throw Error(`Not authenticated`);let r={};Object.keys(t).forEach(e=>{t[e]!==void 0&&(r[e]=t[e])}),await x(i(p,`${w.USERS}/${n}`),r),se.delete(n)}async function le(n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=i(p,`${w.POST_LIKES}/${n}/${r.uid}`),o=await h(a),s=!1;o.exists()?(await S(a),s=!1):(await e(a,!0),s=!0);let c=i(p,`${w.POSTS}/${n}`),l=0;return await t(c,e=>(e&&(e.likes=s?(e.likes||0)+1:Math.max(0,(e.likes||0)-1),l=e.likes),e)),{liked:s,likes:l}}async function z(e,t){return t?(await h(i(p,`${w.POST_LIKES}/${e}/${t}`))).exists():!1}async function ue(n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=i(p,`${w.POST_RESHARES}/${n}/${r.uid}`),o=await h(a),s=!1;o.exists()?(await S(a),s=!1):(await e(a,new Date().toISOString()),s=!0);let c=i(p,`${w.POSTS}/${n}`),l=0;return await t(c,e=>(e&&(e.reshares=s?(e.reshares||0)+1:Math.max(0,(e.reshares||0)-1),l=e.reshares),e)),{reshared:s,reshares:l}}async function de(e,t){return t?(await h(i(p,`${w.POST_RESHARES}/${e}/${t}`))).exists():!1}async function fe(e){if(!e)return[];try{let t=await h(i(p,w.POST_LIKES));if(!t.exists())return[];let n=[];if(t.forEach(t=>{let r=t.key;t.hasChild(e)&&n.push(r)}),n.length===0)return[];let r=[];for(let e of n){let t=await h(i(p,`${w.POSTS}/${e}`));if(t.exists()){let e=t.val();e&&e.status!==`AWAITING_MODERATION`&&r.push(e)}}return r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),r}catch(e){return console.error(`Error fetching liked posts:`,e),[]}}async function pe(e){let t=v.currentUser;if(!t)throw Error(`Not authenticated`);let n=await h(i(p,`${w.POSTS}/${e}`));if(!n.exists())throw Error(`Post not found`);if(n.val().authorId!==t.uid)throw Error(`Unauthorized: You can only delete your own posts.`);return await S(i(p,`${w.POSTS}/${e}`)),await S(i(p,`${w.REPLIES}/${e}`)),await S(i(p,`${w.POST_LIKES}/${e}`)),await S(i(p,`${w.POST_RESHARES}/${e}`)),!0}async function me(e){let t=v.currentUser;if(!t)return!1;try{return(await h(i(p,`${w.SAVED_POSTS}/${t.uid}/${e}`))).exists()}catch{return!1}}async function he(t){let n=v.currentUser;if(!n)throw Error(`Not authenticated`);let r=i(p,`${w.SAVED_POSTS}/${n.uid}/${t}`);return(await h(r)).exists()?(await S(r),!1):(await e(r,{postId:t,timestamp:new Date().toISOString()}),!0)}async function ge(e){let t=e||v.currentUser?.uid;if(!t)return[];try{let e=await h(i(p,`${w.SAVED_POSTS}/${t}`));if(!e.exists())return[];let n=e.val(),r=Object.keys(n),a=[];for(let e of r)try{let t=await h(i(p,`${w.POSTS}/${e}`));if(t.exists()){let r=t.val();r&&a.push({...r,_savedTimestamp:n[e].timestamp})}}catch(t){console.error(`Error fetching post`,e,t)}return a.sort((e,t)=>new Date(t._savedTimestamp||0)-new Date(e._savedTimestamp||0)),a}catch(e){return console.error(`Error fetching saved posts:`,e),[]}}function _e(e,t){return c(i(p,`${w.POSTS}/${e}`),e=>{e.exists()?t(e.val()):t(null)},e=>{console.error(`Error fetching post:`,e),t(null)})}var ve=`backbench_multi_accounts_v1`,ye=3;function be(){try{let e=localStorage.getItem(ve);return e?JSON.parse(e):[]}catch(e){return console.error(`Error reading multi-accounts:`,e),[]}}function xe(e,t,n){if(!e||!t||!n)return;let r=be(),i=r.findIndex(t=>t.uid===n.uid||t.email.toLowerCase()===e.toLowerCase()),a={uid:n.uid,email:e,password:btoa(t),name:n.name||`Student`,username:n.username||`student`,profilePicture:n.profilePicture||``,role:n.role||`student`,lastActive:new Date().toISOString()};i>=0?r[i]=a:(r.length>=ye&&r.shift(),r.push(a)),localStorage.setItem(ve,JSON.stringify(r))}async function Se(e){let t=be().find(t=>t.uid===e);if(!t)throw Error(`Account session not found. Please log in again.`);let n=t.email,r=atob(t.password);try{return await y(v),R((await a(v,n,r)).user.uid),window.location.hash=`#/`,window.location.reload(),!0}catch(t){throw console.error(`Switch account error:`,t),Ce(e),Error(`Session expired for this account. Please log in again.`)}}function Ce(e){let t=be();t=t.filter(t=>t.uid!==e),localStorage.setItem(ve,JSON.stringify(t))}async function we(){localStorage.removeItem(ve),await y(v),window.location.hash=`#/login`,window.location.reload()}function Te(e){let t=e?.code||``,n=e?.message||``;return t===`auth/unauthorized-domain`||n.includes(`unauthorized-domain`)?`Unauthorized Domain Error: Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized domains.`:t===`auth/user-not-found`||t===`auth/wrong-password`||t===`auth/invalid-credential`?`Invalid email or password. Please verify your login credentials.`:t===`auth/email-already-in-use`?`An account with this email address already exists. Please log in instead.`:n||`Authentication failed. Please try again.`}function Ee(e){if(!e)return!1;if(e.role===j.ADMIN)return!0;let t=e.username,n=e.admissionNumber,r=e.class||e.userClass;return!(!t||t.trim()===``||!n||n===`N/A`||n.trim()===``||!r||r===`N/A`||r.trim()===``)}async function De(e){let t=v.currentUser;if(!t)throw Error(`Not authenticated`);if(!e||e.length<6)throw Error(`Password must be at least 6 characters long.`);try{return await o(t,e),!0}catch(e){throw console.error(`Update password error:`,e),e.code===`auth/requires-recent-login`?Error(`Security Notice: Changing password requires a recent login session. Please log out and log in again, then update your password.`):Error(e.message||`Failed to update password.`)}}async function Oe(t){try{let{email:n,password:r,username:a,name:o,admissionNumber:s,userClass:c,mobile:l,isTeacher:d,role:f}=t,m=(await u(v,n,r)).user,h={uid:m.uid,username:a,name:o,admissionNumber:s,class:c,mobile:l,email:n,isTeacher:d||!1,role:f||j.STUDENT,bio:``,tagline:``,joinedDate:new Date().toISOString(),verifiedStudent:!1,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:``};return await e(i(p,`${w.USERS}/${m.uid}`),h),R(m.uid),xe(n,r,h),{success:!0,user:h}}catch(e){return console.error(`Registration error:`,e),{success:!1,error:Te(e)}}}async function ke(e,t){try{let n=await a(v,e,t),r=j.STUDENT,o=await h(i(p,`${w.USERS}/${n.user.uid}`));return xe(e,t,o.exists()?o.val():{uid:n.user.uid,name:e.split(`@`)[0],username:e.split(`@`)[0],role:r}),{success:!0,user:n.user}}catch(e){return console.error(`Login error:`,e),{success:!1,error:Te(e)}}}async function Ae(){try{return N(`backbench_token`),N(`backbench_uid`),await y(v),{success:!0}}catch(e){return{success:!1,error:e.message}}}var je=new g;async function Me(){try{let t;if(window.electronAPI&&window.electronAPI.signInWithGoogle){let e=await window.electronAPI.signInWithGoogle();t=(await _(v,g.credential(e.idToken,e.accessToken))).user}else if(window.AndroidInterface){window.AndroidInterface.signInWithGoogle();let e=await new Promise((e,t)=>{window.onAndroidGoogleAuth=(n,r)=>{n?e({idToken:n,accessToken:r}):t(Error(`Android Google Auth Failed`))}});t=(await _(v,g.credential(e.idToken,e.accessToken))).user}else t=(await d(v,je)).user;let n=t.refreshToken||t.stsTokenManager&&t.stsTokenManager.refreshToken;if(n&&(window.AndroidInterface&&window.AndroidInterface.saveAuthToken&&window.AndroidInterface.saveAuthToken(n),window.electronAPI&&window.electronAPI.saveAuthToken&&window.electronAPI.saveAuthToken(n)),t.uid&&window.AndroidInterface&&window.AndroidInterface.saveUserId&&window.AndroidInterface.saveUserId(t.uid),t.email)try{if((await r(v,t.email)).includes(`password`)&&!t.providerData.some(e=>e.providerId===`google.com`))return await y(v),{success:!1,error:`An account already exists with this email address using Email & Password. Please log in with your email and password instead.`}}catch{}let a=i(p,`${w.USERS}/${t.uid}`),o=await h(a),s=null;if(o.exists())s=o.val();else{let n=t.email.split(`@`)[0].replace(/[^a-zA-Z0-9_.]/g,``);s={uid:t.uid,username:n,name:t.displayName||`Google User`,admissionNumber:`N/A`,class:`N/A`,mobile:t.phoneNumber||``,email:t.email,bio:``,tagline:``,joinedDate:new Date().toISOString(),verifiedStudent:!1,role:j.STUDENT,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:t.photoURL||``},await e(a,s),R(t.uid)}let c=Ee(s);return{success:!0,user:t,needsOnboarding:!c}}catch(e){return console.error(`Google Sign-In error:`,e),e.code===`auth/account-exists-with-different-credential`?{success:!1,error:`An account already exists with this email address using Email & Password. Please log in with your email and password instead.`}:{success:!1,error:Te(e)}}}async function Ne(e){if(!e)return[];let t=e.trim().toLowerCase().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3)return[];let n=await h(i(p,w.USERS));if(!n.exists())return[];let r=[],a=v.currentUser?.uid;return n.forEach(e=>{let n=e.val();if(!n||n.uid===a)return;let i=(n.name||``).toLowerCase(),o=(n.username||``).toLowerCase(),s=(n.admissionNumber||``).toLowerCase(),c=(n.class||``).toLowerCase();(i.includes(t)||o.includes(t)||s.includes(t)||c.includes(t))&&r.push(n)}),r}var Pe=E({clearReadNotifications:()=>ze,markAllNotificationsAsRead:()=>Re,markNotificationAsRead:()=>Le,sendNotification:()=>Fe,subscribeToUserNotifications:()=>Ie});async function Fe(t,n){if(!t)return;let r=b(i(p,`notifications/${t}`)),a={notificationId:r.key,text:n.text,type:n.type||`SYSTEM`,postId:n.postId||null,senderId:n.senderId||null,read:!1,timestamp:new Date().toISOString()};return await e(r,a),a}function Ie(e,t){if(!e)return t([]),()=>{};let n=i(p,`notifications/${e}`),r=c(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching notifications:`,e),t([])});return()=>l(n,`value`,r)}async function Le(e,t){!e||!t||await x(i(p,`notifications/${e}/${t}`),{read:!0})}async function Re(e){if(!e)return;let t=await h(i(p,`notifications/${e}`));if(t.exists()){let n={};t.forEach(t=>{n[`notifications/${e}/${t.key}/read`]=!0}),await x(i(p),n)}}async function ze(e){if(!e)return;let t=await h(i(p,`notifications/${e}`));t.exists()&&t.forEach(t=>{t.val().read&&S(i(p,`notifications/${e}/${t.key}`))})}async function Be(e){let t=v.currentUser;if(!t||!e)return!1;try{return(await h(i(p,`${w.FRIENDS}/${t.uid}/${e}`))).exists()}catch(e){return console.error(`Error checking friend status:`,e),!1}}async function Ve(e,t){if(!e||!t)return!1;try{let n=await h(i(p,`${w.FRIENDS}/${e}/${t}`)),r=await h(i(p,`${w.FRIENDS}/${t}/${e}`));return n.exists()&&r.exists()}catch{return!1}}async function He(t){let n=v.currentUser;if(!n||!t)return!1;if(n.uid===t)throw Error(`You cannot add yourself as a friend.`);let r=i(p,`${w.FRIENDS}/${n.uid}/${t}`);return(await h(r)).exists()?(await S(r),!1):(await e(r,{timestamp:new Date().toISOString()}),await Fe(t,{text:`${(await L(n.uid))?.name||`Someone`} added you as a friend.`,type:`FRIEND_REQUEST`,senderId:n.uid}),!0)}async function Ue(e){if(!e)return[];try{let t=await h(i(p,`${w.FRIENDS}/${e}`));if(t.exists())return Object.keys(t.val())}catch(e){console.error(`Error fetching friend UIDs:`,e)}return[]}async function We(e){return(await Ue(e)).length}async function Ge(e){let t=await Ue(e),n=[];for(let r of t){let t=await L(r);if(t){let i=await Ve(e,r);n.push({...t,isMutual:i})}}return n}async function Ke(t){let n=v.currentUser;if(!n)throw Error(`Not authenticated`);let{title:r,content:a,severity:o}=t;if(!r||r.trim().length===0)throw Error(`Announcement title is required.`);if(!a||a.trim().length===0)throw Error(`Announcement content is required.`);let s=b(i(p,w.ANNOUNCEMENTS)),c={id:s.key,authorId:n.uid,title:r.trim(),content:a.trim(),severity:o||`info`,timestamp:new Date().toISOString()};return await e(s,c),c}async function qe(e,t,n,r){let a=v.currentUser;if(!a)throw Error(`Not authenticated`);let o=t?t.trim():``,s=n?n.trim():``;if(!o||!s)throw Error(`Title and content are required.`);let c=await h(i(p,`${w.ANNOUNCEMENTS}/${e}`));if(!c.exists())throw Error(`Announcement not found`);if(c.val().authorId!==a.uid)throw Error(`Unauthorized: You can only edit your own announcements.`);return await x(i(p,`${w.ANNOUNCEMENTS}/${e}`),{title:o,content:s,severity:r||`info`,edited:!0,updatedAt:new Date().toISOString()}),!0}function Je(e=20,t){let r=C(i(p,w.ANNOUNCEMENTS),n(`timestamp`),f(e)),a=c(r,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching announcements:`,e)});return()=>l(r,`value`,a)}async function Ye(t){if(!v.currentUser)throw Error(`Not authenticated`);await e(i(p,`${w.ANNOUNCEMENTS}/${t}`),null)}function B(e){if(!e)return``;let t=Math.floor((new Date-new Date(e))/1e3),n=t/31536e3;return n>1?Math.floor(n)+` years ago`:(n=t/2592e3,n>1?Math.floor(n)+` months ago`:(n=t/86400,n>1?Math.floor(n)+` days ago`:(n=t/3600,n>1?Math.floor(n)+` hours ago`:(n=t/60,n>1?Math.floor(n)+` minutes ago`:t<10?`just now`:Math.floor(t)+` seconds ago`))))}setInterval(()=>{document.querySelectorAll(`.time-ago[data-timestamp]`).forEach(e=>{let t=e.getAttribute(`data-timestamp`);t&&(e.textContent=B(t))})},6e4);var Xe=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23202327'/%3E%3Cpath d='M64 28a20 20 0 1 0 0 40 20 20 0 0 0 0-40zM32 100c0-17.673 14.327-32 32-32s32 14.327 32 32v4H32v-4z' fill='%2371767B'/%3E%3C/svg%3E`;typeof window<`u`&&(window.handleAvatarError=function(e){e&&e.src!==Xe&&(e.onerror=null,e.src=Xe)});function V(e,t=44,n=``){let r=null;return typeof e==`string`?r=e:e&&e.profilePicture&&(r=e.profilePicture),`
    <img 
      src="${r||Xe}" 
      onerror="window.handleAvatarError(this)" 
      style="width: ${t}px; height: ${t}px; border-radius: 50% !important; object-fit: cover !important; aspect-ratio: 1 / 1 !important; flex-shrink: 0 !important; background: var(--bg-tertiary); ${n}" 
      alt="User Avatar" 
    />
  `}var Ze=`modulepreload`,Qe=function(e,t){return new URL(e,t).href},$e={},H=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Qe(t,n),t=s(t),t in $e)return;$e[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Ze,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function U(e){return window.location.hash.split(`?`)[0]===e||e===D.HOME&&(!window.location.hash||window.location.hash===`#/`)}function W(e,t=``,n=`student`){let r=v.currentUser,i=r?r.displayName||r.email.split(`@`)[0]:`Student`,a=i.charAt(0).toUpperCase();return`
    <div class="app-layout">
      <!-- Left Navigation Sidebar -->
      <aside class="sidebar-container">
        <div class="sidebar-top">
          <!-- Backbench Brand Header -->
          <a href="${D.HOME}" class="brand-header" style="text-decoration: none;">
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
            <a href="${D.HOME}" class="nav-item ${U(D.HOME)?`active`:``}">
              <span class="material-symbols-outlined">home</span>
              <span class="sidebar-label">Home</span>
            </a>
            
            <a href="${D.PROFILE}" class="nav-item ${U(D.PROFILE)?`active`:``}">
              <span class="material-symbols-outlined">person</span>
              <span class="sidebar-label">Profile</span>
            </a>

            <a href="#/notifications" class="nav-item ${U(`#/notifications`)?`active`:``}" style="position: relative;">
              <span class="material-symbols-outlined">notifications</span>
              <span class="sidebar-label">Notifications</span>
              <span id="unread-notif-badge" class="brand-badge" style="display: none; position: absolute; right: 12px; background: var(--error-color); color: #fff; border: none; font-size: 11px; padding: 2px 6px;"></span>
            </a>

            <a href="#/friends" class="nav-item ${U(`#/friends`)?`active`:``}">
              <span class="material-symbols-outlined">group</span>
              <span class="sidebar-label">Friends</span>
            </a>

            <a href="#/search" class="nav-item ${U(`#/search`)?`active`:``}">
              <span class="material-symbols-outlined">search</span>
              <span class="sidebar-label">Search</span>
            </a>
            
            <a href="${D.PETITIONS}" class="nav-item ${U(D.PETITIONS)?`active`:``}">
              <span class="material-symbols-outlined">campaign</span>
              <span class="sidebar-label">Petitions</span>
            </a>
            
            <a href="${D.POLLS}" class="nav-item ${U(D.POLLS)?`active`:``}">
              <span class="material-symbols-outlined">poll</span>
              <span class="sidebar-label">Polls</span>
            </a>
            
            <a href="${D.ANNOUNCEMENTS}" class="nav-item ${U(D.ANNOUNCEMENTS)?`active`:``}">
              <span class="material-symbols-outlined">campaign</span>
              <span class="sidebar-label">Announcements</span>
            </a>
            
            <a href="${D.EVENTS}" class="nav-item ${U(D.EVENTS)?`active`:``}">
              <span class="material-symbols-outlined">event</span>
              <span class="sidebar-label">Events</span>
            </a>

            <a href="${D.SETTINGS}" class="nav-item ${U(D.SETTINGS)?`active`:``}">
              <span class="material-symbols-outlined">settings</span>
              <span class="sidebar-label">Settings</span>
            </a>

            <a href="https://github.com/Shashwat-Gupta57/Backbench/releases/download/v2.0.0/Backbench.apk" class="nav-item" target="_blank" rel="noopener noreferrer" style="color: var(--success-color);">
              <span class="material-symbols-outlined">android</span>
              <span class="sidebar-label">Install App</span>
            </a>
            
            ${n===`admin`?`
              <a href="${D.ADMIN}" class="nav-item ${U(D.ADMIN)?`active`:``}">
                <span class="material-symbols-outlined">admin_panel_settings</span>
                <span class="sidebar-label">Admin</span>
              </a>
            `:n===`staff`?`
              <a href="${D.ADMIN}" class="nav-item ${U(D.ADMIN)?`active`:``}">
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
                <span class="user-mini-name">${P(i)}</span>
                <span class="user-mini-handle">@${P(i.toLowerCase().replace(/\s+/g,``))}</span>
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
                Log out @${P(i.toLowerCase().replace(/\s+/g,``))}
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
        <a href="${D.HOME}" class="mobile-nav-item ${U(D.HOME)?`active`:``}">
          <span class="material-symbols-outlined">home</span>
        </a>
        <a href="#/notifications" class="mobile-nav-item ${U(`#/notifications`)?`active`:``}">
          <span class="material-symbols-outlined">notifications</span>
        </a>
        <a href="#/search" class="mobile-nav-item ${U(`#/search`)?`active`:``}">
          <span class="material-symbols-outlined">search</span>
        </a>
        <a href="${D.PROFILE}" class="mobile-nav-item ${U(D.PROFILE)?`active`:``}">
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
  `}function G(){let e=v.currentUser,t=document.getElementById(`user-menu-btn`),n=document.getElementById(`multi-account-popover`),r=document.getElementById(`saved-accounts-list`),i=document.getElementById(`logout-current-btn`),a=document.getElementById(`logout-all-btn`);e&&H(()=>Promise.resolve().then(()=>I).then(t=>{t.getUserProfile(e.uid).then(e=>{if(e){let t=document.getElementById(`sidebar-user-avatar-container`);t&&(t.innerHTML=V(e,38))}})}),void 0,import.meta.url),t&&n&&r&&(t.addEventListener(`click`,t=>{if(t.stopPropagation(),n.style.display===`block`)n.style.display=`none`;else{n.style.display=`block`;let t=be(),i=e?e.uid:``;if(t.length===0&&e)r.innerHTML=`
            <div style="padding: 8px; font-size: 13px; color: var(--text-secondary); text-align: center;">
              Log in with another account to add it to your quick switcher.
            </div>
          `;else{let e=``;t.forEach(t=>{let n=t.uid===i,r=t.name?t.name.charAt(0).toUpperCase():`?`;e+=`
              <div class="saved-account-item ${n?`active`:``}" data-uid="${t.uid}" style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border-radius: 10px; cursor: pointer; transition: background 0.15s ease; background: ${n?`rgba(29, 155, 240, 0.12)`:`transparent`};">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 13px;">${r}</div>
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${P(t.name)}</span>
                    <span style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${P(t.username)}</span>
                  </div>
                </div>

                ${n?`
                  <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                `:``}
              </div>
            `}),r.innerHTML=e,r.querySelectorAll(`.saved-account-item`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.uid;if(t!==i){n.style.display=`none`;try{await Se(t)}catch(e){alert(e.message||`Failed to switch account.`)}}})})}}}),document.addEventListener(`click`,e=>{!e.target.closest(`#multi-account-popover`)&&!e.target.closest(`#user-menu-btn`)&&(n.style.display=`none`)})),i&&i.addEventListener(`click`,async t=>{t.stopPropagation(),await k(`Log out`,`Log out of current account?`)&&(e&&Ce(e.uid),await Ae(),window.location.hash=`#/login`,window.location.reload())}),a&&a.addEventListener(`click`,async e=>{e.stopPropagation(),await k(`Log out all`,`Log out of ALL saved accounts on this browser?`)&&await we()});let o=document.getElementById(`unread-notif-badge`),s=null;e&&o&&(s=Ie(e.uid,e=>{let t=e.filter(e=>!e.read).length;t>0?(o.textContent=t,o.style.display=`inline-block`):o.style.display=`none`}));let c=document.getElementById(`sidebar-open-composer`),l=document.getElementById(`mobile-fab-composer`),u=()=>{window.location.hash!==D.HOME&&(window.location.hash=D.HOME),setTimeout(()=>{let e=document.getElementById(`post-input`);e&&e.focus()},150)};c&&c.addEventListener(`click`,u),l&&l.addEventListener(`click`,u);let d=document.getElementById(`trending-hashtags-container`);d&&ae(5).then(e=>{if(!e||e.length===0){d.innerHTML=`
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">1 · Campus Trending</span>
            <div style="font-weight: 700; color: var(--accent-primary); cursor: pointer;" onclick="window.location.hash='#/search?q=%23SJCHackathon2026'">#SJCHackathon2026</div>
            <span style="color: var(--text-secondary); font-size: 12px;">142 posts</span>
          </div>
        `;return}let t=``;e.forEach((e,n)=>{t+=`
          <div style="cursor: pointer;" onclick="window.location.hash='#/search?q=%23${encodeURIComponent(e.tag)}'">
            <span style="color: var(--text-secondary); font-size: 12px;">${n+1} · Trending in Campus</span>
            <div style="font-weight: 700; color: var(--accent-primary);">#${P(e.tag)}</div>
            <span style="color: var(--text-secondary); font-size: 12px;">${e.count} post${e.count===1?``:`s`}</span>
          </div>
        `}),d.innerHTML=t}).catch(e=>console.error(e));let f=document.getElementById(`campus-updates-widget-container`),p=null;f&&(window.layoutAnnouncementsUnsub&&window.layoutAnnouncementsUnsub(),p=Je(2,e=>{if(!e||e.length===0){f.innerHTML=`<div style="color: var(--text-secondary); font-size: 13px;">No recent official updates.</div>`;return}let t=``;e.forEach((n,r)=>{let i=r===e.length-1,a=`var(--accent-primary)`;n.severity===`warning`&&(a=`#F59E0B`),n.severity===`alert`&&(a=`var(--error-color)`),t+=`
          <div style="padding-bottom: ${i?`0`:`8px`}; border-bottom: ${i?`none`:`1px solid var(--border-subtle)`}; cursor: pointer;" onclick="window.location.hash='${D.ANNOUNCEMENTS}'">
            <div style="color: var(--text-secondary); font-size: 11px; font-weight: 700; display: flex; justify-content: space-between;">
              <span style="color: ${a}; text-transform: uppercase;">${P(n.severity)}</span>
              <span class="time-ago" data-timestamp="${n.timestamp}">${B(n.timestamp)}</span>
            </div>
            <div style="font-weight: 600; margin-top: 2px; color: var(--text-primary); line-height: 1.3;">${P(n.title)}</div>
          </div>
        `}),f.innerHTML=t}),window.layoutAnnouncementsUnsub=p);let m=document.getElementById(`right-sidebar-search-input`),h=document.getElementById(`search-results-dropdown`);m&&h&&(m.addEventListener(`input`,async()=>{let e=m.value,t=e.trim().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3){h.style.display=`none`,h.innerHTML=``;return}h.style.display=`block`,h.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">Searching campus...</div>`;try{let n=await Ne(e);if(n.length===0){h.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">No student or staff found matching "${P(t)}".</div>`;return}let r=``;for(let e of n){let t=await Be(e.uid),n=e.name?e.name.charAt(0).toUpperCase():`?`,i=e.profilePicture?`<img src="${e.profilePicture}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />`:`<div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${n}</div>`;r+=`
            <div class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;" data-username="${P(e.username)}">
              <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                ${i}
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${P(e.name)}</span>
                  <span style="font-size: 12px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${P(e.username)} · Class ${P(e.class||`N/A`)}</span>
                </div>
              </div>

              <button class="btn ${t?`btn-outline`:``} friend-toggle-btn" data-uid="${e.uid}" style="font-size: 12px; padding: 4px 12px;">
                ${t?`Friends`:`+ Add Friend`}
              </button>
            </div>
          `}h.innerHTML=r,h.querySelectorAll(`.search-result-item`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.friend-toggle-btn`)){let t=e.dataset.username;h.style.display=`none`,window.location.hash=`#/profile?u=${t}`}})}),h.querySelectorAll(`.friend-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.uid;e.disabled=!0;try{let t=await He(n);e.textContent=t?`Friends`:`+ Add Friend`,e.className=`btn ${t?`btn-outline`:``} friend-toggle-btn`}catch(e){console.error(e)}finally{e.disabled=!1}})})}catch(e){console.error(e),h.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--error-color); font-size: 13px;">Error searching campus.</div>`}}),document.addEventListener(`click`,e=>{e.target.closest(`.search-box`)||(h.style.display=`none`),document.body.classList.contains(`mobile-sidebar-active`)&&!e.target.closest(`.sidebar-container`)&&!e.target.closest(`#mobile-sidebar-toggle`)&&document.body.classList.remove(`mobile-sidebar-active`)}));let g=document.getElementById(`mobile-sidebar-toggle`);return g&&g.addEventListener(`click`,()=>{document.body.classList.toggle(`mobile-sidebar-active`)}),()=>{s&&s(),window.layoutAnnouncementsUnsub&&(window.layoutAnnouncementsUnsub(),window.layoutAnnouncementsUnsub=null)}}async function et(t,n,r=!1){if(!t||t.trim().length===0)throw Error(`Poll must have a question.`);if(!n||n.length<2)throw Error(`Poll must have at least 2 options.`);let a=v.currentUser;if(!a)throw Error(`Not authenticated`);if(!t||t.trim()===``)throw Error(`Poll question is required.`);if(!n||!Array.isArray(n)||n.length<2)throw Error(`At least 2 poll options are required.`);let o=b(i(p,w.POLLS)),s=n.map((e,t)=>({id:t,text:e,votes:0})),c={pollId:o.key,creatorId:a.uid,question:t,options:s,totalVotes:0,likes:0,reshares:0,replyCount:0,isAnonymous:r,timestamp:new Date().toISOString()};return await e(o,c),c}async function tt(e,t){if(!t||!e)return null;let n=await h(i(p,`${w.POLL_VOTES}/${e}/${t}`));return n.exists()?n.val():null}async function nt(n,r){let a=v.currentUser;if(!a)throw Error(`Not authenticated`);let o=i(p,`${w.POLL_VOTES}/${n}/${a.uid}`);if((await h(o)).exists())throw Error(`You have already voted in this poll.`);await e(o,r),await t(i(p,`${w.POLLS}/${n}`),e=>(e&&(e.options&&e.options[r]&&(e.options[r].votes=(e.options[r].votes||0)+1),e.totalVotes=(e.totalVotes||0)+1),e))}function rt(e=20,t){let r=C(i(p,w.POLLS),n(`timestamp`),f(e)),a=c(r,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching polls:`,e)});return()=>l(r,`value`,a)}async function it(n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=i(p,`${w.POLL_LIKES}/${n}/${r.uid}`),o=await h(a),s=!1;o.exists()?(await S(a),s=!1):(await e(a,!0),s=!0);let c=i(p,`${w.POLLS}/${n}`),l=0;return await t(c,e=>(e&&(e.likes=s?(e.likes||0)+1:Math.max(0,(e.likes||0)-1),l=e.likes),e)),{liked:s,likes:l}}async function at(e,t){return!t||!e?!1:(await h(i(p,`${w.POLL_LIKES}/${e}/${t}`))).exists()}async function ot(n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=i(p,`${w.POLL_RESHARES}/${n}/${r.uid}`),o=await h(a),s=!1;o.exists()?(await S(a),s=!1):(await e(a,new Date().toISOString()),s=!0);let c=i(p,`${w.POLLS}/${n}`),l=0;return await t(c,e=>(e&&(e.reshares=s?(e.reshares||0)+1:Math.max(0,(e.reshares||0)-1),l=e.reshares),e)),{reshared:s,reshares:l}}async function st(e,t){return!t||!e?!1:(await h(i(p,`${w.POLL_RESHARES}/${e}/${t}`))).exists()}async function ct(n,r){let a=v.currentUser;if(!a)throw Error(`Not authenticated`);let o=r?r.trim():``;if(!o)throw Error(`Reply cannot be empty.`);let s=b(i(p,`${w.POLL_REPLIES}/${n}`)),c={replyId:s.key,parentPoll:n,authorId:a.uid,content:o,timestamp:new Date().toISOString(),likes:0};await e(s,c);let l=i(p,`${w.POLLS}/${n}`),u=null,d=!1;if(await t(l,e=>(e&&(e.replyCount=(e.replyCount||0)+1,u=e.creatorId,d=e.isAnonymous),e)),u&&u!==a.uid){let{sendNotification:e}=await H(async()=>{let{sendNotification:e}=await Promise.resolve().then(()=>Pe);return{sendNotification:e}},void 0,import.meta.url),{getUserProfile:t}=await H(async()=>{let{getUserProfile:e}=await Promise.resolve().then(()=>I);return{getUserProfile:e}},void 0,import.meta.url),r=`Someone`;d||(r=(await t(a.uid))?.name||`A student`),await e(u,{text:`${r} replied to your poll.`,type:`SYSTEM`,postId:n,senderId:a.uid})}return c}function lt(e,t){let n=i(p,`${w.POLL_REPLIES}/${e}`),r=c(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)});return()=>l(n,`value`,r)}async function ut(e){let t=v.currentUser;if(!t)throw Error(`Not authenticated`);let n=await h(i(p,`${w.POLLS}/${e}`));if(!n.exists())throw Error(`Poll not found`);if(n.val().creatorId!==t.uid)throw Error(`Unauthorized: You can only delete your own polls.`);return await S(i(p,`${w.POLLS}/${e}`)),await S(i(p,`${w.POLL_VOTES}/${e}`)),await S(i(p,`${w.POLL_LIKES}/${e}`)),await S(i(p,`${w.POLL_RESHARES}/${e}`)),await S(i(p,`${w.POLL_REPLIES}/${e}`)),!0}async function dt(e){let t=v.currentUser?.uid;if(!t)throw Error(`Not authenticated`);let n=await h(i(p,`${w.USERS}/${t}`)),r=n.exists()?n.val():null;if(!r||r.role!==`staff`&&r.role!==`admin`)throw Error(`Unauthorized: Staff power required to put down polls.`);return await S(i(p,`${w.POLLS}/${e}`)),await S(i(p,`${w.POLL_VOTES}/${e}`)),await S(i(p,`${w.POLL_LIKES}/${e}`)),await S(i(p,`${w.POLL_RESHARES}/${e}`)),await S(i(p,`${w.POLL_REPLIES}/${e}`)),!0}async function ft(e){if(!e)return null;try{let t=await h(i(p,`${w.POLLS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching poll by ID:`,e)}return null}function pt(e,t){return c(i(p,`${w.POLLS}/${e}`),e=>{e.exists()?t(e.val()):t(null)},e=>{console.error(`Error fetching poll:`,e),t(null)})}async function mt(){try{let e=await h(i(p,w.USERS)),t=await h(i(p,w.POSTS)),n=await h(i(p,w.REPLIES)),r=await h(i(p,w.POST_LIKES)),a=await h(i(p,w.PETITIONS)),o=await h(i(p,w.POLLS)),s=e.exists()?Object.keys(e.val()).length:0,c=t.exists()?Object.keys(t.val()).length:0,l=0;if(n.exists()){let e=n.val();Object.values(e).forEach(e=>{l+=Object.keys(e).length})}let u=0;if(r.exists()){let e=r.val();Object.values(e).forEach(e=>{u+=Object.keys(e).length})}let d=a.exists()?Object.keys(a.val()).length:0,f=o.exists()?Object.keys(o.val()).length:0;return{totalUsers:s,totalPosts:c,totalReplies:l,totalLikes:u,totalPetitions:d,totalPolls:f}}catch(e){return console.error(`Error getting analytics stats:`,e),{totalUsers:0,totalPosts:0,totalReplies:0,totalLikes:0,totalPetitions:0,totalPolls:0}}}async function ht(){try{let e=await h(i(p,w.USERS));if(e.exists()){let t=e.val(),n=Object.values(t);return n.sort((e,t)=>new Date(t.joinedDate||0)-new Date(e.joinedDate||0)),n}}catch(e){console.error(`Error getting users roster:`,e)}return[]}async function gt(e,t){let n=v.currentUser?.uid;if(!n)throw Error(`Not authenticated`);let r=await h(i(p,`${w.USERS}/${n}`)),a=r.exists()?r.val():null;if(!a||a.role!==j.ADMIN)throw Error(`Unauthorized: Only Master Admin can appoint or demote staff.`);return await x(i(p,`${w.USERS}/${e}`),{role:t}),R(e),!0}async function _t(e){if(!v.currentUser?.uid)throw Error(`Not authenticated`);let t=await h(i(p,`${w.USERS}/${e}`));if(!t.exists())throw Error(`User not found`);let n=!t.val().isSuspended;return await x(i(p,`${w.USERS}/${e}`),{isSuspended:n}),R(e),n}async function vt(e){let t=v.currentUser?.uid;if(!t)throw Error(`Not authenticated`);let n=await h(i(p,`${w.USERS}/${t}`)),r=n.exists()?n.val():null;if(!r||r.role!==j.STAFF&&r.role!==j.ADMIN)throw Error(`Unauthorized: Staff power required to put down posts.`);return await S(i(p,`${w.POSTS}/${e}`)),await S(i(p,`${w.REPLIES}/${e}`)),await S(i(p,`${w.POST_LIKES}/${e}`)),await S(i(p,`${w.POST_RESHARES}/${e}`)),!0}async function yt(e){let t=v.currentUser?.uid;if(!t)throw Error(`Not authenticated`);let n=await h(i(p,`${w.USERS}/${t}`)),r=n.exists()?n.val():null;if(!r||r.role!==j.STAFF&&r.role!==j.ADMIN)throw Error(`Unauthorized: Staff power required to put down petitions.`);return await S(i(p,`${w.PETITIONS}/${e}`)),await S(i(p,`${w.PETITION_VOTES}/${e}`)),!0}async function bt(n,r=`Inappropriate content`){let a=v.currentUser;if(!a)throw Error(`Not authenticated`);let o=i(p,`postReports/${n}/${a.uid}`);if((await h(o)).exists())throw Error(`You have already reported this post.`);await e(o,{uid:a.uid,reason:r,timestamp:new Date().toISOString()});let s=i(p,`${w.POSTS}/${n}`),c=0,l=null;return await t(s,e=>(e&&(e.reportCount=(e.reportCount||0)+1,c=e.reportCount,l=e.authorId,c>=2&&(e.status=`AWAITING_MODERATION`)),e)),c>=2&&l&&await Fe(l,{text:`⚠️ Your post has received 2 community reports and is currently held for review awaiting validation from a Staff member or Admin.`,type:`MODERATION`,postId:n}),{reported:!0,reportCount:c,autoTakenDown:c>=2}}async function xt(){let e=v.currentUser?.uid;if(!e)throw Error(`Not authenticated`);let t=await h(i(p,`${w.USERS}/${e}`)),n=t.exists()?t.val():null;if(!n||n.role!==j.STAFF&&n.role!==j.ADMIN)throw Error(`Unauthorized: Staff power required to view reported posts.`);try{let e=await h(i(p,w.POSTS));if(!e.exists())return[];let t=[];return e.forEach(e=>{let n=e.val();(n.status===`AWAITING_MODERATION`||n.reportCount&&n.reportCount>0)&&t.push(n)}),t.sort((e,t)=>(t.reportCount||0)-(e.reportCount||0)),t}catch(e){return console.error(`Error fetching reported posts queue:`,e),[]}}async function St(e){let t=v.currentUser?.uid;if(!t)throw Error(`Not authenticated`);let n=await h(i(p,`${w.USERS}/${t}`)),r=n.exists()?n.val():null;if(!r||r.role!==j.STAFF&&r.role!==j.ADMIN)throw Error(`Unauthorized: Staff power required to approve posts.`);let a=i(p,`${w.POSTS}/${e}`),o=await h(a);if(!o.exists())throw Error(`Post not found`);let s=o.val();return await x(a,{status:`ACTIVE`,reportCount:0}),await S(i(p,`postReports/${e}`)),s.authorId&&await Fe(s.authorId,{text:`✓ Your post has been reviewed and approved by Staff. It is now active on Backbench.`,type:`MODERATION`,postId:e}),!0}function Ct(){return`
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
  `}function K(e=4){let t=``;for(let n=0;n<e;n++)t+=Ct();return t}var wt=[{id:`default`,name:`Inter Modern`,fontFamily:`'Inter', sans-serif`},{id:`handwritten`,name:`Handwritten Script`,fontFamily:`'Caveat', cursive, sans-serif`},{id:`monospace`,name:`Cyber Monospace`,fontFamily:`'Fira Code', monospace`},{id:`serif`,name:`Classic Serif`,fontFamily:`'Playfair Display', serif`},{id:`futuristic`,name:`Futuristic Outfit`,fontFamily:`'Outfit', sans-serif`}];function q(e){let t=`default`;typeof e==`string`?t=e:e&&e.fontId?t=e.fontId:e&&e.fontThemeId&&(t=e.fontThemeId);let n=wt.find(e=>e.id===t);return n?n.fontFamily:wt[0].fontFamily}function Tt(e,t,n=!1,r=!1,i=!1){let a=e.isAnonymous===!0,o=a?`Anonymous Student`:t?.name?P(t.name):`Anonymous Student`,s=a?`anonymous`:t?.username?P(t.username):`student`,c=!a&&(t?.isTeacher||t?.role===`teacher`),l=!a&&(t?.verifiedStudent||t?.role===`staff`||t?.role===`admin`||c),u=q(t),d=a?`<div class="avatar" style="width: 44px; height: 44px; font-size: 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:V(t,44,`border: 1px solid var(--border-color);`),f=a?`<div style="display: inline-flex;" title="Anonymous Post">${d}</div>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${s}'s profile">${d}</a>`,p=a?`<span class="author-name" style="font-family: ${u};">${o}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-name" style="font-family: ${u};">${o}</span></a>`,m=a?`<span class="author-handle">@${s}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-handle">@${s}</span></a>`;return`
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
            <span class="post-time time-ago" data-timestamp="${e.timestamp}">${B(e.timestamp)}</span>
            ${e.edited?`<span class="edited-badge" style="font-size: 11px; color: var(--text-secondary); margin-left: 4px; font-style: italic;">(edited)</span>`:``}
          </div>
          <button class="btn-ghost post-options-btn" style="padding: 4px;" title="Options" data-post-id="${e.postId}" data-author-id="${e.authorId}">
            <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
          </button>
        </div>
        
        <div class="post-body" style="font-family: ${u}; font-size: 15px; line-height: 1.5; color: var(--text-primary);">
          ${ee(e.content)}
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
  `}function Et(e,t,n,r,i=!0){let a=e.isAnonymous===!0,o=a?`Anonymous Student`:t?.name?P(t.name):`Anonymous Student`,s=a?`anonymous`:t?.username?P(t.username):`student`,c=a?`<div class="avatar" style="width: 36px; height: 36px; font-size: 16px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:V(t,36,`border: 1px solid var(--border-color);`),l=a?`Anonymous Replier`:r?.name?P(r.name):`Anonymous Student`,u=a?`anonymous_reply`:r?.username?P(r.username):`student`,d=a?`<div class="avatar" style="width: 36px; height: 36px; font-size: 14px; background: linear-gradient(135deg, #a855f7, #ec4899); font-weight: 800;">AR</div>`:V(r,36,`border: 1px solid var(--border-color);`),f=a?`'Inter', sans-serif`:q(r);return`
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
            <span style="color: var(--text-secondary); font-size: 13px;">· <span class="time-ago" data-timestamp="${e.timestamp}">${B(e.timestamp)}</span></span>
          </div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-top: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${P(e.content).replace(/<[^>]+>/g,``)}
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
              <span style="color: var(--text-secondary); font-size: 13px;">· <span class="time-ago" data-timestamp="${n.timestamp}">${B(n.timestamp)}</span></span>
            </div>
            <button class="action-btn save-btn saved" style="color: var(--accent-primary); pointer-events: none;">
              <span class="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div style="font-family: ${f}; font-size: 14px; line-height: 1.5; color: var(--text-primary); margin-top: 4px;">
            ${ee(n.content)}
          </div>
        </div>
      </div>
    </div>
  `}function Dt(e,t,n=null,r=!1,i=!1){let a=e.isAnonymous===!0,o=a?`Anonymous Student`:t?.name?P(t.name):`Anonymous Student`,s=a?`anonymous`:t?.username?P(t.username):`student`,c=e.totalVotes||0,l=n!==null,u=q(t),d=a?`<div class="avatar" style="width: 44px; height: 44px; font-size: 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:V(t,44,`border: 1px solid var(--border-color);`),f=a?`<div style="display: inline-flex;" title="Anonymous Poll">${d}</div>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${s}'s profile">${d}</a>`,p=a?`<span class="author-name" style="font-family: ${u};">${o}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-name" style="font-family: ${u};">${o}</span></a>`,m=a?`<span class="author-handle">@${s}</span>`:`<a href="#/profile?u=${s}" style="text-decoration: none; color: inherit;" title="View @${s}'s profile"><span class="author-handle">@${s}</span></a>`,h=``;return h=l?`
      <div class="poll-results-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
        ${e.options.map((e,t)=>{let r=e.votes||0,i=c>0?Math.round(r/c*100):0,a=n===t;return`
            <div class="poll-result-bar-wrapper ${a?`user-selected`:``}">
              <div class="poll-result-fill" style="width: ${i}%;"></div>
              <div class="poll-result-label" style="font-family: ${u};">
                <span style="display: flex; align-items: center; gap: 6px; font-weight: ${a?`700`:`500`};">
                  ${P(e.text)}
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
            <span>${P(t.text)}</span>
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
              <span class="post-time time-ago" data-timestamp="${e.timestamp}">${B(e.timestamp)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="brand-badge" style="font-size: 11px;">CAMPUS POLL</span>
              <button class="btn-ghost poll-options-btn" style="padding: 4px;" title="Options" data-poll-id="${e.pollId}" data-creator-id="${e.creatorId}">
                <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
              </button>
            </div>
          </div>

          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 6px; line-height: 1.4; font-family: ${u};">
            ${P(e.question)}
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
  `}function Ot(e,t,n){let r=e.isAnonymous===!0,i=r?`<div class="avatar" style="width: 40px; height: 40px; font-size: 18px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:V(t,40),a=r?`Anonymous Student`:t?.name?P(t.name):`Student Representative`,o=e.signatureCount||0,s=e.goalSignatures||100,c=Math.min(100,Math.round(o/s*100)),l=o>=s,u=r?`anonymous`:t?.username?P(t.username):`student`;return`
    <article class="card fade-in petition-card" data-petition-id="${e.petitionId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer;" onclick="if(!event.target.closest('a, button')) window.location.hash='#/petition?id=${e.petitionId}'">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        ${r?`<div style="display: inline-flex;">${i}</div>`:`<a href="#/profile?u=${u}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${u}'s profile">
          ${i}
        </a>`}
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="brand-badge" style="font-size: 11px;">${P(e.category)}</span>
              <span class="brand-badge" style="font-size: 11px; background: ${l?`rgba(0, 186, 124, 0.2)`:`rgba(29, 155, 240, 0.15)`}; color: ${l?`#00BA7C`:`var(--accent-primary)`}; border-color: ${l?`#00BA7C`:`var(--accent-primary)`};">
                ${l?`🎉 GOAL REACHED`:`ACTIVE`}
              </span>
            </div>
            <button class="btn-ghost petition-options-btn" style="padding: 4px;" title="Options" data-petition-id="${e.petitionId}" data-author-id="${e.creatorId}">
              <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
            </button>
          </div>

          <h2 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; line-height: 1.35;">
            ${P(e.title)}
          </h2>

          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${P(e.statement)}
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
  `}var kt=null;function J(){kt&&=(kt.remove(),null)}document.addEventListener(`click`,J);function Y(e,t){J();let{itemId:n,authorId:r,currentUid:i,isStaff:a=!1,itemType:o=`post`,onDelete:s,onReport:c,onEdit:l}=t,u=i===r,d=o===`poll`?`poll`:`post`,f=document.createElement(`div`);f.className=`ctx-menu fade-in`,f.setAttribute(`role`,`menu`);let p=[];u&&l&&p.push({icon:`edit`,label:`Edit ${d}`,className:`ctx-menu-item`,action:async()=>{J(),l&&await l(n)}}),u&&p.push({icon:`delete`,label:`Delete ${d}`,className:`ctx-menu-item danger`,action:async()=>{J(),await k(`Delete ${d}`,`Are you sure you want to permanently delete this ${d}? This action cannot be undone.`)&&s&&await s(n)}}),a&&!u&&p.push({icon:`shield`,label:`Take down ${d} (Staff)`,className:`ctx-menu-item danger`,action:async()=>{J(),await k(`Take down ${d}`,`🛡️ Staff Moderation Action:\nDo you want to take down this ${d} from Backbench?`)&&s&&await s(n)}}),u||p.push({icon:`flag`,label:`Report ${d}`,className:`ctx-menu-item`,action:async()=>{J();let e=await A(`Report ${d}`,`Inappropriate content`,`Please state your reason:`);e&&e.trim()&&c&&c(n,e.trim())}}),p.push({icon:`link`,label:`Copy link`,className:`ctx-menu-item`,action:()=>{J();let e=window.location.origin+window.location.pathname,t=o===`poll`?`${e}#/poll?id=${n}`:`${e}#/post?id=${n}`;navigator.clipboard.writeText(t).then(()=>{At(`Link copied to clipboard!`)}).catch(async()=>{await A(`Copy this link:`,t,`Link`)})}}),f.innerHTML=p.map(e=>`
    <button class="${e.className}" role="menuitem">
      <span class="material-symbols-outlined" style="font-size: 18px;">${e.icon}</span>
      <span>${e.label}</span>
    </button>
  `).join(``),document.body.appendChild(f),kt=f;let m=e.getBoundingClientRect(),h=f.getBoundingClientRect(),g=m.bottom+4,_=m.right-h.width;g+h.height>window.innerHeight&&(g=m.top-h.height-4),_<8&&(_=8),f.style.top=`${g}px`,f.style.left=`${_}px`,f.querySelectorAll(`.ctx-menu-item`).forEach((e,t)=>{e.addEventListener(`click`,e=>{e.stopPropagation(),p[t].action()})}),f.addEventListener(`click`,e=>e.stopPropagation())}function At(e){let t=document.querySelector(`.ctx-toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`ctx-toast fade-in`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(10px)`,setTimeout(()=>n.remove(),300)},2200)}var X={POST_MAX_WORDS:100,REPLY_MAX_WORDS:100,FEED_PAGINATION_INITIAL:20};async function jt(t){let n=v.currentUser;if(!n)throw Error(`Not authenticated`);let{title:r,statement:a,category:o,targetRecipient:s,goalSignatures:c,isAnonymous:l}=t;if(!r||r.trim().length===0)throw Error(`Petition title is required.`);if(!a||a.trim().length===0)throw Error(`Formal petition statement is required.`);let u=b(i(p,w.PETITIONS)),d={petitionId:u.key,creatorId:n.uid,title:r.trim(),statement:a.trim(),category:o||`Student Welfare`,targetRecipient:s?.trim()||`St. Joseph's College Administration`,goalSignatures:parseInt(c)||100,signatureCount:0,isAnonymous:l||!1,timestamp:new Date().toISOString(),status:`ACTIVE`};return await e(u,d),d}function Mt(e=20,t){let r=C(i(p,w.PETITIONS),n(`timestamp`),f(e)),a=c(r,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching petitions:`,e)});return()=>l(r,`value`,a)}async function Nt(e){if(!e)return null;try{let t=await h(i(p,`${w.PETITIONS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching petition:`,e)}return null}async function Pt(e,t){if(!t||!e)return!1;try{return(await h(i(p,`${w.PETITION_VOTES}/${e}/${t}`))).exists()}catch{return!1}}async function Ft(n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=i(p,`${w.PETITION_VOTES}/${n}/${r.uid}`);if((await h(a)).exists())throw Error(`You have already signed this petition.`);let o=await L(r.uid);await e(a,{uid:r.uid,name:o?.name||r.displayName||`Student`,username:o?.username||`student`,class:o?.class||`N/A`,admissionNumber:o?.admissionNumber||`N/A`,timestamp:new Date().toISOString()});let s=i(p,`${w.PETITIONS}/${n}`),c=0;return await t(s,e=>(e&&(e.signatureCount=(e.signatureCount||0)+1,e.signatureCount>=(e.goalSignatures||100)&&(e.status=`GOAL ACHIEVED`),c=e.signatureCount),e)),{signed:!0,signatureCount:c}}async function It(e){if(!e)return[];try{let t=await h(i(p,`${w.PETITION_VOTES}/${e}`));if(t.exists()){let e=t.val(),n=Object.values(e);return n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),n}}catch(e){console.error(`Error fetching petition signatories:`,e)}return[]}async function Lt(t){let n=v.currentUser;if(!n)throw Error(`Not authenticated`);let r=i(p,`${w.PETITIONS}/${t}`),a=await h(r);if(a.exists()){if(a.val().creatorId!==n.uid)throw Error(`Unauthorized: You can only delete your own petitions.`);await e(r,null),await e(i(p,`${w.PETITION_VOTES}/${t}`),null)}}function Rt(e,t){return c(i(p,`${w.PETITIONS}/${e}`),e=>{e.exists()?t(e.val()):t(null)},e=>{console.error(`Error fetching petition:`,e),t(null)})}var Z=null,zt=null,Bt=null;function Vt(e){if(!e)return;let t=e.closest(`.feed-item-wrapper`)||e;t.style.transition=`opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s`,t.style.overflow=`hidden`,t.style.maxHeight=t.offsetHeight+`px`,t.offsetHeight,t.style.opacity=`0`,t.style.transform=`scale(0.95)`,t.style.maxHeight=`0px`,t.style.marginTop=`0px`,t.style.marginBottom=`0px`,t.style.paddingTop=`0px`,t.style.paddingBottom=`0px`,setTimeout(()=>t.remove(),450)}function Ht(e){if(!v.currentUser){window.location.hash=`#/login`;return}let t=v.currentUser;e.innerHTML=W(`
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
      ${`<div id="composer-avatar-container">${V(t.photoURL||``,40)}</div>`}
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

        <div class="composer-toolbar">
          <div class="composer-icons">
            <button class="composer-icon-btn" title="Add Image">
              <span class="material-symbols-outlined" style="font-size: 20px;">image</span>
            </button>
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
            <span id="char-counter" class="char-ring">0 / ${X.POST_MAX_WORDS}</span>
            <button id="post-btn" class="btn" disabled>Post</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Combined Home Feed Container (Posts + Polls) -->
    <div id="feed-container">
      ${K(4)}
    </div>
  `,D.HOME);let n=G(),r=`student`;L(t.uid).then(e=>{if(e){r=e.role||`student`;let t=document.getElementById(`composer-avatar-container`);if(t&&(t.innerHTML=V(e,40)),r===`admin`||r===`staff`){let e=document.querySelector(`.sidebar-nav`);if(e&&!e.querySelector(`a[href="#/admin"]`)){let t=document.createElement(`a`);t.href=D.ADMIN,t.className=`nav-item`,t.innerHTML=`
            <span class="material-symbols-outlined">${r===`admin`?`admin_panel_settings`:`shield_person`}</span>
            <span class="sidebar-label">${r===`admin`?`Admin`:`Staff`}</span>
          `,e.appendChild(t)}}}}).catch(e=>console.error(e));let i=document.getElementById(`post-input`),a=document.getElementById(`char-counter`),o=document.getElementById(`post-btn`),s=document.getElementById(`feed-container`),c=document.getElementById(`toggle-poll-btn`),l=document.getElementById(`close-poll-btn`),u=document.getElementById(`inline-poll-builder`),d=document.getElementById(`inline-poll-options-container`),f=document.getElementById(`inline-add-opt-btn`),p=document.getElementById(`tab-for-you`),m=document.getElementById(`tab-friends`),h=!1,g=`for-you`;p.addEventListener(`click`,()=>{g=`for-you`,p.classList.add(`active`),m.classList.remove(`active`),w()}),m.addEventListener(`click`,()=>{g=`friends`,m.classList.add(`active`),p.classList.remove(`active`),w()}),c.addEventListener(`click`,()=>{h=!h,u.style.display=h?`block`:`none`,_()}),l.addEventListener(`click`,()=>{h=!1,u.style.display=`none`,_()}),f.addEventListener(`click`,()=>{let e=d.querySelectorAll(`.inline-opt-input`);if(e.length<13){let t=e.length+1,n=document.createElement(`input`);n.type=`text`,n.className=`input-field inline-opt-input fade-in`,n.placeholder=`Option ${t}`,n.style.marginBottom=`0`,n.style.padding=`8px 12px`,n.style.fontSize=`14px`,n.addEventListener(`input`,_),d.appendChild(n),e.length+1===13&&(f.style.display=`none`)}});function _(){let e=i.value.trim(),t=(e?e.split(/\s+/):[]).length;if(a.textContent=`${t} / ${X.POST_MAX_WORDS}`,t>X.POST_MAX_WORDS)a.style.color=`var(--error-color)`,o.disabled=!0;else if(h){let e=d.querySelectorAll(`.inline-opt-input`),n=Array.from(e).filter(e=>e.value.trim().length>0);o.disabled=!(t>0&&n.length>=2),a.style.color=`var(--accent-primary)`}else t===0?(a.style.color=`var(--text-secondary)`,o.disabled=!0):(a.style.color=`var(--accent-primary)`,o.disabled=!1)}i.addEventListener(`input`,()=>{i.style.height=`auto`,i.style.height=Math.max(54,i.scrollHeight)+`px`,_()}),d.querySelectorAll(`.inline-opt-input`).forEach(e=>{e.addEventListener(`input`,_)}),o.addEventListener(`click`,async()=>{let e=i.value.trim(),t=e?e.split(/\s+/):[];if(t.length>0&&t.length<=X.POST_MAX_WORDS){o.disabled=!0,o.textContent=`Posting...`;try{let t=document.getElementById(`post-anonymous-checkbox`).checked;if(h){let n=d.querySelectorAll(`.inline-opt-input`),r=Array.from(n).map(e=>e.value.trim()).filter(Boolean);if(r.length<2){alert(`A poll must have at least 2 valid options.`),o.disabled=!1,o.textContent=`Post`;return}await et(e,r,t),h=!1,u.style.display=`none`,d.innerHTML=`
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          `,f.style.display=`inline-block`}else await te(e,t);document.getElementById(`post-anonymous-checkbox`).checked=!1,i.value=``,i.style.height=`54px`,i.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(e.message||`Failed to submit post.`)}finally{o.textContent=`Post`}}});let y=[],b=[],x=[],S=async(e,t)=>{let n=e.map(async e=>{try{if(e._type===`post`){let[n,r,i,a]=await Promise.all([L(e.authorId),z(e.postId,t),de(e.postId,t),me(e.postId)]);return{...e,author:n,isLiked:r,isReshared:i,isSaved:a}}else if(e._type===`poll`){let[n,r,i,a]=await Promise.all([L(e.creatorId),tt(e.pollId,t),at(e.pollId,t),st(e.pollId,t)]);return{...e,author:n,userVote:r,pollLiked:i,pollReshared:a}}else if(e._type===`petition`){let[n,r]=await Promise.all([L(e.creatorId),Pt(e.petitionId,t)]);return{...e,author:n,isSigned:r}}}catch(t){return console.error(`Failed to load data for item:`,e,t),null}});return(await Promise.all(n)).filter(Boolean)},C=e=>{let t=new Map,n=[];for(let r of e){let e=``,i=``;r._type===`post`?(i=`post-${r.postId}`,e=Tt(r,r.author,r.isLiked,r.isReshared,r.isSaved)):r._type===`poll`?(i=`poll-${r.pollId}`,e=Dt(r,r.author,r.userVote,r.pollLiked,r.pollReshared)):r._type===`petition`&&(i=`petition-${r.petitionId}`,e=Ot(r,r.author,r.isSigned)),e&&(t.set(i,e),n.push(i))}return{htmlMap:t,orderedKeys:n}},w=async()=>{if(!s)return;let e=v.currentUser?.uid;if(!e)return;let t=[];g===`friends`&&(t=await Ue(e),t.push(e));let n=g===`friends`?y.filter(e=>t.includes(e.authorId)&&e.status!==`AWAITING_MODERATION`):y.filter(e=>e.status!==`AWAITING_MODERATION`),r=g===`friends`?b.filter(e=>t.includes(e.creatorId)):b,i=g===`friends`?x.filter(e=>t.includes(e.creatorId)):x,a=[...n.map(e=>({...e,_type:`post`})),...r.map(e=>({...e,_type:`poll`})),...i.map(e=>({...e,_type:`petition`}))];if(a.sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp)),a.length===0){s.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${g===`friends`?`group_off`:`forum`}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${g===`friends`?`No activity from friends`:`No campus activity yet`}</h3>
          <p style="font-size: 14px;">${g===`friends`?`Add more classmates as friends to see their activity here!`:`Be the first student to post or create a poll on Backbench!`}</p>
        </div>
      `;return}let o=await S(a,e),{htmlMap:c,orderedKeys:l}=C(o);if(O(s,c,l),a.length>=15){let e=document.getElementById(`load-more-trigger`);e||(e=document.createElement(`div`),e.id=`load-more-trigger`,e.style.height=`20px`,e.style.width=`100%`,s.appendChild(e)),window.feedObserver&&window.feedObserver.disconnect(),window.feedObserver=new IntersectionObserver(e=>{e[0].isIntersecting&&(window.feedObserver.disconnect(),window.postLimit+=15,Z&&Z(),Z=re(window.postLimit,e=>{y=e,w()}))},{rootMargin:`200px`}),window.feedObserver.observe(e)}},T=async e=>{let t=v.currentUser?.uid;if(!t)return;let n=e.target.closest(`.like-btn`);if(n){e.stopPropagation();let t=n.dataset.postId;n.disabled=!0;try{let e=await le(t);e.liked?n.classList.add(`liked`,`heart-pop`):n.classList.remove(`liked`,`heart-pop`);let r=n.querySelector(`.like-count`);r&&(r.textContent=e.likes)}catch(e){console.error(e)}finally{n.disabled=!1}return}let r=e.target.closest(`.reshare-btn`);if(r){e.stopPropagation();let t=r.dataset.postId;r.disabled=!0;try{let e=await ue(t);e.reshared?(r.classList.add(`reshared`),r.style.color=`#00BA7C`):(r.classList.remove(`reshared`),r.style.color=``);let n=r.querySelector(`.reshare-count`);n&&(n.textContent=e.reshares)}catch(e){console.error(e)}finally{r.disabled=!1}return}let i=e.target.closest(`.save-btn`);if(i){e.stopPropagation();let t=i.dataset.postId;i.disabled=!0;try{await he(t)?(i.classList.add(`saved`),i.style.color=`var(--accent-primary)`):(i.classList.remove(`saved`),i.style.color=``)}catch(e){console.error(e)}finally{i.disabled=!1}return}let a=e.target.closest(`.post-options-btn`);if(a){e.stopPropagation();let n=a.dataset.postId,r=a.dataset.authorId,i=await L(t),o=i?.role===`staff`||i?.role===`admin`;Y(a,{itemId:n,authorId:r,currentUid:t,isStaff:o,itemType:`post`,onDelete:async e=>{try{t===r?await pe(e):o&&await vt(e),Vt(a.closest(`.post-card`))}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(e,t)=>{try{(await bt(e,t)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),Vt(a.closest(`.post-card`))):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}},onEdit:async e=>{let t=a.closest(`.post-card`).querySelector(`.post-body`);if(!t)return;let n=t.innerText,r=await A(`Edit your post:`,n,`Write something...`,null,null,189);if(r!==null&&r.trim()!==n.trim())try{await ne(e,r)}catch(e){alert(e.message||`Failed to edit post.`)}}});return}let o=e.target.closest(`.poll-options-btn`);if(o){e.stopPropagation();let n=o.dataset.pollId,r=o.dataset.creatorId,i=await L(t),a=i?.role===`staff`||i?.role===`admin`;Y(o,{itemId:n,authorId:r,currentUid:t,isStaff:a,itemType:`poll`,onDelete:async e=>{try{t===r?await ut(e):a&&await dt(e),Vt(o.closest(`.poll-card`))}catch(e){alert(e.message||`Failed to delete poll.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}});return}let s=e.target.closest(`.petition-options-btn`);if(s){e.stopPropagation();let n=s.dataset.petitionId,r=s.dataset.authorId,i=await L(t),a=i?.role===`staff`||i?.role===`admin`;Y(s,{itemId:n,authorId:r,currentUid:t,isStaff:a,itemType:`petition`,onDelete:async e=>{try{t===r?await Lt(e):a&&await yt(e),Vt(s.closest(`.petition-card`))}catch(e){alert(e.message||`Failed to delete petition.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}});return}let c=e.target.closest(`.poll-option-btn`);if(c){e.stopPropagation();let t=c.dataset.pollId,n=parseInt(c.dataset.optionIndex);c.disabled=!0,c.textContent=`Recording vote...`;try{await nt(t,n)}catch(e){alert(e.message||`Failed to record vote`)}return}let l=e.target.closest(`.poll-like-btn`);if(l){e.stopPropagation();let t=l.dataset.pollId;l.disabled=!0;try{let e=await it(t);e.liked?l.classList.add(`liked`,`heart-pop`):l.classList.remove(`liked`,`heart-pop`);let n=l.querySelector(`.like-count`);n&&(n.textContent=e.likes)}catch(e){console.error(e)}finally{l.disabled=!1}return}let u=e.target.closest(`.poll-reshare-btn`);if(u){e.stopPropagation();let t=u.dataset.pollId;u.disabled=!0;try{let e=await ot(t);e.reshared?(u.classList.add(`reshared`),u.style.color=`#00BA7C`):(u.classList.remove(`reshared`),u.style.color=``);let n=u.querySelector(`.reshare-count`);n&&(n.textContent=e.reshares)}catch(e){console.error(e)}finally{u.disabled=!1}return}let d=e.target.closest(`.petition-sign-btn`);if(d){e.stopPropagation();let t=d.dataset.petitionId;d.disabled=!0;try{let e=await Ft(t);d.classList.add(`signed`),d.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">draw</span> Signed`,d.style.background=`var(--accent-soft)`,d.style.color=`var(--accent-primary)`,d.style.border=`1px solid var(--accent-primary)`;let n=d.closest(`.petition-card`).querySelector(`.signature-count`);n&&(n.innerHTML=`<b>${e.signatureCount}</b> signatures`)}catch(e){alert(e.message||`Failed to sign petition.`),d.disabled=!1}return}};return s.addEventListener(`click`,T),Z&&Z(),zt&&zt(),Bt&&Bt(),window.postLimit=15,Z=re(window.postLimit,e=>{y=e,w()}),zt=rt(20,e=>{b=e,w()}),Bt=Mt(20,e=>{x=e,w()}),()=>{n&&n(),Z&&Z(),zt&&zt(),Bt&&Bt(),window.feedObserver&&(window.feedObserver.disconnect(),window.feedObserver=null),s.removeEventListener(`click`,T)}}function Ut(e){return/^[a-zA-Z0-9_.]{3,20}$/.test(e)}function Wt(e,t){let n=t===`#/login`;e.innerHTML=`
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
  `;let r=document.getElementById(`auth-form`),i=document.getElementById(`auth-error`),a=document.getElementById(`google-btn`),o=document.getElementById(`password`),s=document.getElementById(`toggle-password-btn`),c=`student`;if(!n){let e=document.getElementById(`select-student-btn`),t=document.getElementById(`select-teacher-btn`),n=document.getElementById(`admissionNumber`),r=document.getElementById(`class`),i=document.getElementById(`name`);e&&t&&(e.addEventListener(`click`,()=>{c=`student`,e.className=`btn`,e.style.background=`var(--accent-primary)`,t.className=`btn btn-outline`,t.style.background=`transparent`,n&&(n.placeholder=`Admission No.`),r&&(r.placeholder=`Class (e.g. 12A)`),i&&(i.placeholder=`Official Full Name`)}),t.addEventListener(`click`,()=>{c=`teacher`,t.className=`btn`,t.style.background=`#00BA7C`,e.className=`btn btn-outline`,e.style.background=`transparent`,n&&(n.placeholder=`Employee / Teacher ID`),r&&(r.placeholder=`Dept (e.g. Physics)`),i&&(i.placeholder=`Official Faculty Name (e.g. Dr. Sharma)`)}))}s.addEventListener(`click`,()=>{let e=o.type===`password`;o.type=e?`text`:`password`;let t=s.querySelector(`.material-symbols-outlined`);t.textContent=e?`visibility_off`:`visibility`,s.title=e?`Hide Password`:`Show Password`}),a.addEventListener(`click`,async()=>{a.disabled=!0,a.textContent=`Connecting...`;let e=await Me();e.success?e.needsOnboarding?window.location.hash=`#/onboarding`:window.location.hash=`#/`:(i.textContent=e.error,i.style.display=`block`,a.disabled=!1,a.innerHTML=`
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px; height: 18px;" alt="Google" />
        Continue with Google
      `)}),r.addEventListener(`submit`,async e=>{e.preventDefault(),i.style.display=`none`;let t=document.getElementById(`email`).value.trim(),a=document.getElementById(`password`).value;if(n){let e=r.querySelector(`button[type="submit"]`);e.disabled=!0,e.textContent=`Logging in...`;let n=await ke(t,a);n.success?window.location.hash=`#/`:(i.textContent=n.error,i.style.display=`block`,e.disabled=!1,e.textContent=`Log In`)}else{let e=document.getElementById(`name`).value.trim(),n=document.getElementById(`username`).value.trim(),o=document.getElementById(`admissionNumber`).value.trim(),s=document.getElementById(`class`).value.trim(),l=document.getElementById(`mobile`).value.trim();if(!Ut(n)){i.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,i.style.display=`block`;return}let u=r.querySelector(`button[type="submit"]`);u.disabled=!0,u.textContent=`Creating Account...`;let d=await Oe({email:t,password:a,username:n,name:e,admissionNumber:o,userClass:s,mobile:l,isTeacher:c===`teacher`,role:c===`teacher`?`teacher`:`student`});d.success?window.location.hash=`#/`:(i.textContent=d.error,i.style.display=`block`,u.disabled=!1,u.textContent=`Create Account`)}})}var Gt=[{id:`gradient-1`,name:`SJC Ocean Blue`,gradient:`linear-gradient(135deg, #1D9BF0 0%, #004477 100%)`},{id:`gradient-2`,name:`Neon Cyberpunk`,gradient:`linear-gradient(135deg, #FF0080 0%, #7928CA 100%)`},{id:`gradient-3`,name:`Emerald Glow`,gradient:`linear-gradient(135deg, #00b09b 0%, #96c93d 100%)`},{id:`gradient-4`,name:`Golden Sunset`,gradient:`linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)`},{id:`gradient-5`,name:`Crimson Fire`,gradient:`linear-gradient(135deg, #E94057 0%, #F27121 100%)`},{id:`gradient-6`,name:`Midnight Purple`,gradient:`linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)`},{id:`gradient-7`,name:`Dark Obsidian`,gradient:`linear-gradient(135deg, #16181C 0%, #2F3336 100%)`},{id:`gradient-8`,name:`Teal Lagoon`,gradient:`linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`},{id:`gradient-9`,name:`Aurora Borealis`,gradient:`linear-gradient(135deg, #43cea2 0%, #185a9d 100%)`},{id:`gradient-10`,name:`Velvet Dusk`,gradient:`linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)`},{id:`gradient-11`,name:`Electric Violet`,gradient:`linear-gradient(135deg, #DA22FF 0%, #9733EE 100%)`},{id:`gradient-12`,name:`Cosmic Nebula`,gradient:`linear-gradient(135deg, #020024 0%, #090979 50%, #00d4ff 100%)`},{id:`gradient-13`,name:`Sunset Coral`,gradient:`linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)`},{id:`gradient-14`,name:`Emerald Forest`,gradient:`linear-gradient(135deg, #134E5E 0%, #71B280 100%)`},{id:`gradient-15`,name:`Rose Gold`,gradient:`linear-gradient(135deg, #f4c4f3 0%, #fc67fa 100%)`},{id:`gradient-16`,name:`Midnight Gold`,gradient:`linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)`},{id:`gradient-17`,name:`Cyber Matrix`,gradient:`linear-gradient(135deg, #000000 0%, #0f9b0f 100%)`},{id:`gradient-18`,name:`Plum Royalty`,gradient:`linear-gradient(135deg, #614385 0%, #516395 100%)`},{id:`gradient-19`,name:`Citrus Splash`,gradient:`linear-gradient(135deg, #FFE000 0%, #799F0C 100%)`},{id:`gradient-20`,name:`Deep Space`,gradient:`linear-gradient(135deg, #000000 0%, #434343 100%)`},{id:`gradient-21`,name:`Aether Blue`,gradient:`linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)`},{id:`gradient-22`,name:`Flamingo Coral`,gradient:`linear-gradient(135deg, #ef629f 0%, #eecda3 100%)`},{id:`gradient-23`,name:`Sublime Light`,gradient:`linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)`},{id:`gradient-24`,name:`Frosted Prism`,gradient:`linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)`}],Kt=[{id:`sjc-blue`,name:`SJC Blue`,bg:`linear-gradient(135deg, rgba(29, 155, 240, 0.15) 0%, rgba(0, 68, 119, 0.3) 100%)`,border:`1px solid rgba(29, 155, 240, 0.4)`,accent:`#1D9BF0`,shadow:`0 8px 24px rgba(29, 155, 240, 0.2)`},{id:`neon-cyber`,name:`Neon Cyber`,bg:`linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(121, 40, 202, 0.3) 100%)`,border:`1px solid rgba(255, 0, 128, 0.4)`,accent:`#FF0080`,shadow:`0 8px 24px rgba(255, 0, 128, 0.2)`},{id:`emerald-glow`,name:`Emerald Glow`,bg:`linear-gradient(135deg, rgba(0, 176, 155, 0.15) 0%, rgba(150, 201, 61, 0.3) 100%)`,border:`1px solid rgba(0, 176, 155, 0.4)`,accent:`#00BA7C`,shadow:`0 8px 24px rgba(0, 186, 124, 0.2)`},{id:`golden-sunset`,name:`Golden Sunset`,bg:`linear-gradient(135deg, rgba(242, 153, 74, 0.15) 0%, rgba(242, 201, 76, 0.3) 100%)`,border:`1px solid rgba(242, 153, 74, 0.4)`,accent:`#F2994A`,shadow:`0 8px 24px rgba(242, 153, 74, 0.2)`},{id:`crimson-fire`,name:`Crimson Fire`,bg:`linear-gradient(135deg, rgba(233, 64, 87, 0.15) 0%, rgba(242, 113, 33, 0.3) 100%)`,border:`1px solid rgba(233, 64, 87, 0.4)`,accent:`#E94057`,shadow:`0 8px 24px rgba(233, 64, 87, 0.2)`},{id:`glass-minimal`,name:`Glass Minimal`,bg:`linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,border:`1px solid rgba(255, 255, 255, 0.15)`,accent:`#E7E9EA`,shadow:`0 8px 24px rgba(0, 0, 0, 0.3)`},{id:`midnight-cyber`,name:`Midnight Cyber`,bg:`linear-gradient(135deg, rgba(74, 0, 224, 0.2) 0%, rgba(142, 45, 226, 0.35) 100%)`,border:`1px solid rgba(142, 45, 226, 0.4)`,accent:`#9B51E0`,shadow:`0 8px 24px rgba(155, 81, 224, 0.25)`},{id:`sakura-blossom`,name:`Sakura Blossom`,bg:`linear-gradient(135deg, rgba(244, 196, 243, 0.15) 0%, rgba(252, 103, 250, 0.25) 100%)`,border:`1px solid rgba(252, 103, 250, 0.4)`,accent:`#FC67FA`,shadow:`0 8px 24px rgba(252, 103, 250, 0.2)`},{id:`oceanic-breeze`,name:`Oceanic Breeze`,bg:`linear-gradient(135deg, rgba(17, 153, 142, 0.15) 0%, rgba(56, 239, 125, 0.25) 100%)`,border:`1px solid rgba(56, 239, 125, 0.4)`,accent:`#38EF7D`,shadow:`0 8px 24px rgba(56, 239, 125, 0.2)`},{id:`solar-flare`,name:`Solar Flare`,bg:`linear-gradient(135deg, rgba(255, 224, 0, 0.15) 0%, rgba(121, 159, 12, 0.25) 100%)`,border:`1px solid rgba(255, 224, 0, 0.4)`,accent:`#FFD700`,shadow:`0 8px 24px rgba(255, 215, 0, 0.2)`},{id:`amethyst-dreams`,name:`Amethyst Dreams`,bg:`linear-gradient(135deg, rgba(97, 67, 133, 0.2) 0%, rgba(81, 99, 149, 0.3) 100%)`,border:`1px solid rgba(97, 67, 133, 0.4)`,accent:`#A06CD5`,shadow:`0 8px 24px rgba(160, 108, 213, 0.2)`},{id:`obsidian-frost`,name:`Obsidian Frost`,bg:`linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(47, 51, 54, 0.8) 100%)`,border:`1px solid rgba(255, 255, 255, 0.2)`,accent:`#64B5F6`,shadow:`0 8px 24px rgba(0, 0, 0, 0.5)`}],qt=[{id:`georgia`,name:`Georgia Serif`,fontFamily:`Georgia, serif`},{id:`playfair`,name:`Playfair Editorial`,fontFamily:`'Playfair Display', serif`},{id:`caveat`,name:`Caveat Script`,fontFamily:`'Caveat', cursive, sans-serif`},{id:`cinzel`,name:`Cinzel Roman`,fontFamily:`'Cinzel', serif`},{id:`vibes`,name:`Great Vibes Calligraphy`,fontFamily:`'Great Vibes', cursive, sans-serif`},{id:`pacifico`,name:`Pacifico Vintage`,fontFamily:`'Pacifico', cursive, sans-serif`}];function Jt(e){let t=qt.find(t=>t.id===e);return t?t.fontFamily:qt[0].fontFamily}function Yt(e){return new Promise((t,n)=>{if(!e||!e.type.startsWith(`image/`))return n(Error(`Please select a valid image file.`));if(e.size>25*1024*1024)return n(Error(`Selected image file is too large (max 25MB).`));let r=new FileReader;r.onload=e=>{let r=new Image;r.onload=()=>{let e=document.createElement(`canvas`),n=r.width,i=r.height;n>i?n>320&&(i=Math.round(i*320/n),n=320):i>320&&(n=Math.round(n*320/i),i=320),e.width=n,e.height=i;let a=e.getContext(`2d`);a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.drawImage(r,0,0,n,i),t(e.toDataURL(`image/jpeg`,.8))},r.onerror=()=>n(Error(`Failed to process mobile image. Please try a different photo.`)),r.src=e.target.result},r.onerror=()=>n(Error(`Failed to read file from phone gallery.`)),r.readAsDataURL(e)})}var Xt=E({createReply:()=>Qt,editReply:()=>$t,getPostById:()=>Zt,getReplyById:()=>tn,getSavedReplies:()=>an,isReplySaved:()=>nn,subscribeToReplies:()=>en,toggleSavedReply:()=>rn});async function Zt(e){if(!e)return null;let t=await h(i(p,`${w.POSTS}/${e}`));return t.exists()?t.val():null}async function Qt(n,r,a=null){let o=v.currentUser;if(!o)throw Error(`Not authenticated`);let s=r?r.trim():``;if(!s)throw Error(`Reply cannot be empty`);if(s.replace(/\s/g,``).length>189)throw Error(`Reply cannot exceed 189 characters`);let c=(await Zt(n))?.isAnonymous===!0,l=b(i(p,`${w.REPLIES}/${n}`)),u={replyId:l.key,parentPost:n,parentReply:a,authorId:o.uid,content:s,timestamp:new Date().toISOString(),likes:0,isAnonymous:c};await e(l,u),await e(i(p,`${w.REPLIES}/_global_last_reply`),u);let d=i(p,`${w.POSTS}/${n}`),f=null,m=!1;await t(d,e=>(e&&(e.replyCount=(e.replyCount||0)+1,f=e.authorId,m=e.isAnonymous),e));let{sendNotification:g}=await H(async()=>{let{sendNotification:e}=await Promise.resolve().then(()=>Pe);return{sendNotification:e}},void 0,import.meta.url),{getUserProfile:_}=await H(async()=>{let{getUserProfile:e}=await Promise.resolve().then(()=>I);return{getUserProfile:e}},void 0,import.meta.url),y=`Someone`;m||(y=(await _(o.uid))?.name||`A student`);let x=new Set;if(f&&f!==o.uid&&x.add(f),a){let e=await h(i(p,`${w.REPLIES}/${n}/${a}`));if(e.exists()){let t=e.val().authorId;t&&t!==o.uid&&x.add(t)}}for(let e of x)await g(e,{text:`${y} replied to your post.`,type:`SYSTEM`,postId:n,senderId:o.uid});return u}async function $t(e,t,n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=n?n.trim():``;if(!a)throw Error(`Reply cannot be empty`);let o=await h(i(p,`${w.REPLIES}/${e}/${t}`));if(!o.exists())throw Error(`Reply not found`);if(o.val().authorId!==r.uid)throw Error(`Unauthorized: You can only edit your own replies.`);return await x(i(p,`${w.REPLIES}/${e}/${t}`),{content:a,edited:!0,updatedAt:new Date().toISOString()}),!0}function en(e,t){let n=i(p,`${w.REPLIES}/${e}`),r=c(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)});return()=>l(n,`value`,r)}async function tn(e,t){try{let n=await h(i(p,`${w.REPLIES}/${e}/${t}`));return n.exists()?n.val():null}catch{return null}}async function nn(e){let t=v.currentUser;if(!t)return!1;try{return(await h(i(p,`${w.SAVED_REPLIES}/${t.uid}/${e}`))).exists()}catch{return!1}}async function rn(t,n){let r=v.currentUser;if(!r)throw Error(`Not authenticated`);let a=i(p,`${w.SAVED_REPLIES}/${r.uid}/${t}`);return(await h(a)).exists()?(await S(a),!1):(await e(a,{replyId:t,postId:n,timestamp:new Date().toISOString()}),!0)}async function an(e){try{let t=await h(i(p,`${w.SAVED_REPLIES}/${e}`));if(!t.exists())return[];let n=t.val(),r=Object.keys(n),a=[];for(let e of r){let t=n[e].postId,r=await tn(t,e);r&&a.push({...r,_savedTimestamp:n[e].timestamp})}return a.sort((e,t)=>new Date(t._savedTimestamp||0)-new Date(e._savedTimestamp||0)),a}catch(e){return console.error(`Error fetching saved replies:`,e),[]}}function on(e){if(!e)return;let t=e.closest(`.feed-item-wrapper`)||e;t.style.transition=`opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s`,t.style.overflow=`hidden`,t.style.maxHeight=t.offsetHeight+`px`,t.offsetHeight,t.style.opacity=`0`,t.style.transform=`scale(0.95)`,t.style.maxHeight=`0px`,t.style.marginTop=`0px`,t.style.marginBottom=`0px`,t.style.paddingTop=`0px`,t.style.paddingBottom=`0px`,setTimeout(()=>t.remove(),450)}async function sn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Profile</h1>
      </div>
    </header>
    ${K(2)}
  `,D.PROFILE);let t=window.location.hash,n=null,r=``;t.includes(`?u=`)&&(r=t.split(`?u=`)[1]||``,r&&(n=decodeURIComponent(r).trim().replace(/^[@\-\s]+/,``)));let a=null;try{if(n){let e=n.toLowerCase().replace(/^[@\-\s]+/,``),t=await h(i(p,w.USERS));t.exists()&&t.forEach(t=>{if(a)return;let i=t.val();if(!i)return;let o=(i.username||``).toLowerCase().replace(/^[@\-\s]+/,``),s=i.uid||``,c=(i.email||``).toLowerCase(),l=(i.name||``).toLowerCase();(o===e||s===n||s===r||c===e||o&&e&&(o.includes(e)||e.includes(o))||l&&e&&l.includes(e))&&(a=i)})}else a=await L(v.currentUser.uid)}catch(e){console.error(`Error loading profile:`,e)}if(!a&&!n&&(a=await L(v.currentUser.uid)),!a){e.innerHTML=W(`
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
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile "@${P(n||`user`)}" does not exist on Backbench.</p>
      </div>
    `,D.PROFILE);let t=G();return()=>{t&&t()}}let o=v.currentUser.uid===a.uid,s=q(a),c=Jt(a.quoteFontId),l=!1;o||(l=await Be(a.uid));let u=await We(a.uid),d=Gt.find(e=>e.id===a.bannerPreset)||Gt[0],f=a.bannerCustom||d.gradient,m=Kt.find(e=>e.id===a.quotePreset)||Kt[0],g=m.bg,_=m.border,y=m.accent,b=a.name?a.name.charAt(0).toUpperCase():`S`,x=a.profilePicture?`<img src="${a.profilePicture}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`:`<div class="avatar" style="width: 100%; height: 100%; font-size: 36px; border-radius: 50%;">${b}</div>`;e.innerHTML=W(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div style="display: flex; flex-direction: column;">
          <h1 class="header-title" style="font-family: ${s};">${P(a.name||`Student`)}</h1>
          <span style="font-size: 12px; color: var(--text-secondary);" id="profile-post-count-header">0 Posts</span>
        </div>
      </div>
    </header>

    <!-- Cover Banner -->
    <div style="height: 150px; background: ${f}; width: 100%; position: relative;"></div>

    <!-- Profile Header Info -->
    <div style="padding: 0 16px 16px 16px; position: relative;" class="fade-in">
      
      <!-- Avatar & Action Buttons Row -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -45px; margin-bottom: 12px;">
        <div style="width: 90px; height: 90px; border-radius: 50%; border: 4px solid var(--bg-primary); background: var(--bg-secondary); overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
          ${x}
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="copy-profile-frame-btn" class="btn btn-outline" style="font-weight: 700; font-size: 13px; padding: 6px 12px; display: flex; align-items: center; gap: 4px;" title="Copy digital student ID frame link">
            <span class="material-symbols-outlined" style="font-size: 16px;">filter_frames</span> Frame Link
          </button>
          ${o?`
            <button id="edit-profile-btn" class="btn btn-outline" style="font-weight: 700;">Edit Profile</button>
          `:`
            <button id="profile-friend-btn" class="btn ${l?`btn-outline`:``}">
              ${l?`Friends`:`+ Add Friend`}
            </button>
          `}
        </div>
      </div>

      <!-- Names & Badges -->
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <h2 style="font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 6px; font-family: ${s};">
          ${P(a.name||`Student`)}
          ${a.isTeacher?`
            <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
              <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
            </span>
          `:a.verifiedStudent||a.role===`staff`||a.role===`admin`?`
            <span class="material-symbols-outlined verified-icon" style="font-size: 20px;">verified</span>
          `:``}
        </h2>
        <span style="font-size: 14px; color: var(--text-secondary);">@${P(a.username||`student`)}</span>
      </div>

      <!-- Bio / Description -->
      ${a.bio?`
        <div style="margin-top: 10px; font-size: 14px; color: var(--text-primary); line-height: 1.4; font-family: ${s};">
          ${P(a.bio)}
        </div>
      `:``}

      <!-- Custom Campus Quote Banner -->
      ${a.tagline?`
        <div style="margin-top: 12px; padding: 12px 16px; border-radius: 12px; background: ${g}; border: ${_}; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: ${y}; font-size: 22px;">format_quote</span>
          <span style="font-size: 14px; font-style: italic; color: var(--text-primary); font-family: ${c};">
            “${P(a.tagline)}”
          </span>
        </div>
      `:``}

      <!-- Meta Info Pills (Class, Admission, Mobile, Joined Date) -->
      <div style="display: flex; flex-wrap: wrap; gap: 14px; margin-top: 14px; font-size: 13px; color: var(--text-secondary);">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">school</span>
          <span>Class ${P(a.class||`N/A`)}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">badge</span>
          <span>Adm: ${P(a.admissionNumber||`N/A`)}</span>
        </div>

        ${a.mobile?`
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
            <span>${P(a.mobile)}</span>
          </div>
        `:``}

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">calendar_today</span>
          <span>Joined ${new Date(a.joinedDate||Date.now()).toLocaleDateString(`en-US`,{month:`short`,year:`numeric`})}</span>
        </div>
      </div>

      <!-- Friends Counter Pill -->
      <div style="margin-top: 12px; font-size: 14px; display: flex; gap: 16px;">
        <span style="color: var(--text-secondary);">
          <strong style="color: var(--text-primary);">${u}</strong> Friends
        </span>
      </div>
    </div>

    <!-- Profile Tabs -->
    <div class="header-tabs">
      <button class="tab-button active" id="profile-tab-posts">Posts</button>
      <button class="tab-button" id="profile-tab-likes">Likes</button>
      ${o?`<button class="tab-button" id="profile-tab-saved">Saved</button>`:``}
    </div>

    <!-- Feed Container -->
    <div id="profile-feed-container">
      ${K(3)}
    </div>

    <!-- Edit Profile Modal Overlay (Only rendered for own profile) -->
    ${o?cn(a):``}
  `,D.PROFILE),G();let S=document.getElementById(`profile-feed-container`),C=document.getElementById(`profile-post-count-header`),T=document.getElementById(`profile-tab-posts`),E=document.getElementById(`profile-tab-likes`),O=document.getElementById(`profile-tab-saved`),k=document.getElementById(`copy-profile-frame-btn`);k&&k.addEventListener(`click`,()=>{let e=`${window.location.origin}${window.location.pathname}#/profile-frame?u=${encodeURIComponent(a.username||`student`)}`;navigator.clipboard.writeText(e).then(()=>{let e=k.innerHTML;k.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{k.innerHTML=e},2e3)})});let A=document.getElementById(`profile-friend-btn`);A&&A.addEventListener(`click`,async()=>{A.disabled=!0;try{let e=await He(a.uid);A.textContent=e?`Friends`:`+ Add Friend`,A.className=`btn ${e?`btn-outline`:``}`}catch(e){alert(e.message||`Failed to update friend status`)}finally{A.disabled=!1}}),ie(a.uid,async e=>{if(S){if(C&&(C.textContent=`${e.length} Post${e.length===1?``:`s`}`),M!==`posts`){window.currentProfilePosts=e;return}j(e)}});async function j(e){if(!S)return;if(e.length===0){S.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">post_add</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
          <p style="font-size: 14px;">When ${o?`you post`:`this student posts`}, their content will appear here.</p>
        </div>
      `;return}let t=``,n=v.currentUser.uid;for(let r of e){let e=await z(r.postId,n),i=await de(r.postId,n);t+=Tt(r,a,e,i)}S.innerHTML=t,S.querySelectorAll(`.post-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`a`)){let t=e.dataset.postId;t&&(window.location.hash=`${D.POST_DETAIL}?id=${t}`)}})}),S.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await le(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),S.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId,r=e.dataset.authorId,i=v.currentUser?.uid,a=i?await L(i):null,o=a?.role===`staff`||a?.role===`admin`;Y(e,{itemId:n,authorId:r,currentUid:i,isStaff:o,itemType:`post`,onDelete:async t=>{try{i===r?await pe(t):o&&await vt(t),on(e.closest(`.post-card`))}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{(await bt(t,n)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),on(e.closest(`.post-card`))):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}let M=`posts`;async function N(){if(!S)return;S.innerHTML=K(3);let e=await fe(a.uid);if(e.length===0){S.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">favorite</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No liked posts yet</h3>
          <p style="font-size: 14px;">When ${o?`you like`:`this student likes`} a post, it will appear here.</p>
        </div>
      `;return}let t=``,n=v.currentUser?.uid;for(let r of e){let e=await L(r.authorId),i=n?await z(r.postId,n):!1,a=n?await de(r.postId,n):!1,o=n?await me(r.postId,n):!1;t+=Tt(r,e,i,a,o)}S.innerHTML=t,S.querySelectorAll(`.post-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`a`)){let t=e.dataset.postId;t&&(window.location.hash=`${D.POST_DETAIL}?id=${t}`)}})}),S.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await le(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),S.querySelectorAll(`.save-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{await he(n)?(e.classList.add(`saved`),e.style.color=`var(--accent-primary)`):(e.classList.remove(`saved`),e.style.color=``)}catch(e){console.error(e)}finally{e.disabled=!1}})}),S.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId,r=e.dataset.authorId,i=v.currentUser?.uid,a=i?await L(i):null,o=a?.role===`staff`||a?.role===`admin`;Y(e,{itemId:n,authorId:r,currentUid:i,isStaff:o,itemType:`post`,onDelete:async t=>{try{i===r?await pe(t):o&&await vt(t);let n=e.closest(`.post-card`);n&&(n.style.opacity=`0.3`,n.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{if((await bt(t,n)).autoTakenDown){alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`);let t=e.closest(`.post-card`);t&&(t.style.opacity=`0.2`,t.style.pointerEvents=`none`)}else alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}T&&E&&(T.addEventListener(`click`,()=>{M!==`posts`&&(M=`posts`,T.classList.add(`active`),E.classList.remove(`active`),O&&O.classList.remove(`active`),window.currentProfilePosts&&j(window.currentProfilePosts))}),E.addEventListener(`click`,()=>{M!==`likes`&&(M=`likes`,E.classList.add(`active`),T.classList.remove(`active`),O&&O.classList.remove(`active`),N())}),O&&O.addEventListener(`click`,()=>{M!==`saved`&&(M=`saved`,O.classList.add(`active`),T.classList.remove(`active`),E.classList.remove(`active`),F())}));async function F(){if(!S)return;S.innerHTML=K(3);let e=await ge(a.uid),t=await an(a.uid),n=[...e,...t].sort((e,t)=>{let n=new Date(e._savedTimestamp||0);return new Date(t._savedTimestamp||0)-n});if(n.length===0){S.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">bookmark</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No saved posts or replies yet</h3>
          <p style="font-size: 14px;">When you save a post or reply, it will appear here for easy access.</p>
        </div>
      `;return}let r=``,o=v.currentUser?.uid;for(let e of n)if(e.replyId){let t=await L(e.authorId),n=await h(i(p,`${w.POSTS}/${e.postId}`)),a=null,o=null;n.exists()&&(a=n.val(),o=await L(a.authorId)),a&&(r+=Et(a,o,e,t,!0))}else{let t=await L(e.authorId),n=o?await z(e.postId,o):!1,i=o?await de(e.postId,o):!1;r+=Tt(e,t,n,i,!0)}S.innerHTML=r,S.querySelectorAll(`.post-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`a`)){let t=e.dataset.postId;t&&(window.location.hash=`${D.POST_DETAIL}?id=${t}`)}})}),S.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await le(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),S.querySelectorAll(`.save-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{await he(n)?(e.classList.add(`saved`),e.style.color=`var(--accent-primary)`):(e.classList.remove(`saved`),e.style.color=``)}catch(e){console.error(e)}finally{e.disabled=!1}})})}o&&ln(a,e)}function cn(e){let t=e.bannerPreset||Gt[0].id,n=e.quotePreset||Kt[0].id,r=e.fontId||wt[0].id,i=e.quoteFontId||qt[0].id,a=Gt.map(e=>`
    <div class="banner-swatch ${e.id===t?`active`:``}" data-id="${e.id}" style="background: ${e.gradient}; height: 40px; border-radius: 8px; cursor: pointer; border: 2px solid ${e.id===t?`var(--accent-primary)`:`transparent`};" title="${e.name}"></div>
  `).join(``),o=Kt.map(e=>`
    <div class="quote-swatch ${e.id===n?`active`:``}" data-id="${e.id}" style="background: ${e.bg}; border: ${e.border}; height: 40px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="${e.name}">
      <span class="material-symbols-outlined" style="color: ${e.accent}; font-size: 18px;">format_quote</span>
    </div>
  `).join(``),s=wt.map(e=>{let t=e.id===r;return`
      <div class="font-card-swatch ${t?`active`:``}" data-id="${e.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${t?`var(--accent-primary)`:`transparent`}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${e.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${e.name}</span>
        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary); font-family: ${e.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          Ag Backbench
        </span>
      </div>
    `}).join(``),c=qt.map(e=>{let t=e.id===i;return`
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
          <input type="text" id="edit-name" class="input-field" value="${P(e.name||``)}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Username</label>
          <input type="text" id="edit-username" class="input-field" value="${P(e.username||``)}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Bio / Description</label>
          <textarea id="edit-bio" class="input-field" rows="2" style="resize: none;">${P(e.bio||``)}</textarea>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Campus Motto / Quote</label>
          <input type="text" id="edit-tagline" class="input-field" value="${P(e.tagline||``)}" placeholder="Your personal slogan..." />

          <!-- Cover Banner Gradient Selection (24 Presets) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-top: 6px; display: block;">Cover Banner Theme (24 Gradients)</label>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px;" id="banner-swatches-container">
            ${a}
          </div>

          <!-- Quote Background Theme Selection (12 Presets) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Quote Theme (12 Styles)</label>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px;" id="quote-swatches-container">
            ${o}
          </div>

          <!-- Visual Custom User Font Cards Grid -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Profile & Post Font Theme (Visual Cards)</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;" id="font-cards-container">
            ${s}
          </div>

          <!-- Visual Custom Quote Font Cards Grid -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Quote Motto Font Style (Visual Cards)</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;" id="quote-font-cards-container">
            ${c}
          </div>

          <div id="edit-profile-error" class="error-text" style="display: none;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px;">
            <button type="button" id="cancel-edit-modal-btn" class="btn btn-outline">Cancel</button>
            <button type="submit" id="save-edit-profile-btn" class="btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `}function ln(e,t){let n=document.getElementById(`edit-profile-modal`),r=document.getElementById(`edit-profile-btn`),i=document.getElementById(`close-edit-modal-btn`),a=document.getElementById(`cancel-edit-modal-btn`),o=document.getElementById(`edit-profile-form`),s=document.getElementById(`edit-pfp-input`),c=document.getElementById(`modal-pfp-preview`),l=document.getElementById(`edit-profile-error`),u=document.getElementById(`save-edit-profile-btn`),d=e.bannerPreset||Gt[0].id,f=e.quotePreset||Kt[0].id,p=e.fontId||wt[0].id,m=e.quoteFontId||qt[0].id,h=e.profilePicture||``;r&&r.addEventListener(`click`,()=>{n.style.display=`flex`});let g=()=>{n.style.display=`none`};return i&&i.addEventListener(`click`,g),a&&a.addEventListener(`click`,g),t.querySelectorAll(`.banner-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.banner-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,d=e.dataset.id})}),t.querySelectorAll(`.quote-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.quote-swatch`).forEach(e=>e.style.boxShadow=`none`),e.style.boxShadow=`0 0 0 2px var(--accent-primary)`,f=e.dataset.id})}),t.querySelectorAll(`.font-card-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.font-card-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,p=e.dataset.id})}),t.querySelectorAll(`.quote-font-card-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.quote-font-card-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,m=e.dataset.id})}),s&&s.addEventListener(`change`,async e=>{let t=e.target.files[0];if(t)try{h=await Yt(t),c.innerHTML=`<img src="${h}" style="width:100%;height:100%;object-fit:cover;" />`}catch(e){alert(e.message||`Failed to process image`)}}),o&&o.addEventListener(`submit`,async e=>{e.preventDefault(),l.style.display=`none`;let n=document.getElementById(`edit-name`).value.trim(),r=document.getElementById(`edit-username`).value.trim(),i=document.getElementById(`edit-bio`).value.trim(),a=document.getElementById(`edit-tagline`).value.trim();if(!Ut(r)){l.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,l.style.display=`block`;return}u.disabled=!0,u.textContent=`Saving...`;try{await ce(v.currentUser.uid,{name:n,username:r,bio:i,tagline:a,bannerPreset:d,quotePreset:f,fontId:p,quoteFontId:m,profilePicture:h}),g(),sn(t)}catch(e){console.error(e),l.textContent=e.message||`Failed to save profile changes.`,l.style.display=`block`,u.disabled=!1,u.textContent=`Save Changes`}}),()=>{layoutCleanup&&layoutCleanup(),userPostsUnsub&&=(userPostsUnsub(),null)}}async function un(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <h1 class="header-title">Friends</h1>
    </header>
    ${K(3)}
  `,`#/friends`);let t=v.currentUser.uid,n=await Ge(t),r=n.filter(e=>e.isMutual),i=n.filter(e=>!e.isMutual),a=`all`;function o(e){return e.length===0?`
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
        ${e.map(e=>{let t=q(e),n=V(e,50,`border: 1px solid var(--border-color);`),r=e.name?P(e.name):`Student`,i=e.username?P(e.username):`student`,a=e.isMutual;return`
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
                  
                  <span style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">@${i} · Class ${P(e.class||`N/A`)}</span>
                  ${e.tagline?`<span style="font-size: 12px; font-style: italic; color: var(--accent-primary); margin-top: 2px;">“${P(e.tagline)}”</span>`:``}
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
    `}e.innerHTML=W(`
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
  `,`#/friends`);let s=G(),c=document.getElementById(`friends-list-container`),l=document.getElementById(`tab-all-friends`),u=document.getElementById(`tab-real-friends`),d=document.getElementById(`tab-onesided-friends`);function f(){c.querySelectorAll(`.friend-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.btn`)){let t=e.dataset.username;window.location.hash=`#/profile?u=${t}`}})}),c.querySelectorAll(`.remove-friend-btn`).forEach(t=>{t.addEventListener(`click`,async n=>{n.stopPropagation();let r=t.dataset.uid;t.disabled=!0;try{await He(r),un(e)}catch(e){alert(e.message||`Failed to remove friend.`),t.disabled=!1}})})}return f(),l.addEventListener(`click`,()=>{a=`all`,l.classList.add(`active`),u.classList.remove(`active`),d.classList.remove(`active`),c.innerHTML=o(n),f()}),u.addEventListener(`click`,()=>{a=`real`,u.classList.add(`active`),l.classList.remove(`active`),d.classList.remove(`active`),c.innerHTML=o(r),f()}),d.addEventListener(`click`,()=>{a=`onesided`,d.classList.add(`active`),l.classList.remove(`active`),u.classList.remove(`active`),c.innerHTML=o(i),f()}),()=>{s&&s()}}var dn=null;function fn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <h1 class="header-title">Notifications</h1>
    </header>
    ${K(3)}
  `,`#/notifications`);let t=v.currentUser.uid;e.innerHTML=W(`
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
      ${K(3)}
    </div>
  `,`#/notifications`);let n=G(),r=document.getElementById(`notifications-feed-container`),i=document.getElementById(`mark-all-read-btn`),a=document.getElementById(`clear-read-btn`);return i&&i.addEventListener(`click`,async()=>{i.disabled=!0;try{await Re(t)}catch(e){console.error(e)}finally{i.disabled=!1}}),a&&a.addEventListener(`click`,async()=>{a.disabled=!0;try{await ze(t)}catch(e){console.error(e)}finally{a.disabled=!1}}),dn&&dn(),dn=Ie(t,e=>{if(!r)return;if(e.length===0){r.innerHTML=`
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">notifications_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">All Clear!</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px;">
            You have no notifications or report alerts at this time.
          </p>
        </div>
      `;return}let n=``;e.forEach(e=>{let t=!e.read,r=e.type===`MODERATION`,i=e.type===`FRIEND_REQUEST`,a=`notifications`,o=`var(--accent-primary)`,s=`NOTIFICATION`,c=``;r?(a=`warning`,o=`var(--error-color)`,s=`MODERATION ALERT`,c=`background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);`):i&&(a=`person_add`,o=`var(--success-color)`,s=`NEW FRIEND`,c=`background: rgba(0, 186, 124, 0.2); color: var(--success-color); border-color: var(--success-color);`),n+=`
        <div class="card fade-in notif-item" data-notif-id="${e.notificationId}" data-post-id="${e.postId||``}" style="padding: 16px; border-radius: 16px; margin-bottom: 12px; border: ${t?`2px solid var(--accent-primary)`:`1px solid var(--border-color)`}; background: ${t?`rgba(29, 155, 240, 0.05)`:`var(--bg-secondary)`}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: ${r?`rgba(244, 33, 46, 0.15)`:i?`rgba(0, 186, 124, 0.15)`:`var(--bg-tertiary)`}; display: flex; align-items: center; justify-content: center; color: ${o}; flex-shrink: 0;">
              <span class="material-symbols-outlined" style="font-size: 20px;">
                ${a}
              </span>
            </div>

            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="brand-badge" style="font-size: 10px; ${c}">
                  ${s}
                </span>
                <span class="time-ago" data-timestamp="${e.timestamp}" style="font-size: 12px; color: var(--text-secondary);">${B(e.timestamp)}</span>
              </div>

              <div style="font-size: 14px; line-height: 1.4; color: var(--text-primary); font-weight: ${t?`700`:`400`};">
                ${P(e.text)}
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
      `}),r.innerHTML=n,r.querySelectorAll(`.notif-item`).forEach(e=>{e.addEventListener(`click`,async n=>{if(!n.target.closest(`.mark-read-btn`)){let n=e.dataset.notifId,r=e.dataset.postId;await Le(t,n),r&&(window.location.hash=`${D.POST_DETAIL}?id=${r}`)}})}),r.querySelectorAll(`.mark-read-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.notifId;e.disabled=!0,await Le(t,r)})})}),()=>{n&&n(),dn&&=(dn(),null)}}var pn=null;async function mn(e){if(!v.currentUser){window.location.hash=`#/login`;return}let t=v.currentUser.uid;e.innerHTML=W(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>
    ${K(2)}
  `,D.HOME);let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){hn(e,`No post ID provided.`);return}let i=await Zt(r);if(!i){hn(e,`This post has been deleted or does not exist.`);return}let a=await L(i.authorId),o=v.currentUser,s=V(o.photoURL||``,40),c=i.isAnonymous===!0,l=c?`<div class="avatar" style="width: 48px; height: 48px; font-size: 22px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`:V(a,48,`border: 1px solid var(--border-color);`),u=c?`Anonymous 1`:a?.name?P(a.name):`Anonymous Student`,d=c?`anonymous`:a?.username?P(a.username):`student`,f=!c&&(a?.isTeacher||a?.role===`teacher`),p=!c&&(a?.verifiedStudent||a?.role===`staff`||a?.role===`admin`||f),m=c?`'Inter', sans-serif`:q(a),h=new Map;h.set(i.authorId,1);let g=2;function _(e){return h.has(e)||h.set(e,g++),h.get(e)}function y(e){let t=[`linear-gradient(135deg, #6366f1, #8b5cf6)`,`linear-gradient(135deg, #f97316, #ef4444)`,`linear-gradient(135deg, #14b8a6, #06b6d4)`,`linear-gradient(135deg, #ec4899, #f43f5e)`,`linear-gradient(135deg, #eab308, #f97316)`,`linear-gradient(135deg, #22c55e, #10b981)`,`linear-gradient(135deg, #3b82f6, #6366f1)`,`linear-gradient(135deg, #a855f7, #ec4899)`];return`<div class="avatar" style="width: 38px; height: 38px; font-size: 14px; background: ${t[(e-1)%t.length]}; font-weight: 800;">A${e}</div>`}let b=new Date(i.timestamp||Date.now()),x=b.toLocaleTimeString(`en-US`,{hour:`numeric`,minute:`2-digit`}),S=b.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`});e.innerHTML=W(`
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
        ${ee(i.content)}
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
          <span id="reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${X.REPLY_MAX_WORDS}</span>
          <button id="submit-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Replies Feed Container -->
    <div id="replies-feed-container">
      ${K(2)}
    </div>
  `,D.HOME);let C=G(),w=document.querySelector(`.right-sidebar`);w&&oe(i.postId,i.hashtags||[],3).then(async e=>{if(e&&e.length>0){let t=document.createElement(`div`);t.className=`widget-card fade-in`;let n=`
          <div class="widget-title">
            <span>Related Campus Posts</span>
            <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 20px;">explore</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
        `;for(let t of e){let e=await L(t.authorId);e?.name&&P(e.name),n+=`
            <div style="cursor: pointer; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);" onclick="window.location.hash='#${D.POST_DETAIL}?id=${t.postId}'">
              <div style="color: var(--text-secondary); font-size: 11px; font-weight: 700;">@${P(e?.username||`student`)}</div>
              <div style="color: var(--text-primary); font-weight: 600; line-height: 1.3; margin-top: 2px;">${P(t.content.substring(0,75))}${t.content.length>75?`...`:``}</div>
            </div>
          `}n+=`</div>`,t.innerHTML=n,w.insertBefore(t,w.children[1])}}).catch(e=>console.error(e));let T=document.getElementById(`reply-input`),E=document.getElementById(`reply-char-counter`),O=document.getElementById(`submit-reply-btn`),k=document.getElementById(`replies-feed-container`),j=document.getElementById(`post-detail-like-btn`),M=document.getElementById(`post-likes-stat`),N=document.getElementById(`post-detail-reshare-btn`),F=document.getElementById(`post-reshare-stat`),I=document.getElementById(`post-detail-options-btn`);I&&I.addEventListener(`click`,async e=>{e.stopPropagation();let n=t?await L(t):null,a=n?.role===`staff`||n?.role===`admin`;Y(I,{itemId:r,authorId:i.authorId,currentUid:v.currentUser?.uid,isStaff:a,itemType:`post`,onDelete:async e=>{try{v.currentUser?.uid===i.authorId?await pe(e):a&&await vt(e),window.history.back()}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(e,t)=>{try{(await bt(e,t)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),window.history.back()):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})});try{let e=await z(r,v.currentUser?.uid);j&&e&&(j.style.color=`var(--error-color)`);let t=await de(r,v.currentUser?.uid);N&&t&&(N.style.color=`#00BA7C`)}catch(e){console.error(`Error fetching initial like/reshare state`,e)}j&&j.addEventListener(`click`,async()=>{j.disabled=!0;try{let e=await le(r);e.liked?j.style.color=`var(--error-color)`:j.style.color=``,M&&(M.textContent=e.likes)}catch(e){console.error(e)}finally{j.disabled=!1}}),N&&N.addEventListener(`click`,async()=>{N.disabled=!0;try{let e=await ue(r);e.reshared?N.style.color=`#00BA7C`:N.style.color=``,F&&(F.textContent=e.reshares)}catch(e){console.error(e)}finally{N.disabled=!1}}),T.addEventListener(`input`,()=>{let e=T.value.trim(),t=(e?e.split(/\s+/):[]).length;E.textContent=`${t} / ${X.REPLY_MAX_WORDS}`,t>X.REPLY_MAX_WORDS?(E.style.color=`var(--error-color)`,O.disabled=!0):t===0?(E.style.color=`var(--text-secondary)`,O.disabled=!0):(E.style.color=`var(--accent-primary)`,O.disabled=!1)}),O.addEventListener(`click`,async()=>{let e=T.value.trim(),t=e.replace(/\s/g,``);if(t.length>0&&t.length<=189){O.disabled=!0,O.textContent=`Replying...`;try{await Qt(r,e),T.value=``,T.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(`Failed to submit reply. Please try again.`)}finally{O.textContent=`Reply`}}}),pn&&pn(),pn=en(i.postId,async e=>{if(!k)return;if(e.length===0){k.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <p style="font-size: 14px;">No replies yet. Be the first classmate to reply!</p>
        </div>
      `;return}let n=new Map,r=[];for(let t of e)t.children=[],n.set(t.replyId,t);for(let t of e)t.parentReply&&n.has(t.parentReply)?n.get(t.parentReply).children.push(t):r.push(t);let a=``,o=async(e,n=0)=>{let r=``;for(let i of e){let e=await L(i.authorId),a=t?await nn(i.replyId):!1,s,l,u,d,f,p;if(c){let e=_(i.authorId);s=y(e),l=`Anonymous ${e}`,u=`anonymous_${e}`,d=!1,f=!1,p=`'Inter', sans-serif`}else s=V(e,38,`border: 1px solid var(--border-color);`),l=e?.name?P(e.name):`Student`,u=e?.username?P(e.username):`student`,d=e?.isTeacher||e?.role===`teacher`,f=e?.verifiedStudent||e?.role===`staff`||e?.role===`admin`||d,p=q(e);let m=n>0?`${Math.min(n*32,64)}px`:`0px`,h=n>0?`border-left: 2px solid var(--border-color); border-bottom: none;`:`border-bottom: 1px solid var(--border-color);`;r+=`
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
                  <span class="time-ago" data-timestamp="${i.timestamp}" style="font-size: 13px; color: var(--text-secondary);">${B(i.timestamp)}</span>
                  ${i.edited?`<span style="font-size: 11px; color: var(--text-secondary); margin-left: 4px; font-style: italic;">(edited)</span>`:``}
                </div>
              </div>

              <div class="reply-content-box" style="font-size: 15px; color: var(--text-primary); line-height: 1.4; font-family: ${p};">
                ${ee(i.content)}
              </div>

              <div style="display: flex; gap: 16px; margin-top: 8px;">
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
        `,i.children.length>0&&(r+=await o(i.children,n+1))}return r};a=await o(r),k.innerHTML=a,k.querySelectorAll(`.inline-reply-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.replyId,n=document.getElementById(`composer-for-${t}`);n&&(n.style.display=n.style.display===`none`?`block`:`none`,n.style.display===`block`&&n.querySelector(`.inline-reply-input`).focus())})}),k.querySelectorAll(`.submit-inline-reply-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId,n=document.getElementById(`composer-for-${t}`),r=n.querySelector(`.inline-reply-input`),a=r.value.trim();if(a){e.disabled=!0,e.textContent=`...`;try{let{createReply:e}=await H(async()=>{let{createReply:e}=await Promise.resolve().then(()=>Xt);return{createReply:e}},void 0,import.meta.url);await e(i.postId,a,t),r.value=``,n.style.display=`none`}catch(e){console.error(e),alert(`Failed to send reply.`)}finally{e.disabled=!1,e.textContent=`Send`}}})}),k.querySelectorAll(`.inline-edit-reply-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId,n=e.closest(`.reply-item-container`).querySelector(`.reply-content-box`);if(!n)return;let r=n.innerText,a=await A(`Edit your reply:`,r,``,null,null,189);if(a!==null&&a.trim()!==r.trim())try{let{editReply:e}=await H(async()=>{let{editReply:e}=await Promise.resolve().then(()=>Xt);return{editReply:e}},void 0,import.meta.url);await e(i.postId,t,a)}catch(e){console.error(e),alert(e.message||`Failed to edit reply.`)}})}),k.querySelectorAll(`.inline-save-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.replyId;e.disabled=!0;try{await rn(i.postId,t)?(e.classList.add(`saved`),e.style.color=`var(--accent-primary)`):(e.classList.remove(`saved`),e.style.color=`var(--text-secondary)`)}catch(e){console.error(e),alert(e.message||`Failed to save reply.`)}finally{e.disabled=!1}})})});let te=_e(r,e=>{if(!e)return;let t=document.getElementById(`post-detail-content`);t&&(t.innerHTML=ee(e.content));let n=document.getElementById(`post-likes-stat`);n&&(n.textContent=e.likes||0);let r=document.getElementById(`post-reshare-stat`);r&&(r.textContent=e.reshares||0);let i=document.getElementById(`post-reply-stat`);i&&(i.textContent=e.replyCount||0)});return()=>{C&&C(),te&&te(),pn&&=(pn(),null)}}function hn(e,t){e.innerHTML=W(`
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
  `,D.HOME);let n=G();return()=>{n&&n()}}function gn(e){e.innerHTML=W(`
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
  `,`#/search`);let t=G(),n=document.getElementById(`dedicated-search-input`),r=document.getElementById(`dedicated-search-results`);return n.addEventListener(`input`,async()=>{let e=n.value,t=e.trim().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3){r.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">person_search</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">Search Campus</h3>
          <p style="font-size: 14px;">Type at least 3 characters to start filtering.</p>
        </div>
      `;return}r.innerHTML=`<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Searching campus database...</div>`;try{let n=await Ne(e);if(n.length===0){r.innerHTML=`
          <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
            <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">no_accounts</span>
            <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No results found</h3>
            <p style="font-size: 14px;">No student or staff found matching "${P(t)}".</p>
          </div>
        `;return}let i=``;for(let e of n){let t=await Be(e.uid),n=e.name?e.name.charAt(0).toUpperCase():`?`;i+=`
          <div class="card fade-in" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; margin-bottom: 12px; border-radius: var(--border-radius);">
            <div style="display: flex; align-items: center; gap: 14px; cursor: pointer;" class="user-profile-link" data-username="${P(e.username)}">
              <div class="avatar" style="width: 44px; height: 44px;">${n}</div>
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${P(e.name)}</span>
                <span style="font-size: 14px; color: var(--text-secondary);">@${P(e.username)} · Class ${P(e.class||`N/A`)} · Adm ${P(e.admissionNumber||`N/A`)}</span>
              </div>
            </div>

            <button class="btn ${t?`btn-outline`:``} friend-action-btn" data-uid="${e.uid}">
              ${t?`Friends`:`+ Add Friend`}
            </button>
          </div>
        `}r.innerHTML=i,r.querySelectorAll(`.user-profile-link`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`#/profile?u=${e.dataset.username}`})}),r.querySelectorAll(`.friend-action-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.uid;e.disabled=!0;try{let t=await He(n);e.textContent=t?`Friends`:`+ Add Friend`,e.className=`btn ${t?`btn-outline`:``} friend-action-btn`}catch(e){console.error(e)}finally{e.disabled=!1}})})}catch(e){console.error(e),r.innerHTML=`<div style="padding: 20px; text-align: center; color: var(--error-color);">Failed to search campus.</div>`}}),()=>{t&&t()}}async function _n(e){let t=v.currentUser;if(!t){window.location.hash=D.HOME;return}let n=await L(t.uid)||{};e.innerHTML=`
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
          <input class="input-field" type="text" id="onboard-name" value="${t.displayName||n.name||``}" placeholder="Full Name" required />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Choose Username</label>
          <input class="input-field" type="text" id="onboard-username" value="${n.username||t.email?.split(`@`)[0]||``}" placeholder="Username (e.g. shashwat.gupta)" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label id="label-admission" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Admission No.</label>
              <input class="input-field" type="text" id="onboard-admission" value="${n.admissionNumber&&n.admissionNumber!==`N/A`?n.admissionNumber:``}" placeholder="e.g. 10420" required />
            </div>
            
            <div style="flex: 1;">
              <label id="label-class" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Class & Sec</label>
              <input class="input-field" type="text" id="onboard-class" value="${n.class&&n.class!==`N/A`?n.class:``}" placeholder="e.g. 12A" required />
            </div>
          </div>

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Mobile Number</label>
          <input class="input-field" type="tel" id="onboard-mobile" value="${n.mobile||``}" placeholder="Mobile Number" required />

          <div id="onboard-error" class="error-text" style="display: none; margin-top: 4px;"></div>

          <button type="submit" id="onboard-submit-btn" class="btn" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; margin-top: 8px; box-shadow: 0 4px 14px rgba(29, 155, 240, 0.3);">
            Complete & Enter Backbench
          </button>
        </form>
      </div>
    </div>
  `;let r=document.getElementById(`onboarding-form`),a=document.getElementById(`onboard-error`),o=document.getElementById(`onboard-submit-btn`),s=document.getElementById(`onboard-student-btn`),c=document.getElementById(`onboard-teacher-btn`),l=document.getElementById(`onboard-name`),u=document.getElementById(`onboard-admission`),d=document.getElementById(`onboard-class`),f=document.getElementById(`label-admission`),m=document.getElementById(`label-class`),h=n.role===`teacher`?`teacher`:`student`,g=e=>{h=e,e===`teacher`?(c.className=`btn`,c.style.background=`#00BA7C`,s.className=`btn btn-outline`,s.style.background=`transparent`,f.textContent=`Teacher / Employee ID`,u.placeholder=`e.g. T-104`,m.textContent=`Department`,d.placeholder=`e.g. Computer Science`,l.placeholder=`Official Faculty Name (e.g. Dr. Sharma)`):(s.className=`btn`,s.style.background=`var(--accent-primary)`,c.className=`btn btn-outline`,c.style.background=`transparent`,f.textContent=`Admission No.`,u.placeholder=`e.g. 10420`,m.textContent=`Class & Sec`,d.placeholder=`e.g. 12A`,l.placeholder=`Full Name`)};n.role===`teacher`&&g(`teacher`),s.addEventListener(`click`,()=>g(`student`)),c.addEventListener(`click`,()=>g(`teacher`)),r.addEventListener(`submit`,async e=>{e.preventDefault(),a.style.display=`none`;let r=l.value.trim(),s=document.getElementById(`onboard-username`).value.trim(),c=u.value.trim(),f=d.value.trim(),m=document.getElementById(`onboard-mobile`).value.trim();if(!Ut(s)){a.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,a.style.display=`block`;return}if(!c){a.textContent=h===`teacher`?`Employee / Teacher ID is required.`:`Admission Number is required.`,a.style.display=`block`;return}if(!f){a.textContent=h===`teacher`?`Department is required.`:`Class & Section is required.`,a.style.display=`block`;return}o.disabled=!0,o.textContent=`Saving Profile...`;try{await x(i(p,`${w.USERS}/${t.uid}`),{name:r,username:s,admissionNumber:c,class:f,mobile:m,isTeacher:h===`teacher`,role:h===`teacher`?`teacher`:n.role===`admin`?`admin`:`student`}),R(t.uid),window.location.hash=D.HOME}catch(e){console.error(e),a.textContent=e.message||`Failed to save profile details.`,a.style.display=`block`,o.disabled=!1,o.textContent=`Complete & Enter Backbench`}})}var vn=null;function yn(e){if(!e)return;let t=e.closest(`.feed-item-wrapper`)||e;t.style.transition=`opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s`,t.style.overflow=`hidden`,t.style.maxHeight=t.offsetHeight+`px`,t.offsetHeight,t.style.opacity=`0`,t.style.transform=`scale(0.95)`,t.style.maxHeight=`0px`,t.style.marginTop=`0px`,t.style.marginBottom=`0px`,t.style.paddingTop=`0px`,t.style.paddingBottom=`0px`,setTimeout(()=>t.remove(),450)}function bn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
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
      ${K(3)}
    </div>
  `,D.PETITIONS);let t=G(),n=document.getElementById(`create-petition-form`),r=document.getElementById(`petition-error`),i=document.getElementById(`submit-petition-btn`),a=document.getElementById(`petitions-feed-container`);return n.addEventListener(`submit`,async e=>{e.preventDefault(),r.style.display=`none`;let t=document.getElementById(`petition-title`).value.trim(),a=document.getElementById(`petition-category`).value,o=document.getElementById(`petition-goal`).value,s=document.getElementById(`petition-recipient`).value.trim(),c=document.getElementById(`petition-statement`).value.trim(),l=document.getElementById(`petition-anonymous-checkbox`).checked;i.disabled=!0,i.textContent=`Publishing...`;try{await jt({title:t,category:a,goalSignatures:o,targetRecipient:s,statement:c,isAnonymous:l}),n.reset(),document.getElementById(`petition-recipient`).value=`St. Joseph's College Administration`,document.getElementById(`petition-anonymous-checkbox`).checked=!1}catch(e){r.textContent=e.message||`Failed to create petition.`,r.style.display=`block`}finally{i.disabled=!1,i.textContent=`Launch Petition`}}),vn&&vn(),vn=Mt(20,async e=>{if(e.length===0){a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active petitions</h3>
          <p style="font-size: 14px;">Launch the first campus petition above to champion student causes!</p>
        </div>
      `;return}let t=v.currentUser.uid,n=``;try{for(let r of e){let e=await L(r.creatorId),i=await Pt(r.petitionId,t);n+=Ot(r,e,i)}a.innerHTML=n}catch(e){console.error(`Error rendering petitions feed:`,e),a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--error-color);">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px;">error_outline</span>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Failed to load petitions</h3>
          <p style="font-size: 14px; color: var(--text-secondary);">${P(e.message)}</p>
        </div>
      `;return}a.querySelectorAll(`.petition-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.sign-petition-feed-btn`)&&!t.target.closest(`.view-imprint-btn`)&&!t.target.closest(`.copy-petition-frame-btn`)&&!t.target.closest(`a`)){let t=e.dataset.petitionId;window.location.hash=`#/petition-frame?id=${t}`}})}),a.querySelectorAll(`.copy-petition-frame-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.petitionId,r=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${n}`;navigator.clipboard.writeText(r).then(()=>{let t=e.innerHTML;e.textContent=`✓ Copied!`,setTimeout(()=>{e.innerHTML=t},2e3)})})}),a.querySelectorAll(`.sign-petition-feed-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.petitionId;e.disabled=!0,e.textContent=`Signing...`;try{await Ft(n),e.textContent=`✓ Signed`}catch(t){alert(t.message||`Failed to sign petition.`),e.disabled=!1,e.textContent=`✍️ Sign`}})}),a.querySelectorAll(`.petition-options-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.petitionId,i=e.dataset.authorId,a=await L(t),o=a?.role===`staff`||a?.role===`admin`;Y(e,{itemId:r,authorId:i,currentUid:t,isStaff:o,itemType:`petition`,onDelete:async n=>{try{t===i?await Lt(n):o&&await yt(n),yn(e.closest(`.petition-card`))}catch(e){alert(e.message||`Failed to delete petition.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}),()=>{t&&t(),vn&&=(vn(),null)}}async function xn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Petition Imprint</h1>
      </div>
    </header>
    ${K(2)}
  `,D.PETITIONS);let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){Sn(e,`No petition ID specified.`);return}let r=await Nt(n);if(!r){Sn(e,`This campus petition does not exist.`);return}let i=await L(r.creatorId),a=v.currentUser.uid,o=await Pt(r.petitionId,a);await It(r.petitionId);let s=r.signatureCount||0,c=r.goalSignatures||100,l=Math.min(100,Math.round(s/c*100)),u=s>=c,d=r.isAnonymous===!0,f=d?`Anonymous Student`:i?.name?P(i.name):`Student Representative`,p=d?`anonymous`:i?.username?P(i.username):`student`,m=new Date(r.timestamp||Date.now()).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`});e.innerHTML=W(`
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
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px;">${P(r.category)}</span>
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px; background: ${u?`rgba(0, 186, 124, 0.2)`:`rgba(29, 155, 240, 0.15)`}; color: ${u?`#00BA7C`:`var(--accent-primary)`}; border-color: ${u?`#00BA7C`:`var(--accent-primary)`};">
              ${u?`🎉 GOAL ACHIEVED`:`ACTIVE PETITION`}
            </span>
          </div>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); display: flex; flex-wrap: wrap; gap: 20px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <div><strong style="color: var(--text-primary);">Target Recipient:</strong> ${P(r.targetRecipient)}</div>
          <div><strong style="color: var(--text-primary);">Date Submitted:</strong> ${m}</div>
          <div><strong style="color: var(--text-primary);">Document ID:</strong> ${P(r.petitionId)}</div>
        </div>
      </div>

      <!-- Main Petition Title & Progress -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--text-primary); line-height: 1.35; margin-bottom: 12px;">
          ${P(r.title)}
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
            ${P(r.statement)}
          </div>
        </div>


      </div>
    </div>
  `,D.PETITIONS);let h=G(),g=document.getElementById(`print-petition-btn`),_=document.getElementById(`copy-detail-frame-link-btn`),y=document.getElementById(`sign-petition-btn`),b=document.getElementById(`signature-count-display`),x=document.getElementById(`signature-progress-fill`);_&&_.addEventListener(`click`,()=>{let e=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${r.petitionId}`;navigator.clipboard.writeText(e).then(()=>{_.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{_.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span> Copy Frame Link`},2e3)})}),g&&g.addEventListener(`click`,()=>{window.print()}),y&&y.addEventListener(`click`,async()=>{y.disabled=!0,y.textContent=`Recording Signature...`;try{let e=await Ft(r.petitionId);if(y.textContent=`✓ You Have Signed This Petition`,b&&(b.textContent=e.signatureCount),x){let t=Math.min(100,Math.round(e.signatureCount/c*100));x.style.width=`${t}%`}}catch(e){console.error(e),alert(e.message||`Failed to sign petition.`),y.disabled=!1,y.textContent=`✍️ Sign This Petition`}});let S=Rt(n,e=>{if(!e)return;let t=e.signatureCount||0,n=e.goalSignatures||100,r=Math.min(100,Math.round(t/n*100)),i=document.getElementById(`signature-count-display`),a=document.getElementById(`signature-progress-fill`);i&&(i.textContent=t),a&&(a.style.width=`${r}%`)});return()=>{h&&h(),S&&S()}}function Sn(e,t){e.innerHTML=W(`
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
  `,D.PETITIONS);let n=G();return()=>{n&&n()}}async function Cn(e){let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){wn(e,`No petition ID specified in frame URL.`);return}e.innerHTML=`
    <div style="min-height: 100vh; background: #0f1115; color: #f7f9f9; padding: 20px 12px; font-family: var(--font-family);">
      <div style="max-width: 800px; margin: 0 auto;">
        ${K(3)}
      </div>
    </div>
  `;let r=await Nt(n);if(!r){wn(e,`This campus petition frame could not be found.`);return}let i=await L(r.creatorId),a=v.currentUser,o=a?await Pt(r.petitionId,a.uid):!1;await It(r.petitionId);let s=r.signatureCount||0,c=r.goalSignatures||100,l=Math.min(100,Math.round(s/c*100)),u=s>=c,d=r.isAnonymous===!0,f=d?`Anonymous Student`:i?.name?P(i.name):`Student Representative`,p=d?`anonymous`:i?.username?P(i.username):`student`,m=new Date(r.timestamp||Date.now()).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}),h=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${r.petitionId}`;e.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #111827; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Navigation & Action Header -->
      <div style="max-width: 840px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336; color: #f7f9f9;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${D.PETITIONS}" class="btn-ghost" title="Back to Backbench" style="color: #f7f9f9;">
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
            Document ID: ${P(r.petitionId)} • Category: ${P(r.category)}
          </div>
        </div>

        <!-- Petition Metadata Banner -->
        <div style="background: #F4EFE6; border: 1px solid #D8CBBC; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Target Authority</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${P(r.targetRecipient)}</div>
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
            "${P(r.title)}"
          </h2>
        </div>

        <!-- Formal Statement of Demand -->
        <div style="background: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #1E3A8A; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
          <h3 style="font-size: 13px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Declaration & Student Demand Statement
          </h3>
          <div style="font-size: 16px; line-height: 1.7; color: #1F2937; font-family: serif; white-space: pre-line; word-break: break-word;">
            ${P(r.statement)}
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
  `;let g=document.getElementById(`copy-petition-frame-link-btn`),_=document.getElementById(`frame-sign-btn`),y=document.getElementById(`frame-count-display`),b=document.getElementById(`frame-progress-fill`);g&&g.addEventListener(`click`,()=>{navigator.clipboard.writeText(h).then(()=>{g.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{g.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Frame Link`},2e3)})}),_&&_.addEventListener(`click`,async()=>{_.disabled=!0,_.textContent=`Recording Signature...`;try{let t=await Ft(r.petitionId);if(_.textContent=`✓ Official Signature Recorded`,y&&(y.textContent=t.signatureCount),b){let e=Math.min(100,Math.round(t.signatureCount/c*100));b.style.width=`${e}%`}setTimeout(()=>Cn(e),800)}catch(e){alert(e.message||`Failed to record signature.`),_.disabled=!1,_.textContent=`✍️ Sign This Official Petition Paper`}})}function wn(e,t){e.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
      <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">gavel</span>
      <h1 style="font-size: 24px; font-weight: 800;">Petition Frame Not Found</h1>
      <p style="color: var(--text-secondary); margin-top: 8px;">${t}</p>
      <a href="${D.PETITIONS}" class="btn" style="display: inline-block; margin-top: 24px;">Return to Petitions</a>
    </div>
  `}async function Tn(e){let t=window.location.hash,n=null;t.includes(`?u=`)&&(n=t.split(`?u=`)[1]?.replace(/^[@\-\s]+/,``)),n||=v.currentUser?.displayName||`student`;let r=null;try{let e=await h(i(p,w.USERS));if(e.exists()){let t=e.val();for(let e in t){let i=t[e];if(i.username&&i.username.toLowerCase()===n.toLowerCase()){r=i;break}}}}catch(e){console.error(e)}if(!r){e.innerHTML=`
      <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
        <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">person_off</span>
        <h1 style="font-size: 24px; font-weight: 800;">Student Profile Frame Not Found</h1>
        <p style="color: var(--text-secondary); margin-top: 8px;">The account @${P(n)} could not be loaded.</p>
      </div>
    `;return}let a=v.currentUser?.uid,o=a===r.uid,s=await We(r.uid),c=a&&!o?await Be(r.uid):!1,l=q(r),u=V(r,96,`border: 4px solid #16181c; box-shadow: 0 8px 24px rgba(0,0,0,0.5);`),d=r.name?P(r.name):`Anonymous Student`,f=r.username?P(r.username):`student`,m=r.isTeacher||r.role===`teacher`,g=r.verifiedStudent||r.role===`staff`||r.role===`admin`||m,_=`${window.location.origin}${window.location.pathname}#/profile-frame?u=${f}`;e.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Action Bar -->
      <div style="max-width: 680px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${D.PROFILE}?u=${f}" class="btn-ghost" title="Open Full Profile" style="color: #f7f9f9;">
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
            ${u}

            ${a&&!o?`
              <button id="frame-friend-btn" class="btn ${c?`btn-outline`:``}" style="font-weight: 700; font-size: 13px; padding: 8px 18px;">
                ${c?`✓ Friends`:`+ Add Friend`}
              </button>
            `:``}
          </div>

          <!-- User Name & Badges -->
          <div style="margin-bottom: 16px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #f7f9f9; font-family: ${l}; display: flex; align-items: center; gap: 8px;">
              ${d}
              ${m?`
                <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
                </span>
              `:g?`
                <span class="material-symbols-outlined verified-icon" style="font-size: 22px;">verified</span>
              `:``}
            </h1>
            <div style="color: var(--text-secondary); font-size: 15px; font-weight: 500;">@${f}</div>
          </div>

          <!-- Bio / Motto Box -->
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; font-size: 14px; color: var(--text-primary); line-height: 1.5;">
            ${P(r.bio||`SJC Backbench Student Account`)}
          </div>

          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #202327; border-radius: 14px; padding: 16px; text-align: center; margin-bottom: 24px; border: 1px solid var(--border-color);">
            <div>
              <div style="font-size: 20px; font-weight: 800; color: var(--accent-primary);">${s}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Classmates</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #00BA7C;">${P(r.department||r.course||`SJC`)}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Dept / Stream</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #F4511E;">Verified</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Status</div>
            </div>
          </div>

          <!-- Direct Link to Full Backbench Account -->
          <div style="display: flex; gap: 12px;">
            <a href="${D.PROFILE}?u=${f}" class="btn" style="flex: 1; text-align: center; font-weight: 700; text-decoration: none;">
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
  `;let y=document.getElementById(`copy-profile-frame-link-btn`),b=document.getElementById(`frame-friend-btn`);y&&y.addEventListener(`click`,()=>{navigator.clipboard.writeText(_).then(()=>{y.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{y.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Account Frame Link`},2e3)})}),b&&b.addEventListener(`click`,async()=>{b.disabled=!0;try{let e=await He(r.uid);b.textContent=e?`✓ Friends`:`+ Add Friend`,b.className=`btn ${e?`btn-outline`:``}`}catch(e){alert(e.message||`Failed to update friend status`)}finally{b.disabled=!1}})}var En=null;function Dn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
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
      ${K(3)}
    </div>
  `,D.POLLS);let t=G(),n=document.getElementById(`poll-question`),r=document.getElementById(`poll-options-inputs`),i=document.getElementById(`add-option-btn`),a=document.getElementById(`submit-poll-btn`),o=document.getElementById(`poll-error`),s=document.getElementById(`polls-feed-container`);return i.addEventListener(`click`,()=>{let e=r.querySelectorAll(`.poll-opt-input`);if(e.length<13){let t=e.length+1,n=document.createElement(`input`);n.type=`text`,n.className=`input-field poll-opt-input fade-in`,n.placeholder=`Option ${t}`,n.style.marginBottom=`0`,r.appendChild(n),e.length+1===13&&(i.style.display=`none`)}}),a.addEventListener(`click`,async()=>{o.style.display=`none`;let e=n.value.trim(),t=r.querySelectorAll(`.poll-opt-input`),s=Array.from(t).map(e=>e.value.trim()),c=document.getElementById(`dedicated-poll-anonymous-checkbox`).checked;a.disabled=!0,a.textContent=`Publishing...`;try{await et(e,s,c),n.value=``,document.getElementById(`dedicated-poll-anonymous-checkbox`).checked=!1,r.innerHTML=`
        <input type="text" class="input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 0;" />
        <input type="text" class="input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 0;" />
      `,i.style.display=`inline-block`}catch(e){o.textContent=e.message,o.style.display=`block`}finally{a.disabled=!1,a.textContent=`Publish Poll`}}),En&&En(),En=rt(20,async e=>{if(e.length===0){s.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">poll</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active polls</h3>
          <p style="font-size: 14px;">Create the first poll above to gather student opinions!</p>
        </div>
      `;return}let t=``,n=v.currentUser.uid;for(let r of e){let e=await L(r.creatorId),i=await tt(r.pollId,n);t+=Dt(r,e,i)}s.innerHTML=t,s.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.pollId,r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await nt(n,r)}catch(e){alert(e.message||`Failed to record vote`)}})})}),()=>{t&&t(),En&&=(En(),null)}}var On=null;async function kn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>
    ${K(2)}
  `,D.POLLS);let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){An(e,`No poll ID specified.`);return}let r=await ft(n);if(!r){An(e,`This campus poll does not exist or has been deleted.`);return}let i=await L(r.creatorId),a=v.currentUser.uid,o=await tt(r.pollId,a),s=await at(r.pollId,a),c=await st(r.pollId,a),l=v.currentUser,u=V(l.photoURL||``,40),d=r.isAnonymous===!0,f=new Map;f.set(r.creatorId,1);let p=2;function m(e){return f.has(e)||f.set(e,p++),f.get(e)}function h(e,t=36){let n=[`linear-gradient(135deg, #6366f1, #8b5cf6)`,`linear-gradient(135deg, #f97316, #ef4444)`,`linear-gradient(135deg, #14b8a6, #06b6d4)`,`linear-gradient(135deg, #ec4899, #f43f5e)`,`linear-gradient(135deg, #eab308, #f97316)`,`linear-gradient(135deg, #22c55e, #10b981)`,`linear-gradient(135deg, #3b82f6, #6366f1)`,`linear-gradient(135deg, #a855f7, #ec4899)`],r=n[(e-1)%n.length];return`<div class="avatar" style="width: ${t}px; height: ${t}px; font-size: ${Math.round(t*.38)}px; background: ${r}; font-weight: 800;">A${e}</div>`}e.innerHTML=W(`
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
      ${Dt(r,i,o,s,c)}
    </div>

    <!-- Reply Composer -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;" class="fade-in">
      ${u}
      <div style="flex: 1; min-width: 0;">
        <textarea id="poll-reply-input" class="input-field" placeholder="Post your reply to this poll..." rows="2" style="resize: none; font-size: 15px; border: none; background: transparent; padding: 0; outline: none; box-shadow: none;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <span id="poll-reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${X.REPLY_MAX_WORDS}</span>
          <button id="submit-poll-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Poll Replies Feed Container -->
    <div id="poll-replies-container" style="padding: 16px;">
      ${K(2)}
    </div>
  `,D.POLLS);let g=G(),_=document.getElementById(`poll-reply-input`),y=document.getElementById(`poll-reply-char-counter`),b=document.getElementById(`submit-poll-reply-btn`),x=document.getElementById(`poll-replies-container`);function S(e,t){e.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await nt(t.pollId,r)}catch(t){alert(t.message||`Failed to record vote.`),e.disabled=!1}})});let n=e.querySelector(`.poll-like-btn`);n&&n.addEventListener(`click`,async e=>{e.stopPropagation(),n.disabled=!0;try{let e=await it(t.pollId);e.liked?n.classList.add(`liked`,`heart-pop`):n.classList.remove(`liked`,`heart-pop`);let r=n.querySelector(`.poll-like-count`);r&&(r.textContent=e.likes)}catch(e){console.error(e)}finally{n.disabled=!1}});let r=e.querySelector(`.poll-reshare-btn`);r&&r.addEventListener(`click`,async e=>{e.stopPropagation(),r.disabled=!0;try{let e=await ot(t.pollId);e.reshared?(r.classList.add(`reshared`),r.style.color=`#00BA7C`):(r.classList.remove(`reshared`),r.style.color=``);let n=r.querySelector(`.poll-reshare-count`);n&&(n.textContent=e.reshares)}catch(e){console.error(e)}finally{r.disabled=!1}});let i=e.querySelector(`.poll-options-btn`);i&&i.addEventListener(`click`,async e=>{e.stopPropagation();let n=await L(a),r=n?.role===`staff`||n?.role===`admin`;Y(i,{itemId:t.pollId,authorId:t.creatorId,currentUid:a,isStaff:r,itemType:`poll`,onDelete:async e=>{try{a===t.creatorId?await ut(e):r&&await dt(e),window.history.back()}catch(e){alert(e.message||`Failed to delete poll.`)}},onReport:async(e,t)=>{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}})})}_.addEventListener(`input`,()=>{let e=_.value.trim(),t=(e?e.split(/\s+/):[]).length;y.textContent=`${t} / ${X.REPLY_MAX_WORDS}`,t>X.REPLY_MAX_WORDS?(y.style.color=`var(--error-color)`,b.disabled=!0):t===0?(y.style.color=`var(--text-secondary)`,b.disabled=!0):(y.style.color=`var(--accent-primary)`,b.disabled=!1)}),b.addEventListener(`click`,async()=>{let e=_.value.trim(),t=e.replace(/\s/g,``);if(t.length>0&&t.length<=189){b.disabled=!0,b.textContent=`Replying...`;try{await ct(r.pollId,e),_.value=``,_.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(e.message||`Failed to submit reply.`)}finally{b.textContent=`Reply`}}}),On&&On(),On=lt(r.pollId,async e=>{if(!x)return;if(e.length===0){x.innerHTML=`
        <div style="padding: 30px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 36px; color: var(--text-muted); margin-bottom: 8px;">chat_bubble_outline</span>
          <div style="font-size: 14px; font-weight: 600;">No replies yet</div>
          <div style="font-size: 13px; margin-top: 2px;">Be the first student to share your thoughts on this poll!</div>
        </div>
      `;return}let t=``;for(let n of e){let e=await L(n.authorId),r,i,a,o;if(d){let e=m(n.authorId);r=h(e),i=`Anonymous ${e}`,a=`anonymous_${e}`,o=`'Inter', sans-serif`}else r=V(e,36),i=e?.name?P(e.name):`Student`,a=e?.username?P(e.username):`student`,o=q(e);t+=`
        <div class="card fade-in" style="padding: 14px; margin-bottom: 10px; border-radius: 12px; display: flex; gap: 10px;">
          ${r}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 14px; font-family: ${o}; color: var(--text-primary);">${i}</span>
                <span style="font-size: 13px; color: var(--text-secondary);">@${a}</span>
              </div>
              <span class="time-ago" data-timestamp="${n.timestamp}" style="font-size: 12px; color: var(--text-secondary);">${B(n.timestamp)}</span>
            </div>
            <div style="font-size: 14px; line-height: 1.45; color: var(--text-primary); font-family: ${o};">
              ${P(n.content)}
            </div>
          </div>
        </div>
      `}x.innerHTML=t});let C=pt(n,async e=>{if(!e)return;let t=document.getElementById(`poll-card-wrapper`);if(t){let r=await tt(n,a),o=await at(n,a),s=await st(n,a);t.innerHTML=Dt(e,i,r,o,s),S(t,e)}}),w=document.getElementById(`poll-card-wrapper`);return w&&S(w,r),()=>{g&&g(),C&&C(),On&&=(On(),null)}}function An(e,t){e.innerHTML=W(`
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
  `,D.POLLS);let n=G();return()=>{n&&n()}}var jn=null;async function Mn(e){if(!v.currentUser){window.location.hash=`#/login`;return}let t=v.currentUser,n=await L(t.uid),r=n?.role===`staff`||n?.role===`admin`,i=``;r&&(i=`
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
    `),e.innerHTML=W(`
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Official Announcements</h1>
    </header>

    ${i}

    <!-- Active Announcements Feed -->
    <div id="announcements-feed-container" style="padding: 16px;">
      ${K(3)}
    </div>
  `,D.ANNOUNCEMENTS);let a=G(),o=document.getElementById(`create-announcement-form`),s=document.getElementById(`announcement-error`),c=document.getElementById(`submit-announcement-btn`),l=document.getElementById(`announcements-feed-container`);return o&&o.addEventListener(`submit`,async e=>{e.preventDefault(),s.style.display=`none`;let t=document.getElementById(`announcement-title`).value.trim(),n=document.getElementById(`announcement-severity`).value,r=document.getElementById(`announcement-content`).value.trim();c.disabled=!0,c.textContent=`Publishing...`;try{await Ke({title:t,content:r,severity:n}),o.reset()}catch(e){s.textContent=e.message||`Failed to create announcement.`,s.style.display=`block`}finally{c.disabled=!1,c.textContent=`Publish`}}),jn&&jn(),jn=Je(30,async e=>{if(!l)return;if(e.length===0){l.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No Announcements</h3>
          <p style="font-size: 14px;">There are no official campus announcements at this time.</p>
        </div>
      `;return}let n=``;try{for(let t of e){let e=await L(t.authorId),i=e?.name?P(e.name):`Staff`,a=V(e,36,`border: 1px solid var(--border-color);`),o=`var(--accent-primary)`,s=`rgba(29, 155, 240, 0.1)`,c=`info`;t.severity===`warning`?(o=`#F59E0B`,s=`rgba(245, 158, 11, 0.1)`,c=`warning`):t.severity===`alert`&&(o=`var(--error-color)`,s=`rgba(244, 33, 46, 0.1)`,c=`error`),n+=`
          <div class="card fade-in" style="margin-bottom: 16px; padding: 16px; border-radius: var(--border-radius); border-left: 4px solid ${o};" data-id="${t.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="material-symbols-outlined" style="color: ${o}; font-size: 20px;">${c}</span>
                <span class="brand-badge" style="font-size: 11px; color: ${o}; background: ${s}; border-color: ${o}; text-transform: uppercase;">${t.severity}</span>
                <span class="time-ago" data-timestamp="${t.timestamp}" style="font-size: 13px; color: var(--text-secondary);">${B(t.timestamp)}</span>
                ${t.edited?`<span style="font-size: 11px; color: var(--text-secondary); font-style: italic;">(edited)</span>`:``}
              </div>
              
              ${r?`
                <button class="btn-ghost announcement-options-btn" style="padding: 4px;" title="Options" data-id="${t.id}" data-author-id="${t.authorId}">
                  <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
                </button>
              `:``}
            </div>

            <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; line-height: 1.3;">
              ${P(t.title)}
            </h2>

            <div style="font-size: 15px; color: var(--text-primary); line-height: 1.5; margin-bottom: 16px;">
              ${ee(t.content)}
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
      `}r&&l.querySelectorAll(`.announcement-options-btn`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=e.dataset.id,i=e.dataset.authorId;Y(e,{itemId:r,authorId:i,currentUid:t.uid,isStaff:!0,itemType:`announcement`,onDelete:async t=>{try{await Ye(t);let n=e.closest(`.card`);n&&(n.style.opacity=`0.3`,n.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete announcement.`)}},onEdit:async t=>{let n=e.closest(`.card`),r=n.querySelector(`h2`),i=n.querySelector(`div[style*="line-height: 1.5; margin-bottom: 16px;"]`);if(!r||!i)return;let a=r.innerText,o=i.innerText,s=await A(`Edit title:`,a);if(s===null)return;let c=await A(`Edit content:`,o,``,500);if(c!==null&&(s.trim()!==a.trim()||c.trim()!==o.trim()))try{await qe(t,s,c)}catch(e){alert(e.message||`Failed to edit announcement.`)}}})})})}),()=>{a&&a(),jn&&=(jn(),null)}}async function Nn(t){let n=v.currentUser;if(!n)throw Error(`Not authenticated`);let{title:r,description:a,category:o,date:s,time:c,location:l,capacity:u}=t;if(!r||r.trim().length===0)throw Error(`Event title is required.`);if(!s||!c||!l)throw Error(`Event date, time, and venue location are required.`);let d=b(i(p,w.EVENTS)),f={eventId:d.key,creatorId:n.uid,title:r.trim(),description:a?.trim()||``,category:o||`General`,date:s,time:c,location:l.trim(),capacity:parseInt(u)||100,attendeeCount:0,timestamp:new Date().toISOString(),status:`UPCOMING`};return await e(d,f),f}function Pn(e=20,t){let r=C(i(p,w.EVENTS),n(`timestamp`),f(e)),a=c(r,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date((e.date||``)+` `+(e.time||``))-new Date((t.date||``)+` `+(t.time||``))),t(n)});return()=>l(r,`value`,a)}async function Fn(e){if(!e)return null;try{let t=await h(i(p,`${w.EVENTS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching event:`,e)}return null}async function In(e,t){if(!t||!e)return null;try{let n=await h(i(p,`eventRSVPs/${e}/${t}`));if(n.exists())return n.val().status}catch(e){console.error(`Error checking RSVP status:`,e)}return null}async function Ln(n,r=`attending`){let a=v.currentUser;if(!a)throw Error(`Not authenticated`);let o=i(p,`eventRSVPs/${n}/${a.uid}`),s=await h(o),c=await L(a.uid),l=!1,u=!1;s.exists()?s.val().status===r?(await S(o),u=!0):await e(o,{uid:a.uid,status:r,name:c?.name||a.displayName||`Student`,class:c?.class||`N/A`,timestamp:new Date().toISOString()}):(await e(o,{uid:a.uid,status:r,name:c?.name||a.displayName||`Student`,class:c?.class||`N/A`,timestamp:new Date().toISOString()}),l=!0);let d=i(p,`${w.EVENTS}/${n}`),f=0;return await t(d,e=>(e&&(l&&r===`attending`?e.attendeeCount=(e.attendeeCount||0)+1:u&&(e.attendeeCount=Math.max(0,(e.attendeeCount||0)-1)),f=e.attendeeCount),e)),{status:u?null:r,attendeeCount:f}}async function Rn(e){if(!e)return[];try{let t=await h(i(p,`eventRSVPs/${e}`));if(t.exists()){let e=t.val();return Object.values(e)}}catch(e){console.error(`Error fetching event attendees:`,e)}return[]}var zn=null;function Bn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
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
      ${K(3)}
    </div>
  `,D.EVENTS);let t=G(),n=document.getElementById(`create-event-form`),r=document.getElementById(`event-error`),i=document.getElementById(`submit-event-btn`),a=document.getElementById(`events-feed-container`),o=document.getElementById(`tab-all-events`),s=document.getElementById(`tab-my-events`),c=`all`,l=[];o.addEventListener(`click`,()=>{c=`all`,o.classList.add(`active`),s.classList.remove(`active`),d()}),s.addEventListener(`click`,()=>{c=`my`,s.classList.add(`active`),o.classList.remove(`active`),d()});let u=document.getElementById(`event-date`);u&&(u.value=new Date().toISOString().split(`T`)[0]),n.addEventListener(`submit`,async e=>{e.preventDefault(),r.style.display=`none`;let t=document.getElementById(`event-title`).value.trim(),a=document.getElementById(`event-category`).value,o=document.getElementById(`event-capacity`).value,s=document.getElementById(`event-date`).value,c=document.getElementById(`event-time`).value,l=document.getElementById(`event-location`).value.trim(),d=document.getElementById(`event-description`).value.trim();i.disabled=!0,i.textContent=`Publishing...`;try{await Nn({title:t,category:a,capacity:o,date:s,time:c,location:l,description:d}),n.reset(),u.value=new Date().toISOString().split(`T`)[0]}catch(e){r.textContent=e.message||`Failed to create event.`,r.style.display=`block`}finally{i.disabled=!1,i.textContent=`Publish Event`}});let d=async()=>{if(!a)return;let e=v.currentUser.uid,t=l;if(c===`my`){let n=[];for(let t of l){let r=await In(t.eventId,e);(r===`attending`||r===`interested`)&&n.push(t)}t=n}if(t.length===0){a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${c===`my`?`confirmation_number`:`event`}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${c===`my`?`No registered event passes`:`No upcoming campus events`}</h3>
          <p style="font-size: 14px;">${c===`my`?`RSVP to an upcoming event to save your ticket pass here!`:`Be the first student to publish an event above!`}</p>
        </div>
      `;return}let n=``;for(let r of t){let t=await L(r.creatorId),i=await In(r.eventId,e),a=t?.name?P(t.name):`SJC Host`,o=r.attendeeCount||0,s=r.capacity||100,c=Math.min(100,Math.round(o/s*100));n+=`
        <article class="card fade-in event-card" data-event-id="${r.eventId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="brand-badge" style="font-size: 11px;">${P(r.category)}</span>
            <span style="font-size: 12px; font-weight: 700; color: var(--accent-primary);">Hosted by ${a}</span>
          </div>

          <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; line-height: 1.3;">
            ${P(r.title)}
          </h2>

          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">calendar_month</span>
              <span>${P(r.date)} · ${P(r.time)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">location_on</span>
              <span>${P(r.location)}</span>
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
      `}a.innerHTML=n,a.querySelectorAll(`.event-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.event-rsvp-btn`)&&!t.target.closest(`.view-pass-btn`)){let t=e.dataset.eventId;window.location.hash=`#/event?id=${t}`}})}),a.querySelectorAll(`.event-rsvp-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.eventId;e.disabled=!0;try{let t=await Ln(n,`attending`);e.textContent=t.status===`attending`?`✓ Going`:`🎟️ RSVP Going`,e.className=`btn ${t.status===`attending`?``:`btn-outline`} event-rsvp-btn`}catch(e){alert(e.message||`Failed to update RSVP`)}finally{e.disabled=!1}})})};return zn&&zn(),zn=Pn(50,e=>{l=e,d()}),()=>{t&&t(),zn&&=(zn(),null)}}async function Vn(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Event Ticket Pass</h1>
      </div>
    </header>
    ${K(2)}
  `,D.EVENTS);let t=window.location.hash,n=null;if(t.includes(`?id=`)&&(n=t.split(`?id=`)[1]),!n){Hn(e,`No event specified.`);return}let r=await Fn(n);if(!r){Hn(e,`This campus event does not exist or has been cancelled.`);return}let i=await L(r.creatorId),a=v.currentUser.uid,o=await In(r.eventId,a),s=await Rn(r.eventId),c=r.attendeeCount||0,l=r.capacity||100,u=Math.min(100,Math.round(c/l*100)),d=c>=l,f=i?.name?P(i.name):`SJC Event Host`,p=i?.username?P(i.username):`student`;e.innerHTML=W(`
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
              ${P(r.category)}
            </span>
            <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 9999px;">
              ST. JOSEPH'S COLLEGE OFFICIAL PASS
            </span>
          </div>

          <h1 style="font-size: 24px; font-weight: 800; line-height: 1.3; margin-bottom: 8px;">
            ${P(r.title)}
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
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${P(r.date)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">schedule</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Time</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${P(r.time)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; grid-column: span 2;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">location_on</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Venue Location</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${P(r.location)}</div>
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
              ${P(r.description||`Join your fellow St. Joseph's College students for this campus event!`)}
            </p>
          </div>

          <!-- Simulated Pass Barcode -->
          <div style="margin-top: 20px; border-top: 1px dashed var(--border-color); padding-top: 16px; text-align: center;">
            <div style="font-family: monospace; letter-spacing: 4px; font-size: 16px; font-weight: 800; color: var(--text-secondary);">
              ||||| | |||| ||| |||||| || |||||
            </div>
            <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">PASS ID: SJC-EVT-${P(r.eventId)}</span>
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
                  <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${P(e.name)}</span>
                  <span style="font-size: 11px; color: var(--text-secondary);">Class ${P(e.class||`N/A`)}</span>
                </div>
              </div>
            `).join(``)}
          </div>
        `}
      </div>
    </div>
  `,D.EVENTS);let m=G(),h=document.getElementById(`print-pass-btn`),g=document.getElementById(`rsvp-attending-btn`),_=document.getElementById(`rsvp-interested-btn`);return h&&h.addEventListener(`click`,()=>{window.print()}),g&&g.addEventListener(`click`,async()=>{g.disabled=!0;try{await Ln(r.eventId,`attending`),Vn(e)}catch(e){alert(e.message||`Failed to update RSVP`)}}),_&&_.addEventListener(`click`,async()=>{_.disabled=!0;try{await Ln(r.eventId,`interested`),Vn(e)}catch(e){alert(e.message||`Failed to update RSVP`)}}),()=>{m&&m()}}function Hn(e,t){e.innerHTML=W(`
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
  `,D.EVENTS);let n=G();return()=>{n&&n()}}async function Un(e){if(!v.currentUser){window.location.hash=`#/login`;return}e.innerHTML=W(`
    <header class="sticky-header">
      <h1 class="header-title">Admin Control Center</h1>
    </header>
    ${K(2)}
  `,D.ADMIN);let t=(await L(v.currentUser.uid))?.role||j.STUDENT;if(t===j.STUDENT){e.innerHTML=W(`
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
    `,D.HOME,t);let n=G();return()=>{n&&n()}}let n=await mt(),r=await ht(),i=await xt(),a=t===j.ADMIN;e.innerHTML=W(`
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
            ${i.map(async e=>{let t=await L(e.authorId),n=t?.name?P(t.name):`Student`,r=e.reportCount||0;return`
                <div class="card fade-in" style="padding: 16px; border-radius: 14px; background: var(--bg-primary); border: 1px solid var(--border-color);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="brand-badge" style="font-size: 11px; background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);">
                        ${r} REPORT${r===1?``:`S`} · AWAITING VALIDATION
                      </span>
                      <span style="font-size: 13px; color: var(--text-secondary);">Posted by <strong>${n}</strong> (@${P(t?.username||`student`)})</span>
                    </div>

                    <a href="#/post?id=${e.postId}" class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;">
                      View Full Post
                    </a>
                  </div>

                  <div style="font-size: 15px; color: var(--text-primary); font-weight: 500; margin-bottom: 12px; line-height: 1.4;">
                    "${P(e.content)}"
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
              ${r.map(e=>{let t=V(e,38),n=e.role===j.ADMIN,r=e.role===j.STAFF,i=e.isSuspended||!1;return`
                  <tr class="roster-row" data-name="${P(e.name)}" data-username="${P(e.username)}" style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 10px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        ${t}
                        <div style="display: flex; flex-direction: column;">
                          <span style="font-weight: 700; color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 4px;">
                            ${P(e.name)}
                            ${n?`<span class="material-symbols-outlined" style="font-size: 16px; color: var(--error-color);" title="Master Admin">shield</span>`:``}
                            ${r?`<span class="material-symbols-outlined verified-icon" title="Appointed Staff Moderator">verified</span>`:``}
                          </span>
                          <span style="font-size: 12px; color: var(--text-secondary);">@${P(e.username)}</span>
                        </div>
                      </div>
                    </td>

                    <td style="padding: 12px 10px; color: var(--text-secondary); font-size: 13px;">
                      <div>Class ${P(e.class||`N/A`)}</div>
                      <div style="font-size: 11px; opacity: 0.8;">Adm: ${P(e.admissionNumber||`N/A`)}</div>
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
  `,D.ADMIN,t);let o=G();e.querySelectorAll(`.approve-post-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.postId;t.disabled=!0,t.textContent=`Reinstating...`;try{await St(n),Un(e)}catch(e){alert(e.message||`Failed to approve post.`),t.disabled=!1}})}),e.querySelectorAll(`.delete-reported-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.postId;if(await k(`Delete Post`,`Are you sure you want to permanently delete this reported post?`)){t.disabled=!0,t.textContent=`Deleting...`;try{await vt(n),Un(e)}catch(e){alert(e.message||`Failed to delete post.`),t.disabled=!1}}})});let s=document.getElementById(`roster-search-input`);return s&&s.addEventListener(`input`,()=>{let e=s.value.trim().toLowerCase();document.querySelectorAll(`.roster-row`).forEach(t=>{let n=(t.dataset.name||``).toLowerCase(),r=(t.dataset.username||``).toLowerCase();t.style.display=n.includes(e)||r.includes(e)?``:`none`})}),e.querySelectorAll(`.role-toggle-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.uid,r=t.dataset.currentRole===j.STAFF?j.STUDENT:j.STAFF;t.disabled=!0,t.textContent=`Updating...`;try{await gt(n,r),Un(e)}catch(e){alert(e.message||`Failed to update user role.`),t.disabled=!1}})}),e.querySelectorAll(`.suspend-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.uid;e.disabled=!0;try{let n=await _t(t);e.textContent=n?`Unsuspend`:`Suspend`,e.style.borderColor=n?`#00BA7C`:`var(--error-color)`,e.style.color=n?`#00BA7C`:`var(--error-color)`}catch(e){alert(e.message||`Failed to update user suspension state.`)}finally{e.disabled=!1}})}),()=>{o&&o()}}async function Wn(e){if(!v.currentUser){window.location.hash=`#/login`;return}let t=v.currentUser,n=await L(t.uid);e.innerHTML=W(`
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
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">${P(t.email||`N/A`)}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Username</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">@${P(n?.username||`student`)}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Account Role</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px; text-transform: uppercase;">${P(n?.role||`student`)}</div>
          </div>
        </div>
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
  `,D.SETTINGS,n?.role||`student`);let r=G(),i=document.getElementById(`change-password-form`),a=document.getElementById(`new-password-input`),o=document.getElementById(`confirm-password-input`),s=document.getElementById(`password-error-alert`),c=document.getElementById(`password-success-alert`),l=document.getElementById(`save-password-btn`);return e.querySelectorAll(`.toggle-pwd-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.target,n=document.getElementById(t),r=e.querySelector(`.material-symbols-outlined`);n&&(n.type===`password`?(n.type=`text`,r&&(r.textContent=`visibility_off`)):(n.type=`password`,r&&(r.textContent=`visibility`)))})}),i&&i.addEventListener(`submit`,async e=>{e.preventDefault(),s.style.display=`none`,c.style.display=`none`;let t=a.value,n=o.value;if(t.length<6){s.textContent=`Password must be at least 6 characters long.`,s.style.display=`block`;return}if(t!==n){s.textContent=`New password and confirm password do not match.`,s.style.display=`block`;return}l.disabled=!0,l.textContent=`Updating...`;try{await De(t),i.reset(),c.style.display=`flex`}catch(e){s.textContent=e.message||`Failed to update password.`,s.style.display=`block`}finally{l.disabled=!1,l.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">key</span> Update Password`}}),()=>{r&&r()}}var Q=null,$=null;function Gn(e){Q=e,window.addEventListener(`hashchange`,Kn),window.location.hash?Kn():window.location.hash=D.HOME}async function Kn(){let e=window.location.hash.split(`?`)[0];if($&&typeof $==`function`&&($(),$=null),Q&&(Q.innerHTML=``),v.currentUser&&e!==`#/login`&&e!==`#/signup`&&e!==D.ONBOARDING&&!Ee(await L(v.currentUser.uid))){window.location.hash=D.ONBOARDING,$=await _n(Q);return}switch(e){case`#/login`:case`#/signup`:$=await Wt(Q,e);break;case D.ONBOARDING:$=await _n(Q);break;case D.HOME:$=await Ht(Q);break;case D.PROFILE:$=await sn(Q);break;case`#/notifications`:$=await fn(Q);break;case`#/friends`:$=await un(Q);break;case D.POST_DETAIL:$=await mn(Q);break;case`#/search`:$=await gn(Q);break;case D.PETITIONS:$=await bn(Q);break;case`#/petition`:$=await xn(Q);break;case D.PETITION_FRAME:$=await Cn(Q);break;case D.PROFILE_FRAME:$=await Tn(Q);break;case D.POLLS:$=await Dn(Q);break;case`#/poll`:$=await kn(Q);break;case D.ANNOUNCEMENTS:$=await Mn(Q);break;case D.EVENTS:$=await Bn(Q);break;case`#/event`:$=await Vn(Q);break;case D.ADMIN:$=await Un(Q);break;case D.SETTINGS:$=await Wn(Q);break;default:Q.innerHTML=`<div style="padding: 40px; text-align: center;"><h1>404 Page Not Found</h1></div>`;break}}var qn=!1;function Jn(e,...t){let n=r=>{let i=window.AndroidInterface;if(i&&typeof i[e]==`function`){console.log(`[BB-BRIDGE] calling AndroidInterface.${e}() (retriesLeft=${r})`),i[e](...t);return}if(r<=0){console.warn(`[BB-BRIDGE-GIVEUP] AndroidInterface.${e} never became available`);return}setTimeout(()=>n(r-1),300)};n(10)}function Yn(){let e=document.querySelector(`#app`);e.innerHTML=`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
      <img src="/favicon.png" style="width: 56px; height: 56px; border-radius: 16px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); object-fit: cover;" class="pulse-badge" alt="Logo" />
      <p style="margin-top: 16px; color: var(--text-secondary); font-size: 14px; font-weight: 600;">Restoring session...</p>
    </div>
  `,m(v,async t=>{if(console.log(`[BB-C1] onAuthStateChanged fired, user=`,t?t.uid:null),t)try{let e=await t.getIdToken();console.log(`[BB-C2] getIdToken() resolved, length=`,e?e.length:0);let n=t.refreshToken||t.stsTokenManager&&t.stsTokenManager.refreshToken;console.log(`[BB-C3] refreshToken resolved, present=`,!!n,`length=`,n?n.length:0),M(`backbench_token`,e,30),M(`backbench_uid`,t.uid,30),console.log(`[BB-C4] cookies set (backbench_token, backbench_uid)`),console.log(`[BB-C5] window.AndroidInterface present=`,!!window.AndroidInterface,`window.electronAPI present=`,!!window.electronAPI),n?(Jn(`saveAuthToken`,n),window.electronAPI&&typeof window.electronAPI.saveAuthToken==`function`&&(console.log(`[BB-C8] calling electronAPI.saveAuthToken()`),window.electronAPI.saveAuthToken(n))):console.warn(`[BB-C3-FAIL] refreshToken is falsy - cannot bridge auth to native background services at all`),Jn(`saveUserId`,t.uid)}catch(e){console.error(`[BB-C-ERR] Error retrieving ID token:`,e)}else console.log(`[BB-C11] user is null (signed out) - clearing cookies and native uid`),N(`backbench_token`),N(`backbench_uid`),window.AndroidInterface&&typeof window.AndroidInterface.clearUserId==`function`&&window.AndroidInterface.clearUserId();qn?!t&&window.location.hash!==`#/login`&&window.location.hash!==`#/signup`&&(window.location.hash=`#/login`):(qn=!0,Gn(e))})}document.addEventListener(`DOMContentLoaded`,Yn);