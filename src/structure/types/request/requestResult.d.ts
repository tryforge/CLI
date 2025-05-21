import { IEvent } from "../../interfaces/events";
import { IFunction } from "../../interfaces/function";

/**
 * Represents the request results.
 */
export type TRequestResult = IFunction[] | IEvent[] | Record<string, string[]> /* Enum */ | null;