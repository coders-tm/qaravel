var f=()=>{window.console=function(t){(!window.console||!t)&&(t={});var a=!0,n=!1,u={logs:[],errors:[],warns:[],infos:[],trace:[]};return{core:function(){this.addLog(arguments,"core"),Array.prototype.unshift.call(arguments,"%c[Core]","color: #fff; background: #ea1d75; font-weight:700;padding:5px"),t.log&&t.log.apply(t,arguments)},func:function(){this.addLog(arguments,"funcs"),arguments[0]="%c[Func]%c "+arguments[0],Array.prototype.splice.call(arguments,1,0,"color: #fff; background:#CC66CC; font-weight:700;padding:5px","color: #CC66CC; font-weight:700;"),a&&t.log&&t.log.apply(t,arguments)},event:function(){this.addLog(arguments,"events"),arguments[0]="%c[Event]%c "+arguments[0],Array.prototype.splice.call(arguments,1,0,"color: #fff; background:#FF6600; font-weight:700;padding:5px","color: #FF6600; font-weight:700;"),a&&t.log&&t.log.apply(t,arguments)},log:function(){this.addLog(arguments,"logs"),Array.prototype.unshift.call(arguments,"%c[Debug]","color: #fff; background: #009900; font-weight:700;padding:5px"),a&&t.log&&t.log.apply(t,arguments)},warn:function(){this.addLog(arguments,"warns"),Array.prototype.unshift.call(arguments,"[Warn]"),a&&t.warn&&t.warn.apply(t,arguments)},error:function(){this.addLog(arguments,"errors"),Array.prototype.unshift.call(arguments,"%c[Error]","color: #fff; background: #990000; font-weight:700;padding:5px"),a&&t.error&&t.error.apply(t,arguments)},info:function(){this.addLog(arguments,"infos"),Array.prototype.unshift.call(arguments,"%c[Info]","color: #fff; background:#0066FF; font-weight:700;padding:5px"),a&&t.info&&t.info.apply(t,arguments)},trace:function(){this.addLog(arguments,"trace"),Array.prototype.unshift.call(arguments,"%c[Trace]","color: #fff; background:#FFCC00;font-weight:700;padding:5px"),a&&t.trace&&t.trace.apply(t,arguments)},debug:function(r){a=r},saveLog:function(r){n=r},addLog:function(r,c){!n||u[c||"logs"].push(r)},logArray:function(){return u}}}(window.console)};export{f as default};
