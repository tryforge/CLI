// Node.js built-ins
import os from 'os';
import fs from 'fs/promises';
import path from 'path';
import { Stats } from 'fs';

/**
 * An interface representing how the FileSystem class is structured.
 */
interface FileScheme {
  /**
   * Reads the contents of a file at the given path.
   * @param path - The path to the file.
   * @returns A promise that resolves to the file contents as a string or Buffer.
   */
  ReadFile?<T = string>(
    path: string
  ): Promise<T>;

  /**
   * Writes data to a file at the given path.
   * @param path - The path to the file.
   * @param data - The data to write to the file.
   * @returns A promise that resolves to true if the write was successful, false otherwise.
   */
  WriteFile?(
    path: string,
    data: any
  ): Promise<boolean>;

  /**
   * Copies a file from the source path to the destination path.
   * @param sourcePath - The path to the source file.
   * @param destinationPath - The path to the destination file.
   * @returns A promise that resolves to true if the copy was successful, false otherwise.
   */
  CopyFile?(
    sourcePath: string,
    destinationPath: string
  ): Promise<boolean>;

  /**
   * Moves a file from the source path to the destination path.
   * @param sourcePath - The path to the source file.
   * @param destinationPath - The path to the destination file.
   * @returns A promise that resolves to true if the move was successful, false otherwise.
   */
  MoveFile?(
    sourcePath: string,
    destinationPath: string
  ): Promise<boolean>;

  /**
   * Checks if a file exists at the given path.
   * @param path - The path to the file.
   * @returns A promise that resolves to true if the file exists, false otherwise.
   */
  FileExists?(
    path: string
  ): Promise<boolean>;

  /**
   * Reads and parses a JSON file at the given path.
   * @param path - The path to the JSON file.
   * @returns A promise that resolves to the parsed JSON object.
   */
  ReadJSON?<T = any>(
    path: string
  ): Promise<T | null>;

  /**
   * Writes an object as JSON to a file at the given path.
   * @param path - The path to the file.
   * @param object - The object to serialize and write as JSON.
   * @returns A promise that resolves to true if the write was successful, false otherwise.
   */
  WriteJSON?<T = any>(
    path: string,
    object: T
  ): Promise<boolean>;

  /**
   * Asynchronously creates a new file at the specified path with the given data.
   * 
   * The method attempts to create a new file and write the provided data to it.
   * If the file already exists, the operation will fail and return `false`.
   * 
   * @param path - The path where the new file should be created.
   * @param data - The content to write to the file. Defaults to an empty string.
   * @returns A promise that resolves to `true` if the file was created successfully, or `false` if an error occurred (e.g., file already exists).
   */
  CreateFile?(
    path: string,
    data: string
  ): Promise<boolean>;

  /**
   * Asynchronously creates a directory at the specified path.
   * 
   * @param path - The path where the directory should be created.
   * @param recursive - Whether to create parent directories if they do not exist. Defaults to `true`.
   * @returns A promise that resolves to `true` if the directory was created successfully, or `false` if an error occurred.
   */
  CreateDirectory?(
    path: string,
    recursive: boolean
  ): Promise<boolean>;

  /**
   * Deletes a file at the specified path.
   *
   * @param path - The path to the file to be deleted.
   * @returns A promise that resolves to `true` if the file was successfully deleted, or `false` if an error occurred.
   */
  DeleteFile?(
    path: string
  ): Promise<boolean>;

  /**
   * Deletes a directory at the specified path.
   *
   * @param path - The path to the directory to delete.
   * @param recursive - Whether to delete directories recursively.
   * @returns A promise that resolves to `true` if the directory was deleted successfully, or `false` if an error occurred.
   */
  DeleteDirectory?(
    path: string,
    recursive: boolean
  ): Promise<boolean>;

