export default () => {
  window.console = (function (origConsole) {
    if (!window.console || !origConsole) {
      origConsole = {}
    }

    var isDebug = process.env.DEV,
      isSaveLog = false,
      logArray = {
        logs: [],
        errors: [],
        warns: [],
        infos: [],
        trace: []
      }

    return {
      core: function () {
        this.addLog(arguments, 'core')
        Array.prototype.unshift.call(arguments, '%c[Core]', 'color: #fff; background: #ea1d75; font-weight:700;padding:5px')
        origConsole.log && origConsole.log.apply(origConsole, arguments)
      },
      func: function () {
        this.addLog(arguments, 'funcs')
        arguments[0] = '%c[Func]%c ' + arguments[0]
        Array.prototype.splice.call(arguments, 1, 0, 'color: #fff; background:#CC66CC; font-weight:700;padding:5px', 'color: #CC66CC; font-weight:700;')
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments)
      },
      event: function () {
        this.addLog(arguments, 'events')
        arguments[0] = '%c[Event]%c ' + arguments[0]
        Array.prototype.splice.call(arguments, 1, 0, 'color: #fff; background:#FF6600; font-weight:700;padding:5px', 'color: #FF6600; font-weight:700;')
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments)
      },
      log: function () {
        this.addLog(arguments, 'logs')
        Array.prototype.unshift.call(arguments, '%c[Debug]', 'color: #fff; background: #009900; font-weight:700;padding:5px')
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments)
      },
      warn: function () {
        this.addLog(arguments, 'warns')
        Array.prototype.unshift.call(arguments, '[Warn]')
        isDebug && origConsole.warn && origConsole.warn.apply(origConsole, arguments)
      },
      error: function () {
        this.addLog(arguments, 'errors')
        Array.prototype.unshift.call(arguments, '%c[Error]', 'color: #fff; background: #990000; font-weight:700;padding:5px')
        isDebug && origConsole.error && origConsole.error.apply(origConsole, arguments)
      },
      info: function () {
        this.addLog(arguments, 'infos')
        Array.prototype.unshift.call(arguments, '%c[Info]', 'color: #fff; background:#0066FF; font-weight:700;padding:5px')
        isDebug && origConsole.info && origConsole.info.apply(origConsole, arguments)
      },
      trace: function () {
        this.addLog(arguments, 'trace')
        Array.prototype.unshift.call(arguments, '%c[Trace]', 'color: #fff; background:#FFCC00;font-weight:700;padding:5px')
        isDebug && origConsole.trace && origConsole.trace.apply(origConsole, arguments)
      },
      debug: function (bool) {
        isDebug = bool
      },
      saveLog: function (bool) {
        isSaveLog = bool
      },
      addLog: function (args, array) {
        if (!isSaveLog) {
          return
        }
        logArray[array || 'logs'].push(args)
      },
      logArray: function () {
        return logArray
      }
    }
  }(window.console))
}
