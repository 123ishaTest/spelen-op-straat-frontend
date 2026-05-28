import type { Direction } from '$lib/model/Direction.ts';

export type ClientRequest = ChangeDirectionRequest | SetNameRequest | HeartbeatRequest;

interface BaseRequest {
  type: string;
}

export interface ChangeDirectionRequest extends BaseRequest {
  type: 'change-direction';
  direction: Direction;
}

export interface SetNameRequest extends BaseRequest {
  type: 'set-name';
  name: string;
}

export interface HeartbeatRequest extends BaseRequest {
  type: 'heartbeat';
}
