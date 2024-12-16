import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import { GeoMap$KeyPressEvent } from "sap/ui/vbm/GeoMap";

/**
 * @namespace ns.manager.controller
 */
export default class Main extends Controller {
    navToSpotStatus(event: GeoMap$KeyPressEvent) {
        const spotIndex = event.getSource().getBindingContext("spotModel")?.getProperty("customerID");
        UIComponent.getRouterFor(this).navTo("RouteSpotStatus", {index: spotIndex});
    }
}