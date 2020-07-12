public Class pdf {
    
    public String userId {get;set;}
    public Customer__c user {get;set;}
 
    public pdf() {
        String userId = System.currentPageReference().getParameters().get('User');
        user = [SELECT 	FirstName__c,LastName__c,Phone__c ,Email__c,Address__c FROM Customer__c WHERE Id__c=:userId];
        System.debug(user);

    }

    public list<Order__c> getOrders() {
        String userId = System.currentPageReference().getParameters().get('User');
        List<Order__c>  orders = [SELECT Name,Product__r.Name,Product__r.Price__c,Product__r.Quantity__c FROM Order__c 
        WHERE Customer__c=:userId];
        System.debug(orders);  
        return  orders;    
        
    }

}

