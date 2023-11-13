import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@vjtickets/commoncode";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
