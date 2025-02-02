// src/types/global.d.ts

interface FileSystem {
    readFile: (path: string, options?: { encoding?: string }) => Promise<string | Uint8Array>;
  }
  
  declare global {
    interface Window {
      fs: FileSystem;
    }
  }
  
  export {};