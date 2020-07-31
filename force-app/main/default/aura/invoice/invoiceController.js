({
    doInit : function(component, event, helper) {
        
        
    },
    getTotalQt : function(component, event, helper) {
        var getTotalQt = event.getParam('getTotalQt');
        var np = component.get("v.Products");  
        var total = component.get("v.total");  
        var found = np.find(element => element.Name == getTotalQt.Name);
        // console.log("found: "  +JSON.stringify(found));

        if(!found){
            getTotalQt.orderQt=1;
            getTotalQt.Total__c=getTotalQt.Price__c;
            total+=getTotalQt.Price__c;
            // console.log("getTotalQt: " , total);
            np.push(getTotalQt); 
            // console.log("np: "  +JSON.stringify(np));
            component.set("v.Products",np);
            component.set("v.total",total);
        }     
    },
    clear : function(component, event, helper) {
        var clear = event.getParam('clear');
        var np = component.get("v.Products");  
        var total = component.get("v.total");  
        // console.log("np: "  +JSON.stringify(np));
        // console.log("clear: "  +JSON.stringify(clear));
        // var found = np.find(element => element.Name == clear.Name);
        for(var i=0;i< np.length;i++){
            if(np[i].Name==clear.Name){
                np.splice(i, 1);
                console.log("np: "  +JSON.stringify(np));
                total = total-clear.Total__c;
                component.set("v.Products",np);
                component.set("v.total",total);
            }
        }
        
    },

    CustomAdded : function(component, event, helper) {
        // component.set('v.selecttab', false); 
        
      },

    doConfirm: function(component, event, helper) {
        // var data = component.get("v.Products"); 
        // console.log("data: "  +JSON.stringify(data));
        // var data=event.getParam('boat');
        // component.set("v.id", data[0].Id);
        // console.log("data received in boatdetails"+JSON.stringify(data));
        // component.find("service").reloadRecord();
        component.set("v.isModalOpen", true);
     },
     add: function(component, event, helper) {
        var add = event.getParam('add');
        var total = component.get("v.total"); 
        // console.log("total: "  +total);
        total = total+add; 
        component.set("v.total", total);
     },
     dash: function(component, event, helper) {
        var dash = event.getParam('dash');
        var total = component.get("v.total"); 
        total = total-dash; 
        component.set("v.total", total);
     },
     onRecordUpdated :function(component, event, helper){
        component.find("service").reloadRecord();  
    },
})
