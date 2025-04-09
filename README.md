# Selection JS

This library enables a custom selection effect when a user selects text inside specific elements. You can also trigger an optional animation when the user presses Ctrl+C to copy the selected content.

## Features

- Highlight effect using customizable colored overlays

- `CTRL` + `C` copy animations for specific elements

- Lightweight and styleable with CSS

- Works with dynamically added elements, as long as they exist before user selection

## Installation

1. Include the CSS in your HTML:

```HTML
<link rel="stylesheet" href="SELECTION.css"/>
```

2. Include the JavaScript file just before the closing `</body>` tag:

```HTML
<script src="SELECTION.js"></script>
```

3. Insert the container where the selection overlays will be rendered:

```HTML
<div id="SELECTION_CONTAINER"></div>
```

4. Add the required SVG filter definition inside your HTML (anywhere in the body or head):

```HTML
<SVG xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
 <defs>
  <filter id="GOO_EFFECT">
   <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
   <feColorMatrix
    in="blur"
    mode="matrix"
    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -4"
    result="goo"
   />
   <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
  </filter>
 </defs>
</SVG>
```

5. Also add the required `<DIV>` element inside your HTML ***(Must inside the `<BODY>`)***:

```HTML
<DIV ID="SELECTION_CONTAINER"></DIV>
```

## Usage

Call the `SOFT_SELECTION()` function after the page has loaded:

```HTML
SOFT_SELECTION("#E84A8C", optional_on_copy_function);
```

### Parameters

* `COLOR` - A default hex color used for selection effects (e.g. `"#E84A8C"`)
* `ON_COPY` - *(optional)* A global fallback callback function when `CTRL` + `C` is pressed. Only used if no per-element callback is defined.

## Markup Examples

You can define which elements should respond to the effect using the `data-selection` attribute:

```HTML
<p data-selection>
  This paragraph will have a selection effect using the default color.
</p>

<p data-selection="#FF0000">
  This paragraph will use red as its selection color.
</p>

<p>
  This paragraph has no selection effect.
</p>

```

### Optional `data-selection-oncopy`

You can specify a custom animation function that runs when a user presses `CTRL` + `C` while this element is selected:

```HTML
<p DATA-SELECTION DATA-SELECTION-ONCOPY="on_copy_animation">
  Custom copy animation will run on Ctrl+C.
</p>
```

The function must be globally defined:

```JS
function on_copy_animation(color, element)
{
  element.style.backgroundColor = "#FFF";
  setTimeout(
  	() => {
    	element.style.backgroundColor = color;
  	}, 100
  );
}
```

### Styling

You can also add your own transitions:

```CSS
.SELECTION_BOX,
[data-selection]
{
  transition:
    background-color 0.5s linear,
    left 0.05s linear,
    width 0.05s linear,
    height 0.05s linear;
}

[data-selection]::selection
{
  color: white;
  background-color: transparent;
}
```

## Notes

* The `SELECTION_CONTAINER` must exist in the DOM when `SOFT_SELECTION()` is called.
* Elements with `data-selection` can be added dynamically and will work, as long as they exist before the user selects them.
* The `data-selection-oncopy` attribute must point to a globally defined JavaScript function.

## Example

```HTML
<!DOCTYPE html>
<HTML LANG="en">
 <HEAD>
  <META CHARSET="UTF-8"/>
  <TITLE>Custom Selection Effect</TITLE>
  <STYLE>
.SELECTION_BOX,
[DATA-SELECTION]
{
	TRANSITION:
		BACKGROUND-COLOR 0.5S LINEAR,
		            LEFT 0.05S LINEAR,
		           WIDTH 0.05S LINEAR,
		          HEIGHT 0.05S LINEAR;
}

[DATA-SELECTION]::SELECTION
{
	COLOR: WHITE;
}

body
{
	font-family: Arial, sans-serif;
	line-height: 1.1;
}

.content
{
	position: relative;
	z-index: 1;
}

[DATA-SELECTION]::SELECTION
{
	BACKGROUND-COLOR: TRANSPARENT;
}
  </STYLE>
  <LINK REL="stylesheet" HREF="SELECTION.css"/>
 </HEAD>
 <BODY>
  <DIV CLASS="content">
   <P DATA-SELECTION DATA-SELECTION-ONCOPY="on_copy_animation">Lorem ipsum with a custom CTRL + C animation. dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae libero bibendum tincidunt.</P>
   <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae libero bibendum tincidunt.</P>
   <P DATA-SELECTION="#F00">Phasellus euismod, justo at scelerisque tincidunt, libero erat fermentum libero, nec tincidunt lorem arcu nec libero.</P>
   <P>Phasellus euismod, justo at scelerisque tincidunt, libero erat fermentum libero, nec tincidunt lorem arcu nec libero.</P>
  </DIV>

  <DIV ID="SELECTION_CONTAINER"></DIV>
  <SVG xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
   <defs>
    <filter id="GOO_EFFECT">
     <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
     <feColorMatrix
      in="blur"
      mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -4"
      result="goo"
     />
     <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
   </defs>
  </SVG>
  <SCRIPT TYPE="TEXT/JAVASCRIPT" SRC=""></SCRIPT>
  <SCRIPT TYPE="TEXT/JAVASCRIPT" SRC="">
function
	on_copy_animation(SELECTION_COLOR, SELECTION_BOX_ELEMENT)
{
	const ORG_LEFT = SELECTION_BOX_ELEMENT.style.left;
	const ORG_TOP = SELECTION_BOX_ELEMENT.style.top;
	const ORG_WIDTH = SELECTION_BOX_ELEMENT.style.width;
	const ORG_HEIGHT = SELECTION_BOX_ELEMENT.style.height;

	const RECT = SELECTION_BOX_ELEMENT.getBoundingClientRect();

	SELECTION_BOX_ELEMENT.style.backgroundColor = "#FFF";
	setTimeout(
		function()
		{
			SELECTION_BOX_ELEMENT.style.backgroundColor = SELECTION_COLOR; 
		},
		100
	);
}

SOFT_SELECTION("#E84A8C");
  </SCRIPT>
 </BODY>
</HTML>
```
