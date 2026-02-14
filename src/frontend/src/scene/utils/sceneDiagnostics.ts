export type FailureStage = 
  | 'webgl-init' 
  | 'texture-load' 
  | 'environment-load' 
  | 'scene-render'
  | 'asset-load'
  | 'startup-timeout';

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
      console.error('WebGL initialization failed. Check browser compatibility and GPU drivers.');
      break;
    case 'texture-load':
      console.error('Texture loading failed. Check asset paths and network connectivity.');
      break;
    case 'environment-load':
      console.error('Environment preset failed to load. Scene will render with basic lighting.');
      break;
    case 'scene-render':
      console.error('Scene rendering error. Check component hierarchy and Three.js setup.');
      break;
    case 'asset-load':
      console.error('Asset loading failed. Check file paths and formats.');
      break;
    case 'startup-timeout':
      console.error('Scene startup timeout. First render did not occur within expected time.');
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
  };
  return stageLabels[stage] || stage;
}
