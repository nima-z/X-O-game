export default function Player({
  id,
  nickname,
  action,
  isTurn,
  wins,
  rematchRequest,
}) {
  return {
    id: id,
    nickname: nickname || "anonymous",
    action: action ? action : null,
    isTurn: isTurn ? isTurn : null,
    rematchRequest: rematchRequest || false,
    wins: wins || 0,
  };
}

export function ClientPlayer(p) {
  return {
    id: p.id,
    nickname: p.nickname,
    action: p.action,
    isTurn: p.isTurn,
    wins: p.wins,
  };
}
