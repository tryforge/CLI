// FORGE CLI CORE ARCHITECTURE
// This file serves as the entry point for the modular CLI architecture
// Core imports
import { Command } from 'commander';
import { EventEmitter } from 'events';
import * as path from 'path';
import * as fs from 'fs';
// Import all modules
import { Logger, LogLevel } from './Logger';
import { ConfigManager } from './ConfigManager';
import { CacheManager } from './CacheManager';
import { PluginManager } from './PluginManager';
import { ProgressManager } from './ProgressManager';
import { PerformanceTracker } from './PerformanceTracker';
import { ErrorHandler, Warning } from './ErrorHandler';
import { PromptManager } from './PromptManager';
import { FileSystem } from './FileSystem';
import { NetworkManager } from './NetworkManager';
import { UpdateChecker } from './UpdateChecker';
import { ForgeContext } from './ForgeContext';
/*
 * Configuration options for ForgeCommand
 * @interface ForgeCommandOptions
 */
export interface ForgeCommandOptions {
  /* Suppress all output */
  silent?: boolean;
  /* Enable debug logging */
  debug?: boolean;
  /* Enable verbose logging */
  verbose?: boolean;
  /* Configure logging level */
  logLevel?: LogLevel;
  /* Path to configuration file */
  config?: string;
  /* Force run even with warnings */
  force?: boolean;
  /* Display timing information */
  timing?: boolean;
  /* Disable colored output */
  noColor?: boolean;
  /* Path to store logs */
  logFile?: string;
  /* Path to store cache */
  cacheDir?: string;
  /* Disable cache */
  noCache?: boolean;
  /* Disable plugins */
  noPlugins?: boolean;
  /* Disable updates check */
  noUpdates?: boolean;
  /*** Offline mode */
  offline?: boolean;
}