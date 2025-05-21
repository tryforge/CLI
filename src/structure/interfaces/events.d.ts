/**
 * Interface representing an event object.
 */
export interface IEvent {
  /**
   * The name of the event.
   */
  name: string;

  /**
   * Indicates the version of BotForge when the event was introduced or last updated.
   */
  version: string;

  /**
   * A description of the event's purpose and functionality.
   */
  description: string;

  /**
   * The intents associated with the event.
   */
  intents: string[];
}