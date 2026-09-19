# Sources and model limitations

These are educational visualizations, not calibrated observations or an ephemeris. Sizes and animation speeds are adjusted for inspection. Each catalogue entry describes what its model shows and links to a scientific source.

## English edition: rendering changes

- All 24 entries, technical properties, controls, accessibility text and static fallbacks are in English. URL identifiers remain stable.
- Texture sampling increased from 1024×512 to 2048×1024; sphere rendering increased from 360×360 to 512×512. Higher quality costs additional downloads, memory and CPU work. Upscaling cannot recover missing observations.
- Surface illumination uses a gamma-aware approximation. Earth adds cloud attenuation, a thin atmospheric limb and an approximate ocean highlight inferred from map colour, not a measured BRDF or atmospheric scattering solution.
- Shared screen-space rotation replaces separate galaxy yaw/pitch controls. Near-side features follow the pointer without Euler-angle clamps. Markers and Saturn's rings share their parent transformation.
- Small bodies use smooth vertex shading and depth-buffered triangles. Extended comet tails are omitted at nucleus-inspection scale; tails should not rotate rigidly with the nucleus.

## Surface maps

[Solar System Scope / INOVE](https://www.solarsystemscope.com/textures/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The 2K source images retain their original resolution and are converted to WebP. The publisher describes enhanced colour and fictional filling of some gaps. These are visualization maps, not uniformly calibrated science products. Its fictional Ceres map is not used.

Pluto: [NASA/JHUAPL/SwRI, New Horizons MVIC PIA11707](https://www.jpl.nasa.gov/images/pia11707-pluto-color-map/). The 1024×512 display asset is resampled, not newly resolved. The missing south is completed only in a display copy, fading to neutral grey-beige; no new geological detail is claimed. [NASA's southern coverage explanation](https://www.jpl.nasa.gov/images/pia21861-plutos-surface-in-detail/).

Neptune's palette is adjusted toward pale blue-green, motivated by [Irwin et al., University of Oxford, 2024](https://www.ox.ac.uk/news/2024-01-05-new-images-reveal-what-neptune-and-uranus-really-look-0). This display adjustment is not that study's calibrated image product.

Europa and Enceladus: [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures), native 1440×720 grayscale visualization maps. Coverage varies, and these composites are not calibrated natural-colour images or displaced terrain. Credit: NASA.

Ceres: [USGS, Global Mosaic of Ceres taken during Dawn Mission](https://www.usgs.gov/media/images/global-mosaic-ceres-taken-during-dawn-mission), Dawn FC / DLR, public domain. The native 1200×380 display image is resampled for spherical inspection; it is not a cartometrically registered terrain product. Illumination is already present in the mosaic, and polar coverage varies. No extra relief or resolution is claimed.

Titan: [Cassini natural-colour composite, PIA06230](https://www.jpl.nasa.gov/images/pia06230-cassinis-view-of-titan-natural-color-composite/) guides the low-contrast orange haze and faint blue atmospheric limb. The renderer uses a procedural illustration; no calibrated radiative-transfer solution is claimed. Strong Jupiter-like bands have been removed.

## Small-body geometry

Bennu: [NASA 3D Resources, Asteroid 101955 Bennu](https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Printing/Asteroid%20101955%20Bennu). STL vertices are deduplicated, normalized, rotated from Z-up to Y-up and assigned area-weighted normals. No OSIRIS-REx phototexture or individually mapped boulders are claimed. Credit: NASA; see the source repository's usage guidance.

67P: original continuous implicit-surface approximation, informed by the bilobed morphology and relative dimensions in [ESA's Rosetta overview](https://blogs.esa.int/rosetta/2014/10/03/measuring-comet-67pc-g/). Preliminary density values from that old article are not adopted as current measurements. Smoothly joined, flattened lobes replace two intersecting spheres. Small procedural relief is illustrative.

The authoritative collection for future replacement is [NASA PDS SBN, RO-C-MULTI-5-67P-SHAPE-V2.0](https://pdssbn.astro.umd.edu/holdings/ro-c-multi-5-67p-shape-v2.0/dataset.shtml), DOI 10.26007/34vg-8s07. Its catalogue was accessible, but model downloads failed (502/403). It is a reference, **not the source of the shipped 67P geometry**.

## Orbits and course references

[NASA/JPL, Approximate Positions of the Planets, Table 1](https://ssd.jpl.nasa.gov/planets/approx_pos.html): heliocentric fitted elements at J2000.0, mean J2000 ecliptic/equinox, for the 1800–2050 fit. ω = ϖ − Ω; M₀ = L − ϖ, normalized to 0–360°. Earth means the Earth–Moon barycentre. These are not current osculating elements; model spin is not calculated from the table.

User-supplied course notes: Zerefşan Kaymaz, *Planetary Atmospheres*: Star Formation (two PDFs, 12 February 2026), Luminosity and Brightness, H–R Diagram, Giant Planets (21 May 2026). Notes are paraphrased; PDFs and slides are not republished. Angular momentum is J = Iω; flux is in W/m². Main sequence, RGB, white dwarf and neutron star are not one universal evolution path. Generic remnants receive no unsupported spectral subtype.

## Review of all 24 models

| Objects | Representation and remaining limits |
| --- | --- |
| Sun | Enhanced-colour map; not an unaided-eye view or dynamic magnetohydrodynamics. |
| Mercury, Moon, Mars | Higher-resolution maps and shading; no measured displaced terrain or local terrain shadows. |
| Earth | Global composite with cloud/night layers and approximate glint; no live weather. |
| Venus, Titan | Cloud/haze envelopes. Little visible surface detail is physically appropriate. |
| Jupiter, Saturn | Cloud maps; Saturn's rings follow the globe. Cloud flow, oblateness and ring radiative transfer are not fully solved. |
| Uranus, Neptune | Low-contrast atmospheric views. Neptune colour is a display approximation. |
| Pluto | Observed mosaic plus disclosed southern completion. |
| Ceres | Dawn/USGS grayscale mosaic; approximate display wrapping, baked-in illumination and incomplete polar coverage. |
| Europa, Enceladus | NASA visualization maps replace procedural scratches; coverage varies and geometry remains spherical. |
| Bennu | NASA visualization mesh, smooth shading; no photographic texture. |
| 67P | Continuous morphological approximation; not a mission mesh. |
| Red giant, white dwarf | Generic examples; luminous surfaces and convection are illustrative. |
| Neutron star | Pulsar geometry diagram; not a photograph or predicted pulse profile. |
| Black hole | Approximate accretion/lensing view; not general-relativistic ray tracing. |
| Orion Nebula | Schematic gas/star distribution; not measured 3D tomography. |
| Milky Way, Andromeda | Morphological disks/bulges. Arms and inspection rotation are illustrative. |

The Milky Way marker uses the disk's transformation. [NASA: Local Arm](https://science.nasa.gov/resource/the-milky-way-galaxy/); [NASA: approximately 26,000 light-years](https://science.nasa.gov/mission/webb/galaxies-over-time/). Marker size and azimuth are schematic.

## Io and nearby stars (September 2026 update)

- [NASA: Io](https://science.nasa.gov/jupiter/jupiter-moons/io/) and [Io facts](https://science.nasa.gov/jupiter/jupiter-moons/io/facts/): volcanic resurfacing, tidal heating, synchronous rotation and composition.
- [ESO: Proxima Centauri](https://www.eso.org/public/news/eso1629/): nearby red dwarf, low visible brightness and magnetic activity. The model is an illustrative photosphere, not a resolved surface observation.
- [NASA SVS: Alpha Centauri stellar system](https://svs.gsfc.nasa.gov/20377/): distance, G-type classification, approximate mass and system membership. [ESA: comparison with the Sun](https://www.esa.int/Science_Exploration/Space_Science/A_cool_discovery_about_the_Sun_s_next-door_twin) provides atmospheric context.

The two new stellar models use subtle procedural granulation and approximate visible-light colours, with display brightness adjusted for inspection. They are not surface maps or binary-orbit simulations. Io uses a spacecraft-derived mosaic with variable resolution; small missing polar edges are extended for display and are not measured terrain.

All solid objects, stars, compact objects and galaxies now share a rotation matrix. Galaxy dragging uses the depth of the grabbed disk point when the disk can be picked reliably; dragging the background or a nearly edge-on disk uses a virtual trackball. Automatic galaxy rotation pauses while dragging. Black-hole disk inclination and neutron-star magnetic geometry respond to the same rotation. The black-hole lensing remains an illustration, not numerical relativistic ray tracing. A white dwarf has little intrinsic visible surface contrast: a temporary orientation grid appears only while dragging and is labelled as a guide.
