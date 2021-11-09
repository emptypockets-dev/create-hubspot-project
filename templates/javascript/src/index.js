import './js/main.js';

/* Theme base styles */

/* Tools
Any animations, or functions used throughout the project.
Note: _macros.css needs to be imported into each stylesheet where macros are used and not included here
*/

/* Generic
This is where reset, normalize & box-sizing styles go.
*/

import './css/generic/_reset.css';
import './css/generic/_normalize.css';

/* Objects
Non-cosmetic design patterns including grid and layout classes)
*/

import './css/objects/_layout.css';
import './css/objects/_containers-dnd.css';

/* Elements
Base HMTL elements are styled in this section (<body<, <h1>, <a>, <p>, <button> etc.)
*/

import './css/elements/_typography.css';
import './css/elements/_buttons.css';
import './css/elements/_forms.css';
import './css/elements/_tables.css';

/* Components
Specific pieces of UI that are stylized. Typically used for global partial styling
*/

import './css/components/_header.css';
import './css/components/_default-modules.css';

/* Utilities
Helper classes with ability to override anything that comes before it
*/

import './css/utilities/_helper.css';

import './css/styles.css';
/***********************************
add {{ require_css(get_asset_url("../../css/styles.css")) }} 
to your "templates/layouts/base.html" file.
************************************/
