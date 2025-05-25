// External packages
import ora, { Ora } from 'ora';

/**
 * An interface representing how the ProgressManager is structured.
 */
interface ProgressScheme {
  /**
   * An instance of the Ora spinner used to display progress in the CLI.
   * Can be `null` if the spinner has not been initialized.
   */
  Spinner?: Ora | null;

  /**
   * Start a loading spinner with a message.
   * @param message The message to display with the spinner.
   */
  Start?(
    message: string
  ): void;

  /**
   * Update the spinner text.
   * @param message The new message to display.
   */
  Update?(
    message: string
  ): void;

  /**
   * Mark the spinner as succeeded with a message and stop it.
   * @param message The success message to display.
   */
  Succeed?(
    message: string
  ): void;

  /**
   * Mark the spinner as failed with a message and stop it.
   * @param message The failure message to display.
   */
  Fail?(
    message: string
  ): void;

  /**
   * Stop the spinner without marking as success or failure.
   */
  Stop?(): void;
}

/**
 * A class to manage progression spinners for the console.
 */
export class ProgressManager implements ProgressScheme {
  /**
   * An instance of the Ora spinner used to display progress in the CLI.
   * Can be `null` if the spinner has not been initialized.
   */
  public Spinner: Ora | null = null;

  /**
   * Start a loading spinner with a message.
   * @param message The message to display with the spinner.
   */
  public Start(message: string) {
    if (this.Spinner) this.Spinner.stop();
    this.Spinner = ora({ text: message }).start();
  }

  /**
   * Update the spinner text.
   * @param message The new message to display.
   */
  public Update(message: string) {
    if (this.Spinner) {
      this.Spinner.text = message;
    }
  }

  /**
   * Mark the spinner as succeeded with a message and stop it.
   * @param message The success message to display.
   */
  public Succeed(message: string) {
    if (this.Spinner) {
      this.Spinner.succeed(message);
      this.Spinner = null;
    }
  }

  /**
   * Mark the spinner as failed with a message and stop it.
   * @param message The failure message to display.
   */
  public Fail(message: string) {
    if (this.Spinner) {
      this.Spinner.fail(message);
      this.Spinner = null;
    }
  }

  /**
   * Stop the spinner without marking as success or failure.
   */
  public Stop() {
    if (this.Spinner) {
      this.Spinner.stop();
      this.Spinner = null;
    }
  }
}