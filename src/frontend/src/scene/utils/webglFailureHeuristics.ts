/**
 * Classifies whether an error is likely WebGL-related based on error patterns
 */
export function isLikelyWebGLError(error: Error): boolean {
  const message = error.message.toLowerCase();
  const name = error.name.toLowerCase();

  // Common WebGL error patterns
  const webglPatterns = [
    'webgl',
    'context lost',
    'context creation',
    'gl context',
    'graphics',
    'gpu',
    'shader',
    'framebuffer',
    'texture',
    'rendering context',
    'canvas',
    'three',
  ];

  return webglPatterns.some(pattern => 
    message.includes(pattern) || name.includes(pattern)
  );
}

/**
 * Formats a human-readable reason string for NonWebGLFallback
 */
export function formatWebGLErrorReason(error: Error): string {
  const message = error.message;
  
  // Try to extract meaningful information
  if (message.includes('context lost')) {
    return 'WebGL context was lost. This can happen due to GPU driver issues or browser resource limits.';
  }
  
  if (message.includes('context creation')) {
    return 'Failed to create WebGL rendering context. Your browser or GPU may not support WebGL.';
  }
  
  if (message.includes('shader')) {
    return 'WebGL shader compilation failed. This may indicate GPU driver issues.';
  }
  
  if (message.includes('framebuffer')) {
    return 'WebGL framebuffer error. This may indicate GPU memory or driver issues.';
  }
  
  // Generic WebGL error
  return `WebGL error: ${message}`;
}
