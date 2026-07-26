(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={HOME:`#/`,PROFILE:`#/profile`,PROFILE_FRAME:`#/profile-frame`,POST_DETAIL:`#/post`,ONBOARDING:`#/onboarding`,PETITIONS:`#/petitions`,PETITION_FRAME:`#/petition-frame`,POLLS:`#/polls`,ANNOUNCEMENTS:`#/announcements`,EVENTS:`#/events`,SETTINGS:`#/settings`,ADMIN:`#/admin`},t=()=>void 0,n={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},r=function(e,t){if(!e)throw i(t)},i=function(e){return Error(`Firebase Database (`+n.SDK_VERSION+`) INTERNAL ASSERT FAILED: `+e)},a=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)==55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)==56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},o=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[n++],o=e[n++],s=e[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|s&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let a=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return t.join(``)},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,get ENCODED_VALS(){return this.ENCODED_VALS_BASE+`+/=`},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+`-_.`},HAS_NATIVE_SUPPORT:typeof atob==`function`,encodeByteArray(e,t){if(!Array.isArray(e))throw Error(`encodeByteArray takes an array as a parameter`);this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],a=t+1<e.length,o=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(i&3)<<4|o>>4,d=(o&15)<<2|c>>6,f=c&63;s||(f=64,a||(d=64)),r.push(n[l],n[u],n[d],n[f])}return r.join(``)},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(a(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):o(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],a=t<e.length?n[e.charAt(t)]:0;++t;let o=t<e.length?n[e.charAt(t)]:64;++t;let s=t<e.length?n[e.charAt(t)]:64;if(++t,i==null||a==null||o==null||s==null)throw new c;let l=i<<2|a>>4;if(r.push(l),o!==64){let e=a<<4&240|o>>2;if(r.push(e),s!==64){let e=o<<6&192|s;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},c=class extends Error{constructor(){super(...arguments),this.name=`DecodeBase64StringError`}},l=function(e){let t=a(e);return s.encodeByteArray(t,!0)},u=function(e){return l(e).replace(/\./g,``)},d=function(e){try{return s.decodeString(e,!0)}catch(e){console.error(`base64Decode failed: `,e)}return null};function f(e){return p(void 0,e)}function p(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:e===void 0&&(e={});break;case Array:e=[];break;default:return t}for(let n in t)!t.hasOwnProperty(n)||!m(n)||(e[n]=p(e[n],t[n]));return e}function m(e){return e!==`__proto__`}function h(){if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global;throw Error(`Unable to locate global object.`)}var g=()=>h().__FIREBASE_DEFAULTS__,_=()=>{if(typeof process>`u`)return;let e={}.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},v=()=>{if(typeof document>`u`)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&d(e[1]);return t&&JSON.parse(t)},y=()=>{try{return t()||g()||_()||v()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},b=e=>y()?.emulatorHosts?.[e],ee=e=>{let t=b(e);if(!t)return;let n=t.lastIndexOf(`:`);if(n<=0||n+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(n+1),10);return t[0]===`[`?[t.substring(1,n-1),r]:[t.substring(0,n),r]},te=()=>y()?.config,ne=e=>y()?.[`_${e}`],re=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e==`function`&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};function ie(e,t){if(e.uid)throw Error(`The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.`);let n={alg:`none`,type:`JWT`},r=t||`demo-project`,i=e.iat||0,a=e.sub||e.user_id;if(!a)throw Error(`mockUserToken must contain 'sub' or 'user_id' field!`);let o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:a,user_id:a,firebase:{sign_in_provider:`custom`,identities:{}},...e};return[u(JSON.stringify(n)),u(JSON.stringify(o)),``].join(`.`)}function ae(){return typeof navigator<`u`&&typeof navigator.userAgent==`string`?navigator.userAgent:``}function oe(){return typeof window<`u`&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ae())}function se(){return typeof navigator<`u`&&navigator.userAgent===`Cloudflare-Workers`}function ce(){let e=typeof chrome==`object`?chrome.runtime:typeof browser==`object`?browser.runtime:void 0;return typeof e==`object`&&e.id!==void 0}function le(){return typeof navigator==`object`&&navigator.product===`ReactNative`}function ue(){let e=ae();return e.indexOf(`MSIE `)>=0||e.indexOf(`Trident/`)>=0}function de(){return n.NODE_CLIENT===!0||n.NODE_ADMIN===!0}function fe(){try{return typeof indexedDB==`object`}catch{return!1}}function pe(){return new Promise((e,t)=>{try{let n=!0,r=`validate-browser-context-for-indexeddb-analytics-module`,i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||``)}}catch(e){t(e)}})}var me=`FirebaseError`,he=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=me,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ge.prototype.create)}},ge=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?_e(i,n):`Error`;return new he(r,`${this.serviceName}: ${a} (${r}).`,n)}};function _e(e,t){return e.replace(ve,(e,n)=>{let r=t[n];return r==null?`<${n}?>`:String(r)})}var ve=/\{\$([^}]+)}/g;function ye(e){return JSON.parse(e)}function x(e){return JSON.stringify(e)}var be=function(e){let t={},n={},r={},i=``;try{let a=e.split(`.`);t=ye(d(a[0])||``),n=ye(d(a[1])||``),i=a[2],r=n.d||{},delete n.d}catch{}return{header:t,claims:n,data:r,signature:i}},xe=function(e){let t=be(e).claims;return!!t&&typeof t==`object`&&t.hasOwnProperty(`iat`)},Se=function(e){let t=be(e).claims;return typeof t==`object`&&t.admin===!0};function Ce(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function we(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]}function Te(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Ee(e,t,n){let r={};for(let i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function De(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let n=e[i],a=t[i];if(Oe(n)&&Oe(a)){if(!De(n,a))return!1}else if(n!==a)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function Oe(e){return typeof e==`object`&&!!e}function ke(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+`=`+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+`=`+encodeURIComponent(r));return t.length?`&`+t.join(`&`):``}function Ae(e){let t={};return e.replace(/^\?/,``).split(`&`).forEach(e=>{if(e){let[n,r]=e.split(`=`);t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function je(e){let t=e.indexOf(`?`);if(!t)return``;let n=e.indexOf(`#`,t);return e.substring(t,n>0?n:void 0)}var Me=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||=0;let n=this.W_;if(typeof e==`string`)for(let r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){let t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=(t<<1|t>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],a=this.chain_[2],o=this.chain_[3],s=this.chain_[4],c,l;for(let e=0;e<80;e++){e<40?e<20?(c=o^i&(a^o),l=1518500249):(c=i^a^o,l=1859775393):e<60?(c=i&a|o&(i|a),l=2400959708):(c=i^a^o,l=3395469782);let t=(r<<5|r>>>27)+c+s+l+n[e]&4294967295;s=o,o=a,a=(i<<30|i>>>2)&4294967295,i=r,r=t}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+o&4294967295,this.chain_[4]=this.chain_[4]+s&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);let n=t-this.blockSize,r=0,i=this.buf_,a=this.inbuf_;for(;r<t;){if(a===0)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if(typeof e==`string`){for(;r<t;)if(i[a]=e.charCodeAt(r),++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}else for(;r<t;)if(i[a]=e[r],++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){let e=[],t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=t&255,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}};function Ne(e,t){let n=new Pe(e,t);return n.subscribe.bind(n)}var Pe=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(e===void 0&&t===void 0&&n===void 0)throw Error(`Missing Observer.`);r=Fe(e,[`next`,`error`,`complete`])?e:{next:e,error:t,complete:n},r.next===void 0&&(r.next=Ie),r.error===void 0&&(r.error=Ie),r.complete===void 0&&(r.complete=Ie);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],--this.observerCount,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(e){typeof console<`u`&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Fe(e,t){if(typeof e!=`object`||!e)return!1;for(let n of t)if(n in e&&typeof e[n]==`function`)return!0;return!1}function Ie(){}function Le(e,t){return`${e} failed: ${t} argument `}var Re=function(e){let t=[],n=0;for(let i=0;i<e.length;i++){let a=e.charCodeAt(i);if(a>=55296&&a<=56319){let t=a-55296;i++,r(i<e.length,`Surrogate pair missing trail surrogate.`);let n=e.charCodeAt(i)-56320;a=65536+(t<<10)+n}a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=a&63|128):a<65536?(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=a&63|128):(t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=a&63|128)}return t},ze=function(e){let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};function S(e){return e&&e._delegate?e._delegate:e}function Be(e){try{return(e.startsWith(`http://`)||e.startsWith(`https://`)?new URL(e).hostname:e).endsWith(`.cloudworkstations.dev`)}catch{return!1}}async function Ve(e){return(await fetch(e,{credentials:`include`})).ok}var He=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode=`LAZY`,this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}},Ue=`[DEFAULT]`,We=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new re;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}else if(n)return null;else throw Error(`Service ${this.name} is not available`)}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(Ke(e))try{this.getOrInitializeService({instanceIdentifier:Ue})}catch{}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch{}}}}clearInstance(e=Ue){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>`INTERNAL`in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>`_delete`in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ue){return this.instances.has(e)}getOptions(e=Ue){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){let n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);let i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Ge(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Ue){return this.component?this.component.multipleInstances?e:Ue:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!==`EXPLICIT`}};function Ge(e){return e===Ue?void 0:e}function Ke(e){return e.instantiationMode===`EAGER`}var qe=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new We(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}},Je=[],C;(function(e){e[e.DEBUG=0]=`DEBUG`,e[e.VERBOSE=1]=`VERBOSE`,e[e.INFO=2]=`INFO`,e[e.WARN=3]=`WARN`,e[e.ERROR=4]=`ERROR`,e[e.SILENT=5]=`SILENT`})(C||={});var Ye={debug:C.DEBUG,verbose:C.VERBOSE,info:C.INFO,warn:C.WARN,error:C.ERROR,silent:C.SILENT},Xe=C.INFO,Ze={[C.DEBUG]:`log`,[C.VERBOSE]:`log`,[C.INFO]:`info`,[C.WARN]:`warn`,[C.ERROR]:`error`},Qe=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=Ze[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)},$e=class{constructor(e){this.name=e,this._logLevel=Xe,this._logHandler=Qe,this._userLogHandler=null,Je.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in C))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e==`string`?Ye[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!=`function`)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,C.DEBUG,...e),this._logHandler(this,C.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,C.VERBOSE,...e),this._logHandler(this,C.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,C.INFO,...e),this._logHandler(this,C.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,C.WARN,...e),this._logHandler(this,C.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,C.ERROR,...e),this._logHandler(this,C.ERROR,...e)}},et=(e,t)=>t.some(t=>e instanceof t),tt,nt;function rt(){return tt||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function it(){return nt||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var at=new WeakMap,ot=new WeakMap,st=new WeakMap,ct=new WeakMap,lt=new WeakMap;function ut(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(gt(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return t.then(t=>{t instanceof IDBCursor&&at.set(t,e)}).catch(()=>{}),lt.set(t,e),t}function dt(e){if(ot.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});ot.set(e,t)}var ft={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return ot.get(e);if(t===`objectStoreNames`)return e.objectStoreNames||st.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return gt(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)||t in e}};function pt(e){ft=e(ft)}function mt(e){return e===IDBDatabase.prototype.transaction&&!(`objectStoreNames`in IDBTransaction.prototype)?function(t,...n){let r=e.call(_t(this),t,...n);return st.set(r,t.sort?t.sort():[t]),gt(r)}:it().includes(e)?function(...t){return e.apply(_t(this),t),gt(at.get(this))}:function(...t){return gt(e.apply(_t(this),t))}}function ht(e){return typeof e==`function`?mt(e):(e instanceof IDBTransaction&&dt(e),et(e,rt())?new Proxy(e,ft):e)}function gt(e){if(e instanceof IDBRequest)return ut(e);if(ct.has(e))return ct.get(e);let t=ht(e);return t!==e&&(ct.set(e,t),lt.set(t,e)),t}var _t=e=>lt.get(e);function vt(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=gt(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(gt(o.result),e.oldVersion,e.newVersion,gt(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var yt=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],bt=[`put`,`add`,`delete`,`clear`],xt=new Map;function St(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(xt.get(t))return xt.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=bt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||yt.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return xt.set(t,a),a}pt(e=>({...e,get:(t,n,r)=>St(t,n)||e.get(t,n,r),has:(t,n)=>!!St(t,n)||e.has(t,n)}));var Ct=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(wt(e)){let t=e.getImmediate();return`${t.library}/${t.version}`}else return null}).filter(e=>e).join(` `)}};function wt(e){return e.getComponent()?.type===`VERSION`}var Tt=`@firebase/app`,Et=`0.15.1`,Dt=new $e(`@firebase/app`),Ot=`@firebase/app-compat`,kt=`@firebase/analytics-compat`,At=`@firebase/analytics`,jt=`@firebase/app-check-compat`,Mt=`@firebase/app-check`,Nt=`@firebase/auth`,Pt=`@firebase/auth-compat`,Ft=`@firebase/database`,It=`@firebase/data-connect`,Lt=`@firebase/database-compat`,Rt=`@firebase/functions`,zt=`@firebase/functions-compat`,Bt=`@firebase/installations`,Vt=`@firebase/installations-compat`,Ht=`@firebase/messaging`,Ut=`@firebase/messaging-compat`,Wt=`@firebase/performance`,Gt=`@firebase/performance-compat`,Kt=`@firebase/remote-config`,qt=`@firebase/remote-config-compat`,Jt=`@firebase/storage`,Yt=`@firebase/storage-compat`,Xt=`@firebase/firestore`,Zt=`@firebase/ai`,Qt=`@firebase/firestore-compat`,$t=`firebase`,en=`12.16.0`,tn=`[DEFAULT]`,nn={[Tt]:`fire-core`,[Ot]:`fire-core-compat`,[At]:`fire-analytics`,[kt]:`fire-analytics-compat`,[Mt]:`fire-app-check`,[jt]:`fire-app-check-compat`,[Nt]:`fire-auth`,[Pt]:`fire-auth-compat`,[Ft]:`fire-rtdb`,[It]:`fire-data-connect`,[Lt]:`fire-rtdb-compat`,[Rt]:`fire-fn`,[zt]:`fire-fn-compat`,[Bt]:`fire-iid`,[Vt]:`fire-iid-compat`,[Ht]:`fire-fcm`,[Ut]:`fire-fcm-compat`,[Wt]:`fire-perf`,[Gt]:`fire-perf-compat`,[Kt]:`fire-rc`,[qt]:`fire-rc-compat`,[Jt]:`fire-gcs`,[Yt]:`fire-gcs-compat`,[Xt]:`fire-fst`,[Qt]:`fire-fst-compat`,[Zt]:`fire-vertex`,"fire-js":`fire-js`,[$t]:`fire-js-all`},rn=new Map,an=new Map,on=new Map;function sn(e,t){try{e.container.addComponent(t)}catch(n){Dt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function cn(e){let t=e.name;if(on.has(t))return Dt.debug(`There were multiple attempts to register component ${t}.`),!1;on.set(t,e);for(let t of rn.values())sn(t,e);for(let t of an.values())sn(t,e);return!0}function ln(e,t){let n=e.container.getProvider(`heartbeat`).getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function un(e){return e!=null&&e.settings!==void 0}var dn=new ge(`app`,`Firebase`,{"no-app":`No Firebase App '{$appName}' has been created - call initializeApp() first`,"bad-app-name":`Illegal App name: '{$appName}'`,"duplicate-app":`Firebase App named '{$appName}' already exists with different options or config`,"app-deleted":`Firebase App named '{$appName}' already deleted`,"server-app-deleted":`Firebase Server App has been deleted`,"no-options":`Need to provide options, when not being deployed to hosting via source.`,"invalid-app-argument":`firebase.{$appName}() takes either no argument or a Firebase App instance.`,"invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":`Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.`,"idb-get":`Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.`,"idb-set":`Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.`,"idb-delete":`Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.`,"finalization-registry-not-supported":`FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.`,"invalid-server-app-environment":`FirebaseServerApp is not for use in browser environments.`}),fn=class{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new He(`app`,()=>this,`PUBLIC`))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw dn.create(`app-deleted`,{appName:this._name})}},pn=en;function mn(e,t={}){let n=e;typeof t!=`object`&&(t={name:t});let r={name:tn,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!=`string`||!i)throw dn.create(`bad-app-name`,{appName:String(i)});if(n||=te(),!n)throw dn.create(`no-options`);let a=rn.get(i);if(a){if(De(n,a.options)&&De(r,a.config))return a;throw dn.create(`duplicate-app`,{appName:i})}let o=new qe(i);for(let e of on.values())o.addComponent(e);let s=new fn(n,r,o);return rn.set(i,s),s}function hn(e=tn){let t=rn.get(e);if(!t&&e===`[DEFAULT]`&&te())return mn();if(!t)throw dn.create(`no-app`,{appName:e});return t}function gn(e,t,n){let r=nn[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){let e=[`Unable to register library "${r}" with version "${t}":`];i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&e.push(`and`),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Dt.warn(e.join(` `));return}cn(new He(`${r}-version`,()=>({library:r,version:t}),`VERSION`))}var _n=`firebase-heartbeat-database`,vn=1,yn=`firebase-heartbeat-store`,bn=null;function xn(){return bn||=vt(_n,vn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(yn)}catch(e){console.warn(e)}}}}).catch(e=>{throw dn.create(`idb-open`,{originalErrorMessage:e.message})}),bn}async function Sn(e){try{let t=(await xn()).transaction(yn),n=await t.objectStore(yn).get(wn(e));return await t.done,n}catch(e){if(e instanceof he)Dt.warn(e.message);else{let t=dn.create(`idb-get`,{originalErrorMessage:e?.message});Dt.warn(t.message)}}}async function Cn(e,t){try{let n=(await xn()).transaction(yn,`readwrite`);await n.objectStore(yn).put(t,wn(e)),await n.done}catch(e){if(e instanceof he)Dt.warn(e.message);else{let t=dn.create(`idb-set`,{originalErrorMessage:e?.message});Dt.warn(t.message)}}}function wn(e){return`${e.name}!${e.options.appId}`}var Tn=1024,En=30,Dn=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider(`app`).getImmediate();this._storage=new An(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider(`platform-logger`).getImmediate().getPlatformInfoString(),t=On();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>En){let e=Mn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Dt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return``;let e=On(),{heartbeatsToSend:t,unsentEntries:n}=kn(this._heartbeatsCache.heartbeats),r=u(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Dt.warn(e),``}}};function On(){return new Date().toISOString().substring(0,10)}function kn(e,t=Tn){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(!e){if(n.push({agent:i.agent,dates:[i.date]}),jn(n)>t){n.pop();break}}else if(e.dates.push(i.date),jn(n)>t){e.dates.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var An=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fe()?pe().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await Sn(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return Cn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return Cn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}else return}};function jn(e){return u(JSON.stringify({version:2,heartbeats:e})).length}function Mn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function Nn(e){cn(new He(`platform-logger`,e=>new Ct(e),`PRIVATE`)),cn(new He(`heartbeat`,e=>new Dn(e),`PRIVATE`)),gn(Tt,Et,e),gn(Tt,Et,`esm2020`),gn(`fire-js`,``)}Nn(``),gn(`firebase`,`12.16.0`,`app`);var Pn=`@firebase/database`,Fn=`1.1.3`,In=``;function Ln(e){In=e}var Rn=class{constructor(e){this.domStorage_=e,this.prefix_=`firebase:`}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(t))}get(e){let t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ye(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}},zn=class{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Ce(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}},Bn=function(e){try{if(typeof window<`u`&&window[e]!==void 0){let t=window[e];return t.setItem(`firebase:sentinel`,`cache`),t.removeItem(`firebase:sentinel`),new Rn(t)}}catch{}return new zn},Vn=Bn(`localStorage`),Hn=Bn(`sessionStorage`),Un=new $e(`@firebase/database`),Wn=(function(){let e=1;return function(){return e++}})(),Gn=function(e){let t=Re(e),n=new Me;n.update(t);let r=n.digest();return s.encodeByteArray(r)},Kn=function(...e){let t=``;for(let n=0;n<e.length;n++){let r=e[n];Array.isArray(r)||r&&typeof r==`object`&&typeof r.length==`number`?t+=Kn.apply(null,r):typeof r==`object`?t+=x(r):t+=r,t+=` `}return t},qn=null,Jn=!0,Yn=function(e,t){r(!t||e===!0||e===!1,`Can't turn on custom loggers persistently.`),e===!0?(Un.logLevel=C.VERBOSE,qn=Un.log.bind(Un),t&&Hn.set(`logging_enabled`,!0)):typeof e==`function`?qn=e:(qn=null,Hn.remove(`logging_enabled`))},w=function(...e){if(Jn===!0&&(Jn=!1,qn===null&&Hn.get(`logging_enabled`)===!0&&Yn(!0)),qn){let t=Kn.apply(null,e);qn(t)}},Xn=function(e){return function(...t){w(e,...t)}},Zn=function(...e){let t=`FIREBASE INTERNAL ERROR: `+Kn(...e);Un.error(t)},Qn=function(...e){let t=`FIREBASE FATAL ERROR: ${Kn(...e)}`;throw Un.error(t),Error(t)},$n=function(...e){let t=`FIREBASE WARNING: `+Kn(...e);Un.warn(t)},er=function(){typeof window<`u`&&window.location&&window.location.protocol&&window.location.protocol.indexOf(`https:`)!==-1&&$n(`Insecure Firebase access from a secure page. Please use https in calls to new Firebase().`)},tr=function(e){return typeof e==`number`&&(e!==e||e===1/0||e===-1/0)},nr=function(e){if(de()||document.readyState===`complete`)e();else{let t=!1,n=function(){if(!document.body){setTimeout(n,10);return}t||(t=!0,e())};document.addEventListener?(document.addEventListener(`DOMContentLoaded`,n,!1),window.addEventListener(`load`,n,!1)):document.attachEvent&&(document.attachEvent(`onreadystatechange`,()=>{document.readyState===`complete`&&n()}),window.attachEvent(`onload`,n))}},rr=`[MIN_NAME]`,ir=`[MAX_NAME]`,ar=function(e,t){if(e===t)return 0;if(e===rr||t===ir)return-1;if(t===rr||e===ir)return 1;{let n=_r(e),r=_r(t);return n===null?r===null&&e<t?-1:1:r===null?-1:n-r===0?e.length-t.length:n-r}},or=function(e,t){return e===t?0:e<t?-1:1},sr=function(e,t){if(t&&e in t)return t[e];throw Error(`Missing required key (`+e+`) in object: `+x(t))},cr=function(e){if(typeof e!=`object`||!e)return x(e);let t=[];for(let n in e)t.push(n);t.sort();let n=`{`;for(let r=0;r<t.length;r++)r!==0&&(n+=`,`),n+=x(t[r]),n+=`:`,n+=cr(e[t[r]]);return n+=`}`,n},lr=function(e,t){let n=e.length;if(n<=t)return[e];let r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function T(e,t){for(let n in e)e.hasOwnProperty(n)&&t(n,e[n])}var ur=function(e){r(!tr(e),`Invalid JSON number`);let t=1023,n,i,a,o,s;e===0?(i=0,a=0,n=+(1/e==-1/0)):(n=e<0,e=Math.abs(e),e>=2**(1-t)?(o=Math.min(Math.floor(Math.log(e)/Math.LN2),t),i=o+t,a=Math.round(e*2**(52-o)-2**52)):(i=0,a=Math.round(e/2**(1-t-52))));let c=[];for(s=52;s;--s)c.push(a%2?1:0),a=Math.floor(a/2);for(s=11;s;--s)c.push(i%2?1:0),i=Math.floor(i/2);c.push(+!!n),c.reverse();let l=c.join(``),u=``;for(s=0;s<64;s+=8){let e=parseInt(l.substr(s,8),2).toString(16);e.length===1&&(e=`0`+e),u+=e}return u.toLowerCase()},dr=function(){return!!(typeof window==`object`&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},fr=function(){return typeof Windows==`object`&&typeof Windows.UI==`object`};function pr(e,t){let n=`Unknown Error`;e===`too_big`?n=`The data requested exceeds the maximum size that can be accessed with a single request.`:e===`permission_denied`?n=`Client doesn't have permission to access the desired data.`:e===`unavailable`&&(n=`The service is unavailable`);let r=Error(e+` at `+t._path.toString()+`: `+n);return r.code=e.toUpperCase(),r}var mr=RegExp(`^-?(0*)\\d{1,10}$`),hr=-2147483648,gr=2147483647,_r=function(e){if(mr.test(e)){let t=Number(e);if(t>=hr&&t<=gr)return t}return null},vr=function(e){try{e()}catch(e){setTimeout(()=>{throw $n(`Exception was thrown by user callback.`,e.stack||``),e},0)}},yr=function(){return(typeof window==`object`&&window.navigator&&window.navigator.userAgent||``).search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},br=function(e,t){let n=setTimeout(e,t);return typeof n==`number`&&typeof Deno<`u`&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n==`object`&&n.unref&&n.unref(),n},xr=class{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,un(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(e=>this.appCheck=e)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){$n(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}},Sr=class{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(e=>this.auth_=e)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(e=>e&&e.code===`auth/token-not-initialized`?(w(`Got auth/token-not-initialized error.  Treating as null token.`),null):Promise.reject(e)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e=`Provided authentication credentials for the app named "`+this.appName_+`" are invalid. This usually indicates your app was not initialized correctly. `;`credential`in this.firebaseOptions_?e+=`Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.`:`serviceAccount`in this.firebaseOptions_?e+=`Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.`:e+=`Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.`,$n(e)}},Cr=class{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}};Cr.OWNER=`owner`;var wr=`5`,Tr=`v`,Er=`s`,Dr=`r`,Or=`f`,kr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ar=`ls`,jr=`p`,Mr=`ac`,Nr=`websocket`,Pr=`long_polling`,Fr=class{constructor(e,t,n,r,i=!1,a=``,o=!1,s=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=a,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=s,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(`.`)+1),this.internalHost=Vn.get(`host:`+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)===`s-`}isCustomHost(){return this._domain!==`firebaseio.com`&&this._domain!==`firebaseio-demo.com`}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Vn.set(`host:`+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+=`<`+this.persistenceKey+`>`),e}toURLString(){let e=this.secure?`https://`:`http://`,t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:``;return`${e}${this.host}/${t}`}};function Ir(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams}function Lr(e,t,n){r(typeof t==`string`,`typeof type must == string`),r(typeof n==`object`,`typeof params must == object`);let i;if(t===Nr)i=(e.secure?`wss://`:`ws://`)+e.internalHost+`/.ws?`;else if(t===Pr)i=(e.secure?`https://`:`http://`)+e.internalHost+`/.lp?`;else throw Error(`Unknown connection type: `+t);Ir(e)&&(n.ns=e.namespace);let a=[];return T(n,(e,t)=>{a.push(e+`=`+t)}),i+a.join(`&`)}var Rr=class{constructor(){this.counters_={}}incrementCounter(e,t=1){Ce(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return f(this.counters_)}},zr={},Br={};function Vr(e){let t=e.toString();return zr[t]||(zr[t]=new Rr),zr[t]}function Hr(e,t){let n=e.toString();return Br[n]||(Br[n]=t()),Br[n]}var Ur=class{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){let e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&vr(()=>{this.onMessage_(e[t])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&=(this.onClose(),null);break}this.currentResponseNum++}}},Wr=`start`,Gr=`close`,Kr=`pLPCommand`,qr=`pRTLPCB`,Jr=`id`,Yr=`pw`,Xr=`ser`,Zr=`cb`,Qr=`dframe`,$r=1870,ei=30,ti=$r-ei,ni=25e3,ri=3e4,ii=class e{constructor(e,t,n,r,i,a,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=a,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Xn(e),this.stats_=Vr(t),this.urlFn=e=>(this.appCheckToken&&(e[Mr]=this.appCheckToken),Lr(t,Pr,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Ur(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_(`Timed out trying to connect.`),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(ri)),nr(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ai((...e)=>{let[t,n,r,i,a]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&=(clearTimeout(this.connectTimeoutTimer_),null),this.everConnected_=!0,t===Wr)this.id=n,this.password=r;else if(t===Gr)n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,()=>{this.onClosed_()})):this.onClosed_();else throw Error(`Unrecognized command received: `+t)},(...e)=>{let[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)},()=>{this.onClosed_()},this.urlFn);let e={};e[Wr]=`t`,e[Xr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(e[Zr]=this.scriptTagHolder.uniqueCallbackIdentifier),e[Tr]=wr,this.transportSessionId&&(e[Er]=this.transportSessionId),this.lastSessionId&&(e[Ar]=this.lastSessionId),this.applicationId&&(e[jr]=this.applicationId),this.appCheckToken&&(e[Mr]=this.appCheckToken),typeof location<`u`&&location.hostname&&kr.test(location.hostname)&&(e[Dr]=Or);let t=this.urlFn(e);this.log_(`Connecting via long-poll to `+t),this.scriptTagHolder.addTag(t,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){e.forceAllow_=!0}static forceDisallow(){e.forceDisallow_=!0}static isAvailable(){return de()?!1:e.forceAllow_?!0:!e.forceDisallow_&&typeof document<`u`&&document.createElement!=null&&!dr()&&!fr()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&=(this.scriptTagHolder.close(),null),this.myDisconnFrame&&=(document.body.removeChild(this.myDisconnFrame),null),this.connectTimeoutTimer_&&=(clearTimeout(this.connectTimeoutTimer_),null)}onClosed_(){this.isClosed_||(this.log_(`Longpoll is closing itself`),this.shutdown_(),this.onDisconnect_&&=(this.onDisconnect_(this.everConnected_),null))}close(){this.isClosed_||(this.log_(`Longpoll is being closed.`),this.shutdown_())}send(e){let t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter(`bytes_sent`,t.length);let n=lr(l(t),ti);for(let e=0;e<n.length;e++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,n.length,n[e]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if(de())return;this.myDisconnFrame=document.createElement(`iframe`);let n={};n[Qr]=`t`,n[Jr]=e,n[Yr]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display=`none`,document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){let t=x(e).length;this.bytesReceived+=t,this.stats_.incrementCounter(`bytes_received`,t)}},ai=class e{constructor(t,n,r,i){if(this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0,de())this.commandCB=t,this.onMessageCB=n;else{this.uniqueCallbackIdentifier=Wn(),window[Kr+this.uniqueCallbackIdentifier]=t,window[qr+this.uniqueCallbackIdentifier]=n,this.myIFrame=e.createIFrame_();let r=``;this.myIFrame.src&&this.myIFrame.src.substr(0,11)===`javascript:`&&(r=`<script>document.domain="`+document.domain+`";<\/script>`);let i=`<html><body>`+r+`</body></html>`;try{this.myIFrame.doc.open(),this.myIFrame.doc.write(i),this.myIFrame.doc.close()}catch(e){w(`frame writing exception`),e.stack&&w(e.stack),w(e)}}}static createIFrame_(){let e=document.createElement(`iframe`);if(e.style.display=`none`,document.body){document.body.appendChild(e);try{e.contentWindow.document||w(`No IE domain setting required`)}catch{e.src=`javascript:void((function(){document.open();document.domain='`+document.domain+`';document.close();})())`}}else throw`Document body has not initialized. Wait to initialize Firebase until after the document is ready.`;return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent=``,setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},0));let e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;let e={};e[Jr]=this.myID,e[Yr]=this.myPW,e[Xr]=this.currentSerial;let t=this.urlFn(e),n=``,r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ei+n.length<=$r;){let e=this.pendingSegs.shift();n=n+`&seg`+r+`=`+e.seg+`&ts`+r+`=`+e.ts+`&d`+r+`=`+e.d,r++}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);let n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(ni));this.addTag(e,()=>{clearTimeout(r),n()})}addTag(e,t){de()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;let n=this.myIFrame.doc.createElement(`script`);n.type=`text/javascript`,n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){let e=n.readyState;(!e||e===`loaded`||e===`complete`)&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{w(`Long-poll script failed to load: `+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},1)}},oi=16384,si=45e3,ci=null;typeof MozWebSocket<`u`?ci=MozWebSocket:typeof WebSocket<`u`&&(ci=WebSocket);var li=class e{constructor(t,n,r,i,a,o,s){this.connId=t,this.applicationId=r,this.appCheckToken=i,this.authToken=a,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Xn(this.connId),this.stats_=Vr(n),this.connURL=e.connectionURL_(n,o,s,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,t,n,r,i){let a={};return a[Tr]=wr,!de()&&typeof location<`u`&&location.hostname&&kr.test(location.hostname)&&(a[Dr]=Or),t&&(a[Er]=t),n&&(a[Ar]=n),r&&(a[Mr]=r),i&&(a[jr]=i),Lr(e,Nr,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_(`Websocket connecting to `+this.connURL),this.everConnected_=!1,Vn.set(`previous_websocket_failure`,!0);try{let e;if(de()){let t=this.nodeAdmin?`AdminNode`:`Node`;e={headers:{"User-Agent":`Firebase/${wr}/${In}/${process.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||``}},this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers[`X-Firebase-AppCheck`]=this.appCheckToken);let n={},r=this.connURL.indexOf(`wss://`)===0?n.HTTPS_PROXY||n.https_proxy:n.HTTP_PROXY||n.http_proxy;r&&(e.proxy={origin:r})}this.mySock=new ci(this.connURL,[],e)}catch(e){this.log_(`Error instantiating WebSocket.`);let t=e.message||e.data;t&&this.log_(t),this.onClosed_();return}this.mySock.onopen=()=>{this.log_(`Websocket connected.`),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_(`Websocket connection was disconnected.`),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_(`WebSocket error.  Closing connection.`);let t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){e.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<`u`&&navigator.userAgent){let e=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);e&&e.length>1&&parseFloat(e[1])<4.4&&(t=!0)}return!t&&ci!==null&&!e.forceDisallow_}static previouslyFailed(){return Vn.isInMemoryStorage||Vn.get(`previous_websocket_failure`)===!0}markConnectionHealthy(){Vn.remove(`previous_websocket_failure`)}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){let e=this.frames.join(``);this.frames=null;let t=ye(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(r(this.frames===null,`We already have a frame buffer`),e.length<=6){let t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;let t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter(`bytes_received`,t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{let e=this.extractFrameCount_(t);e!==null&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();let t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter(`bytes_sent`,t.length);let n=lr(t,oi);n.length>1&&this.sendString_(String(n.length));for(let e=0;e<n.length;e++)this.sendString_(n[e])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&=(clearInterval(this.keepaliveTimer),null),this.mySock&&=(this.mySock.close(),null)}onClosed_(){this.isClosed_||(this.log_(`WebSocket is closing itself`),this.shutdown_(),this.onDisconnect&&=(this.onDisconnect(this.everConnected_),null))}close(){this.isClosed_||(this.log_(`WebSocket is being closed`),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_(`0`),this.resetKeepAlive()},Math.floor(si))}sendString_(e){try{this.mySock.send(e)}catch(e){this.log_(`Exception thrown from WebSocket.send():`,e.message||e.data,`Closing connection.`),setTimeout(this.onClosed_.bind(this),0)}}};li.responsesRequiredToBeHealthy=2,li.healthyTimeout=3e4;var ui=class e{static get ALL_TRANSPORTS(){return[ii,li]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(t){let n=li&&li.isAvailable(),r=n&&!li.previouslyFailed();if(t.webSocketOnly&&(n||$n(`wss:// URL used, but browser isn't known to support websockets.  Trying anyway.`),r=!0),r)this.transports_=[li];else{let t=this.transports_=[];for(let n of e.ALL_TRANSPORTS)n&&n.isAvailable()&&t.push(n);e.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw Error(`No transports available`)}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}};ui.globalTransportInitialized_=!1;var di=6e4,fi=5e3,pi=10*1024,mi=100*1024,hi=`t`,gi=`d`,_i=`s`,vi=`r`,yi=`e`,bi=`o`,xi=`a`,Si=`n`,Ci=`p`,wi=`h`,Ti=class{constructor(e,t,n,r,i,a,o,s,c,l){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=a,this.onReady_=o,this.onDisconnect_=s,this.onKill_=c,this.lastSessionId=l,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Xn(`c:`+this.id+`:`),this.transportManager_=new ui(t),this.log_(`Connection created`),this.start_()}start_(){let e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},0);let r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=br(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>mi?(this.log_(`Connection exceeded healthy timeout but has received `+this.conn_.bytesReceived+` bytes.  Marking connection healthy.`),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>pi?this.log_(`Connection exceeded healthy timeout but has sent `+this.conn_.bytesSent+` bytes.  Leaving connection alive.`):(this.log_(`Closing unhealthy connection after timeout.`),this.close()))},Math.floor(r)))}nextTransportId_(){return`c:`+this.id+`:`+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_(`Secondary connection lost.`),this.onSecondaryConnectionLost_()):this.log_(`closing an old connection`)}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_(`message on old connection`))}}sendRequest(e){let t={t:`d`,d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_(`cleaning up and promoting a connection: `+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(hi in e){let t=e[hi];t===xi?this.upgradeIfSecondaryHealthy_():t===vi?(this.log_(`Got a reset on secondary, closing it`),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===bi&&(this.log_(`got pong on secondary.`),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){let t=sr(`t`,e),n=sr(`d`,e);if(t===`c`)this.onSecondaryControl_(n);else if(t===`d`)this.pendingDataMessages.push(n);else throw Error(`Unknown protocol layer: `+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_(`Secondary connection is healthy.`),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_(`sending ping on secondary.`),this.secondaryConn_.send({t:`c`,d:{t:Ci,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_(`sending client ack on secondary`),this.secondaryConn_.send({t:`c`,d:{t:xi,d:{}}}),this.log_(`Ending transmission on primary`),this.conn_.send({t:`c`,d:{t:Si,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){let t=sr(`t`,e),n=sr(`d`,e);t===`c`?this.onControl_(n):t===`d`&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_(`Primary connection is healthy.`),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){let t=sr(hi,e);if(gi in e){let n=e[gi];if(t===wi){let e={...n};this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if(t===Si){this.log_(`recvd end transmission on primary`),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===_i?this.onConnectionShutdown_(n):t===vi?this.onReset_(n):t===yi?Zn(`Server Error: `+n):t===bi?(this.log_(`got pong on primary.`),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Zn(`Unknown control packet command: `+t)}}onHandshake_(e){let t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),wr!==n&&$n(`Protocol version mismatch detected`),this.tryStartUpgrade_())}tryStartUpgrade_(){let e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),br(()=>{this.secondaryConn_&&(this.log_(`Timed out trying to upgrade.`),this.secondaryConn_.close())},Math.floor(di))}onReset_(e){this.log_(`Reset packet received.  New host: `+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_(`Realtime connection established.`),this.conn_=e,this.state_=1,this.onReady_&&=(this.onReady_(t,this.sessionId),null),this.primaryResponsesRequired_===0?(this.log_(`Primary connection is healthy.`),this.isHealthy_=!0):br(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(fi))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_(`sending ping on primary.`),this.sendData_({t:`c`,d:{t:Ci,d:{}}}))}onSecondaryConnectionLost_(){let e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_(`Realtime connection failed.`),this.repoInfo_.isCacheableHost()&&(Vn.remove(`host:`+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_(`Realtime connection lost.`),this.close()}onConnectionShutdown_(e){this.log_(`Connection shutdown command received. Shutting down...`),this.onKill_&&=(this.onKill_(e),null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw`Connection is not connected`;this.tx_.send(e)}close(){this.state_!==2&&(this.log_(`Closing realtime connection.`),this.state_=2,this.closeConnections_(),this.onDisconnect_&&=(this.onDisconnect_(),null))}closeConnections_(){this.log_(`Shutting down all connections`),this.conn_&&=(this.conn_.close(),null),this.secondaryConn_&&=(this.secondaryConn_.close(),null),this.healthyTimeout_&&=(clearTimeout(this.healthyTimeout_),null)}},Ei=class{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}},Di=class{constructor(e){this.allowedEvents_=e,this.listeners_={},r(Array.isArray(e)&&e.length>0,`Requires a non-empty array`)}trigger(e,...t){if(Array.isArray(this.listeners_[e])){let n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});let r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);let r=this.listeners_[e]||[];for(let e=0;e<r.length;e++)if(r[e].callback===t&&(!n||n===r[e].context)){r.splice(e,1);return}}validateEventType_(e){r(this.allowedEvents_.find(t=>t===e),`Unknown event: `+e)}},Oi=class e extends Di{static getInstance(){return new e}constructor(){super([`online`]),this.online_=!0,typeof window<`u`&&window.addEventListener!==void 0&&!oe()&&(window.addEventListener(`online`,()=>{this.online_||(this.online_=!0,this.trigger(`online`,!0))},!1),window.addEventListener(`offline`,()=>{this.online_&&(this.online_=!1,this.trigger(`online`,!1))},!1))}getInitialEvent(e){return r(e===`online`,`Unknown event type: `+e),[this.online_]}currentlyOnline(){return this.online_}},ki=32,Ai=768,E=class{constructor(e,t){if(t===void 0){this.pieces_=e.split(`/`);let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e=``;for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==``&&(e+=`/`+this.pieces_[t]);return e||`/`}};function D(){return new E(``)}function O(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function ji(e){return e.pieces_.length-e.pieceNum_}function k(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new E(e.pieces_,t)}function Mi(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function Ni(e){let t=``;for(let n=e.pieceNum_;n<e.pieces_.length;n++)e.pieces_[n]!==``&&(t+=`/`+encodeURIComponent(String(e.pieces_[n])));return t||`/`}function Pi(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function Fi(e){if(e.pieceNum_>=e.pieces_.length)return null;let t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new E(t,0)}function A(e,t){let n=[];for(let t=e.pieceNum_;t<e.pieces_.length;t++)n.push(e.pieces_[t]);if(t instanceof E)for(let e=t.pieceNum_;e<t.pieces_.length;e++)n.push(t.pieces_[e]);else{let e=t.split(`/`);for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new E(n,0)}function j(e){return e.pieceNum_>=e.pieces_.length}function Ii(e,t){let n=O(e),r=O(t);if(n===null)return t;if(n===r)return Ii(k(e),k(t));throw Error(`INTERNAL ERROR: innerPath (`+t+`) is not within outerPath (`+e+`)`)}function Li(e,t){let n=Pi(e,0),r=Pi(t,0);for(let e=0;e<n.length&&e<r.length;e++){let t=ar(n[e],r[e]);if(t!==0)return t}return n.length===r.length?0:n.length<r.length?-1:1}function Ri(e,t){if(ji(e)!==ji(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function zi(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(ji(e)>ji(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}var Bi=class{constructor(e,t){this.errorPrefix_=t,this.parts_=Pi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let e=0;e<this.parts_.length;e++)this.byteLength_+=ze(this.parts_[e]);Ui(this)}};function Vi(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=ze(t),Ui(e)}function Hi(e){let t=e.parts_.pop();e.byteLength_-=ze(t),e.parts_.length>0&&--e.byteLength_}function Ui(e){if(e.byteLength_>Ai)throw Error(e.errorPrefix_+`has a key path longer than 768 bytes (`+e.byteLength_+`).`);if(e.parts_.length>ki)throw Error(e.errorPrefix_+`path specified exceeds the maximum depth that can be written (32) or object contains a cycle `+Wi(e))}function Wi(e){return e.parts_.length===0?``:`in property '`+e.parts_.join(`.`)+`'`}var Gi=class e extends Di{static getInstance(){return new e}constructor(){super([`visible`]);let e,t;typeof document<`u`&&document.addEventListener!==void 0&&(document.hidden===void 0?document.mozHidden===void 0?document.msHidden===void 0?document.webkitHidden!==void 0&&(t=`webkitvisibilitychange`,e=`webkitHidden`):(t=`msvisibilitychange`,e=`msHidden`):(t=`mozvisibilitychange`,e=`mozHidden`):(t=`visibilitychange`,e=`hidden`)),this.visible_=!0,t&&document.addEventListener(t,()=>{let t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger(`visible`,t))},!1)}getInitialEvent(e){return r(e===`visible`,`Unknown event type: `+e),[this.visible_]}},Ki=1e3,qi=300*1e3,Ji=30*1e3,Yi=1.3,Xi=3e4,Zi=`server_kill`,Qi=3,$i=class e extends Ei{constructor(t,n,r,i,a,o,s,c){if(super(),this.repoInfo_=t,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=a,this.authTokenProvider_=o,this.appCheckTokenProvider_=s,this.authOverride_=c,this.id=e.nextPersistentConnectionId_++,this.log_=Xn(`p:`+this.id+`:`),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ki,this.maxReconnectDelay_=qi,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!de())throw Error(`Auth override specified in options, but not supported on non Node.js platforms`);Gi.getInstance().on(`visible`,this.onVisible_,this),t.host.indexOf(`fblocal`)===-1&&Oi.getInstance().on(`online`,this.onOnline_,this)}sendRequest(e,t,n){let i=++this.requestNumber_,a={r:i,a:e,b:t};this.log_(x(a)),r(this.connected_,`sendRequest call when we're not connected not allowed.`),this.realtime_.sendRequest(a),n&&(this.requestCBHash_[i]=n)}get(e){this.initConnection_();let t=new re,n={action:`g`,request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{let n=e.d;e.s===`ok`?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;let r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,i){this.initConnection_();let a=e._queryIdentifier,o=e._path.toString();this.log_(`Listen called for `+o+` `+a),this.listens.has(o)||this.listens.set(o,new Map),r(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),`listen() called for non-default but complete query`),r(!this.listens.get(o).has(a),`listen() called twice for same path/queryId.`);let s={onComplete:i,hashFn:t,query:e,tag:n};this.listens.get(o).set(a,s),this.connected_&&this.sendListen_(s)}sendGet_(e){let t=this.outstandingGets_[e];this.sendRequest(`g`,t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(t){let n=t.query,r=n._path.toString(),i=n._queryIdentifier;this.log_(`Listen on `+r+` for `+i);let a={p:r};t.tag&&(a.q=n._queryObject,a.t=t.tag),a.h=t.hashFn(),this.sendRequest(`q`,a,a=>{let o=a.d,s=a.s;e.warnOnListenWarnings_(o,n),(this.listens.get(r)&&this.listens.get(r).get(i))===t&&(this.log_(`listen response`,a),s!==`ok`&&this.removeListen_(r,i),t.onComplete&&t.onComplete(s,o))})}static warnOnListenWarnings_(e,t){if(e&&typeof e==`object`&&Ce(e,`w`)){let n=we(e,`w`);Array.isArray(n)&&~n.indexOf(`no_index`)&&$n(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${`".indexOn": "`+t._queryParams.getIndex().toString()+`"`} at ${t._path.toString()} to your security rules for better performance.`)}}refreshAuthToken(e){this.authToken_=e,this.log_(`Auth token refreshed`),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest(`unauth`,{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Se(e))&&(this.log_(`Admin auth credential detected.  Reducing max reconnect time.`),this.maxReconnectDelay_=Ji)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_(`App check token refreshed`),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest(`unappeck`,{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){let e=this.authToken_,t=xe(e)?`auth`:`gauth`,n={cred:e};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_==`object`&&(n.authvar=this.authOverride_),this.sendRequest(t,n,t=>{let n=t.s,r=t.d||`error`;this.authToken_===e&&(n===`ok`?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest(`appcheck`,{token:this.appCheckToken_},e=>{let t=e.s,n=e.d||`error`;t===`ok`?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){let n=e._path.toString(),i=e._queryIdentifier;this.log_(`Unlisten called for `+n+` `+i),r(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),`unlisten() called for non-default but complete query`),this.removeListen_(n,i)&&this.connected_&&this.sendUnlisten_(n,i,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_(`Unlisten on `+e+` for `+t);let i={p:e};r&&(i.q=n,i.t=r),this.sendRequest(`n`,i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_(`o`,e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:`o`,data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_(`om`,e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:`om`,data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_(`oc`,e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:`oc`,data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){let i={p:t,d:n};this.log_(`onDisconnect `+e,i),this.sendRequest(e,i,e=>{r&&setTimeout(()=>{r(e.s,e.d)},0)})}put(e,t,n,r){this.putInternal(`p`,e,t,n,r)}merge(e,t,n,r){this.putInternal(`m`,e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();let a={p:t,d:n};i!==void 0&&(a.h=i),this.outstandingPuts_.push({action:e,request:a,onComplete:r}),this.outstandingPutCount_++;let o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_(`Buffering put: `+t)}sendPut_(e){let t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,n=>{this.log_(t+` response`,n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)})}reportStats(e){if(this.connected_){let t={c:e};this.log_(`reportStats`,t),this.sendRequest(`s`,t,e=>{if(e.s!==`ok`){let t=e.d;this.log_(`reportStats`,`Error sending stats: `+t)}})}}onDataMessage_(e){if(`r`in e){this.log_(`from server: `+x(e));let t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else if(`error`in e)throw`A server-side error has occurred: `+e.error;else`a`in e&&this.onDataPush_(e.a,e.b)}onDataPush_(e,t){this.log_(`handleServerMessage`,e,t),e===`d`?this.onDataUpdate_(t.p,t.d,!1,t.t):e===`m`?this.onDataUpdate_(t.p,t.d,!0,t.t):e===`c`?this.onListenRevoked_(t.p,t.q):e===`ac`?this.onAuthRevoked_(t.s,t.d):e===`apc`?this.onAppCheckRevoked_(t.s,t.d):e===`sd`?this.onSecurityDebugPacket_(t):Zn(`Unrecognized action received from server: `+x(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_(`connection ready`),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){r(!this.realtime_,`Scheduling a connect when we're already connected/ing?`),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_(`Window became visible.  Reducing delay.`),this.reconnectDelay_=Ki,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_(`Browser went online.`),this.reconnectDelay_=Ki,this.realtime_||this.scheduleConnect_(0)):(this.log_(`Browser went offline.  Killing connection.`),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_(`data client disconnected`),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&=(new Date().getTime()-this.lastConnectionEstablishedTime_>Xi&&(this.reconnectDelay_=Ki),null):(this.log_(`Window isn't visible.  Delaying reconnect.`),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());let e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_),t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_(`Trying to reconnect in `+t+`ms`),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Yi)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_(`Making a connection attempt`),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;let t=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),a=this.id+`:`+e.nextConnectionId_++,o=this.lastSessionId,s=!1,c=null,l=function(){c?c.close():(s=!0,i())},u=function(e){r(c,`sendRequest call when we're not connected not allowed.`),c.sendRequest(e)};this.realtime_={close:l,sendRequest:u};let d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{let[e,r]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);s?w(`getToken() completed but was canceled`):(w(`getToken() completed. Creating connection.`),this.authToken_=e&&e.accessToken,this.appCheckToken_=r&&r.token,c=new Ti(a,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,n,i,e=>{$n(e+` (`+this.repoInfo_.toString()+`)`),this.interrupt(Zi)},o))}catch(e){this.log_(`Failed to get token: `+e),s||(this.repoInfo_.nodeAdmin&&$n(e),l())}}}interrupt(e){w(`Interrupting connection for reason: `+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&=(clearTimeout(this.establishConnectionTimer_),null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){w(`Resuming connection for reason: `+e),delete this.interruptReasons_[e],Te(this.interruptReasons_)&&(this.reconnectDelay_=Ki,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){let t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){let t=this.outstandingPuts_[e];t&&`h`in t.request&&t.queued&&(t.onComplete&&t.onComplete(`disconnect`),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map(e=>cr(e)).join(`$`):`default`;let r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete(`permission_denied`)}removeListen_(e,t){let n=new E(e).toString(),r;if(this.listens.has(n)){let e=this.listens.get(n);r=e.get(t),e.delete(t),e.size===0&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){w(`Auth token revoked: `+e+`/`+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e===`invalid_token`||e===`permission_denied`)&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Qi&&(this.reconnectDelay_=Ji,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){w(`App check token revoked: `+e+`/`+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e===`invalid_token`||e===`permission_denied`)&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Qi&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):`msg`in e&&console.log(`FIREBASE: `+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(let e of this.listens.values())for(let t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){let e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){let e={},t=`js`;de()&&(t=this.repoInfo_.nodeAdmin?`admin_node`:`node`),e[`sdk.`+t+`.`+In.replace(/\./g,`-`)]=1,oe()?e[`framework.cordova`]=1:le()&&(e[`framework.reactnative`]=1),this.reportStats(e)}shouldReconnect_(){let e=Oi.getInstance().currentlyOnline();return Te(this.interruptReasons_)&&e}};$i.nextPersistentConnectionId_=0,$i.nextConnectionId_=0;var M=class e{constructor(e,t){this.name=e,this.node=t}static Wrap(t,n){return new e(t,n)}},ea=class{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){let n=new M(rr,e),r=new M(rr,t);return this.compare(n,r)!==0}minPost(){return M.MIN}},ta,na=class extends ea{static get __EMPTY_NODE(){return ta}static set __EMPTY_NODE(e){ta=e}compare(e,t){return ar(e.name,t.name)}isDefinedOn(e){throw i(`KeyIndex.isDefinedOn not expected to be called.`)}indexedValueChanged(e,t){return!1}minPost(){return M.MIN}maxPost(){return new M(ir,ta)}makePost(e,t){return r(typeof e==`string`,`KeyIndex indexValue must always be a string.`),new M(e,ta)}toString(){return`.key`}},ra=new na,ia=class{constructor(e,t,n,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?n(e.key,t):1,r&&(a*=-1),a<0)e=this.isReverse_?e.left:e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(t=this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},aa=class e{constructor(t,n,r,i,a){this.key=t,this.value=n,this.color=r??e.RED,this.left=i??sa.EMPTY_NODE,this.right=a??sa.EMPTY_NODE}copy(t,n,r,i,a){return new e(t??this.key,n??this.value,r??this.color,i??this.left,a??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return sa.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),t(e,n.key)===0){if(n.right.isEmpty())return sa.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){let t=this.copy(null,null,e.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){let t=this.copy(null,null,e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){return 2**this.check_()<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw Error(`Red node has red child(`+this.key+`,`+this.value+`)`);if(this.right.isRed_())throw Error(`Right child of (`+this.key+`,`+this.value+`) is red`);let e=this.left.check_();if(e!==this.right.check_())throw Error(`Black depths differ`);return e+ +!this.isRed_()}};aa.RED=!0,aa.BLACK=!1;var oa=class{copy(e,t,n,r,i){return this}insert(e,t,n){return new aa(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}},sa=class e{constructor(t,n=e.EMPTY_NODE){this.comparator_=t,this.root_=n}insert(t,n){return new e(this.comparator_,this.root_.insert(t,n,this.comparator_).copy(null,null,aa.BLACK,null,null))}remove(t){return new e(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,aa.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),t===0)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();)if(t=this.comparator_(e,n.key),t===0)if(!n.left.isEmpty()){for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else if(r)return r.key;else return null;else t<0?n=n.left:t>0&&(r=n,n=n.right);throw Error(`Attempted to find predecessor key for a nonexistent key.  What gives?`)}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ia(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ia(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ia(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ia(this.root_,null,this.comparator_,!0,e)}};sa.EMPTY_NODE=new oa;function ca(e,t){return ar(e.name,t.name)}function la(e,t){return ar(e,t)}var ua;function da(e){ua=e}var fa=function(e){return typeof e==`number`?`number:`+ur(e):`string:`+e},pa=function(e){if(e.isLeafNode()){let t=e.val();r(typeof t==`string`||typeof t==`number`||typeof t==`object`&&Ce(t,`.sv`),`Priority must be a string or number.`)}else r(e===ua||e.isEmpty(),`priority of unexpected type.`);r(e===ua||e.getPriority().isEmpty(),`Priority nodes can't have a priority of their own.`)},ma,ha=class e{static set __childrenNodeConstructor(e){ma=e}static get __childrenNodeConstructor(){return ma}constructor(t,n=e.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=n,this.lazyHash_=null,r(this.value_!==void 0&&this.value_!==null,`LeafNode shouldn't be created with null/undefined value.`),pa(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new e(this.value_,t)}getImmediateChild(t){return t===`.priority`?this.priorityNode_:e.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return j(t)?this:O(t)===`.priority`?this.priorityNode_:e.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(t,n){return t===`.priority`?this.updatePriority(n):n.isEmpty()&&t!==`.priority`?this:e.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,n).updatePriority(this.priorityNode_)}updateChild(t,n){let i=O(t);return i===null?n:n.isEmpty()&&i!==`.priority`?this:(r(i!==`.priority`||ji(t)===1,`.priority must be the last token in a path`),this.updateImmediateChild(i,e.__childrenNodeConstructor.EMPTY_NODE.updateChild(k(t),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e=``;this.priorityNode_.isEmpty()||(e+=`priority:`+fa(this.priorityNode_.val())+`:`);let t=typeof this.value_;e+=t+`:`,t===`number`?e+=ur(this.value_):e+=this.value_,this.lazyHash_=Gn(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===e.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof e.__childrenNodeConstructor?-1:(r(t.isLeafNode(),`Unknown node type`),this.compareToLeafNode_(t))}compareToLeafNode_(t){let n=typeof t.value_,i=typeof this.value_,a=e.VALUE_TYPE_ORDER.indexOf(n),o=e.VALUE_TYPE_ORDER.indexOf(i);return r(a>=0,`Unknown leaf type: `+n),r(o>=0,`Unknown leaf type: `+i),a===o?i===`object`?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:o-a}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){let t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}};ha.VALUE_TYPE_ORDER=[`object`,`boolean`,`number`,`string`];var ga,_a;function va(e){ga=e}function ya(e){_a=e}var N=new class extends ea{compare(e,t){let n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return i===0?ar(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return M.MIN}maxPost(){return new M(ir,new ha(`[PRIORITY-POST]`,_a))}makePost(e,t){return new M(t,new ha(`[PRIORITY-POST]`,ga(e)))}toString(){return`.priority`}},ba=Math.log(2),xa=class{constructor(e){let t=e=>parseInt(Math.log(e)/ba,10),n=e=>parseInt(Array(e+1).join(`1`),2);this.count=t(e+1),this.current_=this.count-1;let r=n(this.count);this.bits_=e+1&r}nextBitIsOne(){let e=!(this.bits_&1<<this.current_);return this.current_--,e}},Sa=function(e,t,n,r){e.sort(t);let i=function(t,r){let a=r-t,o,s;if(a===0)return null;if(a===1)return o=e[t],s=n?n(o):o,new aa(s,o.node,aa.BLACK,null,null);{let c=parseInt(a/2,10)+t,l=i(t,c),u=i(c+1,r);return o=e[c],s=n?n(o):o,new aa(s,o.node,aa.BLACK,l,u)}},a=function(t){let r=null,a=null,o=e.length,s=function(t,r){let a=o-t,s=o;o-=t;let l=i(a+1,s),u=e[a],d=n?n(u):u;c(new aa(d,u.node,r,null,l))},c=function(e){r?(r.left=e,r=e):(a=e,r=e)};for(let e=0;e<t.count;++e){let n=t.nextBitIsOne(),r=2**(t.count-(e+1));n?s(r,aa.BLACK):(s(r,aa.BLACK),s(r,aa.RED))}return a}(new xa(e.length));return new sa(r||t,a)},Ca,wa={},Ta=class e{static get Default(){return r(wa&&N,`ChildrenNode.ts has not been loaded`),Ca||=new e({".priority":wa},{".priority":N}),Ca}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){let t=we(this.indexes_,e);if(!t)throw Error(`No index defined for `+e);return t instanceof sa?t:null}hasIndex(e){return Ce(this.indexSet_,e.toString())}addIndex(t,n){r(t!==ra,`KeyIndex always exists and isn't meant to be added to the IndexMap.`);let i=[],a=!1,o=n.getIterator(M.Wrap),s=o.getNext();for(;s;)a||=t.isDefinedOn(s.node),i.push(s),s=o.getNext();let c;c=a?Sa(i,t.getCompare()):wa;let l=t.toString(),u={...this.indexSet_};u[l]=t;let d={...this.indexes_};return d[l]=c,new e(d,u)}addToIndexes(t,n){let i=Ee(this.indexes_,(e,i)=>{let a=we(this.indexSet_,i);if(r(a,`Missing index implementation for `+i),e===wa)if(a.isDefinedOn(t.node)){let e=[],r=n.getIterator(M.Wrap),i=r.getNext();for(;i;)i.name!==t.name&&e.push(i),i=r.getNext();return e.push(t),Sa(e,a.getCompare())}else return wa;else{let r=n.get(t.name),i=e;return r&&(i=i.remove(new M(t.name,r))),i.insert(t,t.node)}});return new e(i,this.indexSet_)}removeFromIndexes(t,n){let r=Ee(this.indexes_,e=>{if(e===wa)return e;{let r=n.get(t.name);return r?e.remove(new M(t.name,r)):e}});return new e(r,this.indexSet_)}},Ea,P=class e{static get EMPTY_NODE(){return Ea||=new e(new sa(la),null,Ta.Default)}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&pa(this.priorityNode_),this.children_.isEmpty()&&r(!this.priorityNode_||this.priorityNode_.isEmpty(),`An empty node cannot have a priority`)}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ea}updatePriority(t){return this.children_.isEmpty()?this:new e(this.children_,t,this.indexMap_)}getImmediateChild(e){if(e===`.priority`)return this.getPriority();{let t=this.children_.get(e);return t===null?Ea:t}}getChild(e){let t=O(e);return t===null?this:this.getImmediateChild(t).getChild(k(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(t,n){if(r(n,`We should always be passing snapshot nodes`),t===`.priority`)return this.updatePriority(n);{let r=new M(t,n),i,a;n.isEmpty()?(i=this.children_.remove(t),a=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(t,n),a=this.indexMap_.addToIndexes(r,this.children_));let o=i.isEmpty()?Ea:this.priorityNode_;return new e(i,o,a)}}updateChild(e,t){let n=O(e);if(n===null)return t;{r(O(e)!==`.priority`||ji(e)===1,`.priority must be the last token in a path`);let i=this.getImmediateChild(n).updateChild(k(e),t);return this.updateImmediateChild(n,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;let n={},r=0,i=0,a=!0;if(this.forEachChild(N,(o,s)=>{n[o]=s.val(t),r++,a&&e.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):a=!1}),!t&&a&&i<2*r){let e=[];for(let t in n)e[t]=n[t];return e}else return t&&!this.getPriority().isEmpty()&&(n[`.priority`]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e=``;this.getPriority().isEmpty()||(e+=`priority:`+fa(this.getPriority().val())+`:`),this.forEachChild(N,(t,n)=>{let r=n.hash();r!==``&&(e+=`:`+t+`:`+r)}),this.lazyHash_=e===``?``:Gn(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){let r=this.resolveIndex_(n);if(r){let n=r.getPredecessorKey(new M(e,t));return n?n.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){let t=this.resolveIndex_(e);if(t){let e=t.minKey();return e&&e.name}else return this.children_.minKey()}getFirstChild(e){let t=this.getFirstChildName(e);return t?new M(t,this.children_.get(t)):null}getLastChildName(e){let t=this.resolveIndex_(e);if(t){let e=t.maxKey();return e&&e.name}else return this.children_.maxKey()}getLastChild(e){let t=this.getLastChildName(e);return t?new M(t,this.children_.get(t)):null}forEachChild(e,t){let n=this.resolveIndex_(e);return n?n.inorderTraversal(e=>t(e.name,e.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){let n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,e=>e);{let n=this.children_.getIteratorFrom(e.name,M.Wrap),r=n.peek();for(;r!=null&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){let n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,e=>e);{let n=this.children_.getReverseIteratorFrom(e.name,M.Wrap),r=n.peek();for(;r!=null&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Da?-1:0}withIndex(t){if(t===ra||this.indexMap_.hasIndex(t))return this;{let n=this.indexMap_.addIndex(t,this.children_);return new e(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ra||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{let t=e;if(!this.getPriority().equals(t.getPriority()))return!1;if(this.children_.count()===t.children_.count()){let e=this.getIterator(N),n=t.getIterator(N),r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return r===null&&i===null}else return!1}}resolveIndex_(e){return e===ra?null:this.indexMap_.get(e.toString())}};P.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;var Da=new class extends P{constructor(){super(new sa(la),P.EMPTY_NODE,Ta.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return P.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(M,{MIN:{value:new M(rr,P.EMPTY_NODE)},MAX:{value:new M(ir,Da)}}),na.__EMPTY_NODE=P.EMPTY_NODE,ha.__childrenNodeConstructor=P,da(Da),ya(Da);var Oa=!0;function F(e,t=null){if(e===null)return P.EMPTY_NODE;if(typeof e==`object`&&`.priority`in e&&(t=e[`.priority`]),r(t===null||typeof t==`string`||typeof t==`number`||typeof t==`object`&&`.sv`in t,`Invalid priority type found: `+typeof t),typeof e==`object`&&`.value`in e&&e[`.value`]!==null&&(e=e[`.value`]),typeof e!=`object`||`.sv`in e)return new ha(e,F(t));if(!(e instanceof Array)&&Oa){let n=[],r=!1;if(T(e,(e,t)=>{if(e.substring(0,1)!==`.`){let i=F(t);i.isEmpty()||(r||=!i.getPriority().isEmpty(),n.push(new M(e,i)))}}),n.length===0)return P.EMPTY_NODE;let i=Sa(n,ca,e=>e.name,la);if(r){let e=Sa(n,N.getCompare());return new P(i,F(t),new Ta({".priority":e},{".priority":N}))}else return new P(i,F(t),Ta.Default)}else{let n=P.EMPTY_NODE;return T(e,(t,r)=>{if(Ce(e,t)&&t.substring(0,1)!==`.`){let e=F(r);(e.isLeafNode()||!e.isEmpty())&&(n=n.updateImmediateChild(t,e))}}),n.updatePriority(F(t))}}va(F);var ka=class extends ea{constructor(e){super(),this.indexPath_=e,r(!j(e)&&O(e)!==`.priority`,`Can't create PathIndex with empty path or .priority key`)}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){let n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return i===0?ar(e.name,t.name):i}makePost(e,t){let n=F(e);return new M(t,P.EMPTY_NODE.updateChild(this.indexPath_,n))}maxPost(){return new M(ir,P.EMPTY_NODE.updateChild(this.indexPath_,Da))}toString(){return Pi(this.indexPath_,0).join(`/`)}},Aa=new class extends ea{compare(e,t){let n=e.node.compareTo(t.node);return n===0?ar(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return M.MIN}maxPost(){return M.MAX}makePost(e,t){return new M(t,F(e))}toString(){return`.value`}};function ja(e){return{type:`value`,snapshotNode:e}}function Ma(e,t){return{type:`child_added`,snapshotNode:t,childName:e}}function Na(e,t){return{type:`child_removed`,snapshotNode:t,childName:e}}function Pa(e,t,n){return{type:`child_changed`,snapshotNode:t,childName:e,oldSnap:n}}function Fa(e,t){return{type:`child_moved`,snapshotNode:t,childName:e}}var Ia=class{constructor(e){this.index_=e}updateChild(e,t,n,i,a,o){r(e.isIndexed(this.index_),`A node must be indexed if only a child is updated`);let s=e.getImmediateChild(t);return s.getChild(i).equals(n.getChild(i))&&s.isEmpty()===n.isEmpty()||(o!=null&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(Na(t,s)):r(e.isLeafNode(),`A child remove without an old child only makes sense on a leaf node`):s.isEmpty()?o.trackChildChange(Ma(t,n)):o.trackChildChange(Pa(t,n,s))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return n!=null&&(e.isLeafNode()||e.forEachChild(N,(e,r)=>{t.hasChild(e)||n.trackChildChange(Na(e,r))}),t.isLeafNode()||t.forEachChild(N,(t,r)=>{if(e.hasChild(t)){let i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(Pa(t,r,i))}else n.trackChildChange(Ma(t,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?P.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}},La=class e{constructor(t){this.indexedFilter_=new Ia(t.getIndex()),this.index_=t.getIndex(),this.startPost_=e.getStartPost_(t),this.endPost_=e.getEndPost_(t),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){let t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,a){return this.matches(new M(t,n))||(n=P.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,a)}updateFullNode(e,t,n){t.isLeafNode()&&(t=P.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(P.EMPTY_NODE);let i=this;return t.forEachChild(N,(e,t)=>{i.matches(new M(e,t))||(r=r.updateImmediateChild(e,P.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){let t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){let t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}},Ra=class{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{let t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{let t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new La(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,a){return this.rangedFilter_.matches(new M(t,n))||(n=P.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,a):this.fullLimitUpdateChild_(e,t,n,i,a)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=P.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){r=P.EMPTY_NODE.withIndex(this.index_);let e;e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){let t=e.getNext();if(this.withinDirectionalStart(t))if(this.withinDirectionalEnd(t))r=r.updateImmediateChild(t.name,t.node),n++;else break}}else{r=t.withIndex(this.index_),r=r.updatePriority(P.EMPTY_NODE);let e;e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){let t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,P.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,i,a){let o;if(this.reverse_){let e=this.index_.getCompare();o=(t,n)=>e(n,t)}else o=this.index_.getCompare();let s=e;r(s.numChildren()===this.limit_,``);let c=new M(t,n),l=this.reverse_?s.getFirstChild(this.index_):s.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(s.hasChild(t)){let e=s.getImmediateChild(t),r=i.getChildAfterChild(this.index_,l,this.reverse_);for(;r!=null&&(r.name===t||s.hasChild(r.name));)r=i.getChildAfterChild(this.index_,r,this.reverse_);let d=r==null?1:o(r,c);if(u&&!n.isEmpty()&&d>=0)return a?.trackChildChange(Pa(t,n,e)),s.updateImmediateChild(t,n);{a?.trackChildChange(Na(t,e));let n=s.updateImmediateChild(t,P.EMPTY_NODE);return r!=null&&this.rangedFilter_.matches(r)?(a?.trackChildChange(Ma(r.name,r.node)),n.updateImmediateChild(r.name,r.node)):n}}else if(n.isEmpty())return e;else if(u)return o(l,c)>=0?(a!=null&&(a.trackChildChange(Na(l.name,l.node)),a.trackChildChange(Ma(t,n))),s.updateImmediateChild(t,n).updateImmediateChild(l.name,P.EMPTY_NODE)):e;else return e}},za=class e{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_=``,this.indexStartValue_=null,this.indexStartName_=``,this.indexEndValue_=null,this.indexEndName_=``,this.index_=N}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===``?this.startSet_:this.viewFrom_===`l`}getIndexStartValue(){return r(this.startSet_,`Only valid if start has been set`),this.indexStartValue_}getIndexStartName(){return r(this.startSet_,`Only valid if start has been set`),this.startNameSet_?this.indexStartName_:rr}hasEnd(){return this.endSet_}getIndexEndValue(){return r(this.endSet_,`Only valid if end has been set`),this.indexEndValue_}getIndexEndName(){return r(this.endSet_,`Only valid if end has been set`),this.endNameSet_?this.indexEndName_:ir}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==``}getLimit(){return r(this.limitSet_,`Only valid if limit has been set`),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===N}copy(){let t=new e;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}};function Ba(e){return e.loadsAllData()?new Ia(e.getIndex()):e.hasLimit()?new Ra(e):new La(e)}function Va(e){let t={};if(e.isDefault())return t;let n;if(e.index_===N?n=`$priority`:e.index_===Aa?n=`$value`:e.index_===ra?n=`$key`:(r(e.index_ instanceof ka,`Unrecognized index type!`),n=e.index_.toString()),t.orderBy=x(n),e.startSet_){let n=e.startAfterSet_?`startAfter`:`startAt`;t[n]=x(e.indexStartValue_),e.startNameSet_&&(t[n]+=`,`+x(e.indexStartName_))}if(e.endSet_){let n=e.endBeforeSet_?`endBefore`:`endAt`;t[n]=x(e.indexEndValue_),e.endNameSet_&&(t[n]+=`,`+x(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function Ha(e){let t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;n===``&&(n=e.isViewFromLeft()?`l`:`r`),t.vf=n}return e.index_!==N&&(t.i=e.index_.toString()),t}var Ua=class e extends Ei{reportStats(e){throw Error(`Method not implemented.`)}static getListenId_(e,t){return t===void 0?(r(e._queryParams.isDefault(),`should have a tag if it's not a default query.`),e._path.toString()):`tag$`+t}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=Xn(`p:rest:`),this.listens_={}}listen(t,n,r,i){let a=t._path.toString();this.log_(`Listen called for `+a+` `+t._queryIdentifier);let o=e.getListenId_(t,r),s={};this.listens_[o]=s;let c=Va(t._queryParams);this.restRequest_(a+`.json`,c,(e,t)=>{let n=t;if(e===404&&(n=null,e=null),e===null&&this.onDataUpdate_(a,n,!1,r),we(this.listens_,o)===s){let t;t=e?e===401?`permission_denied`:`rest_error:`+e:`ok`,i(t,null)}})}unlisten(t,n){let r=e.getListenId_(t,n);delete this.listens_[r]}get(e){let t=Va(e._queryParams),n=e._path.toString(),r=new re;return this.restRequest_(n+`.json`,t,(e,t)=>{let i=t;e===404&&(i=null,e=null),e===null?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(Error(i))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format=`export`,Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(t.auth=r.accessToken),i&&i.token&&(t.ac=i.token);let a=(this.repoInfo_.secure?`https://`:`http://`)+this.repoInfo_.host+e+`?ns=`+this.repoInfo_.namespace+ke(t);this.log_(`Sending REST request for `+a);let o=new XMLHttpRequest;o.onreadystatechange=()=>{if(n&&o.readyState===4){this.log_(`REST Response for `+a+` received. status:`,o.status,`response:`,o.responseText);let e=null;if(o.status>=200&&o.status<300){try{e=ye(o.responseText)}catch{$n(`Failed to parse JSON response for `+a+`: `+o.responseText)}n(null,e)}else o.status!==401&&o.status!==404&&$n(`Got unsuccessful REST response for `+a+` Status: `+o.status),n(o.status);n=null}},o.open(`GET`,a,!0),o.send()})}},Wa=class{constructor(){this.rootNode_=P.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}};function Ga(){return{value:null,children:new Map}}function Ka(e,t,n){if(j(t))e.value=n,e.children.clear();else if(e.value!==null)e.value=e.value.updateChild(t,n);else{let r=O(t);e.children.has(r)||e.children.set(r,Ga());let i=e.children.get(r);t=k(t),Ka(i,t,n)}}function qa(e,t,n){e.value===null?Ja(e,(e,r)=>{qa(r,new E(t.toString()+`/`+e),n)}):n(t,e.value)}function Ja(e,t){e.children.forEach((e,n)=>{t(n,e)})}var Ya=class{constructor(e){this.collection_=e,this.last_=null}get(){let e=this.collection_.get(),t={...e};return this.last_&&T(this.last_,(e,n)=>{t[e]=t[e]-n}),this.last_=e,t}},Xa=10*1e3,Za=30*1e3,Qa=300*1e3,$a=class{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Ya(e);let n=Xa+(Za-Xa)*Math.random();br(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){let e=this.statsListener_.get(),t={},n=!1;T(e,(e,r)=>{r>0&&Ce(this.statsToReport_,e)&&(t[e]=r,n=!0)}),n&&this.server_.reportStats(t),br(this.reportStats_.bind(this),Math.floor(Math.random()*2*Qa))}},eo;(function(e){e[e.OVERWRITE=0]=`OVERWRITE`,e[e.MERGE=1]=`MERGE`,e[e.ACK_USER_WRITE=2]=`ACK_USER_WRITE`,e[e.LISTEN_COMPLETE=3]=`LISTEN_COMPLETE`})(eo||={});function to(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function no(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ro(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}var io=class e{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=eo.ACK_USER_WRITE,this.source=to()}operationForChild(t){if(!j(this.path))return r(O(this.path)===t,`operationForChild called for unrelated child.`),new e(k(this.path),this.affectedTree,this.revert);if(this.affectedTree.value!=null)return r(this.affectedTree.children.isEmpty(),`affectedTree should not have overlapping affected paths.`),this;{let n=this.affectedTree.subtree(new E(t));return new e(D(),n,this.revert)}}},ao=class e{constructor(e,t){this.source=e,this.path=t,this.type=eo.LISTEN_COMPLETE}operationForChild(t){return j(this.path)?new e(this.source,D()):new e(this.source,k(this.path))}},oo=class e{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=eo.OVERWRITE}operationForChild(t){return j(this.path)?new e(this.source,D(),this.snap.getImmediateChild(t)):new e(this.source,k(this.path),this.snap)}},so=class e{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=eo.MERGE}operationForChild(t){if(j(this.path)){let n=this.children.subtree(new E(t));return n.isEmpty()?null:n.value?new oo(this.source,D(),n.value):new e(this.source,D(),n)}else return r(O(this.path)===t,`Can't get a merge for a child not on the path of the operation`),new e(this.source,k(this.path),this.children)}toString(){return`Operation(`+this.path+`: `+this.source.toString()+` merge: `+this.children.toString()+`)`}},co=class{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(j(e))return this.isFullyInitialized()&&!this.filtered_;let t=O(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}},lo=class{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}};function uo(e,t,n,r){let i=[],a=[];return t.forEach(t=>{t.type===`child_changed`&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&a.push(Fa(t.childName,t.snapshotNode))}),fo(e,i,`child_removed`,t,r,n),fo(e,i,`child_added`,t,r,n),fo(e,i,`child_moved`,a,r,n),fo(e,i,`child_changed`,t,r,n),fo(e,i,`value`,t,r,n),i}function fo(e,t,n,r,i,a){let o=r.filter(e=>e.type===n);o.sort((t,n)=>mo(e,t,n)),o.forEach(n=>{let r=po(e,n,a);i.forEach(i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))})})}function po(e,t,n){return t.type===`value`||t.type===`child_removed`||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}function mo(e,t,n){if(t.childName==null||n.childName==null)throw i(`Should only compare child_ events.`);let r=new M(t.childName,t.snapshotNode),a=new M(n.childName,n.snapshotNode);return e.index_.compare(r,a)}function ho(e,t){return{eventCache:e,serverCache:t}}function go(e,t,n,r){return ho(new co(t,n,r),e.serverCache)}function _o(e,t,n,r){return ho(e.eventCache,new co(t,n,r))}function vo(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function yo(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}var bo,xo=()=>(bo||=new sa(or),bo),So=class e{static fromObject(t){let n=new e(null);return T(t,(e,t)=>{n=n.set(new E(e),t)}),n}constructor(e,t=xo()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:D(),value:this.value};if(j(e))return null;{let n=O(e),r=this.children.get(n);if(r!==null){let i=r.findRootMostMatchingPathAndValue(k(e),t);return i==null?null:{path:A(new E(n),i.path),value:i.value}}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(t){if(j(t))return this;{let n=O(t),r=this.children.get(n);return r===null?new e(null):r.subtree(k(t))}}set(t,n){if(j(t))return new e(n,this.children);{let r=O(t),i=(this.children.get(r)||new e(null)).set(k(t),n),a=this.children.insert(r,i);return new e(this.value,a)}}remove(t){if(j(t))return this.children.isEmpty()?new e(null):new e(null,this.children);{let n=O(t),r=this.children.get(n);if(r){let i=r.remove(k(t)),a;return a=i.isEmpty()?this.children.remove(n):this.children.insert(n,i),this.value===null&&a.isEmpty()?new e(null):new e(this.value,a)}else return this}}get(e){if(j(e))return this.value;{let t=O(e),n=this.children.get(t);return n?n.get(k(e)):null}}setTree(t,n){if(j(t))return n;{let r=O(t),i=(this.children.get(r)||new e(null)).setTree(k(t),n),a;return a=i.isEmpty()?this.children.remove(r):this.children.insert(r,i),new e(this.value,a)}}fold(e){return this.fold_(D(),e)}fold_(e,t){let n={};return this.children.inorderTraversal((r,i)=>{n[r]=i.fold_(A(e,r),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,D(),t)}findOnPath_(e,t,n){let r=this.value?n(t,this.value):!1;if(r)return r;if(j(e))return null;{let r=O(e),i=this.children.get(r);return i?i.findOnPath_(k(e),A(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,D(),t)}foreachOnPath_(t,n,r){if(j(t))return this;{this.value&&r(n,this.value);let i=O(t),a=this.children.get(i);return a?a.foreachOnPath_(k(t),A(n,i),r):new e(null)}}foreach(e){this.foreach_(D(),e)}foreach_(e,t){this.children.inorderTraversal((n,r)=>{r.foreach_(A(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}},Co=class e{constructor(e){this.writeTree_=e}static empty(){return new e(new So(null))}};function wo(e,t,n){if(j(t))return new Co(new So(n));{let r=e.writeTree_.findRootMostValueAndPath(t);if(r!=null){let i=r.path,a=r.value,o=Ii(i,t);return a=a.updateChild(o,n),new Co(e.writeTree_.set(i,a))}else{let r=new So(n);return new Co(e.writeTree_.setTree(t,r))}}}function To(e,t,n){let r=e;return T(n,(e,n)=>{r=wo(r,A(t,e),n)}),r}function Eo(e,t){return j(t)?Co.empty():new Co(e.writeTree_.setTree(t,new So(null)))}function Do(e,t){return Oo(e,t)!=null}function Oo(e,t){let n=e.writeTree_.findRootMostValueAndPath(t);return n==null?null:e.writeTree_.get(n.path).getChild(Ii(n.path,t))}function ko(e){let t=[],n=e.writeTree_.value;return n==null?e.writeTree_.children.inorderTraversal((e,n)=>{n.value!=null&&t.push(new M(e,n.value))}):n.isLeafNode()||n.forEachChild(N,(e,n)=>{t.push(new M(e,n))}),t}function Ao(e,t){if(j(t))return e;{let n=Oo(e,t);return n==null?new Co(e.writeTree_.subtree(t)):new Co(new So(n))}}function jo(e){return e.writeTree_.isEmpty()}function Mo(e,t){return No(D(),e.writeTree_,t)}function No(e,t,n){if(t.value!=null)return n.updateChild(e,t.value);{let i=null;return t.children.inorderTraversal((t,a)=>{t===`.priority`?(r(a.value!==null,`Priority writes must always be leaf nodes`),i=a.value):n=No(A(e,t),a,n)}),!n.getChild(e).isEmpty()&&i!==null&&(n=n.updateChild(A(e,`.priority`),i)),n}}function Po(e,t){return rs(t,e)}function Fo(e,t,n,i,a){r(i>e.lastWriteId,`Stacking an older write on top of newer ones`),a===void 0&&(a=!0),e.allWrites.push({path:t,snap:n,writeId:i,visible:a}),a&&(e.visibleWrites=wo(e.visibleWrites,t,n)),e.lastWriteId=i}function Io(e,t,n,i){r(i>e.lastWriteId,`Stacking an older merge on top of newer ones`),e.allWrites.push({path:t,children:n,writeId:i,visible:!0}),e.visibleWrites=To(e.visibleWrites,t,n),e.lastWriteId=i}function Lo(e,t){for(let n=0;n<e.allWrites.length;n++){let r=e.allWrites[n];if(r.writeId===t)return r}return null}function Ro(e,t){let n=e.allWrites.findIndex(e=>e.writeId===t);r(n>=0,`removeWrite called with nonexistent writeId.`);let i=e.allWrites[n];e.allWrites.splice(n,1);let a=i.visible,o=!1,s=e.allWrites.length-1;for(;a&&s>=0;){let t=e.allWrites[s];t.visible&&(s>=n&&zo(t,i.path)?a=!1:zi(i.path,t.path)&&(o=!0)),s--}if(!a)return!1;if(o)return Bo(e),!0;if(i.snap)e.visibleWrites=Eo(e.visibleWrites,i.path);else{let t=i.children;T(t,t=>{e.visibleWrites=Eo(e.visibleWrites,A(i.path,t))})}return!0}function zo(e,t){if(e.snap)return zi(e.path,t);for(let n in e.children)if(e.children.hasOwnProperty(n)&&zi(A(e.path,n),t))return!0;return!1}function Bo(e){e.visibleWrites=Ho(e.allWrites,Vo,D()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}function Vo(e){return e.visible}function Ho(e,t,n){let r=Co.empty();for(let a=0;a<e.length;++a){let o=e[a];if(t(o)){let e=o.path,t;if(o.snap)zi(n,e)?(t=Ii(n,e),r=wo(r,t,o.snap)):zi(e,n)&&(t=Ii(e,n),r=wo(r,D(),o.snap.getChild(t)));else if(o.children){if(zi(n,e))t=Ii(n,e),r=To(r,t,o.children);else if(zi(e,n))if(t=Ii(e,n),j(t))r=To(r,D(),o.children);else{let e=we(o.children,O(t));if(e){let n=e.getChild(k(t));r=wo(r,D(),n)}}}else throw i(`WriteRecord should have .snap or .children`)}}return r}function Uo(e,t,n,r,i){if(!r&&!i){let r=Oo(e.visibleWrites,t);if(r!=null)return r;{let r=Ao(e.visibleWrites,t);return jo(r)?n:n==null&&!Do(r,D())?null:Mo(r,n||P.EMPTY_NODE)}}else{let a=Ao(e.visibleWrites,t);return!i&&jo(a)?n:!i&&n==null&&!Do(a,D())?null:Mo(Ho(e.allWrites,function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(zi(e.path,t)||zi(t,e.path))},t),n||P.EMPTY_NODE)}}function Wo(e,t,n){let r=P.EMPTY_NODE,i=Oo(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(N,(e,t)=>{r=r.updateImmediateChild(e,t)}),r;if(n){let i=Ao(e.visibleWrites,t);return n.forEachChild(N,(e,t)=>{let n=Mo(Ao(i,new E(e)),t);r=r.updateImmediateChild(e,n)}),ko(i).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}else return ko(Ao(e.visibleWrites,t)).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}function Go(e,t,n,i,a){r(i||a,`Either existingEventSnap or existingServerSnap must exist`);let o=A(t,n);if(Do(e.visibleWrites,o))return null;{let t=Ao(e.visibleWrites,o);return jo(t)?a.getChild(n):Mo(t,a.getChild(n))}}function Ko(e,t,n,r){let i=A(t,n);return Oo(e.visibleWrites,i)??(r.isCompleteForChild(n)?Mo(Ao(e.visibleWrites,i),r.getNode().getImmediateChild(n)):null)}function qo(e,t){return Oo(e.visibleWrites,t)}function Jo(e,t,n,r,i,a,o){let s,c=Ao(e.visibleWrites,t),l=Oo(c,D());if(l!=null)s=l;else if(n!=null)s=Mo(c,n);else return[];if(s=s.withIndex(o),!s.isEmpty()&&!s.isLeafNode()){let e=[],t=o.getCompare(),n=a?s.getReverseIteratorFrom(r,o):s.getIteratorFrom(r,o),c=n.getNext();for(;c&&e.length<i;)t(c,r)!==0&&e.push(c),c=n.getNext();return e}else return[]}function Yo(){return{visibleWrites:Co.empty(),allWrites:[],lastWriteId:-1}}function Xo(e,t,n,r){return Uo(e.writeTree,e.treePath,t,n,r)}function Zo(e,t){return Wo(e.writeTree,e.treePath,t)}function Qo(e,t,n,r){return Go(e.writeTree,e.treePath,t,n,r)}function $o(e,t){return qo(e.writeTree,A(e.treePath,t))}function es(e,t,n,r,i,a){return Jo(e.writeTree,e.treePath,t,n,r,i,a)}function ts(e,t,n){return Ko(e.writeTree,e.treePath,t,n)}function ns(e,t){return rs(A(e.treePath,t),e.writeTree)}function rs(e,t){return{treePath:e,writeTree:t}}var is=class{constructor(){this.changeMap=new Map}trackChildChange(e){let t=e.type,n=e.childName;r(t===`child_added`||t===`child_changed`||t===`child_removed`,`Only child changes supported for tracking`),r(n!==`.priority`,`Only non-priority child changes can be tracked.`);let a=this.changeMap.get(n);if(a){let r=a.type;if(t===`child_added`&&r===`child_removed`)this.changeMap.set(n,Pa(n,e.snapshotNode,a.snapshotNode));else if(t===`child_removed`&&r===`child_added`)this.changeMap.delete(n);else if(t===`child_removed`&&r===`child_changed`)this.changeMap.set(n,Na(n,a.oldSnap));else if(t===`child_changed`&&r===`child_added`)this.changeMap.set(n,Ma(n,e.snapshotNode));else if(t===`child_changed`&&r===`child_changed`)this.changeMap.set(n,Pa(n,e.snapshotNode,a.oldSnap));else throw i(`Illegal combination of changes: `+e+` occurred after `+a)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}},as=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}},os=class{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){let t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{let t=this.optCompleteServerCache_==null?this.viewCache_.serverCache:new co(this.optCompleteServerCache_,!0,!1);return ts(this.writes_,e,t)}}getChildAfterChild(e,t,n){let r=this.optCompleteServerCache_==null?yo(this.viewCache_):this.optCompleteServerCache_,i=es(this.writes_,r,t,1,n,e);return i.length===0?null:i[0]}};function ss(e){return{filter:e}}function cs(e,t){r(t.eventCache.getNode().isIndexed(e.filter.getIndex()),`Event snap not indexed`),r(t.serverCache.getNode().isIndexed(e.filter.getIndex()),`Server snap not indexed`)}function ls(e,t,n,a,o){let s=new is,c,l;if(n.type===eo.OVERWRITE){let i=n;i.source.fromUser?c=ps(e,t,i.path,i.snap,a,o,s):(r(i.source.fromServer,`Unknown source.`),l=i.source.tagged||t.serverCache.isFiltered()&&!j(i.path),c=fs(e,t,i.path,i.snap,a,o,l,s))}else if(n.type===eo.MERGE){let i=n;i.source.fromUser?c=hs(e,t,i.path,i.children,a,o,s):(r(i.source.fromServer,`Unknown source.`),l=i.source.tagged||t.serverCache.isFiltered(),c=_s(e,t,i.path,i.children,a,o,l,s))}else if(n.type===eo.ACK_USER_WRITE){let r=n;c=r.revert?bs(e,t,r.path,a,o,s):vs(e,t,r.path,r.affectedTree,a,o,s)}else if(n.type===eo.LISTEN_COMPLETE)c=ys(e,t,n.path,a,s);else throw i(`Unknown operation type: `+n.type);let u=s.getChanges();return us(t,c,u),{viewCache:c,changes:u}}function us(e,t,n){let r=t.eventCache;if(r.isFullyInitialized()){let i=r.getNode().isLeafNode()||r.getNode().isEmpty(),a=vo(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(a)||!r.getNode().getPriority().equals(a.getPriority()))&&n.push(ja(vo(t)))}}function ds(e,t,n,i,a,o){let s=t.eventCache;if($o(i,n)!=null)return t;{let c,l;if(j(n))if(r(t.serverCache.isFullyInitialized(),`If change path is empty, we must have complete server data`),t.serverCache.isFiltered()){let n=yo(t),r=Zo(i,n instanceof P?n:P.EMPTY_NODE);c=e.filter.updateFullNode(t.eventCache.getNode(),r,o)}else{let n=Xo(i,yo(t));c=e.filter.updateFullNode(t.eventCache.getNode(),n,o)}else{let u=O(n);if(u===`.priority`){r(ji(n)===1,`Can't have a priority with additional path components`);let a=s.getNode();l=t.serverCache.getNode();let o=Qo(i,n,a,l);c=o==null?s.getNode():e.filter.updatePriority(a,o)}else{let r=k(n),d;if(s.isCompleteForChild(u)){l=t.serverCache.getNode();let e=Qo(i,n,s.getNode(),l);d=e==null?s.getNode().getImmediateChild(u):s.getNode().getImmediateChild(u).updateChild(r,e)}else d=ts(i,u,t.serverCache);c=d==null?s.getNode():e.filter.updateChild(s.getNode(),u,d,r,a,o)}}return go(t,c,s.isFullyInitialized()||j(n),e.filter.filtersNodes())}}function fs(e,t,n,r,i,a,o,s){let c=t.serverCache,l,u=o?e.filter:e.filter.getIndexedFilter();if(j(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){let e=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),e,null)}else{let e=O(n);if(!c.isCompleteForPath(n)&&ji(n)>1)return t;let i=k(n),a=c.getNode().getImmediateChild(e).updateChild(i,r);l=e===`.priority`?u.updatePriority(c.getNode(),a):u.updateChild(c.getNode(),e,a,i,as,null)}let d=_o(t,l,c.isFullyInitialized()||j(n),u.filtersNodes());return ds(e,d,n,i,new os(i,d,a),s)}function ps(e,t,n,r,i,a,o){let s=t.eventCache,c,l,u=new os(i,t,a);if(j(n))l=e.filter.updateFullNode(t.eventCache.getNode(),r,o),c=go(t,l,!0,e.filter.filtersNodes());else{let i=O(n);if(i===`.priority`)l=e.filter.updatePriority(t.eventCache.getNode(),r),c=go(t,l,s.isFullyInitialized(),s.isFiltered());else{let a=k(n),l=s.getNode().getImmediateChild(i),d;if(j(a))d=r;else{let e=u.getCompleteChild(i);d=e==null?P.EMPTY_NODE:Mi(a)===`.priority`&&e.getChild(Fi(a)).isEmpty()?e:e.updateChild(a,r)}c=l.equals(d)?t:go(t,e.filter.updateChild(s.getNode(),i,d,a,u,o),s.isFullyInitialized(),e.filter.filtersNodes())}}return c}function ms(e,t){return e.eventCache.isCompleteForChild(t)}function hs(e,t,n,r,i,a,o){let s=t;return r.foreach((r,c)=>{let l=A(n,r);ms(t,O(l))&&(s=ps(e,s,l,c,i,a,o))}),r.foreach((r,c)=>{let l=A(n,r);ms(t,O(l))||(s=ps(e,s,l,c,i,a,o))}),s}function gs(e,t,n){return n.foreach((e,n)=>{t=t.updateChild(e,n)}),t}function _s(e,t,n,r,i,a,o,s){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let c=t,l;l=j(n)?r:new So(null).setTree(n,r);let u=t.serverCache.getNode();return l.children.inorderTraversal((n,r)=>{if(u.hasChild(n)){let l=gs(e,t.serverCache.getNode().getImmediateChild(n),r);c=fs(e,c,new E(n),l,i,a,o,s)}}),l.children.inorderTraversal((n,r)=>{let l=!t.serverCache.isCompleteForChild(n)&&r.value===null;if(!u.hasChild(n)&&!l){let l=gs(e,t.serverCache.getNode().getImmediateChild(n),r);c=fs(e,c,new E(n),l,i,a,o,s)}}),c}function vs(e,t,n,r,i,a,o){if($o(i,n)!=null)return t;let s=t.serverCache.isFiltered(),c=t.serverCache;if(r.value!=null){if(j(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return fs(e,t,n,c.getNode().getChild(n),i,a,s,o);if(j(n)){let r=new So(null);return c.getNode().forEachChild(ra,(e,t)=>{r=r.set(new E(e),t)}),_s(e,t,n,r,i,a,s,o)}else return t}else{let l=new So(null);return r.foreach((e,t)=>{let r=A(n,e);c.isCompleteForPath(r)&&(l=l.set(e,c.getNode().getChild(r)))}),_s(e,t,n,l,i,a,s,o)}}function ys(e,t,n,r,i){let a=t.serverCache;return ds(e,_o(t,a.getNode(),a.isFullyInitialized()||j(n),a.isFiltered()),n,r,as,i)}function bs(e,t,n,i,a,o){let s;if($o(i,n)!=null)return t;{let c=new os(i,t,a),l=t.eventCache.getNode(),u;if(j(n)||O(n)===`.priority`){let n;if(t.serverCache.isFullyInitialized())n=Xo(i,yo(t));else{let e=t.serverCache.getNode();r(e instanceof P,`serverChildren would be complete if leaf node`),n=Zo(i,e)}n=n,u=e.filter.updateFullNode(l,n,o)}else{let r=O(n),a=ts(i,r,t.serverCache);a==null&&t.serverCache.isCompleteForChild(r)&&(a=l.getImmediateChild(r)),u=a==null?t.eventCache.getNode().hasChild(r)?e.filter.updateChild(l,r,P.EMPTY_NODE,k(n),c,o):l:e.filter.updateChild(l,r,a,k(n),c,o),u.isEmpty()&&t.serverCache.isFullyInitialized()&&(s=Xo(i,yo(t)),s.isLeafNode()&&(u=e.filter.updateFullNode(u,s,o)))}return s=t.serverCache.isFullyInitialized()||$o(i,D())!=null,go(t,u,s,e.filter.filtersNodes())}}var xs=class{constructor(e,t){this.query_=e,this.eventRegistrations_=[];let n=this.query_._queryParams,r=new Ia(n.getIndex()),i=Ba(n);this.processor_=ss(i);let a=t.serverCache,o=t.eventCache,s=r.updateFullNode(P.EMPTY_NODE,a.getNode(),null),c=i.updateFullNode(P.EMPTY_NODE,o.getNode(),null),l=new co(s,a.isFullyInitialized(),r.filtersNodes()),u=new co(c,o.isFullyInitialized(),i.filtersNodes());this.viewCache_=ho(u,l),this.eventGenerator_=new lo(this.query_)}get query(){return this.query_}};function Ss(e){return e.viewCache_.serverCache.getNode()}function Cs(e){return vo(e.viewCache_)}function ws(e,t){let n=yo(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!j(t)&&!n.getImmediateChild(O(t)).isEmpty())?n.getChild(t):null}function Ts(e){return e.eventRegistrations_.length===0}function Es(e,t){e.eventRegistrations_.push(t)}function Ds(e,t,n){let i=[];if(n){r(t==null,`A cancel should cancel all event registrations.`);let a=e.query._path;e.eventRegistrations_.forEach(e=>{let t=e.createCancelEvent(n,a);t&&i.push(t)})}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){let i=e.eventRegistrations_[r];if(!i.matches(t))n.push(i);else if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}e.eventRegistrations_=n}else e.eventRegistrations_=[];return i}function Os(e,t,n,i){t.type===eo.MERGE&&t.source.queryId!==null&&(r(yo(e.viewCache_),`We should always have a full cache before handling merges`),r(vo(e.viewCache_),`Missing event cache, even though we have a server cache`));let a=e.viewCache_,o=ls(e.processor_,a,t,n,i);return cs(e.processor_,o.viewCache),r(o.viewCache.serverCache.isFullyInitialized()||!a.serverCache.isFullyInitialized(),`Once a server snap is complete, it should never go back`),e.viewCache_=o.viewCache,As(e,o.changes,o.viewCache.eventCache.getNode(),null)}function ks(e,t){let n=e.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(N,(e,t)=>{r.push(Ma(e,t))}),n.isFullyInitialized()&&r.push(ja(n.getNode())),As(e,r,n.getNode(),t)}function As(e,t,n,r){let i=r?[r]:e.eventRegistrations_;return uo(e.eventGenerator_,t,n,i)}var js,Ms=class{constructor(){this.views=new Map}};function Ns(e){r(!js,`__referenceConstructor has already been defined`),js=e}function Ps(){return r(js,`Reference.ts has not been loaded`),js}function Fs(e){return e.views.size===0}function Is(e,t,n,i){let a=t.source.queryId;if(a!==null){let o=e.views.get(a);return r(o!=null,`SyncTree gave us an op for an invalid query.`),Os(o,t,n,i)}else{let r=[];for(let a of e.views.values())r=r.concat(Os(a,t,n,i));return r}}function Ls(e,t,n,r,i){let a=t._queryIdentifier,o=e.views.get(a);if(!o){let e=Xo(n,i?r:null),a=!1;return e?a=!0:r instanceof P?(e=Zo(n,r),a=!1):(e=P.EMPTY_NODE,a=!1),new xs(t,ho(new co(e,a,!1),new co(r,i,!1)))}return o}function Rs(e,t,n,r,i,a){let o=Ls(e,t,r,i,a);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),Es(o,n),ks(o,n)}function zs(e,t,n,r){let i=t._queryIdentifier,a=[],o=[],s=Ws(e);if(i==="default")for(let[t,i]of e.views.entries())o=o.concat(Ds(i,n,r)),Ts(i)&&(e.views.delete(t),i.query._queryParams.loadsAllData()||a.push(i.query));else{let t=e.views.get(i);t&&(o=o.concat(Ds(t,n,r)),Ts(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||a.push(t.query)))}return s&&!Ws(e)&&a.push(new(Ps())(t._repo,t._path)),{removed:a,events:o}}function Bs(e){let t=[];for(let n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Vs(e,t){let n=null;for(let r of e.views.values())n||=ws(r,t);return n}function Hs(e,t){if(t._queryParams.loadsAllData())return Gs(e);{let n=t._queryIdentifier;return e.views.get(n)}}function Us(e,t){return Hs(e,t)!=null}function Ws(e){return Gs(e)!=null}function Gs(e){for(let t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}var Ks;function qs(e){r(!Ks,`__referenceConstructor has already been defined`),Ks=e}function Js(){return r(Ks,`Reference.ts has not been loaded`),Ks}var Ys=1,Xs=class{constructor(e){this.listenProvider_=e,this.syncPointTree_=new So(null),this.pendingWriteTree_=Yo(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}};function Zs(e,t,n,r,i){return Fo(e.pendingWriteTree_,t,n,r,i),i?uc(e,new oo(to(),t,n)):[]}function Qs(e,t,n,r){Io(e.pendingWriteTree_,t,n,r);let i=So.fromObject(n);return uc(e,new so(to(),t,i))}function $s(e,t,n=!1){let r=Lo(e.pendingWriteTree_,t);if(Ro(e.pendingWriteTree_,t)){let t=new So(null);return r.snap==null?T(r.children,e=>{t=t.set(new E(e),!0)}):t=t.set(D(),!0),uc(e,new io(r.path,t,n))}else return[]}function ec(e,t,n){return uc(e,new oo(no(),t,n))}function tc(e,t,n){let r=So.fromObject(n);return uc(e,new so(no(),t,r))}function nc(e,t){return uc(e,new ao(no(),t))}function rc(e,t,n){let r=gc(e,n);if(r){let n=_c(r),i=n.path,a=n.queryId,o=Ii(i,t);return vc(e,i,new ao(ro(a),o))}else return[]}function ic(e,t,n,r,i=!1){let a=t._path,o=e.syncPointTree_.get(a),s=[];if(o&&(t._queryIdentifier==="default"||Us(o,t))){let c=zs(o,t,n,r);Fs(o)&&(e.syncPointTree_=e.syncPointTree_.remove(a));let l=c.removed;if(s=c.events,!i){let n=l.findIndex(e=>e._queryParams.loadsAllData())!==-1,i=e.syncPointTree_.findOnPath(a,(e,t)=>Ws(t));if(n&&!i){let t=e.syncPointTree_.subtree(a);if(!t.isEmpty()){let n=yc(t);for(let t=0;t<n.length;++t){let r=n[t],i=r.query,a=pc(e,r);e.listenProvider_.startListening(bc(i),mc(e,i),a.hashFn,a.onComplete)}}}!i&&l.length>0&&!r&&(n?e.listenProvider_.stopListening(bc(t),null):l.forEach(t=>{let n=e.queryToTagMap.get(hc(t));e.listenProvider_.stopListening(bc(t),n)}))}xc(e,l)}return s}function ac(e,t,n,r){let i=gc(e,r);if(i!=null){let r=_c(i),a=r.path,o=r.queryId,s=Ii(a,t);return vc(e,a,new oo(ro(o),s,n))}else return[]}function oc(e,t,n,r){let i=gc(e,r);if(i){let r=_c(i),a=r.path,o=r.queryId,s=Ii(a,t),c=So.fromObject(n);return vc(e,a,new so(ro(o),s,c))}else return[]}function sc(e,t,n,i=!1){let a=t._path,o=null,s=!1;e.syncPointTree_.foreachOnPath(a,(e,t)=>{let n=Ii(e,a);o||=Vs(t,n),s||=Ws(t)});let c=e.syncPointTree_.get(a);c?(s||=Ws(c),o||=Vs(c,D())):(c=new Ms,e.syncPointTree_=e.syncPointTree_.set(a,c));let l;o==null?(l=!1,o=P.EMPTY_NODE,e.syncPointTree_.subtree(a).foreachChild((e,t)=>{let n=Vs(t,D());n&&(o=o.updateImmediateChild(e,n))})):l=!0;let u=Us(c,t);if(!u&&!t._queryParams.loadsAllData()){let n=hc(t);r(!e.queryToTagMap.has(n),`View does not exist, but we have a tag`);let i=Sc();e.queryToTagMap.set(n,i),e.tagToQueryMap.set(i,n)}let d=Po(e.pendingWriteTree_,a),f=Rs(c,t,n,d,o,l);if(!u&&!s&&!i){let n=Hs(c,t);f=f.concat(Cc(e,t,n))}return f}function cc(e,t,n){let r=e.pendingWriteTree_;return Uo(r,t,e.syncPointTree_.findOnPath(t,(e,n)=>{let r=Vs(n,Ii(e,t));if(r)return r}),n,!0)}function lc(e,t){let n=t._path,r=null;e.syncPointTree_.foreachOnPath(n,(e,t)=>{let i=Ii(e,n);r||=Vs(t,i)});let i=e.syncPointTree_.get(n);i?r||=Vs(i,D()):(i=new Ms,e.syncPointTree_=e.syncPointTree_.set(n,i));let a=r!=null,o=a?new co(r,!0,!1):null,s=Po(e.pendingWriteTree_,t._path);return Cs(Ls(i,t,s,a?o.getNode():P.EMPTY_NODE,a))}function uc(e,t){return dc(t,e.syncPointTree_,null,Po(e.pendingWriteTree_,D()))}function dc(e,t,n,r){if(j(e.path))return fc(e,t,n,r);{let i=t.get(D());n==null&&i!=null&&(n=Vs(i,D()));let a=[],o=O(e.path),s=e.operationForChild(o),c=t.children.get(o);if(c&&s){let e=n?n.getImmediateChild(o):null,t=ns(r,o);a=a.concat(dc(s,c,e,t))}return i&&(a=a.concat(Is(i,e,r,n))),a}}function fc(e,t,n,r){let i=t.get(D());n==null&&i!=null&&(n=Vs(i,D()));let a=[];return t.children.inorderTraversal((t,i)=>{let o=n?n.getImmediateChild(t):null,s=ns(r,t),c=e.operationForChild(t);c&&(a=a.concat(fc(c,i,o,s)))}),i&&(a=a.concat(Is(i,e,r,n))),a}function pc(e,t){let n=t.query,r=mc(e,n);return{hashFn:()=>(Ss(t)||P.EMPTY_NODE).hash(),onComplete:t=>{if(t===`ok`)return r?rc(e,n._path,r):nc(e,n._path);{let r=pr(t,n);return ic(e,n,null,r)}}}}function mc(e,t){let n=hc(t);return e.queryToTagMap.get(n)}function hc(e){return e._path.toString()+`$`+e._queryIdentifier}function gc(e,t){return e.tagToQueryMap.get(t)}function _c(e){let t=e.indexOf(`$`);return r(t!==-1&&t<e.length-1,`Bad queryKey.`),{queryId:e.substr(t+1),path:new E(e.substr(0,t))}}function vc(e,t,n){let i=e.syncPointTree_.get(t);return r(i,`Missing sync point for query tag that we're tracking`),Is(i,n,Po(e.pendingWriteTree_,t),null)}function yc(e){return e.fold((e,t,n)=>{if(t&&Ws(t))return[Gs(t)];{let e=[];return t&&(e=Bs(t)),T(n,(t,n)=>{e=e.concat(n)}),e}})}function bc(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(Js())(e._repo,e._path):e}function xc(e,t){for(let n=0;n<t.length;++n){let r=t[n];if(!r._queryParams.loadsAllData()){let t=hc(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}function Sc(){return Ys++}function Cc(e,t,n){let i=t._path,a=mc(e,t),o=pc(e,n),s=e.listenProvider_.startListening(bc(t),a,o.hashFn,o.onComplete),c=e.syncPointTree_.subtree(i);if(a)r(!Ws(c.value),`If we're adding a query, it shouldn't be shadowed`);else{let t=c.fold((e,t,n)=>{if(!j(e)&&t&&Ws(t))return[Gs(t).query];{let e=[];return t&&(e=e.concat(Bs(t).map(e=>e.query))),T(n,(t,n)=>{e=e.concat(n)}),e}});for(let n=0;n<t.length;++n){let r=t[n];e.listenProvider_.stopListening(bc(r),mc(e,r))}}return s}var wc=class e{constructor(e){this.node_=e}getImmediateChild(t){let n=this.node_.getImmediateChild(t);return new e(n)}node(){return this.node_}},Tc=class e{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(t){let n=A(this.path_,t);return new e(this.syncTree_,n)}node(){return cc(this.syncTree_,this.path_)}},Ec=function(e){return e||={},e.timestamp=e.timestamp||new Date().getTime(),e},Dc=function(e,t,n){if(!e||typeof e!=`object`)return e;if(r(`.sv`in e,`Unexpected leaf node or priority contents`),typeof e[`.sv`]==`string`)return Oc(e[`.sv`],t,n);if(typeof e[`.sv`]==`object`)return kc(e[`.sv`],t);r(!1,`Unexpected server value: `+JSON.stringify(e,null,2))},Oc=function(e,t,n){switch(e){case`timestamp`:return n.timestamp;default:r(!1,`Unexpected server value: `+e)}},kc=function(e,t,n){e.hasOwnProperty(`increment`)||r(!1,`Unexpected server value: `+JSON.stringify(e,null,2));let i=e.increment;typeof i!=`number`&&r(!1,`Unexpected increment value: `+i);let a=t.node();if(r(a!=null,`Expected ChildrenNode.EMPTY_NODE for nulls`),!a.isLeafNode())return i;let o=a.getValue();return typeof o==`number`?o+i:i},Ac=function(e,t,n,r){return Mc(t,new Tc(n,e),r)},jc=function(e,t,n){return Mc(e,new wc(t),n)};function Mc(e,t,n){let r=Dc(e.getPriority().val(),t.getImmediateChild(`.priority`),n),i;if(e.isLeafNode()){let i=e,a=Dc(i.getValue(),t,n);return a!==i.getValue()||r!==i.getPriority().val()?new ha(a,F(r)):e}else{let a=e;return i=a,r!==a.getPriority().val()&&(i=i.updatePriority(new ha(r))),a.forEachChild(N,(e,r)=>{let a=Mc(r,t.getImmediateChild(e),n);a!==r&&(i=i.updateImmediateChild(e,a))}),i}}var Nc=class{constructor(e=``,t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}};function Pc(e,t){let n=t instanceof E?t:new E(t),r=e,i=O(n);for(;i!==null;){let e=we(r.node.children,i)||{children:{},childCount:0};r=new Nc(i,r,e),n=k(n),i=O(n)}return r}function Fc(e){return e.node.value}function Ic(e,t){e.node.value=t,Uc(e)}function Lc(e){return e.node.childCount>0}function Rc(e){return Fc(e)===void 0&&!Lc(e)}function zc(e,t){T(e.node.children,(n,r)=>{t(new Nc(n,e,r))})}function Bc(e,t,n,r){n&&!r&&t(e),zc(e,e=>{Bc(e,t,!0,r)}),n&&r&&t(e)}function Vc(e,t,n){let r=n?e:e.parent;for(;r!==null;){if(t(r))return!0;r=r.parent}return!1}function Hc(e){return new E(e.parent===null?e.name:Hc(e.parent)+`/`+e.name)}function Uc(e){e.parent!==null&&Wc(e.parent,e.name,e)}function Wc(e,t,n){let r=Rc(n),i=Ce(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,Uc(e)):!r&&!i&&(e.node.children[t]=n.node,e.node.childCount++,Uc(e))}var Gc=/[\[\].#$\/\u0000-\u001F\u007F]/,Kc=/[\[\].#$\u0000-\u001F\u007F]/,qc=10*1024*1024,Jc=function(e){return typeof e==`string`&&e.length!==0&&!Gc.test(e)},Yc=function(e){return typeof e==`string`&&e.length!==0&&!Kc.test(e)},Xc=function(e){return e&&=e.replace(/^\/*\.info(\/|$)/,`/`),Yc(e)},Zc=function(e){return e===null||typeof e==`string`||typeof e==`number`&&!tr(e)||e&&typeof e==`object`&&Ce(e,`.sv`)},Qc=function(e,t,n,r){r&&t===void 0||$c(Le(e,`value`),t,n)},$c=function(e,t,n){let r=n instanceof E?new Bi(n,e):n;if(t===void 0)throw Error(e+`contains undefined `+Wi(r));if(typeof t==`function`)throw Error(e+`contains a function `+Wi(r)+` with contents = `+t.toString());if(tr(t))throw Error(e+`contains `+t.toString()+` `+Wi(r));if(typeof t==`string`&&t.length>qc/3&&ze(t)>qc)throw Error(e+`contains a string greater than 10485760 utf8 bytes `+Wi(r)+` ('`+t.substring(0,50)+`...')`);if(t&&typeof t==`object`){let n=!1,i=!1;if(T(t,(t,a)=>{if(t===`.value`)n=!0;else if(t!==`.priority`&&t!==`.sv`&&(i=!0,!Jc(t)))throw Error(e+` contains an invalid key (`+t+`) `+Wi(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Vi(r,t),$c(e,a,r),Hi(r)}),n&&i)throw Error(e+` contains ".value" child `+Wi(r)+` in addition to actual children.`)}},el=function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];let i=Pi(r);for(let t=0;t<i.length;t++)if(!(i[t]===`.priority`&&t===i.length-1)&&!Jc(i[t]))throw Error(e+`contains an invalid key (`+i[t]+`) in path `+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}t.sort(Li);let i=null;for(n=0;n<t.length;n++){if(r=t[n],i!==null&&zi(i,r))throw Error(e+`contains a path `+i.toString()+` that is ancestor of another path `+r.toString());i=r}},tl=function(e,t,n,r){if(r&&t===void 0)return;let i=Le(e,`values`);if(!(t&&typeof t==`object`)||Array.isArray(t))throw Error(i+` must be an object containing the children to replace.`);let a=[];T(t,(e,t)=>{let r=new E(e);if($c(i,t,A(n,r)),Mi(r)===`.priority`&&!Zc(t))throw Error(i+`contains an invalid value for '`+r.toString()+`', which must be a valid Firebase priority (a string, finite number, server value, or null).`);a.push(r)}),el(i,a)},nl=function(e,t,n,r){if(!(r&&n===void 0)&&!Yc(n))throw Error(Le(e,t)+`was an invalid path = "`+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},rl=function(e,t,n,r){n&&=n.replace(/^\/*\.info(\/|$)/,`/`),nl(e,t,n,r)},il=function(e,t){if(O(t)===`.info`)throw Error(e+` failed = Can't modify data under /.info/`)},al=function(e,t){let n=t.path.toString();if(typeof t.repoInfo.host!=`string`||t.repoInfo.host.length===0||!Jc(t.repoInfo.namespace)&&t.repoInfo.host.split(`:`)[0]!==`localhost`||n.length!==0&&!Xc(n))throw Error(Le(e,`url`)+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)},ol=class{constructor(){this.eventLists_=[],this.recursionDepth_=0}};function sl(e,t){let n=null;for(let r=0;r<t.length;r++){let i=t[r],a=i.getPath();n!==null&&!Ri(a,n.path)&&(e.eventLists_.push(n),n=null),n===null&&(n={events:[],path:a}),n.events.push(i)}n&&e.eventLists_.push(n)}function cl(e,t,n){sl(e,n),ul(e,e=>Ri(e,t))}function ll(e,t,n){sl(e,n),ul(e,e=>zi(e,t)||zi(t,e))}function ul(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){let i=e.eventLists_[r];if(i){let a=i.path;t(a)?(dl(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function dl(e){for(let t=0;t<e.events.length;t++){let n=e.events[t];if(n!==null){e.events[t]=null;let r=n.getEventRunner();qn&&w(`event: `+n.toString()),vr(r)}}}var fl=`repo_interrupt`,pl=25,ml=class{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ol,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ga(),this.transactionQueueTree_=new Nc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?`https://`:`http://`)+this.repoInfo_.host}};function hl(e,t,n){if(e.stats_=Vr(e.repoInfo_),e.forceRestClient_||yr())e.server_=new Ua(e.repoInfo_,(t,n,r,i)=>{vl(e,t,n,r,i)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>yl(e,!0),0);else{if(n!=null){if(typeof n!=`object`)throw Error(`Only objects are supported for option databaseAuthVariableOverride`);try{x(n)}catch(e){throw Error(`Invalid authOverride provided: `+e)}}e.persistentConnection_=new $i(e.repoInfo_,t,(t,n,r,i)=>{vl(e,t,n,r,i)},t=>{yl(e,t)},t=>{bl(e,t)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(t=>{e.server_.refreshAuthToken(t)}),e.appCheckProvider_.addTokenChangeListener(t=>{e.server_.refreshAppCheckToken(t.token)}),e.statsReporter_=Hr(e.repoInfo_,()=>new $a(e.stats_,e.server_)),e.infoData_=new Wa,e.infoSyncTree_=new Xs({startListening:(t,n,r,i)=>{let a=[],o=e.infoData_.getNode(t._path);return o.isEmpty()||(a=ec(e.infoSyncTree_,t._path,o),setTimeout(()=>{i(`ok`)},0)),a},stopListening:()=>{}}),xl(e,`connected`,!1),e.serverSyncTree_=new Xs({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,(n,r)=>{let a=i(n,r);ll(e.eventQueue_,t._path,a)}),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function gl(e){let t=e.infoData_.getNode(new E(`.info/serverTimeOffset`)).val()||0;return new Date().getTime()+t}function _l(e){return Ec({timestamp:gl(e)})}function vl(e,t,n,r,i){e.dataUpdateCount++;let a=new E(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let o=[];if(i)if(r){let t=Ee(n,e=>F(e));o=oc(e.serverSyncTree_,a,t,i)}else{let t=F(n);o=ac(e.serverSyncTree_,a,t,i)}else if(r){let t=Ee(n,e=>F(e));o=tc(e.serverSyncTree_,a,t)}else{let t=F(n);o=ec(e.serverSyncTree_,a,t)}let s=a;o.length>0&&(s=Il(e,a)),ll(e.eventQueue_,s,o)}function yl(e,t){xl(e,`connected`,t),t===!1&&El(e)}function bl(e,t){T(t,(t,n)=>{xl(e,t,n)})}function xl(e,t,n){let r=new E(`/.info/`+t),i=F(n);e.infoData_.updateSnapshot(r,i);let a=ec(e.infoSyncTree_,r,i);ll(e.eventQueue_,r,a)}function Sl(e){return e.nextWriteId_++}function Cl(e,t,n){let r=lc(e.serverSyncTree_,t);return r==null?e.server_.get(t).then(r=>{let i=F(r).withIndex(t._queryParams.getIndex());sc(e.serverSyncTree_,t,n,!0);let a;if(t._queryParams.loadsAllData())a=ec(e.serverSyncTree_,t._path,i);else{let n=mc(e.serverSyncTree_,t);a=ac(e.serverSyncTree_,t._path,i,n)}return ll(e.eventQueue_,t._path,a),ic(e.serverSyncTree_,t,n,null,!0),i},n=>(Al(e,`get for query `+x(t)+` failed: `+n),Promise.reject(Error(n)))):Promise.resolve(r)}function wl(e,t,n,r,i){Al(e,`set`,{path:t.toString(),value:n,priority:r});let a=_l(e),o=F(n,r),s=jc(o,cc(e.serverSyncTree_,t),a),c=Sl(e),l=Zs(e.serverSyncTree_,t,s,c,!0);sl(e.eventQueue_,l),e.server_.put(t.toString(),o.val(!0),(n,r)=>{let a=n===`ok`;a||$n(`set at `+t+` failed: `+n);let o=$s(e.serverSyncTree_,c,!a);ll(e.eventQueue_,t,o),jl(e,i,n,r)});let u=Hl(e,t);Il(e,u),ll(e.eventQueue_,u,[])}function Tl(e,t,n,r){Al(e,`update`,{path:t.toString(),value:n});let i=!0,a=_l(e),o={};if(T(n,(n,r)=>{i=!1,o[n]=Ac(A(t,n),F(r),e.serverSyncTree_,a)}),i)w(`update() called with empty data.  Don't do anything.`),jl(e,r,`ok`,void 0);else{let i=Sl(e),a=Qs(e.serverSyncTree_,t,o,i);sl(e.eventQueue_,a),e.server_.merge(t.toString(),n,(n,a)=>{let o=n===`ok`;o||$n(`update at `+t+` failed: `+n);let s=$s(e.serverSyncTree_,i,!o),c=s.length>0?Il(e,t):t;ll(e.eventQueue_,c,s),jl(e,r,n,a)}),T(n,n=>{Il(e,Hl(e,A(t,n)))}),ll(e.eventQueue_,t,[])}}function El(e){Al(e,`onDisconnectEvents`);let t=_l(e),n=Ga();qa(e.onDisconnect_,D(),(r,i)=>{let a=Ac(r,i,e.serverSyncTree_,t);Ka(n,r,a)});let r=[];qa(n,D(),(t,n)=>{r=r.concat(ec(e.serverSyncTree_,t,n)),Il(e,Hl(e,t))}),e.onDisconnect_=Ga(),ll(e.eventQueue_,D(),r)}function Dl(e,t,n){let r;r=O(t._path)===`.info`?sc(e.infoSyncTree_,t,n):sc(e.serverSyncTree_,t,n),cl(e.eventQueue_,t._path,r)}function Ol(e,t,n){let r;r=O(t._path)===`.info`?ic(e.infoSyncTree_,t,n):ic(e.serverSyncTree_,t,n),cl(e.eventQueue_,t._path,r)}function kl(e){e.persistentConnection_&&e.persistentConnection_.interrupt(fl)}function Al(e,...t){let n=``;e.persistentConnection_&&(n=e.persistentConnection_.id+`:`),w(n,...t)}function jl(e,t,n,r){t&&vr(()=>{if(n===`ok`)t(null);else{let e=(n||`error`).toUpperCase(),i=e;r&&(i+=`: `+r);let a=Error(i);a.code=e,t(a)}})}function Ml(e,t,n,i,a,o){Al(e,`transaction on `+t);let s={path:t,update:n,onComplete:i,status:null,order:Wn(),applyLocally:o,retryCount:0,unwatcher:a,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},c=Nl(e,t,void 0);s.currentInputSnapshot=c;let l=s.update(c.val());if(l===void 0)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{$c(`transaction failed: Data returned `,l,s.path),s.status=0;let n=Pc(e.transactionQueueTree_,t),i=Fc(n)||[];i.push(s),Ic(n,i);let a;typeof l==`object`&&l&&Ce(l,`.priority`)?(a=we(l,`.priority`),r(Zc(a),`Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.`)):a=(cc(e.serverSyncTree_,t)||P.EMPTY_NODE).getPriority().val();let o=_l(e),u=F(l,a),d=jc(u,c,o);s.currentOutputSnapshotRaw=u,s.currentOutputSnapshotResolved=d,s.currentWriteId=Sl(e);let f=Zs(e.serverSyncTree_,t,d,s.currentWriteId,s.applyLocally);ll(e.eventQueue_,t,f),Pl(e,e.transactionQueueTree_)}}function Nl(e,t,n){return cc(e.serverSyncTree_,t,n)||P.EMPTY_NODE}function Pl(e,t=e.transactionQueueTree_){if(t||Vl(e,t),Fc(t)){let n=zl(e,t);r(n.length>0,`Sending zero length transaction queue`),n.every(e=>e.status===0)&&Fl(e,Hc(t),n)}else Lc(t)&&zc(t,t=>{Pl(e,t)})}function Fl(e,t,n){let i=Nl(e,t,n.map(e=>e.currentWriteId)),a=i,o=i.hash();for(let e=0;e<n.length;e++){let i=n[e];r(i.status===0,`tryToSendTransactionQueue_: items in queue should all be run.`),i.status=1,i.retryCount++;let o=Ii(t,i.path);a=a.updateChild(o,i.currentOutputSnapshotRaw)}let s=a.val(!0),c=t;e.server_.put(c.toString(),s,r=>{Al(e,`transaction put response`,{path:c.toString(),status:r});let i=[];if(r===`ok`){let r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat($s(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push(()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved)),n[t].unwatcher();Vl(e,Pc(e.transactionQueueTree_,t)),Pl(e,e.transactionQueueTree_),ll(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)vr(r[e])}else{if(r===`datastale`)for(let e=0;e<n.length;e++)n[e].status===3?n[e].status=4:n[e].status=0;else{$n(`transaction at `+c.toString()+` failed: `+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}Il(e,t)}},o)}function Il(e,t){let n=Rl(e,t),r=Hc(n);return Ll(e,zl(e,n),r),r}function Ll(e,t,n){if(t.length===0)return;let i=[],a=[],o=t.filter(e=>e.status===0).map(e=>e.currentWriteId);for(let s=0;s<t.length;s++){let c=t[s],l=Ii(n,c.path),u=!1,d;if(r(l!==null,`rerunTransactionsUnderNode_: relativePath should not be null.`),c.status===4)u=!0,d=c.abortReason,a=a.concat($s(e.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=pl)u=!0,d=`maxretry`,a=a.concat($s(e.serverSyncTree_,c.currentWriteId,!0));else{let n=Nl(e,c.path,o);c.currentInputSnapshot=n;let r=t[s].update(n.val());if(r!==void 0){$c(`transaction failed: Data returned `,r,c.path);let t=F(r);typeof r==`object`&&r&&Ce(r,`.priority`)||(t=t.updatePriority(n.getPriority()));let i=c.currentWriteId,s=_l(e),l=jc(t,n,s);c.currentOutputSnapshotRaw=t,c.currentOutputSnapshotResolved=l,c.currentWriteId=Sl(e),o.splice(o.indexOf(i),1),a=a.concat(Zs(e.serverSyncTree_,c.path,l,c.currentWriteId,c.applyLocally)),a=a.concat($s(e.serverSyncTree_,i,!0))}else u=!0,d=`nodata`,a=a.concat($s(e.serverSyncTree_,c.currentWriteId,!0))}ll(e.eventQueue_,n,a),a=[],u&&(t[s].status=2,(function(e){setTimeout(e,0)})(t[s].unwatcher),t[s].onComplete&&(d===`nodata`?i.push(()=>t[s].onComplete(null,!1,t[s].currentInputSnapshot)):i.push(()=>t[s].onComplete(Error(d),!1,null))))}Vl(e,e.transactionQueueTree_);for(let e=0;e<i.length;e++)vr(i[e]);Pl(e,e.transactionQueueTree_)}function Rl(e,t){let n,r=e.transactionQueueTree_;for(n=O(t);n!==null&&Fc(r)===void 0;)r=Pc(r,n),t=k(t),n=O(t);return r}function zl(e,t){let n=[];return Bl(e,t,n),n.sort((e,t)=>e.order-t.order),n}function Bl(e,t,n){let r=Fc(t);if(r)for(let e=0;e<r.length;e++)n.push(r[e]);zc(t,t=>{Bl(e,t,n)})}function Vl(e,t){let n=Fc(t);if(n){let e=0;for(let t=0;t<n.length;t++)n[t].status!==2&&(n[e]=n[t],e++);n.length=e,Ic(t,n.length>0?n:void 0)}zc(t,t=>{Vl(e,t)})}function Hl(e,t){let n=Hc(Rl(e,t)),r=Pc(e.transactionQueueTree_,t);return Vc(r,t=>{Ul(e,t)}),Ul(e,r),Bc(r,t=>{Ul(e,t)}),n}function Ul(e,t){let n=Fc(t);if(n){let i=[],a=[],o=-1;for(let t=0;t<n.length;t++)n[t].status===3||(n[t].status===1?(r(o===t-1,`All SENT items should be at beginning of queue.`),o=t,n[t].status=3,n[t].abortReason=`set`):(r(n[t].status===0,`Unexpected transaction status in abort`),n[t].unwatcher(),a=a.concat($s(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&i.push(n[t].onComplete.bind(null,Error(`set`),!1,null))));o===-1?Ic(t,void 0):n.length=o+1,ll(e.eventQueue_,Hc(t),a);for(let e=0;e<i.length;e++)vr(i[e])}}function Wl(e){let t=``,n=e.split(`/`);for(let e=0;e<n.length;e++)if(n[e].length>0){let r=n[e];try{r=decodeURIComponent(r.replace(/\+/g,` `))}catch{}t+=`/`+r}return t}function Gl(e){let t={};e.charAt(0)===`?`&&(e=e.substring(1));for(let n of e.split(`&`)){if(n.length===0)continue;let r=n.split(`=`);r.length===2?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):$n(`Invalid query segment '${n}' in query '${e}'`)}return t}var Kl=function(e,t){let n=ql(e),r=n.namespace;n.domain===`firebase.com`&&Qn(n.host+` is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead`),(!r||r===`undefined`)&&n.domain!==`localhost`&&Qn(`Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com`),n.secure||er();let i=n.scheme===`ws`||n.scheme===`wss`;return{repoInfo:new Fr(n.host,n.secure,r,i,t,``,r!==n.subdomain),path:new E(n.pathString)}},ql=function(e){let t=``,n=``,r=``,i=``,a=``,o=!0,s=`https`,c=443;if(typeof e==`string`){let l=e.indexOf(`//`);l>=0&&(s=e.substring(0,l-1),e=e.substring(l+2));let u=e.indexOf(`/`);u===-1&&(u=e.length);let d=e.indexOf(`?`);d===-1&&(d=e.length),t=e.substring(0,Math.min(u,d)),u<d&&(i=Wl(e.substring(u,d)));let f=Gl(e.substring(Math.min(e.length,d)));l=t.indexOf(`:`),l>=0?(o=s===`https`||s===`wss`,c=parseInt(t.substring(l+1),10)):l=t.length;let p=t.slice(0,l);if(p.toLowerCase()===`localhost`)n=`localhost`;else if(p.split(`.`).length<=2)n=p;else{let e=t.indexOf(`.`);r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),a=r}`ns`in f&&(a=f.ns)}return{host:t,port:c,domain:n,subdomain:r,secure:o,scheme:s,pathString:i,namespace:a}},Jl=`-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`,Yl=(function(){let e=0,t=[];return function(n){let i=n===e;e=n;let a,o=Array(8);for(a=7;a>=0;a--)o[a]=Jl.charAt(n%64),n=Math.floor(n/64);r(n===0,`Cannot push at time == 0`);let s=o.join(``);if(i){for(a=11;a>=0&&t[a]===63;a--)t[a]=0;t[a]++}else for(a=0;a<12;a++)t[a]=Math.floor(Math.random()*64);for(a=0;a<12;a++)s+=Jl.charAt(t[a]);return r(s.length===20,`nextPushId: Length should be 20.`),s}})(),Xl=class{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){let e=this.snapshot.ref;return this.eventType===`value`?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+`:`+this.eventType+`:`+x(this.snapshot.exportVal())}},Zl=class{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return`cancel`}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+`:cancel`}},Ql=class{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return r(this.hasCancelCallback,`Raising a cancel event on a listener with no cancel callback`),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}},$l=class e{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return j(this._path)?null:Mi(this._path)}get ref(){return new eu(this._repo,this._path)}get _queryIdentifier(){let e=cr(Ha(this._queryParams));return e===`{}`?`default`:e}get _queryObject(){return Ha(this._queryParams)}isEqual(t){if(t=S(t),!(t instanceof e))return!1;let n=this._repo===t._repo,r=Ri(this._path,t._path),i=this._queryIdentifier===t._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Ni(this._path)}},eu=class e extends $l{constructor(e,t){super(e,t,new za,!1)}get parent(){let t=Fi(this._path);return t===null?null:new e(this._repo,t)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}},tu=class e{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(t){let n=new E(t),r=nu(this.ref,t);return new e(this._node.getChild(n),r,N)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(t){return!this._node.isLeafNode()&&!!this._node.forEachChild(this._index,(n,r)=>t(new e(r,nu(this.ref,n),N)))}hasChild(e){let t=new E(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function I(e,t){return e=S(e),e._checkNotDeleted(`ref`),t===void 0?e._root:nu(e._root,t)}function nu(e,t){return e=S(e),O(e._path)===null?rl(`child`,`path`,t,!1):nl(`child`,`path`,t,!1),new eu(e._repo,A(e._path,t))}function ru(e,t){e=S(e),il(`push`,e._path),Qc(`push`,t,e._path,!0);let n=Yl(gl(e._repo)),r=nu(e,n),i=nu(e,n),a;return a=t==null?Promise.resolve(i):R(i,t).then(()=>i),r.then=a.then.bind(a),r.catch=a.then.bind(a,void 0),r}function L(e){return il(`remove`,e._path),R(e,null)}function R(e,t){e=S(e),il(`set`,e._path),Qc(`set`,t,e._path,!1);let n=new re;return wl(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function iu(e,t){tl(`update`,t,e._path,!1);let n=new re;return Tl(e._repo,e._path,t,n.wrapCallback(()=>{})),n.promise}function z(e){e=S(e);let t=new au(new Ql(()=>{}));return Cl(e._repo,e,t).then(t=>new tu(t,new eu(e._repo,e._path),e._queryParams.getIndex()))}var au=class e{constructor(e){this.callbackContext=e}respondsTo(e){return e===`value`}createEvent(e,t){let n=t._queryParams.getIndex();return new Xl(`value`,this,new tu(e.snapshotNode,new eu(t._repo,t._path),n))}getEventRunner(e){return e.getEventType()===`cancel`?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Zl(this,e,t):null}matches(t){return t instanceof e?!t.callbackContext||!this.callbackContext||t.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}},ou=class e{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e===`children_added`?`child_added`:e;return t=t===`children_removed`?`child_removed`:t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Zl(this,e,t):null}createEvent(e,t){r(e.childName!=null,`Child events should have a childName.`);let n=nu(new eu(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new Xl(e.type,this,new tu(e.snapshotNode,n,i),e.prevName)}getEventRunner(e){return e.getEventType()===`cancel`?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(t){return t instanceof e&&this.eventType===t.eventType&&(!this.callbackContext||!t.callbackContext||this.callbackContext.matches(t.callbackContext))}hasAnyCallback(){return!!this.callbackContext}};function su(e,t,n,r,i){let a;if(typeof r==`object`&&(a=void 0,i=r),typeof r==`function`&&(a=r),i&&i.onlyOnce){let t=n,r=(n,r)=>{Ol(e._repo,e,s),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}let o=new Ql(n,a||void 0),s=t===`value`?new au(o):new ou(t,o);return Dl(e._repo,e,s),()=>Ol(e._repo,e,s)}function cu(e,t,n,r){return su(e,`value`,t,n,r)}function lu(e,t,n){let r=null,i=n?new Ql(n):null;t===`value`?r=new au(i):t&&(r=new ou(t,i)),Ol(e._repo,e,r)}Ns(eu),qs(eu);var uu=`FIREBASE_DATABASE_EMULATOR_HOST`,du={},fu=!1;function pu(e,t,n,r){let i=t.lastIndexOf(`:`);e.repoInfo_=new Fr(t,Be(t.substring(0,i)),e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(e.authTokenProvider_=r)}function mu(e,t,n,r,i){let a=r||e.options.databaseURL;a===void 0&&(e.options.projectId||Qn(`Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().`),w(`Using default host for project `,e.options.projectId),a=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o=Kl(a,i),s=o.repoInfo,c,l;typeof process<`u`&&(l={}[uu]),l?(c=!0,a=`http://${l}?ns=${s.namespace}`,o=Kl(a,i),s=o.repoInfo):c=!o.repoInfo.secure;let u=i&&c?new Cr(Cr.OWNER):new Sr(e.name,e.options,t);return al(`Invalid Firebase Database URL`,o),j(o.path)||Qn(`Database URL must point to the root of a Firebase Database (not including a child path).`),new _u(gu(s,e,u,new xr(e,n)),e)}function hu(e,t){let n=du[t];(!n||n[e.key]!==e)&&Qn(`Database ${t}(${e.repoInfo_}) has already been deleted.`),kl(e),delete n[e.key]}function gu(e,t,n,r){let i=du[t.name];i||(i={},du[t.name]=i);let a=i[e.toURLString()];return a&&Qn(`Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.`),a=new ml(e,fu,n,r),i[e.toURLString()]=a,a}var _u=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type=`database`,this._instanceStarted=!1}get _repo(){return this._instanceStarted||=(hl(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),!0),this._repoInternal}get _root(){return this._rootInternal||=new eu(this._repo,D()),this._rootInternal}_delete(){return this._rootInternal!==null&&(hu(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Qn(`Cannot call `+e+` on a deleted database.`)}};function vu(e=hn(),t){let n=ln(e,`database`).getImmediate({identifier:t});if(!n._instanceStarted){let e=ee(`database`);e&&yu(n,...e)}return n}function yu(e,t,n,r={}){e=S(e),e._checkNotDeleted(`useEmulator`);let i=`${t}:${n}`,a=e._repoInternal;if(e._instanceStarted){if(i===e._repoInternal.repoInfo_.host&&De(r,a.repoInfo_.emulatorOptions))return;Qn(`connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.`)}let o;a.repoInfo_.nodeAdmin?(r.mockUserToken&&Qn(`mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".`),o=new Cr(Cr.OWNER)):r.mockUserToken&&(o=new Cr(typeof r.mockUserToken==`string`?r.mockUserToken:ie(r.mockUserToken,e.app.options.projectId))),Be(t)&&Ve(t),pu(a,i,r,o)}function bu(e){Ln(pn),cn(new He(`database`,(e,{instanceIdentifier:t})=>mu(e.getProvider(`app`).getImmediate(),e.getProvider(`auth-internal`),e.getProvider(`app-check-internal`),t),`PUBLIC`).setMultipleInstances(!0)),gn(Pn,Fn,e),gn(Pn,Fn,`esm2020`)}var xu=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function Su(e,t,n){if(e=S(e),il(`Reference.transaction`,e._path),e.key===`.length`||e.key===`.keys`)throw`Reference.transaction failed: `+e.key+` is a read-only object.`;let r=n?.applyLocally??!0,i=new re,a=(t,n,r)=>{let a=null;t?i.reject(t):(a=new tu(r,new eu(e._repo,e._path),N),i.resolve(new xu(n,a)))},o=cu(e,()=>{});return Ml(e._repo,e._path,t,a,o,r),i.promise}$i.prototype.simpleListen=function(e,t){this.sendRequest(`q`,{p:e},t)},$i.prototype.echo=function(e,t){this.sendRequest(`echo`,{d:e},t)},bu();function Cu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var wu=Cu,Tu=new ge(`auth`,`Firebase`,Cu()),Eu=new $e(`@firebase/auth`);function Du(e,...t){Eu.logLevel<=C.WARN&&Eu.warn(`Auth (${pn}): ${e}`,...t)}function Ou(e,...t){Eu.logLevel<=C.ERROR&&Eu.error(`Auth (${pn}): ${e}`,...t)}function ku(e,...t){throw Pu(e,...t)}function Au(e,...t){return Pu(e,...t)}function ju(e,t,n){return new ge(`auth`,`Firebase`,{...wu(),[t]:n}).create(t,{appName:e.name})}function Mu(e){return ju(e,`operation-not-supported-in-this-environment`,`Operations that alter the current user are not supported in conjunction with FirebaseServerApp`)}function Nu(e,t,n){let r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&ku(e,`argument-error`),ju(e,`argument-error`,`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Pu(e,...t){if(typeof e!=`string`){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Tu.create(e,...t)}function B(e,t,...n){if(!e)throw Pu(t,...n)}function Fu(e){let t=`INTERNAL ASSERTION FAILED: `+e;throw Ou(t),Error(t)}function Iu(e,t){e||Fu(t)}function Lu(){return typeof self<`u`&&self.location?.href||``}function Ru(){return zu()===`http:`||zu()===`https:`}function zu(){return typeof self<`u`&&self.location?.protocol||null}function Bu(){return typeof navigator<`u`&&navigator&&`onLine`in navigator&&typeof navigator.onLine==`boolean`&&(Ru()||ce()||`connection`in navigator)?navigator.onLine:!0}function Vu(){if(typeof navigator>`u`)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}var Hu=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Iu(t>e,`Short delay should be less than long delay!`),this.isMobile=oe()||le()}get(){return Bu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Uu(e,t){Iu(e.emulator,`Emulator should always be set here`);let{url:n}=e.emulator;return t?`${n}${t.startsWith(`/`)?t.slice(1):t}`:n}var Wu=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<`u`&&`fetch`in self)return self.fetch;if(typeof globalThis<`u`&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<`u`)return fetch;Fu(`Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<`u`&&`Headers`in self)return self.Headers;if(typeof globalThis<`u`&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<`u`)return Headers;Fu(`Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<`u`&&`Response`in self)return self.Response;if(typeof globalThis<`u`&&globalThis.Response)return globalThis.Response;if(typeof Response<`u`)return Response;Fu(`Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}},Gu={CREDENTIAL_MISMATCH:`custom-token-mismatch`,MISSING_CUSTOM_TOKEN:`internal-error`,INVALID_IDENTIFIER:`invalid-email`,MISSING_CONTINUE_URI:`internal-error`,INVALID_PASSWORD:`wrong-password`,MISSING_PASSWORD:`missing-password`,INVALID_LOGIN_CREDENTIALS:`invalid-credential`,EMAIL_EXISTS:`email-already-in-use`,PASSWORD_LOGIN_DISABLED:`operation-not-allowed`,INVALID_IDP_RESPONSE:`invalid-credential`,INVALID_PENDING_TOKEN:`invalid-credential`,FEDERATED_USER_ID_ALREADY_LINKED:`credential-already-in-use`,MISSING_REQ_TYPE:`internal-error`,EMAIL_NOT_FOUND:`user-not-found`,RESET_PASSWORD_EXCEED_LIMIT:`too-many-requests`,EXPIRED_OOB_CODE:`expired-action-code`,INVALID_OOB_CODE:`invalid-action-code`,MISSING_OOB_CODE:`internal-error`,CREDENTIAL_TOO_OLD_LOGIN_AGAIN:`requires-recent-login`,INVALID_ID_TOKEN:`invalid-user-token`,TOKEN_EXPIRED:`user-token-expired`,USER_NOT_FOUND:`user-token-expired`,TOO_MANY_ATTEMPTS_TRY_LATER:`too-many-requests`,PASSWORD_DOES_NOT_MEET_REQUIREMENTS:`password-does-not-meet-requirements`,INVALID_CODE:`invalid-verification-code`,INVALID_SESSION_INFO:`invalid-verification-id`,INVALID_TEMPORARY_PROOF:`invalid-credential`,MISSING_SESSION_INFO:`missing-verification-id`,SESSION_EXPIRED:`code-expired`,MISSING_ANDROID_PACKAGE_NAME:`missing-android-pkg-name`,UNAUTHORIZED_DOMAIN:`unauthorized-continue-uri`,INVALID_OAUTH_CLIENT_ID:`invalid-oauth-client-id`,ADMIN_ONLY_OPERATION:`admin-restricted-operation`,INVALID_MFA_PENDING_CREDENTIAL:`invalid-multi-factor-session`,MFA_ENROLLMENT_NOT_FOUND:`multi-factor-info-not-found`,MISSING_MFA_ENROLLMENT_ID:`missing-multi-factor-info`,MISSING_MFA_PENDING_CREDENTIAL:`missing-multi-factor-session`,SECOND_FACTOR_EXISTS:`second-factor-already-in-use`,SECOND_FACTOR_LIMIT_EXCEEDED:`maximum-second-factor-count-exceeded`,BLOCKING_FUNCTION_ERROR_RESPONSE:`internal-error`,RECAPTCHA_NOT_ENABLED:`recaptcha-not-enabled`,MISSING_RECAPTCHA_TOKEN:`missing-recaptcha-token`,INVALID_RECAPTCHA_TOKEN:`invalid-recaptcha-token`,INVALID_RECAPTCHA_ACTION:`invalid-recaptcha-action`,MISSING_CLIENT_TYPE:`missing-client-type`,MISSING_RECAPTCHA_VERSION:`missing-recaptcha-version`,INVALID_RECAPTCHA_VERSION:`invalid-recaptcha-version`,INVALID_REQ_TYPE:`invalid-req-type`},Ku=[`/v1/accounts:signInWithCustomToken`,`/v1/accounts:signInWithEmailLink`,`/v1/accounts:signInWithIdp`,`/v1/accounts:signInWithPassword`,`/v1/accounts:signInWithPhoneNumber`,`/v1/token`],qu=new Hu(3e4,6e4);function V(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function H(e,t,n,r,i={}){return Ju(e,i,async()=>{let i={},a={};r&&(t===`GET`?a=r:i={body:JSON.stringify(r)});let o=ke({...a,key:e.config.apiKey}).slice(1),s=await e._getAdditionalHeaders();s[`Content-Type`]=`application/json`,e.languageCode&&(s[`X-Firebase-Locale`]=e.languageCode);let c={method:t,headers:s,...i};return se()||(c.referrerPolicy=`strict-origin-when-cross-origin`),e.emulatorConfig&&Be(e.emulatorConfig.host)&&(c.credentials=`include`),Wu.fetch()(await Xu(e,e.config.apiHost,n,o),c)})}async function Ju(e,t,n){e._canInitEmulator=!1;let r={...Gu,...t};try{let t=new Qu(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let a=await i.json();if(`needConfirmation`in a)throw $u(e,`account-exists-with-different-credential`,a);if(i.ok&&!(`errorMessage`in a))return a;{let[t,n]=(i.ok?a.errorMessage:a.error.message).split(` : `);if(t===`FEDERATED_USER_ID_ALREADY_LINKED`)throw $u(e,`credential-already-in-use`,a);if(t===`EMAIL_EXISTS`)throw $u(e,`email-already-in-use`,a);if(t===`USER_DISABLED`)throw $u(e,`user-disabled`,a);let o=r[t]||t.toLowerCase().replace(/[_\s]+/g,`-`);if(n)throw ju(e,o,n);ku(e,o)}}catch(t){if(t instanceof he)throw t;ku(e,`network-request-failed`,{message:String(t)})}}async function Yu(e,t,n,r,i={}){let a=await H(e,t,n,r,i);return`mfaPendingCredential`in a&&ku(e,`multi-factor-auth-required`,{_serverResponse:a}),a}async function Xu(e,t,n,r){let i=`${t}${n}?${r}`,a=e,o=a.config.emulator?Uu(e.config,i):`${e.config.apiScheme}://${i}`;return Ku.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()===`COOKIE`)?a._getPersistence()._getFinalTarget(o).toString():o}function Zu(e){switch(e){case`ENFORCE`:return`ENFORCE`;case`AUDIT`:return`AUDIT`;case`OFF`:return`OFF`;default:return`ENFORCEMENT_STATE_UNSPECIFIED`}}var Qu=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(Au(this.auth,`network-request-failed`)),qu.get())})}};function $u(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=Au(e,t,r);return i.customData._tokenResponse=n,i}function ed(e){return e!==void 0&&e.enterprise!==void 0}var td=class{constructor(e){if(this.siteKey=``,this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw Error(`recaptchaKey undefined`);this.siteKey=e.recaptchaKey.split(`/`)[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Zu(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)===`ENFORCE`||this.getProviderEnforcementState(e)===`AUDIT`}isAnyProviderEnabled(){return this.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)||this.isProviderEnabled(`PHONE_PROVIDER`)}};async function nd(e,t){return H(e,`GET`,`/v2/recaptchaConfig`,V(e,t))}async function rd(e,t){return H(e,`POST`,`/v1/accounts:delete`,t)}async function id(e,t){return H(e,`POST`,`/v1/accounts:lookup`,t)}function ad(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function od(e,t=!1){let n=S(e),r=await n.getIdToken(t),i=cd(r);B(i&&i.exp&&i.auth_time&&i.iat,n.auth,`internal-error`);let a=typeof i.firebase==`object`?i.firebase:void 0,o=a?.sign_in_provider;return{claims:i,token:r,authTime:ad(sd(i.auth_time)),issuedAtTime:ad(sd(i.iat)),expirationTime:ad(sd(i.exp)),signInProvider:o||null,signInSecondFactor:a?.sign_in_second_factor||null}}function sd(e){return Number(e)*1e3}function cd(e){let[t,n,r]=e.split(`.`);if(t===void 0||n===void 0||r===void 0)return Ou(`JWT malformed, contained fewer than 3 sections`),null;try{let e=d(n);return e?JSON.parse(e):(Ou(`Failed to decode base64 JWT payload`),null)}catch(e){return Ou(`Caught error parsing JWT payload as JSON`,e?.toString()),null}}function ld(e){let t=cd(e);return B(t,`internal-error`),B(t.exp!==void 0,`internal-error`),B(t.iat!==void 0,`internal-error`),Number(t.exp)-Number(t.iat)}async function ud(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof he&&dd(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}function dd({code:e}){return e===`auth/user-disabled`||e===`auth/user-token-expired`}var fd=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;let e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code===`auth/network-request-failed`&&this.schedule(!0);return}this.schedule()}},pd=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ad(this.lastLoginAt),this.creationTime=ad(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function md(e){let t=e.auth,n=await ud(e,id(t,{idToken:await e.getIdToken()}));B(n?.users.length,t,`internal-error`);let r=n.users[0];e._notifyReloadListener(r);let i=r.providerUserInfo?.length?_d(r.providerUserInfo):[],a=gd(e.providerData,i),o=e.isAnonymous,s=!(e.email&&r.passwordHash)&&!a?.length,c=o?s:!1,l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new pd(r.createdAt,r.lastLoginAt),isAnonymous:c};Object.assign(e,l)}async function hd(e){let t=S(e);await md(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function gd(e,t){return[...e.filter(e=>!t.some(t=>t.providerId===e.providerId)),...t]}function _d(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||``,displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function vd(e,t){let n=await Ju(e,{},async()=>{let n=ke({grant_type:`refresh_token`,refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,a=await Xu(e,r,`/v1/token`,`key=${i}`),o=await e._getAdditionalHeaders();o[`Content-Type`]=`application/x-www-form-urlencoded`;let s={method:`POST`,headers:o,body:n};return e.emulatorConfig&&Be(e.emulatorConfig.host)&&(s.credentials=`include`),Wu.fetch()(a,s)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function yd(e,t){return H(e,`POST`,`/v2/accounts:revokeToken`,V(e,t))}var bd=class e{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,`internal-error`),B(e.idToken!==void 0,`internal-error`),B(e.refreshToken!==void 0,`internal-error`);let t=`expiresIn`in e&&e.expiresIn!==void 0?Number(e.expiresIn):ld(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){B(e.length!==0,`internal-error`);let t=ld(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,`user-token-expired`),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await vd(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(t,n){let{refreshToken:r,accessToken:i,expirationTime:a}=n,o=new e;return r&&(B(typeof r==`string`,`internal-error`,{appName:t}),o.refreshToken=r),i&&(B(typeof i==`string`,`internal-error`,{appName:t}),o.accessToken=i),a&&(B(typeof a==`number`,`internal-error`,{appName:t}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new e,this.toJSON())}_performRefresh(){return Fu(`not implemented`)}};function xd(e,t){B(typeof e==`string`||e===void 0,`internal-error`,{appName:t})}var Sd=class e{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId=`firebase`,this.proactiveRefresh=new fd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new pd(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){let t=await ud(this,this.stsTokenManager.getToken(this.auth,e));return B(t,this.auth,`internal-error`),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return od(this,e)}reload(){return hd(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,`internal-error`),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(t){let n=new e({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){B(!this.reloadListener,this.auth,`internal-error`),this.reloadListener=e,this.reloadUserInfo&&=(this._notifyReloadListener(this.reloadUserInfo),null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await md(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(un(this.auth.app))return Promise.reject(Mu(this.auth));let e=await this.getIdToken();return await ud(this,rd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||``}static _fromJSON(t,n){let r=n.displayName??void 0,i=n.email??void 0,a=n.phoneNumber??void 0,o=n.photoURL??void 0,s=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:p,providerData:m,stsTokenManager:h}=n;B(d&&h,t,`internal-error`);let g=bd.fromJSON(this.name,h);B(typeof d==`string`,t,`internal-error`),xd(r,t.name),xd(i,t.name),B(typeof f==`boolean`,t,`internal-error`),B(typeof p==`boolean`,t,`internal-error`),xd(a,t.name),xd(o,t.name),xd(s,t.name),xd(c,t.name),xd(l,t.name),xd(u,t.name);let _=new e({uid:d,auth:t,email:i,emailVerified:f,displayName:r,isAnonymous:p,photoURL:o,phoneNumber:a,tenantId:s,stsTokenManager:g,createdAt:l,lastLoginAt:u});return m&&Array.isArray(m)&&(_.providerData=m.map(e=>({...e}))),c&&(_._redirectEventId=c),_}static async _fromIdTokenResponse(t,n,r=!1){let i=new bd;i.updateFromServerResponse(n);let a=new e({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await md(a),a}static async _fromGetAccountInfoResponse(t,n,r){let i=n.users[0];B(i.localId!==void 0,`internal-error`);let a=i.providerUserInfo===void 0?[]:_d(i.providerUserInfo),o=!(i.email&&i.passwordHash)&&!a?.length,s=new bd;s.updateFromIdToken(r);let c=new e({uid:i.localId,auth:t,stsTokenManager:s,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new pd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!a?.length};return Object.assign(c,l),c}},Cd=new Map;function wd(e){Iu(e instanceof Function,`Expected a class definition`);let t=Cd.get(e);return t?(Iu(t instanceof e,`Instance stored in cache mismatched with class`),t):(t=new e,Cd.set(e,t),t)}var Td=class{constructor(){this.type=`NONE`,this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Td.type=`NONE`;var Ed=Td;function Dd(e,t,n){return`firebase:${e}:${t}:${n}`}var Od=class e{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=Dd(this.userKey,r.apiKey,i),this.fullPersistenceKey=Dd(`persistence`,r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e==`string`){let t=await id(this.auth,{idToken:e}).catch(()=>void 0);return t?Sd._fromGetAccountInfoResponse(this.auth,t,e):null}return Sd._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r=`authUser`){if(!n.length)return new e(wd(Ed),t,r);let i=(await Promise.all(n.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),a=i[0]||wd(Ed),o=Dd(r,t.config.apiKey,t.name),s=null;for(let e of n)try{let n=await e._get(o);if(n){let r;if(typeof n==`string`){let e=await id(t,{idToken:n}).catch(()=>void 0);if(!e)break;r=await Sd._fromGetAccountInfoResponse(t,e,n)}else r=Sd._fromJSON(t,n);e!==a&&(s=r),a=e;break}}catch{}let c=i.filter(e=>e._shouldAllowMigration);return!a._shouldAllowMigration||!c.length?new e(a,t,r):(a=c[0],s&&await a._set(o,s.toJSON()),await Promise.all(n.map(async e=>{if(e!==a)try{await e._remove(o)}catch{}})),new e(a,t,r))}};function kd(e){let t=e.toLowerCase();if(t.includes(`opera/`)||t.includes(`opr/`)||t.includes(`opios/`))return`Opera`;if(Nd(t))return`IEMobile`;if(t.includes(`msie`)||t.includes(`trident/`))return`IE`;if(t.includes(`edge/`))return`Edge`;if(Ad(t))return`Firefox`;if(t.includes(`silk/`))return`Silk`;if(Fd(t))return`Blackberry`;if(Id(t))return`Webos`;if(jd(t))return`Safari`;if((t.includes(`chrome/`)||Md(t))&&!t.includes(`edge/`))return`Chrome`;if(Pd(t))return`Android`;{let t=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(t?.length===2)return t[1]}return`Other`}function Ad(e=ae()){return/firefox\//i.test(e)}function jd(e=ae()){let t=e.toLowerCase();return t.includes(`safari/`)&&!t.includes(`chrome/`)&&!t.includes(`crios/`)&&!t.includes(`android`)}function Md(e=ae()){return/crios\//i.test(e)}function Nd(e=ae()){return/iemobile/i.test(e)}function Pd(e=ae()){return/android/i.test(e)}function Fd(e=ae()){return/blackberry/i.test(e)}function Id(e=ae()){return/webos/i.test(e)}function Ld(e=ae()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Rd(e=ae()){return Ld(e)&&!!window.navigator?.standalone}function zd(){return ue()&&document.documentMode===10}function Bd(e=ae()){return Ld(e)||Pd(e)||Id(e)||Fd(e)||/windows phone/i.test(e)||Nd(e)}function Vd(e,t=[]){let n;switch(e){case`Browser`:n=kd(ae());break;case`Worker`:n=`${kd(ae())}-${e}`;break;default:n=e}let r=t.length?t.join(`,`):`FirebaseCore-web`;return`${n}/JsCore/${pn}/${r}`}var Hd=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{n(e(t))}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(let e of t)try{e()}catch{}throw this.auth._errorFactory.create(`login-blocked`,{originalMessage:e?.message})}}};async function Ud(e,t={}){return H(e,`GET`,`/v2/passwordPolicy`,V(e,t))}var Wd=6,Gd=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Wd,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState===`ENFORCEMENT_STATE_UNSPECIFIED`&&(this.enforcementState=`OFF`),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join(``)??``,this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&=t.meetsMinPasswordLength??!0,t.isValid&&=t.meetsMaxPasswordLength??!0,t.isValid&&=t.containsLowercaseLetter??!0,t.isValid&&=t.containsUppercaseLetter??!0,t.isValid&&=t.containsNumericCharacter??!0,t.isValid&&=t.containsNonAlphanumericCharacter??!0,t}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>=`a`&&n<=`z`,n>=`A`&&n<=`Z`,n>=`0`&&n<=`9`,this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||=t),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||=n),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||=r),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||=i)}},Kd=class{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Jd(this),this.idTokenSubscription=new Jd(this),this.beforeStateQueue=new Hd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=wd(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Od.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await id(this,{idToken:e}),n=await Sd._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn(`FirebaseServerApp could not login user with provided authIdToken: `,e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(un(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),n=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,a=await this.tryRedirectSignIn(e);(!t||t===i)&&a?.user&&(n=a.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,`argument-error`),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await md(e)}catch(e){if(e?.code!==`auth/network-request-failed`)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vu()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(un(this.app))return Promise.reject(Mu(this));let t=e?S(e):null;return t&&B(t.auth.config.apiKey===this.config.apiKey,this,`invalid-user-token`),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,`tenant-id-mismatch`),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return un(this.app)?Promise.reject(Mu(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return un(this.app)?Promise.reject(Mu(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(wd(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion===this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?t.validatePassword(e):Promise.reject(this._errorFactory.create(`unsupported-password-policy-schema-version`,{}))}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new Gd(await Ud(this));this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ge(`auth`,`Firebase`,e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:`apple.com`,tokenType:`ACCESS_TOKEN`,token:e,idToken:await this.currentUser.getIdToken()};this.tenantId!=null&&(t.tenantId=this.tenantId),await yd(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&wd(e)||this._popupRedirectResolver;B(t,this,`argument-error`),this.redirectPersistenceManager=await Od.create(this,[wd(t._redirectPersistence)],`redirectUser`),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i=typeof t==`function`?t:t.next.bind(t),a=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(o,this,`internal-error`),o.then(()=>{a||i(this.currentUser)}),typeof t==`function`){let i=e.addObserver(t,n,r);return()=>{a=!0,i()}}else{let n=e.addObserver(t);return()=>{a=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,`internal-error`),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Vd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e[`X-Firebase-gmpid`]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e[`X-Firebase-Client`]=t);let n=await this._getAppCheckToken();return n&&(e[`X-Firebase-AppCheck`]=n),e}async _getAppCheckToken(){if(un(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Du(`Error while retrieving App Check token: ${e.error}`),e?.token}};function qd(e){return S(e)}var Jd=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ne(e=>this.observer=e)}get next(){return B(this.observer,this.auth,`internal-error`),this.observer.next.bind(this.observer)}},Yd={async loadJS(){throw Error(`Unable to load external scripts`)},recaptchaV2Script:``,recaptchaEnterpriseScript:``,gapiScript:``};function Xd(e){Yd=e}function Zd(e){return Yd.loadJS(e)}function Qd(){return Yd.recaptchaEnterpriseScript}function $d(){return Yd.gapiScript}function ef(e){return`__${e}${Math.floor(Math.random()*1e6)}`}var tf=class{constructor(){this.enterprise=new nf}ready(e){e()}execute(e,t){return Promise.resolve(`token`)}render(e,t){return``}},nf=class{ready(e){e()}execute(e,t){return Promise.resolve(`token`)}render(e,t){return``}},rf=`recaptcha-enterprise`,af=`NO_RECAPTCHA`,of=`onFirebaseAuthREInstanceReady`,sf=class e{constructor(e){this.type=rf,this.auth=qd(e)}async verify(t=`verify`,n=!1){async function r(e){if(!n){if(e.tenantId==null&&e._agentRecaptchaConfig!=null)return e._agentRecaptchaConfig.siteKey;if(e.tenantId!=null&&e._tenantRecaptchaConfigs[e.tenantId]!==void 0)return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{nd(e,{clientType:`CLIENT_TYPE_WEB`,version:`RECAPTCHA_ENTERPRISE`}).then(r=>{if(r.recaptchaKey===void 0)n(Error(`recaptcha Enterprise site key undefined`));else{let n=new td(r);return e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function i(e,n,r){let i=window.grecaptcha;ed(i)?i.enterprise.ready(()=>{i.enterprise.execute(e,{action:t}).then(e=>{n(e)}).catch(()=>{n(af)})}):r(Error(`No reCAPTCHA enterprise script loaded.`))}return this.auth.settings.appVerificationDisabledForTesting?new tf().execute(`siteKey`,{action:`verify`}):new Promise((t,a)=>{r(this.auth).then(async r=>{if(!n&&ed(window.grecaptcha)&&e.scriptInjectionDeferred)await e.scriptInjectionDeferred.promise,i(r,t,a);else{if(typeof window>`u`){a(Error(`RecaptchaVerifier is only supported in browser`));return}let n=Qd();n.length!==0&&(n+=r+`&onload=${of}`),e.scriptInjectionDeferred=new re,window[of]=()=>{e.scriptInjectionDeferred?.resolve()},Zd(n).then(()=>e.scriptInjectionDeferred?.promise).then(()=>{i(r,t,a)}).catch(e=>{a(e)})}}).catch(e=>{a(e)})})}};sf.scriptInjectionDeferred=null;async function cf(e,t,n,r=!1,i=!1){let a=new sf(e),o;if(i)o=af;else try{o=await a.verify(n)}catch{o=await a.verify(n,!0)}let s={...t};if(n===`mfaSmsEnrollment`||n===`mfaSmsSignIn`){if(`phoneEnrollmentInfo`in s){let e=s.phoneEnrollmentInfo.phoneNumber,t=s.phoneEnrollmentInfo.recaptchaToken;Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:`CLIENT_TYPE_WEB`,recaptchaVersion:`RECAPTCHA_ENTERPRISE`}})}else if(`phoneSignInInfo`in s){let e=s.phoneSignInInfo.recaptchaToken;Object.assign(s,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:`CLIENT_TYPE_WEB`,recaptchaVersion:`RECAPTCHA_ENTERPRISE`}})}return s}return r?Object.assign(s,{captchaResp:o}):Object.assign(s,{captchaResponse:o}),Object.assign(s,{clientType:`CLIENT_TYPE_WEB`}),Object.assign(s,{recaptchaVersion:`RECAPTCHA_ENTERPRISE`}),s}async function lf(e,t,n,r,i){return i===`EMAIL_PASSWORD_PROVIDER`?e._getRecaptchaConfig()?.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)?r(e,await cf(e,t,n,n===`getOobCode`)):r(e,t).catch(async i=>i.code===`auth/missing-recaptcha-token`?(console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`),r(e,await cf(e,t,n,n===`getOobCode`))):Promise.reject(i)):i===`PHONE_PROVIDER`?e._getRecaptchaConfig()?.isProviderEnabled(`PHONE_PROVIDER`)?r(e,await cf(e,t,n)).catch(async i=>e._getRecaptchaConfig()?.getProviderEnforcementState(`PHONE_PROVIDER`)===`AUDIT`&&(i.code===`auth/missing-recaptcha-token`||i.code===`auth/invalid-app-credential`)?(console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`),r(e,await cf(e,t,n,!1,!0))):Promise.reject(i)):r(e,await cf(e,t,n,!1,!0)):Promise.reject(i+` provider is not supported.`)}async function uf(e){let t=qd(e),n=new td(await nd(t,{clientType:`CLIENT_TYPE_WEB`,version:`RECAPTCHA_ENTERPRISE`}));t.tenantId==null?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,n.isAnyProviderEnabled()&&new sf(t).verify()}function df(e,t){let n=ln(e,`auth`);if(n.isInitialized()){let e=n.getImmediate();if(De(n.getOptions(),t??{}))return e;ku(e,`already-initialized`)}return n.initialize({options:t})}function ff(e,t){let n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(wd);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function pf(e,t,n){let r=qd(e);B(/^https?:\/\//.test(t),r,`invalid-emulator-scheme`);let i=!!n?.disableWarnings,a=mf(t),{host:o,port:s}=hf(t),c=s===null?``:`:${s}`,l={url:`${a}//${o}${c}/`},u=Object.freeze({host:o,port:s,protocol:a.replace(`:`,``),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){B(r.config.emulator&&r.emulatorConfig,r,`emulator-config-failed`),B(De(l,r.config.emulator)&&De(u,r.emulatorConfig),r,`emulator-config-failed`);return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,Be(o)?Ve(`${a}//${o}${c}`):i||_f()}function mf(e){let t=e.indexOf(`:`);return t<0?``:e.substr(0,t+1)}function hf(e){let t=mf(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:``,port:null};let r=n[2].split(`@`).pop()||``,i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:gf(r.substr(e.length+1))}}else{let[e,t]=r.split(`:`);return{host:e,port:gf(t)}}}function gf(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}function _f(){function e(){let e=document.createElement(`p`),t=e.style;e.innerText=`Running in emulator mode. Do not use with production credentials.`,t.position=`fixed`,t.width=`100%`,t.backgroundColor=`#ffffff`,t.border=`.1em solid #000000`,t.color=`#b50000`,t.bottom=`0px`,t.left=`0px`,t.margin=`0px`,t.zIndex=`10000`,t.textAlign=`center`,e.classList.add(`firebase-emulator-warning`),document.body.appendChild(e)}typeof console<`u`&&typeof console.info==`function`&&console.info(`WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`),typeof window<`u`&&typeof document<`u`&&(document.readyState===`loading`?window.addEventListener(`DOMContentLoaded`,e):e())}var vf=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Fu(`not implemented`)}_getIdTokenResponse(e){return Fu(`not implemented`)}_linkToIdToken(e,t){return Fu(`not implemented`)}_getReauthenticationResolver(e){return Fu(`not implemented`)}};async function yf(e,t){return H(e,`POST`,`/v1/accounts:update`,t)}async function bf(e,t){return H(e,`POST`,`/v1/accounts:signUp`,t)}async function xf(e,t){return Yu(e,`POST`,`/v1/accounts:signInWithPassword`,V(e,t))}async function Sf(e,t){return Yu(e,`POST`,`/v1/accounts:signInWithEmailLink`,V(e,t))}async function Cf(e,t){return Yu(e,`POST`,`/v1/accounts:signInWithEmailLink`,V(e,t))}var wf=class e extends vf{constructor(e,t,n,r=null){super(`password`,n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(t,n){return new e(t,n,`password`)}static _fromEmailAndCode(t,n,r=null){return new e(t,n,`emailLink`,r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e==`string`?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod===`password`)return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod===`emailLink`)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case`password`:return lf(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:`CLIENT_TYPE_WEB`},`signInWithPassword`,xf,`EMAIL_PASSWORD_PROVIDER`);case`emailLink`:return Sf(e,{email:this._email,oobCode:this._password});default:ku(e,`internal-error`)}}async _linkToIdToken(e,t){switch(this.signInMethod){case`password`:return lf(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:`CLIENT_TYPE_WEB`},`signUpPassword`,bf,`EMAIL_PASSWORD_PROVIDER`);case`emailLink`:return Cf(e,{idToken:t,email:this._email,oobCode:this._password});default:ku(e,`internal-error`)}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Tf(e,t){return Yu(e,`POST`,`/v1/accounts:signInWithIdp`,V(e,t))}var Ef=`http://localhost`,Df=class e extends vf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){let n=new e(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):ku(`argument-error`),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){let{providerId:n,signInMethod:r,...i}=typeof t==`string`?JSON.parse(t):t;if(!n||!r)return null;let a=new e(n,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){return Tf(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,Tf(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Tf(e,t)}buildRequest(){let e={requestUri:Ef,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ke(t)}return e}};async function Of(e,t){return H(e,`POST`,`/v1/accounts:sendVerificationCode`,V(e,t))}async function kf(e,t){return Yu(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,V(e,t))}async function Af(e,t){let n=await Yu(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,V(e,t));if(n.temporaryProof)throw $u(e,`account-exists-with-different-credential`,n);return n}var jf={USER_NOT_FOUND:`user-not-found`};async function Mf(e,t){return Yu(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,V(e,{...t,operation:`REAUTH`}),jf)}var Nf=class e extends vf{constructor(e){super(`phone`,`phone`),this.params=e}static _fromVerification(t,n){return new e({verificationId:t,verificationCode:n})}static _fromTokenResponse(t,n){return new e({phoneNumber:t,temporaryProof:n})}_getIdTokenResponse(e){return kf(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Af(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Mf(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(t){typeof t==`string`&&(t=JSON.parse(t));let{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:a}=t;return!r&&!n&&!i&&!a?null:new e({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:a})}};function Pf(e){switch(e){case`recoverEmail`:return`RECOVER_EMAIL`;case`resetPassword`:return`PASSWORD_RESET`;case`signIn`:return`EMAIL_SIGNIN`;case`verifyEmail`:return`VERIFY_EMAIL`;case`verifyAndChangeEmail`:return`VERIFY_AND_CHANGE_EMAIL`;case`revertSecondFactorAddition`:return`REVERT_SECOND_FACTOR_ADDITION`;default:return null}}function Ff(e){let t=Ae(je(e)).link,n=t?Ae(je(t)).deep_link_id:null,r=Ae(je(e)).deep_link_id;return(r?Ae(je(r)).link:null)||r||n||t||e}var If=class e{constructor(e){let t=Ae(je(e)),n=t.apiKey??null,r=t.oobCode??null,i=Pf(t.mode??null);B(n&&r&&i,`argument-error`),this.apiKey=n,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(t){let n=Ff(t);try{return new e(n)}catch{return null}}},Lf=class e{constructor(){this.providerId=e.PROVIDER_ID}static credential(e,t){return wf._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=If.parseLink(t);return B(n,`argument-error`),wf._fromEmailAndCode(e,n.code,n.tenantId)}};Lf.PROVIDER_ID=`password`,Lf.EMAIL_PASSWORD_SIGN_IN_METHOD=`password`,Lf.EMAIL_LINK_SIGN_IN_METHOD=`emailLink`;var Rf=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}},zf=class extends Rf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}},Bf=class e extends zf{constructor(){super(`facebook.com`)}static credential(t){return Df._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};Bf.FACEBOOK_SIGN_IN_METHOD=`facebook.com`,Bf.PROVIDER_ID=`facebook.com`;var Vf=class e extends zf{constructor(){super(`google.com`),this.addScope(`profile`)}static credential(t,n){return Df._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return e.credential(n,r)}catch{return null}}};Vf.GOOGLE_SIGN_IN_METHOD=`google.com`,Vf.PROVIDER_ID=`google.com`;var Hf=class e extends zf{constructor(){super(`github.com`)}static credential(t){return Df._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};Hf.GITHUB_SIGN_IN_METHOD=`github.com`,Hf.PROVIDER_ID=`github.com`;var Uf=class e extends zf{constructor(){super(`twitter.com`)}static credential(t,n){return Df._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return e.credential(n,r)}catch{return null}}};Uf.TWITTER_SIGN_IN_METHOD=`twitter.com`,Uf.PROVIDER_ID=`twitter.com`;async function Wf(e,t){return Yu(e,`POST`,`/v1/accounts:signUp`,V(e,t))}var Gf=class e{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){let a=await Sd._fromIdTokenResponse(t,r,i),o=Kf(r);return new e({user:a,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);let i=Kf(r);return new e({user:t,providerId:i,_tokenResponse:r,operationType:n})}};function Kf(e){return e.providerId?e.providerId:`phoneNumber`in e?`phone`:null}var qf=class e extends he{constructor(t,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,e.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new e(t,n,r,i)}};function Jf(e,t,n,r){return(t===`reauthenticate`?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{throw n.code===`auth/multi-factor-auth-required`?qf._fromErrorAndOperation(e,n,t,r):n})}async function Yf(e,t,n=!1){let r=await ud(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Gf._forOperation(e,`link`,r)}async function Xf(e,t,n=!1){let{auth:r}=e;if(un(r.app))return Promise.reject(Mu(r));let i=`reauthenticate`;try{let a=await ud(e,Jf(r,i,t,e),n);B(a.idToken,r,`internal-error`);let o=cd(a.idToken);B(o,r,`internal-error`);let{sub:s}=o;return B(e.uid===s,r,`user-mismatch`),Gf._forOperation(e,i,a)}catch(e){throw e?.code===`auth/user-not-found`&&ku(r,`user-mismatch`),e}}async function Zf(e,t,n=!1){if(un(e.app))return Promise.reject(Mu(e));let r=`signIn`,i=await Jf(e,r,t),a=await Gf._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(a.user),a}async function Qf(e,t){return Zf(qd(e),t)}async function $f(e){let t=qd(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function ep(e,t,n){if(un(e.app))return Promise.reject(Mu(e));let r=qd(e),i=await lf(r,{returnSecureToken:!0,email:t,password:n,clientType:`CLIENT_TYPE_WEB`},`signUpPassword`,Wf,`EMAIL_PASSWORD_PROVIDER`).catch(t=>{throw t.code===`auth/password-does-not-meet-requirements`&&$f(e),t}),a=await Gf._fromIdTokenResponse(r,`signIn`,i);return await r._updateCurrentUser(a.user),a}function tp(e,t,n){return un(e.app)?Promise.reject(Mu(e)):Qf(S(e),Lf.credential(t,n)).catch(async t=>{throw t.code===`auth/password-does-not-meet-requirements`&&$f(e),t})}async function np(e,t){return H(e,`POST`,`/v1/accounts:createAuthUri`,V(e,t))}async function rp(e,t){let n={identifier:t,continueUri:Ru()?Lu():`http://localhost`},{signinMethods:r}=await np(S(e),n);return r||[]}function ip(e,t){return ap(S(e),null,t)}async function ap(e,t,n){let{auth:r}=e,i={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(i.email=t),n&&(i.password=n);let a=await ud(e,yf(r,i));await e._updateTokensIfNecessary(a,!0)}function op(e,t,n,r){return S(e).onIdTokenChanged(t,n,r)}function sp(e,t,n){return S(e).beforeAuthStateChanged(t,n)}function cp(e,t,n,r){return S(e).onAuthStateChanged(t,n,r)}function lp(e){return S(e).signOut()}function up(e,t){return H(e,`POST`,`/v2/accounts/mfaEnrollment:start`,V(e,t))}function dp(e,t){return H(e,`POST`,`/v2/accounts/mfaEnrollment:finalize`,V(e,t))}function fp(e,t){return H(e,`POST`,`/v2/accounts/mfaEnrollment:start`,V(e,t))}function pp(e,t){return H(e,`POST`,`/v2/accounts/mfaEnrollment:finalize`,V(e,t))}var mp=`__sak`,hp=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(mp,`1`),this.storage.removeItem(mp),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}},gp=1e3,_p=10,vp=class extends hp{constructor(){super(()=>window.localStorage,`LOCAL`),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Bd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let e=this.storage.getItem(n);!t&&this.localCache[n]===e||this.notifyListeners(n,e)},i=this.storage.getItem(n);zd()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,_p):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent(`storage`,{key:e,oldValue:t,newValue:n}),!0)})},gp)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}attachListener(){window.addEventListener(`storage`,this.boundEventHandler)}detachListener(){window.removeEventListener(`storage`,this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};vp.type=`LOCAL`;var yp=vp,bp=1e3;function xp(e){let t=e.replace(/[\\^$.*+?()[\]{}|]/g,`\\$&`),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function Sp(e){return`${window.location.protocol===`http:`?`__dev_`:`__HOST-`}FIREBASE_${e.split(`:`)[3]}`}var Cp=class{constructor(){this.type=`COOKIE`,this.listenerUnsubscribes=new Map}_getFinalTarget(e){let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set(`finalTarget`,e),t}async _isAvailable(){return typeof isSecureContext==`boolean`&&!isSecureContext||typeof navigator>`u`||typeof document>`u`?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=Sp(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:xp(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let t=Sp(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch(`/__cookies__`,{method:`DELETE`}).catch(()=>void 0)}_addListener(e,t){if(!this._isAvailable())return;let n=Sp(e);if(window.cookieStore){let e=(e=>{let r=e.changed.find(e=>e.name===n);r&&t(r.value),e.deleted.find(e=>e.name===n)&&t(null)});return this.listenerUnsubscribes.set(t,()=>window.cookieStore.removeEventListener(`change`,e)),window.cookieStore.addEventListener(`change`,e)}let r=xp(n),i=setInterval(()=>{let e=xp(n);e!==r&&(t(e),r=e)},bp);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){let n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}};Cp.type=`COOKIE`;var wp=class extends hp{constructor(){super(()=>window.sessionStorage,`SESSION`)}_addListener(e,t){}_removeListener(e,t){}};wp.type=`SESSION`;var Tp=wp;function Ep(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}var Dp=class e{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){let n=this.receivers.find(e=>e.isListeningto(t));if(n)return n;let r=new e(t);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!a?.size)return;t.ports[0].postMessage({status:`ack`,eventId:n,eventType:r});let o=await Ep(Array.from(a).map(async e=>e(t.origin,i)));t.ports[0].postMessage({status:`done`,eventId:n,eventType:r,response:o})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener(`message`,this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener(`message`,this.boundEventHandler)}};Dp.receivers=[];function Op(e=``,t=10){let n=``;for(let e=0;e<t;e++)n+=Math.floor(Math.random()*10);return e+n}var kp=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener(`message`,e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r=typeof MessageChannel<`u`?new MessageChannel:null;if(!r)throw Error(`connection_unavailable`);let i,a;return new Promise((o,s)=>{let c=Op(``,20);r.port1.start();let l=setTimeout(()=>{s(Error(`unsupported_event`))},n);a={messageChannel:r,onMessage(e){let t=e;if(t.data.eventId===c)switch(t.data.status){case`ack`:clearTimeout(l),i=setTimeout(()=>{s(Error(`timeout`))},3e3);break;case`done`:clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),s(Error(`invalid_response`));break}}},this.handlers.add(a),r.port1.addEventListener(`message`,a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function Ap(){return window}function jp(e){Ap().location.href=e}function Mp(){return Ap().WorkerGlobalScope!==void 0&&typeof Ap().importScripts==`function`}async function Np(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Pp(){return navigator?.serviceWorker?.controller||null}function Fp(){return Mp()?self:null}var Ip=`firebaseLocalStorageDb`,Lp=1,Rp=`firebaseLocalStorage`,zp=`fbase_key`,Bp=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener(`success`,()=>{e(this.request.result)}),this.request.addEventListener(`error`,()=>{t(this.request.error)})})}};function Vp(e,t){return e.transaction([Rp],t?`readwrite`:`readonly`).objectStore(Rp)}function Hp(){return new Bp(indexedDB.deleteDatabase(Ip)).toPromise()}function Up(){let e=indexedDB.open(Ip,Lp);return new Promise((t,n)=>{e.addEventListener(`error`,()=>{n(e.error)}),e.addEventListener(`upgradeneeded`,()=>{let t=e.result;try{t.createObjectStore(Rp,{keyPath:zp})}catch(e){n(e)}}),e.addEventListener(`success`,async()=>{let n=e.result;n.objectStoreNames.contains(Rp)?t(n):(n.close(),await Hp(),t(await Up()))})})}async function Wp(e,t,n){return new Bp(Vp(e,!0).put({[zp]:t,value:n})).toPromise()}async function Gp(e,t){let n=await new Bp(Vp(e,!1).get(t)).toPromise();return n===void 0?null:n.value}function Kp(e,t){return new Bp(Vp(e,!0).delete(t)).toPromise()}var qp=800,Jp=3,Yp=class{constructor(){this.type=`LOCAL`,this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Up(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{return await e(await this._openDb())}catch(e){if(t++>Jp)throw e;this.dbPromise&&=((await this.dbPromise).close(),null)}}async initializeServiceWorkerMessaging(){return Mp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Dp._getInstance(Fp()),this.receiver._subscribe(`keyChanged`,async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe(`ping`,async(e,t)=>[`keyChanged`])}async initializeSender(){if(this.activeServiceWorker=await Np(),!this.activeServiceWorker)return;this.sender=new kp(this.activeServiceWorker);let e=await this.sender._send(`ping`,{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes(`keyChanged`)&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Pp()!==this.activeServiceWorker))try{await this.sender._send(`keyChanged`,{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Wp(e,mp,`1`),await Kp(e,mp)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Wp(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>Gp(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Kp(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new Bp(Vp(e,!1).getAll()).toPromise());if(!e||this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),qp)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Yp.type=`LOCAL`;var Xp=Yp;function Zp(e,t){return H(e,`POST`,`/v2/accounts/mfaSignIn:start`,V(e,t))}function Qp(e,t){return H(e,`POST`,`/v2/accounts/mfaSignIn:finalize`,V(e,t))}function $p(e,t){return H(e,`POST`,`/v2/accounts/mfaSignIn:finalize`,V(e,t))}ef(`rcb`),new Hu(3e4,6e4);var em=`recaptcha`;async function tm(e,t,n){if(!e._getRecaptchaConfig())try{await uf(e)}catch{console.log(`Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.`)}try{let r;if(r=typeof t==`string`?{phoneNumber:t}:t,`session`in r){let t=r.session;if(`phoneNumber`in r)return B(t.type===`enroll`,e,`internal-error`),(await lf(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:`CLIENT_TYPE_WEB`}},`mfaSmsEnrollment`,async(e,t)=>t.phoneEnrollmentInfo.captchaResponse===af?(B(n?.type===em,e,`argument-error`),up(e,await nm(e,t,n))):up(e,t),`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo;{B(t.type===`signin`,e,`internal-error`);let i=r.multiFactorHint?.uid||r.multiFactorUid;return B(i,e,`missing-multi-factor-info`),(await lf(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:`CLIENT_TYPE_WEB`}},`mfaSmsSignIn`,async(e,t)=>t.phoneSignInInfo.captchaResponse===af?(B(n?.type===em,e,`argument-error`),Zp(e,await nm(e,t,n))):Zp(e,t),`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}else return(await lf(e,{phoneNumber:r.phoneNumber,clientType:`CLIENT_TYPE_WEB`},`sendVerificationCode`,async(e,t)=>t.captchaResponse===af?(B(n?.type===em,e,`argument-error`),Of(e,await nm(e,t,n))):Of(e,t),`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).sessionInfo}finally{n?._reset()}}async function nm(e,t,n){B(n.type===em,e,`argument-error`);let r=await n.verify();B(typeof r==`string`,e,`argument-error`);let i={...t};if(`phoneEnrollmentInfo`in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,a=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:a}}),i}else if(`phoneSignInInfo`in i){let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var rm=class e{constructor(t){this.providerId=e.PROVIDER_ID,this.auth=qd(t)}verifyPhoneNumber(e,t){return tm(this.auth,e,S(t))}static credential(e,t){return Nf._fromVerification(e,t)}static credentialFromResult(t){let n=t;return e.credentialFromTaggedObject(n)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?Nf._fromTokenResponse(t,n):null}};rm.PROVIDER_ID=`phone`,rm.PHONE_SIGN_IN_METHOD=`phone`;function im(e,t){return t?wd(t):(B(e._popupRedirectResolver,e,`argument-error`),e._popupRedirectResolver)}var am=class extends vf{constructor(e){super(`custom`,`custom`),this.params=e}_getIdTokenResponse(e){return Tf(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Tf(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Tf(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function om(e){return Zf(e.auth,new am(e),e.bypassAuthState)}function sm(e){let{auth:t,user:n}=e;return B(n,t,`internal-error`),Xf(n,new am(e),e.bypassAuthState)}async function cm(e){let{auth:t,user:n}=e;return B(n,t,`internal-error`),Yf(n,new am(e),e.bypassAuthState)}var lm=class{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:a,type:o}=e;if(a){this.reject(a);return}let s={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(s))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case`signInViaPopup`:case`signInViaRedirect`:return om;case`linkViaPopup`:case`linkViaRedirect`:return cm;case`reauthViaPopup`:case`reauthViaRedirect`:return sm;default:ku(this.auth,`internal-error`)}}resolve(e){Iu(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Iu(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}},um=new Hu(2e3,1e4);async function dm(e,t,n){if(un(e.app))return Promise.reject(Au(e,`operation-not-supported-in-this-environment`));let r=qd(e);return Nu(e,t,Rf),new fm(r,`signInViaPopup`,t,im(r,n)).executeNotNull()}var fm=class e extends lm{constructor(t,n,r,i,a){super(t,n,i,a),this.provider=r,this.authWindow=null,this.pollId=null,e.currentPopupAction&&e.currentPopupAction.cancel(),e.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return B(e,this.auth,`internal-error`),e}async onExecution(){Iu(this.filter.length===1,`Popup operations only handle one event`);let e=Op();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Au(this.auth,`web-storage-unsupported`))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Au(this.auth,`cancelled-popup-request`))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,e.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Au(this.auth,`popup-closed-by-user`))},8e3);return}this.pollId=window.setTimeout(e,um.get())};e()}};fm.currentPopupAction=null;var pm=`pendingRedirect`,mm=new Map,hm=class extends lm{constructor(e,t,n=!1){super(e,[`signInViaRedirect`,`linkViaRedirect`,`reauthViaRedirect`,`unknown`],t,void 0,n),this.eventId=null}async execute(){let e=mm.get(this.auth._key());if(!e){try{let t=await gm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}mm.set(this.auth._key(),e)}return this.bypassAuthState||mm.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type===`signInViaRedirect`)return super.onAuthEvent(e);if(e.type===`unknown`){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function gm(e,t){let n=ym(t),r=vm(e);if(!await r._isAvailable())return!1;let i=await r._get(n)===`true`;return await r._remove(n),i}function _m(e,t){mm.set(e._key(),t)}function vm(e){return wd(e._redirectPersistence)}function ym(e){return Dd(pm,e.config.apiKey,e.name)}async function bm(e,t,n=!1){if(un(e.app))return Promise.reject(Mu(e));let r=qd(e),i=await new hm(r,im(r,t),n).execute();return i&&!n&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,t)),i}var xm=600*1e3,Sm=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Tm(e)?t:(this.hasHandledPotentialRedirect=!0,t||=(this.queuedRedirectEvent=e,!0),t)}sendToConsumer(e,t){if(e.error&&!wm(e)){let n=e.error.code?.split(`auth/`)[1]||`internal-error`;t.onError(Au(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xm&&this.cachedEventUids.clear(),this.cachedEventUids.has(Cm(e))}saveEventToCache(e){this.cachedEventUids.add(Cm(e)),this.lastProcessedEventTime=Date.now()}};function Cm(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join(`-`)}function wm({type:e,error:t}){return e===`unknown`&&t?.code===`auth/no-auth-event`}function Tm(e){switch(e.type){case`signInViaRedirect`:case`linkViaRedirect`:case`reauthViaRedirect`:return!0;case`unknown`:return wm(e);default:return!1}}async function Em(e,t={}){return H(e,`GET`,`/v1/projects`,t)}var Dm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Om=/^https?/;async function km(e){if(e.config.emulator)return;let{authorizedDomains:t}=await Em(e);for(let e of t)try{if(Am(e))return}catch{}ku(e,`unauthorized-domain`)}function Am(e){let t=Lu(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith(`chrome-extension://`)){let i=new URL(e);return i.hostname===``&&r===``?n===`chrome-extension:`&&e.replace(`chrome-extension://`,``)===t.replace(`chrome-extension://`,``):n===`chrome-extension:`&&i.hostname===r}if(!Om.test(n))return!1;if(Dm.test(e))return r===e;let i=e.replace(/\./g,`\\.`);return RegExp(`^(.+\\.`+i+`|`+i+`)$`,`i`).test(r)}var jm=new Hu(3e4,6e4);function Mm(){let e=Ap().___jsl;if(e?.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}function Nm(e){return new Promise((t,n)=>{function r(){Mm(),gapi.load(`gapi.iframes`,{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Mm(),n(Au(e,`network-request-failed`))},timeout:jm.get()})}if(Ap().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(Ap().gapi?.load)r();else{let t=ef(`iframefcb`);return Ap()[t]=()=>{gapi.load?r():n(Au(e,`network-request-failed`))},Zd(`${$d()}?onload=${t}`).catch(e=>n(e))}}).catch(e=>{throw Pm=null,e})}var Pm=null;function Fm(e){return Pm||=Nm(e),Pm}var Im=new Hu(5e3,15e3),Lm=`__/auth/iframe`,Rm=`emulator/auth/iframe`,zm={style:{position:`absolute`,top:`-100px`,width:`1px`,height:`1px`},"aria-hidden":`true`,tabindex:`-1`},Bm=new Map([[`identitytoolkit.googleapis.com`,`p`],[`staging-identitytoolkit.sandbox.googleapis.com`,`s`],[`test-identitytoolkit.sandbox.googleapis.com`,`t`]]);function Vm(e){let t=e.config;B(t.authDomain,e,`auth-domain-config-required`);let n=t.emulator?Uu(t,Rm):`https://${e.config.authDomain}/${Lm}`,r={apiKey:t.apiKey,appName:e.name,v:pn},i=Bm.get(e.config.apiHost);i&&(r.eid=i);let a=e._getFrameworks();return a.length&&(r.fw=a.join(`,`)),`${n}?${ke(r).slice(1)}`}async function Hm(e){let t=await Fm(e),n=Ap().gapi;return B(n,e,`internal-error`),t.open({where:document.body,url:Vm(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zm,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=Au(e,`network-request-failed`),a=Ap().setTimeout(()=>{r(i)},Im.get());function o(){Ap().clearTimeout(a),n(t)}t.ping(o).then(o,()=>{r(i)})}))}var Um={location:`yes`,resizable:`yes`,statusbar:`yes`,toolbar:`no`},Wm=500,Gm=600,Km=`_blank`,qm=`http://localhost`,Jm=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Ym(e,t,n,r=Wm,i=Gm){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),s=``,c={...Um,width:r.toString(),height:i.toString(),top:a,left:o},l=ae().toLowerCase();n&&(s=Md(l)?Km:n),Ad(l)&&(t||=qm,c.scrollbars=`yes`);let u=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,``);if(Rd(l)&&s!==`_self`)return Xm(t||``,s),new Jm(null);let d=window.open(t||``,s,u);B(d,e,`popup-blocked`);try{d.focus()}catch{}return new Jm(d)}function Xm(e,t){let n=document.createElement(`a`);n.href=e,n.target=t;let r=document.createEvent(`MouseEvent`);r.initMouseEvent(`click`,!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}var Zm=`__/auth/handler`,Qm=`emulator/auth/handler`,$m=`fac`;async function eh(e,t,n,r,i,a){B(e.config.authDomain,e,`auth-domain-config-required`),B(e.config.apiKey,e,`invalid-api-key`);let o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:pn,eventId:i};if(t instanceof Rf){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||``,Te(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(let[e,t]of Object.entries(a||{}))o[e]=t}if(t instanceof zf){let e=t.getScopes().filter(e=>e!==``);e.length>0&&(o.scopes=e.join(`,`))}e.tenantId&&(o.tid=e.tenantId);let s=o;for(let e of Object.keys(s))s[e]===void 0&&delete s[e];let c=await e._getAppCheckToken(),l=c?`#${$m}=${encodeURIComponent(c)}`:``;return`${th(e)}?${ke(s).slice(1)}${l}`}function th({config:e}){return e.emulator?Uu(e,Qm):`https://${e.authDomain}/${Zm}`}var nh=`webStorageSupport`,rh=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Tp,this._completeRedirectFn=bm,this._overrideRedirectResult=_m}async _openPopup(e,t,n,r){return Iu(this.eventManagers[e._key()]?.manager,`_initialize() not called before _openPopup()`),Ym(e,await eh(e,t,n,Lu(),r),Op())}async _openRedirect(e,t,n,r){return await this._originValidation(e),jp(await eh(e,t,n,Lu(),r)),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Iu(n,`If manager is not set, promise should be`),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await Hm(e),n=new Sm(e);return t.register(`authEvent`,t=>(B(t?.authEvent,e,`invalid-auth-event`),{status:n.onEvent(t.authEvent)?`ACK`:`ERROR`}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(nh,{type:nh},n=>{let r=n?.[0]?.[nh];r!==void 0&&t(!!r),ku(e,`internal-error`)},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=km(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Bd()||jd()||Ld()}},ih=class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case`enroll`:return this._finalizeEnroll(e,t.credential,n);case`signin`:return this._finalizeSignIn(e,t.credential);default:return Fu(`unexpected MultiFactorSessionType`)}}},ah=class e extends ih{constructor(e){super(`phone`),this.credential=e}static _fromCredential(t){return new e(t)}_finalizeEnroll(e,t,n){return dp(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Qp(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},oh=class{constructor(){}static assertion(e){return ah._fromCredential(e)}};oh.FACTOR_ID=`phone`;var sh=class{static assertionForEnrollment(e,t){return ch._fromSecret(e,t)}static assertionForSignIn(e,t){return ch._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;B(t.user?.auth!==void 0,`internal-error`);let n=await fp(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return lh._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}};sh.FACTOR_ID=`totp`;var ch=class e extends ih{constructor(e,t,n){super(`totp`),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(t,n){return new e(n,void 0,t)}static _fromEnrollmentId(t,n){return new e(n,t)}async _finalizeEnroll(e,t,n){return B(this.secret!==void 0,e,`argument-error`),pp(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){B(this.enrollmentId!==void 0&&this.otp!==void 0,e,`argument-error`);let n={verificationCode:this.otp};return $p(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}},lh=class e{constructor(e,t,n,r,i,a,o){this.sessionInfo=a,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(t,n){return new e(t.totpSessionInfo.sharedSecretKey,t.totpSessionInfo.hashingAlgorithm,t.totpSessionInfo.verificationCodeLength,t.totpSessionInfo.periodSec,new Date(t.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),t.totpSessionInfo.sessionInfo,n)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(uh(e)||uh(t))&&(n=!0),n&&(uh(e)&&(e=this.auth.currentUser?.email||`unknownuser`),uh(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function uh(e){return e===void 0||e?.length===0}var dh=`@firebase/auth`,fh=`1.13.3`,ph=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,`dependent-sdk-initialized-before-auth`)}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function mh(e){switch(e){case`Node`:return`node`;case`ReactNative`:return`rn`;case`Worker`:return`webworker`;case`Cordova`:return`cordova`;case`WebExtension`:return`web-extension`;default:return}}function hh(e){cn(new He(`auth`,(t,{options:n})=>{let r=t.getProvider(`app`).getImmediate(),i=t.getProvider(`heartbeat`),a=t.getProvider(`app-check-internal`),{apiKey:o,authDomain:s}=r.options;B(o&&!o.includes(`:`),`invalid-api-key`,{appName:r.name});let c=new Kd(r,i,a,{apiKey:o,authDomain:s,clientPlatform:e,apiHost:`identitytoolkit.googleapis.com`,tokenApiHost:`securetoken.googleapis.com`,apiScheme:`https`,sdkClientVersion:Vd(e)});return ff(c,n),c},`PUBLIC`).setInstantiationMode(`EXPLICIT`).setInstanceCreatedCallback((e,t,n)=>{e.getProvider(`auth-internal`).initialize()})),cn(new He(`auth-internal`,e=>(e=>new ph(e))(qd(e.getProvider(`auth`).getImmediate())),`PRIVATE`).setInstantiationMode(`EXPLICIT`)),gn(dh,fh,mh(e)),gn(dh,fh,`esm2020`)}var gh=ne(`authIdTokenMaxAge`)||300,_h=null,vh=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>gh)return;let i=n?.token;_h!==i&&(_h=i,await fetch(e,{method:i?`POST`:`DELETE`,headers:i?{Authorization:`Bearer ${i}`}:{}}))};function yh(e=hn()){let t=ln(e,`auth`);if(t.isInitialized())return t.getImmediate();let n=df(e,{popupRedirectResolver:rh,persistence:[Xp,yp,Tp]}),r=ne(`authTokenSyncURL`);if(r&&typeof isSecureContext==`boolean`&&isSecureContext){let e=new URL(r,location.origin);if(location.origin===e.origin){let t=vh(e.toString());sp(n,t,()=>t(n.currentUser)),op(n,e=>t(e))}}let i=b(`auth`);return i&&pf(n,`http://${i}`),n}function bh(){return document.getElementsByTagName(`head`)?.[0]??document}Xd({loadJS(e){return new Promise((t,n)=>{let r=document.createElement(`script`);r.setAttribute(`src`,e),r.onload=t,r.onerror=e=>{let t=Au(`internal-error`);t.customData=e,n(t)},r.type=`text/javascript`,r.charset=`UTF-8`,bh().appendChild(r)})},gapiScript:`https://apis.google.com/js/api.js`,recaptchaV2Script:`https://www.google.com/recaptcha/api.js`,recaptchaEnterpriseScript:`https://www.google.com/recaptcha/enterprise.js?render=`}),hh(`Browser`);var xh=mn({apiKey:`AIzaSyAYnd63Dwmhq0F-AWlWo1nTmoYX9TPO9DM`,authDomain:`backbench-ef95e.firebaseapp.com`,databaseURL:`https://backbench-ef95e-default-rtdb.asia-southeast1.firebasedatabase.app`,projectId:`backbench-ef95e`,storageBucket:`backbench-ef95e.firebasestorage.app`,messagingSenderId:`806379718696`,appId:`1:806379718696:web:14924eda0e2f548f344d1d`,measurementId:`G-TZMVVSH1FJ`}),U=vu(xh),W=yh(xh),G={USERS:`users`,POSTS:`posts`,REPLIES:`replies`,POST_LIKES:`postLikes`,POST_RESHARES:`postReshares`,FRIENDS:`friends`,REPLY_LIKES:`replyLikes`,PETITIONS:`petitions`,PETITION_VOTES:`petitionVotes`,POLLS:`polls`,POLL_VOTES:`pollVotes`,POLL_LIKES:`pollLikes`,POLL_RESHARES:`pollReshares`,POLL_REPLIES:`pollReplies`,ANNOUNCEMENTS:`announcements`,EVENTS:`events`,NOTIFICATIONS:`notifications`,POST_REPORTS:`postReports`,REPLY_REPORTS:`replyReports`,USER_REPORTS:`userReports`},K={STUDENT:`student`,STAFF:`staff`,ADMIN:`admin`};function Sh(e,t,n=30){let r=new Date(Date.now()+n*864e5).toUTCString();document.cookie=`${e}=${encodeURIComponent(t)}; expires=${r}; path=/; SameSite=Lax`}function Ch(e){document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`}function q(e){if(!e)return``;let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function wh(e){if(!e)return[];let t=e.match(/#([a-zA-Z0-9_]+)/g);if(!t)return[];let n=t.map(e=>e.replace(/^#/,``).toLowerCase());return Array.from(new Set(n))}function Th(e){return e?q(e).replace(/#([a-zA-Z0-9_]+)/g,(e,t)=>`<a href="#/search?q=%23${encodeURIComponent(t.toLowerCase())}" class="hashtag-link" onclick="event.stopPropagation()" style="color: var(--accent-primary); font-weight: 700; text-decoration: none;">${e}</a>`).replace(/\n/g,`<br>`):``}async function Eh(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=wh(e),r=ru(I(U,G.POSTS)),i={postId:r.key,authorId:t.uid,content:e,hashtags:n,timestamp:new Date().toISOString(),status:`ACTIVE`,reportCount:0,edited:!1,likes:0,reshares:0,replyCount:0};return await R(r,i),i}function Dh(e,t){let n=I(U,G.POSTS),r=cu(n,n=>{let r=[];n.exists()&&n.forEach(e=>{let t=e.val();t&&t.status!==`AWAITING_MODERATION`&&r.push(t)}),r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(r.slice(0,e))});return()=>lu(n,`value`,r)}function Oh(e,t){if(!e)return t([]),()=>{};let n=I(U,G.POSTS),r=cu(n,n=>{let r=[];n.exists()&&n.forEach(t=>{let n=t.val();n&&n.authorId===e&&r.push(n)}),r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(r)},e=>{console.error(`Error fetching user posts:`,e),t([])});return()=>lu(n,`value`,r)}async function kh(e=5){try{let t=await z(I(U,G.POSTS));if(!t.exists())return[];let n={};t.forEach(e=>{let t=e.val();if(t&&t.status!==`AWAITING_MODERATION`){let e=t.hashtags;!e&&t.content&&(e=wh(t.content)),e&&Array.isArray(e)&&e.forEach(e=>{n[e]=(n[e]||0)+1})}});let r=Object.keys(n).map(e=>({tag:e,count:n[e]}));return r.sort((e,t)=>t.count-e.count),r.slice(0,e)}catch(e){return console.error(`Error getting trending hashtags:`,e),[]}}async function Ah(e,t=[],n=4){try{let r=await z(I(U,G.POSTS));if(!r.exists())return[];let i=[];return r.forEach(r=>{let a=r.val();if(a&&a.postId!==e&&a.status!==`AWAITING_MODERATION`){let e=a.hashtags;!e&&a.content&&(e=wh(a.content));let r=0;e&&Array.isArray(e)&&t.length>0&&(r=e.filter(e=>t.includes(e)).length),(r>0||i.length<n)&&i.push({...a,score:r})}}),i.sort((e,t)=>t.score-e.score||new Date(t.timestamp||0)-new Date(e.timestamp||0)),i.slice(0,n)}catch(e){return console.error(`Error getting related posts:`,e),[]}}var jh=new Map;async function J(e){if(!e)return null;if(jh.has(e))return jh.get(e);let t=await z(I(U,`${G.USERS}/${e}`));if(t.exists()){let n=t.val();return jh.set(e,n),n}return null}function Mh(e){e&&jh.delete(e)}async function Nh(e,t){let n=W.currentUser?.uid||e;if(!n)throw Error(`Not authenticated`);let r={};Object.keys(t).forEach(e=>{t[e]!==void 0&&(r[e]=t[e])}),await iu(I(U,`${G.USERS}/${n}`),r),jh.delete(n)}async function Ph(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=I(U,`${G.POST_LIKES}/${e}/${t.uid}`),r=await z(n),i=!1;r.exists()?(await L(n),i=!1):(await R(n,!0),i=!0);let a=I(U,`${G.POSTS}/${e}`),o=0;return await Su(a,e=>(e&&(e.likes=i?(e.likes||0)+1:Math.max(0,(e.likes||0)-1),o=e.likes),e)),{liked:i,likes:o}}async function Fh(e,t){return t?(await z(I(U,`${G.POST_LIKES}/${e}/${t}`))).exists():!1}async function Ih(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=I(U,`${G.POST_RESHARES}/${e}/${t.uid}`),r=await z(n),i=!1;r.exists()?(await L(n),i=!1):(await R(n,new Date().toISOString()),i=!0);let a=I(U,`${G.POSTS}/${e}`),o=0;return await Su(a,e=>(e&&(e.reshares=i?(e.reshares||0)+1:Math.max(0,(e.reshares||0)-1),o=e.reshares),e)),{reshared:i,reshares:o}}async function Lh(e,t){return t?(await z(I(U,`${G.POST_RESHARES}/${e}/${t}`))).exists():!1}async function Rh(e){if(!e)return[];try{let t=await z(I(U,G.POST_LIKES));if(!t.exists())return[];let n=[];if(t.forEach(t=>{let r=t.key;t.hasChild(e)&&n.push(r)}),n.length===0)return[];let r=[];for(let e of n){let t=await z(I(U,`${G.POSTS}/${e}`));if(t.exists()){let e=t.val();e&&e.status!==`AWAITING_MODERATION`&&r.push(e)}}return r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),r}catch(e){return console.error(`Error fetching liked posts:`,e),[]}}async function zh(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=await z(I(U,`${G.POSTS}/${e}`));if(!n.exists())throw Error(`Post not found`);if(n.val().authorId!==t.uid)throw Error(`Unauthorized: You can only delete your own posts.`);return await L(I(U,`${G.POSTS}/${e}`)),await L(I(U,`${G.REPLIES}/${e}`)),await L(I(U,`${G.POST_LIKES}/${e}`)),await L(I(U,`${G.POST_RESHARES}/${e}`)),!0}var Bh=`backbench_multi_accounts_v1`,Vh=3;function Hh(){try{let e=localStorage.getItem(Bh);return e?JSON.parse(e):[]}catch(e){return console.error(`Error reading multi-accounts:`,e),[]}}function Uh(e,t,n){if(!e||!t||!n)return;let r=Hh(),i=r.findIndex(t=>t.uid===n.uid||t.email.toLowerCase()===e.toLowerCase()),a={uid:n.uid,email:e,password:btoa(t),name:n.name||`Student`,username:n.username||`student`,profilePicture:n.profilePicture||``,role:n.role||`student`,lastActive:new Date().toISOString()};i>=0?r[i]=a:(r.length>=Vh&&r.shift(),r.push(a)),localStorage.setItem(Bh,JSON.stringify(r))}async function Wh(e){let t=Hh().find(t=>t.uid===e);if(!t)throw Error(`Account session not found. Please log in again.`);let n=t.email,r=atob(t.password);try{return await lp(W),Mh((await tp(W,n,r)).user.uid),window.location.hash=`#/`,window.location.reload(),!0}catch(t){throw console.error(`Switch account error:`,t),Gh(e),Error(`Session expired for this account. Please log in again.`)}}function Gh(e){let t=Hh();t=t.filter(t=>t.uid!==e),localStorage.setItem(Bh,JSON.stringify(t))}async function Kh(){localStorage.removeItem(Bh),await lp(W),window.location.hash=`#/login`,window.location.reload()}function qh(e){let t=e?.code||``,n=e?.message||``;return t===`auth/unauthorized-domain`||n.includes(`unauthorized-domain`)?`Unauthorized Domain Error: Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized domains.`:t===`auth/user-not-found`||t===`auth/wrong-password`||t===`auth/invalid-credential`?`Invalid email or password. Please verify your login credentials.`:t===`auth/email-already-in-use`?`An account with this email address already exists. Please log in instead.`:n||`Authentication failed. Please try again.`}function Jh(e){if(!e)return!1;if(e.role===K.ADMIN)return!0;let t=e.username,n=e.admissionNumber,r=e.class||e.userClass;return!(!t||t.trim()===``||!n||n===`N/A`||n.trim()===``||!r||r===`N/A`||r.trim()===``)}async function Yh(){let e=`Admin@backbench.net`;try{if((await rp(W,e)).length===0){let t=(await ep(W,e,`Admin^24547833`)).user,n={uid:t.uid,username:`admin`,name:`Campus Administrator`,admissionNumber:`00001`,class:`Staff/Admin`,mobile:`0000000000`,email:e,bio:`Official St. Joseph's College Master Administrator Account`,tagline:`Leading with integrity and excellence`,joinedDate:new Date().toISOString(),verifiedStudent:!0,role:K.ADMIN,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:``};await R(I(U,`${G.USERS}/${t.uid}`),n),Mh(t.uid)}}catch{}}async function Xh(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);if(!e||e.length<6)throw Error(`Password must be at least 6 characters long.`);try{return await ip(t,e),!0}catch(e){throw console.error(`Update password error:`,e),e.code===`auth/requires-recent-login`?Error(`Security Notice: Changing password requires a recent login session. Please log out and log in again, then update your password.`):Error(e.message||`Failed to update password.`)}}async function Zh(e){try{let{email:t,password:n,username:r,name:i,admissionNumber:a,userClass:o,mobile:s,isTeacher:c,role:l}=e,u=(await ep(W,t,n)).user,d={uid:u.uid,username:r,name:i,admissionNumber:a,class:o,mobile:s,email:t,isTeacher:c||!1,role:l||K.STUDENT,bio:``,tagline:``,joinedDate:new Date().toISOString(),verifiedStudent:!1,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:``};return await R(I(U,`${G.USERS}/${u.uid}`),d),Mh(u.uid),Uh(t,n,d),{success:!0,user:d}}catch(e){return console.error(`Registration error:`,e),{success:!1,error:qh(e)}}}async function Qh(e,t){try{e.trim().toLowerCase()===`admin@backbench.net`&&await Yh();let n=await tp(W,e,t),r=K.STUDENT;e.trim().toLowerCase()===`admin@backbench.net`&&(r=K.ADMIN,await iu(I(U,`${G.USERS}/${n.user.uid}`),{role:K.ADMIN}),Mh(n.user.uid));let i=await z(I(U,`${G.USERS}/${n.user.uid}`));return Uh(e,t,i.exists()?i.val():{uid:n.user.uid,name:e.split(`@`)[0],username:e.split(`@`)[0],role:r}),{success:!0,user:n.user}}catch(e){return console.error(`Login error:`,e),{success:!1,error:qh(e)}}}async function $h(){try{return Ch(`backbench_token`),Ch(`backbench_uid`),await lp(W),{success:!0}}catch(e){return{success:!1,error:e.message}}}var eg=new Vf;async function tg(){try{let e=(await dm(W,eg)).user;if(e.email)try{if((await rp(W,e.email)).includes(`password`)&&!e.providerData.some(e=>e.providerId===`google.com`))return await lp(W),{success:!1,error:`An account already exists with this email address using Email & Password. Please log in with your email and password instead.`}}catch{}let t=I(U,`${G.USERS}/${e.uid}`),n=await z(t),r=null;if(n.exists())r=n.val();else{let n=e.email.split(`@`)[0].replace(/[^a-zA-Z0-9_.]/g,``);r={uid:e.uid,username:n,name:e.displayName||`Google User`,admissionNumber:`N/A`,class:`N/A`,mobile:e.phoneNumber||``,email:e.email,bio:``,tagline:``,joinedDate:new Date().toISOString(),verifiedStudent:!1,role:K.STUDENT,postCount:0,replyCount:0,likeCount:0,isSuspended:!1,profilePicture:e.photoURL||``},await R(t,r),Mh(e.uid)}return{success:!0,user:e,needsOnboarding:!Jh(r)}}catch(e){return console.error(`Google Sign-In error:`,e),e.code===`auth/account-exists-with-different-credential`?{success:!1,error:`An account already exists with this email address using Email & Password. Please log in with your email and password instead.`}:{success:!1,error:qh(e)}}}async function ng(e){if(!e)return[];let t=e.trim().toLowerCase().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3)return[];let n=await z(I(U,G.USERS));if(!n.exists())return[];let r=[],i=W.currentUser?.uid;return n.forEach(e=>{let n=e.val();if(!n||n.uid===i)return;let a=(n.name||``).toLowerCase(),o=(n.username||``).toLowerCase(),s=(n.admissionNumber||``).toLowerCase(),c=(n.class||``).toLowerCase();(a.includes(t)||o.includes(t)||s.includes(t)||c.includes(t))&&r.push(n)}),r}async function rg(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=I(U,`friends/${t.uid}/${e}`);return(await z(n)).exists()?(await L(n),!1):(await R(n,!0),!0)}async function ig(e){let t=W.currentUser;return!t||!e?!1:(await z(I(U,`friends/${t.uid}/${e}`))).exists()}async function ag(e,t){if(!e)return;let n=ru(I(U,`notifications/${e}`)),r={notificationId:n.key,text:t.text,type:t.type||`SYSTEM`,postId:t.postId||null,read:!1,timestamp:new Date().toISOString()};return await R(n,r),r}function og(e,t){if(!e)return t([]),()=>{};let n=I(U,`notifications/${e}`),r=cu(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(n)},e=>{console.error(`Error fetching notifications:`,e),t([])});return()=>lu(n,`value`,r)}async function sg(e,t){!e||!t||await iu(I(U,`notifications/${e}/${t}`),{read:!0})}async function cg(e){if(!e)return;let t=await z(I(U,`notifications/${e}`));if(t.exists()){let n={};t.forEach(t=>{n[`notifications/${e}/${t.key}/read`]=!0}),await iu(I(U),n)}}async function lg(e){if(!e)return;let t=await z(I(U,`notifications/${e}`));t.exists()&&t.forEach(t=>{t.val().read&&L(I(U,`notifications/${e}/${t.key}`))})}function Y(t){return window.location.hash.split(`?`)[0]===t||t===e.HOME&&(!window.location.hash||window.location.hash===`#/`)}function X(t,n=``,r=`student`){let i=W.currentUser,a=i?i.displayName||i.email.split(`@`)[0]:`Student`,o=a.charAt(0).toUpperCase();return`
    <div class="app-layout">
      <!-- Left Navigation Sidebar -->
      <aside class="sidebar-container">
        <div class="sidebar-top">
          <!-- Backbench Brand Header -->
          <a href="${e.HOME}" class="brand-header" style="text-decoration: none;">
            <div class="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4.5C4 3.67157 4.67157 3 5.5 3H14C17.0376 3 19.5 5.46243 19.5 8.5C19.5 10.4571 18.4776 12.1751 16.9453 13.1362C18.7758 14.0734 20 15.9821 20 18.1667C20 21.3883 17.3883 24 14.1667 24H5.5C4.67157 24 4 23.3284 4 22.5V4.5Z" fill="url(#brandGrad)" />
                <path d="M8 6.5H13.5C14.6046 6.5 15.5 7.39543 15.5 8.5C15.5 9.60457 14.6046 10.5 13.5 10.5H8V6.5Z" fill="#FFFFFF" />
                <path d="M8 14.5H14C15.3807 14.5 16.5 15.6193 16.5 17C16.5 18.3807 15.3807 19.5 14 19.5H8V14.5Z" fill="#FFFFFF" opacity="0.9" />
                <defs>
                  <linearGradient id="brandGrad" x1="4" y1="3" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1D9BF0"/>
                    <stop offset="1" stop-color="#004477"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="brand-text-container" style="display: flex; flex-direction: column;">
              <span class="brand-title" style="font-size: 19px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; line-height: 1.1;">Backbench</span>
              <span class="brand-badge" style="font-size: 10px; font-weight: 700; background: var(--bg-tertiary); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(29, 155, 240, 0.2); width: fit-content; margin-top: 2px;">SJC 2026</span>
            </div>
          </a>

          <!-- Main Navigation Menu Links -->
          <nav class="sidebar-nav">
            <a href="${e.HOME}" class="nav-item ${Y(e.HOME)?`active`:``}">
              <span class="material-symbols-outlined">home</span>
              <span class="sidebar-label">Home</span>
            </a>
            
            <a href="${e.PROFILE}" class="nav-item ${Y(e.PROFILE)?`active`:``}">
              <span class="material-symbols-outlined">person</span>
              <span class="sidebar-label">Profile</span>
            </a>

            <a href="#/notifications" class="nav-item ${Y(`#/notifications`)?`active`:``}" style="position: relative;">
              <span class="material-symbols-outlined">notifications</span>
              <span class="sidebar-label">Notifications</span>
              <span id="unread-notif-badge" class="brand-badge" style="display: none; position: absolute; right: 12px; background: var(--error-color); color: #fff; border: none; font-size: 11px; padding: 2px 6px;"></span>
            </a>

            <a href="#/friends" class="nav-item ${Y(`#/friends`)?`active`:``}">
              <span class="material-symbols-outlined">group</span>
              <span class="sidebar-label">Friends</span>
            </a>

            <a href="#/search" class="nav-item ${Y(`#/search`)?`active`:``}">
              <span class="material-symbols-outlined">search</span>
              <span class="sidebar-label">Search</span>
            </a>
            
            <a href="${e.PETITIONS}" class="nav-item ${Y(e.PETITIONS)?`active`:``}">
              <span class="material-symbols-outlined">campaign</span>
              <span class="sidebar-label">Petitions</span>
            </a>
            
            <a href="${e.POLLS}" class="nav-item ${Y(e.POLLS)?`active`:``}">
              <span class="material-symbols-outlined">poll</span>
              <span class="sidebar-label">Polls</span>
            </a>
            
            <a href="${e.ANNOUNCEMENTS}" class="nav-item ${Y(e.ANNOUNCEMENTS)?`active`:``}">
              <span class="material-symbols-outlined">campaign</span>
              <span class="sidebar-label">Announcements</span>
            </a>
            
            <a href="${e.EVENTS}" class="nav-item ${Y(e.EVENTS)?`active`:``}">
              <span class="material-symbols-outlined">event</span>
              <span class="sidebar-label">Events</span>
            </a>

            <a href="${e.SETTINGS}" class="nav-item ${Y(e.SETTINGS)?`active`:``}">
              <span class="material-symbols-outlined">settings</span>
              <span class="sidebar-label">Settings</span>
            </a>
            
            ${r===`admin`?`
              <a href="${e.ADMIN}" class="nav-item ${Y(e.ADMIN)?`active`:``}">
                <span class="material-symbols-outlined">admin_panel_settings</span>
                <span class="sidebar-label">Admin</span>
              </a>
            `:r===`staff`?`
              <a href="${e.ADMIN}" class="nav-item ${Y(e.ADMIN)?`active`:``}">
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
              <div class="avatar" style="width: 38px; height: 38px; font-size: 15px;">${o}</div>
              <div style="display: flex; flex-direction: column;">
                <span class="user-mini-name">${q(a)}</span>
                <span class="user-mini-handle">@${q(a.toLowerCase().replace(/\s+/g,``))}</span>
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
                Log out @${q(a.toLowerCase().replace(/\s+/g,``))}
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
        ${t}
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
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
            <div style="padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
              <div style="color: var(--text-secondary); font-size: 12px; font-weight: 600;">ANNOUNCEMENT · 2h ago</div>
              <div style="font-weight: 600; margin-top: 2px;">Mid-Semester Exam Timetable Released</div>
            </div>
            <div>
              <div style="color: var(--text-secondary); font-size: 12px; font-weight: 600;">CAMPUS EVENT · Tomorrow</div>
              <div style="font-weight: 600; margin-top: 2px;">Annual Inter-Class Coding Hackathon 2026</div>
            </div>
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
        <a href="${e.HOME}" class="mobile-nav-item ${Y(e.HOME)?`active`:``}">
          <span class="material-symbols-outlined">home</span>
        </a>
        <a href="#/notifications" class="mobile-nav-item ${Y(`#/notifications`)?`active`:``}">
          <span class="material-symbols-outlined">notifications</span>
        </a>
        <a href="#/friends" class="mobile-nav-item ${Y(`#/friends`)?`active`:``}">
          <span class="material-symbols-outlined">group</span>
        </a>
        <a href="#/search" class="mobile-nav-item ${Y(`#/search`)?`active`:``}">
          <span class="material-symbols-outlined">search</span>
        </a>
        <a href="${e.PROFILE}" class="mobile-nav-item ${Y(e.PROFILE)?`active`:``}">
          <span class="material-symbols-outlined">person</span>
        </a>
      </nav>

      <!-- Mobile Floating Action Button -->
      <button class="mobile-fab" id="mobile-fab-composer" title="New Post">
        <span class="material-symbols-outlined">edit</span>
      </button>
    </div>
  `}function Z(){let t=W.currentUser,n=document.getElementById(`user-menu-btn`),r=document.getElementById(`multi-account-popover`),i=document.getElementById(`saved-accounts-list`),a=document.getElementById(`logout-current-btn`),o=document.getElementById(`logout-all-btn`);n&&r&&i&&(n.addEventListener(`click`,e=>{if(e.stopPropagation(),r.style.display===`block`)r.style.display=`none`;else{r.style.display=`block`;let e=Hh(),n=t?t.uid:``;if(e.length===0&&t)i.innerHTML=`
            <div style="padding: 8px; font-size: 13px; color: var(--text-secondary); text-align: center;">
              Log in with another account to add it to your quick switcher.
            </div>
          `;else{let t=``;e.forEach(e=>{let r=e.uid===n,i=e.name?e.name.charAt(0).toUpperCase():`?`;t+=`
              <div class="saved-account-item ${r?`active`:``}" data-uid="${e.uid}" style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border-radius: 10px; cursor: pointer; transition: background 0.15s ease; background: ${r?`rgba(29, 155, 240, 0.12)`:`transparent`};">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 13px;">${i}</div>
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q(e.name)}</span>
                    <span style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${q(e.username)}</span>
                  </div>
                </div>

                ${r?`
                  <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                `:``}
              </div>
            `}),i.innerHTML=t,i.querySelectorAll(`.saved-account-item`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.uid;if(t!==n){r.style.display=`none`;try{await Wh(t)}catch(e){alert(e.message||`Failed to switch account.`)}}})})}}}),document.addEventListener(`click`,e=>{!e.target.closest(`#multi-account-popover`)&&!e.target.closest(`#user-menu-btn`)&&(r.style.display=`none`)})),a&&a.addEventListener(`click`,async e=>{e.stopPropagation(),confirm(`Log out of current account?`)&&(t&&Gh(t.uid),await $h(),window.location.hash=`#/login`,window.location.reload())}),o&&o.addEventListener(`click`,async e=>{e.stopPropagation(),confirm(`Log out of ALL saved accounts on this browser?`)&&await Kh()});let s=document.getElementById(`unread-notif-badge`);t&&s&&og(t.uid,e=>{let t=e.filter(e=>!e.read).length;t>0?(s.textContent=t,s.style.display=`inline-block`):s.style.display=`none`});let c=document.getElementById(`sidebar-open-composer`),l=document.getElementById(`mobile-fab-composer`),u=()=>{window.location.hash!==e.HOME&&(window.location.hash=e.HOME),setTimeout(()=>{let e=document.getElementById(`post-input`);e&&e.focus()},150)};c&&c.addEventListener(`click`,u),l&&l.addEventListener(`click`,u);let d=document.getElementById(`trending-hashtags-container`);d&&kh(5).then(e=>{if(!e||e.length===0){d.innerHTML=`
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">1 · Campus Trending</span>
            <div style="font-weight: 700; color: var(--accent-primary); cursor: pointer;" onclick="window.location.hash='#/search?q=%23SJCHackathon2026'">#SJCHackathon2026</div>
            <span style="color: var(--text-secondary); font-size: 12px;">142 posts</span>
          </div>
        `;return}let t=``;e.forEach((e,n)=>{t+=`
          <div style="cursor: pointer;" onclick="window.location.hash='#/search?q=%23${encodeURIComponent(e.tag)}'">
            <span style="color: var(--text-secondary); font-size: 12px;">${n+1} · Trending in Campus</span>
            <div style="font-weight: 700; color: var(--accent-primary);">#${q(e.tag)}</div>
            <span style="color: var(--text-secondary); font-size: 12px;">${e.count} post${e.count===1?``:`s`}</span>
          </div>
        `}),d.innerHTML=t}).catch(e=>console.error(e));let f=document.getElementById(`right-sidebar-search-input`),p=document.getElementById(`search-results-dropdown`);f&&p&&(f.addEventListener(`input`,async()=>{let e=f.value,t=e.trim().replace(/^@+/,``).replace(/\s+/g,` `);if(t.length<3){p.style.display=`none`,p.innerHTML=``;return}p.style.display=`block`,p.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">Searching campus...</div>`;try{let n=await ng(e);if(n.length===0){p.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">No student or staff found matching "${q(t)}".</div>`;return}let r=``;for(let e of n){let t=await ig(e.uid),n=e.name?e.name.charAt(0).toUpperCase():`?`,i=e.profilePicture?`<img src="${e.profilePicture}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />`:`<div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${n}</div>`;r+=`
            <div class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;" data-username="${q(e.username)}">
              <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                ${i}
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q(e.name)}</span>
                  <span style="font-size: 12px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${q(e.username)} · Class ${q(e.class||`N/A`)}</span>
                </div>
              </div>

              <button class="btn ${t?`btn-outline`:``} friend-toggle-btn" data-uid="${e.uid}" style="font-size: 12px; padding: 4px 12px;">
                ${t?`Friends`:`+ Add Friend`}
              </button>
            </div>
          `}p.innerHTML=r,p.querySelectorAll(`.search-result-item`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.friend-toggle-btn`)){let t=e.dataset.username;p.style.display=`none`,window.location.hash=`#/profile?u=${t}`}})}),p.querySelectorAll(`.friend-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.uid;e.disabled=!0;try{let t=await rg(n);e.textContent=t?`Friends`:`+ Add Friend`,e.className=`btn ${t?`btn-outline`:``} friend-toggle-btn`}catch(e){console.error(e)}finally{e.disabled=!1}})})}catch(e){console.error(e),p.innerHTML=`<div style="padding: 12px; text-align: center; color: var(--error-color); font-size: 13px;">Error searching campus.</div>`}}),document.addEventListener(`click`,e=>{e.target.closest(`.search-box`)||(p.style.display=`none`)}))}async function ug(e,t){let n=W.currentUser;if(!n)throw Error(`Not authenticated`);if(!e||e.trim()===``)throw Error(`Poll question is required.`);if(!t||!Array.isArray(t)||t.length<2)throw Error(`At least 2 poll options are required.`);let r=ru(I(U,G.POLLS)),i=t.map((e,t)=>({id:t,text:e,votes:0})),a={pollId:r.key,creatorId:n.uid,question:e,options:i,totalVotes:0,likes:0,reshares:0,replyCount:0,timestamp:new Date().toISOString()};return await R(r,a),a}async function dg(e,t){if(!t||!e)return null;let n=await z(I(U,`${G.POLL_VOTES}/${e}/${t}`));return n.exists()?n.val():null}async function fg(e,t){let n=W.currentUser;if(!n)throw Error(`Not authenticated`);let r=I(U,`${G.POLL_VOTES}/${e}/${n.uid}`);if((await z(r)).exists())throw Error(`You have already voted in this poll.`);await R(r,t),await Su(I(U,`${G.POLLS}/${e}`),e=>(e&&(e.options&&e.options[t]&&(e.options[t].votes=(e.options[t].votes||0)+1),e.totalVotes=(e.totalVotes||0)+1),e))}function pg(e=20,t){let n=I(U,G.POLLS),r=cu(n,n=>{let r=[];n.exists()&&n.forEach(e=>{let t=e.val();t&&r.push(t)}),r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(r.slice(0,e))});return()=>lu(n,`value`,r)}async function mg(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=I(U,`${G.POLL_LIKES}/${e}/${t.uid}`),r=await z(n),i=!1;r.exists()?(await L(n),i=!1):(await R(n,!0),i=!0);let a=I(U,`${G.POLLS}/${e}`),o=0;return await Su(a,e=>(e&&(e.likes=i?(e.likes||0)+1:Math.max(0,(e.likes||0)-1),o=e.likes),e)),{liked:i,likes:o}}async function hg(e,t){return!t||!e?!1:(await z(I(U,`${G.POLL_LIKES}/${e}/${t}`))).exists()}async function gg(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=I(U,`${G.POLL_RESHARES}/${e}/${t.uid}`),r=await z(n),i=!1;r.exists()?(await L(n),i=!1):(await R(n,new Date().toISOString()),i=!0);let a=I(U,`${G.POLLS}/${e}`),o=0;return await Su(a,e=>(e&&(e.reshares=i?(e.reshares||0)+1:Math.max(0,(e.reshares||0)-1),o=e.reshares),e)),{reshared:i,reshares:o}}async function _g(e,t){return!t||!e?!1:(await z(I(U,`${G.POLL_RESHARES}/${e}/${t}`))).exists()}async function vg(e,t){let n=W.currentUser;if(!n)throw Error(`Not authenticated`);let r=t?t.trim():``;if(!r)throw Error(`Reply cannot be empty.`);let i=ru(I(U,`${G.POLL_REPLIES}/${e}`)),a={replyId:i.key,parentPoll:e,authorId:n.uid,content:r,timestamp:new Date().toISOString(),likes:0};return await R(i,a),await Su(I(U,`${G.POLLS}/${e}`),e=>(e&&(e.replyCount=(e.replyCount||0)+1),e)),a}function yg(e,t){let n=I(U,`${G.POLL_REPLIES}/${e}`),r=cu(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)});return()=>lu(n,`value`,r)}async function bg(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=await z(I(U,`${G.POLLS}/${e}`));if(!n.exists())throw Error(`Poll not found`);if(n.val().creatorId!==t.uid)throw Error(`Unauthorized: You can only delete your own polls.`);return await L(I(U,`${G.POLLS}/${e}`)),await L(I(U,`${G.POLL_VOTES}/${e}`)),await L(I(U,`${G.POLL_LIKES}/${e}`)),await L(I(U,`${G.POLL_RESHARES}/${e}`)),await L(I(U,`${G.POLL_REPLIES}/${e}`)),!0}async function xg(e){let t=W.currentUser?.uid;if(!t)throw Error(`Not authenticated`);let n=await z(I(U,`${G.USERS}/${t}`)),r=n.exists()?n.val():null;if(!r||r.role!==`staff`&&r.role!==`admin`)throw Error(`Unauthorized: Staff power required to put down polls.`);return await L(I(U,`${G.POLLS}/${e}`)),await L(I(U,`${G.POLL_VOTES}/${e}`)),await L(I(U,`${G.POLL_LIKES}/${e}`)),await L(I(U,`${G.POLL_RESHARES}/${e}`)),await L(I(U,`${G.POLL_REPLIES}/${e}`)),!0}async function Sg(e){if(!e)return null;try{let t=await z(I(U,`${G.POLLS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching poll by ID:`,e)}return null}async function Cg(e){let t=W.currentUser;if(!t||!e)return!1;try{return(await z(I(U,`${G.FRIENDS}/${t.uid}/${e}`))).exists()}catch(e){return console.error(`Error checking friend status:`,e),!1}}async function wg(e,t){if(!e||!t)return!1;try{let n=await z(I(U,`${G.FRIENDS}/${e}/${t}`)),r=await z(I(U,`${G.FRIENDS}/${t}/${e}`));return n.exists()&&r.exists()}catch{return!1}}async function Tg(e){let t=W.currentUser;if(!t||!e)return!1;if(t.uid===e)throw Error(`You cannot add yourself as a friend.`);let n=I(U,`${G.FRIENDS}/${t.uid}/${e}`);return(await z(n)).exists()?(await L(n),!1):(await R(n,{timestamp:new Date().toISOString()}),!0)}async function Eg(e){if(!e)return[];try{let t=await z(I(U,`${G.FRIENDS}/${e}`));if(t.exists())return Object.keys(t.val())}catch(e){console.error(`Error fetching friend UIDs:`,e)}return[]}async function Dg(e){return(await Eg(e)).length}async function Og(e){let t=await Eg(e),n=[];for(let r of t){let t=await J(r);if(t){let i=await wg(e,r);n.push({...t,isMutual:i})}}return n}async function kg(){try{let e=await z(I(U,G.USERS)),t=await z(I(U,G.POSTS)),n=await z(I(U,G.REPLIES)),r=await z(I(U,G.POST_LIKES)),i=await z(I(U,G.PETITIONS)),a=await z(I(U,G.POLLS)),o=e.exists()?Object.keys(e.val()).length:0,s=t.exists()?Object.keys(t.val()).length:0,c=0;if(n.exists()){let e=n.val();Object.values(e).forEach(e=>{c+=Object.keys(e).length})}let l=0;if(r.exists()){let e=r.val();Object.values(e).forEach(e=>{l+=Object.keys(e).length})}let u=i.exists()?Object.keys(i.val()).length:0,d=a.exists()?Object.keys(a.val()).length:0;return{totalUsers:o,totalPosts:s,totalReplies:c,totalLikes:l,totalPetitions:u,totalPolls:d}}catch(e){return console.error(`Error getting analytics stats:`,e),{totalUsers:0,totalPosts:0,totalReplies:0,totalLikes:0,totalPetitions:0,totalPolls:0}}}async function Ag(){try{let e=await z(I(U,G.USERS));if(e.exists()){let t=e.val(),n=Object.values(t);return n.sort((e,t)=>new Date(t.joinedDate||0)-new Date(e.joinedDate||0)),n}}catch(e){console.error(`Error getting users roster:`,e)}return[]}async function jg(e,t){let n=W.currentUser?.uid;if(!n)throw Error(`Not authenticated`);let r=await z(I(U,`${G.USERS}/${n}`)),i=r.exists()?r.val():null;if(!i||i.role!==K.ADMIN)throw Error(`Unauthorized: Only Master Admin can appoint or demote staff.`);return await iu(I(U,`${G.USERS}/${e}`),{role:t}),Mh(e),!0}async function Mg(e){if(!W.currentUser?.uid)throw Error(`Not authenticated`);let t=await z(I(U,`${G.USERS}/${e}`));if(!t.exists())throw Error(`User not found`);let n=!t.val().isSuspended;return await iu(I(U,`${G.USERS}/${e}`),{isSuspended:n}),Mh(e),n}async function Ng(e){let t=W.currentUser?.uid;if(!t)throw Error(`Not authenticated`);let n=await z(I(U,`${G.USERS}/${t}`)),r=n.exists()?n.val():null;if(!r||r.role!==K.STAFF&&r.role!==K.ADMIN)throw Error(`Unauthorized: Staff power required to put down posts.`);return await L(I(U,`${G.POSTS}/${e}`)),await L(I(U,`${G.REPLIES}/${e}`)),await L(I(U,`${G.POST_LIKES}/${e}`)),await L(I(U,`${G.POST_RESHARES}/${e}`)),!0}async function Pg(e,t=`Inappropriate content`){let n=W.currentUser;if(!n)throw Error(`Not authenticated`);let r=I(U,`postReports/${e}/${n.uid}`);if((await z(r)).exists())throw Error(`You have already reported this post.`);await R(r,{uid:n.uid,reason:t,timestamp:new Date().toISOString()});let i=I(U,`${G.POSTS}/${e}`),a=0,o=null;return await Su(i,e=>(e&&(e.reportCount=(e.reportCount||0)+1,a=e.reportCount,o=e.authorId,a>=2&&(e.status=`AWAITING_MODERATION`)),e)),a>=2&&o&&await ag(o,{text:`⚠️ Your post has received 2 community reports and is currently held for review awaiting validation from a Staff member or Admin.`,type:`MODERATION`,postId:e}),{reported:!0,reportCount:a,autoTakenDown:a>=2}}async function Fg(){try{let e=await z(I(U,G.POSTS));if(!e.exists())return[];let t=[];return e.forEach(e=>{let n=e.val();(n.status===`AWAITING_MODERATION`||n.reportCount&&n.reportCount>0)&&t.push(n)}),t.sort((e,t)=>(t.reportCount||0)-(e.reportCount||0)),t}catch(e){return console.error(`Error fetching reported posts queue:`,e),[]}}async function Ig(e){let t=I(U,`${G.POSTS}/${e}`),n=await z(t);if(!n.exists())throw Error(`Post not found`);let r=n.val();return await iu(t,{status:`ACTIVE`,reportCount:0}),await L(I(U,`postReports/${e}`)),r.authorId&&await ag(r.authorId,{text:`✓ Your post has been reviewed and approved by Staff. It is now active on Backbench.`,type:`MODERATION`,postId:e}),!0}function Lg(){return`
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
  `}function Q(e=4){let t=``;for(let n=0;n<e;n++)t+=Lg();return t}function Rg(e){if(!e)return``;let t=Math.floor((new Date-new Date(e))/1e3),n=t/31536e3;return n>1?Math.floor(n)+` years ago`:(n=t/2592e3,n>1?Math.floor(n)+` months ago`:(n=t/86400,n>1?Math.floor(n)+` days ago`:(n=t/3600,n>1?Math.floor(n)+` hours ago`:(n=t/60,n>1?Math.floor(n)+` minutes ago`:t<10?`just now`:Math.floor(t)+` seconds ago`))))}var zg=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23202327'/%3E%3Cpath d='M64 28a20 20 0 1 0 0 40 20 20 0 0 0 0-40zM32 100c0-17.673 14.327-32 32-32s32 14.327 32 32v4H32v-4z' fill='%2371767B'/%3E%3C/svg%3E`;typeof window<`u`&&(window.handleAvatarError=function(e){e&&e.src!==zg&&(e.onerror=null,e.src=zg)});function Bg(e,t=44,n=``){let r=null;return typeof e==`string`?r=e:e&&e.profilePicture&&(r=e.profilePicture),`
    <img 
      src="${r||zg}" 
      onerror="window.handleAvatarError(this)" 
      style="width: ${t}px; height: ${t}px; border-radius: 50% !important; object-fit: cover !important; aspect-ratio: 1 / 1 !important; flex-shrink: 0 !important; background: var(--bg-tertiary); ${n}" 
      alt="User Avatar" 
    />
  `}var Vg=[{id:`default`,name:`Inter Modern`,fontFamily:`'Inter', sans-serif`},{id:`handwritten`,name:`Handwritten Script`,fontFamily:`'Caveat', cursive, sans-serif`},{id:`monospace`,name:`Cyber Monospace`,fontFamily:`'Fira Code', monospace`},{id:`serif`,name:`Classic Serif`,fontFamily:`'Playfair Display', serif`},{id:`futuristic`,name:`Futuristic Outfit`,fontFamily:`'Outfit', sans-serif`}];function Hg(e){let t=`default`;typeof e==`string`?t=e:e&&e.fontThemeId&&(t=e.fontThemeId);let n=Vg.find(e=>e.id===t);return n?n.fontFamily:Vg[0].fontFamily}function Ug(e,t,n=!1,r=!1){let i=t?.name?q(t.name):`Anonymous Student`,a=t?.username?q(t.username):`student`,o=t?.isTeacher||t?.role===`teacher`,s=t?.verifiedStudent||t?.role===`staff`||t?.role===`admin`||o,c=Hg(t),l=Bg(t,44,`border: 1px solid var(--border-color);`);return`
    <article class="post-card fade-in" data-post-id="${e.postId}" data-author-id="${e.authorId}">
      <a href="#/profile?u=${a}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${a}'s profile">
        ${l}
      </a>
      <div style="flex: 1; min-width: 0;">
        <div class="post-header">
          <div class="author-meta">
            <a href="#/profile?u=${a}" style="text-decoration: none; color: inherit;" title="View @${a}'s profile">
              <span class="author-name" style="font-family: ${c};">${i}</span>
            </a>
            ${o?`
              <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
              </span>
            `:s?`
              <span class="material-symbols-outlined verified-icon" title="Verified Member">verified</span>
            `:``}
            <a href="#/profile?u=${a}" style="text-decoration: none; color: inherit;" title="View @${a}'s profile">
              <span class="author-handle">@${a}</span>
            </a>
            <span class="post-dot">·</span>
            <span class="post-time">${Rg(e.timestamp)}</span>
          </div>
          <button class="btn-ghost post-options-btn" style="padding: 4px;" title="Options" data-post-id="${e.postId}" data-author-id="${e.authorId}">
            <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
          </button>
        </div>
        
        <div class="post-body" style="font-family: ${c}; font-size: 15px; line-height: 1.5; color: var(--text-primary);">
          ${Th(e.content)}
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

          <button class="action-btn">
            <span class="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </article>
  `}function Wg(e,t,n=null,r=!1,i=!1){let a=t?.name?q(t.name):`Anonymous Student`,o=t?.username?q(t.username):`student`,s=e.totalVotes||0,c=n!==null,l=Hg(t),u=Bg(t,44,`border: 1px solid var(--border-color);`),d=``;return d=c?`
      <div class="poll-results-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
        ${e.options.map((e,t)=>{let r=e.votes||0,i=s>0?Math.round(r/s*100):0,a=n===t;return`
            <div class="poll-result-bar-wrapper ${a?`user-selected`:``}">
              <div class="poll-result-fill" style="width: ${i}%;"></div>
              <div class="poll-result-label" style="font-family: ${l};">
                <span style="display: flex; align-items: center; gap: 6px; font-weight: ${a?`700`:`500`};">
                  ${q(e.text)}
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
          <button class="poll-option-btn" data-poll-id="${e.pollId}" data-option-index="${n}" style="font-family: ${l};">
            <span>${q(t.text)}</span>
          </button>
        `).join(``)}
      </div>
    `,`
    <article class="card fade-in poll-card" data-poll-id="${e.pollId}" data-creator-id="${e.creatorId}" style="margin-bottom: 16px; border-radius: var(--border-radius);">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <a href="#/profile?u=${o}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${o}'s profile">
          ${u}
        </a>
        <div style="flex: 1; min-width: 0;">
          <div class="post-header">
            <div class="author-meta">
              <a href="#/profile?u=${o}" style="text-decoration: none; color: inherit;" title="View @${o}'s profile">
                <span class="author-name" style="font-family: ${l};">${a}</span>
              </a>
              <a href="#/profile?u=${o}" style="text-decoration: none; color: inherit;" title="View @${o}'s profile">
                <span class="author-handle">@${o}</span>
              </a>
              <span class="post-dot">·</span>
              <span class="post-time">${Rg(e.timestamp)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="brand-badge" style="font-size: 11px;">CAMPUS POLL</span>
              <button class="btn-ghost poll-options-btn" style="padding: 4px;" title="Options" data-poll-id="${e.pollId}" data-creator-id="${e.creatorId}">
                <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
              </button>
            </div>
          </div>

          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 6px; line-height: 1.4; font-family: ${l};">
            ${q(e.question)}
          </div>

          ${d}

          <div style="margin-top: 10px; font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 12px;">
            <span>${s} total vote${s===1?``:`s`}</span>
            <span>·</span>
            <span>${c?`Final results`:`Active poll`}</span>
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
  `}var Gg=null;function Kg(){Gg&&=(Gg.remove(),null)}document.addEventListener(`click`,Kg);function qg(e,t){Kg();let{itemId:n,authorId:r,currentUid:i,isStaff:a=!1,itemType:o=`post`,onDelete:s,onReport:c}=t,l=i===r,u=o===`poll`?`poll`:`post`,d=document.createElement(`div`);d.className=`ctx-menu fade-in`,d.setAttribute(`role`,`menu`);let f=[];l&&f.push({icon:`delete`,label:`Delete ${u}`,className:`ctx-menu-item danger`,action:async()=>{Kg(),confirm(`Are you sure you want to permanently delete this ${u}?`)&&s&&await s(n)}}),a&&!l&&f.push({icon:`shield`,label:`Take down ${u} (Staff)`,className:`ctx-menu-item danger`,action:async()=>{Kg(),confirm(`🛡️ Staff Moderation Action:\nDo you want to take down this ${u} from Backbench?`)&&s&&await s(n)}}),l||f.push({icon:`flag`,label:`Report ${u}`,className:`ctx-menu-item`,action:()=>{Kg();let e=prompt(`🚩 Report this ${u} to Moderation\nPlease state your reason:`,`Inappropriate content`);e&&e.trim()&&c&&c(n,e.trim())}}),f.push({icon:`link`,label:`Copy link`,className:`ctx-menu-item`,action:()=>{Kg();let e=window.location.origin+window.location.pathname,t=o===`poll`?`${e}#/poll?id=${n}`:`${e}#/post?id=${n}`;navigator.clipboard.writeText(t).then(()=>{Jg(`Link copied to clipboard!`)}).catch(()=>{prompt(`Copy this link:`,t)})}}),d.innerHTML=f.map(e=>`
    <button class="${e.className}" role="menuitem">
      <span class="material-symbols-outlined" style="font-size: 18px;">${e.icon}</span>
      <span>${e.label}</span>
    </button>
  `).join(``),document.body.appendChild(d),Gg=d;let p=e.getBoundingClientRect(),m=d.getBoundingClientRect(),h=p.bottom+4,g=p.right-m.width;h+m.height>window.innerHeight&&(h=p.top-m.height-4),g<8&&(g=8),d.style.top=`${h}px`,d.style.left=`${g}px`,d.querySelectorAll(`.ctx-menu-item`).forEach((e,t)=>{e.addEventListener(`click`,e=>{e.stopPropagation(),f[t].action()})}),d.addEventListener(`click`,e=>e.stopPropagation())}function Jg(e){let t=document.querySelector(`.ctx-toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`ctx-toast fade-in`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(10px)`,setTimeout(()=>n.remove(),300)},2200)}var Yg={POST_MAX_LENGTH:100,REPLY_MAX_LENGTH:100,FEED_PAGINATION_INITIAL:20},Xg=null,Zg=null;function Qg(t){if(!W.currentUser){window.location.hash=`#/login`;return}let n=W.currentUser;t.innerHTML=X(`
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
      ${Bg(n.photoURL||``,40)}
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

          <button type="button" id="inline-add-opt-btn" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px; margin-top: 4px;">
            + Add Option (Max 13)
          </button>
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

          <div class="composer-right">
            <span id="char-counter" class="char-ring">0 / ${Yg.POST_MAX_LENGTH}</span>
            <button id="post-btn" class="btn" disabled>Post</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Combined Home Feed Container (Posts + Polls) -->
    <div id="feed-container">
      ${Q(4)}
    </div>
  `,e.HOME),Z();let r=`student`;J(n.uid).then(t=>{if(t&&(r=t.role||`student`,r===`admin`||r===`staff`)){let t=document.querySelector(`.sidebar-nav`);if(t&&!t.querySelector(`a[href="#/admin"]`)){let n=document.createElement(`a`);n.href=e.ADMIN,n.className=`nav-item`,n.innerHTML=`
            <span class="material-symbols-outlined">${r===`admin`?`admin_panel_settings`:`shield_person`}</span>
            <span class="sidebar-label">${r===`admin`?`Admin`:`Staff`}</span>
          `,t.appendChild(n)}}}).catch(e=>console.error(e));let i=document.getElementById(`post-input`),a=document.getElementById(`char-counter`),o=document.getElementById(`post-btn`),s=document.getElementById(`feed-container`),c=document.getElementById(`toggle-poll-btn`),l=document.getElementById(`close-poll-btn`),u=document.getElementById(`inline-poll-builder`),d=document.getElementById(`inline-poll-options-container`),f=document.getElementById(`inline-add-opt-btn`),p=document.getElementById(`tab-for-you`),m=document.getElementById(`tab-friends`),h=!1,g=`for-you`;p.addEventListener(`click`,()=>{g=`for-you`,p.classList.add(`active`),m.classList.remove(`active`),b()}),m.addEventListener(`click`,()=>{g=`friends`,m.classList.add(`active`),p.classList.remove(`active`),b()}),c.addEventListener(`click`,()=>{h=!h,u.style.display=h?`block`:`none`,_()}),l.addEventListener(`click`,()=>{h=!1,u.style.display=`none`,_()}),f.addEventListener(`click`,()=>{let e=d.querySelectorAll(`.inline-opt-input`);if(e.length<13){let t=e.length+1,n=document.createElement(`input`);n.type=`text`,n.className=`input-field inline-opt-input fade-in`,n.placeholder=`Option ${t}`,n.style.marginBottom=`0`,n.style.padding=`8px 12px`,n.style.fontSize=`14px`,n.addEventListener(`input`,_),d.appendChild(n),e.length+1===13&&(f.style.display=`none`)}});function _(){let e=i.value.length;if(a.textContent=`${e} / ${Yg.POST_MAX_LENGTH}`,e>Yg.POST_MAX_LENGTH)a.style.color=`var(--error-color)`,o.disabled=!0;else if(h){let t=d.querySelectorAll(`.inline-opt-input`),n=Array.from(t).filter(e=>e.value.trim().length>0);o.disabled=!(e>0&&n.length>=2),a.style.color=`var(--accent-primary)`}else e===0||i.value.trim()===``?(a.style.color=`var(--text-secondary)`,o.disabled=!0):(a.style.color=`var(--accent-primary)`,o.disabled=!1)}i.addEventListener(`input`,()=>{i.style.height=`auto`,i.style.height=Math.max(54,i.scrollHeight)+`px`,_()}),d.querySelectorAll(`.inline-opt-input`).forEach(e=>{e.addEventListener(`input`,_)}),o.addEventListener(`click`,async()=>{let e=i.value.trim();if(e.length>0&&e.length<=Yg.POST_MAX_LENGTH){o.disabled=!0,o.textContent=`Posting...`;try{if(h){let t=d.querySelectorAll(`.inline-opt-input`);await ug(e,Array.from(t).map(e=>e.value.trim()).filter(Boolean)),h=!1,u.style.display=`none`,d.innerHTML=`
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          `,f.style.display=`inline-block`}else await Eh(e);i.value=``,i.style.height=`54px`,i.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(e.message||`Failed to submit post.`)}finally{o.textContent=`Post`}}});let v=[],y=[],b=async()=>{if(!s)return;let t=W.currentUser?.uid;if(!t)return;let n=[];g===`friends`&&(n=await Eg(t),n.push(t));let r=g===`friends`?v.filter(e=>n.includes(e.authorId)&&e.status!==`AWAITING_MODERATION`):v.filter(e=>e.status!==`AWAITING_MODERATION`),i=g===`friends`?y.filter(e=>n.includes(e.creatorId)):y,a=[...r.map(e=>({...e,_type:`post`})),...i.map(e=>({...e,_type:`poll`}))];if(a.sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp)),a.length===0){s.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${g===`friends`?`group_off`:`forum`}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${g===`friends`?`No activity from friends`:`No campus activity yet`}</h3>
          <p style="font-size: 14px;">${g===`friends`?`Add more classmates as friends to see their activity here!`:`Be the first student to post or create a poll on Backbench!`}</p>
        </div>
      `;return}let o=``;for(let e of a)if(e._type===`post`){let n=await J(e.authorId),r=await Fh(e.postId,t),i=await Lh(e.postId,t);o+=Ug(e,n,r,i)}else if(e._type===`poll`){let n=await J(e.creatorId),r=await dg(e.pollId,t),i=await hg(e.pollId,t),a=await _g(e.pollId,t);o+=Wg(e,n,r,i,a)}s.innerHTML=o,s.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await Ph(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),s.querySelectorAll(`.reshare-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await Ih(n);t.reshared?(e.classList.add(`reshared`),e.style.color=`#00BA7C`):(e.classList.remove(`reshared`),e.style.color=``);let r=e.querySelector(`.reshare-count`);r&&(r.textContent=t.reshares)}catch(e){console.error(e)}finally{e.disabled=!1}})}),s.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.postId,i=e.dataset.authorId,a=await J(t),o=a?.role===`staff`||a?.role===`admin`;qg(e,{itemId:r,authorId:i,currentUid:t,isStaff:o,itemType:`post`,onDelete:async n=>{try{t===i?await zh(n):o&&await Ng(n);let r=e.closest(`.post-card`);r&&(r.style.opacity=`0.3`,r.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{if((await Pg(t,n)).autoTakenDown){alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`);let t=e.closest(`.post-card`);t&&(t.style.opacity=`0.2`,t.style.pointerEvents=`none`)}else alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})}),s.querySelectorAll(`.poll-options-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=e.dataset.pollId,i=e.dataset.creatorId,a=await J(t),o=a?.role===`staff`||a?.role===`admin`;qg(e,{itemId:r,authorId:i,currentUid:t,isStaff:o,itemType:`poll`,onDelete:async n=>{try{t===i?await bg(n):o&&await xg(n);let r=e.closest(`.poll-card`);r&&(r.style.opacity=`0.3`,r.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete poll.`)}},onReport:async(e,t)=>{try{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})}),s.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.pollId,r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await fg(n,r)}catch(e){alert(e.message||`Failed to record vote`)}})}),s.querySelectorAll(`.poll-like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.pollId;e.disabled=!0;try{let t=await mg(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.poll-like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),s.querySelectorAll(`.poll-reshare-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.pollId;e.disabled=!0;try{let t=await gg(n);t.reshared?(e.classList.add(`reshared`),e.style.color=`#00BA7C`):(e.classList.remove(`reshared`),e.style.color=``);let r=e.querySelector(`.poll-reshare-count`);r&&(r.textContent=t.reshares)}catch(e){console.error(e)}finally{e.disabled=!1}})}),s.querySelectorAll(`.poll-reply-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.pollId;n&&(window.location.hash=`#/poll?id=${n}`)})}),s.querySelectorAll(`.post-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(!n.target.closest(`.action-btn`)&&!n.target.closest(`.btn-ghost`)&&!n.target.closest(`a`)){let n=t.dataset.postId;n&&(window.location.hash=`${e.POST_DETAIL}?id=${n}`)}})}),s.querySelectorAll(`.poll-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.action-btn`)&&!t.target.closest(`.btn-ghost`)&&!t.target.closest(`.poll-option-btn`)&&!t.target.closest(`a`)){let t=e.dataset.pollId;t&&(window.location.hash=`#/poll?id=${t}`)}})}),s.querySelectorAll(`.reply-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.closest(`.post-card`)?.dataset.postId;r&&(window.location.hash=`${e.POST_DETAIL}?id=${r}`)})})};Xg&&Xg(),Zg&&Zg(),Xg=Dh(Yg.FEED_PAGINATION_INITIAL,e=>{v=e,b()}),Zg=pg(20,e=>{y=e,b()})}function $g(e){return/^[a-zA-Z0-9_.]{3,20}$/.test(e)}function e_(e,t){let n=t===`#/login`;e.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; padding: 20px; background: radial-gradient(circle at top center, rgba(29, 155, 240, 0.08) 0%, transparent 60%);">
      <div class="card fade-in" style="width: 100%; max-width: 440px; padding: 32px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px);">
        
        <!-- Brand Badge -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
          <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #1D9BF0, #0077B5); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 28px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); margin-bottom: 12px;">
            B
          </div>
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
  `;let r=document.getElementById(`auth-form`),i=document.getElementById(`auth-error`),a=document.getElementById(`google-btn`),o=document.getElementById(`password`),s=document.getElementById(`toggle-password-btn`),c=`student`;if(!n){let e=document.getElementById(`select-student-btn`),t=document.getElementById(`select-teacher-btn`),n=document.getElementById(`admissionNumber`),r=document.getElementById(`class`),i=document.getElementById(`name`);e&&t&&(e.addEventListener(`click`,()=>{c=`student`,e.className=`btn`,e.style.background=`var(--accent-primary)`,t.className=`btn btn-outline`,t.style.background=`transparent`,n&&(n.placeholder=`Admission No.`),r&&(r.placeholder=`Class (e.g. 12A)`),i&&(i.placeholder=`Official Full Name`)}),t.addEventListener(`click`,()=>{c=`teacher`,t.className=`btn`,t.style.background=`#00BA7C`,e.className=`btn btn-outline`,e.style.background=`transparent`,n&&(n.placeholder=`Employee / Teacher ID`),r&&(r.placeholder=`Dept (e.g. Physics)`),i&&(i.placeholder=`Official Faculty Name (e.g. Dr. Sharma)`)}))}s.addEventListener(`click`,()=>{let e=o.type===`password`;o.type=e?`text`:`password`;let t=s.querySelector(`.material-symbols-outlined`);t.textContent=e?`visibility_off`:`visibility`,s.title=e?`Hide Password`:`Show Password`}),a.addEventListener(`click`,async()=>{a.disabled=!0,a.textContent=`Connecting...`;let e=await tg();e.success?e.needsOnboarding?window.location.hash=`#/onboarding`:window.location.hash=`#/`:(i.textContent=e.error,i.style.display=`block`,a.disabled=!1,a.innerHTML=`
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px; height: 18px;" alt="Google" />
        Continue with Google
      `)}),r.addEventListener(`submit`,async e=>{e.preventDefault(),i.style.display=`none`;let t=document.getElementById(`email`).value.trim(),a=document.getElementById(`password`).value;if(n){let e=r.querySelector(`button[type="submit"]`);e.disabled=!0,e.textContent=`Logging in...`;let n=await Qh(t,a);n.success?window.location.hash=`#/`:(i.textContent=n.error,i.style.display=`block`,e.disabled=!1,e.textContent=`Log In`)}else{let e=document.getElementById(`name`).value.trim(),n=document.getElementById(`username`).value.trim(),o=document.getElementById(`admissionNumber`).value.trim(),s=document.getElementById(`class`).value.trim(),l=document.getElementById(`mobile`).value.trim();if(!$g(n)){i.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,i.style.display=`block`;return}let u=r.querySelector(`button[type="submit"]`);u.disabled=!0,u.textContent=`Creating Account...`;let d=await Zh({email:t,password:a,username:n,name:e,admissionNumber:o,userClass:s,mobile:l,isTeacher:c===`teacher`,role:c===`teacher`?`teacher`:`student`});d.success?window.location.hash=`#/`:(i.textContent=d.error,i.style.display=`block`,u.disabled=!1,u.textContent=`Create Account`)}})}var t_=[{id:`gradient-1`,name:`SJC Ocean Blue`,gradient:`linear-gradient(135deg, #1D9BF0 0%, #004477 100%)`},{id:`gradient-2`,name:`Neon Cyberpunk`,gradient:`linear-gradient(135deg, #FF0080 0%, #7928CA 100%)`},{id:`gradient-3`,name:`Emerald Glow`,gradient:`linear-gradient(135deg, #00b09b 0%, #96c93d 100%)`},{id:`gradient-4`,name:`Golden Sunset`,gradient:`linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)`},{id:`gradient-5`,name:`Crimson Fire`,gradient:`linear-gradient(135deg, #E94057 0%, #F27121 100%)`},{id:`gradient-6`,name:`Midnight Purple`,gradient:`linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)`},{id:`gradient-7`,name:`Dark Obsidian`,gradient:`linear-gradient(135deg, #16181C 0%, #2F3336 100%)`},{id:`gradient-8`,name:`Teal Lagoon`,gradient:`linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`},{id:`gradient-9`,name:`Aurora Borealis`,gradient:`linear-gradient(135deg, #43cea2 0%, #185a9d 100%)`},{id:`gradient-10`,name:`Velvet Dusk`,gradient:`linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)`},{id:`gradient-11`,name:`Electric Violet`,gradient:`linear-gradient(135deg, #DA22FF 0%, #9733EE 100%)`},{id:`gradient-12`,name:`Cosmic Nebula`,gradient:`linear-gradient(135deg, #020024 0%, #090979 50%, #00d4ff 100%)`},{id:`gradient-13`,name:`Sunset Coral`,gradient:`linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)`},{id:`gradient-14`,name:`Emerald Forest`,gradient:`linear-gradient(135deg, #134E5E 0%, #71B280 100%)`},{id:`gradient-15`,name:`Rose Gold`,gradient:`linear-gradient(135deg, #f4c4f3 0%, #fc67fa 100%)`},{id:`gradient-16`,name:`Midnight Gold`,gradient:`linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)`},{id:`gradient-17`,name:`Cyber Matrix`,gradient:`linear-gradient(135deg, #000000 0%, #0f9b0f 100%)`},{id:`gradient-18`,name:`Plum Royalty`,gradient:`linear-gradient(135deg, #614385 0%, #516395 100%)`},{id:`gradient-19`,name:`Citrus Splash`,gradient:`linear-gradient(135deg, #FFE000 0%, #799F0C 100%)`},{id:`gradient-20`,name:`Deep Space`,gradient:`linear-gradient(135deg, #000000 0%, #434343 100%)`},{id:`gradient-21`,name:`Aether Blue`,gradient:`linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)`},{id:`gradient-22`,name:`Flamingo Coral`,gradient:`linear-gradient(135deg, #ef629f 0%, #eecda3 100%)`},{id:`gradient-23`,name:`Sublime Light`,gradient:`linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)`},{id:`gradient-24`,name:`Frosted Prism`,gradient:`linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)`}],n_=[{id:`sjc-blue`,name:`SJC Blue`,bg:`linear-gradient(135deg, rgba(29, 155, 240, 0.15) 0%, rgba(0, 68, 119, 0.3) 100%)`,border:`1px solid rgba(29, 155, 240, 0.4)`,accent:`#1D9BF0`,shadow:`0 8px 24px rgba(29, 155, 240, 0.2)`},{id:`neon-cyber`,name:`Neon Cyber`,bg:`linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(121, 40, 202, 0.3) 100%)`,border:`1px solid rgba(255, 0, 128, 0.4)`,accent:`#FF0080`,shadow:`0 8px 24px rgba(255, 0, 128, 0.2)`},{id:`emerald-glow`,name:`Emerald Glow`,bg:`linear-gradient(135deg, rgba(0, 176, 155, 0.15) 0%, rgba(150, 201, 61, 0.3) 100%)`,border:`1px solid rgba(0, 176, 155, 0.4)`,accent:`#00BA7C`,shadow:`0 8px 24px rgba(0, 186, 124, 0.2)`},{id:`golden-sunset`,name:`Golden Sunset`,bg:`linear-gradient(135deg, rgba(242, 153, 74, 0.15) 0%, rgba(242, 201, 76, 0.3) 100%)`,border:`1px solid rgba(242, 153, 74, 0.4)`,accent:`#F2994A`,shadow:`0 8px 24px rgba(242, 153, 74, 0.2)`},{id:`crimson-fire`,name:`Crimson Fire`,bg:`linear-gradient(135deg, rgba(233, 64, 87, 0.15) 0%, rgba(242, 113, 33, 0.3) 100%)`,border:`1px solid rgba(233, 64, 87, 0.4)`,accent:`#E94057`,shadow:`0 8px 24px rgba(233, 64, 87, 0.2)`},{id:`glass-minimal`,name:`Glass Minimal`,bg:`linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,border:`1px solid rgba(255, 255, 255, 0.15)`,accent:`#E7E9EA`,shadow:`0 8px 24px rgba(0, 0, 0, 0.3)`},{id:`midnight-cyber`,name:`Midnight Cyber`,bg:`linear-gradient(135deg, rgba(74, 0, 224, 0.2) 0%, rgba(142, 45, 226, 0.35) 100%)`,border:`1px solid rgba(142, 45, 226, 0.4)`,accent:`#9B51E0`,shadow:`0 8px 24px rgba(155, 81, 224, 0.25)`},{id:`sakura-blossom`,name:`Sakura Blossom`,bg:`linear-gradient(135deg, rgba(244, 196, 243, 0.15) 0%, rgba(252, 103, 250, 0.25) 100%)`,border:`1px solid rgba(252, 103, 250, 0.4)`,accent:`#FC67FA`,shadow:`0 8px 24px rgba(252, 103, 250, 0.2)`},{id:`oceanic-breeze`,name:`Oceanic Breeze`,bg:`linear-gradient(135deg, rgba(17, 153, 142, 0.15) 0%, rgba(56, 239, 125, 0.25) 100%)`,border:`1px solid rgba(56, 239, 125, 0.4)`,accent:`#38EF7D`,shadow:`0 8px 24px rgba(56, 239, 125, 0.2)`},{id:`solar-flare`,name:`Solar Flare`,bg:`linear-gradient(135deg, rgba(255, 224, 0, 0.15) 0%, rgba(121, 159, 12, 0.25) 100%)`,border:`1px solid rgba(255, 224, 0, 0.4)`,accent:`#FFD700`,shadow:`0 8px 24px rgba(255, 215, 0, 0.2)`},{id:`amethyst-dreams`,name:`Amethyst Dreams`,bg:`linear-gradient(135deg, rgba(97, 67, 133, 0.2) 0%, rgba(81, 99, 149, 0.3) 100%)`,border:`1px solid rgba(97, 67, 133, 0.4)`,accent:`#A06CD5`,shadow:`0 8px 24px rgba(160, 108, 213, 0.2)`},{id:`obsidian-frost`,name:`Obsidian Frost`,bg:`linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(47, 51, 54, 0.8) 100%)`,border:`1px solid rgba(255, 255, 255, 0.2)`,accent:`#64B5F6`,shadow:`0 8px 24px rgba(0, 0, 0, 0.5)`}],r_=[{id:`georgia`,name:`Georgia Serif`,fontFamily:`Georgia, serif`},{id:`playfair`,name:`Playfair Editorial`,fontFamily:`'Playfair Display', serif`},{id:`caveat`,name:`Caveat Script`,fontFamily:`'Caveat', cursive, sans-serif`},{id:`cinzel`,name:`Cinzel Roman`,fontFamily:`'Cinzel', serif`},{id:`vibes`,name:`Great Vibes Calligraphy`,fontFamily:`'Great Vibes', cursive, sans-serif`},{id:`pacifico`,name:`Pacifico Vintage`,fontFamily:`'Pacifico', cursive, sans-serif`}];function i_(e){let t=r_.find(t=>t.id===e);return t?t.fontFamily:r_[0].fontFamily}function a_(e){return new Promise((t,n)=>{if(!e||!e.type.startsWith(`image/`))return n(Error(`Please select a valid image file.`));if(e.size>25*1024*1024)return n(Error(`Selected image file is too large (max 25MB).`));let r=new FileReader;r.onload=e=>{let r=new Image;r.onload=()=>{let e=document.createElement(`canvas`),n=r.width,i=r.height;n>i?n>320&&(i=Math.round(i*320/n),n=320):i>320&&(n=Math.round(n*320/i),i=320),e.width=n,e.height=i;let a=e.getContext(`2d`);a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.drawImage(r,0,0,n,i),t(e.toDataURL(`image/jpeg`,.8))},r.onerror=()=>n(Error(`Failed to process mobile image. Please try a different photo.`)),r.src=e.target.result},r.onerror=()=>n(Error(`Failed to read file from phone gallery.`)),r.readAsDataURL(e)})}async function o_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Profile</h1>
      </div>
    </header>
    ${Q(2)}
  `,e.PROFILE);let n=window.location.hash,r=null,i=``;n.includes(`?u=`)&&(i=n.split(`?u=`)[1]||``,i&&(r=decodeURIComponent(i).trim().replace(/^[@\-\s]+/,``)));let a=null;try{if(r){let e=r.toLowerCase().replace(/^[@\-\s]+/,``),t=await z(I(U,G.USERS));t.exists()&&t.forEach(t=>{if(a)return;let n=t.val();if(!n)return;let o=(n.username||``).toLowerCase().replace(/^[@\-\s]+/,``),s=n.uid||``,c=(n.email||``).toLowerCase(),l=(n.name||``).toLowerCase();(o===e||s===r||s===i||c===e||o&&e&&(o.includes(e)||e.includes(o))||l&&e&&l.includes(e))&&(a=n)})}else a=await J(W.currentUser.uid)}catch(e){console.error(`Error loading profile:`,e)}if(!a&&!r&&(a=await J(W.currentUser.uid)),!a){t.innerHTML=X(`
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
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile "@${q(r||`user`)}" does not exist on Backbench.</p>
      </div>
    `,e.PROFILE),Z();return}let o=W.currentUser.uid===a.uid,s=Hg(a),c=i_(a.quoteFontId),l=!1;o||(l=await Cg(a.uid));let u=await Dg(a.uid),d=t_.find(e=>e.id===a.bannerPreset)||t_[0],f=a.bannerCustom||d.gradient,p=n_.find(e=>e.id===a.quotePreset)||n_[0],m=p.bg,h=p.border,g=p.accent,_=a.name?a.name.charAt(0).toUpperCase():`S`,v=a.profilePicture?`<img src="${a.profilePicture}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`:`<div class="avatar" style="width: 100%; height: 100%; font-size: 36px; border-radius: 50%;">${_}</div>`;t.innerHTML=X(`
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div style="display: flex; flex-direction: column;">
          <h1 class="header-title" style="font-family: ${s};">${q(a.name||`Student`)}</h1>
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
          ${v}
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
          ${q(a.name||`Student`)}
          ${a.isTeacher?`
            <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
              <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
            </span>
          `:a.verifiedStudent||a.role===`staff`||a.role===`admin`?`
            <span class="material-symbols-outlined verified-icon" style="font-size: 20px;">verified</span>
          `:``}
        </h2>
        <span style="font-size: 14px; color: var(--text-secondary);">@${q(a.username||`student`)}</span>
      </div>

      <!-- Bio / Description -->
      ${a.bio?`
        <div style="margin-top: 10px; font-size: 14px; color: var(--text-primary); line-height: 1.4; font-family: ${s};">
          ${q(a.bio)}
        </div>
      `:``}

      <!-- Custom Campus Quote Banner -->
      ${a.tagline?`
        <div style="margin-top: 12px; padding: 12px 16px; border-radius: 12px; background: ${m}; border: ${h}; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: ${g}; font-size: 22px;">format_quote</span>
          <span style="font-size: 14px; font-style: italic; color: var(--text-primary); font-family: ${c};">
            “${q(a.tagline)}”
          </span>
        </div>
      `:``}

      <!-- Meta Info Pills (Class, Admission, Mobile, Joined Date) -->
      <div style="display: flex; flex-wrap: wrap; gap: 14px; margin-top: 14px; font-size: 13px; color: var(--text-secondary);">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">school</span>
          <span>Class ${q(a.class||`N/A`)}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">badge</span>
          <span>Adm: ${q(a.admissionNumber||`N/A`)}</span>
        </div>

        ${a.mobile?`
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
            <span>${q(a.mobile)}</span>
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
    </div>

    <!-- Feed Container -->
    <div id="profile-feed-container">
      ${Q(3)}
    </div>

    <!-- Edit Profile Modal Overlay (Only rendered for own profile) -->
    ${o?s_(a):``}
  `,e.PROFILE),Z();let y=document.getElementById(`profile-feed-container`),b=document.getElementById(`profile-post-count-header`),ee=document.getElementById(`profile-tab-posts`),te=document.getElementById(`profile-tab-likes`),ne=document.getElementById(`copy-profile-frame-btn`);ne&&ne.addEventListener(`click`,()=>{let e=`${window.location.origin}${window.location.pathname}#/profile-frame?u=${encodeURIComponent(a.username||`student`)}`;navigator.clipboard.writeText(e).then(()=>{let e=ne.innerHTML;ne.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{ne.innerHTML=e},2e3)})});let re=document.getElementById(`profile-friend-btn`);re&&re.addEventListener(`click`,async()=>{re.disabled=!0;try{let e=await Tg(a.uid);re.textContent=e?`Friends`:`+ Add Friend`,re.className=`btn ${e?`btn-outline`:``}`}catch(e){alert(e.message||`Failed to update friend status`)}finally{re.disabled=!1}}),Oh(a.uid,async t=>{if(!y)return;if(b&&(b.textContent=`${t.length} Post${t.length===1?``:`s`}`),t.length===0){y.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">post_add</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
          <p style="font-size: 14px;">When ${o?`you post`:`this student posts`}, their content will appear here.</p>
        </div>
      `;return}let n=``,r=W.currentUser.uid;for(let e of t){let t=await Fh(e.postId,r),i=await Lh(e.postId,r);n+=Ug(e,a,t,i)}y.innerHTML=n,y.querySelectorAll(`.post-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(!n.target.closest(`.action-btn`)&&!n.target.closest(`.btn-ghost`)&&!n.target.closest(`a`)){let n=t.dataset.postId;n&&(window.location.hash=`${e.POST_DETAIL}?id=${n}`)}})}),y.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await Ph(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),y.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId,r=e.dataset.authorId,i=W.currentUser?.uid,a=i?await J(i):null,o=a?.role===`staff`||a?.role===`admin`;qg(e,{itemId:n,authorId:r,currentUid:i,isStaff:o,itemType:`post`,onDelete:async t=>{try{i===r?await zh(t):o&&await Ng(t);let n=e.closest(`.post-card`);n&&(n.style.opacity=`0.3`,n.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{if((await Pg(t,n)).autoTakenDown){alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`);let t=e.closest(`.post-card`);t&&(t.style.opacity=`0.2`,t.style.pointerEvents=`none`)}else alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})});let ie=`posts`;async function ae(){if(!y)return;y.innerHTML=Q(3);let t=await Rh(a.uid);if(t.length===0){y.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">favorite</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No liked posts yet</h3>
          <p style="font-size: 14px;">When ${o?`you like`:`this student likes`} a post, it will appear here.</p>
        </div>
      `;return}let n=``,r=W.currentUser?.uid;for(let e of t){let t=await J(e.authorId),i=r?await Fh(e.postId,r):!1,a=r?await Lh(e.postId,r):!1;n+=Ug(e,t,i,a)}y.innerHTML=n,y.querySelectorAll(`.post-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(!n.target.closest(`.action-btn`)&&!n.target.closest(`.btn-ghost`)&&!n.target.closest(`a`)){let n=t.dataset.postId;n&&(window.location.hash=`${e.POST_DETAIL}?id=${n}`)}})}),y.querySelectorAll(`.like-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId;e.disabled=!0;try{let t=await Ph(n);t.liked?e.classList.add(`liked`,`heart-pop`):e.classList.remove(`liked`,`heart-pop`);let r=e.querySelector(`.like-count`);r&&(r.textContent=t.likes)}catch(e){console.error(e)}finally{e.disabled=!1}})}),y.querySelectorAll(`.post-options-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.postId,r=e.dataset.authorId,i=W.currentUser?.uid,a=i?await J(i):null,o=a?.role===`staff`||a?.role===`admin`;qg(e,{itemId:n,authorId:r,currentUid:i,isStaff:o,itemType:`post`,onDelete:async t=>{try{i===r?await zh(t):o&&await Ng(t);let n=e.closest(`.post-card`);n&&(n.style.opacity=`0.3`,n.style.pointerEvents=`none`)}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(t,n)=>{try{if((await Pg(t,n)).autoTakenDown){alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`);let t=e.closest(`.post-card`);t&&(t.style.opacity=`0.2`,t.style.pointerEvents=`none`)}else alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})})})}ee&&te&&(ee.addEventListener(`click`,()=>{ie!==`posts`&&(ie=`posts`,ee.classList.add(`active`),te.classList.remove(`active`),Oh(a.uid,async e=>{if(!y||ie!==`posts`)return;if(e.length===0){y.innerHTML=`
            <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
              <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">post_add</span>
              <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
              <p style="font-size: 14px;">When ${o?`you post`:`this student posts`}, their content will appear here.</p>
            </div>
          `;return}let t=``,n=W.currentUser?.uid;for(let r of e){let e=n?await Fh(r.postId,n):!1,i=n?await Lh(r.postId,n):!1;t+=Ug(r,a,e,i)}y.innerHTML=t}))}),te.addEventListener(`click`,()=>{ie!==`likes`&&(ie=`likes`,te.classList.add(`active`),ee.classList.remove(`active`),ae())})),o&&c_(a,t)}function s_(e){let t=e.bannerPreset||t_[0].id,n=e.quotePreset||n_[0].id,r=e.fontId||Vg[0].id,i=e.quoteFontId||r_[0].id,a=t_.map(e=>`
    <div class="banner-swatch ${e.id===t?`active`:``}" data-id="${e.id}" style="background: ${e.gradient}; height: 40px; border-radius: 8px; cursor: pointer; border: 2px solid ${e.id===t?`var(--accent-primary)`:`transparent`};" title="${e.name}"></div>
  `).join(``),o=n_.map(e=>`
    <div class="quote-swatch ${e.id===n?`active`:``}" data-id="${e.id}" style="background: ${e.bg}; border: ${e.border}; height: 40px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="${e.name}">
      <span class="material-symbols-outlined" style="color: ${e.accent}; font-size: 18px;">format_quote</span>
    </div>
  `).join(``),s=Vg.map(e=>{let t=e.id===r;return`
      <div class="font-card-swatch ${t?`active`:``}" data-id="${e.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${t?`var(--accent-primary)`:`transparent`}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${e.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${e.name}</span>
        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary); font-family: ${e.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          Ag Backbench
        </span>
      </div>
    `}).join(``),c=r_.map(e=>{let t=e.id===i;return`
      <div class="quote-font-card-swatch ${t?`active`:``}" data-id="${e.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${t?`var(--accent-primary)`:`transparent`}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${e.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${e.name}</span>
        <span style="font-size: 13px; font-style: italic; color: var(--accent-primary); font-family: ${e.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          “Campus Slogan”
        </span>
      </div>
    `}).join(``);return`
    <div id="edit-profile-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; justify-content: center; align-items: center; padding: 20px;">
      <div class="card fade-in" style="width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto; padding: 24px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0,0,0,0.8);">
        
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
          <input type="text" id="edit-name" class="input-field" value="${q(e.name||``)}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Username</label>
          <input type="text" id="edit-username" class="input-field" value="${q(e.username||``)}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Bio / Description</label>
          <textarea id="edit-bio" class="input-field" rows="2" style="resize: none;">${q(e.bio||``)}</textarea>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Campus Motto / Quote</label>
          <input type="text" id="edit-tagline" class="input-field" value="${q(e.tagline||``)}" placeholder="Your personal slogan..." />

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
  `}function c_(e,t){let n=document.getElementById(`edit-profile-modal`),r=document.getElementById(`edit-profile-btn`),i=document.getElementById(`close-edit-modal-btn`),a=document.getElementById(`cancel-edit-modal-btn`),o=document.getElementById(`edit-profile-form`),s=document.getElementById(`edit-pfp-input`),c=document.getElementById(`modal-pfp-preview`),l=document.getElementById(`edit-profile-error`),u=document.getElementById(`save-edit-profile-btn`),d=e.bannerPreset||t_[0].id,f=e.quotePreset||n_[0].id,p=e.fontId||Vg[0].id,m=e.quoteFontId||r_[0].id,h=e.profilePicture||``;r&&r.addEventListener(`click`,()=>{n.style.display=`flex`});let g=()=>{n.style.display=`none`};i&&i.addEventListener(`click`,g),a&&a.addEventListener(`click`,g),t.querySelectorAll(`.banner-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.banner-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,d=e.dataset.id})}),t.querySelectorAll(`.quote-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.quote-swatch`).forEach(e=>e.style.boxShadow=`none`),e.style.boxShadow=`0 0 0 2px var(--accent-primary)`,f=e.dataset.id})}),t.querySelectorAll(`.font-card-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.font-card-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,p=e.dataset.id})}),t.querySelectorAll(`.quote-font-card-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.quote-font-card-swatch`).forEach(e=>e.style.borderColor=`transparent`),e.style.borderColor=`var(--accent-primary)`,m=e.dataset.id})}),s&&s.addEventListener(`change`,async e=>{let t=e.target.files[0];if(t)try{h=await a_(t),c.innerHTML=`<img src="${h}" style="width:100%;height:100%;object-fit:cover;" />`}catch(e){alert(e.message||`Failed to process image`)}}),o&&o.addEventListener(`submit`,async e=>{e.preventDefault(),l.style.display=`none`;let n=document.getElementById(`edit-name`).value.trim(),r=document.getElementById(`edit-username`).value.trim(),i=document.getElementById(`edit-bio`).value.trim(),a=document.getElementById(`edit-tagline`).value.trim();if(!$g(r)){l.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,l.style.display=`block`;return}u.disabled=!0,u.textContent=`Saving...`;try{await Nh(W.currentUser.uid,{name:n,username:r,bio:i,tagline:a,bannerPreset:d,quotePreset:f,fontId:p,quoteFontId:m,profilePicture:h}),g(),o_(t)}catch(e){console.error(e),l.textContent=e.message||`Failed to save profile changes.`,l.style.display=`block`,u.disabled=!1,u.textContent=`Save Changes`}})}async function l_(e){if(!W.currentUser){window.location.hash=`#/login`;return}e.innerHTML=X(`
    <header class="sticky-header">
      <h1 class="header-title">Friends</h1>
    </header>
    ${Q(3)}
  `,`#/friends`);let t=W.currentUser.uid,n=await Og(t),r=n.filter(e=>e.isMutual),i=n.filter(e=>!e.isMutual),a=`all`;function o(e){return e.length===0?`
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
        ${e.map(e=>{let t=Hg(e),n=Bg(e,50,`border: 1px solid var(--border-color);`),r=e.name?q(e.name):`Student`,i=e.username?q(e.username):`student`,a=e.isMutual;return`
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
                  
                  <span style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">@${i} · Class ${q(e.class||`N/A`)}</span>
                  ${e.tagline?`<span style="font-size: 12px; font-style: italic; color: var(--accent-primary); margin-top: 2px;">“${q(e.tagline)}”</span>`:``}
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
    `}e.innerHTML=X(`
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
  `,`#/friends`),Z();let s=document.getElementById(`friends-list-container`),c=document.getElementById(`tab-all-friends`),l=document.getElementById(`tab-real-friends`),u=document.getElementById(`tab-onesided-friends`);function d(){s.querySelectorAll(`.friend-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.btn`)){let t=e.dataset.username;window.location.hash=`#/profile?u=${t}`}})}),s.querySelectorAll(`.remove-friend-btn`).forEach(t=>{t.addEventListener(`click`,async n=>{n.stopPropagation();let r=t.dataset.uid;t.disabled=!0;try{await Tg(r),l_(e)}catch(e){alert(e.message||`Failed to remove friend.`),t.disabled=!1}})})}d(),c.addEventListener(`click`,()=>{a=`all`,c.classList.add(`active`),l.classList.remove(`active`),u.classList.remove(`active`),s.innerHTML=o(n),d()}),l.addEventListener(`click`,()=>{a=`real`,l.classList.add(`active`),c.classList.remove(`active`),u.classList.remove(`active`),s.innerHTML=o(r),d()}),u.addEventListener(`click`,()=>{a=`onesided`,u.classList.add(`active`),c.classList.remove(`active`),l.classList.remove(`active`),s.innerHTML=o(i),d()})}var u_=null;function d_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <h1 class="header-title">Notifications</h1>
    </header>
    ${Q(3)}
  `,`#/notifications`);let n=W.currentUser.uid;t.innerHTML=X(`
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
      ${Q(3)}
    </div>
  `,`#/notifications`),Z();let r=document.getElementById(`notifications-feed-container`),i=document.getElementById(`mark-all-read-btn`),a=document.getElementById(`clear-read-btn`);i&&i.addEventListener(`click`,async()=>{i.disabled=!0;try{await cg(n)}catch(e){console.error(e)}finally{i.disabled=!1}}),a&&a.addEventListener(`click`,async()=>{a.disabled=!0;try{await lg(n)}catch(e){console.error(e)}finally{a.disabled=!1}}),u_&&u_(),u_=og(n,t=>{if(!r)return;if(t.length===0){r.innerHTML=`
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">notifications_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">All Clear!</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px;">
            You have no notifications or report alerts at this time.
          </p>
        </div>
      `;return}let i=``;t.forEach(e=>{let t=!e.read,n=e.type===`MODERATION`;i+=`
        <div class="card fade-in notif-item" data-notif-id="${e.notificationId}" data-post-id="${e.postId||``}" style="padding: 16px; border-radius: 16px; margin-bottom: 12px; border: ${t?`2px solid var(--accent-primary)`:`1px solid var(--border-color)`}; background: ${t?`rgba(29, 155, 240, 0.05)`:`var(--bg-secondary)`}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: ${n?`rgba(244, 33, 46, 0.15)`:`var(--bg-tertiary)`}; display: flex; align-items: center; justify-content: center; color: ${n?`var(--error-color)`:`var(--accent-primary)`}; flex-shrink: 0;">
              <span class="material-symbols-outlined" style="font-size: 20px;">
                ${n?`warning`:`notifications`}
              </span>
            </div>

            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="brand-badge" style="font-size: 10px; ${n?`background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);`:``}">
                  ${n?`MODERATION ALERT`:`NOTIFICATION`}
                </span>
                <span style="font-size: 12px; color: var(--text-secondary);">${Rg(e.timestamp)}</span>
              </div>

              <div style="font-size: 14px; line-height: 1.4; color: var(--text-primary); font-weight: ${t?`700`:`400`};">
                ${q(e.text)}
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
      `}),r.innerHTML=i,r.querySelectorAll(`.notif-item`).forEach(t=>{t.addEventListener(`click`,async r=>{if(!r.target.closest(`.mark-read-btn`)){let r=t.dataset.notifId,i=t.dataset.postId;await sg(n,r),i&&(window.location.hash=`${e.POST_DETAIL}?id=${i}`)}})}),r.querySelectorAll(`.mark-read-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let r=e.dataset.notifId;e.disabled=!0,await sg(n,r)})})})}async function f_(e){if(!e)return null;let t=await z(I(U,`${G.POSTS}/${e}`));return t.exists()?t.val():null}async function p_(e,t){let n=W.currentUser;if(!n)throw Error(`Not authenticated`);let r=t?t.trim():``;if(!r)throw Error(`Reply cannot be empty`);if(r.length>Yg.REPLY_MAX_LENGTH)throw Error(`Reply cannot exceed ${Yg.REPLY_MAX_LENGTH} characters`);let i=ru(I(U,`${G.REPLIES}/${e}`)),a={replyId:i.key,parentPost:e,parentReply:null,authorId:n.uid,content:r,timestamp:new Date().toISOString(),likes:0};return await R(i,a),await Su(I(U,`${G.POSTS}/${e}`),e=>(e&&(e.replyCount=(e.replyCount||0)+1),e)),a}function m_(e,t){let n=I(U,`${G.REPLIES}/${e}`),r=cu(n,e=>{let n=[];e.exists()&&e.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),t(n)});return()=>lu(n,`value`,r)}var h_=null;async function g_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>
    ${Q(2)}
  `,e.HOME);let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){__(t,`No post ID provided.`);return}let i=await f_(r);if(!i){__(t,`This post has been deleted or does not exist.`);return}let a=await J(i.authorId),o=W.currentUser,s=Bg(o.photoURL||``,40),c=Bg(a,48,`border: 1px solid var(--border-color);`),l=a?.name?q(a.name):`Anonymous Student`,u=a?.username?q(a.username):`student`,d=a?.isTeacher||a?.role===`teacher`,f=a?.verifiedStudent||a?.role===`staff`||a?.role===`admin`||d,p=Hg(a),m=new Date(i.timestamp||Date.now()),h=m.toLocaleTimeString(`en-US`,{hour:`numeric`,minute:`2-digit`}),g=m.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`});t.innerHTML=X(`
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
        <a href="#/profile?u=${u}" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;" title="View @${u}'s profile">
          ${c}
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 4px; font-family: ${p};">
              ${l}
              ${d?`
                <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                  <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
                </span>
              `:f?`
                <span class="material-symbols-outlined verified-icon">verified</span>
              `:``}
            </span>
            <span style="color: var(--text-secondary); font-size: 14px;">@${u}</span>
          </div>
        </a>

        <button class="btn-ghost" id="post-detail-options-btn" title="Options">
          <span class="material-symbols-outlined" style="font-size: 20px;">more_horiz</span>
        </button>
      </div>

      <!-- Main Post Content (Large Text with Clickable Hashtags) -->
      <div style="font-size: 19px; line-height: 1.5; color: var(--text-primary); margin-bottom: 16px; word-break: break-word; font-family: ${p};">
        ${Th(i.content)}
      </div>

      <!-- Post Timestamp & Analytics Row -->
      <div style="padding: 12px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 14px; display: flex; gap: 6px;">
        <span>${h}</span>
        <span>·</span>
        <span>${g}</span>
      </div>

      <!-- Stat Metrics Row -->
      <div style="padding: 12px 0; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 20px; font-size: 14px;">
        <div><strong style="color: var(--text-primary);">${i.reshares||0}</strong> <span style="color: var(--text-secondary);">Reshares</span></div>
        <div><strong id="post-likes-stat" style="color: var(--text-primary);">${i.likes||0}</strong> <span style="color: var(--text-secondary);">Likes</span></div>
      </div>

      <!-- Interactive Actions Row -->
      <div style="display: flex; justify-content: space-around; padding-top: 12px; border-bottom: 1px solid var(--border-subtle);">
        <button class="action-btn" title="Reply">
          <span class="material-symbols-outlined">chat_bubble</span>
        </button>
        <button class="action-btn" title="Reshare">
          <span class="material-symbols-outlined">repeat</span>
        </button>
        <button class="action-btn like-btn" id="post-detail-like-btn" title="Like">
          <span class="material-symbols-outlined">favorite</span>
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
          <span id="reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${Yg.REPLY_MAX_LENGTH}</span>
          <button id="submit-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Replies Feed Container -->
    <div id="replies-feed-container">
      ${Q(2)}
    </div>
  `,e.HOME),Z();let _=document.querySelector(`.right-sidebar`);_&&Ah(i.postId,i.hashtags||[],3).then(async t=>{if(t&&t.length>0){let n=document.createElement(`div`);n.className=`widget-card fade-in`;let r=`
          <div class="widget-title">
            <span>Related Campus Posts</span>
            <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 20px;">explore</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
        `;for(let n of t){let t=await J(n.authorId);t?.name&&q(t.name),r+=`
            <div style="cursor: pointer; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);" onclick="window.location.hash='#${e.POST_DETAIL}?id=${n.postId}'">
              <div style="color: var(--text-secondary); font-size: 11px; font-weight: 700;">@${q(t?.username||`student`)}</div>
              <div style="color: var(--text-primary); font-weight: 600; line-height: 1.3; margin-top: 2px;">${q(n.content.substring(0,75))}${n.content.length>75?`...`:``}</div>
            </div>
          `}r+=`</div>`,n.innerHTML=r,_.insertBefore(n,_.children[1])}}).catch(e=>console.error(e));let v=document.getElementById(`reply-input`),y=document.getElementById(`reply-char-counter`),b=document.getElementById(`submit-reply-btn`),ee=document.getElementById(`replies-feed-container`),te=document.getElementById(`post-detail-like-btn`),ne=document.getElementById(`post-likes-stat`),re=document.getElementById(`post-detail-options-btn`);re&&re.addEventListener(`click`,async e=>{e.stopPropagation();let t=W.currentUser?.uid,n=t?await J(t):null,r=n?.role===`staff`||n?.role===`admin`;qg(re,{itemId:i.postId,authorId:i.authorId,currentUid:t,isStaff:r,itemType:`post`,onDelete:async e=>{try{t===i.authorId?await zh(e):r&&await Ng(e),window.history.back()}catch(e){alert(e.message||`Failed to delete post.`)}},onReport:async(e,t)=>{try{(await Pg(e,t)).autoTakenDown?(alert(`Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.`),window.history.back()):alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}catch(e){alert(e.message||`Failed to submit report.`)}}})}),te&&te.addEventListener(`click`,async()=>{te.disabled=!0;try{let e=await Ph(i.postId);e.liked?te.style.color=`var(--error-color)`:te.style.color=``,ne&&(ne.textContent=e.likes)}catch(e){console.error(e)}finally{te.disabled=!1}}),v.addEventListener(`input`,()=>{let e=v.value.length;y.textContent=`${e} / ${Yg.REPLY_MAX_LENGTH}`,e>Yg.REPLY_MAX_LENGTH?(y.style.color=`var(--error-color)`,b.disabled=!0):e===0||v.value.trim()===``?(y.style.color=`var(--text-secondary)`,b.disabled=!0):(y.style.color=`var(--accent-primary)`,b.disabled=!1)}),b.addEventListener(`click`,async()=>{let e=v.value.trim();if(e.length>0&&e.length<=Yg.REPLY_MAX_LENGTH){b.disabled=!0,b.textContent=`Replying...`;try{await p_(i.postId,e),v.value=``,v.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(`Failed to submit reply. Please try again.`)}finally{b.textContent=`Reply`}}}),h_&&h_(),h_=m_(i.postId,async e=>{if(!ee)return;if(e.length===0){ee.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <p style="font-size: 14px;">No replies yet. Be the first classmate to reply!</p>
        </div>
      `;return}let t=``;for(let n of e){let e=await J(n.authorId),r=Bg(e,38,`border: 1px solid var(--border-color);`),i=e?.name?q(e.name):`Student`,a=e?.username?q(e.username):`student`,o=e?.isTeacher||e?.role===`teacher`,s=e?.verifiedStudent||e?.role===`staff`||e?.role===`admin`||o,c=Hg(e);t+=`
        <div class="fade-in" style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;">
          ${r}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span style="font-weight: 700; font-size: 14px; color: var(--text-primary); font-family: ${c};">${i}</span>
                ${o?`
                  <span class="brand-badge" style="font-size: 9px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C;">Faculty</span>
                `:s?`
                  <span class="material-symbols-outlined verified-icon" style="font-size: 14px;">verified</span>
                `:``}
                <span style="font-size: 13px; color: var(--text-secondary);">@${a}</span>
                <span style="color: var(--text-secondary);">·</span>
                <span style="font-size: 13px; color: var(--text-secondary);">${Rg(n.timestamp)}</span>
              </div>
            </div>

            <div style="font-size: 15px; color: var(--text-primary); line-height: 1.4; font-family: ${c};">
              ${Th(n.content)}
            </div>
          </div>
        </div>
      `}ee.innerHTML=t})}function __(t,n){t.innerHTML=X(`
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
      <p style="color: var(--text-secondary); margin-top: 4px;">${n}</p>
    </div>
  `,e.HOME),Z()}function v_(e){e.innerHTML=X(`
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
  `,`#/search`),Z();let t=document.getElementById(`dedicated-search-input`),n=document.getElementById(`dedicated-search-results`);t.addEventListener(`input`,async()=>{let e=t.value,r=e.trim().replace(/^@+/,``).replace(/\s+/g,` `);if(r.length<3){n.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">person_search</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">Search Campus</h3>
          <p style="font-size: 14px;">Type at least 3 characters to start filtering.</p>
        </div>
      `;return}n.innerHTML=`<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Searching campus database...</div>`;try{let t=await ng(e);if(t.length===0){n.innerHTML=`
          <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
            <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">no_accounts</span>
            <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No results found</h3>
            <p style="font-size: 14px;">No student or staff found matching "${q(r)}".</p>
          </div>
        `;return}let i=``;for(let e of t){let t=await ig(e.uid),n=e.name?e.name.charAt(0).toUpperCase():`?`;i+=`
          <div class="card fade-in" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; margin-bottom: 12px; border-radius: var(--border-radius);">
            <div style="display: flex; align-items: center; gap: 14px; cursor: pointer;" class="user-profile-link" data-username="${q(e.username)}">
              <div class="avatar" style="width: 44px; height: 44px;">${n}</div>
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${q(e.name)}</span>
                <span style="font-size: 14px; color: var(--text-secondary);">@${q(e.username)} · Class ${q(e.class||`N/A`)} · Adm ${q(e.admissionNumber||`N/A`)}</span>
              </div>
            </div>

            <button class="btn ${t?`btn-outline`:``} friend-action-btn" data-uid="${e.uid}">
              ${t?`Friends`:`+ Add Friend`}
            </button>
          </div>
        `}n.innerHTML=i,n.querySelectorAll(`.user-profile-link`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`#/profile?u=${e.dataset.username}`})}),n.querySelectorAll(`.friend-action-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.uid;e.disabled=!0;try{let t=await rg(n);e.textContent=t?`Friends`:`+ Add Friend`,e.className=`btn ${t?`btn-outline`:``} friend-action-btn`}catch(e){console.error(e)}finally{e.disabled=!1}})})}catch(e){console.error(e),n.innerHTML=`<div style="padding: 20px; text-align: center; color: var(--error-color);">Failed to search campus.</div>`}})}async function y_(t){let n=W.currentUser;if(!n){window.location.hash=e.HOME;return}let r=await J(n.uid)||{};t.innerHTML=`
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
          <input class="input-field" type="text" id="onboard-name" value="${n.displayName||r.name||``}" placeholder="Full Name" required />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Choose Username</label>
          <input class="input-field" type="text" id="onboard-username" value="${r.username||n.email?.split(`@`)[0]||``}" placeholder="Username (e.g. shashwat.gupta)" required />

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
  `;let i=document.getElementById(`onboarding-form`),a=document.getElementById(`onboard-error`),o=document.getElementById(`onboard-submit-btn`),s=document.getElementById(`onboard-student-btn`),c=document.getElementById(`onboard-teacher-btn`),l=document.getElementById(`onboard-name`),u=document.getElementById(`onboard-admission`),d=document.getElementById(`onboard-class`),f=document.getElementById(`label-admission`),p=document.getElementById(`label-class`),m=r.role===`teacher`?`teacher`:`student`,h=e=>{m=e,e===`teacher`?(c.className=`btn`,c.style.background=`#00BA7C`,s.className=`btn btn-outline`,s.style.background=`transparent`,f.textContent=`Teacher / Employee ID`,u.placeholder=`e.g. T-104`,p.textContent=`Department`,d.placeholder=`e.g. Computer Science`,l.placeholder=`Official Faculty Name (e.g. Dr. Sharma)`):(s.className=`btn`,s.style.background=`var(--accent-primary)`,c.className=`btn btn-outline`,c.style.background=`transparent`,f.textContent=`Admission No.`,u.placeholder=`e.g. 10420`,p.textContent=`Class & Sec`,d.placeholder=`e.g. 12A`,l.placeholder=`Full Name`)};r.role===`teacher`&&h(`teacher`),s.addEventListener(`click`,()=>h(`student`)),c.addEventListener(`click`,()=>h(`teacher`)),i.addEventListener(`submit`,async t=>{t.preventDefault(),a.style.display=`none`;let i=l.value.trim(),s=document.getElementById(`onboard-username`).value.trim(),c=u.value.trim(),f=d.value.trim(),p=document.getElementById(`onboard-mobile`).value.trim();if(!$g(s)){a.textContent=`Username must be 3-20 characters long (letters, numbers, underscores, and dots only).`,a.style.display=`block`;return}if(!c){a.textContent=m===`teacher`?`Employee / Teacher ID is required.`:`Admission Number is required.`,a.style.display=`block`;return}if(!f){a.textContent=m===`teacher`?`Department is required.`:`Class & Section is required.`,a.style.display=`block`;return}o.disabled=!0,o.textContent=`Saving Profile...`;try{await iu(I(U,`${G.USERS}/${n.uid}`),{name:i,username:s,admissionNumber:c,class:f,mobile:p,isTeacher:m===`teacher`,role:m===`teacher`?`teacher`:r.role===`admin`?`admin`:`student`}),Mh(n.uid),window.location.hash=e.HOME}catch(e){console.error(e),a.textContent=e.message||`Failed to save profile details.`,a.style.display=`block`,o.disabled=!1,o.textContent=`Complete & Enter Backbench`}})}async function b_(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let{title:n,statement:r,category:i,targetRecipient:a,goalSignatures:o}=e;if(!n||n.trim().length===0)throw Error(`Petition title is required.`);if(!r||r.trim().length===0)throw Error(`Formal petition statement is required.`);let s=ru(I(U,G.PETITIONS)),c={petitionId:s.key,creatorId:t.uid,title:n.trim(),statement:r.trim(),category:i||`Student Welfare`,targetRecipient:a?.trim()||`St. Joseph's College Administration`,goalSignatures:parseInt(o)||100,signatureCount:0,timestamp:new Date().toISOString(),status:`ACTIVE`};return await R(s,c),c}function x_(e=20,t){let n=I(U,G.PETITIONS),r=cu(n,n=>{let r=[];n.exists()&&n.forEach(e=>{let t=e.val();t&&r.push(t)}),r.sort((e,t)=>new Date(t.timestamp||0)-new Date(e.timestamp||0)),t(r.slice(0,e))});return()=>lu(n,`value`,r)}async function S_(e){if(!e)return null;try{let t=await z(I(U,`${G.PETITIONS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching petition:`,e)}return null}async function C_(e,t){if(!t||!e)return!1;try{return(await z(I(U,`${G.PETITION_VOTES}/${e}/${t}`))).exists()}catch{return!1}}async function w_(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let n=I(U,`${G.PETITION_VOTES}/${e}/${t.uid}`);if((await z(n)).exists())throw Error(`You have already signed this petition.`);let r=await J(t.uid);await R(n,{uid:t.uid,name:r?.name||t.displayName||`Student`,username:r?.username||`student`,class:r?.class||`N/A`,admissionNumber:r?.admissionNumber||`N/A`,timestamp:new Date().toISOString()});let i=I(U,`${G.PETITIONS}/${e}`),a=0;return await Su(i,e=>(e&&(e.signatureCount=(e.signatureCount||0)+1,e.signatureCount>=(e.goalSignatures||100)&&(e.status=`GOAL ACHIEVED`),a=e.signatureCount),e)),{signed:!0,signatureCount:a}}async function T_(e){if(!e)return[];try{let t=await z(I(U,`${G.PETITION_VOTES}/${e}`));if(t.exists()){let e=t.val(),n=Object.values(e);return n.sort((e,t)=>new Date(e.timestamp||0)-new Date(t.timestamp||0)),n}}catch(e){console.error(`Error fetching petition signatories:`,e)}return[]}var E_=null;function D_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
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

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" id="submit-petition-btn" class="btn" style="font-weight: 700;">
              Launch Petition
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Active Petitions Feed -->
    <div id="petitions-feed-container" style="padding: 16px;">
      ${Q(3)}
    </div>
  `,e.PETITIONS),Z();let n=document.getElementById(`create-petition-form`),r=document.getElementById(`petition-error`),i=document.getElementById(`submit-petition-btn`),a=document.getElementById(`petitions-feed-container`);n.addEventListener(`submit`,async e=>{e.preventDefault(),r.style.display=`none`;let t=document.getElementById(`petition-title`).value.trim(),a=document.getElementById(`petition-category`).value,o=document.getElementById(`petition-goal`).value,s=document.getElementById(`petition-recipient`).value.trim(),c=document.getElementById(`petition-statement`).value.trim();i.disabled=!0,i.textContent=`Publishing...`;try{await b_({title:t,category:a,goalSignatures:o,targetRecipient:s,statement:c}),n.reset(),document.getElementById(`petition-recipient`).value=`St. Joseph's College Administration`}catch(e){r.textContent=e.message||`Failed to create petition.`,r.style.display=`block`}finally{i.disabled=!1,i.textContent=`Launch Petition`}}),E_&&E_(),E_=x_(20,async e=>{if(e.length===0){a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active petitions</h3>
          <p style="font-size: 14px;">Launch the first campus petition above to champion student causes!</p>
        </div>
      `;return}let t=W.currentUser.uid,n=``;for(let r of e){let e=await J(r.creatorId),i=await C_(r.petitionId,t),a=Bg(e,40),o=e?.name?q(e.name):`Student Representative`,s=r.signatureCount||0,c=r.goalSignatures||100,l=Math.min(100,Math.round(s/c*100)),u=s>=c,d=e?.username?q(e.username):`student`;n+=`
        <article class="card fade-in petition-card" data-petition-id="${r.petitionId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <a href="#/profile?u=${d}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${d}'s profile">
              ${a}
            </a>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span class="brand-badge" style="font-size: 11px;">${q(r.category)}</span>
                <span class="brand-badge" style="font-size: 11px; background: ${u?`rgba(0, 186, 124, 0.2)`:`rgba(29, 155, 240, 0.15)`}; color: ${u?`#00BA7C`:`var(--accent-primary)`}; border-color: ${u?`#00BA7C`:`var(--accent-primary)`};">
                  ${u?`🎉 GOAL REACHED`:`ACTIVE`}
                </span>
              </div>

              <h2 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; line-height: 1.35;">
                ${q(r.title)}
              </h2>

              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${q(r.statement)}
              </p>

              <!-- Progress Bar -->
              <div style="background: var(--bg-primary); border-radius: 12px; padding: 10px 12px; border: 1px solid var(--border-color); margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                  <span><strong style="color: var(--accent-primary); font-size: 15px;">${s}</strong> / ${c} signatures</span>
                  <span style="font-weight: 700; color: var(--text-primary);">${l}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; width: ${l}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C); transition: width 0.4s ease;"></div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <a href="#/profile?u=${d}" style="text-decoration: none; color: inherit;" title="View @${d}'s profile">
                  <span style="font-size: 12px; color: var(--text-secondary);">By <strong>${o}</strong> (@${d})</span>
                </a>
                
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-outline copy-petition-frame-btn" data-petition-id="${r.petitionId}" style="font-size: 12px; padding: 6px 10px; display: flex; align-items: center; gap: 4px;" title="Copy shareable petition paper frame link">
                    <span class="material-symbols-outlined" style="font-size: 14px;">filter_frames</span> Frame Link
                  </button>
                  <a href="#/petition-frame?id=${r.petitionId}" class="btn btn-outline view-imprint-btn" style="font-size: 12px; padding: 6px 10px;">
                    📜 Paper Mode
                  </a>
                  <button class="btn sign-petition-feed-btn" data-petition-id="${r.petitionId}" style="font-size: 12px; padding: 6px 14px;" ${i?`disabled`:``}>
                    ${i?`✓ Signed`:`✍️ Sign`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      `}a.innerHTML=n,a.querySelectorAll(`.petition-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.sign-petition-feed-btn`)&&!t.target.closest(`.view-imprint-btn`)&&!t.target.closest(`.copy-petition-frame-btn`)&&!t.target.closest(`a`)){let t=e.dataset.petitionId;window.location.hash=`#/petition-frame?id=${t}`}})}),a.querySelectorAll(`.copy-petition-frame-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.petitionId,r=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${n}`;navigator.clipboard.writeText(r).then(()=>{let t=e.innerHTML;e.textContent=`✓ Copied!`,setTimeout(()=>{e.innerHTML=t},2e3)})})}),a.querySelectorAll(`.sign-petition-feed-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.petitionId;e.disabled=!0,e.textContent=`Signing...`;try{await w_(n),e.textContent=`✓ Signed`}catch(t){alert(t.message||`Failed to sign petition.`),e.disabled=!1,e.textContent=`✍️ Sign`}})})})}async function O_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Petition Imprint</h1>
      </div>
    </header>
    ${Q(2)}
  `,e.PETITIONS);let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){k_(t,`No petition ID specified.`);return}let i=await S_(r);if(!i){k_(t,`This campus petition does not exist.`);return}let a=await J(i.creatorId),o=W.currentUser.uid,s=await C_(i.petitionId,o),c=await T_(i.petitionId),l=i.signatureCount||0,u=i.goalSignatures||100,d=Math.min(100,Math.round(l/u*100)),f=l>=u,p=a?.name?q(a.name):`Student Representative`,m=a?.username?q(a.username):`student`,h=new Date(i.timestamp||Date.now()).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`});t.innerHTML=X(`
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
          <a href="#/petition-frame?id=${i.petitionId}" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; text-decoration: none;">
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
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #1D9BF0, #004477); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 26px; box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3);">
              B
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: var(--accent-primary); text-transform: uppercase;">ST. JOSEPH'S COLLEGE</span>
              <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-top: 1px;">STUDENT CHARTER & PETITION IMPRINT</h2>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px;">${q(i.category)}</span>
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px; background: ${f?`rgba(0, 186, 124, 0.2)`:`rgba(29, 155, 240, 0.15)`}; color: ${f?`#00BA7C`:`var(--accent-primary)`}; border-color: ${f?`#00BA7C`:`var(--accent-primary)`};">
              ${f?`🎉 GOAL ACHIEVED`:`ACTIVE PETITION`}
            </span>
          </div>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); display: flex; flex-wrap: wrap; gap: 20px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <div><strong style="color: var(--text-primary);">Target Recipient:</strong> ${q(i.targetRecipient)}</div>
          <div><strong style="color: var(--text-primary);">Date Submitted:</strong> ${h}</div>
          <div><strong style="color: var(--text-primary);">Document ID:</strong> ${q(i.petitionId)}</div>
        </div>
      </div>

      <!-- Main Petition Title & Progress -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--text-primary); line-height: 1.35; margin-bottom: 12px;">
          ${q(i.title)}
        </h1>

        <!-- Signature Progress Bar -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; margin-bottom: 8px;">
            <span style="font-weight: 700; color: var(--text-primary);">
              <strong id="signature-count-display" style="font-size: 18px; color: var(--accent-primary);">${l}</strong> signatures collected
            </span>
            <span style="color: var(--text-secondary); font-weight: 600;">Goal: ${u}</span>
          </div>

          <div style="width: 100%; height: 10px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
            <div id="signature-progress-fill" style="height: 100%; width: ${d}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C); transition: width 0.4s ease;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary); margin-top: 8px;">
            <span>${d}% of goal reached</span>
            <span>Created by @${m} (${p})</span>
          </div>
        </div>

        <!-- Digital Sign Action Button (Print Hidden) -->
        <div class="print-hide" style="margin-bottom: 24px;">
          <button id="sign-petition-btn" class="btn" style="width: 100%; padding: 14px; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3);" ${s?`disabled`:``}>
            <span class="material-symbols-outlined">draw</span>
            <span>${s?`✓ You Have Signed This Petition`:`✍️ Sign This Petition`}</span>
          </button>
        </div>

        <!-- Formal Petition Demand Statement -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 800; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Statement of Student Demand
          </h3>
          <div style="font-size: 16px; line-height: 1.6; color: var(--text-primary); white-space: pre-line; word-break: break-word;">
            ${q(i.statement)}
          </div>
        </div>

        <!-- Signatures Roster / Roll of Honor -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
            <span style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--accent-primary);">verified</span>
              Verified Signatures Roster (${c.length})
            </span>
            <span style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">Digital Signatures Log</span>
          </h3>

          <div id="signatories-list-container">
            ${c.length===0?`
              <div style="padding: 30px; text-align: center; color: var(--text-secondary); font-size: 14px;">
                No signatures recorded yet. Be the first student to sign this petition!
              </div>
            `:`
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                    <th style="padding: 10px 8px;">#</th>
                    <th style="padding: 10px 8px;">Student Name</th>
                    <th style="padding: 10px 8px;">Class</th>
                    <th style="padding: 10px 8px;">Date & Time Signed</th>
                  </tr>
                </thead>
                <tbody id="signatories-tbody">
                  ${c.map((e,t)=>`
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 12px 8px; font-weight: 700; color: var(--text-secondary);">${t+1}</td>
                      <td style="padding: 12px 8px; font-weight: 700; color: var(--text-primary);">${q(e.name)} <span style="font-weight: 400; color: var(--text-secondary); font-size: 12px;">(@${q(e.username)})</span></td>
                      <td style="padding: 12px 8px; color: var(--text-secondary);">${q(e.class||`N/A`)}</td>
                      <td style="padding: 12px 8px; color: var(--text-secondary); font-size: 13px;">${new Date(e.timestamp).toLocaleString(`en-US`,{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`})}</td>
                    </tr>
                  `).join(``)}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>
    </div>
  `,e.PETITIONS),Z();let g=document.getElementById(`print-petition-btn`),_=document.getElementById(`copy-detail-frame-link-btn`),v=document.getElementById(`sign-petition-btn`),y=document.getElementById(`signature-count-display`),b=document.getElementById(`signature-progress-fill`);_&&_.addEventListener(`click`,()=>{let e=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${i.petitionId}`;navigator.clipboard.writeText(e).then(()=>{_.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{_.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span> Copy Frame Link`},2e3)})}),g&&g.addEventListener(`click`,()=>{window.print()}),v&&v.addEventListener(`click`,async()=>{v.disabled=!0,v.textContent=`Recording Signature...`;try{let e=await w_(i.petitionId);if(v.textContent=`✓ You Have Signed This Petition`,y&&(y.textContent=e.signatureCount),b){let t=Math.min(100,Math.round(e.signatureCount/u*100));b.style.width=`${t}%`}setTimeout(()=>O_(t),800)}catch(e){console.error(e),alert(e.message||`Failed to sign petition.`),v.disabled=!1,v.textContent=`✍️ Sign This Petition`}})}function k_(t,n){t.innerHTML=X(`
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
      <p style="color: var(--text-secondary); margin-top: 4px;">${n}</p>
    </div>
  `,e.PETITIONS),Z()}async function A_(t){let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){j_(t,`No petition ID specified in frame URL.`);return}t.innerHTML=`
    <div style="min-height: 100vh; background: #0f1115; color: #f7f9f9; padding: 20px 12px; font-family: var(--font-family);">
      <div style="max-width: 800px; margin: 0 auto;">
        ${Q(3)}
      </div>
    </div>
  `;let i=await S_(r);if(!i){j_(t,`This campus petition frame could not be found.`);return}let a=await J(i.creatorId),o=W.currentUser,s=o?await C_(i.petitionId,o.uid):!1,c=await T_(i.petitionId),l=i.signatureCount||0,u=i.goalSignatures||100,d=Math.min(100,Math.round(l/u*100)),f=l>=u,p=a?.name?q(a.name):`Student Representative`,m=a?.username?q(a.username):`student`,h=new Date(i.timestamp||Date.now()).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}),g=`${window.location.origin}${window.location.pathname}#/petition-frame?id=${i.petitionId}`;t.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #111827; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Navigation & Action Header -->
      <div style="max-width: 840px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336; color: #f7f9f9;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${e.PETITIONS}" class="btn-ghost" title="Back to Backbench" style="color: #f7f9f9;">
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

      ${o?``:`
        <!-- Authentication Prompt Banner if Logged Out -->
        <div style="max-width: 840px; margin: 0 auto 20px auto; background: linear-gradient(90deg, #1d9bf0, #00ba7c); padding: 14px 20px; border-radius: 14px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 8px 24px rgba(29, 155, 240, 0.3);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="material-symbols-outlined" style="font-size: 24px;">lock_open</span>
            <div>
              <strong style="font-size: 15px;">Sign in to add your verified student signature</strong>
              <div style="font-size: 12px; opacity: 0.9;">You are viewing this petition frame document. Log in to sign.</div>
            </div>
          </div>
          <a href="#/login?redirect=${encodeURIComponent(`#/petition-frame?id=${i.petitionId}`)}" class="btn" style="background: #ffffff; color: #000000; font-weight: 800; padding: 8px 18px; font-size: 13px; text-decoration: none;">
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
            Document ID: ${q(i.petitionId)} • Category: ${q(i.category)}
          </div>
        </div>

        <!-- Petition Metadata Banner -->
        <div style="background: #F4EFE6; border: 1px solid #D8CBBC; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Target Authority</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${q(i.targetRecipient)}</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Petition Sponsor</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${p} (@${m})</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Date Filed</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${h}</div>
          </div>
        </div>

        <!-- Title of Demand -->
        <div style="margin-bottom: 24px;">
          <span style="font-size: 12px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px;">SUBJECT MATTER OF PETITION</span>
          <h2 style="font-size: 22px; font-weight: 900; color: #111827; line-height: 1.35; font-family: serif; margin-top: 4px;">
            "${q(i.title)}"
          </h2>
        </div>

        <!-- Formal Statement of Demand -->
        <div style="background: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #1E3A8A; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
          <h3 style="font-size: 13px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Declaration & Student Demand Statement
          </h3>
          <div style="font-size: 16px; line-height: 1.7; color: #1F2937; font-family: serif; white-space: pre-line; word-break: break-word;">
            ${q(i.statement)}
          </div>
        </div>

        <!-- Live Signatures Progress Box -->
        <div style="background: #F4EFE6; border: 2px solid #C5B396; border-radius: 14px; padding: 20px; margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 15px; font-weight: 800; color: #111827; display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #1D9BF0;">verified</span>
              Verified Student Signatures: <strong id="frame-count-display" style="font-size: 20px; color: #1E3A8A;">${l}</strong> / ${u} Required
            </span>
            <span style="font-size: 14px; font-weight: 800; color: ${f?`#059669`:`#1D9BF0`};">
              ${d}% Signed ${f?`🎉 (GOAL ACHIEVED)`:``}
            </span>
          </div>

          <div style="width: 100%; height: 12px; background: #D8CBBC; border-radius: 9999px; overflow: hidden;">
            <div id="frame-progress-fill" style="height: 100%; width: ${d}%; background: linear-gradient(90deg, #1E3A8A, #059669); transition: width 0.4s ease;"></div>
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
          ${o?`
            <button id="frame-sign-btn" class="btn" style="background: linear-gradient(135deg, #1E3A8A, #1D9BF0); color: #FFFFFF; font-size: 17px; font-weight: 800; padding: 16px 36px; border-radius: 12px; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(30, 58, 138, 0.4); display: inline-flex; align-items: center; gap: 10px;" ${s?`disabled`:``}>
              <span class="material-symbols-outlined" style="font-size: 22px;">draw</span>
              <span>${s?`✓ Official Signature Recorded`:`✍️ Sign This Official Petition Paper`}</span>
            </button>
          `:`
            <a href="#/login?redirect=${encodeURIComponent(`#/petition-frame?id=${i.petitionId}`)}" class="btn" style="background: #1E3A8A; color: #FFFFFF; font-size: 16px; font-weight: 800; padding: 16px 36px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined">login</span>
              Log In to Sign Petition
            </a>
          `}
        </div>

        <!-- Verified Signatures Table Roster -->
        <div>
          <h3 style="font-size: 16px; font-weight: 900; font-family: serif; color: #111827; margin-bottom: 14px; border-bottom: 2px solid #D8CBBC; padding-bottom: 8px;">
            ROLL OF VERIFIED SIGNATORIES (${c.length})
          </h3>

          ${c.length===0?`
            <div style="padding: 24px; text-align: center; color: #6B7280; font-style: italic;">
              No signatures recorded on paper yet. Be the first student to sign!
            </div>
          `:`
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="border-bottom: 2px solid #D8CBBC; color: #4B5563; font-weight: 800; text-transform: uppercase; font-size: 11px;">
                  <th style="padding: 8px;">No.</th>
                  <th style="padding: 8px;">Signatory Name</th>
                  <th style="padding: 8px;">Class / Department</th>
                  <th style="padding: 8px;">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                ${c.map((e,t)=>`
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 10px 8px; font-weight: 800; color: #6B7280;">${t+1}</td>
                    <td style="padding: 10px 8px; font-weight: 800; color: #111827;">${q(e.name)} <span style="font-weight: 400; color: #6B7280;">(@${q(e.username)})</span></td>
                    <td style="padding: 10px 8px; color: #4B5563;">${q(e.class||`SJC Student`)}</td>
                    <td style="padding: 10px 8px; color: #6B7280; font-size: 12px;">${new Date(e.timestamp).toLocaleString()}</td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          `}
        </div>

        <!-- Document Footer Stamp -->
        <div style="margin-top: 40px; border-top: 1px dashed #C5B396; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #8A7352;">
          <span>Backbench Campus Petitions Charter</span>
          <span>Verified Digital Imprint Seal</span>
        </div>
      </div>
    </div>
  `;let _=document.getElementById(`copy-petition-frame-link-btn`),v=document.getElementById(`frame-sign-btn`),y=document.getElementById(`frame-count-display`),b=document.getElementById(`frame-progress-fill`);_&&_.addEventListener(`click`,()=>{navigator.clipboard.writeText(g).then(()=>{_.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{_.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Frame Link`},2e3)})}),v&&v.addEventListener(`click`,async()=>{v.disabled=!0,v.textContent=`Recording Signature...`;try{let e=await w_(i.petitionId);if(v.textContent=`✓ Official Signature Recorded`,y&&(y.textContent=e.signatureCount),b){let t=Math.min(100,Math.round(e.signatureCount/u*100));b.style.width=`${t}%`}setTimeout(()=>A_(t),800)}catch(e){alert(e.message||`Failed to record signature.`),v.disabled=!1,v.textContent=`✍️ Sign This Official Petition Paper`}})}function j_(t,n){t.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
      <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">gavel</span>
      <h1 style="font-size: 24px; font-weight: 800;">Petition Frame Not Found</h1>
      <p style="color: var(--text-secondary); margin-top: 8px;">${n}</p>
      <a href="${e.PETITIONS}" class="btn" style="display: inline-block; margin-top: 24px;">Return to Petitions</a>
    </div>
  `}async function M_(t){let n=window.location.hash,r=null;n.includes(`?u=`)&&(r=n.split(`?u=`)[1]?.replace(/^[@\-\s]+/,``)),r||=W.currentUser?.displayName||`student`;let i=null;try{let e=await z(I(U,G.USERS));if(e.exists()){let t=e.val();for(let e in t){let n=t[e];if(n.username&&n.username.toLowerCase()===r.toLowerCase()){i=n;break}}}}catch(e){console.error(e)}if(!i){t.innerHTML=`
      <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
        <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">person_off</span>
        <h1 style="font-size: 24px; font-weight: 800;">Student Profile Frame Not Found</h1>
        <p style="color: var(--text-secondary); margin-top: 8px;">The account @${q(r)} could not be loaded.</p>
      </div>
    `;return}let a=W.currentUser?.uid,o=a===i.uid,s=await Dg(i.uid),c=a&&!o?await Cg(i.uid):!1,l=Hg(i),u=Bg(i,96,`border: 4px solid #16181c; box-shadow: 0 8px 24px rgba(0,0,0,0.5);`),d=i.name?q(i.name):`Anonymous Student`,f=i.username?q(i.username):`student`,p=i.isTeacher||i.role===`teacher`,m=i.verifiedStudent||i.role===`staff`||i.role===`admin`||p,h=`${window.location.origin}${window.location.pathname}#/profile-frame?u=${f}`;t.innerHTML=`
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Action Bar -->
      <div style="max-width: 680px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${e.PROFILE}?u=${f}" class="btn-ghost" title="Open Full Profile" style="color: #f7f9f9;">
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
              ${p?`
                <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
                </span>
              `:m?`
                <span class="material-symbols-outlined verified-icon" style="font-size: 22px;">verified</span>
              `:``}
            </h1>
            <div style="color: var(--text-secondary); font-size: 15px; font-weight: 500;">@${f}</div>
          </div>

          <!-- Bio / Motto Box -->
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; font-size: 14px; color: var(--text-primary); line-height: 1.5;">
            ${q(i.bio||`SJC Backbench Student Account`)}
          </div>

          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #202327; border-radius: 14px; padding: 16px; text-align: center; margin-bottom: 24px; border: 1px solid var(--border-color);">
            <div>
              <div style="font-size: 20px; font-weight: 800; color: var(--accent-primary);">${s}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Classmates</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #00BA7C;">${q(i.department||i.course||`SJC`)}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Dept / Stream</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #F4511E;">Verified</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Status</div>
            </div>
          </div>

          <!-- Direct Link to Full Backbench Account -->
          <div style="display: flex; gap: 12px;">
            <a href="${e.PROFILE}?u=${f}" class="btn" style="flex: 1; text-align: center; font-weight: 700; text-decoration: none;">
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
  `;let g=document.getElementById(`copy-profile-frame-link-btn`),_=document.getElementById(`frame-friend-btn`);g&&g.addEventListener(`click`,()=>{navigator.clipboard.writeText(h).then(()=>{g.textContent=`✓ Frame Link Copied!`,setTimeout(()=>{g.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Account Frame Link`},2e3)})}),_&&_.addEventListener(`click`,async()=>{_.disabled=!0;try{let e=await Tg(i.uid);_.textContent=e?`✓ Friends`:`+ Add Friend`,_.className=`btn ${e?`btn-outline`:``}`}catch(e){alert(e.message||`Failed to update friend status`)}finally{_.disabled=!1}})}var N_=null;function P_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
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

          <button type="button" id="submit-poll-btn" class="btn">
            Publish Poll
          </button>
        </div>

        <div id="poll-error" class="error-text" style="display: none; margin-top: 12px; margin-bottom: 0;"></div>
      </div>
    </div>

    <!-- Active Polls Feed -->
    <div id="polls-feed-container" style="padding: 16px;">
      ${Q(3)}
    </div>
  `,e.POLLS),Z();let n=document.getElementById(`poll-question`),r=document.getElementById(`poll-options-inputs`),i=document.getElementById(`add-option-btn`),a=document.getElementById(`submit-poll-btn`),o=document.getElementById(`poll-error`),s=document.getElementById(`polls-feed-container`);i.addEventListener(`click`,()=>{let e=r.querySelectorAll(`.poll-opt-input`);if(e.length<13){let t=e.length+1,n=document.createElement(`input`);n.type=`text`,n.className=`input-field poll-opt-input fade-in`,n.placeholder=`Option ${t}`,n.style.marginBottom=`0`,r.appendChild(n),e.length+1===13&&(i.style.display=`none`)}}),a.addEventListener(`click`,async()=>{o.style.display=`none`;let e=n.value.trim(),t=r.querySelectorAll(`.poll-opt-input`),s=Array.from(t).map(e=>e.value.trim());a.disabled=!0,a.textContent=`Publishing...`;try{await ug(e,s),n.value=``,r.innerHTML=`
        <input type="text" class="input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 0;" />
        <input type="text" class="input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 0;" />
      `,i.style.display=`inline-block`}catch(e){o.textContent=e.message,o.style.display=`block`}finally{a.disabled=!1,a.textContent=`Publish Poll`}}),N_&&N_(),N_=pg(20,async e=>{if(e.length===0){s.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">poll</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active polls</h3>
          <p style="font-size: 14px;">Create the first poll above to gather student opinions!</p>
        </div>
      `;return}let t=``,n=W.currentUser.uid;for(let r of e){let e=await J(r.creatorId),i=await dg(r.pollId,n);t+=Wg(r,e,i)}s.innerHTML=t,s.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.pollId,r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await fg(n,r)}catch(e){alert(e.message||`Failed to record vote`)}})})})}var F_=null;async function I_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>
    ${Q(2)}
  `,e.POLLS);let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){L_(t,`No poll ID specified.`);return}let i=await Sg(r);if(!i){L_(t,`This campus poll does not exist or has been deleted.`);return}let a=await J(i.creatorId),o=W.currentUser.uid,s=await dg(i.pollId,o),c=await hg(i.pollId,o),l=await _g(i.pollId,o),u=W.currentUser,d=Bg(u.photoURL||``,40);t.innerHTML=X(`
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
    <div style="padding: 16px 16px 0 16px;">
      ${Wg(i,a,s,c,l)}
    </div>

    <!-- Reply Composer -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;" class="fade-in">
      ${d}
      <div style="flex: 1; min-width: 0;">
        <textarea id="poll-reply-input" class="input-field" placeholder="Post your reply to this poll..." rows="2" style="resize: none; font-size: 15px; border: none; background: transparent; padding: 0; outline: none; box-shadow: none;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <span id="poll-reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${Yg.REPLY_MAX_LENGTH}</span>
          <button id="submit-poll-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Poll Replies Feed Container -->
    <div id="poll-replies-container" style="padding: 16px;">
      ${Q(2)}
    </div>
  `,e.POLLS),Z();let f=document.getElementById(`poll-reply-input`),p=document.getElementById(`poll-reply-char-counter`),m=document.getElementById(`submit-poll-reply-btn`),h=document.getElementById(`poll-replies-container`);t.querySelectorAll(`.poll-option-btn`).forEach(e=>{e.addEventListener(`click`,async n=>{n.stopPropagation();let r=parseInt(e.dataset.optionIndex);e.disabled=!0,e.textContent=`Recording vote...`;try{await fg(i.pollId,r),I_(t)}catch(e){alert(e.message||`Failed to record vote.`)}})});let g=t.querySelector(`.poll-like-btn`);g&&g.addEventListener(`click`,async e=>{e.stopPropagation(),g.disabled=!0;try{let e=await mg(i.pollId);e.liked?g.classList.add(`liked`,`heart-pop`):g.classList.remove(`liked`,`heart-pop`);let t=g.querySelector(`.poll-like-count`);t&&(t.textContent=e.likes)}catch(e){console.error(e)}finally{g.disabled=!1}});let _=t.querySelector(`.poll-reshare-btn`);_&&_.addEventListener(`click`,async e=>{e.stopPropagation(),_.disabled=!0;try{let e=await gg(i.pollId);e.reshared?(_.classList.add(`reshared`),_.style.color=`#00BA7C`):(_.classList.remove(`reshared`),_.style.color=``);let t=_.querySelector(`.poll-reshare-count`);t&&(t.textContent=e.reshares)}catch(e){console.error(e)}finally{_.disabled=!1}});let v=t.querySelector(`.poll-options-btn`);v&&v.addEventListener(`click`,async e=>{e.stopPropagation();let t=await J(o),n=t?.role===`staff`||t?.role===`admin`;qg(v,{itemId:i.pollId,authorId:i.creatorId,currentUid:o,isStaff:n,itemType:`poll`,onDelete:async e=>{try{o===i.creatorId?await bg(e):n&&await xg(e),window.history.back()}catch(e){alert(e.message||`Failed to delete poll.`)}},onReport:async(e,t)=>{alert(`Thank you for reporting. Your report has been submitted to SJC Moderation.`)}})}),f.addEventListener(`input`,()=>{let e=f.value.length;p.textContent=`${e} / ${Yg.REPLY_MAX_LENGTH}`,e>Yg.REPLY_MAX_LENGTH?(p.style.color=`var(--error-color)`,m.disabled=!0):e===0||f.value.trim()===``?(p.style.color=`var(--text-secondary)`,m.disabled=!0):(p.style.color=`var(--accent-primary)`,m.disabled=!1)}),m.addEventListener(`click`,async()=>{let e=f.value.trim();if(e.length>0&&e.length<=Yg.REPLY_MAX_LENGTH){m.disabled=!0,m.textContent=`Replying...`;try{await vg(i.pollId,e),f.value=``,f.dispatchEvent(new Event(`input`))}catch(e){console.error(e),alert(e.message||`Failed to submit reply.`)}finally{m.textContent=`Reply`}}}),F_&&F_(),F_=yg(i.pollId,async e=>{if(!h)return;if(e.length===0){h.innerHTML=`
        <div style="padding: 30px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 36px; color: var(--text-muted); margin-bottom: 8px;">chat_bubble_outline</span>
          <div style="font-size: 14px; font-weight: 600;">No replies yet</div>
          <div style="font-size: 13px; margin-top: 2px;">Be the first student to share your thoughts on this poll!</div>
        </div>
      `;return}let t=``;for(let n of e){let e=await J(n.authorId),r=e?.name?q(e.name):`Student`,i=e?.username?q(e.username):`student`,a=Bg(e,36),o=Hg(e);t+=`
        <div class="card fade-in" style="padding: 14px; margin-bottom: 10px; border-radius: 12px; display: flex; gap: 10px;">
          ${a}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 14px; font-family: ${o}; color: var(--text-primary);">${r}</span>
                <span style="font-size: 13px; color: var(--text-secondary);">@${i}</span>
              </div>
              <span style="font-size: 12px; color: var(--text-secondary);">${Rg(n.timestamp)}</span>
            </div>
            <div style="font-size: 14px; line-height: 1.45; color: var(--text-primary); font-family: ${o};">
              ${q(n.content)}
            </div>
          </div>
        </div>
      `}h.innerHTML=t})}function L_(t,n){t.innerHTML=X(`
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
      <p style="color: var(--text-secondary); margin-top: 4px;">${n}</p>
    </div>
  `,e.POLLS),Z()}function R_(e){e.innerHTML=X(`
    <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border-color);">
      <h2 style="font-size: 20px;">Announcements</h2>
    </div>
    <div style="padding: var(--spacing-lg); text-align: center; color: var(--text-secondary);">
      <span class="material-icons" style="font-size: 48px; margin-bottom: 16px;">announcement</span>
      <h3>Official Announcements</h3>
      <p style="margin-top: 8px;">Updates from the staff and admin. Coming soon.</p>
    </div>
  `),Z()}async function z_(e){let t=W.currentUser;if(!t)throw Error(`Not authenticated`);let{title:n,description:r,category:i,date:a,time:o,location:s,capacity:c}=e;if(!n||n.trim().length===0)throw Error(`Event title is required.`);if(!a||!o||!s)throw Error(`Event date, time, and venue location are required.`);let l=ru(I(U,G.EVENTS)),u={eventId:l.key,creatorId:t.uid,title:n.trim(),description:r?.trim()||``,category:i||`General`,date:a,time:o,location:s.trim(),capacity:parseInt(c)||100,attendeeCount:0,timestamp:new Date().toISOString(),status:`UPCOMING`};return await R(l,u),u}function B_(e){let t=I(U,G.EVENTS),n=cu(t,t=>{let n=[];t.exists()&&t.forEach(e=>{let t=e.val();t&&n.push(t)}),n.sort((e,t)=>new Date((e.date||``)+` `+(e.time||``))-new Date((t.date||``)+` `+(t.time||``))),e(n)});return()=>lu(t,`value`,n)}async function V_(e){if(!e)return null;try{let t=await z(I(U,`${G.EVENTS}/${e}`));if(t.exists())return t.val()}catch(e){console.error(`Error fetching event:`,e)}return null}async function H_(e,t){if(!t||!e)return null;try{let n=await z(I(U,`eventRSVPs/${e}/${t}`));if(n.exists())return n.val().status}catch(e){console.error(`Error checking RSVP status:`,e)}return null}async function U_(e,t=`attending`){let n=W.currentUser;if(!n)throw Error(`Not authenticated`);let r=I(U,`eventRSVPs/${e}/${n.uid}`),i=await z(r),a=await J(n.uid),o=!1,s=!1;i.exists()?i.val().status===t?(await L(r),s=!0):await R(r,{uid:n.uid,status:t,name:a?.name||n.displayName||`Student`,class:a?.class||`N/A`,timestamp:new Date().toISOString()}):(await R(r,{uid:n.uid,status:t,name:a?.name||n.displayName||`Student`,class:a?.class||`N/A`,timestamp:new Date().toISOString()}),o=!0);let c=I(U,`${G.EVENTS}/${e}`),l=0;return await Su(c,e=>(e&&(o&&t===`attending`?e.attendeeCount=(e.attendeeCount||0)+1:s&&(e.attendeeCount=Math.max(0,(e.attendeeCount||0)-1)),l=e.attendeeCount),e)),{status:s?null:t,attendeeCount:l}}async function W_(e){if(!e)return[];try{let t=await z(I(U,`eventRSVPs/${e}`));if(t.exists()){let e=t.val();return Object.values(e)}}catch(e){console.error(`Error fetching event attendees:`,e)}return[]}var G_=null;function K_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
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
      ${Q(3)}
    </div>
  `,e.EVENTS),Z();let n=document.getElementById(`create-event-form`),r=document.getElementById(`event-error`),i=document.getElementById(`submit-event-btn`),a=document.getElementById(`events-feed-container`),o=document.getElementById(`tab-all-events`),s=document.getElementById(`tab-my-events`),c=`all`,l=[];o.addEventListener(`click`,()=>{c=`all`,o.classList.add(`active`),s.classList.remove(`active`),d()}),s.addEventListener(`click`,()=>{c=`my`,s.classList.add(`active`),o.classList.remove(`active`),d()});let u=document.getElementById(`event-date`);u&&(u.value=new Date().toISOString().split(`T`)[0]),n.addEventListener(`submit`,async e=>{e.preventDefault(),r.style.display=`none`;let t=document.getElementById(`event-title`).value.trim(),a=document.getElementById(`event-category`).value,o=document.getElementById(`event-capacity`).value,s=document.getElementById(`event-date`).value,c=document.getElementById(`event-time`).value,l=document.getElementById(`event-location`).value.trim(),d=document.getElementById(`event-description`).value.trim();i.disabled=!0,i.textContent=`Publishing...`;try{await z_({title:t,category:a,capacity:o,date:s,time:c,location:l,description:d}),n.reset(),u.value=new Date().toISOString().split(`T`)[0]}catch(e){r.textContent=e.message||`Failed to create event.`,r.style.display=`block`}finally{i.disabled=!1,i.textContent=`Publish Event`}});let d=async()=>{if(!a)return;let e=W.currentUser.uid,t=l;if(c===`my`){let n=[];for(let t of l){let r=await H_(t.eventId,e);(r===`attending`||r===`interested`)&&n.push(t)}t=n}if(t.length===0){a.innerHTML=`
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${c===`my`?`confirmation_number`:`event`}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${c===`my`?`No registered event passes`:`No upcoming campus events`}</h3>
          <p style="font-size: 14px;">${c===`my`?`RSVP to an upcoming event to save your ticket pass here!`:`Be the first student to publish an event above!`}</p>
        </div>
      `;return}let n=``;for(let r of t){let t=await J(r.creatorId),i=await H_(r.eventId,e),a=t?.name?q(t.name):`SJC Host`,o=r.attendeeCount||0,s=r.capacity||100,c=Math.min(100,Math.round(o/s*100));n+=`
        <article class="card fade-in event-card" data-event-id="${r.eventId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="brand-badge" style="font-size: 11px;">${q(r.category)}</span>
            <span style="font-size: 12px; font-weight: 700; color: var(--accent-primary);">Hosted by ${a}</span>
          </div>

          <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; line-height: 1.3;">
            ${q(r.title)}
          </h2>

          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">calendar_month</span>
              <span>${q(r.date)} · ${q(r.time)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">location_on</span>
              <span>${q(r.location)}</span>
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
      `}a.innerHTML=n,a.querySelectorAll(`.event-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(!t.target.closest(`.event-rsvp-btn`)&&!t.target.closest(`.view-pass-btn`)){let t=e.dataset.eventId;window.location.hash=`#/event?id=${t}`}})}),a.querySelectorAll(`.event-rsvp-btn`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.eventId;e.disabled=!0;try{let t=await U_(n,`attending`);e.textContent=t.status===`attending`?`✓ Going`:`🎟️ RSVP Going`,e.className=`btn ${t.status===`attending`?``:`btn-outline`} event-rsvp-btn`}catch(e){alert(e.message||`Failed to update RSVP`)}finally{e.disabled=!1}})})};G_&&G_(),G_=B_(e=>{l=e,d()})}async function q_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Event Ticket Pass</h1>
      </div>
    </header>
    ${Q(2)}
  `,e.EVENTS);let n=window.location.hash,r=null;if(n.includes(`?id=`)&&(r=n.split(`?id=`)[1]),!r){J_(t,`No event specified.`);return}let i=await V_(r);if(!i){J_(t,`This campus event does not exist or has been cancelled.`);return}let a=await J(i.creatorId),o=W.currentUser.uid,s=await H_(i.eventId,o),c=await W_(i.eventId),l=i.attendeeCount||0,u=i.capacity||100,d=Math.min(100,Math.round(l/u*100)),f=l>=u,p=a?.name?q(a.name):`SJC Event Host`,m=a?.username?q(a.username):`student`;t.innerHTML=X(`
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
              ${q(i.category)}
            </span>
            <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 9999px;">
              ST. JOSEPH'S COLLEGE OFFICIAL PASS
            </span>
          </div>

          <h1 style="font-size: 24px; font-weight: 800; line-height: 1.3; margin-bottom: 8px;">
            ${q(i.title)}
          </h1>

          <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; opacity: 0.9;">
            <span class="material-symbols-outlined" style="font-size: 18px;">person</span>
            <span>Hosted by <strong>${p}</strong> (@${m})</span>
          </div>
        </div>

        <!-- Ticket Body Details -->
        <div style="padding: 24px; background: var(--bg-secondary);">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">calendar_month</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Date</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${q(i.date)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">schedule</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Time</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${q(i.time)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; grid-column: span 2;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">location_on</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Venue Location</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${q(i.location)}</div>
              </div>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
              <span style="font-weight: 700; color: var(--text-primary);">
                <strong style="color: var(--accent-primary); font-size: 16px;">${l}</strong> / ${u} seats reserved
              </span>
              <span style="font-weight: 700; color: ${f?`var(--error-color)`:`var(--accent-primary)`};">${f?`FULL`:`${d}% Filled`}</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${d}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C);"></div>
            </div>
          </div>

          <!-- RSVP Control Toolbar (Print Hidden) -->
          <div class="print-hide" style="display: flex; gap: 12px; margin-bottom: 20px;">
            <button id="rsvp-attending-btn" class="btn ${s===`attending`?``:`btn-outline`}" style="flex: 1; padding: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span class="material-symbols-outlined">confirmation_number</span>
              <span>${s===`attending`?`✓ Going (RSVP Registered)`:`🎟️ RSVP — Going`}</span>
            </button>
            
            <button id="rsvp-interested-btn" class="btn ${s===`interested`?``:`btn-outline`}" style="padding: 12px 18px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined">star</span>
              <span>${s===`interested`?`★ Interested`:`Interested`}</span>
            </button>
          </div>

          <!-- Event Description & Agenda -->
          <div style="border-top: 1px dashed var(--border-color); padding-top: 18px;">
            <h3 style="font-size: 14px; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">About This Campus Event</h3>
            <p style="font-size: 15px; line-height: 1.5; color: var(--text-primary); white-space: pre-line;">
              ${q(i.description||`Join your fellow St. Joseph's College students for this campus event!`)}
            </p>
          </div>

          <!-- Simulated Pass Barcode -->
          <div style="margin-top: 20px; border-top: 1px dashed var(--border-color); padding-top: 16px; text-align: center;">
            <div style="font-family: monospace; letter-spacing: 4px; font-size: 16px; font-weight: 800; color: var(--text-secondary);">
              ||||| | |||| ||| |||||| || |||||
            </div>
            <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">PASS ID: SJC-EVT-${q(i.eventId)}</span>
          </div>
        </div>
      </div>

      <!-- Attending Students Roster -->
      <div class="card" style="padding: 20px; border-radius: 20px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">group</span>
          Registered Attendees (${c.length})
        </h3>

        ${c.length===0?`
          <p style="font-size: 14px; color: var(--text-secondary);">No students registered yet. Be the first to RSVP!</p>
        `:`
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;">
            ${c.map(e=>`
              <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg-primary); border-radius: 10px; border: 1px solid var(--border-color);">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q(e.name)}</span>
                  <span style="font-size: 11px; color: var(--text-secondary);">Class ${q(e.class||`N/A`)}</span>
                </div>
              </div>
            `).join(``)}
          </div>
        `}
      </div>
    </div>
  `,e.EVENTS),Z();let h=document.getElementById(`print-pass-btn`),g=document.getElementById(`rsvp-attending-btn`),_=document.getElementById(`rsvp-interested-btn`);h&&h.addEventListener(`click`,()=>{window.print()}),g&&g.addEventListener(`click`,async()=>{g.disabled=!0;try{await U_(i.eventId,`attending`),q_(t)}catch(e){alert(e.message||`Failed to update RSVP`)}}),_&&_.addEventListener(`click`,async()=>{_.disabled=!0;try{await U_(i.eventId,`interested`),q_(t)}catch(e){alert(e.message||`Failed to update RSVP`)}})}function J_(t,n){t.innerHTML=X(`
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
      <p style="color: var(--text-secondary); margin-top: 4px;">${n}</p>
    </div>
  `,e.EVENTS),Z()}async function Y_(t){if(!W.currentUser){window.location.hash=`#/login`;return}t.innerHTML=X(`
    <header class="sticky-header">
      <h1 class="header-title">Admin Control Center</h1>
    </header>
    ${Q(2)}
  `,e.ADMIN);let n=(await J(W.currentUser.uid))?.role||K.STUDENT;if(n===K.STUDENT){t.innerHTML=X(`
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
    `,e.HOME,n),Z();return}let r=await kg(),i=await Ag(),a=await Fg(),o=n===K.ADMIN;t.innerHTML=X(`
    <!-- Sticky Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">
          ${o?`admin_panel_settings`:`shield_person`}
        </span>
        <h1 class="header-title">${o?`Master Admin Control Center`:`Staff Moderation Center`}</h1>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      
      <!-- Analytics Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: var(--accent-primary);">groups</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${r.totalUsers}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Users</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: #00BA7C;">post</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${r.totalPosts}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Posts</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: #FFD700;">forum</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${r.totalReplies}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Replies</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: var(--error-color);">flag</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--error-color); margin-top: 4px;">${a.length}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Held Reports</span>
        </div>
      </div>

      <!-- Reported Posts Validation Queue Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--error-color);">gavel</span>
              Reported Posts Moderation Queue (${a.length})
            </h3>
            <span style="font-size: 13px; color: var(--text-secondary);">Posts accumulating 2+ community reports are held here awaiting Staff review.</span>
          </div>
        </div>

        ${a.length===0?`
          <div style="padding: 24px; text-align: center; color: var(--text-secondary); font-size: 14px;">
            ✓ No reported posts awaiting validation. The campus feed is clean!
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${a.map(async e=>{let t=await J(e.authorId),n=t?.name?q(t.name):`Student`,r=e.reportCount||0;return`
                <div class="card fade-in" style="padding: 16px; border-radius: 14px; background: var(--bg-primary); border: 1px solid var(--border-color);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="brand-badge" style="font-size: 11px; background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);">
                        ${r} REPORT${r===1?``:`S`} · AWAITING VALIDATION
                      </span>
                      <span style="font-size: 13px; color: var(--text-secondary);">Posted by <strong>${n}</strong> (@${q(t?.username||`student`)})</span>
                    </div>

                    <a href="#/post?id=${e.postId}" class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;">
                      View Full Post
                    </a>
                  </div>

                  <div style="font-size: 15px; color: var(--text-primary); font-weight: 500; margin-bottom: 12px; line-height: 1.4;">
                    "${q(e.content)}"
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
              Campus User Roster (${i.length})
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
              ${i.map(e=>{let t=Bg(e,38),n=e.role===K.ADMIN,r=e.role===K.STAFF,i=e.isSuspended||!1;return`
                  <tr class="roster-row" data-name="${q(e.name)}" data-username="${q(e.username)}" style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 10px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        ${t}
                        <div style="display: flex; flex-direction: column;">
                          <span style="font-weight: 700; color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 4px;">
                            ${q(e.name)}
                            ${n?`<span class="material-symbols-outlined" style="font-size: 16px; color: var(--error-color);" title="Master Admin">shield</span>`:``}
                            ${r?`<span class="material-symbols-outlined verified-icon" title="Appointed Staff Moderator">verified</span>`:``}
                          </span>
                          <span style="font-size: 12px; color: var(--text-secondary);">@${q(e.username)}</span>
                        </div>
                      </div>
                    </td>

                    <td style="padding: 12px 10px; color: var(--text-secondary); font-size: 13px;">
                      <div>Class ${q(e.class||`N/A`)}</div>
                      <div style="font-size: 11px; opacity: 0.8;">Adm: ${q(e.admissionNumber||`N/A`)}</div>
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
                          ${o?`
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
  `,e.ADMIN,n),Z(),t.querySelectorAll(`.approve-post-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.postId;e.disabled=!0,e.textContent=`Reinstating...`;try{await Ig(n),Y_(t)}catch(t){alert(t.message||`Failed to approve post.`),e.disabled=!1}})}),t.querySelectorAll(`.delete-reported-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.postId;if(confirm(`Are you sure you want to permanently delete this reported post?`)){e.disabled=!0,e.textContent=`Deleting...`;try{await Ng(n),Y_(t)}catch(t){alert(t.message||`Failed to delete post.`),e.disabled=!1}}})});let s=document.getElementById(`roster-search-input`);s&&s.addEventListener(`input`,()=>{let e=s.value.trim().toLowerCase();document.querySelectorAll(`.roster-row`).forEach(t=>{let n=(t.dataset.name||``).toLowerCase(),r=(t.dataset.username||``).toLowerCase();t.style.display=n.includes(e)||r.includes(e)?``:`none`})}),t.querySelectorAll(`.role-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.uid,r=e.dataset.currentRole===K.STAFF?K.STUDENT:K.STAFF;e.disabled=!0,e.textContent=`Updating...`;try{await jg(n,r),Y_(t)}catch(t){alert(t.message||`Failed to update user role.`),e.disabled=!1}})}),t.querySelectorAll(`.suspend-toggle-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.uid;e.disabled=!0;try{let n=await Mg(t);e.textContent=n?`Unsuspend`:`Suspend`,e.style.borderColor=n?`#00BA7C`:`var(--error-color)`,e.style.color=n?`#00BA7C`:`var(--error-color)`}catch(e){alert(e.message||`Failed to update user suspension state.`)}finally{e.disabled=!1}})})}async function X_(t){if(!W.currentUser){window.location.hash=`#/login`;return}let n=W.currentUser,r=await J(n.uid);t.innerHTML=X(`
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
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">${q(n.email||`N/A`)}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Username</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">@${q(r?.username||`student`)}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Account Role</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px; text-transform: uppercase;">${q(r?.role||`student`)}</div>
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
  `,e.SETTINGS,r?.role||`student`),Z();let i=document.getElementById(`change-password-form`),a=document.getElementById(`new-password-input`),o=document.getElementById(`confirm-password-input`),s=document.getElementById(`password-error-alert`),c=document.getElementById(`password-success-alert`),l=document.getElementById(`save-password-btn`);t.querySelectorAll(`.toggle-pwd-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.target,n=document.getElementById(t),r=e.querySelector(`.material-symbols-outlined`);n&&(n.type===`password`?(n.type=`text`,r&&(r.textContent=`visibility_off`)):(n.type=`password`,r&&(r.textContent=`visibility`)))})}),i&&i.addEventListener(`submit`,async e=>{e.preventDefault(),s.style.display=`none`,c.style.display=`none`;let t=a.value,n=o.value;if(t.length<6){s.textContent=`Password must be at least 6 characters long.`,s.style.display=`block`;return}if(t!==n){s.textContent=`New password and confirm password do not match.`,s.style.display=`block`;return}l.disabled=!0,l.textContent=`Updating...`;try{await Xh(t),i.reset(),c.style.display=`flex`}catch(e){s.textContent=e.message||`Failed to update password.`,s.style.display=`block`}finally{l.disabled=!1,l.innerHTML=`<span class="material-symbols-outlined" style="font-size: 18px;">key</span> Update Password`}})}var $=null;function Z_(t){$=t,window.addEventListener(`hashchange`,Q_),window.location.hash?Q_():window.location.hash=e.HOME}async function Q_(){let t=window.location.hash.split(`?`)[0];if($&&($.innerHTML=``),W.currentUser&&t!==`#/login`&&t!==`#/signup`&&t!==e.ONBOARDING&&!Jh(await J(W.currentUser.uid))){window.location.hash=e.ONBOARDING,y_($);return}switch(t){case`#/login`:case`#/signup`:e_($,t);break;case e.ONBOARDING:y_($);break;case e.HOME:Qg($);break;case e.PROFILE:o_($);break;case`#/notifications`:d_($);break;case`#/friends`:l_($);break;case e.POST_DETAIL:g_($);break;case`#/search`:v_($);break;case e.PETITIONS:D_($);break;case`#/petition`:O_($);break;case e.PETITION_FRAME:A_($);break;case e.PROFILE_FRAME:M_($);break;case e.POLLS:P_($);break;case`#/poll`:I_($);break;case e.ANNOUNCEMENTS:R_($);break;case e.EVENTS:K_($);break;case`#/event`:q_($);break;case e.ADMIN:Y_($);break;case e.SETTINGS:X_($);break;default:$.innerHTML=`<div style="padding: 40px; text-align: center;"><h1>404 Page Not Found</h1></div>`;break}}var $_=!1;function ev(){let e=document.querySelector(`#app`);e.innerHTML=`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
      <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #1D9BF0, #0077B5); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 28px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35);" class="pulse-badge">
        B
      </div>
      <p style="margin-top: 16px; color: var(--text-secondary); font-size: 14px; font-weight: 600;">Restoring session...</p>
    </div>
  `,cp(W,async t=>{if(t)try{Sh(`backbench_token`,await t.getIdToken(),30),Sh(`backbench_uid`,t.uid,30)}catch(e){console.error(`Error retrieving ID token:`,e)}else Ch(`backbench_token`),Ch(`backbench_uid`);$_?!t&&window.location.hash!==`#/login`&&window.location.hash!==`#/signup`&&(window.location.hash=`#/login`):($_=!0,Z_(e))})}document.addEventListener(`DOMContentLoaded`,ev);