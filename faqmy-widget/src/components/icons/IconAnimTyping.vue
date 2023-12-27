<template>
  <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="8" r="2" fill="#000">
      <animate
        attributeName="fill-opacity"
        values="0;1;1;1;1"
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="10" cy="8" r="2" fill="#000">
      <animate
        attributeName="fill-opacity"
        values="0;0;1;1;1"
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="18" cy="8" r="2" fill="#000">
      <animate
        attributeName="fill-opacity"
        values="0;0;0;1;1"
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</template>
