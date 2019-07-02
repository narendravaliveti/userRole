sap.ui.controller("usrole.controller.userRoleStart", {

    fnUserRoleList(sIdx, oContext) {
        let sPath = oContext.getPath();
        return new sap.m.ObjectListItem({
            type: sap.m.ListType.Active,
            title: "{userModel>" + sPath + "/usrole}",
            number: "{userModel>" + sPath + "/count}",
            attributes: [
                new sap.m.ObjectAttribute({
                    text: "{userModel>" + sPath + "/descr}"
                })
            ],
            firstStatus: [
                new sap.m.ObjectStatus({
                    text: "{userModel>" + sPath + "/erdat}"
                })
            ]
        });
    },

    fnUsRoleTitle(sUsRole) {
        if(sUsRole) {
            return "UserRole:"+sUsRole;
        }else {
            return "UserRole";
        }
    },

    fnUsRoleSelect(oEvent) {
        this.getSplitAppObj().toDetail(this.createId("treeTablePage"));
        let oModel = this.getOwnerComponent().getModel("userModel");
        let arSctx = oEvent.getSource().getSelectedContexts();
        oModel.setProperty("/selectedUserRole",arSctx[0].getObject());
        debugger
    },

    fnReadUserRole() {
        debugger
        let oModel = this.getOwnerComponent().getModel("userModel");
        let oData = oModel.getProperty("/selectedUserRole");
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("userRoleDetail",{usrole: oData["usrole"]});
    },

    getSplitAppObj() {
        return this.byId("splitApp");
    }

});