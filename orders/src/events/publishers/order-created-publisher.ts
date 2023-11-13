import { Publisher, OrderCreatedEvent, Subjects } from "@vjtickets/commoncode";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
