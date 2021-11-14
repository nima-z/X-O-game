import { v4 as uuidv4 } from "uuid";

let connections = {};

export function addConnection(c) {
  const client = Connection({ connection: c });
  connections = { ...connections, [client.id]: client };
  return client.id;
}

function Connection({ id, connection }) {
  return { id: id ? id : uuidv4(), connection: connection };
}

export function broadcast(players, message) {
  Object.keys(players).forEach((id) => {
    const p = connections[id];
    p.connection.send(JSON.stringify(message));
  });
}
