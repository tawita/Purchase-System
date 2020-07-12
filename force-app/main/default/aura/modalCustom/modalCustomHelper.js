({
    onInit: function(component) {
        // component.find("service").getNewRecord(
        //     "Customer__c", // sObject type (entityAPIName)
        //     null,            // recordTypeId
        //     false,           // skip cache?
        //     $A.getCallback( function() {
        //         var rec=component.get("v.simpleboatReview");
        //         var error=component.get("v.recordError");
        //         if(error || (rec === null)) {
        //             console.log("Error initializing record template: " + error);
        //         }
        //         else { 
        //             // component.set("v.Customer.Product__c", component.get("v.Products[0].Id"));
        //             var newcon = component.get("v.Customer");
        //             console.log("newcon  "+JSON.stringify(newcon)); 
        //             newcon.Product__c = component.get("v.Products[0].Id")
        //             var action = component.get("c.save");
        //                 action.setParams({ 
        //                 "con": newcon
        //             });
        //             action.setCallback(this, function(response) {
        //                 var state = response.getState();
        //                 if (state === "SUCCESS") {
        //                     var name = response.getReturnValue();
        //                     component.set("v.Customer",name);
        //                     console.log("ttttttttttt"+JSON.stringify(name)); 
        //                     alert("success");
        //                 }
        //                 else if (state === "ERROR")
        //                 {
        //                     alert("Failed");
        //                     console.log("xxxxxxx"); 
        //                 }
        //             });$A.enqueueAction(action);
        //             console.log("Record template initialized1: " + component.get("v.Products[0].Id"));
        //             console.log("Record template initialized2: " + rec.apiName);
        //         }
        //     })
        // );
    } 
})
