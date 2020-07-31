({
    doInit : function(component, event, helper) {
        // component.set("v.isModalOpen", true);

    },
    openModel: function(component, event, helper) {
       // Set isModalOpen attribute to true
       component.set("v.isModalOpen", true);
    },
   
    closeModel: function(component, event, helper) {
       // Set isModalOpen attribute to false  
       component.set("v.isModalOpen", false);
    },

   
    onSave: function(component, event, helper) {
    // var newcon = component.get("v.Customer");
    // var Products = component.get("v.Products");
    // console.log("Products: "+Products[0].Id);
    var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
        // Displays error messages for invalid fields
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get('v.validity').valid;
    }, true);
    // If we pass error checking, do some real work
    if(validExpense){

       // console.log(JSON.stringify(component.get("v.newCustomer")));
        var newCustomer = component.get("v.Customer");
        var Products = component.get("v.Products");
        var total = component.get("v.total");
        
        var action = component.get("c.createOrder");
        action.setParams({
            "user": newCustomer,
            "products" : Products,
            "total" : total
        });
   
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               
               component.set('v.Customer',  response.getReturnValue());
                // console.log('newCustomer.Id:  ',newCustomer.Id__c);
               console.log( 'create user '+JSON.stringify(response.getReturnValue()));
            //    console.log( 'SUCCESS');
                
                var evt = $A.get("e.force:navigateToComponent");
                evt.setParams({
                    componentDef : "c:checkout",
                    componentAttributes: {
                        Products : component.get("v.Products"),
                        Customer : response.getReturnValue(),
                        total : component.get("v.total"),
                        // Order : response.getReturnValue()
                        // selecttab : false
                    }
                });
                // component.getEvent('CustomAdded').fire();
                evt.fire();
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action); 
    }
        
    },

 })
