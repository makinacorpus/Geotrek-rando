# Geotrek-rando documentation

‹ Back to [Settings & customization](settings.md)

## settings.custom.json

In order to extend the default configuration, you just need to add your customisation to the `custom/settings.custom.json` main object.
**You don't need to set all the values, just the one you want to be different from the default configuration.**

> This file should remain a valid [JSON][] file.
> Remember to check its validity each time you alter it.

To apply changes after editing settings, launch bundling task again with running `npm run dist`

## Global settings

Option     | Type      | Default   | Description
--------|-----------|-----------|------------
PLAFTORM_ID | String | `"geotrek-rando"` | Unique id for your geotrek website.You need to change it. It's used for Localstorage between other things.
API_URL | String (url) | `"tests/dataset"` |URL of the location where geotrek rando should find the api. If you're using Geotrek Admin, it can be either the admin server url or the rando server url (if you activate data sync on the admi nside)
BACKOFFICE_URL | String (url) | `""` | URL of your backoffice where rando can send requests like for the warning module.
ENABLE_HTML_MODE | Boolean | `false` | Active HTML5 mode. Please refer to [ui-router FAQ](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode)


## Interface parameters

### Main options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
LOGO_FILE | String (file name) | `""` |If you want to use a logo in the app. It's just the name of the file, which goes into `custom/public/images`. Accept .jpg, .png, .svg.
FAVICON | [Object (ico and png images)](#favicon-options) | `{}` | Object containing the custom favicon files you want to use. Both ico and png are required. Files go into `custom/public/images`.
SHOW_HOME | Boolean | `true` | Enable home page
HOME_TEMPLATE_FILE | Object | `{}` | For each lang you can specify a different home template. Formated like this "lang-code": "file-name.html".
SHOW_FOOTER | Boolean | `false` | Display footer on all pages
FOOTER_TEMPLATE_FILE | String (file name) | `""` | Name of a custom template for the footer of the app
HEADER_TEMPLATE_FILE | String(file name) | `""` | Name of a custom template for the header of the app
PICTURE_TREK_SLIDES_CAPTION_ORDER | Array of strings (name of fields to display) | `["title", "author", "legend"]` | List of fields to display under the picture in the caption when displaying the slideshow of trek pictures
PICTURE_TREK_CAPTION_ORDER | Array of strings (name of fields to display) | `["title", "author", "legend"]` | List of fields to display on the picture to be the caption when displaying the picture of a trek
PICTURE_POI_SLIDES_CAPTION_ORDER | Array of strings (name of fields to display) | `["title", "author", "legend"]` | List of fields to display under the picture in the caption when displaying the slideshow of POIs pictures
PICTURE_POI_CAPTION_ORDER | Array of strings (name of fields to display) | `["title", "author", "legend"]` | List of fields to display on the picture to be the caption when displaying the picture of a POI
ENABLE_DISTRICTS_FILTERING | Boolean | `true` | Show districts filtering on results page
ENABLE_CITIES_FILTERING | Boolean | `true` | Show cities filtering on results page
ENABLE_STRUCTURE_FILTERING | Boolean | `true` | Show structure filtering on results page
GEO_FILTERS_AUTO_CLOSE | Boolean | `false` | If true select filters menus will close when a value is selected.
FAVORITES_ICON | String ([font awesome icon](http://fortawesome.github.io/Font-Awesome/icons/)) | `"heart"` | Specify the icon used for the favorites on the website. It must be a valid font awesome icon.
SHARE_ICON | String ([font awesome icon](http://fortawesome.github.io/Font-Awesome/icons/)) | `"share-alt"` | Specify the icon used for the favorites on the website. It must be a valid font awesome icon.
PLACEHOLDER_IMAGE | string(file name) | `""` | Placeholder used for contents elements.
DISPLAY_CREDITS_ON_IMAGE | Boolean | `true` | Add credits on pictures in detail view. From Geotrek-admin version 2.23.2 credits are added directly to pictures, so this setting should be set `false` to avoid double mark.
RANDOMIZE_RESULTS | Boolean | `false` | If true, items are randomized in results list
CENTERON_FITS_BOUNDS | Boolean | `false` | Fit map viewport on geometry instead of centering on first point
PDF_LINK_IN_DOWNLOAD | Boolean | `false` | Display PDF link below download button (with KML and GPX), instead of displaying print button

### Favicon options

All the options are required

Option     | Type      | Default   | Description
--------|----------|-----------|------------
ico | string (file name) | `''` | Name of the .ico file for the favicon
png | string (file name) | `''` | Name of the .png file for the favicon


## Languages

Option     | Type      | Default   | Description
--------|----------|-----------|------------
DEFAULT_LANGUAGE | string (lang code) | `"en"` | Define default language of the app
AVAILABLE_LANGUAGES | Object (lang) | cf [Available languages object](#available-languages-object)  | Available languages of the app
ENABLED_LANGUAGES | array of strings (lang codes) | `["fr", "en", "de", "it", "nl"]` | This is the list of the enabled languages in the header lang menu and the app.

**Available languages object**
```
{
    "fr": "Français",
    "en": "English",
    "de": "Deutsch",
    "it": "Italiano",
    "nl": "Nederlands"
}
```

## Categories

Option     | Type      | Default   | Description
--------|----------|-----------|------------
ENABLE_TREKS | Boolean | `true` | Enable treks service and fetching from the API
ENABLE_TOURISTIC_CONTENT | Boolean | `true` | Enable touristic contents service and fetching from the API
ENABLE_TOURISTIC_EVENTS | Boolean | `true` | Enable touristic events service and fetching from the API
ENABLE_DIVES | Boolean | `false` | Enable dives service and fetching from the API
DEFAULT_ACTIVE_CATEGORIES | Array of strings (categories id) | `["T"]` | List of default active categories.
LIST_EXCLUDE_CATEGORIES | Array of strings (categories id) | `[]` | List of categories excluded from the menu.
ENABLE_UNIQUE_CAT | Boolean | `false` | If true, only one category can be activated at the same time in the result page filters.
FILTERS_DEFAULT_OPEN | Boolean | `false` | If true, the filters values will be expanded by default.
DEFAULT_INTEREST | String | `"pois"` | Choose which interest to open by default on detail page. Possible values: `"pois"`, `"near"`, `"children"`, `"parents"`, ""
ASIDE_PANEL_FOLDED_BY_DEFAULT | Boolean | `false` | If true, the aside panel on the right of detail pages will be collapsed by default.



## Booking

Option     | Type      | Default   | Description
--------|----------|-----------|------------
ENABLE_BOOKING | Boolean | `false` | Check for booking data in results


## Social networks

Option     | Type      | Default   | Description
--------|----------|-----------|------------
FACEBOOK_APP_ID | String | `""` | ID Of your Facebook app.
TWITTER_ID | string | `""` | ID of your Twitter account.
DEFAULT_SHARE_IMG | String(file name) | `""` | Name of your custom image used by default for socail networks sharing.
GOOGLE_ANALYTICS_ID | String | `""` | ID of your Google Analytics account.


## Sensitive areas

Option     | Type      | Default   | Description
--------|----------|-----------|------------
SENSITIVE_TILELAYER | Boolean | `false` | Set to `true` to enable the "Sensitive areas" layer
SENSITIVE_DEFAULT_ICON | String(file name) | `""` | Filename of the custom default icon to use for the button
SENSITIVE_LAYER_STYLE | Object | `{}` | Leaflet style (see https://leafletjs.com/reference-1.3.4.html#path)

## Infrastrucures

Option     | Type      | Default   | Description
--------|----------|-----------|------------
INFRASTRUCTURES_TILELAYER | Boolean | `false` | Set to `true` to enable the "Infrastructures" layer
INFRASTRUCTURES_DEFAULT_ICON | String(file name) | `""` | Filename of the custom default icon to use for the button
INFRASTRUCTURES_LAYER_STYLE | Object | `{}` | Leaflet style (see https://leafletjs.com/reference-1.3.4.html#path)

## Signages

Option     | Type      | Default   | Description
--------|----------|-----------|------------
SIGNAGES_TILELAYER | Boolean | `false` | Set to `true` to enable the "Signages" layer
SIGNAGES_DEFAULT_ICON | String(file name) | `""` | Filename of the custom default icon to use for the button
SIGNAGES_LAYER_STYLE | Object | `{}` | Leaflet style (see https://leafletjs.com/reference-1.3.4.html#path)

## Map

### Main options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
PERMANENT_TILELAYERS_NAME | String | "Carte" | String used in layer selector for `PERMANENT_TILELAYERS` layer group.
PERMANENT_TILELAYERS | Array of [Layers Objects Options](#layers-objects-options) | cf [Layers Objects default](#layers-objects-options) | Define the main leaflet tile layers used by the website.
ORTHOPHOTO_TILELAYERS_NAME | String | "Ortho" | String used in layer selector for `ORTHOPHOTO_TILELAYERS` layer group.
ORTHOPHOTO_TILELAYERS | [Layer Object](#layers-objects-options) | cf [Layers Objects default](#layers-objects-options) | Define the satellite leaflet tiles used by the website.
OPTIONAL_TILELAYERS_NAME | String | "Optional" | Default name prefix for `OPTIONAL_TILELAYERS` layers in layer selector.
OPTIONAL_TILELAYERS | Array of [Layers Objects Options](#layers-objects-options) | Empty Array | This array allows you to define other Leaflet tiles layers that will be available in layer selector.
LEAFLET_CONF | [Leaflet Conf Object](#layers-conf-options) | cf [Leaflet Conf Object default](#layers-conf-options) |  Basic conf of the map.
MAP_BOUNDS_CONSTRAINTS | Array | `null` | Represents a rectangular area in pixel coordinates.
TREKS_TO_GEOJSON_ZOOM_LEVEL | Int | `14` | Zoom level at which the map switch between markers and linear mode for treks.
UPDATE_MAP_ON_FILTER | Boolean | `false` | If true, update map viewport each time a filter is changed.
ACTIVE_MINIMAP | Boolean | `true` | If true, show minimap.
MINIMAP_ZOOM | [Zoom conf Object](#layers-objects-options) | cf [Zoom conf default](#layers-objects-options) | Define max an min zoom levels for the mini-map
MINIMAP_OFFSET | Int | `-3` | Value of the difference between the map zoom and the mini-map zoom.
IMPERIAL_SCALE | Boolean | `false` | Show the imperial scale line (mi/ft) in addition of the metric scale line.
ALWAYS_HIGHLIGHT_TREKS | Boolean | `false` | If true, always display a border around the linear versions of treks on result page.
ALWAYS_HIGHLIGHT_TREK_DETAIL | Boolean | `false` | If true, always display a border around the linear versions of treks on detail page.
SHOW_FILTERS_ON_MAP | boolean | `true` | If false, hide the tags filters on the top of the map.
FILTER_BY_VIEWPORT_DEFAULT | boolean | `false` | If true, "Filter with map" is checked by default


### Layers objects options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
LAYER_URL | String (tiles server url) | `"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"` for main view and `http://{s}.tile.mapbox.com/v3/makina-corpus.i3p1001l/{z}/{x}/{y}.png"` for satellite view | Url of the layer. It needs to be a valid tiles server url.
OPTIONS | Object ([Leaflet tileLayer options](http://leafletjs.com/reference.html#tilelayer-options)) | `{"attribution": "(c) OpenstreetMap", "minZoom": 8, "maxZoom": 17}` for main view, `{"id": "satellite", "attribution": "(c) MapBox Satellite"}` for satellite view, empty for optional layers | Leaflet tilelayer options - optional layers can have custom icon : `{ "icon": "path/to/icon.png" }`, and custom legend `{ "legend": "Optionnal layer 1" }` for its controls.
BOUNDS | String | | Url of a geoJson polygon. Current layer will be displayed only when the center of the map viewport is inside this polygon.

### Leaflet conf options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
CENTER_LATITUDE | float(longitude) | `44.83` | Lat of the default centering of the map
CENTER_LONGITUDE | float(longitude) | `6.34` | Lng of the default centering of the map
DEFAULT_ZOOM | int | `12` | Default zoom of the map on launch
DEFAULT_MIN_ZOOM | int | `8` | Min zoom of the map
DEFAULT_MAX_ZOOM | int | `17` | Max zoom of the map

### Zoom conf options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
MINI | Int | `0` | Min zoom level for minimap
MAX | Int | `12` | Max zoom level for minimap


## Markers

Option     | Type      | Default   | Description
--------|----------|-----------|------------
POI_EXPANDED | Boolean | `false` | Expand POIS list.
NEAR_ELEMENTS_CATEGORIES | Boolean | `false` | Sort near elements by categories.
DISPLAY_ASIDES_COUNTERS | Boolean | `false` | Display side elements counters on detail page.
SHOW_ARROWS_ON_ROUTE | `false` | Show arrows indicating the direction of the route.
MARKER_BASE_ICON | [Leaflet Icon Object](http://leafletjs.com/reference.html#icon) | `""` | Base of the marker for elements. The category icon defined in the API is put above this one. You'll need to adapt custom css according to those changes.
POI_BASE_ICON | [Leaflet Icon Object](http://leafletjs.com/reference.html#icon) | `""` | Base of the marker for POIs.
SERVICE_BASE_ICON | [Leaflet Icon Object](http://leafletjs.com/reference.html#icon) | `""` | Marker used for services on a detail page.
DEPARTURE_ICON | [Leaflet Icon Object](http://leafletjs.com/reference.html#icon) | `""` | Marker used for departure of a trek on a detail page.
ARRIVAL_ICON | [Leaflet Icon Object](http://leafletjs.com/reference.html#icon) | `""` | Marker used for arrival of a trek on a detail page.
DEPARTURE_ARRIVAL_ICON | [Leaflet Icon Object](http://leafletjs.com/reference.html#icon) | `""` | Marker used if departure and arrival are on the same place of a trek on a detail page. (ex: a looping trek)


## Directories

Option     | Default   | Description
--------|-------|------------
API_DIR | "api" | API dir file
TREKS_DIR | "treks" | Treks dir file
TREKS_FILE | "treks.geojson" | Treks file
POI_FILE | "pois.geojson" | POI file
SERVICES_FILE | "services.geojson" | Service file
FLAT_FILE | "flatpages.geojson" | Flat pages file
TOURISTIC_EVENTS_DIR | "touristicevents" | Touristic events dir file
TOURISTIC_EVENTS_FILE | "touristicevents.geojson" | Touristic event file
TOURISTIC_CONTENTS_DIR | "touristiccontents" | Touristic content dir file
TOURISTIC_CONTENTS_FILE | "touristiccontents.geojson" | Touristic content file
DIVES_FILE | "dives.geojson" | Dives file
DEM_FILE | "dem.json" | DEM file
PROFILE_FILE | "profile.json" | Profile file
WARNING_CAT_DIR | "feedback" | Warning catefories dir file
WARNING_CAT_FILE | "categories.json" | Warning categories file
WARNING_OPT_FILE | "options.json" | Warning options file (for Suricate support)
WARNING_SUBMIT_URL | "reports/report" | Warning submit URL
STYLES_CONFIG_FILE | "styles.json" | Custom styles variables
APPROVED_BIG | "images/approved-big.png" | Default big image for approved label (for detail page)
APPROVED_SMALL | "images/approved-small.png" | Default small image for approved label (for results page)
PARAMETERS_FILE | "parameters.json" | Parameters rando

## Filters

### Main options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
DURATION_FILTER | array of [Filters values Objects](#filters-value-options) (id in hours) | cf [Default filters objects](#default-filters-objects) | Values of the filter for a trek duration
ASCENT_FILTER | array of [Filters values Objects](#filters-value-options) (id in meters) | cf [Default filters objects](#default-filters-objects) | Values of the filter for a trek ascent
LENGTH_FILTER | array of [Filters values Objects](#filters-value-options) (id in meters) | cf [Default filters objects](#default-filters-objects) | Values of the filter for a trek length
DEPTH_FILTER | array of [Filters values Objects](#filters-value-options) (id in meters) | cf [Default filters objects](#default-filters-objects) | Values of the filter for a dive depth

### Filters value options

Option     | Type      | Default   | Description
--------|----------|-----------|------------
id | Int | cf [Default filters objects](#default-filters-objects) | Value used for comparison with the elements values. (ex: a 2 hours trek will be between an id of 0 and 10 by default)
label | String | cf [Default filters objects](#default-filters-objects) | Text shown on the filters menu on the results page.

### Default filters objects

**Duration**
```
[
    { "id": 0, "label": "<1/2 J"},
    { "id": 10, "label": "1/2 J"},
    { "id": 24, "label": "1 J"},
    { "id": 999, "label": "> 1 J"}
]
```

**Ascent**
```
[
    { "id": 0, "label": "<300m"},
    { "id": 300, "label": "300"},
    { "id": 600, "label": "600"},
    { "id": 1000, "label": "1000"},
    { "id": 9999, "label": ">1000m"}
]
```

**Length**
```
[
    { "id": 0, "label": "<10km"},
    { "id": 10000, "label": "10km"},
    { "id": 20000, "label": "20km"},
    { "id": 30000, "label": "30km"},
    { "id": 99999, "label": ">30km"}
]
```

**Depth**
```
[
    { "id": 0, "label": "<12m"},
    { "id": 12, "label": "12m"},
    { "id": 20, "label": "20m"},
    { "id": 40, "label": "40m"},
    { "id": 999, "label": ">40m"}
]
```

[JSON]: http://www.json.org/
