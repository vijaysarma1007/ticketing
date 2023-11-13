import { Publisher, Subjects, TicketCreatedEvent } from "@vjtickets/commoncode";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
