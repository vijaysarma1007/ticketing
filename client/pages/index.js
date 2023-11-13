import Link from "next/link";

//note -> Below is the client side rendering component which loads up initially whenever this page url is called, which is "/".
const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketsId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

//!note -> Below is function which is next js specific , this function is used to fetch the initial data from the server side. Since, it is function we cannot use useRequest hook . Hooks can only be callled or used inside a React component.

//? .getInitialProps is NextJs Specific

//!-> .getInitalProps is executed on the SERVER side when we hard refresh the page, click link from different domain, typing URL into address bar

//!-> .getInitalProps is executed on the CLIENT side when navigating from one page to another while in the app

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };

  //  else {
  //   //! Client side rendering
  //   const { data } = await axios.get("/api/users/currentuser");
  //   return data;
  // }
  // console.log("Executed!");

  //* Data fetched from the server side can be transffered so client side rendering component via prop, in this case color object is returned which is recieved as a prop in LandingPage component.

  // };
};
export default LandingPage;
