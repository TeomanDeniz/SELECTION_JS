/******************************************************************************\
# JS - SELECTION                                 #       Maximum Tension       #
################################################################################
#                                                #      -__            __-     #
# Teoman Deniz                                   #  :    :!1!-_    _-!1!:    : #
# maximum-tension.com                            #  ::                      :: #
#                                                #  :!:    : :: : :  :  ::::!: #
# +.....................++.....................+ #   :!:: :!:!1:!:!::1:::!!!:  #
# : C - Maximum Tension :: Create - 2025/01/14 : #   ::!::!!1001010!:!11!!::   #
# :---------------------::---------------------: #   :!1!!11000000000011!!:    #
# : License - MIT       :: Update - 2025/04/09 : #    ::::!!!1!!1!!!1!!!::     #
# +.....................++.....................+ #       ::::!::!:::!::::      #
\******************************************************************************/

var	SELECTION_COPIED = false;

document.CUSTOM_SELECTION_EFFECT = false;

function
	SOFT_SELECTION(COLOR, ON_COPY)
{
	function
		RENDER_SELECTION()
	{
		const	SELECTION = window.getSelection();

		if (SELECTION.rangeCount === 0 || SELECTION.isCollapsed)
		{
			THIS.SELECTION_CONTAINER.innerHTML = "";
			return ;
		}

		const	RANGE = SELECTION.getRangeAt(0);
		const	RECTS = Array.from(RANGE.getClientRects()).filter(
			function (RECT)
			{
				let ELEMENT = document.elementFromPoint(
					RECT.left + RECT.width / 2,
					RECT.top + RECT.height / 2
				);

				while (ELEMENT)
				{
					if (ELEMENT.hasAttribute("DATA-SELECTION"))
						return (true);

					ELEMENT = ELEMENT.parentElement;
				}

				return (false);
			}
		);

		const	EXISTING = new Map();

		for (const BOX of THIS.SELECTION_CONTAINER.children)
			EXISTING.set(BOX.dataset.top, BOX);

		const	ACTIVE_TOPS = new Set();

		for (const RECT of RECTS)
		{
			const	TOP = Math.round(RECT.top + window.scrollY);
			const	KEY = TOP.toString();
			ACTIVE_TOPS.add(KEY);

			let		BOX = EXISTING.get(KEY);
			let		COLOR = THIS.COLOR;
			const	CENTER_ELEMENT = document.elementFromPoint(
				RECT.left + RECT.width / 2,
				RECT.top + RECT.height / 2
			);

			if (
				CENTER_ELEMENT?.hasAttribute("DATA-SELECTION") &&
				CENTER_ELEMENT.getAttribute("DATA-SELECTION") !== ""
			)
				COLOR = CENTER_ELEMENT.getAttribute("DATA-SELECTION");

			if (!BOX)
			{
				BOX = document.createElement("DIV");
				BOX.classList.add("SELECTION_BOX");
				BOX.dataset.top = KEY;
				THIS.SELECTION_CONTAINER.appendChild(BOX);
			}

			BOX.style.left = (RECT.left + window.scrollX) + "PX";
			BOX.style.top = TOP + "PX";
			BOX.style.width = RECT.width + "PX";
			BOX.style.height = RECT.height + "PX";
			BOX.style.backgroundColor = COLOR;
			BOX.SELECTION_COLOR = COLOR;
			BOX.SELECTION_COPIED = false;
			BOX.SELECTION_ONCOPY =
				window[CENTER_ELEMENT?.getAttribute("DATA-SELECTION-ONCOPY")];
		}

		for (const [KEY, BOX] of EXISTING.entries())
		{
			if (!ACTIVE_TOPS.has(KEY))
				BOX.remove();
		}
	}

	const	OBJECTS = document.querySelectorAll("[DATA-SELECTION]");

	if (OBJECTS.length === 0 || document.CUSTOM_SELECTION_EFFECT)
		return ;
	else
		document.CUSTOM_SELECTION_EFFECT = true;

	const	THIS = {};

	if (typeof COLOR === "string")
		THIS.COLOR = COLOR;
	else
		THIS.COLOR = "#" + COLOR.toString(16)

	THIS.SELECTION_CONTAINER = document.getElementById('SELECTION_CONTAINER');

	document.addEventListener('selectionchange', RENDER_SELECTION);
	window.addEventListener('resize', RENDER_SELECTION);
	window.addEventListener('scroll', RENDER_SELECTION);

	document.addEventListener("keydown",
		function (EVENT)
		{
			if (EVENT.ctrlKey && EVENT.key.toUpperCase() === "C")
			{
				const SELECTION_BOXES = THIS.SELECTION_CONTAINER.children;

				SELECTION_COPIED = true;

				for (const BOX of SELECTION_BOXES)
				{
					if (!BOX.SELECTION_COPIED)
					{
						if (typeof(BOX.SELECTION_ONCOPY) === "function")
							BOX.SELECTION_ONCOPY(BOX.SELECTION_COLOR, BOX);
						else if (ON_COPY)
							ON_COPY(BOX.SELECTION_COLOR, BOX);

						BOX.SELECTION_COPIED = true;
					}
				}
			}
		}
	);

	document.addEventListener("keyup",
		function (EVENT)
		{
			if (SELECTION_COPIED && EVENT.key.toUpperCase() === "C")
			{
				const SELECTION_BOXES = THIS.SELECTION_CONTAINER.children;

				for (const BOX of SELECTION_BOXES)
				{
					if (BOX.SELECTION_COPIED === true)
						BOX.SELECTION_COPIED = false;
					
					SELECTION_COPIED = false;
				}
			}
		}
	);
}