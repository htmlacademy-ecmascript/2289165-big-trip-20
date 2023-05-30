(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",u="quarter",c="year",p="date",d="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},f=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:f,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+f(i,2,"0")+":"+f(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:c,w:l,d:a,D:p,h:r,m:s,s:i,ms:n,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=_;var g=function(e){return e instanceof E},$=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;b[l]=t,s=l}return!i&&s&&(y=s),s||!i&&y},M=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new E(n)},D=m;D.l=$,D.i=g,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var E=function(){function _(e){this.$L=$(e.locale,null,!0),this.parse(e)}var f=_.prototype;return f.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},f.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},f.$utils=function(){return D},f.isValid=function(){return!(this.$d.toString()===d)},f.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},f.isAfter=function(e,t){return M(e)<this.startOf(t)},f.isBefore=function(e,t){return this.endOf(t)<M(e)},f.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(e,t){var n=this,u=!!D.u(t)||t,d=D.p(e),v=function(e,t){var i=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return u?i:i.endOf(a)},h=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},_=this.$W,f=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case c:return u?v(1,0):v(31,11);case o:return u?v(1,f):v(0,f+1);case l:var b=this.$locale().weekStart||0,g=(_<b?_+7:_)-b;return v(u?m-g:m+(6-g),f);case a:case p:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},f.endOf=function(e){return this.startOf(e,!1)},f.$set=function(e,t){var l,u=D.p(e),d="set"+(this.$u?"UTC":""),v=(l={},l[a]=d+"Date",l[p]=d+"Date",l[o]=d+"Month",l[c]=d+"FullYear",l[r]=d+"Hours",l[s]=d+"Minutes",l[i]=d+"Seconds",l[n]=d+"Milliseconds",l)[u],h=u===a?this.$D+(t-this.$W):t;if(u===o||u===c){var _=this.clone().set(p,1);_.$d[v](h),_.init(),this.$d=_.set(p,Math.min(this.$D,_.daysInMonth())).$d}else v&&this.$d[v](h);return this.init(),this},f.set=function(e,t){return this.clone().$set(e,t)},f.get=function(e){return this[D.p(e)]()},f.add=function(n,u){var p,d=this;n=Number(n);var v=D.p(u),h=function(e){var t=M(d);return D.w(t.date(t.date()+Math.round(e*n)),d)};if(v===o)return this.set(o,this.$M+n);if(v===c)return this.set(c,this.$y+n);if(v===a)return h(1);if(v===l)return h(7);var _=(p={},p[s]=e,p[r]=t,p[i]=1e3,p)[v]||1,f=this.$d.getTime()+n*_;return D.w(f,this)},f.subtract=function(e,t){return this.add(-1*e,t)},f.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,u=n.months,c=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},p=function(e){return D.s(r%12||12,e,"0")},v=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},_={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:D.s(l+1,2,"0"),MMM:c(n.monthsShort,l,u,3),MMMM:c(u,l),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,o,2),ddd:c(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:D.s(r,2,"0"),h:p(1),hh:p(2),a:v(r,a,!0),A:v(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(e,t){return t||_[e]||s.replace(":","")}))},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(n,p,d){var v,h=D.p(p),_=M(n),f=(_.utcOffset()-this.utcOffset())*e,m=this-_,y=D.m(this,_);return y=(v={},v[c]=y/12,v[o]=y,v[u]=y/3,v[l]=(m-f)/6048e5,v[a]=(m-f)/864e5,v[r]=m/t,v[s]=m/e,v[i]=m/1e3,v)[h]||m,d?y:D.a(y)},f.daysInMonth=function(){return this.endOf(o).$D},f.$locale=function(){return b[this.$L]},f.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},f.clone=function(){return D.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},_}(),S=E.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",p]].forEach((function(e){S[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,E,M),e.$i=!0),M},M.locale=$,M.isDayjs=g,M.unix=function(e){return M(1e3*e)},M.en=b[y],M.Ls=b,M.p={},M}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=31536e6,o=2592e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:l,months:o,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},p=function(e){return e instanceof y},d=function(e,t,n){return new y(e,n,t.$l)},v=function(e){return t.p(e)+"s"},h=function(e){return e<0},_=function(e){return h(e)?Math.ceil(e):Math.floor(e)},f=function(e){return Math.abs(e)},m=function(e,t){return e?h(e)?{negative:!0,format:""+f(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},y=function(){function h(e,t,n){var i=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return d(e*c[v(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){i.$d[v(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(u);if(s){var r=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var f=h.prototype;return f.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*c[n]}),0)},f.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=_(e/l),e%=l,this.$d.months=_(e/o),e%=o,this.$d.days=_(e/r),e%=r,this.$d.hours=_(e/s),e%=s,this.$d.minutes=_(e/i),e%=i,this.$d.seconds=_(e/n),e%=n,this.$d.milliseconds=e},f.toISOString=function(){var e=m(this.$d.years,"Y"),t=m(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=m(n,"D"),s=m(this.$d.hours,"H"),r=m(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var l=m(a,"S"),o=e.negative||t.negative||i.negative||s.negative||r.negative||l.negative,u=s.format||r.format||l.format?"T":"",c=(o?"-":"")+"P"+e.format+t.format+i.format+u+s.format+r.format+l.format;return"P"===c||"-P"===c?"P0D":c},f.toJSON=function(){return this.toISOString()},f.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(e,t){return t||String(i[e])}))},f.as=function(e){return this.$ms/c[v(e)]},f.get=function(e){var t=this.$ms,n=v(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?_(t/c[n]):this.$d[n],0===t?0:t},f.add=function(e,t,n){var i;return i=t?e*c[v(t)]:p(e)?e.$ms:d(e,this).$ms,d(this.$ms+i*(n?-1:1),this)},f.subtract=function(e,t){return this.add(e,t,!0)},f.locale=function(e){var t=this.clone();return t.$l=e,t},f.clone=function(){return d(this.$ms,this)},f.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},f.milliseconds=function(){return this.get("milliseconds")},f.asMilliseconds=function(){return this.as("milliseconds")},f.seconds=function(){return this.get("seconds")},f.asSeconds=function(){return this.as("seconds")},f.minutes=function(){return this.get("minutes")},f.asMinutes=function(){return this.as("minutes")},f.hours=function(){return this.get("hours")},f.asHours=function(){return this.as("hours")},f.days=function(){return this.get("days")},f.asDays=function(){return this.as("days")},f.weeks=function(){return this.get("weeks")},f.asWeeks=function(){return this.as("weeks")},f.months=function(){return this.get("months")},f.asMonths=function(){return this.as("months")},f.years=function(){return this.get("years")},f.asYears=function(){return this.as("years")},h}();return function(n,i,s){e=s,t=s().$utils(),s.duration=function(e,t){var n=s.locale();return d(e,{$l:n},t)},s.isDuration=p;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(e,t){return p(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},i.prototype.subtract=function(e,t){return p(e)&&(e=e.asMilliseconds()),a.bind(this)(e,t)}}}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e={BEFOREBEGIN:"beforebegin",AFTERBEGIN:"afterbegin",BEFOREEND:"beforeend",AFTEREND:"afterend"};function t(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function i(t,n){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.BEFOREEND;n.insertAdjacentElement(i,t.getElement())}const s=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],r=["Amsterdam","Chamonix","Geneva","Strasbourg","Florence","Salzburg","Rome","Dublin","Paris","Vienna","Prague","Berlin","London","Copenhagen","Budapest","Oslo","Barcelona","Venice","Stockholm"],a=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],l=["Add luggage","Switch to comfort class","Add meal","Choose seats","Travel by train","Order Uber","Rent a car","Add breakfast","Book tickets","Lunch in city"];var o=n(484),u=n(646),c=n.n(u);function p(e,t){const n=Math.random()*(t-e+1)+e;return Math.floor(n)}function d(e){return e[p(0,e.length-1)]}o.extend(c());const v=()=>{let e=0;return function(){return e+=1,e}},h=e=>e?o(e).format("DD MMM YYYY"):"",_=e=>e?o(e).format("HH:mm"):"",f=()=>({src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:d(a)}),m=v(),y=(()=>{const e=new Array(r.length);for(let n=0;n<r.length;n++)e[n]=(t=r[n],{id:m(),description:d(a),name:t,pictures:Array.from({length:p(0,5)},f)});var t;return e})(),b=e=>y.find((t=>t.id===e)),g=v(),$=()=>({id:g(),title:d(l),price:p(500,5e3)}),M=(()=>{const e=new Array(s.length);for(let t=0;t<s.length;t++)e[t]={type:s[t],offers:Array.from({length:p(1,5)},$)};return e})(),D=e=>{let t;return M.forEach((n=>{n.offers.forEach((n=>{n.id===e.id&&(t=n)}))})),t},E=e=>{let t=[];return M.forEach((n=>{n.type===e&&(t=n.offers)})),t};class S{constructor(e){let{tripPoints:t}=e;this.tripPoints=t}getTemplate(){return function(e){const{basePrice:t,dateFrom:n,dateTo:i,destination:s,offers:a,type:l}=e,u=b(s),c=E(l),p=[];return a.forEach((e=>{p.push(D(e))})),`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${l}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n              <div class="event__type-item">\n                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n              </div>\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${l}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n          <datalist id="destination-list-1">\n            ${v=r,v.map((e=>`<option value="${e}"></option>`)).join(" ")}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${o(n).format("DD/MM/YY HH:mm")}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${o(i).format("DD/MM/YY HH:mm")}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${t}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Cancel</button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n            ${function(e,t){const n=[];return e.forEach((e=>{const i=t.includes(e)?"checked":"";n.push(`\n      <div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.title.split(" ").join("-")}-1" type="checkbox" name="event-offer-${e.title.split(" ").join("-")}" ${i}>\n        <label class="event__offer-label" for="event-offer-${e.title.split(" ").join("-")}-1">\n          <span class="event__offer-title">${e.title}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </label>\n      </div>`)})),n.join("")}(c,p)}\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${u.description}</p>\n\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n              ${d=u.pictures,d.map((e=>`<img class="event__photo" src="${e.src}" alt="Event photo">`)).join(" ")}\n            </div>\n          </div>\n        </section>\n      </section>\n    </form>\n  </li>`;var d,v}(this.tripPoints)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class w{constructor(e){let{tripPoints:t}=e;this.tripPoints=t}getTemplate(){return function(e){const{basePrice:t,dateFrom:n,dateTo:i,destination:s,isFavorite:r,offers:a,type:l}=e,u=h(n),c=_(n),p=_(i),d=b(s),v=((e,t)=>{const n=o.duration(o(t)-o(e));let i="";return n.days()>0&&(i+=`${n.days()}D `),(n.days()>0||n.hours()>0)&&(i+=`${n.hours()}H`),(n.days()>0||n.hours()>0||n.minutes()>0)&&(i+=` ${n.minutes()}M`),i})(n,i),f=r?"event__favorite-btn--active":"",m=[];return a.forEach((e=>{m.push(D(e))})),`<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="2019-03-18">${u}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${l}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${l} ${d.name} Amsterdam</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="2019-03-18T10:30">${c}</time>\n          &mdash;\n          <time class="event__end-time" datetime="2019-03-18T11:00">${p}</time>\n        </p>\n        <p class="event__duration">${v}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${t}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n      ${function(e){return e.map((e=>`\n    <li class="event__offer">\n      <span class="event__offer-title">${e.title}</span>\n      +€&nbsp;\n      <span class="event__offer-price">${e.price}</span>\n    </li>`)).join(" ")}(m)}\n      </ul>\n      <button class="event__favorite-btn ${f}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`}(this.tripPoints)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class P{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class T{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class k{constructor(e){let{tripPoints:t}=e;this.tripPoints=t}getTemplate(){return function(e){const{basePrice:t,dateFrom:n,dateTo:i,destination:s,offers:a,type:l}=e,u=b(s),c=E(l),p=[];return a.forEach((e=>{p.push(D(e))})),`<li class="trip-events__item">\n  <form class="event event--edit" action="#" method="post">\n  <header class="event__header">\n    <div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-1">\n        <span class="visually-hidden">Choose event type</span>\n        <img class="event__type-icon" width="17" height="17" src="img/icons/${l}.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n\n          <div class="event__type-item">\n            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n          </div>\n\n          <div class="event__type-item">\n            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n          </div>\n        </fieldset>\n      </div>\n    </div>\n\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-1">\n        ${l}\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${u.name}" list="destination-list-1">\n      <datalist id="destination-list-1">\n      ${d=r,d.map((e=>`<option value="${e}"></option>`)).join(" ")}\n      </datalist>\n    </div>\n\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-1">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${o(n).format("DD/MM/YY HH:mm")}">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-1">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${o(i).format("DD/MM/YY HH:mm")}">\n    </div>\n\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-1">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${t}">\n    </div>\n\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Delete</button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </header>\n  <section class="event__details">\n    <section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${function(e,t){const n=[];return e.forEach((e=>{const i=t.includes(e)?"checked":"";n.push(`\n      <div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.title.split(" ").join("-")}-1" type="checkbox" name="event-offer-${e.title.split(" ").join("-")}" ${i}>\n        <label class="event__offer-label" for="event-offer-${e.title.split(" ").join("-")}-1">\n          <span class="event__offer-title">${e.title}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </label>\n      </div>`)})),n.join("")}(c,p)}\n      </div>\n    </section>\n\n    <section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${u.description}</p>\n    </section>\n  </section>\n</form>\n</li>`;var d}(this.tripPoints)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class x{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n  <div class="trip-filters__filter">\n    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n    <label class="trip-filters__filter-label" for="filter-future">Future</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n    <label class="trip-filters__filter-label" for="filter-present">Present</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n    <label class="trip-filters__filter-label" for="filter-past">Past</label>\n  </div>\n\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class O{constructor(e){let{tripPoints:t}=e;this.tripPoints=t}getTemplate(){return function(e){const t=[];e.forEach((e=>{t.push(b(e.destination).name)}));const n=((e,t)=>{const n=e.split(" ").reverse(),i=t.split(" ").reverse();return n[0]===i[0]&&i.shift(),`${n.join(" ")}&nbsp;&mdash;&nbsp;${i.join(" ")}`})(h(e[0].dateFrom),h(e[e.length-1].dateTo));return`<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">${t.join(" &mdash; ")}</h1>\n\n    <p class="trip-info__dates">${n}</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>`}(this.tripPoints)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const C=v(),Y=v(),H=()=>{const e=d(s),t=E(e);return{id:C(),basePrice:p(5e3,2e4),dateFrom:new Date((new Date).getTime()+Y()*p(500,550)*60*60*24),dateTo:new Date((new Date).getTime()+550*Y()*60*60*24),destination:p(1,r.length),isFavourite:Math.random()<.5,offers:t.slice(0,t.length-p(0,t.length)),type:e}},F=document.querySelector(".trip-main"),A=F.querySelector(".trip-controls__filters"),L=document.querySelector(".trip-events"),j=new class{tripPoints=Array.from({length:10},H);getTripPoints(){return this.tripPoints}},I=new class{filterComponent=new x;constructor(e){let{filterContainer:t}=e;this.filterContainer=t}init(){i(this.filterComponent,this.filterContainer)}}({filterContainer:A}),N=new class{constructor(e){let{tripInfoContainer:t,tripPointsModel:n}=e;this.tripInfoContainer=t,this.tripPointsModel=n}init(){this.tripPoints=[...this.tripPointsModel.getTripPoints()],i(new O({tripPoints:this.tripPoints}),this.tripInfoContainer,e.AFTERBEGIN)}}({tripInfoContainer:F,tripPointsModel:j}),B=new class{tripEventsListComponent=new P;sortingComponent=new T;constructor(e){let{tripEventsListContainer:t,tripPointsModel:n}=e;this.tripEventsListContainer=t,this.tripPointsModel=n}init(){this.tripPoints=[...this.tripPointsModel.getTripPoints()],i(this.tripEventsListComponent,this.tripEventsListContainer,e.AFTERBEGIN),i(this.sortingComponent,this.tripEventsListComponent.getElement()),i(new k({tripPoints:this.tripPoints[0]}),this.tripEventsListComponent.getElement());for(let e=1;e<this.tripPoints.length-2;e++)i(new w({tripPoints:this.tripPoints[e]}),this.tripEventsListComponent.getElement());i(new S({tripPoints:this.tripPoints[this.tripPoints.length-1]}),this.tripEventsListComponent.getElement())}}({tripEventsListContainer:L,tripPointsModel:j});N.init(),I.init(),B.init()})()})();
//# sourceMappingURL=bundle.977e0320aa4215f00d8a.js.map