interface WebGLSupportResult {
  supported: boolean;
  reason?: string;
}

export function checkWebGLSupport(): WebGLSupportResult {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return {
        supported: false,
        reason: 'WebGL is not available in your browser. Please use a modern browser like Chrome, Firefox, or Safari.',
      };
    }

    // Check for required extensions
    const requiredExtensions = ['OES_element_index_uint'];
    for (const ext of requiredExtensions) {
      if (!(gl as WebGLRenderingContext).getExtension(ext)) {
        return {
          supported: false,
          reason: `Required WebGL extension "${ext}" is not supported.`,
        };
      }
    }

    return { supported: true };
  } catch (error) {
    return {
      supported: false,
      reason: `WebGL initialization error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
