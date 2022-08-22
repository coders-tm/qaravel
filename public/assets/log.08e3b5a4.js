var log = () => {
  window.console = function(origConsole) {
    if (!window.console || !origConsole) {
      origConsole = {};
    }
    var isDebug = false, isSaveLog = false, logArray = {
      logs: [],
      errors: [],
      warns: [],
      infos: [],
      trace: []
    };
    return {
      core: function() {
        this.addLog(arguments, "core");
        Array.prototype.unshift.call(
          arguments,
          "%c[Core]",
          "color: #fff; background: #ea1d75; font-weight:700;padding:5px"
        );
        origConsole.log && origConsole.log.apply(origConsole, arguments);
      },
      func: function() {
        this.addLog(arguments, "funcs");
        arguments[0] = "%c[Func]%c " + arguments[0];
        Array.prototype.splice.call(
          arguments,
          1,
          0,
          "color: #fff; background:#CC66CC; font-weight:700;padding:5px",
          "color: #CC66CC; font-weight:700;"
        );
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments);
      },
      event: function() {
        this.addLog(arguments, "events");
        arguments[0] = "%c[Event]%c " + arguments[0];
        Array.prototype.splice.call(
          arguments,
          1,
          0,
          "color: #fff; background:#FF6600; font-weight:700;padding:5px",
          "color: #FF6600; font-weight:700;"
        );
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments);
      },
      log: function() {
        this.addLog(arguments, "logs");
        Array.prototype.unshift.call(
          arguments,
          "%c[Debug]",
          "color: #fff; background: #009900; font-weight:700;padding:5px"
        );
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments);
      },
      warn: function() {
        this.addLog(arguments, "warns");
        Array.prototype.unshift.call(arguments, "[Warn]");
        isDebug && origConsole.warn && origConsole.warn.apply(origConsole, arguments);
      },
      error: function() {
        this.addLog(arguments, "errors");
        Array.prototype.unshift.call(
          arguments,
          "%c[Error]",
          "color: #fff; background: #990000; font-weight:700;padding:5px"
        );
        isDebug && origConsole.error && origConsole.error.apply(origConsole, arguments);
      },
      info: function() {
        this.addLog(arguments, "infos");
        Array.prototype.unshift.call(
          arguments,
          "%c[Info]",
          "color: #fff; background:#0066FF; font-weight:700;padding:5px"
        );
        isDebug && origConsole.info && origConsole.info.apply(origConsole, arguments);
      },
      trace: function() {
        this.addLog(arguments, "trace");
        Array.prototype.unshift.call(
          arguments,
          "%c[Trace]",
          "color: #fff; background:#FFCC00;font-weight:700;padding:5px"
        );
        isDebug && origConsole.trace && origConsole.trace.apply(origConsole, arguments);
      },
      debug: function(bool) {
        isDebug = bool;
      },
      saveLog: function(bool) {
        isSaveLog = bool;
      },
      addLog: function(args, array) {
        if (!isSaveLog) {
          return;
        }
        logArray[array || "logs"].push(args);
      },
      logArray: function() {
        return logArray;
      }
    };
  }(window.console);
};
export { log as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLjA4ZTNiNWE0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm9vdC9sb2cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICB3aW5kb3cuY29uc29sZSA9IChmdW5jdGlvbiAob3JpZ0NvbnNvbGUpIHtcbiAgICBpZiAoIXdpbmRvdy5jb25zb2xlIHx8ICFvcmlnQ29uc29sZSkge1xuICAgICAgb3JpZ0NvbnNvbGUgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgaXNEZWJ1ZyA9IHByb2Nlc3MuZW52LkRFVixcbiAgICAgIGlzU2F2ZUxvZyA9IGZhbHNlLFxuICAgICAgbG9nQXJyYXkgPSB7XG4gICAgICAgIGxvZ3M6IFtdLFxuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICB3YXJuczogW10sXG4gICAgICAgIGluZm9zOiBbXSxcbiAgICAgICAgdHJhY2U6IFtdLFxuICAgICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb3JlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRkTG9nKGFyZ3VtZW50cywgXCJjb3JlXCIpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5jYWxsKFxuICAgICAgICAgIGFyZ3VtZW50cyxcbiAgICAgICAgICBcIiVjW0NvcmVdXCIsXG4gICAgICAgICAgXCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZDogI2VhMWQ3NTsgZm9udC13ZWlnaHQ6NzAwO3BhZGRpbmc6NXB4XCJcbiAgICAgICAgKTtcbiAgICAgICAgb3JpZ0NvbnNvbGUubG9nICYmIG9yaWdDb25zb2xlLmxvZy5hcHBseShvcmlnQ29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgICBmdW5jOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRkTG9nKGFyZ3VtZW50cywgXCJmdW5jc1wiKTtcbiAgICAgICAgYXJndW1lbnRzWzBdID0gXCIlY1tGdW5jXSVjIFwiICsgYXJndW1lbnRzWzBdO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoXG4gICAgICAgICAgYXJndW1lbnRzLFxuICAgICAgICAgIDEsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBcImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiNDQzY2Q0M7IGZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjVweFwiLFxuICAgICAgICAgIFwiY29sb3I6ICNDQzY2Q0M7IGZvbnQtd2VpZ2h0OjcwMDtcIlxuICAgICAgICApO1xuICAgICAgICBpc0RlYnVnICYmXG4gICAgICAgICAgb3JpZ0NvbnNvbGUubG9nICYmXG4gICAgICAgICAgb3JpZ0NvbnNvbGUubG9nLmFwcGx5KG9yaWdDb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIGV2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRkTG9nKGFyZ3VtZW50cywgXCJldmVudHNcIik7XG4gICAgICAgIGFyZ3VtZW50c1swXSA9IFwiJWNbRXZlbnRdJWMgXCIgKyBhcmd1bWVudHNbMF07XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuY2FsbChcbiAgICAgICAgICBhcmd1bWVudHMsXG4gICAgICAgICAgMSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIFwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6I0ZGNjYwMDsgZm9udC13ZWlnaHQ6NzAwO3BhZGRpbmc6NXB4XCIsXG4gICAgICAgICAgXCJjb2xvcjogI0ZGNjYwMDsgZm9udC13ZWlnaHQ6NzAwO1wiXG4gICAgICAgICk7XG4gICAgICAgIGlzRGVidWcgJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS5sb2cgJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS5sb2cuYXBwbHkob3JpZ0NvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgbG9nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRkTG9nKGFyZ3VtZW50cywgXCJsb2dzXCIpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5jYWxsKFxuICAgICAgICAgIGFyZ3VtZW50cyxcbiAgICAgICAgICBcIiVjW0RlYnVnXVwiLFxuICAgICAgICAgIFwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICMwMDk5MDA7IGZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjVweFwiXG4gICAgICAgICk7XG4gICAgICAgIGlzRGVidWcgJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS5sb2cgJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS5sb2cuYXBwbHkob3JpZ0NvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgd2FybjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkZExvZyhhcmd1bWVudHMsIFwid2FybnNcIik7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmNhbGwoYXJndW1lbnRzLCBcIltXYXJuXVwiKTtcbiAgICAgICAgaXNEZWJ1ZyAmJlxuICAgICAgICAgIG9yaWdDb25zb2xlLndhcm4gJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS53YXJuLmFwcGx5KG9yaWdDb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRkTG9nKGFyZ3VtZW50cywgXCJlcnJvcnNcIik7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmNhbGwoXG4gICAgICAgICAgYXJndW1lbnRzLFxuICAgICAgICAgIFwiJWNbRXJyb3JdXCIsXG4gICAgICAgICAgXCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZDogIzk5MDAwMDsgZm9udC13ZWlnaHQ6NzAwO3BhZGRpbmc6NXB4XCJcbiAgICAgICAgKTtcbiAgICAgICAgaXNEZWJ1ZyAmJlxuICAgICAgICAgIG9yaWdDb25zb2xlLmVycm9yICYmXG4gICAgICAgICAgb3JpZ0NvbnNvbGUuZXJyb3IuYXBwbHkob3JpZ0NvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgaW5mbzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkZExvZyhhcmd1bWVudHMsIFwiaW5mb3NcIik7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmNhbGwoXG4gICAgICAgICAgYXJndW1lbnRzLFxuICAgICAgICAgIFwiJWNbSW5mb11cIixcbiAgICAgICAgICBcImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiMwMDY2RkY7IGZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjVweFwiXG4gICAgICAgICk7XG4gICAgICAgIGlzRGVidWcgJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS5pbmZvICYmXG4gICAgICAgICAgb3JpZ0NvbnNvbGUuaW5mby5hcHBseShvcmlnQ29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgICB0cmFjZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkZExvZyhhcmd1bWVudHMsIFwidHJhY2VcIik7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmNhbGwoXG4gICAgICAgICAgYXJndW1lbnRzLFxuICAgICAgICAgIFwiJWNbVHJhY2VdXCIsXG4gICAgICAgICAgXCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZDojRkZDQzAwO2ZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjVweFwiXG4gICAgICAgICk7XG4gICAgICAgIGlzRGVidWcgJiZcbiAgICAgICAgICBvcmlnQ29uc29sZS50cmFjZSAmJlxuICAgICAgICAgIG9yaWdDb25zb2xlLnRyYWNlLmFwcGx5KG9yaWdDb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIGRlYnVnOiBmdW5jdGlvbiAoYm9vbCkge1xuICAgICAgICBpc0RlYnVnID0gYm9vbDtcbiAgICAgIH0sXG4gICAgICBzYXZlTG9nOiBmdW5jdGlvbiAoYm9vbCkge1xuICAgICAgICBpc1NhdmVMb2cgPSBib29sO1xuICAgICAgfSxcbiAgICAgIGFkZExvZzogZnVuY3Rpb24gKGFyZ3MsIGFycmF5KSB7XG4gICAgICAgIGlmICghaXNTYXZlTG9nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZ0FycmF5W2FycmF5IHx8IFwibG9nc1wiXS5wdXNoKGFyZ3MpO1xuICAgICAgfSxcbiAgICAgIGxvZ0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsb2dBcnJheTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfSkod2luZG93LmNvbnNvbGUpO1xufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE1BQWUsTUFBTTtBQUNuQixTQUFPLFVBQVcsU0FBVSxhQUFhO0FBQ3ZDLFFBQUksQ0FBQyxPQUFPLFdBQVcsQ0FBQyxhQUFhO0FBQ25DLG9CQUFjLENBQUE7QUFBQSxJQUNmO0FBRUQsUUFBSSxVQUFVLE9BQ1osWUFBWSxPQUNaLFdBQVc7QUFBQSxNQUNULE1BQU0sQ0FBRTtBQUFBLE1BQ1IsUUFBUSxDQUFFO0FBQUEsTUFDVixPQUFPLENBQUU7QUFBQSxNQUNULE9BQU8sQ0FBRTtBQUFBLE1BQ1QsT0FBTyxDQUFFO0FBQUEsSUFDakI7QUFFSSxXQUFPO0FBQUEsTUFDTCxNQUFNLFdBQVk7QUFDaEIsYUFBSyxPQUFPLFdBQVcsTUFBTTtBQUM3QixjQUFNLFVBQVUsUUFBUTtBQUFBLFVBQ3RCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNWO0FBQ1Esb0JBQVksT0FBTyxZQUFZLElBQUksTUFBTSxhQUFhLFNBQVM7QUFBQSxNQUNoRTtBQUFBLE1BQ0QsTUFBTSxXQUFZO0FBQ2hCLGFBQUssT0FBTyxXQUFXLE9BQU87QUFDOUIsa0JBQVUsS0FBSyxnQkFBZ0IsVUFBVTtBQUN6QyxjQUFNLFVBQVUsT0FBTztBQUFBLFVBQ3JCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ1Y7QUFDUSxtQkFDRSxZQUFZLE9BQ1osWUFBWSxJQUFJLE1BQU0sYUFBYSxTQUFTO0FBQUEsTUFDL0M7QUFBQSxNQUNELE9BQU8sV0FBWTtBQUNqQixhQUFLLE9BQU8sV0FBVyxRQUFRO0FBQy9CLGtCQUFVLEtBQUssaUJBQWlCLFVBQVU7QUFDMUMsY0FBTSxVQUFVLE9BQU87QUFBQSxVQUNyQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNWO0FBQ1EsbUJBQ0UsWUFBWSxPQUNaLFlBQVksSUFBSSxNQUFNLGFBQWEsU0FBUztBQUFBLE1BQy9DO0FBQUEsTUFDRCxLQUFLLFdBQVk7QUFDZixhQUFLLE9BQU8sV0FBVyxNQUFNO0FBQzdCLGNBQU0sVUFBVSxRQUFRO0FBQUEsVUFDdEI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ1Y7QUFDUSxtQkFDRSxZQUFZLE9BQ1osWUFBWSxJQUFJLE1BQU0sYUFBYSxTQUFTO0FBQUEsTUFDL0M7QUFBQSxNQUNELE1BQU0sV0FBWTtBQUNoQixhQUFLLE9BQU8sV0FBVyxPQUFPO0FBQzlCLGNBQU0sVUFBVSxRQUFRLEtBQUssV0FBVyxRQUFRO0FBQ2hELG1CQUNFLFlBQVksUUFDWixZQUFZLEtBQUssTUFBTSxhQUFhLFNBQVM7QUFBQSxNQUNoRDtBQUFBLE1BQ0QsT0FBTyxXQUFZO0FBQ2pCLGFBQUssT0FBTyxXQUFXLFFBQVE7QUFDL0IsY0FBTSxVQUFVLFFBQVE7QUFBQSxVQUN0QjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDVjtBQUNRLG1CQUNFLFlBQVksU0FDWixZQUFZLE1BQU0sTUFBTSxhQUFhLFNBQVM7QUFBQSxNQUNqRDtBQUFBLE1BQ0QsTUFBTSxXQUFZO0FBQ2hCLGFBQUssT0FBTyxXQUFXLE9BQU87QUFDOUIsY0FBTSxVQUFVLFFBQVE7QUFBQSxVQUN0QjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDVjtBQUNRLG1CQUNFLFlBQVksUUFDWixZQUFZLEtBQUssTUFBTSxhQUFhLFNBQVM7QUFBQSxNQUNoRDtBQUFBLE1BQ0QsT0FBTyxXQUFZO0FBQ2pCLGFBQUssT0FBTyxXQUFXLE9BQU87QUFDOUIsY0FBTSxVQUFVLFFBQVE7QUFBQSxVQUN0QjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDVjtBQUNRLG1CQUNFLFlBQVksU0FDWixZQUFZLE1BQU0sTUFBTSxhQUFhLFNBQVM7QUFBQSxNQUNqRDtBQUFBLE1BQ0QsT0FBTyxTQUFVLE1BQU07QUFDckIsa0JBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRCxTQUFTLFNBQVUsTUFBTTtBQUN2QixvQkFBWTtBQUFBLE1BQ2I7QUFBQSxNQUNELFFBQVEsU0FBVSxNQUFNLE9BQU87QUFDN0IsWUFBSSxDQUFDLFdBQVc7QUFDZDtBQUFBLFFBQ0Q7QUFDRCxpQkFBUyxTQUFTLFFBQVEsS0FBSyxJQUFJO0FBQUEsTUFDcEM7QUFBQSxNQUNELFVBQVUsV0FBWTtBQUNwQixlQUFPO0FBQUEsTUFDUjtBQUFBLElBQ1A7QUFBQSxFQUNBLEVBQUssT0FBTyxPQUFPO0FBQ25COzsifQ==
