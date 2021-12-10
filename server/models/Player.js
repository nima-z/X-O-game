export default function Player({ playerId, nickname, action, isTurn, wins }) {
  return {
    playerId: playerId,
    nickname: nickname ? nickname : null,
    action: action ? action : null,
    isTurn: isTurn ? isTurn : null,
    rematchRequest: false,
    wins: wins ? wins : 0,
  };
}
