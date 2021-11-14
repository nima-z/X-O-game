export default function Player({ playerId, nickname, action, isTurn }) {
  return {
    playerId: playerId,
    nickname: nickname ? nickname : null,
    action: action ? action : null,
    isTurn: isTurn ? isTurn : null,
  };
}
