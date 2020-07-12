({
    doInit : function(component, event, helper) {
        var action = component.get("c.getProduct");       
        action.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){
                component.set("v.Products",response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        
    },
    forward : function(component, event, helper) {
        var start = component.find('product').get("v.start"); 
        var end = component.find('product').get("v.end"); 
        // var product = component.get("v.Products"); 
        // console.log("start: " + product.lenght);
        start=start+8;
        end=end+8;
        console.log("start: " + start);
        component.find('product').set("v.start",start);
        component.find('product').set("v.end",end);
        let button = component.find('forward');
        button.set('v.disabled',true);   
        let button2 = component.find('back');
        button2.set('v.disabled',false);   
    },
    back : function(component, event, helper) {
        var start = component.find('product').get("v.start"); 
        var end = component.find('product').get("v.end"); 
        // var product = component.get("v.Products"); 
        // console.log("start: " + product.lenght);
        start=start-8;
        end=end-8;
        console.log("start: " + start);
        component.find('product').set("v.start",start);
        component.find('product').set("v.end",end);
        let button = component.find('back');
        button.set('v.disabled',true);   
        let button2 = component.find('forward');
        button2.set('v.disabled',false);   
    },
})
