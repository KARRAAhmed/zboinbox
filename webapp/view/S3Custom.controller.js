sap.ui.define([
	"cross/fnd/fiori/inbox/CA_FIORI_INBOXExtension1/model/formatter"
], function (formatter) {
	"use strict";
	return sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension1.view.S3Custom", {
		formatter: formatter,

		extHookChangeFooterButtons: function (oButtonList) {
			var buttonCount = oButtonList.aButtonList.length;
			//Code to control POSITIVE Type and NEGATIVE Type buttons for approve and reject
			// for (var oCount = buttonCount - 1; oCount > -1; oCount--) {
			// 	if (oButtonList.aButtonList[oCount].sBtnTxt === "Approve" || oButtonList.aButtonList[oCount].sBtnTxt === "Accept" || oButtonList.aButtonList[
			// 			oCount].sBtnTxt === "Submit" || oButtonList.aButtonList[oCount].sBtnTxt === "Approve WPR") {
			// 		oButtonList.aButtonList[oCount].nature = "POSITIVE";
			// 	}
			// 	if (oButtonList.aButtonList[oCount].sBtnTxt === "Reject" || oButtonList.aButtonList[oCount].sBtnTxt === "Reject WPR") {
			// 		oButtonList.aButtonList[oCount].nature = "NEGATIVE";
			// 	}
			// }
			var aMenuButtons = oButtonList.aButtonList;

			aMenuButtons.splice(2, 5);
		},
		showDecisionDialog: function (f, d, s) {
			var oViewContextPath = this.getView().getBindingContext().sPath;
			// var taskDefinitionID = this.getView().getModel().getProperty(oViewContextPath + "/TaskDefinitionID");
			var arr = this.getView().getModel().oData;
			oViewContextPath = oViewContextPath.slice(1);
			var docId = arr[oViewContextPath].TaskTitle;
			var navPAram = docId.split(" ");
			// var decisionText = d.DecisionText;
			var oModel = this.getView().getModel("BoModel");
			var sCommentaire = this.getView().byId("VboxContainer").getModel("BoModel").getBindings()[0].oContext.getProperty("Zcom");
			if (d.Nature === "POSITIVE") {
				this.oConfirmationDialogManager.showDecisionDialog({
					question: this.i18nBundle.getText("XMSG_DECISION_QUESTION", d.DecisionText),
					textAreaLabel: this.i18nBundle.getText("XFLD_TextArea_Decision"),
					showNote: s,
					title: this.i18nBundle.getText("XTIT_SUBMIT_DECISION"),
					confirmButtonLabel: this.i18nBundle.getText("XBUT_SUBMIT"),
					//	noteMandatory: d.CommentMandatory,
					noteMandatory: false,
					confirmActionHandler: jQuery.proxy(function (d, oController, sNewComment) {
						this.sendAction(f, d, sNewComment);
						//	if (decisionText === 'Valider' || decisionText === 'Receptionner' || decisionText === 'Traiter') {
							var semanticObj = "ZBureauDordre";
							var action = "manage";
						//	var params = "?Zrefde=" + navPAram[2];
						var params = "?Zrefde=" + navPAram[3];
							var hash = "#" + semanticObj + "-" + action;
							var urlParams = {
								//"RefDoc": navPAram[2],
								"RefDoc": navPAram[3],
								"Satut": d.Nature,
								"newComment": sNewComment
							};
							oModel.callFunction("/UpdateDocStatus", {
								method: "POST",
								urlParameters: urlParams,
								success: function (oData, oResponse) {
									if (oData.Zstatid === "005") {
										sap.m.URLHelper.redirect(hash + params, true);
									}
									this.getView().getModel().refresh();

								}.bind(this)
							});
						
					}, this, d, this)
				});
			} else {
				this.oConfirmationDialogManager.showDecisionDialog({
					question: this.i18nBundle.getText("XMSG_DECISION_QUESTION", d.DecisionText),
					textAreaLabel: this.i18nBundle.getText("XFLD_TextArea_Decision"),
					showNote: s,
					title: this.i18nBundle.getText("XTIT_SUBMIT_DECISION"),
					confirmButtonLabel: this.i18nBundle.getText("XBUT_SUBMIT"),
					//	noteMandatory: d.CommentMandatory,
					noteMandatory: true,
					confirmActionHandler: jQuery.proxy(function (d, oController, sNewComment) {
						this.sendAction(f, d, sNewComment);
						//	if (decisionText === 'Valider' || decisionText === 'Receptionner' || decisionText === 'Traiter') {
							var urlParams1 = {
								//"RefDoc": navPAram[2],
								"RefDoc": navPAram[3],
								"Satut": d.Nature,
								"newComment": sNewComment
							};
							oModel.callFunction("/UpdateDocStatus", {
								method: "POST",
								urlParameters: urlParams1,
								success: function (oData, oResponse) {

									this.getView().getModel().refresh();
									/*var o = sap.ca.scfld.md.app.Application.getImpl().getComponent();
									var e = o.getEventBus();
									e.publish("myInboxChannel", "setFirstItemSelected");*/
								}.bind(this)
							});
						
					}, this, d, this)
				});

			}
			sap.ui.getCore().byId("confirmDialogTextarea").setValue(sCommentaire);
		},
		NavTo: function (oEvent) {
			var semanticObj = "";
			var action = "";
			var params = "";
			semanticObj = "Z_TEST_OBJ";
			action = "display";
			var hash = "#" + semanticObj + "-" + action;
			sap.m.URLHelper.redirect(hash, true);
		},
		extHookGetEntitySetsToExpand: function () {
			var oViewContextPath = this.getView().getBindingContext().sPath;
			var arr = this.getView().getModel().oData;
			oViewContextPath = oViewContextPath.slice(1);
			var docId = arr[oViewContextPath].TaskTitle;
			var navPAram = docId.split(" ");
			var sDocRef = navPAram[3];
			var sPath = "/Document_entrantSet('" + sDocRef + "')";

			this.bindInfoGenData(sPath);
			this.bindHeaderData(sPath);
			this.getPjs(sDocRef);
			// Place your hook implementation code here 
		},
		bindInfoGenData: function (sBindingPath) {
			var oView = this.getView();
			this.getView().byId("VboxContainer").bindElement({
				model: "BoModel",
				path: sBindingPath,
				parameters: {
					expand: "DOC_SERVICESSet"
						/*,
						custom: {
							RequestMessages: true
						}*/
				},
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function (oData) {
						oView.setBusy(false);
					},
					change: function (oData) {
						oView.setBusy(false);
						this.getModel("BoModel").refresh();
					}
				}
			});
		},
		bindHeaderData: function (sBindingPath) {

			var oHeader = this.getView().byId("DocHedar");
			oHeader.bindElement({
				model: "BoModel",
				path: sBindingPath,
				events: {
					dataRequested: function () {
						oHeader.setBusy(true);
					},
					dataReceived: function (oData) {
						oHeader.setBusy(false);
					},
					change: function (oData) {
						oHeader.setBusy(false);
						this.getModel("BoModel").refresh();
					}
				}
			});
		},
		getPjs: function (sDocRef) {
			// this.getView().getModel("detail").setProperty("/AttachmentsCount", "");
			var oPjModel = this.getView().getModel("piecesJointesModel");
			if (!oPjModel) {
				this.getView().setModel(new sap.ui.model.json.JSONModel({
					"items": [],
					"busy": false
				}), "piecesJointesModel");
			}

			var that = this,
				sPjRequestUrl = "/Document_entrantSet('" + sDocRef + "')/ToPiecesJointes";

			this.getView().byId("pjUploader").setBusy(true);
			that.getView().getModel("BoModel").read(sPjRequestUrl, {
				success: function (oResponse) {
					// that.getView().getModel("detail").setProperty("/AttachmentsCount", oResponse.results.length.toString());
					that.getView().getModel("piecesJointesModel").setData(oResponse.results);
					that.getView().byId("pjUploader").setBusy(false);
				},
				error: function (oResponse) {
					that.getView().byId("pjUploader").setBusy(false);
				}
			});
		},
		onRefDocPressed: function (oEvent) {
			var msg = "On va naviger vers l'application Liste";
			sap.m.MessageToast.show(msg);
		},
		openEmployeQuickView: function (oEvent) {
			var sTaskTitle = oEvent.getSource().getBindingContext().getProperty("TaskTitle");
			var msg = sTaskTitle + " : Une popUp contenant les informations du service sera affiché du ";
			sap.m.MessageToast.show(msg);
		},
		/*IconTabBar redefinition : plz keep this redefinition = if not the attachment icon tab bar count will not work*/
		onTabSelect: function () {}
	});
});