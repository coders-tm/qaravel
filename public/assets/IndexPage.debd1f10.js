`:`
`;return e.join(i)}commitMessage(){return`${this.faker.hacker.verb()} ${this.faker.hacker.adjective()} ${this.faker.hacker.noun()}`}commitSha(){let u="";for(let a=0;a<40;a++)u+=this.faker.helpers.arrayElement(this.hexChars);return u}shortSha(){let u="";for(let a=0;a<7;a++)u+=this.faker.helpers.arrayElement(this.hexChars);return u}},Uu=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(Uu.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}abbreviation(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.abbreviation)}adjective(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.adjective)}noun(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.noun)}verb(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.verb)}ingverb(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.ingverb)}phrase(){let u={abbreviation:this.abbreviation,adjective:this.adjective,ingverb:this.ingverb,noun:this.noun,verb:this.verb},a=this.faker.helpers.arrayElement(this.faker.definitions.hacker.phrase);return this.faker.helpers.mustache(a,u)}};function RT(u){let a=GT(u.replace(/L?$/,"0"));return a===0?0:10-a}function GT(u){u=u.replace(/[\s-]/g,"");let a=0,e=!1;for(let i=u.length-1;i>=0;i--){let r=parseInt(u.substring(i,i+1));e&&(r*=2,r>9&&(r=r%10+1)),a+=r,e=!e}return a%10}var Yu=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(Yu.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}slugify(u=""){return u.replace(/ /g,"-").replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g,"")}replaceSymbolWithNumber(u="",a="#"){let e="";for(let i=0;i<u.length;i++)u.charAt(i)===a?e+=this.faker.datatype.number(9):u.charAt(i)==="!"?e+=this.faker.datatype.number({min:2,max:9}):e+=u.charAt(i);return e}replaceSymbols(u=""){let a=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],e="";for(let i=0;i<u.length;i++)u.charAt(i)==="#"?e+=this.faker.datatype.number(9):u.charAt(i)==="?"?e+=this.arrayElement(a):u.charAt(i)==="*"?e+=this.faker.datatype.boolean()?this.arrayElement(a):this.faker.datatype.number(9):e+=u.charAt(i);return e}replaceCreditCardSymbols(u="6453-####-####-####-###L",a="#"){u=this.regexpStyleStringParse(u),u=this.replaceSymbolWithNumber(u,a);let e=RT(u);return u.replace("L",String(e))}repeatString(u="",a=0){let e="";for(let i=0;i<a;i++)e+=u.toString();return e}regexpStyleStringParse(u=""){let a=/(.)\{(\d+)\,(\d+)\}/,e=/(.)\{(\d+)\}/,i=/\[(\d+)\-(\d+)\]/,r,n,o,s,l=u.match(a);for(;l!=null;)r=parseInt(l[2]),n=parseInt(l[3]),r>n&&(o=n,n=r,r=o),s=this.faker.datatype.number({min:r,max:n}),u=u.slice(0,l.index)+this.repeatString(l[1],s)+u.slice(l.index+l[0].length),l=u.match(a);for(l=u.match(e);l!=null;)s=parseInt(l[2]),u=u.slice(0,l.index)+this.repeatString(l[1],s)+u.slice(l.index+l[0].length),l=u.match(e);for(l=u.match(i);l!=null;)r=parseInt(l[1]),n=parseInt(l[2]),r>n&&(o=n,n=r,r=o),u=u.slice(0,l.index)+this.faker.datatype.number({min:r,max:n}).toString()+u.slice(l.index+l[0].length),l=u.match(i);return u}shuffle(u){if(u==null||u.length===0)return u||[];for(let a=u.length-1;a>0;--a){let e=this.faker.datatype.number(a),i=u[a];u[a]=u[e],u[e]=i}return u}uniqueArray(u,a){if(Array.isArray(u)){let i=new Set(u),r=Array.from(i);return this.shuffle(r).splice(0,a)}let e=new Set;try{if(typeof u=="function")for(;e.size<a;)e.add(u())}catch{}return Array.from(e)}mustache(u,a){if(u==null)return"";for(let e in a){let i=new RegExp(`{{${e}}}`,"g"),r=a[e];u=u.replace(i,r)}return u}maybe(u,a={}){let{probability:e=.5}=a;if(this.faker.datatype.float({min:0,max:1})<e)return u()}objectKey(u){let a=Object.keys(u);return this.arrayElement(a)}objectValue(u){let a=this.faker.helpers.objectKey(u);return u[a]}arrayElement(u=["a","b","c"]){let a=u.length>1?this.faker.datatype.number({max:u.length-1}):0;return u[a]}arrayElements(u=["a","b","c"],a){typeof a!="number"?a=u.length===0?0:this.faker.datatype.number({min:1,max:u.length}):a>u.length?a=u.length:a<0&&(a=0);let e=u.slice(0),i=u.length,r=i-a,n,o;for(;i-- >r;)o=Math.floor((i+1)*this.faker.datatype.float({min:0,max:.99})),n=e[o],e[o]=e[i],e[i]=n;return e.slice(r)}fake(u){if(typeof u!="string"||u.length===0)throw new F("string parameter is required!");let a=u.search(/{{[a-z]/),e=u.indexOf("}}",a);if(a===-1||e===-1)return u;let i=u.substring(a+2,e+2).replace("}}","").replace("{{",""),r=/\(([^)]+)\)/,n=r.exec(i),o="";n&&(i=i.replace(r,""),o=n[1]);let s=i.split("."),l=this.faker,E=this.faker.definitions;for(let B of s)l=l==null?void 0:l[B],E=E==null?void 0:E[B];let t;if(typeof l=="function")t=l;else if(Array.isArray(E))t=()=>this.faker.helpers.arrayElement(E);else throw new F(`Invalid module method or definition: ${i}
- faker.${i} is not a function
- faker.definitions.${i} is not an array`);t=t.bind(this);let x;try{x=JSON.parse(o)}catch{x=o}let D;typeof x=="string"&&x.length===0?D=String(t()):D=String(t(x));let h=u.substring(0,a)+D+u.substring(e+2);return h===""?"":this.fake(h)}},VT=class{constructor(u){this.faker=u}image(u,a,e,i){return this.imageUrl(u,a,e,i)}imageGrayscale(u,a,e){return this.imageUrl(u,a,e)}imageBlurred(u,a,e){return this.imageUrl(u,a,void 0,e)}imageRandomSeeded(u,a,e,i,r){return this.imageUrl(u,a,e,i,r)}avatar(){return m({deprecated:"faker.image.lorempicsum.avatar()",proposed:"faker.internet.avatar()",since:"7.3",until:"8.0"}),this.faker.internet.avatar()}imageUrl(u,a,e,i,r){u=u||640,a=a||480;let n="https://picsum.photos";return r&&(n+=`/seed/${r}`),n+=`/${u}/${a}`,e&&i?`${n}?grayscale&blur=${i}`:e?`${n}?grayscale`:i?`${n}?blur=${i}`:n}},JT=class{constructor(u){this.faker=u}image(u,a,e){let i=["abstract","animals","business","cats","city","food","nightlife","fashion","people","nature","sports","technics","transport"];return this[this.faker.helpers.arrayElement(i)](u,a,e)}avatar(){return m({deprecated:"faker.image.lorempixel.avatar()",proposed:"faker.internet.avatar()",since:"7.3",until:"8.0"}),this.faker.internet.avatar()}imageUrl(u,a,e,i){u=u||640,a=a||480;let r=`https://lorempixel.com/${u}/${a}`;return e!=null&&(r+=`/${e}`),i&&(r+=`?${this.faker.datatype.number()}`),r}abstract(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"abstract",e)}animals(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"animals",e)}business(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"business",e)}cats(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"cats",e)}city(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"city",e)}food(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"food",e)}nightlife(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"nightlife",e)}fashion(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"fashion",e)}people(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"people",e)}nature(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"nature",e)}sports(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"sports",e)}technics(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"technics",e)}transport(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"transport",e)}},Qu=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(Qu.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}imageUrl(u,a,e,i,r,n){u=u||640,a=a||u;let o="https://via.placeholder.com";return o+=`/${u}x${a}`,r!=null&&(o+=`/${r.replace("#","").toUpperCase()}`,n!=null&&(o+=`/${n.replace("#","").toUpperCase()}`)),i!=null&&(o+=`.${i}`),e!=null&&(o+=`?${new URLSearchParams({text:e}).toString()}`),o}randomUrl(u,a,e){return this.imageUrl(u,a,this.faker.lorem.word(),e,this.faker.color.rgb({casing:"upper",prefix:""}),this.faker.color.rgb({casing:"upper",prefix:""}))}},_T=class{constructor(u){this.faker=u}get categories(){return m({deprecated:"faker.image.unsplash.categories",since:"7.3",until:"8.0"}),["food","nature","people","technology","objects","buildings"]}image(u,a,e){return this.imageUrl(u,a,void 0,e)}avatar(){return m({deprecated:"faker.image.unsplash.avatar()",proposed:"faker.internet.avatar()",since:"7.3",until:"8.0"}),this.faker.internet.avatar()}imageUrl(u,a,e,i){u=u||640,a=a||480;let r="https://source.unsplash.com";return e!=null&&(r+=`/category/${e}`),r+=`/${u}x${a}`,i!=null&&/^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$/.test(i)&&(r+=`?${i}`),r}food(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"food",e)}people(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"people",e)}nature(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"nature",e)}technology(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"technology",e)}objects(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"objects",e)}buildings(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"buildings",e)}},Xu=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(Xu.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this));this.lorempixel=new JT(this.faker),this.unsplash=new _T(this.faker),this.lorempicsum=new VT(this.faker),this.placeholder=new Qu(this.faker)}image(u,a,e){let i=["abstract","animals","business","cats","city","food","nightlife","fashion","people","nature","sports","technics","transport"];return this[this.faker.helpers.arrayElement(i)](u,a,e)}avatar(){return this.faker.internet.avatar()}imageUrl(u,a,e,i){u=u||640,a=a||480;let r=`https://loremflickr.com/${u}/${a}`;return e!=null&&(r+=`/${e}`),i&&(r+=`?${this.faker.datatype.number()}`),r}abstract(u,a,e){return this.imageUrl(u,a,"abstract",e)}animals(u,a,e){return this.imageUrl(u,a,"animals",e)}business(u,a,e){return this.imageUrl(u,a,"business",e)}cats(u,a,e){return this.imageUrl(u,a,"cats",e)}city(u,a,e){return this.imageUrl(u,a,"city",e)}food(u,a,e){return this.imageUrl(u,a,"food",e)}nightlife(u,a,e){return this.imageUrl(u,a,"nightlife",e)}fashion(u,a,e){return this.imageUrl(u,a,"fashion",e)}people(u,a,e){return this.imageUrl(u,a,"people",e)}nature(u,a,e){return this.imageUrl(u,a,"nature",e)}sports(u,a,e){return this.imageUrl(u,a,"sports",e)}technics(u,a,e){return this.imageUrl(u,a,"technics",e)}transport(u,a,e){return this.imageUrl(u,a,"transport",e)}dataUri(u,a,e="grey"){let i=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${u}" height="${a}"><rect width="100%" height="100%" fill="${e}"/><text x="${u/2}" y="${a/2}" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${u}x${a}</text></svg>`;return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(i)}};function IT(u){let a=t=>{let x=u.datatype.number({min:0,max:100})/100,D=0,h=0,B;for(let L in t)if(Object.prototype.hasOwnProperty.call(t,L)){if(h=t[L]+D,B=L,x>=D&&x<=h)break;D=D+t[L]}return B},e=()=>u.helpers.arrayElement(["AB","AF","AN","AR","AS","AZ","BE","BG","BN","BO","BR","BS","CA","CE","CO","CS","CU","CY","DA","DE","EL","EN","EO","ES","ET","EU","FA","FI","FJ","FO","FR","FY","GA","GD","GL","GV","HE","HI","HR","HT","HU","HY","ID","IS","IT","JA","JV","KA","KG","KO","KU","KW","KY","LA","LB","LI","LN","LT","LV","MG","MK","MN","MO","MS","MT","MY","NB","NE","NL","NN","NO","OC","PL","PT","RM","RO","RU","SC","SE","SK","SL","SO","SQ","SR","SV","SW","TK","TR","TY","UK","UR","UZ","VI","VO","YI","ZH"]),i=()=>{let t=a({chrome:.45132810566,iexplorer:.27477061836,firefox:.19384170608,safari:.06186781118,opera:.01574236955}),x=a({chrome:{win:.89,mac:.09,lin:.02},firefox:{win:.83,mac:.16,lin:.01},opera:{win:.91,mac:.03,lin:.06},safari:{win:.04,mac:.96},iexplorer:{win:1}}[t]);return[t,x]},r=t=>{let x={lin:["i686","x86_64"],mac:{Intel:.48,PPC:.01,"U; Intel":.48,"U; PPC":.01},win:["","WOW64","Win64; x64"]}[t];return Array.isArray(x)?u.helpers.arrayElement(x):a(x)},n=t=>{let x="";for(let D=0;D<t;D++)x+=`.${u.datatype.number({min:0,max:9})}`;return x},o={net(){return[u.datatype.number({min:1,max:4}),u.datatype.number({min:0,max:9}),u.datatype.number({min:1e4,max:99999}),u.datatype.number({min:0,max:9})].join(".")},nt(){return[u.datatype.number({min:5,max:6}),u.datatype.number({min:0,max:3})].join(".")},ie(){return u.datatype.number({min:7,max:11})},trident(){return[u.datatype.number({min:3,max:7}),u.datatype.number({min:0,max:1})].join(".")},osx(t){return[10,u.datatype.number({min:5,max:10}),u.datatype.number({min:0,max:9})].join(t||".")},chrome(){return[u.datatype.number({min:13,max:39}),0,u.datatype.number({min:800,max:899}),0].join(".")},presto(){return`2.9.${u.datatype.number({min:160,max:190})}`},presto2(){return`${u.datatype.number({min:10,max:12})}.00`},safari(){return[u.datatype.number({min:531,max:538}),u.datatype.number({min:0,max:2}),u.datatype.number({min:0,max:2})].join(".")}},s={firefox(t){let x=`${u.datatype.number({min:5,max:15})}${n(2)}`,D=`Gecko/20100101 Firefox/${x}`,h=r(t);return`Mozilla/5.0 ${t==="win"?`(Windows NT ${o.nt()}${h?`; ${h}`:""}`:t==="mac"?`(Macintosh; ${h} Mac OS X ${o.osx()}`:`(X11; Linux ${h}`}; rv:${x.slice(0,-2)}) ${D}`},iexplorer(){let t=o.ie();return t>=11?`Mozilla/5.0 (Windows NT 6.${u.datatype.number({min:1,max:3})}; Trident/7.0; ${u.datatype.boolean()?"Touch; ":""}rv:11.0) like Gecko`:`Mozilla/5.0 (compatible; MSIE ${t}.0; Windows NT ${o.nt()}; Trident/${o.trident()}${u.datatype.boolean()?`; .NET CLR ${o.net()}`:""})`},opera(t){let x=` Presto/${o.presto()} Version/${o.presto2()})`,D=t==="win"?`(Windows NT ${o.nt()}; U; ${e()}${x}`:t==="lin"?`(X11; Linux ${r(t)}; U; ${e()}${x}`:`(Macintosh; Intel Mac OS X ${o.osx()} U; ${e()} Presto/${o.presto()} Version/${o.presto2()})`;return`Opera/${u.datatype.number({min:9,max:14})}.${u.datatype.number({min:0,max:99})} ${D}`},safari(t){let x=o.safari(),D=`${u.datatype.number({min:4,max:7})}.${u.datatype.number({min:0,max:1})}.${u.datatype.number({min:0,max:10})}`;return`Mozilla/5.0 ${t==="mac"?`(Macintosh; ${r("mac")} Mac OS X ${o.osx("_")} rv:${u.datatype.number({min:2,max:6})}.0; ${e()}) `:`(Windows; U; Windows NT ${o.nt()})`}AppleWebKit/${x} (KHTML, like Gecko) Version/${D} Safari/${x}`},chrome(t){let x=o.safari();return`Mozilla/5.0 ${t==="mac"?`(Macintosh; ${r("mac")} Mac OS X ${o.osx("_")}) `:t==="win"?`(Windows; U; Windows NT ${o.nt()})`:`(X11; Linux ${r(t)}`} AppleWebKit/${x} (KHTML, like Gecko) Chrome/${o.chrome()} Safari/${x}`}},[l,E]=i();return s[l](E)}var u0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(u0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}avatar(){return`https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.datatype.number(1249)}.jpg`}email(u,a,e,i){e=e||this.faker.helpers.arrayElement(this.faker.definitions.internet.free_email);let r=this.faker.helpers.slugify(this.userName(u,a));if(i!=null&&i.allowSpecialCharacters){let n="._-".split(""),o=".!#$%&'*+-/=?^_`{|}~".split("");r=r.replace(this.faker.helpers.arrayElement(n),this.faker.helpers.arrayElement(o))}return`${r}@${e}`}exampleEmail(u,a,e){let i=this.faker.helpers.arrayElement(this.faker.definitions.internet.example_email);return this.email(u,a,i,e)}userName(u,a){let e;switch(u=u||this.faker.name.firstName(),a=a||this.faker.name.lastName(),this.faker.datatype.number(2)){case 0:e=`${u}${this.faker.datatype.number(99)}`;break;case 1:e=u+this.faker.helpers.arrayElement([".","_"])+a;break;case 2:e=`${u}${this.faker.helpers.arrayElement([".","_"])}${a}${this.faker.datatype.number(99)}`;break}return e=e.toString().replace(/'/g,""),e=e.replace(/ /g,""),e}protocol(){let u=["http","https"];return this.faker.helpers.arrayElement(u)}httpMethod(){let u=["GET","POST","PUT","DELETE","PATCH"];return this.faker.helpers.arrayElement(u)}httpStatusCode(u={}){let{types:a=Object.keys(this.faker.definitions.internet.http_status_code)}=u,e=this.faker.helpers.arrayElement(a);return this.faker.helpers.arrayElement(this.faker.definitions.internet.http_status_code[e])}url(){return`${this.protocol()}://${this.domainName()}`}domainName(){return`${this.domainWord()}.${this.domainSuffix()}`}domainSuffix(){return this.faker.helpers.arrayElement(this.faker.definitions.internet.domain_suffix)}domainWord(){return`${this.faker.word.adjective()}-${this.faker.word.noun()}`.replace(/([\\~#&*{}/:<>?|\"'])/gi,"").replace(/\s/g,"-").replace(/-{2,}/g,"-").toLowerCase()}ip(){return this.ipv4()}ipv4(){let u=()=>this.faker.datatype.number(255).toFixed(0),a=[];for(let e=0;e<4;e++)a[e]=u();return a.join(".")}ipv6(){let u=()=>{let e="";for(let i=0;i<4;i++)e+=this.faker.helpers.arrayElement(["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]);return e},a=[];for(let e=0;e<8;e++)a[e]=u();return a.join(":")}port(){return this.faker.datatype.number({min:0,max:65535})}userAgent(){return IT(this.faker)}color(u=0,a=0,e=0){let i=s=>Math.floor((this.faker.datatype.number(256)+s)/2).toString(16).padStart(2,"0"),r=i(u),n=i(a),o=i(e);return`#${r}${n}${o}`}mac(u){let a,e="",i=":";for(["-",""].indexOf(u)!==-1&&(i=u),a=0;a<12;a++)e+=this.faker.datatype.number(15).toString(16),a%2===1&&a!==11&&(e+=i);return e}password(u=15,a=!1,e=/\w/,i=""){let r=/[aeiouAEIOU]$/,n=/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/,o=(s,l,E,t)=>{if(t.length>=s)return t;l&&(t.match(n)?E=r:E=n);let x=this.faker.datatype.number(94)+33,D=String.fromCharCode(x);return l&&(D=D.toLowerCase()),D.match(E)?o(s,l,E,t+D):o(s,l,E,t)};return o(u,a,e,i)}emoji(u={}){let{types:a=Object.keys(this.faker.definitions.internet.emoji)}=u,e=this.faker.helpers.arrayElement(a);return this.faker.helpers.arrayElement(this.faker.definitions.internet.emoji[e])}},a0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(a0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}word(u){let a=i=>i.length===u,e;return u==null?e=this.faker.definitions.lorem.words:e=this.faker.definitions.lorem.words.filter(a),this.faker.helpers.arrayElement(e)}words(u=3){let a=[];for(let e=0;e<u;e++)a.push(this.word());return a.join(" ")}sentence(u){u==null&&(u=this.faker.datatype.number({min:3,max:10}));let a=this.words(u);return`${a.charAt(0).toUpperCase()+a.slice(1)}.`}slug(u){let a=this.words(u);return this.faker.helpers.slugify(a)}sentences(u,a=" "){u==null&&(u=this.faker.datatype.number({min:2,max:6}));let e=[];for(u;u>0;u--)e.push(this.sentence());return e.join(a)}paragraph(u=3){return this.sentences(u+this.faker.datatype.number(3))}paragraphs(u=3,a=`
`){let e=[];for(u;u>0;u--)e.push(this.paragraph());return e.join(a)}text(){let u=["word","words","sentence","sentences","paragraph","paragraphs","lines"],a=this.faker.helpers.arrayElement(u);return`${this[a]()}`}lines(u){return u==null&&(u=this.faker.datatype.number({min:1,max:5})),this.sentences(u,`
`)}},OT=class{constructor(){this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,this.mag01=[0,this.MATRIX_A]}unsigned32(u){return u<0?(u^this.UPPER_MASK)+this.UPPER_MASK:u}subtraction32(u,a){return u<a?this.unsigned32(4294967296-(a-u)&4294967295):u-a}addition32(u,a){return this.unsigned32(u+a&4294967295)}multiplication32(u,a){let e=0;for(let i=0;i<32;++i)u>>>i&1&&(e=this.addition32(e,this.unsigned32(a<<i)));return e}initGenrand(u){for(this.mt[0]=this.unsigned32(u&4294967295),this.mti=1;this.mti<this.N;this.mti++)this.mt[this.mti]=this.addition32(this.multiplication32(1812433253,this.unsigned32(this.mt[this.mti-1]^this.mt[this.mti-1]>>>30)),this.mti),this.mt[this.mti]=this.unsigned32(this.mt[this.mti]&4294967295)}initByArray(u,a){this.initGenrand(19650218);let e=1,i=0,r=this.N>a?this.N:a;for(;r;r--)this.mt[e]=this.addition32(this.addition32(this.unsigned32(this.mt[e]^this.multiplication32(this.unsigned32(this.mt[e-1]^this.mt[e-1]>>>30),1664525)),u[i]),i),this.mt[e]=this.unsigned32(this.mt[e]&4294967295),e++,i++,e>=this.N&&(this.mt[0]=this.mt[this.N-1],e=1),i>=a&&(i=0);for(r=this.N-1;r;r--)this.mt[e]=this.subtraction32(this.unsigned32(this.mt[e]^this.multiplication32(this.unsigned32(this.mt[e-1]^this.mt[e-1]>>>30),1566083941)),e),this.mt[e]=this.unsigned32(this.mt[e]&4294967295),e++,e>=this.N&&(this.mt[0]=this.mt[this.N-1],e=1);this.mt[0]=2147483648}genrandInt32(){let u;if(this.mti>=this.N){let a;for(this.mti===this.N+1&&this.initGenrand(5489),a=0;a<this.N-this.M;a++)u=this.unsigned32(this.mt[a]&this.UPPER_MASK|this.mt[a+1]&this.LOWER_MASK),this.mt[a]=this.unsigned32(this.mt[a+this.M]^u>>>1^this.mag01[u&1]);for(;a<this.N-1;a++)u=this.unsigned32(this.mt[a]&this.UPPER_MASK|this.mt[a+1]&this.LOWER_MASK),this.mt[a]=this.unsigned32(this.mt[a+(this.M-this.N)]^u>>>1^this.mag01[u&1]);u=this.unsigned32(this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK),this.mt[this.N-1]=this.unsigned32(this.mt[this.M-1]^u>>>1^this.mag01[u&1]),this.mti=0}return u=this.mt[this.mti++],u=this.unsigned32(u^u>>>11),u=this.unsigned32(u^u<<7&2636928640),u=this.unsigned32(u^u<<15&4022730752),u=this.unsigned32(u^u>>>18),u}genrandInt31(){return this.genrandInt32()>>>1}genrandReal1(){return this.genrandInt32()*(1/4294967295)}genrandReal2(){return this.genrandInt32()*(1/4294967296)}genrandReal3(){return(this.genrandInt32()+.5)*(1/4294967296)}genrandRes53(){let u=this.genrandInt32()>>>5,a=this.genrandInt32()>>>6;return(u*67108864+a)*(1/9007199254740992)}},e0=class{constructor(){this.gen=new OT,this.gen.initGenrand(new Date().getTime()%1e9);for(let u of Object.getOwnPropertyNames(e0.prototype))u==="constructor"||typeof this[u]!="function"||(this[u]=this[u].bind(this))}rand(u=32768,a=0){if(a>u){let e=a;a=u,u=e}return Math.floor(this.gen.genrandReal2()*(u-a)+a)}seed(u){if(typeof u!="number")throw new F(`seed(S) must take numeric argument; is ${typeof u}`);this.gen.initGenrand(u)}seed_array(u){if(typeof u!="object")throw new F(`seed_array(A) must take array of numbers; is ${typeof u}`);this.gen.initByArray(u,u.length)}},i0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(i0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}genre(){return this.faker.helpers.arrayElement(this.faker.definitions.music.genre)}songName(){return this.faker.helpers.arrayElement(this.faker.definitions.music.song_name)}},r0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(r0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}phoneNumber(u){return m({deprecated:"faker.phone.phoneNumber()",proposed:"faker.phone.number()",since:"7.3",until:"8.0"}),this.faker.phone.number(u)}number(u){return u=u!=null?u:this.faker.helpers.arrayElement(this.faker.definitions.phone_number.formats),this.faker.helpers.replaceSymbolWithNumber(u)}phoneNumberFormat(u=0){return m({deprecated:"faker.phone.phoneNumberFormat()",proposed:"faker.phone.phoneNumber() or faker.helpers.replaceSymbolWithNumber(format)",since:"7.0",until:"8.0"}),this.faker.helpers.replaceSymbolWithNumber(this.faker.definitions.phone_number.formats[u])}phoneFormats(){return m({deprecated:"faker.phone.phoneFormats()",proposed:"faker.phone.phoneNumber()",since:"7.0",until:"8.0"}),this.faker.helpers.arrayElement(this.faker.definitions.phone_number.formats)}imei(){return this.faker.helpers.replaceCreditCardSymbols("##-######-######-L","#")}},V="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),J="abcdefghijklmnopqrstuvwxyz".split(""),ou="0123456789".split("");function lu(u,a){return a.forEach(e=>{u=u.filter(i=>i!==e)}),u}var n0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(n0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}word(){let u=[this.faker.commerce.department,this.faker.commerce.productName,this.faker.commerce.productAdjective,this.faker.commerce.productMaterial,this.faker.commerce.product,this.faker.color.human,this.faker.company.catchPhraseAdjective,this.faker.company.catchPhraseDescriptor,this.faker.company.catchPhraseNoun,this.faker.company.bsAdjective,this.faker.company.bsBuzz,this.faker.company.bsNoun,this.faker.address.county,this.faker.address.country,this.faker.address.state,this.faker.finance.accountName,this.faker.finance.transactionType,this.faker.finance.currencyName,this.faker.hacker.noun,this.faker.hacker.verb,this.faker.hacker.adjective,this.faker.hacker.ingverb,this.faker.hacker.abbreviation,this.faker.name.jobDescriptor,this.faker.name.jobArea,this.faker.name.jobType],a=["!","#","%","&","*",")","(","+","=",".","<",">","{","}","[","]",":",";","'",'"',"_","-"],e;do e=this.faker.helpers.arrayElement(u)();while(!e||a.some(i=>e.includes(i)));return this.faker.helpers.arrayElement(e.split(" "))}words(u){let a=[];u==null&&(u=this.faker.datatype.number({min:1,max:3}));for(let e=0;e<u;e++)a.push(this.word());return a.join(" ")}locale(){return this.faker.helpers.arrayElement(Object.keys(this.faker.locales))}alpha(u={}){typeof u=="number"&&(u={count:u});let{count:a=1,upcase:e}=u,{bannedChars:i=[]}=u;if(typeof i=="string"&&(i=i.split("")),a<=0)return"";let{casing:r=e?"upper":"lower"}=u;e!=null&&m({deprecated:"faker.random.alpha({ upcase: true })",proposed:"faker.random.alpha({ casing: 'upper' })",since:"7.0",until:"8.0"});let n;switch(r){case"upper":n=[...V];break;case"lower":n=[...J];break;case"mixed":default:n=[...J,...V];break}if(n=lu(n,i),n.length===0)throw new F("Unable to generate string, because all possible characters are banned.");return Array.from({length:a},()=>this.faker.helpers.arrayElement(n)).join("")}alphaNumeric(u=1,a={}){if(u<=0)return"";let{casing:e="lower"}=a,{bannedChars:i=[]}=a;typeof i=="string"&&(i=i.split(""));let r=[...ou];switch(e){case"upper":r.push(...V);break;case"lower":r.push(...J);break;case"mixed":default:r.push(...J,...V);break}if(r=lu(r,i),r.length===0)throw new F("Unable to generate string, because all possible characters are banned.");return Array.from({length:u},()=>this.faker.helpers.arrayElement(r)).join("")}numeric(u=1,a={}){if(u<=0)return"";let{allowLeadingZeros:e=!1}=a,{bannedDigits:i=[]}=a;typeof i=="string"&&(i=i.split(""));let r=ou.filter(o=>!i.includes(o));if(r.length===0||r.length===1&&!e&&r[0]==="0")throw new F("Unable to generate numeric string, because all possible digits are banned.");let n="";for(!e&&!i.includes("0")&&(n+=this.faker.helpers.arrayElement(r.filter(o=>o!=="0")));n.length<u;)n+=this.faker.helpers.arrayElement(r);return n}},o0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(o0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}chemicalElement(){return this.faker.helpers.arrayElement(this.faker.definitions.science.chemicalElement)}unit(){return this.faker.helpers.arrayElement(this.faker.definitions.science.unit)}},$T=["video","audio","image","text","application"],WT=["application/pdf","audio/mpeg","audio/wav","image/png","image/jpeg","image/gif","video/mp4","video/mpeg","text/html"],qT=["en","wl","ww"],tu={index:"o",slot:"s",mac:"x",pci:"p"},l0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(l0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}fileName(u={}){let{extensionCount:a=1}=u,e=this.faker.random.words().toLowerCase().replace(/\W/g,"_");if(a<=0)return e;let i=Array.from({length:a}).map(()=>this.fileExt()).join(".");return`${e}.${i}`}commonFileName(u){return`${this.fileName({extensionCount:0})}.${u||this.commonFileExt()}`}mimeType(){let u=Object.keys(this.faker.definitions.system.mimeTypes);return this.faker.helpers.arrayElement(u)}commonFileType(){return this.faker.helpers.arrayElement($T)}commonFileExt(){return this.fileExt(this.faker.helpers.arrayElement(WT))}fileType(){let u=new Set,a=this.faker.definitions.system.mimeTypes;Object.keys(a).forEach(i=>{let r=i.split("/")[0];u.add(r)});let e=Array.from(u);return this.faker.helpers.arrayElement(e)}fileExt(u){if(typeof u=="string"){let r=this.faker.definitions.system.mimeTypes;return this.faker.helpers.arrayElement(r[u].extensions)}let a=this.faker.definitions.system.mimeTypes,e=new Set;Object.keys(a).forEach(r=>{a[r].extensions instanceof Array&&a[r].extensions.forEach(n=>{e.add(n)})});let i=Array.from(e);return this.faker.helpers.arrayElement(i)}directoryPath(){let u=this.faker.definitions.system.directoryPaths;return this.faker.helpers.arrayElement(u)}filePath(){return`${this.directoryPath()}/${this.fileName()}`}semver(){return[this.faker.datatype.number(9),this.faker.datatype.number(9),this.faker.datatype.number(9)].join(".")}networkInterface(u={}){var a,e,i,r,n;let{interfaceType:o=this.faker.helpers.arrayElement(qT),interfaceSchema:s=this.faker.helpers.objectKey(tu)}=u,l,E="";switch(s){case"index":l=this.faker.datatype.number(9).toString();break;case"slot":l=`${this.faker.datatype.number(9)}${(a=this.faker.helpers.maybe(()=>`f${this.faker.datatype.number(9)}`))!=null?a:""}${(e=this.faker.helpers.maybe(()=>`d${this.faker.datatype.number(9)}`))!=null?e:""}`;break;case"mac":l=this.faker.internet.mac("");break;case"pci":E=(i=this.faker.helpers.maybe(()=>`P${this.faker.datatype.number(9)}`))!=null?i:"",l=`${this.faker.datatype.number(9)}s${this.faker.datatype.number(9)}${(r=this.faker.helpers.maybe(()=>`f${this.faker.datatype.number(9)}`))!=null?r:""}${(n=this.faker.helpers.maybe(()=>`d${this.faker.datatype.number(9)}`))!=null?n:""}`;break}return`${E}${o}${tu[s]}${l}`}},ZT={},UT=[];function YT(u,a){return u[a]===void 0?-1:0}function su(u,a,e,i,r){throw console.error("Error",e),console.log(`Found ${Object.keys(i).length} unique entries before throwing error.
retried: ${r}
total time: ${a-u}ms`),new F(`${e} for uniqueness check.

May not be able to generate any more unique values with current settings.