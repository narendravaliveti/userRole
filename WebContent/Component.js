sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
],function(UIComponent, JSONModel, ResourceModel) {
   return UIComponent.extend("usrole.Component",{
       metadata: {
           manifest: "json"
       },
       init() {
           UIComponent.prototype.init.apply(this,arguments);
           this.getRouter().initialize();
           var oModel = new JSONModel("model/model.json");
           this.setModel(oModel,"userModel");
       }
   });
});