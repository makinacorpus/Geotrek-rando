# Geotrek-rando documentation

> **This documentation is a work in progress**.
>
> Please apologize for non already existing page but don't miss the opportunity to contribute by doing [your own pull request](https://help.github.com/articles/creating-a-pull-request/).
>
> Go further by learning how to [contribute][] to the main development.

## Overview

![Geotrek](/src/images/logo-geotrek.png)

Geotrek-rando is [FLOSS][] dedicated to display geographic and touristic contents.

These contents may be provided by linking this app either to the API of a [Geotrek-admin][] instance or directly to static datas generated by a [Geotrek-admin][] instance _(Cf. [data source][])_.

Geotrek-rando is build as a [Single Page Application][SPA] using [AngularJS][] as main application framework, [Leaflet][] for displaying the maps, and many other smaller libraries and utilities.
Everything is bound as a single javascript bundle using [Browserify][], managed through [Gulp][] tasks.

### History

The first version (v1) was builded on top of Django framework, like Geotrek-admin. But maintaining such a backend application was a kind of lose of time with no added value. Since the second version, Geotrek-rando is now a [Rich Internet application][RIA] which has a very small hosting footprint.

_See main [history][] page for more informations._

## Prerequisites

As Geotrek-rando works as a [SPA][], you only need an http server like [Nginx][] or [Apache][]. _(Cf. [http server][])_

You'll also need to build the javascript main bundle which require [nodejs and npm][node]\* to be available on the building environment.

Building environment could be either the same as your http server, or a local machine from which you'll sync generated files to the main server instance

_\* In recent versions of Geotrek-rando, you'll find the recommended version of Node JS into the `.nvmrc` file in the root directory of the project._

### For developpers

Some npm packages used for tests may need a build environment for compiling platform specific binaries. On debian-like environments, `build-essential` should satisfy this requirements.

_See [contribute][] section for more details about participating to Geotrek-rando development._

## Settings & customization

Most of the settings (mainly everything about contents) has to be done directly in [Geotrek-admin][], but some parameters regarding Geotrek-rando have to be set up in a specific file. _(Cf. [Settings][])_

There is also a way to adjust the look and feel of the user interface by creating some specific files which will be used in place of defaults. For exemple: you could have your own header or footer files allowing you to include new elements without having to make change\* to Geotrek-rando core files. _(Cf. [Customization][])_

**NB:** Each time you add, delete or modify a setting or a customization file, you have to rebuild the main javascript bundle.

_\* Making changes to core files of Geotrek-rando could prevent the possibility of upgrading it without losing your changes._

## About FLOSS

If you're wondering what means _Libre_ in [FLOSS][], it essentially imply four freedoms :
* The freedom to **run** the program for any purpose.
* The freedom to **study** how the program works, and change it to make it do what you wish.
* The freedom to **redistribute** copies so you can help your neighbor.
* The freedom to **improve** the program, and release your improvements (and modified versions in general) to the public, so that the whole community benefits.

<!-- Internal links -->

[Contribute]: contribute.md
[Settings]: settings.md
[Customization]: customization.md
[Data source]: api_url.md
[history]: history.md
[http server]: hosting.md

<!-- External links -->

[AngularJS]: http://www.angularjs.org/
[Apache]: https://httpd.apache.org/
[Browserify]: http://browserify.org/
[FLOSS]: https://en.wikipedia.org/wiki/Free_and_open-source_software "free/libre and open-source software"
[Geotrek-admin]: https://github.com/makinacorpus/Geotrek
[Gulp]: http://gulpjs.com/
[Leaflet]: http://leafletjs.com/
[Nginx]: http://nginx.org/)
[node]: https://nodejs.org/ "NodeJS"
[RIA]: https://en.wikipedia.org/wiki/Rich_Internet_application
[SPA]: https://en.wikipedia.org/wiki/Single-page_application "Single Page Application"