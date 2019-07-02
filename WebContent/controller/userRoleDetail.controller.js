sap.ui.controller("usrole.controller.userRoleDetail", {

    fnHdrPnlExpand(oEvent) {
        if (oEvent.getSource().getExpanded() === false) {
            this.byId("headerPanelTitle").bindProperty("text", "userModel>/userDocData/usrole/usrole");
            this.byId("headerPanelTitle1").bindProperty("text", "userModel>/userDocData/usrole/descr");
        } else {
            this.byId("headerPanelTitle").unbindProperty("text");
            this.byId("headerPanelTitle").setText("User Role Info");
            this.byId("headerPanelTitle1").unbindProperty("text");
        }
    },

    fnCreateUserTableCols(sIdx, oContext) {
        return new sap.m.Column({
            hAlign: sap.ui.core.TextAlign.Center,
            header: new sap.m.Title({
                text: oContext.getObject()["label"]
            })
        });
    },

    fnCreateUserTableItems(sIdx, oContext) {
        debugger
        return new sap.m.ColumnListItem({
            type: sap.m.ListType.Navigation,
            press: [this.fnUserSelect,this],
            cells: [
                new sap.m.Label({
                    text: "{userModel>userName}"
                }),
                new sap.m.Label({
                    text: "{userModel>userFName}"
                }),
                new sap.m.Label({
                    text: "{userModel>asstName}"
                }),
                new sap.m.Label({
                    text: "{userModel>asstFName}"
                }),
                new sap.m.Label({
                    text: "{userModel>asstRole}"
                }),
                new sap.m.Label({
                    text: "{userModel>validFrom}"
                }),
                new sap.m.Label({
                    text: "{userModel>validTo}"
                })
            ]
        })
    },

    fnUserSelect(oEvent) {
        debugger
        let oModel = this.getOwnerComponent().getModel("userModel"),
            sPath = oEvent.getSource().getBindingContext("userModel").getPath(),
            oUser = oModel.getProperty(sPath),
            oRouter = this.getOwnerComponent().getRouter();
        oModel.setProperty("/selectedUser", oUser);
        oRouter.navTo("usersAssgnDetail");
    },

    fnPerformUserToolbarActions(sAction) {
        debugger
        switch (sAction) {
            case "add":
                this.fnUserTableClear();
                let oData = {
                    "userName": "",
                    "userFName": "",
                    "asstUser": "",
                    "asstFName": "",
                    "asstRole": "",
                    "validFrom": "",
                    "validTo": ""
                };
                this.fnCreateUserDialog(oData, 'add');
            case 'edit':
                let arSelectedContexts = this.byId("userTable").getSelectedContexts();
                arSelectedContexts = Array.isArray(arSelectedContexts) ? arSelectedContexts : [];
                if (arSelectedContexts.length === 0 || arSelectedContexts.length > 1) {
                    sap.m.MessageToast.show("Select atleast one record");
                } else {
                    let oUser = arSelectedContexts[0].getObject();
                    this.fnCreateUserDialog(oUser, "edit");
                }
                break;
            default:
        }
    },

    fnCreateUserDialog(oObj, sAction) {
        debugger
        let oController = this;
        let oModel = this.getOwnerComponent().getModel("userModel");
        let oRecordModel = new sap.ui.model.json.JSONModel({
            record: JSON.parse(JSON.stringify(oObj))
        });
        let sTitle = (sAction === "add") ? "Create User" :
            "Edit User" + ":" + oObj["usrnm"];
        let oForm = this.fnCreateUserForm(sAction);
        let oDialog = new sap.m.Dialog({
            contentWidth: "50%",
            title: sTitle,
            content: [oForm],
            beginButton: new sap.m.Button({
                text: "Update",
                tooltip: "Update",
                press: (oEvt) => {
                    let oRecord = oRecordModel.getProperty("/record");
                    if (sAction === "add") {
                        let aUsers = oModel.getProperty("/userDocData/user");
                        aUsers.push(oRecord);
                        oModel.setProperty("/userDocData/user", aUsers);
                    } else if (sAction === "edit") {
                        let arSelectedContexts = oController.byId("userTable").getSelectedContexts();
                        let sPath = arSelectedContexts[0].getPath();
                        oModel.setProperty(sPath, oRecord);
                        oController.fnUserTableClear();
                    }
                    oDialog.destroy();
                }
            }),
            endButton: new sap.m.Button({
                text: "Cancel",
                tooltip: "Cancel",
                press: function (oEvt) {
                    if (sAction === "edit") {
                        oController.fnUserTableClear();
                    }
                    oDialog.destroy();
                }
            })
        });
        oDialog.setModel(oRecordModel, "userRecordModel");
        oDialog.open();

    },

    fnCreateUserForm(sAction) {
        let oUserForm = new sap.ui.layout.form.Form({
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
                            label: 'User Name',
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showValueHelp: true,
                                    enabled: sAction === "add" ? true : false,
                                    maxLength: 12,
                                    value: "{userRecordModel>/record/userName}",
                                    liveChange: (oEvt) => {
                                        let oIp = oEvt.getSource();
                                        oIp.setValue(oIp.getValue().toUpperCase().trim());
                                    }
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Assistant User",
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showValueHelp: true,
                                    maxLength: 12,
                                    value: "{userRecordModel>/record/asstName}",
                                    liveChange: (oEvt) => {
                                        let oIp = oEvt.getSource();
                                        oIp.setValue(oIp.getValue().toUpperCase().trim());
                                    },
                                    enabled: {
                                        parts: ["userRecordModel>/record/asstRole"],
                                        formatter: function (sAstrol) {
                                            return sAstrol ? false : true;
                                        }
                                    }
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Assistant Role",
                            fields: [
                                new sap.m.Input({
                                    type: sap.m.InputType.Text,
                                    showSuggestion: true,
                                    value: "{userRecordModel>/record/asstRole}",
                                    liveChange: (oEvt) => {
                                        let oIp = oEvt.getSource();
                                        oIp.setValue(oIp.getValue().toUpperCase().trim());
                                    },
                                    showValueHelp: true,
                                    maxLength: 10,
                                    enabled: {
                                        parts: ["userRecordModel>/record/asstName"],
                                        formatter: function (sAstusr) {
                                            return sAstusr ? false : true;
                                        }
                                    }
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Valid From",
                            fields: [
                                new sap.m.DatePicker({
                                    tooltip: "Valid From",
                                    value: "{userRecordModel>/record/validFrom}"
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Valid To",
                            fields: [
                                new sap.m.DatePicker({
                                    tooltip: "Valid To",
                                    value: "{userRecordModel>/record/validTo}",
                                })
                            ]
                        })
                    ]
                })
            ]
        });
        return oUserForm;
    },

    fnUserTableClear: function () {
        this.byId("userTable").removeSelections();
    }

});