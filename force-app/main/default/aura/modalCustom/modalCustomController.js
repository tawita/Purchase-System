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
        var newOrderlist = component.get("v.Orderlist");

        //  console.log('newProductList'+JSON.stringify(newOrderlist));
        // console.log('newCustomer'+JSON.stringify(newCustomer));
        

        newCustomer.Name=newCustomer.FirstName;
        //helper.createCustomer(component, newCustomer,newOrderlist);
        // console.log('TestOrderlist' + JSON.stringify(newOrderlist));

        var action = component.get("c.createOrder");
        action.setParams({
            "product" : Products,
            "user": newCustomer,
            "Order" : newOrderlist
        });
   
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               
                component.set('v.newCustomer',  response.getReturnValue());
                // console.log('newCustomer.Id:  ',newCustomer.Id__c);
               console.log( 'gggggg '+JSON.stringify(response.getReturnValue()));
                console.log( 'SUCCESS');
                
                var evt = $A.get("e.force:navigateToComponent");
                evt.setParams({
                    componentDef : "c:checkout",
                    componentAttributes: {
                        Customer : response.getReturnValue(),
                        Products : component.get("v.Products"),
                        user :  component.get("v.newCustomer"),
                        total : component.get("v.total")
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

    onRecordUpdated: function(component, event, helper){
       
    },

 })