  /**
   * Appends data to a file at the specified path.
   *
   * If the file does not exist, it will be created. The data can be a string or a Buffer.
   * Returns `true` if the operation succeeds, or `false` if an error occurs.
   *
   * @param path - The path to the file where data should be appended.
   * @param data - The data to append to the file, as a string or Buffer.
   * @returns A promise that resolves to `true` if the append operation was successful, or `false` otherwise.
   */
  AppendToFile?(
    path: string,
    data: string | Buffer
  ): Promise<boolean>;

  /**
   * Reads the contents of a file at the specified path and returns it as a Buffer.
   * 
   * @param path - The path to the file to be read.
   * @returns A Promise that resolves to a Buffer containing the file's contents, or `null` if the file cannot be read.
   */
  ReadFileBuffer?(
    path: string
  ): Promise<Buffer | null>;

  /**
   * Retrieves the file extension from the provided file path.
   *
   * @param filePath - The path of the file whose extension is to be extracted.
   * @returns The file extension, including the leading dot (e.g., ".txt"). Returns an empty string if the file has no extension.
   */
  GetFileExtension?(
    filePath: string
  ): string;

  /**
   * Retrieves the file name from a given file path.
   *
   * @param filePath - The full path to the file.
   * @returns The name of the file extracted from the provided path.
   */
  GetFileName?(
    filePath: string
  ): string;

  /**
   * Returns the parent directory of the specified file path.
   *
   * @param filePath - The path of the file or directory.
   * @returns The path of the parent directory.
   */
  GetParentDirectory?(
    filePath: string
  ): string;

  /**
   * Determines whether the specified path refers to a directory.
   *
   * @param path - The file system path to check.
   * @returns A promise that resolves to `true` if the path is a directory, or `false` otherwise.
   */
  IsDirectory?(
    path: string
  ): Promise<boolean>;

  /**
   * Determines whether the specified path refers to a file.
   *
   * @param path - The path to check.
   * @returns A promise that resolves to `true` if the path is a file, or `false` otherwise.
   */
  IsFile?(
    path: string
  ): Promise<boolean>;

  /**
   * Retrieves the current user's home directory path.
   *
   * @returns {string} The absolute path to the user's home directory.
   */
  GetHomePath?(): string;

  /**
   * Returns the operating system's default directory for temporary files.
   *
   * @returns {string} The path to the temporary directory.
   */
  GetTempDirectory?(): string;

  /**
   * Returns the current working directory of the Node.js process.
   *
   * @returns {string} The absolute path of the current workspace directory.
   */
  GetWorkspaceDirectory?(): string;

  /**
   * Lists the contents of a directory at the given path.
   * @param path - The path to the directory.
   * @returns A promise that resolves to an array of file and directory names.
   */
  ListDirectory?(
    path: string
  ): Promise<string[]>;

  /**
   * Retrieves file statistics for the file at the given path.
   * @returns A promise that resolves to the file statistics (fs.Stats).
   */
  GetFileStats?(
    path: string
  ): Promise<Stats>;

  /**
   * Ensures that a directory exists at the given path, creating it if necessary.
   * @param path - The path to the directory.
   * @returns A promise that resolves when the directory exists.
   */
  EnsureDirectory?(
    path: string
  ): Promise<boolean | { success: boolean, created: boolean, path: string }>;
}

/**
 * Provides a comprehensive set of static methods for interacting with the file system.
 * 
 * The `FileSystem` class implements the `FileScheme` interface and offers high-level, promise-based
 * utilities for common file and directory operations, such as reading, writing, copying, moving, deleting,
 * and checking the existence of files and directories. It also includes methods for working with JSON files,
 * retrieving file metadata, manipulating file paths, and accessing system directories.
 * 
 * All methods are asynchronous unless otherwise noted, and leverage Node.js built-in modules (`fs/promises`, `path`, `os`).
 * 
 * @since 0.0.1
 * @see https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts
 * 
 * @example
 * ```typescript
 * const content = await FileSystem.ReadFile('/path/to/file.txt');
 * const exists = await FileSystem.FileExists('/path/to/file.txt');
 * const created = await FileSystem.CreateDirectory('/path/to/dir');
 * const json = await FileSystem.ReadJSON('/path/to/file.json');
 * ```
 */
