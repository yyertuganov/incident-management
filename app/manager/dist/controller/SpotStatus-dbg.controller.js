"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "../format/util", "sap/ui/core/routing/History"], function (Controller, UIComponent, Filter, FilterOperator, ___format_util, History) {
  "use strict";

  const Urgency = ___format_util["Urgency"];
  /**
   * @namespace ns.manager.controller
   */
  const SpotStatus = Controller.extend("ns.manager.controller.SpotStatus", {
    getUrgencyFilter: function _getUrgencyFilter(key) {
      return Object.values(Urgency).includes(key) ? [new Filter("urgency", FilterOperator.EQ, key, false)] : [];
    },
    onFilterSelect: function _onFilterSelect(event) {
      const key = event.getParameter("key");
      this.setFilter(key);
    },
    navToMain: function _navToMain() {
      const previousHash = History.getInstance().getPreviousHash();
      if (previousHash !== undefined) {
        window.history.go(-1);
      } else {
        UIComponent.getRouterFor(this).navTo("RouteMain", {}, true);
      }
    },
    onInit: function _onInit() {
      const oRouter = this.getOwnerComponent()?.getRouter();
      oRouter.getRoute("RouteSpotStatus").attachMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function _onRouteMatched(event) {
      const oParameters = event.getParameters();
      const customerId = oParameters.arguments.index;
      this.defaultFilter = new Filter("customerID", FilterOperator.EQ, customerId, false);
      this.setFilter(this.getView()?.byId("iconTabBar")?.getSelectedKey());
    },
    setFilter: function _setFilter(key) {
      let statusFilters = [];
      const listBinding = this.getView()?.byId("incidentList")?.getBinding("items");
      if (key) {
        statusFilters = this.getUrgencyFilter(key);
      }
      listBinding.filter([this.defaultFilter, ...statusFilters]);
    }
  });
  return SpotStatus;
});
//# sourceMappingURL=SpotStatus-dbg.controller.js.map
