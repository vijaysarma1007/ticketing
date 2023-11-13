import { Publisher, Subjects, TicketUpdatedEvent } from "@vjtickets/commoncode";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
