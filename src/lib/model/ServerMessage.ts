export type ServerMessage = CharacterCreatedMessage;

interface BaseMessage {
  type: string;
}
export interface CharacterCreatedMessage extends BaseMessage {
  type: 'character-created';
  color: string;
}
