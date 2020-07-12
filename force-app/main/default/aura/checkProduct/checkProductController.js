({
    doInit : function(component, event, helper) {
        var p = component.get("v.Product.Picture__c");  
        var np;
        //console.log("Product: " +p);
        np = p.replace('<img', '<img style="height: 90px;width: 90px;border: 1px solid #ccc;"');
        component.set("v.Product.Picture__c",np);  
        
    },
})
