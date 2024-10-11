import axios from "axios";

axios.defaults.baseURL = "http://localhost:6500/api/";

const authHeaders = () => ({
  "x-auth-token": localStorage.getItem("token") ?? "",
});


// new Promise((resolve, reject) => {
//   // setTimeout(() => {
//   resolve({
//     data: {
//       data: {
//         _id: "66031aef28a50240b9dcfa30",
//         query:
//           "Give me an architecture of a basic webapp in nginx and processing request using client server. It also has chatting using sockets",
//         current_status: "COMPLETED",
//         user: "660172995d1e1bb4d177adc0",
//         createdAt: "2024-03-26T18:58:55.798Z",
//         updatedAt: "2024-03-26T19:00:05.940Z",
//         __v: 0,
//         code: 'from diagrams import Diagram\nfrom diagrams.onprem.network import Nginx\nfrom diagrams.onprem.compute import Server\nfrom diagrams.onprem.inmemory import Redis\nfrom diagrams.onprem.client import User\nfrom diagrams.onprem.database import PostgreSQL\n\nwith Diagram("Basic Webapp Architecture", outformat="dot", filename="/tmp/dKxLJ9yQRh2Bm8Tv", show="false"):\n    user = User("Client")\n    nginx = Nginx("Nginx Web Server")\n    app_server = Server("Application Server")\n    chat_server = Redis("WebSocket Chat Server")\n    db = PostgreSQL("Database")\n\n    user >> nginx >> app_server >> db\n    user >> chat_server',
//         dot_file_contents:
//           'digraph "Basic Webapp Architecture" {\n\tgraph [bb="0,0,565.2,340.55",\n\t\tfontcolor="#2D3436",\n\t\tfontname="Sans-Serif",\n\t\tfontsize=15,\n\t\tlabel="Basic Webapp Architecture",\n\t\tlheight=0.22,\n\t\tlp="282.6,11.875",\n\t\tlwidth=2.50,\n\t\tnodesep=0.60,\n\t\tpad=2.0,\n\t\trankdir=LR,\n\t\tranksep=0.75,\n\t\tsplines=ortho\n\t];\n\tnode [fixedsize=true,\n\t\tfontcolor="#2D3436",\n\t\tfontname="Sans-Serif",\n\t\tfontsize=13,\n\t\theight=1.4,\n\t\timagescale=true,\n\t\tlabel="\\N",\n\t\tlabelloc=b,\n\t\tshape=box,\n\t\tstyle=rounded,\n\t\twidth=1.4\n\t];\n\tedge [color="#7B8894"];\n\t"1706b85712894c06bab064e01e1f9ecb"\t[height=1.9,\n\t\timage="/opt/homebrew/lib/python3.11/site-packages/resources/onprem/client/user.png",\n\t\tlabel=Client,\n\t\tpos="50.4,182.15",\n\t\tshape=none];\n\tecc7d89348ee4150ba2ed5dc7065e00f\t[height=1.9,\n\t\timage="/opt/homebrew/lib/python3.11/site-packages/resources/onprem/network/nginx.png",\n\t\tlabel="Nginx Web Server",\n\t\tpos="205.2,272.15",\n\t\tshape=none];\n\t"1706b85712894c06bab064e01e1f9ecb" -> ecc7d89348ee4150ba2ed5dc7065e00f\t[dir=forward,\n\t\tfontcolor="#2D3436",\n\t\tfontname="Sans-Serif",\n\t\tfontsize=13,\n\t\tpos="e,154.93,227.15 100.66,227.15 100.66,227.15 143.41,227.15 143.41,227.15"];\n\t"0208523c449445c8baed6aa801d06165"\t[height=1.9,\n\t\timage="/opt/homebrew/lib/python3.11/site-packages/resources/onprem/inmemory/redis.png",\n\t\tlabel="WebSocket Chat Server",\n\t\tpos="205.2,92.15",\n\t\tshape=none];\n\t"1706b85712894c06bab064e01e1f9ecb" -> "0208523c449445c8baed6aa801d06165"\t[dir=forward,\n\t\tfontcolor="#2D3436",\n\t\tfontname="Sans-Serif",\n\t\tfontsize=13,\n\t\tpos="e,154.93,137.15 100.66,137.15 100.66,137.15 143.41,137.15 143.41,137.15"];\n\t"8bbfa86aad16477883857b755ce4029d"\t[height=1.9,\n\t\timage="/opt/homebrew/lib/python3.11/site-packages/resources/onprem/compute/server.png",\n\t\tlabel="Application Server",\n\t\tpos="360,272.15",\n\t\tshape=none];\n\tecc7d89348ee4150ba2ed5dc7065e00f -> "8bbfa86aad16477883857b755ce4029d"\t[dir=forward,\n\t\tfontcolor="#2D3436",\n\t\tfontname="Sans-Serif",\n\t\tfontsize=13,\n\t\tpos="e,309.73,272.15 255.46,272.15 255.46,272.15 298.21,272.15 298.21,272.15"];\n\te96201128927435a86b0ccdafb20120d\t[height=1.9,\n\t\timage="/opt/homebrew/lib/python3.11/site-packages/resources/onprem/database/postgresql.png",\n\t\tlabel=Database,\n\t\tpos="514.8,272.15",\n\t\tshape=none];\n\t"8bbfa86aad16477883857b755ce4029d" -> e96201128927435a86b0ccdafb20120d\t[dir=forward,\n\t\tfontcolor="#2D3436",\n\t\tfontname="Sans-Serif",\n\t\tfontsize=13,\n\t\tpos="e,464.53,272.15 410.26,272.15 410.26,272.15 453.01,272.15 453.01,272.15"];\n}\n',
//         key_components:
//           "1. Nginx - A web server used to handle HTTP requests and serve static content.\n2. Application Server - Executes business logic, handles requests processed by Nginx.\n3. WebSocket Server - Allows for bidirectional communication between the client and server for chat functionality.\n4. Database - For storing user data, messages, and any other persistent information required by the application.\n5. Load Balancer (optional) - For distributing incoming requests to multiple application servers to balance load and ensure high availability.",
//         next_steps:
//           "While the current architecture provides a solid foundation for a basic web application with real-time chatting functionality, several aspects can be further refined or require additional research for specific use cases. These include: 1. Adding a Content Delivery Network (CDN) for faster static content delivery. 2. Implementing a more detailed security analysis, especially around the WebSocket communication. 3. Considering the deployment of application servers and databases in containers or orchestrators like Kubernetes for better scalability and management. 4. Exploring different database options based on the requirements (e.g., NoSQL vs. SQL). 5. Integrating monitoring and logging solutions for better insight into application performance and to facilitate debugging issues.",
//         summary:
//           "The architecture for a basic web application that features Nginx for web serving, processes requests using a client-server model, and includes chatting functionality via sockets involves a few primary components. The web server component (Nginx) handles incoming HTTP requests, serving static content, and directing other requests to appropriate application servers. The application server component processes these requests, which may involve querying a database or other storage service to retrieve or update data. Lastly, for realtime chatting functionality, WebSocket protocol is used to establish a persistent, bidirectional communication channel between the client's browser and the server.",
//       },
//       success: true,
//       msg: "something",
//     },
//   });
//   // }, 5000);
// });

export const pollOutputService = (id) =>
  axios.get(`/conversation/${id}`, {
    headers: authHeaders(),
  });
