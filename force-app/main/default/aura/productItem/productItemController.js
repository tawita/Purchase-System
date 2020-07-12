({
    doInit : function(component, event, helper) {
        var p = component.get("v.Product.Picture__c");  
        var np;
        //console.log("Product: " +p);
        np = p.replace('<img', '<img style="height: 250px;width: 250px;border: 1px solid #ccc;"');
        component.set("v.Product.Picture__c",np);  
        
    },
    cart : function (component) {
        // console.log("ddddddd: ");
        component.set('v.selected', !component.get('v.selected'));
        var p = component.get("v.Product");  
        // console.log("ddddddd: "+JSON.stringify(p));
        var getTotalQt = component.getEvent("getTotalQt");
        
        getTotalQt.setParams({
                "getTotalQt":p
        });
        getTotalQt.fire();
        // component.find('Cart').set('v.disabled', true);
        // component.set('v.getClear', false);
        // console.log("toCart: " +JSON.stringify(p));
    },
    
})
