({
    viewPDF : function(component, event, helper) {
        var Products = component.get("v.Products");
        // var Custom = component.get("v.Custom");
        var user = component.get("v.Customer");

        // console.log(JSON.stringify(productList));
        console.log("user:    ",JSON.stringify(user));
        
        console.log('gotoVF',user.Id);
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": 'https://creative-badger-f00soo-dev-ed--c.visualforce.com/apex/viewPdf?User='+user.Id
        });
        urlEvent.fire();
    },
    editProduct : function(component, event, helper) {
        var Products = component.get("v.Products");
        var Customer = component.get("v.Customer");
        // var np = Products.Picture__c
        for(var i=0;i<Products.length;i++){
            Products[i].Picture__c = Products[i].Picture__c.replace('<img', '<img style="height: 250px;width: 250px;border: 1px solid #ccc;"');
        }
        // Products.Picture__c = Products.Picture__c.replace('<img', '<img style="height: 250px;width: 250px;border: 1px solid #ccc;"');
        // component.set("v.Product.Picture__c",np); 
        console.log('Products'+ JSON.stringify(Products));
        var evt = $A.get("e.force:navigateToComponent");
        console.log('evt'+evt);
        evt.setParams({
            componentDef: "c:invoice",
            componentAttributes :{ 
                Products : Products,
                Customer : Customer,
                total : component.get("v.total"),
            }
        });
       
        evt.fire();
    },
    cancel : function(component, event, helper) {
        var Products = component.get("v.Products");
        var Customer = component.get("v.Customer");
        // var np = Products.Picture__c
        for(var i=0;i<Products.length;i++){
            Products[i].Picture__c = Products[i].Picture__c.replace('<img', '<img style="height: 250px;width: 250px;border: 1px solid #ccc;"');
        }
        // Products.Picture__c = Products.Picture__c.replace('<img', '<img style="height: 250px;width: 250px;border: 1px solid #ccc;"');
        // component.set("v.Product.Picture__c",np); 
        console.log('Products'+ JSON.stringify(Products));
        var evt = $A.get("e.force:navigateToComponent");
        console.log('evt'+evt);
        evt.setParams({
            componentDef: "c:invoice",
            componentAttributes :{ 
                // Products : Products,
                // Customer : Customer,
                // total : component.get("v.total"),
            }
        });
       
        evt.fire();
    },
    editCustom:function(component,event,helper){
    //     var Customer = component.get("v.Customer");
    //     console.log('Enter Here');
    //     var evt = $A.get("e.force:navigateToComponent");
    //     console.log('evt'+evt);
    //     evt.setParams({
    //         componentDef: "c:modalCustom",
    //         componentAttributes :{ 
    //             // isModalOpen : true,
    //             Customer : Customer,
    //             Products : Products,
    //             total : component.get("v.total")
    //         }
    //     });
       
    // evt.fire();
    },
    doInit:function(component,event,helper){
        var Products = component.get("v.Products");
        var amount = component.get("v.amount");
        for(var i=0;i<Products.length;i++){
            amount += Products[i].orderQt;
        }
        component.set("v.amount",amount);
    }
    
})
