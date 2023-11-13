import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@vjtickets/commoncode";
export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
