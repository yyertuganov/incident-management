using { sap.capire.incidents as my } from '../db/schema';

service ManagerService {
  entity Incidents 
    as projection on my.Incidents {
    key Incidents.ID,
    title,
    customer.ID as customerID,
    customer.firstName || ' ' || customer.lastName as customer: String,
    customer.email as email,
    status.descr as status,
    urgency.code as urgency,
    createdAt,
    count(Incidents.conversation.message) as comments: Integer
    } group by ID, title, customer.ID, customer.firstName, customer.lastName, customer.email, status.descr, urgency.code, createdAt
}