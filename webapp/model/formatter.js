sap.ui.define([], function () {
	"use strict";

	return {

		refFormatter: function (sValue) {
			if (sValue) {
				var sId = sValue.substring(0, 4);
				var sYear = sValue.substring(4, sValue.length);
				return sId + "/" + sYear;
			}
			return sValue;

		},
		formatRowHighlight: function (bIsPilote) {
			var sReturn = "Success";
			if (!bIsPilote) {
				sReturn = "None";
			}
			return sReturn;
		},
		statutFormatter: function (sStatutCode) {
			var sStatut = "None";
			if (sStatutCode) {

				if (sStatutCode === "001" || !sStatutCode) { //Créé
					sStatut = "None";
				}
				if (sStatutCode === "002") { //Diffusé
					sStatut = "Warning";
				}
				if (sStatutCode === "003") { //Validé
					sStatut = "Success";
				}
				if (sStatutCode === "004") { //Récéptionné
					sStatut = "Information";
				}
				if (sStatutCode === "005") { //traité
					sStatut = "Information";
				}
				if (sStatutCode === "006") { //Rejeté
					sStatut = "Error";
				}
			}

			return sStatut;
		},
		statusIconFormatter: function (sStatutCode) {
			var sIcon = "";
			if (sStatutCode === "002") { //Diffusé
				sIcon = "sap-icon://action";
			}
			if (sStatutCode === "003") { //Validé
				sIcon = "sap-icon://accept";
			}
			if (sStatutCode === "004") { //Récéptionné
				sIcon = "sap-icon://inbox";
			}
			return sIcon;
		},
		typeDocFormatter: function (bUrgent, bInterne, bConfid) {
			var sDocUrgent = "Urgent";
			var sDocInterne = "Interne";
			var sDocConfi = "Confidentiel";
			var sTypeDoc = "";
			if (bUrgent) {
				sTypeDoc += sDocUrgent;
			}
			if (bInterne) {
				if (sTypeDoc !== "") {
					sTypeDoc += ", " + sDocInterne;
				} else {
					sTypeDoc += sDocInterne;
				}
			}
			if (bConfid) {

				if (sTypeDoc !== "") {
					sTypeDoc += ", " + sDocConfi;
				} else {
					sTypeDoc += sDocConfi;
				}

			}
			return sTypeDoc;
		}
	};
});