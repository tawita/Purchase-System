({
    viewPDF : function(component, event, helper) {
        var Products = component.get("v.Products");
        var total = component.get("v.total");
        var user = component.get("v.Customer");
        var orderQt = Products.orderQt;
        // console.log(JSON.stringify(productList));
        console.log("user:    ",JSON.stringify(user));
        
        console.log('gotoVF',user.Id);
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": 'https://creative-badger-f00soo-dev-ed--c.visualforce.com/apex/viewPdf?User='+user.Id+'&Total='+total+'&orderQt='+orderQt
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

    Send : function(component, event, helper) {
        var Order = component.get("v.Order");
        // Order.Status = "Activated"; 
        // var Customer = component.get("v.Customer");
        console.log('Order in send mail    '+ JSON.stringify(Order));

        var action = component.get("c.updateOrder"); 
        action.setParams({
            "order": Order,
        });      
        action.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){
                // component.set("v.Order",response.getReturnValue());
                console.log('SUCCESS    ');
                alert('Email Send Successfully!');
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);


        // console.log('Customer     '+ JSON.stringify(Customer));
        // var orderPName=[] ;
        // // var order=[];
        // for(var i=0;i<Order.OrderItems.length;i++){
        //     orderPName.push(Order.OrderItems[i].Product__r.Name);
        //     var orderqt = Order.OrderItems[i].Quantity;
        //     orderqt = "Quantity: "+orderqt;
        //     orderPName.push(orderqt);
        //     var ordertp = Order.OrderItems[i].TotalPrice;
        //     ordertp = "Total Price: "+ordertp;
        //     orderPName.push(ordertp);
        // }
        // console.log('Enter Here orderPName:  '+ JSON.stringify(orderPName));
        // // var email= "tawita135@gmail.com";
        // var email= Order.Customer__r.Email__c;
        // var Subject= "ํYour Invoice";
        // var Message= "Dear "+Order.Customer__r.Name+ 
        //             "<br/> Phone: "+Order.Customer__r.Phone__c+
        //             "<br/> Address: "+Order.Customer__r.Address__c+"<br/>"+
        //             // "<br/> TotalAmount: "+Order.Customer__r.TotalAmount__c+"<br/>"+
        //             "<br/> Your order: "+
        //             "<br/> "+JSON.stringify(orderPName)+"<br/>"+
        //             "<br/> Grand total: "+Order.Customer__r.TotalAmount__c+
        //             "<br/> Order Date: "+Order.EffectiveDate;

        // console.log('Enter Here');
        // var action=component.get("c.processEmail");
        // action.setParams({
        //     email:email,
        //     Subject:Subject,
        //     Message:Message
        // })
        // action.setCallback(this,function(e){
        //     if(e.getState()=='SUCCESS'){
        //         var result=e.getReturnValue();
        //         // console.log('Enter Here2');
        //         if(result=='Success'){
        //             alert('Email Send Successfully!');
        //         }
        //         else{
        //             alert(result);
        //         }
        //     }
        //     else{
        //         alert(JSON.stringify(e.getError()));
        //     }
        // });
        // $A.enqueueAction(action);
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
        var Order = component.get("v.Order");
        var Customer = component.get("v.Customer");

        console.log('checkout ');
        // console.log('Order    '+ JSON.stringify(Order));
        console.log('Customer    '+ JSON.stringify(Customer));

        var action = component.get("c.getOrder"); 
        action.setParams({
            "Customer": Customer,
        });      
        action.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){
                component.set("v.Order",response.getReturnValue());
                console.log('Order    '+ JSON.stringify(response.getReturnValue()));
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);

        for(var i=0;i<Products.length;i++){
            amount += Products[i].orderQt;
        }
        component.set("v.amount",amount);
    }
    
})
