sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension1.view.S2Custom", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension1.view.S2Custom
	 */
	onInit: function () {
		var o = sap.ca.scfld.md.app.Application.getImpl().getComponent();
		var e = o.getEventBus();
		e.subscribe("myInboxChannel", "setFirstItemSelected", this.setFirstItemSelected, this);
	},
	setFirstItemSelected: function (sChannel, sEvent) {
		var oItemToSelect = this.getView().byId("list").getItems()[0];
		this.getView().byId("list").fireItemPress(oItemToSelect);
	},
	onUpdateFinished: function (e) {
		var oList = e.getSource().getItems();
		this._setListBusyIndicator(false);
		if (!(this.isMultiSelectActive() && e.getParameter("reason") === "Growing") && (this.isActionPerformed || (this.oDataManager.getCallFromDeepLinkURL() &&
				e.getSource().getItems().length > 0) || e.getParameter("reason") === "Refresh")) {
			// this.fnFindAndSelectNextTaskAfterAction(e);
			this.isActionPerformed = false;
			this.setListItem(oList[0]);
		}
		if (this.isMultiSelectActive() && e.getParameter("reason") === "Growing") {
			this.updateMultiSelectState();
		}
		if (e.getParameter("actual") === e.getParameter("total")) {
			this.bTaskCountFromTaskCollectionCall = false;
		}
		var l = e.getSource();
		if (!sap.ui.Device.system.phone && this.isMultiSelectActive() === false && e.getParameter("reason") !== "Growing") {
			if (l.getSelectedItem() && l.getSelectedItem().$().offset() && l.getItems()[0].$().offset()) {
				l.getParent().scrollTo(l.getSelectedItem().$().offset().top - l.getItems()[0].$().offset().top, 0);
			}
		}
		var n = this.oApplicationFacade.getUiLibResourceModel().getText("NO_ITEMS_AVAILABLE");
		l.setNoDataText(n);
		var i = e.getSource().getItems();
		if (i && i[0] && i[0] instanceof sap.m.GroupHeaderListItem && this._oControlStore.oMasterSearchField.getValue() === "") {
			sap.ca.scfld.md.controller.ScfldMasterController.prototype.applySearchPattern.call(this, "");
		}
	}

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension1.view.S2Custom
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension1.view.S2Custom
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension1.view.S2Custom
	 */
	//	onExit: function() {
	//
	//	},

	//	noItemFoundForContext: function() {
	//
	//	}
	//	_areItemsUniqueByTaskType: function() {
	//
	//	}
	//	_handleItemRemoved: function(e) {
	//
	//	}
	//	handleRequestFailed: function(e) {
	//
	//	}
	//	getTotalTaskCount: function(e) {
	//
	//	}
	//	handleRequestCompleted: function(e) {
	//
	//	}
	//	fnHandleActionPerformed: function(e) {
	//
	//	}
	//	fnFindAndSelectNextTaskAfterAction: function(e) {
	//
	//	}
	//	selectIteminListforDeepLink: function() {
	//
	//	}
	//	_handleMultiSelectProcessing: function() {
	//
	//	}
	//	_selectItemByCtxtPath: function() {
	//
	//	}
	//	fnSelectFirstItem: function() {
	//
	//	}
	//	findNextVisibleItem: function(c, e, i) {
	//
	//	}
	//	overrideMHFHelperSetMasterTitle: function() {
	//
	//	}
	//	overrideMHFHelperFooterHandling: function() {
	//
	//	}
	//	overrideMHFHelperListRefresh: function() {
	//
	//	}
	//	onRefreshListInternal: function() {
	//
	//	}
	//	applySearchPatternToListItem: function(i, f) {
	//
	//	}
	//	createSubstitutesUserFilterOption: function() {
	//
	//	}
	//	getHeaderFooterOptions: function() {
	//
	//	}
	//	_findFilterKey: function(f) {
	//
	//	}
	//	_resetFilterState: function() {
	//
	//	}
	//	_saveFilterState: function(f) {
	//
	//	}
	//	_createFilterCategory: function(t, m) {
	//
	//	}
	//	_createFilterItem: function(k, t) {
	//
	//	}
	//	fnCreateSubstitutedUserFilterKeys: function(e) {
	//
	//	}
	//	createSubstitutedUserFilterCategory: function(i) {
	//
	//	}
	//	resetSubstitutesListSelection: function(e) {
	//
	//	}
	//	storeSubstitutedUserKeysInListItem: function(s, S) {
	//
	//	}
	//	createDynamicSubstiutedUserList: function(s, S) {
	//
	//	}
	//	createSubstitutedUserFilterItems: function(u, U) {
	//
	//	}
	//	getSubstitutedUsers: function(s) {
	//
	//	}
	//	resetSubstitutedUserFilterCategoryCount: function(c) {
	//
	//	}
	//	onShowFilter: function() {
	//
	//	}
	//	addFilterTextForSubstitutionFilter: function(f, i) {
	//
	//	}
	//	_createGroupSettingItem: function(g, t) {
	//
	//	}
	//	onShowGroup: function() {
	//
	//	}
	//	_isListFilteredByTaskType: function(b, l) {
	//
	//	}
	//	prepareMultiSelect: function() {
	//
	//	}
	//	dismissMultiSelect: function() {
	//
	//	}
	//	multiSelectFilterDialogOK: function(f) {
	//
	//	}
	//	refreshInfoHeaderToolbar: function(t) {
	//
	//	}
	//	refreshInfoHeaderToolbarForList: function(l, t) {
	//
	//	}
	//	downloadDecisionOptions: function(s, i, t) {
	//
	//	}
	//	downloadDecisionOptionsSuccess: function(d) {
	//
	//	}
	//	_handleSelect: function(e) {
	//
	//	}
	//	updateMultiSelectState: function() {
	//
	//	}
	//	publishMultiSelectEvent: function(s, w, r, S) {
	//
	//	}
	//	getActualListItems: function() {
	//
	//	}
	//	updateSelectAllCheckBox: function() {
	//
	//	}
	//	handleSelectAllCheckBoxPress: function() {
	//
	//	}
	//	onMultiSelectEvent: function(c, e, m) {
	//
	//	}
	//	onSupportInfoOpenEvent: function(c, e, s) {
	//
	//	}
	//	filterItemsByTaskDefinitionID: function(t, o) {
	//
	//	}
	//	clearDecisionButtons: function() {
	//
	//	}
	//	hideDecisionButtons: function() {
	//
	//	}
	//	checkDecisionSupport: function(s) {
	//
	//	}
	//	showDecisionButtons: function() {
	//
	//	}
	//	showDecisionDialog: function(d) {
	//
	//	}
	//	sendMultiClaimRelease: function(i, a) {
	//
	//	}
	//	sendMultiClaimReleaseSuccess: function(a, A, s, e) {
	//
	//	}
	//	sendMultiSelectAction: function(d, n) {
	//
	//	}
	//	sendMultiSelectActionSuccess: function(a, s, e) {
	//
	//	}
	//	sendMultiSelectActionEnd: function(a, e) {
	//
	//	}
	//	sendMultiSelectForwardSuccess: function(a, s, e, A) {
	//
	//	}
	//	isMultiSelectActive: function() {
	//
	//	}
	//	setProcessingMultiSelect: function(m) {
	//
	//	}
	//	setMultiSelectButtonActive: function(a) {
	//
	//	}
	//	initTaskDefnandCustomAttrDefnnModel: function(d) {
	//
	//	}
	//	loadInitialAppData: function() {
	//
	//	}
	//	fnAddAditionalSelectPropertiesAndInitBinding: function() {
	//
	//	}
	//	initListBinding: function(s, f) {
	//
	//	}
	//	getAllFilters: function(a) {
	//
	//	}
	//	getFiltersWithoutScenario: function(m) {
	//
	//	}
	//	getFiltersWithScenario: function(m) {
	//
	//	}
	//	onForwardPopUp: function() {
	//
	//	}
	//	showResubmitPopUp: function() {
	//
	//	}
	//	sendMultiSelectResubmitSuccess: function(a, s, e) {
	//
	//	}
	//	handleResubmitPopOverOk: function(r) {
	//
	//	}
	//	_PotentialOwnersSuccess: function(r) {
	//
	//	}
	//	startForwardFilter: function(l, q) {
	//
	//	}
	//	closeForwardPopUp: function(r) {
	//
	//	}
	//	_handleListSwipe: function(e) {
	//
	//	}
	//	_handleSwipeApproved: function(e) {
	//
	//	}
	//	showDecisionDialogForQuickAction: function(f, d, s) {
	//
	//	}
	//	onUpdateStarted: function(e) {
	//
	//	}
	//	onUpdateFinished: function(e) {
	//
	//	}
	//	onDataLoaded: function() {
	//
	//	}
	//	getDetailNavigationParameters: function(l) {
	//
	//	}
	//	applySearchPattern: function(f) {
	//
	//	}
	//	_getBindingContextOfFirstItem: function() {
	//
	//	}
	//	setSortItemsToDisplay: function() {
	//
	//	}
	//	handleFilter: function(f) {
	//
	//	}
	//	onMultiSelectFilterCompleted: function(c, e, p) {
	//
	//	}
	//	onMultiSelectFilterFailed: function() {
	//
	//	}
	//	onTaskCollectionFailed: function() {
	//
	//	}
	//	onShowReleaseLoader: function(c, e, v) {
	//
	//	}
	//	onRefreshOnError: function() {
	//
	//	}
	//	handleSort: function(s) {
	//
	//	}
	//	handleGroup: function() {
	//
	//	}
	//	configureSorters: function(s) {
	//
	//	}
	//	isBackendDefaultSortKeyEqualsTo: function(s) {
	//
	//	}
	//	completionDeadLineSorter: function(i, I) {
	//
	//	}
	//	statusGrouper: function(g, G, d) {
	//
	//	}
	//	getFilter: function(f) {
	//
	//	}
	//	handleMetadataFailed: function(e) {
	//
	//	}
	//	removeHeaderFooterOptions: function() {
	//
	//	}
	//	_setListBusyIndicator: function(v) {
	//
	//	}
	//	getNextItemsToSelect: function() {
	//
	//	}

});