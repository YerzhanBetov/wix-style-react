export default function WixStyleDecorator(storyFn) {
  requestAnimationFrame(() => {
    const styleElements = Array.from(document.querySelectorAll('style[wix-style]'));

    styleElements.forEach(styleElement => {
      styleElement.innerText = styleElement.innerText
        .replace(/"{{ color-1 }}"/g, '#ffffff')
        .replace(/{{ color-1 }}/g, '#ffffff')
        .replace(/"{{ color-2 }}"/g, '#c8d2d9')
        .replace(/{{ color-2 }}/g, '#c8d2d9')
        .replace(/"{{ color-3 }}"/g, '#87929a')
        .replace(/{{ color-3 }}/g, '#87929a')
        .replace(/"{{ color-4 }}"/g, '#445660')
        .replace(/{{ color-4 }}/g, '#445660')
        .replace(/"{{ color-5 }}"/g, '#132d40')
        .replace(/{{ color-5 }}/g, '#132d40')
        .replace(/"{{ color-6 }}"/g, '#E1CD98')
        .replace(/{{ color-6 }}/g, '#E1CD98')
        .replace(/"{{ color-7 }}"/g, '#C8B47F')
        .replace(/{{ color-7 }}/g, '#C8B47F')
        .replace(/"{{ color-8 }}"/g, '#AE9A65')
        .replace(/{{ color-8 }}/g, '#AE9A65')
        .replace(/"{{ color-9 }}"/g, '#95814C')
        .replace(/{{ color-9 }}/g, '#95814C')
        .replace(/"{{ color-10 }}"/g, '#7B6732')
        .replace(/{{ color-10 }}/g, '#7B6732')
        .replace(/{{ color-11 }}/g, 'gray')
        .replace(/{{ color-12 }}/g, 'green')
        .replace(/{{ color-13 }}/g, 'blue')
        .replace(/{{ color-14 }}/g, 'orangered')
        .replace(/{{ color-14 }}/g, 'purple')
        .replace(/"{{ color-10 }}"/g, '#7B6732')
        .replace(/"{{ color-11 }}"/g, 'gray')
        .replace(/"{{ color-12 }}"/g, 'green')
        .replace(/"{{ color-13 }}"/g, 'blue')
        .replace(/"{{ color-14 }}"/g, 'orangered')
        .replace(/"{{ color-14 }}"/g, 'purple');
    });
  });

  return storyFn();
}
