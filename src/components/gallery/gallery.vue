<template lang="html">
    <transition name="fade">
        <div class="lav-gallery" v-if="visible">
            <span class="lav-gallery-close" @click="close">
                <lav-icon icon-name="close" :height="30" :width="30" color="#fff"></lav-icon>
            </span>
            <div class="lav-gallery-overlay"></div>
            <div class="lav-gallery-wrap" :class="classes">
                <div class="lav-gallery-selected">
                    <button class="lav-gallery-arrow lav-gallery-arrow_left" @click="prev" :class="[prevDisabled]">
                        <lav-icon icon-name="arrow-left" :height="30" :width="30"></lav-icon>
                    </button>
                    <transition name="lav-gallery">
                        <img class="lav-gallery-selected__image" :key="active" :src="images[active]" />
                    </transition>
                    <button class="lav-gallery-arrow lav-gallery-arrow_right" @click="next" :class="[nextDisabled]">
                        <lav-icon icon-name="arrow-right" :height="30" :width="30"></lav-icon>
                    </button>
                </div>
            </div>
            <thumbs v-if="thumbs" :images="images" @select="handleSelect" :active="active"></thumbs>
        </div>
    </transition>
</template>

<script src="./gallery.js"></script>