trigger sendEmail on Order (after update) {
    // System.debug('test');
    System.debug(trigger.new);
    for(Order o : trigger.new){
        if(o.Status=='Activated'){
            System.debug('test');
            Order order = [SELECT Id,EffectiveDate,TotalAmount,Status,OwnerId FROM Order WHERE Id =: o.Id];
            System.debug(order);

            Customer__c customer = [SELECT Name,Email__c,Phone__c,TotalAmount__c,Address__c FROM Customer__c WHERE Id =: o.Customer__c];
            System.debug(customer);

            User User = [SELECT Email FROM User WHERE Id =: o.OwnerId];
            System.debug(User);

            List<OrderItem> orderItem = [SELECT TotalPrice,UnitPrice,Quantity,Product__r.Name FROM OrderItem WHERE OrderId =: o.Id];
            System.debug(orderItem[0].Product__c);

            String orderProduct='';
            
            for(OrderItem oi : orderItem){
                List<Product__c> product = [SELECT Name FROM Product__c WHERE Id =: oi.Product__c];
                System.debug(product);
                for(Product__c p : product){
                        orderProduct += '- '+p.Name+'<br/>';
                        orderProduct += 'Unit Price: '+oi.UnitPrice.format()+'<br/>';
                        orderProduct += 'Quantity: '+oi.Quantity.intvalue()+'<br/>';
                        orderProduct += 'Total Price: '+oi.TotalPrice.format()+'<br/>';
                }
            }
            
            System.debug(orderProduct);
            String dateStr = order.EffectiveDate.year() + '/' + order.EffectiveDate.month() + '/' + order.EffectiveDate.day();
            String currentUserEmail = User.Email;

            //Customer
                String address = customer.Email__c;
                String[] ccAddresses = new String[] {currentUserEmail};
                String subject = 'Your Invoice';
                String message = 'Dear ' + customer.Name +
                    '<br/> Phone: ' + customer.Phone__c + 
                    '<br/> Address: ' + customer.Address__c +'<br/>'+

                    'Your order: <br/>' + 
                    orderProduct + 
                    '<br/> TotalAmount: ' + order.TotalAmount.format() +
                    '<br/> Order Date: '+ dateStr +'<br/>'+

                    '<br/> Thank You';
                    dataProduct.processEmail(address,ccAddresses, subject, message);

            //     //User
            //     address = User.Email;
            //     subject = customer.Name +' Invoice';
            //     message = 'Dear ' + customer.Name +
            //         '<br/> Phone: ' + customer.Phone__c + 
            //         '<br/> Address: ' + customer.Address__c +'<br/>'+

            //         'Your order: <br/>' + 
            //         orderProduct + 
            //         '<br/> TotalAmount: ' + order.TotalAmount.format() +
            //         '<br/> Order Date: '+ dateStr +'<br/>'+

            //         '<br/> Thank You';
            //         dataProduct.processEmail(address, subject, message);
            
        }
    }
    // dataProduct.processEmail(trigger.new);
}