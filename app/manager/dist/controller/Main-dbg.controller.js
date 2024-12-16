"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/core/mvc/Controller"], function (UIComponent, Controller) {
  "use strict";

  /**
   * @namespace ns.manager.controller
   */
  const Main = Controller.extend("ns.manager.controller.Main", {
    navToSpotStatus: function _navToSpotStatus(event) {
      const spotIndex = event.getSource().getBindingContext("spotModel")?.getProperty("customerID");
      UIComponent.getRouterFor(this).navTo("RouteSpotStatus", {
        index: spotIndex
      });
    }
  });
  return Main;
});
//# sourceMappingURL=Main-dbg.controller.js.map
