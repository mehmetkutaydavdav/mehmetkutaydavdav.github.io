# Surface maps

Ceres: USGS, https://www.usgs.gov/media/images/global-mosaic-ceres-taken-during-dawn-mission . Dawn FC / DLR global mosaic, public domain. Native 1200 × 380 display image retained in WebP; runtime spherical wrapping is approximate and is not a cartographic registration. Polar coverage and illumination vary across the source mosaic.

Solar System Scope / INOVE: https://www.solarsystemscope.com/textures/
License: Creative Commons Attribution 4.0 — https://creativecommons.org/licenses/by/4.0/

Most Solar System Scope source maps retain 2048 × 1024 pixels and are encoded as WebP in local JavaScript data URLs for offline file:// support. Source URLs appear in the asset headers. These composites can include enhanced colours and interpreted gaps; they are not current weather or uniformly calibrated natural-colour images.

Europa: NASA 3D Resources, https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures . Native 1440 × 720 grayscale display mosaic, with an approximate warm-ice tint applied to distinguish darker lineae. No new detail or calibrated colour is claimed. Credit: NASA.

Enceladus: NASA/JPL-Caltech/Space Science Institute/Lunar and Planetary Institute, [PIA18435](https://www.jpl.nasa.gov/images/pia18435-color-maps-of-enceladus-2014/). [Original download](https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA18435.jpg), 15960 × 7980, reduced to 4096 × 2048 with Lanczos resampling and WebP encoding. Enhanced UV/visible/IR colour, not natural colour.

Moon: Solar System Scope / INOVE, [8K original](https://www.solarsystemscope.com/textures/download/8k_moon.jpg), CC BY 4.0 as above. Reduced to 4096 × 2048 with Lanczos resampling, stored in WebP.

Pluto: NASA/JHUAPL/SwRI, New Horizons MVIC PIA11707, https://www.jpl.nasa.gov/images/pia11707-pluto-color-map/ . The existing 1024 × 512 asset is retained. Runtime resampling adds no observed detail; the unobserved southern region receives a disclosed neutral display completion. See ../KAYNAKLAR.md for limitations.

### Io

- Source: [USGS Astrogeology — Io Global Image Mosaic and Geologic Map](https://www.usgs.gov/media/images/io-global-image-mosaic-and-geologic-map), public domain, Galileo/Voyager imagery.
- [Original 2340 × 2370 image](https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/Io_figure_press_2xglobal_300dpi.jpg).
- Only the upper photographic panel is used: crop box `(34,24,2290,1152)`, yielding 2256 × 1128. The lower geologic interpretation is excluded. Five-pixel-wide grid strips at each 188-pixel interval are linearly interpolated from neighbouring rows/columns to remove cartographic annotations. Then reduced to 2048 × 1024 in WebP.
- This improves on the former NASA visualization map but cannot recover detail missing from the original spacecraft coverage. Fine grid-strip interpolation is cosmetic, not measured terrain.

### Bennu

- [OSIRIS-REx global mosaic](https://www.asteroidmission.org/bennu_global_mosaic/), NASA/Goddard/University of Arizona. PolyCam images collected March–April 2019, released March 2020.
- [2400 × 1200 public image](https://www.asteroidmission.org/wp-content/uploads/2020/03/Bennu_Global_Mosaic.png), reduced to 2048 × 1024 and stored as WebP in `bennu.js`.
- The public visualization mesh and this mosaic are not cartometrically co-registered. The display uses spherical sampling with approximate longitude alignment. Image lighting is partly baked in; surface boulders are texture features, not individually modelled geometry.