export class FileSystem implements FileScheme {
  /**
   * Reads the contents of a file at the given path.
   *
   * This static method reads the contents of a file specified by the provided path.
   * Returns the file contents as a string. If the file cannot be read (e.g., it does not exist or there is a permission error),
   * the method returns an error message or a default error string.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1 - Uses Node.js built-in `fs/promises` for file operations.
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const content = await FileSystem.ReadFile('/path/to/file.txt');
   * console.log(content);
   * ```
   *
   * @param path - The path to the file to be read.
   * @returns A promise that resolves to the file contents as a string, or an error message if the file cannot be read.
   */
  public static async ReadFile(path: string): Promise<string> {
    try {
      return await fs.readFile(path, 'utf-8');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return 'An unexpected error occurred.';
      }
    }
  }

  /**
   * Writes data to a file at the given path.
   *
   * This static method writes the provided data to the specified file path.
   * If the operation is successful, it returns `true`; otherwise, it returns `false`.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const success = await FileSystem.WriteFile('/path/to/file.txt', 'Hello, world!');
   * ```
   *
   * @param path - The path to the file.
   * @param data - The data to write to the file.
   * @returns A promise that resolves to `true` if the write was successful, `false` otherwise.
   */
  public static async WriteFile(path: string, data: any): Promise<boolean> {
    try {
      await fs.writeFile(path, data, 'utf-8');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Copies a file from the source path to the destination path.
   *
   * This static method copies a file from `sourcePath` to `destinationPath`.
   * Returns `true` if the copy was successful, or `false` if an error occurred.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const copied = await FileSystem.CopyFile('a.txt', 'b.txt');
   * ```
   *
   * @param sourcePath - The path to the source file.
   * @param destinationPath - The path to the destination file.
   * @returns A promise that resolves to `true` if the copy was successful, `false` otherwise.
   */
  public static async CopyFile(sourcePath: string, destinationPath: string): Promise<boolean> {
    try {
      await fs.copyFile(sourcePath, destinationPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Moves a file from the source path to the destination path.
   *
   * This static method moves a file from `sourcePath` to `destinationPath`.
   * Returns `true` if the move was successful, or `false` if an error occurred.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const moved = await FileSystem.MoveFile('a.txt', 'b.txt');
   * ```
   *
   * @param sourcePath - The path to the source file.
   * @param destinationPath - The path to the destination file.
   * @returns A promise that resolves to `true` if the move was successful, `false` otherwise.
   */
  public static async MoveFile(sourcePath: string, destinationPath: string): Promise<boolean> {
    try {
      await fs.rename(sourcePath, destinationPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if a file exists at the given path.
   *
   * This static method checks whether a file exists at the specified path.
   * Returns `true` if the file exists, or `false` otherwise.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const exists = await FileSystem.FileExists('/path/to/file.txt');
   * ```
   *
   * @param path - The path to the file.
   * @returns A promise that resolves to `true` if the file exists, `false` otherwise.
   */
  public static async FileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reads and parses a JSON file at the given path.
   *
   * This static method reads a JSON file from the specified path and parses its contents.
   * Returns the parsed object if successful, or `null` if an error occurs (e.g., file not found or invalid JSON).
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const obj = await FileSystem.ReadJSON('/path/to/file.json');
   * ```
   *
   * @param path - The path to the JSON file.
   * @returns A promise that resolves to the parsed object, or `null` if an error occurs.
   */
  public static async ReadJSON<T = any>(path: string): Promise<T | null> {
    try {
      return JSON.parse(await FileSystem.ReadFile(path));
    } catch {
      return null;
    }
  }

  /**
   * Writes an object as JSON to a file at the given path.
   *
   * This static method serializes the provided object as JSON and writes it to the specified file.
   * Returns `true` if the write was successful, or `false` otherwise.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const ok = await FileSystem.WriteJSON('/path/to/file.json', { foo: 'bar' });
   * ```
   *
   * @param path - The path to the file.
   * @param object - The object to serialize and write as JSON.
   * @returns A promise that resolves to `true` if the write was successful, `false` otherwise.
   */
  public static async WriteJSON<T = any>(path: string, object: T): Promise<boolean> {
    try {
      await fs.writeFile(path, JSON.stringify(object), 'utf-8');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Asynchronously creates a new file at the specified path with the given data.
   *
   * This static method attempts to create a new file and write the provided data to it.
   * If the file already exists, the operation will fail and return `false`.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const created = await FileSystem.CreateFile('/path/to/newfile.txt', 'Hello!');
   * ```
   *
   * @param path - The path where the new file should be created.
   * @param data - The content to write to the file. Defaults to an empty string.
   * @returns A promise that resolves to `true` if the file was created successfully, or `false` if an error occurred.
   */
  public static async CreateFile(path: string, data: string = ''): Promise<boolean> {
    try {
      await fs.writeFile(path, data, { flag: 'wx' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Asynchronously creates a directory at the specified path.
   *
   * This static method creates a directory at the given path.
   * If `recursive` is true, parent directories are created as needed.
   * Returns `true` if the directory was created successfully, or `false` if an error occurred.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const ok = await FileSystem.CreateDirectory('/path/to/dir');
   * ```
   *
   * @param path - The path where the directory should be created.
   * @param recursive - Whether to create parent directories if they do not exist. Defaults to `true`.
   * @returns A promise that resolves to `true` if the directory was created successfully, or `false` if an error occurred.
   */
  public static async CreateDirectory(path: string, recursive: boolean = true): Promise<boolean> {
    try {
      await fs.mkdir(path, { recursive });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes a file at the specified path.
   *
   * This static method deletes the file at the given path.
   * Returns `true` if the file was deleted successfully, or `false` if an error occurred.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const deleted = await FileSystem.DeleteFile('/path/to/file.txt');
   * ```
   *
   * @param path - The path to the file to be deleted.
   * @returns A promise that resolves to `true` if the file was deleted, or `false` if an error occurred.
   */
  public static async DeleteFile(path: string): Promise<boolean> {
    try {
      await fs.unlink(path);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes a directory at the specified path.
   *
   * This static method deletes the directory at the given path.
   * If `recursive` is true, the directory and its contents are deleted recursively.
   * Returns `true` if the directory was deleted successfully, or `false` if an error occurred.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const deleted = await FileSystem.DeleteDirectory('/path/to/dir', true);
   * ```
   *
   * @param path - The path to the directory to delete.
   * @param recursive - Whether to delete directories recursively.
   * @returns A promise that resolves to `true` if the directory was deleted, or `false` if an error occurred.
   */
  public static async DeleteDirectory(path: string, recursive: boolean): Promise<boolean> {
    try {
      await fs.rm(path, { recursive, force: true });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Appends data to a file at the specified path.
   *
   * This static method appends the provided data to the file at the given path.
   * If the file does not exist, it will be created.
   * Returns `true` if the operation succeeds, or `false` if an error occurs.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const ok = await FileSystem.AppendToFile('/path/to/file.txt', 'More text');
   * ```
   *
   * @param path - The path to the file where data should be appended.
   * @param data - The data to append to the file, as a string or Buffer.
   * @returns A promise that resolves to `true` if the append operation was successful, or `false` otherwise.
   */
  public static async AppendToFile(path: string, data: string | Buffer): Promise<boolean> {
    try {
      await fs.appendFile(path, data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reads the contents of a file at the specified path and returns it as a Buffer.
   *
   * This static method reads the contents of a file and returns it as a Buffer.
   * Returns `null` if the file cannot be read.
   * This method is asynchronous and should be awaited.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const buffer = await FileSystem.ReadFileBuffer('/path/to/file.bin');
   * ```
   *
   * @param path - The path to the file to be read.
   * @returns A Promise that resolves to a Buffer containing the file's contents, or `null` if the file cannot be read.
   */
  public static async ReadFileBuffer(path: string): Promise<Buffer | null> {
    try {
      return await fs.readFile(path);
    } catch {
      return null;
    }
  }

  /**
   * Retrieves the file extension from the provided file path.
   *
   * This static method extracts the file extension from the given file path.
   * Returns the extension including the leading dot (e.g., ".txt"), or an empty string if the file has no extension.
   *
   * Since version: 0.0.1
   *
   * [View on GitHub](https://github.com/tryforge/CLI/blob/main/src/managers/classes/FileSystem.ts)
   *
   * Example usage:
   * ```typescript
   * const ext = FileSystem.GetFileExtension('foo.txt'); // ".txt"
   * ```
   *
   * @param filePath - The path of the file whose extension is to be extracted.
   * @returns The file extension, including the leading dot (e.g., ".txt"). Returns an empty string if the file has no extension.
   */
  public static GetFileExtension(
    filePath: string
  ): string {
    return path.extname(filePath)
  };

  /**
   * Retrieves the file name from a given file path.
   *
   * @param filePath - The full path to the file.
   * @returns The name of the file extracted from the provided path.
   */
  public static GetFileName(
    filePath: string
  ): string {
    return path.basename(filePath)
  };

  /**
   * Returns the parent directory of the specified file path.
   *
   * @param filePath - The path of the file or directory.
   * @returns The path of the parent directory.
   */
  public static GetParentDirectory(
    filePath: string
  ): string {
    return path.dirname(filePath)
  };

  /**
   * Determines whether the specified path refers to a directory.
   *
   * @param path - The file system path to check.
   * @returns A promise that resolves to `true` if the path is a directory, or `false` otherwise.
   */
  public static async IsDirectory(
    path: string
  ): Promise<boolean> {
    try {
      return (await fs.stat(path)).isDirectory()
    } catch {
      return false
    }
  };

  /**
   * Determines whether the specified path refers to a file.
   *
   * @param path - The path to check.
   * @returns A promise that resolves to `true` if the path is a file, or `false` otherwise.
   */
  public static async IsFile(
    path: string
  ): Promise<boolean> {
    try {
      return (await fs.stat(path)).isFile()
    } catch {
      return false
    }
  };

  /**
   * Retrieves the current user's home directory path.
   *
   * @returns {string} The absolute path to the user's home directory.
   */
  public static GetHomePath(): string {
    return os.homedir()
  };

  /**
   * Returns the operating system's default directory for temporary files.
   *
   * @returns {string} The path to the temporary directory.
   */
  public static GetTempDirectory(): string {
    return os.tmpdir()
  };

  /**
   * Returns the current working directory of the Node.js process.
   *
   * @returns {string} The absolute path of the current workspace directory.
   */
  public static GetWorkspaceDirectory(): string {
    return process.cwd();
  }

  /**
   * Lists the contents of a directory at the given path.
   * @param path - The path to the directory.
   * @returns A promise that resolves to an array of file and directory names.
   */
  public static async ListDirectory(
    path: string
  ): Promise<string[] | false> {
    try {
      return await fs.readdir(path)
    } catch {
      return false
    }
  };

  /**
   * Retrieves file statistics for the file at the given path.
   * @returns A promise that resolves to the file statistics (fs.Stats).
   */
  public static async GetFileStats(
    path: string
  ): Promise<Stats | false> {
    try {
      return await fs.stat(path)
    } catch {
      return false
    }
  };

  /**
   * Ensures that a directory exists at the given path, creating it if necessary.
   * @param path - The path to the directory.
   * @returns A promise that resolves when the directory exists.
   */
  public static async EnsureDirectory(
    path: string
  ): Promise<boolean | { success: boolean, created: boolean, path: string }> {
    try {
      await FileSystem.FileExists(path)
      return {
        success: true,
        created: false,
        path: path
      }
    } catch {
      try {
        await FileSystem.CreateDirectory(path, true)
        return {
          success: true,
          created: true,
          path: path
        }
      } catch {
        return {
          success: false,
          created: false,
          path: path
        }
      }
    }
  };
}
