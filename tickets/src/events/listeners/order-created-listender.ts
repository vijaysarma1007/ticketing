import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@vjtickets/commoncode";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publisher/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //! Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //! if no ticket , throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    //! Mark the ticket has been reserved by setting its orderId Property
    ticket.set({ orderId: data.id });

    //! save the ticket
    await ticket.save();

    //! emit the event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    //! ack the message
    msg.ack();
  }
}
