interface WebGLSupportResult {
  supported: boolean;
  reason?: string;
  contextVersion?: 'webgl2' | 'webgl1';
  warnings?: string[];
}

export function checkWebGLSupport(): WebGLSupportResult {
  try {
    const canvas = document.createElement('canvas');
    
    // Try WebGL2 first (preferred)
    let gl: WebGL2RenderingContext | WebGLRenderingContext | null = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    let contextVersion: 'webgl2' | 'webgl1' = 'webgl2';
    
    // Fall back to WebGL1 if WebGL2 is not available
    if (!gl) {
      gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      contextVersion = 'webgl1';
    }
    
    if (!gl) {
      return {
        supported: false,
        reason: 'WebGL is not available in your browser. Please use a modern browser like Chrome, Firefox, or Safari, and ensure hardware acceleration is enabled in your browser settings.',
      };
    }

    // Verify basic GL functionality
    try {
      const vendor = gl.getParameter(gl.VENDOR);
      const renderer = gl.getParameter(gl.RENDERER);
      console.log('[WebGL Support] GPU Info:', { vendor, renderer });
    } catch (glError) {
      return {
        supported: false,
        reason: `WebGL context created but basic queries failed: ${glError instanceof Error ? glError.message : 'Unknown error'}. This may indicate GPU driver issues.`,
      };
    }

    const warnings: string[] = [];

    // For WebGL1, check for optional extensions (non-blocking)
    if (contextVersion === 'webgl1') {
      const optionalExtensions = ['OES_element_index_uint', 'OES_texture_float'];
      for (const ext of optionalExtensions) {
        if (!(gl as WebGLRenderingContext).getExtension(ext)) {
          warnings.push(`Optional WebGL extension "${ext}" is not supported (may limit some features)`);
        }
      }
    }

    // Log warnings to console but don't block
    if (warnings.length > 0) {
      console.warn('[WebGL Support] Non-critical warnings:', warnings);
    }

    return { 
      supported: true, 
      contextVersion,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  } catch (error) {
    return {
      supported: false,
      reason: `WebGL initialization error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your browser settings and GPU drivers.`,
    };
  }
}
