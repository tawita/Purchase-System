public with sharing class dataProduct {
    @AuraEnabled
    public static list <Product__c> product {get;set;}

    @AuraEnabled
    public static List<Product__c> getProduct() {  
    
        product = [SELECT Id,Name,Id__c,Price__c,Quantity__c,Picture__c,Description__c FROM Product__c ORDER BY Id__c];
        return product;
    }

    @AuraEnabled
    public static Customer__c createOrder(Customer__c user,List<Order__c> Order,List<Product__c> products){
        //System.debug(user);
        user.Name= user.FirstName__c+ ' ' +user.LastName__c;
        insert user;
        for(Order__c o:Order){
            o.Customer__c = user.Id__c;
            for(Product__c p:products){
                o.Product__c = p.Id;
            }  
        }    
        
        insert Order;
        return user;    
    }
}

