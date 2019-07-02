sap.ui.controller("usrole.controller.usersAssgnDetail", {

    fnHdrTitle(sUsrole, sDescr) {
        if (sUsrole) {
            sDescr = sDescr !== "" ? " - " + sDescr : "";
            return "User Role" +
                ":  " + sUsrole + sDescr;
        }
        return "User Role";
    },
    fnPermissionToolbarActions(sAction) {
        debugger
        switch (sAction) {
            case "add":
                this.fnPermTableClear();
                let oData = {
                    "aon": "",
                    "rov": "",
                    "validFrom": "",
                    "validTo": ""
                };
                this.fnAddPermissionDialog(oData, 'add');
                break
            case "edit":
                this.fnAddPermissionDialog( "","edit");
                // let arSelectedContexts = this.byId("permissionsTable").getSelectedContexts();
                // arSelectedContexts = Array.isArray(arSelectedContexts) ? arSelectedContexts : [];
                // if (arSelectedContexts.length === 0 || arSelectedContexts.length > 1) {
                //     sap.m.MessageToast.show("Select atleast one record");
                // } else {
                //     let oPermission = arSelectedContexts[0].getObject();
                //     this.fnAddPermissionDialog(oPermission, "edit");
                // }
                break;
            default:
        }
    },

    fnAddPermissionDialog(oObj, sAction) {
        debugger
        let oController = this;
        // let oModel = this.getOwnerComponent().getModel("userModel");
        // let oRecordModel = new sap.ui.model.json.JSONModel({
        //     record: JSON.parse(JSON.stringify(oObj))
        // });
        let sTitle = (sAction === "add") ? "Add Permission" :
            "Edit Permission";
        let oForm = this.fnPermissionForm(sAction);
        let oDialog = new sap.m.Dialog({
            contentWidth: "50%",
            title: sTitle,
            content: [oForm],
            beginButton: new sap.m.Button({
                text: "Update",
                tooltip: "Update",
                press: (oEvt) => {
                    oDialog.destroy();
                }
            }),
            endButton: new sap.m.Button({
                text: "Cancel",
                tooltip: "Cancel",
                press: function (oEvt) {
                    if (sAction === "edit") {
                        oController.fnPermTableClear();
                    }
                    oDialog.destroy();
                }
            })
        });
        // oDialog.setModel(oRecordModel, "userRecordModel");
        oDialog.open();

    },

    fnPermissionForm(sAction) {
        let oPermForm = new sap.ui.layout.form.Form({
            layout: new sap.ui.layout.form.ResponsiveGridLayout({
                labelSpanL: 4,
                labelSpanM: 4,
                labelSpanS: 12,
                emptySpanL: 0,
                emptySpanM: 0,
                emptySpanS: 0,
                columnsL: 2,
                columnsM: 2,
                breakpointL: 1024,
                breakpointM: 600
            }),
            editable: true,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    layoutData: new sap.ui.layout.GridData({
                        spanL: 6,
                        spanM: 6,
                        spanS: 12
                    }),
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: 'Authority of Negotiation',
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showValueHelp: true
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Range of Validity",
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showValueHelp: true
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Valid From",
                            fields: [
                                new sap.m.DatePicker({
                                    tooltip: "Valid From"
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Valid To",
                            fields: [
                                new sap.m.DatePicker({
                                    tooltip: "Valid To"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
        return oPermForm;
    },

    fnPermTableClear: function () {
        this.byId("permissionsTable").removeSelections();
    },

    fnAssignmentToolbarActions(sAction) {
        debugger
        switch (sAction) {
            case "add":
                this.fnAssgnTableClear();
                let oData = {
                    "userRole": "",
                    "userName": ""
                };
                this.fnAddAssignmentDialog(oData, 'add');
                break
            case 'edit':
                // let arSelectedContexts = this.byId("assignmentsTable").getSelectedContexts();
                // arSelectedContexts = Array.isArray(arSelectedContexts) ? arSelectedContexts : [];
                // if (arSelectedContexts.length === 0 || arSelectedContexts.length > 1) {
                //     sap.m.MessageToast.show("Select atleast one record");
                // } else {
                //     let oAssignment = arSelectedContexts[0].getObject();
                //     this.fnAddAssignmentsDialog(oAssignment, "edit");
                // }
                this.fnAddAssignmentDialog( "","edit");
                break;
            default:
        }
    },

    fnAddAssignmentDialog(oObj, sAction) {
        debugger
        let oController = this;
        // let oModel = this.getOwnerComponent().getModel("userModel");
        // let oRecordModel = new sap.ui.model.json.JSONModel({
        //     record: JSON.parse(JSON.stringify(oObj))
        // });
        let sTitle = (sAction === "add") ? "Add Assignment" :
            "Edit Assignment";
        let oForm = this.fnAssignmentForm(sAction);
        let oDialog = new sap.m.Dialog({
            contentWidth: "50%",
            title: sTitle,
            content: [oForm],
            beginButton: new sap.m.Button({
                text: "Update",
                tooltip: "Update",
                press: (oEvt) => {
                    oDialog.destroy();
                }
            }),
            endButton: new sap.m.Button({
                text: "Cancel",
                tooltip: "Cancel",
                press: function (oEvt) {
                    if (sAction === "edit") {
                        oController.fnAssgnTableClear();
                    }
                    oDialog.destroy();
                }
            })
        });
        // oDialog.setModel(oRecordModel, "userRecordModel");
        oDialog.open();

    },

    fnAssignmentForm(sAction) {
        let oAssgnForm = new sap.ui.layout.form.Form({
            layout: new sap.ui.layout.form.ResponsiveGridLayout({
                labelSpanL: 4,
                labelSpanM: 4,
                labelSpanS: 12,
                emptySpanL: 0,
                emptySpanM: 0,
                emptySpanS: 0,
                columnsL: 2,
                columnsM: 2,
                breakpointL: 1024,
                breakpointM: 600
            }),
            editable: true,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    layoutData: new sap.ui.layout.GridData({
                        spanL: 6,
                        spanM: 6,
                        spanS: 12
                    }),
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "User Role",
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showValueHelp: true
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "User Name",
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showValueHelp: true
                                })
                            ]
                        })
                    ]
                })
            ]
        });
        return oAssgnForm;
    },

    fnAssgnTableClear: function () {
        this.byId("assignmentsTable").removeSelections();
    },
});