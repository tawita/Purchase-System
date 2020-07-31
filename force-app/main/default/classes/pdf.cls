public Class pdf {
    
    public String userId {get;set;}
    public String Total {get;set;}
    // public String orderQt {get;set;}
    public Customer__c user {get;set;}
 
    public pdf() {
        userId = System.currentPageReference().getParameters().get('User');
        user = [SELECT 	FirstName__c,LastName__c,Phone__c ,Email__c,Address__c FROM Customer__c WHERE Id=:userId];
        System.debug(user);

    }

    public list<Order__c> getOrders() {
        userId = System.currentPageReference().getParameters().get('User');
        Total = System.currentPageReference().getParameters().get('Total');
        List<Order__c>  orders = [SELECT Product__r.Name,Product__r.Price__c,Product__r.Quantity__c FROM Order__c 
        WHERE Customer__c=:userId];
        // List<Order__c>  orders = [SELECT Name FROM Order__c ];
        System.debug(orders);  
        return  orders;    
        
    }

}

