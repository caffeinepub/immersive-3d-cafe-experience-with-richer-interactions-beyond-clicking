CONTOUR CAFE - WORDPRESS ELEMENTOR INTEGRATION GUIDE
====================================================

This package contains a static build of the Contour Cafe 3D experience that can be embedded in WordPress using Elementor.

INSTALLATION STEPS
------------------

1. Extract the ZIP file to a folder on your computer

2. Upload the extracted folder to your WordPress hosting:
   - Via FTP: Upload to /wp-content/uploads/contour-cafe/
   - Via cPanel File Manager: Navigate to public_html/wp-content/uploads/ and upload

3. In WordPress, edit your page with Elementor

4. Add an HTML widget to your page

5. Insert the following iframe code in the HTML widget:
   <iframe src="/wp-content/uploads/contour-cafe/index.html" width="100%" height="800px" frameborder="0" allowfullscreen></iframe>

6. Adjust the height value as needed for your layout

FEATURES & LIMITATIONS
----------------------

✓ WORKS OFFLINE (Static Features):
  - Full 3D navigation (WASD + mouse look)
  - Hover and gaze interactions
  - Proximity zones
  - Interactive objects (door, inspectable prop)
  - Menu display
  - About page content

✗ REQUIRES BACKEND (Internet Computer):
  - Contact form submissions
  - Dynamic content updates

BACKEND INTEGRATION (Optional)
------------------------------

To enable contact form functionality:

1. The site must be hosted on the Internet Computer, OR
2. Configure a custom backend endpoint in the config files

For Internet Computer hosting:
- Deploy the backend canister using dfx
- Update the canister ID in the frontend configuration
- Redeploy the frontend with the updated configuration

CUSTOMIZATION
-------------

To customize colors, fonts, or content:
1. Edit the source files in your development environment
2. Rebuild using: npm run build
3. Re-upload the dist/ folder contents

BROWSER COMPATIBILITY
--------------------

Requires a modern browser with WebGL support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

PERFORMANCE TIPS
----------------

- Recommended minimum: 4GB RAM, integrated graphics
- For best experience: 8GB+ RAM, dedicated GPU
- Mobile devices: May have reduced performance

SUPPORT
-------

For questions or issues:
- Email: support@contourcafe.com
- Documentation: https://contourcafe.com/docs

Built with Internet Computer and React Three Fiber
© 2026 Contour Cafe. All rights reserved.
