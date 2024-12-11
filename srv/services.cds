using { sap.capire.incidents as my } from '../db/schema';

/**
 * Service used by support personell, i.e. the incidents' 'processors'.
 */
service ProcessorService { 
    entity Incidents as projection on my.Incidents;

    @readonly
    entity Customers as projection on my.Customers;
}

annotate ProcessorService.Incidents with @odata.draft.enabled; 
annotate ProcessorService with @(requires: 'support');

annotate ProcessorService.Incidents with @changelog: {
  keys: [ customer.name, createdAt ]
} {
  title    @changelog;
  status   @changelog;
  customer @changelog: [ customer.name ];
};

annotate ProcessorService.Incidents.conversation with @changelog: {
  keys: [ author, timestamp ]
} {
  message  @changelog;
}

/**
 * Service used by administrators to manage customers and incidents.
 */
service AdminService {
    entity Customers as projection on my.Customers;
    entity Incidents as projection on my.Incidents;
    }

annotate AdminService with @(requires: 'admin');

