"use strict";

sap.ui.define(["sap/ui/core/message/MessageType", "sap/ui/core/format/DateFormat"], function (MessageType, DateFormat) {
  "use strict";

  var Urgency = /*#__PURE__*/function (Urgency) {
    Urgency["High"] = "H";
    Urgency["Medium"] = "M";
    Urgency["Low"] = "L";
    return Urgency;
  }(Urgency || {});
  function formatHighlightColor(urgency) {
    if (urgency === Urgency.High) {
      return MessageType.Error;
    } else if (urgency === Urgency.Medium) {
      return MessageType.Warning;
    }
    return MessageType.Information;
  }
  function formatDaysAgo(createdAt) {
    const oDateTimeWithTimezoneFormat = DateFormat.getDateTimeWithTimezoneInstance();
    const since = oDateTimeWithTimezoneFormat.parse(createdAt);
    const oDateFormat = DateFormat.getDateInstance({
      relative: true
    });
    return oDateFormat.format(since[0]);
  }
  var __exports = {
    __esModule: true
  };
  __exports.Urgency = Urgency;
  __exports.formatHighlightColor = formatHighlightColor;
  __exports.formatDaysAgo = formatDaysAgo;
  return __exports;
});
//# sourceMappingURL=util-dbg.js.map
