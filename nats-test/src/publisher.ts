import nats from "node-nats-streaming";
import { TicketCreatedPubsliher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");
  const publisher = new TicketCreatedPubsliher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 23,
    });
  } catch (error) {
    console.log(error);
  }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // });

  // stan.publish("ticket:created", data, () => {
  //   //?callback function
  //   console.log("Event Published");
  // });
});
