parallaxed.js
=============

A basic parallax plugin for jQuery

Currently only supports vertical parallax

Installation
-------------
- Copy `parallaxed.js` to your scripts directory
- Add it after you include `jQuery`

Usage
-------------
#### Basic Usage

```html
<div class="parallax_item">
    I will be parallaxed!
</div>
```

```javascript
$('.parallax_item').parallaxed();
```

#### Data items
The following items can be added to modify how an element is parallaxed.
#####**Note**: Prefix with `data-parallaxed-*` i.e.:
```html
<div class="parallax_item"
    data-parallaxed-speed='1.5'
    data-parallaxed-start='offset'
    data-parallaxed-startoffset='100'>
...
```

| Data Item   | Description   | Default         | Accepted Values |
|-------------|---------------|-----------------|-----------------|
| start       | When parallax scrolling should start | `visible` | `visible`, `offset`, `always` |
| speed       | The speed at which the item is parallaxed | `1`  | Number |
| startoffset | The offset (in px) parallax scrolling should start at - used when `start` value is `offset` | `0` | Integer |
| usetransform| Whether css transform or should be used to move the element (otherwise top/left are used) | `true` | `true`, `false` |
