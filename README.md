# global_clock

A drop-in text box that shows each visitor their own local time, using the time zone set on their device.
Styled in Grotesque L, Light, 17pt.

## Use it

```html
<script src="global-clock.js" defer></script>

<global-clock></global-clock>
```

Options:

```html
<global-clock seconds></global-clock>        <!-- 14:05:09 -->
<global-clock zone></global-clock>           <!-- 14:05 CET -->
<global-clock hour12="true"></global-clock>  <!-- 2:05 PM -->
```

## Font

The clock asks for `"Grotesque L"` at weight 300 (Light), 17pt. The font has to be loaded on your site
(e.g. with an `@font-face` rule pointing at your font files); otherwise the browser falls back to a similar sans-serif.

To change the font, weight or size without editing the script:

```css
global-clock {
  --clock-font: "Grotesque L", sans-serif;
  --clock-weight: 300;
  --clock-size: 17pt;
}
```
