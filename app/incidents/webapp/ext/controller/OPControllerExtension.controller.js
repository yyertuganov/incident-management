
sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension', 
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
], 
function (ControllerExtension, MessageToast, JSONModel) {
	'use strict';
	const statusCodeMapping = {
		"N": 0,
		"A": 1,
		"I": 1,
		"H": 2,
		"R": 3,
		"C": 4
	};
	
	return ControllerExtension.extend('ns.incidents.ext.controller.OPControllerExtension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf ns.incidents.ext.controller.OPControllerExtension
             */
			onInit: function () {

				const data = {
					text: ""
				};
				const dialogModel = new JSONModel(data);
				this.getView().setModel(dialogModel, "dialog");
					
			},
			routing: {
				onAfterBinding: function (oBindingContext) {
					const oView = this.getView()
					const processNodes = this.getView().getModel("processsFlowModel").getData()
					oBindingContext.requestProperty('status_code').then(function (status_code) {
						// Special case for On-Hold
						if(status_code == "H") processNodes.nodes[1].children = ["2"]
						else  processNodes.nodes.splice(2,1)

						processNodes.nodes = processNodes.nodes.filter(node => node.nodeId <= statusCodeMapping[status_code])
						processNodes.nodes[processNodes.nodes.length - 1].children = []

						let processNodesModel = new JSONModel(processNodes)
						oView.setModel(processNodesModel, "processNodesModel")
					});
						
				}
			},
			editFlow: {
				onBeforeEdit: function (mParameters) {
					const priority = mParameters?.context.getProperty("urgency/descr")
					return this.openDialog("You're about to edit the incident with Priority: <strong>" + priority + "</strong>")

				},

				onAfterSave: function (mParameters) {
					//
					mParameters.context.refresh();
					//asynchronous access to complete data the context points to
					mParameters.context.requestObject().then((contextData) => {
						return MessageToast.show(
							`Save successful for incident titled: ${contextData.title}`
						);
					});
				},

				onBeforeDiscard: function () {
					return this.openDialog("Are you sure you want to discard this draft?");
				}
			},
			
		},
		openDialog: function (text) {
			return new Promise(
				function (resolve, reject) {
					let dialogModel = this.getView().getModel("dialog"),
						data = dialogModel.getData();
					data.text = text;
					dialogModel.setData(data);
					//use building blocks in an XML fragment using the loadFragment method from the SAP Fiori elements ExtensionAPI
					this.base
						.getExtensionAPI()
						.loadFragment({
							name: "ns.incidents.ext.fragment.Dialog",
							controller: this
						})
						.then(function (approveDialog) {
							//Dialog Continue button
							approveDialog.getBeginButton().attachPress(function () {
								approveDialog.close();
								resolve(null);
							});
							//Dialog Cancel button
							approveDialog.getEndButton().attachPress(function () {
								approveDialog.close().destroy();
								reject(null);
							});
							//consider dialog closing with Escape
							approveDialog.attachAfterClose(function () {
								approveDialog.destroy();
								reject(null);
							});
							approveDialog.open();
						});
				}.bind(this)
			);
		},
		closeDialog: function (closeBtn) {
			closeBtn.getSource().getParent().close();
		},
		viewLocation: function() {
			this.base.getExtensionAPI()
				.loadFragment({
					name: "ns.incidents.ext.fragment.GeoMap",
					controller: this
				})
				.then(function (dialog) {
					dialog.attachEventOnce("afterClose", function () {
						dialog.destroy();
					});

					dialog.open();
				});
		}
	});
});
