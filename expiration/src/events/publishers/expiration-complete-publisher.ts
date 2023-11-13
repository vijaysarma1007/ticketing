import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@vjtickets/commoncode";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
