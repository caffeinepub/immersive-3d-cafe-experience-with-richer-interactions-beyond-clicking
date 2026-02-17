export type FailureStage = 
  | 'webgl-init' 
  | 'texture-load' 
  | 'environment-load' 
  | 'scene-render'
  | 'asset-load'
  | 'startup-timeout'
  | 'full-environment-timeout'
  | 'fallback-render'
  | 'full-environment-mount';

export interface DiagnosticInfo {
  stage: FailureStage;
  message: string;
  timestamp: string;
}

export function logSceneFailure(
  stage: FailureStage,
  message: string,
  error?: Error
): DiagnosticInfo {
  const timestamp = new Date().toISOString();
  const errorDetails = error ? {
    message: error.message,
    stack: error.stack,
    name: error.name,
  } : null;

  console.error('[Scene Diagnostics]', {
    timestamp,
    stage,
    message,
    error: errorDetails,
  });

  // Log additional context based on stage
  switch (stage) {
    case 'webgl-init':
      console.error('[webgl-init] WebGL detection/initialization failed. Check browser compatibility and GPU drivers.');
      break;
    case 'texture-load':
      console.error('[texture-load] Texture loading failed. Check asset paths and network connectivity.');
      break;
    case 'environment-load':
      console.error('[environment-load] Environment preset failed to load. Scene will render with basic lighting.');
      break;
    case 'scene-render':
      console.error('[scene-render] Scene rendering error. Check component hierarchy and Three.js setup.');
      break;
    case 'asset-load':
      console.error('[asset-load] Asset loading failed. Check file paths and formats.');
      break;
    case 'startup-timeout':
      console.error('[startup-timeout] Scene startup timeout. First render did not occur within expected time.');
      break;
    case 'full-environment-timeout':
      console.error('[full-environment-timeout] Full environment mount timeout. Only fallback room rendered within expected time.');
      break;
  }

  return { stage, message, timestamp };
}

export function logSceneSuccess(stage: string, message: string): void {
  console.log('[Scene Diagnostics]', {
    timestamp: new Date().toISOString(),
    stage,
    message,
    status: 'success',
  });
}

export function formatDiagnosticStage(stage: FailureStage): string {
  const stageLabels: Record<FailureStage, string> = {
    'webgl-init': 'WebGL Initialization',
    'texture-load': 'Texture Loading',
    'environment-load': 'Environment Loading',
    'scene-render': 'Scene Rendering',
    'asset-load': 'Asset Loading',
    'startup-timeout': 'Scene Startup Timeout',
    'full-environment-timeout': 'Full Environment Mount Timeout',
    'fallback-render': 'Fallback Room Render',
    'full-environment-mount': 'Full Environment Mount',
  };
  return stageLabels[stage] || stage;
}
