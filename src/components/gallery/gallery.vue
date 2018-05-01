<template lang="html">
    <transition name="lav-fade">
        <div class="lav-gallery" v-if="visible">
            <span class="lav-gallery-close" @click="close">
                <lav-icon name="close" :size="30" color="#fff"></lav-icon>
            </span>
            <div class="lav-gallery-overlay"></div>
            <div class="lav-gallery-wrap" :class="classes">
                <div class="lav-gallery-selected">
                    <button class="lav-gallery-arrow lav-gallery-arrow_left" @click="prev" :class="[prevDisabled]">
                        <lav-icon name="arrow-left" :size="30"></lav-icon>
                    </button>
                    <transition :name="transition">
                      <img class="lav-gallery-selected__image" :key="active" :src="images[active]" />
                    </transition>
                    <button class="lav-gallery-arrow lav-gallery-arrow_right" @click="next" :class="[nextDisabled]">
                        <lav-icon name="arrow-right" :size="30"></lav-icon>
                    </button>
                </div>
            </div>
            <thumbs v-if="thumbs" :images="images" @select="handleSelect" :active="active"></thumbs>
        </div>
    </transition>
</template>

<script src="./gallery.js"></script>
