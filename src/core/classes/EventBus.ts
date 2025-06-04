// Node.js built-ins.
import { EventEmitter } from 'node:events';

/**
 * An interface defining how the EventBus is structured.
 */
interface EventBusScheme {
  /**
   * Registers an event handler for the specified event.
   *
   * @typeParam T - The type of the payload expected by the event handler.
   * @param event - The name of the event to listen for.
   * @param handler - The callback function to invoke when the event is emitted. Receives the event payload as its argument.
   * @returns The current instance for method chaining.
   * @throws {Error} If the event name or handler is invalid.
   */
  on?<T = any>(
    event: string,
    handler: (payload: T) => void
  ): this;
  
  /**
   * Unsubscribes a handler function from a specific event.
   *
   * @typeParam T - The type of the payload expected by the handler.
   * @param event - The name of the event to unsubscribe from.
   * @param handler - The function to remove from the event's handler list.
   * @returns The current instance for method chaining.
   */
  off?<T = any>(
    event: string,
    handler: (payload: T) => void
  ): this;
  
  /**
   * Emits an event with an optional payload to all registered listeners.
   *
   * @typeParam T - The type of the payload to emit with the event.
   * @param event - The name of the event to emit.
   * @param payload - Optional payload to pass to event listeners.
   * @returns `true` if the event had listeners, `false` otherwise or if an error occurred.
   * @throws Will log an error and return `false` if an exception occurs during emission.
   */
  emit?<T = any>(
    event: string,
    payload?: T
  ): boolean;
  
  /**
   * Registers a one-time event handler for the specified event.
   * The handler will be invoked at most once for the event, after which it is automatically removed.
   *
   * @typeParam T - The type of the payload expected by the handler.
   * @param event - The name of the event to listen for.
   * @param handler - The callback function to execute when the event is emitted.
   * @returns The current instance for method chaining.
   */
  once?<T = any>(
    event: string,
    handler: (payload: T) => void
  ): this;
  
  /**
   * Removes all listeners for the specified event.
   *
   * @param event - The name of the event to clear listeners for.
   * @returns The current instance for method chaining.
   * @throws If the event name is invalid.
   */
  clear?(
    event: string
  ): this;
 
  /**
   * Removes all event listeners from the internal event emitter.
   * 
   * @returns {this} The current instance for method chaining.
   */
  clearAll?(): this;
  
  /**
   * Returns the number of listeners registered for the specified event.
   *
   * @param event - The name of the event to check for listeners.
   * @returns The number of listeners currently registered for the event.
   * @throws {Error} If the event name is invalid.
   */
  listenerCount?(
    event: string
  ): number;
  
  /**
   * Returns an array of event names currently registered with the emitter.
   *
   * @returns {string[]} An array containing the names of all registered events as strings.
   */
  eventNames?(): string[];
}

/**
 * A class to handle custom events.
 */
export class EventBus implements EventBusScheme {
  /**
   * Internal EventEmitter instance.
   */
  private emitter: EventEmitter;

  constructor(options?: { maxListeners?: number }) {
    this.emitter = new EventEmitter();
    if (options?.maxListeners) {
      this.emitter.setMaxListeners(options.maxListeners);
    }
  }

  /**
   * Registers an event handler for the specified event.
   *
   * @typeParam T - The type of the payload expected by the event handler.
   * @param event - The name of the event to listen for.
   * @param handler - The callback function to invoke when the event is emitted. Receives the event payload as its argument.
   * @returns The current instance for method chaining.
   * @throws {Error} If the event name or handler is invalid.
   */
  public on<T = any>(
    event: string,
    handler: (payload: T) => void
  ): this {
    this.validateEvent(event);
    this.validateHandler(handler);
    
    this.emitter.on(event, handler);
    return this;
  }

  /**
   * Unsubscribes a handler function from a specific event.
   *
   * @typeParam T - The type of the payload expected by the handler.
   * @param event - The name of the event to unsubscribe from.
   * @param handler - The function to remove from the event's handler list.
   * @returns The current instance for method chaining.
   */
  public off<T = any>(
    event: string,
    handler: (payload: T) => void
  ): this {
    this.validateEvent(event);
    this.validateHandler(handler);
    
    this.emitter.off(event, handler);
    return this;
  }

  /**
   * Emits an event with an optional payload to all registered listeners.
   *
   * @typeParam T - The type of the payload to emit with the event.
   * @param event - The name of the event to emit.
   * @param payload - Optional payload to pass to event listeners.
   * @returns `true` if the event had listeners, `false` otherwise or if an error occurred.
   * @throws Will log an error and return `false` if an exception occurs during emission.
   */
  public emit<T = any>(
    event: string,
    payload?: T
  ): boolean {
    this.validateEvent(event);
    
    try {
      return this.emitter.emit(event, payload);
    } catch (error) {
      console.error(`Error emitting event '${event}':`, error);
      return false;
    }
  }

  /**
   * Registers a one-time event handler for the specified event.
   * The handler will be invoked at most once for the event, after which it is automatically removed.
   *
   * @typeParam T - The type of the payload expected by the handler.
   * @param event - The name of the event to listen for.
   * @param handler - The callback function to execute when the event is emitted.
   * @returns The current instance for method chaining.
   */
  public once<T = any>(
    event: string,
    handler: (payload: T) => void
  ): this {
    this.validateEvent(event);
    this.validateHandler(handler);
    
    this.emitter.once(event, handler);
    return this;
  }

  /**
   * Removes all listeners for the specified event.
   *
   * @param event - The name of the event to clear listeners for.
   * @returns The current instance for method chaining.
   * @throws If the event name is invalid.
   */
  public clear(event: string): this {
    this.validateEvent(event);
    this.emitter.removeAllListeners(event);
    return this;
  }


  /**
   * Removes all event listeners from the internal event emitter.
   * 
   * @returns {this} The current instance for method chaining.
   */
  public clearAll(): this {
    this.emitter.removeAllListeners();
    return this;
  }

  /**
   * Returns the number of listeners registered for the specified event.
   *
   * @param event - The name of the event to check for listeners.
   * @returns The number of listeners currently registered for the event.
   * @throws {Error} If the event name is invalid.
   */
  public listenerCount(event: string): number {
    this.validateEvent(event);
    return this.emitter.listenerCount(event);
  }

  /**
   * Returns an array of event names currently registered with the emitter.
   *
   * @returns {string[]} An array containing the names of all registered events as strings.
   */
  public eventNames(): string[] {
    return this.emitter.eventNames().map(name => String(name));
  }

  /**
   * Sets the maximum number of listeners that can be registered for the event emitter.
   *
   * @param max - The maximum number of listeners allowed.
   * @returns The current instance for method chaining.
   */
  public setMaxListeners(max: number): this {
    this.emitter.setMaxListeners(max);
    return this;
  }

  /**
   * Returns the maximum number of listeners allowed for the event emitter.
   *
   * @returns {number} The maximum number of listeners.
   */
  public getMaxListeners(): number {
    return this.emitter.getMaxListeners();
  }

  /**
   * Validates that the provided event name is a non-empty string.
   * 
   * @param event - The event name to validate.
   * @throws {Error} If the event name is not a non-empty string.
   */
  private validateEvent(event: string): void {
    if (!event || typeof event !== 'string') {
      throw new Error('Event name must be a non-empty string.');
    }
  }

  /**
   * Validates that the provided handler is a function.
   * 
   * @param handler - The event handler to validate.
   * @throws {Error} Throws an error if the handler is not a function.
   */
  private validateHandler(handler: Function): void {
    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function.');
    }
  }
}