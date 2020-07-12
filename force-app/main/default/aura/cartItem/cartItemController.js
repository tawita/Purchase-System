({
    add : function (component) {
        var a = component.get("v.Product.Quantity__c");
        var nq = component.get("v.Product.orderQt"); 
        var price = component.get("v.Product.Price__c"); 
        var total = component.get("v.Product.Total__c"); 
        // console.log("a: " +a);
        // console.log("nq: " +nq);
        if(nq<a){
            nq++;
            component.set('v.Product.orderQt', nq);
            total = nq*price;
            component.set('v.Product.Total__c', total);
            var add = component.getEvent("add");
            add.setParams({
                "add":price
            });
            add.fire();
        }
        // console.log("nq: " +nq);
        
        // console.log("Product: " +Product);

        
    },
    dash : function (component) {
        // var a = component.get("v.Product.Quantity__c"); 
        var nq = component.get("v.Product.orderQt"); 
        var total = component.get("v.Product.Total__c"); 
        var price = component.get("v.Product.Price__c"); 
        if(nq>1){
            nq--;
            component.set('v.Product.orderQt', nq);
            total = nq*price;
            component.set('v.total', price);
            component.set('v.Product.Total__c', total);
            var dash = component.getEvent("dash");
            dash.setParams({
                "dash":price
            });
            dash.fire();
            }

    },
    clear : function (component) {
        var a = component.get("v.Product"); 
        // component.set('v.Product', nq);
        var clear = component.getEvent("clear");
        clear.setParams({
                "clear":a
        });
        clear.fire();
    },
})
