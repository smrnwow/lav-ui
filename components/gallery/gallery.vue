<template lang="html">
    <transition name="fade">
        <div class="lav-gallery" v-if="visible">
            <span class="lav-gallery-close" @click="close">
                <svg class="lav-gallery-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
                    <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
                    c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
                    s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
                    s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
                </svg>
            </span>
            <div class="lav-gallery-overlay"></div>
            <div class="lav-gallery-wrap" :class="classes">
                <div class="lav-gallery-selected">
                    <button class="lav-gallery-arrow lav-gallery-arrow_left" @click="prev" :class="[prevDisabled]">
                        <svg x="0px" y="0px" viewBox="0 0 400 400">
                            <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
                                c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
                                c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
                                C400.004,190.438,392.251,182.686,382.688,182.686z"/>
                        </svg>
                    </button>
                    <transition name="lav-gallery">
                        <img class="lav-gallery-selected__image" :key="active" :src="images[active]" />
                    </transition>
                    <button class="lav-gallery-arrow lav-gallery-arrow_right" @click="next" :class="[nextDisabled]">
                        <svg x="0px" y="0px" viewBox="0 0 400 400">
                            <path d="M17.3,217.3h323.6l-77.2,77.2c-6.8,6.8-6.8,17.7,0,24.5c6.8,6.8,17.7,6.8,24.5,0l106.8-106.8c6.8-6.8,6.8-17.7,0-24.5
                                L288.2,81c-3.4-3.4-7.8-5.1-12.2-5.1s-8.9,1.7-12.2,5.1c-6.8,6.8-6.8,17.7,0,24.5l77.2,77.2H17.3C7.8,182.7,0,190.4,0,200
                                C0,209.6,7.8,217.3,17.3,217.3z"/>
                        </svg>            
                    </button>
                </div>
            </div>
            <thumbs v-if="thumbs" :images="images" @select="handleSelect" :active="active"></thumbs>
        </div>
    </transition>
</template>

<script src="./gallery.js"></script>